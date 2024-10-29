import dataclasses
import os
import re
import tempfile

import numpy as np
import pytest

from browsergym.core.action.base import AbstractActionSet
from browsergym.experiments.agent import Agent
from browsergym.experiments.benchmark import Benchmark, HighLevelActionSetArgs
from browsergym.experiments.benchmark.configs import DEFAULT_BENCHMARKS
from browsergym.experiments.benchmark.utils import make_env_args_list_from_fixed_seeds
from browsergym.experiments.loop import AbstractAgentArgs, ExpArgs, get_exp_result
from browsergym.utils.obs import flatten_axtree_to_str


class MiniwobTestAgent(Agent):

    def __init__(self, action_set: AbstractActionSet):
        self.action_set = action_set

    def obs_preprocessor(self, obs: dict):
        return {"axtree_txt": flatten_axtree_to_str(obs["axtree_object"])}

    def get_action(self, obs: dict) -> tuple[str, dict]:
        match = re.search(r"^\s*\[(\d+)\].*button", obs["axtree_txt"], re.MULTILINE | re.IGNORECASE)

        if match:
            bid = match.group(1)
            action = f'click("{bid}")'
        else:
            raise Exception("Can't find the button's bid")

        return action, dict(think="I'm clicking the button as requested.")


@dataclasses.dataclass
class MiniwobTestAgentArgs(AbstractAgentArgs):
    high_level_action_set: HighLevelActionSetArgs = None

    def make_agent(self):
        return MiniwobTestAgent(action_set=self.high_level_action_set.make_action_set())


def test_build_benchmarks():
    expected_bench_size = {
        "miniwob": 125 * 5,
        "miniwob_tiny_test": 2 * 2,
        "webarena": 812,
        "visualwebarena": 910,
        "workarena_l1": 33 * 10,
        "workarena_l2_agent_curriculum_eval": 235,
        "workarena_l3_agent_curriculum_eval": 235,
        "assistantbench": 214,
        "weblinx": 36578,
    }
    for name, benchmark_builder in DEFAULT_BENCHMARKS.items():
        benchmark = benchmark_builder()
        assert name == benchmark.name
        assert benchmark.env_args_list  # non-empty
        assert benchmark.task_metadata is not None
        assert len(benchmark.env_args_list) == expected_bench_size[name]
        benchmark_bis = Benchmark.from_json(benchmark.to_json())
        assert benchmark.to_dict() == benchmark_bis.to_dict()


def test_benchmark_subset():
    benchmark: Benchmark = DEFAULT_BENCHMARKS["miniwob"]()

    benchmark_subset = benchmark.subset_from_regexp(column="task_name", regexp="click")
    assert len(benchmark_subset.env_args_list) == 31 * 5
    assert benchmark_subset.name == "miniwob[task_name=/click/]"

    benchmark_subset_1 = benchmark_subset.subset_from_regexp(
        column="miniwob_category", regexp="original"
    )
    benchmark_subset_2 = benchmark_subset.subset_from_glob(
        column="miniwob_category", glob="original"
    )

    assert benchmark_subset_1.name == "miniwob[task_name=/click/][miniwob_category=/original/]"
    assert benchmark_subset_2.name == "miniwob[task_name=/click/][miniwob_category=original]"

    dict_1 = benchmark_subset_1.to_dict()
    dict_1.pop("name")
    dict_2 = benchmark_subset_2.to_dict()
    dict_2.pop("name")

    assert dict_1 == dict_2


def test_miniwob_benchmark_reset():
    MINIWOB_URL = os.environ["MINIWOB_URL"]
    try:
        benchmark: Benchmark = DEFAULT_BENCHMARKS["miniwob"]()

        benchmark.prepare_backends()

        del os.environ["MINIWOB_URL"]
        with pytest.raises(Exception):
            benchmark.prepare_backends()

        os.environ["MINIWOB_URL"] = ""
        with pytest.raises(Exception):
            benchmark.prepare_backends()
    finally:
        os.environ["MINIWOB_URL"] = MINIWOB_URL


def test_assistantbench_benchmark_reset():
    benchmark: Benchmark = DEFAULT_BENCHMARKS["assistantbench"]()
    benchmark.prepare_backends()


@pytest.mark.skip
def test_webarena_benchmark_reset():
    WA_FULL_RESET = os.environ["WA_FULL_RESET"]
    try:
        benchmark: Benchmark = DEFAULT_BENCHMARKS["webarena"]()

        benchmark.prepare_backends()

        del os.environ["WA_FULL_RESET"]
        with pytest.raises(Exception):
            benchmark.prepare_backends()

        os.environ["WA_FULL_RESET"] = "http://localhost:12345/reset"
        with pytest.raises(Exception):
            benchmark.prepare_backends()
    finally:
        os.environ["WA_FULL_RESET"] = WA_FULL_RESET


@pytest.mark.skip
def test_visualwebarena_benchmark_reset():
    VWA_FULL_RESET = os.environ["VWA_FULL_RESET"]
    try:
        benchmark: Benchmark = DEFAULT_BENCHMARKS["visualwebarena"]()

        benchmark.prepare_backends()

        del os.environ["VWA_FULL_RESET"]
        with pytest.raises(Exception):
            benchmark.prepare_backends()

        os.environ["VWA_FULL_RESET"] = "http://localhost:12345/reset"
        with pytest.raises(Exception):
            benchmark.prepare_backends()
    finally:
        os.environ["VWA_FULL_RESET"] = VWA_FULL_RESET


def test_run_mock_benchmark():
    benchmark = Benchmark(
        name="miniwob_click_test",
        high_level_action_set_args=HighLevelActionSetArgs(
            subsets=["bid"],
            multiaction=False,
            strict=False,
            retry_with_force=True,
            demo_mode="off",
        ),
        is_multi_tab=False,
        supports_parallel_seeds=True,
        backends=["miniwob"],
        env_args_list=make_env_args_list_from_fixed_seeds(
            task_list=["miniwob.click-test"],
            max_steps=5,
            fixed_seeds=[0, 1],
        ),
    )

    for env_args in benchmark.env_args_list:
        agent_args = MiniwobTestAgentArgs(
            high_level_action_set=benchmark.high_level_action_set_args
        )
        exp_args = ExpArgs(
            agent_args=agent_args,
            env_args=env_args,
        )

        with tempfile.TemporaryDirectory() as tmp_dir:
            exp_args.prepare(tmp_dir)
            exp_args.run()
            exp_result = get_exp_result(exp_args.exp_dir)
            exp_record = exp_result.get_exp_record()

            target = {
                "env_args.task_name": "miniwob.click-test",
                "env_args.headless": True,
                "env_args.record_video": False,
                "n_steps": 1,
                "cum_reward": 1.0,
                "terminated": True,
                "truncated": False,
            }

            assert len(exp_result.steps_info) == 2

            for key, target_val in target.items():
                assert key in exp_record
                assert exp_record[key] == target_val


def test_dependency_graphs():
    benchmark = Benchmark(
        name="my_bench",
        high_level_action_set_args=HighLevelActionSetArgs(
            subsets=["bid"],
            multiaction=False,
            strict=False,
            retry_with_force=True,
            demo_mode="off",
        ),
        is_multi_tab=False,
        supports_parallel_seeds=True,
        backends=["miniwob"],
        env_args_list=make_env_args_list_from_fixed_seeds(
            task_list=["miniwob.click-test"],
            max_steps=5,
            fixed_seeds=[0, 1],
        ),
    )

    task_dependencies = benchmark.dependency_graph_over_tasks()
    assert task_dependencies == {"miniwob.click-test": []}

    env_args_dependencies = benchmark.dependency_graphs_over_env_args()
    assert env_args_dependencies == [{0: [], 1: []}]

    benchmark.supports_parallel_seeds = False
    env_args_dependencies = benchmark.dependency_graphs_over_env_args()
    assert env_args_dependencies == [{0: []}, {1: []}]

    benchmark = DEFAULT_BENCHMARKS["webarena"]().subset_from_regexp(
        column="task_name", regexp="^webarena\.[012]$"
    )

    task_dependencies = benchmark.dependency_graph_over_tasks()
    assert task_dependencies == {
        "webarena.0": [],
        "webarena.1": ["webarena.0"],
        "webarena.2": ["webarena.1"],
    }

    env_args_dependencies = benchmark.dependency_graphs_over_env_args()
    assert env_args_dependencies == [{0: [], 1: [0], 2: [1]}]
