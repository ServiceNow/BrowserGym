"""
Unit tests for the BrowserGym Experiment Callback System.

Exercises:
  - AbstractCallback no-op default implementations
  - CallbackList fan-out dispatch (including fail-safe error isolation)
  - ConsoleProgressCallback rendering logic (without a real experiment)
  - BudgetLimitCallback threshold enforcement
  - BudgetLimitCallback warn-at-percent behaviour
  - ExpArgs.callbacks field is accepted (backward-compatible default)
"""

from __future__ import annotations

import logging
import sys
from io import StringIO
from unittest.mock import MagicMock, patch

import pytest

from browsergym.experiments.callbacks import (
    AbstractCallback,
    BudgetExceededError,
    BudgetLimitCallback,
    CallbackList,
    ConsoleProgressCallback,
)


# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────


def _make_step_info(step: int = 0, tokens: int = 0, reward: float = 0.0, terminated: bool = False):
    """Return a minimal StepInfo-like mock populated with the fields that
    callbacks actually read."""
    si = MagicMock()
    si.step = step
    si.reward = reward
    si.terminated = terminated
    si.truncated = False
    si.is_done = terminated
    si.stats = {"n_token_agent_messages": tokens}
    si.agent_info = {}
    return si


def _make_exp_args(agent_name="TestAgent", task_name="miniwob.click-test", max_steps=10):
    ea = MagicMock()
    ea.agent_args.agent_name = agent_name
    ea.env_args.task_name = task_name
    ea.env_args.max_steps = max_steps
    ea.exp_dir = "/tmp/test_exp"
    return ea


# ─────────────────────────────────────────────────────────────────────────────
# AbstractCallback — default no-ops should never raise
# ─────────────────────────────────────────────────────────────────────────────


class TestAbstractCallbackDefaults:
    """All default hook methods are no-ops; instantiating a concrete subclass
    that overrides nothing should work fine."""

    def test_all_hooks_noop(self):
        class MyCallback(AbstractCallback):
            pass

        cb = MyCallback()
        exp_args = _make_exp_args()
        step_info = _make_step_info()

        cb.on_exp_start(exp_args)
        cb.on_step_start(0)
        cb.on_action_selected(0, "click(#btn)", {})
        cb.on_step_end(step_info, is_done=False)
        cb.on_exp_end("/tmp/exp", err_msg=None)


# ─────────────────────────────────────────────────────────────────────────────
# CallbackList — fan-out and fail-safe isolation
# ─────────────────────────────────────────────────────────────────────────────


class TestCallbackList:
    def test_fanout_calls_all_callbacks(self):
        calls = []

        class Recorder(AbstractCallback):
            def __init__(self, name):
                self.name = name

            def on_exp_start(self, exp_args):
                calls.append(("on_exp_start", self.name))

            def on_step_start(self, step):
                calls.append(("on_step_start", self.name, step))

            def on_step_end(self, step_info, is_done):
                calls.append(("on_step_end", self.name))

            def on_exp_end(self, exp_dir, err_msg=None):
                calls.append(("on_exp_end", self.name))

        cbl = CallbackList([Recorder("A"), Recorder("B")])
        ea = _make_exp_args()
        si = _make_step_info()

        cbl.on_exp_start(ea)
        cbl.on_step_start(0)
        cbl.on_step_end(si, is_done=False)
        cbl.on_exp_end("/tmp/exp")

        assert calls.count(("on_exp_start", "A")) == 1
        assert calls.count(("on_exp_start", "B")) == 1
        assert calls.count(("on_step_start", "A", 0)) == 1
        assert calls.count(("on_step_start", "B", 0)) == 1
        assert calls.count(("on_step_end", "A")) == 1
        assert calls.count(("on_step_end", "B")) == 1
        assert calls.count(("on_exp_end", "A")) == 1
        assert calls.count(("on_exp_end", "B")) == 1

    def test_exception_in_one_callback_does_not_abort_others(self, caplog):
        """A crashing callback must not prevent subsequent callbacks from
        receiving the event."""
        received = []

        class Crasher(AbstractCallback):
            def on_step_start(self, step):
                raise RuntimeError("intentional crash")

        class Survivor(AbstractCallback):
            def on_step_start(self, step):
                received.append(step)

        cbl = CallbackList([Crasher(), Survivor()])
        with caplog.at_level(logging.WARNING, logger="browsergym.experiments.callbacks"):
            cbl.on_step_start(42)

        assert 42 in received, "Survivor callback must still receive the event"
        assert any("intentional crash" in rec.message for rec in caplog.records)

    def test_empty_callback_list_is_noop(self):
        """Empty list must not raise."""
        cbl = CallbackList([])
        cbl.on_exp_start(_make_exp_args())
        cbl.on_step_start(0)
        cbl.on_action_selected(0, "click()", {})
        cbl.on_step_end(_make_step_info(), is_done=False)
        cbl.on_exp_end("/tmp")

    def test_on_action_selected_passes_action_and_agent_info(self):
        received = []

        class ActionSpy(AbstractCallback):
            def on_action_selected(self, step, action, agent_info):
                received.append((step, action, agent_info))

        cbl = CallbackList([ActionSpy()])
        cbl.on_action_selected(3, "type(#q, 'hello')", {"model": "gpt-4o"})
        assert received == [(3, "type(#q, 'hello')", {"model": "gpt-4o"})]


# ─────────────────────────────────────────────────────────────────────────────
# ConsoleProgressCallback
# ─────────────────────────────────────────────────────────────────────────────


class TestConsoleProgressCallback:
    def _capture(self):
        """Return a StringIO that can be injected as sys.stderr."""
        return StringIO()

    def test_on_exp_start_prints_header(self):
        cb = ConsoleProgressCallback()
        buf = StringIO()
        with patch("sys.stderr", buf):
            cb.on_exp_start(_make_exp_args(agent_name="GPT4o", task_name="webarena.1"))
        output = buf.getvalue()
        assert "GPT4o" in output
        assert "webarena.1" in output

    def test_on_step_end_accumulates_reward(self):
        cb = ConsoleProgressCallback()
        buf = StringIO()
        with patch("sys.stderr", buf):
            cb.on_exp_start(_make_exp_args())
            cb.on_step_start(0)
            cb.on_step_end(_make_step_info(step=0, tokens=100, reward=0.5), is_done=False)
            cb.on_step_start(1)
            cb.on_step_end(_make_step_info(step=1, tokens=200, reward=0.5), is_done=False)
        output = buf.getvalue()
        # Cumulative reward after 2 steps should show +1.00
        assert "+1.00" in output

    def test_on_exp_end_prints_summary_no_error(self):
        cb = ConsoleProgressCallback()
        buf = StringIO()
        with patch("sys.stderr", buf):
            cb.on_exp_start(_make_exp_args())
            cb.on_exp_end("/tmp/my_exp", err_msg=None)
        output = buf.getvalue()
        assert "DONE" in output
        assert "/tmp/my_exp" in output
        assert "Error" not in output  # no error should appear

    def test_on_exp_end_prints_error_message(self):
        cb = ConsoleProgressCallback()
        buf = StringIO()
        with patch("sys.stderr", buf):
            cb.on_exp_start(_make_exp_args())
            cb.on_exp_end("/tmp/fail_exp", err_msg="Something went wrong")
        output = buf.getvalue()
        assert "ERROR" in output
        assert "Something went wrong" in output

    def test_action_preview_disabled_by_default(self):
        cb = ConsoleProgressCallback(show_action_preview=False)
        buf = StringIO()
        with patch("sys.stderr", buf):
            cb.on_exp_start(_make_exp_args())
            cb.on_action_selected(0, "click('#very-long-selector')", {})
        output = buf.getvalue()
        # Preview must NOT appear when disabled
        assert "click(" not in output

    def test_action_preview_enabled(self):
        cb = ConsoleProgressCallback(show_action_preview=True, action_preview_chars=40)
        buf = StringIO()
        with patch("sys.stderr", buf):
            cb.on_exp_start(_make_exp_args())
            cb.on_action_selected(0, "click('#submit-button')", {})
        output = buf.getvalue()
        assert "click(" in output

    def test_action_preview_truncated(self):
        cb = ConsoleProgressCallback(show_action_preview=True, action_preview_chars=10)
        buf = StringIO()
        with patch("sys.stderr", buf):
            cb.on_exp_start(_make_exp_args())
            cb.on_action_selected(0, "click_and_type('#input', 'hello world')", {})
        output = buf.getvalue()
        # Should be truncated with ellipsis
        assert "…" in output

    def test_token_accumulation(self):
        cb = ConsoleProgressCallback()
        buf = StringIO()
        with patch("sys.stderr", buf):
            cb.on_exp_start(_make_exp_args())
            for i in range(3):
                cb.on_step_start(i)
                cb.on_step_end(_make_step_info(step=i, tokens=1000), is_done=False)
        output = buf.getvalue()
        # 3 steps × 1000 tokens = 3,000 — should appear formatted
        assert "3,000" in output


# ─────────────────────────────────────────────────────────────────────────────
# BudgetLimitCallback
# ─────────────────────────────────────────────────────────────────────────────


class TestBudgetLimitCallback:
    def test_raises_budget_exceeded_error_when_over_limit(self):
        cb = BudgetLimitCallback(max_tokens=500)
        cb.on_exp_start(_make_exp_args())

        with pytest.raises(BudgetExceededError):
            # 3 steps × 200 tokens = 600 > 500 → should raise on step 3
            for i in range(3):
                cb.on_step_end(_make_step_info(step=i, tokens=200), is_done=False)

    def test_does_not_raise_when_under_limit(self):
        cb = BudgetLimitCallback(max_tokens=1000)
        cb.on_exp_start(_make_exp_args())
        # 3 steps × 200 tokens = 600 < 1000
        for i in range(3):
            cb.on_step_end(_make_step_info(step=i, tokens=200), is_done=False)

    def test_does_not_raise_on_final_done_step_even_if_over(self):
        """When is_done=True, the episode is already ending — budget check is skipped."""
        cb = BudgetLimitCallback(max_tokens=10)
        cb.on_exp_start(_make_exp_args())
        # This would normally trigger the budget, but is_done=True skips the check.
        cb.on_step_end(_make_step_info(step=0, tokens=999, terminated=True), is_done=True)

    def test_warning_emitted_near_threshold(self, caplog):
        cb = BudgetLimitCallback(max_tokens=1000, warn_at_pct=0.8)
        cb.on_exp_start(_make_exp_args())
        with caplog.at_level(logging.WARNING, logger="browsergym.experiments.callbacks"):
            cb.on_step_end(_make_step_info(step=0, tokens=850), is_done=False)  # 85% → warn
        assert any("80%" in r.message or "reached" in r.message for r in caplog.records)

    def test_warning_emitted_only_once(self, caplog):
        cb = BudgetLimitCallback(max_tokens=1000, warn_at_pct=0.8)
        cb.on_exp_start(_make_exp_args())
        with caplog.at_level(logging.WARNING, logger="browsergym.experiments.callbacks"):
            cb.on_step_end(_make_step_info(step=0, tokens=850), is_done=False)
            cb.on_step_end(_make_step_info(step=1, tokens=10), is_done=False)
        warning_msgs = [r for r in caplog.records if "reached" in r.message or "80%" in r.message]
        assert len(warning_msgs) == 1

    def test_reset_on_exp_start(self):
        """Calling on_exp_start again resets the token counter so the same
        callback instance can be safely reused across sequential experiments."""
        cb = BudgetLimitCallback(max_tokens=500)
        cb.on_exp_start(_make_exp_args())
        # First episode: use up 450 tokens
        cb.on_step_end(_make_step_info(tokens=450), is_done=False)
        # Start a new experiment — counter must reset
        cb.on_exp_start(_make_exp_args())
        # Only 100 tokens in new episode — should be fine
        cb.on_step_end(_make_step_info(tokens=100), is_done=False)

    def test_invalid_max_tokens_raises(self):
        with pytest.raises(ValueError, match="max_tokens"):
            BudgetLimitCallback(max_tokens=0)

    def test_invalid_warn_at_pct_raises(self):
        with pytest.raises(ValueError, match="warn_at_pct"):
            BudgetLimitCallback(max_tokens=1000, warn_at_pct=1.5)

    def test_error_message_contains_token_counts(self):
        cb = BudgetLimitCallback(max_tokens=100)
        cb.on_exp_start(_make_exp_args())
        with pytest.raises(BudgetExceededError, match="200") as exc_info:
            cb.on_step_end(_make_step_info(tokens=200), is_done=False)
        assert "100" in str(exc_info.value)


# ─────────────────────────────────────────────────────────────────────────────
# Integration: ExpArgs.callbacks field is accepted
# ─────────────────────────────────────────────────────────────────────────────


class TestExpArgsCallbacksField:
    def test_callbacks_field_default_is_empty_list(self):
        """When no callbacks are specified, the field defaults to []."""
        from dataclasses import fields

        from browsergym.experiments.loop import ExpArgs

        callbacks_field = next(f for f in fields(ExpArgs) if f.name == "callbacks")
        assert callbacks_field is not None
        # Verify default_factory produces an empty list
        assert callbacks_field.default_factory() == []

    def test_callbacks_field_accepts_callback_list(self):
        """ExpArgs can be constructed with a list of AbstractCallback instances."""
        from unittest.mock import MagicMock

        from browsergym.experiments.loop import ExpArgs

        mock_agent_args = MagicMock()
        mock_env_args = MagicMock()
        mock_env_args.task_name = "miniwob.click-test"

        cb = ConsoleProgressCallback()
        exp = ExpArgs(
            agent_args=mock_agent_args,
            env_args=mock_env_args,
            callbacks=[cb],
        )
        assert len(exp.callbacks) == 1
        assert isinstance(exp.callbacks[0], ConsoleProgressCallback)
