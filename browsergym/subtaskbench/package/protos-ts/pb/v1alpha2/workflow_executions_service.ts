/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { SortField } from "../../common/data_query_params";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import { Connector } from "./connector";
import { ExecutionStep } from "./execution_steps";
import { Review, TaskobsoleteReason, taskobsoleteReasonFromJSON, taskobsoleteReasonToJSON } from "./tasks_service";
import { WorkflowMode, workflowModeFromJSON, workflowModeToJSON } from "./workflows_service";

export const protobufPackage = "pb.v1alpha2";

export interface ListWorkflowExecutionsRequest {
  $type?: "pb.v1alpha2.ListWorkflowExecutionsRequest";
  /**
   * The parent resource name where the Execution was created.
   * Currently, we dont query from its separate collection.
   * format: "organizations/{ORGANIZATION_ID}"
   */
  parent?: string | undefined;
  pageSize?: number | undefined;
  pageNumber?: number | undefined;
  filter?:
    | ListWorkflowExecutionFilter
    | undefined;
  /**
   * The order of fields will effect the sorting order.
   * Supported fields: display_name, workflow_display_name, status, last_updated_time
   */
  sort?: SortField[] | undefined;
}

export interface ListWorkflowExecutionFilter {
  $type?: "pb.v1alpha2.ListWorkflowExecutionFilter";
  namePrefix?: string | undefined;
  statuses?: WorkflowExecutionStatus[] | undefined;
  workflowResourceNames?: string[] | undefined;
  lastUpdateTimeLt?: number | undefined;
  lastUpdateTimeGt?: number | undefined;
}

export interface ListWorkflowExecutionsResponse {
  $type?: "pb.v1alpha2.ListWorkflowExecutionsResponse";
  executions?:
    | WorkflowExecution[]
    | undefined;
  /** Total available workflow executions size. */
  totalSize?: number | undefined;
}

/**
 * Note: The message from message queue and task from
 * v1alpha2Task collection will be projected to this message.
 * As currently we dont maintain separate collection for executions.
 */
export interface WorkflowExecution {
  $type?: "pb.v1alpha2.WorkflowExecution";
  /**
   * Resource name for the Workflow Execution resource.
   * Format: workflows/{WID}/tasks/{TID} or message/{TID}
   * Since we query from message and task collection it has two formats.
   */
  name?: string | undefined;
  displayName?: string | undefined;
  workflowDisplayName?:
    | string
    | undefined;
  /** Id of the organization the workflow belongs to. Format: organizations/{ID} */
  organizationResourceName?:
    | string
    | undefined;
  /** The time the Execution was started. */
  createTime?:
    | Date
    | undefined;
  /** The time the Execution was ended. */
  lastUpdatedTime?: Date | undefined;
  status?: WorkflowExecutionStatus | undefined;
  reviews?:
    | Review[]
    | undefined;
  /** The user who created the Execution. This is the email of the user. */
  creator?: string | undefined;
  workflowModeWhenCreated?: WorkflowMode | undefined;
  steps?:
    | ExecutionStep[]
    | undefined;
  /** The connectors that were triggered by this workflow. */
  connectorsTriggered?:
    | Connector[]
    | undefined;
  /** The error message if the execution failed. */
  errorMessage?:
    | string
    | undefined;
  /** The location where the trigger happened. */
  triggerLocation?:
    | string
    | undefined;
  /**
   * The resource name of the workflow.
   * format: "workflows/{WID}"
   */
  workflowResourceName?: string | undefined;
  obsoleteReason?:
    | TaskobsoleteReason
    | undefined;
  /**
   * Whether this task can be retried manually.
   * currently only some system declined tasks can be retried and task's
   * raw file should not be deleted.
   */
  retryable?: boolean | undefined;
}

export enum WorkflowExecutionStatus {
  UNSPECIFIED = 0,
  /** SCHEDULED - Waiting for the execution to start. */
  SCHEDULED = 1,
  BLOCKED = 2,
  /** EXECUTING - Execution is in progress. */
  EXECUTING = 3,
  PENDING_REVIEW = 4,
  COMPLETED = 5,
  FAILED = 6,
  CANCELLED = 7,
  UNRECOGNIZED = -1,
}

export function workflowExecutionStatusFromJSON(object: any): WorkflowExecutionStatus {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return WorkflowExecutionStatus.UNSPECIFIED;
    case 1:
    case "SCHEDULED":
      return WorkflowExecutionStatus.SCHEDULED;
    case 2:
    case "BLOCKED":
      return WorkflowExecutionStatus.BLOCKED;
    case 3:
    case "EXECUTING":
      return WorkflowExecutionStatus.EXECUTING;
    case 4:
    case "PENDING_REVIEW":
      return WorkflowExecutionStatus.PENDING_REVIEW;
    case 5:
    case "COMPLETED":
      return WorkflowExecutionStatus.COMPLETED;
    case 6:
    case "FAILED":
      return WorkflowExecutionStatus.FAILED;
    case 7:
    case "CANCELLED":
      return WorkflowExecutionStatus.CANCELLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WorkflowExecutionStatus.UNRECOGNIZED;
  }
}

export function workflowExecutionStatusToJSON(object: WorkflowExecutionStatus): string {
  switch (object) {
    case WorkflowExecutionStatus.UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case WorkflowExecutionStatus.SCHEDULED:
      return "SCHEDULED";
    case WorkflowExecutionStatus.BLOCKED:
      return "BLOCKED";
    case WorkflowExecutionStatus.EXECUTING:
      return "EXECUTING";
    case WorkflowExecutionStatus.PENDING_REVIEW:
      return "PENDING_REVIEW";
    case WorkflowExecutionStatus.COMPLETED:
      return "COMPLETED";
    case WorkflowExecutionStatus.FAILED:
      return "FAILED";
    case WorkflowExecutionStatus.CANCELLED:
      return "CANCELLED";
    case WorkflowExecutionStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GetBlockedWorkflowExecutionStatisticsRequest {
  $type?: "pb.v1alpha2.GetBlockedWorkflowExecutionStatisticsRequest";
  /**
   * The parent resource name where the Execution was created.
   * format: "organizations/{ORGANIZATION_ID}"
   */
  parent?: string | undefined;
}

export interface GetBlockedWorkflowExecutionStatisticsResponse {
  $type?: "pb.v1alpha2.GetBlockedWorkflowExecutionStatisticsResponse";
  /** The number of blocked workflow executions. */
  blockedWorkflowExecutionsCount?:
    | number
    | undefined;
  /**
   * The resoure name of workflows which has blocked executions.
   * This can be used to filter pending tasks to review.
   */
  blockedWorkflowResourceNames?: string[] | undefined;
}

export interface GetWorkflowExecutionRequest {
  $type?: "pb.v1alpha2.GetWorkflowExecutionRequest";
  /**
   * The resource name of the Workflow Execution.
   * Format: workflows/{WID}/tasks/{TID} or message/{TID}
   */
  name?:
    | string
    | undefined;
  /**
   * The parent resource name where the Execution was created.
   * format: "organizations/{ORGANIZATION_ID}"
   */
  parent?: string | undefined;
}

function createBaseListWorkflowExecutionsRequest(): ListWorkflowExecutionsRequest {
  return {
    $type: "pb.v1alpha2.ListWorkflowExecutionsRequest",
    parent: "",
    pageSize: 0,
    pageNumber: 0,
    filter: undefined,
    sort: [],
  };
}

export const ListWorkflowExecutionsRequest = {
  $type: "pb.v1alpha2.ListWorkflowExecutionsRequest" as const,

  encode(message: ListWorkflowExecutionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(24).int32(message.pageNumber);
    }
    if (message.filter !== undefined) {
      ListWorkflowExecutionFilter.encode(message.filter, writer.uint32(34).fork()).ldelim();
    }
    if (message.sort !== undefined && message.sort.length !== 0) {
      for (const v of message.sort) {
        SortField.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowExecutionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowExecutionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pageNumber = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.filter = ListWorkflowExecutionFilter.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sort!.push(SortField.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListWorkflowExecutionsRequest {
    return {
      $type: ListWorkflowExecutionsRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      filter: isSet(object.filter) ? ListWorkflowExecutionFilter.fromJSON(object.filter) : undefined,
      sort: globalThis.Array.isArray(object?.sort) ? object.sort.map((e: any) => SortField.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListWorkflowExecutionsRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.filter !== undefined) {
      obj.filter = ListWorkflowExecutionFilter.toJSON(message.filter);
    }
    if (message.sort?.length) {
      obj.sort = message.sort.map((e) => SortField.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowExecutionsRequest>, I>>(base?: I): ListWorkflowExecutionsRequest {
    return ListWorkflowExecutionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowExecutionsRequest>, I>>(
    object: I,
  ): ListWorkflowExecutionsRequest {
    const message = createBaseListWorkflowExecutionsRequest();
    message.parent = object.parent ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? ListWorkflowExecutionFilter.fromPartial(object.filter)
      : undefined;
    message.sort = object.sort?.map((e) => SortField.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowExecutionsRequest.$type, ListWorkflowExecutionsRequest);

function createBaseListWorkflowExecutionFilter(): ListWorkflowExecutionFilter {
  return {
    $type: "pb.v1alpha2.ListWorkflowExecutionFilter",
    namePrefix: "",
    statuses: [],
    workflowResourceNames: [],
    lastUpdateTimeLt: 0,
    lastUpdateTimeGt: 0,
  };
}

export const ListWorkflowExecutionFilter = {
  $type: "pb.v1alpha2.ListWorkflowExecutionFilter" as const,

  encode(message: ListWorkflowExecutionFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.namePrefix !== undefined && message.namePrefix !== "") {
      writer.uint32(10).string(message.namePrefix);
    }
    if (message.statuses !== undefined && message.statuses.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.statuses) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.workflowResourceNames !== undefined && message.workflowResourceNames.length !== 0) {
      for (const v of message.workflowResourceNames) {
        writer.uint32(26).string(v!);
      }
    }
    if (message.lastUpdateTimeLt !== undefined && message.lastUpdateTimeLt !== 0) {
      writer.uint32(32).int64(message.lastUpdateTimeLt);
    }
    if (message.lastUpdateTimeGt !== undefined && message.lastUpdateTimeGt !== 0) {
      writer.uint32(40).int64(message.lastUpdateTimeGt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowExecutionFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowExecutionFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.namePrefix = reader.string();
          continue;
        case 2:
          if (tag === 16) {
            message.statuses!.push(reader.int32() as any);

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.statuses!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.workflowResourceNames!.push(reader.string());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.lastUpdateTimeLt = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.lastUpdateTimeGt = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListWorkflowExecutionFilter {
    return {
      $type: ListWorkflowExecutionFilter.$type,
      namePrefix: isSet(object.namePrefix) ? globalThis.String(object.namePrefix) : "",
      statuses: globalThis.Array.isArray(object?.statuses)
        ? object.statuses.map((e: any) => workflowExecutionStatusFromJSON(e))
        : [],
      workflowResourceNames: globalThis.Array.isArray(object?.workflowResourceNames)
        ? object.workflowResourceNames.map((e: any) => globalThis.String(e))
        : [],
      lastUpdateTimeLt: isSet(object.lastUpdateTimeLt) ? globalThis.Number(object.lastUpdateTimeLt) : 0,
      lastUpdateTimeGt: isSet(object.lastUpdateTimeGt) ? globalThis.Number(object.lastUpdateTimeGt) : 0,
    };
  },

  toJSON(message: ListWorkflowExecutionFilter): unknown {
    const obj: any = {};
    if (message.namePrefix !== undefined && message.namePrefix !== "") {
      obj.namePrefix = message.namePrefix;
    }
    if (message.statuses?.length) {
      obj.statuses = message.statuses.map((e) => workflowExecutionStatusToJSON(e));
    }
    if (message.workflowResourceNames?.length) {
      obj.workflowResourceNames = message.workflowResourceNames;
    }
    if (message.lastUpdateTimeLt !== undefined && message.lastUpdateTimeLt !== 0) {
      obj.lastUpdateTimeLt = Math.round(message.lastUpdateTimeLt);
    }
    if (message.lastUpdateTimeGt !== undefined && message.lastUpdateTimeGt !== 0) {
      obj.lastUpdateTimeGt = Math.round(message.lastUpdateTimeGt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowExecutionFilter>, I>>(base?: I): ListWorkflowExecutionFilter {
    return ListWorkflowExecutionFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowExecutionFilter>, I>>(object: I): ListWorkflowExecutionFilter {
    const message = createBaseListWorkflowExecutionFilter();
    message.namePrefix = object.namePrefix ?? "";
    message.statuses = object.statuses?.map((e) => e) || [];
    message.workflowResourceNames = object.workflowResourceNames?.map((e) => e) || [];
    message.lastUpdateTimeLt = object.lastUpdateTimeLt ?? 0;
    message.lastUpdateTimeGt = object.lastUpdateTimeGt ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowExecutionFilter.$type, ListWorkflowExecutionFilter);

function createBaseListWorkflowExecutionsResponse(): ListWorkflowExecutionsResponse {
  return { $type: "pb.v1alpha2.ListWorkflowExecutionsResponse", executions: [], totalSize: 0 };
}

export const ListWorkflowExecutionsResponse = {
  $type: "pb.v1alpha2.ListWorkflowExecutionsResponse" as const,

  encode(message: ListWorkflowExecutionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.executions !== undefined && message.executions.length !== 0) {
      for (const v of message.executions) {
        WorkflowExecution.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(16).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowExecutionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowExecutionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.executions!.push(WorkflowExecution.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalSize = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListWorkflowExecutionsResponse {
    return {
      $type: ListWorkflowExecutionsResponse.$type,
      executions: globalThis.Array.isArray(object?.executions)
        ? object.executions.map((e: any) => WorkflowExecution.fromJSON(e))
        : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListWorkflowExecutionsResponse): unknown {
    const obj: any = {};
    if (message.executions?.length) {
      obj.executions = message.executions.map((e) => WorkflowExecution.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowExecutionsResponse>, I>>(base?: I): ListWorkflowExecutionsResponse {
    return ListWorkflowExecutionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowExecutionsResponse>, I>>(
    object: I,
  ): ListWorkflowExecutionsResponse {
    const message = createBaseListWorkflowExecutionsResponse();
    message.executions = object.executions?.map((e) => WorkflowExecution.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowExecutionsResponse.$type, ListWorkflowExecutionsResponse);

function createBaseWorkflowExecution(): WorkflowExecution {
  return {
    $type: "pb.v1alpha2.WorkflowExecution",
    name: "",
    displayName: "",
    workflowDisplayName: "",
    organizationResourceName: "",
    createTime: undefined,
    lastUpdatedTime: undefined,
    status: 0,
    reviews: [],
    creator: "",
    workflowModeWhenCreated: 0,
    steps: [],
    connectorsTriggered: [],
    errorMessage: "",
    triggerLocation: "",
    workflowResourceName: "",
    obsoleteReason: 0,
    retryable: false,
  };
}

export const WorkflowExecution = {
  $type: "pb.v1alpha2.WorkflowExecution" as const,

  encode(message: WorkflowExecution, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.workflowDisplayName !== undefined && message.workflowDisplayName !== "") {
      writer.uint32(26).string(message.workflowDisplayName);
    }
    if (message.organizationResourceName !== undefined && message.organizationResourceName !== "") {
      writer.uint32(34).string(message.organizationResourceName);
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.lastUpdatedTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastUpdatedTime), writer.uint32(50).fork()).ldelim();
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(56).int32(message.status);
    }
    if (message.reviews !== undefined && message.reviews.length !== 0) {
      for (const v of message.reviews) {
        Review.encode(v!, writer.uint32(66).fork()).ldelim();
      }
    }
    if (message.creator !== undefined && message.creator !== "") {
      writer.uint32(74).string(message.creator);
    }
    if (message.workflowModeWhenCreated !== undefined && message.workflowModeWhenCreated !== 0) {
      writer.uint32(80).int32(message.workflowModeWhenCreated);
    }
    if (message.steps !== undefined && message.steps.length !== 0) {
      for (const v of message.steps) {
        ExecutionStep.encode(v!, writer.uint32(90).fork()).ldelim();
      }
    }
    if (message.connectorsTriggered !== undefined && message.connectorsTriggered.length !== 0) {
      for (const v of message.connectorsTriggered) {
        Connector.encode(v!, writer.uint32(98).fork()).ldelim();
      }
    }
    if (message.errorMessage !== undefined && message.errorMessage !== "") {
      writer.uint32(106).string(message.errorMessage);
    }
    if (message.triggerLocation !== undefined && message.triggerLocation !== "") {
      writer.uint32(114).string(message.triggerLocation);
    }
    if (message.workflowResourceName !== undefined && message.workflowResourceName !== "") {
      writer.uint32(122).string(message.workflowResourceName);
    }
    if (message.obsoleteReason !== undefined && message.obsoleteReason !== 0) {
      writer.uint32(128).int32(message.obsoleteReason);
    }
    if (message.retryable !== undefined && message.retryable !== false) {
      writer.uint32(136).bool(message.retryable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowExecution {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowExecution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.workflowDisplayName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.organizationResourceName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.lastUpdatedTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.reviews!.push(Review.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.workflowModeWhenCreated = reader.int32() as any;
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.steps!.push(ExecutionStep.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.connectorsTriggered!.push(Connector.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.errorMessage = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.triggerLocation = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.workflowResourceName = reader.string();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.obsoleteReason = reader.int32() as any;
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.retryable = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowExecution {
    return {
      $type: WorkflowExecution.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      workflowDisplayName: isSet(object.workflowDisplayName) ? globalThis.String(object.workflowDisplayName) : "",
      organizationResourceName: isSet(object.organizationResourceName)
        ? globalThis.String(object.organizationResourceName)
        : "",
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      lastUpdatedTime: isSet(object.lastUpdatedTime) ? fromJsonTimestamp(object.lastUpdatedTime) : undefined,
      status: isSet(object.status) ? workflowExecutionStatusFromJSON(object.status) : 0,
      reviews: globalThis.Array.isArray(object?.reviews) ? object.reviews.map((e: any) => Review.fromJSON(e)) : [],
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      workflowModeWhenCreated: isSet(object.workflowModeWhenCreated)
        ? workflowModeFromJSON(object.workflowModeWhenCreated)
        : 0,
      steps: globalThis.Array.isArray(object?.steps) ? object.steps.map((e: any) => ExecutionStep.fromJSON(e)) : [],
      connectorsTriggered: globalThis.Array.isArray(object?.connectorsTriggered)
        ? object.connectorsTriggered.map((e: any) => Connector.fromJSON(e))
        : [],
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : "",
      triggerLocation: isSet(object.triggerLocation) ? globalThis.String(object.triggerLocation) : "",
      workflowResourceName: isSet(object.workflowResourceName) ? globalThis.String(object.workflowResourceName) : "",
      obsoleteReason: isSet(object.obsoleteReason) ? taskobsoleteReasonFromJSON(object.obsoleteReason) : 0,
      retryable: isSet(object.retryable) ? globalThis.Boolean(object.retryable) : false,
    };
  },

  toJSON(message: WorkflowExecution): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.workflowDisplayName !== undefined && message.workflowDisplayName !== "") {
      obj.workflowDisplayName = message.workflowDisplayName;
    }
    if (message.organizationResourceName !== undefined && message.organizationResourceName !== "") {
      obj.organizationResourceName = message.organizationResourceName;
    }
    if (message.createTime !== undefined) {
      obj.createTime = message.createTime.toISOString();
    }
    if (message.lastUpdatedTime !== undefined) {
      obj.lastUpdatedTime = message.lastUpdatedTime.toISOString();
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = workflowExecutionStatusToJSON(message.status);
    }
    if (message.reviews?.length) {
      obj.reviews = message.reviews.map((e) => Review.toJSON(e));
    }
    if (message.creator !== undefined && message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.workflowModeWhenCreated !== undefined && message.workflowModeWhenCreated !== 0) {
      obj.workflowModeWhenCreated = workflowModeToJSON(message.workflowModeWhenCreated);
    }
    if (message.steps?.length) {
      obj.steps = message.steps.map((e) => ExecutionStep.toJSON(e));
    }
    if (message.connectorsTriggered?.length) {
      obj.connectorsTriggered = message.connectorsTriggered.map((e) => Connector.toJSON(e));
    }
    if (message.errorMessage !== undefined && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    if (message.triggerLocation !== undefined && message.triggerLocation !== "") {
      obj.triggerLocation = message.triggerLocation;
    }
    if (message.workflowResourceName !== undefined && message.workflowResourceName !== "") {
      obj.workflowResourceName = message.workflowResourceName;
    }
    if (message.obsoleteReason !== undefined && message.obsoleteReason !== 0) {
      obj.obsoleteReason = taskobsoleteReasonToJSON(message.obsoleteReason);
    }
    if (message.retryable !== undefined && message.retryable !== false) {
      obj.retryable = message.retryable;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowExecution>, I>>(base?: I): WorkflowExecution {
    return WorkflowExecution.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowExecution>, I>>(object: I): WorkflowExecution {
    const message = createBaseWorkflowExecution();
    message.name = object.name ?? "";
    message.displayName = object.displayName ?? "";
    message.workflowDisplayName = object.workflowDisplayName ?? "";
    message.organizationResourceName = object.organizationResourceName ?? "";
    message.createTime = object.createTime ?? undefined;
    message.lastUpdatedTime = object.lastUpdatedTime ?? undefined;
    message.status = object.status ?? 0;
    message.reviews = object.reviews?.map((e) => Review.fromPartial(e)) || [];
    message.creator = object.creator ?? "";
    message.workflowModeWhenCreated = object.workflowModeWhenCreated ?? 0;
    message.steps = object.steps?.map((e) => ExecutionStep.fromPartial(e)) || [];
    message.connectorsTriggered = object.connectorsTriggered?.map((e) => Connector.fromPartial(e)) || [];
    message.errorMessage = object.errorMessage ?? "";
    message.triggerLocation = object.triggerLocation ?? "";
    message.workflowResourceName = object.workflowResourceName ?? "";
    message.obsoleteReason = object.obsoleteReason ?? 0;
    message.retryable = object.retryable ?? false;
    return message;
  },
};

messageTypeRegistry.set(WorkflowExecution.$type, WorkflowExecution);

function createBaseGetBlockedWorkflowExecutionStatisticsRequest(): GetBlockedWorkflowExecutionStatisticsRequest {
  return { $type: "pb.v1alpha2.GetBlockedWorkflowExecutionStatisticsRequest", parent: "" };
}

export const GetBlockedWorkflowExecutionStatisticsRequest = {
  $type: "pb.v1alpha2.GetBlockedWorkflowExecutionStatisticsRequest" as const,

  encode(message: GetBlockedWorkflowExecutionStatisticsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBlockedWorkflowExecutionStatisticsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlockedWorkflowExecutionStatisticsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parent = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBlockedWorkflowExecutionStatisticsRequest {
    return {
      $type: GetBlockedWorkflowExecutionStatisticsRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
    };
  },

  toJSON(message: GetBlockedWorkflowExecutionStatisticsRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBlockedWorkflowExecutionStatisticsRequest>, I>>(
    base?: I,
  ): GetBlockedWorkflowExecutionStatisticsRequest {
    return GetBlockedWorkflowExecutionStatisticsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBlockedWorkflowExecutionStatisticsRequest>, I>>(
    object: I,
  ): GetBlockedWorkflowExecutionStatisticsRequest {
    const message = createBaseGetBlockedWorkflowExecutionStatisticsRequest();
    message.parent = object.parent ?? "";
    return message;
  },
};

messageTypeRegistry.set(
  GetBlockedWorkflowExecutionStatisticsRequest.$type,
  GetBlockedWorkflowExecutionStatisticsRequest,
);

function createBaseGetBlockedWorkflowExecutionStatisticsResponse(): GetBlockedWorkflowExecutionStatisticsResponse {
  return {
    $type: "pb.v1alpha2.GetBlockedWorkflowExecutionStatisticsResponse",
    blockedWorkflowExecutionsCount: 0,
    blockedWorkflowResourceNames: [],
  };
}

export const GetBlockedWorkflowExecutionStatisticsResponse = {
  $type: "pb.v1alpha2.GetBlockedWorkflowExecutionStatisticsResponse" as const,

  encode(message: GetBlockedWorkflowExecutionStatisticsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.blockedWorkflowExecutionsCount !== undefined && message.blockedWorkflowExecutionsCount !== 0) {
      writer.uint32(8).int32(message.blockedWorkflowExecutionsCount);
    }
    if (message.blockedWorkflowResourceNames !== undefined && message.blockedWorkflowResourceNames.length !== 0) {
      for (const v of message.blockedWorkflowResourceNames) {
        writer.uint32(18).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBlockedWorkflowExecutionStatisticsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlockedWorkflowExecutionStatisticsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.blockedWorkflowExecutionsCount = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.blockedWorkflowResourceNames!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBlockedWorkflowExecutionStatisticsResponse {
    return {
      $type: GetBlockedWorkflowExecutionStatisticsResponse.$type,
      blockedWorkflowExecutionsCount: isSet(object.blockedWorkflowExecutionsCount)
        ? globalThis.Number(object.blockedWorkflowExecutionsCount)
        : 0,
      blockedWorkflowResourceNames: globalThis.Array.isArray(object?.blockedWorkflowResourceNames)
        ? object.blockedWorkflowResourceNames.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: GetBlockedWorkflowExecutionStatisticsResponse): unknown {
    const obj: any = {};
    if (message.blockedWorkflowExecutionsCount !== undefined && message.blockedWorkflowExecutionsCount !== 0) {
      obj.blockedWorkflowExecutionsCount = Math.round(message.blockedWorkflowExecutionsCount);
    }
    if (message.blockedWorkflowResourceNames?.length) {
      obj.blockedWorkflowResourceNames = message.blockedWorkflowResourceNames;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBlockedWorkflowExecutionStatisticsResponse>, I>>(
    base?: I,
  ): GetBlockedWorkflowExecutionStatisticsResponse {
    return GetBlockedWorkflowExecutionStatisticsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBlockedWorkflowExecutionStatisticsResponse>, I>>(
    object: I,
  ): GetBlockedWorkflowExecutionStatisticsResponse {
    const message = createBaseGetBlockedWorkflowExecutionStatisticsResponse();
    message.blockedWorkflowExecutionsCount = object.blockedWorkflowExecutionsCount ?? 0;
    message.blockedWorkflowResourceNames = object.blockedWorkflowResourceNames?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(
  GetBlockedWorkflowExecutionStatisticsResponse.$type,
  GetBlockedWorkflowExecutionStatisticsResponse,
);

function createBaseGetWorkflowExecutionRequest(): GetWorkflowExecutionRequest {
  return { $type: "pb.v1alpha2.GetWorkflowExecutionRequest", name: "", parent: "" };
}

export const GetWorkflowExecutionRequest = {
  $type: "pb.v1alpha2.GetWorkflowExecutionRequest" as const,

  encode(message: GetWorkflowExecutionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(18).string(message.parent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWorkflowExecutionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetWorkflowExecutionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.parent = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetWorkflowExecutionRequest {
    return {
      $type: GetWorkflowExecutionRequest.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
    };
  },

  toJSON(message: GetWorkflowExecutionRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetWorkflowExecutionRequest>, I>>(base?: I): GetWorkflowExecutionRequest {
    return GetWorkflowExecutionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetWorkflowExecutionRequest>, I>>(object: I): GetWorkflowExecutionRequest {
    const message = createBaseGetWorkflowExecutionRequest();
    message.name = object.name ?? "";
    message.parent = object.parent ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetWorkflowExecutionRequest.$type, GetWorkflowExecutionRequest);

export interface WorkflowExecutions {
  ListWorkflowExecutions(
    request: DeepPartial<ListWorkflowExecutionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListWorkflowExecutionsResponse>;
  GetBlockedWorkflowExecutionStatistics(
    request: DeepPartial<GetBlockedWorkflowExecutionStatisticsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetBlockedWorkflowExecutionStatisticsResponse>;
  GetWorkflowExecution(
    request: DeepPartial<GetWorkflowExecutionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<WorkflowExecution>;
}

export class WorkflowExecutionsClientImpl implements WorkflowExecutions {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListWorkflowExecutions = this.ListWorkflowExecutions.bind(this);
    this.GetBlockedWorkflowExecutionStatistics = this.GetBlockedWorkflowExecutionStatistics.bind(this);
    this.GetWorkflowExecution = this.GetWorkflowExecution.bind(this);
  }

  ListWorkflowExecutions(
    request: DeepPartial<ListWorkflowExecutionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListWorkflowExecutionsResponse> {
    return this.rpc.unary(
      WorkflowExecutionsListWorkflowExecutionsDesc,
      ListWorkflowExecutionsRequest.fromPartial(request),
      metadata,
    );
  }

  GetBlockedWorkflowExecutionStatistics(
    request: DeepPartial<GetBlockedWorkflowExecutionStatisticsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetBlockedWorkflowExecutionStatisticsResponse> {
    return this.rpc.unary(
      WorkflowExecutionsGetBlockedWorkflowExecutionStatisticsDesc,
      GetBlockedWorkflowExecutionStatisticsRequest.fromPartial(request),
      metadata,
    );
  }

  GetWorkflowExecution(
    request: DeepPartial<GetWorkflowExecutionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<WorkflowExecution> {
    return this.rpc.unary(
      WorkflowExecutionsGetWorkflowExecutionDesc,
      GetWorkflowExecutionRequest.fromPartial(request),
      metadata,
    );
  }
}

export const WorkflowExecutionsDesc = { serviceName: "pb.v1alpha2.WorkflowExecutions" };

export const WorkflowExecutionsListWorkflowExecutionsDesc: UnaryMethodDefinitionish = {
  methodName: "ListWorkflowExecutions",
  service: WorkflowExecutionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListWorkflowExecutionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListWorkflowExecutionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const WorkflowExecutionsGetBlockedWorkflowExecutionStatisticsDesc: UnaryMethodDefinitionish = {
  methodName: "GetBlockedWorkflowExecutionStatistics",
  service: WorkflowExecutionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetBlockedWorkflowExecutionStatisticsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetBlockedWorkflowExecutionStatisticsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const WorkflowExecutionsGetWorkflowExecutionDesc: UnaryMethodDefinitionish = {
  methodName: "GetWorkflowExecution",
  service: WorkflowExecutionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetWorkflowExecutionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = WorkflowExecution.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata ?? {},
        ...(this.options.transport !== undefined ? { transport: this.options.transport } : {}),
        debug: this.options.debug ?? false,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }
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

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
