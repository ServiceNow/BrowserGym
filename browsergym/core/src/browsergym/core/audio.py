"""
Audio capture module for BrowserGym.

Captures audio from <audio> and <video> elements in the browser using
JavaScript's MediaRecorder API via Playwright. No system dependencies required.

Provides:
- Raw audio bytes (for omni models that accept audio input)
- Whisper transcription (for LLM agents)

Usage:
    # Capture audio from the active page
    audio_bytes = extract_audio(page, duration=5.0)

    # Transcribe it
    transcript = transcribe_audio(audio_bytes)
"""

import base64
import logging
import os
import tempfile
from typing import Optional

import numpy as np
import playwright.sync_api

logger = logging.getLogger(__name__)

# Whisper model is lazy-loaded
_whisper_model = None
_whisper_model_name = "base"


def _get_whisper_model():
    """Lazy-load the Whisper model."""
    global _whisper_model
    if _whisper_model is None:
        try:
            import whisper

            _whisper_model = whisper.load_model(_whisper_model_name)
            logger.info(f"Loaded Whisper model: {_whisper_model_name}")
        except ImportError:
            raise ImportError(
                "openai-whisper is required for audio transcription. "
                "Install it with: pip install openai-whisper"
            )
    return _whisper_model


# ---------------------------------------------------------------------------
# JavaScript for in-browser audio capture
# ---------------------------------------------------------------------------

AUDIO_CAPTURE_INSTALL_JS = """
() => {
    if (window.__bgym_audio_installed) return true;

    window.__bgym_audio_capture = {
        recorder: null,
        chunks: [],
        resolve: null,
        recording: false,
    };

    /**
     * Find the first <audio> or <video> element that has a media source.
     */
    window.__bgym_find_media_element = function() {
        const candidates = [
            ...document.querySelectorAll('video'),
            ...document.querySelectorAll('audio'),
        ];
        for (const el of candidates) {
            // Skip muted or silent elements
            if (el.muted && !el.src && !el.srcObject) continue;
            if (el.readyState >= 2) return el;  // HAVE_CURRENT_DATA or better
        }
        // Fallback: return first media element found
        return candidates[0] || null;
    };

    window.__bgym_audio_installed = true;
    return true;
}
"""

AUDIO_CAPTURE_START_JS = """
(durationMs) => {
    return new Promise((resolveOuter) => {
        const state = window.__bgym_audio_capture;
        if (state.recording) {
            resolveOuter({error: 'Already recording'});
            return;
        }

        const el = window.__bgym_find_media_element();
        if (!el) {
            resolveOuter({error: 'No media element found on page'});
            return;
        }

        let stream;
        try {
            stream = el.captureStream();
        } catch (e) {
            resolveOuter({error: 'captureStream failed: ' + e.message});
            return;
        }

        // Filter to audio tracks only
        const audioTracks = stream.getAudioTracks();
        if (audioTracks.length === 0) {
            resolveOuter({error: 'No audio tracks in media stream'});
            return;
        }

        const audioStream = new MediaStream(audioTracks);

        // Prefer webm/opus, fall back to whatever is available
        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
            ? 'audio/webm;codecs=opus'
            : MediaRecorder.isTypeSupported('audio/webm')
                ? 'audio/webm'
                : '';

        const recorder = new MediaRecorder(audioStream, mimeType ? {mimeType} : {});
        state.chunks = [];
        state.recorder = recorder;
        state.recording = true;

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                state.chunks.push(e.data);
            }
        };

        recorder.onstop = () => {
            state.recording = false;
            const blob = new Blob(state.chunks, {type: recorder.mimeType});
            const reader = new FileReader();
            reader.onloadend = () => {
                // result is a data URL: "data:audio/webm;base64,..."
                const base64 = reader.result.split(',')[1];
                if (state.resolve) {
                    state.resolve({
                        audio_base64: base64,
                        mime_type: recorder.mimeType,
                        duration_ms: durationMs,
                    });
                    state.resolve = null;
                }
            };
            reader.readAsDataURL(blob);
        };

        // Start recording
        recorder.start();

        // Ensure the media element is playing
        if (el.paused) {
            el.play().catch(() => {});
        }

        resolveOuter({status: 'recording_started', mime_type: recorder.mimeType});
    });
}
"""

AUDIO_CAPTURE_STOP_JS = """
() => {
    return new Promise((resolve) => {
        const state = window.__bgym_audio_capture;
        if (!state.recording || !state.recorder) {
            resolve({error: 'Not recording'});
            return;
        }

        state.resolve = resolve;
        state.recorder.stop();
    });
}
"""

AUDIO_CAPTURE_FULL_JS = """
(durationMs) => {
    return new Promise(async (resolve) => {
        const state = window.__bgym_audio_capture;
        if (state.recording) {
            resolve({error: 'Already recording'});
            return;
        }

        const el = window.__bgym_find_media_element();
        if (!el) {
            resolve({error: 'No media element found on page'});
            return;
        }

        let stream;
        try {
            stream = el.captureStream();
        } catch (e) {
            resolve({error: 'captureStream failed: ' + e.message});
            return;
        }

        const audioTracks = stream.getAudioTracks();
        if (audioTracks.length === 0) {
            resolve({error: 'No audio tracks in media stream'});
            return;
        }

        const audioStream = new MediaStream(audioTracks);
        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
            ? 'audio/webm;codecs=opus'
            : MediaRecorder.isTypeSupported('audio/webm')
                ? 'audio/webm'
                : '';

        const recorder = new MediaRecorder(audioStream, mimeType ? {mimeType} : {});
        const chunks = [];
        state.recording = true;

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
            state.recording = false;
            const blob = new Blob(chunks, {type: recorder.mimeType});
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split(',')[1];
                resolve({
                    audio_base64: base64,
                    mime_type: recorder.mimeType,
                    duration_ms: durationMs,
                });
            };
            reader.readAsDataURL(blob);
        };

        // Ensure media is playing
        if (el.paused) {
            el.play().catch(() => {});
        }

        recorder.start();
        setTimeout(() => {
            if (recorder.state === 'recording') {
                recorder.stop();
            }
        }, durationMs);
    });
}
"""


# ---------------------------------------------------------------------------
# Python API
# ---------------------------------------------------------------------------

def install_audio_capture(page: playwright.sync_api.Page):
    """
    Install the audio capture scripts into the page.
    Safe to call multiple times (idempotent).
    """
    try:
        page.evaluate(AUDIO_CAPTURE_INSTALL_JS)
    except Exception as e:
        logger.warning(f"Failed to install audio capture scripts: {e}")


def extract_audio(
    page: playwright.sync_api.Page,
    duration: float = 5.0,
) -> Optional[bytes]:
    """
    Capture audio from the active page's media elements.

    Uses JavaScript MediaRecorder API to capture audio from <audio>/<video>
    elements. No system dependencies required.

    Args:
        page: Playwright page object.
        duration: Duration to record in seconds.

    Returns:
        Audio bytes (webm/opus format), or None if no audio is available.
    """
    install_audio_capture(page)

    try:
        result = page.evaluate(
            AUDIO_CAPTURE_FULL_JS,
            int(duration * 1000),
        )
    except Exception as e:
        logger.warning(f"Audio capture failed: {e}")
        return None

    if isinstance(result, dict) and "error" in result:
        logger.debug(f"Audio capture: {result['error']}")
        return None

    if isinstance(result, dict) and "audio_base64" in result:
        audio_bytes = base64.b64decode(result["audio_base64"])
        if len(audio_bytes) > 0:
            logger.info(
                f"Captured {len(audio_bytes)} bytes of audio "
                f"({result.get('mime_type', 'unknown')}, {duration}s)"
            )
            return audio_bytes

    return None


def transcribe_audio(audio_bytes: Optional[bytes], language: str = None, use_api: bool = True) -> str:
    """
    Transcribe audio bytes using Whisper.

    Args:
        audio_bytes: Audio file bytes (webm, wav, mp3, etc.).
        language: Optional language hint (e.g., "en").
        use_api: If True (default), use OpenAI Whisper API. If False, use local whisper model.

    Returns:
        Transcription text, or empty string if transcription fails.
    """
    if audio_bytes is None or len(audio_bytes) == 0:
        return ""

    if use_api:
        return _transcribe_api(audio_bytes, language)
    else:
        return _transcribe_local(audio_bytes, language)


def _transcribe_api(audio_bytes: bytes, language: str = None) -> str:
    """Transcribe using OpenAI Whisper API."""
    try:
        from openai import OpenAI
    except ImportError:
        raise ImportError(
            "openai is required for Whisper API transcription. "
            "Install it with: pip install openai"
        )

    tmp = tempfile.mktemp(suffix=".webm")
    try:
        with open(tmp, "wb") as f:
            f.write(audio_bytes)

        client = OpenAI()
        with open(tmp, "rb") as audio_file:
            kwargs = {"model": "whisper-1", "file": audio_file}
            if language:
                kwargs["language"] = language
            result = client.audio.transcriptions.create(**kwargs)
        return result.text.strip()
    except Exception as e:
        logger.warning(f"Whisper API transcription failed: {e}")
        return ""
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)


def _transcribe_local(audio_bytes: bytes, language: str = None) -> str:
    """Transcribe using local Whisper model."""
    model = _get_whisper_model()

    tmp = tempfile.mktemp(suffix=".webm")
    try:
        with open(tmp, "wb") as f:
            f.write(audio_bytes)
        result = model.transcribe(tmp, language=language)
        return result.get("text", "").strip()
    except Exception as e:
        logger.warning(f"Local Whisper transcription failed: {e}")
        return ""
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)


def audio_bytes_to_base64(audio_bytes: Optional[bytes]) -> Optional[str]:
    """
    Convert audio bytes to a base64 string (for sending to omni model APIs).

    Args:
        audio_bytes: Raw audio file bytes.

    Returns:
        Base64-encoded string, or None.
    """
    if audio_bytes is None:
        return None
    return base64.b64encode(audio_bytes).decode("utf-8")
