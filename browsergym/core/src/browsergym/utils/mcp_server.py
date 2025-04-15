import argparse
import asyncio
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from dataclasses import dataclass

import gymnasium as gym
from mcp.server.fastmcp import FastMCP

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
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-t",
        "--task_id",
        type=str,
        default="browsergym/openended",
        help="Task ID to run",
    )
    parser.add_argument(
        "-d",
        "--demo_mode",
        type=str,
        default="default",
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
        "-s",
        "--subset",
        type=str,
        default="workarena++",
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
    try:
        _gym: BrowserEnv = await asyncio.to_thread(
            gym.make,
            task_id,
            headless=config.headless,
            record_video_dir=config.record_video_dir,
            action_mapping=HighLevelActionSet(
                demo_mode=config.demo_mode
            ).to_python_code,
            timeout=config.timeout_ms,
            task_kwargs={"start_url": "about:blank"},
        )  # type: ignore
        await asyncio.to_thread(_gym.reset)
    except Exception as e:
        with open("error.log", "w") as f:
            f.write(f"Error initializing BrowserGym: {e}\ntask ID: {task_id}\n")
        raise
    try:
        yield AppContext(gym=_gym, config=config, task_id=task_id, actions=actions)
    finally:
        # Cleanup on shutdown
        await asyncio.to_thread(_gym.close)


mcp = FastMCP(
    "BrowserGym", dependencies=["browsergym", "browsergym-core"], lifespan=app_lifespan
)


actions = ACTION_SUBSETS[args.subset]
for fn in actions:
    mcp.add_tool(fn)

if __name__ == "__main__":
    mcp.run(transport="stdio")
