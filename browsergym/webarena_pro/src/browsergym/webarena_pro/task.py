import importlib.resources
import json
import logging
from typing import Optional, Tuple

import playwright.sync_api

from browsergym.core.task import AbstractBrowserTask

from .instance import WebArenaProInstance

logger = logging.getLogger(__name__)


class GenericWebArenaProTask(AbstractBrowserTask):
    """
    Base class for all WebArena-Pro tasks.

    Modeled after WebArena's GenericWebArenaTask. Each task is defined by a
    JSON config in test.raw.json with placeholder URLs like __MATTERMOST__
    that get substituted at runtime.
    """

    def __init__(
        self,
        seed: int,
        task_id: Optional[int] = None,
    ) -> None:
        super().__init__(seed)

        # task properties
        self.viewport = {"width": 1280, "height": 720}
        self.slow_mo = 1000  # ms
        self.timeout = 10000  # ms

        self.instance = WebArenaProInstance()

        if task_id is None:
            raise ValueError("task_id must be provided.")

        # read all task configs
        all_configs_str = (
            importlib.resources.files("browsergym.webarena_pro")
            .joinpath("test.raw.json")
            .read_text()
        )

        # substitute site URL placeholders
        # Add new sites here: "__NEWSITE__": "newsite"
        for pattern, url_key in {
            "__MATTERMOST__": "mattermost",
        }.items():
            all_configs_str = all_configs_str.replace(pattern, self.instance.urls[url_key])

        all_configs = json.loads(all_configs_str)

        # find the matching task config
        task_configs = [conf for conf in all_configs if conf["task_id"] == task_id]
        if not task_configs:
            raise ValueError(f"Could not find any task config with task_id={task_id}.")

        self.task_configs = task_configs

    def setup(self, page: playwright.sync_api.Page) -> tuple[str, dict]:
        # pick a task config (random if multiple match, e.g. same template)
        self.config = self.random.choice(self.task_configs)

        # authenticate to required sites
        for site in self.config.get("sites", []):
            self.instance.ui_login(site=site, page=page)

        # navigate to the start URL
        if self.config.get("start_url"):
            start_urls = self.config["start_url"].split(" |AND| ")
            for i, url in enumerate(start_urls):
                page.goto(url)
                if i < len(start_urls) - 1:
                    page = page.context.new_page()

        goal = self.config["intent"]
        return goal, {}

    def cheat(self, page: playwright.sync_api.Page, chat_messages: list[str]) -> None:
        raise NotImplementedError

    def validate(
        self, page: playwright.sync_api.Page, chat_messages: list[str]
    ) -> Tuple[float, bool, str, dict]:
        # For now, validation is manual (human judges or custom evaluators).
        # Tasks can define an "eval" field in their config for automated checks.
        eval_config = self.config.get("eval", None)

        if eval_config is None:
            # no automated evaluation — task is never auto-terminated
            return 0.0, False, "", {}

        eval_type = eval_config.get("eval_types", [None])[0]

        if eval_type == "string_match":
            # check if the agent sent a matching answer via chat
            reference = eval_config.get("reference_answers", {})
            if chat_messages and chat_messages[-1]["role"] == "assistant":
                answer = chat_messages[-1]["message"].strip().lower()
                must_include = reference.get("must_include", [])
                if all(ref.lower() in answer for ref in must_include):
                    return 1.0, True, "", {}
            return 0.0, False, "", {}

        # default: no auto-validation
        return 0.0, False, "", {}

    @classmethod
    def get_task_id(cls):
        raise NotImplementedError
