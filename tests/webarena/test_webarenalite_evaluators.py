import pytest
from unittest.mock import MagicMock, patch
import json
import tempfile
import playwright.sync_api
import importlib.util

# Skip test if webarenalite is not installed or importable in this environment
webarenalite_installed = importlib.util.find_spec("browsergym.webarenalite") is not None
if webarenalite_installed:
    from browsergym.webarenalite.evaluators import evaluator_router

@pytest.fixture
def mock_page():
    page = MagicMock()
    page.url = "http://example.com"
    return page

@pytest.mark.skipif(not webarenalite_installed, reason="browsergym.webarenalite not installed")
class TestWebArenaLiteEvaluators:
    def _create_evaluator(self, config_dict):
        with tempfile.NamedTemporaryFile("w+", delete=False) as f:
            json.dump(config_dict, f)
            filename = f.name
        return evaluator_router(filename)

    def test_successful_locator_normal_scoring(self, mock_page):
        # 1. Locator returns normal non-empty text.
        config = {
            "eval": {
                "eval_types": ["program_html"],
                "program_html": [
                    {
                        "url": "last",
                        "locator": "document.querySelector('foo').innerText",
                        "required_contents": {"exact_match": "Hello World"}
                    }
                ]
            }
        }
        mock_page.evaluate.return_value = "Hello World"
        
        evaluator = self._create_evaluator(config)
        score = evaluator(trajectory=[{"action_type": "stop"}], config_file="", page=mock_page)
        
        assert score == 1.0
        mock_page.evaluate.assert_called_with("() => document.querySelector('foo').innerText")

    def test_legitimate_empty_value_normal_scoring(self, mock_page):
        # 2. Locator returns a legitimate empty string.
        config = {
            "eval": {
                "eval_types": ["program_html"],
                "program_html": [
                    {
                        "url": "last",
                        "locator": "document.querySelector('empty').innerText",
                        "required_contents": {"exact_match": ""}
                    }
                ]
            }
        }
        mock_page.evaluate.return_value = ""
        
        evaluator = self._create_evaluator(config)
        score = evaluator(trajectory=[{"action_type": "stop"}], config_file="", page=mock_page)
        
        assert score == 1.0

    def test_page_evaluate_exception_evaluator_failure(self, mock_page):
        # 4. page.evaluate() raises an exception (e.g. element missing).
        config = {
            "eval": {
                "eval_types": ["program_html"],
                "program_html": [
                    {
                        "url": "last",
                        "locator": "document.querySelector('missing').innerText",
                        "required_contents": {"exact_match": ""}
                    }
                ]
            }
        }
        mock_page.evaluate.side_effect = Exception("Element not found")
        
        evaluator = self._create_evaluator(config)
        score = evaluator(trajectory=[{"action_type": "stop"}], config_file="", page=mock_page)
        
        # Missing element results in score 0.0 because it's caught and guarded as None
        assert score == 0.0

    def test_slow_navigation_waits_appropriately(self, mock_page):
        # 5, 6, 8. Check that navigation waits for networkidle and tolerates timeouts.
        config = {
            "eval": {
                "eval_types": ["program_html"],
                "program_html": [
                    {
                        "url": "http://example.com/target",
                        "locator": "document.querySelector('foo').innerText",
                        "required_contents": {"exact_match": "Hello World"}
                    }
                ]
            }
        }
        
        # Simulate wait_for_load_state throwing a TimeoutError
        mock_page.wait_for_load_state.side_effect = playwright.sync_api.TimeoutError("Timeout exceeded")
        mock_page.evaluate.return_value = "Hello World"
        
        evaluator = self._create_evaluator(config)
        score = evaluator(trajectory=[{"action_type": "stop"}], config_file="", page=mock_page)
        
        mock_page.goto.assert_called_with("http://example.com/target")
        mock_page.wait_for_load_state.assert_called_with("networkidle", timeout=3000)
        assert score == 1.0 # The timeout was tolerated and evaluation proceeded
