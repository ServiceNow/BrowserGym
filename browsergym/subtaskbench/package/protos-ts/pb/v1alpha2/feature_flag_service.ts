/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Empty } from "../../google/protobuf/empty";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha2";

export interface FeatureFlag {
  $type?: "pb.v1alpha2.FeatureFlag";
  id?:
    | string
    | undefined;
  /** feature flag name is unique across the system */
  name?: string | undefined;
  description?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedBy?: string | undefined;
  rule?: Rule | undefined;
}

/**
 * Rule defines the conditions for enabling or blocking the feature flag
 * If enabled is true, the feature flag is enabled for all users unless
 * the user is in the blocked_users list or the user's organization is in the blocked_orgs list
 * If enabled is false, the feature flag is disabled for all users unless
 * the user is in the enabled_users list or the user's organization is in the enabled_orgs list
 */
export interface Rule {
  $type?: "pb.v1alpha2.Rule";
  enabled?:
    | boolean
    | undefined;
  /** list of usernames (like email, xxx@orbby.ai) */
  enabledUsers?:
    | string[]
    | undefined;
  /** list of organization ids (pure object ids, like 6150ccc742d39feae9fc640g) */
  enabledOrgs?: string[] | undefined;
  blockedUsers?: string[] | undefined;
  blockedOrgs?:
    | string[]
    | undefined;
  /** list of workflow ids (pure object ids, like 6150ccc742d39feae9fc640g) */
  enabledWorkflows?: string[] | undefined;
  blockedWorkflows?: string[] | undefined;
}

export interface CreateFeatureFlagRequest {
  $type?: "pb.v1alpha2.CreateFeatureFlagRequest";
  name?: string | undefined;
  description?: string | undefined;
  rule?: Rule | undefined;
}

export interface UpdateFeatureFlagRequest {
  $type?: "pb.v1alpha2.UpdateFeatureFlagRequest";
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  rule?: Rule | undefined;
}

export interface DeleteFeatureFlagRequest {
  $type?: "pb.v1alpha2.DeleteFeatureFlagRequest";
  id?: string | undefined;
}

export interface GetFeatureFlagRequest {
  $type?: "pb.v1alpha2.GetFeatureFlagRequest";
  id?: string | undefined;
}

export interface ListFeatureFlagsRequest {
  $type?: "pb.v1alpha2.ListFeatureFlagsRequest";
  /** 1-based index */
  page?: number | undefined;
  pageSize?: number | undefined;
}

export interface ListFeatureFlagsResponse {
  $type?: "pb.v1alpha2.ListFeatureFlagsResponse";
  featureFlags?: FeatureFlag[] | undefined;
  totalSize?: number | undefined;
  nextPageToken?: string | undefined;
}

/**
 * Fetch feature flags for the current user and organization
 * User is identified from the context
 */
export interface GetFeatureFlagsForOrgAndUserRequest {
  $type?: "pb.v1alpha2.GetFeatureFlagsForOrgAndUserRequest";
  orgResourceName?: string | undefined;
}

export interface GetFeatureFlagsForOrgAndUserResponse {
  $type?: "pb.v1alpha2.GetFeatureFlagsForOrgAndUserResponse";
  /** map of feature flag evaluation results */
  featureFlags?: { [key: string]: boolean } | undefined;
}

export interface GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry {
  $type?: "pb.v1alpha2.GetFeatureFlagsForOrgAndUserResponse.FeatureFlagsEntry";
  key: string;
  value: boolean;
}

function createBaseFeatureFlag(): FeatureFlag {
  return {
    $type: "pb.v1alpha2.FeatureFlag",
    id: "",
    name: "",
    description: "",
    createdAt: undefined,
    updatedAt: undefined,
    createdBy: "",
    updatedBy: "",
    rule: undefined,
  };
}

export const FeatureFlag = {
  $type: "pb.v1alpha2.FeatureFlag" as const,

  encode(message: FeatureFlag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(42).fork()).ldelim();
    }
    if (message.createdBy !== undefined && message.createdBy !== "") {
      writer.uint32(50).string(message.createdBy);
    }
    if (message.updatedBy !== undefined && message.updatedBy !== "") {
      writer.uint32(58).string(message.updatedBy);
    }
    if (message.rule !== undefined) {
      Rule.encode(message.rule, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FeatureFlag {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeatureFlag();
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

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.createdBy = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.updatedBy = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.rule = Rule.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FeatureFlag {
    return {
      $type: FeatureFlag.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      createdBy: isSet(object.createdBy) ? globalThis.String(object.createdBy) : "",
      updatedBy: isSet(object.updatedBy) ? globalThis.String(object.updatedBy) : "",
      rule: isSet(object.rule) ? Rule.fromJSON(object.rule) : undefined,
    };
  },

  toJSON(message: FeatureFlag): unknown {
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
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    if (message.updatedAt !== undefined) {
      obj.updatedAt = message.updatedAt.toISOString();
    }
    if (message.createdBy !== undefined && message.createdBy !== "") {
      obj.createdBy = message.createdBy;
    }
    if (message.updatedBy !== undefined && message.updatedBy !== "") {
      obj.updatedBy = message.updatedBy;
    }
    if (message.rule !== undefined) {
      obj.rule = Rule.toJSON(message.rule);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FeatureFlag>, I>>(base?: I): FeatureFlag {
    return FeatureFlag.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FeatureFlag>, I>>(object: I): FeatureFlag {
    const message = createBaseFeatureFlag();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.createdBy = object.createdBy ?? "";
    message.updatedBy = object.updatedBy ?? "";
    message.rule = (object.rule !== undefined && object.rule !== null) ? Rule.fromPartial(object.rule) : undefined;
    return message;
  },
};

messageTypeRegistry.set(FeatureFlag.$type, FeatureFlag);

function createBaseRule(): Rule {
  return {
    $type: "pb.v1alpha2.Rule",
    enabled: false,
    enabledUsers: [],
    enabledOrgs: [],
    blockedUsers: [],
    blockedOrgs: [],
    enabledWorkflows: [],
    blockedWorkflows: [],
  };
}

export const Rule = {
  $type: "pb.v1alpha2.Rule" as const,

  encode(message: Rule, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.enabled !== undefined && message.enabled !== false) {
      writer.uint32(8).bool(message.enabled);
    }
    if (message.enabledUsers !== undefined && message.enabledUsers.length !== 0) {
      for (const v of message.enabledUsers) {
        writer.uint32(18).string(v!);
      }
    }
    if (message.enabledOrgs !== undefined && message.enabledOrgs.length !== 0) {
      for (const v of message.enabledOrgs) {
        writer.uint32(26).string(v!);
      }
    }
    if (message.blockedUsers !== undefined && message.blockedUsers.length !== 0) {
      for (const v of message.blockedUsers) {
        writer.uint32(34).string(v!);
      }
    }
    if (message.blockedOrgs !== undefined && message.blockedOrgs.length !== 0) {
      for (const v of message.blockedOrgs) {
        writer.uint32(42).string(v!);
      }
    }
    if (message.enabledWorkflows !== undefined && message.enabledWorkflows.length !== 0) {
      for (const v of message.enabledWorkflows) {
        writer.uint32(50).string(v!);
      }
    }
    if (message.blockedWorkflows !== undefined && message.blockedWorkflows.length !== 0) {
      for (const v of message.blockedWorkflows) {
        writer.uint32(58).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Rule {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.enabled = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.enabledUsers!.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.enabledOrgs!.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.blockedUsers!.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.blockedOrgs!.push(reader.string());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.enabledWorkflows!.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.blockedWorkflows!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Rule {
    return {
      $type: Rule.$type,
      enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false,
      enabledUsers: globalThis.Array.isArray(object?.enabledUsers)
        ? object.enabledUsers.map((e: any) => globalThis.String(e))
        : [],
      enabledOrgs: globalThis.Array.isArray(object?.enabledOrgs)
        ? object.enabledOrgs.map((e: any) => globalThis.String(e))
        : [],
      blockedUsers: globalThis.Array.isArray(object?.blockedUsers)
        ? object.blockedUsers.map((e: any) => globalThis.String(e))
        : [],
      blockedOrgs: globalThis.Array.isArray(object?.blockedOrgs)
        ? object.blockedOrgs.map((e: any) => globalThis.String(e))
        : [],
      enabledWorkflows: globalThis.Array.isArray(object?.enabledWorkflows)
        ? object.enabledWorkflows.map((e: any) => globalThis.String(e))
        : [],
      blockedWorkflows: globalThis.Array.isArray(object?.blockedWorkflows)
        ? object.blockedWorkflows.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: Rule): unknown {
    const obj: any = {};
    if (message.enabled !== undefined && message.enabled !== false) {
      obj.enabled = message.enabled;
    }
    if (message.enabledUsers?.length) {
      obj.enabledUsers = message.enabledUsers;
    }
    if (message.enabledOrgs?.length) {
      obj.enabledOrgs = message.enabledOrgs;
    }
    if (message.blockedUsers?.length) {
      obj.blockedUsers = message.blockedUsers;
    }
    if (message.blockedOrgs?.length) {
      obj.blockedOrgs = message.blockedOrgs;
    }
    if (message.enabledWorkflows?.length) {
      obj.enabledWorkflows = message.enabledWorkflows;
    }
    if (message.blockedWorkflows?.length) {
      obj.blockedWorkflows = message.blockedWorkflows;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Rule>, I>>(base?: I): Rule {
    return Rule.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Rule>, I>>(object: I): Rule {
    const message = createBaseRule();
    message.enabled = object.enabled ?? false;
    message.enabledUsers = object.enabledUsers?.map((e) => e) || [];
    message.enabledOrgs = object.enabledOrgs?.map((e) => e) || [];
    message.blockedUsers = object.blockedUsers?.map((e) => e) || [];
    message.blockedOrgs = object.blockedOrgs?.map((e) => e) || [];
    message.enabledWorkflows = object.enabledWorkflows?.map((e) => e) || [];
    message.blockedWorkflows = object.blockedWorkflows?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(Rule.$type, Rule);

function createBaseCreateFeatureFlagRequest(): CreateFeatureFlagRequest {
  return { $type: "pb.v1alpha2.CreateFeatureFlagRequest", name: "", description: "", rule: undefined };
}

export const CreateFeatureFlagRequest = {
  $type: "pb.v1alpha2.CreateFeatureFlagRequest" as const,

  encode(message: CreateFeatureFlagRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.rule !== undefined) {
      Rule.encode(message.rule, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateFeatureFlagRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateFeatureFlagRequest();
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

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rule = Rule.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateFeatureFlagRequest {
    return {
      $type: CreateFeatureFlagRequest.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      rule: isSet(object.rule) ? Rule.fromJSON(object.rule) : undefined,
    };
  },

  toJSON(message: CreateFeatureFlagRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.rule !== undefined) {
      obj.rule = Rule.toJSON(message.rule);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateFeatureFlagRequest>, I>>(base?: I): CreateFeatureFlagRequest {
    return CreateFeatureFlagRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateFeatureFlagRequest>, I>>(object: I): CreateFeatureFlagRequest {
    const message = createBaseCreateFeatureFlagRequest();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.rule = (object.rule !== undefined && object.rule !== null) ? Rule.fromPartial(object.rule) : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateFeatureFlagRequest.$type, CreateFeatureFlagRequest);

function createBaseUpdateFeatureFlagRequest(): UpdateFeatureFlagRequest {
  return { $type: "pb.v1alpha2.UpdateFeatureFlagRequest", id: "", name: "", description: "", rule: undefined };
}

export const UpdateFeatureFlagRequest = {
  $type: "pb.v1alpha2.UpdateFeatureFlagRequest" as const,

  encode(message: UpdateFeatureFlagRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.rule !== undefined) {
      Rule.encode(message.rule, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateFeatureFlagRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateFeatureFlagRequest();
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

          message.rule = Rule.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateFeatureFlagRequest {
    return {
      $type: UpdateFeatureFlagRequest.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      rule: isSet(object.rule) ? Rule.fromJSON(object.rule) : undefined,
    };
  },

  toJSON(message: UpdateFeatureFlagRequest): unknown {
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
    if (message.rule !== undefined) {
      obj.rule = Rule.toJSON(message.rule);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateFeatureFlagRequest>, I>>(base?: I): UpdateFeatureFlagRequest {
    return UpdateFeatureFlagRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateFeatureFlagRequest>, I>>(object: I): UpdateFeatureFlagRequest {
    const message = createBaseUpdateFeatureFlagRequest();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.rule = (object.rule !== undefined && object.rule !== null) ? Rule.fromPartial(object.rule) : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateFeatureFlagRequest.$type, UpdateFeatureFlagRequest);

function createBaseDeleteFeatureFlagRequest(): DeleteFeatureFlagRequest {
  return { $type: "pb.v1alpha2.DeleteFeatureFlagRequest", id: "" };
}

export const DeleteFeatureFlagRequest = {
  $type: "pb.v1alpha2.DeleteFeatureFlagRequest" as const,

  encode(message: DeleteFeatureFlagRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteFeatureFlagRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteFeatureFlagRequest();
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

  fromJSON(object: any): DeleteFeatureFlagRequest {
    return { $type: DeleteFeatureFlagRequest.$type, id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: DeleteFeatureFlagRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteFeatureFlagRequest>, I>>(base?: I): DeleteFeatureFlagRequest {
    return DeleteFeatureFlagRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteFeatureFlagRequest>, I>>(object: I): DeleteFeatureFlagRequest {
    const message = createBaseDeleteFeatureFlagRequest();
    message.id = object.id ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteFeatureFlagRequest.$type, DeleteFeatureFlagRequest);

function createBaseGetFeatureFlagRequest(): GetFeatureFlagRequest {
  return { $type: "pb.v1alpha2.GetFeatureFlagRequest", id: "" };
}

export const GetFeatureFlagRequest = {
  $type: "pb.v1alpha2.GetFeatureFlagRequest" as const,

  encode(message: GetFeatureFlagRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFeatureFlagRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFeatureFlagRequest();
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

  fromJSON(object: any): GetFeatureFlagRequest {
    return { $type: GetFeatureFlagRequest.$type, id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: GetFeatureFlagRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFeatureFlagRequest>, I>>(base?: I): GetFeatureFlagRequest {
    return GetFeatureFlagRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFeatureFlagRequest>, I>>(object: I): GetFeatureFlagRequest {
    const message = createBaseGetFeatureFlagRequest();
    message.id = object.id ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetFeatureFlagRequest.$type, GetFeatureFlagRequest);

function createBaseListFeatureFlagsRequest(): ListFeatureFlagsRequest {
  return { $type: "pb.v1alpha2.ListFeatureFlagsRequest", page: 0, pageSize: 0 };
}

export const ListFeatureFlagsRequest = {
  $type: "pb.v1alpha2.ListFeatureFlagsRequest" as const,

  encode(message: ListFeatureFlagsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.page !== undefined && message.page !== 0) {
      writer.uint32(8).int32(message.page);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListFeatureFlagsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListFeatureFlagsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.page = reader.int32();
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

  fromJSON(object: any): ListFeatureFlagsRequest {
    return {
      $type: ListFeatureFlagsRequest.$type,
      page: isSet(object.page) ? globalThis.Number(object.page) : 0,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
    };
  },

  toJSON(message: ListFeatureFlagsRequest): unknown {
    const obj: any = {};
    if (message.page !== undefined && message.page !== 0) {
      obj.page = Math.round(message.page);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListFeatureFlagsRequest>, I>>(base?: I): ListFeatureFlagsRequest {
    return ListFeatureFlagsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListFeatureFlagsRequest>, I>>(object: I): ListFeatureFlagsRequest {
    const message = createBaseListFeatureFlagsRequest();
    message.page = object.page ?? 0;
    message.pageSize = object.pageSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListFeatureFlagsRequest.$type, ListFeatureFlagsRequest);

function createBaseListFeatureFlagsResponse(): ListFeatureFlagsResponse {
  return { $type: "pb.v1alpha2.ListFeatureFlagsResponse", featureFlags: [], totalSize: 0, nextPageToken: "" };
}

export const ListFeatureFlagsResponse = {
  $type: "pb.v1alpha2.ListFeatureFlagsResponse" as const,

  encode(message: ListFeatureFlagsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.featureFlags !== undefined && message.featureFlags.length !== 0) {
      for (const v of message.featureFlags) {
        FeatureFlag.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(16).int32(message.totalSize);
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      writer.uint32(26).string(message.nextPageToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListFeatureFlagsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListFeatureFlagsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.featureFlags!.push(FeatureFlag.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalSize = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nextPageToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListFeatureFlagsResponse {
    return {
      $type: ListFeatureFlagsResponse.$type,
      featureFlags: globalThis.Array.isArray(object?.featureFlags)
        ? object.featureFlags.map((e: any) => FeatureFlag.fromJSON(e))
        : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
    };
  },

  toJSON(message: ListFeatureFlagsResponse): unknown {
    const obj: any = {};
    if (message.featureFlags?.length) {
      obj.featureFlags = message.featureFlags.map((e) => FeatureFlag.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListFeatureFlagsResponse>, I>>(base?: I): ListFeatureFlagsResponse {
    return ListFeatureFlagsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListFeatureFlagsResponse>, I>>(object: I): ListFeatureFlagsResponse {
    const message = createBaseListFeatureFlagsResponse();
    message.featureFlags = object.featureFlags?.map((e) => FeatureFlag.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    message.nextPageToken = object.nextPageToken ?? "";
    return message;
  },
};

messageTypeRegistry.set(ListFeatureFlagsResponse.$type, ListFeatureFlagsResponse);

function createBaseGetFeatureFlagsForOrgAndUserRequest(): GetFeatureFlagsForOrgAndUserRequest {
  return { $type: "pb.v1alpha2.GetFeatureFlagsForOrgAndUserRequest", orgResourceName: "" };
}

export const GetFeatureFlagsForOrgAndUserRequest = {
  $type: "pb.v1alpha2.GetFeatureFlagsForOrgAndUserRequest" as const,

  encode(message: GetFeatureFlagsForOrgAndUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(10).string(message.orgResourceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFeatureFlagsForOrgAndUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFeatureFlagsForOrgAndUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): GetFeatureFlagsForOrgAndUserRequest {
    return {
      $type: GetFeatureFlagsForOrgAndUserRequest.$type,
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
    };
  },

  toJSON(message: GetFeatureFlagsForOrgAndUserRequest): unknown {
    const obj: any = {};
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFeatureFlagsForOrgAndUserRequest>, I>>(
    base?: I,
  ): GetFeatureFlagsForOrgAndUserRequest {
    return GetFeatureFlagsForOrgAndUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFeatureFlagsForOrgAndUserRequest>, I>>(
    object: I,
  ): GetFeatureFlagsForOrgAndUserRequest {
    const message = createBaseGetFeatureFlagsForOrgAndUserRequest();
    message.orgResourceName = object.orgResourceName ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetFeatureFlagsForOrgAndUserRequest.$type, GetFeatureFlagsForOrgAndUserRequest);

function createBaseGetFeatureFlagsForOrgAndUserResponse(): GetFeatureFlagsForOrgAndUserResponse {
  return { $type: "pb.v1alpha2.GetFeatureFlagsForOrgAndUserResponse", featureFlags: {} };
}

export const GetFeatureFlagsForOrgAndUserResponse = {
  $type: "pb.v1alpha2.GetFeatureFlagsForOrgAndUserResponse" as const,

  encode(message: GetFeatureFlagsForOrgAndUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.featureFlags || {}).forEach(([key, value]) => {
      GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry.encode({
        $type: "pb.v1alpha2.GetFeatureFlagsForOrgAndUserResponse.FeatureFlagsEntry",
        key: key as any,
        value,
      }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFeatureFlagsForOrgAndUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFeatureFlagsForOrgAndUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.featureFlags![entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFeatureFlagsForOrgAndUserResponse {
    return {
      $type: GetFeatureFlagsForOrgAndUserResponse.$type,
      featureFlags: isObject(object.featureFlags)
        ? Object.entries(object.featureFlags).reduce<{ [key: string]: boolean }>((acc, [key, value]) => {
          acc[key] = Boolean(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: GetFeatureFlagsForOrgAndUserResponse): unknown {
    const obj: any = {};
    if (message.featureFlags) {
      const entries = Object.entries(message.featureFlags);
      if (entries.length > 0) {
        obj.featureFlags = {};
        entries.forEach(([k, v]) => {
          obj.featureFlags[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFeatureFlagsForOrgAndUserResponse>, I>>(
    base?: I,
  ): GetFeatureFlagsForOrgAndUserResponse {
    return GetFeatureFlagsForOrgAndUserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFeatureFlagsForOrgAndUserResponse>, I>>(
    object: I,
  ): GetFeatureFlagsForOrgAndUserResponse {
    const message = createBaseGetFeatureFlagsForOrgAndUserResponse();
    message.featureFlags = Object.entries(object.featureFlags ?? {}).reduce<{ [key: string]: boolean }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = globalThis.Boolean(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

messageTypeRegistry.set(GetFeatureFlagsForOrgAndUserResponse.$type, GetFeatureFlagsForOrgAndUserResponse);

function createBaseGetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry(): GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry {
  return { $type: "pb.v1alpha2.GetFeatureFlagsForOrgAndUserResponse.FeatureFlagsEntry", key: "", value: false };
}

export const GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry = {
  $type: "pb.v1alpha2.GetFeatureFlagsForOrgAndUserResponse.FeatureFlagsEntry" as const,

  encode(
    message: GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== false) {
      writer.uint32(16).bool(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry {
    return {
      $type: GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.Boolean(object.value) : false,
    };
  },

  toJSON(message: GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== false) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry>, I>>(
    base?: I,
  ): GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry {
    return GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry>, I>>(
    object: I,
  ): GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry {
    const message = createBaseGetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? false;
    return message;
  },
};

messageTypeRegistry.set(
  GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry.$type,
  GetFeatureFlagsForOrgAndUserResponseFeatureFlagsEntry,
);

export interface FeatureFlags {
  CreateFeatureFlag(request: DeepPartial<CreateFeatureFlagRequest>, metadata?: grpc.Metadata): Promise<FeatureFlag>;
  UpdateFeatureFlag(request: DeepPartial<UpdateFeatureFlagRequest>, metadata?: grpc.Metadata): Promise<FeatureFlag>;
  DeleteFeatureFlag(request: DeepPartial<DeleteFeatureFlagRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  GetFeatureFlag(request: DeepPartial<GetFeatureFlagRequest>, metadata?: grpc.Metadata): Promise<FeatureFlag>;
  ListFeatureFlags(
    request: DeepPartial<ListFeatureFlagsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListFeatureFlagsResponse>;
  /** GetFeatureFlagsForOrgAndUser returns a map of feature flag evaluation results for the current user and organization */
  GetFeatureFlagsForOrgAndUser(
    request: DeepPartial<GetFeatureFlagsForOrgAndUserRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetFeatureFlagsForOrgAndUserResponse>;
}

export class FeatureFlagsClientImpl implements FeatureFlags {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateFeatureFlag = this.CreateFeatureFlag.bind(this);
    this.UpdateFeatureFlag = this.UpdateFeatureFlag.bind(this);
    this.DeleteFeatureFlag = this.DeleteFeatureFlag.bind(this);
    this.GetFeatureFlag = this.GetFeatureFlag.bind(this);
    this.ListFeatureFlags = this.ListFeatureFlags.bind(this);
    this.GetFeatureFlagsForOrgAndUser = this.GetFeatureFlagsForOrgAndUser.bind(this);
  }

  CreateFeatureFlag(request: DeepPartial<CreateFeatureFlagRequest>, metadata?: grpc.Metadata): Promise<FeatureFlag> {
    return this.rpc.unary(FeatureFlagsCreateFeatureFlagDesc, CreateFeatureFlagRequest.fromPartial(request), metadata);
  }

  UpdateFeatureFlag(request: DeepPartial<UpdateFeatureFlagRequest>, metadata?: grpc.Metadata): Promise<FeatureFlag> {
    return this.rpc.unary(FeatureFlagsUpdateFeatureFlagDesc, UpdateFeatureFlagRequest.fromPartial(request), metadata);
  }

  DeleteFeatureFlag(request: DeepPartial<DeleteFeatureFlagRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(FeatureFlagsDeleteFeatureFlagDesc, DeleteFeatureFlagRequest.fromPartial(request), metadata);
  }

  GetFeatureFlag(request: DeepPartial<GetFeatureFlagRequest>, metadata?: grpc.Metadata): Promise<FeatureFlag> {
    return this.rpc.unary(FeatureFlagsGetFeatureFlagDesc, GetFeatureFlagRequest.fromPartial(request), metadata);
  }

  ListFeatureFlags(
    request: DeepPartial<ListFeatureFlagsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListFeatureFlagsResponse> {
    return this.rpc.unary(FeatureFlagsListFeatureFlagsDesc, ListFeatureFlagsRequest.fromPartial(request), metadata);
  }

  GetFeatureFlagsForOrgAndUser(
    request: DeepPartial<GetFeatureFlagsForOrgAndUserRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetFeatureFlagsForOrgAndUserResponse> {
    return this.rpc.unary(
      FeatureFlagsGetFeatureFlagsForOrgAndUserDesc,
      GetFeatureFlagsForOrgAndUserRequest.fromPartial(request),
      metadata,
    );
  }
}

export const FeatureFlagsDesc = { serviceName: "pb.v1alpha2.FeatureFlags" };

export const FeatureFlagsCreateFeatureFlagDesc: UnaryMethodDefinitionish = {
  methodName: "CreateFeatureFlag",
  service: FeatureFlagsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateFeatureFlagRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = FeatureFlag.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const FeatureFlagsUpdateFeatureFlagDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateFeatureFlag",
  service: FeatureFlagsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateFeatureFlagRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = FeatureFlag.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const FeatureFlagsDeleteFeatureFlagDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteFeatureFlag",
  service: FeatureFlagsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteFeatureFlagRequest.encode(this).finish();
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

export const FeatureFlagsGetFeatureFlagDesc: UnaryMethodDefinitionish = {
  methodName: "GetFeatureFlag",
  service: FeatureFlagsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetFeatureFlagRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = FeatureFlag.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const FeatureFlagsListFeatureFlagsDesc: UnaryMethodDefinitionish = {
  methodName: "ListFeatureFlags",
  service: FeatureFlagsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListFeatureFlagsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListFeatureFlagsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const FeatureFlagsGetFeatureFlagsForOrgAndUserDesc: UnaryMethodDefinitionish = {
  methodName: "GetFeatureFlagsForOrgAndUser",
  service: FeatureFlagsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetFeatureFlagsForOrgAndUserRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetFeatureFlagsForOrgAndUserResponse.decode(data);
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
