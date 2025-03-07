/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";
import { Duration } from "../protobuf/duration";

export const protobufPackage = "google.type";

/**
 * Represents civil time (or occasionally physical time).
 *
 * This type can represent a civil time in one of a few possible ways:
 *
 *  * When utc_offset is set and time_zone is unset: a civil time on a calendar
 *    day with a particular offset from UTC.
 *  * When time_zone is set and utc_offset is unset: a civil time on a calendar
 *    day in a particular time zone.
 *  * When neither time_zone nor utc_offset is set: a civil time on a calendar
 *    day in local time.
 *
 * The date is relative to the Proleptic Gregorian Calendar.
 *
 * If year is 0, the DateTime is considered not to have a specific year. month
 * and day must have valid, non-zero values.
 *
 * This type may also be used to represent a physical time if all the date and
 * time fields are set and either case of the `time_offset` oneof is set.
 * Consider using `Timestamp` message for physical time instead. If your use
 * case also would like to store the user's timezone, that can be done in
 * another field.
 *
 * This type is more flexible than some applications may want. Make sure to
 * document and validate your application's limitations.
 */
export interface DateTime {
  $type?: "google.type.DateTime";
  /**
   * Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a
   * datetime without a year.
   */
  year?:
    | number
    | undefined;
  /** Required. Month of year. Must be from 1 to 12. */
  month?:
    | number
    | undefined;
  /**
   * Required. Day of month. Must be from 1 to 31 and valid for the year and
   * month.
   */
  day?:
    | number
    | undefined;
  /**
   * Required. Hours of day in 24 hour format. Should be from 0 to 23. An API
   * may choose to allow the value "24:00:00" for scenarios like business
   * closing time.
   */
  hours?:
    | number
    | undefined;
  /** Required. Minutes of hour of day. Must be from 0 to 59. */
  minutes?:
    | number
    | undefined;
  /**
   * Required. Seconds of minutes of the time. Must normally be from 0 to 59. An
   * API may allow the value 60 if it allows leap-seconds.
   */
  seconds?:
    | number
    | undefined;
  /**
   * Required. Fractions of seconds in nanoseconds. Must be from 0 to
   * 999,999,999.
   */
  nanos?:
    | number
    | undefined;
  /**
   * UTC offset. Must be whole seconds, between -18 hours and +18 hours.
   * For example, a UTC offset of -4:00 would be represented as
   * { seconds: -14400 }.
   */
  utcOffset?:
    | Duration
    | undefined;
  /** Time zone. */
  timeZone?: TimeZone | undefined;
}

/**
 * Represents a time zone from the
 * [IANA Time Zone Database](https://www.iana.org/time-zones).
 */
export interface TimeZone {
  $type?: "google.type.TimeZone";
  /** IANA Time Zone Database time zone, e.g. "America/New_York". */
  id?:
    | string
    | undefined;
  /** Optional. IANA Time Zone Database version number, e.g. "2019a". */
  version?: string | undefined;
}

function createBaseDateTime(): DateTime {
  return {
    $type: "google.type.DateTime",
    year: 0,
    month: 0,
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    nanos: 0,
    utcOffset: undefined,
    timeZone: undefined,
  };
}

export const DateTime = {
  $type: "google.type.DateTime" as const,

  encode(message: DateTime, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.year !== undefined && message.year !== 0) {
      writer.uint32(8).int32(message.year);
    }
    if (message.month !== undefined && message.month !== 0) {
      writer.uint32(16).int32(message.month);
    }
    if (message.day !== undefined && message.day !== 0) {
      writer.uint32(24).int32(message.day);
    }
    if (message.hours !== undefined && message.hours !== 0) {
      writer.uint32(32).int32(message.hours);
    }
    if (message.minutes !== undefined && message.minutes !== 0) {
      writer.uint32(40).int32(message.minutes);
    }
    if (message.seconds !== undefined && message.seconds !== 0) {
      writer.uint32(48).int32(message.seconds);
    }
    if (message.nanos !== undefined && message.nanos !== 0) {
      writer.uint32(56).int32(message.nanos);
    }
    if (message.utcOffset !== undefined) {
      Duration.encode(message.utcOffset, writer.uint32(66).fork()).ldelim();
    }
    if (message.timeZone !== undefined) {
      TimeZone.encode(message.timeZone, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DateTime {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateTime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.year = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.month = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.day = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.hours = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.minutes = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.seconds = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.nanos = reader.int32();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.utcOffset = Duration.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.timeZone = TimeZone.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DateTime {
    return {
      $type: DateTime.$type,
      year: isSet(object.year) ? globalThis.Number(object.year) : 0,
      month: isSet(object.month) ? globalThis.Number(object.month) : 0,
      day: isSet(object.day) ? globalThis.Number(object.day) : 0,
      hours: isSet(object.hours) ? globalThis.Number(object.hours) : 0,
      minutes: isSet(object.minutes) ? globalThis.Number(object.minutes) : 0,
      seconds: isSet(object.seconds) ? globalThis.Number(object.seconds) : 0,
      nanos: isSet(object.nanos) ? globalThis.Number(object.nanos) : 0,
      utcOffset: isSet(object.utcOffset) ? Duration.fromJSON(object.utcOffset) : undefined,
      timeZone: isSet(object.timeZone) ? TimeZone.fromJSON(object.timeZone) : undefined,
    };
  },

  toJSON(message: DateTime): unknown {
    const obj: any = {};
    if (message.year !== undefined && message.year !== 0) {
      obj.year = Math.round(message.year);
    }
    if (message.month !== undefined && message.month !== 0) {
      obj.month = Math.round(message.month);
    }
    if (message.day !== undefined && message.day !== 0) {
      obj.day = Math.round(message.day);
    }
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
    if (message.utcOffset !== undefined) {
      obj.utcOffset = Duration.toJSON(message.utcOffset);
    }
    if (message.timeZone !== undefined) {
      obj.timeZone = TimeZone.toJSON(message.timeZone);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DateTime>, I>>(base?: I): DateTime {
    return DateTime.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DateTime>, I>>(object: I): DateTime {
    const message = createBaseDateTime();
    message.year = object.year ?? 0;
    message.month = object.month ?? 0;
    message.day = object.day ?? 0;
    message.hours = object.hours ?? 0;
    message.minutes = object.minutes ?? 0;
    message.seconds = object.seconds ?? 0;
    message.nanos = object.nanos ?? 0;
    message.utcOffset = (object.utcOffset !== undefined && object.utcOffset !== null)
      ? Duration.fromPartial(object.utcOffset)
      : undefined;
    message.timeZone = (object.timeZone !== undefined && object.timeZone !== null)
      ? TimeZone.fromPartial(object.timeZone)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DateTime.$type, DateTime);

function createBaseTimeZone(): TimeZone {
  return { $type: "google.type.TimeZone", id: "", version: "" };
}

export const TimeZone = {
  $type: "google.type.TimeZone" as const,

  encode(message: TimeZone, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.version !== undefined && message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimeZone {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimeZone();
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

          message.version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TimeZone {
    return {
      $type: TimeZone.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      version: isSet(object.version) ? globalThis.String(object.version) : "",
    };
  },

  toJSON(message: TimeZone): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.version !== undefined && message.version !== "") {
      obj.version = message.version;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TimeZone>, I>>(base?: I): TimeZone {
    return TimeZone.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TimeZone>, I>>(object: I): TimeZone {
    const message = createBaseTimeZone();
    message.id = object.id ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

messageTypeRegistry.set(TimeZone.$type, TimeZone);

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
