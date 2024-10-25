# GAIA <> BrowserGym

This package provides an implementation for using the [GAIA](https://huggingface.co/gaia-benchmark) benchmark in BrowserGym.

Because GAIA includes open-ended tasks, setup is extremely easy and simply requires installing the package.

Please note that GAIA has a hidden test set, so test set predictions will need to be uploaded to the official [leaderboard](https://huggingface.co/spaces/gaia-benchmark/leaderboard).

## Setting up

- Install the package
```
pip install browsergym-gaia
```

- Run inference, e.g., run the following commands for demo on a simple toy task
```
python demo_agent/run_demo.py --task_name gaia.imp.0
```

- Test set predictions will be saved to `./gaia-predictions-test.jsonl`. To evaluate on the official test set, upload these predictions to the official [leaderboard](https://huggingface.co/spaces/gaia-benchmark/leaderboard).