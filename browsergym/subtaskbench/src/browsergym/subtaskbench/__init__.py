from browsergym.core.registration import register_task
from . import config, task

ALL_SUBTASKBENCH_TASK_IDS = []

# register all SubTaskBench tasks
for task_id in config.TASK_IDS:
    gym_id = f"subtaskbench.{task_id}"
    register_task(
        gym_id,
        task.GenericSubTaskBenchTask,
        task_kwargs={"task_id": task_id},
    )
    ALL_SUBTASKBENCH_TASK_IDS.append(gym_id)
