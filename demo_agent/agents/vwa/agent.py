import base64
import dataclasses
import io
import requests
import tempfile

from browsergym.experiments import Agent, AbstractAgentArgs
from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.utils.obs import flatten_axtree_to_str
from browsergym.utils.obs import overlay_som
from PIL import Image
from io import BytesIO


def pil_to_b64(img: Image.Image) -> str:
    with BytesIO() as image_buffer:
        img.save(image_buffer, format="PNG")
        byte_data = image_buffer.getvalue()
        img_b64 = base64.b64encode(byte_data).decode("utf-8")
        img_b64 = "data:image/png;base64," + img_b64
    return img_b64


def b64_to_pil(img_b64: str) -> str:
    if not img_b64.startswith("data:image/png;base64,"):
        raise ValueError(f"Unexpected base64 encoding: {img_b64}")
    img_b64 = img_b64.removeprefix("data:image/png;base64,")
    img_data = base64.b64decode(img_b64)
    img = Image.open(io.BytesIO(img_data))
    return img


class VWAAgent(Agent):
    """A basic agent using OpenAI API, to demonstrate BrowserGym's functionalities."""

    action_set = HighLevelActionSet(
        subsets=["chat", "bid", "infeas", "nav", "tab"],
        strict=False,
        multiaction=False,
        demo_mode="off",
    )

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
        self.goal_images = None

    def get_action(self, obs: dict) -> tuple[str, dict]:
        # process goal images only once
        if self.goal_images is None:
            self.goal_images = []
            for image_i, image_url in enumerate(obs["goal_image_urls"]):
                # load the image as PIL object + PNG base64 string
                if image_url.startswith("http"):
                    image = Image.open(requests.get(image_url, stream=True).raw)
                    image_base64 = pil_to_b64(image)
                elif image_url.startswith("data:image/png;base64,"):
                    image_base64 = image_url
                    image = b64_to_pil(image_base64)
                else:
                    raise ValueError(f"Unexpected image_url: {image_url}")

                # save the image to a temporary (but persistent) PNG file
                with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as f:
                    image_path = f.name
                image.save(image_path)

                # add the image to the list
                self.goal_images.append({"base64": image_base64, "path": image_path})

        system_prompt = f"""\
Review the current state of the page and all other information to find the best
possible next action to accomplish your goal. Your answer will be interpreted
and executed by a program, make sure to follow the formatting instructions."""

        user_prompt = f"""\
# Goal:
{obs["goal"]}

# Current Accessibility Tree:
{obs["axtree_txt"]}

# Action Space
{self.action_set.describe(with_long_description=False, with_examples=True)}

Here is an example with chain of thought of a valid action when clicking on a button:
"
In order to accomplish my goal I need to click on the button with bid 12
```click("12")```
"

If you have completed the task, use the chat to return an answer. For example, if you are asked what is the color of the sky, return
"
```send_msg_to_user("blue")```
"
"""

        # screenshot
        user_msgs = [
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
        # aditional images
        for image_i, image in enumerate(self.goal_images):
            user_msgs.extend(
                [
                    {
                        "type": "text",
                        "text": f"({image_i+2}) input image {image_i+1} (local path: {repr(image['path'])})",
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": image["base64"]},
                    },
                ]
            )
        # prompt
        user_msgs.append({"type": "text", "text": user_prompt})

        # query OpenAI model
        response = self.openai_client.chat.completions.create(
            model=self.model_name,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_msgs},
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

    model_name: str = "gpt-4o"

    def make_agent(self):
        return VWAAgent(model_name=self.model_name)


def main():
    from browsergym.experiments import EnvArgs, ExpArgs, get_exp_result
    from pathlib import Path

    exp_args = ExpArgs(
        agent_args=VWAAgentArgs(model_name="gpt-4-turbo"),
        env_args=EnvArgs(
            task_name="visualwebarena.423",
            task_seed=42,
            headless=False,  # shows the browser
        ),
    )
    exp_args.prepare(exp_root=Path("./results"))
    exp_args.run()
    exp_result = get_exp_result(exp_args.exp_dir)
    exp_record = exp_result.get_exp_record()

    for key, val in exp_record.items():
        print(f"{key}: {val}")


if __name__ == "__main__":
    main()
