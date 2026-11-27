from browsergym.core.registration import register_task

from . import config, task

ALL_WEBARENA_PRO_TASK_IDS = []

# register all WebArena-Pro tasks
for task_id in config.TASK_IDS:
    gym_id = f"webarena_pro.{task_id}"
    register_task(
        gym_id,
        task.GenericWebArenaProTask,
        task_kwargs={"task_id": task_id},
    )
    ALL_WEBARENA_PRO_TASK_IDS.append(gym_id)
