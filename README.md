# BrowserGym: a Gym Environment for Web Task Automation

[[Setup]](#setup) ♦ [[Usage]](#usage) ♦ [[Demo]](#demo)

This package provides `browsergym`, a gym environment for web task automation in the Chromium browser.

https://github.com/ServiceNow/BrowserGym/assets/26232819/e0bfc788-cc8e-44f1-b8c3-0d1114108b85

_Example of a GPT4-V agent executing openended tasks (top row, chat interactive), as well as WebArena and WorkArena tasks (bottom row)_

BrowserGym includes the following benchmarks by default:
 - [MiniWob++](https://miniwob.farama.org/)
 - [WebArena](https://webarena.dev/)
 - [WorkArena](https://github.com/ServiceNow/WorkArena)

Designing new web benchmarks with BrowserGym is easy, and simply requires to inherit the [`AbstractBrowserTask`](https://github.com/ServiceNow/BrowserGym/blob/main/core/src/browsergym/core/task.py#L7C7-L7C26) class.

## Setup

To install browsergym, you can either install one of the `browsergym-miniwob`, `browsergym-webarena` and `browsergym-workarena` packages, or you can simply install `browsergym` which includes all of these by default.
```sh
pip install browsergym
```

Then, a required step is to setup playwright by running
```sh
playwright install
```

Finally, each benchmark comes with its own specific setup that requires to follow additional steps.
 - for miniwob, see [miniwob/README.md](miniwob/README.md)
 - for webarena, see [webarena/README.md](webarena/README.md)
 - for workarena, see [WorkArena](https://github.com/ServiceNow/WorkArena)


## Usage

### Open-ended task example

Boilerplate code to run an agent on an interactive, open-ended task:
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

Boilerplate code to run an agent on a MiniWoB++ task:
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

Boilerplate code to run an agent on a WebArena task:
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

Boilerplate code to run an agent on a WorkArena task:
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
cd demo-agent
conda env create -f environment.yml; conda activate demo-agent
# or simply use `pip install -r requirements.txt`
playwright install
```

Optional: Set your `OPENAI_API_KEY` if you want to use a GPT agent.

Launch the demo on the open web:

```sh
python run_demo.py --task_name openended --start_url https://www.google.com
```

You can customize your experience by changing the `model_name` to your preferred LLM, toggling Chain-of-thought with `use_thinking`, adding screenshots for your VLMs with `use_screenshot`, and much more!


## Citing This Work

Please use the following BibTeX to cite our work:
```
@misc{workarena2024,
      title={WorkArena: How Capable Are Web Agents at Solving Common Knowledge Work Tasks?}, 
      author={Alexandre Drouin and Maxime Gasse and Massimo Caccia and Issam H. Laradji and Manuel Del Verme and Tom Marty and Léo Boisvert and Megh Thakkar and Quentin Cappart and David Vazquez and Nicolas Chapados and Alexandre Lacoste},
      year={2024},
      eprint={2403.07718},
      archivePrefix={arXiv},
      primaryClass={cs.LG}
}
```
