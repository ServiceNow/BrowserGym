import bs4
import re

import tiktoken


def prune_html(html):
    html = re.sub(r"\n", " ", html)
    # remove html comments
    html = re.sub(r"<!--(.*?)-->", "", html, flags=re.MULTILINE)

    soup = bs4.BeautifulSoup(html, "lxml")
    for tag in reversed(soup.find_all()):
        # remove body and html tags (not their content)
        if tag.name in ("html", "body"):
            tag.unwrap()
        # remove useless tags
        elif tag.name in ("style", "link", "script", "br"):
            tag.decompose()
        # remove / unwrap structural tags
        elif tag.name in ("div", "span", "i", "p") and len(tag.attrs) == 1 and tag.has_attr("bid"):
            if not tag.contents:
                tag.decompose()
            else:
                tag.unwrap()

    html = soup.prettify()

    return html


def count_tokens(text, model="gpt-4"):
    """Count the number of tokens in a text."""

    return len(tiktoken.encoding_for_model(model).encode(text))


def count_messages_token(messages, model="gpt-4"):
    """Count the number of tokens in a list of messages.

    Args:
        messages (list): a list of messages, each message can be a string or a
            list of dicts or an object with a content attribute.
        model (str): the model to use for tokenization.

    Returns:
        int: the number of tokens.
    """
    token_count = 0
    for message in messages:
        if hasattr(message, "content"):
            message = message.content

        if isinstance(message, str):
            token_count += count_tokens(message, model)
        # handles messages with image content
        elif isinstance(message, (list, tuple)):
            for part in message:
                if not isinstance(part, dict):
                    raise ValueError(
                        f"The message is expected to be a list of dicts, but got list of {type(message)}"
                    )
                if part["type"] == "text":
                    token_count += count_tokens(part["text"], model)
        else:
            raise ValueError(
                f"The message is expected to be a string or a list of dicts, but got {type(message)}"
            )
    return token_count
