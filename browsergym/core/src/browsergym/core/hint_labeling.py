import playwright.sync_api

from importlib import resources

from . import _get_global_playwright, hint_labeling_files

HINT_LABELING_DIR = resources.files(hint_labeling_files)

class HintLabeling:
    def __init__(self, headless: bool, window_size=(500, 800), *args, **kwargs):
        
        pw: playwright.sync_api.Playwright = _get_global_playwright()
        self.browser = pw.chromium.launch(
            headless=headless, args=[f"--window-size={window_size[0]},{window_size[1]}"]
        )
        self.context = self.browser.new_context(
            no_viewport=True,
        )
        self.page = self.context.new_page()

        self.page.set_content(get_hint_labeling_ui(HINT_LABELING_DIR))
        


def get_hint_labeling_ui(hint_labeling_dir) -> str:
    with open(hint_labeling_dir / "hint_labeling_ui.html", "r") as file:
        hint_labeling_html = file.read()
    return hint_labeling_html