import json
import pathlib

import gymnasium as gym
import pytest

from browsergym.assistantbench.evaluation.evaluate_utils.utils import _fix_comma
from browsergym.assistantbench.evaluation.evaluator import question_scorer
from browsergym.experiments.benchmark.metadata.utils import (
    task_list_from_metadata,
    task_metadata,
)

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


# ---------------------------------------------------------------------------
# Comma-disambiguation tests — issue #404
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    "number_str, expected",
    [
        # Multiple commas → US thousands grouping, all commas stripped
        ("3,080,000", "3080000"),
        ("1,010,000", "1010000"),
        ("12,34,567", "1234567"),  # non-standard grouping still stripped
        # Single comma + exactly 3 digits → thousands separator
        ("1,000", "1000"),
        ("1,234", "1234"),
        ("-1,000", "-1000"),  # negative thousands
        # Single comma + 3 digits + decimal part → thousands separator with decimals
        ("1,000.50", "1000.50"),
        ("1,234.56", "1234.56"),
        # Single comma + 1–2 digits → European decimal comma
        ("14,2", "14.2"),
        ("3,14", "3.14"),
        # Single comma + 4+ digits → left unchanged (ambiguous; float() will reject)
        ("1,0000", "1,0000"),
        # No comma → untouched
        ("3080000", "3080000"),
        ("14.2", "14.2"),
        ("hello", "hello"),
    ],
)
def test_fix_comma(number_str: str, expected: str):
    """Unit-test _fix_comma directly to cover every branch."""
    assert _fix_comma(number_str) == expected


@pytest.mark.parametrize(
    "prediction, gold_answer, expected_score",
    [
        # ── Previously broken: correct answers scored 0 ─────────────────────
        # dev-split validation.26: house price with US thousands separator
        ("3,080,000", "3080000", 1.0),
        # dev-split validation.3: apartment price
        ("1,010,000", "1010000", 1.0),
        # Simple thousands
        ("1,000", "1000", 1.0),
        # Thousands separator with decimal part
        ("1,000.50", "1000.50", 1.0),
        ("1,234.56", "1234.56", 1.0),
        # ── Previously broken: wrong answers scored 1.0 ──────────────────────
        # "1,000" → 1.0 which matched gold 1 — 1000x error scored as perfect
        ("1,000", "1", 0.0),
        ("1,010", "1.01", 0.0),
        # ── Must stay correct: European decimal comma ────────────────────────
        # dev-split validation.2
        ("14,2", "14.2", 1.0),
        ("3,14", "3.14", 1.0),
        # ── Control cases: no commas, must be unaffected ─────────────────────
        ("1000", "1000", 1.0),
        ("3080000", "3080000", 1.0),
    ],
)
def test_evaluate_comma_numbers(prediction: str, gold_answer: str, expected_score: float):
    """End-to-end question_scorer test for comma-formatted numeric answers."""
    score, _ = question_scorer(prediction, gold_answer)
    assert score == expected_score, (
        f"question_scorer({prediction!r}, {gold_answer!r}) "
        f"returned {score}, expected {expected_score}"
    )


def test_evaluate_comma_numbers_in_dicts():
    """
    Validates the dict-evaluation path (evaluate_dicts.py) also applies the
    comma fix.  A JSON value "1,000" against a gold numeric 1000 should score
    1.0, not 0.5 (which the old code returned due to type mismatch after
    misparse).
    """
    prediction = '[{"sender": "DHL", "price": "1,000"}]'
    gold_answer = '{"sender": "DHL", "price": 1000}'

    score, _ = question_scorer(prediction, gold_answer)
    assert score == 1.0, f"Dict scorer returned {score}, expected 1.0"


def test_evaluate_comma_numbers_negative():
    """Negative numbers with thousands separators should be handled."""
    score, _ = question_scorer("-1,000", "-1000")
    assert score == 1.0


# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    "original_id",
    [id for id in data_points.keys() if isinstance(data_points[id]["answer"], (str, float, int))],
)
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
