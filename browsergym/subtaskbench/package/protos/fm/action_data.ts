/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Duration } from "../google/protobuf/duration";
import { Timestamp } from "../google/protobuf/timestamp";
import { DocumentBlob } from "../pb/v1alpha1/document";
import { Element, Rect } from "../pb/v1alpha1/element";
import { Action } from "../pb/v1alpha1/orbot_action";
import { messageTypeRegistry } from "../typeRegistry";
import { LLMContent, LLMInteraction } from "./llm_data";

export const protobufPackage = "fm";

/** Tentative, information about the decision made by the agent. */
export interface AgentState {
  $type?: "fm.AgentState";
  /** the list of queries made by the agent */
  llmInteractions?:
    | LLMInteraction[]
    | undefined;
  /** the memory of the agent, can be a string or a jsonified object */
  memory?:
    | string
    | undefined;
  /** the linked list of agent state that did not get grounded into an action at this step */
  previousFailedAgentState?: AgentState | undefined;
}

export interface Viewport {
  $type?: "fm.Viewport";
  /** the viewport screenshot */
  screenshot?:
    | DocumentBlob
    | undefined;
  /** the "bounding box" of the viewport */
  viewportRect?: Rect | undefined;
}

/**
 * The raw representation of a web page observation from BrowserGym.
 * Fields overlapping with existing fields in WebState are removed.
 */
export interface BrowserGymObservation {
  $type?: "fm.BrowserGymObservation";
  /**
   * BrowserGym environment output
   * See https://github.com/orby-ai-engineering/digital-agent/blob/d9d62cce50828d2628ea2c1334824165e2a352ee/scripts/test_run.py#L104
   */
  reward?:
    | number
    | undefined;
  /** Whether this is a terminal state */
  terminated?:
    | boolean
    | undefined;
  /** Whether the observation is truncated */
  truncated?:
    | boolean
    | undefined;
  /** the chat messages observed at this state */
  chatMessages?:
    | BrowserGymObservationChatMessage[]
    | undefined;
  /** goal represented as a string; deprecated in favor of goals by BrowserGym */
  legacyGoal?:
    | string
    | undefined;
  /** the goals the agent needs to reach in the environment */
  goals?:
    | LLMContent[]
    | undefined;
  /** the URLs of the open pages in the browser */
  openPagesUrls?:
    | string[]
    | undefined;
  /** the indices of the open pages in the browser */
  activePageIndex?:
    | number
    | undefined;
  /** the DOMTree representation of the page from BrowserGym, encoded by json.dumps(dom_object) */
  dom?:
    | string
    | undefined;
  /** the accessibility tree of the page from BrowserGym, encoded by json.dumps(axtree_object) */
  axtree?:
    | string
    | undefined;
  /**
   * The extra properties on each element with a browsergym_id (bid) padded by BrowserGym,
   * Created by browsergym.core.src.browsergym.core.obeservation.extract_dom_extra_properties
   * Extra information include:
   * - absolute x and position of the frame node in the parent
   * - frame's absolute position
   * - browsergym_id of each element
   * - visibility of each element
   * - bounding box of each element
   * - whether the element is clickable
   * - set_of_marks ? of each element
   * Encoded by json.dumps(extra_element_properties)
   */
  extraElementProperties?:
    | string
    | undefined;
  /** the browser gym ID of the focused element in the DOMTree, or null if no element is focused */
  focusedElementBid?:
    | string
    | undefined;
  /** the last action taken by the agent */
  lastAction?:
    | string
    | undefined;
  /** the error message of the last action */
  lastActionError?:
    | string
    | undefined;
  /** the elapsed time from the start of the episode */
  elapsedTime?: Duration | undefined;
}

export interface BrowserGymObservationChatMessage {
  $type?: "fm.BrowserGymObservation.ChatMessage";
  /** the identity of entity sending the message */
  role?:
    | string
    | undefined;
  /** the timestamp of the message; from python time.time() */
  timestamp?:
    | Date
    | undefined;
  /** the content of the message */
  message?: string | undefined;
}

/** Information about the current state of the web page. */
export interface WebState {
  $type?: "fm.WebState";
  /** the fingerprint of the page generated as a random hash (uuid.uuid4()[:SOME_CUTOFF]) */
  fingerprint?:
    | string
    | undefined;
  /** the URL of the page */
  url?:
    | string
    | undefined;
  /** the HTML content of the page */
  html?:
    | string
    | undefined;
  /** the viewport of the page */
  viewport?:
    | Viewport
    | undefined;
  /** the dom tree of the page */
  rootElement?:
    | Element
    | undefined;
  /** the raw representation of a web page observation from BrowserGym */
  browserGymObservation?: BrowserGymObservation | undefined;
}

/** The raw representation of an action from BrowserGym. */
export interface BrowserGymAction {
  $type?: "fm.BrowserGymAction";
  /** the raw string representation of the action */
  actionString?: string | undefined;
}

/** Used by FM crawler to represent the action taken by the FM agent. */
export interface ActionData {
  $type?: "fm.ActionData";
  /** the ID of the action generated as a random hash (uuid.uuid4()[:SOME_CUTOFF]) */
  id?:
    | string
    | undefined;
  /**
   * the URL where the action was taken; deprecated in favor of domain
   *
   * @deprecated
   */
  baseUrl?:
    | string
    | undefined;
  /** the action taken by the agent */
  action?:
    | Action
    | undefined;
  /**
   * the decision made by the agent; deprecated in favor of agent_state
   *
   * @deprecated
   */
  decision?:
    | Decision
    | undefined;
  /** the state of the page before the action */
  beforeState?:
    | WebState
    | undefined;
  /** the state of the page after the action */
  afterState?:
    | WebState
    | undefined;
  /** the trace of the action, encoded by python pickle.dumps(trace) */
  playwrightTrace?:
    | Uint8Array
    | undefined;
  /** the domain name of the URL where the action was taken */
  domain?:
    | string
    | undefined;
  /** the raw representation of an action from BrowserGym */
  browserGymAction?:
    | BrowserGymAction
    | undefined;
  /** the state of the agent after the action */
  agentState?: AgentState | undefined;
}

export interface Decision {
  $type?: "fm.Decision";
  /** the method used to make the decision (heuristic, agentic, etc.) */
  method?:
    | string
    | undefined;
  /** the high-level task that the decision is made for */
  highLevelTask?:
    | string
    | undefined;
  /** the low-level task that the decision is made for */
  lowLevelTask?:
    | string
    | undefined;
  /** the description of the action that the decision is made for */
  actionDescription?:
    | string
    | undefined;
  /** the natural language output of the agent */
  nlOutput?:
    | string
    | undefined;
  /** the list of failed decisions that the agent made THIS TURN */
  failedDecisions?:
    | string[]
    | undefined;
  /** the action that the agent decided to take */
  action?: Action | undefined;
}

function createBaseAgentState(): AgentState {
  return { $type: "fm.AgentState", llmInteractions: [], memory: "", previousFailedAgentState: undefined };
}

export const AgentState = {
  $type: "fm.AgentState" as const,

  encode(message: AgentState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.llmInteractions !== undefined && message.llmInteractions.length !== 0) {
      for (const v of message.llmInteractions) {
        LLMInteraction.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.memory !== undefined && message.memory !== "") {
      writer.uint32(18).string(message.memory);
    }
    if (message.previousFailedAgentState !== undefined) {
      AgentState.encode(message.previousFailedAgentState, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AgentState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAgentState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.llmInteractions!.push(LLMInteraction.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.memory = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.previousFailedAgentState = AgentState.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AgentState {
    return {
      $type: AgentState.$type,
      llmInteractions: globalThis.Array.isArray(object?.llmInteractions)
        ? object.llmInteractions.map((e: any) => LLMInteraction.fromJSON(e))
        : [],
      memory: isSet(object.memory) ? globalThis.String(object.memory) : "",
      previousFailedAgentState: isSet(object.previousFailedAgentState)
        ? AgentState.fromJSON(object.previousFailedAgentState)
        : undefined,
    };
  },

  toJSON(message: AgentState): unknown {
    const obj: any = {};
    if (message.llmInteractions?.length) {
      obj.llmInteractions = message.llmInteractions.map((e) => LLMInteraction.toJSON(e));
    }
    if (message.memory !== undefined && message.memory !== "") {
      obj.memory = message.memory;
    }
    if (message.previousFailedAgentState !== undefined) {
      obj.previousFailedAgentState = AgentState.toJSON(message.previousFailedAgentState);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AgentState>, I>>(base?: I): AgentState {
    return AgentState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AgentState>, I>>(object: I): AgentState {
    const message = createBaseAgentState();
    message.llmInteractions = object.llmInteractions?.map((e) => LLMInteraction.fromPartial(e)) || [];
    message.memory = object.memory ?? "";
    message.previousFailedAgentState =
      (object.previousFailedAgentState !== undefined && object.previousFailedAgentState !== null)
        ? AgentState.fromPartial(object.previousFailedAgentState)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(AgentState.$type, AgentState);

function createBaseViewport(): Viewport {
  return { $type: "fm.Viewport", screenshot: undefined, viewportRect: undefined };
}

export const Viewport = {
  $type: "fm.Viewport" as const,

  encode(message: Viewport, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.screenshot !== undefined) {
      DocumentBlob.encode(message.screenshot, writer.uint32(10).fork()).ldelim();
    }
    if (message.viewportRect !== undefined) {
      Rect.encode(message.viewportRect, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Viewport {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseViewport();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.screenshot = DocumentBlob.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.viewportRect = Rect.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Viewport {
    return {
      $type: Viewport.$type,
      screenshot: isSet(object.screenshot) ? DocumentBlob.fromJSON(object.screenshot) : undefined,
      viewportRect: isSet(object.viewportRect) ? Rect.fromJSON(object.viewportRect) : undefined,
    };
  },

  toJSON(message: Viewport): unknown {
    const obj: any = {};
    if (message.screenshot !== undefined) {
      obj.screenshot = DocumentBlob.toJSON(message.screenshot);
    }
    if (message.viewportRect !== undefined) {
      obj.viewportRect = Rect.toJSON(message.viewportRect);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Viewport>, I>>(base?: I): Viewport {
    return Viewport.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Viewport>, I>>(object: I): Viewport {
    const message = createBaseViewport();
    message.screenshot = (object.screenshot !== undefined && object.screenshot !== null)
      ? DocumentBlob.fromPartial(object.screenshot)
      : undefined;
    message.viewportRect = (object.viewportRect !== undefined && object.viewportRect !== null)
      ? Rect.fromPartial(object.viewportRect)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(Viewport.$type, Viewport);

function createBaseBrowserGymObservation(): BrowserGymObservation {
  return {
    $type: "fm.BrowserGymObservation",
    reward: 0,
    terminated: false,
    truncated: false,
    chatMessages: [],
    legacyGoal: "",
    goals: [],
    openPagesUrls: [],
    activePageIndex: 0,
    dom: "",
    axtree: "",
    extraElementProperties: "",
    focusedElementBid: "",
    lastAction: "",
    lastActionError: "",
    elapsedTime: undefined,
  };
}

export const BrowserGymObservation = {
  $type: "fm.BrowserGymObservation" as const,

  encode(message: BrowserGymObservation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reward !== undefined && message.reward !== 0) {
      writer.uint32(13).float(message.reward);
    }
    if (message.terminated !== undefined && message.terminated !== false) {
      writer.uint32(16).bool(message.terminated);
    }
    if (message.truncated !== undefined && message.truncated !== false) {
      writer.uint32(24).bool(message.truncated);
    }
    if (message.chatMessages !== undefined && message.chatMessages.length !== 0) {
      for (const v of message.chatMessages) {
        BrowserGymObservationChatMessage.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.legacyGoal !== undefined && message.legacyGoal !== "") {
      writer.uint32(42).string(message.legacyGoal);
    }
    if (message.goals !== undefined && message.goals.length !== 0) {
      for (const v of message.goals) {
        LLMContent.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    if (message.openPagesUrls !== undefined && message.openPagesUrls.length !== 0) {
      for (const v of message.openPagesUrls) {
        writer.uint32(58).string(v!);
      }
    }
    if (message.activePageIndex !== undefined && message.activePageIndex !== 0) {
      writer.uint32(64).int32(message.activePageIndex);
    }
    if (message.dom !== undefined && message.dom !== "") {
      writer.uint32(74).string(message.dom);
    }
    if (message.axtree !== undefined && message.axtree !== "") {
      writer.uint32(82).string(message.axtree);
    }
    if (message.extraElementProperties !== undefined && message.extraElementProperties !== "") {
      writer.uint32(90).string(message.extraElementProperties);
    }
    if (message.focusedElementBid !== undefined && message.focusedElementBid !== "") {
      writer.uint32(98).string(message.focusedElementBid);
    }
    if (message.lastAction !== undefined && message.lastAction !== "") {
      writer.uint32(106).string(message.lastAction);
    }
    if (message.lastActionError !== undefined && message.lastActionError !== "") {
      writer.uint32(114).string(message.lastActionError);
    }
    if (message.elapsedTime !== undefined) {
      Duration.encode(message.elapsedTime, writer.uint32(122).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserGymObservation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserGymObservation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.reward = reader.float();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.terminated = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.truncated = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.chatMessages!.push(BrowserGymObservationChatMessage.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.legacyGoal = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.goals!.push(LLMContent.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.openPagesUrls!.push(reader.string());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.activePageIndex = reader.int32();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.dom = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.axtree = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.extraElementProperties = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.focusedElementBid = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.lastAction = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.lastActionError = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.elapsedTime = Duration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserGymObservation {
    return {
      $type: BrowserGymObservation.$type,
      reward: isSet(object.reward) ? globalThis.Number(object.reward) : 0,
      terminated: isSet(object.terminated) ? globalThis.Boolean(object.terminated) : false,
      truncated: isSet(object.truncated) ? globalThis.Boolean(object.truncated) : false,
      chatMessages: globalThis.Array.isArray(object?.chatMessages)
        ? object.chatMessages.map((e: any) => BrowserGymObservationChatMessage.fromJSON(e))
        : [],
      legacyGoal: isSet(object.legacyGoal) ? globalThis.String(object.legacyGoal) : "",
      goals: globalThis.Array.isArray(object?.goals) ? object.goals.map((e: any) => LLMContent.fromJSON(e)) : [],
      openPagesUrls: globalThis.Array.isArray(object?.openPagesUrls)
        ? object.openPagesUrls.map((e: any) => globalThis.String(e))
        : [],
      activePageIndex: isSet(object.activePageIndex) ? globalThis.Number(object.activePageIndex) : 0,
      dom: isSet(object.dom) ? globalThis.String(object.dom) : "",
      axtree: isSet(object.axtree) ? globalThis.String(object.axtree) : "",
      extraElementProperties: isSet(object.extraElementProperties)
        ? globalThis.String(object.extraElementProperties)
        : "",
      focusedElementBid: isSet(object.focusedElementBid) ? globalThis.String(object.focusedElementBid) : "",
      lastAction: isSet(object.lastAction) ? globalThis.String(object.lastAction) : "",
      lastActionError: isSet(object.lastActionError) ? globalThis.String(object.lastActionError) : "",
      elapsedTime: isSet(object.elapsedTime) ? Duration.fromJSON(object.elapsedTime) : undefined,
    };
  },

  toJSON(message: BrowserGymObservation): unknown {
    const obj: any = {};
    if (message.reward !== undefined && message.reward !== 0) {
      obj.reward = message.reward;
    }
    if (message.terminated !== undefined && message.terminated !== false) {
      obj.terminated = message.terminated;
    }
    if (message.truncated !== undefined && message.truncated !== false) {
      obj.truncated = message.truncated;
    }
    if (message.chatMessages?.length) {
      obj.chatMessages = message.chatMessages.map((e) => BrowserGymObservationChatMessage.toJSON(e));
    }
    if (message.legacyGoal !== undefined && message.legacyGoal !== "") {
      obj.legacyGoal = message.legacyGoal;
    }
    if (message.goals?.length) {
      obj.goals = message.goals.map((e) => LLMContent.toJSON(e));
    }
    if (message.openPagesUrls?.length) {
      obj.openPagesUrls = message.openPagesUrls;
    }
    if (message.activePageIndex !== undefined && message.activePageIndex !== 0) {
      obj.activePageIndex = Math.round(message.activePageIndex);
    }
    if (message.dom !== undefined && message.dom !== "") {
      obj.dom = message.dom;
    }
    if (message.axtree !== undefined && message.axtree !== "") {
      obj.axtree = message.axtree;
    }
    if (message.extraElementProperties !== undefined && message.extraElementProperties !== "") {
      obj.extraElementProperties = message.extraElementProperties;
    }
    if (message.focusedElementBid !== undefined && message.focusedElementBid !== "") {
      obj.focusedElementBid = message.focusedElementBid;
    }
    if (message.lastAction !== undefined && message.lastAction !== "") {
      obj.lastAction = message.lastAction;
    }
    if (message.lastActionError !== undefined && message.lastActionError !== "") {
      obj.lastActionError = message.lastActionError;
    }
    if (message.elapsedTime !== undefined) {
      obj.elapsedTime = Duration.toJSON(message.elapsedTime);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserGymObservation>, I>>(base?: I): BrowserGymObservation {
    return BrowserGymObservation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BrowserGymObservation>, I>>(object: I): BrowserGymObservation {
    const message = createBaseBrowserGymObservation();
    message.reward = object.reward ?? 0;
    message.terminated = object.terminated ?? false;
    message.truncated = object.truncated ?? false;
    message.chatMessages = object.chatMessages?.map((e) => BrowserGymObservationChatMessage.fromPartial(e)) || [];
    message.legacyGoal = object.legacyGoal ?? "";
    message.goals = object.goals?.map((e) => LLMContent.fromPartial(e)) || [];
    message.openPagesUrls = object.openPagesUrls?.map((e) => e) || [];
    message.activePageIndex = object.activePageIndex ?? 0;
    message.dom = object.dom ?? "";
    message.axtree = object.axtree ?? "";
    message.extraElementProperties = object.extraElementProperties ?? "";
    message.focusedElementBid = object.focusedElementBid ?? "";
    message.lastAction = object.lastAction ?? "";
    message.lastActionError = object.lastActionError ?? "";
    message.elapsedTime = (object.elapsedTime !== undefined && object.elapsedTime !== null)
      ? Duration.fromPartial(object.elapsedTime)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(BrowserGymObservation.$type, BrowserGymObservation);

function createBaseBrowserGymObservationChatMessage(): BrowserGymObservationChatMessage {
  return { $type: "fm.BrowserGymObservation.ChatMessage", role: "", timestamp: undefined, message: "" };
}

export const BrowserGymObservationChatMessage = {
  $type: "fm.BrowserGymObservation.ChatMessage" as const,

  encode(message: BrowserGymObservationChatMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.role !== undefined && message.role !== "") {
      writer.uint32(10).string(message.role);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
    }
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserGymObservationChatMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserGymObservationChatMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.role = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserGymObservationChatMessage {
    return {
      $type: BrowserGymObservationChatMessage.$type,
      role: isSet(object.role) ? globalThis.String(object.role) : "",
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: BrowserGymObservationChatMessage): unknown {
    const obj: any = {};
    if (message.role !== undefined && message.role !== "") {
      obj.role = message.role;
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserGymObservationChatMessage>, I>>(
    base?: I,
  ): BrowserGymObservationChatMessage {
    return BrowserGymObservationChatMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BrowserGymObservationChatMessage>, I>>(
    object: I,
  ): BrowserGymObservationChatMessage {
    const message = createBaseBrowserGymObservationChatMessage();
    message.role = object.role ?? "";
    message.timestamp = object.timestamp ?? undefined;
    message.message = object.message ?? "";
    return message;
  },
};

messageTypeRegistry.set(BrowserGymObservationChatMessage.$type, BrowserGymObservationChatMessage);

function createBaseWebState(): WebState {
  return {
    $type: "fm.WebState",
    fingerprint: "",
    url: "",
    html: "",
    viewport: undefined,
    rootElement: undefined,
    browserGymObservation: undefined,
  };
}

export const WebState = {
  $type: "fm.WebState" as const,

  encode(message: WebState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fingerprint !== undefined && message.fingerprint !== "") {
      writer.uint32(10).string(message.fingerprint);
    }
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.html !== undefined && message.html !== "") {
      writer.uint32(26).string(message.html);
    }
    if (message.viewport !== undefined) {
      Viewport.encode(message.viewport, writer.uint32(34).fork()).ldelim();
    }
    if (message.rootElement !== undefined) {
      Element.encode(message.rootElement, writer.uint32(42).fork()).ldelim();
    }
    if (message.browserGymObservation !== undefined) {
      BrowserGymObservation.encode(message.browserGymObservation, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WebState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWebState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fingerprint = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.url = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.html = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.viewport = Viewport.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.rootElement = Element.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.browserGymObservation = BrowserGymObservation.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WebState {
    return {
      $type: WebState.$type,
      fingerprint: isSet(object.fingerprint) ? globalThis.String(object.fingerprint) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      html: isSet(object.html) ? globalThis.String(object.html) : "",
      viewport: isSet(object.viewport) ? Viewport.fromJSON(object.viewport) : undefined,
      rootElement: isSet(object.rootElement) ? Element.fromJSON(object.rootElement) : undefined,
      browserGymObservation: isSet(object.browserGymObservation)
        ? BrowserGymObservation.fromJSON(object.browserGymObservation)
        : undefined,
    };
  },

  toJSON(message: WebState): unknown {
    const obj: any = {};
    if (message.fingerprint !== undefined && message.fingerprint !== "") {
      obj.fingerprint = message.fingerprint;
    }
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    if (message.html !== undefined && message.html !== "") {
      obj.html = message.html;
    }
    if (message.viewport !== undefined) {
      obj.viewport = Viewport.toJSON(message.viewport);
    }
    if (message.rootElement !== undefined) {
      obj.rootElement = Element.toJSON(message.rootElement);
    }
    if (message.browserGymObservation !== undefined) {
      obj.browserGymObservation = BrowserGymObservation.toJSON(message.browserGymObservation);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WebState>, I>>(base?: I): WebState {
    return WebState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WebState>, I>>(object: I): WebState {
    const message = createBaseWebState();
    message.fingerprint = object.fingerprint ?? "";
    message.url = object.url ?? "";
    message.html = object.html ?? "";
    message.viewport = (object.viewport !== undefined && object.viewport !== null)
      ? Viewport.fromPartial(object.viewport)
      : undefined;
    message.rootElement = (object.rootElement !== undefined && object.rootElement !== null)
      ? Element.fromPartial(object.rootElement)
      : undefined;
    message.browserGymObservation =
      (object.browserGymObservation !== undefined && object.browserGymObservation !== null)
        ? BrowserGymObservation.fromPartial(object.browserGymObservation)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(WebState.$type, WebState);

function createBaseBrowserGymAction(): BrowserGymAction {
  return { $type: "fm.BrowserGymAction", actionString: "" };
}

export const BrowserGymAction = {
  $type: "fm.BrowserGymAction" as const,

  encode(message: BrowserGymAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.actionString !== undefined && message.actionString !== "") {
      writer.uint32(10).string(message.actionString);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserGymAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserGymAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.actionString = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserGymAction {
    return {
      $type: BrowserGymAction.$type,
      actionString: isSet(object.actionString) ? globalThis.String(object.actionString) : "",
    };
  },

  toJSON(message: BrowserGymAction): unknown {
    const obj: any = {};
    if (message.actionString !== undefined && message.actionString !== "") {
      obj.actionString = message.actionString;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserGymAction>, I>>(base?: I): BrowserGymAction {
    return BrowserGymAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BrowserGymAction>, I>>(object: I): BrowserGymAction {
    const message = createBaseBrowserGymAction();
    message.actionString = object.actionString ?? "";
    return message;
  },
};

messageTypeRegistry.set(BrowserGymAction.$type, BrowserGymAction);

function createBaseActionData(): ActionData {
  return {
    $type: "fm.ActionData",
    id: "",
    baseUrl: "",
    action: undefined,
    decision: undefined,
    beforeState: undefined,
    afterState: undefined,
    playwrightTrace: new Uint8Array(0),
    domain: "",
    browserGymAction: undefined,
    agentState: undefined,
  };
}

export const ActionData = {
  $type: "fm.ActionData" as const,

  encode(message: ActionData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.baseUrl !== undefined && message.baseUrl !== "") {
      writer.uint32(18).string(message.baseUrl);
    }
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(26).fork()).ldelim();
    }
    if (message.decision !== undefined) {
      Decision.encode(message.decision, writer.uint32(34).fork()).ldelim();
    }
    if (message.beforeState !== undefined) {
      WebState.encode(message.beforeState, writer.uint32(42).fork()).ldelim();
    }
    if (message.afterState !== undefined) {
      WebState.encode(message.afterState, writer.uint32(50).fork()).ldelim();
    }
    if (message.playwrightTrace !== undefined && message.playwrightTrace.length !== 0) {
      writer.uint32(58).bytes(message.playwrightTrace);
    }
    if (message.domain !== undefined && message.domain !== "") {
      writer.uint32(66).string(message.domain);
    }
    if (message.browserGymAction !== undefined) {
      BrowserGymAction.encode(message.browserGymAction, writer.uint32(74).fork()).ldelim();
    }
    if (message.agentState !== undefined) {
      AgentState.encode(message.agentState, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.baseUrl = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.action = Action.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.decision = Decision.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.beforeState = WebState.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.afterState = WebState.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.playwrightTrace = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.domain = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.browserGymAction = BrowserGymAction.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.agentState = AgentState.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionData {
    return {
      $type: ActionData.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      baseUrl: isSet(object.baseUrl) ? globalThis.String(object.baseUrl) : "",
      action: isSet(object.action) ? Action.fromJSON(object.action) : undefined,
      decision: isSet(object.decision) ? Decision.fromJSON(object.decision) : undefined,
      beforeState: isSet(object.beforeState) ? WebState.fromJSON(object.beforeState) : undefined,
      afterState: isSet(object.afterState) ? WebState.fromJSON(object.afterState) : undefined,
      playwrightTrace: isSet(object.playwrightTrace) ? bytesFromBase64(object.playwrightTrace) : new Uint8Array(0),
      domain: isSet(object.domain) ? globalThis.String(object.domain) : "",
      browserGymAction: isSet(object.browserGymAction) ? BrowserGymAction.fromJSON(object.browserGymAction) : undefined,
      agentState: isSet(object.agentState) ? AgentState.fromJSON(object.agentState) : undefined,
    };
  },

  toJSON(message: ActionData): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.baseUrl !== undefined && message.baseUrl !== "") {
      obj.baseUrl = message.baseUrl;
    }
    if (message.action !== undefined) {
      obj.action = Action.toJSON(message.action);
    }
    if (message.decision !== undefined) {
      obj.decision = Decision.toJSON(message.decision);
    }
    if (message.beforeState !== undefined) {
      obj.beforeState = WebState.toJSON(message.beforeState);
    }
    if (message.afterState !== undefined) {
      obj.afterState = WebState.toJSON(message.afterState);
    }
    if (message.playwrightTrace !== undefined && message.playwrightTrace.length !== 0) {
      obj.playwrightTrace = base64FromBytes(message.playwrightTrace);
    }
    if (message.domain !== undefined && message.domain !== "") {
      obj.domain = message.domain;
    }
    if (message.browserGymAction !== undefined) {
      obj.browserGymAction = BrowserGymAction.toJSON(message.browserGymAction);
    }
    if (message.agentState !== undefined) {
      obj.agentState = AgentState.toJSON(message.agentState);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionData>, I>>(base?: I): ActionData {
    return ActionData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionData>, I>>(object: I): ActionData {
    const message = createBaseActionData();
    message.id = object.id ?? "";
    message.baseUrl = object.baseUrl ?? "";
    message.action = (object.action !== undefined && object.action !== null)
      ? Action.fromPartial(object.action)
      : undefined;
    message.decision = (object.decision !== undefined && object.decision !== null)
      ? Decision.fromPartial(object.decision)
      : undefined;
    message.beforeState = (object.beforeState !== undefined && object.beforeState !== null)
      ? WebState.fromPartial(object.beforeState)
      : undefined;
    message.afterState = (object.afterState !== undefined && object.afterState !== null)
      ? WebState.fromPartial(object.afterState)
      : undefined;
    message.playwrightTrace = object.playwrightTrace ?? new Uint8Array(0);
    message.domain = object.domain ?? "";
    message.browserGymAction = (object.browserGymAction !== undefined && object.browserGymAction !== null)
      ? BrowserGymAction.fromPartial(object.browserGymAction)
      : undefined;
    message.agentState = (object.agentState !== undefined && object.agentState !== null)
      ? AgentState.fromPartial(object.agentState)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ActionData.$type, ActionData);

function createBaseDecision(): Decision {
  return {
    $type: "fm.Decision",
    method: "",
    highLevelTask: "",
    lowLevelTask: "",
    actionDescription: "",
    nlOutput: "",
    failedDecisions: [],
    action: undefined,
  };
}

export const Decision = {
  $type: "fm.Decision" as const,

  encode(message: Decision, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.method !== undefined && message.method !== "") {
      writer.uint32(10).string(message.method);
    }
    if (message.highLevelTask !== undefined && message.highLevelTask !== "") {
      writer.uint32(18).string(message.highLevelTask);
    }
    if (message.lowLevelTask !== undefined && message.lowLevelTask !== "") {
      writer.uint32(26).string(message.lowLevelTask);
    }
    if (message.actionDescription !== undefined && message.actionDescription !== "") {
      writer.uint32(34).string(message.actionDescription);
    }
    if (message.nlOutput !== undefined && message.nlOutput !== "") {
      writer.uint32(42).string(message.nlOutput);
    }
    if (message.failedDecisions !== undefined && message.failedDecisions.length !== 0) {
      for (const v of message.failedDecisions) {
        writer.uint32(50).string(v!);
      }
    }
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Decision {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecision();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.method = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.highLevelTask = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lowLevelTask = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.actionDescription = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.nlOutput = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.failedDecisions!.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.action = Action.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Decision {
    return {
      $type: Decision.$type,
      method: isSet(object.method) ? globalThis.String(object.method) : "",
      highLevelTask: isSet(object.highLevelTask) ? globalThis.String(object.highLevelTask) : "",
      lowLevelTask: isSet(object.lowLevelTask) ? globalThis.String(object.lowLevelTask) : "",
      actionDescription: isSet(object.actionDescription) ? globalThis.String(object.actionDescription) : "",
      nlOutput: isSet(object.nlOutput) ? globalThis.String(object.nlOutput) : "",
      failedDecisions: globalThis.Array.isArray(object?.failedDecisions)
        ? object.failedDecisions.map((e: any) => globalThis.String(e))
        : [],
      action: isSet(object.action) ? Action.fromJSON(object.action) : undefined,
    };
  },

  toJSON(message: Decision): unknown {
    const obj: any = {};
    if (message.method !== undefined && message.method !== "") {
      obj.method = message.method;
    }
    if (message.highLevelTask !== undefined && message.highLevelTask !== "") {
      obj.highLevelTask = message.highLevelTask;
    }
    if (message.lowLevelTask !== undefined && message.lowLevelTask !== "") {
      obj.lowLevelTask = message.lowLevelTask;
    }
    if (message.actionDescription !== undefined && message.actionDescription !== "") {
      obj.actionDescription = message.actionDescription;
    }
    if (message.nlOutput !== undefined && message.nlOutput !== "") {
      obj.nlOutput = message.nlOutput;
    }
    if (message.failedDecisions?.length) {
      obj.failedDecisions = message.failedDecisions;
    }
    if (message.action !== undefined) {
      obj.action = Action.toJSON(message.action);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Decision>, I>>(base?: I): Decision {
    return Decision.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Decision>, I>>(object: I): Decision {
    const message = createBaseDecision();
    message.method = object.method ?? "";
    message.highLevelTask = object.highLevelTask ?? "";
    message.lowLevelTask = object.lowLevelTask ?? "";
    message.actionDescription = object.actionDescription ?? "";
    message.nlOutput = object.nlOutput ?? "";
    message.failedDecisions = object.failedDecisions?.map((e) => e) || [];
    message.action = (object.action !== undefined && object.action !== null)
      ? Action.fromPartial(object.action)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(Decision.$type, Decision);

function bytesFromBase64(b64: string): Uint8Array {
  const bin = globalThis.atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(globalThis.String.fromCharCode(byte));
  });
  return globalThis.btoa(bin.join(""));
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { $type: "google.protobuf.Timestamp", seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
