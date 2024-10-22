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
        "output_file_path": "./assistantbench-predictions-imp.jsonl",
    },
)
TOY_AB_TASK_IDS.append(gym_id)

# register the AssistantBench dev set
for task_id in range(33):
    gym_id = f"assistantbench.validation.{task_id}"
    register_task(
        gym_id,
        task.AssistantBenchTask,
        task_kwargs={"task_id": f"validation.{task_id}"},
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
            "output_file_path": "./assistantbench-predictions-test.jsonl",
        },
    )
    TEST_AB_TASK_IDS.append(gym_id)

ALL_AB_TASK_IDS = TOY_AB_TASK_IDS + VALID_AB_TASK_IDS + TEST_AB_TASK_IDS
