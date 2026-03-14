# TimeWarp Benchmark for BrowserGym

TimeWarp benchmark with 4 environments: WIKI, WEBSHOP, NEWS, HOME.

## Environment Setup

To set the environment, please follow the instructions in our [Github repo](https://github.com/sparklabutah/timewarp).

## Browsergym Setup

```sh
pip install browsergym-timewarp
python -c "import nltk; nltk.download('punkt_tab')"
```

## Environment Variables

```sh
export TW_WIKI="http://localhost:5000"
export TW_WEBSHOP="http://localhost:5001"
export TW_NEWS="http://localhost:5002"
export TW_USERNAME="admin"  # Optional
export TW_PASSWORD="admin"  # Optional
export OPENAI_API_KEY="your-key"  # For fuzzy evaluation
```

## Usage

```python
import gymnasium as gym
import browsergym.timewarp

env = gym.make("browsergym/timewarp.1")
obs, info = env.reset()
# Run your agent
env.close()
```

## Adding Tasks

1. Add to `browsergym/timewarp/src/browsergym/timewarp/data/test.raw.json`
2. Update `TASK_IDS` in `config.py`
3. Add to `metadata/timewarp.csv`

Sites: `["wiki"]`, `["webshop"]`, `["news"]`
Placeholders: `__WIKI__`, `__WEBSHOP__`, `__NEWS__`
