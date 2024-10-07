import io
import logging
import pathlib
import pkgutil
from dataclasses import dataclass
from typing import Literal

import numpy as np
import pandas as pd
from dataclasses_json import DataClassJsonMixin

from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.experiments.loop import SEED_MAX, EnvArgs

logger = logging.getLogger(__name__)


@dataclass
class HighLevelActionSetArgs(DataClassJsonMixin):
    subsets: list[HighLevelActionSet.ActionSubset]
    # custom_actions: list[callable] | None  # non-serializable argument, not supported
    multiaction: bool
    strict: bool
    retry_with_force: bool
    demo_mode: Literal["off", "default", "all_blue", "only_visible_elements"]


@dataclass
class Benchmark(DataClassJsonMixin):
    name: str
    high_level_action_set: HighLevelActionSetArgs
    env_args_list: list[EnvArgs]


def task_list_from_metadata(benchmark: str, *args, **kwargs):
    return task_list_from_csv(
        io.StringIO(
            pkgutil.get_data(__name__, f"benchmark_metadata/{benchmark}.csv").decode("utf-8")
        ),
        *args,
        **kwargs,
    )


def task_list_from_csv(
    filepath_or_bytes: str | pathlib.Path | io.IOBase,
    filters: dict[str, str] = {},
):
    # read task list with metadata
    df: pd.DataFrame = pd.read_csv(filepath_or_bytes)
    # filter the desired columns (AND filter)
    for col_name, regex in filters.items():
        filter = df[col_name].str.contains(regex, regexp=True)
        df = df[filter]
    # return only the task names
    return df["task_name"]


# These are mean as the default highlevel action set to fairly evaluate agents on each benchmark.
# They are mostly arbitrary, the important thing is to evaluate different agents using the same action set for fairness.
DEFAULT_HIGHLEVEL_ACTION_SETS = {
    "miniwob": HighLevelActionSetArgs(
        subsets=["bid", "coord"],
        multiaction=False,
        strict=False,
        retry_with_force=False,
        demo_mode="off",
    ),
    "miniwob_bid": HighLevelActionSetArgs(
        subsets=["bid"],
        multiaction=False,
        strict=False,
        retry_with_force=False,
        demo_mode="off",
    ),
    "workarena_l1": HighLevelActionSetArgs(
        subsets=["chat", "bid"],  # no need for infeasible action
        multiaction=False,
        strict=False,
        retry_with_force=False,
        demo_mode="off",
    ),
    "workarena": HighLevelActionSetArgs(
        subsets=["chat", "infeas", "bid"],
        multiaction=False,
        strict=False,
        retry_with_force=False,
        demo_mode="off",
    ),
    "webarena": HighLevelActionSetArgs(
        subsets=["chat", "infeas", "bid", "tab", "nav"],
        multiaction=False,
        strict=False,
        retry_with_force=False,
        demo_mode="off",
    ),
    "visualwebarena": HighLevelActionSetArgs(
        subsets=["chat", "infeas", "bid", "tab", "nav"],
        multiaction=False,
        strict=False,
        retry_with_force=False,
        demo_mode="off",
    ),
}

BENCHMARKS = {
    "miniwob_all": lambda: Benchmark(
        name="miniwob_all",
        high_level_action_set=DEFAULT_HIGHLEVEL_ACTION_SETS["miniwob"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(benchmark="miniwob"),
            max_steps=10,
            n_repeats=10,
            seeds_rng=np.random.RandomState(42),
        ),
    ),
    "miniwob_webgum": lambda: Benchmark(
        name="miniwob_webgum",
        high_level_action_set=DEFAULT_HIGHLEVEL_ACTION_SETS["miniwob"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(
                benchmark="miniwob", filters={"webgum_subset": "True"}
            ),
            max_steps=10,
            n_repeats=10,
            seeds_rng=np.random.RandomState(42),
        ),
    ),
    "miniwob_tiny_test": lambda: Benchmark(
        name="miniwob_tiny_test",
        high_level_action_set=DEFAULT_HIGHLEVEL_ACTION_SETS["miniwob"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=["miniwob.click-dialog", "miniwob.click-checkboxes"],
            max_steps=5,
            n_repeats=2,
            seeds_rng=np.random.RandomState(42),
        ),
    ),
    "miniwob_train": lambda: Benchmark(
        name="miniwob_train",
        high_level_action_set=DEFAULT_HIGHLEVEL_ACTION_SETS["miniwob"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(
                benchmark="miniwob",
                filters={"miniwob_category": "original|nodelay|debug|additional"},
            ),
            max_steps=10,
            n_repeats=10,
            seeds_rng=np.random.RandomState(42),
        ),
    ),
    "miniwob_test": lambda: Benchmark(
        name="miniwob_test",
        high_level_action_set=DEFAULT_HIGHLEVEL_ACTION_SETS["miniwob"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(
                benchmark="miniwob", filters={"miniwob_category": "hidden test"}
            ),
            max_steps=10,
            n_repeats=10,
            seeds_rng=np.random.RandomState(42),
        ),
    ),
    "webarena": lambda: Benchmark(
        name="webarena",
        high_level_action_set=DEFAULT_HIGHLEVEL_ACTION_SETS["webarena"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(benchmark="webarena"),
            max_steps=15,
            n_repeats=1,
            seeds_rng=np.random.RandomState(42),
        ),
    ),
    "visualwebarena": lambda: Benchmark(
        name="visualwebarena",
        high_level_action_set=DEFAULT_HIGHLEVEL_ACTION_SETS["visualwebarena"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(benchmark="visualwebarena"),
            max_steps=15,
            n_repeats=1,
            seeds_rng=np.random.RandomState(42),
        ),
    ),
    "workarena_l1": lambda: Benchmark(
        name="workarena_l1",
        high_level_action_set=DEFAULT_HIGHLEVEL_ACTION_SETS["workarena_l1"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(benchmark="workarena", filters={"level": "l1"}),
            max_steps=15,
            n_repeats=10,
            seeds_rng=np.random.RandomState(42),
        ),
    ),
    "workarena_l1_sort": lambda: Benchmark(
        name="workarena_l1_sort",
        high_level_action_set=DEFAULT_HIGHLEVEL_ACTION_SETS["workarena_l1"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(
                benchmark="workarena", filters={"level": "l1", "category": "sort_list"}
            ),
            max_steps=15,
            n_repeats=10,
            seeds_rng=np.random.RandomState(42),
        ),
    ),
    "workarena_l2": lambda: Benchmark(
        name="workarena_l2",
        high_level_action_set=DEFAULT_HIGHLEVEL_ACTION_SETS["workarena"],
        env_args_list=_make_env_args_list_from_workarena_curriculum(
            level="l2",
            task_category_filter=None,
            meta_seed=42,
            max_steps=50,
            curriculum_type="agent",
        ),
    ),
    "workarena_l3": lambda: Benchmark(
        name="workarena_l3",
        high_level_action_set=DEFAULT_HIGHLEVEL_ACTION_SETS["workarena"],
        env_args_list=_make_env_args_list_from_workarena_curriculum(
            level="l3",
            task_category_filter=None,
            meta_seed=42,
            max_steps=50,
            curriculum_type="agent",
        ),
    ),
}


def _make_env_args_list_from_workarena_curriculum(
    level: Literal["l2", "l3"],
    task_category_filter: str,
    meta_seed: int,
    max_steps: int,
    curriculum_type: Literal["human", "agent"],
):
    """
    Returns a WorkArena predefined task curriculum (e.g., task and seed combination).
    """
    assert level in ("l2", "l3")
    assert curriculum_type in ("human", "agent")

    from browsergym.workarena import get_all_tasks_agents

    all_task_tuples = get_all_tasks_agents(
        filter=f"{level}.{task_category_filter}" if task_category_filter else level,
        meta_seed=meta_seed,
        is_agent_curriculum=(curriculum_type == "agent"),
    )

    env_args_list = []
    for task, seed in all_task_tuples:
        task_name = task.get_task_id()
        env_args_list.append(EnvArgs(task_name=task_name, task_seed=seed, max_steps=max_steps))

    return env_args_list


def _make_env_args_list_from_repeat_tasks(
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
