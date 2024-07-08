# WebArena benchmark for BrowserGym

This package provides `browsergym.visualwebarena`, which is an unofficial port of the [VisualWebArena](https://jykoh.com/vwa) benchmark for BrowserGym.

Note: the original VisualWebArena codebase has been slightly adapted to ensure compatibility.

## Setup

1. Install the package
```sh
pip install browsergym-visualwebarena
```

2. Download tokenizer ressources
```sh
python -c "import nltk; nltk.download('punkt')"
```

3. Setup the web servers (follow the [visualwebarena README](https://github.com/web-arena-x/visualwebarena?tab=readme-ov-file)).

4. Setup the URLs as environment variables
