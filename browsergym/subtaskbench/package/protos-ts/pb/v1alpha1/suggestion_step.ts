/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Activity, activityFromJSON, activityToJSON } from "../../automation_mining/automation_mining";
import { Email, EmailAttachment } from "../../automation_mining/ontology/data_models";
import { Document, DocumentEntity } from "../../google/cloud/documentai/v1/document";
import { messageTypeRegistry } from "../../typeRegistry";
import { Performance } from "./performance";

export const protobufPackage = "pb.v1alpha1";

export interface SuggestionStep {
  $type?: "pb.v1alpha1.SuggestionStep";
  displayName?: string | undefined;
  options?:
    | SuggestionStepOption[]
    | undefined;
  /** Step performance metrics to be calculated once a step is completed. */
  performance?: Performance | undefined;
  email?: Email | undefined;
  documents?: Document[] | undefined;
  activity?: Activity | undefined;
  mode?:
    | SuggestionStepMode
    | undefined;
  /**
   * No Change in any document: empty array
   * Change in some/all Documents:
   * - If Document is modified, store all the original entities only
   * - If Document is not modified, store empty/nil object
   */
  originalDocuments?:
    | Document[]
    | undefined;
  /**
   * Stores zero value if user didn't modify the options,
   * otherwise store the selected option's original values.
   */
  originalOption?: SuggestionStepOption | undefined;
}

export interface SuggestionStepOption {
  $type?: "pb.v1alpha1.SuggestionStepOption";
  application?: string | undefined;
  gmailReadEmail?: SuggestionStepOptionGmailReadEmailParam | undefined;
  gmailDownloadAttachment?: SuggestionStepOptionGmailDownloadAttachmentParam | undefined;
  orbyDocUnderstanding?: SuggestionStepOptionOrbyDocUnderstandingParam | undefined;
  netsuiteCreateInvoice?: SuggestionStepOptionNetSuiteCreateInvoiceParam | undefined;
  gsheetsAddRow?:
    | SuggestionStepOptionGoogleSheetsAddRowParam
    | undefined;
  /** True if the Application is selected else false */
  selected?: boolean | undefined;
}

export interface SuggestionStepOptionGmailReadEmailParam {
  $type?: "pb.v1alpha1.SuggestionStepOption.GmailReadEmailParam";
  /** Target email thread id. */
  threadId?:
    | string
    | undefined;
  /** Target email message id. */
  messageId?: string | undefined;
}

export interface SuggestionStepOptionGmailDownloadAttachmentParam {
  $type?: "pb.v1alpha1.SuggestionStepOption.GmailDownloadAttachmentParam";
  /**
   * Frontend will try to download the attachments based on the urls and
   * send them back as bytes in the documents field of SuggestionStep
   * message through the Document proto field `source.content`.
   * Attachment mimetype is set in the mime_type proto field.
   *
   * Note: order of the attachments should correspond to the order of
   * documents fields so that backend can map documents to attachments.
   */
  attachments?: EmailAttachment[] | undefined;
}

export interface SuggestionStepOptionOrbyDocUnderstandingParam {
  $type?: "pb.v1alpha1.SuggestionStepOption.OrbyDocUnderstandingParam";
  /** Only source.content is filled with document bytes. */
  documents?: Document[] | undefined;
}

export interface SuggestionStepOptionNetSuiteCreateInvoiceParam {
  $type?: "pb.v1alpha1.SuggestionStepOption.NetSuiteCreateInvoiceParam";
  /** A list of entities used to create invoice in NetSuite. */
  entities?: DocumentEntity[] | undefined;
}

export interface SuggestionStepOptionGoogleSheetsAddRowParam {
  $type?: "pb.v1alpha1.SuggestionStepOption.GoogleSheetsAddRowParam";
  /** Google sheets URL */
  url?:
    | string
    | undefined;
  /** List of sheet names */
  sheetNames?:
    | string[]
    | undefined;
  /** Selected sheet index, 0-based */
  selectedSheetIndex?:
    | number
    | undefined;
  /** Available action, currently hardcoded to "Add a row" */
  action?: string | undefined;
}

export interface SuggestionStepMode {
  $type?: "pb.v1alpha1.SuggestionStepMode";
  /**
   * If true, this step needs to be processed by frontend before a suggestion
   * is ready.
   */
  preliminaryExecution?:
    | boolean
    | undefined;
  /**
   * If true, payloads of this step will be rendered in a UI component when
   * the suggestion needs human review.
   */
  review?:
    | boolean
    | undefined;
  /** If true, this step has completed both server and client side work if any. */
  complete?: boolean | undefined;
}

export interface SuggestionStepOptionParam {
  $type?: "pb.v1alpha1.SuggestionStepOptionParam";
}

function createBaseSuggestionStep(): SuggestionStep {
  return {
    $type: "pb.v1alpha1.SuggestionStep",
    displayName: "",
    options: [],
    performance: undefined,
    email: undefined,
    documents: [],
    activity: 0,
    mode: undefined,
    originalDocuments: [],
    originalOption: undefined,
  };
}

export const SuggestionStep = {
  $type: "pb.v1alpha1.SuggestionStep" as const,

  encode(message: SuggestionStep, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.options !== undefined && message.options.length !== 0) {
      for (const v of message.options) {
        SuggestionStepOption.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.performance !== undefined) {
      Performance.encode(message.performance, writer.uint32(26).fork()).ldelim();
    }
    if (message.email !== undefined) {
      Email.encode(message.email, writer.uint32(34).fork()).ldelim();
    }
    if (message.documents !== undefined && message.documents.length !== 0) {
      for (const v of message.documents) {
        Document.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.activity !== undefined && message.activity !== 0) {
      writer.uint32(48).int32(message.activity);
    }
    if (message.mode !== undefined) {
      SuggestionStepMode.encode(message.mode, writer.uint32(58).fork()).ldelim();
    }
    if (message.originalDocuments !== undefined && message.originalDocuments.length !== 0) {
      for (const v of message.originalDocuments) {
        Document.encode(v!, writer.uint32(66).fork()).ldelim();
      }
    }
    if (message.originalOption !== undefined) {
      SuggestionStepOption.encode(message.originalOption, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestionStep {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestionStep();
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

          message.options!.push(SuggestionStepOption.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.performance = Performance.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.email = Email.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.documents!.push(Document.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.activity = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.mode = SuggestionStepMode.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.originalDocuments!.push(Document.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.originalOption = SuggestionStepOption.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuggestionStep {
    return {
      $type: SuggestionStep.$type,
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      options: globalThis.Array.isArray(object?.options)
        ? object.options.map((e: any) => SuggestionStepOption.fromJSON(e))
        : [],
      performance: isSet(object.performance) ? Performance.fromJSON(object.performance) : undefined,
      email: isSet(object.email) ? Email.fromJSON(object.email) : undefined,
      documents: globalThis.Array.isArray(object?.documents)
        ? object.documents.map((e: any) => Document.fromJSON(e))
        : [],
      activity: isSet(object.activity) ? activityFromJSON(object.activity) : 0,
      mode: isSet(object.mode) ? SuggestionStepMode.fromJSON(object.mode) : undefined,
      originalDocuments: globalThis.Array.isArray(object?.originalDocuments)
        ? object.originalDocuments.map((e: any) => Document.fromJSON(e))
        : [],
      originalOption: isSet(object.originalOption) ? SuggestionStepOption.fromJSON(object.originalOption) : undefined,
    };
  },

  toJSON(message: SuggestionStep): unknown {
    const obj: any = {};
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.options?.length) {
      obj.options = message.options.map((e) => SuggestionStepOption.toJSON(e));
    }
    if (message.performance !== undefined) {
      obj.performance = Performance.toJSON(message.performance);
    }
    if (message.email !== undefined) {
      obj.email = Email.toJSON(message.email);
    }
    if (message.documents?.length) {
      obj.documents = message.documents.map((e) => Document.toJSON(e));
    }
    if (message.activity !== undefined && message.activity !== 0) {
      obj.activity = activityToJSON(message.activity);
    }
    if (message.mode !== undefined) {
      obj.mode = SuggestionStepMode.toJSON(message.mode);
    }
    if (message.originalDocuments?.length) {
      obj.originalDocuments = message.originalDocuments.map((e) => Document.toJSON(e));
    }
    if (message.originalOption !== undefined) {
      obj.originalOption = SuggestionStepOption.toJSON(message.originalOption);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestionStep>, I>>(base?: I): SuggestionStep {
    return SuggestionStep.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestionStep>, I>>(object: I): SuggestionStep {
    const message = createBaseSuggestionStep();
    message.displayName = object.displayName ?? "";
    message.options = object.options?.map((e) => SuggestionStepOption.fromPartial(e)) || [];
    message.performance = (object.performance !== undefined && object.performance !== null)
      ? Performance.fromPartial(object.performance)
      : undefined;
    message.email = (object.email !== undefined && object.email !== null) ? Email.fromPartial(object.email) : undefined;
    message.documents = object.documents?.map((e) => Document.fromPartial(e)) || [];
    message.activity = object.activity ?? 0;
    message.mode = (object.mode !== undefined && object.mode !== null)
      ? SuggestionStepMode.fromPartial(object.mode)
      : undefined;
    message.originalDocuments = object.originalDocuments?.map((e) => Document.fromPartial(e)) || [];
    message.originalOption = (object.originalOption !== undefined && object.originalOption !== null)
      ? SuggestionStepOption.fromPartial(object.originalOption)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SuggestionStep.$type, SuggestionStep);

function createBaseSuggestionStepOption(): SuggestionStepOption {
  return {
    $type: "pb.v1alpha1.SuggestionStepOption",
    application: "",
    gmailReadEmail: undefined,
    gmailDownloadAttachment: undefined,
    orbyDocUnderstanding: undefined,
    netsuiteCreateInvoice: undefined,
    gsheetsAddRow: undefined,
    selected: false,
  };
}

export const SuggestionStepOption = {
  $type: "pb.v1alpha1.SuggestionStepOption" as const,

  encode(message: SuggestionStepOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.application !== undefined && message.application !== "") {
      writer.uint32(10).string(message.application);
    }
    if (message.gmailReadEmail !== undefined) {
      SuggestionStepOptionGmailReadEmailParam.encode(message.gmailReadEmail, writer.uint32(18).fork()).ldelim();
    }
    if (message.gmailDownloadAttachment !== undefined) {
      SuggestionStepOptionGmailDownloadAttachmentParam.encode(message.gmailDownloadAttachment, writer.uint32(26).fork())
        .ldelim();
    }
    if (message.orbyDocUnderstanding !== undefined) {
      SuggestionStepOptionOrbyDocUnderstandingParam.encode(message.orbyDocUnderstanding, writer.uint32(34).fork())
        .ldelim();
    }
    if (message.netsuiteCreateInvoice !== undefined) {
      SuggestionStepOptionNetSuiteCreateInvoiceParam.encode(message.netsuiteCreateInvoice, writer.uint32(42).fork())
        .ldelim();
    }
    if (message.gsheetsAddRow !== undefined) {
      SuggestionStepOptionGoogleSheetsAddRowParam.encode(message.gsheetsAddRow, writer.uint32(58).fork()).ldelim();
    }
    if (message.selected !== undefined && message.selected !== false) {
      writer.uint32(48).bool(message.selected);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestionStepOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestionStepOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.application = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.gmailReadEmail = SuggestionStepOptionGmailReadEmailParam.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.gmailDownloadAttachment = SuggestionStepOptionGmailDownloadAttachmentParam.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.orbyDocUnderstanding = SuggestionStepOptionOrbyDocUnderstandingParam.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.netsuiteCreateInvoice = SuggestionStepOptionNetSuiteCreateInvoiceParam.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.gsheetsAddRow = SuggestionStepOptionGoogleSheetsAddRowParam.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.selected = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuggestionStepOption {
    return {
      $type: SuggestionStepOption.$type,
      application: isSet(object.application) ? globalThis.String(object.application) : "",
      gmailReadEmail: isSet(object.gmailReadEmail)
        ? SuggestionStepOptionGmailReadEmailParam.fromJSON(object.gmailReadEmail)
        : undefined,
      gmailDownloadAttachment: isSet(object.gmailDownloadAttachment)
        ? SuggestionStepOptionGmailDownloadAttachmentParam.fromJSON(object.gmailDownloadAttachment)
        : undefined,
      orbyDocUnderstanding: isSet(object.orbyDocUnderstanding)
        ? SuggestionStepOptionOrbyDocUnderstandingParam.fromJSON(object.orbyDocUnderstanding)
        : undefined,
      netsuiteCreateInvoice: isSet(object.netsuiteCreateInvoice)
        ? SuggestionStepOptionNetSuiteCreateInvoiceParam.fromJSON(object.netsuiteCreateInvoice)
        : undefined,
      gsheetsAddRow: isSet(object.gsheetsAddRow)
        ? SuggestionStepOptionGoogleSheetsAddRowParam.fromJSON(object.gsheetsAddRow)
        : undefined,
      selected: isSet(object.selected) ? globalThis.Boolean(object.selected) : false,
    };
  },

  toJSON(message: SuggestionStepOption): unknown {
    const obj: any = {};
    if (message.application !== undefined && message.application !== "") {
      obj.application = message.application;
    }
    if (message.gmailReadEmail !== undefined) {
      obj.gmailReadEmail = SuggestionStepOptionGmailReadEmailParam.toJSON(message.gmailReadEmail);
    }
    if (message.gmailDownloadAttachment !== undefined) {
      obj.gmailDownloadAttachment = SuggestionStepOptionGmailDownloadAttachmentParam.toJSON(
        message.gmailDownloadAttachment,
      );
    }
    if (message.orbyDocUnderstanding !== undefined) {
      obj.orbyDocUnderstanding = SuggestionStepOptionOrbyDocUnderstandingParam.toJSON(message.orbyDocUnderstanding);
    }
    if (message.netsuiteCreateInvoice !== undefined) {
      obj.netsuiteCreateInvoice = SuggestionStepOptionNetSuiteCreateInvoiceParam.toJSON(message.netsuiteCreateInvoice);
    }
    if (message.gsheetsAddRow !== undefined) {
      obj.gsheetsAddRow = SuggestionStepOptionGoogleSheetsAddRowParam.toJSON(message.gsheetsAddRow);
    }
    if (message.selected !== undefined && message.selected !== false) {
      obj.selected = message.selected;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestionStepOption>, I>>(base?: I): SuggestionStepOption {
    return SuggestionStepOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestionStepOption>, I>>(object: I): SuggestionStepOption {
    const message = createBaseSuggestionStepOption();
    message.application = object.application ?? "";
    message.gmailReadEmail = (object.gmailReadEmail !== undefined && object.gmailReadEmail !== null)
      ? SuggestionStepOptionGmailReadEmailParam.fromPartial(object.gmailReadEmail)
      : undefined;
    message.gmailDownloadAttachment =
      (object.gmailDownloadAttachment !== undefined && object.gmailDownloadAttachment !== null)
        ? SuggestionStepOptionGmailDownloadAttachmentParam.fromPartial(object.gmailDownloadAttachment)
        : undefined;
    message.orbyDocUnderstanding = (object.orbyDocUnderstanding !== undefined && object.orbyDocUnderstanding !== null)
      ? SuggestionStepOptionOrbyDocUnderstandingParam.fromPartial(object.orbyDocUnderstanding)
      : undefined;
    message.netsuiteCreateInvoice =
      (object.netsuiteCreateInvoice !== undefined && object.netsuiteCreateInvoice !== null)
        ? SuggestionStepOptionNetSuiteCreateInvoiceParam.fromPartial(object.netsuiteCreateInvoice)
        : undefined;
    message.gsheetsAddRow = (object.gsheetsAddRow !== undefined && object.gsheetsAddRow !== null)
      ? SuggestionStepOptionGoogleSheetsAddRowParam.fromPartial(object.gsheetsAddRow)
      : undefined;
    message.selected = object.selected ?? false;
    return message;
  },
};

messageTypeRegistry.set(SuggestionStepOption.$type, SuggestionStepOption);

function createBaseSuggestionStepOptionGmailReadEmailParam(): SuggestionStepOptionGmailReadEmailParam {
  return { $type: "pb.v1alpha1.SuggestionStepOption.GmailReadEmailParam", threadId: "", messageId: "" };
}

export const SuggestionStepOptionGmailReadEmailParam = {
  $type: "pb.v1alpha1.SuggestionStepOption.GmailReadEmailParam" as const,

  encode(message: SuggestionStepOptionGmailReadEmailParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.threadId !== undefined && message.threadId !== "") {
      writer.uint32(10).string(message.threadId);
    }
    if (message.messageId !== undefined && message.messageId !== "") {
      writer.uint32(18).string(message.messageId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestionStepOptionGmailReadEmailParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestionStepOptionGmailReadEmailParam();
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

          message.messageId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuggestionStepOptionGmailReadEmailParam {
    return {
      $type: SuggestionStepOptionGmailReadEmailParam.$type,
      threadId: isSet(object.threadId) ? globalThis.String(object.threadId) : "",
      messageId: isSet(object.messageId) ? globalThis.String(object.messageId) : "",
    };
  },

  toJSON(message: SuggestionStepOptionGmailReadEmailParam): unknown {
    const obj: any = {};
    if (message.threadId !== undefined && message.threadId !== "") {
      obj.threadId = message.threadId;
    }
    if (message.messageId !== undefined && message.messageId !== "") {
      obj.messageId = message.messageId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestionStepOptionGmailReadEmailParam>, I>>(
    base?: I,
  ): SuggestionStepOptionGmailReadEmailParam {
    return SuggestionStepOptionGmailReadEmailParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestionStepOptionGmailReadEmailParam>, I>>(
    object: I,
  ): SuggestionStepOptionGmailReadEmailParam {
    const message = createBaseSuggestionStepOptionGmailReadEmailParam();
    message.threadId = object.threadId ?? "";
    message.messageId = object.messageId ?? "";
    return message;
  },
};

messageTypeRegistry.set(SuggestionStepOptionGmailReadEmailParam.$type, SuggestionStepOptionGmailReadEmailParam);

function createBaseSuggestionStepOptionGmailDownloadAttachmentParam(): SuggestionStepOptionGmailDownloadAttachmentParam {
  return { $type: "pb.v1alpha1.SuggestionStepOption.GmailDownloadAttachmentParam", attachments: [] };
}

export const SuggestionStepOptionGmailDownloadAttachmentParam = {
  $type: "pb.v1alpha1.SuggestionStepOption.GmailDownloadAttachmentParam" as const,

  encode(
    message: SuggestionStepOptionGmailDownloadAttachmentParam,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.attachments !== undefined && message.attachments.length !== 0) {
      for (const v of message.attachments) {
        EmailAttachment.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestionStepOptionGmailDownloadAttachmentParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestionStepOptionGmailDownloadAttachmentParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.attachments!.push(EmailAttachment.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuggestionStepOptionGmailDownloadAttachmentParam {
    return {
      $type: SuggestionStepOptionGmailDownloadAttachmentParam.$type,
      attachments: globalThis.Array.isArray(object?.attachments)
        ? object.attachments.map((e: any) => EmailAttachment.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SuggestionStepOptionGmailDownloadAttachmentParam): unknown {
    const obj: any = {};
    if (message.attachments?.length) {
      obj.attachments = message.attachments.map((e) => EmailAttachment.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestionStepOptionGmailDownloadAttachmentParam>, I>>(
    base?: I,
  ): SuggestionStepOptionGmailDownloadAttachmentParam {
    return SuggestionStepOptionGmailDownloadAttachmentParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestionStepOptionGmailDownloadAttachmentParam>, I>>(
    object: I,
  ): SuggestionStepOptionGmailDownloadAttachmentParam {
    const message = createBaseSuggestionStepOptionGmailDownloadAttachmentParam();
    message.attachments = object.attachments?.map((e) => EmailAttachment.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(
  SuggestionStepOptionGmailDownloadAttachmentParam.$type,
  SuggestionStepOptionGmailDownloadAttachmentParam,
);

function createBaseSuggestionStepOptionOrbyDocUnderstandingParam(): SuggestionStepOptionOrbyDocUnderstandingParam {
  return { $type: "pb.v1alpha1.SuggestionStepOption.OrbyDocUnderstandingParam", documents: [] };
}

export const SuggestionStepOptionOrbyDocUnderstandingParam = {
  $type: "pb.v1alpha1.SuggestionStepOption.OrbyDocUnderstandingParam" as const,

  encode(message: SuggestionStepOptionOrbyDocUnderstandingParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.documents !== undefined && message.documents.length !== 0) {
      for (const v of message.documents) {
        Document.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestionStepOptionOrbyDocUnderstandingParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestionStepOptionOrbyDocUnderstandingParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.documents!.push(Document.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuggestionStepOptionOrbyDocUnderstandingParam {
    return {
      $type: SuggestionStepOptionOrbyDocUnderstandingParam.$type,
      documents: globalThis.Array.isArray(object?.documents)
        ? object.documents.map((e: any) => Document.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SuggestionStepOptionOrbyDocUnderstandingParam): unknown {
    const obj: any = {};
    if (message.documents?.length) {
      obj.documents = message.documents.map((e) => Document.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestionStepOptionOrbyDocUnderstandingParam>, I>>(
    base?: I,
  ): SuggestionStepOptionOrbyDocUnderstandingParam {
    return SuggestionStepOptionOrbyDocUnderstandingParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestionStepOptionOrbyDocUnderstandingParam>, I>>(
    object: I,
  ): SuggestionStepOptionOrbyDocUnderstandingParam {
    const message = createBaseSuggestionStepOptionOrbyDocUnderstandingParam();
    message.documents = object.documents?.map((e) => Document.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(
  SuggestionStepOptionOrbyDocUnderstandingParam.$type,
  SuggestionStepOptionOrbyDocUnderstandingParam,
);

function createBaseSuggestionStepOptionNetSuiteCreateInvoiceParam(): SuggestionStepOptionNetSuiteCreateInvoiceParam {
  return { $type: "pb.v1alpha1.SuggestionStepOption.NetSuiteCreateInvoiceParam", entities: [] };
}

export const SuggestionStepOptionNetSuiteCreateInvoiceParam = {
  $type: "pb.v1alpha1.SuggestionStepOption.NetSuiteCreateInvoiceParam" as const,

  encode(
    message: SuggestionStepOptionNetSuiteCreateInvoiceParam,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.entities !== undefined && message.entities.length !== 0) {
      for (const v of message.entities) {
        DocumentEntity.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestionStepOptionNetSuiteCreateInvoiceParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestionStepOptionNetSuiteCreateInvoiceParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entities!.push(DocumentEntity.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuggestionStepOptionNetSuiteCreateInvoiceParam {
    return {
      $type: SuggestionStepOptionNetSuiteCreateInvoiceParam.$type,
      entities: globalThis.Array.isArray(object?.entities)
        ? object.entities.map((e: any) => DocumentEntity.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SuggestionStepOptionNetSuiteCreateInvoiceParam): unknown {
    const obj: any = {};
    if (message.entities?.length) {
      obj.entities = message.entities.map((e) => DocumentEntity.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestionStepOptionNetSuiteCreateInvoiceParam>, I>>(
    base?: I,
  ): SuggestionStepOptionNetSuiteCreateInvoiceParam {
    return SuggestionStepOptionNetSuiteCreateInvoiceParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestionStepOptionNetSuiteCreateInvoiceParam>, I>>(
    object: I,
  ): SuggestionStepOptionNetSuiteCreateInvoiceParam {
    const message = createBaseSuggestionStepOptionNetSuiteCreateInvoiceParam();
    message.entities = object.entities?.map((e) => DocumentEntity.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(
  SuggestionStepOptionNetSuiteCreateInvoiceParam.$type,
  SuggestionStepOptionNetSuiteCreateInvoiceParam,
);

function createBaseSuggestionStepOptionGoogleSheetsAddRowParam(): SuggestionStepOptionGoogleSheetsAddRowParam {
  return {
    $type: "pb.v1alpha1.SuggestionStepOption.GoogleSheetsAddRowParam",
    url: "",
    sheetNames: [],
    selectedSheetIndex: 0,
    action: "",
  };
}

export const SuggestionStepOptionGoogleSheetsAddRowParam = {
  $type: "pb.v1alpha1.SuggestionStepOption.GoogleSheetsAddRowParam" as const,

  encode(message: SuggestionStepOptionGoogleSheetsAddRowParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.sheetNames !== undefined && message.sheetNames.length !== 0) {
      for (const v of message.sheetNames) {
        writer.uint32(18).string(v!);
      }
    }
    if (message.selectedSheetIndex !== undefined && message.selectedSheetIndex !== 0) {
      writer.uint32(24).int32(message.selectedSheetIndex);
    }
    if (message.action !== undefined && message.action !== "") {
      writer.uint32(34).string(message.action);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestionStepOptionGoogleSheetsAddRowParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestionStepOptionGoogleSheetsAddRowParam();
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

          message.sheetNames!.push(reader.string());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.selectedSheetIndex = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.action = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuggestionStepOptionGoogleSheetsAddRowParam {
    return {
      $type: SuggestionStepOptionGoogleSheetsAddRowParam.$type,
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      sheetNames: globalThis.Array.isArray(object?.sheetNames)
        ? object.sheetNames.map((e: any) => globalThis.String(e))
        : [],
      selectedSheetIndex: isSet(object.selectedSheetIndex) ? globalThis.Number(object.selectedSheetIndex) : 0,
      action: isSet(object.action) ? globalThis.String(object.action) : "",
    };
  },

  toJSON(message: SuggestionStepOptionGoogleSheetsAddRowParam): unknown {
    const obj: any = {};
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    if (message.sheetNames?.length) {
      obj.sheetNames = message.sheetNames;
    }
    if (message.selectedSheetIndex !== undefined && message.selectedSheetIndex !== 0) {
      obj.selectedSheetIndex = Math.round(message.selectedSheetIndex);
    }
    if (message.action !== undefined && message.action !== "") {
      obj.action = message.action;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestionStepOptionGoogleSheetsAddRowParam>, I>>(
    base?: I,
  ): SuggestionStepOptionGoogleSheetsAddRowParam {
    return SuggestionStepOptionGoogleSheetsAddRowParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestionStepOptionGoogleSheetsAddRowParam>, I>>(
    object: I,
  ): SuggestionStepOptionGoogleSheetsAddRowParam {
    const message = createBaseSuggestionStepOptionGoogleSheetsAddRowParam();
    message.url = object.url ?? "";
    message.sheetNames = object.sheetNames?.map((e) => e) || [];
    message.selectedSheetIndex = object.selectedSheetIndex ?? 0;
    message.action = object.action ?? "";
    return message;
  },
};

messageTypeRegistry.set(SuggestionStepOptionGoogleSheetsAddRowParam.$type, SuggestionStepOptionGoogleSheetsAddRowParam);

function createBaseSuggestionStepMode(): SuggestionStepMode {
  return { $type: "pb.v1alpha1.SuggestionStepMode", preliminaryExecution: false, review: false, complete: false };
}

export const SuggestionStepMode = {
  $type: "pb.v1alpha1.SuggestionStepMode" as const,

  encode(message: SuggestionStepMode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.preliminaryExecution !== undefined && message.preliminaryExecution !== false) {
      writer.uint32(8).bool(message.preliminaryExecution);
    }
    if (message.review !== undefined && message.review !== false) {
      writer.uint32(16).bool(message.review);
    }
    if (message.complete !== undefined && message.complete !== false) {
      writer.uint32(24).bool(message.complete);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestionStepMode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestionStepMode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.preliminaryExecution = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.review = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.complete = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuggestionStepMode {
    return {
      $type: SuggestionStepMode.$type,
      preliminaryExecution: isSet(object.preliminaryExecution)
        ? globalThis.Boolean(object.preliminaryExecution)
        : false,
      review: isSet(object.review) ? globalThis.Boolean(object.review) : false,
      complete: isSet(object.complete) ? globalThis.Boolean(object.complete) : false,
    };
  },

  toJSON(message: SuggestionStepMode): unknown {
    const obj: any = {};
    if (message.preliminaryExecution !== undefined && message.preliminaryExecution !== false) {
      obj.preliminaryExecution = message.preliminaryExecution;
    }
    if (message.review !== undefined && message.review !== false) {
      obj.review = message.review;
    }
    if (message.complete !== undefined && message.complete !== false) {
      obj.complete = message.complete;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestionStepMode>, I>>(base?: I): SuggestionStepMode {
    return SuggestionStepMode.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestionStepMode>, I>>(object: I): SuggestionStepMode {
    const message = createBaseSuggestionStepMode();
    message.preliminaryExecution = object.preliminaryExecution ?? false;
    message.review = object.review ?? false;
    message.complete = object.complete ?? false;
    return message;
  },
};

messageTypeRegistry.set(SuggestionStepMode.$type, SuggestionStepMode);

function createBaseSuggestionStepOptionParam(): SuggestionStepOptionParam {
  return { $type: "pb.v1alpha1.SuggestionStepOptionParam" };
}

export const SuggestionStepOptionParam = {
  $type: "pb.v1alpha1.SuggestionStepOptionParam" as const,

  encode(_: SuggestionStepOptionParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuggestionStepOptionParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuggestionStepOptionParam();
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

  fromJSON(_: any): SuggestionStepOptionParam {
    return { $type: SuggestionStepOptionParam.$type };
  },

  toJSON(_: SuggestionStepOptionParam): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SuggestionStepOptionParam>, I>>(base?: I): SuggestionStepOptionParam {
    return SuggestionStepOptionParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuggestionStepOptionParam>, I>>(_: I): SuggestionStepOptionParam {
    const message = createBaseSuggestionStepOptionParam();
    return message;
  },
};

messageTypeRegistry.set(SuggestionStepOptionParam.$type, SuggestionStepOptionParam);

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
