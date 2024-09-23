import base64
import io
import PIL.Image
import requests


def image_url_to_pil_image(image_url: str) -> str:
    if image_url.startswith("http"):
        image_data = requests.get(image_url, stream=True).raw
    elif image_url.startswith("data:image/png;base64,"):
        image_data = base64.b64decode(image_url.removeprefix("data:image/png;base64,"))
    elif image_url.startswith("data:image/jpeg;base64,"):
        image_data = base64.b64decode(image_url.removeprefix("data:image/jpeg;base64,"))
    else:
        if image_url.startswith("data:image/"):
            raise ValueError(f"Unexpected image encoding: {image_url}")
        else:
            raise ValueError(f"Unexpected image URL: {image_url}")
    img = PIL.Image.open(io.BytesIO(image_data))
    return img
