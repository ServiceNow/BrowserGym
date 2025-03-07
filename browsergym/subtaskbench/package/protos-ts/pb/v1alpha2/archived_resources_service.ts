/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Empty } from "../../google/protobuf/empty";
import { FieldMask } from "../../google/protobuf/field_mask";
import { messageTypeRegistry } from "../../typeRegistry";
import { WorkflowTask } from "../v1alpha1/orbot_workflow";
import { Connector } from "./connector";
import { Task } from "./tasks_service";
import { Workflow } from "./workflows_service";

export const protobufPackage = "pb.v1alpha2";

export interface ListArchivedResourcesRequest {
  $type?: "pb.v1alpha2.ListArchivedResourcesRequest";
  /** Organization resource name. Format: organizations/{ID} */
  orgResourceName?:
    | string
    | undefined;
  /**
   * Supported filter: "display_name_prefix={SEARCH_KEY},type={workflow|task|connector|execution}"
   * By default, the filter will contain the value of type = {task}.
   */
  filter?:
    | string
    | undefined;
  /**
   * Use this to send only relevant data in response
   * - If Field Mask is not send or is sent with empty paths then the result will contain
   *    the complete object
   * - Valid values for field mask are: display_name, deleted_object_info
   * - Field mask will always contain `name` field. Please donot send it in Paths to avoid errors.
   */
  fieldMask?:
    | string[]
    | undefined;
  /**
   * Default is 5 (when page_size is missing or set to 0). Max value is 20.
   * Ordered by resource display name.
   */
  pageSize?: number | undefined;
  pageNumber?: number | undefined;
}

export interface ArchivedResource {
  $type?: "pb.v1alpha2.ArchivedResource";
  workflow?: Workflow | undefined;
  task?: Task | undefined;
  connector?: Connector | undefined;
  execution?: WorkflowTask | undefined;
}

export interface ListArchivedResourcesResponse {
  $type?: "pb.v1alpha2.ListArchivedResourcesResponse";
  archivedResource?:
    | ArchivedResource[]
    | undefined;
  /**
   * Total available resource size.
   * Note it is NOT the remaining available resource size after the current response.
   */
  totalSize?: number | undefined;
}

export interface RestoreArchivedResourcesRequest {
  $type?: "pb.v1alpha2.RestoreArchivedResourcesRequest";
  /** Name of the resource */
  name?:
    | string[]
    | undefined;
  /** Organization resource name. Format: organizations/{ID} */
  orgResourceName?: string | undefined;
}

export interface RestoreDeletedResourcesRequest {
  $type?: "pb.v1alpha2.RestoreDeletedResourcesRequest";
  /** Resources to restore */
  deletedResources?: ArchivedResource[] | undefined;
}

export interface RestoreDeletedResourcesResponse {
  $type?: "pb.v1alpha2.RestoreDeletedResourcesResponse";
  /**
   * Operation ID for tracking the restoration process in Temporal.
   * Currently, there is no provision for the frontend to query for results,
   * but this might be added in the future if needed.
   */
  operationId?: string | undefined;
}

function createBaseListArchivedResourcesRequest(): ListArchivedResourcesRequest {
  return {
    $type: "pb.v1alpha2.ListArchivedResourcesRequest",
    orgResourceName: "",
    filter: "",
    fieldMask: undefined,
    pageSize: 0,
    pageNumber: 0,
  };
}

export const ListArchivedResourcesRequest = {
  $type: "pb.v1alpha2.ListArchivedResourcesRequest" as const,

  encode(message: ListArchivedResourcesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(10).string(message.orgResourceName);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(18).string(message.filter);
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(26).fork()).ldelim();
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(32).int32(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(40).int32(message.pageNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListArchivedResourcesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListArchivedResourcesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgResourceName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.filter = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.pageNumber = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListArchivedResourcesRequest {
    return {
      $type: ListArchivedResourcesRequest.$type,
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
    };
  },

  toJSON(message: ListArchivedResourcesRequest): unknown {
    const obj: any = {};
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListArchivedResourcesRequest>, I>>(base?: I): ListArchivedResourcesRequest {
    return ListArchivedResourcesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListArchivedResourcesRequest>, I>>(object: I): ListArchivedResourcesRequest {
    const message = createBaseListArchivedResourcesRequest();
    message.orgResourceName = object.orgResourceName ?? "";
    message.filter = object.filter ?? "";
    message.fieldMask = object.fieldMask ?? undefined;
    message.pageSize = object.pageSize ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListArchivedResourcesRequest.$type, ListArchivedResourcesRequest);

function createBaseArchivedResource(): ArchivedResource {
  return {
    $type: "pb.v1alpha2.ArchivedResource",
    workflow: undefined,
    task: undefined,
    connector: undefined,
    execution: undefined,
  };
}

export const ArchivedResource = {
  $type: "pb.v1alpha2.ArchivedResource" as const,

  encode(message: ArchivedResource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflow !== undefined) {
      Workflow.encode(message.workflow, writer.uint32(10).fork()).ldelim();
    }
    if (message.task !== undefined) {
      Task.encode(message.task, writer.uint32(18).fork()).ldelim();
    }
    if (message.connector !== undefined) {
      Connector.encode(message.connector, writer.uint32(26).fork()).ldelim();
    }
    if (message.execution !== undefined) {
      WorkflowTask.encode(message.execution, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArchivedResource {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArchivedResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflow = Workflow.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.task = Task.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.connector = Connector.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.execution = WorkflowTask.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ArchivedResource {
    return {
      $type: ArchivedResource.$type,
      workflow: isSet(object.workflow) ? Workflow.fromJSON(object.workflow) : undefined,
      task: isSet(object.task) ? Task.fromJSON(object.task) : undefined,
      connector: isSet(object.connector) ? Connector.fromJSON(object.connector) : undefined,
      execution: isSet(object.execution) ? WorkflowTask.fromJSON(object.execution) : undefined,
    };
  },

  toJSON(message: ArchivedResource): unknown {
    const obj: any = {};
    if (message.workflow !== undefined) {
      obj.workflow = Workflow.toJSON(message.workflow);
    }
    if (message.task !== undefined) {
      obj.task = Task.toJSON(message.task);
    }
    if (message.connector !== undefined) {
      obj.connector = Connector.toJSON(message.connector);
    }
    if (message.execution !== undefined) {
      obj.execution = WorkflowTask.toJSON(message.execution);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ArchivedResource>, I>>(base?: I): ArchivedResource {
    return ArchivedResource.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ArchivedResource>, I>>(object: I): ArchivedResource {
    const message = createBaseArchivedResource();
    message.workflow = (object.workflow !== undefined && object.workflow !== null)
      ? Workflow.fromPartial(object.workflow)
      : undefined;
    message.task = (object.task !== undefined && object.task !== null) ? Task.fromPartial(object.task) : undefined;
    message.connector = (object.connector !== undefined && object.connector !== null)
      ? Connector.fromPartial(object.connector)
      : undefined;
    message.execution = (object.execution !== undefined && object.execution !== null)
      ? WorkflowTask.fromPartial(object.execution)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ArchivedResource.$type, ArchivedResource);

function createBaseListArchivedResourcesResponse(): ListArchivedResourcesResponse {
  return { $type: "pb.v1alpha2.ListArchivedResourcesResponse", archivedResource: [], totalSize: 0 };
}

export const ListArchivedResourcesResponse = {
  $type: "pb.v1alpha2.ListArchivedResourcesResponse" as const,

  encode(message: ListArchivedResourcesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.archivedResource !== undefined && message.archivedResource.length !== 0) {
      for (const v of message.archivedResource) {
        ArchivedResource.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(16).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListArchivedResourcesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListArchivedResourcesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.archivedResource!.push(ArchivedResource.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
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

  fromJSON(object: any): ListArchivedResourcesResponse {
    return {
      $type: ListArchivedResourcesResponse.$type,
      archivedResource: globalThis.Array.isArray(object?.archivedResource)
        ? object.archivedResource.map((e: any) => ArchivedResource.fromJSON(e))
        : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListArchivedResourcesResponse): unknown {
    const obj: any = {};
    if (message.archivedResource?.length) {
      obj.archivedResource = message.archivedResource.map((e) => ArchivedResource.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListArchivedResourcesResponse>, I>>(base?: I): ListArchivedResourcesResponse {
    return ListArchivedResourcesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListArchivedResourcesResponse>, I>>(
    object: I,
  ): ListArchivedResourcesResponse {
    const message = createBaseListArchivedResourcesResponse();
    message.archivedResource = object.archivedResource?.map((e) => ArchivedResource.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListArchivedResourcesResponse.$type, ListArchivedResourcesResponse);

function createBaseRestoreArchivedResourcesRequest(): RestoreArchivedResourcesRequest {
  return { $type: "pb.v1alpha2.RestoreArchivedResourcesRequest", name: [], orgResourceName: "" };
}

export const RestoreArchivedResourcesRequest = {
  $type: "pb.v1alpha2.RestoreArchivedResourcesRequest" as const,

  encode(message: RestoreArchivedResourcesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name.length !== 0) {
      for (const v of message.name) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(18).string(message.orgResourceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RestoreArchivedResourcesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRestoreArchivedResourcesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name!.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orgResourceName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RestoreArchivedResourcesRequest {
    return {
      $type: RestoreArchivedResourcesRequest.$type,
      name: globalThis.Array.isArray(object?.name) ? object.name.map((e: any) => globalThis.String(e)) : [],
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
    };
  },

  toJSON(message: RestoreArchivedResourcesRequest): unknown {
    const obj: any = {};
    if (message.name?.length) {
      obj.name = message.name;
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RestoreArchivedResourcesRequest>, I>>(base?: I): RestoreArchivedResourcesRequest {
    return RestoreArchivedResourcesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RestoreArchivedResourcesRequest>, I>>(
    object: I,
  ): RestoreArchivedResourcesRequest {
    const message = createBaseRestoreArchivedResourcesRequest();
    message.name = object.name?.map((e) => e) || [];
    message.orgResourceName = object.orgResourceName ?? "";
    return message;
  },
};

messageTypeRegistry.set(RestoreArchivedResourcesRequest.$type, RestoreArchivedResourcesRequest);

function createBaseRestoreDeletedResourcesRequest(): RestoreDeletedResourcesRequest {
  return { $type: "pb.v1alpha2.RestoreDeletedResourcesRequest", deletedResources: [] };
}

export const RestoreDeletedResourcesRequest = {
  $type: "pb.v1alpha2.RestoreDeletedResourcesRequest" as const,

  encode(message: RestoreDeletedResourcesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.deletedResources !== undefined && message.deletedResources.length !== 0) {
      for (const v of message.deletedResources) {
        ArchivedResource.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RestoreDeletedResourcesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRestoreDeletedResourcesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.deletedResources!.push(ArchivedResource.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RestoreDeletedResourcesRequest {
    return {
      $type: RestoreDeletedResourcesRequest.$type,
      deletedResources: globalThis.Array.isArray(object?.deletedResources)
        ? object.deletedResources.map((e: any) => ArchivedResource.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RestoreDeletedResourcesRequest): unknown {
    const obj: any = {};
    if (message.deletedResources?.length) {
      obj.deletedResources = message.deletedResources.map((e) => ArchivedResource.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RestoreDeletedResourcesRequest>, I>>(base?: I): RestoreDeletedResourcesRequest {
    return RestoreDeletedResourcesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RestoreDeletedResourcesRequest>, I>>(
    object: I,
  ): RestoreDeletedResourcesRequest {
    const message = createBaseRestoreDeletedResourcesRequest();
    message.deletedResources = object.deletedResources?.map((e) => ArchivedResource.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(RestoreDeletedResourcesRequest.$type, RestoreDeletedResourcesRequest);

function createBaseRestoreDeletedResourcesResponse(): RestoreDeletedResourcesResponse {
  return { $type: "pb.v1alpha2.RestoreDeletedResourcesResponse", operationId: "" };
}

export const RestoreDeletedResourcesResponse = {
  $type: "pb.v1alpha2.RestoreDeletedResourcesResponse" as const,

  encode(message: RestoreDeletedResourcesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationId !== undefined && message.operationId !== "") {
      writer.uint32(10).string(message.operationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RestoreDeletedResourcesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRestoreDeletedResourcesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.operationId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RestoreDeletedResourcesResponse {
    return {
      $type: RestoreDeletedResourcesResponse.$type,
      operationId: isSet(object.operationId) ? globalThis.String(object.operationId) : "",
    };
  },

  toJSON(message: RestoreDeletedResourcesResponse): unknown {
    const obj: any = {};
    if (message.operationId !== undefined && message.operationId !== "") {
      obj.operationId = message.operationId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RestoreDeletedResourcesResponse>, I>>(base?: I): RestoreDeletedResourcesResponse {
    return RestoreDeletedResourcesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RestoreDeletedResourcesResponse>, I>>(
    object: I,
  ): RestoreDeletedResourcesResponse {
    const message = createBaseRestoreDeletedResourcesResponse();
    message.operationId = object.operationId ?? "";
    return message;
  },
};

messageTypeRegistry.set(RestoreDeletedResourcesResponse.$type, RestoreDeletedResourcesResponse);

export interface ArchivedResources {
  ListArchivedResources(
    request: DeepPartial<ListArchivedResourcesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListArchivedResourcesResponse>;
  RestoreArchivedResources(
    request: DeepPartial<RestoreArchivedResourcesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<Empty>;
  /**
   * RestoreDeletedResources initiates an asynchronous restoration of specified resources.
   * This operation returns immediately, allowing the restoration process to complete in the background.
   */
  RestoreDeletedResources(
    request: DeepPartial<RestoreDeletedResourcesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RestoreDeletedResourcesResponse>;
}

export class ArchivedResourcesClientImpl implements ArchivedResources {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListArchivedResources = this.ListArchivedResources.bind(this);
    this.RestoreArchivedResources = this.RestoreArchivedResources.bind(this);
    this.RestoreDeletedResources = this.RestoreDeletedResources.bind(this);
  }

  ListArchivedResources(
    request: DeepPartial<ListArchivedResourcesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListArchivedResourcesResponse> {
    return this.rpc.unary(
      ArchivedResourcesListArchivedResourcesDesc,
      ListArchivedResourcesRequest.fromPartial(request),
      metadata,
    );
  }

  RestoreArchivedResources(
    request: DeepPartial<RestoreArchivedResourcesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<Empty> {
    return this.rpc.unary(
      ArchivedResourcesRestoreArchivedResourcesDesc,
      RestoreArchivedResourcesRequest.fromPartial(request),
      metadata,
    );
  }

  RestoreDeletedResources(
    request: DeepPartial<RestoreDeletedResourcesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RestoreDeletedResourcesResponse> {
    return this.rpc.unary(
      ArchivedResourcesRestoreDeletedResourcesDesc,
      RestoreDeletedResourcesRequest.fromPartial(request),
      metadata,
    );
  }
}

export const ArchivedResourcesDesc = { serviceName: "pb.v1alpha2.ArchivedResources" };

export const ArchivedResourcesListArchivedResourcesDesc: UnaryMethodDefinitionish = {
  methodName: "ListArchivedResources",
  service: ArchivedResourcesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListArchivedResourcesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListArchivedResourcesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ArchivedResourcesRestoreArchivedResourcesDesc: UnaryMethodDefinitionish = {
  methodName: "RestoreArchivedResources",
  service: ArchivedResourcesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RestoreArchivedResourcesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ArchivedResourcesRestoreDeletedResourcesDesc: UnaryMethodDefinitionish = {
  methodName: "RestoreDeletedResources",
  service: ArchivedResourcesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RestoreDeletedResourcesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RestoreDeletedResourcesResponse.decode(data);
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
