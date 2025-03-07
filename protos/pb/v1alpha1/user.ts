/* eslint-disable */
import _m0 from "protobufjs/minimal";
import {
  AnnouncementContentBlock,
  AnnouncementContentMarkdown,
  AnnouncementType,
  announcementTypeFromJSON,
  announcementTypeToJSON,
} from "../../common/announcement";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import { Oauth2Token } from "./oauth2_token";

export const protobufPackage = "pb.v1alpha1";

export interface User {
  $type?: "pb.v1alpha1.User";
  email?:
    | string
    | undefined;
  /**
   * Key value pairs of user settings. Two keys are supported now:
   * 1. "enable_event_upload". Possible values: true|false
   * 2. "not_allowed_sites". Possible values: a string of websites joined by comma, for example:
   *    "www.citibank.com,www.adp.com". Don't includ protocol prefixes like "http://" or "https://".
   */
  settings?:
    | { [key: string]: string }
    | undefined;
  /** Format: organizations/{ID} */
  orgResourceName?: string | undefined;
  orgDisplayName?: string | undefined;
  role?:
    | UserOrgRole
    | undefined;
  /**
   * Inactive users won't be assigned to tasks. This value is set to false when
   * an admin user invite new users, and flipped to true when a user has
   * signed into Orby AI once.
   */
  activated?: boolean | undefined;
  assignedWorkflows?: string[] | undefined;
  googleToken?: Oauth2Token | undefined;
  prerequisite?:
    | UserPrerequisite
    | undefined;
  /** Support for multiple organizations */
  orgInfos?: OrgInfo[] | undefined;
  id?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  fullName?: string | undefined;
  profileImageUrl?: string | undefined;
  microsoftUserInfo?:
    | MicrosoftUserInfo
    | undefined;
  /**
   * Permissions that user has access to.
   * This field will be used in internal-app
   */
  permittedActions?:
    | string[]
    | undefined;
  /** Announcements that user has not seen yet. */
  announcements?:
    | Announcement[]
    | undefined;
  /** workflows that user is admin of */
  managedWorkflows?:
    | string[]
    | undefined;
  /**
   * Number of completed tasks reviewedby user in a
   * particular timeframe
   */
  numberOfCompletedTasksReviewed?: number | undefined;
  msToken?: Oauth2Token | undefined;
  googleUserInfo?: GoogleUserInfo | undefined;
}

/**
 * ROLE_ADMIN: can create users and workflows
 * ROLE_CREATOR: can create workflows
 * ROLE_USER: can only review workflows
 */
export enum UserOrgRole {
  ROLE_UNSPECIFIED = 0,
  ROLE_ADMIN = 1,
  ROLE_USER = 2,
  ROLE_CREATOR = 3,
  UNRECOGNIZED = -1,
}

export function userOrgRoleFromJSON(object: any): UserOrgRole {
  switch (object) {
    case 0:
    case "ROLE_UNSPECIFIED":
      return UserOrgRole.ROLE_UNSPECIFIED;
    case 1:
    case "ROLE_ADMIN":
      return UserOrgRole.ROLE_ADMIN;
    case 2:
    case "ROLE_USER":
      return UserOrgRole.ROLE_USER;
    case 3:
    case "ROLE_CREATOR":
      return UserOrgRole.ROLE_CREATOR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserOrgRole.UNRECOGNIZED;
  }
}

export function userOrgRoleToJSON(object: UserOrgRole): string {
  switch (object) {
    case UserOrgRole.ROLE_UNSPECIFIED:
      return "ROLE_UNSPECIFIED";
    case UserOrgRole.ROLE_ADMIN:
      return "ROLE_ADMIN";
    case UserOrgRole.ROLE_USER:
      return "ROLE_USER";
    case UserOrgRole.ROLE_CREATOR:
      return "ROLE_CREATOR";
    case UserOrgRole.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface UserSettingsEntry {
  $type?: "pb.v1alpha1.User.SettingsEntry";
  key: string;
  value: string;
}

/**
 * Prerequisite that user needs to go through before having access to our
 * services including frontend
 */
export interface UserPrerequisite {
  $type?: "pb.v1alpha1.UserPrerequisite";
  /** New policies or policy versions for user to review and accept. */
  policiesToReview?: PolicyAcceptance[] | undefined;
}

export interface PolicyAcceptance {
  $type?: "pb.v1alpha1.PolicyAcceptance";
  policyName?: string | undefined;
  policyVersion?: string | undefined;
  policyUrl?: string | undefined;
  acceptedAt?: Date | undefined;
  policyId?: string | undefined;
}

export interface OrgInfo {
  $type?: "pb.v1alpha1.OrgInfo";
  orgResourceName?: string | undefined;
  orgDisplayName?: string | undefined;
  role?: UserOrgRole | undefined;
}

export interface MicrosoftUserInfo {
  $type?: "pb.v1alpha1.MicrosoftUserInfo";
  type?: string | undefined;
  baseDriveUrl?:
    | string
    | undefined;
  /** List of scopes (eg - Files.ReadWrite, user.read) currently held by app */
  scopes?: string[] | undefined;
  email?: string | undefined;
}

export interface GoogleUserInfo {
  $type?: "pb.v1alpha1.GoogleUserInfo";
  email?: string | undefined;
}

export interface Announcement {
  $type?: "pb.v1alpha1.Announcement";
  id?: string | undefined;
  type?: AnnouncementType | undefined;
  header?: AnnouncementContentMarkdown | undefined;
  contentBlocks?: AnnouncementContentBlock[] | undefined;
}

function createBaseUser(): User {
  return {
    $type: "pb.v1alpha1.User",
    email: "",
    settings: {},
    orgResourceName: "",
    orgDisplayName: "",
    role: 0,
    activated: false,
    assignedWorkflows: [],
    googleToken: undefined,
    prerequisite: undefined,
    orgInfos: [],
    id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    profileImageUrl: "",
    microsoftUserInfo: undefined,
    permittedActions: [],
    announcements: [],
    managedWorkflows: [],
    numberOfCompletedTasksReviewed: 0,
    msToken: undefined,
    googleUserInfo: undefined,
  };
}

export const User = {
  $type: "pb.v1alpha1.User" as const,

  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== undefined && message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    Object.entries(message.settings || {}).forEach(([key, value]) => {
      UserSettingsEntry.encode(
        { $type: "pb.v1alpha1.User.SettingsEntry", key: key as any, value },
        writer.uint32(18).fork(),
      ).ldelim();
    });
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(26).string(message.orgResourceName);
    }
    if (message.orgDisplayName !== undefined && message.orgDisplayName !== "") {
      writer.uint32(34).string(message.orgDisplayName);
    }
    if (message.role !== undefined && message.role !== 0) {
      writer.uint32(40).int32(message.role);
    }
    if (message.activated !== undefined && message.activated !== false) {
      writer.uint32(48).bool(message.activated);
    }
    if (message.assignedWorkflows !== undefined && message.assignedWorkflows.length !== 0) {
      for (const v of message.assignedWorkflows) {
        writer.uint32(58).string(v!);
      }
    }
    if (message.googleToken !== undefined) {
      Oauth2Token.encode(message.googleToken, writer.uint32(66).fork()).ldelim();
    }
    if (message.prerequisite !== undefined) {
      UserPrerequisite.encode(message.prerequisite, writer.uint32(74).fork()).ldelim();
    }
    if (message.orgInfos !== undefined && message.orgInfos.length !== 0) {
      for (const v of message.orgInfos) {
        OrgInfo.encode(v!, writer.uint32(82).fork()).ldelim();
      }
    }
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(90).string(message.id);
    }
    if (message.firstName !== undefined && message.firstName !== "") {
      writer.uint32(98).string(message.firstName);
    }
    if (message.lastName !== undefined && message.lastName !== "") {
      writer.uint32(106).string(message.lastName);
    }
    if (message.fullName !== undefined && message.fullName !== "") {
      writer.uint32(114).string(message.fullName);
    }
    if (message.profileImageUrl !== undefined && message.profileImageUrl !== "") {
      writer.uint32(122).string(message.profileImageUrl);
    }
    if (message.microsoftUserInfo !== undefined) {
      MicrosoftUserInfo.encode(message.microsoftUserInfo, writer.uint32(130).fork()).ldelim();
    }
    if (message.permittedActions !== undefined && message.permittedActions.length !== 0) {
      for (const v of message.permittedActions) {
        writer.uint32(138).string(v!);
      }
    }
    if (message.announcements !== undefined && message.announcements.length !== 0) {
      for (const v of message.announcements) {
        Announcement.encode(v!, writer.uint32(146).fork()).ldelim();
      }
    }
    if (message.managedWorkflows !== undefined && message.managedWorkflows.length !== 0) {
      for (const v of message.managedWorkflows) {
        writer.uint32(154).string(v!);
      }
    }
    if (message.numberOfCompletedTasksReviewed !== undefined && message.numberOfCompletedTasksReviewed !== 0) {
      writer.uint32(160).int32(message.numberOfCompletedTasksReviewed);
    }
    if (message.msToken !== undefined) {
      Oauth2Token.encode(message.msToken, writer.uint32(170).fork()).ldelim();
    }
    if (message.googleUserInfo !== undefined) {
      GoogleUserInfo.encode(message.googleUserInfo, writer.uint32(178).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
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

          const entry2 = UserSettingsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.settings![entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.orgResourceName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.orgDisplayName = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.activated = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.assignedWorkflows!.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.googleToken = Oauth2Token.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.prerequisite = UserPrerequisite.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.orgInfos!.push(OrgInfo.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.id = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.fullName = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.profileImageUrl = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.microsoftUserInfo = MicrosoftUserInfo.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.permittedActions!.push(reader.string());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.announcements!.push(Announcement.decode(reader, reader.uint32()));
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.managedWorkflows!.push(reader.string());
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }

          message.numberOfCompletedTasksReviewed = reader.int32();
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.msToken = Oauth2Token.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.googleUserInfo = GoogleUserInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      $type: User.$type,
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      settings: isObject(object.settings)
        ? Object.entries(object.settings).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      orgDisplayName: isSet(object.orgDisplayName) ? globalThis.String(object.orgDisplayName) : "",
      role: isSet(object.role) ? userOrgRoleFromJSON(object.role) : 0,
      activated: isSet(object.activated) ? globalThis.Boolean(object.activated) : false,
      assignedWorkflows: globalThis.Array.isArray(object?.assignedWorkflows)
        ? object.assignedWorkflows.map((e: any) => globalThis.String(e))
        : [],
      googleToken: isSet(object.googleToken) ? Oauth2Token.fromJSON(object.googleToken) : undefined,
      prerequisite: isSet(object.prerequisite) ? UserPrerequisite.fromJSON(object.prerequisite) : undefined,
      orgInfos: globalThis.Array.isArray(object?.orgInfos) ? object.orgInfos.map((e: any) => OrgInfo.fromJSON(e)) : [],
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      firstName: isSet(object.firstName) ? globalThis.String(object.firstName) : "",
      lastName: isSet(object.lastName) ? globalThis.String(object.lastName) : "",
      fullName: isSet(object.fullName) ? globalThis.String(object.fullName) : "",
      profileImageUrl: isSet(object.profileImageUrl) ? globalThis.String(object.profileImageUrl) : "",
      microsoftUserInfo: isSet(object.microsoftUserInfo)
        ? MicrosoftUserInfo.fromJSON(object.microsoftUserInfo)
        : undefined,
      permittedActions: globalThis.Array.isArray(object?.permittedActions)
        ? object.permittedActions.map((e: any) => globalThis.String(e))
        : [],
      announcements: globalThis.Array.isArray(object?.announcements)
        ? object.announcements.map((e: any) => Announcement.fromJSON(e))
        : [],
      managedWorkflows: globalThis.Array.isArray(object?.managedWorkflows)
        ? object.managedWorkflows.map((e: any) => globalThis.String(e))
        : [],
      numberOfCompletedTasksReviewed: isSet(object.numberOfCompletedTasksReviewed)
        ? globalThis.Number(object.numberOfCompletedTasksReviewed)
        : 0,
      msToken: isSet(object.msToken) ? Oauth2Token.fromJSON(object.msToken) : undefined,
      googleUserInfo: isSet(object.googleUserInfo) ? GoogleUserInfo.fromJSON(object.googleUserInfo) : undefined,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.email !== undefined && message.email !== "") {
      obj.email = message.email;
    }
    if (message.settings) {
      const entries = Object.entries(message.settings);
      if (entries.length > 0) {
        obj.settings = {};
        entries.forEach(([k, v]) => {
          obj.settings[k] = v;
        });
      }
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.orgDisplayName !== undefined && message.orgDisplayName !== "") {
      obj.orgDisplayName = message.orgDisplayName;
    }
    if (message.role !== undefined && message.role !== 0) {
      obj.role = userOrgRoleToJSON(message.role);
    }
    if (message.activated !== undefined && message.activated !== false) {
      obj.activated = message.activated;
    }
    if (message.assignedWorkflows?.length) {
      obj.assignedWorkflows = message.assignedWorkflows;
    }
    if (message.googleToken !== undefined) {
      obj.googleToken = Oauth2Token.toJSON(message.googleToken);
    }
    if (message.prerequisite !== undefined) {
      obj.prerequisite = UserPrerequisite.toJSON(message.prerequisite);
    }
    if (message.orgInfos?.length) {
      obj.orgInfos = message.orgInfos.map((e) => OrgInfo.toJSON(e));
    }
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.firstName !== undefined && message.firstName !== "") {
      obj.firstName = message.firstName;
    }
    if (message.lastName !== undefined && message.lastName !== "") {
      obj.lastName = message.lastName;
    }
    if (message.fullName !== undefined && message.fullName !== "") {
      obj.fullName = message.fullName;
    }
    if (message.profileImageUrl !== undefined && message.profileImageUrl !== "") {
      obj.profileImageUrl = message.profileImageUrl;
    }
    if (message.microsoftUserInfo !== undefined) {
      obj.microsoftUserInfo = MicrosoftUserInfo.toJSON(message.microsoftUserInfo);
    }
    if (message.permittedActions?.length) {
      obj.permittedActions = message.permittedActions;
    }
    if (message.announcements?.length) {
      obj.announcements = message.announcements.map((e) => Announcement.toJSON(e));
    }
    if (message.managedWorkflows?.length) {
      obj.managedWorkflows = message.managedWorkflows;
    }
    if (message.numberOfCompletedTasksReviewed !== undefined && message.numberOfCompletedTasksReviewed !== 0) {
      obj.numberOfCompletedTasksReviewed = Math.round(message.numberOfCompletedTasksReviewed);
    }
    if (message.msToken !== undefined) {
      obj.msToken = Oauth2Token.toJSON(message.msToken);
    }
    if (message.googleUserInfo !== undefined) {
      obj.googleUserInfo = GoogleUserInfo.toJSON(message.googleUserInfo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.email = object.email ?? "";
    message.settings = Object.entries(object.settings ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    message.orgResourceName = object.orgResourceName ?? "";
    message.orgDisplayName = object.orgDisplayName ?? "";
    message.role = object.role ?? 0;
    message.activated = object.activated ?? false;
    message.assignedWorkflows = object.assignedWorkflows?.map((e) => e) || [];
    message.googleToken = (object.googleToken !== undefined && object.googleToken !== null)
      ? Oauth2Token.fromPartial(object.googleToken)
      : undefined;
    message.prerequisite = (object.prerequisite !== undefined && object.prerequisite !== null)
      ? UserPrerequisite.fromPartial(object.prerequisite)
      : undefined;
    message.orgInfos = object.orgInfos?.map((e) => OrgInfo.fromPartial(e)) || [];
    message.id = object.id ?? "";
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.fullName = object.fullName ?? "";
    message.profileImageUrl = object.profileImageUrl ?? "";
    message.microsoftUserInfo = (object.microsoftUserInfo !== undefined && object.microsoftUserInfo !== null)
      ? MicrosoftUserInfo.fromPartial(object.microsoftUserInfo)
      : undefined;
    message.permittedActions = object.permittedActions?.map((e) => e) || [];
    message.announcements = object.announcements?.map((e) => Announcement.fromPartial(e)) || [];
    message.managedWorkflows = object.managedWorkflows?.map((e) => e) || [];
    message.numberOfCompletedTasksReviewed = object.numberOfCompletedTasksReviewed ?? 0;
    message.msToken = (object.msToken !== undefined && object.msToken !== null)
      ? Oauth2Token.fromPartial(object.msToken)
      : undefined;
    message.googleUserInfo = (object.googleUserInfo !== undefined && object.googleUserInfo !== null)
      ? GoogleUserInfo.fromPartial(object.googleUserInfo)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(User.$type, User);

function createBaseUserSettingsEntry(): UserSettingsEntry {
  return { $type: "pb.v1alpha1.User.SettingsEntry", key: "", value: "" };
}

export const UserSettingsEntry = {
  $type: "pb.v1alpha1.User.SettingsEntry" as const,

  encode(message: UserSettingsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserSettingsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserSettingsEntry();
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
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserSettingsEntry {
    return {
      $type: UserSettingsEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: UserSettingsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserSettingsEntry>, I>>(base?: I): UserSettingsEntry {
    return UserSettingsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserSettingsEntry>, I>>(object: I): UserSettingsEntry {
    const message = createBaseUserSettingsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

messageTypeRegistry.set(UserSettingsEntry.$type, UserSettingsEntry);

function createBaseUserPrerequisite(): UserPrerequisite {
  return { $type: "pb.v1alpha1.UserPrerequisite", policiesToReview: [] };
}

export const UserPrerequisite = {
  $type: "pb.v1alpha1.UserPrerequisite" as const,

  encode(message: UserPrerequisite, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.policiesToReview !== undefined && message.policiesToReview.length !== 0) {
      for (const v of message.policiesToReview) {
        PolicyAcceptance.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserPrerequisite {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserPrerequisite();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.policiesToReview!.push(PolicyAcceptance.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserPrerequisite {
    return {
      $type: UserPrerequisite.$type,
      policiesToReview: globalThis.Array.isArray(object?.policiesToReview)
        ? object.policiesToReview.map((e: any) => PolicyAcceptance.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UserPrerequisite): unknown {
    const obj: any = {};
    if (message.policiesToReview?.length) {
      obj.policiesToReview = message.policiesToReview.map((e) => PolicyAcceptance.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserPrerequisite>, I>>(base?: I): UserPrerequisite {
    return UserPrerequisite.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserPrerequisite>, I>>(object: I): UserPrerequisite {
    const message = createBaseUserPrerequisite();
    message.policiesToReview = object.policiesToReview?.map((e) => PolicyAcceptance.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(UserPrerequisite.$type, UserPrerequisite);

function createBasePolicyAcceptance(): PolicyAcceptance {
  return {
    $type: "pb.v1alpha1.PolicyAcceptance",
    policyName: "",
    policyVersion: "",
    policyUrl: "",
    acceptedAt: undefined,
    policyId: "",
  };
}

export const PolicyAcceptance = {
  $type: "pb.v1alpha1.PolicyAcceptance" as const,

  encode(message: PolicyAcceptance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.policyName !== undefined && message.policyName !== "") {
      writer.uint32(10).string(message.policyName);
    }
    if (message.policyVersion !== undefined && message.policyVersion !== "") {
      writer.uint32(18).string(message.policyVersion);
    }
    if (message.policyUrl !== undefined && message.policyUrl !== "") {
      writer.uint32(26).string(message.policyUrl);
    }
    if (message.acceptedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.acceptedAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.policyId !== undefined && message.policyId !== "") {
      writer.uint32(42).string(message.policyId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PolicyAcceptance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePolicyAcceptance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.policyName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.policyVersion = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.policyUrl = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.acceptedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.policyId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PolicyAcceptance {
    return {
      $type: PolicyAcceptance.$type,
      policyName: isSet(object.policyName) ? globalThis.String(object.policyName) : "",
      policyVersion: isSet(object.policyVersion) ? globalThis.String(object.policyVersion) : "",
      policyUrl: isSet(object.policyUrl) ? globalThis.String(object.policyUrl) : "",
      acceptedAt: isSet(object.acceptedAt) ? fromJsonTimestamp(object.acceptedAt) : undefined,
      policyId: isSet(object.policyId) ? globalThis.String(object.policyId) : "",
    };
  },

  toJSON(message: PolicyAcceptance): unknown {
    const obj: any = {};
    if (message.policyName !== undefined && message.policyName !== "") {
      obj.policyName = message.policyName;
    }
    if (message.policyVersion !== undefined && message.policyVersion !== "") {
      obj.policyVersion = message.policyVersion;
    }
    if (message.policyUrl !== undefined && message.policyUrl !== "") {
      obj.policyUrl = message.policyUrl;
    }
    if (message.acceptedAt !== undefined) {
      obj.acceptedAt = message.acceptedAt.toISOString();
    }
    if (message.policyId !== undefined && message.policyId !== "") {
      obj.policyId = message.policyId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PolicyAcceptance>, I>>(base?: I): PolicyAcceptance {
    return PolicyAcceptance.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PolicyAcceptance>, I>>(object: I): PolicyAcceptance {
    const message = createBasePolicyAcceptance();
    message.policyName = object.policyName ?? "";
    message.policyVersion = object.policyVersion ?? "";
    message.policyUrl = object.policyUrl ?? "";
    message.acceptedAt = object.acceptedAt ?? undefined;
    message.policyId = object.policyId ?? "";
    return message;
  },
};

messageTypeRegistry.set(PolicyAcceptance.$type, PolicyAcceptance);

function createBaseOrgInfo(): OrgInfo {
  return { $type: "pb.v1alpha1.OrgInfo", orgResourceName: "", orgDisplayName: "", role: 0 };
}

export const OrgInfo = {
  $type: "pb.v1alpha1.OrgInfo" as const,

  encode(message: OrgInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(10).string(message.orgResourceName);
    }
    if (message.orgDisplayName !== undefined && message.orgDisplayName !== "") {
      writer.uint32(18).string(message.orgDisplayName);
    }
    if (message.role !== undefined && message.role !== 0) {
      writer.uint32(24).int32(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgInfo();
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
          if (tag !== 18) {
            break;
          }

          message.orgDisplayName = reader.string();
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

  fromJSON(object: any): OrgInfo {
    return {
      $type: OrgInfo.$type,
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      orgDisplayName: isSet(object.orgDisplayName) ? globalThis.String(object.orgDisplayName) : "",
      role: isSet(object.role) ? userOrgRoleFromJSON(object.role) : 0,
    };
  },

  toJSON(message: OrgInfo): unknown {
    const obj: any = {};
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.orgDisplayName !== undefined && message.orgDisplayName !== "") {
      obj.orgDisplayName = message.orgDisplayName;
    }
    if (message.role !== undefined && message.role !== 0) {
      obj.role = userOrgRoleToJSON(message.role);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OrgInfo>, I>>(base?: I): OrgInfo {
    return OrgInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OrgInfo>, I>>(object: I): OrgInfo {
    const message = createBaseOrgInfo();
    message.orgResourceName = object.orgResourceName ?? "";
    message.orgDisplayName = object.orgDisplayName ?? "";
    message.role = object.role ?? 0;
    return message;
  },
};

messageTypeRegistry.set(OrgInfo.$type, OrgInfo);

function createBaseMicrosoftUserInfo(): MicrosoftUserInfo {
  return { $type: "pb.v1alpha1.MicrosoftUserInfo", type: "", baseDriveUrl: "", scopes: [], email: "" };
}

export const MicrosoftUserInfo = {
  $type: "pb.v1alpha1.MicrosoftUserInfo" as const,

  encode(message: MicrosoftUserInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== undefined && message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.baseDriveUrl !== undefined && message.baseDriveUrl !== "") {
      writer.uint32(18).string(message.baseDriveUrl);
    }
    if (message.scopes !== undefined && message.scopes.length !== 0) {
      for (const v of message.scopes) {
        writer.uint32(26).string(v!);
      }
    }
    if (message.email !== undefined && message.email !== "") {
      writer.uint32(34).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MicrosoftUserInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMicrosoftUserInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.baseDriveUrl = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.scopes!.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): MicrosoftUserInfo {
    return {
      $type: MicrosoftUserInfo.$type,
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      baseDriveUrl: isSet(object.baseDriveUrl) ? globalThis.String(object.baseDriveUrl) : "",
      scopes: globalThis.Array.isArray(object?.scopes) ? object.scopes.map((e: any) => globalThis.String(e)) : [],
      email: isSet(object.email) ? globalThis.String(object.email) : "",
    };
  },

  toJSON(message: MicrosoftUserInfo): unknown {
    const obj: any = {};
    if (message.type !== undefined && message.type !== "") {
      obj.type = message.type;
    }
    if (message.baseDriveUrl !== undefined && message.baseDriveUrl !== "") {
      obj.baseDriveUrl = message.baseDriveUrl;
    }
    if (message.scopes?.length) {
      obj.scopes = message.scopes;
    }
    if (message.email !== undefined && message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MicrosoftUserInfo>, I>>(base?: I): MicrosoftUserInfo {
    return MicrosoftUserInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MicrosoftUserInfo>, I>>(object: I): MicrosoftUserInfo {
    const message = createBaseMicrosoftUserInfo();
    message.type = object.type ?? "";
    message.baseDriveUrl = object.baseDriveUrl ?? "";
    message.scopes = object.scopes?.map((e) => e) || [];
    message.email = object.email ?? "";
    return message;
  },
};

messageTypeRegistry.set(MicrosoftUserInfo.$type, MicrosoftUserInfo);

function createBaseGoogleUserInfo(): GoogleUserInfo {
  return { $type: "pb.v1alpha1.GoogleUserInfo", email: "" };
}

export const GoogleUserInfo = {
  $type: "pb.v1alpha1.GoogleUserInfo" as const,

  encode(message: GoogleUserInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== undefined && message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GoogleUserInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGoogleUserInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): GoogleUserInfo {
    return { $type: GoogleUserInfo.$type, email: isSet(object.email) ? globalThis.String(object.email) : "" };
  },

  toJSON(message: GoogleUserInfo): unknown {
    const obj: any = {};
    if (message.email !== undefined && message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GoogleUserInfo>, I>>(base?: I): GoogleUserInfo {
    return GoogleUserInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GoogleUserInfo>, I>>(object: I): GoogleUserInfo {
    const message = createBaseGoogleUserInfo();
    message.email = object.email ?? "";
    return message;
  },
};

messageTypeRegistry.set(GoogleUserInfo.$type, GoogleUserInfo);

function createBaseAnnouncement(): Announcement {
  return { $type: "pb.v1alpha1.Announcement", id: "", type: 0, header: undefined, contentBlocks: [] };
}

export const Announcement = {
  $type: "pb.v1alpha1.Announcement" as const,

  encode(message: Announcement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.header !== undefined) {
      AnnouncementContentMarkdown.encode(message.header, writer.uint32(26).fork()).ldelim();
    }
    if (message.contentBlocks !== undefined && message.contentBlocks.length !== 0) {
      for (const v of message.contentBlocks) {
        AnnouncementContentBlock.encode(v!, writer.uint32(34).fork()).ldelim();
      }
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
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.header = AnnouncementContentMarkdown.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.contentBlocks!.push(AnnouncementContentBlock.decode(reader, reader.uint32()));
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
      type: isSet(object.type) ? announcementTypeFromJSON(object.type) : 0,
      header: isSet(object.header) ? AnnouncementContentMarkdown.fromJSON(object.header) : undefined,
      contentBlocks: globalThis.Array.isArray(object?.contentBlocks)
        ? object.contentBlocks.map((e: any) => AnnouncementContentBlock.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Announcement): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
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
    return obj;
  },

  create<I extends Exact<DeepPartial<Announcement>, I>>(base?: I): Announcement {
    return Announcement.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Announcement>, I>>(object: I): Announcement {
    const message = createBaseAnnouncement();
    message.id = object.id ?? "";
    message.type = object.type ?? 0;
    message.header = (object.header !== undefined && object.header !== null)
      ? AnnouncementContentMarkdown.fromPartial(object.header)
      : undefined;
    message.contentBlocks = object.contentBlocks?.map((e) => AnnouncementContentBlock.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(Announcement.$type, Announcement);

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
