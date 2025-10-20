"""
WebArena Verified evaluators that integrate the full evaluation system
from platform-labs-agent-eval-harness.
"""

import json
import logging
import tempfile
from pathlib import Path

import playwright

from browsergym.webarena.instance import WebArenaInstance
from webarena_verified.api.evaluator_api import (
    WebArenaVerifiedEvaluator as WebArenaVerifiedEvaluatorAPI,
)
from webarena_verified.types.eval import (
    TaskEvalRequest,
    TaskEvalResult,
)
from webarena_verified.types.settings import URLMap, WebArenaVerifiedSettings
from webarena_verified.types.task import WebArenaVerifiedTask
from webarena_verified.types.tracing import NetworkTrace

logger = logging.getLogger(__name__)


CONTAINER_NAMES = {
    "shopping": "shopping-srv-client-0",
    "reddit": "reddit-srv-0",
    "shopping_admin": "shopping-srv-admin-0",
    "gitlab": "gitlab",
    "map": "NA",
}

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
        self.evaluator = WebArenaVerifiedEvaluatorAPI(
            WebArenaVerifiedSettings(
                test_data_file=Path(__file__).parent.joinpath("webarena_verified.json"),
                url_map=URLMap(root=webarena_instance.urls),
            )
        )

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
        config: WebArenaVerifiedTask = WebArenaVerifiedTask.model_validate(config_raw)

        # stop playwright tracing
        with tempfile.TemporaryDirectory() as temp_dir:
            trace_path = Path(temp_dir) / f"wav_{config.task_id}.zip"
            page.context.tracing.stop(path=trace_path)

        # Run wa_verified evaluation and return float score
        logger.info(f"Running webarena_verified evaluation for task {config.task_id}")
        results: list[TaskEvalResult] = self.evaluator.evaluate_task(config.task_id, trajectory[-1].get("answer"), trace_path)
        logger.info(f"Webarena_verified evaluation result for task {config.task_id}:")
        for result in results:
            logger.info(f"status: {result.status}, score: {result.score}, error_msg: {result.error_msg}")
        # return average score
        return sum(result.score for result in results) / len(results)

