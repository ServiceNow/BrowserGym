import playwright.sync_api
import os
import requests
import re

from .utils import step_evaluate


class WebCanvasInstance:
    """
    Utility class to access a WebCanvas instance.
    """

    def __init__(
        self,
    ) -> None:
        pass

    @staticmethod
    def read_task_configs(all_task_configs):
        return_list = []
        for task in all_task_configs:
            task_name = task["task"]
            evaluation_data = task["evaluation"]
            reference_task_length = task["reference_task_length"]
            task_name_id = task["index"]
            reference_evaluate_steps = []
            for i, evaluation in enumerate(evaluation_data):
                match_function = evaluation["match_function_name"]
                if "url" in match_function:
                    try:
                        key = evaluation["content"]["key"]
                        reference_answer = evaluation["content"]["reference_answer"]
                        reference_evaluate_steps.append({"match_function": match_function,
                                                        "key": key, "reference_answer": reference_answer, "score": 0})
                    except:
                        print(
                            f"url error in task {task_name_id}, step {i}, match_function: {match_function}")
                        exit(1)
                elif "element_path" in match_function:
                    try:
                        reference_answer = evaluation["content"]["reference_answer"]
                        method = evaluation["method"]
                        netloc = evaluation["content"]["netloc"]
                        reference_evaluate_steps.append({"match_function": match_function, "method": method,
                                                        "reference_answer": reference_answer, "netloc": netloc,
                                                         "score": 0})
                    except:
                        print(
                            f"element_path error in task {task_name_id}, step {i}, match_function: {match_function}")
                        exit(1)
                elif "element_value" in match_function:
                    try:
                        reference_answer = evaluation["content"]["reference_answer"]
                        netloc = evaluation["content"]["netloc"]
                        if "path" in evaluation["content"].keys():
                            path = evaluation["content"]["path"]
                            reference_evaluate_steps.append({"match_function": match_function,
                                                            "reference_answer": reference_answer, "netloc": netloc,
                                                             "path": path, "score": 0})
                        else:
                            reference_evaluate_steps.append({"match_function": match_function,
                                                            "reference_answer": reference_answer, "netloc": netloc,
                                                             "score": 0})
                    except:
                        print(
                            f"element_value error in task {task_name_id}, step {i}, match_function: {match_function}")
                        exit(1)
            return_list.append(
                [task_name, task_name_id, reference_task_length, reference_evaluate_steps])

        return return_list

    @staticmethod
    def parse_bid_from_action(action_str):
        """
        Extracts all actions from the given action_str.
        """
        def parse_action(input_str):
            pattern = r"(fill|click|press|select_option)\('([^']+)',? ?'?(.*?)'?\)"
            match = re.match(pattern, input_str)
            if match:
                action_type = match.group(1)
                bid = match.group(2)
                target_value = match.group(3)
                if not target_value:
                    target_value = ""
                return action_type, bid, target_value
            else:
                return "", "", ""

        action_list = action_str.split("\n")
        actions = []
        for action in action_list:
            actions.append(parse_action(action))
        return actions

    @staticmethod
    def evaluate(page, selector, target_value, evaluate_steps, reference_evaluate_steps):
        element_value = ""
        if selector is not None:
            element_value = selector.text_content()
        elif target_value and target_value != "None":
            element_value = target_value
        evaluate_steps, match_result = step_evaluate(page=page, evaluate_steps=evaluate_steps,
                                                     input_path=selector, element_value=element_value)
        total_step_score = 0
        for evaluate in evaluate_steps:
            total_step_score += evaluate["score"]
        step_score_rate = str(
            total_step_score) + " / " + str(len(reference_evaluate_steps))
        task_finished = False
        if total_step_score == len(reference_evaluate_steps):
            task_finished = True
        return evaluate_steps, step_score_rate, match_result, task_finished
