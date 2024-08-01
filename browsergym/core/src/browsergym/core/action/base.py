import playwright.sync_api
from abc import ABC, abstractmethod


class AbstractActionSet(ABC):
    def __init__(self, strict: bool = False):
        self.strict = strict

    @abstractmethod
    def describe(self, with_long_description: bool = True, with_examples: bool = True) -> str:
        """
        Returns a textual description of this action space.
        """

    @abstractmethod
    def example_action(self, abstract: bool) -> str:
        """
        Returns an example action as a string.
        """

    @abstractmethod
    def to_python_code(self, action) -> str:
        """
        Converts the given action to browsergym-compatible python code.

        Args:
            action: the action to convert.

        Returns:
            Executable python code that performs the action in a browsergym environment.
        """


def execute_python_code(
    code: str,
    page: playwright.sync_api.Page,
    send_message_to_user: callable,
    report_infeasible_instructions: callable,
):
    """
    Executes Python code in a new context, except for a playwright `page` object and a `send_message_to_user` function.

    WARNING: this is not safe!
    https://stackoverflow.com/questions/77655440/can-you-protect-a-python-variable-with-exec

    Args:
        code: the Python code to execute, as a string.
        page: the playwright page that will be made accessible to the code.
        send_message_to_user: utility function that will be made accessible to the code. It should take one text argument.
        report_infeasible_instructions: utility function that will be made accessible to the code. It should take one text argument.
    """

    globals = {
        "page": page,
        "send_message_to_user": send_message_to_user,
        "report_infeasible_instructions": report_infeasible_instructions,
    }

    exec(code, globals)
