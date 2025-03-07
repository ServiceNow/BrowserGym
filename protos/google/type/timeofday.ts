/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "google.type";

/**
 * Represents a time of day. The date and time zone are either not significant
 * or are specified elsewhere. An API may choose to allow leap seconds. Related
 * types are [google.type.Date][google.type.Date] and
 * `google.protobuf.Timestamp`.
 */
export interface TimeOfDay {
  $type?: "google.type.TimeOfDay";
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose
   * to allow the value "24:00:00" for scenarios like business closing time.
   */
  hours?:
    | number
    | undefined;
  /** Minutes of hour of day. Must be from 0 to 59. */
  minutes?:
    | number
    | undefined;
  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may
   * allow the value 60 if it allows leap-seconds.
   */
  seconds?:
    | number
    | undefined;
  /** Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999. */
  nanos?: number | undefined;
}

function createBaseTimeOfDay(): TimeOfDay {
  return { $type: "google.type.TimeOfDay", hours: 0, minutes: 0, seconds: 0, nanos: 0 };
}

export const TimeOfDay = {
  $type: "google.type.TimeOfDay" as const,

  encode(message: TimeOfDay, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hours !== undefined && message.hours !== 0) {
      writer.uint32(8).int32(message.hours);
    }
    if (message.minutes !== undefined && message.minutes !== 0) {
      writer.uint32(16).int32(message.minutes);
    }
    if (message.seconds !== undefined && message.seconds !== 0) {
      writer.uint32(24).int32(message.seconds);
    }
    if (message.nanos !== undefined && message.nanos !== 0) {
      writer.uint32(32).int32(message.nanos);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimeOfDay {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimeOfDay();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.hours = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.minutes = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.seconds = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.nanos = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TimeOfDay {
    return {
      $type: TimeOfDay.$type,
      hours: isSet(object.hours) ? globalThis.Number(object.hours) : 0,
      minutes: isSet(object.minutes) ? globalThis.Number(object.minutes) : 0,
      seconds: isSet(object.seconds) ? globalThis.Number(object.seconds) : 0,
      nanos: isSet(object.nanos) ? globalThis.Number(object.nanos) : 0,
    };
  },

  toJSON(message: TimeOfDay): unknown {
    const obj: any = {};
    if (message.hours !== undefined && message.hours !== 0) {
      obj.hours = Math.round(message.hours);
    }
    if (message.minutes !== undefined && message.minutes !== 0) {
      obj.minutes = Math.round(message.minutes);
    }
    if (message.seconds !== undefined && message.seconds !== 0) {
      obj.seconds = Math.round(message.seconds);
    }
    if (message.nanos !== undefined && message.nanos !== 0) {
      obj.nanos = Math.round(message.nanos);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TimeOfDay>, I>>(base?: I): TimeOfDay {
    return TimeOfDay.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TimeOfDay>, I>>(object: I): TimeOfDay {
    const message = createBaseTimeOfDay();
    message.hours = object.hours ?? 0;
    message.minutes = object.minutes ?? 0;
    message.seconds = object.seconds ?? 0;
    message.nanos = object.nanos ?? 0;
    return message;
  },
};

messageTypeRegistry.set(TimeOfDay.$type, TimeOfDay);

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
