from ui_assist.agents import dynamic_prompting
import pytest

from ui_assist.utils.llm_utils import count_tokens


html_template = """
<html>
<body>
<div>
Hello World.
Step {}.
</div>
</body>
some extra text to make the html longer
</html>
"""

OBS_HISTORY = [
    {
        "goal": "do this and that",
        "chat_messages": [{"role": "user", "message": "do this and that"}],
        "pruned_html": html_template.format(1),
        "axtree_txt": "[1] Click me",
        "last_action_error": "",
    },
    {
        "goal": "do this and that",
        "chat_messages": [{"role": "user", "message": "do this and that"}],
        "pruned_html": html_template.format(2),
        "axtree_txt": "[1] Click me",
        "last_action_error": "Hey, this is an error in the past",
    },
    {
        "goal": "do this and that",
        "chat_messages": [{"role": "user", "message": "do this and that"}],
        "pruned_html": html_template.format(3),
        "axtree_txt": "[1] Click me",
        "last_action_error": "Hey, there is an error now",
    },
]
ACTIONS = ["click('41')", "click('42')"]
MEMORIES = ["memory A", "memory B"]

ALL_TRUE_FLAGS = dynamic_prompting.Flags(
    use_html=True,
    use_ax_tree=True,
    use_plan=True,
    use_criticise=True,
    use_thinking=True,
    use_error_logs=True,
    use_past_error_logs=True,
    use_history=True,
    use_action_history=True,
    use_memory=True,
    use_diff=True,
    html_type="pruned_html",
    use_concrete_example=True,
    use_abstract_example=True,
    multi_actions=True,
    use_screenshot=False,
)


FLAG_EXPECTED_PROMPT = [
    (
        "use_html",
        ("HTML:", "</html>", "Hello World.", "Step 1."),
    ),
    (
        "use_ax_tree",
        ("AXTree:", "Click me"),
    ),
    (
        "use_error_logs",
        ("Hey, there is an error now",),
    ),
    (
        "use_plan",
        ("You just executed step", "1- think\n2- do it"),
    ),
    (
        "use_criticise",
        (
            "Criticise action_draft",
            "<criticise>",
            "</criticise>",
            "<action_draft>",
        ),
    ),
    (
        "use_thinking",
        ("<think>", "</think>"),
    ),
    (
        "use_past_error_logs",
        ("Hey, this is an error in the past",),
    ),
    (
        "use_action_history",
        ("Action:", "click('41')", "click('42')"),
    ),
    (
        "use_memory",
        ("<memory>", "</memory>", "memory A", "memory B"),
    ),
    (
        "use_diff",
        ("diff:", "- Step 2", "Identical"),
    ),
    (
        "use_concrete_example",
        ("# Concrete Example", "<action>\nfill('237', 'example value')"),
    ),
    (
        "use_abstract_example",
        ("# Abstract Example",),
    ),
    (
        "multi_actions",
        ("One or several actions, separated by new lines",),
    ),
]


def test_shrinking_observation():
    flags = dynamic_prompting.Flags(use_ax_tree=True, use_html=True, use_screenshot=False)
    prompt_maker = dynamic_prompting.MainPrompt(
        obs_history=OBS_HISTORY,
        actions=ACTIONS,
        memories=MEMORIES,
        previous_plan="1- think\n2- do it",
        step=2,
        flags=flags,
    )

    prompt = prompt_maker.prompt
    new_prompt = dynamic_prompting.fit_tokens(
        prompt_maker, max_prompt_tokens=count_tokens(prompt) - 1, max_iterations=7
    )
    assert count_tokens(new_prompt) < count_tokens(prompt)
    assert "[1] Click me" in prompt
    assert "[1] Click me" in new_prompt
    assert "</html>" in prompt
    assert "</html>" not in new_prompt


@pytest.mark.parametrize("flag, expected_prompts", FLAG_EXPECTED_PROMPT)
def test_main_prompt_elements_gone_one_at_a_time(flag, expected_prompts):
    # Disable the flag
    flags = ALL_TRUE_FLAGS.copy()
    setattr(flags, flag, False)

    # Initialize MainPrompt
    prompt = dynamic_prompting.MainPrompt(
        obs_history=OBS_HISTORY,
        actions=ACTIONS,
        memories=MEMORIES,
        previous_plan="1- think\n2- do it",
        step=2,
        flags=flags,
    ).prompt

    # Verify all elements are not present
    for expected in expected_prompts:
        assert expected not in prompt


def test_main_prompt_elements_present():
    # Make sure the flag is enabled

    # Initialize MainPrompt
    prompt = dynamic_prompting.MainPrompt(
        obs_history=OBS_HISTORY,
        actions=ACTIONS,
        memories=MEMORIES,
        previous_plan="1- think\n2- do it",
        step=2,
        flags=ALL_TRUE_FLAGS,
    ).prompt

    # Verify all elements are not present
    for _, expected_prompts in FLAG_EXPECTED_PROMPT:
        for expected in expected_prompts:
            assert expected in prompt


if __name__ == "__main__":
    # for debugging
    test_shrinking_observation()
    test_main_prompt_elements_present()
    for flag, expected_prompts in FLAG_EXPECTED_PROMPT:
        test_main_prompt_elements_gone_one_at_a_time(flag, expected_prompts)
