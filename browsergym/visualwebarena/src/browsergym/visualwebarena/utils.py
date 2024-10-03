import base64
import io
import PIL.Image
import requests

from typing import Literal


def image_url_to_pil_image(image_url: str) -> PIL.Image:
    if not image_url.startswith("http"):
        raise ValueError(f"Unexpected image URL: {image_url}")
    response = requests.get(image_url, stream=True)
    if response.status_code != 200:
        raise ValueError(
            f"Could not download image from url {image_url} (status code {response.status_code})"
        )
    img = PIL.Image.open(io.BytesIO(response.content))
    return img


def data_uri_to_pil_image(data_uri: str) -> PIL.Image:
    if data_uri.startswith("data:image/png;base64,"):
        image_data = base64.b64decode(data_uri.removeprefix("data:image/png;base64,"))
    elif data_uri.startswith("data:image/jpeg;base64,"):
        image_data = base64.b64decode(data_uri.removeprefix("data:image/jpeg;base64,"))
    else:
        raise ValueError(f"Unexpected image encoding: {data_uri}")
    img = PIL.Image.open(io.BytesIO(image_data))
    return img


def pil_image_to_data_uri(image: PIL.Image, format: Literal["png", "jpeg"] = "png") -> str:
    assert format in ("png", "jpeg")
    with io.BytesIO() as image_buffer:
        image.save(image_buffer, format=format.upper())
        byte_data = image_buffer.getvalue()
    image_b64 = base64.b64encode(byte_data).decode("utf-8")
    image_b64 = f"data:image/{format};base64," + image_b64
    return image_b64
