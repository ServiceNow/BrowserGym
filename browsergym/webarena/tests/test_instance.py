import pytest
import playwright.sync_api

# bugfix: use same playwright instance in browsergym and pytest
from utils import setup_playwright

from browsergym.webarena.instance import WebArenaInstance


def test_is_reachable():
    # default URLs
    instance = WebArenaInstance()
    instance.check_status()

    # unreacheable URL
    with pytest.raises(RuntimeError):
        instance = WebArenaInstance()
        instance.urls["reddit"] = "https://invalid.url"
        instance.check_status()


@pytest.mark.parametrize(
    "site", ["reddit", "shopping", "shopping_admin", "gitlab", "wikipedia", "map"]
)
def test_credentials(page: playwright.sync_api.Page, site: str):
    # default URLs and credentials
    instance = WebArenaInstance()
    instance.ui_login(site=site, page=page)

    # TODO: test this more thoroughly
