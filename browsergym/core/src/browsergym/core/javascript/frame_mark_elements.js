/**
 * Go through all DOM elements in the frame (including shadowDOMs), give them unique browsergym
 * identifiers (bid), and store custom data in ARIA attributes.
 */
async ([parent_bid, bid_attr_name, tags_to_mark]) => {

    // standard html tags
    // https://www.w3schools.com/tags/
    const html_tags = new Set([
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
    ]);
    const set_of_marks_tags = new Set([
        "input", "textarea", "select", "button", "a", "iframe", "video", "li", "td", "option"
    ]);

    let browsergym_first_visit = false;
    // if no yet set, set the frame (local) element counter to 0
    if (!("browsergym_elem_counter" in window)) {
        window.browsergym_elem_counter = 0;
        window.browsergym_frame_id_generator = new IFrameIdGenerator();
        browsergym_first_visit = true;
    }
    // mechanism for computing all element's visibility
    // the intersection observer will set the visibility ratio of elements entering / exiting the viewport
    // a set is used to keep track of not-yet-visited elements
    let elems_to_be_visited = new Set();
    let intersection_observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            let elem = entry.target;
            elem.setAttribute('browsergym_visibility_ratio', Math.round(entry.intersectionRatio * 100) / 100);
            if (elems_to_be_visited.has(elem)) {
                elems_to_be_visited.delete(elem);
            }
          })
        },
        {
            threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        }
    )

    let all_bids = new Set();

    // get all DOM elements in the current frame (does not include elements in shadowDOMs)
    let elements = Array.from(document.querySelectorAll('*'));
    let som_buttons = [];
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
        // decide if the current element should be marked or not
        switch (tags_to_mark) {
            // mark all elements
            case "all":
                break;
            // mark only standard HTML tags
            case "standard_html":
                if (!elem.tagName || !html_tags.has(elem.tagName.toLowerCase())) {
                    // continue the loop, i.e., move on to the next element
                    continue;
                }
                break;
            // non-recognized argument
            default:
                throw new Error(`Invalid value for parameter \"tags_to_mark\": ${JSON.stringify(tags_to_mark)}`);
        }
        // Processing element
        // register intersection callback on element, and keep track of element for waiting later
        elem.setAttribute('browsergym_visibility_ratio', 0);
        elems_to_be_visited.add(elem);
        intersection_observer.observe(elem);
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
        // add the element global id (browsergym id) to a custom HTML attribute
        // https://playwright.dev/docs/locators#locate-by-test-id
        // recover the element id if it has one already, else compute a new element id
        let elem_global_bid = null;
        if (elem.hasAttribute(bid_attr_name)) {
            // throw an error if the attribute is already set while this is the first visit of the page
            if (browsergym_first_visit) {
                throw new Error(`Attribute ${bid_attr_name} already used in element ${elem.outerHTML}`);
            }
            elem_global_bid = elem.getAttribute(bid_attr_name);
            // if the bid has already been encountered, then this is a duplicate and a new bid should be set
            if (all_bids.has(elem_global_bid)) {
                console.log(`BrowserGym: duplicate bid ${elem_global_bid} detected, generating a new one`);
                elem_global_bid = null;
            }
        }
        if (elem_global_bid === null) {
            let elem_local_id = null;
            // iFrames get alphabetical ids: 'a', 'b', ..., 'z', 'aA', 'aB' etc.
            if (['iframe', 'frame'].includes(elem.tagName.toLowerCase())) {
                elem_local_id = `${window.browsergym_frame_id_generator.next()}`;
            }
            // other elements get numerical ids: '0', '1', '2', ...
            else {
                elem_local_id = `${window.browsergym_elem_counter++}`;
            }
            if (parent_bid == "") {
                elem_global_bid = `${elem_local_id}`;
            }
            else {
                elem_global_bid = `${parent_bid}${elem_local_id}`;
            }
            elem.setAttribute(bid_attr_name, `${elem_global_bid}`);
        }
        all_bids.add(elem_global_bid);

        // Hack: store custom data inside ARIA attributes (will be available in DOM and AXTree)
        //  - elem_global_bid: global element identifier (unique over multiple frames)
        // TODO: add more data if needed (x, y coordinates, bounding box, is_visible, is_clickable etc.)
        push_bid_to_attribute(elem_global_bid, elem, "aria-roledescription");
        push_bid_to_attribute(elem_global_bid, elem, "aria-description");  // fallback for generic nodes

        // set-of-marks flag (He et al. 2024)
        // https://github.com/MinorJerry/WebVoyager/blob/main/utils.py
        elem.setAttribute("browsergym_set_of_marks", "0");
        // click at center activates self or a child
        if (["self", "child"].includes(whoCapturesCenterClick(elem))) {
            // has valid tag name, or has click event, or triggers a pointer cursor
            if (set_of_marks_tags.has(elem.tagName.toLowerCase()) || (elem.onclick != null) || (window.getComputedStyle(elem).cursor == "pointer")) {
                let rect = elem.getBoundingClientRect();
                let area = (rect.right - rect.left) * (rect.bottom - rect.top);
                // area is large enough
                if (area >= 20) {
                    // is not a child of a button (role, type, tag) set to be marked
                    if (som_buttons.every(button => !button.contains(elem))) {
                        // is not the sole child of span that has a role and is set to be marked
                        let parent = elem.parentElement;
                        if (!(parent && parent.tagName.toLowerCase() == "span" && parent.children.length === 1 && parent.getAttribute("role") && parent.getAttribute("browsergym_set_of_marks") === "1")) {
                            // all checks have passed, flag the element for inclusion in set-of-marks
                            elem.setAttribute("browsergym_set_of_marks", "1");
                            if (elem.matches('button, a, input[type="button"], div[role="button"]')) {
                                som_buttons.push(elem)
                            }
                            // lastly, remove the set-of-marks flag from all parents, if any
                            while (parent) {
                                if (parent.getAttribute("browsergym_set_of_marks") === "1") {
                                    parent.setAttribute("browsergym_set_of_marks", "0")
                                }
                                parent = parent.parentElement;
                            }
                        }
                    }
                }
            }
        }
    }

    warning_msgs = new Array();

    // wait for all elements to be visited for visibility
    let visibility_marking_timeout = 1000;  // ms
    try {
        await until(() => elems_to_be_visited.size == 0, visibility_marking_timeout);
    } catch {
        warning_msgs.push(`Frame marking: not all elements have been visited by the intersection_observer after ${visibility_marking_timeout} ms`);
    }
    // disconnect intersection observer
    intersection_observer.disconnect();

    return warning_msgs;
}

async function until(f, timeout, interval=40) {
    return new Promise((resolve, reject) => {
        const start_time = Date.now();
        // immediate check
        if (f()) {
            resolve();
        }
        // loop check
        const wait = setInterval(() => {
            if (f()) {
                clearInterval(wait);
                resolve();
            } else if (Date.now() - start_time > timeout) {
                clearInterval(wait);
                reject();
            }
        }, interval);
    });
}


function whoCapturesCenterClick(element){
    var rect = element.getBoundingClientRect();
    var x = (rect.left + rect.right) / 2 ;
    var y = (rect.top + rect.bottom) / 2 ;
    var element_at_center = elementFromPoint(x, y); // return the element in the foreground at position (x,y)
    if (!element_at_center) {
        return "nobody";
    } else if (element_at_center === element) {
        return "self";
    } else if (element.contains(element_at_center)) {
        return "child";
    } else {
        return "non-descendant";
    }
}

function push_bid_to_attribute(bid, elem, attr){
    let original_content = "";
    if (elem.hasAttribute(attr)) {
        original_content = elem.getAttribute(attr);
    }
    let new_content = `browsergym_id_${bid} ${original_content}`
    elem.setAttribute(attr, new_content);
}

function elementFromPoint(x, y) {
    let dom = document;
    let last_elem = null;
    let elem = null;

    do {
        last_elem = elem;
        elem = dom.elementFromPoint(x, y);
        dom = elem?.shadowRoot;
    } while(dom && elem !== last_elem);

    return elem;
}

// https://stackoverflow.com/questions/12504042/what-is-a-method-that-can-be-used-to-increment-letters#answer-12504061
class IFrameIdGenerator {
    constructor(chars = 'abcdefghijklmnopqrstuvwxyz') {
      this._chars = chars;
      this._nextId = [0];
    }

    next() {
      const r = [];
      for (let i = 0; i < this._nextId.length; i++) {
        let char = this._chars[this._nextId[i]];
        // all but first character must be upper-cased (a, aA, bCD)
        if (i < this._nextId.length - 1) {
            char = char.toUpperCase();
        }
        r.unshift(char);
      }
      this._increment();
      return r.join('');
    }

    _increment() {
      for (let i = 0; i < this._nextId.length; i++) {
        const val = ++this._nextId[i];
        if (val < this._chars.length) {
          return;
        }
        this._nextId[i] = 0;
      }
      this._nextId.push(0);
    }

    *[Symbol.iterator]() {
      while (true) {
        yield this.next();
      }
    }
  }
