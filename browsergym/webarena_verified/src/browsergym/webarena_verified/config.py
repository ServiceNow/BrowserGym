import json

TASK_IDS = range(812)
INTENT_TEMPLATE_IDS = []

with open("browsergym/webarena_verified/webarena_verified.json", "r") as f:
    data = json.load(f)

for task in data:
    INTENT_TEMPLATE_IDS.append(task["intent_template_id"])

assert len(INTENT_TEMPLATE_IDS) == len(TASK_IDS), "Number of intent template IDs must match number of task IDs"
