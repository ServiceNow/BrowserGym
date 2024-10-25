import numpy as np

from browsergym.experiments.benchmark.metadata.utils import (
    task_list_from_metadata,
    task_metadata,
)
from browsergym.experiments.benchmark.utils import (
    make_env_args_list_from_repeat_tasks,
    make_env_args_list_from_workarena_curriculum,
)

from .base import Benchmark, HighLevelActionSetArgs

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
    "weblinx": HighLevelActionSetArgs(
        subsets=["weblinx"],
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
        backends=["miniwob"],
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
        backends=["miniwob"],
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
        backends=["webarena"],
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
        backends=["visualwebarena"],
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
        backends=["workarena"],
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
        backends=["workarena"],
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
        backends=["workarena"],
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
        backends=["assistantbench"],
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
    "weblinx": lambda: Benchmark(
        name="weblinx",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["assistantbench"],
        is_multi_tab=True,
        backends=["weblinx"],
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(metadata=task_metadata("weblinx")),
            max_steps=1,
            n_repeats=1,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("weblinx"),
    ),
}
