import dataclasses

from abc import abstractmethod
from browsergym.core.env import BrowserEnv

from .agent import Agent


@dataclasses.dataclass
class EnvArgs:

    def make_env(self) -> BrowserEnv:
        pass


@dataclasses.dataclass
class AgentArgs:
    agent_name: str

    @abstractmethod
    def make_agent(self) -> Agent:
        pass


@dataclasses.dataclass
class ExpArgs:

    def run(self):
        pass
