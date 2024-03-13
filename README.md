# BrowserGym

This package provides `browsergym`, a gym environment for web task automation in the Chromium browser.

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
 - for workarena, see the [WorkArena README](https://github.com/ServiceNow/WorkArena/README.md)

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
