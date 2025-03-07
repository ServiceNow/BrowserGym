/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import {
  EmailParam,
  GDriveParam,
  GmailParam,
  GSheetsParam,
  SFTPParam,
  SpreadsheetParam,
} from "../../application/application_params";
import { DeletedObjectInfo } from "../../common/common";
import { SortField } from "../../common/data_query_params";
import { ReviewerList, WorkflowUser } from "../../common/review";
import { UserProfileInfo } from "../../common/user_profile";
import {
  WorkflowTemplateType,
  workflowTemplateTypeFromJSON,
  workflowTemplateTypeToJSON,
} from "../../common/workflow_common";
import { FieldMask } from "../../google/protobuf/field_mask";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import {
  DocClassificationParam,
  EntityDetails,
  EntityExtractionParam,
  GenerateOutputParam,
} from "./workflow_steps_params";

export const protobufPackage = "pb.v1alpha2";

export interface ListWorkflowsRequest {
  $type?: "pb.v1alpha2.ListWorkflowsRequest";
  /**
   * If unset:
   *   Admin: list workflows for the organization. Templates are eligible
   *   User: list assigned workflows where user is a workflow user.
   * If set:
   *   Admin: list assigned workflows for this user
   *   User: error if set to other users. No difference if set to own email.
   */
  user?:
    | string
    | undefined;
  /**
   * Default is 10 (when page_size is missing or set to 0). Max value is 20.
   * Ordered by display name.
   */
  pageSize?:
    | number
    | undefined;
  /**
   * Use this to continue the previous list requests.
   * Its value should be same with previous response's next_page_token.
   * Please reuse the same filter and page size.
   */
  pageToken?:
    | string
    | undefined;
  /**
   * Supported filters: "is_template={true|false},
   * status={status_enabled|status_disabled},type={extraction|classification}"
   * providing type will fetch workflows of that type i.e Extraction or Classification only
   * application={Gmail|Outlook|Google Drive|Google Sheets|MS Excel|SFTP Server}
   * multiple application values can be provided with a dash (-) separator, eg. "application=Gmail-Outlook"
   * mode={DEFAULT|AUTOPILOT|ASSISTED}
   * multiple mode values can be provided with a dash (-) separator, eg. "mode=DEFAULT-AUTOPILOT"
   * name_prefix="value"
   * create_time_lt={UNIX_TIME_SEC}
   * create_time_gt={UNIX_TIME_SEC}
   * last_update_time_lt={UNIX_TIME_SEC}
   * last_update_time_gt={UNIX_TIME_SEC}
   * user={abc@gmail.com:xyz@gmail.com}
   * multiple users can be provided by a colon (:) separator
   * creator={abc@gmail.com:xyz@gmail.com}
   * multiple creators can be provided by a colon (:) separator
   */
  filter?:
    | string
    | undefined;
  /**
   * Use this to send only relevant data in response
   * - If Field Mask is not send or is sent with empty paths then the result will contain
   *    the complete object
   * - Valid values for field mask are: task_name, confidence, status, create_time, complete_time,
   *    time_saved, tags, task_resource_name, steps, performance, ready_time, accuracy
   * - Field mask will always contain `name` field. Please donot send it in Paths to avoid errors.
   */
  fieldMask?:
    | string[]
    | undefined;
  /** Organization resource name. Format: organizations/{ID} */
  orgResourceName?: string | undefined;
  pageNumber?:
    | number
    | undefined;
  /**
   * The order of fields will effect the sorting order.
   * Supported fields: display_name, create_time, last_modified_time,
   * mode, creator_email
   */
  sort?: SortField[] | undefined;
}

export interface ListWorkflowsResponse {
  $type?: "pb.v1alpha2.ListWorkflowsResponse";
  workflows?:
    | Workflow[]
    | undefined;
  /** If the value is "", it means no further results for the request. */
  nextPageToken?:
    | string
    | undefined;
  /**
   * Total available suggestion size.
   * Note it is NOT the remaining available suggestion size after the current response.
   */
  totalSize?: number | undefined;
}

export interface CreateWorkflowRequest {
  $type?: "pb.v1alpha2.CreateWorkflowRequest";
  workflow?: Workflow | undefined;
}

export interface DeleteWorkflowRequest {
  $type?: "pb.v1alpha2.DeleteWorkflowRequest";
  /** The resource name of the workflow to be deleted, format workflows/{ID}. */
  name?: string | undefined;
  deletedReason?: string | undefined;
}

export interface GetWorkflowRequest {
  $type?: "pb.v1alpha2.GetWorkflowRequest";
  /** The resource name of the workflow to be retrived, format workflows/{ID} */
  name?:
    | string
    | undefined;
  /**
   * Use this to send only relevant data in response
   * Currently only 'additional_entities' is supported and if used then response will
   * only contain additional_entities, resource_name and workflow_display_name fields.
   */
  fieldMask?: string[] | undefined;
}

export interface UpdateWorkflowRequest {
  $type?: "pb.v1alpha2.UpdateWorkflowRequest";
  workflow?:
    | Workflow
    | undefined;
  /**
   * Support display_name, description, steps, manual_time_cost_in_minutes,
   * status, users, need_attention_threshold_default_mode, reviewer_lists, mode,
   * hyperparameter_resource_name (internal only), learning_settings
   * When "steps" fieldmask is used, only the GSheetsAddRowOption field inside
   * WorkflowAction's GSheetsParam will be updated. This is used for schema
   * change.
   * If field_mask is empty, all updatable fields will be updated based on
   * the provided workflow.
   */
  fieldMask?: string[] | undefined;
}

export interface Workflow {
  $type?: "pb.v1alpha2.Workflow";
  /**
   * Resource name. Format: workflows/{ID}
   * Note: since a workflow can have multiple admins and admins can change
   * over time, make workflow a top level resource instead of under user.
   */
  name?:
    | string
    | undefined;
  /** Optional workflow template resource name. Format: workflows/{ID} */
  templateResourceName?: string | undefined;
  displayName?: string | undefined;
  description?: string | undefined;
  steps?: WorkflowStep[] | undefined;
  manualTimeCostInMinutes?: number | undefined;
  createTime?:
    | Date
    | undefined;
  /**
   * Proposal:  When this boolean field is true, some data validations can be
   * skipped. Using a template to create a workflow means some workflow fields
   * are copied from the template and not editable, or editable with
   * restrictions. Each Orby-predefined workflow template is expected to be
   * supported by predefined temporal workflows.
   * To Support ListWorkflows() method, database index should be created.
   */
  isTemplate?: boolean | undefined;
  lastModifiedTime?: Date | undefined;
  status?:
    | WorkflowStatus
    | undefined;
  /** Id of the organization the workflow belongs to. Format: organizations/{ID} */
  organizationResourceName?:
    | string
    | undefined;
  /**
   * Any user who wants to get tasks from this workflow needs to be added to
   * this group, including admins.
   * users will be deprecated as the this info will be stored in reviewer_lists field
   */
  users?: WorkflowUser[] | undefined;
  temporalWorkflow?:
    | WorkflowtemporalWorkflow
    | undefined;
  /** Do not use, use creator instead. */
  creatorEmail?: string | undefined;
  mode?:
    | WorkflowMode
    | undefined;
  /** Only useful for ASSISTED mode, value range [0,1] */
  assistedModeConfidenceThreshold?: number | undefined;
  reviewerLists?:
    | ReviewerList[]
    | undefined;
  /** Workflow template type should only be used for templates */
  workflowTemplateType?:
    | WorkflowTemplateType
    | undefined;
  /**
   * Reserved for internal debugging purpose.
   * Workflows with this field set can be created by specific organizations.
   */
  workflowDebugConfig?:
    | WorkflowDebugConfig
    | undefined;
  /**
   * Extraction predictions of default mode generated tasks whose confidence
   * score is below this threshold are listed under "need attention" filter
   * in the task review page. Empty prediction is always listed there.
   * Range [0, 1]
   */
  needAttentionThresholdDefaultMode?:
    | number
    | undefined;
  /**
   * This field allows soft deletion over time by
   * marking workflow for deletion without immediately deleting it.
   */
  deletedObjectInfo?:
    | DeletedObjectInfo
    | undefined;
  /** Creator info of the workflow */
  creator?:
    | UserProfileInfo
    | undefined;
  /**
   * Admins of the workflow. Who can CRUD all aspects of the workflow as
   * well as its associated tasks. Can assign tasks to reviewers.
   * Creator will be in the list of admins by default.
   */
  admins?:
    | string[]
    | undefined;
  /**
   * content of the email message to be sent to newly added admin account
   * to notify an account that it has been added as an admin to the workflow.
   * this variable works on CreateWorkflow & UpdateWorkflow.
   */
  adminEmailMessage?:
    | string
    | undefined;
  /** when set this to false, will not send email to newly added admin */
  sendAdminEmail?: boolean | undefined;
  hyperparameterResourceName?:
    | string
    | undefined;
  /**
   * Settings for machine learning models, reviewers which not used for learning
   * will be excluded from example tasks.
   */
  learningSettings?: WorkflowLearningSettings | undefined;
  additionalEntities?: WorkflowAdditionalEntities[] | undefined;
  isBlocked?:
    | boolean
    | undefined;
  /**
   * This field will store entity-based accuracy over all the fields
   * in the workflow. This is calculated by taking the average of all
   * the fields' accuracy stored in clickhouse.
   * If the accuracy is not available for the workflow, it will be set to -1.
   * Else the value will be in the range [0, 1].
   */
  accuracy?:
    | number
    | undefined;
  /**
   * This field is used to store the email account for sending notification
   * emails when task is completed/rejected/failed .
   */
  taskCompletionNotificationEmails?:
    | string[]
    | undefined;
  /**
   * if successfully completed tasks (not archived or deleted) are less
   * than the threshold(currently 3), it would affect model learning.
   */
  isLearningTasksInsufficient?: boolean | undefined;
}

/** Organization-level status. Disabled workflow won't generate tasks */
export enum WorkflowStatus {
  UNSPECIFIED = 0,
  ENABLED = 1,
  DISABLED = 2,
  UNRECOGNIZED = -1,
}

export function workflowStatusFromJSON(object: any): WorkflowStatus {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return WorkflowStatus.UNSPECIFIED;
    case 1:
    case "STATUS_ENABLED":
      return WorkflowStatus.ENABLED;
    case 2:
    case "STATUS_DISABLED":
      return WorkflowStatus.DISABLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WorkflowStatus.UNRECOGNIZED;
  }
}

export function workflowStatusToJSON(object: WorkflowStatus): string {
  switch (object) {
    case WorkflowStatus.UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case WorkflowStatus.ENABLED:
      return "STATUS_ENABLED";
    case WorkflowStatus.DISABLED:
      return "STATUS_DISABLED";
    case WorkflowStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum WorkflowtemporalWorkflow {
  TEMPORAL_WORKFLOW_UNSPECIFIED = 0,
  DOCUMENT_PROCESSING_TO_GSHEETS_WORKFLOW = 1,
  DOCUMENT_CLASSIFICATION_WORKFLOW = 2,
  DOCUMENT_PROCESSING_WORKFLOW = 3,
  UNRECOGNIZED = -1,
}

export function workflowtemporalWorkflowFromJSON(object: any): WorkflowtemporalWorkflow {
  switch (object) {
    case 0:
    case "TEMPORAL_WORKFLOW_UNSPECIFIED":
      return WorkflowtemporalWorkflow.TEMPORAL_WORKFLOW_UNSPECIFIED;
    case 1:
    case "DOCUMENT_PROCESSING_TO_GSHEETS_WORKFLOW":
      return WorkflowtemporalWorkflow.DOCUMENT_PROCESSING_TO_GSHEETS_WORKFLOW;
    case 2:
    case "DOCUMENT_CLASSIFICATION_WORKFLOW":
      return WorkflowtemporalWorkflow.DOCUMENT_CLASSIFICATION_WORKFLOW;
    case 3:
    case "DOCUMENT_PROCESSING_WORKFLOW":
      return WorkflowtemporalWorkflow.DOCUMENT_PROCESSING_WORKFLOW;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WorkflowtemporalWorkflow.UNRECOGNIZED;
  }
}

export function workflowtemporalWorkflowToJSON(object: WorkflowtemporalWorkflow): string {
  switch (object) {
    case WorkflowtemporalWorkflow.TEMPORAL_WORKFLOW_UNSPECIFIED:
      return "TEMPORAL_WORKFLOW_UNSPECIFIED";
    case WorkflowtemporalWorkflow.DOCUMENT_PROCESSING_TO_GSHEETS_WORKFLOW:
      return "DOCUMENT_PROCESSING_TO_GSHEETS_WORKFLOW";
    case WorkflowtemporalWorkflow.DOCUMENT_CLASSIFICATION_WORKFLOW:
      return "DOCUMENT_CLASSIFICATION_WORKFLOW";
    case WorkflowtemporalWorkflow.DOCUMENT_PROCESSING_WORKFLOW:
      return "DOCUMENT_PROCESSING_WORKFLOW";
    case WorkflowtemporalWorkflow.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum WorkflowMode {
  UNSPECIFIED = 0,
  DEFAULT = 1,
  AUTOPILOT = 2,
  ASSISTED = 3,
  UNRECOGNIZED = -1,
}

export function workflowModeFromJSON(object: any): WorkflowMode {
  switch (object) {
    case 0:
    case "UNSPECIFIED":
      return WorkflowMode.UNSPECIFIED;
    case 1:
    case "DEFAULT":
      return WorkflowMode.DEFAULT;
    case 2:
    case "AUTOPILOT":
      return WorkflowMode.AUTOPILOT;
    case 3:
    case "ASSISTED":
      return WorkflowMode.ASSISTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WorkflowMode.UNRECOGNIZED;
  }
}

export function workflowModeToJSON(object: WorkflowMode): string {
  switch (object) {
    case WorkflowMode.UNSPECIFIED:
      return "UNSPECIFIED";
    case WorkflowMode.DEFAULT:
      return "DEFAULT";
    case WorkflowMode.AUTOPILOT:
      return "AUTOPILOT";
    case WorkflowMode.ASSISTED:
      return "ASSISTED";
    case WorkflowMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface WorkflowAdditionalEntities {
  $type?: "pb.v1alpha2.WorkflowAdditionalEntities";
  taskResourceName?: string | undefined;
  taskDisplayName?: string | undefined;
  creator?: UserProfileInfo | undefined;
  createTime?: Date | undefined;
  entitiesDetails?: EntityDetails[] | undefined;
}

export interface WorkflowDebugConfig {
  $type?: "pb.v1alpha2.WorkflowDebugConfig";
  /** bypass cache for ML workflow */
  bypassCache?:
    | boolean
    | undefined;
  /**
   * Used by FindExampleDocumentsAndLabels() to limit the maximum number of
   * documents fetched **per** classification label.
   */
  dbQueryLimit?:
    | number
    | undefined;
  /**
   * Whether to includ autopilot mode tasks in FindExampleDocumentsAndLabels()
   * for classification or FetchSimilarExamples() for extractions.
   */
  includeAutopilotModeTasks?:
    | boolean
    | undefined;
  /** If true, the workflow will bypass the quota check. */
  bypassQuota?: boolean | undefined;
}

export interface WorkflowStep {
  $type?: "pb.v1alpha2.WorkflowStep";
  /** Step actions are only executed when all triggers are satisfied. */
  triggers?: WorkflowStepWorkflowTrigger[] | undefined;
  actions?: WorkflowStepWorkflowAction[] | undefined;
}

export interface WorkflowStepWorkflowAction {
  $type?: "pb.v1alpha2.WorkflowStep.WorkflowAction";
  /** E.g. "Google Sheet" */
  application?: string | undefined;
  gdrive?: GDriveParam | undefined;
  gsheets?:
    | GSheetsParam
    | undefined;
  /** Do not use: For backward compatibility, will be removed once all logic is migrated to EmailParam. */
  gmail?: GmailParam | undefined;
  classification?: DocClassificationParam | undefined;
  sftp?: SFTPParam | undefined;
  entityExtraction?: EntityExtractionParam | undefined;
  generateOutputParam?:
    | GenerateOutputParam
    | undefined;
  /**
   * GSheetsParam will be deprecated in favor of
   * SpreadsheetParam in the future to have a more generic name
   * to support other spreadsheet applications
   */
  spreadsheet?: SpreadsheetParam | undefined;
  email?: EmailParam | undefined;
}

export interface WorkflowStepWorkflowTrigger {
  $type?: "pb.v1alpha2.WorkflowStep.WorkflowTrigger";
  /** E.g. ”Google Drive“ for GDriveParam */
  application?: string | undefined;
  gdrive?: GDriveParam | undefined;
  gsheets?:
    | GSheetsParam
    | undefined;
  /** Do not use: For backward compatibility, will be removed once all logic is migrated to EmailParam. */
  gmail?: GmailParam | undefined;
  sftp?:
    | SFTPParam
    | undefined;
  /**
   * GSheetsParam will be deprecated in favor of
   * SpreadsheetParam in the future to have a more generic name
   * to support other spreadsheet applications
   */
  spreadsheet?: SpreadsheetParam | undefined;
  email?: EmailParam | undefined;
}

export interface DeleteWorkflowResponse {
  $type?: "pb.v1alpha2.DeleteWorkflowResponse";
  temporalWorkflowId?: string | undefined;
}

export interface WorkflowLearningSettingsReviewer {
  $type?: "pb.v1alpha2.WorkflowLearningSettingsReviewer";
  /** The user profile info of the reviewer */
  reviewer?:
    | UserProfileInfo
    | undefined;
  /**
   * Whether the reviewer is still in the reviewer list of workflow
   * If true, will be shown in the current reviewer list
   * If false, will be shown in the past reviewer list
   */
  existsInReviewerList?:
    | boolean
    | undefined;
  /** Whether the reviewer's completed tasks can be used for learning */
  usedForLearning?: boolean | undefined;
}

export interface WorkflowLearningSettings {
  $type?: "pb.v1alpha2.WorkflowLearningSettings";
  /** Reviewers of the workflow, including current reviewers and past reviewers */
  reviewers?: WorkflowLearningSettingsReviewer[] | undefined;
}

export interface WorkflowField {
  $type?: "pb.v1alpha2.WorkflowField";
  name?: string | undefined;
  workflowDisplayName?: string | undefined;
  childFields?:
    | WorkflowField[]
    | undefined;
  /** Accuracy of the field, range [0, 100] */
  accuracy?: number | undefined;
}

export interface ListWorkflowFieldsFilter {
  $type?: "pb.v1alpha2.ListWorkflowFieldsFilter";
  /** Filter by field name, only support prefix-based name queries. */
  namePrefix?: string | undefined;
  type?:
    | ListWorkflowFieldsFilterType
    | undefined;
  /**
   * The resoure name of workflows to filter by.
   * Format: workflows/{workflowId}
   */
  workflowResourceNames?: string[] | undefined;
  timeLt?: Date | undefined;
  timeGt?: Date | undefined;
}

export enum ListWorkflowFieldsFilterType {
  UNSPECIFIED = 0,
  EXTRACTION_ONLY = 1,
  CLASSIFICATION_ONLY = 2,
  UNRECOGNIZED = -1,
}

export function listWorkflowFieldsFilterTypeFromJSON(object: any): ListWorkflowFieldsFilterType {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return ListWorkflowFieldsFilterType.UNSPECIFIED;
    case 1:
    case "EXTRACTION_ONLY":
      return ListWorkflowFieldsFilterType.EXTRACTION_ONLY;
    case 2:
    case "CLASSIFICATION_ONLY":
      return ListWorkflowFieldsFilterType.CLASSIFICATION_ONLY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ListWorkflowFieldsFilterType.UNRECOGNIZED;
  }
}

export function listWorkflowFieldsFilterTypeToJSON(object: ListWorkflowFieldsFilterType): string {
  switch (object) {
    case ListWorkflowFieldsFilterType.UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case ListWorkflowFieldsFilterType.EXTRACTION_ONLY:
      return "EXTRACTION_ONLY";
    case ListWorkflowFieldsFilterType.CLASSIFICATION_ONLY:
      return "CLASSIFICATION_ONLY";
    case ListWorkflowFieldsFilterType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ListWorkflowFieldsRequest {
  $type?: "pb.v1alpha2.ListWorkflowFieldsRequest";
  /** Organization resource name. Format: organizations/{ID} */
  orgResourceName?: string | undefined;
  pageSize?: number | undefined;
  pageNumber?: number | undefined;
  filter?:
    | ListWorkflowFieldsFilter
    | undefined;
  /**
   * The order of fields will effect the sorting order.
   * Supported fields: accuracy.
   */
  sorts?: SortField[] | undefined;
}

export interface ListWorkflowFieldsResponse {
  $type?: "pb.v1alpha2.ListWorkflowFieldsResponse";
  fields?: WorkflowField[] | undefined;
  totalSize?: number | undefined;
}

function createBaseListWorkflowsRequest(): ListWorkflowsRequest {
  return {
    $type: "pb.v1alpha2.ListWorkflowsRequest",
    user: "",
    pageSize: 0,
    pageToken: "",
    filter: "",
    fieldMask: undefined,
    orgResourceName: "",
    pageNumber: 0,
    sort: [],
  };
}

export const ListWorkflowsRequest = {
  $type: "pb.v1alpha2.ListWorkflowsRequest" as const,

  encode(message: ListWorkflowsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined && message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      writer.uint32(26).string(message.pageToken);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(34).string(message.filter);
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(42).fork()).ldelim();
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(50).string(message.orgResourceName);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(56).int32(message.pageNumber);
    }
    if (message.sort !== undefined && message.sort.length !== 0) {
      for (const v of message.sort) {
        SortField.encode(v!, writer.uint32(66).fork()).ldelim();
      }
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

          message.user = reader.string();
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

          message.filter = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.orgResourceName = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.pageNumber = reader.int32();
          continue;
        case 8:
          if (tag !== 66) {
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

  fromJSON(object: any): ListWorkflowsRequest {
    return {
      $type: ListWorkflowsRequest.$type,
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      sort: globalThis.Array.isArray(object?.sort) ? object.sort.map((e: any) => SortField.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListWorkflowsRequest): unknown {
    const obj: any = {};
    if (message.user !== undefined && message.user !== "") {
      obj.user = message.user;
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      obj.pageToken = message.pageToken;
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.sort?.length) {
      obj.sort = message.sort.map((e) => SortField.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowsRequest>, I>>(base?: I): ListWorkflowsRequest {
    return ListWorkflowsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowsRequest>, I>>(object: I): ListWorkflowsRequest {
    const message = createBaseListWorkflowsRequest();
    message.user = object.user ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    message.filter = object.filter ?? "";
    message.fieldMask = object.fieldMask ?? undefined;
    message.orgResourceName = object.orgResourceName ?? "";
    message.pageNumber = object.pageNumber ?? 0;
    message.sort = object.sort?.map((e) => SortField.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowsRequest.$type, ListWorkflowsRequest);

function createBaseListWorkflowsResponse(): ListWorkflowsResponse {
  return { $type: "pb.v1alpha2.ListWorkflowsResponse", workflows: [], nextPageToken: "", totalSize: 0 };
}

export const ListWorkflowsResponse = {
  $type: "pb.v1alpha2.ListWorkflowsResponse" as const,

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

function createBaseCreateWorkflowRequest(): CreateWorkflowRequest {
  return { $type: "pb.v1alpha2.CreateWorkflowRequest", workflow: undefined };
}

export const CreateWorkflowRequest = {
  $type: "pb.v1alpha2.CreateWorkflowRequest" as const,

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

function createBaseDeleteWorkflowRequest(): DeleteWorkflowRequest {
  return { $type: "pb.v1alpha2.DeleteWorkflowRequest", name: "", deletedReason: "" };
}

export const DeleteWorkflowRequest = {
  $type: "pb.v1alpha2.DeleteWorkflowRequest" as const,

  encode(message: DeleteWorkflowRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.deletedReason !== undefined && message.deletedReason !== "") {
      writer.uint32(18).string(message.deletedReason);
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

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deletedReason = reader.string();
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
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      deletedReason: isSet(object.deletedReason) ? globalThis.String(object.deletedReason) : "",
    };
  },

  toJSON(message: DeleteWorkflowRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.deletedReason !== undefined && message.deletedReason !== "") {
      obj.deletedReason = message.deletedReason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteWorkflowRequest>, I>>(base?: I): DeleteWorkflowRequest {
    return DeleteWorkflowRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteWorkflowRequest>, I>>(object: I): DeleteWorkflowRequest {
    const message = createBaseDeleteWorkflowRequest();
    message.name = object.name ?? "";
    message.deletedReason = object.deletedReason ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteWorkflowRequest.$type, DeleteWorkflowRequest);

function createBaseGetWorkflowRequest(): GetWorkflowRequest {
  return { $type: "pb.v1alpha2.GetWorkflowRequest", name: "", fieldMask: undefined };
}

export const GetWorkflowRequest = {
  $type: "pb.v1alpha2.GetWorkflowRequest" as const,

  encode(message: GetWorkflowRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(42).fork()).ldelim();
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

          message.name = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
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
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: GetWorkflowRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetWorkflowRequest>, I>>(base?: I): GetWorkflowRequest {
    return GetWorkflowRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetWorkflowRequest>, I>>(object: I): GetWorkflowRequest {
    const message = createBaseGetWorkflowRequest();
    message.name = object.name ?? "";
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(GetWorkflowRequest.$type, GetWorkflowRequest);

function createBaseUpdateWorkflowRequest(): UpdateWorkflowRequest {
  return { $type: "pb.v1alpha2.UpdateWorkflowRequest", workflow: undefined, fieldMask: undefined };
}

export const UpdateWorkflowRequest = {
  $type: "pb.v1alpha2.UpdateWorkflowRequest" as const,

  encode(message: UpdateWorkflowRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflow !== undefined) {
      Workflow.encode(message.workflow, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
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

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
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
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: UpdateWorkflowRequest): unknown {
    const obj: any = {};
    if (message.workflow !== undefined) {
      obj.workflow = Workflow.toJSON(message.workflow);
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
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
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateWorkflowRequest.$type, UpdateWorkflowRequest);

function createBaseWorkflow(): Workflow {
  return {
    $type: "pb.v1alpha2.Workflow",
    name: "",
    templateResourceName: "",
    displayName: "",
    description: "",
    steps: [],
    manualTimeCostInMinutes: 0,
    createTime: undefined,
    isTemplate: false,
    lastModifiedTime: undefined,
    status: 0,
    organizationResourceName: "",
    users: [],
    temporalWorkflow: 0,
    creatorEmail: "",
    mode: 0,
    assistedModeConfidenceThreshold: 0,
    reviewerLists: [],
    workflowTemplateType: 0,
    workflowDebugConfig: undefined,
    needAttentionThresholdDefaultMode: 0,
    deletedObjectInfo: undefined,
    creator: undefined,
    admins: [],
    adminEmailMessage: "",
    sendAdminEmail: false,
    hyperparameterResourceName: "",
    learningSettings: undefined,
    additionalEntities: [],
    isBlocked: false,
    accuracy: 0,
    taskCompletionNotificationEmails: [],
    isLearningTasksInsufficient: false,
  };
}

export const Workflow = {
  $type: "pb.v1alpha2.Workflow" as const,

  encode(message: Workflow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.templateResourceName !== undefined && message.templateResourceName !== "") {
      writer.uint32(18).string(message.templateResourceName);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(26).string(message.displayName);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.steps !== undefined && message.steps.length !== 0) {
      for (const v of message.steps) {
        WorkflowStep.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.manualTimeCostInMinutes !== undefined && message.manualTimeCostInMinutes !== 0) {
      writer.uint32(48).int32(message.manualTimeCostInMinutes);
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(58).fork()).ldelim();
    }
    if (message.isTemplate !== undefined && message.isTemplate !== false) {
      writer.uint32(64).bool(message.isTemplate);
    }
    if (message.lastModifiedTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastModifiedTime), writer.uint32(74).fork()).ldelim();
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(80).int32(message.status);
    }
    if (message.organizationResourceName !== undefined && message.organizationResourceName !== "") {
      writer.uint32(90).string(message.organizationResourceName);
    }
    if (message.users !== undefined && message.users.length !== 0) {
      for (const v of message.users) {
        WorkflowUser.encode(v!, writer.uint32(98).fork()).ldelim();
      }
    }
    if (message.temporalWorkflow !== undefined && message.temporalWorkflow !== 0) {
      writer.uint32(104).int32(message.temporalWorkflow);
    }
    if (message.creatorEmail !== undefined && message.creatorEmail !== "") {
      writer.uint32(114).string(message.creatorEmail);
    }
    if (message.mode !== undefined && message.mode !== 0) {
      writer.uint32(120).int32(message.mode);
    }
    if (message.assistedModeConfidenceThreshold !== undefined && message.assistedModeConfidenceThreshold !== 0) {
      writer.uint32(129).double(message.assistedModeConfidenceThreshold);
    }
    if (message.reviewerLists !== undefined && message.reviewerLists.length !== 0) {
      for (const v of message.reviewerLists) {
        ReviewerList.encode(v!, writer.uint32(138).fork()).ldelim();
      }
    }
    if (message.workflowTemplateType !== undefined && message.workflowTemplateType !== 0) {
      writer.uint32(144).int32(message.workflowTemplateType);
    }
    if (message.workflowDebugConfig !== undefined) {
      WorkflowDebugConfig.encode(message.workflowDebugConfig, writer.uint32(154).fork()).ldelim();
    }
    if (message.needAttentionThresholdDefaultMode !== undefined && message.needAttentionThresholdDefaultMode !== 0) {
      writer.uint32(161).double(message.needAttentionThresholdDefaultMode);
    }
    if (message.deletedObjectInfo !== undefined) {
      DeletedObjectInfo.encode(message.deletedObjectInfo, writer.uint32(170).fork()).ldelim();
    }
    if (message.creator !== undefined) {
      UserProfileInfo.encode(message.creator, writer.uint32(178).fork()).ldelim();
    }
    if (message.admins !== undefined && message.admins.length !== 0) {
      for (const v of message.admins) {
        writer.uint32(186).string(v!);
      }
    }
    if (message.adminEmailMessage !== undefined && message.adminEmailMessage !== "") {
      writer.uint32(194).string(message.adminEmailMessage);
    }
    if (message.sendAdminEmail !== undefined && message.sendAdminEmail !== false) {
      writer.uint32(200).bool(message.sendAdminEmail);
    }
    if (message.hyperparameterResourceName !== undefined && message.hyperparameterResourceName !== "") {
      writer.uint32(210).string(message.hyperparameterResourceName);
    }
    if (message.learningSettings !== undefined) {
      WorkflowLearningSettings.encode(message.learningSettings, writer.uint32(218).fork()).ldelim();
    }
    if (message.additionalEntities !== undefined && message.additionalEntities.length !== 0) {
      for (const v of message.additionalEntities) {
        WorkflowAdditionalEntities.encode(v!, writer.uint32(226).fork()).ldelim();
      }
    }
    if (message.isBlocked !== undefined && message.isBlocked !== false) {
      writer.uint32(232).bool(message.isBlocked);
    }
    if (message.accuracy !== undefined && message.accuracy !== 0) {
      writer.uint32(245).float(message.accuracy);
    }
    if (
      message.taskCompletionNotificationEmails !== undefined && message.taskCompletionNotificationEmails.length !== 0
    ) {
      for (const v of message.taskCompletionNotificationEmails) {
        writer.uint32(250).string(v!);
      }
    }
    if (message.isLearningTasksInsufficient !== undefined && message.isLearningTasksInsufficient !== false) {
      writer.uint32(256).bool(message.isLearningTasksInsufficient);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Workflow {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflow();
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

          message.templateResourceName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.steps!.push(WorkflowStep.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.manualTimeCostInMinutes = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.createTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.isTemplate = reader.bool();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.lastModifiedTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.organizationResourceName = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.users!.push(WorkflowUser.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.temporalWorkflow = reader.int32() as any;
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.creatorEmail = reader.string();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
        case 16:
          if (tag !== 129) {
            break;
          }

          message.assistedModeConfidenceThreshold = reader.double();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.reviewerLists!.push(ReviewerList.decode(reader, reader.uint32()));
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.workflowTemplateType = reader.int32() as any;
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.workflowDebugConfig = WorkflowDebugConfig.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 161) {
            break;
          }

          message.needAttentionThresholdDefaultMode = reader.double();
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.deletedObjectInfo = DeletedObjectInfo.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.creator = UserProfileInfo.decode(reader, reader.uint32());
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.admins!.push(reader.string());
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.adminEmailMessage = reader.string();
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.sendAdminEmail = reader.bool();
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.hyperparameterResourceName = reader.string();
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.learningSettings = WorkflowLearningSettings.decode(reader, reader.uint32());
          continue;
        case 28:
          if (tag !== 226) {
            break;
          }

          message.additionalEntities!.push(WorkflowAdditionalEntities.decode(reader, reader.uint32()));
          continue;
        case 29:
          if (tag !== 232) {
            break;
          }

          message.isBlocked = reader.bool();
          continue;
        case 30:
          if (tag !== 245) {
            break;
          }

          message.accuracy = reader.float();
          continue;
        case 31:
          if (tag !== 250) {
            break;
          }

          message.taskCompletionNotificationEmails!.push(reader.string());
          continue;
        case 32:
          if (tag !== 256) {
            break;
          }

          message.isLearningTasksInsufficient = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Workflow {
    return {
      $type: Workflow.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      templateResourceName: isSet(object.templateResourceName) ? globalThis.String(object.templateResourceName) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      steps: globalThis.Array.isArray(object?.steps) ? object.steps.map((e: any) => WorkflowStep.fromJSON(e)) : [],
      manualTimeCostInMinutes: isSet(object.manualTimeCostInMinutes)
        ? globalThis.Number(object.manualTimeCostInMinutes)
        : 0,
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      isTemplate: isSet(object.isTemplate) ? globalThis.Boolean(object.isTemplate) : false,
      lastModifiedTime: isSet(object.lastModifiedTime) ? fromJsonTimestamp(object.lastModifiedTime) : undefined,
      status: isSet(object.status) ? workflowStatusFromJSON(object.status) : 0,
      organizationResourceName: isSet(object.organizationResourceName)
        ? globalThis.String(object.organizationResourceName)
        : "",
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => WorkflowUser.fromJSON(e)) : [],
      temporalWorkflow: isSet(object.temporalWorkflow) ? workflowtemporalWorkflowFromJSON(object.temporalWorkflow) : 0,
      creatorEmail: isSet(object.creatorEmail) ? globalThis.String(object.creatorEmail) : "",
      mode: isSet(object.mode) ? workflowModeFromJSON(object.mode) : 0,
      assistedModeConfidenceThreshold: isSet(object.assistedModeConfidenceThreshold)
        ? globalThis.Number(object.assistedModeConfidenceThreshold)
        : 0,
      reviewerLists: globalThis.Array.isArray(object?.reviewerLists)
        ? object.reviewerLists.map((e: any) => ReviewerList.fromJSON(e))
        : [],
      workflowTemplateType: isSet(object.workflowTemplateType)
        ? workflowTemplateTypeFromJSON(object.workflowTemplateType)
        : 0,
      workflowDebugConfig: isSet(object.workflowDebugConfig)
        ? WorkflowDebugConfig.fromJSON(object.workflowDebugConfig)
        : undefined,
      needAttentionThresholdDefaultMode: isSet(object.needAttentionThresholdDefaultMode)
        ? globalThis.Number(object.needAttentionThresholdDefaultMode)
        : 0,
      deletedObjectInfo: isSet(object.deletedObjectInfo)
        ? DeletedObjectInfo.fromJSON(object.deletedObjectInfo)
        : undefined,
      creator: isSet(object.creator) ? UserProfileInfo.fromJSON(object.creator) : undefined,
      admins: globalThis.Array.isArray(object?.admins)
        ? object.admins.map((e: any) => globalThis.String(e))
        : [],
      adminEmailMessage: isSet(object.adminEmailMessage) ? globalThis.String(object.adminEmailMessage) : "",
      sendAdminEmail: isSet(object.sendAdminEmail) ? globalThis.Boolean(object.sendAdminEmail) : false,
      hyperparameterResourceName: isSet(object.hyperparameterResourceName)
        ? globalThis.String(object.hyperparameterResourceName)
        : "",
      learningSettings: isSet(object.learningSettings)
        ? WorkflowLearningSettings.fromJSON(object.learningSettings)
        : undefined,
      additionalEntities: globalThis.Array.isArray(object?.additionalEntities)
        ? object.additionalEntities.map((e: any) => WorkflowAdditionalEntities.fromJSON(e))
        : [],
      isBlocked: isSet(object.isBlocked) ? globalThis.Boolean(object.isBlocked) : false,
      accuracy: isSet(object.accuracy) ? globalThis.Number(object.accuracy) : 0,
      taskCompletionNotificationEmails: globalThis.Array.isArray(object?.taskCompletionNotificationEmails)
        ? object.taskCompletionNotificationEmails.map((e: any) => globalThis.String(e))
        : [],
      isLearningTasksInsufficient: isSet(object.isLearningTasksInsufficient)
        ? globalThis.Boolean(object.isLearningTasksInsufficient)
        : false,
    };
  },

  toJSON(message: Workflow): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.templateResourceName !== undefined && message.templateResourceName !== "") {
      obj.templateResourceName = message.templateResourceName;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.steps?.length) {
      obj.steps = message.steps.map((e) => WorkflowStep.toJSON(e));
    }
    if (message.manualTimeCostInMinutes !== undefined && message.manualTimeCostInMinutes !== 0) {
      obj.manualTimeCostInMinutes = Math.round(message.manualTimeCostInMinutes);
    }
    if (message.createTime !== undefined) {
      obj.createTime = message.createTime.toISOString();
    }
    if (message.isTemplate !== undefined && message.isTemplate !== false) {
      obj.isTemplate = message.isTemplate;
    }
    if (message.lastModifiedTime !== undefined) {
      obj.lastModifiedTime = message.lastModifiedTime.toISOString();
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = workflowStatusToJSON(message.status);
    }
    if (message.organizationResourceName !== undefined && message.organizationResourceName !== "") {
      obj.organizationResourceName = message.organizationResourceName;
    }
    if (message.users?.length) {
      obj.users = message.users.map((e) => WorkflowUser.toJSON(e));
    }
    if (message.temporalWorkflow !== undefined && message.temporalWorkflow !== 0) {
      obj.temporalWorkflow = workflowtemporalWorkflowToJSON(message.temporalWorkflow);
    }
    if (message.creatorEmail !== undefined && message.creatorEmail !== "") {
      obj.creatorEmail = message.creatorEmail;
    }
    if (message.mode !== undefined && message.mode !== 0) {
      obj.mode = workflowModeToJSON(message.mode);
    }
    if (message.assistedModeConfidenceThreshold !== undefined && message.assistedModeConfidenceThreshold !== 0) {
      obj.assistedModeConfidenceThreshold = message.assistedModeConfidenceThreshold;
    }
    if (message.reviewerLists?.length) {
      obj.reviewerLists = message.reviewerLists.map((e) => ReviewerList.toJSON(e));
    }
    if (message.workflowTemplateType !== undefined && message.workflowTemplateType !== 0) {
      obj.workflowTemplateType = workflowTemplateTypeToJSON(message.workflowTemplateType);
    }
    if (message.workflowDebugConfig !== undefined) {
      obj.workflowDebugConfig = WorkflowDebugConfig.toJSON(message.workflowDebugConfig);
    }
    if (message.needAttentionThresholdDefaultMode !== undefined && message.needAttentionThresholdDefaultMode !== 0) {
      obj.needAttentionThresholdDefaultMode = message.needAttentionThresholdDefaultMode;
    }
    if (message.deletedObjectInfo !== undefined) {
      obj.deletedObjectInfo = DeletedObjectInfo.toJSON(message.deletedObjectInfo);
    }
    if (message.creator !== undefined) {
      obj.creator = UserProfileInfo.toJSON(message.creator);
    }
    if (message.admins?.length) {
      obj.admins = message.admins;
    }
    if (message.adminEmailMessage !== undefined && message.adminEmailMessage !== "") {
      obj.adminEmailMessage = message.adminEmailMessage;
    }
    if (message.sendAdminEmail !== undefined && message.sendAdminEmail !== false) {
      obj.sendAdminEmail = message.sendAdminEmail;
    }
    if (message.hyperparameterResourceName !== undefined && message.hyperparameterResourceName !== "") {
      obj.hyperparameterResourceName = message.hyperparameterResourceName;
    }
    if (message.learningSettings !== undefined) {
      obj.learningSettings = WorkflowLearningSettings.toJSON(message.learningSettings);
    }
    if (message.additionalEntities?.length) {
      obj.additionalEntities = message.additionalEntities.map((e) => WorkflowAdditionalEntities.toJSON(e));
    }
    if (message.isBlocked !== undefined && message.isBlocked !== false) {
      obj.isBlocked = message.isBlocked;
    }
    if (message.accuracy !== undefined && message.accuracy !== 0) {
      obj.accuracy = message.accuracy;
    }
    if (message.taskCompletionNotificationEmails?.length) {
      obj.taskCompletionNotificationEmails = message.taskCompletionNotificationEmails;
    }
    if (message.isLearningTasksInsufficient !== undefined && message.isLearningTasksInsufficient !== false) {
      obj.isLearningTasksInsufficient = message.isLearningTasksInsufficient;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Workflow>, I>>(base?: I): Workflow {
    return Workflow.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Workflow>, I>>(object: I): Workflow {
    const message = createBaseWorkflow();
    message.name = object.name ?? "";
    message.templateResourceName = object.templateResourceName ?? "";
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.steps = object.steps?.map((e) => WorkflowStep.fromPartial(e)) || [];
    message.manualTimeCostInMinutes = object.manualTimeCostInMinutes ?? 0;
    message.createTime = object.createTime ?? undefined;
    message.isTemplate = object.isTemplate ?? false;
    message.lastModifiedTime = object.lastModifiedTime ?? undefined;
    message.status = object.status ?? 0;
    message.organizationResourceName = object.organizationResourceName ?? "";
    message.users = object.users?.map((e) => WorkflowUser.fromPartial(e)) || [];
    message.temporalWorkflow = object.temporalWorkflow ?? 0;
    message.creatorEmail = object.creatorEmail ?? "";
    message.mode = object.mode ?? 0;
    message.assistedModeConfidenceThreshold = object.assistedModeConfidenceThreshold ?? 0;
    message.reviewerLists = object.reviewerLists?.map((e) => ReviewerList.fromPartial(e)) || [];
    message.workflowTemplateType = object.workflowTemplateType ?? 0;
    message.workflowDebugConfig = (object.workflowDebugConfig !== undefined && object.workflowDebugConfig !== null)
      ? WorkflowDebugConfig.fromPartial(object.workflowDebugConfig)
      : undefined;
    message.needAttentionThresholdDefaultMode = object.needAttentionThresholdDefaultMode ?? 0;
    message.deletedObjectInfo = (object.deletedObjectInfo !== undefined && object.deletedObjectInfo !== null)
      ? DeletedObjectInfo.fromPartial(object.deletedObjectInfo)
      : undefined;
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? UserProfileInfo.fromPartial(object.creator)
      : undefined;
    message.admins = object.admins?.map((e) => e) || [];
    message.adminEmailMessage = object.adminEmailMessage ?? "";
    message.sendAdminEmail = object.sendAdminEmail ?? false;
    message.hyperparameterResourceName = object.hyperparameterResourceName ?? "";
    message.learningSettings = (object.learningSettings !== undefined && object.learningSettings !== null)
      ? WorkflowLearningSettings.fromPartial(object.learningSettings)
      : undefined;
    message.additionalEntities = object.additionalEntities?.map((e) => WorkflowAdditionalEntities.fromPartial(e)) || [];
    message.isBlocked = object.isBlocked ?? false;
    message.accuracy = object.accuracy ?? 0;
    message.taskCompletionNotificationEmails = object.taskCompletionNotificationEmails?.map((e) => e) || [];
    message.isLearningTasksInsufficient = object.isLearningTasksInsufficient ?? false;
    return message;
  },
};

messageTypeRegistry.set(Workflow.$type, Workflow);

function createBaseWorkflowAdditionalEntities(): WorkflowAdditionalEntities {
  return {
    $type: "pb.v1alpha2.WorkflowAdditionalEntities",
    taskResourceName: "",
    taskDisplayName: "",
    creator: undefined,
    createTime: undefined,
    entitiesDetails: [],
  };
}

export const WorkflowAdditionalEntities = {
  $type: "pb.v1alpha2.WorkflowAdditionalEntities" as const,

  encode(message: WorkflowAdditionalEntities, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.taskResourceName !== undefined && message.taskResourceName !== "") {
      writer.uint32(10).string(message.taskResourceName);
    }
    if (message.taskDisplayName !== undefined && message.taskDisplayName !== "") {
      writer.uint32(18).string(message.taskDisplayName);
    }
    if (message.creator !== undefined) {
      UserProfileInfo.encode(message.creator, writer.uint32(26).fork()).ldelim();
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.entitiesDetails !== undefined && message.entitiesDetails.length !== 0) {
      for (const v of message.entitiesDetails) {
        EntityDetails.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowAdditionalEntities {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowAdditionalEntities();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.taskResourceName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.taskDisplayName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.creator = UserProfileInfo.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.createTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.entitiesDetails!.push(EntityDetails.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowAdditionalEntities {
    return {
      $type: WorkflowAdditionalEntities.$type,
      taskResourceName: isSet(object.taskResourceName) ? globalThis.String(object.taskResourceName) : "",
      taskDisplayName: isSet(object.taskDisplayName) ? globalThis.String(object.taskDisplayName) : "",
      creator: isSet(object.creator) ? UserProfileInfo.fromJSON(object.creator) : undefined,
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      entitiesDetails: globalThis.Array.isArray(object?.entitiesDetails)
        ? object.entitiesDetails.map((e: any) => EntityDetails.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WorkflowAdditionalEntities): unknown {
    const obj: any = {};
    if (message.taskResourceName !== undefined && message.taskResourceName !== "") {
      obj.taskResourceName = message.taskResourceName;
    }
    if (message.taskDisplayName !== undefined && message.taskDisplayName !== "") {
      obj.taskDisplayName = message.taskDisplayName;
    }
    if (message.creator !== undefined) {
      obj.creator = UserProfileInfo.toJSON(message.creator);
    }
    if (message.createTime !== undefined) {
      obj.createTime = message.createTime.toISOString();
    }
    if (message.entitiesDetails?.length) {
      obj.entitiesDetails = message.entitiesDetails.map((e) => EntityDetails.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowAdditionalEntities>, I>>(base?: I): WorkflowAdditionalEntities {
    return WorkflowAdditionalEntities.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowAdditionalEntities>, I>>(object: I): WorkflowAdditionalEntities {
    const message = createBaseWorkflowAdditionalEntities();
    message.taskResourceName = object.taskResourceName ?? "";
    message.taskDisplayName = object.taskDisplayName ?? "";
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? UserProfileInfo.fromPartial(object.creator)
      : undefined;
    message.createTime = object.createTime ?? undefined;
    message.entitiesDetails = object.entitiesDetails?.map((e) => EntityDetails.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(WorkflowAdditionalEntities.$type, WorkflowAdditionalEntities);

function createBaseWorkflowDebugConfig(): WorkflowDebugConfig {
  return {
    $type: "pb.v1alpha2.WorkflowDebugConfig",
    bypassCache: false,
    dbQueryLimit: 0,
    includeAutopilotModeTasks: false,
    bypassQuota: false,
  };
}

export const WorkflowDebugConfig = {
  $type: "pb.v1alpha2.WorkflowDebugConfig" as const,

  encode(message: WorkflowDebugConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bypassCache !== undefined && message.bypassCache !== false) {
      writer.uint32(8).bool(message.bypassCache);
    }
    if (message.dbQueryLimit !== undefined && message.dbQueryLimit !== 0) {
      writer.uint32(16).int32(message.dbQueryLimit);
    }
    if (message.includeAutopilotModeTasks !== undefined && message.includeAutopilotModeTasks !== false) {
      writer.uint32(24).bool(message.includeAutopilotModeTasks);
    }
    if (message.bypassQuota !== undefined && message.bypassQuota !== false) {
      writer.uint32(32).bool(message.bypassQuota);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowDebugConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowDebugConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.bypassCache = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.dbQueryLimit = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.includeAutopilotModeTasks = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.bypassQuota = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowDebugConfig {
    return {
      $type: WorkflowDebugConfig.$type,
      bypassCache: isSet(object.bypassCache) ? globalThis.Boolean(object.bypassCache) : false,
      dbQueryLimit: isSet(object.dbQueryLimit) ? globalThis.Number(object.dbQueryLimit) : 0,
      includeAutopilotModeTasks: isSet(object.includeAutopilotModeTasks)
        ? globalThis.Boolean(object.includeAutopilotModeTasks)
        : false,
      bypassQuota: isSet(object.bypassQuota) ? globalThis.Boolean(object.bypassQuota) : false,
    };
  },

  toJSON(message: WorkflowDebugConfig): unknown {
    const obj: any = {};
    if (message.bypassCache !== undefined && message.bypassCache !== false) {
      obj.bypassCache = message.bypassCache;
    }
    if (message.dbQueryLimit !== undefined && message.dbQueryLimit !== 0) {
      obj.dbQueryLimit = Math.round(message.dbQueryLimit);
    }
    if (message.includeAutopilotModeTasks !== undefined && message.includeAutopilotModeTasks !== false) {
      obj.includeAutopilotModeTasks = message.includeAutopilotModeTasks;
    }
    if (message.bypassQuota !== undefined && message.bypassQuota !== false) {
      obj.bypassQuota = message.bypassQuota;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowDebugConfig>, I>>(base?: I): WorkflowDebugConfig {
    return WorkflowDebugConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowDebugConfig>, I>>(object: I): WorkflowDebugConfig {
    const message = createBaseWorkflowDebugConfig();
    message.bypassCache = object.bypassCache ?? false;
    message.dbQueryLimit = object.dbQueryLimit ?? 0;
    message.includeAutopilotModeTasks = object.includeAutopilotModeTasks ?? false;
    message.bypassQuota = object.bypassQuota ?? false;
    return message;
  },
};

messageTypeRegistry.set(WorkflowDebugConfig.$type, WorkflowDebugConfig);

function createBaseWorkflowStep(): WorkflowStep {
  return { $type: "pb.v1alpha2.WorkflowStep", triggers: [], actions: [] };
}

export const WorkflowStep = {
  $type: "pb.v1alpha2.WorkflowStep" as const,

  encode(message: WorkflowStep, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.triggers !== undefined && message.triggers.length !== 0) {
      for (const v of message.triggers) {
        WorkflowStepWorkflowTrigger.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.actions !== undefined && message.actions.length !== 0) {
      for (const v of message.actions) {
        WorkflowStepWorkflowAction.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowStep {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowStep();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.triggers!.push(WorkflowStepWorkflowTrigger.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.actions!.push(WorkflowStepWorkflowAction.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowStep {
    return {
      $type: WorkflowStep.$type,
      triggers: globalThis.Array.isArray(object?.triggers)
        ? object.triggers.map((e: any) => WorkflowStepWorkflowTrigger.fromJSON(e))
        : [],
      actions: globalThis.Array.isArray(object?.actions)
        ? object.actions.map((e: any) => WorkflowStepWorkflowAction.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WorkflowStep): unknown {
    const obj: any = {};
    if (message.triggers?.length) {
      obj.triggers = message.triggers.map((e) => WorkflowStepWorkflowTrigger.toJSON(e));
    }
    if (message.actions?.length) {
      obj.actions = message.actions.map((e) => WorkflowStepWorkflowAction.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowStep>, I>>(base?: I): WorkflowStep {
    return WorkflowStep.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowStep>, I>>(object: I): WorkflowStep {
    const message = createBaseWorkflowStep();
    message.triggers = object.triggers?.map((e) => WorkflowStepWorkflowTrigger.fromPartial(e)) || [];
    message.actions = object.actions?.map((e) => WorkflowStepWorkflowAction.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(WorkflowStep.$type, WorkflowStep);

function createBaseWorkflowStepWorkflowAction(): WorkflowStepWorkflowAction {
  return {
    $type: "pb.v1alpha2.WorkflowStep.WorkflowAction",
    application: "",
    gdrive: undefined,
    gsheets: undefined,
    gmail: undefined,
    classification: undefined,
    sftp: undefined,
    entityExtraction: undefined,
    generateOutputParam: undefined,
    spreadsheet: undefined,
    email: undefined,
  };
}

export const WorkflowStepWorkflowAction = {
  $type: "pb.v1alpha2.WorkflowStep.WorkflowAction" as const,

  encode(message: WorkflowStepWorkflowAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.application !== undefined && message.application !== "") {
      writer.uint32(10).string(message.application);
    }
    if (message.gdrive !== undefined) {
      GDriveParam.encode(message.gdrive, writer.uint32(18).fork()).ldelim();
    }
    if (message.gsheets !== undefined) {
      GSheetsParam.encode(message.gsheets, writer.uint32(26).fork()).ldelim();
    }
    if (message.gmail !== undefined) {
      GmailParam.encode(message.gmail, writer.uint32(34).fork()).ldelim();
    }
    if (message.classification !== undefined) {
      DocClassificationParam.encode(message.classification, writer.uint32(42).fork()).ldelim();
    }
    if (message.sftp !== undefined) {
      SFTPParam.encode(message.sftp, writer.uint32(50).fork()).ldelim();
    }
    if (message.entityExtraction !== undefined) {
      EntityExtractionParam.encode(message.entityExtraction, writer.uint32(58).fork()).ldelim();
    }
    if (message.generateOutputParam !== undefined) {
      GenerateOutputParam.encode(message.generateOutputParam, writer.uint32(66).fork()).ldelim();
    }
    if (message.spreadsheet !== undefined) {
      SpreadsheetParam.encode(message.spreadsheet, writer.uint32(74).fork()).ldelim();
    }
    if (message.email !== undefined) {
      EmailParam.encode(message.email, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowStepWorkflowAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowStepWorkflowAction();
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

          message.gdrive = GDriveParam.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.gsheets = GSheetsParam.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.gmail = GmailParam.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.classification = DocClassificationParam.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.sftp = SFTPParam.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.entityExtraction = EntityExtractionParam.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.generateOutputParam = GenerateOutputParam.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.spreadsheet = SpreadsheetParam.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.email = EmailParam.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowStepWorkflowAction {
    return {
      $type: WorkflowStepWorkflowAction.$type,
      application: isSet(object.application) ? globalThis.String(object.application) : "",
      gdrive: isSet(object.gdrive) ? GDriveParam.fromJSON(object.gdrive) : undefined,
      gsheets: isSet(object.gsheets) ? GSheetsParam.fromJSON(object.gsheets) : undefined,
      gmail: isSet(object.gmail) ? GmailParam.fromJSON(object.gmail) : undefined,
      classification: isSet(object.classification) ? DocClassificationParam.fromJSON(object.classification) : undefined,
      sftp: isSet(object.sftp) ? SFTPParam.fromJSON(object.sftp) : undefined,
      entityExtraction: isSet(object.entityExtraction)
        ? EntityExtractionParam.fromJSON(object.entityExtraction)
        : undefined,
      generateOutputParam: isSet(object.generateOutputParam)
        ? GenerateOutputParam.fromJSON(object.generateOutputParam)
        : undefined,
      spreadsheet: isSet(object.spreadsheet) ? SpreadsheetParam.fromJSON(object.spreadsheet) : undefined,
      email: isSet(object.email) ? EmailParam.fromJSON(object.email) : undefined,
    };
  },

  toJSON(message: WorkflowStepWorkflowAction): unknown {
    const obj: any = {};
    if (message.application !== undefined && message.application !== "") {
      obj.application = message.application;
    }
    if (message.gdrive !== undefined) {
      obj.gdrive = GDriveParam.toJSON(message.gdrive);
    }
    if (message.gsheets !== undefined) {
      obj.gsheets = GSheetsParam.toJSON(message.gsheets);
    }
    if (message.gmail !== undefined) {
      obj.gmail = GmailParam.toJSON(message.gmail);
    }
    if (message.classification !== undefined) {
      obj.classification = DocClassificationParam.toJSON(message.classification);
    }
    if (message.sftp !== undefined) {
      obj.sftp = SFTPParam.toJSON(message.sftp);
    }
    if (message.entityExtraction !== undefined) {
      obj.entityExtraction = EntityExtractionParam.toJSON(message.entityExtraction);
    }
    if (message.generateOutputParam !== undefined) {
      obj.generateOutputParam = GenerateOutputParam.toJSON(message.generateOutputParam);
    }
    if (message.spreadsheet !== undefined) {
      obj.spreadsheet = SpreadsheetParam.toJSON(message.spreadsheet);
    }
    if (message.email !== undefined) {
      obj.email = EmailParam.toJSON(message.email);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowStepWorkflowAction>, I>>(base?: I): WorkflowStepWorkflowAction {
    return WorkflowStepWorkflowAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowStepWorkflowAction>, I>>(object: I): WorkflowStepWorkflowAction {
    const message = createBaseWorkflowStepWorkflowAction();
    message.application = object.application ?? "";
    message.gdrive = (object.gdrive !== undefined && object.gdrive !== null)
      ? GDriveParam.fromPartial(object.gdrive)
      : undefined;
    message.gsheets = (object.gsheets !== undefined && object.gsheets !== null)
      ? GSheetsParam.fromPartial(object.gsheets)
      : undefined;
    message.gmail = (object.gmail !== undefined && object.gmail !== null)
      ? GmailParam.fromPartial(object.gmail)
      : undefined;
    message.classification = (object.classification !== undefined && object.classification !== null)
      ? DocClassificationParam.fromPartial(object.classification)
      : undefined;
    message.sftp = (object.sftp !== undefined && object.sftp !== null) ? SFTPParam.fromPartial(object.sftp) : undefined;
    message.entityExtraction = (object.entityExtraction !== undefined && object.entityExtraction !== null)
      ? EntityExtractionParam.fromPartial(object.entityExtraction)
      : undefined;
    message.generateOutputParam = (object.generateOutputParam !== undefined && object.generateOutputParam !== null)
      ? GenerateOutputParam.fromPartial(object.generateOutputParam)
      : undefined;
    message.spreadsheet = (object.spreadsheet !== undefined && object.spreadsheet !== null)
      ? SpreadsheetParam.fromPartial(object.spreadsheet)
      : undefined;
    message.email = (object.email !== undefined && object.email !== null)
      ? EmailParam.fromPartial(object.email)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(WorkflowStepWorkflowAction.$type, WorkflowStepWorkflowAction);

function createBaseWorkflowStepWorkflowTrigger(): WorkflowStepWorkflowTrigger {
  return {
    $type: "pb.v1alpha2.WorkflowStep.WorkflowTrigger",
    application: "",
    gdrive: undefined,
    gsheets: undefined,
    gmail: undefined,
    sftp: undefined,
    spreadsheet: undefined,
    email: undefined,
  };
}

export const WorkflowStepWorkflowTrigger = {
  $type: "pb.v1alpha2.WorkflowStep.WorkflowTrigger" as const,

  encode(message: WorkflowStepWorkflowTrigger, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.application !== undefined && message.application !== "") {
      writer.uint32(10).string(message.application);
    }
    if (message.gdrive !== undefined) {
      GDriveParam.encode(message.gdrive, writer.uint32(18).fork()).ldelim();
    }
    if (message.gsheets !== undefined) {
      GSheetsParam.encode(message.gsheets, writer.uint32(26).fork()).ldelim();
    }
    if (message.gmail !== undefined) {
      GmailParam.encode(message.gmail, writer.uint32(34).fork()).ldelim();
    }
    if (message.sftp !== undefined) {
      SFTPParam.encode(message.sftp, writer.uint32(42).fork()).ldelim();
    }
    if (message.spreadsheet !== undefined) {
      SpreadsheetParam.encode(message.spreadsheet, writer.uint32(50).fork()).ldelim();
    }
    if (message.email !== undefined) {
      EmailParam.encode(message.email, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowStepWorkflowTrigger {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowStepWorkflowTrigger();
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

          message.gdrive = GDriveParam.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.gsheets = GSheetsParam.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.gmail = GmailParam.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sftp = SFTPParam.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.spreadsheet = SpreadsheetParam.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.email = EmailParam.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowStepWorkflowTrigger {
    return {
      $type: WorkflowStepWorkflowTrigger.$type,
      application: isSet(object.application) ? globalThis.String(object.application) : "",
      gdrive: isSet(object.gdrive) ? GDriveParam.fromJSON(object.gdrive) : undefined,
      gsheets: isSet(object.gsheets) ? GSheetsParam.fromJSON(object.gsheets) : undefined,
      gmail: isSet(object.gmail) ? GmailParam.fromJSON(object.gmail) : undefined,
      sftp: isSet(object.sftp) ? SFTPParam.fromJSON(object.sftp) : undefined,
      spreadsheet: isSet(object.spreadsheet) ? SpreadsheetParam.fromJSON(object.spreadsheet) : undefined,
      email: isSet(object.email) ? EmailParam.fromJSON(object.email) : undefined,
    };
  },

  toJSON(message: WorkflowStepWorkflowTrigger): unknown {
    const obj: any = {};
    if (message.application !== undefined && message.application !== "") {
      obj.application = message.application;
    }
    if (message.gdrive !== undefined) {
      obj.gdrive = GDriveParam.toJSON(message.gdrive);
    }
    if (message.gsheets !== undefined) {
      obj.gsheets = GSheetsParam.toJSON(message.gsheets);
    }
    if (message.gmail !== undefined) {
      obj.gmail = GmailParam.toJSON(message.gmail);
    }
    if (message.sftp !== undefined) {
      obj.sftp = SFTPParam.toJSON(message.sftp);
    }
    if (message.spreadsheet !== undefined) {
      obj.spreadsheet = SpreadsheetParam.toJSON(message.spreadsheet);
    }
    if (message.email !== undefined) {
      obj.email = EmailParam.toJSON(message.email);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowStepWorkflowTrigger>, I>>(base?: I): WorkflowStepWorkflowTrigger {
    return WorkflowStepWorkflowTrigger.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowStepWorkflowTrigger>, I>>(object: I): WorkflowStepWorkflowTrigger {
    const message = createBaseWorkflowStepWorkflowTrigger();
    message.application = object.application ?? "";
    message.gdrive = (object.gdrive !== undefined && object.gdrive !== null)
      ? GDriveParam.fromPartial(object.gdrive)
      : undefined;
    message.gsheets = (object.gsheets !== undefined && object.gsheets !== null)
      ? GSheetsParam.fromPartial(object.gsheets)
      : undefined;
    message.gmail = (object.gmail !== undefined && object.gmail !== null)
      ? GmailParam.fromPartial(object.gmail)
      : undefined;
    message.sftp = (object.sftp !== undefined && object.sftp !== null) ? SFTPParam.fromPartial(object.sftp) : undefined;
    message.spreadsheet = (object.spreadsheet !== undefined && object.spreadsheet !== null)
      ? SpreadsheetParam.fromPartial(object.spreadsheet)
      : undefined;
    message.email = (object.email !== undefined && object.email !== null)
      ? EmailParam.fromPartial(object.email)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(WorkflowStepWorkflowTrigger.$type, WorkflowStepWorkflowTrigger);

function createBaseDeleteWorkflowResponse(): DeleteWorkflowResponse {
  return { $type: "pb.v1alpha2.DeleteWorkflowResponse", temporalWorkflowId: "" };
}

export const DeleteWorkflowResponse = {
  $type: "pb.v1alpha2.DeleteWorkflowResponse" as const,

  encode(message: DeleteWorkflowResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.temporalWorkflowId !== undefined && message.temporalWorkflowId !== "") {
      writer.uint32(10).string(message.temporalWorkflowId);
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

          message.temporalWorkflowId = reader.string();
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
      temporalWorkflowId: isSet(object.temporalWorkflowId) ? globalThis.String(object.temporalWorkflowId) : "",
    };
  },

  toJSON(message: DeleteWorkflowResponse): unknown {
    const obj: any = {};
    if (message.temporalWorkflowId !== undefined && message.temporalWorkflowId !== "") {
      obj.temporalWorkflowId = message.temporalWorkflowId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteWorkflowResponse>, I>>(base?: I): DeleteWorkflowResponse {
    return DeleteWorkflowResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteWorkflowResponse>, I>>(object: I): DeleteWorkflowResponse {
    const message = createBaseDeleteWorkflowResponse();
    message.temporalWorkflowId = object.temporalWorkflowId ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteWorkflowResponse.$type, DeleteWorkflowResponse);

function createBaseWorkflowLearningSettingsReviewer(): WorkflowLearningSettingsReviewer {
  return {
    $type: "pb.v1alpha2.WorkflowLearningSettingsReviewer",
    reviewer: undefined,
    existsInReviewerList: false,
    usedForLearning: false,
  };
}

export const WorkflowLearningSettingsReviewer = {
  $type: "pb.v1alpha2.WorkflowLearningSettingsReviewer" as const,

  encode(message: WorkflowLearningSettingsReviewer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reviewer !== undefined) {
      UserProfileInfo.encode(message.reviewer, writer.uint32(10).fork()).ldelim();
    }
    if (message.existsInReviewerList !== undefined && message.existsInReviewerList !== false) {
      writer.uint32(16).bool(message.existsInReviewerList);
    }
    if (message.usedForLearning !== undefined && message.usedForLearning !== false) {
      writer.uint32(24).bool(message.usedForLearning);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowLearningSettingsReviewer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowLearningSettingsReviewer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.reviewer = UserProfileInfo.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.existsInReviewerList = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.usedForLearning = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowLearningSettingsReviewer {
    return {
      $type: WorkflowLearningSettingsReviewer.$type,
      reviewer: isSet(object.reviewer) ? UserProfileInfo.fromJSON(object.reviewer) : undefined,
      existsInReviewerList: isSet(object.existsInReviewerList)
        ? globalThis.Boolean(object.existsInReviewerList)
        : false,
      usedForLearning: isSet(object.usedForLearning) ? globalThis.Boolean(object.usedForLearning) : false,
    };
  },

  toJSON(message: WorkflowLearningSettingsReviewer): unknown {
    const obj: any = {};
    if (message.reviewer !== undefined) {
      obj.reviewer = UserProfileInfo.toJSON(message.reviewer);
    }
    if (message.existsInReviewerList !== undefined && message.existsInReviewerList !== false) {
      obj.existsInReviewerList = message.existsInReviewerList;
    }
    if (message.usedForLearning !== undefined && message.usedForLearning !== false) {
      obj.usedForLearning = message.usedForLearning;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowLearningSettingsReviewer>, I>>(
    base?: I,
  ): WorkflowLearningSettingsReviewer {
    return WorkflowLearningSettingsReviewer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowLearningSettingsReviewer>, I>>(
    object: I,
  ): WorkflowLearningSettingsReviewer {
    const message = createBaseWorkflowLearningSettingsReviewer();
    message.reviewer = (object.reviewer !== undefined && object.reviewer !== null)
      ? UserProfileInfo.fromPartial(object.reviewer)
      : undefined;
    message.existsInReviewerList = object.existsInReviewerList ?? false;
    message.usedForLearning = object.usedForLearning ?? false;
    return message;
  },
};

messageTypeRegistry.set(WorkflowLearningSettingsReviewer.$type, WorkflowLearningSettingsReviewer);

function createBaseWorkflowLearningSettings(): WorkflowLearningSettings {
  return { $type: "pb.v1alpha2.WorkflowLearningSettings", reviewers: [] };
}

export const WorkflowLearningSettings = {
  $type: "pb.v1alpha2.WorkflowLearningSettings" as const,

  encode(message: WorkflowLearningSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reviewers !== undefined && message.reviewers.length !== 0) {
      for (const v of message.reviewers) {
        WorkflowLearningSettingsReviewer.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowLearningSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowLearningSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.reviewers!.push(WorkflowLearningSettingsReviewer.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowLearningSettings {
    return {
      $type: WorkflowLearningSettings.$type,
      reviewers: globalThis.Array.isArray(object?.reviewers)
        ? object.reviewers.map((e: any) => WorkflowLearningSettingsReviewer.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WorkflowLearningSettings): unknown {
    const obj: any = {};
    if (message.reviewers?.length) {
      obj.reviewers = message.reviewers.map((e) => WorkflowLearningSettingsReviewer.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowLearningSettings>, I>>(base?: I): WorkflowLearningSettings {
    return WorkflowLearningSettings.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowLearningSettings>, I>>(object: I): WorkflowLearningSettings {
    const message = createBaseWorkflowLearningSettings();
    message.reviewers = object.reviewers?.map((e) => WorkflowLearningSettingsReviewer.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(WorkflowLearningSettings.$type, WorkflowLearningSettings);

function createBaseWorkflowField(): WorkflowField {
  return { $type: "pb.v1alpha2.WorkflowField", name: "", workflowDisplayName: "", childFields: [], accuracy: 0 };
}

export const WorkflowField = {
  $type: "pb.v1alpha2.WorkflowField" as const,

  encode(message: WorkflowField, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.workflowDisplayName !== undefined && message.workflowDisplayName !== "") {
      writer.uint32(18).string(message.workflowDisplayName);
    }
    if (message.childFields !== undefined && message.childFields.length !== 0) {
      for (const v of message.childFields) {
        WorkflowField.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.accuracy !== undefined && message.accuracy !== 0) {
      writer.uint32(32).int32(message.accuracy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowField {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowField();
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

          message.workflowDisplayName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.childFields!.push(WorkflowField.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.accuracy = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowField {
    return {
      $type: WorkflowField.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      workflowDisplayName: isSet(object.workflowDisplayName) ? globalThis.String(object.workflowDisplayName) : "",
      childFields: globalThis.Array.isArray(object?.childFields)
        ? object.childFields.map((e: any) => WorkflowField.fromJSON(e))
        : [],
      accuracy: isSet(object.accuracy) ? globalThis.Number(object.accuracy) : 0,
    };
  },

  toJSON(message: WorkflowField): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.workflowDisplayName !== undefined && message.workflowDisplayName !== "") {
      obj.workflowDisplayName = message.workflowDisplayName;
    }
    if (message.childFields?.length) {
      obj.childFields = message.childFields.map((e) => WorkflowField.toJSON(e));
    }
    if (message.accuracy !== undefined && message.accuracy !== 0) {
      obj.accuracy = Math.round(message.accuracy);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowField>, I>>(base?: I): WorkflowField {
    return WorkflowField.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowField>, I>>(object: I): WorkflowField {
    const message = createBaseWorkflowField();
    message.name = object.name ?? "";
    message.workflowDisplayName = object.workflowDisplayName ?? "";
    message.childFields = object.childFields?.map((e) => WorkflowField.fromPartial(e)) || [];
    message.accuracy = object.accuracy ?? 0;
    return message;
  },
};

messageTypeRegistry.set(WorkflowField.$type, WorkflowField);

function createBaseListWorkflowFieldsFilter(): ListWorkflowFieldsFilter {
  return {
    $type: "pb.v1alpha2.ListWorkflowFieldsFilter",
    namePrefix: "",
    type: 0,
    workflowResourceNames: [],
    timeLt: undefined,
    timeGt: undefined,
  };
}

export const ListWorkflowFieldsFilter = {
  $type: "pb.v1alpha2.ListWorkflowFieldsFilter" as const,

  encode(message: ListWorkflowFieldsFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.namePrefix !== undefined && message.namePrefix !== "") {
      writer.uint32(10).string(message.namePrefix);
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.workflowResourceNames !== undefined && message.workflowResourceNames.length !== 0) {
      for (const v of message.workflowResourceNames) {
        writer.uint32(26).string(v!);
      }
    }
    if (message.timeLt !== undefined) {
      Timestamp.encode(toTimestamp(message.timeLt), writer.uint32(34).fork()).ldelim();
    }
    if (message.timeGt !== undefined) {
      Timestamp.encode(toTimestamp(message.timeGt), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowFieldsFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowFieldsFilter();
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

          message.type = reader.int32() as any;
          continue;
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

          message.timeLt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.timeGt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListWorkflowFieldsFilter {
    return {
      $type: ListWorkflowFieldsFilter.$type,
      namePrefix: isSet(object.namePrefix) ? globalThis.String(object.namePrefix) : "",
      type: isSet(object.type) ? listWorkflowFieldsFilterTypeFromJSON(object.type) : 0,
      workflowResourceNames: globalThis.Array.isArray(object?.workflowResourceNames)
        ? object.workflowResourceNames.map((e: any) => globalThis.String(e))
        : [],
      timeLt: isSet(object.timeLt) ? fromJsonTimestamp(object.timeLt) : undefined,
      timeGt: isSet(object.timeGt) ? fromJsonTimestamp(object.timeGt) : undefined,
    };
  },

  toJSON(message: ListWorkflowFieldsFilter): unknown {
    const obj: any = {};
    if (message.namePrefix !== undefined && message.namePrefix !== "") {
      obj.namePrefix = message.namePrefix;
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = listWorkflowFieldsFilterTypeToJSON(message.type);
    }
    if (message.workflowResourceNames?.length) {
      obj.workflowResourceNames = message.workflowResourceNames;
    }
    if (message.timeLt !== undefined) {
      obj.timeLt = message.timeLt.toISOString();
    }
    if (message.timeGt !== undefined) {
      obj.timeGt = message.timeGt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowFieldsFilter>, I>>(base?: I): ListWorkflowFieldsFilter {
    return ListWorkflowFieldsFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowFieldsFilter>, I>>(object: I): ListWorkflowFieldsFilter {
    const message = createBaseListWorkflowFieldsFilter();
    message.namePrefix = object.namePrefix ?? "";
    message.type = object.type ?? 0;
    message.workflowResourceNames = object.workflowResourceNames?.map((e) => e) || [];
    message.timeLt = object.timeLt ?? undefined;
    message.timeGt = object.timeGt ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowFieldsFilter.$type, ListWorkflowFieldsFilter);

function createBaseListWorkflowFieldsRequest(): ListWorkflowFieldsRequest {
  return {
    $type: "pb.v1alpha2.ListWorkflowFieldsRequest",
    orgResourceName: "",
    pageSize: 0,
    pageNumber: 0,
    filter: undefined,
    sorts: [],
  };
}

export const ListWorkflowFieldsRequest = {
  $type: "pb.v1alpha2.ListWorkflowFieldsRequest" as const,

  encode(message: ListWorkflowFieldsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(10).string(message.orgResourceName);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(24).int32(message.pageNumber);
    }
    if (message.filter !== undefined) {
      ListWorkflowFieldsFilter.encode(message.filter, writer.uint32(34).fork()).ldelim();
    }
    if (message.sorts !== undefined && message.sorts.length !== 0) {
      for (const v of message.sorts) {
        SortField.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowFieldsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowFieldsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgResourceName = reader.string();
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

          message.filter = ListWorkflowFieldsFilter.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sorts!.push(SortField.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListWorkflowFieldsRequest {
    return {
      $type: ListWorkflowFieldsRequest.$type,
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      filter: isSet(object.filter) ? ListWorkflowFieldsFilter.fromJSON(object.filter) : undefined,
      sorts: globalThis.Array.isArray(object?.sorts) ? object.sorts.map((e: any) => SortField.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListWorkflowFieldsRequest): unknown {
    const obj: any = {};
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.filter !== undefined) {
      obj.filter = ListWorkflowFieldsFilter.toJSON(message.filter);
    }
    if (message.sorts?.length) {
      obj.sorts = message.sorts.map((e) => SortField.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowFieldsRequest>, I>>(base?: I): ListWorkflowFieldsRequest {
    return ListWorkflowFieldsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowFieldsRequest>, I>>(object: I): ListWorkflowFieldsRequest {
    const message = createBaseListWorkflowFieldsRequest();
    message.orgResourceName = object.orgResourceName ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? ListWorkflowFieldsFilter.fromPartial(object.filter)
      : undefined;
    message.sorts = object.sorts?.map((e) => SortField.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowFieldsRequest.$type, ListWorkflowFieldsRequest);

function createBaseListWorkflowFieldsResponse(): ListWorkflowFieldsResponse {
  return { $type: "pb.v1alpha2.ListWorkflowFieldsResponse", fields: [], totalSize: 0 };
}

export const ListWorkflowFieldsResponse = {
  $type: "pb.v1alpha2.ListWorkflowFieldsResponse" as const,

  encode(message: ListWorkflowFieldsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        WorkflowField.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(16).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowFieldsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowFieldsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fields!.push(WorkflowField.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListWorkflowFieldsResponse {
    return {
      $type: ListWorkflowFieldsResponse.$type,
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => WorkflowField.fromJSON(e)) : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListWorkflowFieldsResponse): unknown {
    const obj: any = {};
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => WorkflowField.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowFieldsResponse>, I>>(base?: I): ListWorkflowFieldsResponse {
    return ListWorkflowFieldsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowFieldsResponse>, I>>(object: I): ListWorkflowFieldsResponse {
    const message = createBaseListWorkflowFieldsResponse();
    message.fields = object.fields?.map((e) => WorkflowField.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowFieldsResponse.$type, ListWorkflowFieldsResponse);

export interface Workflows {
  ListWorkflows(request: DeepPartial<ListWorkflowsRequest>, metadata?: grpc.Metadata): Promise<ListWorkflowsResponse>;
  CreateWorkflow(request: DeepPartial<CreateWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow>;
  DeleteWorkflow(
    request: DeepPartial<DeleteWorkflowRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DeleteWorkflowResponse>;
  GetWorkflow(request: DeepPartial<GetWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow>;
  UpdateWorkflow(request: DeepPartial<UpdateWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow>;
  ListWorkflowFields(
    request: DeepPartial<ListWorkflowFieldsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListWorkflowFieldsResponse>;
}

export class WorkflowsClientImpl implements Workflows {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListWorkflows = this.ListWorkflows.bind(this);
    this.CreateWorkflow = this.CreateWorkflow.bind(this);
    this.DeleteWorkflow = this.DeleteWorkflow.bind(this);
    this.GetWorkflow = this.GetWorkflow.bind(this);
    this.UpdateWorkflow = this.UpdateWorkflow.bind(this);
    this.ListWorkflowFields = this.ListWorkflowFields.bind(this);
  }

  ListWorkflows(request: DeepPartial<ListWorkflowsRequest>, metadata?: grpc.Metadata): Promise<ListWorkflowsResponse> {
    return this.rpc.unary(WorkflowsListWorkflowsDesc, ListWorkflowsRequest.fromPartial(request), metadata);
  }

  CreateWorkflow(request: DeepPartial<CreateWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow> {
    return this.rpc.unary(WorkflowsCreateWorkflowDesc, CreateWorkflowRequest.fromPartial(request), metadata);
  }

  DeleteWorkflow(
    request: DeepPartial<DeleteWorkflowRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DeleteWorkflowResponse> {
    return this.rpc.unary(WorkflowsDeleteWorkflowDesc, DeleteWorkflowRequest.fromPartial(request), metadata);
  }

  GetWorkflow(request: DeepPartial<GetWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow> {
    return this.rpc.unary(WorkflowsGetWorkflowDesc, GetWorkflowRequest.fromPartial(request), metadata);
  }

  UpdateWorkflow(request: DeepPartial<UpdateWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow> {
    return this.rpc.unary(WorkflowsUpdateWorkflowDesc, UpdateWorkflowRequest.fromPartial(request), metadata);
  }

  ListWorkflowFields(
    request: DeepPartial<ListWorkflowFieldsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListWorkflowFieldsResponse> {
    return this.rpc.unary(WorkflowsListWorkflowFieldsDesc, ListWorkflowFieldsRequest.fromPartial(request), metadata);
  }
}

export const WorkflowsDesc = { serviceName: "pb.v1alpha2.Workflows" };

export const WorkflowsListWorkflowsDesc: UnaryMethodDefinitionish = {
  methodName: "ListWorkflows",
  service: WorkflowsDesc,
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

export const WorkflowsCreateWorkflowDesc: UnaryMethodDefinitionish = {
  methodName: "CreateWorkflow",
  service: WorkflowsDesc,
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

export const WorkflowsDeleteWorkflowDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteWorkflow",
  service: WorkflowsDesc,
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

export const WorkflowsGetWorkflowDesc: UnaryMethodDefinitionish = {
  methodName: "GetWorkflow",
  service: WorkflowsDesc,
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

export const WorkflowsUpdateWorkflowDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateWorkflow",
  service: WorkflowsDesc,
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

export const WorkflowsListWorkflowFieldsDesc: UnaryMethodDefinitionish = {
  methodName: "ListWorkflowFields",
  service: WorkflowsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListWorkflowFieldsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListWorkflowFieldsResponse.decode(data);
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
