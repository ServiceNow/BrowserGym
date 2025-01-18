import logging
import os
import random

import gymnasium as gym
import playwright.sync_api
import pytest
from tenacity import retry, retry_if_exception_type, stop_after_attempt

# register gym environments
import browsergym.assistantbench

__SLOW_MO = 1000 if "DISPLAY_BROWSER" in os.environ else None
__HEADLESS = False if "DISPLAY_BROWSER" in os.environ else True


from browsergym.assistantbench import TEST_AB_TASK_IDS, VALID_AB_TASK_IDS

rng = random.Random(1)
valid_task_ids = rng.sample(VALID_AB_TASK_IDS, 10)
test_task_ids = rng.sample(TEST_AB_TASK_IDS, 10)


@retry(
    stop=stop_after_attempt(5),
    retry=retry_if_exception_type(playwright.sync_api.TimeoutError),
    reraise=True,
    before_sleep=lambda _: logging.info("Retrying due to a TimeoutError..."),
)
@pytest.mark.parametrize("task_id", valid_task_ids + test_task_ids)
@pytest.mark.slow
def test_valid_env(task_id):
    env = gym.make(
        f"browsergym/{task_id}",
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
    )
    obs, info = env.reset()
    assert not obs["last_action_error"]

    obs, reward, terminated, truncated, info = env.step("noop(0)")
    assert not obs["last_action_error"]
    assert not (terminated or truncated)

    obs, reward, terminated, truncated, info = env.step('send_msg_to_user("something")')
    assert not obs["last_action_error"]
    assert terminated

    env.close()
