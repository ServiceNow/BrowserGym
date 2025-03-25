## Evaluator methods for Subtask benchmark tasks
from typing import List, Dict, Any
import playwright.sync_api

class Evaluator:
    def __init__(self, start_url: str, goal: str, evaluation_script: str):
        self.start_url = start_url
        self.goal = goal
        self.evaluation_script = evaluation_script

    def evaluate(self, page: playwright.sync_api.Page, answer: str) -> float:
        """
        Evaluate the task based on the answer and the expected output.
        """
        # Find the html from the playwright page
        html = page.content()
        reward = 0
        try:
            # Evaluate the evaluation script
            result = page.evaluate(self.evaluation_script, answer)
            if result:
                reward = 1
        except Exception as e:
            print(f"Error evaluating the evaluation script: {e}")
        
        return reward

