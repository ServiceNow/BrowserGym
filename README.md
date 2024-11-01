# BrowserGym: a Gym Environment for Web Task Automation

[[Setup](#setup)] 
[[Usage](#usage)] 
[[Demo](#demo)] 
[[Citation](#citing-this-work)]

This package provides `browsergym`, a gym environment for web task automation in the Chromium browser.

https://github.com/ServiceNow/BrowserGym/assets/26232819/e0bfc788-cc8e-44f1-b8c3-0d1114108b85

_Example of a GPT4-V agent executing openended tasks (top row, chat interactive), as well as WebArena and WorkArena tasks (bottom row)_

BrowserGym includes the following benchmarks by default:
 - [MiniWoB++](https://miniwob.farama.org/)
 - [WebArena](https://webarena.dev/)
 - [VisualWebArena](https://jykoh.com/vwa)
 - [WorkArena++](https://github.com/ServiceNow/WorkArena)
 - [AssistantBench](https://github.com/oriyor/assistantbench)

Designing new web benchmarks with BrowserGym is easy, and simply requires to inherit the [`AbstractBrowserTask`](https://github.com/ServiceNow/BrowserGym/blob/main/browsergym/core/src/browsergym/core/task.py#L7C7-L7C26) class.

## Setup

To use browsergym, install one of the following packages:
```sh
pip install browsergym  # (recommended) everything below
pip install browsergym-experiment  # experiment utilities (agent, loop, benchmarks) + everything below
pip install browsergym-core  # core functionalities only (no benchmark, just the openended task)
pip install browsergym-miniwob  # core + miniwob
pip install browsergym-webarena  # core + webarena
pip install browsergym-visualwebarena  # core + visualwebarena
pip install browsergym-workarena  # core + workarena
pip install browsergym-assistantbench  # core + assistantbench
```

Then setup playwright by running
```sh
playwright install chromium
```

Finally, each benchmark comes with its own specific setup that requires to follow additional steps.
 - for MiniWoB++, see [miniwob/README.md](browsergym/miniwob/README.md)
 - for WebArena, see [webarena/README.md](browsergym/webarena/README.md)
 - for VisualWebArena, see [visualwebarena/README.md](browsergym/visualwebarena/README.md)
 - for WorkArena, see [WorkArena](https://github.com/ServiceNow/WorkArena)
 - for AssistantBench, see [assistantbench/README.md](browsergym/assistantbench/README.md)

### Development setup
To install browsergym locally for development, use the following commands:
```sh
git clone https://github.com/ServiceNow/BrowserGym.git
cd BrowserGym
make install
```

## Usage

### Open-ended example

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

### MiniWoB++ example

```python
import gymnasium as gym
import browsergym.miniwob  # register miniwob tasks as gym environments

env = gym.make("browsergym/miniwob.choose-list")
...
```

To list all the available MiniWoB++ environments run
```python
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/miniwob")]
print("\n".join(env_ids))
```

### WorkArena example

```python
import gymnasium as gym
import browsergym.workarena  # register workarena tasks as gym environments

env = gym.make("browsergym/workarena.servicenow.order-ipad-pro")
...
```

To list all the available WorkArena environments run
```python
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/workarena")]
print("\n".join(env_ids))
```

### WebArena example

```python
import gymnasium as gym
import browsergym.webarena  # register webarena tasks as gym environments

env = gym.make("browsergym/webarena.310")
...
```

To list all the available WebArena environments run
```python
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/webarena")]
print("\n".join(env_ids))
```

### VisualWebArena example

```python
import gymnasium as gym
import browsergym.webarena  # register webarena tasks as gym environments

env = gym.make("browsergym/visualwebarena.721")
...
```

To list all the available VisualWebArena environments run
```python
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/visualwebarena")]
print("\n".join(env_ids))
```

### AssistantBench example

```python
import gymnasium as gym
import browsergym.workarena  # register assistantbench tasks as gym environments

env = gym.make("browsergym/assistantbench.validation.3")
...
```

To list all the available AssistantBench environments run
```python
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/workarena")]
print("\n".join(env_ids))
```

## Demo

If you want to experiment with a demo agent in BrowserGym, follow these steps:

```sh
conda env create -f demo_agent/environment.yml
conda activate demo_agent
# or simply use `pip install -r requirements.txt`
playwright install chromium
```

Our demo agent uses `openai` as a backend, be sure to set your `OPENAI_API_KEY`.

Launch the demo agent on the open web:
```sh
python demo_agent/run_demo.py --task_name openended --start_url https://www.google.com
```

Or use it to solve a simple MiniWoB task:
```sh
python demo_agent/run_demo.py --task_name miniwob.click-test
```

A VisualWebArena task:
```sh
python demo_agent/run_demo.py --task_name visualwebarena.398
```

A WebArena task:
```sh
python demo_agent/run_demo.py --task_name webarena.4
```

A WorkArena task:
```sh
python demo_agent/run_demo.py --task_name workarena.servicenow.order-standard-laptop
```

You can customize your experience by changing the `model_name` to your preferred LLM (it uses `gpt-4o-mini` by default), adding screenshots for your VLMs with `use_screenshot`, and much more! (see `python run_demo.py --help`)


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
