Creating a custom task
______________________

Creating a custom task in `BrowserGym` can be done easily by inheriting from the `AbstractBrowserTask` class.


Let's start with an example, we will build a task that starts from the Google Search page and asks for the Eiffel Tower Wikipedia page.

* **Goal**: Search for 'Eiffel Tower' Wikipedia page.

* **Reward**: Gets reward = 1 if reaches the expected Wikipedia page on Eiffel Tower, else gets 0.

.. code-block:: python

    from typing import Tuple

    import playwright.sync_api
    from browsergym.core.task import AbstractBrowserTask


    class SampleTask(AbstractBrowserTask):
        def __init__(self, seed: int) -> None:
            super().__init__(seed)

        @classmethod
        def get_task_id(cls):
            return "sample_task"


First, let's setup the task. To do this, we need to implement the `setup()` function. The starting point is *https://www.google.com* page and the goal is *"Search for 'Eiffel Tower' Wikipedia page"*.

.. code-block:: python

    class SampleTask(AbstractBrowserTask):
        # ...
        # Code above
        # ...

        def setup(self, page: playwright.sync_api.Page) -> Tuple[str, dict]:
            """Set up everything needed to execute the task."""
            page.goto("https://www.google.com", timeout=10000)
            goal = "Search for 'Eiffel Tower' Wikipedia page."
            info = {}
            return goal, info


Next, we need to compute a reward. For this, we'll implement our validation criteria in the `validate()` function. In our case, we consider the task being completed when the Eiffel Tower Wikipedia page is reached. Else it's a fail.

.. code-block:: python

    class SampleTask(AbstractBrowserTask):
        # ...
        # Code above
        # ...

        def validate(
            self, page: playwright.sync_api.Page, chat_messages: list[str]
        ) -> Tuple[float, bool, str, dict]:
            """Compute reward based on reaching final URL."""
            if page.url == "https://en.wikipedia.org/wiki/Eiffel_Tower":
                return 1.0, True, "Task completed", {}
            else:
                return 0.0, False, "", {}


We can also implement the code for completing the task, it's an oracle (a.k.a. cheat) version. For this, we'll fill out the `cheat()` function. 

.. code-block:: python

    class SampleTask(AbstractBrowserTask):
        # ...
        # Code above
        # ...

        def cheat(self, page: playwright.sync_api.Page, chat_messages: list[str]) -> None:
            """Solve the task in a single step using a hard-coded Playwright solution."""
            page.get_by_text("Search").fill("Eiffel Tower")
            page.get_by_text("Google Search").click()
            page.get_by_text("Eiffel Tower - Wikipedia").click()


Finally, the `teardown()` function. This function allows to clean resources before closing the enviroment. In our case, nothing need to be done, so we will leave it empty.

.. code-block:: python

    class SampleTask(AbstractBrowserTask):
        # ...
        # Code above
        # ...
        
        def teardown(self) -> None:
            # Nothing to do for this task.
            pass


Our folder structure should look like the following:

.. code-block:: bash

    .
    |── tasks
    |   ├── __init__.py
    |   └── sample_task.py
    ├── run_task.py


Now we should register the task in the gym environment using the following code in the `__init__.py` of your package:

.. code-block:: python

    from browsergym.core.registration import register_task

    from .sample_task import SampleTask

    register_task(id=SampleTask.get_task_id(), task_class=SampleTask)


Now that the task is registered it can be called via this code that you can put in `run_task.py` file:

.. code-block:: python

    import gymnasium as gym
    import tasks  # will register the gym environment

    env = gym.make("browsergym/sample_task")
    obs, info = env.reset()
    done = False

    while not done:
        action = "noop()"
        obs, reward, terminated, truncated, info = env.step(action)
        print(f"Reward: {reward}, Done: {done}, Info: {info}")
    
