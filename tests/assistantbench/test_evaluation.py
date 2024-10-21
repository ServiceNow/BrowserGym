import json
import pathlib

import gymnasium as gym
import pytest

from browsergym.assistantbench.evaluation.evaluator import question_scorer
from browsergym.experiments.benchmark import task_list_from_metadata, task_metadata

__DATA_DIR = pathlib.Path(__file__).resolve().parent / "data"

metadata = task_metadata("assistantbench")
file_path = pathlib.Path(__DATA_DIR) / "fallback_gpt4_seeplanact_predictions.jsonl"

data_points = {}

# Open the JSONL file and read each line as a JSON object
with open(file_path, "r") as f:
    for line in f:
        data_point = json.loads(line)

        original_id = data_point["id"]
        answer = data_point["answer"]
        gold_answer = data_point["gold_answer"]
        score = data_point["score"]
        has_ans = data_point["has_ans"]

        data_points[original_id] = {
            "task_id": task_list_from_metadata(metadata, {"original_id": original_id})[0],
            "answer": answer,
            "gold_answer": gold_answer,
            "score": score,
            "has_ans": has_ans,
        }


@pytest.mark.parametrize("original_id", list(data_points.keys()))
def test_evaluate(original_id: str):

    answer = data_points[original_id]["answer"]
    gold_answer = data_points[original_id]["gold_answer"]
    expected_score = data_points[original_id]["score"]
    expected_has_ans = data_points[original_id]["has_ans"]

    score, has_ans = question_scorer(answer, gold_answer)

    # Assert if the expected results doesn't match
    assert score == expected_score
    assert has_ans == expected_has_ans


@pytest.mark.parametrize("original_id", list(data_points.keys()))
@pytest.mark.slow
def test_evaluate_within_env(original_id: str):

    task_id = data_points[original_id]["task_id"]
    answer = data_points[original_id]["answer"]
    expected_score = data_points[original_id]["score"]

    env = gym.make(
        f"browsergym/{task_id}",
    )
    obs, info = env.reset()
    assert not obs["last_action_error"]

    obs, reward, terminated, truncated, info = env.step(f"send_msg_to_user({repr(str(answer))})")
    assert not obs["last_action_error"]
    assert terminated
    assert reward == expected_score

    env.close()
