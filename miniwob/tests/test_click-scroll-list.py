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
        "browsergym/miniwob.click-scroll-list",
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        action_mapping=None,
    )
    obs, info = env.reset(seed=seed)

    assert obs["last_action_error"] == ""

    match = re.match("Select (.+) from the scroll list and click Submit.", obs["goal"])

    assert match

    options = match.groups()[0].split(", ")
    options = '", "'.join(options)
    action = f"""\
page.locator("#options").select_option(["{options}"])
page.get_by_role("button", name="Submit").click()
"""

    obs, reward, term, trunc, info = env.step(action)

    assert obs["last_action_error"] == ""
    assert reward == 1
    assert term == True

    env.close()
