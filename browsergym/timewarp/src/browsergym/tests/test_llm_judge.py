#!/usr/bin/env python3
"""
Unit test script for LLM Judge Evaluator

Test the fuzzy match functionality by providing generated answers and reference answers.
"""

import os
import sys
from pathlib import Path

# Add the browsergym timewarp module to path
# File is at: browsergym/timewarp/src/browsergym/tests/test_judge.py
# Need to add: browsergym/timewarp/src to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from browsergym.timewarp.evaluators import llm_fuzzy_match, LLMJudgeEvaluator


def test_llm_fuzzy_match(
    generated_answer: str, reference_answer: str, question: str = "Test question"
):
    """Test the llm_fuzzy_match function directly."""
    print("=" * 70)
    print("Testing llm_fuzzy_match function")
    print("=" * 70)
    print(f"Question: {question}")
    print(f"Reference Answer: {reference_answer}")
    print(f"Generated Answer: {generated_answer}")
    print("-" * 70)

    try:
        score = llm_fuzzy_match(
            pred=generated_answer,
            reference=reference_answer,
            question=question,
            model="gpt-4-1106-preview",
        )
        print(f"Result: {score} ({'PASS' if score == 1.0 else 'FAIL'})")
        return score
    except Exception as e:
        print(f"Error: {e}")
        import traceback

        traceback.print_exc()
        return None


def test_llm_judge_evaluator(
    generated_answer: str, reference_answer: str, question: str = "Test question"
):
    """Test the LLMJudgeEvaluator class with a mock config."""
    print("\n" + "=" * 70)
    print("Testing LLMJudgeEvaluator class")
    print("=" * 70)
    print(f"Question: {question}")
    print(f"Reference Answer: {reference_answer}")
    print(f"Generated Answer: {generated_answer}")
    print("-" * 70)

    try:
        # Create a temporary config file
        import json
        import tempfile

        config = {
            "goal": question,
            "eval": {
                "eval_types": ["llm_judge"],
                "reference_answers": {"fuzzy_match": reference_answer},
            },
        }

        with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
            json.dump(config, f)
            config_path = f.name

        try:
            # Create evaluator
            evaluator = LLMJudgeEvaluator(model="gpt-4-1106-preview")

            # Create mock trajectory
            trajectory = [
                {},  # StateInfo (empty)
                {"action_type": "STOP", "answer": generated_answer},  # Last action
            ]

            # Evaluate
            score = evaluator(
                trajectory=trajectory, config_file=config_path, page=None, client=None
            )

            print(f"Result: {score} ({'PASS' if score == 1.0 else 'FAIL'})")
            return score
        finally:
            # Clean up temp file
            os.unlink(config_path)

    except Exception as e:
        print(f"Error: {e}")
        import traceback

        traceback.print_exc()
        return None


def run_test_suite():
    """Run a suite of test cases."""
    print("\n" + "=" * 70)
    print("Running Test Suite")
    print("=" * 70)

    test_cases = [
        {
            "question": "What is the capital of France?",
            "reference": "Paris",
            "generated": "Paris",
            "expected": 1.0,
            "description": "Exact match",
        },
        {
            "question": "What is the capital of France?",
            "reference": "Paris",
            "generated": "The capital of France is Paris",
            "expected": 1.0,
            "description": "Semantic match with extra words",
        },
        {
            "question": "What is the capital of France?",
            "reference": "Paris",
            "generated": "London",
            "expected": 0.0,
            "description": "Wrong answer",
        },
        {
            "question": "What is the capital of France?",
            "reference": "Paris",
            "generated": "paris",
            "expected": 1.0,
            "description": "Case insensitive (should be handled by LLM)",
        },
    ]

    results = []
    for i, test in enumerate(test_cases, 1):
        print(f"\nTest {i}: {test['description']}")
        print("-" * 70)
        score = test_llm_fuzzy_match(
            generated_answer=test["generated"],
            reference_answer=test["reference"],
            question=test["question"],
        )

        if score is not None:
            passed = score == test["expected"]
            results.append(
                {
                    "test": i,
                    "description": test["description"],
                    "expected": test["expected"],
                    "actual": score,
                    "passed": passed,
                }
            )
            status = "✓ PASS" if passed else "✗ FAIL"
            print(f"Status: {status}")
        else:
            results.append(
                {
                    "test": i,
                    "description": test["description"],
                    "expected": test["expected"],
                    "actual": None,
                    "passed": False,
                }
            )
            print("Status: ✗ ERROR")

    # Summary
    print("\n" + "=" * 70)
    print("Test Summary")
    print("=" * 70)
    passed_count = sum(1 for r in results if r["passed"])
    total_count = len(results)
    print(f"Passed: {passed_count}/{total_count}")

    for r in results:
        status = "✓" if r["passed"] else "✗"
        print(
            f"{status} Test {r['test']}: {r['description']} (Expected: {r['expected']}, Got: {r['actual']})"
        )


def main():
    """Main function - allows interactive testing or runs test suite."""
    # Enable debug output for LLM judge
    os.environ["LLM_JUDGE_DEBUG"] = "0"

    # Check if API key is set
    if not os.environ.get("OPENAI_API_KEY"):
        print("ERROR: OPENAI_API_KEY environment variable not set!")
        print("Please set it with: export OPENAI_API_KEY='your-key-here'")
        return

    if len(sys.argv) > 1:
        if sys.argv[1] == "--suite":
            # Run test suite
            run_test_suite()
        elif len(sys.argv) >= 3:
            # Custom test: python test_llm_judge.py <generated> <reference> [question]
            generated = sys.argv[1]
            reference = sys.argv[2]
            question = sys.argv[3] if len(sys.argv) > 3 else "Test question"

            test_llm_fuzzy_match(generated, reference, question)
            test_llm_judge_evaluator(generated, reference, question)
        else:
            print("Usage:")
            print("  python test_llm_judge.py --suite                    # Run test suite")
            print("  python test_llm_judge.py <generated> <reference> [question]  # Custom test")
            print("\nExample:")
            print("  python test_llm_judge.py 'Paris' 'Paris' 'What is the capital of France?'")
    else:
        # Interactive mode
        print("LLM Judge Evaluator Test Script")
        print("=" * 70)
        print("\nEnter test cases interactively (or press Ctrl+C to exit)")
        print("Or run with --suite to run predefined test cases")
        print()

        while True:
            try:
                print("\n" + "-" * 70)
                question = input("Question (or press Enter for default): ").strip()
                if not question:
                    question = "Test question"

                reference = input("Reference Answer: ").strip()
                if not reference:
                    print("Reference answer is required!")
                    continue

                generated = input("Generated Answer: ").strip()
                if not generated:
                    print("Generated answer is required!")
                    continue

                print()
                test_llm_fuzzy_match(generated, reference, question)
                test_llm_judge_evaluator(generated, reference, question)

            except KeyboardInterrupt:
                print("\n\nExiting...")
                break
            except Exception as e:
                print(f"Error: {e}")
                import traceback

                traceback.print_exc()


if __name__ == "__main__":
    main()
