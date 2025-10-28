import importlib.resources
import json
import logging
import tempfile
from pathlib import Path
from time import sleep
from typing import Optional

import playwright._impl._errors as playwright_errors
import playwright.sync_api

from browsergym.webarena.task import GenericWebArenaTask
from browsergym.webarena_verified.evaluators import WebArenaVerifiedEvaluator
from webarena_verified.types import FinalAgentResponse

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
        with tempfile.NamedTemporaryFile(
            mode="w+", delete=False, prefix=f"wav-{self.config['intent_template_id']}-{self.config['task_id']}_", suffix=".json"
        ) as f:
            json.dump(self.config, f, indent=4)
            f.flush()
            self.config_file = f.name

        # build the evaluator using the new webarena_verified evaluation system
        self.evaluator = WebArenaVerifiedEvaluator(self.webarena_instance)

        # add extra context headers if they are present (e.g. for access token to the self hosted webarena verified instances)
        extra_headers_file_path = Path(__file__).parent / "pw_extra_headers.json"
        if extra_headers_file_path.exists():
            with open(extra_headers_file_path, "r") as f:
                extra_headers = json.load(f)
            page.context.set_extra_http_headers(extra_headers)

        # authenticate
        for site in self.config["sites"]:
            for attempt in range(3):
                try:
                    self.webarena_instance.ui_login(site=site, page=page)
                    break  # Success, move to next site
                except playwright_errors.TimeoutError as e:
                    if attempt == 2:  # Last attempt (0, 1, 2)
                        raise  # Re-raise the timeout error after 3 failed attempts
                    sleep(1)  # Wait 1 second before retrying

        # enable playwright tracing (required for webarena_verified evaluation)
        page.context.tracing.start(snapshots=True)

        # set geolocation if specified
        if self.config.get("geolocation"):
            page.context.set_geolocation(self.config["geolocation"])

        # navigate to the starting url(s) (might need several pages)
        # https://github.com/web-arena-x/webarena/blob/c6475f0e9affe5252a2966e26b8cb4c834a4ae40/browser_env/envs.py#L150
        if start_urls := self.config.get("start_urls"):
            for i, url in enumerate(start_urls):
                page.goto(url)
                if i < len(start_urls) - 1:
                    page = page.context.new_page()

        # recover goal
        goal = self.config["intent"]

        # WebArena Verified requires a specific format for the agent response
        goal += """

When you are done, send your final answer to the user with `send_response_to_wav`.
"""
#         response_schema = FinalAgentResponse.model_json_schema()
#         goal += f"""

# ---
# Final response format: When you send your final answer to the user with `send_msg_to_user`, your message must be a json formatted string that matches the following schema:
# ```
# {json.dumps(response_schema, indent=4)}
# ```
# Your message in `send_msg_to_user` will be validated against this schema.
# """

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
