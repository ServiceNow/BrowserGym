"""
Test LLM agent on audio + browser action tasks using GPT-4o.

Tests cross-modality tasks: agent must understand audio AND interact with the page.

Usage:
    export OPENAI_API_KEY="sk-..."
    conda activate browsergym-multimodal
    python test_llm_agent.py --task_id 10
    python test_llm_agent.py --task_id 12   # audio + browser action
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
        "type": "audio_comprehension",
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


def build_observation_prompt(task_intent, url, axtree_text, audio_transcript, step_info=""):
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


def try_capture_audio_after_click(page):
    """After clicking a media file, try to play it and capture audio."""
    page.wait_for_timeout(2000)

    media_count = page.evaluate(
        "document.querySelectorAll('video, audio').length"
    )
    if media_count == 0:
        return None

    page.evaluate("""
        const el = document.querySelector('video') || document.querySelector('audio');
        if (el && el.paused) el.play();
    """)
    page.wait_for_timeout(1000)

    install_audio_capture(page)
    audio_bytes = extract_audio(page, duration=8.0)

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

    if audio_bytes and len(audio_bytes) > 100:
        transcript = transcribe_audio(audio_bytes)
        print(f"[audio] Transcribed: \"{transcript}\"")
        return transcript
    return None


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

        # If it's a media file, capture audio
        transcript = None
        if is_media:
            print(f"[media] Detected media click on bid={bid}, capturing audio...")
            transcript = try_capture_audio_after_click(page)

        return "click", f"bid={bid}", transcript

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


def run_agent(task_id: int, model: str = "gpt-4o", max_steps: int = 10):
    """Run the LLM agent on a task."""
    task = TASKS[task_id]
    print(f"\n{'='*60}")
    print(f"Task {task_id}: {task['intent']}")
    print(f"Type: {task['type']}")
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

                # Build prompt
                prompt = build_observation_prompt(
                    task["intent"], page.url, axtree_text, audio_transcript, step_info
                )

                # Add current observation — include screenshot only if available
                if screenshot_b64:
                    conversation.append({
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {"url": f"data:image/jpeg;base64,{screenshot_b64}", "detail": "low"},
                            },
                        ],
                    })
                else:
                    conversation.append({
                        "role": "user",
                        "content": prompt,
                    })

                # Call GPT-4o with full conversation history
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
                action_type, action_result, new_transcript = parse_and_execute_action(page, action_text)

                # If a media file was clicked, update the audio transcript
                if new_transcript:
                    audio_transcript = new_transcript

                # Add execution feedback to history
                if action_type == "error":
                    conversation.append({
                        "role": "user",
                        "content": f"Action failed: {action_result}. Try a different approach."
                    })
                elif action_type == "click":
                    feedback = f"Clicked '{action_result}'. Page URL is now: {page.url}"
                    if new_transcript:
                        feedback += f"\nAudio transcription from this file: \"{new_transcript}\""
                    conversation.append({"role": "user", "content": feedback})
                elif action_type == "navigate":
                    conversation.append({
                        "role": "user",
                        "content": f"Navigated to {action_result}. Page URL is now: {page.url}"
                    })
                elif action_type == "type":
                    conversation.append({
                        "role": "user",
                        "content": f"Typed and sent: '{action_result}'. Page URL is now: {page.url}"
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

            if task["type"] == "audio_comprehension":
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

            print(f"Audio transcript available: {bool(audio_transcript)}")
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
    parser.add_argument("--max_steps", type=int, default=10)
    args = parser.parse_args()
    run_agent(args.task_id, model=args.model, max_steps=args.max_steps)
