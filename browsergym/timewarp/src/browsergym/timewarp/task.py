import importlib.resources
import json
import logging
import tempfile
import urllib.parse
from typing import Optional, Tuple

import playwright.sync_api

from browsergym.core.task import AbstractBrowserTask

from .instance import TimeWarpInstance

logger = logging.getLogger(__name__)


# Simple action types (no WebArena dependency)
class ActionTypes:
    STOP = "stop"
    NONE = "none"


class GenericTimeWarpTask(AbstractBrowserTask):
    """Base class for all TimeWarp tasks."""

    def __init__(
        self,
        seed: int,
        task_id: Optional[int] = None,
        intent_template_id: Optional[int] = None,
        with_na_hint: bool = False,
    ) -> None:
        super().__init__(seed)

        self.viewport = {"width": 1280, "height": 720}
        self.slow_mo = 1000
        self.timeout = 10000

        self.timewarp_instance = TimeWarpInstance()
        self.config_file: str = None
        self.with_na_hint = with_na_hint

        if (task_id is None) == (intent_template_id is None):
            raise ValueError(
                f"One and only one of 'task_id' and 'intent_template_id' must be provided "
                f"(task_id={task_id}, intent_template_id={intent_template_id})."
            )

        import browsergym.timewarp

        try:
            all_configs_str = (
                importlib.resources.files(browsergym.timewarp)
                .joinpath("data/test.raw.json")
                .read_text()
            )
        except Exception as e:
            raise RuntimeError(f"Failed to load TimeWarp task configurations: {e}")

        # Substitute TimeWarp URLs
        for site_key, site_url in self.timewarp_instance.urls.items():
            placeholder = f"__{site_key.upper()}__"
            all_configs_str = all_configs_str.replace(placeholder, site_url)

        try:
            all_configs = json.loads(all_configs_str)
        except json.JSONDecodeError as e:
            raise RuntimeError(f"Failed to parse TimeWarp task configurations: {e}")

        if intent_template_id is not None:
            task_configs = [
                conf for conf in all_configs if conf.get("intent_template_id") == intent_template_id
            ]
            if not task_configs:
                raise ValueError(f"Could not find task config with intent_template_id={intent_template_id}.")
        elif task_id is not None:
            task_configs = [conf for conf in all_configs if conf.get("task_id") == task_id]
            if not task_configs:
                raise ValueError(
                    f"Could not find task config with task_id={task_id}. "
                    f"Available: {[c.get('task_id') for c in all_configs]}"
                )

        self.task_configs = task_configs

    def setup(self, page: playwright.sync_api.Page) -> tuple[str, dict]:
        from .evaluators import evaluator_router

        self.config = self.random.choice(self.task_configs)

        with tempfile.NamedTemporaryFile(mode="w+", delete=False, suffix=".json") as f:
            json.dump(self.config, f)
            f.flush()
            self.config_file = f.name

        self.evaluator = evaluator_router(self.config_file)

        for site in self.config.get("sites", []):
            try:
                self.timewarp_instance.ui_login(site=site, page=page)
            except Exception as e:
                logger.warning(f"Authentication failed for site '{site}': {e}")

        if "geolocation" in self.config:
            try:
                page.context.set_geolocation(self.config["geolocation"])
            except Exception as e:
                logger.warning(f"Failed to set geolocation: {e}")

        if self.config.get("start_url"):
            start_urls = self.config["start_url"].split(" |AND| ")
            for i, url in enumerate(start_urls):
                try:
                    page.goto(url, timeout=self.timeout)
                    if i < len(start_urls) - 1:
                        page = page.context.new_page()
                except Exception as e:
                    logger.error(f"Failed to navigate to {url}: {e}")
                    raise

        goal = self.config.get("intent", "Complete the task")
        
        # Add additional instructions if present
        if "additional_instructions" in self.config:
            goal += f"\n\n{self.config['additional_instructions']}"


        if self.with_na_hint:
            goal += '\n\nIf you believe the task is impossible to complete, provide the answer "N/A".'

        task_info = {
            "goal": goal,
            "task_id": self.config.get("task_id"),
            "sites": self.config.get("sites", []),
        }

        return goal, task_info

    def cheat(self, page: playwright.sync_api.Page, chat_messages: list[str]) -> None:
        raise NotImplementedError

    @classmethod
    def get_task_id(cls):
        raise NotImplementedError

    def teardown(self) -> None:
        if self.config_file:
            try:
                import os
                os.unlink(self.config_file)
            except Exception as e:
                logger.warning(f"Failed to clean up config file: {e}")

    def validate(
        self, page: playwright.sync_api.Page, chat_messages: list[str]
    ) -> Tuple[float, bool, str, dict]:
        # Check authorized URLs
        authorized_locations = ["newtab", "localhost", "127.0.0.1", ""] + [
            urllib.parse.urlparse(url).netloc
            for url in self.timewarp_instance.urls.values()
        ]

        for open_page in page.context.pages:
            page_location = urllib.parse.urlparse(open_page.url).netloc
            if page_location and page_location not in authorized_locations:
                logger.warning(f"Unauthorized URL detected: {open_page.url}")
                return 0, True, "", {"error": f"Unauthorized url: {open_page.url}"}

        # Extract answer from chat
        # The agent sends answers via send_msg_to_user() action, which adds a message with role="assistant"
        if chat_messages and chat_messages[-1]["role"] == "assistant":
            last_action = {"action_type": ActionTypes.STOP, "answer": chat_messages[-1]["message"]}
        elif chat_messages and chat_messages[-1]["role"] == "infeasible":
            last_action = {"action_type": ActionTypes.STOP, "answer": "N/A"}
        else:
            last_action = {"action_type": ActionTypes.NONE, "answer": ""}

        trajectory = [{}, last_action]

        # Only evaluate if there's an actual answer (sent via send_msg_to_user) to avoid unnecessary API calls
        answer = last_action.get("answer", "").strip()
        if answer:
            try:
                score = self.evaluator(
                    trajectory=trajectory,
                    config_file=self.config_file,
                    page=page,
                    client=None,
                )
            except Exception as e:
                logger.error(f"Evaluation error: {e}")
                score = 0.0
        else:
            score = 0.0

        done = score > 0 or last_action["action_type"] == ActionTypes.STOP

        return score, done, "", {}
