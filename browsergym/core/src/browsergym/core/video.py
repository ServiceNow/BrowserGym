"""
Video frame extraction module for BrowserGym.

Extracts frames from <video> elements in the browser using
JavaScript Canvas API via Playwright. No system dependencies required.

Provides:
- Raw frames as images (for VLM agents)
- VLM-generated captions (for LLM agents)

Usage:
    # Extract 10 evenly-spaced frames from a video
    frames = extract_video_frames(page, num_frames=10)

    # frames is a list of base64-encoded JPEG images
"""

import base64
import io
import logging
from typing import Optional

import numpy as np
from PIL import Image
import playwright.sync_api

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# JavaScript for in-browser video frame extraction
# ---------------------------------------------------------------------------

EXTRACT_FRAMES_JS = """
(args) => {
    const [numFrames, targetWidth, targetHeight] = args;

    return new Promise(async (resolve) => {
        const video = document.querySelector('video');
        if (!video) {
            resolve({error: 'No video element found on page'});
            return;
        }

        // Ensure video metadata is loaded
        if (video.readyState < 1) {
            await new Promise((r) => {
                video.addEventListener('loadedmetadata', r, {once: true});
                // Timeout after 5s
                setTimeout(r, 5000);
            });
        }

        const duration = video.duration;
        if (!duration || duration === Infinity || isNaN(duration)) {
            resolve({error: 'Video duration not available'});
            return;
        }

        // Pause the video for frame extraction
        video.pause();

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        const frames = [];
        const timestamps = [];

        // Calculate evenly-spaced timestamps
        for (let i = 0; i < numFrames; i++) {
            timestamps.push((duration * i) / numFrames);
        }

        // Extract frames sequentially
        for (const ts of timestamps) {
            video.currentTime = ts;
            await new Promise((r) => {
                video.addEventListener('seeked', r, {once: true});
                // Timeout after 3s per frame
                setTimeout(r, 3000);
            });

            ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            const base64Data = dataUrl.split(',')[1];
            frames.push({
                timestamp: ts,
                base64: base64Data,
            });
        }

        resolve({
            frames: frames,
            duration: duration,
            original_width: video.videoWidth,
            original_height: video.videoHeight,
        });
    });
}
"""


# ---------------------------------------------------------------------------
# Python API
# ---------------------------------------------------------------------------

def extract_video_frames(
    page: playwright.sync_api.Page,
    num_frames: int = 10,
    width: int = 1280,
    height: int = 720,
) -> Optional[list[dict]]:
    """
    Extract evenly-spaced frames from a <video> element on the page.

    Uses JavaScript Canvas API to seek to timestamps and capture frames.
    No system dependencies required.

    Args:
        page: Playwright page object.
        num_frames: Number of frames to extract (default: 10).
        width: Target frame width in pixels (default: 1280 for 720p).
        height: Target frame height in pixels (default: 720 for 720p).

    Returns:
        List of dicts with keys:
            - 'timestamp': float, time in seconds
            - 'base64': str, base64-encoded JPEG image
            - 'image': PIL.Image object
        Or None if no video element found.
    """
    try:
        result = page.evaluate(
            EXTRACT_FRAMES_JS,
            [num_frames, width, height],
        )
    except Exception as e:
        logger.warning(f"Video frame extraction failed: {e}")
        return None

    if isinstance(result, dict) and "error" in result:
        logger.debug(f"Video frame extraction: {result['error']}")
        return None

    if isinstance(result, dict) and "frames" in result:
        frames = []
        for frame_data in result["frames"]:
            img_bytes = base64.b64decode(frame_data["base64"])
            img = Image.open(io.BytesIO(img_bytes))
            frames.append({
                "timestamp": frame_data["timestamp"],
                "base64": frame_data["base64"],
                "image": img,
            })

        logger.info(
            f"Extracted {len(frames)} frames from video "
            f"({result.get('duration', 0):.1f}s, "
            f"{result.get('original_width', 0)}x{result.get('original_height', 0)})"
        )
        return frames

    return None


def frames_to_numpy(frames: list[dict]) -> list[np.ndarray]:
    """
    Convert extracted frames to numpy arrays.

    Args:
        frames: List of frame dicts from extract_video_frames().

    Returns:
        List of numpy arrays (height, width, 3) in RGB.
    """
    return [np.array(f["image"].convert("RGB")) for f in frames]


def frames_to_base64_list(frames: list[dict]) -> list[str]:
    """
    Get base64 strings from extracted frames (for sending to VLM APIs).

    Args:
        frames: List of frame dicts from extract_video_frames().

    Returns:
        List of base64-encoded JPEG strings.
    """
    return [f["base64"] for f in frames]


def describe_video_frames(
    frames: list[dict],
    task_hint: str = "",
    use_api: bool = True,
) -> list[dict]:
    """
    Generate text descriptions of video frames using a VLM (for LLM agents).

    Args:
        frames: List of frame dicts from extract_video_frames().
        task_hint: Optional hint about what to look for in the frames.
        use_api: If True (default), use OpenAI GPT-4o API.

    Returns:
        List of dicts with keys:
            - 'timestamp': float
            - 'description': str (VLM-generated caption)
    """
    if not frames:
        return []

    if use_api:
        return _describe_frames_api(frames, task_hint)
    else:
        logger.warning("Local VLM captioning not implemented. Use use_api=True.")
        return [{"timestamp": f["timestamp"], "description": ""} for f in frames]


def _describe_frames_api(frames: list[dict], task_hint: str = "") -> list[dict]:
    """Describe video frames using OpenAI GPT-4o API."""
    try:
        from openai import OpenAI
    except ImportError:
        raise ImportError(
            "openai is required for video frame description. "
            "Install it with: pip install openai"
        )

    client = OpenAI()

    # Build a single request with all frames for efficiency
    content = []

    prompt = "Describe each of the following video frames concisely (1-2 sentences each). "
    prompt += "Focus on visible text, people, actions, and key visual elements. "
    prompt += f"Number your descriptions to match the frame order."
    if task_hint:
        prompt += f" Context: {task_hint}"

    content.append({"type": "text", "text": prompt})

    for i, frame in enumerate(frames):
        content.append({"type": "text", "text": f"Frame {i+1} (at {frame['timestamp']:.1f}s):"})
        content.append({
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{frame['base64']}",
                "detail": "low",
            },
        })

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": content}],
            max_completion_tokens=1000,
            temperature=0,
        )
        response_text = response.choices[0].message.content.strip()

        # Parse numbered descriptions
        descriptions = []
        lines = response_text.split("\n")
        current_desc = ""
        current_idx = 0

        for line in lines:
            line = line.strip()
            if not line:
                continue
            # Check if line starts a new frame description
            import re
            match = re.match(r"(?:Frame\s*)?(\d+)[\.\)\:]?\s*(.*)", line)
            if match and int(match.group(1)) > current_idx:
                if current_desc and current_idx > 0:
                    descriptions.append(current_desc.strip())
                current_idx = int(match.group(1))
                current_desc = match.group(2)
            else:
                current_desc += " " + line

        if current_desc:
            descriptions.append(current_desc.strip())

        # Match descriptions to frames
        result = []
        for i, frame in enumerate(frames):
            desc = descriptions[i] if i < len(descriptions) else ""
            result.append({
                "timestamp": frame["timestamp"],
                "description": desc,
            })

        return result

    except Exception as e:
        logger.warning(f"Video frame description failed: {e}")
        return [{"timestamp": f["timestamp"], "description": ""} for f in frames]


def format_frame_descriptions(described_frames: list[dict]) -> str:
    """
    Format frame descriptions as text for LLM agents.

    Args:
        described_frames: List of dicts from describe_video_frames().

    Returns:
        Formatted string for inclusion in agent observations.
    """
    if not described_frames:
        return "No video frames available."

    lines = []
    for f in described_frames:
        if f["description"]:
            lines.append(f"[{f['timestamp']:.1f}s] {f['description']}")
    return "\n".join(lines) if lines else "No frame descriptions available."
