#!/usr/bin/env python3
"""
Example: Using the Green Evaluator
=================================

This script demonstrates how to use the Green Evaluator to test
the demo agent on MiniWoB benchmarks.

Usage:
    python3 example_green_evaluation.py
"""

import os
import sys
from pathlib import Path

# Add the current directory to Python path so we can import our modules
sys.path.append(str(Path(__file__).parent))

from green_evaluator import GreenEvaluator, get_miniwob_task_list


def main():
    """Example of using the Green Evaluator."""
    
    print("🟢 Green Evaluator Example")
    print("=" * 50)
    
    # The Green Evaluator will automatically load environment variables from .env
    # But we still need to check if they're available
    if not os.getenv('OPENAI_API_KEY'):
        print("❌ OPENAI_API_KEY environment variable not set!")
        print("Please set your OpenAI API key: export OPENAI_API_KEY='your-key-here'")
        print("Note: The Green Evaluator will automatically load MINIWOB_URL from .env file")
        return
    
    # Initialize the Green Evaluator
    print("🚀 Initializing Green Evaluator...")
    evaluator = GreenEvaluator(results_dir="./example_evaluation_results")
    
    try:
        # Load the demo agent
        print("📁 Loading demo agent...")
        agent = evaluator.load_agent("demo_agent/agent.py")
        
        # Example 1: Test on a single task
        print("\n🎯 Example 1: Single Task Evaluation")
        print("-" * 40)
        result = evaluator.evaluate_agent_on_task(
            agent=agent,
            task_name="miniwob.click-dialog",
            max_steps=20
        )
        
        print(f"Task: {result['task_name']}")
        print(f"Success: {'✅' if result['success'] else '❌'}")
        print(f"Steps taken: {result['steps_taken']}")
        print(f"Total reward: {result['total_reward']}")
        
        # Example 2: Test on multiple tasks
        print("\n🎯 Example 2: Multiple Task Evaluation")
        print("-" * 40)
        
        # Use a smaller subset for the example
        task_subset = [
            "miniwob.click-dialog",
            "miniwob.choose-list",
            "miniwob.click-checkboxes"
        ]
        
        results = evaluator.evaluate_agent_on_benchmark_suite(
            agent=agent,
            task_list=task_subset
        )
        
        print(f"Agent evaluated: {results['agent_evaluated']}")
        print(f"Success rate: {results['success_rate']:.2%}")
        print(f"Average steps: {results['average_steps']:.1f}")
        print(f"Average reward: {results['average_reward']:.2f}")
        print(f"Successful tasks: {results['successful_tasks']}/{results['total_tasks']}")
        
        print("\n📋 Individual Task Results:")
        for task_result in results['task_results']:
            status = "✅" if task_result['success'] else "❌"
            print(f"  {status} {task_result['task_name']}: {task_result['steps_taken']} steps, reward {task_result['total_reward']}")
        
        print(f"\n💾 Detailed results saved to: {evaluator.results_dir}")
        
    except Exception as e:
        print(f"❌ Evaluation failed: {e}")
        return
    
    print("\n🎉 Green Evaluator example completed!")


if __name__ == "__main__":
    main()
