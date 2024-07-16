import os

# setup webarena environment variables (webarena will read those on import)
ENV_VARS = ("SHOPPING", "SHOPPING_ADMIN", "REDDIT", "GITLAB", "WIKIPEDIA", "MAP", "HOMEPAGE")
for key in ENV_VARS:
    append_wa = lambda x: f"WA_{x}"
    assert append_wa(key) in os.environ, (
        f"Environment variable {append_wa(key)} missing. Please set the following environment variables to use WebArena through BrowserGym:\n"
        + "\n".join([append_wa(x) for x in ENV_VARS])
    )
    os.environ[key] = os.environ[append_wa(key)]

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
        kwargs={"task_kwargs": {"task_id": task_id}},
    )
    ALL_WEBARENA_TASK_IDS.append(gym_id)
