import logging
import os
import time

import playwright.sync_api
import requests

logger = logging.getLogger(__name__)

# Environment variable names for each site.
# Add new sites here as the benchmark grows.
# Convention: WAP_<SITE_NAME> (WAP = WebArena-Pro)
ENV_VARS = ("MATTERMOST",)

# Default credentials per site (used for UI login).
# Add new sites here when expanding the benchmark.
ACCOUNTS = {
    "mattermost": {
        "username": "admin",
        "password": "Admin@Secure123",
    },
}


class WebArenaProInstance:
    """
    Utility class to access a WebArena-Pro instance.

    Sites are configured via environment variables:
        WAP_MATTERMOST=http://<host>:8065

    Add new sites by:
        1. Adding the name to ENV_VARS above
        2. Adding credentials to ACCOUNTS above
        3. Adding a ui_login case below
    """

    def __init__(self) -> None:
        self.urls = {}
        append_wap = lambda x: f"WAP_{x}"

        for key in ENV_VARS:
            env_key = append_wap(key)
            assert env_key in os.environ, (
                f"Environment variable {env_key} missing.\n"
                + "Please set the following environment variables to use WebArena-Pro through BrowserGym:\n"
                + "\n".join([append_wap(x) for x in ENV_VARS])
            )
            self.urls[key.lower()] = os.environ[env_key]

        self.credentials = ACCOUNTS

    def check_status(self):
        """Check that every site is reachable."""
        self._check_is_reachable(timeout=10)

    def _check_is_reachable(self, timeout: int):
        """Test that every website is reachable."""
        for site, url in self.urls.items():
            try:
                requests.get(url, timeout=timeout)
            except (requests.exceptions.ConnectionError, requests.exceptions.Timeout):
                raise RuntimeError(
                    f'WebArena-Pro site "{site}" ({url}) is not reachable. Please check the URL.'
                )

    def ui_login(self, site: str, page: playwright.sync_api.Page):
        """
        Log in to a site via the UI. Should only be called once per site
        (expects user to be logged out).

        Add new login flows here when adding new sites.
        """
        url = self.urls[site]
        username = self.credentials[site]["username"]
        password = self.credentials[site]["password"]

        # open a new page (tab) to perform the login
        page = page.context.new_page()

        match site:
            case "mattermost":
                page.goto(f"{url}/login")
                # Mattermost may show a landing page first
                if "/landing" in page.url:
                    page.get_by_role("link", name="View in Browser").click()
                    page.wait_for_timeout(3000)
                page.locator("#input_loginId").fill(username)
                page.locator("#input_password-input").fill(password)
                page.locator("#saveSetting").click()
                # wait for login to complete
                page.wait_for_url(f"{url}/**", timeout=15000)

            case _:
                raise ValueError(f"Unknown site: {site}")

        # release login page
        page.close()
