from agentlab.agents.generic_agent import AGENT_4o_MINI 
from agentlab.agents.generic_agent import AGENT_4o
from agentlab.experiments.study import make_study
from pathlib import Path
from agentlab.experiments.study import Study

study = make_study(
    benchmark="knows_1",  # or "webarena", "workarena_l1" ...
    agent_args=[AGENT_4o],
    comment="Knows Benchmark",
)

study.dir = Path("results")


study.run(n_jobs=5)