import os

import browsergym.miniwob  # register gym environments
import gymnasium as gym
import pytest

__SLOW_MO = 1000 if "DISPLAY_BROWSER" in os.environ else None
__HEADLESS = False if "DISPLAY_BROWSER" in os.environ else True


@pytest.mark.parametrize("seed", range(5))
def test_wrong_card_partial_reward_is_not_success(seed):
    env = gym.make(
        "browsergym/miniwob.find-greatest",
        headless=__HEADLESS,
        slow_mo=__SLOW_MO,
        action_mapping=None,
    )

    try:
        env.reset(seed=seed)
        _, reward, terminated, truncated, info = env.step(
            """
cards = page.locator(".card")
values = cards.locator(".card-value").all_text_contents()
wrong_index = min(range(len(values)), key=lambda index: int(values[index]))
cards.nth(wrong_index).click()
page.get_by_role("button", name="Submit").click()
"""
        )

        assert info["task_info"]["RAW_REWARD_GLOBAL"] == 0.1
        assert reward == 0.0
        assert terminated is True
        assert truncated is False
    finally:
        env.close()
