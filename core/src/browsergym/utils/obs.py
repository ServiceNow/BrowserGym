import ast

from collections import defaultdict
from bs4 import BeautifulSoup

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
    DOM_tree,
    with_visible: bool = False,
    with_center_coords: bool = False,
    with_bounding_box_coords: bool = False,
    filter_visible_only: bool = False,
    coord_decimals: int = 0,
) -> str:
    """Formats a DOM snapshot into a string text"""

    coord_format = f":0.{coord_decimals}f"

    def parse_DOM(document_idx) -> str:
        # adopted from [natbot](https://github.com/nat/natbot)

        strings = DOM_tree["strings"]
        nodes = DOM_tree["documents"][document_idx]["nodes"]
        node_iframe_link = nodes["contentDocumentIndex"]
        graph = defaultdict(lambda: [])

        for node_idx in range(len(nodes["nodeName"])):
            parent_idx = nodes["parentIndex"][node_idx]
            if parent_idx != -1:
                graph[parent_idx].append(node_idx)

        def dfs(idx: int) -> str:
            node_name = strings[nodes["nodeName"][idx]]
            can_skip = (
                "#" in node_name or "::" in node_name or node_name == "html"
            )  # We skip the root <DOCTYPE html> node
            node_name = node_name.lower().strip()
            html = ""

            # print node opening tag
            if not can_skip:
                html += f"<{node_name}"
                node_attr_idxs = nodes["attributes"][idx]
                if node_attr_idxs:
                    for i in range(0, len(node_attr_idxs), 2):
                        attr_name = strings[node_attr_idxs[i]]

                        # filter visible elements if requested
                        if (
                            filter_visible_only
                            and attr_name == "browsergym_is_in_viewport"
                            and strings[node_attr_idxs[i + 1]] == "0"
                        ):
                            can_skip = True
                            break

                        # print browsergym attributes if requested (with new names)
                        if attr_name == "browsergym_is_in_viewport":
                            if with_visible:
                                attr_value = strings[node_attr_idxs[i + 1]]
                                html += f' is_visible="{attr_value}"'
                        elif attr_name == "browsergym_center":
                            if with_center_coords:
                                attr_value = strings[node_attr_idxs[i + 1]]
                                html += f' center="{_get_coord_str(attr_value, coord_decimals)}"'

                        elif attr_name == "browsergym_bounding_box":
                            if with_bounding_box_coords:
                                attr_value = strings[node_attr_idxs[i + 1]]
                                html += f' box="{_get_coord_str(attr_value, coord_decimals)}"'

                        # print other attributes
                        else:
                            if node_attr_idxs[i + 1] >= 0:
                                attr_value = strings[node_attr_idxs[i + 1]]
                                # attribute value present
                                html += f' {attr_name}="{attr_value}"'
                            else:
                                # attribute value missing
                                html += f" {attr_name}"

                html += f">"
            if can_skip:
                html = ""
            # print inner text
            node_value_idx = nodes["nodeValue"][idx]
            if node_value_idx >= 0:
                html += " ".join(strings[node_value_idx].split())

            # recursively print iframe nodes if any
            if idx in node_iframe_link["index"]:
                sub_document_idx = node_iframe_link["value"][node_iframe_link["index"].index(idx)]
                html += parse_DOM(document_idx=sub_document_idx)

            # recursively print children nodes
            for child_idx in graph[idx]:
                html += dfs(child_idx)

            # print node closing tag
            if not can_skip:
                html += f"</{node_name}>"

            return html

        html = dfs(idx=0)

        # Format the HTML document with indentation
        soup = BeautifulSoup(html, "lxml")
        html = soup.prettify()

        return html

    html = parse_DOM(0)

    return html


def _remove_redundant_static_text(ax_tree: str) -> str:
    """Removes redundant `StaticText` from the accessibility tree"""
    new_lines = []
    lines = ax_tree.split("\n")
    for line in lines:
        if line.strip().startswith("StaticText"):
            content = line.split("StaticText")[1].strip().strip("'")
            if content in "\n".join(new_lines[-3:]):
                continue
        new_lines.append(line)
    return "\n".join(new_lines)


def _get_coord_str(coord, decimals):
    if isinstance(coord, str):
        coord = list(map(float, ast.literal_eval(coord)))

    coord_format = f".{decimals}f"
    coord_str = ",".join([f"{c:{coord_format}}" for c in coord])
    return f"({coord_str})"


def flatten_axtree_to_str(
    AX_tree,
    with_visible: bool = False,
    with_center_coords: bool = False,
    with_bounding_box_coords: bool = False,
    filter_visible_only: bool = False,
    coord_decimals: int = 0,
    ignore_roles=IGNORED_AXTREE_ROLES,
    ignored_properties=IGNORED_AXTREE_PROPERTIES,
    remove_rdundant_static_text: bool = True,
) -> str:
    """Formats the accessibility tree into a string text"""
    node_id_to_idx = {}
    for idx, node in enumerate(AX_tree["nodes"]):
        node_id_to_idx[node["nodeId"]] = idx

    def dfs(idx: int, depth: int) -> str:
        tree_str = ""
        node = AX_tree["nodes"][idx]
        indent = "\t" * depth
        valid_node = True
        role = node["role"]["value"]

        if role in ignore_roles:
            pass
        elif "name" not in node:
            pass
        else:
            print_node = True
            name = node["name"]["value"]
            node_str = f"{role} {repr(name.strip())}"

            if "value" in node and "value" in node["value"]:
                node_str += f' value: {repr(node["value"]["value"])}'

            properties = []
            for property in node.get("properties", []):
                if not "value" in property:
                    continue
                if not "value" in property["value"]:
                    continue

                prop_name, value = property["name"], property["value"]["value"]
                if prop_name == "browsergym_id":
                    node_str = f"[{value}] " + node_str
                elif prop_name == "browsergym_center":
                    if with_center_coords:
                        coord_str = _get_coord_str(value, coord_decimals)
                        node_str += f", center={coord_str}"
                elif prop_name == "browsergym_bounding_box":
                    if with_bounding_box_coords:
                        coord_str = _get_coord_str(value, coord_decimals)
                        node_str += f", box={coord_str}"
                elif prop_name == "browsergym_is_in_viewport":
                    # filter visible elements if requested
                    if filter_visible_only and not value:
                        print_node = False
                        break
                    if with_visible:
                        visible_str = "visible" if value else "hidden"
                        node_str += f", {visible_str}"
                elif prop_name in ("required", "focused", "atomic"):
                    if value:
                        properties.append(prop_name)
                elif prop_name not in ignored_properties:
                    properties.append(f"{prop_name}={repr(value)}")

            if role in ["generic"] and not properties:
                print_node = False

            if properties:
                node_str += " " + ", ".join(properties)

            if print_node:
                tree_str += f"{indent}{node_str}"

        for _, child_node_id in enumerate(node["childIds"]):
            if child_node_id not in node_id_to_idx or child_node_id == node["nodeId"]:
                continue
            # mark this to save some tokens
            child_depth = depth + 1 if valid_node else depth
            child_str = dfs(node_id_to_idx[child_node_id], child_depth)
            if child_str.strip():
                if tree_str.strip():
                    tree_str += "\n"
                tree_str += child_str

        return tree_str

    tree_str = dfs(0, 0)
    if remove_rdundant_static_text:
        tree_str = _remove_redundant_static_text(tree_str)
    return tree_str
