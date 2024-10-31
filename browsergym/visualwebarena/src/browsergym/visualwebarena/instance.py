import logging
import os

import playwright.sync_api

from browsergym.webarena.instance import WebArenaInstance

logger = logging.getLogger(__name__)


ENV_VARS = ("SHOPPING", "REDDIT", "WIKIPEDIA", "HOMEPAGE", "CLASSIFIEDS", "CLASSIFIEDS_RESET_TOKEN")


class VisualWebArenaInstance(WebArenaInstance):
    """
    Utility class to access a WebArena instance.

    """

    RESET_URL_VAR = "VWA_FULL_RESET"  # used by full_reset()

    def __init__(
        self,
    ) -> None:

        # setup visualwebarena environment variables (visualwebarena will read those on import)
        os.environ["DATASET"] = "visualwebarena"
        append_vwa = lambda x: f"VWA_{x}"
        for key in ENV_VARS:
            assert append_vwa(key) in os.environ, (
                f"Environment variable {append_vwa(key)} missing.\n"
                + "Please set the following environment variables to use VisualWebArena through BrowserGym:\n"
                + "\n".join([append_vwa(x) for x in ENV_VARS])
            )
            os.environ[key] = os.environ[append_vwa(key)]

        # import webarena on instantiation
        from visualwebarena.browser_env.env_config import (
            ACCOUNTS,
            CLASSIFIEDS,
            CLASSIFIEDS_RESET_TOKEN,
            HOMEPAGE,
            REDDIT,
            SHOPPING,
            WIKIPEDIA,
        )

        self.urls = {
            "reddit": REDDIT,
            "shopping": SHOPPING,
            "wikipedia": WIKIPEDIA,
            "classifieds": CLASSIFIEDS,
        }
        self.home_url = HOMEPAGE
        self.classifieds_reset_token = CLASSIFIEDS_RESET_TOKEN

        self.credentials = ACCOUNTS

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
            case "shopping":
                username = self.credentials[site]["username"]
                password = self.credentials[site]["password"]

                page.goto(f"{url}/customer/account/login/")
                page.get_by_label("Email", exact=True).fill(username)
                page.get_by_label("Password", exact=True).fill(password)
                page.get_by_role("button", name="Sign In").click()

            case "wikipedia":
                page.goto(url)

            case "classifieds":
                username = self.credentials[site]["username"]
                password = self.credentials[site]["password"]
                page.goto(f"{url}/index.php?page=login")
                page.locator("#email").fill(username)
                page.locator("#password").fill(password)
                page.get_by_role("button", name="Log in").click()

            case _:
                raise ValueError
