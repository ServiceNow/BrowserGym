from dataclasses import dataclass, field
from ui_assist.utils.chat_api import ChatModelArgs


@dataclass
class AgentArgs:
    agent_name: str
    chat_model_args: ChatModelArgs = None
    kwargs: dict = field(default_factory=dict)

    def make_agent(self):
        match self.agent_name:
            case "GenericAgent":
                from ui_assist.agents.generic_agent import GenericAgent

                return GenericAgent(chat_model_args=self.chat_model_args, **self.kwargs)
            case _:
                raise ValueError(f"agent_name {self.agent_name} not recognized")
