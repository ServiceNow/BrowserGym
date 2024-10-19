import fnmatch
import io
import logging
import pkgutil
from dataclasses import dataclass, field
from typing import Literal, Optional

import numpy as np
import pandas as pd
from dataclasses_json import DataClassJsonMixin, config

from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.experiments.loop import SEED_MAX, EnvArgs

logger = logging.getLogger(__name__)


@dataclass
class HighLevelActionSetArgs(DataClassJsonMixin):
    subsets: tuple[HighLevelActionSet.ActionSubset] = field(
        metadata=config(
            encoder=lambda x: list(x),
            decoder=lambda x: tuple(x),
        ),
    )
    # custom_actions: list[callable] | None  # non-serializable argument, not supported
    multiaction: bool = False
    strict: bool = False
    retry_with_force: bool = False
    demo_mode: Optional[Literal["off", "default", "all_blue", "only_visible_elements"]] = None

    def __post_init__(self):
        if isinstance(self.subsets, list):
            """Needs to be hashable for AgentLab when uniquely identifying agents."""
            self.subsets = tuple(self.subsets)

    def make_action_set(self):
        return HighLevelActionSet(
            subsets=self.subsets,
            custom_actions=None,
            multiaction=self.multiaction,
            strict=self.strict,
            retry_with_force=self.retry_with_force,
            demo_mode=self.demo_mode,
        )


@dataclass
class Benchmark(DataClassJsonMixin):
    name: str
    high_level_action_set_args: HighLevelActionSetArgs
    env_args_list: list[EnvArgs]
    task_metadata: Optional[pd.DataFrame] = field(
        default_factory=lambda: None,
        metadata=config(
            encoder=lambda df: df.to_dict(orient="records") if df is not None else None,
            decoder=lambda items: pd.DataFrame(items) if items is not None else None,
        ),
    )

    def __post_init__(self):
        # if no metadata is present, generate a dataframe with single "task_name" column
        if self.task_metadata is None:
            unique_task_names = list(set([env_args.task_name for env_args in self.env_args_list]))
            self.task_metadata = pd.DataFrame(
                [{"task_name": task_name} for task_name in unique_task_names]
            )
        # make sure all tasks in env_args are in the metadata
        metadata_tasks = list(self.task_metadata["task_name"])
        assert all([env_args.task_name in metadata_tasks for env_args in self.env_args_list])

    def subset_from_split(self, split: Literal["train", "eval", "test"]):
        split_column = "split"

        # check for a split column in metadata
        if not split_column in self.task_metadata.columns:
            raise NotImplementedError(
                f"This benchmark does not provide train/eval/test {split_column} (missing split column in task metadata)"
            )

        # recover the target split
        sub_benchmark = self.subset_from_regexp(split_column, regexp=f"^{split}$")

        # check that the split exists (non-empty task list)
        if not sub_benchmark.env_args_list:
            raise ValueError(f"The {split} split for this benchmark is empty.")

        return sub_benchmark

    def subset_from_glob(self, column, glob):
        subset = self.subset_from_regexp(column, regexp=fnmatch.translate(glob))
        subset.name = f"{self.name}[{column}={glob}]"
        return subset

    def subset_from_regexp(self, column, regexp):
        # extract the filtered task_name subset
        task_name_subset = task_list_from_metadata(self.task_metadata, {column: regexp})

        # return the sub benchmark
        return Benchmark(
            name=f"{self.name}[{column}=/{regexp}/]",
            high_level_action_set_args=self.high_level_action_set_args,
            env_args_list=[
                env_args
                for env_args in self.env_args_list
                if env_args.task_name in task_name_subset
            ],
            task_metadata=self.task_metadata,
        )


def task_metadata(benchmark_name: str):
    return task_metadata_from_csv(
        io.StringIO(
            pkgutil.get_data(__name__, f"task_metadata/{benchmark_name}.csv").decode("utf-8")
        )
    )


def task_metadata_from_csv(filepath):
    return pd.read_csv(filepath).fillna("")


def task_list_from_metadata(metadata: pd.DataFrame, filter: dict[str, str] = {}):
    df = metadata
    # filter the desired columns (AND filter)
    for col_name, regex in filter.items():
        col_filter = df[col_name].astype(str).str.contains(regex, regex=True)
        df = df[col_filter]
    # return only the task names
    return list(df["task_name"])


# These are mean as the default highlevel action set to fairly evaluate agents on each benchmark.
# They are mostly arbitrary, the important thing is to evaluate different agents using the same action set for fairness.
DEFAULT_HIGHLEVEL_ACTION_SET_ARGS = {
    # loosely from https://github.com/Farama-Foundation/miniwob-plusplus/blob/1bab0dffe34e92cc1049fe9443542029bf7e44a9/miniwob/action.py#L122
    "miniwob": HighLevelActionSetArgs(
        subsets=["bid", "coord"],
        multiaction=False,
        strict=False,
        retry_with_force=False,
        demo_mode="off",
    ),
    # loosely from https://github.com/Farama-Foundation/miniwob-plusplus/blob/1bab0dffe34e92cc1049fe9443542029bf7e44a9/miniwob/action.py#L160
    "miniwob_bid": HighLevelActionSetArgs(
        subsets=["bid"],
        multiaction=False,
        strict=False,
        retry_with_force=False,
        demo_mode="off",
    ),
    # loosely from https://github.com/Farama-Foundation/miniwob-plusplus/blob/1bab0dffe34e92cc1049fe9443542029bf7e44a9/miniwob/action.py#L173
    "miniwob_coord": HighLevelActionSetArgs(
        subsets=["coord"],
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
    # from https://arxiv.org/abs/2307.13854
    "webarena": HighLevelActionSetArgs(
        subsets=["chat", "infeas", "bid", "tab", "nav"],
        multiaction=False,
        strict=False,
        retry_with_force=False,
        demo_mode="off",
    ),
    # from https://arxiv.org/abs/2401.13649
    "visualwebarena": HighLevelActionSetArgs(
        subsets=["chat", "infeas", "bid", "tab", "nav"],
        multiaction=False,
        strict=False,
        retry_with_force=False,
        demo_mode="off",
    ),
}

# all benchmarks are callables designed for lazy loading, i.e. `bench = BENCHMARKS["miniwob_all"]()`
BENCHMARKS = {
    "miniwob_all": lambda: Benchmark(
        name="miniwob_all",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["miniwob"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(metadata=task_metadata("miniwob")),
            max_steps=10,
            n_repeats=10,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("miniwob"),
    ),
    "miniwob_webgum": lambda: Benchmark(
        name="miniwob_webgum",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["miniwob"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(
                metadata=task_metadata("miniwob"), filter={"webgum_subset": "True"}
            ),
            max_steps=10,
            n_repeats=10,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("miniwob"),
    ),
    "miniwob_tiny_test": lambda: Benchmark(
        name="miniwob_tiny_test",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["miniwob"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=["miniwob.click-dialog", "miniwob.click-checkboxes"],
            max_steps=5,
            n_repeats=2,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("miniwob"),
    ),
    "miniwob_train": lambda: Benchmark(
        name="miniwob_train",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["miniwob"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(
                metadata=task_metadata("miniwob"),
                filter={"miniwob_category": "original|nodelay|debug|additional"},
            ),
            max_steps=10,
            n_repeats=10,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("miniwob"),
    ),
    "miniwob_test": lambda: Benchmark(
        name="miniwob_test",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["miniwob"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(
                metadata=task_metadata("miniwob"), filter={"miniwob_category": "hidden test"}
            ),
            max_steps=10,
            n_repeats=10,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("miniwob"),
    ),
    "webarena": lambda: Benchmark(
        name="webarena",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["webarena"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(metadata=task_metadata("webarena")),
            max_steps=15,
            n_repeats=1,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("webarena"),
    ),
    "visualwebarena": lambda: Benchmark(
        name="visualwebarena",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["visualwebarena"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(metadata=task_metadata("visualwebarena")),
            max_steps=15,
            n_repeats=1,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("visualwebarena"),
    ),
    "workarena_l1": lambda: Benchmark(
        name="workarena_l1",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["workarena_l1"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(
                metadata=task_metadata("workarena"), filter={"level": "l1"}
            ),
            max_steps=15,
            n_repeats=10,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("workarena"),
    ),
    "workarena_l1_sort": lambda: Benchmark(
        name="workarena_l1_sort",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["workarena_l1"],
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(
                metadata=task_metadata("workarena"), filter={"level": "l1", "category": "list-sort"}
            ),
            max_steps=15,
            n_repeats=10,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("workarena"),
    ),
    "workarena_l2_agent_curriculum_eval": lambda: Benchmark(
        name="workarena_l2_agent_curriculum_eval",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["workarena"],
        env_args_list=_make_env_args_list_from_workarena_curriculum(
            level="l2",
            task_category_filter=None,
            meta_seed=42,  # meta seed for evaluation curriculum
            max_steps=50,
            curriculum_type="agent",
        ),
        task_metadata=task_metadata("workarena"),
    ),
    "workarena_l3_agent_curriculum_eval": lambda: Benchmark(
        name="workarena_l3_agent_curriculum_eval",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["workarena"],
        env_args_list=_make_env_args_list_from_workarena_curriculum(
            level="l3",
            task_category_filter=None,
            meta_seed=42,  # meta seed for evaluation curriculum
            max_steps=50,
            curriculum_type="agent",
        ),
        task_metadata=task_metadata("workarena"),
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

    env_args_list = []

    from browsergym.workarena import get_all_tasks_agents

    all_task_tuples = get_all_tasks_agents(
        filter=f"{level}.{task_category_filter}" if task_category_filter else level,
        meta_seed=meta_seed,
        is_agent_curriculum=(curriculum_type == "agent"),
    )

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
