import pytest

# bugfix: use same playwright instance in browsergym and pytest
from utils import setup_playwright

from browsergym.core.action.python import PythonActionSet


ACTIONS_TO_TEST = [
    (
        """\
a = 0
""",
        """\
a = 0
""",
    ),
    (
        """\
```
a = 0
```
""",
        """\
a = 0
""",
    ),
    (
        """\
```python
a = 0
```
""",
        """\
a = 0
""",
    ),
    (
        """\
```python
a = 0
```
This is an explanation
```python
b = 3
```
More explanations
""",
        """\
a = 0

b = 3
""",
    ),
]


@pytest.mark.parametrize("action,expected_code", ACTIONS_TO_TEST)
def test_action_cleaning(action, expected_code):
    action_set = PythonActionSet()
    code = action_set.to_python_code(action)

    assert code == expected_code
