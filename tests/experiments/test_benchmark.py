import dataclasses
import re
import tempfile

import numpy as np

from browsergym.core.action.base import AbstractActionSet
from browsergym.experiments.agent import Agent
from browsergym.experiments.benchmark import (
    BENCHMARKS,
    Benchmark,
    HighLevelActionSetArgs,
    _make_env_args_list_from_repeat_tasks,
)
from browsergym.experiments.loop import (
    AbstractAgentArgs,
    EnvArgs,
    ExpArgs,
    get_exp_result,
)
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
        "miniwob_all": 125 * 10,
        "miniwob_webgum": 56 * 10,
        "miniwob_tiny_test": 2 * 2,
        "miniwob_train": 107 * 10,
        "miniwob_test": 18 * 10,
        "webarena": 812,
        "visualwebarena": 910,
        "workarena_l1": 33 * 10,
        "workarena_l1_sort": 6 * 10,
        "workarena_l2_agent_curriculum": 235,
        "workarena_l3_agent_curriculum": 235,
    }
    for name, benchmark_builder in BENCHMARKS.items():
        benchmark = benchmark_builder()
        assert name == benchmark.name
        assert benchmark.env_args_list  # non-empty
        assert len(benchmark.env_args_list) == expected_bench_size[name]
        benchmark_bis = Benchmark.from_json(benchmark.to_json())
        assert benchmark.to_dict() == benchmark_bis.to_dict()


def test_run_mock_benchmark():
    benchmark = Benchmark(
        name="miniwob_click_test",
        high_level_action_set_args=HighLevelActionSetArgs(
            subsets=["bid"],
            multiaction=False,
            strict=False,
            retry_with_force=False,
            demo_mode="off",
        ),
        env_args_list=_make_env_args_list_from_repeat_tasks(
            task_list=["miniwob.click-test"],
            max_steps=5,
            n_repeats=2,
            seeds_rng=np.random.RandomState(42),
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
