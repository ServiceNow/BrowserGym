import dataclasses

from browsergym.experiments import Agent, AbstractAgentArgs
from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.core.action.python import PythonActionSet
from browsergym.utils.obs import flatten_axtree_to_str


class DemoAgent(Agent):
    """A basic agent using OpenAI API, to demonstrate BrowserGym's functionalities."""

    action_set = HighLevelActionSet(
        subsets=["chat", "bid", "infeas"],  # define a subset of the action space
        # subsets=["chat", "bid", "coord", "infeas"] # allow the agent to also use x,y coordinates
        strict=False,  # less strict on the parsing of the actions
        multiaction=False,  # does not enable the agent to take multiple actions at once
        demo_mode="default",  # add visual effects
    )
    # use this instead to allow the agent to directly use Python code
    # action_set = PythonActionSet())

    def obs_preprocessor(self, obs: dict) -> dict:

        return {
            "chat_messages": obs["chat_messages"],
            "goal_object": obs["goal_object"],
            "axtree_txt": flatten_axtree_to_str(obs["axtree_object"]),
        }

    def __init__(self, model_name: str, chat_mode: bool) -> None:
        super().__init__()
        self.model_name = model_name
        self.chat_mode = chat_mode

        from openai import OpenAI

        self.openai_client = OpenAI()

    def get_action(self, obs: dict) -> tuple[str, dict]:
        system_msgs = []
        user_msgs = []

        if self.chat_mode:
            system_msgs.append(
                {
                    "type": "text",
                    "text": f"""\
# Instructions

You are a UI Assistant, your goal is to help the user perform tasks using a web browser. You can
communicate with the user via a chat, to which the user gives you instructions and to which you
can send back messages. You have access to a web browser that both you and the user can see,
and with which only you can interact via specific commands.

Review the instructions from the user, the current state of the page and all other information
to find the best possible next action to accomplish your goal. Your answer will be interpreted
and executed by a program, make sure to follow the formatting instructions.

# Chat Messages

""",
                }
            )
            # append chat messages
            for msg in obs["chat_messages"]:
                if msg["role"] in ("user", "assistant", "infeasible"):
                    system_msgs.append(
                        {
                            "type": "text",
                            "text": f"""\
- [{msg['role']}] {msg['message']}
""",
                        }
                    )
                elif msg["role"] == "user_image":
                    system_msgs.append({"type": "image_url", "image_url": msg["message"]})
                else:
                    raise ValueError(f"Unexpected chat message role {repr(msg['role'])}")

        else:
            assert obs["goal_object"], "The goal is missing."
            system_msgs.append(
                {
                    "type": "text",
                    "text": f"""\
# Instructions

Review the current state of the page and all other information to find the best
possible next action to accomplish your goal. Your answer will be interpreted
and executed by a program, make sure to follow the formatting instructions.

# Goal

""",
                }
            )
            # append goal messages
            system_msgs.extend(obs["goal_object"])

        # append page observation and action space description
        user_msgs.append(
            {
                "type": "text",
                "text": f"""\
# Current Accessibility Tree

{obs["axtree_txt"]}

# Action Space

{self.action_set.describe(with_long_description=False, with_examples=True)}

Here is an example with chain of thought of a valid action when clicking on a button:
"
In order to accomplish my goal I need to click on the button with bid 12
```click("12")```
"
""",
            }
        )

        # query OpenAI model
        response = self.openai_client.chat.completions.create(
            model=self.model_name,
            messages=[
                {"role": "system", "content": system_msgs},
                {"role": "user", "content": user_msgs},
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

    model_name: str = "gpt-4o-mini"
    chat_mode: bool = True

    def make_agent(self):
        return DemoAgent(model_name=self.model_name, chat_mode=self.chat_mode)


def main():
    from browsergym.experiments import EnvArgs, ExpArgs, get_exp_result
    from pathlib import Path

    exp_root = Path().home() / "agent_experiments"
    exp_root.mkdir(exist_ok=True)

    exp_args = ExpArgs(
        agent_args=DemoAgentArgs(model_name="gpt-4o-mini", chat_mode=True),
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
