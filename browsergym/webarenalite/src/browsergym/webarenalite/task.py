import importlib.resources
import json
import logging
import os
import tempfile
from pathlib import Path
from typing import Optional

import playwright.sync_api

from browsergym.webarena.task import GenericWebArenaTask

logger = logging.getLogger(__name__)


class WebArenaLiteTask(GenericWebArenaTask):
    """
    Base class for all WebArena tasks.

    """

    def __init__(
        self,
        seed: int,
        task_id: Optional[int] = None,
        intent_template_id: Optional[int] = None,
        with_na_hint: bool = False,
        with_homepage_hint: bool = False,
    ):
        super().__init__(
            seed=seed,
            task_id=task_id,
            intent_template_id=intent_template_id,
            with_na_hint=with_na_hint,
            with_homepage_hint=with_homepage_hint,
        )

        all_configs_str = (
            importlib.resources.files("browsergym.webarenalite")
            .joinpath("test_webarena_lite.raw.json")
            .read_text()
        )
        # substitute URLs
        for pattern, url_key in {
            "__GITLAB__": "gitlab",
            "__REDDIT__": "reddit",
            "__SHOPPING__": "shopping",
            "__SHOPPING_ADMIN__": "shopping_admin",
            "__WIKIPEDIA__": "wikipedia",
            "__MAP__": "map",
        }.items():
            all_configs_str = all_configs_str.replace(pattern, self.webarena_instance.urls[url_key])

        # load all task configs to JSON
        all_configs = json.loads(all_configs_str)

        # keep only the desired task configs
        if intent_template_id is not None:
            task_configs = [
                conf for conf in all_configs if conf["intent_template_id"] == intent_template_id
            ]
            if not task_configs:
                raise ValueError(
                    f"Could not find any task config with intent_template_id={intent_template_id}."
                )

        elif task_id is not None:
            # use old_task_id to filter configs
            task_configs = [conf for conf in all_configs if conf["old_task_id"] == task_id]
            if not task_configs:
                raise ValueError(f"Could not find any task config with old_task_id={task_id}.")

        self.task_configs = task_configs

    def setup(self, page: playwright.sync_api.Page) -> tuple[str, dict]:
        # Using the custom evaluator for WebArena Lite
        from .evaluators import evaluator_router

        # pick a task at random
        self.config = self.random.choice(self.task_configs)

        # hack: dynamically build a config file to read from
        with tempfile.NamedTemporaryFile(mode="w+", delete=False) as f:
            json.dump(self.config, f)
            f.flush()
            self.config_file = f.name

        # build the evaluator
        self.evaluator = evaluator_router(self.config_file)

        # add extra context headers if they are present (e.g. for access token to the self hosted webarena verified instances)
        if os.environ.get("PW_EXTRA_HEADERS"):
            extra_headers_file_path = Path(os.environ["PW_EXTRA_HEADERS"])
            try:
                with open(extra_headers_file_path, "r") as f:
                    extra_headers = json.load(f)
                page.context.set_extra_http_headers(extra_headers)
            except Exception as e:
                logger.warning(f"Failed to load extra headers from {extra_headers_file_path}: {e}. Make sure to set the PW_EXTRA_HEADERS environment variable to the path of an existing json file containing the extra headers. Continuing without extra headers.")

        # authenticate
        for site in self.config["sites"]:
            self.webarena_instance.ui_login(site=site, page=page)

        # set geolocation
        page.context.set_geolocation(self.config["geolocation"])

        # navigate to the starting url(s) (might need several pages)
        # https://github.com/web-arena-x/webarena/blob/c6475f0e9affe5252a2966e26b8cb4c834a4ae40/browser_env/envs.py#L150
        if self.config["start_url"]:
            start_urls = self.config["start_url"].split(" |AND| ")
            for i, url in enumerate(start_urls):
                page.goto(url)
                if i < len(start_urls) - 1:
                    page = page.context.new_page()

        # recover goal
        goal = self.config["intent"]

        # This note is present in all webarena's agent prompts
        # https://github.com/web-arena-x/webarena/blob/c6475f0e9affe5252a2966e26b8cb4c834a4ae40/agent/prompts/raw/p_cot_id_actree_2s.py#L34
        if self.with_homepage_hint:
            goal += f"""

(Note: if you want to visit other websites, check out the homepage at {self.webarena_instance.home_url}. It has a list of websites you can visit. {self.webarena_instance.home_url}/password.html lists all the account name and password for the websites. You can use them to log in to the websites.)
"""

        # This note is present in some of webarena's agent prompts
        if self.with_na_hint:
            goal += """\

If you believe the task is impossible to complete, provide the answer "N/A".
"""

        return goal, {}
