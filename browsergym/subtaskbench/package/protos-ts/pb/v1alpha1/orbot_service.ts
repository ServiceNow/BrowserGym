/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { SortField } from "../../common/data_query_params";
import { Empty } from "../../google/protobuf/empty";
import { FieldMask } from "../../google/protobuf/field_mask";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import {
  GenerateActionDescriptionRequest,
  GenerateActionDescriptionResponse,
  GenerateJsActionRequest,
  GenerateJsActionResponse,
  InferMacroActionStepRequest,
  InferMacroActionStepResponse,
} from "./actiongen";
import { ProcessSmartActionsRequest, ProcessSmartActionsResponse } from "./actionprocessing";
import { ControlType, controlTypeFromJSON, controlTypeToJSON, Element } from "./element";
import {
  GetElementLocatorsRequest,
  GetElementLocatorsResponse,
  LocateElementRequest,
  LocateElementResponse,
  ReportWorkingElementLocatorRequest,
} from "./elementlocating";
import { ExecutedAction, UserEvent } from "./orbot_action";
import {
  Workflow,
  WorkflowTask,
  WorkflowTaskStatus,
  workflowTaskStatusFromJSON,
  workflowTaskStatusToJSON,
} from "./orbot_workflow";

export const protobufPackage = "pb.v1alpha1";

export interface GetWorkflowRequest {
  $type?: "pb.v1alpha1.GetWorkflowRequest";
  workflowId?: string | undefined;
  orgId?: string | undefined;
}

export interface UpdateWorkflowRequest {
  $type?: "pb.v1alpha1.UpdateWorkflowRequest";
  workflow?: Workflow | undefined;
  updateMask?: string[] | undefined;
  orgId?: string | undefined;
}

export interface CreateWorkflowRequest {
  $type?: "pb.v1alpha1.CreateWorkflowRequest";
  /** Workflow.org_id must be set */
  workflow?: Workflow | undefined;
}

export interface ListWorkflowsRequest {
  $type?: "pb.v1alpha1.ListWorkflowsRequest";
  orgId?: string | undefined;
  pageSize?:
    | number
    | undefined;
  /** Will be deprecated in the near future, please use page_number */
  pageToken?:
    | string
    | undefined;
  /**
   * search by name, right now we only support prefix search
   * Deprecated, please use prefix_name filter
   *
   * @deprecated
   */
  nameSearch?:
    | string
    | undefined;
  /** Indexed from 1 */
  pageNumber?:
    | number
    | undefined;
  /**
   * If unset:
   *   Admin: list workflows for the organization.
   *   User: list assigned workflows where user is a workflow user.
   * If set:
   *   Admin: list assigned workflows for this user
   *   User: error if set to other users. No difference if set to own email.
   * Will be deprecated shortly, please use the user option in 'filters'
   * Non-admin will only be able to see their own workflows
   */
  user?:
    | string
    | undefined;
  /**
   * Deprecated: moving forward, use WorkflowFilters
   * Supported filters:
   * name_prefix="value"
   * create_time_lt={UNIX_TIME_SEC}
   * create_time_gt={UNIX_TIME_SEC}
   * last_update_time_lt={UNIX_TIME_SEC}
   * last_update_time_gt={UNIX_TIME_SEC}
   * userIds="{Id1}-{Id2}"
   * multiple user Ids can be provided by a dash separator
   * creatorIds="{Id1}-{Id2}"
   * multiple creator Ids can be provided by a dash separator
   * mode={DEFAULT|ASSISTED}
   * multiple mode values can be provided with a dash (-) separator, eg. "mode=DEFAULT-ASSISTED"
   */
  filter?:
    | string
    | undefined;
  /**
   * The order of fields will effect the sorting order.
   * Supported fields: display_name, create_time, last_update_time
   */
  sort?:
    | SortField[]
    | undefined;
  /**
   * Use this to send only relevant data in response
   * - If Field Mask is not send or is sent with empty paths then the result will contain
   *    the complete object
   * - Valid values for field mask are: id, display_name, description, task_execution,
   *    processes, create_time, last_update_time, status, org_id, actions_for_review,
   *    low_confidence_threshold, export_output, reviewer_ids, creator_id
   * - Field mask will always contain `name` field. Please do not send it in Paths to avoid errors.
   */
  fieldMask?: string[] | undefined;
  workflowFilters?: ListWorkflowsRequestWorkflowFilters | undefined;
}

/** Filters for listing workflows */
export interface ListWorkflowsRequestWorkflowFilters {
  $type?: "pb.v1alpha1.ListWorkflowsRequest.WorkflowFilters";
  namePrefix?:
    | string
    | undefined;
  /** {UNIX_TIME_SEC} */
  createTimeLt?:
    | number
    | undefined;
  /** {UNIX_TIME_SEC} */
  createTimeGt?:
    | number
    | undefined;
  /** {UNIX_TIME_SEC} */
  lastUpdateTimeLt?:
    | number
    | undefined;
  /** {UNIX_TIME_SEC} */
  lastUpdateTimeGt?:
    | number
    | undefined;
  /** {true|false} */
  isTemplate?:
    | boolean
    | undefined;
  /** {extraction|classification}" */
  type?:
    | string
    | undefined;
  /** {status_enabled|status_disabled}, */
  status?:
    | string
    | undefined;
  /** List of applications for a workflow {Google Sheets, SFTP Server, Gmail, Other} */
  applications?:
    | string[]
    | undefined;
  /** {MODE_UNSPECIFIED|MODE_AUTOMATED|MODE_ASSISTED} */
  modes?:
    | string[]
    | undefined;
  /** List of user ids, refers to reviewers of a workflow */
  userIds?:
    | string[]
    | undefined;
  /** List of creator ids, refers to creators of a workflow */
  creatorIds?:
    | string[]
    | undefined;
  /** List of user emails, referes to reviewers of a workflow */
  userEmails?:
    | string[]
    | undefined;
  /** List of creator emails for orby workflows (to be deprecated) */
  creatorEmails?: string[] | undefined;
}

export interface ListWorkflowsResponse {
  $type?: "pb.v1alpha1.ListWorkflowsResponse";
  workflows?:
    | Workflow[]
    | undefined;
  /** Will be deprecated in the near future */
  nextPageToken?: string | undefined;
  totalSize?: number | undefined;
}

export interface DeleteWorkflowRequest {
  $type?: "pb.v1alpha1.DeleteWorkflowRequest";
  workflowId?: string | undefined;
  orgId?: string | undefined;
  reason?: string | undefined;
}

export interface DeleteExecutionsRequest {
  $type?: "pb.v1alpha1.DeleteExecutionsRequest";
  /** List of IDs for executions to be deleted. */
  executionIds?:
    | string[]
    | undefined;
  /** Reason for deletion */
  reason?: string | undefined;
}

export interface DeleteExecutionsResponse {
  $type?: "pb.v1alpha1.DeleteExecutionsResponse";
  /**
   * Temporal ID for tracking the deletion process in Temporal.
   * Currently, there is no provision for the frontend to query for results,
   * but this might be added in the future if needed.
   */
  temporalId?: string | undefined;
}

export interface DeleteWorkflowResponse {
  $type?: "pb.v1alpha1.DeleteWorkflowResponse";
  operationId?: string | undefined;
}

export interface CreateWorkflowTaskRequest {
  $type?: "pb.v1alpha1.CreateWorkflowTaskRequest";
  task?: WorkflowTask | undefined;
  orgId?: string | undefined;
}

export interface GetWorkflowTaskRequest {
  $type?: "pb.v1alpha1.GetWorkflowTaskRequest";
  taskId?: string | undefined;
  orgId?: string | undefined;
}

/**
 * The lifecycle of Task:
 * discover: createTask -> pending
 * execute: updateTask -> executing
 * pause and waiting for human review: updateTask -> waiting for review
 * succeed: updateTask -> success, executedActions
 * failed: updateTask -> failed, executedActions, errorMessage
 * terminated: updateTask -> terminated, executedActions
 */
export interface UpdateWorkflowTaskRequest {
  $type?: "pb.v1alpha1.UpdateWorkflowTaskRequest";
  taskId?: string | undefined;
  status?: WorkflowTaskStatus | undefined;
  orgId?:
    | string
    | undefined;
  /** overwrite this field everytime */
  executedActions?: ExecutedAction[] | undefined;
  errorMessage?:
    | string
    | undefined;
  /** append one or more ExecutedActions to the WorkflowTask.executed_actions field */
  appendExecutedActions?: ExecutedAction[] | undefined;
  startTime?: Date | undefined;
  endTime?:
    | Date
    | undefined;
  /** User can claim any execution at the initial time of execution. */
  executorId?:
    | string
    | undefined;
  /** Client connection on which the execution is running. */
  connectionId?: string | undefined;
}

export interface ListWorkflowTasksRequest {
  $type?: "pb.v1alpha1.ListWorkflowTasksRequest";
  /**
   * Deprecated: use workflow_ids
   *
   * @deprecated
   */
  workflowId?: string | undefined;
  pageSize?:
    | number
    | undefined;
  /** Will be deprecated in the near future, please use page_number */
  pageToken?: string | undefined;
  orgId?:
    | string
    | undefined;
  /** Will be deprecated, please use status in filter instead */
  statuses?:
    | WorkflowTaskStatus[]
    | undefined;
  /** Will be deprecated, please use user_ids in filter instead */
  userIds?:
    | string[]
    | undefined;
  /** Will be deprecated, please use variable_search in filter instead */
  variableSearch?:
    | string
    | undefined;
  /**
   * filter by the task that creates it via the CreateTask action
   *
   * @deprecated
   */
  parentTaskId?:
    | string
    | undefined;
  /** Will be deprecated, please use workflow_resource_names in filter instead */
  workflowIds?:
    | string[]
    | undefined;
  /** page index, start from 1 */
  pageNumber?: number | undefined;
  filter?:
    | ListWorkflowTasksRequestFilter
    | undefined;
  /**
   * The order of fields will effect the sorting order.
   * Supported fields: status, start_time, end_time
   */
  sort?: SortField[] | undefined;
}

export interface ListWorkflowTasksRequestFilter {
  $type?: "pb.v1alpha1.ListWorkflowTasksRequestFilter";
  /**
   * text search for all values in WorkflowTask.variables,
   * right now we only support prefix search
   */
  variablePrefix?: string | undefined;
  statuses?:
    | WorkflowTaskStatus[]
    | undefined;
  /** Orbot workflow resource name. Format: orbot_workflows/{ID} */
  workflowResourceNames?: string[] | undefined;
  userIds?:
    | string[]
    | undefined;
  /** last_update_time_lt={UNIX_TIME_SEC} */
  lastUpdateTimeLt?:
    | number
    | undefined;
  /** last_update_time_gt={UNIX_TIME_SEC} */
  lastUpdateTimeGt?: number | undefined;
}

export interface ListWorkflowTasksResponse {
  $type?: "pb.v1alpha1.ListWorkflowTasksResponse";
  tasks?:
    | WorkflowTask[]
    | undefined;
  /** Will be deprecated in the near future */
  nextPageToken?: string | undefined;
  totalSize?: number | undefined;
}

export interface GetActionableElementsRequest {
  $type?: "pb.v1alpha1.GetActionableElementsRequest";
  workflowId?: string | undefined;
  orgId?: string | undefined;
  actionUuid?: string | undefined;
  elementTypes?: ControlType[] | undefined;
  processId?: string | undefined;
}

export interface GetActionableElementsResponse {
  $type?: "pb.v1alpha1.GetActionableElementsResponse";
  elements?: Element[] | undefined;
}

export interface SendEmailForReviewRequest {
  $type?: "pb.v1alpha1.SendEmailForReviewRequest";
  /** the tasks for review might come from one or more workflows. */
  workflows?: SendEmailForReviewRequestWorkflowInfo[] | undefined;
}

export interface SendEmailForReviewRequestWorkflowInfo {
  $type?: "pb.v1alpha1.SendEmailForReviewRequest.WorkflowInfo";
  workflowName?: string | undefined;
  numTasksForReview?: number | undefined;
}

export interface GetWorkflowTemplateRequest {
  $type?: "pb.v1alpha1.GetWorkflowTemplateRequest";
  templateId?: string | undefined;
  orgId?: string | undefined;
}

export interface SaveWorkflowTemplateRequest {
  $type?: "pb.v1alpha1.SaveWorkflowTemplateRequest";
  /**
   * If template_id is empty or cannot be found, create a new template.
   * Otherwise update the existing template by replacing the entire content.
   */
  templateId?: string | undefined;
  orgId?: string | undefined;
  workflowTemplate?: Workflow | undefined;
}

export interface ListWorkflowTemplatesRequest {
  $type?: "pb.v1alpha1.ListWorkflowTemplatesRequest";
  orgId?: string | undefined;
  pageSize?:
    | number
    | undefined;
  /** Indexed from 1 */
  pageNumber?: number | undefined;
}

export interface ListWorkflowTemplatesResponse {
  $type?: "pb.v1alpha1.ListWorkflowTemplatesResponse";
  workflows?: Workflow[] | undefined;
  totalSize?: number | undefined;
}

export interface DeleteWorkflowTemplateRequest {
  $type?: "pb.v1alpha1.DeleteWorkflowTemplateRequest";
  templateId?: string | undefined;
  orgId?: string | undefined;
}

export interface DeleteWorkflowTemplateResponse {
  $type?: "pb.v1alpha1.DeleteWorkflowTemplateResponse";
}

export interface SaveUserFeedbackRequest {
  $type?: "pb.v1alpha1.SaveUserFeedbackRequest";
  /**
   * Indicate what application the feedback is for.
   * e.g. "concur_expenses"
   */
  application?:
    | string
    | undefined;
  /**
   * Unique identifier for the entity the feedback is for.
   * e.g. For Concur expenses, this is the expense key.
   */
  entityId?:
    | string
    | undefined;
  /**
   * Generic key-value pairs to keep this API flexible.
   * Current use case of Concur expense report requires the following keys:
   *   "report_id", "exception_code", "exception_message",
   *   "confirmed": "true" or "false",
   *   "comment" (optional),
   */
  metadata?: { [key: string]: string } | undefined;
}

export interface SaveUserFeedbackRequestMetadataEntry {
  $type?: "pb.v1alpha1.SaveUserFeedbackRequest.MetadataEntry";
  key: string;
  value: string;
}

export interface SaveUserFeedbackResponse {
  $type?: "pb.v1alpha1.SaveUserFeedbackResponse";
}

export interface SendEmailRequest {
  $type?: "pb.v1alpha1.SendEmailRequest";
  recipients?: string[] | undefined;
  subject?: string | undefined;
  body?: SendEmailRequestBody | undefined;
  attachments?: SendEmailRequestAttachment[] | undefined;
}

export interface SendEmailRequestAttachment {
  $type?: "pb.v1alpha1.SendEmailRequest.Attachment";
  filename?: string | undefined;
  content?: Uint8Array | undefined;
  mimeType?: string | undefined;
}

export interface SendEmailRequestBody {
  $type?: "pb.v1alpha1.SendEmailRequest.Body";
  /** plaintext content with MIME type of `text/plain` */
  plain?:
    | string
    | undefined;
  /** rich content with MIME type of `text/html` */
  html?: string | undefined;
}

export interface SendEmailResponse {
  $type?: "pb.v1alpha1.SendEmailResponse";
}

export interface CancelExecutionRequest {
  $type?: "pb.v1alpha1.CancelExecutionRequest";
  executionId?: string | undefined;
  orgId?:
    | string
    | undefined;
  /** If this field is true, we will only cancel the child execution otherwise we will cancel the execution itself */
  cancelNestedExecution?: boolean | undefined;
}

export interface CancelExecutionResponse {
  $type?: "pb.v1alpha1.CancelExecutionResponse";
}

export interface SaveUserEventsRequest {
  $type?: "pb.v1alpha1.SaveUserEventsRequest";
  events?: UserEvent[] | undefined;
}

export interface SaveUserEventsResponse {
  $type?: "pb.v1alpha1.SaveUserEventsResponse";
}

function createBaseGetWorkflowRequest(): GetWorkflowRequest {
  return { $type: "pb.v1alpha1.GetWorkflowRequest", workflowId: "", orgId: "" };
}

export const GetWorkflowRequest = {
  $type: "pb.v1alpha1.GetWorkflowRequest" as const,

  encode(message: GetWorkflowRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(10).string(message.workflowId);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWorkflowRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetWorkflowRequest();
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

  fromJSON(object: any): GetWorkflowRequest {
    return {
      $type: GetWorkflowRequest.$type,
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
    };
  },

  toJSON(message: GetWorkflowRequest): unknown {
    const obj: any = {};
    if (message.workflowId !== undefined && message.workflowId !== "") {
      obj.workflowId = message.workflowId;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetWorkflowRequest>, I>>(base?: I): GetWorkflowRequest {
    return GetWorkflowRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetWorkflowRequest>, I>>(object: I): GetWorkflowRequest {
    const message = createBaseGetWorkflowRequest();
    message.workflowId = object.workflowId ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetWorkflowRequest.$type, GetWorkflowRequest);

function createBaseUpdateWorkflowRequest(): UpdateWorkflowRequest {
  return { $type: "pb.v1alpha1.UpdateWorkflowRequest", workflow: undefined, updateMask: undefined, orgId: "" };
}

export const UpdateWorkflowRequest = {
  $type: "pb.v1alpha1.UpdateWorkflowRequest" as const,

  encode(message: UpdateWorkflowRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflow !== undefined) {
      Workflow.encode(message.workflow, writer.uint32(10).fork()).ldelim();
    }
    if (message.updateMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.updateMask), writer.uint32(18).fork()).ldelim();
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(26).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWorkflowRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateWorkflowRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflow = Workflow.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.updateMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): UpdateWorkflowRequest {
    return {
      $type: UpdateWorkflowRequest.$type,
      workflow: isSet(object.workflow) ? Workflow.fromJSON(object.workflow) : undefined,
      updateMask: isSet(object.updateMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.updateMask)) : undefined,
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
    };
  },

  toJSON(message: UpdateWorkflowRequest): unknown {
    const obj: any = {};
    if (message.workflow !== undefined) {
      obj.workflow = Workflow.toJSON(message.workflow);
    }
    if (message.updateMask !== undefined) {
      obj.updateMask = FieldMask.toJSON(FieldMask.wrap(message.updateMask));
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateWorkflowRequest>, I>>(base?: I): UpdateWorkflowRequest {
    return UpdateWorkflowRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateWorkflowRequest>, I>>(object: I): UpdateWorkflowRequest {
    const message = createBaseUpdateWorkflowRequest();
    message.workflow = (object.workflow !== undefined && object.workflow !== null)
      ? Workflow.fromPartial(object.workflow)
      : undefined;
    message.updateMask = object.updateMask ?? undefined;
    message.orgId = object.orgId ?? "";
    return message;
  },
};

messageTypeRegistry.set(UpdateWorkflowRequest.$type, UpdateWorkflowRequest);

function createBaseCreateWorkflowRequest(): CreateWorkflowRequest {
  return { $type: "pb.v1alpha1.CreateWorkflowRequest", workflow: undefined };
}

export const CreateWorkflowRequest = {
  $type: "pb.v1alpha1.CreateWorkflowRequest" as const,

  encode(message: CreateWorkflowRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflow !== undefined) {
      Workflow.encode(message.workflow, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWorkflowRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateWorkflowRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflow = Workflow.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateWorkflowRequest {
    return {
      $type: CreateWorkflowRequest.$type,
      workflow: isSet(object.workflow) ? Workflow.fromJSON(object.workflow) : undefined,
    };
  },

  toJSON(message: CreateWorkflowRequest): unknown {
    const obj: any = {};
    if (message.workflow !== undefined) {
      obj.workflow = Workflow.toJSON(message.workflow);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateWorkflowRequest>, I>>(base?: I): CreateWorkflowRequest {
    return CreateWorkflowRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateWorkflowRequest>, I>>(object: I): CreateWorkflowRequest {
    const message = createBaseCreateWorkflowRequest();
    message.workflow = (object.workflow !== undefined && object.workflow !== null)
      ? Workflow.fromPartial(object.workflow)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateWorkflowRequest.$type, CreateWorkflowRequest);

function createBaseListWorkflowsRequest(): ListWorkflowsRequest {
  return {
    $type: "pb.v1alpha1.ListWorkflowsRequest",
    orgId: "",
    pageSize: 0,
    pageToken: "",
    nameSearch: "",
    pageNumber: 0,
    user: "",
    filter: "",
    sort: [],
    fieldMask: undefined,
    workflowFilters: undefined,
  };
}

export const ListWorkflowsRequest = {
  $type: "pb.v1alpha1.ListWorkflowsRequest" as const,

  encode(message: ListWorkflowsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      writer.uint32(26).string(message.pageToken);
    }
    if (message.nameSearch !== undefined && message.nameSearch !== "") {
      writer.uint32(34).string(message.nameSearch);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(40).int32(message.pageNumber);
    }
    if (message.user !== undefined && message.user !== "") {
      writer.uint32(50).string(message.user);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(58).string(message.filter);
    }
    if (message.sort !== undefined && message.sort.length !== 0) {
      for (const v of message.sort) {
        SortField.encode(v!, writer.uint32(66).fork()).ldelim();
      }
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(74).fork()).ldelim();
    }
    if (message.workflowFilters !== undefined) {
      ListWorkflowsRequestWorkflowFilters.encode(message.workflowFilters, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pageToken = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.nameSearch = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.pageNumber = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.user = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.filter = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.sort!.push(SortField.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.workflowFilters = ListWorkflowsRequestWorkflowFilters.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListWorkflowsRequest {
    return {
      $type: ListWorkflowsRequest.$type,
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
      nameSearch: isSet(object.nameSearch) ? globalThis.String(object.nameSearch) : "",
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
      sort: globalThis.Array.isArray(object?.sort) ? object.sort.map((e: any) => SortField.fromJSON(e)) : [],
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
      workflowFilters: isSet(object.workflowFilters)
        ? ListWorkflowsRequestWorkflowFilters.fromJSON(object.workflowFilters)
        : undefined,
    };
  },

  toJSON(message: ListWorkflowsRequest): unknown {
    const obj: any = {};
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      obj.pageToken = message.pageToken;
    }
    if (message.nameSearch !== undefined && message.nameSearch !== "") {
      obj.nameSearch = message.nameSearch;
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.user !== undefined && message.user !== "") {
      obj.user = message.user;
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    if (message.sort?.length) {
      obj.sort = message.sort.map((e) => SortField.toJSON(e));
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    if (message.workflowFilters !== undefined) {
      obj.workflowFilters = ListWorkflowsRequestWorkflowFilters.toJSON(message.workflowFilters);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowsRequest>, I>>(base?: I): ListWorkflowsRequest {
    return ListWorkflowsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowsRequest>, I>>(object: I): ListWorkflowsRequest {
    const message = createBaseListWorkflowsRequest();
    message.orgId = object.orgId ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    message.nameSearch = object.nameSearch ?? "";
    message.pageNumber = object.pageNumber ?? 0;
    message.user = object.user ?? "";
    message.filter = object.filter ?? "";
    message.sort = object.sort?.map((e) => SortField.fromPartial(e)) || [];
    message.fieldMask = object.fieldMask ?? undefined;
    message.workflowFilters = (object.workflowFilters !== undefined && object.workflowFilters !== null)
      ? ListWorkflowsRequestWorkflowFilters.fromPartial(object.workflowFilters)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowsRequest.$type, ListWorkflowsRequest);

function createBaseListWorkflowsRequestWorkflowFilters(): ListWorkflowsRequestWorkflowFilters {
  return {
    $type: "pb.v1alpha1.ListWorkflowsRequest.WorkflowFilters",
    namePrefix: "",
    createTimeLt: 0,
    createTimeGt: 0,
    lastUpdateTimeLt: 0,
    lastUpdateTimeGt: 0,
    isTemplate: false,
    type: "",
    status: "",
    applications: [],
    modes: [],
    userIds: [],
    creatorIds: [],
    userEmails: [],
    creatorEmails: [],
  };
}

export const ListWorkflowsRequestWorkflowFilters = {
  $type: "pb.v1alpha1.ListWorkflowsRequest.WorkflowFilters" as const,

  encode(message: ListWorkflowsRequestWorkflowFilters, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.namePrefix !== undefined && message.namePrefix !== "") {
      writer.uint32(10).string(message.namePrefix);
    }
    if (message.createTimeLt !== undefined && message.createTimeLt !== 0) {
      writer.uint32(16).int64(message.createTimeLt);
    }
    if (message.createTimeGt !== undefined && message.createTimeGt !== 0) {
      writer.uint32(24).int64(message.createTimeGt);
    }
    if (message.lastUpdateTimeLt !== undefined && message.lastUpdateTimeLt !== 0) {
      writer.uint32(32).int64(message.lastUpdateTimeLt);
    }
    if (message.lastUpdateTimeGt !== undefined && message.lastUpdateTimeGt !== 0) {
      writer.uint32(40).int64(message.lastUpdateTimeGt);
    }
    if (message.isTemplate !== undefined && message.isTemplate !== false) {
      writer.uint32(48).bool(message.isTemplate);
    }
    if (message.type !== undefined && message.type !== "") {
      writer.uint32(58).string(message.type);
    }
    if (message.status !== undefined && message.status !== "") {
      writer.uint32(66).string(message.status);
    }
    if (message.applications !== undefined && message.applications.length !== 0) {
      for (const v of message.applications) {
        writer.uint32(74).string(v!);
      }
    }
    if (message.modes !== undefined && message.modes.length !== 0) {
      for (const v of message.modes) {
        writer.uint32(82).string(v!);
      }
    }
    if (message.userIds !== undefined && message.userIds.length !== 0) {
      for (const v of message.userIds) {
        writer.uint32(90).string(v!);
      }
    }
    if (message.creatorIds !== undefined && message.creatorIds.length !== 0) {
      for (const v of message.creatorIds) {
        writer.uint32(98).string(v!);
      }
    }
    if (message.userEmails !== undefined && message.userEmails.length !== 0) {
      for (const v of message.userEmails) {
        writer.uint32(106).string(v!);
      }
    }
    if (message.creatorEmails !== undefined && message.creatorEmails.length !== 0) {
      for (const v of message.creatorEmails) {
        writer.uint32(114).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowsRequestWorkflowFilters {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowsRequestWorkflowFilters();
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
          if (tag !== 16) {
            break;
          }

          message.createTimeLt = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.createTimeGt = longToNumber(reader.int64() as Long);
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
        case 6:
          if (tag !== 48) {
            break;
          }

          message.isTemplate = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.type = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.status = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.applications!.push(reader.string());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.modes!.push(reader.string());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.userIds!.push(reader.string());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.creatorIds!.push(reader.string());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.userEmails!.push(reader.string());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.creatorEmails!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListWorkflowsRequestWorkflowFilters {
    return {
      $type: ListWorkflowsRequestWorkflowFilters.$type,
      namePrefix: isSet(object.namePrefix) ? globalThis.String(object.namePrefix) : "",
      createTimeLt: isSet(object.createTimeLt) ? globalThis.Number(object.createTimeLt) : 0,
      createTimeGt: isSet(object.createTimeGt) ? globalThis.Number(object.createTimeGt) : 0,
      lastUpdateTimeLt: isSet(object.lastUpdateTimeLt) ? globalThis.Number(object.lastUpdateTimeLt) : 0,
      lastUpdateTimeGt: isSet(object.lastUpdateTimeGt) ? globalThis.Number(object.lastUpdateTimeGt) : 0,
      isTemplate: isSet(object.isTemplate) ? globalThis.Boolean(object.isTemplate) : false,
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      status: isSet(object.status) ? globalThis.String(object.status) : "",
      applications: globalThis.Array.isArray(object?.applications)
        ? object.applications.map((e: any) => globalThis.String(e))
        : [],
      modes: globalThis.Array.isArray(object?.modes) ? object.modes.map((e: any) => globalThis.String(e)) : [],
      userIds: globalThis.Array.isArray(object?.userIds) ? object.userIds.map((e: any) => globalThis.String(e)) : [],
      creatorIds: globalThis.Array.isArray(object?.creatorIds)
        ? object.creatorIds.map((e: any) => globalThis.String(e))
        : [],
      userEmails: globalThis.Array.isArray(object?.userEmails)
        ? object.userEmails.map((e: any) => globalThis.String(e))
        : [],
      creatorEmails: globalThis.Array.isArray(object?.creatorEmails)
        ? object.creatorEmails.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: ListWorkflowsRequestWorkflowFilters): unknown {
    const obj: any = {};
    if (message.namePrefix !== undefined && message.namePrefix !== "") {
      obj.namePrefix = message.namePrefix;
    }
    if (message.createTimeLt !== undefined && message.createTimeLt !== 0) {
      obj.createTimeLt = Math.round(message.createTimeLt);
    }
    if (message.createTimeGt !== undefined && message.createTimeGt !== 0) {
      obj.createTimeGt = Math.round(message.createTimeGt);
    }
    if (message.lastUpdateTimeLt !== undefined && message.lastUpdateTimeLt !== 0) {
      obj.lastUpdateTimeLt = Math.round(message.lastUpdateTimeLt);
    }
    if (message.lastUpdateTimeGt !== undefined && message.lastUpdateTimeGt !== 0) {
      obj.lastUpdateTimeGt = Math.round(message.lastUpdateTimeGt);
    }
    if (message.isTemplate !== undefined && message.isTemplate !== false) {
      obj.isTemplate = message.isTemplate;
    }
    if (message.type !== undefined && message.type !== "") {
      obj.type = message.type;
    }
    if (message.status !== undefined && message.status !== "") {
      obj.status = message.status;
    }
    if (message.applications?.length) {
      obj.applications = message.applications;
    }
    if (message.modes?.length) {
      obj.modes = message.modes;
    }
    if (message.userIds?.length) {
      obj.userIds = message.userIds;
    }
    if (message.creatorIds?.length) {
      obj.creatorIds = message.creatorIds;
    }
    if (message.userEmails?.length) {
      obj.userEmails = message.userEmails;
    }
    if (message.creatorEmails?.length) {
      obj.creatorEmails = message.creatorEmails;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowsRequestWorkflowFilters>, I>>(
    base?: I,
  ): ListWorkflowsRequestWorkflowFilters {
    return ListWorkflowsRequestWorkflowFilters.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowsRequestWorkflowFilters>, I>>(
    object: I,
  ): ListWorkflowsRequestWorkflowFilters {
    const message = createBaseListWorkflowsRequestWorkflowFilters();
    message.namePrefix = object.namePrefix ?? "";
    message.createTimeLt = object.createTimeLt ?? 0;
    message.createTimeGt = object.createTimeGt ?? 0;
    message.lastUpdateTimeLt = object.lastUpdateTimeLt ?? 0;
    message.lastUpdateTimeGt = object.lastUpdateTimeGt ?? 0;
    message.isTemplate = object.isTemplate ?? false;
    message.type = object.type ?? "";
    message.status = object.status ?? "";
    message.applications = object.applications?.map((e) => e) || [];
    message.modes = object.modes?.map((e) => e) || [];
    message.userIds = object.userIds?.map((e) => e) || [];
    message.creatorIds = object.creatorIds?.map((e) => e) || [];
    message.userEmails = object.userEmails?.map((e) => e) || [];
    message.creatorEmails = object.creatorEmails?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowsRequestWorkflowFilters.$type, ListWorkflowsRequestWorkflowFilters);

function createBaseListWorkflowsResponse(): ListWorkflowsResponse {
  return { $type: "pb.v1alpha1.ListWorkflowsResponse", workflows: [], nextPageToken: "", totalSize: 0 };
}

export const ListWorkflowsResponse = {
  $type: "pb.v1alpha1.ListWorkflowsResponse" as const,

  encode(message: ListWorkflowsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflows !== undefined && message.workflows.length !== 0) {
      for (const v of message.workflows) {
        Workflow.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      writer.uint32(18).string(message.nextPageToken);
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(24).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflows!.push(Workflow.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nextPageToken = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
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

  fromJSON(object: any): ListWorkflowsResponse {
    return {
      $type: ListWorkflowsResponse.$type,
      workflows: globalThis.Array.isArray(object?.workflows)
        ? object.workflows.map((e: any) => Workflow.fromJSON(e))
        : [],
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListWorkflowsResponse): unknown {
    const obj: any = {};
    if (message.workflows?.length) {
      obj.workflows = message.workflows.map((e) => Workflow.toJSON(e));
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowsResponse>, I>>(base?: I): ListWorkflowsResponse {
    return ListWorkflowsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowsResponse>, I>>(object: I): ListWorkflowsResponse {
    const message = createBaseListWorkflowsResponse();
    message.workflows = object.workflows?.map((e) => Workflow.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowsResponse.$type, ListWorkflowsResponse);

function createBaseDeleteWorkflowRequest(): DeleteWorkflowRequest {
  return { $type: "pb.v1alpha1.DeleteWorkflowRequest", workflowId: "", orgId: "", reason: "" };
}

export const DeleteWorkflowRequest = {
  $type: "pb.v1alpha1.DeleteWorkflowRequest" as const,

  encode(message: DeleteWorkflowRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(10).string(message.workflowId);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    if (message.reason !== undefined && message.reason !== "") {
      writer.uint32(26).string(message.reason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWorkflowRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteWorkflowRequest();
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

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.reason = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteWorkflowRequest {
    return {
      $type: DeleteWorkflowRequest.$type,
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      reason: isSet(object.reason) ? globalThis.String(object.reason) : "",
    };
  },

  toJSON(message: DeleteWorkflowRequest): unknown {
    const obj: any = {};
    if (message.workflowId !== undefined && message.workflowId !== "") {
      obj.workflowId = message.workflowId;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.reason !== undefined && message.reason !== "") {
      obj.reason = message.reason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteWorkflowRequest>, I>>(base?: I): DeleteWorkflowRequest {
    return DeleteWorkflowRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteWorkflowRequest>, I>>(object: I): DeleteWorkflowRequest {
    const message = createBaseDeleteWorkflowRequest();
    message.workflowId = object.workflowId ?? "";
    message.orgId = object.orgId ?? "";
    message.reason = object.reason ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteWorkflowRequest.$type, DeleteWorkflowRequest);

function createBaseDeleteExecutionsRequest(): DeleteExecutionsRequest {
  return { $type: "pb.v1alpha1.DeleteExecutionsRequest", executionIds: [], reason: "" };
}

export const DeleteExecutionsRequest = {
  $type: "pb.v1alpha1.DeleteExecutionsRequest" as const,

  encode(message: DeleteExecutionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.executionIds !== undefined && message.executionIds.length !== 0) {
      for (const v of message.executionIds) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.reason !== undefined && message.reason !== "") {
      writer.uint32(18).string(message.reason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteExecutionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteExecutionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.executionIds!.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.reason = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteExecutionsRequest {
    return {
      $type: DeleteExecutionsRequest.$type,
      executionIds: globalThis.Array.isArray(object?.executionIds)
        ? object.executionIds.map((e: any) => globalThis.String(e))
        : [],
      reason: isSet(object.reason) ? globalThis.String(object.reason) : "",
    };
  },

  toJSON(message: DeleteExecutionsRequest): unknown {
    const obj: any = {};
    if (message.executionIds?.length) {
      obj.executionIds = message.executionIds;
    }
    if (message.reason !== undefined && message.reason !== "") {
      obj.reason = message.reason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteExecutionsRequest>, I>>(base?: I): DeleteExecutionsRequest {
    return DeleteExecutionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteExecutionsRequest>, I>>(object: I): DeleteExecutionsRequest {
    const message = createBaseDeleteExecutionsRequest();
    message.executionIds = object.executionIds?.map((e) => e) || [];
    message.reason = object.reason ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteExecutionsRequest.$type, DeleteExecutionsRequest);

function createBaseDeleteExecutionsResponse(): DeleteExecutionsResponse {
  return { $type: "pb.v1alpha1.DeleteExecutionsResponse", temporalId: "" };
}

export const DeleteExecutionsResponse = {
  $type: "pb.v1alpha1.DeleteExecutionsResponse" as const,

  encode(message: DeleteExecutionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.temporalId !== undefined && message.temporalId !== "") {
      writer.uint32(10).string(message.temporalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteExecutionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteExecutionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.temporalId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteExecutionsResponse {
    return {
      $type: DeleteExecutionsResponse.$type,
      temporalId: isSet(object.temporalId) ? globalThis.String(object.temporalId) : "",
    };
  },

  toJSON(message: DeleteExecutionsResponse): unknown {
    const obj: any = {};
    if (message.temporalId !== undefined && message.temporalId !== "") {
      obj.temporalId = message.temporalId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteExecutionsResponse>, I>>(base?: I): DeleteExecutionsResponse {
    return DeleteExecutionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteExecutionsResponse>, I>>(object: I): DeleteExecutionsResponse {
    const message = createBaseDeleteExecutionsResponse();
    message.temporalId = object.temporalId ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteExecutionsResponse.$type, DeleteExecutionsResponse);

function createBaseDeleteWorkflowResponse(): DeleteWorkflowResponse {
  return { $type: "pb.v1alpha1.DeleteWorkflowResponse", operationId: "" };
}

export const DeleteWorkflowResponse = {
  $type: "pb.v1alpha1.DeleteWorkflowResponse" as const,

  encode(message: DeleteWorkflowResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationId !== undefined && message.operationId !== "") {
      writer.uint32(10).string(message.operationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWorkflowResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteWorkflowResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.operationId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteWorkflowResponse {
    return {
      $type: DeleteWorkflowResponse.$type,
      operationId: isSet(object.operationId) ? globalThis.String(object.operationId) : "",
    };
  },

  toJSON(message: DeleteWorkflowResponse): unknown {
    const obj: any = {};
    if (message.operationId !== undefined && message.operationId !== "") {
      obj.operationId = message.operationId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteWorkflowResponse>, I>>(base?: I): DeleteWorkflowResponse {
    return DeleteWorkflowResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteWorkflowResponse>, I>>(object: I): DeleteWorkflowResponse {
    const message = createBaseDeleteWorkflowResponse();
    message.operationId = object.operationId ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteWorkflowResponse.$type, DeleteWorkflowResponse);

function createBaseCreateWorkflowTaskRequest(): CreateWorkflowTaskRequest {
  return { $type: "pb.v1alpha1.CreateWorkflowTaskRequest", task: undefined, orgId: "" };
}

export const CreateWorkflowTaskRequest = {
  $type: "pb.v1alpha1.CreateWorkflowTaskRequest" as const,

  encode(message: CreateWorkflowTaskRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.task !== undefined) {
      WorkflowTask.encode(message.task, writer.uint32(10).fork()).ldelim();
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWorkflowTaskRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateWorkflowTaskRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.task = WorkflowTask.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): CreateWorkflowTaskRequest {
    return {
      $type: CreateWorkflowTaskRequest.$type,
      task: isSet(object.task) ? WorkflowTask.fromJSON(object.task) : undefined,
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
    };
  },

  toJSON(message: CreateWorkflowTaskRequest): unknown {
    const obj: any = {};
    if (message.task !== undefined) {
      obj.task = WorkflowTask.toJSON(message.task);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateWorkflowTaskRequest>, I>>(base?: I): CreateWorkflowTaskRequest {
    return CreateWorkflowTaskRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateWorkflowTaskRequest>, I>>(object: I): CreateWorkflowTaskRequest {
    const message = createBaseCreateWorkflowTaskRequest();
    message.task = (object.task !== undefined && object.task !== null)
      ? WorkflowTask.fromPartial(object.task)
      : undefined;
    message.orgId = object.orgId ?? "";
    return message;
  },
};

messageTypeRegistry.set(CreateWorkflowTaskRequest.$type, CreateWorkflowTaskRequest);

function createBaseGetWorkflowTaskRequest(): GetWorkflowTaskRequest {
  return { $type: "pb.v1alpha1.GetWorkflowTaskRequest", taskId: "", orgId: "" };
}

export const GetWorkflowTaskRequest = {
  $type: "pb.v1alpha1.GetWorkflowTaskRequest" as const,

  encode(message: GetWorkflowTaskRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.taskId !== undefined && message.taskId !== "") {
      writer.uint32(10).string(message.taskId);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWorkflowTaskRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetWorkflowTaskRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.taskId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): GetWorkflowTaskRequest {
    return {
      $type: GetWorkflowTaskRequest.$type,
      taskId: isSet(object.taskId) ? globalThis.String(object.taskId) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
    };
  },

  toJSON(message: GetWorkflowTaskRequest): unknown {
    const obj: any = {};
    if (message.taskId !== undefined && message.taskId !== "") {
      obj.taskId = message.taskId;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetWorkflowTaskRequest>, I>>(base?: I): GetWorkflowTaskRequest {
    return GetWorkflowTaskRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetWorkflowTaskRequest>, I>>(object: I): GetWorkflowTaskRequest {
    const message = createBaseGetWorkflowTaskRequest();
    message.taskId = object.taskId ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetWorkflowTaskRequest.$type, GetWorkflowTaskRequest);

function createBaseUpdateWorkflowTaskRequest(): UpdateWorkflowTaskRequest {
  return {
    $type: "pb.v1alpha1.UpdateWorkflowTaskRequest",
    taskId: "",
    status: 0,
    orgId: "",
    executedActions: [],
    errorMessage: "",
    appendExecutedActions: [],
    startTime: undefined,
    endTime: undefined,
    executorId: "",
    connectionId: "",
  };
}

export const UpdateWorkflowTaskRequest = {
  $type: "pb.v1alpha1.UpdateWorkflowTaskRequest" as const,

  encode(message: UpdateWorkflowTaskRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.taskId !== undefined && message.taskId !== "") {
      writer.uint32(10).string(message.taskId);
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(26).string(message.orgId);
    }
    if (message.executedActions !== undefined && message.executedActions.length !== 0) {
      for (const v of message.executedActions) {
        ExecutedAction.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.errorMessage !== undefined && message.errorMessage !== "") {
      writer.uint32(42).string(message.errorMessage);
    }
    if (message.appendExecutedActions !== undefined && message.appendExecutedActions.length !== 0) {
      for (const v of message.appendExecutedActions) {
        ExecutedAction.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(58).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(66).fork()).ldelim();
    }
    if (message.executorId !== undefined && message.executorId !== "") {
      writer.uint32(74).string(message.executorId);
    }
    if (message.connectionId !== undefined && message.connectionId !== "") {
      writer.uint32(82).string(message.connectionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWorkflowTaskRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateWorkflowTaskRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.taskId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.executedActions!.push(ExecutedAction.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.errorMessage = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.appendExecutedActions!.push(ExecutedAction.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.executorId = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.connectionId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateWorkflowTaskRequest {
    return {
      $type: UpdateWorkflowTaskRequest.$type,
      taskId: isSet(object.taskId) ? globalThis.String(object.taskId) : "",
      status: isSet(object.status) ? workflowTaskStatusFromJSON(object.status) : 0,
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      executedActions: globalThis.Array.isArray(object?.executedActions)
        ? object.executedActions.map((e: any) => ExecutedAction.fromJSON(e))
        : [],
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : "",
      appendExecutedActions: globalThis.Array.isArray(object?.appendExecutedActions)
        ? object.appendExecutedActions.map((e: any) => ExecutedAction.fromJSON(e))
        : [],
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
      executorId: isSet(object.executorId) ? globalThis.String(object.executorId) : "",
      connectionId: isSet(object.connectionId) ? globalThis.String(object.connectionId) : "",
    };
  },

  toJSON(message: UpdateWorkflowTaskRequest): unknown {
    const obj: any = {};
    if (message.taskId !== undefined && message.taskId !== "") {
      obj.taskId = message.taskId;
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = workflowTaskStatusToJSON(message.status);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.executedActions?.length) {
      obj.executedActions = message.executedActions.map((e) => ExecutedAction.toJSON(e));
    }
    if (message.errorMessage !== undefined && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    if (message.appendExecutedActions?.length) {
      obj.appendExecutedActions = message.appendExecutedActions.map((e) => ExecutedAction.toJSON(e));
    }
    if (message.startTime !== undefined) {
      obj.startTime = message.startTime.toISOString();
    }
    if (message.endTime !== undefined) {
      obj.endTime = message.endTime.toISOString();
    }
    if (message.executorId !== undefined && message.executorId !== "") {
      obj.executorId = message.executorId;
    }
    if (message.connectionId !== undefined && message.connectionId !== "") {
      obj.connectionId = message.connectionId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateWorkflowTaskRequest>, I>>(base?: I): UpdateWorkflowTaskRequest {
    return UpdateWorkflowTaskRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateWorkflowTaskRequest>, I>>(object: I): UpdateWorkflowTaskRequest {
    const message = createBaseUpdateWorkflowTaskRequest();
    message.taskId = object.taskId ?? "";
    message.status = object.status ?? 0;
    message.orgId = object.orgId ?? "";
    message.executedActions = object.executedActions?.map((e) => ExecutedAction.fromPartial(e)) || [];
    message.errorMessage = object.errorMessage ?? "";
    message.appendExecutedActions = object.appendExecutedActions?.map((e) => ExecutedAction.fromPartial(e)) || [];
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    message.executorId = object.executorId ?? "";
    message.connectionId = object.connectionId ?? "";
    return message;
  },
};

messageTypeRegistry.set(UpdateWorkflowTaskRequest.$type, UpdateWorkflowTaskRequest);

function createBaseListWorkflowTasksRequest(): ListWorkflowTasksRequest {
  return {
    $type: "pb.v1alpha1.ListWorkflowTasksRequest",
    workflowId: "",
    pageSize: 0,
    pageToken: "",
    orgId: "",
    statuses: [],
    userIds: [],
    variableSearch: "",
    parentTaskId: "",
    workflowIds: [],
    pageNumber: 0,
    filter: undefined,
    sort: [],
  };
}

export const ListWorkflowTasksRequest = {
  $type: "pb.v1alpha1.ListWorkflowTasksRequest" as const,

  encode(message: ListWorkflowTasksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(10).string(message.workflowId);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      writer.uint32(26).string(message.pageToken);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(34).string(message.orgId);
    }
    if (message.statuses !== undefined && message.statuses.length !== 0) {
      writer.uint32(42).fork();
      for (const v of message.statuses) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.userIds !== undefined && message.userIds.length !== 0) {
      for (const v of message.userIds) {
        writer.uint32(50).string(v!);
      }
    }
    if (message.variableSearch !== undefined && message.variableSearch !== "") {
      writer.uint32(58).string(message.variableSearch);
    }
    if (message.parentTaskId !== undefined && message.parentTaskId !== "") {
      writer.uint32(66).string(message.parentTaskId);
    }
    if (message.workflowIds !== undefined && message.workflowIds.length !== 0) {
      for (const v of message.workflowIds) {
        writer.uint32(74).string(v!);
      }
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(88).int32(message.pageNumber);
    }
    if (message.filter !== undefined) {
      ListWorkflowTasksRequestFilter.encode(message.filter, writer.uint32(98).fork()).ldelim();
    }
    if (message.sort !== undefined && message.sort.length !== 0) {
      for (const v of message.sort) {
        SortField.encode(v!, writer.uint32(106).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowTasksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowTasksRequest();
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
          if (tag !== 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pageToken = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 5:
          if (tag === 40) {
            message.statuses!.push(reader.int32() as any);

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.statuses!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.userIds!.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.variableSearch = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.parentTaskId = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.workflowIds!.push(reader.string());
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.pageNumber = reader.int32();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.filter = ListWorkflowTasksRequestFilter.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
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

  fromJSON(object: any): ListWorkflowTasksRequest {
    return {
      $type: ListWorkflowTasksRequest.$type,
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      statuses: globalThis.Array.isArray(object?.statuses)
        ? object.statuses.map((e: any) => workflowTaskStatusFromJSON(e))
        : [],
      userIds: globalThis.Array.isArray(object?.userIds) ? object.userIds.map((e: any) => globalThis.String(e)) : [],
      variableSearch: isSet(object.variableSearch) ? globalThis.String(object.variableSearch) : "",
      parentTaskId: isSet(object.parentTaskId) ? globalThis.String(object.parentTaskId) : "",
      workflowIds: globalThis.Array.isArray(object?.workflowIds)
        ? object.workflowIds.map((e: any) => globalThis.String(e))
        : [],
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      filter: isSet(object.filter) ? ListWorkflowTasksRequestFilter.fromJSON(object.filter) : undefined,
      sort: globalThis.Array.isArray(object?.sort) ? object.sort.map((e: any) => SortField.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListWorkflowTasksRequest): unknown {
    const obj: any = {};
    if (message.workflowId !== undefined && message.workflowId !== "") {
      obj.workflowId = message.workflowId;
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      obj.pageToken = message.pageToken;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.statuses?.length) {
      obj.statuses = message.statuses.map((e) => workflowTaskStatusToJSON(e));
    }
    if (message.userIds?.length) {
      obj.userIds = message.userIds;
    }
    if (message.variableSearch !== undefined && message.variableSearch !== "") {
      obj.variableSearch = message.variableSearch;
    }
    if (message.parentTaskId !== undefined && message.parentTaskId !== "") {
      obj.parentTaskId = message.parentTaskId;
    }
    if (message.workflowIds?.length) {
      obj.workflowIds = message.workflowIds;
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.filter !== undefined) {
      obj.filter = ListWorkflowTasksRequestFilter.toJSON(message.filter);
    }
    if (message.sort?.length) {
      obj.sort = message.sort.map((e) => SortField.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowTasksRequest>, I>>(base?: I): ListWorkflowTasksRequest {
    return ListWorkflowTasksRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowTasksRequest>, I>>(object: I): ListWorkflowTasksRequest {
    const message = createBaseListWorkflowTasksRequest();
    message.workflowId = object.workflowId ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    message.orgId = object.orgId ?? "";
    message.statuses = object.statuses?.map((e) => e) || [];
    message.userIds = object.userIds?.map((e) => e) || [];
    message.variableSearch = object.variableSearch ?? "";
    message.parentTaskId = object.parentTaskId ?? "";
    message.workflowIds = object.workflowIds?.map((e) => e) || [];
    message.pageNumber = object.pageNumber ?? 0;
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? ListWorkflowTasksRequestFilter.fromPartial(object.filter)
      : undefined;
    message.sort = object.sort?.map((e) => SortField.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowTasksRequest.$type, ListWorkflowTasksRequest);

function createBaseListWorkflowTasksRequestFilter(): ListWorkflowTasksRequestFilter {
  return {
    $type: "pb.v1alpha1.ListWorkflowTasksRequestFilter",
    variablePrefix: "",
    statuses: [],
    workflowResourceNames: [],
    userIds: [],
    lastUpdateTimeLt: 0,
    lastUpdateTimeGt: 0,
  };
}

export const ListWorkflowTasksRequestFilter = {
  $type: "pb.v1alpha1.ListWorkflowTasksRequestFilter" as const,

  encode(message: ListWorkflowTasksRequestFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.variablePrefix !== undefined && message.variablePrefix !== "") {
      writer.uint32(10).string(message.variablePrefix);
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
    if (message.userIds !== undefined && message.userIds.length !== 0) {
      for (const v of message.userIds) {
        writer.uint32(34).string(v!);
      }
    }
    if (message.lastUpdateTimeLt !== undefined && message.lastUpdateTimeLt !== 0) {
      writer.uint32(40).int64(message.lastUpdateTimeLt);
    }
    if (message.lastUpdateTimeGt !== undefined && message.lastUpdateTimeGt !== 0) {
      writer.uint32(48).int64(message.lastUpdateTimeGt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowTasksRequestFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowTasksRequestFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.variablePrefix = reader.string();
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
          if (tag !== 34) {
            break;
          }

          message.userIds!.push(reader.string());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.lastUpdateTimeLt = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
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

  fromJSON(object: any): ListWorkflowTasksRequestFilter {
    return {
      $type: ListWorkflowTasksRequestFilter.$type,
      variablePrefix: isSet(object.variablePrefix) ? globalThis.String(object.variablePrefix) : "",
      statuses: globalThis.Array.isArray(object?.statuses)
        ? object.statuses.map((e: any) => workflowTaskStatusFromJSON(e))
        : [],
      workflowResourceNames: globalThis.Array.isArray(object?.workflowResourceNames)
        ? object.workflowResourceNames.map((e: any) => globalThis.String(e))
        : [],
      userIds: globalThis.Array.isArray(object?.userIds) ? object.userIds.map((e: any) => globalThis.String(e)) : [],
      lastUpdateTimeLt: isSet(object.lastUpdateTimeLt) ? globalThis.Number(object.lastUpdateTimeLt) : 0,
      lastUpdateTimeGt: isSet(object.lastUpdateTimeGt) ? globalThis.Number(object.lastUpdateTimeGt) : 0,
    };
  },

  toJSON(message: ListWorkflowTasksRequestFilter): unknown {
    const obj: any = {};
    if (message.variablePrefix !== undefined && message.variablePrefix !== "") {
      obj.variablePrefix = message.variablePrefix;
    }
    if (message.statuses?.length) {
      obj.statuses = message.statuses.map((e) => workflowTaskStatusToJSON(e));
    }
    if (message.workflowResourceNames?.length) {
      obj.workflowResourceNames = message.workflowResourceNames;
    }
    if (message.userIds?.length) {
      obj.userIds = message.userIds;
    }
    if (message.lastUpdateTimeLt !== undefined && message.lastUpdateTimeLt !== 0) {
      obj.lastUpdateTimeLt = Math.round(message.lastUpdateTimeLt);
    }
    if (message.lastUpdateTimeGt !== undefined && message.lastUpdateTimeGt !== 0) {
      obj.lastUpdateTimeGt = Math.round(message.lastUpdateTimeGt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowTasksRequestFilter>, I>>(base?: I): ListWorkflowTasksRequestFilter {
    return ListWorkflowTasksRequestFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowTasksRequestFilter>, I>>(
    object: I,
  ): ListWorkflowTasksRequestFilter {
    const message = createBaseListWorkflowTasksRequestFilter();
    message.variablePrefix = object.variablePrefix ?? "";
    message.statuses = object.statuses?.map((e) => e) || [];
    message.workflowResourceNames = object.workflowResourceNames?.map((e) => e) || [];
    message.userIds = object.userIds?.map((e) => e) || [];
    message.lastUpdateTimeLt = object.lastUpdateTimeLt ?? 0;
    message.lastUpdateTimeGt = object.lastUpdateTimeGt ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowTasksRequestFilter.$type, ListWorkflowTasksRequestFilter);

function createBaseListWorkflowTasksResponse(): ListWorkflowTasksResponse {
  return { $type: "pb.v1alpha1.ListWorkflowTasksResponse", tasks: [], nextPageToken: "", totalSize: 0 };
}

export const ListWorkflowTasksResponse = {
  $type: "pb.v1alpha1.ListWorkflowTasksResponse" as const,

  encode(message: ListWorkflowTasksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tasks !== undefined && message.tasks.length !== 0) {
      for (const v of message.tasks) {
        WorkflowTask.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      writer.uint32(18).string(message.nextPageToken);
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(24).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowTasksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowTasksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tasks!.push(WorkflowTask.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nextPageToken = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
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

  fromJSON(object: any): ListWorkflowTasksResponse {
    return {
      $type: ListWorkflowTasksResponse.$type,
      tasks: globalThis.Array.isArray(object?.tasks) ? object.tasks.map((e: any) => WorkflowTask.fromJSON(e)) : [],
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListWorkflowTasksResponse): unknown {
    const obj: any = {};
    if (message.tasks?.length) {
      obj.tasks = message.tasks.map((e) => WorkflowTask.toJSON(e));
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowTasksResponse>, I>>(base?: I): ListWorkflowTasksResponse {
    return ListWorkflowTasksResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowTasksResponse>, I>>(object: I): ListWorkflowTasksResponse {
    const message = createBaseListWorkflowTasksResponse();
    message.tasks = object.tasks?.map((e) => WorkflowTask.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowTasksResponse.$type, ListWorkflowTasksResponse);

function createBaseGetActionableElementsRequest(): GetActionableElementsRequest {
  return {
    $type: "pb.v1alpha1.GetActionableElementsRequest",
    workflowId: "",
    orgId: "",
    actionUuid: "",
    elementTypes: [],
    processId: "",
  };
}

export const GetActionableElementsRequest = {
  $type: "pb.v1alpha1.GetActionableElementsRequest" as const,

  encode(message: GetActionableElementsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(10).string(message.workflowId);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    if (message.actionUuid !== undefined && message.actionUuid !== "") {
      writer.uint32(26).string(message.actionUuid);
    }
    if (message.elementTypes !== undefined && message.elementTypes.length !== 0) {
      writer.uint32(34).fork();
      for (const v of message.elementTypes) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.processId !== undefined && message.processId !== "") {
      writer.uint32(42).string(message.processId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetActionableElementsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetActionableElementsRequest();
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

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.actionUuid = reader.string();
          continue;
        case 4:
          if (tag === 32) {
            message.elementTypes!.push(reader.int32() as any);

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.elementTypes!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 5:
          if (tag !== 42) {
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

  fromJSON(object: any): GetActionableElementsRequest {
    return {
      $type: GetActionableElementsRequest.$type,
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      actionUuid: isSet(object.actionUuid) ? globalThis.String(object.actionUuid) : "",
      elementTypes: globalThis.Array.isArray(object?.elementTypes)
        ? object.elementTypes.map((e: any) => controlTypeFromJSON(e))
        : [],
      processId: isSet(object.processId) ? globalThis.String(object.processId) : "",
    };
  },

  toJSON(message: GetActionableElementsRequest): unknown {
    const obj: any = {};
    if (message.workflowId !== undefined && message.workflowId !== "") {
      obj.workflowId = message.workflowId;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.actionUuid !== undefined && message.actionUuid !== "") {
      obj.actionUuid = message.actionUuid;
    }
    if (message.elementTypes?.length) {
      obj.elementTypes = message.elementTypes.map((e) => controlTypeToJSON(e));
    }
    if (message.processId !== undefined && message.processId !== "") {
      obj.processId = message.processId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetActionableElementsRequest>, I>>(base?: I): GetActionableElementsRequest {
    return GetActionableElementsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetActionableElementsRequest>, I>>(object: I): GetActionableElementsRequest {
    const message = createBaseGetActionableElementsRequest();
    message.workflowId = object.workflowId ?? "";
    message.orgId = object.orgId ?? "";
    message.actionUuid = object.actionUuid ?? "";
    message.elementTypes = object.elementTypes?.map((e) => e) || [];
    message.processId = object.processId ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetActionableElementsRequest.$type, GetActionableElementsRequest);

function createBaseGetActionableElementsResponse(): GetActionableElementsResponse {
  return { $type: "pb.v1alpha1.GetActionableElementsResponse", elements: [] };
}

export const GetActionableElementsResponse = {
  $type: "pb.v1alpha1.GetActionableElementsResponse" as const,

  encode(message: GetActionableElementsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.elements !== undefined && message.elements.length !== 0) {
      for (const v of message.elements) {
        Element.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetActionableElementsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetActionableElementsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.elements!.push(Element.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetActionableElementsResponse {
    return {
      $type: GetActionableElementsResponse.$type,
      elements: globalThis.Array.isArray(object?.elements) ? object.elements.map((e: any) => Element.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetActionableElementsResponse): unknown {
    const obj: any = {};
    if (message.elements?.length) {
      obj.elements = message.elements.map((e) => Element.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetActionableElementsResponse>, I>>(base?: I): GetActionableElementsResponse {
    return GetActionableElementsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetActionableElementsResponse>, I>>(
    object: I,
  ): GetActionableElementsResponse {
    const message = createBaseGetActionableElementsResponse();
    message.elements = object.elements?.map((e) => Element.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetActionableElementsResponse.$type, GetActionableElementsResponse);

function createBaseSendEmailForReviewRequest(): SendEmailForReviewRequest {
  return { $type: "pb.v1alpha1.SendEmailForReviewRequest", workflows: [] };
}

export const SendEmailForReviewRequest = {
  $type: "pb.v1alpha1.SendEmailForReviewRequest" as const,

  encode(message: SendEmailForReviewRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflows !== undefined && message.workflows.length !== 0) {
      for (const v of message.workflows) {
        SendEmailForReviewRequestWorkflowInfo.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendEmailForReviewRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendEmailForReviewRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflows!.push(SendEmailForReviewRequestWorkflowInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendEmailForReviewRequest {
    return {
      $type: SendEmailForReviewRequest.$type,
      workflows: globalThis.Array.isArray(object?.workflows)
        ? object.workflows.map((e: any) => SendEmailForReviewRequestWorkflowInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SendEmailForReviewRequest): unknown {
    const obj: any = {};
    if (message.workflows?.length) {
      obj.workflows = message.workflows.map((e) => SendEmailForReviewRequestWorkflowInfo.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendEmailForReviewRequest>, I>>(base?: I): SendEmailForReviewRequest {
    return SendEmailForReviewRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendEmailForReviewRequest>, I>>(object: I): SendEmailForReviewRequest {
    const message = createBaseSendEmailForReviewRequest();
    message.workflows = object.workflows?.map((e) => SendEmailForReviewRequestWorkflowInfo.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(SendEmailForReviewRequest.$type, SendEmailForReviewRequest);

function createBaseSendEmailForReviewRequestWorkflowInfo(): SendEmailForReviewRequestWorkflowInfo {
  return { $type: "pb.v1alpha1.SendEmailForReviewRequest.WorkflowInfo", workflowName: "", numTasksForReview: 0 };
}

export const SendEmailForReviewRequestWorkflowInfo = {
  $type: "pb.v1alpha1.SendEmailForReviewRequest.WorkflowInfo" as const,

  encode(message: SendEmailForReviewRequestWorkflowInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowName !== undefined && message.workflowName !== "") {
      writer.uint32(10).string(message.workflowName);
    }
    if (message.numTasksForReview !== undefined && message.numTasksForReview !== 0) {
      writer.uint32(16).int32(message.numTasksForReview);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendEmailForReviewRequestWorkflowInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendEmailForReviewRequestWorkflowInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflowName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numTasksForReview = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendEmailForReviewRequestWorkflowInfo {
    return {
      $type: SendEmailForReviewRequestWorkflowInfo.$type,
      workflowName: isSet(object.workflowName) ? globalThis.String(object.workflowName) : "",
      numTasksForReview: isSet(object.numTasksForReview) ? globalThis.Number(object.numTasksForReview) : 0,
    };
  },

  toJSON(message: SendEmailForReviewRequestWorkflowInfo): unknown {
    const obj: any = {};
    if (message.workflowName !== undefined && message.workflowName !== "") {
      obj.workflowName = message.workflowName;
    }
    if (message.numTasksForReview !== undefined && message.numTasksForReview !== 0) {
      obj.numTasksForReview = Math.round(message.numTasksForReview);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendEmailForReviewRequestWorkflowInfo>, I>>(
    base?: I,
  ): SendEmailForReviewRequestWorkflowInfo {
    return SendEmailForReviewRequestWorkflowInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendEmailForReviewRequestWorkflowInfo>, I>>(
    object: I,
  ): SendEmailForReviewRequestWorkflowInfo {
    const message = createBaseSendEmailForReviewRequestWorkflowInfo();
    message.workflowName = object.workflowName ?? "";
    message.numTasksForReview = object.numTasksForReview ?? 0;
    return message;
  },
};

messageTypeRegistry.set(SendEmailForReviewRequestWorkflowInfo.$type, SendEmailForReviewRequestWorkflowInfo);

function createBaseGetWorkflowTemplateRequest(): GetWorkflowTemplateRequest {
  return { $type: "pb.v1alpha1.GetWorkflowTemplateRequest", templateId: "", orgId: "" };
}

export const GetWorkflowTemplateRequest = {
  $type: "pb.v1alpha1.GetWorkflowTemplateRequest" as const,

  encode(message: GetWorkflowTemplateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.templateId !== undefined && message.templateId !== "") {
      writer.uint32(10).string(message.templateId);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWorkflowTemplateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetWorkflowTemplateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.templateId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): GetWorkflowTemplateRequest {
    return {
      $type: GetWorkflowTemplateRequest.$type,
      templateId: isSet(object.templateId) ? globalThis.String(object.templateId) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
    };
  },

  toJSON(message: GetWorkflowTemplateRequest): unknown {
    const obj: any = {};
    if (message.templateId !== undefined && message.templateId !== "") {
      obj.templateId = message.templateId;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetWorkflowTemplateRequest>, I>>(base?: I): GetWorkflowTemplateRequest {
    return GetWorkflowTemplateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetWorkflowTemplateRequest>, I>>(object: I): GetWorkflowTemplateRequest {
    const message = createBaseGetWorkflowTemplateRequest();
    message.templateId = object.templateId ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetWorkflowTemplateRequest.$type, GetWorkflowTemplateRequest);

function createBaseSaveWorkflowTemplateRequest(): SaveWorkflowTemplateRequest {
  return { $type: "pb.v1alpha1.SaveWorkflowTemplateRequest", templateId: "", orgId: "", workflowTemplate: undefined };
}

export const SaveWorkflowTemplateRequest = {
  $type: "pb.v1alpha1.SaveWorkflowTemplateRequest" as const,

  encode(message: SaveWorkflowTemplateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.templateId !== undefined && message.templateId !== "") {
      writer.uint32(10).string(message.templateId);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    if (message.workflowTemplate !== undefined) {
      Workflow.encode(message.workflowTemplate, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SaveWorkflowTemplateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSaveWorkflowTemplateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.templateId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.workflowTemplate = Workflow.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SaveWorkflowTemplateRequest {
    return {
      $type: SaveWorkflowTemplateRequest.$type,
      templateId: isSet(object.templateId) ? globalThis.String(object.templateId) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      workflowTemplate: isSet(object.workflowTemplate) ? Workflow.fromJSON(object.workflowTemplate) : undefined,
    };
  },

  toJSON(message: SaveWorkflowTemplateRequest): unknown {
    const obj: any = {};
    if (message.templateId !== undefined && message.templateId !== "") {
      obj.templateId = message.templateId;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.workflowTemplate !== undefined) {
      obj.workflowTemplate = Workflow.toJSON(message.workflowTemplate);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SaveWorkflowTemplateRequest>, I>>(base?: I): SaveWorkflowTemplateRequest {
    return SaveWorkflowTemplateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SaveWorkflowTemplateRequest>, I>>(object: I): SaveWorkflowTemplateRequest {
    const message = createBaseSaveWorkflowTemplateRequest();
    message.templateId = object.templateId ?? "";
    message.orgId = object.orgId ?? "";
    message.workflowTemplate = (object.workflowTemplate !== undefined && object.workflowTemplate !== null)
      ? Workflow.fromPartial(object.workflowTemplate)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SaveWorkflowTemplateRequest.$type, SaveWorkflowTemplateRequest);

function createBaseListWorkflowTemplatesRequest(): ListWorkflowTemplatesRequest {
  return { $type: "pb.v1alpha1.ListWorkflowTemplatesRequest", orgId: "", pageSize: 0, pageNumber: 0 };
}

export const ListWorkflowTemplatesRequest = {
  $type: "pb.v1alpha1.ListWorkflowTemplatesRequest" as const,

  encode(message: ListWorkflowTemplatesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(24).int32(message.pageNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowTemplatesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowTemplatesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListWorkflowTemplatesRequest {
    return {
      $type: ListWorkflowTemplatesRequest.$type,
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
    };
  },

  toJSON(message: ListWorkflowTemplatesRequest): unknown {
    const obj: any = {};
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowTemplatesRequest>, I>>(base?: I): ListWorkflowTemplatesRequest {
    return ListWorkflowTemplatesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowTemplatesRequest>, I>>(object: I): ListWorkflowTemplatesRequest {
    const message = createBaseListWorkflowTemplatesRequest();
    message.orgId = object.orgId ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowTemplatesRequest.$type, ListWorkflowTemplatesRequest);

function createBaseListWorkflowTemplatesResponse(): ListWorkflowTemplatesResponse {
  return { $type: "pb.v1alpha1.ListWorkflowTemplatesResponse", workflows: [], totalSize: 0 };
}

export const ListWorkflowTemplatesResponse = {
  $type: "pb.v1alpha1.ListWorkflowTemplatesResponse" as const,

  encode(message: ListWorkflowTemplatesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflows !== undefined && message.workflows.length !== 0) {
      for (const v of message.workflows) {
        Workflow.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(16).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowTemplatesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowTemplatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflows!.push(Workflow.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListWorkflowTemplatesResponse {
    return {
      $type: ListWorkflowTemplatesResponse.$type,
      workflows: globalThis.Array.isArray(object?.workflows)
        ? object.workflows.map((e: any) => Workflow.fromJSON(e))
        : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListWorkflowTemplatesResponse): unknown {
    const obj: any = {};
    if (message.workflows?.length) {
      obj.workflows = message.workflows.map((e) => Workflow.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowTemplatesResponse>, I>>(base?: I): ListWorkflowTemplatesResponse {
    return ListWorkflowTemplatesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowTemplatesResponse>, I>>(
    object: I,
  ): ListWorkflowTemplatesResponse {
    const message = createBaseListWorkflowTemplatesResponse();
    message.workflows = object.workflows?.map((e) => Workflow.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowTemplatesResponse.$type, ListWorkflowTemplatesResponse);

function createBaseDeleteWorkflowTemplateRequest(): DeleteWorkflowTemplateRequest {
  return { $type: "pb.v1alpha1.DeleteWorkflowTemplateRequest", templateId: "", orgId: "" };
}

export const DeleteWorkflowTemplateRequest = {
  $type: "pb.v1alpha1.DeleteWorkflowTemplateRequest" as const,

  encode(message: DeleteWorkflowTemplateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.templateId !== undefined && message.templateId !== "") {
      writer.uint32(10).string(message.templateId);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWorkflowTemplateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteWorkflowTemplateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.templateId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): DeleteWorkflowTemplateRequest {
    return {
      $type: DeleteWorkflowTemplateRequest.$type,
      templateId: isSet(object.templateId) ? globalThis.String(object.templateId) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
    };
  },

  toJSON(message: DeleteWorkflowTemplateRequest): unknown {
    const obj: any = {};
    if (message.templateId !== undefined && message.templateId !== "") {
      obj.templateId = message.templateId;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteWorkflowTemplateRequest>, I>>(base?: I): DeleteWorkflowTemplateRequest {
    return DeleteWorkflowTemplateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteWorkflowTemplateRequest>, I>>(
    object: I,
  ): DeleteWorkflowTemplateRequest {
    const message = createBaseDeleteWorkflowTemplateRequest();
    message.templateId = object.templateId ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteWorkflowTemplateRequest.$type, DeleteWorkflowTemplateRequest);

function createBaseDeleteWorkflowTemplateResponse(): DeleteWorkflowTemplateResponse {
  return { $type: "pb.v1alpha1.DeleteWorkflowTemplateResponse" };
}

export const DeleteWorkflowTemplateResponse = {
  $type: "pb.v1alpha1.DeleteWorkflowTemplateResponse" as const,

  encode(_: DeleteWorkflowTemplateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWorkflowTemplateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteWorkflowTemplateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): DeleteWorkflowTemplateResponse {
    return { $type: DeleteWorkflowTemplateResponse.$type };
  },

  toJSON(_: DeleteWorkflowTemplateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteWorkflowTemplateResponse>, I>>(base?: I): DeleteWorkflowTemplateResponse {
    return DeleteWorkflowTemplateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteWorkflowTemplateResponse>, I>>(_: I): DeleteWorkflowTemplateResponse {
    const message = createBaseDeleteWorkflowTemplateResponse();
    return message;
  },
};

messageTypeRegistry.set(DeleteWorkflowTemplateResponse.$type, DeleteWorkflowTemplateResponse);

function createBaseSaveUserFeedbackRequest(): SaveUserFeedbackRequest {
  return { $type: "pb.v1alpha1.SaveUserFeedbackRequest", application: "", entityId: "", metadata: {} };
}

export const SaveUserFeedbackRequest = {
  $type: "pb.v1alpha1.SaveUserFeedbackRequest" as const,

  encode(message: SaveUserFeedbackRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.application !== undefined && message.application !== "") {
      writer.uint32(10).string(message.application);
    }
    if (message.entityId !== undefined && message.entityId !== "") {
      writer.uint32(18).string(message.entityId);
    }
    Object.entries(message.metadata || {}).forEach(([key, value]) => {
      SaveUserFeedbackRequestMetadataEntry.encode({
        $type: "pb.v1alpha1.SaveUserFeedbackRequest.MetadataEntry",
        key: key as any,
        value,
      }, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SaveUserFeedbackRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSaveUserFeedbackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.application = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.entityId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = SaveUserFeedbackRequestMetadataEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.metadata![entry3.key] = entry3.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SaveUserFeedbackRequest {
    return {
      $type: SaveUserFeedbackRequest.$type,
      application: isSet(object.application) ? globalThis.String(object.application) : "",
      entityId: isSet(object.entityId) ? globalThis.String(object.entityId) : "",
      metadata: isObject(object.metadata)
        ? Object.entries(object.metadata).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: SaveUserFeedbackRequest): unknown {
    const obj: any = {};
    if (message.application !== undefined && message.application !== "") {
      obj.application = message.application;
    }
    if (message.entityId !== undefined && message.entityId !== "") {
      obj.entityId = message.entityId;
    }
    if (message.metadata) {
      const entries = Object.entries(message.metadata);
      if (entries.length > 0) {
        obj.metadata = {};
        entries.forEach(([k, v]) => {
          obj.metadata[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SaveUserFeedbackRequest>, I>>(base?: I): SaveUserFeedbackRequest {
    return SaveUserFeedbackRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SaveUserFeedbackRequest>, I>>(object: I): SaveUserFeedbackRequest {
    const message = createBaseSaveUserFeedbackRequest();
    message.application = object.application ?? "";
    message.entityId = object.entityId ?? "";
    message.metadata = Object.entries(object.metadata ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

messageTypeRegistry.set(SaveUserFeedbackRequest.$type, SaveUserFeedbackRequest);

function createBaseSaveUserFeedbackRequestMetadataEntry(): SaveUserFeedbackRequestMetadataEntry {
  return { $type: "pb.v1alpha1.SaveUserFeedbackRequest.MetadataEntry", key: "", value: "" };
}

export const SaveUserFeedbackRequestMetadataEntry = {
  $type: "pb.v1alpha1.SaveUserFeedbackRequest.MetadataEntry" as const,

  encode(message: SaveUserFeedbackRequestMetadataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SaveUserFeedbackRequestMetadataEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSaveUserFeedbackRequestMetadataEntry();
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

  fromJSON(object: any): SaveUserFeedbackRequestMetadataEntry {
    return {
      $type: SaveUserFeedbackRequestMetadataEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: SaveUserFeedbackRequestMetadataEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SaveUserFeedbackRequestMetadataEntry>, I>>(
    base?: I,
  ): SaveUserFeedbackRequestMetadataEntry {
    return SaveUserFeedbackRequestMetadataEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SaveUserFeedbackRequestMetadataEntry>, I>>(
    object: I,
  ): SaveUserFeedbackRequestMetadataEntry {
    const message = createBaseSaveUserFeedbackRequestMetadataEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

messageTypeRegistry.set(SaveUserFeedbackRequestMetadataEntry.$type, SaveUserFeedbackRequestMetadataEntry);

function createBaseSaveUserFeedbackResponse(): SaveUserFeedbackResponse {
  return { $type: "pb.v1alpha1.SaveUserFeedbackResponse" };
}

export const SaveUserFeedbackResponse = {
  $type: "pb.v1alpha1.SaveUserFeedbackResponse" as const,

  encode(_: SaveUserFeedbackResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SaveUserFeedbackResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSaveUserFeedbackResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): SaveUserFeedbackResponse {
    return { $type: SaveUserFeedbackResponse.$type };
  },

  toJSON(_: SaveUserFeedbackResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SaveUserFeedbackResponse>, I>>(base?: I): SaveUserFeedbackResponse {
    return SaveUserFeedbackResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SaveUserFeedbackResponse>, I>>(_: I): SaveUserFeedbackResponse {
    const message = createBaseSaveUserFeedbackResponse();
    return message;
  },
};

messageTypeRegistry.set(SaveUserFeedbackResponse.$type, SaveUserFeedbackResponse);

function createBaseSendEmailRequest(): SendEmailRequest {
  return { $type: "pb.v1alpha1.SendEmailRequest", recipients: [], subject: "", body: undefined, attachments: [] };
}

export const SendEmailRequest = {
  $type: "pb.v1alpha1.SendEmailRequest" as const,

  encode(message: SendEmailRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipients !== undefined && message.recipients.length !== 0) {
      for (const v of message.recipients) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.subject !== undefined && message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.body !== undefined) {
      SendEmailRequestBody.encode(message.body, writer.uint32(26).fork()).ldelim();
    }
    if (message.attachments !== undefined && message.attachments.length !== 0) {
      for (const v of message.attachments) {
        SendEmailRequestAttachment.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendEmailRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendEmailRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.recipients!.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.body = SendEmailRequestBody.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.attachments!.push(SendEmailRequestAttachment.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendEmailRequest {
    return {
      $type: SendEmailRequest.$type,
      recipients: globalThis.Array.isArray(object?.recipients)
        ? object.recipients.map((e: any) => globalThis.String(e))
        : [],
      subject: isSet(object.subject) ? globalThis.String(object.subject) : "",
      body: isSet(object.body) ? SendEmailRequestBody.fromJSON(object.body) : undefined,
      attachments: globalThis.Array.isArray(object?.attachments)
        ? object.attachments.map((e: any) => SendEmailRequestAttachment.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SendEmailRequest): unknown {
    const obj: any = {};
    if (message.recipients?.length) {
      obj.recipients = message.recipients;
    }
    if (message.subject !== undefined && message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.body !== undefined) {
      obj.body = SendEmailRequestBody.toJSON(message.body);
    }
    if (message.attachments?.length) {
      obj.attachments = message.attachments.map((e) => SendEmailRequestAttachment.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendEmailRequest>, I>>(base?: I): SendEmailRequest {
    return SendEmailRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendEmailRequest>, I>>(object: I): SendEmailRequest {
    const message = createBaseSendEmailRequest();
    message.recipients = object.recipients?.map((e) => e) || [];
    message.subject = object.subject ?? "";
    message.body = (object.body !== undefined && object.body !== null)
      ? SendEmailRequestBody.fromPartial(object.body)
      : undefined;
    message.attachments = object.attachments?.map((e) => SendEmailRequestAttachment.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(SendEmailRequest.$type, SendEmailRequest);

function createBaseSendEmailRequestAttachment(): SendEmailRequestAttachment {
  return { $type: "pb.v1alpha1.SendEmailRequest.Attachment", filename: "", content: new Uint8Array(0), mimeType: "" };
}

export const SendEmailRequestAttachment = {
  $type: "pb.v1alpha1.SendEmailRequest.Attachment" as const,

  encode(message: SendEmailRequestAttachment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filename !== undefined && message.filename !== "") {
      writer.uint32(10).string(message.filename);
    }
    if (message.content !== undefined && message.content.length !== 0) {
      writer.uint32(18).bytes(message.content);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      writer.uint32(26).string(message.mimeType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendEmailRequestAttachment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendEmailRequestAttachment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filename = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.content = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.mimeType = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendEmailRequestAttachment {
    return {
      $type: SendEmailRequestAttachment.$type,
      filename: isSet(object.filename) ? globalThis.String(object.filename) : "",
      content: isSet(object.content) ? bytesFromBase64(object.content) : new Uint8Array(0),
      mimeType: isSet(object.mimeType) ? globalThis.String(object.mimeType) : "",
    };
  },

  toJSON(message: SendEmailRequestAttachment): unknown {
    const obj: any = {};
    if (message.filename !== undefined && message.filename !== "") {
      obj.filename = message.filename;
    }
    if (message.content !== undefined && message.content.length !== 0) {
      obj.content = base64FromBytes(message.content);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      obj.mimeType = message.mimeType;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendEmailRequestAttachment>, I>>(base?: I): SendEmailRequestAttachment {
    return SendEmailRequestAttachment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendEmailRequestAttachment>, I>>(object: I): SendEmailRequestAttachment {
    const message = createBaseSendEmailRequestAttachment();
    message.filename = object.filename ?? "";
    message.content = object.content ?? new Uint8Array(0);
    message.mimeType = object.mimeType ?? "";
    return message;
  },
};

messageTypeRegistry.set(SendEmailRequestAttachment.$type, SendEmailRequestAttachment);

function createBaseSendEmailRequestBody(): SendEmailRequestBody {
  return { $type: "pb.v1alpha1.SendEmailRequest.Body", plain: "", html: "" };
}

export const SendEmailRequestBody = {
  $type: "pb.v1alpha1.SendEmailRequest.Body" as const,

  encode(message: SendEmailRequestBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.plain !== undefined && message.plain !== "") {
      writer.uint32(10).string(message.plain);
    }
    if (message.html !== undefined && message.html !== "") {
      writer.uint32(18).string(message.html);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendEmailRequestBody {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendEmailRequestBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.plain = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.html = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendEmailRequestBody {
    return {
      $type: SendEmailRequestBody.$type,
      plain: isSet(object.plain) ? globalThis.String(object.plain) : "",
      html: isSet(object.html) ? globalThis.String(object.html) : "",
    };
  },

  toJSON(message: SendEmailRequestBody): unknown {
    const obj: any = {};
    if (message.plain !== undefined && message.plain !== "") {
      obj.plain = message.plain;
    }
    if (message.html !== undefined && message.html !== "") {
      obj.html = message.html;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendEmailRequestBody>, I>>(base?: I): SendEmailRequestBody {
    return SendEmailRequestBody.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendEmailRequestBody>, I>>(object: I): SendEmailRequestBody {
    const message = createBaseSendEmailRequestBody();
    message.plain = object.plain ?? "";
    message.html = object.html ?? "";
    return message;
  },
};

messageTypeRegistry.set(SendEmailRequestBody.$type, SendEmailRequestBody);

function createBaseSendEmailResponse(): SendEmailResponse {
  return { $type: "pb.v1alpha1.SendEmailResponse" };
}

export const SendEmailResponse = {
  $type: "pb.v1alpha1.SendEmailResponse" as const,

  encode(_: SendEmailResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendEmailResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendEmailResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): SendEmailResponse {
    return { $type: SendEmailResponse.$type };
  },

  toJSON(_: SendEmailResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SendEmailResponse>, I>>(base?: I): SendEmailResponse {
    return SendEmailResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendEmailResponse>, I>>(_: I): SendEmailResponse {
    const message = createBaseSendEmailResponse();
    return message;
  },
};

messageTypeRegistry.set(SendEmailResponse.$type, SendEmailResponse);

function createBaseCancelExecutionRequest(): CancelExecutionRequest {
  return { $type: "pb.v1alpha1.CancelExecutionRequest", executionId: "", orgId: "", cancelNestedExecution: false };
}

export const CancelExecutionRequest = {
  $type: "pb.v1alpha1.CancelExecutionRequest" as const,

  encode(message: CancelExecutionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.executionId !== undefined && message.executionId !== "") {
      writer.uint32(10).string(message.executionId);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    if (message.cancelNestedExecution !== undefined && message.cancelNestedExecution !== false) {
      writer.uint32(24).bool(message.cancelNestedExecution);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CancelExecutionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelExecutionRequest();
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

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.cancelNestedExecution = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CancelExecutionRequest {
    return {
      $type: CancelExecutionRequest.$type,
      executionId: isSet(object.executionId) ? globalThis.String(object.executionId) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      cancelNestedExecution: isSet(object.cancelNestedExecution)
        ? globalThis.Boolean(object.cancelNestedExecution)
        : false,
    };
  },

  toJSON(message: CancelExecutionRequest): unknown {
    const obj: any = {};
    if (message.executionId !== undefined && message.executionId !== "") {
      obj.executionId = message.executionId;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.cancelNestedExecution !== undefined && message.cancelNestedExecution !== false) {
      obj.cancelNestedExecution = message.cancelNestedExecution;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CancelExecutionRequest>, I>>(base?: I): CancelExecutionRequest {
    return CancelExecutionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CancelExecutionRequest>, I>>(object: I): CancelExecutionRequest {
    const message = createBaseCancelExecutionRequest();
    message.executionId = object.executionId ?? "";
    message.orgId = object.orgId ?? "";
    message.cancelNestedExecution = object.cancelNestedExecution ?? false;
    return message;
  },
};

messageTypeRegistry.set(CancelExecutionRequest.$type, CancelExecutionRequest);

function createBaseCancelExecutionResponse(): CancelExecutionResponse {
  return { $type: "pb.v1alpha1.CancelExecutionResponse" };
}

export const CancelExecutionResponse = {
  $type: "pb.v1alpha1.CancelExecutionResponse" as const,

  encode(_: CancelExecutionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CancelExecutionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelExecutionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): CancelExecutionResponse {
    return { $type: CancelExecutionResponse.$type };
  },

  toJSON(_: CancelExecutionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<CancelExecutionResponse>, I>>(base?: I): CancelExecutionResponse {
    return CancelExecutionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CancelExecutionResponse>, I>>(_: I): CancelExecutionResponse {
    const message = createBaseCancelExecutionResponse();
    return message;
  },
};

messageTypeRegistry.set(CancelExecutionResponse.$type, CancelExecutionResponse);

function createBaseSaveUserEventsRequest(): SaveUserEventsRequest {
  return { $type: "pb.v1alpha1.SaveUserEventsRequest", events: [] };
}

export const SaveUserEventsRequest = {
  $type: "pb.v1alpha1.SaveUserEventsRequest" as const,

  encode(message: SaveUserEventsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.events !== undefined && message.events.length !== 0) {
      for (const v of message.events) {
        UserEvent.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SaveUserEventsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSaveUserEventsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.events!.push(UserEvent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SaveUserEventsRequest {
    return {
      $type: SaveUserEventsRequest.$type,
      events: globalThis.Array.isArray(object?.events) ? object.events.map((e: any) => UserEvent.fromJSON(e)) : [],
    };
  },

  toJSON(message: SaveUserEventsRequest): unknown {
    const obj: any = {};
    if (message.events?.length) {
      obj.events = message.events.map((e) => UserEvent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SaveUserEventsRequest>, I>>(base?: I): SaveUserEventsRequest {
    return SaveUserEventsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SaveUserEventsRequest>, I>>(object: I): SaveUserEventsRequest {
    const message = createBaseSaveUserEventsRequest();
    message.events = object.events?.map((e) => UserEvent.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(SaveUserEventsRequest.$type, SaveUserEventsRequest);

function createBaseSaveUserEventsResponse(): SaveUserEventsResponse {
  return { $type: "pb.v1alpha1.SaveUserEventsResponse" };
}

export const SaveUserEventsResponse = {
  $type: "pb.v1alpha1.SaveUserEventsResponse" as const,

  encode(_: SaveUserEventsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SaveUserEventsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSaveUserEventsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): SaveUserEventsResponse {
    return { $type: SaveUserEventsResponse.$type };
  },

  toJSON(_: SaveUserEventsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SaveUserEventsResponse>, I>>(base?: I): SaveUserEventsResponse {
    return SaveUserEventsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SaveUserEventsResponse>, I>>(_: I): SaveUserEventsResponse {
    const message = createBaseSaveUserEventsResponse();
    return message;
  },
};

messageTypeRegistry.set(SaveUserEventsResponse.$type, SaveUserEventsResponse);

export interface Orbot {
  CreateWorkflow(request: DeepPartial<CreateWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow>;
  GetWorkflow(request: DeepPartial<GetWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow>;
  UpdateWorkflow(request: DeepPartial<UpdateWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow>;
  ListWorkflows(request: DeepPartial<ListWorkflowsRequest>, metadata?: grpc.Metadata): Promise<ListWorkflowsResponse>;
  ListUnifiedWorkflows(
    request: DeepPartial<ListWorkflowsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListWorkflowsResponse>;
  /**
   * DeleteWorkflow initiates an asynchronous deletion of workflow as well as all associated tasks
   * This operation returns immediately, allowing the deletion process to complete in the background.
   */
  DeleteWorkflow(
    request: DeepPartial<DeleteWorkflowRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DeleteWorkflowResponse>;
  CreateWorkflowTask(request: DeepPartial<CreateWorkflowTaskRequest>, metadata?: grpc.Metadata): Promise<WorkflowTask>;
  GetWorkflowTask(request: DeepPartial<GetWorkflowTaskRequest>, metadata?: grpc.Metadata): Promise<WorkflowTask>;
  /** Allows user to update task status, for example, for WAITING_FOR_REVIEW to SUCCESS */
  UpdateWorkflowTask(request: DeepPartial<UpdateWorkflowTaskRequest>, metadata?: grpc.Metadata): Promise<WorkflowTask>;
  ListWorkflowTasks(
    request: DeepPartial<ListWorkflowTasksRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListWorkflowTasksResponse>;
  /**
   * DeleteExecutions initiates an asynchronous deletion of specified executions.
   * This operation returns immediately, allowing the deletion process to complete in the background.
   */
  DeleteExecutions(
    request: DeepPartial<DeleteExecutionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DeleteExecutionsResponse>;
  CancelExecution(
    request: DeepPartial<CancelExecutionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CancelExecutionResponse>;
  ProcessSmartActions(
    request: DeepPartial<ProcessSmartActionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ProcessSmartActionsResponse>;
  InferMacroActionStep(
    request: DeepPartial<InferMacroActionStepRequest>,
    metadata?: grpc.Metadata,
  ): Promise<InferMacroActionStepResponse>;
  GenerateActionDescription(
    request: DeepPartial<GenerateActionDescriptionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GenerateActionDescriptionResponse>;
  GenerateJsAction(
    request: DeepPartial<GenerateJsActionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GenerateJsActionResponse>;
  /** Get element candidates for an action. */
  GetActionableElements(
    request: DeepPartial<GetActionableElementsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetActionableElementsResponse>;
  /** Notify user that review queue is full */
  SendEmailForReview(request: DeepPartial<SendEmailForReviewRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  /** Query cached element locators for the given action */
  GetElementLocators(
    request: DeepPartial<GetElementLocatorsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetElementLocatorsResponse>;
  /** ML service to locate an element on a Web page */
  LocateElement(request: DeepPartial<LocateElementRequest>, metadata?: grpc.Metadata): Promise<LocateElementResponse>;
  /**
   * Reports that the given ElementLocator works after execution. The validation can be:
   * 1. a human verifies that the step was executed successfully;
   * 2. orbot verifies that the step and following steps work as expected, using heuristics such as screenshots.
   */
  ReportWorkingElementLocator(
    request: DeepPartial<ReportWorkingElementLocatorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<Empty>;
  /** Create or update a workflow template. We don't support partial update, entire template will be replaced in update. */
  SaveWorkflowTemplate(request: DeepPartial<SaveWorkflowTemplateRequest>, metadata?: grpc.Metadata): Promise<Workflow>;
  GetWorkflowTemplate(request: DeepPartial<GetWorkflowTemplateRequest>, metadata?: grpc.Metadata): Promise<Workflow>;
  ListWorkflowTemplates(
    request: DeepPartial<ListWorkflowTemplatesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListWorkflowTemplatesResponse>;
  DeleteWorkflowTemplate(
    request: DeepPartial<DeleteWorkflowTemplateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DeleteWorkflowTemplateResponse>;
  SaveUserFeedback(
    request: DeepPartial<SaveUserFeedbackRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SaveUserFeedbackResponse>;
  SendEmail(request: DeepPartial<SendEmailRequest>, metadata?: grpc.Metadata): Promise<SendEmailResponse>;
  SaveUserEvents(
    request: DeepPartial<SaveUserEventsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SaveUserEventsResponse>;
}

export class OrbotClientImpl implements Orbot {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateWorkflow = this.CreateWorkflow.bind(this);
    this.GetWorkflow = this.GetWorkflow.bind(this);
    this.UpdateWorkflow = this.UpdateWorkflow.bind(this);
    this.ListWorkflows = this.ListWorkflows.bind(this);
    this.ListUnifiedWorkflows = this.ListUnifiedWorkflows.bind(this);
    this.DeleteWorkflow = this.DeleteWorkflow.bind(this);
    this.CreateWorkflowTask = this.CreateWorkflowTask.bind(this);
    this.GetWorkflowTask = this.GetWorkflowTask.bind(this);
    this.UpdateWorkflowTask = this.UpdateWorkflowTask.bind(this);
    this.ListWorkflowTasks = this.ListWorkflowTasks.bind(this);
    this.DeleteExecutions = this.DeleteExecutions.bind(this);
    this.CancelExecution = this.CancelExecution.bind(this);
    this.ProcessSmartActions = this.ProcessSmartActions.bind(this);
    this.InferMacroActionStep = this.InferMacroActionStep.bind(this);
    this.GenerateActionDescription = this.GenerateActionDescription.bind(this);
    this.GenerateJsAction = this.GenerateJsAction.bind(this);
    this.GetActionableElements = this.GetActionableElements.bind(this);
    this.SendEmailForReview = this.SendEmailForReview.bind(this);
    this.GetElementLocators = this.GetElementLocators.bind(this);
    this.LocateElement = this.LocateElement.bind(this);
    this.ReportWorkingElementLocator = this.ReportWorkingElementLocator.bind(this);
    this.SaveWorkflowTemplate = this.SaveWorkflowTemplate.bind(this);
    this.GetWorkflowTemplate = this.GetWorkflowTemplate.bind(this);
    this.ListWorkflowTemplates = this.ListWorkflowTemplates.bind(this);
    this.DeleteWorkflowTemplate = this.DeleteWorkflowTemplate.bind(this);
    this.SaveUserFeedback = this.SaveUserFeedback.bind(this);
    this.SendEmail = this.SendEmail.bind(this);
    this.SaveUserEvents = this.SaveUserEvents.bind(this);
  }

  CreateWorkflow(request: DeepPartial<CreateWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow> {
    return this.rpc.unary(OrbotCreateWorkflowDesc, CreateWorkflowRequest.fromPartial(request), metadata);
  }

  GetWorkflow(request: DeepPartial<GetWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow> {
    return this.rpc.unary(OrbotGetWorkflowDesc, GetWorkflowRequest.fromPartial(request), metadata);
  }

  UpdateWorkflow(request: DeepPartial<UpdateWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow> {
    return this.rpc.unary(OrbotUpdateWorkflowDesc, UpdateWorkflowRequest.fromPartial(request), metadata);
  }

  ListWorkflows(request: DeepPartial<ListWorkflowsRequest>, metadata?: grpc.Metadata): Promise<ListWorkflowsResponse> {
    return this.rpc.unary(OrbotListWorkflowsDesc, ListWorkflowsRequest.fromPartial(request), metadata);
  }

  ListUnifiedWorkflows(
    request: DeepPartial<ListWorkflowsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListWorkflowsResponse> {
    return this.rpc.unary(OrbotListUnifiedWorkflowsDesc, ListWorkflowsRequest.fromPartial(request), metadata);
  }

  DeleteWorkflow(
    request: DeepPartial<DeleteWorkflowRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DeleteWorkflowResponse> {
    return this.rpc.unary(OrbotDeleteWorkflowDesc, DeleteWorkflowRequest.fromPartial(request), metadata);
  }

  CreateWorkflowTask(request: DeepPartial<CreateWorkflowTaskRequest>, metadata?: grpc.Metadata): Promise<WorkflowTask> {
    return this.rpc.unary(OrbotCreateWorkflowTaskDesc, CreateWorkflowTaskRequest.fromPartial(request), metadata);
  }

  GetWorkflowTask(request: DeepPartial<GetWorkflowTaskRequest>, metadata?: grpc.Metadata): Promise<WorkflowTask> {
    return this.rpc.unary(OrbotGetWorkflowTaskDesc, GetWorkflowTaskRequest.fromPartial(request), metadata);
  }

  UpdateWorkflowTask(request: DeepPartial<UpdateWorkflowTaskRequest>, metadata?: grpc.Metadata): Promise<WorkflowTask> {
    return this.rpc.unary(OrbotUpdateWorkflowTaskDesc, UpdateWorkflowTaskRequest.fromPartial(request), metadata);
  }

  ListWorkflowTasks(
    request: DeepPartial<ListWorkflowTasksRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListWorkflowTasksResponse> {
    return this.rpc.unary(OrbotListWorkflowTasksDesc, ListWorkflowTasksRequest.fromPartial(request), metadata);
  }

  DeleteExecutions(
    request: DeepPartial<DeleteExecutionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DeleteExecutionsResponse> {
    return this.rpc.unary(OrbotDeleteExecutionsDesc, DeleteExecutionsRequest.fromPartial(request), metadata);
  }

  CancelExecution(
    request: DeepPartial<CancelExecutionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CancelExecutionResponse> {
    return this.rpc.unary(OrbotCancelExecutionDesc, CancelExecutionRequest.fromPartial(request), metadata);
  }

  ProcessSmartActions(
    request: DeepPartial<ProcessSmartActionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ProcessSmartActionsResponse> {
    return this.rpc.unary(OrbotProcessSmartActionsDesc, ProcessSmartActionsRequest.fromPartial(request), metadata);
  }

  InferMacroActionStep(
    request: DeepPartial<InferMacroActionStepRequest>,
    metadata?: grpc.Metadata,
  ): Promise<InferMacroActionStepResponse> {
    return this.rpc.unary(OrbotInferMacroActionStepDesc, InferMacroActionStepRequest.fromPartial(request), metadata);
  }

  GenerateActionDescription(
    request: DeepPartial<GenerateActionDescriptionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GenerateActionDescriptionResponse> {
    return this.rpc.unary(
      OrbotGenerateActionDescriptionDesc,
      GenerateActionDescriptionRequest.fromPartial(request),
      metadata,
    );
  }

  GenerateJsAction(
    request: DeepPartial<GenerateJsActionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GenerateJsActionResponse> {
    return this.rpc.unary(OrbotGenerateJsActionDesc, GenerateJsActionRequest.fromPartial(request), metadata);
  }

  GetActionableElements(
    request: DeepPartial<GetActionableElementsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetActionableElementsResponse> {
    return this.rpc.unary(OrbotGetActionableElementsDesc, GetActionableElementsRequest.fromPartial(request), metadata);
  }

  SendEmailForReview(request: DeepPartial<SendEmailForReviewRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(OrbotSendEmailForReviewDesc, SendEmailForReviewRequest.fromPartial(request), metadata);
  }

  GetElementLocators(
    request: DeepPartial<GetElementLocatorsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetElementLocatorsResponse> {
    return this.rpc.unary(OrbotGetElementLocatorsDesc, GetElementLocatorsRequest.fromPartial(request), metadata);
  }

  LocateElement(request: DeepPartial<LocateElementRequest>, metadata?: grpc.Metadata): Promise<LocateElementResponse> {
    return this.rpc.unary(OrbotLocateElementDesc, LocateElementRequest.fromPartial(request), metadata);
  }

  ReportWorkingElementLocator(
    request: DeepPartial<ReportWorkingElementLocatorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<Empty> {
    return this.rpc.unary(
      OrbotReportWorkingElementLocatorDesc,
      ReportWorkingElementLocatorRequest.fromPartial(request),
      metadata,
    );
  }

  SaveWorkflowTemplate(request: DeepPartial<SaveWorkflowTemplateRequest>, metadata?: grpc.Metadata): Promise<Workflow> {
    return this.rpc.unary(OrbotSaveWorkflowTemplateDesc, SaveWorkflowTemplateRequest.fromPartial(request), metadata);
  }

  GetWorkflowTemplate(request: DeepPartial<GetWorkflowTemplateRequest>, metadata?: grpc.Metadata): Promise<Workflow> {
    return this.rpc.unary(OrbotGetWorkflowTemplateDesc, GetWorkflowTemplateRequest.fromPartial(request), metadata);
  }

  ListWorkflowTemplates(
    request: DeepPartial<ListWorkflowTemplatesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListWorkflowTemplatesResponse> {
    return this.rpc.unary(OrbotListWorkflowTemplatesDesc, ListWorkflowTemplatesRequest.fromPartial(request), metadata);
  }

  DeleteWorkflowTemplate(
    request: DeepPartial<DeleteWorkflowTemplateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DeleteWorkflowTemplateResponse> {
    return this.rpc.unary(
      OrbotDeleteWorkflowTemplateDesc,
      DeleteWorkflowTemplateRequest.fromPartial(request),
      metadata,
    );
  }

  SaveUserFeedback(
    request: DeepPartial<SaveUserFeedbackRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SaveUserFeedbackResponse> {
    return this.rpc.unary(OrbotSaveUserFeedbackDesc, SaveUserFeedbackRequest.fromPartial(request), metadata);
  }

  SendEmail(request: DeepPartial<SendEmailRequest>, metadata?: grpc.Metadata): Promise<SendEmailResponse> {
    return this.rpc.unary(OrbotSendEmailDesc, SendEmailRequest.fromPartial(request), metadata);
  }

  SaveUserEvents(
    request: DeepPartial<SaveUserEventsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SaveUserEventsResponse> {
    return this.rpc.unary(OrbotSaveUserEventsDesc, SaveUserEventsRequest.fromPartial(request), metadata);
  }
}

export const OrbotDesc = { serviceName: "pb.v1alpha1.Orbot" };

export const OrbotCreateWorkflowDesc: UnaryMethodDefinitionish = {
  methodName: "CreateWorkflow",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateWorkflowRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Workflow.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotGetWorkflowDesc: UnaryMethodDefinitionish = {
  methodName: "GetWorkflow",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetWorkflowRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Workflow.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotUpdateWorkflowDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateWorkflow",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateWorkflowRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Workflow.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotListWorkflowsDesc: UnaryMethodDefinitionish = {
  methodName: "ListWorkflows",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListWorkflowsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListWorkflowsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotListUnifiedWorkflowsDesc: UnaryMethodDefinitionish = {
  methodName: "ListUnifiedWorkflows",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListWorkflowsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListWorkflowsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotDeleteWorkflowDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteWorkflow",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteWorkflowRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DeleteWorkflowResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotCreateWorkflowTaskDesc: UnaryMethodDefinitionish = {
  methodName: "CreateWorkflowTask",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateWorkflowTaskRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = WorkflowTask.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotGetWorkflowTaskDesc: UnaryMethodDefinitionish = {
  methodName: "GetWorkflowTask",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetWorkflowTaskRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = WorkflowTask.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotUpdateWorkflowTaskDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateWorkflowTask",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateWorkflowTaskRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = WorkflowTask.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotListWorkflowTasksDesc: UnaryMethodDefinitionish = {
  methodName: "ListWorkflowTasks",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListWorkflowTasksRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListWorkflowTasksResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotDeleteExecutionsDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteExecutions",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteExecutionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DeleteExecutionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotCancelExecutionDesc: UnaryMethodDefinitionish = {
  methodName: "CancelExecution",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CancelExecutionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CancelExecutionResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotProcessSmartActionsDesc: UnaryMethodDefinitionish = {
  methodName: "ProcessSmartActions",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ProcessSmartActionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ProcessSmartActionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotInferMacroActionStepDesc: UnaryMethodDefinitionish = {
  methodName: "InferMacroActionStep",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return InferMacroActionStepRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = InferMacroActionStepResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotGenerateActionDescriptionDesc: UnaryMethodDefinitionish = {
  methodName: "GenerateActionDescription",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GenerateActionDescriptionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GenerateActionDescriptionResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotGenerateJsActionDesc: UnaryMethodDefinitionish = {
  methodName: "GenerateJsAction",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GenerateJsActionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GenerateJsActionResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotGetActionableElementsDesc: UnaryMethodDefinitionish = {
  methodName: "GetActionableElements",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetActionableElementsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetActionableElementsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotSendEmailForReviewDesc: UnaryMethodDefinitionish = {
  methodName: "SendEmailForReview",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SendEmailForReviewRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotGetElementLocatorsDesc: UnaryMethodDefinitionish = {
  methodName: "GetElementLocators",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetElementLocatorsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetElementLocatorsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotLocateElementDesc: UnaryMethodDefinitionish = {
  methodName: "LocateElement",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return LocateElementRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = LocateElementResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotReportWorkingElementLocatorDesc: UnaryMethodDefinitionish = {
  methodName: "ReportWorkingElementLocator",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ReportWorkingElementLocatorRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotSaveWorkflowTemplateDesc: UnaryMethodDefinitionish = {
  methodName: "SaveWorkflowTemplate",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SaveWorkflowTemplateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Workflow.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotGetWorkflowTemplateDesc: UnaryMethodDefinitionish = {
  methodName: "GetWorkflowTemplate",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetWorkflowTemplateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Workflow.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotListWorkflowTemplatesDesc: UnaryMethodDefinitionish = {
  methodName: "ListWorkflowTemplates",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListWorkflowTemplatesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListWorkflowTemplatesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotDeleteWorkflowTemplateDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteWorkflowTemplate",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteWorkflowTemplateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DeleteWorkflowTemplateResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotSaveUserFeedbackDesc: UnaryMethodDefinitionish = {
  methodName: "SaveUserFeedback",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SaveUserFeedbackRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SaveUserFeedbackResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotSendEmailDesc: UnaryMethodDefinitionish = {
  methodName: "SendEmail",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SendEmailRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SendEmailResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbotSaveUserEventsDesc: UnaryMethodDefinitionish = {
  methodName: "SaveUserEvents",
  service: OrbotDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SaveUserEventsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SaveUserEventsResponse.decode(data);
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
