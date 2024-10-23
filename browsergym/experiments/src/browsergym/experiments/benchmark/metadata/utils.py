import io
import pkgutil

import pandas as pd


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
