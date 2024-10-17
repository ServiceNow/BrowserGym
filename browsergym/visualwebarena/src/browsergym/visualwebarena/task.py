import importlib.resources
import json
import logging
import pathlib
import tempfile
import urllib.parse
from typing import Optional, Tuple

import playwright.sync_api
import requests

from browsergym.core.task import AbstractBrowserTask

from .instance import VisualWebArenaInstance
from .utils import image_url_to_pil_image, pil_image_to_data_uri

logger = logging.getLogger(__name__)


def _build_goal(config, with_na_hint: bool):
    """
    Build an openai-style goal (list of messages)
     - recovers the goal text from config
     - download goal images if any
     - save goal images to local files
     - expose goal images as image_url messages using base64 encoding
     - expose goal images as local file paths (if task requires to upload them)
    """

    # recover goal text
    goal_text = config["intent"]

    # This note is present in some of webarena's agent prompts
    if with_na_hint:
        goal_text += """\

If you believe the task is impossible to complete, provide the answer "N/A".
"""

    # recover goal image urls
    image_urls = config.get("image", [])
    image_data_uris = []
    image_paths = []

    # fix image list if needed
    if image_urls is None:
        image_urls = []
    elif isinstance(image_urls, str):
        image_urls = [image_urls]

    # save images to local files in a temporary directory
    temp_dir = pathlib.Path(tempfile.mkdtemp())
    for i, image_url in enumerate(image_urls):
        # extract image content from url
        image = image_url_to_pil_image(image_url)
        format = image.format.lower()
        # write image to local file
        image_path = temp_dir / f"input_image_{i+1}.{format}"
        image.save(image_path)
        # save image path for the goal
        image_paths.append(image_path)
        # save image data as base64 for the goal
        image_data_uris.append(pil_image_to_data_uri(image))

    # build an OpenAI-style structured goal
    # textual goal first
    goal = [{"type": "text", "text": goal_text}]
    # then goal images
    for i, (image_url, image_data_uri, image_path) in enumerate(
        zip(image_urls, image_data_uris, image_paths)
    ):
        goal.extend(
            [
                # image description (id, filepath, url)
                {
                    "type": "text",
                    "text": f"Input image {i+1}/{len(image_urls)} below (local path: {repr(image_path)}, url: {repr(image_url)})",
                },
                # actual image (base64 image data URI)
                {
                    "type": "image_url",
                    "image_url": {
                        "url": image_data_uri,  # send data URI instead of URL (local urls might be inaccessible from the outside)
                    },
                },
            ]
        )

    return goal


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
        for pattern, url in {
            "__REDDIT__": self.webarena_instance.urls["reddit"],
            "__SHOPPING__": self.webarena_instance.urls["shopping"],
            "__WIKIPEDIA__": self.webarena_instance.urls["wikipedia"],
            "__CLASSIFIEDS__": self.webarena_instance.urls["classifieds"],
            "__HOMEPAGE__": self.webarena_instance.home_url,
        }.items():
            all_configs_str = all_configs_str.replace(pattern, url)

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

        goal = _build_goal(self.config, with_na_hint=self.with_na_hint)

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

        # safeguard: check that all open tabs are either blank or within the list of WebArena URLs
        authorized_locations = ["newtab", ""] + [
            urllib.parse.urlparse(url).netloc
            for url in [*self.webarena_instance.urls.values(), self.webarena_instance.home_url]
        ]
        for open_page in page.context.pages:
            page_location = urllib.parse.urlparse(open_page.url).netloc
            if not page_location in authorized_locations:
                return 0, True, "", {"error": "Unauthorized url, terminating task"}

        # import webarena dynamically
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
