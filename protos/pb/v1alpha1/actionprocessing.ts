/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Hyperparameter } from "../../common/hyperparameter";
import { messageTypeRegistry } from "../../typeRegistry";
import { Document } from "./document";
import { Field, FieldGroup } from "./field";

export const protobufPackage = "pb.v1alpha1";

/**
 * Extract fields from a document.
 * Currently only used in document processing.
 */
export interface ExtractFields {
  $type?: "pb.v1alpha1.ExtractFields";
  /**
   * Deprecated: Use the `source` field instead.
   *
   * @deprecated
   */
  fields?:
    | Field[]
    | undefined;
  /** @deprecated */
  document?: Document | undefined;
  rule?: string | undefined;
  source?: ItemDocument | undefined;
}

/** Extract fields from a document. */
export interface ExtractFieldsRequestUnified {
  $type?: "pb.v1alpha1.ExtractFieldsRequestUnified";
  rule?: string | undefined;
  source?: ExtractionDocument | undefined;
}

/** Extracted fields from a document. */
export interface ExtractFieldsResult {
  $type?: "pb.v1alpha1.ExtractFieldsResult";
  results?:
    | ExtractFieldsResultPerFieldResult[]
    | undefined;
  /**
   * GCS file path for the DocumentAI document Protobuf binary file, which is
   * used in the following places:
   * 1. showing location for the extracted entities in the docprocessing HITL UI
   * 2. used as the input format for the current few-shot learning pipline
   *
   * The file is generated on the ML side, gets persisted in a temporary ML GCS
   * bucket. When it gets passed back on the server side, we would copy it to a
   * permanent GCS location. We also update this field to the permanent GCS path
   * before saving it to MongoDB and then get populated in ClickHouse. For ML
   * few-shot learning, we query the ClickHouse and read the file from this
   * updated field.
   *
   * NOTE that the extracted entities information are duplicated between this
   * file and ExtractedFieldsResult.results. We need to make sure the information
   * is in sync in two places:
   * 1. when generating the protobuf files on the ML side.
   * 2. when updating the fields on the HITL UI, we need to update both the
   *    results field and the protobuf file.
   * The main reasons we are duplicating the information are that we have more
   * control over our Protobuf messages, and we may consider moving away from
   * the DocumentAI messages in the future.
   */
  docaiProtoPath?: string | undefined;
}

/** new format to account for per-field confidence scores */
export interface ExtractFieldsResultPerFieldResult {
  $type?: "pb.v1alpha1.ExtractFieldsResult.PerFieldResult";
  extractedField?:
    | Field
    | undefined;
  /** per-field confidence score */
  confidence?: number | undefined;
}

/** Extracted fields from a document. */
export interface ExtractFieldsResultUnified {
  $type?: "pb.v1alpha1.ExtractFieldsResultUnified";
  result?: ExtractionDocument | undefined;
}

/**
 * Validate the values between form data and a document.
 * Currently only used in document processing.
 */
export interface ValidateFieldValues {
  $type?: "pb.v1alpha1.ValidateFieldValues";
  /**
   * Deprecated: Use the `source` and `target` fields instead.
   *
   * @deprecated
   */
  document?:
    | Document
    | undefined;
  /** @deprecated */
  fields?: Field[] | undefined;
  rule?:
    | string
    | undefined;
  /**
   * Source is considered as the ground truth for the validation
   * It may contain additional fields as extra context
   */
  source?:
    | Item
    | undefined;
  /**
   * Target is the data to be validated
   * It may contain additional fields as extra context
   */
  target?:
    | Item
    | undefined;
  /** List of field names to be validated */
  validateFields?: string[] | undefined;
}

/** Result of validation between form data and a document. */
export interface ValidateFieldValuesResult {
  $type?: "pb.v1alpha1.ValidateFieldValuesResult";
  results?:
    | ValidateFieldValuesResultPerFieldResult[]
    | undefined;
  /**
   * Keep the following global fields to be backward-compatible
   * TODO: remove the fields after all installations are upgraded
   */
  status?: ValidateFieldValuesResultStatus | undefined;
  confidence?: number | undefined;
  explanation?: string | undefined;
  extractedFields?: Field[] | undefined;
}

export enum ValidateFieldValuesResultStatus {
  UNSPECIFIED = 0,
  MATCH = 1,
  MISMATCH = 2,
  UNRECOGNIZED = -1,
}

export function validateFieldValuesResultStatusFromJSON(object: any): ValidateFieldValuesResultStatus {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return ValidateFieldValuesResultStatus.UNSPECIFIED;
    case 1:
    case "MATCH":
      return ValidateFieldValuesResultStatus.MATCH;
    case 2:
    case "MISMATCH":
      return ValidateFieldValuesResultStatus.MISMATCH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ValidateFieldValuesResultStatus.UNRECOGNIZED;
  }
}

export function validateFieldValuesResultStatusToJSON(object: ValidateFieldValuesResultStatus): string {
  switch (object) {
    case ValidateFieldValuesResultStatus.UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case ValidateFieldValuesResultStatus.MATCH:
      return "MATCH";
    case ValidateFieldValuesResultStatus.MISMATCH:
      return "MISMATCH";
    case ValidateFieldValuesResultStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ValidateFieldValuesResultPerFieldResult {
  $type?: "pb.v1alpha1.ValidateFieldValuesResult.PerFieldResult";
  extractedField?: Field | undefined;
  status?:
    | ValidateFieldValuesResultStatus
    | undefined;
  /** Text explaining why the extracted value does not match. */
  explanation?:
    | string
    | undefined;
  /** per-field confidence score */
  confidence?: number | undefined;
}

/** Flag the given keywords in documents and form fields. */
export interface FlagKeywords {
  $type?: "pb.v1alpha1.FlagKeywords";
  keywords?: string[] | undefined;
  fieldGroups?: FieldGroup[] | undefined;
  documents?: Document[] | undefined;
  rule?: string | undefined;
}

/** Keywords flagged. */
export interface FlagKeywordsResult {
  $type?: "pb.v1alpha1.FlagKeywordsResult";
  results?:
    | FlagKeywordsResultResult[]
    | undefined;
  /** TODO: remove it after all installations are upgraded */
  detectedKeywords?: string[] | undefined;
}

/** For keywords detected in field groups, we return the per-field result */
export interface FlagKeywordsResultFieldResult {
  $type?: "pb.v1alpha1.FlagKeywordsResult.FieldResult";
  fieldGroupIndex?: number | undefined;
  fieldIndex?: number | undefined;
  detectedKeywords?: string[] | undefined;
}

/** For keywords detected in a document, we return the per-page results. */
export interface FlagKeywordsResultDocumentResult {
  $type?: "pb.v1alpha1.FlagKeywordsResult.DocumentResult";
  documentIndex?:
    | number
    | undefined;
  /** 1-based index similar to DocAI */
  pageNumber?: number | undefined;
  detectedKeywords?: string[] | undefined;
}

export interface FlagKeywordsResultResult {
  $type?: "pb.v1alpha1.FlagKeywordsResult.Result";
  fieldResult?: FlagKeywordsResultFieldResult | undefined;
  documentResult?: FlagKeywordsResultDocumentResult | undefined;
}

/**
 * A single item can contain one or more (structured) field groups, and one or
 * more (unstructured) documents. The field groups can either represent one or
 * more HTML forms, or one or more rows in a data table.
 *
 * This aims to be a generic data structure that can be used in a wide range of
 * applications.
 *
 * For example, an expense item can have the following
 *   1. fields from user provided form
 *   2. fields provided by the credit card system
 *   3. user submitted receipt files
 * each of the them can contain some information about the expense, such as
 * merchant name, amount, some identifier etc.
 *
 * Another example is for purchasing order reconciliation, where an item can
 * contain a data table that contains line items and a optional PDF document
 * (such as receipt PDF).
 */
export interface Item {
  $type?: "pb.v1alpha1.Item";
  /** it can come from one or more forms, or rows from a single HTML table */
  fieldGroups?: FieldGroup[] | undefined;
  documents?: ItemDocument[] | undefined;
  smartActionRecords?: SmartActionRequestAndResult[] | undefined;
}

/**
 * Set of entities. Some can be partially filled and some needed to be extracted
 * from  the attached documents.
 */
export interface EnrichEntitiesRequest {
  $type?: "pb.v1alpha1.EnrichEntitiesRequest";
  /** Already extracted entities. */
  fieldGroup?:
    | FieldGroup
    | undefined;
  /**
   * List of documents and fields to extract in each. Different fields can come from
   * different documents.
   */
  documents?: ExtractionDocument[] | undefined;
}

/** A supporting document for an item which contains metadata */
export interface ItemDocument {
  $type?: "pb.v1alpha1.ItemDocument";
  document?:
    | Document
    | undefined;
  /** List of fields we expect to extract and use for reconciliation from document */
  fields?: Field[] | undefined;
}

/**
 * Represents a document unit as a whole, containing other related infrmation like
 * the expected schema for extraction, and the extracted entities.
 */
export interface ExtractionDocument {
  $type?: "pb.v1alpha1.ExtractionDocument";
  /** The document to extract from. */
  document?:
    | Document
    | undefined;
  /** Extracted fields from the document. */
  fieldGroup?: FieldGroup | undefined;
}

export interface SmartActionRequestAndResult {
  $type?: "pb.v1alpha1.SmartActionRequestAndResult";
  request?: ProcessSmartActionsRequest | undefined;
  result?: SmartActionResult | undefined;
}

export interface FieldGroupMatch {
  $type?: "pb.v1alpha1.FieldGroupMatch";
  match?: FieldGroupMatchMatchedFieldGroup | undefined;
  unmatchedSource?: FieldGroupMatchUnmatchedFieldGroup | undefined;
  unmatchedTarget?: FieldGroupMatchUnmatchedFieldGroup | undefined;
  confidence?:
    | number
    | undefined;
  /** natural language explanation for the match/unmatch prediction. */
  explanation?: string | undefined;
}

/**
 * depending on the use case, there might be 1:N mapping to N:1 mapping between
 * source groups and target groups. For those cases, there would be N entries
 * of the FiledGroupMatch, each with it's own confidence score.
 */
export interface FieldGroupMatchMatchedFieldGroup {
  $type?: "pb.v1alpha1.FieldGroupMatch.MatchedFieldGroup";
  sourceIndex?: number | undefined;
  targetIndex?:
    | number
    | undefined;
  /** optionally, we can update some fields on the source side for the match. */
  sourceFieldUpdates?:
    | Field[]
    | undefined;
  /**
   * indicate that we cannot generate field updates to match the target fields
   * and human review is required. For the case of JLL, the field is set when
   * we cannot generate the updates required to set the quantity filed by
   * dividing amount by unit cost.
   * Note: this field is independent from the matching confidence. i.e. we could
   * have both high and low confidence of matching when this field is set.
   */
  updateError?: string | undefined;
}

/** Unmatched field group either on the source side on the target side. */
export interface FieldGroupMatchUnmatchedFieldGroup {
  $type?: "pb.v1alpha1.FieldGroupMatch.UnmatchedFieldGroup";
  index?: number | undefined;
}

/** Represents a match (or mismatch) between a source field and a target field. */
export interface FieldMatch {
  $type?: "pb.v1alpha1.FieldMatch";
  /**
   * Unique identifier of the source field. Leave empty to indicate an unmatched
   * target field.
   */
  sourceId?:
    | string
    | undefined;
  /**
   * Unique identifier of the target field. Leave empty to indicate an unmatched
   * source field
   */
  targetId?:
    | string
    | undefined;
  /**
   * Optional update to the source field to improve the match.
   * To indicate no update, do not set this field i.e. leave it empty.
   * To update the nested fields, set the nested fields in the update.
   */
  updatedSourceField?:
    | Field
    | undefined;
  /**
   * Indicates that automatic field updates failed and human review is needed
   * to match the target field. This is independent of the matching confidence. i.e.
   * we could have both high and low confidence of matching when this field is set.
   */
  updateError?:
    | string
    | undefined;
  /** Confidence score for the match (or mismatch). */
  confidence?:
    | number
    | undefined;
  /** Natural language explanation for the match/unmatch prediction. */
  explanation?: string | undefined;
}

/** Detect duplicate line items. */
export interface DetectDuplicateLineItems {
  $type?: "pb.v1alpha1.DetectDuplicateLineItems";
  items?: Item[] | undefined;
  rule?: string | undefined;
}

/** Duplicate line items detected. */
export interface DetectDuplicateLineItemsResult {
  $type?: "pb.v1alpha1.DetectDuplicateLineItemsResult";
  /** we may find zero or more duplicate groups from the table */
  duplicates?:
    | DetectDuplicateLineItemsResultDuplicateGroup[]
    | undefined;
  /** overall confidence score for all predicted duplicates */
  confidence?: number | undefined;
}

/** a duplicate group contains at least two row indices. */
export interface DetectDuplicateLineItemsResultDuplicateGroup {
  $type?: "pb.v1alpha1.DetectDuplicateLineItemsResult.DuplicateGroup";
  /** 0-based row indices from the given table */
  itemIndices?:
    | number[]
    | undefined;
  /** reason on why we think this is a duplicate */
  explanation?: string | undefined;
}

/**
 * Generate some text given some context (FieldGroups or documents)
 * and a prompt.
 */
export interface GenerateText {
  $type?: "pb.v1alpha1.GenerateText";
  items?: Item[] | undefined;
  prompt?: string | undefined;
}

/** AI generated text. */
export interface GenerateTextResult {
  $type?: "pb.v1alpha1.GenerateTextResult";
  generatedText?: string | undefined;
  confidence?: number | undefined;
}

export interface Classify {
  $type?: "pb.v1alpha1.Classify";
  items?: Item[] | undefined;
  prompt?: string | undefined;
  preset?: ClassifyClassifyPreset | undefined;
}

/**
 * Predefined operations that have optimized implementation from the ML side.
 * Each preset has its predefined prompt and preferred input format.
 * If preset is defined, the prompt field is optional.
 */
export enum ClassifyClassifyPreset {
  UNSPECIFIED = 0,
  /**
   * GOOGLE_EXPENSE_RISK - predict risk level for Google Concur expense auditing.
   * - input: would be either expense form or list of expenses
   * - output: binary prediction and confidence score can be interpreted as
   *   risk level (higher confidence means higher risk)
   */
  GOOGLE_EXPENSE_RISK = 1,
  /**
   * GOOGLE_EXPENSE_DOCUMENT_VALIDATION - validate whether an expense document is a valid receipts/invoice.
   * - input: a single PDF/image
   * - output: binary prediction
   */
  GOOGLE_EXPENSE_DOCUMENT_VALIDATION = 2,
  UNRECOGNIZED = -1,
}

export function classifyClassifyPresetFromJSON(object: any): ClassifyClassifyPreset {
  switch (object) {
    case 0:
    case "CLASSIFY_PRESET_UNSPECIFIED":
      return ClassifyClassifyPreset.UNSPECIFIED;
    case 1:
    case "GOOGLE_EXPENSE_RISK":
      return ClassifyClassifyPreset.GOOGLE_EXPENSE_RISK;
    case 2:
    case "GOOGLE_EXPENSE_DOCUMENT_VALIDATION":
      return ClassifyClassifyPreset.GOOGLE_EXPENSE_DOCUMENT_VALIDATION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClassifyClassifyPreset.UNRECOGNIZED;
  }
}

export function classifyClassifyPresetToJSON(object: ClassifyClassifyPreset): string {
  switch (object) {
    case ClassifyClassifyPreset.UNSPECIFIED:
      return "CLASSIFY_PRESET_UNSPECIFIED";
    case ClassifyClassifyPreset.GOOGLE_EXPENSE_RISK:
      return "GOOGLE_EXPENSE_RISK";
    case ClassifyClassifyPreset.GOOGLE_EXPENSE_DOCUMENT_VALIDATION:
      return "GOOGLE_EXPENSE_DOCUMENT_VALIDATION";
    case ClassifyClassifyPreset.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ClassifyResult {
  $type?: "pb.v1alpha1.ClassifyResult";
  category?: string | undefined;
  binary?:
    | ClassifyResultBinaryPrediction
    | undefined;
  /** ML confidence between 0 to 1. */
  confidence?: number | undefined;
  explanation?: string | undefined;
}

export enum ClassifyResultBinaryPrediction {
  UNSPECIFIED = 0,
  NEGATIVE = 1,
  POSITIVE = 2,
  UNRECOGNIZED = -1,
}

export function classifyResultBinaryPredictionFromJSON(object: any): ClassifyResultBinaryPrediction {
  switch (object) {
    case 0:
    case "UNSPECIFIED":
      return ClassifyResultBinaryPrediction.UNSPECIFIED;
    case 1:
    case "NEGATIVE":
      return ClassifyResultBinaryPrediction.NEGATIVE;
    case 2:
    case "POSITIVE":
      return ClassifyResultBinaryPrediction.POSITIVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClassifyResultBinaryPrediction.UNRECOGNIZED;
  }
}

export function classifyResultBinaryPredictionToJSON(object: ClassifyResultBinaryPrediction): string {
  switch (object) {
    case ClassifyResultBinaryPrediction.UNSPECIFIED:
      return "UNSPECIFIED";
    case ClassifyResultBinaryPrediction.NEGATIVE:
      return "NEGATIVE";
    case ClassifyResultBinaryPrediction.POSITIVE:
      return "POSITIVE";
    case ClassifyResultBinaryPrediction.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * A common use case in accounting is to purchase order (PO) reconciliation, which
 * matches line items between PO against invoices. The result of this process
 * would be updating line items in PO and link invoice items to the corresponding
 * PO ones. We model those operations as taking in two data tables that contains
 * those line items (as two Items) and generates necessary data table updates as ItemUpdates.
 */
export interface ReconcileItems {
  $type?: "pb.v1alpha1.ReconcileItems";
  rule?:
    | string
    | undefined;
  /**
   * List of fields to reconcile. If a field is included here, we consider it
   * to be mutable and include it in UpdateFieldGroups.
   */
  fields?:
    | Field[]
    | undefined;
  /**
   * Reconciliation happens between two items:
   * - source: mutable item that we'd like to update in order to match the target item
   * - target: immutable item that we want to reconcile against.
   * In the context of reconciliation between invoice and purchase order, we'd
   * like to update the purchase order entries to match the ones in the invoice.
   * Thus the invoice would target and purchase order would be the source.
   */
  source?: Item | undefined;
  target?: Item | undefined;
}

/**
 * Reconcile entities in source with entities in target.
 * A common use case in accounting is to purchase order (PO) reconciliation, which
 * matches line items between PO against invoices. The result of this process
 * would be updating line items in PO and link invoice items to the corresponding
 * PO ones. We model those operations as taking in two data tables that contains
 * those line items (as two Items) and generates necessary data table updates as ItemUpdates.
 */
export interface ReconcileItemsRequestUnified {
  $type?: "pb.v1alpha1.ReconcileItemsRequestUnified";
  rule?:
    | string
    | undefined;
  /**
   * List of fields to reconcile. If a field is included here, we consider it
   * to be mutable and include it in UpdateFieldGroups.
   */
  schema?:
    | FieldGroup
    | undefined;
  /**
   * Reconciliation happens between two items:
   * - source: mutable item that we'd like to update in order to match the target item
   * - target: immutable item that we want to reconcile against.
   * In the context of reconciliation between invoice and purchase order, we'd
   * like to update the purchase order entries to match the ones in the invoice.
   * Thus the invoice would target and purchase order would be the source.
   */
  source?: EnrichEntitiesRequest | undefined;
  target?: EnrichEntitiesRequest | undefined;
}

export interface FieldGroupExtractedFields {
  $type?: "pb.v1alpha1.FieldGroupExtractedFields";
  fieldGroupIndex?: number | undefined;
  fields?: Field[] | undefined;
  confidence?: number | undefined;
}

export interface ReconcileItemsResult {
  $type?: "pb.v1alpha1.ReconcileItemsResult";
  /** field group matches between source and target items */
  fieldGroupMatches?: FieldGroupMatch[] | undefined;
  sourceExtractedFields?: FieldGroupExtractedFields[] | undefined;
  targetExtractedFields?: FieldGroupExtractedFields[] | undefined;
}

export interface ReconcileItemsResultUnified {
  $type?: "pb.v1alpha1.ReconcileItemsResultUnified";
  /** field group matches between source and target items */
  fieldMatches?: FieldMatch[] | undefined;
  sourceExtractedFields?: ExtractionDocument | undefined;
  targetExtractedFields?: ExtractionDocument | undefined;
}

export interface SmartActionOptions {
  $type?: "pb.v1alpha1.SmartActionOptions";
  /**
   * Set to true if the request is using the new smart action framework. See go/sa-framework-details for more details.
   * This flag is used while we are migrating to new smart action framework. Deprecate this flag once the migration is complete.
   */
  isNewSmartActionFramework?:
    | boolean
    | undefined;
  /** Set to true if the request and response is in legacy proto. */
  convertLegacyProto?: boolean | undefined;
}

export interface ProcessSmartActionsRequest {
  $type?: "pb.v1alpha1.ProcessSmartActionsRequest";
  actions?:
    | SmartAction[]
    | undefined;
  /** The corresponding Orbot execution that initiates this request, used for error tracing */
  taskId?:
    | string
    | undefined;
  /** The action that initiates this request, used for error tracing */
  actionId?:
    | string
    | undefined;
  /** Parameter used internally for DocAI API monitoring */
  bypassDocaiCache?:
    | boolean
    | undefined;
  /** Parameter used internally for LLM API monitoring */
  bypassLlmCache?:
    | boolean
    | undefined;
  /** This field indicates the operation need to run async. */
  runAsync?:
    | boolean
    | undefined;
  /**
   * The corresponding review task created by the frontend.
   * The backend will use this field to fill in output from ML.
   */
  reviewTaskId?:
    | string
    | undefined;
  /** Custom options for the request to be used by the OrbotML. */
  smartActionOptions?:
    | SmartActionOptions
    | undefined;
  /**
   * Right now ML needs to query ClickHouse directly to fetch few-shot examples.
   * Since we store data in separate databases for organizations with single
   * tenant setup, we need to pass down this information to the ML side. This is
   * only temporary before we set up and migrate to using a proxy service on the
   * server side which can handle single tenancy as well as better access control.
   * NOTE: this field is populated on the server side before sending the request
   * to the ML side via Temporal call.
   * Sample values:
   * - shared tenant: default
   * - single tenant: dev_672a6c16aa7b2a6c12408fa7
   * TODO: remove this once we migrate to the proxy service.
   */
  clickhouseDatabase?: string | undefined;
}

export interface SmartAction {
  $type?: "pb.v1alpha1.SmartAction";
  extractFields?: ExtractFields | undefined;
  validateFieldValues?: ValidateFieldValues | undefined;
  flagKeywords?: FlagKeywords | undefined;
  detectDuplicateLineItems?: DetectDuplicateLineItems | undefined;
  reconcileLineItems?: ReconcileItems | undefined;
  generateText?: GenerateText | undefined;
  classify?:
    | Classify
    | undefined;
  /**
   * New unified protos for smart actions. These fields should have suffix "_unified".
   * TODO: Deprecate the old protos once the migration is complete.
   */
  extractFieldsUnified?: ExtractFieldsRequestUnified | undefined;
  reconcileLineItemsUnified?: ReconcileItemsRequestUnified | undefined;
  hyperparameter?: Hyperparameter | undefined;
}

export interface ProcessSmartActionsResponse {
  $type?: "pb.v1alpha1.ProcessSmartActionsResponse";
  results?: SmartActionResult[] | undefined;
}

export interface SmartActionResult {
  $type?: "pb.v1alpha1.SmartActionResult";
  extractFieldsResult?: ExtractFieldsResult | undefined;
  validateFieldValuesResult?: ValidateFieldValuesResult | undefined;
  flagKeywordsResult?: FlagKeywordsResult | undefined;
  detectDuplicateLineItemsResult?: DetectDuplicateLineItemsResult | undefined;
  smartActionError?: SmartActionResultSmartActionError | undefined;
  reconcileLineItemsResult?: ReconcileItemsResult | undefined;
  generateTextResult?: GenerateTextResult | undefined;
  classifyResult?:
    | ClassifyResult
    | undefined;
  /**
   * New unified protos for smart actions.
   * TODO: Deprecate the old protos once the migration is complete.
   */
  extractFieldsResultUnified?: ExtractFieldsResultUnified | undefined;
  reconcileLineItemsResultUnified?:
    | ReconcileItemsResultUnified
    | undefined;
  /** for billing purpose */
  numProcessedPages?: number | undefined;
}

export enum SmartActionResultSmartActionError {
  PROCESS_DOCUMENT_ERROR_TYPE_UNSPECIFIED = 0,
  READABILITY_ERROR = 1,
  /**
   * PAGE_LIMIT_EXCEEDED_ERROR - One of the PDF files in the request contains more pages than what we can support.
   * Currently it's 15 due to DocAI's limit on synchronous OCR request.
   */
  PAGE_LIMIT_EXCEEDED_ERROR = 2,
  UNKNOWN_ERROR = 3,
  UNRECOGNIZED = -1,
}

export function smartActionResultSmartActionErrorFromJSON(object: any): SmartActionResultSmartActionError {
  switch (object) {
    case 0:
    case "PROCESS_DOCUMENT_ERROR_TYPE_UNSPECIFIED":
      return SmartActionResultSmartActionError.PROCESS_DOCUMENT_ERROR_TYPE_UNSPECIFIED;
    case 1:
    case "READABILITY_ERROR":
      return SmartActionResultSmartActionError.READABILITY_ERROR;
    case 2:
    case "PAGE_LIMIT_EXCEEDED_ERROR":
      return SmartActionResultSmartActionError.PAGE_LIMIT_EXCEEDED_ERROR;
    case 3:
    case "UNKNOWN_ERROR":
      return SmartActionResultSmartActionError.UNKNOWN_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SmartActionResultSmartActionError.UNRECOGNIZED;
  }
}

export function smartActionResultSmartActionErrorToJSON(object: SmartActionResultSmartActionError): string {
  switch (object) {
    case SmartActionResultSmartActionError.PROCESS_DOCUMENT_ERROR_TYPE_UNSPECIFIED:
      return "PROCESS_DOCUMENT_ERROR_TYPE_UNSPECIFIED";
    case SmartActionResultSmartActionError.READABILITY_ERROR:
      return "READABILITY_ERROR";
    case SmartActionResultSmartActionError.PAGE_LIMIT_EXCEEDED_ERROR:
      return "PAGE_LIMIT_EXCEEDED_ERROR";
    case SmartActionResultSmartActionError.UNKNOWN_ERROR:
      return "UNKNOWN_ERROR";
    case SmartActionResultSmartActionError.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Used to construct examples of actions and their expected results together
 * for test cases and evaluation datasets.
 */
export interface SmartActionExample {
  $type?: "pb.v1alpha1.SmartActionExample";
  action?: SmartAction | undefined;
  result?: SmartActionResult | undefined;
  id?: number | undefined;
}

/** Group a set of SmartActionExamples with an optional name. */
export interface SmartActionExamples {
  $type?: "pb.v1alpha1.SmartActionExamples";
  /** identify the set of examples. */
  name?: string | undefined;
  examples?: SmartActionExample[] | undefined;
}

export interface SmartActionHITLResult {
  $type?: "pb.v1alpha1.SmartActionHITLResult";
  /** It stores the original result from the ML if the user modifies the result */
  smartActionResult?:
    | SmartActionResult
    | undefined;
  /** Response from the ML or after the user modifies the result */
  correctedSmartActionResult?: SmartActionResult | undefined;
  isFallout?: boolean | undefined;
  falloutReason?: string | undefined;
}

function createBaseExtractFields(): ExtractFields {
  return { $type: "pb.v1alpha1.ExtractFields", fields: [], document: undefined, rule: "", source: undefined };
}

export const ExtractFields = {
  $type: "pb.v1alpha1.ExtractFields" as const,

  encode(message: ExtractFields, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        Field.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.document !== undefined) {
      Document.encode(message.document, writer.uint32(18).fork()).ldelim();
    }
    if (message.rule !== undefined && message.rule !== "") {
      writer.uint32(26).string(message.rule);
    }
    if (message.source !== undefined) {
      ItemDocument.encode(message.source, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtractFields {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtractFields();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fields!.push(Field.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.document = Document.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rule = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.source = ItemDocument.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtractFields {
    return {
      $type: ExtractFields.$type,
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => Field.fromJSON(e)) : [],
      document: isSet(object.document) ? Document.fromJSON(object.document) : undefined,
      rule: isSet(object.rule) ? globalThis.String(object.rule) : "",
      source: isSet(object.source) ? ItemDocument.fromJSON(object.source) : undefined,
    };
  },

  toJSON(message: ExtractFields): unknown {
    const obj: any = {};
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => Field.toJSON(e));
    }
    if (message.document !== undefined) {
      obj.document = Document.toJSON(message.document);
    }
    if (message.rule !== undefined && message.rule !== "") {
      obj.rule = message.rule;
    }
    if (message.source !== undefined) {
      obj.source = ItemDocument.toJSON(message.source);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtractFields>, I>>(base?: I): ExtractFields {
    return ExtractFields.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtractFields>, I>>(object: I): ExtractFields {
    const message = createBaseExtractFields();
    message.fields = object.fields?.map((e) => Field.fromPartial(e)) || [];
    message.document = (object.document !== undefined && object.document !== null)
      ? Document.fromPartial(object.document)
      : undefined;
    message.rule = object.rule ?? "";
    message.source = (object.source !== undefined && object.source !== null)
      ? ItemDocument.fromPartial(object.source)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ExtractFields.$type, ExtractFields);

function createBaseExtractFieldsRequestUnified(): ExtractFieldsRequestUnified {
  return { $type: "pb.v1alpha1.ExtractFieldsRequestUnified", rule: "", source: undefined };
}

export const ExtractFieldsRequestUnified = {
  $type: "pb.v1alpha1.ExtractFieldsRequestUnified" as const,

  encode(message: ExtractFieldsRequestUnified, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rule !== undefined && message.rule !== "") {
      writer.uint32(10).string(message.rule);
    }
    if (message.source !== undefined) {
      ExtractionDocument.encode(message.source, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtractFieldsRequestUnified {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtractFieldsRequestUnified();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rule = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.source = ExtractionDocument.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtractFieldsRequestUnified {
    return {
      $type: ExtractFieldsRequestUnified.$type,
      rule: isSet(object.rule) ? globalThis.String(object.rule) : "",
      source: isSet(object.source) ? ExtractionDocument.fromJSON(object.source) : undefined,
    };
  },

  toJSON(message: ExtractFieldsRequestUnified): unknown {
    const obj: any = {};
    if (message.rule !== undefined && message.rule !== "") {
      obj.rule = message.rule;
    }
    if (message.source !== undefined) {
      obj.source = ExtractionDocument.toJSON(message.source);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtractFieldsRequestUnified>, I>>(base?: I): ExtractFieldsRequestUnified {
    return ExtractFieldsRequestUnified.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtractFieldsRequestUnified>, I>>(object: I): ExtractFieldsRequestUnified {
    const message = createBaseExtractFieldsRequestUnified();
    message.rule = object.rule ?? "";
    message.source = (object.source !== undefined && object.source !== null)
      ? ExtractionDocument.fromPartial(object.source)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ExtractFieldsRequestUnified.$type, ExtractFieldsRequestUnified);

function createBaseExtractFieldsResult(): ExtractFieldsResult {
  return { $type: "pb.v1alpha1.ExtractFieldsResult", results: [], docaiProtoPath: "" };
}

export const ExtractFieldsResult = {
  $type: "pb.v1alpha1.ExtractFieldsResult" as const,

  encode(message: ExtractFieldsResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.results !== undefined && message.results.length !== 0) {
      for (const v of message.results) {
        ExtractFieldsResultPerFieldResult.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.docaiProtoPath !== undefined && message.docaiProtoPath !== "") {
      writer.uint32(26).string(message.docaiProtoPath);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtractFieldsResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtractFieldsResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.results!.push(ExtractFieldsResultPerFieldResult.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.docaiProtoPath = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtractFieldsResult {
    return {
      $type: ExtractFieldsResult.$type,
      results: globalThis.Array.isArray(object?.results)
        ? object.results.map((e: any) => ExtractFieldsResultPerFieldResult.fromJSON(e))
        : [],
      docaiProtoPath: isSet(object.docaiProtoPath) ? globalThis.String(object.docaiProtoPath) : "",
    };
  },

  toJSON(message: ExtractFieldsResult): unknown {
    const obj: any = {};
    if (message.results?.length) {
      obj.results = message.results.map((e) => ExtractFieldsResultPerFieldResult.toJSON(e));
    }
    if (message.docaiProtoPath !== undefined && message.docaiProtoPath !== "") {
      obj.docaiProtoPath = message.docaiProtoPath;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtractFieldsResult>, I>>(base?: I): ExtractFieldsResult {
    return ExtractFieldsResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtractFieldsResult>, I>>(object: I): ExtractFieldsResult {
    const message = createBaseExtractFieldsResult();
    message.results = object.results?.map((e) => ExtractFieldsResultPerFieldResult.fromPartial(e)) || [];
    message.docaiProtoPath = object.docaiProtoPath ?? "";
    return message;
  },
};

messageTypeRegistry.set(ExtractFieldsResult.$type, ExtractFieldsResult);

function createBaseExtractFieldsResultPerFieldResult(): ExtractFieldsResultPerFieldResult {
  return { $type: "pb.v1alpha1.ExtractFieldsResult.PerFieldResult", extractedField: undefined, confidence: 0 };
}

export const ExtractFieldsResultPerFieldResult = {
  $type: "pb.v1alpha1.ExtractFieldsResult.PerFieldResult" as const,

  encode(message: ExtractFieldsResultPerFieldResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.extractedField !== undefined) {
      Field.encode(message.extractedField, writer.uint32(10).fork()).ldelim();
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(21).float(message.confidence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtractFieldsResultPerFieldResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtractFieldsResultPerFieldResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.extractedField = Field.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.confidence = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtractFieldsResultPerFieldResult {
    return {
      $type: ExtractFieldsResultPerFieldResult.$type,
      extractedField: isSet(object.extractedField) ? Field.fromJSON(object.extractedField) : undefined,
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
    };
  },

  toJSON(message: ExtractFieldsResultPerFieldResult): unknown {
    const obj: any = {};
    if (message.extractedField !== undefined) {
      obj.extractedField = Field.toJSON(message.extractedField);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtractFieldsResultPerFieldResult>, I>>(
    base?: I,
  ): ExtractFieldsResultPerFieldResult {
    return ExtractFieldsResultPerFieldResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtractFieldsResultPerFieldResult>, I>>(
    object: I,
  ): ExtractFieldsResultPerFieldResult {
    const message = createBaseExtractFieldsResultPerFieldResult();
    message.extractedField = (object.extractedField !== undefined && object.extractedField !== null)
      ? Field.fromPartial(object.extractedField)
      : undefined;
    message.confidence = object.confidence ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ExtractFieldsResultPerFieldResult.$type, ExtractFieldsResultPerFieldResult);

function createBaseExtractFieldsResultUnified(): ExtractFieldsResultUnified {
  return { $type: "pb.v1alpha1.ExtractFieldsResultUnified", result: undefined };
}

export const ExtractFieldsResultUnified = {
  $type: "pb.v1alpha1.ExtractFieldsResultUnified" as const,

  encode(message: ExtractFieldsResultUnified, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== undefined) {
      ExtractionDocument.encode(message.result, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtractFieldsResultUnified {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtractFieldsResultUnified();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.result = ExtractionDocument.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtractFieldsResultUnified {
    return {
      $type: ExtractFieldsResultUnified.$type,
      result: isSet(object.result) ? ExtractionDocument.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: ExtractFieldsResultUnified): unknown {
    const obj: any = {};
    if (message.result !== undefined) {
      obj.result = ExtractionDocument.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtractFieldsResultUnified>, I>>(base?: I): ExtractFieldsResultUnified {
    return ExtractFieldsResultUnified.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtractFieldsResultUnified>, I>>(object: I): ExtractFieldsResultUnified {
    const message = createBaseExtractFieldsResultUnified();
    message.result = (object.result !== undefined && object.result !== null)
      ? ExtractionDocument.fromPartial(object.result)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ExtractFieldsResultUnified.$type, ExtractFieldsResultUnified);

function createBaseValidateFieldValues(): ValidateFieldValues {
  return {
    $type: "pb.v1alpha1.ValidateFieldValues",
    document: undefined,
    fields: [],
    rule: "",
    source: undefined,
    target: undefined,
    validateFields: [],
  };
}

export const ValidateFieldValues = {
  $type: "pb.v1alpha1.ValidateFieldValues" as const,

  encode(message: ValidateFieldValues, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.document !== undefined) {
      Document.encode(message.document, writer.uint32(26).fork()).ldelim();
    }
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        Field.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.rule !== undefined && message.rule !== "") {
      writer.uint32(18).string(message.rule);
    }
    if (message.source !== undefined) {
      Item.encode(message.source, writer.uint32(34).fork()).ldelim();
    }
    if (message.target !== undefined) {
      Item.encode(message.target, writer.uint32(42).fork()).ldelim();
    }
    if (message.validateFields !== undefined && message.validateFields.length !== 0) {
      for (const v of message.validateFields) {
        writer.uint32(50).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateFieldValues {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateFieldValues();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 26) {
            break;
          }

          message.document = Document.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fields!.push(Field.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rule = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.source = Item.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.target = Item.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.validateFields!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidateFieldValues {
    return {
      $type: ValidateFieldValues.$type,
      document: isSet(object.document) ? Document.fromJSON(object.document) : undefined,
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => Field.fromJSON(e)) : [],
      rule: isSet(object.rule) ? globalThis.String(object.rule) : "",
      source: isSet(object.source) ? Item.fromJSON(object.source) : undefined,
      target: isSet(object.target) ? Item.fromJSON(object.target) : undefined,
      validateFields: globalThis.Array.isArray(object?.validateFields)
        ? object.validateFields.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: ValidateFieldValues): unknown {
    const obj: any = {};
    if (message.document !== undefined) {
      obj.document = Document.toJSON(message.document);
    }
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => Field.toJSON(e));
    }
    if (message.rule !== undefined && message.rule !== "") {
      obj.rule = message.rule;
    }
    if (message.source !== undefined) {
      obj.source = Item.toJSON(message.source);
    }
    if (message.target !== undefined) {
      obj.target = Item.toJSON(message.target);
    }
    if (message.validateFields?.length) {
      obj.validateFields = message.validateFields;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateFieldValues>, I>>(base?: I): ValidateFieldValues {
    return ValidateFieldValues.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidateFieldValues>, I>>(object: I): ValidateFieldValues {
    const message = createBaseValidateFieldValues();
    message.document = (object.document !== undefined && object.document !== null)
      ? Document.fromPartial(object.document)
      : undefined;
    message.fields = object.fields?.map((e) => Field.fromPartial(e)) || [];
    message.rule = object.rule ?? "";
    message.source = (object.source !== undefined && object.source !== null)
      ? Item.fromPartial(object.source)
      : undefined;
    message.target = (object.target !== undefined && object.target !== null)
      ? Item.fromPartial(object.target)
      : undefined;
    message.validateFields = object.validateFields?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(ValidateFieldValues.$type, ValidateFieldValues);

function createBaseValidateFieldValuesResult(): ValidateFieldValuesResult {
  return {
    $type: "pb.v1alpha1.ValidateFieldValuesResult",
    results: [],
    status: 0,
    confidence: 0,
    explanation: "",
    extractedFields: [],
  };
}

export const ValidateFieldValuesResult = {
  $type: "pb.v1alpha1.ValidateFieldValuesResult" as const,

  encode(message: ValidateFieldValuesResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.results !== undefined && message.results.length !== 0) {
      for (const v of message.results) {
        ValidateFieldValuesResultPerFieldResult.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(21).float(message.confidence);
    }
    if (message.explanation !== undefined && message.explanation !== "") {
      writer.uint32(26).string(message.explanation);
    }
    if (message.extractedFields !== undefined && message.extractedFields.length !== 0) {
      for (const v of message.extractedFields) {
        Field.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateFieldValuesResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateFieldValuesResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 5:
          if (tag !== 42) {
            break;
          }

          message.results!.push(ValidateFieldValuesResultPerFieldResult.decode(reader, reader.uint32()));
          continue;
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.confidence = reader.float();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.explanation = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.extractedFields!.push(Field.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidateFieldValuesResult {
    return {
      $type: ValidateFieldValuesResult.$type,
      results: globalThis.Array.isArray(object?.results)
        ? object.results.map((e: any) => ValidateFieldValuesResultPerFieldResult.fromJSON(e))
        : [],
      status: isSet(object.status) ? validateFieldValuesResultStatusFromJSON(object.status) : 0,
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
      explanation: isSet(object.explanation) ? globalThis.String(object.explanation) : "",
      extractedFields: globalThis.Array.isArray(object?.extractedFields)
        ? object.extractedFields.map((e: any) => Field.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ValidateFieldValuesResult): unknown {
    const obj: any = {};
    if (message.results?.length) {
      obj.results = message.results.map((e) => ValidateFieldValuesResultPerFieldResult.toJSON(e));
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = validateFieldValuesResultStatusToJSON(message.status);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    if (message.explanation !== undefined && message.explanation !== "") {
      obj.explanation = message.explanation;
    }
    if (message.extractedFields?.length) {
      obj.extractedFields = message.extractedFields.map((e) => Field.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateFieldValuesResult>, I>>(base?: I): ValidateFieldValuesResult {
    return ValidateFieldValuesResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidateFieldValuesResult>, I>>(object: I): ValidateFieldValuesResult {
    const message = createBaseValidateFieldValuesResult();
    message.results = object.results?.map((e) => ValidateFieldValuesResultPerFieldResult.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    message.confidence = object.confidence ?? 0;
    message.explanation = object.explanation ?? "";
    message.extractedFields = object.extractedFields?.map((e) => Field.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ValidateFieldValuesResult.$type, ValidateFieldValuesResult);

function createBaseValidateFieldValuesResultPerFieldResult(): ValidateFieldValuesResultPerFieldResult {
  return {
    $type: "pb.v1alpha1.ValidateFieldValuesResult.PerFieldResult",
    extractedField: undefined,
    status: 0,
    explanation: "",
    confidence: 0,
  };
}

export const ValidateFieldValuesResultPerFieldResult = {
  $type: "pb.v1alpha1.ValidateFieldValuesResult.PerFieldResult" as const,

  encode(message: ValidateFieldValuesResultPerFieldResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.extractedField !== undefined) {
      Field.encode(message.extractedField, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.explanation !== undefined && message.explanation !== "") {
      writer.uint32(26).string(message.explanation);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(37).float(message.confidence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateFieldValuesResultPerFieldResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateFieldValuesResultPerFieldResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.extractedField = Field.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.explanation = reader.string();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.confidence = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidateFieldValuesResultPerFieldResult {
    return {
      $type: ValidateFieldValuesResultPerFieldResult.$type,
      extractedField: isSet(object.extractedField) ? Field.fromJSON(object.extractedField) : undefined,
      status: isSet(object.status) ? validateFieldValuesResultStatusFromJSON(object.status) : 0,
      explanation: isSet(object.explanation) ? globalThis.String(object.explanation) : "",
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
    };
  },

  toJSON(message: ValidateFieldValuesResultPerFieldResult): unknown {
    const obj: any = {};
    if (message.extractedField !== undefined) {
      obj.extractedField = Field.toJSON(message.extractedField);
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = validateFieldValuesResultStatusToJSON(message.status);
    }
    if (message.explanation !== undefined && message.explanation !== "") {
      obj.explanation = message.explanation;
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateFieldValuesResultPerFieldResult>, I>>(
    base?: I,
  ): ValidateFieldValuesResultPerFieldResult {
    return ValidateFieldValuesResultPerFieldResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidateFieldValuesResultPerFieldResult>, I>>(
    object: I,
  ): ValidateFieldValuesResultPerFieldResult {
    const message = createBaseValidateFieldValuesResultPerFieldResult();
    message.extractedField = (object.extractedField !== undefined && object.extractedField !== null)
      ? Field.fromPartial(object.extractedField)
      : undefined;
    message.status = object.status ?? 0;
    message.explanation = object.explanation ?? "";
    message.confidence = object.confidence ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ValidateFieldValuesResultPerFieldResult.$type, ValidateFieldValuesResultPerFieldResult);

function createBaseFlagKeywords(): FlagKeywords {
  return { $type: "pb.v1alpha1.FlagKeywords", keywords: [], fieldGroups: [], documents: [], rule: "" };
}

export const FlagKeywords = {
  $type: "pb.v1alpha1.FlagKeywords" as const,

  encode(message: FlagKeywords, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keywords !== undefined && message.keywords.length !== 0) {
      for (const v of message.keywords) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.fieldGroups !== undefined && message.fieldGroups.length !== 0) {
      for (const v of message.fieldGroups) {
        FieldGroup.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.documents !== undefined && message.documents.length !== 0) {
      for (const v of message.documents) {
        Document.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.rule !== undefined && message.rule !== "") {
      writer.uint32(34).string(message.rule);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FlagKeywords {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFlagKeywords();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.keywords!.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fieldGroups!.push(FieldGroup.decode(reader, reader.uint32()));
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

          message.rule = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FlagKeywords {
    return {
      $type: FlagKeywords.$type,
      keywords: globalThis.Array.isArray(object?.keywords) ? object.keywords.map((e: any) => globalThis.String(e)) : [],
      fieldGroups: globalThis.Array.isArray(object?.fieldGroups)
        ? object.fieldGroups.map((e: any) => FieldGroup.fromJSON(e))
        : [],
      documents: globalThis.Array.isArray(object?.documents)
        ? object.documents.map((e: any) => Document.fromJSON(e))
        : [],
      rule: isSet(object.rule) ? globalThis.String(object.rule) : "",
    };
  },

  toJSON(message: FlagKeywords): unknown {
    const obj: any = {};
    if (message.keywords?.length) {
      obj.keywords = message.keywords;
    }
    if (message.fieldGroups?.length) {
      obj.fieldGroups = message.fieldGroups.map((e) => FieldGroup.toJSON(e));
    }
    if (message.documents?.length) {
      obj.documents = message.documents.map((e) => Document.toJSON(e));
    }
    if (message.rule !== undefined && message.rule !== "") {
      obj.rule = message.rule;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FlagKeywords>, I>>(base?: I): FlagKeywords {
    return FlagKeywords.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FlagKeywords>, I>>(object: I): FlagKeywords {
    const message = createBaseFlagKeywords();
    message.keywords = object.keywords?.map((e) => e) || [];
    message.fieldGroups = object.fieldGroups?.map((e) => FieldGroup.fromPartial(e)) || [];
    message.documents = object.documents?.map((e) => Document.fromPartial(e)) || [];
    message.rule = object.rule ?? "";
    return message;
  },
};

messageTypeRegistry.set(FlagKeywords.$type, FlagKeywords);

function createBaseFlagKeywordsResult(): FlagKeywordsResult {
  return { $type: "pb.v1alpha1.FlagKeywordsResult", results: [], detectedKeywords: [] };
}

export const FlagKeywordsResult = {
  $type: "pb.v1alpha1.FlagKeywordsResult" as const,

  encode(message: FlagKeywordsResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.results !== undefined && message.results.length !== 0) {
      for (const v of message.results) {
        FlagKeywordsResultResult.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.detectedKeywords !== undefined && message.detectedKeywords.length !== 0) {
      for (const v of message.detectedKeywords) {
        writer.uint32(10).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FlagKeywordsResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFlagKeywordsResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.results!.push(FlagKeywordsResultResult.decode(reader, reader.uint32()));
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.detectedKeywords!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FlagKeywordsResult {
    return {
      $type: FlagKeywordsResult.$type,
      results: globalThis.Array.isArray(object?.results)
        ? object.results.map((e: any) => FlagKeywordsResultResult.fromJSON(e))
        : [],
      detectedKeywords: globalThis.Array.isArray(object?.detectedKeywords)
        ? object.detectedKeywords.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: FlagKeywordsResult): unknown {
    const obj: any = {};
    if (message.results?.length) {
      obj.results = message.results.map((e) => FlagKeywordsResultResult.toJSON(e));
    }
    if (message.detectedKeywords?.length) {
      obj.detectedKeywords = message.detectedKeywords;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FlagKeywordsResult>, I>>(base?: I): FlagKeywordsResult {
    return FlagKeywordsResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FlagKeywordsResult>, I>>(object: I): FlagKeywordsResult {
    const message = createBaseFlagKeywordsResult();
    message.results = object.results?.map((e) => FlagKeywordsResultResult.fromPartial(e)) || [];
    message.detectedKeywords = object.detectedKeywords?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(FlagKeywordsResult.$type, FlagKeywordsResult);

function createBaseFlagKeywordsResultFieldResult(): FlagKeywordsResultFieldResult {
  return {
    $type: "pb.v1alpha1.FlagKeywordsResult.FieldResult",
    fieldGroupIndex: 0,
    fieldIndex: 0,
    detectedKeywords: [],
  };
}

export const FlagKeywordsResultFieldResult = {
  $type: "pb.v1alpha1.FlagKeywordsResult.FieldResult" as const,

  encode(message: FlagKeywordsResultFieldResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldGroupIndex !== undefined && message.fieldGroupIndex !== 0) {
      writer.uint32(8).int32(message.fieldGroupIndex);
    }
    if (message.fieldIndex !== undefined && message.fieldIndex !== 0) {
      writer.uint32(16).int32(message.fieldIndex);
    }
    if (message.detectedKeywords !== undefined && message.detectedKeywords.length !== 0) {
      for (const v of message.detectedKeywords) {
        writer.uint32(26).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FlagKeywordsResultFieldResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFlagKeywordsResultFieldResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.fieldGroupIndex = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.fieldIndex = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.detectedKeywords!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FlagKeywordsResultFieldResult {
    return {
      $type: FlagKeywordsResultFieldResult.$type,
      fieldGroupIndex: isSet(object.fieldGroupIndex) ? globalThis.Number(object.fieldGroupIndex) : 0,
      fieldIndex: isSet(object.fieldIndex) ? globalThis.Number(object.fieldIndex) : 0,
      detectedKeywords: globalThis.Array.isArray(object?.detectedKeywords)
        ? object.detectedKeywords.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: FlagKeywordsResultFieldResult): unknown {
    const obj: any = {};
    if (message.fieldGroupIndex !== undefined && message.fieldGroupIndex !== 0) {
      obj.fieldGroupIndex = Math.round(message.fieldGroupIndex);
    }
    if (message.fieldIndex !== undefined && message.fieldIndex !== 0) {
      obj.fieldIndex = Math.round(message.fieldIndex);
    }
    if (message.detectedKeywords?.length) {
      obj.detectedKeywords = message.detectedKeywords;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FlagKeywordsResultFieldResult>, I>>(base?: I): FlagKeywordsResultFieldResult {
    return FlagKeywordsResultFieldResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FlagKeywordsResultFieldResult>, I>>(
    object: I,
  ): FlagKeywordsResultFieldResult {
    const message = createBaseFlagKeywordsResultFieldResult();
    message.fieldGroupIndex = object.fieldGroupIndex ?? 0;
    message.fieldIndex = object.fieldIndex ?? 0;
    message.detectedKeywords = object.detectedKeywords?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(FlagKeywordsResultFieldResult.$type, FlagKeywordsResultFieldResult);

function createBaseFlagKeywordsResultDocumentResult(): FlagKeywordsResultDocumentResult {
  return {
    $type: "pb.v1alpha1.FlagKeywordsResult.DocumentResult",
    documentIndex: 0,
    pageNumber: 0,
    detectedKeywords: [],
  };
}

export const FlagKeywordsResultDocumentResult = {
  $type: "pb.v1alpha1.FlagKeywordsResult.DocumentResult" as const,

  encode(message: FlagKeywordsResultDocumentResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.documentIndex !== undefined && message.documentIndex !== 0) {
      writer.uint32(8).int32(message.documentIndex);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(16).int32(message.pageNumber);
    }
    if (message.detectedKeywords !== undefined && message.detectedKeywords.length !== 0) {
      for (const v of message.detectedKeywords) {
        writer.uint32(26).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FlagKeywordsResultDocumentResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFlagKeywordsResultDocumentResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.documentIndex = reader.int32();
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

          message.detectedKeywords!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FlagKeywordsResultDocumentResult {
    return {
      $type: FlagKeywordsResultDocumentResult.$type,
      documentIndex: isSet(object.documentIndex) ? globalThis.Number(object.documentIndex) : 0,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      detectedKeywords: globalThis.Array.isArray(object?.detectedKeywords)
        ? object.detectedKeywords.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: FlagKeywordsResultDocumentResult): unknown {
    const obj: any = {};
    if (message.documentIndex !== undefined && message.documentIndex !== 0) {
      obj.documentIndex = Math.round(message.documentIndex);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.detectedKeywords?.length) {
      obj.detectedKeywords = message.detectedKeywords;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FlagKeywordsResultDocumentResult>, I>>(
    base?: I,
  ): FlagKeywordsResultDocumentResult {
    return FlagKeywordsResultDocumentResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FlagKeywordsResultDocumentResult>, I>>(
    object: I,
  ): FlagKeywordsResultDocumentResult {
    const message = createBaseFlagKeywordsResultDocumentResult();
    message.documentIndex = object.documentIndex ?? 0;
    message.pageNumber = object.pageNumber ?? 0;
    message.detectedKeywords = object.detectedKeywords?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(FlagKeywordsResultDocumentResult.$type, FlagKeywordsResultDocumentResult);

function createBaseFlagKeywordsResultResult(): FlagKeywordsResultResult {
  return { $type: "pb.v1alpha1.FlagKeywordsResult.Result", fieldResult: undefined, documentResult: undefined };
}

export const FlagKeywordsResultResult = {
  $type: "pb.v1alpha1.FlagKeywordsResult.Result" as const,

  encode(message: FlagKeywordsResultResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldResult !== undefined) {
      FlagKeywordsResultFieldResult.encode(message.fieldResult, writer.uint32(10).fork()).ldelim();
    }
    if (message.documentResult !== undefined) {
      FlagKeywordsResultDocumentResult.encode(message.documentResult, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FlagKeywordsResultResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFlagKeywordsResultResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fieldResult = FlagKeywordsResultFieldResult.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.documentResult = FlagKeywordsResultDocumentResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FlagKeywordsResultResult {
    return {
      $type: FlagKeywordsResultResult.$type,
      fieldResult: isSet(object.fieldResult) ? FlagKeywordsResultFieldResult.fromJSON(object.fieldResult) : undefined,
      documentResult: isSet(object.documentResult)
        ? FlagKeywordsResultDocumentResult.fromJSON(object.documentResult)
        : undefined,
    };
  },

  toJSON(message: FlagKeywordsResultResult): unknown {
    const obj: any = {};
    if (message.fieldResult !== undefined) {
      obj.fieldResult = FlagKeywordsResultFieldResult.toJSON(message.fieldResult);
    }
    if (message.documentResult !== undefined) {
      obj.documentResult = FlagKeywordsResultDocumentResult.toJSON(message.documentResult);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FlagKeywordsResultResult>, I>>(base?: I): FlagKeywordsResultResult {
    return FlagKeywordsResultResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FlagKeywordsResultResult>, I>>(object: I): FlagKeywordsResultResult {
    const message = createBaseFlagKeywordsResultResult();
    message.fieldResult = (object.fieldResult !== undefined && object.fieldResult !== null)
      ? FlagKeywordsResultFieldResult.fromPartial(object.fieldResult)
      : undefined;
    message.documentResult = (object.documentResult !== undefined && object.documentResult !== null)
      ? FlagKeywordsResultDocumentResult.fromPartial(object.documentResult)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(FlagKeywordsResultResult.$type, FlagKeywordsResultResult);

function createBaseItem(): Item {
  return { $type: "pb.v1alpha1.Item", fieldGroups: [], documents: [], smartActionRecords: [] };
}

export const Item = {
  $type: "pb.v1alpha1.Item" as const,

  encode(message: Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldGroups !== undefined && message.fieldGroups.length !== 0) {
      for (const v of message.fieldGroups) {
        FieldGroup.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.documents !== undefined && message.documents.length !== 0) {
      for (const v of message.documents) {
        ItemDocument.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.smartActionRecords !== undefined && message.smartActionRecords.length !== 0) {
      for (const v of message.smartActionRecords) {
        SmartActionRequestAndResult.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Item {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fieldGroups!.push(FieldGroup.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.documents!.push(ItemDocument.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.smartActionRecords!.push(SmartActionRequestAndResult.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Item {
    return {
      $type: Item.$type,
      fieldGroups: globalThis.Array.isArray(object?.fieldGroups)
        ? object.fieldGroups.map((e: any) => FieldGroup.fromJSON(e))
        : [],
      documents: globalThis.Array.isArray(object?.documents)
        ? object.documents.map((e: any) => ItemDocument.fromJSON(e))
        : [],
      smartActionRecords: globalThis.Array.isArray(object?.smartActionRecords)
        ? object.smartActionRecords.map((e: any) => SmartActionRequestAndResult.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Item): unknown {
    const obj: any = {};
    if (message.fieldGroups?.length) {
      obj.fieldGroups = message.fieldGroups.map((e) => FieldGroup.toJSON(e));
    }
    if (message.documents?.length) {
      obj.documents = message.documents.map((e) => ItemDocument.toJSON(e));
    }
    if (message.smartActionRecords?.length) {
      obj.smartActionRecords = message.smartActionRecords.map((e) => SmartActionRequestAndResult.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Item>, I>>(base?: I): Item {
    return Item.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Item>, I>>(object: I): Item {
    const message = createBaseItem();
    message.fieldGroups = object.fieldGroups?.map((e) => FieldGroup.fromPartial(e)) || [];
    message.documents = object.documents?.map((e) => ItemDocument.fromPartial(e)) || [];
    message.smartActionRecords = object.smartActionRecords?.map((e) => SmartActionRequestAndResult.fromPartial(e)) ||
      [];
    return message;
  },
};

messageTypeRegistry.set(Item.$type, Item);

function createBaseEnrichEntitiesRequest(): EnrichEntitiesRequest {
  return { $type: "pb.v1alpha1.EnrichEntitiesRequest", fieldGroup: undefined, documents: [] };
}

export const EnrichEntitiesRequest = {
  $type: "pb.v1alpha1.EnrichEntitiesRequest" as const,

  encode(message: EnrichEntitiesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldGroup !== undefined) {
      FieldGroup.encode(message.fieldGroup, writer.uint32(10).fork()).ldelim();
    }
    if (message.documents !== undefined && message.documents.length !== 0) {
      for (const v of message.documents) {
        ExtractionDocument.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnrichEntitiesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnrichEntitiesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fieldGroup = FieldGroup.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.documents!.push(ExtractionDocument.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EnrichEntitiesRequest {
    return {
      $type: EnrichEntitiesRequest.$type,
      fieldGroup: isSet(object.fieldGroup) ? FieldGroup.fromJSON(object.fieldGroup) : undefined,
      documents: globalThis.Array.isArray(object?.documents)
        ? object.documents.map((e: any) => ExtractionDocument.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EnrichEntitiesRequest): unknown {
    const obj: any = {};
    if (message.fieldGroup !== undefined) {
      obj.fieldGroup = FieldGroup.toJSON(message.fieldGroup);
    }
    if (message.documents?.length) {
      obj.documents = message.documents.map((e) => ExtractionDocument.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EnrichEntitiesRequest>, I>>(base?: I): EnrichEntitiesRequest {
    return EnrichEntitiesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EnrichEntitiesRequest>, I>>(object: I): EnrichEntitiesRequest {
    const message = createBaseEnrichEntitiesRequest();
    message.fieldGroup = (object.fieldGroup !== undefined && object.fieldGroup !== null)
      ? FieldGroup.fromPartial(object.fieldGroup)
      : undefined;
    message.documents = object.documents?.map((e) => ExtractionDocument.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(EnrichEntitiesRequest.$type, EnrichEntitiesRequest);

function createBaseItemDocument(): ItemDocument {
  return { $type: "pb.v1alpha1.ItemDocument", document: undefined, fields: [] };
}

export const ItemDocument = {
  $type: "pb.v1alpha1.ItemDocument" as const,

  encode(message: ItemDocument, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.document !== undefined) {
      Document.encode(message.document, writer.uint32(10).fork()).ldelim();
    }
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        Field.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemDocument {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.document = Document.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fields!.push(Field.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ItemDocument {
    return {
      $type: ItemDocument.$type,
      document: isSet(object.document) ? Document.fromJSON(object.document) : undefined,
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => Field.fromJSON(e)) : [],
    };
  },

  toJSON(message: ItemDocument): unknown {
    const obj: any = {};
    if (message.document !== undefined) {
      obj.document = Document.toJSON(message.document);
    }
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => Field.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ItemDocument>, I>>(base?: I): ItemDocument {
    return ItemDocument.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ItemDocument>, I>>(object: I): ItemDocument {
    const message = createBaseItemDocument();
    message.document = (object.document !== undefined && object.document !== null)
      ? Document.fromPartial(object.document)
      : undefined;
    message.fields = object.fields?.map((e) => Field.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ItemDocument.$type, ItemDocument);

function createBaseExtractionDocument(): ExtractionDocument {
  return { $type: "pb.v1alpha1.ExtractionDocument", document: undefined, fieldGroup: undefined };
}

export const ExtractionDocument = {
  $type: "pb.v1alpha1.ExtractionDocument" as const,

  encode(message: ExtractionDocument, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.document !== undefined) {
      Document.encode(message.document, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldGroup !== undefined) {
      FieldGroup.encode(message.fieldGroup, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtractionDocument {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtractionDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.document = Document.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fieldGroup = FieldGroup.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtractionDocument {
    return {
      $type: ExtractionDocument.$type,
      document: isSet(object.document) ? Document.fromJSON(object.document) : undefined,
      fieldGroup: isSet(object.fieldGroup) ? FieldGroup.fromJSON(object.fieldGroup) : undefined,
    };
  },

  toJSON(message: ExtractionDocument): unknown {
    const obj: any = {};
    if (message.document !== undefined) {
      obj.document = Document.toJSON(message.document);
    }
    if (message.fieldGroup !== undefined) {
      obj.fieldGroup = FieldGroup.toJSON(message.fieldGroup);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtractionDocument>, I>>(base?: I): ExtractionDocument {
    return ExtractionDocument.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtractionDocument>, I>>(object: I): ExtractionDocument {
    const message = createBaseExtractionDocument();
    message.document = (object.document !== undefined && object.document !== null)
      ? Document.fromPartial(object.document)
      : undefined;
    message.fieldGroup = (object.fieldGroup !== undefined && object.fieldGroup !== null)
      ? FieldGroup.fromPartial(object.fieldGroup)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ExtractionDocument.$type, ExtractionDocument);

function createBaseSmartActionRequestAndResult(): SmartActionRequestAndResult {
  return { $type: "pb.v1alpha1.SmartActionRequestAndResult", request: undefined, result: undefined };
}

export const SmartActionRequestAndResult = {
  $type: "pb.v1alpha1.SmartActionRequestAndResult" as const,

  encode(message: SmartActionRequestAndResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.request !== undefined) {
      ProcessSmartActionsRequest.encode(message.request, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      SmartActionResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SmartActionRequestAndResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSmartActionRequestAndResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.request = ProcessSmartActionsRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = SmartActionResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SmartActionRequestAndResult {
    return {
      $type: SmartActionRequestAndResult.$type,
      request: isSet(object.request) ? ProcessSmartActionsRequest.fromJSON(object.request) : undefined,
      result: isSet(object.result) ? SmartActionResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: SmartActionRequestAndResult): unknown {
    const obj: any = {};
    if (message.request !== undefined) {
      obj.request = ProcessSmartActionsRequest.toJSON(message.request);
    }
    if (message.result !== undefined) {
      obj.result = SmartActionResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SmartActionRequestAndResult>, I>>(base?: I): SmartActionRequestAndResult {
    return SmartActionRequestAndResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SmartActionRequestAndResult>, I>>(object: I): SmartActionRequestAndResult {
    const message = createBaseSmartActionRequestAndResult();
    message.request = (object.request !== undefined && object.request !== null)
      ? ProcessSmartActionsRequest.fromPartial(object.request)
      : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? SmartActionResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SmartActionRequestAndResult.$type, SmartActionRequestAndResult);

function createBaseFieldGroupMatch(): FieldGroupMatch {
  return {
    $type: "pb.v1alpha1.FieldGroupMatch",
    match: undefined,
    unmatchedSource: undefined,
    unmatchedTarget: undefined,
    confidence: 0,
    explanation: "",
  };
}

export const FieldGroupMatch = {
  $type: "pb.v1alpha1.FieldGroupMatch" as const,

  encode(message: FieldGroupMatch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.match !== undefined) {
      FieldGroupMatchMatchedFieldGroup.encode(message.match, writer.uint32(18).fork()).ldelim();
    }
    if (message.unmatchedSource !== undefined) {
      FieldGroupMatchUnmatchedFieldGroup.encode(message.unmatchedSource, writer.uint32(26).fork()).ldelim();
    }
    if (message.unmatchedTarget !== undefined) {
      FieldGroupMatchUnmatchedFieldGroup.encode(message.unmatchedTarget, writer.uint32(34).fork()).ldelim();
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(45).float(message.confidence);
    }
    if (message.explanation !== undefined && message.explanation !== "") {
      writer.uint32(50).string(message.explanation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldGroupMatch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldGroupMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.match = FieldGroupMatchMatchedFieldGroup.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.unmatchedSource = FieldGroupMatchUnmatchedFieldGroup.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.unmatchedTarget = FieldGroupMatchUnmatchedFieldGroup.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.confidence = reader.float();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.explanation = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FieldGroupMatch {
    return {
      $type: FieldGroupMatch.$type,
      match: isSet(object.match) ? FieldGroupMatchMatchedFieldGroup.fromJSON(object.match) : undefined,
      unmatchedSource: isSet(object.unmatchedSource)
        ? FieldGroupMatchUnmatchedFieldGroup.fromJSON(object.unmatchedSource)
        : undefined,
      unmatchedTarget: isSet(object.unmatchedTarget)
        ? FieldGroupMatchUnmatchedFieldGroup.fromJSON(object.unmatchedTarget)
        : undefined,
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
      explanation: isSet(object.explanation) ? globalThis.String(object.explanation) : "",
    };
  },

  toJSON(message: FieldGroupMatch): unknown {
    const obj: any = {};
    if (message.match !== undefined) {
      obj.match = FieldGroupMatchMatchedFieldGroup.toJSON(message.match);
    }
    if (message.unmatchedSource !== undefined) {
      obj.unmatchedSource = FieldGroupMatchUnmatchedFieldGroup.toJSON(message.unmatchedSource);
    }
    if (message.unmatchedTarget !== undefined) {
      obj.unmatchedTarget = FieldGroupMatchUnmatchedFieldGroup.toJSON(message.unmatchedTarget);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    if (message.explanation !== undefined && message.explanation !== "") {
      obj.explanation = message.explanation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldGroupMatch>, I>>(base?: I): FieldGroupMatch {
    return FieldGroupMatch.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldGroupMatch>, I>>(object: I): FieldGroupMatch {
    const message = createBaseFieldGroupMatch();
    message.match = (object.match !== undefined && object.match !== null)
      ? FieldGroupMatchMatchedFieldGroup.fromPartial(object.match)
      : undefined;
    message.unmatchedSource = (object.unmatchedSource !== undefined && object.unmatchedSource !== null)
      ? FieldGroupMatchUnmatchedFieldGroup.fromPartial(object.unmatchedSource)
      : undefined;
    message.unmatchedTarget = (object.unmatchedTarget !== undefined && object.unmatchedTarget !== null)
      ? FieldGroupMatchUnmatchedFieldGroup.fromPartial(object.unmatchedTarget)
      : undefined;
    message.confidence = object.confidence ?? 0;
    message.explanation = object.explanation ?? "";
    return message;
  },
};

messageTypeRegistry.set(FieldGroupMatch.$type, FieldGroupMatch);

function createBaseFieldGroupMatchMatchedFieldGroup(): FieldGroupMatchMatchedFieldGroup {
  return {
    $type: "pb.v1alpha1.FieldGroupMatch.MatchedFieldGroup",
    sourceIndex: 0,
    targetIndex: 0,
    sourceFieldUpdates: [],
    updateError: "",
  };
}

export const FieldGroupMatchMatchedFieldGroup = {
  $type: "pb.v1alpha1.FieldGroupMatch.MatchedFieldGroup" as const,

  encode(message: FieldGroupMatchMatchedFieldGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourceIndex !== undefined && message.sourceIndex !== 0) {
      writer.uint32(8).int32(message.sourceIndex);
    }
    if (message.targetIndex !== undefined && message.targetIndex !== 0) {
      writer.uint32(16).int32(message.targetIndex);
    }
    if (message.sourceFieldUpdates !== undefined && message.sourceFieldUpdates.length !== 0) {
      for (const v of message.sourceFieldUpdates) {
        Field.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.updateError !== undefined && message.updateError !== "") {
      writer.uint32(34).string(message.updateError);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldGroupMatchMatchedFieldGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldGroupMatchMatchedFieldGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.sourceIndex = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.targetIndex = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sourceFieldUpdates!.push(Field.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.updateError = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FieldGroupMatchMatchedFieldGroup {
    return {
      $type: FieldGroupMatchMatchedFieldGroup.$type,
      sourceIndex: isSet(object.sourceIndex) ? globalThis.Number(object.sourceIndex) : 0,
      targetIndex: isSet(object.targetIndex) ? globalThis.Number(object.targetIndex) : 0,
      sourceFieldUpdates: globalThis.Array.isArray(object?.sourceFieldUpdates)
        ? object.sourceFieldUpdates.map((e: any) => Field.fromJSON(e))
        : [],
      updateError: isSet(object.updateError) ? globalThis.String(object.updateError) : "",
    };
  },

  toJSON(message: FieldGroupMatchMatchedFieldGroup): unknown {
    const obj: any = {};
    if (message.sourceIndex !== undefined && message.sourceIndex !== 0) {
      obj.sourceIndex = Math.round(message.sourceIndex);
    }
    if (message.targetIndex !== undefined && message.targetIndex !== 0) {
      obj.targetIndex = Math.round(message.targetIndex);
    }
    if (message.sourceFieldUpdates?.length) {
      obj.sourceFieldUpdates = message.sourceFieldUpdates.map((e) => Field.toJSON(e));
    }
    if (message.updateError !== undefined && message.updateError !== "") {
      obj.updateError = message.updateError;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldGroupMatchMatchedFieldGroup>, I>>(
    base?: I,
  ): FieldGroupMatchMatchedFieldGroup {
    return FieldGroupMatchMatchedFieldGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldGroupMatchMatchedFieldGroup>, I>>(
    object: I,
  ): FieldGroupMatchMatchedFieldGroup {
    const message = createBaseFieldGroupMatchMatchedFieldGroup();
    message.sourceIndex = object.sourceIndex ?? 0;
    message.targetIndex = object.targetIndex ?? 0;
    message.sourceFieldUpdates = object.sourceFieldUpdates?.map((e) => Field.fromPartial(e)) || [];
    message.updateError = object.updateError ?? "";
    return message;
  },
};

messageTypeRegistry.set(FieldGroupMatchMatchedFieldGroup.$type, FieldGroupMatchMatchedFieldGroup);

function createBaseFieldGroupMatchUnmatchedFieldGroup(): FieldGroupMatchUnmatchedFieldGroup {
  return { $type: "pb.v1alpha1.FieldGroupMatch.UnmatchedFieldGroup", index: 0 };
}

export const FieldGroupMatchUnmatchedFieldGroup = {
  $type: "pb.v1alpha1.FieldGroupMatch.UnmatchedFieldGroup" as const,

  encode(message: FieldGroupMatchUnmatchedFieldGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== undefined && message.index !== 0) {
      writer.uint32(8).int32(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldGroupMatchUnmatchedFieldGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldGroupMatchUnmatchedFieldGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.index = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FieldGroupMatchUnmatchedFieldGroup {
    return {
      $type: FieldGroupMatchUnmatchedFieldGroup.$type,
      index: isSet(object.index) ? globalThis.Number(object.index) : 0,
    };
  },

  toJSON(message: FieldGroupMatchUnmatchedFieldGroup): unknown {
    const obj: any = {};
    if (message.index !== undefined && message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldGroupMatchUnmatchedFieldGroup>, I>>(
    base?: I,
  ): FieldGroupMatchUnmatchedFieldGroup {
    return FieldGroupMatchUnmatchedFieldGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldGroupMatchUnmatchedFieldGroup>, I>>(
    object: I,
  ): FieldGroupMatchUnmatchedFieldGroup {
    const message = createBaseFieldGroupMatchUnmatchedFieldGroup();
    message.index = object.index ?? 0;
    return message;
  },
};

messageTypeRegistry.set(FieldGroupMatchUnmatchedFieldGroup.$type, FieldGroupMatchUnmatchedFieldGroup);

function createBaseFieldMatch(): FieldMatch {
  return {
    $type: "pb.v1alpha1.FieldMatch",
    sourceId: "",
    targetId: "",
    updatedSourceField: undefined,
    updateError: "",
    confidence: 0,
    explanation: "",
  };
}

export const FieldMatch = {
  $type: "pb.v1alpha1.FieldMatch" as const,

  encode(message: FieldMatch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourceId !== undefined && message.sourceId !== "") {
      writer.uint32(10).string(message.sourceId);
    }
    if (message.targetId !== undefined && message.targetId !== "") {
      writer.uint32(18).string(message.targetId);
    }
    if (message.updatedSourceField !== undefined) {
      Field.encode(message.updatedSourceField, writer.uint32(26).fork()).ldelim();
    }
    if (message.updateError !== undefined && message.updateError !== "") {
      writer.uint32(34).string(message.updateError);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(45).float(message.confidence);
    }
    if (message.explanation !== undefined && message.explanation !== "") {
      writer.uint32(50).string(message.explanation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldMatch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sourceId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.targetId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.updatedSourceField = Field.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.updateError = reader.string();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.confidence = reader.float();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.explanation = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FieldMatch {
    return {
      $type: FieldMatch.$type,
      sourceId: isSet(object.sourceId) ? globalThis.String(object.sourceId) : "",
      targetId: isSet(object.targetId) ? globalThis.String(object.targetId) : "",
      updatedSourceField: isSet(object.updatedSourceField) ? Field.fromJSON(object.updatedSourceField) : undefined,
      updateError: isSet(object.updateError) ? globalThis.String(object.updateError) : "",
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
      explanation: isSet(object.explanation) ? globalThis.String(object.explanation) : "",
    };
  },

  toJSON(message: FieldMatch): unknown {
    const obj: any = {};
    if (message.sourceId !== undefined && message.sourceId !== "") {
      obj.sourceId = message.sourceId;
    }
    if (message.targetId !== undefined && message.targetId !== "") {
      obj.targetId = message.targetId;
    }
    if (message.updatedSourceField !== undefined) {
      obj.updatedSourceField = Field.toJSON(message.updatedSourceField);
    }
    if (message.updateError !== undefined && message.updateError !== "") {
      obj.updateError = message.updateError;
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    if (message.explanation !== undefined && message.explanation !== "") {
      obj.explanation = message.explanation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldMatch>, I>>(base?: I): FieldMatch {
    return FieldMatch.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldMatch>, I>>(object: I): FieldMatch {
    const message = createBaseFieldMatch();
    message.sourceId = object.sourceId ?? "";
    message.targetId = object.targetId ?? "";
    message.updatedSourceField = (object.updatedSourceField !== undefined && object.updatedSourceField !== null)
      ? Field.fromPartial(object.updatedSourceField)
      : undefined;
    message.updateError = object.updateError ?? "";
    message.confidence = object.confidence ?? 0;
    message.explanation = object.explanation ?? "";
    return message;
  },
};

messageTypeRegistry.set(FieldMatch.$type, FieldMatch);

function createBaseDetectDuplicateLineItems(): DetectDuplicateLineItems {
  return { $type: "pb.v1alpha1.DetectDuplicateLineItems", items: [], rule: "" };
}

export const DetectDuplicateLineItems = {
  $type: "pb.v1alpha1.DetectDuplicateLineItems" as const,

  encode(message: DetectDuplicateLineItems, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.items !== undefined && message.items.length !== 0) {
      for (const v of message.items) {
        Item.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.rule !== undefined && message.rule !== "") {
      writer.uint32(18).string(message.rule);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DetectDuplicateLineItems {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetectDuplicateLineItems();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items!.push(Item.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rule = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DetectDuplicateLineItems {
    return {
      $type: DetectDuplicateLineItems.$type,
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => Item.fromJSON(e)) : [],
      rule: isSet(object.rule) ? globalThis.String(object.rule) : "",
    };
  },

  toJSON(message: DetectDuplicateLineItems): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => Item.toJSON(e));
    }
    if (message.rule !== undefined && message.rule !== "") {
      obj.rule = message.rule;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DetectDuplicateLineItems>, I>>(base?: I): DetectDuplicateLineItems {
    return DetectDuplicateLineItems.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DetectDuplicateLineItems>, I>>(object: I): DetectDuplicateLineItems {
    const message = createBaseDetectDuplicateLineItems();
    message.items = object.items?.map((e) => Item.fromPartial(e)) || [];
    message.rule = object.rule ?? "";
    return message;
  },
};

messageTypeRegistry.set(DetectDuplicateLineItems.$type, DetectDuplicateLineItems);

function createBaseDetectDuplicateLineItemsResult(): DetectDuplicateLineItemsResult {
  return { $type: "pb.v1alpha1.DetectDuplicateLineItemsResult", duplicates: [], confidence: 0 };
}

export const DetectDuplicateLineItemsResult = {
  $type: "pb.v1alpha1.DetectDuplicateLineItemsResult" as const,

  encode(message: DetectDuplicateLineItemsResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.duplicates !== undefined && message.duplicates.length !== 0) {
      for (const v of message.duplicates) {
        DetectDuplicateLineItemsResultDuplicateGroup.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(21).float(message.confidence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DetectDuplicateLineItemsResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetectDuplicateLineItemsResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.duplicates!.push(DetectDuplicateLineItemsResultDuplicateGroup.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.confidence = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DetectDuplicateLineItemsResult {
    return {
      $type: DetectDuplicateLineItemsResult.$type,
      duplicates: globalThis.Array.isArray(object?.duplicates)
        ? object.duplicates.map((e: any) => DetectDuplicateLineItemsResultDuplicateGroup.fromJSON(e))
        : [],
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
    };
  },

  toJSON(message: DetectDuplicateLineItemsResult): unknown {
    const obj: any = {};
    if (message.duplicates?.length) {
      obj.duplicates = message.duplicates.map((e) => DetectDuplicateLineItemsResultDuplicateGroup.toJSON(e));
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DetectDuplicateLineItemsResult>, I>>(base?: I): DetectDuplicateLineItemsResult {
    return DetectDuplicateLineItemsResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DetectDuplicateLineItemsResult>, I>>(
    object: I,
  ): DetectDuplicateLineItemsResult {
    const message = createBaseDetectDuplicateLineItemsResult();
    message.duplicates = object.duplicates?.map((e) => DetectDuplicateLineItemsResultDuplicateGroup.fromPartial(e)) ||
      [];
    message.confidence = object.confidence ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DetectDuplicateLineItemsResult.$type, DetectDuplicateLineItemsResult);

function createBaseDetectDuplicateLineItemsResultDuplicateGroup(): DetectDuplicateLineItemsResultDuplicateGroup {
  return { $type: "pb.v1alpha1.DetectDuplicateLineItemsResult.DuplicateGroup", itemIndices: [], explanation: "" };
}

export const DetectDuplicateLineItemsResultDuplicateGroup = {
  $type: "pb.v1alpha1.DetectDuplicateLineItemsResult.DuplicateGroup" as const,

  encode(message: DetectDuplicateLineItemsResultDuplicateGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.itemIndices !== undefined && message.itemIndices.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.itemIndices) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.explanation !== undefined && message.explanation !== "") {
      writer.uint32(18).string(message.explanation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DetectDuplicateLineItemsResultDuplicateGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetectDuplicateLineItemsResultDuplicateGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.itemIndices!.push(reader.int32());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.itemIndices!.push(reader.int32());
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.explanation = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DetectDuplicateLineItemsResultDuplicateGroup {
    return {
      $type: DetectDuplicateLineItemsResultDuplicateGroup.$type,
      itemIndices: globalThis.Array.isArray(object?.itemIndices)
        ? object.itemIndices.map((e: any) => globalThis.Number(e))
        : [],
      explanation: isSet(object.explanation) ? globalThis.String(object.explanation) : "",
    };
  },

  toJSON(message: DetectDuplicateLineItemsResultDuplicateGroup): unknown {
    const obj: any = {};
    if (message.itemIndices?.length) {
      obj.itemIndices = message.itemIndices.map((e) => Math.round(e));
    }
    if (message.explanation !== undefined && message.explanation !== "") {
      obj.explanation = message.explanation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DetectDuplicateLineItemsResultDuplicateGroup>, I>>(
    base?: I,
  ): DetectDuplicateLineItemsResultDuplicateGroup {
    return DetectDuplicateLineItemsResultDuplicateGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DetectDuplicateLineItemsResultDuplicateGroup>, I>>(
    object: I,
  ): DetectDuplicateLineItemsResultDuplicateGroup {
    const message = createBaseDetectDuplicateLineItemsResultDuplicateGroup();
    message.itemIndices = object.itemIndices?.map((e) => e) || [];
    message.explanation = object.explanation ?? "";
    return message;
  },
};

messageTypeRegistry.set(
  DetectDuplicateLineItemsResultDuplicateGroup.$type,
  DetectDuplicateLineItemsResultDuplicateGroup,
);

function createBaseGenerateText(): GenerateText {
  return { $type: "pb.v1alpha1.GenerateText", items: [], prompt: "" };
}

export const GenerateText = {
  $type: "pb.v1alpha1.GenerateText" as const,

  encode(message: GenerateText, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.items !== undefined && message.items.length !== 0) {
      for (const v of message.items) {
        Item.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.prompt !== undefined && message.prompt !== "") {
      writer.uint32(18).string(message.prompt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateText {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateText();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items!.push(Item.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.prompt = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateText {
    return {
      $type: GenerateText.$type,
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => Item.fromJSON(e)) : [],
      prompt: isSet(object.prompt) ? globalThis.String(object.prompt) : "",
    };
  },

  toJSON(message: GenerateText): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => Item.toJSON(e));
    }
    if (message.prompt !== undefined && message.prompt !== "") {
      obj.prompt = message.prompt;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateText>, I>>(base?: I): GenerateText {
    return GenerateText.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateText>, I>>(object: I): GenerateText {
    const message = createBaseGenerateText();
    message.items = object.items?.map((e) => Item.fromPartial(e)) || [];
    message.prompt = object.prompt ?? "";
    return message;
  },
};

messageTypeRegistry.set(GenerateText.$type, GenerateText);

function createBaseGenerateTextResult(): GenerateTextResult {
  return { $type: "pb.v1alpha1.GenerateTextResult", generatedText: "", confidence: 0 };
}

export const GenerateTextResult = {
  $type: "pb.v1alpha1.GenerateTextResult" as const,

  encode(message: GenerateTextResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.generatedText !== undefined && message.generatedText !== "") {
      writer.uint32(10).string(message.generatedText);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(21).float(message.confidence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateTextResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateTextResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.generatedText = reader.string();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.confidence = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateTextResult {
    return {
      $type: GenerateTextResult.$type,
      generatedText: isSet(object.generatedText) ? globalThis.String(object.generatedText) : "",
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
    };
  },

  toJSON(message: GenerateTextResult): unknown {
    const obj: any = {};
    if (message.generatedText !== undefined && message.generatedText !== "") {
      obj.generatedText = message.generatedText;
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateTextResult>, I>>(base?: I): GenerateTextResult {
    return GenerateTextResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateTextResult>, I>>(object: I): GenerateTextResult {
    const message = createBaseGenerateTextResult();
    message.generatedText = object.generatedText ?? "";
    message.confidence = object.confidence ?? 0;
    return message;
  },
};

messageTypeRegistry.set(GenerateTextResult.$type, GenerateTextResult);

function createBaseClassify(): Classify {
  return { $type: "pb.v1alpha1.Classify", items: [], prompt: "", preset: 0 };
}

export const Classify = {
  $type: "pb.v1alpha1.Classify" as const,

  encode(message: Classify, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.items !== undefined && message.items.length !== 0) {
      for (const v of message.items) {
        Item.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.prompt !== undefined && message.prompt !== "") {
      writer.uint32(18).string(message.prompt);
    }
    if (message.preset !== undefined && message.preset !== 0) {
      writer.uint32(24).int32(message.preset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Classify {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassify();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items!.push(Item.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.prompt = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.preset = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Classify {
    return {
      $type: Classify.$type,
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => Item.fromJSON(e)) : [],
      prompt: isSet(object.prompt) ? globalThis.String(object.prompt) : "",
      preset: isSet(object.preset) ? classifyClassifyPresetFromJSON(object.preset) : 0,
    };
  },

  toJSON(message: Classify): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => Item.toJSON(e));
    }
    if (message.prompt !== undefined && message.prompt !== "") {
      obj.prompt = message.prompt;
    }
    if (message.preset !== undefined && message.preset !== 0) {
      obj.preset = classifyClassifyPresetToJSON(message.preset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Classify>, I>>(base?: I): Classify {
    return Classify.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Classify>, I>>(object: I): Classify {
    const message = createBaseClassify();
    message.items = object.items?.map((e) => Item.fromPartial(e)) || [];
    message.prompt = object.prompt ?? "";
    message.preset = object.preset ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Classify.$type, Classify);

function createBaseClassifyResult(): ClassifyResult {
  return {
    $type: "pb.v1alpha1.ClassifyResult",
    category: undefined,
    binary: undefined,
    confidence: 0,
    explanation: "",
  };
}

export const ClassifyResult = {
  $type: "pb.v1alpha1.ClassifyResult" as const,

  encode(message: ClassifyResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.category !== undefined) {
      writer.uint32(10).string(message.category);
    }
    if (message.binary !== undefined) {
      writer.uint32(32).int32(message.binary);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(21).float(message.confidence);
    }
    if (message.explanation !== undefined && message.explanation !== "") {
      writer.uint32(26).string(message.explanation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClassifyResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassifyResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.category = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.binary = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.confidence = reader.float();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.explanation = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClassifyResult {
    return {
      $type: ClassifyResult.$type,
      category: isSet(object.category) ? globalThis.String(object.category) : undefined,
      binary: isSet(object.binary) ? classifyResultBinaryPredictionFromJSON(object.binary) : undefined,
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
      explanation: isSet(object.explanation) ? globalThis.String(object.explanation) : "",
    };
  },

  toJSON(message: ClassifyResult): unknown {
    const obj: any = {};
    if (message.category !== undefined) {
      obj.category = message.category;
    }
    if (message.binary !== undefined) {
      obj.binary = classifyResultBinaryPredictionToJSON(message.binary);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    if (message.explanation !== undefined && message.explanation !== "") {
      obj.explanation = message.explanation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClassifyResult>, I>>(base?: I): ClassifyResult {
    return ClassifyResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClassifyResult>, I>>(object: I): ClassifyResult {
    const message = createBaseClassifyResult();
    message.category = object.category ?? undefined;
    message.binary = object.binary ?? undefined;
    message.confidence = object.confidence ?? 0;
    message.explanation = object.explanation ?? "";
    return message;
  },
};

messageTypeRegistry.set(ClassifyResult.$type, ClassifyResult);

function createBaseReconcileItems(): ReconcileItems {
  return { $type: "pb.v1alpha1.ReconcileItems", rule: "", fields: [], source: undefined, target: undefined };
}

export const ReconcileItems = {
  $type: "pb.v1alpha1.ReconcileItems" as const,

  encode(message: ReconcileItems, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rule !== undefined && message.rule !== "") {
      writer.uint32(18).string(message.rule);
    }
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        Field.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.source !== undefined) {
      Item.encode(message.source, writer.uint32(34).fork()).ldelim();
    }
    if (message.target !== undefined) {
      Item.encode(message.target, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReconcileItems {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReconcileItems();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rule = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.fields!.push(Field.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.source = Item.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.target = Item.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReconcileItems {
    return {
      $type: ReconcileItems.$type,
      rule: isSet(object.rule) ? globalThis.String(object.rule) : "",
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => Field.fromJSON(e)) : [],
      source: isSet(object.source) ? Item.fromJSON(object.source) : undefined,
      target: isSet(object.target) ? Item.fromJSON(object.target) : undefined,
    };
  },

  toJSON(message: ReconcileItems): unknown {
    const obj: any = {};
    if (message.rule !== undefined && message.rule !== "") {
      obj.rule = message.rule;
    }
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => Field.toJSON(e));
    }
    if (message.source !== undefined) {
      obj.source = Item.toJSON(message.source);
    }
    if (message.target !== undefined) {
      obj.target = Item.toJSON(message.target);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReconcileItems>, I>>(base?: I): ReconcileItems {
    return ReconcileItems.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReconcileItems>, I>>(object: I): ReconcileItems {
    const message = createBaseReconcileItems();
    message.rule = object.rule ?? "";
    message.fields = object.fields?.map((e) => Field.fromPartial(e)) || [];
    message.source = (object.source !== undefined && object.source !== null)
      ? Item.fromPartial(object.source)
      : undefined;
    message.target = (object.target !== undefined && object.target !== null)
      ? Item.fromPartial(object.target)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ReconcileItems.$type, ReconcileItems);

function createBaseReconcileItemsRequestUnified(): ReconcileItemsRequestUnified {
  return {
    $type: "pb.v1alpha1.ReconcileItemsRequestUnified",
    rule: "",
    schema: undefined,
    source: undefined,
    target: undefined,
  };
}

export const ReconcileItemsRequestUnified = {
  $type: "pb.v1alpha1.ReconcileItemsRequestUnified" as const,

  encode(message: ReconcileItemsRequestUnified, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rule !== undefined && message.rule !== "") {
      writer.uint32(10).string(message.rule);
    }
    if (message.schema !== undefined) {
      FieldGroup.encode(message.schema, writer.uint32(18).fork()).ldelim();
    }
    if (message.source !== undefined) {
      EnrichEntitiesRequest.encode(message.source, writer.uint32(26).fork()).ldelim();
    }
    if (message.target !== undefined) {
      EnrichEntitiesRequest.encode(message.target, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReconcileItemsRequestUnified {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReconcileItemsRequestUnified();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rule = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.schema = FieldGroup.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.source = EnrichEntitiesRequest.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.target = EnrichEntitiesRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReconcileItemsRequestUnified {
    return {
      $type: ReconcileItemsRequestUnified.$type,
      rule: isSet(object.rule) ? globalThis.String(object.rule) : "",
      schema: isSet(object.schema) ? FieldGroup.fromJSON(object.schema) : undefined,
      source: isSet(object.source) ? EnrichEntitiesRequest.fromJSON(object.source) : undefined,
      target: isSet(object.target) ? EnrichEntitiesRequest.fromJSON(object.target) : undefined,
    };
  },

  toJSON(message: ReconcileItemsRequestUnified): unknown {
    const obj: any = {};
    if (message.rule !== undefined && message.rule !== "") {
      obj.rule = message.rule;
    }
    if (message.schema !== undefined) {
      obj.schema = FieldGroup.toJSON(message.schema);
    }
    if (message.source !== undefined) {
      obj.source = EnrichEntitiesRequest.toJSON(message.source);
    }
    if (message.target !== undefined) {
      obj.target = EnrichEntitiesRequest.toJSON(message.target);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReconcileItemsRequestUnified>, I>>(base?: I): ReconcileItemsRequestUnified {
    return ReconcileItemsRequestUnified.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReconcileItemsRequestUnified>, I>>(object: I): ReconcileItemsRequestUnified {
    const message = createBaseReconcileItemsRequestUnified();
    message.rule = object.rule ?? "";
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? FieldGroup.fromPartial(object.schema)
      : undefined;
    message.source = (object.source !== undefined && object.source !== null)
      ? EnrichEntitiesRequest.fromPartial(object.source)
      : undefined;
    message.target = (object.target !== undefined && object.target !== null)
      ? EnrichEntitiesRequest.fromPartial(object.target)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ReconcileItemsRequestUnified.$type, ReconcileItemsRequestUnified);

function createBaseFieldGroupExtractedFields(): FieldGroupExtractedFields {
  return { $type: "pb.v1alpha1.FieldGroupExtractedFields", fieldGroupIndex: 0, fields: [], confidence: 0 };
}

export const FieldGroupExtractedFields = {
  $type: "pb.v1alpha1.FieldGroupExtractedFields" as const,

  encode(message: FieldGroupExtractedFields, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldGroupIndex !== undefined && message.fieldGroupIndex !== 0) {
      writer.uint32(24).int32(message.fieldGroupIndex);
    }
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        Field.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(21).float(message.confidence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldGroupExtractedFields {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldGroupExtractedFields();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 24) {
            break;
          }

          message.fieldGroupIndex = reader.int32();
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fields!.push(Field.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.confidence = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FieldGroupExtractedFields {
    return {
      $type: FieldGroupExtractedFields.$type,
      fieldGroupIndex: isSet(object.fieldGroupIndex) ? globalThis.Number(object.fieldGroupIndex) : 0,
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => Field.fromJSON(e)) : [],
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
    };
  },

  toJSON(message: FieldGroupExtractedFields): unknown {
    const obj: any = {};
    if (message.fieldGroupIndex !== undefined && message.fieldGroupIndex !== 0) {
      obj.fieldGroupIndex = Math.round(message.fieldGroupIndex);
    }
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => Field.toJSON(e));
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldGroupExtractedFields>, I>>(base?: I): FieldGroupExtractedFields {
    return FieldGroupExtractedFields.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldGroupExtractedFields>, I>>(object: I): FieldGroupExtractedFields {
    const message = createBaseFieldGroupExtractedFields();
    message.fieldGroupIndex = object.fieldGroupIndex ?? 0;
    message.fields = object.fields?.map((e) => Field.fromPartial(e)) || [];
    message.confidence = object.confidence ?? 0;
    return message;
  },
};

messageTypeRegistry.set(FieldGroupExtractedFields.$type, FieldGroupExtractedFields);

function createBaseReconcileItemsResult(): ReconcileItemsResult {
  return {
    $type: "pb.v1alpha1.ReconcileItemsResult",
    fieldGroupMatches: [],
    sourceExtractedFields: [],
    targetExtractedFields: [],
  };
}

export const ReconcileItemsResult = {
  $type: "pb.v1alpha1.ReconcileItemsResult" as const,

  encode(message: ReconcileItemsResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldGroupMatches !== undefined && message.fieldGroupMatches.length !== 0) {
      for (const v of message.fieldGroupMatches) {
        FieldGroupMatch.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.sourceExtractedFields !== undefined && message.sourceExtractedFields.length !== 0) {
      for (const v of message.sourceExtractedFields) {
        FieldGroupExtractedFields.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    if (message.targetExtractedFields !== undefined && message.targetExtractedFields.length !== 0) {
      for (const v of message.targetExtractedFields) {
        FieldGroupExtractedFields.encode(v!, writer.uint32(58).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReconcileItemsResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReconcileItemsResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fieldGroupMatches!.push(FieldGroupMatch.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.sourceExtractedFields!.push(FieldGroupExtractedFields.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.targetExtractedFields!.push(FieldGroupExtractedFields.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReconcileItemsResult {
    return {
      $type: ReconcileItemsResult.$type,
      fieldGroupMatches: globalThis.Array.isArray(object?.fieldGroupMatches)
        ? object.fieldGroupMatches.map((e: any) => FieldGroupMatch.fromJSON(e))
        : [],
      sourceExtractedFields: globalThis.Array.isArray(object?.sourceExtractedFields)
        ? object.sourceExtractedFields.map((e: any) => FieldGroupExtractedFields.fromJSON(e))
        : [],
      targetExtractedFields: globalThis.Array.isArray(object?.targetExtractedFields)
        ? object.targetExtractedFields.map((e: any) => FieldGroupExtractedFields.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ReconcileItemsResult): unknown {
    const obj: any = {};
    if (message.fieldGroupMatches?.length) {
      obj.fieldGroupMatches = message.fieldGroupMatches.map((e) => FieldGroupMatch.toJSON(e));
    }
    if (message.sourceExtractedFields?.length) {
      obj.sourceExtractedFields = message.sourceExtractedFields.map((e) => FieldGroupExtractedFields.toJSON(e));
    }
    if (message.targetExtractedFields?.length) {
      obj.targetExtractedFields = message.targetExtractedFields.map((e) => FieldGroupExtractedFields.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReconcileItemsResult>, I>>(base?: I): ReconcileItemsResult {
    return ReconcileItemsResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReconcileItemsResult>, I>>(object: I): ReconcileItemsResult {
    const message = createBaseReconcileItemsResult();
    message.fieldGroupMatches = object.fieldGroupMatches?.map((e) => FieldGroupMatch.fromPartial(e)) || [];
    message.sourceExtractedFields =
      object.sourceExtractedFields?.map((e) => FieldGroupExtractedFields.fromPartial(e)) || [];
    message.targetExtractedFields =
      object.targetExtractedFields?.map((e) => FieldGroupExtractedFields.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ReconcileItemsResult.$type, ReconcileItemsResult);

function createBaseReconcileItemsResultUnified(): ReconcileItemsResultUnified {
  return {
    $type: "pb.v1alpha1.ReconcileItemsResultUnified",
    fieldMatches: [],
    sourceExtractedFields: undefined,
    targetExtractedFields: undefined,
  };
}

export const ReconcileItemsResultUnified = {
  $type: "pb.v1alpha1.ReconcileItemsResultUnified" as const,

  encode(message: ReconcileItemsResultUnified, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldMatches !== undefined && message.fieldMatches.length !== 0) {
      for (const v of message.fieldMatches) {
        FieldMatch.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.sourceExtractedFields !== undefined) {
      ExtractionDocument.encode(message.sourceExtractedFields, writer.uint32(18).fork()).ldelim();
    }
    if (message.targetExtractedFields !== undefined) {
      ExtractionDocument.encode(message.targetExtractedFields, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReconcileItemsResultUnified {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReconcileItemsResultUnified();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fieldMatches!.push(FieldMatch.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sourceExtractedFields = ExtractionDocument.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.targetExtractedFields = ExtractionDocument.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReconcileItemsResultUnified {
    return {
      $type: ReconcileItemsResultUnified.$type,
      fieldMatches: globalThis.Array.isArray(object?.fieldMatches)
        ? object.fieldMatches.map((e: any) => FieldMatch.fromJSON(e))
        : [],
      sourceExtractedFields: isSet(object.sourceExtractedFields)
        ? ExtractionDocument.fromJSON(object.sourceExtractedFields)
        : undefined,
      targetExtractedFields: isSet(object.targetExtractedFields)
        ? ExtractionDocument.fromJSON(object.targetExtractedFields)
        : undefined,
    };
  },

  toJSON(message: ReconcileItemsResultUnified): unknown {
    const obj: any = {};
    if (message.fieldMatches?.length) {
      obj.fieldMatches = message.fieldMatches.map((e) => FieldMatch.toJSON(e));
    }
    if (message.sourceExtractedFields !== undefined) {
      obj.sourceExtractedFields = ExtractionDocument.toJSON(message.sourceExtractedFields);
    }
    if (message.targetExtractedFields !== undefined) {
      obj.targetExtractedFields = ExtractionDocument.toJSON(message.targetExtractedFields);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReconcileItemsResultUnified>, I>>(base?: I): ReconcileItemsResultUnified {
    return ReconcileItemsResultUnified.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReconcileItemsResultUnified>, I>>(object: I): ReconcileItemsResultUnified {
    const message = createBaseReconcileItemsResultUnified();
    message.fieldMatches = object.fieldMatches?.map((e) => FieldMatch.fromPartial(e)) || [];
    message.sourceExtractedFields =
      (object.sourceExtractedFields !== undefined && object.sourceExtractedFields !== null)
        ? ExtractionDocument.fromPartial(object.sourceExtractedFields)
        : undefined;
    message.targetExtractedFields =
      (object.targetExtractedFields !== undefined && object.targetExtractedFields !== null)
        ? ExtractionDocument.fromPartial(object.targetExtractedFields)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(ReconcileItemsResultUnified.$type, ReconcileItemsResultUnified);

function createBaseSmartActionOptions(): SmartActionOptions {
  return { $type: "pb.v1alpha1.SmartActionOptions", isNewSmartActionFramework: false, convertLegacyProto: false };
}

export const SmartActionOptions = {
  $type: "pb.v1alpha1.SmartActionOptions" as const,

  encode(message: SmartActionOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.isNewSmartActionFramework !== undefined && message.isNewSmartActionFramework !== false) {
      writer.uint32(8).bool(message.isNewSmartActionFramework);
    }
    if (message.convertLegacyProto !== undefined && message.convertLegacyProto !== false) {
      writer.uint32(16).bool(message.convertLegacyProto);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SmartActionOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSmartActionOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.isNewSmartActionFramework = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.convertLegacyProto = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SmartActionOptions {
    return {
      $type: SmartActionOptions.$type,
      isNewSmartActionFramework: isSet(object.isNewSmartActionFramework)
        ? globalThis.Boolean(object.isNewSmartActionFramework)
        : false,
      convertLegacyProto: isSet(object.convertLegacyProto) ? globalThis.Boolean(object.convertLegacyProto) : false,
    };
  },

  toJSON(message: SmartActionOptions): unknown {
    const obj: any = {};
    if (message.isNewSmartActionFramework !== undefined && message.isNewSmartActionFramework !== false) {
      obj.isNewSmartActionFramework = message.isNewSmartActionFramework;
    }
    if (message.convertLegacyProto !== undefined && message.convertLegacyProto !== false) {
      obj.convertLegacyProto = message.convertLegacyProto;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SmartActionOptions>, I>>(base?: I): SmartActionOptions {
    return SmartActionOptions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SmartActionOptions>, I>>(object: I): SmartActionOptions {
    const message = createBaseSmartActionOptions();
    message.isNewSmartActionFramework = object.isNewSmartActionFramework ?? false;
    message.convertLegacyProto = object.convertLegacyProto ?? false;
    return message;
  },
};

messageTypeRegistry.set(SmartActionOptions.$type, SmartActionOptions);

function createBaseProcessSmartActionsRequest(): ProcessSmartActionsRequest {
  return {
    $type: "pb.v1alpha1.ProcessSmartActionsRequest",
    actions: [],
    taskId: "",
    actionId: "",
    bypassDocaiCache: false,
    bypassLlmCache: false,
    runAsync: false,
    reviewTaskId: "",
    smartActionOptions: undefined,
    clickhouseDatabase: "",
  };
}

export const ProcessSmartActionsRequest = {
  $type: "pb.v1alpha1.ProcessSmartActionsRequest" as const,

  encode(message: ProcessSmartActionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.actions !== undefined && message.actions.length !== 0) {
      for (const v of message.actions) {
        SmartAction.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.taskId !== undefined && message.taskId !== "") {
      writer.uint32(18).string(message.taskId);
    }
    if (message.actionId !== undefined && message.actionId !== "") {
      writer.uint32(26).string(message.actionId);
    }
    if (message.bypassDocaiCache !== undefined && message.bypassDocaiCache !== false) {
      writer.uint32(32).bool(message.bypassDocaiCache);
    }
    if (message.bypassLlmCache !== undefined && message.bypassLlmCache !== false) {
      writer.uint32(40).bool(message.bypassLlmCache);
    }
    if (message.runAsync !== undefined && message.runAsync !== false) {
      writer.uint32(48).bool(message.runAsync);
    }
    if (message.reviewTaskId !== undefined && message.reviewTaskId !== "") {
      writer.uint32(58).string(message.reviewTaskId);
    }
    if (message.smartActionOptions !== undefined) {
      SmartActionOptions.encode(message.smartActionOptions, writer.uint32(66).fork()).ldelim();
    }
    if (message.clickhouseDatabase !== undefined && message.clickhouseDatabase !== "") {
      writer.uint32(74).string(message.clickhouseDatabase);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProcessSmartActionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessSmartActionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.actions!.push(SmartAction.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.taskId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.actionId = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.bypassDocaiCache = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.bypassLlmCache = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.runAsync = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.reviewTaskId = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.smartActionOptions = SmartActionOptions.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.clickhouseDatabase = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProcessSmartActionsRequest {
    return {
      $type: ProcessSmartActionsRequest.$type,
      actions: globalThis.Array.isArray(object?.actions) ? object.actions.map((e: any) => SmartAction.fromJSON(e)) : [],
      taskId: isSet(object.taskId) ? globalThis.String(object.taskId) : "",
      actionId: isSet(object.actionId) ? globalThis.String(object.actionId) : "",
      bypassDocaiCache: isSet(object.bypassDocaiCache) ? globalThis.Boolean(object.bypassDocaiCache) : false,
      bypassLlmCache: isSet(object.bypassLlmCache) ? globalThis.Boolean(object.bypassLlmCache) : false,
      runAsync: isSet(object.runAsync) ? globalThis.Boolean(object.runAsync) : false,
      reviewTaskId: isSet(object.reviewTaskId) ? globalThis.String(object.reviewTaskId) : "",
      smartActionOptions: isSet(object.smartActionOptions)
        ? SmartActionOptions.fromJSON(object.smartActionOptions)
        : undefined,
      clickhouseDatabase: isSet(object.clickhouseDatabase) ? globalThis.String(object.clickhouseDatabase) : "",
    };
  },

  toJSON(message: ProcessSmartActionsRequest): unknown {
    const obj: any = {};
    if (message.actions?.length) {
      obj.actions = message.actions.map((e) => SmartAction.toJSON(e));
    }
    if (message.taskId !== undefined && message.taskId !== "") {
      obj.taskId = message.taskId;
    }
    if (message.actionId !== undefined && message.actionId !== "") {
      obj.actionId = message.actionId;
    }
    if (message.bypassDocaiCache !== undefined && message.bypassDocaiCache !== false) {
      obj.bypassDocaiCache = message.bypassDocaiCache;
    }
    if (message.bypassLlmCache !== undefined && message.bypassLlmCache !== false) {
      obj.bypassLlmCache = message.bypassLlmCache;
    }
    if (message.runAsync !== undefined && message.runAsync !== false) {
      obj.runAsync = message.runAsync;
    }
    if (message.reviewTaskId !== undefined && message.reviewTaskId !== "") {
      obj.reviewTaskId = message.reviewTaskId;
    }
    if (message.smartActionOptions !== undefined) {
      obj.smartActionOptions = SmartActionOptions.toJSON(message.smartActionOptions);
    }
    if (message.clickhouseDatabase !== undefined && message.clickhouseDatabase !== "") {
      obj.clickhouseDatabase = message.clickhouseDatabase;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProcessSmartActionsRequest>, I>>(base?: I): ProcessSmartActionsRequest {
    return ProcessSmartActionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProcessSmartActionsRequest>, I>>(object: I): ProcessSmartActionsRequest {
    const message = createBaseProcessSmartActionsRequest();
    message.actions = object.actions?.map((e) => SmartAction.fromPartial(e)) || [];
    message.taskId = object.taskId ?? "";
    message.actionId = object.actionId ?? "";
    message.bypassDocaiCache = object.bypassDocaiCache ?? false;
    message.bypassLlmCache = object.bypassLlmCache ?? false;
    message.runAsync = object.runAsync ?? false;
    message.reviewTaskId = object.reviewTaskId ?? "";
    message.smartActionOptions = (object.smartActionOptions !== undefined && object.smartActionOptions !== null)
      ? SmartActionOptions.fromPartial(object.smartActionOptions)
      : undefined;
    message.clickhouseDatabase = object.clickhouseDatabase ?? "";
    return message;
  },
};

messageTypeRegistry.set(ProcessSmartActionsRequest.$type, ProcessSmartActionsRequest);

function createBaseSmartAction(): SmartAction {
  return {
    $type: "pb.v1alpha1.SmartAction",
    extractFields: undefined,
    validateFieldValues: undefined,
    flagKeywords: undefined,
    detectDuplicateLineItems: undefined,
    reconcileLineItems: undefined,
    generateText: undefined,
    classify: undefined,
    extractFieldsUnified: undefined,
    reconcileLineItemsUnified: undefined,
    hyperparameter: undefined,
  };
}

export const SmartAction = {
  $type: "pb.v1alpha1.SmartAction" as const,

  encode(message: SmartAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.extractFields !== undefined) {
      ExtractFields.encode(message.extractFields, writer.uint32(10).fork()).ldelim();
    }
    if (message.validateFieldValues !== undefined) {
      ValidateFieldValues.encode(message.validateFieldValues, writer.uint32(18).fork()).ldelim();
    }
    if (message.flagKeywords !== undefined) {
      FlagKeywords.encode(message.flagKeywords, writer.uint32(26).fork()).ldelim();
    }
    if (message.detectDuplicateLineItems !== undefined) {
      DetectDuplicateLineItems.encode(message.detectDuplicateLineItems, writer.uint32(34).fork()).ldelim();
    }
    if (message.reconcileLineItems !== undefined) {
      ReconcileItems.encode(message.reconcileLineItems, writer.uint32(42).fork()).ldelim();
    }
    if (message.generateText !== undefined) {
      GenerateText.encode(message.generateText, writer.uint32(50).fork()).ldelim();
    }
    if (message.classify !== undefined) {
      Classify.encode(message.classify, writer.uint32(58).fork()).ldelim();
    }
    if (message.extractFieldsUnified !== undefined) {
      ExtractFieldsRequestUnified.encode(message.extractFieldsUnified, writer.uint32(66).fork()).ldelim();
    }
    if (message.reconcileLineItemsUnified !== undefined) {
      ReconcileItemsRequestUnified.encode(message.reconcileLineItemsUnified, writer.uint32(74).fork()).ldelim();
    }
    if (message.hyperparameter !== undefined) {
      Hyperparameter.encode(message.hyperparameter, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SmartAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSmartAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.extractFields = ExtractFields.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validateFieldValues = ValidateFieldValues.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.flagKeywords = FlagKeywords.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.detectDuplicateLineItems = DetectDuplicateLineItems.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.reconcileLineItems = ReconcileItems.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.generateText = GenerateText.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.classify = Classify.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.extractFieldsUnified = ExtractFieldsRequestUnified.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.reconcileLineItemsUnified = ReconcileItemsRequestUnified.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
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

  fromJSON(object: any): SmartAction {
    return {
      $type: SmartAction.$type,
      extractFields: isSet(object.extractFields) ? ExtractFields.fromJSON(object.extractFields) : undefined,
      validateFieldValues: isSet(object.validateFieldValues)
        ? ValidateFieldValues.fromJSON(object.validateFieldValues)
        : undefined,
      flagKeywords: isSet(object.flagKeywords) ? FlagKeywords.fromJSON(object.flagKeywords) : undefined,
      detectDuplicateLineItems: isSet(object.detectDuplicateLineItems)
        ? DetectDuplicateLineItems.fromJSON(object.detectDuplicateLineItems)
        : undefined,
      reconcileLineItems: isSet(object.reconcileLineItems)
        ? ReconcileItems.fromJSON(object.reconcileLineItems)
        : undefined,
      generateText: isSet(object.generateText) ? GenerateText.fromJSON(object.generateText) : undefined,
      classify: isSet(object.classify) ? Classify.fromJSON(object.classify) : undefined,
      extractFieldsUnified: isSet(object.extractFieldsUnified)
        ? ExtractFieldsRequestUnified.fromJSON(object.extractFieldsUnified)
        : undefined,
      reconcileLineItemsUnified: isSet(object.reconcileLineItemsUnified)
        ? ReconcileItemsRequestUnified.fromJSON(object.reconcileLineItemsUnified)
        : undefined,
      hyperparameter: isSet(object.hyperparameter) ? Hyperparameter.fromJSON(object.hyperparameter) : undefined,
    };
  },

  toJSON(message: SmartAction): unknown {
    const obj: any = {};
    if (message.extractFields !== undefined) {
      obj.extractFields = ExtractFields.toJSON(message.extractFields);
    }
    if (message.validateFieldValues !== undefined) {
      obj.validateFieldValues = ValidateFieldValues.toJSON(message.validateFieldValues);
    }
    if (message.flagKeywords !== undefined) {
      obj.flagKeywords = FlagKeywords.toJSON(message.flagKeywords);
    }
    if (message.detectDuplicateLineItems !== undefined) {
      obj.detectDuplicateLineItems = DetectDuplicateLineItems.toJSON(message.detectDuplicateLineItems);
    }
    if (message.reconcileLineItems !== undefined) {
      obj.reconcileLineItems = ReconcileItems.toJSON(message.reconcileLineItems);
    }
    if (message.generateText !== undefined) {
      obj.generateText = GenerateText.toJSON(message.generateText);
    }
    if (message.classify !== undefined) {
      obj.classify = Classify.toJSON(message.classify);
    }
    if (message.extractFieldsUnified !== undefined) {
      obj.extractFieldsUnified = ExtractFieldsRequestUnified.toJSON(message.extractFieldsUnified);
    }
    if (message.reconcileLineItemsUnified !== undefined) {
      obj.reconcileLineItemsUnified = ReconcileItemsRequestUnified.toJSON(message.reconcileLineItemsUnified);
    }
    if (message.hyperparameter !== undefined) {
      obj.hyperparameter = Hyperparameter.toJSON(message.hyperparameter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SmartAction>, I>>(base?: I): SmartAction {
    return SmartAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SmartAction>, I>>(object: I): SmartAction {
    const message = createBaseSmartAction();
    message.extractFields = (object.extractFields !== undefined && object.extractFields !== null)
      ? ExtractFields.fromPartial(object.extractFields)
      : undefined;
    message.validateFieldValues = (object.validateFieldValues !== undefined && object.validateFieldValues !== null)
      ? ValidateFieldValues.fromPartial(object.validateFieldValues)
      : undefined;
    message.flagKeywords = (object.flagKeywords !== undefined && object.flagKeywords !== null)
      ? FlagKeywords.fromPartial(object.flagKeywords)
      : undefined;
    message.detectDuplicateLineItems =
      (object.detectDuplicateLineItems !== undefined && object.detectDuplicateLineItems !== null)
        ? DetectDuplicateLineItems.fromPartial(object.detectDuplicateLineItems)
        : undefined;
    message.reconcileLineItems = (object.reconcileLineItems !== undefined && object.reconcileLineItems !== null)
      ? ReconcileItems.fromPartial(object.reconcileLineItems)
      : undefined;
    message.generateText = (object.generateText !== undefined && object.generateText !== null)
      ? GenerateText.fromPartial(object.generateText)
      : undefined;
    message.classify = (object.classify !== undefined && object.classify !== null)
      ? Classify.fromPartial(object.classify)
      : undefined;
    message.extractFieldsUnified = (object.extractFieldsUnified !== undefined && object.extractFieldsUnified !== null)
      ? ExtractFieldsRequestUnified.fromPartial(object.extractFieldsUnified)
      : undefined;
    message.reconcileLineItemsUnified =
      (object.reconcileLineItemsUnified !== undefined && object.reconcileLineItemsUnified !== null)
        ? ReconcileItemsRequestUnified.fromPartial(object.reconcileLineItemsUnified)
        : undefined;
    message.hyperparameter = (object.hyperparameter !== undefined && object.hyperparameter !== null)
      ? Hyperparameter.fromPartial(object.hyperparameter)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SmartAction.$type, SmartAction);

function createBaseProcessSmartActionsResponse(): ProcessSmartActionsResponse {
  return { $type: "pb.v1alpha1.ProcessSmartActionsResponse", results: [] };
}

export const ProcessSmartActionsResponse = {
  $type: "pb.v1alpha1.ProcessSmartActionsResponse" as const,

  encode(message: ProcessSmartActionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.results !== undefined && message.results.length !== 0) {
      for (const v of message.results) {
        SmartActionResult.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProcessSmartActionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessSmartActionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.results!.push(SmartActionResult.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProcessSmartActionsResponse {
    return {
      $type: ProcessSmartActionsResponse.$type,
      results: globalThis.Array.isArray(object?.results)
        ? object.results.map((e: any) => SmartActionResult.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ProcessSmartActionsResponse): unknown {
    const obj: any = {};
    if (message.results?.length) {
      obj.results = message.results.map((e) => SmartActionResult.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProcessSmartActionsResponse>, I>>(base?: I): ProcessSmartActionsResponse {
    return ProcessSmartActionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProcessSmartActionsResponse>, I>>(object: I): ProcessSmartActionsResponse {
    const message = createBaseProcessSmartActionsResponse();
    message.results = object.results?.map((e) => SmartActionResult.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ProcessSmartActionsResponse.$type, ProcessSmartActionsResponse);

function createBaseSmartActionResult(): SmartActionResult {
  return {
    $type: "pb.v1alpha1.SmartActionResult",
    extractFieldsResult: undefined,
    validateFieldValuesResult: undefined,
    flagKeywordsResult: undefined,
    detectDuplicateLineItemsResult: undefined,
    smartActionError: undefined,
    reconcileLineItemsResult: undefined,
    generateTextResult: undefined,
    classifyResult: undefined,
    extractFieldsResultUnified: undefined,
    reconcileLineItemsResultUnified: undefined,
    numProcessedPages: 0,
  };
}

export const SmartActionResult = {
  $type: "pb.v1alpha1.SmartActionResult" as const,

  encode(message: SmartActionResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.extractFieldsResult !== undefined) {
      ExtractFieldsResult.encode(message.extractFieldsResult, writer.uint32(10).fork()).ldelim();
    }
    if (message.validateFieldValuesResult !== undefined) {
      ValidateFieldValuesResult.encode(message.validateFieldValuesResult, writer.uint32(18).fork()).ldelim();
    }
    if (message.flagKeywordsResult !== undefined) {
      FlagKeywordsResult.encode(message.flagKeywordsResult, writer.uint32(26).fork()).ldelim();
    }
    if (message.detectDuplicateLineItemsResult !== undefined) {
      DetectDuplicateLineItemsResult.encode(message.detectDuplicateLineItemsResult, writer.uint32(34).fork()).ldelim();
    }
    if (message.smartActionError !== undefined) {
      writer.uint32(40).int32(message.smartActionError);
    }
    if (message.reconcileLineItemsResult !== undefined) {
      ReconcileItemsResult.encode(message.reconcileLineItemsResult, writer.uint32(50).fork()).ldelim();
    }
    if (message.generateTextResult !== undefined) {
      GenerateTextResult.encode(message.generateTextResult, writer.uint32(66).fork()).ldelim();
    }
    if (message.classifyResult !== undefined) {
      ClassifyResult.encode(message.classifyResult, writer.uint32(74).fork()).ldelim();
    }
    if (message.extractFieldsResultUnified !== undefined) {
      ExtractFieldsResultUnified.encode(message.extractFieldsResultUnified, writer.uint32(82).fork()).ldelim();
    }
    if (message.reconcileLineItemsResultUnified !== undefined) {
      ReconcileItemsResultUnified.encode(message.reconcileLineItemsResultUnified, writer.uint32(90).fork()).ldelim();
    }
    if (message.numProcessedPages !== undefined && message.numProcessedPages !== 0) {
      writer.uint32(56).int32(message.numProcessedPages);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SmartActionResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSmartActionResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.extractFieldsResult = ExtractFieldsResult.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validateFieldValuesResult = ValidateFieldValuesResult.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.flagKeywordsResult = FlagKeywordsResult.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.detectDuplicateLineItemsResult = DetectDuplicateLineItemsResult.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.smartActionError = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.reconcileLineItemsResult = ReconcileItemsResult.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.generateTextResult = GenerateTextResult.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.classifyResult = ClassifyResult.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.extractFieldsResultUnified = ExtractFieldsResultUnified.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.reconcileLineItemsResultUnified = ReconcileItemsResultUnified.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.numProcessedPages = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SmartActionResult {
    return {
      $type: SmartActionResult.$type,
      extractFieldsResult: isSet(object.extractFieldsResult)
        ? ExtractFieldsResult.fromJSON(object.extractFieldsResult)
        : undefined,
      validateFieldValuesResult: isSet(object.validateFieldValuesResult)
        ? ValidateFieldValuesResult.fromJSON(object.validateFieldValuesResult)
        : undefined,
      flagKeywordsResult: isSet(object.flagKeywordsResult)
        ? FlagKeywordsResult.fromJSON(object.flagKeywordsResult)
        : undefined,
      detectDuplicateLineItemsResult: isSet(object.detectDuplicateLineItemsResult)
        ? DetectDuplicateLineItemsResult.fromJSON(object.detectDuplicateLineItemsResult)
        : undefined,
      smartActionError: isSet(object.smartActionError)
        ? smartActionResultSmartActionErrorFromJSON(object.smartActionError)
        : undefined,
      reconcileLineItemsResult: isSet(object.reconcileLineItemsResult)
        ? ReconcileItemsResult.fromJSON(object.reconcileLineItemsResult)
        : undefined,
      generateTextResult: isSet(object.generateTextResult)
        ? GenerateTextResult.fromJSON(object.generateTextResult)
        : undefined,
      classifyResult: isSet(object.classifyResult) ? ClassifyResult.fromJSON(object.classifyResult) : undefined,
      extractFieldsResultUnified: isSet(object.extractFieldsResultUnified)
        ? ExtractFieldsResultUnified.fromJSON(object.extractFieldsResultUnified)
        : undefined,
      reconcileLineItemsResultUnified: isSet(object.reconcileLineItemsResultUnified)
        ? ReconcileItemsResultUnified.fromJSON(object.reconcileLineItemsResultUnified)
        : undefined,
      numProcessedPages: isSet(object.numProcessedPages) ? globalThis.Number(object.numProcessedPages) : 0,
    };
  },

  toJSON(message: SmartActionResult): unknown {
    const obj: any = {};
    if (message.extractFieldsResult !== undefined) {
      obj.extractFieldsResult = ExtractFieldsResult.toJSON(message.extractFieldsResult);
    }
    if (message.validateFieldValuesResult !== undefined) {
      obj.validateFieldValuesResult = ValidateFieldValuesResult.toJSON(message.validateFieldValuesResult);
    }
    if (message.flagKeywordsResult !== undefined) {
      obj.flagKeywordsResult = FlagKeywordsResult.toJSON(message.flagKeywordsResult);
    }
    if (message.detectDuplicateLineItemsResult !== undefined) {
      obj.detectDuplicateLineItemsResult = DetectDuplicateLineItemsResult.toJSON(
        message.detectDuplicateLineItemsResult,
      );
    }
    if (message.smartActionError !== undefined) {
      obj.smartActionError = smartActionResultSmartActionErrorToJSON(message.smartActionError);
    }
    if (message.reconcileLineItemsResult !== undefined) {
      obj.reconcileLineItemsResult = ReconcileItemsResult.toJSON(message.reconcileLineItemsResult);
    }
    if (message.generateTextResult !== undefined) {
      obj.generateTextResult = GenerateTextResult.toJSON(message.generateTextResult);
    }
    if (message.classifyResult !== undefined) {
      obj.classifyResult = ClassifyResult.toJSON(message.classifyResult);
    }
    if (message.extractFieldsResultUnified !== undefined) {
      obj.extractFieldsResultUnified = ExtractFieldsResultUnified.toJSON(message.extractFieldsResultUnified);
    }
    if (message.reconcileLineItemsResultUnified !== undefined) {
      obj.reconcileLineItemsResultUnified = ReconcileItemsResultUnified.toJSON(message.reconcileLineItemsResultUnified);
    }
    if (message.numProcessedPages !== undefined && message.numProcessedPages !== 0) {
      obj.numProcessedPages = Math.round(message.numProcessedPages);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SmartActionResult>, I>>(base?: I): SmartActionResult {
    return SmartActionResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SmartActionResult>, I>>(object: I): SmartActionResult {
    const message = createBaseSmartActionResult();
    message.extractFieldsResult = (object.extractFieldsResult !== undefined && object.extractFieldsResult !== null)
      ? ExtractFieldsResult.fromPartial(object.extractFieldsResult)
      : undefined;
    message.validateFieldValuesResult =
      (object.validateFieldValuesResult !== undefined && object.validateFieldValuesResult !== null)
        ? ValidateFieldValuesResult.fromPartial(object.validateFieldValuesResult)
        : undefined;
    message.flagKeywordsResult = (object.flagKeywordsResult !== undefined && object.flagKeywordsResult !== null)
      ? FlagKeywordsResult.fromPartial(object.flagKeywordsResult)
      : undefined;
    message.detectDuplicateLineItemsResult =
      (object.detectDuplicateLineItemsResult !== undefined && object.detectDuplicateLineItemsResult !== null)
        ? DetectDuplicateLineItemsResult.fromPartial(object.detectDuplicateLineItemsResult)
        : undefined;
    message.smartActionError = object.smartActionError ?? undefined;
    message.reconcileLineItemsResult =
      (object.reconcileLineItemsResult !== undefined && object.reconcileLineItemsResult !== null)
        ? ReconcileItemsResult.fromPartial(object.reconcileLineItemsResult)
        : undefined;
    message.generateTextResult = (object.generateTextResult !== undefined && object.generateTextResult !== null)
      ? GenerateTextResult.fromPartial(object.generateTextResult)
      : undefined;
    message.classifyResult = (object.classifyResult !== undefined && object.classifyResult !== null)
      ? ClassifyResult.fromPartial(object.classifyResult)
      : undefined;
    message.extractFieldsResultUnified =
      (object.extractFieldsResultUnified !== undefined && object.extractFieldsResultUnified !== null)
        ? ExtractFieldsResultUnified.fromPartial(object.extractFieldsResultUnified)
        : undefined;
    message.reconcileLineItemsResultUnified =
      (object.reconcileLineItemsResultUnified !== undefined && object.reconcileLineItemsResultUnified !== null)
        ? ReconcileItemsResultUnified.fromPartial(object.reconcileLineItemsResultUnified)
        : undefined;
    message.numProcessedPages = object.numProcessedPages ?? 0;
    return message;
  },
};

messageTypeRegistry.set(SmartActionResult.$type, SmartActionResult);

function createBaseSmartActionExample(): SmartActionExample {
  return { $type: "pb.v1alpha1.SmartActionExample", action: undefined, result: undefined, id: 0 };
}

export const SmartActionExample = {
  $type: "pb.v1alpha1.SmartActionExample" as const,

  encode(message: SmartActionExample, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== undefined) {
      SmartAction.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      SmartActionResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    if (message.id !== undefined && message.id !== 0) {
      writer.uint32(24).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SmartActionExample {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSmartActionExample();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.action = SmartAction.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = SmartActionResult.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SmartActionExample {
    return {
      $type: SmartActionExample.$type,
      action: isSet(object.action) ? SmartAction.fromJSON(object.action) : undefined,
      result: isSet(object.result) ? SmartActionResult.fromJSON(object.result) : undefined,
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
    };
  },

  toJSON(message: SmartActionExample): unknown {
    const obj: any = {};
    if (message.action !== undefined) {
      obj.action = SmartAction.toJSON(message.action);
    }
    if (message.result !== undefined) {
      obj.result = SmartActionResult.toJSON(message.result);
    }
    if (message.id !== undefined && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SmartActionExample>, I>>(base?: I): SmartActionExample {
    return SmartActionExample.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SmartActionExample>, I>>(object: I): SmartActionExample {
    const message = createBaseSmartActionExample();
    message.action = (object.action !== undefined && object.action !== null)
      ? SmartAction.fromPartial(object.action)
      : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? SmartActionResult.fromPartial(object.result)
      : undefined;
    message.id = object.id ?? 0;
    return message;
  },
};

messageTypeRegistry.set(SmartActionExample.$type, SmartActionExample);

function createBaseSmartActionExamples(): SmartActionExamples {
  return { $type: "pb.v1alpha1.SmartActionExamples", name: "", examples: [] };
}

export const SmartActionExamples = {
  $type: "pb.v1alpha1.SmartActionExamples" as const,

  encode(message: SmartActionExamples, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.examples !== undefined && message.examples.length !== 0) {
      for (const v of message.examples) {
        SmartActionExample.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SmartActionExamples {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSmartActionExamples();
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

          message.examples!.push(SmartActionExample.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SmartActionExamples {
    return {
      $type: SmartActionExamples.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      examples: globalThis.Array.isArray(object?.examples)
        ? object.examples.map((e: any) => SmartActionExample.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SmartActionExamples): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.examples?.length) {
      obj.examples = message.examples.map((e) => SmartActionExample.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SmartActionExamples>, I>>(base?: I): SmartActionExamples {
    return SmartActionExamples.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SmartActionExamples>, I>>(object: I): SmartActionExamples {
    const message = createBaseSmartActionExamples();
    message.name = object.name ?? "";
    message.examples = object.examples?.map((e) => SmartActionExample.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(SmartActionExamples.$type, SmartActionExamples);

function createBaseSmartActionHITLResult(): SmartActionHITLResult {
  return {
    $type: "pb.v1alpha1.SmartActionHITLResult",
    smartActionResult: undefined,
    correctedSmartActionResult: undefined,
    isFallout: false,
    falloutReason: "",
  };
}

export const SmartActionHITLResult = {
  $type: "pb.v1alpha1.SmartActionHITLResult" as const,

  encode(message: SmartActionHITLResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.smartActionResult !== undefined) {
      SmartActionResult.encode(message.smartActionResult, writer.uint32(10).fork()).ldelim();
    }
    if (message.correctedSmartActionResult !== undefined) {
      SmartActionResult.encode(message.correctedSmartActionResult, writer.uint32(18).fork()).ldelim();
    }
    if (message.isFallout !== undefined && message.isFallout !== false) {
      writer.uint32(24).bool(message.isFallout);
    }
    if (message.falloutReason !== undefined && message.falloutReason !== "") {
      writer.uint32(34).string(message.falloutReason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SmartActionHITLResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSmartActionHITLResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.smartActionResult = SmartActionResult.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.correctedSmartActionResult = SmartActionResult.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.isFallout = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.falloutReason = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SmartActionHITLResult {
    return {
      $type: SmartActionHITLResult.$type,
      smartActionResult: isSet(object.smartActionResult)
        ? SmartActionResult.fromJSON(object.smartActionResult)
        : undefined,
      correctedSmartActionResult: isSet(object.correctedSmartActionResult)
        ? SmartActionResult.fromJSON(object.correctedSmartActionResult)
        : undefined,
      isFallout: isSet(object.isFallout) ? globalThis.Boolean(object.isFallout) : false,
      falloutReason: isSet(object.falloutReason) ? globalThis.String(object.falloutReason) : "",
    };
  },

  toJSON(message: SmartActionHITLResult): unknown {
    const obj: any = {};
    if (message.smartActionResult !== undefined) {
      obj.smartActionResult = SmartActionResult.toJSON(message.smartActionResult);
    }
    if (message.correctedSmartActionResult !== undefined) {
      obj.correctedSmartActionResult = SmartActionResult.toJSON(message.correctedSmartActionResult);
    }
    if (message.isFallout !== undefined && message.isFallout !== false) {
      obj.isFallout = message.isFallout;
    }
    if (message.falloutReason !== undefined && message.falloutReason !== "") {
      obj.falloutReason = message.falloutReason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SmartActionHITLResult>, I>>(base?: I): SmartActionHITLResult {
    return SmartActionHITLResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SmartActionHITLResult>, I>>(object: I): SmartActionHITLResult {
    const message = createBaseSmartActionHITLResult();
    message.smartActionResult = (object.smartActionResult !== undefined && object.smartActionResult !== null)
      ? SmartActionResult.fromPartial(object.smartActionResult)
      : undefined;
    message.correctedSmartActionResult =
      (object.correctedSmartActionResult !== undefined && object.correctedSmartActionResult !== null)
        ? SmartActionResult.fromPartial(object.correctedSmartActionResult)
        : undefined;
    message.isFallout = object.isFallout ?? false;
    message.falloutReason = object.falloutReason ?? "";
    return message;
  },
};

messageTypeRegistry.set(SmartActionHITLResult.$type, SmartActionHITLResult);

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
