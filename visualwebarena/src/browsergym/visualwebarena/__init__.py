from browsergym.core.registration import register_task

# register the WebArena benchmark
from .task import GenericVisualWebArenaTask
from .config import TASK_IDS

ALL_VISUALWEBARENA_TASK_IDS = []

# register the WebArena benchmark
for task_id in TASK_IDS:
    gym_id = f"visualwebarena.{task_id}"
    register_task(
        gym_id,
        GenericVisualWebArenaTask,
        kwargs={"task_kwargs": {"task_id": task_id}},
    )
    ALL_VISUALWEBARENA_TASK_IDS.append(gym_id)
