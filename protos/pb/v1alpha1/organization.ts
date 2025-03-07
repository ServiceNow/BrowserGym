/* eslint-disable */
import _m0 from "protobufjs/minimal";
import {
  WorkflowTemplateType,
  workflowTemplateTypeFromJSON,
  workflowTemplateTypeToJSON,
} from "../../common/workflow_common";
import { messageTypeRegistry } from "../../typeRegistry";
import { DataRetentionPolicy } from "./data_retention_policy";
import { SAMLConfig } from "./saml";

export const protobufPackage = "pb.v1alpha1";

export interface Organization {
  $type?: "pb.v1alpha1.Organization";
  /** Resource name. Format: organizations/{ID} */
  name?:
    | string
    | undefined;
  /** Human-friendly label for your organization, shown in user interfaces */
  displayName?:
    | string
    | undefined;
  /** Users who can CRUD all resources and be assigned to tasks. */
  admins?:
    | string[]
    | undefined;
  /** Users who can read or list assigned workflows and be assigned to tasks. */
  users?:
    | string[]
    | undefined;
  /** Template Workflows that can be used to create new Workflows. */
  workflowTemplateTypes?:
    | WorkflowTemplateType[]
    | undefined;
  /**
   * If set, all workflows in this organization will be tuned with this
   * hyperparameter resource.
   * Format: hyperparameters/{ID}
   */
  hyperparameterResourceName?:
    | string
    | undefined;
  /** Users who can create workflows */
  creators?:
    | string[]
    | undefined;
  /** Store SAML configuration for this organization */
  samlConfig?:
    | SAMLConfig
    | undefined;
  /** Different tenant type will have different data storage strategy. */
  tenantType?:
    | OrganizationTenantType
    | undefined;
  /** Data retention policy on organizational level */
  dataRetentionPolicy?: DataRetentionPolicy | undefined;
}

export enum OrganizationTenantType {
  UNSPECIFIED = 0,
  /** SHARED_TENANT - Shared tenant organization will store data in shared resources. */
  SHARED_TENANT = 1,
  /** SINGLE_TENANT - Single tenant organization will store data in separated resources. */
  SINGLE_TENANT = 2,
  UNRECOGNIZED = -1,
}

export function organizationTenantTypeFromJSON(object: any): OrganizationTenantType {
  switch (object) {
    case 0:
    case "TENANT_TYPE_UNSPECIFIED":
      return OrganizationTenantType.UNSPECIFIED;
    case 1:
    case "TENANT_TYPE_SHARED_TENANT":
      return OrganizationTenantType.SHARED_TENANT;
    case 2:
    case "TENANT_TYPE_SINGLE_TENANT":
      return OrganizationTenantType.SINGLE_TENANT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrganizationTenantType.UNRECOGNIZED;
  }
}

export function organizationTenantTypeToJSON(object: OrganizationTenantType): string {
  switch (object) {
    case OrganizationTenantType.UNSPECIFIED:
      return "TENANT_TYPE_UNSPECIFIED";
    case OrganizationTenantType.SHARED_TENANT:
      return "TENANT_TYPE_SHARED_TENANT";
    case OrganizationTenantType.SINGLE_TENANT:
      return "TENANT_TYPE_SINGLE_TENANT";
    case OrganizationTenantType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseOrganization(): Organization {
  return {
    $type: "pb.v1alpha1.Organization",
    name: "",
    displayName: "",
    admins: [],
    users: [],
    workflowTemplateTypes: [],
    hyperparameterResourceName: "",
    creators: [],
    samlConfig: undefined,
    tenantType: 0,
    dataRetentionPolicy: undefined,
  };
}

export const Organization = {
  $type: "pb.v1alpha1.Organization" as const,

  encode(message: Organization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.admins !== undefined && message.admins.length !== 0) {
      for (const v of message.admins) {
        writer.uint32(26).string(v!);
      }
    }
    if (message.users !== undefined && message.users.length !== 0) {
      for (const v of message.users) {
        writer.uint32(34).string(v!);
      }
    }
    if (message.workflowTemplateTypes !== undefined && message.workflowTemplateTypes.length !== 0) {
      writer.uint32(42).fork();
      for (const v of message.workflowTemplateTypes) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.hyperparameterResourceName !== undefined && message.hyperparameterResourceName !== "") {
      writer.uint32(50).string(message.hyperparameterResourceName);
    }
    if (message.creators !== undefined && message.creators.length !== 0) {
      for (const v of message.creators) {
        writer.uint32(58).string(v!);
      }
    }
    if (message.samlConfig !== undefined) {
      SAMLConfig.encode(message.samlConfig, writer.uint32(66).fork()).ldelim();
    }
    if (message.tenantType !== undefined && message.tenantType !== 0) {
      writer.uint32(72).int32(message.tenantType);
    }
    if (message.dataRetentionPolicy !== undefined) {
      DataRetentionPolicy.encode(message.dataRetentionPolicy, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Organization {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrganization();
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

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.admins!.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.users!.push(reader.string());
          continue;
        case 5:
          if (tag === 40) {
            message.workflowTemplateTypes!.push(reader.int32() as any);

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.workflowTemplateTypes!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.hyperparameterResourceName = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.creators!.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.samlConfig = SAMLConfig.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.tenantType = reader.int32() as any;
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.dataRetentionPolicy = DataRetentionPolicy.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Organization {
    return {
      $type: Organization.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      admins: globalThis.Array.isArray(object?.admins) ? object.admins.map((e: any) => globalThis.String(e)) : [],
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => globalThis.String(e)) : [],
      workflowTemplateTypes: globalThis.Array.isArray(object?.workflowTemplateTypes)
        ? object.workflowTemplateTypes.map((e: any) => workflowTemplateTypeFromJSON(e))
        : [],
      hyperparameterResourceName: isSet(object.hyperparameterResourceName)
        ? globalThis.String(object.hyperparameterResourceName)
        : "",
      creators: globalThis.Array.isArray(object?.creators) ? object.creators.map((e: any) => globalThis.String(e)) : [],
      samlConfig: isSet(object.samlConfig) ? SAMLConfig.fromJSON(object.samlConfig) : undefined,
      tenantType: isSet(object.tenantType) ? organizationTenantTypeFromJSON(object.tenantType) : 0,
      dataRetentionPolicy: isSet(object.dataRetentionPolicy)
        ? DataRetentionPolicy.fromJSON(object.dataRetentionPolicy)
        : undefined,
    };
  },

  toJSON(message: Organization): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.admins?.length) {
      obj.admins = message.admins;
    }
    if (message.users?.length) {
      obj.users = message.users;
    }
    if (message.workflowTemplateTypes?.length) {
      obj.workflowTemplateTypes = message.workflowTemplateTypes.map((e) => workflowTemplateTypeToJSON(e));
    }
    if (message.hyperparameterResourceName !== undefined && message.hyperparameterResourceName !== "") {
      obj.hyperparameterResourceName = message.hyperparameterResourceName;
    }
    if (message.creators?.length) {
      obj.creators = message.creators;
    }
    if (message.samlConfig !== undefined) {
      obj.samlConfig = SAMLConfig.toJSON(message.samlConfig);
    }
    if (message.tenantType !== undefined && message.tenantType !== 0) {
      obj.tenantType = organizationTenantTypeToJSON(message.tenantType);
    }
    if (message.dataRetentionPolicy !== undefined) {
      obj.dataRetentionPolicy = DataRetentionPolicy.toJSON(message.dataRetentionPolicy);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Organization>, I>>(base?: I): Organization {
    return Organization.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Organization>, I>>(object: I): Organization {
    const message = createBaseOrganization();
    message.name = object.name ?? "";
    message.displayName = object.displayName ?? "";
    message.admins = object.admins?.map((e) => e) || [];
    message.users = object.users?.map((e) => e) || [];
    message.workflowTemplateTypes = object.workflowTemplateTypes?.map((e) => e) || [];
    message.hyperparameterResourceName = object.hyperparameterResourceName ?? "";
    message.creators = object.creators?.map((e) => e) || [];
    message.samlConfig = (object.samlConfig !== undefined && object.samlConfig !== null)
      ? SAMLConfig.fromPartial(object.samlConfig)
      : undefined;
    message.tenantType = object.tenantType ?? 0;
    message.dataRetentionPolicy = (object.dataRetentionPolicy !== undefined && object.dataRetentionPolicy !== null)
      ? DataRetentionPolicy.fromPartial(object.dataRetentionPolicy)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(Organization.$type, Organization);

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
