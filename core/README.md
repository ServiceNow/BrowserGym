# BrowserGym core

This package provides `browsergym.core`, which provides the core functionalities of [BrowserGym](https://github.com/ServiceNow/BrowserGym).

## Setup

1. Install the package
```sh
pip install browsergym-core
```

2. Install playwright browsers
```sh
playwright install
```

## Usage

```python
import gymnasium as gym
import browsergym.core  # register gym environments

env = gym.make("browsergym/openended")
```
