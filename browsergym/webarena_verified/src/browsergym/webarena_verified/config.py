import difflib
import importlib.resources
import json
from pathlib import Path

TASK_IDS = range(812)
INTENT_TEMPLATE_IDS = []
REVISIONS = []

# Load the json file from the webarena-verified library
data = json.loads(
    importlib.resources.files("webarena_verified")
    .joinpath("assets/dataset/webarena-verified.json")
    .read_text()
)

for task in data:
    INTENT_TEMPLATE_IDS.append(task["intent_template_id"])
    REVISIONS.append(task["revision"])

assert (
    len(INTENT_TEMPLATE_IDS) == len(TASK_IDS) == len(REVISIONS)
), f"Number of intent template IDs ({len(INTENT_TEMPLATE_IDS)}), task IDs ({len(TASK_IDS)}), and revisions ({len(REVISIONS)}) must match"
