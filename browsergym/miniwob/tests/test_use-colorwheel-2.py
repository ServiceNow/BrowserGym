import os
import gymnasium as gym
import re
import pytest

# register gym environments
import browsergym.miniwob

# bugfix: use same playwright instance in browsergym and pytest
from utils import setup_playwright

__SLOW_MO = 1000 if "DISPLAY_BROWSER" in os.environ else None
__HEADLESS = False if "DISPLAY_BROWSER" in os.environ else True


@pytest.mark.parametrize("seed", range(5))
def test_cheat(seed):
    env = gym.make(
        "browsergym/miniwob.use-colorwheel-2",
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        action_mapping=None,
    )
    obs, info = env.reset(seed=42)

    assert obs["last_action_error"] == ""

    match = re.match(
        "Select the following color #(.+) with the color picker and hit Submit.", obs["goal"]
    )

    assert match

    color = match.groups()[0].upper()

    obs, reward, term, trunc, info = env.step(
        f"""\
page.locator("#col").fill("{color}")
page.get_by_role("button", name="Submit").click()
"""
    )

    assert obs["last_action_error"] == ""
    assert reward == 1
    assert term == True

    env.close()
