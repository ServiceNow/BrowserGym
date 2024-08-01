import bgym
import pytest


def test_classes():
    bgym.EnvArgs(task_name="something")
    bgym.HighLevelActionSet()
    with pytest.raises(TypeError):
        bgym.Agent()
