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

4. Setup the URLs as environment variables (note the `VWA_` prefix)
```sh
export VWA_SHOPPING="$BASE_URL:7770/"
export VWA_REDDIT="$BASE_URL:9999"
export VWA_WIKIPEDIA="$BASE_URL:8888/wikipedia_en_all_maxi_2022-05/A/User:The_other_Kiwix_guy/Landing"
export VWA_HOMEPAGE="$BASE_URL:4399"
export VWA_CLASSIFIEDS="$BASE_URL:9001/"
export VWA_CLASSIFIEDS_RESET_TOKEN="4b61655535e7ed388f0d40a93600254c"  # Default reset token for classifieds site, change if you edited its docker-compose.yml
```
