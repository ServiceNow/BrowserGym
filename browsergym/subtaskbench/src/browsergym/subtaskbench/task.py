import dotenv
import importlib.resources
import json
import math
import os
import playwright.sync_api
import subprocess
import tempfile
import asyncio
from pathlib import Path

from browsergym.core.task import AbstractBrowserTask
from browsergym.subtaskbench.config.config import get_config
from browsergym.subtaskbench.evaluator.evaluator import Evaluator
from browsergym.subtaskbench.utils import run_command_async

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
        goal = self.goal
        page.goto(self.task_start_url)


        self.evaluator = Evaluator(
            start_url=self.task_start_url,
            goal=self.goal,
            evaluation_script=self.evaluation_script,
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
        print('Reward: ', reward)
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
        self, seed: int, task_id: str, task_config_path: str = "subtaskbench.json"
    ) -> None:
        super().__init__(seed, task_id, task_config_path)
        self.parent_dir = Path(__file__).parent

        # Load configuration using the config module
        all_configs = get_config('subtaskbench.json')
        for config in all_configs:
            if config['task_id'] == task_id:
                self.task_config = config

        if not self.task_config:
            raise ValueError(f"Task ID {task_id} not found in config file.")
        print(self.task_config)

        self.timeout = 60000  # Timeout for the webserver
        self.port = 8000

        self.task_start_url = f"http://localhost:{self.port}/{self.task_config['env']['start_url']}"
        self.goal = self.task_config['goal']
        self.evaluation_script = self.task_config['eval']['evaluate_scripts'][0]['script']
        

    def setup(self, page: playwright.sync_api.Page) -> tuple[str, dict]:
        """
        Set up everything needed to execute the task.

        Args:
            page: the active playwright page.

        Returns:
            goal: str, goal of the task.
            info: dict, custom information from the task.
        """
        return super().setup(page)
