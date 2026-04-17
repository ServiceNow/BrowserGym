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
