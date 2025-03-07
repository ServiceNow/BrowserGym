/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";
import { ElementLocator } from "./element";
import { Action, ClickAction, ClickType, clickTypeFromJSON, clickTypeToJSON, SetValueAction } from "./orbot_action";

export const protobufPackage = "pb.v1alpha1";

export enum Modifier {
  UNSPECIFIED = 0,
  ALT = 1,
  CTRL = 2,
  COMMAND = 3,
  META = 4,
  SHIFT = 5,
  UNRECOGNIZED = -1,
}

export function modifierFromJSON(object: any): Modifier {
  switch (object) {
    case 0:
    case "MODIFIER_UNSPECIFIED":
      return Modifier.UNSPECIFIED;
    case 1:
    case "ALT":
      return Modifier.ALT;
    case 2:
    case "CTRL":
      return Modifier.CTRL;
    case 3:
    case "COMMAND":
      return Modifier.COMMAND;
    case 4:
    case "META":
      return Modifier.META;
    case 5:
    case "SHIFT":
      return Modifier.SHIFT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Modifier.UNRECOGNIZED;
  }
}

export function modifierToJSON(object: Modifier): string {
  switch (object) {
    case Modifier.UNSPECIFIED:
      return "MODIFIER_UNSPECIFIED";
    case Modifier.ALT:
      return "ALT";
    case Modifier.CTRL:
      return "CTRL";
    case Modifier.COMMAND:
      return "COMMAND";
    case Modifier.META:
      return "META";
    case Modifier.SHIFT:
      return "SHIFT";
    case Modifier.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Raw user events used for testing the recording end-to-end.
 * If it involves multiple tab, set tab_index to each UserEvent.
 * We only support testing of web primitive actions for now, but we can also
 * add widget operations like start for loop in the future.
 */
export interface SimulateEvent {
  $type?: "pb.v1alpha1.SimulateEvent";
  /** 0-based tab index */
  tabIndex?: number | undefined;
  navigate?: SimulateEventNavigate | undefined;
  click?: SimulateEventClick | undefined;
  type?: SimulateEventKeyboardType | undefined;
  selection?: SimulateEventSelection | undefined;
  instruction?: SimulateEventInstruction | undefined;
  keyboardShortcut?: SimulateEventKeyboardShortcut | undefined;
}

/**
 * Some keyboard shortcuts are different across operation system. We extract
 * the commonly used ones here so we don't need to care about the underlying
 * keys across platforms.
 */
export enum SimulateEventKeyboardShortcut {
  UNSPECIFIED = 0,
  COPY = 1,
  PASTE = 2,
  UNRECOGNIZED = -1,
}

export function simulateEventKeyboardShortcutFromJSON(object: any): SimulateEventKeyboardShortcut {
  switch (object) {
    case 0:
    case "KEYBOARD_SHORTCUT_UNSPECIFIED":
      return SimulateEventKeyboardShortcut.UNSPECIFIED;
    case 1:
    case "COPY":
      return SimulateEventKeyboardShortcut.COPY;
    case 2:
    case "PASTE":
      return SimulateEventKeyboardShortcut.PASTE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SimulateEventKeyboardShortcut.UNRECOGNIZED;
  }
}

export function simulateEventKeyboardShortcutToJSON(object: SimulateEventKeyboardShortcut): string {
  switch (object) {
    case SimulateEventKeyboardShortcut.UNSPECIFIED:
      return "KEYBOARD_SHORTCUT_UNSPECIFIED";
    case SimulateEventKeyboardShortcut.COPY:
      return "COPY";
    case SimulateEventKeyboardShortcut.PASTE:
      return "PASTE";
    case SimulateEventKeyboardShortcut.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum SimulateEventInstruction {
  UNSPECIFIED = 0,
  ITERATE_START = 1,
  ITERATE_END = 2,
  UNRECOGNIZED = -1,
}

export function simulateEventInstructionFromJSON(object: any): SimulateEventInstruction {
  switch (object) {
    case 0:
    case "INSTRUCTION_UNSPECIFIED":
      return SimulateEventInstruction.UNSPECIFIED;
    case 1:
    case "ITERATE_START":
      return SimulateEventInstruction.ITERATE_START;
    case 2:
    case "ITERATE_END":
      return SimulateEventInstruction.ITERATE_END;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SimulateEventInstruction.UNRECOGNIZED;
  }
}

export function simulateEventInstructionToJSON(object: SimulateEventInstruction): string {
  switch (object) {
    case SimulateEventInstruction.UNSPECIFIED:
      return "INSTRUCTION_UNSPECIFIED";
    case SimulateEventInstruction.ITERATE_START:
      return "ITERATE_START";
    case SimulateEventInstruction.ITERATE_END:
      return "ITERATE_END";
    case SimulateEventInstruction.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** if this navigate is explicitly provided, we would capture it in recorded events. */
export interface SimulateEventNavigate {
  $type?: "pb.v1alpha1.SimulateEvent.Navigate";
  url?: string | undefined;
}

/**
 * we only support basic mouse click, not drag-n-drop.
 * NOTE: we don't reuse ClickAction since we may need to migrate it to use
 * ActionParamValue instead in the future.
 */
export interface SimulateEventClick {
  $type?: "pb.v1alpha1.SimulateEvent.Click";
  locator?: ElementLocator | undefined;
  type?:
    | ClickType
    | undefined;
  /** modifier keys that are pressed when mouse input is dispatched */
  modifiers?: Modifier[] | undefined;
}

/** Keyboard events can be typing some text, or some keyboard shortcut like Ctrl+C. */
export interface SimulateEventKeyboardType {
  $type?: "pb.v1alpha1.SimulateEvent.KeyboardType";
  text?:
    | string
    | undefined;
  /** modifier keys like Control, Command etc. */
  modifiers?: Modifier[] | undefined;
}

/** a special mouse events for text selection */
export interface SimulateEventSelection {
  $type?: "pb.v1alpha1.SimulateEvent.Selection";
  /** select all the content in the element */
  element?: ElementLocator | undefined;
  range?: SimulateEventSelectionElementRange | undefined;
}

/** create all or partial selection in one or more elements */
export interface SimulateEventSelectionElementRange {
  $type?: "pb.v1alpha1.SimulateEvent.Selection.ElementRange";
  element?: ElementLocator | undefined;
  startOffset?:
    | number
    | undefined;
  /** optional if it's the same with the start element */
  endElement?: ElementLocator | undefined;
  endOffset?: number | undefined;
}

export interface PrecedingAction {
  $type?: "pb.v1alpha1.PrecedingAction";
  click?: ClickAction | undefined;
  setValue?: SetValueAction | undefined;
}

/**
 * Replay environment using one or more of the following:
 * 1. manually crafted HTML, which can reference resources on the Internet, such
 *    as JS/CSS on CDNs.
 * 2. WARC archive of applications. Right now if you use WARC, we'll disable
 *    access to the Internet.
 * 3. live applications on the Internet, which is available unless WARC is used.
 */
export interface ReplayEnv {
  $type?: "pb.v1alpha1.ReplayEnv";
  staticPages?:
    | ReplayEnvStaticPage[]
    | undefined;
  /** GCS file path like gs://bucket/file.warc */
  warcFilePath?: string | undefined;
  startUrl?:
    | string
    | undefined;
  /**
   * Points to a module in packages/webreplay/src/env/modules folder for setting
   * up the environment. This is useful for more complex setup, such as handling
   * authentication and data setup/reset. The module is expected to have a default
   * export function with the following signature:
   *
   * `export default async function(page: Page, extensionWorker: ExtensionProxy) {}`
   *
   * You can issue actions like click through both Playwright Page object as well
   * as the ExtensionProxy. Using ExtensionProxy is preferred since it handles
   * several things automatically such as waiting for page load to complete,
   * elements in iframe etc.
   *
   * Since usually authentication is involved, we would reuse the same browser
   * user directory across different executions, which allows us to reuse the
   * cookie/session if possible and reduce the possibility of being blocked by
   * the application.
   */
  setupModule?:
    | string
    | undefined;
  /**
   * Some pages need to be navigated by triggering some preceding actions.
   * We only support ClickAction, which should cover 90% cases.
   */
  precedingActions?: PrecedingAction[] | undefined;
}

export interface ReplayEnvStaticPage {
  $type?: "pb.v1alpha1.ReplayEnv.StaticPage";
  /** HTML file path, which is a relative path to the location of the txtpb file. */
  filePath?:
    | string
    | undefined;
  /** for simple cases, we can also directly define the HTML */
  html?:
    | string
    | undefined;
  /**
   * the HTML can be served at the arbitrary URL. If not provided, the page
   * would be served at http://orbot.test.
   */
  serveAtUrl?: string | undefined;
  resources?: ReplayEnvStaticPageResource[] | undefined;
}

/**
 * Additional resources that are needed for the static page, which can be:
 *
 * 1. plain JavaScript files
 * 2. TypeScript and/or JSX files would go through webpack for build, make
 *    sure the require_build field is set to true.
 * 3. static CSS styles
 *    NOTE: we don't support styles that require build step, such as SCSS
 * 4. other files such as image/audio/video etc.
 */
export interface ReplayEnvStaticPageResource {
  $type?: "pb.v1alpha1.ReplayEnv.StaticPage.Resource";
  /** relative path to the txtpb file that can be referenced from the html. */
  filePath?:
    | string
    | undefined;
  /**
   * the path where the HTML refers to the resource.
   * You don't need to specify this if html file and txtpb file are in the
   * same folder and the resource doesn't need build.
   */
  serveAtPath?:
    | string
    | undefined;
  /**
   * For resources that require compilation and/or bundling, such as React
   * apps that are written in JSX or TypeScript files. Right now this is
   * handled by webpack with tsc. When build is required, we would expect
   * a package.json file to be present along with the resource file to
   * specify dependencies.
   */
  requireBuild?: boolean | undefined;
}

/**
 * Allow the evaluate our action execution and recording.
 * 1. execute actions and verify execution result if defined.
 * 2. when simulate events is provided, perform the events and verify we can
 *    generate the corresponding actions. We also verify the action execution
 *    if the side effects are also defined.
 *
 * We focus to test the primitive Web actions that involves DOM and browser APIs,
 * which are hard to test without a browser environment. Compared to directly
 * testing with Playwright, we provide consistent abilities:
 * * leverage our element locating design, which handles iframes/shadow DOMs
 *   and allow to wait until the element exist.
 * * for click and type, we use Chrome DevTools Protocol to issue raw mouse and
 *   keyboard events to avoid limitation such as browser focus.
 * * we provide access to recorder instances without UI operation, such as starting
 *   a recording session. In this way, we don't need to handle user authentication
 *   and operating on side panel to manage recording.
 * * abstract away user events so it's easy to write and maintain. for example,
 *   we provide native support for commonly used keyboard shortcut that handles
 *   platform differences (Ctrl+C vs Command+C for copy).
 *
 * It's not intended to test the following scenarios/functionalities:
 * * UI operations like start/stop recording.
 * * action inference like JS action generation
 * * verification of ML action execution, as well as HITL review experience
 */
export interface Replay {
  $type?: "pb.v1alpha1.Replay";
  /** if no env is provided, we would use the live application on the Internet. */
  env?:
    | ReplayEnv
    | undefined;
  /**
   * one or more user events to simulate.
   * if the first event is not a navigate event, we would open the http://orbot.test
   * before start the recorder (thus no GotoAction would be generated).
   */
  events?:
    | SimulateEvent[]
    | undefined;
  /** expected generated actions, each with optional verification method. */
  actions?: Action[] | undefined;
  description?:
    | string
    | undefined;
  /** application involves in this replay */
  applications?:
    | string[]
    | undefined;
  /**
   * the generation from simulated events to actions is known to be failing, and
   * would be fixed later. This allows us to check in test cases without causing
   * CI failure. Use the string value to provide an explanation.
   * For some cases, generation will mismatch due to different inputs in events and actions.
   * Skip retry to reduce execution time.
   *
   * @deprecated
   */
  expectGenerationFailure?: string | undefined;
  expectGenerationFailureDetail?:
    | ExpectGenerationFailure
    | undefined;
  /**
   * While the recording is successful, we cannot execute some of the actions.
   * Use the string value to provide an explanation.
   */
  expectExecutionFailure?:
    | string
    | undefined;
  /**
   * ignore the test completely, this should only be used when the case cannot
   * be run due to limitations of the Replay system, such as:
   * - consistently failing to set up the environment such as authentication
   * - fail to simulate some user events due to limitations of the implementation
   *
   * for other cases, prefer to use the more specific flag such as
   * expect_generation_failure and expect_execution_failure.
   *
   * use skip_reason instead
   *
   * @deprecated
   */
  skipEvaluation?: string | undefined;
  skipReason?: SkipReason | undefined;
}

export interface SkipReason {
  $type?: "pb.v1alpha1.SkipReason";
  knownIssue?: SkipReasonKnownIssue | undefined;
  antiBot?:
    | SkipReasonAntibot
    | undefined;
  /** Uncategorized skip type, which we can provide a non-empty string to explain the reason */
  other?: string | undefined;
}

export interface SkipReasonKnownIssue {
  $type?: "pb.v1alpha1.SkipReason.KnownIssue";
  issueLink?: string | undefined;
  description?: string | undefined;
}

export interface SkipReasonAntibot {
  $type?: "pb.v1alpha1.SkipReason.Antibot";
  description?: string | undefined;
}

export interface ExpectGenerationFailure {
  $type?: "pb.v1alpha1.ExpectGenerationFailure";
  description?: string | undefined;
  skipRetry?: boolean | undefined;
}

function createBaseSimulateEvent(): SimulateEvent {
  return {
    $type: "pb.v1alpha1.SimulateEvent",
    tabIndex: 0,
    navigate: undefined,
    click: undefined,
    type: undefined,
    selection: undefined,
    instruction: undefined,
    keyboardShortcut: undefined,
  };
}

export const SimulateEvent = {
  $type: "pb.v1alpha1.SimulateEvent" as const,

  encode(message: SimulateEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tabIndex !== undefined && message.tabIndex !== 0) {
      writer.uint32(8).int32(message.tabIndex);
    }
    if (message.navigate !== undefined) {
      SimulateEventNavigate.encode(message.navigate, writer.uint32(18).fork()).ldelim();
    }
    if (message.click !== undefined) {
      SimulateEventClick.encode(message.click, writer.uint32(26).fork()).ldelim();
    }
    if (message.type !== undefined) {
      SimulateEventKeyboardType.encode(message.type, writer.uint32(34).fork()).ldelim();
    }
    if (message.selection !== undefined) {
      SimulateEventSelection.encode(message.selection, writer.uint32(42).fork()).ldelim();
    }
    if (message.instruction !== undefined) {
      writer.uint32(48).int32(message.instruction);
    }
    if (message.keyboardShortcut !== undefined) {
      writer.uint32(56).int32(message.keyboardShortcut);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimulateEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimulateEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.tabIndex = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.navigate = SimulateEventNavigate.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.click = SimulateEventClick.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.type = SimulateEventKeyboardType.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.selection = SimulateEventSelection.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.instruction = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.keyboardShortcut = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimulateEvent {
    return {
      $type: SimulateEvent.$type,
      tabIndex: isSet(object.tabIndex) ? globalThis.Number(object.tabIndex) : 0,
      navigate: isSet(object.navigate) ? SimulateEventNavigate.fromJSON(object.navigate) : undefined,
      click: isSet(object.click) ? SimulateEventClick.fromJSON(object.click) : undefined,
      type: isSet(object.type) ? SimulateEventKeyboardType.fromJSON(object.type) : undefined,
      selection: isSet(object.selection) ? SimulateEventSelection.fromJSON(object.selection) : undefined,
      instruction: isSet(object.instruction) ? simulateEventInstructionFromJSON(object.instruction) : undefined,
      keyboardShortcut: isSet(object.keyboardShortcut)
        ? simulateEventKeyboardShortcutFromJSON(object.keyboardShortcut)
        : undefined,
    };
  },

  toJSON(message: SimulateEvent): unknown {
    const obj: any = {};
    if (message.tabIndex !== undefined && message.tabIndex !== 0) {
      obj.tabIndex = Math.round(message.tabIndex);
    }
    if (message.navigate !== undefined) {
      obj.navigate = SimulateEventNavigate.toJSON(message.navigate);
    }
    if (message.click !== undefined) {
      obj.click = SimulateEventClick.toJSON(message.click);
    }
    if (message.type !== undefined) {
      obj.type = SimulateEventKeyboardType.toJSON(message.type);
    }
    if (message.selection !== undefined) {
      obj.selection = SimulateEventSelection.toJSON(message.selection);
    }
    if (message.instruction !== undefined) {
      obj.instruction = simulateEventInstructionToJSON(message.instruction);
    }
    if (message.keyboardShortcut !== undefined) {
      obj.keyboardShortcut = simulateEventKeyboardShortcutToJSON(message.keyboardShortcut);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimulateEvent>, I>>(base?: I): SimulateEvent {
    return SimulateEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimulateEvent>, I>>(object: I): SimulateEvent {
    const message = createBaseSimulateEvent();
    message.tabIndex = object.tabIndex ?? 0;
    message.navigate = (object.navigate !== undefined && object.navigate !== null)
      ? SimulateEventNavigate.fromPartial(object.navigate)
      : undefined;
    message.click = (object.click !== undefined && object.click !== null)
      ? SimulateEventClick.fromPartial(object.click)
      : undefined;
    message.type = (object.type !== undefined && object.type !== null)
      ? SimulateEventKeyboardType.fromPartial(object.type)
      : undefined;
    message.selection = (object.selection !== undefined && object.selection !== null)
      ? SimulateEventSelection.fromPartial(object.selection)
      : undefined;
    message.instruction = object.instruction ?? undefined;
    message.keyboardShortcut = object.keyboardShortcut ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(SimulateEvent.$type, SimulateEvent);

function createBaseSimulateEventNavigate(): SimulateEventNavigate {
  return { $type: "pb.v1alpha1.SimulateEvent.Navigate", url: "" };
}

export const SimulateEventNavigate = {
  $type: "pb.v1alpha1.SimulateEvent.Navigate" as const,

  encode(message: SimulateEventNavigate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimulateEventNavigate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimulateEventNavigate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimulateEventNavigate {
    return { $type: SimulateEventNavigate.$type, url: isSet(object.url) ? globalThis.String(object.url) : "" };
  },

  toJSON(message: SimulateEventNavigate): unknown {
    const obj: any = {};
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimulateEventNavigate>, I>>(base?: I): SimulateEventNavigate {
    return SimulateEventNavigate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimulateEventNavigate>, I>>(object: I): SimulateEventNavigate {
    const message = createBaseSimulateEventNavigate();
    message.url = object.url ?? "";
    return message;
  },
};

messageTypeRegistry.set(SimulateEventNavigate.$type, SimulateEventNavigate);

function createBaseSimulateEventClick(): SimulateEventClick {
  return { $type: "pb.v1alpha1.SimulateEvent.Click", locator: undefined, type: 0, modifiers: [] };
}

export const SimulateEventClick = {
  $type: "pb.v1alpha1.SimulateEvent.Click" as const,

  encode(message: SimulateEventClick, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.locator !== undefined) {
      ElementLocator.encode(message.locator, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.modifiers !== undefined && message.modifiers.length !== 0) {
      writer.uint32(26).fork();
      for (const v of message.modifiers) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimulateEventClick {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimulateEventClick();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.locator = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 3:
          if (tag === 24) {
            message.modifiers!.push(reader.int32() as any);

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.modifiers!.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimulateEventClick {
    return {
      $type: SimulateEventClick.$type,
      locator: isSet(object.locator) ? ElementLocator.fromJSON(object.locator) : undefined,
      type: isSet(object.type) ? clickTypeFromJSON(object.type) : 0,
      modifiers: globalThis.Array.isArray(object?.modifiers)
        ? object.modifiers.map((e: any) => modifierFromJSON(e))
        : [],
    };
  },

  toJSON(message: SimulateEventClick): unknown {
    const obj: any = {};
    if (message.locator !== undefined) {
      obj.locator = ElementLocator.toJSON(message.locator);
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = clickTypeToJSON(message.type);
    }
    if (message.modifiers?.length) {
      obj.modifiers = message.modifiers.map((e) => modifierToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimulateEventClick>, I>>(base?: I): SimulateEventClick {
    return SimulateEventClick.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimulateEventClick>, I>>(object: I): SimulateEventClick {
    const message = createBaseSimulateEventClick();
    message.locator = (object.locator !== undefined && object.locator !== null)
      ? ElementLocator.fromPartial(object.locator)
      : undefined;
    message.type = object.type ?? 0;
    message.modifiers = object.modifiers?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(SimulateEventClick.$type, SimulateEventClick);

function createBaseSimulateEventKeyboardType(): SimulateEventKeyboardType {
  return { $type: "pb.v1alpha1.SimulateEvent.KeyboardType", text: "", modifiers: [] };
}

export const SimulateEventKeyboardType = {
  $type: "pb.v1alpha1.SimulateEvent.KeyboardType" as const,

  encode(message: SimulateEventKeyboardType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== undefined && message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    if (message.modifiers !== undefined && message.modifiers.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.modifiers) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimulateEventKeyboardType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimulateEventKeyboardType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.text = reader.string();
          continue;
        case 2:
          if (tag === 16) {
            message.modifiers!.push(reader.int32() as any);

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.modifiers!.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimulateEventKeyboardType {
    return {
      $type: SimulateEventKeyboardType.$type,
      text: isSet(object.text) ? globalThis.String(object.text) : "",
      modifiers: globalThis.Array.isArray(object?.modifiers)
        ? object.modifiers.map((e: any) => modifierFromJSON(e))
        : [],
    };
  },

  toJSON(message: SimulateEventKeyboardType): unknown {
    const obj: any = {};
    if (message.text !== undefined && message.text !== "") {
      obj.text = message.text;
    }
    if (message.modifiers?.length) {
      obj.modifiers = message.modifiers.map((e) => modifierToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimulateEventKeyboardType>, I>>(base?: I): SimulateEventKeyboardType {
    return SimulateEventKeyboardType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimulateEventKeyboardType>, I>>(object: I): SimulateEventKeyboardType {
    const message = createBaseSimulateEventKeyboardType();
    message.text = object.text ?? "";
    message.modifiers = object.modifiers?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(SimulateEventKeyboardType.$type, SimulateEventKeyboardType);

function createBaseSimulateEventSelection(): SimulateEventSelection {
  return { $type: "pb.v1alpha1.SimulateEvent.Selection", element: undefined, range: undefined };
}

export const SimulateEventSelection = {
  $type: "pb.v1alpha1.SimulateEvent.Selection" as const,

  encode(message: SimulateEventSelection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.element !== undefined) {
      ElementLocator.encode(message.element, writer.uint32(10).fork()).ldelim();
    }
    if (message.range !== undefined) {
      SimulateEventSelectionElementRange.encode(message.range, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimulateEventSelection {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimulateEventSelection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.element = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.range = SimulateEventSelectionElementRange.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimulateEventSelection {
    return {
      $type: SimulateEventSelection.$type,
      element: isSet(object.element) ? ElementLocator.fromJSON(object.element) : undefined,
      range: isSet(object.range) ? SimulateEventSelectionElementRange.fromJSON(object.range) : undefined,
    };
  },

  toJSON(message: SimulateEventSelection): unknown {
    const obj: any = {};
    if (message.element !== undefined) {
      obj.element = ElementLocator.toJSON(message.element);
    }
    if (message.range !== undefined) {
      obj.range = SimulateEventSelectionElementRange.toJSON(message.range);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimulateEventSelection>, I>>(base?: I): SimulateEventSelection {
    return SimulateEventSelection.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimulateEventSelection>, I>>(object: I): SimulateEventSelection {
    const message = createBaseSimulateEventSelection();
    message.element = (object.element !== undefined && object.element !== null)
      ? ElementLocator.fromPartial(object.element)
      : undefined;
    message.range = (object.range !== undefined && object.range !== null)
      ? SimulateEventSelectionElementRange.fromPartial(object.range)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SimulateEventSelection.$type, SimulateEventSelection);

function createBaseSimulateEventSelectionElementRange(): SimulateEventSelectionElementRange {
  return {
    $type: "pb.v1alpha1.SimulateEvent.Selection.ElementRange",
    element: undefined,
    startOffset: 0,
    endElement: undefined,
    endOffset: 0,
  };
}

export const SimulateEventSelectionElementRange = {
  $type: "pb.v1alpha1.SimulateEvent.Selection.ElementRange" as const,

  encode(message: SimulateEventSelectionElementRange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.element !== undefined) {
      ElementLocator.encode(message.element, writer.uint32(10).fork()).ldelim();
    }
    if (message.startOffset !== undefined && message.startOffset !== 0) {
      writer.uint32(16).int32(message.startOffset);
    }
    if (message.endElement !== undefined) {
      ElementLocator.encode(message.endElement, writer.uint32(26).fork()).ldelim();
    }
    if (message.endOffset !== undefined && message.endOffset !== 0) {
      writer.uint32(32).int32(message.endOffset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimulateEventSelectionElementRange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimulateEventSelectionElementRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.element = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.startOffset = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.endElement = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.endOffset = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimulateEventSelectionElementRange {
    return {
      $type: SimulateEventSelectionElementRange.$type,
      element: isSet(object.element) ? ElementLocator.fromJSON(object.element) : undefined,
      startOffset: isSet(object.startOffset) ? globalThis.Number(object.startOffset) : 0,
      endElement: isSet(object.endElement) ? ElementLocator.fromJSON(object.endElement) : undefined,
      endOffset: isSet(object.endOffset) ? globalThis.Number(object.endOffset) : 0,
    };
  },

  toJSON(message: SimulateEventSelectionElementRange): unknown {
    const obj: any = {};
    if (message.element !== undefined) {
      obj.element = ElementLocator.toJSON(message.element);
    }
    if (message.startOffset !== undefined && message.startOffset !== 0) {
      obj.startOffset = Math.round(message.startOffset);
    }
    if (message.endElement !== undefined) {
      obj.endElement = ElementLocator.toJSON(message.endElement);
    }
    if (message.endOffset !== undefined && message.endOffset !== 0) {
      obj.endOffset = Math.round(message.endOffset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimulateEventSelectionElementRange>, I>>(
    base?: I,
  ): SimulateEventSelectionElementRange {
    return SimulateEventSelectionElementRange.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimulateEventSelectionElementRange>, I>>(
    object: I,
  ): SimulateEventSelectionElementRange {
    const message = createBaseSimulateEventSelectionElementRange();
    message.element = (object.element !== undefined && object.element !== null)
      ? ElementLocator.fromPartial(object.element)
      : undefined;
    message.startOffset = object.startOffset ?? 0;
    message.endElement = (object.endElement !== undefined && object.endElement !== null)
      ? ElementLocator.fromPartial(object.endElement)
      : undefined;
    message.endOffset = object.endOffset ?? 0;
    return message;
  },
};

messageTypeRegistry.set(SimulateEventSelectionElementRange.$type, SimulateEventSelectionElementRange);

function createBasePrecedingAction(): PrecedingAction {
  return { $type: "pb.v1alpha1.PrecedingAction", click: undefined, setValue: undefined };
}

export const PrecedingAction = {
  $type: "pb.v1alpha1.PrecedingAction" as const,

  encode(message: PrecedingAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.click !== undefined) {
      ClickAction.encode(message.click, writer.uint32(10).fork()).ldelim();
    }
    if (message.setValue !== undefined) {
      SetValueAction.encode(message.setValue, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PrecedingAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrecedingAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.click = ClickAction.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.setValue = SetValueAction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PrecedingAction {
    return {
      $type: PrecedingAction.$type,
      click: isSet(object.click) ? ClickAction.fromJSON(object.click) : undefined,
      setValue: isSet(object.setValue) ? SetValueAction.fromJSON(object.setValue) : undefined,
    };
  },

  toJSON(message: PrecedingAction): unknown {
    const obj: any = {};
    if (message.click !== undefined) {
      obj.click = ClickAction.toJSON(message.click);
    }
    if (message.setValue !== undefined) {
      obj.setValue = SetValueAction.toJSON(message.setValue);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PrecedingAction>, I>>(base?: I): PrecedingAction {
    return PrecedingAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PrecedingAction>, I>>(object: I): PrecedingAction {
    const message = createBasePrecedingAction();
    message.click = (object.click !== undefined && object.click !== null)
      ? ClickAction.fromPartial(object.click)
      : undefined;
    message.setValue = (object.setValue !== undefined && object.setValue !== null)
      ? SetValueAction.fromPartial(object.setValue)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(PrecedingAction.$type, PrecedingAction);

function createBaseReplayEnv(): ReplayEnv {
  return {
    $type: "pb.v1alpha1.ReplayEnv",
    staticPages: [],
    warcFilePath: "",
    startUrl: "",
    setupModule: "",
    precedingActions: [],
  };
}

export const ReplayEnv = {
  $type: "pb.v1alpha1.ReplayEnv" as const,

  encode(message: ReplayEnv, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.staticPages !== undefined && message.staticPages.length !== 0) {
      for (const v of message.staticPages) {
        ReplayEnvStaticPage.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.warcFilePath !== undefined && message.warcFilePath !== "") {
      writer.uint32(18).string(message.warcFilePath);
    }
    if (message.startUrl !== undefined && message.startUrl !== "") {
      writer.uint32(26).string(message.startUrl);
    }
    if (message.setupModule !== undefined && message.setupModule !== "") {
      writer.uint32(42).string(message.setupModule);
    }
    if (message.precedingActions !== undefined && message.precedingActions.length !== 0) {
      for (const v of message.precedingActions) {
        PrecedingAction.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReplayEnv {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReplayEnv();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.staticPages!.push(ReplayEnvStaticPage.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.warcFilePath = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.startUrl = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.setupModule = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.precedingActions!.push(PrecedingAction.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReplayEnv {
    return {
      $type: ReplayEnv.$type,
      staticPages: globalThis.Array.isArray(object?.staticPages)
        ? object.staticPages.map((e: any) => ReplayEnvStaticPage.fromJSON(e))
        : [],
      warcFilePath: isSet(object.warcFilePath) ? globalThis.String(object.warcFilePath) : "",
      startUrl: isSet(object.startUrl) ? globalThis.String(object.startUrl) : "",
      setupModule: isSet(object.setupModule) ? globalThis.String(object.setupModule) : "",
      precedingActions: globalThis.Array.isArray(object?.precedingActions)
        ? object.precedingActions.map((e: any) => PrecedingAction.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ReplayEnv): unknown {
    const obj: any = {};
    if (message.staticPages?.length) {
      obj.staticPages = message.staticPages.map((e) => ReplayEnvStaticPage.toJSON(e));
    }
    if (message.warcFilePath !== undefined && message.warcFilePath !== "") {
      obj.warcFilePath = message.warcFilePath;
    }
    if (message.startUrl !== undefined && message.startUrl !== "") {
      obj.startUrl = message.startUrl;
    }
    if (message.setupModule !== undefined && message.setupModule !== "") {
      obj.setupModule = message.setupModule;
    }
    if (message.precedingActions?.length) {
      obj.precedingActions = message.precedingActions.map((e) => PrecedingAction.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReplayEnv>, I>>(base?: I): ReplayEnv {
    return ReplayEnv.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReplayEnv>, I>>(object: I): ReplayEnv {
    const message = createBaseReplayEnv();
    message.staticPages = object.staticPages?.map((e) => ReplayEnvStaticPage.fromPartial(e)) || [];
    message.warcFilePath = object.warcFilePath ?? "";
    message.startUrl = object.startUrl ?? "";
    message.setupModule = object.setupModule ?? "";
    message.precedingActions = object.precedingActions?.map((e) => PrecedingAction.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ReplayEnv.$type, ReplayEnv);

function createBaseReplayEnvStaticPage(): ReplayEnvStaticPage {
  return { $type: "pb.v1alpha1.ReplayEnv.StaticPage", filePath: "", html: "", serveAtUrl: "", resources: [] };
}

export const ReplayEnvStaticPage = {
  $type: "pb.v1alpha1.ReplayEnv.StaticPage" as const,

  encode(message: ReplayEnvStaticPage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filePath !== undefined && message.filePath !== "") {
      writer.uint32(10).string(message.filePath);
    }
    if (message.html !== undefined && message.html !== "") {
      writer.uint32(18).string(message.html);
    }
    if (message.serveAtUrl !== undefined && message.serveAtUrl !== "") {
      writer.uint32(26).string(message.serveAtUrl);
    }
    if (message.resources !== undefined && message.resources.length !== 0) {
      for (const v of message.resources) {
        ReplayEnvStaticPageResource.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReplayEnvStaticPage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReplayEnvStaticPage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filePath = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.html = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.serveAtUrl = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.resources!.push(ReplayEnvStaticPageResource.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReplayEnvStaticPage {
    return {
      $type: ReplayEnvStaticPage.$type,
      filePath: isSet(object.filePath) ? globalThis.String(object.filePath) : "",
      html: isSet(object.html) ? globalThis.String(object.html) : "",
      serveAtUrl: isSet(object.serveAtUrl) ? globalThis.String(object.serveAtUrl) : "",
      resources: globalThis.Array.isArray(object?.resources)
        ? object.resources.map((e: any) => ReplayEnvStaticPageResource.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ReplayEnvStaticPage): unknown {
    const obj: any = {};
    if (message.filePath !== undefined && message.filePath !== "") {
      obj.filePath = message.filePath;
    }
    if (message.html !== undefined && message.html !== "") {
      obj.html = message.html;
    }
    if (message.serveAtUrl !== undefined && message.serveAtUrl !== "") {
      obj.serveAtUrl = message.serveAtUrl;
    }
    if (message.resources?.length) {
      obj.resources = message.resources.map((e) => ReplayEnvStaticPageResource.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReplayEnvStaticPage>, I>>(base?: I): ReplayEnvStaticPage {
    return ReplayEnvStaticPage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReplayEnvStaticPage>, I>>(object: I): ReplayEnvStaticPage {
    const message = createBaseReplayEnvStaticPage();
    message.filePath = object.filePath ?? "";
    message.html = object.html ?? "";
    message.serveAtUrl = object.serveAtUrl ?? "";
    message.resources = object.resources?.map((e) => ReplayEnvStaticPageResource.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ReplayEnvStaticPage.$type, ReplayEnvStaticPage);

function createBaseReplayEnvStaticPageResource(): ReplayEnvStaticPageResource {
  return { $type: "pb.v1alpha1.ReplayEnv.StaticPage.Resource", filePath: "", serveAtPath: "", requireBuild: false };
}

export const ReplayEnvStaticPageResource = {
  $type: "pb.v1alpha1.ReplayEnv.StaticPage.Resource" as const,

  encode(message: ReplayEnvStaticPageResource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filePath !== undefined && message.filePath !== "") {
      writer.uint32(10).string(message.filePath);
    }
    if (message.serveAtPath !== undefined && message.serveAtPath !== "") {
      writer.uint32(18).string(message.serveAtPath);
    }
    if (message.requireBuild !== undefined && message.requireBuild !== false) {
      writer.uint32(24).bool(message.requireBuild);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReplayEnvStaticPageResource {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReplayEnvStaticPageResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filePath = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.serveAtPath = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.requireBuild = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReplayEnvStaticPageResource {
    return {
      $type: ReplayEnvStaticPageResource.$type,
      filePath: isSet(object.filePath) ? globalThis.String(object.filePath) : "",
      serveAtPath: isSet(object.serveAtPath) ? globalThis.String(object.serveAtPath) : "",
      requireBuild: isSet(object.requireBuild) ? globalThis.Boolean(object.requireBuild) : false,
    };
  },

  toJSON(message: ReplayEnvStaticPageResource): unknown {
    const obj: any = {};
    if (message.filePath !== undefined && message.filePath !== "") {
      obj.filePath = message.filePath;
    }
    if (message.serveAtPath !== undefined && message.serveAtPath !== "") {
      obj.serveAtPath = message.serveAtPath;
    }
    if (message.requireBuild !== undefined && message.requireBuild !== false) {
      obj.requireBuild = message.requireBuild;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReplayEnvStaticPageResource>, I>>(base?: I): ReplayEnvStaticPageResource {
    return ReplayEnvStaticPageResource.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReplayEnvStaticPageResource>, I>>(object: I): ReplayEnvStaticPageResource {
    const message = createBaseReplayEnvStaticPageResource();
    message.filePath = object.filePath ?? "";
    message.serveAtPath = object.serveAtPath ?? "";
    message.requireBuild = object.requireBuild ?? false;
    return message;
  },
};

messageTypeRegistry.set(ReplayEnvStaticPageResource.$type, ReplayEnvStaticPageResource);

function createBaseReplay(): Replay {
  return {
    $type: "pb.v1alpha1.Replay",
    env: undefined,
    events: [],
    actions: [],
    description: "",
    applications: [],
    expectGenerationFailure: "",
    expectGenerationFailureDetail: undefined,
    expectExecutionFailure: "",
    skipEvaluation: "",
    skipReason: undefined,
  };
}

export const Replay = {
  $type: "pb.v1alpha1.Replay" as const,

  encode(message: Replay, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.env !== undefined) {
      ReplayEnv.encode(message.env, writer.uint32(10).fork()).ldelim();
    }
    if (message.events !== undefined && message.events.length !== 0) {
      for (const v of message.events) {
        SimulateEvent.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.actions !== undefined && message.actions.length !== 0) {
      for (const v of message.actions) {
        Action.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.applications !== undefined && message.applications.length !== 0) {
      for (const v of message.applications) {
        writer.uint32(50).string(v!);
      }
    }
    if (message.expectGenerationFailure !== undefined && message.expectGenerationFailure !== "") {
      writer.uint32(58).string(message.expectGenerationFailure);
    }
    if (message.expectGenerationFailureDetail !== undefined) {
      ExpectGenerationFailure.encode(message.expectGenerationFailureDetail, writer.uint32(90).fork()).ldelim();
    }
    if (message.expectExecutionFailure !== undefined && message.expectExecutionFailure !== "") {
      writer.uint32(74).string(message.expectExecutionFailure);
    }
    if (message.skipEvaluation !== undefined && message.skipEvaluation !== "") {
      writer.uint32(66).string(message.skipEvaluation);
    }
    if (message.skipReason !== undefined) {
      SkipReason.encode(message.skipReason, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Replay {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReplay();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.env = ReplayEnv.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.events!.push(SimulateEvent.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.actions!.push(Action.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.applications!.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.expectGenerationFailure = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.expectGenerationFailureDetail = ExpectGenerationFailure.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.expectExecutionFailure = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.skipEvaluation = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.skipReason = SkipReason.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Replay {
    return {
      $type: Replay.$type,
      env: isSet(object.env) ? ReplayEnv.fromJSON(object.env) : undefined,
      events: globalThis.Array.isArray(object?.events) ? object.events.map((e: any) => SimulateEvent.fromJSON(e)) : [],
      actions: globalThis.Array.isArray(object?.actions) ? object.actions.map((e: any) => Action.fromJSON(e)) : [],
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      applications: globalThis.Array.isArray(object?.applications)
        ? object.applications.map((e: any) => globalThis.String(e))
        : [],
      expectGenerationFailure: isSet(object.expectGenerationFailure)
        ? globalThis.String(object.expectGenerationFailure)
        : "",
      expectGenerationFailureDetail: isSet(object.expectGenerationFailureDetail)
        ? ExpectGenerationFailure.fromJSON(object.expectGenerationFailureDetail)
        : undefined,
      expectExecutionFailure: isSet(object.expectExecutionFailure)
        ? globalThis.String(object.expectExecutionFailure)
        : "",
      skipEvaluation: isSet(object.skipEvaluation) ? globalThis.String(object.skipEvaluation) : "",
      skipReason: isSet(object.skipReason) ? SkipReason.fromJSON(object.skipReason) : undefined,
    };
  },

  toJSON(message: Replay): unknown {
    const obj: any = {};
    if (message.env !== undefined) {
      obj.env = ReplayEnv.toJSON(message.env);
    }
    if (message.events?.length) {
      obj.events = message.events.map((e) => SimulateEvent.toJSON(e));
    }
    if (message.actions?.length) {
      obj.actions = message.actions.map((e) => Action.toJSON(e));
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.applications?.length) {
      obj.applications = message.applications;
    }
    if (message.expectGenerationFailure !== undefined && message.expectGenerationFailure !== "") {
      obj.expectGenerationFailure = message.expectGenerationFailure;
    }
    if (message.expectGenerationFailureDetail !== undefined) {
      obj.expectGenerationFailureDetail = ExpectGenerationFailure.toJSON(message.expectGenerationFailureDetail);
    }
    if (message.expectExecutionFailure !== undefined && message.expectExecutionFailure !== "") {
      obj.expectExecutionFailure = message.expectExecutionFailure;
    }
    if (message.skipEvaluation !== undefined && message.skipEvaluation !== "") {
      obj.skipEvaluation = message.skipEvaluation;
    }
    if (message.skipReason !== undefined) {
      obj.skipReason = SkipReason.toJSON(message.skipReason);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Replay>, I>>(base?: I): Replay {
    return Replay.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Replay>, I>>(object: I): Replay {
    const message = createBaseReplay();
    message.env = (object.env !== undefined && object.env !== null) ? ReplayEnv.fromPartial(object.env) : undefined;
    message.events = object.events?.map((e) => SimulateEvent.fromPartial(e)) || [];
    message.actions = object.actions?.map((e) => Action.fromPartial(e)) || [];
    message.description = object.description ?? "";
    message.applications = object.applications?.map((e) => e) || [];
    message.expectGenerationFailure = object.expectGenerationFailure ?? "";
    message.expectGenerationFailureDetail =
      (object.expectGenerationFailureDetail !== undefined && object.expectGenerationFailureDetail !== null)
        ? ExpectGenerationFailure.fromPartial(object.expectGenerationFailureDetail)
        : undefined;
    message.expectExecutionFailure = object.expectExecutionFailure ?? "";
    message.skipEvaluation = object.skipEvaluation ?? "";
    message.skipReason = (object.skipReason !== undefined && object.skipReason !== null)
      ? SkipReason.fromPartial(object.skipReason)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(Replay.$type, Replay);

function createBaseSkipReason(): SkipReason {
  return { $type: "pb.v1alpha1.SkipReason", knownIssue: undefined, antiBot: undefined, other: undefined };
}

export const SkipReason = {
  $type: "pb.v1alpha1.SkipReason" as const,

  encode(message: SkipReason, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.knownIssue !== undefined) {
      SkipReasonKnownIssue.encode(message.knownIssue, writer.uint32(10).fork()).ldelim();
    }
    if (message.antiBot !== undefined) {
      SkipReasonAntibot.encode(message.antiBot, writer.uint32(18).fork()).ldelim();
    }
    if (message.other !== undefined) {
      writer.uint32(26).string(message.other);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkipReason {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkipReason();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.knownIssue = SkipReasonKnownIssue.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.antiBot = SkipReasonAntibot.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.other = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SkipReason {
    return {
      $type: SkipReason.$type,
      knownIssue: isSet(object.knownIssue) ? SkipReasonKnownIssue.fromJSON(object.knownIssue) : undefined,
      antiBot: isSet(object.antiBot) ? SkipReasonAntibot.fromJSON(object.antiBot) : undefined,
      other: isSet(object.other) ? globalThis.String(object.other) : undefined,
    };
  },

  toJSON(message: SkipReason): unknown {
    const obj: any = {};
    if (message.knownIssue !== undefined) {
      obj.knownIssue = SkipReasonKnownIssue.toJSON(message.knownIssue);
    }
    if (message.antiBot !== undefined) {
      obj.antiBot = SkipReasonAntibot.toJSON(message.antiBot);
    }
    if (message.other !== undefined) {
      obj.other = message.other;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SkipReason>, I>>(base?: I): SkipReason {
    return SkipReason.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SkipReason>, I>>(object: I): SkipReason {
    const message = createBaseSkipReason();
    message.knownIssue = (object.knownIssue !== undefined && object.knownIssue !== null)
      ? SkipReasonKnownIssue.fromPartial(object.knownIssue)
      : undefined;
    message.antiBot = (object.antiBot !== undefined && object.antiBot !== null)
      ? SkipReasonAntibot.fromPartial(object.antiBot)
      : undefined;
    message.other = object.other ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(SkipReason.$type, SkipReason);

function createBaseSkipReasonKnownIssue(): SkipReasonKnownIssue {
  return { $type: "pb.v1alpha1.SkipReason.KnownIssue", issueLink: "", description: "" };
}

export const SkipReasonKnownIssue = {
  $type: "pb.v1alpha1.SkipReason.KnownIssue" as const,

  encode(message: SkipReasonKnownIssue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.issueLink !== undefined && message.issueLink !== "") {
      writer.uint32(10).string(message.issueLink);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkipReasonKnownIssue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkipReasonKnownIssue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.issueLink = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SkipReasonKnownIssue {
    return {
      $type: SkipReasonKnownIssue.$type,
      issueLink: isSet(object.issueLink) ? globalThis.String(object.issueLink) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: SkipReasonKnownIssue): unknown {
    const obj: any = {};
    if (message.issueLink !== undefined && message.issueLink !== "") {
      obj.issueLink = message.issueLink;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SkipReasonKnownIssue>, I>>(base?: I): SkipReasonKnownIssue {
    return SkipReasonKnownIssue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SkipReasonKnownIssue>, I>>(object: I): SkipReasonKnownIssue {
    const message = createBaseSkipReasonKnownIssue();
    message.issueLink = object.issueLink ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

messageTypeRegistry.set(SkipReasonKnownIssue.$type, SkipReasonKnownIssue);

function createBaseSkipReasonAntibot(): SkipReasonAntibot {
  return { $type: "pb.v1alpha1.SkipReason.Antibot", description: "" };
}

export const SkipReasonAntibot = {
  $type: "pb.v1alpha1.SkipReason.Antibot" as const,

  encode(message: SkipReasonAntibot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkipReasonAntibot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkipReasonAntibot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SkipReasonAntibot {
    return {
      $type: SkipReasonAntibot.$type,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: SkipReasonAntibot): unknown {
    const obj: any = {};
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SkipReasonAntibot>, I>>(base?: I): SkipReasonAntibot {
    return SkipReasonAntibot.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SkipReasonAntibot>, I>>(object: I): SkipReasonAntibot {
    const message = createBaseSkipReasonAntibot();
    message.description = object.description ?? "";
    return message;
  },
};

messageTypeRegistry.set(SkipReasonAntibot.$type, SkipReasonAntibot);

function createBaseExpectGenerationFailure(): ExpectGenerationFailure {
  return { $type: "pb.v1alpha1.ExpectGenerationFailure", description: "", skipRetry: false };
}

export const ExpectGenerationFailure = {
  $type: "pb.v1alpha1.ExpectGenerationFailure" as const,

  encode(message: ExpectGenerationFailure, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.skipRetry !== undefined && message.skipRetry !== false) {
      writer.uint32(16).bool(message.skipRetry);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExpectGenerationFailure {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExpectGenerationFailure();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.skipRetry = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExpectGenerationFailure {
    return {
      $type: ExpectGenerationFailure.$type,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      skipRetry: isSet(object.skipRetry) ? globalThis.Boolean(object.skipRetry) : false,
    };
  },

  toJSON(message: ExpectGenerationFailure): unknown {
    const obj: any = {};
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.skipRetry !== undefined && message.skipRetry !== false) {
      obj.skipRetry = message.skipRetry;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExpectGenerationFailure>, I>>(base?: I): ExpectGenerationFailure {
    return ExpectGenerationFailure.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExpectGenerationFailure>, I>>(object: I): ExpectGenerationFailure {
    const message = createBaseExpectGenerationFailure();
    message.description = object.description ?? "";
    message.skipRetry = object.skipRetry ?? false;
    return message;
  },
};

messageTypeRegistry.set(ExpectGenerationFailure.$type, ExpectGenerationFailure);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
