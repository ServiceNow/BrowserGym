import ast
import logging
import numpy as np
import PIL.Image
import PIL.ImageDraw
import PIL.ImageFont
import re

from collections import defaultdict
from bs4 import BeautifulSoup

from browsergym.core.constants import BROWSERGYM_ID_ATTRIBUTE as BID_ATTR
from browsergym.core.constants import BROWSERGYM_VISIBILITY_ATTRIBUTE as VIS_ATTR
from browsergym.core.constants import BROWSERGYM_SETOFMARKS_ATTRIBUTE as SOM_ATTR

logger = logging.getLogger(__name__)

IGNORED_AXTREE_ROLES = ["LineBreak"]

IGNORED_AXTREE_PROPERTIES = (
    "editable",
    "readonly",
    "level",
    "settable",
    "multiline",
    "invalid",
    "focusable",
)


def flatten_dom_to_str(
    dom_snapshot,
    extra_properties: dict = None,
    with_visible: bool = False,
    with_clickable: bool = False,
    with_center_coords: bool = False,
    with_bounding_box_coords: bool = False,
    with_som: bool = False,
    filter_visible_only: bool = False,
    filter_with_bid_only: bool = False,
    filter_som_only: bool = False,
    coord_decimals: int = 0,
    hide_bid_if_invisible: int = False,
) -> str:
    """Formats a DOM snapshot into a string text"""

    def to_string(idx):
        if idx == -1:
            return None
        else:
            return dom_snapshot["strings"][idx]

    def parse_document(document_idx) -> str:
        # adapted from [natbot](https://github.com/nat/natbot)

        nodes = dom_snapshot["documents"][document_idx]["nodes"]
        node_children = defaultdict(lambda: [])

        for node_idx in range(len(nodes["nodeName"])):
            parent_idx = nodes["parentIndex"][node_idx]
            if parent_idx != -1:
                node_children[parent_idx].append(node_idx)

        def dfs(node_idx: int, parent_node_skipped: bool) -> str:

            # https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
            # https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName
            # https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue

            node_type = nodes["nodeType"][node_idx]
            node_name = to_string(nodes["nodeName"][node_idx])
            node_value = to_string(nodes["nodeValue"][node_idx])
            html_before = ""
            html_after = ""
            skip_node = False

            # text nodes: print text content only if parent was not skipped
            if node_type == 3:  # node_name == "#text"
                if not parent_node_skipped and node_value is not None:
                    html_before += node_value

            # CData nodes: print content only if parent was not skipped
            elif node_type == 4:  # node_name == "#cdata-section":
                if not parent_node_skipped and node_value is not None:
                    html_before += f"<!CDATA[[{node_value}]]>"

            # processing instructions, comments, documents, doctypes, document fragments: don't print
            elif node_type in (7, 8, 9, 10, 11):
                skip_node = True

            # now we should have an element node
            else:
                assert node_type == 1

                tag_name = node_name.lower().strip()
                attributes = []  # to be printed as attributes with the tag
                bid = None

                # parse node attributes
                node_attr_idxs = nodes["attributes"][node_idx]
                for i in range(0, len(node_attr_idxs), 2):
                    attr_name = to_string(node_attr_idxs[i])
                    attr_value = to_string(node_attr_idxs[i + 1])

                    # extract and print bid
                    if attr_name == BID_ATTR:
                        bid = attr_value
                    # ignore browsergym attributes
                    elif attr_name in (VIS_ATTR, SOM_ATTR):
                        pass
                    # print other attributes
                    else:
                        if attr_value is None:
                            # attribute value missing
                            attributes.append(f"{attr_name}")
                        else:
                            # attribute value present
                            attributes.append(f'{attr_name}="{attr_value}"')

                skip_node, extra_attributes_to_print = _process_bid(
                    bid,
                    extra_properties=extra_properties,
                    with_visible=with_visible,
                    with_clickable=with_clickable,
                    with_center_coords=with_center_coords,
                    with_bounding_box_coords=with_bounding_box_coords,
                    with_som=with_som,
                    filter_visible_only=filter_visible_only,
                    filter_with_bid_only=filter_with_bid_only,
                    filter_som_only=filter_som_only,
                    coord_decimals=coord_decimals,
                )

                # insert extra attributes before regular attributes
                attributes = extra_attributes_to_print + attributes

                # insert bid as first attribute
                if not (
                    bid is None
                    or (
                        hide_bid_if_invisible
                        and extra_properties.get(bid, {}).get("visibility", 0) < 0.5
                    )
                ):
                    attributes.insert(0, f'bid="{bid}"')

                if not skip_node:
                    # print node opening tag, with its attributes
                    html_before += f"<{tag_name}" + " ".join([""] + attributes) + ">"
                    # print node closing tag
                    html_after += f"</{tag_name}>"

            html = ""
            html += html_before

            # recursively print iframe nodes if any
            if node_idx in nodes["contentDocumentIndex"]["index"]:
                sub_document_idx = nodes["contentDocumentIndex"]["value"][
                    nodes["contentDocumentIndex"]["index"].index(node_idx)
                ]
                html += parse_document(document_idx=sub_document_idx)

            # recursively print children nodes if any
            for child_idx in node_children[node_idx]:
                html += dfs(node_idx=child_idx, parent_node_skipped=skip_node)

            html += html_after

            return html

        html = dfs(node_idx=0, parent_node_skipped=False)

        # Format the HTML document with indentation
        soup = BeautifulSoup(html, "lxml")
        html = soup.prettify()

        return html

    html = parse_document(document_idx=0)

    return html


def _get_coord_str(coord, decimals):
    if isinstance(coord, str):
        coord = list(map(float, ast.literal_eval(coord)))

    coord_format = f".{decimals}f"
    coord_str = ",".join([f"{c:{coord_format}}" for c in coord])
    return f"({coord_str})"


def _process_bid(
    bid,
    extra_properties: dict = None,
    with_visible: bool = False,
    with_clickable: bool = False,
    with_center_coords: bool = False,
    with_bounding_box_coords: bool = False,
    with_som: bool = False,
    filter_visible_only: bool = False,
    filter_with_bid_only: bool = False,
    filter_som_only: bool = False,
    coord_decimals: int = 0,
):
    """
    Process extra attributes and attribute-based filters, for the element with the given bid.

    Returns:
        A flag indicating if the element should be skipped or not (due to filters).
        Attributes to be printed, as a list of "x=y" strings.
    """

    if extra_properties is None:
        if any(
            (
                with_visible,
                with_clickable,
                with_center_coords,
                with_bounding_box_coords,
                with_som,
                filter_visible_only,
                filter_with_bid_only,
                filter_som_only,
            )
        ):
            raise ValueError("extra_properties argument required")
        else:
            extra_properties = {}

    skip_element = False
    attributes_to_print = []

    if bid is None:
        # skip nodes without a bid (if requested)
        if filter_with_bid_only:
            skip_element = True
        if filter_som_only:
            skip_element = True
        if filter_visible_only:
            # element without bid have no visibility mark, they could be visible or non-visible
            # TODO we consider them as visible. Is this what we want? Now that duplicate bids are handled, should we mark all non-html elements?
            pass  # keep elements without visible property
            # skip_element = True  # filter elements without visible property

    # parse extra browsergym properties, if node has a bid
    else:
        if bid in extra_properties:
            node_vis = extra_properties[bid]["visibility"]
            node_bbox = extra_properties[bid]["bbox"]
            node_is_clickable = extra_properties[bid]["clickable"]
            node_in_som = extra_properties[bid]["set_of_marks"]
            node_is_visible = node_vis >= 0.5
            # skip non-visible nodes (if requested)
            if filter_visible_only and not node_is_visible:
                skip_element = True
            if filter_som_only and not node_in_som:
                skip_element = True
            # print extra attributes if requested (with new names)
            if with_som and node_in_som:
                attributes_to_print.insert(0, f"som")
            if with_visible and node_is_visible:
                attributes_to_print.insert(0, f"visible")
            if with_clickable and node_is_clickable:
                attributes_to_print.insert(0, f"clickable")
            if with_center_coords and node_bbox is not None:
                x, y, width, height = node_bbox
                center = (x + width / 2, y + height / 2)
                attributes_to_print.insert(0, f'center="{_get_coord_str(center, coord_decimals)}"')
            if with_bounding_box_coords and node_bbox is not None:
                x, y, width, height = node_bbox
                box = (x, y, x + width, y + height)
                attributes_to_print.insert(0, f'box="{_get_coord_str(box, coord_decimals)}"')

    return skip_element, attributes_to_print


def flatten_axtree_to_str(
    AX_tree,
    extra_properties: dict = None,
    with_visible: bool = False,
    with_clickable: bool = False,
    with_center_coords: bool = False,
    with_bounding_box_coords: bool = False,
    with_som: bool = False,
    skip_generic: bool = True,
    filter_visible_only: bool = False,
    filter_with_bid_only: bool = False,
    filter_som_only: bool = False,
    coord_decimals: int = 0,
    ignored_roles=IGNORED_AXTREE_ROLES,
    ignored_properties=IGNORED_AXTREE_PROPERTIES,
    remove_redundant_static_text: bool = True,
    hide_bid_if_invisible: bool = False,
    hide_all_children: bool = False,
) -> str:
    """Formats the accessibility tree into a string text"""
    node_id_to_idx = {}
    for idx, node in enumerate(AX_tree["nodes"]):
        node_id_to_idx[node["nodeId"]] = idx

    def dfs(node_idx: int, depth: int, parent_node_filtered: bool, parent_node_name: str) -> str:
        tree_str = ""
        node = AX_tree["nodes"][node_idx]
        indent = "\t" * depth
        skip_node = False  # node will not be printed, with no effect on children nodes
        filter_node = False  # node will not be printed, possibly along with its children nodes
        node_role = node["role"]["value"]
        node_name = ""

        if node_role in ignored_roles:
            skip_node = True
            pass
        elif "name" not in node:
            skip_node = True
            pass
        else:
            node_name = node["name"]["value"]
            if "value" in node and "value" in node["value"]:
                node_value = node["value"]["value"]
            else:
                node_value = None

            # extract bid
            bid = node.get("browsergym_id", None)

            # extract node attributes
            attributes = []
            for property in node.get("properties", []):
                if not "value" in property:
                    continue
                if not "value" in property["value"]:
                    continue

                prop_name = property["name"]
                prop_value = property["value"]["value"]

                if prop_name in ignored_properties:
                    continue
                elif prop_name in ("required", "focused", "atomic"):
                    if prop_value:
                        attributes.append(prop_name)
                else:
                    attributes.append(f"{prop_name}={repr(prop_value)}")

            if skip_generic and node_role == "generic" and not attributes:
                skip_node = True

            if hide_all_children and parent_node_filtered:
                skip_node = True

            if node_role == "StaticText":
                if parent_node_filtered:
                    skip_node = True
                elif remove_redundant_static_text and node_name in parent_node_name:
                    skip_node = True
            else:
                filter_node, extra_attributes_to_print = _process_bid(
                    bid,
                    extra_properties=extra_properties,
                    with_visible=with_visible,
                    with_clickable=with_clickable,
                    with_center_coords=with_center_coords,
                    with_bounding_box_coords=with_bounding_box_coords,
                    with_som=with_som,
                    filter_visible_only=filter_visible_only,
                    filter_with_bid_only=filter_with_bid_only,
                    filter_som_only=filter_som_only,
                    coord_decimals=coord_decimals,
                )

                # if either is True, skip the node
                skip_node = skip_node or filter_node

                # insert extra attributes before regular attributes
                attributes = extra_attributes_to_print + attributes

            # actually print the node string
            if not skip_node:
                if node_role == "generic" and not node_name:
                    node_str = f"{node_role}"
                else:
                    node_str = f"{node_role} {repr(node_name.strip())}"

                if not (
                    bid is None
                    or (
                        hide_bid_if_invisible
                        and extra_properties.get(bid, {}).get("visibility", 0) < 0.5
                    )
                ):
                    node_str = f"[{bid}] " + node_str

                if node_value is not None:
                    node_str += f' value={repr(node["value"]["value"])}'

                if attributes:
                    node_str += ", ".join([""] + attributes)

                tree_str += f"{indent}{node_str}"

        for child_node_id in node["childIds"]:
            if child_node_id not in node_id_to_idx or child_node_id == node["nodeId"]:
                continue
            # mark this to save some tokens
            child_depth = depth if skip_node else (depth + 1)
            child_str = dfs(
                node_id_to_idx[child_node_id],
                child_depth,
                parent_node_filtered=filter_node,
                parent_node_name=node_name,
            )
            if child_str:
                if tree_str:
                    tree_str += "\n"
                tree_str += child_str

        return tree_str

    tree_str = dfs(0, 0, False, "")
    return tree_str


def overlay_som(
    screenshot: np.typing.ArrayLike,
    extra_properties: dict,
    fontsize: int = 12,
    linewidth: int = 2,
    tag_margin: int = 2,
):
    img = PIL.Image.fromarray(screenshot).copy()  # make a copy
    img = img.convert(mode="RGBA")
    draw = PIL.ImageDraw.Draw(img)

    font = PIL.ImageFont.load_default(size=fontsize)

    # https://stackoverflow.com/questions/51908563/dotted-or-dashed-line-with-python-pillow/58885306#58885306
    import math  # math has the fastest sqrt

    def linedashed(draw: PIL.ImageDraw.Draw, x0, y0, x1, y1, fill, width, dashlen=4, ratio=3):
        dx = x1 - x0  # delta x
        dy = y1 - y0  # delta y
        # check whether we can avoid sqrt
        if dy == 0:
            vlen = dx
        elif dx == 0:
            vlen = dy
        else:
            vlen = math.sqrt(dx * dx + dy * dy)  # length of line
        xa = dx / vlen  # x add for 1px line length
        ya = dy / vlen  # y add for 1px line length
        step = dashlen * ratio  # step to the next dash
        a0 = 0
        while a0 < vlen:
            a1 = a0 + dashlen
            if a1 > vlen:
                a1 = vlen
            draw.line(
                (x0 + xa * a0, y0 + ya * a0, x0 + xa * a1, y0 + ya * a1), fill=fill, width=width
            )
            a0 += step

    for bid, properties in extra_properties.items():
        if properties["set_of_marks"] and properties["bbox"]:
            x, y, width, height = properties["bbox"]
            x0, y0 = x, y
            x1, y1 = x + width, y + height

            # skip small boxes
            area = (x1 - x0) * (y1 - y0)
            if area < 20:
                logger.warning(
                    f'som overlay: skipping bid "{bid}" due to bbox too small (area={area})'
                )
                continue

            # draw bounding box with dashed lines
            linedashed(draw, x0, y0, x1, y0, fill=(0, 0, 0, 255), width=linewidth)
            linedashed(draw, x1, y0, x1, y1, fill=(0, 0, 0, 255), width=linewidth)
            linedashed(draw, x1, y1, x0, y1, fill=(0, 0, 0, 255), width=linewidth)
            linedashed(draw, x0, y1, x0, y0, fill=(0, 0, 0, 255), width=linewidth)

            # get text box size (left, top, right, bottom)
            tag_box = font.getbbox(
                bid,
            )

            # set tag size, including margins
            tag_size = (
                (tag_box[2] - tag_box[0] + 2 * (tag_margin + 1)),
                (tag_box[3] - tag_box[1] + 2 * (tag_margin + 1)),
            )

            # create tag image with correct size and black background
            tag_img = PIL.Image.new("RGBA", tag_size, "black")
            tag_draw = PIL.ImageDraw.Draw(tag_img)
            # write text with 1px horizontal margin
            tag_draw.text(
                (-tag_box[0] + tag_margin + 1, -tag_box[1] + tag_margin + 1),
                bid,
                font=font,
                fill=(255, 255, 255, 255),
                spacing=0,
            )
            tag_draw.rectangle(
                (0, 0, tag_size[0] - 1, tag_size[1] - 1),
                fill=None,
                outline=(255, 255, 255, 255),
                width=1,
            )

            # draw tag in the source image, upper left of the bounding box
            tag_pos = (x + 0, y - tag_size[1] / 2 + 4)
            tag_pos = list(map(round, tag_pos))
            img.paste(tag_img, tag_pos)

    # convert to RGB (3 channels)
    img = img.convert(mode="RGB")
    # convert to a numpy array
    img = np.array(img)

    return img


def prune_html(html):
    html = re.sub(r"\n", " ", html)
    # remove html comments
    html = re.sub(r"<!--(.*?)-->", "", html, flags=re.MULTILINE)

    soup = BeautifulSoup(html, "lxml")
    for tag in reversed(soup.find_all()):
        # remove body and html tags (not their content)
        if tag.name in ("html", "body"):
            tag.unwrap()
        # remove useless tags
        elif tag.name in ("style", "link", "script", "br"):
            tag.decompose()
        # remove / unwrap structural tags
        elif tag.name in ("div", "span", "i", "p") and len(tag.attrs) == 1 and tag.has_attr("bid"):
            if not tag.contents:
                tag.decompose()
            else:
                tag.unwrap()

    html = soup.prettify()

    return html
