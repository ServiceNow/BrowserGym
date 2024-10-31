import nltk

from browsergym.core.registration import register_task

from . import config, task

# download necessary tokenizer ressources
# note: deprecated punkt -> punkt_tab https://github.com/nltk/nltk/issues/3293
try:
    nltk.data.find("tokenizers/punkt_tab")
except:
    nltk.download("punkt_tab", quiet=True, raise_on_error=True)

ALL_VISUALWEBARENA_TASK_IDS = []
VISUALWEBARENA_TASK_IDS_WITH_RESET = []
VISUALWEBARENA_TASK_IDS_WITHOUT_RESET = []

# register all VisualWebArena tasks
for task_id in config.TASK_IDS:
    gym_id = f"visualwebarena.{task_id}"
    register_task(
        gym_id,
        task.GenericVisualWebArenaTask,
        task_kwargs={"task_id": task_id},
    )
    ALL_VISUALWEBARENA_TASK_IDS.append(gym_id)
    if task_id in config.TASK_IDS_WITH_RESET:
        VISUALWEBARENA_TASK_IDS_WITH_RESET.append(gym_id)
    else:
        VISUALWEBARENA_TASK_IDS_WITHOUT_RESET.append(gym_id)
