/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "google.type";

/**
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following:
 *
 * * A full date, with non-zero year, month, and day values
 * * A month and day value, with a zero year, such as an anniversary
 * * A year on its own, with zero month and day values
 * * A year and month value, with a zero day, such as a credit card expiration
 * date
 *
 * Related types are [google.type.TimeOfDay][google.type.TimeOfDay] and
 * `google.protobuf.Timestamp`.
 */
export interface DateMessage {
  $type?: "google.type.Date";
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without
   * a year.
   */
  year?:
    | number
    | undefined;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  month?:
    | number
    | undefined;
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or 0
   * to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  day?: number | undefined;
}

function createBaseDateMessage(): DateMessage {
  return { $type: "google.type.Date", year: 0, month: 0, day: 0 };
}

export const DateMessage = {
  $type: "google.type.Date" as const,

  encode(message: DateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.year !== undefined && message.year !== 0) {
      writer.uint32(8).int32(message.year);
    }
    if (message.month !== undefined && message.month !== 0) {
      writer.uint32(16).int32(message.month);
    }
    if (message.day !== undefined && message.day !== 0) {
      writer.uint32(24).int32(message.day);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DateMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateMessage();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DateMessage {
    return {
      $type: DateMessage.$type,
      year: isSet(object.year) ? globalThis.Number(object.year) : 0,
      month: isSet(object.month) ? globalThis.Number(object.month) : 0,
      day: isSet(object.day) ? globalThis.Number(object.day) : 0,
    };
  },

  toJSON(message: DateMessage): unknown {
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
    return obj;
  },

  create<I extends Exact<DeepPartial<DateMessage>, I>>(base?: I): DateMessage {
    return DateMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DateMessage>, I>>(object: I): DateMessage {
    const message = createBaseDateMessage();
    message.year = object.year ?? 0;
    message.month = object.month ?? 0;
    message.day = object.day ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DateMessage.$type, DateMessage);

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
