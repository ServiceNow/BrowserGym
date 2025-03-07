/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Empty } from "../../google/protobuf/empty";
import { FieldMask } from "../../google/protobuf/field_mask";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha2";

export interface Webhook {
  $type?: "pb.v1alpha2.Webhook";
  id?: string | undefined;
  displayName?: string | undefined;
  description?: string | undefined;
  eventTypes?: WebhookEventType[] | undefined;
  status?: WebhookStatus | undefined;
  endpointUrl?:
    | string
    | undefined;
  /** Organization resource name. Format: organizations/{ID} */
  orgResourceName?:
    | string
    | undefined;
  /** Workflow resource name. Format: workflows/{ID} */
  workflowResourceNames?: string[] | undefined;
  secret?: string | undefined;
  disabledReason?: string | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
}

export enum WebhookEventType {
  UNSPECIFIED = 0,
  EXECUTION_COMPLETED = 1,
  EXECUTION_FAILED = 2,
  EXECUTION_CANCELLED = 3,
  UNRECOGNIZED = -1,
}

export function webhookEventTypeFromJSON(object: any): WebhookEventType {
  switch (object) {
    case 0:
    case "EVENT_TYPE_UNSPECIFIED":
      return WebhookEventType.UNSPECIFIED;
    case 1:
    case "EVENT_TYPE_EXECUTION_COMPLETED":
      return WebhookEventType.EXECUTION_COMPLETED;
    case 2:
    case "EVENT_TYPE_EXECUTION_FAILED":
      return WebhookEventType.EXECUTION_FAILED;
    case 3:
    case "EVENT_TYPE_EXECUTION_CANCELLED":
      return WebhookEventType.EXECUTION_CANCELLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WebhookEventType.UNRECOGNIZED;
  }
}

export function webhookEventTypeToJSON(object: WebhookEventType): string {
  switch (object) {
    case WebhookEventType.UNSPECIFIED:
      return "EVENT_TYPE_UNSPECIFIED";
    case WebhookEventType.EXECUTION_COMPLETED:
      return "EVENT_TYPE_EXECUTION_COMPLETED";
    case WebhookEventType.EXECUTION_FAILED:
      return "EVENT_TYPE_EXECUTION_FAILED";
    case WebhookEventType.EXECUTION_CANCELLED:
      return "EVENT_TYPE_EXECUTION_CANCELLED";
    case WebhookEventType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum WebhookStatus {
  UNSPECIFIED = 0,
  ENABLED = 1,
  DISABLED = 2,
  UNRECOGNIZED = -1,
}

export function webhookStatusFromJSON(object: any): WebhookStatus {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return WebhookStatus.UNSPECIFIED;
    case 1:
    case "STATUS_ENABLED":
      return WebhookStatus.ENABLED;
    case 2:
    case "STATUS_DISABLED":
      return WebhookStatus.DISABLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WebhookStatus.UNRECOGNIZED;
  }
}

export function webhookStatusToJSON(object: WebhookStatus): string {
  switch (object) {
    case WebhookStatus.UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case WebhookStatus.ENABLED:
      return "STATUS_ENABLED";
    case WebhookStatus.DISABLED:
      return "STATUS_DISABLED";
    case WebhookStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CreateWebhookRequest {
  $type?: "pb.v1alpha2.CreateWebhookRequest";
  displayName?: string | undefined;
  description?: string | undefined;
  eventTypes?: WebhookEventType[] | undefined;
  status?: WebhookStatus | undefined;
  endpointUrl?: string | undefined;
  workflowResourceNames?: string[] | undefined;
}

export interface UpdateWebhookRequest {
  $type?: "pb.v1alpha2.UpdateWebhookRequest";
  id?:
    | string
    | undefined;
  /**
   * Support display_name, description, event_types, status, endpoint_url,
   * workflow_resource_names
   */
  fieldMask?: string[] | undefined;
  displayName?: string | undefined;
  description?: string | undefined;
  eventTypes?: WebhookEventType[] | undefined;
  status?: WebhookStatus | undefined;
  endpointUrl?: string | undefined;
  workflowResourceNames?: string[] | undefined;
}

export interface DeleteWebhookRequest {
  $type?: "pb.v1alpha2.DeleteWebhookRequest";
  id?: string | undefined;
}

export interface GetWebhookRequest {
  $type?: "pb.v1alpha2.GetWebhookRequest";
  id?: string | undefined;
}

export interface ListWebhooksRequest {
  $type?: "pb.v1alpha2.ListWebhooksRequest";
  pageSize?: number | undefined;
  pageNumber?: number | undefined;
}

export interface ListWebhooksResponse {
  $type?: "pb.v1alpha2.ListWebhooksResponse";
  webhooks?: Webhook[] | undefined;
  totalSize?: number | undefined;
}

function createBaseWebhook(): Webhook {
  return {
    $type: "pb.v1alpha2.Webhook",
    id: "",
    displayName: "",
    description: "",
    eventTypes: [],
    status: 0,
    endpointUrl: "",
    orgResourceName: "",
    workflowResourceNames: [],
    secret: "",
    disabledReason: "",
    createdAt: undefined,
    createdBy: "",
    updatedAt: undefined,
    updatedBy: "",
  };
}

export const Webhook = {
  $type: "pb.v1alpha2.Webhook" as const,

  encode(message: Webhook, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.eventTypes !== undefined && message.eventTypes.length !== 0) {
      writer.uint32(34).fork();
      for (const v of message.eventTypes) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    if (message.endpointUrl !== undefined && message.endpointUrl !== "") {
      writer.uint32(50).string(message.endpointUrl);
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(58).string(message.orgResourceName);
    }
    if (message.workflowResourceNames !== undefined && message.workflowResourceNames.length !== 0) {
      for (const v of message.workflowResourceNames) {
        writer.uint32(66).string(v!);
      }
    }
    if (message.secret !== undefined && message.secret !== "") {
      writer.uint32(74).string(message.secret);
    }
    if (message.disabledReason !== undefined && message.disabledReason !== "") {
      writer.uint32(82).string(message.disabledReason);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.createdBy !== undefined && message.createdBy !== "") {
      writer.uint32(98).string(message.createdBy);
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(106).fork()).ldelim();
    }
    if (message.updatedBy !== undefined && message.updatedBy !== "") {
      writer.uint32(114).string(message.updatedBy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Webhook {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWebhook();
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

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag === 32) {
            message.eventTypes!.push(reader.int32() as any);

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.eventTypes!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.endpointUrl = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.orgResourceName = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.workflowResourceNames!.push(reader.string());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.secret = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.disabledReason = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.createdBy = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.updatedBy = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Webhook {
    return {
      $type: Webhook.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      eventTypes: globalThis.Array.isArray(object?.eventTypes)
        ? object.eventTypes.map((e: any) => webhookEventTypeFromJSON(e))
        : [],
      status: isSet(object.status) ? webhookStatusFromJSON(object.status) : 0,
      endpointUrl: isSet(object.endpointUrl) ? globalThis.String(object.endpointUrl) : "",
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      workflowResourceNames: globalThis.Array.isArray(object?.workflowResourceNames)
        ? object.workflowResourceNames.map((e: any) => globalThis.String(e))
        : [],
      secret: isSet(object.secret) ? globalThis.String(object.secret) : "",
      disabledReason: isSet(object.disabledReason) ? globalThis.String(object.disabledReason) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      createdBy: isSet(object.createdBy) ? globalThis.String(object.createdBy) : "",
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      updatedBy: isSet(object.updatedBy) ? globalThis.String(object.updatedBy) : "",
    };
  },

  toJSON(message: Webhook): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.eventTypes?.length) {
      obj.eventTypes = message.eventTypes.map((e) => webhookEventTypeToJSON(e));
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = webhookStatusToJSON(message.status);
    }
    if (message.endpointUrl !== undefined && message.endpointUrl !== "") {
      obj.endpointUrl = message.endpointUrl;
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.workflowResourceNames?.length) {
      obj.workflowResourceNames = message.workflowResourceNames;
    }
    if (message.secret !== undefined && message.secret !== "") {
      obj.secret = message.secret;
    }
    if (message.disabledReason !== undefined && message.disabledReason !== "") {
      obj.disabledReason = message.disabledReason;
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    if (message.createdBy !== undefined && message.createdBy !== "") {
      obj.createdBy = message.createdBy;
    }
    if (message.updatedAt !== undefined) {
      obj.updatedAt = message.updatedAt.toISOString();
    }
    if (message.updatedBy !== undefined && message.updatedBy !== "") {
      obj.updatedBy = message.updatedBy;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Webhook>, I>>(base?: I): Webhook {
    return Webhook.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Webhook>, I>>(object: I): Webhook {
    const message = createBaseWebhook();
    message.id = object.id ?? "";
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.eventTypes = object.eventTypes?.map((e) => e) || [];
    message.status = object.status ?? 0;
    message.endpointUrl = object.endpointUrl ?? "";
    message.orgResourceName = object.orgResourceName ?? "";
    message.workflowResourceNames = object.workflowResourceNames?.map((e) => e) || [];
    message.secret = object.secret ?? "";
    message.disabledReason = object.disabledReason ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.createdBy = object.createdBy ?? "";
    message.updatedAt = object.updatedAt ?? undefined;
    message.updatedBy = object.updatedBy ?? "";
    return message;
  },
};

messageTypeRegistry.set(Webhook.$type, Webhook);

function createBaseCreateWebhookRequest(): CreateWebhookRequest {
  return {
    $type: "pb.v1alpha2.CreateWebhookRequest",
    displayName: "",
    description: "",
    eventTypes: [],
    status: 0,
    endpointUrl: "",
    workflowResourceNames: [],
  };
}

export const CreateWebhookRequest = {
  $type: "pb.v1alpha2.CreateWebhookRequest" as const,

  encode(message: CreateWebhookRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.eventTypes !== undefined && message.eventTypes.length !== 0) {
      writer.uint32(26).fork();
      for (const v of message.eventTypes) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    if (message.endpointUrl !== undefined && message.endpointUrl !== "") {
      writer.uint32(42).string(message.endpointUrl);
    }
    if (message.workflowResourceNames !== undefined && message.workflowResourceNames.length !== 0) {
      for (const v of message.workflowResourceNames) {
        writer.uint32(50).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWebhookRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateWebhookRequest();
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
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag === 24) {
            message.eventTypes!.push(reader.int32() as any);

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.eventTypes!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.endpointUrl = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.workflowResourceNames!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateWebhookRequest {
    return {
      $type: CreateWebhookRequest.$type,
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      eventTypes: globalThis.Array.isArray(object?.eventTypes)
        ? object.eventTypes.map((e: any) => webhookEventTypeFromJSON(e))
        : [],
      status: isSet(object.status) ? webhookStatusFromJSON(object.status) : 0,
      endpointUrl: isSet(object.endpointUrl) ? globalThis.String(object.endpointUrl) : "",
      workflowResourceNames: globalThis.Array.isArray(object?.workflowResourceNames)
        ? object.workflowResourceNames.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: CreateWebhookRequest): unknown {
    const obj: any = {};
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.eventTypes?.length) {
      obj.eventTypes = message.eventTypes.map((e) => webhookEventTypeToJSON(e));
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = webhookStatusToJSON(message.status);
    }
    if (message.endpointUrl !== undefined && message.endpointUrl !== "") {
      obj.endpointUrl = message.endpointUrl;
    }
    if (message.workflowResourceNames?.length) {
      obj.workflowResourceNames = message.workflowResourceNames;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateWebhookRequest>, I>>(base?: I): CreateWebhookRequest {
    return CreateWebhookRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateWebhookRequest>, I>>(object: I): CreateWebhookRequest {
    const message = createBaseCreateWebhookRequest();
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.eventTypes = object.eventTypes?.map((e) => e) || [];
    message.status = object.status ?? 0;
    message.endpointUrl = object.endpointUrl ?? "";
    message.workflowResourceNames = object.workflowResourceNames?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(CreateWebhookRequest.$type, CreateWebhookRequest);

function createBaseUpdateWebhookRequest(): UpdateWebhookRequest {
  return {
    $type: "pb.v1alpha2.UpdateWebhookRequest",
    id: "",
    fieldMask: undefined,
    displayName: "",
    description: "",
    eventTypes: [],
    status: 0,
    endpointUrl: "",
    workflowResourceNames: [],
  };
}

export const UpdateWebhookRequest = {
  $type: "pb.v1alpha2.UpdateWebhookRequest" as const,

  encode(message: UpdateWebhookRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(26).string(message.displayName);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.eventTypes !== undefined && message.eventTypes.length !== 0) {
      writer.uint32(42).fork();
      for (const v of message.eventTypes) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    if (message.endpointUrl !== undefined && message.endpointUrl !== "") {
      writer.uint32(58).string(message.endpointUrl);
    }
    if (message.workflowResourceNames !== undefined && message.workflowResourceNames.length !== 0) {
      for (const v of message.workflowResourceNames) {
        writer.uint32(66).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWebhookRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateWebhookRequest();
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

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag === 40) {
            message.eventTypes!.push(reader.int32() as any);

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.eventTypes!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.endpointUrl = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.workflowResourceNames!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateWebhookRequest {
    return {
      $type: UpdateWebhookRequest.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      eventTypes: globalThis.Array.isArray(object?.eventTypes)
        ? object.eventTypes.map((e: any) => webhookEventTypeFromJSON(e))
        : [],
      status: isSet(object.status) ? webhookStatusFromJSON(object.status) : 0,
      endpointUrl: isSet(object.endpointUrl) ? globalThis.String(object.endpointUrl) : "",
      workflowResourceNames: globalThis.Array.isArray(object?.workflowResourceNames)
        ? object.workflowResourceNames.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: UpdateWebhookRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.eventTypes?.length) {
      obj.eventTypes = message.eventTypes.map((e) => webhookEventTypeToJSON(e));
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = webhookStatusToJSON(message.status);
    }
    if (message.endpointUrl !== undefined && message.endpointUrl !== "") {
      obj.endpointUrl = message.endpointUrl;
    }
    if (message.workflowResourceNames?.length) {
      obj.workflowResourceNames = message.workflowResourceNames;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateWebhookRequest>, I>>(base?: I): UpdateWebhookRequest {
    return UpdateWebhookRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateWebhookRequest>, I>>(object: I): UpdateWebhookRequest {
    const message = createBaseUpdateWebhookRequest();
    message.id = object.id ?? "";
    message.fieldMask = object.fieldMask ?? undefined;
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.eventTypes = object.eventTypes?.map((e) => e) || [];
    message.status = object.status ?? 0;
    message.endpointUrl = object.endpointUrl ?? "";
    message.workflowResourceNames = object.workflowResourceNames?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(UpdateWebhookRequest.$type, UpdateWebhookRequest);

function createBaseDeleteWebhookRequest(): DeleteWebhookRequest {
  return { $type: "pb.v1alpha2.DeleteWebhookRequest", id: "" };
}

export const DeleteWebhookRequest = {
  $type: "pb.v1alpha2.DeleteWebhookRequest" as const,

  encode(message: DeleteWebhookRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWebhookRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteWebhookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteWebhookRequest {
    return { $type: DeleteWebhookRequest.$type, id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: DeleteWebhookRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteWebhookRequest>, I>>(base?: I): DeleteWebhookRequest {
    return DeleteWebhookRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteWebhookRequest>, I>>(object: I): DeleteWebhookRequest {
    const message = createBaseDeleteWebhookRequest();
    message.id = object.id ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteWebhookRequest.$type, DeleteWebhookRequest);

function createBaseGetWebhookRequest(): GetWebhookRequest {
  return { $type: "pb.v1alpha2.GetWebhookRequest", id: "" };
}

export const GetWebhookRequest = {
  $type: "pb.v1alpha2.GetWebhookRequest" as const,

  encode(message: GetWebhookRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWebhookRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetWebhookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetWebhookRequest {
    return { $type: GetWebhookRequest.$type, id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: GetWebhookRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetWebhookRequest>, I>>(base?: I): GetWebhookRequest {
    return GetWebhookRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetWebhookRequest>, I>>(object: I): GetWebhookRequest {
    const message = createBaseGetWebhookRequest();
    message.id = object.id ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetWebhookRequest.$type, GetWebhookRequest);

function createBaseListWebhooksRequest(): ListWebhooksRequest {
  return { $type: "pb.v1alpha2.ListWebhooksRequest", pageSize: 0, pageNumber: 0 };
}

export const ListWebhooksRequest = {
  $type: "pb.v1alpha2.ListWebhooksRequest" as const,

  encode(message: ListWebhooksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(8).int32(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(16).int32(message.pageNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWebhooksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWebhooksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
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

  fromJSON(object: any): ListWebhooksRequest {
    return {
      $type: ListWebhooksRequest.$type,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
    };
  },

  toJSON(message: ListWebhooksRequest): unknown {
    const obj: any = {};
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWebhooksRequest>, I>>(base?: I): ListWebhooksRequest {
    return ListWebhooksRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWebhooksRequest>, I>>(object: I): ListWebhooksRequest {
    const message = createBaseListWebhooksRequest();
    message.pageSize = object.pageSize ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListWebhooksRequest.$type, ListWebhooksRequest);

function createBaseListWebhooksResponse(): ListWebhooksResponse {
  return { $type: "pb.v1alpha2.ListWebhooksResponse", webhooks: [], totalSize: 0 };
}

export const ListWebhooksResponse = {
  $type: "pb.v1alpha2.ListWebhooksResponse" as const,

  encode(message: ListWebhooksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.webhooks !== undefined && message.webhooks.length !== 0) {
      for (const v of message.webhooks) {
        Webhook.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(16).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWebhooksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWebhooksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.webhooks!.push(Webhook.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListWebhooksResponse {
    return {
      $type: ListWebhooksResponse.$type,
      webhooks: globalThis.Array.isArray(object?.webhooks) ? object.webhooks.map((e: any) => Webhook.fromJSON(e)) : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListWebhooksResponse): unknown {
    const obj: any = {};
    if (message.webhooks?.length) {
      obj.webhooks = message.webhooks.map((e) => Webhook.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWebhooksResponse>, I>>(base?: I): ListWebhooksResponse {
    return ListWebhooksResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWebhooksResponse>, I>>(object: I): ListWebhooksResponse {
    const message = createBaseListWebhooksResponse();
    message.webhooks = object.webhooks?.map((e) => Webhook.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListWebhooksResponse.$type, ListWebhooksResponse);

export interface Webhooks {
  CreateWebhook(request: DeepPartial<CreateWebhookRequest>, metadata?: grpc.Metadata): Promise<Webhook>;
  UpdateWebhook(request: DeepPartial<UpdateWebhookRequest>, metadata?: grpc.Metadata): Promise<Webhook>;
  DeleteWebhook(request: DeepPartial<DeleteWebhookRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  GetWebhook(request: DeepPartial<GetWebhookRequest>, metadata?: grpc.Metadata): Promise<Webhook>;
  ListWebhooks(request: DeepPartial<ListWebhooksRequest>, metadata?: grpc.Metadata): Promise<ListWebhooksResponse>;
}

export class WebhooksClientImpl implements Webhooks {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateWebhook = this.CreateWebhook.bind(this);
    this.UpdateWebhook = this.UpdateWebhook.bind(this);
    this.DeleteWebhook = this.DeleteWebhook.bind(this);
    this.GetWebhook = this.GetWebhook.bind(this);
    this.ListWebhooks = this.ListWebhooks.bind(this);
  }

  CreateWebhook(request: DeepPartial<CreateWebhookRequest>, metadata?: grpc.Metadata): Promise<Webhook> {
    return this.rpc.unary(WebhooksCreateWebhookDesc, CreateWebhookRequest.fromPartial(request), metadata);
  }

  UpdateWebhook(request: DeepPartial<UpdateWebhookRequest>, metadata?: grpc.Metadata): Promise<Webhook> {
    return this.rpc.unary(WebhooksUpdateWebhookDesc, UpdateWebhookRequest.fromPartial(request), metadata);
  }

  DeleteWebhook(request: DeepPartial<DeleteWebhookRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(WebhooksDeleteWebhookDesc, DeleteWebhookRequest.fromPartial(request), metadata);
  }

  GetWebhook(request: DeepPartial<GetWebhookRequest>, metadata?: grpc.Metadata): Promise<Webhook> {
    return this.rpc.unary(WebhooksGetWebhookDesc, GetWebhookRequest.fromPartial(request), metadata);
  }

  ListWebhooks(request: DeepPartial<ListWebhooksRequest>, metadata?: grpc.Metadata): Promise<ListWebhooksResponse> {
    return this.rpc.unary(WebhooksListWebhooksDesc, ListWebhooksRequest.fromPartial(request), metadata);
  }
}

export const WebhooksDesc = { serviceName: "pb.v1alpha2.Webhooks" };

export const WebhooksCreateWebhookDesc: UnaryMethodDefinitionish = {
  methodName: "CreateWebhook",
  service: WebhooksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateWebhookRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Webhook.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const WebhooksUpdateWebhookDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateWebhook",
  service: WebhooksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateWebhookRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Webhook.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const WebhooksDeleteWebhookDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteWebhook",
  service: WebhooksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteWebhookRequest.encode(this).finish();
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

export const WebhooksGetWebhookDesc: UnaryMethodDefinitionish = {
  methodName: "GetWebhook",
  service: WebhooksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetWebhookRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Webhook.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const WebhooksListWebhooksDesc: UnaryMethodDefinitionish = {
  methodName: "ListWebhooks",
  service: WebhooksDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListWebhooksRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListWebhooksResponse.decode(data);
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
