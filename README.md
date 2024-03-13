# BrowserGym

This package provides `browsergym`, a gym environment for web task automation in the Chromium browser.

- [Setup](https://github.com/ServiceNow/BrowserGym/tree/main?tab=readme-ov-file#usage)
- [Usage](https://github.com/ServiceNow/BrowserGym/tree/main?tab=readme-ov-file#usage)
- [Demo](https://github.com/ServiceNow/BrowserGym/tree/main?tab=readme-ov-file#demo)

## Setup

To install browsergym, you can either install one of the `browsergym-miniwob`, `browsergym-webarena` and `browsergym-workarena` packages, or you can simply install `browsergym` which includes all of these by default.
```sh
pip install browsergym
```

Then, a required step is to setup playwright by running
```sh
playwright install
```

Finally, each benchmark comes with its its own specific setup that requires to follow additional steps.
 - for miniwob, see [miniwob/README.md](miniwob/README.md)
 - for webarena, see [webarena/README.md](webarena/README.md)
 - for workarena, see the [WorkArena](https://github.com/ServiceNow/WorkArena) repo


## Usage

### Open-ended task example

Boilerplate code to run an agent on an interactive, openended task:
```python
import gymnasium as gym
import browsergym.core  # register the openended task as a gym environment

env = gym.make(
    "browsergym/openended", start_url="https://www.google.com/", wait_for_user_message=True
)
obs, info = env.reset()
done = False
while not done:
    action = ...  # implement your agent here
    obs, reward, terminated, truncated, info = env.step(action)
```



### MiniWoB++ task example

Boilerplate code to run an agent on a miniwob task:
```python
import gymnasium as gym
import browsergym.miniwob  # register miniwob tasks as gym environments

env = gym.make("browsergym/miniwob.choose-list")
obs, info = env.reset()
done = False
while not done:
    action = ...  # implement your agent here
    obs, reward, terminated, truncated, info = env.step(action)
```

List of all the available MiniWoB++ environments
```python
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/miniwob")]
print("\n".join(env_ids))
```

### WebArena task example

Boilerplate code to run an agent on a webarena task:
```python
import gymnasium as gym
import browsergym.webarena  # register webarena tasks as gym environments

env = gym.make("browsergym/webarena.310")
obs, info = env.reset()
done = False
while not done:
    action = ...  # implement your agent here
    obs, reward, terminated, truncated, info = env.step(action)
```

List of all the available WebArena environments
```python
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/webarena")]
print("\n".join(env_ids))
```

### WorkArena task example

Boilerplate code to run an agent on a workarena task:
```python
import gymnasium as gym
import browsergym.workarena  # register workarena tasks as gym environments

env = gym.make("browsergym/workarena.servicenow.order-ipad-pro")
obs, info = env.reset()
done = False
while not done:
    action = ...  # implement your agent here
    obs, reward, terminated, truncated, info = env.step(action)
```

List of all the available WorkArena environments
```python
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/workarena")]
print("\n".join(env_ids))
```


## Demo

If you want to experiment with an agent in BrowserGym, follow these steps:

```sh
cd ui_assist
conda env create -f environment.yml; conda activate ui-assist
# or simply use `pip install -r requirements.txt`
playwright install
```

Optional: Set your `OPENAI_API_KEY` if you want to use a GPT agent.

Launch the demo on the open web:

```sh
python run_demo.py --task_name openended --start_url www.google.com
```

You can customize your experience by changing the `model_name` to your preferred LLM, toggling Chain-of-thought with `use_thinking`, adding screenshots for your VLMs with `use_screenshot`, and much more!

_multiple agent demos on the open web, WorkArena and WebArena_

https://github.com/ServiceNow/BrowserGym/assets/26232819/e0bfc788-cc8e-44f1-b8c3-0d1114108b85




