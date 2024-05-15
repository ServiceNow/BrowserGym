from abc import ABC, abstractmethod

from browsergym.utils.obs import flatten_axtree_to_str, flatten_dom_to_str

from .utils import prune_html


class Agent(ABC):
    """
    A template class that defines the required signature of an agent interacting with a browsergym environment.
    """

    @abstractmethod
    def reset(self, seed=None) -> None:
        """
        Resets the agent.

        """
        pass

    @abstractmethod
    def get_action(self, obs: dict) -> tuple[str, dict]:
        """
        Updates the agent with the current observation, and returns its next action (plus an info dict, optional).

        Parameters:
        -----------
        obs: dict
            The current observation of the environment.
        """

    def preprocess_obs(self, obs: dict) -> dict:
        """Default preprocessing of the observation."""
        obs["dom_txt"] = flatten_dom_to_str(obs["dom_object"])
        obs["axtree_txt"] = flatten_axtree_to_str(obs["axtree_object"])
        obs["pruned_html"] = prune_html(obs["dom_txt"])

    def get_action_mapping(self) -> callable:
        """
        Returns a callable that can be used to map the agent actions to executable python code.
        """
        return None
