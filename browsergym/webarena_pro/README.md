# BrowserGym - WebArena-Pro

WebArena-Pro benchmark for BrowserGym. A multi-website benchmark starting with Mattermost, extensible to additional sites.

## Setup

Set environment variables for each site:

```bash
export WAP_MATTERMOST="http://<host>:8065"
```

## Usage

```python
import browsergym.webarena_pro
import gymnasium as gym

env = gym.make("browsergym/webarena_pro.0")
```
