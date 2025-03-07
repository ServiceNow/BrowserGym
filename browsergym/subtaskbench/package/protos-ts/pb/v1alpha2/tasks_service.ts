/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";
import { File } from "../../automation_mining/ontology/data_models";
import { DeletedObjectInfo } from "../../common/common";
import { UserProfileInfo } from "../../common/user_profile";
import { Duration } from "../../google/protobuf/duration";
import { Empty } from "../../google/protobuf/empty";
import { FieldMask } from "../../google/protobuf/field_mask";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import {
  ExecutionWarningWarning,
  executionWarningWarningFromJSON,
  executionWarningWarningToJSON,
} from "../v1alpha1/execution_warning";
import { Performance } from "../v1alpha1/performance";
import { ExecutionStep } from "./execution_steps";
import { WorkflowMode, workflowModeFromJSON, workflowModeToJSON } from "./workflows_service";

export const protobufPackage = "pb.v1alpha2";

export interface CreateTaskRequest {
  $type?: "pb.v1alpha2.CreateTaskRequest";
  /**
   * The parent resource name where the Task is to be created.
   * Format of parent workflows/{WID} (parent workflow) or executions/{execution_id} (parent execution)
   */
  parent?:
    | string
    | undefined;
  /** The Task resources to create. Name field can be empty or otherwise is ignored. */
  task?:
    | Task
    | undefined;
  /**
   * To trigger specific workflow for selected file.
   * Use files filed inside files_wrapper instead.
   * Kept this field to maintain backward compatibility.
   */
  file?:
    | File
    | undefined;
  /**
   * To trigger multiple tasks for a single parent workflow.
   * Defined this way as we cannot use repeated fields in oneof.
   */
  filesWrapper?: CreateTaskRequestFilesWrapper | undefined;
}

export interface CreateTaskRequestFilesWrapper {
  $type?: "pb.v1alpha2.CreateTaskRequest.FilesWrapper";
  /**
   * Use this field to create multiple tasks at once
   * for a single parent workflow.
   */
  files?: File[] | undefined;
}

/**
 * The ListTasksApi performs differently with differnt type of users.
 * For Admin users.
 * 1) They can leave the parent field as empty and get all the tasks
 * which are part of the organisation to which admin belongs.
 * 2) They can query based on a workflow level by setting the parent field to workflows/<workflow_id>.
 * 3) They can even query based on different users, by using the filter field.
 * For Workflow users.
 * 1) If the user wants to list all the tasks inside an organisation assigned to himself/herself,
 * leave the parent field as empty.
 * 2) Otherwise set parent field to list tasks inside the workflow assigned to the user.
 * "username" filter is required for workflow users.
 * Setting filter username property to any other user's username will be unauthorized
 * and will return a permission denied error.
 */
export interface ListTasksRequest {
  $type?: "pb.v1alpha2.ListTasksRequest";
  /**
   * The parent resource name where the Task was created. It must be one of the two formats:
   * 1. "organizations/{ORGANIZATION_ID}/workflows/{WID}" to list tasks for a particular workflow
   * 2. "organizations/{ORGANIZATION_ID}" to list tasks for an organization
   */
  parent?:
    | string
    | undefined;
  /**
   * Default is 10 (when page_size is missing or set to 0). Max value is 20.
   * Ordered by ascending Task resource name.
   */
  pageSize?:
    | number
    | undefined;
  /**
   * Use this to continue the previous list requests.
   * Its value should be same with previous response's next_page_token.
   */
  pageToken?:
    | string
    | undefined;
  /**
   * Supported filter: "status={STATUS},username={username},round={RoundNumber},display_name_prefix={SEARCH_KEY},usernames={semicolon separated usernames},last_update_time_lt={UNIX_TIME_SEC},last_update_time_gt={UNIX_TIME_SEC}"
   * username filter will be deprecated, use usernames filter instead
   * multiple status values filter with a dash (-) separator, eg. "status=created-ready"
   * RoundNumber is to get the pending task list with provided review round, this will only work if the status in ready state
   * If usernames filter is not provided, then all tasks in the org will be returned.
   * If OrbyUnassigned is added in usernames filter, then all tasks that are not assigned to any user will be returned.
   * last_update_time_lt={UNIX_TIME_SEC}
   * last_update_time_gt={UNIX_TIME_SEC}
   */
  filter?:
    | string
    | undefined;
  /**
   * Use this to send only relevant data in response
   * - If Field Mask is not send or is sent with empty paths then the result will contain
   *    the complete object
   * - Valid values for field mask are: task_name, confidence, status, create_time, complete_time,
   *    time_saved, tags, task_resource_name, steps, performance, ready_time
   * - Field mask will always contain `name` field. Please donot send it in Paths to avoid errors.
   */
  fieldMask?: string[] | undefined;
  pageNumber?: number | undefined;
}

export interface ListTasksResponse {
  $type?: "pb.v1alpha2.ListTasksResponse";
  /** Ordered by ascending Task resource name. */
  tasks?:
    | Task[]
    | undefined;
  /** If the value is "", it means no more results for the request. */
  nextPageToken?:
    | string
    | undefined;
  /**
   * Total available Task size.
   * Note it is NOT the remaining available Task size after the current response.
   */
  totalSize?: number | undefined;
}

export interface UpdateTaskRequest {
  $type?: "pb.v1alpha2.UpdateTaskRequest";
  task?:
    | Task
    | undefined;
  /**
   * Valid values: status, steps, reviewed_saved_nsec, decline_reason,
   * If empty, all updatable fields will be updated based on input task.
   * reviewed_saved_nsec mask also includes the review sessions update,
   * We do not use review_sessions mask and only keep the reviewed_saved_nsec
   * mask to keep consistency for FE.
   */
  fieldMask?: string[] | undefined;
}

export interface UpdateReviewTaskRequest {
  $type?: "pb.v1alpha2.UpdateReviewTaskRequest";
  task?:
    | Task
    | undefined;
  /**
   * Valid values: status, execution_steps, reviewed_saved_nsec, decline_reason,
   * If empty, all updatable fields will be updated based on input task.
   */
  fieldMask?: string[] | undefined;
}

export interface UpdateBatchTasksRequest {
  $type?: "pb.v1alpha2.UpdateBatchTasksRequest";
  tasks?:
    | Task[]
    | undefined;
  /**
   * Valid values: email
   * If empty, all updatable fields will be updated based on input tasks
   * current limit is 100 task updates at a time
   */
  fieldMask?: string[] | undefined;
}

/**
 * Used in BatchTaskResponse to denote tasks that could not be updated
 * Failure can be because of bad requests or server fault
 */
export interface MissedTask {
  $type?: "pb.v1alpha2.MissedTask";
  task?: Task | undefined;
  errorMsg?: string | undefined;
}

export interface UpdateBatchTasksResponse {
  $type?: "pb.v1alpha2.UpdateBatchTasksResponse";
  tasks?:
    | Task[]
    | undefined;
  /** Tasks that were unable to be updated. Can be because of bad requests or server fault */
  missedTasks?: MissedTask[] | undefined;
}

export interface GetTaskRequest {
  $type?: "pb.v1alpha2.GetTaskRequest";
  /** Name of the Task */
  name?:
    | string
    | undefined;
  /**
   * Use this to send only relevant data in response
   * - If Field Mask is not send or is sent with empty paths then the result will contain
   *    the complete object
   * - Valid values for field mask are:display_name, entity_types
   * - Field mask will always contain `name` field. Please do not send it in Paths to avoid errors.
   */
  fieldMask?: string[] | undefined;
}

export interface DeleteTaskRequest {
  $type?: "pb.v1alpha2.DeleteTaskRequest";
  name?: string | undefined;
  deletedReason?: string | undefined;
}

export interface DeleteBatchTasksRequest {
  $type?: "pb.v1alpha2.DeleteBatchTasksRequest";
  names?: string[] | undefined;
  deletedReason?: string | undefined;
}

export interface DeleteBatchTasksResponse {
  $type?: "pb.v1alpha2.DeleteBatchTasksResponse";
  /**
   * Tasks that were unable to be deleted.
   * Only `name` field is populated in the task object.
   */
  missedTasks?: MissedTask[] | undefined;
}

export interface CopyTasksRequest {
  $type?: "pb.v1alpha2.CopyTasksRequest";
  /** Name of the Source Workflow */
  sourceWorkflowResourceName?:
    | string
    | undefined;
  /** Name of the Destination Workflow */
  destinationWorkflowResourceName?:
    | string
    | undefined;
  /**
   * Supported filter is "task_resource_names=<>-<>-<>". List of completed task names to be copied,
   * multiple task names should use a dash (-) separator
   * if filter = "" all completed tasks will be copied.
   */
  filter?:
    | string
    | undefined;
  /** Send completed email notification to the user, who initiated the copy task request */
  sendEmailNotification?:
    | boolean
    | undefined;
  /**
   * Name of the destination organization
   * will use source org as destination org if this is empty
   */
  destinationOrgResourceName?: string | undefined;
}

export interface CopyTasksResponse {
  $type?: "pb.v1alpha2.CopyTasksResponse";
  message?: string | undefined;
}

export interface RetryTasksRequest {
  $type?: "pb.v1alpha2.RetryTasksRequest";
  /** The organization which the tasks belong to. Users can only retry tasks of one org at a time. */
  orgResourceName?:
    | string
    | undefined;
  /** The resource names of tasks. Format: workflows/{WID}/tasks/{TID} */
  names?: string[] | undefined;
}

export interface RetryTasksResponse {
  $type?: "pb.v1alpha2.RetryTasksResponse";
  /** Tasks that were unable to be retried. */
  missedTasks?: MissedTask[] | undefined;
}

export interface Task {
  $type?: "pb.v1alpha2.Task";
  /**
   * Resource name for task. Format: workflows/{WID}/tasks/{TID} or
   * executions/{execution_id}/tasks/{task_id} (new format), since now task is directly part of a execution rather than workflow
   */
  name?: string | undefined;
  createTime?: Date | undefined;
  readyTime?:
    | Date
    | undefined;
  /**
   * we use a single timestamp of obsoletion, rejection and acceptance
   * since they are all end status of a task
   */
  completeTime?: Date | undefined;
  performance?: Performance | undefined;
  executionSteps?: ExecutionStep[] | undefined;
  status?: TaskSTATUS | undefined;
  humanReview?: boolean | undefined;
  obsoleteReason?:
    | TaskobsoleteReason
    | undefined;
  /** @deprecated */
  timeSaved?:
    | string
    | undefined;
  /** Stores the username of the user who is assigned to the task */
  username?:
    | string
    | undefined;
  /** Id of the organization the workflow belongs to. Format: organizations/{ID} */
  organizationResourceName?: string | undefined;
  displayName?: string | undefined;
  workflowDisplayName?:
    | string
    | undefined;
  /**
   * Currently it stores modified, original, auto based on user's modification on the document
   * auto tags are used for for all tasks in autopilot mode workflow and eligible tasks in the assisted mode
   */
  tags?:
    | string[]
    | undefined;
  /** total time spends to review the task by all the reviewers */
  reviewedTime?: string | undefined;
  declineReason?: UserDeclinedTaskReason | undefined;
  workflowModeWhenCreated?:
    | WorkflowMode
    | undefined;
  /** contain all the information for the reviews needed to get it approved */
  reviews?:
    | Review[]
    | undefined;
  /** Name of the task from which this task is copied from */
  copiedFromTaskResourceName?:
    | string
    | undefined;
  /** Only useful for tasks generated through workflow connectors */
  connectorSourceTaskResourceName?:
    | string
    | undefined;
  /**
   * This is the need attention threshold value
   * for the default mode when the task is created.
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
  /**
   * Profile info of the user who is assigned to the task,
   * can be empty if the task is not assigned to any user
   */
  assignee?:
    | UserProfileInfo
    | undefined;
  /**
   * Whether this task can be retried manually
   * currently only some system declined tasks can be retried
   */
  retryable?: boolean | undefined;
  permissions?:
    | TaskPERMISSION[]
    | undefined;
  /** Task description. */
  description?:
    | string
    | undefined;
  /**
   * Flag to indicate if the raw file is deleted.
   * There is also a corresponding Step with ActivityType
   * "ACTIVITY_DELETE_RAW_FILE" in the execution_steps if raw_file_deleted
   * is true.
   * Add this redundant field to make workflow_executions_view union easier.
   */
  rawFileDeleted?:
    | boolean
    | undefined;
  /**
   * Show how long the task will be retained in the system.
   * Calculation: (complete_time / deleted_time) + organization retention
   * policy duration - current time.
   * If tasks is not deleted and not in final status(complete/obsolete/
   * rejected), or if organization doesn't set retention policy, this field
   * will be null.
   */
  remainingRetention?:
    | Duration
    | undefined;
  /** Time when the task is last updated. */
  lastUpdateTime?:
    | Date
    | undefined;
  /** The warnings generated during the execution of few shot workflow */
  executionWarnings?: ExecutionWarningWarning[] | undefined;
}

export enum TaskSTATUS {
  STATUS_UNSPECIFIED = 0,
  /**
   * CREATED - Tasks are initially set with state CREATED before the execution engine starts processing.
   * CREATED state tasks should not be used by frontend.
   */
  CREATED = 1,
  /** ACCEPTED - ACCEPTED tasks are those tasks that are accepted by the user using the UI. */
  ACCEPTED = 2,
  REJECTED_INCORRECT = 3,
  REJECTED_ALREADY_COMPLETED = 4,
  /** READY - READY state tasks are the one that can be viewed to the user on the UI. */
  READY = 5,
  /** OBSOLETE - Tasks are marked as OBSOLETE for various reason, field OBSOLETE_REASON stores the reason */
  OBSOLETE = 6,
  /** COMPLETED - COMPLETED tasks are those that are marked completed by the server which require no further actions. */
  COMPLETED = 7,
  /** RETRYING - Tasks are marked as RETRYING when the task is being retried. */
  RETRYING = 8,
  UNRECOGNIZED = -1,
}

export function taskSTATUSFromJSON(object: any): TaskSTATUS {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return TaskSTATUS.STATUS_UNSPECIFIED;
    case 1:
    case "CREATED":
      return TaskSTATUS.CREATED;
    case 2:
    case "ACCEPTED":
      return TaskSTATUS.ACCEPTED;
    case 3:
    case "REJECTED_INCORRECT":
      return TaskSTATUS.REJECTED_INCORRECT;
    case 4:
    case "REJECTED_ALREADY_COMPLETED":
      return TaskSTATUS.REJECTED_ALREADY_COMPLETED;
    case 5:
    case "READY":
      return TaskSTATUS.READY;
    case 6:
    case "OBSOLETE":
      return TaskSTATUS.OBSOLETE;
    case 7:
    case "COMPLETED":
      return TaskSTATUS.COMPLETED;
    case 8:
    case "RETRYING":
      return TaskSTATUS.RETRYING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TaskSTATUS.UNRECOGNIZED;
  }
}

export function taskSTATUSToJSON(object: TaskSTATUS): string {
  switch (object) {
    case TaskSTATUS.STATUS_UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case TaskSTATUS.CREATED:
      return "CREATED";
    case TaskSTATUS.ACCEPTED:
      return "ACCEPTED";
    case TaskSTATUS.REJECTED_INCORRECT:
      return "REJECTED_INCORRECT";
    case TaskSTATUS.REJECTED_ALREADY_COMPLETED:
      return "REJECTED_ALREADY_COMPLETED";
    case TaskSTATUS.READY:
      return "READY";
    case TaskSTATUS.OBSOLETE:
      return "OBSOLETE";
    case TaskSTATUS.COMPLETED:
      return "COMPLETED";
    case TaskSTATUS.RETRYING:
      return "RETRYING";
    case TaskSTATUS.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Failed task reasons identify by our system */
export enum TaskobsoleteReason {
  OBSOLETE_REASON_UNSPECIFIED = 0,
  LOW_DOCUMENT_CLASSIFICATION_SCORE = 1,
  LARGE_DOCUMENT_SIZE = 2,
  FAILED_AFTER_ACCEPTED = 3,
  UNMATCHED_CLASSIFICATION = 4,
  /** FAILED_EXECUTION_ENGINE - TODO: This reason is very generic, in the future we can have specific reasons defined and handled. */
  FAILED_EXECUTION_ENGINE = 5,
  INVALID_DOCUMENT_MIME_TYPE = 6,
  TEMPORAL_WORKFLOW_NOT_FOUND = 7,
  TEMPORAL_WORKFLOW_FAILED = 8,
  NO_AVAILABLE_USERS = 9,
  MAX_WORKFLOW_LIMIT_REACHED = 10,
  FAILED_TO_CREATE_TASK = 11,
  FILE_DECRYPTION_FAILED = 12,
  WRONG_FILE_FORMAT = 13,
  USER_CANCELLED_EXECUTION = 14,
  UNRECOGNIZED = -1,
}

export function taskobsoleteReasonFromJSON(object: any): TaskobsoleteReason {
  switch (object) {
    case 0:
    case "OBSOLETE_REASON_UNSPECIFIED":
      return TaskobsoleteReason.OBSOLETE_REASON_UNSPECIFIED;
    case 1:
    case "LOW_DOCUMENT_CLASSIFICATION_SCORE":
      return TaskobsoleteReason.LOW_DOCUMENT_CLASSIFICATION_SCORE;
    case 2:
    case "LARGE_DOCUMENT_SIZE":
      return TaskobsoleteReason.LARGE_DOCUMENT_SIZE;
    case 3:
    case "FAILED_AFTER_ACCEPTED":
      return TaskobsoleteReason.FAILED_AFTER_ACCEPTED;
    case 4:
    case "UNMATCHED_CLASSIFICATION":
      return TaskobsoleteReason.UNMATCHED_CLASSIFICATION;
    case 5:
    case "FAILED_EXECUTION_ENGINE":
      return TaskobsoleteReason.FAILED_EXECUTION_ENGINE;
    case 6:
    case "INVALID_DOCUMENT_MIME_TYPE":
      return TaskobsoleteReason.INVALID_DOCUMENT_MIME_TYPE;
    case 7:
    case "TEMPORAL_WORKFLOW_NOT_FOUND":
      return TaskobsoleteReason.TEMPORAL_WORKFLOW_NOT_FOUND;
    case 8:
    case "TEMPORAL_WORKFLOW_FAILED":
      return TaskobsoleteReason.TEMPORAL_WORKFLOW_FAILED;
    case 9:
    case "NO_AVAILABLE_USERS":
      return TaskobsoleteReason.NO_AVAILABLE_USERS;
    case 10:
    case "MAX_WORKFLOW_LIMIT_REACHED":
      return TaskobsoleteReason.MAX_WORKFLOW_LIMIT_REACHED;
    case 11:
    case "FAILED_TO_CREATE_TASK":
      return TaskobsoleteReason.FAILED_TO_CREATE_TASK;
    case 12:
    case "FILE_DECRYPTION_FAILED":
      return TaskobsoleteReason.FILE_DECRYPTION_FAILED;
    case 13:
    case "WRONG_FILE_FORMAT":
      return TaskobsoleteReason.WRONG_FILE_FORMAT;
    case 14:
    case "USER_CANCELLED_EXECUTION":
      return TaskobsoleteReason.USER_CANCELLED_EXECUTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TaskobsoleteReason.UNRECOGNIZED;
  }
}

export function taskobsoleteReasonToJSON(object: TaskobsoleteReason): string {
  switch (object) {
    case TaskobsoleteReason.OBSOLETE_REASON_UNSPECIFIED:
      return "OBSOLETE_REASON_UNSPECIFIED";
    case TaskobsoleteReason.LOW_DOCUMENT_CLASSIFICATION_SCORE:
      return "LOW_DOCUMENT_CLASSIFICATION_SCORE";
    case TaskobsoleteReason.LARGE_DOCUMENT_SIZE:
      return "LARGE_DOCUMENT_SIZE";
    case TaskobsoleteReason.FAILED_AFTER_ACCEPTED:
      return "FAILED_AFTER_ACCEPTED";
    case TaskobsoleteReason.UNMATCHED_CLASSIFICATION:
      return "UNMATCHED_CLASSIFICATION";
    case TaskobsoleteReason.FAILED_EXECUTION_ENGINE:
      return "FAILED_EXECUTION_ENGINE";
    case TaskobsoleteReason.INVALID_DOCUMENT_MIME_TYPE:
      return "INVALID_DOCUMENT_MIME_TYPE";
    case TaskobsoleteReason.TEMPORAL_WORKFLOW_NOT_FOUND:
      return "TEMPORAL_WORKFLOW_NOT_FOUND";
    case TaskobsoleteReason.TEMPORAL_WORKFLOW_FAILED:
      return "TEMPORAL_WORKFLOW_FAILED";
    case TaskobsoleteReason.NO_AVAILABLE_USERS:
      return "NO_AVAILABLE_USERS";
    case TaskobsoleteReason.MAX_WORKFLOW_LIMIT_REACHED:
      return "MAX_WORKFLOW_LIMIT_REACHED";
    case TaskobsoleteReason.FAILED_TO_CREATE_TASK:
      return "FAILED_TO_CREATE_TASK";
    case TaskobsoleteReason.FILE_DECRYPTION_FAILED:
      return "FILE_DECRYPTION_FAILED";
    case TaskobsoleteReason.WRONG_FILE_FORMAT:
      return "WRONG_FILE_FORMAT";
    case TaskobsoleteReason.USER_CANCELLED_EXECUTION:
      return "USER_CANCELLED_EXECUTION";
    case TaskobsoleteReason.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum TaskPERMISSION {
  /** PERMISSION_UNSPECIFIED - User has no permission */
  PERMISSION_UNSPECIFIED = 0,
  /** PERMISSION_VIEW - User can view/review the task */
  PERMISSION_VIEW = 1,
  /** PERMISSION_DELETE - User can delete the task */
  PERMISSION_DELETE = 2,
  /** PERMISSION_ASSIGN - User can assign the task to others */
  PERMISSION_ASSIGN = 3,
  UNRECOGNIZED = -1,
}

export function taskPERMISSIONFromJSON(object: any): TaskPERMISSION {
  switch (object) {
    case 0:
    case "PERMISSION_UNSPECIFIED":
      return TaskPERMISSION.PERMISSION_UNSPECIFIED;
    case 1:
    case "PERMISSION_VIEW":
      return TaskPERMISSION.PERMISSION_VIEW;
    case 2:
    case "PERMISSION_DELETE":
      return TaskPERMISSION.PERMISSION_DELETE;
    case 3:
    case "PERMISSION_ASSIGN":
      return TaskPERMISSION.PERMISSION_ASSIGN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TaskPERMISSION.UNRECOGNIZED;
  }
}

export function taskPERMISSIONToJSON(object: TaskPERMISSION): string {
  switch (object) {
    case TaskPERMISSION.PERMISSION_UNSPECIFIED:
      return "PERMISSION_UNSPECIFIED";
    case TaskPERMISSION.PERMISSION_VIEW:
      return "PERMISSION_VIEW";
    case TaskPERMISSION.PERMISSION_DELETE:
      return "PERMISSION_DELETE";
    case TaskPERMISSION.PERMISSION_ASSIGN:
      return "PERMISSION_ASSIGN";
    case TaskPERMISSION.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** User provided task decline reason */
export interface UserDeclinedTaskReason {
  $type?: "pb.v1alpha2.UserDeclinedTaskReason";
  type?: UserDeclinedTaskReasonTYPE | undefined;
  description?: string | undefined;
}

export enum UserDeclinedTaskReasonTYPE {
  TYPE_UNSPECIFIED = 0,
  WRONG_DOCUMENT = 1,
  CANNOT_EDIT_CONTENT = 2,
  OTHER = 3,
  UNRECOGNIZED = -1,
}

export function userDeclinedTaskReasonTYPEFromJSON(object: any): UserDeclinedTaskReasonTYPE {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return UserDeclinedTaskReasonTYPE.TYPE_UNSPECIFIED;
    case 1:
    case "WRONG_DOCUMENT":
      return UserDeclinedTaskReasonTYPE.WRONG_DOCUMENT;
    case 2:
    case "CANNOT_EDIT_CONTENT":
      return UserDeclinedTaskReasonTYPE.CANNOT_EDIT_CONTENT;
    case 3:
    case "OTHER":
      return UserDeclinedTaskReasonTYPE.OTHER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserDeclinedTaskReasonTYPE.UNRECOGNIZED;
  }
}

export function userDeclinedTaskReasonTYPEToJSON(object: UserDeclinedTaskReasonTYPE): string {
  switch (object) {
    case UserDeclinedTaskReasonTYPE.TYPE_UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case UserDeclinedTaskReasonTYPE.WRONG_DOCUMENT:
      return "WRONG_DOCUMENT";
    case UserDeclinedTaskReasonTYPE.CANNOT_EDIT_CONTENT:
      return "CANNOT_EDIT_CONTENT";
    case UserDeclinedTaskReasonTYPE.OTHER:
      return "OTHER";
    case UserDeclinedTaskReasonTYPE.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface IdleSession {
  $type?: "pb.v1alpha2.IdleSession";
  startTime?:
    | Date
    | undefined;
  /** The unit is miliseconds */
  durationMsec?: number | undefined;
}

/**
 * review sessions are used to track the reviewed time and idle time spent by
 * the reviewer on the task in a single review
 */
export interface ReviewSession {
  $type?: "pb.v1alpha2.ReviewSession";
  /** The reviwer profile who is reviewing the task */
  reviewer?:
    | UserProfileInfo
    | undefined;
  /** The start time of the review session */
  startTime?:
    | Date
    | undefined;
  /** The end time of the review session */
  endTime?:
    | Date
    | undefined;
  /** The idle session for each idle time in the review session */
  idleSessions?: IdleSession[] | undefined;
}

/**
 * one review can have multiple reviewers due to auto save
 * review is closed when user declines or submits in the HITL page
 * review session is closed when the HITL page is closed
 */
export interface Review {
  $type?: "pb.v1alpha2.Review";
  /** Do not use, use reviewer instead. */
  user?: string | undefined;
  reviewedTime?: string | undefined;
  reviewer?: UserProfileInfo | undefined;
  reviewType?: ReviewType | undefined;
  sessions?: ReviewSession[] | undefined;
}

/**
 * 1. NORMAL_REVIEW:
 *   When the review happened right before the task is marked complete,
 * 2. MODIFICATION_REVIEW:
 *   When the review happened after the task is marked complete.
 * 3. PARTIAL_NORMAL_REVIEW:
 *   When the review results is partially reviewed by user, and will not
 *   mark task complete. The type is used to save partial review results.
 */
export enum ReviewType {
  UNSPECIFIED = 0,
  NORMAL_REVIEW = 1,
  MODIFICATION_REVIEW = 2,
  PARTIAL_NORMAL_REVIEW = 3,
  UNRECOGNIZED = -1,
}

export function reviewTypeFromJSON(object: any): ReviewType {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return ReviewType.UNSPECIFIED;
    case 1:
    case "NORMAL_REVIEW":
      return ReviewType.NORMAL_REVIEW;
    case 2:
    case "MODIFICATION_REVIEW":
      return ReviewType.MODIFICATION_REVIEW;
    case 3:
    case "PARTIAL_NORMAL_REVIEW":
      return ReviewType.PARTIAL_NORMAL_REVIEW;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ReviewType.UNRECOGNIZED;
  }
}

export function reviewTypeToJSON(object: ReviewType): string {
  switch (object) {
    case ReviewType.UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case ReviewType.NORMAL_REVIEW:
      return "NORMAL_REVIEW";
    case ReviewType.MODIFICATION_REVIEW:
      return "MODIFICATION_REVIEW";
    case ReviewType.PARTIAL_NORMAL_REVIEW:
      return "PARTIAL_NORMAL_REVIEW";
    case ReviewType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ExportTasksRequest {
  $type?: "pb.v1alpha2.ExportTasksRequest";
  /**
   * If we want to get all the tasks, then we can leave the filter field empty
   * To include multiple filters add comma seperated key-value pairs, like
   * "usernames=user1;user2,workflow_resource_names=workflows/123;workflows/456,status=COMPLETED"
   * Supported filters: usernames, workflow_resource_names, start_time, end_time, status, display_name_prefix
   * username: filter tasks based on assigned users. Use semicolon separated usernames for multiple users.
   * workflow_resource_names: filter tasks for specific workflows. Each workflow will be of the form "workflows/{WID}". Use semicolon separated workflow names for multiple workflows.
   * start_time: filter tasks based on the start time (seconds since epoch).
   * end_time: filter tasks based on the end time (seconds since epoch).
   * Both start_time and end_time are required for time filters.
   * status: filter tasks based on status. Use semicolon separated status for multiple statuses.
   * display_name_prefix: filter tasks based on task display name prefix.
   */
  filter?:
    | string
    | undefined;
  /** time_offset is hours to offset the time from UTC, eg time_offset=-7 for PST and time_offset=5.5 for IST. */
  timeOffset?: number | undefined;
}

export interface ExportTasksResponse {
  $type?: "pb.v1alpha2.ExportTasksResponse";
}

export interface ExportTasksDownloadFileRequest {
  $type?: "pb.v1alpha2.ExportTasksDownloadFileRequest";
  /** The notification id of the export tasks request */
  notificationId?: string | undefined;
}

export interface ExportTasksDownloadFileResponse {
  $type?: "pb.v1alpha2.ExportTasksDownloadFileResponse";
  /** The signed url to download the file */
  signedUrl?:
    | string
    | undefined;
  /** The file name to be downloaded */
  fileName?: string | undefined;
}

export interface DownloadTaskResultRequest {
  $type?: "pb.v1alpha2.DownloadTaskResultRequest";
  /** The task resource name */
  name?: string | undefined;
}

export interface DownloadTaskResultResponse {
  $type?: "pb.v1alpha2.DownloadTaskResultResponse";
  /** The output json data */
  dataChunk?: Uint8Array | undefined;
}

function createBaseCreateTaskRequest(): CreateTaskRequest {
  return {
    $type: "pb.v1alpha2.CreateTaskRequest",
    parent: "",
    task: undefined,
    file: undefined,
    filesWrapper: undefined,
  };
}

export const CreateTaskRequest = {
  $type: "pb.v1alpha2.CreateTaskRequest" as const,

  encode(message: CreateTaskRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.task !== undefined) {
      Task.encode(message.task, writer.uint32(18).fork()).ldelim();
    }
    if (message.file !== undefined) {
      File.encode(message.file, writer.uint32(26).fork()).ldelim();
    }
    if (message.filesWrapper !== undefined) {
      CreateTaskRequestFilesWrapper.encode(message.filesWrapper, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTaskRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTaskRequest();
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
          if (tag !== 18) {
            break;
          }

          message.task = Task.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.file = File.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.filesWrapper = CreateTaskRequestFilesWrapper.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateTaskRequest {
    return {
      $type: CreateTaskRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      task: isSet(object.task) ? Task.fromJSON(object.task) : undefined,
      file: isSet(object.file) ? File.fromJSON(object.file) : undefined,
      filesWrapper: isSet(object.filesWrapper)
        ? CreateTaskRequestFilesWrapper.fromJSON(object.filesWrapper)
        : undefined,
    };
  },

  toJSON(message: CreateTaskRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    if (message.task !== undefined) {
      obj.task = Task.toJSON(message.task);
    }
    if (message.file !== undefined) {
      obj.file = File.toJSON(message.file);
    }
    if (message.filesWrapper !== undefined) {
      obj.filesWrapper = CreateTaskRequestFilesWrapper.toJSON(message.filesWrapper);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTaskRequest>, I>>(base?: I): CreateTaskRequest {
    return CreateTaskRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateTaskRequest>, I>>(object: I): CreateTaskRequest {
    const message = createBaseCreateTaskRequest();
    message.parent = object.parent ?? "";
    message.task = (object.task !== undefined && object.task !== null) ? Task.fromPartial(object.task) : undefined;
    message.file = (object.file !== undefined && object.file !== null) ? File.fromPartial(object.file) : undefined;
    message.filesWrapper = (object.filesWrapper !== undefined && object.filesWrapper !== null)
      ? CreateTaskRequestFilesWrapper.fromPartial(object.filesWrapper)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateTaskRequest.$type, CreateTaskRequest);

function createBaseCreateTaskRequestFilesWrapper(): CreateTaskRequestFilesWrapper {
  return { $type: "pb.v1alpha2.CreateTaskRequest.FilesWrapper", files: [] };
}

export const CreateTaskRequestFilesWrapper = {
  $type: "pb.v1alpha2.CreateTaskRequest.FilesWrapper" as const,

  encode(message: CreateTaskRequestFilesWrapper, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.files !== undefined && message.files.length !== 0) {
      for (const v of message.files) {
        File.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTaskRequestFilesWrapper {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTaskRequestFilesWrapper();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.files!.push(File.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateTaskRequestFilesWrapper {
    return {
      $type: CreateTaskRequestFilesWrapper.$type,
      files: globalThis.Array.isArray(object?.files) ? object.files.map((e: any) => File.fromJSON(e)) : [],
    };
  },

  toJSON(message: CreateTaskRequestFilesWrapper): unknown {
    const obj: any = {};
    if (message.files?.length) {
      obj.files = message.files.map((e) => File.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTaskRequestFilesWrapper>, I>>(base?: I): CreateTaskRequestFilesWrapper {
    return CreateTaskRequestFilesWrapper.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateTaskRequestFilesWrapper>, I>>(
    object: I,
  ): CreateTaskRequestFilesWrapper {
    const message = createBaseCreateTaskRequestFilesWrapper();
    message.files = object.files?.map((e) => File.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(CreateTaskRequestFilesWrapper.$type, CreateTaskRequestFilesWrapper);

function createBaseListTasksRequest(): ListTasksRequest {
  return {
    $type: "pb.v1alpha2.ListTasksRequest",
    parent: "",
    pageSize: 0,
    pageToken: "",
    filter: "",
    fieldMask: undefined,
    pageNumber: 0,
  };
}

export const ListTasksRequest = {
  $type: "pb.v1alpha2.ListTasksRequest" as const,

  encode(message: ListTasksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
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
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(48).int32(message.pageNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTasksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTasksRequest();
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
          if (tag !== 48) {
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

  fromJSON(object: any): ListTasksRequest {
    return {
      $type: ListTasksRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
    };
  },

  toJSON(message: ListTasksRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
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
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListTasksRequest>, I>>(base?: I): ListTasksRequest {
    return ListTasksRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListTasksRequest>, I>>(object: I): ListTasksRequest {
    const message = createBaseListTasksRequest();
    message.parent = object.parent ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    message.filter = object.filter ?? "";
    message.fieldMask = object.fieldMask ?? undefined;
    message.pageNumber = object.pageNumber ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListTasksRequest.$type, ListTasksRequest);

function createBaseListTasksResponse(): ListTasksResponse {
  return { $type: "pb.v1alpha2.ListTasksResponse", tasks: [], nextPageToken: "", totalSize: 0 };
}

export const ListTasksResponse = {
  $type: "pb.v1alpha2.ListTasksResponse" as const,

  encode(message: ListTasksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tasks !== undefined && message.tasks.length !== 0) {
      for (const v of message.tasks) {
        Task.encode(v!, writer.uint32(10).fork()).ldelim();
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTasksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTasksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tasks!.push(Task.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListTasksResponse {
    return {
      $type: ListTasksResponse.$type,
      tasks: globalThis.Array.isArray(object?.tasks) ? object.tasks.map((e: any) => Task.fromJSON(e)) : [],
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListTasksResponse): unknown {
    const obj: any = {};
    if (message.tasks?.length) {
      obj.tasks = message.tasks.map((e) => Task.toJSON(e));
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListTasksResponse>, I>>(base?: I): ListTasksResponse {
    return ListTasksResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListTasksResponse>, I>>(object: I): ListTasksResponse {
    const message = createBaseListTasksResponse();
    message.tasks = object.tasks?.map((e) => Task.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListTasksResponse.$type, ListTasksResponse);

function createBaseUpdateTaskRequest(): UpdateTaskRequest {
  return { $type: "pb.v1alpha2.UpdateTaskRequest", task: undefined, fieldMask: undefined };
}

export const UpdateTaskRequest = {
  $type: "pb.v1alpha2.UpdateTaskRequest" as const,

  encode(message: UpdateTaskRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.task !== undefined) {
      Task.encode(message.task, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTaskRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateTaskRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.task = Task.decode(reader, reader.uint32());
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

  fromJSON(object: any): UpdateTaskRequest {
    return {
      $type: UpdateTaskRequest.$type,
      task: isSet(object.task) ? Task.fromJSON(object.task) : undefined,
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: UpdateTaskRequest): unknown {
    const obj: any = {};
    if (message.task !== undefined) {
      obj.task = Task.toJSON(message.task);
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateTaskRequest>, I>>(base?: I): UpdateTaskRequest {
    return UpdateTaskRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateTaskRequest>, I>>(object: I): UpdateTaskRequest {
    const message = createBaseUpdateTaskRequest();
    message.task = (object.task !== undefined && object.task !== null) ? Task.fromPartial(object.task) : undefined;
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateTaskRequest.$type, UpdateTaskRequest);

function createBaseUpdateReviewTaskRequest(): UpdateReviewTaskRequest {
  return { $type: "pb.v1alpha2.UpdateReviewTaskRequest", task: undefined, fieldMask: undefined };
}

export const UpdateReviewTaskRequest = {
  $type: "pb.v1alpha2.UpdateReviewTaskRequest" as const,

  encode(message: UpdateReviewTaskRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.task !== undefined) {
      Task.encode(message.task, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateReviewTaskRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateReviewTaskRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.task = Task.decode(reader, reader.uint32());
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

  fromJSON(object: any): UpdateReviewTaskRequest {
    return {
      $type: UpdateReviewTaskRequest.$type,
      task: isSet(object.task) ? Task.fromJSON(object.task) : undefined,
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: UpdateReviewTaskRequest): unknown {
    const obj: any = {};
    if (message.task !== undefined) {
      obj.task = Task.toJSON(message.task);
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateReviewTaskRequest>, I>>(base?: I): UpdateReviewTaskRequest {
    return UpdateReviewTaskRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateReviewTaskRequest>, I>>(object: I): UpdateReviewTaskRequest {
    const message = createBaseUpdateReviewTaskRequest();
    message.task = (object.task !== undefined && object.task !== null) ? Task.fromPartial(object.task) : undefined;
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateReviewTaskRequest.$type, UpdateReviewTaskRequest);

function createBaseUpdateBatchTasksRequest(): UpdateBatchTasksRequest {
  return { $type: "pb.v1alpha2.UpdateBatchTasksRequest", tasks: [], fieldMask: undefined };
}

export const UpdateBatchTasksRequest = {
  $type: "pb.v1alpha2.UpdateBatchTasksRequest" as const,

  encode(message: UpdateBatchTasksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tasks !== undefined && message.tasks.length !== 0) {
      for (const v of message.tasks) {
        Task.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateBatchTasksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateBatchTasksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tasks!.push(Task.decode(reader, reader.uint32()));
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

  fromJSON(object: any): UpdateBatchTasksRequest {
    return {
      $type: UpdateBatchTasksRequest.$type,
      tasks: globalThis.Array.isArray(object?.tasks) ? object.tasks.map((e: any) => Task.fromJSON(e)) : [],
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: UpdateBatchTasksRequest): unknown {
    const obj: any = {};
    if (message.tasks?.length) {
      obj.tasks = message.tasks.map((e) => Task.toJSON(e));
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateBatchTasksRequest>, I>>(base?: I): UpdateBatchTasksRequest {
    return UpdateBatchTasksRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateBatchTasksRequest>, I>>(object: I): UpdateBatchTasksRequest {
    const message = createBaseUpdateBatchTasksRequest();
    message.tasks = object.tasks?.map((e) => Task.fromPartial(e)) || [];
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateBatchTasksRequest.$type, UpdateBatchTasksRequest);

function createBaseMissedTask(): MissedTask {
  return { $type: "pb.v1alpha2.MissedTask", task: undefined, errorMsg: "" };
}

export const MissedTask = {
  $type: "pb.v1alpha2.MissedTask" as const,

  encode(message: MissedTask, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.task !== undefined) {
      Task.encode(message.task, writer.uint32(10).fork()).ldelim();
    }
    if (message.errorMsg !== undefined && message.errorMsg !== "") {
      writer.uint32(18).string(message.errorMsg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MissedTask {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMissedTask();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.task = Task.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.errorMsg = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MissedTask {
    return {
      $type: MissedTask.$type,
      task: isSet(object.task) ? Task.fromJSON(object.task) : undefined,
      errorMsg: isSet(object.errorMsg) ? globalThis.String(object.errorMsg) : "",
    };
  },

  toJSON(message: MissedTask): unknown {
    const obj: any = {};
    if (message.task !== undefined) {
      obj.task = Task.toJSON(message.task);
    }
    if (message.errorMsg !== undefined && message.errorMsg !== "") {
      obj.errorMsg = message.errorMsg;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MissedTask>, I>>(base?: I): MissedTask {
    return MissedTask.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MissedTask>, I>>(object: I): MissedTask {
    const message = createBaseMissedTask();
    message.task = (object.task !== undefined && object.task !== null) ? Task.fromPartial(object.task) : undefined;
    message.errorMsg = object.errorMsg ?? "";
    return message;
  },
};

messageTypeRegistry.set(MissedTask.$type, MissedTask);

function createBaseUpdateBatchTasksResponse(): UpdateBatchTasksResponse {
  return { $type: "pb.v1alpha2.UpdateBatchTasksResponse", tasks: [], missedTasks: [] };
}

export const UpdateBatchTasksResponse = {
  $type: "pb.v1alpha2.UpdateBatchTasksResponse" as const,

  encode(message: UpdateBatchTasksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tasks !== undefined && message.tasks.length !== 0) {
      for (const v of message.tasks) {
        Task.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.missedTasks !== undefined && message.missedTasks.length !== 0) {
      for (const v of message.missedTasks) {
        MissedTask.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateBatchTasksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateBatchTasksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tasks!.push(Task.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.missedTasks!.push(MissedTask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateBatchTasksResponse {
    return {
      $type: UpdateBatchTasksResponse.$type,
      tasks: globalThis.Array.isArray(object?.tasks) ? object.tasks.map((e: any) => Task.fromJSON(e)) : [],
      missedTasks: globalThis.Array.isArray(object?.missedTasks)
        ? object.missedTasks.map((e: any) => MissedTask.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UpdateBatchTasksResponse): unknown {
    const obj: any = {};
    if (message.tasks?.length) {
      obj.tasks = message.tasks.map((e) => Task.toJSON(e));
    }
    if (message.missedTasks?.length) {
      obj.missedTasks = message.missedTasks.map((e) => MissedTask.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateBatchTasksResponse>, I>>(base?: I): UpdateBatchTasksResponse {
    return UpdateBatchTasksResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateBatchTasksResponse>, I>>(object: I): UpdateBatchTasksResponse {
    const message = createBaseUpdateBatchTasksResponse();
    message.tasks = object.tasks?.map((e) => Task.fromPartial(e)) || [];
    message.missedTasks = object.missedTasks?.map((e) => MissedTask.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(UpdateBatchTasksResponse.$type, UpdateBatchTasksResponse);

function createBaseGetTaskRequest(): GetTaskRequest {
  return { $type: "pb.v1alpha2.GetTaskRequest", name: "", fieldMask: undefined };
}

export const GetTaskRequest = {
  $type: "pb.v1alpha2.GetTaskRequest" as const,

  encode(message: GetTaskRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTaskRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTaskRequest();
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

  fromJSON(object: any): GetTaskRequest {
    return {
      $type: GetTaskRequest.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: GetTaskRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetTaskRequest>, I>>(base?: I): GetTaskRequest {
    return GetTaskRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetTaskRequest>, I>>(object: I): GetTaskRequest {
    const message = createBaseGetTaskRequest();
    message.name = object.name ?? "";
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(GetTaskRequest.$type, GetTaskRequest);

function createBaseDeleteTaskRequest(): DeleteTaskRequest {
  return { $type: "pb.v1alpha2.DeleteTaskRequest", name: "", deletedReason: "" };
}

export const DeleteTaskRequest = {
  $type: "pb.v1alpha2.DeleteTaskRequest" as const,

  encode(message: DeleteTaskRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.deletedReason !== undefined && message.deletedReason !== "") {
      writer.uint32(18).string(message.deletedReason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteTaskRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteTaskRequest();
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

  fromJSON(object: any): DeleteTaskRequest {
    return {
      $type: DeleteTaskRequest.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      deletedReason: isSet(object.deletedReason) ? globalThis.String(object.deletedReason) : "",
    };
  },

  toJSON(message: DeleteTaskRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.deletedReason !== undefined && message.deletedReason !== "") {
      obj.deletedReason = message.deletedReason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteTaskRequest>, I>>(base?: I): DeleteTaskRequest {
    return DeleteTaskRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteTaskRequest>, I>>(object: I): DeleteTaskRequest {
    const message = createBaseDeleteTaskRequest();
    message.name = object.name ?? "";
    message.deletedReason = object.deletedReason ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteTaskRequest.$type, DeleteTaskRequest);

function createBaseDeleteBatchTasksRequest(): DeleteBatchTasksRequest {
  return { $type: "pb.v1alpha2.DeleteBatchTasksRequest", names: [], deletedReason: "" };
}

export const DeleteBatchTasksRequest = {
  $type: "pb.v1alpha2.DeleteBatchTasksRequest" as const,

  encode(message: DeleteBatchTasksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.names !== undefined && message.names.length !== 0) {
      for (const v of message.names) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.deletedReason !== undefined && message.deletedReason !== "") {
      writer.uint32(18).string(message.deletedReason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteBatchTasksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteBatchTasksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.names!.push(reader.string());
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

  fromJSON(object: any): DeleteBatchTasksRequest {
    return {
      $type: DeleteBatchTasksRequest.$type,
      names: globalThis.Array.isArray(object?.names) ? object.names.map((e: any) => globalThis.String(e)) : [],
      deletedReason: isSet(object.deletedReason) ? globalThis.String(object.deletedReason) : "",
    };
  },

  toJSON(message: DeleteBatchTasksRequest): unknown {
    const obj: any = {};
    if (message.names?.length) {
      obj.names = message.names;
    }
    if (message.deletedReason !== undefined && message.deletedReason !== "") {
      obj.deletedReason = message.deletedReason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteBatchTasksRequest>, I>>(base?: I): DeleteBatchTasksRequest {
    return DeleteBatchTasksRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteBatchTasksRequest>, I>>(object: I): DeleteBatchTasksRequest {
    const message = createBaseDeleteBatchTasksRequest();
    message.names = object.names?.map((e) => e) || [];
    message.deletedReason = object.deletedReason ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteBatchTasksRequest.$type, DeleteBatchTasksRequest);

function createBaseDeleteBatchTasksResponse(): DeleteBatchTasksResponse {
  return { $type: "pb.v1alpha2.DeleteBatchTasksResponse", missedTasks: [] };
}

export const DeleteBatchTasksResponse = {
  $type: "pb.v1alpha2.DeleteBatchTasksResponse" as const,

  encode(message: DeleteBatchTasksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.missedTasks !== undefined && message.missedTasks.length !== 0) {
      for (const v of message.missedTasks) {
        MissedTask.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteBatchTasksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteBatchTasksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.missedTasks!.push(MissedTask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteBatchTasksResponse {
    return {
      $type: DeleteBatchTasksResponse.$type,
      missedTasks: globalThis.Array.isArray(object?.missedTasks)
        ? object.missedTasks.map((e: any) => MissedTask.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DeleteBatchTasksResponse): unknown {
    const obj: any = {};
    if (message.missedTasks?.length) {
      obj.missedTasks = message.missedTasks.map((e) => MissedTask.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteBatchTasksResponse>, I>>(base?: I): DeleteBatchTasksResponse {
    return DeleteBatchTasksResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteBatchTasksResponse>, I>>(object: I): DeleteBatchTasksResponse {
    const message = createBaseDeleteBatchTasksResponse();
    message.missedTasks = object.missedTasks?.map((e) => MissedTask.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(DeleteBatchTasksResponse.$type, DeleteBatchTasksResponse);

function createBaseCopyTasksRequest(): CopyTasksRequest {
  return {
    $type: "pb.v1alpha2.CopyTasksRequest",
    sourceWorkflowResourceName: "",
    destinationWorkflowResourceName: "",
    filter: "",
    sendEmailNotification: false,
    destinationOrgResourceName: "",
  };
}

export const CopyTasksRequest = {
  $type: "pb.v1alpha2.CopyTasksRequest" as const,

  encode(message: CopyTasksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourceWorkflowResourceName !== undefined && message.sourceWorkflowResourceName !== "") {
      writer.uint32(10).string(message.sourceWorkflowResourceName);
    }
    if (message.destinationWorkflowResourceName !== undefined && message.destinationWorkflowResourceName !== "") {
      writer.uint32(18).string(message.destinationWorkflowResourceName);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(26).string(message.filter);
    }
    if (message.sendEmailNotification !== undefined && message.sendEmailNotification !== false) {
      writer.uint32(32).bool(message.sendEmailNotification);
    }
    if (message.destinationOrgResourceName !== undefined && message.destinationOrgResourceName !== "") {
      writer.uint32(42).string(message.destinationOrgResourceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CopyTasksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCopyTasksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sourceWorkflowResourceName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.destinationWorkflowResourceName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.filter = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.sendEmailNotification = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.destinationOrgResourceName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CopyTasksRequest {
    return {
      $type: CopyTasksRequest.$type,
      sourceWorkflowResourceName: isSet(object.sourceWorkflowResourceName)
        ? globalThis.String(object.sourceWorkflowResourceName)
        : "",
      destinationWorkflowResourceName: isSet(object.destinationWorkflowResourceName)
        ? globalThis.String(object.destinationWorkflowResourceName)
        : "",
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
      sendEmailNotification: isSet(object.sendEmailNotification)
        ? globalThis.Boolean(object.sendEmailNotification)
        : false,
      destinationOrgResourceName: isSet(object.destinationOrgResourceName)
        ? globalThis.String(object.destinationOrgResourceName)
        : "",
    };
  },

  toJSON(message: CopyTasksRequest): unknown {
    const obj: any = {};
    if (message.sourceWorkflowResourceName !== undefined && message.sourceWorkflowResourceName !== "") {
      obj.sourceWorkflowResourceName = message.sourceWorkflowResourceName;
    }
    if (message.destinationWorkflowResourceName !== undefined && message.destinationWorkflowResourceName !== "") {
      obj.destinationWorkflowResourceName = message.destinationWorkflowResourceName;
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    if (message.sendEmailNotification !== undefined && message.sendEmailNotification !== false) {
      obj.sendEmailNotification = message.sendEmailNotification;
    }
    if (message.destinationOrgResourceName !== undefined && message.destinationOrgResourceName !== "") {
      obj.destinationOrgResourceName = message.destinationOrgResourceName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CopyTasksRequest>, I>>(base?: I): CopyTasksRequest {
    return CopyTasksRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CopyTasksRequest>, I>>(object: I): CopyTasksRequest {
    const message = createBaseCopyTasksRequest();
    message.sourceWorkflowResourceName = object.sourceWorkflowResourceName ?? "";
    message.destinationWorkflowResourceName = object.destinationWorkflowResourceName ?? "";
    message.filter = object.filter ?? "";
    message.sendEmailNotification = object.sendEmailNotification ?? false;
    message.destinationOrgResourceName = object.destinationOrgResourceName ?? "";
    return message;
  },
};

messageTypeRegistry.set(CopyTasksRequest.$type, CopyTasksRequest);

function createBaseCopyTasksResponse(): CopyTasksResponse {
  return { $type: "pb.v1alpha2.CopyTasksResponse", message: "" };
}

export const CopyTasksResponse = {
  $type: "pb.v1alpha2.CopyTasksResponse" as const,

  encode(message: CopyTasksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CopyTasksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCopyTasksResponse();
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

  fromJSON(object: any): CopyTasksResponse {
    return { $type: CopyTasksResponse.$type, message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: CopyTasksResponse): unknown {
    const obj: any = {};
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CopyTasksResponse>, I>>(base?: I): CopyTasksResponse {
    return CopyTasksResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CopyTasksResponse>, I>>(object: I): CopyTasksResponse {
    const message = createBaseCopyTasksResponse();
    message.message = object.message ?? "";
    return message;
  },
};

messageTypeRegistry.set(CopyTasksResponse.$type, CopyTasksResponse);

function createBaseRetryTasksRequest(): RetryTasksRequest {
  return { $type: "pb.v1alpha2.RetryTasksRequest", orgResourceName: "", names: [] };
}

export const RetryTasksRequest = {
  $type: "pb.v1alpha2.RetryTasksRequest" as const,

  encode(message: RetryTasksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(10).string(message.orgResourceName);
    }
    if (message.names !== undefined && message.names.length !== 0) {
      for (const v of message.names) {
        writer.uint32(18).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RetryTasksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetryTasksRequest();
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
          if (tag !== 18) {
            break;
          }

          message.names!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RetryTasksRequest {
    return {
      $type: RetryTasksRequest.$type,
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      names: globalThis.Array.isArray(object?.names) ? object.names.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: RetryTasksRequest): unknown {
    const obj: any = {};
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.names?.length) {
      obj.names = message.names;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RetryTasksRequest>, I>>(base?: I): RetryTasksRequest {
    return RetryTasksRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RetryTasksRequest>, I>>(object: I): RetryTasksRequest {
    const message = createBaseRetryTasksRequest();
    message.orgResourceName = object.orgResourceName ?? "";
    message.names = object.names?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(RetryTasksRequest.$type, RetryTasksRequest);

function createBaseRetryTasksResponse(): RetryTasksResponse {
  return { $type: "pb.v1alpha2.RetryTasksResponse", missedTasks: [] };
}

export const RetryTasksResponse = {
  $type: "pb.v1alpha2.RetryTasksResponse" as const,

  encode(message: RetryTasksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.missedTasks !== undefined && message.missedTasks.length !== 0) {
      for (const v of message.missedTasks) {
        MissedTask.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RetryTasksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetryTasksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.missedTasks!.push(MissedTask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RetryTasksResponse {
    return {
      $type: RetryTasksResponse.$type,
      missedTasks: globalThis.Array.isArray(object?.missedTasks)
        ? object.missedTasks.map((e: any) => MissedTask.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RetryTasksResponse): unknown {
    const obj: any = {};
    if (message.missedTasks?.length) {
      obj.missedTasks = message.missedTasks.map((e) => MissedTask.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RetryTasksResponse>, I>>(base?: I): RetryTasksResponse {
    return RetryTasksResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RetryTasksResponse>, I>>(object: I): RetryTasksResponse {
    const message = createBaseRetryTasksResponse();
    message.missedTasks = object.missedTasks?.map((e) => MissedTask.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(RetryTasksResponse.$type, RetryTasksResponse);

function createBaseTask(): Task {
  return {
    $type: "pb.v1alpha2.Task",
    name: "",
    createTime: undefined,
    readyTime: undefined,
    completeTime: undefined,
    performance: undefined,
    executionSteps: [],
    status: 0,
    humanReview: false,
    obsoleteReason: 0,
    timeSaved: "",
    username: "",
    organizationResourceName: "",
    displayName: "",
    workflowDisplayName: "",
    tags: [],
    reviewedTime: "",
    declineReason: undefined,
    workflowModeWhenCreated: 0,
    reviews: [],
    copiedFromTaskResourceName: "",
    connectorSourceTaskResourceName: "",
    needAttentionThresholdDefaultMode: 0,
    deletedObjectInfo: undefined,
    assignee: undefined,
    retryable: false,
    permissions: [],
    description: "",
    rawFileDeleted: false,
    remainingRetention: undefined,
    lastUpdateTime: undefined,
    executionWarnings: [],
  };
}

export const Task = {
  $type: "pb.v1alpha2.Task" as const,

  encode(message: Task, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.readyTime !== undefined) {
      Timestamp.encode(toTimestamp(message.readyTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.completeTime !== undefined) {
      Timestamp.encode(toTimestamp(message.completeTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.performance !== undefined) {
      Performance.encode(message.performance, writer.uint32(42).fork()).ldelim();
    }
    if (message.executionSteps !== undefined && message.executionSteps.length !== 0) {
      for (const v of message.executionSteps) {
        ExecutionStep.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(56).int32(message.status);
    }
    if (message.humanReview !== undefined && message.humanReview !== false) {
      writer.uint32(64).bool(message.humanReview);
    }
    if (message.obsoleteReason !== undefined && message.obsoleteReason !== 0) {
      writer.uint32(72).int32(message.obsoleteReason);
    }
    if (message.timeSaved !== undefined && message.timeSaved !== "") {
      writer.uint32(82).string(message.timeSaved);
    }
    if (message.username !== undefined && message.username !== "") {
      writer.uint32(90).string(message.username);
    }
    if (message.organizationResourceName !== undefined && message.organizationResourceName !== "") {
      writer.uint32(98).string(message.organizationResourceName);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(106).string(message.displayName);
    }
    if (message.workflowDisplayName !== undefined && message.workflowDisplayName !== "") {
      writer.uint32(114).string(message.workflowDisplayName);
    }
    if (message.tags !== undefined && message.tags.length !== 0) {
      for (const v of message.tags) {
        writer.uint32(122).string(v!);
      }
    }
    if (message.reviewedTime !== undefined && message.reviewedTime !== "") {
      writer.uint32(130).string(message.reviewedTime);
    }
    if (message.declineReason !== undefined) {
      UserDeclinedTaskReason.encode(message.declineReason, writer.uint32(138).fork()).ldelim();
    }
    if (message.workflowModeWhenCreated !== undefined && message.workflowModeWhenCreated !== 0) {
      writer.uint32(144).int32(message.workflowModeWhenCreated);
    }
    if (message.reviews !== undefined && message.reviews.length !== 0) {
      for (const v of message.reviews) {
        Review.encode(v!, writer.uint32(154).fork()).ldelim();
      }
    }
    if (message.copiedFromTaskResourceName !== undefined && message.copiedFromTaskResourceName !== "") {
      writer.uint32(162).string(message.copiedFromTaskResourceName);
    }
    if (message.connectorSourceTaskResourceName !== undefined && message.connectorSourceTaskResourceName !== "") {
      writer.uint32(170).string(message.connectorSourceTaskResourceName);
    }
    if (message.needAttentionThresholdDefaultMode !== undefined && message.needAttentionThresholdDefaultMode !== 0) {
      writer.uint32(177).double(message.needAttentionThresholdDefaultMode);
    }
    if (message.deletedObjectInfo !== undefined) {
      DeletedObjectInfo.encode(message.deletedObjectInfo, writer.uint32(186).fork()).ldelim();
    }
    if (message.assignee !== undefined) {
      UserProfileInfo.encode(message.assignee, writer.uint32(194).fork()).ldelim();
    }
    if (message.retryable !== undefined && message.retryable !== false) {
      writer.uint32(200).bool(message.retryable);
    }
    if (message.permissions !== undefined && message.permissions.length !== 0) {
      writer.uint32(210).fork();
      for (const v of message.permissions) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(218).string(message.description);
    }
    if (message.rawFileDeleted !== undefined && message.rawFileDeleted !== false) {
      writer.uint32(224).bool(message.rawFileDeleted);
    }
    if (message.remainingRetention !== undefined) {
      Duration.encode(message.remainingRetention, writer.uint32(234).fork()).ldelim();
    }
    if (message.lastUpdateTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastUpdateTime), writer.uint32(242).fork()).ldelim();
    }
    if (message.executionWarnings !== undefined && message.executionWarnings.length !== 0) {
      writer.uint32(250).fork();
      for (const v of message.executionWarnings) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Task {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTask();
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

          message.createTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.readyTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.completeTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.performance = Performance.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.executionSteps!.push(ExecutionStep.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.humanReview = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.obsoleteReason = reader.int32() as any;
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.timeSaved = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.username = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.organizationResourceName = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.workflowDisplayName = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.tags!.push(reader.string());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.reviewedTime = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.declineReason = UserDeclinedTaskReason.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.workflowModeWhenCreated = reader.int32() as any;
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.reviews!.push(Review.decode(reader, reader.uint32()));
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.copiedFromTaskResourceName = reader.string();
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.connectorSourceTaskResourceName = reader.string();
          continue;
        case 22:
          if (tag !== 177) {
            break;
          }

          message.needAttentionThresholdDefaultMode = reader.double();
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.deletedObjectInfo = DeletedObjectInfo.decode(reader, reader.uint32());
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.assignee = UserProfileInfo.decode(reader, reader.uint32());
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.retryable = reader.bool();
          continue;
        case 26:
          if (tag === 208) {
            message.permissions!.push(reader.int32() as any);

            continue;
          }

          if (tag === 210) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.permissions!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.description = reader.string();
          continue;
        case 28:
          if (tag !== 224) {
            break;
          }

          message.rawFileDeleted = reader.bool();
          continue;
        case 29:
          if (tag !== 234) {
            break;
          }

          message.remainingRetention = Duration.decode(reader, reader.uint32());
          continue;
        case 30:
          if (tag !== 242) {
            break;
          }

          message.lastUpdateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 31:
          if (tag === 248) {
            message.executionWarnings!.push(reader.int32() as any);

            continue;
          }

          if (tag === 250) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.executionWarnings!.push(reader.int32() as any);
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

  fromJSON(object: any): Task {
    return {
      $type: Task.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      readyTime: isSet(object.readyTime) ? fromJsonTimestamp(object.readyTime) : undefined,
      completeTime: isSet(object.completeTime) ? fromJsonTimestamp(object.completeTime) : undefined,
      performance: isSet(object.performance) ? Performance.fromJSON(object.performance) : undefined,
      executionSteps: globalThis.Array.isArray(object?.executionSteps)
        ? object.executionSteps.map((e: any) => ExecutionStep.fromJSON(e))
        : [],
      status: isSet(object.status) ? taskSTATUSFromJSON(object.status) : 0,
      humanReview: isSet(object.humanReview) ? globalThis.Boolean(object.humanReview) : false,
      obsoleteReason: isSet(object.obsoleteReason) ? taskobsoleteReasonFromJSON(object.obsoleteReason) : 0,
      timeSaved: isSet(object.timeSaved) ? globalThis.String(object.timeSaved) : "",
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      organizationResourceName: isSet(object.organizationResourceName)
        ? globalThis.String(object.organizationResourceName)
        : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      workflowDisplayName: isSet(object.workflowDisplayName) ? globalThis.String(object.workflowDisplayName) : "",
      tags: globalThis.Array.isArray(object?.tags) ? object.tags.map((e: any) => globalThis.String(e)) : [],
      reviewedTime: isSet(object.reviewedTime) ? globalThis.String(object.reviewedTime) : "",
      declineReason: isSet(object.declineReason) ? UserDeclinedTaskReason.fromJSON(object.declineReason) : undefined,
      workflowModeWhenCreated: isSet(object.workflowModeWhenCreated)
        ? workflowModeFromJSON(object.workflowModeWhenCreated)
        : 0,
      reviews: globalThis.Array.isArray(object?.reviews) ? object.reviews.map((e: any) => Review.fromJSON(e)) : [],
      copiedFromTaskResourceName: isSet(object.copiedFromTaskResourceName)
        ? globalThis.String(object.copiedFromTaskResourceName)
        : "",
      connectorSourceTaskResourceName: isSet(object.connectorSourceTaskResourceName)
        ? globalThis.String(object.connectorSourceTaskResourceName)
        : "",
      needAttentionThresholdDefaultMode: isSet(object.needAttentionThresholdDefaultMode)
        ? globalThis.Number(object.needAttentionThresholdDefaultMode)
        : 0,
      deletedObjectInfo: isSet(object.deletedObjectInfo)
        ? DeletedObjectInfo.fromJSON(object.deletedObjectInfo)
        : undefined,
      assignee: isSet(object.assignee) ? UserProfileInfo.fromJSON(object.assignee) : undefined,
      retryable: isSet(object.retryable) ? globalThis.Boolean(object.retryable) : false,
      permissions: globalThis.Array.isArray(object?.permissions)
        ? object.permissions.map((e: any) => taskPERMISSIONFromJSON(e))
        : [],
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      rawFileDeleted: isSet(object.rawFileDeleted) ? globalThis.Boolean(object.rawFileDeleted) : false,
      remainingRetention: isSet(object.remainingRetention) ? Duration.fromJSON(object.remainingRetention) : undefined,
      lastUpdateTime: isSet(object.lastUpdateTime) ? fromJsonTimestamp(object.lastUpdateTime) : undefined,
      executionWarnings: globalThis.Array.isArray(object?.executionWarnings)
        ? object.executionWarnings.map((e: any) => executionWarningWarningFromJSON(e))
        : [],
    };
  },

  toJSON(message: Task): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.createTime !== undefined) {
      obj.createTime = message.createTime.toISOString();
    }
    if (message.readyTime !== undefined) {
      obj.readyTime = message.readyTime.toISOString();
    }
    if (message.completeTime !== undefined) {
      obj.completeTime = message.completeTime.toISOString();
    }
    if (message.performance !== undefined) {
      obj.performance = Performance.toJSON(message.performance);
    }
    if (message.executionSteps?.length) {
      obj.executionSteps = message.executionSteps.map((e) => ExecutionStep.toJSON(e));
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = taskSTATUSToJSON(message.status);
    }
    if (message.humanReview !== undefined && message.humanReview !== false) {
      obj.humanReview = message.humanReview;
    }
    if (message.obsoleteReason !== undefined && message.obsoleteReason !== 0) {
      obj.obsoleteReason = taskobsoleteReasonToJSON(message.obsoleteReason);
    }
    if (message.timeSaved !== undefined && message.timeSaved !== "") {
      obj.timeSaved = message.timeSaved;
    }
    if (message.username !== undefined && message.username !== "") {
      obj.username = message.username;
    }
    if (message.organizationResourceName !== undefined && message.organizationResourceName !== "") {
      obj.organizationResourceName = message.organizationResourceName;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.workflowDisplayName !== undefined && message.workflowDisplayName !== "") {
      obj.workflowDisplayName = message.workflowDisplayName;
    }
    if (message.tags?.length) {
      obj.tags = message.tags;
    }
    if (message.reviewedTime !== undefined && message.reviewedTime !== "") {
      obj.reviewedTime = message.reviewedTime;
    }
    if (message.declineReason !== undefined) {
      obj.declineReason = UserDeclinedTaskReason.toJSON(message.declineReason);
    }
    if (message.workflowModeWhenCreated !== undefined && message.workflowModeWhenCreated !== 0) {
      obj.workflowModeWhenCreated = workflowModeToJSON(message.workflowModeWhenCreated);
    }
    if (message.reviews?.length) {
      obj.reviews = message.reviews.map((e) => Review.toJSON(e));
    }
    if (message.copiedFromTaskResourceName !== undefined && message.copiedFromTaskResourceName !== "") {
      obj.copiedFromTaskResourceName = message.copiedFromTaskResourceName;
    }
    if (message.connectorSourceTaskResourceName !== undefined && message.connectorSourceTaskResourceName !== "") {
      obj.connectorSourceTaskResourceName = message.connectorSourceTaskResourceName;
    }
    if (message.needAttentionThresholdDefaultMode !== undefined && message.needAttentionThresholdDefaultMode !== 0) {
      obj.needAttentionThresholdDefaultMode = message.needAttentionThresholdDefaultMode;
    }
    if (message.deletedObjectInfo !== undefined) {
      obj.deletedObjectInfo = DeletedObjectInfo.toJSON(message.deletedObjectInfo);
    }
    if (message.assignee !== undefined) {
      obj.assignee = UserProfileInfo.toJSON(message.assignee);
    }
    if (message.retryable !== undefined && message.retryable !== false) {
      obj.retryable = message.retryable;
    }
    if (message.permissions?.length) {
      obj.permissions = message.permissions.map((e) => taskPERMISSIONToJSON(e));
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.rawFileDeleted !== undefined && message.rawFileDeleted !== false) {
      obj.rawFileDeleted = message.rawFileDeleted;
    }
    if (message.remainingRetention !== undefined) {
      obj.remainingRetention = Duration.toJSON(message.remainingRetention);
    }
    if (message.lastUpdateTime !== undefined) {
      obj.lastUpdateTime = message.lastUpdateTime.toISOString();
    }
    if (message.executionWarnings?.length) {
      obj.executionWarnings = message.executionWarnings.map((e) => executionWarningWarningToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Task>, I>>(base?: I): Task {
    return Task.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Task>, I>>(object: I): Task {
    const message = createBaseTask();
    message.name = object.name ?? "";
    message.createTime = object.createTime ?? undefined;
    message.readyTime = object.readyTime ?? undefined;
    message.completeTime = object.completeTime ?? undefined;
    message.performance = (object.performance !== undefined && object.performance !== null)
      ? Performance.fromPartial(object.performance)
      : undefined;
    message.executionSteps = object.executionSteps?.map((e) => ExecutionStep.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    message.humanReview = object.humanReview ?? false;
    message.obsoleteReason = object.obsoleteReason ?? 0;
    message.timeSaved = object.timeSaved ?? "";
    message.username = object.username ?? "";
    message.organizationResourceName = object.organizationResourceName ?? "";
    message.displayName = object.displayName ?? "";
    message.workflowDisplayName = object.workflowDisplayName ?? "";
    message.tags = object.tags?.map((e) => e) || [];
    message.reviewedTime = object.reviewedTime ?? "";
    message.declineReason = (object.declineReason !== undefined && object.declineReason !== null)
      ? UserDeclinedTaskReason.fromPartial(object.declineReason)
      : undefined;
    message.workflowModeWhenCreated = object.workflowModeWhenCreated ?? 0;
    message.reviews = object.reviews?.map((e) => Review.fromPartial(e)) || [];
    message.copiedFromTaskResourceName = object.copiedFromTaskResourceName ?? "";
    message.connectorSourceTaskResourceName = object.connectorSourceTaskResourceName ?? "";
    message.needAttentionThresholdDefaultMode = object.needAttentionThresholdDefaultMode ?? 0;
    message.deletedObjectInfo = (object.deletedObjectInfo !== undefined && object.deletedObjectInfo !== null)
      ? DeletedObjectInfo.fromPartial(object.deletedObjectInfo)
      : undefined;
    message.assignee = (object.assignee !== undefined && object.assignee !== null)
      ? UserProfileInfo.fromPartial(object.assignee)
      : undefined;
    message.retryable = object.retryable ?? false;
    message.permissions = object.permissions?.map((e) => e) || [];
    message.description = object.description ?? "";
    message.rawFileDeleted = object.rawFileDeleted ?? false;
    message.remainingRetention = (object.remainingRetention !== undefined && object.remainingRetention !== null)
      ? Duration.fromPartial(object.remainingRetention)
      : undefined;
    message.lastUpdateTime = object.lastUpdateTime ?? undefined;
    message.executionWarnings = object.executionWarnings?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(Task.$type, Task);

function createBaseUserDeclinedTaskReason(): UserDeclinedTaskReason {
  return { $type: "pb.v1alpha2.UserDeclinedTaskReason", type: 0, description: "" };
}

export const UserDeclinedTaskReason = {
  $type: "pb.v1alpha2.UserDeclinedTaskReason" as const,

  encode(message: UserDeclinedTaskReason, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserDeclinedTaskReason {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserDeclinedTaskReason();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
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

  fromJSON(object: any): UserDeclinedTaskReason {
    return {
      $type: UserDeclinedTaskReason.$type,
      type: isSet(object.type) ? userDeclinedTaskReasonTYPEFromJSON(object.type) : 0,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: UserDeclinedTaskReason): unknown {
    const obj: any = {};
    if (message.type !== undefined && message.type !== 0) {
      obj.type = userDeclinedTaskReasonTYPEToJSON(message.type);
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserDeclinedTaskReason>, I>>(base?: I): UserDeclinedTaskReason {
    return UserDeclinedTaskReason.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserDeclinedTaskReason>, I>>(object: I): UserDeclinedTaskReason {
    const message = createBaseUserDeclinedTaskReason();
    message.type = object.type ?? 0;
    message.description = object.description ?? "";
    return message;
  },
};

messageTypeRegistry.set(UserDeclinedTaskReason.$type, UserDeclinedTaskReason);

function createBaseIdleSession(): IdleSession {
  return { $type: "pb.v1alpha2.IdleSession", startTime: undefined, durationMsec: 0 };
}

export const IdleSession = {
  $type: "pb.v1alpha2.IdleSession" as const,

  encode(message: IdleSession, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.durationMsec !== undefined && message.durationMsec !== 0) {
      writer.uint32(16).int32(message.durationMsec);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IdleSession {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdleSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.durationMsec = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IdleSession {
    return {
      $type: IdleSession.$type,
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      durationMsec: isSet(object.durationMsec) ? globalThis.Number(object.durationMsec) : 0,
    };
  },

  toJSON(message: IdleSession): unknown {
    const obj: any = {};
    if (message.startTime !== undefined) {
      obj.startTime = message.startTime.toISOString();
    }
    if (message.durationMsec !== undefined && message.durationMsec !== 0) {
      obj.durationMsec = Math.round(message.durationMsec);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IdleSession>, I>>(base?: I): IdleSession {
    return IdleSession.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IdleSession>, I>>(object: I): IdleSession {
    const message = createBaseIdleSession();
    message.startTime = object.startTime ?? undefined;
    message.durationMsec = object.durationMsec ?? 0;
    return message;
  },
};

messageTypeRegistry.set(IdleSession.$type, IdleSession);

function createBaseReviewSession(): ReviewSession {
  return {
    $type: "pb.v1alpha2.ReviewSession",
    reviewer: undefined,
    startTime: undefined,
    endTime: undefined,
    idleSessions: [],
  };
}

export const ReviewSession = {
  $type: "pb.v1alpha2.ReviewSession" as const,

  encode(message: ReviewSession, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reviewer !== undefined) {
      UserProfileInfo.encode(message.reviewer, writer.uint32(10).fork()).ldelim();
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.idleSessions !== undefined && message.idleSessions.length !== 0) {
      for (const v of message.idleSessions) {
        IdleSession.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReviewSession {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReviewSession();
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
          if (tag !== 18) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.idleSessions!.push(IdleSession.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReviewSession {
    return {
      $type: ReviewSession.$type,
      reviewer: isSet(object.reviewer) ? UserProfileInfo.fromJSON(object.reviewer) : undefined,
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
      idleSessions: globalThis.Array.isArray(object?.idleSessions)
        ? object.idleSessions.map((e: any) => IdleSession.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ReviewSession): unknown {
    const obj: any = {};
    if (message.reviewer !== undefined) {
      obj.reviewer = UserProfileInfo.toJSON(message.reviewer);
    }
    if (message.startTime !== undefined) {
      obj.startTime = message.startTime.toISOString();
    }
    if (message.endTime !== undefined) {
      obj.endTime = message.endTime.toISOString();
    }
    if (message.idleSessions?.length) {
      obj.idleSessions = message.idleSessions.map((e) => IdleSession.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReviewSession>, I>>(base?: I): ReviewSession {
    return ReviewSession.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReviewSession>, I>>(object: I): ReviewSession {
    const message = createBaseReviewSession();
    message.reviewer = (object.reviewer !== undefined && object.reviewer !== null)
      ? UserProfileInfo.fromPartial(object.reviewer)
      : undefined;
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    message.idleSessions = object.idleSessions?.map((e) => IdleSession.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ReviewSession.$type, ReviewSession);

function createBaseReview(): Review {
  return { $type: "pb.v1alpha2.Review", user: "", reviewedTime: "", reviewer: undefined, reviewType: 0, sessions: [] };
}

export const Review = {
  $type: "pb.v1alpha2.Review" as const,

  encode(message: Review, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined && message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.reviewedTime !== undefined && message.reviewedTime !== "") {
      writer.uint32(18).string(message.reviewedTime);
    }
    if (message.reviewer !== undefined) {
      UserProfileInfo.encode(message.reviewer, writer.uint32(26).fork()).ldelim();
    }
    if (message.reviewType !== undefined && message.reviewType !== 0) {
      writer.uint32(32).int32(message.reviewType);
    }
    if (message.sessions !== undefined && message.sessions.length !== 0) {
      for (const v of message.sessions) {
        ReviewSession.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Review {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReview();
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
          if (tag !== 18) {
            break;
          }

          message.reviewedTime = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.reviewer = UserProfileInfo.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.reviewType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sessions!.push(ReviewSession.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Review {
    return {
      $type: Review.$type,
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      reviewedTime: isSet(object.reviewedTime) ? globalThis.String(object.reviewedTime) : "",
      reviewer: isSet(object.reviewer) ? UserProfileInfo.fromJSON(object.reviewer) : undefined,
      reviewType: isSet(object.reviewType) ? reviewTypeFromJSON(object.reviewType) : 0,
      sessions: globalThis.Array.isArray(object?.sessions)
        ? object.sessions.map((e: any) => ReviewSession.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Review): unknown {
    const obj: any = {};
    if (message.user !== undefined && message.user !== "") {
      obj.user = message.user;
    }
    if (message.reviewedTime !== undefined && message.reviewedTime !== "") {
      obj.reviewedTime = message.reviewedTime;
    }
    if (message.reviewer !== undefined) {
      obj.reviewer = UserProfileInfo.toJSON(message.reviewer);
    }
    if (message.reviewType !== undefined && message.reviewType !== 0) {
      obj.reviewType = reviewTypeToJSON(message.reviewType);
    }
    if (message.sessions?.length) {
      obj.sessions = message.sessions.map((e) => ReviewSession.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Review>, I>>(base?: I): Review {
    return Review.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Review>, I>>(object: I): Review {
    const message = createBaseReview();
    message.user = object.user ?? "";
    message.reviewedTime = object.reviewedTime ?? "";
    message.reviewer = (object.reviewer !== undefined && object.reviewer !== null)
      ? UserProfileInfo.fromPartial(object.reviewer)
      : undefined;
    message.reviewType = object.reviewType ?? 0;
    message.sessions = object.sessions?.map((e) => ReviewSession.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(Review.$type, Review);

function createBaseExportTasksRequest(): ExportTasksRequest {
  return { $type: "pb.v1alpha2.ExportTasksRequest", filter: "", timeOffset: 0 };
}

export const ExportTasksRequest = {
  $type: "pb.v1alpha2.ExportTasksRequest" as const,

  encode(message: ExportTasksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(10).string(message.filter);
    }
    if (message.timeOffset !== undefined && message.timeOffset !== 0) {
      writer.uint32(21).float(message.timeOffset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportTasksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportTasksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = reader.string();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.timeOffset = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportTasksRequest {
    return {
      $type: ExportTasksRequest.$type,
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
      timeOffset: isSet(object.timeOffset) ? globalThis.Number(object.timeOffset) : 0,
    };
  },

  toJSON(message: ExportTasksRequest): unknown {
    const obj: any = {};
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    if (message.timeOffset !== undefined && message.timeOffset !== 0) {
      obj.timeOffset = message.timeOffset;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportTasksRequest>, I>>(base?: I): ExportTasksRequest {
    return ExportTasksRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExportTasksRequest>, I>>(object: I): ExportTasksRequest {
    const message = createBaseExportTasksRequest();
    message.filter = object.filter ?? "";
    message.timeOffset = object.timeOffset ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ExportTasksRequest.$type, ExportTasksRequest);

function createBaseExportTasksResponse(): ExportTasksResponse {
  return { $type: "pb.v1alpha2.ExportTasksResponse" };
}

export const ExportTasksResponse = {
  $type: "pb.v1alpha2.ExportTasksResponse" as const,

  encode(_: ExportTasksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportTasksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportTasksResponse();
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

  fromJSON(_: any): ExportTasksResponse {
    return { $type: ExportTasksResponse.$type };
  },

  toJSON(_: ExportTasksResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportTasksResponse>, I>>(base?: I): ExportTasksResponse {
    return ExportTasksResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExportTasksResponse>, I>>(_: I): ExportTasksResponse {
    const message = createBaseExportTasksResponse();
    return message;
  },
};

messageTypeRegistry.set(ExportTasksResponse.$type, ExportTasksResponse);

function createBaseExportTasksDownloadFileRequest(): ExportTasksDownloadFileRequest {
  return { $type: "pb.v1alpha2.ExportTasksDownloadFileRequest", notificationId: "" };
}

export const ExportTasksDownloadFileRequest = {
  $type: "pb.v1alpha2.ExportTasksDownloadFileRequest" as const,

  encode(message: ExportTasksDownloadFileRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.notificationId !== undefined && message.notificationId !== "") {
      writer.uint32(10).string(message.notificationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportTasksDownloadFileRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportTasksDownloadFileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.notificationId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportTasksDownloadFileRequest {
    return {
      $type: ExportTasksDownloadFileRequest.$type,
      notificationId: isSet(object.notificationId) ? globalThis.String(object.notificationId) : "",
    };
  },

  toJSON(message: ExportTasksDownloadFileRequest): unknown {
    const obj: any = {};
    if (message.notificationId !== undefined && message.notificationId !== "") {
      obj.notificationId = message.notificationId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportTasksDownloadFileRequest>, I>>(base?: I): ExportTasksDownloadFileRequest {
    return ExportTasksDownloadFileRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExportTasksDownloadFileRequest>, I>>(
    object: I,
  ): ExportTasksDownloadFileRequest {
    const message = createBaseExportTasksDownloadFileRequest();
    message.notificationId = object.notificationId ?? "";
    return message;
  },
};

messageTypeRegistry.set(ExportTasksDownloadFileRequest.$type, ExportTasksDownloadFileRequest);

function createBaseExportTasksDownloadFileResponse(): ExportTasksDownloadFileResponse {
  return { $type: "pb.v1alpha2.ExportTasksDownloadFileResponse", signedUrl: "", fileName: "" };
}

export const ExportTasksDownloadFileResponse = {
  $type: "pb.v1alpha2.ExportTasksDownloadFileResponse" as const,

  encode(message: ExportTasksDownloadFileResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signedUrl !== undefined && message.signedUrl !== "") {
      writer.uint32(10).string(message.signedUrl);
    }
    if (message.fileName !== undefined && message.fileName !== "") {
      writer.uint32(18).string(message.fileName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportTasksDownloadFileResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportTasksDownloadFileResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signedUrl = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fileName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportTasksDownloadFileResponse {
    return {
      $type: ExportTasksDownloadFileResponse.$type,
      signedUrl: isSet(object.signedUrl) ? globalThis.String(object.signedUrl) : "",
      fileName: isSet(object.fileName) ? globalThis.String(object.fileName) : "",
    };
  },

  toJSON(message: ExportTasksDownloadFileResponse): unknown {
    const obj: any = {};
    if (message.signedUrl !== undefined && message.signedUrl !== "") {
      obj.signedUrl = message.signedUrl;
    }
    if (message.fileName !== undefined && message.fileName !== "") {
      obj.fileName = message.fileName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportTasksDownloadFileResponse>, I>>(base?: I): ExportTasksDownloadFileResponse {
    return ExportTasksDownloadFileResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExportTasksDownloadFileResponse>, I>>(
    object: I,
  ): ExportTasksDownloadFileResponse {
    const message = createBaseExportTasksDownloadFileResponse();
    message.signedUrl = object.signedUrl ?? "";
    message.fileName = object.fileName ?? "";
    return message;
  },
};

messageTypeRegistry.set(ExportTasksDownloadFileResponse.$type, ExportTasksDownloadFileResponse);

function createBaseDownloadTaskResultRequest(): DownloadTaskResultRequest {
  return { $type: "pb.v1alpha2.DownloadTaskResultRequest", name: "" };
}

export const DownloadTaskResultRequest = {
  $type: "pb.v1alpha2.DownloadTaskResultRequest" as const,

  encode(message: DownloadTaskResultRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DownloadTaskResultRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDownloadTaskResultRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DownloadTaskResultRequest {
    return { $type: DownloadTaskResultRequest.$type, name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: DownloadTaskResultRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DownloadTaskResultRequest>, I>>(base?: I): DownloadTaskResultRequest {
    return DownloadTaskResultRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DownloadTaskResultRequest>, I>>(object: I): DownloadTaskResultRequest {
    const message = createBaseDownloadTaskResultRequest();
    message.name = object.name ?? "";
    return message;
  },
};

messageTypeRegistry.set(DownloadTaskResultRequest.$type, DownloadTaskResultRequest);

function createBaseDownloadTaskResultResponse(): DownloadTaskResultResponse {
  return { $type: "pb.v1alpha2.DownloadTaskResultResponse", dataChunk: new Uint8Array(0) };
}

export const DownloadTaskResultResponse = {
  $type: "pb.v1alpha2.DownloadTaskResultResponse" as const,

  encode(message: DownloadTaskResultResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataChunk !== undefined && message.dataChunk.length !== 0) {
      writer.uint32(10).bytes(message.dataChunk);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DownloadTaskResultResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDownloadTaskResultResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataChunk = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DownloadTaskResultResponse {
    return {
      $type: DownloadTaskResultResponse.$type,
      dataChunk: isSet(object.dataChunk) ? bytesFromBase64(object.dataChunk) : new Uint8Array(0),
    };
  },

  toJSON(message: DownloadTaskResultResponse): unknown {
    const obj: any = {};
    if (message.dataChunk !== undefined && message.dataChunk.length !== 0) {
      obj.dataChunk = base64FromBytes(message.dataChunk);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DownloadTaskResultResponse>, I>>(base?: I): DownloadTaskResultResponse {
    return DownloadTaskResultResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DownloadTaskResultResponse>, I>>(object: I): DownloadTaskResultResponse {
    const message = createBaseDownloadTaskResultResponse();
    message.dataChunk = object.dataChunk ?? new Uint8Array(0);
    return message;
  },
};

messageTypeRegistry.set(DownloadTaskResultResponse.$type, DownloadTaskResultResponse);

export interface Tasks {
  CreateTask(request: DeepPartial<CreateTaskRequest>, metadata?: grpc.Metadata): Promise<Task>;
  ListTasks(request: DeepPartial<ListTasksRequest>, metadata?: grpc.Metadata): Promise<ListTasksResponse>;
  UpdateTask(request: DeepPartial<UpdateTaskRequest>, metadata?: grpc.Metadata): Promise<Task>;
  UpdateBatchTasks(
    request: DeepPartial<UpdateBatchTasksRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateBatchTasksResponse>;
  GetTask(request: DeepPartial<GetTaskRequest>, metadata?: grpc.Metadata): Promise<Task>;
  DeleteTask(request: DeepPartial<DeleteTaskRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  DeleteBatchTasks(
    request: DeepPartial<DeleteBatchTasksRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DeleteBatchTasksResponse>;
  /** Copies tasks from one workflow to another, request user needs to be the admin of both the workflows */
  CopyTasks(request: DeepPartial<CopyTasksRequest>, metadata?: grpc.Metadata): Promise<CopyTasksResponse>;
  RetryTasks(request: DeepPartial<RetryTasksRequest>, metadata?: grpc.Metadata): Promise<RetryTasksResponse>;
  /** This api is used to update tasks generated by Orbot executions */
  UpdateReviewTask(request: DeepPartial<UpdateReviewTaskRequest>, metadata?: grpc.Metadata): Promise<Task>;
  /**
   * This api is used to export tasks based on a filter or all tasks in the org
   * to a csv file. The csv file will be sent to the user's email asynchrounously.
   * The csv file will contain the data for the users to be able to analyze the performance
   * of the tasks.
   */
  ExportTasks(request: DeepPartial<ExportTasksRequest>, metadata?: grpc.Metadata): Promise<ExportTasksResponse>;
  /**
   * This api is used to download the csv file containing the tasks data.
   * This will validate the user's token and send the signed url to the user
   * if the user is authorized to download the file.
   * Else it will return a permission denied error.
   */
  ExportTasksDownloadFile(
    request: DeepPartial<ExportTasksDownloadFileRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ExportTasksDownloadFileResponse>;
  /** This api is used to download json output for completed task. */
  DownloadTaskResult(
    request: DeepPartial<DownloadTaskResultRequest>,
    metadata?: grpc.Metadata,
  ): Observable<DownloadTaskResultResponse>;
}

export class TasksClientImpl implements Tasks {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateTask = this.CreateTask.bind(this);
    this.ListTasks = this.ListTasks.bind(this);
    this.UpdateTask = this.UpdateTask.bind(this);
    this.UpdateBatchTasks = this.UpdateBatchTasks.bind(this);
    this.GetTask = this.GetTask.bind(this);
    this.DeleteTask = this.DeleteTask.bind(this);
    this.DeleteBatchTasks = this.DeleteBatchTasks.bind(this);
    this.CopyTasks = this.CopyTasks.bind(this);
    this.RetryTasks = this.RetryTasks.bind(this);
    this.UpdateReviewTask = this.UpdateReviewTask.bind(this);
    this.ExportTasks = this.ExportTasks.bind(this);
    this.ExportTasksDownloadFile = this.ExportTasksDownloadFile.bind(this);
    this.DownloadTaskResult = this.DownloadTaskResult.bind(this);
  }

  CreateTask(request: DeepPartial<CreateTaskRequest>, metadata?: grpc.Metadata): Promise<Task> {
    return this.rpc.unary(TasksCreateTaskDesc, CreateTaskRequest.fromPartial(request), metadata);
  }

  ListTasks(request: DeepPartial<ListTasksRequest>, metadata?: grpc.Metadata): Promise<ListTasksResponse> {
    return this.rpc.unary(TasksListTasksDesc, ListTasksRequest.fromPartial(request), metadata);
  }

  UpdateTask(request: DeepPartial<UpdateTaskRequest>, metadata?: grpc.Metadata): Promise<Task> {
    return this.rpc.unary(TasksUpdateTaskDesc, UpdateTaskRequest.fromPartial(request), metadata);
  }

  UpdateBatchTasks(
    request: DeepPartial<UpdateBatchTasksRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateBatchTasksResponse> {
    return this.rpc.unary(TasksUpdateBatchTasksDesc, UpdateBatchTasksRequest.fromPartial(request), metadata);
  }

  GetTask(request: DeepPartial<GetTaskRequest>, metadata?: grpc.Metadata): Promise<Task> {
    return this.rpc.unary(TasksGetTaskDesc, GetTaskRequest.fromPartial(request), metadata);
  }

  DeleteTask(request: DeepPartial<DeleteTaskRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(TasksDeleteTaskDesc, DeleteTaskRequest.fromPartial(request), metadata);
  }

  DeleteBatchTasks(
    request: DeepPartial<DeleteBatchTasksRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DeleteBatchTasksResponse> {
    return this.rpc.unary(TasksDeleteBatchTasksDesc, DeleteBatchTasksRequest.fromPartial(request), metadata);
  }

  CopyTasks(request: DeepPartial<CopyTasksRequest>, metadata?: grpc.Metadata): Promise<CopyTasksResponse> {
    return this.rpc.unary(TasksCopyTasksDesc, CopyTasksRequest.fromPartial(request), metadata);
  }

  RetryTasks(request: DeepPartial<RetryTasksRequest>, metadata?: grpc.Metadata): Promise<RetryTasksResponse> {
    return this.rpc.unary(TasksRetryTasksDesc, RetryTasksRequest.fromPartial(request), metadata);
  }

  UpdateReviewTask(request: DeepPartial<UpdateReviewTaskRequest>, metadata?: grpc.Metadata): Promise<Task> {
    return this.rpc.unary(TasksUpdateReviewTaskDesc, UpdateReviewTaskRequest.fromPartial(request), metadata);
  }

  ExportTasks(request: DeepPartial<ExportTasksRequest>, metadata?: grpc.Metadata): Promise<ExportTasksResponse> {
    return this.rpc.unary(TasksExportTasksDesc, ExportTasksRequest.fromPartial(request), metadata);
  }

  ExportTasksDownloadFile(
    request: DeepPartial<ExportTasksDownloadFileRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ExportTasksDownloadFileResponse> {
    return this.rpc.unary(
      TasksExportTasksDownloadFileDesc,
      ExportTasksDownloadFileRequest.fromPartial(request),
      metadata,
    );
  }

  DownloadTaskResult(
    request: DeepPartial<DownloadTaskResultRequest>,
    metadata?: grpc.Metadata,
  ): Observable<DownloadTaskResultResponse> {
    return this.rpc.invoke(TasksDownloadTaskResultDesc, DownloadTaskResultRequest.fromPartial(request), metadata);
  }
}

export const TasksDesc = { serviceName: "pb.v1alpha2.Tasks" };

export const TasksCreateTaskDesc: UnaryMethodDefinitionish = {
  methodName: "CreateTask",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateTaskRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Task.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksListTasksDesc: UnaryMethodDefinitionish = {
  methodName: "ListTasks",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListTasksRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListTasksResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksUpdateTaskDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateTask",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateTaskRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Task.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksUpdateBatchTasksDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateBatchTasks",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateBatchTasksRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateBatchTasksResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksGetTaskDesc: UnaryMethodDefinitionish = {
  methodName: "GetTask",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetTaskRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Task.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksDeleteTaskDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteTask",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteTaskRequest.encode(this).finish();
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

export const TasksDeleteBatchTasksDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteBatchTasks",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteBatchTasksRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DeleteBatchTasksResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksCopyTasksDesc: UnaryMethodDefinitionish = {
  methodName: "CopyTasks",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CopyTasksRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CopyTasksResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksRetryTasksDesc: UnaryMethodDefinitionish = {
  methodName: "RetryTasks",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RetryTasksRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RetryTasksResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksUpdateReviewTaskDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateReviewTask",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateReviewTaskRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Task.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksExportTasksDesc: UnaryMethodDefinitionish = {
  methodName: "ExportTasks",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ExportTasksRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ExportTasksResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksExportTasksDownloadFileDesc: UnaryMethodDefinitionish = {
  methodName: "ExportTasksDownloadFile",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ExportTasksDownloadFileRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ExportTasksDownloadFileResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksDownloadTaskResultDesc: UnaryMethodDefinitionish = {
  methodName: "DownloadTaskResult",
  service: TasksDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return DownloadTaskResultRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DownloadTaskResultResponse.decode(data);
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
  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Observable<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;
    streamingTransport?: grpc.TransportFactory;
    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;
      streamingTransport?: grpc.TransportFactory;
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

  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Observable<any> {
    const upStreamCodes = this.options.upStreamRetryCodes ?? [];
    const DEFAULT_TIMEOUT_TIME: number = 3_000;
    const request = { ..._request, ...methodDesc.requestType };
    const transport = this.options.streamingTransport ?? this.options.transport;
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Observable((observer) => {
      const upStream = () => {
        const client = grpc.invoke(methodDesc, {
          host: this.host,
          request,
          ...(transport !== undefined ? { transport } : {}),
          metadata: maybeCombinedMetadata ?? {},
          debug: this.options.debug ?? false,
          onMessage: (next) => observer.next(next),
          onEnd: (code: grpc.Code, message: string, trailers: grpc.Metadata) => {
            if (code === 0) {
              observer.complete();
            } else if (upStreamCodes.includes(code)) {
              setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
            } else {
              const err = new Error(message) as any;
              err.code = code;
              err.metadata = trailers;
              observer.error(err);
            }
          },
        });
        observer.add(() => client.close());
      };
      upStream();
    }).pipe(share());
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
