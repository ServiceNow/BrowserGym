# Miniwob benchmark for BrowserGym

This package provides `browsergym.miniwob`, which is an unofficial port of the [MiniWoB++](https://miniwob.farama.org/) benchmark for BrowserGym.

## Setup

1. Install the package
```sh
pip install browsergym-miniwob
```

2. Clone miniwob (use a specific frozen commit for reproducibility)
```sh
git clone git@github.com:Farama-Foundation/miniwob-plusplus.git
git -C "./miniwob-plusplus" reset --hard 7fd85d71a4b60325c6585396ec4f48377d049838
```

3. Setup Miniwob URL (change `PATH_TO_MINIWOB_CLONED_REPO` here to the absolute path to your `miniwob-plusplus` folder)
```sh
export MINIWOB_URL="file://<PATH_TO_MINIWOB_CLONED_REPO>/miniwob/html/miniwob/"
```

Alternatively, one can [setup a simple HTTP server](https://miniwob.farama.org/content/viewing/) and use a proper URL.

## Usage

```python
import gymnasium as gym
import browsergym.miniwob  # register gym environments

env = gym.make("browsergym/miniwob.choose-list")
```

List of all the available MiniWoB++ environments
```python
env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym/miniwob")]
print("\n".join(env_ids))
```
