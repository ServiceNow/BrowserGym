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
        "browsergym/miniwob.click-menu-2",
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        action_mapping=None,
    )
    obs, info = env.reset(seed=seed)

    assert obs["last_action_error"] == ""

    match1 = re.match(
        'Click the "Menu" button, and then find and click on the item labeled "(.+)".', obs["goal"]
    )
    match2 = re.match(
        'Click the "Menu" button, and then find and click on the item with the "(.+)" icon.',
        obs["goal"],
    )

    assert match1 or match2

    if match1:
        item_label = match1.groups()[0]
        item_classname = {
            "Save": "ui-icon-disk",
            "Prev": "ui-icon-seek-start",
            "Stop": "ui-icon-stop",
            "Play": "ui-icon-play",
            "Next": "ui-icon-seek-end",
            "Zoom In": "ui-icon-zoomin",
            "Zoom Out": "ui-icon-zoomout",
        }[item_label]
    else:
        item_classname = match2.groups()[0]

    action = f"""\
page.get_by_text("Menu").click()
"""

    obs, reward, term, trunc, info = env.step(action)

    assert obs["last_action_error"] == ""
    assert reward == 0
    assert term == False

    if item_classname in ("ui-icon-seek-start", "ui-icon-stop", "ui-icon-play", "ui-icon-seek-end"):

        action = f"""\
page.get_by_text("Playback").click()
"""

        obs, reward, term, trunc, info = env.step(action)

        assert obs["last_action_error"] == ""
        assert reward == 0
        assert term == False

    action = f"""\
page.locator(".{item_classname}").click()
"""

    obs, reward, term, trunc, info = env.step(action)

    assert obs["last_action_error"] == ""
    assert reward == 1
    assert term == True

    env.close()
