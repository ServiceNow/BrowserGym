#!/usr/bin/env python3
"""
Green Evaluator Agent - A Benchmark Testing Framework
====================================================

This is a bare bones green evaluator agent that acts as a wrapper for testing
other web agents (white/demo agents) on BrowserGym benchmarks, specifically MiniWoB.

The green evaluator:
1. Takes other agents as input
2. Runs them through MiniWoB benchmark tasks
3. Evaluates their performance
4. Generates evaluation reports

Usage:
    python3 green_evaluator.py --agent_path demo_agent/agent.py --task miniwob.click-dialog
"""

import argparse
import importlib.util
import json
import logging
import os
import sys
import time
from pathlib import Path
from typing import Dict, List, Any, Optional

# BrowserGym imports
from browsergym.experiments import EnvArgs, ExpArgs, get_exp_result
from browsergym.experiments.agent import Agent


class GreenEvaluator:
    """
    Green Evaluator Agent - The Benchmark Testing Framework
    
    This class implements the evaluation logic for testing other web agents.
    It acts as a wrapper around BrowserGym's experiment framework to provide
    a clean interface for evaluating agent performance.
    """
    
    def __init__(self, results_dir: str = "./green_evaluation_results"):
        """
        Initialize the Green Evaluator.
        
        Args:
            results_dir: Directory to save evaluation results
        """
        self.results_dir = Path(results_dir)
        self.results_dir.mkdir(exist_ok=True)
        
        # Set up logging
        self.logger = self._setup_logging()
        
        # Load required environment variables
        self._load_environment_variables()
        
        # Evaluation metrics we'll track
        self.evaluation_metrics = {
            "total_tasks": 0,
            "successful_tasks": 0,
            "failed_tasks": 0,
            "average_steps": 0,
            "average_reward": 0,
            "task_results": []
        }
        
        self.logger.info("🟢 Green Evaluator initialized")
    
    def _setup_logging(self) -> logging.Logger:
        """Set up logging for the evaluator."""
        logger = logging.getLogger("GreenEvaluator")
        logger.setLevel(logging.INFO)
        
        # Create formatter
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        
        # File handler
        log_file = self.results_dir / "green_evaluator.log"
        file_handler = logging.FileHandler(log_file)
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
        
        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)
        
        return logger
    
    def _load_environment_variables(self):
        """
        Load required environment variables for BrowserGym benchmarks.
        
        This method automatically loads the .env file if it exists, which contains
        the MINIWOB_URL and other required environment variables.
        """
        # Look for .env file in the current directory and parent directories
        current_dir = Path.cwd()
        env_file = None
        
        # Check current directory and parent directories
        for directory in [current_dir, current_dir.parent]:
            potential_env = directory / ".env"
            if potential_env.exists():
                env_file = potential_env
                break
        
        if env_file:
            self.logger.info(f"📁 Loading environment variables from: {env_file}")
            try:
                # Load environment variables from .env file
                with open(env_file, 'r') as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith('#') and '=' in line:
                            key, value = line.split('=', 1)
                            # Remove quotes if present
                            value = value.strip('"').strip("'")
                            os.environ[key] = value
                            self.logger.debug(f"Set {key}={value}")
                
                # Verify critical environment variables
                if os.getenv('MINIWOB_URL'):
                    self.logger.info(f"✅ MINIWOB_URL loaded: {os.getenv('MINIWOB_URL')}")
                else:
                    self.logger.warning("⚠️ MINIWOB_URL not found in .env file")
                
                if os.getenv('OPENAI_API_KEY'):
                    self.logger.info("✅ OPENAI_API_KEY loaded")
                else:
                    self.logger.warning("⚠️ OPENAI_API_KEY not found in .env file")
                    
            except Exception as e:
                self.logger.error(f"❌ Failed to load .env file: {e}")
        else:
            self.logger.warning("⚠️ No .env file found. Make sure to set MINIWOB_URL and OPENAI_API_KEY manually")
    
    def load_agent(self, agent_path: str) -> Agent:
        """
        Load an agent from a Python file.
        
        Args:
            agent_path: Path to the agent Python file
            
        Returns:
            Loaded agent instance
        """
        self.logger.info(f"📁 Loading agent from: {agent_path}")
        
        try:
            # Load the agent module
            spec = importlib.util.spec_from_file_location("agent_module", agent_path)
            agent_module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(agent_module)
            
            # Look for agent classes in the module
            agent_classes = []
            for name, obj in agent_module.__dict__.items():
                if (isinstance(obj, type) and 
                    issubclass(obj, Agent) and 
                    obj != Agent):
                    agent_classes.append(obj)
            
            if not agent_classes:
                raise ValueError(f"No agent classes found in {agent_path}")
            
            # Use the first agent class found (assuming it's the main one)
            agent_class = agent_classes[0]
            self.logger.info(f"✅ Found agent class: {agent_class.__name__}")
            
            # Try to create agent instance with default parameters
            # This is a simplified approach - in practice, you'd need to handle
            # different agent constructors more carefully
            try:
                # For DemoAgent, try with default parameters
                if hasattr(agent_class, '__init__'):
                    # Get default parameters from the class
                    import inspect
                    sig = inspect.signature(agent_class.__init__)
                    params = {}
                    
                    # Set reasonable defaults for common parameters
                    defaults = {
                        'model_name': 'gpt-4o-mini',
                        'chat_mode': False,  # Benchmark mode
                        'demo_mode': 'off',
                        'use_html': False,
                        'use_axtree': True,
                        'use_screenshot': False
                    }
                    
                    for param_name, param in sig.parameters.items():
                        if param_name != 'self' and param_name in defaults:
                            params[param_name] = defaults[param_name]
                    
                    agent = agent_class(**params)
                    self.logger.info(f"✅ Created agent instance with parameters: {params}")
                    return agent
                else:
                    agent = agent_class()
                    self.logger.info("✅ Created agent instance with no parameters")
                    return agent
                    
            except Exception as e:
                self.logger.error(f"❌ Failed to create agent instance: {e}")
                raise
                
        except Exception as e:
            self.logger.error(f"❌ Failed to load agent from {agent_path}: {e}")
            raise
    
    def evaluate_agent_on_task(self, agent: Agent, task_name: str, max_steps: int = 50) -> Dict[str, Any]:
        """
        Evaluate a single agent on a single benchmark task.
        
        Args:
            agent: The agent to evaluate
            task_name: Name of the benchmark task (e.g., 'miniwob.click-dialog')
            max_steps: Maximum number of steps for the task
            
        Returns:
            Dictionary containing evaluation results
        """
        self.logger.info(f"🎯 Evaluating agent on task: {task_name}")
        
        # Set up environment arguments for the benchmark task
        env_args = EnvArgs(
            task_name=task_name,
            task_seed=None,  # Random seed
            max_steps=max_steps,
            headless=True,  # Run in headless mode for evaluation
            record_video=False,
            wait_for_user_message=False,  # No human interaction
        )
        
        # Set up experiment arguments
        exp_args = ExpArgs(
            env_args=env_args,
            agent_args=None,  # We'll handle the agent directly
        )
        
        # Create a unique experiment directory
        timestamp = int(time.time())
        exp_dir = self.results_dir / f"eval_{task_name}_{timestamp}"
        exp_args.exp_dir = str(exp_dir)
        exp_args.exp_name = f"GreenEval_{task_name}_{timestamp}"
        
        try:
            # Run the evaluation
            self.logger.info(f"🚀 Starting evaluation in: {exp_dir}")
            
            # Prepare the experiment
            exp_args.prepare(str(self.results_dir))
            
            # Create environment
            env = env_args.make_env(
                action_mapping=agent.action_set.to_python_code,
                exp_dir=exp_dir,
            )
            
            # Run the agent through the task
            step_count = 0
            total_reward = 0
            success = False
            
            # Reset environment
            obs, env_info = env.reset()
            obs = agent.obs_preprocessor(obs)
            
            # Run the agent
            while step_count < max_steps:
                try:
                    # Get agent's action
                    action, agent_info = agent.get_action(obs.copy())
                    
                    if action is None:
                        self.logger.info("🛑 Agent returned None action, ending evaluation")
                        break
                    
                    # Execute action in environment
                    obs, reward, terminated, truncated, env_info = env.step(action)
                    obs = agent.obs_preprocessor(obs)
                    
                    total_reward += reward
                    step_count += 1
                    
                    self.logger.info(f"Step {step_count}: Action='{action[:50]}...', Reward={reward}")
                    
                    # Check if task is complete
                    if terminated:
                        success = True
                        self.logger.info(f"✅ Task completed successfully in {step_count} steps")
                        break
                    elif truncated:
                        self.logger.info(f"⏰ Task truncated after {step_count} steps")
                        break
                        
                except Exception as e:
                    self.logger.error(f"❌ Error during evaluation: {e}")
                    break
            
            # Close environment
            env.close()
            
            # Compile results
            result = {
                "task_name": task_name,
                "success": success,
                "steps_taken": step_count,
                "total_reward": total_reward,
                "max_steps": max_steps,
                "exp_dir": str(exp_dir),
                "timestamp": timestamp
            }
            
            self.logger.info(f"📊 Evaluation complete: {result}")
            return result
            
        except Exception as e:
            self.logger.error(f"❌ Evaluation failed: {e}")
            return {
                "task_name": task_name,
                "success": False,
                "steps_taken": 0,
                "total_reward": 0,
                "max_steps": max_steps,
                "error": str(e),
                "exp_dir": str(exp_dir),
                "timestamp": timestamp
            }
    
    def evaluate_agent_on_benchmark_suite(self, agent: Agent, task_list: List[str]) -> Dict[str, Any]:
        """
        Evaluate an agent on multiple benchmark tasks.
        
        Args:
            agent: The agent to evaluate
            task_list: List of task names to evaluate on
            
        Returns:
            Dictionary containing comprehensive evaluation results
        """
        self.logger.info(f"🎯 Starting benchmark suite evaluation with {len(task_list)} tasks")
        
        results = []
        successful_tasks = 0
        total_steps = 0
        total_reward = 0
        
        for i, task_name in enumerate(task_list, 1):
            self.logger.info(f"📋 Task {i}/{len(task_list)}: {task_name}")
            
            # Evaluate on this task
            result = self.evaluate_agent_on_task(agent, task_name)
            results.append(result)
            
            # Update statistics
            if result["success"]:
                successful_tasks += 1
            total_steps += result["steps_taken"]
            total_reward += result["total_reward"]
            
            # Small delay between tasks
            time.sleep(1)
        
        # Calculate final metrics
        final_results = {
            "agent_evaluated": str(agent.__class__.__name__),
            "total_tasks": len(task_list),
            "successful_tasks": successful_tasks,
            "failed_tasks": len(task_list) - successful_tasks,
            "success_rate": successful_tasks / len(task_list) if task_list else 0,
            "average_steps": total_steps / len(task_list) if task_list else 0,
            "average_reward": total_reward / len(task_list) if task_list else 0,
            "task_results": results,
            "evaluation_timestamp": int(time.time())
        }
        
        # Save results
        results_file = self.results_dir / f"benchmark_evaluation_{int(time.time())}.json"
        with open(results_file, 'w') as f:
            json.dump(final_results, f, indent=2)
        
        self.logger.info(f"📊 Benchmark evaluation complete!")
        self.logger.info(f"✅ Success rate: {final_results['success_rate']:.2%}")
        self.logger.info(f"📈 Average steps: {final_results['average_steps']:.1f}")
        self.logger.info(f"🏆 Average reward: {final_results['average_reward']:.2f}")
        self.logger.info(f"💾 Results saved to: {results_file}")
        
        return final_results


def get_miniwob_task_list() -> List[str]:
    """
    Get a list of MiniWoB benchmark tasks for evaluation.
    
    Returns:
        List of MiniWoB task names
    """
    # These are some common MiniWoB tasks for evaluation
    # In practice, you might want to load this from a configuration file
    # or query the available tasks dynamically
    return [
        "miniwob.click-dialog",
        "miniwob.choose-list", 
        "miniwob.click-checkboxes",
        "miniwob.choose-date",
        "miniwob.choose-date-easy",
        "miniwob.ascending-numbers",
        "miniwob.bisect-angle",
        "miniwob.book-flight",
        "miniwob.buy-ticket"
    ]


def main():
    """Main function to run the Green Evaluator."""
    parser = argparse.ArgumentParser(
        description="Green Evaluator - Test web agents on BrowserGym benchmarks"
    )
    parser.add_argument(
        "--agent_path", 
        type=str, 
        required=True,
        help="Path to the agent Python file to evaluate"
    )
    parser.add_argument(
        "--task", 
        type=str, 
        default=None,
        help="Single task to evaluate (e.g., 'miniwob.click-dialog'). If not provided, runs full benchmark suite."
    )
    parser.add_argument(
        "--max_steps", 
        type=int, 
        default=50,
        help="Maximum number of steps per task"
    )
    parser.add_argument(
        "--results_dir", 
        type=str, 
        default="./green_evaluation_results",
        help="Directory to save evaluation results"
    )
    
    args = parser.parse_args()
    
    # Initialize the Green Evaluator
    evaluator = GreenEvaluator(results_dir=args.results_dir)
    
    # Check if required environment variables are set
    if not os.getenv('MINIWOB_URL'):
        evaluator.logger.error("❌ MINIWOB_URL environment variable not set!")
        evaluator.logger.error("Please run: source .env")
        sys.exit(1)
    
    if not os.getenv('OPENAI_API_KEY'):
        evaluator.logger.error("❌ OPENAI_API_KEY environment variable not set!")
        evaluator.logger.error("Please set your OpenAI API key: export OPENAI_API_KEY='your-key-here'")
        sys.exit(1)
    
    try:
        # Load the agent to evaluate
        agent = evaluator.load_agent(args.agent_path)
        
        if args.task:
            # Evaluate on single task
            evaluator.logger.info(f"🎯 Single task evaluation: {args.task}")
            result = evaluator.evaluate_agent_on_task(agent, args.task, args.max_steps)
            print(f"\n📊 Single Task Results:")
            print(f"Task: {result['task_name']}")
            print(f"Success: {result['success']}")
            print(f"Steps: {result['steps_taken']}")
            print(f"Reward: {result['total_reward']}")
            
        else:
            # Evaluate on full benchmark suite
            evaluator.logger.info("🎯 Full benchmark suite evaluation")
            task_list = get_miniwob_task_list()
            results = evaluator.evaluate_agent_on_benchmark_suite(agent, task_list)
            
            print(f"\n📊 Benchmark Suite Results:")
            print(f"Agent: {results['agent_evaluated']}")
            print(f"Success Rate: {results['success_rate']:.2%}")
            print(f"Average Steps: {results['average_steps']:.1f}")
            print(f"Average Reward: {results['average_reward']:.2f}")
            print(f"Successful Tasks: {results['successful_tasks']}/{results['total_tasks']}")
    
    except Exception as e:
        evaluator.logger.error(f"❌ Evaluation failed: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
