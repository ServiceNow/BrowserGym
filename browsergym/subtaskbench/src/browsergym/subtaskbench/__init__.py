from browsergym.core.registration import register_task

from .config import config
from . import task

STATIC_SUBTASKBENCH_TASK_IDS = []
ONLINE_SUBTASKBENCH_TASK_IDS = []
ALL_SUBTASKBENCH_TASK_IDS = []

# register all static SubTaskBench tasks
for task_id in config.STATIC_TASK_IDS:
    gym_id = f"subtaskbench.{task_id}"
    register_task(
        gym_id,
        task.StaticSubTaskBenchTask,
        task_kwargs={"task_id": task_id},
    )
    STATIC_SUBTASKBENCH_TASK_IDS.append(gym_id)
    ALL_SUBTASKBENCH_TASK_IDS.append(gym_id)

# register all online SubTaskBench tasks
for task_id in config.ONLINE_TASK_IDS:
    gym_id = f"subtaskbench.{task_id}"
    register_task(
        gym_id,
        task.OnlineSubTaskBenchTask,
        task_kwargs={"task_id": task_id},
    )
    ONLINE_SUBTASKBENCH_TASK_IDS.append(gym_id)
    ALL_SUBTASKBENCH_TASK_IDS.append(gym_id)
