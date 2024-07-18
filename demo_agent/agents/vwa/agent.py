import dataclasses

from browsergym.experiments import Agent, AbstractAgentArgs
from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.core.action.python import PythonActionSet
from browsergym.utils.obs import flatten_axtree_to_str
from PIL import Image
from visualwebarena.browser_env.env_config import URL_MAPPINGS
from visualwebarena.browser_env.utils import pil_to_b64
import requests
from browsergym.visualwebarena import ALL_VISUALWEBARENA_TASK_IDS
from visualwebarena.browser_env.env_config import URL_MAPPINGS
from browsergym.utils.obs import overlay_som


class VWAAgent(Agent):
    """A basic agent using OpenAI API, to demonstrate BrowserGym's functionalities."""

    action_set = HighLevelActionSet(
        subsets=["chat", "bid"],  # define a subset of the action space
        # subsets=["chat", "bid", "coord"] # allow the agent to also use x,y coordinates
        strict=False,  # less strict on the parsing of the actions
        multiaction=True,  # enable to agent to take multiple actions at once
        demo_mode="default",  # add visual effects
    )
    # use this instead to allow the agent to directly use Python code
    # action_set = PythonActionSet())

    def obs_preprocessor(self, obs: dict) -> dict:
        return {
            "goal": obs["goal"],
            "goal_image_urls": obs["goal_image_urls"],
            "last_action": obs["last_action"],
            "axtree_txt": flatten_axtree_to_str(obs["axtree_object"]),
            "url": obs["url"],
            "screenshot": obs["screenshot"],
            "extra_properties": obs["extra_element_properties"],
        }

    def __init__(self, model_name) -> None:
        super().__init__()
        self.model_name = model_name

        from openai import OpenAI

        self.openai_client = OpenAI()

    def map_url_to_real(self, url: str) -> str:
        for i, j in URL_MAPPINGS.items():
            if i in url:
                url = url.replace(i, j)
        return url

    def get_action(self, obs: dict) -> tuple[str, dict]:
        input_images = []
        for image_path in obs["goal_image_urls"]:
            # Load image either from the web or from a local path.
            if image_path.startswith("http"):
                input_image = Image.open(requests.get(image_path, stream=True).raw)
            else:
                input_image = Image.open(image_path)
            input_images.append(input_image)
        temp_input = [
            {
                "type": "text",
                "text": "IMAGES: (1) current page screenshot",
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": pil_to_b64(
                        Image.fromarray(overlay_som(obs["screenshot"], obs["extra_properties"]))
                    )
                },
            },
        ]
        for image_i, image in enumerate(input_images):
            temp_input.extend(
                [
                    {
                        "type": "text",
                        "text": f"({image_i+2}) input image {image_i+1}",
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": pil_to_b64(image)},
                    },
                ]
            )
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
```click("12")```.

If you have completed the task, use the chat option, not the bid, and return the answer. You can return the following function, with the answer as the input.
def send_msg_to_user(text: str). For example, if you are asked what is the color of the sky, return ```send_msg_to_user(blue)```
"
"""
        # query OpenAI model
        response = self.openai_client.chat.completions.create(
            model=self.model_name,
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "system", "content": temp_input},
                {"role": "user", "content": prompt},
            ],
        )
        action = response.choices[0].message.content
        return action, {}


@dataclasses.dataclass
class VWAAgentArgs(AbstractAgentArgs):
    """
    This class is meant to store the arguments that define the agent.

    By isolating them in a dataclass, this ensures serialization without storing
    internal states of the agent.
    """

    model_name: str = "gpt-4-turbo"

    def make_agent(self):
        return VWAAgent(model_name=self.model_name)


def main():
    from browsergym.experiments import EnvArgs, ExpArgs, get_exp_result
    from pathlib import Path

    exp_root = Path().home() / "agent_experiments"
    exp_root.mkdir(exist_ok=True)
    exp_args = ExpArgs(
        agent_args=VWAAgentArgs(model_name="gpt-4-turbo"),
        env_args=EnvArgs(
            task_name="visualwebarena.137",
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
