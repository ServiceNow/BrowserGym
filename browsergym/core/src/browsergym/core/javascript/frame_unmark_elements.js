/**
 * Go through all DOM elements in the frame (including shadowDOMs),
 * and cleanup previously stored data in ARIA attributes.
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
        // Hack: remove custom data stored in ARIA attributes
        //  - elem_global_id: global browsergym identifier
        pop_bid_from_attribute(elem, "aria-description");
        pop_bid_from_attribute(elem, "aria-roledescription");  // fallback for generic nodes
    }
}

function pop_bid_from_attribute(elem, attr) {
    let bid_regex = /^browsergym_id[^\s]*\s/;
    if (elem.hasAttribute(attr)) {
        let content = elem.getAttribute(attr);
        let original_content = content.replace(bid_regex, '');
        if (original_content) {
            elem.setAttribute(attr, original_content);
        }
        else {
            elem.removeAttribute(attr);
        }
    }
}
