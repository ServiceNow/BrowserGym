/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { AnnouncementType, announcementTypeFromJSON, announcementTypeToJSON } from "../../common/announcement";
import { Empty } from "../../google/protobuf/empty";
import { FieldMask } from "../../google/protobuf/field_mask";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import { Oauth2Token } from "./oauth2_token";
import { User, UserOrgRole, userOrgRoleFromJSON, userOrgRoleToJSON } from "./user";

export const protobufPackage = "pb.v1alpha1";

export interface ExchangeTokenRequest {
  $type?: "pb.v1alpha1.ExchangeTokenRequest";
  /** format: users/{user_id}/sessions/{session_id} */
  sessionResourceName?: string | undefined;
}

export interface ListUsersRequest {
  $type?: "pb.v1alpha1.ListUsersRequest";
  /**
   * Default is 10 (when page_size is missing or set to 0). Max value is 50.
   * Ordered by ascending Task resource name.
   * As per OA-2056, max page_size has been increased from 20 to 50
   */
  pageSize?:
    | number
    | undefined;
  /**
   * Use this to continue the previous list requests.
   * Its value should be same with previous response's next_page_token.
   */
  pageToken?:
    | string
    | undefined;
  /**
   * Supported filter: "name_email_prefix={SEARCH_KEY}"
   * SEARCH_KEY will be used to search by email prefix or full_name prefix.
   * "role={admin|user|creator}"
   * "workflow_resource_names={workflows/Id1/Id2/Id3....}"
   * "start_date={date}"
   * "end_date={date}"
   */
  filter?:
    | string
    | undefined;
  /** Organization resource name. Format: organizations/{ID} */
  orgResourceName?:
    | string
    | undefined;
  /**
   * Use this to send only relevant data in response
   * - If Field Mask is not sent or is sent with empty paths then the result will contain
   *    the complete object except the google access token for every user
   * - Valid values for field mask are: email, completed_tasks_count.
   */
  fieldMask?: string[] | undefined;
  pageNumber?: number | undefined;
}

export interface ListUsersResponse {
  $type?: "pb.v1alpha1.ListUsersResponse";
  users?:
    | User[]
    | undefined;
  /** If the value is "", it means no more results for the request. */
  nextPageToken?:
    | string
    | undefined;
  /**
   * Total available users size in the organization.
   * Note it is NOT the remaining available users size after the current response.
   */
  totalSize?: number | undefined;
}

export interface UpdateRequest {
  $type?: "pb.v1alpha1.UpdateRequest";
  /**
   * If field_mask is not provided, all updatable user fields will be updated.
   * User.email is not updatable.
   * Supported field_masks:
   * 1. "settings": to update all settings based on User.settings
   * 2. settings.<Key>: e.g., "settings.enable_event_upload" and "settings.not_allowed_sites".
   *    If "settings" field mask is also used, setting.<Key> ones will be ignored.
   * 3. "org_role": to update the user role
   * 4. "org_id": if set to "", will remove the user from organisation.
   * 5. "prerequisite.policies_to_review": to add reviewed policies, won't overwrite.
   * 6. "org_infos": If empty, user will be removed from org resource name.
   *     If it has one element and the role is different from the current one, user
   *     will have its org role updated.
   * NOTE: if you want to add new users to the organisation please use the AddUserToOrganization api.
   */
  fieldMask?: string[] | undefined;
  user?:
    | User
    | undefined;
  /**
   * Organization resource name. Format: organizations/{ID}
   * We need to check if the requester is either an admin of the organization the user belongs
   * to or the user himself (preciously we assumed users only belonged to one organization)
   */
  orgResourceName?: string | undefined;
}

export interface UpdateResponse {
  $type?: "pb.v1alpha1.UpdateResponse";
  user?: User | undefined;
}

export interface GetUserFilter {
  $type?: "pb.v1alpha1.GetUserFilter";
  /**
   * If true, the response will include announcements that the user has not seen
   * yet, and mark them as viewed.
   */
  includeAnnouncements?:
    | boolean
    | undefined;
  /**
   * If include_announcements is false, this field will be ignored.
   * If announcement_types is empty, will return all types of announcements,
   * otherwise will only return the specified types.
   */
  announcementTypes?: AnnouncementType[] | undefined;
}

export interface GetRequest {
  $type?: "pb.v1alpha1.GetRequest";
  /** Use this to send only relevant data in response. */
  fieldMask?: string[] | undefined;
  filter?: GetUserFilter | undefined;
}

export interface GetResponse {
  $type?: "pb.v1alpha1.GetResponse";
  user?: User | undefined;
}

export interface RegisterRequest {
  $type?: "pb.v1alpha1.RegisterRequest";
  email?: string | undefined;
  password?: string | undefined;
}

export interface RegisterResponse {
  $type?: "pb.v1alpha1.RegisterResponse";
  user?: User | undefined;
}

export interface LoginRequest {
  $type?: "pb.v1alpha1.LoginRequest";
  email?: string | undefined;
  password?: string | undefined;
}

export interface SingleSignOnRequest {
  $type?: "pb.v1alpha1.SingleSignOnRequest";
  googleJwt?: string | undefined;
  googleAuthorizationCode?: string | undefined;
}

export interface MicrosoftSingleSignOnRequest {
  $type?: "pb.v1alpha1.MicrosoftSingleSignOnRequest";
  msAuthorizationCode?: string | undefined;
}

export interface LoginResponse {
  $type?: "pb.v1alpha1.LoginResponse";
  user?:
    | User
    | undefined;
  /** Resource name of the session in the format of "users/abc/sessions/633ab04b366af3af8e7b2312" */
  sessionId?: string | undefined;
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  accessTokenExpiresAt?: Date | undefined;
  refreshTokenExpiresAt?: Date | undefined;
}

export interface LogoutRequest {
  $type?: "pb.v1alpha1.LogoutRequest";
  /**
   * The resource name of the session to be deleted, which is same with session id,
   * for example "users/abc/sessions/633ab04b366af3af8e7b2312"
   */
  name?: string | undefined;
}

export interface UpdatePasswordRequest {
  $type?: "pb.v1alpha1.UpdatePasswordRequest";
  email?: string | undefined;
  password?: string | undefined;
  newPassword?: string | undefined;
  confirmPassword?: string | undefined;
}

export interface UpdatePasswordResponse {
  $type?: "pb.v1alpha1.UpdatePasswordResponse";
  message?: string | undefined;
}

export interface AddUserToOrganizationRequest {
  $type?: "pb.v1alpha1.AddUserToOrganizationRequest";
  email?: string | undefined;
  orgResourceName?: string | undefined;
  role?:
    | UserOrgRole
    | undefined;
  /**
   * Emails which are sent to email addresses that do not exist
   * bounce and affect our reputation score
   * This can be set as false to alleviate this
   */
  sendEmail?: boolean | undefined;
}

export interface MsAuthUrlRequest {
  $type?: "pb.v1alpha1.MsAuthUrlRequest";
  /** List of scopes (eg - Files.ReadWrite, user.read) to request from user */
  scopes?: string[] | undefined;
}

export interface MsAuthUrlResponse {
  $type?: "pb.v1alpha1.MsAuthUrlResponse";
  authCodeUrl?: string | undefined;
}

export interface GetUserPermissionsRequest {
  $type?: "pb.v1alpha1.GetUserPermissionsRequest";
  /** Organization resource name. Format: organizations/{ID} */
  orgResourceName?: string | undefined;
}

export interface GetUserPermissionsResponse {
  $type?: "pb.v1alpha1.GetUserPermissionsResponse";
  /** List of permissions the user has in the organization */
  permittedActions?: string[] | undefined;
}

export interface UpdateGoogleTokenRequest {
  $type?: "pb.v1alpha1.UpdateGoogleTokenRequest";
  googleAuthorizationCode?: string | undefined;
}

export interface UpdateGoogleTokenResponse {
  $type?: "pb.v1alpha1.UpdateGoogleTokenResponse";
  googleToken?: Oauth2Token | undefined;
}

export interface UpdateMicrosoftTokenRequest {
  $type?: "pb.v1alpha1.UpdateMicrosoftTokenRequest";
  microsoftAuthorizationCode?: string | undefined;
}

export interface UpdateMicrosoftTokenResponse {
  $type?: "pb.v1alpha1.UpdateMicrosoftTokenResponse";
  microsoftToken?: Oauth2Token | undefined;
}

export interface UpdateActiveOrgIdRequest {
  $type?: "pb.v1alpha1.UpdateActiveOrgIdRequest";
  /** org_id is the current active orgId of the user */
  orgId?: string | undefined;
}

function createBaseExchangeTokenRequest(): ExchangeTokenRequest {
  return { $type: "pb.v1alpha1.ExchangeTokenRequest", sessionResourceName: "" };
}

export const ExchangeTokenRequest = {
  $type: "pb.v1alpha1.ExchangeTokenRequest" as const,

  encode(message: ExchangeTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionResourceName !== undefined && message.sessionResourceName !== "") {
      writer.uint32(10).string(message.sessionResourceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExchangeTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExchangeTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionResourceName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExchangeTokenRequest {
    return {
      $type: ExchangeTokenRequest.$type,
      sessionResourceName: isSet(object.sessionResourceName) ? globalThis.String(object.sessionResourceName) : "",
    };
  },

  toJSON(message: ExchangeTokenRequest): unknown {
    const obj: any = {};
    if (message.sessionResourceName !== undefined && message.sessionResourceName !== "") {
      obj.sessionResourceName = message.sessionResourceName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExchangeTokenRequest>, I>>(base?: I): ExchangeTokenRequest {
    return ExchangeTokenRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExchangeTokenRequest>, I>>(object: I): ExchangeTokenRequest {
    const message = createBaseExchangeTokenRequest();
    message.sessionResourceName = object.sessionResourceName ?? "";
    return message;
  },
};

messageTypeRegistry.set(ExchangeTokenRequest.$type, ExchangeTokenRequest);

function createBaseListUsersRequest(): ListUsersRequest {
  return {
    $type: "pb.v1alpha1.ListUsersRequest",
    pageSize: 0,
    pageToken: "",
    filter: "",
    orgResourceName: "",
    fieldMask: undefined,
    pageNumber: 0,
  };
}

export const ListUsersRequest = {
  $type: "pb.v1alpha1.ListUsersRequest" as const,

  encode(message: ListUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(8).int32(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      writer.uint32(18).string(message.pageToken);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(26).string(message.filter);
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(34).string(message.orgResourceName);
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(42).fork()).ldelim();
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(48).int32(message.pageNumber);
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
          if (tag !== 18) {
            break;
          }

          message.pageToken = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.filter = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.orgResourceName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
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

  fromJSON(object: any): ListUsersRequest {
    return {
      $type: ListUsersRequest.$type,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
    };
  },

  toJSON(message: ListUsersRequest): unknown {
    const obj: any = {};
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      obj.pageToken = message.pageToken;
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListUsersRequest>, I>>(base?: I): ListUsersRequest {
    return ListUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListUsersRequest>, I>>(object: I): ListUsersRequest {
    const message = createBaseListUsersRequest();
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    message.filter = object.filter ?? "";
    message.orgResourceName = object.orgResourceName ?? "";
    message.fieldMask = object.fieldMask ?? undefined;
    message.pageNumber = object.pageNumber ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListUsersRequest.$type, ListUsersRequest);

function createBaseListUsersResponse(): ListUsersResponse {
  return { $type: "pb.v1alpha1.ListUsersResponse", users: [], nextPageToken: "", totalSize: 0 };
}

export const ListUsersResponse = {
  $type: "pb.v1alpha1.ListUsersResponse" as const,

  encode(message: ListUsersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.users !== undefined && message.users.length !== 0) {
      for (const v of message.users) {
        User.encode(v!, writer.uint32(10).fork()).ldelim();
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

          message.users!.push(User.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListUsersResponse {
    return {
      $type: ListUsersResponse.$type,
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => User.fromJSON(e)) : [],
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListUsersResponse): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => User.toJSON(e));
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
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
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListUsersResponse.$type, ListUsersResponse);

function createBaseUpdateRequest(): UpdateRequest {
  return { $type: "pb.v1alpha1.UpdateRequest", fieldMask: undefined, user: undefined, orgResourceName: "" };
}

export const UpdateRequest = {
  $type: "pb.v1alpha1.UpdateRequest" as const,

  encode(message: UpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(10).fork()).ldelim();
    }
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(18).fork()).ldelim();
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(26).string(message.orgResourceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): UpdateRequest {
    return {
      $type: UpdateRequest.$type,
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
    };
  },

  toJSON(message: UpdateRequest): unknown {
    const obj: any = {};
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateRequest>, I>>(base?: I): UpdateRequest {
    return UpdateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateRequest>, I>>(object: I): UpdateRequest {
    const message = createBaseUpdateRequest();
    message.fieldMask = object.fieldMask ?? undefined;
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.orgResourceName = object.orgResourceName ?? "";
    return message;
  },
};

messageTypeRegistry.set(UpdateRequest.$type, UpdateRequest);

function createBaseUpdateResponse(): UpdateResponse {
  return { $type: "pb.v1alpha1.UpdateResponse", user: undefined };
}

export const UpdateResponse = {
  $type: "pb.v1alpha1.UpdateResponse" as const,

  encode(message: UpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateResponse {
    return { $type: UpdateResponse.$type, user: isSet(object.user) ? User.fromJSON(object.user) : undefined };
  },

  toJSON(message: UpdateResponse): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateResponse>, I>>(base?: I): UpdateResponse {
    return UpdateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateResponse>, I>>(object: I): UpdateResponse {
    const message = createBaseUpdateResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateResponse.$type, UpdateResponse);

function createBaseGetUserFilter(): GetUserFilter {
  return { $type: "pb.v1alpha1.GetUserFilter", includeAnnouncements: false, announcementTypes: [] };
}

export const GetUserFilter = {
  $type: "pb.v1alpha1.GetUserFilter" as const,

  encode(message: GetUserFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.includeAnnouncements !== undefined && message.includeAnnouncements !== false) {
      writer.uint32(8).bool(message.includeAnnouncements);
    }
    if (message.announcementTypes !== undefined && message.announcementTypes.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.announcementTypes) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.includeAnnouncements = reader.bool();
          continue;
        case 2:
          if (tag === 16) {
            message.announcementTypes!.push(reader.int32() as any);

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.announcementTypes!.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetUserFilter {
    return {
      $type: GetUserFilter.$type,
      includeAnnouncements: isSet(object.includeAnnouncements)
        ? globalThis.Boolean(object.includeAnnouncements)
        : false,
      announcementTypes: globalThis.Array.isArray(object?.announcementTypes)
        ? object.announcementTypes.map((e: any) => announcementTypeFromJSON(e))
        : [],
    };
  },

  toJSON(message: GetUserFilter): unknown {
    const obj: any = {};
    if (message.includeAnnouncements !== undefined && message.includeAnnouncements !== false) {
      obj.includeAnnouncements = message.includeAnnouncements;
    }
    if (message.announcementTypes?.length) {
      obj.announcementTypes = message.announcementTypes.map((e) => announcementTypeToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserFilter>, I>>(base?: I): GetUserFilter {
    return GetUserFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUserFilter>, I>>(object: I): GetUserFilter {
    const message = createBaseGetUserFilter();
    message.includeAnnouncements = object.includeAnnouncements ?? false;
    message.announcementTypes = object.announcementTypes?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(GetUserFilter.$type, GetUserFilter);

function createBaseGetRequest(): GetRequest {
  return { $type: "pb.v1alpha1.GetRequest", fieldMask: undefined, filter: undefined };
}

export const GetRequest = {
  $type: "pb.v1alpha1.GetRequest" as const,

  encode(message: GetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(10).fork()).ldelim();
    }
    if (message.filter !== undefined) {
      GetUserFilter.encode(message.filter, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.filter = GetUserFilter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetRequest {
    return {
      $type: GetRequest.$type,
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
      filter: isSet(object.filter) ? GetUserFilter.fromJSON(object.filter) : undefined,
    };
  },

  toJSON(message: GetRequest): unknown {
    const obj: any = {};
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    if (message.filter !== undefined) {
      obj.filter = GetUserFilter.toJSON(message.filter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetRequest>, I>>(base?: I): GetRequest {
    return GetRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetRequest>, I>>(object: I): GetRequest {
    const message = createBaseGetRequest();
    message.fieldMask = object.fieldMask ?? undefined;
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? GetUserFilter.fromPartial(object.filter)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetRequest.$type, GetRequest);

function createBaseGetResponse(): GetResponse {
  return { $type: "pb.v1alpha1.GetResponse", user: undefined };
}

export const GetResponse = {
  $type: "pb.v1alpha1.GetResponse" as const,

  encode(message: GetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetResponse {
    return { $type: GetResponse.$type, user: isSet(object.user) ? User.fromJSON(object.user) : undefined };
  },

  toJSON(message: GetResponse): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetResponse>, I>>(base?: I): GetResponse {
    return GetResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetResponse>, I>>(object: I): GetResponse {
    const message = createBaseGetResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetResponse.$type, GetResponse);

function createBaseRegisterRequest(): RegisterRequest {
  return { $type: "pb.v1alpha1.RegisterRequest", email: "", password: "" };
}

export const RegisterRequest = {
  $type: "pb.v1alpha1.RegisterRequest" as const,

  encode(message: RegisterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== undefined && message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== undefined && message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterRequest();
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

  fromJSON(object: any): RegisterRequest {
    return {
      $type: RegisterRequest.$type,
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: RegisterRequest): unknown {
    const obj: any = {};
    if (message.email !== undefined && message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== undefined && message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterRequest>, I>>(base?: I): RegisterRequest {
    return RegisterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterRequest>, I>>(object: I): RegisterRequest {
    const message = createBaseRegisterRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

messageTypeRegistry.set(RegisterRequest.$type, RegisterRequest);

function createBaseRegisterResponse(): RegisterResponse {
  return { $type: "pb.v1alpha1.RegisterResponse", user: undefined };
}

export const RegisterResponse = {
  $type: "pb.v1alpha1.RegisterResponse" as const,

  encode(message: RegisterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterResponse {
    return { $type: RegisterResponse.$type, user: isSet(object.user) ? User.fromJSON(object.user) : undefined };
  },

  toJSON(message: RegisterResponse): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterResponse>, I>>(base?: I): RegisterResponse {
    return RegisterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterResponse>, I>>(object: I): RegisterResponse {
    const message = createBaseRegisterResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

messageTypeRegistry.set(RegisterResponse.$type, RegisterResponse);

function createBaseLoginRequest(): LoginRequest {
  return { $type: "pb.v1alpha1.LoginRequest", email: "", password: "" };
}

export const LoginRequest = {
  $type: "pb.v1alpha1.LoginRequest" as const,

  encode(message: LoginRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== undefined && message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== undefined && message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginRequest();
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

  fromJSON(object: any): LoginRequest {
    return {
      $type: LoginRequest.$type,
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: LoginRequest): unknown {
    const obj: any = {};
    if (message.email !== undefined && message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== undefined && message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LoginRequest>, I>>(base?: I): LoginRequest {
    return LoginRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LoginRequest>, I>>(object: I): LoginRequest {
    const message = createBaseLoginRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

messageTypeRegistry.set(LoginRequest.$type, LoginRequest);

function createBaseSingleSignOnRequest(): SingleSignOnRequest {
  return { $type: "pb.v1alpha1.SingleSignOnRequest", googleJwt: "", googleAuthorizationCode: "" };
}

export const SingleSignOnRequest = {
  $type: "pb.v1alpha1.SingleSignOnRequest" as const,

  encode(message: SingleSignOnRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.googleJwt !== undefined && message.googleJwt !== "") {
      writer.uint32(10).string(message.googleJwt);
    }
    if (message.googleAuthorizationCode !== undefined && message.googleAuthorizationCode !== "") {
      writer.uint32(18).string(message.googleAuthorizationCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SingleSignOnRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSingleSignOnRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.googleJwt = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.googleAuthorizationCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SingleSignOnRequest {
    return {
      $type: SingleSignOnRequest.$type,
      googleJwt: isSet(object.googleJwt) ? globalThis.String(object.googleJwt) : "",
      googleAuthorizationCode: isSet(object.googleAuthorizationCode)
        ? globalThis.String(object.googleAuthorizationCode)
        : "",
    };
  },

  toJSON(message: SingleSignOnRequest): unknown {
    const obj: any = {};
    if (message.googleJwt !== undefined && message.googleJwt !== "") {
      obj.googleJwt = message.googleJwt;
    }
    if (message.googleAuthorizationCode !== undefined && message.googleAuthorizationCode !== "") {
      obj.googleAuthorizationCode = message.googleAuthorizationCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SingleSignOnRequest>, I>>(base?: I): SingleSignOnRequest {
    return SingleSignOnRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SingleSignOnRequest>, I>>(object: I): SingleSignOnRequest {
    const message = createBaseSingleSignOnRequest();
    message.googleJwt = object.googleJwt ?? "";
    message.googleAuthorizationCode = object.googleAuthorizationCode ?? "";
    return message;
  },
};

messageTypeRegistry.set(SingleSignOnRequest.$type, SingleSignOnRequest);

function createBaseMicrosoftSingleSignOnRequest(): MicrosoftSingleSignOnRequest {
  return { $type: "pb.v1alpha1.MicrosoftSingleSignOnRequest", msAuthorizationCode: "" };
}

export const MicrosoftSingleSignOnRequest = {
  $type: "pb.v1alpha1.MicrosoftSingleSignOnRequest" as const,

  encode(message: MicrosoftSingleSignOnRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.msAuthorizationCode !== undefined && message.msAuthorizationCode !== "") {
      writer.uint32(10).string(message.msAuthorizationCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MicrosoftSingleSignOnRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMicrosoftSingleSignOnRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.msAuthorizationCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MicrosoftSingleSignOnRequest {
    return {
      $type: MicrosoftSingleSignOnRequest.$type,
      msAuthorizationCode: isSet(object.msAuthorizationCode) ? globalThis.String(object.msAuthorizationCode) : "",
    };
  },

  toJSON(message: MicrosoftSingleSignOnRequest): unknown {
    const obj: any = {};
    if (message.msAuthorizationCode !== undefined && message.msAuthorizationCode !== "") {
      obj.msAuthorizationCode = message.msAuthorizationCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MicrosoftSingleSignOnRequest>, I>>(base?: I): MicrosoftSingleSignOnRequest {
    return MicrosoftSingleSignOnRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MicrosoftSingleSignOnRequest>, I>>(object: I): MicrosoftSingleSignOnRequest {
    const message = createBaseMicrosoftSingleSignOnRequest();
    message.msAuthorizationCode = object.msAuthorizationCode ?? "";
    return message;
  },
};

messageTypeRegistry.set(MicrosoftSingleSignOnRequest.$type, MicrosoftSingleSignOnRequest);

function createBaseLoginResponse(): LoginResponse {
  return {
    $type: "pb.v1alpha1.LoginResponse",
    user: undefined,
    sessionId: "",
    accessToken: "",
    refreshToken: "",
    accessTokenExpiresAt: undefined,
    refreshTokenExpiresAt: undefined,
  };
}

export const LoginResponse = {
  $type: "pb.v1alpha1.LoginResponse" as const,

  encode(message: LoginResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionId !== undefined && message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    if (message.accessToken !== undefined && message.accessToken !== "") {
      writer.uint32(26).string(message.accessToken);
    }
    if (message.refreshToken !== undefined && message.refreshToken !== "") {
      writer.uint32(34).string(message.refreshToken);
    }
    if (message.accessTokenExpiresAt !== undefined) {
      Timestamp.encode(toTimestamp(message.accessTokenExpiresAt), writer.uint32(42).fork()).ldelim();
    }
    if (message.refreshTokenExpiresAt !== undefined) {
      Timestamp.encode(toTimestamp(message.refreshTokenExpiresAt), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.accessTokenExpiresAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.refreshTokenExpiresAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoginResponse {
    return {
      $type: LoginResponse.$type,
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      sessionId: isSet(object.sessionId) ? globalThis.String(object.sessionId) : "",
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "",
      accessTokenExpiresAt: isSet(object.accessTokenExpiresAt)
        ? fromJsonTimestamp(object.accessTokenExpiresAt)
        : undefined,
      refreshTokenExpiresAt: isSet(object.refreshTokenExpiresAt)
        ? fromJsonTimestamp(object.refreshTokenExpiresAt)
        : undefined,
    };
  },

  toJSON(message: LoginResponse): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    if (message.sessionId !== undefined && message.sessionId !== "") {
      obj.sessionId = message.sessionId;
    }
    if (message.accessToken !== undefined && message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.refreshToken !== undefined && message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    if (message.accessTokenExpiresAt !== undefined) {
      obj.accessTokenExpiresAt = message.accessTokenExpiresAt.toISOString();
    }
    if (message.refreshTokenExpiresAt !== undefined) {
      obj.refreshTokenExpiresAt = message.refreshTokenExpiresAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LoginResponse>, I>>(base?: I): LoginResponse {
    return LoginResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LoginResponse>, I>>(object: I): LoginResponse {
    const message = createBaseLoginResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.sessionId = object.sessionId ?? "";
    message.accessToken = object.accessToken ?? "";
    message.refreshToken = object.refreshToken ?? "";
    message.accessTokenExpiresAt = object.accessTokenExpiresAt ?? undefined;
    message.refreshTokenExpiresAt = object.refreshTokenExpiresAt ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(LoginResponse.$type, LoginResponse);

function createBaseLogoutRequest(): LogoutRequest {
  return { $type: "pb.v1alpha1.LogoutRequest", name: "" };
}

export const LogoutRequest = {
  $type: "pb.v1alpha1.LogoutRequest" as const,

  encode(message: LogoutRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LogoutRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogoutRequest();
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

  fromJSON(object: any): LogoutRequest {
    return { $type: LogoutRequest.$type, name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: LogoutRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LogoutRequest>, I>>(base?: I): LogoutRequest {
    return LogoutRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LogoutRequest>, I>>(object: I): LogoutRequest {
    const message = createBaseLogoutRequest();
    message.name = object.name ?? "";
    return message;
  },
};

messageTypeRegistry.set(LogoutRequest.$type, LogoutRequest);

function createBaseUpdatePasswordRequest(): UpdatePasswordRequest {
  return { $type: "pb.v1alpha1.UpdatePasswordRequest", email: "", password: "", newPassword: "", confirmPassword: "" };
}

export const UpdatePasswordRequest = {
  $type: "pb.v1alpha1.UpdatePasswordRequest" as const,

  encode(message: UpdatePasswordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== undefined && message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== undefined && message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.newPassword !== undefined && message.newPassword !== "") {
      writer.uint32(26).string(message.newPassword);
    }
    if (message.confirmPassword !== undefined && message.confirmPassword !== "") {
      writer.uint32(34).string(message.confirmPassword);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatePasswordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePasswordRequest();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newPassword = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.confirmPassword = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdatePasswordRequest {
    return {
      $type: UpdatePasswordRequest.$type,
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      newPassword: isSet(object.newPassword) ? globalThis.String(object.newPassword) : "",
      confirmPassword: isSet(object.confirmPassword) ? globalThis.String(object.confirmPassword) : "",
    };
  },

  toJSON(message: UpdatePasswordRequest): unknown {
    const obj: any = {};
    if (message.email !== undefined && message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== undefined && message.password !== "") {
      obj.password = message.password;
    }
    if (message.newPassword !== undefined && message.newPassword !== "") {
      obj.newPassword = message.newPassword;
    }
    if (message.confirmPassword !== undefined && message.confirmPassword !== "") {
      obj.confirmPassword = message.confirmPassword;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdatePasswordRequest>, I>>(base?: I): UpdatePasswordRequest {
    return UpdatePasswordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdatePasswordRequest>, I>>(object: I): UpdatePasswordRequest {
    const message = createBaseUpdatePasswordRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    message.newPassword = object.newPassword ?? "";
    message.confirmPassword = object.confirmPassword ?? "";
    return message;
  },
};

messageTypeRegistry.set(UpdatePasswordRequest.$type, UpdatePasswordRequest);

function createBaseUpdatePasswordResponse(): UpdatePasswordResponse {
  return { $type: "pb.v1alpha1.UpdatePasswordResponse", message: "" };
}

export const UpdatePasswordResponse = {
  $type: "pb.v1alpha1.UpdatePasswordResponse" as const,

  encode(message: UpdatePasswordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatePasswordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePasswordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdatePasswordResponse {
    return {
      $type: UpdatePasswordResponse.$type,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: UpdatePasswordResponse): unknown {
    const obj: any = {};
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdatePasswordResponse>, I>>(base?: I): UpdatePasswordResponse {
    return UpdatePasswordResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdatePasswordResponse>, I>>(object: I): UpdatePasswordResponse {
    const message = createBaseUpdatePasswordResponse();
    message.message = object.message ?? "";
    return message;
  },
};

messageTypeRegistry.set(UpdatePasswordResponse.$type, UpdatePasswordResponse);

function createBaseAddUserToOrganizationRequest(): AddUserToOrganizationRequest {
  return {
    $type: "pb.v1alpha1.AddUserToOrganizationRequest",
    email: "",
    orgResourceName: "",
    role: 0,
    sendEmail: false,
  };
}

export const AddUserToOrganizationRequest = {
  $type: "pb.v1alpha1.AddUserToOrganizationRequest" as const,

  encode(message: AddUserToOrganizationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== undefined && message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(18).string(message.orgResourceName);
    }
    if (message.role !== undefined && message.role !== 0) {
      writer.uint32(24).int32(message.role);
    }
    if (message.sendEmail !== undefined && message.sendEmail !== false) {
      writer.uint32(32).bool(message.sendEmail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddUserToOrganizationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddUserToOrganizationRequest();
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

          message.orgResourceName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.sendEmail = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddUserToOrganizationRequest {
    return {
      $type: AddUserToOrganizationRequest.$type,
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      role: isSet(object.role) ? userOrgRoleFromJSON(object.role) : 0,
      sendEmail: isSet(object.sendEmail) ? globalThis.Boolean(object.sendEmail) : false,
    };
  },

  toJSON(message: AddUserToOrganizationRequest): unknown {
    const obj: any = {};
    if (message.email !== undefined && message.email !== "") {
      obj.email = message.email;
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.role !== undefined && message.role !== 0) {
      obj.role = userOrgRoleToJSON(message.role);
    }
    if (message.sendEmail !== undefined && message.sendEmail !== false) {
      obj.sendEmail = message.sendEmail;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddUserToOrganizationRequest>, I>>(base?: I): AddUserToOrganizationRequest {
    return AddUserToOrganizationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddUserToOrganizationRequest>, I>>(object: I): AddUserToOrganizationRequest {
    const message = createBaseAddUserToOrganizationRequest();
    message.email = object.email ?? "";
    message.orgResourceName = object.orgResourceName ?? "";
    message.role = object.role ?? 0;
    message.sendEmail = object.sendEmail ?? false;
    return message;
  },
};

messageTypeRegistry.set(AddUserToOrganizationRequest.$type, AddUserToOrganizationRequest);

function createBaseMsAuthUrlRequest(): MsAuthUrlRequest {
  return { $type: "pb.v1alpha1.MsAuthUrlRequest", scopes: [] };
}

export const MsAuthUrlRequest = {
  $type: "pb.v1alpha1.MsAuthUrlRequest" as const,

  encode(message: MsAuthUrlRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scopes !== undefined && message.scopes.length !== 0) {
      for (const v of message.scopes) {
        writer.uint32(10).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsAuthUrlRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsAuthUrlRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scopes!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsAuthUrlRequest {
    return {
      $type: MsAuthUrlRequest.$type,
      scopes: globalThis.Array.isArray(object?.scopes) ? object.scopes.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: MsAuthUrlRequest): unknown {
    const obj: any = {};
    if (message.scopes?.length) {
      obj.scopes = message.scopes;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsAuthUrlRequest>, I>>(base?: I): MsAuthUrlRequest {
    return MsAuthUrlRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsAuthUrlRequest>, I>>(object: I): MsAuthUrlRequest {
    const message = createBaseMsAuthUrlRequest();
    message.scopes = object.scopes?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(MsAuthUrlRequest.$type, MsAuthUrlRequest);

function createBaseMsAuthUrlResponse(): MsAuthUrlResponse {
  return { $type: "pb.v1alpha1.MsAuthUrlResponse", authCodeUrl: "" };
}

export const MsAuthUrlResponse = {
  $type: "pb.v1alpha1.MsAuthUrlResponse" as const,

  encode(message: MsAuthUrlResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authCodeUrl !== undefined && message.authCodeUrl !== "") {
      writer.uint32(10).string(message.authCodeUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsAuthUrlResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsAuthUrlResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authCodeUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsAuthUrlResponse {
    return {
      $type: MsAuthUrlResponse.$type,
      authCodeUrl: isSet(object.authCodeUrl) ? globalThis.String(object.authCodeUrl) : "",
    };
  },

  toJSON(message: MsAuthUrlResponse): unknown {
    const obj: any = {};
    if (message.authCodeUrl !== undefined && message.authCodeUrl !== "") {
      obj.authCodeUrl = message.authCodeUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsAuthUrlResponse>, I>>(base?: I): MsAuthUrlResponse {
    return MsAuthUrlResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsAuthUrlResponse>, I>>(object: I): MsAuthUrlResponse {
    const message = createBaseMsAuthUrlResponse();
    message.authCodeUrl = object.authCodeUrl ?? "";
    return message;
  },
};

messageTypeRegistry.set(MsAuthUrlResponse.$type, MsAuthUrlResponse);

function createBaseGetUserPermissionsRequest(): GetUserPermissionsRequest {
  return { $type: "pb.v1alpha1.GetUserPermissionsRequest", orgResourceName: "" };
}

export const GetUserPermissionsRequest = {
  $type: "pb.v1alpha1.GetUserPermissionsRequest" as const,

  encode(message: GetUserPermissionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(10).string(message.orgResourceName);
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

  fromJSON(object: any): GetUserPermissionsRequest {
    return {
      $type: GetUserPermissionsRequest.$type,
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
    };
  },

  toJSON(message: GetUserPermissionsRequest): unknown {
    const obj: any = {};
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserPermissionsRequest>, I>>(base?: I): GetUserPermissionsRequest {
    return GetUserPermissionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUserPermissionsRequest>, I>>(object: I): GetUserPermissionsRequest {
    const message = createBaseGetUserPermissionsRequest();
    message.orgResourceName = object.orgResourceName ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetUserPermissionsRequest.$type, GetUserPermissionsRequest);

function createBaseGetUserPermissionsResponse(): GetUserPermissionsResponse {
  return { $type: "pb.v1alpha1.GetUserPermissionsResponse", permittedActions: [] };
}

export const GetUserPermissionsResponse = {
  $type: "pb.v1alpha1.GetUserPermissionsResponse" as const,

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

function createBaseUpdateGoogleTokenRequest(): UpdateGoogleTokenRequest {
  return { $type: "pb.v1alpha1.UpdateGoogleTokenRequest", googleAuthorizationCode: "" };
}

export const UpdateGoogleTokenRequest = {
  $type: "pb.v1alpha1.UpdateGoogleTokenRequest" as const,

  encode(message: UpdateGoogleTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.googleAuthorizationCode !== undefined && message.googleAuthorizationCode !== "") {
      writer.uint32(10).string(message.googleAuthorizationCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateGoogleTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateGoogleTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.googleAuthorizationCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateGoogleTokenRequest {
    return {
      $type: UpdateGoogleTokenRequest.$type,
      googleAuthorizationCode: isSet(object.googleAuthorizationCode)
        ? globalThis.String(object.googleAuthorizationCode)
        : "",
    };
  },

  toJSON(message: UpdateGoogleTokenRequest): unknown {
    const obj: any = {};
    if (message.googleAuthorizationCode !== undefined && message.googleAuthorizationCode !== "") {
      obj.googleAuthorizationCode = message.googleAuthorizationCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateGoogleTokenRequest>, I>>(base?: I): UpdateGoogleTokenRequest {
    return UpdateGoogleTokenRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateGoogleTokenRequest>, I>>(object: I): UpdateGoogleTokenRequest {
    const message = createBaseUpdateGoogleTokenRequest();
    message.googleAuthorizationCode = object.googleAuthorizationCode ?? "";
    return message;
  },
};

messageTypeRegistry.set(UpdateGoogleTokenRequest.$type, UpdateGoogleTokenRequest);

function createBaseUpdateGoogleTokenResponse(): UpdateGoogleTokenResponse {
  return { $type: "pb.v1alpha1.UpdateGoogleTokenResponse", googleToken: undefined };
}

export const UpdateGoogleTokenResponse = {
  $type: "pb.v1alpha1.UpdateGoogleTokenResponse" as const,

  encode(message: UpdateGoogleTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.googleToken !== undefined) {
      Oauth2Token.encode(message.googleToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateGoogleTokenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateGoogleTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.googleToken = Oauth2Token.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateGoogleTokenResponse {
    return {
      $type: UpdateGoogleTokenResponse.$type,
      googleToken: isSet(object.googleToken) ? Oauth2Token.fromJSON(object.googleToken) : undefined,
    };
  },

  toJSON(message: UpdateGoogleTokenResponse): unknown {
    const obj: any = {};
    if (message.googleToken !== undefined) {
      obj.googleToken = Oauth2Token.toJSON(message.googleToken);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateGoogleTokenResponse>, I>>(base?: I): UpdateGoogleTokenResponse {
    return UpdateGoogleTokenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateGoogleTokenResponse>, I>>(object: I): UpdateGoogleTokenResponse {
    const message = createBaseUpdateGoogleTokenResponse();
    message.googleToken = (object.googleToken !== undefined && object.googleToken !== null)
      ? Oauth2Token.fromPartial(object.googleToken)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateGoogleTokenResponse.$type, UpdateGoogleTokenResponse);

function createBaseUpdateMicrosoftTokenRequest(): UpdateMicrosoftTokenRequest {
  return { $type: "pb.v1alpha1.UpdateMicrosoftTokenRequest", microsoftAuthorizationCode: "" };
}

export const UpdateMicrosoftTokenRequest = {
  $type: "pb.v1alpha1.UpdateMicrosoftTokenRequest" as const,

  encode(message: UpdateMicrosoftTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.microsoftAuthorizationCode !== undefined && message.microsoftAuthorizationCode !== "") {
      writer.uint32(10).string(message.microsoftAuthorizationCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateMicrosoftTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateMicrosoftTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.microsoftAuthorizationCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateMicrosoftTokenRequest {
    return {
      $type: UpdateMicrosoftTokenRequest.$type,
      microsoftAuthorizationCode: isSet(object.microsoftAuthorizationCode)
        ? globalThis.String(object.microsoftAuthorizationCode)
        : "",
    };
  },

  toJSON(message: UpdateMicrosoftTokenRequest): unknown {
    const obj: any = {};
    if (message.microsoftAuthorizationCode !== undefined && message.microsoftAuthorizationCode !== "") {
      obj.microsoftAuthorizationCode = message.microsoftAuthorizationCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateMicrosoftTokenRequest>, I>>(base?: I): UpdateMicrosoftTokenRequest {
    return UpdateMicrosoftTokenRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateMicrosoftTokenRequest>, I>>(object: I): UpdateMicrosoftTokenRequest {
    const message = createBaseUpdateMicrosoftTokenRequest();
    message.microsoftAuthorizationCode = object.microsoftAuthorizationCode ?? "";
    return message;
  },
};

messageTypeRegistry.set(UpdateMicrosoftTokenRequest.$type, UpdateMicrosoftTokenRequest);

function createBaseUpdateMicrosoftTokenResponse(): UpdateMicrosoftTokenResponse {
  return { $type: "pb.v1alpha1.UpdateMicrosoftTokenResponse", microsoftToken: undefined };
}

export const UpdateMicrosoftTokenResponse = {
  $type: "pb.v1alpha1.UpdateMicrosoftTokenResponse" as const,

  encode(message: UpdateMicrosoftTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.microsoftToken !== undefined) {
      Oauth2Token.encode(message.microsoftToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateMicrosoftTokenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateMicrosoftTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.microsoftToken = Oauth2Token.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateMicrosoftTokenResponse {
    return {
      $type: UpdateMicrosoftTokenResponse.$type,
      microsoftToken: isSet(object.microsoftToken) ? Oauth2Token.fromJSON(object.microsoftToken) : undefined,
    };
  },

  toJSON(message: UpdateMicrosoftTokenResponse): unknown {
    const obj: any = {};
    if (message.microsoftToken !== undefined) {
      obj.microsoftToken = Oauth2Token.toJSON(message.microsoftToken);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateMicrosoftTokenResponse>, I>>(base?: I): UpdateMicrosoftTokenResponse {
    return UpdateMicrosoftTokenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateMicrosoftTokenResponse>, I>>(object: I): UpdateMicrosoftTokenResponse {
    const message = createBaseUpdateMicrosoftTokenResponse();
    message.microsoftToken = (object.microsoftToken !== undefined && object.microsoftToken !== null)
      ? Oauth2Token.fromPartial(object.microsoftToken)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateMicrosoftTokenResponse.$type, UpdateMicrosoftTokenResponse);

function createBaseUpdateActiveOrgIdRequest(): UpdateActiveOrgIdRequest {
  return { $type: "pb.v1alpha1.UpdateActiveOrgIdRequest", orgId: "" };
}

export const UpdateActiveOrgIdRequest = {
  $type: "pb.v1alpha1.UpdateActiveOrgIdRequest" as const,

  encode(message: UpdateActiveOrgIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateActiveOrgIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateActiveOrgIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): UpdateActiveOrgIdRequest {
    return { $type: UpdateActiveOrgIdRequest.$type, orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "" };
  },

  toJSON(message: UpdateActiveOrgIdRequest): unknown {
    const obj: any = {};
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateActiveOrgIdRequest>, I>>(base?: I): UpdateActiveOrgIdRequest {
    return UpdateActiveOrgIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateActiveOrgIdRequest>, I>>(object: I): UpdateActiveOrgIdRequest {
    const message = createBaseUpdateActiveOrgIdRequest();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

messageTypeRegistry.set(UpdateActiveOrgIdRequest.$type, UpdateActiveOrgIdRequest);

export interface Users {
  Register(request: DeepPartial<RegisterRequest>, metadata?: grpc.Metadata): Promise<RegisterResponse>;
  Login(request: DeepPartial<LoginRequest>, metadata?: grpc.Metadata): Promise<LoginResponse>;
  SingleSignOn(request: DeepPartial<SingleSignOnRequest>, metadata?: grpc.Metadata): Promise<LoginResponse>;
  /**
   * Log out from a specific session.
   * Client side must remove access and refresh tokens after calling this.
   */
  Logout(request: DeepPartial<LogoutRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  Get(request: DeepPartial<GetRequest>, metadata?: grpc.Metadata): Promise<GetResponse>;
  Update(request: DeepPartial<UpdateRequest>, metadata?: grpc.Metadata): Promise<UpdateResponse>;
  UpdatePassword(
    request: DeepPartial<UpdatePasswordRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdatePasswordResponse>;
  ListUsers(request: DeepPartial<ListUsersRequest>, metadata?: grpc.Metadata): Promise<ListUsersResponse>;
  /** Sends the user's active orgId to BE so that the orgId cookie can be set */
  UpdateActiveOrgId(request: DeepPartial<UpdateActiveOrgIdRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  /** TODO: move this api inside update user api, OA-1040 */
  AddUserToOrganization(request: DeepPartial<AddUserToOrganizationRequest>, metadata?: grpc.Metadata): Promise<User>;
  MicrosoftSingleSignOn(
    request: DeepPartial<MicrosoftSingleSignOnRequest>,
    metadata?: grpc.Metadata,
  ): Promise<LoginResponse>;
  GoogleSingleSignOnForInternalApp(
    request: DeepPartial<SingleSignOnRequest>,
    metadata?: grpc.Metadata,
  ): Promise<LoginResponse>;
  GenerateMsAuthUrl(request: DeepPartial<MsAuthUrlRequest>, metadata?: grpc.Metadata): Promise<MsAuthUrlResponse>;
  ExchangeToken(request: DeepPartial<ExchangeTokenRequest>, metadata?: grpc.Metadata): Promise<LoginResponse>;
  GetUserPermissions(
    request: DeepPartial<GetUserPermissionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetUserPermissionsResponse>;
  UpdateGoogleToken(
    request: DeepPartial<UpdateGoogleTokenRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateGoogleTokenResponse>;
  UpdateMicrosoftToken(
    request: DeepPartial<UpdateMicrosoftTokenRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateMicrosoftTokenResponse>;
}

export class UsersClientImpl implements Users {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Register = this.Register.bind(this);
    this.Login = this.Login.bind(this);
    this.SingleSignOn = this.SingleSignOn.bind(this);
    this.Logout = this.Logout.bind(this);
    this.Get = this.Get.bind(this);
    this.Update = this.Update.bind(this);
    this.UpdatePassword = this.UpdatePassword.bind(this);
    this.ListUsers = this.ListUsers.bind(this);
    this.UpdateActiveOrgId = this.UpdateActiveOrgId.bind(this);
    this.AddUserToOrganization = this.AddUserToOrganization.bind(this);
    this.MicrosoftSingleSignOn = this.MicrosoftSingleSignOn.bind(this);
    this.GoogleSingleSignOnForInternalApp = this.GoogleSingleSignOnForInternalApp.bind(this);
    this.GenerateMsAuthUrl = this.GenerateMsAuthUrl.bind(this);
    this.ExchangeToken = this.ExchangeToken.bind(this);
    this.GetUserPermissions = this.GetUserPermissions.bind(this);
    this.UpdateGoogleToken = this.UpdateGoogleToken.bind(this);
    this.UpdateMicrosoftToken = this.UpdateMicrosoftToken.bind(this);
  }

  Register(request: DeepPartial<RegisterRequest>, metadata?: grpc.Metadata): Promise<RegisterResponse> {
    return this.rpc.unary(UsersRegisterDesc, RegisterRequest.fromPartial(request), metadata);
  }

  Login(request: DeepPartial<LoginRequest>, metadata?: grpc.Metadata): Promise<LoginResponse> {
    return this.rpc.unary(UsersLoginDesc, LoginRequest.fromPartial(request), metadata);
  }

  SingleSignOn(request: DeepPartial<SingleSignOnRequest>, metadata?: grpc.Metadata): Promise<LoginResponse> {
    return this.rpc.unary(UsersSingleSignOnDesc, SingleSignOnRequest.fromPartial(request), metadata);
  }

  Logout(request: DeepPartial<LogoutRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(UsersLogoutDesc, LogoutRequest.fromPartial(request), metadata);
  }

  Get(request: DeepPartial<GetRequest>, metadata?: grpc.Metadata): Promise<GetResponse> {
    return this.rpc.unary(UsersGetDesc, GetRequest.fromPartial(request), metadata);
  }

  Update(request: DeepPartial<UpdateRequest>, metadata?: grpc.Metadata): Promise<UpdateResponse> {
    return this.rpc.unary(UsersUpdateDesc, UpdateRequest.fromPartial(request), metadata);
  }

  UpdatePassword(
    request: DeepPartial<UpdatePasswordRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdatePasswordResponse> {
    return this.rpc.unary(UsersUpdatePasswordDesc, UpdatePasswordRequest.fromPartial(request), metadata);
  }

  ListUsers(request: DeepPartial<ListUsersRequest>, metadata?: grpc.Metadata): Promise<ListUsersResponse> {
    return this.rpc.unary(UsersListUsersDesc, ListUsersRequest.fromPartial(request), metadata);
  }

  UpdateActiveOrgId(request: DeepPartial<UpdateActiveOrgIdRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(UsersUpdateActiveOrgIdDesc, UpdateActiveOrgIdRequest.fromPartial(request), metadata);
  }

  AddUserToOrganization(request: DeepPartial<AddUserToOrganizationRequest>, metadata?: grpc.Metadata): Promise<User> {
    return this.rpc.unary(UsersAddUserToOrganizationDesc, AddUserToOrganizationRequest.fromPartial(request), metadata);
  }

  MicrosoftSingleSignOn(
    request: DeepPartial<MicrosoftSingleSignOnRequest>,
    metadata?: grpc.Metadata,
  ): Promise<LoginResponse> {
    return this.rpc.unary(UsersMicrosoftSingleSignOnDesc, MicrosoftSingleSignOnRequest.fromPartial(request), metadata);
  }

  GoogleSingleSignOnForInternalApp(
    request: DeepPartial<SingleSignOnRequest>,
    metadata?: grpc.Metadata,
  ): Promise<LoginResponse> {
    return this.rpc.unary(
      UsersGoogleSingleSignOnForInternalAppDesc,
      SingleSignOnRequest.fromPartial(request),
      metadata,
    );
  }

  GenerateMsAuthUrl(request: DeepPartial<MsAuthUrlRequest>, metadata?: grpc.Metadata): Promise<MsAuthUrlResponse> {
    return this.rpc.unary(UsersGenerateMsAuthUrlDesc, MsAuthUrlRequest.fromPartial(request), metadata);
  }

  ExchangeToken(request: DeepPartial<ExchangeTokenRequest>, metadata?: grpc.Metadata): Promise<LoginResponse> {
    return this.rpc.unary(UsersExchangeTokenDesc, ExchangeTokenRequest.fromPartial(request), metadata);
  }

  GetUserPermissions(
    request: DeepPartial<GetUserPermissionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetUserPermissionsResponse> {
    return this.rpc.unary(UsersGetUserPermissionsDesc, GetUserPermissionsRequest.fromPartial(request), metadata);
  }

  UpdateGoogleToken(
    request: DeepPartial<UpdateGoogleTokenRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateGoogleTokenResponse> {
    return this.rpc.unary(UsersUpdateGoogleTokenDesc, UpdateGoogleTokenRequest.fromPartial(request), metadata);
  }

  UpdateMicrosoftToken(
    request: DeepPartial<UpdateMicrosoftTokenRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateMicrosoftTokenResponse> {
    return this.rpc.unary(UsersUpdateMicrosoftTokenDesc, UpdateMicrosoftTokenRequest.fromPartial(request), metadata);
  }
}

export const UsersDesc = { serviceName: "pb.v1alpha1.Users" };

export const UsersRegisterDesc: UnaryMethodDefinitionish = {
  methodName: "Register",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RegisterRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RegisterResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UsersLoginDesc: UnaryMethodDefinitionish = {
  methodName: "Login",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return LoginRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = LoginResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UsersSingleSignOnDesc: UnaryMethodDefinitionish = {
  methodName: "SingleSignOn",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SingleSignOnRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = LoginResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UsersLogoutDesc: UnaryMethodDefinitionish = {
  methodName: "Logout",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return LogoutRequest.encode(this).finish();
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

export const UsersGetDesc: UnaryMethodDefinitionish = {
  methodName: "Get",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UsersUpdateDesc: UnaryMethodDefinitionish = {
  methodName: "Update",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UsersUpdatePasswordDesc: UnaryMethodDefinitionish = {
  methodName: "UpdatePassword",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdatePasswordRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdatePasswordResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UsersListUsersDesc: UnaryMethodDefinitionish = {
  methodName: "ListUsers",
  service: UsersDesc,
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

export const UsersUpdateActiveOrgIdDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateActiveOrgId",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateActiveOrgIdRequest.encode(this).finish();
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

export const UsersAddUserToOrganizationDesc: UnaryMethodDefinitionish = {
  methodName: "AddUserToOrganization",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddUserToOrganizationRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = User.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UsersMicrosoftSingleSignOnDesc: UnaryMethodDefinitionish = {
  methodName: "MicrosoftSingleSignOn",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MicrosoftSingleSignOnRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = LoginResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UsersGoogleSingleSignOnForInternalAppDesc: UnaryMethodDefinitionish = {
  methodName: "GoogleSingleSignOnForInternalApp",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SingleSignOnRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = LoginResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UsersGenerateMsAuthUrlDesc: UnaryMethodDefinitionish = {
  methodName: "GenerateMsAuthUrl",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsAuthUrlRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsAuthUrlResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UsersExchangeTokenDesc: UnaryMethodDefinitionish = {
  methodName: "ExchangeToken",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ExchangeTokenRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = LoginResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UsersGetUserPermissionsDesc: UnaryMethodDefinitionish = {
  methodName: "GetUserPermissions",
  service: UsersDesc,
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

export const UsersUpdateGoogleTokenDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateGoogleToken",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateGoogleTokenRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateGoogleTokenResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UsersUpdateMicrosoftTokenDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateMicrosoftToken",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateMicrosoftTokenRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateMicrosoftTokenResponse.decode(data);
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
