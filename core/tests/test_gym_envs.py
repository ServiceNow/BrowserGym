import bs4
import gymnasium as gym
import os
import pathlib
import pytest

from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.core.action.python import PythonActionSet
from browsergym.utils.obs import flatten_dom_to_str
from browsergym.core.constants import BROWSERGYM_ID_ATTRIBUTE as BID_ATTR
from time import time, sleep

# register openended gym environments
import browsergym.core

# bugfix: use same playwright instance in browsergym and pytest
from utils import setup_playwright

__SLOW_MO = 1000 if "DISPLAY_BROWSER" in os.environ else None
__HEADLESS = False if "DISPLAY_BROWSER" in os.environ else True
__TIMEOUT = 500

__DATA_DIR = pathlib.Path(__file__).resolve().parent / "data"
TEST_PAGE = f"file://{__DATA_DIR}/test_page.html"
BASIC_IFRAME_PAGE = f"file://{__DATA_DIR}/basic_iframe_site/basic_iframe_2.html"
DEMO_MODES = ["default", "only_visible_elements"]


def test_gym_env():
    action_set = PythonActionSet()

    env = gym.make(
        "browsergym/openended",
        start_url=TEST_PAGE,
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )
    obs, info = env.reset()

    assert not obs["last_action_error"]

    obs, reward, term, trunc, info = env.step(
        f"""\
page.get_by_label("Name:").click()
page.get_by_label("Name:").fill("Janice")
page.get_by_label("Name:").press("Tab")
page.get_by_label("Email:").fill("janice@mail.com")
page.get_by_label("Email:").press("Tab")
page.get_by_label("Age:", exact=True).fill("21")
page.get_by_label("Age:", exact=True).press("Tab")
"""
    )

    assert obs["last_action_error"] == ""
    assert reward == 0
    assert term == False
    assert trunc == False

    obs, reward, term, trunc, info = env.step(
        f"""\
page.get_by_label("Message:").fill("Hello")
page.get_by_label("Message:").press("Tab")
page.get_by_label("Subscribe to newsletter").check()
page.get_by_label("Subscribe to newsletter").press("Tab")
page.get_by_role("button", name="Submit").press("Enter")
"""
    )

    assert obs["last_action_error"] == ""
    assert reward == 0
    assert term == False
    assert trunc == False

    obs, reward, term, trunc, info = env.step(
        f"""\
page.get_by_label("LABEL DOES NOT EXIST:").fill("Hello")
page.get_by_role("button", name="Submit").press("Enter")
"""
    )

    assert obs["last_action_error"] != ""
    assert reward == 0
    assert term == False
    assert trunc == False

    env.close()


def test_max_episode_steps():
    # no max_steps
    env = gym.make(
        "browsergym/openended",
        start_url=TEST_PAGE,
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
    )
    obs, info = env.reset()

    obs, reward, term, trunc, info = env.step("")

    assert term == False
    assert trunc == False

    obs, reward, term, trunc, info = env.step("")

    assert term == False
    assert trunc == False

    # max_steps = 2
    env = gym.make(
        "browsergym/openended",
        start_url=TEST_PAGE,
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        max_episode_steps=2,
    )
    obs, info = env.reset()

    obs, reward, term, trunc, info = env.step("")

    assert term == False
    assert trunc == False

    obs, reward, term, trunc, info = env.step("")

    assert term == False
    assert trunc == True

    env.close()


def test_active_page():
    action_set = PythonActionSet()
    env = gym.make(
        "browsergym/openended",
        start_url=TEST_PAGE,
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )
    obs, info = env.reset()

    assert len(obs["open_pages_urls"]) == 1
    assert obs["active_page_index"] == 0

    obs, reward, term, trunc, info = env.step("page.context.new_page()")

    assert len(obs["open_pages_urls"]) == 2
    assert obs["active_page_index"] == 1

    obs, reward, term, trunc, info = env.step("page.context.pages[0].mouse.click(5, 5)")

    assert len(obs["open_pages_urls"]) == 2
    assert obs["active_page_index"] == 0

    obs, reward, term, trunc, info = env.step("page.context.pages[1].mouse.click(5, 5)")

    assert len(obs["open_pages_urls"]) == 2
    assert obs["active_page_index"] == 1

    obs, reward, term, trunc, info = env.step("page.context.pages[1].close()")

    assert len(obs["open_pages_urls"]) == 1
    assert obs["active_page_index"] == 0

    obs, reward, term, trunc, info = env.step("page.close()")

    assert len(obs["open_pages_urls"]) == 1
    assert obs["active_page_index"] == 0

    obs, reward, term, trunc, info = env.step("page.context.new_page()")

    assert len(obs["open_pages_urls"]) == 2
    assert obs["active_page_index"] == 1

    obs, reward, term, trunc, info = env.step("page.close()")

    assert len(obs["open_pages_urls"]) == 1
    assert obs["active_page_index"] == 0

    env.close()


def test_nested_iframes_default_demo_mode():
    demo_mode = "default"
    action_set = HighLevelActionSet(demo_mode=demo_mode)
    env = gym.make(
        "browsergym/openended",
        start_url=BASIC_IFRAME_PAGE,
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        demo_mode=demo_mode,
        action_mapping=action_set.to_python_code,
    )
    obs, info = env.reset()
    assert not obs["last_action_error"]

    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    inner_checkbox = soup.find("input", attrs={"id": "checkbox_2"})

    assert inner_checkbox.has_attr("checked")
    # click box
    action = f"""\
click({repr(inner_checkbox.get(BID_ATTR))})
"""
    click_start = time()
    obs, _, _, _, _ = env.step(action)
    click_end = time()
    # clicking should be slow in demo mode
    assert click_end - click_start > 1

    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    inner_checkbox = soup.find("input", attrs={"id": "checkbox_2"})
    # box is not checked; meaning it was clicked by the previous action
    assert not inner_checkbox.has_attr("checked")

    env.close()


@pytest.mark.parametrize("demo_mode", DEMO_MODES)
def test_demo_mode(demo_mode):
    action_set = HighLevelActionSet(demo_mode=demo_mode)
    env = gym.make(
        "browsergym/openended",
        start_url=TEST_PAGE,
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
        demo_mode=demo_mode,
    )
    obs, info = env.reset()
    assert not obs["last_action_error"]

    # Check that the box can be checked when action is not forced
    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    email_field = soup.find("input", attrs={"id": "email"})

    # check that the email field is empty
    assert email_field.get("value") == ""

    # click box
    action = f"""\
fill({repr(email_field.get(BID_ATTR))}, "test@test")
"""
    typing_start = time()
    obs, _, _, _, _ = env.step(action)
    typing_end = time()
    # typing should be slow in demo mode
    assert typing_end - typing_start > 1

    sleep(1)

    # email field has been filled correctly
    assert env.page.input_value("#email") == "test@test"
    # wait for the typing to complete

    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    checkbox = soup.find("input", attrs={"id": "subscribe"})
    # box is not checked
    assert not checkbox.has_attr("checked")

    # click box
    action = f"""\
click({repr(checkbox.get(BID_ATTR))})
"""
    checkbox_start = time()
    obs, _, _, _, _ = env.step(action)
    checkbox_end = time()
    # clicking should be slow in demo mode
    assert checkbox_end - checkbox_start > 1

    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    checkbox = soup.find("input", attrs={"type": "checkbox", "id": "subscribe"})
    # box is checked
    assert checkbox.has_attr("checked")

    env.close()
