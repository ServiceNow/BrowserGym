"""
Test script for audio capture on Mattermost.

Tests both:
1. LLM agent path: capture audio → Whisper transcription → text
2. Omni model path: capture audio → raw bytes → base64 for API
"""

import time
import playwright.sync_api
from browsergym.core.audio import (
    extract_audio,
    install_audio_capture,
    transcribe_audio,
    audio_bytes_to_base64,
)

MATTERMOST_URL = "http://localhost:8065"
USERNAME = "admin"
PASSWORD = "Admin@Secure123"


def login(page):
    """Log into Mattermost."""
    page.goto(f"{MATTERMOST_URL}/login")
    page.wait_for_timeout(2000)
    # Handle landing page if shown
    if "/landing" in page.url:
        page.get_by_text("View in Browser").click()
        page.wait_for_timeout(3000)
    page.locator("#input_loginId").fill(USERNAME)
    page.locator("#input_password-input").fill(PASSWORD)
    page.locator("#saveSetting").click()
    page.wait_for_timeout(5000)
    print(f"[OK] Logged in as {USERNAME}, URL: {page.url}")


def navigate_to_town_square(page):
    """Navigate to Engineering > Town Square."""
    page.goto(f"{MATTERMOST_URL}/engineering/channels/town-square")
    page.wait_for_timeout(3000)
    print(f"[OK] Navigated to Town Square")


def find_and_play_audio(page):
    """Find an audio/video attachment and click play."""
    # Look for audio or video elements, or file preview links
    # Mattermost renders video inline with <video> tags
    # Audio files may need to be clicked to play

    # First check if there's already a video element
    video_count = page.evaluate("document.querySelectorAll('video').length")
    audio_count = page.evaluate("document.querySelectorAll('audio').length")
    print(f"[INFO] Found {video_count} video elements, {audio_count} audio elements")

    if video_count > 0:
        # Click play on the first video
        page.evaluate("""
            const v = document.querySelector('video');
            v.play();
        """)
        print("[OK] Started playing video")
        return True

    if audio_count > 0:
        page.evaluate("""
            const a = document.querySelector('audio');
            a.play();
        """)
        print("[OK] Started playing audio")
        return True

    # Try clicking on audio file attachments to trigger playback
    # Mattermost shows file previews — clicking might open a player
    file_links = page.query_selector_all(".post-image__column, .file-preview, a[href*='files']")
    print(f"[INFO] Found {len(file_links)} file attachment elements")

    for link in file_links:
        text = link.inner_text() if link.inner_text() else ""
        href = link.get_attribute("href") or ""
        if any(ext in text.lower() + href.lower() for ext in [".mp3", ".wav", ".mp4", ".webm", "audio", "video"]):
            print(f"[INFO] Clicking file attachment: {text[:50]}")
            link.click()
            page.wait_for_timeout(2000)

            # Check again for media elements
            video_count = page.evaluate("document.querySelectorAll('video').length")
            audio_count = page.evaluate("document.querySelectorAll('audio').length")
            print(f"[INFO] After click: {video_count} video, {audio_count} audio elements")

            if video_count > 0 or audio_count > 0:
                page.evaluate("""
                    const el = document.querySelector('video') || document.querySelector('audio');
                    if (el) el.play();
                """)
                print("[OK] Started playing media after click")
                return True

    print("[WARN] Could not find or play any media")
    return False


def test_audio_capture(page):
    """Test the audio capture pipeline."""
    print("\n=== Testing Audio Capture ===\n")

    # Install capture scripts
    install_audio_capture(page)
    print("[OK] Audio capture scripts installed")

    # Try to play media
    if not find_and_play_audio(page):
        print("[SKIP] No playable media found, checking page content...")
        # Print some page info for debugging
        title = page.title()
        url = page.url
        print(f"  Page: {title} ({url})")
        return

    # Wait a moment for playback to start
    time.sleep(1)

    # Capture audio (5 seconds)
    print("\n--- Capturing audio (5 seconds) ---")
    audio_bytes = extract_audio(page, duration=5.0)

    if audio_bytes is None:
        print("[FAIL] No audio captured")
        # Debug: check what media elements exist
        debug = page.evaluate("""
            (() => {
                const videos = document.querySelectorAll('video');
                const audios = document.querySelectorAll('audio');
                return {
                    videos: Array.from(videos).map(v => ({
                        src: v.src || v.currentSrc,
                        paused: v.paused,
                        readyState: v.readyState,
                        muted: v.muted,
                    })),
                    audios: Array.from(audios).map(a => ({
                        src: a.src || a.currentSrc,
                        paused: a.paused,
                        readyState: a.readyState,
                        muted: a.muted,
                    })),
                };
            })()
        """)
        print(f"  Debug media state: {debug}")
        return

    print(f"[OK] Captured {len(audio_bytes)} bytes of audio")

    # === Test 1: LLM Agent Path (Whisper transcription) ===
    print("\n--- Test 1: LLM Agent Path (Whisper) ---")
    try:
        transcript = transcribe_audio(audio_bytes)
        if transcript:
            print(f"[OK] Transcript: \"{transcript}\"")
        else:
            print("[WARN] Whisper returned empty transcript")
    except Exception as e:
        print(f"[FAIL] Whisper failed: {e}")

    # === Test 2: Omni Model Path (raw audio bytes) ===
    print("\n--- Test 2: Omni Model Path (raw bytes) ---")
    b64 = audio_bytes_to_base64(audio_bytes)
    if b64:
        print(f"[OK] Audio base64 ready ({len(b64)} chars)")
        print(f"     This would be sent to an omni model API as audio input")
        # Example of what you'd send to GPT-4o or Gemini:
        # message = {
        #     "role": "user",
        #     "content": [
        #         {"type": "text", "text": "What is being said in this audio?"},
        #         {"type": "input_audio", "input_audio": {"data": b64, "format": "webm"}},
        #     ]
        # }
    else:
        print("[FAIL] Could not encode audio to base64")


def main():
    with playwright.sync_api.sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            login(page)
            navigate_to_town_square(page)
            test_audio_capture(page)
        except Exception as e:
            print(f"\n[ERROR] {e}")
            import traceback
            traceback.print_exc()
        finally:
            browser.close()


if __name__ == "__main__":
    main()
