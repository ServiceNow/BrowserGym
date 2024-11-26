import json
import logging
import numpy as np
import playwright.sync_api
import importlib.resources
import tempfile

from typing import Optional, Tuple

from browsergym.core.task import AbstractBrowserTask

from .instance import WebCanvasInstance

logger = logging.getLogger(__name__)


class GenericWebCanvasTask(AbstractBrowserTask):
    """
    Base class for all WebCanvas tasks.
    """

    def __init__(
        self,
        seed: int,
        task_id: Optional[int] = None,
    ) -> None:
        super().__init__(seed)

        # task properties, will be used to set up the browsergym environment
        self.viewport = {"width": 1280, "height": 720}
        self.slow_mo = 1000  # ms
        self.timeout = 10000  # ms
        self.WebCanvas_instance = WebCanvasInstance()
        self.config_file: str = None
        self.start_url: str = "https://www.google.com/"
        self.step_score_rate: str = None
        self.match_result: str = None
        self.task_finish: bool = False
        self.activate_element = None

        if task_id is None:
            raise ValueError(
                f"One and only one of 'task_id' must be provided (task_id={task_id})."
            )

        # read the list of all WebCanvas task configs
        import browsergym.webcanvas as wcs
        all_configs_str = importlib.resources.files(wcs).joinpath(
            "data/mind2web-live-train_130.json").read_text()
        all_task_configs = json.loads(all_configs_str)
        all_task = WebCanvasInstance.read_task_configs(all_task_configs)
        if task_id is not None and task_id < len(all_task):
            task_configs = all_task[task_id]
        else:
            raise ValueError(
                f"Could not find any task config with task_id={task_id}."
            )

        self.task_configs = task_configs
        self.trace_info = []
        self.time_step = 0

    @classmethod
    def get_task_id(cls):
        """
        Generic class for several task ids, this way of obtaining the task id is not compatible for now.
        """
        raise NotImplementedError

    def setup(self, page: playwright.sync_api.Page, start_url: str = None) -> tuple[str, dict]:
        self.goal, _, _, reference_evaluate_steps = self.task_configs
        self.evaluaion_step = reference_evaluate_steps
        self.reference_evaluate_steps = reference_evaluate_steps
        start_url = start_url if start_url else self.start_url
        page.goto(start_url, timeout=10000)
        self._init_task_events()
        return self.goal, {}

    def teardown(self) -> None:
        pass

    @property
    def evaluate_result(self):
        return self.trace_info[-1]

    @property
    def webcanvas(self):
        return True

    def validate(
        self,
        page: playwright.sync_api.Page,
        chat_messages: list[str],
        action: str = ""
    ) -> Tuple[float, bool, str, dict]:
        reward, done, msg, info = 0, False, "", {}

        for message in chat_messages:
            if message["role"] == "user" and message["message"] == "exit":
                done = True
                break

        self.time_step += 1
        step_action_info = {}
        step_action_info["time_step"] = self.time_step
        step_action_info["evaluation"] = []

        actions = WebCanvasInstance.parse_bid_from_action(action)
        # if len(actions) > 0:
        #     for action_type, bid, target_value in actions:
        #         locator = None
        #         # if bid != '':
        #         #     try:
        #         #         locator = self.get_element_by_bid(page, bid)
        #         #     except Exception as e:
        #         #         logger.warning(f"warning:{e}")
        #         #         locator = None
        #         self.evaluaion_step, self.step_score_rate, self.match_result, self.task_finished = WebCanvasInstance.evaluate(
        #             page, locator, target_value, self.evaluaion_step, self.reference_evaluate_steps)

        #         step_action_info["evaluation"].append(
        #             {
        #                 "action_type": action_type,
        #                 "bid": bid,
        #                 "target_value": target_value,
        #                 "step_score_rate": self.step_score_rate,
        #                 "match_result": self.match_result,
        #                 "task_status": self.task_finished
        #             }
        #         )

        #         if self.task_finished:
        #             done = True
        #             break
        if len(actions) > 0:
            for action_type, bid, target_value in actions:
                self.evaluaion_step, self.step_score_rate, self.match_result, self.task_finished = WebCanvasInstance.evaluate_events(
                    page, self.evaluaion_step, self.task_events, target_value, self.reference_evaluate_steps)

                step_action_info["evaluation"].append(
                    {
                        "action_type": action_type,
                        "bid": bid,
                        "target_value": target_value,
                        "step_score_rate": self.step_score_rate,
                        "match_result": self.match_result,
                        "task_status": self.task_finished
                    }
                )
                if self.task_finished:
                    done = True
                    break
        self.trace_info.append(step_action_info)
        return reward, done, msg, info

    # https://github.com/ServiceNow/BrowserGym/blob/main/browsergym/core/src/browsergym/core/action/utils.py
    def get_element_by_bid(
        self, page: playwright.sync_api.Page, bid: str, scroll_into_view: bool = False
    ) -> playwright.sync_api.Locator:
        """
        Parse the given bid to sequentially locate every nested frame leading to the bid, then
        locate the bid element. Bids are expected to take the form "abb123", which means
        the element abb123 is located inside frame abb, which is located inside frame ab, which is
        located inside frame a, which is located inside the page's main frame.
        Args:
            bid: the browsergym id (playwright testid) of the page element.
            scroll_into_view: try to scroll element into view, unless it is completely visible.

        Returns:
            Playwright element.
            Bounding box of the element.
        """
        if not isinstance(bid, str):
            raise ValueError(f"expected a string, got {repr(bid)}")

        current_frame = page

        # dive into each nested frame, to the frame where the element is located
        i = 0
        while bid[i:] and not bid[i:].isnumeric():
            i += 1
            frame_bid = bid[:i]  # bid of the next frame to select
            frame_elem = current_frame.get_by_test_id(frame_bid)
            if not frame_elem.count():
                raise ValueError(f'Could not find element with bid "{bid}"')
            if scroll_into_view:
                frame_elem.scroll_into_view_if_needed(timeout=500)
            current_frame = frame_elem.frame_locator(":scope")

        # finally, we should have selected the frame where the target element is
        elem = current_frame.get_by_test_id(bid)
        if not elem.count():
            raise ValueError(f'Could not find element with bid "{bid}"')
        if scroll_into_view:
            elem.scroll_into_view_if_needed(timeout=500)
        return elem

    @property
    def events(self):
        return self.task_events

    def _init_task_events(self):
        self.task_events = []
        for evaluation_step in self.reference_evaluate_steps:
            event = {}
            if evaluation_step["match_function"] in ["element_path_exactly_match", "element_path_included_match"]:
                event["selector"] = evaluation_step['reference_answer']
                event["target_value"] = ""
                event["reference_value"] = ""
                event["status"] = False
            elif evaluation_step["match_function"] in ["element_value_exactly_match", "element_value_semantic_match"]:
                event["selector"] = evaluation_step.get('path')
                event["target_value"] = ""
                event["reference_value"] = evaluation_step['reference_answer']
                event["status"] = False
            self.task_events.append(event)

    def update_events(self, agent_event):
        for ix, event in enumerate(agent_event):
            if event and event['status']:
                self.task_events[ix]["status"] = event['status']
                self.task_events[ix]["target_value"] = event['target_value']
