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
    Disambiguates US thousands-separator commas from European decimal commas
    before passing a string to ``float()``.

    Rules (applied in order):

    * **Multiple commas** → US grouping style; strip all commas.
      ``"3,080,000"`` → ``"3080000"``, ``"12,34,567"`` → ``"1234567"``
    * **Single comma, group of exactly 3 digits after** → thousands separator;
      strip the comma.  ``"1,000"`` → ``"1000"``, ``"1,234"`` → ``"1234"``
    * **Single comma, 1–2 digits after** → European decimal comma; replace
      with a period.  ``"14,2"`` → ``"14.2"``, ``"3,14"`` → ``"3.14"``
    * **Anything else** → return unchanged (non-numeric strings fall back to
      string comparison upstream).

    The function intentionally does *not* handle a single comma followed by
    4 or more digits (e.g. ``"1,0000"``), leaving those strings unchanged so
    that ``float()`` will reject them and the caller falls back gracefully.

    Args:
        number: a stripped string that may represent a numeric value.

    Returns:
        The string with commas adjusted, ready to pass to ``float()``.
    """
    if number.count(",") > 1:
        # Multiple commas → US grouping (e.g. "3,080,000", "12,34,567")
        return number.replace(",", "")

    match = re.fullmatch(r"(-?\d+),(\d+)", number)
    if match:
        decimal_digits = match.group(2)
        if len(decimal_digits) == 3:
            # Single comma + exactly 3 digits → thousands separator
            return number.replace(",", "")
        if len(decimal_digits) <= 2:
            # Single comma + 1–2 digits → European decimal comma
            return number.replace(",", ".")

    return number
