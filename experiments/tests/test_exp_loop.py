import re
import tempfile
import logging
import dataclasses

from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.experiments.agent import Agent
from browsergym.experiments.loop import AbstractAgentArgs, EnvArgs, ExpArgs, get_exp_result
from browsergym.utils.obs import flatten_axtree_to_str


class MiniwobTestAgent(Agent):

    def observation_mapping(self, obs: dict):
        return {"axtree_txt": flatten_axtree_to_str(obs["axtree_object"])}

    def action_mapping(self, action: str):
        return self.action_space.to_python_code(action)

    def __init__(self):
        self.action_space = HighLevelActionSet(subsets="bid")

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
    def make_agent(self):
        return MiniwobTestAgent()


def test_run_exp():
    exp_args = ExpArgs(
        agent_args=MiniwobTestAgentArgs(),
        env_args=EnvArgs(task_name="miniwob.click-test", task_seed=42),
    )

    with tempfile.TemporaryDirectory() as tmp_dir:
        exp_args.prepare(tmp_dir)
        exp_args.run()
        exp_result = get_exp_result(exp_args.exp_dir)
        exp_record = exp_result.get_exp_record()

        target = {
            "env_args.task_name": "miniwob.click-test",
            "env_args.task_seed": 42,
            "env_args.headless": True,
            "env_args.record_video": False,
            "n_steps": 1,
            "cum_reward": 1.0,
            "terminated": True,
            "truncated": False,
        }

        for key, target_val in target.items():
            assert key in exp_record
            assert exp_record[key] == target_val

        # TODO investigate why it's taking almost 5 seconds to solve
        assert exp_record["stats.cum_step_elapsed"] < 5
        if exp_record["stats.cum_step_elapsed"] > 3:
            t = exp_record["stats.cum_step_elapsed"]
            logging.warning(
                f"miniwob.click-test is taking {t:.2f}s (> 3s) to solve with an oracle."
            )
