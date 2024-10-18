import json
import pathlib

from browsergym.assistantbench.evaluation.evaluator import question_scorer

__DATA_DIR = pathlib.Path(__file__).resolve().parent / "data"


def test_evaluate():
    file_path = pathlib.Path(__DATA_DIR) / "fallback_gpt4_seeplanact_predictions.jsonl"
    # Open the JSONL file and read each line as a JSON object
    with open(file_path, "r") as f:
        for line in f:
            data_point = json.loads(line)

            # Extract input, output, and expected result
            input_data = data_point["answer"]
            output_data = data_point["gold_answer"]
            expected_score = data_point["score"]
            expected_has_ans = data_point["has_ans"]
            score, has_ans = question_scorer(input_data, output_data)

            # Assert if the expected results doesn't match
            assert score == expected_score
            assert has_ans == expected_has_ans
