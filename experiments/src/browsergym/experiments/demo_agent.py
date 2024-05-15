from browsergym.experiments.agent import Agent
from browsergym.experiments.loop import AgentArgs
from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.core.action.python import PythonActionSet
from openai import OpenAI

client = OpenAI()


def _call_openai_chat(system_msg, user_prompt, model_name):
    response = client.chat.completions.create(
        model=model_name,
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": user_prompt},
        ],
    )
    return response.choices[0].message.content


class DemoAgent(Agent):
    """A basic agent using OpenAI API, to demonstrate BrowserGym's functionalities."""

    action_set = HighLevelActionSet(subsets=["bid"], strict=False, multiaction=True)

    # uncomment this line to allow the agent to also use Python full python code
    # action_set = PythonActionSet()

    # uncomment this line to allow the agent to also use x,y coordinates
    # action_set = HighLevelActionSet(subsets=["bid", "coord"])

    def __init__(self, model_name) -> None:
        super().__init__()
        self.model_name = model_name

    def get_action(self, obs: dict) -> tuple[str, dict]:
        system_msg = f"""\
# Instructions
Review the current state of the page and all other information to find the best
possible next action to accomplish your goal. Your answer will be interpreted
and executed by a program, make sure to follow the formatting instructions.

# Goal:
{obs["goal"]}"""

        prompt = f"""\
# Current Accessibility Tree:
{obs["axtree_txt"]}

# Action Space
{self.action_set.describe(with_long_description=False, with_examples=True)}

Here is an example with chain of thought of a valid action when clicking on a button:
"
In order to accomplish my goal I need to click on the button with bid 12
```click("12")```
"
"""
        action = _call_openai_chat(system_msg, prompt, model_name=self.model_name)

        return action, {}


@dataclasses.dataclass
class DemoAgentArgs(AgentArgs):
    model_name: str = "gpt-3.5-turbo"

    def make_agent(self):
        return DemoAgent(model_name=self.model_name)

    @property
    def agent_name(self) -> str:
        return DemoAgent.__name__


def main():
    from browsergym.core.env import EnvArgs
    from browsergym.experiments.loop import ExpArgs, get_exp_result
    from pathlib import Path

    exp_root = Path().home() / "agent_experiments"
    exp_root.mkdir(exist_ok=True)

    exp_args = ExpArgs(
        agent_args=DemoAgentArgs(model_name="gpt-3.5-turbo"),
        env_args=EnvArgs(
            task_name="miniwob.click-test",
            task_seed=42,
            headless=False,  # shows the browser
        ),
    )

    exp_args.prepare(exp_root=exp_root)
    exp_args.run()

    exp_result = get_exp_result(exp_args.exp_dir)
    exp_record = exp_result.get_exp_record()

    for key, val in exp_record.items():
        print(f"{key}: {val}")
