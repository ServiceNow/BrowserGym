/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "google.type";

/** Represents an amount of money with its currency type. */
export interface Money {
  $type?: "google.type.Money";
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?:
    | string
    | undefined;
  /**
   * The whole units of the amount.
   * For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.
   */
  units?:
    | number
    | undefined;
  /**
   * Number of nano (10^-9) units of the amount.
   * The value must be between -999,999,999 and +999,999,999 inclusive.
   * If `units` is positive, `nanos` must be positive or zero.
   * If `units` is zero, `nanos` can be positive, zero, or negative.
   * If `units` is negative, `nanos` must be negative or zero.
   * For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.
   */
  nanos?: number | undefined;
}

function createBaseMoney(): Money {
  return { $type: "google.type.Money", currencyCode: "", units: 0, nanos: 0 };
}

export const Money = {
  $type: "google.type.Money" as const,

  encode(message: Money, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.currencyCode !== undefined && message.currencyCode !== "") {
      writer.uint32(10).string(message.currencyCode);
    }
    if (message.units !== undefined && message.units !== 0) {
      writer.uint32(16).int64(message.units);
    }
    if (message.nanos !== undefined && message.nanos !== 0) {
      writer.uint32(24).int32(message.nanos);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Money {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMoney();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.currencyCode = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.units = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
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

  fromJSON(object: any): Money {
    return {
      $type: Money.$type,
      currencyCode: isSet(object.currencyCode) ? globalThis.String(object.currencyCode) : "",
      units: isSet(object.units) ? globalThis.Number(object.units) : 0,
      nanos: isSet(object.nanos) ? globalThis.Number(object.nanos) : 0,
    };
  },

  toJSON(message: Money): unknown {
    const obj: any = {};
    if (message.currencyCode !== undefined && message.currencyCode !== "") {
      obj.currencyCode = message.currencyCode;
    }
    if (message.units !== undefined && message.units !== 0) {
      obj.units = Math.round(message.units);
    }
    if (message.nanos !== undefined && message.nanos !== 0) {
      obj.nanos = Math.round(message.nanos);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Money>, I>>(base?: I): Money {
    return Money.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Money>, I>>(object: I): Money {
    const message = createBaseMoney();
    message.currencyCode = object.currencyCode ?? "";
    message.units = object.units ?? 0;
    message.nanos = object.nanos ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Money.$type, Money);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
