/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { DeletedObjectInfo } from "../../common/common";
import { ReviewerList } from "../../common/review";
import { UserProfileInfo } from "../../common/user_profile";
import { Duration } from "../../google/protobuf/duration";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import { Action, ActionGroup, ExecutedAction, WorkflowVariable } from "./orbot_action";
import { Schedule } from "./schedule";

export const protobufPackage = "pb.v1alpha1";

export interface Workflow {
  $type?: "pb.v1alpha1.Workflow";
  id?:
    | string
    | undefined;
  /** Display name. */
  displayName?:
    | string
    | undefined;
  /** User-editable description of the workflow. */
  description?:
    | string
    | undefined;
  /** To be deprecated, use processes instead. Keeping it for now for backward compatibility. */
  taskExecution?:
    | WorkflowProcess
    | undefined;
  /**
   * A workflow can have one or multiple processes.
   * The first process is by default the entry point if no id is specified when creating a task.
   */
  processes?:
    | WorkflowProcess[]
    | undefined;
  /** Time when the workflow was created/updated. */
  createTime?: Date | undefined;
  lastUpdateTime?: Date | undefined;
  status?:
    | WorkflowStatus
    | undefined;
  /** Organization which the workflow belongs. */
  orgId?: string | undefined;
  actionsForReview?:
    | WorkflowActionsForReview[]
    | undefined;
  /** confidence threshold when review for LOW_CONFIDENCE_ACTIONS is enabled. */
  lowConfidenceThreshold?:
    | number
    | undefined;
  /** generate output for each task corresponding to workflow. */
  exportOutput?:
    | WorkflowExportOutput
    | undefined;
  /** reviewers who would be able to access the workflow and create tasks for it */
  reviewerIds?: string[] | undefined;
  creatorId?:
    | string
    | undefined;
  /** Creator info of the workflow */
  creator?: UserProfileInfo | undefined;
  mode?: WorkflowMode | undefined;
  applications?: string[] | undefined;
  schedules?:
    | Schedule[]
    | undefined;
  /** Admins of the workflow. Creator will be in the list of admins by default. */
  adminIds?: string[] | undefined;
  reviewerLists?: ReviewerList[] | undefined;
  executionAssignment?: WorkflowExecutionAssignment | undefined;
  adminEmailConfig?: WorkflowAdminEmailConfig | undefined;
}

export enum WorkflowStatus {
  UNSPECIFIED = 0,
  DRAFT = 1,
  /** PUBLISHED - A published workflow is visible to all users in the same organization. */
  PUBLISHED = 2,
  UNRECOGNIZED = -1,
}

export function workflowStatusFromJSON(object: any): WorkflowStatus {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return WorkflowStatus.UNSPECIFIED;
    case 1:
    case "DRAFT":
      return WorkflowStatus.DRAFT;
    case 2:
    case "PUBLISHED":
      return WorkflowStatus.PUBLISHED;
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
    case WorkflowStatus.DRAFT:
      return "DRAFT";
    case WorkflowStatus.PUBLISHED:
      return "PUBLISHED";
    case WorkflowStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** which steps should be present for human review */
export enum WorkflowActionsForReview {
  REVIEW_MODE_UNSPECIFIED = 0,
  /** LOW_CONFIDENCE_ACTIONS - Currently only ML-based actions, such as ValidateAction, has confidence scores. */
  LOW_CONFIDENCE_ACTIONS = 1,
  /**
   * FINAL_ACTIONS - The final actions before a workflow finishes is usually form submission,
   * thus we have this option to allow for user review.
   * If the last ActionGroup is a conditional action, then the last actions
   * from both branches would be treated as final actions.
   */
  FINAL_ACTIONS = 2,
  ALL_ACTIONS = 3,
  UNRECOGNIZED = -1,
}

export function workflowActionsForReviewFromJSON(object: any): WorkflowActionsForReview {
  switch (object) {
    case 0:
    case "REVIEW_MODE_UNSPECIFIED":
      return WorkflowActionsForReview.REVIEW_MODE_UNSPECIFIED;
    case 1:
    case "LOW_CONFIDENCE_ACTIONS":
      return WorkflowActionsForReview.LOW_CONFIDENCE_ACTIONS;
    case 2:
    case "FINAL_ACTIONS":
      return WorkflowActionsForReview.FINAL_ACTIONS;
    case 3:
    case "ALL_ACTIONS":
      return WorkflowActionsForReview.ALL_ACTIONS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WorkflowActionsForReview.UNRECOGNIZED;
  }
}

export function workflowActionsForReviewToJSON(object: WorkflowActionsForReview): string {
  switch (object) {
    case WorkflowActionsForReview.REVIEW_MODE_UNSPECIFIED:
      return "REVIEW_MODE_UNSPECIFIED";
    case WorkflowActionsForReview.LOW_CONFIDENCE_ACTIONS:
      return "LOW_CONFIDENCE_ACTIONS";
    case WorkflowActionsForReview.FINAL_ACTIONS:
      return "FINAL_ACTIONS";
    case WorkflowActionsForReview.ALL_ACTIONS:
      return "ALL_ACTIONS";
    case WorkflowActionsForReview.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum WorkflowMode {
  UNSPECIFIED = 0,
  ASSISTED = 1,
  AUTOMATED = 2,
  /**
   * DEFAULT - Default mode requires human review at every smart action
   * and need the highest level of human review
   */
  DEFAULT = 3,
  UNRECOGNIZED = -1,
}

export function workflowModeFromJSON(object: any): WorkflowMode {
  switch (object) {
    case 0:
    case "MODE_UNSPECIFIED":
      return WorkflowMode.UNSPECIFIED;
    case 1:
    case "MODE_ASSISTED":
      return WorkflowMode.ASSISTED;
    case 2:
    case "MODE_AUTOMATED":
      return WorkflowMode.AUTOMATED;
    case 3:
    case "MODE_DEFAULT":
      return WorkflowMode.DEFAULT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WorkflowMode.UNRECOGNIZED;
  }
}

export function workflowModeToJSON(object: WorkflowMode): string {
  switch (object) {
    case WorkflowMode.UNSPECIFIED:
      return "MODE_UNSPECIFIED";
    case WorkflowMode.ASSISTED:
      return "MODE_ASSISTED";
    case WorkflowMode.AUTOMATED:
      return "MODE_AUTOMATED";
    case WorkflowMode.DEFAULT:
      return "MODE_DEFAULT";
    case WorkflowMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A process is inferred from one or more user recorded examples. */
export interface WorkflowProcess {
  $type?: "pb.v1alpha1.Workflow.Process";
  /** @deprecated */
  generatedActionGroups?: ActionGroup[] | undefined;
  actions?: Action[] | undefined;
  description?: string | undefined;
  id?:
    | string
    | undefined;
  /**
   * Execute the process when there is an error detected in any action. The
   * following information would be passed to the process:
   * 1. the environment variables for the current process.
   * 2. the error message.
   * 3. the failed action in serialized JSON format.
   */
  errorHandlingProcessId?: string | undefined;
}

export interface WorkflowExportOutput {
  $type?: "pb.v1alpha1.Workflow.ExportOutput";
  outputType?:
    | WorkflowExportOutputOutputType
    | undefined;
  /** stores the encryption required flag */
  encryptionEnabled?: boolean | undefined;
}

export enum WorkflowExportOutputOutputType {
  UNSPECIFIED = 0,
  JSON_FILE = 1,
  UNRECOGNIZED = -1,
}

export function workflowExportOutputOutputTypeFromJSON(object: any): WorkflowExportOutputOutputType {
  switch (object) {
    case 0:
    case "OUTPUT_TYPE_UNSPECIFIED":
      return WorkflowExportOutputOutputType.UNSPECIFIED;
    case 1:
    case "OUTPUT_TYPE_JSON_FILE":
      return WorkflowExportOutputOutputType.JSON_FILE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WorkflowExportOutputOutputType.UNRECOGNIZED;
  }
}

export function workflowExportOutputOutputTypeToJSON(object: WorkflowExportOutputOutputType): string {
  switch (object) {
    case WorkflowExportOutputOutputType.UNSPECIFIED:
      return "OUTPUT_TYPE_UNSPECIFIED";
    case WorkflowExportOutputOutputType.JSON_FILE:
      return "OUTPUT_TYPE_JSON_FILE";
    case WorkflowExportOutputOutputType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface WorkflowExecutionAssignment {
  $type?: "pb.v1alpha1.Workflow.ExecutionAssignment";
  assignmentStrategy?: WorkflowExecutionAssignmentAssignmentStrategy | undefined;
  machines?: WorkflowExecutionAssignmentMachines[] | undefined;
}

/** Assignment strategy for this workflow */
export interface WorkflowExecutionAssignmentAssignmentStrategy {
  $type?: "pb.v1alpha1.Workflow.ExecutionAssignment.AssignmentStrategy";
  assignmentStrategyType?: WorkflowExecutionAssignmentAssignmentStrategyAssignmentStrategyType | undefined;
}

export enum WorkflowExecutionAssignmentAssignmentStrategyAssignmentStrategyType {
  UNSPECIFIED = 0,
  BASIC_ROUND_ROBIN = 1,
  UNRECOGNIZED = -1,
}

export function workflowExecutionAssignmentAssignmentStrategyAssignmentStrategyTypeFromJSON(
  object: any,
): WorkflowExecutionAssignmentAssignmentStrategyAssignmentStrategyType {
  switch (object) {
    case 0:
    case "ASSIGNMENT_STRATEGY_TYPE_UNSPECIFIED":
      return WorkflowExecutionAssignmentAssignmentStrategyAssignmentStrategyType.UNSPECIFIED;
    case 1:
    case "BASIC_ROUND_ROBIN":
      return WorkflowExecutionAssignmentAssignmentStrategyAssignmentStrategyType.BASIC_ROUND_ROBIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WorkflowExecutionAssignmentAssignmentStrategyAssignmentStrategyType.UNRECOGNIZED;
  }
}

export function workflowExecutionAssignmentAssignmentStrategyAssignmentStrategyTypeToJSON(
  object: WorkflowExecutionAssignmentAssignmentStrategyAssignmentStrategyType,
): string {
  switch (object) {
    case WorkflowExecutionAssignmentAssignmentStrategyAssignmentStrategyType.UNSPECIFIED:
      return "ASSIGNMENT_STRATEGY_TYPE_UNSPECIFIED";
    case WorkflowExecutionAssignmentAssignmentStrategyAssignmentStrategyType.BASIC_ROUND_ROBIN:
      return "BASIC_ROUND_ROBIN";
    case WorkflowExecutionAssignmentAssignmentStrategyAssignmentStrategyType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** list of machines that can execute this workflow */
export interface WorkflowExecutionAssignmentMachines {
  $type?: "pb.v1alpha1.Workflow.ExecutionAssignment.Machines";
  id?: string | undefined;
  name?: string | undefined;
}

export interface WorkflowAdminEmailConfig {
  $type?: "pb.v1alpha1.WorkflowAdminEmailConfig";
  /**
   * Indicates whether to send emails to newly added admins.
   * Set to false to disable email notifications.
   */
  sendEmailToAdmins?:
    | boolean
    | undefined;
  /**
   * A message to be send to all newly added admins.
   * Skipping this will send a default message.
   */
  emailMessage?: string | undefined;
}

/** A workflow can be executed multiple times. */
export interface WorkflowTask {
  $type?: "pb.v1alpha1.WorkflowTask";
  /** task id, */
  id?: string | undefined;
  orgId?:
    | string
    | undefined;
  /** Workflow name such as 1234 */
  workflowId?: string | undefined;
  processId?: string | undefined;
  variables?:
    | WorkflowVariable[]
    | undefined;
  /** Time when the task is discovered */
  discoverTime?:
    | Date
    | undefined;
  /** Time when the task starts execution. */
  startTime?:
    | Date
    | undefined;
  /** Time when the task completes execution (whether successfully or not). */
  endTime?: Date | undefined;
  status?:
    | WorkflowTaskStatus
    | undefined;
  /** list of actions executed. */
  executedActions?:
    | ExecutedAction[]
    | undefined;
  /** message if status is FAIL. */
  errorMessage?:
    | string
    | undefined;
  /** Present if it is created by another task via the CreateTask action. */
  parentTaskId?:
    | string
    | undefined;
  /**
   * this is not stored in db, only executor_id/creator_id is stored in db.
   * this is assembled from the executor_id/creator_id and users collection.
   */
  creator?: UserProfileInfo | undefined;
  workflowDisplayName?:
    | string
    | undefined;
  /** The id corresponds to the browser instance that claims the execution */
  connectionId?:
    | string
    | undefined;
  /** User who claims and executes the execution */
  executorId?:
    | string
    | undefined;
  /**
   * This field is only populated for executions scheduled from temporal
   * workflow and the id correspond to temporal id
   */
  scheduleId?: string | undefined;
  deletedObjectInfo?:
    | DeletedObjectInfo
    | undefined;
  /**
   * Show how long the task will be retained in the system.
   * Calculation: (end_time / deleted_time) + organization retention policy
   * duration - current time.
   * If tasks is not deleted and not in final status(success/failed/
   * terminated), or if organization doesn't set retention policy, this field
   * will be null.
   */
  remainingRetention?:
    | Duration
    | undefined;
  /** Time when the task is last updated. */
  lastUpdateTime?: Date | undefined;
}

export enum WorkflowTaskStatus {
  UNSPECIFIED = 0,
  /** PENDING - the task has been discovered and created, but we haven't started execution. */
  PENDING = 1,
  /** EXECUTING - the task has been picked up for execution. */
  EXECUTING = 2,
  /** WAITING_FOR_REVIEW - the execution is suspended and waiting for human review. */
  WAITING_FOR_REVIEW = 3,
  /** SUCCESS - the execution has finished successfully. */
  SUCCESS = 4,
  /**
   * FAIL - there was error when executing the workflow and we cannot recover from it.
   * for other cases, there could be unexpected errors which cause direct failure.
   */
  FAIL = 5,
  /** TERMINATED - the task was terminated by the user. */
  TERMINATED = 6,
  /** PENDING_PROCEED - This is for temp purpose to represent waiting proceed executions. */
  PENDING_PROCEED = 7,
  UNRECOGNIZED = -1,
}

export function workflowTaskStatusFromJSON(object: any): WorkflowTaskStatus {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return WorkflowTaskStatus.UNSPECIFIED;
    case 1:
    case "PENDING":
      return WorkflowTaskStatus.PENDING;
    case 2:
    case "EXECUTING":
      return WorkflowTaskStatus.EXECUTING;
    case 3:
    case "WAITING_FOR_REVIEW":
      return WorkflowTaskStatus.WAITING_FOR_REVIEW;
    case 4:
    case "SUCCESS":
      return WorkflowTaskStatus.SUCCESS;
    case 5:
    case "FAIL":
      return WorkflowTaskStatus.FAIL;
    case 6:
    case "TERMINATED":
      return WorkflowTaskStatus.TERMINATED;
    case 7:
    case "PENDING_PROCEED":
      return WorkflowTaskStatus.PENDING_PROCEED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WorkflowTaskStatus.UNRECOGNIZED;
  }
}

export function workflowTaskStatusToJSON(object: WorkflowTaskStatus): string {
  switch (object) {
    case WorkflowTaskStatus.UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case WorkflowTaskStatus.PENDING:
      return "PENDING";
    case WorkflowTaskStatus.EXECUTING:
      return "EXECUTING";
    case WorkflowTaskStatus.WAITING_FOR_REVIEW:
      return "WAITING_FOR_REVIEW";
    case WorkflowTaskStatus.SUCCESS:
      return "SUCCESS";
    case WorkflowTaskStatus.FAIL:
      return "FAIL";
    case WorkflowTaskStatus.TERMINATED:
      return "TERMINATED";
    case WorkflowTaskStatus.PENDING_PROCEED:
      return "PENDING_PROCEED";
    case WorkflowTaskStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseWorkflow(): Workflow {
  return {
    $type: "pb.v1alpha1.Workflow",
    id: "",
    displayName: "",
    description: "",
    taskExecution: undefined,
    processes: [],
    createTime: undefined,
    lastUpdateTime: undefined,
    status: 0,
    orgId: "",
    actionsForReview: [],
    lowConfidenceThreshold: 0,
    exportOutput: undefined,
    reviewerIds: [],
    creatorId: "",
    creator: undefined,
    mode: 0,
    applications: [],
    schedules: [],
    adminIds: [],
    reviewerLists: [],
    executionAssignment: undefined,
    adminEmailConfig: undefined,
  };
}

export const Workflow = {
  $type: "pb.v1alpha1.Workflow" as const,

  encode(message: Workflow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.taskExecution !== undefined) {
      WorkflowProcess.encode(message.taskExecution, writer.uint32(42).fork()).ldelim();
    }
    if (message.processes !== undefined && message.processes.length !== 0) {
      for (const v of message.processes) {
        WorkflowProcess.encode(v!, writer.uint32(122).fork()).ldelim();
      }
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(50).fork()).ldelim();
    }
    if (message.lastUpdateTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastUpdateTime), writer.uint32(58).fork()).ldelim();
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(64).int32(message.status);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(74).string(message.orgId);
    }
    if (message.actionsForReview !== undefined && message.actionsForReview.length !== 0) {
      writer.uint32(82).fork();
      for (const v of message.actionsForReview) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.lowConfidenceThreshold !== undefined && message.lowConfidenceThreshold !== 0) {
      writer.uint32(93).float(message.lowConfidenceThreshold);
    }
    if (message.exportOutput !== undefined) {
      WorkflowExportOutput.encode(message.exportOutput, writer.uint32(98).fork()).ldelim();
    }
    if (message.reviewerIds !== undefined && message.reviewerIds.length !== 0) {
      for (const v of message.reviewerIds) {
        writer.uint32(106).string(v!);
      }
    }
    if (message.creatorId !== undefined && message.creatorId !== "") {
      writer.uint32(114).string(message.creatorId);
    }
    if (message.creator !== undefined) {
      UserProfileInfo.encode(message.creator, writer.uint32(130).fork()).ldelim();
    }
    if (message.mode !== undefined && message.mode !== 0) {
      writer.uint32(136).int32(message.mode);
    }
    if (message.applications !== undefined && message.applications.length !== 0) {
      for (const v of message.applications) {
        writer.uint32(146).string(v!);
      }
    }
    if (message.schedules !== undefined && message.schedules.length !== 0) {
      for (const v of message.schedules) {
        Schedule.encode(v!, writer.uint32(154).fork()).ldelim();
      }
    }
    if (message.adminIds !== undefined && message.adminIds.length !== 0) {
      for (const v of message.adminIds) {
        writer.uint32(162).string(v!);
      }
    }
    if (message.reviewerLists !== undefined && message.reviewerLists.length !== 0) {
      for (const v of message.reviewerLists) {
        ReviewerList.encode(v!, writer.uint32(170).fork()).ldelim();
      }
    }
    if (message.executionAssignment !== undefined) {
      WorkflowExecutionAssignment.encode(message.executionAssignment, writer.uint32(178).fork()).ldelim();
    }
    if (message.adminEmailConfig !== undefined) {
      WorkflowAdminEmailConfig.encode(message.adminEmailConfig, writer.uint32(186).fork()).ldelim();
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

          message.id = reader.string();
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

          message.description = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.taskExecution = WorkflowProcess.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.processes!.push(WorkflowProcess.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.createTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.lastUpdateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 10:
          if (tag === 80) {
            message.actionsForReview!.push(reader.int32() as any);

            continue;
          }

          if (tag === 82) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.actionsForReview!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 11:
          if (tag !== 93) {
            break;
          }

          message.lowConfidenceThreshold = reader.float();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.exportOutput = WorkflowExportOutput.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.reviewerIds!.push(reader.string());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.creatorId = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.creator = UserProfileInfo.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.applications!.push(reader.string());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.schedules!.push(Schedule.decode(reader, reader.uint32()));
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.adminIds!.push(reader.string());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.reviewerLists!.push(ReviewerList.decode(reader, reader.uint32()));
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.executionAssignment = WorkflowExecutionAssignment.decode(reader, reader.uint32());
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.adminEmailConfig = WorkflowAdminEmailConfig.decode(reader, reader.uint32());
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
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      taskExecution: isSet(object.taskExecution) ? WorkflowProcess.fromJSON(object.taskExecution) : undefined,
      processes: globalThis.Array.isArray(object?.processes)
        ? object.processes.map((e: any) => WorkflowProcess.fromJSON(e))
        : [],
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      lastUpdateTime: isSet(object.lastUpdateTime) ? fromJsonTimestamp(object.lastUpdateTime) : undefined,
      status: isSet(object.status) ? workflowStatusFromJSON(object.status) : 0,
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      actionsForReview: globalThis.Array.isArray(object?.actionsForReview)
        ? object.actionsForReview.map((e: any) => workflowActionsForReviewFromJSON(e))
        : [],
      lowConfidenceThreshold: isSet(object.lowConfidenceThreshold)
        ? globalThis.Number(object.lowConfidenceThreshold)
        : 0,
      exportOutput: isSet(object.exportOutput) ? WorkflowExportOutput.fromJSON(object.exportOutput) : undefined,
      reviewerIds: globalThis.Array.isArray(object?.reviewerIds)
        ? object.reviewerIds.map((e: any) => globalThis.String(e))
        : [],
      creatorId: isSet(object.creatorId) ? globalThis.String(object.creatorId) : "",
      creator: isSet(object.creator) ? UserProfileInfo.fromJSON(object.creator) : undefined,
      mode: isSet(object.mode) ? workflowModeFromJSON(object.mode) : 0,
      applications: globalThis.Array.isArray(object?.applications)
        ? object.applications.map((e: any) => globalThis.String(e))
        : [],
      schedules: globalThis.Array.isArray(object?.schedules)
        ? object.schedules.map((e: any) => Schedule.fromJSON(e))
        : [],
      adminIds: globalThis.Array.isArray(object?.adminIds) ? object.adminIds.map((e: any) => globalThis.String(e)) : [],
      reviewerLists: globalThis.Array.isArray(object?.reviewerLists)
        ? object.reviewerLists.map((e: any) => ReviewerList.fromJSON(e))
        : [],
      executionAssignment: isSet(object.executionAssignment)
        ? WorkflowExecutionAssignment.fromJSON(object.executionAssignment)
        : undefined,
      adminEmailConfig: isSet(object.adminEmailConfig)
        ? WorkflowAdminEmailConfig.fromJSON(object.adminEmailConfig)
        : undefined,
    };
  },

  toJSON(message: Workflow): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.taskExecution !== undefined) {
      obj.taskExecution = WorkflowProcess.toJSON(message.taskExecution);
    }
    if (message.processes?.length) {
      obj.processes = message.processes.map((e) => WorkflowProcess.toJSON(e));
    }
    if (message.createTime !== undefined) {
      obj.createTime = message.createTime.toISOString();
    }
    if (message.lastUpdateTime !== undefined) {
      obj.lastUpdateTime = message.lastUpdateTime.toISOString();
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = workflowStatusToJSON(message.status);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.actionsForReview?.length) {
      obj.actionsForReview = message.actionsForReview.map((e) => workflowActionsForReviewToJSON(e));
    }
    if (message.lowConfidenceThreshold !== undefined && message.lowConfidenceThreshold !== 0) {
      obj.lowConfidenceThreshold = message.lowConfidenceThreshold;
    }
    if (message.exportOutput !== undefined) {
      obj.exportOutput = WorkflowExportOutput.toJSON(message.exportOutput);
    }
    if (message.reviewerIds?.length) {
      obj.reviewerIds = message.reviewerIds;
    }
    if (message.creatorId !== undefined && message.creatorId !== "") {
      obj.creatorId = message.creatorId;
    }
    if (message.creator !== undefined) {
      obj.creator = UserProfileInfo.toJSON(message.creator);
    }
    if (message.mode !== undefined && message.mode !== 0) {
      obj.mode = workflowModeToJSON(message.mode);
    }
    if (message.applications?.length) {
      obj.applications = message.applications;
    }
    if (message.schedules?.length) {
      obj.schedules = message.schedules.map((e) => Schedule.toJSON(e));
    }
    if (message.adminIds?.length) {
      obj.adminIds = message.adminIds;
    }
    if (message.reviewerLists?.length) {
      obj.reviewerLists = message.reviewerLists.map((e) => ReviewerList.toJSON(e));
    }
    if (message.executionAssignment !== undefined) {
      obj.executionAssignment = WorkflowExecutionAssignment.toJSON(message.executionAssignment);
    }
    if (message.adminEmailConfig !== undefined) {
      obj.adminEmailConfig = WorkflowAdminEmailConfig.toJSON(message.adminEmailConfig);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Workflow>, I>>(base?: I): Workflow {
    return Workflow.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Workflow>, I>>(object: I): Workflow {
    const message = createBaseWorkflow();
    message.id = object.id ?? "";
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.taskExecution = (object.taskExecution !== undefined && object.taskExecution !== null)
      ? WorkflowProcess.fromPartial(object.taskExecution)
      : undefined;
    message.processes = object.processes?.map((e) => WorkflowProcess.fromPartial(e)) || [];
    message.createTime = object.createTime ?? undefined;
    message.lastUpdateTime = object.lastUpdateTime ?? undefined;
    message.status = object.status ?? 0;
    message.orgId = object.orgId ?? "";
    message.actionsForReview = object.actionsForReview?.map((e) => e) || [];
    message.lowConfidenceThreshold = object.lowConfidenceThreshold ?? 0;
    message.exportOutput = (object.exportOutput !== undefined && object.exportOutput !== null)
      ? WorkflowExportOutput.fromPartial(object.exportOutput)
      : undefined;
    message.reviewerIds = object.reviewerIds?.map((e) => e) || [];
    message.creatorId = object.creatorId ?? "";
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? UserProfileInfo.fromPartial(object.creator)
      : undefined;
    message.mode = object.mode ?? 0;
    message.applications = object.applications?.map((e) => e) || [];
    message.schedules = object.schedules?.map((e) => Schedule.fromPartial(e)) || [];
    message.adminIds = object.adminIds?.map((e) => e) || [];
    message.reviewerLists = object.reviewerLists?.map((e) => ReviewerList.fromPartial(e)) || [];
    message.executionAssignment = (object.executionAssignment !== undefined && object.executionAssignment !== null)
      ? WorkflowExecutionAssignment.fromPartial(object.executionAssignment)
      : undefined;
    message.adminEmailConfig = (object.adminEmailConfig !== undefined && object.adminEmailConfig !== null)
      ? WorkflowAdminEmailConfig.fromPartial(object.adminEmailConfig)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(Workflow.$type, Workflow);

function createBaseWorkflowProcess(): WorkflowProcess {
  return {
    $type: "pb.v1alpha1.Workflow.Process",
    generatedActionGroups: [],
    actions: [],
    description: "",
    id: "",
    errorHandlingProcessId: "",
  };
}

export const WorkflowProcess = {
  $type: "pb.v1alpha1.Workflow.Process" as const,

  encode(message: WorkflowProcess, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.generatedActionGroups !== undefined && message.generatedActionGroups.length !== 0) {
      for (const v of message.generatedActionGroups) {
        ActionGroup.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.actions !== undefined && message.actions.length !== 0) {
      for (const v of message.actions) {
        Action.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(34).string(message.id);
    }
    if (message.errorHandlingProcessId !== undefined && message.errorHandlingProcessId !== "") {
      writer.uint32(50).string(message.errorHandlingProcessId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowProcess {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowProcess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.generatedActionGroups!.push(ActionGroup.decode(reader, reader.uint32()));
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.actions!.push(Action.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.id = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.errorHandlingProcessId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowProcess {
    return {
      $type: WorkflowProcess.$type,
      generatedActionGroups: globalThis.Array.isArray(object?.generatedActionGroups)
        ? object.generatedActionGroups.map((e: any) => ActionGroup.fromJSON(e))
        : [],
      actions: globalThis.Array.isArray(object?.actions) ? object.actions.map((e: any) => Action.fromJSON(e)) : [],
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      errorHandlingProcessId: isSet(object.errorHandlingProcessId)
        ? globalThis.String(object.errorHandlingProcessId)
        : "",
    };
  },

  toJSON(message: WorkflowProcess): unknown {
    const obj: any = {};
    if (message.generatedActionGroups?.length) {
      obj.generatedActionGroups = message.generatedActionGroups.map((e) => ActionGroup.toJSON(e));
    }
    if (message.actions?.length) {
      obj.actions = message.actions.map((e) => Action.toJSON(e));
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.errorHandlingProcessId !== undefined && message.errorHandlingProcessId !== "") {
      obj.errorHandlingProcessId = message.errorHandlingProcessId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowProcess>, I>>(base?: I): WorkflowProcess {
    return WorkflowProcess.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowProcess>, I>>(object: I): WorkflowProcess {
    const message = createBaseWorkflowProcess();
    message.generatedActionGroups = object.generatedActionGroups?.map((e) => ActionGroup.fromPartial(e)) || [];
    message.actions = object.actions?.map((e) => Action.fromPartial(e)) || [];
    message.description = object.description ?? "";
    message.id = object.id ?? "";
    message.errorHandlingProcessId = object.errorHandlingProcessId ?? "";
    return message;
  },
};

messageTypeRegistry.set(WorkflowProcess.$type, WorkflowProcess);

function createBaseWorkflowExportOutput(): WorkflowExportOutput {
  return { $type: "pb.v1alpha1.Workflow.ExportOutput", outputType: 0, encryptionEnabled: false };
}

export const WorkflowExportOutput = {
  $type: "pb.v1alpha1.Workflow.ExportOutput" as const,

  encode(message: WorkflowExportOutput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.outputType !== undefined && message.outputType !== 0) {
      writer.uint32(8).int32(message.outputType);
    }
    if (message.encryptionEnabled !== undefined && message.encryptionEnabled !== false) {
      writer.uint32(16).bool(message.encryptionEnabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowExportOutput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowExportOutput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.outputType = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.encryptionEnabled = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowExportOutput {
    return {
      $type: WorkflowExportOutput.$type,
      outputType: isSet(object.outputType) ? workflowExportOutputOutputTypeFromJSON(object.outputType) : 0,
      encryptionEnabled: isSet(object.encryptionEnabled) ? globalThis.Boolean(object.encryptionEnabled) : false,
    };
  },

  toJSON(message: WorkflowExportOutput): unknown {
    const obj: any = {};
    if (message.outputType !== undefined && message.outputType !== 0) {
      obj.outputType = workflowExportOutputOutputTypeToJSON(message.outputType);
    }
    if (message.encryptionEnabled !== undefined && message.encryptionEnabled !== false) {
      obj.encryptionEnabled = message.encryptionEnabled;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowExportOutput>, I>>(base?: I): WorkflowExportOutput {
    return WorkflowExportOutput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowExportOutput>, I>>(object: I): WorkflowExportOutput {
    const message = createBaseWorkflowExportOutput();
    message.outputType = object.outputType ?? 0;
    message.encryptionEnabled = object.encryptionEnabled ?? false;
    return message;
  },
};

messageTypeRegistry.set(WorkflowExportOutput.$type, WorkflowExportOutput);

function createBaseWorkflowExecutionAssignment(): WorkflowExecutionAssignment {
  return { $type: "pb.v1alpha1.Workflow.ExecutionAssignment", assignmentStrategy: undefined, machines: [] };
}

export const WorkflowExecutionAssignment = {
  $type: "pb.v1alpha1.Workflow.ExecutionAssignment" as const,

  encode(message: WorkflowExecutionAssignment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.assignmentStrategy !== undefined) {
      WorkflowExecutionAssignmentAssignmentStrategy.encode(message.assignmentStrategy, writer.uint32(10).fork())
        .ldelim();
    }
    if (message.machines !== undefined && message.machines.length !== 0) {
      for (const v of message.machines) {
        WorkflowExecutionAssignmentMachines.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowExecutionAssignment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowExecutionAssignment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.assignmentStrategy = WorkflowExecutionAssignmentAssignmentStrategy.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.machines!.push(WorkflowExecutionAssignmentMachines.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowExecutionAssignment {
    return {
      $type: WorkflowExecutionAssignment.$type,
      assignmentStrategy: isSet(object.assignmentStrategy)
        ? WorkflowExecutionAssignmentAssignmentStrategy.fromJSON(object.assignmentStrategy)
        : undefined,
      machines: globalThis.Array.isArray(object?.machines)
        ? object.machines.map((e: any) => WorkflowExecutionAssignmentMachines.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WorkflowExecutionAssignment): unknown {
    const obj: any = {};
    if (message.assignmentStrategy !== undefined) {
      obj.assignmentStrategy = WorkflowExecutionAssignmentAssignmentStrategy.toJSON(message.assignmentStrategy);
    }
    if (message.machines?.length) {
      obj.machines = message.machines.map((e) => WorkflowExecutionAssignmentMachines.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowExecutionAssignment>, I>>(base?: I): WorkflowExecutionAssignment {
    return WorkflowExecutionAssignment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowExecutionAssignment>, I>>(object: I): WorkflowExecutionAssignment {
    const message = createBaseWorkflowExecutionAssignment();
    message.assignmentStrategy = (object.assignmentStrategy !== undefined && object.assignmentStrategy !== null)
      ? WorkflowExecutionAssignmentAssignmentStrategy.fromPartial(object.assignmentStrategy)
      : undefined;
    message.machines = object.machines?.map((e) => WorkflowExecutionAssignmentMachines.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(WorkflowExecutionAssignment.$type, WorkflowExecutionAssignment);

function createBaseWorkflowExecutionAssignmentAssignmentStrategy(): WorkflowExecutionAssignmentAssignmentStrategy {
  return { $type: "pb.v1alpha1.Workflow.ExecutionAssignment.AssignmentStrategy", assignmentStrategyType: 0 };
}

export const WorkflowExecutionAssignmentAssignmentStrategy = {
  $type: "pb.v1alpha1.Workflow.ExecutionAssignment.AssignmentStrategy" as const,

  encode(message: WorkflowExecutionAssignmentAssignmentStrategy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.assignmentStrategyType !== undefined && message.assignmentStrategyType !== 0) {
      writer.uint32(8).int32(message.assignmentStrategyType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowExecutionAssignmentAssignmentStrategy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowExecutionAssignmentAssignmentStrategy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.assignmentStrategyType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowExecutionAssignmentAssignmentStrategy {
    return {
      $type: WorkflowExecutionAssignmentAssignmentStrategy.$type,
      assignmentStrategyType: isSet(object.assignmentStrategyType)
        ? workflowExecutionAssignmentAssignmentStrategyAssignmentStrategyTypeFromJSON(object.assignmentStrategyType)
        : 0,
    };
  },

  toJSON(message: WorkflowExecutionAssignmentAssignmentStrategy): unknown {
    const obj: any = {};
    if (message.assignmentStrategyType !== undefined && message.assignmentStrategyType !== 0) {
      obj.assignmentStrategyType = workflowExecutionAssignmentAssignmentStrategyAssignmentStrategyTypeToJSON(
        message.assignmentStrategyType,
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowExecutionAssignmentAssignmentStrategy>, I>>(
    base?: I,
  ): WorkflowExecutionAssignmentAssignmentStrategy {
    return WorkflowExecutionAssignmentAssignmentStrategy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowExecutionAssignmentAssignmentStrategy>, I>>(
    object: I,
  ): WorkflowExecutionAssignmentAssignmentStrategy {
    const message = createBaseWorkflowExecutionAssignmentAssignmentStrategy();
    message.assignmentStrategyType = object.assignmentStrategyType ?? 0;
    return message;
  },
};

messageTypeRegistry.set(
  WorkflowExecutionAssignmentAssignmentStrategy.$type,
  WorkflowExecutionAssignmentAssignmentStrategy,
);

function createBaseWorkflowExecutionAssignmentMachines(): WorkflowExecutionAssignmentMachines {
  return { $type: "pb.v1alpha1.Workflow.ExecutionAssignment.Machines", id: "", name: "" };
}

export const WorkflowExecutionAssignmentMachines = {
  $type: "pb.v1alpha1.Workflow.ExecutionAssignment.Machines" as const,

  encode(message: WorkflowExecutionAssignmentMachines, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowExecutionAssignmentMachines {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowExecutionAssignmentMachines();
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

  fromJSON(object: any): WorkflowExecutionAssignmentMachines {
    return {
      $type: WorkflowExecutionAssignmentMachines.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: WorkflowExecutionAssignmentMachines): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowExecutionAssignmentMachines>, I>>(
    base?: I,
  ): WorkflowExecutionAssignmentMachines {
    return WorkflowExecutionAssignmentMachines.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowExecutionAssignmentMachines>, I>>(
    object: I,
  ): WorkflowExecutionAssignmentMachines {
    const message = createBaseWorkflowExecutionAssignmentMachines();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

messageTypeRegistry.set(WorkflowExecutionAssignmentMachines.$type, WorkflowExecutionAssignmentMachines);

function createBaseWorkflowAdminEmailConfig(): WorkflowAdminEmailConfig {
  return { $type: "pb.v1alpha1.WorkflowAdminEmailConfig", sendEmailToAdmins: false, emailMessage: "" };
}

export const WorkflowAdminEmailConfig = {
  $type: "pb.v1alpha1.WorkflowAdminEmailConfig" as const,

  encode(message: WorkflowAdminEmailConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sendEmailToAdmins !== undefined && message.sendEmailToAdmins !== false) {
      writer.uint32(8).bool(message.sendEmailToAdmins);
    }
    if (message.emailMessage !== undefined && message.emailMessage !== "") {
      writer.uint32(18).string(message.emailMessage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowAdminEmailConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowAdminEmailConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.sendEmailToAdmins = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.emailMessage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowAdminEmailConfig {
    return {
      $type: WorkflowAdminEmailConfig.$type,
      sendEmailToAdmins: isSet(object.sendEmailToAdmins) ? globalThis.Boolean(object.sendEmailToAdmins) : false,
      emailMessage: isSet(object.emailMessage) ? globalThis.String(object.emailMessage) : "",
    };
  },

  toJSON(message: WorkflowAdminEmailConfig): unknown {
    const obj: any = {};
    if (message.sendEmailToAdmins !== undefined && message.sendEmailToAdmins !== false) {
      obj.sendEmailToAdmins = message.sendEmailToAdmins;
    }
    if (message.emailMessage !== undefined && message.emailMessage !== "") {
      obj.emailMessage = message.emailMessage;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowAdminEmailConfig>, I>>(base?: I): WorkflowAdminEmailConfig {
    return WorkflowAdminEmailConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowAdminEmailConfig>, I>>(object: I): WorkflowAdminEmailConfig {
    const message = createBaseWorkflowAdminEmailConfig();
    message.sendEmailToAdmins = object.sendEmailToAdmins ?? false;
    message.emailMessage = object.emailMessage ?? "";
    return message;
  },
};

messageTypeRegistry.set(WorkflowAdminEmailConfig.$type, WorkflowAdminEmailConfig);

function createBaseWorkflowTask(): WorkflowTask {
  return {
    $type: "pb.v1alpha1.WorkflowTask",
    id: "",
    orgId: "",
    workflowId: "",
    processId: "",
    variables: [],
    discoverTime: undefined,
    startTime: undefined,
    endTime: undefined,
    status: 0,
    executedActions: [],
    errorMessage: "",
    parentTaskId: "",
    creator: undefined,
    workflowDisplayName: "",
    connectionId: "",
    executorId: "",
    scheduleId: "",
    deletedObjectInfo: undefined,
    remainingRetention: undefined,
    lastUpdateTime: undefined,
  };
}

export const WorkflowTask = {
  $type: "pb.v1alpha1.WorkflowTask" as const,

  encode(message: WorkflowTask, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(162).string(message.orgId);
    }
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(18).string(message.workflowId);
    }
    if (message.processId !== undefined && message.processId !== "") {
      writer.uint32(90).string(message.processId);
    }
    if (message.variables !== undefined && message.variables.length !== 0) {
      for (const v of message.variables) {
        WorkflowVariable.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.discoverTime !== undefined) {
      Timestamp.encode(toTimestamp(message.discoverTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(50).fork()).ldelim();
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(56).int32(message.status);
    }
    if (message.executedActions !== undefined && message.executedActions.length !== 0) {
      for (const v of message.executedActions) {
        ExecutedAction.encode(v!, writer.uint32(66).fork()).ldelim();
      }
    }
    if (message.errorMessage !== undefined && message.errorMessage !== "") {
      writer.uint32(74).string(message.errorMessage);
    }
    if (message.parentTaskId !== undefined && message.parentTaskId !== "") {
      writer.uint32(82).string(message.parentTaskId);
    }
    if (message.creator !== undefined) {
      UserProfileInfo.encode(message.creator, writer.uint32(98).fork()).ldelim();
    }
    if (message.workflowDisplayName !== undefined && message.workflowDisplayName !== "") {
      writer.uint32(106).string(message.workflowDisplayName);
    }
    if (message.connectionId !== undefined && message.connectionId !== "") {
      writer.uint32(114).string(message.connectionId);
    }
    if (message.executorId !== undefined && message.executorId !== "") {
      writer.uint32(122).string(message.executorId);
    }
    if (message.scheduleId !== undefined && message.scheduleId !== "") {
      writer.uint32(130).string(message.scheduleId);
    }
    if (message.deletedObjectInfo !== undefined) {
      DeletedObjectInfo.encode(message.deletedObjectInfo, writer.uint32(138).fork()).ldelim();
    }
    if (message.remainingRetention !== undefined) {
      Duration.encode(message.remainingRetention, writer.uint32(146).fork()).ldelim();
    }
    if (message.lastUpdateTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastUpdateTime), writer.uint32(154).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowTask {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowTask();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.workflowId = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.processId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.variables!.push(WorkflowVariable.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.discoverTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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

          message.executedActions!.push(ExecutedAction.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.errorMessage = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.parentTaskId = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.creator = UserProfileInfo.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.workflowDisplayName = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.connectionId = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.executorId = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.scheduleId = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.deletedObjectInfo = DeletedObjectInfo.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.remainingRetention = Duration.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.lastUpdateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowTask {
    return {
      $type: WorkflowTask.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      processId: isSet(object.processId) ? globalThis.String(object.processId) : "",
      variables: globalThis.Array.isArray(object?.variables)
        ? object.variables.map((e: any) => WorkflowVariable.fromJSON(e))
        : [],
      discoverTime: isSet(object.discoverTime) ? fromJsonTimestamp(object.discoverTime) : undefined,
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
      status: isSet(object.status) ? workflowTaskStatusFromJSON(object.status) : 0,
      executedActions: globalThis.Array.isArray(object?.executedActions)
        ? object.executedActions.map((e: any) => ExecutedAction.fromJSON(e))
        : [],
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : "",
      parentTaskId: isSet(object.parentTaskId) ? globalThis.String(object.parentTaskId) : "",
      creator: isSet(object.creator) ? UserProfileInfo.fromJSON(object.creator) : undefined,
      workflowDisplayName: isSet(object.workflowDisplayName) ? globalThis.String(object.workflowDisplayName) : "",
      connectionId: isSet(object.connectionId) ? globalThis.String(object.connectionId) : "",
      executorId: isSet(object.executorId) ? globalThis.String(object.executorId) : "",
      scheduleId: isSet(object.scheduleId) ? globalThis.String(object.scheduleId) : "",
      deletedObjectInfo: isSet(object.deletedObjectInfo)
        ? DeletedObjectInfo.fromJSON(object.deletedObjectInfo)
        : undefined,
      remainingRetention: isSet(object.remainingRetention) ? Duration.fromJSON(object.remainingRetention) : undefined,
      lastUpdateTime: isSet(object.lastUpdateTime) ? fromJsonTimestamp(object.lastUpdateTime) : undefined,
    };
  },

  toJSON(message: WorkflowTask): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.workflowId !== undefined && message.workflowId !== "") {
      obj.workflowId = message.workflowId;
    }
    if (message.processId !== undefined && message.processId !== "") {
      obj.processId = message.processId;
    }
    if (message.variables?.length) {
      obj.variables = message.variables.map((e) => WorkflowVariable.toJSON(e));
    }
    if (message.discoverTime !== undefined) {
      obj.discoverTime = message.discoverTime.toISOString();
    }
    if (message.startTime !== undefined) {
      obj.startTime = message.startTime.toISOString();
    }
    if (message.endTime !== undefined) {
      obj.endTime = message.endTime.toISOString();
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = workflowTaskStatusToJSON(message.status);
    }
    if (message.executedActions?.length) {
      obj.executedActions = message.executedActions.map((e) => ExecutedAction.toJSON(e));
    }
    if (message.errorMessage !== undefined && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    if (message.parentTaskId !== undefined && message.parentTaskId !== "") {
      obj.parentTaskId = message.parentTaskId;
    }
    if (message.creator !== undefined) {
      obj.creator = UserProfileInfo.toJSON(message.creator);
    }
    if (message.workflowDisplayName !== undefined && message.workflowDisplayName !== "") {
      obj.workflowDisplayName = message.workflowDisplayName;
    }
    if (message.connectionId !== undefined && message.connectionId !== "") {
      obj.connectionId = message.connectionId;
    }
    if (message.executorId !== undefined && message.executorId !== "") {
      obj.executorId = message.executorId;
    }
    if (message.scheduleId !== undefined && message.scheduleId !== "") {
      obj.scheduleId = message.scheduleId;
    }
    if (message.deletedObjectInfo !== undefined) {
      obj.deletedObjectInfo = DeletedObjectInfo.toJSON(message.deletedObjectInfo);
    }
    if (message.remainingRetention !== undefined) {
      obj.remainingRetention = Duration.toJSON(message.remainingRetention);
    }
    if (message.lastUpdateTime !== undefined) {
      obj.lastUpdateTime = message.lastUpdateTime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowTask>, I>>(base?: I): WorkflowTask {
    return WorkflowTask.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowTask>, I>>(object: I): WorkflowTask {
    const message = createBaseWorkflowTask();
    message.id = object.id ?? "";
    message.orgId = object.orgId ?? "";
    message.workflowId = object.workflowId ?? "";
    message.processId = object.processId ?? "";
    message.variables = object.variables?.map((e) => WorkflowVariable.fromPartial(e)) || [];
    message.discoverTime = object.discoverTime ?? undefined;
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    message.status = object.status ?? 0;
    message.executedActions = object.executedActions?.map((e) => ExecutedAction.fromPartial(e)) || [];
    message.errorMessage = object.errorMessage ?? "";
    message.parentTaskId = object.parentTaskId ?? "";
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? UserProfileInfo.fromPartial(object.creator)
      : undefined;
    message.workflowDisplayName = object.workflowDisplayName ?? "";
    message.connectionId = object.connectionId ?? "";
    message.executorId = object.executorId ?? "";
    message.scheduleId = object.scheduleId ?? "";
    message.deletedObjectInfo = (object.deletedObjectInfo !== undefined && object.deletedObjectInfo !== null)
      ? DeletedObjectInfo.fromPartial(object.deletedObjectInfo)
      : undefined;
    message.remainingRetention = (object.remainingRetention !== undefined && object.remainingRetention !== null)
      ? Duration.fromPartial(object.remainingRetention)
      : undefined;
    message.lastUpdateTime = object.lastUpdateTime ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WorkflowTask.$type, WorkflowTask);

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
