from browsergym.core.registration import register_task

# register the WebArena benchmark
from . import config, task

ALL_WEBARENA_TASK_IDS = []

# register the WebArena benchmark
for task_id in config.TASK_IDS:
    gym_id = f"webarena.{task_id}"
    register_task(
        gym_id,
        task.GenericWebArenaTask,
        kwargs={"task_kwargs": {"task_id": task_id}},
    )
    ALL_WEBARENA_TASK_IDS.append(gym_id)
