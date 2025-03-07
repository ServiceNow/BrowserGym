/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

/**
 * (FM) This set of low-level actions is used to maintain compatibility with the action that the FM model
 * can take on elements. It is used to create a list of possible actions for each element and to concretely
 * map Action to FM actions.
 */
export enum LowLevelActionType {
  UNSPECIFIED = 0,
  CLICK = 1,
  HOVER = 2,
  TYPE = 3,
  SELECT_OPTION = 4,
  SCROLL = 5,
  UNRECOGNIZED = -1,
}

export function lowLevelActionTypeFromJSON(object: any): LowLevelActionType {
  switch (object) {
    case 0:
    case "LOW_LEVEL_ACTION_TYPE_UNSPECIFIED":
      return LowLevelActionType.UNSPECIFIED;
    case 1:
    case "CLICK":
      return LowLevelActionType.CLICK;
    case 2:
    case "HOVER":
      return LowLevelActionType.HOVER;
    case 3:
    case "TYPE":
      return LowLevelActionType.TYPE;
    case 4:
    case "SELECT_OPTION":
      return LowLevelActionType.SELECT_OPTION;
    case 5:
    case "SCROLL":
      return LowLevelActionType.SCROLL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LowLevelActionType.UNRECOGNIZED;
  }
}

export function lowLevelActionTypeToJSON(object: LowLevelActionType): string {
  switch (object) {
    case LowLevelActionType.UNSPECIFIED:
      return "LOW_LEVEL_ACTION_TYPE_UNSPECIFIED";
    case LowLevelActionType.CLICK:
      return "CLICK";
    case LowLevelActionType.HOVER:
      return "HOVER";
    case LowLevelActionType.TYPE:
      return "TYPE";
    case LowLevelActionType.SELECT_OPTION:
      return "SELECT_OPTION";
    case LowLevelActionType.SCROLL:
      return "SCROLL";
    case LowLevelActionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ControlType {
  UNSPECIFIED = 0,
  BUTTON = 1,
  LINK = 2,
  TEXTBOX = 3,
  CHECKBOX = 4,
  SELECT = 5,
  UNRECOGNIZED = -1,
}

export function controlTypeFromJSON(object: any): ControlType {
  switch (object) {
    case 0:
    case "CONTROL_TYPE_UNSPECIFIED":
      return ControlType.UNSPECIFIED;
    case 1:
    case "BUTTON":
      return ControlType.BUTTON;
    case 2:
    case "LINK":
      return ControlType.LINK;
    case 3:
    case "TEXTBOX":
      return ControlType.TEXTBOX;
    case 4:
    case "CHECKBOX":
      return ControlType.CHECKBOX;
    case 5:
    case "SELECT":
      return ControlType.SELECT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ControlType.UNRECOGNIZED;
  }
}

export function controlTypeToJSON(object: ControlType): string {
  switch (object) {
    case ControlType.UNSPECIFIED:
      return "CONTROL_TYPE_UNSPECIFIED";
    case ControlType.BUTTON:
      return "BUTTON";
    case ControlType.LINK:
      return "LINK";
    case ControlType.TEXTBOX:
      return "TEXTBOX";
    case ControlType.CHECKBOX:
      return "CHECKBOX";
    case ControlType.SELECT:
      return "SELECT";
    case ControlType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A rectangle for the bounding box of an element and the viewport. */
export interface Rect {
  $type?: "pb.v1alpha1.Rect";
  /** x coordinate of the top-left corner */
  x?:
    | number
    | undefined;
  /** y coordinate of the top-left corner */
  y?:
    | number
    | undefined;
  /** width of the rectangle */
  width?:
    | number
    | undefined;
  /** height of the rectangle */
  height?: number | undefined;
}

/**
 * A base data structure to represent UI component in a tree structure.
 * Next ID: 26
 */
export interface Element {
  $type?: "pb.v1alpha1.Element";
  /** Id assigned by Orbot for identifying elements. */
  id?:
    | string
    | undefined;
  /** Type of the element. For example, a, button, etc. */
  type?:
    | string
    | undefined;
  /** For interactive elements like buttons, it would have a control type. */
  controlType?: ControlType | undefined;
  children?:
    | Element[]
    | undefined;
  /** HTML attributes. For example, "aria-label" and "placeholder". */
  attributes?:
    | { [key: string]: string }
    | undefined;
  /**
   * Locator that can uniquely identify the element on the page. Only present in
   * certain cases like GetActionableElementsResponse.
   */
  locator?:
    | ElementLocator
    | undefined;
  /** human readable label to identify the element. may not be unique across elements. */
  label?:
    | string
    | undefined;
  /** An NL description of the element. */
  description?:
    | string
    | undefined;
  /**
   * FM
   * the description of the element based on a set of heuristics during crawling; this will be deprecated in favor of description
   */
  legacyElementDescription?:
    | string
    | undefined;
  /** the value of the input element */
  inputValue?:
    | string
    | undefined;
  /** the bounding box of the element represented as a DOMRect (x, y, width, height) */
  boundingBox?:
    | Rect
    | undefined;
  /** the Playwright locator of the element */
  playwrightLocator?:
    | string
    | undefined;
  /** the cursor shape when pointed at the element */
  cursor?:
    | string
    | undefined;
  /** whether the element is a new element from the previous state */
  isNew?:
    | boolean
    | undefined;
  /** whether the element is interactive */
  isInteractive?:
    | boolean
    | undefined;
  /** whether the element is indicated as displayed by its CSS attribute; this is different from visibility */
  isDisplayed?:
    | boolean
    | undefined;
  /** whether the element is at the top of the viewport */
  atTop?:
    | boolean
    | undefined;
  /** whether the element is in the viewport */
  inViewport?:
    | boolean
    | undefined;
  /** whether the element is the one interacted with */
  actedUpon?:
    | boolean
    | undefined;
  /** a list of possible actions that can be performed on the element */
  possibleActions?:
    | LowLevelActionType[]
    | undefined;
  /**
   * whether the element is checked / selected
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/:checked
   */
  checked?:
    | boolean
    | undefined;
  /**
   * whether the element is focused
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/:focus
   */
  focus?:
    | boolean
    | undefined;
  /**
   * whether the element is active
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/:active
   */
  active?:
    | boolean
    | undefined;
  /**
   * whether the element is being hovered over
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/:hover
   */
  hover?:
    | boolean
    | undefined;
  /** The visible text content of this element, including text from descendant elements */
  textContent?: string | undefined;
}

export interface ElementAttributesEntry {
  $type?: "pb.v1alpha1.Element.AttributesEntry";
  key: string;
  value: string;
}

/**
 * Examples:
 * 1. Locate "Save" button in the root (Web UI)
 * {
 *   text: "Save"
 * }
 *
 * 2. Locate "Save" button in the Expense_Form (Web UI)
 * {
 *   text: "Save"
 *   parent_locator {
 *     css: "#Expense_Form"
 *   }
 * }
 *
 * 3. Locate "Save" button in an iframe (Web UI)
 * {
 *   text: "Save"
 *   parent_locator {
 *     css: "#inner-iframe"
 *     type: "iframe"
 *     parent_locator {
 *       css: "#outer-iframe"
 *       type: "iframe"
 *     }
 *   }
 * }
 *
 * 4. Locate the text area in a Windows Notepad window
 *
 * recommended way to use Action.windowIndex to locate the window in an action:
 * {
 *   click: {
 *     element_locator {
 *       type: CONTROL
 *       xpath: '/window/panel/panel/text'
 *     }
 *   }
 *   windowIndex: 1
 * }
 *
 * discouraged way that locates the window by label which may change during execution:
 * {
 *   type: CONTROL
 *   xpath: '/window/panel/panel/text'
 *   parent_locator {
 *     type: WINDOW
 *     label: 'Untitled'
 *     parent_locator {
 *       type: PROCESS
 *       label: 'notepad'
 *     }
 *   }
 * }
 */
export interface ElementLocator {
  $type?: "pb.v1alpha1.ElementLocator";
  /** locate element by label */
  label?:
    | string
    | undefined;
  /** locate element by text */
  text?:
    | string
    | undefined;
  /**
   * While CSS selector can cover the above cases, we only use it as last resort
   * since it's not as stable and more difficult to infer from text description.
   */
  css?:
    | string
    | undefined;
  /**
   * XPath is currently used to locate UI element in desktop applications.
   * It should be used only for Type.CONTROL and Type.CONTENT.
   */
  xpath?: string | undefined;
  type?: ElementLocatorType | undefined;
  parentLocator?:
    | ElementLocator
    | undefined;
  /**
   * A user facing name of this element which could be shown in HITL review cards
   * or in error messages.
   */
  name?:
    | string
    | undefined;
  /**
   * Description of the element that will assist the ML model in understanding the intention of element
   * in order to better locating it. The concepts draw inspiration from accessible name and description in ARIA.
   * It can be provided by user in the workflow definition, or (not implemented yet) generated by ML model
   * based on the element and current page context.
   * ML model can use a combination of action description, element name and element description to locate an element.
   */
  description?:
    | string
    | undefined;
  /** Deprecated: use parent_locator and type instead. */
  iframeLocator?:
    | ElementLocator
    | undefined;
  /** the id of the element associated with this locator */
  elementId?:
    | string
    | undefined;
  /**
   * wait time in milliseconds when trying to locate the element on the page.
   * By default it's 4 seconds, but some actions in certain application might
   * take longer.
   */
  waitTimeInMs?: number | undefined;
}

export enum ElementLocatorType {
  ELEMENT_LOCATOR_UNSPECIFIED = 0,
  IFRAME = 1,
  SHADOW_DOM = 2,
  /**
   * PROCESS - To identify process in desktop application. Use the label field to specify
   * the process name. Usage of this type is discouraged and we should prefer
   * to use Action.windowIndex to locate a window.
   */
  PROCESS = 3,
  /**
   * WINDOW - In desktop applications, there might be more than one window per process.
   * For example, in the Windows Excel app, each open file would have its own
   * window. Use the label field to specify the window name. Usage of this type
   * is discouraged and we should prefer to use Action.windowIndex to locate a window.
   */
  WINDOW = 4,
  /** CONTROL - Windows accessibility API has two kind of elements: control and content. */
  CONTROL = 5,
  CONTENT = 6,
  UNRECOGNIZED = -1,
}

export function elementLocatorTypeFromJSON(object: any): ElementLocatorType {
  switch (object) {
    case 0:
    case "ELEMENT_LOCATOR_TYPE_UNSPECIFIED":
      return ElementLocatorType.ELEMENT_LOCATOR_UNSPECIFIED;
    case 1:
    case "IFRAME":
      return ElementLocatorType.IFRAME;
    case 2:
    case "SHADOW_DOM":
      return ElementLocatorType.SHADOW_DOM;
    case 3:
    case "PROCESS":
      return ElementLocatorType.PROCESS;
    case 4:
    case "WINDOW":
      return ElementLocatorType.WINDOW;
    case 5:
    case "CONTROL":
      return ElementLocatorType.CONTROL;
    case 6:
    case "CONTENT":
      return ElementLocatorType.CONTENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ElementLocatorType.UNRECOGNIZED;
  }
}

export function elementLocatorTypeToJSON(object: ElementLocatorType): string {
  switch (object) {
    case ElementLocatorType.ELEMENT_LOCATOR_UNSPECIFIED:
      return "ELEMENT_LOCATOR_TYPE_UNSPECIFIED";
    case ElementLocatorType.IFRAME:
      return "IFRAME";
    case ElementLocatorType.SHADOW_DOM:
      return "SHADOW_DOM";
    case ElementLocatorType.PROCESS:
      return "PROCESS";
    case ElementLocatorType.WINDOW:
      return "WINDOW";
    case ElementLocatorType.CONTROL:
      return "CONTROL";
    case ElementLocatorType.CONTENT:
      return "CONTENT";
    case ElementLocatorType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseRect(): Rect {
  return { $type: "pb.v1alpha1.Rect", x: 0, y: 0, width: 0, height: 0 };
}

export const Rect = {
  $type: "pb.v1alpha1.Rect" as const,

  encode(message: Rect, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== undefined && message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== undefined && message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    if (message.width !== undefined && message.width !== 0) {
      writer.uint32(29).float(message.width);
    }
    if (message.height !== undefined && message.height !== 0) {
      writer.uint32(37).float(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Rect {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRect();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.x = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.y = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.width = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.height = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Rect {
    return {
      $type: Rect.$type,
      x: isSet(object.x) ? globalThis.Number(object.x) : 0,
      y: isSet(object.y) ? globalThis.Number(object.y) : 0,
      width: isSet(object.width) ? globalThis.Number(object.width) : 0,
      height: isSet(object.height) ? globalThis.Number(object.height) : 0,
    };
  },

  toJSON(message: Rect): unknown {
    const obj: any = {};
    if (message.x !== undefined && message.x !== 0) {
      obj.x = message.x;
    }
    if (message.y !== undefined && message.y !== 0) {
      obj.y = message.y;
    }
    if (message.width !== undefined && message.width !== 0) {
      obj.width = message.width;
    }
    if (message.height !== undefined && message.height !== 0) {
      obj.height = message.height;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Rect>, I>>(base?: I): Rect {
    return Rect.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Rect>, I>>(object: I): Rect {
    const message = createBaseRect();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Rect.$type, Rect);

function createBaseElement(): Element {
  return {
    $type: "pb.v1alpha1.Element",
    id: "",
    type: "",
    controlType: 0,
    children: [],
    attributes: {},
    locator: undefined,
    label: "",
    description: "",
    legacyElementDescription: "",
    inputValue: "",
    boundingBox: undefined,
    playwrightLocator: "",
    cursor: "",
    isNew: false,
    isInteractive: false,
    isDisplayed: false,
    atTop: false,
    inViewport: false,
    actedUpon: false,
    possibleActions: [],
    checked: false,
    focus: false,
    active: false,
    hover: false,
    textContent: "",
  };
}

export const Element = {
  $type: "pb.v1alpha1.Element" as const,

  encode(message: Element, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(34).string(message.id);
    }
    if (message.type !== undefined && message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.controlType !== undefined && message.controlType !== 0) {
      writer.uint32(48).int32(message.controlType);
    }
    if (message.children !== undefined && message.children.length !== 0) {
      for (const v of message.children) {
        Element.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    Object.entries(message.attributes || {}).forEach(([key, value]) => {
      ElementAttributesEntry.encode(
        { $type: "pb.v1alpha1.Element.AttributesEntry", key: key as any, value },
        writer.uint32(26).fork(),
      ).ldelim();
    });
    if (message.locator !== undefined) {
      ElementLocator.encode(message.locator, writer.uint32(42).fork()).ldelim();
    }
    if (message.label !== undefined && message.label !== "") {
      writer.uint32(58).string(message.label);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(66).string(message.description);
    }
    if (message.legacyElementDescription !== undefined && message.legacyElementDescription !== "") {
      writer.uint32(74).string(message.legacyElementDescription);
    }
    if (message.inputValue !== undefined && message.inputValue !== "") {
      writer.uint32(82).string(message.inputValue);
    }
    if (message.boundingBox !== undefined) {
      Rect.encode(message.boundingBox, writer.uint32(90).fork()).ldelim();
    }
    if (message.playwrightLocator !== undefined && message.playwrightLocator !== "") {
      writer.uint32(98).string(message.playwrightLocator);
    }
    if (message.cursor !== undefined && message.cursor !== "") {
      writer.uint32(106).string(message.cursor);
    }
    if (message.isNew !== undefined && message.isNew !== false) {
      writer.uint32(112).bool(message.isNew);
    }
    if (message.isInteractive !== undefined && message.isInteractive !== false) {
      writer.uint32(120).bool(message.isInteractive);
    }
    if (message.isDisplayed !== undefined && message.isDisplayed !== false) {
      writer.uint32(128).bool(message.isDisplayed);
    }
    if (message.atTop !== undefined && message.atTop !== false) {
      writer.uint32(136).bool(message.atTop);
    }
    if (message.inViewport !== undefined && message.inViewport !== false) {
      writer.uint32(144).bool(message.inViewport);
    }
    if (message.actedUpon !== undefined && message.actedUpon !== false) {
      writer.uint32(152).bool(message.actedUpon);
    }
    if (message.possibleActions !== undefined && message.possibleActions.length !== 0) {
      writer.uint32(162).fork();
      for (const v of message.possibleActions) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.checked !== undefined && message.checked !== false) {
      writer.uint32(168).bool(message.checked);
    }
    if (message.focus !== undefined && message.focus !== false) {
      writer.uint32(176).bool(message.focus);
    }
    if (message.active !== undefined && message.active !== false) {
      writer.uint32(192).bool(message.active);
    }
    if (message.hover !== undefined && message.hover !== false) {
      writer.uint32(200).bool(message.hover);
    }
    if (message.textContent !== undefined && message.textContent !== "") {
      writer.uint32(210).string(message.textContent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Element {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseElement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.id = reader.string();
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.controlType = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.children!.push(Element.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = ElementAttributesEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.attributes![entry3.key] = entry3.value;
          }
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.locator = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.label = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.description = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.legacyElementDescription = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.inputValue = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.boundingBox = Rect.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.playwrightLocator = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.cursor = reader.string();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.isNew = reader.bool();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.isInteractive = reader.bool();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.isDisplayed = reader.bool();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.atTop = reader.bool();
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.inViewport = reader.bool();
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.actedUpon = reader.bool();
          continue;
        case 20:
          if (tag === 160) {
            message.possibleActions!.push(reader.int32() as any);

            continue;
          }

          if (tag === 162) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.possibleActions!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.checked = reader.bool();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.focus = reader.bool();
          continue;
        case 24:
          if (tag !== 192) {
            break;
          }

          message.active = reader.bool();
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.hover = reader.bool();
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.textContent = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Element {
    return {
      $type: Element.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      controlType: isSet(object.controlType) ? controlTypeFromJSON(object.controlType) : 0,
      children: globalThis.Array.isArray(object?.children) ? object.children.map((e: any) => Element.fromJSON(e)) : [],
      attributes: isObject(object.attributes)
        ? Object.entries(object.attributes).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      locator: isSet(object.locator) ? ElementLocator.fromJSON(object.locator) : undefined,
      label: isSet(object.label) ? globalThis.String(object.label) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      legacyElementDescription: isSet(object.legacyElementDescription)
        ? globalThis.String(object.legacyElementDescription)
        : "",
      inputValue: isSet(object.inputValue) ? globalThis.String(object.inputValue) : "",
      boundingBox: isSet(object.boundingBox) ? Rect.fromJSON(object.boundingBox) : undefined,
      playwrightLocator: isSet(object.playwrightLocator) ? globalThis.String(object.playwrightLocator) : "",
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
      isNew: isSet(object.isNew) ? globalThis.Boolean(object.isNew) : false,
      isInteractive: isSet(object.isInteractive) ? globalThis.Boolean(object.isInteractive) : false,
      isDisplayed: isSet(object.isDisplayed) ? globalThis.Boolean(object.isDisplayed) : false,
      atTop: isSet(object.atTop) ? globalThis.Boolean(object.atTop) : false,
      inViewport: isSet(object.inViewport) ? globalThis.Boolean(object.inViewport) : false,
      actedUpon: isSet(object.actedUpon) ? globalThis.Boolean(object.actedUpon) : false,
      possibleActions: globalThis.Array.isArray(object?.possibleActions)
        ? object.possibleActions.map((e: any) => lowLevelActionTypeFromJSON(e))
        : [],
      checked: isSet(object.checked) ? globalThis.Boolean(object.checked) : false,
      focus: isSet(object.focus) ? globalThis.Boolean(object.focus) : false,
      active: isSet(object.active) ? globalThis.Boolean(object.active) : false,
      hover: isSet(object.hover) ? globalThis.Boolean(object.hover) : false,
      textContent: isSet(object.textContent) ? globalThis.String(object.textContent) : "",
    };
  },

  toJSON(message: Element): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.type !== undefined && message.type !== "") {
      obj.type = message.type;
    }
    if (message.controlType !== undefined && message.controlType !== 0) {
      obj.controlType = controlTypeToJSON(message.controlType);
    }
    if (message.children?.length) {
      obj.children = message.children.map((e) => Element.toJSON(e));
    }
    if (message.attributes) {
      const entries = Object.entries(message.attributes);
      if (entries.length > 0) {
        obj.attributes = {};
        entries.forEach(([k, v]) => {
          obj.attributes[k] = v;
        });
      }
    }
    if (message.locator !== undefined) {
      obj.locator = ElementLocator.toJSON(message.locator);
    }
    if (message.label !== undefined && message.label !== "") {
      obj.label = message.label;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.legacyElementDescription !== undefined && message.legacyElementDescription !== "") {
      obj.legacyElementDescription = message.legacyElementDescription;
    }
    if (message.inputValue !== undefined && message.inputValue !== "") {
      obj.inputValue = message.inputValue;
    }
    if (message.boundingBox !== undefined) {
      obj.boundingBox = Rect.toJSON(message.boundingBox);
    }
    if (message.playwrightLocator !== undefined && message.playwrightLocator !== "") {
      obj.playwrightLocator = message.playwrightLocator;
    }
    if (message.cursor !== undefined && message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    if (message.isNew !== undefined && message.isNew !== false) {
      obj.isNew = message.isNew;
    }
    if (message.isInteractive !== undefined && message.isInteractive !== false) {
      obj.isInteractive = message.isInteractive;
    }
    if (message.isDisplayed !== undefined && message.isDisplayed !== false) {
      obj.isDisplayed = message.isDisplayed;
    }
    if (message.atTop !== undefined && message.atTop !== false) {
      obj.atTop = message.atTop;
    }
    if (message.inViewport !== undefined && message.inViewport !== false) {
      obj.inViewport = message.inViewport;
    }
    if (message.actedUpon !== undefined && message.actedUpon !== false) {
      obj.actedUpon = message.actedUpon;
    }
    if (message.possibleActions?.length) {
      obj.possibleActions = message.possibleActions.map((e) => lowLevelActionTypeToJSON(e));
    }
    if (message.checked !== undefined && message.checked !== false) {
      obj.checked = message.checked;
    }
    if (message.focus !== undefined && message.focus !== false) {
      obj.focus = message.focus;
    }
    if (message.active !== undefined && message.active !== false) {
      obj.active = message.active;
    }
    if (message.hover !== undefined && message.hover !== false) {
      obj.hover = message.hover;
    }
    if (message.textContent !== undefined && message.textContent !== "") {
      obj.textContent = message.textContent;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Element>, I>>(base?: I): Element {
    return Element.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Element>, I>>(object: I): Element {
    const message = createBaseElement();
    message.id = object.id ?? "";
    message.type = object.type ?? "";
    message.controlType = object.controlType ?? 0;
    message.children = object.children?.map((e) => Element.fromPartial(e)) || [];
    message.attributes = Object.entries(object.attributes ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = globalThis.String(value);
        }
        return acc;
      },
      {},
    );
    message.locator = (object.locator !== undefined && object.locator !== null)
      ? ElementLocator.fromPartial(object.locator)
      : undefined;
    message.label = object.label ?? "";
    message.description = object.description ?? "";
    message.legacyElementDescription = object.legacyElementDescription ?? "";
    message.inputValue = object.inputValue ?? "";
    message.boundingBox = (object.boundingBox !== undefined && object.boundingBox !== null)
      ? Rect.fromPartial(object.boundingBox)
      : undefined;
    message.playwrightLocator = object.playwrightLocator ?? "";
    message.cursor = object.cursor ?? "";
    message.isNew = object.isNew ?? false;
    message.isInteractive = object.isInteractive ?? false;
    message.isDisplayed = object.isDisplayed ?? false;
    message.atTop = object.atTop ?? false;
    message.inViewport = object.inViewport ?? false;
    message.actedUpon = object.actedUpon ?? false;
    message.possibleActions = object.possibleActions?.map((e) => e) || [];
    message.checked = object.checked ?? false;
    message.focus = object.focus ?? false;
    message.active = object.active ?? false;
    message.hover = object.hover ?? false;
    message.textContent = object.textContent ?? "";
    return message;
  },
};

messageTypeRegistry.set(Element.$type, Element);

function createBaseElementAttributesEntry(): ElementAttributesEntry {
  return { $type: "pb.v1alpha1.Element.AttributesEntry", key: "", value: "" };
}

export const ElementAttributesEntry = {
  $type: "pb.v1alpha1.Element.AttributesEntry" as const,

  encode(message: ElementAttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ElementAttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseElementAttributesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ElementAttributesEntry {
    return {
      $type: ElementAttributesEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: ElementAttributesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ElementAttributesEntry>, I>>(base?: I): ElementAttributesEntry {
    return ElementAttributesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ElementAttributesEntry>, I>>(object: I): ElementAttributesEntry {
    const message = createBaseElementAttributesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

messageTypeRegistry.set(ElementAttributesEntry.$type, ElementAttributesEntry);

function createBaseElementLocator(): ElementLocator {
  return {
    $type: "pb.v1alpha1.ElementLocator",
    label: undefined,
    text: undefined,
    css: undefined,
    xpath: undefined,
    type: 0,
    parentLocator: undefined,
    name: "",
    description: "",
    iframeLocator: undefined,
    elementId: "",
    waitTimeInMs: 0,
  };
}

export const ElementLocator = {
  $type: "pb.v1alpha1.ElementLocator" as const,

  encode(message: ElementLocator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.label !== undefined) {
      writer.uint32(10).string(message.label);
    }
    if (message.text !== undefined) {
      writer.uint32(18).string(message.text);
    }
    if (message.css !== undefined) {
      writer.uint32(26).string(message.css);
    }
    if (message.xpath !== undefined) {
      writer.uint32(82).string(message.xpath);
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(40).int32(message.type);
    }
    if (message.parentLocator !== undefined) {
      ElementLocator.encode(message.parentLocator, writer.uint32(50).fork()).ldelim();
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(58).string(message.name);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(90).string(message.description);
    }
    if (message.iframeLocator !== undefined) {
      ElementLocator.encode(message.iframeLocator, writer.uint32(34).fork()).ldelim();
    }
    if (message.elementId !== undefined && message.elementId !== "") {
      writer.uint32(66).string(message.elementId);
    }
    if (message.waitTimeInMs !== undefined && message.waitTimeInMs !== 0) {
      writer.uint32(72).int32(message.waitTimeInMs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ElementLocator {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseElementLocator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.label = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.text = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.css = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.xpath = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.parentLocator = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.name = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.iframeLocator = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.elementId = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.waitTimeInMs = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ElementLocator {
    return {
      $type: ElementLocator.$type,
      label: isSet(object.label) ? globalThis.String(object.label) : undefined,
      text: isSet(object.text) ? globalThis.String(object.text) : undefined,
      css: isSet(object.css) ? globalThis.String(object.css) : undefined,
      xpath: isSet(object.xpath) ? globalThis.String(object.xpath) : undefined,
      type: isSet(object.type) ? elementLocatorTypeFromJSON(object.type) : 0,
      parentLocator: isSet(object.parentLocator) ? ElementLocator.fromJSON(object.parentLocator) : undefined,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      iframeLocator: isSet(object.iframeLocator) ? ElementLocator.fromJSON(object.iframeLocator) : undefined,
      elementId: isSet(object.elementId) ? globalThis.String(object.elementId) : "",
      waitTimeInMs: isSet(object.waitTimeInMs) ? globalThis.Number(object.waitTimeInMs) : 0,
    };
  },

  toJSON(message: ElementLocator): unknown {
    const obj: any = {};
    if (message.label !== undefined) {
      obj.label = message.label;
    }
    if (message.text !== undefined) {
      obj.text = message.text;
    }
    if (message.css !== undefined) {
      obj.css = message.css;
    }
    if (message.xpath !== undefined) {
      obj.xpath = message.xpath;
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = elementLocatorTypeToJSON(message.type);
    }
    if (message.parentLocator !== undefined) {
      obj.parentLocator = ElementLocator.toJSON(message.parentLocator);
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.iframeLocator !== undefined) {
      obj.iframeLocator = ElementLocator.toJSON(message.iframeLocator);
    }
    if (message.elementId !== undefined && message.elementId !== "") {
      obj.elementId = message.elementId;
    }
    if (message.waitTimeInMs !== undefined && message.waitTimeInMs !== 0) {
      obj.waitTimeInMs = Math.round(message.waitTimeInMs);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ElementLocator>, I>>(base?: I): ElementLocator {
    return ElementLocator.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ElementLocator>, I>>(object: I): ElementLocator {
    const message = createBaseElementLocator();
    message.label = object.label ?? undefined;
    message.text = object.text ?? undefined;
    message.css = object.css ?? undefined;
    message.xpath = object.xpath ?? undefined;
    message.type = object.type ?? 0;
    message.parentLocator = (object.parentLocator !== undefined && object.parentLocator !== null)
      ? ElementLocator.fromPartial(object.parentLocator)
      : undefined;
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.iframeLocator = (object.iframeLocator !== undefined && object.iframeLocator !== null)
      ? ElementLocator.fromPartial(object.iframeLocator)
      : undefined;
    message.elementId = object.elementId ?? "";
    message.waitTimeInMs = object.waitTimeInMs ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ElementLocator.$type, ElementLocator);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
