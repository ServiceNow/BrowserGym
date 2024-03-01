from pathlib import Path
import gymnasium as gym
import logging
import numpy as np
import playwright.sync_api
import time

from abc import ABC
from typing import Optional, Literal

from .chat import Chat
from .task import AbstractBrowserTask
from .spaces import Unicode, AnyDict
from .constants import TEXT_MAX_LENGTH, BROWSERGYM_ID_ATTRIBUTE, EXTRACT_OBS_MAX_TRIES
from .observation import (
    _pre_extract,
    _post_extract,
    extract_screenshot,
    extract_dom_snapshot,
    extract_merged_axtree,
    extract_focused_element_bid,
)
from .action.base import execute_python_code
from .action.highlevel import HighLevelActionSet
from .action.base import execute_python_code
from . import _get_global_playwright


class BrowserEnv(gym.Env, ABC):
    # gym metadata
    metadata = {"render_modes": None}

    def __init__(
        self,
        task_entrypoint: type[AbstractBrowserTask],
        headless: bool = True,
        viewport: dict = {"width": 1280, "height": 720},
        slow_mo: int = 1000,  # in milliseconds
        timeout: int = 5000,
        wait_for_user_message: bool = False,
        demo_mode: Literal["off", "default", "only_visible_elements"] = "off",
        record_video_dir: str = None,
        playwright_kwargs: dict = {},
        action_mapping: Optional[callable] = HighLevelActionSet().to_python_code,
        **task_kwargs,
    ):
        super().__init__()
        self.task_entrypoint = task_entrypoint
        self.task_kwargs = task_kwargs
        self.headless = headless
        self.viewport = viewport
        self.slow_mo = slow_mo
        self.timeout = timeout
        self.wait_for_user_message = wait_for_user_message
        self.demo_mode = demo_mode
        self.action_mapping = action_mapping
        self.record_video_dir = record_video_dir

        # task
        self.task = None

        # playwright
        self.playwright_kwargs = playwright_kwargs
        self.playwright_kwargs.setdefault("headless", self.headless)
        self.playwright_kwargs.setdefault("slow_mo", self.slow_mo)
        self.playwright_kwargs.setdefault(
            "args", [f"--window-size={self.viewport['width']},{self.viewport['height']}"]
        )
        self.browser: playwright.sync_api.Browser = None
        self.context: playwright.sync_api.BrowserContext = None
        self.page: playwright.sync_api.Page = None
        self.page_history: dict = {}

        # chat
        self.chat: Chat = None

        # observation space
        self.observation_space = gym.spaces.Dict(
            {
                "chat_messages": gym.spaces.Sequence(
                    gym.spaces.Dict(
                        {
                            "role": Unicode(min_length=0, max_length=TEXT_MAX_LENGTH),
                            "message": Unicode(min_length=0, max_length=TEXT_MAX_LENGTH),
                        }
                    )
                ),
                # TODO: this is redundant with chat messages, to be removed
                "goal": Unicode(min_length=0, max_length=TEXT_MAX_LENGTH),
                "open_pages_urls": gym.spaces.Sequence(
                    Unicode(min_length=0, max_length=TEXT_MAX_LENGTH)
                ),
                "active_page_index": gym.spaces.Box(low=0, high=255, dtype=int),
                "url": Unicode(min_length=0, max_length=TEXT_MAX_LENGTH),
                "screenshot": gym.spaces.Box(
                    0,
                    255,
                    shape=(viewport["height"], viewport["width"], 3),
                    dtype=np.uint8,
                ),  # swapped axes (height first)
                "dom_object": AnyDict(),
                "axtree_object": AnyDict(),
                "focused_element_bid": Unicode(min_length=0, max_length=TEXT_MAX_LENGTH),
                "last_action": Unicode(min_length=0, max_length=TEXT_MAX_LENGTH),
                "last_action_error": Unicode(min_length=0, max_length=TEXT_MAX_LENGTH),
                "elapsed_time": gym.spaces.Box(low=0, high=np.inf, dtype=float),
            }
        )

        # action space
        self.action_space = Unicode(min_length=0, max_length=TEXT_MAX_LENGTH)

    def close(self):
        if self.task:
            # stop the task
            self.task.teardown()
            # close the chat
            self.chat.close()
            # close the browser context
            self.context.close()
            # close the browser
            self.browser.close()
            self.task = None

    def reset(self, seed=None, *args, **kwargs):
        # we need the following line to seed self.np_random
        super().reset(seed=seed, *args, **kwargs)

        if self.task:
            self.task.teardown()
            self.context.close()
            self.chat.close()
        else:
            pw: playwright.sync_api.Playwright = _get_global_playwright()
            # important: change playwright's test id attribute from "data-testid" to "bid"
            pw.selectors.set_test_id_attribute(BROWSERGYM_ID_ATTRIBUTE)
            self.browser = pw.chromium.launch(**self.playwright_kwargs)

        # create a new browser context for pages
        t_before = time.time()
        self.context = self.browser.new_context(
            no_viewport=True,
            record_video_dir=(
                Path(self.record_video_dir) / "task_video" if self.record_video_dir else None
            ),
            record_video_size=self.viewport,
        )
        # create the chat at the same time to make sure videos are synced
        self.chat = Chat(
            headless=self.playwright_kwargs["headless"], record_video_dir=self.record_video_dir
        )
        t_after = time.time()
        recording_start_time = (t_before + t_after) / 2  # recording start time

        # set default timeout
        self.context.set_default_timeout(self.timeout)

        # hack: keep track of the active page with a javascript callback
        # there is no concept of active page in playwright
        # https://github.com/microsoft/playwright/issues/2603
        self.context.expose_binding(
            "browsergym_page_activated", lambda source: self._activate_page_from_js(source["page"])
        )
        self.context.add_init_script(
            r"""
window.browsergym_page_activated();
window.addEventListener("focus", () => {window.browsergym_page_activated();}, {capture: true});
window.addEventListener("focusin", () => {window.browsergym_page_activated();}, {capture: true});
window.addEventListener("load", () => {window.browsergym_page_activated();}, {capture: true});
window.addEventListener("pageshow", () => {window.browsergym_page_activated();}, {capture: true});
window.addEventListener("mousemove", () => {window.browsergym_page_activated();}, {capture: true});
window.addEventListener("mouseup", () => {window.browsergym_page_activated();}, {capture: true});
window.addEventListener("mousedown", () => {window.browsergym_page_activated();}, {capture: true});
window.addEventListener("wheel", () => {window.browsergym_page_activated();}, {capture: true});
window.addEventListener("keyup", () => {window.browsergym_page_activated();}, {capture: true});
window.addEventListener("keydown", () => {window.browsergym_page_activated();}, {capture: true});
window.addEventListener("input", () => {window.browsergym_page_activated();}, {capture: true});
window.addEventListener("touchstart", () => {window.browsergym_page_activated();}, {capture: true});
window.addEventListener("touchend", () => {window.browsergym_page_activated();}, {capture: true});
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        window.browsergym_page_activated();
    }
}, {capture: true});
"""
        )

        # create a new page
        self.page = self.context.new_page()

        # create and setup a new task
        task_seed = self.np_random.integers(np.iinfo(np.int32).max + 1)
        self.task = self.task_entrypoint(**self.task_kwargs)
        goal, info = self.task.setup(seed=task_seed, page=self.page)

        # initialize the chat
        self.chat.add_message(
            role="assistant",
            msg="Hi! I am your UI assistant, I can perform web tasks for you. What can I help you with?",
        )
        # if any, add the task's goal to the chat
        if goal:
            self.chat.add_message(role="user", msg=goal)

        self._wait_dom_loaded()

        # after the task's setup, the active page might have changed
        # perform a safety check
        self._active_page_check()

        # init start time
        self.start_time = time.time()

        # no action yet
        self.last_action = ""
        self.last_action_error = ""

        # extract obs and info from environment
        obs = self._get_obs()

        if self.record_video_dir:
            info["recording_start_time"] = recording_start_time

        return obs, info

    def step(self, action: str) -> tuple:
        self.last_action = action

        # try to execute the action
        try:
            if self.action_mapping:
                code = self.action_mapping(action)
            else:
                code = action
            execute_python_code(
                code,
                self.page,
                send_message_to_user=lambda text: self.chat.add_message(role="assistant", msg=text),
            )
            self.last_action_error = ""
        except Exception as e:
            self.last_action_error = f"{type(e).__name__}: {e}"

        # wait a bit (for the JavaScript callback to set the active page)
        time.sleep(0.5)  # wait for JS events to be fired (half a second)
        self.context.cookies()  # trigger all waiting Playwright callbacks on the stack (hack, see https://playwright.dev/java/docs/multithreading)

        # after the action is executed, the active page might have changed
        # perform a safety check
        self._active_page_check()

        # wait for the network to idle before extracting the observation, reward etc.
        self._wait_dom_loaded()

        # reward, done, user_message, info are task-specific
        reward, done, user_message, info = self.task.validate(self.page, self.chat.messages)

        # add any user message sent by the task to the chat
        if user_message:
            self.chat.add_message(role="user", msg=user_message)

        # extract obs, reward etc.
        obs = self._get_obs()

        # new step API wants a 5-tuple (gymnasium)
        terminated = done
        truncated = False

        return obs, reward, terminated, truncated, info

    def _wait_dom_loaded(self):
        for page in self.context.pages:
            try:
                page.wait_for_load_state("domcontentloaded", timeout=3000)
            except playwright.sync_api.TimeoutError:
                pass
            for frame in page.frames:
                try:
                    frame.wait_for_load_state("domcontentloaded", timeout=3000)
                except playwright.sync_api.TimeoutError:
                    pass

    def _activate_page_from_js(self, page: playwright.sync_api.Page):
        if not page.context == self.context:
            raise RuntimeError(
                f"Unexpected: activating a page that belongs to a different browser context ({page})."
            )

        # add the activated page to the page history (or move it to last which is the most recent)
        if page in self.page_history:
            self.page_history[page] = self.page_history.pop(
                page
            )  # move page to the end of dictionnary
        else:
            self.page_history[page] = None  # add page to the end of dictionnary

        self.page = page

    def _active_page_check(self):
        # make sure there is always a page open
        # if all pages have been closed, create a new page
        if len(self.context.pages) == 0:
            logging.warning(f"All pages are closed, opening a new page.")
            self.page = self.context.new_page()

        # if the active page got closed, get the last active page from the history
        while self.page_history and (self.page.is_closed() or self.page not in self.context.pages):
            self.page_history.pop(self.page)  # remove active page from history
            self.page = list(self.page_history.keys())[
                -1
            ]  # set last active page as the active page (most recent)

        # active page should share the same browser context with the environment
        if self.page not in self.context.pages:
            raise RuntimeError(
                f"Unexpected: active page is not part of the browser context's open pages ({self.page})."
            )

        # active page should not be closed
        if self.page.is_closed():
            raise RuntimeError(f"Unexpected: active page has been closed ({self.page}).")

    def _get_obs(self):

        # if last message is from the assistant, wait for a user message to continue
        # TODO: be smarter about when to wait for a user message (different action from the assistant?)
        if self.chat.messages[-1]["role"] == "assistant" and self.wait_for_user_message:
            self.chat.wait_for_user_message()

        for retries_left in reversed(range(EXTRACT_OBS_MAX_TRIES)):
            try:
                # pre-extraction, mark dom elements (set bid, set dynamic attributes like value and checked)
                _pre_extract(self.page)

                dom = extract_dom_snapshot(self.page)
                axtree = extract_merged_axtree(self.page)
                focused_element_bid = extract_focused_element_bid(self.page)
            except playwright.sync_api.Error as e:
                err_msg = str(e)
                # try to add robustness to async events (detached / deleted frames)
                if retries_left > 0 and (
                    "Frame was detached" in err_msg
                    or "Frame with the given frameId is not found" in err_msg
                    or "Execution context was destroyed" in err_msg
                ):
                    logging.warning(
                        f"An error occured while extracting the dom and axtree. Retrying ({retries_left}/{EXTRACT_OBS_MAX_TRIES} tries left).\n{repr(e)}"
                    )
                    # post-extract cleanup (aria-roledescription attribute)
                    _post_extract(self.page)
                    time.sleep(0.5)
                    continue
                else:
                    raise e
            break

        # post-extraction cleanup of temporary info in dom
        _post_extract(self.page)

        # use first user message as goal, if any
        if len(self.chat.messages) > 1:
            assert self.chat.messages[1]["role"] == "user"
            goal = self.chat.messages[1]["message"]
        else:
            goal = "Do whatever."

        # obs is generic to all tasks
        obs = {
            "chat_messages": self.chat.messages,
            "goal": goal,  # TODO: redundant with chat messages, to be removed?
            "open_pages_urls": [page.url for page in self.context.pages],
            "active_page_index": np.asarray([self.context.pages.index(self.page)]),
            "url": self.page.url,
            "screenshot": extract_screenshot(self.page),
            "dom_object": dom,
            "axtree_object": axtree,
            "focused_element_bid": focused_element_bid,
            "last_action": self.last_action,
            "last_action_error": self.last_action_error,
            "elapsed_time": np.asarray([time.time() - self.start_time]),
        }

        return obs
