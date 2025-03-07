/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../../typeRegistry";

export const protobufPackage = "buf.validate.priv";

/** Do not use. Internal to protovalidate library */
export interface FieldConstraints {
  $type?: "buf.validate.priv.FieldConstraints";
  cel?: Constraint[] | undefined;
}

/** Do not use. Internal to protovalidate library */
export interface Constraint {
  $type?: "buf.validate.priv.Constraint";
  id?: string | undefined;
  message?: string | undefined;
  expression?: string | undefined;
}

function createBaseFieldConstraints(): FieldConstraints {
  return { $type: "buf.validate.priv.FieldConstraints", cel: [] };
}

export const FieldConstraints = {
  $type: "buf.validate.priv.FieldConstraints" as const,

  encode(message: FieldConstraints, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cel !== undefined && message.cel.length !== 0) {
      for (const v of message.cel) {
        Constraint.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldConstraints {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldConstraints();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cel!.push(Constraint.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FieldConstraints {
    return {
      $type: FieldConstraints.$type,
      cel: globalThis.Array.isArray(object?.cel) ? object.cel.map((e: any) => Constraint.fromJSON(e)) : [],
    };
  },

  toJSON(message: FieldConstraints): unknown {
    const obj: any = {};
    if (message.cel?.length) {
      obj.cel = message.cel.map((e) => Constraint.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldConstraints>, I>>(base?: I): FieldConstraints {
    return FieldConstraints.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldConstraints>, I>>(object: I): FieldConstraints {
    const message = createBaseFieldConstraints();
    message.cel = object.cel?.map((e) => Constraint.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(FieldConstraints.$type, FieldConstraints);

function createBaseConstraint(): Constraint {
  return { $type: "buf.validate.priv.Constraint", id: "", message: "", expression: "" };
}

export const Constraint = {
  $type: "buf.validate.priv.Constraint" as const,

  encode(message: Constraint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.expression !== undefined && message.expression !== "") {
      writer.uint32(26).string(message.expression);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Constraint {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConstraint();
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

          message.message = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.expression = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Constraint {
    return {
      $type: Constraint.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      expression: isSet(object.expression) ? globalThis.String(object.expression) : "",
    };
  },

  toJSON(message: Constraint): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    if (message.expression !== undefined && message.expression !== "") {
      obj.expression = message.expression;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Constraint>, I>>(base?: I): Constraint {
    return Constraint.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Constraint>, I>>(object: I): Constraint {
    const message = createBaseConstraint();
    message.id = object.id ?? "";
    message.message = object.message ?? "";
    message.expression = object.expression ?? "";
    return message;
  },
};

messageTypeRegistry.set(Constraint.$type, Constraint);

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
