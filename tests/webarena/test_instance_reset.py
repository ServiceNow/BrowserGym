import importlib.util
from pathlib import Path
from unittest.mock import MagicMock, patch
import pytest

from browsergym.webarena.instance import WebArenaInstance

# Load VisualWebArenaInstance directly without executing visualwebarena.__init__ (which requires torch)
vwa_file = (
    Path(__file__).resolve().parents[2]
    / "browsergym"
    / "visualwebarena"
    / "src"
    / "browsergym"
    / "visualwebarena"
    / "instance.py"
)
if vwa_file.exists():
    _spec = importlib.util.spec_from_file_location("vwa_instance_mod", str(vwa_file))
    _vwa_mod = importlib.util.module_from_spec(_spec)
    _spec.loader.exec_module(_vwa_mod)
    VisualWebArenaInstance = _vwa_mod.VisualWebArenaInstance
else:
    VisualWebArenaInstance = None


@pytest.fixture(autouse=True)
def clean_reset_env(monkeypatch):
    """Ensure reset environment variables are clear by default."""
    monkeypatch.delenv("WA_FULL_RESET", raising=False)
    monkeypatch.delenv("VWA_FULL_RESET", raising=False)


def test_full_reset_skipped_when_env_unset(monkeypatch):
    """When WA_FULL_RESET is not set and skip_if_not_set=True, full_reset returns False."""
    inst = WebArenaInstance.__new__(WebArenaInstance)
    monkeypatch.setattr(inst, "_check_is_reachable", MagicMock())

    result = inst.full_reset(skip_if_not_set=True)
    assert result is False
    inst._check_is_reachable.assert_called_once_with(timeout=60)


def test_full_reset_skipped_when_env_empty(monkeypatch):
    """When WA_FULL_RESET is empty string and skip_if_not_set=True, full_reset returns False."""
    monkeypatch.setenv("WA_FULL_RESET", "")
    inst = WebArenaInstance.__new__(WebArenaInstance)
    monkeypatch.setattr(inst, "_check_is_reachable", MagicMock())

    result = inst.full_reset(skip_if_not_set=True)
    assert result is False
    inst._check_is_reachable.assert_called_once_with(timeout=60)


def test_full_reset_raises_when_env_unset_and_skip_false(monkeypatch):
    """When WA_FULL_RESET is not set and skip_if_not_set=False, full_reset raises RuntimeError."""
    inst = WebArenaInstance.__new__(WebArenaInstance)
    monkeypatch.setattr(inst, "_check_is_reachable", MagicMock())

    with pytest.raises(RuntimeError, match="Could not reset instance, aborting."):
        inst.full_reset(skip_if_not_set=False)
    inst._check_is_reachable.assert_not_called()


def test_full_reset_raises_when_env_empty_and_skip_false(monkeypatch):
    """When WA_FULL_RESET is empty string and skip_if_not_set=False, full_reset raises RuntimeError."""
    monkeypatch.setenv("WA_FULL_RESET", "")
    inst = WebArenaInstance.__new__(WebArenaInstance)
    monkeypatch.setattr(inst, "_check_is_reachable", MagicMock())

    with pytest.raises(RuntimeError, match="Could not reset instance, aborting."):
        inst.full_reset(skip_if_not_set=False)
    inst._check_is_reachable.assert_not_called()


def test_full_reset_success(monkeypatch):
    """When WA_FULL_RESET is configured and reset succeeds, full_reset returns True."""
    monkeypatch.setenv("WA_FULL_RESET", "http://reset.example.com")
    inst = WebArenaInstance.__new__(WebArenaInstance)
    monkeypatch.setattr(inst, "_check_is_reachable", MagicMock())

    mock_reset_resp = MagicMock()
    mock_reset_resp.status_code = 200

    mock_status_resp = MagicMock()
    mock_status_resp.status_code = 200
    mock_status_resp.text = "Ready for duty!"

    def mock_get(url):
        if url == "http://reset.example.com/reset":
            return mock_reset_resp
        elif url == "http://reset.example.com/status":
            return mock_status_resp
        raise ValueError(f"Unexpected URL: {url}")

    with patch("browsergym.webarena.instance.requests.get", side_effect=mock_get):
        result = inst.full_reset(skip_if_not_set=True)

    assert result is True
    inst._check_is_reachable.assert_called_once_with(timeout=60)


def test_full_reset_success_already_running(monkeypatch):
    """When reset endpoint returns 418 (already running), it continues and returns True upon ready."""
    monkeypatch.setenv("WA_FULL_RESET", "http://reset.example.com")
    inst = WebArenaInstance.__new__(WebArenaInstance)
    monkeypatch.setattr(inst, "_check_is_reachable", MagicMock())

    mock_reset_resp = MagicMock()
    mock_reset_resp.status_code = 418

    mock_status_resp = MagicMock()
    mock_status_resp.status_code = 200
    mock_status_resp.text = "Ready for duty!"

    def mock_get(url):
        if url == "http://reset.example.com/reset":
            return mock_reset_resp
        elif url == "http://reset.example.com/status":
            return mock_status_resp
        raise ValueError(f"Unexpected URL: {url}")

    with patch("browsergym.webarena.instance.requests.get", side_effect=mock_get):
        result = inst.full_reset(skip_if_not_set=True)

    assert result is True
    inst._check_is_reachable.assert_called_once_with(timeout=60)


def test_full_reset_raises_on_reset_endpoint_error(monkeypatch):
    """When reset endpoint returns a non-200/non-418 status code, full_reset raises Exception."""
    monkeypatch.setenv("WA_FULL_RESET", "http://reset.example.com")
    inst = WebArenaInstance.__new__(WebArenaInstance)
    monkeypatch.setattr(inst, "_check_is_reachable", MagicMock())

    mock_reset_resp = MagicMock()
    mock_reset_resp.status_code = 500
    mock_reset_resp.text = "Internal Server Error"

    with patch("browsergym.webarena.instance.requests.get", return_value=mock_reset_resp):
        with pytest.raises(Exception, match="reset request .* failed"):
            inst.full_reset(skip_if_not_set=True)


def test_visualwebarena_uses_vwa_env_var(monkeypatch):
    """VisualWebArenaInstance overrides RESET_URL_VAR to VWA_FULL_RESET and inherits full_reset()."""
    assert VisualWebArenaInstance.RESET_URL_VAR == "VWA_FULL_RESET"

    inst = VisualWebArenaInstance.__new__(VisualWebArenaInstance)
    monkeypatch.setattr(inst, "_check_is_reachable", MagicMock())

    # With VWA_FULL_RESET unset -> returns False
    result = inst.full_reset(skip_if_not_set=True)
    assert result is False

    # With VWA_FULL_RESET set -> performs reset and returns True
    monkeypatch.setenv("VWA_FULL_RESET", "http://vwa-reset.example.com")

    mock_reset_resp = MagicMock()
    mock_reset_resp.status_code = 200
    mock_status_resp = MagicMock()
    mock_status_resp.status_code = 200
    mock_status_resp.text = "Ready for duty!"

    def mock_get(url):
        if url == "http://vwa-reset.example.com/reset":
            return mock_reset_resp
        elif url == "http://vwa-reset.example.com/status":
            return mock_status_resp
        raise ValueError(f"Unexpected URL: {url}")

    with patch("browsergym.webarena.instance.requests.get", side_effect=mock_get):
        result = inst.full_reset(skip_if_not_set=True)

    assert result is True


def test_prepare_backend_webarena_logs_done(caplog):
    """prepare_backend logs 'Environment reset: DONE' when full_reset returns True."""
    import logging
    from browsergym.experiments.benchmark.utils import prepare_backend

    mock_instance = MagicMock()
    mock_instance.RESET_URL_VAR = "WA_FULL_RESET"
    mock_instance.full_reset.return_value = True

    with patch("browsergym.webarena.instance.WebArenaInstance", return_value=mock_instance), patch(
        "browsergym.experiments.benchmark.utils.massage_tasks"
    ):
        with caplog.at_level(logging.INFO):
            prepare_backend("webarena")

    assert "Environment reset: DONE" in caplog.text


def test_prepare_backend_webarena_logs_skipped(caplog):
    """prepare_backend logs 'Environment reset: SKIPPED (WA_FULL_RESET unset)' when full_reset returns False."""
    import logging
    from browsergym.experiments.benchmark.utils import prepare_backend

    mock_instance = MagicMock()
    mock_instance.RESET_URL_VAR = "WA_FULL_RESET"
    mock_instance.full_reset.return_value = False

    with patch("browsergym.webarena.instance.WebArenaInstance", return_value=mock_instance), patch(
        "browsergym.experiments.benchmark.utils.massage_tasks"
    ):
        with caplog.at_level(logging.WARNING):
            prepare_backend("webarena")

    assert "Environment reset: SKIPPED (WA_FULL_RESET unset)" in caplog.text


def test_prepare_backend_visualwebarena_logs_skipped(caplog):
    """prepare_backend logs 'Environment reset: SKIPPED (VWA_FULL_RESET unset)' for visualwebarena when full_reset returns False."""
    import logging
    import sys
    from browsergym.experiments.benchmark.utils import prepare_backend

    mock_instance = MagicMock()
    mock_instance.RESET_URL_VAR = "VWA_FULL_RESET"
    mock_instance.full_reset.return_value = False

    vwa_pkg = MagicMock()
    vwa_pkg.__path__ = []
    vwa_inst_mod = MagicMock()
    vwa_inst_mod.VisualWebArenaInstance = MagicMock(return_value=mock_instance)

    with patch.dict(
        sys.modules,
        {
            "browsergym.visualwebarena": vwa_pkg,
            "browsergym.visualwebarena.instance": vwa_inst_mod,
        },
    ):
        with patch("browsergym.experiments.benchmark.utils.massage_tasks"):
            with caplog.at_level(logging.WARNING):
                prepare_backend("visualwebarena")

    assert "Environment reset: SKIPPED (VWA_FULL_RESET unset)" in caplog.text


def test_prepare_backend_webarena_verified_logs_skipped(caplog):
    """prepare_backend logs 'Environment reset: SKIPPED (WA_FULL_RESET unset)' for webarena_verified when full_reset returns False."""
    import logging
    import sys
    from browsergym.experiments.benchmark.utils import prepare_backend

    mock_instance = MagicMock()
    mock_instance.RESET_URL_VAR = "WA_FULL_RESET"
    mock_instance.full_reset.return_value = False

    with patch.dict(sys.modules, {"browsergym.webarena_verified": MagicMock()}):
        with patch(
            "browsergym.webarena.instance.WebArenaInstance", return_value=mock_instance
        ), patch(
            "browsergym.experiments.benchmark.utils.get_webarena_verified_task_name",
            return_value="mock_task",
        ), patch(
            "browsergym.experiments.benchmark.utils.massage_tasks"
        ):
            with caplog.at_level(logging.WARNING):
                prepare_backend("webarena_verified")

    assert "Environment reset: SKIPPED (WA_FULL_RESET unset)" in caplog.text
