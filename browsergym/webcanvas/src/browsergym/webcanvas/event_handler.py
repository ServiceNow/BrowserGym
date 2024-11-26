class EventHandler:
    def __init__(self, page, events=None):
        self.page = page
        self.events = events or []
        self.update_callback = None
        self._setup_event_listeners()

    def _setup_event_listeners(self):
        """Set up event listeners for the page"""
        # 首先暴露 handle_event 方法给浏览器
        self.page.expose_function("handleEvent", 
            lambda selector, event_type, element_info: self.handle_event(selector, event_type, element_info))
        
        # 然后设置事件监听器
        self.page.evaluate("""
            () => {
                const allEvents = [
                    'click', 'input', 'change', 'keydown', 'keyup', 
                    'mouseover', 'mouseout', 'mousedown', 'mouseup', 'focus', 'blur'
                ];
                
                function getElementInfo(element) {
                    return {
                        selector: null,
                        textContent: element.textContent || '',
                        value: element.value || '',
                        type: element.type || '',
                        checked: element.checked,
                        selected: element.selected,
                        tagName: element.tagName.toLowerCase()
                    };
                }
                
                document.addEventListener('click', (event) => {
                    const elementInfo = getElementInfo(event.target);
                    window.handleEvent(null, 'click', JSON.stringify(elementInfo));
                }, true);
                
                document.addEventListener('input', (event) => {
                    const elementInfo = getElementInfo(event.target);
                    window.handleEvent(null, 'input', JSON.stringify(elementInfo));
                }, true);
                
                if (window.selectors && window.selectors.length) {
                    window.selectors.forEach((selector) => {
                        const element = document.querySelector(selector);
                        if (element) {
                            allEvents.forEach((eventType) => {
                                element.addEventListener(eventType, (event) => {
                                    const elementInfo = getElementInfo(event.target);
                                    elementInfo.selector = selector;
                                    window.handleEvent(selector, eventType, JSON.stringify(elementInfo));
                                }, true);
                            });
                        }
                    });
                }
            }
        """)

    def set_update_callback(self, callback):
        """Set callback function to be called when events are updated"""
        self.update_callback = callback

    def handle_event(self, selector, event_type, element_info_str):
        """Handle events from the page by collecting and maintaining event states
        
        Args:
            selector: Element selector if any
            event_type: Type of the event (click, input, etc)
            element_info_str: JSON string containing element information
            
        Returns:
            Updated events list or None if error occurs
        """
        try:
            import json
            import logging
            from .utils import get_netloc
            
            logger = logging.getLogger(__name__)
            element_info = json.loads(element_info_str)
            logger.debug(f"Element event: {element_info}")
            
            for idx, event in enumerate(self.events):
                if not event:
                    continue
                    
                # Update event state based on selector match
                if event.get("selector") and event["selector"] == selector:
                    self.events[idx]["status"] = True
                    self.events[idx]["target_value"] = element_info["textContent"]
                    self.events[idx]["event_type"] = event_type
                    
                # Update event state based on element value
                elif event.get("reference_value"):
                    element_value = element_info.get("value", "") or element_info.get("textContent", "")
                    self.events[idx]["target_value"] = element_value
                    self.events[idx]["event_type"] = event_type
                    
            # Notify callback if exists
            if self.update_callback:
                self.update_callback(self.events)
                
            return self.events
            
        except json.JSONDecodeError:
            logger.error(f"Failed to parse element info: {element_info_str}")
        except Exception as e:
            logger.error(f"Error handling event: {str(e)}")
        return None