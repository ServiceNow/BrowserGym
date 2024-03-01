# these are placeholders
# all these symbols will be available in browsergym actions
import playwright.sync_api
from typing import Literal

from .utils import (
    add_demo_mode_effects,
    check_for_overlay,
    get_elem_by_bid,
    highlight_by_box,
    smooth_move_visual_cursor_to,
)

page: playwright.sync_api.Page = None
send_message_to_user: callable = None
demo_mode: Literal["off", "default", "only_visible_elements"] = "off"

"""IMPORTANT
The following primitives are meant to be included in the browsergym action using
inspect.getsource().
"""


def send_msg_to_user(text: str):
    """
    Sends a message to the user.

    Examples:
        send_msg_to_user("Based on the results of my search, the city was built in 1751.")
    """
    send_message_to_user(text)


def noop(wait_ms: float = 1000):
    """
    Do nothing, and optionally wait for the given time (in milliseconds).

    Examples:
        noop()
        noop(500)
    """
    page.wait_for_timeout(wait_ms)


# https://playwright.dev/docs/input#text-input
def fill(bid: str, value: str):
    """
    Fill out a form field. It focuses the element and triggers an input event with the entered text.
    It works for <input>, <textarea> and [contenteditable] elements.

    Examples:
        fill('237', 'example value')
        fill('45', "multi-line\\nexample")
        fill('32-12', "example with \\"quotes\\"")
    """
    elem = get_elem_by_bid(page, bid, demo_mode)
    if demo_mode != "off":
        add_demo_mode_effects(page, elem, bid, demo_mode_type=demo_mode, move_cursor=False)
        elem.clear()
        delay = max(2000 / len(value), 10)
        elem.type(value, delay=delay)
    else:
        elem.fill(value)


# https://playwright.dev/python/docs/api/class-locator#locator-check
def check(bid: str):
    """
    Ensure a checkbox or radio element is checked.

    Examples:
        check('55')
    """
    elem = get_elem_by_bid(page, bid, demo_mode)
    if demo_mode != "off":
        add_demo_mode_effects(page, elem, bid, demo_mode_type=demo_mode, move_cursor=True)
    elem.check()


# https://playwright.dev/python/docs/api/class-locator#locator-uncheck
def uncheck(bid: str):
    """
    Ensure a checkbox or radio element is unchecked.

    Examples:
        uncheck('65-5289')
    """
    elem = get_elem_by_bid(page, bid, demo_mode)
    if demo_mode != "off":
        add_demo_mode_effects(page, elem, bid, demo_mode_type=demo_mode, move_cursor=True)
    elem.uncheck()


# https://playwright.dev/docs/input#select-options
def select_option(bid: str, options: str | list[str]):
    """
    Select one or multiple options in a <select> element. You can specify
    option value or label to select. Multiple options can be selected.

    Examples:
        select_option('48', "blue")
        select_option('48', ["red", "green", "blue"])
    """
    elem = get_elem_by_bid(page, bid, demo_mode)
    if demo_mode != "off":
        add_demo_mode_effects(page, elem, bid, demo_mode_type=demo_mode, move_cursor=False)
    elem.select_option(options)


# https://playwright.dev/python/docs/api/class-locator#locator-click
def click(
    bid: str,
    button: Literal["left", "middle", "right"] = "left",
    modifiers: list[Literal["Alt", "Control", "Meta", "Shift"]] = [],
):
    """
    Click an element.

    Examples:
        click('51')
        click('69-2', button="right")
        click('48', button="middle", modifiers=["Shift"])
    """
    elem = get_elem_by_bid(page, bid, demo_mode)
    if demo_mode != "off":
        add_demo_mode_effects(page, elem, bid, demo_mode_type=demo_mode, move_cursor=True)

    elem.click(button=button, modifiers=modifiers)


# https://playwright.dev/python/docs/api/class-locator#locator-dblclick
def dblclick(
    bid: str,
    button: Literal["left", "middle", "right"] = "left",
    modifiers: list[Literal["Alt", "Control", "Meta", "Shift"]] = [],
):
    """
    Double click an element.

    Examples:
        dblclick('12')
        dblclick('289-5-42', button="right")
        dblclick('178', button="middle", modifiers=["Shift"])
    """
    elem = get_elem_by_bid(page, bid, demo_mode)
    if demo_mode != "off":
        add_demo_mode_effects(page, elem, bid, demo_mode_type=demo_mode, move_cursor=True)
    elem.dblclick(button=button, modifiers=modifiers, force=True)


# https://playwright.dev/python/docs/api/class-locator#locator-hover
def hover(bid: str):
    """
    Hover over an element.

    Examples:
        hover('12-8')
    """
    elem = get_elem_by_bid(page, bid, demo_mode)
    if demo_mode != "off":
        box = elem.bounding_box()
        if box:
            center_x, center_y = box["x"] + box["width"] / 2, box["y"] + box["height"] / 2
            smooth_move_visual_cursor_to(page, center_x, center_y)
    elem.hover()


# https://playwright.dev/python/docs/input#keys-and-shortcuts
def press(bid: str, key_comb: str):
    """
    Focus the matching element and press a combination of keys. It accepts
    the logical key names that are emitted in the keyboardEvent.key property
    of the keyboard events: Backquote, Minus, Equal, Backslash, Backspace,
    Tab, Delete, Escape, ArrowDown, End, Enter, Home, Insert, PageDown, PageUp,
    ArrowRight, ArrowUp, F1 - F12, Digit0 - Digit9, KeyA - KeyZ, etc. You can
    alternatively specify a single character you'd like to produce such as "a"
    or "#". Following modification shortcuts are also supported: Shift, Control,
    Alt, Meta.

    Examples:
        press('88', 'Backspace')
        press('48-6', 'Control+a')
        press('48-6', 'Meta+Shift+t')
    """
    elem = get_elem_by_bid(page, bid, demo_mode)
    if demo_mode != "off":
        add_demo_mode_effects(page, elem, bid, demo_mode_type=demo_mode, move_cursor=False)
    elem.press(key_comb)


# https://playwright.dev/python/docs/api/class-locator#locator-focus
def focus(bid: str):
    """
    Focus the matching element.

    Examples:
        focus('87-455')
    """
    elem = get_elem_by_bid(page, bid, demo_mode)
    if demo_mode != "off":
        add_demo_mode_effects(page, elem, bid, demo_mode_type=demo_mode, move_cursor=False)
    elem.focus()


# https://playwright.dev/python/docs/api/class-locator#locator-clear
def clear(bid: str):
    """
    Clear the input field.

    Examples:
        clear('996')
    """
    elem = get_elem_by_bid(page, bid, demo_mode)
    if demo_mode != "off":
        add_demo_mode_effects(page, elem, bid, demo_mode_type=demo_mode, move_cursor=False)
    elem.clear()


# https://playwright.dev/python/docs/input#drag-and-drop
def drag_and_drop(from_bid: str, to_bid: str):
    """
    Perform a drag & drop. Hover the element that will be dragged. Press
    left mouse button. Move mouse to the element that will receive the
    drop. Release left mouse button.

    Examples:
        drag_and_drop('56', '498')
    """
    from_elem = get_elem_by_bid(page, from_bid, demo_mode)
    if demo_mode != "off":
        add_demo_mode_effects(page, from_elem, from_bid, move_cursor=True)
    from_elem.hover()
    page.mouse.down()

    to_elem = get_elem_by_bid(page, to_bid, demo_mode)
    if demo_mode != "off":
        add_demo_mode_effects(page, to_elem, to_bid, move_cursor=True)
    to_elem.hover()
    page.mouse.up()


# https://playwright.dev/python/docs/api/class-mouse#mouse-wheel
def scroll(delta_x: float, delta_y: float):
    """
    Scroll horizontally and vertically. Amounts in pixels. Dispatches a wheel event.

    Examples:
        scroll(0, 200)
        scroll(-50.2, -100.5)
    """
    page.mouse.wheel(delta_x, delta_y)


# https://playwright.dev/python/docs/api/class-mouse#mouse-move
def mouse_move(x: float, y: float):
    """
    Move the mouse to a location. Uses absolute client coordinates in pixels.
    Dispatches a mousemove event.

    Examples:
        mouse_move(65.2, 158.5)
    """
    if demo_mode != "off":
        smooth_move_visual_cursor_to(page, x, y)
    page.mouse.move(x, y)


# https://playwright.dev/python/docs/api/class-mouse#mouse-up
def mouse_up(x: float, y: float, button: Literal["left", "middle", "right"] = "left"):
    """
    Move the mouse to a location then release a mouse button. Dispatches
    mousemove and mouseup events.

    Examples:
        mouse_up(250, 120)
        mouse_up(47, 252, 'right')
    """
    if demo_mode != "off":
        smooth_move_visual_cursor_to(page, x, y)
        highlight_by_box(page, {"x": x, "y": y, "width": 1, "height": 1})
    page.mouse.move(x, y)
    page.mouse.up(button=button)


# https://playwright.dev/python/docs/api/class-mouse#mouse-down
def mouse_down(x: float, y: float, button: Literal["left", "middle", "right"] = "left"):
    """
    Move the mouse to a location then press and hold a mouse button. Dispatches
    mousemove and mousedown events.

    Examples:
        mouse_down(140.2, 580.1)
        mouse_down(458, 254.5, 'middle')
    """
    if demo_mode != "off":
        smooth_move_visual_cursor_to(page, x, y)
        highlight_by_box(page, {"x": x, "y": y, "width": 1, "height": 1})
    page.mouse.move(x, y)
    page.mouse.down(button=button)


# https://playwright.dev/python/docs/api/class-mouse#mouse-click
def mouse_click(x: float, y: float, button: Literal["left", "middle", "right"] = "left"):
    """
    Move the mouse to a location and click a mouse button. Dispatches mousemove,
    mousedown and mouseup events.

    Examples:
        mouse_click(887.2, 68)
        mouse_click(56, 712.56, 'right')
    """
    if demo_mode != "off":
        smooth_move_visual_cursor_to(page, x, y)
        highlight_by_box(page, {"x": x, "y": y, "width": 1, "height": 1})
    page.mouse.click(x, y, button=button)


# https://playwright.dev/python/docs/api/class-mouse#mouse-dblclick
def mouse_dblclick(x: float, y: float, button: Literal["left", "middle", "right"] = "left"):
    """
    Move the mouse to a location and double click a mouse button. Dispatches
    mousemove, mousedown and mouseup events.

    Examples:
        mouse_dblclick(5, 236)
        mouse_dblclick(87.5, 354, 'right')
    """
    if demo_mode != "off":
        smooth_move_visual_cursor_to(page, x, y)
        highlight_by_box(page, {"x": x, "y": y, "width": 1, "height": 1})
    page.mouse.dblclick(x, y, button=button)


def mouse_drag_and_drop(from_x: float, from_y: float, to_x: float, to_y: float):
    """
    Drag and drop from a location to a location. Uses absolute client
    coordinates in pixels. Dispatches mousemove, mousedown and mouseup
    events.

    Examples:
        mouse_drag_and_drop(10.7, 325, 235.6, 24.54)
    """
    if demo_mode != "off":
        x, y = from_x, from_y
        smooth_move_visual_cursor_to(page, x, y)
        highlight_by_box(page, {"x": x, "y": y, "width": 1, "height": 1})
    page.mouse.move(from_x, from_y)
    page.mouse.down()
    if demo_mode != "off":
        x, y = to_x, to_y
        smooth_move_visual_cursor_to(page, x, y)
        highlight_by_box(page, {"x": x, "y": y, "width": 1, "height": 1})
    page.mouse.move(to_x, to_y)
    page.mouse.up()


# https://playwright.dev/python/docs/api/class-keyboard#keyboard-press
def keyboard_press(key: str):
    """
    Press a combination of keys. Accepts the logical key names that are
    emitted in the keyboardEvent.key property of the keyboard events:
    Backquote, Minus, Equal, Backslash, Backspace, Tab, Delete, Escape,
    ArrowDown, End, Enter, Home, Insert, PageDown, PageUp, ArrowRight,
    ArrowUp, F1 - F12, Digit0 - Digit9, KeyA - KeyZ, etc. You can
    alternatively specify a single character you'd like to produce such
    as "a" or "#". Following modification shortcuts are also supported:
    Shift, Control, Alt, Meta.

    Examples:
        keyboard_press('Backspace')
        keyboard_press('Control+a')
        keyboard_press('Meta+Shift+t')
    """
    page.keyboard.press(key)


# https://playwright.dev/python/docs/api/class-keyboard#keyboard-up
def keyboard_up(key: str):
    """
    Release a keyboard key. Dispatches a keyup event. Accepts the logical
    key names that are emitted in the keyboardEvent.key property of the
    keyboard events: Backquote, Minus, Equal, Backslash, Backspace, Tab,
    Delete, Escape, ArrowDown, End, Enter, Home, Insert, PageDown, PageUp,
    ArrowRight, ArrowUp, F1 - F12, Digit0 - Digit9, KeyA - KeyZ, etc.
    You can alternatively specify a single character you'd like to produce
    such as "a" or "#".

    Examples:
        keyboard_up('Shift')
        keyboard_up('c')
    """
    page.keyboard.up(key)


# https://playwright.dev/python/docs/api/class-keyboard#keyboard-down
def keyboard_down(key: str):
    """
    Press and holds a keyboard key. Dispatches a keydown event. Accepts the
    logical key names that are emitted in the keyboardEvent.key property of
    the keyboard events: Backquote, Minus, Equal, Backslash, Backspace, Tab,
    Delete, Escape, ArrowDown, End, Enter, Home, Insert, PageDown, PageUp,
    ArrowRight, ArrowUp, F1 - F12, Digit0 - Digit9, KeyA - KeyZ, etc. You can
    alternatively specify a single character such as "a" or "#".

    Examples:
        keyboard_up('Shift')
        keyboard_up('c')
    """
    page.keyboard.down(key)


# https://playwright.dev/python/docs/api/class-keyboard#keyboard-type
def keyboard_type(text: str):
    """
    Types a string of text through the keyboard. Sends a keydown, keypress/input,
    and keyup event for each character in the text. Modifier keys DO NOT affect
    keyboard_type. Holding down Shift will not type the text in upper case.

    Examples:
        keyboard_type('Hello world!')
    """
    if demo_mode:
        delay = max(2000 / len(text), 10)
    else:
        delay = None
    page.keyboard.type(text, delay=delay)


# https://playwright.dev/python/docs/api/class-keyboard#keyboard-insert-text
def keyboard_insert_text(text: str):
    """
    Insert a string of text in the currently focused element. Dispatches only input
    event, does not emit the keydown, keyup or keypress events. Modifier keys DO NOT
    affect keyboard_insert_text. Holding down Shift will not type the text in upper
    case.

    Examples:
        keyboard_insert_text('Hello world!')
    """
    page.keyboard.insert_text(text)


# https://playwright.dev/python/docs/api/class-page#page-goto
def goto(url: str):
    """
    Navigate to a url.

    Examples:
        goto('http://www.example.com')
    """
    page.goto(url)


# https://playwright.dev/python/docs/api/class-page#page-go-back
def go_back():
    """
    Navigate to the previous page in history.

    Examples:
        go_back()
    """
    page.go_back()


# https://playwright.dev/python/docs/api/class-page#page-go-forward
def go_forward():
    """
    Navigate to the next page in history.

    Examples:
        go_forward()
    """
    page.go_forward()


# https://playwright.dev/python/docs/api/class-browsercontext#browser-context-new-page
def new_tab():
    """
    Open a new tab. It will become the active one.

    Examples:
        new_tab()
    """
    global page
    # set the new page as the active page
    page = page.context.new_page()
    # trigger the callback that sets this page as active in browsergym
    page.locate("html").dispatch_event("pageshow")


# https://playwright.dev/python/docs/api/class-page#page-close
def tab_close():
    """
    Close the current tab.

    Examples:
        tab_close()
    """
    global page
    context = page.context
    page.close()
    # set most recent page as active page, or open a new page if needed
    if context.pages:
        # TODO: do something more elaborate? (active page history)
        page = context.pages[-1]
    else:
        page = context.new_page()
    # trigger the callback that sets this page as active in browsergym
    page.locate("html").dispatch_event("pageshow")


# https://playwright.dev/python/docs/api/class-page#page-bring-to-front
def tab_focus(index: int):
    """
    Bring tab to front (activate tab).

    Examples:
        tab_focus(2)
    """
    global page  # set the focused page as the active page
    page = page.context.pages[index]
    # trigger the callback that sets this page as active in browsergym
    page.locate("html").dispatch_event("pageshow")
