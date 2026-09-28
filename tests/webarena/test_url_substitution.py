import json
import os
import sys
import types

import pytest


ENV_URLS = {
    "WA_SHOPPING": "http://host:8082/",
    "WA_SHOPPING_ADMIN": "http://host:8083/admin/",
    "WA_REDDIT": "http://host:8080/",
    "WA_GITLAB": "http://host:9001/",
    "WA_WIKIPEDIA": "http://host:8081/wikipedia/",
    "WA_MAP": "http://host:443/",
    "WA_HOMEPAGE": "http://host:80/",
}


@pytest.fixture
def fake_webarena(monkeypatch):
    for k, v in ENV_URLS.items():
        monkeypatch.setenv(k, v)

    pkg = types.ModuleType("webarena")
    browser_env = types.ModuleType("webarena.browser_env")
    env_config = types.ModuleType("webarena.browser_env.env_config")
    for name in ("SHOPPING", "SHOPPING_ADMIN", "REDDIT", "GITLAB", "WIKIPEDIA", "MAP", "HOMEPAGE"):
        setattr(env_config, name, os.environ[f"WA_{name}"])
    env_config.ACCOUNTS = {}

    monkeypatch.setitem(sys.modules, "webarena", pkg)
    monkeypatch.setitem(sys.modules, "webarena.browser_env", browser_env)
    monkeypatch.setitem(sys.modules, "webarena.browser_env.env_config", env_config)


@pytest.mark.parametrize(
    "site", ["reddit", "gitlab", "shopping", "shopping_admin", "wikipedia", "map"]
)
def test_urls_stripped(fake_webarena, site):
    from browsergym.webarena.instance import WebArenaInstance

    assert not WebArenaInstance().urls[site].endswith("/")


def test_home_url_stripped(fake_webarena):
    from browsergym.webarena.instance import WebArenaInstance

    assert not WebArenaInstance().home_url.endswith("/")


@pytest.mark.parametrize(
    "placeholder,path",
    [
        ("__SHOPPING__", "/catalogsearch/result/?q=xbox"),
        ("__SHOPPING_ADMIN__", "/sales/order/view/order_id/1/"),
        ("__REDDIT__", "/f/AskReddit"),
        ("__GITLAB__", "/root/some-project"),
        ("__WIKIPEDIA__", "/wikipedia_en_all_maxi_2022-05/A/Alpha"),
        ("__MAP__", "/?q=Pittsburgh"),
    ],
)
def test_no_double_slash(fake_webarena, placeholder, path):
    from browsergym.webarena.instance import WebArenaInstance
    from browsergym.webarena.task import substitute_urls

    raw = json.dumps({"eval": {"reference_url": f"{placeholder}{path}"}})
    out = json.loads(substitute_urls(raw, WebArenaInstance().urls))
    ref = out["eval"]["reference_url"]

    first = path.lstrip("/").split("/")[0].split("?")[0]
    if first:
        assert f"//{first}" not in ref
    assert ref.endswith(path)
