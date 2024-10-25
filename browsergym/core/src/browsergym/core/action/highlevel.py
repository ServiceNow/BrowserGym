import inspect
import random
import typing
from dataclasses import dataclass

from . import utils
from .base import AbstractActionSet
from .functions import (  # check,; uncheck,
    clear,
    click,
    dblclick,
    drag_and_drop,
    fill,
    focus,
    go_back,
    go_forward,
    goto,
    hover,
    keyboard_down,
    keyboard_insert_text,
    keyboard_press,
    keyboard_type,
    keyboard_up,
    mouse_click,
    mouse_dblclick,
    mouse_down,
    mouse_drag_and_drop,
    mouse_move,
    mouse_up,
    mouse_upload_file,
    new_tab,
    noop,
    press,
    report_infeasible,
    scroll,
    select_option,
    send_msg_to_user,
    tab_close,
    tab_focus,
    upload_file,
)
from .parsers import action_docstring_parser, highlevel_action_parser

ACTION_SUBSETS = {
    "chat": [send_msg_to_user],
    "infeas": [report_infeasible],
    "bid": [
        scroll,
        fill,
        # These are not really needed and might pollute the action space, doing more harm than good
        # check,
        # uncheck,
        select_option,
        click,
        dblclick,
        hover,
        press,
        focus,
        clear,
        drag_and_drop,
        upload_file,
    ],
    "coord": [
        scroll,
        mouse_move,
        mouse_up,
        mouse_down,
        mouse_click,
        mouse_dblclick,
        mouse_drag_and_drop,
        mouse_upload_file,
        keyboard_down,
        keyboard_up,
        keyboard_press,
        keyboard_type,
        keyboard_insert_text,
    ],
    "nav": [go_back, go_forward, goto],
    "tab": [
        tab_close,
        tab_focus,
        new_tab,
    ],
    # adapted from MiniWoB repo
    # https://github.com/Farama-Foundation/miniwob-plusplus/blob/1bab0dffe34e92cc1049fe9443542029bf7e44a9/miniwob/action.py#L122
    "miniwob_all": [
        mouse_move,  # MOVE_COORDS
        mouse_click,  # CLICK_COORDS
        mouse_dblclick,  # DBLCLICK_COORDS
        mouse_down,  # MOUSEDOWN_COORDS
        mouse_up,  # MOUSEUP_COORDS
        scroll,  # SCROLL_UP_COORDS, SCROLL_DOWN_COORDS
        click,  # CLICK_ELEMENT
        keyboard_press,  # PRESS_KEY
        keyboard_type,  # TYPE_TEX (and substitute for TYPE_FIELD()
        fill,  # FOCUS_ELEMENT_AND_TYPE_TEXT (and substitute for FOCUS_ELEMENT_AND_TYPE_FIELD)
    ],
    # adapted from MiniWoB repo
    # https://github.com/Farama-Foundation/miniwob-plusplus/blob/1bab0dffe34e92cc1049fe9443542029bf7e44a9/miniwob/action.py#L142
    "miniwob_shi17": [
        mouse_click,  # CLICK_COORDS
        mouse_dblclick,  # DBLCLICK_COORDS
        mouse_down,  # MOUSEDOWN_COORDS
        mouse_up,  # MOUSEUP_COORDS
        scroll,  # SCROLL_UP_COORDS, SCROLL_DOWN_COORDS
        keyboard_press,  # PRESS_KEY
    ],
    # adapted from MiniWoB repo
    # https://github.com/Farama-Foundation/miniwob-plusplus/blob/1bab0dffe34e92cc1049fe9443542029bf7e44a9/miniwob/action.py#L160
    "miniwob_liu18": [
        click,  # CLICK_ELEMENT
        fill,  # substitute for FOCUS_ELEMENT_AND_TYPE_FIELD
    ],
    # adapted from MiniWoB repo
    # https://github.com/Farama-Foundation/miniwob-plusplus/blob/1bab0dffe34e92cc1049fe9443542029bf7e44a9/miniwob/action.py#L173
    "miniwob_humphreys22": [
        mouse_move,  # MOVE_COORDS
        mouse_click,  # CLICK_COORDS
        mouse_dblclick,  # DBLCLICK_COORDS
        mouse_down,  # MOUSEDOWN_COORDS
        mouse_up,  # MOUSEUP_COORDS
        scroll,  # SCROLL_UP_COORDS, SCROLL_DOWN_COORDS
        keyboard_press,  # PRESS_KEY
        keyboard_type,  # substitute for TYPE_FIELD
    ],
    # from webarena paper
    # https://arxiv.org/abs/2307.13854
    "webarena": [
        click,  # click(elem)
        hover,  # hover(elem)
        fill,  # type(elem, text)
        keyboard_press,  # press(key_comb)
        scroll,  # scroll(dir)
        tab_focus,  # tab_focus(index)
        new_tab,  # new_tab()
        tab_close,  # tab_close()
        go_back,  # go_back()
        go_forward,  # go_forward()
        goto,  # goto(url)
        send_msg_to_user,  #
        report_infeasible,  # explicit unachievable action, equivalent to "N/A" answer
    ],
    # from visualwebarena paper
    # https://arxiv.org/abs/2401.13649
    "visualwebarena": [
        click,  # click(elem)
        hover,  # hover(elem)
        fill,  # type(elem, text)
        keyboard_press,  # press(key_comb)
        scroll,  # scroll(dir)
        tab_focus,  # tab_focus(index)
        new_tab,  # new_tab()
        tab_close,  # tab_close()
        go_back,  # go_back()
        go_forward,  # go_forward()
        goto,  # goto(url)
        send_msg_to_user,  # stop(answer)
        report_infeasible,  # explicit unachievable action, equivalent to "N/A" answer
        upload_file,  #
    ],
    # from workarena paper
    # https://arxiv.org/abs/2403.07718
    "workarena": [
        scroll,
        fill,
        select_option,
        click,
        dblclick,
        hover,
        press,
        focus,
        clear,
        drag_and_drop,
        send_msg_to_user,
    ],
    # from workarena++ paper
    # https://arxiv.org/abs/2407.05291
    "workarena++": [
        scroll,
        fill,
        select_option,
        click,
        dblclick,
        hover,
        press,
        focus,
        clear,
        drag_and_drop,
        tab_focus,
        new_tab,
        tab_close,
        go_back,
        go_forward,
        goto,
        send_msg_to_user,
        report_infeasible,
    ],
    # from weblinx_browsergym
    # https://github.com/McGill-NLP/agentlab-weblinx-mvp/blob/a91b6d19870c5187d252e70a2e2013511cc6f1d2/weblinx_browsergym/__init__.py#L274-L286
    "weblinx": [
        send_msg_to_user,  # say(speaker="assistant", utterance=[str]) -> send_msg_to_user(text=[str])
        click,  # click(uid=[element id]) -> click(bid=[element id])
        hover,  # hover(uid=[element id]) -> hover(bid=[element id])
        fill,  # textinput(uid=[element id], value=[str]) -> fill(bid=[element id], value=[str])
        # change(uid=[element], value=[str]) -> ❌
        goto,  # load(url=[link]) -> goto(url=[link])
        # submit(uid=[element]) -> click(bid=[element id])
        scroll,  # scroll(x=[int x],y=[int y]) -> scroll(delta_x=[int x], delta_y=[int y])
        # copy(uid=[element],text=[str]) -> ❌
        # paste(uid=[element],text=[str]) -> ❌
        new_tab,  # tabcreate() -> new_tab()
        tab_close,  # tabremove(target=[tabId]) -> tab_close()
        tab_focus,  # tabswitch(origin=[origin tabId],target=[target tabId]) -> tab_focus(index=[target tabid])
    ],
}


@dataclass
class HighLevelAction:
    # entrypoint: callable
    signature: str
    description: str
    examples: list[str]


class HighLevelActionSet(AbstractActionSet):

    # static class variables
    ActionSubset = typing.Literal[
        "chat",
        "infeas",
        "bid",
        "coord",
        "nav",
        "tab",
        "miniwob_all",
        "miniwob_shi17",
        "miniwob_liu18",
        "miniwob_humphreys22",
        "webarena",
        "visualwebarena",
        "workarena",
        "workarena++",
        "weblinx",
        "custom",
    ]
    DemoMode = typing.Literal["off", "default", "all_blue", "only_visible_elements"]

    def __init__(
        self,
        subsets: typing.Optional[ActionSubset | list[ActionSubset]] = [
            "chat",
            "infeas",
            "bid",
            "nav",
            "tab",
        ],
        custom_actions: typing.Optional[list[callable]] = None,
        multiaction: bool = True,
        demo_mode: typing.Optional[DemoMode] = None,
        strict: bool = False,
        retry_with_force: bool = False,
    ):
        super().__init__(strict)
        self.multiaction = multiaction
        self.demo_mode = demo_mode
        self.retry_with_force = retry_with_force

        if not subsets:
            raise ValueError(f"'action_subsets' is empty.")

        if isinstance(subsets, str):
            subsets = [subsets]

        allowed_actions = [noop]  # the noop action is always allowed

        # add actions from specified action sets
        if subsets:
            for subset in subsets:
                if subset in ACTION_SUBSETS:
                    allowed_actions.extend(ACTION_SUBSETS[subset])
                elif subset == "custom":
                    if not custom_actions:
                        raise ValueError(
                            "'custom' is in 'action_subsets' but 'custom_actions' is empty."
                        )
                    allowed_actions.extend(custom_actions)
                else:
                    raise ValueError(f"Unknown high-level action subspace: {subset}")

        # like set() but preserves order
        # https://stackoverflow.com/questions/1653970/does-python-have-an-ordered-set
        allowed_actions = list(dict.fromkeys(allowed_actions).keys())

        # parse the actions and build the action space
        self.action_set: dict[str, HighLevelAction] = {}
        self.python_includes = ""

        # include playwright imports
        self.python_includes += f"""\
import playwright.sync_api
from typing import Literal


"""
        # set demo_mode and retry_with_force flags
        self.python_includes += f"""\
demo_mode={repr(demo_mode)}
retry_with_force={repr(retry_with_force)}

if demo_mode is None:
    demo_mode = "default" if DEMO_MODE else "off"

"""

        # include utility functions
        for _, func in inspect.getmembers(utils, inspect.isfunction):
            self.python_includes += f"""\
{inspect.getsource(func)}


"""

        # parse and include action functions
        for func in allowed_actions:

            # include action function definition in the code
            self.python_includes += f"""\
{inspect.getsource(func)}


"""

            # extract action signature
            signature = f"{func.__name__}{inspect.signature(func)}"

            # parse docstring
            description, examples = action_docstring_parser.parse_string(func.__doc__)

            # reconstruct action description
            description = " ".join(description)

            # reconstruct action examples
            examples = [
                function_name + "(" + ", ".join([repr(arg) for arg in function_args]) + ")"
                for function_name, function_args in examples
            ]

            if func.__name__ in self.action_set:
                raise ValueError(f"Duplicated action '{func.__name__}'")

            self.action_set[func.__name__] = HighLevelAction(
                # entrypoint=func,
                signature=signature,
                description=description,
                examples=examples,
            )

    def example_action(self, abstract: bool, max_examples: int = 3) -> str:
        """
        Returns an example action as a string.
        """
        if abstract:
            if self.multiaction:
                return """\
One or several actions, separated by new lines."""
            else:
                return """\
One single action to be executed. You can only use one action at a time."""
        else:
            picked_examples = []

            # use fill and click examples if action is present
            for action_name in ["fill", "click", "mouse_click", "keyboard_type"]:
                if action_name in self.action_set:
                    picked_examples.extend(self.action_set[action_name].examples)

            # last resort, use all action examples
            if not picked_examples:
                for _, action in self.action_set.items():
                    picked_examples += action.examples

            # shuffle examples
            rng = random.Random(1)
            rng.shuffle(picked_examples)

            if self.multiaction:
                return "\n".join(picked_examples[:max_examples])
            else:
                return picked_examples[0]

    def describe(self, with_long_description: bool = True, with_examples: bool = True):
        """
        Returns a textual description of this action space.
        """
        description = f"""
{len(self.action_set)} different types of actions are available.

"""
        for _, action in self.action_set.items():
            description += f"""\
{action.signature}
"""

            if with_long_description:
                description += f"""\
    Description: {action.description}
"""
            if with_examples and action.examples:
                description += f"""\
    Examples:
"""
                for example in action.examples:
                    description += f"""\
        {example}

"""

        if self.multiaction:
            description += f"""\
Multiple actions can be provided at once, but will be executed sequentially without any feedback from the page.
More than 2-3 actions usually leads to failure or unexpected behavior."""
        else:
            description += f"""\
Only a single action can be provided at once."""

        example_action = self.example_action(abstract=False)
        if example_action:
            description += f""" Example:
{example_action}
"""
        else:
            description += f"""\

"""

        return description

    def to_python_code(self, action):
        """
        Converts the given high-level action string to browsergym-compatible python code.

        Args:
            action: the high-level action to parse.

        Returns:
            Executable python code that performs the action in a browsergym environment.
        """
        highlevel_code = action

        # do the actual parsing and convert each high-level action to
        # the corresponding python function call
        if self.strict:
            function_calls = highlevel_action_parser.parse_string(highlevel_code, parse_all=True)
            function_calls = function_calls.as_list()
        else:
            function_calls = highlevel_action_parser.search_string(
                highlevel_code
            )  # allow for multiple matches, skip anything in-between
            function_calls = sum(function_calls.as_list(), [])  # unpack multiple matches

        if not function_calls:
            raise ValueError("Received an empty action.")
        elif len(function_calls) > 1 and not self.multiaction:
            raise ValueError("Received a multi-action, only single-actions are allowed.")

        python_code = ""

        # function definitions
        python_code += self.python_includes

        # function calls
        for function_name, function_args in function_calls:
            if function_name not in self.action_set:
                raise NameError(f"Invalid action type '{function_name}'.")
            python_code += (
                function_name + "(" + ", ".join([repr(arg) for arg in function_args]) + ")\n"
            )

        # return the constructed python code
        return python_code


# consistency checks
assert "custom" not in ACTION_SUBSETS
assert set(typing.get_args(HighLevelActionSet.ActionSubset)) == set(
    list(ACTION_SUBSETS.keys()) + ["custom"]
)
