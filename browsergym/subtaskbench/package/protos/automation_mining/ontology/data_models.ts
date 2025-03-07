/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../../google/protobuf/any";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "automation_mining.ontology";

/**
 * Data model for emails.
 * Supported applications: gmail, outlook
 */
export interface Email {
  $type?: "automation_mining.ontology.Email";
  threadId?: string | undefined;
  subject?: string | undefined;
  messageId?: string | undefined;
  from?: string | undefined;
  to?: string | undefined;
  body?: string | undefined;
  attachments?:
    | EmailAttachment[]
    | undefined;
  /** id for communicating with gmail API. */
  apiMessageId?: string | undefined;
  date?: Date | undefined;
}

export interface EmailAttachment {
  $type?: "automation_mining.ontology.EmailAttachment";
  /** These are the part ids returned by the gmail api to map with the CE responses */
  id?: string | undefined;
  url?: string | undefined;
  content?: Uint8Array | undefined;
  mimeType?: string | undefined;
  fileName?:
    | string
    | undefined;
  /** cids are used in src attribute inside html email body, to load attachment content */
  cid?: string | undefined;
}

/**
 * Data model for files and folders
 * Supported applications: Google Doc
 */
export interface File {
  $type?: "automation_mining.ontology.File";
  id?:
    | string
    | undefined;
  /** E.g. Google driver urls for files or folders */
  path?: string | undefined;
  name?: string | undefined;
  textContent?: string | undefined;
  byteContent?: Uint8Array | undefined;
  mimeType?: string | undefined;
  isFolder?: boolean | undefined;
}

/**
 * Data model for excel sheets
 * Supported applications: Google Sheets
 */
export interface Sheets {
  $type?: "automation_mining.ontology.Sheets";
  id?: string | undefined;
  name?: string | undefined;
  folder?: File | undefined;
  sheets?:
    | SheetsSheet[]
    | undefined;
  /** E.g. Google sheets url */
  path?: string | undefined;
}

export interface SheetsSheet {
  $type?: "automation_mining.ontology.Sheets.Sheet";
  id?: string | undefined;
  name?: string | undefined;
  cells?:
    | { [key: string]: SheetsSheetCell }
    | undefined;
  /**
   * This stores the additional metadata for Sheet.
   *
   * The folling keys are supported in the metadata: entity_name
   *
   * The entity name is either simple or <parent_name>_nested.
   * The reason why we used _nested is to differentiate between the
   * non-nested entity and nested entity incase the nested entity also
   * is 'simple'
   */
  metadata?: { [key: string]: Any } | undefined;
}

export interface SheetsSheetCell {
  $type?: "automation_mining.ontology.Sheets.Sheet.Cell";
  value?: string | undefined;
}

export interface SheetsSheetCellsEntry {
  $type?: "automation_mining.ontology.Sheets.Sheet.CellsEntry";
  key: string;
  value?: SheetsSheetCell | undefined;
}

export interface SheetsSheetMetadataEntry {
  $type?: "automation_mining.ontology.Sheets.Sheet.MetadataEntry";
  key: string;
  value?: Any | undefined;
}

/**
 * Data model for invoices
 * Supported applications: tbd
 */
export interface Invoice {
  $type?: "automation_mining.ontology.Invoice";
  id?: string | undefined;
  totalAmount?: string | undefined;
}

/**
 * Data model for purchase orders
 * Supported applications: tbd
 */
export interface PurchaseOrder {
  $type?: "automation_mining.ontology.PurchaseOrder";
  id?: string | undefined;
  totalAmount?: string | undefined;
}

/**
 * Data model for receipts.
 * Supported applications: tbd
 */
export interface Receipt {
  $type?: "automation_mining.ontology.Receipt";
  id?: string | undefined;
  totalAmount?: string | undefined;
}

/**
 * Data model for gmail label
 * Do not use: For backward compatibility, will be removed once all logic is migrated to EmailLabel.
 */
export interface GmailLabel {
  $type?: "automation_mining.ontology.GmailLabel";
  id?: string | undefined;
  name?: string | undefined;
  color?: GmailLabelColor | undefined;
}

export interface GmailLabelColor {
  $type?: "automation_mining.ontology.GmailLabel.Color";
  backgroundColor?: string | undefined;
  textColor?: string | undefined;
}

/** Data model for email label */
export interface EmailLabel {
  $type?: "automation_mining.ontology.EmailLabel";
  id?: string | undefined;
  name?: string | undefined;
  color?: EmailLabelColor | undefined;
}

export interface EmailLabelColor {
  $type?: "automation_mining.ontology.EmailLabel.Color";
  backgroundColor?: string | undefined;
  textColor?: string | undefined;
}

function createBaseEmail(): Email {
  return {
    $type: "automation_mining.ontology.Email",
    threadId: "",
    subject: "",
    messageId: "",
    from: "",
    to: "",
    body: "",
    attachments: [],
    apiMessageId: "",
    date: undefined,
  };
}

export const Email = {
  $type: "automation_mining.ontology.Email" as const,

  encode(message: Email, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.threadId !== undefined && message.threadId !== "") {
      writer.uint32(10).string(message.threadId);
    }
    if (message.subject !== undefined && message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.messageId !== undefined && message.messageId !== "") {
      writer.uint32(26).string(message.messageId);
    }
    if (message.from !== undefined && message.from !== "") {
      writer.uint32(34).string(message.from);
    }
    if (message.to !== undefined && message.to !== "") {
      writer.uint32(42).string(message.to);
    }
    if (message.body !== undefined && message.body !== "") {
      writer.uint32(50).string(message.body);
    }
    if (message.attachments !== undefined && message.attachments.length !== 0) {
      for (const v of message.attachments) {
        EmailAttachment.encode(v!, writer.uint32(58).fork()).ldelim();
      }
    }
    if (message.apiMessageId !== undefined && message.apiMessageId !== "") {
      writer.uint32(74).string(message.apiMessageId);
    }
    if (message.date !== undefined) {
      Timestamp.encode(toTimestamp(message.date), writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Email {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmail();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.threadId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.messageId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.from = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.to = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.body = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.attachments!.push(EmailAttachment.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.apiMessageId = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.date = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Email {
    return {
      $type: Email.$type,
      threadId: isSet(object.threadId) ? globalThis.String(object.threadId) : "",
      subject: isSet(object.subject) ? globalThis.String(object.subject) : "",
      messageId: isSet(object.messageId) ? globalThis.String(object.messageId) : "",
      from: isSet(object.from) ? globalThis.String(object.from) : "",
      to: isSet(object.to) ? globalThis.String(object.to) : "",
      body: isSet(object.body) ? globalThis.String(object.body) : "",
      attachments: globalThis.Array.isArray(object?.attachments)
        ? object.attachments.map((e: any) => EmailAttachment.fromJSON(e))
        : [],
      apiMessageId: isSet(object.apiMessageId) ? globalThis.String(object.apiMessageId) : "",
      date: isSet(object.date) ? fromJsonTimestamp(object.date) : undefined,
    };
  },

  toJSON(message: Email): unknown {
    const obj: any = {};
    if (message.threadId !== undefined && message.threadId !== "") {
      obj.threadId = message.threadId;
    }
    if (message.subject !== undefined && message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.messageId !== undefined && message.messageId !== "") {
      obj.messageId = message.messageId;
    }
    if (message.from !== undefined && message.from !== "") {
      obj.from = message.from;
    }
    if (message.to !== undefined && message.to !== "") {
      obj.to = message.to;
    }
    if (message.body !== undefined && message.body !== "") {
      obj.body = message.body;
    }
    if (message.attachments?.length) {
      obj.attachments = message.attachments.map((e) => EmailAttachment.toJSON(e));
    }
    if (message.apiMessageId !== undefined && message.apiMessageId !== "") {
      obj.apiMessageId = message.apiMessageId;
    }
    if (message.date !== undefined) {
      obj.date = message.date.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Email>, I>>(base?: I): Email {
    return Email.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Email>, I>>(object: I): Email {
    const message = createBaseEmail();
    message.threadId = object.threadId ?? "";
    message.subject = object.subject ?? "";
    message.messageId = object.messageId ?? "";
    message.from = object.from ?? "";
    message.to = object.to ?? "";
    message.body = object.body ?? "";
    message.attachments = object.attachments?.map((e) => EmailAttachment.fromPartial(e)) || [];
    message.apiMessageId = object.apiMessageId ?? "";
    message.date = object.date ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Email.$type, Email);

function createBaseEmailAttachment(): EmailAttachment {
  return {
    $type: "automation_mining.ontology.EmailAttachment",
    id: "",
    url: "",
    content: new Uint8Array(0),
    mimeType: "",
    fileName: "",
    cid: "",
  };
}

export const EmailAttachment = {
  $type: "automation_mining.ontology.EmailAttachment" as const,

  encode(message: EmailAttachment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.content !== undefined && message.content.length !== 0) {
      writer.uint32(26).bytes(message.content);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      writer.uint32(34).string(message.mimeType);
    }
    if (message.fileName !== undefined && message.fileName !== "") {
      writer.uint32(42).string(message.fileName);
    }
    if (message.cid !== undefined && message.cid !== "") {
      writer.uint32(50).string(message.cid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmailAttachment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmailAttachment();
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

          message.url = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.content = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.mimeType = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fileName = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.cid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EmailAttachment {
    return {
      $type: EmailAttachment.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      content: isSet(object.content) ? bytesFromBase64(object.content) : new Uint8Array(0),
      mimeType: isSet(object.mimeType) ? globalThis.String(object.mimeType) : "",
      fileName: isSet(object.fileName) ? globalThis.String(object.fileName) : "",
      cid: isSet(object.cid) ? globalThis.String(object.cid) : "",
    };
  },

  toJSON(message: EmailAttachment): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    if (message.content !== undefined && message.content.length !== 0) {
      obj.content = base64FromBytes(message.content);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      obj.mimeType = message.mimeType;
    }
    if (message.fileName !== undefined && message.fileName !== "") {
      obj.fileName = message.fileName;
    }
    if (message.cid !== undefined && message.cid !== "") {
      obj.cid = message.cid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EmailAttachment>, I>>(base?: I): EmailAttachment {
    return EmailAttachment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EmailAttachment>, I>>(object: I): EmailAttachment {
    const message = createBaseEmailAttachment();
    message.id = object.id ?? "";
    message.url = object.url ?? "";
    message.content = object.content ?? new Uint8Array(0);
    message.mimeType = object.mimeType ?? "";
    message.fileName = object.fileName ?? "";
    message.cid = object.cid ?? "";
    return message;
  },
};

messageTypeRegistry.set(EmailAttachment.$type, EmailAttachment);

function createBaseFile(): File {
  return {
    $type: "automation_mining.ontology.File",
    id: "",
    path: "",
    name: "",
    textContent: undefined,
    byteContent: undefined,
    mimeType: "",
    isFolder: false,
  };
}

export const File = {
  $type: "automation_mining.ontology.File" as const,

  encode(message: File, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.path !== undefined && message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.textContent !== undefined) {
      writer.uint32(34).string(message.textContent);
    }
    if (message.byteContent !== undefined) {
      writer.uint32(42).bytes(message.byteContent);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      writer.uint32(50).string(message.mimeType);
    }
    if (message.isFolder !== undefined && message.isFolder !== false) {
      writer.uint32(56).bool(message.isFolder);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): File {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFile();
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

          message.path = reader.string();
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

          message.textContent = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.byteContent = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.mimeType = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.isFolder = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): File {
    return {
      $type: File.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      path: isSet(object.path) ? globalThis.String(object.path) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      textContent: isSet(object.textContent) ? globalThis.String(object.textContent) : undefined,
      byteContent: isSet(object.byteContent) ? bytesFromBase64(object.byteContent) : undefined,
      mimeType: isSet(object.mimeType) ? globalThis.String(object.mimeType) : "",
      isFolder: isSet(object.isFolder) ? globalThis.Boolean(object.isFolder) : false,
    };
  },

  toJSON(message: File): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.path !== undefined && message.path !== "") {
      obj.path = message.path;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.textContent !== undefined) {
      obj.textContent = message.textContent;
    }
    if (message.byteContent !== undefined) {
      obj.byteContent = base64FromBytes(message.byteContent);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      obj.mimeType = message.mimeType;
    }
    if (message.isFolder !== undefined && message.isFolder !== false) {
      obj.isFolder = message.isFolder;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<File>, I>>(base?: I): File {
    return File.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<File>, I>>(object: I): File {
    const message = createBaseFile();
    message.id = object.id ?? "";
    message.path = object.path ?? "";
    message.name = object.name ?? "";
    message.textContent = object.textContent ?? undefined;
    message.byteContent = object.byteContent ?? undefined;
    message.mimeType = object.mimeType ?? "";
    message.isFolder = object.isFolder ?? false;
    return message;
  },
};

messageTypeRegistry.set(File.$type, File);

function createBaseSheets(): Sheets {
  return { $type: "automation_mining.ontology.Sheets", id: "", name: "", folder: undefined, sheets: [], path: "" };
}

export const Sheets = {
  $type: "automation_mining.ontology.Sheets" as const,

  encode(message: Sheets, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.folder !== undefined) {
      File.encode(message.folder, writer.uint32(26).fork()).ldelim();
    }
    if (message.sheets !== undefined && message.sheets.length !== 0) {
      for (const v of message.sheets) {
        SheetsSheet.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.path !== undefined && message.path !== "") {
      writer.uint32(42).string(message.path);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sheets {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSheets();
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

          message.folder = File.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.sheets!.push(SheetsSheet.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.path = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Sheets {
    return {
      $type: Sheets.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      folder: isSet(object.folder) ? File.fromJSON(object.folder) : undefined,
      sheets: globalThis.Array.isArray(object?.sheets) ? object.sheets.map((e: any) => SheetsSheet.fromJSON(e)) : [],
      path: isSet(object.path) ? globalThis.String(object.path) : "",
    };
  },

  toJSON(message: Sheets): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.folder !== undefined) {
      obj.folder = File.toJSON(message.folder);
    }
    if (message.sheets?.length) {
      obj.sheets = message.sheets.map((e) => SheetsSheet.toJSON(e));
    }
    if (message.path !== undefined && message.path !== "") {
      obj.path = message.path;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Sheets>, I>>(base?: I): Sheets {
    return Sheets.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Sheets>, I>>(object: I): Sheets {
    const message = createBaseSheets();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.folder = (object.folder !== undefined && object.folder !== null)
      ? File.fromPartial(object.folder)
      : undefined;
    message.sheets = object.sheets?.map((e) => SheetsSheet.fromPartial(e)) || [];
    message.path = object.path ?? "";
    return message;
  },
};

messageTypeRegistry.set(Sheets.$type, Sheets);

function createBaseSheetsSheet(): SheetsSheet {
  return { $type: "automation_mining.ontology.Sheets.Sheet", id: "", name: "", cells: {}, metadata: {} };
}

export const SheetsSheet = {
  $type: "automation_mining.ontology.Sheets.Sheet" as const,

  encode(message: SheetsSheet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    Object.entries(message.cells || {}).forEach(([key, value]) => {
      SheetsSheetCellsEntry.encode({
        $type: "automation_mining.ontology.Sheets.Sheet.CellsEntry",
        key: key as any,
        value,
      }, writer.uint32(26).fork()).ldelim();
    });
    Object.entries(message.metadata || {}).forEach(([key, value]) => {
      SheetsSheetMetadataEntry.encode({
        $type: "automation_mining.ontology.Sheets.Sheet.MetadataEntry",
        key: key as any,
        value,
      }, writer.uint32(34).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SheetsSheet {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSheetsSheet();
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

          const entry3 = SheetsSheetCellsEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.cells![entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = SheetsSheetMetadataEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.metadata![entry4.key] = entry4.value;
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

  fromJSON(object: any): SheetsSheet {
    return {
      $type: SheetsSheet.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      cells: isObject(object.cells)
        ? Object.entries(object.cells).reduce<{ [key: string]: SheetsSheetCell }>((acc, [key, value]) => {
          acc[key] = SheetsSheetCell.fromJSON(value);
          return acc;
        }, {})
        : {},
      metadata: isObject(object.metadata)
        ? Object.entries(object.metadata).reduce<{ [key: string]: Any }>((acc, [key, value]) => {
          acc[key] = Any.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: SheetsSheet): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.cells) {
      const entries = Object.entries(message.cells);
      if (entries.length > 0) {
        obj.cells = {};
        entries.forEach(([k, v]) => {
          obj.cells[k] = SheetsSheetCell.toJSON(v);
        });
      }
    }
    if (message.metadata) {
      const entries = Object.entries(message.metadata);
      if (entries.length > 0) {
        obj.metadata = {};
        entries.forEach(([k, v]) => {
          obj.metadata[k] = Any.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SheetsSheet>, I>>(base?: I): SheetsSheet {
    return SheetsSheet.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SheetsSheet>, I>>(object: I): SheetsSheet {
    const message = createBaseSheetsSheet();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.cells = Object.entries(object.cells ?? {}).reduce<{ [key: string]: SheetsSheetCell }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = SheetsSheetCell.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.metadata = Object.entries(object.metadata ?? {}).reduce<{ [key: string]: Any }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Any.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

messageTypeRegistry.set(SheetsSheet.$type, SheetsSheet);

function createBaseSheetsSheetCell(): SheetsSheetCell {
  return { $type: "automation_mining.ontology.Sheets.Sheet.Cell", value: "" };
}

export const SheetsSheetCell = {
  $type: "automation_mining.ontology.Sheets.Sheet.Cell" as const,

  encode(message: SheetsSheetCell, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined && message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SheetsSheetCell {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSheetsSheetCell();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): SheetsSheetCell {
    return { $type: SheetsSheetCell.$type, value: isSet(object.value) ? globalThis.String(object.value) : "" };
  },

  toJSON(message: SheetsSheetCell): unknown {
    const obj: any = {};
    if (message.value !== undefined && message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SheetsSheetCell>, I>>(base?: I): SheetsSheetCell {
    return SheetsSheetCell.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SheetsSheetCell>, I>>(object: I): SheetsSheetCell {
    const message = createBaseSheetsSheetCell();
    message.value = object.value ?? "";
    return message;
  },
};

messageTypeRegistry.set(SheetsSheetCell.$type, SheetsSheetCell);

function createBaseSheetsSheetCellsEntry(): SheetsSheetCellsEntry {
  return { $type: "automation_mining.ontology.Sheets.Sheet.CellsEntry", key: "", value: undefined };
}

export const SheetsSheetCellsEntry = {
  $type: "automation_mining.ontology.Sheets.Sheet.CellsEntry" as const,

  encode(message: SheetsSheetCellsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SheetsSheetCell.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SheetsSheetCellsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSheetsSheetCellsEntry();
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

          message.value = SheetsSheetCell.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SheetsSheetCellsEntry {
    return {
      $type: SheetsSheetCellsEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? SheetsSheetCell.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: SheetsSheetCellsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = SheetsSheetCell.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SheetsSheetCellsEntry>, I>>(base?: I): SheetsSheetCellsEntry {
    return SheetsSheetCellsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SheetsSheetCellsEntry>, I>>(object: I): SheetsSheetCellsEntry {
    const message = createBaseSheetsSheetCellsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? SheetsSheetCell.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SheetsSheetCellsEntry.$type, SheetsSheetCellsEntry);

function createBaseSheetsSheetMetadataEntry(): SheetsSheetMetadataEntry {
  return { $type: "automation_mining.ontology.Sheets.Sheet.MetadataEntry", key: "", value: undefined };
}

export const SheetsSheetMetadataEntry = {
  $type: "automation_mining.ontology.Sheets.Sheet.MetadataEntry" as const,

  encode(message: SheetsSheetMetadataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Any.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SheetsSheetMetadataEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSheetsSheetMetadataEntry();
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

          message.value = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SheetsSheetMetadataEntry {
    return {
      $type: SheetsSheetMetadataEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? Any.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: SheetsSheetMetadataEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = Any.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SheetsSheetMetadataEntry>, I>>(base?: I): SheetsSheetMetadataEntry {
    return SheetsSheetMetadataEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SheetsSheetMetadataEntry>, I>>(object: I): SheetsSheetMetadataEntry {
    const message = createBaseSheetsSheetMetadataEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null) ? Any.fromPartial(object.value) : undefined;
    return message;
  },
};

messageTypeRegistry.set(SheetsSheetMetadataEntry.$type, SheetsSheetMetadataEntry);

function createBaseInvoice(): Invoice {
  return { $type: "automation_mining.ontology.Invoice", id: "", totalAmount: "" };
}

export const Invoice = {
  $type: "automation_mining.ontology.Invoice" as const,

  encode(message: Invoice, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.totalAmount !== undefined && message.totalAmount !== "") {
      writer.uint32(18).string(message.totalAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Invoice {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvoice();
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

          message.totalAmount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Invoice {
    return {
      $type: Invoice.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      totalAmount: isSet(object.totalAmount) ? globalThis.String(object.totalAmount) : "",
    };
  },

  toJSON(message: Invoice): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.totalAmount !== undefined && message.totalAmount !== "") {
      obj.totalAmount = message.totalAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Invoice>, I>>(base?: I): Invoice {
    return Invoice.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Invoice>, I>>(object: I): Invoice {
    const message = createBaseInvoice();
    message.id = object.id ?? "";
    message.totalAmount = object.totalAmount ?? "";
    return message;
  },
};

messageTypeRegistry.set(Invoice.$type, Invoice);

function createBasePurchaseOrder(): PurchaseOrder {
  return { $type: "automation_mining.ontology.PurchaseOrder", id: "", totalAmount: "" };
}

export const PurchaseOrder = {
  $type: "automation_mining.ontology.PurchaseOrder" as const,

  encode(message: PurchaseOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.totalAmount !== undefined && message.totalAmount !== "") {
      writer.uint32(18).string(message.totalAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PurchaseOrder {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePurchaseOrder();
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

          message.totalAmount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PurchaseOrder {
    return {
      $type: PurchaseOrder.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      totalAmount: isSet(object.totalAmount) ? globalThis.String(object.totalAmount) : "",
    };
  },

  toJSON(message: PurchaseOrder): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.totalAmount !== undefined && message.totalAmount !== "") {
      obj.totalAmount = message.totalAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PurchaseOrder>, I>>(base?: I): PurchaseOrder {
    return PurchaseOrder.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PurchaseOrder>, I>>(object: I): PurchaseOrder {
    const message = createBasePurchaseOrder();
    message.id = object.id ?? "";
    message.totalAmount = object.totalAmount ?? "";
    return message;
  },
};

messageTypeRegistry.set(PurchaseOrder.$type, PurchaseOrder);

function createBaseReceipt(): Receipt {
  return { $type: "automation_mining.ontology.Receipt", id: "", totalAmount: "" };
}

export const Receipt = {
  $type: "automation_mining.ontology.Receipt" as const,

  encode(message: Receipt, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.totalAmount !== undefined && message.totalAmount !== "") {
      writer.uint32(18).string(message.totalAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Receipt {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReceipt();
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

          message.totalAmount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Receipt {
    return {
      $type: Receipt.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      totalAmount: isSet(object.totalAmount) ? globalThis.String(object.totalAmount) : "",
    };
  },

  toJSON(message: Receipt): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.totalAmount !== undefined && message.totalAmount !== "") {
      obj.totalAmount = message.totalAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Receipt>, I>>(base?: I): Receipt {
    return Receipt.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Receipt>, I>>(object: I): Receipt {
    const message = createBaseReceipt();
    message.id = object.id ?? "";
    message.totalAmount = object.totalAmount ?? "";
    return message;
  },
};

messageTypeRegistry.set(Receipt.$type, Receipt);

function createBaseGmailLabel(): GmailLabel {
  return { $type: "automation_mining.ontology.GmailLabel", id: "", name: "", color: undefined };
}

export const GmailLabel = {
  $type: "automation_mining.ontology.GmailLabel" as const,

  encode(message: GmailLabel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.color !== undefined) {
      GmailLabelColor.encode(message.color, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GmailLabel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGmailLabel();
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

          message.color = GmailLabelColor.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GmailLabel {
    return {
      $type: GmailLabel.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      color: isSet(object.color) ? GmailLabelColor.fromJSON(object.color) : undefined,
    };
  },

  toJSON(message: GmailLabel): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.color !== undefined) {
      obj.color = GmailLabelColor.toJSON(message.color);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GmailLabel>, I>>(base?: I): GmailLabel {
    return GmailLabel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GmailLabel>, I>>(object: I): GmailLabel {
    const message = createBaseGmailLabel();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.color = (object.color !== undefined && object.color !== null)
      ? GmailLabelColor.fromPartial(object.color)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GmailLabel.$type, GmailLabel);

function createBaseGmailLabelColor(): GmailLabelColor {
  return { $type: "automation_mining.ontology.GmailLabel.Color", backgroundColor: "", textColor: "" };
}

export const GmailLabelColor = {
  $type: "automation_mining.ontology.GmailLabel.Color" as const,

  encode(message: GmailLabelColor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.backgroundColor !== undefined && message.backgroundColor !== "") {
      writer.uint32(10).string(message.backgroundColor);
    }
    if (message.textColor !== undefined && message.textColor !== "") {
      writer.uint32(18).string(message.textColor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GmailLabelColor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGmailLabelColor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.backgroundColor = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.textColor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GmailLabelColor {
    return {
      $type: GmailLabelColor.$type,
      backgroundColor: isSet(object.backgroundColor) ? globalThis.String(object.backgroundColor) : "",
      textColor: isSet(object.textColor) ? globalThis.String(object.textColor) : "",
    };
  },

  toJSON(message: GmailLabelColor): unknown {
    const obj: any = {};
    if (message.backgroundColor !== undefined && message.backgroundColor !== "") {
      obj.backgroundColor = message.backgroundColor;
    }
    if (message.textColor !== undefined && message.textColor !== "") {
      obj.textColor = message.textColor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GmailLabelColor>, I>>(base?: I): GmailLabelColor {
    return GmailLabelColor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GmailLabelColor>, I>>(object: I): GmailLabelColor {
    const message = createBaseGmailLabelColor();
    message.backgroundColor = object.backgroundColor ?? "";
    message.textColor = object.textColor ?? "";
    return message;
  },
};

messageTypeRegistry.set(GmailLabelColor.$type, GmailLabelColor);

function createBaseEmailLabel(): EmailLabel {
  return { $type: "automation_mining.ontology.EmailLabel", id: "", name: "", color: undefined };
}

export const EmailLabel = {
  $type: "automation_mining.ontology.EmailLabel" as const,

  encode(message: EmailLabel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.color !== undefined) {
      EmailLabelColor.encode(message.color, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmailLabel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmailLabel();
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

          message.color = EmailLabelColor.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EmailLabel {
    return {
      $type: EmailLabel.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      color: isSet(object.color) ? EmailLabelColor.fromJSON(object.color) : undefined,
    };
  },

  toJSON(message: EmailLabel): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.color !== undefined) {
      obj.color = EmailLabelColor.toJSON(message.color);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EmailLabel>, I>>(base?: I): EmailLabel {
    return EmailLabel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EmailLabel>, I>>(object: I): EmailLabel {
    const message = createBaseEmailLabel();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.color = (object.color !== undefined && object.color !== null)
      ? EmailLabelColor.fromPartial(object.color)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(EmailLabel.$type, EmailLabel);

function createBaseEmailLabelColor(): EmailLabelColor {
  return { $type: "automation_mining.ontology.EmailLabel.Color", backgroundColor: "", textColor: "" };
}

export const EmailLabelColor = {
  $type: "automation_mining.ontology.EmailLabel.Color" as const,

  encode(message: EmailLabelColor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.backgroundColor !== undefined && message.backgroundColor !== "") {
      writer.uint32(10).string(message.backgroundColor);
    }
    if (message.textColor !== undefined && message.textColor !== "") {
      writer.uint32(18).string(message.textColor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmailLabelColor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmailLabelColor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.backgroundColor = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.textColor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EmailLabelColor {
    return {
      $type: EmailLabelColor.$type,
      backgroundColor: isSet(object.backgroundColor) ? globalThis.String(object.backgroundColor) : "",
      textColor: isSet(object.textColor) ? globalThis.String(object.textColor) : "",
    };
  },

  toJSON(message: EmailLabelColor): unknown {
    const obj: any = {};
    if (message.backgroundColor !== undefined && message.backgroundColor !== "") {
      obj.backgroundColor = message.backgroundColor;
    }
    if (message.textColor !== undefined && message.textColor !== "") {
      obj.textColor = message.textColor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EmailLabelColor>, I>>(base?: I): EmailLabelColor {
    return EmailLabelColor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EmailLabelColor>, I>>(object: I): EmailLabelColor {
    const message = createBaseEmailLabelColor();
    message.backgroundColor = object.backgroundColor ?? "";
    message.textColor = object.textColor ?? "";
    return message;
  },
};

messageTypeRegistry.set(EmailLabelColor.$type, EmailLabelColor);

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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
