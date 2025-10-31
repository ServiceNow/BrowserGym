# WebArena Verified benchmark for BrowserGym

This package provides `browsergym.webarena_verified`, which integrates the WebArena Verified benchmark from the [platform-labs-webarena-verified](https://github.com/ServiceNow/platform-labs-webarena-verified) into BrowserGym.

## Installation

### 0. Prerequisites

Before installing this package, you need to clone the platform-labs-webarena-verified repository locally:

```bash
git clone https://github.com/ServiceNow/platform-labs-webarena-verified.git ../platform-labs-webarena-verified
```

### 1. Install this BrowserGym package

```bash
pip install -e ./browsergym/webarena_verified
```

This will automatically install the required dependencies from local file paths:
- `webarena-verified` from local platform-labs-webarena-verified



## Setup

### Environment Variables

Set up the WebArena environment URLs. The ports should correspond to your WebArena instance setup:

```bash
BASE_URL=<YOUR_SERVER_URL_HERE>  # example: "http://myazuremachine.eastus.cloudapp.azure.com"

# WebArena environment variables (change ports as needed)
export WA_SHOPPING="$BASE_URL:8082/"
export WA_SHOPPING_ADMIN="$BASE_URL:8083/admin"
export WA_REDDIT="$BASE_URL:8080"
export WA_GITLAB="$BASE_URL:9001"
export WA_WIKIPEDIA="$BASE_URL:8081/wikipedia_en_all_maxi_2022-05/A/User:The_other_Kiwix_guy/Landing"
export WA_MAP="$BASE_URL:443"
export WA_HOMEPAGE="$BASE_URL:80"

# Optional: Full reset functionality
export WA_FULL_RESET="$BASE_URL:7565"
```

### API Keys

Set up required API keys:

```bash
# OpenAI API key (required for LLM-based evaluations)
export OPENAI_API_KEY=...

# Optional: Langfuse API key for tracing
export LANGFUSE_PUBLIC_KEY=...
export LANGFUSE_SECRET_KEY=...
```

## Usage

```python
import browsergym.webarena_verified

# The package automatically registers all WebArena Verified tasks
# Task IDs range from 0 to 811 (812 total tasks)

# Example: Run a specific task
from browsergym.webarena_verified import ALL_WEBARENA_TASK_IDS
print(f"Available tasks: {len(ALL_WEBARENA_TASK_IDS)}")

# Example: Create a task
from browsergym.webarena_verified.task import WebArenaVerifiedTask

task = WebArenaVerifiedTask(seed=42, task_id=0)
```

## Task Configuration

WebArena Verified tasks are configured via the `webarena_verified.json` file, which includes:

- **Task metadata**: task_id, intent, intent_template
- **Environment setup**: sites, start_url, geolocation
- **Evaluation criteria**: expected_retrieve_value, expected_backend_state, expected_ui_state
- **Authentication**: storage_state for logged-in sessions

## Evaluation System

The evaluation system supports three types of validation:

1. **Retrieve Value**: Validates that the agent successfully retrieved the expected information
2. **Backend State**: Validates that the agent made the expected changes to the backend/database
3. **UI State**: Validates that the agent achieved the expected UI state

## Differences from Original WebArena

- Enhanced evaluation with multiple validation types
- Integration with platform-labs evaluation framework
- Support for more sophisticated task validation
- Better error handling and logging
- Structured agent response format

## Troubleshooting

- Ensure all environment variables are set correctly
- Verify that the WebArena instance is running and accessible
- Check that all required API keys are configured
- Review logs for detailed error information
