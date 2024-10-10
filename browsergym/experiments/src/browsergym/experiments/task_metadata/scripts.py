import importlib.resources
import json


def print_metadata_workarena():
    from browsergym.workarena import (
        AGENT_CURRICULUM_L2,
        AGENT_CURRICULUM_L3,
        TASK_CATEGORY_MAP,
    )

    metadata = [("task_name", "level", "category")]

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


def print_metadata_webarena():

    import webarena

    metadata = [
        (
            "task_name",
            "requires_reset",
            "sites",
            "eval_types",
        )
    ]
    all_configs_str = importlib.resources.files(webarena).joinpath("test.raw.json").read_text()
    all_configs = json.loads(all_configs_str)
    for task in all_configs:
        metadata.append(
            (
                f"webarena.{task['task_id']}",
                str(task["require_reset"] == True),
                " ".join(task["sites"]),
                " ".join(task["eval"]["eval_types"]),
            )
        )

    print("\n".join([",".join(x) for x in metadata]))


def print_metadata_visualwebarena():
    import visualwebarena

    metadata = [
        (
            "task_name",
            "requires_reset",
            "sites",
            "eval_types",
            "reasoning_difficulty",
            "visual_difficulty",
            "overall_difficulty",
        )
    ]

    all_configs_str = (
        importlib.resources.files(visualwebarena).joinpath("test_raw.json").read_text()
    )
    all_configs = json.loads(all_configs_str)
    for task in all_configs:
        metadata.append(
            (
                f"visualwebarena.{task['task_id']}",
                str(task["require_reset"] == True),
                " ".join(task["sites"]),
                task["reasoning_difficulty"],
                task["visual_difficulty"],
                task["overall_difficulty"],
                " ".join(task["eval"]["eval_types"]),
            )
        )

    print("\n".join([",".join(x) for x in metadata]))
