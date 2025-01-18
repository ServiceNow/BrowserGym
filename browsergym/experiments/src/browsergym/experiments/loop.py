import copy
import gzip
import importlib.metadata
import json
import logging
import os
import pickle
import re
import sys
import time
import traceback
import uuid
from abc import ABC, abstractmethod
from collections import defaultdict
from dataclasses import asdict, dataclass, field, is_dataclass
from datetime import datetime
from pathlib import Path
from typing import Optional

import gymnasium as gym
import numpy as np
from dataclasses_json import DataClassJsonMixin
from PIL import Image
from tqdm import tqdm

from browsergym.core.chat import Chat
from browsergym.core.action.parsers import highlevel_action_parser

from .agent import Agent
from .utils import count_messages_token, count_tokens

logger = logging.getLogger(__name__)

SEED_MAX = 2 ^ 32  # arbitrary max value (exclusive), seems large enough


@dataclass
class EnvArgs(DataClassJsonMixin):
    task_name: str
    task_seed: Optional[int] = None
    max_steps: Optional[int] = None
    headless: bool = True
    record_video: bool = False
    wait_for_user_message: bool = False
    viewport: Optional[dict] = None  # use default value from BrowserGym
    slow_mo: Optional[int] = None  # use default value from BrowserGym
    storage_state: Optional[str | Path | dict] = None
    task_kwargs: Optional[dict] = None  # use default value from BrowserGym

    def make_env(self, action_mapping, exp_dir, exp_task_kwargs: dict = {}):
        """
        Instantiates the BrowserGym environment corresponding to the arguments (with some tweaks).

        Args:
            action_mapping: overrides the action mapping of the environment.
            exp_dir: will set some environment parameters (e.g., record_video_dir) with respect to the directory where the experiment is running.
            exp_task_kwargs: use with caution! Will override task parameters to experiment-specific values. Useful to set different server configs for different experiments, or output file paths within the experiment's folder (e.g., assistantbench).
        """
        extra_kwargs = {}
        if self.record_video:
            extra_kwargs["record_video_dir"] = exp_dir
        if self.viewport:
            extra_kwargs["viewport"] = self.viewport
        if self.slow_mo is not None:
            extra_kwargs["slow_mo"] = self.slow_mo
        if self.storage_state:
            extra_kwargs["pw_context_kwargs"] = {"storage_state": self.storage_state}
        if self.task_kwargs is not None:
            extra_kwargs["task_kwargs"] = self.task_kwargs
        if exp_task_kwargs:
            extra_kwargs["task_kwargs"] = extra_kwargs.get("task_kwargs", {}) | exp_task_kwargs

        # assistantbench hack, write the task output (agent prediction) to a file in the experiment's directory
        # TODO: find a better way to deal with this
        if self.task_name.startswith("assistantbench.test"):
            extra_kwargs["task_kwargs"] = extra_kwargs.get("task_kwargs", {}) | {
                "output_file": exp_dir / "assistantbench-prediction.json"
            }

        return gym.make(
            _get_env_name(self.task_name),
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

    agent_name: str = None

    def __post_init__(self):
        if self.agent_name is None:
            self.agent_name = self.__class__.__name__

    def prepare(self):
        """Prepare the agent's LLM models before running the experiment."""
        pass

    def close(self):
        """Close the agent's LLM models after running the experiment."""
        pass

    @abstractmethod
    def make_agent(self) -> Agent:
        """Comply the experiments.loop API for instantiating the agent."""


def save_package_versions(exp_dir: Path):
    """Save the versions of the installed packages in the experiment directory."""
    python_dists = "\n".join(
        sorted(
            [
                f'{dist.metadata["Name"]}=={dist.metadata["Version"]}'
                for dist in importlib.metadata.distributions()
            ]
        )
    )
    (exp_dir / "package_versions.txt").write_text(python_dists)


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
    order: int = None  # use to keep the original order the experiments were meant to be launched.
    logging_level: int = logging.INFO
    logging_level_stdout: int = logging.INFO
    exp_id: str = None
    depends_on: tuple[str] = ()
    save_screenshot: bool = True
    save_som: bool = False

    def make_id(self):
        """Create a unique id for the experiment."""
        if self.exp_id is None:
            self.exp_id = str(uuid.uuid4())

    def prepare(self, exp_root):
        """Prepare the experiment directory and save the experiment arguments.

        This enables inspecting experiments that are not run yet.
        """
        if self.env_args.task_seed is None:
            self.env_args.task_seed = np.random.randint(0, SEED_MAX)

        if self.exp_name is None:
            task_name = self.env_args.task_name
            self.exp_name = f"{self.agent_args.agent_name}_on_{task_name}_{self.env_args.task_seed}"

        # if exp_dir exists, it means it's a re-run, move the old one
        if self.exp_dir is not None:
            _move_old_exp(self.exp_dir)

        self.make_id()

        self.exp_date = datetime.now()
        self._make_dir(exp_root)

        self.exp_dir.mkdir(parents=True, exist_ok=True)
        with open(self.exp_dir / "exp_args.pkl", "wb") as f:
            pickle.dump(self, f)

    def _make_dir(self, exp_root):
        """Create a unique directory for the experiment."""
        date_str = self.exp_date.strftime("%Y-%m-%d_%H-%M-%S")
        exp_str = re.sub(
            r"[\/:*?<>|]", "_", self.exp_name
        )  # sanitize exp_name to be used as a file name (substitute forbidden characters)

        for i in range(1000):
            if i >= 999:  # make sure we don't loop forever
                raise ValueError("Could not find a unique name for the experiment directory.")

            tag = f"_{i}" if i > 0 else ""
            self.exp_dir = Path(exp_root) / f"{date_str}_{exp_str}{tag}"
            if not self.exp_dir.exists():
                break

    # TODO distinguish between agent error and environment or system error. e.g.
    # the parsing error of an action should not be re-run.
    def run(self):
        """Run the experiment and save the results"""

        # start writing logs to run logfile
        self._set_logger()

        # log python environment info
        save_package_versions(self.exp_dir)

        episode_info = []
        env, step_info, err_msg, stack_trace = None, None, None, None
        try:
            logger.info(f"Running experiment {self.exp_name} in:\n  {self.exp_dir}")
            agent = self.agent_args.make_agent()
            logger.debug(f"Agent created.")

            env = self.env_args.make_env(
                action_mapping=agent.action_set.to_python_code,
                exp_dir=self.exp_dir,
            )

            logger.debug(f"Environment created.")

            step_info = StepInfo(step=0)
            episode_info = [step_info]
            step_info.from_reset(
                env, seed=self.env_args.task_seed, obs_preprocessor=agent.obs_preprocessor
            )
            logger.debug(f"Environment reset.")

            while not step_info.is_done:  # set a limit
                logger.debug(f"Starting step {step_info.step}.")
                action = step_info.from_action(agent)
                logger.debug(f"Agent chose action:\n {action}")

                if action is None:
                    # will end the episode after saving the step info.
                    step_info.truncated = True

                step_info.save_step_info(
                    self.exp_dir, save_screenshot=self.save_screenshot, save_som=self.save_som
                )
                logger.debug(f"Step info saved.")

                _send_chat_info(env.unwrapped.chat, action, step_info.agent_info)
                logger.debug(f"Chat info sent.")

                if action is None:
                    logger.debug(f"Agent returned None action. Ending episode.")
                    break

                step_info = StepInfo(step=step_info.step + 1)
                episode_info.append(step_info)

                logger.debug(f"Sending action to environment.")
                step_info.from_step(env, action, obs_preprocessor=agent.obs_preprocessor)
                logger.debug(f"Environment stepped.")

        except Exception as e:
            err_msg = f"Exception uncaught by agent or environment in task {self.env_args.task_name}.\n{type(e).__name__}:\n{e}"
            stack_trace = traceback.format_exc()

            self.err_msg = err_msg
            self.stack_trace = stack_trace

            logger.warning(err_msg + "\n" + stack_trace)
            if _is_debugging() and self.enable_debug:
                logger.warning("Debug mode is enabled. Raising the error.")
                raise

        finally:
            try:
                if step_info is not None:
                    step_info.save_step_info(
                        self.exp_dir, save_screenshot=self.save_screenshot, save_som=self.save_som
                    )
            except Exception as e:
                logger.error(f"Error while saving step info in the finally block: {e}")
            try:
                if (
                    not err_msg
                    and len(episode_info) > 0
                    and not (episode_info[-1].terminated or episode_info[-1].truncated)
                ):
                    e = KeyboardInterrupt("Early termination??")
                    err_msg = f"Exception uncaught by agent or environment in task {self.env_args.task_name}.\n{type(e).__name__}:\n{e}"
                logger.info(f"Saving summary info.")
                _save_summary_info(episode_info, self.exp_dir, err_msg, stack_trace)
            except Exception as e:
                logger.error(f"Error while saving summary info in the finally block: {e}")
            try:
                if env is not None:
                    env.close()
            except Exception as e:
                logger.error(f"Error while closing the environment in the finally block: {e}")
            try:
                self._unset_logger()  # stop writing logs to run logfile
            except Exception as e:
                logger.error(f"Error while unsetting the logger in the finally block: {e}")

    def _set_logger(self):
        # output logging traces to a log file
        file_handler = logging.FileHandler(self.exp_dir / "experiment.log")
        file_handler.setLevel(self.logging_level)  # same level as console outputs
        formatter = logging.Formatter(
            "%(asctime)s - %(process)d - %(name)s - %(levelname)s - %(message)s"
        )
        file_handler.setFormatter(formatter)
        # output handler
        stream_handler = logging.StreamHandler()
        stream_handler.setLevel(self.logging_level_stdout)
        stream_handler.setFormatter(formatter)
        # setup root logger
        root_logger = logging.getLogger()

        # remove previous stream handlers
        for handler in root_logger.handlers:
            if isinstance(handler, logging.StreamHandler):
                root_logger.removeHandler(handler)

        root_logger.setLevel(self.logging_level)
        root_logger.addHandler(file_handler)
        root_logger.addHandler(stream_handler)
        # setup openai logger (don't go below INFO verbosity)
        openai_logger = logging.getLogger("openai._base_client")
        openai_logger.setLevel(max(logging.INFO, self.logging_level))

        self.logging_file_handler = file_handler

    def _unset_logger(self):
        root_logger = logging.getLogger()
        root_logger.removeHandler(self.logging_file_handler)


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
    reward: float = 0
    raw_reward: float = 0
    terminated: bool = None
    truncated: bool = None
    action: str = None
    agent_info: dict = field(default_factory=dict)
    stats: dict = None
    profiling: StepTimestamps = field(default_factory=StepTimestamps)
    task_info: dict = None

    def from_step(self, env: gym.Env, action: str, obs_preprocessor: callable):
        t = self.profiling
        t.env_start = time.time()
        self.obs, self.reward, self.terminated, self.truncated, env_info = env.step(action)
        t.env_stop = time.time()

        self.task_info = env_info.get("task_info", None)

        self.raw_reward = env_info.get("RAW_REWARD_GLOBAL", None)

        t.action_exec_start = env_info["action_exec_start"]  # start
        t.action_exect_after_timeout = env_info["action_exec_stop"]
        t.action_exec_stop = env_info["action_exec_stop"] - env_info["action_exec_timeout"]

        if obs_preprocessor:
            self.obs = obs_preprocessor(self.obs)

    def from_action(self, agent: Agent):
        self.profiling.agent_start = time.time()
        self.action, self.agent_info = agent.get_action(self.obs.copy())
        self.profiling.agent_stop = time.time()

        self.make_stats()

        return self.action

    def from_reset(self, env: gym.Env, seed: int, obs_preprocessor: callable):
        t = self.profiling
        t.env_start = time.time()
        self.obs, env_info = env.reset(seed=seed)
        self.reward, self.terminated, self.truncated = 0, False, False
        t.env_stop = time.time()

        t.action_exec_start = env_info.get("recording_start_time", t.env_start)
        t.action_exect_after_timeout = t.env_stop
        t.action_exec_stop = t.env_stop

        if obs_preprocessor:
            self.obs = obs_preprocessor(self.obs)

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

    def save_step_info(self, exp_dir, save_json=False, save_screenshot=True, save_som=False):

        # special treatment for some of the observation fields
        if self.obs is not None:
            # save screenshots to separate files
            screenshot = self.obs.pop("screenshot", None)
            screenshot_som = self.obs.pop("screenshot_som", None)

            if save_screenshot and screenshot is not None:
                img = Image.fromarray(screenshot)
                img.save(exp_dir / f"screenshot_step_{self.step}.png")

            if save_som and screenshot_som is not None:
                img = Image.fromarray(screenshot_som)
                img.save(exp_dir / f"screenshot_som_step_{self.step}.png")

            # save goal object (which might contain images) to a separate file to save space
            if self.obs.get("goal_object", False):
                # save the goal object only once (goal should never change once setup)
                goal_object_file = Path(exp_dir) / "goal_object.pkl.gz"
                if not goal_object_file.exists():
                    with gzip.open(goal_object_file, "wb") as f:
                        pickle.dump(self.obs["goal_object"], f)
                # set goal_object to a special placeholder value, which indicates it should be loaded from a separate file
                self.obs["goal_object"] = None

        with gzip.open(exp_dir / f"step_{self.step}.pkl.gz", "wb") as f:
            pickle.dump(self, f)

        if save_json:
            with open(exp_dir / "steps_info.json", "w") as f:
                json.dump(self, f, indent=4, cls=DataclassJSONEncoder)

        if self.obs is not None:
            # add the screenshots back to the obs
            # why do we need this?
            if screenshot is not None:
                self.obs["screenshot"] = screenshot
            if screenshot_som is not None:
                self.obs["screenshot_som"] = screenshot_som


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
        self._logs = None

    @property
    def exp_args(self) -> ExpArgs:
        if self._exp_args is None:
            with open(self.exp_dir / "exp_args.pkl", "rb") as f:
                self._exp_args = pickle.load(f)
                # in case experiments were moved
                self._exp_args.exp_dir = self.exp_dir
        return self._exp_args

    def get_step_info(self, step: int) -> StepInfo:
        """Load the step info from the file and return it."""
        if self._steps_info.get(step, None) is None:
            with gzip.open(self.exp_dir / f"step_{step}.pkl.gz", "rb") as f:
                self._steps_info[step] = pickle.load(f)
            if self._steps_info[step].obs:
                if "screenshot" not in self._steps_info[step].obs:
                    try:
                        self._steps_info[step].obs["screenshot"] = np.array(
                            self.get_screenshot(step), dtype=np.uint8
                        )
                    except FileNotFoundError:
                        pass
                if "screenshot_som" not in self._steps_info[step].obs:
                    try:
                        self._steps_info[step].obs["screenshot_som"] = np.array(
                            self.get_screenshot(step, som=True), dtype=np.uint8
                        )
                    except FileNotFoundError:
                        pass
                # if goal_object is set to None, it indicates it has been saved into a separate file
                if (
                    "goal_object" in self._steps_info[step].obs
                    and self._steps_info[step].obs["goal_object"] is None
                ):
                    with gzip.open(self.exp_dir / "goal_object.pkl.gz", "rb") as f:
                        goal_object = pickle.load(f)
                        self._steps_info[step].obs["goal_object"] = goal_object

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
                # if length is zero raise file not found error
                if os.fstat(f.fileno()).st_size == 0:
                    raise FileNotFoundError(f"summary_info.json is empty.")
                self._summary_info = json.load(f)
        return self._summary_info

    @property
    def tape(self) -> dict:
        """
        TapeAgents (https://github.com/ServiceNow/TapeAgents) framework compatibility.
        Exports experiment trace in the format of serialized tape.
        Reuses tape segments if they were already placed in the agent_info during the experiment.

        :returns: dict: serialized tape of the experiment
        """
        steps = []
        for step_info in self.steps_info:
            if "tape_segment" in step_info.agent_info["extra_info"]:
                tape_segment = step_info.agent_info["extra_info"]["tape_segment"]
            else:
                tape_segment = self._create_tape_segment(step_info)
            steps += tape_segment
        metadata = dict(
            id=str(uuid.uuid4()),
            author=f"browsergym_agent_[{self.exp_args.agent_args.agent_name}]",
            result=self.get_exp_record(),
        )
        return dict(steps=steps, metadata=metadata)

    def _create_tape_segment(self, step_info: StepInfo) -> list[dict]:
        tape_segment = []
        # extract observation step
        if step_info.obs is not None:
            screenshot: str = ""
            screenshot_som: str = ""
            obs_dict = copy.deepcopy(step_info.obs)
            if "screenshot" in obs_dict:
                screenshot = str(self.exp_dir / f"screenshot_step_{step_info.step}.png")
                obs_dict.pop("screenshot")
            if "screenshot_som" in obs_dict:
                screenshot_som = str(self.exp_dir / f"screenshot_som_step_{step_info.step}.png")
                obs_dict.pop("screenshot_som")
            tape_segment.append(
                dict(
                    kind="browsergym_observation",
                    metadata=dict(step=step_info.step),
                    obs=obs_dict,
                    screenshot=screenshot,
                    screenshot_som=screenshot_som,
                )
            )

        # extract thought step
        think = step_info.agent_info.get("think", "")
        if think:
            tape_segment.append(
                dict(kind="browsergym_thought", metadata={"step": step_info.step}, text=think)
            )

        # extract action steps
        function_calls = highlevel_action_parser.parse_string(step_info.action, parse_all=True)
        for name, arguments in function_calls:
            tape_segment.append(
                dict(
                    kind="browsergym_action",
                    metadata=dict(
                        step=step_info.step,
                        reward=step_info.reward,
                        raw_reward=step_info.raw_reward,
                        terminated=step_info.terminated,
                        truncated=step_info.truncated,
                        agent_info=step_info.agent_info,
                        stats=step_info.stats,
                        task_info=step_info.task_info,
                    ),
                    name=name,
                    arguments=arguments,
                )
            )
        return tape_segment

    def save_tape(self, filename: str = "tape.json"):
        if os.path.exists(self.exp_dir / filename):
            raise FileExistsError(f"{filename} already exists in {self.exp_dir}")
        with open(self.exp_dir / filename, "w") as f:
            json.dump(self.tape, f, indent=4, ensure_ascii=False)

    def get_screenshot(self, step: int, som=False) -> Image:
        key = (step, som)
        if self._screenshots.get(key, None) is None:
            file_name = f"screenshot_{'som_' if som else ''}step_{step}"
            try:
                with Image.open(self.exp_dir / (file_name + ".png")) as img:
                    self._screenshots[key] = img.copy()
            except FileNotFoundError:
                with Image.open(self.exp_dir / (file_name + ".jpg")) as img:
                    self._screenshots[key] = img.copy()
        return self._screenshots[key]

    def get_screenshots(self, som=False):
        files = list(self.exp_dir.glob("screenshot_step_*"))
        max_step = 0
        for file in files:
            step = int(file.name.split("_")[-1].split(".")[0])
            self.get_screenshot(step, som=som)
            max_step = max(max_step, step)
        return [self._screenshots.get((i, som), None) for i in range(max_step + 1)]

    @property
    def screenshots(self):
        return self.get_screenshots(som=False)

    @property
    def screenshots_som(self):
        return self.get_screenshots(som=True)

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

    @property
    def logs(self):
        if self._logs is None:
            self._logs = (self.exp_dir / "experiment.log").read_text()
        return self._logs

    @property
    def status(self):
        """Return one of the following status:
        * "done": completed with no error
        * "error": completed with error
        * "incomplete": not completed yet (may be pending or just stalled)
        """
        try:
            summary_info = self.summary_info
        except FileNotFoundError:
            return "incomplete"

        if summary_info.get("err_msg", None) is not None:
            return "error"

        if summary_info.get("terminated", False) or summary_info.get("truncated", False):
            return "done"

        return "incomplete"


EXP_RESULT_CACHE = {}


def get_exp_result(exp_dir) -> ExpResult:
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

    if not isinstance(savedir_base, list):
        savedir_base = [savedir_base]

    exp_args_paths = []
    for exp_dir in savedir_base:
        exp_args_paths.extend(list(Path(exp_dir).glob("**/exp_args.pkl")))

    if progress_fn is not None:
        exp_args_paths = progress_fn(exp_args_paths, desc="Searching experiments directories.")

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
    elif task_name.startswith("visualwebarena"):
        import browsergym.visualwebarena
    elif task_name.startswith("assistantbench"):
        import browsergym.assistantbench
    elif task_name.startswith("weblinx"):
        import weblinx_browsergym

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

    logger.info(msg)
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
