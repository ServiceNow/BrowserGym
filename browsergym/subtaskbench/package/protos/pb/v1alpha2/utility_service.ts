/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { EmailLabel, GmailLabel } from "../../automation_mining/ontology/data_models";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha2";

/** Do not use: For backward compatibility, will be removed once all logic is migrated to GetEmailLabelsRequest. */
export interface GetGmailLabelsRequest {
  $type?: "pb.v1alpha2.GetGmailLabelsRequest";
}

export interface GetEmailLabelsRequest {
  $type?: "pb.v1alpha2.GetEmailLabelsRequest";
  mailType?: GetEmailLabelsRequestMailType | undefined;
}

export enum GetEmailLabelsRequestMailType {
  /** UNSPECIFIED - Default value if none is specified. */
  UNSPECIFIED = 0,
  GMAIL = 1,
  OUTLOOK = 2,
  UNRECOGNIZED = -1,
}

export function getEmailLabelsRequestMailTypeFromJSON(object: any): GetEmailLabelsRequestMailType {
  switch (object) {
    case 0:
    case "MAIL_TYPE_UNSPECIFIED":
      return GetEmailLabelsRequestMailType.UNSPECIFIED;
    case 1:
    case "MAIL_TYPE_GMAIL":
      return GetEmailLabelsRequestMailType.GMAIL;
    case 2:
    case "MAIL_TYPE_OUTLOOK":
      return GetEmailLabelsRequestMailType.OUTLOOK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetEmailLabelsRequestMailType.UNRECOGNIZED;
  }
}

export function getEmailLabelsRequestMailTypeToJSON(object: GetEmailLabelsRequestMailType): string {
  switch (object) {
    case GetEmailLabelsRequestMailType.UNSPECIFIED:
      return "MAIL_TYPE_UNSPECIFIED";
    case GetEmailLabelsRequestMailType.GMAIL:
      return "MAIL_TYPE_GMAIL";
    case GetEmailLabelsRequestMailType.OUTLOOK:
      return "MAIL_TYPE_OUTLOOK";
    case GetEmailLabelsRequestMailType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Do not use: For backward compatibility, will be removed once all logic is migrated to GetEmailLabelsResponse. */
export interface GetGmailLabelsResponse {
  $type?: "pb.v1alpha2.GetGmailLabelsResponse";
  labels?: GmailLabel[] | undefined;
}

export interface GetEmailLabelsResponse {
  $type?: "pb.v1alpha2.GetEmailLabelsResponse";
  labels?: EmailLabel[] | undefined;
}

export interface GetScheduleTasksRequest {
  $type?: "pb.v1alpha2.GetScheduleTasksRequest";
  orgResourceName?: string | undefined;
  pageNo?: number | undefined;
}

export interface GetScheduleTasksResponse {
  $type?: "pb.v1alpha2.GetScheduleTasksResponse";
  tasks?: ScheduleTask[] | undefined;
}

export interface ScheduleTask {
  $type?: "pb.v1alpha2.ScheduleTask";
  name?: string | undefined;
  uploadTime?: Date | undefined;
  orbyScheduledTime?: Date | undefined;
  workflowName?: string | undefined;
  priority?: number | undefined;
  status?: string | undefined;
}

export interface GetSignedGCSUriRequest {
  $type?: "pb.v1alpha2.GetSignedGCSUriRequest";
  uri?: string | undefined;
}

export interface GetSignedGCSUriResponse {
  $type?: "pb.v1alpha2.GetSignedGCSUriResponse";
  signedUri?: string | undefined;
}

function createBaseGetGmailLabelsRequest(): GetGmailLabelsRequest {
  return { $type: "pb.v1alpha2.GetGmailLabelsRequest" };
}

export const GetGmailLabelsRequest = {
  $type: "pb.v1alpha2.GetGmailLabelsRequest" as const,

  encode(_: GetGmailLabelsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGmailLabelsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGmailLabelsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): GetGmailLabelsRequest {
    return { $type: GetGmailLabelsRequest.$type };
  },

  toJSON(_: GetGmailLabelsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetGmailLabelsRequest>, I>>(base?: I): GetGmailLabelsRequest {
    return GetGmailLabelsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetGmailLabelsRequest>, I>>(_: I): GetGmailLabelsRequest {
    const message = createBaseGetGmailLabelsRequest();
    return message;
  },
};

messageTypeRegistry.set(GetGmailLabelsRequest.$type, GetGmailLabelsRequest);

function createBaseGetEmailLabelsRequest(): GetEmailLabelsRequest {
  return { $type: "pb.v1alpha2.GetEmailLabelsRequest", mailType: 0 };
}

export const GetEmailLabelsRequest = {
  $type: "pb.v1alpha2.GetEmailLabelsRequest" as const,

  encode(message: GetEmailLabelsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mailType !== undefined && message.mailType !== 0) {
      writer.uint32(8).int32(message.mailType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetEmailLabelsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEmailLabelsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.mailType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetEmailLabelsRequest {
    return {
      $type: GetEmailLabelsRequest.$type,
      mailType: isSet(object.mailType) ? getEmailLabelsRequestMailTypeFromJSON(object.mailType) : 0,
    };
  },

  toJSON(message: GetEmailLabelsRequest): unknown {
    const obj: any = {};
    if (message.mailType !== undefined && message.mailType !== 0) {
      obj.mailType = getEmailLabelsRequestMailTypeToJSON(message.mailType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetEmailLabelsRequest>, I>>(base?: I): GetEmailLabelsRequest {
    return GetEmailLabelsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetEmailLabelsRequest>, I>>(object: I): GetEmailLabelsRequest {
    const message = createBaseGetEmailLabelsRequest();
    message.mailType = object.mailType ?? 0;
    return message;
  },
};

messageTypeRegistry.set(GetEmailLabelsRequest.$type, GetEmailLabelsRequest);

function createBaseGetGmailLabelsResponse(): GetGmailLabelsResponse {
  return { $type: "pb.v1alpha2.GetGmailLabelsResponse", labels: [] };
}

export const GetGmailLabelsResponse = {
  $type: "pb.v1alpha2.GetGmailLabelsResponse" as const,

  encode(message: GetGmailLabelsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.labels !== undefined && message.labels.length !== 0) {
      for (const v of message.labels) {
        GmailLabel.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGmailLabelsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGmailLabelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.labels!.push(GmailLabel.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetGmailLabelsResponse {
    return {
      $type: GetGmailLabelsResponse.$type,
      labels: globalThis.Array.isArray(object?.labels) ? object.labels.map((e: any) => GmailLabel.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetGmailLabelsResponse): unknown {
    const obj: any = {};
    if (message.labels?.length) {
      obj.labels = message.labels.map((e) => GmailLabel.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetGmailLabelsResponse>, I>>(base?: I): GetGmailLabelsResponse {
    return GetGmailLabelsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetGmailLabelsResponse>, I>>(object: I): GetGmailLabelsResponse {
    const message = createBaseGetGmailLabelsResponse();
    message.labels = object.labels?.map((e) => GmailLabel.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetGmailLabelsResponse.$type, GetGmailLabelsResponse);

function createBaseGetEmailLabelsResponse(): GetEmailLabelsResponse {
  return { $type: "pb.v1alpha2.GetEmailLabelsResponse", labels: [] };
}

export const GetEmailLabelsResponse = {
  $type: "pb.v1alpha2.GetEmailLabelsResponse" as const,

  encode(message: GetEmailLabelsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.labels !== undefined && message.labels.length !== 0) {
      for (const v of message.labels) {
        EmailLabel.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetEmailLabelsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEmailLabelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.labels!.push(EmailLabel.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetEmailLabelsResponse {
    return {
      $type: GetEmailLabelsResponse.$type,
      labels: globalThis.Array.isArray(object?.labels) ? object.labels.map((e: any) => EmailLabel.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetEmailLabelsResponse): unknown {
    const obj: any = {};
    if (message.labels?.length) {
      obj.labels = message.labels.map((e) => EmailLabel.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetEmailLabelsResponse>, I>>(base?: I): GetEmailLabelsResponse {
    return GetEmailLabelsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetEmailLabelsResponse>, I>>(object: I): GetEmailLabelsResponse {
    const message = createBaseGetEmailLabelsResponse();
    message.labels = object.labels?.map((e) => EmailLabel.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetEmailLabelsResponse.$type, GetEmailLabelsResponse);

function createBaseGetScheduleTasksRequest(): GetScheduleTasksRequest {
  return { $type: "pb.v1alpha2.GetScheduleTasksRequest", orgResourceName: "", pageNo: 0 };
}

export const GetScheduleTasksRequest = {
  $type: "pb.v1alpha2.GetScheduleTasksRequest" as const,

  encode(message: GetScheduleTasksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(10).string(message.orgResourceName);
    }
    if (message.pageNo !== undefined && message.pageNo !== 0) {
      writer.uint32(16).int32(message.pageNo);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetScheduleTasksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetScheduleTasksRequest();
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
          if (tag !== 16) {
            break;
          }

          message.pageNo = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetScheduleTasksRequest {
    return {
      $type: GetScheduleTasksRequest.$type,
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      pageNo: isSet(object.pageNo) ? globalThis.Number(object.pageNo) : 0,
    };
  },

  toJSON(message: GetScheduleTasksRequest): unknown {
    const obj: any = {};
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.pageNo !== undefined && message.pageNo !== 0) {
      obj.pageNo = Math.round(message.pageNo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetScheduleTasksRequest>, I>>(base?: I): GetScheduleTasksRequest {
    return GetScheduleTasksRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetScheduleTasksRequest>, I>>(object: I): GetScheduleTasksRequest {
    const message = createBaseGetScheduleTasksRequest();
    message.orgResourceName = object.orgResourceName ?? "";
    message.pageNo = object.pageNo ?? 0;
    return message;
  },
};

messageTypeRegistry.set(GetScheduleTasksRequest.$type, GetScheduleTasksRequest);

function createBaseGetScheduleTasksResponse(): GetScheduleTasksResponse {
  return { $type: "pb.v1alpha2.GetScheduleTasksResponse", tasks: [] };
}

export const GetScheduleTasksResponse = {
  $type: "pb.v1alpha2.GetScheduleTasksResponse" as const,

  encode(message: GetScheduleTasksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tasks !== undefined && message.tasks.length !== 0) {
      for (const v of message.tasks) {
        ScheduleTask.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetScheduleTasksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetScheduleTasksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tasks!.push(ScheduleTask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetScheduleTasksResponse {
    return {
      $type: GetScheduleTasksResponse.$type,
      tasks: globalThis.Array.isArray(object?.tasks) ? object.tasks.map((e: any) => ScheduleTask.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetScheduleTasksResponse): unknown {
    const obj: any = {};
    if (message.tasks?.length) {
      obj.tasks = message.tasks.map((e) => ScheduleTask.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetScheduleTasksResponse>, I>>(base?: I): GetScheduleTasksResponse {
    return GetScheduleTasksResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetScheduleTasksResponse>, I>>(object: I): GetScheduleTasksResponse {
    const message = createBaseGetScheduleTasksResponse();
    message.tasks = object.tasks?.map((e) => ScheduleTask.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetScheduleTasksResponse.$type, GetScheduleTasksResponse);

function createBaseScheduleTask(): ScheduleTask {
  return {
    $type: "pb.v1alpha2.ScheduleTask",
    name: "",
    uploadTime: undefined,
    orbyScheduledTime: undefined,
    workflowName: "",
    priority: 0,
    status: "",
  };
}

export const ScheduleTask = {
  $type: "pb.v1alpha2.ScheduleTask" as const,

  encode(message: ScheduleTask, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.uploadTime !== undefined) {
      Timestamp.encode(toTimestamp(message.uploadTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.orbyScheduledTime !== undefined) {
      Timestamp.encode(toTimestamp(message.orbyScheduledTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.workflowName !== undefined && message.workflowName !== "") {
      writer.uint32(34).string(message.workflowName);
    }
    if (message.priority !== undefined && message.priority !== 0) {
      writer.uint32(40).int64(message.priority);
    }
    if (message.status !== undefined && message.status !== "") {
      writer.uint32(50).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScheduleTask {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduleTask();
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

          message.uploadTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.orbyScheduledTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.workflowName = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.priority = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScheduleTask {
    return {
      $type: ScheduleTask.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      uploadTime: isSet(object.uploadTime) ? fromJsonTimestamp(object.uploadTime) : undefined,
      orbyScheduledTime: isSet(object.orbyScheduledTime) ? fromJsonTimestamp(object.orbyScheduledTime) : undefined,
      workflowName: isSet(object.workflowName) ? globalThis.String(object.workflowName) : "",
      priority: isSet(object.priority) ? globalThis.Number(object.priority) : 0,
      status: isSet(object.status) ? globalThis.String(object.status) : "",
    };
  },

  toJSON(message: ScheduleTask): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.uploadTime !== undefined) {
      obj.uploadTime = message.uploadTime.toISOString();
    }
    if (message.orbyScheduledTime !== undefined) {
      obj.orbyScheduledTime = message.orbyScheduledTime.toISOString();
    }
    if (message.workflowName !== undefined && message.workflowName !== "") {
      obj.workflowName = message.workflowName;
    }
    if (message.priority !== undefined && message.priority !== 0) {
      obj.priority = Math.round(message.priority);
    }
    if (message.status !== undefined && message.status !== "") {
      obj.status = message.status;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ScheduleTask>, I>>(base?: I): ScheduleTask {
    return ScheduleTask.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScheduleTask>, I>>(object: I): ScheduleTask {
    const message = createBaseScheduleTask();
    message.name = object.name ?? "";
    message.uploadTime = object.uploadTime ?? undefined;
    message.orbyScheduledTime = object.orbyScheduledTime ?? undefined;
    message.workflowName = object.workflowName ?? "";
    message.priority = object.priority ?? 0;
    message.status = object.status ?? "";
    return message;
  },
};

messageTypeRegistry.set(ScheduleTask.$type, ScheduleTask);

function createBaseGetSignedGCSUriRequest(): GetSignedGCSUriRequest {
  return { $type: "pb.v1alpha2.GetSignedGCSUriRequest", uri: "" };
}

export const GetSignedGCSUriRequest = {
  $type: "pb.v1alpha2.GetSignedGCSUriRequest" as const,

  encode(message: GetSignedGCSUriRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uri !== undefined && message.uri !== "") {
      writer.uint32(10).string(message.uri);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSignedGCSUriRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSignedGCSUriRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uri = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSignedGCSUriRequest {
    return { $type: GetSignedGCSUriRequest.$type, uri: isSet(object.uri) ? globalThis.String(object.uri) : "" };
  },

  toJSON(message: GetSignedGCSUriRequest): unknown {
    const obj: any = {};
    if (message.uri !== undefined && message.uri !== "") {
      obj.uri = message.uri;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSignedGCSUriRequest>, I>>(base?: I): GetSignedGCSUriRequest {
    return GetSignedGCSUriRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSignedGCSUriRequest>, I>>(object: I): GetSignedGCSUriRequest {
    const message = createBaseGetSignedGCSUriRequest();
    message.uri = object.uri ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetSignedGCSUriRequest.$type, GetSignedGCSUriRequest);

function createBaseGetSignedGCSUriResponse(): GetSignedGCSUriResponse {
  return { $type: "pb.v1alpha2.GetSignedGCSUriResponse", signedUri: "" };
}

export const GetSignedGCSUriResponse = {
  $type: "pb.v1alpha2.GetSignedGCSUriResponse" as const,

  encode(message: GetSignedGCSUriResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signedUri !== undefined && message.signedUri !== "") {
      writer.uint32(10).string(message.signedUri);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSignedGCSUriResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSignedGCSUriResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signedUri = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSignedGCSUriResponse {
    return {
      $type: GetSignedGCSUriResponse.$type,
      signedUri: isSet(object.signedUri) ? globalThis.String(object.signedUri) : "",
    };
  },

  toJSON(message: GetSignedGCSUriResponse): unknown {
    const obj: any = {};
    if (message.signedUri !== undefined && message.signedUri !== "") {
      obj.signedUri = message.signedUri;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSignedGCSUriResponse>, I>>(base?: I): GetSignedGCSUriResponse {
    return GetSignedGCSUriResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSignedGCSUriResponse>, I>>(object: I): GetSignedGCSUriResponse {
    const message = createBaseGetSignedGCSUriResponse();
    message.signedUri = object.signedUri ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetSignedGCSUriResponse.$type, GetSignedGCSUriResponse);

export interface Utility {
  /** Do not use will be deprecated later once all logic is migrated to GetEmailLabels */
  GetGmailLabels(
    request: DeepPartial<GetGmailLabelsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetGmailLabelsResponse>;
  GetEmailLabels(
    request: DeepPartial<GetEmailLabelsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetEmailLabelsResponse>;
  /** Only for internal use */
  GetScheduleTasks(
    request: DeepPartial<GetScheduleTasksRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetScheduleTasksResponse>;
  /** Only for internal use for debugging and by orby.ai users */
  GetSignedGCSUri(
    request: DeepPartial<GetSignedGCSUriRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetSignedGCSUriResponse>;
}

export class UtilityClientImpl implements Utility {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetGmailLabels = this.GetGmailLabels.bind(this);
    this.GetEmailLabels = this.GetEmailLabels.bind(this);
    this.GetScheduleTasks = this.GetScheduleTasks.bind(this);
    this.GetSignedGCSUri = this.GetSignedGCSUri.bind(this);
  }

  GetGmailLabels(
    request: DeepPartial<GetGmailLabelsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetGmailLabelsResponse> {
    return this.rpc.unary(UtilityGetGmailLabelsDesc, GetGmailLabelsRequest.fromPartial(request), metadata);
  }

  GetEmailLabels(
    request: DeepPartial<GetEmailLabelsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetEmailLabelsResponse> {
    return this.rpc.unary(UtilityGetEmailLabelsDesc, GetEmailLabelsRequest.fromPartial(request), metadata);
  }

  GetScheduleTasks(
    request: DeepPartial<GetScheduleTasksRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetScheduleTasksResponse> {
    return this.rpc.unary(UtilityGetScheduleTasksDesc, GetScheduleTasksRequest.fromPartial(request), metadata);
  }

  GetSignedGCSUri(
    request: DeepPartial<GetSignedGCSUriRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetSignedGCSUriResponse> {
    return this.rpc.unary(UtilityGetSignedGCSUriDesc, GetSignedGCSUriRequest.fromPartial(request), metadata);
  }
}

export const UtilityDesc = { serviceName: "pb.v1alpha2.Utility" };

export const UtilityGetGmailLabelsDesc: UnaryMethodDefinitionish = {
  methodName: "GetGmailLabels",
  service: UtilityDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetGmailLabelsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetGmailLabelsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UtilityGetEmailLabelsDesc: UnaryMethodDefinitionish = {
  methodName: "GetEmailLabels",
  service: UtilityDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetEmailLabelsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetEmailLabelsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UtilityGetScheduleTasksDesc: UnaryMethodDefinitionish = {
  methodName: "GetScheduleTasks",
  service: UtilityDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetScheduleTasksRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetScheduleTasksResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UtilityGetSignedGCSUriDesc: UnaryMethodDefinitionish = {
  methodName: "GetSignedGCSUri",
  service: UtilityDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetSignedGCSUriRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetSignedGCSUriResponse.decode(data);
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

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
