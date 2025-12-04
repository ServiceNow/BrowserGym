# WebArena Verified benchmark for BrowserGym

This package provides `browsergym.webarena_verified`, which integrates the [WebArena Verified benchmark](https://github.com/ServiceNow/platform-labs-webarena-verified) into BrowserGym.

## WebArena Server Deployment

Follow the official [webarena README](https://github.com/web-arena-x/webarena/blob/main/environment_docker/README.md)

## WebArena Verified Setup

#### 1. Install webarena-verified

```bash
make install
```
Alternatively, you can also run:
```bash
pip install -e ./browsergym/webarena_verified
```

#### 2. Setup WebArena environment URLs

```bash
export WA_SHOPPING="..."
export WA_SHOPPING_ADMIN=".../admin"
export WA_REDDIT="..."
export WA_GITLAB="..."
export WA_WIKIPEDIA=".../wikipedia_en_all_maxi_2022-05/A/User:The_other_Kiwix_guy/Landing"
export WA_MAP="..."
export WA_HOMEPAGE="..."

# (optional) path to a json file containing extra html headers for playwright to load in the page (for instance, a secret token to access your self hosted webarena instances).
export PW_EXTRA_HEADERS="..."
```

If you don't have a running environment for a domain, simply replace its URL with `"todo"`,
and filter the benchmark tasks like so:
```python
import bgym
from browsergym.experiments.benchmark.metadata.utils import task_metadata

domains = ["shopping", "reddit"]  # only consider 'shopping' or 'reddit' tasks
task_list = []
for domain in domains:
    task_list.extend(task_metadata("webarena_verified").groupby("sites").get_group(domain).task_name.to_list())
benchmark = bgym.DEFAULT_BENCHMARKS["webarena_verified"]()  # type: bgym.Benchmark
benchmark = benchmark.subset_from_list(
    task_list, benchmark_name_suffix=f"_{'-'.join(DOMAINS)}"
)
```

**NOTE**: Tasks are registered with this template: `webarena_verified.{intent_template_id}.{task_id}`
