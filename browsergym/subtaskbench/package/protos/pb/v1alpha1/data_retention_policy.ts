/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export interface DataRetentionPolicy {
  $type?: "pb.v1alpha1.DataRetentionPolicy";
  enabled?:
    | boolean
    | undefined;
  /**
   * how many days we keep PII data of executions in our system.
   * after this period, PII data of executions which are in a final state
   * (completed/rejected/failed) will be deleted and won't be restorable.
   * special value 0 means keep data forever.
   */
  retentionDays?: number | undefined;
}

function createBaseDataRetentionPolicy(): DataRetentionPolicy {
  return { $type: "pb.v1alpha1.DataRetentionPolicy", enabled: false, retentionDays: 0 };
}

export const DataRetentionPolicy = {
  $type: "pb.v1alpha1.DataRetentionPolicy" as const,

  encode(message: DataRetentionPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.enabled !== undefined && message.enabled !== false) {
      writer.uint32(8).bool(message.enabled);
    }
    if (message.retentionDays !== undefined && message.retentionDays !== 0) {
      writer.uint32(16).int32(message.retentionDays);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataRetentionPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataRetentionPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.enabled = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.retentionDays = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DataRetentionPolicy {
    return {
      $type: DataRetentionPolicy.$type,
      enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false,
      retentionDays: isSet(object.retentionDays) ? globalThis.Number(object.retentionDays) : 0,
    };
  },

  toJSON(message: DataRetentionPolicy): unknown {
    const obj: any = {};
    if (message.enabled !== undefined && message.enabled !== false) {
      obj.enabled = message.enabled;
    }
    if (message.retentionDays !== undefined && message.retentionDays !== 0) {
      obj.retentionDays = Math.round(message.retentionDays);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DataRetentionPolicy>, I>>(base?: I): DataRetentionPolicy {
    return DataRetentionPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DataRetentionPolicy>, I>>(object: I): DataRetentionPolicy {
    const message = createBaseDataRetentionPolicy();
    message.enabled = object.enabled ?? false;
    message.retentionDays = object.retentionDays ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DataRetentionPolicy.$type, DataRetentionPolicy);

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
