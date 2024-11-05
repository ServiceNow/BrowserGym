import logging
import os
import pathlib
from typing import Dict, Tuple

from datasets import load_dataset
from playwright.sync_api import Page

from browsergym.core.task import AbstractBrowserTask

from .evaluation.evaluator import question_scorer
from .utils import add_prediction_to_jsonl

logger = logging.getLogger(__name__)

_DEFAULT_OUTPUT_FILE = None


def set_default_output_file(output_file: str):
    global _DEFAULT_OUTPUT_FILE
    _DEFAULT_OUTPUT_FILE = output_file


def get_default_output_file():
    return _DEFAULT_OUTPUT_FILE


# Load dataset

DATA_DATASET = "AssistantBench/AssistantBench"
all_tasks = load_dataset(DATA_DATASET, trust_remote_code=True)


# Extract answers and tasks for validation and test splits
def extract_data(split_name: str) -> Tuple[Dict[str, str], Dict[str, str], Dict[str, str]]:
    return (
        {
            f"{split_name}.{i}": row["answer"] if row["answer"] is not None else ""
            for i, row in enumerate(all_tasks[split_name])
        },
        {f"{split_name}.{i}": row["task"] for i, row in enumerate(all_tasks[split_name])},
        {f"{split_name}.{i}": row["id"] for i, row in enumerate(all_tasks[split_name])},
    )


# Implementation data for testing
def get_implementation_testing_data() -> Tuple[Dict[str, str], Dict[str, str], Dict[str, str]]:
    return (
        {"imp.0": "20"},
        {
            "imp.0": "What is the weather in Paris yesterday in Celsius? Answer with the number only."
        },
        {"imp.0": "test_imp_id_0"},
    )


# Combine dev, test, and implementation-specific testing splits
gold_answers_dev, tasks_dev, ids_dev = extract_data("validation")
gold_answers_test, tasks_test, ids_test = extract_data("test")
gold_answers_impl_testing, tasks_test_impl_testing, ids_imp_testing = (
    get_implementation_testing_data()
)
gold_answers = {**gold_answers_dev, **gold_answers_test, **gold_answers_impl_testing}
tasks = {**tasks_dev, **tasks_test, **tasks_test_impl_testing}
ids = {**ids_dev, **ids_test, **ids_imp_testing}


class AssistantBenchTask(AbstractBrowserTask):

    @classmethod
    def get_task_id(cls) -> str:
        """
        Generic class for several task ids, this way of obtaining the task id is not compatible for now.
        """
        raise NotImplementedError

    def __init__(
        self, seed: int, task_id: str, output_file_path: str = None, save_predictions: bool = False
    ) -> None:
        """
        Args:
            seed (int): Random seed for task initialization.
            task_id (str): Unique identifier for the task (for the BrowserGym environment).
            output_file_path (str, optional): Path to the output file for saving results, needed for test set.
            save_predictions (bool, optional): Save predictions to the output file (yes/no).
        """
        super().__init__(seed)
        self.locale = "en-US"
        self.timezone_id = "America/New_York"

        self.task_id = task_id
        self.start_url = "https://google.com"
        self.goal = tasks[str(self.task_id)]
        self.gold = gold_answers[str(self.task_id)]
        self.ab_task_id = ids[self.task_id]
        self.save_predictions = save_predictions

        # get output_file_path value from constructor if provided
        if output_file_path:
            self.output_file_path = pathlib.Path(output_file_path)
        # else get value form environment variable
        elif "ASSISTANTBENCH_OUTPUT_DIR" in os.environ:
            self.output_file_path = (
                pathlib.Path(os.environ["ASSISTANTBENCH_OUTPUT_DIR"]) / "predictions.jsonl"
            )
            logging.info(f"Output file path set to {self.output_file_path}")
        # else get value from default
        else:
            self.output_file_path = get_default_output_file()

    def setup(self, page: Page) -> Tuple[str, dict]:
        logger.info(f"Navigating to start url: {self.start_url}")
        page.goto(self.start_url, timeout=10000)
        # TODO create empty task entry in output_file_path, raise Exception if entry already there
        if self.save_predictions and self.output_file_path:
            add_prediction_to_jsonl(
                file_path=self.output_file_path,
                task_id=self.ab_task_id,
                prediction="",
                override_if_exists=False,
            )
        return self.goal, {}

    def teardown(self) -> None:
        pass

    def validate(self, page: Page, chat_messages: list[dict]) -> Tuple[float, bool, str, dict]:
        accuracy, done, msg, info = 0.0, False, "", {}

        # eval when the agent returns a response
        if chat_messages and chat_messages[-1]["role"] == "assistant":
            done = True
            prediction = chat_messages[-1]["message"]
            if self.save_predictions and self.output_file_path:
                add_prediction_to_jsonl(
                    file_path=self.output_file_path,
                    task_id=self.ab_task_id,
                    prediction=prediction,
                    override_if_exists=True,
                )
            accuracy, has_ans = question_scorer(prediction, self.gold)

        return accuracy, done, msg, info
