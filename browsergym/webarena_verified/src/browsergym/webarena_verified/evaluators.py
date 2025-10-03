"""
WebArena Verified evaluators that integrate the full evaluation system
from platform-labs-agent-eval-harness.
"""

import asyncio
import importlib
import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Optional

import playwright
from agent_eval_harness_common.models import AllocationResource, WebsiteRequirement
from playwright.async_api import async_playwright

from browsergym.webarena.instance import WebArenaInstance
from webarena_verified.api.evaluator_api import TaskEvaluator
from webarena_verified.types.eval import (
    NetworkTrace,
    WebarenaTaskEvalRequest,
    WebarenaTaskEvalResult,
)
from webarena_verified.types.settings import URLMap, WebArenaVerifiedSettings
from webarena_verified.types.task import WebArenaVerifiedTask

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
        self.evaluator = TaskEvaluator(
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
        client: playwright.async_api.CDPSession | None = None,
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
        with open(config_file, "r") as f:
            config = json.load(f)

        # create eval request
        eval_request = WebarenaTaskEvalRequest(
            task=WebArenaVerifiedTask.model_validate(config),
            agent_response_raw=trajectory[-1].get("answer"),
            network_trace=NetworkTrace.from_playwright_trace(...), # TODO: add path to playwright trace should be Path(exp_args.exp_dir / "pw_traces" / f"{exp_args.exp_name}.zip")
        )

        # Run wa_verified evaluation and return float score
        logger.info(f"Running webarena_verified evaluation for task {eval_request.task.task_id}")
        results: list[WebarenaTaskEvalResult] = self.evaluator.eval_task(eval_request)
        logger.info(f"Webarena_verified evaluation result for task {eval_request.task.task_id}:")
        for result in results:
            logger.info(f"status: {result.status}, score: {result.score}, error_msg: {result.error_msg}")
        # return average score
        return sum(result.score for result in results) / len(results)

