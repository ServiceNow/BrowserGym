"""
TimeWarp Evaluators
"""

import json
import os
import re
from pathlib import Path
from typing import Union, Any

from playwright.sync_api import Page


class Evaluator:
    """Base evaluator class"""

    def __call__(
        self,
        trajectory: list,
        config_file: Path | str,
        page: Page,
        client=None,
    ) -> float:
        raise NotImplementedError

    @staticmethod
    def get_last_action(trajectory: list) -> dict:
        try:
            return trajectory[-1]
        except Exception:
            raise ValueError("Trajectory should have at least one action")

    @staticmethod
    def clean_answer(answer: str) -> str:
        """Clean and normalize answer for robust matching.

        - Strips leading/trailing whitespace
        - Removes surrounding quotes
        - Normalizes internal whitespace (multiple spaces/tabs/newlines -> single space)
        - Converts to lowercase
        """
        answer = answer.strip()
        if answer.startswith("'") and answer.endswith("'"):
            answer = answer[1:-1]
        elif answer.startswith('"') and answer.endswith('"'):
            answer = answer[1:-1]
        # Normalize all whitespace (spaces, tabs, newlines) to single spaces
        answer = re.sub(r"\s+", " ", answer)
        # Strip again after normalization in case quotes removal left whitespace
        answer = answer.strip()
        return answer.lower()


class ExactMatchEvaluator(Evaluator):
    """Exact match evaluator with robust normalization.

    Performs case-insensitive matching with whitespace normalization:
    - Converts to lowercase
    - Strips leading/trailing whitespace
    - Normalizes internal whitespace (multiple spaces/tabs/newlines -> single space)
    - Removes surrounding quotes
    """

    def __call__(
        self,
        trajectory: list,
        config_file: Path | str,
        page: Page | None = None,
        client=None,
    ) -> float:
        with open(config_file, "r") as f:
            configs = json.load(f)

        last_action = self.get_last_action(trajectory)
        pred = self.clean_answer(last_action.get("answer", ""))

        ref_answers = configs["eval"].get("reference_answers", {})

        if "exact_match" in ref_answers:
            ref = self.clean_answer(ref_answers["exact_match"])
            return float(pred == ref)

        return 0.0


def _normalize_openai_response_text(response: Any) -> str:
    """Extract text content from various possible return types of the OpenAI API."""
    # If it's already a string
    if isinstance(response, str):
        return response

    # If it's an SDK-like object with `choices`
    try:
        choices = getattr(response, "choices", None)
        if choices:
            first_choice = choices[0]
            # Try message.content (chat) then text (completion)
            message = getattr(first_choice, "message", None)
            if message is None and isinstance(first_choice, dict):
                message = first_choice.get("message")
            if message is not None:
                content = getattr(message, "content", None)
                if content is None and isinstance(message, dict):
                    content = message.get("content")
                if content:
                    return content
            text = getattr(first_choice, "text", None)
            if text is None and isinstance(first_choice, dict):
                text = first_choice.get("text")
            if text:
                return text
    except Exception:
        pass

    # If it's a plain dict, try common keys
    if isinstance(response, dict):
        # Direct content
        if "content" in response and isinstance(response["content"], str):
            return response["content"]
        # choices-like dict
        if "choices" in response and response["choices"]:
            first_choice = response["choices"][0]
            if isinstance(first_choice, dict):
                msg = first_choice.get("message", {})
                if isinstance(msg, dict) and isinstance(msg.get("content"), str):
                    return msg["content"]
                if isinstance(first_choice.get("text"), str):
                    return first_choice["text"]

    # Fallback: stringify
    return str(response)


def llm_fuzzy_match(
    pred: str, reference: str, question: str, model: str = "gpt-5.1-2025-11-13"
) -> float:
    """Check whether the prediction matches the reference using an LLM judge."""
    try:
        from openai import OpenAI
    except ImportError:
        raise ImportError(
            "openai package required for LLM judge evaluation. Install with: pip install openai"
        )

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable not set")

    client = OpenAI(api_key=api_key)

    message = f"""Help a teacher grade the answer of a student given a question. Keep in mind that the student may use different phrasing or wording to answer the question. The goal is to evaluate whether the answer is semantically equivalent to the reference answer.
Input:
- question: {question}
- reference answer: {reference}
- student answer: {pred}

Special Sequence: The string 'N/A' that you see is a special sequence that means 'not achievable'

Output: You must respond with EXACTLY one of the following words (nothing else):
1) 'correct': if the answer is semantically equivalent to the reference. 
   - Numeric values must match exactly (including units, signs, and scale) unless the question/reference clearly allows an approximation or rounding.
   - If an estimate is allowed, the student must still be reasonably close and not contradict the reference.
   - Ordered lists/steps/rankings must match exactly in both the element values and order.
   - Unordered lists/sets must contain the same element values; the order of the elements does not matter.
   - Extra information is allowed only if it does not introduce contradictions or change the meaning.
2) 'partially correct': if the answer is somewhat related but incomplete or inaccurate
3) 'incorrect': if the answer is wrong or unrelated
Do not include any additional text, explanation, or formatting. Only respond with one of the three words above."""

    messages = [
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": message},
    ]

    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0,
            max_completion_tokens=768,
        )
        response_text = _normalize_openai_response_text(response).strip()
        raw_response = response_text  # Keep original for debugging

        # Print raw response for debugging (can be controlled via logging level)
        import logging

        logger = logging.getLogger(__name__)
        if logger.isEnabledFor(logging.DEBUG):
            logger.debug(f"LLM judge raw response: '{raw_response}'")
        # Also print in test mode (when called from test script)
        if os.environ.get("LLM_JUDGE_DEBUG", "").lower() in ("1", "true", "yes"):
            print(f"LLM Raw Response: '{raw_response}'")

        response_text = response_text.lower()
        response_clean = response_text.strip()

        # Check for exact matches first (most strict)
        if response_clean == "correct":
            return 1.0
        elif response_clean == "partially correct" or response_clean == "incorrect":
            return 0.0
        # Fallback to substring matching for robustness (in case LLM adds extra text)
        elif "correct" in response_clean and "partially" not in response_clean:
            # Log a warning if we're using fallback matching
            import logging

            logger = logging.getLogger(__name__)
            logger.warning(
                f"LLM judge returned non-exact response: '{response_text}'. Using fallback matching."
            )
            return 1.0
        elif "partially correct" in response_clean or "incorrect" in response_clean:
            return 0.0
        else:
            # If response doesn't contain expected keywords, default to 0
            import logging

            logger = logging.getLogger(__name__)
            logger.warning(
                f"LLM judge returned unexpected response: '{response_text}'. Defaulting to 0.0."
            )
            return 0.0
    except Exception as e:
        print(f"Error in LLM judge evaluation: {e}")
        return 0.0


class LLMJudgeEvaluator(Evaluator):
    """LLM-based judge evaluator for semantic matching"""

    def __init__(self, model: str = "gpt-5.1-2025-11-13"):
        self.model = model

    def __call__(
        self,
        trajectory: list,
        config_file: Path | str,
        page: Page | None = None,
        client=None,
    ) -> float:
        with open(config_file, "r") as f:
            configs = json.load(f)

        last_action = self.get_last_action(trajectory)
        pred = last_action.get("answer", "")

        # Get the task goal/question from config
        question = configs.get("goal", configs.get("intent", ""))

        # Get reference answers from config
        ref_answers = configs["eval"].get("reference_answers", {})

        # Support both single reference and list of references
        if "fuzzy_match" in ref_answers:
            references = ref_answers["fuzzy_match"]
            if isinstance(references, str):
                references = [references]

            # Any reference can match (OR logic)
            for ref in references:
                if ref == "N/A":
                    # Special handling for N/A
                    if pred.strip().upper() == "N/A":
                        return 1.0
                else:
                    if llm_fuzzy_match(pred, ref, question, self.model) > 0:
                        return 1.0
            return 0.0

        return 0.0


class EvaluatorComb:
    """Combines multiple evaluators"""

    def __init__(self, evaluators: list[Evaluator]) -> None:
        self.evaluators = evaluators

    def __call__(
        self,
        trajectory: list,
        config_file: Path | str,
        page: Page,
        client=None,
    ) -> float:
        score = 1.0
        for evaluator in self.evaluators:
            score *= evaluator(trajectory, config_file, page, client)
        return score


def evaluator_router(config_file: Path | str) -> EvaluatorComb:
    """Route to appropriate evaluator based on config"""
    with open(config_file, "r") as f:
        configs = json.load(f)

    eval_types = configs["eval"]["eval_types"]
    evaluators: list[Evaluator] = []

    for eval_type in eval_types:
        match eval_type:
            case "exact_match":
                evaluators.append(ExactMatchEvaluator())
            case "llm_judge":
                # Get model from config if specified, otherwise use default
                model = configs["eval"].get("llm_model", "gpt-5.1-2025-11-13")
                evaluators.append(LLMJudgeEvaluator(model=model))
            case _:
                raise ValueError(
                    f"eval_type {eval_type} is not supported. Supported types: 'exact_match', 'llm_judge'"
                )

    return EvaluatorComb(evaluators)
