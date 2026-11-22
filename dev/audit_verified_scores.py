"""Audit pinned WebArena-Verified JSON results without inference or browser access.

This reports the PR413 aggregation difference; it does not re-evaluate agent
actions or establish live task correctness. See audit_verified_scores.md.
"""

import argparse
from collections import Counter
import hashlib
import json
import math
from pathlib import Path
import re


MAX_BYTES = 1024 * 1024
MAX_DEPTH = 32
MAX_RECORDS = 10000
SUPPORTED_VERSIONS = {"1.0.0rc12", "1.2.3"}
IDENTITY_FIELDS = (
    "task_id", "intent_template_id", "task_revision", "sites",
    "webarena_verified_version", "webarena_verified_evaluator_checksum",
    "webarena_verified_data_checksum",
)
RESULT_FIELDS = set(IDENTITY_FIELDS) | {
    "status", "score", "evaluators_results", "error_msg",
}
EVALUATOR_FIELDS = {
    "evaluator_name", "status", "score", "actual", "actual_normalized",
    "expected", "assertions", "error_msg", "should_not_exist",
}
ASSERTION_FIELDS = {"assertion_name", "status", "assertion_msgs", "error_msg"}
SITES = {"shopping", "shopping_admin", "reddit", "gitlab", "wikipedia", "map", "homepage"}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def _object(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, "duplicate JSON key")
        result[key] = value
    return result


def _finite(value, depth=0):
    require(depth <= MAX_DEPTH, "JSON nesting limit exceeded")
    if isinstance(value, float):
        require(math.isfinite(value), "nonfinite JSON number")
    elif isinstance(value, dict):
        for child in value.values():
            _finite(child, depth + 1)
    elif isinstance(value, list):
        for child in value:
            _finite(child, depth + 1)


def parse_json(data):
    """Parse bounded, strict JSON, rejecting duplicate keys and nonfinite numbers."""
    require(len(data) <= MAX_BYTES, "JSON byte limit exceeded")
    # Bound nesting before json.loads, including documents exceeding Python's
    # recursion limit. Brackets in strings do not affect the nesting count.
    depth, quoted, escaped = 0, False, False
    for char in data.decode("utf-8"):
        if quoted:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == '"':
                quoted = False
        elif char == '"':
            quoted = True
        elif char in "[{":
            depth += 1
            require(depth <= MAX_DEPTH, "JSON nesting limit exceeded")
        elif char in "]}":
            depth -= 1
    try:
        value = json.loads(data, object_pairs_hook=_object,
                           parse_constant=lambda _: require(False, "nonfinite JSON number"))
    except (RecursionError, UnicodeError) as error:
        raise ValueError("invalid JSON encoding or depth") from error
    _finite(value)
    return value


def read_json(path):
    with path.open("rb") as stream:
        data = stream.read(MAX_BYTES + 1)
    return parse_json(data), hashlib.sha256(data).hexdigest()


def _shape(value, required, allowed):
    require(isinstance(value, dict), "expected JSON object")
    require(required <= value.keys() <= allowed, "unsupported or incomplete object fields")


def _text(value):
    return isinstance(value, str) and bool(value.strip())


def _score(value):
    require(type(value) in (int, float) and math.isfinite(value) and value in (0, 1),
            "score must be a finite binary number")


def _status_score(value):
    require(value["status"] in ("success", "failure", "error"), "unsupported result status")
    _score(value["score"])
    require(value["score"] == (1.0 if value["status"] == "success" else 0.0),
            "status and score disagree")
    require(value.get("error_msg") is None or _text(value["error_msg"]), "invalid error message")


def validate_result(value, expected):
    """Validate the pinned result contract and compute old/new aggregation."""
    _finite(value)
    _shape(value, RESULT_FIELDS - {"error_msg"}, RESULT_FIELDS)
    _shape(expected, set(IDENTITY_FIELDS) | {"evaluator_names"},
           set(IDENTITY_FIELDS) | {"evaluator_names"})
    for name in ("task_id", "intent_template_id", "task_revision"):
        require(type(value[name]) is int and value[name] >= 0, "invalid task identity")
    require(isinstance(value["sites"], list) and 0 < len(value["sites"]) <= len(SITES)
            and all(isinstance(site, str) and site in SITES for site in value["sites"])
            and len(set(value["sites"])) == len(value["sites"]), "invalid sites")
    for name in IDENTITY_FIELDS:
        require(type(value[name]) is type(expected[name]) and value[name] == expected[name],
                "pinned provenance mismatch")
    require(value["webarena_verified_version"] in SUPPORTED_VERSIONS,
            "unsupported package version")
    for name in ("webarena_verified_evaluator_checksum", "webarena_verified_data_checksum"):
        require(isinstance(value[name], str) and re.fullmatch(r"[0-9a-f]{64}", value[name]),
                "invalid provenance checksum")
    _status_score(value)
    evaluators = value["evaluators_results"]
    names = expected["evaluator_names"]
    require(isinstance(names, list) and len(names) > 0 and all(_text(n) for n in names)
            and len(set(names)) == len(names), "invalid expected evaluator inventory")
    require(isinstance(evaluators, list), "expected evaluator list")
    task_error = value["status"] == "error" and _text(value.get("error_msg"))
    if not evaluators:
        # TaskEvalResult.create(is_error=True) legitimately returns no evaluators.
        # JSON does not serialize the is_error constructor argument.
        require(task_error, "empty evaluator list without explicit task error")
    else:
        require(len(evaluators) == len(names), "incomplete evaluator inventory")
        actual_names = []
        for er in evaluators:
            _shape(er, {"evaluator_name", "status", "score", "assertions"}, EVALUATOR_FIELDS)
            require(_text(er["evaluator_name"]), "invalid evaluator name")
            actual_names.append(er["evaluator_name"])
            _status_score(er)
            assertions = er["assertions"]
            require(assertions is None or isinstance(assertions, list), "invalid assertions")
            if assertions:
                statuses = []
                for assertion in assertions:
                    _shape(assertion, {"assertion_name", "status"}, ASSERTION_FIELDS)
                    require(_text(assertion["assertion_name"]), "invalid assertion name")
                    require(assertion["status"] in ("success", "failure", "error"),
                            "unsupported assertion status")
                    require(assertion.get("error_msg") is None
                            or _text(assertion["error_msg"]), "invalid assertion error")
                    if assertion["status"] == "error":
                        require(_text(assertion.get("error_msg")), "assertion error lacks message")
                    messages = assertion.get("assertion_msgs")
                    require(messages is None or (isinstance(messages, list)
                            and all(isinstance(m, str) for m in messages)), "invalid assertion messages")
                    statuses.append(assertion["status"])
                assertion_status = "error" if "error" in statuses else (
                    "success" if all(s == "success" for s in statuses) else "failure"
                )
            else:
                assertion_status = "success"
            evaluator_error = er["status"] == "error" and _text(er.get("error_msg"))
            require(evaluator_error or er["status"] == assertion_status,
                    "evaluator summary disagrees with assertions")
        require(len(set(actual_names)) == len(actual_names) and set(actual_names) == set(names),
                "duplicate or unexpected evaluator")
        contract_status = "error" if any(er["status"] == "error" for er in evaluators) else (
            "success" if all(er["score"] == 1 for er in evaluators) else "failure"
        )
        require(task_error or value["status"] == contract_status,
                "task summary disagrees with evaluator results")
    old = sum(er["score"] for er in evaluators) / len(evaluators) if evaluators else value["score"]
    return {"task_id": value["task_id"], "task_revision": value["task_revision"],
            "status": value["status"], "old_reward": old, "task_score": value["score"],
            "delta": value["score"] - old,
            "provenance": {k: value[k] for k in IDENTITY_FIELDS[4:]}}


def audit_manifest(path):
    """Audit an explicit pinned manifest; invalid records make aggregates unavailable."""
    manifest, manifest_sha = read_json(path)
    _shape(manifest, {"schema", "records"}, {"schema", "records"})
    require(type(manifest["schema"]) is int and manifest["schema"] == 1, "unsupported manifest schema")
    records = manifest["records"]
    require(isinstance(records, list) and 0 < len(records) <= MAX_RECORDS, "invalid record count")
    rows, invalid, identities, groups = [], [], set(), {}
    for index, entry in enumerate(records):
        try:
            _shape(entry, {"run_id", "path", "sha256", "expected"},
                   {"run_id", "path", "sha256", "expected"})
            require(_text(entry["run_id"]) and _text(entry["path"]), "missing run id or path")
            relative = Path(entry["path"])
            require(not relative.is_absolute() and ".." not in relative.parts, "path must remain in manifest directory")
            source = (path.parent / relative).resolve()
            require(source.is_relative_to(path.parent.resolve()), "path escapes manifest directory")
            value, digest = read_json(source)
            require(digest == entry["sha256"], "result content digest mismatch")
            row = validate_result(value, entry["expected"])
            identity = (entry["run_id"], row["task_id"], row["task_revision"])
            require(identity not in identities, "duplicate run/task/revision record")
            identities.add(identity)
            row.update(run_id=entry["run_id"], input_sha256=digest)
            rows.append(row)
            key = (entry["run_id"], *row["provenance"].values())
            groups.setdefault(key, []).append(row)
        except (ValueError, OSError, TypeError, KeyError) as error:
            # Avoid echoing source values or arbitrary exception text into reports.
            invalid.append({"index": index, "reason": type(error).__name__})
    summaries = []
    for group in groups.values():
        counts = Counter(row["status"] for row in group)
        summaries.append({"run_id": group[0]["run_id"],
                          "provenance": group[0]["provenance"], "valid_records": len(group),
                          "status_counts": dict(counts),
                          "changed_records": sum(row["delta"] != 0 for row in group),
                          "mean_old_reward": None if invalid else sum(r["old_reward"] for r in group) / len(group),
                          "mean_task_score": None if invalid else sum(r["task_score"] for r in group) / len(group)})
    return {"schema": 1, "manifest_sha256": manifest_sha,
            "input_records": len(records), "valid_records": len(rows),
            "invalid_records": len(invalid), "complete": not invalid,
            "groups": summaries, "rows": rows, "invalid": invalid,
            "scope": "aggregation audit only; no task replay or live success claim"}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("manifest", type=Path)
    args = parser.parse_args()
    try:
        report = audit_manifest(args.manifest)
    except (ValueError, OSError, TypeError, KeyError):
        parser.exit(2, "Invalid or unreadable manifest; no aggregate produced.\n")
    print(json.dumps(report, indent=2, allow_nan=False))
    return 0 if report["complete"] else 2


if __name__ == "__main__":
    raise SystemExit(main())
