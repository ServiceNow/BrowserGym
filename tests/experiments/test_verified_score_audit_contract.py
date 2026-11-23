"""Mandatory real-package conformance check: webarena-verified==1.2.3."""

import importlib.util
from importlib.metadata import version
from pathlib import Path
import unittest

from webarena_verified.types.eval import EvalAssertion, EvaluatorResult, TaskEvalResult

HELPER_PATH = Path(__file__).resolve().with_name("test_verified_score_audit.py")
HELPER_SPEC = importlib.util.spec_from_file_location("verified_audit_controls", HELPER_PATH)
HELPERS = importlib.util.module_from_spec(HELPER_SPEC)
HELPER_SPEC.loader.exec_module(HELPERS)
audit, expected = HELPERS.audit, HELPERS.expected


class PackageContractTests(unittest.TestCase):
    def test_real_package_aggregation(self):
        self.assertEqual(version("webarena-verified"), "1.2.3")
        for statuses in [("success", "success"), ("success", "failure"), ("success", "error")]:
            evaluators = []
            for i, status in enumerate(statuses):
                assertion = EvalAssertion.create(
                    assertion_name="synthetic_check",
                    status=status,
                    error_msg="synthetic assertion error" if status == "error" else None,
                )
                evaluators.append(
                    EvaluatorResult.create(
                        evaluator_name=f"Evaluator{i}",
                        assertions=[assertion],
                    )
                )
            result = TaskEvalResult.create(
                task_id=44,
                intent_template_id=1,
                task_revision=2,
                sites=("shopping",),
                data_checksum="b" * 64,
                evaluators_results=evaluators,
            )
            value = result.model_dump(mode="json")
            row = audit.validate_result(value, expected(value))
            self.assertEqual(row["task_score"], result.score)
            self.assertEqual(row["status"], result.status)
            self.assertEqual(row["old_reward"], sum(e.score for e in evaluators) / 2)
            self.assertEqual(row["delta"], 0.0 if statuses[1] == "success" else -0.5)

    def test_real_task_error_keeps_zero_and_denominator(self):
        result = TaskEvalResult.create(
            task_id=44,
            intent_template_id=1,
            task_revision=2,
            sites=("shopping",),
            data_checksum="b" * 64,
            is_error=True,
            error_msg="synthetic task-level failure",
        )
        value = result.model_dump(mode="json")
        provenance = expected(value)
        provenance["evaluator_names"] = ["AgentResponseEvaluator"]
        row = audit.validate_result(value, provenance)
        self.assertEqual(row["task_score"], 0.0)
        self.assertEqual(row["old_reward"], 0.0)
        self.assertEqual(row["status"], "error")


if __name__ == "__main__":
    unittest.main()
