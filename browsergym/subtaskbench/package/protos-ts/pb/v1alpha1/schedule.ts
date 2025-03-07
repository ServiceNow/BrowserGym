/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { DateMessage } from "../../google/type/date";
import { TimeOfDay } from "../../google/type/timeofday";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export interface Schedule {
  $type?: "pb.v1alpha1.Schedule";
  id?: string | undefined;
  orgId?: string | undefined;
  workflowId?:
    | string
    | undefined;
  /**
   * Will be deprecated soon, please use new start_date field
   *
   * @deprecated
   */
  startTime?:
    | Date
    | undefined;
  /**
   * Will be deprecated soon, please use new end_date field
   *
   * @deprecated
   */
  endTime?: Date | undefined;
  createTime?: Date | undefined;
  lastUpdateTime?:
    | Date
    | undefined;
  /** Configurations for the schedule. */
  config?:
    | ScheduleConfig
    | undefined;
  /** READ-ONLY Field: Next times at which schedule will run */
  futureActionTimes?:
    | Date[]
    | undefined;
  /**
   * Must be from one of the following TZ names:
   * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   * E.g: US/Pacific
   * Will default to UTC if not provided
   */
  timezoneName?:
    | string
    | undefined;
  /** This field can be updated to pause/resume the schedule */
  status?: ScheduleScheduleStatus | undefined;
  startDate?: DateMessage | undefined;
  endDate?:
    | DateMessage
    | undefined;
  /**
   * Days on which to skip schedule runs
   * The overall skipped days are a union of the skip_days
   * and days referenced by holiday_list
   */
  skipDays?: DateMessage[] | undefined;
  holidayListIds?: string[] | undefined;
}

/** Status of the schedule */
export enum ScheduleScheduleStatus {
  UNSPECIFIED = 0,
  ACTIVE = 1,
  PAUSED = 2,
  UNRECOGNIZED = -1,
}

export function scheduleScheduleStatusFromJSON(object: any): ScheduleScheduleStatus {
  switch (object) {
    case 0:
    case "SCHEDULE_STATUS_UNSPECIFIED":
      return ScheduleScheduleStatus.UNSPECIFIED;
    case 1:
    case "SCHEDULE_STATUS_ACTIVE":
      return ScheduleScheduleStatus.ACTIVE;
    case 2:
    case "SCHEDULE_STATUS_PAUSED":
      return ScheduleScheduleStatus.PAUSED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ScheduleScheduleStatus.UNRECOGNIZED;
  }
}

export function scheduleScheduleStatusToJSON(object: ScheduleScheduleStatus): string {
  switch (object) {
    case ScheduleScheduleStatus.UNSPECIFIED:
      return "SCHEDULE_STATUS_UNSPECIFIED";
    case ScheduleScheduleStatus.ACTIVE:
      return "SCHEDULE_STATUS_ACTIVE";
    case ScheduleScheduleStatus.PAUSED:
      return "SCHEDULE_STATUS_PAUSED";
    case ScheduleScheduleStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ScheduleConfig {
  $type?: "pb.v1alpha1.ScheduleConfig";
  schedulePattern?:
    | ScheduleConfigSchedulePattern
    | undefined;
  /**
   * This interval is used for daily, weekly, and monthly schedules.
   * It's the number of days, weeks, or months between each run.
   */
  interval?: number | undefined;
}

export interface ScheduleConfigSchedulePattern {
  $type?: "pb.v1alpha1.ScheduleConfig.SchedulePattern";
  /** The schedules may run on multiple times for a pattern. */
  runTimes?: TimeOfDay[] | undefined;
  recurrencePattern?: ScheduleConfigRecurrencePattern | undefined;
}

export interface ScheduleConfigRecurrencePattern {
  $type?: "pb.v1alpha1.ScheduleConfig.RecurrencePattern";
  noRecurrence?:
    | ScheduleConfigRecurrencePatternNoRecurrence
    | undefined;
  /** Use this for daily schedules. */
  dailyRecurrence?:
    | ScheduleConfigRecurrencePatternDailyRecurrence
    | undefined;
  /** This pattern is used for weekly schedules. */
  weeklyRecurrence?:
    | ScheduleConfigRecurrencePatternWeeklyRecurrence
    | undefined;
  /** This pattern is used for monthly schedules. */
  monthlyRecurrence?: ScheduleConfigRecurrencePatternMonthlyRecurrence | undefined;
}

export enum ScheduleConfigRecurrencePatternDayOfWeek {
  UNSPECIFIED = 0,
  SUNDAY = 1,
  MONDAY = 2,
  TUESDAY = 3,
  WEDNESDAY = 4,
  THURSDAY = 5,
  FRIDAY = 6,
  SATURDAY = 7,
  UNRECOGNIZED = -1,
}

export function scheduleConfigRecurrencePatternDayOfWeekFromJSON(
  object: any,
): ScheduleConfigRecurrencePatternDayOfWeek {
  switch (object) {
    case 0:
    case "DAY_OF_WEEK_UNSPECIFIED":
      return ScheduleConfigRecurrencePatternDayOfWeek.UNSPECIFIED;
    case 1:
    case "SUNDAY":
      return ScheduleConfigRecurrencePatternDayOfWeek.SUNDAY;
    case 2:
    case "MONDAY":
      return ScheduleConfigRecurrencePatternDayOfWeek.MONDAY;
    case 3:
    case "TUESDAY":
      return ScheduleConfigRecurrencePatternDayOfWeek.TUESDAY;
    case 4:
    case "WEDNESDAY":
      return ScheduleConfigRecurrencePatternDayOfWeek.WEDNESDAY;
    case 5:
    case "THURSDAY":
      return ScheduleConfigRecurrencePatternDayOfWeek.THURSDAY;
    case 6:
    case "FRIDAY":
      return ScheduleConfigRecurrencePatternDayOfWeek.FRIDAY;
    case 7:
    case "SATURDAY":
      return ScheduleConfigRecurrencePatternDayOfWeek.SATURDAY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ScheduleConfigRecurrencePatternDayOfWeek.UNRECOGNIZED;
  }
}

export function scheduleConfigRecurrencePatternDayOfWeekToJSON(
  object: ScheduleConfigRecurrencePatternDayOfWeek,
): string {
  switch (object) {
    case ScheduleConfigRecurrencePatternDayOfWeek.UNSPECIFIED:
      return "DAY_OF_WEEK_UNSPECIFIED";
    case ScheduleConfigRecurrencePatternDayOfWeek.SUNDAY:
      return "SUNDAY";
    case ScheduleConfigRecurrencePatternDayOfWeek.MONDAY:
      return "MONDAY";
    case ScheduleConfigRecurrencePatternDayOfWeek.TUESDAY:
      return "TUESDAY";
    case ScheduleConfigRecurrencePatternDayOfWeek.WEDNESDAY:
      return "WEDNESDAY";
    case ScheduleConfigRecurrencePatternDayOfWeek.THURSDAY:
      return "THURSDAY";
    case ScheduleConfigRecurrencePatternDayOfWeek.FRIDAY:
      return "FRIDAY";
    case ScheduleConfigRecurrencePatternDayOfWeek.SATURDAY:
      return "SATURDAY";
    case ScheduleConfigRecurrencePatternDayOfWeek.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ScheduleConfigRecurrencePatternWeekOfMonth {
  UNSPECIFIED = 0,
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
  LAST = 5,
  UNRECOGNIZED = -1,
}

export function scheduleConfigRecurrencePatternWeekOfMonthFromJSON(
  object: any,
): ScheduleConfigRecurrencePatternWeekOfMonth {
  switch (object) {
    case 0:
    case "WEEK_OF_MONTH_UNSPECIFIED":
      return ScheduleConfigRecurrencePatternWeekOfMonth.UNSPECIFIED;
    case 1:
    case "FIRST":
      return ScheduleConfigRecurrencePatternWeekOfMonth.FIRST;
    case 2:
    case "SECOND":
      return ScheduleConfigRecurrencePatternWeekOfMonth.SECOND;
    case 3:
    case "THIRD":
      return ScheduleConfigRecurrencePatternWeekOfMonth.THIRD;
    case 4:
    case "FOURTH":
      return ScheduleConfigRecurrencePatternWeekOfMonth.FOURTH;
    case 5:
    case "LAST":
      return ScheduleConfigRecurrencePatternWeekOfMonth.LAST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ScheduleConfigRecurrencePatternWeekOfMonth.UNRECOGNIZED;
  }
}

export function scheduleConfigRecurrencePatternWeekOfMonthToJSON(
  object: ScheduleConfigRecurrencePatternWeekOfMonth,
): string {
  switch (object) {
    case ScheduleConfigRecurrencePatternWeekOfMonth.UNSPECIFIED:
      return "WEEK_OF_MONTH_UNSPECIFIED";
    case ScheduleConfigRecurrencePatternWeekOfMonth.FIRST:
      return "FIRST";
    case ScheduleConfigRecurrencePatternWeekOfMonth.SECOND:
      return "SECOND";
    case ScheduleConfigRecurrencePatternWeekOfMonth.THIRD:
      return "THIRD";
    case ScheduleConfigRecurrencePatternWeekOfMonth.FOURTH:
      return "FOURTH";
    case ScheduleConfigRecurrencePatternWeekOfMonth.LAST:
      return "LAST";
    case ScheduleConfigRecurrencePatternWeekOfMonth.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ScheduleConfigRecurrencePatternNoRecurrence {
  $type?: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.NoRecurrence";
}

/**
 * We may add additional fields in the future.
 * Ex. Include only business days
 */
export interface ScheduleConfigRecurrencePatternDailyRecurrence {
  $type?: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.DailyRecurrence";
}

export interface ScheduleConfigRecurrencePatternWeeklyRecurrence {
  $type?: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.WeeklyRecurrence";
  /** Different days of the week the schedule will run. */
  daysOfWeek?: ScheduleConfigRecurrencePatternDayOfWeek[] | undefined;
}

export interface ScheduleConfigRecurrencePatternMonthlyRecurrence {
  $type?: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.MonthlyRecurrence";
  /**
   * We may want to run the schedule in a different ways.
   * It's either on a specific days or on a specific day of the week.
   * Note: OneOf was not possible to use here since oneOf cannot contain repeatedOf elements
   * This specifies the day of the month, e.g., 1st, 2nd, 3rd, etc.
   */
  dayOfMonth?:
    | number
    | undefined;
  /** Ex. Create a monthly schedule on the (first, second ... last) (Monday.... Sunday) of the month. */
  dayOfWeekPattern?: ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern[] | undefined;
}

export interface ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern {
  $type?: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.MonthlyRecurrence.DayOfWeekPattern";
  dayOfWeek?: ScheduleConfigRecurrencePatternDayOfWeek | undefined;
  weekOfMonth?: ScheduleConfigRecurrencePatternWeekOfMonth | undefined;
}

function createBaseSchedule(): Schedule {
  return {
    $type: "pb.v1alpha1.Schedule",
    id: "",
    orgId: "",
    workflowId: "",
    startTime: undefined,
    endTime: undefined,
    createTime: undefined,
    lastUpdateTime: undefined,
    config: undefined,
    futureActionTimes: [],
    timezoneName: "",
    status: 0,
    startDate: undefined,
    endDate: undefined,
    skipDays: [],
    holidayListIds: [],
  };
}

export const Schedule = {
  $type: "pb.v1alpha1.Schedule" as const,

  encode(message: Schedule, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(26).string(message.workflowId);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(50).fork()).ldelim();
    }
    if (message.lastUpdateTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastUpdateTime), writer.uint32(58).fork()).ldelim();
    }
    if (message.config !== undefined) {
      ScheduleConfig.encode(message.config, writer.uint32(66).fork()).ldelim();
    }
    if (message.futureActionTimes !== undefined && message.futureActionTimes.length !== 0) {
      for (const v of message.futureActionTimes) {
        Timestamp.encode(toTimestamp(v!), writer.uint32(74).fork()).ldelim();
      }
    }
    if (message.timezoneName !== undefined && message.timezoneName !== "") {
      writer.uint32(82).string(message.timezoneName);
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(88).int32(message.status);
    }
    if (message.startDate !== undefined) {
      DateMessage.encode(message.startDate, writer.uint32(98).fork()).ldelim();
    }
    if (message.endDate !== undefined) {
      DateMessage.encode(message.endDate, writer.uint32(106).fork()).ldelim();
    }
    if (message.skipDays !== undefined && message.skipDays.length !== 0) {
      for (const v of message.skipDays) {
        DateMessage.encode(v!, writer.uint32(114).fork()).ldelim();
      }
    }
    if (message.holidayListIds !== undefined && message.holidayListIds.length !== 0) {
      for (const v of message.holidayListIds) {
        writer.uint32(122).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Schedule {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchedule();
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

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.workflowId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
          if (tag !== 66) {
            break;
          }

          message.config = ScheduleConfig.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.futureActionTimes!.push(fromTimestamp(Timestamp.decode(reader, reader.uint32())));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.timezoneName = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.startDate = DateMessage.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.endDate = DateMessage.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.skipDays!.push(DateMessage.decode(reader, reader.uint32()));
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.holidayListIds!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Schedule {
    return {
      $type: Schedule.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      lastUpdateTime: isSet(object.lastUpdateTime) ? fromJsonTimestamp(object.lastUpdateTime) : undefined,
      config: isSet(object.config) ? ScheduleConfig.fromJSON(object.config) : undefined,
      futureActionTimes: globalThis.Array.isArray(object?.futureActionTimes)
        ? object.futureActionTimes.map((e: any) => fromJsonTimestamp(e))
        : [],
      timezoneName: isSet(object.timezoneName) ? globalThis.String(object.timezoneName) : "",
      status: isSet(object.status) ? scheduleScheduleStatusFromJSON(object.status) : 0,
      startDate: isSet(object.startDate) ? DateMessage.fromJSON(object.startDate) : undefined,
      endDate: isSet(object.endDate) ? DateMessage.fromJSON(object.endDate) : undefined,
      skipDays: globalThis.Array.isArray(object?.skipDays)
        ? object.skipDays.map((e: any) => DateMessage.fromJSON(e))
        : [],
      holidayListIds: globalThis.Array.isArray(object?.holidayListIds)
        ? object.holidayListIds.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: Schedule): unknown {
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
    if (message.startTime !== undefined) {
      obj.startTime = message.startTime.toISOString();
    }
    if (message.endTime !== undefined) {
      obj.endTime = message.endTime.toISOString();
    }
    if (message.createTime !== undefined) {
      obj.createTime = message.createTime.toISOString();
    }
    if (message.lastUpdateTime !== undefined) {
      obj.lastUpdateTime = message.lastUpdateTime.toISOString();
    }
    if (message.config !== undefined) {
      obj.config = ScheduleConfig.toJSON(message.config);
    }
    if (message.futureActionTimes?.length) {
      obj.futureActionTimes = message.futureActionTimes.map((e) => e.toISOString());
    }
    if (message.timezoneName !== undefined && message.timezoneName !== "") {
      obj.timezoneName = message.timezoneName;
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = scheduleScheduleStatusToJSON(message.status);
    }
    if (message.startDate !== undefined) {
      obj.startDate = DateMessage.toJSON(message.startDate);
    }
    if (message.endDate !== undefined) {
      obj.endDate = DateMessage.toJSON(message.endDate);
    }
    if (message.skipDays?.length) {
      obj.skipDays = message.skipDays.map((e) => DateMessage.toJSON(e));
    }
    if (message.holidayListIds?.length) {
      obj.holidayListIds = message.holidayListIds;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Schedule>, I>>(base?: I): Schedule {
    return Schedule.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Schedule>, I>>(object: I): Schedule {
    const message = createBaseSchedule();
    message.id = object.id ?? "";
    message.orgId = object.orgId ?? "";
    message.workflowId = object.workflowId ?? "";
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    message.createTime = object.createTime ?? undefined;
    message.lastUpdateTime = object.lastUpdateTime ?? undefined;
    message.config = (object.config !== undefined && object.config !== null)
      ? ScheduleConfig.fromPartial(object.config)
      : undefined;
    message.futureActionTimes = object.futureActionTimes?.map((e) => e) || [];
    message.timezoneName = object.timezoneName ?? "";
    message.status = object.status ?? 0;
    message.startDate = (object.startDate !== undefined && object.startDate !== null)
      ? DateMessage.fromPartial(object.startDate)
      : undefined;
    message.endDate = (object.endDate !== undefined && object.endDate !== null)
      ? DateMessage.fromPartial(object.endDate)
      : undefined;
    message.skipDays = object.skipDays?.map((e) => DateMessage.fromPartial(e)) || [];
    message.holidayListIds = object.holidayListIds?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(Schedule.$type, Schedule);

function createBaseScheduleConfig(): ScheduleConfig {
  return { $type: "pb.v1alpha1.ScheduleConfig", schedulePattern: undefined, interval: 0 };
}

export const ScheduleConfig = {
  $type: "pb.v1alpha1.ScheduleConfig" as const,

  encode(message: ScheduleConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schedulePattern !== undefined) {
      ScheduleConfigSchedulePattern.encode(message.schedulePattern, writer.uint32(10).fork()).ldelim();
    }
    if (message.interval !== undefined && message.interval !== 0) {
      writer.uint32(16).int32(message.interval);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScheduleConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduleConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.schedulePattern = ScheduleConfigSchedulePattern.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.interval = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScheduleConfig {
    return {
      $type: ScheduleConfig.$type,
      schedulePattern: isSet(object.schedulePattern)
        ? ScheduleConfigSchedulePattern.fromJSON(object.schedulePattern)
        : undefined,
      interval: isSet(object.interval) ? globalThis.Number(object.interval) : 0,
    };
  },

  toJSON(message: ScheduleConfig): unknown {
    const obj: any = {};
    if (message.schedulePattern !== undefined) {
      obj.schedulePattern = ScheduleConfigSchedulePattern.toJSON(message.schedulePattern);
    }
    if (message.interval !== undefined && message.interval !== 0) {
      obj.interval = Math.round(message.interval);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ScheduleConfig>, I>>(base?: I): ScheduleConfig {
    return ScheduleConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScheduleConfig>, I>>(object: I): ScheduleConfig {
    const message = createBaseScheduleConfig();
    message.schedulePattern = (object.schedulePattern !== undefined && object.schedulePattern !== null)
      ? ScheduleConfigSchedulePattern.fromPartial(object.schedulePattern)
      : undefined;
    message.interval = object.interval ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ScheduleConfig.$type, ScheduleConfig);

function createBaseScheduleConfigSchedulePattern(): ScheduleConfigSchedulePattern {
  return { $type: "pb.v1alpha1.ScheduleConfig.SchedulePattern", runTimes: [], recurrencePattern: undefined };
}

export const ScheduleConfigSchedulePattern = {
  $type: "pb.v1alpha1.ScheduleConfig.SchedulePattern" as const,

  encode(message: ScheduleConfigSchedulePattern, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.runTimes !== undefined && message.runTimes.length !== 0) {
      for (const v of message.runTimes) {
        TimeOfDay.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.recurrencePattern !== undefined) {
      ScheduleConfigRecurrencePattern.encode(message.recurrencePattern, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScheduleConfigSchedulePattern {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduleConfigSchedulePattern();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.runTimes!.push(TimeOfDay.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.recurrencePattern = ScheduleConfigRecurrencePattern.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScheduleConfigSchedulePattern {
    return {
      $type: ScheduleConfigSchedulePattern.$type,
      runTimes: globalThis.Array.isArray(object?.runTimes)
        ? object.runTimes.map((e: any) => TimeOfDay.fromJSON(e))
        : [],
      recurrencePattern: isSet(object.recurrencePattern)
        ? ScheduleConfigRecurrencePattern.fromJSON(object.recurrencePattern)
        : undefined,
    };
  },

  toJSON(message: ScheduleConfigSchedulePattern): unknown {
    const obj: any = {};
    if (message.runTimes?.length) {
      obj.runTimes = message.runTimes.map((e) => TimeOfDay.toJSON(e));
    }
    if (message.recurrencePattern !== undefined) {
      obj.recurrencePattern = ScheduleConfigRecurrencePattern.toJSON(message.recurrencePattern);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ScheduleConfigSchedulePattern>, I>>(base?: I): ScheduleConfigSchedulePattern {
    return ScheduleConfigSchedulePattern.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScheduleConfigSchedulePattern>, I>>(
    object: I,
  ): ScheduleConfigSchedulePattern {
    const message = createBaseScheduleConfigSchedulePattern();
    message.runTimes = object.runTimes?.map((e) => TimeOfDay.fromPartial(e)) || [];
    message.recurrencePattern = (object.recurrencePattern !== undefined && object.recurrencePattern !== null)
      ? ScheduleConfigRecurrencePattern.fromPartial(object.recurrencePattern)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ScheduleConfigSchedulePattern.$type, ScheduleConfigSchedulePattern);

function createBaseScheduleConfigRecurrencePattern(): ScheduleConfigRecurrencePattern {
  return {
    $type: "pb.v1alpha1.ScheduleConfig.RecurrencePattern",
    noRecurrence: undefined,
    dailyRecurrence: undefined,
    weeklyRecurrence: undefined,
    monthlyRecurrence: undefined,
  };
}

export const ScheduleConfigRecurrencePattern = {
  $type: "pb.v1alpha1.ScheduleConfig.RecurrencePattern" as const,

  encode(message: ScheduleConfigRecurrencePattern, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.noRecurrence !== undefined) {
      ScheduleConfigRecurrencePatternNoRecurrence.encode(message.noRecurrence, writer.uint32(10).fork()).ldelim();
    }
    if (message.dailyRecurrence !== undefined) {
      ScheduleConfigRecurrencePatternDailyRecurrence.encode(message.dailyRecurrence, writer.uint32(18).fork()).ldelim();
    }
    if (message.weeklyRecurrence !== undefined) {
      ScheduleConfigRecurrencePatternWeeklyRecurrence.encode(message.weeklyRecurrence, writer.uint32(26).fork())
        .ldelim();
    }
    if (message.monthlyRecurrence !== undefined) {
      ScheduleConfigRecurrencePatternMonthlyRecurrence.encode(message.monthlyRecurrence, writer.uint32(34).fork())
        .ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScheduleConfigRecurrencePattern {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduleConfigRecurrencePattern();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.noRecurrence = ScheduleConfigRecurrencePatternNoRecurrence.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.dailyRecurrence = ScheduleConfigRecurrencePatternDailyRecurrence.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.weeklyRecurrence = ScheduleConfigRecurrencePatternWeeklyRecurrence.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.monthlyRecurrence = ScheduleConfigRecurrencePatternMonthlyRecurrence.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScheduleConfigRecurrencePattern {
    return {
      $type: ScheduleConfigRecurrencePattern.$type,
      noRecurrence: isSet(object.noRecurrence)
        ? ScheduleConfigRecurrencePatternNoRecurrence.fromJSON(object.noRecurrence)
        : undefined,
      dailyRecurrence: isSet(object.dailyRecurrence)
        ? ScheduleConfigRecurrencePatternDailyRecurrence.fromJSON(object.dailyRecurrence)
        : undefined,
      weeklyRecurrence: isSet(object.weeklyRecurrence)
        ? ScheduleConfigRecurrencePatternWeeklyRecurrence.fromJSON(object.weeklyRecurrence)
        : undefined,
      monthlyRecurrence: isSet(object.monthlyRecurrence)
        ? ScheduleConfigRecurrencePatternMonthlyRecurrence.fromJSON(object.monthlyRecurrence)
        : undefined,
    };
  },

  toJSON(message: ScheduleConfigRecurrencePattern): unknown {
    const obj: any = {};
    if (message.noRecurrence !== undefined) {
      obj.noRecurrence = ScheduleConfigRecurrencePatternNoRecurrence.toJSON(message.noRecurrence);
    }
    if (message.dailyRecurrence !== undefined) {
      obj.dailyRecurrence = ScheduleConfigRecurrencePatternDailyRecurrence.toJSON(message.dailyRecurrence);
    }
    if (message.weeklyRecurrence !== undefined) {
      obj.weeklyRecurrence = ScheduleConfigRecurrencePatternWeeklyRecurrence.toJSON(message.weeklyRecurrence);
    }
    if (message.monthlyRecurrence !== undefined) {
      obj.monthlyRecurrence = ScheduleConfigRecurrencePatternMonthlyRecurrence.toJSON(message.monthlyRecurrence);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ScheduleConfigRecurrencePattern>, I>>(base?: I): ScheduleConfigRecurrencePattern {
    return ScheduleConfigRecurrencePattern.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScheduleConfigRecurrencePattern>, I>>(
    object: I,
  ): ScheduleConfigRecurrencePattern {
    const message = createBaseScheduleConfigRecurrencePattern();
    message.noRecurrence = (object.noRecurrence !== undefined && object.noRecurrence !== null)
      ? ScheduleConfigRecurrencePatternNoRecurrence.fromPartial(object.noRecurrence)
      : undefined;
    message.dailyRecurrence = (object.dailyRecurrence !== undefined && object.dailyRecurrence !== null)
      ? ScheduleConfigRecurrencePatternDailyRecurrence.fromPartial(object.dailyRecurrence)
      : undefined;
    message.weeklyRecurrence = (object.weeklyRecurrence !== undefined && object.weeklyRecurrence !== null)
      ? ScheduleConfigRecurrencePatternWeeklyRecurrence.fromPartial(object.weeklyRecurrence)
      : undefined;
    message.monthlyRecurrence = (object.monthlyRecurrence !== undefined && object.monthlyRecurrence !== null)
      ? ScheduleConfigRecurrencePatternMonthlyRecurrence.fromPartial(object.monthlyRecurrence)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ScheduleConfigRecurrencePattern.$type, ScheduleConfigRecurrencePattern);

function createBaseScheduleConfigRecurrencePatternNoRecurrence(): ScheduleConfigRecurrencePatternNoRecurrence {
  return { $type: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.NoRecurrence" };
}

export const ScheduleConfigRecurrencePatternNoRecurrence = {
  $type: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.NoRecurrence" as const,

  encode(_: ScheduleConfigRecurrencePatternNoRecurrence, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScheduleConfigRecurrencePatternNoRecurrence {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduleConfigRecurrencePatternNoRecurrence();
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

  fromJSON(_: any): ScheduleConfigRecurrencePatternNoRecurrence {
    return { $type: ScheduleConfigRecurrencePatternNoRecurrence.$type };
  },

  toJSON(_: ScheduleConfigRecurrencePatternNoRecurrence): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ScheduleConfigRecurrencePatternNoRecurrence>, I>>(
    base?: I,
  ): ScheduleConfigRecurrencePatternNoRecurrence {
    return ScheduleConfigRecurrencePatternNoRecurrence.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScheduleConfigRecurrencePatternNoRecurrence>, I>>(
    _: I,
  ): ScheduleConfigRecurrencePatternNoRecurrence {
    const message = createBaseScheduleConfigRecurrencePatternNoRecurrence();
    return message;
  },
};

messageTypeRegistry.set(ScheduleConfigRecurrencePatternNoRecurrence.$type, ScheduleConfigRecurrencePatternNoRecurrence);

function createBaseScheduleConfigRecurrencePatternDailyRecurrence(): ScheduleConfigRecurrencePatternDailyRecurrence {
  return { $type: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.DailyRecurrence" };
}

export const ScheduleConfigRecurrencePatternDailyRecurrence = {
  $type: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.DailyRecurrence" as const,

  encode(_: ScheduleConfigRecurrencePatternDailyRecurrence, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScheduleConfigRecurrencePatternDailyRecurrence {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduleConfigRecurrencePatternDailyRecurrence();
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

  fromJSON(_: any): ScheduleConfigRecurrencePatternDailyRecurrence {
    return { $type: ScheduleConfigRecurrencePatternDailyRecurrence.$type };
  },

  toJSON(_: ScheduleConfigRecurrencePatternDailyRecurrence): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ScheduleConfigRecurrencePatternDailyRecurrence>, I>>(
    base?: I,
  ): ScheduleConfigRecurrencePatternDailyRecurrence {
    return ScheduleConfigRecurrencePatternDailyRecurrence.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScheduleConfigRecurrencePatternDailyRecurrence>, I>>(
    _: I,
  ): ScheduleConfigRecurrencePatternDailyRecurrence {
    const message = createBaseScheduleConfigRecurrencePatternDailyRecurrence();
    return message;
  },
};

messageTypeRegistry.set(
  ScheduleConfigRecurrencePatternDailyRecurrence.$type,
  ScheduleConfigRecurrencePatternDailyRecurrence,
);

function createBaseScheduleConfigRecurrencePatternWeeklyRecurrence(): ScheduleConfigRecurrencePatternWeeklyRecurrence {
  return { $type: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.WeeklyRecurrence", daysOfWeek: [] };
}

export const ScheduleConfigRecurrencePatternWeeklyRecurrence = {
  $type: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.WeeklyRecurrence" as const,

  encode(
    message: ScheduleConfigRecurrencePatternWeeklyRecurrence,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.daysOfWeek !== undefined && message.daysOfWeek.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.daysOfWeek) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScheduleConfigRecurrencePatternWeeklyRecurrence {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduleConfigRecurrencePatternWeeklyRecurrence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.daysOfWeek!.push(reader.int32() as any);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.daysOfWeek!.push(reader.int32() as any);
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

  fromJSON(object: any): ScheduleConfigRecurrencePatternWeeklyRecurrence {
    return {
      $type: ScheduleConfigRecurrencePatternWeeklyRecurrence.$type,
      daysOfWeek: globalThis.Array.isArray(object?.daysOfWeek)
        ? object.daysOfWeek.map((e: any) => scheduleConfigRecurrencePatternDayOfWeekFromJSON(e))
        : [],
    };
  },

  toJSON(message: ScheduleConfigRecurrencePatternWeeklyRecurrence): unknown {
    const obj: any = {};
    if (message.daysOfWeek?.length) {
      obj.daysOfWeek = message.daysOfWeek.map((e) => scheduleConfigRecurrencePatternDayOfWeekToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ScheduleConfigRecurrencePatternWeeklyRecurrence>, I>>(
    base?: I,
  ): ScheduleConfigRecurrencePatternWeeklyRecurrence {
    return ScheduleConfigRecurrencePatternWeeklyRecurrence.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScheduleConfigRecurrencePatternWeeklyRecurrence>, I>>(
    object: I,
  ): ScheduleConfigRecurrencePatternWeeklyRecurrence {
    const message = createBaseScheduleConfigRecurrencePatternWeeklyRecurrence();
    message.daysOfWeek = object.daysOfWeek?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(
  ScheduleConfigRecurrencePatternWeeklyRecurrence.$type,
  ScheduleConfigRecurrencePatternWeeklyRecurrence,
);

function createBaseScheduleConfigRecurrencePatternMonthlyRecurrence(): ScheduleConfigRecurrencePatternMonthlyRecurrence {
  return {
    $type: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.MonthlyRecurrence",
    dayOfMonth: 0,
    dayOfWeekPattern: [],
  };
}

export const ScheduleConfigRecurrencePatternMonthlyRecurrence = {
  $type: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.MonthlyRecurrence" as const,

  encode(
    message: ScheduleConfigRecurrencePatternMonthlyRecurrence,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.dayOfMonth !== undefined && message.dayOfMonth !== 0) {
      writer.uint32(8).int32(message.dayOfMonth);
    }
    if (message.dayOfWeekPattern !== undefined && message.dayOfWeekPattern.length !== 0) {
      for (const v of message.dayOfWeekPattern) {
        ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScheduleConfigRecurrencePatternMonthlyRecurrence {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduleConfigRecurrencePatternMonthlyRecurrence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.dayOfMonth = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.dayOfWeekPattern!.push(
            ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScheduleConfigRecurrencePatternMonthlyRecurrence {
    return {
      $type: ScheduleConfigRecurrencePatternMonthlyRecurrence.$type,
      dayOfMonth: isSet(object.dayOfMonth) ? globalThis.Number(object.dayOfMonth) : 0,
      dayOfWeekPattern: globalThis.Array.isArray(object?.dayOfWeekPattern)
        ? object.dayOfWeekPattern.map((e: any) =>
          ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern.fromJSON(e)
        )
        : [],
    };
  },

  toJSON(message: ScheduleConfigRecurrencePatternMonthlyRecurrence): unknown {
    const obj: any = {};
    if (message.dayOfMonth !== undefined && message.dayOfMonth !== 0) {
      obj.dayOfMonth = Math.round(message.dayOfMonth);
    }
    if (message.dayOfWeekPattern?.length) {
      obj.dayOfWeekPattern = message.dayOfWeekPattern.map((e) =>
        ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ScheduleConfigRecurrencePatternMonthlyRecurrence>, I>>(
    base?: I,
  ): ScheduleConfigRecurrencePatternMonthlyRecurrence {
    return ScheduleConfigRecurrencePatternMonthlyRecurrence.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScheduleConfigRecurrencePatternMonthlyRecurrence>, I>>(
    object: I,
  ): ScheduleConfigRecurrencePatternMonthlyRecurrence {
    const message = createBaseScheduleConfigRecurrencePatternMonthlyRecurrence();
    message.dayOfMonth = object.dayOfMonth ?? 0;
    message.dayOfWeekPattern =
      object.dayOfWeekPattern?.map((e) =>
        ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern.fromPartial(e)
      ) || [];
    return message;
  },
};

messageTypeRegistry.set(
  ScheduleConfigRecurrencePatternMonthlyRecurrence.$type,
  ScheduleConfigRecurrencePatternMonthlyRecurrence,
);

function createBaseScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern(): ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern {
  return {
    $type: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.MonthlyRecurrence.DayOfWeekPattern",
    dayOfWeek: 0,
    weekOfMonth: 0,
  };
}

export const ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern = {
  $type: "pb.v1alpha1.ScheduleConfig.RecurrencePattern.MonthlyRecurrence.DayOfWeekPattern" as const,

  encode(
    message: ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.dayOfWeek !== undefined && message.dayOfWeek !== 0) {
      writer.uint32(8).int32(message.dayOfWeek);
    }
    if (message.weekOfMonth !== undefined && message.weekOfMonth !== 0) {
      writer.uint32(16).int32(message.weekOfMonth);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.dayOfWeek = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.weekOfMonth = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern {
    return {
      $type: ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern.$type,
      dayOfWeek: isSet(object.dayOfWeek) ? scheduleConfigRecurrencePatternDayOfWeekFromJSON(object.dayOfWeek) : 0,
      weekOfMonth: isSet(object.weekOfMonth)
        ? scheduleConfigRecurrencePatternWeekOfMonthFromJSON(object.weekOfMonth)
        : 0,
    };
  },

  toJSON(message: ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern): unknown {
    const obj: any = {};
    if (message.dayOfWeek !== undefined && message.dayOfWeek !== 0) {
      obj.dayOfWeek = scheduleConfigRecurrencePatternDayOfWeekToJSON(message.dayOfWeek);
    }
    if (message.weekOfMonth !== undefined && message.weekOfMonth !== 0) {
      obj.weekOfMonth = scheduleConfigRecurrencePatternWeekOfMonthToJSON(message.weekOfMonth);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern>, I>>(
    base?: I,
  ): ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern {
    return ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern>, I>>(
    object: I,
  ): ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern {
    const message = createBaseScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern();
    message.dayOfWeek = object.dayOfWeek ?? 0;
    message.weekOfMonth = object.weekOfMonth ?? 0;
    return message;
  },
};

messageTypeRegistry.set(
  ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern.$type,
  ScheduleConfigRecurrencePatternMonthlyRecurrenceDayOfWeekPattern,
);

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
