from typing import Literal
from unittest import mock
from unittest.mock import Mock
import warnings
import numpy as np
import pytest

from langchain_openai import ChatOpenAI
from langchain.schema import SystemMessage
from openai import RateLimitError
from ui_assist.utils import llm_utils
import httpx


yaml_str = """Analysis:
This is the analysis

Summary: This is the summary

Confidence Score: 7
"""


def test_yaml_parser():
    ans, _, _ = llm_utils.yaml_parser(yaml_str)
    print(ans)
    assert ans["Analysis"] == "This is the analysis"
    assert ans["Summary"] == "This is the summary"
    assert ans["Confidence Score"] == 7


def test_truncate_tokens():
    text = "This is a simple test."
    truncated = llm_utils.truncate_tokens(text, max_tokens=3)
    assert truncated == "This is a"


def test_count_tokens():
    text = "This is a simple test."
    assert llm_utils.count_tokens(text) == 6


def test_json_parser():
    # Testing valid JSON
    message = '{"test": "Hello, World!"}'

    # deactivate warnings
    warnings.filterwarnings("ignore")

    value, valid, retry_message = llm_utils.json_parser(message)
    assert value == {"test": "Hello, World!"}
    assert valid == True
    assert retry_message == ""

    # Testing invalid JSON
    message = '{"test": "Hello, World!"'  # missing closing brace
    value, valid, retry_message = llm_utils.json_parser(message)
    assert value == {}
    assert valid == False
    assert len(retry_message) > 3

    # reactivate warnings
    warnings.filterwarnings("default")


def test_compress_string():
    text = """
This is a test
for paragraph.

This is a second test.
hola
This is a second test.

This is a test
for paragraph.
"""

    expected_output = """\
<definitions>
§-0:
This is a test
for paragraph.
¶-0:
This is a second test.
</definitions>
§-0
¶-0
hola
¶-0
§-0"""

    compressed_text = llm_utils.compress_string(text)
    assert compressed_text == expected_output


@pytest.mark.pricy
def test_retry_parallel():
    chat = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.2, n=3)
    prompt = """List primes from 1 to 10."""
    messages = [
        SystemMessage(content=prompt),
    ]

    global n_call
    n_call = 0

    def parser(message):
        global n_call
        n_call += 1

        if n_call <= 3:  # First 3 calls, just answer the new prompt
            return (
                None,
                False,
                "I changed my mind. List primes up to 15. Just answer the json list, nothing else.",
                0,
            )
        elif n_call == 5:
            return "success", True, "", 10
        else:
            return "bad", True, "", 1 + np.random.rand()

    value = llm_utils.retry_parallel(chat, messages, parser=parser, n_retry=2)
    assert value == "success"
    assert n_call == 6  # 2*3 calls


# Mock ChatOpenAI class
class MockChatOpenAI:
    def invoke(self, messages):
        return "mocked response"


def mock_parser(answer):
    if answer == "correct content":
        return "Parsed value", True, ""

    return None, False, "Retry message"


def mock_rate_limit_error(message: str, status_code: Literal[429] = 429) -> RateLimitError:
    """
    Create a mocked instantiation of RateLimitError with a specified message and status code.

    Args:
    - message (str): The error message.
    - status_code (Literal[429]): The HTTP status code, default is 429 for rate limiting.

    Returns:
    - RateLimitError: A mocked RateLimitError instance.
    """
    mock_response = Mock(spec=httpx.Response)
    mock_response.status_code = status_code
    mock_response.json.return_value = {"error": {"message": message}}

    return RateLimitError(message, response=mock_response, body=mock_response.json())


# Test to ensure function stops retrying after reaching the max wait time
def test_rate_limit_max_wait_time():
    mock_chat = MockChatOpenAI()
    mock_chat.invoke = Mock(
        side_effect=mock_rate_limit_error("Rate limit reached. Please try again in 2s.")
    )

    with pytest.raises(RateLimitError):
        llm_utils.retry(
            mock_chat,
            [],
            n_retry=4,
            parser=mock_parser,
            rate_limit_max_wait_time=6,
            min_retry_wait_time=1,
        )

    # The function should stop retrying after 2 attempts (6s each time, 12s total which is greater than the 10s max wait time)
    assert mock_chat.invoke.call_count == 3


def test_rate_limit_success():
    mock_chat = MockChatOpenAI()
    mock_chat.invoke = Mock(
        side_effect=[
            mock_rate_limit_error("Rate limit reached. Please try again in 2s."),
            SystemMessage(content="correct content"),
        ]
    )

    result = llm_utils.retry(
        mock_chat,
        [],
        n_retry=4,
        parser=mock_parser,
        rate_limit_max_wait_time=6,
        min_retry_wait_time=1,
    )

    assert result == "Parsed value"
    assert mock_chat.invoke.call_count == 2


# Mock a successful parser response to test function exit before max retries
def test_successful_parse_before_max_retries():
    mock_chat = MockChatOpenAI()

    # mock a chat that returns the wrong content the first 2 time, but the right
    # content  on the 3rd time
    mock_chat.invoke = Mock(
        side_effect=[
            SystemMessage(content="wrong content"),
            SystemMessage(content="wrong content"),
            SystemMessage(content="correct content"),
        ]
    )

    result = llm_utils.retry(mock_chat, [], 5, mock_parser, min_retry_wait_time=1)

    assert result == "Parsed value"
    assert mock_chat.invoke.call_count == 3


def test_unsuccessful_parse_before_max_retries():
    mock_chat = MockChatOpenAI()

    # mock a chat that returns the wrong content the first 2 time, but the right
    # content  on the 3rd time
    mock_chat.invoke = Mock(
        side_effect=[
            SystemMessage(content="wrong content"),
            SystemMessage(content="wrong content"),
            SystemMessage(content="correct content"),
        ]
    )
    with pytest.raises(ValueError):
        result = llm_utils.retry(mock_chat, [], 2, mock_parser)

    assert mock_chat.invoke.call_count == 2


def test_retry_parse_raises():
    mock_chat = MockChatOpenAI()
    mock_chat.invoke = Mock(return_value=SystemMessage(content="mocked response"))
    parser_raises = Mock(side_effect=ValueError("Parser error"))

    with pytest.raises(ValueError):
        llm_utils.retry(mock_chat, [], 3, parser_raises)


if __name__ == "__main__":
    # test_retry_parallel()
    test_rate_limit_max_wait_time()
    # test_successful_parse_before_max_retries()
    # test_unsuccessful_parse_before_max_retries()
    test_rate_limit_success()
