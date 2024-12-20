# BrowserGym WorkArena Setup Guide

This guide provides step-by-step instructions for setting up and running BrowserGym WorkArena experiments.

## Table of Contents
- [Environment Setup](#environment-setup)
- [Repository Setup](#repository-setup)
- [Dependencies Installation](#dependencies-installation)
- [Environment Variables](#environment-variables)
- [Listing Experiments](#listing-experiments)
- [Running Experiments](#running-experiments)

## Environment Setup

### Setting up pyenv virtualenv

```bash
# Install Python 3.12.7 if not already installed
pyenv install 3.12.7

# Create a new virtualenv
pyenv virtualenv 3.12.7 browsergym_env

# Activate the environment
pyenv activate browsergym_env
```

## Repository Setup

Clone the BrowserGym repository:

```bash
git clone https://github.com/Nid989/BrowserGym.git
cd BrowserGym
```

## Dependencies Installation

Install required packages and setup playwright:

```bash
# Install BrowserGym
pip install browsergym

# Reinstall specific playwright version
pip uninstall playwright -y
pip install playwright==1.47.0

# Install Chromium for playwright
playwright install chromium

# Install additional requirements
pip install -r ext-requirements.txt
```

## Environment Variables

Configure the necessary environment variables for WorkArena and OpenAI:

```bash
# ServiceNow Instance Credentials
export SNOW_INSTANCE_URL="your-servicenow-instance-url"
export SNOW_INSTANCE_UNAME="your-servicenow-instance-username"
export SNOW_INSTANCE_PWD="your-servicenow-instance-password"

# OpenAI API Key
export OPENAI_API_KEY="your-openai-api-key"
```

## Listing Experiments

You can list available tasks using the `list_tasks.py` script. Here are the available options:

```bash
python list_tasks.py --benchmark [benchmark_name] --level [level]
```

### Arguments:

- `--benchmark`: Choose from:
  - `workarena`
  - `miniwob`
  - `webarena`
  - `visualwebarena`
  - `assistantbench`
  
- `--level` (WorkArena only): Filter tasks by level
  - `l1`: level 1 tasks
  - `l2`: level 2 tasks
  - `l3`: level 3 tasks

Example:
```bash
# List all WorkArena tasks
python list_tasks.py --benchmark workarena

# List L1 WorkArena tasks only
python list_tasks.py --benchmark workarena --level l1
```

## Running Experiments

### Method 1: Using run_demo.py

Run individual experiments with custom configurations:

```bash
python demo_agent/run_demo.py \
    --task_name "workarena.servicenow.order-standard-laptop" \
    --model_name "gpt-4o" \
    --visual_effects true \
    --use_html false \
    --use_axtree true \
    --use_screenshot false
```

### Method 2: Using run_experiments.sh

Run multiple experiments in batch using the provided shell script:

```bash
# Basic usage with default settings
./run_experiments.sh

# Custom configuration
./run_experiments.sh \
    --model-name "gpt-4o" \
    --runs 5 \
    --visual true \
    --html false \
    --axtree true \
    --screenshot false
```

#### Script Options:

- `-m, --model-name`: Specify the model name (default: gpt-4o)
- `-r, --runs`: Number of experiment runs (default: 1)
- `-v, --visual`: Enable visual effects (default: true)
- `-h, --html`: Use HTML in observations (default: false)
- `-a, --axtree`: Use AXTree in observations (default: true)
- `-s, --screenshot`: Include screenshots (default: false)
- `--help`: Display help message

### Available WorkArena Tasks (for run_experiments.sh)

The script includes the following predefined tasks:
- workarena.servicenow.order-apple-mac-book-pro15
- workarena.servicenow.order-apple-watch
- workarena.servicenow.order-developer-laptop
- workarena.servicenow.order-development-laptop-p-c
- workarena.servicenow.order-ipad-mini
- workarena.servicenow.order-ipad-pro
- workarena.servicenow.order-loaner-laptop
- workarena.servicenow.order-sales-laptop
- workarena.servicenow.order-standard-laptop

### Experiment Analysis

The run_experiments.sh script automatically generates trace-log files, but if running experiments manually, you'll need to generate them separately using the analyze_experiment.py script.

```bash
python experiments/logging/analyze_experiment.py --results_dir "./results"
```

These trace-log files will be saved in the results directory as `experiment_log.md`.
