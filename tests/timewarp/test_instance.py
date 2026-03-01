import os
import pytest

# Only run these tests if TimeWarp environment variables are set
pytestmark = pytest.mark.skipif(
    not os.environ.get("TW_SHOPPING"),
    reason="TimeWarp environment variables not set",
)


def test_timewarp_instance_import():
    """Test that TimeWarpInstance can be imported and instantiated."""
    from browsergym.timewarp.instance import TimeWarpInstance

    instance = TimeWarpInstance()
    assert instance is not None
    assert hasattr(instance, "urls")
    assert hasattr(instance, "home_url")
    assert hasattr(instance, "credentials")


def test_timewarp_instance_urls():
    """Test that TimeWarpInstance has the expected URLs."""
    from browsergym.timewarp.instance import TimeWarpInstance

    instance = TimeWarpInstance()
    expected_sites = ["reddit", "gitlab", "shopping", "shopping_admin", "wikipedia", "map"]
    for site in expected_sites:
        assert site in instance.urls
        assert instance.urls[site]  # URL should not be empty



