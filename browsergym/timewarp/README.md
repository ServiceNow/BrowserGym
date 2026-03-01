# TimeWarp Benchmark for BrowserGym

TimeWarp benchmark with 4 environments: WIKI, WEBSHOP, NEWS, HOME.

## Setup

```sh
pip install browsergym-timewarp
python -c "import nltk; nltk.download('punkt_tab')"
```

## Environment Variables

```sh
export TW_WIKI="http://localhost:5000"
export TW_WEBSHOP="http://localhost:5001"
export TW_NEWS="http://localhost:5002"
export TW_HOME="http://localhost:5003"
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

Sites: `["wiki"]`, `["webshop"]`, `["news"]`, `["home"]`
Placeholders: `__WIKI__`, `__WEBSHOP__`, `__NEWS__`, `__HOME__`
