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
        self.current_event = {
            "selector": None,
            "status": True,
            "target_value": None,
            "event_type": None
        }
        self.event_page = None  # Store the page where the event occurred

        if task_id is None:
            raise ValueError(
                f"One and only one of 'task_id' must be provided (task_id={task_id})."
            )

        # read the list of all WebCanvas task configs
        import browsergym.webcanvas as wcs
        all_configs_str = importlib.resources.files(wcs).joinpath(
            "data/mind2web-live_test_20241024.json").read_text()
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
        # Save the page reference
        self.page = page
        
        # Ensure event listeners are set up
        self._ensure_event_listeners(page)

        # Initialize task configuration
        self.goal, _, _, reference_evaluate_steps = self.task_configs
        self.evaluation_step = reference_evaluate_steps
        self.reference_evaluate_steps = reference_evaluate_steps
        
        # Navigate to start URL
        start_url = start_url if start_url else self.start_url
        page.goto(start_url, timeout=30000)
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
        action: dict,
    ) -> Tuple[float, bool, Optional[str], dict]:

        self._ensure_event_listeners(page)
        
        reward, done, msg, info = 0, False, "", {}

        for message in chat_messages:
            if message["role"] == "user" and message["message"] == "exit":
                done = True
                break

        self.time_step += 1
        step_action_info = {}
        step_action_info["time_step"] = self.time_step
        step_action_info["evaluation"] = []

        # Use event_page for evaluation if available, otherwise use current page
        evaluation_page = self.event_page if self.event_page else page

        # Check if selector can be located
        can_locate = self._can_locate_selector(evaluation_page, self.current_event["selector"])
        logger.info(f"Selector '{self.current_event['selector']}' can{'' if can_locate else 'not'} be located on page")
        
        self.evaluation_step, self.step_score_rate, self.match_result, self.task_finished = WebCanvasInstance.evaluate_events(
            evaluation_page, self.evaluation_step, self.current_event, self.reference_evaluate_steps)

        # Reset event_page after evaluation
        self.event_page = None

        step_action_info["evaluation"].append(
            {
                "step_score_rate": self.step_score_rate,
                "match_result": self.match_result,
                "task_status": self.task_finished
            }
        )
        
        if self.task_finished:
            done = True
        
        self.trace_info.append(step_action_info)
        
        # Add validation result logging
        logger.info("=== Validation Results ===")
        logger.info(f"Step Score Rate: {self.step_score_rate}")
        logger.info(f"Match Result: {self.match_result}")
        logger.info(f"Task Status: {'Completed' if self.task_finished else 'In Progress'}")
        logger.info(f"Current Time Step: {self.time_step}")
        logger.info("========================")
        
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

    def _handle_event(self, selector, event_type, element_info_str, page):
        """
        Handle DOM events by updating task events
        """
        try:
            # Store the page directly
            self.event_page = page
            element_info = json.loads(element_info_str)
            
            # Create current event
            current_event = {
                "selector": selector,
                "status": True,
                "target_value": element_info.get("value") or element_info.get("textContent", "") or "",
                "event_type": event_type
            }
            
            # Update current event
            self.current_event = current_event
            logger.info(f"Event captured on page: {self.event_page.url}")
            logger.info(f"Current event updated: {current_event}")
            
        except json.JSONDecodeError:
            logger.error(f"Failed to parse element info: {element_info_str}")
        except Exception as e:
            logger.error(f"Error handling event: {str(e)}")

    def _ensure_event_listeners(self, page: playwright.sync_api.Page):
        """
        Ensures that event listeners are properly set up on the page.
        Checks for existing handlers before setting up new ones to avoid duplicates.
        """
        try:
            # Check if handleEvent is already bound
            handle_event_exists = page.evaluate("""
                () => typeof window.handleEvent === 'function'
            """)
            
            if not handle_event_exists:
                page.context.expose_binding(
                    "handleEvent",
                    lambda source, selector, event_type, element_info: self._handle_event(
                        selector, event_type, element_info, page
                    )
                )
            
            # Set up DOM event listeners if not already initialized
            page.evaluate("""
                () => {
                    if (window._eventListenersInitialized) return;
                    
                    const allEvents = [
                        'click', 'input', 'change', 'keydown', 'keyup',
                        'mouseover', 'mouseout', 'mousedown', 'mouseup', 'focus', 'blur'
                    ];
                    
                    function getElementSelector(element) {
                        if (!element) return null;
                        try {
                            let path = [];
                            while (element && element.nodeType === Node.ELEMENT_NODE) {
                                let selector = element.nodeName.toLowerCase();
                                if (element.id) {
                                    selector += '#' + element.id;
                                    path.unshift(selector);
                                    break;
                                } else {
                                    let sibling = element;
                                    let nth = 1;
                                    while (sibling.previousElementSibling) {
                                        sibling = sibling.previousElementSibling;
                                        if (sibling.nodeName === element.nodeName) nth++;
                                    }
                                    if (nth > 1) selector += `:nth-child(${nth})`;
                                }
                                path.unshift(selector);
                                element = element.parentNode;
                            }
                            return path.join(' > ');
                        } catch (e) {
                            return null;
                        }
                    }
                    
                    function getElementInfo(element) {
                        return {
                            textContent: element.textContent || '',
                            value: element.value || '',
                            tagName: element.tagName.toLowerCase()
                        };
                    }
                    
                    allEvents.forEach(eventType => {
                        document.addEventListener(eventType, (event) => {
                            const element = event.target;
                            const selector = getElementSelector(element);
                            const elementInfo = getElementInfo(element);
                            
                            window.handleEvent(
                                selector,
                                eventType,
                                JSON.stringify(elementInfo)
                            );
                        }, true);
                    });
                    
                    window._eventListenersInitialized = true;
                }
            """)
        except Exception as e:
            logger.error(f"Failed to ensure event listeners: {str(e)}")
            raise

    def _can_locate_selector(self, page: playwright.sync_api.Page, selector: str) -> bool:
        """
        Test if a selector can be located on the given page
        Returns True if the selector can be found, False otherwise
        """
        try:
            # Try to locate the element using the selector
            result = page.evaluate("""
                (selector) => {
                    try {
                        const element = document.querySelector(selector);
                        return element !== null;
                    } catch (e) {
                        return false;
                    }
                }
            """, selector)
            return result
        except Exception as e:
            logger.error(f"Error checking selector '{selector}': {str(e)}")
            return False
