# tests/test_evaluate.py
import json
import numpy as np
from browsergym.assistantbench.src.evaluation.evaluator import question_scorer


def test_evaluate():
    file_path = 'tests/assistantbench/data/fallback_gpt4_seeplanact_predictions.jsonl'  # Update this path as needed
    # Open the JSONL file and read each line as a JSON object
    with open(file_path, 'r') as f:
        for line in f:
            data_point = json.loads(line)

            # Extract input, output, and expected result
            input_data = data_point['answer']
            output_data = data_point['gold_answer']
            expected_score = data_point['score']
            expected_has_ans = data_point['has_ans']
            score, has_ans = question_scorer(input_data, output_data)

            # Assert if the expected results doesn't match
            assert score == expected_score
            assert has_ans == expected_has_ans
