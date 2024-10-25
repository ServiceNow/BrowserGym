from typing import Dict, Tuple

from datasets import load_dataset
from playwright.sync_api import Page
from browsergym.core.task import AbstractBrowserTask

from browsergym.gaia.src.browsergym.evaluation.evaluator import question_scorer
from browsergym.utils.utils import add_prediction_to_jsonl

# Load dataset

DATA_DATASET = "gaia-benchmark/GAIA"
all_tasks = load_dataset(DATA_DATASET, "2023_all", trust_remote_code=True)


# Extract answers and tasks for validation and test splits
def extract_data(split_name: str) -> Tuple[Dict[str, str], Dict[str, str], Dict[str, str]]:
    return (
        {
            f"{split_name}.{i}": row["Final answer"] if row["Final answer"] is not None else ""
            for i, row in enumerate(all_tasks[split_name])
        },
        {f"{split_name}.{i}": row["Question"] for i, row in enumerate(all_tasks[split_name])},
        {f"{split_name}.{i}": row["task_id"] for i, row in enumerate(all_tasks[split_name])},
        {
            f"{split_name}.{i}": {
                k: v for k, v in row.items() if k not in {"task_id", "Question", "Final answer"}
            }
            for i, row in enumerate(all_tasks[split_name])
        },
    )


# Implementation data for testing
def get_implementation_testing_data() -> Tuple[Dict[str, str], Dict[str, str], Dict[str, str]]:
    return (
        {"imp.0": "20"},
        {
            "imp.0": "What is the weather in Paris yesterday in Celsius? Answer with the number only."
        },
        {"imp.0": "test_imp_id_0"},
        {"imp.0": {}},
    )


# Combine dev, test, and implementation-specific testing splits
gold_answers_dev, tasks_dev, ids_dev, metadata_dev = extract_data("validation")
gold_answers_test, tasks_test, ids_test, metadata_test = extract_data("test")
gold_answers_impl_testing, tasks_test_impl_testing, ids_imp_testing, metadata_imp = (
    get_implementation_testing_data()
)
gold_answers = {**gold_answers_dev, **gold_answers_test, **gold_answers_impl_testing}
tasks = {**tasks_dev, **tasks_test, **tasks_test_impl_testing}
ids = {**ids_dev, **ids_test, **ids_imp_testing}
metadatas = {**metadata_dev, **metadata_test, **metadata_imp}


class GAIATask(AbstractBrowserTask):

    @classmethod
    def get_task_id(cls) -> str:
        """
        Generic class for several task ids, this way of obtaining the task id is not compatible for now.
        """
        raise NotImplementedError

    def __init__(self, seed: int, task_id: str, output_file_path: str = None) -> None:
        """
        Args:
            seed (int): Random seed for task initialization.
            task_id (str): Unique identifier for the task (for the BrowserGym environment).
            output_file_path (str, optional): Path to the output file for saving results, needed for test set.
        """
        super().__init__(seed)
        self.task_id = task_id
        self.start_url = "https://google.com"
        self.goal = tasks[str(self.task_id)]
        self.gold = gold_answers[str(self.task_id)]
        self.gaia_task_id = ids[self.task_id]
        self.metadata = metadatas[self.task_id]
        self.output_file_path = output_file_path

    def setup(self, page: Page) -> Tuple[str, dict]:
        page.goto(self.start_url, timeout=10000)
        return self.goal, {}

    def teardown(self) -> None:
        pass

    def validate(self, page: Page, chat_messages: list[dict]) -> Tuple[float, bool, str, dict]:
        accuracy, done, msg, info = 0.0, False, "", {}

        # eval when the agent returns a response
        if chat_messages and chat_messages[-1]["role"] == "assistant":
            done = True
            prediction = chat_messages[-1]["message"]
            accuracy, has_ans = questieon_scorer(prediction, self.gold)
            if self.output_file_path:
                add_prediction_to_jsonl(
                    self.output_file_path, self.gaia_task_id, prediction, True
                )  # save answer to file

        return accuracy, done, msg, info
