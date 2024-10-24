import logging
import os

import playwright.sync_api
import requests

logger = logging.getLogger(__name__)

ENV_VARS = ("SHOPPING", "SHOPPING_ADMIN", "REDDIT", "GITLAB", "WIKIPEDIA", "MAP", "HOMEPAGE")


class WebArenaInstance:
    """
    Utility class to access a WebArena instance.

    """

    def __init__(
        self,
    ) -> None:

        # setup webarena environment variables (webarena will read those on import)
        append_wa = lambda x: f"WA_{x}"
        for key in ENV_VARS:
            assert append_wa(key) in os.environ, (
                f"Environment variable {append_wa(key)} missing.\n"
                + "Please set the following environment variables to use WebArena through BrowserGym:\n"
                + "\n".join([append_wa(x) for x in ENV_VARS])
            )
            os.environ[key] = os.environ[append_wa(key)]

        # import webarena on instanciation
        from webarena.browser_env.env_config import (
            ACCOUNTS,
            GITLAB,
            HOMEPAGE,
            MAP,
            REDDIT,
            SHOPPING,
            SHOPPING_ADMIN,
            WIKIPEDIA,
        )

        self.urls = {
            "reddit": REDDIT,
            "gitlab": GITLAB,
            "shopping": SHOPPING,
            "shopping_admin": SHOPPING_ADMIN,
            "wikipedia": WIKIPEDIA,
            "map": MAP,
        }
        self.home_url = HOMEPAGE

        self.credentials = ACCOUNTS

    def full_reset(self):
        reset_url = os.environ.get("WA_FULL_RESET", None)

        assert (
            reset_url
        ), f"Environment variable WA_FULL_RESET is missing or empty, required for a full instance reset."

        # Send the GET request to trigger the reset script
        logger.info(f"WebArena full instance reset in progress.")

        # 10 minutes timeout (takes about 4 minutes in practice)
        # https://requests.readthedocs.io/en/stable/user/advanced/#timeouts
        response = requests.get(reset_url, timeout=(3.05, 10 * 60))

        # Print the response from the server
        logger.info(f"Reset status code: {response.status_code}")
        logger.info(f"Reset response: {response.text}")

        if not response.status_code == 200:
            raise Exception(
                f"Full instance reset failed ({response.status_code}): {response.status_code}"
            )

        # warm-start the instance (navigate to every domain)
        retries_left = 3
        while retries_left:
            retries_left -= 1
            try:
                self._check_is_reachable(timeout=60)  # 60 seconds, cold starting might be slow
                break
            except Exception as e:
                if not retries_left:
                    raise
                logger.info(
                    f"Instance unresponsive after reset, retrying ({retries_left} retries left)\n{e}"
                )

    def check_status(self):
        """
        Check the status of the instance. Raises an error if the instance is not ready to be used.

        """
        self._check_is_reachable(timeout=10)  # 10 seconds

    def _check_is_reachable(self, timeout: int):
        """
        Test that every website is reachable.

        """
        for site, url in self.urls.items():
            try:
                requests.get(url, timeout=timeout)
            except (requests.exceptions.ConnectionError, requests.exceptions.Timeout):
                raise RuntimeError(
                    f'WebArena site "{site}" ({url}) is not reacheable. Please check the URL.'
                )

    def ui_login(self, site: str, page: playwright.sync_api.Page):
        """
        Should only be called once per site (expects user to be logged out).
        """

        url = self.urls[site]

        match site:
            case "reddit":
                username = self.credentials[site]["username"]
                password = self.credentials[site]["password"]

                page.goto(f"{url}")
                page.get_by_role("link", name="Log in").click()
                page.get_by_label("Username").fill(username)
                page.get_by_label("Password").fill(password)
                page.get_by_role("button", name="Log in").click()

            case "gitlab":
                username = self.credentials[site]["username"]
                password = self.credentials[site]["password"]

                page.goto(f"{url}/users/sign_in")
                page.get_by_label("Username or email").fill(username)
                page.get_by_label("Password").fill(password)
                page.get_by_role("button", name="Sign in").click()

            case "shopping":
                username = self.credentials[site]["username"]
                password = self.credentials[site]["password"]

                page.goto(f"{url}/customer/account/login/")
                page.get_by_label("Email", exact=True).fill(username)
                page.get_by_label("Password", exact=True).fill(password)
                page.get_by_role("button", name="Sign In").click()

            case "shopping_admin":
                username = self.credentials[site]["username"]
                password = self.credentials[site]["password"]

                page.goto(url)
                page.get_by_label("Username").fill(username)
                page.get_by_label("Password").fill(password)
                page.get_by_role("button", name="Sign in").click()

            case "wikipedia":
                page.goto(url)

            case "map":
                page.goto(url)

            case _:
                raise ValueError
