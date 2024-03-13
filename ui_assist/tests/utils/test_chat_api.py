import pytest
from langchain.schema import HumanMessage, SystemMessage
from ui_assist.utils.prompt_templates import STARCHAT_PROMPT_TEMPLATE
from ui_assist.utils.chat_api import HuggingFaceChatModel
from ui_assist.utils.llm_utils import download_and_save_model


@pytest.mark.skip(reason="We can quickly hit the free tier limit on HuggingFace Hub")
def test_CustomLLMChatbot_remotely():
    # model_path = "google/flan-t5-base"  # remote model on HuggingFace Hub
    model_path = "HuggingFaceH4/starchat-beta"  # remote model on HuggingFace Hub

    chatbot = HuggingFaceChatModel(
        model_path=model_path,
        prompt_template=STARCHAT_PROMPT_TEMPLATE,
        hf_hosted=True,
        temperature=1e-3,
    )

    messages = [
        SystemMessage(content="You are an helpful virtual assistant"),
        HumanMessage(content="Is python a programming language?"),
    ]

    answer = chatbot(messages)

    print(answer.content)


@pytest.mark.skip(reason="Requires a local model checkpoint")
def test_CustomLLMChatbot_locally():
    # model_path = "google/flan-t5-base"  # remote model on HuggingFace Hub
    model_path = "/mnt/ui_assist/data_rw/models/starcoderbase-1b-ft"  # local model in shared volum

    chatbot = HuggingFaceChatModel(model_path=model_path, temperature=1e-3)

    messages = [
        SystemMessage(content="Please tell me back the following word: "),
        HumanMessage(content="bird"),
    ]

    answer = chatbot(messages)

    print(answer.content)


@pytest.mark.skip(reason="Requires downloading a large file on disk local model checkpoint")
def test_download_and_save_model():
    model_path = "meta-llama/Llama-2-70b-chat"
    save_dir = "test_models"

    download_and_save_model(model_path, save_dir)
