from browsergym.core.registration import register_task

# register the WebArena benchmark
from . import config, task

ALL_WEBCANVAS_TASK_IDS = []

# register the WebArena benchmark
for task_id in config.TASK_IDS:
    gym_id = f"webcanvas.{task_id}"
    register_task(
        gym_id,
        task.GenericWebCanvasTask,
        kwargs={"task_kwargs": {"task_id": task_id}},
    )
    ALL_WEBCANVAS_TASK_IDS.append(gym_id)
