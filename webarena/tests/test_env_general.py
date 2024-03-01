import gymnasium as gym
import logging
import os
import pytest

from tenacity import retry, stop_after_attempt, retry_if_exception_type

# register gym environments
import browsergym.webarena

# bugfix: use same playwright instance in browsergym and pytest
from utils import setup_playwright


__SLOW_MO = 1000 if "DISPLAY_BROWSER" in os.environ else None
__HEADLESS = False if "DISPLAY_BROWSER" in os.environ else True


from browsergym.webarena import ALL_WEBARENA_TASK_IDS


@retry(
    stop=stop_after_attempt(5),
    retry=retry_if_exception_type(TimeoutError),
    reraise=True,
    before_sleep=lambda _: logging.info("Retrying due to a TimeoutError..."),
)
@pytest.mark.parametrize("task_id", ALL_WEBARENA_TASK_IDS)
@pytest.mark.slow
def test_env_generic(task_id):
    env = gym.make(
        f"browsergym/{task_id}",
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
    )
    obs, info = env.reset()

    env.close()
