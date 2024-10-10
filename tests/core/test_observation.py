import ast
import os
from pathlib import Path

import bs4
import gymnasium as gym
import numpy as np
import pytest
import regex as re

# register gym environments
import browsergym.core
from browsergym.core.constants import BROWSERGYM_ID_ATTRIBUTE as BID_ATTR
from browsergym.core.observation import (
    _post_extract,
    _pre_extract,
    extract_all_frame_axtrees,
    extract_dom_snapshot,
    extract_merged_axtree,
    extract_screenshot,
)
from browsergym.utils.obs import flatten_axtree_to_str, flatten_dom_to_str

__SLOW_MO = 1000 if "DISPLAY_BROWSER" in os.environ else None
__HEADLESS = False if "DISPLAY_BROWSER" in os.environ else True
__TIMEOUT = 500
__VIEWPORT = {"width": 800, "height": 600}

__DATA_DIR = Path(__file__).resolve().parent / "data"

TEST_PAGE = f"file://{__DATA_DIR}/test_page.html"
TEST_PAGE_2 = f"file://{__DATA_DIR}/test_page_2.html"
MULTI_IFRAME_URL = f"file://{__DATA_DIR}/basic_iframe_site/basic_iframe_2.html"
SHADOW_DOM_URL = f"file://{__DATA_DIR}/basic_shadow_dom_site/basic_shadow_dom.html"
SIMPLE_SHADOW_DOM_URL = f"file://{__DATA_DIR}/basic_shadow_dom_site/simple_shadow_dom.html"
BASIC_IFRAME_URL = f"file://{__DATA_DIR}/basic_shadow_iframe_site/basic_iframe.html"
BASIC_IFRAME_2_URL = f"file://{__DATA_DIR}/basic_shadow_iframe_site/basic_iframe_2.html"
INNER_IFRAME_URL = f"file://{__DATA_DIR}/basic_shadow_iframe_site/inner-iframe.html"
OUTER_IFRAME_URL = f"file://{__DATA_DIR}/basic_shadow_iframe_site/outer-iframe.html"
CUSTOM_PAGE_URL = f"file://{__DATA_DIR}/custom_page/basic_iframe.html"
MULTI_IFRAME_URL = f"file://{__DATA_DIR}/basic_iframe_site/basic_iframe_2.html"


@pytest.mark.skip(reason="TODO: how to get the final viewport size right?")
def test_extract_screenshot():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": TEST_PAGE},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        viewport=__VIEWPORT,
        timeout=__TIMEOUT,
    )
    obs, info = env.reset()

    _pre_extract(env.unwrapped.page)
    screenshot = extract_screenshot(env.unwrapped.page)
    _post_extract(env.unwrapped.page)

    # 3D array (height, width, rgb) of unsigned bytes (between 0 and 255)
    assert isinstance(screenshot, np.ndarray)
    assert len(screenshot.shape) == 3
    assert screenshot.shape[0] == __VIEWPORT["height"]
    assert screenshot.shape[1] == __VIEWPORT["width"]
    assert screenshot.shape[2] == 3  # RGB
    assert screenshot.dtype == np.uint8

    env.close()


def test_extract_axtree_simple():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": TEST_PAGE},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        viewport=__VIEWPORT,
        timeout=__TIMEOUT,
    )
    obs, info = env.reset()

    _pre_extract(env.unwrapped.page)
    all_frame_axtrees = extract_all_frame_axtrees(env.unwrapped.page)
    merged_axtree = extract_merged_axtree(env.unwrapped.page)
    _post_extract(env.unwrapped.page)

    # single frame
    assert len(all_frame_axtrees) == 1
    assert len(next(iter(all_frame_axtrees.values()))["nodes"]) == len(merged_axtree["nodes"])

    env.close()


def test_extract_axtree_multi_iframe():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": MULTI_IFRAME_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        viewport=__VIEWPORT,
        timeout=__TIMEOUT,
    )
    obs, info = env.reset()

    _pre_extract(env.unwrapped.page)
    all_frame_axtrees = extract_all_frame_axtrees(env.unwrapped.page)
    merged_axtree = extract_merged_axtree(env.unwrapped.page)
    _post_extract(env.unwrapped.page)

    # multiple frames
    assert len(all_frame_axtrees) == 3

    # total number of nodes in merged and individual frame axtrees should be equal
    n_nodes = 0
    for frame_id, frame_axtree in all_frame_axtrees.items():
        n_nodes += len(frame_axtree["nodes"])

    assert n_nodes == len(merged_axtree["nodes"])

    env.close()


def test_extract_dom_simple():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": TEST_PAGE},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        viewport=__VIEWPORT,
        timeout=__TIMEOUT,
    )
    obs, info = env.reset()

    _pre_extract(env.unwrapped.page)
    dom_snapshot = extract_dom_snapshot(env.unwrapped.page)
    _post_extract(env.unwrapped.page)

    # single frame
    assert len(dom_snapshot["documents"]) == 1

    env.close()


def test_extract_dom_multi_iframe():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": MULTI_IFRAME_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        viewport=__VIEWPORT,
        timeout=__TIMEOUT,
    )
    obs, info = env.reset()

    _pre_extract(env.unwrapped.page)
    dom_snapshot = extract_dom_snapshot(env.unwrapped.page)
    _post_extract(env.unwrapped.page)

    # multiple frames
    assert len(dom_snapshot["documents"]) == 3

    env.close()


def test_simple_shadowdom():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": SIMPLE_SHADOW_DOM_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        viewport=__VIEWPORT,
        timeout=__TIMEOUT,
    )
    obs, info = env.reset()

    # retrieve an input element inside the shadowDOM
    elem = env.unwrapped.page.get_by_placeholder("Level 1.1 Text Field 1")
    assert elem.count() == 1

    # elem should have a browsergym_id in its BID_ATTR attribute
    elem_id = elem.get_attribute(BID_ATTR)
    assert elem_id is not None

    # elem should not have an aria-description (it should have been cleaned)
    aria_description = elem.get_attribute("aria-description")
    assert aria_description is None

    # elem should not have an aria-roledescription (it should have been cleaned)
    aria_roledescription = elem.get_attribute("aria-roledescription")
    assert aria_roledescription is None

    # check that elem can be retrieved correctly using its browsergym_id
    elem2 = env.unwrapped.page.get_by_test_id(elem_id)
    assert elem2.count() == 1
    assert env.unwrapped.page.evaluate(
        "([node1, node2]) => {return node1.isEqualNode(node2);}",
        [elem.element_handle(), elem2.element_handle()],
    )

    env.close()


def test_nested_shadowdom():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": SHADOW_DOM_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        viewport=__VIEWPORT,
        timeout=__TIMEOUT,
    )
    obs, info = env.reset()

    # retrieve an input element inside the nested shadowDOM
    elem = env.unwrapped.page.get_by_placeholder("Level 2.4 Text Field 2")
    assert elem.count() == 1

    # elem should have a browsergym_id in its BID_ATTR attribute
    elem_id = elem.get_attribute(BID_ATTR)
    assert elem_id is not None

    # elem should not have an aria-description (it should have been cleaned)
    aria_description = elem.get_attribute("aria-description")
    assert aria_description is None

    # elem should not have an aria-roledescription (it should have been cleaned)
    aria_roledescription = elem.get_attribute("aria-roledescription")
    assert aria_roledescription is None

    # check that elem can be retrieved correctly using its browsergym_id
    elem2 = env.unwrapped.page.get_by_test_id(elem_id)
    assert elem2.count() == 1
    assert env.unwrapped.page.evaluate(
        "([node1, node2]) => {return node1.isEqualNode(node2);}",
        [elem.element_handle(), elem2.element_handle()],
    )

    env.close()


@pytest.mark.parametrize(
    "url",
    [
        TEST_PAGE,
        MULTI_IFRAME_URL,
        SIMPLE_SHADOW_DOM_URL,
        BASIC_IFRAME_URL,
        BASIC_IFRAME_2_URL,
        INNER_IFRAME_URL,
        OUTER_IFRAME_URL,
    ],
)
def test_dom_has_bids_no_aria(url):
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": url},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        viewport=__VIEWPORT,
        timeout=__TIMEOUT,
    )
    obs, info = env.reset()

    # exceptions
    dom_node_names_without_bid = ["html", "#text", "#document", "#comment"]
    axtree_roles_without_bid = ["RootWebArea", "none", "generic", "StaticText"]

    # 1. test the DOM snapshot for BID_ATTR, "aria-description" and "aria-roledescription"

    # check all HTML elements in the DOM for unique browsergym id
    dom = obs["dom_object"]
    bids = []
    for doc in dom["documents"]:
        for node_name_id, attributes in zip(doc["nodes"]["nodeName"], doc["nodes"]["attributes"]):
            node_name = dom["strings"][node_name_id]
            # read the node's attributes
            j = 0
            bid = None
            while j < len(attributes):
                attr_name = dom["strings"][attributes[j]]
                attr_value = dom["strings"][attributes[j + 1]]

                # print(f"{node_name} {attr_name}: {attr_value}")

                # check that the "aria-roledescription" attribute is absent (this is specific to this test page)
                assert attr_name != "aria-roledescription"

                # check that the "aria-description" attribute is absent (this is specific to this test page)
                assert attr_name != "aria-description"

                # extract the browsergym id from the BID_ATTR attribute
                if attr_name == BID_ATTR:
                    bid = attr_value
                j += 2

            # check that all elements (with exceptions) have a browsergym id
            if node_name not in dom_node_names_without_bid:
                assert bid is not None

            if bid is not None:
                bids.append(bid)

    # check that all browsergym ids are unique
    assert len(bids) == len(set(bids))

    # 2. test the AXTree for "browsergym_id" and "description" properties
    axtree = obs["axtree_object"]
    bids = []
    for node in axtree["nodes"]:
        bid = node.get("browsergym_id", None)

        # check that the "aria-roledescription" attribute is absent (this is specific to this test page)
        for property in node.get("properties", []):
            assert property["name"] != "roledescription"

        # check that the "aria-description" attribute is absent (this is specific to this test page)
        assert "description" not in node

        # check that all elements (with exceptions) have a browsergym id
        if node["role"]["value"] not in axtree_roles_without_bid:
            assert bid is not None

            if bid is not None:
                bids.append(bid)

    # check that all browsergym ids are unique
    assert len(bids) == len(set(bids))

    env.close()


def test_dom_to_text():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": TEST_PAGE_2},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=None,
    )
    obs, info = env.reset()

    dom = flatten_dom_to_str(obs["dom_object"])
    assert isinstance(dom, str)
    assert "Subscribe to newsletter" in dom
    assert "Janice" not in dom

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

    dom = flatten_dom_to_str(obs["dom_object"])
    assert "Janice" in dom
    assert "janice@mail.com" in dom

    dom = flatten_dom_to_str(
        obs["dom_object"],
        extra_properties=obs["extra_element_properties"],
        with_visible=True,
        with_clickable=True,
        with_center_coords=True,
        with_bounding_box_coords=True,
        with_som=True,
    )
    assert 'box="(' in dom
    assert 'center="(' in dom
    assert 'clickable="" som="" type="submit" value="Submit" visible=""' in dom
    assert 'head bid="1">' in dom
    assert 'clickable="" for="email" visible=""' in dom
    assert "Text within a non-html tag" in dom
    assert "Text that should not be visible" in dom

    dom = flatten_dom_to_str(
        obs["dom_object"], extra_properties=obs["extra_element_properties"], filter_som_only=True
    )
    assert 'for="email"' not in dom
    assert 'type="submit" value="Submit"' in dom
    assert "Text within a non-html tag" not in dom
    assert "Text that should not be visible" not in dom

    dom = flatten_dom_to_str(
        obs["dom_object"],
        extra_properties=obs["extra_element_properties"],
        filter_visible_only=True,
    )
    assert "<title bid=" not in dom
    assert 'type="submit" value="Submit"' in dom
    assert "Text within a non-html tag" in dom
    assert "Text that should not be visible" not in dom

    dom = flatten_dom_to_str(
        obs["dom_object"],
        extra_properties=obs["extra_element_properties"],
        hide_bid_if_invisible=True,
    )
    assert "<title" in dom
    assert "<title bid=" not in dom
    assert 'type="submit" value="Submit"' in dom
    assert "Text within a non-html tag" in dom
    assert "Text that should not be visible" in dom

    dom = flatten_dom_to_str(
        obs["dom_object"],
        extra_properties=obs["extra_element_properties"],
        filter_with_bid_only=True,
    )
    assert "<title bid=" in dom
    assert 'type="submit" value="Submit"' in dom
    assert "Text within a non-html tag" not in dom
    assert "Text that should not be visible" in dom

    env.close()


def test_axtree_to_text():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": TEST_PAGE_2},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=None,
    )
    obs, info = env.reset()

    axtree = flatten_axtree_to_str(obs["axtree_object"])
    assert isinstance(axtree, str)
    assert "checkbox 'Subscribe to newsletter', checked='false'" in axtree
    assert "Janice" not in axtree

    obs, reward, term, trunc, info = env.step(
        f"""\
page.get_by_label("Name:").click()
page.get_by_label("Name:").fill("Janice")
page.get_by_label("Name:").press("Tab")
page.get_by_label("Email:").fill("janice@mail.com")
page.get_by_label("Email:").press("Tab")
page.get_by_label("Age:", exact=True).fill("21")
page.get_by_label("Age:", exact=True).press("Tab")
page.get_by_label("Subscribe to newsletter").click()
"""
    )

    axtree = flatten_axtree_to_str(obs["axtree_object"])
    assert "Janice" in axtree
    assert "janice@mail.com" in axtree
    assert "checkbox 'Subscribe to newsletter', focused, checked='true'" in axtree

    axtree = flatten_axtree_to_str(
        obs["axtree_object"],
        extra_properties=obs["extra_element_properties"],
        with_visible=True,
        with_clickable=True,
        with_center_coords=True,
        with_bounding_box_coords=True,
        with_som=True,
    )
    assert 'box="(' in axtree
    assert 'center="(' in axtree
    assert ", clickable, visible, som" in axtree
    assert "] heading 'Simple Form', box=\"(" in axtree
    assert "] textbox 'Email:' value='janice@mail.com'" in axtree
    assert "Text within a non-html tag" in axtree
    assert "Text that should not be visible" in axtree
    assert "] paragraph" in axtree

    axtree = flatten_axtree_to_str(
        obs["axtree_object"], extra_properties=obs["extra_element_properties"], filter_som_only=True
    )
    assert "LabelText" not in axtree
    assert "] button 'Submit'" in axtree
    assert "Text within a non-html tag" not in axtree
    assert "Text that should not be visible" not in axtree

    axtree = flatten_axtree_to_str(
        obs["axtree_object"],
        extra_properties=obs["extra_element_properties"],
        filter_visible_only=True,
    )
    assert "RootWebArea" in axtree
    assert "] button 'Submit'" in axtree
    assert "Text within a non-html tag" in axtree
    assert "Text that should not be visible" not in axtree
    assert "] paragraph" not in axtree

    axtree = flatten_axtree_to_str(
        obs["axtree_object"],
        extra_properties=obs["extra_element_properties"],
        hide_bid_if_invisible=True,
    )
    assert "RootWebArea" in axtree
    assert "] button 'Submit'" in axtree
    assert "Text within a non-html tag" in axtree
    assert "Text that should not be visible" in axtree
    assert "] paragraph '" not in axtree
    assert "paragraph '" in axtree

    axtree = flatten_axtree_to_str(
        obs["axtree_object"],
        extra_properties=obs["extra_element_properties"],
        filter_with_bid_only=True,
    )
    assert "button 'Submit'" in axtree
    assert "Text within a non-html tag" in axtree
    assert "Text that should not be visible" in axtree

    env.close()


def test_axtree_to_text_remove_redundant():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": TEST_PAGE_2},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=None,
    )
    obs, info = env.reset()

    axtree = flatten_axtree_to_str(obs["axtree_object"], remove_redundant_static_text=True)
    assert "heading 'Simple Form'" in axtree
    assert "StaticText 'Simple Form'" not in axtree

    axtree = flatten_axtree_to_str(obs["axtree_object"], remove_redundant_static_text=False)
    assert "heading 'Simple Form'" in axtree
    assert "StaticText 'Simple Form'" in axtree


def test_simple_webpage():
    """
    In this simple unit test, we make sure the retrieved coordinates of a known element
    are correct, by verifing that the element is checked after clicking on it.

    """
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": TEST_PAGE},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        viewport=__VIEWPORT,
        timeout=__TIMEOUT,
    )
    obs, info = env.reset()

    element = env.unwrapped.page.query_selector('[type="checkbox"]')

    assert not element.is_checked()

    soup = bs4.BeautifulSoup(
        flatten_dom_to_str(
            obs["dom_object"], obs["extra_element_properties"], with_center_coords=True
        ),
        "lxml",
    )
    input_elem = soup.find("input", attrs={"type": "checkbox"})
    x, y = map(float, ast.literal_eval(input_elem.get("center")))

    # click input elem
    env.unwrapped.page.mouse.click(x, y)

    element = env.unwrapped.page.query_selector('[type="checkbox"]')

    assert element.is_checked()

    env.close()


def test_basic_iframe_webpage():
    """
    In this simple unit test, we make sure the retrieved coordinates of a known element
    are correct, by verifing that the element is checked after clicking on it.

    """
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": BASIC_IFRAME_2_URL, "goal": "dummy goal"},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        viewport=__VIEWPORT,
        timeout=__TIMEOUT,
    )

    # click on the checkbox in the main frame
    obs, info = env.reset()

    element = env.unwrapped.page.query_selector('[type="checkbox"]')

    assert not element.is_checked()

    bid = element.get_attribute("bid")
    soup = bs4.BeautifulSoup(
        flatten_dom_to_str(
            obs["dom_object"], obs["extra_element_properties"], with_center_coords=True
        ),
        "lxml",
    )
    input_elem = soup.find("input", attrs={"bid": bid})
    x, y = map(float, ast.literal_eval(input_elem.get("center")))
    env.unwrapped.page.mouse.click(x, y)

    assert element.is_checked()

    # click on the checkbox in the inner_frame
    obs, _, _, _, _ = env.step("")
    element = env.unwrapped.page.frames[2].query_selector('[type="checkbox"]')

    assert element.is_checked()  # instantiated as checked

    bid = element.get_attribute("bid")
    soup = bs4.BeautifulSoup(
        flatten_dom_to_str(
            obs["dom_object"], obs["extra_element_properties"], with_center_coords=True
        ),
        "lxml",
    )
    input_elem = soup.find("input", attrs={"bid": bid})
    x, y = map(float, ast.literal_eval(input_elem.get("center")))
    env.unwrapped.page.mouse.click(x, y)

    assert not element.is_checked()

    # scroll inside a frame, and click on the checkbox in the inner_frame
    env.unwrapped.page.frames[1].evaluate("window.scrollTo(0, document.body.scrollHeight);")
    obs, _, _, _, _ = env.step("")
    element = env.unwrapped.page.frames[2].query_selector('[type="checkbox"]')

    assert not element.is_checked()  # instantiated as checked

    bid = element.get_attribute("bid")
    soup = bs4.BeautifulSoup(
        flatten_dom_to_str(
            obs["dom_object"], obs["extra_element_properties"], with_center_coords=True
        ),
        "lxml",
    )
    input_elem = soup.find("input", attrs={"bid": bid})
    x, y = map(float, ast.literal_eval(input_elem.get("center")))
    env.unwrapped.page.mouse.click(x, y)

    assert element.is_checked()
    env.close()


@pytest.mark.skip(reason="HTML file seems missing. Deactivating for now.")
def test_filter_visible_only():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": CUSTOM_PAGE_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        viewport=__VIEWPORT,
        timeout=__TIMEOUT,
        goal="dummy goal",
    )

    # click on the checkbox in the main frame
    obs, info = env.reset()
    axtree_txt = flatten_axtree_to_str(obs["axtree_object"], filter_visible_only=True)
    assert "textbox" not in axtree_txt

    # scroll on the main frame, then scroll inside a frame to find that hidden textbox element
    env.unwrapped.page.evaluate(
        "window.scrollTo(document.body.scrollWidth / 3, document.body.scrollHeight / 3);"
    )
    iframe = env.unwrapped.page.frames[1]
    iframe.evaluate("window.scrollTo(0, document.body.scrollHeight / 3.5);")

    obs, _, _, _, _ = env.step("")
    axtree_txt = flatten_axtree_to_str(obs["axtree_object"])
    assert "textbox" in obs["axtree_txt"]


def test_extract_focused_element_bid_through_iframes():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": MULTI_IFRAME_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
    )

    obs, info = env.reset()
    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    inner_checkbox = soup.find("input", attrs={"id": "checkbox_2"})
    body = soup.find("body")

    # focused bid is body element
    assert obs["focused_element_bid"] == body.get(BID_ATTR)

    # click box
    action = f"click({repr(inner_checkbox.get(BID_ATTR))})"

    obs, reward, terminated, truncated, info = env.step(action)
    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    inner_checkbox = soup.find("input", attrs={"id": "checkbox_2"})

    # no error
    assert not obs["last_action_error"]

    # focused bid is checkbox
    assert obs["focused_element_bid"] == inner_checkbox.get(BID_ATTR)

    env.close()


def test_extract_focused_element_bid_through_shadowdom():
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": SHADOW_DOM_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
    )

    obs, info = env.reset()
    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    input_elem = soup.find("input", attrs={"name": "level2.4-textfield2"})
    body = soup.find("body")

    # focused bid is body element
    assert obs["focused_element_bid"] == body.get(BID_ATTR)

    # click input elem
    action = f"click({repr(input_elem.get(BID_ATTR))})"

    obs, reward, terminated, truncated, info = env.step(action)
    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    input_elem = soup.find("input", attrs={"name": "level2.4-textfield2"})

    # no error
    assert not obs["last_action_error"]

    # focused bid is input elem
    assert obs["focused_element_bid"] == input_elem.get(BID_ATTR)

    env.close()


def test_tags_to_mark():

    # default value
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": TEST_PAGE_2},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=None,
    )
    obs, info = env.reset()

    dom = flatten_dom_to_str(obs["dom_object"])
    assert isinstance(dom, str)
    assert "<nonhtmltag" in dom
    assert '<nonhtmltag bid="' not in dom
    assert '<p bid="' in dom

    env.close()

    # standard_html
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": TEST_PAGE_2},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        tags_to_mark="standard_html",
        action_mapping=None,
    )
    obs, info = env.reset()

    dom = flatten_dom_to_str(obs["dom_object"])
    assert isinstance(dom, str)
    assert "<nonhtmltag" in dom
    assert '<nonhtmltag bid="' not in dom
    assert '<p bid="' in dom

    env.close()

    # all
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": TEST_PAGE_2},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        tags_to_mark="all",
        action_mapping=None,
    )
    obs, info = env.reset()

    dom = flatten_dom_to_str(obs["dom_object"])
    assert isinstance(dom, str)
    assert "<nonhtmltag" in dom
    assert '<nonhtmltag bid="' in dom
    assert '<p bid="' in dom

    env.close()

    # incorrect value
    with pytest.raises(Exception):
        env = gym.make(
            "browsergym/openended",
            task_kwargs={"start_url": TEST_PAGE_2},
            headless=__HEADLESS,
            slow_mo=__SLOW_MO,
            timeout=__TIMEOUT,
            tags_to_mark="fdsjkhjk",
            action_mapping=None,
        )
