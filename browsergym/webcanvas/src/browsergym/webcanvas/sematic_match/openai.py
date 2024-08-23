
import os
import openai


openai_api_key = os.getenv("OPENAI_API_KEY")


openai.api_key = openai_api_key


class GPTGenerator:
    def __init__(self, model=None):
        self.model = model
        self.client = openai.OpenAI(api_key=openai_api_key)

    def request(self, messages: list = None, max_tokens: int = 500, temperature: float = 0.7) -> (str, str):
        try:
            answer = self.chat(messages, max_tokens, temperature)
            choice = answer.choices[0]
            openai_response = choice.message.content
            return openai_response, ""
        except Exception as e:
            return "", e

    def chat(self, messages, max_tokens=500, temperature=0.7):
        data = {
            'model': self.model,
            'max_tokens': max_tokens,
            'temperature': temperature,
            'messages': messages,
        }
        if hasattr(self, 'response_format'):
            data['response_format'] = self.response_format

        return self.client.chat.completions.create(**data)


class GPTGenerator35(GPTGenerator):
    def __init__(self, model=None):
        super().__init__(model=model if model is not None else "gpt-3.5-turbo")


class GPTGenerator4(GPTGenerator):
    def __init__(self, model=None):
        super().__init__(model=model if model is not None else "gpt-4-turbo")
