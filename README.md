# BrowserGym: a Gym Environment for Web Task Automation

[[Setup](#setup)] 
[[Usage](#usage)] 
[[Demo](#demo)] 
[[Citation](#citing-this-work)]

This package provides `browsergym`, a gym environment for web task automation in the Chromium browser.

https://github.com/ServiceNow/BrowserGym/assets/26232819/e0bfc788-cc8e-44f1-b8c3-0d1114108b85

_Example of a GPT4-V agent executing openended tasks (top row, chat interactive), as well as WebArena and WorkArena tasks (bottom row)_

BrowserGym includes the following benchmarks by default:
 - [MiniWob++](https://miniwob.farama.org/)
 - [WebArena](https://webarena.dev/)
 - [VisualWebArena](https://jykoh.com/vwa)
 - [WorkArena](https://github.com/ServiceNow/WorkArena)

Designing new web benchmarks with BrowserGym is easy, and simply requires to inherit the [`AbstractBrowserTask`](https://github.com/ServiceNow/BrowserGym/blob/main/core/src/browsergym/core/task.py#L7C7-L7C26) class.

## Setup

To install browsergym, you can either install one of the `browsergym-miniwob`, `browsergym-webarena`, `browsergym-visualwebarena` and `browsergym-workarena` packages, or you can simply install `browsergym` which includes all of these by default.
```sh
pip install browsergym
```

Then, a required step is to setup playwright by running
```sh
playwright install chromium
```

Finally, each benchmark comes with its own specific setup that requires to follow additional steps.
 - for miniwob, see [miniwob/README.md](browsergym/miniwob/README.md)
 - for webarena, see [webarena/README.md](browsergym/webarena/README.md)
 - for visualwebarena, see [visualwebarena/README.md](browsergym/visualwebarena/README.md)
 - for workarena, see [WorkArena](https://github.com/ServiceNow/WorkArena)

### Development setup
To install browsergym locally for development, use the following commands:
```sh
git clone https://github.com/ServiceNow/BrowserGym.git
cd BrowserGym
make install
```

## Usage

### Open-ended task example

Boilerplate code to run an agent on an interactive, open-ended task:
```python
import gymnasium as gym
import browsergym.core  # register the openended task as a gym environment

env = gym.make(
    "browsergym/openended",
    task_kwargs={"start_url": "https://www.google.com/"},  # starting URL
    wait_for_user_message=True,  # wait for a user message after each agent message sent to the chat
)
obs, info = env.reset()
done = False
while not done:
    action = ...  # implement your agent here
    obs, reward, terminated, truncated, info = env.step(action)
    done = terminated or truncated
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
    done = terminated or truncated
```

To list all the available MiniWoB++ environments run
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
    done = terminated or truncated
```

To list all the available WebArena environments run
```python
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/webarena")]
print("\n".join(env_ids))
```

### VisualWebArena task example

Boilerplate code to run an agent on a VisualWebArena task:
```python
import gymnasium as gym
import browsergym.webarena  # register webarena tasks as gym environments

env = gym.make("browsergym/webarena.721")
obs, info = env.reset()
done = False
while not done:
    action = ...  # implement your agent here
    obs, reward, terminated, truncated, info = env.step(action)
    done = terminated or truncated
```

To list all the available VisualWebArena environments run
```python
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/visualwebarena")]
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
    done = terminated or truncated
```

To list all the available WorkArena environments run
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
playwright install chromium
```

Optional: Set your `OPENAI_API_KEY` to use a GPT agent.

Launch the demo on the open web:

```sh
python run_demo.py --task_name openended --start_url https://www.google.com
```

You can customize your experience by changing the `model_name` to your preferred LLM, toggling Chain-of-thought with `use_thinking`, adding screenshots for your VLMs with `use_screenshot`, and much more!


## Citing This Work

Please use the following BibTeX to cite our work:
```tex
@inproceedings{workarena2024,
    title = {{W}ork{A}rena: How Capable are Web Agents at Solving Common Knowledge Work Tasks?},
    author = {Drouin, Alexandre and Gasse, Maxime and Caccia, Massimo and Laradji, Issam H. and Del Verme, Manuel and Marty, Tom and Vazquez, David and Chapados, Nicolas and Lacoste, Alexandre},
    booktitle = {Proceedings of the 41st International Conference on Machine Learning},
    pages = {11642--11662},
    year = {2024},
    editor = {Salakhutdinov, Ruslan and Kolter, Zico and Heller, Katherine and Weller, Adrian and Oliver, Nuria and Scarlett, Jonathan and Berkenkamp, Felix},
    volume = {235},
    series = {Proceedings of Machine Learning Research},
    month = {21--27 Jul},
    publisher = {PMLR},
    url = {https://proceedings.mlr.press/v235/drouin24a.html},
}

```
