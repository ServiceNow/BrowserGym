import numpy as np
import playwright.sync_api

from abc import ABC, abstractmethod
from typing import Tuple


class AbstractBrowserTask(ABC):
    """
    Abstract class for browsergym tasks.

    """

    @classmethod
    @abstractmethod
    def get_task_id(cls):
        pass

    def __init__(self, seed: int) -> None:
        # initiate a random number generator
        self.random = np.random.RandomState(seed)

        # task properties, will be used to set up the browsergym environment
        # default values, can be overriden in children classes
        self.viewport = {"width": 1280, "height": 720}
        self.slow_mo = 1000  # ms
        self.timeout = 5000  # ms

    @abstractmethod
    def setup(self, page: playwright.sync_api.Page) -> tuple[str, dict]:
        """
        Set up everything needed to execute the task.

        Args:
            page: the active playwright page.

        Returns:
            goal: str, goal of the task.
            info: dict, custom information from the task.
        """

    @abstractmethod
    def teardown(self) -> None:
        """
        Tear down the task and clean up any ressource / data created by the task.

        """

    @abstractmethod
    def validate(
        self, page: playwright.sync_api.Page, chat_messages: list[str]
    ) -> Tuple[float, bool, str, dict]:
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

    def cheat(self, page: playwright.sync_api.Page, chat_messages: list[str]) -> None:
        """
        Solve the task using a pre-defined solution (optional).

        """
        raise NotImplementedError


class OpenEndedTask(AbstractBrowserTask):
    @classmethod
    def get_task_id(cls):
        return "openended"

    def __init__(self, seed: int, start_url: str, goal: str = None) -> None:
        """
        Args:
            seed: random seed.
            start_url: str, the url for the starting page.
            goal: str, the initial goal.

        """
        super().__init__(seed)
        self.start_url = start_url
        self.goal = goal

    def setup(self, page: playwright.sync_api.Page) -> tuple[str, dict]:
        page.goto(self.start_url, timeout=10000)
        return self.goal, {}

    def teardown(self) -> None:
        pass

    def validate(
        self, page: playwright.sync_api.Page, chat_messages: list[str]
    ) -> Tuple[float, bool, str, dict]:
        reward, done, msg, info = 0, False, "", {}

        for message in chat_messages:
            if message["role"] == "user" and message["message"] == "exit":
                done = True
                break

        return reward, done, msg, info
