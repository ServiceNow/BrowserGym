/**
 * Go through all DOM elements in the frame (including shadowDOMs),
 * and cleanup previously stored data in the aria-roledescription attribute.
 */
() => {
    // get all DOM elements in the current frame (does not include elements in shadowDOMs)
    let elements = Array.from(document.querySelectorAll('*'));
    let i = 0;
    while (i < elements.length) {
        const elem = elements[i];
        // add shadowDOM elements to the elements array, in such a way that order is preserved
        // TODO: do we really need the order preserved?
        if (elem.shadowRoot !== null) {
            elements = new Array(
                ...Array.prototype.slice.call(elements, 0, i + 1),
                ...Array.from(elem.shadowRoot.querySelectorAll("*")),
                ...Array.prototype.slice.call(elements, i + 1)
            );
        }
        i++;
        // Hack: remove custom data stored inside the aria-roledescription tag
        //  - elem_global_id: global browsergym identifier
        if (elem.hasAttribute("aria-roledescription")) {
            let content = elem.getAttribute("aria-roledescription");
            // TODO: handle more data if needed
            let n_data_items = 8;  // bid, bbox_left, bbox_top, center_x, center_y, bbox_right, bbox_bottom, is_in_viewport
            let post_data_index = 0;
            for (let j = 0 ; j < n_data_items ; j++) {
                post_data_index = content.indexOf("_", post_data_index) + 1;
            }
            original_content = content.substring(post_data_index);
            if (original_content) {
                elem.setAttribute("aria-roledescription", original_content);
            }
            else {
                elem.removeAttribute("aria-roledescription");
            }

        }
    }
}
