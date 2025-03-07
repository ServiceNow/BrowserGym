/* eslint-disable */
import _m0 from "protobufjs/minimal";
import {
  EmailParam,
  GDriveParam,
  GmailParam,
  GSheetsParam,
  SFTPParam,
  SpreadsheetParam,
} from "../../application/application_params";
import { Activity, activityFromJSON, activityToJSON } from "../../automation_mining/automation_mining";
import { Email, File } from "../../automation_mining/ontology/data_models";
import { Document } from "../../google/cloud/documentai/v1/document";
import { messageTypeRegistry } from "../../typeRegistry";
import { SmartAction, SmartActionHITLResult } from "../v1alpha1/actionprocessing";
import { WorkflowVariable } from "../v1alpha1/orbot_action";
import { Performance } from "../v1alpha1/performance";
import { DocClassificationParam, EntityExtractionParam, GenerateOutputParam } from "./workflow_steps_params";

export const protobufPackage = "pb.v1alpha2";

export interface ExecutionStep {
  $type?: "pb.v1alpha2.ExecutionStep";
  displayName?: string | undefined;
  performance?:
    | Performance
    | undefined;
  /**
   * Use document_uris instead of documents since we just need to store the uri of
   * the gcs file
   * Note: This field is kept for backward compatibility. Use document_uris instead.
   */
  documents?: Document[] | undefined;
  options?: ExecutionStepOption[] | undefined;
  activity?: Activity | undefined;
  email?: Email | undefined;
  file?: File | undefined;
  mode?:
    | ExecutionStepMode
    | undefined;
  /**
   * Use original_document_uris instead of original_documents since we just need to store the uri of
   * the gcs file
   * No Change in any document: empty array
   * Change in some/all Documents:
   * - If Document is modified, store all the original entities only
   * - If Document is not modified, store empty/nil object
   * Note: This field is kept for backward compatibility. Use original_document_uris instead.
   */
  originalDocuments?:
    | Document[]
    | undefined;
  /** Wrapper storing prediction results, eg, from document classification */
  predictionResult?:
    | PredictionResult
    | undefined;
  /** Stores the uri of the final documents */
  documentUris?:
    | string[]
    | undefined;
  /** Stores the uri of the original documents if they are modified. */
  originalDocumentUris?:
    | string[]
    | undefined;
  /** Stores the result of the execution step */
  result?: ExecutionStepResult | undefined;
  actionMetadata?: ExecutionStepActionMetadata | undefined;
}

/** Metadata related to the execution or the workflow. */
export interface ExecutionStepActionMetadata {
  $type?: "pb.v1alpha2.ExecutionStep.ActionMetadata";
  /** Unique identifier for the action in the workflow that created this review task. */
  actionId?:
    | string
    | undefined;
  /**
   * This field stores the indexes of the action in a loop, if applicable, since
   * some actions may have the same ID (for example, in a for loop).
   * This field is repeated because the action can be in a nested loop.
   * The first element in the array is the outermost index.
   */
  actionLoopIndexes?: number[] | undefined;
}

export interface ExecutionStepResult {
  $type?: "pb.v1alpha2.ExecutionStepResult";
  smartActionResult?: SmartActionHITLResult | undefined;
}

export interface ExecutionStepOption {
  $type?: "pb.v1alpha2.ExecutionStepOption";
  application?:
    | string
    | undefined;
  /** Do not use: For backward compatibility, will be removed once all logic is migrated to EmailParam. */
  gmail?: GmailParam | undefined;
  gdrive?: GDriveParam | undefined;
  gsheets?: GSheetsParam | undefined;
  classification?: DocClassificationParam | undefined;
  sftp?: SFTPParam | undefined;
  entityExtraction?: EntityExtractionParam | undefined;
  generateOutputParam?:
    | GenerateOutputParam
    | undefined;
  /**
   * GSheetsParam will be deprecated in favor of
   * SpreadsheetParam in the future to have a more generic name
   * to support other spreadsheet applications
   */
  spreadsheet?: SpreadsheetParam | undefined;
  email?:
    | EmailParam
    | undefined;
  /** This stores the actual request sent to the ML engine */
  smartAction?:
    | SmartAction
    | undefined;
  /** create proceeding execution after review is done */
  proceedingExecution?: ProceedingExecutionParam | undefined;
}

/** the process to execute after the result is reviewed */
export interface ProceedingExecutionParam {
  $type?: "pb.v1alpha2.ProceedingExecutionParam";
  workflowId?: string | undefined;
  processId?:
    | string
    | undefined;
  /** we need to add smartActionResult to the variables when creating the task. */
  variables?: WorkflowVariable[] | undefined;
}

export interface ExecutionStepMode {
  $type?: "pb.v1alpha2.ExecutionStepMode";
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

export interface PredictionResult {
  $type?: "pb.v1alpha2.PredictionResult";
  /**
   * Classification label signifying the document type of the document
   * as predicted by the ml-engine's classification workflow
   * Example categories: Amendment/SOW/SOWTNM etc
   */
  classificationLabel?:
    | string
    | undefined;
  /** only filled if original prediction is modified by user */
  originalClassificationLabel?:
    | string
    | undefined;
  /** confidence score  associated with the classification label */
  confidence?:
    | number
    | undefined;
  /** confidence score associated with the original classifcation label, if it is filled */
  originalConfidence?: number | undefined;
}

function createBaseExecutionStep(): ExecutionStep {
  return {
    $type: "pb.v1alpha2.ExecutionStep",
    displayName: "",
    performance: undefined,
    documents: [],
    options: [],
    activity: 0,
    email: undefined,
    file: undefined,
    mode: undefined,
    originalDocuments: [],
    predictionResult: undefined,
    documentUris: [],
    originalDocumentUris: [],
    result: undefined,
    actionMetadata: undefined,
  };
}

export const ExecutionStep = {
  $type: "pb.v1alpha2.ExecutionStep" as const,

  encode(message: ExecutionStep, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.performance !== undefined) {
      Performance.encode(message.performance, writer.uint32(18).fork()).ldelim();
    }
    if (message.documents !== undefined && message.documents.length !== 0) {
      for (const v of message.documents) {
        Document.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.options !== undefined && message.options.length !== 0) {
      for (const v of message.options) {
        ExecutionStepOption.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.activity !== undefined && message.activity !== 0) {
      writer.uint32(40).int32(message.activity);
    }
    if (message.email !== undefined) {
      Email.encode(message.email, writer.uint32(50).fork()).ldelim();
    }
    if (message.file !== undefined) {
      File.encode(message.file, writer.uint32(58).fork()).ldelim();
    }
    if (message.mode !== undefined) {
      ExecutionStepMode.encode(message.mode, writer.uint32(66).fork()).ldelim();
    }
    if (message.originalDocuments !== undefined && message.originalDocuments.length !== 0) {
      for (const v of message.originalDocuments) {
        Document.encode(v!, writer.uint32(74).fork()).ldelim();
      }
    }
    if (message.predictionResult !== undefined) {
      PredictionResult.encode(message.predictionResult, writer.uint32(82).fork()).ldelim();
    }
    if (message.documentUris !== undefined && message.documentUris.length !== 0) {
      for (const v of message.documentUris) {
        writer.uint32(90).string(v!);
      }
    }
    if (message.originalDocumentUris !== undefined && message.originalDocumentUris.length !== 0) {
      for (const v of message.originalDocumentUris) {
        writer.uint32(98).string(v!);
      }
    }
    if (message.result !== undefined) {
      ExecutionStepResult.encode(message.result, writer.uint32(106).fork()).ldelim();
    }
    if (message.actionMetadata !== undefined) {
      ExecutionStepActionMetadata.encode(message.actionMetadata, writer.uint32(114).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecutionStep {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutionStep();
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

          message.performance = Performance.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.documents!.push(Document.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.options!.push(ExecutionStepOption.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.activity = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.email = Email.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.file = File.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.mode = ExecutionStepMode.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.originalDocuments!.push(Document.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.predictionResult = PredictionResult.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.documentUris!.push(reader.string());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.originalDocumentUris!.push(reader.string());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.result = ExecutionStepResult.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.actionMetadata = ExecutionStepActionMetadata.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecutionStep {
    return {
      $type: ExecutionStep.$type,
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      performance: isSet(object.performance) ? Performance.fromJSON(object.performance) : undefined,
      documents: globalThis.Array.isArray(object?.documents)
        ? object.documents.map((e: any) => Document.fromJSON(e))
        : [],
      options: globalThis.Array.isArray(object?.options)
        ? object.options.map((e: any) => ExecutionStepOption.fromJSON(e))
        : [],
      activity: isSet(object.activity) ? activityFromJSON(object.activity) : 0,
      email: isSet(object.email) ? Email.fromJSON(object.email) : undefined,
      file: isSet(object.file) ? File.fromJSON(object.file) : undefined,
      mode: isSet(object.mode) ? ExecutionStepMode.fromJSON(object.mode) : undefined,
      originalDocuments: globalThis.Array.isArray(object?.originalDocuments)
        ? object.originalDocuments.map((e: any) => Document.fromJSON(e))
        : [],
      predictionResult: isSet(object.predictionResult) ? PredictionResult.fromJSON(object.predictionResult) : undefined,
      documentUris: globalThis.Array.isArray(object?.documentUris)
        ? object.documentUris.map((e: any) => globalThis.String(e))
        : [],
      originalDocumentUris: globalThis.Array.isArray(object?.originalDocumentUris)
        ? object.originalDocumentUris.map((e: any) => globalThis.String(e))
        : [],
      result: isSet(object.result) ? ExecutionStepResult.fromJSON(object.result) : undefined,
      actionMetadata: isSet(object.actionMetadata)
        ? ExecutionStepActionMetadata.fromJSON(object.actionMetadata)
        : undefined,
    };
  },

  toJSON(message: ExecutionStep): unknown {
    const obj: any = {};
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.performance !== undefined) {
      obj.performance = Performance.toJSON(message.performance);
    }
    if (message.documents?.length) {
      obj.documents = message.documents.map((e) => Document.toJSON(e));
    }
    if (message.options?.length) {
      obj.options = message.options.map((e) => ExecutionStepOption.toJSON(e));
    }
    if (message.activity !== undefined && message.activity !== 0) {
      obj.activity = activityToJSON(message.activity);
    }
    if (message.email !== undefined) {
      obj.email = Email.toJSON(message.email);
    }
    if (message.file !== undefined) {
      obj.file = File.toJSON(message.file);
    }
    if (message.mode !== undefined) {
      obj.mode = ExecutionStepMode.toJSON(message.mode);
    }
    if (message.originalDocuments?.length) {
      obj.originalDocuments = message.originalDocuments.map((e) => Document.toJSON(e));
    }
    if (message.predictionResult !== undefined) {
      obj.predictionResult = PredictionResult.toJSON(message.predictionResult);
    }
    if (message.documentUris?.length) {
      obj.documentUris = message.documentUris;
    }
    if (message.originalDocumentUris?.length) {
      obj.originalDocumentUris = message.originalDocumentUris;
    }
    if (message.result !== undefined) {
      obj.result = ExecutionStepResult.toJSON(message.result);
    }
    if (message.actionMetadata !== undefined) {
      obj.actionMetadata = ExecutionStepActionMetadata.toJSON(message.actionMetadata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecutionStep>, I>>(base?: I): ExecutionStep {
    return ExecutionStep.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExecutionStep>, I>>(object: I): ExecutionStep {
    const message = createBaseExecutionStep();
    message.displayName = object.displayName ?? "";
    message.performance = (object.performance !== undefined && object.performance !== null)
      ? Performance.fromPartial(object.performance)
      : undefined;
    message.documents = object.documents?.map((e) => Document.fromPartial(e)) || [];
    message.options = object.options?.map((e) => ExecutionStepOption.fromPartial(e)) || [];
    message.activity = object.activity ?? 0;
    message.email = (object.email !== undefined && object.email !== null) ? Email.fromPartial(object.email) : undefined;
    message.file = (object.file !== undefined && object.file !== null) ? File.fromPartial(object.file) : undefined;
    message.mode = (object.mode !== undefined && object.mode !== null)
      ? ExecutionStepMode.fromPartial(object.mode)
      : undefined;
    message.originalDocuments = object.originalDocuments?.map((e) => Document.fromPartial(e)) || [];
    message.predictionResult = (object.predictionResult !== undefined && object.predictionResult !== null)
      ? PredictionResult.fromPartial(object.predictionResult)
      : undefined;
    message.documentUris = object.documentUris?.map((e) => e) || [];
    message.originalDocumentUris = object.originalDocumentUris?.map((e) => e) || [];
    message.result = (object.result !== undefined && object.result !== null)
      ? ExecutionStepResult.fromPartial(object.result)
      : undefined;
    message.actionMetadata = (object.actionMetadata !== undefined && object.actionMetadata !== null)
      ? ExecutionStepActionMetadata.fromPartial(object.actionMetadata)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ExecutionStep.$type, ExecutionStep);

function createBaseExecutionStepActionMetadata(): ExecutionStepActionMetadata {
  return { $type: "pb.v1alpha2.ExecutionStep.ActionMetadata", actionId: "", actionLoopIndexes: [] };
}

export const ExecutionStepActionMetadata = {
  $type: "pb.v1alpha2.ExecutionStep.ActionMetadata" as const,

  encode(message: ExecutionStepActionMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.actionId !== undefined && message.actionId !== "") {
      writer.uint32(10).string(message.actionId);
    }
    if (message.actionLoopIndexes !== undefined && message.actionLoopIndexes.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.actionLoopIndexes) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecutionStepActionMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutionStepActionMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.actionId = reader.string();
          continue;
        case 2:
          if (tag === 16) {
            message.actionLoopIndexes!.push(reader.int32());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.actionLoopIndexes!.push(reader.int32());
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

  fromJSON(object: any): ExecutionStepActionMetadata {
    return {
      $type: ExecutionStepActionMetadata.$type,
      actionId: isSet(object.actionId) ? globalThis.String(object.actionId) : "",
      actionLoopIndexes: globalThis.Array.isArray(object?.actionLoopIndexes)
        ? object.actionLoopIndexes.map((e: any) => globalThis.Number(e))
        : [],
    };
  },

  toJSON(message: ExecutionStepActionMetadata): unknown {
    const obj: any = {};
    if (message.actionId !== undefined && message.actionId !== "") {
      obj.actionId = message.actionId;
    }
    if (message.actionLoopIndexes?.length) {
      obj.actionLoopIndexes = message.actionLoopIndexes.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecutionStepActionMetadata>, I>>(base?: I): ExecutionStepActionMetadata {
    return ExecutionStepActionMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExecutionStepActionMetadata>, I>>(object: I): ExecutionStepActionMetadata {
    const message = createBaseExecutionStepActionMetadata();
    message.actionId = object.actionId ?? "";
    message.actionLoopIndexes = object.actionLoopIndexes?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(ExecutionStepActionMetadata.$type, ExecutionStepActionMetadata);

function createBaseExecutionStepResult(): ExecutionStepResult {
  return { $type: "pb.v1alpha2.ExecutionStepResult", smartActionResult: undefined };
}

export const ExecutionStepResult = {
  $type: "pb.v1alpha2.ExecutionStepResult" as const,

  encode(message: ExecutionStepResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.smartActionResult !== undefined) {
      SmartActionHITLResult.encode(message.smartActionResult, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecutionStepResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutionStepResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.smartActionResult = SmartActionHITLResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecutionStepResult {
    return {
      $type: ExecutionStepResult.$type,
      smartActionResult: isSet(object.smartActionResult)
        ? SmartActionHITLResult.fromJSON(object.smartActionResult)
        : undefined,
    };
  },

  toJSON(message: ExecutionStepResult): unknown {
    const obj: any = {};
    if (message.smartActionResult !== undefined) {
      obj.smartActionResult = SmartActionHITLResult.toJSON(message.smartActionResult);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecutionStepResult>, I>>(base?: I): ExecutionStepResult {
    return ExecutionStepResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExecutionStepResult>, I>>(object: I): ExecutionStepResult {
    const message = createBaseExecutionStepResult();
    message.smartActionResult = (object.smartActionResult !== undefined && object.smartActionResult !== null)
      ? SmartActionHITLResult.fromPartial(object.smartActionResult)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ExecutionStepResult.$type, ExecutionStepResult);

function createBaseExecutionStepOption(): ExecutionStepOption {
  return {
    $type: "pb.v1alpha2.ExecutionStepOption",
    application: "",
    gmail: undefined,
    gdrive: undefined,
    gsheets: undefined,
    classification: undefined,
    sftp: undefined,
    entityExtraction: undefined,
    generateOutputParam: undefined,
    spreadsheet: undefined,
    email: undefined,
    smartAction: undefined,
    proceedingExecution: undefined,
  };
}

export const ExecutionStepOption = {
  $type: "pb.v1alpha2.ExecutionStepOption" as const,

  encode(message: ExecutionStepOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.application !== undefined && message.application !== "") {
      writer.uint32(10).string(message.application);
    }
    if (message.gmail !== undefined) {
      GmailParam.encode(message.gmail, writer.uint32(18).fork()).ldelim();
    }
    if (message.gdrive !== undefined) {
      GDriveParam.encode(message.gdrive, writer.uint32(26).fork()).ldelim();
    }
    if (message.gsheets !== undefined) {
      GSheetsParam.encode(message.gsheets, writer.uint32(34).fork()).ldelim();
    }
    if (message.classification !== undefined) {
      DocClassificationParam.encode(message.classification, writer.uint32(42).fork()).ldelim();
    }
    if (message.sftp !== undefined) {
      SFTPParam.encode(message.sftp, writer.uint32(50).fork()).ldelim();
    }
    if (message.entityExtraction !== undefined) {
      EntityExtractionParam.encode(message.entityExtraction, writer.uint32(58).fork()).ldelim();
    }
    if (message.generateOutputParam !== undefined) {
      GenerateOutputParam.encode(message.generateOutputParam, writer.uint32(66).fork()).ldelim();
    }
    if (message.spreadsheet !== undefined) {
      SpreadsheetParam.encode(message.spreadsheet, writer.uint32(74).fork()).ldelim();
    }
    if (message.email !== undefined) {
      EmailParam.encode(message.email, writer.uint32(82).fork()).ldelim();
    }
    if (message.smartAction !== undefined) {
      SmartAction.encode(message.smartAction, writer.uint32(90).fork()).ldelim();
    }
    if (message.proceedingExecution !== undefined) {
      ProceedingExecutionParam.encode(message.proceedingExecution, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecutionStepOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutionStepOption();
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

          message.gmail = GmailParam.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.gdrive = GDriveParam.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.gsheets = GSheetsParam.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.classification = DocClassificationParam.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.sftp = SFTPParam.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.entityExtraction = EntityExtractionParam.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.generateOutputParam = GenerateOutputParam.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.spreadsheet = SpreadsheetParam.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.email = EmailParam.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.smartAction = SmartAction.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.proceedingExecution = ProceedingExecutionParam.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecutionStepOption {
    return {
      $type: ExecutionStepOption.$type,
      application: isSet(object.application) ? globalThis.String(object.application) : "",
      gmail: isSet(object.gmail) ? GmailParam.fromJSON(object.gmail) : undefined,
      gdrive: isSet(object.gdrive) ? GDriveParam.fromJSON(object.gdrive) : undefined,
      gsheets: isSet(object.gsheets) ? GSheetsParam.fromJSON(object.gsheets) : undefined,
      classification: isSet(object.classification) ? DocClassificationParam.fromJSON(object.classification) : undefined,
      sftp: isSet(object.sftp) ? SFTPParam.fromJSON(object.sftp) : undefined,
      entityExtraction: isSet(object.entityExtraction)
        ? EntityExtractionParam.fromJSON(object.entityExtraction)
        : undefined,
      generateOutputParam: isSet(object.generateOutputParam)
        ? GenerateOutputParam.fromJSON(object.generateOutputParam)
        : undefined,
      spreadsheet: isSet(object.spreadsheet) ? SpreadsheetParam.fromJSON(object.spreadsheet) : undefined,
      email: isSet(object.email) ? EmailParam.fromJSON(object.email) : undefined,
      smartAction: isSet(object.smartAction) ? SmartAction.fromJSON(object.smartAction) : undefined,
      proceedingExecution: isSet(object.proceedingExecution)
        ? ProceedingExecutionParam.fromJSON(object.proceedingExecution)
        : undefined,
    };
  },

  toJSON(message: ExecutionStepOption): unknown {
    const obj: any = {};
    if (message.application !== undefined && message.application !== "") {
      obj.application = message.application;
    }
    if (message.gmail !== undefined) {
      obj.gmail = GmailParam.toJSON(message.gmail);
    }
    if (message.gdrive !== undefined) {
      obj.gdrive = GDriveParam.toJSON(message.gdrive);
    }
    if (message.gsheets !== undefined) {
      obj.gsheets = GSheetsParam.toJSON(message.gsheets);
    }
    if (message.classification !== undefined) {
      obj.classification = DocClassificationParam.toJSON(message.classification);
    }
    if (message.sftp !== undefined) {
      obj.sftp = SFTPParam.toJSON(message.sftp);
    }
    if (message.entityExtraction !== undefined) {
      obj.entityExtraction = EntityExtractionParam.toJSON(message.entityExtraction);
    }
    if (message.generateOutputParam !== undefined) {
      obj.generateOutputParam = GenerateOutputParam.toJSON(message.generateOutputParam);
    }
    if (message.spreadsheet !== undefined) {
      obj.spreadsheet = SpreadsheetParam.toJSON(message.spreadsheet);
    }
    if (message.email !== undefined) {
      obj.email = EmailParam.toJSON(message.email);
    }
    if (message.smartAction !== undefined) {
      obj.smartAction = SmartAction.toJSON(message.smartAction);
    }
    if (message.proceedingExecution !== undefined) {
      obj.proceedingExecution = ProceedingExecutionParam.toJSON(message.proceedingExecution);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecutionStepOption>, I>>(base?: I): ExecutionStepOption {
    return ExecutionStepOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExecutionStepOption>, I>>(object: I): ExecutionStepOption {
    const message = createBaseExecutionStepOption();
    message.application = object.application ?? "";
    message.gmail = (object.gmail !== undefined && object.gmail !== null)
      ? GmailParam.fromPartial(object.gmail)
      : undefined;
    message.gdrive = (object.gdrive !== undefined && object.gdrive !== null)
      ? GDriveParam.fromPartial(object.gdrive)
      : undefined;
    message.gsheets = (object.gsheets !== undefined && object.gsheets !== null)
      ? GSheetsParam.fromPartial(object.gsheets)
      : undefined;
    message.classification = (object.classification !== undefined && object.classification !== null)
      ? DocClassificationParam.fromPartial(object.classification)
      : undefined;
    message.sftp = (object.sftp !== undefined && object.sftp !== null) ? SFTPParam.fromPartial(object.sftp) : undefined;
    message.entityExtraction = (object.entityExtraction !== undefined && object.entityExtraction !== null)
      ? EntityExtractionParam.fromPartial(object.entityExtraction)
      : undefined;
    message.generateOutputParam = (object.generateOutputParam !== undefined && object.generateOutputParam !== null)
      ? GenerateOutputParam.fromPartial(object.generateOutputParam)
      : undefined;
    message.spreadsheet = (object.spreadsheet !== undefined && object.spreadsheet !== null)
      ? SpreadsheetParam.fromPartial(object.spreadsheet)
      : undefined;
    message.email = (object.email !== undefined && object.email !== null)
      ? EmailParam.fromPartial(object.email)
      : undefined;
    message.smartAction = (object.smartAction !== undefined && object.smartAction !== null)
      ? SmartAction.fromPartial(object.smartAction)
      : undefined;
    message.proceedingExecution = (object.proceedingExecution !== undefined && object.proceedingExecution !== null)
      ? ProceedingExecutionParam.fromPartial(object.proceedingExecution)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ExecutionStepOption.$type, ExecutionStepOption);

function createBaseProceedingExecutionParam(): ProceedingExecutionParam {
  return { $type: "pb.v1alpha2.ProceedingExecutionParam", workflowId: "", processId: "", variables: [] };
}

export const ProceedingExecutionParam = {
  $type: "pb.v1alpha2.ProceedingExecutionParam" as const,

  encode(message: ProceedingExecutionParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(10).string(message.workflowId);
    }
    if (message.processId !== undefined && message.processId !== "") {
      writer.uint32(18).string(message.processId);
    }
    if (message.variables !== undefined && message.variables.length !== 0) {
      for (const v of message.variables) {
        WorkflowVariable.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProceedingExecutionParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProceedingExecutionParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflowId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.processId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.variables!.push(WorkflowVariable.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProceedingExecutionParam {
    return {
      $type: ProceedingExecutionParam.$type,
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      processId: isSet(object.processId) ? globalThis.String(object.processId) : "",
      variables: globalThis.Array.isArray(object?.variables)
        ? object.variables.map((e: any) => WorkflowVariable.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ProceedingExecutionParam): unknown {
    const obj: any = {};
    if (message.workflowId !== undefined && message.workflowId !== "") {
      obj.workflowId = message.workflowId;
    }
    if (message.processId !== undefined && message.processId !== "") {
      obj.processId = message.processId;
    }
    if (message.variables?.length) {
      obj.variables = message.variables.map((e) => WorkflowVariable.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProceedingExecutionParam>, I>>(base?: I): ProceedingExecutionParam {
    return ProceedingExecutionParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProceedingExecutionParam>, I>>(object: I): ProceedingExecutionParam {
    const message = createBaseProceedingExecutionParam();
    message.workflowId = object.workflowId ?? "";
    message.processId = object.processId ?? "";
    message.variables = object.variables?.map((e) => WorkflowVariable.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ProceedingExecutionParam.$type, ProceedingExecutionParam);

function createBaseExecutionStepMode(): ExecutionStepMode {
  return { $type: "pb.v1alpha2.ExecutionStepMode", review: false, complete: false };
}

export const ExecutionStepMode = {
  $type: "pb.v1alpha2.ExecutionStepMode" as const,

  encode(message: ExecutionStepMode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.review !== undefined && message.review !== false) {
      writer.uint32(8).bool(message.review);
    }
    if (message.complete !== undefined && message.complete !== false) {
      writer.uint32(16).bool(message.complete);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecutionStepMode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutionStepMode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.review = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
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

  fromJSON(object: any): ExecutionStepMode {
    return {
      $type: ExecutionStepMode.$type,
      review: isSet(object.review) ? globalThis.Boolean(object.review) : false,
      complete: isSet(object.complete) ? globalThis.Boolean(object.complete) : false,
    };
  },

  toJSON(message: ExecutionStepMode): unknown {
    const obj: any = {};
    if (message.review !== undefined && message.review !== false) {
      obj.review = message.review;
    }
    if (message.complete !== undefined && message.complete !== false) {
      obj.complete = message.complete;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecutionStepMode>, I>>(base?: I): ExecutionStepMode {
    return ExecutionStepMode.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExecutionStepMode>, I>>(object: I): ExecutionStepMode {
    const message = createBaseExecutionStepMode();
    message.review = object.review ?? false;
    message.complete = object.complete ?? false;
    return message;
  },
};

messageTypeRegistry.set(ExecutionStepMode.$type, ExecutionStepMode);

function createBasePredictionResult(): PredictionResult {
  return {
    $type: "pb.v1alpha2.PredictionResult",
    classificationLabel: "",
    originalClassificationLabel: "",
    confidence: 0,
    originalConfidence: 0,
  };
}

export const PredictionResult = {
  $type: "pb.v1alpha2.PredictionResult" as const,

  encode(message: PredictionResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classificationLabel !== undefined && message.classificationLabel !== "") {
      writer.uint32(10).string(message.classificationLabel);
    }
    if (message.originalClassificationLabel !== undefined && message.originalClassificationLabel !== "") {
      writer.uint32(18).string(message.originalClassificationLabel);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(29).float(message.confidence);
    }
    if (message.originalConfidence !== undefined && message.originalConfidence !== 0) {
      writer.uint32(37).float(message.originalConfidence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PredictionResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePredictionResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classificationLabel = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.originalClassificationLabel = reader.string();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.confidence = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.originalConfidence = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PredictionResult {
    return {
      $type: PredictionResult.$type,
      classificationLabel: isSet(object.classificationLabel) ? globalThis.String(object.classificationLabel) : "",
      originalClassificationLabel: isSet(object.originalClassificationLabel)
        ? globalThis.String(object.originalClassificationLabel)
        : "",
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
      originalConfidence: isSet(object.originalConfidence) ? globalThis.Number(object.originalConfidence) : 0,
    };
  },

  toJSON(message: PredictionResult): unknown {
    const obj: any = {};
    if (message.classificationLabel !== undefined && message.classificationLabel !== "") {
      obj.classificationLabel = message.classificationLabel;
    }
    if (message.originalClassificationLabel !== undefined && message.originalClassificationLabel !== "") {
      obj.originalClassificationLabel = message.originalClassificationLabel;
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    if (message.originalConfidence !== undefined && message.originalConfidence !== 0) {
      obj.originalConfidence = message.originalConfidence;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PredictionResult>, I>>(base?: I): PredictionResult {
    return PredictionResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PredictionResult>, I>>(object: I): PredictionResult {
    const message = createBasePredictionResult();
    message.classificationLabel = object.classificationLabel ?? "";
    message.originalClassificationLabel = object.originalClassificationLabel ?? "";
    message.confidence = object.confidence ?? 0;
    message.originalConfidence = object.originalConfidence ?? 0;
    return message;
  },
};

messageTypeRegistry.set(PredictionResult.$type, PredictionResult);

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
