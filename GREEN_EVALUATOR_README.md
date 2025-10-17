# 🟢 Green Evaluator Agent

A bare bones green evaluator agent that acts as a wrapper for testing other web agents (white/demo agents) on BrowserGym benchmarks, specifically MiniWoB.

## 🎯 What is the Green Evaluator?

The Green Evaluator is a **benchmark testing framework** that:

1. **Takes other agents as input** (like the demo agent from `demo_agent/agent.py`)
2. **Runs them through MiniWoB benchmark tasks** (click dialog, choose list, etc.)
3. **Evaluates their performance** (success rate, steps taken, rewards)
4. **Generates evaluation reports** with detailed metrics

## 🏗️ Architecture

```
Green Evaluator (this code)
    ↓ (loads and tests)
White/Demo Agent (agent.py)
    ↓ (executes actions in)
BrowserGym Environment (MiniWoB tasks)
    ↓ (returns results to)
Green Evaluator (evaluates performance)
```

## 🚀 Quick Start

### 1. Set up Environment

```bash
# Navigate to BrowserGym directory
cd /Users/layahaasini/Desktop/projects/BrowserGym

# Set your OpenAI API key (required)
export OPENAI_API_KEY="your-api-key-here"

# Note: The Green Evaluator automatically loads MINIWOB_URL from .env file
# If you need to load it manually: source .env
```

### 2. Test Single Task

```bash
python3 green_evaluator.py --agent_path demo_agent/agent.py --task miniwob.click-dialog
```

### 3. Test Full Benchmark Suite

```bash
python3 green_evaluator.py --agent_path demo_agent/agent.py
```

### 4. Run Example

```bash
python3 example_green_evaluation.py
```

## 📊 What Gets Evaluated

The Green Evaluator tracks these metrics:

- **Success Rate**: How many tasks the agent completed successfully
- **Efficiency**: Average number of steps taken per task
- **Rewards**: Total and average rewards earned
- **Task-by-Task Results**: Detailed results for each individual task
- **Error Handling**: How the agent handles failures

## 🎯 Available MiniWoB Tasks

The evaluator can test agents on these MiniWoB tasks:

- `miniwob.click-dialog` - Click on dialog buttons
- `miniwob.choose-list` - Select items from lists
- `miniwob.click-checkboxes` - Check/uncheck boxes
- `miniwob.choose-date` - Select dates from calendars
- `miniwob.ascending-numbers` - Arrange numbers in order
- `miniwob.bisect-angle` - Bisect angles
- `miniwob.book-flight` - Book flights
- `miniwob.buy-ticket` - Purchase tickets

## 📁 Output Structure

Results are saved to `./green_evaluation_results/`:

```
green_evaluation_results/
├── green_evaluator.log              # Evaluation logs
├── eval_miniwob.click-dialog_123/   # Individual task results
├── eval_miniwob.choose-list_124/
├── benchmark_evaluation_123.json    # Summary results
└── ...
```

## 🔧 Customization

### Adding New Tasks

Edit `get_miniwob_task_list()` in `green_evaluator.py`:

```python
def get_miniwob_task_list() -> List[str]:
    return [
        "miniwob.click-dialog",
        "miniwob.choose-list",
        "your-new-task",  # Add here
        # ...
    ]
```

### Testing Different Agents

```bash
# Test any agent that inherits from browsergym.experiments.agent.Agent
python3 green_evaluator.py --agent_path path/to/your/agent.py --task miniwob.click-dialog
```

### Adjusting Evaluation Parameters

```bash
# Increase max steps per task
python3 green_evaluator.py --agent_path demo_agent/agent.py --task miniwob.click-dialog --max_steps 100

# Change results directory
python3 green_evaluator.py --agent_path demo_agent/agent.py --results_dir ./my_results
```

## 🧪 Example Usage

```python
from green_evaluator import GreenEvaluator

# Initialize evaluator
evaluator = GreenEvaluator(results_dir="./my_evaluation")

# Load an agent
agent = evaluator.load_agent("demo_agent/agent.py")

# Test single task
result = evaluator.evaluate_agent_on_task(agent, "miniwob.click-dialog")
print(f"Success: {result['success']}, Steps: {result['steps_taken']}")

# Test multiple tasks
results = evaluator.evaluate_agent_on_benchmark_suite(
    agent, 
    ["miniwob.click-dialog", "miniwob.choose-list"]
)
print(f"Success rate: {results['success_rate']:.2%}")
```

## 🎯 Key Features

- **🔄 Automated Testing**: Runs agents through benchmark tasks automatically
- **📊 Performance Metrics**: Tracks success rates, efficiency, and rewards
- **📁 Detailed Logging**: Saves comprehensive logs and results
- **🎛️ Configurable**: Easy to customize tasks, parameters, and output
- **🔌 Extensible**: Can be extended to test other benchmark types
- **📈 Reporting**: Generates JSON reports with evaluation results
- **🔧 Auto Environment Setup**: Automatically loads MINIWOB_URL from .env file

## 🚨 Requirements

- BrowserGym installed and configured
- MiniWoB setup completed (`make setup-miniwob`)
- OpenAI API key for agent evaluation
- Python 3.8+

## 🎉 Next Steps

1. **Run the example** to see the evaluator in action
2. **Test different agents** by providing different `--agent_path` values
3. **Customize the task list** to focus on specific benchmarks
4. **Extend the evaluator** to support other benchmark types (WebArena, VisualWebArena, etc.)

The Green Evaluator provides a solid foundation for systematically evaluating and comparing different web automation agents!
