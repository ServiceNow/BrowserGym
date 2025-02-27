import dotenv
import importlib.resources
import json
import math
import os
import playwright.sync_api

from browsergym.core.task import AbstractBrowserTask


class GenericSubTaskBenchTask(AbstractBrowserTask):
    """
    Base class for all SubTaskBench tasks.
    """

    def __init__(
        self,
        seed: int,
        task_id: str,
        task_config_path: str,
    ) -> None:
        super().__init__(seed)

        # task properties, will be used to set up the browsergym environment
        self.viewport = {"width": 1024, "height": 1024}
        self.slow_mo = 1000  # ms

        import subtaskbench

        all_configs_str = (
            importlib.resources.files(subtaskbench).joinpath(task_config_path).read_text()
        )
        all_configs = json.loads(all_configs_str)
        self.task_config = all_configs[task_id]

    def setup(self, page: playwright.sync_api.Page) -> tuple[str, dict]:
        """
        Set up everything needed to execute the task.

        Args:
            page: the active playwright page.

        Returns:
            goal: str, goal of the task.
            info: dict, custom information from the task.
        """
        # For static tasks, we just need to provide the original start URL
        # since it is just a file
        goal = self.task_config["goal"]
        page.context.set_geolocation(
            {
                "latitude": self.task_config["geolocation"]["latitude"],
                "longitude": self.task_config["geolocation"]["longitude"],
            }
        )
        page.goto(self.task_config["start_url"])

        from subtaskbench import Evaluator

        self.evaluator = Evaluator(
            start_url=self.task_config["start_url"],
            goal=self.task_config["goal"],
            evaluation_script=self.task_config["evaluation_script"],
            expected_output=self.task_config["expected_output"],
            env_type=self.task_config["env_type"],
        )

        return goal, {}

    def validate(
        self, page: playwright.sync_api.Page, chat_messages: list[str]
    ) -> tuple[float, bool, str, dict]:
        """
        Validate the task was completed successfully

        Args:
            page: the active playwright page.
            chat_messages: the chat messages.

        Returns:
            reward: float, the reward obtained since last call to validate().
            done: boolean flag, indicates if the task has finished or not (be it success or fail).
            message: string, a new user message for the chat.
            info: dictionnary, custom information from the task.

        """
        if chat_messages and chat_messages[-1]["role"] == "assistant":
            answer = chat_messages[-1]["message"]
        else:
            answer = ""

        reward = self.evaluator.evaluate(page, answer)
        done = math.isclose(reward, 0.0, abs_tol=1e-5)

        return reward, done, "", {}


class StaticSubTaskBenchTask(GenericSubTaskBenchTask):
    """
    Class for the all tasks with static HTML content.
    """

    def __init__(
        self, seed: int, task_id: str, task_config_path: str = "static_tests.json"
    ) -> None:
        super().__init__(seed, task_id, task_config_path)

        # task properties, will be used to set up the browsergym environment
        self.timeout = 10000  # ms


class OnlineSubTaskBenchTask(GenericSubTaskBenchTask):
    """
    Class for the all tasks with served web content.
    """

    def __init__(
        self, seed: int, task_id: str, task_config_path: str = "online_tests.json"
    ) -> None:
        super().__init__(seed, task_id, task_config_path)

        # task properties, will be used to set up the browsergym environment
        self.timeout = 100000  # ms

    def setup(self, page: playwright.sync_api.Page) -> tuple[str, dict]:
        """
        Set up everything needed to execute the task.

        Args:
            page: the active playwright page.

        Returns:
            goal: str, goal of the task.
            info: dict, custom information from the task.
        """
        # For online tasks, we need to edit the start URL to include the
        # server endpoint as an evironment variable
        dotenv.load_dotenv()
        ENDPOINT = os.getenv("SUBTASKBENCH_ENDPOINT")
        if not ENDPOINT:
            raise ValueError("No endpoint provided for online tasks.")
        self.task_config["start_url"] = self.task_config["start_url"].replace(
            "__ENDPOINT__", ENDPOINT
        )

        return super().setup(page)
