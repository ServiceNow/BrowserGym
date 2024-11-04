#
# TapeAgents compatibility layer
#
# This file contains the Tape, Step, Thought, Action, and Observation classes
# providing a compatibility layer between the TapeAgents framework (https://github.com/ServiceNow/TapeAgents)
# and the BrowserGym without any additional dependencies.

import uuid


class Step:
    kind: str = "browsergym_step"
    metadata: dict

    def __init__(self, metadata: dict):
        self.metadata = {"id": uuid.uuid4().hex, "agent": "browsergym_agent", "other": metadata}

    def as_dict(self) -> dict:
        return self.__dict__


class Thought(Step):
    kind: str = "browsergym_thought"
    text: str

    def __init__(self, metadata: dict, text: str):
        super().__init__(metadata)
        self.text = text


class Action(Step):
    kind: str = "browsergym_action"
    name: str
    arguments: dict

    def __init__(self, metadata: dict, name: str, arguments: dict):
        super().__init__(metadata)
        self.name = name
        self.arguments = arguments


class Observation(Step):
    kind: str = "browsergym_observation"
    obs: dict
    screenshot: str
    screenshot_som: str

    def __init__(self, metadata: dict, obs: dict, screenshot: str, screenshot_som: str):
        super().__init__(metadata)
        self.obs = obs
        self.screenshot = screenshot
        self.screenshot_som = screenshot_som


class Tape:
    steps: list[Step]
    metadata: dict

    def __init__(self, steps: list[Step], metadata: dict):
        self.steps = steps
        self.metadata = {
            "id": uuid.uuid4().hex,
            "author": "browsergym_agent",
            "browsergym_data": metadata,
        }

    def as_dict(self) -> dict:
        return {"metadata": self.metadata, "steps": [step.as_dict() for step in self.steps]}
