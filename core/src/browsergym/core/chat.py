import base64
from pathlib import Path
from typing import Literal
import logging
import playwright.sync_api
import re

from importlib import resources

from . import _get_global_playwright, chat_files


CHATBOX_HTML_PATH = str(resources.files(chat_files).joinpath("chatbox.html"))
ASSISTANT_IMG_PATH = str(resources.files(chat_files).joinpath("assistant.png"))


class Chat:
    def __init__(self, headless: bool, chat_size=(500, 800), record_video_dir=None) -> None:
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

        # setup the chat page
        self.page.expose_function(
            "send_user_message", lambda msg: self.add_message(role="user", msg=msg, from_js=True)
        )

        self.page.set_content(get_chatbox_html())

    def add_message(
        self, role: Literal["user", "assistant", "info"], msg: str, from_js: bool = False
    ):

        if role not in ("user", "assistant", "info"):
            raise ValueError(f"Invalid role: {role}")
        if role in ("user", "assistant"):
            self.messages.append({"role": role, "message": msg})
        if not from_js:
            # change new lines to html
            msg = msg.replace("\n", "<br>")
            self.page.evaluate(f"addChatMessage({repr(role)}, {repr(msg)});")

    def wait_for_user_message(self):
        logging.info("Waiting for message from user...")
        # reset flag
        self.page.evaluate("USER_MESSAGE_RECEIVED = false;")
        # wait for flag to be raised
        self.page.wait_for_function("USER_MESSAGE_RECEIVED", polling=100, timeout=0)
        logging.info("Message received.")

    def close(self):
        self.context.close()
        self.browser.close()


def get_chatbox_html() -> str:
    with open(CHATBOX_HTML_PATH, "r") as file:
        chatbox_html = file.read()

    with open(ASSISTANT_IMG_PATH, "rb") as f:
        # image = Image.open(f)
        image_base64 = base64.b64encode(f.read()).decode("utf-8")

    # hard-code the assistant image in the HTML
    assistant_image_url = f"data:image/png;base64,{image_base64}"
    chatbox_html = re.sub("<ASSISTANT_IMAGE_URL>", assistant_image_url, chatbox_html)

    return chatbox_html
