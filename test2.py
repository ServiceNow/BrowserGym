from playwright.sync_api import sync_playwright, Playwright

# Define a callback function to handle event triggers
def handle_event(selector, event_type, element_text=None):
    print(f"Element with selector '{selector}' triggered '{event_type}' event, text content: {element_text}")

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
    browser = chromium.launch(headless=False)  # Set to True to enable headless mode
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the target page
    page.goto("https://store.steampowered.com/app/570/Dota_2/")

    # Wait for the page to fully load
    page.wait_for_load_state('load')

    # Expose the Python function to the page context
    context.expose_binding("handleEvent", lambda source, selector, event_type, element_text: handle_event(selector, event_type, element_text))

    # Call the function to add a universal event listener to specified selectors
    page = event_listener(
        page,
        ["#noteworthy_tab > span > a.pulldown_desktop",
         "#store_nav_search_term"]  # Add selectors you want to listen to
    )

    # Simulate clicking on an element
    locator = page.locator("#noteworthy_tab > span > a.pulldown_desktop")
    locator.click()

    page.wait_for_timeout(3000)

    # Call event_listener again to listen to new events
    page = event_listener(
        page,
        ["#store_nav_search_term"]  # Add selectors you want to listen to
    )

    # Simulate filling content in the input field
    fill_locator = page.locator("#store_nav_search_term")
    fill_locator.fill("game")

    page.wait_for_timeout(3000)

    # Close the browser
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
