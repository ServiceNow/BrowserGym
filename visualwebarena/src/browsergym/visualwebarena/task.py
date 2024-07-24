import json
import logging
import playwright.sync_api
import importlib.resources
import tempfile
import requests

from typing import Optional, Tuple

from browsergym.core.task import AbstractBrowserTask

from .instance import VisualWebArenaInstance

logger = logging.getLogger(__name__)


class GenericVisualWebArenaTask(AbstractBrowserTask):
    """
    Base class for all WebArena tasks.

    """

    def __init__(
        self,
        seed: int,
        task_id: Optional[int] = None,
        intent_template_id: Optional[int] = None,
        with_na_hint: bool = False,
    ) -> None:
        super().__init__(seed)

        # task properties, will be used to set up the browsergym environment
        self.viewport = {"width": 1280, "height": 720}
        self.slow_mo = 1000  # ms
        self.timeout = 10000  # ms

        self.webarena_instance = VisualWebArenaInstance()
        self.config_file: str = None
        self.with_na_hint = with_na_hint

        # one and only one of task id and template id must be provided
        if (task_id is None) == (intent_template_id is None):
            raise ValueError(
                f"One and only one of 'task_id' and 'intent_template_id' must be provided (task_id={task_id}, intent_template_id={intent_template_id})."
            )

        # read the list of all webarena task configs
        import visualwebarena

        all_configs_str = (
            importlib.resources.files(visualwebarena).joinpath("test_raw.json").read_text()
        )

        # substitute URLs
        for pattern, url_key in {
            "__REDDIT__": "reddit",
            "__SHOPPING__": "shopping",
            "__WIKIPEDIA__": "wikipedia",
            "__CLASSIFIEDS__": "classifieds",
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
            task_configs = [conf for conf in all_configs if conf["task_id"] == task_id]
            if not task_configs:
                raise ValueError(
                    f"Could not find any task config with task_id={intent_template_id}."
                )

        self.task_configs = task_configs

    def setup(self, page: playwright.sync_api.Page) -> tuple[str, dict]:
        # import webarena on instanciation
        from visualwebarena.evaluation_harness.evaluators import evaluator_router

        # pick a task at random
        self.config = self.random.choice(self.task_configs)

        # hack: dynamically build a config file to read from
        with tempfile.NamedTemporaryFile(mode="w+", delete=False) as f:
            json.dump(self.config, f)
            f.flush()
            self.config_file = f.name

        # build the evaluator
        self.evaluator = evaluator_router(self.config_file)

        # reset instance if needed (classifieds domain only)
        if self.config.get("require_reset", False):
            if "classifieds" in self.config["sites"]:
                # Send POST request to __CLASSIFIEDS__/index.php?page=reset with token=CLASSIFIEDS_TOKEN
                response = requests.post(
                    f'{self.webarena_instance.urls["classifieds"]}/index.php?page=reset',
                    data={"token": self.webarena_instance.classifieds_reset_token},
                )

                # Check if the request was successful
                if not response.status_code == 200:
                    raise Exception(f"Failed to reset Classifieds site: {response.status_code}")

                logger.info("Reset Classifieds site successful.")

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
        goal = {
            "message": self.config["intent"],
            "image_urls": self.config.get("image", []),
        }
        # fix goal if needed
        if goal["image_urls"] is None:
            goal["image_urls"] = []
        elif isinstance(goal["image_urls"], str):
            goal["image_urls"] = [goal["image_urls"]]

        # This note is present in some of webarena's agent prompts
        if self.with_na_hint:
            goal[
                "message"
            ] += """\

If you believe the task is impossible to complete, provide the answer "N/A".
"""

        return goal, {}

    def cheat(self, page: playwright.sync_api.Page, chat_messages: list[str]) -> None:
        raise NotImplementedError

    @classmethod
    def get_task_id(cls):
        """
        Generic class for several task ids, this way of obtaining the task id is not compatible for now.
        """
        raise NotImplementedError

    def teardown(self) -> None:
        # Nothing to be done here
        # https://github.com/web-arena-x/webarena/blob/c6475f0e9affe5252a2966e26b8cb4c834a4ae40/browser_env/envs.py#L227
        pass

    def validate(
        self, page: playwright.sync_api.Page, chat_messages: list[str]
    ) -> Tuple[float, bool, str, dict]:
        # import webarena on instanciation
        from visualwebarena.browser_env.actions import ActionTypes

        # if any, use the last assistant message as the stop answer for webarena
        if chat_messages and chat_messages[-1]["role"] == "assistant":
            last_action = {"action_type": ActionTypes.STOP, "answer": chat_messages[-1]["message"]}
        elif chat_messages and chat_messages[-1]["role"] == "infeasible":
            last_action = {"action_type": ActionTypes.STOP, "answer": "N/A"}
        else:
            last_action = {"action_type": ActionTypes.NONE, "answer": ""}
            # llm_fuzzy_match() bugfix
            last_action["answer"] = "whatever"

        # hack: fake trajectory for evaluation (only last_action["answer"] is used in the webarena evaluation codebase)
        trajectory = [{}, last_action]  # StateInfo, Action

        # call the evaluator
        try:
            score = self.evaluator(
                trajectory=trajectory,
                config_file=self.config_file,
                page=page,  # none of webarena's evaluators requires a cdp session
            )
        # llm_fuzzy_match() bugfix (assert "correct" in response)
        except AssertionError as e:
            logger.info(
                "llm_fuzzy_match() bugfix applied: AssertionError in evaluator, using score = 0.0"
            )
            score = 0.0

        if score > 0 or last_action["action_type"] == ActionTypes.STOP:
            return score, True, "", {}
        else:
            return score, False, "", {}
