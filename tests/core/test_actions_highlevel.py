import ast
import os
import pathlib
import platform
import re

import bs4
import gymnasium as gym
import pytest
from pyparsing.exceptions import ParseException

# register openended gym environments
import browsergym.core
from browsergym.core.action.highlevel import HighLevelActionSet
from browsergym.core.action.parsers import NamedArgument, highlevel_action_parser
from browsergym.core.constants import BROWSERGYM_ID_ATTRIBUTE as BID_ATTR
from browsergym.utils.obs import flatten_dom_to_str

_IS_MAC_OS = platform.system() == "Darwin"

__SLOW_MO = 1000 if "DISPLAY_BROWSER" in os.environ else None
__HEADLESS = False if "DISPLAY_BROWSER" in os.environ else True
__TIMEOUT = 500

__DATA_DIR = pathlib.Path(__file__).resolve().parent / "data"

TEXTBOX_URL = f"file://{__DATA_DIR}/textbox.html"
EXAMPLE_URL = f"file://{__DATA_DIR}/example.html"
HOVER_URL = f"file://{__DATA_DIR}/hover.html"
INEXISTANT_FILE_URL = f"file://{__DATA_DIR}/no_file_here.html"
LONG_PAGE_URL = f"file://{__DATA_DIR}/long_page.html"
TEXT_INPUT_URL = f"file://{__DATA_DIR}/input_type/text_input.html"
URL_INPUT_URL = f"file://{__DATA_DIR}/input_type/url_input.html"
CHECKBOX_URL = f"file://{__DATA_DIR}/input_type/checkbox_input.html"
MULTI_IFRAME_URL = f"file://{__DATA_DIR}/basic_iframe_site/basic_iframe_2.html"
OBSTRUCTED_CHECKBOX_URL = f"file://{__DATA_DIR}/obstructed_checkbox_page.html"
LOTS_OF_IFRAMES_URL = f"file://{__DATA_DIR}/lots_of_iframes.html"


def test_action_parser():
    parser = highlevel_action_parser

    with pytest.raises(ParseException):
        function_calls = parser.parse_string("", parseAll=True)
        assert not function_calls

    function_calls = parser.parse_string("a()", parseAll=True)
    assert len(function_calls) == 1

    function_calls = parser.parse_string("  a ( ) \n\n\t", parseAll=True)
    assert len(function_calls) == 1

    function_calls = parser.parse_string("  a ( ) b() \n \tc()", parseAll=True)
    assert [function_name for function_name, _ in function_calls] == ["a", "b", "c"]

    function_calls = parser.parse_string('a(12, 12.2, "text", (1, 2, 3), ["a", 23])', parseAll=True)
    _, function_args = function_calls[0]
    assert function_args == [12, 12.2, "text", (1, 2, 3), ["a", 23]]

    function_calls = parser.parse_string('a(x=12, y = 12.2, other = "text")', parseAll=True)
    _, function_args = function_calls[0]
    assert function_args == [
        NamedArgument(name="x", value=12),
        NamedArgument(name="y", value=12.2),
        NamedArgument(name="other", value="text"),
    ]

    function_calls = parser.parse_string('a(12, y = 12.2, other = "text")', parseAll=True)
    _, function_args = function_calls[0]
    assert function_args == [
        12,
        NamedArgument(name="y", value=12.2),
        NamedArgument(name="other", value="text"),
    ]

    with pytest.raises(ParseException):
        function_calls = parser.parse_string('a(x = 12, 12.2, other = "text")', parseAll=True)

    with pytest.raises(ParseException):
        function_calls = parser.parse_string('a(12, 12.2, 1 = "text")', parseAll=True)

    with pytest.raises(ParseException):
        function_calls = parser.parse_string("a(1-)", parseAll=True)

    with pytest.raises(ParseException):
        function_calls = parser.parse_string("a(1/2)", parseAll=True)

    function_calls = parser.parse_string('a("""\nsome\ntext\\"\\"""")', parseAll=True)
    _, function_args = function_calls[0]
    assert function_args == ['\nsome\ntext""']

    function_calls = parser.parse_string("a('\"some\\ntext\"')", parseAll=True)
    _, function_args = function_calls[0]
    assert function_args == ['"some\ntext"']

    function_calls = parser.parse_string('#comment\na("# not comment") #comment \n ', parseAll=True)
    assert len(function_calls) == 1
    function_name, function_args = function_calls[0]
    assert function_name == "a"
    assert function_args == ["# not comment"]

    function_calls = parser.parse_string('fun(12, x="val", y={"aaa": 23})', parseAll=True)
    function_name, function_args = function_calls[0]
    assert function_name == "fun"
    assert function_args == [
        12,
        NamedArgument(name="x", value="val"),
        NamedArgument(name="y", value={"aaa": 23}),
    ]


def test_valid_action():
    action_set = HighLevelActionSet()

    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": CHECKBOX_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )

    def get_checkbox_elem(obs):
        soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
        checkbox = soup.find("input", attrs={"type": "checkbox", "id": "vehicle1"})
        return checkbox

    obs, info = env.reset()
    checkbox = get_checkbox_elem(obs)

    # box not checked
    assert not obs["last_action_error"]
    assert not checkbox.has_attr("checked")

    # typo in action (unescaped double quotes)
    action = f"""\
click({repr(checkbox.get(BID_ATTR))}, "17" screen")  # typo here
"""
    with pytest.raises(ValueError):
        python_action = action_set.to_python_code(action)

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # error and box not checked
    assert "Received an empty action." in obs["last_action_error"]
    assert not checkbox.has_attr("checked")

    # click box 1 time
    action = f"""\
click({repr(checkbox.get(BID_ATTR))})
"""
    python_action = action_set.to_python_code(action)

    assert python_action.count("\nclick(") == 1

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # box checked
    assert not obs["last_action_error"]
    assert checkbox.has_attr("checked")

    # click box 2 times
    action = f"""\
click({repr(checkbox.get(BID_ATTR))})
click({repr(checkbox.get(BID_ATTR))})
"""
    python_action = action_set.to_python_code(action)

    assert python_action.count("\nclick(") == 2

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # box still checked
    assert not obs["last_action_error"]
    assert checkbox.has_attr("checked")

    # click box 3 times
    action = f"""\
click({repr(checkbox.get(BID_ATTR))})
click({repr(checkbox.get(BID_ATTR))})
click({repr(checkbox.get(BID_ATTR))})
"""
    python_action = action_set.to_python_code(action)

    assert python_action.count("\nclick(") == 3

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # box unchecked
    assert not obs["last_action_error"]
    assert not checkbox.has_attr("checked")

    # click box 3 times, same line ops
    action = f"""\
click({repr(checkbox.get(BID_ATTR))}) click({repr(checkbox.get(BID_ATTR))}) click({repr(checkbox.get(BID_ATTR))})
"""
    python_action = action_set.to_python_code(action)

    assert python_action.count("\nclick(") == 3

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # box checked
    assert not obs["last_action_error"]
    assert checkbox.has_attr("checked")

    # click box 3 times, multi line ops, whitespace, tab, comma in-between args
    action = f"""\
   click(  {repr(checkbox.get(BID_ATTR))} ) click({repr(checkbox.get(BID_ATTR))})\t
                                                  noop() noop () noop( )
   # THIS IS A COMMENT
   noop() # this is a noop() call
click({repr(checkbox.get(BID_ATTR))},   )
#click({repr(checkbox.get(BID_ATTR))})
"""
    python_action = action_set.to_python_code(action)

    assert python_action.count("\nclick(") == 3

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # box unchecked
    assert not obs["last_action_error"]
    assert not checkbox.has_attr("checked")

    # click box 3 times, multi line ops, whitespace, tab, comma in-between args, markdown code block
    action = f"""\
Below is code
        ```python
   click(  {repr(checkbox.get(BID_ATTR))} ) click({repr(checkbox.get(BID_ATTR))})\t
                                                  noop() noop () noop( )
   # THIS IS A COMMENT
   noop() # this is a noop() call
click({repr(checkbox.get(BID_ATTR))},   )
#click({repr(checkbox.get(BID_ATTR))})
```
This is not code, just an explanation
"""
    python_action = action_set.to_python_code(action)

    assert python_action.count("\nclick(") == 3

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # box checked
    assert not obs["last_action_error"]
    assert checkbox.has_attr("checked")

    # multiple markdown code blocks
    action = f"""\
Below is code
        ```python
                                                  noop() noop () noop( )
   # THIS IS A COMMENT
   noop() # this is a noop() call
click({repr(checkbox.get(BID_ATTR))},   )
#click({repr(checkbox.get(BID_ATTR))})
```
This is not code, just an explanation
Below is more code
        ```python
   click(  {repr(checkbox.get(BID_ATTR))} ) click({repr(checkbox.get(BID_ATTR))})\t
                                                  noop() noop () noop( )
   # THIS IS A COMMENT
   noop() # this is a noop() call
#click({repr(checkbox.get(BID_ATTR))})
```
This is not code, just an explanation
"""
    python_action = action_set.to_python_code(action)

    assert python_action.count("\nclick(") == 3

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # box unchecked
    assert not obs["last_action_error"]
    assert not checkbox.has_attr("checked")

    # multiple function calls in the middle of text
    action = f"""\
Let's do a noop(), then noop () noop( ) then click({repr(checkbox.get(BID_ATTR))},   )
#click({repr(checkbox.get(BID_ATTR))})
Now let's do two more
   click(  {repr(checkbox.get(BID_ATTR))} ) click({repr(checkbox.get(BID_ATTR))})\t
                                                  noop() noop () noop( )
   # THIS IS A COMMENT
   noop() # this is a noop() call
#click({repr(checkbox.get(BID_ATTR))})
```
This is not code, just an explanation
This is garbage
"""
    python_action = action_set.to_python_code(action)

    assert python_action.count("\nclick(") == 3

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # box checked
    assert not obs["last_action_error"]
    assert checkbox.has_attr("checked")

    env.close()


def test_invalid_action():
    action_set = HighLevelActionSet()

    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": CHECKBOX_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )
    obs, info = env.reset()

    # click inexistant bid
    action = f"""\
click("INVALID_BID")
"""

    obs, reward, term, trunc, info = env.step(action)

    # error
    assert "ValueError" in obs["last_action_error"]

    # invalid bid value type
    action = f"""\
click(None)
"""

    obs, reward, term, trunc, info = env.step(action)

    # error
    assert obs["last_action_error"] == "ValueError: expected a string, got None"

    # invalid bid value type
    action = f"""\
click(42.7)
"""

    obs, reward, term, trunc, info = env.step(action)

    # error
    assert obs["last_action_error"] == "ValueError: expected a string, got 42.7"

    # invalid bid value type
    action = f"""\
click([])
"""

    obs, reward, term, trunc, info = env.step(action)

    # error
    assert obs["last_action_error"] == "ValueError: expected a string, got []"

    # invalid bid value type
    action = f"""\
click([42, "a", True, None])
"""

    obs, reward, term, trunc, info = env.step(action)

    # error
    assert obs["last_action_error"] == "ValueError: expected a string, got [42, 'a', True, None]"

    # invalid bid value type
    action = f"""\
click({{}})
"""

    obs, reward, term, trunc, info = env.step(action)

    # error
    assert obs["last_action_error"] == "ValueError: expected a string, got {}"

    # invalid bid value type
    action = f"""\
click({{"k": "aaa"}})
"""

    obs, reward, term, trunc, info = env.step(action)

    # error
    assert obs["last_action_error"] == "ValueError: expected a string, got {'k': 'aaa'}"

    # invalid action args (too many)
    action = f"""\
click("4", "aa", "bb")
"""

    obs, reward, term, trunc, info = env.step(action)

    # error
    assert obs["last_action_error"] == "Error: Locator.click: modifiers: expected array, got string"

    # invalid action args (not enough)
    action = f"""\
click()
"""

    obs, reward, term, trunc, info = env.step(action)

    # error
    assert (
        obs["last_action_error"]
        == "TypeError: click() missing 1 required positional argument: 'bid'"
    )

    # invalid action args (not enough)
    action = f"""\
click()
"""

    obs, reward, term, trunc, info = env.step(action)

    # error
    assert (
        obs["last_action_error"]
        == "TypeError: click() missing 1 required positional argument: 'bid'"
    )

    # invalid action name
    with pytest.raises(NameError):
        action_set.to_python_code(
            f"""\
not_a_valid_action()
"""
        )

    # forbidden fill action
    with pytest.raises(NameError):
        HighLevelActionSet(subsets=["coord"]).to_python_code(
            f"""\
fill("INVALID_BID", "some text")
"""
        )

    # forbidden import
    with pytest.raises(ValueError):
        action_set.to_python_code(
            f"""\
import numpy as np
"""
        )

    # invalid expression, results in empty action
    with pytest.raises(ValueError):
        action_set.to_python_code(
            f"""\
[
"""
        )

    # invalid expression, results in empty action
    with pytest.raises(ValueError):
        action_set.to_python_code(
            f"""\
click
"""
        )

    env.close()


def test_click_through_frames():
    action_set = HighLevelActionSet()

    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": MULTI_IFRAME_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )

    obs, info = env.reset()

    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    checkbox = soup.find("input", attrs={"type": "checkbox", "id": "checkbox_2"})

    # box checked
    assert checkbox.has_attr("checked")

    # click box
    action = f"""\
click({repr(checkbox.get(BID_ATTR))})
"""
    python_action = action_set.to_python_code(action)

    obs, reward, term, trunc, info = env.step(action)

    # no error
    assert not obs["last_action_error"]

    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    checkbox = soup.find("input", attrs={"type": "checkbox", "id": "checkbox_2"})

    # box not checked
    assert not checkbox.has_attr("checked")

    env.close()


def test_fill_through_iframe():
    action_set = HighLevelActionSet()

    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": MULTI_IFRAME_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )

    obs, info = env.reset()

    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    text_input = soup.find(
        "input", attrs={"type": "text", "placeholder": "Enter text here in iframe"}
    )

    # empty input
    assert text_input.get("value") == ""

    # fill with some text
    action = f"""\
fill({repr(text_input.get(BID_ATTR))}, "This is a test value.")
"""
    python_action = action_set.to_python_code(action)

    obs, reward, term, trunc, info = env.step(action)

    # no error
    assert not obs["last_action_error"]

    soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
    text_input = soup.find(
        "input", attrs={"type": "text", "placeholder": "Enter text here in iframe"}
    )

    # input filled to desired value
    assert text_input.get("value") == "This is a test value."

    env.close()


def test_click():
    action_set = HighLevelActionSet()

    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": CHECKBOX_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )

    def get_checkbox_elem(obs):
        soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
        checkbox = soup.find("input", attrs={"type": "checkbox", "id": "vehicle1"})
        return checkbox

    obs, info = env.reset()
    checkbox = get_checkbox_elem(obs)

    # box not checked
    assert not checkbox.has_attr("checked")

    # click box
    action = f"""
click({repr(checkbox.get(BID_ATTR))})
"""
    python_action = action_set.to_python_code(action)

    obs, reward, terminated, truncated, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # no error
    assert not obs["last_action_error"]

    # box checked
    assert checkbox.has_attr("checked")

    # click box
    action = f"""\
click({repr(checkbox.get(BID_ATTR))})
"""
    python_action = action_set.to_python_code(action)

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # no error
    assert not obs["last_action_error"]

    # box unchecked
    assert not checkbox.has_attr("checked")

    # click box twice
    action = f"""\
click({repr(checkbox.get(BID_ATTR))})
click({repr(checkbox.get(BID_ATTR))})
"""
    python_action = action_set.to_python_code(action)

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # no error
    assert not obs["last_action_error"]

    # box still unchecked
    assert not checkbox.has_attr("checked")

    env.close()


def test_hover():
    action_set = HighLevelActionSet(subsets=["bid", "coord"])

    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": HOVER_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )

    def get_button_elem(obs):
        soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
        button = soup.find("input", attrs={"type": "button"})
        return button

    obs, info = env.reset()
    button = get_button_elem(obs)

    assert not obs["last_action_error"]
    assert button.get("value") == "Hover me"

    action = f"""
hover({repr(button.get(BID_ATTR))})
"""

    obs, reward, terminated, truncated, info = env.step(action)
    button = get_button_elem(obs)

    assert not obs["last_action_error"]
    assert button.get("value") == "Hello world!"

    action = f"""
mouse_move(0, 0)
"""

    obs, reward, terminated, truncated, info = env.step(action)
    button = get_button_elem(obs)

    assert not obs["last_action_error"]
    assert button.get("value") == "Hover me"

    env.close()


def test_fill_type_press():
    action_set = HighLevelActionSet(subsets=["bid", "coord"])
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": TEXT_INPUT_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )

    def get_fname_lname_elems(obs):
        soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
        fname = soup.find("input", attrs={"id": "fname"})
        lname = soup.find("input", attrs={"id": "lname"})
        return fname, lname

    obs, info = env.reset()
    fname, lname = get_fname_lname_elems(obs)

    # type using bid
    action = f"""
fill({repr(fname.get(BID_ATTR))}, 'Christian')
"""

    obs, reward, terminated, truncated, info = env.step(action)
    fname, lname = get_fname_lname_elems(obs)

    assert not obs["last_action_error"]
    assert fname.get("value") == "Christian"
    assert lname.get("value") == ""

    # type using bid
    action = f"""
fill({repr(lname.get(BID_ATTR))}, 'Clavier')
"""

    obs, reward, terminated, truncated, info = env.step(action)
    fname, lname = get_fname_lname_elems(obs)

    assert not obs["last_action_error"]
    assert fname.get("value") == "Christian"
    assert lname.get("value") == "Clavier"

    # type using focus and keyboard_type
    action = f"""
focus({repr(fname.get(BID_ATTR))}) keyboard_type('Gérard')
"""

    obs, reward, terminated, truncated, info = env.step(action)
    fname, lname = get_fname_lname_elems(obs)

    assert not obs["last_action_error"]
    assert fname.get("value") == "ChristianGérard"
    assert lname.get("value") == "Clavier"

    # type using click and keyboard_insert_text
    action = f"""
click({repr(lname.get(BID_ATTR))}) keyboard_insert_text('Jugnot')
"""

    obs, reward, terminated, truncated, info = env.step(action)
    fname, lname = get_fname_lname_elems(obs)

    assert not obs["last_action_error"]
    assert fname.get("value") == "ChristianGérard"
    assert lname.get("value") == "ClavierJugnot"

    # type using clear and keyboard_insert_text
    action = f"""
clear({repr(lname.get(BID_ATTR))}) keyboard_insert_text('Jugnot')
"""

    obs, reward, terminated, truncated, info = env.step(action)
    fname, lname = get_fname_lname_elems(obs)

    assert not obs["last_action_error"]
    assert fname.get("value") == "ChristianGérard"
    assert lname.get("value") == "Jugnot"

    # type using click, manual clear and keyboard_insert_text
    action = f"""
click({repr(fname.get(BID_ATTR))})
# clear the field
keyboard_press('End')
keyboard_down('Shift')
keyboard_press('Home')
keyboard_up('Shift')
keyboard_press('Backspace')
# insert text
keyboard_insert_text('Gérard')
"""

    obs, reward, terminated, truncated, info = env.step(action)
    fname, lname = get_fname_lname_elems(obs)

    assert not obs["last_action_error"]
    assert fname.get("value") == "Gérard"
    assert lname.get("value") == "Jugnot"

    # fill empty text
    action = f"""
fill({repr(fname.get(BID_ATTR))}, '')
"""

    obs, reward, terminated, truncated, info = env.step(action)
    fname, lname = get_fname_lname_elems(obs)

    assert not obs["last_action_error"]
    assert fname.get("value") == ""
    assert lname.get("value") == "Jugnot"

    # type in currently focused element
    action = f"""
keyboard_type('Jean')
"""

    obs, reward, terminated, truncated, info = env.step(action)
    fname, lname = get_fname_lname_elems(obs)

    assert not obs["last_action_error"]
    assert fname.get("value") == "Jean"
    assert lname.get("value") == "Jugnot"

    # de-focus (click 0, 0), then type text
    action = f"""
mouse_click(0, 0)
"""
    obs, reward, terminated, truncated, info = env.step(action)
    fname, lname = get_fname_lname_elems(obs)

    assert not obs["last_action_error"]
    assert fname.get("value") == "Jean"
    assert lname.get("value") == "Jugnot"

    action = f"""
keyboard_type('Reno')
"""
    obs, reward, terminated, truncated, info = env.step(action)
    fname, lname = get_fname_lname_elems(obs)

    assert not obs["last_action_error"]
    assert fname.get("value") == "Jean"
    assert lname.get("value") == "Jugnot"

    env.close()


@pytest.mark.skip(reason="Not implemented yet")
def test_dblclick():
    pass


# copy/paste text using a sequence of keyboard_press actions
def test_key_press():
    action_set = HighLevelActionSet(subsets=["bid", "coord"])

    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": TEXT_INPUT_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )

    obs, info = env.reset()

    def get_fname_lname_elems(obs):
        soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
        fname = soup.find("input", attrs={"id": "fname"})
        lname = soup.find("input", attrs={"id": "lname"})
        return fname, lname

    fname, lname = get_fname_lname_elems(obs)

    action = f"""
    fill({repr(fname.get(BID_ATTR))}, "Christian")
    keyboard_press({repr("Meta+a" if _IS_MAC_OS else "Control+a")})
    keyboard_press({repr("Meta+c" if _IS_MAC_OS else "Control+c")})
    click({repr(lname.get(BID_ATTR))})
    keyboard_press({repr("Meta+v" if _IS_MAC_OS else "Control+v")})
    """

    obs, reward, terminated, truncated, info = env.step(action)

    assert not obs["last_action_error"]

    fname, lname = get_fname_lname_elems(obs)

    assert lname.get("value") == "Christian"

    env.close()


def test_goto():
    url1 = URL_INPUT_URL
    url2 = TEXT_INPUT_URL

    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": url1},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
    )

    obs, info = env.reset()

    assert obs["url"] == url1

    action = f"""
goto({repr(url2)})
"""

    obs, reward, terminated, truncated, info = env.step(action)

    assert not obs["last_action_error"]

    assert obs["url"] == url2

    action = """
go_back()
"""

    obs, reward, terminated, truncated, info = env.step(action)

    assert not obs["last_action_error"]

    assert obs["url"] == url1

    action = """
go_forward()
"""

    obs, reward, terminated, truncated, info = env.step(action)

    assert not obs["last_action_error"]

    assert obs["url"] == url2

    env.close()


def test_scroll():
    action_set = HighLevelActionSet(subsets=["coord"])

    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": LONG_PAGE_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )

    def extract_coords_from_elem(elem):
        return ast.literal_eval(elem.get("center"))

    def get_top_bottom_elems(obs):
        soup = bs4.BeautifulSoup(
            flatten_dom_to_str(
                obs["dom_object"], obs["extra_element_properties"], with_center_coords=True
            ),
            "lxml",
        )
        top = soup.find("input", attrs={"type": "checkbox", "id": "top"})
        bottom = soup.find("input", attrs={"type": "checkbox", "id": "bottom"})
        return top, bottom

    obs, info = env.reset()
    top, bottom = get_top_bottom_elems(obs)
    top_x, top_y = extract_coords_from_elem(top)
    bottom_x, bottom_y = extract_coords_from_elem(bottom)

    # top not checked
    assert not top.has_attr("checked")
    # bottom not checked
    assert not bottom.has_attr("checked")

    # click top
    action = f"mouse_click({repr(top_x)}, {repr(top_y)})"

    obs, reward, terminated, truncated, info = env.step(action)

    top, bottom = get_top_bottom_elems(obs)
    top_x, top_y = extract_coords_from_elem(top)
    bottom_x, bottom_y = extract_coords_from_elem(bottom)

    # no error
    assert not obs["last_action_error"]
    # top checked
    assert top.has_attr("checked")
    # bottom not checked
    assert not bottom.has_attr("checked")

    top, bottom = get_top_bottom_elems(obs)
    top_x, top_y = extract_coords_from_elem(top)
    bottom_x, bottom_y = extract_coords_from_elem(bottom)

    # click bottom
    action = f"mouse_click({repr(bottom_x)}, {repr(bottom_y)})"

    obs, reward, terminated, truncated, info = env.step(action)

    top, bottom = get_top_bottom_elems(obs)
    top_x, top_y = extract_coords_from_elem(top)
    bottom_x, bottom_y = extract_coords_from_elem(bottom)

    # no error (click coordinates out of viewport is a silent fail in playwright)
    assert not obs["last_action_error"]
    # top checked
    assert top.has_attr("checked")
    # bottom not checked (click didn't go through)
    assert not bottom.has_attr("checked")

    # scroll up
    action = f"scroll(0, -500)"

    obs, reward, terminated, truncated, info = env.step(action)

    top, bottom = get_top_bottom_elems(obs)
    prev_top_x, prev_top_y = top_x, top_y
    top_x, top_y = extract_coords_from_elem(top)
    prev_bottom_x, prev_bottom_y = bottom_x, bottom_y
    bottom_x, bottom_y = extract_coords_from_elem(bottom)

    # no error
    assert not obs["last_action_error"]

    # no movement
    assert prev_top_x == top_x and prev_top_y == top_y
    assert prev_bottom_x == bottom_x and prev_bottom_y == bottom_y

    # scroll down
    action = f"scroll(0, 500)"

    obs, reward, terminated, truncated, info = env.step(action)

    top, bottom = get_top_bottom_elems(obs)
    prev_top_x, prev_top_y = top_x, top_y
    top_x, top_y = extract_coords_from_elem(top)
    prev_bottom_x, prev_bottom_y = bottom_x, bottom_y
    bottom_x, bottom_y = extract_coords_from_elem(bottom)

    # no error
    assert not obs["last_action_error"]

    # movement
    assert prev_top_x == top_x and prev_top_y > top_y
    assert prev_bottom_x == bottom_x and prev_bottom_y > bottom_y

    env.close()


def test_tab_actions():
    action_set = HighLevelActionSet(subsets=["tab", "nav"])

    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": CHECKBOX_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )
    obs, info = env.reset()
    assert not obs["last_action_error"]
    assert len(obs["open_pages_urls"]) == 1
    assert len(obs["open_pages_titles"]) == 1
    assert obs["active_page_index"] == 0
    assert obs["open_pages_urls"][obs["active_page_index"][0]] == obs["url"]

    obs, reward, terminated, truncated, info = env.step("new_tab()")
    assert not obs["last_action_error"]
    assert len(obs["open_pages_urls"]) == 2
    assert len(obs["open_pages_titles"]) == 2
    assert obs["active_page_index"] == 1
    assert obs["open_pages_urls"][obs["active_page_index"][0]] == obs["url"]

    obs, reward, terminated, truncated, info = env.step(f"goto({repr(TEXTBOX_URL)})")
    assert not obs["last_action_error"]
    assert len(obs["open_pages_urls"]) == 2
    assert len(obs["open_pages_titles"]) == 2
    assert obs["active_page_index"] == 1
    assert obs["open_pages_urls"][obs["active_page_index"][0]] == obs["url"]

    obs, reward, terminated, truncated, info = env.step("tab_focus(0)")
    assert not obs["last_action_error"]
    assert len(obs["open_pages_urls"]) == 2
    assert len(obs["open_pages_titles"]) == 2
    assert obs["active_page_index"] == 0
    assert obs["open_pages_urls"][obs["active_page_index"][0]] == obs["url"]

    obs, reward, terminated, truncated, info = env.step("tab_close()")
    assert not obs["last_action_error"]
    assert len(obs["open_pages_urls"]) == 1
    assert len(obs["open_pages_titles"]) == 1
    assert obs["active_page_index"] == 0
    assert obs["open_pages_urls"][obs["active_page_index"][0]] == obs["url"]

    env.close()


def test_mouse_down_up():
    action_set = HighLevelActionSet(subsets=["bid", "coord"])

    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": CHECKBOX_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )

    def get_checkbox_elem(obs):
        soup = bs4.BeautifulSoup(
            flatten_dom_to_str(
                obs["dom_object"], obs["extra_element_properties"], with_center_coords=True
            ),
            "lxml",
        )
        checkbox = soup.find("input", attrs={"type": "checkbox", "id": "vehicle1"})
        return checkbox

    obs, info = env.reset()
    checkbox = get_checkbox_elem(obs)

    # box not checked
    assert not obs["last_action_error"]
    assert not checkbox.has_attr("checked")

    # click box 1 time
    x, y = ast.literal_eval(checkbox.get("center"))
    action = f"""\
mouse_click({repr(x)}, {repr(y)})
"""
    python_action = action_set.to_python_code(action)

    assert python_action.count("\nmouse_") == 1

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # box checked
    assert not obs["last_action_error"]
    assert checkbox.has_attr("checked")

    # click box 1 time
    x, y = ast.literal_eval(checkbox.get("center"))
    action = f"""\
mouse_move(0, 0)
mouse_move({repr(x)}, {repr(y)})
mouse_down({repr(x)}, {repr(y)})
mouse_up({repr(x)}, {repr(y)})
"""
    python_action = action_set.to_python_code(action)

    assert python_action.count("\nmouse_") == 4

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # box not checked
    assert not obs["last_action_error"]
    assert not checkbox.has_attr("checked")

    # click box 2 times
    x, y = ast.literal_eval(checkbox.get("center"))
    action = f"""\
mouse_move(0, 0)
mouse_move({repr(x)}, {repr(y)})
mouse_down({repr(x)}, {repr(y)}, button="left")
mouse_up({repr(x)}, {repr(y)}, "left")
mouse_down({repr(x)}, {repr(y)})
mouse_up({repr(x)}, {repr(y)})
"""
    python_action = action_set.to_python_code(action)

    assert python_action.count("\nmouse_") == 6

    obs, reward, term, trunc, info = env.step(action)
    checkbox = get_checkbox_elem(obs)

    # box not checked
    assert not obs["last_action_error"]
    assert not checkbox.has_attr("checked")


# test that forced action can click an obstructed element
@pytest.mark.parametrize("retry_with_force", [True, False])
def test_forced_actions(retry_with_force):
    action_set = HighLevelActionSet(subsets=["bid"], retry_with_force=retry_with_force)
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": OBSTRUCTED_CHECKBOX_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )

    obs, info = env.reset()

    def get_checkbox(obs):
        soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
        checkbox = soup.find("input", attrs={"id": "hobbies-checkbox-1"})
        return checkbox

    checkbox = get_checkbox(obs)

    action = f"""
    click({repr(checkbox.get(BID_ATTR))})
    """

    obs, reward, terminated, truncated, info = env.step(action)
    checkbox = get_checkbox(obs)
    if retry_with_force:
        assert not obs["last_action_error"]
        assert checkbox.get("checked", False) == False
    else:
        assert obs["last_action_error"]
        assert checkbox.has_attr("checked")

    env.close()


# TODO investigate why it takes ~1sec to mark each frame, although they are very small, and if we can do something about it
@pytest.mark.slow
def test_iframe_bid():
    action_set = HighLevelActionSet(subsets=["bid"])
    env = gym.make(
        "browsergym/openended",
        task_kwargs={"start_url": LOTS_OF_IFRAMES_URL},
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        timeout=__TIMEOUT,
        action_mapping=action_set.to_python_code,
    )

    obs, info = env.reset()

    def get_checkbox(obs, i):
        soup = bs4.BeautifulSoup(flatten_dom_to_str(obs["dom_object"]), "lxml")
        checkbox = soup.find("input", attrs={"id": f"checkbox{i}"})
        return checkbox

    # try to click on checkboxes
    checkboxes = [
        (0, "a"),
        # (5, "f"),
        # (26, "aA"),
        (29, "aD"),
    ]
    for id, iframe_bid in checkboxes:

        # try to click on checkbox
        checkbox = get_checkbox(obs, id)
        bid = checkbox.get(BID_ATTR)

        # iframe bid should match
        assert re.match(f"^{iframe_bid}[0-9]+$", bid)

        action = f"""
        click({repr(bid)})
        """

        obs, reward, terminated, truncated, info = env.step(action)
        assert not obs["last_action_error"]

        # checkbox should get checked
        checkbox = get_checkbox(obs, id)
        assert checkbox.has_attr("checked")

    env.close()
