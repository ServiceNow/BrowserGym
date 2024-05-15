from abc import ABC, abstractmethod

from browsergym.core.action.base import AbstractActionSet
from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.utils.obs import flatten_axtree_to_str, flatten_dom_to_str

from .prompt_utils import prune_html


def default_observation_mapping(obs: dict) -> dict:
    obs = obs.copy()  # shallow copy to avoid modifying the original dict
    obs["dom_txt"] = flatten_dom_to_str(obs["dom_object"])
    obs["axtree_txt"] = flatten_axtree_to_str(obs["axtree_object"])
    obs["pruned_html"] = prune_html(obs["dom_txt"])
    return obs


class Agent(ABC):
    """
    A template class that defines the required signature of an agent interacting
    with a browsergym environment.

    action_set: AbstractActionSet
        The set of actions that the agent can take in the environment.
    observation_mapping: callable
        A function that maps the base observation to a different observation.
        The default_observation_mapping augment the base observation with text
        versions of the DOM and AXTREE objects, and a pruned version of the HTML.
    """

    action_set: AbstractActionSet = HighLevelActionSet()
    observation_mapping: callable = staticmethod(default_observation_mapping)

    @abstractmethod
    def get_action(self, obs: dict) -> tuple[str, dict]:
        """
        Updates the agent with the current observation, and returns its next action (plus an info dict, optional).

        Parameters:
        -----------
        obs: dict
            The current observation of the environment.
            - "chat_messages": list[str], messages between the agent and the user.
            - "goal": str the current goal.
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
            The action to be executed in the environment.
        info: dict
            Additional information about the action. with the following key
            being handled by browsergym:
                - "think": optional chain of thought
                - "messages": list of messages with the LLM
                - "stats": dict of extra statistics that will be saved and
                  aggregated.
        """
