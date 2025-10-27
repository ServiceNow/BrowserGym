"""
WebArena Verified evaluators that integrate the full evaluation system
from platform-labs-agent-eval-harness.
"""

import json
import logging
import tempfile
from pathlib import Path

import playwright.sync_api

from browsergym.webarena.instance import WebArenaInstance
from webarena_verified.api import WebArenaVerifiedDataReader
from webarena_verified.api import (
    WebArenaVerifiedEvaluator as WebArenaVerifiedEvaluatorAPI,
)
from webarena_verified.types import WebArenaVerifiedTask
from webarena_verified.types.config import (
    EnvironmentConfig,
    WebArenaSite,
    WebArenaVerifiedConfig,
)
from webarena_verified.types.eval import (
    TaskEvalContext,
    TaskEvalResult,
)
from webarena_verified.types.tracing import NetworkTrace

logger = logging.getLogger(__name__)


class WebArenaVerifiedEvaluator:
    """
    Evaluator that integrates the webarena_verified evaluation system.
    
    This evaluator handles the new evaluation format with:
    - expected_retrieve_value: Validates data retrieval
    - expected_backend_state: Validates backend/database changes
    - expected_ui_state: Validates UI state changes
    """

    def __init__(self, webarena_instance: WebArenaInstance):
        """
        Initialize the evaluator.
        """
        # Create configuration for all sites and homepage from webarena_instance
        config = WebArenaVerifiedConfig(
            test_data_file=Path(__file__).parent.joinpath("webarena_verified.json"),
            environments={
                **{
                    site: EnvironmentConfig(
                        urls=[webarena_instance.urls[site]],
                        credentials=webarena_instance.credentials.get(site),
                    )
                    for site in webarena_instance.urls
                },
                WebArenaSite.HOMEPAGE: EnvironmentConfig(
                    urls=[webarena_instance.home_url],
                )
            }
        )
        # Instantiate data reader and evaluator
        reader = WebArenaVerifiedDataReader(config)
        self.evaluator = WebArenaVerifiedEvaluatorAPI(config=config, reader=reader)

    def __call__(
        self,
        trajectory: list[dict],
        config_file: str,
        page: playwright.sync_api.Page = None,
        client: playwright.sync_api.CDPSession | None = None,
    ) -> float:
        """
        Entry point compatible with GenericWebArenaTask.validate(...).

        Args:
            trajectory: Fake trajectory from BrowserGym: [{}, last_action]. last_action["answer"] may contain answer.
            config_file: Config file path.
            page: Playwright page.
            client: Always None, none of webarena's evaluators requires a cdp session.
        Returns:
            Float score compatible with BrowserGym (1.0 or 0.0)
        """
        # import webarena dynamically
        from webarena.browser_env.actions import ActionTypes
        # if last action is not a STOP action, return 0.0 as the task is not completed yet
        if trajectory[-1].get("action_type") != ActionTypes.STOP:
            return 0.0

        # task is done: load the config file, stop playwright tracing, and evaluate the trace
        with open(config_file, "r") as f:
            config_raw = json.load(f)
        task: WebArenaVerifiedTask = WebArenaVerifiedTask.model_validate(config_raw)

        # stop playwright tracing
        with tempfile.TemporaryDirectory() as temp_dir:
            trace_path = Path(temp_dir) / "trace.zip"
            page.context.tracing.stop(path=trace_path)

            # Create evaluation context
            context = TaskEvalContext(
                task=task,
                agent_response_raw=trajectory[-1].get("answer"),
                network_trace=NetworkTrace.from_content(trace_path),
                config=self.evaluator.config,
            )

        # Run wa_verified evaluation and return float score
        logger.info(f"Running webarena_verified evaluation for task {task.task_id}")
        results: TaskEvalResult = self.evaluator.evaluate_task(context=context)
        logger.info(f"Webarena_verified evaluation result for task {task.task_id}:")
        logger.info(f"status: {results.status}, score: {results.score}, error_msg: {results.error_msg}")
        for result in results.evaluators_results:
            logger.info(f"- {result.evaluator_name}: status: {result.status}, score: {result.score}, error_msg: {result.error_msg}")
        # return average score
        return sum(result.score for result in results.evaluators_results) / len(results.evaluators_results)

