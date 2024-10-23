import io
import pkgutil
from typing import Literal

import numpy as np
import pandas as pd

from browsergym.experiments.loop import SEED_MAX, EnvArgs


def make_env_args_list_from_workarena_curriculum(
    level: Literal["l1", "l2", "l3"],
    task_category_filter: str,
    meta_seed: int,
    max_steps: int,
    curriculum_type: Literal["human", "agent"],
    seeds_l1: int = 10,
):
    """
    Returns a WorkArena predefined task curriculum (e.g., task and seed combination).
    """
    assert level in ("l1", "l2", "l3")
    assert curriculum_type in ("human", "agent")

    env_args_list = []

    # dynamic import
    from browsergym.workarena import get_all_tasks_agents

    all_task_tuples = get_all_tasks_agents(
        filter=f"{level}.{task_category_filter}" if task_category_filter else level,
        meta_seed=meta_seed,
        is_agent_curriculum=(curriculum_type == "agent"),
        n_seed_l1=seeds_l1,
    )

    for task, seed in all_task_tuples:
        task_name = task.get_task_id()
        env_args_list.append(EnvArgs(task_name=task_name, task_seed=seed, max_steps=max_steps))

    return env_args_list


def make_env_args_list_from_repeat_tasks(
    task_list: list[str], max_steps: int, n_repeats: int, seeds_rng: np.random.RandomState
):
    """
    Generates a list of `len(task_list)` time `n_repeats` environments arguments, using randomly generated seeds.
    """
    env_args_list = []
    for task in task_list:
        for seed in seeds_rng.randint(low=0, high=SEED_MAX, size=n_repeats):
            env_args_list.append(
                EnvArgs(
                    task_name=task,
                    task_seed=int(seed),
                    max_steps=max_steps,
                    headless=True,
                    record_video=False,
                    wait_for_user_message=False,
                    viewport=None,
                    slow_mo=None,
                    storage_state=None,
                    task_kwargs=None,
                )
            )

    return env_args_list


def make_env_args_list_from_fixed_seeds(
    task_list: list[str], max_steps: int, fixed_seeds: list[int]
):
    """
    Generates a list of `len(task_list)` time `n_repeats` environments arguments, using randomly generated seeds.
    """
    env_args_list = []
    for task in task_list:
        for seed in fixed_seeds:
            env_args_list.append(
                EnvArgs(
                    task_name=task,
                    task_seed=int(seed),
                    max_steps=max_steps,
                    headless=True,
                    record_video=False,
                    wait_for_user_message=False,
                    viewport=None,
                    slow_mo=None,
                    storage_state=None,
                    task_kwargs=None,
                )
            )

    return env_args_list
