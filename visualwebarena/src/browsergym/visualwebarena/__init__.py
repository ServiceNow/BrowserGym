import os

# setup visualwebarena environment variables (visualwebarena will read those on import)
os.environ["DATASET"] = "visualwebarena"
ENV_VARS = ("SHOPPING", "REDDIT", "WIKIPEDIA", "HOMEPAGE", "CLASSIFIEDS", "CLASSIFIEDS_RESET_TOKEN")
for key in ENV_VARS:
    append_vwa = lambda x: f"VWA_{x}"
    assert append_vwa(key) in os.environ, (
        f"Environment variable {append_vwa(key)} missing. Please set the following environment variables to use VisualWebArena through BrowserGym:\n"
        + "\n".join([append_vwa(x) for x in ENV_VARS])
    )
    os.environ[key] = os.environ[append_vwa(key)]

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
