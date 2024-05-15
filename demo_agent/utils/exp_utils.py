import argparse
import dataclasses
import gzip
import json
import logging
import numpy as np
import pickle
import sys
import time
import traceback
import uuid
import pandas as pd

from datetime import datetime
from pathlib import Path
from warnings import warn
from langchain_community.callbacks import get_openai_callback
from langchain_community.callbacks.openai_info import OpenAICallbackHandler
from contexttimer import Timer
from PIL import Image
from tqdm import tqdm

import gymnasium as gym
import browsergym.miniwob  # important, registers "browsergym/miniwob.*" gym environment
import browsergym.workarena  # important, registers "browsergym/workarena.*" gym environment
import browsergym.webarena  # important, registers "browsergym/webarena.*" gym environment
from browsergym.core.chat import Chat

from agents import AgentArgs
from agents.base import Agent

from utils.llm_utils import count_messages_token, count_tokens


class DataclassJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if dataclasses.is_dataclass(obj):
            return dataclasses.asdict(obj)
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)


def _move_old_exp(exp_dir):
    """Move the old experiment directory to a new name."""
    exp_dir = Path(exp_dir)
    if exp_dir.exists():
        exp_dir.rename(exp_dir.with_name("_" + exp_dir.name))


def hide_some_exp(base_dir, filter: callable, just_test):
    """Move all experiments that match the filter to a new name."""
    exp_list = list(yield_all_exp_results(base_dir, progress_fn=None))

    msg = f"Searching {len(exp_list)} experiments to move to _* expriments where `filter(exp_args)` is True."
    if just_test:
        msg += f"\nNote: This is a just a test, no experiments will be moved. Set `just_test=False` to move them."

    logging.info(msg)

    exp_list = tqdm(exp_list, desc=f"Filtering experiments.")

    filtered_out = []
    for exp in exp_list:
        if filter(exp):
            if not just_test:
                _move_old_exp(exp.exp_dir)
            filtered_out.append(exp)
    return filtered_out


@dataclasses.dataclass
class ExpArgs:
    agent_args: AgentArgs
    task_name: str
    task_kwargs: dict = dataclasses.field(default_factory=dict)
    env_extra_kwargs: dict = dataclasses.field(default_factory=dict)
    exp_dir: str = None
    exp_name: str = None
    task_seed: int = None
    exp_date: datetime = None
    max_steps: int = 10
    headless: bool = True
    sleep_at_each_step: float = None
    order: int = None  # use to keep the original order the experiments were meant to be lancuhed.

    def prepare(self, savedir_base):
        """Prepare the experiment directory and save the experiment arguments.

        This enables visualizing experiments that are not run yet. TODO more docstring
        """
        if self.task_seed is None:
            self.task_seed = np.random.randint(0, 1000)

        if self.exp_name is None:
            self.exp_name = f"{self.agent_args.agent_name}_on_{self.task_name}_{self.task_seed}"

        if self.exp_dir is not None:
            _move_old_exp(self.exp_dir)

        self.exp_date = datetime.now()
        date_str = self.exp_date.strftime("%Y-%m-%d_%H-%M-%S")

        while True:  # create a short unique id, but if it exists, try again
            id = str(uuid.uuid4().hex)[:6]
            self.exp_dir = Path(savedir_base) / f"{date_str}_{self.exp_name}_{id}"
            if not self.exp_dir.exists():
                break

        self.exp_dir.mkdir(parents=True, exist_ok=True)
        with open(self.exp_dir / "exp_args.pkl", "wb") as f:
            pickle.dump(self, f)

    def run(self):
        """Run the experiment and save the results"""

        episode_info = []
        try:
            logging.info(f"Running experiment {self.exp_name} in:\n  {self.exp_dir}")
            agent = self.agent_args.make_agent()

            env = gym.make(
                f"browsergym/{self.task_name}",
                disable_env_checker=True,
                max_episode_steps=self.max_steps,
                headless=self.headless,
                action_mapping=agent.get_action_mapping(),  # action mapping is provided by the agent
                task_kwargs=self.task_kwargs,
                **self.env_extra_kwargs,
            )

            err_msg, stack_trace = None, None
            step_info = StepInfo()
            episode_info = [step_info]
            step_info.reset_env(env, seed=self.task_seed, obs_processor=agent.preprocess_obs)

            while not step_info.is_done:  # set a limit
                action = step_info.perform_action(agent)
                if action is None:
                    break

                send_chat_info(env.unwrapped.chat, action, step_info.agent_info)

                step_info = StepInfo(step=step_info.step + 1)
                episode_info.append(step_info)
                step_info.perform_step(env, action, obs_processor=agent.preprocess_obs)

                if self.sleep_at_each_step:
                    time.sleep(self.sleep_at_each_step)

        except Exception as e:
            err_msg = f"Exception uncaught by agent or environment in task {self.task_name}.\n{type(e).__name__}:\n{e}"
            stack_trace = traceback.format_exc()

            warn(err_msg)
            if _is_debugging():
                raise

        finally:
            _save_steps_info(episode_info, self.exp_dir, err_msg, stack_trace)
            try:
                env.close()
            except Exception as e:
                logging.error(f"Error while closing the environment: {e}")


def send_chat_info(chat: Chat, action: str, agent_info: dict):
    info = {"think": agent_info.get("think", None), "action": action}
    msg = "\n\n".join([f"{key}:\n{val}" for key, val in info.items() if val is not None])
    logging.info(msg)
    chat.add_message(role="info", msg=msg)


@dataclasses.dataclass
class StepStats:
    """Collects statistics about a step."""

    n_token_dom_txt: int = None
    n_token_pruned_html: int = None
    n_token_axtree_txt: int = None
    n_token_prompt: int = None
    n_retry: int = None
    step_elapsed: float = None
    agent_elapsed: float = None
    openai_total_cost: float = None
    openai_total_tokens: int = None
    openai_completion_tokens: int = None
    openai_prompt_tokens: int = None

    def set_obs_stats(self, obs):
        self.n_token_dom_txt = count_tokens(obs["dom_txt"])
        self.n_token_pruned_html = count_tokens(obs["pruned_html"])
        self.n_token_axtree_txt = count_tokens(obs["axtree_txt"])

    def set_action_stats(self, agent_info, openai_cb: OpenAICallbackHandler):
        messages = agent_info.get("chat_messages", None)
        if messages is not None:
            self.n_token_prompt = count_messages_token(messages)

        n_retry = agent_info.get("n_retry", None)
        if n_retry is not None:
            self.n_retry = n_retry

        self.openai_total_cost = openai_cb.total_cost
        self.openai_total_tokens = openai_cb.total_tokens
        self.openai_completion_tokens = openai_cb.completion_tokens
        self.openai_prompt_tokens = openai_cb.prompt_tokens


@dataclasses.dataclass
class StepInfo:
    """Collects information about step that will be saved and reloaded.
    Helper functions only modify the dataclass attributes and helps keeping the
    information organized."""

    obs: dict = None
    reward: float = 0
    terminated: bool = False
    truncated: bool = False
    env_info: dict = None
    action: str = None
    agent_info: dict = dataclasses.field(default_factory=dict)
    step: int = 0
    stats: StepStats = dataclasses.field(default_factory=StepStats)

    def perform_step(self, env: gym.Env, action: str, obs_processor: callable):
        with Timer() as t:
            self.obs, self.reward, self.terminated, self.truncated, self.env_info = env.step(action)
        self.stats.step_elapsed = t.elapsed
        self._process_obs(obs_processor)

    def _process_obs(self, obs_processor: callable):
        obs_processor(self.obs)
        self.stats.set_obs_stats(self.obs)

    def perform_action(self, agent: Agent):
        with Timer() as t:
            with get_openai_callback() as openai_cb:
                self.action, self.agent_info = agent.get_action(self.obs)
        self.stats.agent_elapsed = t.elapsed
        self.stats.set_action_stats(self.agent_info, openai_cb)

        return self.action

    def reset_env(self, env: gym.Env, seed: int, obs_processor: callable):
        with Timer() as t:
            self.obs, self.env_info = env.reset(seed=seed)
        self.stats.step_elapsed = t.elapsed
        self._process_obs(obs_processor)

    @property
    def raw_reward(self):
        """Return the raw reward. Valid for MiniWoB"""
        try:
            return self.env_info.get("RAW_REWARD_GLOBAL")
        except (AttributeError, KeyError):
            return None

    @property
    def is_done(self):
        return self.terminated or self.truncated


def _extract_err_msg(episode_info: list[StepInfo]):
    """Extract the last error message from the episode info."""
    errors = [(None, None)]
    for step_info in episode_info:
        err_msg = step_info.agent_info.get("err_msg", None)
        if err_msg is not None:
            errors.append((err_msg, step_info.agent_info.get("stack_trace", None)))

    return errors[-1]


def _extract_steps_stats(episode_info: list[StepInfo]):
    df = pd.DataFrame([dataclasses.asdict(step_info.stats) for step_info in episode_info])

    stats = dict(
        cum_steps=len(episode_info) - 1,
        cum_token_dom_txt=df.n_token_dom_txt.sum(skipna=True),
        cum_token_pruned_html=df.n_token_pruned_html.sum(skipna=True),
        cum_token_axtree_txt=df.n_token_axtree_txt.sum(skipna=True),
        cum_token_prompt=df.n_token_prompt.sum(skipna=True),
        max_token_dom_txt=df.n_token_dom_txt.max(skipna=True),
        max_token_pruned_html=df.n_token_pruned_html.max(skipna=True),
        max_token_axtree_txt=df.n_token_axtree_txt.max(skipna=True),
        max_token_prompt=df.n_token_prompt.max(skipna=True),
        max_step_elapsed=df.step_elapsed.max(skipna=True),
        cum_step_elapsed=df.step_elapsed.sum(skipna=True),
        max_agent_elapsed=df.agent_elapsed.max(skipna=True),
        cum_agent_elapsed=df.agent_elapsed.sum(skipna=True),
        cum_openai_cost=df.openai_total_cost.sum(skipna=True),
        cum_openai_tokens=df.openai_total_tokens.sum(skipna=True),
        max_n_retry=df.n_retry.max(skipna=True),
        cum_n_retry=df.n_retry.sum(skipna=True),
    )
    for key, val in stats.items():
        if isinstance(val, np.generic):
            stats[key] = val.item()
        if np.isnan(val):
            stats[key] = None
    return stats


def _save_steps_info(
    episode_info: list[StepInfo],
    exp_dir,
    err_msg,
    stack_trace,
    save_json=False,
    save_jpg=True,
):
    # bring err from agent_info to the top level
    if err_msg is None:
        err_msg, stack_trace = _extract_err_msg(episode_info)
    else:
        # useful until we get a proper place in agent_xray to view error
        # messages.
        if len(episode_info) == 0:
            episode_info.append(StepInfo())
        episode_info[-1].agent_info["err_msg"] = err_msg
        episode_info[-1].agent_info["stack_trace"] = stack_trace

    with gzip.open(exp_dir / "steps_info.pkl.gz", "wb") as f:
        pickle.dump(episode_info, f)

    if save_json or save_jpg:
        for step_info in episode_info:
            if step_info.obs is None:
                warn(f"No obs in step_info, step {step_info.step}/{len(episode_info)}")
                continue
            image_array = step_info.obs.pop("screenshot", None)
            if save_jpg and image_array is not None:
                Image.fromarray(image_array).save(exp_dir / f"screenshot_step_{step_info.step}.jpg")
        if save_json:
            with open(exp_dir / "steps_info.json", "w") as f:
                json.dump(episode_info, f, indent=4, cls=DataclassJSONEncoder)

    reward_info = dict(
        n_steps=len(episode_info) - 1,
        cum_reward=sum([step.reward for step in episode_info]),
        cum_raw_reward=sum([step.raw_reward for step in episode_info if step.raw_reward]),
        err_msg=err_msg,
        stack_trace=stack_trace,
    )
    for key, val in _extract_steps_stats(episode_info).items():
        reward_info[f"stats.{key}"] = val

    if len(episode_info) > 0:
        reward_info["terminated"] = episode_info[-1].terminated
        reward_info["truncated"] = episode_info[-1].truncated

    with open(exp_dir / "reward_info.json", "w") as f:
        json.dump(reward_info, f, indent=4)


def _is_debugging():
    """Tells you if your code is currently running in debug mode."""
    return sys.gettrace() is not None


class ExpResult:
    """Helper class to load and visualize the results of an experiment.

    attributes are loaded lazily.
    """

    def __init__(self, exp_dir) -> None:
        self.exp_dir = Path(exp_dir)
        self._exp_args = None
        self._steps_info = None
        self._reward_info = None
        self._screenshots = None
        self._flat_exp_args = None

    @property
    def exp_args(self):
        if self._exp_args is None:
            with open(self.exp_dir / "exp_args.pkl", "rb") as f:
                self._exp_args = pickle.load(f)
        return self._exp_args

    @property
    def steps_info(self):
        if self._steps_info is None:
            if (self.exp_dir / "steps_info.pkl").exists():  # backward compatible
                with open(self.exp_dir / "steps_info.pkl", "rb") as f:
                    self._steps_info = pickle.load(f)
            else:
                with gzip.open(self.exp_dir / "steps_info.pkl.gz", "rb") as f:
                    self._steps_info = pickle.load(f)
        return self._steps_info

    @property
    def reward_info(self):
        if self._reward_info is None:
            with open(self.exp_dir / "reward_info.json", "r") as f:
                self._reward_info = json.load(f)
        return self._reward_info

    @property
    def screenshots(self):
        if self._screenshots is None:
            screenshots = []
            for fname in self.exp_dir.glob("screenshot_step_*.jpg"):
                step = int(fname.name.split("_")[-1].split(".")[0])
                screenshots.append((step, Image.open(fname)))
            screenshots.sort(key=lambda x: x[0])
            self._screenshots = [s[1] for s in screenshots]
        return self._screenshots

    @property
    def flat_exp_args(self):
        """Return a dict with exp_args flattened."""
        if self._flat_exp_args is None:
            exp_args = dataclasses.asdict(self.exp_args)
            # this will flatten nested dicts
            self._flat_exp_args = pd.json_normalize(exp_args, sep=".").to_dict(orient="records")[0]
        return self._flat_exp_args

    def get_summary(self):
        """Return a dict with exp_args flattened and reward_info."""
        record = {"exp_result": self}
        try:
            record.update(self.flat_exp_args)
        except FileNotFoundError:
            pass
        try:
            record.update(self.reward_info)
        except FileNotFoundError:
            pass
        return record


EXP_RESULT_CACHE = {}


def get_exp_result(exp_dir):
    """Keep a cache of pre-loaded exp_results for faster loading"""
    exp_dir = str(exp_dir)  # make sure it's not a Path
    exp_result = EXP_RESULT_CACHE.get(exp_dir, None)
    if exp_result is None:
        exp_result = ExpResult(exp_dir)
        EXP_RESULT_CACHE[exp_dir] = exp_result
    return exp_result


def yield_all_exp_results(savedir_base: str | Path, progress_fn=tqdm, load_hidden=False):
    """Recursively find all experiments from savedir_base folder.

    This will ignore all experiments that start with "_" or ".". use
    `load_hidden=True` to load them anyway.
    """

    savedir_base = Path(savedir_base)
    exp_args_paths = savedir_base.glob("**/exp_args.pkl")

    if progress_fn is not None:
        exp_args_paths = progress_fn(
            list(exp_args_paths), desc="Searching experiments directories."
        )

    for exp_args_path in exp_args_paths:
        exp_dir = exp_args_path.parent
        if not load_hidden:
            if exp_dir.name.startswith("_") or exp_dir.name.startswith("."):
                continue
        yield get_exp_result(exp_dir)


def str2bool(v):
    if isinstance(v, bool):
        return v
    if v.lower() in ("yes", "true", "t", "y", "1"):
        return True
    elif v.lower() in ("no", "false", "f", "n", "0"):
        return False
    else:
        raise argparse.ArgumentTypeError("Boolean value expected.")
