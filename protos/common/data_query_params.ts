/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "common";

/** SortField represents a field to sort by and the direction of the sort. */
export interface SortField {
  $type?: "common.SortField";
  field?: string | undefined;
  descending?: boolean | undefined;
}

function createBaseSortField(): SortField {
  return { $type: "common.SortField", field: "", descending: false };
}

export const SortField = {
  $type: "common.SortField" as const,

  encode(message: SortField, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== undefined && message.field !== "") {
      writer.uint32(10).string(message.field);
    }
    if (message.descending !== undefined && message.descending !== false) {
      writer.uint32(16).bool(message.descending);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SortField {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSortField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.descending = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SortField {
    return {
      $type: SortField.$type,
      field: isSet(object.field) ? globalThis.String(object.field) : "",
      descending: isSet(object.descending) ? globalThis.Boolean(object.descending) : false,
    };
  },

  toJSON(message: SortField): unknown {
    const obj: any = {};
    if (message.field !== undefined && message.field !== "") {
      obj.field = message.field;
    }
    if (message.descending !== undefined && message.descending !== false) {
      obj.descending = message.descending;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SortField>, I>>(base?: I): SortField {
    return SortField.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SortField>, I>>(object: I): SortField {
    const message = createBaseSortField();
    message.field = object.field ?? "";
    message.descending = object.descending ?? false;
    return message;
  },
};

messageTypeRegistry.set(SortField.$type, SortField);

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
