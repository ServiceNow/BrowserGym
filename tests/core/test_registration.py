import re

import gymnasium as gym
import pytest

from browsergym.core.registration import register_task
from browsergym.core.task import AbstractBrowserTask


class RegistrationTestTask(AbstractBrowserTask):
    @classmethod
    def get_task_id(cls):
        raise NotImplementedError

    def __init__(self, a: str = "", b: int = 0, c: bool = False, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.a = a
        self.b = b
        self.c = c

    def setup(self, page):
        return "", {}

    def teardown(self):
        pass

    def validate(self, page, chat_messages):
        return 0, True, "", {}


register_task("test_task", RegistrationTestTask)
register_task(
    "test_task_with_defaults",
    RegistrationTestTask,
    task_kwargs={"a": "new value"},
    default_task_kwargs={"b": 1},
)


def test_registration():

    with pytest.raises(ValueError):
        register_task(
            "test_task_forbidden",
            RegistrationTestTask,
            task_kwargs={"a": "new value"},
            default_task_kwargs={"a": "other value"},
        )

    env = gym.make("browsergym/test_task")

    assert env.unwrapped.task_kwargs == {}

    env.reset()
    env.unwrapped.task.a == ""
    env.unwrapped.task.b == 0
    env.unwrapped.task.c == False
    env.close()

    env = gym.make("browsergym/test_task", task_kwargs={"a": "other", "b": 1})

    assert env.unwrapped.task_kwargs == {"a": "other", "b": 1}

    env.reset()
    env.unwrapped.task.a == "other"
    env.unwrapped.task.b == 1
    env.unwrapped.task.c == False
    env.close()

    env = gym.make("browsergym/test_task_with_defaults")

    assert env.unwrapped.task_kwargs == {}

    env.reset()
    env.unwrapped.task.a == "new value"
    env.unwrapped.task.b == 1
    env.unwrapped.task.c == False
    env.close()

    env = gym.make("browsergym/test_task_with_defaults", task_kwargs={"b": 2})

    assert env.unwrapped.task_kwargs == {"b": 2}

    env.reset()
    env.unwrapped.task.a == "new value"
    env.unwrapped.task.b == 2
    env.unwrapped.task.c == False
    env.close()

    env = gym.make("browsergym/test_task_with_defaults", task_kwargs={"a": "other"})

    assert env.unwrapped.task_kwargs == {"a": "other"}

    with pytest.raises(
        expected_exception=ValueError,
        match=re.compile("Illegal attempt to override frozen parameters"),
    ):
        env.reset()
