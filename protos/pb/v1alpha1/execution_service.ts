/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";
import { WorkflowVariable } from "./orbot_action";
import { WorkflowTask } from "./orbot_workflow";

export const protobufPackage = "pb.v1alpha1";

/**
 * This api request should only be used for creating the first execution in a workflow ran by the user.
 * Hence we may not need to send in the process_id and by default it will use the first process_id from the workflow.
 * All the subsequent executions will be created by the node executor workflow.
 */
export interface CreateExecutionRequest {
  $type?: "pb.v1alpha1.CreateExecutionRequest";
  workflowId?:
    | string
    | undefined;
  /**
   * Since a user creates an execution, we need to know from which connection the request is initiated.
   * Only a user can create an execution from an API request.
   * The UserId can be fetched from the request metadata.
   * We may need to revisit this once we unify both Orby and Orbot executions.
   */
  connectionId?: string | undefined;
  variables?: WorkflowVariable[] | undefined;
}

export interface CreateExecutionResponse {
  $type?: "pb.v1alpha1.CreateExecutionResponse";
  execution?: WorkflowTask | undefined;
}

function createBaseCreateExecutionRequest(): CreateExecutionRequest {
  return { $type: "pb.v1alpha1.CreateExecutionRequest", workflowId: "", connectionId: "", variables: [] };
}

export const CreateExecutionRequest = {
  $type: "pb.v1alpha1.CreateExecutionRequest" as const,

  encode(message: CreateExecutionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(10).string(message.workflowId);
    }
    if (message.connectionId !== undefined && message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.variables !== undefined && message.variables.length !== 0) {
      for (const v of message.variables) {
        WorkflowVariable.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateExecutionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateExecutionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflowId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.connectionId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.variables!.push(WorkflowVariable.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateExecutionRequest {
    return {
      $type: CreateExecutionRequest.$type,
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      connectionId: isSet(object.connectionId) ? globalThis.String(object.connectionId) : "",
      variables: globalThis.Array.isArray(object?.variables)
        ? object.variables.map((e: any) => WorkflowVariable.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateExecutionRequest): unknown {
    const obj: any = {};
    if (message.workflowId !== undefined && message.workflowId !== "") {
      obj.workflowId = message.workflowId;
    }
    if (message.connectionId !== undefined && message.connectionId !== "") {
      obj.connectionId = message.connectionId;
    }
    if (message.variables?.length) {
      obj.variables = message.variables.map((e) => WorkflowVariable.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateExecutionRequest>, I>>(base?: I): CreateExecutionRequest {
    return CreateExecutionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateExecutionRequest>, I>>(object: I): CreateExecutionRequest {
    const message = createBaseCreateExecutionRequest();
    message.workflowId = object.workflowId ?? "";
    message.connectionId = object.connectionId ?? "";
    message.variables = object.variables?.map((e) => WorkflowVariable.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(CreateExecutionRequest.$type, CreateExecutionRequest);

function createBaseCreateExecutionResponse(): CreateExecutionResponse {
  return { $type: "pb.v1alpha1.CreateExecutionResponse", execution: undefined };
}

export const CreateExecutionResponse = {
  $type: "pb.v1alpha1.CreateExecutionResponse" as const,

  encode(message: CreateExecutionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.execution !== undefined) {
      WorkflowTask.encode(message.execution, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateExecutionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateExecutionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): CreateExecutionResponse {
    return {
      $type: CreateExecutionResponse.$type,
      execution: isSet(object.execution) ? WorkflowTask.fromJSON(object.execution) : undefined,
    };
  },

  toJSON(message: CreateExecutionResponse): unknown {
    const obj: any = {};
    if (message.execution !== undefined) {
      obj.execution = WorkflowTask.toJSON(message.execution);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateExecutionResponse>, I>>(base?: I): CreateExecutionResponse {
    return CreateExecutionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateExecutionResponse>, I>>(object: I): CreateExecutionResponse {
    const message = createBaseCreateExecutionResponse();
    message.execution = (object.execution !== undefined && object.execution !== null)
      ? WorkflowTask.fromPartial(object.execution)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateExecutionResponse.$type, CreateExecutionResponse);

export interface ExecutionService {
  /**
   * Creates a new execution in the execution collection. This is different from the workflow execution service in v1alpha2 which uses the execution_view,
   * that will be migrated to the execution collection soon.
   * As of today (2025-01-20) it's only being used by Orbot.
   */
  CreateExecution(
    request: DeepPartial<CreateExecutionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateExecutionResponse>;
}

export class ExecutionServiceClientImpl implements ExecutionService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateExecution = this.CreateExecution.bind(this);
  }

  CreateExecution(
    request: DeepPartial<CreateExecutionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateExecutionResponse> {
    return this.rpc.unary(ExecutionServiceCreateExecutionDesc, CreateExecutionRequest.fromPartial(request), metadata);
  }
}

export const ExecutionServiceDesc = { serviceName: "pb.v1alpha1.ExecutionService" };

export const ExecutionServiceCreateExecutionDesc: UnaryMethodDefinitionish = {
  methodName: "CreateExecution",
  service: ExecutionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateExecutionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateExecutionResponse.decode(data);
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
