from browsergym.core.registration import register_task

from browsergym.gaia.src.browsergym.gaia import task

NUM_GAIA_VALIDATION_TASKS = 165
NUM_GAIA_TEST_TASKS = 301
TOY_GAIA_TASK_IDS = []
VALID_GAIA_TASK_IDS = []
TEST_GAIA_TASK_IDS = []

# register a toy easy task for testing implementation
gym_id = f"gaia.imp.0"
register_task(
    gym_id,
    task.GAIATask,
    task_kwargs={
        "task_id": f"imp.0",
        "output_file_path": "./gaia-predictions-imp.jsonl",
    },
)
TOY_GAIA_TASK_IDS.append(gym_id)

# register the GAIA dev set
for task_id in range(NUM_GAIA_VALIDATION_TASKS):
    gym_id = f"gaia.validation.{task_id}"
    register_task(
        gym_id,
        task.GAIATask,
        task_kwargs={"task_id": f"validation.{task_id}"},
    )
    VALID_GAIA_TASK_IDS.append(gym_id)

# register the GAIA test set
for task_id in range(NUM_GAIA_TEST_TASKS):
    gym_id = f"gaia.test.{task_id}"
    register_task(
        gym_id,
        task.GAIATask,
        task_kwargs={
            "task_id": f"test.{task_id}",
            "output_file_path": "./gaia-predictions-test.jsonl",
        },
    )
    TEST_GAIA_TASK_IDS.append(gym_id)

ALL_GAIA_TASK_IDS = TOY_GAIA_TASK_IDS + VALID_GAIA_TASK_IDS + TEST_GAIA_TASK_IDS
