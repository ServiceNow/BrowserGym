"""
Audio capture module for BrowserGym.

Captures browser audio output using a PulseAudio virtual sink on Linux.
Provides raw audio bytes (for omni models) and Whisper transcription (for LLM agents).

Setup (Linux only):
    # Install PulseAudio and ffmpeg
    sudo apt-get install pulseaudio ffmpeg

    # The module automatically creates/manages virtual sinks per browser instance.

Usage:
    capturer = AudioCapturer(sink_name="bgym_audio_0")
    capturer.start()
    # ... browser plays audio ...
    audio_bytes = capturer.stop()  # returns raw WAV bytes
    transcript = capturer.transcribe(audio_bytes)  # optional Whisper transcription
"""

import io
import logging
import os
import shutil
import subprocess
import tempfile
import time
import wave
from pathlib import Path
from typing import Optional

import numpy as np

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


def is_pulseaudio_available():
    """Check if PulseAudio tools are available."""
    return (
        shutil.which("pactl") is not None
        and shutil.which("parec") is not None
    )


def is_ffmpeg_available():
    """Check if ffmpeg is available."""
    return shutil.which("ffmpeg") is not None


class AudioCapturer:
    """
    Captures audio output from a browser instance using PulseAudio.

    Creates a virtual sink, routes browser audio to it, and records from the
    sink's monitor source.

    Args:
        sink_name: Name for the PulseAudio virtual sink.
        sample_rate: Audio sample rate in Hz.
        channels: Number of audio channels.
        duration: Max recording duration in seconds (0 = unlimited).
    """

    def __init__(
        self,
        sink_name: str = "bgym_audio",
        sample_rate: int = 16000,
        channels: int = 1,
        duration: float = 0,
    ):
        self.sink_name = sink_name
        self.sample_rate = sample_rate
        self.channels = channels
        self.duration = duration
        self._sink_id: Optional[int] = None
        self._parec_process: Optional[subprocess.Popen] = None
        self._raw_file: Optional[str] = None
        self._recording = False

    def setup_sink(self):
        """Create a PulseAudio virtual sink for capturing browser audio."""
        if not is_pulseaudio_available():
            raise RuntimeError(
                "PulseAudio tools (pactl, parec) are not available. "
                "Install with: sudo apt-get install pulseaudio"
            )

        # Remove existing sink if any
        self.teardown_sink()

        # Create virtual sink
        result = subprocess.run(
            ["pactl", "load-module", "module-null-sink",
             f"sink_name={self.sink_name}",
             f"sink_properties=device.description=BrowserGym_Audio_{self.sink_name}"],
            capture_output=True, text=True,
        )
        if result.returncode != 0:
            raise RuntimeError(f"Failed to create PulseAudio sink: {result.stderr}")

        self._sink_id = int(result.stdout.strip())
        logger.info(f"Created PulseAudio sink: {self.sink_name} (module {self._sink_id})")

    def teardown_sink(self):
        """Remove the PulseAudio virtual sink."""
        if self._sink_id is not None:
            subprocess.run(
                ["pactl", "unload-module", str(self._sink_id)],
                capture_output=True,
            )
            logger.info(f"Removed PulseAudio sink module {self._sink_id}")
            self._sink_id = None

    def get_sink_monitor(self):
        """Get the monitor source name for our virtual sink."""
        return f"{self.sink_name}.monitor"

    def get_chromium_pulse_args(self):
        """
        Return Chromium launch args to route audio to our virtual sink.

        Pass these to playwright's chromium.launch(args=[...]).
        """
        return [
            f"--audio-output-device={self.sink_name}",
        ]

    def get_pulse_env(self):
        """
        Return environment variable overrides to route audio to our sink.

        This is an alternative to Chromium args — sets the default PulseAudio sink
        for the browser process.
        """
        return {"PULSE_SINK": self.sink_name}

    def start(self):
        """Start recording audio from the virtual sink's monitor."""
        if self._recording:
            logger.warning("Already recording. Call stop() first.")
            return

        monitor = self.get_sink_monitor()
        self._raw_file = tempfile.mktemp(suffix=".wav")

        cmd = [
            "parec",
            "--device", monitor,
            "--format", "s16le",
            "--rate", str(self.sample_rate),
            "--channels", str(self.channels),
        ]

        # Pipe parec output to ffmpeg to write a proper WAV file
        parec_proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        ffmpeg_cmd = [
            "ffmpeg", "-y",
            "-f", "s16le",
            "-ar", str(self.sample_rate),
            "-ac", str(self.channels),
            "-i", "pipe:0",
            self._raw_file,
        ]

        self._ffmpeg_process = subprocess.Popen(
            ffmpeg_cmd, stdin=parec_proc.stdout, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
        )
        self._parec_process = parec_proc

        self._recording = True
        self._start_time = time.time()
        logger.info(f"Started audio recording from {monitor}")

    def stop(self) -> Optional[bytes]:
        """
        Stop recording and return the captured audio as WAV bytes.

        Returns:
            WAV file bytes, or None if nothing was captured.
        """
        if not self._recording:
            return None

        # Stop parec (this closes the pipe to ffmpeg)
        if self._parec_process:
            self._parec_process.terminate()
            self._parec_process.wait(timeout=5)
            self._parec_process = None

        # Wait for ffmpeg to finish writing
        if self._ffmpeg_process:
            self._ffmpeg_process.wait(timeout=10)
            self._ffmpeg_process = None

        self._recording = False
        elapsed = time.time() - self._start_time
        logger.info(f"Stopped audio recording ({elapsed:.1f}s)")

        # Read the WAV file
        if self._raw_file and os.path.exists(self._raw_file):
            with open(self._raw_file, "rb") as f:
                audio_bytes = f.read()
            os.unlink(self._raw_file)
            self._raw_file = None

            if len(audio_bytes) > 44:  # WAV header is 44 bytes
                return audio_bytes
            else:
                logger.warning("Captured audio is empty (header only).")
                return None
        return None

    def capture_segment(self, duration: float) -> Optional[bytes]:
        """
        Convenience method: record for a fixed duration and return WAV bytes.

        Args:
            duration: Recording duration in seconds.

        Returns:
            WAV file bytes, or None if nothing was captured.
        """
        self.start()
        time.sleep(duration)
        return self.stop()

    @staticmethod
    def transcribe(audio_bytes: bytes, language: str = None) -> str:
        """
        Transcribe audio bytes using Whisper.

        Args:
            audio_bytes: WAV file bytes.
            language: Optional language hint (e.g., "en").

        Returns:
            Transcription text.
        """
        if audio_bytes is None:
            return ""

        model = _get_whisper_model()

        # Write to temp file for Whisper
        tmp = tempfile.mktemp(suffix=".wav")
        try:
            with open(tmp, "wb") as f:
                f.write(audio_bytes)
            result = model.transcribe(tmp, language=language)
            return result.get("text", "").strip()
        finally:
            if os.path.exists(tmp):
                os.unlink(tmp)

    @staticmethod
    def audio_bytes_to_numpy(audio_bytes: bytes) -> Optional[np.ndarray]:
        """
        Convert WAV bytes to a numpy array (float32, normalized to [-1, 1]).

        Args:
            audio_bytes: WAV file bytes.

        Returns:
            1D numpy float32 array, or None.
        """
        if audio_bytes is None:
            return None
        try:
            buf = io.BytesIO(audio_bytes)
            with wave.open(buf, "rb") as wf:
                frames = wf.readframes(wf.getnframes())
                audio = np.frombuffer(frames, dtype=np.int16).astype(np.float32)
                audio /= 32768.0  # normalize to [-1, 1]
                return audio
        except Exception as e:
            logger.warning(f"Failed to convert audio bytes to numpy: {e}")
            return None

    def __del__(self):
        """Cleanup on garbage collection."""
        if self._recording:
            self.stop()
        self.teardown_sink()
