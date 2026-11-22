"""Offline audit controls; no browser, network, provider, or pickle input."""

import importlib.util
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


TOOL = Path(__file__).resolve().parents[2] / "dev" / "audit_verified_scores.py"
SPEC = importlib.util.spec_from_file_location("verified_score_audit", TOOL)
audit = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(audit)


def record(statuses=("success", "failure")):
    scores = {"success": 1.0, "failure": 0.0, "error": 0.0}
    evaluators = [
        {
            "evaluator_name": f"Evaluator{i}",
            "status": status,
            "score": scores[status],
            "assertions": (
                None
                if status == "success"
                else [
                    {
                        "assertion_name": "check",
                        "status": status,
                        "error_msg": "synthetic error" if status == "error" else None,
                    }
                ]
            ),
            "error_msg": None,
        }
        for i, status in enumerate(statuses)
    ]
    status = (
        "error"
        if "error" in statuses
        else ("success" if all(s == "success" for s in statuses) else "failure")
    )
    return {
        "task_id": 44,
        "intent_template_id": 1,
        "task_revision": 2,
        "sites": ["shopping"],
        "status": status,
        "score": scores[status],
        "evaluators_results": evaluators,
        "error_msg": None,
        "webarena_verified_version": "1.2.3",
        "webarena_verified_evaluator_checksum": "a" * 64,
        "webarena_verified_data_checksum": "b" * 64,
    }


def expected(value):
    return {key: value[key] for key in audit.IDENTITY_FIELDS} | {
        "evaluator_names": [er["evaluator_name"] for er in value["evaluators_results"]]
    }


class AuditTests(unittest.TestCase):
    def test_partial_failure_and_error_are_not_success(self):
        for statuses in [("success", "failure"), ("success", "error")]:
            value = record(statuses)
            row = audit.validate_result(value, expected(value))
            self.assertEqual(row["old_reward"], 0.5)
            self.assertEqual(row["task_score"], 0.0)

    def test_clean_control(self):
        value = record(("success", "success"))
        row = audit.validate_result(value, expected(value))
        self.assertEqual(row["old_reward"], 1.0)
        self.assertEqual(row["task_score"], 1.0)

    def test_top_level_error_may_have_no_evaluators(self):
        value = record()
        provenance = expected(value)
        value.update(
            status="error", score=0.0, error_msg="evaluation failed", evaluators_results=[]
        )
        row = audit.validate_result(value, provenance)
        self.assertEqual(row["old_reward"], 0.0)
        self.assertEqual(row["task_score"], 0.0)
        self.assertEqual(row["status"], "error")

    def test_empty_without_task_error_is_truncated(self):
        value = record()
        provenance = expected(value)
        value["evaluators_results"] = []
        with self.assertRaises(ValueError):
            audit.validate_result(value, provenance)

    def test_incomplete_or_duplicate_evaluators_fail(self):
        value = record()
        provenance = expected(value)
        value["evaluators_results"].pop()
        with self.assertRaises(ValueError):
            audit.validate_result(value, provenance)
        value = record()
        value["evaluators_results"][1]["evaluator_name"] = "Evaluator0"
        with self.assertRaises(ValueError):
            audit.validate_result(value, expected(value))

    def test_inconsistent_summaries_and_scores_fail(self):
        for change in [
            {"score": 1.0},
            {"status": "success"},
            {"score": True},
            {"score": float("nan")},
            {"score": 0.5},
        ]:
            value = record()
            value.update(change)
            with self.assertRaises(ValueError):
                audit.validate_result(value, expected(value))
        value = record()
        value["evaluators_results"][0]["score"] = 0.0
        with self.assertRaises(ValueError):
            audit.validate_result(value, expected(value))

    def test_provenance_mismatch_fails(self):
        value = record()
        provenance = expected(value)
        value["task_revision"] += 1
        with self.assertRaises(ValueError):
            audit.validate_result(value, provenance)
        value = record()
        value["webarena_verified_version"] = "99.0.0"
        with self.assertRaises(ValueError):
            audit.validate_result(value, expected(value))

    def test_strict_parser(self):
        for data in [
            b'{"score":0,"score":1}',
            b'{"x":NaN}',
            b'{"x":Infinity}',
            b'{"x":1e999}',
            b"[" * 40 + b"0" + b"]" * 40,
            b'{"x":"' + b"a" * audit.MAX_BYTES + b'"}',
        ]:
            with self.assertRaises(ValueError):
                audit.parse_json(data)
        self.assertEqual(audit.parse_json(b'{"text":"[{}]"}'), {"text": "[{}]"})

    def test_unsupported_fields_and_types_fail(self):
        for field, change in [
            ("task_id", True),
            ("sites", "shopping"),
            ("status", "partial_match"),
            ("unknown", 1),
        ]:
            value = record()
            value[field] = change
            with self.assertRaises(ValueError):
                audit.validate_result(value, expected(value))

    def test_manifest_keeps_errors_and_invalid_denominators(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            value = record()
            provenance = expected(value)
            value.update(status="error", score=0.0, error_msg="task failure", evaluators_results=[])
            data = json.dumps(value).encode()
            (root / "result.json").write_bytes(data)
            entry = {
                "run_id": "synthetic",
                "path": "result.json",
                "sha256": hashlib.sha256(data).hexdigest(),
                "expected": provenance,
            }
            manifest = root / "manifest.json"
            manifest.write_text(json.dumps({"schema": 1, "records": [entry]}))
            report = audit.audit_manifest(manifest)
            self.assertEqual(report["input_records"], 1)
            self.assertEqual(report["groups"][0]["status_counts"], {"error": 1})
            self.assertEqual(report["groups"][0]["mean_task_score"], 0.0)
            second = entry | {"run_id": "different-config"}
            manifest.write_text(json.dumps({"schema": 1, "records": [entry, second]}))
            report = audit.audit_manifest(manifest)
            self.assertEqual(len(report["groups"]), 2)
            manifest.write_text(json.dumps({"schema": 1, "records": [entry, entry]}))
            report = audit.audit_manifest(manifest)
            self.assertFalse(report["complete"])
            self.assertEqual(report["input_records"], 2)
            self.assertEqual(report["valid_records"], 1)
            self.assertEqual(report["invalid_records"], 1)
            self.assertIsNone(report["groups"][0]["mean_task_score"])
            entry["sha256"] = "0" * 64
            manifest.write_text(json.dumps({"schema": 1, "records": [entry]}))
            self.assertEqual(audit.audit_manifest(manifest)["invalid_records"], 1)

    def test_historical_demo_groups_stay_separate(self):
        manifest = TOOL.parent / "verified_score_audit_demo" / "manifest.json"
        report = audit.audit_manifest(manifest)
        self.assertEqual(report["valid_records"], 2)
        self.assertEqual(len(report["groups"]), 2)
        self.assertTrue(all(g["changed_records"] == 0 for g in report["groups"]))

    def test_huge_integer_is_invalid_row_and_cli_fails_closed(self):
        with self.assertRaises(ValueError):
            audit._score(10**400)
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            records = []
            for index in range(2):
                value = record()
                provenance = expected(value)
                if index:
                    value["score"] = 10**400
                data = json.dumps(value).encode()
                name = f"result-{index}.json"
                (root / name).write_bytes(data)
                records.append(
                    {
                        "run_id": f"synthetic-{index}",
                        "path": name,
                        "sha256": hashlib.sha256(data).hexdigest(),
                        "expected": provenance,
                    }
                )
            manifest = root / "manifest.json"
            manifest.write_text(json.dumps({"schema": 1, "records": records}))
            report = audit.audit_manifest(manifest)
            self.assertEqual(report["valid_records"], 1)
            self.assertEqual(report["invalid_records"], 1)
            self.assertIsNone(report["groups"][0]["mean_old_reward"])
            self.assertIsNone(report["groups"][0]["mean_task_score"])
            result = subprocess.run(
                [sys.executable, str(TOOL), str(manifest)],
                capture_output=True,
                text=True,
                timeout=10,
            )
            self.assertEqual(result.returncode, 2)
            self.assertEqual(json.loads(result.stdout)["invalid_records"], 1)
            self.assertNotIn("Traceback", result.stderr)


if __name__ == "__main__":
    unittest.main()
