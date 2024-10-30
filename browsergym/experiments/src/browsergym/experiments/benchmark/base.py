import fnmatch
import logging
import os
import typing
from dataclasses import dataclass, field
from pathlib import Path
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
        assert all([backend in typing.get_args(BenchmarkBackend) for backend in self.backends])

    def prepare_backends(self):
        for backend in self.backends:
            match backend:
                case "miniwob":
                    # register environments
                    import browsergym.miniwob

                    # check setup
                    browsergym.miniwob.environment_variables_precheck()

                case "webarena":
                    # register environments
                    import browsergym.webarena

                    # full reset the instance (requires environment variables properly set up)
                    from browsergym.webarena.instance import WebArenaInstance

                    default_instance = WebArenaInstance()
                    default_instance.full_reset()

                case "visualwebarena":
                    # register environments
                    import browsergym.visualwebarena

                    # full reset the instance (requires environment variables properly set up)
                    from browsergym.visualwebarena.instance import (
                        VisualWebArenaInstance,
                    )

                    default_instance = VisualWebArenaInstance()
                    default_instance.full_reset()

                case "workarena":
                    # register environments
                    import browsergym.workarena

                    # check server status
                    from browsergym.workarena.instance import SNowInstance

                    default_instance = SNowInstance()
                    default_instance.check_status()

                case "assistantbench":
                    # register environments
                    import browsergym.assistantbench

                case "weblinx":
                    import json
                    import zipfile

                    # download weblinx ressources from huggingface hub
                    import huggingface_hub

                    cache_dir = os.getenv("BROWSERGYM_WEBLINX_CACHE_DIR", "./bg_wl_data")
                    cache_dir = Path(cache_dir).expanduser()
                    base_demo_dir = cache_dir / "demonstrations"
                    base_zip_dir = cache_dir / "demonstrations_zip"

                    metadata_path = cache_dir / "metadata.json"

                    if not metadata_path.exists():
                        logger.info(f"Downloading metadata.json")
                        huggingface_hub.snapshot_download(
                            repo_id="McGill-NLP/weblinx-browsergym",
                            repo_type="dataset",
                            local_dir=cache_dir,
                            allow_patterns=["metadata.json"],
                        )

                    with open(metadata_path, "r") as f:
                        metadata = json.load(f)

                    for split, meta_split_dict in metadata.items():
                        for demo_id, steps in meta_split_dict.items():
                            for step_num, task_dict in steps.items():
                                if task_dict["is_task"] is False:
                                    pass

                                # if the base_dir / project_id does not exist, download the dataset
                                if not base_demo_dir.joinpath(demo_id).exists():
                                    # first, if zip file does not exist, download the zip file
                                    if not base_zip_dir.joinpath(f"{demo_id}.zip").exists():
                                        logger.info(f"Downloading demonstrations_zip/{demo_id}.zip")
                                        huggingface_hub.snapshot_download(
                                            repo_id="McGill-NLP/weblinx-browsergym",
                                            repo_type="dataset",
                                            local_dir=cache_dir,
                                            allow_patterns=[f"demonstrations_zip/{demo_id}.zip"],
                                        )

                                    # then, unzip the file
                                    with zipfile.ZipFile(
                                        base_zip_dir.joinpath(f"{demo_id}.zip"), "r"
                                    ) as zip_ref:
                                        zip_ref.extractall(base_demo_dir.joinpath(demo_id))

                    # register environments
                    import weblinx_browsergym

                    weblinx_browsergym.register_weblinx_tasks(split="train")
                    weblinx_browsergym.register_weblinx_tasks(split="valid")

                case _:
                    raise ValueError(f"Unknown benchmark backend {repr(backend)}")

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
