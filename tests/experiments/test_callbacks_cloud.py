"""
Unit tests for the Cloud & Web UI Bridge callbacks:
  - WandbCallback (mocked wandb)
  - MLflowCallback (mocked mlflow)
  - JsonlStreamCallback (real in-memory stream)
"""

from __future__ import annotations

import io
import json
import sys
from unittest.mock import MagicMock, patch, call

import pytest

from browsergym.experiments.callbacks import (
    JsonlStreamCallback,
    MLflowCallback,
    WandbCallback,
)


# ─────────────────────────────────────────────────────────────────────────────
# Shared helpers
# ─────────────────────────────────────────────────────────────────────────────


def _make_exp_args(agent_name="TestAgent", task_name="miniwob.click-test", max_steps=10):
    ea = MagicMock()
    ea.agent_args.agent_name = agent_name
    ea.env_args.task_name = task_name
    ea.env_args.max_steps = max_steps
    ea.env_args.task_seed = 42
    ea.exp_id = "exp-uuid-1234"
    ea.exp_dir = "/tmp/test_exp"
    return ea


def _make_step_info(step=0, tokens=500, reward=0.5, terminated=False):
    si = MagicMock()
    si.step = step
    si.reward = reward
    si.terminated = terminated
    si.truncated = False
    si.is_done = terminated
    si.action = f"click('#btn-{step}')"
    si.agent_info = {"model": "gpt-4o", "cost": 0.003}
    si.obs = {"goal": "Click the button", "url": "http://localhost/task"}
    si.stats = {
        "n_token_agent_messages": tokens,
        "step_elapsed": 1.8,
        "agent_elapsed": 1.5,
        "n_token_dom": 3000,
    }
    return si


# ─────────────────────────────────────────────────────────────────────────────
# WandbCallback tests
# ─────────────────────────────────────────────────────────────────────────────


class TestWandbCallback:
    """All tests mock the 'wandb' module so wandb need not be installed."""

    @pytest.fixture(autouse=True)
    def mock_wandb(self):
        """Inject a mock wandb module for the duration of each test."""
        mock_run = MagicMock()
        mock_run.url = "https://wandb.ai/test/run/abc123"
        mock_run.summary = {}

        mock_wandb_mod = MagicMock()
        mock_wandb_mod.init.return_value = mock_run

        with patch.dict(sys.modules, {"wandb": mock_wandb_mod}):
            yield mock_wandb_mod, mock_run

    def test_import_error_when_wandb_missing(self):
        """Should raise ImportError with installation hint if wandb is absent."""
        with patch.dict(sys.modules, {"wandb": None}):
            with pytest.raises(ImportError, match="pip install wandb"):
                WandbCallback()

    def test_wandb_init_called_on_exp_start(self, mock_wandb):
        wandb_mod, mock_run = mock_wandb
        cb = WandbCallback(project="test-proj", entity="test-entity", tags=["ci"])
        cb.on_exp_start(_make_exp_args())

        wandb_mod.init.assert_called_once()
        call_kwargs = wandb_mod.init.call_args.kwargs
        assert call_kwargs["project"] == "test-proj"
        assert call_kwargs["entity"] == "test-entity"
        assert "ci" in call_kwargs["tags"]

    def test_run_name_auto_generated(self, mock_wandb):
        wandb_mod, _ = mock_wandb
        cb = WandbCallback()
        cb.on_exp_start(_make_exp_args(agent_name="MyAgent", task_name="webarena.42"))

        name_arg = wandb_mod.init.call_args.kwargs["name"]
        assert "MyAgent" in name_arg
        assert "webarena.42" in name_arg

    def test_run_name_manual_override(self, mock_wandb):
        wandb_mod, _ = mock_wandb
        cb = WandbCallback(name="custom-run-name")
        cb.on_exp_start(_make_exp_args())

        assert wandb_mod.init.call_args.kwargs["name"] == "custom-run-name"

    def test_config_contains_task_metadata(self, mock_wandb):
        wandb_mod, _ = mock_wandb
        cb = WandbCallback()
        cb.on_exp_start(_make_exp_args(task_name="webarena.88"))

        config = wandb_mod.init.call_args.kwargs["config"]
        assert config["task_name"] == "webarena.88"
        assert config["max_steps"] == 10

    def test_log_called_on_step_end(self, mock_wandb):
        wandb_mod, mock_run = mock_wandb
        cb = WandbCallback()
        cb.on_exp_start(_make_exp_args())
        cb.on_step_start(0)
        cb.on_step_end(_make_step_info(step=0, tokens=500, reward=1.0), is_done=False)

        wandb_mod.log.assert_called_once()
        logged = wandb_mod.log.call_args.args[0]
        assert "step/reward" in logged
        assert "episode/cumulative_reward" in logged
        assert "step/tokens" in logged

    def test_log_not_called_when_disabled(self, mock_wandb):
        wandb_mod, _ = mock_wandb
        cb = WandbCallback(log_step_metrics=False)
        cb.on_exp_start(_make_exp_args())
        cb.on_step_start(0)
        cb.on_step_end(_make_step_info(), is_done=False)

        wandb_mod.log.assert_not_called()

    def test_cumulative_reward_accumulates(self, mock_wandb):
        wandb_mod, _ = mock_wandb
        cb = WandbCallback()
        cb.on_exp_start(_make_exp_args())

        for i in range(3):
            cb.on_step_start(i)
            cb.on_step_end(_make_step_info(step=i, reward=1.0), is_done=(i == 2))

        # Last log call should show cumulative reward = 3.0
        last_call_metrics = wandb_mod.log.call_args_list[-1].args[0]
        assert last_call_metrics["episode/cumulative_reward"] == pytest.approx(3.0)

    def test_run_finish_called_on_exp_end_success(self, mock_wandb):
        wandb_mod, mock_run = mock_wandb
        cb = WandbCallback()
        cb.on_exp_start(_make_exp_args())
        cb.on_exp_end("/tmp/exp", err_msg=None)

        mock_run.finish.assert_called_once_with(exit_code=0)

    def test_run_finish_called_on_exp_end_failure(self, mock_wandb):
        wandb_mod, mock_run = mock_wandb
        cb = WandbCallback()
        cb.on_exp_start(_make_exp_args())
        cb.on_exp_end("/tmp/exp", err_msg="Something exploded")

        mock_run.finish.assert_called_once_with(exit_code=1)
        assert "final/error" in mock_run.summary

    def test_run_reset_to_none_after_exp_end(self, mock_wandb):
        _, _ = mock_wandb
        cb = WandbCallback()
        cb.on_exp_start(_make_exp_args())
        cb.on_exp_end("/tmp/exp")
        assert cb._run is None

    def test_step_end_noop_before_exp_start(self, mock_wandb):
        """on_step_end before on_exp_start must not crash."""
        wandb_mod, _ = mock_wandb
        cb = WandbCallback()
        cb.on_step_end(_make_step_info(), is_done=False)
        wandb_mod.log.assert_not_called()


# ─────────────────────────────────────────────────────────────────────────────
# MLflowCallback tests
# ─────────────────────────────────────────────────────────────────────────────


class TestMLflowCallback:
    """All tests mock the 'mlflow' module so mlflow need not be installed."""

    @pytest.fixture(autouse=True)
    def mock_mlflow(self):
        mock_run = MagicMock()
        mock_run.info.run_id = "mlflow-run-id-xyz"

        mock_mlflow_mod = MagicMock()
        mock_mlflow_mod.start_run.return_value = mock_run

        with patch.dict(sys.modules, {"mlflow": mock_mlflow_mod}):
            yield mock_mlflow_mod, mock_run

    def test_import_error_when_mlflow_missing(self):
        with patch.dict(sys.modules, {"mlflow": None}):
            with pytest.raises(ImportError, match="pip install mlflow"):
                MLflowCallback()

    def test_experiment_set_on_start(self, mock_mlflow):
        mlflow_mod, _ = mock_mlflow
        cb = MLflowCallback(experiment_name="my-exp")
        cb.on_exp_start(_make_exp_args())

        mlflow_mod.set_experiment.assert_called_once_with("my-exp")

    def test_tracking_uri_set_when_provided(self, mock_mlflow):
        mlflow_mod, _ = mock_mlflow
        cb = MLflowCallback(tracking_uri="http://mlflow.mylab.com:5000")
        cb.on_exp_start(_make_exp_args())

        mlflow_mod.set_tracking_uri.assert_called_once_with("http://mlflow.mylab.com:5000")

    def test_tracking_uri_not_set_when_omitted(self, mock_mlflow):
        mlflow_mod, _ = mock_mlflow
        cb = MLflowCallback()
        cb.on_exp_start(_make_exp_args())

        mlflow_mod.set_tracking_uri.assert_not_called()

    def test_params_logged_on_exp_start(self, mock_mlflow):
        mlflow_mod, _ = mock_mlflow
        cb = MLflowCallback()
        cb.on_exp_start(_make_exp_args(task_name="webarena.99"))

        mlflow_mod.log_params.assert_called_once()
        params = mlflow_mod.log_params.call_args.args[0]
        assert params["task_name"] == "webarena.99"

    def test_metrics_logged_on_step_end(self, mock_mlflow):
        mlflow_mod, _ = mock_mlflow
        cb = MLflowCallback()
        cb.on_exp_start(_make_exp_args())
        cb.on_step_start(0)
        cb.on_step_end(_make_step_info(step=0, tokens=400, reward=0.5), is_done=False)

        mlflow_mod.log_metrics.assert_called()
        metrics = mlflow_mod.log_metrics.call_args_list[0].args[0]
        assert "step_reward" in metrics
        assert "step_tokens" in metrics
        assert "episode_reward" in metrics

    def test_metrics_not_logged_when_disabled(self, mock_mlflow):
        mlflow_mod, _ = mock_mlflow
        cb = MLflowCallback(log_step_metrics=False)
        cb.on_exp_start(_make_exp_args())
        cb.on_step_start(0)
        cb.on_step_end(_make_step_info(), is_done=False)

        # log_metrics only called at end, not during step
        mlflow_mod.log_metrics.assert_not_called()

    def test_run_ends_finished_on_success(self, mock_mlflow):
        mlflow_mod, _ = mock_mlflow
        cb = MLflowCallback()
        cb.on_exp_start(_make_exp_args())
        cb.on_exp_end("/tmp/exp", err_msg=None)

        mlflow_mod.end_run.assert_called_once_with(status="FINISHED")

    def test_run_ends_failed_on_error(self, mock_mlflow):
        mlflow_mod, _ = mock_mlflow
        cb = MLflowCallback()
        cb.on_exp_start(_make_exp_args())
        cb.on_exp_end("/tmp/exp", err_msg="BudgetExceededError")

        mlflow_mod.end_run.assert_called_once_with(status="FAILED")
        mlflow_mod.set_tag.assert_called_once()
        tag_key, tag_val = mlflow_mod.set_tag.call_args.args
        assert tag_key == "error"
        assert "BudgetExceeded" in tag_val

    def test_run_reset_after_exp_end(self, mock_mlflow):
        _, _ = mock_mlflow
        cb = MLflowCallback()
        cb.on_exp_start(_make_exp_args())
        cb.on_exp_end("/tmp/exp")
        assert cb._active_run is None

    def test_step_end_noop_before_exp_start(self, mock_mlflow):
        mlflow_mod, _ = mock_mlflow
        cb = MLflowCallback()
        cb.on_step_end(_make_step_info(), is_done=False)
        mlflow_mod.log_metrics.assert_not_called()


# ─────────────────────────────────────────────────────────────────────────────
# JsonlStreamCallback tests  (no mocking needed — pure stdlib)
# ─────────────────────────────────────────────────────────────────────────────


class TestJsonlStreamCallback:
    def _run_full_episode(self, cb, steps=3, task="miniwob.test"):
        ea = _make_exp_args(task_name=task)
        cb.on_exp_start(ea)
        for i in range(steps):
            cb.on_step_start(i)
            cb.on_action_selected(i, f"click('#el-{i}')", {"model": "gpt-4o"})
            cb.on_step_end(
                _make_step_info(step=i, terminated=(i == steps - 1)), is_done=(i == steps - 1)
            )
        cb.on_exp_end("/tmp/exp")

    def _parse_lines(self, buf: io.StringIO) -> list[dict]:
        buf.seek(0)
        return [json.loads(line) for line in buf if line.strip()]

    def test_all_event_types_emitted(self):
        buf = io.StringIO()
        cb = JsonlStreamCallback(stream=buf, flush=False)
        self._run_full_episode(cb, steps=2)

        events = self._parse_lines(buf)
        types = [e["event"] for e in events]

        assert "exp_start" in types
        assert "step_start" in types
        assert "action_selected" in types
        assert "step_end" in types
        assert "exp_end" in types

    def test_every_event_has_ts_field(self):
        buf = io.StringIO()
        cb = JsonlStreamCallback(stream=buf, flush=False)
        self._run_full_episode(cb, steps=1)

        for event in self._parse_lines(buf):
            assert "ts" in event, f"Missing 'ts' in event: {event}"
            assert isinstance(event["ts"], float)

    def test_exp_start_contains_metadata(self):
        buf = io.StringIO()
        cb = JsonlStreamCallback(stream=buf, flush=False)
        cb.on_exp_start(_make_exp_args(agent_name="Claude", task_name="webarena.5"))

        events = self._parse_lines(buf)
        exp_start = next(e for e in events if e["event"] == "exp_start")
        assert exp_start["agent_name"] == "Claude"
        assert exp_start["task_name"] == "webarena.5"

    def test_action_selected_contains_action(self):
        buf = io.StringIO()
        cb = JsonlStreamCallback(stream=buf, flush=False)
        cb.on_exp_start(_make_exp_args())
        cb.on_action_selected(2, "scroll(0, 500)", {"model": "gpt-4o"})

        events = self._parse_lines(buf)
        action_ev = next(e for e in events if e["event"] == "action_selected")
        assert action_ev["action"] == "scroll(0, 500)"
        assert action_ev["step"] == 2

    def test_agent_info_only_scalars_included(self):
        """Non-scalar agent_info values (images, objects) must be stripped."""
        buf = io.StringIO()
        cb = JsonlStreamCallback(stream=buf, flush=False)
        cb.on_exp_start(_make_exp_args())
        cb.on_action_selected(
            0,
            "click()",
            {"model": "gpt-4o", "embedding": [0.1, 0.2, 0.3], "cost": 0.005},
        )

        events = self._parse_lines(buf)
        action_ev = next(e for e in events if e["event"] == "action_selected")
        assert "embedding" not in action_ev["agent_info"]
        assert action_ev["agent_info"]["cost"] == pytest.approx(0.005)

    def test_step_end_contains_reward_and_stats(self):
        buf = io.StringIO()
        cb = JsonlStreamCallback(stream=buf, flush=False)
        cb.on_exp_start(_make_exp_args())
        cb.on_step_end(_make_step_info(step=1, reward=0.75), is_done=False)

        events = self._parse_lines(buf)
        step_ev = next(e for e in events if e["event"] == "step_end")
        assert step_ev["reward"] == pytest.approx(0.75)
        assert "stats" in step_ev

    def test_exp_end_success_flag(self):
        buf = io.StringIO()
        cb = JsonlStreamCallback(stream=buf, flush=False)
        cb.on_exp_start(_make_exp_args())
        cb.on_exp_end("/tmp/exp", err_msg=None)

        events = self._parse_lines(buf)
        end_ev = next(e for e in events if e["event"] == "exp_end")
        assert end_ev["success"] is True
        assert end_ev["err_msg"] is None

    def test_exp_end_failure_flag(self):
        buf = io.StringIO()
        cb = JsonlStreamCallback(stream=buf, flush=False)
        cb.on_exp_start(_make_exp_args())
        cb.on_exp_end("/tmp/exp", err_msg="TimeoutError")

        events = self._parse_lines(buf)
        end_ev = next(e for e in events if e["event"] == "exp_end")
        assert end_ev["success"] is False
        assert "TimeoutError" in end_ev["err_msg"]

    def test_include_obs_keys_filters_obs(self):
        buf = io.StringIO()
        cb = JsonlStreamCallback(stream=buf, include_obs_keys=["goal", "url"], flush=False)
        cb.on_exp_start(_make_exp_args())

        si = _make_step_info(step=0)
        si.obs = {
            "goal": "Book a flight",
            "url": "http://localhost/",
            "screenshot": b"...binary...",
        }
        cb.on_step_end(si, is_done=False)

        events = self._parse_lines(buf)
        step_ev = next(e for e in events if e["event"] == "step_end")
        assert "obs" in step_ev
        assert "goal" in step_ev["obs"]
        assert "url" in step_ev["obs"]
        assert "screenshot" not in step_ev["obs"]

    def test_obs_excluded_when_include_obs_keys_empty(self):
        buf = io.StringIO()
        cb = JsonlStreamCallback(stream=buf, include_obs_keys=[], flush=False)
        cb.on_exp_start(_make_exp_args())
        cb.on_step_end(_make_step_info(step=0), is_done=False)

        events = self._parse_lines(buf)
        step_ev = next(e for e in events if e["event"] == "step_end")
        assert "obs" not in step_ev

    def test_output_is_valid_jsonl(self):
        """Every line in the output must be parseable as JSON."""
        buf = io.StringIO()
        cb = JsonlStreamCallback(stream=buf, flush=False)
        self._run_full_episode(cb, steps=4)

        buf.seek(0)
        for line in buf:
            if line.strip():
                json.loads(line)  # must not raise

    def test_step_count_matches_events(self):
        buf = io.StringIO()
        cb = JsonlStreamCallback(stream=buf, flush=False)
        self._run_full_episode(cb, steps=5)

        events = self._parse_lines(buf)
        step_starts = [e for e in events if e["event"] == "step_start"]
        assert len(step_starts) == 5

    def test_default_stream_is_stdout(self):
        """When no stream is provided the callback should default to stdout."""
        cb = JsonlStreamCallback()
        assert cb._stream is sys.stdout
