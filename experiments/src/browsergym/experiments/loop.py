import gzip
import json
import logging
import pickle
import sys
import time
import traceback
import uuid
from collections import defaultdict
from dataclasses import dataclass, field, asdict, is_dataclass
from datetime import datetime
from pathlib import Path
from abc import ABC, abstractmethod
from typing import Optional

import gymnasium as gym
import numpy as np
from PIL import Image
from tqdm import tqdm

from browsergym.core.chat import Chat

from .agent import Agent
from .utils import count_messages_token, count_tokens


@dataclass
class EnvArgs:
    task_name: str
    task_seed: int = None
    max_steps: int = None
    headless: bool = True
    record_video: bool = False
    wait_for_user_message: bool = False
    viewport: dict = None  # use default value from BrowserGym
    slow_mo: int = None  # use default value from BrowserGym
    storage_state: Optional[str | Path | dict] = None
    task_kwargs: dict = field(default_factory=lambda: {})

    def make_env(self, action_mapping, exp_dir):
        extra_kwargs = {}
        if self.record_video:
            extra_kwargs["record_video_dir"] = exp_dir
        if self.viewport:
            extra_kwargs["viewport"] = self.viewport
        if self.slow_mo is not None:
            extra_kwargs["slow_mo"] = self.slow_mo
        if self.storage_state:
            extra_kwargs["pw_context_kwargs"] = {"storage_state": self.storage_state}

        return gym.make(
            _get_env_name(self.task_name),
            task_kwargs=self.task_kwargs,
            disable_env_checker=True,
            max_episode_steps=self.max_steps,
            headless=self.headless,
            wait_for_user_message=self.wait_for_user_message,
            action_mapping=action_mapping,  # action mapping is provided by the agent
            **extra_kwargs,
        )


@dataclass
class AbstractAgentArgs(ABC):
    """A template class that defines the required signature of an agent's arguments."""

    @property
    def agent_name(self) -> str:
        """The name of the agent. Used for naming experiments."""
        return self.__class__.__name__

    @abstractmethod
    def make_agent(self) -> Agent:
        """Comply the experiments.loop API for instantiating the agent."""


@dataclass
class ExpArgs:
    """Arguments to run an experiment, i.e. run agent in an environment until done.

    This dataclass is used to store experiments arguments. It contains
    agent_args and env_args which follows the same principle. It contains helper
    functions to prepare and run experiments.

    Attributes:
    -----------
    agent_args: AbstractAgentArgs
        The arguments to instantiate the agent.
    env_args: EnvArgs
        The arguments to instantiate the environment.
    exp_dir: str
        The directory where the experiment will be saved.
    exp_name: str
        The name of the experiment. If None, it will be generated from the
        agent and environment names.
    enable_debug: bool
        If python is running in debug mode and `enable_debug` is True, errors
        will be raised instead of only logged
    error_msg: str
        Error that occured while running the experiment (if any).
    stack_trace: str
        Stack trace of the error (if any).
    order: int (internal)
        The order of the experiment in the batch. It is used to keep track of
        the original order of the experiments in case they are shuffled.
    """

    agent_args: AbstractAgentArgs
    env_args: EnvArgs
    exp_dir: str = None
    exp_name: str = None
    enable_debug: bool = True
    err_msg: str = None
    stack_trace: str = None
    order: int = None  # use to keep the original order the experiments were meant to be lancuhed.

    def prepare(self, exp_root):
        """Prepare the experiment directory and save the experiment arguments.

        This enables inspecting experiments that are not run yet.
        """
        if self.env_args.task_seed is None:
            self.env_args.task_seed = np.random.randint(0, 1000)

        if self.exp_name is None:
            task_name = self.env_args.task_name
            self.exp_name = f"{self.agent_args.agent_name}_on_{task_name}_{self.env_args.task_seed}"

        # if exp_dir exists, it means it's a re-run, move the old one
        if self.exp_dir is not None:
            _move_old_exp(self.exp_dir)

        self.exp_date = datetime.now()
        date_str = self.exp_date.strftime("%Y-%m-%d_%H-%M-%S")

        while True:  # create a short unique id, but if it exists, try again
            id = str(uuid.uuid4().hex)[:6]
            self.exp_dir = Path(exp_root) / f"{date_str}_{self.exp_name}_{id}"
            if not self.exp_dir.exists():
                break

        self.exp_dir.mkdir(parents=True, exist_ok=True)
        with open(self.exp_dir / "exp_args.pkl", "wb") as f:
            pickle.dump(self, f)

    # TODO distinguish between agent error and environment or system error. e.g.
    # the parsing error of an action should not be re-run.
    def run(self):
        """Run the experiment and save the results"""

        episode_info = []
        try:
            logging.info(f"Running experiment {self.exp_name} in:\n  {self.exp_dir}")
            agent = self.agent_args.make_agent()
            env = self.env_args.make_env(
                action_mapping=agent.action_set.to_python_code, exp_dir=self.exp_dir
            )

            err_msg, stack_trace = None, None
            step_info = StepInfo(step=0)
            episode_info = [step_info]
            step_info.from_reset(env, seed=self.env_args.task_seed)

            while not step_info.is_done:  # set a limit
                action = step_info.from_action(agent)
                step_info.save_step_info(self.exp_dir)
                if action is None:
                    break

                _send_chat_info(env.unwrapped.chat, action, step_info.agent_info)

                step_info = StepInfo(step=step_info.step + 1)
                episode_info.append(step_info)
                step_info.from_step(env, action)

        except Exception as e:
            err_msg = f"Exception uncaught by agent or environment in task {self.env_args.task_name}.\n{type(e).__name__}:\n{e}"
            stack_trace = traceback.format_exc()

            self.err_msg = err_msg
            self.stack_trace = stack_trace

            logging.warning(err_msg + "\n" + stack_trace)
            if _is_debugging() and self.enable_debug:
                raise

        finally:
            try:
                step_info.save_step_info(self.exp_dir)
                _save_summary_info(episode_info, self.exp_dir, err_msg, stack_trace)
                env.close()
            except Exception as e:
                logging.error(f"Error while finalizing the experiment loop: {e}")


@dataclass
class StepTimestamps:
    env_start: float = 0
    action_exec_start: float = 0  # to extract begining of visual action from video
    action_exec_stop: float = 0  # to extract end of visual action from video
    action_exect_after_timeout: float = 0
    env_stop: float = 0
    agent_start: float = 0
    agent_stop: float = 0


@dataclass
class StepInfo:
    """Collects information about step that will be saved and reloaded.
    Helper functions only modify the dataclass attributes and helps keeping the
    information organized.

    Attributes:
    -----------
    step: int
        The step number of the episode.
    obs: dict
        The observation of the environment.
    reward: float
        The reward of the step.
    raw_reward: float
        The raw reward of the step.
    terminated: bool
        Whether the episode is terminated i.e. reached a terminal state.
    truncated: bool
        Whether the episode is truncated i.e. reached a maximum number of steps.
    action: str
        The action taken by the agent.
    agent_info: dict
        Additional information from the agent.
    stats: dict
        Extra statistics about the step.
    profiling: StepTimestamps
        Timestamps of the different events during the episode.
    """

    step: int = None
    obs: dict = None
    reward: float = None
    raw_reward: float = None
    terminated: bool = None
    truncated: bool = None
    action: str = None
    agent_info: dict = field(default_factory=dict)
    stats: dict = None
    profiling: StepTimestamps = field(default_factory=StepTimestamps)

    def from_step(self, env: gym.Env, action: str):
        t = self.profiling
        t.env_start = time.time()
        self.obs, self.reward, self.terminated, self.truncated, env_info = env.step(action)
        t.env_stop = time.time()

        self.raw_reward = env_info.get("RAW_REWARD_GLOBAL", None)

        t.action_exec_start = env_info["action_exec_start"]  # start
        t.action_exect_after_timeout = env_info["action_exec_stop"]
        t.action_exec_stop = env_info["action_exec_stop"] - env_info["action_exec_timeout"]

    def from_action(self, agent: Agent):
        self.profiling.agent_start = time.time()
        if agent.obs_preprocessor:
            self.obs = agent.obs_preprocessor(self.obs)
        self.action, self.agent_info = agent.get_action(self.obs)
        self.profiling.agent_stop = time.time()

        self.make_stats()

        return self.action

    def from_reset(self, env: gym.Env, seed: int):
        t = self.profiling
        t.env_start = time.time()
        self.obs, env_info = env.reset(seed=seed)
        self.reward, self.terminated, self.truncated = 0, False, False
        t.env_stop = time.time()

        t.action_exec_start = env_info.get("recording_start_time", t.env_start)
        t.action_exect_after_timeout = t.env_stop
        t.action_exec_stop = t.env_stop

    @property
    def is_done(self):
        return self.terminated or self.truncated

    def make_stats(self):

        stats = {
            f"n_token_{key}": count_tokens(val)
            for key, val in self.obs.items()
            if isinstance(val, str)
        }
        stats.update(self.agent_info.pop("stats", {}))

        messages = self.agent_info.get("chat_messages", None)
        if messages is not None:
            stats["n_token_agent_messages"] = count_messages_token(messages)

        t = self.profiling
        stats["step_elapsed"] = t.env_stop - t.env_start
        stats["agent_elapsed"] = t.agent_stop - t.agent_start

        self.stats = stats

    def save_step_info(self, exp_dir, save_json=False, save_jpg=True):

        with gzip.open(exp_dir / f"step_{self.step}.pkl.gz", "wb") as f:
            pickle.dump(self, f)

        if save_jpg and self.obs is not None:
            for name in ("screenshot", "screenshot_som"):
                if name in self.obs:
                    img = Image.fromarray(self.obs[name])
                    img.save(exp_dir / f"{name}_step_{self.step}.jpg")

        if save_json:
            with open(exp_dir / "steps_info.json", "w") as f:
                json.dump(self, f, indent=4, cls=DataclassJSONEncoder)


def _extract_err_msg(episode_info: list[StepInfo]):
    """Extract the last error message from the episode info."""
    errors = [(None, None)]
    for step_info in episode_info:
        if step_info.agent_info is None:
            continue
        err_msg = step_info.agent_info.get("err_msg", None)
        if err_msg is not None:
            errors.append((err_msg, step_info.agent_info.get("stack_trace", None)))

    return errors[-1]


def _aggregate_episode_stats(episode_info: list[StepInfo]):
    """Aggregate StepInfo.stats across episodes.

    It will compute the sum and max of each value in the stats dict.
    These two summaries should cover many use cases. If more are needed, the
    user can compute other stats by reloading individual StepInfo.
    """
    # discard the last step since it was not seen by the agent
    episode_info = episode_info[:-1]

    stats = defaultdict(list)
    for step_info in episode_info:
        if step_info.stats is not None:
            for key, val in step_info.stats.items():
                if val is None:
                    val = np.nan
                stats[key].append(val)

    aggregated_stats = {"cum_steps": len(episode_info)}  # to be able to compute the mean
    for key, val_list in stats.items():
        aggregated_stats[f"cum_{key}"] = np.nansum(val_list)
        aggregated_stats[f"max_{key}"] = np.nanmax(val_list)

    for key, val in aggregated_stats.items():
        if isinstance(val, np.generic):
            aggregated_stats[key] = val.item()
        if np.isnan(val):
            aggregated_stats[key] = None
    return aggregated_stats


def _save_summary_info(
    episode_info: list[StepInfo],
    exp_dir,
    err_msg,
    stack_trace,
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

    summary_info = dict(
        n_steps=len(episode_info) - 1,
        cum_reward=sum([step.reward for step in episode_info]),
        cum_raw_reward=sum([step.raw_reward for step in episode_info if step.raw_reward]),
        err_msg=err_msg,
        stack_trace=stack_trace,
    )
    for key, val in _aggregate_episode_stats(episode_info).items():
        summary_info[f"stats.{key}"] = val

    if len(episode_info) > 0:
        summary_info["terminated"] = episode_info[-1].terminated
        summary_info["truncated"] = episode_info[-1].truncated

    with open(exp_dir / "summary_info.json", "w") as f:
        json.dump(summary_info, f, indent=4)


def _is_debugging():
    """Tells you if your code is currently running in debug mode."""
    return sys.gettrace() is not None


class ExpResult:
    """Helper class to load and visualize the results of an experiment.

    attributes are loaded lazily.

    Attributes (lazily loaded):
        exp_args: ExpArgs, the arguments of the experiment.
        steps_info: list[StepInfo], the information of each steps so far
        summary_info: dict, the summary of the experiment.
        screenshots: list[Image], the screenshots of each step.
        screenshots_som: list[Image], the screenshots of each step with set of
            marks inprinted.
        flat_exp_args: dict, the flattened version of exp_args.
        chat_video_path: Path, the path to the chat video. (if record_video=True)
        task_video_path: Path, the path to the task video. (if record_video=True)
        combined_video_path: Path, the path to the combined video. (if video was
            combined)
    """

    def __init__(self, exp_dir) -> None:
        self.exp_dir = Path(exp_dir)
        self._exp_args = None
        self._steps_info = {}
        self._summary_info = None
        self._screenshots = {}
        self._flat_exp_args = None

    @property
    def exp_args(self):
        if self._exp_args is None:
            with open(self.exp_dir / "exp_args.pkl", "rb") as f:
                self._exp_args = pickle.load(f)
        return self._exp_args

    def get_step_info(self, step: int) -> StepInfo:
        """Load the step info from the file and return it."""
        if self._steps_info.get(step, None) is None:
            with gzip.open(self.exp_dir / f"step_{step}.pkl.gz", "rb") as f:
                self._steps_info[step] = pickle.load(f)
        return self._steps_info[step]

    @property
    def steps_info(self) -> list[StepInfo]:
        step_files = list(self.exp_dir.glob("step_*.pkl.gz"))
        for file in step_files:
            step = int(file.name.split("_")[-1].split(".")[0])
            self.get_step_info(step)

        return [self._steps_info[i] for i in range(len(self._steps_info))]

    @property
    def summary_info(self) -> dict:
        if self._summary_info is None:
            with open(self.exp_dir / "summary_info.json", "r") as f:
                self._summary_info = json.load(f)
        return self._summary_info

    def get_screenshot(self, step: int, som=False) -> Image:
        key = (step, som)
        if self._screenshots.get(key, None) is None:
            file_name = f"screenshot_{'som_' if som else ''}step_{step}.jpg"
            self._screenshots[key] = Image.open(self.exp_dir / file_name)
        return self._screenshots[key]

    @property
    def screenshots(self, som=False):
        files = list(self.exp_dir.glob("screenshot_step_*.jpg"))
        for file in files:
            step = int(file.name.split("_")[-1].split(".")[0])
            self.get_screenshot(step, som=som)
        return [self._screenshots[(i, som)] for i in range(len(self._screenshots))]

    @property
    def screenshots_som(self):
        return self.screenshots(som=True)

    @property
    def flat_exp_args(self) -> dict:
        """Return a dict with exp_args flattened."""
        if self._flat_exp_args is None:
            exp_args = asdict(self.exp_args)
            # this will flatten nested dicts
            self._flat_exp_args = _flatten_dict(exp_args)
        return self._flat_exp_args

    def get_exp_record(self) -> dict:
        """Return a dict with exp_args flattened and summary_info."""
        record = {"exp_dir": self.exp_dir}
        try:
            record.update(self.flat_exp_args)
        except FileNotFoundError:
            pass
        try:
            record.update(self.summary_info)
        except FileNotFoundError:
            pass
        return record

    @property
    def chat_video_path(self) -> Path:
        try:
            return next(self.exp_dir.glob("chat_video/*.webm"))
        except StopIteration:
            raise FileNotFoundError(f"No chat_video found in {self.exp_dir}")

    @property
    def task_video_path(self) -> Path:
        try:
            return next(self.exp_dir.glob("task_video/*.webm"))
        except StopIteration:
            raise FileNotFoundError(f"No task_video found in {self.exp_dir}")

    @property
    def combined_video_path(self) -> Path:
        return self.exp_dir / "combined_video.mp4"


EXP_RESULT_CACHE = {}


def get_exp_result(exp_dir):
    """Keep a cache of pre-loaded exp_results for faster loading"""
    exp_dir = str(exp_dir)  # make sure it's not a Path
    exp_result = EXP_RESULT_CACHE.get(exp_dir, None)
    if exp_result is None:
        exp_result = ExpResult(exp_dir)
        EXP_RESULT_CACHE[exp_dir] = exp_result
    return exp_result


def yield_all_exp_results(
    savedir_base: str | Path, progress_fn=tqdm, load_hidden=False, use_cache=True
):
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
        if use_cache:
            yield get_exp_result(exp_dir)
        else:
            yield ExpResult(exp_dir)


class DataclassJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if is_dataclass(obj):
            return asdict(obj)
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


def _get_env_name(task_name: str):
    """Register tasks if needed (lazy import) and return environment name."""

    # lazy benchmark import
    if task_name.startswith("miniwob"):
        import browsergym.miniwob
    elif task_name.startswith("workarena"):
        import browsergym.workarena
    elif task_name.startswith("webarena"):
        import browsergym.webarena

    return f"browsergym/{task_name}"


def _send_chat_info(chat: Chat, action: str, agent_info: dict):
    """Send the think and action info to the chat."""
    msg = ""
    if "think" in agent_info:
        msg += f"""\
{agent_info["think"]}

"""

    msg += f"""\
action:
{action}
"""

    logging.info(msg)
    chat.add_message(role="info", msg=msg)


def _flatten_dict(d, parent_key="", sep="."):
    """Recursively flatten a nested dictionary."""
    items = []
    for k, v in d.items():
        new_key = parent_key + sep + k if parent_key else k
        if isinstance(v, dict):
            items.extend(_flatten_dict(v, new_key, sep).items())
        else:
            items.append((new_key, v))
    return dict(items)
