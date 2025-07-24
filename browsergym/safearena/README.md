## Installation

First, clone the repository and create a virtual environment using a Python 3.10+ version:

```bash
git clone https://github.com/McGill-NLP/safearena.git

cd safearena/
python -m venv venv
source venv/bin/activate
```

Then, install the required packages:

```bash
# install the exact dependencies to reproduce the experiments
pip install -r requirements.txt

# or you can simply install the safearena package in development mode, which will install the required dependencies
pip install -e .

# Install playwright
playwright install
```

## Task splits download

First, request access to the SafeArena dataset on the Hugging Face Hub. Once you have access, you can log in using the `huggingface_hub` CLI:

```bash
pip install huggingface-hub
huggingface-cli login
```

Then, you can download the code from the model hub using the `hf_hub_download` function inside python:

```python
from huggingface_hub import hf_hub_download

# Download the safe.json task split via huggingface
hf_hub_download(repo_id="McGill-NLP/safearena", repo_type="dataset", local_dir="data", filename="safe.json")
# Download the harm.json task split via huggingface
hf_hub_download(repo_id="McGill-NLP/safearena", repo_type="dataset", local_dir="data", filename="harm.json")
```

You now have the required task splits in the relative `data/` directory.

## Experiments

### API Keys and Base URLs as Environment Variables

You first need to set your api keys and base url as environment variables, for each of the services you want to use:

```bash
export OPENAI_ORG_ID="your-openai-org-id"

# API keys
export OPENAI_API_KEY="your-openai-api-key"
export TOGETHER_API_KEY="your-together-api-key"
export VLLM_API_KEY="your-vllm-api-key"
export OPENROUTER_API_KEY="your-openrouter-api-key"

export VLLM_BASE_URL="https://vllm.mcgill-nlp.com"
export TOGETHER_BASE_URL="https://api.together.xyz/v1"
export OPENROUTER_BASE_URL="https://openrouter.ai/api/v1"
```

The `OPENAI_ORG_ID` is the organization id you are using for the OpenAI API. You can find it in the OpenAI dashboard. Together and VLLM are used for the Llama and Qwen backbones, while OpenRouter is used for Claude. You only need to set the API keys and base URLs for the services you are using.

### Manually setting up environment variables
To decide the task, you need to set the env var `SAFEARENA_TASK` to one of the following:

```bash
# if you want to run the safe task  on human data...
export SAFEARENA_TASK="safe"
# ... or if you want to run the harmful task on human data...
export SAFEARENA_TASK="harm"
```

You also need to specify suffix and domain name:

```bash
export DOMAIN_NAME="your-domain.com"
export SUFFIX="aa-1"
```

Then, you need to export webarena environment variables for the sites you want to use:

```bash
export WA_HOMEPAGE="https://sa-homepage-${SUFFIX}.${DOMAIN_NAME}"
export WA_SHOPPING="https://sa-shopping-${SUFFIX}.${DOMAIN_NAME}/"
export WA_SHOPPING_ADMIN="https://sa-shopping-admin-${SUFFIX}.${DOMAIN_NAME}/admin"
export WA_REDDIT="https://sa-forum-${SUFFIX}.${DOMAIN_NAME}"
export WA_GITLAB="https://sa-gitlab-${SUFFIX}.${DOMAIN_NAME}"
export WA_FULL_RESET="https://sa-reset-${SUFFIX}.${DOMAIN_NAME}"
# Those are not functional sites but are emptily defined here for compatibility with browsergym
export WA_WIKIPEDIA="https://sa-wikipedia-${SUFFIX}.${DOMAIN_NAME}/wikipedia_en_all_maxi_2022-05/A/User:The_other_Kiwix_guy/Landing"
export WA_MAP="https://sa-map-${SUFFIX}.${DOMAIN_NAME}"
```

Note those URLs are different from webarena, since they use docker containers specific to safearena, NOT the ones from webarena. Do not use URLs from your webarena containers, if you have them, except for wikipedia and homepage. Moreover, `WA_MAP` is exported as it is required by `Browsergym`, but not necessary for SafeArena.

> [!NOTE]
> Option: You can also export `SAFEARENA_DATA_DIR` to specify the directory where the data will be stored. By default, it will be `./data`.

### Using pre-defined environment variables

You can also source from some pre-defined environment variables:

```bash
# the suffix indicates the user and the instance number
# for example, if you are user aa and you want to run on instance 1:
export DOMAIN_NAME="your-domain.com"
export SUFFIX="aa-1"

# if you want to run the "safe" task based on the SUFFIX:
source vars/safe-cf.sh

# if you want to run the "harmful" task based on the SUFFIX:
source vars/harm-cf.sh
```

### Launching experiments

To run an experiment, use the `scripts/launch_experiment.py` script. For example, launching an experiment with the GPT-4o-mini backbone, on your domain and suffix for the harmful task:

```bash
export DOMAIN_NAME="your-domain.com"
export SUFFIX="aa-1"

source vars/harm-cf.sh
python scripts/launch_experiment.py --backbone gpt-4o-mini
```

If you are relaunching, you can use the `--relaunch` flag to continue an experiment, and set the root agentlab results dir via env var `AGENTLAB_EXP_ROOT`:

```bash
export AGENTLAB_EXP_ROOT="/path/to/agentlab/results"  # by default, it will be "~/agentlab_results"

# relaunch an experiment
python scripts/launch_experiment.py --backbone gpt-4o-mini --relaunch "<name_of_experiment>"
```

If you want to run the task in parallel, you can use `ray`:

```bash
python scripts/launch_experiment.py --backbone gpt-4o-mini --parallel ray -n 4
```

### Reviewing experiments with agent-xray

To visualize the agent's behavior, you can use the `agent_xray.py` tool derived from agentlab:

```bash
python apps/agent_xray.py --results_dir "<path_to_results_dir>" --port "<port>"
```

## Citation

Please cite our paper using the follow bibtex:

```
@misc{safearena2025,
      title={SafeArena: Evaluating the Safety of Autonomous Web Agents}, 
      author={Ada Tur and Nicholas Meade and Xing Han Lù and Alejandra Zambrano and
              Arkil Patel and Esin Durmus and Spandana Gella and Karolina Stańczak and Siva Reddy},
      year={2025},
      eprint={2503.04957},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2503.04957},
}
```
