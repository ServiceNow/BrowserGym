"""
BrowserGym adapter for WebArena Verified evaluation system.

This module provides adapter classes that bridge the gap between BrowserGym's 
page-based approach and the platform-labs evaluation system's resource-based approach.
"""

import logging
from typing import Any, Dict, Optional

from agent_eval_harness_common.models import AllocationResource, WebsiteRequirement
from playwright.async_api import async_playwright

from webarena_verified.evaluation.evaluator import WebArenaEvaluator
from webarena_verified.types import (
    ActionType,
    StatusType,
    WebArenaTask,
    WebArenaTaskResponse,
    WebArenaTaskStatus,
    WebArenaVerifiedAgentResponse,
)

logger = logging.getLogger(__name__)



class BrowserGymResponseAdapter:
    """
    Adapter that converts BrowserGym task results to WebArenaTaskResponse format.
    """
    
    @staticmethod
    def create_response_from_result(
        page,
        agent_response: Optional[str] = None,
        status: WebArenaTaskStatus = WebArenaTaskStatus.SUCCESS,
        error_details: Optional[list[str]] = None,
    ) -> WebArenaTaskResponse:
        """
        Create a WebArenaTaskResponse from BrowserGym task execution results.
        
        Args:
            page: Playwright page object
            agent_response: Optional agent response string
            status: Task execution status
            error_details: Optional error details
        Returns:
            WebArenaTaskResponse object
        """
        try:
            # Get current and recent URLs
            current_url = page.url
            last_urls = [current_url]  # In a full implementation, this would track navigation history
            
            # Create agent response if provided
            verified_response = None
            if agent_response is not None:
                # Try to parse the response and determine action type
                action_type = BrowserGymResponseAdapter._determine_action_type(agent_response)
                response_status = (
                    StatusType.SUCCESS
                    if status == WebArenaTaskStatus.SUCCESS
                    else StatusType.UNKNOWN_ERROR
                )
                
                # Extract results if it's a retrieve action
                results = None
                if action_type == ActionType.RETRIEVE and response_status == StatusType.SUCCESS:
                    results = BrowserGymResponseAdapter._extract_results(agent_response)
                
                verified_response = WebArenaVerifiedAgentResponse(
                    action=action_type,
                    status=response_status,
                    results=results,
                    error_details=error_details[0] if error_details else None
                )
            
            return WebArenaTaskResponse(
                response=verified_response,
                last_urls=last_urls,
                status=status,
                error_details=error_details,
            )
            
        except Exception as e:
            logger.error(f"Error creating WebArenaTaskResponse: {e}")
            return WebArenaTaskResponse(
                response=None,
                last_urls=[page.url if page else ""],
                status=WebArenaTaskStatus.AGENT_FAILURE,
                error_details=[str(e)],
            )
    
    @staticmethod
    def _determine_action_type(response: str) -> ActionType:
        """
        Determine the action type from the response content.
        
        Args:
            response: Agent response string
            
        Returns:
            ActionType enum value
        """
        response_lower = response.lower()
        
        # Simple heuristics to determine action type
        if any(word in response_lower for word in ["get", "find", "search", "retrieve", "show", "list"]):
            return ActionType.RETRIEVE
        elif any(word in response_lower for word in ["create", "add", "update", "delete", "modify", "change"]):
            return ActionType.MUTATE
        elif any(word in response_lower for word in ["navigate", "go to", "visit", "open"]):
            return ActionType.NAVIGATE
        else:
            # Default to retrieve for most cases
            return ActionType.RETRIEVE
    
    @staticmethod
    def _extract_results(response: str) -> list[Any]:
        """
        Extract structured results from the response.
        
        Args:
            response: Agent response string
            
        Returns:
            List of extracted results
        """
        # This is a simplified extraction - in practice, you'd want more sophisticated parsing
        # For now, just return the response as a single result
        return [response.strip()] if response.strip() else []


class BrowserGymEvaluationAdapter:
    """
    Main adapter that orchestrates the evaluation process for BrowserGym tasks.
    """
    
    def __init__(self):
        self.response_adapter = BrowserGymResponseAdapter()
    
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
        resource = AllocationResource(
            website_type=task.eval.site,
            readonly=False,
        )  # TODO: create a dummy resource for now

        # Try to parse the agent_response as a WebArenaVerifiedAgentResponse
        try:
            last_urls = await self._get_last_urls([resource])
            task_result = WebArenaTaskResponse(
                response=WebArenaVerifiedAgentResponse.model_validate(agent_response),
                last_urls=last_urls,
                status=WebArenaTaskStatus.SUCCESS,
            )
        except Exception as e:
            logger.error(f"Failed to validate task result: {e}, agent_response: {agent_response}")
            # task_result = WebArenaTaskResponse(
            #     response=None,
            #     last_urls=last_urls,
            #     status=WebArenaTaskStatus.AGENT_FAILURE,
            #     error_details=[str(e), f"Result String: {agent_response}"],
            # )
            raise

        # task_response = self.response_adapter.create_response_from_result(
        #     page, agent_response
        # )
        
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



    # Copied from platform-labs-agent-eval-harness/benchmarks/webarena-verified/tests/test_benchmark_task.py
    @staticmethod
    async def _get_last_urls(resources: list[AllocationResource]) -> list[str]:
        async with async_playwright() as playwright:
            for resource in resources:
                browser = await playwright.chromium.connect_over_cdp(resource.cdp_url)
                if browser.contexts:
                    context = browser.contexts[0]

                return [page.url for page in context.pages]

    # copied from platform-labs-agent-eval-harness/benchmarks/webarena-verified/tests/conftest.py
    @staticmethod
    def _get_resource_requirements(
        task: WebArenaTask,
    ) -> list[WebsiteRequirement]:
        """Benchmark hook: provide requirements for all sites in the current task.

        Returns a list of WebsiteRequirement (shared model) with website_type and readonly.
        """

        requirements: list[WebsiteRequirement] = []
        for site in task.sites:
            website_type = site.value
            print(f"Adding requirement for {website_type}")
            # Default to write allocations for safety; customize if needed per task
            readonly_flag = False
            requirements.append(
                WebsiteRequirement(website_type=website_type, readonly=readonly_flag)
            )
        return requirements