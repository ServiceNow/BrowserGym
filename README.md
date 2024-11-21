<div align="center">

# 🌎💪 BrowserGym: a Gym Environment for Web Task Automation

[🛠️ Setup](#%EF%B8%8F-setup) -
[🏋 Usage](#-usage) -
[💻 Demo](#-demo) -
[🌐 Ecosystem](#-ecosystem) -
[🌟 Contributors](#-contributors) -
[📝 Citation](#-citing-this-work)

[![PyPI - License](https://img.shields.io/pypi/l/browsergym?style=flat-square)]([https://opensource.org/licenses/MIT](http://www.apache.org/licenses/LICENSE-2.0))
[![PyPI - Downloads](https://img.shields.io/pypi/dm/browsergym-core?style=flat-square)](https://pypistats.org/packages/browsergym-core)
[![GitHub star chart](https://img.shields.io/github/stars/ServiceNow/BrowserGym?style=flat-square)](https://star-history.com/#ServiceNow/BrowserGym)

</div>

```python
pip install browsergym
```

_Example of a GPT4-V agent executing openended tasks (top row, chat interactive), as well as WebArena and WorkArena tasks (bottom row)._

https://github.com/ServiceNow/BrowserGym/assets/26232819/e0bfc788-cc8e-44f1-b8c3-0d1114108b85

BrowserGym includes the following benchmarks by default:
 - [MiniWoB](https://miniwob.farama.org/)
 - [WebArena](https://webarena.dev/)
 - [VisualWebArena](https://jykoh.com/vwa)
 - [WorkArena](https://github.com/ServiceNow/WorkArena)
 - [AssistantBench](https://github.com/oriyor/assistantbench)
 - [WebLINX](https://github.com/McGill-NLP/weblinx) (static benchmark)

Designing new web benchmarks with BrowserGym is easy, and simply requires to inherit the [`AbstractBrowserTask`](https://github.com/ServiceNow/BrowserGym/blob/main/browsergym/core/src/browsergym/core/task.py#L7C7-L7C26) class.

## 🛠️ Setup

To use browsergym, install one of the following packages:
```sh
pip install browsergym  # (recommended) everything below
pip install browsergym-experiments  # experiment utilities (agent, loop, benchmarks) + everything below
pip install browsergym-core  # core functionalities only (no benchmark, just the openended task)
pip install browsergym-miniwob  # core + miniwob
pip install browsergym-webarena  # core + webarena
pip install browsergym-visualwebarena  # core + visualwebarena
pip install browsergym-workarena  # core + workarena
pip install browsergym-assistantbench  # core + assistantbench
pip install weblinx-browsergym  # core + weblinx
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

### 🏗️ Development setup
To install browsergym locally for development, use the following commands:
```sh
git clone https://github.com/ServiceNow/BrowserGym.git
cd BrowserGym
make install
```

## 🏋 Usage

Boilerplate code to run an agent on an interactive, open-ended task:
```python
import gymnasium as gym
import browsergym.core  # register the openended task as a gym environment

# start an openended environment
env = gym.make(
    "browsergym/openended",
    task_kwargs={"start_url": "https://www.google.com/"},  # starting URL
    wait_for_user_message=True,  # wait for a user message after each agent message sent to the chat
)
# run the environment <> agent loop until termination
obs, info = env.reset()
while True:
    action = ...  # implement your agent here
    obs, reward, terminated, truncated, info = env.step(action)
    if terminated or truncated:
        break
# release the environment
env.close()
```

MiniWoB
```python
import gymnasium as gym
import browsergym.miniwob  # register miniwob tasks as gym environments

# start a miniwob task
env = gym.make("browsergym/miniwob.choose-list")
...

# list all the available miniwob tasks
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/miniwob")]
print("\n".join(env_ids))
```

WorkArena
```python
import gymnasium as gym
import browsergym.workarena  # register workarena tasks as gym environments

# start a workarena task
env = gym.make("browsergym/workarena.servicenow.order-ipad-pro")
...

# list all the available workarena tasks
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/workarena")]
print("\n".join(env_ids))
```

WebArena
```python
import gymnasium as gym
import browsergym.webarena  # register webarena tasks as gym environments

# start a webarena task
env = gym.make("browsergym/webarena.310")
...

# list all the available webarena tasks
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/webarena")]
print("\n".join(env_ids))
```

VisualWebArena
```python
import gymnasium as gym
import browsergym.webarena  # register webarena tasks as gym environments

# start a visualwebarena task
env = gym.make("browsergym/visualwebarena.721")
...

# list all the available visualwebarena tasks
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/visualwebarena")]
print("\n".join(env_ids))
```

AssistantBench
```python
import gymnasium as gym
import browsergym.workarena  # register assistantbench tasks as gym environments

# start an assistantbench task
env = gym.make("browsergym/assistantbench.validation.3")
...

# list all the available assistantbench tasks
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/workarena")]
print("\n".join(env_ids))
```

## 💻 Demo

If you want to experiment with a demo agent in BrowserGym, follow these steps:

```sh
conda env create -f demo_agent/environment.yml
conda activate demo_agent
# or simply use `pip install -r demo_agent/requirements.txt`
playwright install chromium
```

Our demo agent uses `openai` as a backend, be sure to set your `OPENAI_API_KEY`.

Launch the demo agent as follows
```sh
# openended (interactive chat mode)
python demo_agent/run_demo.py --task_name openended --start_url https://www.google.com

# miniwob
python demo_agent/run_demo.py --task_name miniwob.click-test

# workarena
python demo_agent/run_demo.py --task_name workarena.servicenow.order-standard-laptop

# webarena
python demo_agent/run_demo.py --task_name webarena.4

# visualwebarena
python demo_agent/run_demo.py --task_name visualwebarena.398
```

You can customize your experience by changing the `model_name` to your preferred LLM (it uses `gpt-4o-mini` by default), adding screenshots for your VLMs with `use_screenshot`, and much more!

```python
python demo_agent/run_demo.py --help
```

## 🌐 Ecosystem

- [AgentLab](https://github.com/ServiceNow/AgentLab): Seamlessly run agents on benchmarks, collect and analyse traces.
- [WorkArena](https://github.com/ServiceNow/WorkArena): A benchmark for web agents on the ServiceNow platform.
- [WebArena](https://github.com/web-arena-x/webarena): A benchmark of realistic web tasks on self-hosted domains.
- [VisualWebArena](https://github.com/web-arena-x/visualwebarena): A benchmark of realistic visual web tasks on self-hosted domains.
- [MiniWoB](https://miniwob.farama.org/): A collection of over 100 web tasks on synthetic web pages.
- [WebLINX](https://github.com/McGill-NLP/weblinx): A dataset of real-world web interaction traces.
- [AssistantBench](https://github.com/oriyor/assistantbench): A benchmark of realistic and time-consuming tasks on the open web.

## 🌟 Contributors

[![BrowserGym contributors](https://contrib.rocks/image?repo=ServiceNow/BrowserGym&max=2000)](https://github.com/ServiceNow/BrowserGym/graphs/contributors)

## 📝 Citing This Work

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
