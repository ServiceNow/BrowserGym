/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Empty } from "../../google/protobuf/empty";
import { messageTypeRegistry } from "../../typeRegistry";
import { SmartActionHITLResult } from "./actionprocessing";
import { Document } from "./document";
import { Element, ElementLocator } from "./element";
import { Field } from "./field";
import { Action, UiState, WorkflowVariable } from "./orbot_action";
import { Workflow } from "./orbot_workflow";

export const protobufPackage = "pb.v1alpha1";

export enum ExecutionStatus {
  UNSPECIFIED = 0,
  CREATED = 1,
  EXECUTING = 2,
  USER_STOP = 3,
  WAITING_FOR_CONFIRMATION = 4,
  WAITING_FOR_REVIEW = 5,
  REVIEWED = 6,
  COMPLETED = 7,
  DESTROYED = 8,
  UNRECOGNIZED = -1,
}

export function executionStatusFromJSON(object: any): ExecutionStatus {
  switch (object) {
    case 0:
    case "EXECUTION_STATUS_UNSPECIFIED":
      return ExecutionStatus.UNSPECIFIED;
    case 1:
    case "EXECUTION_STATUS_CREATED":
      return ExecutionStatus.CREATED;
    case 2:
    case "EXECUTION_STATUS_EXECUTING":
      return ExecutionStatus.EXECUTING;
    case 3:
    case "EXECUTION_STATUS_USER_STOP":
      return ExecutionStatus.USER_STOP;
    case 4:
    case "EXECUTION_STATUS_WAITING_FOR_CONFIRMATION":
      return ExecutionStatus.WAITING_FOR_CONFIRMATION;
    case 5:
    case "EXECUTION_STATUS_WAITING_FOR_REVIEW":
      return ExecutionStatus.WAITING_FOR_REVIEW;
    case 6:
    case "EXECUTION_STATUS_REVIEWED":
      return ExecutionStatus.REVIEWED;
    case 7:
    case "EXECUTION_STATUS_COMPLETED":
      return ExecutionStatus.COMPLETED;
    case 8:
    case "EXECUTION_STATUS_DESTROYED":
      return ExecutionStatus.DESTROYED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ExecutionStatus.UNRECOGNIZED;
  }
}

export function executionStatusToJSON(object: ExecutionStatus): string {
  switch (object) {
    case ExecutionStatus.UNSPECIFIED:
      return "EXECUTION_STATUS_UNSPECIFIED";
    case ExecutionStatus.CREATED:
      return "EXECUTION_STATUS_CREATED";
    case ExecutionStatus.EXECUTING:
      return "EXECUTION_STATUS_EXECUTING";
    case ExecutionStatus.USER_STOP:
      return "EXECUTION_STATUS_USER_STOP";
    case ExecutionStatus.WAITING_FOR_CONFIRMATION:
      return "EXECUTION_STATUS_WAITING_FOR_CONFIRMATION";
    case ExecutionStatus.WAITING_FOR_REVIEW:
      return "EXECUTION_STATUS_WAITING_FOR_REVIEW";
    case ExecutionStatus.REVIEWED:
      return "EXECUTION_STATUS_REVIEWED";
    case ExecutionStatus.COMPLETED:
      return "EXECUTION_STATUS_COMPLETED";
    case ExecutionStatus.DESTROYED:
      return "EXECUTION_STATUS_DESTROYED";
    case ExecutionStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ClientToServerMessage {
  $type?: "pb.v1alpha1.ClientToServerMessage";
  /** Unique Id for the message. */
  messageId?:
    | string
    | undefined;
  /** Id corresponding to message this message was triggered. */
  correlationId?:
    | string
    | undefined;
  /**
   * Below fields are used to identify the client.
   * These fields are deprecated and will be removed in the future, we don't need them anymore.
   *
   * @deprecated
   */
  userId?:
    | string
    | undefined;
  /** @deprecated */
  connectionId?: string | undefined;
  heartbeat?: Heartbeat | undefined;
  getExecution?: GetExecution | undefined;
  ack?:
    | Ack
    | undefined;
  /**
   * Signal server to stop execution. Triggered when user clicks stop button on the side panel.
   * Notably there is no message to manually start an execution.
   * To manually start an execution, client should create a new execution object with the current connection id.
   * Server will then send StartExecution message back to the same client to start the execution.
   */
  stopExecution?:
    | StopExecution
    | undefined;
  /**
   * Reports the result of an action executed on the client side in response to an ExecuteClientAction message.
   * The result can be one of the following:
   *
   * 1. empty
   *    - Action executed successfully with no return data
   *    - Server proceeds to execute next action
   *
   * 2. action-specific results (form, list, element, document)
   *    - Action executed successfully with return data
   *    - Server processes the returned data and proceeds
   *
   * 3. error
   *    - Action execution failed
   *    - Server may either stop execution or retry the action
   *
   * 4. waiting_for_review
   *    - Action requires human intervention
   *    - Server pauses execution pending review
   *    - Example flow:
   *      a. Server sends ExecuteClientAction to client to click on an element
   *      b. Client executes click action but cannot find the element → sends waiting_for_review
   *      c. User helps locate element
   *      d. Client sends empty result after user confirms
   */
  reportActionResult?: ReportActionResult | undefined;
}

export interface ServerToClientMessage {
  $type?: "pb.v1alpha1.ServerToClientMessage";
  /** Unique Id for the message. */
  messageId?:
    | string
    | undefined;
  /** Id corresponding to message this message was triggered. */
  correlationId?: string | undefined;
  startExecution?: StartExecution | undefined;
  resumeExecution?:
    | ResumeExecution
    | undefined;
  /**
   * @deprecated - Use StartExecution instead
   *
   * @deprecated
   */
  executeWorkflow?: ExecuteWorkflow | undefined;
  stopExecution?: StopExecution | undefined;
  ack?:
    | Ack
    | undefined;
  /** Command to execute an action on the client */
  executeClientAction?:
    | ExecuteClientAction
    | undefined;
  /** Update the execution state to show in side panel */
  updateExecutionState?: UpdateExecutionState | undefined;
}

export interface Heartbeat {
  $type?: "pb.v1alpha1.Heartbeat";
  timestamp?: number | undefined;
}

export interface ExecuteWorkflow {
  $type?: "pb.v1alpha1.ExecuteWorkflow";
  workflowId?: string | undefined;
  processId?: string | undefined;
  workflowVariables?: WorkflowVariable[] | undefined;
}

export interface GetExecution {
  $type?: "pb.v1alpha1.GetExecution";
  orgId?: string | undefined;
}

export interface StartExecution {
  $type?: "pb.v1alpha1.StartExecution";
  executionId?: string | undefined;
  scheduleId?: string | undefined;
  workflow?: Workflow | undefined;
  processId?: string | undefined;
}

export interface ResumeExecution {
  $type?: "pb.v1alpha1.ResumeExecution";
  executionId?: string | undefined;
  result?: SmartActionHITLResult | undefined;
}

export interface StopExecution {
  $type?: "pb.v1alpha1.StopExecution";
  executionId?: string | undefined;
  reason?:
    | StopExecutionReason
    | undefined;
  /** Message to display to the user. */
  alertInfo?: StopExecutionAlertInfo | undefined;
  scope?: StopExecutionScope | undefined;
}

export enum StopExecutionReason {
  UNSPECIFIED = 0,
  /** PARENT_CANCEL - If the parent execution was cancelled by the user, it may trigger all child execution to stop. */
  PARENT_CANCEL = 1,
  /** USER_CANCEL - If the particular execution was cancelled by the user. */
  USER_CANCEL = 2,
  /** TAB_CLOSED - If the tab is closed by the user. */
  TAB_CLOSED = 3,
  /** COMPLETED - Execution is completed */
  COMPLETED = 4,
  /** ERROR - Execution is stopped due to an error. */
  ERROR = 5,
  UNRECOGNIZED = -1,
}

export function stopExecutionReasonFromJSON(object: any): StopExecutionReason {
  switch (object) {
    case 0:
    case "REASON_UNSPECIFIED":
      return StopExecutionReason.UNSPECIFIED;
    case 1:
    case "REASON_PARENT_CANCEL":
      return StopExecutionReason.PARENT_CANCEL;
    case 2:
    case "REASON_USER_CANCEL":
      return StopExecutionReason.USER_CANCEL;
    case 3:
    case "REASON_TAB_CLOSED":
      return StopExecutionReason.TAB_CLOSED;
    case 4:
    case "REASON_COMPLETED":
      return StopExecutionReason.COMPLETED;
    case 5:
    case "REASON_ERROR":
      return StopExecutionReason.ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StopExecutionReason.UNRECOGNIZED;
  }
}

export function stopExecutionReasonToJSON(object: StopExecutionReason): string {
  switch (object) {
    case StopExecutionReason.UNSPECIFIED:
      return "REASON_UNSPECIFIED";
    case StopExecutionReason.PARENT_CANCEL:
      return "REASON_PARENT_CANCEL";
    case StopExecutionReason.USER_CANCEL:
      return "REASON_USER_CANCEL";
    case StopExecutionReason.TAB_CLOSED:
      return "REASON_TAB_CLOSED";
    case StopExecutionReason.COMPLETED:
      return "REASON_COMPLETED";
    case StopExecutionReason.ERROR:
      return "REASON_ERROR";
    case StopExecutionReason.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum StopExecutionSeverity {
  UNSPECIFIED = 0,
  ERROR = 1,
  WARNING = 2,
  INFO = 3,
  SUCCESS = 4,
  UNRECOGNIZED = -1,
}

export function stopExecutionSeverityFromJSON(object: any): StopExecutionSeverity {
  switch (object) {
    case 0:
    case "SEVERITY_UNSPECIFIED":
      return StopExecutionSeverity.UNSPECIFIED;
    case 1:
    case "SEVERITY_ERROR":
      return StopExecutionSeverity.ERROR;
    case 2:
    case "SEVERITY_WARNING":
      return StopExecutionSeverity.WARNING;
    case 3:
    case "SEVERITY_INFO":
      return StopExecutionSeverity.INFO;
    case 4:
    case "SEVERITY_SUCCESS":
      return StopExecutionSeverity.SUCCESS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StopExecutionSeverity.UNRECOGNIZED;
  }
}

export function stopExecutionSeverityToJSON(object: StopExecutionSeverity): string {
  switch (object) {
    case StopExecutionSeverity.UNSPECIFIED:
      return "SEVERITY_UNSPECIFIED";
    case StopExecutionSeverity.ERROR:
      return "SEVERITY_ERROR";
    case StopExecutionSeverity.WARNING:
      return "SEVERITY_WARNING";
    case StopExecutionSeverity.INFO:
      return "SEVERITY_INFO";
    case StopExecutionSeverity.SUCCESS:
      return "SEVERITY_SUCCESS";
    case StopExecutionSeverity.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum StopExecutionScope {
  UNSPECIFIED = 0,
  /** SINGLE - Stop the current execution */
  SINGLE = 1,
  /** ALL - Stop all pending executions assigned to current connection */
  ALL = 2,
  UNRECOGNIZED = -1,
}

export function stopExecutionScopeFromJSON(object: any): StopExecutionScope {
  switch (object) {
    case 0:
    case "SCOPE_UNSPECIFIED":
      return StopExecutionScope.UNSPECIFIED;
    case 1:
    case "SCOPE_SINGLE":
      return StopExecutionScope.SINGLE;
    case 2:
    case "SCOPE_ALL":
      return StopExecutionScope.ALL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StopExecutionScope.UNRECOGNIZED;
  }
}

export function stopExecutionScopeToJSON(object: StopExecutionScope): string {
  switch (object) {
    case StopExecutionScope.UNSPECIFIED:
      return "SCOPE_UNSPECIFIED";
    case StopExecutionScope.SINGLE:
      return "SCOPE_SINGLE";
    case StopExecutionScope.ALL:
      return "SCOPE_ALL";
    case StopExecutionScope.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface StopExecutionAlertInfo {
  $type?: "pb.v1alpha1.StopExecution.AlertInfo";
  severity?: StopExecutionSeverity | undefined;
  title?: string | undefined;
  message?: string | undefined;
}

export interface Ack {
  $type?: "pb.v1alpha1.Ack";
  /** Option message which can be passed. */
  extraMessage?: string | undefined;
}

export interface PauseExecution {
  $type?: "pb.v1alpha1.PauseExecution";
  executionId?:
    | string
    | undefined;
  /**
   * Review task id is included when server sends this message to client due to HITL.
   * Client can use this task id to load smart action response for HITL on side panel.
   */
  reviewTaskId?: string | undefined;
}

export interface ExecuteClientAction {
  $type?: "pb.v1alpha1.ExecuteClientAction";
  executionId?: string | undefined;
  actionId?:
    | string
    | undefined;
  /** Expected to be transformed by the server to resolve all reference values before sending to client. */
  clientAction?:
    | Action
    | undefined;
  /** Optional information for validating the client action executed successfully. */
  validation?: ActionValidation | undefined;
}

export interface ActionValidation {
  $type?: "pb.v1alpha1.ActionValidation";
  /**
   * Element locator required for the next action. We can use it to validate the client action executed successfully,
   * and perform retries if needed.
   */
  lookAheadLocator?: ElementLocator | undefined;
}

export interface ReportActionResult {
  $type?: "pb.v1alpha1.ReportActionResult";
  executionId?: string | undefined;
  actionId?:
    | string
    | undefined;
  /** The UI state after the action is executed. */
  uiState?: UiState | undefined;
  error?: ExecutionError | undefined;
  waitingForReview?: WaitingForReview | undefined;
  form?: GetFormActionResult | undefined;
  list?: GetListActionResult | undefined;
  element?: GetElementActionResult | undefined;
  document?:
    | GetDocumentActionResult
    | undefined;
  /** For actions that don't return data */
  empty?: Empty | undefined;
}

export interface ExecutionError {
  $type?: "pb.v1alpha1.ExecutionError";
  internalMessage?:
    | string
    | undefined;
  /**
   * Optional message to display to the user. If not provided, it will be considered as internal error,
   * a generic error message will be displayed to the user.
   */
  displayMessage?: string | undefined;
}

export interface WaitingForReview {
  $type?: "pb.v1alpha1.WaitingForReview";
  message?: string | undefined;
}

export interface GetFormActionResult {
  $type?: "pb.v1alpha1.GetFormActionResult";
  fields?: Field[] | undefined;
}

export interface GetListActionResult {
  $type?: "pb.v1alpha1.GetListActionResult";
  items?: ListItem[] | undefined;
}

export interface ListItem {
  $type?: "pb.v1alpha1.ListItem";
  locator?: ElementLocator | undefined;
  fields?: Field[] | undefined;
}

export interface GetElementActionResult {
  $type?: "pb.v1alpha1.GetElementActionResult";
  element?: Element | undefined;
}

export interface GetDocumentActionResult {
  $type?: "pb.v1alpha1.GetDocumentActionResult";
  document?: Document | undefined;
}

export interface UpdateExecutionState {
  $type?: "pb.v1alpha1.UpdateExecutionState";
  executionId?: string | undefined;
  executedActionIds?: string[] | undefined;
  executingActionIds?: string[] | undefined;
  status?: ExecutionStatus | undefined;
}

function createBaseClientToServerMessage(): ClientToServerMessage {
  return {
    $type: "pb.v1alpha1.ClientToServerMessage",
    messageId: "",
    correlationId: "",
    userId: "",
    connectionId: "",
    heartbeat: undefined,
    getExecution: undefined,
    ack: undefined,
    stopExecution: undefined,
    reportActionResult: undefined,
  };
}

export const ClientToServerMessage = {
  $type: "pb.v1alpha1.ClientToServerMessage" as const,

  encode(message: ClientToServerMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.messageId !== undefined && message.messageId !== "") {
      writer.uint32(10).string(message.messageId);
    }
    if (message.correlationId !== undefined && message.correlationId !== "") {
      writer.uint32(18).string(message.correlationId);
    }
    if (message.userId !== undefined && message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    if (message.connectionId !== undefined && message.connectionId !== "") {
      writer.uint32(34).string(message.connectionId);
    }
    if (message.heartbeat !== undefined) {
      Heartbeat.encode(message.heartbeat, writer.uint32(42).fork()).ldelim();
    }
    if (message.getExecution !== undefined) {
      GetExecution.encode(message.getExecution, writer.uint32(50).fork()).ldelim();
    }
    if (message.ack !== undefined) {
      Ack.encode(message.ack, writer.uint32(58).fork()).ldelim();
    }
    if (message.stopExecution !== undefined) {
      StopExecution.encode(message.stopExecution, writer.uint32(66).fork()).ldelim();
    }
    if (message.reportActionResult !== undefined) {
      ReportActionResult.encode(message.reportActionResult, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClientToServerMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientToServerMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.messageId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.correlationId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.connectionId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.heartbeat = Heartbeat.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.getExecution = GetExecution.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.ack = Ack.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.stopExecution = StopExecution.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.reportActionResult = ReportActionResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClientToServerMessage {
    return {
      $type: ClientToServerMessage.$type,
      messageId: isSet(object.messageId) ? globalThis.String(object.messageId) : "",
      correlationId: isSet(object.correlationId) ? globalThis.String(object.correlationId) : "",
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      connectionId: isSet(object.connectionId) ? globalThis.String(object.connectionId) : "",
      heartbeat: isSet(object.heartbeat) ? Heartbeat.fromJSON(object.heartbeat) : undefined,
      getExecution: isSet(object.getExecution) ? GetExecution.fromJSON(object.getExecution) : undefined,
      ack: isSet(object.ack) ? Ack.fromJSON(object.ack) : undefined,
      stopExecution: isSet(object.stopExecution) ? StopExecution.fromJSON(object.stopExecution) : undefined,
      reportActionResult: isSet(object.reportActionResult)
        ? ReportActionResult.fromJSON(object.reportActionResult)
        : undefined,
    };
  },

  toJSON(message: ClientToServerMessage): unknown {
    const obj: any = {};
    if (message.messageId !== undefined && message.messageId !== "") {
      obj.messageId = message.messageId;
    }
    if (message.correlationId !== undefined && message.correlationId !== "") {
      obj.correlationId = message.correlationId;
    }
    if (message.userId !== undefined && message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.connectionId !== undefined && message.connectionId !== "") {
      obj.connectionId = message.connectionId;
    }
    if (message.heartbeat !== undefined) {
      obj.heartbeat = Heartbeat.toJSON(message.heartbeat);
    }
    if (message.getExecution !== undefined) {
      obj.getExecution = GetExecution.toJSON(message.getExecution);
    }
    if (message.ack !== undefined) {
      obj.ack = Ack.toJSON(message.ack);
    }
    if (message.stopExecution !== undefined) {
      obj.stopExecution = StopExecution.toJSON(message.stopExecution);
    }
    if (message.reportActionResult !== undefined) {
      obj.reportActionResult = ReportActionResult.toJSON(message.reportActionResult);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClientToServerMessage>, I>>(base?: I): ClientToServerMessage {
    return ClientToServerMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClientToServerMessage>, I>>(object: I): ClientToServerMessage {
    const message = createBaseClientToServerMessage();
    message.messageId = object.messageId ?? "";
    message.correlationId = object.correlationId ?? "";
    message.userId = object.userId ?? "";
    message.connectionId = object.connectionId ?? "";
    message.heartbeat = (object.heartbeat !== undefined && object.heartbeat !== null)
      ? Heartbeat.fromPartial(object.heartbeat)
      : undefined;
    message.getExecution = (object.getExecution !== undefined && object.getExecution !== null)
      ? GetExecution.fromPartial(object.getExecution)
      : undefined;
    message.ack = (object.ack !== undefined && object.ack !== null) ? Ack.fromPartial(object.ack) : undefined;
    message.stopExecution = (object.stopExecution !== undefined && object.stopExecution !== null)
      ? StopExecution.fromPartial(object.stopExecution)
      : undefined;
    message.reportActionResult = (object.reportActionResult !== undefined && object.reportActionResult !== null)
      ? ReportActionResult.fromPartial(object.reportActionResult)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ClientToServerMessage.$type, ClientToServerMessage);

function createBaseServerToClientMessage(): ServerToClientMessage {
  return {
    $type: "pb.v1alpha1.ServerToClientMessage",
    messageId: "",
    correlationId: "",
    startExecution: undefined,
    resumeExecution: undefined,
    executeWorkflow: undefined,
    stopExecution: undefined,
    ack: undefined,
    executeClientAction: undefined,
    updateExecutionState: undefined,
  };
}

export const ServerToClientMessage = {
  $type: "pb.v1alpha1.ServerToClientMessage" as const,

  encode(message: ServerToClientMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.messageId !== undefined && message.messageId !== "") {
      writer.uint32(10).string(message.messageId);
    }
    if (message.correlationId !== undefined && message.correlationId !== "") {
      writer.uint32(18).string(message.correlationId);
    }
    if (message.startExecution !== undefined) {
      StartExecution.encode(message.startExecution, writer.uint32(26).fork()).ldelim();
    }
    if (message.resumeExecution !== undefined) {
      ResumeExecution.encode(message.resumeExecution, writer.uint32(34).fork()).ldelim();
    }
    if (message.executeWorkflow !== undefined) {
      ExecuteWorkflow.encode(message.executeWorkflow, writer.uint32(42).fork()).ldelim();
    }
    if (message.stopExecution !== undefined) {
      StopExecution.encode(message.stopExecution, writer.uint32(58).fork()).ldelim();
    }
    if (message.ack !== undefined) {
      Ack.encode(message.ack, writer.uint32(50).fork()).ldelim();
    }
    if (message.executeClientAction !== undefined) {
      ExecuteClientAction.encode(message.executeClientAction, writer.uint32(66).fork()).ldelim();
    }
    if (message.updateExecutionState !== undefined) {
      UpdateExecutionState.encode(message.updateExecutionState, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServerToClientMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServerToClientMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.messageId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.correlationId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.startExecution = StartExecution.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.resumeExecution = ResumeExecution.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.executeWorkflow = ExecuteWorkflow.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.stopExecution = StopExecution.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.ack = Ack.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.executeClientAction = ExecuteClientAction.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.updateExecutionState = UpdateExecutionState.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ServerToClientMessage {
    return {
      $type: ServerToClientMessage.$type,
      messageId: isSet(object.messageId) ? globalThis.String(object.messageId) : "",
      correlationId: isSet(object.correlationId) ? globalThis.String(object.correlationId) : "",
      startExecution: isSet(object.startExecution) ? StartExecution.fromJSON(object.startExecution) : undefined,
      resumeExecution: isSet(object.resumeExecution) ? ResumeExecution.fromJSON(object.resumeExecution) : undefined,
      executeWorkflow: isSet(object.executeWorkflow) ? ExecuteWorkflow.fromJSON(object.executeWorkflow) : undefined,
      stopExecution: isSet(object.stopExecution) ? StopExecution.fromJSON(object.stopExecution) : undefined,
      ack: isSet(object.ack) ? Ack.fromJSON(object.ack) : undefined,
      executeClientAction: isSet(object.executeClientAction)
        ? ExecuteClientAction.fromJSON(object.executeClientAction)
        : undefined,
      updateExecutionState: isSet(object.updateExecutionState)
        ? UpdateExecutionState.fromJSON(object.updateExecutionState)
        : undefined,
    };
  },

  toJSON(message: ServerToClientMessage): unknown {
    const obj: any = {};
    if (message.messageId !== undefined && message.messageId !== "") {
      obj.messageId = message.messageId;
    }
    if (message.correlationId !== undefined && message.correlationId !== "") {
      obj.correlationId = message.correlationId;
    }
    if (message.startExecution !== undefined) {
      obj.startExecution = StartExecution.toJSON(message.startExecution);
    }
    if (message.resumeExecution !== undefined) {
      obj.resumeExecution = ResumeExecution.toJSON(message.resumeExecution);
    }
    if (message.executeWorkflow !== undefined) {
      obj.executeWorkflow = ExecuteWorkflow.toJSON(message.executeWorkflow);
    }
    if (message.stopExecution !== undefined) {
      obj.stopExecution = StopExecution.toJSON(message.stopExecution);
    }
    if (message.ack !== undefined) {
      obj.ack = Ack.toJSON(message.ack);
    }
    if (message.executeClientAction !== undefined) {
      obj.executeClientAction = ExecuteClientAction.toJSON(message.executeClientAction);
    }
    if (message.updateExecutionState !== undefined) {
      obj.updateExecutionState = UpdateExecutionState.toJSON(message.updateExecutionState);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ServerToClientMessage>, I>>(base?: I): ServerToClientMessage {
    return ServerToClientMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ServerToClientMessage>, I>>(object: I): ServerToClientMessage {
    const message = createBaseServerToClientMessage();
    message.messageId = object.messageId ?? "";
    message.correlationId = object.correlationId ?? "";
    message.startExecution = (object.startExecution !== undefined && object.startExecution !== null)
      ? StartExecution.fromPartial(object.startExecution)
      : undefined;
    message.resumeExecution = (object.resumeExecution !== undefined && object.resumeExecution !== null)
      ? ResumeExecution.fromPartial(object.resumeExecution)
      : undefined;
    message.executeWorkflow = (object.executeWorkflow !== undefined && object.executeWorkflow !== null)
      ? ExecuteWorkflow.fromPartial(object.executeWorkflow)
      : undefined;
    message.stopExecution = (object.stopExecution !== undefined && object.stopExecution !== null)
      ? StopExecution.fromPartial(object.stopExecution)
      : undefined;
    message.ack = (object.ack !== undefined && object.ack !== null) ? Ack.fromPartial(object.ack) : undefined;
    message.executeClientAction = (object.executeClientAction !== undefined && object.executeClientAction !== null)
      ? ExecuteClientAction.fromPartial(object.executeClientAction)
      : undefined;
    message.updateExecutionState = (object.updateExecutionState !== undefined && object.updateExecutionState !== null)
      ? UpdateExecutionState.fromPartial(object.updateExecutionState)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ServerToClientMessage.$type, ServerToClientMessage);

function createBaseHeartbeat(): Heartbeat {
  return { $type: "pb.v1alpha1.Heartbeat", timestamp: 0 };
}

export const Heartbeat = {
  $type: "pb.v1alpha1.Heartbeat" as const,

  encode(message: Heartbeat, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== undefined && message.timestamp !== 0) {
      writer.uint32(8).int64(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Heartbeat {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeartbeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Heartbeat {
    return { $type: Heartbeat.$type, timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0 };
  },

  toJSON(message: Heartbeat): unknown {
    const obj: any = {};
    if (message.timestamp !== undefined && message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Heartbeat>, I>>(base?: I): Heartbeat {
    return Heartbeat.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Heartbeat>, I>>(object: I): Heartbeat {
    const message = createBaseHeartbeat();
    message.timestamp = object.timestamp ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Heartbeat.$type, Heartbeat);

function createBaseExecuteWorkflow(): ExecuteWorkflow {
  return { $type: "pb.v1alpha1.ExecuteWorkflow", workflowId: "", processId: "", workflowVariables: [] };
}

export const ExecuteWorkflow = {
  $type: "pb.v1alpha1.ExecuteWorkflow" as const,

  encode(message: ExecuteWorkflow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(10).string(message.workflowId);
    }
    if (message.processId !== undefined && message.processId !== "") {
      writer.uint32(18).string(message.processId);
    }
    if (message.workflowVariables !== undefined && message.workflowVariables.length !== 0) {
      for (const v of message.workflowVariables) {
        WorkflowVariable.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteWorkflow {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteWorkflow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflowId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.processId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.workflowVariables!.push(WorkflowVariable.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecuteWorkflow {
    return {
      $type: ExecuteWorkflow.$type,
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      processId: isSet(object.processId) ? globalThis.String(object.processId) : "",
      workflowVariables: globalThis.Array.isArray(object?.workflowVariables)
        ? object.workflowVariables.map((e: any) => WorkflowVariable.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ExecuteWorkflow): unknown {
    const obj: any = {};
    if (message.workflowId !== undefined && message.workflowId !== "") {
      obj.workflowId = message.workflowId;
    }
    if (message.processId !== undefined && message.processId !== "") {
      obj.processId = message.processId;
    }
    if (message.workflowVariables?.length) {
      obj.workflowVariables = message.workflowVariables.map((e) => WorkflowVariable.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteWorkflow>, I>>(base?: I): ExecuteWorkflow {
    return ExecuteWorkflow.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExecuteWorkflow>, I>>(object: I): ExecuteWorkflow {
    const message = createBaseExecuteWorkflow();
    message.workflowId = object.workflowId ?? "";
    message.processId = object.processId ?? "";
    message.workflowVariables = object.workflowVariables?.map((e) => WorkflowVariable.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ExecuteWorkflow.$type, ExecuteWorkflow);

function createBaseGetExecution(): GetExecution {
  return { $type: "pb.v1alpha1.GetExecution", orgId: "" };
}

export const GetExecution = {
  $type: "pb.v1alpha1.GetExecution" as const,

  encode(message: GetExecution, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetExecution {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetExecution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetExecution {
    return { $type: GetExecution.$type, orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "" };
  },

  toJSON(message: GetExecution): unknown {
    const obj: any = {};
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetExecution>, I>>(base?: I): GetExecution {
    return GetExecution.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetExecution>, I>>(object: I): GetExecution {
    const message = createBaseGetExecution();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetExecution.$type, GetExecution);

function createBaseStartExecution(): StartExecution {
  return { $type: "pb.v1alpha1.StartExecution", executionId: "", scheduleId: "", workflow: undefined, processId: "" };
}

export const StartExecution = {
  $type: "pb.v1alpha1.StartExecution" as const,

  encode(message: StartExecution, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.executionId !== undefined && message.executionId !== "") {
      writer.uint32(10).string(message.executionId);
    }
    if (message.scheduleId !== undefined && message.scheduleId !== "") {
      writer.uint32(18).string(message.scheduleId);
    }
    if (message.workflow !== undefined) {
      Workflow.encode(message.workflow, writer.uint32(26).fork()).ldelim();
    }
    if (message.processId !== undefined && message.processId !== "") {
      writer.uint32(34).string(message.processId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StartExecution {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartExecution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.executionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.scheduleId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.workflow = Workflow.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.processId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StartExecution {
    return {
      $type: StartExecution.$type,
      executionId: isSet(object.executionId) ? globalThis.String(object.executionId) : "",
      scheduleId: isSet(object.scheduleId) ? globalThis.String(object.scheduleId) : "",
      workflow: isSet(object.workflow) ? Workflow.fromJSON(object.workflow) : undefined,
      processId: isSet(object.processId) ? globalThis.String(object.processId) : "",
    };
  },

  toJSON(message: StartExecution): unknown {
    const obj: any = {};
    if (message.executionId !== undefined && message.executionId !== "") {
      obj.executionId = message.executionId;
    }
    if (message.scheduleId !== undefined && message.scheduleId !== "") {
      obj.scheduleId = message.scheduleId;
    }
    if (message.workflow !== undefined) {
      obj.workflow = Workflow.toJSON(message.workflow);
    }
    if (message.processId !== undefined && message.processId !== "") {
      obj.processId = message.processId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StartExecution>, I>>(base?: I): StartExecution {
    return StartExecution.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StartExecution>, I>>(object: I): StartExecution {
    const message = createBaseStartExecution();
    message.executionId = object.executionId ?? "";
    message.scheduleId = object.scheduleId ?? "";
    message.workflow = (object.workflow !== undefined && object.workflow !== null)
      ? Workflow.fromPartial(object.workflow)
      : undefined;
    message.processId = object.processId ?? "";
    return message;
  },
};

messageTypeRegistry.set(StartExecution.$type, StartExecution);

function createBaseResumeExecution(): ResumeExecution {
  return { $type: "pb.v1alpha1.ResumeExecution", executionId: "", result: undefined };
}

export const ResumeExecution = {
  $type: "pb.v1alpha1.ResumeExecution" as const,

  encode(message: ResumeExecution, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.executionId !== undefined && message.executionId !== "") {
      writer.uint32(10).string(message.executionId);
    }
    if (message.result !== undefined) {
      SmartActionHITLResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResumeExecution {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResumeExecution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.executionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = SmartActionHITLResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResumeExecution {
    return {
      $type: ResumeExecution.$type,
      executionId: isSet(object.executionId) ? globalThis.String(object.executionId) : "",
      result: isSet(object.result) ? SmartActionHITLResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: ResumeExecution): unknown {
    const obj: any = {};
    if (message.executionId !== undefined && message.executionId !== "") {
      obj.executionId = message.executionId;
    }
    if (message.result !== undefined) {
      obj.result = SmartActionHITLResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResumeExecution>, I>>(base?: I): ResumeExecution {
    return ResumeExecution.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResumeExecution>, I>>(object: I): ResumeExecution {
    const message = createBaseResumeExecution();
    message.executionId = object.executionId ?? "";
    message.result = (object.result !== undefined && object.result !== null)
      ? SmartActionHITLResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ResumeExecution.$type, ResumeExecution);

function createBaseStopExecution(): StopExecution {
  return { $type: "pb.v1alpha1.StopExecution", executionId: "", reason: 0, alertInfo: undefined, scope: 0 };
}

export const StopExecution = {
  $type: "pb.v1alpha1.StopExecution" as const,

  encode(message: StopExecution, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.executionId !== undefined && message.executionId !== "") {
      writer.uint32(10).string(message.executionId);
    }
    if (message.reason !== undefined && message.reason !== 0) {
      writer.uint32(16).int32(message.reason);
    }
    if (message.alertInfo !== undefined) {
      StopExecutionAlertInfo.encode(message.alertInfo, writer.uint32(26).fork()).ldelim();
    }
    if (message.scope !== undefined && message.scope !== 0) {
      writer.uint32(32).int32(message.scope);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopExecution {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopExecution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.executionId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.reason = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.alertInfo = StopExecutionAlertInfo.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.scope = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StopExecution {
    return {
      $type: StopExecution.$type,
      executionId: isSet(object.executionId) ? globalThis.String(object.executionId) : "",
      reason: isSet(object.reason) ? stopExecutionReasonFromJSON(object.reason) : 0,
      alertInfo: isSet(object.alertInfo) ? StopExecutionAlertInfo.fromJSON(object.alertInfo) : undefined,
      scope: isSet(object.scope) ? stopExecutionScopeFromJSON(object.scope) : 0,
    };
  },

  toJSON(message: StopExecution): unknown {
    const obj: any = {};
    if (message.executionId !== undefined && message.executionId !== "") {
      obj.executionId = message.executionId;
    }
    if (message.reason !== undefined && message.reason !== 0) {
      obj.reason = stopExecutionReasonToJSON(message.reason);
    }
    if (message.alertInfo !== undefined) {
      obj.alertInfo = StopExecutionAlertInfo.toJSON(message.alertInfo);
    }
    if (message.scope !== undefined && message.scope !== 0) {
      obj.scope = stopExecutionScopeToJSON(message.scope);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StopExecution>, I>>(base?: I): StopExecution {
    return StopExecution.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StopExecution>, I>>(object: I): StopExecution {
    const message = createBaseStopExecution();
    message.executionId = object.executionId ?? "";
    message.reason = object.reason ?? 0;
    message.alertInfo = (object.alertInfo !== undefined && object.alertInfo !== null)
      ? StopExecutionAlertInfo.fromPartial(object.alertInfo)
      : undefined;
    message.scope = object.scope ?? 0;
    return message;
  },
};

messageTypeRegistry.set(StopExecution.$type, StopExecution);

function createBaseStopExecutionAlertInfo(): StopExecutionAlertInfo {
  return { $type: "pb.v1alpha1.StopExecution.AlertInfo", severity: 0, title: "", message: "" };
}

export const StopExecutionAlertInfo = {
  $type: "pb.v1alpha1.StopExecution.AlertInfo" as const,

  encode(message: StopExecutionAlertInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.severity !== undefined && message.severity !== 0) {
      writer.uint32(8).int32(message.severity);
    }
    if (message.title !== undefined && message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopExecutionAlertInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopExecutionAlertInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.severity = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.title = reader.string();
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

  fromJSON(object: any): StopExecutionAlertInfo {
    return {
      $type: StopExecutionAlertInfo.$type,
      severity: isSet(object.severity) ? stopExecutionSeverityFromJSON(object.severity) : 0,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: StopExecutionAlertInfo): unknown {
    const obj: any = {};
    if (message.severity !== undefined && message.severity !== 0) {
      obj.severity = stopExecutionSeverityToJSON(message.severity);
    }
    if (message.title !== undefined && message.title !== "") {
      obj.title = message.title;
    }
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StopExecutionAlertInfo>, I>>(base?: I): StopExecutionAlertInfo {
    return StopExecutionAlertInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StopExecutionAlertInfo>, I>>(object: I): StopExecutionAlertInfo {
    const message = createBaseStopExecutionAlertInfo();
    message.severity = object.severity ?? 0;
    message.title = object.title ?? "";
    message.message = object.message ?? "";
    return message;
  },
};

messageTypeRegistry.set(StopExecutionAlertInfo.$type, StopExecutionAlertInfo);

function createBaseAck(): Ack {
  return { $type: "pb.v1alpha1.Ack", extraMessage: "" };
}

export const Ack = {
  $type: "pb.v1alpha1.Ack" as const,

  encode(message: Ack, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.extraMessage !== undefined && message.extraMessage !== "") {
      writer.uint32(10).string(message.extraMessage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Ack {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.extraMessage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Ack {
    return { $type: Ack.$type, extraMessage: isSet(object.extraMessage) ? globalThis.String(object.extraMessage) : "" };
  },

  toJSON(message: Ack): unknown {
    const obj: any = {};
    if (message.extraMessage !== undefined && message.extraMessage !== "") {
      obj.extraMessage = message.extraMessage;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Ack>, I>>(base?: I): Ack {
    return Ack.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Ack>, I>>(object: I): Ack {
    const message = createBaseAck();
    message.extraMessage = object.extraMessage ?? "";
    return message;
  },
};

messageTypeRegistry.set(Ack.$type, Ack);

function createBasePauseExecution(): PauseExecution {
  return { $type: "pb.v1alpha1.PauseExecution", executionId: "", reviewTaskId: "" };
}

export const PauseExecution = {
  $type: "pb.v1alpha1.PauseExecution" as const,

  encode(message: PauseExecution, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.executionId !== undefined && message.executionId !== "") {
      writer.uint32(10).string(message.executionId);
    }
    if (message.reviewTaskId !== undefined && message.reviewTaskId !== "") {
      writer.uint32(18).string(message.reviewTaskId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PauseExecution {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePauseExecution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.executionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.reviewTaskId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PauseExecution {
    return {
      $type: PauseExecution.$type,
      executionId: isSet(object.executionId) ? globalThis.String(object.executionId) : "",
      reviewTaskId: isSet(object.reviewTaskId) ? globalThis.String(object.reviewTaskId) : "",
    };
  },

  toJSON(message: PauseExecution): unknown {
    const obj: any = {};
    if (message.executionId !== undefined && message.executionId !== "") {
      obj.executionId = message.executionId;
    }
    if (message.reviewTaskId !== undefined && message.reviewTaskId !== "") {
      obj.reviewTaskId = message.reviewTaskId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PauseExecution>, I>>(base?: I): PauseExecution {
    return PauseExecution.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PauseExecution>, I>>(object: I): PauseExecution {
    const message = createBasePauseExecution();
    message.executionId = object.executionId ?? "";
    message.reviewTaskId = object.reviewTaskId ?? "";
    return message;
  },
};

messageTypeRegistry.set(PauseExecution.$type, PauseExecution);

function createBaseExecuteClientAction(): ExecuteClientAction {
  return {
    $type: "pb.v1alpha1.ExecuteClientAction",
    executionId: "",
    actionId: "",
    clientAction: undefined,
    validation: undefined,
  };
}

export const ExecuteClientAction = {
  $type: "pb.v1alpha1.ExecuteClientAction" as const,

  encode(message: ExecuteClientAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.executionId !== undefined && message.executionId !== "") {
      writer.uint32(10).string(message.executionId);
    }
    if (message.actionId !== undefined && message.actionId !== "") {
      writer.uint32(18).string(message.actionId);
    }
    if (message.clientAction !== undefined) {
      Action.encode(message.clientAction, writer.uint32(26).fork()).ldelim();
    }
    if (message.validation !== undefined) {
      ActionValidation.encode(message.validation, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteClientAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteClientAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.executionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.actionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.clientAction = Action.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.validation = ActionValidation.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecuteClientAction {
    return {
      $type: ExecuteClientAction.$type,
      executionId: isSet(object.executionId) ? globalThis.String(object.executionId) : "",
      actionId: isSet(object.actionId) ? globalThis.String(object.actionId) : "",
      clientAction: isSet(object.clientAction) ? Action.fromJSON(object.clientAction) : undefined,
      validation: isSet(object.validation) ? ActionValidation.fromJSON(object.validation) : undefined,
    };
  },

  toJSON(message: ExecuteClientAction): unknown {
    const obj: any = {};
    if (message.executionId !== undefined && message.executionId !== "") {
      obj.executionId = message.executionId;
    }
    if (message.actionId !== undefined && message.actionId !== "") {
      obj.actionId = message.actionId;
    }
    if (message.clientAction !== undefined) {
      obj.clientAction = Action.toJSON(message.clientAction);
    }
    if (message.validation !== undefined) {
      obj.validation = ActionValidation.toJSON(message.validation);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteClientAction>, I>>(base?: I): ExecuteClientAction {
    return ExecuteClientAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExecuteClientAction>, I>>(object: I): ExecuteClientAction {
    const message = createBaseExecuteClientAction();
    message.executionId = object.executionId ?? "";
    message.actionId = object.actionId ?? "";
    message.clientAction = (object.clientAction !== undefined && object.clientAction !== null)
      ? Action.fromPartial(object.clientAction)
      : undefined;
    message.validation = (object.validation !== undefined && object.validation !== null)
      ? ActionValidation.fromPartial(object.validation)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ExecuteClientAction.$type, ExecuteClientAction);

function createBaseActionValidation(): ActionValidation {
  return { $type: "pb.v1alpha1.ActionValidation", lookAheadLocator: undefined };
}

export const ActionValidation = {
  $type: "pb.v1alpha1.ActionValidation" as const,

  encode(message: ActionValidation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lookAheadLocator !== undefined) {
      ElementLocator.encode(message.lookAheadLocator, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionValidation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionValidation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lookAheadLocator = ElementLocator.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionValidation {
    return {
      $type: ActionValidation.$type,
      lookAheadLocator: isSet(object.lookAheadLocator) ? ElementLocator.fromJSON(object.lookAheadLocator) : undefined,
    };
  },

  toJSON(message: ActionValidation): unknown {
    const obj: any = {};
    if (message.lookAheadLocator !== undefined) {
      obj.lookAheadLocator = ElementLocator.toJSON(message.lookAheadLocator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionValidation>, I>>(base?: I): ActionValidation {
    return ActionValidation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionValidation>, I>>(object: I): ActionValidation {
    const message = createBaseActionValidation();
    message.lookAheadLocator = (object.lookAheadLocator !== undefined && object.lookAheadLocator !== null)
      ? ElementLocator.fromPartial(object.lookAheadLocator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ActionValidation.$type, ActionValidation);

function createBaseReportActionResult(): ReportActionResult {
  return {
    $type: "pb.v1alpha1.ReportActionResult",
    executionId: "",
    actionId: "",
    uiState: undefined,
    error: undefined,
    waitingForReview: undefined,
    form: undefined,
    list: undefined,
    element: undefined,
    document: undefined,
    empty: undefined,
  };
}

export const ReportActionResult = {
  $type: "pb.v1alpha1.ReportActionResult" as const,

  encode(message: ReportActionResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.executionId !== undefined && message.executionId !== "") {
      writer.uint32(10).string(message.executionId);
    }
    if (message.actionId !== undefined && message.actionId !== "") {
      writer.uint32(18).string(message.actionId);
    }
    if (message.uiState !== undefined) {
      UiState.encode(message.uiState, writer.uint32(26).fork()).ldelim();
    }
    if (message.error !== undefined) {
      ExecutionError.encode(message.error, writer.uint32(34).fork()).ldelim();
    }
    if (message.waitingForReview !== undefined) {
      WaitingForReview.encode(message.waitingForReview, writer.uint32(42).fork()).ldelim();
    }
    if (message.form !== undefined) {
      GetFormActionResult.encode(message.form, writer.uint32(50).fork()).ldelim();
    }
    if (message.list !== undefined) {
      GetListActionResult.encode(message.list, writer.uint32(58).fork()).ldelim();
    }
    if (message.element !== undefined) {
      GetElementActionResult.encode(message.element, writer.uint32(66).fork()).ldelim();
    }
    if (message.document !== undefined) {
      GetDocumentActionResult.encode(message.document, writer.uint32(74).fork()).ldelim();
    }
    if (message.empty !== undefined) {
      Empty.encode(message.empty, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReportActionResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReportActionResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.executionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.actionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.uiState = UiState.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.error = ExecutionError.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.waitingForReview = WaitingForReview.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.form = GetFormActionResult.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.list = GetListActionResult.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.element = GetElementActionResult.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.document = GetDocumentActionResult.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.empty = Empty.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReportActionResult {
    return {
      $type: ReportActionResult.$type,
      executionId: isSet(object.executionId) ? globalThis.String(object.executionId) : "",
      actionId: isSet(object.actionId) ? globalThis.String(object.actionId) : "",
      uiState: isSet(object.uiState) ? UiState.fromJSON(object.uiState) : undefined,
      error: isSet(object.error) ? ExecutionError.fromJSON(object.error) : undefined,
      waitingForReview: isSet(object.waitingForReview) ? WaitingForReview.fromJSON(object.waitingForReview) : undefined,
      form: isSet(object.form) ? GetFormActionResult.fromJSON(object.form) : undefined,
      list: isSet(object.list) ? GetListActionResult.fromJSON(object.list) : undefined,
      element: isSet(object.element) ? GetElementActionResult.fromJSON(object.element) : undefined,
      document: isSet(object.document) ? GetDocumentActionResult.fromJSON(object.document) : undefined,
      empty: isSet(object.empty) ? Empty.fromJSON(object.empty) : undefined,
    };
  },

  toJSON(message: ReportActionResult): unknown {
    const obj: any = {};
    if (message.executionId !== undefined && message.executionId !== "") {
      obj.executionId = message.executionId;
    }
    if (message.actionId !== undefined && message.actionId !== "") {
      obj.actionId = message.actionId;
    }
    if (message.uiState !== undefined) {
      obj.uiState = UiState.toJSON(message.uiState);
    }
    if (message.error !== undefined) {
      obj.error = ExecutionError.toJSON(message.error);
    }
    if (message.waitingForReview !== undefined) {
      obj.waitingForReview = WaitingForReview.toJSON(message.waitingForReview);
    }
    if (message.form !== undefined) {
      obj.form = GetFormActionResult.toJSON(message.form);
    }
    if (message.list !== undefined) {
      obj.list = GetListActionResult.toJSON(message.list);
    }
    if (message.element !== undefined) {
      obj.element = GetElementActionResult.toJSON(message.element);
    }
    if (message.document !== undefined) {
      obj.document = GetDocumentActionResult.toJSON(message.document);
    }
    if (message.empty !== undefined) {
      obj.empty = Empty.toJSON(message.empty);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReportActionResult>, I>>(base?: I): ReportActionResult {
    return ReportActionResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReportActionResult>, I>>(object: I): ReportActionResult {
    const message = createBaseReportActionResult();
    message.executionId = object.executionId ?? "";
    message.actionId = object.actionId ?? "";
    message.uiState = (object.uiState !== undefined && object.uiState !== null)
      ? UiState.fromPartial(object.uiState)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? ExecutionError.fromPartial(object.error)
      : undefined;
    message.waitingForReview = (object.waitingForReview !== undefined && object.waitingForReview !== null)
      ? WaitingForReview.fromPartial(object.waitingForReview)
      : undefined;
    message.form = (object.form !== undefined && object.form !== null)
      ? GetFormActionResult.fromPartial(object.form)
      : undefined;
    message.list = (object.list !== undefined && object.list !== null)
      ? GetListActionResult.fromPartial(object.list)
      : undefined;
    message.element = (object.element !== undefined && object.element !== null)
      ? GetElementActionResult.fromPartial(object.element)
      : undefined;
    message.document = (object.document !== undefined && object.document !== null)
      ? GetDocumentActionResult.fromPartial(object.document)
      : undefined;
    message.empty = (object.empty !== undefined && object.empty !== null) ? Empty.fromPartial(object.empty) : undefined;
    return message;
  },
};

messageTypeRegistry.set(ReportActionResult.$type, ReportActionResult);

function createBaseExecutionError(): ExecutionError {
  return { $type: "pb.v1alpha1.ExecutionError", internalMessage: "", displayMessage: "" };
}

export const ExecutionError = {
  $type: "pb.v1alpha1.ExecutionError" as const,

  encode(message: ExecutionError, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.internalMessage !== undefined && message.internalMessage !== "") {
      writer.uint32(10).string(message.internalMessage);
    }
    if (message.displayMessage !== undefined && message.displayMessage !== "") {
      writer.uint32(18).string(message.displayMessage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecutionError {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutionError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.internalMessage = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.displayMessage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecutionError {
    return {
      $type: ExecutionError.$type,
      internalMessage: isSet(object.internalMessage) ? globalThis.String(object.internalMessage) : "",
      displayMessage: isSet(object.displayMessage) ? globalThis.String(object.displayMessage) : "",
    };
  },

  toJSON(message: ExecutionError): unknown {
    const obj: any = {};
    if (message.internalMessage !== undefined && message.internalMessage !== "") {
      obj.internalMessage = message.internalMessage;
    }
    if (message.displayMessage !== undefined && message.displayMessage !== "") {
      obj.displayMessage = message.displayMessage;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecutionError>, I>>(base?: I): ExecutionError {
    return ExecutionError.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExecutionError>, I>>(object: I): ExecutionError {
    const message = createBaseExecutionError();
    message.internalMessage = object.internalMessage ?? "";
    message.displayMessage = object.displayMessage ?? "";
    return message;
  },
};

messageTypeRegistry.set(ExecutionError.$type, ExecutionError);

function createBaseWaitingForReview(): WaitingForReview {
  return { $type: "pb.v1alpha1.WaitingForReview", message: "" };
}

export const WaitingForReview = {
  $type: "pb.v1alpha1.WaitingForReview" as const,

  encode(message: WaitingForReview, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WaitingForReview {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaitingForReview();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): WaitingForReview {
    return { $type: WaitingForReview.$type, message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: WaitingForReview): unknown {
    const obj: any = {};
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WaitingForReview>, I>>(base?: I): WaitingForReview {
    return WaitingForReview.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WaitingForReview>, I>>(object: I): WaitingForReview {
    const message = createBaseWaitingForReview();
    message.message = object.message ?? "";
    return message;
  },
};

messageTypeRegistry.set(WaitingForReview.$type, WaitingForReview);

function createBaseGetFormActionResult(): GetFormActionResult {
  return { $type: "pb.v1alpha1.GetFormActionResult", fields: [] };
}

export const GetFormActionResult = {
  $type: "pb.v1alpha1.GetFormActionResult" as const,

  encode(message: GetFormActionResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        Field.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFormActionResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFormActionResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fields!.push(Field.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFormActionResult {
    return {
      $type: GetFormActionResult.$type,
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => Field.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetFormActionResult): unknown {
    const obj: any = {};
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => Field.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFormActionResult>, I>>(base?: I): GetFormActionResult {
    return GetFormActionResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFormActionResult>, I>>(object: I): GetFormActionResult {
    const message = createBaseGetFormActionResult();
    message.fields = object.fields?.map((e) => Field.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetFormActionResult.$type, GetFormActionResult);

function createBaseGetListActionResult(): GetListActionResult {
  return { $type: "pb.v1alpha1.GetListActionResult", items: [] };
}

export const GetListActionResult = {
  $type: "pb.v1alpha1.GetListActionResult" as const,

  encode(message: GetListActionResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.items !== undefined && message.items.length !== 0) {
      for (const v of message.items) {
        ListItem.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListActionResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListActionResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items!.push(ListItem.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListActionResult {
    return {
      $type: GetListActionResult.$type,
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => ListItem.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetListActionResult): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => ListItem.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListActionResult>, I>>(base?: I): GetListActionResult {
    return GetListActionResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListActionResult>, I>>(object: I): GetListActionResult {
    const message = createBaseGetListActionResult();
    message.items = object.items?.map((e) => ListItem.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetListActionResult.$type, GetListActionResult);

function createBaseListItem(): ListItem {
  return { $type: "pb.v1alpha1.ListItem", locator: undefined, fields: [] };
}

export const ListItem = {
  $type: "pb.v1alpha1.ListItem" as const,

  encode(message: ListItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.locator !== undefined) {
      ElementLocator.encode(message.locator, writer.uint32(10).fork()).ldelim();
    }
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        Field.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListItem();
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
          if (tag !== 18) {
            break;
          }

          message.fields!.push(Field.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListItem {
    return {
      $type: ListItem.$type,
      locator: isSet(object.locator) ? ElementLocator.fromJSON(object.locator) : undefined,
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => Field.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListItem): unknown {
    const obj: any = {};
    if (message.locator !== undefined) {
      obj.locator = ElementLocator.toJSON(message.locator);
    }
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => Field.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListItem>, I>>(base?: I): ListItem {
    return ListItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListItem>, I>>(object: I): ListItem {
    const message = createBaseListItem();
    message.locator = (object.locator !== undefined && object.locator !== null)
      ? ElementLocator.fromPartial(object.locator)
      : undefined;
    message.fields = object.fields?.map((e) => Field.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ListItem.$type, ListItem);

function createBaseGetElementActionResult(): GetElementActionResult {
  return { $type: "pb.v1alpha1.GetElementActionResult", element: undefined };
}

export const GetElementActionResult = {
  $type: "pb.v1alpha1.GetElementActionResult" as const,

  encode(message: GetElementActionResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.element !== undefined) {
      Element.encode(message.element, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetElementActionResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetElementActionResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.element = Element.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetElementActionResult {
    return {
      $type: GetElementActionResult.$type,
      element: isSet(object.element) ? Element.fromJSON(object.element) : undefined,
    };
  },

  toJSON(message: GetElementActionResult): unknown {
    const obj: any = {};
    if (message.element !== undefined) {
      obj.element = Element.toJSON(message.element);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetElementActionResult>, I>>(base?: I): GetElementActionResult {
    return GetElementActionResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetElementActionResult>, I>>(object: I): GetElementActionResult {
    const message = createBaseGetElementActionResult();
    message.element = (object.element !== undefined && object.element !== null)
      ? Element.fromPartial(object.element)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetElementActionResult.$type, GetElementActionResult);

function createBaseGetDocumentActionResult(): GetDocumentActionResult {
  return { $type: "pb.v1alpha1.GetDocumentActionResult", document: undefined };
}

export const GetDocumentActionResult = {
  $type: "pb.v1alpha1.GetDocumentActionResult" as const,

  encode(message: GetDocumentActionResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.document !== undefined) {
      Document.encode(message.document, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDocumentActionResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDocumentActionResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.document = Document.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDocumentActionResult {
    return {
      $type: GetDocumentActionResult.$type,
      document: isSet(object.document) ? Document.fromJSON(object.document) : undefined,
    };
  },

  toJSON(message: GetDocumentActionResult): unknown {
    const obj: any = {};
    if (message.document !== undefined) {
      obj.document = Document.toJSON(message.document);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDocumentActionResult>, I>>(base?: I): GetDocumentActionResult {
    return GetDocumentActionResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetDocumentActionResult>, I>>(object: I): GetDocumentActionResult {
    const message = createBaseGetDocumentActionResult();
    message.document = (object.document !== undefined && object.document !== null)
      ? Document.fromPartial(object.document)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetDocumentActionResult.$type, GetDocumentActionResult);

function createBaseUpdateExecutionState(): UpdateExecutionState {
  return {
    $type: "pb.v1alpha1.UpdateExecutionState",
    executionId: "",
    executedActionIds: [],
    executingActionIds: [],
    status: 0,
  };
}

export const UpdateExecutionState = {
  $type: "pb.v1alpha1.UpdateExecutionState" as const,

  encode(message: UpdateExecutionState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.executionId !== undefined && message.executionId !== "") {
      writer.uint32(10).string(message.executionId);
    }
    if (message.executedActionIds !== undefined && message.executedActionIds.length !== 0) {
      for (const v of message.executedActionIds) {
        writer.uint32(18).string(v!);
      }
    }
    if (message.executingActionIds !== undefined && message.executingActionIds.length !== 0) {
      for (const v of message.executingActionIds) {
        writer.uint32(26).string(v!);
      }
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateExecutionState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateExecutionState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.executionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.executedActionIds!.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.executingActionIds!.push(reader.string());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateExecutionState {
    return {
      $type: UpdateExecutionState.$type,
      executionId: isSet(object.executionId) ? globalThis.String(object.executionId) : "",
      executedActionIds: globalThis.Array.isArray(object?.executedActionIds)
        ? object.executedActionIds.map((e: any) => globalThis.String(e))
        : [],
      executingActionIds: globalThis.Array.isArray(object?.executingActionIds)
        ? object.executingActionIds.map((e: any) => globalThis.String(e))
        : [],
      status: isSet(object.status) ? executionStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: UpdateExecutionState): unknown {
    const obj: any = {};
    if (message.executionId !== undefined && message.executionId !== "") {
      obj.executionId = message.executionId;
    }
    if (message.executedActionIds?.length) {
      obj.executedActionIds = message.executedActionIds;
    }
    if (message.executingActionIds?.length) {
      obj.executingActionIds = message.executingActionIds;
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = executionStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateExecutionState>, I>>(base?: I): UpdateExecutionState {
    return UpdateExecutionState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateExecutionState>, I>>(object: I): UpdateExecutionState {
    const message = createBaseUpdateExecutionState();
    message.executionId = object.executionId ?? "";
    message.executedActionIds = object.executedActionIds?.map((e) => e) || [];
    message.executingActionIds = object.executingActionIds?.map((e) => e) || [];
    message.status = object.status ?? 0;
    return message;
  },
};

messageTypeRegistry.set(UpdateExecutionState.$type, UpdateExecutionState);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
