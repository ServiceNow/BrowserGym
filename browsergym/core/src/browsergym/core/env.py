import copy
import gymnasium as gym
import logging
import numpy as np
import playwright.sync_api
import time
import re

from abc import ABC
from pathlib import Path
from typing import Optional, Literal

from .chat import Chat
from .task import AbstractBrowserTask
from .spaces import Unicode, AnyDict, AnyBox
from .constants import TEXT_MAX_LENGTH, BROWSERGYM_ID_ATTRIBUTE, EXTRACT_OBS_MAX_TRIES
from .observation import (
    _pre_extract,
    _post_extract,
    extract_screenshot,
    extract_dom_snapshot,
    extract_dom_extra_properties,
    extract_merged_axtree,
    extract_focused_element_bid,
    MarkingError,
)
from .action.base import execute_python_code
from .action.highlevel import HighLevelActionSet
from .action.base import execute_python_code
from . import _get_global_playwright


logger = logging.getLogger(__name__)


class BrowserEnv(gym.Env, ABC):
    """The main BrowserGym class, which encapsulates instruction-following Web browsing into a Gymnasium environment."""

    # gym metadata
    metadata = {"render_modes": None}

    def __init__(
        self,
        # task-related arguments
        task_entrypoint: type[AbstractBrowserTask],
        task_kwargs: dict = {},
        viewport: Optional[dict] = None,  # will override the task's viewport
        slow_mo: Optional[int] = None,  # will override the task's slow_mo
        timeout: Optional[int] = None,  # will override the task's timeout
        tags_to_mark: Literal["all", "standard_html"] = "standard_html",
        # interactive / debugging arguments
        headless: bool = True,
        wait_for_user_message: bool = False,
        terminate_on_infeasible: bool = True,
        resizeable_window: bool = False,
        record_video_dir: Optional[str] = None,
        pw_chromium_kwargs: dict = {},
        pw_context_kwargs: dict = {},
        # agent-related arguments
        action_mapping: Optional[callable] = HighLevelActionSet().to_python_code,
    ):
        """
        Instantiate a ready to use BrowserEnv gym environment.

        Args:
            task_entrypoint: a callable that returns a new task object from a seed. Used for creating a new task during `reset()`.
            task_kwargs: additional arguments passed to `task_entrypoint`.
            viewport: desired viewport size. This will override the value defined by the task, which might change its behaviour and difficulty. Should only be set for debugging/testing.
            slow_mo: desired slow_mo value for Playwright. This will override the value defined by the task, which might change its behaviour and difficulty. Should only be set for debugging/testing.
            timeout: desired timeout value for Playwright. This will override the value defined by the task, which might change its behaviour and difficulty. Should only be set for debugging/testing.
            tags_to_mark: which HTML tags should be marked by BrowserGym and receive a bid. Value "all" will mark every element in the page, while "standard_html" (default) will only mark standard html tags.
            headless: whether the browser should run in headless mode or not. This will affect the viewport size, which might change the behaviour and difficulty of the task. Headless mode should only be disabled for debugging/testing.
            wait_for_user_message: whether the environment should pause and wait for a user message in the chat after a new message is sent by the agent. Useful for running agents in interactive mode.
            resizeable_window: whether the browser window should be resizeable or not. This will affect the viewport size, which might change the behaviour and difficulty of the task. Should only be set for debugging/testing.
            record_video_dir: if set, indicates a directory to which viewport videos will be recorded.
            pw_chromium_kwargs: extra parameters for the playwright Browser. Should only be used for debugging/testing.
            pw_context_kwargs: extra parameters for the playwright BrowserContext. Should only be used for debugging/testing.
            action_mapping: if set, the environment will use this function to map every received action to executable Python code.

        """
        super().__init__()
        self.task_entrypoint = task_entrypoint
        self.task_kwargs = dict(**task_kwargs)
        self.viewport = viewport
        self.slow_mo = slow_mo
        self.timeout = timeout
        self.tags_to_mark = tags_to_mark
        self.headless = headless
        self.wait_for_user_message = wait_for_user_message
        self.terminate_on_infeasible = terminate_on_infeasible
        self.resizeable_window = resizeable_window
        self.record_video_dir = record_video_dir
        self.pw_chromium_kwargs = pw_chromium_kwargs
        self.pw_context_kwargs = pw_context_kwargs
        self.action_mapping = action_mapping

        # check argument values
        assert tags_to_mark in ("all", "standard_html")

        # task
        self.task = None

        # playwright
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
                "goal_image_urls": gym.spaces.Sequence(
                    Unicode(min_length=0, max_length=TEXT_MAX_LENGTH)
                ),
                "open_pages_urls": gym.spaces.Sequence(
                    Unicode(min_length=0, max_length=TEXT_MAX_LENGTH)
                ),
                "active_page_index": gym.spaces.Box(low=0, high=255, dtype=int),
                "url": Unicode(min_length=0, max_length=TEXT_MAX_LENGTH),
                "screenshot": AnyBox(
                    low=0,
                    high=255,
                    shape=(-1, -1, 3),
                    dtype=np.uint8,
                ),  # swapped axes (height, width, RGB)
                "dom_object": AnyDict(),
                "axtree_object": AnyDict(),
                "extra_element_properties": AnyDict(),
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
        super().reset(seed=seed, *args, **kwargs)
        self.np_random = None  # make sure all randomness is handled by the task

        if self.task:
            self.task.teardown()
            self.context.close()
            self.chat.close()
            self.browser.close()

        # create a new task
        self.task = self.task_entrypoint(seed=seed, **self.task_kwargs)

        def override_property(task, env, property):
            """Extract property value from env if not None, otherwise from task."""
            env_value = getattr(env, property)
            task_value = getattr(task, property)
            if env_value is None:
                return task_value
            else:
                logger.warning(
                    f"Overriding the task's {property} parameter ({repr(task_value)} => {repr(env_value)}). This might change the task's behaviour and difficulty."
                )
                return env_value

        # fetch task's desired parameters for browser setup
        viewport = override_property(self.task, self, "viewport")
        slow_mo = override_property(self.task, self, "slow_mo")
        timeout = override_property(self.task, self, "timeout")

        # use the global Playwright instance
        pw: playwright.sync_api.Playwright = _get_global_playwright()
        # important: change playwright's test id attribute from "data-testid" to "bid"
        pw.selectors.set_test_id_attribute(BROWSERGYM_ID_ATTRIBUTE)

        # create a new browser
        self.browser = pw.chromium.launch(
            headless=self.headless,
            slow_mo=slow_mo,
            args=(
                [f"--window-size={viewport['width']},{viewport['height']}"]
                if self.resizeable_window
                else None
            ),
            # will raise an Exception if above args are overriden
            **self.pw_chromium_kwargs,
        )

        # create a new browser context for pages
        self.context = self.browser.new_context(
            no_viewport=True if self.resizeable_window else None,
            viewport=viewport,
            record_video_dir=(
                Path(self.record_video_dir) / "task_video" if self.record_video_dir else None
            ),
            record_video_size=viewport,
            # will raise an Exception if above args are overriden
            **self.pw_context_kwargs,
        )

        # set default timeout
        self.context.set_default_timeout(timeout)

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

        # create the chat
        self.chat = Chat(
            headless=self.headless,
            chat_size=(500, max(viewport["height"], 800)),
            record_video_dir=self.record_video_dir,
        )

        # create a new page
        self.page = self.context.new_page()
        recording_start_time = time.time()

        # setup the task
        goal, task_info = self.task.setup(page=self.page)

        # initialize the chat
        self.chat.add_message(
            role="assistant",
            msg="Hi! I am your UI assistant, I can perform web tasks for you. What can I help you with?",
        )
        # if any, add the task's goal to the chat
        if goal:

            # goal is text-only
            if isinstance(goal, str):
                goal_msg = goal

            # goal is text + images
            elif isinstance(goal, dict):
                goal_msg = goal["message"]
                for image_url in goal["image_urls"]:
                    self.chat.add_message(role="user_image", msg=image_url)

            self.chat.add_message(role="user", msg=goal_msg)

        self._wait_dom_loaded()

        # after the task's setup, the active page might have changed
        # perform a safety check
        self._active_page_check()

        # init start time
        self.start_time = time.time()

        # no action yet
        self.last_action = ""
        self.last_action_error = ""
        self.infeasible_message_received = False

        # if asked, wait for user message
        self._wait_for_user_message()

        # extract obs and info from environment
        obs = self._get_obs()

        info = {}
        info["task_info"] = task_info

        # TODO this is a bit hacky, find a better solution to record videos
        if self.record_video_dir:
            info["recording_start_time"] = recording_start_time
            info["recording_file"] = str(self.page.video.path())
            info["chat"] = {
                "recording_start_time": self.chat.recording_start_time,
                "recording_file": str(self.chat.page.video.path()),
            }

        return obs, info

    def step(self, action: str) -> tuple:

        self.last_action = action

        info = {}
        info["action_exec_start"] = time.time()
        info["action_exec_timeout"] = 0

        def send_message_to_user(text: str):
            self.chat.add_message(role="assistant", msg=text)

        def report_infeasible_instructions(reason: str):
            self.chat.add_message(role="infeasible", msg=reason)
            self.infeasible_message_received = True

        # try to execute the action
        logger.debug(f"Executing action")
        try:
            if self.action_mapping:
                code = self.action_mapping(action)
            else:
                code = action
            execute_python_code(
                code,
                self.page,
                send_message_to_user=send_message_to_user,
                report_infeasible_instructions=report_infeasible_instructions,
            )
            self.last_action_error = ""
        except Exception as e:
            self.last_action_error = f"{type(e).__name__}: {e}"
            match = re.match("TimeoutError: Timeout ([0-9]+)ms exceeded.", self.last_action_error)
            if match:
                info["action_exec_timeout"] = float(match.groups()[0]) / 1000  # ms to sec
        logger.debug(f"Action executed")
        info["action_exec_stop"] = time.time()

        # wait a bit (for the JavaScript callback to set the active page)
        time.sleep(0.5)  # wait for JS events to be fired (half a second)
        self.context.cookies()  # trigger all waiting Playwright callbacks on the stack (hack, see https://playwright.dev/java/docs/multithreading)

        # wait for the network to idle before extracting the observation, reward etc.
        self._wait_dom_loaded()

        # after the action is executed, the active page might have changed
        # perform a safety check
        self._active_page_check()
        logger.debug(f"Active page checked")

        # if asked, wait for user message
        self._wait_for_user_message()
        logger.debug(f"User message done")

        logger.debug(f"Initiating task validation")
        # extract reward, done, user_message, info (task-specific)
        reward, done, user_message, task_info = self._task_validate()
        info["task_info"] = task_info
        logger.debug(f"Task validation done")

        # add any user message sent by the task to the chat
        if user_message:
            self.chat.add_message(role="user", msg=user_message)

        # extract observation (generic)
        obs = self._get_obs()
        logger.debug(f"Observation extracted")

        # new step API wants a 5-tuple (gymnasium)
        terminated = done or (
            self.terminate_on_infeasible and self.infeasible_message_received
        )  # task or agent can terminate the episode
        truncated = False

        return obs, reward, terminated, truncated, info

    def _task_validate(self):
        # back-up these in case validate() navigates pages and messes the history
        prev_active_page = self.page
        prev_page_history = self.page_history.copy()
        # call validate
        reward, done, user_message, info = self.task.validate(self.page, self.chat.messages)

        # safety fix, in case validate() did mess up the active page and/or page history
        if prev_active_page != self.page or prev_page_history != self.page_history:
            logger.info(
                "The active page and / or page history has changed during task.validate(). A recovery fix will be applied."
            )
            self.page = prev_active_page
            self.page_history = prev_page_history

        return reward, done, user_message, info

    def _wait_for_user_message(self):
        # if last message is from the assistant, wait for a user message to continue
        # TODO: be smarter about when to wait for a user message (different action from the assistant?)
        if self.chat.messages[-1]["role"] == "assistant" and self.wait_for_user_message:
            self.chat.wait_for_user_message()

    def _wait_dom_loaded(self):
        for page in self.context.pages:
            try:
                page.wait_for_load_state("domcontentloaded", timeout=3000)
            except playwright.sync_api.Error:
                pass
            for frame in page.frames:
                try:
                    frame.wait_for_load_state("domcontentloaded", timeout=3000)
                except playwright.sync_api.Error:
                    pass

    def _activate_page_from_js(self, page: playwright.sync_api.Page):
        logger.debug(f"_activate_page_from_js(page) called, page={str(page)}")
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
            logger.warning(f"All pages are closed, opening a new page.")
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

        for retries_left in reversed(range(EXTRACT_OBS_MAX_TRIES)):
            try:
                # pre-extraction, mark dom elements (set bid, set dynamic attributes like value and checked)
                _pre_extract(self.page, self.tags_to_mark)

                dom = extract_dom_snapshot(self.page)
                axtree = extract_merged_axtree(self.page)
                focused_element_bid = extract_focused_element_bid(self.page)
                extra_properties = extract_dom_extra_properties(dom)
            except (playwright.sync_api.Error, MarkingError) as e:
                err_msg = str(e)
                # try to add robustness to async events (detached / deleted frames)
                if retries_left > 0 and (
                    "Frame was detached" in err_msg
                    or "Frame with the given frameId is not found" in err_msg
                    or "Execution context was destroyed" in err_msg
                    or "Frame has been detached" in err_msg
                    or "Cannot mark a child frame without a bid" in err_msg
                ):
                    logger.warning(
                        f"An error occured while extracting the dom and axtree. Retrying ({retries_left}/{EXTRACT_OBS_MAX_TRIES} tries left).\n{repr(e)}"
                    )
                    # post-extract cleanup (ARIA attributes)
                    _post_extract(self.page)
                    time.sleep(0.5)
                    continue
                else:
                    raise e
            break

        # post-extraction cleanup of temporary info in dom
        _post_extract(self.page)

        # use first user message as goal, if any
        # use all user images before first user message as goal images, if any
        goal_msg = "There is no goal."
        goal_image_urls = []
        _prev_image_urls = []
        for msg in self.chat.messages:
            if msg["role"] == "user_image":
                _prev_image_urls.append(msg["message"])
            elif msg["role"] == "user":
                goal_msg = msg["message"]
                goal_image_urls = _prev_image_urls
                break
            else:
                pass

        # obs is generic to all tasks
        obs = {
            "chat_messages": copy.deepcopy(self.chat.messages),
            "goal": goal_msg,  # TODO: redundant with chat messages, to be removed?
            "goal_image_urls": goal_image_urls,  # TODO: redundant with chat messages, to be removed?
            "open_pages_urls": [page.url for page in self.context.pages],
            "active_page_index": np.asarray([self.context.pages.index(self.page)]),
            "url": self.page.url,
            "screenshot": extract_screenshot(self.page),
            "dom_object": dom,
            "axtree_object": axtree,
            "extra_element_properties": extra_properties,
            "focused_element_bid": focused_element_bid,
            "last_action": self.last_action,
            "last_action_error": self.last_action_error,
            "elapsed_time": np.asarray([time.time() - self.start_time]),
        }

        return obs
