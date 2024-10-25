from browsergym.core.registration import register_task

# register the WebCanvas benchmark
from . import config, task

ALL_WEBCANVAS_TASK_IDS = []

for task_id in config.TASK_IDS:
    gym_id = f"webcanvas.mind2web-live.{task_id}"
    register_task(
        gym_id,
        task.GenericWebCanvasTask,
        kwargs={"task_kwargs": {"task_id": task_id}},
    )
    ALL_WEBCANVAS_TASK_IDS.append(gym_id)
