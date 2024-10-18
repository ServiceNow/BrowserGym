from browsergym.core.registration import register_task

from . import task

ALL_AB_TASK_IDS = []

ALL_TOY_AB_TASK_IDS = []
ALL_DEV_AB_TASK_IDS = []
ALL_TEST_AB_TASK_IDS = []

# register a toy easy task for testing implemenation
gym_id = f"ab.imp.0"
register_task(
    gym_id,
    task.AssistantBenchTask,
    task_kwargs={
        "task_id": f"imp.0",
        "output_file_path": "./assistantbench-predictions-imp.jsonl",
    },
)
ALL_AB_TASK_IDS.append(gym_id)
ALL_TOY_AB_TASK_IDS.append(gym_id)

# register the AssistantBench dev set
for task_id in range(33):
    gym_id = f"ab.{task_id}"
    register_task(
        gym_id,
        task.AssistantBenchTask,
        task_kwargs={"task_id": f"{task_id}"},
    )
    ALL_AB_TASK_IDS.append(gym_id)
    ALL_DEV_AB_TASK_IDS.append(gym_id)

# register the AssistantBench test set
for task_id in range(181):
    gym_id = f"ab.test.{task_id}"
    register_task(
        gym_id,
        task.AssistantBenchTask,
        task_kwargs={
            "task_id": f"test.{task_id}",
            "output_file_path": "./assistantbench-predictions-test.jsonl",
        },
    )
    ALL_AB_TASK_IDS.append(gym_id)
    ALL_TEST_AB_TASK_IDS.append(gym_id)
