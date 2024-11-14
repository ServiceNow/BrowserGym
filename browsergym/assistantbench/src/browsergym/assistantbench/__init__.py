from browsergym.core.registration import register_task

from . import task

TOY_AB_TASK_IDS = []
VALID_AB_TASK_IDS = []
TEST_AB_TASK_IDS = []


# register a toy easy task for testing implementation
gym_id = f"assistantbench.imp.0"
register_task(
    gym_id,
    task.AssistantBenchTask,
    task_kwargs={
        "task_id": f"imp.0",
    },
    default_task_kwargs={
        "save_predictions": False,  # can be overriden
    },
)
TOY_AB_TASK_IDS.append(gym_id)

# register the AssistantBench dev set
for task_id in range(33):
    gym_id = f"assistantbench.validation.{task_id}"
    register_task(
        gym_id,
        task.AssistantBenchTask,
        task_kwargs={
            "task_id": f"validation.{task_id}",
        },
        default_task_kwargs={
            "save_predictions": False,  # can be overriden
        },
    )
    VALID_AB_TASK_IDS.append(gym_id)

# register the AssistantBench test set
for task_id in range(181):
    gym_id = f"assistantbench.test.{task_id}"
    register_task(
        gym_id,
        task.AssistantBenchTask,
        task_kwargs={
            "task_id": f"test.{task_id}",
        },
        default_task_kwargs={
            "save_predictions": True,  # can be overriden
        },
    )
    TEST_AB_TASK_IDS.append(gym_id)

ALL_AB_TASK_IDS = TOY_AB_TASK_IDS + VALID_AB_TASK_IDS + TEST_AB_TASK_IDS
