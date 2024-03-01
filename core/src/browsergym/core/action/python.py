import re

from .base import AbstractActionSet


class PythonActionSet(AbstractActionSet):
    def describe(self, with_long_description: bool = True, with_examples: bool = True):
        """
        Returns a textual description of this action space.
        """
        description = f"""
Each action consists of executable Python code (python>=3.10) that uses the Playwright library (playwright==1.32)
to interact with the current webpage and the browser context. The currently active webpage is accessible via the
global variable `page`. A function `send_message_to_user(text)` is also accessible and can be used to send a
message to the user."""
        if with_long_description:
            description += f"""
The browser context is in `page.context`, and all open webpages (tabs and popups)
are in `page.context.pages`. Here is is an example of a valid action:
```
frame = page.frame_locator(".result-frame")
button = frame.get_by_text("Submit")
button.click()
```
Here is another example:
```
frame = page.get_by_test_id("35").frame_locator(":scope")
frame.get_by_test_id("35-776").click()
```
Note that Playwright's `get_by_test_id()` method is configured to use the `bid` attribute to locate HTML elements,
instead of the default `data-testid`. Also, Playwright's locators can not traverse iframes, so you have to locate
parent iframes first in order to locate an element in an iframe. The `bid` attribute contains all the information
required to recursively locate an element. For example, an element with `bid="23-557-2"` can be retrieved as follows:
```
frame = page.get_by_test_id("23").frame_locator(":scope")
frame = frame.get_by_test_id("23-557").frame_locator(":scope")
elem = frame.get_by_test_id("23-557-2")
```
"""
        else:
            description += f"""\

"""
        if with_examples:
            description += f"""\
Here are other examples of valid actions:
```
page = page.context.new_page()
page.goto("https://www.wikipedia.org/")
```
```
page.get_by_label("Birth date").fill("2020-02-02")
page.get_by_role("link", name="Get started").click()
```
```
page.get_by_label('I agree to the terms above').check()
```
```
page.locator('#area').fill('Hello World!')
```
```
page.get_by_role("textbox").press("Control+ArrowRight")
```
```
send_message_to_user("There are 7 items to choose from.")
```
"""

        return description

    def example_action(self, abstract: bool) -> str:
        """
        Returns an example action as a string.
        """
        if abstract:
            return """\
One single bloc of Python code. Do not include any explanation, only valid Python code."""
        else:
            return """\
frame = page.get_by_test_id("23").frame_locator(":scope")
frame = page.get_by_test_id("23-557").frame_locator(":scope")
frame.get_by_test_id("23-557-2").fill("Hello world!")
frame.get_by_test_id("23-557-3").click()
"""

    def to_python_code(self, action):
        """
        Converts the given code action string to browsergym-compatible playwright code.

        Args:
            action: the code action to parse.

        Returns:
            Executable playwright code that performs the action in a browsergym environment.
        """

        python_code = ""

        # extract markdown-style code snippets if detected
        pattern = re.compile(r"```(?:python)?\n(?P<code>[\s\S]*?)```")
        if pattern.match(action):
            python_code += "\n".join([match.group("code") for match in pattern.finditer(action)])
        # otherwise just use the code action as is
        else:
            python_code += action

        # return the produced playwright code
        return python_code
