/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Email, EmailLabel, File, GmailLabel, Sheets } from "../automation_mining/ontology/data_models";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "application";

export interface GDriveParam {
  $type?: "application.GDriveParam";
  trigger?: GDriveParamTrigger | undefined;
  action?: GDriveParamAction | undefined;
}

export interface GDriveParamTrigger {
  $type?: "application.GDriveParam.Trigger";
  /** Cover GDrive folders and files. */
  file?: File | undefined;
  type?: GDriveParamTriggerTriggerType | undefined;
  ownerEmail?: string | undefined;
}

export enum GDriveParamTriggerTriggerType {
  UNSPECIFIED = 0,
  NEW_FILE = 1,
  UNRECOGNIZED = -1,
}

export function gDriveParamTriggerTriggerTypeFromJSON(object: any): GDriveParamTriggerTriggerType {
  switch (object) {
    case 0:
    case "TRIGGER_TYPE_UNSPECIFIED":
      return GDriveParamTriggerTriggerType.UNSPECIFIED;
    case 1:
    case "TRIGGER_TYPE_NEW_FILE":
      return GDriveParamTriggerTriggerType.NEW_FILE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GDriveParamTriggerTriggerType.UNRECOGNIZED;
  }
}

export function gDriveParamTriggerTriggerTypeToJSON(object: GDriveParamTriggerTriggerType): string {
  switch (object) {
    case GDriveParamTriggerTriggerType.UNSPECIFIED:
      return "TRIGGER_TYPE_UNSPECIFIED";
    case GDriveParamTriggerTriggerType.NEW_FILE:
      return "TRIGGER_TYPE_NEW_FILE";
    case GDriveParamTriggerTriggerType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GDriveParamAction {
  $type?: "application.GDriveParam.Action";
}

/** Do not use: For backward compatibility, will be removed once all logic is migrated to EmailParam. */
export interface GmailParam {
  $type?: "application.GmailParam";
  trigger?: GmailParamTrigger | undefined;
  action?: GmailParamAction | undefined;
}

export interface GmailParamTrigger {
  $type?: "application.GmailParam.Trigger";
  email?: Email | undefined;
  type?: GmailParamTriggerTriggerType | undefined;
  ownerEmail?:
    | string
    | undefined;
  /**
   * labels helps in watching on emails of particular kind.
   * If user wants to watch on all emails in an inbox, labels field needs to contain "inbox"
   */
  labels?: GmailLabel[] | undefined;
}

export enum GmailParamTriggerTriggerType {
  UNSPECIFIED = 0,
  NEW_EMAIL_BODY_ONLY = 1,
  NEW_EMAIL_ATTACHMENT_ONLY = 2,
  NEW_EMAIL_BODY_AND_ATTACHMENT = 3,
  UNRECOGNIZED = -1,
}

export function gmailParamTriggerTriggerTypeFromJSON(object: any): GmailParamTriggerTriggerType {
  switch (object) {
    case 0:
    case "TRIGGER_TYPE_UNSPECIFIED":
      return GmailParamTriggerTriggerType.UNSPECIFIED;
    case 1:
    case "TRIGGER_TYPE_NEW_EMAIL_BODY_ONLY":
      return GmailParamTriggerTriggerType.NEW_EMAIL_BODY_ONLY;
    case 2:
    case "TRIGGER_TYPE_NEW_EMAIL_ATTACHMENT_ONLY":
      return GmailParamTriggerTriggerType.NEW_EMAIL_ATTACHMENT_ONLY;
    case 3:
    case "TRIGGER_TYPE_NEW_EMAIL_BODY_AND_ATTACHMENT":
      return GmailParamTriggerTriggerType.NEW_EMAIL_BODY_AND_ATTACHMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GmailParamTriggerTriggerType.UNRECOGNIZED;
  }
}

export function gmailParamTriggerTriggerTypeToJSON(object: GmailParamTriggerTriggerType): string {
  switch (object) {
    case GmailParamTriggerTriggerType.UNSPECIFIED:
      return "TRIGGER_TYPE_UNSPECIFIED";
    case GmailParamTriggerTriggerType.NEW_EMAIL_BODY_ONLY:
      return "TRIGGER_TYPE_NEW_EMAIL_BODY_ONLY";
    case GmailParamTriggerTriggerType.NEW_EMAIL_ATTACHMENT_ONLY:
      return "TRIGGER_TYPE_NEW_EMAIL_ATTACHMENT_ONLY";
    case GmailParamTriggerTriggerType.NEW_EMAIL_BODY_AND_ATTACHMENT:
      return "TRIGGER_TYPE_NEW_EMAIL_BODY_AND_ATTACHMENT";
    case GmailParamTriggerTriggerType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GmailParamAction {
  $type?: "application.GmailParam.Action";
}

export interface EmailParam {
  $type?: "application.EmailParam";
  trigger?: EmailParamTrigger | undefined;
  action?: EmailParamAction | undefined;
}

export interface EmailParamTrigger {
  $type?: "application.EmailParam.Trigger";
  email?: Email | undefined;
  type?: EmailParamTriggerTriggerType | undefined;
  ownerEmail?:
    | string
    | undefined;
  /**
   * labels helps in watching on emails of particular kind.
   * If user wants to watch on all emails in an inbox, labels field needs to contain "inbox"
   */
  labels?: EmailLabel[] | undefined;
}

export enum EmailParamTriggerTriggerType {
  UNSPECIFIED = 0,
  NEW_EMAIL_BODY_ONLY = 1,
  NEW_EMAIL_ATTACHMENT_ONLY = 2,
  NEW_EMAIL_BODY_AND_ATTACHMENT = 3,
  UNRECOGNIZED = -1,
}

export function emailParamTriggerTriggerTypeFromJSON(object: any): EmailParamTriggerTriggerType {
  switch (object) {
    case 0:
    case "TRIGGER_TYPE_UNSPECIFIED":
      return EmailParamTriggerTriggerType.UNSPECIFIED;
    case 1:
    case "TRIGGER_TYPE_NEW_EMAIL_BODY_ONLY":
      return EmailParamTriggerTriggerType.NEW_EMAIL_BODY_ONLY;
    case 2:
    case "TRIGGER_TYPE_NEW_EMAIL_ATTACHMENT_ONLY":
      return EmailParamTriggerTriggerType.NEW_EMAIL_ATTACHMENT_ONLY;
    case 3:
    case "TRIGGER_TYPE_NEW_EMAIL_BODY_AND_ATTACHMENT":
      return EmailParamTriggerTriggerType.NEW_EMAIL_BODY_AND_ATTACHMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EmailParamTriggerTriggerType.UNRECOGNIZED;
  }
}

export function emailParamTriggerTriggerTypeToJSON(object: EmailParamTriggerTriggerType): string {
  switch (object) {
    case EmailParamTriggerTriggerType.UNSPECIFIED:
      return "TRIGGER_TYPE_UNSPECIFIED";
    case EmailParamTriggerTriggerType.NEW_EMAIL_BODY_ONLY:
      return "TRIGGER_TYPE_NEW_EMAIL_BODY_ONLY";
    case EmailParamTriggerTriggerType.NEW_EMAIL_ATTACHMENT_ONLY:
      return "TRIGGER_TYPE_NEW_EMAIL_ATTACHMENT_ONLY";
    case EmailParamTriggerTriggerType.NEW_EMAIL_BODY_AND_ATTACHMENT:
      return "TRIGGER_TYPE_NEW_EMAIL_BODY_AND_ATTACHMENT";
    case EmailParamTriggerTriggerType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface EmailParamAction {
  $type?: "application.EmailParam.Action";
}

export interface GSheetsParam {
  $type?: "application.GSheetsParam";
  trigger?: GSheetsParamTrigger | undefined;
  action?: GSheetsParamAction | undefined;
}

export interface GSheetsParamTrigger {
  $type?: "application.GSheetsParam.Trigger";
}

export interface GSheetsParamAction {
  $type?: "application.GSheetsParam.Action";
  sheets?: Sheets | undefined;
  type?: GSheetsParamActionActionType | undefined;
  addRowOption?: GSheetsParamActionAddRowOption | undefined;
}

export enum GSheetsParamActionActionType {
  UNSPECIFIED = 0,
  ADD_ROW = 1,
  UNRECOGNIZED = -1,
}

export function gSheetsParamActionActionTypeFromJSON(object: any): GSheetsParamActionActionType {
  switch (object) {
    case 0:
    case "ACTION_TYPE_UNSPECIFIED":
      return GSheetsParamActionActionType.UNSPECIFIED;
    case 1:
    case "ACTION_TYPE_ADD_ROW":
      return GSheetsParamActionActionType.ADD_ROW;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GSheetsParamActionActionType.UNRECOGNIZED;
  }
}

export function gSheetsParamActionActionTypeToJSON(object: GSheetsParamActionActionType): string {
  switch (object) {
    case GSheetsParamActionActionType.UNSPECIFIED:
      return "ACTION_TYPE_UNSPECIFIED";
    case GSheetsParamActionActionType.ADD_ROW:
      return "ACTION_TYPE_ADD_ROW";
    case GSheetsParamActionActionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GSheetsParamActionAddRowOption {
  $type?: "application.GSheetsParam.Action.AddRowOption";
  mappingColumns?:
    | string[]
    | undefined;
  /**
   * Moved this field to EntityExtractionParam
   *
   * @deprecated
   */
  exampleDocCount?: number | undefined;
}

/**
 * GSheetsParam will be deprecated in favor of
 * SpreadsheetParam in the future to have a more generic name
 * to support other spreadsheet applications
 */
export interface SpreadsheetParam {
  $type?: "application.SpreadsheetParam";
  trigger?: SpreadsheetParamTrigger | undefined;
  action?: SpreadsheetParamAction | undefined;
}

export interface SpreadsheetParamTrigger {
  $type?: "application.SpreadsheetParam.Trigger";
}

export interface SpreadsheetParamAction {
  $type?: "application.SpreadsheetParam.Action";
  sheets?: Sheets | undefined;
  type?: SpreadsheetParamActionActionType | undefined;
}

export enum SpreadsheetParamActionActionType {
  UNSPECIFIED = 0,
  ADD_ROW = 1,
  UNRECOGNIZED = -1,
}

export function spreadsheetParamActionActionTypeFromJSON(object: any): SpreadsheetParamActionActionType {
  switch (object) {
    case 0:
    case "ACTION_TYPE_UNSPECIFIED":
      return SpreadsheetParamActionActionType.UNSPECIFIED;
    case 1:
    case "ACTION_TYPE_ADD_ROW":
      return SpreadsheetParamActionActionType.ADD_ROW;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SpreadsheetParamActionActionType.UNRECOGNIZED;
  }
}

export function spreadsheetParamActionActionTypeToJSON(object: SpreadsheetParamActionActionType): string {
  switch (object) {
    case SpreadsheetParamActionActionType.UNSPECIFIED:
      return "ACTION_TYPE_UNSPECIFIED";
    case SpreadsheetParamActionActionType.ADD_ROW:
      return "ACTION_TYPE_ADD_ROW";
    case SpreadsheetParamActionActionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface SFTPParam {
  $type?: "application.SFTPParam";
  trigger?: SFTPParamTrigger | undefined;
  action?: SFTPParamAction | undefined;
}

export interface SFTPParamTrigger {
  $type?: "application.SFTPParam.Trigger";
  /**
   * trigger folder is where the client should put the files
   * The folder path will always be of the format <org_name>/<workflow_name>
   * This field is not editable by the user and is set by the FE and it should show
   * an instruction that the user should put file under the folder <workflow_name>
   * to start to create tasks.
   */
  folderPath?: string | undefined;
  type?: SFTPParamTriggerTriggerType | undefined;
}

export enum SFTPParamTriggerTriggerType {
  UNSPECIFIED = 0,
  NEW_OBJECT = 1,
  UNRECOGNIZED = -1,
}

export function sFTPParamTriggerTriggerTypeFromJSON(object: any): SFTPParamTriggerTriggerType {
  switch (object) {
    case 0:
    case "TRIGGER_TYPE_UNSPECIFIED":
      return SFTPParamTriggerTriggerType.UNSPECIFIED;
    case 1:
    case "TRIGGER_TYPE_NEW_OBJECT":
      return SFTPParamTriggerTriggerType.NEW_OBJECT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SFTPParamTriggerTriggerType.UNRECOGNIZED;
  }
}

export function sFTPParamTriggerTriggerTypeToJSON(object: SFTPParamTriggerTriggerType): string {
  switch (object) {
    case SFTPParamTriggerTriggerType.UNSPECIFIED:
      return "TRIGGER_TYPE_UNSPECIFIED";
    case SFTPParamTriggerTriggerType.NEW_OBJECT:
      return "TRIGGER_TYPE_NEW_OBJECT";
    case SFTPParamTriggerTriggerType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface SFTPParamAction {
  $type?: "application.SFTPParam.Action";
}

function createBaseGDriveParam(): GDriveParam {
  return { $type: "application.GDriveParam", trigger: undefined, action: undefined };
}

export const GDriveParam = {
  $type: "application.GDriveParam" as const,

  encode(message: GDriveParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.trigger !== undefined) {
      GDriveParamTrigger.encode(message.trigger, writer.uint32(10).fork()).ldelim();
    }
    if (message.action !== undefined) {
      GDriveParamAction.encode(message.action, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GDriveParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGDriveParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.trigger = GDriveParamTrigger.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.action = GDriveParamAction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GDriveParam {
    return {
      $type: GDriveParam.$type,
      trigger: isSet(object.trigger) ? GDriveParamTrigger.fromJSON(object.trigger) : undefined,
      action: isSet(object.action) ? GDriveParamAction.fromJSON(object.action) : undefined,
    };
  },

  toJSON(message: GDriveParam): unknown {
    const obj: any = {};
    if (message.trigger !== undefined) {
      obj.trigger = GDriveParamTrigger.toJSON(message.trigger);
    }
    if (message.action !== undefined) {
      obj.action = GDriveParamAction.toJSON(message.action);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GDriveParam>, I>>(base?: I): GDriveParam {
    return GDriveParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GDriveParam>, I>>(object: I): GDriveParam {
    const message = createBaseGDriveParam();
    message.trigger = (object.trigger !== undefined && object.trigger !== null)
      ? GDriveParamTrigger.fromPartial(object.trigger)
      : undefined;
    message.action = (object.action !== undefined && object.action !== null)
      ? GDriveParamAction.fromPartial(object.action)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GDriveParam.$type, GDriveParam);

function createBaseGDriveParamTrigger(): GDriveParamTrigger {
  return { $type: "application.GDriveParam.Trigger", file: undefined, type: 0, ownerEmail: "" };
}

export const GDriveParamTrigger = {
  $type: "application.GDriveParam.Trigger" as const,

  encode(message: GDriveParamTrigger, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.file !== undefined) {
      File.encode(message.file, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.ownerEmail !== undefined && message.ownerEmail !== "") {
      writer.uint32(26).string(message.ownerEmail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GDriveParamTrigger {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGDriveParamTrigger();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.file = File.decode(reader, reader.uint32());
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

          message.ownerEmail = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GDriveParamTrigger {
    return {
      $type: GDriveParamTrigger.$type,
      file: isSet(object.file) ? File.fromJSON(object.file) : undefined,
      type: isSet(object.type) ? gDriveParamTriggerTriggerTypeFromJSON(object.type) : 0,
      ownerEmail: isSet(object.ownerEmail) ? globalThis.String(object.ownerEmail) : "",
    };
  },

  toJSON(message: GDriveParamTrigger): unknown {
    const obj: any = {};
    if (message.file !== undefined) {
      obj.file = File.toJSON(message.file);
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = gDriveParamTriggerTriggerTypeToJSON(message.type);
    }
    if (message.ownerEmail !== undefined && message.ownerEmail !== "") {
      obj.ownerEmail = message.ownerEmail;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GDriveParamTrigger>, I>>(base?: I): GDriveParamTrigger {
    return GDriveParamTrigger.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GDriveParamTrigger>, I>>(object: I): GDriveParamTrigger {
    const message = createBaseGDriveParamTrigger();
    message.file = (object.file !== undefined && object.file !== null) ? File.fromPartial(object.file) : undefined;
    message.type = object.type ?? 0;
    message.ownerEmail = object.ownerEmail ?? "";
    return message;
  },
};

messageTypeRegistry.set(GDriveParamTrigger.$type, GDriveParamTrigger);

function createBaseGDriveParamAction(): GDriveParamAction {
  return { $type: "application.GDriveParam.Action" };
}

export const GDriveParamAction = {
  $type: "application.GDriveParam.Action" as const,

  encode(_: GDriveParamAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GDriveParamAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGDriveParamAction();
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

  fromJSON(_: any): GDriveParamAction {
    return { $type: GDriveParamAction.$type };
  },

  toJSON(_: GDriveParamAction): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GDriveParamAction>, I>>(base?: I): GDriveParamAction {
    return GDriveParamAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GDriveParamAction>, I>>(_: I): GDriveParamAction {
    const message = createBaseGDriveParamAction();
    return message;
  },
};

messageTypeRegistry.set(GDriveParamAction.$type, GDriveParamAction);

function createBaseGmailParam(): GmailParam {
  return { $type: "application.GmailParam", trigger: undefined, action: undefined };
}

export const GmailParam = {
  $type: "application.GmailParam" as const,

  encode(message: GmailParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.trigger !== undefined) {
      GmailParamTrigger.encode(message.trigger, writer.uint32(10).fork()).ldelim();
    }
    if (message.action !== undefined) {
      GmailParamAction.encode(message.action, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GmailParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGmailParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.trigger = GmailParamTrigger.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.action = GmailParamAction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GmailParam {
    return {
      $type: GmailParam.$type,
      trigger: isSet(object.trigger) ? GmailParamTrigger.fromJSON(object.trigger) : undefined,
      action: isSet(object.action) ? GmailParamAction.fromJSON(object.action) : undefined,
    };
  },

  toJSON(message: GmailParam): unknown {
    const obj: any = {};
    if (message.trigger !== undefined) {
      obj.trigger = GmailParamTrigger.toJSON(message.trigger);
    }
    if (message.action !== undefined) {
      obj.action = GmailParamAction.toJSON(message.action);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GmailParam>, I>>(base?: I): GmailParam {
    return GmailParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GmailParam>, I>>(object: I): GmailParam {
    const message = createBaseGmailParam();
    message.trigger = (object.trigger !== undefined && object.trigger !== null)
      ? GmailParamTrigger.fromPartial(object.trigger)
      : undefined;
    message.action = (object.action !== undefined && object.action !== null)
      ? GmailParamAction.fromPartial(object.action)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GmailParam.$type, GmailParam);

function createBaseGmailParamTrigger(): GmailParamTrigger {
  return { $type: "application.GmailParam.Trigger", email: undefined, type: 0, ownerEmail: "", labels: [] };
}

export const GmailParamTrigger = {
  $type: "application.GmailParam.Trigger" as const,

  encode(message: GmailParamTrigger, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== undefined) {
      Email.encode(message.email, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.ownerEmail !== undefined && message.ownerEmail !== "") {
      writer.uint32(26).string(message.ownerEmail);
    }
    if (message.labels !== undefined && message.labels.length !== 0) {
      for (const v of message.labels) {
        GmailLabel.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GmailParamTrigger {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGmailParamTrigger();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = Email.decode(reader, reader.uint32());
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

          message.ownerEmail = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): GmailParamTrigger {
    return {
      $type: GmailParamTrigger.$type,
      email: isSet(object.email) ? Email.fromJSON(object.email) : undefined,
      type: isSet(object.type) ? gmailParamTriggerTriggerTypeFromJSON(object.type) : 0,
      ownerEmail: isSet(object.ownerEmail) ? globalThis.String(object.ownerEmail) : "",
      labels: globalThis.Array.isArray(object?.labels) ? object.labels.map((e: any) => GmailLabel.fromJSON(e)) : [],
    };
  },

  toJSON(message: GmailParamTrigger): unknown {
    const obj: any = {};
    if (message.email !== undefined) {
      obj.email = Email.toJSON(message.email);
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = gmailParamTriggerTriggerTypeToJSON(message.type);
    }
    if (message.ownerEmail !== undefined && message.ownerEmail !== "") {
      obj.ownerEmail = message.ownerEmail;
    }
    if (message.labels?.length) {
      obj.labels = message.labels.map((e) => GmailLabel.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GmailParamTrigger>, I>>(base?: I): GmailParamTrigger {
    return GmailParamTrigger.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GmailParamTrigger>, I>>(object: I): GmailParamTrigger {
    const message = createBaseGmailParamTrigger();
    message.email = (object.email !== undefined && object.email !== null) ? Email.fromPartial(object.email) : undefined;
    message.type = object.type ?? 0;
    message.ownerEmail = object.ownerEmail ?? "";
    message.labels = object.labels?.map((e) => GmailLabel.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GmailParamTrigger.$type, GmailParamTrigger);

function createBaseGmailParamAction(): GmailParamAction {
  return { $type: "application.GmailParam.Action" };
}

export const GmailParamAction = {
  $type: "application.GmailParam.Action" as const,

  encode(_: GmailParamAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GmailParamAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGmailParamAction();
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

  fromJSON(_: any): GmailParamAction {
    return { $type: GmailParamAction.$type };
  },

  toJSON(_: GmailParamAction): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GmailParamAction>, I>>(base?: I): GmailParamAction {
    return GmailParamAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GmailParamAction>, I>>(_: I): GmailParamAction {
    const message = createBaseGmailParamAction();
    return message;
  },
};

messageTypeRegistry.set(GmailParamAction.$type, GmailParamAction);

function createBaseEmailParam(): EmailParam {
  return { $type: "application.EmailParam", trigger: undefined, action: undefined };
}

export const EmailParam = {
  $type: "application.EmailParam" as const,

  encode(message: EmailParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.trigger !== undefined) {
      EmailParamTrigger.encode(message.trigger, writer.uint32(10).fork()).ldelim();
    }
    if (message.action !== undefined) {
      EmailParamAction.encode(message.action, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmailParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmailParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.trigger = EmailParamTrigger.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.action = EmailParamAction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EmailParam {
    return {
      $type: EmailParam.$type,
      trigger: isSet(object.trigger) ? EmailParamTrigger.fromJSON(object.trigger) : undefined,
      action: isSet(object.action) ? EmailParamAction.fromJSON(object.action) : undefined,
    };
  },

  toJSON(message: EmailParam): unknown {
    const obj: any = {};
    if (message.trigger !== undefined) {
      obj.trigger = EmailParamTrigger.toJSON(message.trigger);
    }
    if (message.action !== undefined) {
      obj.action = EmailParamAction.toJSON(message.action);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EmailParam>, I>>(base?: I): EmailParam {
    return EmailParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EmailParam>, I>>(object: I): EmailParam {
    const message = createBaseEmailParam();
    message.trigger = (object.trigger !== undefined && object.trigger !== null)
      ? EmailParamTrigger.fromPartial(object.trigger)
      : undefined;
    message.action = (object.action !== undefined && object.action !== null)
      ? EmailParamAction.fromPartial(object.action)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(EmailParam.$type, EmailParam);

function createBaseEmailParamTrigger(): EmailParamTrigger {
  return { $type: "application.EmailParam.Trigger", email: undefined, type: 0, ownerEmail: "", labels: [] };
}

export const EmailParamTrigger = {
  $type: "application.EmailParam.Trigger" as const,

  encode(message: EmailParamTrigger, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== undefined) {
      Email.encode(message.email, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.ownerEmail !== undefined && message.ownerEmail !== "") {
      writer.uint32(26).string(message.ownerEmail);
    }
    if (message.labels !== undefined && message.labels.length !== 0) {
      for (const v of message.labels) {
        EmailLabel.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmailParamTrigger {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmailParamTrigger();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = Email.decode(reader, reader.uint32());
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

          message.ownerEmail = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): EmailParamTrigger {
    return {
      $type: EmailParamTrigger.$type,
      email: isSet(object.email) ? Email.fromJSON(object.email) : undefined,
      type: isSet(object.type) ? emailParamTriggerTriggerTypeFromJSON(object.type) : 0,
      ownerEmail: isSet(object.ownerEmail) ? globalThis.String(object.ownerEmail) : "",
      labels: globalThis.Array.isArray(object?.labels) ? object.labels.map((e: any) => EmailLabel.fromJSON(e)) : [],
    };
  },

  toJSON(message: EmailParamTrigger): unknown {
    const obj: any = {};
    if (message.email !== undefined) {
      obj.email = Email.toJSON(message.email);
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = emailParamTriggerTriggerTypeToJSON(message.type);
    }
    if (message.ownerEmail !== undefined && message.ownerEmail !== "") {
      obj.ownerEmail = message.ownerEmail;
    }
    if (message.labels?.length) {
      obj.labels = message.labels.map((e) => EmailLabel.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EmailParamTrigger>, I>>(base?: I): EmailParamTrigger {
    return EmailParamTrigger.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EmailParamTrigger>, I>>(object: I): EmailParamTrigger {
    const message = createBaseEmailParamTrigger();
    message.email = (object.email !== undefined && object.email !== null) ? Email.fromPartial(object.email) : undefined;
    message.type = object.type ?? 0;
    message.ownerEmail = object.ownerEmail ?? "";
    message.labels = object.labels?.map((e) => EmailLabel.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(EmailParamTrigger.$type, EmailParamTrigger);

function createBaseEmailParamAction(): EmailParamAction {
  return { $type: "application.EmailParam.Action" };
}

export const EmailParamAction = {
  $type: "application.EmailParam.Action" as const,

  encode(_: EmailParamAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmailParamAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmailParamAction();
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

  fromJSON(_: any): EmailParamAction {
    return { $type: EmailParamAction.$type };
  },

  toJSON(_: EmailParamAction): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<EmailParamAction>, I>>(base?: I): EmailParamAction {
    return EmailParamAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EmailParamAction>, I>>(_: I): EmailParamAction {
    const message = createBaseEmailParamAction();
    return message;
  },
};

messageTypeRegistry.set(EmailParamAction.$type, EmailParamAction);

function createBaseGSheetsParam(): GSheetsParam {
  return { $type: "application.GSheetsParam", trigger: undefined, action: undefined };
}

export const GSheetsParam = {
  $type: "application.GSheetsParam" as const,

  encode(message: GSheetsParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.trigger !== undefined) {
      GSheetsParamTrigger.encode(message.trigger, writer.uint32(10).fork()).ldelim();
    }
    if (message.action !== undefined) {
      GSheetsParamAction.encode(message.action, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GSheetsParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGSheetsParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.trigger = GSheetsParamTrigger.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.action = GSheetsParamAction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GSheetsParam {
    return {
      $type: GSheetsParam.$type,
      trigger: isSet(object.trigger) ? GSheetsParamTrigger.fromJSON(object.trigger) : undefined,
      action: isSet(object.action) ? GSheetsParamAction.fromJSON(object.action) : undefined,
    };
  },

  toJSON(message: GSheetsParam): unknown {
    const obj: any = {};
    if (message.trigger !== undefined) {
      obj.trigger = GSheetsParamTrigger.toJSON(message.trigger);
    }
    if (message.action !== undefined) {
      obj.action = GSheetsParamAction.toJSON(message.action);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GSheetsParam>, I>>(base?: I): GSheetsParam {
    return GSheetsParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GSheetsParam>, I>>(object: I): GSheetsParam {
    const message = createBaseGSheetsParam();
    message.trigger = (object.trigger !== undefined && object.trigger !== null)
      ? GSheetsParamTrigger.fromPartial(object.trigger)
      : undefined;
    message.action = (object.action !== undefined && object.action !== null)
      ? GSheetsParamAction.fromPartial(object.action)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GSheetsParam.$type, GSheetsParam);

function createBaseGSheetsParamTrigger(): GSheetsParamTrigger {
  return { $type: "application.GSheetsParam.Trigger" };
}

export const GSheetsParamTrigger = {
  $type: "application.GSheetsParam.Trigger" as const,

  encode(_: GSheetsParamTrigger, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GSheetsParamTrigger {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGSheetsParamTrigger();
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

  fromJSON(_: any): GSheetsParamTrigger {
    return { $type: GSheetsParamTrigger.$type };
  },

  toJSON(_: GSheetsParamTrigger): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GSheetsParamTrigger>, I>>(base?: I): GSheetsParamTrigger {
    return GSheetsParamTrigger.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GSheetsParamTrigger>, I>>(_: I): GSheetsParamTrigger {
    const message = createBaseGSheetsParamTrigger();
    return message;
  },
};

messageTypeRegistry.set(GSheetsParamTrigger.$type, GSheetsParamTrigger);

function createBaseGSheetsParamAction(): GSheetsParamAction {
  return { $type: "application.GSheetsParam.Action", sheets: undefined, type: 0, addRowOption: undefined };
}

export const GSheetsParamAction = {
  $type: "application.GSheetsParam.Action" as const,

  encode(message: GSheetsParamAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sheets !== undefined) {
      Sheets.encode(message.sheets, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.addRowOption !== undefined) {
      GSheetsParamActionAddRowOption.encode(message.addRowOption, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GSheetsParamAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGSheetsParamAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sheets = Sheets.decode(reader, reader.uint32());
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

          message.addRowOption = GSheetsParamActionAddRowOption.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GSheetsParamAction {
    return {
      $type: GSheetsParamAction.$type,
      sheets: isSet(object.sheets) ? Sheets.fromJSON(object.sheets) : undefined,
      type: isSet(object.type) ? gSheetsParamActionActionTypeFromJSON(object.type) : 0,
      addRowOption: isSet(object.addRowOption)
        ? GSheetsParamActionAddRowOption.fromJSON(object.addRowOption)
        : undefined,
    };
  },

  toJSON(message: GSheetsParamAction): unknown {
    const obj: any = {};
    if (message.sheets !== undefined) {
      obj.sheets = Sheets.toJSON(message.sheets);
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = gSheetsParamActionActionTypeToJSON(message.type);
    }
    if (message.addRowOption !== undefined) {
      obj.addRowOption = GSheetsParamActionAddRowOption.toJSON(message.addRowOption);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GSheetsParamAction>, I>>(base?: I): GSheetsParamAction {
    return GSheetsParamAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GSheetsParamAction>, I>>(object: I): GSheetsParamAction {
    const message = createBaseGSheetsParamAction();
    message.sheets = (object.sheets !== undefined && object.sheets !== null)
      ? Sheets.fromPartial(object.sheets)
      : undefined;
    message.type = object.type ?? 0;
    message.addRowOption = (object.addRowOption !== undefined && object.addRowOption !== null)
      ? GSheetsParamActionAddRowOption.fromPartial(object.addRowOption)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GSheetsParamAction.$type, GSheetsParamAction);

function createBaseGSheetsParamActionAddRowOption(): GSheetsParamActionAddRowOption {
  return { $type: "application.GSheetsParam.Action.AddRowOption", mappingColumns: [], exampleDocCount: 0 };
}

export const GSheetsParamActionAddRowOption = {
  $type: "application.GSheetsParam.Action.AddRowOption" as const,

  encode(message: GSheetsParamActionAddRowOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mappingColumns !== undefined && message.mappingColumns.length !== 0) {
      for (const v of message.mappingColumns) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.exampleDocCount !== undefined && message.exampleDocCount !== 0) {
      writer.uint32(16).int32(message.exampleDocCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GSheetsParamActionAddRowOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGSheetsParamActionAddRowOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.mappingColumns!.push(reader.string());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.exampleDocCount = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GSheetsParamActionAddRowOption {
    return {
      $type: GSheetsParamActionAddRowOption.$type,
      mappingColumns: globalThis.Array.isArray(object?.mappingColumns)
        ? object.mappingColumns.map((e: any) => globalThis.String(e))
        : [],
      exampleDocCount: isSet(object.exampleDocCount) ? globalThis.Number(object.exampleDocCount) : 0,
    };
  },

  toJSON(message: GSheetsParamActionAddRowOption): unknown {
    const obj: any = {};
    if (message.mappingColumns?.length) {
      obj.mappingColumns = message.mappingColumns;
    }
    if (message.exampleDocCount !== undefined && message.exampleDocCount !== 0) {
      obj.exampleDocCount = Math.round(message.exampleDocCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GSheetsParamActionAddRowOption>, I>>(base?: I): GSheetsParamActionAddRowOption {
    return GSheetsParamActionAddRowOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GSheetsParamActionAddRowOption>, I>>(
    object: I,
  ): GSheetsParamActionAddRowOption {
    const message = createBaseGSheetsParamActionAddRowOption();
    message.mappingColumns = object.mappingColumns?.map((e) => e) || [];
    message.exampleDocCount = object.exampleDocCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(GSheetsParamActionAddRowOption.$type, GSheetsParamActionAddRowOption);

function createBaseSpreadsheetParam(): SpreadsheetParam {
  return { $type: "application.SpreadsheetParam", trigger: undefined, action: undefined };
}

export const SpreadsheetParam = {
  $type: "application.SpreadsheetParam" as const,

  encode(message: SpreadsheetParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.trigger !== undefined) {
      SpreadsheetParamTrigger.encode(message.trigger, writer.uint32(10).fork()).ldelim();
    }
    if (message.action !== undefined) {
      SpreadsheetParamAction.encode(message.action, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpreadsheetParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpreadsheetParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.trigger = SpreadsheetParamTrigger.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.action = SpreadsheetParamAction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SpreadsheetParam {
    return {
      $type: SpreadsheetParam.$type,
      trigger: isSet(object.trigger) ? SpreadsheetParamTrigger.fromJSON(object.trigger) : undefined,
      action: isSet(object.action) ? SpreadsheetParamAction.fromJSON(object.action) : undefined,
    };
  },

  toJSON(message: SpreadsheetParam): unknown {
    const obj: any = {};
    if (message.trigger !== undefined) {
      obj.trigger = SpreadsheetParamTrigger.toJSON(message.trigger);
    }
    if (message.action !== undefined) {
      obj.action = SpreadsheetParamAction.toJSON(message.action);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SpreadsheetParam>, I>>(base?: I): SpreadsheetParam {
    return SpreadsheetParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SpreadsheetParam>, I>>(object: I): SpreadsheetParam {
    const message = createBaseSpreadsheetParam();
    message.trigger = (object.trigger !== undefined && object.trigger !== null)
      ? SpreadsheetParamTrigger.fromPartial(object.trigger)
      : undefined;
    message.action = (object.action !== undefined && object.action !== null)
      ? SpreadsheetParamAction.fromPartial(object.action)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SpreadsheetParam.$type, SpreadsheetParam);

function createBaseSpreadsheetParamTrigger(): SpreadsheetParamTrigger {
  return { $type: "application.SpreadsheetParam.Trigger" };
}

export const SpreadsheetParamTrigger = {
  $type: "application.SpreadsheetParam.Trigger" as const,

  encode(_: SpreadsheetParamTrigger, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpreadsheetParamTrigger {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpreadsheetParamTrigger();
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

  fromJSON(_: any): SpreadsheetParamTrigger {
    return { $type: SpreadsheetParamTrigger.$type };
  },

  toJSON(_: SpreadsheetParamTrigger): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SpreadsheetParamTrigger>, I>>(base?: I): SpreadsheetParamTrigger {
    return SpreadsheetParamTrigger.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SpreadsheetParamTrigger>, I>>(_: I): SpreadsheetParamTrigger {
    const message = createBaseSpreadsheetParamTrigger();
    return message;
  },
};

messageTypeRegistry.set(SpreadsheetParamTrigger.$type, SpreadsheetParamTrigger);

function createBaseSpreadsheetParamAction(): SpreadsheetParamAction {
  return { $type: "application.SpreadsheetParam.Action", sheets: undefined, type: 0 };
}

export const SpreadsheetParamAction = {
  $type: "application.SpreadsheetParam.Action" as const,

  encode(message: SpreadsheetParamAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sheets !== undefined) {
      Sheets.encode(message.sheets, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpreadsheetParamAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpreadsheetParamAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sheets = Sheets.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SpreadsheetParamAction {
    return {
      $type: SpreadsheetParamAction.$type,
      sheets: isSet(object.sheets) ? Sheets.fromJSON(object.sheets) : undefined,
      type: isSet(object.type) ? spreadsheetParamActionActionTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: SpreadsheetParamAction): unknown {
    const obj: any = {};
    if (message.sheets !== undefined) {
      obj.sheets = Sheets.toJSON(message.sheets);
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = spreadsheetParamActionActionTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SpreadsheetParamAction>, I>>(base?: I): SpreadsheetParamAction {
    return SpreadsheetParamAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SpreadsheetParamAction>, I>>(object: I): SpreadsheetParamAction {
    const message = createBaseSpreadsheetParamAction();
    message.sheets = (object.sheets !== undefined && object.sheets !== null)
      ? Sheets.fromPartial(object.sheets)
      : undefined;
    message.type = object.type ?? 0;
    return message;
  },
};

messageTypeRegistry.set(SpreadsheetParamAction.$type, SpreadsheetParamAction);

function createBaseSFTPParam(): SFTPParam {
  return { $type: "application.SFTPParam", trigger: undefined, action: undefined };
}

export const SFTPParam = {
  $type: "application.SFTPParam" as const,

  encode(message: SFTPParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.trigger !== undefined) {
      SFTPParamTrigger.encode(message.trigger, writer.uint32(10).fork()).ldelim();
    }
    if (message.action !== undefined) {
      SFTPParamAction.encode(message.action, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SFTPParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSFTPParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.trigger = SFTPParamTrigger.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.action = SFTPParamAction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SFTPParam {
    return {
      $type: SFTPParam.$type,
      trigger: isSet(object.trigger) ? SFTPParamTrigger.fromJSON(object.trigger) : undefined,
      action: isSet(object.action) ? SFTPParamAction.fromJSON(object.action) : undefined,
    };
  },

  toJSON(message: SFTPParam): unknown {
    const obj: any = {};
    if (message.trigger !== undefined) {
      obj.trigger = SFTPParamTrigger.toJSON(message.trigger);
    }
    if (message.action !== undefined) {
      obj.action = SFTPParamAction.toJSON(message.action);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SFTPParam>, I>>(base?: I): SFTPParam {
    return SFTPParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SFTPParam>, I>>(object: I): SFTPParam {
    const message = createBaseSFTPParam();
    message.trigger = (object.trigger !== undefined && object.trigger !== null)
      ? SFTPParamTrigger.fromPartial(object.trigger)
      : undefined;
    message.action = (object.action !== undefined && object.action !== null)
      ? SFTPParamAction.fromPartial(object.action)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SFTPParam.$type, SFTPParam);

function createBaseSFTPParamTrigger(): SFTPParamTrigger {
  return { $type: "application.SFTPParam.Trigger", folderPath: "", type: 0 };
}

export const SFTPParamTrigger = {
  $type: "application.SFTPParam.Trigger" as const,

  encode(message: SFTPParamTrigger, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.folderPath !== undefined && message.folderPath !== "") {
      writer.uint32(10).string(message.folderPath);
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SFTPParamTrigger {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSFTPParamTrigger();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.folderPath = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SFTPParamTrigger {
    return {
      $type: SFTPParamTrigger.$type,
      folderPath: isSet(object.folderPath) ? globalThis.String(object.folderPath) : "",
      type: isSet(object.type) ? sFTPParamTriggerTriggerTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: SFTPParamTrigger): unknown {
    const obj: any = {};
    if (message.folderPath !== undefined && message.folderPath !== "") {
      obj.folderPath = message.folderPath;
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = sFTPParamTriggerTriggerTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SFTPParamTrigger>, I>>(base?: I): SFTPParamTrigger {
    return SFTPParamTrigger.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SFTPParamTrigger>, I>>(object: I): SFTPParamTrigger {
    const message = createBaseSFTPParamTrigger();
    message.folderPath = object.folderPath ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

messageTypeRegistry.set(SFTPParamTrigger.$type, SFTPParamTrigger);

function createBaseSFTPParamAction(): SFTPParamAction {
  return { $type: "application.SFTPParam.Action" };
}

export const SFTPParamAction = {
  $type: "application.SFTPParam.Action" as const,

  encode(_: SFTPParamAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SFTPParamAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSFTPParamAction();
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

  fromJSON(_: any): SFTPParamAction {
    return { $type: SFTPParamAction.$type };
  },

  toJSON(_: SFTPParamAction): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SFTPParamAction>, I>>(base?: I): SFTPParamAction {
    return SFTPParamAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SFTPParamAction>, I>>(_: I): SFTPParamAction {
    const message = createBaseSFTPParamAction();
    return message;
  },
};

messageTypeRegistry.set(SFTPParamAction.$type, SFTPParamAction);

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
