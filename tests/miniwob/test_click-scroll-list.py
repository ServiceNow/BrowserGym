import os
import gymnasium as gym
import re
import pytest

import bs4

# register gym environments
import browsergym.miniwob
from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.core.constants import BROWSERGYM_ID_ATTRIBUTE as BID_ATTR
from browsergym.utils.obs import flatten_dom_to_str

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


def test_scroll_with_bid_scrolls_listbox():
    """
    Integration test for issue #344: the listbox in miniwob.click-scroll-list
    is taller than its viewport. A wheel event at the page level does not
    scroll the listbox; `scroll(0, dy, bid=...)` should. This test asserts the
    listbox's scrollTop moves, which is the behavior the issue is asking for.
    """
    action_set = HighLevelActionSet(subsets=["bid", "coord"])
    env = gym.make(
        "browsergym/miniwob.click-scroll-list",
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        action_mapping=action_set.to_python_code,
    )
    obs, info = env.reset(seed=0)
    assert obs["last_action_error"] == ""

    soup = bs4.BeautifulSoup(
        flatten_dom_to_str(obs["dom_object"], obs["extra_element_properties"]),
        "lxml",
    )
    listbox = soup.find("select", attrs={"id": "options"})
    assert listbox is not None, "miniwob.click-scroll-list should have a #options listbox"
    listbox_bid = listbox.get(BID_ATTR)

    page = env.unwrapped.page

    # baseline
    assert page.evaluate("document.querySelector('#options').scrollTop") == 0

    # page-level scroll must NOT move the listbox
    obs, _, _, _, _ = env.step("scroll(0, 200)")
    assert not obs["last_action_error"]
    assert page.evaluate("document.querySelector('#options').scrollTop") == 0

    # scroll with bid: the listbox itself scrolls
    obs, _, _, _, _ = env.step(f"scroll(0, 300, bid={listbox_bid!r})")
    assert not obs["last_action_error"]
    assert page.evaluate("document.querySelector('#options').scrollTop") > 0

    env.close()
