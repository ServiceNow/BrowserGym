from browsergym.core.registration import register_task

# register the WebArena benchmark
from . import config, task

ALL_VISUALWEBARENA_TASK_IDS = []
VISUALWEBARENA_TASK_IDS_WITH_RESET = []
VISUALWEBARENA_TASK_IDS_WITHOUT_RESET = []

# register the WebArena benchmark
for task_id in config.TASK_IDS:
    gym_id = f"visualwebarena.{task_id}"
    register_task(
        gym_id,
        task.GenericVisualWebArenaTask,
        kwargs={"task_kwargs": {"task_id": task_id}},
    )
    ALL_VISUALWEBARENA_TASK_IDS.append(gym_id)
    if task_id in config.TASK_IDS_WITH_RESET:
        VISUALWEBARENA_TASK_IDS_WITH_RESET.append(gym_id)
    else:
        VISUALWEBARENA_TASK_IDS_WITHOUT_RESET.append(gym_id)
