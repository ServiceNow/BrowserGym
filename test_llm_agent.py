"""
Test LLM/VLM agent on audio + video tasks.

Modes:
  --mode vlm   : VLM agent — sees raw video frames as images + audio transcript
  --mode llm   : LLM agent — sees VLM-generated frame captions + audio transcript

Usage:
    export OPENAI_API_KEY="sk-..."
    conda activate browsergym-multimodal
    python test_llm_agent.py --task_id 12                  # audio + action
    python test_llm_agent.py --task_id 14 --mode vlm       # video (VLM sees frames)
    python test_llm_agent.py --task_id 14 --mode llm       # video (LLM sees captions)
"""

import argparse
import base64
import io
import re
import time

from openai import OpenAI
from PIL import Image
import playwright.sync_api

from browsergym.core.audio import extract_audio, install_audio_capture, transcribe_audio
from browsergym.core.video import extract_video_frames, describe_video_frames, format_frame_descriptions, frames_to_base64_list
from browsergym.core.observation import _pre_extract, _post_extract, extract_merged_axtree
from browsergym.utils.obs import flatten_axtree_to_str

# Mattermost config
MATTERMOST_URL = "http://localhost:8065"
USERNAME = "admin"
PASSWORD = "Admin@Secure123"

# Task definitions
TASKS = {
    10: {
        "intent": "Listen to the first voice message (audio attachment) in the Town Square channel of the Engineering team. What day and time is the deployment scheduled for?",
        "start_url": f"{MATTERMOST_URL}/engineering/channels/town-square",
        "eval_must_include": ["Friday", "3"],
        "audio_index": 0,
        "type": "audio_comprehension",
    },
    11: {
        "intent": "Listen to the second voice message (audio attachment) in the Town Square channel of the Engineering team. Which project does the sender need help reviewing?",
        "start_url": f"{MATTERMOST_URL}/engineering/channels/town-square",
        "eval_must_include": ["Alpha"],
        "audio_index": 1,
        "type": "audio_comprehension",
    },
    12: {
        "intent": "Listen to the second voice message in the Town Square channel of the Engineering team. The sender is asking for a review. Navigate to the channel that matches the project mentioned in the voice message and post: 'I can review the API changes today.'",
        "start_url": f"{MATTERMOST_URL}/engineering/channels/town-square",
        "eval_must_include": [],
        "audio_index": 1,
        "type": "audio_action",
        "verify_channel": "project-alpha",
        "verify_message": "I can review the API changes today",
    },
    13: {
        "intent": "Listen to the first voice message in the Town Square channel of the Engineering team. Based on what you hear, post a summary of the deadline in the Deployments channel. Format: 'Reminder: [what was said about the deadline]'",
        "start_url": f"{MATTERMOST_URL}/engineering/channels/town-square",
        "eval_must_include": [],
        "audio_index": 0,
        "type": "audio_action",
        "verify_channel": "deployments",
        "verify_message": "Friday",
    },
    14: {
        "intent": "Watch the video posted in the Town Square channel of the Engineering team. What are the two text messages shown in the video?",
        "start_url": f"{MATTERMOST_URL}/engineering/channels/town-square",
        "eval_must_include": ["Project Alpha", "Friday"],
        "audio_index": 2,
        "type": "video_comprehension",
    },
}

client = OpenAI()


def login(page):
    """Log into Mattermost."""
    page.goto(f"{MATTERMOST_URL}/login")
    page.wait_for_timeout(2000)
    if "/landing" in page.url:
        page.get_by_text("View in Browser").click()
        page.wait_for_timeout(3000)
    page.locator("#input_loginId").fill(USERNAME)
    page.locator("#input_password-input").fill(PASSWORD)
    page.locator("#saveSetting").click()
    page.wait_for_timeout(5000)
    print(f"[login] Logged in, URL: {page.url}")


def find_and_play_media(page, index=0):
    """Find file attachments and click the one at the given index to trigger playback."""
    selectors = [
        ".post-image__column",
        ".file-preview__button",
        "[data-testid='fileAttachmentList'] a",
        ".post-image__thumbnail",
    ]

    for selector in selectors:
        elements = page.query_selector_all(selector)
        if elements and len(elements) > index:
            print(f"[media] Found {len(elements)} attachments, clicking index {index}")
            elements[index].click()
            page.wait_for_timeout(3000)

            media_count = page.evaluate(
                "document.querySelectorAll('video, audio').length"
            )
            if media_count > 0:
                page.evaluate("""
                    const el = document.querySelector('video') || document.querySelector('audio');
                    if (el && el.paused) el.play();
                """)
                page.wait_for_timeout(1000)
                print(f"[media] Media is playing")
                return True

    print("[media] Could not find or play media")
    return False


def get_axtree_text(page, max_chars=10000):
    """Extract and flatten the accessibility tree from the page."""
    try:
        _pre_extract(page, tags_to_mark="standard_html", lenient=True)
        axtree = extract_merged_axtree(page)
        _post_extract(page)
        axtree_text = flatten_axtree_to_str(axtree)
        # Truncate if too long
        if len(axtree_text) > max_chars:
            axtree_text = axtree_text[:max_chars] + "\n... (truncated)"
        return axtree_text
    except Exception as e:
        print(f"[warn] AXTree extraction failed: {e}")
        return "(AXTree not available)"


def build_observation_prompt(task_intent, url, axtree_text, audio_transcript, step_info="", video_observation=""):
    """Build the structured observation prompt for the agent."""
    prompt = f"""You are a web browsing agent interacting with a Mattermost chat application.

## Page Observation
URL: {url}
AXTree (interactive elements on page):
{axtree_text}

## Audio Observation
"""
    if audio_transcript:
        prompt += f'Transcript from media attachment on this page:\n"{audio_transcript}"\n'
    else:
        prompt += "No audio captured yet.\n"

    prompt += "\n## Video Observation\n"
    if video_observation:
        prompt += f"{video_observation}\n"
    else:
        prompt += "No video frames captured yet.\n"

    prompt += f"""
## Task
{task_intent}

## Available Actions
Respond with EXACTLY ONE action per turn in a code block. Elements are identified by their bid, which is the numerical number shown in square brackets in the AXTree (e.g., [600] means bid is "600"). Always use the numerical bid, never use filenames or text labels as bid.

click("BID")
fill("BID", "text")
press("BID", "key_comb")
scroll(0, delta_y)
send_msg_to_user("answer")
report_infeasible("reason")

Note: If you click on an audio or video file attachment (e.g., .mp3, .mp4), it will be played and its content will be transcribed to text in the next Audio Observation.

Here are examples of actions with chain-of-thought reasoning:

I see [52] button 'Submit' in the AXTree. I will click it using its bid 52.
```click("52")```

I see [600] link 'file thumbnail voice2.mp3' in the AXTree. To listen to this audio file, I click it using its bid 600.
```click("600")```

I found the information requested by the user, I will send it to the chat.
```send_msg_to_user("The answer is Friday at 3pm.")```

{step_info}
Respond with just the action, nothing else."""
    return prompt


def get_element_info(page, bid):
    """Get text content of an element by bid to determine if it's a media file."""
    try:
        info = page.evaluate(f"""
            (() => {{
                const el = document.querySelector('[bid="{bid}"]');
                if (!el) return null;
                return {{
                    tag: el.tagName.toLowerCase(),
                    text: el.innerText || el.textContent || '',
                    href: el.getAttribute('href') || '',
                    ariaLabel: el.getAttribute('aria-label') || '',
                }};
            }})()
        """)
        return info
    except Exception:
        return None


def is_media_element(info):
    """Check if an element looks like an audio/video file attachment."""
    if info is None:
        return False
    combined = (info.get("text", "") + info.get("href", "") + info.get("ariaLabel", "")).lower()
    return any(ext in combined for ext in [".mp3", ".wav", ".mp4", ".webm", ".ogg", "voice", "audio", "video"])


def try_capture_media_after_click(page, clicked_bid=None):
    """After clicking a media file, capture video frames and/or audio transcript.
    Uses clicked_bid to find the media URL associated with the clicked element.
    Returns (audio_transcript, video_frames)."""
    page.wait_for_timeout(2000)

    has_video = page.evaluate("document.querySelectorAll('video').length") > 0
    has_audio = page.evaluate("document.querySelectorAll('audio').length") > 0

    # If no native media element, find a download link on the page,
    # fetch it with auth cookies, and inject via blob URL.
    # We pass the clicked element's info to prioritize the right file.
    if not has_video and not has_audio:
        # Debug: check what's on the page
        debug = page.evaluate("""
            () => {
                const downloads = document.querySelectorAll('a[download]');
                const modalTitle = document.querySelector('.file-preview-modal__file-name');
                return {
                    download_links: Array.from(downloads).map(a => ({download: a.download, href: (a.href||'').substring(0, 80)})),
                    modal_title: modalTitle ? modalTitle.textContent : null,
                };
            }
        """)
        print(f"[debug] Page state: {debug}")

        injected = page.evaluate("""
            async (targetBid) => {
                // First, check if the modal shows a specific filename
                const modalTitle = document.querySelector('.file-preview-modal__file-name');
                const targetName = modalTitle ? modalTitle.textContent.trim() : '';

                // Find all download links on the page
                const links = document.querySelectorAll('a[download], a[href*="/files/"]');

                // Sort: prefer links matching the target filename
                const sorted = Array.from(links).sort((a, b) => {
                    const aName = a.download || '';
                    const bName = b.download || '';
                    const aMatch = targetName && aName === targetName ? -1 : 0;
                    const bMatch = targetName && bName === targetName ? -1 : 0;
                    return aMatch - bMatch;
                });

                for (const link of sorted) {
                    const href = link.href || '';
                    if (!href) continue;
                    const fileName = link.download || href.split('/').pop().split('?')[0];
                    const isVideo = /\\.(mp4|webm|mov|avi|mkv)$/i.test(fileName);
                    const isAudio = /\\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(fileName);

                    if (isVideo || isAudio) {
                        try {
                            const fetchUrl = href.replace(/[?&]download=1/, '');
                            const resp = await fetch(fetchUrl, {credentials: 'include'});
                            if (!resp.ok) continue;
                            const arrayBuf = await resp.arrayBuffer();

                            let mimeType = isVideo ? 'video/mp4' : 'audio/mpeg';
                            if (fileName.endsWith('.webm')) mimeType = isVideo ? 'video/webm' : 'audio/webm';
                            else if (fileName.endsWith('.wav')) mimeType = 'audio/wav';
                            else if (fileName.endsWith('.ogg')) mimeType = isVideo ? 'video/ogg' : 'audio/ogg';

                            const blob = new Blob([arrayBuf], {type: mimeType});
                            const blobUrl = URL.createObjectURL(blob);

                            const tag = isVideo ? 'video' : 'audio';
                            const mediaEl = document.createElement(tag);
                            mediaEl.src = blobUrl;
                            mediaEl.preload = 'auto';
                            if (isVideo) {
                                mediaEl.style.cssText = 'position:fixed;top:0;left:0;width:640px;height:360px;z-index:-1';
                            }
                            document.body.appendChild(mediaEl);

                            const loadResult = await new Promise((resolve) => {
                                mediaEl.onloadeddata = () => resolve('loaded');
                                mediaEl.onerror = () => resolve('error:' + (mediaEl.error ? mediaEl.error.message : 'unknown'));
                                setTimeout(() => resolve('timeout:readyState=' + mediaEl.readyState), 15000);
                            });

                            return {
                                type: tag,
                                src: fetchUrl.substring(0, 100),
                                readyState: mediaEl.readyState,
                                duration: mediaEl.duration,
                                loadResult: loadResult,
                                blobSize: arrayBuf.byteLength,
                                mimeType: mimeType,
                            };
                        } catch(e) {
                            continue;
                        }
                    }
                }
                return null;
            }
        """, clicked_bid)
        print(f"[debug] Inject result: {injected}")
        if injected and injected.get('readyState', 0) >= 2:
            print(f"[media] Loaded {injected['type']} via blob URL ({injected.get('duration', 0):.1f}s)")
            has_video = injected['type'] == 'video'
            has_audio = injected['type'] == 'audio'
        elif injected:
            print(f"[media] Injected but failed to load (readyState={injected.get('readyState')})")
            return None, None
        else:
            return None, None

    # Extract video frames FIRST (before audio capture, which changes video state)
    frames = None
    if has_video:
        frames = extract_video_frames(page, num_frames=10)
        if frames:
            print(f"[video] Extracted {len(frames)} frames")
        else:
            print("[video] Frame extraction returned nothing")

    # Now capture audio — play the media first
    try:
        page.evaluate("""
            const el = document.querySelector('video') || document.querySelector('audio');
            if (el) { el.currentTime = 0; el.play(); }
        """)
        page.wait_for_timeout(1000)
    except Exception as e:
        print(f"[media] Play failed: {e}")

    install_audio_capture(page)
    audio_bytes = extract_audio(page, duration=8.0)
    transcript = None
    if audio_bytes and len(audio_bytes) > 100:
        transcript = transcribe_audio(audio_bytes)
        print(f"[audio] Transcribed: \"{transcript}\"")

    # Clean up: stop playback and remove media elements to free memory
    page.evaluate("""
        document.querySelectorAll('video, audio').forEach(el => {
            el.pause();
            el.removeAttribute('src');
            el.load();
            el.remove();
        });
    """)
    page.keyboard.press("Escape")
    page.wait_for_timeout(1000)

    return transcript, frames


def click_by_bid(page, bid):
    """Click an element by its bid attribute."""
    el = page.locator(f"[bid='{bid}']")
    el.click(timeout=5000)
    page.wait_for_timeout(2000)


def parse_and_execute_action(page, action_text):
    """Parse the agent's action and execute it in the browser.
    Returns (action_type, result, transcript_or_none)."""
    action_text = action_text.strip()
    print(f"[agent] Action: {action_text}")

    # Extract action from code block if present (```action```)
    code_match = re.search(r"```(.+?)```", action_text, re.DOTALL)
    if code_match:
        action_text = code_match.group(1).strip()

    # send_msg_to_user('...')
    match = re.search(r'send_msg_to_user\(["\'](.+?)["\']\)', action_text, re.DOTALL)
    if match:
        return "answer", match.group(1), None

    # answer('...') — also accept this form
    match = re.search(r'answer\(["\'](.+?)["\']\)', action_text, re.DOTALL)
    if match:
        return "answer", match.group(1), None

    # report_infeasible('...')
    match = re.search(r'report_infeasible\(["\'](.+?)["\']\)', action_text, re.DOTALL)
    if match:
        return "done", None, None

    # fill('BID', 'text')
    match = re.search(r"fill\(['\"](.+?)['\"],\s*['\"](.+?)['\"]\)", action_text, re.DOTALL)
    if match:
        bid, text = match.group(1), match.group(2)
        try:
            el = page.locator(f"[bid='{bid}']")
            el.fill(text, timeout=5000)
            page.wait_for_timeout(500)
            return "fill", f"bid={bid} with '{text}'", None
        except Exception as e:
            print(f"[action] Fill failed for bid={bid}: {e}")
            return "error", str(e), None

    # press('BID', 'KEY')
    match = re.search(r"press\(['\"](.+?)['\"],\s*['\"](.+?)['\"]\)", action_text)
    if match:
        bid, key = match.group(1), match.group(2)
        try:
            el = page.locator(f"[bid='{bid}']")
            el.press(key, timeout=5000)
            page.wait_for_timeout(1000)
            return "press", f"bid={bid} key={key}", None
        except Exception as e:
            print(f"[action] Press failed for bid={bid}: {e}")
            return "error", str(e), None

    # click('BID')
    match = re.search(r"click\(['\"](.+?)['\"]\)", action_text)
    if match:
        bid = match.group(1)

        # Check if it's a media element before clicking
        info = get_element_info(page, bid)
        is_media = is_media_element(info)

        try:
            click_by_bid(page, bid)
        except Exception as e:
            print(f"[action] Click failed for bid={bid}: {e}")
            return "error", str(e), None

        # If it's a media file, capture audio and/or video frames
        media_result = None
        if is_media:
            print(f"[media] Detected media click on bid={bid}, capturing media...")
            transcript, video_frames = try_capture_media_after_click(page, clicked_bid=bid)
            media_result = {"transcript": transcript, "video_frames": video_frames}

        return "click", f"bid={bid}", media_result

    # scroll(x, y)
    match = re.search(r"scroll\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)", action_text)
    if match:
        dx, dy = int(match.group(1)), int(match.group(2))
        page.mouse.wheel(dx, dy * 100)
        page.wait_for_timeout(1000)
        return "scroll", None, None

    print(f"[action] Could not parse: {action_text}")
    return "unknown", None, None

    # type_and_enter('selector', 'text')
    match = re.search(r"type_and_enter\(['\"](.+?)['\"],\s*['\"](.+?)['\"]\)", action_text, re.DOTALL)

    if match:
        selector, text = match.group(1), match.group(2)
        try:
            el = page.get_by_placeholder(selector).first
            el.click()
            el.fill(text)
            el.press("Enter")
            page.wait_for_timeout(2000)
            return "type", text, None
        except Exception:
            try:
                input_el = page.locator("#post_textbox, [data-testid='post_textbox'], textarea.post-body__cell")
                input_el.first.click()
                input_el.first.fill(text)
                input_el.first.press("Enter")
                page.wait_for_timeout(2000)
                return "type", text, None
            except Exception as e:
                print(f"[action] Type failed: {e}")
                return "error", str(e), None

    # scroll
    if "scroll" in action_text.lower():
        direction = 300 if "down" in action_text.lower() else -300
        page.mouse.wheel(0, direction)
        page.wait_for_timeout(1000)
        return "scroll", None, None

    print(f"[action] Could not parse: {action_text}")
    return "unknown", None, None


def verify_action_task(page, task):
    """Verify that an action task was completed correctly."""
    verify_channel = task.get("verify_channel", "")
    verify_message = task.get("verify_message", "")

    # Check if we're in the right channel
    current_url = page.url
    in_correct_channel = verify_channel.lower() in current_url.lower()

    # Check if the message was posted (look in page content)
    page_text = page.inner_text("body")
    message_posted = verify_message.lower() in page_text.lower()

    return in_correct_channel, message_posted


def run_agent(task_id: int, model: str = "gpt-4o", mode: str = "vlm", max_steps: int = 10):
    """Run the agent on a task.

    mode='vlm': agent sees raw video frames as images
    mode='llm': agent sees VLM-generated frame captions as text
    """
    task = TASKS[task_id]
    print(f"\n{'='*60}")
    print(f"Task {task_id}: {task['intent']}")
    print(f"Type: {task['type']}")
    print(f"Mode: {mode.upper()}")
    print(f"Model: {model}")
    print(f"{'='*60}\n")

    with playwright.sync_api.sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        try:
            # Login and navigate
            login(page)
            page.goto(task["start_url"])
            page.wait_for_timeout(3000)
            print(f"[nav] At {page.url}\n")

            # --- Agent loop ---
            print(f"\n--- Agent loop (max {max_steps} steps) ---")
            final_answer = None
            audio_transcript = ""
            video_frames = None
            video_description_text = ""

            # Keep conversation history so agent remembers what it already tried
            conversation = []

            for step in range(max_steps):
                print(f"\n--- Step {step + 1} ---")

                # Get observations (with crash recovery)
                axtree_text = get_axtree_text(page)

                try:
                    screenshot_bytes = page.screenshot()
                    screenshot_b64 = base64.b64encode(screenshot_bytes).decode()
                except Exception as e:
                    print(f"[warn] Screenshot failed: {e}")
                    screenshot_b64 = None

                step_info = ""
                if audio_transcript and task["type"] == "audio_comprehension":
                    step_info = "You have the audio transcript. Use send_msg_to_user() to give your response."
                if (video_frames or video_description_text) and task["type"] == "video_comprehension":
                    step_info = "You have the video observation. Use send_msg_to_user() to give your response."

                # Build prompt with video observation
                video_obs_text = ""
                if video_description_text:
                    video_obs_text = video_description_text
                elif video_frames and mode == "vlm":
                    video_obs_text = f"({len(video_frames)} video frames attached as images below)"

                prompt = build_observation_prompt(
                    task["intent"], page.url, axtree_text, audio_transcript, step_info,
                    video_observation=video_obs_text,
                )

                # Build message content
                content = [{"type": "text", "text": prompt}]

                # Add screenshot
                if screenshot_b64:
                    content.append({
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{screenshot_b64}", "detail": "low"},
                    })

                # VLM mode: attach raw video frames as images
                if video_frames and mode == "vlm":
                    for i, frame in enumerate(video_frames):
                        content.append({
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{frame['base64']}",
                                "detail": "high",
                            },
                        })

                conversation.append({"role": "user", "content": content})

                # Call model
                print(f"[llm] Calling {model}...")
                response = client.chat.completions.create(
                    model=model,
                    messages=conversation,
                    max_completion_tokens=4096,
                    temperature=1.0,
                )
                action_text = response.choices[0].message.content.strip()

                # Add agent response to history
                conversation.append({"role": "assistant", "content": action_text})

                # Execute action
                action_type, action_result, media_result = parse_and_execute_action(page, action_text)

                # If a media file was clicked, update audio/video observations
                if media_result:
                    if media_result.get("transcript"):
                        audio_transcript = media_result["transcript"]
                    if media_result.get("video_frames"):
                        video_frames = media_result["video_frames"]
                        if mode == "llm":
                            # LLM mode: caption the frames using VLM as tool
                            print(f"[video] Generating frame descriptions for LLM agent...")
                            described = describe_video_frames(
                                video_frames, task_hint=task["intent"]
                            )
                            video_description_text = format_frame_descriptions(described)
                            print(f"[video] Descriptions:\n{video_description_text}")

                # Add execution feedback to history
                if action_type == "error":
                    conversation.append({
                        "role": "user",
                        "content": f"Action failed: {action_result}. Try a different approach."
                    })
                elif action_type == "click":
                    feedback = f"Clicked '{action_result}'. Page URL is now: {page.url}"
                    if media_result and media_result.get("transcript"):
                        feedback += f"\nAudio transcription from this file: \"{media_result['transcript']}\""
                    if media_result and media_result.get("video_frames"):
                        if mode == "llm":
                            feedback += f"\nVideo frame descriptions:\n{video_description_text}"
                        else:
                            feedback += f"\nVideo frames extracted ({len(video_frames)} frames). They will appear in the next observation."
                    conversation.append({"role": "user", "content": feedback})
                elif action_type == "navigate":
                    conversation.append({
                        "role": "user",
                        "content": f"Navigated to {action_result}. Page URL is now: {page.url}"
                    })
                elif action_type == "fill":
                    conversation.append({
                        "role": "user",
                        "content": f"Filled {action_result}. Page URL is now: {page.url}"
                    })

                if action_type == "answer":
                    final_answer = action_result
                    print(f"[agent] Final answer: {final_answer}")
                    break
                elif action_type == "done":
                    print("[agent] Agent signaled done")
                    break

            # --- Phase 3: Evaluate ---
            print(f"\n{'='*60}")
            print(f"Task type: {task['type']}")

            if task["type"] in ("audio_comprehension", "video_comprehension"):
                if final_answer:
                    must_include = task.get("eval_must_include", [])
                    passed = all(ref.lower() in final_answer.lower() for ref in must_include)
                    print(f"Answer: {final_answer}")
                    print(f"Must include: {must_include}")
                    print(f"Result: {'PASS' if passed else 'FAIL'}")
                else:
                    print("No answer given.")
                    print("Result: FAIL")
            elif task["type"] == "audio_action":
                in_channel, msg_posted = verify_action_task(page, task)
                print(f"In correct channel ({task['verify_channel']}): {in_channel}")
                print(f"Message posted ('{task['verify_message']}'): {msg_posted}")
                print(f"Result: {'PASS' if (in_channel and msg_posted) else 'FAIL'}")

            print(f"Mode: {mode.upper()}")
            print(f"Audio transcript available: {bool(audio_transcript)}")
            print(f"Video frames captured: {len(video_frames) if video_frames else 0}")
            print(f"{'='*60}")

        except Exception as e:
            print(f"\n[ERROR] {e}")
            import traceback
            traceback.print_exc()
        finally:
            browser.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--task_id", type=int, default=10, choices=list(TASKS.keys()))
    parser.add_argument("--model", type=str, default="gpt-5-mini", help="OpenAI model name")
    parser.add_argument("--mode", type=str, default="vlm", choices=["vlm", "llm"],
                        help="vlm = raw frames as images, llm = VLM-captioned frame descriptions")
    parser.add_argument("--max_steps", type=int, default=10)
    args = parser.parse_args()
    run_agent(args.task_id, model=args.model, mode=args.mode, max_steps=args.max_steps)
