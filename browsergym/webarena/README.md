# WebArena benchmark for BrowserGym

This package provides `browsergym.webarena`, which is an unofficial port of the [WebArena](https://webarena.dev/) benchmark for BrowserGym.

Note: the original WebArena codebase has been slightly adapted to ensure compatibility.

## Server installation

You have two options to setup your webarena instance:
 - option 1: follow the official [webarena README](https://github.com/web-arena-x/webarena/blob/main/environment_docker/README.md)
 - option 2: use our [unofficial setup scripts](https://github.com/gasse/webarena-setup/tree/main/webarena)

We recommend **option 2** as it allows you to easily customize the ports of each webarena domain, and offers a reset functionality that allwos browsergym to trigger a full instance reset remotely.

## Setup

1. Install the package
```sh
pip install browsergym-webarena
```

2. Download tokenizer resources
```sh
python -c "import nltk; nltk.download('punkt_tab')"
```

3. Setup the URLs as environment variables. The ports for each domain here should correspond to those you used when setting up your webarena instance. Note also the `WA_` prefix which is specific to browsergym.
```sh
BASE_URL=<YOUR_SERVER_URL_HERE>  # example: "http://myazuremachine.eastus.cloudapp.azure.com"

# webarena environment variables (change ports as needed)
export WA_SHOPPING="$BASE_URL:8082/"
export WA_SHOPPING_ADMIN="$BASE_URL:8083/admin"
export WA_REDDIT="$BASE_URL:8080"
export WA_GITLAB="$BASE_URL:9001"
export WA_WIKIPEDIA="$BASE_URL:8081/wikipedia_en_all_maxi_2022-05/A/User:The_other_Kiwix_guy/Landing"
export WA_MAP="$BASE_URL:443"
export WA_HOMEPAGE="$BASE_URL:80"

# if your webarena instances offers the FULL_RESET feature (optional)
export WA_FULL_RESET="$BASE_URL:7565"
```

5. Setup an OpenAI API key

```sh
export OPENAI_API_KEY=...
```

> **_NOTE:_**  be mindful of costs, as WebArena will call GPT4 for certain evaluations ([llm_fuzzy_match](https://github.com/web-arena-x/webarena/blob/1469b7c9d8eaec3177855b3131569751f43a40d6/evaluation_harness/helper_functions.py#L146C5-L146C20)).
