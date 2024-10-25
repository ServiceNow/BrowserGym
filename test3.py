from playwright.sync_api import sync_playwright, Playwright

# Define a callback function to handle event triggers
def handle_event(selector, event_type, element_text=None):
    print(f"Element with selector '{selector}' triggered '{event_type}' event, text content: {element_text}")

def add_event_listener(page, selectors=None, target_values=None):
    """
    Add event listeners to either specified selectors or globally across all elements.
    :param page: Current page object
    :param selectors: Optional list of selectors to listen to. If None, will apply globally.
    :param target_values: Optional list of text content values to filter events by, used for global listening.
    """
    if selectors:
        # Specific selectors case
        page.evaluate(
            """
            ({selectors}) => {
                selectors.forEach((selector) => {
                    const element = document.querySelector(selector);
                    if (element) {
                        const allEvents = [
                            'click', 'input', 'change', 'keydown', 'keyup', 
                            'mouseover', 'mouseout', 'mousedown', 'mouseup', 'focus', 'blur'
                        ];
                        allEvents.forEach((eventType) => {
                            element.addEventListener(eventType, (event) => {
                                const elementText = event.target.textContent || '';
                                window.handleEvent(selector, eventType, elementText);
                            }, true); // 'true' indicates capture phase
                        });
                    }
                });
            }
            """,
            {"selectors": selectors}
        )
    elif target_values:
        # Global listener with multiple target_values filtering
        page.evaluate(
            """
            (targetValues) => {
                const allEvents = [
                    'click', 'input', 'change', 'keydown', 'keyup', 
                    'mouseover', 'mouseout', 'mousedown', 'mouseup', 'focus', 'blur'
                ];
                allEvents.forEach((eventType) => {
                    document.addEventListener(eventType, (event) => {
                        const elementText = event.target.textContent || '';
                        if (targetValues.includes(elementText)) { 
                            window.handleEvent(null, eventType, elementText); // No selector in this case
                        }
                    }, true); // 'true' indicates capture phase
                });
            }
            """,
            target_values
        )
    return page

def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the target page
    page.goto("https://www.amctheatres.com/food-and-drink/dine-in/explore-menu")

    # Wait for the page to fully load
    page.wait_for_load_state('load')

    # Expose the Python function to the page context
    context.expose_binding("handleEvent", lambda source, selector, event_type, element_text: handle_event(selector, event_type, element_text))

    # Add event listeners with specific selectors and multiple target values
    add_event_listener(
        page,
        selectors=[],  # Add specific selectors
        target_values=["View Full Menu", "Movies"]  # List of target values for global monitoring
    )

    # Simulate clicking on an element
    locator = page.locator("#main > div:nth-child(3) > section > div > p:nth-child(3) > a")
    locator.click()

    page.wait_for_timeout(3000)

    # Close the browser
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
