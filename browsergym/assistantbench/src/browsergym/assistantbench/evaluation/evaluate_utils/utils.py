import re
from typing import Callable, List, Set

import numpy as np
from scipy.optimize import linear_sum_assignment


def _align_bags(
    predicted: List[Set[str]],
    gold: List[Set[str]],
    method: Callable[[object, object], float],
) -> List[float]:
    """
    Takes gold and predicted answer sets and first finds the optimal 1-1 alignment
    between them and gets maximum metric values over all the answers.
    """
    scores = np.zeros([len(gold), len(predicted)])
    for gold_index, gold_item in enumerate(gold):
        for pred_index, pred_item in enumerate(predicted):
            scores[gold_index, pred_index] = method(pred_item, gold_item)
    row_ind, col_ind = linear_sum_assignment(-scores)

    max_scores = np.zeros([max(len(gold), len(predicted))])
    for row, column in zip(row_ind, col_ind):
        max_scores[row] = max(max_scores[row], scores[row, column])
    return max_scores


def _fix_comma(number: str) -> str:
    """
    Distinguishes US thousands separators from European decimal commas.

    Multiple commas, or a single comma followed by exactly 3 digits, are
    treated as thousands separators and removed; a single comma followed by
    1 or 2 digits is treated as a decimal comma and replaced by a period.
    Anything else is left untouched.
    """
    if number.count(",") > 1:
        return number.replace(",", "")
    match = re.fullmatch(r"(-?\d+),(\d+)", number)
    if match:
        if len(match.group(2)) == 3:
            return number.replace(",", "")
        if len(match.group(2)) <= 2:
            return number.replace(",", ".")
    return number
