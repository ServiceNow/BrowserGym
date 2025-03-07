/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

/** Stores common info or settings for generated suggestions. */
export interface Schema {
  $type?: "pb.v1alpha1.Schema";
  /**
   * Resource name for schema, in the format of users\/\* /schemas/\* for user
   * specific schema and schemas/\* for common schema
   */
  name?:
    | string
    | undefined;
  /**
   * Display name for the schema, basic information for users who intended to
   * use the schema
   */
  displayName?:
    | string
    | undefined;
  /** Entity types include all the elements to be extracted from the document */
  entityTypes?: EntityType[] | undefined;
}

export interface EntityType {
  $type?: "pb.v1alpha1.EntityType";
  /** name for entity type, preferred lower snake_case */
  displayName?: string | undefined;
  type?:
    | EntityTypeType
    | undefined;
  /** Nested entity types */
  children?: EntityType[] | undefined;
}

/**
 * The type of the entity, this one can be defined freely by user, either
 * address, integer, or bill, also we could prefill some common types for them
 * in the frontend
 */
export enum EntityTypeType {
  UNSPECIFIED = 0,
  ADDRESS = 1,
  NUMBER = 2,
  NAME = 3,
  PHONE = 4,
  MONEY = 5,
  UNRECOGNIZED = -1,
}

export function entityTypeTypeFromJSON(object: any): EntityTypeType {
  switch (object) {
    case 0:
    case "UNSPECIFIED":
      return EntityTypeType.UNSPECIFIED;
    case 1:
    case "ADDRESS":
      return EntityTypeType.ADDRESS;
    case 2:
    case "NUMBER":
      return EntityTypeType.NUMBER;
    case 3:
    case "NAME":
      return EntityTypeType.NAME;
    case 4:
    case "PHONE":
      return EntityTypeType.PHONE;
    case 5:
    case "MONEY":
      return EntityTypeType.MONEY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EntityTypeType.UNRECOGNIZED;
  }
}

export function entityTypeTypeToJSON(object: EntityTypeType): string {
  switch (object) {
    case EntityTypeType.UNSPECIFIED:
      return "UNSPECIFIED";
    case EntityTypeType.ADDRESS:
      return "ADDRESS";
    case EntityTypeType.NUMBER:
      return "NUMBER";
    case EntityTypeType.NAME:
      return "NAME";
    case EntityTypeType.PHONE:
      return "PHONE";
    case EntityTypeType.MONEY:
      return "MONEY";
    case EntityTypeType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseSchema(): Schema {
  return { $type: "pb.v1alpha1.Schema", name: "", displayName: "", entityTypes: [] };
}

export const Schema = {
  $type: "pb.v1alpha1.Schema" as const,

  encode(message: Schema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.entityTypes !== undefined && message.entityTypes.length !== 0) {
      for (const v of message.entityTypes) {
        EntityType.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Schema {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.entityTypes!.push(EntityType.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Schema {
    return {
      $type: Schema.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      entityTypes: globalThis.Array.isArray(object?.entityTypes)
        ? object.entityTypes.map((e: any) => EntityType.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Schema): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.entityTypes?.length) {
      obj.entityTypes = message.entityTypes.map((e) => EntityType.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Schema>, I>>(base?: I): Schema {
    return Schema.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Schema>, I>>(object: I): Schema {
    const message = createBaseSchema();
    message.name = object.name ?? "";
    message.displayName = object.displayName ?? "";
    message.entityTypes = object.entityTypes?.map((e) => EntityType.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(Schema.$type, Schema);

function createBaseEntityType(): EntityType {
  return { $type: "pb.v1alpha1.EntityType", displayName: "", type: 0, children: [] };
}

export const EntityType = {
  $type: "pb.v1alpha1.EntityType" as const,

  encode(message: EntityType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.children !== undefined && message.children.length !== 0) {
      for (const v of message.children) {
        EntityType.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EntityType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntityType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.children!.push(EntityType.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EntityType {
    return {
      $type: EntityType.$type,
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      type: isSet(object.type) ? entityTypeTypeFromJSON(object.type) : 0,
      children: globalThis.Array.isArray(object?.children)
        ? object.children.map((e: any) => EntityType.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EntityType): unknown {
    const obj: any = {};
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = entityTypeTypeToJSON(message.type);
    }
    if (message.children?.length) {
      obj.children = message.children.map((e) => EntityType.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EntityType>, I>>(base?: I): EntityType {
    return EntityType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EntityType>, I>>(object: I): EntityType {
    const message = createBaseEntityType();
    message.displayName = object.displayName ?? "";
    message.type = object.type ?? 0;
    message.children = object.children?.map((e) => EntityType.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(EntityType.$type, EntityType);

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
