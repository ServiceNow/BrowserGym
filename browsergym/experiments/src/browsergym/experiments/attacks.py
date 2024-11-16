from abc import ABC
from browsergym.experiments import Agent

class ObsAttack(ABC):
    def __init__(self):
        self._trace = []

    def get_adv_obs(self, obs):
       self._trace += [obs]
       return obs


class AxTreeObsAttack(ObsAttack):
    def get_adv_obs(self, obs):
        # Do malicious processing
        super().get_adv_obs(obs)
        #TODO(dvij): Generalize this beyond specifically this name perturbation
        name = obs['goal_object'][0]['text'].split()[4]
        obs['axtree_txt'] = obs['axtree_txt'].replace(name, 'Joe'+name[:2]+'Joe')    
        return obs
    

def get_attack(attack_args: str):
    match attack_args:
        case "AxTreeObsAttack":
            return AxTreeObsAttack()
        case _:
            raise ValueError("attack_args not valid")
        

class CorruptedAgent(Agent):
    def __init__(self, agent, attack_args):
        self._attack = get_attack(attack_args)
        self._agent = agent
    
    def get_action(self, obs):
        return self._agent.get_action(self._attack.get_adv_obs(obs))