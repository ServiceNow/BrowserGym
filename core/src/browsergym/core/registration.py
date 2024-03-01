from typing import Type

import gymnasium as gym
from .env import BrowserEnv
from .task import AbstractBrowserTask


def register_task(id: str, task_class: Type[AbstractBrowserTask], *args, **kwargs):
    """
    Registers a browser task as a gym environment with its unique id.

    Args:
        task: the task class to register.
    """

    gym.register(
        id=f"browsergym/{id}",
        entry_point=lambda *args, **kwargs: BrowserEnv(task_class, *args, **kwargs),
        nondeterministic=task_class.nondeterministic,
        *args,
        **kwargs,
    )
