import dataclasses

from browsergym.experiments import Agent, AbstractAgentArgs
from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.core.action.python import PythonActionSet


class DemoAgent(Agent):
    """A basic agent using OpenAI API, to demonstrate BrowserGym's functionalities."""

    @property
    def action_mapping(self):
        return self.action_space.to_python_code

    def __init__(self, model_name) -> None:
        super().__init__()
        self.model_name = model_name

        action_space = HighLevelActionSet(
            subsets=["bid"],  # define a subset of the action space
            # subsets=["bid", "coord"] # allows the agent to also use x,y coordinates
            strict=False,  # less strict on the parsing of the actions
            multiaction=True,  # enable to agent to take multiple actions at once
            demo_mode="default",  # adds visual effects
        )

        # uncomment this line to allow the agent to also use Python full python code
        # action_space = PythonActionSet()

        from openai import OpenAI

        self.openai_client = OpenAI()

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
{self.action_space.describe(with_long_description=False, with_examples=True)}

Here is an example with chain of thought of a valid action when clicking on a button:
"
In order to accomplish my goal I need to click on the button with bid 12
```click("12")```
"
"""

        # query OpenAI model
        response = self.openai_client.chat.completions.create(
            model=self.model_name,
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": prompt},
            ],
        )
        action = response.choices[0].message.content

        return action, {}


@dataclasses.dataclass
class DemoAgentArgs(AbstractAgentArgs):
    """
    This class is meant to store the arguments that define the agent.

    By isolating them in a dataclass, this ensures serialization without storing
    internal states of the agent.
    """

    model_name: str = "gpt-3.5-turbo"

    def make_agent(self):
        return DemoAgent(model_name=self.model_name)


def main():
    from browsergym.experiments import EnvArgs, ExpArgs, get_exp_result
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
