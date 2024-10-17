import logging
import os
import random

import gymnasium as gym
import playwright.sync_api
import pytest
from tenacity import retry, retry_if_exception_type, stop_after_attempt, wait_fixed

# register gym environments
import browsergym.visualwebarena

__SLOW_MO = 1000 if "DISPLAY_BROWSER" in os.environ else None
__HEADLESS = False if "DISPLAY_BROWSER" in os.environ else True


from browsergym.visualwebarena import VISUALWEBARENA_TASK_IDS_WITH_RESET

rng = random.Random(1)
task_ids = rng.sample(VISUALWEBARENA_TASK_IDS_WITH_RESET, 10)


@retry(
    stop=stop_after_attempt(5),
    retry=retry_if_exception_type(playwright.sync_api.TimeoutError),
    wait=wait_fixed(2),
    reraise=True,
    before_sleep=lambda _: logging.info("Retrying due to a TimeoutError..."),
)
@pytest.mark.parametrize("task_id", task_ids)
@pytest.mark.slow
@pytest.mark.serial
def test_env_generic(task_id):
    env = gym.make(
        f"browsergym/{task_id}",
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
    )
    obs, info = env.reset()
    env.close()
