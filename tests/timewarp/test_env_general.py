import gymnasium as gym
import logging
import os
import playwright.sync_api
import pytest
import random

from tenacity import retry, stop_after_attempt, retry_if_exception_type

# register gym environments
import browsergym.timewarp


__SLOW_MO = 1000 if "DISPLAY_BROWSER" in os.environ else None
__HEADLESS = False if "DISPLAY_BROWSER" in os.environ else True


from browsergym.timewarp import ALL_TIMEWARP_TASK_IDS

# Test a sample of tasks (adjust based on how many tasks you have)
rng = random.Random(1)
task_ids = rng.sample(ALL_TIMEWARP_TASK_IDS, min(5, len(ALL_TIMEWARP_TASK_IDS)))


@retry(
    stop=stop_after_attempt(5),
    retry=retry_if_exception_type(playwright.sync_api.TimeoutError),
    reraise=True,
    before_sleep=lambda _: logging.info("Retrying due to a TimeoutError..."),
)
@pytest.mark.parametrize("task_id", task_ids)
@pytest.mark.slow
def test_env_generic(task_id):
    env = gym.make(
        f"browsergym/{task_id}",
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
    )
    obs, info = env.reset()

    env.close()



