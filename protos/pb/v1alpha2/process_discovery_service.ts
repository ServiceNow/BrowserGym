/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { UserProfileInfo } from "../../common/user_profile";
import { Empty } from "../../google/protobuf/empty";
import { FieldMask } from "../../google/protobuf/field_mask";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import { Attribute, StepType } from "../process_discovery/dataset";
import { Process } from "../process_discovery/process";

export const protobufPackage = "pb.v1alpha2";

/**
 * This is how the user defines for the process and will be stored in the database.
 * The DB object will also store the some additional fields such as the generated processMaps etc.
 */
export interface UserDefinedProcess {
  $type?: "pb.v1alpha2.UserDefinedProcess";
  id?:
    | string
    | undefined;
  /** The name of the process */
  name?:
    | string
    | undefined;
  /** The description of the process */
  description?:
    | string
    | undefined;
  /**
   * The base step definitions for the process.
   * Only the display name, description and application are inputted by the user.
   */
  baseStepDefinition?:
    | StepType[]
    | undefined;
  /** The variant step definitions for the process */
  variantStepDefinition?:
    | StepType[]
    | undefined;
  /** User defines the attributes for the application and ML will associate the attributes with the step definitions. */
  applicationAttributes?:
    | ApplicationAttributes[]
    | undefined;
  /** The users that are associated with the process */
  userIds?: string[] | undefined;
  createTime?: Date | undefined;
  lastUpdateTime?:
    | Date
    | undefined;
  /** User who created the process */
  creator?: UserProfileInfo | undefined;
}

export interface CreateProcessRequest {
  $type?: "pb.v1alpha2.CreateProcessRequest";
  /** The id, creator, create_time, last_update_time inside the user_defined_process are added by BE. */
  userDefinedProcess?: UserDefinedProcess | undefined;
}

export interface CreateProcessResponse {
  $type?: "pb.v1alpha2.CreateProcessResponse";
  userDefinedProcess?: UserDefinedProcess | undefined;
}

export interface GetProcessRequest {
  $type?: "pb.v1alpha2.GetProcessRequest";
  processId?: string | undefined;
}

/** GetProcessResponse takes in the id of the user_defined_process and returns the corresponding processMap. */
export interface GetProcessResponse {
  $type?: "pb.v1alpha2.GetProcessResponse";
  process?: Process | undefined;
}

/** ListProcessesRequest is the request for listing all the user defined processes. */
export interface ListProcessesRequest {
  $type?: "pb.v1alpha2.ListProcessesRequest";
  /** Maximum number of results to return */
  pageSize?:
    | number
    | undefined;
  /** Page number for the current request */
  pageNumber?: number | undefined;
}

export interface ListProcessesResponse {
  $type?: "pb.v1alpha2.ListProcessesResponse";
  /** @deprecated */
  processes?:
    | Process[]
    | undefined;
  /** TODO: use fieldmask. */
  totalCount?: number | undefined;
  userDefinedProcesses?: UserDefinedProcess[] | undefined;
}

export interface UpdateProcessRequest {
  $type?: "pb.v1alpha2.UpdateProcessRequest";
  userDefinedProcess?: UserDefinedProcess | undefined;
  updateMask?: string[] | undefined;
}

export interface UpdateProcessResponse {
  $type?: "pb.v1alpha2.UpdateProcessResponse";
  userDefinedProcess?: UserDefinedProcess | undefined;
}

export interface DeleteProcessRequest {
  $type?: "pb.v1alpha2.DeleteProcessRequest";
  processId?: string | undefined;
}

export interface ApplicationAttributes {
  $type?: "pb.v1alpha2.ApplicationAttributes";
  application?:
    | string
    | undefined;
  /** The attributes associated with the application */
  attributes?: Attribute[] | undefined;
}

function createBaseUserDefinedProcess(): UserDefinedProcess {
  return {
    $type: "pb.v1alpha2.UserDefinedProcess",
    id: "",
    name: "",
    description: "",
    baseStepDefinition: [],
    variantStepDefinition: [],
    applicationAttributes: [],
    userIds: [],
    createTime: undefined,
    lastUpdateTime: undefined,
    creator: undefined,
  };
}

export const UserDefinedProcess = {
  $type: "pb.v1alpha2.UserDefinedProcess" as const,

  encode(message: UserDefinedProcess, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.baseStepDefinition !== undefined && message.baseStepDefinition.length !== 0) {
      for (const v of message.baseStepDefinition) {
        StepType.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.variantStepDefinition !== undefined && message.variantStepDefinition.length !== 0) {
      for (const v of message.variantStepDefinition) {
        StepType.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.applicationAttributes !== undefined && message.applicationAttributes.length !== 0) {
      for (const v of message.applicationAttributes) {
        ApplicationAttributes.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    if (message.userIds !== undefined && message.userIds.length !== 0) {
      for (const v of message.userIds) {
        writer.uint32(58).string(v!);
      }
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(66).fork()).ldelim();
    }
    if (message.lastUpdateTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastUpdateTime), writer.uint32(74).fork()).ldelim();
    }
    if (message.creator !== undefined) {
      UserProfileInfo.encode(message.creator, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserDefinedProcess {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserDefinedProcess();
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

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.baseStepDefinition!.push(StepType.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.variantStepDefinition!.push(StepType.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.applicationAttributes!.push(ApplicationAttributes.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.userIds!.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.createTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.lastUpdateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.creator = UserProfileInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserDefinedProcess {
    return {
      $type: UserDefinedProcess.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      baseStepDefinition: globalThis.Array.isArray(object?.baseStepDefinition)
        ? object.baseStepDefinition.map((e: any) => StepType.fromJSON(e))
        : [],
      variantStepDefinition: globalThis.Array.isArray(object?.variantStepDefinition)
        ? object.variantStepDefinition.map((e: any) => StepType.fromJSON(e))
        : [],
      applicationAttributes: globalThis.Array.isArray(object?.applicationAttributes)
        ? object.applicationAttributes.map((e: any) => ApplicationAttributes.fromJSON(e))
        : [],
      userIds: globalThis.Array.isArray(object?.userIds) ? object.userIds.map((e: any) => globalThis.String(e)) : [],
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      lastUpdateTime: isSet(object.lastUpdateTime) ? fromJsonTimestamp(object.lastUpdateTime) : undefined,
      creator: isSet(object.creator) ? UserProfileInfo.fromJSON(object.creator) : undefined,
    };
  },

  toJSON(message: UserDefinedProcess): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.baseStepDefinition?.length) {
      obj.baseStepDefinition = message.baseStepDefinition.map((e) => StepType.toJSON(e));
    }
    if (message.variantStepDefinition?.length) {
      obj.variantStepDefinition = message.variantStepDefinition.map((e) => StepType.toJSON(e));
    }
    if (message.applicationAttributes?.length) {
      obj.applicationAttributes = message.applicationAttributes.map((e) => ApplicationAttributes.toJSON(e));
    }
    if (message.userIds?.length) {
      obj.userIds = message.userIds;
    }
    if (message.createTime !== undefined) {
      obj.createTime = message.createTime.toISOString();
    }
    if (message.lastUpdateTime !== undefined) {
      obj.lastUpdateTime = message.lastUpdateTime.toISOString();
    }
    if (message.creator !== undefined) {
      obj.creator = UserProfileInfo.toJSON(message.creator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserDefinedProcess>, I>>(base?: I): UserDefinedProcess {
    return UserDefinedProcess.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserDefinedProcess>, I>>(object: I): UserDefinedProcess {
    const message = createBaseUserDefinedProcess();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.baseStepDefinition = object.baseStepDefinition?.map((e) => StepType.fromPartial(e)) || [];
    message.variantStepDefinition = object.variantStepDefinition?.map((e) => StepType.fromPartial(e)) || [];
    message.applicationAttributes = object.applicationAttributes?.map((e) => ApplicationAttributes.fromPartial(e)) ||
      [];
    message.userIds = object.userIds?.map((e) => e) || [];
    message.createTime = object.createTime ?? undefined;
    message.lastUpdateTime = object.lastUpdateTime ?? undefined;
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? UserProfileInfo.fromPartial(object.creator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UserDefinedProcess.$type, UserDefinedProcess);

function createBaseCreateProcessRequest(): CreateProcessRequest {
  return { $type: "pb.v1alpha2.CreateProcessRequest", userDefinedProcess: undefined };
}

export const CreateProcessRequest = {
  $type: "pb.v1alpha2.CreateProcessRequest" as const,

  encode(message: CreateProcessRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userDefinedProcess !== undefined) {
      UserDefinedProcess.encode(message.userDefinedProcess, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateProcessRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateProcessRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userDefinedProcess = UserDefinedProcess.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateProcessRequest {
    return {
      $type: CreateProcessRequest.$type,
      userDefinedProcess: isSet(object.userDefinedProcess)
        ? UserDefinedProcess.fromJSON(object.userDefinedProcess)
        : undefined,
    };
  },

  toJSON(message: CreateProcessRequest): unknown {
    const obj: any = {};
    if (message.userDefinedProcess !== undefined) {
      obj.userDefinedProcess = UserDefinedProcess.toJSON(message.userDefinedProcess);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateProcessRequest>, I>>(base?: I): CreateProcessRequest {
    return CreateProcessRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateProcessRequest>, I>>(object: I): CreateProcessRequest {
    const message = createBaseCreateProcessRequest();
    message.userDefinedProcess = (object.userDefinedProcess !== undefined && object.userDefinedProcess !== null)
      ? UserDefinedProcess.fromPartial(object.userDefinedProcess)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateProcessRequest.$type, CreateProcessRequest);

function createBaseCreateProcessResponse(): CreateProcessResponse {
  return { $type: "pb.v1alpha2.CreateProcessResponse", userDefinedProcess: undefined };
}

export const CreateProcessResponse = {
  $type: "pb.v1alpha2.CreateProcessResponse" as const,

  encode(message: CreateProcessResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userDefinedProcess !== undefined) {
      UserDefinedProcess.encode(message.userDefinedProcess, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateProcessResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateProcessResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userDefinedProcess = UserDefinedProcess.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateProcessResponse {
    return {
      $type: CreateProcessResponse.$type,
      userDefinedProcess: isSet(object.userDefinedProcess)
        ? UserDefinedProcess.fromJSON(object.userDefinedProcess)
        : undefined,
    };
  },

  toJSON(message: CreateProcessResponse): unknown {
    const obj: any = {};
    if (message.userDefinedProcess !== undefined) {
      obj.userDefinedProcess = UserDefinedProcess.toJSON(message.userDefinedProcess);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateProcessResponse>, I>>(base?: I): CreateProcessResponse {
    return CreateProcessResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateProcessResponse>, I>>(object: I): CreateProcessResponse {
    const message = createBaseCreateProcessResponse();
    message.userDefinedProcess = (object.userDefinedProcess !== undefined && object.userDefinedProcess !== null)
      ? UserDefinedProcess.fromPartial(object.userDefinedProcess)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateProcessResponse.$type, CreateProcessResponse);

function createBaseGetProcessRequest(): GetProcessRequest {
  return { $type: "pb.v1alpha2.GetProcessRequest", processId: "" };
}

export const GetProcessRequest = {
  $type: "pb.v1alpha2.GetProcessRequest" as const,

  encode(message: GetProcessRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.processId !== undefined && message.processId !== "") {
      writer.uint32(10).string(message.processId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProcessRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProcessRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.processId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetProcessRequest {
    return {
      $type: GetProcessRequest.$type,
      processId: isSet(object.processId) ? globalThis.String(object.processId) : "",
    };
  },

  toJSON(message: GetProcessRequest): unknown {
    const obj: any = {};
    if (message.processId !== undefined && message.processId !== "") {
      obj.processId = message.processId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetProcessRequest>, I>>(base?: I): GetProcessRequest {
    return GetProcessRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetProcessRequest>, I>>(object: I): GetProcessRequest {
    const message = createBaseGetProcessRequest();
    message.processId = object.processId ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetProcessRequest.$type, GetProcessRequest);

function createBaseGetProcessResponse(): GetProcessResponse {
  return { $type: "pb.v1alpha2.GetProcessResponse", process: undefined };
}

export const GetProcessResponse = {
  $type: "pb.v1alpha2.GetProcessResponse" as const,

  encode(message: GetProcessResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.process !== undefined) {
      Process.encode(message.process, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProcessResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProcessResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.process = Process.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetProcessResponse {
    return {
      $type: GetProcessResponse.$type,
      process: isSet(object.process) ? Process.fromJSON(object.process) : undefined,
    };
  },

  toJSON(message: GetProcessResponse): unknown {
    const obj: any = {};
    if (message.process !== undefined) {
      obj.process = Process.toJSON(message.process);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetProcessResponse>, I>>(base?: I): GetProcessResponse {
    return GetProcessResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetProcessResponse>, I>>(object: I): GetProcessResponse {
    const message = createBaseGetProcessResponse();
    message.process = (object.process !== undefined && object.process !== null)
      ? Process.fromPartial(object.process)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetProcessResponse.$type, GetProcessResponse);

function createBaseListProcessesRequest(): ListProcessesRequest {
  return { $type: "pb.v1alpha2.ListProcessesRequest", pageSize: 0, pageNumber: 0 };
}

export const ListProcessesRequest = {
  $type: "pb.v1alpha2.ListProcessesRequest" as const,

  encode(message: ListProcessesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(32).int32(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(40).int32(message.pageNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListProcessesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListProcessesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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

  fromJSON(object: any): ListProcessesRequest {
    return {
      $type: ListProcessesRequest.$type,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
    };
  },

  toJSON(message: ListProcessesRequest): unknown {
    const obj: any = {};
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListProcessesRequest>, I>>(base?: I): ListProcessesRequest {
    return ListProcessesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListProcessesRequest>, I>>(object: I): ListProcessesRequest {
    const message = createBaseListProcessesRequest();
    message.pageSize = object.pageSize ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListProcessesRequest.$type, ListProcessesRequest);

function createBaseListProcessesResponse(): ListProcessesResponse {
  return { $type: "pb.v1alpha2.ListProcessesResponse", processes: [], totalCount: 0, userDefinedProcesses: [] };
}

export const ListProcessesResponse = {
  $type: "pb.v1alpha2.ListProcessesResponse" as const,

  encode(message: ListProcessesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.processes !== undefined && message.processes.length !== 0) {
      for (const v of message.processes) {
        Process.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalCount !== undefined && message.totalCount !== 0) {
      writer.uint32(16).int32(message.totalCount);
    }
    if (message.userDefinedProcesses !== undefined && message.userDefinedProcesses.length !== 0) {
      for (const v of message.userDefinedProcesses) {
        UserDefinedProcess.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListProcessesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListProcessesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.processes!.push(Process.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalCount = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.userDefinedProcesses!.push(UserDefinedProcess.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListProcessesResponse {
    return {
      $type: ListProcessesResponse.$type,
      processes: globalThis.Array.isArray(object?.processes)
        ? object.processes.map((e: any) => Process.fromJSON(e))
        : [],
      totalCount: isSet(object.totalCount) ? globalThis.Number(object.totalCount) : 0,
      userDefinedProcesses: globalThis.Array.isArray(object?.userDefinedProcesses)
        ? object.userDefinedProcesses.map((e: any) => UserDefinedProcess.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListProcessesResponse): unknown {
    const obj: any = {};
    if (message.processes?.length) {
      obj.processes = message.processes.map((e) => Process.toJSON(e));
    }
    if (message.totalCount !== undefined && message.totalCount !== 0) {
      obj.totalCount = Math.round(message.totalCount);
    }
    if (message.userDefinedProcesses?.length) {
      obj.userDefinedProcesses = message.userDefinedProcesses.map((e) => UserDefinedProcess.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListProcessesResponse>, I>>(base?: I): ListProcessesResponse {
    return ListProcessesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListProcessesResponse>, I>>(object: I): ListProcessesResponse {
    const message = createBaseListProcessesResponse();
    message.processes = object.processes?.map((e) => Process.fromPartial(e)) || [];
    message.totalCount = object.totalCount ?? 0;
    message.userDefinedProcesses = object.userDefinedProcesses?.map((e) => UserDefinedProcess.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ListProcessesResponse.$type, ListProcessesResponse);

function createBaseUpdateProcessRequest(): UpdateProcessRequest {
  return { $type: "pb.v1alpha2.UpdateProcessRequest", userDefinedProcess: undefined, updateMask: undefined };
}

export const UpdateProcessRequest = {
  $type: "pb.v1alpha2.UpdateProcessRequest" as const,

  encode(message: UpdateProcessRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userDefinedProcess !== undefined) {
      UserDefinedProcess.encode(message.userDefinedProcess, writer.uint32(10).fork()).ldelim();
    }
    if (message.updateMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.updateMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProcessRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateProcessRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userDefinedProcess = UserDefinedProcess.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.updateMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateProcessRequest {
    return {
      $type: UpdateProcessRequest.$type,
      userDefinedProcess: isSet(object.userDefinedProcess)
        ? UserDefinedProcess.fromJSON(object.userDefinedProcess)
        : undefined,
      updateMask: isSet(object.updateMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.updateMask)) : undefined,
    };
  },

  toJSON(message: UpdateProcessRequest): unknown {
    const obj: any = {};
    if (message.userDefinedProcess !== undefined) {
      obj.userDefinedProcess = UserDefinedProcess.toJSON(message.userDefinedProcess);
    }
    if (message.updateMask !== undefined) {
      obj.updateMask = FieldMask.toJSON(FieldMask.wrap(message.updateMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateProcessRequest>, I>>(base?: I): UpdateProcessRequest {
    return UpdateProcessRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateProcessRequest>, I>>(object: I): UpdateProcessRequest {
    const message = createBaseUpdateProcessRequest();
    message.userDefinedProcess = (object.userDefinedProcess !== undefined && object.userDefinedProcess !== null)
      ? UserDefinedProcess.fromPartial(object.userDefinedProcess)
      : undefined;
    message.updateMask = object.updateMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateProcessRequest.$type, UpdateProcessRequest);

function createBaseUpdateProcessResponse(): UpdateProcessResponse {
  return { $type: "pb.v1alpha2.UpdateProcessResponse", userDefinedProcess: undefined };
}

export const UpdateProcessResponse = {
  $type: "pb.v1alpha2.UpdateProcessResponse" as const,

  encode(message: UpdateProcessResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userDefinedProcess !== undefined) {
      UserDefinedProcess.encode(message.userDefinedProcess, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProcessResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateProcessResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userDefinedProcess = UserDefinedProcess.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateProcessResponse {
    return {
      $type: UpdateProcessResponse.$type,
      userDefinedProcess: isSet(object.userDefinedProcess)
        ? UserDefinedProcess.fromJSON(object.userDefinedProcess)
        : undefined,
    };
  },

  toJSON(message: UpdateProcessResponse): unknown {
    const obj: any = {};
    if (message.userDefinedProcess !== undefined) {
      obj.userDefinedProcess = UserDefinedProcess.toJSON(message.userDefinedProcess);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateProcessResponse>, I>>(base?: I): UpdateProcessResponse {
    return UpdateProcessResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateProcessResponse>, I>>(object: I): UpdateProcessResponse {
    const message = createBaseUpdateProcessResponse();
    message.userDefinedProcess = (object.userDefinedProcess !== undefined && object.userDefinedProcess !== null)
      ? UserDefinedProcess.fromPartial(object.userDefinedProcess)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateProcessResponse.$type, UpdateProcessResponse);

function createBaseDeleteProcessRequest(): DeleteProcessRequest {
  return { $type: "pb.v1alpha2.DeleteProcessRequest", processId: "" };
}

export const DeleteProcessRequest = {
  $type: "pb.v1alpha2.DeleteProcessRequest" as const,

  encode(message: DeleteProcessRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.processId !== undefined && message.processId !== "") {
      writer.uint32(10).string(message.processId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteProcessRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteProcessRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.processId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteProcessRequest {
    return {
      $type: DeleteProcessRequest.$type,
      processId: isSet(object.processId) ? globalThis.String(object.processId) : "",
    };
  },

  toJSON(message: DeleteProcessRequest): unknown {
    const obj: any = {};
    if (message.processId !== undefined && message.processId !== "") {
      obj.processId = message.processId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteProcessRequest>, I>>(base?: I): DeleteProcessRequest {
    return DeleteProcessRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteProcessRequest>, I>>(object: I): DeleteProcessRequest {
    const message = createBaseDeleteProcessRequest();
    message.processId = object.processId ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteProcessRequest.$type, DeleteProcessRequest);

function createBaseApplicationAttributes(): ApplicationAttributes {
  return { $type: "pb.v1alpha2.ApplicationAttributes", application: "", attributes: [] };
}

export const ApplicationAttributes = {
  $type: "pb.v1alpha2.ApplicationAttributes" as const,

  encode(message: ApplicationAttributes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.application !== undefined && message.application !== "") {
      writer.uint32(10).string(message.application);
    }
    if (message.attributes !== undefined && message.attributes.length !== 0) {
      for (const v of message.attributes) {
        Attribute.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApplicationAttributes {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApplicationAttributes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.application = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.attributes!.push(Attribute.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ApplicationAttributes {
    return {
      $type: ApplicationAttributes.$type,
      application: isSet(object.application) ? globalThis.String(object.application) : "",
      attributes: globalThis.Array.isArray(object?.attributes)
        ? object.attributes.map((e: any) => Attribute.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ApplicationAttributes): unknown {
    const obj: any = {};
    if (message.application !== undefined && message.application !== "") {
      obj.application = message.application;
    }
    if (message.attributes?.length) {
      obj.attributes = message.attributes.map((e) => Attribute.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApplicationAttributes>, I>>(base?: I): ApplicationAttributes {
    return ApplicationAttributes.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApplicationAttributes>, I>>(object: I): ApplicationAttributes {
    const message = createBaseApplicationAttributes();
    message.application = object.application ?? "";
    message.attributes = object.attributes?.map((e) => Attribute.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ApplicationAttributes.$type, ApplicationAttributes);

export interface ProcessDiscovery {
  CreateProcess(request: DeepPartial<CreateProcessRequest>, metadata?: grpc.Metadata): Promise<CreateProcessResponse>;
  GetProcess(request: DeepPartial<GetProcessRequest>, metadata?: grpc.Metadata): Promise<GetProcessResponse>;
  ListProcesses(request: DeepPartial<ListProcessesRequest>, metadata?: grpc.Metadata): Promise<ListProcessesResponse>;
  UpdateProcess(request: DeepPartial<UpdateProcessRequest>, metadata?: grpc.Metadata): Promise<UpdateProcessResponse>;
  DeleteProcess(request: DeepPartial<DeleteProcessRequest>, metadata?: grpc.Metadata): Promise<Empty>;
}

export class ProcessDiscoveryClientImpl implements ProcessDiscovery {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateProcess = this.CreateProcess.bind(this);
    this.GetProcess = this.GetProcess.bind(this);
    this.ListProcesses = this.ListProcesses.bind(this);
    this.UpdateProcess = this.UpdateProcess.bind(this);
    this.DeleteProcess = this.DeleteProcess.bind(this);
  }

  CreateProcess(request: DeepPartial<CreateProcessRequest>, metadata?: grpc.Metadata): Promise<CreateProcessResponse> {
    return this.rpc.unary(ProcessDiscoveryCreateProcessDesc, CreateProcessRequest.fromPartial(request), metadata);
  }

  GetProcess(request: DeepPartial<GetProcessRequest>, metadata?: grpc.Metadata): Promise<GetProcessResponse> {
    return this.rpc.unary(ProcessDiscoveryGetProcessDesc, GetProcessRequest.fromPartial(request), metadata);
  }

  ListProcesses(request: DeepPartial<ListProcessesRequest>, metadata?: grpc.Metadata): Promise<ListProcessesResponse> {
    return this.rpc.unary(ProcessDiscoveryListProcessesDesc, ListProcessesRequest.fromPartial(request), metadata);
  }

  UpdateProcess(request: DeepPartial<UpdateProcessRequest>, metadata?: grpc.Metadata): Promise<UpdateProcessResponse> {
    return this.rpc.unary(ProcessDiscoveryUpdateProcessDesc, UpdateProcessRequest.fromPartial(request), metadata);
  }

  DeleteProcess(request: DeepPartial<DeleteProcessRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(ProcessDiscoveryDeleteProcessDesc, DeleteProcessRequest.fromPartial(request), metadata);
  }
}

export const ProcessDiscoveryDesc = { serviceName: "pb.v1alpha2.ProcessDiscovery" };

export const ProcessDiscoveryCreateProcessDesc: UnaryMethodDefinitionish = {
  methodName: "CreateProcess",
  service: ProcessDiscoveryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateProcessRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateProcessResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ProcessDiscoveryGetProcessDesc: UnaryMethodDefinitionish = {
  methodName: "GetProcess",
  service: ProcessDiscoveryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetProcessRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetProcessResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ProcessDiscoveryListProcessesDesc: UnaryMethodDefinitionish = {
  methodName: "ListProcesses",
  service: ProcessDiscoveryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListProcessesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListProcessesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ProcessDiscoveryUpdateProcessDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateProcess",
  service: ProcessDiscoveryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateProcessRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateProcessResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ProcessDiscoveryDeleteProcessDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteProcess",
  service: ProcessDiscoveryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteProcessRequest.encode(this).finish();
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

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { $type: "google.protobuf.Timestamp", seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
