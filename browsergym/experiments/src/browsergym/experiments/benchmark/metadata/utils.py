import io
import pkgutil
from collections import defaultdict
from copy import deepcopy
from typing import Any, Optional

import pandas as pd

from browsergym.experiments.loop import EnvArgs


def task_metadata(benchmark_name: str):
    return task_metadata_from_csv(
        io.StringIO(pkgutil.get_data(__name__, f"{benchmark_name}.csv").decode("utf-8"))
    )


def task_metadata_from_csv(filepath):
    return pd.read_csv(filepath).fillna("")


def task_list_from_metadata(metadata: pd.DataFrame, filter: dict[str, str] = {}):
    df = metadata
    # filter the desired columns (AND filter)
    for col_name, regex in filter.items():
        col_filter = df[col_name].astype(str).str.contains(regex, regex=True)
        df = df[col_filter]
    # return only the task names
    return list(df["task_name"])


def build_full_task_dependency_graph_from_metadata(
    task_metadata: pd.DataFrame,
) -> tuple[dict[str, list[str]], dict[str, list[str]]]:
    if "depends_on" not in task_metadata.columns:
        raise ValueError(
            'task metadata column "depends_on" is required to compute task dependencies.'
        )

    graph_parents = {
        task_name: depends_on.split()
        for task_name, depends_on in zip(task_metadata["task_name"], task_metadata["depends_on"])
    }

    return graph_parents


def extract_graph_children(parents: dict[Any, list[Any]]):
    # start with empty children
    children = {task_name: [] for task_name in parents.keys()}
    # build children sets iteratively
    for child, parents in parents.items():
        for parent in parents:
            children[parent].append(child)
    return children


def extract_sparse_task_dependency_graph_from_subset(
    task_subset: list[str],
    parents: dict[str, list[str]],
    children: Optional[dict[str, list[str]]] = None,
    return_children: bool = False,
) -> tuple[dict[str, list[str]], dict[str, list[str]]]:

    if children is None:
        children = extract_graph_children(parents)

    # consistency check
    assert all([task in parents for task in task_subset])
    assert all([task in children for task in task_subset])

    # copy the graph
    subgraph_parents = deepcopy(parents)
    subgraph_children = deepcopy(children)

    # prune the graph (node contraction)
    for task_name in parents.keys():
        # if task is not present in the target task subset, drop its node
        if task_name not in task_subset:
            # connect node's children to node's parents
            for child in subgraph_children[task_name]:
                subgraph_parents[child].remove(task_name)
                subgraph_parents[child].extend(subgraph_parents[task_name])
            # connect node's parents to node's children
            for parent in subgraph_parents[task_name]:
                subgraph_children[parent].remove(task_name)
                subgraph_children[parent].extend(subgraph_children[task_name])
            # remove node
            del subgraph_parents[task_name]
            del subgraph_children[task_name]

    # return parent and (optionally) children mappings
    if return_children:
        return subgraph_parents, subgraph_children

    return subgraph_parents


def build_env_args_dependency_graphs(
    env_args_list: list[EnvArgs],
    task_dependencies: dict[str, list[str]],
    supports_parallel_seeds: bool,
) -> list[dict[int, list[int]]]:
    """
    Returns a list of dependency graphs to be executed sequentially, typically with a full instance reset in-between.
    Ideally, a job scheduler should connect these graphs by injecting a reset task in-between each, which depends on all previous tasks being completed.
    """
    # build mapping from tasks to run subsets (task_name -> list of env_args_list indices)
    task_runs = defaultdict(list)
    for i, env_args in enumerate(env_args_list):
        task_runs[env_args.task_name].append(i)
    task_runs = dict(task_runs)

    # consistency check
    assert all([task in task_dependencies for task in task_runs.keys()])

    # divide same-task runs into distinct splits if needed
    task_runs_splits = []
    if supports_parallel_seeds:
        # if parallel task runs over seeds is supported, do not split
        task_runs_splits.append(task_runs)
    else:
        # else, split runs so that each task has only one run (seed) in each split
        while task_runs:
            # extract first task run only (one seed per task)
            split = {task_name: [runs.pop(0)] for task_name, runs in task_runs.items()}
            task_runs_splits.append(split)
            # update task list to only those with remaining runs (seeds)
            task_runs = {task_name: runs for task_name, runs in task_runs.items() if runs}

    # recover the parent and child mappings of the task dependency graph
    task_parents = task_dependencies
    task_children = extract_graph_children(task_parents)

    # for each split, build the task dependency subgraph (task_name nodes), then build the run dependency graph (env_args index nodes)
    run_parents_split = []
    for split in task_runs_splits:
        # build the task dependency graph (task_name nodes)
        split_task_names = list(split.keys())
        split_task_parents = extract_sparse_task_dependency_graph_from_subset(
            task_subset=split_task_names,
            parents=task_parents,
            children=task_children,
        )
        # then, build the run dependency graph (env_args index nodes)
        split_run_parents = defaultdict(list)
        for task_name, runs in split.items():
            parent_tasks_runs = sum([split[parent] for parent in split_task_parents[task_name]], [])
            for run in runs:
                split_run_parents[run].extend(parent_tasks_runs)
        split_run_parents = dict(split_run_parents)
        run_parents_split.append(split_run_parents)

    return run_parents_split
