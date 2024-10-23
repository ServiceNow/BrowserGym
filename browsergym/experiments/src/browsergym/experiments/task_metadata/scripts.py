import importlib.resources
import json

import numpy as np

from browsergym.experiments.benchmark import task_metadata

# for posterity


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


def print_miniwob_train_test_splits():
    metadata = task_metadata("miniwob")

    groups = metadata["similarity_group"]
    group_counts = groups.value_counts(sort=False)

    group_counts = dict({group: count for group, count in zip(group_counts.index, group_counts)})

    free_groups = set(group_counts.keys())
    train_groups = set()
    test_groups = set()
    rng = np.random.RandomState(1337)

    # slack for train / test size equality
    slack = sum(group_counts.values()) % 2

    def move_random_group(from_groups: set, to_groups: set):
        # pick uniformly among tasks (weighted sampling among groups)
        probs = np.asarray([float(group_counts[group]) for group in from_groups])
        probs = probs / probs.sum()
        # sample a group
        group = rng.choice(list(from_groups), size=1, p=probs)[0]
        # move between sets
        to_groups.add(group)
        from_groups.remove(group)
        # return group for information
        return group

    done = False
    while not done:
        n_train = sum([group_counts[group] for group in train_groups])
        n_test = sum([group_counts[group] for group in test_groups])

        print(f"train/test split: {n_train} <> {n_test}")

        # growing phase
        if free_groups:
            if n_train < n_test:
                group = move_random_group(from_groups=free_groups, to_groups=train_groups)
                print(f"adding {group} to train")
            else:
                group = move_random_group(from_groups=free_groups, to_groups=test_groups)
                print(f"adding {group} to test")

        # group switching phase
        elif n_train < n_test - slack:
            group = move_random_group(from_groups=test_groups, to_groups=train_groups)
            print(f"switching {group} from test to train")
        elif n_test < n_train - slack:
            group = move_random_group(from_groups=train_groups, to_groups=test_groups)
            print(f"switching {group} from train to test")

        # done (equilibrium)
        else:
            print("equilibrium")
            done = True

        print()

    metadata["browsergym_split"] = metadata["similarity_group"].apply(
        lambda group: "train" if group in train_groups else "test" if group in test_groups else ""
    )

    print(metadata.to_csv(index=False))
