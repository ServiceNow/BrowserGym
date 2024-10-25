# AssistantBench <> BrowserGym

This package provides an implementation for using the [AssistantBench](https://assistantbench.github.io/) benchmark in BrowserGym.

Because AssistantBench includes open-ended tasks, setup is extremely easy and simply requires installing the package.

Please note that AssistantBench has a hidden test set, so test set predictions will need to be uploaded to the official [leaderboard](https://huggingface.co/spaces/AssistantBench/leaderboard).

## Setting up

- Install the package
```
pip install browsergym-assistantbench
```

- Run inference, e.g., run the following commands for demo on a simple toy task
```
python demo_agent/run_demo.py --task_name assistantbench.imp.0
```

- Test set predictions will be saved to `./assistantbench-predictions-test.jsonl`. To evaluate on the official test set, upload these predictions to the official [leaderboard](https://huggingface.co/spaces/AssistantBench/leaderboard).
