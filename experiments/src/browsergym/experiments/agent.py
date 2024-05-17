from abc import ABC, abstractmethod
from typing import Any


class Agent(ABC):
    """
    A template class that defines the required signature of an agent interacting
    with a browsergym environment.
    """

    def action_mapping(self, action: str) -> str:
        """
        This property is meant to be overloaded by your agent (optional).

        Maps the actions returned by `get_action()` to BrowserGym-compatible Python code.
        Why this mapping? This mapping will happen within the BrowserGym environment, so that the experiment loop
        manipulates and records pre-mapping actions and not the resulting Python code (which can be pretty verbose).

        Examples:
            # no mapping, the agent directly produces Python code
            return action

            # use a pre-defined action set of high-level function
            action_space = browsergym.core.action.highlevel.HighLevelActionSet(subsets=["chat", "nav", "bid"])
            return action_space.to_python_code(action)

            # use a pre-defined Python action set which extracts Markdown code snippets
            action_space = browsergym.core.action.python.PythonActionSet()
            return action_space.to_python_code(action)
        """
        return action

    def observation_mapping(self, obs: dict) -> Any:
        """
        This method is meant to be overloaded by your agent.

        Returns a function that pre-processes the observations before feeding them to `get_action()`.
        Why this mapping? This mapping will happen within the experiment loop, so that the resulting observation gets
        recorded in the execution traces.

        Examples:
            from browsergym.utils.obs import flatten_axtree_to_str
            return {
                "goal": obs["goal"],
                "axtree": flatten_axtree_to_str(obs["axtree_object"]),
            }
        """
        return obs

    @abstractmethod
    def get_action(self, obs: Any) -> tuple[str, dict]:
        """
        Updates the agent with the current observation, and returns its next action (plus an info dict, optional).

        Parameters:
        -----------
        obs:
            The current observation of the environmenti, after it has been processed by `observation_mapping()`.
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
        info: dict
            Additional information about the action. with the following entries
            being handled by BrowserGym:
                - "think": optional chain of thought
                - "messages": list of messages with the LLM
                - "stats": dict of extra statistics that will be saved and
                  aggregated.
        """
