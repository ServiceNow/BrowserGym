/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import {
  AnnouncementContentBlock,
  AnnouncementContentMarkdown,
  AnnouncementType,
  announcementTypeFromJSON,
  announcementTypeToJSON,
} from "../../common/announcement";
import { Hyperparameter } from "../../common/hyperparameter";
import { Empty } from "../../google/protobuf/empty";
import { FieldMask } from "../../google/protobuf/field_mask";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import { Organization } from "../v1alpha1/organization";
import { UpdateOrganizationRequest } from "../v1alpha1/organization_service";
import { UpdateWorkflowRequest, Workflow } from "../v1alpha2/workflows_service";

export const protobufPackage = "pb.orby_internal";

export enum Role {
  /** UNSPECIFIED - Internal user role */
  UNSPECIFIED = 0,
  /** INTERNAL_USER - Allowed to access the internal app */
  INTERNAL_USER = 1,
  /** INTERNAL_BILLING_MANAGER - Allowed to access the internal app and manage billing */
  INTERNAL_BILLING_MANAGER = 2,
  /** INTERNAL_ADMIN - Allowed to access the internal app, manage billing and manage users */
  INTERNAL_ADMIN = 3,
  /**
   * INTERNAL_REVIEWER - Note: This is not configured on the user, it's configured at
   * the workflow/organisation namespace
   * in Ory allowing them to download respecive data.
   */
  INTERNAL_REVIEWER = 4,
  UNRECOGNIZED = -1,
}

export function roleFromJSON(object: any): Role {
  switch (object) {
    case 0:
    case "ROLE_UNSPECIFIED":
      return Role.UNSPECIFIED;
    case 1:
    case "ROLE_INTERNAL_USER":
      return Role.INTERNAL_USER;
    case 2:
    case "ROLE_INTERNAL_BILLING_MANAGER":
      return Role.INTERNAL_BILLING_MANAGER;
    case 3:
    case "ROLE_INTERNAL_ADMIN":
      return Role.INTERNAL_ADMIN;
    case 4:
    case "ROLE_INTERNAL_REVIEWER":
      return Role.INTERNAL_REVIEWER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Role.UNRECOGNIZED;
  }
}

export function roleToJSON(object: Role): string {
  switch (object) {
    case Role.UNSPECIFIED:
      return "ROLE_UNSPECIFIED";
    case Role.INTERNAL_USER:
      return "ROLE_INTERNAL_USER";
    case Role.INTERNAL_BILLING_MANAGER:
      return "ROLE_INTERNAL_BILLING_MANAGER";
    case Role.INTERNAL_ADMIN:
      return "ROLE_INTERNAL_ADMIN";
    case Role.INTERNAL_REVIEWER:
      return "ROLE_INTERNAL_REVIEWER";
    case Role.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CreateUserRequest {
  $type?: "pb.orby_internal.CreateUserRequest";
  /** user_id same as the _id stored in mongoDB users collection */
  userId?:
    | string
    | undefined;
  /** Email address of the user as stored in mongoDB users collection */
  email?: string | undefined;
}

export interface CreateUserResponse {
  $type?: "pb.orby_internal.CreateUserResponse";
  /** user_id same as the _id stored in mongoDB users collection */
  userId?: string | undefined;
  role?: Role | undefined;
}

export interface UpdateUserRequest {
  $type?: "pb.orby_internal.UpdateUserRequest";
  /** user_id same as the _id stored in mongoDB users collection */
  userId?:
    | string
    | undefined;
  /** Email address of the user as stored in mongoDB users collection */
  email?: string | undefined;
  role?:
    | Role
    | undefined;
  /** Organization name: organizations/{organization_id} */
  organizationResourceName?:
    | string
    | undefined;
  /** Workflow name: workflows/{workflow_id} */
  workflowResourceName?: string | undefined;
}

export interface UpdateUserResponse {
  $type?: "pb.orby_internal.UpdateUserResponse";
  /**
   * Format: users/{user_id}
   * user_id same as the userId stored in mongoDB
   */
  userId?: string | undefined;
  role?: Role | undefined;
}

export interface ListOrganizationsRequest {
  $type?: "pb.orby_internal.ListOrganizationsRequest";
  /**
   * Default is 10 (when page_size is missing or set to 0). Max value is 20.
   * Ordered by ascending Organization display name.
   */
  pageSize?:
    | number
    | undefined;
  /** The page number starts from 1. */
  pageNumber?:
    | number
    | undefined;
  /** Supported filter: display_name_prefix={SEARCH_KEY} */
  filter?: string | undefined;
}

export interface ListOrganizationsResponse {
  $type?: "pb.orby_internal.ListOrganizationsResponse";
  organizations?:
    | Organization[]
    | undefined;
  /**
   * Total available Organizations size.
   * Note it is NOT the remaining available Organizations
   * size after the current response.
   */
  totalSize?: number | undefined;
}

export interface ListHyperparametersRequest {
  $type?: "pb.orby_internal.ListHyperparametersRequest";
  /**
   * Default is 10 (when page_size is missing or set to 0). Max value is 20.
   * Ordered by ascending Hyperparameter resource name.
   */
  pageSize?:
    | number
    | undefined;
  /** The page number starts from 1. */
  pageNumber?:
    | number
    | undefined;
  /** Supported filter: display_name_prefix={SEARCH_KEY} */
  filter?: string | undefined;
}

export interface ListHyperparametersResponse {
  $type?: "pb.orby_internal.ListHyperparametersResponse";
  hyperparameters?:
    | Hyperparameter[]
    | undefined;
  /**
   * Total available Hyperparameter size.
   * Note it is NOT the remaining available Hyperparameter
   * size after the current response.
   */
  totalSize?: number | undefined;
}

export interface GenerateBillingReportRequest {
  $type?: "pb.orby_internal.GenerateBillingReportRequest";
  /** Organization name: organizations/{organization_id} */
  organizationName?: string | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}

export interface GenerateBillingReportResponse {
  $type?: "pb.orby_internal.GenerateBillingReportResponse";
  startDate?: string | undefined;
  endDate?: string | undefined;
  organizationDisplayName?: string | undefined;
  invoiceNumber?: string | undefined;
  totalTasks?: number | undefined;
  totalBilledTasks?: number | undefined;
  workflowData?: GenerateBillingWorkflowData[] | undefined;
}

export interface GenerateBillingWorkflowData {
  $type?: "pb.orby_internal.GenerateBillingWorkflowData";
  workflowDisplayName?: string | undefined;
  totalPages?: number | undefined;
  amountPerPage?: number | undefined;
  totalAmount?: number | undefined;
}

export interface GetPredictionAnalysisRequest {
  $type?: "pb.orby_internal.GetPredictionAnalysisRequest";
  /** Each workflow name: workflows/{workflow_id} */
  workflowNames?:
    | string[]
    | undefined;
  /** The start timestamp for the analysis. */
  startDate?:
    | Date
    | undefined;
  /** The end timestamp for the analysis. */
  endDate?:
    | Date
    | undefined;
  /** Organization id passed to check for single tenant organization. */
  organizationId?: string | undefined;
}

export interface GetPredictionAnalysisResponse {
  $type?: "pb.orby_internal.GetPredictionAnalysisResponse";
  analysis?: GetPredictionAnalysisResponseWorkflowAnalysis[] | undefined;
}

export interface GetPredictionAnalysisResponseWorkflowAnalysis {
  $type?: "pb.orby_internal.GetPredictionAnalysisResponse.WorkflowAnalysis";
  /** Workflow name: workflows/{workflow_id} */
  workflowName?:
    | string
    | undefined;
  /** The generated CSV analysis report's gcs file path */
  reportGcsUri?: string | undefined;
}

export interface ListWorkflowsForOrganizationRequest {
  $type?: "pb.orby_internal.ListWorkflowsForOrganizationRequest";
  /** Organization name: organizations/{organization_id} */
  organizationName?:
    | string
    | undefined;
  /**
   * Default is 10 (when page_size is missing or set to 0). Max value is 20.
   * Ordered by ascending Workflow display name.
   */
  pageSize?:
    | number
    | undefined;
  /** The page number starts from 1. */
  pageNumber?:
    | number
    | undefined;
  /** Supported filter: display_name_prefix={SEARCH_KEY} */
  filter?: string | undefined;
}

export interface ListWorkflowsForOrganizationResponse {
  $type?: "pb.orby_internal.ListWorkflowsForOrganizationResponse";
  workflows?:
    | Workflow[]
    | undefined;
  /**
   * Total available Workflows size.
   * Note it is NOT the remaining available Workflows
   * size after the current response.
   */
  totalSize?: number | undefined;
}

export interface CreateHyperparameterRequest {
  $type?: "pb.orby_internal.CreateHyperparameterRequest";
  /** The hyperparameter to be created. */
  hyperparameter?: Hyperparameter | undefined;
}

export interface CreateHyperparameterResponse {
  $type?: "pb.orby_internal.CreateHyperparameterResponse";
  /** Newly created hyperparameter name: hyperparameters/{hyperparameter_id} */
  hyperparameterName?: string | undefined;
}

export interface UpdateHyperparameterRequest {
  $type?: "pb.orby_internal.UpdateHyperparameterRequest";
  /** The hyperparameter to be updated. */
  hyperparameter?: Hyperparameter | undefined;
}

export interface UpdateHyperparameterResponse {
  $type?: "pb.orby_internal.UpdateHyperparameterResponse";
  /** The updated hyperparameter */
  hyperparameter?: Hyperparameter | undefined;
}

export interface GetHyperparameterRequest {
  $type?: "pb.orby_internal.GetHyperparameterRequest";
  /** Hyperparameter name: hyperparameters/{hyperparameter_id} */
  hyperparameterName?: string | undefined;
}

export interface GetHyperparameterResponse {
  $type?: "pb.orby_internal.GetHyperparameterResponse";
  hyperparameter?: Hyperparameter | undefined;
}

export interface ListUsersRequest {
  $type?: "pb.orby_internal.ListUsersRequest";
  /**
   * Default is 10 (when page_size is missing or set to 0). Max value is 20.
   * Ordered by ascending User email.
   */
  pageSize?:
    | number
    | undefined;
  /** The page number starts from 1. */
  pageNumber?:
    | number
    | undefined;
  /** Supported filter: email_prefix={SEARCH_KEY} */
  filter?: string | undefined;
}

export interface ListUsersResponse {
  $type?: "pb.orby_internal.ListUsersResponse";
  users?:
    | UserWithPrivilageLevel[]
    | undefined;
  /**
   * Total available Users size.
   * Note it is NOT the remaining available Users
   * size after the current response.
   */
  totalSize?: number | undefined;
}

export interface UserWithPrivilageLevel {
  $type?: "pb.orby_internal.UserWithPrivilageLevel";
  userId?: string | undefined;
  email?:
    | string
    | undefined;
  /**
   * Highest internal role assigned to the user.
   * Will be nil if the user is not assigned any role.
   */
  role?: Role | undefined;
}

export interface GetUserPermissionsRequest {
  $type?: "pb.orby_internal.GetUserPermissionsRequest";
  /** User resource name: users/{user_id} */
  userResourceName?: string | undefined;
}

export interface GetUserPermissionsResponse {
  $type?: "pb.orby_internal.GetUserPermissionsResponse";
  /** Permissions that user has access to. */
  permittedActions?: string[] | undefined;
}

/** AnnouncementImage will be used in the markdown editor for URL transformation. */
export interface AnnouncementImage {
  $type?: "pb.orby_internal.AnnouncementImage";
  /** url represents the original image GCS URL */
  url?:
    | string
    | undefined;
  /**
   * signed_url represents the transformed url, which will be used to display
   * the image in the markdown preview panel.
   */
  signedUrl?: string | undefined;
}

export interface Announcement {
  $type?: "pb.orby_internal.Announcement";
  id?: string | undefined;
  displayName?: string | undefined;
  description?: string | undefined;
  type?: AnnouncementType | undefined;
  header?: AnnouncementContentMarkdown | undefined;
  contentBlocks?: AnnouncementContentBlock[] | undefined;
  isActive?: boolean | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export interface ListAnnouncementsRequest {
  $type?: "pb.orby_internal.ListAnnouncementsRequest";
  pageSize?: number | undefined;
  pageNumber?: number | undefined;
}

export interface ListAnnouncementsResponse {
  $type?: "pb.orby_internal.ListAnnouncementsResponse";
  announcements?: Announcement[] | undefined;
  totalSize?: number | undefined;
}

export interface GetAnnouncementRequest {
  $type?: "pb.orby_internal.GetAnnouncementRequest";
  id?:
    | string
    | undefined;
  /**
   * is_preview represents whether the response will process markdown content.
   * If true, the response will replace image gcs URLs with signed URLs.
   */
  isPreview?: boolean | undefined;
}

export interface GetAnnouncementResponse {
  $type?: "pb.orby_internal.GetAnnouncementResponse";
  announcement?:
    | Announcement
    | undefined;
  /**
   * images that uploaded to announcement, will be used in markdown or html
   * tags, can be used in both header and content blocks
   */
  images?: AnnouncementImage[] | undefined;
}

export interface CreateAnnouncementRequest {
  $type?: "pb.orby_internal.CreateAnnouncementRequest";
  announcement?: Announcement | undefined;
}

export interface CreateAnnouncementResponse {
  $type?: "pb.orby_internal.CreateAnnouncementResponse";
  announcement?: Announcement | undefined;
}

export interface UpdateAnnouncementRequest {
  $type?: "pb.orby_internal.UpdateAnnouncementRequest";
  announcement?: Announcement | undefined;
  fieldMask?: string[] | undefined;
}

export interface UpdateAnnouncementResponse {
  $type?: "pb.orby_internal.UpdateAnnouncementResponse";
  announcement?: Announcement | undefined;
}

export interface DeleteAnnouncementRequest {
  $type?: "pb.orby_internal.DeleteAnnouncementRequest";
  id?: string | undefined;
}

export interface UploadAnnouncementImageRequest {
  $type?: "pb.orby_internal.UploadAnnouncementImageRequest";
  id?: string | undefined;
  imageContent?: Uint8Array | undefined;
}

export interface UploadAnnouncementImageResponse {
  $type?: "pb.orby_internal.UploadAnnouncementImageResponse";
  image?: AnnouncementImage | undefined;
}

function createBaseCreateUserRequest(): CreateUserRequest {
  return { $type: "pb.orby_internal.CreateUserRequest", userId: undefined, email: undefined };
}

export const CreateUserRequest = {
  $type: "pb.orby_internal.CreateUserRequest" as const,

  encode(message: CreateUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== undefined) {
      writer.uint32(10).string(message.userId);
    }
    if (message.email !== undefined) {
      writer.uint32(18).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateUserRequest {
    return {
      $type: CreateUserRequest.$type,
      userId: isSet(object.userId) ? globalThis.String(object.userId) : undefined,
      email: isSet(object.email) ? globalThis.String(object.email) : undefined,
    };
  },

  toJSON(message: CreateUserRequest): unknown {
    const obj: any = {};
    if (message.userId !== undefined) {
      obj.userId = message.userId;
    }
    if (message.email !== undefined) {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateUserRequest>, I>>(base?: I): CreateUserRequest {
    return CreateUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateUserRequest>, I>>(object: I): CreateUserRequest {
    const message = createBaseCreateUserRequest();
    message.userId = object.userId ?? undefined;
    message.email = object.email ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateUserRequest.$type, CreateUserRequest);

function createBaseCreateUserResponse(): CreateUserResponse {
  return { $type: "pb.orby_internal.CreateUserResponse", userId: "", role: 0 };
}

export const CreateUserResponse = {
  $type: "pb.orby_internal.CreateUserResponse" as const,

  encode(message: CreateUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== undefined && message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.role !== undefined && message.role !== 0) {
      writer.uint32(16).int32(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateUserResponse {
    return {
      $type: CreateUserResponse.$type,
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      role: isSet(object.role) ? roleFromJSON(object.role) : 0,
    };
  },

  toJSON(message: CreateUserResponse): unknown {
    const obj: any = {};
    if (message.userId !== undefined && message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.role !== undefined && message.role !== 0) {
      obj.role = roleToJSON(message.role);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateUserResponse>, I>>(base?: I): CreateUserResponse {
    return CreateUserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateUserResponse>, I>>(object: I): CreateUserResponse {
    const message = createBaseCreateUserResponse();
    message.userId = object.userId ?? "";
    message.role = object.role ?? 0;
    return message;
  },
};

messageTypeRegistry.set(CreateUserResponse.$type, CreateUserResponse);

function createBaseUpdateUserRequest(): UpdateUserRequest {
  return {
    $type: "pb.orby_internal.UpdateUserRequest",
    userId: undefined,
    email: undefined,
    role: 0,
    organizationResourceName: "",
    workflowResourceName: "",
  };
}

export const UpdateUserRequest = {
  $type: "pb.orby_internal.UpdateUserRequest" as const,

  encode(message: UpdateUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== undefined) {
      writer.uint32(10).string(message.userId);
    }
    if (message.email !== undefined) {
      writer.uint32(42).string(message.email);
    }
    if (message.role !== undefined && message.role !== 0) {
      writer.uint32(16).int32(message.role);
    }
    if (message.organizationResourceName !== undefined && message.organizationResourceName !== "") {
      writer.uint32(26).string(message.organizationResourceName);
    }
    if (message.workflowResourceName !== undefined && message.workflowResourceName !== "") {
      writer.uint32(34).string(message.workflowResourceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.organizationResourceName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.workflowResourceName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateUserRequest {
    return {
      $type: UpdateUserRequest.$type,
      userId: isSet(object.userId) ? globalThis.String(object.userId) : undefined,
      email: isSet(object.email) ? globalThis.String(object.email) : undefined,
      role: isSet(object.role) ? roleFromJSON(object.role) : 0,
      organizationResourceName: isSet(object.organizationResourceName)
        ? globalThis.String(object.organizationResourceName)
        : "",
      workflowResourceName: isSet(object.workflowResourceName) ? globalThis.String(object.workflowResourceName) : "",
    };
  },

  toJSON(message: UpdateUserRequest): unknown {
    const obj: any = {};
    if (message.userId !== undefined) {
      obj.userId = message.userId;
    }
    if (message.email !== undefined) {
      obj.email = message.email;
    }
    if (message.role !== undefined && message.role !== 0) {
      obj.role = roleToJSON(message.role);
    }
    if (message.organizationResourceName !== undefined && message.organizationResourceName !== "") {
      obj.organizationResourceName = message.organizationResourceName;
    }
    if (message.workflowResourceName !== undefined && message.workflowResourceName !== "") {
      obj.workflowResourceName = message.workflowResourceName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUserRequest>, I>>(base?: I): UpdateUserRequest {
    return UpdateUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateUserRequest>, I>>(object: I): UpdateUserRequest {
    const message = createBaseUpdateUserRequest();
    message.userId = object.userId ?? undefined;
    message.email = object.email ?? undefined;
    message.role = object.role ?? 0;
    message.organizationResourceName = object.organizationResourceName ?? "";
    message.workflowResourceName = object.workflowResourceName ?? "";
    return message;
  },
};

messageTypeRegistry.set(UpdateUserRequest.$type, UpdateUserRequest);

function createBaseUpdateUserResponse(): UpdateUserResponse {
  return { $type: "pb.orby_internal.UpdateUserResponse", userId: "", role: 0 };
}

export const UpdateUserResponse = {
  $type: "pb.orby_internal.UpdateUserResponse" as const,

  encode(message: UpdateUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== undefined && message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.role !== undefined && message.role !== 0) {
      writer.uint32(16).int32(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateUserResponse {
    return {
      $type: UpdateUserResponse.$type,
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      role: isSet(object.role) ? roleFromJSON(object.role) : 0,
    };
  },

  toJSON(message: UpdateUserResponse): unknown {
    const obj: any = {};
    if (message.userId !== undefined && message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.role !== undefined && message.role !== 0) {
      obj.role = roleToJSON(message.role);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUserResponse>, I>>(base?: I): UpdateUserResponse {
    return UpdateUserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateUserResponse>, I>>(object: I): UpdateUserResponse {
    const message = createBaseUpdateUserResponse();
    message.userId = object.userId ?? "";
    message.role = object.role ?? 0;
    return message;
  },
};

messageTypeRegistry.set(UpdateUserResponse.$type, UpdateUserResponse);

function createBaseListOrganizationsRequest(): ListOrganizationsRequest {
  return { $type: "pb.orby_internal.ListOrganizationsRequest", pageSize: 0, pageNumber: 0, filter: "" };
}

export const ListOrganizationsRequest = {
  $type: "pb.orby_internal.ListOrganizationsRequest" as const,

  encode(message: ListOrganizationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(8).int32(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(16).int32(message.pageNumber);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(26).string(message.filter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListOrganizationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListOrganizationsRequest();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.filter = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListOrganizationsRequest {
    return {
      $type: ListOrganizationsRequest.$type,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
    };
  },

  toJSON(message: ListOrganizationsRequest): unknown {
    const obj: any = {};
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListOrganizationsRequest>, I>>(base?: I): ListOrganizationsRequest {
    return ListOrganizationsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListOrganizationsRequest>, I>>(object: I): ListOrganizationsRequest {
    const message = createBaseListOrganizationsRequest();
    message.pageSize = object.pageSize ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    message.filter = object.filter ?? "";
    return message;
  },
};

messageTypeRegistry.set(ListOrganizationsRequest.$type, ListOrganizationsRequest);

function createBaseListOrganizationsResponse(): ListOrganizationsResponse {
  return { $type: "pb.orby_internal.ListOrganizationsResponse", organizations: [], totalSize: 0 };
}

export const ListOrganizationsResponse = {
  $type: "pb.orby_internal.ListOrganizationsResponse" as const,

  encode(message: ListOrganizationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.organizations !== undefined && message.organizations.length !== 0) {
      for (const v of message.organizations) {
        Organization.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(16).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListOrganizationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListOrganizationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.organizations!.push(Organization.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListOrganizationsResponse {
    return {
      $type: ListOrganizationsResponse.$type,
      organizations: globalThis.Array.isArray(object?.organizations)
        ? object.organizations.map((e: any) => Organization.fromJSON(e))
        : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListOrganizationsResponse): unknown {
    const obj: any = {};
    if (message.organizations?.length) {
      obj.organizations = message.organizations.map((e) => Organization.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListOrganizationsResponse>, I>>(base?: I): ListOrganizationsResponse {
    return ListOrganizationsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListOrganizationsResponse>, I>>(object: I): ListOrganizationsResponse {
    const message = createBaseListOrganizationsResponse();
    message.organizations = object.organizations?.map((e) => Organization.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListOrganizationsResponse.$type, ListOrganizationsResponse);

function createBaseListHyperparametersRequest(): ListHyperparametersRequest {
  return { $type: "pb.orby_internal.ListHyperparametersRequest", pageSize: 0, pageNumber: 0, filter: "" };
}

export const ListHyperparametersRequest = {
  $type: "pb.orby_internal.ListHyperparametersRequest" as const,

  encode(message: ListHyperparametersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(8).int32(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(16).int32(message.pageNumber);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(26).string(message.filter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListHyperparametersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListHyperparametersRequest();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.filter = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListHyperparametersRequest {
    return {
      $type: ListHyperparametersRequest.$type,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
    };
  },

  toJSON(message: ListHyperparametersRequest): unknown {
    const obj: any = {};
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListHyperparametersRequest>, I>>(base?: I): ListHyperparametersRequest {
    return ListHyperparametersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListHyperparametersRequest>, I>>(object: I): ListHyperparametersRequest {
    const message = createBaseListHyperparametersRequest();
    message.pageSize = object.pageSize ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    message.filter = object.filter ?? "";
    return message;
  },
};

messageTypeRegistry.set(ListHyperparametersRequest.$type, ListHyperparametersRequest);

function createBaseListHyperparametersResponse(): ListHyperparametersResponse {
  return { $type: "pb.orby_internal.ListHyperparametersResponse", hyperparameters: [], totalSize: 0 };
}

export const ListHyperparametersResponse = {
  $type: "pb.orby_internal.ListHyperparametersResponse" as const,

  encode(message: ListHyperparametersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hyperparameters !== undefined && message.hyperparameters.length !== 0) {
      for (const v of message.hyperparameters) {
        Hyperparameter.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(16).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListHyperparametersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListHyperparametersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hyperparameters!.push(Hyperparameter.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListHyperparametersResponse {
    return {
      $type: ListHyperparametersResponse.$type,
      hyperparameters: globalThis.Array.isArray(object?.hyperparameters)
        ? object.hyperparameters.map((e: any) => Hyperparameter.fromJSON(e))
        : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListHyperparametersResponse): unknown {
    const obj: any = {};
    if (message.hyperparameters?.length) {
      obj.hyperparameters = message.hyperparameters.map((e) => Hyperparameter.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListHyperparametersResponse>, I>>(base?: I): ListHyperparametersResponse {
    return ListHyperparametersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListHyperparametersResponse>, I>>(object: I): ListHyperparametersResponse {
    const message = createBaseListHyperparametersResponse();
    message.hyperparameters = object.hyperparameters?.map((e) => Hyperparameter.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListHyperparametersResponse.$type, ListHyperparametersResponse);

function createBaseGenerateBillingReportRequest(): GenerateBillingReportRequest {
  return {
    $type: "pb.orby_internal.GenerateBillingReportRequest",
    organizationName: "",
    startDate: undefined,
    endDate: undefined,
  };
}

export const GenerateBillingReportRequest = {
  $type: "pb.orby_internal.GenerateBillingReportRequest" as const,

  encode(message: GenerateBillingReportRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.organizationName !== undefined && message.organizationName !== "") {
      writer.uint32(10).string(message.organizationName);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(18).fork()).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(toTimestamp(message.endDate), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateBillingReportRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateBillingReportRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.organizationName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.startDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.endDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateBillingReportRequest {
    return {
      $type: GenerateBillingReportRequest.$type,
      organizationName: isSet(object.organizationName) ? globalThis.String(object.organizationName) : "",
      startDate: isSet(object.startDate) ? fromJsonTimestamp(object.startDate) : undefined,
      endDate: isSet(object.endDate) ? fromJsonTimestamp(object.endDate) : undefined,
    };
  },

  toJSON(message: GenerateBillingReportRequest): unknown {
    const obj: any = {};
    if (message.organizationName !== undefined && message.organizationName !== "") {
      obj.organizationName = message.organizationName;
    }
    if (message.startDate !== undefined) {
      obj.startDate = message.startDate.toISOString();
    }
    if (message.endDate !== undefined) {
      obj.endDate = message.endDate.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateBillingReportRequest>, I>>(base?: I): GenerateBillingReportRequest {
    return GenerateBillingReportRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateBillingReportRequest>, I>>(object: I): GenerateBillingReportRequest {
    const message = createBaseGenerateBillingReportRequest();
    message.organizationName = object.organizationName ?? "";
    message.startDate = object.startDate ?? undefined;
    message.endDate = object.endDate ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(GenerateBillingReportRequest.$type, GenerateBillingReportRequest);

function createBaseGenerateBillingReportResponse(): GenerateBillingReportResponse {
  return {
    $type: "pb.orby_internal.GenerateBillingReportResponse",
    startDate: "",
    endDate: "",
    organizationDisplayName: "",
    invoiceNumber: "",
    totalTasks: 0,
    totalBilledTasks: 0,
    workflowData: [],
  };
}

export const GenerateBillingReportResponse = {
  $type: "pb.orby_internal.GenerateBillingReportResponse" as const,

  encode(message: GenerateBillingReportResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.startDate !== undefined && message.startDate !== "") {
      writer.uint32(10).string(message.startDate);
    }
    if (message.endDate !== undefined && message.endDate !== "") {
      writer.uint32(18).string(message.endDate);
    }
    if (message.organizationDisplayName !== undefined && message.organizationDisplayName !== "") {
      writer.uint32(26).string(message.organizationDisplayName);
    }
    if (message.invoiceNumber !== undefined && message.invoiceNumber !== "") {
      writer.uint32(34).string(message.invoiceNumber);
    }
    if (message.totalTasks !== undefined && message.totalTasks !== 0) {
      writer.uint32(40).int32(message.totalTasks);
    }
    if (message.totalBilledTasks !== undefined && message.totalBilledTasks !== 0) {
      writer.uint32(48).int32(message.totalBilledTasks);
    }
    if (message.workflowData !== undefined && message.workflowData.length !== 0) {
      for (const v of message.workflowData) {
        GenerateBillingWorkflowData.encode(v!, writer.uint32(58).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateBillingReportResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateBillingReportResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.startDate = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.endDate = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.organizationDisplayName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.invoiceNumber = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.totalTasks = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.totalBilledTasks = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.workflowData!.push(GenerateBillingWorkflowData.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateBillingReportResponse {
    return {
      $type: GenerateBillingReportResponse.$type,
      startDate: isSet(object.startDate) ? globalThis.String(object.startDate) : "",
      endDate: isSet(object.endDate) ? globalThis.String(object.endDate) : "",
      organizationDisplayName: isSet(object.organizationDisplayName)
        ? globalThis.String(object.organizationDisplayName)
        : "",
      invoiceNumber: isSet(object.invoiceNumber) ? globalThis.String(object.invoiceNumber) : "",
      totalTasks: isSet(object.totalTasks) ? globalThis.Number(object.totalTasks) : 0,
      totalBilledTasks: isSet(object.totalBilledTasks) ? globalThis.Number(object.totalBilledTasks) : 0,
      workflowData: globalThis.Array.isArray(object?.workflowData)
        ? object.workflowData.map((e: any) => GenerateBillingWorkflowData.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenerateBillingReportResponse): unknown {
    const obj: any = {};
    if (message.startDate !== undefined && message.startDate !== "") {
      obj.startDate = message.startDate;
    }
    if (message.endDate !== undefined && message.endDate !== "") {
      obj.endDate = message.endDate;
    }
    if (message.organizationDisplayName !== undefined && message.organizationDisplayName !== "") {
      obj.organizationDisplayName = message.organizationDisplayName;
    }
    if (message.invoiceNumber !== undefined && message.invoiceNumber !== "") {
      obj.invoiceNumber = message.invoiceNumber;
    }
    if (message.totalTasks !== undefined && message.totalTasks !== 0) {
      obj.totalTasks = Math.round(message.totalTasks);
    }
    if (message.totalBilledTasks !== undefined && message.totalBilledTasks !== 0) {
      obj.totalBilledTasks = Math.round(message.totalBilledTasks);
    }
    if (message.workflowData?.length) {
      obj.workflowData = message.workflowData.map((e) => GenerateBillingWorkflowData.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateBillingReportResponse>, I>>(base?: I): GenerateBillingReportResponse {
    return GenerateBillingReportResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateBillingReportResponse>, I>>(
    object: I,
  ): GenerateBillingReportResponse {
    const message = createBaseGenerateBillingReportResponse();
    message.startDate = object.startDate ?? "";
    message.endDate = object.endDate ?? "";
    message.organizationDisplayName = object.organizationDisplayName ?? "";
    message.invoiceNumber = object.invoiceNumber ?? "";
    message.totalTasks = object.totalTasks ?? 0;
    message.totalBilledTasks = object.totalBilledTasks ?? 0;
    message.workflowData = object.workflowData?.map((e) => GenerateBillingWorkflowData.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GenerateBillingReportResponse.$type, GenerateBillingReportResponse);

function createBaseGenerateBillingWorkflowData(): GenerateBillingWorkflowData {
  return {
    $type: "pb.orby_internal.GenerateBillingWorkflowData",
    workflowDisplayName: "",
    totalPages: 0,
    amountPerPage: 0,
    totalAmount: 0,
  };
}

export const GenerateBillingWorkflowData = {
  $type: "pb.orby_internal.GenerateBillingWorkflowData" as const,

  encode(message: GenerateBillingWorkflowData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowDisplayName !== undefined && message.workflowDisplayName !== "") {
      writer.uint32(10).string(message.workflowDisplayName);
    }
    if (message.totalPages !== undefined && message.totalPages !== 0) {
      writer.uint32(16).int32(message.totalPages);
    }
    if (message.amountPerPage !== undefined && message.amountPerPage !== 0) {
      writer.uint32(25).double(message.amountPerPage);
    }
    if (message.totalAmount !== undefined && message.totalAmount !== 0) {
      writer.uint32(33).double(message.totalAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateBillingWorkflowData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateBillingWorkflowData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflowDisplayName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalPages = reader.int32();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.amountPerPage = reader.double();
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.totalAmount = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateBillingWorkflowData {
    return {
      $type: GenerateBillingWorkflowData.$type,
      workflowDisplayName: isSet(object.workflowDisplayName) ? globalThis.String(object.workflowDisplayName) : "",
      totalPages: isSet(object.totalPages) ? globalThis.Number(object.totalPages) : 0,
      amountPerPage: isSet(object.amountPerPage) ? globalThis.Number(object.amountPerPage) : 0,
      totalAmount: isSet(object.totalAmount) ? globalThis.Number(object.totalAmount) : 0,
    };
  },

  toJSON(message: GenerateBillingWorkflowData): unknown {
    const obj: any = {};
    if (message.workflowDisplayName !== undefined && message.workflowDisplayName !== "") {
      obj.workflowDisplayName = message.workflowDisplayName;
    }
    if (message.totalPages !== undefined && message.totalPages !== 0) {
      obj.totalPages = Math.round(message.totalPages);
    }
    if (message.amountPerPage !== undefined && message.amountPerPage !== 0) {
      obj.amountPerPage = message.amountPerPage;
    }
    if (message.totalAmount !== undefined && message.totalAmount !== 0) {
      obj.totalAmount = message.totalAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateBillingWorkflowData>, I>>(base?: I): GenerateBillingWorkflowData {
    return GenerateBillingWorkflowData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateBillingWorkflowData>, I>>(object: I): GenerateBillingWorkflowData {
    const message = createBaseGenerateBillingWorkflowData();
    message.workflowDisplayName = object.workflowDisplayName ?? "";
    message.totalPages = object.totalPages ?? 0;
    message.amountPerPage = object.amountPerPage ?? 0;
    message.totalAmount = object.totalAmount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(GenerateBillingWorkflowData.$type, GenerateBillingWorkflowData);

function createBaseGetPredictionAnalysisRequest(): GetPredictionAnalysisRequest {
  return {
    $type: "pb.orby_internal.GetPredictionAnalysisRequest",
    workflowNames: [],
    startDate: undefined,
    endDate: undefined,
    organizationId: "",
  };
}

export const GetPredictionAnalysisRequest = {
  $type: "pb.orby_internal.GetPredictionAnalysisRequest" as const,

  encode(message: GetPredictionAnalysisRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowNames !== undefined && message.workflowNames.length !== 0) {
      for (const v of message.workflowNames) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(18).fork()).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(toTimestamp(message.endDate), writer.uint32(26).fork()).ldelim();
    }
    if (message.organizationId !== undefined && message.organizationId !== "") {
      writer.uint32(34).string(message.organizationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPredictionAnalysisRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPredictionAnalysisRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflowNames!.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.startDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.endDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.organizationId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetPredictionAnalysisRequest {
    return {
      $type: GetPredictionAnalysisRequest.$type,
      workflowNames: globalThis.Array.isArray(object?.workflowNames)
        ? object.workflowNames.map((e: any) => globalThis.String(e))
        : [],
      startDate: isSet(object.startDate) ? fromJsonTimestamp(object.startDate) : undefined,
      endDate: isSet(object.endDate) ? fromJsonTimestamp(object.endDate) : undefined,
      organizationId: isSet(object.organizationId) ? globalThis.String(object.organizationId) : "",
    };
  },

  toJSON(message: GetPredictionAnalysisRequest): unknown {
    const obj: any = {};
    if (message.workflowNames?.length) {
      obj.workflowNames = message.workflowNames;
    }
    if (message.startDate !== undefined) {
      obj.startDate = message.startDate.toISOString();
    }
    if (message.endDate !== undefined) {
      obj.endDate = message.endDate.toISOString();
    }
    if (message.organizationId !== undefined && message.organizationId !== "") {
      obj.organizationId = message.organizationId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPredictionAnalysisRequest>, I>>(base?: I): GetPredictionAnalysisRequest {
    return GetPredictionAnalysisRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPredictionAnalysisRequest>, I>>(object: I): GetPredictionAnalysisRequest {
    const message = createBaseGetPredictionAnalysisRequest();
    message.workflowNames = object.workflowNames?.map((e) => e) || [];
    message.startDate = object.startDate ?? undefined;
    message.endDate = object.endDate ?? undefined;
    message.organizationId = object.organizationId ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetPredictionAnalysisRequest.$type, GetPredictionAnalysisRequest);

function createBaseGetPredictionAnalysisResponse(): GetPredictionAnalysisResponse {
  return { $type: "pb.orby_internal.GetPredictionAnalysisResponse", analysis: [] };
}

export const GetPredictionAnalysisResponse = {
  $type: "pb.orby_internal.GetPredictionAnalysisResponse" as const,

  encode(message: GetPredictionAnalysisResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.analysis !== undefined && message.analysis.length !== 0) {
      for (const v of message.analysis) {
        GetPredictionAnalysisResponseWorkflowAnalysis.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPredictionAnalysisResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPredictionAnalysisResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.analysis!.push(GetPredictionAnalysisResponseWorkflowAnalysis.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetPredictionAnalysisResponse {
    return {
      $type: GetPredictionAnalysisResponse.$type,
      analysis: globalThis.Array.isArray(object?.analysis)
        ? object.analysis.map((e: any) => GetPredictionAnalysisResponseWorkflowAnalysis.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetPredictionAnalysisResponse): unknown {
    const obj: any = {};
    if (message.analysis?.length) {
      obj.analysis = message.analysis.map((e) => GetPredictionAnalysisResponseWorkflowAnalysis.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPredictionAnalysisResponse>, I>>(base?: I): GetPredictionAnalysisResponse {
    return GetPredictionAnalysisResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPredictionAnalysisResponse>, I>>(
    object: I,
  ): GetPredictionAnalysisResponse {
    const message = createBaseGetPredictionAnalysisResponse();
    message.analysis = object.analysis?.map((e) => GetPredictionAnalysisResponseWorkflowAnalysis.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetPredictionAnalysisResponse.$type, GetPredictionAnalysisResponse);

function createBaseGetPredictionAnalysisResponseWorkflowAnalysis(): GetPredictionAnalysisResponseWorkflowAnalysis {
  return {
    $type: "pb.orby_internal.GetPredictionAnalysisResponse.WorkflowAnalysis",
    workflowName: "",
    reportGcsUri: "",
  };
}

export const GetPredictionAnalysisResponseWorkflowAnalysis = {
  $type: "pb.orby_internal.GetPredictionAnalysisResponse.WorkflowAnalysis" as const,

  encode(message: GetPredictionAnalysisResponseWorkflowAnalysis, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowName !== undefined && message.workflowName !== "") {
      writer.uint32(10).string(message.workflowName);
    }
    if (message.reportGcsUri !== undefined && message.reportGcsUri !== "") {
      writer.uint32(18).string(message.reportGcsUri);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPredictionAnalysisResponseWorkflowAnalysis {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPredictionAnalysisResponseWorkflowAnalysis();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflowName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.reportGcsUri = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetPredictionAnalysisResponseWorkflowAnalysis {
    return {
      $type: GetPredictionAnalysisResponseWorkflowAnalysis.$type,
      workflowName: isSet(object.workflowName) ? globalThis.String(object.workflowName) : "",
      reportGcsUri: isSet(object.reportGcsUri) ? globalThis.String(object.reportGcsUri) : "",
    };
  },

  toJSON(message: GetPredictionAnalysisResponseWorkflowAnalysis): unknown {
    const obj: any = {};
    if (message.workflowName !== undefined && message.workflowName !== "") {
      obj.workflowName = message.workflowName;
    }
    if (message.reportGcsUri !== undefined && message.reportGcsUri !== "") {
      obj.reportGcsUri = message.reportGcsUri;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPredictionAnalysisResponseWorkflowAnalysis>, I>>(
    base?: I,
  ): GetPredictionAnalysisResponseWorkflowAnalysis {
    return GetPredictionAnalysisResponseWorkflowAnalysis.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPredictionAnalysisResponseWorkflowAnalysis>, I>>(
    object: I,
  ): GetPredictionAnalysisResponseWorkflowAnalysis {
    const message = createBaseGetPredictionAnalysisResponseWorkflowAnalysis();
    message.workflowName = object.workflowName ?? "";
    message.reportGcsUri = object.reportGcsUri ?? "";
    return message;
  },
};

messageTypeRegistry.set(
  GetPredictionAnalysisResponseWorkflowAnalysis.$type,
  GetPredictionAnalysisResponseWorkflowAnalysis,
);

function createBaseListWorkflowsForOrganizationRequest(): ListWorkflowsForOrganizationRequest {
  return {
    $type: "pb.orby_internal.ListWorkflowsForOrganizationRequest",
    organizationName: "",
    pageSize: 0,
    pageNumber: 0,
    filter: "",
  };
}

export const ListWorkflowsForOrganizationRequest = {
  $type: "pb.orby_internal.ListWorkflowsForOrganizationRequest" as const,

  encode(message: ListWorkflowsForOrganizationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.organizationName !== undefined && message.organizationName !== "") {
      writer.uint32(10).string(message.organizationName);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(24).int32(message.pageNumber);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(34).string(message.filter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowsForOrganizationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowsForOrganizationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.organizationName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pageNumber = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.filter = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListWorkflowsForOrganizationRequest {
    return {
      $type: ListWorkflowsForOrganizationRequest.$type,
      organizationName: isSet(object.organizationName) ? globalThis.String(object.organizationName) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
    };
  },

  toJSON(message: ListWorkflowsForOrganizationRequest): unknown {
    const obj: any = {};
    if (message.organizationName !== undefined && message.organizationName !== "") {
      obj.organizationName = message.organizationName;
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowsForOrganizationRequest>, I>>(
    base?: I,
  ): ListWorkflowsForOrganizationRequest {
    return ListWorkflowsForOrganizationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowsForOrganizationRequest>, I>>(
    object: I,
  ): ListWorkflowsForOrganizationRequest {
    const message = createBaseListWorkflowsForOrganizationRequest();
    message.organizationName = object.organizationName ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    message.filter = object.filter ?? "";
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowsForOrganizationRequest.$type, ListWorkflowsForOrganizationRequest);

function createBaseListWorkflowsForOrganizationResponse(): ListWorkflowsForOrganizationResponse {
  return { $type: "pb.orby_internal.ListWorkflowsForOrganizationResponse", workflows: [], totalSize: 0 };
}

export const ListWorkflowsForOrganizationResponse = {
  $type: "pb.orby_internal.ListWorkflowsForOrganizationResponse" as const,

  encode(message: ListWorkflowsForOrganizationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflows !== undefined && message.workflows.length !== 0) {
      for (const v of message.workflows) {
        Workflow.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(16).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkflowsForOrganizationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorkflowsForOrganizationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflows!.push(Workflow.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListWorkflowsForOrganizationResponse {
    return {
      $type: ListWorkflowsForOrganizationResponse.$type,
      workflows: globalThis.Array.isArray(object?.workflows)
        ? object.workflows.map((e: any) => Workflow.fromJSON(e))
        : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListWorkflowsForOrganizationResponse): unknown {
    const obj: any = {};
    if (message.workflows?.length) {
      obj.workflows = message.workflows.map((e) => Workflow.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListWorkflowsForOrganizationResponse>, I>>(
    base?: I,
  ): ListWorkflowsForOrganizationResponse {
    return ListWorkflowsForOrganizationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListWorkflowsForOrganizationResponse>, I>>(
    object: I,
  ): ListWorkflowsForOrganizationResponse {
    const message = createBaseListWorkflowsForOrganizationResponse();
    message.workflows = object.workflows?.map((e) => Workflow.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListWorkflowsForOrganizationResponse.$type, ListWorkflowsForOrganizationResponse);

function createBaseCreateHyperparameterRequest(): CreateHyperparameterRequest {
  return { $type: "pb.orby_internal.CreateHyperparameterRequest", hyperparameter: undefined };
}

export const CreateHyperparameterRequest = {
  $type: "pb.orby_internal.CreateHyperparameterRequest" as const,

  encode(message: CreateHyperparameterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hyperparameter !== undefined) {
      Hyperparameter.encode(message.hyperparameter, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateHyperparameterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateHyperparameterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hyperparameter = Hyperparameter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateHyperparameterRequest {
    return {
      $type: CreateHyperparameterRequest.$type,
      hyperparameter: isSet(object.hyperparameter) ? Hyperparameter.fromJSON(object.hyperparameter) : undefined,
    };
  },

  toJSON(message: CreateHyperparameterRequest): unknown {
    const obj: any = {};
    if (message.hyperparameter !== undefined) {
      obj.hyperparameter = Hyperparameter.toJSON(message.hyperparameter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateHyperparameterRequest>, I>>(base?: I): CreateHyperparameterRequest {
    return CreateHyperparameterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateHyperparameterRequest>, I>>(object: I): CreateHyperparameterRequest {
    const message = createBaseCreateHyperparameterRequest();
    message.hyperparameter = (object.hyperparameter !== undefined && object.hyperparameter !== null)
      ? Hyperparameter.fromPartial(object.hyperparameter)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateHyperparameterRequest.$type, CreateHyperparameterRequest);

function createBaseCreateHyperparameterResponse(): CreateHyperparameterResponse {
  return { $type: "pb.orby_internal.CreateHyperparameterResponse", hyperparameterName: "" };
}

export const CreateHyperparameterResponse = {
  $type: "pb.orby_internal.CreateHyperparameterResponse" as const,

  encode(message: CreateHyperparameterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hyperparameterName !== undefined && message.hyperparameterName !== "") {
      writer.uint32(10).string(message.hyperparameterName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateHyperparameterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateHyperparameterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hyperparameterName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateHyperparameterResponse {
    return {
      $type: CreateHyperparameterResponse.$type,
      hyperparameterName: isSet(object.hyperparameterName) ? globalThis.String(object.hyperparameterName) : "",
    };
  },

  toJSON(message: CreateHyperparameterResponse): unknown {
    const obj: any = {};
    if (message.hyperparameterName !== undefined && message.hyperparameterName !== "") {
      obj.hyperparameterName = message.hyperparameterName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateHyperparameterResponse>, I>>(base?: I): CreateHyperparameterResponse {
    return CreateHyperparameterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateHyperparameterResponse>, I>>(object: I): CreateHyperparameterResponse {
    const message = createBaseCreateHyperparameterResponse();
    message.hyperparameterName = object.hyperparameterName ?? "";
    return message;
  },
};

messageTypeRegistry.set(CreateHyperparameterResponse.$type, CreateHyperparameterResponse);

function createBaseUpdateHyperparameterRequest(): UpdateHyperparameterRequest {
  return { $type: "pb.orby_internal.UpdateHyperparameterRequest", hyperparameter: undefined };
}

export const UpdateHyperparameterRequest = {
  $type: "pb.orby_internal.UpdateHyperparameterRequest" as const,

  encode(message: UpdateHyperparameterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hyperparameter !== undefined) {
      Hyperparameter.encode(message.hyperparameter, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateHyperparameterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateHyperparameterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hyperparameter = Hyperparameter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateHyperparameterRequest {
    return {
      $type: UpdateHyperparameterRequest.$type,
      hyperparameter: isSet(object.hyperparameter) ? Hyperparameter.fromJSON(object.hyperparameter) : undefined,
    };
  },

  toJSON(message: UpdateHyperparameterRequest): unknown {
    const obj: any = {};
    if (message.hyperparameter !== undefined) {
      obj.hyperparameter = Hyperparameter.toJSON(message.hyperparameter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateHyperparameterRequest>, I>>(base?: I): UpdateHyperparameterRequest {
    return UpdateHyperparameterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateHyperparameterRequest>, I>>(object: I): UpdateHyperparameterRequest {
    const message = createBaseUpdateHyperparameterRequest();
    message.hyperparameter = (object.hyperparameter !== undefined && object.hyperparameter !== null)
      ? Hyperparameter.fromPartial(object.hyperparameter)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateHyperparameterRequest.$type, UpdateHyperparameterRequest);

function createBaseUpdateHyperparameterResponse(): UpdateHyperparameterResponse {
  return { $type: "pb.orby_internal.UpdateHyperparameterResponse", hyperparameter: undefined };
}

export const UpdateHyperparameterResponse = {
  $type: "pb.orby_internal.UpdateHyperparameterResponse" as const,

  encode(message: UpdateHyperparameterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hyperparameter !== undefined) {
      Hyperparameter.encode(message.hyperparameter, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateHyperparameterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateHyperparameterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hyperparameter = Hyperparameter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateHyperparameterResponse {
    return {
      $type: UpdateHyperparameterResponse.$type,
      hyperparameter: isSet(object.hyperparameter) ? Hyperparameter.fromJSON(object.hyperparameter) : undefined,
    };
  },

  toJSON(message: UpdateHyperparameterResponse): unknown {
    const obj: any = {};
    if (message.hyperparameter !== undefined) {
      obj.hyperparameter = Hyperparameter.toJSON(message.hyperparameter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateHyperparameterResponse>, I>>(base?: I): UpdateHyperparameterResponse {
    return UpdateHyperparameterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateHyperparameterResponse>, I>>(object: I): UpdateHyperparameterResponse {
    const message = createBaseUpdateHyperparameterResponse();
    message.hyperparameter = (object.hyperparameter !== undefined && object.hyperparameter !== null)
      ? Hyperparameter.fromPartial(object.hyperparameter)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateHyperparameterResponse.$type, UpdateHyperparameterResponse);

function createBaseGetHyperparameterRequest(): GetHyperparameterRequest {
  return { $type: "pb.orby_internal.GetHyperparameterRequest", hyperparameterName: "" };
}

export const GetHyperparameterRequest = {
  $type: "pb.orby_internal.GetHyperparameterRequest" as const,

  encode(message: GetHyperparameterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hyperparameterName !== undefined && message.hyperparameterName !== "") {
      writer.uint32(10).string(message.hyperparameterName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetHyperparameterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHyperparameterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hyperparameterName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetHyperparameterRequest {
    return {
      $type: GetHyperparameterRequest.$type,
      hyperparameterName: isSet(object.hyperparameterName) ? globalThis.String(object.hyperparameterName) : "",
    };
  },

  toJSON(message: GetHyperparameterRequest): unknown {
    const obj: any = {};
    if (message.hyperparameterName !== undefined && message.hyperparameterName !== "") {
      obj.hyperparameterName = message.hyperparameterName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetHyperparameterRequest>, I>>(base?: I): GetHyperparameterRequest {
    return GetHyperparameterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetHyperparameterRequest>, I>>(object: I): GetHyperparameterRequest {
    const message = createBaseGetHyperparameterRequest();
    message.hyperparameterName = object.hyperparameterName ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetHyperparameterRequest.$type, GetHyperparameterRequest);

function createBaseGetHyperparameterResponse(): GetHyperparameterResponse {
  return { $type: "pb.orby_internal.GetHyperparameterResponse", hyperparameter: undefined };
}

export const GetHyperparameterResponse = {
  $type: "pb.orby_internal.GetHyperparameterResponse" as const,

  encode(message: GetHyperparameterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hyperparameter !== undefined) {
      Hyperparameter.encode(message.hyperparameter, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetHyperparameterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHyperparameterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hyperparameter = Hyperparameter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetHyperparameterResponse {
    return {
      $type: GetHyperparameterResponse.$type,
      hyperparameter: isSet(object.hyperparameter) ? Hyperparameter.fromJSON(object.hyperparameter) : undefined,
    };
  },

  toJSON(message: GetHyperparameterResponse): unknown {
    const obj: any = {};
    if (message.hyperparameter !== undefined) {
      obj.hyperparameter = Hyperparameter.toJSON(message.hyperparameter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetHyperparameterResponse>, I>>(base?: I): GetHyperparameterResponse {
    return GetHyperparameterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetHyperparameterResponse>, I>>(object: I): GetHyperparameterResponse {
    const message = createBaseGetHyperparameterResponse();
    message.hyperparameter = (object.hyperparameter !== undefined && object.hyperparameter !== null)
      ? Hyperparameter.fromPartial(object.hyperparameter)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetHyperparameterResponse.$type, GetHyperparameterResponse);

function createBaseListUsersRequest(): ListUsersRequest {
  return { $type: "pb.orby_internal.ListUsersRequest", pageSize: 0, pageNumber: 0, filter: "" };
}

export const ListUsersRequest = {
  $type: "pb.orby_internal.ListUsersRequest" as const,

  encode(message: ListUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(8).int32(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(16).int32(message.pageNumber);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(26).string(message.filter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListUsersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListUsersRequest();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.filter = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListUsersRequest {
    return {
      $type: ListUsersRequest.$type,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
    };
  },

  toJSON(message: ListUsersRequest): unknown {
    const obj: any = {};
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListUsersRequest>, I>>(base?: I): ListUsersRequest {
    return ListUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListUsersRequest>, I>>(object: I): ListUsersRequest {
    const message = createBaseListUsersRequest();
    message.pageSize = object.pageSize ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    message.filter = object.filter ?? "";
    return message;
  },
};

messageTypeRegistry.set(ListUsersRequest.$type, ListUsersRequest);

function createBaseListUsersResponse(): ListUsersResponse {
  return { $type: "pb.orby_internal.ListUsersResponse", users: [], totalSize: 0 };
}

export const ListUsersResponse = {
  $type: "pb.orby_internal.ListUsersResponse" as const,

  encode(message: ListUsersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.users !== undefined && message.users.length !== 0) {
      for (const v of message.users) {
        UserWithPrivilageLevel.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(16).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListUsersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListUsersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users!.push(UserWithPrivilageLevel.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListUsersResponse {
    return {
      $type: ListUsersResponse.$type,
      users: globalThis.Array.isArray(object?.users)
        ? object.users.map((e: any) => UserWithPrivilageLevel.fromJSON(e))
        : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListUsersResponse): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => UserWithPrivilageLevel.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListUsersResponse>, I>>(base?: I): ListUsersResponse {
    return ListUsersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListUsersResponse>, I>>(object: I): ListUsersResponse {
    const message = createBaseListUsersResponse();
    message.users = object.users?.map((e) => UserWithPrivilageLevel.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListUsersResponse.$type, ListUsersResponse);

function createBaseUserWithPrivilageLevel(): UserWithPrivilageLevel {
  return { $type: "pb.orby_internal.UserWithPrivilageLevel", userId: "", email: "", role: 0 };
}

export const UserWithPrivilageLevel = {
  $type: "pb.orby_internal.UserWithPrivilageLevel" as const,

  encode(message: UserWithPrivilageLevel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== undefined && message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.email !== undefined && message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.role !== undefined && message.role !== 0) {
      writer.uint32(24).int32(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserWithPrivilageLevel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserWithPrivilageLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserWithPrivilageLevel {
    return {
      $type: UserWithPrivilageLevel.$type,
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      role: isSet(object.role) ? roleFromJSON(object.role) : 0,
    };
  },

  toJSON(message: UserWithPrivilageLevel): unknown {
    const obj: any = {};
    if (message.userId !== undefined && message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.email !== undefined && message.email !== "") {
      obj.email = message.email;
    }
    if (message.role !== undefined && message.role !== 0) {
      obj.role = roleToJSON(message.role);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserWithPrivilageLevel>, I>>(base?: I): UserWithPrivilageLevel {
    return UserWithPrivilageLevel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserWithPrivilageLevel>, I>>(object: I): UserWithPrivilageLevel {
    const message = createBaseUserWithPrivilageLevel();
    message.userId = object.userId ?? "";
    message.email = object.email ?? "";
    message.role = object.role ?? 0;
    return message;
  },
};

messageTypeRegistry.set(UserWithPrivilageLevel.$type, UserWithPrivilageLevel);

function createBaseGetUserPermissionsRequest(): GetUserPermissionsRequest {
  return { $type: "pb.orby_internal.GetUserPermissionsRequest", userResourceName: "" };
}

export const GetUserPermissionsRequest = {
  $type: "pb.orby_internal.GetUserPermissionsRequest" as const,

  encode(message: GetUserPermissionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userResourceName !== undefined && message.userResourceName !== "") {
      writer.uint32(10).string(message.userResourceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserPermissionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserPermissionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userResourceName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetUserPermissionsRequest {
    return {
      $type: GetUserPermissionsRequest.$type,
      userResourceName: isSet(object.userResourceName) ? globalThis.String(object.userResourceName) : "",
    };
  },

  toJSON(message: GetUserPermissionsRequest): unknown {
    const obj: any = {};
    if (message.userResourceName !== undefined && message.userResourceName !== "") {
      obj.userResourceName = message.userResourceName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserPermissionsRequest>, I>>(base?: I): GetUserPermissionsRequest {
    return GetUserPermissionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUserPermissionsRequest>, I>>(object: I): GetUserPermissionsRequest {
    const message = createBaseGetUserPermissionsRequest();
    message.userResourceName = object.userResourceName ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetUserPermissionsRequest.$type, GetUserPermissionsRequest);

function createBaseGetUserPermissionsResponse(): GetUserPermissionsResponse {
  return { $type: "pb.orby_internal.GetUserPermissionsResponse", permittedActions: [] };
}

export const GetUserPermissionsResponse = {
  $type: "pb.orby_internal.GetUserPermissionsResponse" as const,

  encode(message: GetUserPermissionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.permittedActions !== undefined && message.permittedActions.length !== 0) {
      for (const v of message.permittedActions) {
        writer.uint32(10).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserPermissionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserPermissionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.permittedActions!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetUserPermissionsResponse {
    return {
      $type: GetUserPermissionsResponse.$type,
      permittedActions: globalThis.Array.isArray(object?.permittedActions)
        ? object.permittedActions.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: GetUserPermissionsResponse): unknown {
    const obj: any = {};
    if (message.permittedActions?.length) {
      obj.permittedActions = message.permittedActions;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserPermissionsResponse>, I>>(base?: I): GetUserPermissionsResponse {
    return GetUserPermissionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUserPermissionsResponse>, I>>(object: I): GetUserPermissionsResponse {
    const message = createBaseGetUserPermissionsResponse();
    message.permittedActions = object.permittedActions?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(GetUserPermissionsResponse.$type, GetUserPermissionsResponse);

function createBaseAnnouncementImage(): AnnouncementImage {
  return { $type: "pb.orby_internal.AnnouncementImage", url: "", signedUrl: "" };
}

export const AnnouncementImage = {
  $type: "pb.orby_internal.AnnouncementImage" as const,

  encode(message: AnnouncementImage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.signedUrl !== undefined && message.signedUrl !== "") {
      writer.uint32(18).string(message.signedUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnnouncementImage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnnouncementImage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.url = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.signedUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AnnouncementImage {
    return {
      $type: AnnouncementImage.$type,
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      signedUrl: isSet(object.signedUrl) ? globalThis.String(object.signedUrl) : "",
    };
  },

  toJSON(message: AnnouncementImage): unknown {
    const obj: any = {};
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    if (message.signedUrl !== undefined && message.signedUrl !== "") {
      obj.signedUrl = message.signedUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AnnouncementImage>, I>>(base?: I): AnnouncementImage {
    return AnnouncementImage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AnnouncementImage>, I>>(object: I): AnnouncementImage {
    const message = createBaseAnnouncementImage();
    message.url = object.url ?? "";
    message.signedUrl = object.signedUrl ?? "";
    return message;
  },
};

messageTypeRegistry.set(AnnouncementImage.$type, AnnouncementImage);

function createBaseAnnouncement(): Announcement {
  return {
    $type: "pb.orby_internal.Announcement",
    id: "",
    displayName: "",
    description: "",
    type: 0,
    header: undefined,
    contentBlocks: [],
    isActive: false,
    createdAt: undefined,
    updatedAt: undefined,
  };
}

export const Announcement = {
  $type: "pb.orby_internal.Announcement" as const,

  encode(message: Announcement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    if (message.header !== undefined) {
      AnnouncementContentMarkdown.encode(message.header, writer.uint32(42).fork()).ldelim();
    }
    if (message.contentBlocks !== undefined && message.contentBlocks.length !== 0) {
      for (const v of message.contentBlocks) {
        AnnouncementContentBlock.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    if (message.isActive !== undefined && message.isActive !== false) {
      writer.uint32(56).bool(message.isActive);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(66).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Announcement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnnouncement();
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
          if (tag !== 32) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.header = AnnouncementContentMarkdown.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.contentBlocks!.push(AnnouncementContentBlock.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.isActive = reader.bool();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Announcement {
    return {
      $type: Announcement.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      type: isSet(object.type) ? announcementTypeFromJSON(object.type) : 0,
      header: isSet(object.header) ? AnnouncementContentMarkdown.fromJSON(object.header) : undefined,
      contentBlocks: globalThis.Array.isArray(object?.contentBlocks)
        ? object.contentBlocks.map((e: any) => AnnouncementContentBlock.fromJSON(e))
        : [],
      isActive: isSet(object.isActive) ? globalThis.Boolean(object.isActive) : false,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
    };
  },

  toJSON(message: Announcement): unknown {
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
    if (message.type !== undefined && message.type !== 0) {
      obj.type = announcementTypeToJSON(message.type);
    }
    if (message.header !== undefined) {
      obj.header = AnnouncementContentMarkdown.toJSON(message.header);
    }
    if (message.contentBlocks?.length) {
      obj.contentBlocks = message.contentBlocks.map((e) => AnnouncementContentBlock.toJSON(e));
    }
    if (message.isActive !== undefined && message.isActive !== false) {
      obj.isActive = message.isActive;
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    if (message.updatedAt !== undefined) {
      obj.updatedAt = message.updatedAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Announcement>, I>>(base?: I): Announcement {
    return Announcement.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Announcement>, I>>(object: I): Announcement {
    const message = createBaseAnnouncement();
    message.id = object.id ?? "";
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.type = object.type ?? 0;
    message.header = (object.header !== undefined && object.header !== null)
      ? AnnouncementContentMarkdown.fromPartial(object.header)
      : undefined;
    message.contentBlocks = object.contentBlocks?.map((e) => AnnouncementContentBlock.fromPartial(e)) || [];
    message.isActive = object.isActive ?? false;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Announcement.$type, Announcement);

function createBaseListAnnouncementsRequest(): ListAnnouncementsRequest {
  return { $type: "pb.orby_internal.ListAnnouncementsRequest", pageSize: 0, pageNumber: 0 };
}

export const ListAnnouncementsRequest = {
  $type: "pb.orby_internal.ListAnnouncementsRequest" as const,

  encode(message: ListAnnouncementsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(8).int32(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(16).int32(message.pageNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListAnnouncementsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListAnnouncementsRequest();
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

  fromJSON(object: any): ListAnnouncementsRequest {
    return {
      $type: ListAnnouncementsRequest.$type,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
    };
  },

  toJSON(message: ListAnnouncementsRequest): unknown {
    const obj: any = {};
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListAnnouncementsRequest>, I>>(base?: I): ListAnnouncementsRequest {
    return ListAnnouncementsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListAnnouncementsRequest>, I>>(object: I): ListAnnouncementsRequest {
    const message = createBaseListAnnouncementsRequest();
    message.pageSize = object.pageSize ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListAnnouncementsRequest.$type, ListAnnouncementsRequest);

function createBaseListAnnouncementsResponse(): ListAnnouncementsResponse {
  return { $type: "pb.orby_internal.ListAnnouncementsResponse", announcements: [], totalSize: 0 };
}

export const ListAnnouncementsResponse = {
  $type: "pb.orby_internal.ListAnnouncementsResponse" as const,

  encode(message: ListAnnouncementsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.announcements !== undefined && message.announcements.length !== 0) {
      for (const v of message.announcements) {
        Announcement.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(16).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListAnnouncementsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListAnnouncementsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.announcements!.push(Announcement.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListAnnouncementsResponse {
    return {
      $type: ListAnnouncementsResponse.$type,
      announcements: globalThis.Array.isArray(object?.announcements)
        ? object.announcements.map((e: any) => Announcement.fromJSON(e))
        : [],
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListAnnouncementsResponse): unknown {
    const obj: any = {};
    if (message.announcements?.length) {
      obj.announcements = message.announcements.map((e) => Announcement.toJSON(e));
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListAnnouncementsResponse>, I>>(base?: I): ListAnnouncementsResponse {
    return ListAnnouncementsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListAnnouncementsResponse>, I>>(object: I): ListAnnouncementsResponse {
    const message = createBaseListAnnouncementsResponse();
    message.announcements = object.announcements?.map((e) => Announcement.fromPartial(e)) || [];
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListAnnouncementsResponse.$type, ListAnnouncementsResponse);

function createBaseGetAnnouncementRequest(): GetAnnouncementRequest {
  return { $type: "pb.orby_internal.GetAnnouncementRequest", id: "", isPreview: false };
}

export const GetAnnouncementRequest = {
  $type: "pb.orby_internal.GetAnnouncementRequest" as const,

  encode(message: GetAnnouncementRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.isPreview !== undefined && message.isPreview !== false) {
      writer.uint32(16).bool(message.isPreview);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAnnouncementRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAnnouncementRequest();
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
          if (tag !== 16) {
            break;
          }

          message.isPreview = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAnnouncementRequest {
    return {
      $type: GetAnnouncementRequest.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      isPreview: isSet(object.isPreview) ? globalThis.Boolean(object.isPreview) : false,
    };
  },

  toJSON(message: GetAnnouncementRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.isPreview !== undefined && message.isPreview !== false) {
      obj.isPreview = message.isPreview;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAnnouncementRequest>, I>>(base?: I): GetAnnouncementRequest {
    return GetAnnouncementRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAnnouncementRequest>, I>>(object: I): GetAnnouncementRequest {
    const message = createBaseGetAnnouncementRequest();
    message.id = object.id ?? "";
    message.isPreview = object.isPreview ?? false;
    return message;
  },
};

messageTypeRegistry.set(GetAnnouncementRequest.$type, GetAnnouncementRequest);

function createBaseGetAnnouncementResponse(): GetAnnouncementResponse {
  return { $type: "pb.orby_internal.GetAnnouncementResponse", announcement: undefined, images: [] };
}

export const GetAnnouncementResponse = {
  $type: "pb.orby_internal.GetAnnouncementResponse" as const,

  encode(message: GetAnnouncementResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.announcement !== undefined) {
      Announcement.encode(message.announcement, writer.uint32(10).fork()).ldelim();
    }
    if (message.images !== undefined && message.images.length !== 0) {
      for (const v of message.images) {
        AnnouncementImage.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAnnouncementResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAnnouncementResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.announcement = Announcement.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.images!.push(AnnouncementImage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAnnouncementResponse {
    return {
      $type: GetAnnouncementResponse.$type,
      announcement: isSet(object.announcement) ? Announcement.fromJSON(object.announcement) : undefined,
      images: globalThis.Array.isArray(object?.images)
        ? object.images.map((e: any) => AnnouncementImage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetAnnouncementResponse): unknown {
    const obj: any = {};
    if (message.announcement !== undefined) {
      obj.announcement = Announcement.toJSON(message.announcement);
    }
    if (message.images?.length) {
      obj.images = message.images.map((e) => AnnouncementImage.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAnnouncementResponse>, I>>(base?: I): GetAnnouncementResponse {
    return GetAnnouncementResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAnnouncementResponse>, I>>(object: I): GetAnnouncementResponse {
    const message = createBaseGetAnnouncementResponse();
    message.announcement = (object.announcement !== undefined && object.announcement !== null)
      ? Announcement.fromPartial(object.announcement)
      : undefined;
    message.images = object.images?.map((e) => AnnouncementImage.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetAnnouncementResponse.$type, GetAnnouncementResponse);

function createBaseCreateAnnouncementRequest(): CreateAnnouncementRequest {
  return { $type: "pb.orby_internal.CreateAnnouncementRequest", announcement: undefined };
}

export const CreateAnnouncementRequest = {
  $type: "pb.orby_internal.CreateAnnouncementRequest" as const,

  encode(message: CreateAnnouncementRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.announcement !== undefined) {
      Announcement.encode(message.announcement, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateAnnouncementRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateAnnouncementRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.announcement = Announcement.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateAnnouncementRequest {
    return {
      $type: CreateAnnouncementRequest.$type,
      announcement: isSet(object.announcement) ? Announcement.fromJSON(object.announcement) : undefined,
    };
  },

  toJSON(message: CreateAnnouncementRequest): unknown {
    const obj: any = {};
    if (message.announcement !== undefined) {
      obj.announcement = Announcement.toJSON(message.announcement);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateAnnouncementRequest>, I>>(base?: I): CreateAnnouncementRequest {
    return CreateAnnouncementRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateAnnouncementRequest>, I>>(object: I): CreateAnnouncementRequest {
    const message = createBaseCreateAnnouncementRequest();
    message.announcement = (object.announcement !== undefined && object.announcement !== null)
      ? Announcement.fromPartial(object.announcement)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateAnnouncementRequest.$type, CreateAnnouncementRequest);

function createBaseCreateAnnouncementResponse(): CreateAnnouncementResponse {
  return { $type: "pb.orby_internal.CreateAnnouncementResponse", announcement: undefined };
}

export const CreateAnnouncementResponse = {
  $type: "pb.orby_internal.CreateAnnouncementResponse" as const,

  encode(message: CreateAnnouncementResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.announcement !== undefined) {
      Announcement.encode(message.announcement, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateAnnouncementResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateAnnouncementResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.announcement = Announcement.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateAnnouncementResponse {
    return {
      $type: CreateAnnouncementResponse.$type,
      announcement: isSet(object.announcement) ? Announcement.fromJSON(object.announcement) : undefined,
    };
  },

  toJSON(message: CreateAnnouncementResponse): unknown {
    const obj: any = {};
    if (message.announcement !== undefined) {
      obj.announcement = Announcement.toJSON(message.announcement);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateAnnouncementResponse>, I>>(base?: I): CreateAnnouncementResponse {
    return CreateAnnouncementResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateAnnouncementResponse>, I>>(object: I): CreateAnnouncementResponse {
    const message = createBaseCreateAnnouncementResponse();
    message.announcement = (object.announcement !== undefined && object.announcement !== null)
      ? Announcement.fromPartial(object.announcement)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateAnnouncementResponse.$type, CreateAnnouncementResponse);

function createBaseUpdateAnnouncementRequest(): UpdateAnnouncementRequest {
  return { $type: "pb.orby_internal.UpdateAnnouncementRequest", announcement: undefined, fieldMask: undefined };
}

export const UpdateAnnouncementRequest = {
  $type: "pb.orby_internal.UpdateAnnouncementRequest" as const,

  encode(message: UpdateAnnouncementRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.announcement !== undefined) {
      Announcement.encode(message.announcement, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAnnouncementRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAnnouncementRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.announcement = Announcement.decode(reader, reader.uint32());
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

  fromJSON(object: any): UpdateAnnouncementRequest {
    return {
      $type: UpdateAnnouncementRequest.$type,
      announcement: isSet(object.announcement) ? Announcement.fromJSON(object.announcement) : undefined,
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: UpdateAnnouncementRequest): unknown {
    const obj: any = {};
    if (message.announcement !== undefined) {
      obj.announcement = Announcement.toJSON(message.announcement);
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateAnnouncementRequest>, I>>(base?: I): UpdateAnnouncementRequest {
    return UpdateAnnouncementRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateAnnouncementRequest>, I>>(object: I): UpdateAnnouncementRequest {
    const message = createBaseUpdateAnnouncementRequest();
    message.announcement = (object.announcement !== undefined && object.announcement !== null)
      ? Announcement.fromPartial(object.announcement)
      : undefined;
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateAnnouncementRequest.$type, UpdateAnnouncementRequest);

function createBaseUpdateAnnouncementResponse(): UpdateAnnouncementResponse {
  return { $type: "pb.orby_internal.UpdateAnnouncementResponse", announcement: undefined };
}

export const UpdateAnnouncementResponse = {
  $type: "pb.orby_internal.UpdateAnnouncementResponse" as const,

  encode(message: UpdateAnnouncementResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.announcement !== undefined) {
      Announcement.encode(message.announcement, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAnnouncementResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAnnouncementResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.announcement = Announcement.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateAnnouncementResponse {
    return {
      $type: UpdateAnnouncementResponse.$type,
      announcement: isSet(object.announcement) ? Announcement.fromJSON(object.announcement) : undefined,
    };
  },

  toJSON(message: UpdateAnnouncementResponse): unknown {
    const obj: any = {};
    if (message.announcement !== undefined) {
      obj.announcement = Announcement.toJSON(message.announcement);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateAnnouncementResponse>, I>>(base?: I): UpdateAnnouncementResponse {
    return UpdateAnnouncementResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateAnnouncementResponse>, I>>(object: I): UpdateAnnouncementResponse {
    const message = createBaseUpdateAnnouncementResponse();
    message.announcement = (object.announcement !== undefined && object.announcement !== null)
      ? Announcement.fromPartial(object.announcement)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateAnnouncementResponse.$type, UpdateAnnouncementResponse);

function createBaseDeleteAnnouncementRequest(): DeleteAnnouncementRequest {
  return { $type: "pb.orby_internal.DeleteAnnouncementRequest", id: "" };
}

export const DeleteAnnouncementRequest = {
  $type: "pb.orby_internal.DeleteAnnouncementRequest" as const,

  encode(message: DeleteAnnouncementRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteAnnouncementRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteAnnouncementRequest();
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

  fromJSON(object: any): DeleteAnnouncementRequest {
    return { $type: DeleteAnnouncementRequest.$type, id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: DeleteAnnouncementRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteAnnouncementRequest>, I>>(base?: I): DeleteAnnouncementRequest {
    return DeleteAnnouncementRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteAnnouncementRequest>, I>>(object: I): DeleteAnnouncementRequest {
    const message = createBaseDeleteAnnouncementRequest();
    message.id = object.id ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteAnnouncementRequest.$type, DeleteAnnouncementRequest);

function createBaseUploadAnnouncementImageRequest(): UploadAnnouncementImageRequest {
  return { $type: "pb.orby_internal.UploadAnnouncementImageRequest", id: "", imageContent: new Uint8Array(0) };
}

export const UploadAnnouncementImageRequest = {
  $type: "pb.orby_internal.UploadAnnouncementImageRequest" as const,

  encode(message: UploadAnnouncementImageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.imageContent !== undefined && message.imageContent.length !== 0) {
      writer.uint32(18).bytes(message.imageContent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadAnnouncementImageRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadAnnouncementImageRequest();
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

          message.imageContent = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UploadAnnouncementImageRequest {
    return {
      $type: UploadAnnouncementImageRequest.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      imageContent: isSet(object.imageContent) ? bytesFromBase64(object.imageContent) : new Uint8Array(0),
    };
  },

  toJSON(message: UploadAnnouncementImageRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.imageContent !== undefined && message.imageContent.length !== 0) {
      obj.imageContent = base64FromBytes(message.imageContent);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadAnnouncementImageRequest>, I>>(base?: I): UploadAnnouncementImageRequest {
    return UploadAnnouncementImageRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UploadAnnouncementImageRequest>, I>>(
    object: I,
  ): UploadAnnouncementImageRequest {
    const message = createBaseUploadAnnouncementImageRequest();
    message.id = object.id ?? "";
    message.imageContent = object.imageContent ?? new Uint8Array(0);
    return message;
  },
};

messageTypeRegistry.set(UploadAnnouncementImageRequest.$type, UploadAnnouncementImageRequest);

function createBaseUploadAnnouncementImageResponse(): UploadAnnouncementImageResponse {
  return { $type: "pb.orby_internal.UploadAnnouncementImageResponse", image: undefined };
}

export const UploadAnnouncementImageResponse = {
  $type: "pb.orby_internal.UploadAnnouncementImageResponse" as const,

  encode(message: UploadAnnouncementImageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.image !== undefined) {
      AnnouncementImage.encode(message.image, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadAnnouncementImageResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadAnnouncementImageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.image = AnnouncementImage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UploadAnnouncementImageResponse {
    return {
      $type: UploadAnnouncementImageResponse.$type,
      image: isSet(object.image) ? AnnouncementImage.fromJSON(object.image) : undefined,
    };
  },

  toJSON(message: UploadAnnouncementImageResponse): unknown {
    const obj: any = {};
    if (message.image !== undefined) {
      obj.image = AnnouncementImage.toJSON(message.image);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadAnnouncementImageResponse>, I>>(base?: I): UploadAnnouncementImageResponse {
    return UploadAnnouncementImageResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UploadAnnouncementImageResponse>, I>>(
    object: I,
  ): UploadAnnouncementImageResponse {
    const message = createBaseUploadAnnouncementImageResponse();
    message.image = (object.image !== undefined && object.image !== null)
      ? AnnouncementImage.fromPartial(object.image)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UploadAnnouncementImageResponse.$type, UploadAnnouncementImageResponse);

export interface OrbyInternalService {
  ListOrganizations(
    request: DeepPartial<ListOrganizationsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListOrganizationsResponse>;
  ListHyperparameters(
    request: DeepPartial<ListHyperparametersRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListHyperparametersResponse>;
  ListWorkflowsForOrganization(
    request: DeepPartial<ListWorkflowsForOrganizationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListWorkflowsForOrganizationResponse>;
  GenerateBillingReport(
    request: DeepPartial<GenerateBillingReportRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GenerateBillingReportResponse>;
  GetPredictionAnalysis(
    request: DeepPartial<GetPredictionAnalysisRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetPredictionAnalysisResponse>;
  CreateHyperparameter(
    request: DeepPartial<CreateHyperparameterRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateHyperparameterResponse>;
  UpdateHyperparameter(
    request: DeepPartial<UpdateHyperparameterRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateHyperparameterResponse>;
  /** Creates a user with a role of ROLE_INTERNAL_USER in ory */
  CreateUser(request: DeepPartial<CreateUserRequest>, metadata?: grpc.Metadata): Promise<CreateUserResponse>;
  /** Updates an exisitng user role in ory */
  UpdateUser(request: DeepPartial<UpdateUserRequest>, metadata?: grpc.Metadata): Promise<UpdateUserResponse>;
  /** List all users that have emails ending with `@orby.ai` */
  ListUsers(request: DeepPartial<ListUsersRequest>, metadata?: grpc.Metadata): Promise<ListUsersResponse>;
  GetUserPermissions(
    request: DeepPartial<GetUserPermissionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetUserPermissionsResponse>;
  UpdateWorkflowInInternalApp(request: DeepPartial<UpdateWorkflowRequest>, metadata?: grpc.Metadata): Promise<Workflow>;
  UpdateOrganizationInInternalApp(
    request: DeepPartial<UpdateOrganizationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<Organization>;
  GetHyperparameter(
    request: DeepPartial<GetHyperparameterRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetHyperparameterResponse>;
  /** announcement management */
  ListAnnouncements(
    request: DeepPartial<ListAnnouncementsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListAnnouncementsResponse>;
  GetAnnouncement(
    request: DeepPartial<GetAnnouncementRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetAnnouncementResponse>;
  CreateAnnouncement(
    request: DeepPartial<CreateAnnouncementRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateAnnouncementResponse>;
  UpdateAnnouncement(
    request: DeepPartial<UpdateAnnouncementRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateAnnouncementResponse>;
  DeleteAnnouncement(request: DeepPartial<DeleteAnnouncementRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  UploadAnnouncementImage(
    request: DeepPartial<UploadAnnouncementImageRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UploadAnnouncementImageResponse>;
}

export class OrbyInternalServiceClientImpl implements OrbyInternalService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListOrganizations = this.ListOrganizations.bind(this);
    this.ListHyperparameters = this.ListHyperparameters.bind(this);
    this.ListWorkflowsForOrganization = this.ListWorkflowsForOrganization.bind(this);
    this.GenerateBillingReport = this.GenerateBillingReport.bind(this);
    this.GetPredictionAnalysis = this.GetPredictionAnalysis.bind(this);
    this.CreateHyperparameter = this.CreateHyperparameter.bind(this);
    this.UpdateHyperparameter = this.UpdateHyperparameter.bind(this);
    this.CreateUser = this.CreateUser.bind(this);
    this.UpdateUser = this.UpdateUser.bind(this);
    this.ListUsers = this.ListUsers.bind(this);
    this.GetUserPermissions = this.GetUserPermissions.bind(this);
    this.UpdateWorkflowInInternalApp = this.UpdateWorkflowInInternalApp.bind(this);
    this.UpdateOrganizationInInternalApp = this.UpdateOrganizationInInternalApp.bind(this);
    this.GetHyperparameter = this.GetHyperparameter.bind(this);
    this.ListAnnouncements = this.ListAnnouncements.bind(this);
    this.GetAnnouncement = this.GetAnnouncement.bind(this);
    this.CreateAnnouncement = this.CreateAnnouncement.bind(this);
    this.UpdateAnnouncement = this.UpdateAnnouncement.bind(this);
    this.DeleteAnnouncement = this.DeleteAnnouncement.bind(this);
    this.UploadAnnouncementImage = this.UploadAnnouncementImage.bind(this);
  }

  ListOrganizations(
    request: DeepPartial<ListOrganizationsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListOrganizationsResponse> {
    return this.rpc.unary(
      OrbyInternalServiceListOrganizationsDesc,
      ListOrganizationsRequest.fromPartial(request),
      metadata,
    );
  }

  ListHyperparameters(
    request: DeepPartial<ListHyperparametersRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListHyperparametersResponse> {
    return this.rpc.unary(
      OrbyInternalServiceListHyperparametersDesc,
      ListHyperparametersRequest.fromPartial(request),
      metadata,
    );
  }

  ListWorkflowsForOrganization(
    request: DeepPartial<ListWorkflowsForOrganizationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListWorkflowsForOrganizationResponse> {
    return this.rpc.unary(
      OrbyInternalServiceListWorkflowsForOrganizationDesc,
      ListWorkflowsForOrganizationRequest.fromPartial(request),
      metadata,
    );
  }

  GenerateBillingReport(
    request: DeepPartial<GenerateBillingReportRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GenerateBillingReportResponse> {
    return this.rpc.unary(
      OrbyInternalServiceGenerateBillingReportDesc,
      GenerateBillingReportRequest.fromPartial(request),
      metadata,
    );
  }

  GetPredictionAnalysis(
    request: DeepPartial<GetPredictionAnalysisRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetPredictionAnalysisResponse> {
    return this.rpc.unary(
      OrbyInternalServiceGetPredictionAnalysisDesc,
      GetPredictionAnalysisRequest.fromPartial(request),
      metadata,
    );
  }

  CreateHyperparameter(
    request: DeepPartial<CreateHyperparameterRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateHyperparameterResponse> {
    return this.rpc.unary(
      OrbyInternalServiceCreateHyperparameterDesc,
      CreateHyperparameterRequest.fromPartial(request),
      metadata,
    );
  }

  UpdateHyperparameter(
    request: DeepPartial<UpdateHyperparameterRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateHyperparameterResponse> {
    return this.rpc.unary(
      OrbyInternalServiceUpdateHyperparameterDesc,
      UpdateHyperparameterRequest.fromPartial(request),
      metadata,
    );
  }

  CreateUser(request: DeepPartial<CreateUserRequest>, metadata?: grpc.Metadata): Promise<CreateUserResponse> {
    return this.rpc.unary(OrbyInternalServiceCreateUserDesc, CreateUserRequest.fromPartial(request), metadata);
  }

  UpdateUser(request: DeepPartial<UpdateUserRequest>, metadata?: grpc.Metadata): Promise<UpdateUserResponse> {
    return this.rpc.unary(OrbyInternalServiceUpdateUserDesc, UpdateUserRequest.fromPartial(request), metadata);
  }

  ListUsers(request: DeepPartial<ListUsersRequest>, metadata?: grpc.Metadata): Promise<ListUsersResponse> {
    return this.rpc.unary(OrbyInternalServiceListUsersDesc, ListUsersRequest.fromPartial(request), metadata);
  }

  GetUserPermissions(
    request: DeepPartial<GetUserPermissionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetUserPermissionsResponse> {
    return this.rpc.unary(
      OrbyInternalServiceGetUserPermissionsDesc,
      GetUserPermissionsRequest.fromPartial(request),
      metadata,
    );
  }

  UpdateWorkflowInInternalApp(
    request: DeepPartial<UpdateWorkflowRequest>,
    metadata?: grpc.Metadata,
  ): Promise<Workflow> {
    return this.rpc.unary(
      OrbyInternalServiceUpdateWorkflowInInternalAppDesc,
      UpdateWorkflowRequest.fromPartial(request),
      metadata,
    );
  }

  UpdateOrganizationInInternalApp(
    request: DeepPartial<UpdateOrganizationRequest>,
    metadata?: grpc.Metadata,
  ): Promise<Organization> {
    return this.rpc.unary(
      OrbyInternalServiceUpdateOrganizationInInternalAppDesc,
      UpdateOrganizationRequest.fromPartial(request),
      metadata,
    );
  }

  GetHyperparameter(
    request: DeepPartial<GetHyperparameterRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetHyperparameterResponse> {
    return this.rpc.unary(
      OrbyInternalServiceGetHyperparameterDesc,
      GetHyperparameterRequest.fromPartial(request),
      metadata,
    );
  }

  ListAnnouncements(
    request: DeepPartial<ListAnnouncementsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListAnnouncementsResponse> {
    return this.rpc.unary(
      OrbyInternalServiceListAnnouncementsDesc,
      ListAnnouncementsRequest.fromPartial(request),
      metadata,
    );
  }

  GetAnnouncement(
    request: DeepPartial<GetAnnouncementRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetAnnouncementResponse> {
    return this.rpc.unary(
      OrbyInternalServiceGetAnnouncementDesc,
      GetAnnouncementRequest.fromPartial(request),
      metadata,
    );
  }

  CreateAnnouncement(
    request: DeepPartial<CreateAnnouncementRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateAnnouncementResponse> {
    return this.rpc.unary(
      OrbyInternalServiceCreateAnnouncementDesc,
      CreateAnnouncementRequest.fromPartial(request),
      metadata,
    );
  }

  UpdateAnnouncement(
    request: DeepPartial<UpdateAnnouncementRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateAnnouncementResponse> {
    return this.rpc.unary(
      OrbyInternalServiceUpdateAnnouncementDesc,
      UpdateAnnouncementRequest.fromPartial(request),
      metadata,
    );
  }

  DeleteAnnouncement(request: DeepPartial<DeleteAnnouncementRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(
      OrbyInternalServiceDeleteAnnouncementDesc,
      DeleteAnnouncementRequest.fromPartial(request),
      metadata,
    );
  }

  UploadAnnouncementImage(
    request: DeepPartial<UploadAnnouncementImageRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UploadAnnouncementImageResponse> {
    return this.rpc.unary(
      OrbyInternalServiceUploadAnnouncementImageDesc,
      UploadAnnouncementImageRequest.fromPartial(request),
      metadata,
    );
  }
}

export const OrbyInternalServiceDesc = { serviceName: "pb.orby_internal.OrbyInternalService" };

export const OrbyInternalServiceListOrganizationsDesc: UnaryMethodDefinitionish = {
  methodName: "ListOrganizations",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListOrganizationsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListOrganizationsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceListHyperparametersDesc: UnaryMethodDefinitionish = {
  methodName: "ListHyperparameters",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListHyperparametersRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListHyperparametersResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceListWorkflowsForOrganizationDesc: UnaryMethodDefinitionish = {
  methodName: "ListWorkflowsForOrganization",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListWorkflowsForOrganizationRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListWorkflowsForOrganizationResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceGenerateBillingReportDesc: UnaryMethodDefinitionish = {
  methodName: "GenerateBillingReport",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GenerateBillingReportRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GenerateBillingReportResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceGetPredictionAnalysisDesc: UnaryMethodDefinitionish = {
  methodName: "GetPredictionAnalysis",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetPredictionAnalysisRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetPredictionAnalysisResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceCreateHyperparameterDesc: UnaryMethodDefinitionish = {
  methodName: "CreateHyperparameter",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateHyperparameterRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateHyperparameterResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceUpdateHyperparameterDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateHyperparameter",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateHyperparameterRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateHyperparameterResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceCreateUserDesc: UnaryMethodDefinitionish = {
  methodName: "CreateUser",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateUserRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateUserResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceUpdateUserDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateUser",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateUserRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateUserResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceListUsersDesc: UnaryMethodDefinitionish = {
  methodName: "ListUsers",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListUsersRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListUsersResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceGetUserPermissionsDesc: UnaryMethodDefinitionish = {
  methodName: "GetUserPermissions",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetUserPermissionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetUserPermissionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceUpdateWorkflowInInternalAppDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateWorkflowInInternalApp",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateWorkflowRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Workflow.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceUpdateOrganizationInInternalAppDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateOrganizationInInternalApp",
  service: OrbyInternalServiceDesc,
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

export const OrbyInternalServiceGetHyperparameterDesc: UnaryMethodDefinitionish = {
  methodName: "GetHyperparameter",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetHyperparameterRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetHyperparameterResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceListAnnouncementsDesc: UnaryMethodDefinitionish = {
  methodName: "ListAnnouncements",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListAnnouncementsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListAnnouncementsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceGetAnnouncementDesc: UnaryMethodDefinitionish = {
  methodName: "GetAnnouncement",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetAnnouncementRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetAnnouncementResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceCreateAnnouncementDesc: UnaryMethodDefinitionish = {
  methodName: "CreateAnnouncement",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateAnnouncementRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateAnnouncementResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceUpdateAnnouncementDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateAnnouncement",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateAnnouncementRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateAnnouncementResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const OrbyInternalServiceDeleteAnnouncementDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteAnnouncement",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteAnnouncementRequest.encode(this).finish();
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

export const OrbyInternalServiceUploadAnnouncementImageDesc: UnaryMethodDefinitionish = {
  methodName: "UploadAnnouncementImage",
  service: OrbyInternalServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UploadAnnouncementImageRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UploadAnnouncementImageResponse.decode(data);
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

function bytesFromBase64(b64: string): Uint8Array {
  const bin = globalThis.atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(globalThis.String.fromCharCode(byte));
  });
  return globalThis.btoa(bin.join(""));
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
