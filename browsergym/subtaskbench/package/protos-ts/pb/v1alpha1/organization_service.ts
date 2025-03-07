/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Empty } from "../../google/protobuf/empty";
import { FieldMask } from "../../google/protobuf/field_mask";
import { Timestamp } from "../../google/protobuf/timestamp";
import { DateMessage } from "../../google/type/date";
import { messageTypeRegistry } from "../../typeRegistry";
import { ApiKey, ApiKeyPermission, apiKeyPermissionFromJSON, apiKeyPermissionToJSON } from "./api_key";
import { Organization } from "./organization";

export const protobufPackage = "pb.v1alpha1";

export interface DeleteOrganizationRequest {
  $type?: "pb.v1alpha1.DeleteOrganizationRequest";
  name?: string | undefined;
}

export interface CreateOrganizationRequest {
  $type?: "pb.v1alpha1.CreateOrganizationRequest";
  organization?:
    | Organization
    | undefined;
  /**
   * User to be created as password user, must not be existing user and
   * needs to be an admin within the organization
   */
  passwordUser?: OrganizationPasswordUser | undefined;
}

export interface GetOrganizationRequest {
  $type?: "pb.v1alpha1.GetOrganizationRequest";
  name?: string | undefined;
}

export interface OrganizationPasswordUser {
  $type?: "pb.v1alpha1.OrganizationPasswordUser";
  /** The email provided here must be part of admin array in workflow */
  email?:
    | string
    | undefined;
  /** Password cannot be empty */
  password?: string | undefined;
}

export interface UpdateOrganizationRequest {
  $type?: "pb.v1alpha1.UpdateOrganizationRequest";
  organization?:
    | Organization
    | undefined;
  /**
   * The fields that can be updated are: users, admins, creators, display_name,
   * workflow_template_types, saml_config, saml_config.is_activated,
   * saml_config.sign_request, saml_config.idp_metadata.signing_certificates,
   * saml_config.idp_metadata.sso_url, saml_config.idp_metadata.entity_id,
   * saml_config.idp_metadata.logout_url.
   *
   * The fields that can be updated from internal app are:  workflow_template_types,
   * hyperparameter_resource_name.
   *
   * We provide a FieldMask to allow partial updates for idp_metadata because
   * the client won't be able to send the complete existing data for idp_metadata
   * since certificates are not sent to the client. We have a certificate check
   * on the server side to validate the certificates inside idp_metadata.
   */
  fieldMask?: string[] | undefined;
}

export interface CreateApiKeyRequest {
  $type?: "pb.v1alpha1.CreateApiKeyRequest";
  apiKeyName?:
    | string
    | undefined;
  /** Optional description for the api key */
  apiKeyDescription?:
    | string
    | undefined;
  /**
   * custom expiration time for the api key, if not provided, the api key will
   * never expire
   */
  expirationTime?:
    | Date
    | undefined;
  /**
   * the endpoints that can be performed by the api key.
   * if none provided, the api key will have all the access.
   */
  permissions?:
    | ApiKeyPermission[]
    | undefined;
  /**
   * the manageable workflows by the api key,
   * if none provided, the api key will have access to all workflows.
   */
  workflowIds?: string[] | undefined;
}

export interface CreateApiKeyResponse {
  $type?: "pb.v1alpha1.CreateApiKeyResponse";
  orgId?: string | undefined;
  apiKey?: ApiKey | undefined;
}

export interface UpdateApiKeyRequest {
  $type?: "pb.v1alpha1.UpdateApiKeyRequest";
  apiKeyId?:
    | string
    | undefined;
  /**
   * The fields that can be updated are: name, description,
   * expiration_time, permissions, workflow_ids.
   */
  fieldMask?: string[] | undefined;
  name?: string | undefined;
  description?:
    | string
    | undefined;
  /** if empty, the api key will never expire */
  expirationTime?:
    | Date
    | undefined;
  /** if empty, the api key will have all the access. */
  permissions?:
    | ApiKeyPermission[]
    | undefined;
  /** if empty, the api key will have access to all workflows. */
  workflowIds?: string[] | undefined;
}

export interface UpdateApiKeyResponse {
  $type?: "pb.v1alpha1.UpdateApiKeyResponse";
  apiKey?: ApiKey | undefined;
}

export interface ListApiKeysRequest {
  $type?: "pb.v1alpha1.ListApiKeysRequest";
  pageSize?: number | undefined;
  pageNumber?: number | undefined;
}

export interface ListApiKeysResponse {
  $type?: "pb.v1alpha1.ListApiKeysResponse";
  orgId?: string | undefined;
  apiKeys?: ApiKey[] | undefined;
  totalSize?: number | undefined;
}

export interface DeleteApiKeyRequest {
  $type?: "pb.v1alpha1.DeleteApiKeyRequest";
  apiKeyId?: string | undefined;
}

export interface HolidayList {
  $type?: "pb.v1alpha1.HolidayList";
  /** For creation, this field will be empty */
  id?: string | undefined;
  name?: string | undefined;
  holidays?: DateMessage[] | undefined;
}

export interface UpsertHolidayListRequest {
  $type?: "pb.v1alpha1.UpsertHolidayListRequest";
  holidayList?: HolidayList[] | undefined;
  overrideDuplicate?: boolean | undefined;
}

export interface GetHolidayListRequest {
  $type?: "pb.v1alpha1.GetHolidayListRequest";
  id?: string | undefined;
}

export interface ListHolidayListsRequest {
  $type?: "pb.v1alpha1.ListHolidayListsRequest";
  /** Starts from 1 */
  pageNumber?:
    | number
    | undefined;
  /** Can take values from [1,20] */
  pageSize?: number | undefined;
}

export interface ListHolidayListsResponse {
  $type?: "pb.v1alpha1.ListHolidayListsResponse";
  holidayLists?: HolidayList[] | undefined;
  count?: number | undefined;
}

export interface DeleteHolidayListRequest {
  $type?: "pb.v1alpha1.DeleteHolidayListRequest";
  id?: string | undefined;
}

function createBaseDeleteOrganizationRequest(): DeleteOrganizationRequest {
  return { $type: "pb.v1alpha1.DeleteOrganizationRequest", name: "" };
}

export const DeleteOrganizationRequest = {
  $type: "pb.v1alpha1.DeleteOrganizationRequest" as const,

  encode(message: DeleteOrganizationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOrganizationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteOrganizationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteOrganizationRequest {
    return { $type: DeleteOrganizationRequest.$type, name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: DeleteOrganizationRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteOrganizationRequest>, I>>(base?: I): DeleteOrganizationRequest {
    return DeleteOrganizationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteOrganizationRequest>, I>>(object: I): DeleteOrganizationRequest {
    const message = createBaseDeleteOrganizationRequest();
    message.name = object.name ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteOrganizationRequest.$type, DeleteOrganizationRequest);

function createBaseCreateOrganizationRequest(): CreateOrganizationRequest {
  return { $type: "pb.v1alpha1.CreateOrganizationRequest", organization: undefined, passwordUser: undefined };
}

export const CreateOrganizationRequest = {
  $type: "pb.v1alpha1.CreateOrganizationRequest" as const,

  encode(message: CreateOrganizationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.organization !== undefined) {
      Organization.encode(message.organization, writer.uint32(10).fork()).ldelim();
    }
    if (message.passwordUser !== undefined) {
      OrganizationPasswordUser.encode(message.passwordUser, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOrganizationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOrganizationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.organization = Organization.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.passwordUser = OrganizationPasswordUser.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateOrganizationRequest {
    return {
      $type: CreateOrganizationRequest.$type,
      organization: isSet(object.organization) ? Organization.fromJSON(object.organization) : undefined,
      passwordUser: isSet(object.passwordUser) ? OrganizationPasswordUser.fromJSON(object.passwordUser) : undefined,
    };
  },

  toJSON(message: CreateOrganizationRequest): unknown {
    const obj: any = {};
    if (message.organization !== undefined) {
      obj.organization = Organization.toJSON(message.organization);
    }
    if (message.passwordUser !== undefined) {
      obj.passwordUser = OrganizationPasswordUser.toJSON(message.passwordUser);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateOrganizationRequest>, I>>(base?: I): CreateOrganizationRequest {
    return CreateOrganizationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateOrganizationRequest>, I>>(object: I): CreateOrganizationRequest {
    const message = createBaseCreateOrganizationRequest();
    message.organization = (object.organization !== undefined && object.organization !== null)
      ? Organization.fromPartial(object.organization)
      : undefined;
    message.passwordUser = (object.passwordUser !== undefined && object.passwordUser !== null)
      ? OrganizationPasswordUser.fromPartial(object.passwordUser)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateOrganizationRequest.$type, CreateOrganizationRequest);

function createBaseGetOrganizationRequest(): GetOrganizationRequest {
  return { $type: "pb.v1alpha1.GetOrganizationRequest", name: "" };
}

export const GetOrganizationRequest = {
  $type: "pb.v1alpha1.GetOrganizationRequest" as const,

  encode(message: GetOrganizationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOrganizationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOrganizationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetOrganizationRequest {
    return { $type: GetOrganizationRequest.$type, name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: GetOrganizationRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetOrganizationRequest>, I>>(base?: I): GetOrganizationRequest {
    return GetOrganizationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetOrganizationRequest>, I>>(object: I): GetOrganizationRequest {
    const message = createBaseGetOrganizationRequest();
    message.name = object.name ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetOrganizationRequest.$type, GetOrganizationRequest);

function createBaseOrganizationPasswordUser(): OrganizationPasswordUser {
  return { $type: "pb.v1alpha1.OrganizationPasswordUser", email: "", password: "" };
}

export const OrganizationPasswordUser = {
  $type: "pb.v1alpha1.OrganizationPasswordUser" as const,

  encode(message: OrganizationPasswordUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== undefined && message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== undefined && message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrganizationPasswordUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrganizationPasswordUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OrganizationPasswordUser {
    return {
      $type: OrganizationPasswordUser.$type,
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: OrganizationPasswordUser): unknown {
    const obj: any = {};
    if (message.email !== undefined && message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== undefined && message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OrganizationPasswordUser>, I>>(base?: I): OrganizationPasswordUser {
    return OrganizationPasswordUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OrganizationPasswordUser>, I>>(object: I): OrganizationPasswordUser {
    const message = createBaseOrganizationPasswordUser();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

messageTypeRegistry.set(OrganizationPasswordUser.$type, OrganizationPasswordUser);

function createBaseUpdateOrganizationRequest(): UpdateOrganizationRequest {
  return { $type: "pb.v1alpha1.UpdateOrganizationRequest", organization: undefined, fieldMask: undefined };
}

export const UpdateOrganizationRequest = {
  $type: "pb.v1alpha1.UpdateOrganizationRequest" as const,

  encode(message: UpdateOrganizationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.organization !== undefined) {
      Organization.encode(message.organization, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOrganizationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateOrganizationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.organization = Organization.decode(reader, reader.uint32());
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

  fromJSON(object: any): UpdateOrganizationRequest {
    return {
      $type: UpdateOrganizationRequest.$type,
      organization: isSet(object.organization) ? Organization.fromJSON(object.organization) : undefined,
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: UpdateOrganizationRequest): unknown {
    const obj: any = {};
    if (message.organization !== undefined) {
      obj.organization = Organization.toJSON(message.organization);
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateOrganizationRequest>, I>>(base?: I): UpdateOrganizationRequest {
    return UpdateOrganizationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateOrganizationRequest>, I>>(object: I): UpdateOrganizationRequest {
    const message = createBaseUpdateOrganizationRequest();
    message.organization = (object.organization !== undefined && object.organization !== null)
      ? Organization.fromPartial(object.organization)
      : undefined;
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateOrganizationRequest.$type, UpdateOrganizationRequest);

function createBaseCreateApiKeyRequest(): CreateApiKeyRequest {
  return {
    $type: "pb.v1alpha1.CreateApiKeyRequest",
    apiKeyName: "",
    apiKeyDescription: undefined,
    expirationTime: undefined,
    permissions: [],
    workflowIds: [],
  };
}

export const CreateApiKeyRequest = {
  $type: "pb.v1alpha1.CreateApiKeyRequest" as const,

  encode(message: CreateApiKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apiKeyName !== undefined && message.apiKeyName !== "") {
      writer.uint32(10).string(message.apiKeyName);
    }
    if (message.apiKeyDescription !== undefined) {
      writer.uint32(18).string(message.apiKeyDescription);
    }
    if (message.expirationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.permissions !== undefined && message.permissions.length !== 0) {
      writer.uint32(34).fork();
      for (const v of message.permissions) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.workflowIds !== undefined && message.workflowIds.length !== 0) {
      for (const v of message.workflowIds) {
        writer.uint32(42).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateApiKeyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateApiKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.apiKeyName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.apiKeyDescription = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.expirationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag === 32) {
            message.permissions!.push(reader.int32() as any);

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.permissions!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 5:
          if (tag !== 42) {
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

  fromJSON(object: any): CreateApiKeyRequest {
    return {
      $type: CreateApiKeyRequest.$type,
      apiKeyName: isSet(object.apiKeyName) ? globalThis.String(object.apiKeyName) : "",
      apiKeyDescription: isSet(object.apiKeyDescription) ? globalThis.String(object.apiKeyDescription) : undefined,
      expirationTime: isSet(object.expirationTime) ? fromJsonTimestamp(object.expirationTime) : undefined,
      permissions: globalThis.Array.isArray(object?.permissions)
        ? object.permissions.map((e: any) => apiKeyPermissionFromJSON(e))
        : [],
      workflowIds: globalThis.Array.isArray(object?.workflowIds)
        ? object.workflowIds.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: CreateApiKeyRequest): unknown {
    const obj: any = {};
    if (message.apiKeyName !== undefined && message.apiKeyName !== "") {
      obj.apiKeyName = message.apiKeyName;
    }
    if (message.apiKeyDescription !== undefined) {
      obj.apiKeyDescription = message.apiKeyDescription;
    }
    if (message.expirationTime !== undefined) {
      obj.expirationTime = message.expirationTime.toISOString();
    }
    if (message.permissions?.length) {
      obj.permissions = message.permissions.map((e) => apiKeyPermissionToJSON(e));
    }
    if (message.workflowIds?.length) {
      obj.workflowIds = message.workflowIds;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateApiKeyRequest>, I>>(base?: I): CreateApiKeyRequest {
    return CreateApiKeyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateApiKeyRequest>, I>>(object: I): CreateApiKeyRequest {
    const message = createBaseCreateApiKeyRequest();
    message.apiKeyName = object.apiKeyName ?? "";
    message.apiKeyDescription = object.apiKeyDescription ?? undefined;
    message.expirationTime = object.expirationTime ?? undefined;
    message.permissions = object.permissions?.map((e) => e) || [];
    message.workflowIds = object.workflowIds?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(CreateApiKeyRequest.$type, CreateApiKeyRequest);

function createBaseCreateApiKeyResponse(): CreateApiKeyResponse {
  return { $type: "pb.v1alpha1.CreateApiKeyResponse", orgId: "", apiKey: undefined };
}

export const CreateApiKeyResponse = {
  $type: "pb.v1alpha1.CreateApiKeyResponse" as const,

  encode(message: CreateApiKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.apiKey !== undefined) {
      ApiKey.encode(message.apiKey, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateApiKeyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateApiKeyResponse();
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

          message.apiKey = ApiKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateApiKeyResponse {
    return {
      $type: CreateApiKeyResponse.$type,
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      apiKey: isSet(object.apiKey) ? ApiKey.fromJSON(object.apiKey) : undefined,
    };
  },

  toJSON(message: CreateApiKeyResponse): unknown {
    const obj: any = {};
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.apiKey !== undefined) {
      obj.apiKey = ApiKey.toJSON(message.apiKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateApiKeyResponse>, I>>(base?: I): CreateApiKeyResponse {
    return CreateApiKeyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateApiKeyResponse>, I>>(object: I): CreateApiKeyResponse {
    const message = createBaseCreateApiKeyResponse();
    message.orgId = object.orgId ?? "";
    message.apiKey = (object.apiKey !== undefined && object.apiKey !== null)
      ? ApiKey.fromPartial(object.apiKey)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateApiKeyResponse.$type, CreateApiKeyResponse);

function createBaseUpdateApiKeyRequest(): UpdateApiKeyRequest {
  return {
    $type: "pb.v1alpha1.UpdateApiKeyRequest",
    apiKeyId: "",
    fieldMask: undefined,
    name: "",
    description: "",
    expirationTime: undefined,
    permissions: [],
    workflowIds: [],
  };
}

export const UpdateApiKeyRequest = {
  $type: "pb.v1alpha1.UpdateApiKeyRequest" as const,

  encode(message: UpdateApiKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apiKeyId !== undefined && message.apiKeyId !== "") {
      writer.uint32(10).string(message.apiKeyId);
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.expirationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.permissions !== undefined && message.permissions.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.permissions) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.workflowIds !== undefined && message.workflowIds.length !== 0) {
      for (const v of message.workflowIds) {
        writer.uint32(58).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateApiKeyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateApiKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.apiKeyId = reader.string();
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

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.expirationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag === 48) {
            message.permissions!.push(reader.int32() as any);

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.permissions!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 7:
          if (tag !== 58) {
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

  fromJSON(object: any): UpdateApiKeyRequest {
    return {
      $type: UpdateApiKeyRequest.$type,
      apiKeyId: isSet(object.apiKeyId) ? globalThis.String(object.apiKeyId) : "",
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      expirationTime: isSet(object.expirationTime) ? fromJsonTimestamp(object.expirationTime) : undefined,
      permissions: globalThis.Array.isArray(object?.permissions)
        ? object.permissions.map((e: any) => apiKeyPermissionFromJSON(e))
        : [],
      workflowIds: globalThis.Array.isArray(object?.workflowIds)
        ? object.workflowIds.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: UpdateApiKeyRequest): unknown {
    const obj: any = {};
    if (message.apiKeyId !== undefined && message.apiKeyId !== "") {
      obj.apiKeyId = message.apiKeyId;
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.expirationTime !== undefined) {
      obj.expirationTime = message.expirationTime.toISOString();
    }
    if (message.permissions?.length) {
      obj.permissions = message.permissions.map((e) => apiKeyPermissionToJSON(e));
    }
    if (message.workflowIds?.length) {
      obj.workflowIds = message.workflowIds;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateApiKeyRequest>, I>>(base?: I): UpdateApiKeyRequest {
    return UpdateApiKeyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateApiKeyRequest>, I>>(object: I): UpdateApiKeyRequest {
    const message = createBaseUpdateApiKeyRequest();
    message.apiKeyId = object.apiKeyId ?? "";
    message.fieldMask = object.fieldMask ?? undefined;
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.expirationTime = object.expirationTime ?? undefined;
    message.permissions = object.permissions?.map((e) => e) || [];
    message.workflowIds = object.workflowIds?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(UpdateApiKeyRequest.$type, UpdateApiKeyRequest);

function createBaseUpdateApiKeyResponse(): UpdateApiKeyResponse {
  return { $type: "pb.v1alpha1.UpdateApiKeyResponse", apiKey: undefined };
}

export const UpdateApiKeyResponse = {
  $type: "pb.v1alpha1.UpdateApiKeyResponse" as const,

  encode(message: UpdateApiKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apiKey !== undefined) {
      ApiKey.encode(message.apiKey, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateApiKeyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateApiKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.apiKey = ApiKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateApiKeyResponse {
    return {
      $type: UpdateApiKeyResponse.$type,
      apiKey: isSet(object.apiKey) ? ApiKey.fromJSON(object.apiKey) : undefined,
    };
  },

  toJSON(message: UpdateApiKeyResponse): unknown {
    const obj: any = {};
    if (message.apiKey !== undefined) {
      obj.apiKey = ApiKey.toJSON(message.apiKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateApiKeyResponse>, I>>(base?: I): UpdateApiKeyResponse {
    return UpdateApiKeyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateApiKeyResponse>, I>>(object: I): UpdateApiKeyResponse {
    const message = createBaseUpdateApiKeyResponse();
    message.apiKey = (object.apiKey !== undefined && object.apiKey !== null)
      ? ApiKey.fromPartial(object.apiKey)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateApiKeyResponse.$type, UpdateApiKeyResponse);

function createBaseListApiKeysRequest(): ListApiKeysRequest {
  return { $type: "pb.v1alpha1.ListApiKeysRequest", pageSize: 0, pageNumber: 0 };
}

export const ListApiKeysRequest = {
  $type: "pb.v1alpha1.ListApiKeysRequest" as const,

  encode(message: ListApiKeysRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(8).int32(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(16).int32(message.pageNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListApiKeysRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListApiKeysRequest();
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

  fromJSON(object: any): ListApiKeysRequest {
    return {
      $type: ListApiKeysRequest.$type,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
    };
  },

  toJSON(message: ListApiKeysRequest): unknown {
    const obj: any = {};
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListApiKeysRequest>, I>>(base?: I): ListApiKeysRequest {
    return ListApiKeysRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListApiKeysRequest>, I>>(object: I): ListApiKeysRequest {
    const message = createBaseListApiKeysRequest();
    message.pageSize = object.pageSize ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListApiKeysRequest.$type, ListApiKeysRequest);

function createBaseListApiKeysResponse(): ListApiKeysResponse {
  return { $type: "pb.v1alpha1.ListApiKeysResponse", orgId: "", apiKeys: [], totalSize: 0 };
}

export const ListApiKeysResponse = {
  $type: "pb.v1alpha1.ListApiKeysResponse" as const,

  encode(message: ListApiKeysResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.apiKeys !== undefined && message.apiKeys.length !== 0) {
      for (const v of message.apiKeys) {
        ApiKey.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(24).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListApiKeysResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListApiKeysResponse();
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

          message.apiKeys!.push(ApiKey.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListApiKeysResponse {
    return {
      $type: ListApiKeysResponse.$type,
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      apiKeys: globalThis.Array.isArray(object?.apiKeys) ? object.apiKeys.map((e: any) => ApiKey.fromJSON(e)) : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListApiKeysResponse): unknown {
    const obj: any = {};
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.apiKeys?.length) {
      obj.apiKeys = message.apiKeys.map((e) => ApiKey.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListApiKeysResponse>, I>>(base?: I): ListApiKeysResponse {
    return ListApiKeysResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListApiKeysResponse>, I>>(object: I): ListApiKeysResponse {
    const message = createBaseListApiKeysResponse();
    message.orgId = object.orgId ?? "";
    message.apiKeys = object.apiKeys?.map((e) => ApiKey.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListApiKeysResponse.$type, ListApiKeysResponse);

function createBaseDeleteApiKeyRequest(): DeleteApiKeyRequest {
  return { $type: "pb.v1alpha1.DeleteApiKeyRequest", apiKeyId: "" };
}

export const DeleteApiKeyRequest = {
  $type: "pb.v1alpha1.DeleteApiKeyRequest" as const,

  encode(message: DeleteApiKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apiKeyId !== undefined && message.apiKeyId !== "") {
      writer.uint32(10).string(message.apiKeyId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteApiKeyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteApiKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.apiKeyId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteApiKeyRequest {
    return {
      $type: DeleteApiKeyRequest.$type,
      apiKeyId: isSet(object.apiKeyId) ? globalThis.String(object.apiKeyId) : "",
    };
  },

  toJSON(message: DeleteApiKeyRequest): unknown {
    const obj: any = {};
    if (message.apiKeyId !== undefined && message.apiKeyId !== "") {
      obj.apiKeyId = message.apiKeyId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteApiKeyRequest>, I>>(base?: I): DeleteApiKeyRequest {
    return DeleteApiKeyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteApiKeyRequest>, I>>(object: I): DeleteApiKeyRequest {
    const message = createBaseDeleteApiKeyRequest();
    message.apiKeyId = object.apiKeyId ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteApiKeyRequest.$type, DeleteApiKeyRequest);

function createBaseHolidayList(): HolidayList {
  return { $type: "pb.v1alpha1.HolidayList", id: "", name: "", holidays: [] };
}

export const HolidayList = {
  $type: "pb.v1alpha1.HolidayList" as const,

  encode(message: HolidayList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.holidays !== undefined && message.holidays.length !== 0) {
      for (const v of message.holidays) {
        DateMessage.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HolidayList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHolidayList();
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

          message.holidays!.push(DateMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HolidayList {
    return {
      $type: HolidayList.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      holidays: globalThis.Array.isArray(object?.holidays)
        ? object.holidays.map((e: any) => DateMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: HolidayList): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.holidays?.length) {
      obj.holidays = message.holidays.map((e) => DateMessage.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HolidayList>, I>>(base?: I): HolidayList {
    return HolidayList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HolidayList>, I>>(object: I): HolidayList {
    const message = createBaseHolidayList();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.holidays = object.holidays?.map((e) => DateMessage.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(HolidayList.$type, HolidayList);

function createBaseUpsertHolidayListRequest(): UpsertHolidayListRequest {
  return { $type: "pb.v1alpha1.UpsertHolidayListRequest", holidayList: [], overrideDuplicate: false };
}

export const UpsertHolidayListRequest = {
  $type: "pb.v1alpha1.UpsertHolidayListRequest" as const,

  encode(message: UpsertHolidayListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.holidayList !== undefined && message.holidayList.length !== 0) {
      for (const v of message.holidayList) {
        HolidayList.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.overrideDuplicate !== undefined && message.overrideDuplicate !== false) {
      writer.uint32(16).bool(message.overrideDuplicate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpsertHolidayListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpsertHolidayListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.holidayList!.push(HolidayList.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.overrideDuplicate = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpsertHolidayListRequest {
    return {
      $type: UpsertHolidayListRequest.$type,
      holidayList: globalThis.Array.isArray(object?.holidayList)
        ? object.holidayList.map((e: any) => HolidayList.fromJSON(e))
        : [],
      overrideDuplicate: isSet(object.overrideDuplicate) ? globalThis.Boolean(object.overrideDuplicate) : false,
    };
  },

  toJSON(message: UpsertHolidayListRequest): unknown {
    const obj: any = {};
    if (message.holidayList?.length) {
      obj.holidayList = message.holidayList.map((e) => HolidayList.toJSON(e));
    }
    if (message.overrideDuplicate !== undefined && message.overrideDuplicate !== false) {
      obj.overrideDuplicate = message.overrideDuplicate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpsertHolidayListRequest>, I>>(base?: I): UpsertHolidayListRequest {
    return UpsertHolidayListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpsertHolidayListRequest>, I>>(object: I): UpsertHolidayListRequest {
    const message = createBaseUpsertHolidayListRequest();
    message.holidayList = object.holidayList?.map((e) => HolidayList.fromPartial(e)) || [];
    message.overrideDuplicate = object.overrideDuplicate ?? false;
    return message;
  },
};

messageTypeRegistry.set(UpsertHolidayListRequest.$type, UpsertHolidayListRequest);

function createBaseGetHolidayListRequest(): GetHolidayListRequest {
  return { $type: "pb.v1alpha1.GetHolidayListRequest", id: "" };
}

export const GetHolidayListRequest = {
  $type: "pb.v1alpha1.GetHolidayListRequest" as const,

  encode(message: GetHolidayListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetHolidayListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHolidayListRequest();
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

  fromJSON(object: any): GetHolidayListRequest {
    return { $type: GetHolidayListRequest.$type, id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: GetHolidayListRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetHolidayListRequest>, I>>(base?: I): GetHolidayListRequest {
    return GetHolidayListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetHolidayListRequest>, I>>(object: I): GetHolidayListRequest {
    const message = createBaseGetHolidayListRequest();
    message.id = object.id ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetHolidayListRequest.$type, GetHolidayListRequest);

function createBaseListHolidayListsRequest(): ListHolidayListsRequest {
  return { $type: "pb.v1alpha1.ListHolidayListsRequest", pageNumber: 0, pageSize: 0 };
}

export const ListHolidayListsRequest = {
  $type: "pb.v1alpha1.ListHolidayListsRequest" as const,

  encode(message: ListHolidayListsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(8).int32(message.pageNumber);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListHolidayListsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListHolidayListsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.pageNumber = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListHolidayListsRequest {
    return {
      $type: ListHolidayListsRequest.$type,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
    };
  },

  toJSON(message: ListHolidayListsRequest): unknown {
    const obj: any = {};
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListHolidayListsRequest>, I>>(base?: I): ListHolidayListsRequest {
    return ListHolidayListsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListHolidayListsRequest>, I>>(object: I): ListHolidayListsRequest {
    const message = createBaseListHolidayListsRequest();
    message.pageNumber = object.pageNumber ?? 0;
    message.pageSize = object.pageSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListHolidayListsRequest.$type, ListHolidayListsRequest);

function createBaseListHolidayListsResponse(): ListHolidayListsResponse {
  return { $type: "pb.v1alpha1.ListHolidayListsResponse", holidayLists: [], count: 0 };
}

export const ListHolidayListsResponse = {
  $type: "pb.v1alpha1.ListHolidayListsResponse" as const,

  encode(message: ListHolidayListsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.holidayLists !== undefined && message.holidayLists.length !== 0) {
      for (const v of message.holidayLists) {
        HolidayList.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.count !== undefined && message.count !== 0) {
      writer.uint32(16).int64(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListHolidayListsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListHolidayListsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.holidayLists!.push(HolidayList.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.count = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListHolidayListsResponse {
    return {
      $type: ListHolidayListsResponse.$type,
      holidayLists: globalThis.Array.isArray(object?.holidayLists)
        ? object.holidayLists.map((e: any) => HolidayList.fromJSON(e))
        : [],
      count: isSet(object.count) ? globalThis.Number(object.count) : 0,
    };
  },

  toJSON(message: ListHolidayListsResponse): unknown {
    const obj: any = {};
    if (message.holidayLists?.length) {
      obj.holidayLists = message.holidayLists.map((e) => HolidayList.toJSON(e));
    }
    if (message.count !== undefined && message.count !== 0) {
      obj.count = Math.round(message.count);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListHolidayListsResponse>, I>>(base?: I): ListHolidayListsResponse {
    return ListHolidayListsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListHolidayListsResponse>, I>>(object: I): ListHolidayListsResponse {
    const message = createBaseListHolidayListsResponse();
    message.holidayLists = object.holidayLists?.map((e) => HolidayList.fromPartial(e)) || [];
    message.count = object.count ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListHolidayListsResponse.$type, ListHolidayListsResponse);

function createBaseDeleteHolidayListRequest(): DeleteHolidayListRequest {
  return { $type: "pb.v1alpha1.DeleteHolidayListRequest", id: "" };
}

export const DeleteHolidayListRequest = {
  $type: "pb.v1alpha1.DeleteHolidayListRequest" as const,

  encode(message: DeleteHolidayListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteHolidayListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteHolidayListRequest();
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

  fromJSON(object: any): DeleteHolidayListRequest {
    return { $type: DeleteHolidayListRequest.$type, id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: DeleteHolidayListRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteHolidayListRequest>, I>>(base?: I): DeleteHolidayListRequest {
    return DeleteHolidayListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteHolidayListRequest>, I>>(object: I): DeleteHolidayListRequest {
    const message = createBaseDeleteHolidayListRequest();
    message.id = object.id ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteHolidayListRequest.$type, DeleteHolidayListRequest);

export interface Organizations {
  /** Allows user to register an organization */
  CreateOrganization(request: DeepPartial<CreateOrganizationRequest>, metadata?: grpc.Metadata): Promise<Organization>;
  /** Returns information about an organization */
  GetOrganization(request: DeepPartial<GetOrganizationRequest>, metadata?: grpc.Metadata): Promise<Organization>;
  /** Updates the organization information */
  UpdateOrganization(request: DeepPartial<UpdateOrganizationRequest>, metadata?: grpc.Metadata): Promise<Organization>;
  /** Delete the organization */
  DeleteOrganization(request: DeepPartial<DeleteOrganizationRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  CreateApiKey(request: DeepPartial<CreateApiKeyRequest>, metadata?: grpc.Metadata): Promise<CreateApiKeyResponse>;
  UpdateApiKey(request: DeepPartial<UpdateApiKeyRequest>, metadata?: grpc.Metadata): Promise<UpdateApiKeyResponse>;
  ListApiKeys(request: DeepPartial<ListApiKeysRequest>, metadata?: grpc.Metadata): Promise<ListApiKeysResponse>;
  DeleteApiKey(request: DeepPartial<DeleteApiKeyRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  UpsertHolidayList(request: DeepPartial<UpsertHolidayListRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  GetHolidayList(request: DeepPartial<GetHolidayListRequest>, metadata?: grpc.Metadata): Promise<HolidayList>;
  ListHolidayLists(
    request: DeepPartial<ListHolidayListsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListHolidayListsResponse>;
  DeleteHolidayList(request: DeepPartial<DeleteHolidayListRequest>, metadata?: grpc.Metadata): Promise<Empty>;
}

export class OrganizationsClientImpl implements Organizations {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateOrganization = this.CreateOrganization.bind(this);
    this.GetOrganization = this.GetOrganization.bind(this);
    this.UpdateOrganization = this.UpdateOrganization.bind(this);
    this.DeleteOrganization = this.DeleteOrganization.bind(this);
    this.CreateApiKey = this.CreateApiKey.bind(this);
    this.UpdateApiKey = this.UpdateApiKey.bind(this);
    this.ListApiKeys = this.ListApiKeys.bind(this);
    this.DeleteApiKey = this.DeleteApiKey.bind(this);
    this.UpsertHolidayList = this.UpsertHolidayList.bind(this);
    this.GetHolidayList = this.GetHolidayList.bind(this);
    this.ListHolidayLists = this.ListHolidayLists.bind(this);
    this.DeleteHolidayList = this.DeleteHolidayList.bind(this);
  }

  CreateOrganization(request: DeepPartial<CreateOrganizationRequest>, metadata?: grpc.Metadata): Promise<Organization> {
    return this.rpc.unary(
      OrganizationsCreateOrganizationDesc,
      CreateOrganizationRequest.fromPartial(request),
      metadata,
    );
  }

  GetOrganization(request: DeepPartial<GetOrganizationRequest>, metadata?: grpc.Metadata): Promise<Organization> {
    return this.rpc.unary(OrganizationsGetOrganizationDesc, GetOrganizationRequest.fromPartial(request), metadata);
  }

  UpdateOrganization(request: DeepPartial<UpdateOrganizationRequest>, metadata?: grpc.Metadata): Promise<Organization> {
    return this.rpc.unary(
      OrganizationsUpdateOrganizationDesc,
      UpdateOrganizationRequest.fromPartial(request),
      metadata,
    );
  }

  DeleteOrganization(request: DeepPartial<DeleteOrganizationRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(
      OrganizationsDeleteOrganizationDesc,
      DeleteOrganizationRequest.fromPartial(request),
      metadata,
    );
  }

  CreateApiKey(request: DeepPartial<CreateApiKeyRequest>, metadata?: grpc.Metadata): Promise<CreateApiKeyResponse> {
    return this.rpc.unary(OrganizationsCreateApiKeyDesc, CreateApiKeyRequest.fromPartial(request), metadata);
  }

  UpdateApiKey(request: DeepPartial<UpdateApiKeyRequest>, metadata?: grpc.Metadata): Promise<UpdateApiKeyResponse> {
    return this.rpc.unary(OrganizationsUpdateApiKeyDesc, UpdateApiKeyRequest.fromPartial(request), metadata);
  }

  ListApiKeys(request: DeepPartial<ListApiKeysRequest>, metadata?: grpc.Metadata): Promise<ListApiKeysResponse> {
    return this.rpc.unary(OrganizationsListApiKeysDesc, ListApiKeysRequest.fromPartial(request), metadata);
  }

  DeleteApiKey(request: DeepPartial<DeleteApiKeyRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(OrganizationsDeleteApiKeyDesc, DeleteApiKeyRequest.fromPartial(request), metadata);
  }

  UpsertHolidayList(request: DeepPartial<UpsertHolidayListRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(OrganizationsUpsertHolidayListDesc, UpsertHolidayListRequest.fromPartial(request), metadata);
  }

  GetHolidayList(request: DeepPartial<GetHolidayListRequest>, metadata?: grpc.Metadata): Promise<HolidayList> {
    return this.rpc.unary(OrganizationsGetHolidayListDesc, GetHolidayListRequest.fromPartial(request), metadata);
  }

  ListHolidayLists(
    request: DeepPartial<ListHolidayListsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListHolidayListsResponse> {
    return this.rpc.unary(OrganizationsListHolidayListsDesc, ListHolidayListsRequest.fromPartial(request), metadata);
  }

  DeleteHolidayList(request: DeepPartial<DeleteHolidayListRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(OrganizationsDeleteHolidayListDesc, DeleteHolidayListRequest.fromPartial(request), metadata);
  }
}

export const OrganizationsDesc = { serviceName: "pb.v1alpha1.Organizations" };

export const OrganizationsCreateOrganizationDesc: UnaryMethodDefinitionish = {
  methodName: "CreateOrganization",
  service: OrganizationsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateOrganizationRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Organization.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrganizationsGetOrganizationDesc: UnaryMethodDefinitionish = {
  methodName: "GetOrganization",
  service: OrganizationsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetOrganizationRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Organization.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrganizationsUpdateOrganizationDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateOrganization",
  service: OrganizationsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateOrganizationRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Organization.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrganizationsDeleteOrganizationDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteOrganization",
  service: OrganizationsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteOrganizationRequest.encode(this).finish();
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

export const OrganizationsCreateApiKeyDesc: UnaryMethodDefinitionish = {
  methodName: "CreateApiKey",
  service: OrganizationsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateApiKeyRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateApiKeyResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrganizationsUpdateApiKeyDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateApiKey",
  service: OrganizationsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateApiKeyRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateApiKeyResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrganizationsListApiKeysDesc: UnaryMethodDefinitionish = {
  methodName: "ListApiKeys",
  service: OrganizationsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListApiKeysRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListApiKeysResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrganizationsDeleteApiKeyDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteApiKey",
  service: OrganizationsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteApiKeyRequest.encode(this).finish();
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

export const OrganizationsUpsertHolidayListDesc: UnaryMethodDefinitionish = {
  methodName: "UpsertHolidayList",
  service: OrganizationsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpsertHolidayListRequest.encode(this).finish();
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

export const OrganizationsGetHolidayListDesc: UnaryMethodDefinitionish = {
  methodName: "GetHolidayList",
  service: OrganizationsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetHolidayListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = HolidayList.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrganizationsListHolidayListsDesc: UnaryMethodDefinitionish = {
  methodName: "ListHolidayLists",
  service: OrganizationsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListHolidayListsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListHolidayListsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrganizationsDeleteHolidayListDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteHolidayList",
  service: OrganizationsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteHolidayListRequest.encode(this).finish();
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
