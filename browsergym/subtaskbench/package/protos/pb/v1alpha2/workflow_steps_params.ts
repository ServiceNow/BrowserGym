/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha2";

export enum EntityDataType {
  /** ENTITY_TYPE_UNSPECIFIED - Enum listing the supported data types for entity normalization */
  ENTITY_TYPE_UNSPECIFIED = 0,
  ENTITY_TYPE_MONEY = 1,
  ENTITY_TYPE_DATE = 2,
  ENTITY_TYPE_INTEGER = 3,
  ENTITY_TYPE_FLOAT = 4,
  ENTITY_TYPE_TEXT = 5,
  ENTITY_TYPE_NESTED = 6,
  ENTITY_TYPE_ANNOTATION = 7,
  /** ENTITY_TYPE_CHOICE - CHOICE represents multiple options group for a single entity type */
  ENTITY_TYPE_CHOICE = 8,
  /** ENTITY_TYPE_CHOICE_OPTION - CHOICE_OPTION represents a single option for a CHOICE entity type */
  ENTITY_TYPE_CHOICE_OPTION = 9,
  UNRECOGNIZED = -1,
}

export function entityDataTypeFromJSON(object: any): EntityDataType {
  switch (object) {
    case 0:
    case "ENTITY_TYPE_UNSPECIFIED":
      return EntityDataType.ENTITY_TYPE_UNSPECIFIED;
    case 1:
    case "ENTITY_TYPE_MONEY":
      return EntityDataType.ENTITY_TYPE_MONEY;
    case 2:
    case "ENTITY_TYPE_DATE":
      return EntityDataType.ENTITY_TYPE_DATE;
    case 3:
    case "ENTITY_TYPE_INTEGER":
      return EntityDataType.ENTITY_TYPE_INTEGER;
    case 4:
    case "ENTITY_TYPE_FLOAT":
      return EntityDataType.ENTITY_TYPE_FLOAT;
    case 5:
    case "ENTITY_TYPE_TEXT":
      return EntityDataType.ENTITY_TYPE_TEXT;
    case 6:
    case "ENTITY_TYPE_NESTED":
      return EntityDataType.ENTITY_TYPE_NESTED;
    case 7:
    case "ENTITY_TYPE_ANNOTATION":
      return EntityDataType.ENTITY_TYPE_ANNOTATION;
    case 8:
    case "ENTITY_TYPE_CHOICE":
      return EntityDataType.ENTITY_TYPE_CHOICE;
    case 9:
    case "ENTITY_TYPE_CHOICE_OPTION":
      return EntityDataType.ENTITY_TYPE_CHOICE_OPTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EntityDataType.UNRECOGNIZED;
  }
}

export function entityDataTypeToJSON(object: EntityDataType): string {
  switch (object) {
    case EntityDataType.ENTITY_TYPE_UNSPECIFIED:
      return "ENTITY_TYPE_UNSPECIFIED";
    case EntityDataType.ENTITY_TYPE_MONEY:
      return "ENTITY_TYPE_MONEY";
    case EntityDataType.ENTITY_TYPE_DATE:
      return "ENTITY_TYPE_DATE";
    case EntityDataType.ENTITY_TYPE_INTEGER:
      return "ENTITY_TYPE_INTEGER";
    case EntityDataType.ENTITY_TYPE_FLOAT:
      return "ENTITY_TYPE_FLOAT";
    case EntityDataType.ENTITY_TYPE_TEXT:
      return "ENTITY_TYPE_TEXT";
    case EntityDataType.ENTITY_TYPE_NESTED:
      return "ENTITY_TYPE_NESTED";
    case EntityDataType.ENTITY_TYPE_ANNOTATION:
      return "ENTITY_TYPE_ANNOTATION";
    case EntityDataType.ENTITY_TYPE_CHOICE:
      return "ENTITY_TYPE_CHOICE";
    case EntityDataType.ENTITY_TYPE_CHOICE_OPTION:
      return "ENTITY_TYPE_CHOICE_OPTION";
    case EntityDataType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface DocClassificationParam {
  $type?: "pb.v1alpha2.DocClassificationParam";
  /** Set of labels which a document can be classified into */
  classificationLabels?: string[] | undefined;
}

export interface EntityExtractionParam {
  $type?: "pb.v1alpha2.EntityExtractionParam";
  /** Set the entities schema which needs to be extracted from the document */
  entities?:
    | string[]
    | undefined;
  /**
   * Value range [0, utils.FewShotExampleDocMaxSize]. When not at max
   * value, example docs used in predictions need to be filtered
   * againsted the mapping_columns field to handle schema changes,
   * e.g. removing deleted entity types and adding dummy values for
   * added ones.
   *
   * Whenever a task with the mapping_columns is completed, server
   * will increase this value by 1 if and only if it is not at its max
   * value.
   *
   * When a new workflow is created, server sets this value to the max
   * value since entity filtering is not needed.
   *
   * When mapping_columns has an entity type change (excluding order
   * change and changes to NotInDoc types), frontend please set this
   * value to 0.
   */
  exampleDocCount?:
    | number
    | undefined;
  /** A map from entity type (string) to its EntityTypeSchema */
  entityTypeSchemaMapping?:
    | { [key: string]: EntityTypeSchema }
    | undefined;
  /**
   * all the above fields are outdated, please use the following field only.
   * Note: [Bhavesh] plans to run a script to update all the existing workflows.
   */
  entitiesDetails?: EntityDetails[] | undefined;
}

export interface EntityExtractionParamEntityTypeSchemaMappingEntry {
  $type?: "pb.v1alpha2.EntityExtractionParam.EntityTypeSchemaMappingEntry";
  key: string;
  value?: EntityTypeSchema | undefined;
}

export interface EntityDetails {
  $type?: "pb.v1alpha2.EntityDetails";
  entityType?: string | undefined;
  normalizationType?: EntityDataType | undefined;
  properties?: EntityDetails[] | undefined;
}

export interface EntityTypeSchema {
  $type?: "pb.v1alpha2.EntityTypeSchema";
  /** The entity normalization type */
  normalizationType?: EntityDataType | undefined;
}

export interface GenerateOutputParam {
  $type?: "pb.v1alpha2.GenerateOutputParam";
  type?:
    | GenerateOutputParamActionType
    | undefined;
  /** stores the encryption required flag */
  encryptionRequired?:
    | boolean
    | undefined;
  /** Ex. this will be true for SFTP trigger based workflows */
  skipped?: boolean | undefined;
}

export enum GenerateOutputParamActionType {
  UNSPECIFIED = 0,
  ACTION_CREATE_JSON_FILE = 1,
  UNRECOGNIZED = -1,
}

export function generateOutputParamActionTypeFromJSON(object: any): GenerateOutputParamActionType {
  switch (object) {
    case 0:
    case "ACTION_TYPE_UNSPECIFIED":
      return GenerateOutputParamActionType.UNSPECIFIED;
    case 1:
    case "ACTION_CREATE_JSON_FILE":
      return GenerateOutputParamActionType.ACTION_CREATE_JSON_FILE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GenerateOutputParamActionType.UNRECOGNIZED;
  }
}

export function generateOutputParamActionTypeToJSON(object: GenerateOutputParamActionType): string {
  switch (object) {
    case GenerateOutputParamActionType.UNSPECIFIED:
      return "ACTION_TYPE_UNSPECIFIED";
    case GenerateOutputParamActionType.ACTION_CREATE_JSON_FILE:
      return "ACTION_CREATE_JSON_FILE";
    case GenerateOutputParamActionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseDocClassificationParam(): DocClassificationParam {
  return { $type: "pb.v1alpha2.DocClassificationParam", classificationLabels: [] };
}

export const DocClassificationParam = {
  $type: "pb.v1alpha2.DocClassificationParam" as const,

  encode(message: DocClassificationParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classificationLabels !== undefined && message.classificationLabels.length !== 0) {
      for (const v of message.classificationLabels) {
        writer.uint32(10).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocClassificationParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocClassificationParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classificationLabels!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocClassificationParam {
    return {
      $type: DocClassificationParam.$type,
      classificationLabels: globalThis.Array.isArray(object?.classificationLabels)
        ? object.classificationLabels.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: DocClassificationParam): unknown {
    const obj: any = {};
    if (message.classificationLabels?.length) {
      obj.classificationLabels = message.classificationLabels;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocClassificationParam>, I>>(base?: I): DocClassificationParam {
    return DocClassificationParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocClassificationParam>, I>>(object: I): DocClassificationParam {
    const message = createBaseDocClassificationParam();
    message.classificationLabels = object.classificationLabels?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(DocClassificationParam.$type, DocClassificationParam);

function createBaseEntityExtractionParam(): EntityExtractionParam {
  return {
    $type: "pb.v1alpha2.EntityExtractionParam",
    entities: [],
    exampleDocCount: 0,
    entityTypeSchemaMapping: {},
    entitiesDetails: [],
  };
}

export const EntityExtractionParam = {
  $type: "pb.v1alpha2.EntityExtractionParam" as const,

  encode(message: EntityExtractionParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.entities !== undefined && message.entities.length !== 0) {
      for (const v of message.entities) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.exampleDocCount !== undefined && message.exampleDocCount !== 0) {
      writer.uint32(16).int32(message.exampleDocCount);
    }
    Object.entries(message.entityTypeSchemaMapping || {}).forEach(([key, value]) => {
      EntityExtractionParamEntityTypeSchemaMappingEntry.encode({
        $type: "pb.v1alpha2.EntityExtractionParam.EntityTypeSchemaMappingEntry",
        key: key as any,
        value,
      }, writer.uint32(26).fork()).ldelim();
    });
    if (message.entitiesDetails !== undefined && message.entitiesDetails.length !== 0) {
      for (const v of message.entitiesDetails) {
        EntityDetails.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EntityExtractionParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntityExtractionParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entities!.push(reader.string());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.exampleDocCount = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = EntityExtractionParamEntityTypeSchemaMappingEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.entityTypeSchemaMapping![entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.entitiesDetails!.push(EntityDetails.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EntityExtractionParam {
    return {
      $type: EntityExtractionParam.$type,
      entities: globalThis.Array.isArray(object?.entities) ? object.entities.map((e: any) => globalThis.String(e)) : [],
      exampleDocCount: isSet(object.exampleDocCount) ? globalThis.Number(object.exampleDocCount) : 0,
      entityTypeSchemaMapping: isObject(object.entityTypeSchemaMapping)
        ? Object.entries(object.entityTypeSchemaMapping).reduce<{ [key: string]: EntityTypeSchema }>(
          (acc, [key, value]) => {
            acc[key] = EntityTypeSchema.fromJSON(value);
            return acc;
          },
          {},
        )
        : {},
      entitiesDetails: globalThis.Array.isArray(object?.entitiesDetails)
        ? object.entitiesDetails.map((e: any) => EntityDetails.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EntityExtractionParam): unknown {
    const obj: any = {};
    if (message.entities?.length) {
      obj.entities = message.entities;
    }
    if (message.exampleDocCount !== undefined && message.exampleDocCount !== 0) {
      obj.exampleDocCount = Math.round(message.exampleDocCount);
    }
    if (message.entityTypeSchemaMapping) {
      const entries = Object.entries(message.entityTypeSchemaMapping);
      if (entries.length > 0) {
        obj.entityTypeSchemaMapping = {};
        entries.forEach(([k, v]) => {
          obj.entityTypeSchemaMapping[k] = EntityTypeSchema.toJSON(v);
        });
      }
    }
    if (message.entitiesDetails?.length) {
      obj.entitiesDetails = message.entitiesDetails.map((e) => EntityDetails.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EntityExtractionParam>, I>>(base?: I): EntityExtractionParam {
    return EntityExtractionParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EntityExtractionParam>, I>>(object: I): EntityExtractionParam {
    const message = createBaseEntityExtractionParam();
    message.entities = object.entities?.map((e) => e) || [];
    message.exampleDocCount = object.exampleDocCount ?? 0;
    message.entityTypeSchemaMapping = Object.entries(object.entityTypeSchemaMapping ?? {}).reduce<
      { [key: string]: EntityTypeSchema }
    >((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = EntityTypeSchema.fromPartial(value);
      }
      return acc;
    }, {});
    message.entitiesDetails = object.entitiesDetails?.map((e) => EntityDetails.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(EntityExtractionParam.$type, EntityExtractionParam);

function createBaseEntityExtractionParamEntityTypeSchemaMappingEntry(): EntityExtractionParamEntityTypeSchemaMappingEntry {
  return { $type: "pb.v1alpha2.EntityExtractionParam.EntityTypeSchemaMappingEntry", key: "", value: undefined };
}

export const EntityExtractionParamEntityTypeSchemaMappingEntry = {
  $type: "pb.v1alpha2.EntityExtractionParam.EntityTypeSchemaMappingEntry" as const,

  encode(
    message: EntityExtractionParamEntityTypeSchemaMappingEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      EntityTypeSchema.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EntityExtractionParamEntityTypeSchemaMappingEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntityExtractionParamEntityTypeSchemaMappingEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = EntityTypeSchema.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EntityExtractionParamEntityTypeSchemaMappingEntry {
    return {
      $type: EntityExtractionParamEntityTypeSchemaMappingEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? EntityTypeSchema.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: EntityExtractionParamEntityTypeSchemaMappingEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = EntityTypeSchema.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EntityExtractionParamEntityTypeSchemaMappingEntry>, I>>(
    base?: I,
  ): EntityExtractionParamEntityTypeSchemaMappingEntry {
    return EntityExtractionParamEntityTypeSchemaMappingEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EntityExtractionParamEntityTypeSchemaMappingEntry>, I>>(
    object: I,
  ): EntityExtractionParamEntityTypeSchemaMappingEntry {
    const message = createBaseEntityExtractionParamEntityTypeSchemaMappingEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? EntityTypeSchema.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(
  EntityExtractionParamEntityTypeSchemaMappingEntry.$type,
  EntityExtractionParamEntityTypeSchemaMappingEntry,
);

function createBaseEntityDetails(): EntityDetails {
  return { $type: "pb.v1alpha2.EntityDetails", entityType: "", normalizationType: 0, properties: [] };
}

export const EntityDetails = {
  $type: "pb.v1alpha2.EntityDetails" as const,

  encode(message: EntityDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.entityType !== undefined && message.entityType !== "") {
      writer.uint32(10).string(message.entityType);
    }
    if (message.normalizationType !== undefined && message.normalizationType !== 0) {
      writer.uint32(16).int32(message.normalizationType);
    }
    if (message.properties !== undefined && message.properties.length !== 0) {
      for (const v of message.properties) {
        EntityDetails.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EntityDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntityDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entityType = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.normalizationType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.properties!.push(EntityDetails.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EntityDetails {
    return {
      $type: EntityDetails.$type,
      entityType: isSet(object.entityType) ? globalThis.String(object.entityType) : "",
      normalizationType: isSet(object.normalizationType) ? entityDataTypeFromJSON(object.normalizationType) : 0,
      properties: globalThis.Array.isArray(object?.properties)
        ? object.properties.map((e: any) => EntityDetails.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EntityDetails): unknown {
    const obj: any = {};
    if (message.entityType !== undefined && message.entityType !== "") {
      obj.entityType = message.entityType;
    }
    if (message.normalizationType !== undefined && message.normalizationType !== 0) {
      obj.normalizationType = entityDataTypeToJSON(message.normalizationType);
    }
    if (message.properties?.length) {
      obj.properties = message.properties.map((e) => EntityDetails.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EntityDetails>, I>>(base?: I): EntityDetails {
    return EntityDetails.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EntityDetails>, I>>(object: I): EntityDetails {
    const message = createBaseEntityDetails();
    message.entityType = object.entityType ?? "";
    message.normalizationType = object.normalizationType ?? 0;
    message.properties = object.properties?.map((e) => EntityDetails.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(EntityDetails.$type, EntityDetails);

function createBaseEntityTypeSchema(): EntityTypeSchema {
  return { $type: "pb.v1alpha2.EntityTypeSchema", normalizationType: 0 };
}

export const EntityTypeSchema = {
  $type: "pb.v1alpha2.EntityTypeSchema" as const,

  encode(message: EntityTypeSchema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.normalizationType !== undefined && message.normalizationType !== 0) {
      writer.uint32(8).int32(message.normalizationType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EntityTypeSchema {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntityTypeSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.normalizationType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EntityTypeSchema {
    return {
      $type: EntityTypeSchema.$type,
      normalizationType: isSet(object.normalizationType) ? entityDataTypeFromJSON(object.normalizationType) : 0,
    };
  },

  toJSON(message: EntityTypeSchema): unknown {
    const obj: any = {};
    if (message.normalizationType !== undefined && message.normalizationType !== 0) {
      obj.normalizationType = entityDataTypeToJSON(message.normalizationType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EntityTypeSchema>, I>>(base?: I): EntityTypeSchema {
    return EntityTypeSchema.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EntityTypeSchema>, I>>(object: I): EntityTypeSchema {
    const message = createBaseEntityTypeSchema();
    message.normalizationType = object.normalizationType ?? 0;
    return message;
  },
};

messageTypeRegistry.set(EntityTypeSchema.$type, EntityTypeSchema);

function createBaseGenerateOutputParam(): GenerateOutputParam {
  return { $type: "pb.v1alpha2.GenerateOutputParam", type: 0, encryptionRequired: false, skipped: false };
}

export const GenerateOutputParam = {
  $type: "pb.v1alpha2.GenerateOutputParam" as const,

  encode(message: GenerateOutputParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.encryptionRequired !== undefined && message.encryptionRequired !== false) {
      writer.uint32(16).bool(message.encryptionRequired);
    }
    if (message.skipped !== undefined && message.skipped !== false) {
      writer.uint32(24).bool(message.skipped);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateOutputParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateOutputParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.encryptionRequired = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.skipped = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateOutputParam {
    return {
      $type: GenerateOutputParam.$type,
      type: isSet(object.type) ? generateOutputParamActionTypeFromJSON(object.type) : 0,
      encryptionRequired: isSet(object.encryptionRequired) ? globalThis.Boolean(object.encryptionRequired) : false,
      skipped: isSet(object.skipped) ? globalThis.Boolean(object.skipped) : false,
    };
  },

  toJSON(message: GenerateOutputParam): unknown {
    const obj: any = {};
    if (message.type !== undefined && message.type !== 0) {
      obj.type = generateOutputParamActionTypeToJSON(message.type);
    }
    if (message.encryptionRequired !== undefined && message.encryptionRequired !== false) {
      obj.encryptionRequired = message.encryptionRequired;
    }
    if (message.skipped !== undefined && message.skipped !== false) {
      obj.skipped = message.skipped;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateOutputParam>, I>>(base?: I): GenerateOutputParam {
    return GenerateOutputParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateOutputParam>, I>>(object: I): GenerateOutputParam {
    const message = createBaseGenerateOutputParam();
    message.type = object.type ?? 0;
    message.encryptionRequired = object.encryptionRequired ?? false;
    message.skipped = object.skipped ?? false;
    return message;
  },
};

messageTypeRegistry.set(GenerateOutputParam.$type, GenerateOutputParam);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
