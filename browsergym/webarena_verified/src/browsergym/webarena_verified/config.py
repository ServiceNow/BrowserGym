import difflib
import importlib.resources
import json
from pathlib import Path

TASK_IDS = range(812)
INTENT_TEMPLATE_IDS = []

with open(Path(__file__).parent / "webarena_verified.json", "r") as f:
    data = json.load(f)

# Check if the json file is the same as the one in the webarena-verified repository
library_json_string = (
    importlib.resources.files("webarena_verified")
    .joinpath("assets/dataset/webarena-verified.json")
    .read_text()
)
library_json = json.loads(library_json_string)

if json.dumps(data, sort_keys=True, indent=2) != json.dumps(library_json, sort_keys=True, indent=2):
    print(
        "Warning: the json file is not the same as the one in the webarena-verified repository. Consider updating the library."
    )
    print("=" * 100)
    print("Differences:")
    for diff in difflib.unified_diff(
        json.dumps(data, sort_keys=True, indent=2).splitlines(),
        json.dumps(library_json, sort_keys=True, indent=2).splitlines(),
    ):
        print(diff)
    print("=" * 100)

for task in data:
    INTENT_TEMPLATE_IDS.append(task["intent_template_id"])

assert len(INTENT_TEMPLATE_IDS) == len(
    TASK_IDS
), "Number of intent template IDs must match number of task IDs"
