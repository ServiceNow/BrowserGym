import dataclasses


@dataclasses.dataclass
class EnvArgs:

    def make_env(self):
        pass


@dataclasses.dataclass
class AgentArgs:

    def make_env(self):
        pass


@dataclasses.dataclass
class ExpArgs:

    def run(self):
        pass
