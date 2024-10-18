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


from browsergym.visualwebarena import VISUALWEBARENA_TASK_IDS_WITHOUT_RESET

rng = random.Random(1)
task_ids = rng.sample(VISUALWEBARENA_TASK_IDS_WITHOUT_RESET, 25)


@retry(
    stop=stop_after_attempt(5),
    retry=retry_if_exception_type(playwright.sync_api.TimeoutError),
    wait=wait_fixed(2),
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


@retry(
    stop=stop_after_attempt(5),
    retry=retry_if_exception_type(playwright.sync_api.TimeoutError),
    wait=wait_fixed(2),
    reraise=True,
    before_sleep=lambda _: logging.info("Retrying due to a TimeoutError..."),
)
def test_domain_safeguard():
    env = gym.make(
        f"browsergym/visualwebarena.398",
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
    )
    obs, info = env.reset()
    assert not obs["last_action_error"]

    obs, reward, terminated, truncated, info = env.step("new_tab()")
    assert not obs["last_action_error"]
    assert not (terminated or truncated)

    obs, reward, terminated, truncated, info = env.step("tab_close()")
    assert not obs["last_action_error"]
    assert not (terminated or truncated)

    obs, reward, terminated, truncated, info = env.step("tab_focus(0)")
    assert not obs["last_action_error"]
    assert not (terminated or truncated)

    obs, reward, terminated, truncated, info = env.step('goto("http://www.google.com")')
    assert not obs["last_action_error"]
    assert terminated

    env.close()
