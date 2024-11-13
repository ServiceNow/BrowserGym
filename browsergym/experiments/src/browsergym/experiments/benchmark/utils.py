import logging
import os
from typing import Literal

import gymnasium as gym
import numpy as np

from browsergym.experiments.loop import SEED_MAX, EnvArgs

logger = logging.getLogger(__name__)


def make_env_args_list_from_workarena_curriculum(
    level: Literal["l1", "l2", "l3"],
    task_category_filter: str,
    meta_seed: int,
    max_steps: int,
    curriculum_type: Literal["human", "agent"],
    seeds_l1: int = 10,
):
    """
    Returns a WorkArena predefined task curriculum (e.g., task and seed combination).
    """
    assert level in ("l1", "l2", "l3")
    assert curriculum_type in ("human", "agent")

    env_args_list = []

    # dynamic import
    from browsergym.workarena import get_all_tasks_agents

    all_task_tuples = get_all_tasks_agents(
        filter=f"{level}.{task_category_filter}" if task_category_filter else level,
        meta_seed=meta_seed,
        is_agent_curriculum=(curriculum_type == "agent"),
        n_seed_l1=seeds_l1,
    )

    for task, seed in all_task_tuples:
        task_name = task.get_task_id()
        env_args_list.append(EnvArgs(task_name=task_name, task_seed=seed, max_steps=max_steps))

    return env_args_list


def make_env_args_list_from_repeat_tasks(
    task_list: list[str], max_steps: int, n_repeats: int, seeds_rng: np.random.RandomState
):
    """
    Generates a list of `len(task_list)` time `n_repeats` environments arguments, using randomly generated seeds.
    """
    env_args_list = []
    for task in task_list:
        for seed in seeds_rng.randint(low=0, high=SEED_MAX, size=n_repeats):
            env_args_list.append(
                EnvArgs(
                    task_name=task,
                    task_seed=int(seed),
                    max_steps=max_steps,
                    headless=True,
                    record_video=False,
                    wait_for_user_message=False,
                    viewport=None,
                    slow_mo=None,
                    storage_state=None,
                    task_kwargs=None,
                )
            )

    return env_args_list


def make_env_args_list_from_fixed_seeds(
    task_list: list[str], max_steps: int, fixed_seeds: list[int]
):
    """
    Generates a list of `len(task_list)` time `n_repeats` environments arguments, using randomly generated seeds.
    """
    env_args_list = []
    for task in task_list:
        for seed in fixed_seeds:
            env_args_list.append(
                EnvArgs(
                    task_name=task,
                    task_seed=int(seed),
                    max_steps=max_steps,
                    headless=True,
                    record_video=False,
                    wait_for_user_message=False,
                    viewport=None,
                    slow_mo=None,
                    storage_state=None,
                    task_kwargs=None,
                )
            )

    return env_args_list


def prepare_backend(backend: str):
    match backend:
        case "miniwob":
            # register environments
            import browsergym.miniwob

            # check setup
            browsergym.miniwob.environment_variables_precheck()

        case "webarena":
            # register environments
            import browsergym.webarena

            # full reset the instance (requires environment variables properly set up)
            from browsergym.webarena.instance import WebArenaInstance

            default_instance = WebArenaInstance()
            default_instance.full_reset()

        case "visualwebarena":
            # register environments
            import browsergym.visualwebarena

            # full reset the instance (requires environment variables properly set up)
            from browsergym.visualwebarena.instance import VisualWebArenaInstance

            default_instance = VisualWebArenaInstance()
            default_instance.full_reset()

            vwa_massage_task_ids = [
                0,  # classifieds
                33,  # classifieds
                555,  # shopping
                666,  # shopping
                282,  # __REDDIT__/f/dataisbeautiful
                305,  # __REDDIT__/f/memes/new
                314,  # __REDDIT__/f/mildlyinteresting
                317,  # __REDDIT__/f/Art/active
                318,  # __REDDIT__/f/consoles
                319,  # __REDDIT__/f/EarthPorn
                410,  # __REDDIT__/f/food
                411,  # __REDDIT__/f/food
                427,  # __REDDIT__/f/EarthPorn
                436,  # __REDDIT__/f/Art
                440,  # __REDDIT__/f/EarthPorn
            ]
            vwa_massage_max_retries = 1
            for i, task_id in enumerate(vwa_massage_task_ids):
                gym_id = f"browsergym/visualwebarena.{task_id}"
                logger.info(
                    f"VisualWebArena instance massaging {i + 1} / {len(vwa_massage_task_ids)} ({gym_id} reset)"
                )
                retries = 0
                while True:
                    env = gym.make(gym_id)
                    try:
                        env.reset()  # task setup
                        no_action = "noop()"
                        try:
                            # check if action space exists and is compatible with "noop()"
                            env.unwrapped.action_mapping(no_action)
                        except:
                            # fallback plan
                            no_action = ""
                        env.step(no_action)  # task validation
                        logger.info(f"Massage successful")
                        break
                    except Exception as e:
                        if retries < vwa_massage_max_retries:
                            retries += 1
                            logger.info(
                                f"Massage failed, retrying ({retries} / {vwa_massage_max_retries})"
                            )
                            continue
                        else:
                            logger.warning(
                                f"Error during VisualWebArena instance massaging ({gym_id}, {retries} retries): {e}"
                            )
                            break
                    finally:
                        env.close()

        case "workarena":
            # register environments
            import browsergym.workarena

            # check server status
            from browsergym.workarena.instance import SNowInstance

            default_instance = SNowInstance()
            default_instance.check_status()

        case "assistantbench":
            # register environments
            import browsergym.assistantbench

        case "weblinx":
            # register environments
            import weblinx_browsergym

            # pre-download all weblinx files
            cache_dir = os.environ.get("BROWSERGYM_WEBLINX_CACHE_DIR", None)

            assert (
                cache_dir
            ), f"Environment variable BROWSERGYM_WEBLINX_CACHE_DIR is missing or empty, required to prepare the weblinx backend."

            all_tasks = []
            for split in ("train", "valid", "test_iid"):
                all_tasks.extend(weblinx_browsergym.list_tasks(split=split, cache_dir=cache_dir))
            demo_ids = weblinx_browsergym.get_unique_demo_ids(tasks=all_tasks)
            weblinx_browsergym.download_and_unzip_demos(demo_ids=demo_ids, cache_dir=cache_dir)

        case _:
            raise NotImplementedError(f"Unknown benchmark backend {repr(backend)}")
