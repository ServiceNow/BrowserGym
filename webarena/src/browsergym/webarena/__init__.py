__version__ = "0.0.1a10"

from browsergym.core.registration import register_task

# register the WebArena benchmark
from .task import GenericWebArenaTask
from .config import TASK_IDS

ALL_WEBARENA_TASK_IDS = []

# register the WebArena benchmark
for task_id in TASK_IDS:
    gym_id = f"webarena.{task_id}"
    register_task(
        gym_id,
        GenericWebArenaTask,
        kwargs={"task_id": task_id, "viewport": {"width": 1280, "height": 720}},
    )
    ALL_WEBARENA_TASK_IDS.append(gym_id)
