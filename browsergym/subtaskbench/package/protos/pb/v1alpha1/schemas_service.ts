/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { FieldMask } from "../../google/protobuf/field_mask";
import { messageTypeRegistry } from "../../typeRegistry";
import { Schema } from "./schema";

export const protobufPackage = "pb.v1alpha1";

export interface CreateSchemaRequest {
  $type?: "pb.v1alpha1.CreateSchemaRequest";
  /** The parent resource name where the schema is to be created. */
  parent?:
    | string
    | undefined;
  /** The schema resource to create. Name field can be empty or otherwise is ignored. */
  schema?: Schema | undefined;
}

export interface ListSchemasRequest {
  $type?: "pb.v1alpha1.ListSchemasRequest";
  /** The parent resource name where the schema was created. */
  parent?:
    | string
    | undefined;
  /**
   * Default is 10 (when page_size is missing or set to 0). Max value is 20.
   * Ordered by ascending schema resource name.
   */
  pageSize?:
    | number
    | undefined;
  /**
   * Use this to continue the previous list requests.
   * Its value should be same with previous response's next_page_token.
   */
  pageToken?: string | undefined;
}

export interface ListSchemasResponse {
  $type?: "pb.v1alpha1.ListSchemasResponse";
  /** Ordered by ascending schema resource name. */
  schemas?:
    | Schema[]
    | undefined;
  /** If the value is "", it means no more results for the request. */
  nextPageToken?:
    | string
    | undefined;
  /**
   * Total available schema size.
   * Note it is NOT the remaining available schema size after the current response.
   */
  totalSize?: number | undefined;
}

export interface UpdateSchemaRequest {
  $type?: "pb.v1alpha1.UpdateSchemaRequest";
  schema?: Schema | undefined;
  fieldMask?: string[] | undefined;
}

export interface GetSchemaRequest {
  $type?: "pb.v1alpha1.GetSchemaRequest";
  /** Name of the Schema */
  name?:
    | string
    | undefined;
  /**
   * Use this to send only relevant data in response
   * - If Field Mask is not send or is sent with empty paths then the result will contain
   *    the complete object
   * - Valid values for field mask are:display_name, entity_types
   * - Field mask will always contain `name` field. Please do not send it in Paths to avoid errors.
   */
  fieldMask?: string[] | undefined;
}

function createBaseCreateSchemaRequest(): CreateSchemaRequest {
  return { $type: "pb.v1alpha1.CreateSchemaRequest", parent: "", schema: undefined };
}

export const CreateSchemaRequest = {
  $type: "pb.v1alpha1.CreateSchemaRequest" as const,

  encode(message: CreateSchemaRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSchemaRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSchemaRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.schema = Schema.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateSchemaRequest {
    return {
      $type: CreateSchemaRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
    };
  },

  toJSON(message: CreateSchemaRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    if (message.schema !== undefined) {
      obj.schema = Schema.toJSON(message.schema);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSchemaRequest>, I>>(base?: I): CreateSchemaRequest {
    return CreateSchemaRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateSchemaRequest>, I>>(object: I): CreateSchemaRequest {
    const message = createBaseCreateSchemaRequest();
    message.parent = object.parent ?? "";
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? Schema.fromPartial(object.schema)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateSchemaRequest.$type, CreateSchemaRequest);

function createBaseListSchemasRequest(): ListSchemasRequest {
  return { $type: "pb.v1alpha1.ListSchemasRequest", parent: "", pageSize: 0, pageToken: "" };
}

export const ListSchemasRequest = {
  $type: "pb.v1alpha1.ListSchemasRequest" as const,

  encode(message: ListSchemasRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      writer.uint32(26).string(message.pageToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSchemasRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSchemasRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pageToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListSchemasRequest {
    return {
      $type: ListSchemasRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
    };
  },

  toJSON(message: ListSchemasRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      obj.pageToken = message.pageToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSchemasRequest>, I>>(base?: I): ListSchemasRequest {
    return ListSchemasRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListSchemasRequest>, I>>(object: I): ListSchemasRequest {
    const message = createBaseListSchemasRequest();
    message.parent = object.parent ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

messageTypeRegistry.set(ListSchemasRequest.$type, ListSchemasRequest);

function createBaseListSchemasResponse(): ListSchemasResponse {
  return { $type: "pb.v1alpha1.ListSchemasResponse", schemas: [], nextPageToken: "", totalSize: 0 };
}

export const ListSchemasResponse = {
  $type: "pb.v1alpha1.ListSchemasResponse" as const,

  encode(message: ListSchemasResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schemas !== undefined && message.schemas.length !== 0) {
      for (const v of message.schemas) {
        Schema.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      writer.uint32(18).string(message.nextPageToken);
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(24).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSchemasResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSchemasResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.schemas!.push(Schema.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nextPageToken = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.totalSize = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListSchemasResponse {
    return {
      $type: ListSchemasResponse.$type,
      schemas: globalThis.Array.isArray(object?.schemas) ? object.schemas.map((e: any) => Schema.fromJSON(e)) : [],
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListSchemasResponse): unknown {
    const obj: any = {};
    if (message.schemas?.length) {
      obj.schemas = message.schemas.map((e) => Schema.toJSON(e));
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSchemasResponse>, I>>(base?: I): ListSchemasResponse {
    return ListSchemasResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListSchemasResponse>, I>>(object: I): ListSchemasResponse {
    const message = createBaseListSchemasResponse();
    message.schemas = object.schemas?.map((e) => Schema.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListSchemasResponse.$type, ListSchemasResponse);

function createBaseUpdateSchemaRequest(): UpdateSchemaRequest {
  return { $type: "pb.v1alpha1.UpdateSchemaRequest", schema: undefined, fieldMask: undefined };
}

export const UpdateSchemaRequest = {
  $type: "pb.v1alpha1.UpdateSchemaRequest" as const,

  encode(message: UpdateSchemaRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateSchemaRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateSchemaRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.schema = Schema.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateSchemaRequest {
    return {
      $type: UpdateSchemaRequest.$type,
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: UpdateSchemaRequest): unknown {
    const obj: any = {};
    if (message.schema !== undefined) {
      obj.schema = Schema.toJSON(message.schema);
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateSchemaRequest>, I>>(base?: I): UpdateSchemaRequest {
    return UpdateSchemaRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateSchemaRequest>, I>>(object: I): UpdateSchemaRequest {
    const message = createBaseUpdateSchemaRequest();
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? Schema.fromPartial(object.schema)
      : undefined;
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateSchemaRequest.$type, UpdateSchemaRequest);

function createBaseGetSchemaRequest(): GetSchemaRequest {
  return { $type: "pb.v1alpha1.GetSchemaRequest", name: "", fieldMask: undefined };
}

export const GetSchemaRequest = {
  $type: "pb.v1alpha1.GetSchemaRequest" as const,

  encode(message: GetSchemaRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSchemaRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSchemaRequest();
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

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSchemaRequest {
    return {
      $type: GetSchemaRequest.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: GetSchemaRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSchemaRequest>, I>>(base?: I): GetSchemaRequest {
    return GetSchemaRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSchemaRequest>, I>>(object: I): GetSchemaRequest {
    const message = createBaseGetSchemaRequest();
    message.name = object.name ?? "";
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(GetSchemaRequest.$type, GetSchemaRequest);

export interface Schemas {
  /**
   * Create a schema for the current users.
   * This is only used to generate test data now.
   */
  CreateSchema(request: DeepPartial<CreateSchemaRequest>, metadata?: grpc.Metadata): Promise<Schema>;
  /** List schemas ordered by ascending schema resource name. */
  ListSchemas(request: DeepPartial<ListSchemasRequest>, metadata?: grpc.Metadata): Promise<ListSchemasResponse>;
  /** Can only update schema mode, confidence_threshold, and schema_name. */
  UpdateSchema(request: DeepPartial<UpdateSchemaRequest>, metadata?: grpc.Metadata): Promise<Schema>;
  GetSchema(request: DeepPartial<GetSchemaRequest>, metadata?: grpc.Metadata): Promise<Schema>;
}

export class SchemasClientImpl implements Schemas {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateSchema = this.CreateSchema.bind(this);
    this.ListSchemas = this.ListSchemas.bind(this);
    this.UpdateSchema = this.UpdateSchema.bind(this);
    this.GetSchema = this.GetSchema.bind(this);
  }

  CreateSchema(request: DeepPartial<CreateSchemaRequest>, metadata?: grpc.Metadata): Promise<Schema> {
    return this.rpc.unary(SchemasCreateSchemaDesc, CreateSchemaRequest.fromPartial(request), metadata);
  }

  ListSchemas(request: DeepPartial<ListSchemasRequest>, metadata?: grpc.Metadata): Promise<ListSchemasResponse> {
    return this.rpc.unary(SchemasListSchemasDesc, ListSchemasRequest.fromPartial(request), metadata);
  }

  UpdateSchema(request: DeepPartial<UpdateSchemaRequest>, metadata?: grpc.Metadata): Promise<Schema> {
    return this.rpc.unary(SchemasUpdateSchemaDesc, UpdateSchemaRequest.fromPartial(request), metadata);
  }

  GetSchema(request: DeepPartial<GetSchemaRequest>, metadata?: grpc.Metadata): Promise<Schema> {
    return this.rpc.unary(SchemasGetSchemaDesc, GetSchemaRequest.fromPartial(request), metadata);
  }
}

export const SchemasDesc = { serviceName: "pb.v1alpha1.Schemas" };

export const SchemasCreateSchemaDesc: UnaryMethodDefinitionish = {
  methodName: "CreateSchema",
  service: SchemasDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateSchemaRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Schema.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SchemasListSchemasDesc: UnaryMethodDefinitionish = {
  methodName: "ListSchemas",
  service: SchemasDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListSchemasRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListSchemasResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SchemasUpdateSchemaDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateSchema",
  service: SchemasDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateSchemaRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Schema.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SchemasGetSchemaDesc: UnaryMethodDefinitionish = {
  methodName: "GetSchema",
  service: SchemasDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetSchemaRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Schema.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata ?? {},
        ...(this.options.transport !== undefined ? { transport: this.options.transport } : {}),
        debug: this.options.debug ?? false,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
