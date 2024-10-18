from browsergym.workarena import (
    AGENT_CURRICULUM_L2,
    AGENT_CURRICULUM_L3,
    TASK_CATEGORY_MAP,
)

metadata = []

for task_name, category in TASK_CATEGORY_MAP.items():
    metadata.append((task_name, "l1", category))

for category, items in AGENT_CURRICULUM_L2.items():
    for task_set in items["buckets"]:
        for task in task_set:
            metadata.append((task.get_task_id(), "l2", category))

for category, items in AGENT_CURRICULUM_L3.items():
    for task_set in items["buckets"]:
        for task in task_set:
            metadata.append((task.get_task_id(), "l3", category))

print("\n".join([",".join(x) for x in metadata]))
