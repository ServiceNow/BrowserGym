# BrowserGym

This package provides `browsergym`, a gym environment for web task automation in the Chromium browser.

## Setup

1. Install the package
```sh
pip install browsergym
```

2. Install playwright browsers
```sh
playwright install
```

3. For each benchmark, specific setup instructions must be followed
 - for miniwob, see [miniwob/README.md](miniwob/README.md)
 - for webarena, see [webarena/README.md](webarena/README.md)
 - for workarena, see the [WorkArena](https://github.com/ServiceNow/WorkArena/README.md) repository

## Usage

### Open-ended task example

Boilerplate code to run an agent on the openended task:
```python
import gymnasium as gym
import browsergym.core  # register openended taskj as a gym environment

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
