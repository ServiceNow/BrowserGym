import fnmatch
import logging
import random
import typing
from dataclasses import dataclass, field
from typing import Literal, Optional

import pandas as pd
from dataclasses_json import DataClassJsonMixin, config

from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.experiments.loop import EnvArgs

from .metadata.utils import (
    build_env_args_dependency_graphs,
    build_full_task_dependency_graph_from_metadata,
    extract_sparse_task_dependency_graph_from_subset,
    task_list_from_metadata,
)
from .utils import prepare_backend

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


BenchmarkBackend = Literal[
    "miniwob", "webarena", "visualwebarena", "workarena", "assistantbench", "weblinx"
]


@dataclass
class Benchmark(DataClassJsonMixin):
    name: str
    high_level_action_set_args: HighLevelActionSetArgs
    is_multi_tab: bool
    supports_parallel_seeds: bool
    env_args_list: list[EnvArgs]
    backends: list[BenchmarkBackend]
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
        # check backend values
        for backend in self.backends:
            if backend not in typing.get_args(BenchmarkBackend):
                raise ValueError(
                    f"Unknown Benchmark backend {repr(backend)}. Available backends: {typing.get_args(BenchmarkBackend)}"
                )

    def prepare_backends(self):
        for backend in self.backends:
            logger.info(f"Preparing {backend} backend...")
            prepare_backend(backend)
            logger.info(f"{backend} backend ready")

    def subset_from_split(self, split: Literal["train", "valid", "test"]):
        split_column = "browsergym_split"

        # check for a split column in metadata
        if split_column not in self.task_metadata.columns:
            raise NotImplementedError(
                f"This benchmark does not provide default train/valid/test splits (missing a {repr(split_column)} column in task metadata)"
            )

        # recover the target split
        sub_benchmark = self.subset_from_regexp(split_column, regexp=f"^{split}$")
        sub_benchmark.name = f"{self.name}_{split}"

        # check that the split exists (non-empty task list)
        if not sub_benchmark.env_args_list:
            raise ValueError(f"The default {split} split for this benchmark is empty.")

        return sub_benchmark

    def subset_from_list(
        self,
        task_list: list[str],
        benchmark_name_suffix: Optional[str] = "custom",
        split: Optional[str] = None,
    ):
        """Create a sub-benchmark containing only the specified tasks.

        Args:
            task_list: List of task names to include in the sub-benchmark.
            benchmark_name_suffix: Optional suffix to append to the benchmark name. Defaults to "custom".
            split: Optional split name to append to the benchmark name. Useful for organization.

        Returns:
            Benchmark: A new benchmark instance containing only the specified tasks.

        Raises:
            ValueError: If the resulting task list is empty or if any specified task doesn't exist.
        """
        if not task_list:
            raise ValueError("Task list cannot be empty")

        # Validate that all requested tasks exist in the original benchmark
        existing_tasks = {env_args.task_name for env_args in self.env_args_list}
        invalid_tasks = set(task_list) - existing_tasks
        if invalid_tasks:
            raise ValueError(f"The following tasks do not exist in the benchmark: {invalid_tasks}")

        name = f"{self.name}_{benchmark_name_suffix}"
        if split:
            name += f"_{split}"

        sub_benchmark = Benchmark(
            name=name,
            high_level_action_set_args=self.high_level_action_set_args,
            is_multi_tab=self.is_multi_tab,
            supports_parallel_seeds=self.supports_parallel_seeds,
            backends=self.backends,
            env_args_list=[
                env_args for env_args in self.env_args_list if env_args.task_name in task_list
            ],
            task_metadata=self.task_metadata,
        )

        # This check is redundant now due to the validation above, but kept for safety
        if not sub_benchmark.env_args_list:
            raise ValueError(
                f"The custom {split if split else ''} split for this benchmark is empty."
            )

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
            supports_parallel_seeds=self.supports_parallel_seeds,
            backends=self.backends,
            env_args_list=[
                env_args
                for env_args in self.env_args_list
                if env_args.task_name in task_name_subset
            ],
            task_metadata=self.task_metadata,
        )

    def subset_from_task_ratio(self, ratio, seed):
        """Get a random subset of the tasks given a ratio and seed."""
        rng = random.Random(seed)
        task_names = list(set([env_args.task_name for env_args in self.env_args_list]))
        rng.shuffle(task_names)
        num_tasks = int(len(task_names) * ratio)
        task_name_subset = task_names[:num_tasks]

        return Benchmark(
            name=f"{self.name}[ratio={ratio}, seed={seed}]",
            high_level_action_set_args=self.high_level_action_set_args,
            is_multi_tab=self.is_multi_tab,
            supports_parallel_seeds=self.supports_parallel_seeds,
            backends=self.backends,
            env_args_list=[
                env_args
                for env_args in self.env_args_list
                if env_args.task_name in task_name_subset
            ],
            task_metadata=self.task_metadata,
        )

    def dependency_graph_over_tasks(self) -> dict[str, list[str]]:
        # recover all unique task_names present in the benchmark
        task_names = list(set([env_args.task_name for env_args in self.env_args_list]))

        # if "depends_on" column is missing, raise a warning and deal with it
        # (we don't want the "depends_on" column to be mandatory)
        if "depends_on" not in self.task_metadata.columns:
            logger.warning(
                f'This benchmark does not provide a dependency graph (missing a "depends_on" column in task metadata). Assuming no task dependencies.'
            )
            zero_dependencies = {task_name: [] for task_name in task_names}
            return zero_dependencies

        # recover the task dependency graph, for tasks in the benchmark only
        task_dependencies = extract_sparse_task_dependency_graph_from_subset(
            task_subset=task_names,
            parents=build_full_task_dependency_graph_from_metadata(
                task_metadata=self.task_metadata
            ),
        )

        return task_dependencies

    def dependency_graphs_over_env_args(self) -> list[dict[str, list[str]]]:
        """
        Returns a list of dependency graphs to be executed sequentially, typically with a full instance reset in-between.
        Ideally, a job scheduler should connect these graphs by injecting a reset task in-between each, which depends on all previous tasks being completed.
        """
        task_dependencies = self.dependency_graph_over_tasks()
        env_args_dependencies = build_env_args_dependency_graphs(
            env_args_list=self.env_args_list,
            task_dependencies=task_dependencies,
            supports_parallel_seeds=self.supports_parallel_seeds,
        )
        return env_args_dependencies
