import importlib.resources
import importlib.util
import json
from unittest.mock import MagicMock, patch

import playwright.sync_api
import pytest

# Skip test if webarena_verified is not installed or importable in this environment
webarena_verified_installed = importlib.util.find_spec("browsergym.webarena_verified") is not None
if webarena_verified_installed:
    from browsergym.webarena_verified.evaluators import WebArenaVerifiedEvaluator
    from webarena.browser_env.actions import ActionTypes
    from webarena_verified.types.eval import (
        EvalAssertion,
        EvalStatus,
        EvaluatorResult,
        TaskEvalResult,
    )


def two_evaluator_task():
    dataset = json.loads(
        importlib.resources.files("webarena_verified")
        .joinpath("assets/dataset/webarena-verified.json")
        .read_text()
    )
    return next(task for task in dataset if len(task["eval"]) == 2)


def evaluator_result(name, status):
    if status == "error":
        return EvaluatorResult.create(
            evaluator_name=name, is_error=True, error_msg="evaluator failed"
        )
    assertion = EvalAssertion.create(assertion_name="check", status=EvalStatus(status))
    return EvaluatorResult.create(evaluator_name=name, assertions=[assertion])


@pytest.mark.skipif(
    not webarena_verified_installed, reason="browsergym.webarena_verified not installed"
)
@pytest.mark.parametrize(
    "statuses,expected_reward",
    [
        (("success", "success"), 1.0),
        (("success", "failure"), 0.0),
        (("failure", "success"), 0.0),
        (("success", "error"), 0.0),
    ],
)
def test_reward_is_the_webarena_verified_task_score(statuses, expected_reward, tmp_path):
    """A task only counts as solved when every one of its evaluators passes."""
    task = two_evaluator_task()
    results = TaskEvalResult.create(
        task_id=task["task_id"],
        intent_template_id=task["intent_template_id"],
        sites=tuple(task["sites"]),
        task_revision=task["revision"],
        data_checksum="test",
        evaluators_results=[
            evaluator_result(spec["evaluator"], status)
            for spec, status in zip(task["eval"], statuses)
        ],
    )
    assert results.score == expected_reward

    config_file = tmp_path / "task.json"
    config_file.write_text(json.dumps(task))

    # Skip __init__, which builds the evaluation harness from a live WebArena instance.
    evaluator = WebArenaVerifiedEvaluator.__new__(WebArenaVerifiedEvaluator)
    evaluator.evaluator = MagicMock()
    evaluator.evaluator.evaluate_task.return_value = results
    page = MagicMock(spec=playwright.sync_api.Page)

    with patch("browsergym.webarena_verified.evaluators.NetworkTrace"), patch(
        "browsergym.webarena_verified.evaluators.TaskEvalContext"
    ):
        reward = evaluator(
            trajectory=[{}, {"action_type": ActionTypes.STOP, "answer": "{}"}],
            config_file=str(config_file),
            page=page,
        )

    assert reward == expected_reward
