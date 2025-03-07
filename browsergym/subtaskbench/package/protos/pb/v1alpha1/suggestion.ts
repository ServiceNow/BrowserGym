/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import { Performance } from "./performance";
import { SuggestionStep } from "./suggestion_step";

export const protobufPackage = "pb.v1alpha1";

export enum obsoleteReason {
  OBSOLETE_REASON_UNSPECIFIED = 0,
  LOW_DOCUMENT_CLASSIFICATION_SCORE = 1,
  LARGE_DOCUMENT_SIZE = 2,
  TASK_CONFIG_NOT_READY_FOR_SUGGESTION_CREATION = 3,
  UNMATCHED_CLASSIFICATION = 4,
  UNRECOGNIZED = -1,
}

export function obsoleteReasonFromJSON(object: any): obsoleteReason {
  switch (object) {
    case 0:
    case "OBSOLETE_REASON_UNSPECIFIED":
      return obsoleteReason.OBSOLETE_REASON_UNSPECIFIED;
    case 1:
    case "LOW_DOCUMENT_CLASSIFICATION_SCORE":
      return obsoleteReason.LOW_DOCUMENT_CLASSIFICATION_SCORE;
    case 2:
    case "LARGE_DOCUMENT_SIZE":
      return obsoleteReason.LARGE_DOCUMENT_SIZE;
    case 3:
    case "TASK_CONFIG_NOT_READY_FOR_SUGGESTION_CREATION":
      return obsoleteReason.TASK_CONFIG_NOT_READY_FOR_SUGGESTION_CREATION;
    case 4:
    case "UNMATCHED_CLASSIFICATION":
      return obsoleteReason.UNMATCHED_CLASSIFICATION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return obsoleteReason.UNRECOGNIZED;
  }
}

export function obsoleteReasonToJSON(object: obsoleteReason): string {
  switch (object) {
    case obsoleteReason.OBSOLETE_REASON_UNSPECIFIED:
      return "OBSOLETE_REASON_UNSPECIFIED";
    case obsoleteReason.LOW_DOCUMENT_CLASSIFICATION_SCORE:
      return "LOW_DOCUMENT_CLASSIFICATION_SCORE";
    case obsoleteReason.LARGE_DOCUMENT_SIZE:
      return "LARGE_DOCUMENT_SIZE";
    case obsoleteReason.TASK_CONFIG_NOT_READY_FOR_SUGGESTION_CREATION:
      return "TASK_CONFIG_NOT_READY_FOR_SUGGESTION_CREATION";
    case obsoleteReason.UNMATCHED_CLASSIFICATION:
      return "UNMATCHED_CLASSIFICATION";
    case obsoleteReason.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Suggestion {
  $type?: "pb.v1alpha1.Suggestion";
  /** Resource name for suggestion, in the format of users\/\* /suggestions/\* */
  name?: string | undefined;
  taskName?: string | undefined;
  confidence?: number | undefined;
  status?: SuggestionSTATUS | undefined;
  createTime?: Date | undefined;
  completeTime?: Date | undefined;
  timeSaved?: string | undefined;
  tags?:
    | string[]
    | undefined;
  /** Resource name for the task that generates this suggestion. Format is users\/\* /tasks/\* */
  taskResourceName?:
    | string
    | undefined;
  /** An ordered list of steps of this suggestion. */
  steps?:
    | SuggestionStep[]
    | undefined;
  /** Suggestion performance metrics to be calculated once the suggestion is completed. */
  performance?: Performance | undefined;
  readyTime?: Date | undefined;
  eventIds?:
    | string[]
    | undefined;
  /**
   * For default mode task, the field is always true, meaning all suggestions need review
   * For auto pilot mode task, the field is always false, meaning no suggestion needs review
   * For assisted mode, the field is false if suggestion confidence score >= task
   * confidence score threshold, otherwise true that means it need review.
   */
  humanReview?:
    | boolean
    | undefined;
  /** This field stores why the suggestion was marked obsolete */
  obsoleteReason?: obsoleteReason | undefined;
  obsoleteTime?: Date | undefined;
}

export enum SuggestionSTATUS {
  STATUS_UNSPECIFIED = 0,
  /**
   * CREATED - A created suggestion that still waits for its preliminary steps to finish. It is not
   * ready to execute any non-preliminary step and shouldn't be presented to users in any form.
   */
  CREATED = 1,
  ACCEPTED = 2,
  REJECTED_INCORRECT = 3,
  REJECTED_ALREADY_COMPLETED = 4,
  /**
   * READY - A suggestion that has finished its preliminary steps and is ready for non-preliminary
   * setps like user review and actions on client side applications.
   */
  READY = 5,
  /**
   * OBSOLETE - A obsolete suggestion which doesn't finish all executions.
   * For example we delete an attachment-related suggestion if user has
   * downloaded the attachment before the suggestion is complete
   */
  OBSOLETE = 6,
  UNRECOGNIZED = -1,
}

export function suggestionSTATUSFromJSON(object: any): SuggestionSTATUS {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return SuggestionSTATUS.STATUS_UNSPECIFIED;
    case 1:
    case "CREATED":
      return SuggestionSTATUS.CREATED;
    case 2:
    case "ACCEPTED":
      return SuggestionSTATUS.ACCEPTED;
    case 3:
    case "REJECTED_INCORRECT":
      return SuggestionSTATUS.REJECTED_INCORRECT;
    case 4:
    case "REJECTED_ALREADY_COMPLETED":
      return SuggestionSTATUS.REJECTED_ALREADY_COMPLETED;
    case 5:
    case "READY":
      return SuggestionSTATUS.READY;
    case 6:
    case "OBSOLETE":
      return SuggestionSTATUS.OBSOLETE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SuggestionSTATUS.UNRECOGNIZED;
  }
}

export function suggestionSTATUSToJSON(object: SuggestionSTATUS): string {
  switch (object) {
    case SuggestionSTATUS.STATUS_UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case SuggestionSTATUS.CREATED:
      return "CREATED";
    case SuggestionSTATUS.ACCEPTED:
      return "ACCEPTED";
    case SuggestionSTATUS.REJECTED_INCORRECT:
      return "REJECTED_INCORRECT";
    case SuggestionSTATUS.REJECTED_ALREADY_COMPLETED:
      return "REJECTED_ALREADY_COMPLETED";
    case SuggestionSTATUS.READY:
      return "READY";
    case SuggestionSTATUS.OBSOLETE:
      return "OBSOLETE";
    case SuggestionSTATUS.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseSuggestion(): Suggestion {
  return {
    $type: "pb.v1alpha1.Suggestion",
    name: "",
    taskName: "",
    confidence: 0,
    status: 0,
    createTime: undefined,
    completeTime: undefined,
    timeSaved: "",
    tags: [],
    taskResourceName: "",
    steps: [],
    performance: undefined,
    readyTime: undefined,
    eventIds: [],
    humanReview: false,
    obsoleteReason: 0,
    obsoleteTime: undefined,
  };
}

export const Suggestion = {
  $type: "pb.v1alpha1.Suggestion" as const,

  encode(message: Suggestion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.taskName !== undefined && message.taskName !== "") {
      writer.uint32(18).string(message.taskName);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(25).double(message.confidence);
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.completeTime !== undefined) {
      Timestamp.encode(toTimestamp(message.completeTime), writer.uint32(50).fork()).ldelim();
    }
    if (message.timeSaved !== undefined && message.timeSaved !== "") {
      writer.uint32(58).string(message.timeSaved);
    }
    if (message.tags !== undefined && message.tags.length !== 0) {
      for (const v of message.tags) {
        writer.uint32(66).string(v!);
      }
    }
    if (message.taskResourceName !== undefined && message.taskResourceName !== "") {
      writer.uint32(74).string(message.taskResourceName);
    }
    if (message.steps !== undefined && message.steps.length !== 0) {
      for (const v of message.steps) {
        SuggestionStep.encode(v!, writer.uint32(82).fork()).ldelim();
      }
    }
    if (message.performance !== undefined) {
      Performance.encode(message.performance, writer.uint32(90).fork()).ldelim();
    }
    if (message.readyTime !== undefined) {
      Timestamp.encode(toTimestamp(message.readyTime), writer.uint32(98).fork()).ldelim();
    }
    if (message.eventIds !== undefined && message.eventIds.length !== 0) {
      for (const v of message.eventIds) {
        writer.uint32(106).string(v!);
      }
    }
    if (message.humanReview !== undefined && message.humanReview !== false) {
      writer.uint32(112).bool(message.humanReview);
    }
    if (message.obsoleteReason !== undefined && message.obsoleteReason !== 0) {
      writer.uint32(120).int32(message.obsoleteReason);
    }
    if (message.obsoleteTime !== undefined) {
      Timestamp.encode(toTimestamp(message.obsoleteTime), writer.uint32(130).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Suggestion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestion();
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

          message.taskName = reader.string();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.confidence = reader.double();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.status = reader.int32() as any;
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

          message.completeTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.timeSaved = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.tags!.push(reader.string());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.taskResourceName = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.steps!.push(SuggestionStep.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.performance = Performance.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.readyTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.eventIds!.push(reader.string());
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.humanReview = reader.bool();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.obsoleteReason = reader.int32() as any;
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.obsoleteTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Suggestion {
    return {
      $type: Suggestion.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      taskName: isSet(object.taskName) ? globalThis.String(object.taskName) : "",
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
      status: isSet(object.status) ? suggestionSTATUSFromJSON(object.status) : 0,
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      completeTime: isSet(object.completeTime) ? fromJsonTimestamp(object.completeTime) : undefined,
      timeSaved: isSet(object.timeSaved) ? globalThis.String(object.timeSaved) : "",
      tags: globalThis.Array.isArray(object?.tags) ? object.tags.map((e: any) => globalThis.String(e)) : [],
      taskResourceName: isSet(object.taskResourceName) ? globalThis.String(object.taskResourceName) : "",
      steps: globalThis.Array.isArray(object?.steps) ? object.steps.map((e: any) => SuggestionStep.fromJSON(e)) : [],
      performance: isSet(object.performance) ? Performance.fromJSON(object.performance) : undefined,
      readyTime: isSet(object.readyTime) ? fromJsonTimestamp(object.readyTime) : undefined,
      eventIds: globalThis.Array.isArray(object?.eventIds) ? object.eventIds.map((e: any) => globalThis.String(e)) : [],
      humanReview: isSet(object.humanReview) ? globalThis.Boolean(object.humanReview) : false,
      obsoleteReason: isSet(object.obsoleteReason) ? obsoleteReasonFromJSON(object.obsoleteReason) : 0,
      obsoleteTime: isSet(object.obsoleteTime) ? fromJsonTimestamp(object.obsoleteTime) : undefined,
    };
  },

  toJSON(message: Suggestion): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.taskName !== undefined && message.taskName !== "") {
      obj.taskName = message.taskName;
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = suggestionSTATUSToJSON(message.status);
    }
    if (message.createTime !== undefined) {
      obj.createTime = message.createTime.toISOString();
    }
    if (message.completeTime !== undefined) {
      obj.completeTime = message.completeTime.toISOString();
    }
    if (message.timeSaved !== undefined && message.timeSaved !== "") {
      obj.timeSaved = message.timeSaved;
    }
    if (message.tags?.length) {
      obj.tags = message.tags;
    }
    if (message.taskResourceName !== undefined && message.taskResourceName !== "") {
      obj.taskResourceName = message.taskResourceName;
    }
    if (message.steps?.length) {
      obj.steps = message.steps.map((e) => SuggestionStep.toJSON(e));
    }
    if (message.performance !== undefined) {
      obj.performance = Performance.toJSON(message.performance);
    }
    if (message.readyTime !== undefined) {
      obj.readyTime = message.readyTime.toISOString();
    }
    if (message.eventIds?.length) {
      obj.eventIds = message.eventIds;
    }
    if (message.humanReview !== undefined && message.humanReview !== false) {
      obj.humanReview = message.humanReview;
    }
    if (message.obsoleteReason !== undefined && message.obsoleteReason !== 0) {
      obj.obsoleteReason = obsoleteReasonToJSON(message.obsoleteReason);
    }
    if (message.obsoleteTime !== undefined) {
      obj.obsoleteTime = message.obsoleteTime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Suggestion>, I>>(base?: I): Suggestion {
    return Suggestion.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Suggestion>, I>>(object: I): Suggestion {
    const message = createBaseSuggestion();
    message.name = object.name ?? "";
    message.taskName = object.taskName ?? "";
    message.confidence = object.confidence ?? 0;
    message.status = object.status ?? 0;
    message.createTime = object.createTime ?? undefined;
    message.completeTime = object.completeTime ?? undefined;
    message.timeSaved = object.timeSaved ?? "";
    message.tags = object.tags?.map((e) => e) || [];
    message.taskResourceName = object.taskResourceName ?? "";
    message.steps = object.steps?.map((e) => SuggestionStep.fromPartial(e)) || [];
    message.performance = (object.performance !== undefined && object.performance !== null)
      ? Performance.fromPartial(object.performance)
      : undefined;
    message.readyTime = object.readyTime ?? undefined;
    message.eventIds = object.eventIds?.map((e) => e) || [];
    message.humanReview = object.humanReview ?? false;
    message.obsoleteReason = object.obsoleteReason ?? 0;
    message.obsoleteTime = object.obsoleteTime ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Suggestion.$type, Suggestion);

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
