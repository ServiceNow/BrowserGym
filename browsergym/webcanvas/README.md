# WebCanvas Environment

## Installation

1. Install the package
```sh
pip install browsergym-webcanvas
```
2. Setup an OpenAI API key

```sh
export OPENAI_API_KEY=...
```

3. Download the dataset
   - Option 1: Download from HuggingFace
     Visit [Mind2Web-Live Dataset](https://huggingface.co/datasets/iMeanAI/Mind2Web-Live) and download the latest dataset.
   
   - Option 2: Download from WebCanvas Platform
     Visit [WebCanvas Repository](https://github.com/iMeanAI/WebCanvas) and follow the instructions to download the latest dataset.

4. Place the dataset
   - Put the downloaded JSON file into `./src/browsergym/webcanvas/data/`