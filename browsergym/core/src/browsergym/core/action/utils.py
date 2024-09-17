import playwright.sync_api
from typing import Literal


def get_elem_by_bid(
    page: playwright.sync_api.Page, bid: str, scroll_into_view: bool = False
) -> playwright.sync_api.Locator:
    """
    Parse the given bid to sequentially locate every nested frame leading to the bid, then
    locate the bid element. Bids are expected to take the form "abDb123", which means
    the element abDb123 is located inside frame abDAb, which is located inside frame abDA,
    which is located inside frame a, which is located inside the page's main frame.

    Args:
        bid: the browsergym id (playwright testid) of the page element.
        scroll_into_view: try to scroll element into view, unless it is completely visible.

    Returns:
        Playwright element.
        Bounding box of the element.
    """
    if not isinstance(bid, str):
        raise ValueError(f"expected a string, got {repr(bid)}")

    current_frame = page

    # dive into each nested frame, to the frame where the element is located
    i = 0
    while bid[i:] and not bid[i:].isnumeric():
        i += 1
        # allow multi-character frame ids such as aA, bCD etc.
        while bid[i:] and bid[i].isalpha() and bid[i].isupper():
            i += 1
        frame_bid = bid[:i]  # bid of the next frame to select
        frame_elem = current_frame.get_by_test_id(frame_bid)
        if not frame_elem.count():
            raise ValueError(f'Could not find element with bid "{bid}"')
        if scroll_into_view:
            frame_elem.scroll_into_view_if_needed(timeout=500)
        current_frame = frame_elem.frame_locator(":scope")

    # finally, we should have selected the frame where the target element is
    elem = current_frame.get_by_test_id(bid)
    if not elem.count():
        raise ValueError(f'Could not find element with bid "{bid}"')
    if scroll_into_view:
        elem.scroll_into_view_if_needed(timeout=500)
    return elem


def highlight_by_box(
    page: playwright.sync_api.Page, box: dict, color: Literal["blue", "red"] = "blue"
):
    """Highlights the target element based on its bounding box attributes."""

    assert color in ("blue", "red")

    if box:
        left, top, width, height = box["x"], box["y"], box["width"], box["height"]
        page.evaluate(
            f"""\
const overlay = document.createElement('div');
document.body.appendChild(overlay);
overlay.setAttribute('style', `
    all: initial;
    position: fixed;
    border: 2px solid transparent;  /* Start with transparent border */
    borderRadius: 10px;  /* Add rounded corners */
    boxShadow: 0 0 0px {color};  /* Initial boxShadow with 0px spread */
    left: {left - 2}px;  /* Adjust left position to accommodate initial shadow spread */
    top: {top - 2}px;  /* Adjust top position likewise */
    width: {width}px;
    height: {height}px;
    z-index: 2147483646; /* Maximum value - 1 */
    pointerEvents: none; /* Ensure the overlay does not interfere with user interaction */
`);

// Animate the boxShadow to create a "wave" effect
let spread = 0;  // Initial spread radius of the boxShadow
const waveInterval = setInterval(() => {{
    spread += 10;  // Increase the spread radius to simulate the wave moving outward
    overlay.style.boxShadow = `0 0 40px ${{spread}}px {color}`;  // Update boxShadow to new spread radius
    overlay.style.opacity = 1 - spread / 38;  // Gradually decrease opacity to fade out the wave
    if (spread >= 38) {{  // Assuming 76px ~ 2cm spread radius
        clearInterval(waveInterval);  // Stop the animation once the spread radius reaches 2cm
        document.body.removeChild(overlay);  // Remove the overlay from the document
    }}
}}, 200);  // Adjust the interval as needed to control the speed of the wave animation
"""
        )
        # Wait a bit to let users see the highlight
        page.wait_for_timeout(1000)  # Adjust delay as needed


def smooth_move_visual_cursor_to(
    page: playwright.sync_api.Page, x: float, y: float, speed: float = 400
):
    """
    Smoothly moves the visual cursor to a specific point, with constant
    movement speed.

    Args:
        x: target location X coordinate (in viewport pixels)
        y: target location Y coordinate (in viewport pixels)
        speed: cursor speed (in pixels per second)
    """
    movement_time = page.evaluate(
        """\
    ([targetX, targetY, speed]) => {

        // create cursor if needed
        if (!("browsergym_visual_cursor" in window)) {
            if (window.trustedTypes && window.trustedTypes.createPolicy) {
                window.trustedTypes.createPolicy('default', {
                    createHTML: (string, sink) => string
                });
            }
            let cursor = document.createElement('div');
            cursor.setAttribute('id', 'browsergym-visual-cursor');
            cursor.innerHTML = `
                <svg width="50px" height="50px" viewBox="213 106 713 706" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M213.333 106.667L426.667 853.333 512 512 853.333 426.667 213.333 106.667z" fill="blue"/>
                </svg>
`;
            cursor.setAttribute('style', `
                all: initial;
                position: fixed;
                opacity: 0.7; /* Slightly transparent */
                z-index: 2147483647; /* Maximum value */
                pointer-events: none; /* Ensures the SVG doesn't interfere with page interactions */
            `);

            // Calculate center position within the viewport
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            cursor.style.left = `${centerX}px`;
            cursor.style.top = `${centerY}px`;

            // save cursor element
            window.browsergym_visual_cursor = cursor;
            window.browsergym_visual_cursor_n_owners = 0;
        }

        // recover cursor
        let cursor = window.browsergym_visual_cursor;

        // attach cursor to document
        document.body.appendChild(cursor);
        window.browsergym_visual_cursor_n_owners += 1;

        x = parseFloat(cursor.style.left);
        y = parseFloat(cursor.style.top);

        dx = targetX - x;
        dy = targetY - y;
        dist = Math.hypot(dx, dy);
        movement_time = (dist / speed) * 1000;  // seconds to milliseconds
        still_wait_time = 1000;

        // Adjust steps based on distance to keep movement speed consistent
        // 1 step per 10 pixels of distance, adjust as needed
        steps = Math.max(1, Math.trunc(dist / 10));

        step_dx = dx / steps;
        step_dy = dy / steps;
        step_dist = dist / steps;
        step_wait_time = Math.max(10, movement_time / steps);

        let step = 0;
        let time_still = 0;
        const cursorInterval = setInterval(() => {
            // move cursor
            if (step < steps) {
                x += step_dx;
                y += step_dy;
                cursor.style.left = `${x}px`;
                cursor.style.top = `${y}px`;
            }
            // still cursor (wait a bit)
            else if (time_still < still_wait_time) {
                time_still += step_wait_time;
            }
            // stop and detach cursor
            else {
                clearInterval(cursorInterval);
                window.browsergym_visual_cursor_n_owners -= 1;
                if (window.browsergym_visual_cursor_n_owners <= 0) {
                    document.body.removeChild(cursor);

                }
            }
            step += 1;
        }, step_wait_time);

        return movement_time;
    }""",
        [x, y, speed],
    )
    page.wait_for_timeout(movement_time)


def check_for_overlay(
    page: playwright.sync_api.Page, bid: str, element: playwright.sync_api.ElementHandle, box: dict
):
    if not element:
        return False

    visibility = element.get_attribute("browsergym_visibility_ratio")
    if visibility is not None:
        return float(visibility) >= 0.5

    """Checks if a given element is the topmost element at its center position by default.
    If check_corners is True, it checks if any of the corners is visible."""
    if box:
        # corners
        points_to_check = [
            (box["x"], box["y"]),
            (box["x"] + box["width"], box["y"]),
            (box["x"], box["y"] + box["height"]),
            (box["x"] + box["width"], box["y"] + box["height"]),
        ]

        for x, y in points_to_check:
            # Execute JavaScript to find the topmost element at the point.
            top_element = page.evaluate(
                f"""() => {{
                const el = document.elementFromPoint({x}, {y});
                return el ? el.outerHTML : '';
            }}"""
            )

            # Check if the topmost element is the element we're interested in.
            if top_element and bid in top_element:
                return True

    return False


def add_demo_mode_effects(
    page: playwright.sync_api.Page,
    elem: playwright.sync_api.ElementHandle,
    bid: str,
    demo_mode: Literal["off", "default", "all_blue", "only_visible_elements"],
    move_cursor: bool = True,
):
    if demo_mode == "off":
        return

    """Adds visual effects to the target element"""
    box = elem.bounding_box()
    # box = extract_bounds_cdp(page, bid)
    if box:
        center_x, center_y = box["x"] + box["width"] / 2, box["y"] + box["height"] / 2
        is_top_element = check_for_overlay(page, bid, elem, box)

        if demo_mode == "only_visible_elements":
            if not is_top_element:
                return
            else:
                color = "blue"

        elif demo_mode == "default":
            if is_top_element:
                color = "blue"
            else:
                color = "red"

        elif demo_mode == "all_blue":
            color = "blue"

        if move_cursor:
            smooth_move_visual_cursor_to(page, center_x, center_y)
        highlight_by_box(page, box, color=color)
