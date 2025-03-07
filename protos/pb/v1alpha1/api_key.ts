/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { UserProfileInfo } from "../../common/user_profile";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export enum ApiKeyPermission {
  UNSPECIFIED = 0,
  EXECUTION_SERVICE_LIST_EXECUTIONS = 1,
  EXECUTION_SERVICE_GET_EXECUTION = 2,
  EXECUTION_SERVICE_DOWNLOAD_EXECUTION_RESULT = 3,
  EXECUTION_SERVICE_CREATE_EXECUTIONS = 4,
  UNRECOGNIZED = -1,
}

export function apiKeyPermissionFromJSON(object: any): ApiKeyPermission {
  switch (object) {
    case 0:
    case "API_KEY_PERMISSION_UNSPECIFIED":
      return ApiKeyPermission.UNSPECIFIED;
    case 1:
    case "API_KEY_PERMISSION_EXECUTION_SERVICE_LIST_EXECUTIONS":
      return ApiKeyPermission.EXECUTION_SERVICE_LIST_EXECUTIONS;
    case 2:
    case "API_KEY_PERMISSION_EXECUTION_SERVICE_GET_EXECUTION":
      return ApiKeyPermission.EXECUTION_SERVICE_GET_EXECUTION;
    case 3:
    case "API_KEY_PERMISSION_EXECUTION_SERVICE_DOWNLOAD_EXECUTION_RESULT":
      return ApiKeyPermission.EXECUTION_SERVICE_DOWNLOAD_EXECUTION_RESULT;
    case 4:
    case "API_KEY_PERMISSION_EXECUTION_SERVICE_CREATE_EXECUTIONS":
      return ApiKeyPermission.EXECUTION_SERVICE_CREATE_EXECUTIONS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ApiKeyPermission.UNRECOGNIZED;
  }
}

export function apiKeyPermissionToJSON(object: ApiKeyPermission): string {
  switch (object) {
    case ApiKeyPermission.UNSPECIFIED:
      return "API_KEY_PERMISSION_UNSPECIFIED";
    case ApiKeyPermission.EXECUTION_SERVICE_LIST_EXECUTIONS:
      return "API_KEY_PERMISSION_EXECUTION_SERVICE_LIST_EXECUTIONS";
    case ApiKeyPermission.EXECUTION_SERVICE_GET_EXECUTION:
      return "API_KEY_PERMISSION_EXECUTION_SERVICE_GET_EXECUTION";
    case ApiKeyPermission.EXECUTION_SERVICE_DOWNLOAD_EXECUTION_RESULT:
      return "API_KEY_PERMISSION_EXECUTION_SERVICE_DOWNLOAD_EXECUTION_RESULT";
    case ApiKeyPermission.EXECUTION_SERVICE_CREATE_EXECUTIONS:
      return "API_KEY_PERMISSION_EXECUTION_SERVICE_CREATE_EXECUTIONS";
    case ApiKeyPermission.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ApiKey {
  $type?: "pb.v1alpha1.ApiKey";
  id?: string | undefined;
  name?: string | undefined;
  rawKey?: string | undefined;
  status?: ApiKeyApiKeyStatus | undefined;
  createdTime?: Date | undefined;
  description?:
    | string
    | undefined;
  /** custom expiration time for the api key, if empty, the api key will never expire */
  expirationTime?:
    | Date
    | undefined;
  /** the creator user profile for the api key */
  creator?:
    | UserProfileInfo
    | undefined;
  /** the encrypted key for the api key */
  encryptedKey?:
    | string
    | undefined;
  /**
   * the endpoints that can be performed by the api key.
   * if empty, the api key will have all the access.
   */
  permissions?:
    | ApiKeyPermission[]
    | undefined;
  /**
   * the manageable workflows by the api key,
   * if empty, the api key will have access to all workflows.
   */
  workflowIds?: string[] | undefined;
}

export enum ApiKeyApiKeyStatus {
  UNSPECIFIED = 0,
  ACTIVE = 1,
  REVOKED = 2,
  UNRECOGNIZED = -1,
}

export function apiKeyApiKeyStatusFromJSON(object: any): ApiKeyApiKeyStatus {
  switch (object) {
    case 0:
    case "API_KEY_STATUS_UNSPECIFIED":
      return ApiKeyApiKeyStatus.UNSPECIFIED;
    case 1:
    case "API_KEY_STATUS_ACTIVE":
      return ApiKeyApiKeyStatus.ACTIVE;
    case 2:
    case "API_KEY_STATUS_REVOKED":
      return ApiKeyApiKeyStatus.REVOKED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ApiKeyApiKeyStatus.UNRECOGNIZED;
  }
}

export function apiKeyApiKeyStatusToJSON(object: ApiKeyApiKeyStatus): string {
  switch (object) {
    case ApiKeyApiKeyStatus.UNSPECIFIED:
      return "API_KEY_STATUS_UNSPECIFIED";
    case ApiKeyApiKeyStatus.ACTIVE:
      return "API_KEY_STATUS_ACTIVE";
    case ApiKeyApiKeyStatus.REVOKED:
      return "API_KEY_STATUS_REVOKED";
    case ApiKeyApiKeyStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseApiKey(): ApiKey {
  return {
    $type: "pb.v1alpha1.ApiKey",
    id: "",
    name: "",
    rawKey: "",
    status: 0,
    createdTime: undefined,
    description: undefined,
    expirationTime: undefined,
    creator: undefined,
    encryptedKey: "",
    permissions: [],
    workflowIds: [],
  };
}

export const ApiKey = {
  $type: "pb.v1alpha1.ApiKey" as const,

  encode(message: ApiKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.rawKey !== undefined && message.rawKey !== "") {
      writer.uint32(26).string(message.rawKey);
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    if (message.createdTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createdTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.description !== undefined) {
      writer.uint32(50).string(message.description);
    }
    if (message.expirationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationTime), writer.uint32(58).fork()).ldelim();
    }
    if (message.creator !== undefined) {
      UserProfileInfo.encode(message.creator, writer.uint32(66).fork()).ldelim();
    }
    if (message.encryptedKey !== undefined && message.encryptedKey !== "") {
      writer.uint32(74).string(message.encryptedKey);
    }
    if (message.permissions !== undefined && message.permissions.length !== 0) {
      writer.uint32(82).fork();
      for (const v of message.permissions) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.workflowIds !== undefined && message.workflowIds.length !== 0) {
      for (const v of message.workflowIds) {
        writer.uint32(90).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKey();
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

          message.rawKey = reader.string();
          continue;
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

          message.createdTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.description = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.expirationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.creator = UserProfileInfo.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.encryptedKey = reader.string();
          continue;
        case 10:
          if (tag === 80) {
            message.permissions!.push(reader.int32() as any);

            continue;
          }

          if (tag === 82) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.permissions!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.workflowIds!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ApiKey {
    return {
      $type: ApiKey.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      rawKey: isSet(object.rawKey) ? globalThis.String(object.rawKey) : "",
      status: isSet(object.status) ? apiKeyApiKeyStatusFromJSON(object.status) : 0,
      createdTime: isSet(object.createdTime) ? fromJsonTimestamp(object.createdTime) : undefined,
      description: isSet(object.description) ? globalThis.String(object.description) : undefined,
      expirationTime: isSet(object.expirationTime) ? fromJsonTimestamp(object.expirationTime) : undefined,
      creator: isSet(object.creator) ? UserProfileInfo.fromJSON(object.creator) : undefined,
      encryptedKey: isSet(object.encryptedKey) ? globalThis.String(object.encryptedKey) : "",
      permissions: globalThis.Array.isArray(object?.permissions)
        ? object.permissions.map((e: any) => apiKeyPermissionFromJSON(e))
        : [],
      workflowIds: globalThis.Array.isArray(object?.workflowIds)
        ? object.workflowIds.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: ApiKey): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.rawKey !== undefined && message.rawKey !== "") {
      obj.rawKey = message.rawKey;
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = apiKeyApiKeyStatusToJSON(message.status);
    }
    if (message.createdTime !== undefined) {
      obj.createdTime = message.createdTime.toISOString();
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.expirationTime !== undefined) {
      obj.expirationTime = message.expirationTime.toISOString();
    }
    if (message.creator !== undefined) {
      obj.creator = UserProfileInfo.toJSON(message.creator);
    }
    if (message.encryptedKey !== undefined && message.encryptedKey !== "") {
      obj.encryptedKey = message.encryptedKey;
    }
    if (message.permissions?.length) {
      obj.permissions = message.permissions.map((e) => apiKeyPermissionToJSON(e));
    }
    if (message.workflowIds?.length) {
      obj.workflowIds = message.workflowIds;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApiKey>, I>>(base?: I): ApiKey {
    return ApiKey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApiKey>, I>>(object: I): ApiKey {
    const message = createBaseApiKey();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.rawKey = object.rawKey ?? "";
    message.status = object.status ?? 0;
    message.createdTime = object.createdTime ?? undefined;
    message.description = object.description ?? undefined;
    message.expirationTime = object.expirationTime ?? undefined;
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? UserProfileInfo.fromPartial(object.creator)
      : undefined;
    message.encryptedKey = object.encryptedKey ?? "";
    message.permissions = object.permissions?.map((e) => e) || [];
    message.workflowIds = object.workflowIds?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(ApiKey.$type, ApiKey);

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
