# Setting Up Google Authentication for BrowserGym Benchmark

This guide explains how to use your Chrome profile authentication with the BrowserGym benchmark.

## Overview

The benchmark needs Google authentication to access Google Docs/Drive. Since BrowserGym uses `pw.chromium.launch()` (not `launch_persistent_context()`), we extract the authentication state from your Chrome profile into a `storage_state.json` file.

## Quick Start

### Step 1: Extract Authentication State

Run the extraction script to convert your Chrome profile into a storage state JSON:

```bash
python extract_auth_state.py
```

This will:

1. Open Chrome with your existing profile (`playwright_chrome_profile/`)
2. Navigate to Google Docs
3. Ask you to verify you're logged in (or log in if needed)
4. Extract and save authentication to `storage_state.json`

### Step 2: Run the Benchmark

Once you have `storage_state.json`, run your benchmark:

```bash
python benchmark.py
```

The benchmark will now use the extracted authentication for all tasks.

## How It Works

1. **Chrome Profile** (`playwright_chrome_profile/`) - Your persistent Chrome data created by `test_browser.py`
2. **Storage State** (`storage_state.json`) - Extracted cookies and localStorage that BrowserGym can use
3. **Benchmark** (`benchmark.py`) - Configured to load the storage state for authentication

## Troubleshooting

### "Not logged in" during benchmark run

- Your authentication may have expired
- Re-run `python extract_auth_state.py` to refresh the storage state

### Browser not opening in extraction script

- Make sure Chrome isn't already running with the profile
- Close all Chrome windows and try again

### Import errors

- Make sure you're in the correct Python environment
- Install required packages: `pip install playwright`

## Files

- `extract_auth_state.py` - Extracts auth from Chrome profile
- `storage_state.json` - Extracted authentication (gitignored)
- `benchmark.py` - Benchmark configured to use storage state
- `test_browser.py` - Original test script (still works independently)

## Notes

- The `storage_state.json` file contains sensitive cookies - don't commit it to git
- Re-run the extraction script periodically to refresh authentication
- Each benchmark task will reuse the same authentication state
