import argparse
from pathlib import Path
from agents.dynamic_prompting import Flags
from agents.generic_agent import GenericAgentArgs
from utils.exp_utils import ExpArgs, str2bool
from utils.chat_api import ChatModelArgs


def parse_args():
    parser = argparse.ArgumentParser(description="Run experiment with hyperparameters.")
    parser.add_argument(
        "--start_url",
        type=str,
        default="https://www.google.com",
        help="Starting URL for the task.",
    )
    parser.add_argument(
        "--model_name",
        type=str,
        default="openai/gpt-4-vision-preview",
        help="Model name for the chat model.",
    )
    parser.add_argument(
        "--task_name",
        type=str,
        default="openended",
        help="Task name for the experiment. If 'openended', you need to specify a 'start_url'",
    )
    parser.add_argument(
        "--slow_mo", type=int, default=500, help="Slow motion delay for the experiment."
    )
    parser.add_argument(
        "--enable_debug",
        default="True",
        help="Enable debug mode for the experiment. If False, it will be difficult to debug because of the nested try statements.",
    )
    parser.add_argument(
        "--headless", type=str2bool, default=False, help="Run in headless mode for the experiment."
    )

    # BrowserGym Flags
    parser.add_argument(
        "--demo_mode",
        type=str2bool,
        default=True,
        help="add visual effects when the agents performs actions.",
    )
    parser.add_argument(
        "--enable_chat", type=str2bool, default=True, help="Enable chat in the agent."
    )
    parser.add_argument(
        "--use_html", type=str2bool, default=True, help="Use HTML in the agent's observation space."
    )
    parser.add_argument(
        "--use_ax_tree",
        type=str2bool,
        default=True,
        help="Use AX tree in the agent's observation space.",
    )
    parser.add_argument(
        "--use_screenshot",
        type=str2bool,
        default=True,
        help="Use screenshot in the agent's observation space.",
    )
    parser.add_argument(
        "--multi_actions", type=str2bool, default=True, help="Allow multi-actions in the agent."
    )
    parser.add_argument(
        "--action_space",
        type=str,
        default="bid",
        choices=["python", "bid", "coord", "bid+coord"],
        help="",
    )
    parser.add_argument(
        "--use_history",
        type=str2bool,
        default=True,
        help="Use history in the agent's observation space.",
    )

    # Agent Flags
    parser.add_argument(
        "--use_thinking",
        type=str2bool,
        default=True,
        help="Use thinking in the agent (chain-of-thought prompting).",
    )

    return parser.parse_args()


def main():
    args = parse_args()

    RESULTS_DIR = Path("./results")

    exp_args = ExpArgs(
        agent_args=GenericAgentArgs(
            chat_model_args=ChatModelArgs(
                model_name=args.model_name,
                max_total_tokens=128_000,  # "Maximum total tokens for the chat model."
                max_input_tokens=126_000,  # "Maximum tokens for the input to the chat model."
                max_new_tokens=2_000,  # "Maximum total tokens for the chat model."
            ),
            flags=Flags(
                use_html=args.use_html,
                use_ax_tree=args.use_ax_tree,
                use_thinking=False,  # "Enable the agent with a memory (scratchpad)."
                use_error_logs=True,  # "Prompt the agent with the error logs."
                use_memory=False,  # "Enables the agent with a memory (scratchpad)."
                use_history=args.use_history,
                use_diff=False,  # "Prompt the agent with the difference between the current and past observation."
                use_past_error_logs=True,  # "Prompt the agent with the past error logs."
                use_action_history=True,  # "Prompt the agent with the action history."
                multi_actions=args.multi_actions,
                use_abstract_example=True,  # "Prompt the agent with an abstract example."
                use_concrete_example=True,  # "Prompt the agent with a concrete example."
                use_screenshot=args.use_screenshot,
                enable_chat=args.enable_chat,
                demo_mode=args.demo_mode,
            ),
        ),
        max_steps=100,  # "Maximum steps for the experiment."
        task_seed=None,
        task_name=args.task_name,
        task_kwargs={
            "start_url": args.start_url,
            "wait_for_user_message": True,
            "viewport": {"width": 1500, "height": 1280},
            "slow_mo": args.slow_mo,
        },
        enable_debug=args.enable_debug,
        headless=args.headless,
    )

    exp_args.prepare(RESULTS_DIR / "live_agent_tests")
    exp_args.run()


if __name__ == "__main__":
    main()
