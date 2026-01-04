import os
from typing import Optional, Tuple

import playwright.sync_api

from browsergym.core.task import AbstractBrowserTask


class ExampleTask(AbstractBrowserTask):
    """
    Example task for browsergym

    """

    @classmethod
    def get_task_id(cls):
        return f"example.{cls.subdomain}"

    def __init__(
        self,
        seed: int,
        start_url: str = "https://google.com",
    ) -> None:
        super().__init__(seed)
        self.start_url = start_url

    def setup(self, page: playwright.sync_api.Page) -> tuple[str, dict]:
        """
        Perform any operation to allow the task to start. Return the goal as a string and any information that's relevant.
        """
        page.goto(self.start_url)

        # can also login or perform any other operation
        # to prepare the task

        goal = f"Go to the {self.goal_url} and send a message to the chat."
        info = {"goal_url": self.goal_url}
        return goal, info

    def validate(self, page, chat_messages):
        """Check if the task was completed successfully and return a reward.

        i.e. reward, done, message, info

        Args:
            page: the active playwright page.
            chat_messages: the chat messages.
        Returns:
            reward: float, the reward obtained since last call to validate().
            done: boolean flag, indicates if the task has finished or not (be it success or fail).
            message: string, a new user message for the chat.
            info: dictionnary, custom information from the task.
        """
        # wait for the page to load if needed
        page.wait_for_load_state("networkidle")
        # check if the page is the goal page
        if page.url == self.goal_url:
            # check if the chat messages contain the goal
            for message in chat_messages:
                if self.goal in message:
                    return 1.0, True, "Task completed successfully", {}
        return 0.0, False, "Task not completed", {}

    def cheat(self, page: playwright.sync_api.Page, chat_messages: list[str]) -> None:
        """
        Solve the task using a pre-defined solution (optional).
        """
        raise NotImplementedError("Cheat method not implemented for this task.")

    def teardown(self) -> None:
        """
        Tear down the task and clean up any resource / data created by the task (optional).
        """
        # typically shut down the browser...
        pass


class WikipediaTask(ExampleTask):
    """
    Wikipedia task for browsergym

    """

    subdomain = "wikipedia"
    goal_url = os.environ.get("WIKIPEDIA_URL", "https://en.wikipedia.org/wiki/Main_Page")


class AmazonTask(ExampleTask):
    """
    Amazon task for browsergym

    """

    subdomain = "amazon"
    goal_url = os.environ.get("AMAZON_URL", "https://www.amazon.com/")
