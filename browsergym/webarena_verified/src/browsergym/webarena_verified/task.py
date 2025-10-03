import importlib.resources
import json
import logging
import tempfile
from typing import Optional

import playwright.sync_api

from browsergym.webarena.task import GenericWebArenaTask
from browsergym.webarena_verified.evaluators import WebArenaVerifiedEvaluator
from browsergym.webarena_verified.instance import WebArenaVerifiedInstance

logger = logging.getLogger(__name__)


class WebArenaVerifiedTask(GenericWebArenaTask):
    """
    WebArena Verified task class that integrates the full evaluation system
    from platform-labs-agent-eval-harness.
    
    This task class handles the new evaluation format with:
    - expected_retrieve_value
    - expected_backend_state  
    - expected_ui_state
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

        # override the webarena instance to use the webarena_verified instance
        self.webarena_instance = WebArenaVerifiedInstance()

        # Load the webarena_verified.json file
        all_configs_str = (
            importlib.resources.files("browsergym.webarena_verified")
            .joinpath("webarena_verified.json")
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
            # Filter configs by task_id
            task_configs = [conf for conf in all_configs if conf["task_id"] == task_id]
            if not task_configs:
                raise ValueError(f"Could not find any task config with task_id={task_id}.")
        else:
            # keep all task configs
            task_configs = all_configs

        self.task_configs = task_configs

    def setup(self, page: playwright.sync_api.Page) -> tuple[str, dict]:
        # pick a task at random
        self.config = self.random.choice(self.task_configs)

        # hack: dynamically build a config file to read from
        with tempfile.NamedTemporaryFile(mode="w+", delete=False) as f:
            json.dump(self.config, f)
            f.flush()
            self.config_file = f.name

        # build the evaluator using the new webarena_verified evaluation system
        self.evaluator = WebArenaVerifiedEvaluator(self.webarena_instance)

        # authenticate
        for site in self.config["sites"]:
            self.webarena_instance.ui_login(site=site, page=page)

        # set geolocation if specified
        if self.config.get("geolocation"):
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
        # However, webarena_verified does not have a homepage, so skip this hint
        self.with_homepage_hint = False
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
