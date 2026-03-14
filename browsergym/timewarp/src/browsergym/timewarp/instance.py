import logging
import os
import time

import playwright.sync_api
import requests

logger = logging.getLogger(__name__)


class TimeWarpInstance:
    """
    Utility class to access a TimeWarp instance.
    TimeWarp has 4 environments: WIKI, WEBSHOP, NEWS, HOME
    """

    RESET_URL_VAR = "TW_FULL_RESET"

    def __init__(self) -> None:
        # TimeWarp environment variables
        required_vars = ["TW_WIKI", "TW_WEBSHOP", "TW_NEWS"]
        missing_vars = [var for var in required_vars if var not in os.environ]

        if missing_vars:
            raise AssertionError(
                f"Missing environment variables: {', '.join(missing_vars)}\n"
                "Please set the following environment variables:\n"
                "  TW_WIKI - Wiki environment URL\n"
                "  TW_WEBSHOP - Webshop environment URL\n"
                "  TW_NEWS - News environment URL"
            )

        self.urls = {
            "wiki": os.environ["TW_WIKI"],
            "webshop": os.environ["TW_WEBSHOP"],
            "news": os.environ["TW_NEWS"],
        }

        # Credentials (customize as needed)
        self.credentials = {
            "wiki": {
                "username": os.environ.get("TW_USERNAME", "admin"),
                "password": os.environ.get("TW_PASSWORD", "admin"),
            },
            "webshop": {
                "username": os.environ.get("TW_USERNAME", "admin"),
                "password": os.environ.get("TW_PASSWORD", "admin"),
            },
            "news": {
                "username": os.environ.get("TW_USERNAME", "admin"),
                "password": os.environ.get("TW_PASSWORD", "admin"),
            },
        }

    def full_reset(self, skip_if_not_set: bool = True):
        base_url = os.environ.get(self.RESET_URL_VAR, None)

        if not base_url:
            logger.error(
                f"Environment variable {self.RESET_URL_VAR} is missing or empty, required for a full instance reset."
            )
            if skip_if_not_set:
                logger.warning(
                    "Skipping automated reset. Make sure the instance has been manually reset."
                )
            else:
                raise RuntimeError("Could not reset instance, aborting.")
        else:
            reset_url = f"{base_url}/reset"
            status_url = f"{base_url}/status"

            logger.info(f"Initiating {self.__class__.__name__} instance reset on URL {reset_url}.")

            response = requests.get(reset_url)
            match response.status_code:
                case 200:
                    logger.info("Reset started.")
                case 418:
                    logger.warning("Reset was already running.")
                case _:
                    raise Exception(
                        f"{self.__class__.__name__} reset request {reset_url} failed ({response.status_code}): {response.text}"
                    )

            retry_after = 10
            timeout = 5 * 60
            start_time = time.time()
            while True:
                response = requests.get(status_url)
                if response.status_code != 200:
                    raise Exception(
                        f"{self.__class__.__name__} status request {status_url} failed ({response.status_code}): {response.text}"
                    )
                if response.text == "Ready for duty!":
                    break
                time_elapsed = time.time() - start_time
                logger.info(f"Reset still running after {time_elapsed:.0f} seconds...")
                if time_elapsed > timeout:
                    raise Exception(
                        f"Reset still running after {time_elapsed} seconds (> {timeout}), aborting."
                    )
                time.sleep(retry_after)

            retries_left = 3
            while retries_left:
                retries_left -= 1
                try:
                    self._check_is_reachable(timeout=30)
                    break
                except Exception as e:
                    if not retries_left:
                        raise
                    logger.info(
                        f"Instance unresponsive after reset, retrying ({retries_left} retries left)\n{e}"
                    )

    def check_status(self):
        self._check_is_reachable(timeout=10)

    def _check_is_reachable(self, timeout: int):
        for site, url in self.urls.items():
            try:
                response = requests.get(url, timeout=timeout)
                if response.status_code >= 500:
                    raise RuntimeError(
                        f'TimeWarp site "{site}" ({url}) returned server error: {response.status_code}'
                    )
            except (requests.exceptions.ConnectionError, requests.exceptions.Timeout) as e:
                raise RuntimeError(f'TimeWarp site "{site}" ({url}) is not reachable. Error: {e}')

    def ui_login(self, site: str, page: playwright.sync_api.Page):
        """
        Perform UI login for TimeWarp sites.
        Customize based on your authentication flow.
        """
        if site not in self.urls:
            logger.warning(f"Unknown site '{site}' for TimeWarp login. Skipping authentication.")
            return

        url = self.urls[site]
        username = self.credentials[site]["username"]
        password = self.credentials[site]["password"]

        login_page = page.context.new_page()

        try:
            # TODO: Customize login flow per site
            # For now, just navigate to the site
            login_page.goto(url, timeout=10000)
            logger.info(f"Navigated to {site} at {url}")
        except Exception as e:
            logger.warning(f"Login failed for {site}: {e}")
        finally:
            login_page.close()
