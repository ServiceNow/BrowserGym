# BrowserGym - WebArena-Pro

WebArena-Pro benchmark for BrowserGym. A multi-website, cross-modality benchmark starting with Mattermost, extensible to additional sites.

## Quick Start

```bash
# 1. Create environment
conda create -n browsergym-multimodal python=3.11
conda activate browsergym-multimodal

# 2. Install
cd BrowserGym
pip install -e browsergym/core -e browsergym/experiments -e browsergym/webarena_pro
pip install openai
playwright install chromium

# 3. Set environment variables
export WAP_MATTERMOST="https://mattermost.webarena-pro.win"  # hosted instance
export OPENAI_API_KEY="sk-..."                                 # for Whisper API + LLM agent
```

## Tasks

### Text-only tasks (0-9)

Standard web interaction tasks that don't require audio/video understanding.

```bash
python test_llm_agent.py --task_id 0
```

### Audio tasks (10-14)

Cross-modality tasks that require the agent to listen to audio/video attachments and act on the information.

| Task | Type | Description |
|------|------|-------------|
| 10 | Audio comprehension | Listen to a voice message, report the deployment schedule |
| 11 | Audio comprehension | Listen to a voice message, identify which project needs review |
| 12 | Audio + action | Listen to voice message, navigate to the mentioned project's channel, post a reply |
| 13 | Audio + action | Listen to voice message, summarize the deadline in another channel |
| 14 | Video comprehension | Watch a video, report the text messages shown |

```bash
# Run a single task
python test_llm_agent.py --task_id 12

# Specify model
python test_llm_agent.py --task_id 12 --model gpt-5-mini
```

## How Audio Capture Works

When the agent clicks an audio/video file attachment (e.g., `.mp3`, `.mp4`), the following happens:

1. The media element is played in the browser
2. JavaScript `captureStream()` + `MediaRecorder` captures the audio
3. The captured audio is sent to the Whisper API for transcription
4. The transcript appears in the agent's next observation under `## Audio Observation`

No system dependencies required (no PulseAudio, no ffmpeg). Works cross-platform.

### Observation format

The agent receives structured observations at each step:

```
## Page Observation
URL: https://mattermost.webarena-pro.win/engineering/channels/town-square
AXTree (interactive elements on page):
[552] link 'file thumbnail voice1.mp3'
[600] link 'file thumbnail voice2.mp3'
[341] link 'project alpha public channel'
...

## Audio Observation
Transcript from media attachment on this page:
"Hey team, the deployment is scheduled for Friday at 3pm..."

## Task
Listen to the voice message and navigate to the mentioned channel...
```

### Transcription options

By default, audio is transcribed using the OpenAI Whisper API (`OPENAI_API_KEY` required). To use a local Whisper model instead:

```python
from browsergym.core.audio import transcribe_audio

# OpenAI API (default, fast, requires OPENAI_API_KEY)
transcript = transcribe_audio(audio_bytes)

# Local model (no API key needed, but slower and uses more memory)
transcript = transcribe_audio(audio_bytes, use_api=False)
```

## Usage (Python API)

```python
import browsergym.webarena_pro
import gymnasium as gym

# Text-only task
env = gym.make("browsergym/webarena_pro.0")

# Audio-enabled task
env = gym.make("browsergym/webarena_pro.10", enable_audio=True)
obs, info = env.reset()

# obs["audio_segment"]    -> raw audio bytes (for omni models)
# obs["audio_transcript"] -> Whisper transcription (for LLM agents)
```
