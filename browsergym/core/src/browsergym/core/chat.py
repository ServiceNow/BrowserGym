import base64
from pathlib import Path
from typing import Literal
import logging
import playwright.sync_api
import re
import time

from importlib import resources

from . import _get_global_playwright, chat_files


CHATBOX_DIR = resources.files(chat_files)

logger = logging.getLogger(__name__)


class Chat:
    def __init__(
        self, headless: bool, chat_size=(500, 800), record_video_dir=None, modern=True
    ) -> None:
        self.messages = []

        # create a new browser, browser context and page for the chat
        pw: playwright.sync_api.Playwright = _get_global_playwright()
        self.browser = pw.chromium.launch(
            headless=headless, args=[f"--window-size={chat_size[0]},{chat_size[1]}"]
        )
        self.context = self.browser.new_context(
            no_viewport=True,
            record_video_dir=Path(record_video_dir) / "chat_video" if record_video_dir else None,
            record_video_size=dict(width=chat_size[0], height=chat_size[1]),
        )
        self.page = self.context.new_page()
        self.recording_start_time = time.time() if record_video_dir else None

        # setup the chat page
        self.page.expose_function(
            "send_user_message", lambda msg: self._js_user_message_received_callback(msg=msg)
        )

        if modern:
            self.page.set_content(get_chatbox_modern(CHATBOX_DIR))
        else:
            self.page.set_content(get_chatbox_classic(CHATBOX_DIR))

    def _js_user_message_received_callback(self, msg: str):
        """Callback function for when a user message is received in the chatbox"""
        utc_time = time.time()
        self.messages.append({"role": "user", "timestamp": utc_time, "message": msg})
        # returning a list as JS doesnt like tuples
        return ["user", time.strftime("%H:%M", time.localtime(utc_time)), msg]

    def add_message(
        self, role: Literal["user", "user_image", "assistant", "info", "infeasible"], msg: str
    ):
        """Add a message to the chatbox and update the page accordingly."""
        utc_time = time.time()
        if role not in ("user", "user_image", "assistant", "info", "infeasible"):
            raise ValueError(f"Invalid role: {role}")
        if role in ("user", "user_image", "assistant", "infeasible"):
            self.messages.append({"role": role, "timestamp": utc_time, "message": msg})
        timestamp = time.strftime("%H:%M:%S", time.localtime(utc_time))
        self.page.evaluate(f"addChatMessage({repr(role)}, {repr(timestamp)}, {repr(msg)});")

    def wait_for_user_message(self):
        logger.info("Waiting for message from user...")
        # reset flag
        self.page.evaluate("USER_MESSAGE_RECEIVED = false;")
        # wait for flag to be raised
        self.page.wait_for_function("USER_MESSAGE_RECEIVED", polling=100, timeout=0)
        logger.info("Message received.")

    def close(self):
        self.context.close()
        self.browser.close()


def get_chatbox_modern(chatbox_dir) -> str:
    with open(chatbox_dir / "chatbox_modern.html", "r") as file:
        chatbox_html = file.read()

    return chatbox_html


def get_chatbox_classic(chatbox_dir) -> str:
    with open(chatbox_dir / "chatbox.html", "r") as file:
        chatbox_html = file.read()
    with open(chatbox_dir / "assistant.png", "rb") as f:
        image_base64 = base64.b64encode(f.read()).decode("utf-8")

    assistant_image_url = f"data:image/png;base64,{image_base64}"
    chatbox_html = re.sub("<ASSISTANT_IMAGE_URL>", assistant_image_url, chatbox_html)
    return chatbox_html
