"""
WebArena Verified evaluators that integrate the full evaluation system
from platform-labs-agent-eval-harness.
"""

import asyncio
import json
import logging

import playwright

from .browsergym_adapter import BrowserGymEvaluationAdapter

logger = logging.getLogger(__name__)


class WebArenaVerifiedEvaluator:
    """
    Evaluator that integrates the webarena_verified evaluation system.
    
    This evaluator handles the new evaluation format with:
    - expected_retrieve_value: Validates data retrieval
    - expected_backend_state: Validates backend/database changes
    - expected_ui_state: Validates UI state changes
    """
    
    def __init__(self):
        """
        Initialize the evaluator.
        """
        self.browsergym_adapter = BrowserGymEvaluationAdapter()

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

        agent_response = trajectory[-1].get("answer")

        # Run advanced evaluation via adapter and return float score
        result = asyncio.run(self._async_evaluation(page, config, agent_response=agent_response))
        return float(result)
    
    async def _async_evaluation(self, page, config, agent_response=None) -> float:
        """
        Use the full webarena_verified evaluation system via the BrowserGym adapter.
        """
        task_id = config.get("task_id")
        logger.info(f"Running webarena_verified async evaluation for task {task_id}")
        
        try:
            # Use the BrowserGym adapter to evaluate the task
            result = await self.browsergym_adapter.evaluate_task(
                page=page,
                config=config,
                agent_response=agent_response,
            )
            return result.get("score", 0.0)
            
        except Exception as e:
            logger.error(f"Error in webarena_verified async evaluation: {e}")
            return 0.0
