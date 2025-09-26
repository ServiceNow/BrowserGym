"""
WebArena Verified evaluators that integrate the full evaluation system
from platform-labs-agent-eval-harness.
"""

import asyncio
import json
import logging
from datetime import datetime
from typing import Any, Dict, Optional

import playwright
from agent_eval_harness_common.models import AllocationResource, WebsiteRequirement
from playwright.async_api import async_playwright

from browsergym.webarena_verified.instance import WebArenaVerifiedInstance
from webarena_verified.evaluation.evaluator import WebArenaEvaluator
from webarena_verified.types import (
    WebArenaTask,
    WebArenaTaskResponse,
    WebArenaTaskStatus,
    WebArenaVerifiedAgentResponse,
)

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
    
    def __init__(self, webarena_verified_instance: WebArenaVerifiedInstance):
        """
        Initialize the evaluator.
        """
        self.wav_instance = webarena_verified_instance

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

        # Run wa_verified evaluation and return float score
        task_id = config.get("task_id")
        logger.info(f"Running webarena_verified async evaluation for task {task_id}")
        result = asyncio.run(self.evaluate_task(
                page=page,
                config=config,
                agent_response=agent_response,
            ))
        logger.info(f"Webarena_verified evaluation result for task {task_id}: {result}")
        return result.get("score", 0.0)
    
    async def evaluate_task(
        self,
        page,
        config: Dict[str, Any],
        agent_response: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Evaluate a BrowserGym task using the WebArena Verified evaluation system.
        Args:
            page: Playwright page object
            config: Task configuration dictionary
            agent_response: Optional agent response string
        Returns:
            Evaluation result dictionary
        """
        # Convert BrowserGym inputs to WebArena Verified format
        task = WebArenaTask.model_validate(config)
        resource = self.create_mock_allocation_resource(task.eval.site)

        # Try to parse the agent_response as a WebArenaVerifiedAgentResponse
        try:
            # last_urls = await self._get_last_urls([resource])
            last_urls = ["N/A"]  # TODO: check if ok
            task_result = WebArenaTaskResponse(
                response=WebArenaVerifiedAgentResponse.model_validate(agent_response),
                last_urls=last_urls,
                status=WebArenaTaskStatus.SUCCESS,
            )
        except Exception as e:
            logger.error(f"Failed to parse agent response as WebArenaVerifiedAgentResponse: {e}, agent_response: {agent_response}")
            # task_result = WebArenaTaskResponse(
            #     response=None,
            #     last_urls=last_urls,
            #     status=WebArenaTaskStatus.AGENT_FAILURE,
            #     error_details=[str(e), f"Result String: {agent_response}"],
            # )
            raise
        
        evaluator = WebArenaEvaluator()
        eval_results = await evaluator.evaluate_task(
            task=task,
            task_result=task_result,
            resources=[resource],
        )
        
        # Convert results back to a simple score and message
        if eval_results:
            # Success only if all evals passed
            overall_score = 1.0 if all(r.score == 1.0 for r in eval_results) else 0.0
            # Concatenate messages
            messages = [
                msg for result in eval_results for msg in result.assertion_msgs
            ]
            message = "\n".join(messages)
            return {
                "score": overall_score,
                "message": message,
            }
        else:
            return {
                "score": 0.0,
                "message": "No evaluation results returned",
            }


    # copied over from /platform-labs-agent-eval-harness/benchmarks/webarena-verified/scripts/test_evals.py
    def create_mock_allocation_resource(self, site: str) -> AllocationResource:
        """
        Create a mock AllocationResource for validation purposes.
        """
        username = self.wav_instance.credentials[site]["username"]
        password = self.wav_instance.credentials[site]["password"]
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")

        return AllocationResource(
            allocation_id=f"allocation-{site}-{timestamp}",
            site_id=f"{site}-{timestamp}",
            container_name=CONTAINER_NAMES.get(site, "MISSING_CONTAINER_NAME"),
            website_type=site,
            base_url=self.wav_instance.urls.get(site, "MISSING"),
            cdp_url=self.wav_instance.urls.get(site, "MISSING"),  # TODO: check if ok
            vnc_url=self.wav_instance.urls.get(site, "MISSING"),  # TODO: check if ok
            readonly=False,
            username=username,
            password=password,
            role="admin",
        )

    # Copied from platform-labs-agent-eval-harness/benchmarks/webarena-verified/tests/test_benchmark_task.py
    @staticmethod
    async def _get_last_urls(resources: list[AllocationResource]) -> list[str]:
        async with async_playwright() as playwright:
            for resource in resources:
                browser = await playwright.chromium.connect_over_cdp(resource.cdp_url)
                if browser.contexts:
                    context = browser.contexts[0]

                return [page.url for page in context.pages]

