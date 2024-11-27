# VisualWebArena benchmark for BrowserGym

This package provides `browsergym.visualwebarena`, which is an unofficial port of the [VisualWebArena](https://jykoh.com/vwa) benchmark for BrowserGym.

Note: the original VisualWebArena codebase has been slightly adapted to ensure compatibility.


## Server installation

You have two options to setup your webarena instance:
 - option 1: follow the official [visualwebarena README](https://github.com/web-arena-x/visualwebarena/blob/main/environment_docker/README.md)
 - option 2: use our [unofficial setup scripts](https://github.com/gasse/webarena-setup/tree/main/visualwebarena)

We recommend **option 2** as it allows you to easily customize the ports of each webarena domain, and offers a reset functionality that allwos browsergym to trigger a full instance reset remotely.

## Setup

1. Install the package
```sh
pip install browsergym-visualwebarena
```

2. Download tokenizer resources
```sh
python -c "import nltk; nltk.download('punkt_tab')"
```

3. Setup the URLs as environment variables. The ports for each domain here should correspond to those you used when setting up your webarena instance. Note also the `VWA_` prefix which is specific to browsergym.
```sh
BASE_URL=<YOUR_SERVER_URL_HERE>  # example: "http://myazuremachine.eastus.cloudapp.azure.com"

# visualwebarena environment variables (change ports as needed)
export VWA_CLASSIFIEDS="$BASE_URL:8083"
export VWA_CLASSIFIEDS_RESET_TOKEN="4b61655535e7ed388f0d40a93600254c"
export VWA_SHOPPING="$BASE_URL:8082"
export VWA_REDDIT="$BASE_URL:8080"
export VWA_WIKIPEDIA="$BASE_URL:8081"
export VWA_HOMEPAGE="$BASE_URL:80"

# if your webarena instance offers the FULL_RESET feature (optional)
export VWA_FULL_RESET="$BASE_URL:7565"

# otherwise, be sure to NOT set VWA_FULL_RESET, or set it to an empty string
export VWA_FULL_RESET=""
```

4. Setup an OpenAI API key

```sh
export OPENAI_API_KEY=...
```
