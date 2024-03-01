import os
import pytest
import time
import gymnasium as gym

# register gym environments
import browsergym.miniwob

# bugfix: use same playwright instance in browsergym and pytest
from utils import setup_playwright

from browsergym.miniwob.all import (
    ClickButtonTask,
    ClickOptionTask,
    DrawLineTask,
    LoginUserTask,
)

__SLOW_MO = 1000 if "DISPLAY_BROWSER" in os.environ else None
__HEADLESS = False if "DISPLAY_BROWSER" in os.environ else True

TASKS = [ClickButtonTask, ClickOptionTask, DrawLineTask, LoginUserTask]


@pytest.mark.parametrize("task_cls", TASKS)
def test_validate_teardown(task_cls):
    pw = browsergym.core._get_global_playwright()

    browser = pw.chromium.launch(headless=__HEADLESS, slow_mo=__SLOW_MO)
    context = browser.new_context()
    page = context.new_page()

    task = task_cls()
    task.setup(seed=42, page=page)

    reward, done, msg, info = task.validate(page, [])

    assert done is False

    task.teardown()

    context.close()
    browser.close()


@pytest.mark.parametrize("task_cls", TASKS)
def test_episode_max_time(task_cls):
    pw = browsergym.core._get_global_playwright()

    browser = pw.chromium.launch(headless=__HEADLESS, slow_mo=__SLOW_MO)
    context = browser.new_context()
    page = context.new_page()

    task = task_cls(episode_max_time=0.2)
    task.setup(seed=42, page=page)

    time.sleep(0.5)

    reward, done, msg, info = task.validate(page, [])

    assert done is True
    assert reward == 0

    task.teardown()

    context.close()
    browser.close()


@pytest.mark.parametrize("task_cls", TASKS)
def test_remove_human_display(task_cls):
    pw = browsergym.core._get_global_playwright()

    browser = pw.chromium.launch(headless=__HEADLESS, slow_mo=__SLOW_MO)

    # remove display

    context = browser.new_context()
    page = context.new_page()

    task = task_cls(remove_human_display=True)
    task.setup(seed=42, page=page)

    for element_id in ["reward-display", "click-canvas", "sync-task-cover"]:
        element_in_dom = page.evaluate(f"!!document.getElementById('{element_id}')")
        assert not element_in_dom

    assert page.evaluate(f"document.getElementById('query').innerHTML") == ""

    for element_id in ["wrap", "area"]:
        element_in_dom = page.evaluate(f"!!document.getElementById('{element_id}')")
        assert element_in_dom

    task.teardown()

    context.close()

    # keep display

    context = browser.new_context()
    page = context.new_page()

    task = task_cls(remove_human_display=False)
    task.setup(seed=42, page=page)

    for element_id in ["reward-display", "click-canvas", "sync-task-cover"]:
        element_in_dom = page.evaluate(f"!!document.getElementById('{element_id}')")
        assert element_in_dom

    assert page.evaluate(f"document.getElementById('query').innerHTML") != ""

    for element_id in ["wrap", "area"]:
        element_in_dom = page.evaluate(f"!!document.getElementById('{element_id}')")
        assert element_in_dom

    task.teardown()

    context.close()
    browser.close()


@pytest.mark.skip(reason="TODO: how to get the final viewport size right?")
@pytest.mark.parametrize("task_cls", TASKS)
def test_viewport(task_cls):
    env = gym.make(
        f"browsergym/{task_cls.get_task_id()}",
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
    )
    obs, info = env.reset(seed=42)

    screenshot = obs["screenshot"]

    # 3D array (height, width, rgb) of unsigned bytes (between 0 and 255)
    # Miniwob viewport should be (320x500)
    assert screenshot.shape[0] == 320
    assert screenshot.shape[1] == 500
    assert screenshot.shape[2] == 3  # RGB

    env.close()
