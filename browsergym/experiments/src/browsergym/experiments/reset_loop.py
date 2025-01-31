"""
    utils for restoring browser state from a previous session
"""

import logging
import traceback
import re

from browsergym.experiments.loop import (
    ExpArgs,
    StepInfo,
    _send_chat_info,
    _save_summary_info,
    save_package_versions,
    _is_debugging,
)
from dataclasses import dataclass
from browsergym.core.action.parsers import highlevel_action_parser

logger = logging.getLogger(__name__)


@dataclass
class ExpArgsWithReset(ExpArgs):
    def run(self, previous_actions=[]):
        """
        Execute the same actions as expert for the list |previous_actions| of expert actions.
        """
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
                action_mapping=agent.action_set.to_python_code, exp_dir=self.exp_dir
            )
            logger.debug(f"Environment created.")

            step_info = StepInfo(step=0)
            episode_info = [step_info]
            step_info.from_reset(
                env, seed=self.env_args.task_seed, obs_preprocessor=agent.obs_preprocessor
            )
            logger.debug(f"Environment reset.")

            while not step_info.is_done:  # set a limit
                # get the current time step
                time_step = step_info.step
                logger.debug(f"Starting step {step_info.step}.")
                if time_step < len(previous_actions):
                    curr_obs = step_info.obs.copy()
                    expert_obs, expert_action = previous_actions[time_step]
                    curr_obs["expert_observation"] = expert_obs
                    curr_obs["expert_action"] = expert_action

                    # parse the action to get BID
                    exp_action_parsed = highlevel_action_parser.parse_string(
                        expert_action
                    ).as_list()[0]
                    if exp_action_parsed[0] in ["click", "hover", "fill"]:
                        bid = exp_action_parsed[1][0]
                        try:
                            bid_info = [
                                o
                                for o in expert_obs["axtree_object"]["nodes"]
                                if "browsergym_id" in o and o["browsergym_id"] == bid
                            ]
                            if len(bid_info) == 0:
                                action = expert_action
                                agent_info = {}
                            else:
                                bid_value = bid_info[0]["name"]["value"]
                                new_bid = [
                                    o["browsergym_id"]
                                    for o in curr_obs["axtree_object"]["nodes"]
                                    if "browsergym_id" in o and o["name"]["value"] == bid_value
                                ][0]
                                action = re.sub(bid, new_bid, expert_action)
                                agent_info = {}
                        except:
                            raise ValueError("Could not find the BID in the expert observation")
                    else:
                        action = expert_action
                        agent_info = {}

                    step_info.action = action
                    step_info.agent_info = agent_info
                    logger.debug(f"Restoring action from previous actions:\n {action}")
                else:
                    logger.debug(f"No more actions to replay. Ending episode.")
                    break

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
