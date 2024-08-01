# WebArena benchmark for BrowserGym

This package provides `browsergym.webarena`, which is an unofficial port of the [WebArena](https://webarena.dev/) benchmark for BrowserGym.

Note: the original WebArena codebase has been slightly adapted to ensure compatibility.

## Setup

1. Install the package
```sh
pip install browsergym-webarena
```

2. Download tokenizer ressources
```sh
python -c "import nltk; nltk.download('punkt')"
```

3. Setup the web servers (follow the [webarena README](https://github.com/web-arena-x/webarena/blob/main/environment_docker/README.md)).
```sh
BASE_URL=<YOUR_SERVER_URL_HERE>
```

4. Setup the URLs as environment variables (note the `WA_` prefix)
```sh
export WA_SHOPPING="$BASE_URL:7770/"
export WA_SHOPPING_ADMIN="$BASE_URL:7780/admin"
export WA_REDDIT="$BASE_URL:9999"
export WA_GITLAB="$BASE_URL:8023"
export WA_WIKIPEDIA="$BASE_URL:8888/wikipedia_en_all_maxi_2022-05/A/User:The_other_Kiwix_guy/Landing"
export WA_MAP="$BASE_URL:3000"
export WA_HOMEPAGE="$BASE_URL:4399"
```

5. Setup an OpenAI API key

```sh
export OPENAI_API_KEY=...
```

> **_NOTE:_**  be mindful of costs, as WebArena will call GPT4 for certain evaluations ([llm_fuzzy_match](https://github.com/web-arena-x/webarena/blob/1469b7c9d8eaec3177855b3131569751f43a40d6/evaluation_harness/helper_functions.py#L146C5-L146C20)).
