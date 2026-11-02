"""Tests for how the observation formatters treat the hide_bid_if_invisible flag.

These run on hand-built snapshots rather than a live page, so they need no browser.
"""

import pytest

from browsergym.core.constants import BROWSERGYM_ID_ATTRIBUTE as BID_ATTR
from browsergym.utils.obs import flatten_axtree_to_str, flatten_dom_to_str


def _axtree(bid: str) -> dict:
    return {
        "nodes": [
            {
                "nodeId": "1",
                "role": {"value": "RootWebArea"},
                "name": {"value": "a page"},
                "childIds": ["2"],
            },
            {
                "nodeId": "2",
                "role": {"value": "button"},
                "name": {"value": "Submit"},
                "childIds": [],
                "browsergym_id": bid,
            },
        ]
    }


def _dom_snapshot(bid: str) -> dict:
    strings = ["#document", "html", "body", "button", BID_ATTR, bid]
    return {
        "strings": strings,
        "documents": [
            {
                "nodes": {
                    "nodeType": [9, 1, 1, 1],
                    "nodeName": [0, 1, 2, 3],
                    "nodeValue": [-1, -1, -1, -1],
                    "parentIndex": [-1, 0, 1, 2],
                    "attributes": [[], [], [], [4, 5]],
                    "contentDocumentIndex": {"index": [], "value": []},
                },
            }
        ],
    }


@pytest.mark.parametrize(
    ("flatten", "build"),
    [(flatten_axtree_to_str, _axtree), (flatten_dom_to_str, _dom_snapshot)],
    ids=["axtree", "dom"],
)
def test_hide_bid_if_invisible_without_extra_properties_is_an_error(flatten, build):
    """The flag cannot be honoured without visibility data, so say so, as the other flags do."""
    with pytest.raises(ValueError, match="extra_properties argument required"):
        flatten(build("42"), hide_bid_if_invisible=True)


@pytest.mark.parametrize(
    ("flatten", "build"),
    [(flatten_axtree_to_str, _axtree), (flatten_dom_to_str, _dom_snapshot)],
    ids=["axtree", "dom"],
)
def test_hide_bid_if_invisible_hides_only_a_recorded_invisible_bid(flatten, build):
    """A bid with no recorded visibility stays, matching how _process_bid treats one."""
    visible = {"42": {"visibility": 1.0, "bbox": None, "clickable": False, "set_of_marks": False}}
    invisible = {"42": {"visibility": 0.0, "bbox": None, "clickable": False, "set_of_marks": False}}

    assert "42" in flatten(build("42"), extra_properties=visible, hide_bid_if_invisible=True)
    assert "42" not in flatten(build("42"), extra_properties=invisible, hide_bid_if_invisible=True)
    # no entry at all: nothing says it is invisible, so the bid is kept
    assert "42" in flatten(build("42"), extra_properties={}, hide_bid_if_invisible=True)
