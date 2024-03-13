from collections import defaultdict
from dataclasses import asdict, dataclass, field
import traceback
from warnings import warn
from browsergym.utils.obs import flatten_axtree_to_str, flatten_dom_to_str
from langchain.schema import HumanMessage, SystemMessage

from agents.base import Agent
from agents import dynamic_prompting
from agents.prompt_utils import prune_html
from utils.llm_utils import ParseError, retry
from utils.chat_api import ChatModelArgs


@dataclass
class GenericAgentArgs:
    agent_name: str = "GenericAgent"
    chat_model_args: ChatModelArgs = None
    flags: dynamic_prompting.Flags = field(default_factory=lambda: dynamic_prompting.Flags())
    max_retry: int = 4

    def make_agent(self):
        return GenericAgent(
            chat_model_args=self.chat_model_args, flags=self.flags, max_retry=self.max_retry
        )


class GenericAgent(Agent):
    def __init__(
        self,
        chat_model_args: ChatModelArgs = None,
        flags: dynamic_prompting.Flags = None,
        max_retry: int = 4,
        **kwargs,
    ):
        if chat_model_args is None:
            chat_model_args = ChatModelArgs()
        self.chat_llm = chat_model_args.make_chat_model()
        self.chat_model_args = chat_model_args
        self.max_retry = max_retry

        if flags is None:
            self.flags = dynamic_prompting.Flags()
        else:
            self.flags = flags

        if self.flags.use_screenshot:
            if not self.chat_model_args.has_vision():
                warn(
                    """\

Warning: use_screenshot is set to True, but the chat model \
does not support vision. Disabling use_screenshot."""
                )
                self.flags.use_screenshot = False

        # calling this just in case, but it should be called by benchmark before the first step
        self.reset(seed=None)

        if kwargs:
            warn(f"Warning: Not using any of these arguments when initiating the agent: {kwargs}")

    def get_action(self, obs):
        if not "pruned_html" in obs:
            obs["pruned_html"] = prune_html(obs["dom_txt"])

        self.obs_history.append(obs)

        main_prompt = dynamic_prompting.MainPrompt(
            obs_history=self.obs_history,
            actions=self.actions,
            memories=self.memories,
            thoughts=self.thoughts,
            flags=self.flags,
        )

        # Determine the minimum non-None token limit from prompt, total, and input tokens, or set to None if all are None.
        maxes = (
            self.flags.max_prompt_tokens,
            self.chat_model_args.max_total_tokens,
            self.chat_model_args.max_input_tokens,
        )
        maxes = [m for m in maxes if m is not None]
        max_prompt_tokens = min(maxes) if maxes else None

        prompt = dynamic_prompting.fit_tokens(
            main_prompt,
            max_prompt_tokens=max_prompt_tokens,
            model_name=self.chat_model_args.model_name,
        )

        chat_messages = [
            SystemMessage(content=dynamic_prompting.SystemPrompt().prompt),
            HumanMessage(content=prompt),
        ]

        def parser(text):
            try:
                ans_dict = main_prompt._parse_answer(text)
            except ParseError as e:
                # these parse errors will be caught by the retry function and
                # the chat_llm will have a chance to recover
                return None, False, str(e)

            return ans_dict, True, ""

        try:
            ans_dict = retry(self.chat_llm, chat_messages, n_retry=self.max_retry, parser=parser)
            # inferring the number of retries, TODO: make this less hacky
            ans_dict["n_retry"] = (len(chat_messages) - 3) / 2
        except ValueError as e:
            # Likely due to maximum retry. We catch it here to be able to return
            # the list of messages for further analysis
            ans_dict = {"action": None}
            ans_dict["err_msg"] = str(e)
            ans_dict["stack_trace"] = traceback.format_exc()
            ans_dict["n_retry"] = self.max_retry

        self.actions.append(ans_dict["action"])
        self.memories.append(ans_dict.get("memory", None))
        self.thoughts.append(ans_dict.get("think", None))

        ans_dict["chat_messages"] = [m.content for m in chat_messages]
        ans_dict["chat_model_args"] = asdict(self.chat_model_args)

        return ans_dict["action"], ans_dict

    def reset(self, seed=None):
        self.seed = seed
        self.memories = []
        self.actions = []
        self.thoughts = []
        self.obs_history = []

    def preprocess_obs(self, obs: dict) -> dict:
        obs["dom_txt"] = flatten_dom_to_str(
            obs["dom_object"],
            with_visible=self.flags.extract_visible_tag,
            with_center_coords=self.flags.extract_coords == "center",
            with_bounding_box_coords=self.flags.extract_coords == "box",
            filter_visible_only=self.flags.extract_visible_elements_only,
        )

        obs["axtree_txt"] = flatten_axtree_to_str(
            obs["axtree_object"],
            with_visible=self.flags.extract_visible_tag,
            with_center_coords=self.flags.extract_coords == "center",
            with_bounding_box_coords=self.flags.extract_coords == "box",
            filter_visible_only=self.flags.extract_visible_elements_only,
        )

        obs["pruned_html"] = prune_html(obs["dom_txt"])

    def get_action_mapping(self) -> callable:
        return dynamic_prompting._get_action_space(self.flags).to_python_code
