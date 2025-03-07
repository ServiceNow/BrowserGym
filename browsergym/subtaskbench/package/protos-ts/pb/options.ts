/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "pb";

/** Value types for ActionParamValue */
export enum ValueType {
  PARAM_TYPE_UNSPECIFIED = 0,
  /** ELEMENT_LOCATOR - refers to values that can be parsed into pb.v1alpha1.ElementLocator */
  ELEMENT_LOCATOR = 1,
  /** ELEMENT - refers to an element from a getElement action */
  ELEMENT = 2,
  /** DOCUMENT - refers to document object from a prior getDocument action */
  DOCUMENT = 3,
  STRING = 4,
  /** FIELD_UPDATE - refers to values that can be parsed into pb.v1alpha1.FIELD_UPDATE */
  FIELD_UPDATE = 5,
  UNRECOGNIZED = -1,
}

export function valueTypeFromJSON(object: any): ValueType {
  switch (object) {
    case 0:
    case "PARAM_TYPE_UNSPECIFIED":
      return ValueType.PARAM_TYPE_UNSPECIFIED;
    case 1:
    case "ELEMENT_LOCATOR":
      return ValueType.ELEMENT_LOCATOR;
    case 2:
    case "ELEMENT":
      return ValueType.ELEMENT;
    case 3:
    case "DOCUMENT":
      return ValueType.DOCUMENT;
    case 4:
    case "STRING":
      return ValueType.STRING;
    case 5:
    case "FIELD_UPDATE":
      return ValueType.FIELD_UPDATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ValueType.UNRECOGNIZED;
  }
}

export function valueTypeToJSON(object: ValueType): string {
  switch (object) {
    case ValueType.PARAM_TYPE_UNSPECIFIED:
      return "PARAM_TYPE_UNSPECIFIED";
    case ValueType.ELEMENT_LOCATOR:
      return "ELEMENT_LOCATOR";
    case ValueType.ELEMENT:
      return "ELEMENT";
    case ValueType.DOCUMENT:
      return "DOCUMENT";
    case ValueType.STRING:
      return "STRING";
    case ValueType.FIELD_UPDATE:
      return "FIELD_UPDATE";
    case ValueType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface FieldOptions {
  $type?: "pb.FieldOptions";
  /**
   * Used to annotate expected value types for ActionParamValue fields.
   * An action can accept values of one or more types.
   */
  paramType?: ValueType[] | undefined;
}

function createBaseFieldOptions(): FieldOptions {
  return { $type: "pb.FieldOptions", paramType: [] };
}

export const FieldOptions = {
  $type: "pb.FieldOptions" as const,

  encode(message: FieldOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.paramType !== undefined && message.paramType.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.paramType) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.paramType!.push(reader.int32() as any);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.paramType!.push(reader.int32() as any);
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

  fromJSON(object: any): FieldOptions {
    return {
      $type: FieldOptions.$type,
      paramType: globalThis.Array.isArray(object?.paramType)
        ? object.paramType.map((e: any) => valueTypeFromJSON(e))
        : [],
    };
  },

  toJSON(message: FieldOptions): unknown {
    const obj: any = {};
    if (message.paramType?.length) {
      obj.paramType = message.paramType.map((e) => valueTypeToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldOptions>, I>>(base?: I): FieldOptions {
    return FieldOptions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldOptions>, I>>(object: I): FieldOptions {
    const message = createBaseFieldOptions();
    message.paramType = object.paramType?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(FieldOptions.$type, FieldOptions);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };
