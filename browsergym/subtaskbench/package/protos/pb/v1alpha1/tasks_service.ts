/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { FieldMask } from "../../google/protobuf/field_mask";
import { messageTypeRegistry } from "../../typeRegistry";
import { Task } from "./task";

export const protobufPackage = "pb.v1alpha1";

export interface CreateTaskRequest {
  $type?: "pb.v1alpha1.CreateTaskRequest";
  /**
   * The parent resource name where the task is to be created.
   * E.g., "users/abc@orby.ai"
   */
  parent?:
    | string
    | undefined;
  /** The task resource to create. Name field can be empty or otherwise is ignored. */
  task?: Task | undefined;
}

export interface ListTasksRequest {
  $type?: "pb.v1alpha1.ListTasksRequest";
  /**
   * The parent resource name where the task was created.
   * E.g., users/abc@orby.ai
   */
  parent?:
    | string
    | undefined;
  /**
   * Default is 10 (when page_size is missing or set to 0). Max value is 20.
   * Ordered by ascending task resource name.
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

export interface ListTasksResponse {
  $type?: "pb.v1alpha1.ListTasksResponse";
  /** Ordered by ascending task resource name. */
  tasks?:
    | Task[]
    | undefined;
  /** If the value is "", it means no more results for the request. */
  nextPageToken?:
    | string
    | undefined;
  /**
   * Total available task size.
   * Note it is NOT the remaining available task size after the current response.
   */
  totalSize?: number | undefined;
}

export interface UpdateTaskRequest {
  $type?: "pb.v1alpha1.UpdateTaskRequest";
  task?:
    | Task
    | undefined;
  /**
   * Support mode, confidence_threshold, and task_name, for example "mode,task_name" means
   * only the mode and task_name fields will be updated to the input value.
   * If empty, all these three fields will be updated in the request.
   */
  fieldMask?: string[] | undefined;
}

function createBaseCreateTaskRequest(): CreateTaskRequest {
  return { $type: "pb.v1alpha1.CreateTaskRequest", parent: "", task: undefined };
}

export const CreateTaskRequest = {
  $type: "pb.v1alpha1.CreateTaskRequest" as const,

  encode(message: CreateTaskRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.task !== undefined) {
      Task.encode(message.task, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTaskRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTaskRequest();
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

          message.task = Task.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateTaskRequest {
    return {
      $type: CreateTaskRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      task: isSet(object.task) ? Task.fromJSON(object.task) : undefined,
    };
  },

  toJSON(message: CreateTaskRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    if (message.task !== undefined) {
      obj.task = Task.toJSON(message.task);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTaskRequest>, I>>(base?: I): CreateTaskRequest {
    return CreateTaskRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateTaskRequest>, I>>(object: I): CreateTaskRequest {
    const message = createBaseCreateTaskRequest();
    message.parent = object.parent ?? "";
    message.task = (object.task !== undefined && object.task !== null) ? Task.fromPartial(object.task) : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateTaskRequest.$type, CreateTaskRequest);

function createBaseListTasksRequest(): ListTasksRequest {
  return { $type: "pb.v1alpha1.ListTasksRequest", parent: "", pageSize: 0, pageToken: "" };
}

export const ListTasksRequest = {
  $type: "pb.v1alpha1.ListTasksRequest" as const,

  encode(message: ListTasksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTasksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTasksRequest();
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

  fromJSON(object: any): ListTasksRequest {
    return {
      $type: ListTasksRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
    };
  },

  toJSON(message: ListTasksRequest): unknown {
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

  create<I extends Exact<DeepPartial<ListTasksRequest>, I>>(base?: I): ListTasksRequest {
    return ListTasksRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListTasksRequest>, I>>(object: I): ListTasksRequest {
    const message = createBaseListTasksRequest();
    message.parent = object.parent ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

messageTypeRegistry.set(ListTasksRequest.$type, ListTasksRequest);

function createBaseListTasksResponse(): ListTasksResponse {
  return { $type: "pb.v1alpha1.ListTasksResponse", tasks: [], nextPageToken: "", totalSize: 0 };
}

export const ListTasksResponse = {
  $type: "pb.v1alpha1.ListTasksResponse" as const,

  encode(message: ListTasksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tasks !== undefined && message.tasks.length !== 0) {
      for (const v of message.tasks) {
        Task.encode(v!, writer.uint32(10).fork()).ldelim();
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTasksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTasksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tasks!.push(Task.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListTasksResponse {
    return {
      $type: ListTasksResponse.$type,
      tasks: globalThis.Array.isArray(object?.tasks) ? object.tasks.map((e: any) => Task.fromJSON(e)) : [],
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListTasksResponse): unknown {
    const obj: any = {};
    if (message.tasks?.length) {
      obj.tasks = message.tasks.map((e) => Task.toJSON(e));
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListTasksResponse>, I>>(base?: I): ListTasksResponse {
    return ListTasksResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListTasksResponse>, I>>(object: I): ListTasksResponse {
    const message = createBaseListTasksResponse();
    message.tasks = object.tasks?.map((e) => Task.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListTasksResponse.$type, ListTasksResponse);

function createBaseUpdateTaskRequest(): UpdateTaskRequest {
  return { $type: "pb.v1alpha1.UpdateTaskRequest", task: undefined, fieldMask: undefined };
}

export const UpdateTaskRequest = {
  $type: "pb.v1alpha1.UpdateTaskRequest" as const,

  encode(message: UpdateTaskRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.task !== undefined) {
      Task.encode(message.task, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTaskRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateTaskRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.task = Task.decode(reader, reader.uint32());
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

  fromJSON(object: any): UpdateTaskRequest {
    return {
      $type: UpdateTaskRequest.$type,
      task: isSet(object.task) ? Task.fromJSON(object.task) : undefined,
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: UpdateTaskRequest): unknown {
    const obj: any = {};
    if (message.task !== undefined) {
      obj.task = Task.toJSON(message.task);
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateTaskRequest>, I>>(base?: I): UpdateTaskRequest {
    return UpdateTaskRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateTaskRequest>, I>>(object: I): UpdateTaskRequest {
    const message = createBaseUpdateTaskRequest();
    message.task = (object.task !== undefined && object.task !== null) ? Task.fromPartial(object.task) : undefined;
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateTaskRequest.$type, UpdateTaskRequest);

export interface Tasks {
  /**
   * Create a task for the current users.
   * This is only used to generate test data now.
   */
  CreateTask(request: DeepPartial<CreateTaskRequest>, metadata?: grpc.Metadata): Promise<Task>;
  /** List tasks ordered by ascending task resource name. */
  ListTasks(request: DeepPartial<ListTasksRequest>, metadata?: grpc.Metadata): Promise<ListTasksResponse>;
  /** Can only update task mode, confidence_threshold, and task_name. */
  UpdateTask(request: DeepPartial<UpdateTaskRequest>, metadata?: grpc.Metadata): Promise<Task>;
}

export class TasksClientImpl implements Tasks {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateTask = this.CreateTask.bind(this);
    this.ListTasks = this.ListTasks.bind(this);
    this.UpdateTask = this.UpdateTask.bind(this);
  }

  CreateTask(request: DeepPartial<CreateTaskRequest>, metadata?: grpc.Metadata): Promise<Task> {
    return this.rpc.unary(TasksCreateTaskDesc, CreateTaskRequest.fromPartial(request), metadata);
  }

  ListTasks(request: DeepPartial<ListTasksRequest>, metadata?: grpc.Metadata): Promise<ListTasksResponse> {
    return this.rpc.unary(TasksListTasksDesc, ListTasksRequest.fromPartial(request), metadata);
  }

  UpdateTask(request: DeepPartial<UpdateTaskRequest>, metadata?: grpc.Metadata): Promise<Task> {
    return this.rpc.unary(TasksUpdateTaskDesc, UpdateTaskRequest.fromPartial(request), metadata);
  }
}

export const TasksDesc = { serviceName: "pb.v1alpha1.Tasks" };

export const TasksCreateTaskDesc: UnaryMethodDefinitionish = {
  methodName: "CreateTask",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateTaskRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Task.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksListTasksDesc: UnaryMethodDefinitionish = {
  methodName: "ListTasks",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListTasksRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListTasksResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TasksUpdateTaskDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateTask",
  service: TasksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateTaskRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Task.decode(data);
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
