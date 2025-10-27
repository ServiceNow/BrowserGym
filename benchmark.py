from agentlab.agents.generic_agent import AGENT_4o_MINI 
from agentlab.agents.generic_agent import AGENT_4o
from agentlab.experiments.study import make_study
from pathlib import Path
from agentlab.experiments.study import Study

# Check registered tasks

import gymnasium as gym

# Import all browsergym modules to register environments
# import browsergym.core
# import browsergym.miniwob
# import browsergym.workarena
# import browsergym.webarena
# import browsergym.visualwebarena
# import browsergym.assistantbench
# import browsergym.knows  # if you have knows installed

# # Get all browsergym environments
# env_ids = [id for id in gym.envs.registry.keys() if id.startswith("browsergym")]

# # Print them
# print("\n".join(sorted(env_ids)))



study = make_study(
    benchmark="knows_1",  # or "webarena", "workarena_l1" ...
    agent_args=[AGENT_4o],
    comment="Knows Benchmark",
)

study.dir = Path("results")


study.run(n_jobs=5)