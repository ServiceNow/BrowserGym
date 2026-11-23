# Audit WebArena-Verified score aggregation

This offline utility compares BrowserGym's existing mean of evaluator scores
with the task score recorded by WebArena-Verified. It supports independent
validation of [PR413](https://github.com/ServiceNow/BrowserGym/pull/413), whose
author already implements the evaluator fix. It does not patch the evaluator,
run an agent, call a provider, load pickle files, or replay browser actions.

From the repository root:

```sh
python dev/audit_verified_scores.py dev/verified_score_audit_demo/manifest.json
python tests/experiments/test_verified_score_audit.py
```

The two historical upstream demo records validate and have **no aggregation
difference**. They are version `1.0.0rc12`, with distinct evaluator checksums;
the report keeps them in separate groups. They cannot establish representative
benchmark performance, current-package correctness, or a model-ranking effect.
Source revisions and licenses are in `verified_score_audit_demo/SOURCE.md`.

The separate conformance check requires the actual package, not stubbed imports:

```sh
uv run --no-project --with webarena-verified==1.2.3 python -m unittest discover \
  -s tests/experiments -p 'test_verified_score_audit*.py' -v
```

Also check the repository's normal pytest package collection mode, after its
development setup (including BrowserGym core and pytest-playwright):

```sh
python -m pytest tests/experiments/test_verified_score_audit.py \
  tests/experiments/test_verified_score_audit_contract.py -q
```

Both runners load the shared controls by their fixed sibling file path; no
working-directory import assumption or additional `PYTHONPATH` is required.

In this check, `TaskEvalResult.create` constructs pass/pass, pass/fail,
pass/error, and task-level error examples. The old aggregation returns `0.5`
for the two mixed cases while the authoritative task score is `0.0`.
These are synthetic contract controls, not observed benchmark impact. A task
error constructed with `is_error=True` can legitimately contain no evaluator
results; its serialized JSON contains status/error message rather than that
constructor flag. The auditor retains it with zero score in the denominator.

## Pin inputs before auditing

Provide one explicit manifest with schema `1` and a nonempty `records` list:

```json
{
  "schema": 1,
  "records": [
    {
      "run_id": "one-config-seed-attempt",
      "path": "result.json",
      "sha256": "SHA256_OF_RESULT_BYTES",
      "expected": {
        "task_id": 44,
        "intent_template_id": 1,
        "task_revision": 2,
        "sites": ["shopping"],
        "webarena_verified_version": "1.2.3",
        "webarena_verified_evaluator_checksum": "PINNED_EVALUATOR_CHECKSUM",
        "webarena_verified_data_checksum": "PINNED_DATA_CHECKSUM",
        "evaluator_names": ["AgentResponseEvaluator", "NetworkEventEvaluator"]
      }
    }
  ]
}
```

Replace placeholders with independently verified values from the producing
package, dataset/task revision and complete expected evaluator inventory.
Copying metadata from an untrusted result into its own manifest does not
authenticate that result or establish that its evaluator list is complete.
Use a distinct run ID for each configuration, seed, and attempt. The utility
rejects duplicate run/task/revision identities. Paths must resolve within the
manifest directory. JSON files are bounded at 1MiB and 32 levels of nesting;
the manifest is bounded at 10,000 records and its own 1MiB limit.

Supported package versions are `1.2.3` and the pinned historical `1.0.0rc12`
demo format. Other versions require explicit conformance before admission.
Supported result shapes are individual `TaskEvalResult` JSON objects, not
batch summaries, text logs, traces, or arbitrary future schema versions.
Required fields, exact task identity, checksums, evaluator inventory,
assertion status, evaluator score and task score are checked. Statuses supported
by this pinned contract are success/failure/error with binary scores;
partial-match records are rejected rather than guessed. Explicit task-level
errors may have an empty inventory. Nonempty inventories must be complete.
Duplicate JSON keys, NaN/Infinity, nonfinite numeric overflow, inconsistent
summaries, truncated results, and unknown fields are rejected.

## Read the report

The CLI exits `0` only when every manifest entry validates. It exits `2` for
an invalid manifest or any invalid record. `input_records`, `valid_records`
and `invalid_records` reconcile; task-level errors remain valid scored records,
with a separate error count. Aggregates group by run ID, package version, evaluator
checksum and dataset checksum. **Any invalid row suppresses every mean** so a
partial dataset cannot quietly produce an inflated headline. Validated rows
and changed-row counts remain available for diagnosis, with coverage explicit.
The tool does not infer absent episodes, compute confidence intervals, pool
different task populations, or establish a cross-model comparison.

## Research and runtime limits

Real-package result-object conformance is distinct from integration with the
BrowserGym wrapper, replaying stored network traces, and testing live sites.
The offline tool cannot detect an evaluator that changed the agent's page or
counterfactually reconstruct what an agent would do without that interference.
Those questions require newly collected paired episodes on controlled sites.
One known aggregation issue plus two demos is not evidence for a new paper.

No browser instance or inference budget is needed for this tool. Run dependency
installation and heavier checks through your existing managed test runner.
Do not download the approximately 207GB BrowserGym paper trace archive merely
to try this utility; compatibility with these Verified result shapes has not
been established.
