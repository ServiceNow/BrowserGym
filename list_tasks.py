import gymnasium as gym
import argparse
from typing import List


def setup_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description='List available tasks for BrowserGym benchmarks')
    parser.add_argument(
        '--benchmark',
        type=str,
        choices=['workarena', 'miniwob', 'webarena', 'visualwebarena', 'assistantbench'],
        default='workarena',
        help='The benchmark to list tasks from'
    )
    return parser


def get_tasks(benchmark: str) -> List[str]:
    # Import the appropriate benchmark module
    if benchmark == 'workarena':
        import browsergym.workarena
    elif benchmark == 'miniwob':
        import browsergym.miniwob
    elif benchmark == 'webarena':
        import browsergym.webarena
    elif benchmark == 'visualwebarena':
        import browsergym.visualwebarena
    elif benchmark == 'assistantbench':
        import browsergym.assistantbench
    
    # Get all tasks for the specified benchmark
    prefix = f"browsergym/{benchmark}"
    return [id for id in gym.envs.registry.keys() if id.startswith(prefix)]


def print_tasks(tasks: List[str]) -> None:
    print("\n" + "="*50)
    print(f"Found {len(tasks)} tasks:")
    print("="*50 + "\n")
    
    for i, task in enumerate(sorted(tasks), 1):
        print(f"{i:3d}. {task}")
    
    print("\n" + "="*50 + "\n")


def main():
    parser = setup_parser()
    args = parser.parse_args()
    
    try:
        tasks = get_tasks(args.benchmark)
        print_tasks(tasks)
    except ImportError:
        print(f"Error: Could not import browsergym.{args.benchmark}")
        print("Make sure you have installed the appropriate package:")
        print(f"pip install browsergym-{args.benchmark}")


if __name__ == "__main__":
    main()