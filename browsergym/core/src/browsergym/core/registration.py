from typing import Type

import gymnasium as gym
from .env import BrowserEnv
from .task import AbstractBrowserTask


def register_task(
    id: str,
    task_class: Type[AbstractBrowserTask],
    task_kwargs: dict = None,
    nondeterministic: bool = True,
    *args,
    **kwargs,
):
    """
    Registers a browser task as a gym environment with its unique id.

    Args:
        id: the id of the task to register (will be prepended by "browsergym/").
        task_class: the task class to register.
        nondeterministic: whether the task cannot be guaranteed deterministic transitions.
        *args: additional arguments for the browsergym environment.
        *kwargs: additional arguments for the browsergym environment.
    """

    # these environment arguments will be fixed, and error will be raised if they are set when calling gym.make()
    fixed_env_kwargs = {}
    if task_kwargs is not None:
        fixed_env_kwargs["task_kwargs"] = task_kwargs

    gym.register(
        id=f"browsergym/{id}",
        entry_point=lambda *env_args, **env_kwargs: BrowserEnv(
            task_class, *env_args, **fixed_env_kwargs, **env_kwargs
        ),
        nondeterministic=nondeterministic,
        *args,
        **kwargs,
    )
