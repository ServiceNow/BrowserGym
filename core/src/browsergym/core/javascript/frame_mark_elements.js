/**
 * Go through all DOM elements in the frame (including shadowDOMs), give them unique browsergym
 * identifiers (bid), and store custom data in the aria-roledescription attribute.
 */
var { innerWidth: windowWidth, innerHeight: windowHeight } = window;
var scrollX = window.scrollX || document.documentElement.scrollLeft;
var scrollY = window.scrollY || document.documentElement.scrollTop;

([parent_bid, bid_attr_name, iframe_position, super_iframe_offset]) => {

    // standard html tags
    // https://www.w3schools.com/tags/
    const html_tags = [
        "a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio",
        "b", "base", "basefont", "bdi", "bdo", "big", "blockquote", "body", "br", "button",
        "canvas", "caption", "center", "cite", "code", "col", "colgroup", "data", "datalist",
        "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed",
        "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset",
        "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i",
        "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main",
        "map", "mark", "menu", "meta", "meter", "nav", "noframes", "noscript", "object",
        "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress",
        "q", "rp", "rt", "ruby", "s", "samp", "script", "search", "section", "select",
        "small", "source", "span", "strike", "strong", "style", "sub", "summary", "sup",
        "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead",
        "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"
    ];

    if (super_iframe_offset == null) {

        iframe_offset = { x: scrollX, y: scrollY, right: windowWidth, bottom: windowHeight };
    }
    else {
        [super_x, super_y, super_right, super_bottom] = [super_iframe_offset["x"], super_iframe_offset["y"], super_iframe_offset["right"], super_iframe_offset["bottom"]];

        x = Math.max(-iframe_position.x, 0);
        y = Math.max(-iframe_position.y, 0);
        right = Math.min(...[super_right, windowWidth,  super_right - iframe_position.x]);
        bottom = Math.min(...[super_bottom, windowHeight, super_bottom - iframe_position.y]);
        iframe_offset = { x: x, y: y, right: right, bottom: bottom };
    }

    let browsergym_first_visit = false;
    // if no yet set, set the frame (local) element counter to 0
    if (!("browsergym_frame_elem_counter" in window)) {
        window.browsergym_frame_elem_counter = 0;
        browsergym_first_visit = true;
    }

    // get all DOM elements in the current frame (does not include elements in shadowDOMs)
    let elements = Array.from(document.querySelectorAll('*'));
    i = 0;
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
        // we will mark only standard HTML tags
        if (!elem.tagName || !html_tags.includes(elem.tagName.toLowerCase())) {
            // console.log(`Skipping element ${elem.outerHTML}`)
            continue;  // stop and move on to the next element
        }
        // console.log(`Processing element ${elem.outerHTML}`)
        // write dynamic element values to the DOM
        if (typeof elem.value !== 'undefined') {
            elem.setAttribute("value", elem.value);
        }
        // write dynamic checked properties to the DOM
        if (typeof elem.checked !== 'undefined') {
            if (elem.checked === true) {
                elem.setAttribute("checked", "");
            }
            else {
                elem.removeAttribute("checked");
            }
        }
        // add the element global id to a custom HTML attribute
        // https://playwright.dev/docs/locators#locate-by-test-id
        // recover the element id if it has one already, else compute a new element id
        let elem_global_bid;
        if (elem.hasAttribute(bid_attr_name)) {
            // throw an error if the attribute is already set while this is the first visit of the page
            if (browsergym_first_visit) {
                throw new Error(`Attribute ${bid_attr_name} already used in element ${elem.outerHTML}`);
            }
            elem_global_bid = elem.getAttribute(bid_attr_name);
        }
        else {
            let elem_local_id = window.browsergym_frame_elem_counter++;
            if (parent_bid == "") {
                elem_global_bid = `${elem_local_id}`;
            }
            else {
                elem_global_bid = `${parent_bid}-${elem_local_id}`;
            }
            elem.setAttribute(bid_attr_name, `${elem_global_bid}`);
        }
        // Hack: store custom data inside the aria-roledescription attribute (will be available in DOM and AXTree)
        //  - elem_global_bid: global element identifier (unique over multiple frames)
        // TODO: add more data if needed (x, y coordinates, bounding box, is_visible, is_clickable etc.)

        let [rect, is_in_viewport] = getElementPositionInfo(elem, iframe_offset, iframe_position);
        let left = (rect.left + iframe_position.x).toString();
        let top = (rect.top + iframe_position.y ).toString();
        let right = (rect.right + iframe_position.x ).toString();
        let bottom = (rect.bottom + iframe_position.y).toString();
        let center_x = ((rect.left + rect.right) / 2 + iframe_position.x).toString();
        let center_y = ((rect.top + rect.bottom) / 2 + iframe_position.y).toString();

        elem.setAttribute("browsergym_center", `(${center_x}, ${center_y})`);
        elem.setAttribute("browsergym_bounding_box", `(${left}, ${top}, ${right}, ${bottom})`);
        elem.setAttribute("browsergym_is_in_viewport", `${is_in_viewport}`);

        let original_content = "";
        if (elem.hasAttribute("aria-roledescription")) {
            original_content = elem.getAttribute("aria-roledescription");
        }
        let new_content = `${elem_global_bid}_${left}_${top}_${center_x}_${center_y}_${right}_${bottom}_${is_in_viewport}_${original_content}`
        elem.setAttribute("aria-roledescription", new_content);

    }
    return iframe_offset;

}
function getElementPositionInfo(element, iframe_offset, iframe_position) {
    var rect = element.getBoundingClientRect();
    let x = (rect.left + rect.right) / 2 ;
    let y = (rect.top + rect.bottom) / 2 ;
    //loop over element ancestors (parent) and refine iframe offset to be the most precise possible
    var parent = element.parentElement;
    parent_iframe_offset = { x: 0, y: 0, right: windowWidth, bottom: windowHeight };
    while (parent !== null) {
        var parent_rect = parent.getBoundingClientRect();
        parent_iframe_offset["x"] = Math.max(parent_rect.left , parent_iframe_offset["x"]  );
        parent_iframe_offset["y"] = Math.max(parent_rect.top , parent_iframe_offset["y"] );
        parent_iframe_offset["right"] = Math.min(parent_rect.right , parent_iframe_offset["right"]  );
        parent_iframe_offset["bottom"] = Math.min(parent_rect.bottom , parent_iframe_offset["bottom"] );
        parent = parent.parentElement;
    }

    var is_in_viewport = (
        x >= iframe_offset["x"] &&
        y >= iframe_offset["y"] &&
        x <= iframe_offset["right"] &&
        y <= iframe_offset["bottom"]
    );
    //this features is broken for the moment
    var NotBehindParent = (
        x >= parent_iframe_offset["x"] &&
        y >= parent_iframe_offset["y"] &&
        x <= parent_iframe_offset["right"] &&
        y <= parent_iframe_offset["bottom"]
    );

    var isVisible = (typeof element.offsetWidth === 'undefined' || typeof element.offsetHeight === 'undefined') || (element.offsetWidth > 0 && element.offsetHeight > 0);

    // Return true if the element is both in the viewport and has non-zero dimensions
    return [rect, (is_in_viewport  && isVisible && IsInFront(element))? 1 : 0];
}


function IsInFront(element){
    var rect = element.getBoundingClientRect();
    var x = (rect.left + rect.right) / 2 ;
    var y = (rect.top + rect.bottom) / 2 ;
    var newElement = elementFromPoint(x, y); //return the element in the foreground at position (x,y)
    if(newElement){
        if(newElement === element)
            return true;
    }
    return false;
}

function elementFromPoint(x, y) {
    let node = document.elementFromPoint(x, y);

    let child = node?.shadowRoot?.elementFromPoint(x, y);

    while (child && child !== node) {
      node = child;
      child = node?.shadowRoot?.elementFromPoint(x, y);
    }

    return child || node;
  }
