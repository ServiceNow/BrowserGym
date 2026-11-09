"""
BrowserGym Experiment Callback System
======================================

Provides a lightweight, extensible, and fully backward-compatible event hook system
for ``ExpArgs.run()``. Callbacks receive live lifecycle events from the experiment
loop without requiring any modifications to existing research scripts.

Usage example::

    from browsergym.experiments.callbacks import ConsoleProgressCallback, BudgetLimitCallback

    exp_args = ExpArgs(
        agent_args=...,
        env_args=...,
        callbacks=[
            ConsoleProgressCallback(),
            BudgetLimitCallback(max_tokens=50_000),
        ],
    )
    exp_args.run()

Callback lifecycle order per episode
--------------------------------------
::

    on_exp_start(exp_args)
        └─ [for each step]
               on_step_start(step)
               on_action_selected(step, action, agent_info)
               on_step_end(step_info, is_done)
    on_exp_end(exp_dir, err_msg)

"""

from __future__ import annotations

import logging
import time
from abc import ABC
from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    # Avoid circular imports at runtime; only used for type-hints.
    from browsergym.experiments.loop import ExpArgs, StepInfo

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────────────────────────────────
# Abstract base
# ─────────────────────────────────────────────────────────────────────────────


class AbstractCallback(ABC):
    """Base class for experiment lifecycle callbacks.

    All hook methods have a no-op default implementation so that subclasses only
    need to override the events they care about.  This makes it trivial to add
    new lifecycle hooks in the future without breaking existing callback
    implementations.
    """

    def on_exp_start(self, exp_args: "ExpArgs") -> None:
        """Called once, immediately before the agent and environment are created.

        Args:
            exp_args: The full ``ExpArgs`` instance, providing task name, max
                steps, agent name, experiment directory, etc.
        """

    def on_step_start(self, step: int) -> None:
        """Called at the beginning of every agent step (before the agent thinks).

        Args:
            step: Zero-based step index within the current episode.
        """

    def on_action_selected(self, step: int, action: Optional[str], agent_info: dict) -> None:
        """Called immediately after the agent returns an action.

        The environment has *not* yet executed the action.  This is the right
        moment to inspect the raw LLM output, token counts, or agent reasoning.

        Args:
            step: Zero-based step index.
            action: The raw action string returned by the agent, or ``None`` if
                the agent signalled end-of-episode.
            agent_info: The agent's auxiliary information dictionary (may contain
                ``chat_messages``, ``stats``, etc.).
        """

    def on_step_end(self, step_info: "StepInfo", is_done: bool) -> None:
        """Called after the environment has executed the action and ``step_info``
        is fully populated.

        This is the right moment to read reward, token stats, step latency, and
        decide whether to abort the episode.

        Args:
            step_info: The fully-populated ``StepInfo`` for the completed step.
            is_done: ``True`` if this step terminated or truncated the episode.
        """

    def on_exp_end(self, exp_dir, err_msg: Optional[str] = None) -> None:
        """Called once in the ``finally`` block after the episode finishes
        (whether normally, via truncation, or due to an error).

        Args:
            exp_dir: ``pathlib.Path`` pointing at the experiment output directory.
            err_msg: Non-``None`` if the episode ended due to an unhandled exception.
        """


class EpisodeAbortedError(RuntimeError):
    """Base exception raised by guardrail callbacks wishing to abort an episode.

    Unlike general monitoring exceptions which are swallowed by :class:`CallbackList`,
    exceptions inheriting from this class are re-raised so that ``ExpArgs.run()``
    safely halts the episode and saves summary info.
    """


class BudgetExceededError(EpisodeAbortedError):
    """Raised by :class:`BudgetLimitCallback` when the token budget is breached.

    Caught by ``ExpArgs.run()``'s generic ``except Exception`` handler, which
    records it as ``err_msg`` and proceeds to clean up gracefully.
    """


# ─────────────────────────────────────────────────────────────────────────────
# CallbackList — internal dispatcher
# ─────────────────────────────────────────────────────────────────────────────


class CallbackList:
    """Fan-out dispatcher that broadcasts every lifecycle event to a list of
    :class:`AbstractCallback` instances in registration order.

    **Fail-safe**: exceptions raised inside any individual monitoring callback
    are caught, logged as a warning, and execution continues.  A misbehaving
    monitoring callback will never crash or corrupt a running benchmark.
    Guardrail exceptions (:class:`EpisodeAbortedError`) are propagated so that
    budget limits and abort conditions take effect immediately.
    """

    def __init__(self, callbacks: list[AbstractCallback]) -> None:
        self._callbacks: list[AbstractCallback] = list(callbacks)

    # ------------------------------------------------------------------
    # Internal helper
    # ------------------------------------------------------------------

    def _fire(self, method_name: str, *args, **kwargs) -> None:
        """Call ``method_name`` on every registered callback, swallowing errors."""
        for cb in self._callbacks:
            try:
                getattr(cb, method_name)(*args, **kwargs)
            except EpisodeAbortedError:
                raise
            except Exception as exc:  # noqa: BLE001
                logger.warning(
                    "Callback %s.%s raised an exception (ignored): %s",
                    type(cb).__name__,
                    method_name,
                    exc,
                    exc_info=True,
                )

    # ------------------------------------------------------------------
    # Public broadcast methods (mirror AbstractCallback's interface)
    # ------------------------------------------------------------------

    def on_exp_start(self, exp_args: "ExpArgs") -> None:
        self._fire("on_exp_start", exp_args)

    def on_step_start(self, step: int) -> None:
        self._fire("on_step_start", step)

    def on_action_selected(self, step: int, action: Optional[str], agent_info: dict) -> None:
        self._fire("on_action_selected", step, action, agent_info)

    def on_step_end(self, step_info: "StepInfo", is_done: bool) -> None:
        self._fire("on_step_end", step_info, is_done)

    def on_exp_end(self, exp_dir, err_msg: Optional[str] = None) -> None:
        self._fire("on_exp_end", exp_dir, err_msg)


# ─────────────────────────────────────────────────────────────────────────────
# Built-in callback: ConsoleProgressCallback
# ─────────────────────────────────────────────────────────────────────────────


class ConsoleProgressCallback(AbstractCallback):
    """Renders a clean, single-line progress display in the terminal.

    Instead of scrolling through raw debug logs, researchers see a compact,
    human-readable line that is rewritten in place after every step::

        [MyAgent @ webarena.241]  step 4/30 | reward 0.00 | tokens  1,842 | step  2.3s | elapsed  9.4s

    Features
    --------
    * **Single-line rewrite**: Uses ``\\r`` so the line is updated in-place.
      Falls back to plain newlines when the output stream is not a TTY (e.g.
      redirected to a file or CI log).
    * **Zero dependencies**: Uses only Python's ``time`` and ``sys`` stdlib.
    * **Graceful finish**: Prints a summary line when the episode ends.

    Args:
        show_action_preview: When ``True``, prints a short preview (first
            ``action_preview_chars`` characters) of the selected action on its
            own line.  Defaults to ``False`` to keep output compact.
        action_preview_chars: Maximum number of characters to show in the action
            preview.  Defaults to 120.
    """

    def __init__(
        self,
        show_action_preview: bool = False,
        action_preview_chars: int = 120,
    ) -> None:
        self._show_action_preview = show_action_preview
        self._action_preview_chars = action_preview_chars

        # Internal state reset per episode.
        self._exp_start_time: float = 0.0
        self._step_start_time: float = 0.0
        self._agent_name: str = "agent"
        self._task_name: str = "task"
        self._max_steps: int = 0
        self._cumulative_tokens: int = 0
        self._cumulative_reward: float = 0.0
        self._is_tty: bool = False

    # ------------------------------------------------------------------
    # Lifecycle hooks
    # ------------------------------------------------------------------

    def on_exp_start(self, exp_args: "ExpArgs") -> None:
        import sys

        self._exp_start_time = time.monotonic()
        self._agent_name = getattr(exp_args.agent_args, "agent_name", "agent") or "agent"
        self._task_name = exp_args.env_args.task_name
        self._max_steps = exp_args.env_args.max_steps or 0
        self._cumulative_tokens = 0
        self._cumulative_reward = 0.0
        self._is_tty = hasattr(sys.stderr, "isatty") and sys.stderr.isatty()

        self._print(
            f"\n{'─' * 70}\n"
            f"  🚀  Starting: [{self._agent_name}] on [{self._task_name}]\n"
            f"{'─' * 70}",
            end="\n",
        )

    def on_step_start(self, step: int) -> None:
        self._step_start_time = time.monotonic()

    def on_action_selected(self, step: int, action: Optional[str], agent_info: dict) -> None:
        if self._show_action_preview and action:
            preview = action.replace("\n", " ")[: self._action_preview_chars]
            if len(action) > self._action_preview_chars:
                preview += "…"
            self._print(f"  ↳ action: {preview}", end="\n")

    def on_step_end(self, step_info: "StepInfo", is_done: bool) -> None:
        step = step_info.step
        reward = step_info.reward or 0.0
        self._cumulative_reward += reward

        # Accumulate tokens from step stats (populated by StepInfo.make_stats())
        step_tokens = 0
        if step_info.stats:
            step_tokens = step_info.stats.get("n_token_agent_messages", 0) or 0
        self._cumulative_tokens += step_tokens

        # Timing
        step_elapsed = time.monotonic() - self._step_start_time
        total_elapsed = time.monotonic() - self._exp_start_time

        # Step progress display
        max_steps_str = f"/{self._max_steps}" if self._max_steps else ""
        status_icon = "✓" if is_done and (step_info.terminated) else ("⏹" if is_done else "→")

        line = (
            f"  {status_icon}  step {step + 1:>3}{max_steps_str:<4}"
            f" | reward {self._cumulative_reward:>+6.2f}"
            f" | tokens {self._cumulative_tokens:>7,}"
            f" | step {step_elapsed:>5.1f}s"
            f" | elapsed {total_elapsed:>6.1f}s"
        )

        # Rewrite in-place when running in a real terminal; append newline in CI.
        end = "\n" if (is_done or not self._is_tty) else "\r"
        self._print(line, end=end)

    def on_exp_end(self, exp_dir, err_msg: Optional[str] = None) -> None:
        total_elapsed = time.monotonic() - self._exp_start_time
        status = "❌  ERROR" if err_msg else "✅  DONE"
        self._print(
            f"\n{'─' * 70}\n"
            f"  {status}  [{self._agent_name}] on [{self._task_name}]\n"
            f"  Total reward : {self._cumulative_reward:+.4f}\n"
            f"  Total tokens : {self._cumulative_tokens:,}\n"
            f"  Wall time    : {total_elapsed:.1f}s\n"
            f"  Output dir   : {exp_dir}\n"
            + (f"  Error        : {err_msg}\n" if err_msg else "")
            + f"{'─' * 70}\n",
            end="\n",
        )

    # ------------------------------------------------------------------
    # Internal print helper
    # ------------------------------------------------------------------

    def _print(self, msg: str, end: str = "\n") -> None:
        """Write to stderr so progress lines don't pollute captured stdout."""
        import sys

        try:
            print(msg, end=end, file=sys.stderr, flush=True)
        except UnicodeEncodeError:
            # Fallback for Windows consoles using non-UTF8 charmaps (e.g. cp1252)
            safe_text = (msg + end).encode(
                getattr(sys.stderr, "encoding", "ascii") or "ascii",
                errors="replace",
            )
            if hasattr(sys.stderr, "buffer"):
                sys.stderr.buffer.write(safe_text)
                sys.stderr.buffer.flush()
            else:
                print(
                    msg.encode("ascii", "replace").decode("ascii"),
                    end=end,
                    file=sys.stderr,
                    flush=True,
                )


# ─────────────────────────────────────────────────────────────────────────────
# Built-in callback: BudgetLimitCallback
# ─────────────────────────────────────────────────────────────────────────────


class BudgetLimitCallback(AbstractCallback):
    """Safety guardrail that stops a runaway episode when cumulative token
    consumption exceeds a configured ceiling.

    When the budget is breached the callback raises :class:`BudgetExceededError`
    inside ``on_step_end``.  ``ExpArgs.run()``'s top-level ``except`` block
    catches this, records it in ``err_msg``, and proceeds to the ``finally``
    clean-up — so experiments, logs, and screenshots are still saved correctly.

    Args:
        max_tokens: Maximum number of *agent-message* tokens allowed across the
            full episode.  The count is sourced from
            ``step_info.stats["n_token_agent_messages"]`` (the same field that
            the existing ``StepInfo.make_stats()`` already populates).
        warn_at_pct: Emit a warning log when cumulative usage crosses this
            fraction of the budget (0–1).  Defaults to ``0.8`` (80 %).
    """

    def __init__(self, max_tokens: int, warn_at_pct: float = 0.8) -> None:
        if max_tokens <= 0:
            raise ValueError(f"max_tokens must be a positive integer, got {max_tokens}.")
        if not (0.0 < warn_at_pct < 1.0):
            raise ValueError(f"warn_at_pct must be in (0, 1), got {warn_at_pct}.")

        self._max_tokens = max_tokens
        self._warn_threshold = int(max_tokens * warn_at_pct)
        self._cumulative_tokens: int = 0
        self._warned: bool = False

    def on_exp_start(self, exp_args: "ExpArgs") -> None:
        # Reset per episode so the same callback instance can be reused across
        # multiple sequential experiments in a batch.
        self._cumulative_tokens = 0
        self._warned = False

    def on_step_end(self, step_info: "StepInfo", is_done: bool) -> None:
        if is_done:
            return  # episode already ending; no need to enforce budget.

        step_tokens: int = 0
        if step_info.stats:
            step_tokens = step_info.stats.get("n_token_agent_messages", 0) or 0
        self._cumulative_tokens += step_tokens

        # Warn once when approaching the limit.
        if not self._warned and self._cumulative_tokens >= self._warn_threshold:
            logger.warning(
                "BudgetLimitCallback: token usage %s has reached %d%% of budget %s.",
                f"{self._cumulative_tokens:,}",
                int(self._warn_threshold / self._max_tokens * 100),
                f"{self._max_tokens:,}",
            )
            self._warned = True

        # Hard stop when budget is exceeded.
        if self._cumulative_tokens > self._max_tokens:
            raise BudgetExceededError(
                f"Token budget exceeded: {self._cumulative_tokens:,} > {self._max_tokens:,}. "
                "Episode aborted by BudgetLimitCallback."
            )


# ─────────────────────────────────────────────────────────────────────────────
# Built-in callback: WandbCallback
# ─────────────────────────────────────────────────────────────────────────────


class WandbCallback(AbstractCallback):
    """Streams live BrowserGym experiment events to **Weights & Biases**.

    Each step emits a ``wandb.log()`` call with step metrics (reward, tokens,
    latency).  Experiment metadata is stored as W&B *config* at start time, and
    a run summary is written at the end.

    **Optional dependency** — ``wandb`` is NOT a hard requirement of
    BrowserGym.  If it is not installed, constructing this callback raises an
    :class:`ImportError` with a clear installation hint rather than failing
    silently at runtime.

    Typical usage::

        from browsergym.experiments.callbacks import WandbCallback

        exp_args = ExpArgs(
            agent_args=...,
            env_args=...,
            callbacks=[
                WandbCallback(
                    project="browsergym-evals",
                    entity="my-lab",             # optional W&B team name
                    tags=["gpt-4o", "webarena"],
                ),
            ],
        )

    Args:
        project: W&B project name.  Defaults to ``"browsergym"``.
        entity: W&B entity (username or team).  ``None`` uses the default
            entity configured in your W&B account.
        name: Human-readable run name.  When ``None``, auto-generated from
            ``<agent>_on_<task>`` at experiment start.
        tags: List of string tags attached to the run.
        group: W&B run group (useful for grouping benchmark sweeps).
        notes: Free-text notes stored on the W&B run.
        log_step_metrics: When ``True`` (default), calls ``wandb.log()`` with
            per-step metrics after every step.
        reinit: Passed directly to ``wandb.init(reinit=...)``.  Set to
            ``True`` if running multiple experiments sequentially in the same
            process.
    """

    def __init__(
        self,
        project: str = "browsergym",
        entity: Optional[str] = None,
        name: Optional[str] = None,
        tags: Optional[list[str]] = None,
        group: Optional[str] = None,
        notes: Optional[str] = None,
        log_step_metrics: bool = True,
        reinit: bool = True,
    ) -> None:
        try:
            import wandb  # noqa: F401
        except ImportError as exc:
            raise ImportError(
                "WandbCallback requires the 'wandb' package. " "Install it with: pip install wandb"
            ) from exc

        self._project = project
        self._entity = entity
        self._name = name
        self._tags = tags or []
        self._group = group
        self._notes = notes
        self._log_step_metrics = log_step_metrics
        self._reinit = reinit

        self._run = None
        self._step_start_time: float = 0.0
        self._exp_start_time: float = 0.0
        self._cumulative_reward: float = 0.0
        self._cumulative_tokens: int = 0

    # ------------------------------------------------------------------
    # Lifecycle hooks
    # ------------------------------------------------------------------

    def on_exp_start(self, exp_args: "ExpArgs") -> None:
        import wandb

        self._exp_start_time = time.monotonic()
        self._cumulative_reward = 0.0
        self._cumulative_tokens = 0

        run_name = self._name or (
            f"{getattr(exp_args.agent_args, 'agent_name', 'agent')}"
            f"_on_{exp_args.env_args.task_name}"
        )

        config = {
            "agent_name": getattr(exp_args.agent_args, "agent_name", None),
            "task_name": exp_args.env_args.task_name,
            "task_seed": getattr(exp_args.env_args, "task_seed", None),
            "max_steps": exp_args.env_args.max_steps,
            "exp_id": getattr(exp_args, "exp_id", None),
        }

        self._run = wandb.init(
            project=self._project,
            entity=self._entity,
            name=run_name,
            tags=self._tags,
            group=self._group,
            notes=self._notes,
            config=config,
            reinit=self._reinit,
        )
        logger.info("WandbCallback: run started → %s", self._run.url)

    def on_step_start(self, step: int) -> None:
        self._step_start_time = time.monotonic()

    def on_step_end(self, step_info: "StepInfo", is_done: bool) -> None:
        if not self._log_step_metrics or self._run is None:
            return

        import wandb

        reward = step_info.reward or 0.0
        self._cumulative_reward += reward

        step_tokens: int = 0
        if step_info.stats:
            step_tokens = step_info.stats.get("n_token_agent_messages", 0) or 0
        self._cumulative_tokens += step_tokens

        step_elapsed = time.monotonic() - self._step_start_time
        total_elapsed = time.monotonic() - self._exp_start_time

        metrics = {
            # Per-step raw values
            "step/reward": reward,
            "step/tokens": step_tokens,
            "step/latency_sec": step_elapsed,
            # Cumulative episode values
            "episode/cumulative_reward": self._cumulative_reward,
            "episode/cumulative_tokens": self._cumulative_tokens,
            "episode/elapsed_sec": total_elapsed,
            "episode/is_done": int(is_done),
        }

        # Forward any extra stats the agent/env reported
        if step_info.stats:
            for key, val in step_info.stats.items():
                if isinstance(val, (int, float)) and key not in (
                    "n_token_agent_messages",
                    "step_elapsed",
                    "agent_elapsed",
                ):
                    metrics[f"step/env_{key}"] = val

        wandb.log(metrics, step=step_info.step)

    def on_exp_end(self, exp_dir, err_msg: Optional[str] = None) -> None:
        if self._run is None:
            return

        import wandb

        summary = {
            "final/cumulative_reward": self._cumulative_reward,
            "final/cumulative_tokens": self._cumulative_tokens,
            "final/total_elapsed_sec": time.monotonic() - self._exp_start_time,
            "final/success": int(not bool(err_msg)),
            "final/exp_dir": str(exp_dir),
        }
        if err_msg:
            summary["final/error"] = err_msg

        for key, val in summary.items():
            self._run.summary[key] = val

        self._run.finish(exit_code=1 if err_msg else 0)
        logger.info("WandbCallback: run finished → %s", self._run.url)
        self._run = None


# ─────────────────────────────────────────────────────────────────────────────
# Built-in callback: MLflowCallback
# ─────────────────────────────────────────────────────────────────────────────


class MLflowCallback(AbstractCallback):
    """Streams live BrowserGym experiment events to **MLflow Tracking**.

    Works with any MLflow backend — local filesystem, a self-hosted MLflow
    server, or a managed service (Databricks, Azure ML, etc.).

    **Optional dependency** — ``mlflow`` is NOT a hard requirement of
    BrowserGym.  If it is not installed, constructing this callback raises an
    :class:`ImportError` with a clear installation hint.

    Typical usage::

        from browsergym.experiments.callbacks import MLflowCallback

        exp_args = ExpArgs(
            agent_args=...,
            env_args=...,
            callbacks=[
                MLflowCallback(
                    experiment_name="browsergym-webarena",
                    tracking_uri="http://localhost:5000",   # or omit for local
                ),
            ],
        )

    Args:
        experiment_name: MLflow experiment name.  Created automatically if it
            does not exist.  Defaults to ``"browsergym"``.
        tracking_uri: URI of the MLflow tracking server.  ``None`` uses the
            default (``MLFLOW_TRACKING_URI`` env var or ``./mlruns``).
        run_name: Human-readable run name.  ``None`` auto-generates from
            ``<agent>_on_<task>``.
        tags: Dict of string key/value tags stored on the MLflow run.
        log_step_metrics: When ``True`` (default), calls
            ``mlflow.log_metrics()`` after every step.
        nested: When ``True``, creates a *nested* run inside the active run
            (useful when using MLflow Projects or when running inside a sweep).
    """

    def __init__(
        self,
        experiment_name: str = "browsergym",
        tracking_uri: Optional[str] = None,
        run_name: Optional[str] = None,
        tags: Optional[dict[str, str]] = None,
        log_step_metrics: bool = True,
        nested: bool = False,
    ) -> None:
        try:
            import mlflow  # noqa: F401
        except ImportError as exc:
            raise ImportError(
                "MLflowCallback requires the 'mlflow' package. "
                "Install it with: pip install mlflow"
            ) from exc

        self._experiment_name = experiment_name
        self._tracking_uri = tracking_uri
        self._run_name = run_name
        self._tags = tags or {}
        self._log_step_metrics = log_step_metrics
        self._nested = nested

        self._active_run = None
        self._step_start_time: float = 0.0
        self._exp_start_time: float = 0.0
        self._cumulative_reward: float = 0.0
        self._cumulative_tokens: int = 0

    # ------------------------------------------------------------------
    # Lifecycle hooks
    # ------------------------------------------------------------------

    def on_exp_start(self, exp_args: "ExpArgs") -> None:
        import mlflow

        self._exp_start_time = time.monotonic()
        self._cumulative_reward = 0.0
        self._cumulative_tokens = 0

        if self._tracking_uri:
            mlflow.set_tracking_uri(self._tracking_uri)

        mlflow.set_experiment(self._experiment_name)

        run_name = self._run_name or (
            f"{getattr(exp_args.agent_args, 'agent_name', 'agent')}"
            f"_on_{exp_args.env_args.task_name}"
        )

        tags = {
            "agent_name": str(getattr(exp_args.agent_args, "agent_name", "")),
            "task_name": str(exp_args.env_args.task_name),
            **self._tags,
        }

        self._active_run = mlflow.start_run(
            run_name=run_name,
            tags=tags,
            nested=self._nested,
        )

        # Store static params as MLflow params (not metrics — they are scalars logged once)
        params = {
            "agent_name": str(getattr(exp_args.agent_args, "agent_name", "")),
            "task_name": str(exp_args.env_args.task_name),
            "max_steps": str(exp_args.env_args.max_steps or ""),
            "task_seed": str(getattr(exp_args.env_args, "task_seed", "") or ""),
            "exp_id": str(getattr(exp_args, "exp_id", "") or ""),
        }
        mlflow.log_params(params)
        logger.info("MLflowCallback: run started — id=%s", self._active_run.info.run_id)

    def on_step_start(self, step: int) -> None:
        self._step_start_time = time.monotonic()

    def on_step_end(self, step_info: "StepInfo", is_done: bool) -> None:
        if not self._log_step_metrics or self._active_run is None:
            return

        import mlflow

        reward = step_info.reward or 0.0
        self._cumulative_reward += reward

        step_tokens: int = 0
        if step_info.stats:
            step_tokens = step_info.stats.get("n_token_agent_messages", 0) or 0
        self._cumulative_tokens += step_tokens

        step_elapsed = time.monotonic() - self._step_start_time
        total_elapsed = time.monotonic() - self._exp_start_time

        metrics = {
            "step_reward": reward,
            "step_tokens": float(step_tokens),
            "step_latency_sec": step_elapsed,
            "episode_reward": self._cumulative_reward,
            "episode_tokens": float(self._cumulative_tokens),
            "episode_elapsed_sec": total_elapsed,
        }

        # Forward any extra numeric stats
        if step_info.stats:
            for key, val in step_info.stats.items():
                if isinstance(val, (int, float)) and key not in (
                    "n_token_agent_messages",
                    "step_elapsed",
                    "agent_elapsed",
                ):
                    metrics[f"env_{key}"] = float(val)

        mlflow.log_metrics(metrics, step=step_info.step)

    def on_exp_end(self, exp_dir, err_msg: Optional[str] = None) -> None:
        if self._active_run is None:
            return

        import mlflow

        final_metrics = {
            "final_reward": self._cumulative_reward,
            "final_tokens": float(self._cumulative_tokens),
            "final_elapsed_sec": time.monotonic() - self._exp_start_time,
            "success": 0.0 if err_msg else 1.0,
        }
        mlflow.log_metrics(final_metrics)
        mlflow.log_param("exp_dir", str(exp_dir))

        if err_msg:
            mlflow.set_tag("error", err_msg[:250])  # MLflow tag max ~500 chars

        mlflow.end_run(status="FAILED" if err_msg else "FINISHED")
        logger.info(
            "MLflowCallback: run finished — id=%s status=%s",
            self._active_run.info.run_id,
            "FAILED" if err_msg else "FINISHED",
        )
        self._active_run = None


# ─────────────────────────────────────────────────────────────────────────────
# Built-in callback: JsonlStreamCallback
# ─────────────────────────────────────────────────────────────────────────────


class JsonlStreamCallback(AbstractCallback):
    """Emits structured **newline-delimited JSON** (JSONL) lifecycle events to
    any writable stream (file, stdout, a named pipe, or a network socket).

    This is the universal "glue" callback for custom web UIs and dashboards:

    * A **Streamlit** or **Gradio** app can tail the JSONL file and redraw
      charts on every new line.
    * A **WebSocket server** (e.g. FastAPI + ``websockets``) can read from the
      stream and push events to a browser in real time.
    * Any **CI dashboard** that understands structured logs can parse the output
      without additional adapters.

    Every event is a JSON object with at minimum:

    .. code-block:: json

        {"event": "<name>", "ts": 1234567890.123, ...fields}

    **No extra dependencies** — uses only Python's ``json`` and ``time`` stdlib.

    Typical usage (write to a file that a web app tails)::

        import sys
        from browsergym.experiments.callbacks import JsonlStreamCallback

        # Stream to a file
        with open("events.jsonl", "w") as f:
            exp_args = ExpArgs(
                agent_args=...,
                env_args=...,
                callbacks=[JsonlStreamCallback(stream=f)],
            )
            exp_args.run()

        # Or stream to stdout for piping / CI logs
        exp_args = ExpArgs(
            ...,
            callbacks=[JsonlStreamCallback(stream=sys.stdout)],
        )

    Args:
        stream: Any writable file-like object.  Defaults to ``sys.stdout``.
        include_obs_keys: When provided, only these keys from
            ``step_info.obs`` are included in the ``step_end`` event.  Pass
            ``[]`` to omit observation data entirely (default).  Pass
            ``["goal", "url"]`` to include just those fields.
        flush: When ``True`` (default), calls ``stream.flush()`` after every
            write so the consumer sees events immediately.
    """

    def __init__(
        self,
        stream=None,
        include_obs_keys: Optional[list[str]] = None,
        flush: bool = True,
    ) -> None:
        import sys

        self._stream = stream if stream is not None else sys.stdout
        self._include_obs_keys: list[str] = include_obs_keys if include_obs_keys is not None else []
        self._flush = flush

    # ------------------------------------------------------------------
    # Internal helper
    # ------------------------------------------------------------------

    def _emit(self, event_name: str, payload: dict) -> None:
        """Serialise *payload* as a JSONL line with event name and timestamp."""
        import json

        record = {"event": event_name, "ts": time.time(), **payload}
        self._stream.write(json.dumps(record, default=str) + "\n")
        if self._flush:
            self._stream.flush()

    # ------------------------------------------------------------------
    # Lifecycle hooks
    # ------------------------------------------------------------------

    def on_exp_start(self, exp_args: "ExpArgs") -> None:
        self._emit(
            "exp_start",
            {
                "agent_name": getattr(exp_args.agent_args, "agent_name", None),
                "task_name": exp_args.env_args.task_name,
                "task_seed": getattr(exp_args.env_args, "task_seed", None),
                "max_steps": exp_args.env_args.max_steps,
                "exp_id": getattr(exp_args, "exp_id", None),
                "exp_dir": str(getattr(exp_args, "exp_dir", "")),
            },
        )

    def on_step_start(self, step: int) -> None:
        self._emit("step_start", {"step": step})

    def on_action_selected(self, step: int, action: Optional[str], agent_info: dict) -> None:
        # Only include serialisable scalar fields from agent_info to keep the
        # JSONL compact.  Complex objects (images, embeddings) are skipped.
        safe_info = {
            k: v
            for k, v in agent_info.items()
            if isinstance(v, (str, int, float, bool, type(None)))
        }
        self._emit(
            "action_selected",
            {
                "step": step,
                "action": action,
                "agent_info": safe_info,
            },
        )

    def on_step_end(self, step_info: "StepInfo", is_done: bool) -> None:
        payload: dict = {
            "step": step_info.step,
            "reward": step_info.reward,
            "terminated": step_info.terminated,
            "truncated": step_info.truncated,
            "is_done": is_done,
            "stats": step_info.stats,
        }

        # Optionally include selective observation fields
        if self._include_obs_keys and step_info.obs:
            payload["obs"] = {
                k: step_info.obs[k]
                for k in self._include_obs_keys
                if k in step_info.obs and isinstance(step_info.obs[k], (str, int, float, bool))
            }

        self._emit("step_end", payload)

    def on_exp_end(self, exp_dir, err_msg: Optional[str] = None) -> None:
        self._emit(
            "exp_end",
            {
                "exp_dir": str(exp_dir),
                "success": err_msg is None,
                "err_msg": err_msg,
            },
        )
