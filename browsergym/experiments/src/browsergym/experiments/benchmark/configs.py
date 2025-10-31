import numpy as np

from browsergym.experiments.benchmark.metadata.utils import (
    task_list_from_metadata,
    task_metadata,
)
from browsergym.experiments.benchmark.utils import (
    make_env_args_list_from_fixed_seeds,
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
    "webarena_verified": HighLevelActionSetArgs(
        subsets=["webarena_verified"],
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
        subsets=["assistantbench"],
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
    "miniwob": lambda n_repeats=5: Benchmark(
        name="miniwob",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["miniwob_all"],
        is_multi_tab=False,
        supports_parallel_seeds=True,
        backends=["miniwob"],
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(metadata=task_metadata("miniwob")),
            max_steps=10,
            n_repeats=n_repeats,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("miniwob"),
    ),
    "miniwob_tiny_test": lambda n_repeats=2: Benchmark(
        name="miniwob_tiny_test",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["miniwob_all"],
        is_multi_tab=False,
        supports_parallel_seeds=True,
        backends=["miniwob"],
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=["miniwob.click-dialog", "miniwob.click-checkboxes"],
            max_steps=5,
            n_repeats=n_repeats,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("miniwob"),
    ),
    "webarena": lambda n_repeats=1: Benchmark(
        name="webarena",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["webarena"],
        is_multi_tab=True,
        supports_parallel_seeds=False,
        backends=["webarena"],
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(metadata=task_metadata("webarena")),
            max_steps=30,
            n_repeats=n_repeats,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("webarena"),
    ),
    "webarena_verified": lambda n_repeats=1: Benchmark(
        name="webarena_verified",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["webarena"],
        is_multi_tab=True,
        supports_parallel_seeds=False,
        backends=["webarena_verified"],
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(metadata=task_metadata("webarena_verified")),
            max_steps=30,
            n_repeats=n_repeats,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("webarena_verified"),
    ),
    "webarena_lite": lambda n_repeats=1: Benchmark(
        name="webarena_lite",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["webarena"],
        is_multi_tab=True,
        supports_parallel_seeds=False,
        backends=["webarena"],
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(metadata=task_metadata("webarenalite")),
            max_steps=30,
            n_repeats=n_repeats,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("webarenalite"),
    ),
    "webarena_tiny": lambda n_repeats=1: Benchmark(
        name="webarena_tiny",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["webarena"],
        is_multi_tab=True,
        supports_parallel_seeds=False,
        backends=["webarena"],
        env_args_list=make_env_args_list_from_fixed_seeds(
            task_list=[
                "webarena.410",
                "webarena.533",
                "webarena.537",
                "webarena.552",
                "webarena.561",
                "webarena.562",
            ],
            max_steps=30,
            fixed_seeds=[0],
        ),
        task_metadata=task_metadata("webarena"),
    ),
    "visualwebarena_tiny": lambda n_repeats=10: Benchmark(
        name="visualwebarena_tiny",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["visualwebarena"],
        is_multi_tab=True,
        supports_parallel_seeds=False,
        backends=["visualwebarena"],
        env_args_list=make_env_args_list_from_fixed_seeds(
            task_list=[
                "visualwebarena.228",
                "visualwebarena.263",
                "visualwebarena.550",
                "visualwebarena.784",
            ],
            max_steps=30,
            fixed_seeds=[0],
        ),
        task_metadata=task_metadata("visualwebarena"),
    ),
    "visualwebarena": lambda n_repeats=1: Benchmark(
        name="visualwebarena",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["visualwebarena"],
        is_multi_tab=True,
        supports_parallel_seeds=False,
        backends=["visualwebarena"],
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(metadata=task_metadata("visualwebarena")),
            max_steps=30,
            n_repeats=n_repeats,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("visualwebarena"),
    ),
    "workarena_l1": lambda n_repeats=10: Benchmark(
        name="workarena_l1",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["workarena"],
        is_multi_tab=False,
        supports_parallel_seeds=True,
        backends=["workarena"],
        env_args_list=make_env_args_list_from_workarena_curriculum(
            level="l1",
            task_category_filter=None,
            meta_seed=42,  # meta seed for evaluation curriculum
            max_steps=15,
            curriculum_type="agent",
            seeds_l1=n_repeats,
        ),
        task_metadata=task_metadata("workarena"),
    ),
    "workarena_l2_agent_curriculum_eval": lambda n_repeats=1: Benchmark(
        name="workarena_l2_agent_curriculum_eval",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["workarena++"],
        is_multi_tab=True,
        supports_parallel_seeds=True,
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
    "workarena_l3_agent_curriculum_eval": lambda n_repeats=1: Benchmark(
        name="workarena_l3_agent_curriculum_eval",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["workarena++"],
        is_multi_tab=True,
        supports_parallel_seeds=True,
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
    "assistantbench": lambda n_repeats=1: Benchmark(
        name="assistantbench",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["assistantbench"],
        is_multi_tab=True,
        supports_parallel_seeds=True,
        backends=["assistantbench"],
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(
                metadata=task_metadata("assistantbench"), filter={"browsergym_split": "valid|test"}
            ),
            max_steps=30,
            n_repeats=n_repeats,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("assistantbench"),
    ),
    "weblinx": lambda n_repeats=1: Benchmark(
        name="weblinx",
        high_level_action_set_args=DEFAULT_HIGHLEVEL_ACTION_SET_ARGS["weblinx"],
        is_multi_tab=True,
        supports_parallel_seeds=True,
        backends=["weblinx"],
        env_args_list=make_env_args_list_from_repeat_tasks(
            task_list=task_list_from_metadata(metadata=task_metadata("weblinx")),
            max_steps=1,
            n_repeats=n_repeats,
            seeds_rng=np.random.RandomState(42),
        ),
        task_metadata=task_metadata("weblinx"),
    ),
}
