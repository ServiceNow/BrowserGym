/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../google/protobuf/any";
import { Timestamp } from "../google/protobuf/timestamp";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "automation_mining";

/** Next ID: 21 */
export enum Activity {
  UNSPECIFIED = 0,
  /** NEW_EMAIL - Email events */
  NEW_EMAIL = 7,
  SEND_EMAIL = 1,
  READ_EMAIL = 2,
  DOWNLOAD_ATTACHMENT = 3,
  CLASSIFY_DOCUMENT = 13,
  /** COMPREHEND_DOCUMENT - document prerequisite */
  COMPREHEND_DOCUMENT = 4,
  /** EXTRACT_ENTITY - extraction only */
  EXTRACT_ENTITY = 18,
  /** SAVE_FILE - Drive events */
  SAVE_FILE = 5,
  NEW_FILE_ADDED = 15,
  /** UPDATE_SHEET_CELL - Sheet events */
  UPDATE_SHEET_CELL = 6,
  OPEN_SHEET = 8,
  CREATE_SHEET_TAB = 9,
  PASTE_VALUE_INTO_SHEET_CELL = 14,
  /** END - Indicate that there is no more activities available. */
  END = 10,
  /** CREATE_INVOICE - NetSuite events */
  CREATE_INVOICE = 11,
  /** ADD_SHEET_ROW - Google Sheets events */
  ADD_SHEET_ROW = 12,
  /** MANUAL_TRIGGER - Manual Triggering */
  MANUAL_TRIGGER = 16,
  /** NEW_OBJECT_ADDED - SFTP Triggering */
  NEW_OBJECT_ADDED = 17,
  /** SMART_ACTION - SMART ACTION (Deprecated) */
  SMART_ACTION = 19,
  /** PROCEEDING_EXECUTION - Proceed to next process execution after smart action is reviewed. */
  PROCEEDING_EXECUTION = 20,
  /** DELETE_RAW_FILE - raw file deletion event */
  DELETE_RAW_FILE = 21,
  /** SMART_ACTION_EXTRACT_FIELDS - Smart Actions */
  SMART_ACTION_EXTRACT_FIELDS = 22,
  SMART_ACTION_VALIDATE_FIELD_VALUES = 23,
  SMART_ACTION_FLAG_KEYWORDS = 24,
  SMART_ACTION_DETECT_DUPLICATE_LINE_ITEMS = 25,
  SMART_ACTION_RECONCILE_LINE_ITEMS = 26,
  SMART_ACTION_GENERATE_TEXT = 27,
  SMART_ACTION_CLASSIFY = 28,
  UNRECOGNIZED = -1,
}

export function activityFromJSON(object: any): Activity {
  switch (object) {
    case 0:
    case "ACTIVITY_UNSPECIFIED":
      return Activity.UNSPECIFIED;
    case 7:
    case "ACTIVITY_NEW_EMAIL":
      return Activity.NEW_EMAIL;
    case 1:
    case "ACTIVITY_SEND_EMAIL":
      return Activity.SEND_EMAIL;
    case 2:
    case "ACTIVITY_READ_EMAIL":
      return Activity.READ_EMAIL;
    case 3:
    case "ACTIVITY_DOWNLOAD_ATTACHMENT":
      return Activity.DOWNLOAD_ATTACHMENT;
    case 13:
    case "ACTIVITY_CLASSIFY_DOCUMENT":
      return Activity.CLASSIFY_DOCUMENT;
    case 4:
    case "ACTIVITY_COMPREHEND_DOCUMENT":
      return Activity.COMPREHEND_DOCUMENT;
    case 18:
    case "ACTIVITY_EXTRACT_ENTITY":
      return Activity.EXTRACT_ENTITY;
    case 5:
    case "ACTIVITY_SAVE_FILE":
      return Activity.SAVE_FILE;
    case 15:
    case "ACTIVITY_NEW_FILE_ADDED":
      return Activity.NEW_FILE_ADDED;
    case 6:
    case "ACTIVITY_UPDATE_SHEET_CELL":
      return Activity.UPDATE_SHEET_CELL;
    case 8:
    case "ACTIVITY_OPEN_SHEET":
      return Activity.OPEN_SHEET;
    case 9:
    case "ACTIVITY_CREATE_SHEET_TAB":
      return Activity.CREATE_SHEET_TAB;
    case 14:
    case "ACTIVITY_PASTE_VALUE_INTO_SHEET_CELL":
      return Activity.PASTE_VALUE_INTO_SHEET_CELL;
    case 10:
    case "END":
      return Activity.END;
    case 11:
    case "ACTIVITY_CREATE_INVOICE":
      return Activity.CREATE_INVOICE;
    case 12:
    case "ACTIVITY_ADD_SHEET_ROW":
      return Activity.ADD_SHEET_ROW;
    case 16:
    case "ACTIVITY_MANUAL_TRIGGER":
      return Activity.MANUAL_TRIGGER;
    case 17:
    case "ACTIVITY_NEW_OBJECT_ADDED":
      return Activity.NEW_OBJECT_ADDED;
    case 19:
    case "ACTIVITY_SMART_ACTION":
      return Activity.SMART_ACTION;
    case 20:
    case "ACTIVITY_PROCEEDING_EXECUTION":
      return Activity.PROCEEDING_EXECUTION;
    case 21:
    case "ACTIVITY_DELETE_RAW_FILE":
      return Activity.DELETE_RAW_FILE;
    case 22:
    case "ACTIVITY_SMART_ACTION_EXTRACT_FIELDS":
      return Activity.SMART_ACTION_EXTRACT_FIELDS;
    case 23:
    case "ACTIVITY_SMART_ACTION_VALIDATE_FIELD_VALUES":
      return Activity.SMART_ACTION_VALIDATE_FIELD_VALUES;
    case 24:
    case "ACTIVITY_SMART_ACTION_FLAG_KEYWORDS":
      return Activity.SMART_ACTION_FLAG_KEYWORDS;
    case 25:
    case "ACTIVITY_SMART_ACTION_DETECT_DUPLICATE_LINE_ITEMS":
      return Activity.SMART_ACTION_DETECT_DUPLICATE_LINE_ITEMS;
    case 26:
    case "ACTIVITY_SMART_ACTION_RECONCILE_LINE_ITEMS":
      return Activity.SMART_ACTION_RECONCILE_LINE_ITEMS;
    case 27:
    case "ACTIVITY_SMART_ACTION_GENERATE_TEXT":
      return Activity.SMART_ACTION_GENERATE_TEXT;
    case 28:
    case "ACTIVITY_SMART_ACTION_CLASSIFY":
      return Activity.SMART_ACTION_CLASSIFY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Activity.UNRECOGNIZED;
  }
}

export function activityToJSON(object: Activity): string {
  switch (object) {
    case Activity.UNSPECIFIED:
      return "ACTIVITY_UNSPECIFIED";
    case Activity.NEW_EMAIL:
      return "ACTIVITY_NEW_EMAIL";
    case Activity.SEND_EMAIL:
      return "ACTIVITY_SEND_EMAIL";
    case Activity.READ_EMAIL:
      return "ACTIVITY_READ_EMAIL";
    case Activity.DOWNLOAD_ATTACHMENT:
      return "ACTIVITY_DOWNLOAD_ATTACHMENT";
    case Activity.CLASSIFY_DOCUMENT:
      return "ACTIVITY_CLASSIFY_DOCUMENT";
    case Activity.COMPREHEND_DOCUMENT:
      return "ACTIVITY_COMPREHEND_DOCUMENT";
    case Activity.EXTRACT_ENTITY:
      return "ACTIVITY_EXTRACT_ENTITY";
    case Activity.SAVE_FILE:
      return "ACTIVITY_SAVE_FILE";
    case Activity.NEW_FILE_ADDED:
      return "ACTIVITY_NEW_FILE_ADDED";
    case Activity.UPDATE_SHEET_CELL:
      return "ACTIVITY_UPDATE_SHEET_CELL";
    case Activity.OPEN_SHEET:
      return "ACTIVITY_OPEN_SHEET";
    case Activity.CREATE_SHEET_TAB:
      return "ACTIVITY_CREATE_SHEET_TAB";
    case Activity.PASTE_VALUE_INTO_SHEET_CELL:
      return "ACTIVITY_PASTE_VALUE_INTO_SHEET_CELL";
    case Activity.END:
      return "END";
    case Activity.CREATE_INVOICE:
      return "ACTIVITY_CREATE_INVOICE";
    case Activity.ADD_SHEET_ROW:
      return "ACTIVITY_ADD_SHEET_ROW";
    case Activity.MANUAL_TRIGGER:
      return "ACTIVITY_MANUAL_TRIGGER";
    case Activity.NEW_OBJECT_ADDED:
      return "ACTIVITY_NEW_OBJECT_ADDED";
    case Activity.SMART_ACTION:
      return "ACTIVITY_SMART_ACTION";
    case Activity.PROCEEDING_EXECUTION:
      return "ACTIVITY_PROCEEDING_EXECUTION";
    case Activity.DELETE_RAW_FILE:
      return "ACTIVITY_DELETE_RAW_FILE";
    case Activity.SMART_ACTION_EXTRACT_FIELDS:
      return "ACTIVITY_SMART_ACTION_EXTRACT_FIELDS";
    case Activity.SMART_ACTION_VALIDATE_FIELD_VALUES:
      return "ACTIVITY_SMART_ACTION_VALIDATE_FIELD_VALUES";
    case Activity.SMART_ACTION_FLAG_KEYWORDS:
      return "ACTIVITY_SMART_ACTION_FLAG_KEYWORDS";
    case Activity.SMART_ACTION_DETECT_DUPLICATE_LINE_ITEMS:
      return "ACTIVITY_SMART_ACTION_DETECT_DUPLICATE_LINE_ITEMS";
    case Activity.SMART_ACTION_RECONCILE_LINE_ITEMS:
      return "ACTIVITY_SMART_ACTION_RECONCILE_LINE_ITEMS";
    case Activity.SMART_ACTION_GENERATE_TEXT:
      return "ACTIVITY_SMART_ACTION_GENERATE_TEXT";
    case Activity.SMART_ACTION_CLASSIFY:
      return "ACTIVITY_SMART_ACTION_CLASSIFY";
    case Activity.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Event {
  $type?: "automation_mining.Event";
  id?: string | undefined;
  caseId?: string | undefined;
  happenedAt?: Date | undefined;
  activity?: Activity | undefined;
  contexts?: Any[] | undefined;
}

function createBaseEvent(): Event {
  return { $type: "automation_mining.Event", id: "", caseId: "", happenedAt: undefined, activity: 0, contexts: [] };
}

export const Event = {
  $type: "automation_mining.Event" as const,

  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.caseId !== undefined && message.caseId !== "") {
      writer.uint32(18).string(message.caseId);
    }
    if (message.happenedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.happenedAt), writer.uint32(26).fork()).ldelim();
    }
    if (message.activity !== undefined && message.activity !== 0) {
      writer.uint32(32).int32(message.activity);
    }
    if (message.contexts !== undefined && message.contexts.length !== 0) {
      for (const v of message.contexts) {
        Any.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
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

          message.caseId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.happenedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.activity = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.contexts!.push(Any.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      $type: Event.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      caseId: isSet(object.caseId) ? globalThis.String(object.caseId) : "",
      happenedAt: isSet(object.happenedAt) ? fromJsonTimestamp(object.happenedAt) : undefined,
      activity: isSet(object.activity) ? activityFromJSON(object.activity) : 0,
      contexts: globalThis.Array.isArray(object?.contexts) ? object.contexts.map((e: any) => Any.fromJSON(e)) : [],
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.caseId !== undefined && message.caseId !== "") {
      obj.caseId = message.caseId;
    }
    if (message.happenedAt !== undefined) {
      obj.happenedAt = message.happenedAt.toISOString();
    }
    if (message.activity !== undefined && message.activity !== 0) {
      obj.activity = activityToJSON(message.activity);
    }
    if (message.contexts?.length) {
      obj.contexts = message.contexts.map((e) => Any.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Event>, I>>(base?: I): Event {
    return Event.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.id = object.id ?? "";
    message.caseId = object.caseId ?? "";
    message.happenedAt = object.happenedAt ?? undefined;
    message.activity = object.activity ?? 0;
    message.contexts = object.contexts?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(Event.$type, Event);

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
