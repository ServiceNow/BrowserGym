import base64
import io
import logging
import numpy as np
import playwright.sync_api
import PIL.Image
import pkgutil
import re

from .constants import BROWSERGYM_ID_ATTRIBUTE as BID_ATTR

MARK_FRAMES_MAX_TRIES = 3


def _pre_extract(page: playwright.sync_api.Page):
    """
    pre-extraction routine, marks dom elements (set bid and dynamic attributes like value and checked)
    """
    js_frame_mark_elements = pkgutil.get_data(__name__, "javascript/frame_mark_elements.js").decode(
        "utf-8"
    )

    # we can't run this loop in JS due to Same-Origin Policy
    # (can't access the content of an iframe from a another one)
    def mark_frames_recursive(
        frame,
        global_iframe_position,
        iframe_offset=None,
    ):
        # get the bid of the parent frame element
        try:
            parent_bid = frame.frame_element().get_attribute(BID_ATTR)
        except:
            parent_bid = ""
        # mark all DOM elements in the frame (it will use the parent frame element's bid as a prefix)
        super_iframe_offset = frame.evaluate(
            js_frame_mark_elements,
            [
                parent_bid,
                BID_ATTR,
                global_iframe_position,
                iframe_offset,
            ],
        )

        # recursively mark all descendant frames
        for _, sub_frame in enumerate(frame.child_frames):
            if not sub_frame.is_detached():
                is_frame_hidden = sub_frame.evaluate(
                    """ () => {
    const style = window.getComputedStyle(document.documentElement);
    const is_null_size = document.documentElement.offsetWidth <= 0 || document.documentElement.offsetHeight <= 0;
    return style.display === 'none' || style.visibility === 'hidden' || is_null_size;
}"""
                )
                if not is_frame_hidden:
                    sub_iframe_position = {
                        key: sub_frame.frame_element().bounding_box()[key] for key in ["x", "y"]
                    }
                    mark_frames_recursive(sub_frame, sub_iframe_position, super_iframe_offset)

    # mark all frames recursively
    global_iframe_position = {"x": 0, "y": 0}

    mark_frames_recursive(page.main_frame, global_iframe_position)


def _post_extract(page: playwright.sync_api.Page):
    js_frame_unmark_elements = pkgutil.get_data(
        __name__, "javascript/frame_unmark_elements.js"
    ).decode("utf-8")

    # we can't run this loop in JS due to Same-Origin Policy
    # (can't access the content of an iframe from a another one)
    for frame in page.frames:
        try:
            frame.evaluate(js_frame_unmark_elements)
        except playwright.sync_api.Error as e:
            if "Frame was detached" in str(e):
                pass
            else:
                raise e


def extract_screenshot(page: playwright.sync_api.Page):
    """
    Extracts the screenshot image of a Playwright page using Chrome DevTools Protocol.

    Args:
        page: the playwright page of which to extract the screenshot.

    Returns:
        A screenshot of the page, in the form of a 3D array (height, width, rgb).

    """

    cdp = page.context.new_cdp_session(page)
    cdp_answer = cdp.send(
        "Page.captureScreenshot",
        {
            "format": "png",
        },
    )
    cdp.detach()

    # bytes of a png file
    png_base64 = cdp_answer["data"]
    png_bytes = base64.b64decode(png_base64)
    with io.BytesIO(png_bytes) as f:
        # load png as a PIL image
        img = PIL.Image.open(f)
        # convert to RGB (3 channels)
        img = img.convert(mode="RGB")
        # convert to a numpy array
        img = np.array(img)

    return img


# TODO: handle more data items if needed
__BID_EXPR = r"([-0-9]+)"
__FLOAT_EXPR = r"([+-]?(?:[0-9]*[.])?[0-9]+)"
__BOOL_EXPR = r"([01])"
# bid, bbox_left, bbox_top, center_x, center_y, bbox_right, bbox_bottom, is_in_viewport
__DATA_REGEXP = re.compile(
    __BID_EXPR
    + r"_"
    + __FLOAT_EXPR
    + r"_"
    + __FLOAT_EXPR
    + r"_"
    + __FLOAT_EXPR
    + r"_"
    + __FLOAT_EXPR
    + r"_"
    + __FLOAT_EXPR
    + r"_"
    + __FLOAT_EXPR
    + r"_"
    + __BOOL_EXPR
    + r"_"
    + r"(.*)"
)


def extract_data_items_from_aria(string):
    """
    Utility function to extract temporary data stored in the "aria-roledescription" attribute of a node
    """

    match = __DATA_REGEXP.fullmatch(string)
    if not match:
        logging.warning(
            f'Data items could not be extracted from "aria-roledescription" attribute: {string}'
        )
        return [], string

    groups = match.groups()
    data_items = groups[:-1]
    original_aria = groups[-1]
    return data_items, original_aria


def extract_dom_snapshot(
    page: playwright.sync_api.Page,
    computed_styles=[],
    include_dom_rects: bool = True,
    include_paint_order: bool = True,
    temp_data_cleanup: bool = True,
):
    """
    Extracts the DOM snapshot of a Playwright page using Chrome DevTools Protocol.

    Args:
        page: the playwright page of which to extract the screenshot.
        computed_styles: whitelist of computed styles to return.
        include_dom_rects: whether to include DOM rectangles (offsetRects, clientRects, scrollRects) in the snapshot.
        include_paint_order: whether to include paint orders in the snapshot.
        temp_data_cleanup: whether to clean up the temporary data stored in the "aria-roledescription" attribute.

    Returns:
        A document snapshot, including the full DOM tree of the root node (including iframes,
        template contents, and imported documents) in a flattened array, as well as layout
        and white-listed computed style information for the nodes. Shadow DOM in the returned
        DOM tree is flattened.

    """
    cdp = page.context.new_cdp_session(page)
    dom_snapshot = cdp.send(
        "DOMSnapshot.captureSnapshot",
        {
            "computedStyles": computed_styles,
            "includeDOMRects": include_dom_rects,
            "includePaintOrder": include_paint_order,
        },
    )
    cdp.detach()

    # if requested, remove temporary data stored in the "aria-roledescription" attribute of each node
    if temp_data_cleanup:
        try:
            target_attr_name_id = dom_snapshot["strings"].index("aria-roledescription")
        except ValueError:
            target_attr_name_id = -1
        # run the cleanup only if the "aria-roledescription" string is present
        if target_attr_name_id > -1:
            processed_string_ids = set()
            for document in dom_snapshot["documents"]:
                for node_attributes in document["nodes"]["attributes"]:
                    i = 0
                    # find the "aria-roledescription" attribute, if any
                    while i < len(node_attributes):
                        attr_name_id = node_attributes[i]
                        attr_value_id = node_attributes[i + 1]
                        if attr_name_id == target_attr_name_id:
                            attr_value = dom_snapshot["strings"][attr_value_id]
                            # remove any data stored in the "aria-roledescription" attribute
                            if attr_value_id not in processed_string_ids:
                                _, new_attr_value = extract_data_items_from_aria(attr_value)
                                dom_snapshot["strings"][
                                    attr_value_id
                                ] = new_attr_value  # update the string in the metadata
                                processed_string_ids.add(
                                    attr_value_id
                                )  # mark string as processed (in case several "aria-roledescription" attributes share the same value string)
                            # remove "aria-roledescription" attribute (name and value) if empty
                            if new_attr_value == "":
                                del node_attributes[i : i + 2]
                            # once "aria-roledescription" is found, exit the search
                            break
                        i += 2

    return dom_snapshot


def extract_all_frame_axtrees(page: playwright.sync_api.Page):
    """
    Extracts the AXTree of all frames (main document and iframes) of a Playwright page using Chrome DevTools Protocol.

    Args:
        page: the playwright page of which to extract the frame AXTrees.

    Returns:
        A dictionnary of AXTrees (as returned by Chrome DevTools Protocol) indexed by frame IDs.

    """
    cdp = page.context.new_cdp_session(page)

    # extract the frame tree
    frame_tree = cdp.send(
        "Page.getFrameTree",
        {},
    )

    # extract all frame IDs into a list
    # (breadth-first-search through the frame tree)
    frame_ids = []
    root_frame = frame_tree["frameTree"]
    frames_to_process = [root_frame]
    while frames_to_process:
        frame = frames_to_process.pop()
        frames_to_process.extend(frame.get("childFrames", []))
        # extract the frame ID
        frame_id = frame["frame"]["id"]
        frame_ids.append(frame_id)

    # extract the AXTree of each frame
    frame_axtrees = {
        frame_id: cdp.send(
            "Accessibility.getFullAXTree",
            {"frameId": frame_id},
        )
        for frame_id in frame_ids
    }

    cdp.detach()

    # extract browsergym properties (bids, coordinates, etc.) from the "roledescription" property ("aria-roledescription" attribute)
    for ax_tree in frame_axtrees.values():
        for node in ax_tree["nodes"]:
            # look for the "roledescription" property
            if "properties" in node:
                for i, prop in enumerate(node["properties"]):
                    if prop["name"] == "roledescription":
                        data_items, new_value = extract_data_items_from_aria(prop["value"]["value"])
                        prop["value"]["value"] = new_value
                        # remove the "roledescription" property if empty
                        if new_value == "":
                            del node["properties"][i]
                        # add all extracted "browsergym" properties to the AXTree
                        if data_items:
                            (
                                browsergym_id,
                                left,
                                top,
                                center_x,
                                center_y,
                                right,
                                bottom,
                                is_in_viewport,
                            ) = data_items
                            node["properties"].append(
                                {
                                    "name": "browsergym_id",
                                    "value": {
                                        "type": "string",
                                        "value": browsergym_id,
                                    },
                                }
                            )
                            node["properties"].append(
                                {
                                    "name": "browsergym_center",
                                    "value": {
                                        "type": "list",
                                        "value": (float(center_x), float(center_y)),
                                    },
                                }
                            )
                            node["properties"].append(
                                {
                                    "name": "browsergym_bounding_box",
                                    "value": {
                                        "type": "list",
                                        "value": (
                                            float(left),
                                            float(top),
                                            float(right),
                                            float(bottom),
                                        ),
                                    },
                                }
                            )
                            node["properties"].append(
                                {
                                    "name": "browsergym_is_in_viewport",
                                    "value": {
                                        "type": "boolean",
                                        "value": bool(is_in_viewport == "1"),
                                    },
                                }
                            )
    return frame_axtrees


def extract_merged_axtree(page: playwright.sync_api.Page):
    """
    Extracts the merged AXTree of a Playwright page (main document and iframes AXTrees merged) using Chrome DevTools Protocol.

    Args:
        page: the playwright page of which to extract the merged AXTree.

    Returns:
        A merged AXTree (same format as those returned by Chrome DevTools Protocol).

    """
    frame_axtrees = extract_all_frame_axtrees(page)

    cdp = page.context.new_cdp_session(page)

    # merge all AXTrees into one
    merged_axtree = {"nodes": []}
    for ax_tree in frame_axtrees.values():
        merged_axtree["nodes"].extend(ax_tree["nodes"])
        # connect each iframe node to the corresponding AXTree root node
        for node in ax_tree["nodes"]:
            if node["role"]["value"] == "Iframe":
                frame_id = cdp.send(
                    "DOM.describeNode", {"backendNodeId": node["backendDOMNodeId"]}
                )["node"]["frameId"]
                # it seems Page.getFrameTree() from CDP omits certain Frames (empty frames?)
                # if a frame is not found in the extracted AXTrees, we just ignore it
                if frame_id in frame_axtrees:
                    # root node should always be the first node in the AXTree
                    frame_root_node = frame_axtrees[frame_id]["nodes"][0]
                    assert frame_root_node["frameId"] == frame_id
                    node["childIds"].append(frame_root_node["nodeId"])
                else:
                    logging.warning(f"Extracted AXTree does not contain frameId '{frame_id}'")

    cdp.detach()

    return merged_axtree


def extract_focused_element_bid(page: playwright.sync_api.Page):
    # this JS code will dive through ShadowDOMs
    extract_focused_element_with_bid_script = """\
() => {
    // This recursive function traverses shadow DOMs
    function getActiveElement(root) {
        const active_element = root.activeElement;

        if (!active_element) {
            return null;
        }

        if (active_element.shadowRoot) {
            return getActiveElement(active_element.shadowRoot);
        } else {
            return active_element;
        }
    }
    return getActiveElement(document);
}"""
    # this playwright code will dive through iFrames
    frame = page
    focused_bid = ""
    while frame:
        focused_element = frame.evaluate_handle(
            extract_focused_element_with_bid_script, BID_ATTR
        ).as_element()
        if focused_element:
            frame = focused_element.content_frame()
            focused_bid = focused_element.get_attribute(BID_ATTR)
        else:
            frame = None

    return focused_bid
