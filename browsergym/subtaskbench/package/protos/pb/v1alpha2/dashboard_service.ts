/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";
import { UserProfileInfo } from "../../common/user_profile";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha2";

export interface GetDashboardStatsRequest {
  $type?: "pb.v1alpha2.GetDashboardStatsRequest";
  /**
   * this must be set since stats belong to a particular organization.
   * Organization resource name. Format: organizations/{ID}
   */
  orgResourceName?:
    | string
    | undefined;
  /**
   * Supported filter: "workflow_resource_names=workflows/{workflowId},
   * user_resource_names=users/{userId},start_date={date},end_date={date},
   * workflow_type={extraction|classification},time_offset={offset}"
   * valid values for start_date and end_date filters are in the Unix timestamp 1706592027,
   * multiple workflow and username values filter with a dash (-) separator,
   * providing workflow_type will fetch all the workflows of that type i.e Extraction or Classification,
   * no need to set workflow_resource_names if all the workflows of that type are selected.
   * Using union to handle combinations of workflow_resource_names and workflow_type.
   * eg. "workflow_resource_names=workflows/65404f99ed26dc3f3f1ea934-workflows/653ba877f6af227a3a47d2c5"
   * time_offset is hours to offset the time from UTC, eg time_offset=-7 for PST and time_offset=5.5 for IST.
   */
  filter?: string | undefined;
}

export interface TaskSummaryStats {
  $type?: "pb.v1alpha2.TaskSummaryStats";
  /** total hours saved */
  totalHoursSaved?:
    | number
    | undefined;
  /** total Orby's accuracy */
  totalAccuracy?: number | undefined;
}

export interface TaskStatusStats {
  $type?: "pb.v1alpha2.TaskStatusStats";
  /**
   * count of total tasks, which includes pending, error, completed and
   * declined tasks
   */
  totalTaskCount?:
    | number
    | undefined;
  /** count of total created tasks */
  createdTasksCount?:
    | number
    | undefined;
  /** count of total completed tasks */
  completedTasksCount?:
    | number
    | undefined;
  /** count of total pending tasks */
  pendingTasksCount?:
    | number
    | undefined;
  /** count of total declined tasks */
  declinedTasksCount?:
    | number
    | undefined;
  /** count of tasks with error */
  errorTasksCount?: number | undefined;
}

export interface ExecutionStats {
  $type?: "pb.v1alpha2.ExecutionStats";
  /** Total number of filtered workflows */
  totalWorkflows?:
    | number
    | undefined;
  /** Total number of executions across all filtered workflows */
  totalExecutions?:
    | number
    | undefined;
  /** Number of completed executions */
  completedExecutions?:
    | number
    | undefined;
  /** Number of executions that need attention (i.e. blocked executions) */
  needsAttentionExecutions?:
    | number
    | undefined;
  /** Number of executions with errors */
  errorExecutions?:
    | number
    | undefined;
  /** Number of executions currently in progress */
  inProgressExecutions?:
    | number
    | undefined;
  /** Number of workflows that need attention (i.e. blocked workflows) */
  needsAttentionWorkflows?: number | undefined;
}

export interface TeamStats {
  $type?: "pb.v1alpha2.TeamStats";
  /** total review time spent in minutes for completed tasks */
  totalTimeSpent?:
    | number
    | undefined;
  /** average review time spent per task in minutes for completed tasks */
  avgTimePerTask?:
    | number
    | undefined;
  /** Total user count in the team */
  totalUserCount?:
    | number
    | undefined;
  /**
   * return recent users in the team by join date descending order
   * (e.g. recent 10 users)
   */
  recentUserProfiles?: UserProfileInfo[] | undefined;
}

export interface GetDashboardStatsResponse {
  $type?: "pb.v1alpha2.GetDashboardStatsResponse";
  /** @deprecated */
  taskSummary?: TaskSummaryStats | undefined;
  taskStatus?: TaskStatusStats | undefined;
  automationStats?: AutomationStats | undefined;
  accuracyStats?: AccuracyStats | undefined;
  executionStats?: ExecutionStats | undefined;
  teamStats?: TeamStats | undefined;
}

export interface AutomationStats {
  $type?: "pb.v1alpha2.AutomationStats";
  /**
   * we show the stats for the past few days irrespective of the time filter.
   * the last element will be the previous day's stats, the second last will
   * be the day before yesterday's stats and so on.
   * we show the stats for the past 7 days for October 2024.
   * This field is deprecated and will be removed in the future.
   * Use successful_automation_counts instead.
   *
   * @deprecated
   */
  dailyAutomations?: number[] | undefined;
  totalSuccessfulExecutions?: number | undefined;
  totalDocumentsAutomated?:
    | number
    | undefined;
  /** Total hours saved by automation in minutes */
  totalHoursSaved?:
    | number
    | undefined;
  /**
   * The number of successful automations in the duration of the filter.
   * We currently support showing the stats for upto 30 months.
   */
  successfulAutomationCounts?:
    | AutomationStatsAutomationPeriodStat[]
    | undefined;
  /** The executions summary in the duration of the filter. */
  executionSummary?: AutomationStatsExecutionSummary | undefined;
}

export interface AutomationStatsAutomationPeriodStat {
  $type?: "pb.v1alpha2.AutomationStats.AutomationPeriodStat";
  /**
   * Can represent either a date (YYYY-MM-DD) or a month (YYYY-MM).
   * If the duration for which the stats are shown is more than a month,
   * then the period will be a month, otherwise, it will be a date.
   */
  period?:
    | string
    | undefined;
  /** The corresponding successful automation count for the period. */
  count?: number | undefined;
}

export interface AutomationStatsExecutionSummary {
  $type?: "pb.v1alpha2.AutomationStats.ExecutionSummary";
  /** The total number of executions executed */
  totalExecutions?:
    | number
    | undefined;
  /** The total number of executions that resulted in an error */
  totalErrorExecutions?:
    | number
    | undefined;
  /** The total number of executions that were blocked */
  totalBlockedExecutions?: number | undefined;
}

export interface AccuracyStats {
  $type?: "pb.v1alpha2.AccuracyStats";
  averageExtractionAccuracy?: number | undefined;
  averageClassificationAccuracy?:
    | number
    | undefined;
  /**
   * This field will show the top workflows with the highest accuracy
   * and the workflows will be sorted in descending order of accuracy.
   */
  workflowStats?: AccuracyStatsWorkflowStat[] | undefined;
}

export interface AccuracyStatsWorkflowStat {
  $type?: "pb.v1alpha2.AccuracyStats.WorkflowStat";
  workflowDisplayName?: string | undefined;
  averageAccuracy?: number | undefined;
}

function createBaseGetDashboardStatsRequest(): GetDashboardStatsRequest {
  return { $type: "pb.v1alpha2.GetDashboardStatsRequest", orgResourceName: "", filter: "" };
}

export const GetDashboardStatsRequest = {
  $type: "pb.v1alpha2.GetDashboardStatsRequest" as const,

  encode(message: GetDashboardStatsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(10).string(message.orgResourceName);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(18).string(message.filter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDashboardStatsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDashboardStatsRequest();
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

          message.filter = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDashboardStatsRequest {
    return {
      $type: GetDashboardStatsRequest.$type,
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
    };
  },

  toJSON(message: GetDashboardStatsRequest): unknown {
    const obj: any = {};
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDashboardStatsRequest>, I>>(base?: I): GetDashboardStatsRequest {
    return GetDashboardStatsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetDashboardStatsRequest>, I>>(object: I): GetDashboardStatsRequest {
    const message = createBaseGetDashboardStatsRequest();
    message.orgResourceName = object.orgResourceName ?? "";
    message.filter = object.filter ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetDashboardStatsRequest.$type, GetDashboardStatsRequest);

function createBaseTaskSummaryStats(): TaskSummaryStats {
  return { $type: "pb.v1alpha2.TaskSummaryStats", totalHoursSaved: 0, totalAccuracy: 0 };
}

export const TaskSummaryStats = {
  $type: "pb.v1alpha2.TaskSummaryStats" as const,

  encode(message: TaskSummaryStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalHoursSaved !== undefined && message.totalHoursSaved !== 0) {
      writer.uint32(13).float(message.totalHoursSaved);
    }
    if (message.totalAccuracy !== undefined && message.totalAccuracy !== 0) {
      writer.uint32(21).float(message.totalAccuracy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TaskSummaryStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTaskSummaryStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.totalHoursSaved = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.totalAccuracy = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TaskSummaryStats {
    return {
      $type: TaskSummaryStats.$type,
      totalHoursSaved: isSet(object.totalHoursSaved) ? globalThis.Number(object.totalHoursSaved) : 0,
      totalAccuracy: isSet(object.totalAccuracy) ? globalThis.Number(object.totalAccuracy) : 0,
    };
  },

  toJSON(message: TaskSummaryStats): unknown {
    const obj: any = {};
    if (message.totalHoursSaved !== undefined && message.totalHoursSaved !== 0) {
      obj.totalHoursSaved = message.totalHoursSaved;
    }
    if (message.totalAccuracy !== undefined && message.totalAccuracy !== 0) {
      obj.totalAccuracy = message.totalAccuracy;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TaskSummaryStats>, I>>(base?: I): TaskSummaryStats {
    return TaskSummaryStats.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TaskSummaryStats>, I>>(object: I): TaskSummaryStats {
    const message = createBaseTaskSummaryStats();
    message.totalHoursSaved = object.totalHoursSaved ?? 0;
    message.totalAccuracy = object.totalAccuracy ?? 0;
    return message;
  },
};

messageTypeRegistry.set(TaskSummaryStats.$type, TaskSummaryStats);

function createBaseTaskStatusStats(): TaskStatusStats {
  return {
    $type: "pb.v1alpha2.TaskStatusStats",
    totalTaskCount: 0,
    createdTasksCount: 0,
    completedTasksCount: 0,
    pendingTasksCount: 0,
    declinedTasksCount: 0,
    errorTasksCount: 0,
  };
}

export const TaskStatusStats = {
  $type: "pb.v1alpha2.TaskStatusStats" as const,

  encode(message: TaskStatusStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalTaskCount !== undefined && message.totalTaskCount !== 0) {
      writer.uint32(8).int32(message.totalTaskCount);
    }
    if (message.createdTasksCount !== undefined && message.createdTasksCount !== 0) {
      writer.uint32(16).int32(message.createdTasksCount);
    }
    if (message.completedTasksCount !== undefined && message.completedTasksCount !== 0) {
      writer.uint32(24).int32(message.completedTasksCount);
    }
    if (message.pendingTasksCount !== undefined && message.pendingTasksCount !== 0) {
      writer.uint32(32).int32(message.pendingTasksCount);
    }
    if (message.declinedTasksCount !== undefined && message.declinedTasksCount !== 0) {
      writer.uint32(40).int32(message.declinedTasksCount);
    }
    if (message.errorTasksCount !== undefined && message.errorTasksCount !== 0) {
      writer.uint32(48).int32(message.errorTasksCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TaskStatusStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTaskStatusStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.totalTaskCount = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.createdTasksCount = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.completedTasksCount = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.pendingTasksCount = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.declinedTasksCount = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.errorTasksCount = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TaskStatusStats {
    return {
      $type: TaskStatusStats.$type,
      totalTaskCount: isSet(object.totalTaskCount) ? globalThis.Number(object.totalTaskCount) : 0,
      createdTasksCount: isSet(object.createdTasksCount) ? globalThis.Number(object.createdTasksCount) : 0,
      completedTasksCount: isSet(object.completedTasksCount) ? globalThis.Number(object.completedTasksCount) : 0,
      pendingTasksCount: isSet(object.pendingTasksCount) ? globalThis.Number(object.pendingTasksCount) : 0,
      declinedTasksCount: isSet(object.declinedTasksCount) ? globalThis.Number(object.declinedTasksCount) : 0,
      errorTasksCount: isSet(object.errorTasksCount) ? globalThis.Number(object.errorTasksCount) : 0,
    };
  },

  toJSON(message: TaskStatusStats): unknown {
    const obj: any = {};
    if (message.totalTaskCount !== undefined && message.totalTaskCount !== 0) {
      obj.totalTaskCount = Math.round(message.totalTaskCount);
    }
    if (message.createdTasksCount !== undefined && message.createdTasksCount !== 0) {
      obj.createdTasksCount = Math.round(message.createdTasksCount);
    }
    if (message.completedTasksCount !== undefined && message.completedTasksCount !== 0) {
      obj.completedTasksCount = Math.round(message.completedTasksCount);
    }
    if (message.pendingTasksCount !== undefined && message.pendingTasksCount !== 0) {
      obj.pendingTasksCount = Math.round(message.pendingTasksCount);
    }
    if (message.declinedTasksCount !== undefined && message.declinedTasksCount !== 0) {
      obj.declinedTasksCount = Math.round(message.declinedTasksCount);
    }
    if (message.errorTasksCount !== undefined && message.errorTasksCount !== 0) {
      obj.errorTasksCount = Math.round(message.errorTasksCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TaskStatusStats>, I>>(base?: I): TaskStatusStats {
    return TaskStatusStats.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TaskStatusStats>, I>>(object: I): TaskStatusStats {
    const message = createBaseTaskStatusStats();
    message.totalTaskCount = object.totalTaskCount ?? 0;
    message.createdTasksCount = object.createdTasksCount ?? 0;
    message.completedTasksCount = object.completedTasksCount ?? 0;
    message.pendingTasksCount = object.pendingTasksCount ?? 0;
    message.declinedTasksCount = object.declinedTasksCount ?? 0;
    message.errorTasksCount = object.errorTasksCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(TaskStatusStats.$type, TaskStatusStats);

function createBaseExecutionStats(): ExecutionStats {
  return {
    $type: "pb.v1alpha2.ExecutionStats",
    totalWorkflows: 0,
    totalExecutions: 0,
    completedExecutions: 0,
    needsAttentionExecutions: 0,
    errorExecutions: 0,
    inProgressExecutions: 0,
    needsAttentionWorkflows: 0,
  };
}

export const ExecutionStats = {
  $type: "pb.v1alpha2.ExecutionStats" as const,

  encode(message: ExecutionStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalWorkflows !== undefined && message.totalWorkflows !== 0) {
      writer.uint32(8).int32(message.totalWorkflows);
    }
    if (message.totalExecutions !== undefined && message.totalExecutions !== 0) {
      writer.uint32(16).int32(message.totalExecutions);
    }
    if (message.completedExecutions !== undefined && message.completedExecutions !== 0) {
      writer.uint32(24).int32(message.completedExecutions);
    }
    if (message.needsAttentionExecutions !== undefined && message.needsAttentionExecutions !== 0) {
      writer.uint32(32).int32(message.needsAttentionExecutions);
    }
    if (message.errorExecutions !== undefined && message.errorExecutions !== 0) {
      writer.uint32(40).int32(message.errorExecutions);
    }
    if (message.inProgressExecutions !== undefined && message.inProgressExecutions !== 0) {
      writer.uint32(48).int32(message.inProgressExecutions);
    }
    if (message.needsAttentionWorkflows !== undefined && message.needsAttentionWorkflows !== 0) {
      writer.uint32(56).int32(message.needsAttentionWorkflows);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecutionStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutionStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.totalWorkflows = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalExecutions = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.completedExecutions = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.needsAttentionExecutions = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.errorExecutions = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.inProgressExecutions = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.needsAttentionWorkflows = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecutionStats {
    return {
      $type: ExecutionStats.$type,
      totalWorkflows: isSet(object.totalWorkflows) ? globalThis.Number(object.totalWorkflows) : 0,
      totalExecutions: isSet(object.totalExecutions) ? globalThis.Number(object.totalExecutions) : 0,
      completedExecutions: isSet(object.completedExecutions) ? globalThis.Number(object.completedExecutions) : 0,
      needsAttentionExecutions: isSet(object.needsAttentionExecutions)
        ? globalThis.Number(object.needsAttentionExecutions)
        : 0,
      errorExecutions: isSet(object.errorExecutions) ? globalThis.Number(object.errorExecutions) : 0,
      inProgressExecutions: isSet(object.inProgressExecutions) ? globalThis.Number(object.inProgressExecutions) : 0,
      needsAttentionWorkflows: isSet(object.needsAttentionWorkflows)
        ? globalThis.Number(object.needsAttentionWorkflows)
        : 0,
    };
  },

  toJSON(message: ExecutionStats): unknown {
    const obj: any = {};
    if (message.totalWorkflows !== undefined && message.totalWorkflows !== 0) {
      obj.totalWorkflows = Math.round(message.totalWorkflows);
    }
    if (message.totalExecutions !== undefined && message.totalExecutions !== 0) {
      obj.totalExecutions = Math.round(message.totalExecutions);
    }
    if (message.completedExecutions !== undefined && message.completedExecutions !== 0) {
      obj.completedExecutions = Math.round(message.completedExecutions);
    }
    if (message.needsAttentionExecutions !== undefined && message.needsAttentionExecutions !== 0) {
      obj.needsAttentionExecutions = Math.round(message.needsAttentionExecutions);
    }
    if (message.errorExecutions !== undefined && message.errorExecutions !== 0) {
      obj.errorExecutions = Math.round(message.errorExecutions);
    }
    if (message.inProgressExecutions !== undefined && message.inProgressExecutions !== 0) {
      obj.inProgressExecutions = Math.round(message.inProgressExecutions);
    }
    if (message.needsAttentionWorkflows !== undefined && message.needsAttentionWorkflows !== 0) {
      obj.needsAttentionWorkflows = Math.round(message.needsAttentionWorkflows);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecutionStats>, I>>(base?: I): ExecutionStats {
    return ExecutionStats.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExecutionStats>, I>>(object: I): ExecutionStats {
    const message = createBaseExecutionStats();
    message.totalWorkflows = object.totalWorkflows ?? 0;
    message.totalExecutions = object.totalExecutions ?? 0;
    message.completedExecutions = object.completedExecutions ?? 0;
    message.needsAttentionExecutions = object.needsAttentionExecutions ?? 0;
    message.errorExecutions = object.errorExecutions ?? 0;
    message.inProgressExecutions = object.inProgressExecutions ?? 0;
    message.needsAttentionWorkflows = object.needsAttentionWorkflows ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ExecutionStats.$type, ExecutionStats);

function createBaseTeamStats(): TeamStats {
  return {
    $type: "pb.v1alpha2.TeamStats",
    totalTimeSpent: 0,
    avgTimePerTask: 0,
    totalUserCount: 0,
    recentUserProfiles: [],
  };
}

export const TeamStats = {
  $type: "pb.v1alpha2.TeamStats" as const,

  encode(message: TeamStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalTimeSpent !== undefined && message.totalTimeSpent !== 0) {
      writer.uint32(13).float(message.totalTimeSpent);
    }
    if (message.avgTimePerTask !== undefined && message.avgTimePerTask !== 0) {
      writer.uint32(21).float(message.avgTimePerTask);
    }
    if (message.totalUserCount !== undefined && message.totalUserCount !== 0) {
      writer.uint32(24).int32(message.totalUserCount);
    }
    if (message.recentUserProfiles !== undefined && message.recentUserProfiles.length !== 0) {
      for (const v of message.recentUserProfiles) {
        UserProfileInfo.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TeamStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTeamStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.totalTimeSpent = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.avgTimePerTask = reader.float();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.totalUserCount = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.recentUserProfiles!.push(UserProfileInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TeamStats {
    return {
      $type: TeamStats.$type,
      totalTimeSpent: isSet(object.totalTimeSpent) ? globalThis.Number(object.totalTimeSpent) : 0,
      avgTimePerTask: isSet(object.avgTimePerTask) ? globalThis.Number(object.avgTimePerTask) : 0,
      totalUserCount: isSet(object.totalUserCount) ? globalThis.Number(object.totalUserCount) : 0,
      recentUserProfiles: globalThis.Array.isArray(object?.recentUserProfiles)
        ? object.recentUserProfiles.map((e: any) => UserProfileInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TeamStats): unknown {
    const obj: any = {};
    if (message.totalTimeSpent !== undefined && message.totalTimeSpent !== 0) {
      obj.totalTimeSpent = message.totalTimeSpent;
    }
    if (message.avgTimePerTask !== undefined && message.avgTimePerTask !== 0) {
      obj.avgTimePerTask = message.avgTimePerTask;
    }
    if (message.totalUserCount !== undefined && message.totalUserCount !== 0) {
      obj.totalUserCount = Math.round(message.totalUserCount);
    }
    if (message.recentUserProfiles?.length) {
      obj.recentUserProfiles = message.recentUserProfiles.map((e) => UserProfileInfo.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TeamStats>, I>>(base?: I): TeamStats {
    return TeamStats.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TeamStats>, I>>(object: I): TeamStats {
    const message = createBaseTeamStats();
    message.totalTimeSpent = object.totalTimeSpent ?? 0;
    message.avgTimePerTask = object.avgTimePerTask ?? 0;
    message.totalUserCount = object.totalUserCount ?? 0;
    message.recentUserProfiles = object.recentUserProfiles?.map((e) => UserProfileInfo.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(TeamStats.$type, TeamStats);

function createBaseGetDashboardStatsResponse(): GetDashboardStatsResponse {
  return {
    $type: "pb.v1alpha2.GetDashboardStatsResponse",
    taskSummary: undefined,
    taskStatus: undefined,
    automationStats: undefined,
    accuracyStats: undefined,
    executionStats: undefined,
    teamStats: undefined,
  };
}

export const GetDashboardStatsResponse = {
  $type: "pb.v1alpha2.GetDashboardStatsResponse" as const,

  encode(message: GetDashboardStatsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.taskSummary !== undefined) {
      TaskSummaryStats.encode(message.taskSummary, writer.uint32(10).fork()).ldelim();
    }
    if (message.taskStatus !== undefined) {
      TaskStatusStats.encode(message.taskStatus, writer.uint32(18).fork()).ldelim();
    }
    if (message.automationStats !== undefined) {
      AutomationStats.encode(message.automationStats, writer.uint32(26).fork()).ldelim();
    }
    if (message.accuracyStats !== undefined) {
      AccuracyStats.encode(message.accuracyStats, writer.uint32(34).fork()).ldelim();
    }
    if (message.executionStats !== undefined) {
      ExecutionStats.encode(message.executionStats, writer.uint32(42).fork()).ldelim();
    }
    if (message.teamStats !== undefined) {
      TeamStats.encode(message.teamStats, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDashboardStatsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDashboardStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.taskSummary = TaskSummaryStats.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.taskStatus = TaskStatusStats.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.automationStats = AutomationStats.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.accuracyStats = AccuracyStats.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.executionStats = ExecutionStats.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.teamStats = TeamStats.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDashboardStatsResponse {
    return {
      $type: GetDashboardStatsResponse.$type,
      taskSummary: isSet(object.taskSummary) ? TaskSummaryStats.fromJSON(object.taskSummary) : undefined,
      taskStatus: isSet(object.taskStatus) ? TaskStatusStats.fromJSON(object.taskStatus) : undefined,
      automationStats: isSet(object.automationStats) ? AutomationStats.fromJSON(object.automationStats) : undefined,
      accuracyStats: isSet(object.accuracyStats) ? AccuracyStats.fromJSON(object.accuracyStats) : undefined,
      executionStats: isSet(object.executionStats) ? ExecutionStats.fromJSON(object.executionStats) : undefined,
      teamStats: isSet(object.teamStats) ? TeamStats.fromJSON(object.teamStats) : undefined,
    };
  },

  toJSON(message: GetDashboardStatsResponse): unknown {
    const obj: any = {};
    if (message.taskSummary !== undefined) {
      obj.taskSummary = TaskSummaryStats.toJSON(message.taskSummary);
    }
    if (message.taskStatus !== undefined) {
      obj.taskStatus = TaskStatusStats.toJSON(message.taskStatus);
    }
    if (message.automationStats !== undefined) {
      obj.automationStats = AutomationStats.toJSON(message.automationStats);
    }
    if (message.accuracyStats !== undefined) {
      obj.accuracyStats = AccuracyStats.toJSON(message.accuracyStats);
    }
    if (message.executionStats !== undefined) {
      obj.executionStats = ExecutionStats.toJSON(message.executionStats);
    }
    if (message.teamStats !== undefined) {
      obj.teamStats = TeamStats.toJSON(message.teamStats);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDashboardStatsResponse>, I>>(base?: I): GetDashboardStatsResponse {
    return GetDashboardStatsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetDashboardStatsResponse>, I>>(object: I): GetDashboardStatsResponse {
    const message = createBaseGetDashboardStatsResponse();
    message.taskSummary = (object.taskSummary !== undefined && object.taskSummary !== null)
      ? TaskSummaryStats.fromPartial(object.taskSummary)
      : undefined;
    message.taskStatus = (object.taskStatus !== undefined && object.taskStatus !== null)
      ? TaskStatusStats.fromPartial(object.taskStatus)
      : undefined;
    message.automationStats = (object.automationStats !== undefined && object.automationStats !== null)
      ? AutomationStats.fromPartial(object.automationStats)
      : undefined;
    message.accuracyStats = (object.accuracyStats !== undefined && object.accuracyStats !== null)
      ? AccuracyStats.fromPartial(object.accuracyStats)
      : undefined;
    message.executionStats = (object.executionStats !== undefined && object.executionStats !== null)
      ? ExecutionStats.fromPartial(object.executionStats)
      : undefined;
    message.teamStats = (object.teamStats !== undefined && object.teamStats !== null)
      ? TeamStats.fromPartial(object.teamStats)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetDashboardStatsResponse.$type, GetDashboardStatsResponse);

function createBaseAutomationStats(): AutomationStats {
  return {
    $type: "pb.v1alpha2.AutomationStats",
    dailyAutomations: [],
    totalSuccessfulExecutions: 0,
    totalDocumentsAutomated: 0,
    totalHoursSaved: 0,
    successfulAutomationCounts: [],
    executionSummary: undefined,
  };
}

export const AutomationStats = {
  $type: "pb.v1alpha2.AutomationStats" as const,

  encode(message: AutomationStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dailyAutomations !== undefined && message.dailyAutomations.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.dailyAutomations) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.totalSuccessfulExecutions !== undefined && message.totalSuccessfulExecutions !== 0) {
      writer.uint32(16).int32(message.totalSuccessfulExecutions);
    }
    if (message.totalDocumentsAutomated !== undefined && message.totalDocumentsAutomated !== 0) {
      writer.uint32(24).int32(message.totalDocumentsAutomated);
    }
    if (message.totalHoursSaved !== undefined && message.totalHoursSaved !== 0) {
      writer.uint32(37).float(message.totalHoursSaved);
    }
    if (message.successfulAutomationCounts !== undefined && message.successfulAutomationCounts.length !== 0) {
      for (const v of message.successfulAutomationCounts) {
        AutomationStatsAutomationPeriodStat.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.executionSummary !== undefined) {
      AutomationStatsExecutionSummary.encode(message.executionSummary, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AutomationStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAutomationStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.dailyAutomations!.push(reader.int32());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.dailyAutomations!.push(reader.int32());
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalSuccessfulExecutions = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.totalDocumentsAutomated = reader.int32();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.totalHoursSaved = reader.float();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.successfulAutomationCounts!.push(AutomationStatsAutomationPeriodStat.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.executionSummary = AutomationStatsExecutionSummary.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AutomationStats {
    return {
      $type: AutomationStats.$type,
      dailyAutomations: globalThis.Array.isArray(object?.dailyAutomations)
        ? object.dailyAutomations.map((e: any) => globalThis.Number(e))
        : [],
      totalSuccessfulExecutions: isSet(object.totalSuccessfulExecutions)
        ? globalThis.Number(object.totalSuccessfulExecutions)
        : 0,
      totalDocumentsAutomated: isSet(object.totalDocumentsAutomated)
        ? globalThis.Number(object.totalDocumentsAutomated)
        : 0,
      totalHoursSaved: isSet(object.totalHoursSaved) ? globalThis.Number(object.totalHoursSaved) : 0,
      successfulAutomationCounts: globalThis.Array.isArray(object?.successfulAutomationCounts)
        ? object.successfulAutomationCounts.map((e: any) => AutomationStatsAutomationPeriodStat.fromJSON(e))
        : [],
      executionSummary: isSet(object.executionSummary)
        ? AutomationStatsExecutionSummary.fromJSON(object.executionSummary)
        : undefined,
    };
  },

  toJSON(message: AutomationStats): unknown {
    const obj: any = {};
    if (message.dailyAutomations?.length) {
      obj.dailyAutomations = message.dailyAutomations.map((e) => Math.round(e));
    }
    if (message.totalSuccessfulExecutions !== undefined && message.totalSuccessfulExecutions !== 0) {
      obj.totalSuccessfulExecutions = Math.round(message.totalSuccessfulExecutions);
    }
    if (message.totalDocumentsAutomated !== undefined && message.totalDocumentsAutomated !== 0) {
      obj.totalDocumentsAutomated = Math.round(message.totalDocumentsAutomated);
    }
    if (message.totalHoursSaved !== undefined && message.totalHoursSaved !== 0) {
      obj.totalHoursSaved = message.totalHoursSaved;
    }
    if (message.successfulAutomationCounts?.length) {
      obj.successfulAutomationCounts = message.successfulAutomationCounts.map((e) =>
        AutomationStatsAutomationPeriodStat.toJSON(e)
      );
    }
    if (message.executionSummary !== undefined) {
      obj.executionSummary = AutomationStatsExecutionSummary.toJSON(message.executionSummary);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AutomationStats>, I>>(base?: I): AutomationStats {
    return AutomationStats.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AutomationStats>, I>>(object: I): AutomationStats {
    const message = createBaseAutomationStats();
    message.dailyAutomations = object.dailyAutomations?.map((e) => e) || [];
    message.totalSuccessfulExecutions = object.totalSuccessfulExecutions ?? 0;
    message.totalDocumentsAutomated = object.totalDocumentsAutomated ?? 0;
    message.totalHoursSaved = object.totalHoursSaved ?? 0;
    message.successfulAutomationCounts =
      object.successfulAutomationCounts?.map((e) => AutomationStatsAutomationPeriodStat.fromPartial(e)) || [];
    message.executionSummary = (object.executionSummary !== undefined && object.executionSummary !== null)
      ? AutomationStatsExecutionSummary.fromPartial(object.executionSummary)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(AutomationStats.$type, AutomationStats);

function createBaseAutomationStatsAutomationPeriodStat(): AutomationStatsAutomationPeriodStat {
  return { $type: "pb.v1alpha2.AutomationStats.AutomationPeriodStat", period: "", count: 0 };
}

export const AutomationStatsAutomationPeriodStat = {
  $type: "pb.v1alpha2.AutomationStats.AutomationPeriodStat" as const,

  encode(message: AutomationStatsAutomationPeriodStat, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.period !== undefined && message.period !== "") {
      writer.uint32(10).string(message.period);
    }
    if (message.count !== undefined && message.count !== 0) {
      writer.uint32(16).int32(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AutomationStatsAutomationPeriodStat {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAutomationStatsAutomationPeriodStat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.period = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.count = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AutomationStatsAutomationPeriodStat {
    return {
      $type: AutomationStatsAutomationPeriodStat.$type,
      period: isSet(object.period) ? globalThis.String(object.period) : "",
      count: isSet(object.count) ? globalThis.Number(object.count) : 0,
    };
  },

  toJSON(message: AutomationStatsAutomationPeriodStat): unknown {
    const obj: any = {};
    if (message.period !== undefined && message.period !== "") {
      obj.period = message.period;
    }
    if (message.count !== undefined && message.count !== 0) {
      obj.count = Math.round(message.count);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AutomationStatsAutomationPeriodStat>, I>>(
    base?: I,
  ): AutomationStatsAutomationPeriodStat {
    return AutomationStatsAutomationPeriodStat.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AutomationStatsAutomationPeriodStat>, I>>(
    object: I,
  ): AutomationStatsAutomationPeriodStat {
    const message = createBaseAutomationStatsAutomationPeriodStat();
    message.period = object.period ?? "";
    message.count = object.count ?? 0;
    return message;
  },
};

messageTypeRegistry.set(AutomationStatsAutomationPeriodStat.$type, AutomationStatsAutomationPeriodStat);

function createBaseAutomationStatsExecutionSummary(): AutomationStatsExecutionSummary {
  return {
    $type: "pb.v1alpha2.AutomationStats.ExecutionSummary",
    totalExecutions: 0,
    totalErrorExecutions: 0,
    totalBlockedExecutions: 0,
  };
}

export const AutomationStatsExecutionSummary = {
  $type: "pb.v1alpha2.AutomationStats.ExecutionSummary" as const,

  encode(message: AutomationStatsExecutionSummary, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalExecutions !== undefined && message.totalExecutions !== 0) {
      writer.uint32(8).int32(message.totalExecutions);
    }
    if (message.totalErrorExecutions !== undefined && message.totalErrorExecutions !== 0) {
      writer.uint32(16).int32(message.totalErrorExecutions);
    }
    if (message.totalBlockedExecutions !== undefined && message.totalBlockedExecutions !== 0) {
      writer.uint32(24).int32(message.totalBlockedExecutions);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AutomationStatsExecutionSummary {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAutomationStatsExecutionSummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.totalExecutions = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalErrorExecutions = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.totalBlockedExecutions = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AutomationStatsExecutionSummary {
    return {
      $type: AutomationStatsExecutionSummary.$type,
      totalExecutions: isSet(object.totalExecutions) ? globalThis.Number(object.totalExecutions) : 0,
      totalErrorExecutions: isSet(object.totalErrorExecutions) ? globalThis.Number(object.totalErrorExecutions) : 0,
      totalBlockedExecutions: isSet(object.totalBlockedExecutions)
        ? globalThis.Number(object.totalBlockedExecutions)
        : 0,
    };
  },

  toJSON(message: AutomationStatsExecutionSummary): unknown {
    const obj: any = {};
    if (message.totalExecutions !== undefined && message.totalExecutions !== 0) {
      obj.totalExecutions = Math.round(message.totalExecutions);
    }
    if (message.totalErrorExecutions !== undefined && message.totalErrorExecutions !== 0) {
      obj.totalErrorExecutions = Math.round(message.totalErrorExecutions);
    }
    if (message.totalBlockedExecutions !== undefined && message.totalBlockedExecutions !== 0) {
      obj.totalBlockedExecutions = Math.round(message.totalBlockedExecutions);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AutomationStatsExecutionSummary>, I>>(base?: I): AutomationStatsExecutionSummary {
    return AutomationStatsExecutionSummary.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AutomationStatsExecutionSummary>, I>>(
    object: I,
  ): AutomationStatsExecutionSummary {
    const message = createBaseAutomationStatsExecutionSummary();
    message.totalExecutions = object.totalExecutions ?? 0;
    message.totalErrorExecutions = object.totalErrorExecutions ?? 0;
    message.totalBlockedExecutions = object.totalBlockedExecutions ?? 0;
    return message;
  },
};

messageTypeRegistry.set(AutomationStatsExecutionSummary.$type, AutomationStatsExecutionSummary);

function createBaseAccuracyStats(): AccuracyStats {
  return {
    $type: "pb.v1alpha2.AccuracyStats",
    averageExtractionAccuracy: 0,
    averageClassificationAccuracy: 0,
    workflowStats: [],
  };
}

export const AccuracyStats = {
  $type: "pb.v1alpha2.AccuracyStats" as const,

  encode(message: AccuracyStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.averageExtractionAccuracy !== undefined && message.averageExtractionAccuracy !== 0) {
      writer.uint32(13).float(message.averageExtractionAccuracy);
    }
    if (message.averageClassificationAccuracy !== undefined && message.averageClassificationAccuracy !== 0) {
      writer.uint32(21).float(message.averageClassificationAccuracy);
    }
    if (message.workflowStats !== undefined && message.workflowStats.length !== 0) {
      for (const v of message.workflowStats) {
        AccuracyStatsWorkflowStat.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccuracyStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccuracyStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.averageExtractionAccuracy = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.averageClassificationAccuracy = reader.float();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.workflowStats!.push(AccuracyStatsWorkflowStat.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccuracyStats {
    return {
      $type: AccuracyStats.$type,
      averageExtractionAccuracy: isSet(object.averageExtractionAccuracy)
        ? globalThis.Number(object.averageExtractionAccuracy)
        : 0,
      averageClassificationAccuracy: isSet(object.averageClassificationAccuracy)
        ? globalThis.Number(object.averageClassificationAccuracy)
        : 0,
      workflowStats: globalThis.Array.isArray(object?.workflowStats)
        ? object.workflowStats.map((e: any) => AccuracyStatsWorkflowStat.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AccuracyStats): unknown {
    const obj: any = {};
    if (message.averageExtractionAccuracy !== undefined && message.averageExtractionAccuracy !== 0) {
      obj.averageExtractionAccuracy = message.averageExtractionAccuracy;
    }
    if (message.averageClassificationAccuracy !== undefined && message.averageClassificationAccuracy !== 0) {
      obj.averageClassificationAccuracy = message.averageClassificationAccuracy;
    }
    if (message.workflowStats?.length) {
      obj.workflowStats = message.workflowStats.map((e) => AccuracyStatsWorkflowStat.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccuracyStats>, I>>(base?: I): AccuracyStats {
    return AccuracyStats.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccuracyStats>, I>>(object: I): AccuracyStats {
    const message = createBaseAccuracyStats();
    message.averageExtractionAccuracy = object.averageExtractionAccuracy ?? 0;
    message.averageClassificationAccuracy = object.averageClassificationAccuracy ?? 0;
    message.workflowStats = object.workflowStats?.map((e) => AccuracyStatsWorkflowStat.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(AccuracyStats.$type, AccuracyStats);

function createBaseAccuracyStatsWorkflowStat(): AccuracyStatsWorkflowStat {
  return { $type: "pb.v1alpha2.AccuracyStats.WorkflowStat", workflowDisplayName: "", averageAccuracy: 0 };
}

export const AccuracyStatsWorkflowStat = {
  $type: "pb.v1alpha2.AccuracyStats.WorkflowStat" as const,

  encode(message: AccuracyStatsWorkflowStat, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowDisplayName !== undefined && message.workflowDisplayName !== "") {
      writer.uint32(10).string(message.workflowDisplayName);
    }
    if (message.averageAccuracy !== undefined && message.averageAccuracy !== 0) {
      writer.uint32(21).float(message.averageAccuracy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccuracyStatsWorkflowStat {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccuracyStatsWorkflowStat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflowDisplayName = reader.string();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.averageAccuracy = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccuracyStatsWorkflowStat {
    return {
      $type: AccuracyStatsWorkflowStat.$type,
      workflowDisplayName: isSet(object.workflowDisplayName) ? globalThis.String(object.workflowDisplayName) : "",
      averageAccuracy: isSet(object.averageAccuracy) ? globalThis.Number(object.averageAccuracy) : 0,
    };
  },

  toJSON(message: AccuracyStatsWorkflowStat): unknown {
    const obj: any = {};
    if (message.workflowDisplayName !== undefined && message.workflowDisplayName !== "") {
      obj.workflowDisplayName = message.workflowDisplayName;
    }
    if (message.averageAccuracy !== undefined && message.averageAccuracy !== 0) {
      obj.averageAccuracy = message.averageAccuracy;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccuracyStatsWorkflowStat>, I>>(base?: I): AccuracyStatsWorkflowStat {
    return AccuracyStatsWorkflowStat.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccuracyStatsWorkflowStat>, I>>(object: I): AccuracyStatsWorkflowStat {
    const message = createBaseAccuracyStatsWorkflowStat();
    message.workflowDisplayName = object.workflowDisplayName ?? "";
    message.averageAccuracy = object.averageAccuracy ?? 0;
    return message;
  },
};

messageTypeRegistry.set(AccuracyStatsWorkflowStat.$type, AccuracyStatsWorkflowStat);

export interface Dashboard {
  GetDashboardStats(
    request: DeepPartial<GetDashboardStatsRequest>,
    metadata?: grpc.Metadata,
  ): Observable<GetDashboardStatsResponse>;
}

export class DashboardClientImpl implements Dashboard {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetDashboardStats = this.GetDashboardStats.bind(this);
  }

  GetDashboardStats(
    request: DeepPartial<GetDashboardStatsRequest>,
    metadata?: grpc.Metadata,
  ): Observable<GetDashboardStatsResponse> {
    return this.rpc.invoke(DashboardGetDashboardStatsDesc, GetDashboardStatsRequest.fromPartial(request), metadata);
  }
}

export const DashboardDesc = { serviceName: "pb.v1alpha2.Dashboard" };

export const DashboardGetDashboardStatsDesc: UnaryMethodDefinitionish = {
  methodName: "GetDashboardStats",
  service: DashboardDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return GetDashboardStatsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetDashboardStatsResponse.decode(data);
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

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
