from playwright.sync_api import sync_playwright, Playwright

# Define a callback function to handle event triggers


def handle_event(selector, event_type, element_text=None):
    print(f"Element with selector '{selector}' triggered '{
          event_type}' event, text content: {element_text}")


def event_listener(page, selectors):
    """
    Add a universal event listener to specified selectors to capture various event types
    :param page: Current page object
    :param selectors: List of selectors to listen to
    """
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
                            const elementText = event.target.textContent || null;
                            window.handleEvent(selector, eventType, elementText);
                        }, true); // 'true' indicates capture phase
                    });
                }
            });
        }
        """,
        {"selectors": selectors}
    )
    return page


def run(playwright: Playwright):
    chromium = playwright.chromium
    # Set to True to enable headless mode
    browser = chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the target page
    page.goto("https://www.amctheatres.com/food-and-drink/dine-in/explore-menu")

    # Wait for the page to fully load
    page.wait_for_load_state('load')

    # Expose the Python function to the page context
    context.expose_binding("handleEvent", lambda source, selector, event_type,
                           element_text: handle_event(selector, event_type, element_text))

    # Call the function to add a universal event listener to specified selectors
    page = event_listener(
        page,
        [
            "#main > div:nth-child(3) > section > div > p:nth-child(3) > a"
        ]  # Add selectors you want to listen to
    )

    # Simulate clicking on an element
    locator = page.locator(
        "#main > div:nth-child(3) > section > div > p:nth-child(3) > a")
    locator.click()

    page.wait_for_timeout(3000)

    # Close the browser
    browser.close()


with sync_playwright() as playwright:
    run(playwright)
