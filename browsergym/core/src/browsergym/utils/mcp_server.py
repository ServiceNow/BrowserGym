# MCP server for BrowserGym
import argparse
import asyncio
import re
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from dataclasses import dataclass
from typing import Callable

import gymnasium as gym
from mcp.server.fastmcp import Context, FastMCP

from browsergym.core.action.highlevel import ACTION_SUBSETS, HighLevelActionSet
from browsergym.core.env import BrowserEnv


@dataclass
class BgymConfig:
    headless: bool = True
    timeout_ms: int = 10000
    record_video_dir: str | None = None
    demo_mode: HighLevelActionSet.DemoMode = "default"


@dataclass
class AppContext:
    gym: BrowserEnv
    config: BgymConfig
    task_id: str
    actions: HighLevelActionSet


def get_cli_args():
    parser = argparse.ArgumentParser(
        description="BrowserGym MCP server",
        usage="python browsergym/core/src/browsergym/utils/%(prog)s [options]",
        epilog="\nExample: python browsergym/core/src/browsergym/utils/%(prog)s -t browsergym/workarena.servicenow.order-ipad-pro --demo_mode default -r /path/to/video/storage/dir",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "-t",
        "--task_id",
        type=str,
        default="browsergym/openended",
        help="Task ID to run",
    )
    parser.add_argument(
        "--demo_mode",
        type=str,
        default="off",
        choices=["off", "default", "all_blue", "only_visible_elements"],
        help="Demo mode for action set",
    )
    parser.add_argument(
        "-r",
        "--record_video_dir",
        type=str,
        default=None,
        help="Directory to save recorded videos",
    )
    parser.add_argument(
        "-v",
        "--visible",
        action="store_true",
        help="Run in not headless mode",
    )
    parser.add_argument(
        "--timeout_ms",
        type=int,
        default=10000,
        help="Timeout in milliseconds for each step",
    )
    parser.add_argument(
        "--subset",
        type=str,
        default="workarena++",
        choices=ACTION_SUBSETS.keys(),
        help="Subset of actions to use",
    )
    args, _ = parser.parse_known_args()
    return args


args = get_cli_args()
task_id = args.task_id
config = BgymConfig(
    headless=not args.visible,
    timeout_ms=args.timeout_ms,
    record_video_dir=args.record_video_dir,
    demo_mode=args.demo_mode,
)


@asynccontextmanager
async def app_lifespan(server: FastMCP) -> AsyncIterator[AppContext]:
    """Manage application lifecycle with type-safe context"""
    # Initialize on startup
    actions = HighLevelActionSet(demo_mode=config.demo_mode, subsets=args.subset)
    _gym: BrowserEnv = await asyncio.to_thread(
        gym.make,
        task_id,
        headless=config.headless,
        record_video_dir=config.record_video_dir,
        action_mapping=actions.to_python_code,
        timeout=config.timeout_ms,
        task_kwargs={"start_url": "about:blank"},
    )  # type: ignore
    await asyncio.to_thread(_gym.reset)

    try:
        yield AppContext(gym=_gym, config=config, task_id=task_id, actions=actions)
    finally:
        # Cleanup on shutdown
        await asyncio.to_thread(_gym.close)


mcp = FastMCP("BrowserGym", dependencies=["browsergym", "browsergym-core"], lifespan=app_lifespan)


def fn_wrapper(func: Callable):
    async def decorator(*args, context: Context, **kwargs):
        """
        Decorator to execute function from the action space in the context of the gym.
        1. Loads the parent module of the function to use as function context
        2. Executes the pre_step method of the gym
        3. Sets up the module vars from the current state of the gym
        4. Executes the function from this module and handles any exceptions
        5. Executes the post_step method of the gym

        """
        gym: BrowserEnv = context.request_context.lifespan_context.gym
        while not isinstance(gym, BrowserEnv):
            gym = gym.env

        # Load the parent module of the function to use as function context
        import browsergym.core.action.functions as fn_context

        fn = getattr(fn_context, func.__name__)

        gym.last_action = fn.__name__
        info, send_message_to_user, rii = await asyncio.to_thread(gym.pre_step)

        # Set up the module vars from the current state of the gym
        fn_context.send_message_to_user = send_message_to_user
        fn_context.report_infeasible_instructions = rii
        fn_context.page = gym.page
        fn_context.demo_mode = config.demo_mode

        try:
            fn(*args, **kwargs)
            gym.last_action_error = ""
        except Exception as e:
            gym.last_action_error = f"{type(e).__name__}: {e}"
            match = re.match("TimeoutError: Timeout ([0-9]+)ms exceeded.", gym.last_action_error)
            if match:
                info["action_exec_timeout"] = float(match.groups()[0]) / 1000

        results = await asyncio.to_thread(gym.post_step, info)
        return results

    return decorator


for fn in ACTION_SUBSETS[args.subset]:
    mcp.add_tool(fn)
    tool = mcp._tool_manager._tools[fn.__name__]
    tool.fn = fn_wrapper(fn)
    tool.context_kwarg = "context"
    tool.is_async = True
    mcp._tool_manager._tools[fn.__name__] = tool

if __name__ == "__main__":
    mcp.run(transport="stdio")
