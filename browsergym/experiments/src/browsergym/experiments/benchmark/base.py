import fnmatch
import logging
from dataclasses import dataclass, field
from typing import Literal, Optional

import numpy as np
import pandas as pd
from dataclasses_json import DataClassJsonMixin, config

from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.experiments.loop import EnvArgs

from .metadata.utils import task_list_from_metadata, task_metadata
from .utils import (
    make_env_args_list_from_repeat_tasks,
    make_env_args_list_from_workarena_curriculum,
)

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
    is_multi_tab: bool
    env_args_list: list[EnvArgs]
    full_reset_script: Optional[str]
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

    def subset_from_split(self, split: Literal["train", "valid", "test"]):
        split_column = "browsergym_split"

        # check for a split column in metadata
        if not split_column in self.task_metadata.columns:
            raise NotImplementedError(
                f"This benchmark does not provide default train/valid/test splits (missing a {repr(split_column)} column in task metadata)"
            )

        # recover the target split
        sub_benchmark = self.subset_from_regexp(split_column, regexp=f"^{split}$")

        # check that the split exists (non-empty task list)
        if not sub_benchmark.env_args_list:
            raise ValueError(f"The default {split} split for this benchmark is empty.")

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
            is_multi_tab=self.is_multi_tab,
            full_reset_script=self.full_reset_script,
            env_args_list=[
                env_args
                for env_args in self.env_args_list
                if env_args.task_name in task_name_subset
            ],
            task_metadata=self.task_metadata,
        )


# These are mean as the default highlevel action set to fairly evaluate agents on each benchmark.
# They are mostly arbitrary, the important thing is to evaluate different agents using the same action set for fairness.
DEFAULT_HIGHLEVEL_ACTION_SET_ARGS = {
    "miniwob_all": HighLevelActionSetArgs(
        subsets=["miniwob_all"],
        multiaction=False,
        strict=False,
        retry_with_force=True,
        demo_mode="off",
    ),
    "miniwob_liu18": HighLevelActionSetArgs(
        subsets=["miniwob_liu18"],
        multiaction=False,
        strict=False,
        retry_with_force=True,
        demo_mode="off",
    ),
    "miniwob_shi17": HighLevelActionSetArgs(
        subsets=["miniwob_shi17"],
        multiaction=False,
        strict=False,
        retry_with_force=True,
        demo_mode="off",
    ),
    "miniwob_humphreys22": HighLevelActionSetArgs(
        subsets=["miniwob_humphreys22"],
        multiaction=False,
        strict=False,
        retry_with_force=True,
        demo_mode="off",
    ),
    "workarena": HighLevelActionSetArgs(
        subsets=["workarena"],  # no need for infeasible action
        multiaction=False,
        strict=False,
        retry_with_force=True,
        demo_mode="off",
    ),
    "workarena++": HighLevelActionSetArgs(
        subsets=["workarena++"],
        multiaction=False,
        strict=False,
        retry_with_force=True,
        demo_mode="off",
    ),
    # from https://arxiv.org/abs/2307.13854
    "webarena": HighLevelActionSetArgs(
        subsets=["webarena"],
        multiaction=False,
        strict=False,
        retry_with_force=True,
        demo_mode="off",
    ),
    # from https://arxiv.org/abs/2401.13649
    "visualwebarena": HighLevelActionSetArgs(
        subsets=["visualwebarena"],
        multiaction=False,
        strict=False,
        retry_with_force=True,
        demo_mode="off",
    ),
    "assistantbench": HighLevelActionSetArgs(
        subsets=["chat", "bid", "tab", "nav"],
        multiaction=False,
        strict=False,
        retry_with_force=True,
        demo_mode="off",
    ),
}

# all benchmarks are callables designed for lazy loading, i.e. `bench = DEFAULT_BENCHMARKS["miniwob_all"]()`
DEFAULT_BENCHMARKS = {
    "miniwob": lambda: Benchmark(
        name="miniwob",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["miniwob_all"],
        is_multi_tab=False,
        full_reset_script=None,
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(metadata=task_metadata("miniwob")),
            max_steps=10,
            n_repeats=5,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("miniwob"),
    ),
    "miniwob_tiny_test": lambda: Benchmark(
        name="miniwob_tiny_test",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["miniwob_all"],
        is_multi_tab=False,
        full_reset_script=None,
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=["miniwob.click-dialog", "miniwob.click-checkboxes"],
            max_steps=5,
            n_repeats=2,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("miniwob"),
    ),
    "webarena": lambda: Benchmark(
        name="webarena",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["webarena"],
        is_multi_tab=True,
        full_reset_script="""\
import browsergym.webarena.instance
browsergym.webarena.instance.WebArenaInstance().full_reset()
""",
        env_args_list=make_env_args_list_from_repeat_tasks(
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
        is_multi_tab=True,
        full_reset_script="""\
import browsergym.visualwebarena.instance
browsergym.visualwebarena.instance.VisualWebArenaInstance().full_reset()
""",
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(metadata=task_metadata("visualwebarena")),
            max_steps=15,
            n_repeats=1,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("visualwebarena"),
    ),
    "workarena_l1": lambda: Benchmark(
        name="workarena_l1",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["workarena"],
        is_multi_tab=False,
        full_reset_script=None,
        env_args_list=make_env_args_list_from_workarena_curriculum(
            level="l1",
            task_category_filter=None,
            meta_seed=42,  # meta seed for evaluation curriculum
            max_steps=15,
            curriculum_type="agent",
            seeds_l1=10,
        ),
        task_metadata=task_metadata("workarena"),
    ),
    "workarena_l2_agent_curriculum_eval": lambda: Benchmark(
        name="workarena_l2_agent_curriculum_eval",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["workarena++"],
        is_multi_tab=True,
        full_reset_script=None,
        env_args_list=make_env_args_list_from_workarena_curriculum(
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
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["workarena++"],
        is_multi_tab=True,
        full_reset_script=None,
        env_args_list=make_env_args_list_from_workarena_curriculum(
            level="l3",
            task_category_filter=None,
            meta_seed=42,  # meta seed for evaluation curriculum
            max_steps=50,
            curriculum_type="agent",
        ),
        task_metadata=task_metadata("workarena"),
    ),
    "assistantbench": lambda: Benchmark(
        name="assistantbench",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["assistantbench"],
        is_multi_tab=True,
        full_reset_script=None,
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(
                metadata=task_metadata("assistantbench"), filter={"browsergym_split": "valid|test"}
            ),
            max_steps=15,
            n_repeats=1,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("assistantbench"),
    ),
}
