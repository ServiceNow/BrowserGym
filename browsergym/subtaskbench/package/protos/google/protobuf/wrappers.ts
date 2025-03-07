/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "google.protobuf";

/**
 * Wrapper message for `double`.
 *
 * The JSON representation for `DoubleValue` is JSON number.
 */
export interface DoubleValue {
  $type?: "google.protobuf.DoubleValue";
  /** The double value. */
  value?: number | undefined;
}

/**
 * Wrapper message for `float`.
 *
 * The JSON representation for `FloatValue` is JSON number.
 */
export interface FloatValue {
  $type?: "google.protobuf.FloatValue";
  /** The float value. */
  value?: number | undefined;
}

/**
 * Wrapper message for `int64`.
 *
 * The JSON representation for `Int64Value` is JSON string.
 */
export interface Int64Value {
  $type?: "google.protobuf.Int64Value";
  /** The int64 value. */
  value?: number | undefined;
}

/**
 * Wrapper message for `uint64`.
 *
 * The JSON representation for `UInt64Value` is JSON string.
 */
export interface UInt64Value {
  $type?: "google.protobuf.UInt64Value";
  /** The uint64 value. */
  value?: number | undefined;
}

/**
 * Wrapper message for `int32`.
 *
 * The JSON representation for `Int32Value` is JSON number.
 */
export interface Int32Value {
  $type?: "google.protobuf.Int32Value";
  /** The int32 value. */
  value?: number | undefined;
}

/**
 * Wrapper message for `uint32`.
 *
 * The JSON representation for `UInt32Value` is JSON number.
 */
export interface UInt32Value {
  $type?: "google.protobuf.UInt32Value";
  /** The uint32 value. */
  value?: number | undefined;
}

/**
 * Wrapper message for `bool`.
 *
 * The JSON representation for `BoolValue` is JSON `true` and `false`.
 */
export interface BoolValue {
  $type?: "google.protobuf.BoolValue";
  /** The bool value. */
  value?: boolean | undefined;
}

/**
 * Wrapper message for `string`.
 *
 * The JSON representation for `StringValue` is JSON string.
 */
export interface StringValue {
  $type?: "google.protobuf.StringValue";
  /** The string value. */
  value?: string | undefined;
}

/**
 * Wrapper message for `bytes`.
 *
 * The JSON representation for `BytesValue` is JSON string.
 */
export interface BytesValue {
  $type?: "google.protobuf.BytesValue";
  /** The bytes value. */
  value?: Uint8Array | undefined;
}

function createBaseDoubleValue(): DoubleValue {
  return { $type: "google.protobuf.DoubleValue", value: 0 };
}

export const DoubleValue = {
  $type: "google.protobuf.DoubleValue" as const,

  encode(message: DoubleValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined && message.value !== 0) {
      writer.uint32(9).double(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DoubleValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDoubleValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.value = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DoubleValue {
    return { $type: DoubleValue.$type, value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: DoubleValue): unknown {
    const obj: any = {};
    if (message.value !== undefined && message.value !== 0) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DoubleValue>, I>>(base?: I): DoubleValue {
    return DoubleValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DoubleValue>, I>>(object: I): DoubleValue {
    const message = createBaseDoubleValue();
    message.value = object.value ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DoubleValue.$type, DoubleValue);

function createBaseFloatValue(): FloatValue {
  return { $type: "google.protobuf.FloatValue", value: 0 };
}

export const FloatValue = {
  $type: "google.protobuf.FloatValue" as const,

  encode(message: FloatValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined && message.value !== 0) {
      writer.uint32(13).float(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FloatValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFloatValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.value = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FloatValue {
    return { $type: FloatValue.$type, value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: FloatValue): unknown {
    const obj: any = {};
    if (message.value !== undefined && message.value !== 0) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FloatValue>, I>>(base?: I): FloatValue {
    return FloatValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FloatValue>, I>>(object: I): FloatValue {
    const message = createBaseFloatValue();
    message.value = object.value ?? 0;
    return message;
  },
};

messageTypeRegistry.set(FloatValue.$type, FloatValue);

function createBaseInt64Value(): Int64Value {
  return { $type: "google.protobuf.Int64Value", value: 0 };
}

export const Int64Value = {
  $type: "google.protobuf.Int64Value" as const,

  encode(message: Int64Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined && message.value !== 0) {
      writer.uint32(8).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Int64Value {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInt64Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Int64Value {
    return { $type: Int64Value.$type, value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: Int64Value): unknown {
    const obj: any = {};
    if (message.value !== undefined && message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Int64Value>, I>>(base?: I): Int64Value {
    return Int64Value.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Int64Value>, I>>(object: I): Int64Value {
    const message = createBaseInt64Value();
    message.value = object.value ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Int64Value.$type, Int64Value);

function createBaseUInt64Value(): UInt64Value {
  return { $type: "google.protobuf.UInt64Value", value: 0 };
}

export const UInt64Value = {
  $type: "google.protobuf.UInt64Value" as const,

  encode(message: UInt64Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined && message.value !== 0) {
      writer.uint32(8).uint64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UInt64Value {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUInt64Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UInt64Value {
    return { $type: UInt64Value.$type, value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: UInt64Value): unknown {
    const obj: any = {};
    if (message.value !== undefined && message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UInt64Value>, I>>(base?: I): UInt64Value {
    return UInt64Value.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UInt64Value>, I>>(object: I): UInt64Value {
    const message = createBaseUInt64Value();
    message.value = object.value ?? 0;
    return message;
  },
};

messageTypeRegistry.set(UInt64Value.$type, UInt64Value);

function createBaseInt32Value(): Int32Value {
  return { $type: "google.protobuf.Int32Value", value: 0 };
}

export const Int32Value = {
  $type: "google.protobuf.Int32Value" as const,

  encode(message: Int32Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined && message.value !== 0) {
      writer.uint32(8).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Int32Value {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInt32Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Int32Value {
    return { $type: Int32Value.$type, value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: Int32Value): unknown {
    const obj: any = {};
    if (message.value !== undefined && message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Int32Value>, I>>(base?: I): Int32Value {
    return Int32Value.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Int32Value>, I>>(object: I): Int32Value {
    const message = createBaseInt32Value();
    message.value = object.value ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Int32Value.$type, Int32Value);

function createBaseUInt32Value(): UInt32Value {
  return { $type: "google.protobuf.UInt32Value", value: 0 };
}

export const UInt32Value = {
  $type: "google.protobuf.UInt32Value" as const,

  encode(message: UInt32Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined && message.value !== 0) {
      writer.uint32(8).uint32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UInt32Value {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUInt32Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UInt32Value {
    return { $type: UInt32Value.$type, value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: UInt32Value): unknown {
    const obj: any = {};
    if (message.value !== undefined && message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UInt32Value>, I>>(base?: I): UInt32Value {
    return UInt32Value.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UInt32Value>, I>>(object: I): UInt32Value {
    const message = createBaseUInt32Value();
    message.value = object.value ?? 0;
    return message;
  },
};

messageTypeRegistry.set(UInt32Value.$type, UInt32Value);

function createBaseBoolValue(): BoolValue {
  return { $type: "google.protobuf.BoolValue", value: false };
}

export const BoolValue = {
  $type: "google.protobuf.BoolValue" as const,

  encode(message: BoolValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined && message.value !== false) {
      writer.uint32(8).bool(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BoolValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBoolValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BoolValue {
    return { $type: BoolValue.$type, value: isSet(object.value) ? globalThis.Boolean(object.value) : false };
  },

  toJSON(message: BoolValue): unknown {
    const obj: any = {};
    if (message.value !== undefined && message.value !== false) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BoolValue>, I>>(base?: I): BoolValue {
    return BoolValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BoolValue>, I>>(object: I): BoolValue {
    const message = createBaseBoolValue();
    message.value = object.value ?? false;
    return message;
  },
};

messageTypeRegistry.set(BoolValue.$type, BoolValue);

function createBaseStringValue(): StringValue {
  return { $type: "google.protobuf.StringValue", value: "" };
}

export const StringValue = {
  $type: "google.protobuf.StringValue" as const,

  encode(message: StringValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined && message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StringValue {
    return { $type: StringValue.$type, value: isSet(object.value) ? globalThis.String(object.value) : "" };
  },

  toJSON(message: StringValue): unknown {
    const obj: any = {};
    if (message.value !== undefined && message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StringValue>, I>>(base?: I): StringValue {
    return StringValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StringValue>, I>>(object: I): StringValue {
    const message = createBaseStringValue();
    message.value = object.value ?? "";
    return message;
  },
};

messageTypeRegistry.set(StringValue.$type, StringValue);

function createBaseBytesValue(): BytesValue {
  return { $type: "google.protobuf.BytesValue", value: new Uint8Array(0) };
}

export const BytesValue = {
  $type: "google.protobuf.BytesValue" as const,

  encode(message: BytesValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined && message.value.length !== 0) {
      writer.uint32(10).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BytesValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBytesValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BytesValue {
    return { $type: BytesValue.$type, value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0) };
  },

  toJSON(message: BytesValue): unknown {
    const obj: any = {};
    if (message.value !== undefined && message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BytesValue>, I>>(base?: I): BytesValue {
    return BytesValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BytesValue>, I>>(object: I): BytesValue {
    const message = createBaseBytesValue();
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

messageTypeRegistry.set(BytesValue.$type, BytesValue);

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
