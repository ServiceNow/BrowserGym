from importlib import resources
from typing import Dict, List, Optional

from queue import Queue, Empty
import playwright.sync_api
from pydantic import BaseModel, Field
import logging
import json
from . import _get_global_playwright, hint_labeling_files

logger = logging.getLogger(__name__)

HINT_LABELING_DIR = resources.files(hint_labeling_files)

# ------- Data Classes -------


class HintLabelingInputs(BaseModel):
    goal: str
    error_feedback: str = ""
    screenshot: str  # base64 screenshot
    axtree: str
    history: List[Dict[str, str]] = Field(default_factory=list)
    hint: str = ""
    # keep 'suggestions' on Python side, but we’ll map to UI 'suggestions'
    suggestions: List[Dict[str, str]] = Field(default_factory=list)


# ------- Hint Labeling backend class -------


class HintLabeling:
    def __init__(self, headless: bool, window_size=(600, 1000), *args, **kwargs):

        pw: playwright.sync_api.Playwright = _get_global_playwright()
        self.browser = pw.chromium.launch(
            headless=headless, args=[f"--window-size={window_size[0]},{window_size[1]}"]
        )
        self.context = self.browser.new_context(
            no_viewport=True,
        )
        self.page = self.context.new_page()
        self._resp_queue: "Queue[dict]" = Queue()

        self.page.route("**/api/reprompt", self._route_reprompt)
        self.page.route("**/api/submit", self._route_submit)
        self.page.set_content(get_hint_labeling_ui(HINT_LABELING_DIR))

        # internal state
        self._context: HintLabelingInputs = None
        self._running = False

    def _route_reprompt(
        self, route: playwright.sync_api.Route, request: playwright.sync_api.Request
    ):
        logger.info("Route hit: %s %s", request.method, request.url)
        try:
            body = json.loads(request.post_data() or "{}")
        except Exception:
            body = {}
        # enqueue output 1 (reprompt)
        msg = {"type": "reprompt", "payload": {"hint": body.get("hint", "")}}
        self._resp_queue.put(msg)
        # Respond something minimal so UI doesn’t break; it will be refreshed by a later update_context()
        route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps({"suggestions": []}),
        )

    def _route_submit(self, route: playwright.sync_api.Route, request: playwright.sync_api.Request):
        logger.info("Route hit: %s %s", request.method, request.url)
        try:
            body = json.loads(request.post_data() or "{}")
        except Exception:
            body = {}
        # Map UI payload -> your step shape
        msg = {
            "type": "step",
            "payload": {
                "think": body.get("think", ""),
                "action": body.get("action", ""),
            },
        }
        self._resp_queue.put(msg)
        # UI expects 200 JSON; we can optionally send new suggestions here too.
        route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps({"suggestions": []}),
        )

    def _to_ui_bootstrap(self, ctx: HintLabelingInputs) -> dict:
        return {
            "goal": ctx.goal,
            "error_feedback": ctx.error_feedback,
            "screenshot": ctx.screenshot,
            "axtree": ctx.axtree,
            "history": ctx.history,
            "hint": ctx.hint,
            "suggestions": ctx.suggestions,
        }

    def update_context(self, context: HintLabelingInputs):
        self._context = context
        ui_payload = self._to_ui_bootstrap(context)
        # call JS function with arg (no string concat)
        self.page.evaluate("(d) => updateContext(d)", ui_payload)

    def wait_for_response(self, timeout: Optional[float] = 600) -> dict:
        """
        Wait until the page makes a request to /api/reprompt or /api/submit,
        then parse the request body and return it in your schema.
        """
        logger.info("Waiting for response from Hint Labeling UI...")

        def is_api(req: playwright.sync_api.Request) -> bool:
            u = req.url
            return (
                u.endswith("/api/reprompt") or u.endswith("/api/submit")
            ) and req.method == "POST"

        # This pumps Playwright internally; no busy waiting.
        with self.page.expect_request(
            is_api, timeout=(timeout * 1000 if timeout else 0)
        ) as req_info:
            req = req_info.value

        body_text = req.post_data or "{}"
        try:
            body = json.loads(body_text)
        except Exception as e:
            print("JSON parse error:", e)
            body = {}

        if req.url.endswith("/api/reprompt"):
            msg = {"type": "reprompt", "payload": {"hint": body.get("hint", "")}}
        else:
            msg = {
                "type": "step",
                "payload": {"think": body.get("think", ""), "action": body.get("action", "")},
            }

        logger.info("Response received: %s", msg)
        return msg

    def close(self):
        self.context.close()
        self.browser.close()


def get_hint_labeling_ui(hint_labeling_dir) -> str:
    with open(hint_labeling_dir / "hint_labeling_ui.html", "r") as file:
        hint_labeling_html = file.read()
    return hint_labeling_html
