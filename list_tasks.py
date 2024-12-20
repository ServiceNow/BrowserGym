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
    parser.add_argument(
        '--level',
        type=str,
        choices=['l1', 'l2', 'l3'],
        help='Filter tasks by level (only for workarena)'
    )
    return parser


def get_tasks(benchmark: str, level: str = None) -> List[str]:
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
    tasks = [id for id in gym.envs.registry.keys() if id.startswith(prefix)]
    
    # Filter tasks by level if benchmark is workarena
    if benchmark == 'workarena' and level:
        match level:
            case 'l1':
                tasks = [task for task in tasks if not (task.endswith('l2') or task.endswith('l3'))]
            case 'l2':
                tasks = [task for task in tasks if task.endswith('l2')]
            case 'l3':
                tasks = [task for task in tasks if task.endswith('l3')]
    
    return tasks


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
        tasks = get_tasks(args.benchmark, args.level)
        print_tasks(tasks)
    except ImportError:
        print(f"Error: Could not import browsergym.{args.benchmark}")
        print("Make sure you have installed the appropriate package:")
        print(f"pip install browsergym-{args.benchmark}")


if __name__ == "__main__":
    main()