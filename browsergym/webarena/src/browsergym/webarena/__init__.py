import nltk

from browsergym.core.registration import register_task

from . import config, task

# download necessary tokenizer resources
# note: deprecated punkt -> punkt_tab https://github.com/nltk/nltk/issues/3293
try:
    nltk.data.find("tokenizers/punkt_tab")
except:
    nltk.download("punkt_tab", quiet=True, raise_on_error=True)

ALL_WEBARENA_TASK_IDS = []

# register all WebArena benchmark
for task_id in config.TASK_IDS:
    gym_id = f"webarena.{task_id}"
    register_task(
        gym_id,
        task.GenericWebArenaTask,
        task_kwargs={"task_id": task_id},
    )
    ALL_WEBARENA_TASK_IDS.append(gym_id)
