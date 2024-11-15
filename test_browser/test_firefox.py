from playwright.sync_api import sync_playwright
import time

def test_browser():
    try:
        print("Starting Playwright...")
        with sync_playwright() as p:
            print("Launching Firefox browser...")
            browser = p.firefox.launch(
                headless=False,
            )
            print("Creating context...")
            context = browser.new_context(
                viewport={'width': 1280, 'height': 720}
            )
            print("Creating page...")
            page = context.new_page()
            print("Navigating to Google...")
            page.goto('https://www.google.com', wait_until='networkidle')
            print("Successfully loaded Google")
            time.sleep(2)
            print("Taking screenshot...")
            page.screenshot(path='test.png')
            print("Closing browser...")
            context.close()
            browser.close()
            print("Test completed successfully!")
    except Exception as e:
        print(f"Error occurred: {type(e).__name__}: {str(e)}")
        raise

if __name__ == "__main__":
    test_browser()