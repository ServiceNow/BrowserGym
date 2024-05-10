import ast
import pyparsing as pp

from dataclasses import dataclass
from typing import Any


@dataclass
class NamedArgument:
    name: str
    value: Any

    def __repr__(self):
        return f"{self.name}={repr(self.value)}"


def _build_highlevel_action_parser() -> pp.ParserElement:
    """
    Returns:
        An action parser that accepts Python-like function calls with string, number, list or dict literals as arguments.
        Example:
            func("a", 42, None, True, [2, 4, "s"], {"a_key": "a_value"}, )
        The parser is loose and accepts multi-line or single-line combinations af calls.
        Example:
            func() func()
            \tfunc()
        Python comments are ignored.
        Example:
            # this is a comment
            func()    # this function call will be parsed
            # func()  # this one will not
        The parser will return a list of (function_name, function_args) tuples, one for each function call in the input.
        The parser will raise exceptions

    """

    def make_keyword(kwd_str, kwd_value):
        return pp.Keyword(kwd_str).set_parse_action(pp.replace_with(kwd_value))

    TRUE = make_keyword("True", True)
    FALSE = make_keyword("False", False)
    NONE = make_keyword("None", None)

    LBRACK, RBRACK, LBRACE, RBRACE, LPAREN, RPAREN, COLON = map(pp.Suppress, "[]{}():")

    def literal_eval(toks):
        return ast.literal_eval(toks[0])

    string = pp.python_quoted_string().set_parse_action(literal_eval)
    number = pp.pyparsing_common.number()
    dict = pp.Forward().set_name("dict")  # will be defined later
    list = pp.Forward().set_name("list")  # will be defined later
    _tuple = pp.Forward().set_name("tuple")  # will be defined later
    element = (string | number | dict | list | _tuple | TRUE | FALSE | NONE).set_name("element")

    list_items = pp.DelimitedList(element, allow_trailing_delim=True).set_name(None)
    list << pp.Group(LBRACK + pp.Optional(list_items) + RBRACK, aslist=True)
    _tuple << pp.Group(LPAREN + pp.Optional(list_items) + RPAREN, aslist=True).set_parse_action(
        lambda tokens: tuple(tokens[0])
    )

    dict_item = pp.Group(string + COLON + element, aslist=True).set_name("dict item")
    dict_items = pp.DelimitedList(dict_item, allow_trailing_delim=True).set_name(None)
    dict << pp.Dict(LBRACE + pp.Optional(dict_items) + RBRACE, asdict=True)

    arg = element
    list_args = pp.DelimitedList(arg, allow_trailing_delim=True).set_name(None)
    named_arg = (pp.pyparsing_common.identifier() + pp.Literal("=") + element).set_parse_action(
        lambda tokens: NamedArgument(name=tokens[0], value=tokens[2])
    )
    list_named_args = pp.DelimitedList(named_arg, allow_trailing_delim=True).set_name(None)
    function_call = pp.pyparsing_common.identifier() + pp.Group(
        LPAREN + pp.Optional(list_args) + pp.Optional(list_named_args) + RPAREN, aslist=True
    )

    multiple_function_calls = pp.DelimitedList(pp.Group(function_call), delim="")
    multiple_function_calls.ignore(pp.python_style_comment())

    parser = multiple_function_calls

    return parser


# this one will be used to extract python-like function calls
highlevel_action_parser: pp.ParserElement = _build_highlevel_action_parser()

# this one will be used to process the docstring in high-level actions, in order to describe the action space
action_docstring_parser: pp.ParserElement = (
    pp.Group(pp.OneOrMore(pp.Word(pp.printables), stop_on=pp.Literal("Examples:")))
    + pp.Literal("Examples:").suppress()
    + pp.Group(highlevel_action_parser)
)
