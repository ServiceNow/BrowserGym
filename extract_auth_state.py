#!/usr/bin/env python3
"""
Extract authentication state from Chrome profile for use with BrowserGym.

This script launches a browser with your existing Chrome profile, navigates to Google
to verify login, and extracts the storage state (cookies + localStorage) into a JSON
file that BrowserGym can use for authentication.
"""

from playwright.sync_api import sync_playwright
import json
import time
from pathlib import Path

PROFILE_DIR = "playwright_chrome_profile"
OUTPUT_FILE = "storage_state.json"

def extract_auth_state():
    """Extract authentication state from Chrome profile."""
    print(f"🔍 Extracting auth state from: {PROFILE_DIR}")
    
    with sync_playwright() as p:
        # Launch browser with existing profile
        browser = p.chromium.launch_persistent_context(
            user_data_dir=PROFILE_DIR,
            channel="chrome",
            headless=False,
            args=[
                "--profile-directory=Default",
                "--disable-blink-features=AutomationControlled",
            ]
        )
        
        page = browser.pages[0]
        
        # Wait for browser to initialize
        time.sleep(2)
        
        # Navigate to Google to verify login
        print("📄 Navigating to Google Docs...")
        page.goto("https://docs.google.com", wait_until="networkidle", timeout=30000)
        
        # Wait a moment for any login redirects
        time.sleep(2)
        
        # Check if we're logged in
        print("\n⚠️  Please verify you're logged into Google in the browser window.")
        print("   If not logged in, please log in now.")
        input("\n   Press Enter once you're logged in and ready to continue...")
        
        # Extract storage state
        print("\n💾 Extracting storage state...")
        storage_state = browser.storage_state()
        
        # Save to file
        output_path = Path(OUTPUT_FILE)
        with open(output_path, 'w') as f:
            json.dump(storage_state, f, indent=2)
        
        print(f"\n✅ Storage state saved to: {output_path.absolute()}")
        print(f"   - Cookies: {len(storage_state.get('cookies', []))}")
        print(f"   - Origins: {len(storage_state.get('origins', []))}")
        
        browser.close()
        
    return output_path

if __name__ == "__main__":
    print("=" * 70)
    print("Chrome Profile Authentication Extractor")
    print("=" * 70)
    print()
    
    try:
        output_path = extract_auth_state()
        print("\n✨ Done! You can now use this storage_state.json in your benchmark.")
        print(f"\n   Note: Re-run this script if your login expires.")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()

