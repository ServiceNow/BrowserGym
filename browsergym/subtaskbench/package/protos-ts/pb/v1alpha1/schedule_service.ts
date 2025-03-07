/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { SortField } from "../../common/data_query_params";
import { Empty } from "../../google/protobuf/empty";
import { FieldMask } from "../../google/protobuf/field_mask";
import { messageTypeRegistry } from "../../typeRegistry";
import { Schedule } from "./schedule";

export const protobufPackage = "pb.v1alpha1";

export interface CreateScheduleRequest {
  $type?: "pb.v1alpha1.CreateScheduleRequest";
  schedule?: Schedule | undefined;
}

export interface GetScheduleRequest {
  $type?: "pb.v1alpha1.GetScheduleRequest";
  id?: string | undefined;
  orgId?: string | undefined;
}

export interface UpdateScheduleRequest {
  $type?: "pb.v1alpha1.UpdateScheduleRequest";
  schedule?:
    | Schedule
    | undefined;
  /** The fields that can be updated are: start_time, end_time, config, status. */
  fieldMask?: string[] | undefined;
}

export interface DeleteScheduleRequest {
  $type?: "pb.v1alpha1.DeleteScheduleRequest";
  id?: string | undefined;
  orgId?: string | undefined;
}

export interface ListSchedulesRequest {
  $type?: "pb.v1alpha1.ListSchedulesRequest";
  orgId?: string | undefined;
  filter?: ListScheduleFilter | undefined;
  pageNumber?: number | undefined;
  pageSize?:
    | number
    | undefined;
  /**
   * Use this to send only relevant data in response
   * - If field Mask is not send or is sent with empty paths then the result will contain
   *   the complete object
   * Valid values are start_time,end_time,create_time,last_update_time,config
   */
  fieldMask?:
    | string[]
    | undefined;
  /**
   * The order of fields will effect the sorting order.
   * Supported fields: create_time, last_update_time, start_time, end_time
   */
  sort?: SortField[] | undefined;
}

export interface ListScheduleFilter {
  $type?: "pb.v1alpha1.ListScheduleFilter";
  /** Optional */
  workflowId?:
    | string
    | undefined;
  /** Allowed values are {none|daily|weekly|monthly} */
  recurrencePatterns?: string[] | undefined;
  creatorUsernames?: string[] | undefined;
}

export interface ListSchedulesResponse {
  $type?: "pb.v1alpha1.ListSchedulesResponse";
  schedules?: Schedule[] | undefined;
  totalSize?: number | undefined;
}

function createBaseCreateScheduleRequest(): CreateScheduleRequest {
  return { $type: "pb.v1alpha1.CreateScheduleRequest", schedule: undefined };
}

export const CreateScheduleRequest = {
  $type: "pb.v1alpha1.CreateScheduleRequest" as const,

  encode(message: CreateScheduleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schedule !== undefined) {
      Schedule.encode(message.schedule, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateScheduleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateScheduleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.schedule = Schedule.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateScheduleRequest {
    return {
      $type: CreateScheduleRequest.$type,
      schedule: isSet(object.schedule) ? Schedule.fromJSON(object.schedule) : undefined,
    };
  },

  toJSON(message: CreateScheduleRequest): unknown {
    const obj: any = {};
    if (message.schedule !== undefined) {
      obj.schedule = Schedule.toJSON(message.schedule);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateScheduleRequest>, I>>(base?: I): CreateScheduleRequest {
    return CreateScheduleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateScheduleRequest>, I>>(object: I): CreateScheduleRequest {
    const message = createBaseCreateScheduleRequest();
    message.schedule = (object.schedule !== undefined && object.schedule !== null)
      ? Schedule.fromPartial(object.schedule)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateScheduleRequest.$type, CreateScheduleRequest);

function createBaseGetScheduleRequest(): GetScheduleRequest {
  return { $type: "pb.v1alpha1.GetScheduleRequest", id: "", orgId: "" };
}

export const GetScheduleRequest = {
  $type: "pb.v1alpha1.GetScheduleRequest" as const,

  encode(message: GetScheduleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetScheduleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetScheduleRequest();
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

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetScheduleRequest {
    return {
      $type: GetScheduleRequest.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
    };
  },

  toJSON(message: GetScheduleRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetScheduleRequest>, I>>(base?: I): GetScheduleRequest {
    return GetScheduleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetScheduleRequest>, I>>(object: I): GetScheduleRequest {
    const message = createBaseGetScheduleRequest();
    message.id = object.id ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetScheduleRequest.$type, GetScheduleRequest);

function createBaseUpdateScheduleRequest(): UpdateScheduleRequest {
  return { $type: "pb.v1alpha1.UpdateScheduleRequest", schedule: undefined, fieldMask: undefined };
}

export const UpdateScheduleRequest = {
  $type: "pb.v1alpha1.UpdateScheduleRequest" as const,

  encode(message: UpdateScheduleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schedule !== undefined) {
      Schedule.encode(message.schedule, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateScheduleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateScheduleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.schedule = Schedule.decode(reader, reader.uint32());
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

  fromJSON(object: any): UpdateScheduleRequest {
    return {
      $type: UpdateScheduleRequest.$type,
      schedule: isSet(object.schedule) ? Schedule.fromJSON(object.schedule) : undefined,
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: UpdateScheduleRequest): unknown {
    const obj: any = {};
    if (message.schedule !== undefined) {
      obj.schedule = Schedule.toJSON(message.schedule);
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateScheduleRequest>, I>>(base?: I): UpdateScheduleRequest {
    return UpdateScheduleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateScheduleRequest>, I>>(object: I): UpdateScheduleRequest {
    const message = createBaseUpdateScheduleRequest();
    message.schedule = (object.schedule !== undefined && object.schedule !== null)
      ? Schedule.fromPartial(object.schedule)
      : undefined;
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateScheduleRequest.$type, UpdateScheduleRequest);

function createBaseDeleteScheduleRequest(): DeleteScheduleRequest {
  return { $type: "pb.v1alpha1.DeleteScheduleRequest", id: "", orgId: "" };
}

export const DeleteScheduleRequest = {
  $type: "pb.v1alpha1.DeleteScheduleRequest" as const,

  encode(message: DeleteScheduleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteScheduleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteScheduleRequest();
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

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteScheduleRequest {
    return {
      $type: DeleteScheduleRequest.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
    };
  },

  toJSON(message: DeleteScheduleRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteScheduleRequest>, I>>(base?: I): DeleteScheduleRequest {
    return DeleteScheduleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteScheduleRequest>, I>>(object: I): DeleteScheduleRequest {
    const message = createBaseDeleteScheduleRequest();
    message.id = object.id ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteScheduleRequest.$type, DeleteScheduleRequest);

function createBaseListSchedulesRequest(): ListSchedulesRequest {
  return {
    $type: "pb.v1alpha1.ListSchedulesRequest",
    orgId: "",
    filter: undefined,
    pageNumber: 0,
    pageSize: 0,
    fieldMask: undefined,
    sort: [],
  };
}

export const ListSchedulesRequest = {
  $type: "pb.v1alpha1.ListSchedulesRequest" as const,

  encode(message: ListSchedulesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.filter !== undefined) {
      ListScheduleFilter.encode(message.filter, writer.uint32(18).fork()).ldelim();
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(24).int32(message.pageNumber);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(32).int32(message.pageSize);
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(42).fork()).ldelim();
    }
    if (message.sort !== undefined && message.sort.length !== 0) {
      for (const v of message.sort) {
        SortField.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSchedulesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSchedulesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.filter = ListScheduleFilter.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pageNumber = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.sort!.push(SortField.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListSchedulesRequest {
    return {
      $type: ListSchedulesRequest.$type,
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      filter: isSet(object.filter) ? ListScheduleFilter.fromJSON(object.filter) : undefined,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
      sort: globalThis.Array.isArray(object?.sort) ? object.sort.map((e: any) => SortField.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListSchedulesRequest): unknown {
    const obj: any = {};
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.filter !== undefined) {
      obj.filter = ListScheduleFilter.toJSON(message.filter);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    if (message.sort?.length) {
      obj.sort = message.sort.map((e) => SortField.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSchedulesRequest>, I>>(base?: I): ListSchedulesRequest {
    return ListSchedulesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListSchedulesRequest>, I>>(object: I): ListSchedulesRequest {
    const message = createBaseListSchedulesRequest();
    message.orgId = object.orgId ?? "";
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? ListScheduleFilter.fromPartial(object.filter)
      : undefined;
    message.pageNumber = object.pageNumber ?? 0;
    message.pageSize = object.pageSize ?? 0;
    message.fieldMask = object.fieldMask ?? undefined;
    message.sort = object.sort?.map((e) => SortField.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ListSchedulesRequest.$type, ListSchedulesRequest);

function createBaseListScheduleFilter(): ListScheduleFilter {
  return { $type: "pb.v1alpha1.ListScheduleFilter", workflowId: "", recurrencePatterns: [], creatorUsernames: [] };
}

export const ListScheduleFilter = {
  $type: "pb.v1alpha1.ListScheduleFilter" as const,

  encode(message: ListScheduleFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(10).string(message.workflowId);
    }
    if (message.recurrencePatterns !== undefined && message.recurrencePatterns.length !== 0) {
      for (const v of message.recurrencePatterns) {
        writer.uint32(18).string(v!);
      }
    }
    if (message.creatorUsernames !== undefined && message.creatorUsernames.length !== 0) {
      for (const v of message.creatorUsernames) {
        writer.uint32(26).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListScheduleFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListScheduleFilter();
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

          message.recurrencePatterns!.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.creatorUsernames!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListScheduleFilter {
    return {
      $type: ListScheduleFilter.$type,
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      recurrencePatterns: globalThis.Array.isArray(object?.recurrencePatterns)
        ? object.recurrencePatterns.map((e: any) => globalThis.String(e))
        : [],
      creatorUsernames: globalThis.Array.isArray(object?.creatorUsernames)
        ? object.creatorUsernames.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: ListScheduleFilter): unknown {
    const obj: any = {};
    if (message.workflowId !== undefined && message.workflowId !== "") {
      obj.workflowId = message.workflowId;
    }
    if (message.recurrencePatterns?.length) {
      obj.recurrencePatterns = message.recurrencePatterns;
    }
    if (message.creatorUsernames?.length) {
      obj.creatorUsernames = message.creatorUsernames;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListScheduleFilter>, I>>(base?: I): ListScheduleFilter {
    return ListScheduleFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListScheduleFilter>, I>>(object: I): ListScheduleFilter {
    const message = createBaseListScheduleFilter();
    message.workflowId = object.workflowId ?? "";
    message.recurrencePatterns = object.recurrencePatterns?.map((e) => e) || [];
    message.creatorUsernames = object.creatorUsernames?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(ListScheduleFilter.$type, ListScheduleFilter);

function createBaseListSchedulesResponse(): ListSchedulesResponse {
  return { $type: "pb.v1alpha1.ListSchedulesResponse", schedules: [], totalSize: 0 };
}

export const ListSchedulesResponse = {
  $type: "pb.v1alpha1.ListSchedulesResponse" as const,

  encode(message: ListSchedulesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schedules !== undefined && message.schedules.length !== 0) {
      for (const v of message.schedules) {
        Schedule.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(16).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSchedulesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSchedulesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.schedules!.push(Schedule.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListSchedulesResponse {
    return {
      $type: ListSchedulesResponse.$type,
      schedules: globalThis.Array.isArray(object?.schedules)
        ? object.schedules.map((e: any) => Schedule.fromJSON(e))
        : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListSchedulesResponse): unknown {
    const obj: any = {};
    if (message.schedules?.length) {
      obj.schedules = message.schedules.map((e) => Schedule.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSchedulesResponse>, I>>(base?: I): ListSchedulesResponse {
    return ListSchedulesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListSchedulesResponse>, I>>(object: I): ListSchedulesResponse {
    const message = createBaseListSchedulesResponse();
    message.schedules = object.schedules?.map((e) => Schedule.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListSchedulesResponse.$type, ListSchedulesResponse);

export interface Schedules {
  CreateSchedule(request: DeepPartial<CreateScheduleRequest>, metadata?: grpc.Metadata): Promise<Schedule>;
  GetSchedule(request: DeepPartial<GetScheduleRequest>, metadata?: grpc.Metadata): Promise<Schedule>;
  UpdateSchedule(request: DeepPartial<UpdateScheduleRequest>, metadata?: grpc.Metadata): Promise<Schedule>;
  DeleteSchedule(request: DeepPartial<DeleteScheduleRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  ListSchedules(request: DeepPartial<ListSchedulesRequest>, metadata?: grpc.Metadata): Promise<ListSchedulesResponse>;
}

export class SchedulesClientImpl implements Schedules {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateSchedule = this.CreateSchedule.bind(this);
    this.GetSchedule = this.GetSchedule.bind(this);
    this.UpdateSchedule = this.UpdateSchedule.bind(this);
    this.DeleteSchedule = this.DeleteSchedule.bind(this);
    this.ListSchedules = this.ListSchedules.bind(this);
  }

  CreateSchedule(request: DeepPartial<CreateScheduleRequest>, metadata?: grpc.Metadata): Promise<Schedule> {
    return this.rpc.unary(SchedulesCreateScheduleDesc, CreateScheduleRequest.fromPartial(request), metadata);
  }

  GetSchedule(request: DeepPartial<GetScheduleRequest>, metadata?: grpc.Metadata): Promise<Schedule> {
    return this.rpc.unary(SchedulesGetScheduleDesc, GetScheduleRequest.fromPartial(request), metadata);
  }

  UpdateSchedule(request: DeepPartial<UpdateScheduleRequest>, metadata?: grpc.Metadata): Promise<Schedule> {
    return this.rpc.unary(SchedulesUpdateScheduleDesc, UpdateScheduleRequest.fromPartial(request), metadata);
  }

  DeleteSchedule(request: DeepPartial<DeleteScheduleRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(SchedulesDeleteScheduleDesc, DeleteScheduleRequest.fromPartial(request), metadata);
  }

  ListSchedules(request: DeepPartial<ListSchedulesRequest>, metadata?: grpc.Metadata): Promise<ListSchedulesResponse> {
    return this.rpc.unary(SchedulesListSchedulesDesc, ListSchedulesRequest.fromPartial(request), metadata);
  }
}

export const SchedulesDesc = { serviceName: "pb.v1alpha1.Schedules" };

export const SchedulesCreateScheduleDesc: UnaryMethodDefinitionish = {
  methodName: "CreateSchedule",
  service: SchedulesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateScheduleRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Schedule.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SchedulesGetScheduleDesc: UnaryMethodDefinitionish = {
  methodName: "GetSchedule",
  service: SchedulesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetScheduleRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Schedule.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SchedulesUpdateScheduleDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateSchedule",
  service: SchedulesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateScheduleRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Schedule.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SchedulesDeleteScheduleDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteSchedule",
  service: SchedulesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteScheduleRequest.encode(this).finish();
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

export const SchedulesListSchedulesDesc: UnaryMethodDefinitionish = {
  methodName: "ListSchedules",
  service: SchedulesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListSchedulesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListSchedulesResponse.decode(data);
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
