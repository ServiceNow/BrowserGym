import gymnasium as gym
import logging
import os
import pytest
import random

from tenacity import retry, stop_after_attempt, retry_if_exception_type

# register gym environments
import browsergym.webarena

# bugfix: use same playwright instance in browsergym and pytest
from utils import setup_playwright


__SLOW_MO = 1000 if "DISPLAY_BROWSER" in os.environ else None
__HEADLESS = False if "DISPLAY_BROWSER" in os.environ else True

INFEAS_TASK_IDS = [101, 115, 166]
FEAS_TASK_IDS = [165, 187, 199]


@retry(
    stop=stop_after_attempt(5),
    retry=retry_if_exception_type(TimeoutError),
    reraise=True,
    before_sleep=lambda _: logging.info("Retrying due to a TimeoutError..."),
)
@pytest.mark.parametrize(
    "task_id,infeasible",
    [(task_id, True) for task_id in INFEAS_TASK_IDS]
    + [(task_id, False) for task_id in FEAS_TASK_IDS],
)
@pytest.mark.slow
def test_infeasible(task_id, infeasible):
    env = gym.make(
        f"browsergym/webarena.{task_id}",
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
    )
    obs, info = env.reset()

    action = 'report_infeasible("Unachievable task.")'

    obs, reward, term, trunc, info = env.step(action)

    if infeasible:
        assert term == True and reward == 1.0

    else:
        assert term == True and reward == 0.0

    env.close()
