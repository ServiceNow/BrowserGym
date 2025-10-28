from playwright.sync_api import sync_playwright
import time

# PROFILE_DIR = r"C:\Users\Farhan Ishmam\AppData\Local\Google\Chrome\User Data"
PROFILE_DIR = "playwright_chrome_profile"
with sync_playwright() as p:
    browser = p.chromium.launch_persistent_context(
        user_data_dir=PROFILE_DIR,
        channel="chrome",
        headless=False,
        args=[
            "--profile-directory=Default",
            "--disable-blink-features=AutomationControlled",  # Hide automation
            "--disable-infobars",  # Hide "Chrome is being controlled..." message
        ]
    )
    page = browser.pages[0]
    
    # Wait for browser to fully initialize
    time.sleep(3)
    
    # Test with wait until network is idle
    page.goto("https://www.docs.google.com", wait_until="networkidle")
    print("\n✓ Browser opened with Google")
    print("Check: Can you browse the internet now?")
    input("Press Enter when done...")
    browser.close()