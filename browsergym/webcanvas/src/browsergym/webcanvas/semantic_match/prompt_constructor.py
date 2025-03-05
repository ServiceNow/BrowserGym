from .semantic_prompts import BasePrompts
from jinja2 import Template


class BasePromptConstructor:
    def __init__(self):
        pass


class SemanticMatchPromptConstructor(BasePromptConstructor):
    def __init__(self):
        self.prompt_system = BasePrompts.semantic_match_prompt_system
        self.prompt_user = BasePrompts.semantic_match_prompt_user

    def construct(self, input_answer, semantic_method) -> list:
        self.prompt_user = Template(self.prompt_user).render(
            semantic_method=semantic_method, input_answer=input_answer)
        messages = [{"role": "system", "content": self.prompt_system}, {
            "role": "user", "content": self.prompt_user}]
        return messages
