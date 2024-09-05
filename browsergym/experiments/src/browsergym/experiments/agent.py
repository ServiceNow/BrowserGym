from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any

from browsergym.core.action.base import AbstractActionSet
from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.utils.obs import flatten_axtree_to_str, flatten_dom_to_str, prune_html


def default_obs_preprocessor(obs: dict) -> dict:
    obs = obs.copy()  # shallow copy to avoid modifying the original dict
    # augment the observation with text versions of the DOM and AXTree
    obs["dom_txt"] = flatten_dom_to_str(obs["dom_object"])
    obs["axtree_txt"] = flatten_axtree_to_str(obs["axtree_object"])
    obs["pruned_html"] = prune_html(obs["dom_txt"])
    # remove raw entries that the agent won't use, and we don't want to record
    del obs["dom_object"]
    del obs["axtree_object"]
    return obs


DEFAULT_ACTION_SET: AbstractActionSet = HighLevelActionSet()
DEFAULT_OBS_PREPROCESSOR: callable = default_obs_preprocessor


@dataclass
class AgentInfo:
    think: str = None
    chat_messages: list = None
    stats: dict = None
    markup_page: str = ""
    html_page: str = ""
    extra_info: dict = None

    def __getitem__(self, key):
        return getattr(self, key)

    def __contains__(self, key):
        return hasattr(self, key)

    def pop(self, key, default=None):
        return getattr(self, key, default)

    def get(self, key, default=None):
        return getattr(self, key, default)


class Agent(ABC):
    """
    A template class that defines the required signature of an agent interacting
    with a browsergym environment

    Attributes:
        action_set: AbstractActionSet
            Defines the set of actions that the agent can take in the environment.
            This property is meant to be overloaded by your agent (optional).
            By default, uses BrowserGym's high-level action set.
    """

    action_set: AbstractActionSet = DEFAULT_ACTION_SET

    def obs_preprocessor(self, obs: dict) -> Any:
        """
        Function that pre-processes observations before feeding them to `get_action()`.
        This property is meant to be overloaded by your agent (optional).
        By default, the base observation is augmented with text versions of the DOM and AXTREE.

        Why this mapping? This mapping will happen within the experiment loop, so that the
        resulting observation gets recorded in the execution traces, and statistics can be computed from it.
        """
        return DEFAULT_OBS_PREPROCESSOR(obs)

    @abstractmethod
    def get_action(self, obs: Any) -> tuple[str, AgentInfo]:
        """
        Updates the agent with the current observation, and returns its next action (plus an info dict, optional).

        Parameters:
        -----------
        obs:
            The current observation of the environment, after it has been processed by `obs_preprocessor()`.
            By default, a BrowserGym observation is a dict with the following entries:
            - "chat_messages": list[str], messages between the agent and the user.
            - "goal": str, the current goal.
            - "open_pages_urls": list[str], open pages.
            - "active_page_index": int, the index of the active page.
            - "url": str, the current URL.
            - "screenshot": 3D np.array, the current screenshot.
            - "dom_object": dict, the current DOM object. See DOMSnapshot from chrome devtools.
            - "axtree_object": dict, the current AXTREE object. See Accessibility Tree from chrome devtools.
            - "extra_element_properties": dict[bid, dict[name, value]] extra
            properties of elements in the DOM.
            - "focused_element_bid": str, the bid of the focused element.
            - "last_action": str, the last action executed.
            - "last_action_error": str, the error of the last action.
            - "elapsed_time": float, the time elapsed since the start of the episode.

        Returns:
        --------
        action: str
            The action to be processed by `action_mapping()` (if any), and executed in the environment.
        info: AgentInfo
            Additional information about the action. with the following entries
            being handled by BrowserGym:
                - "think": optional chain of thought
                - "messages": list of messages with the LLM
                - "stats": dict of extra statistics that will be saved and
                  aggregated.
                - "markup_page": str, string that will be displayed by agentlab's xray tool.
                - "extra_info": dict, additional information that will be saved
                  and aggregated.
        """
