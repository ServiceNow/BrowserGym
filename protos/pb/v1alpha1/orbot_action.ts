/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import {
  ClassifyClassifyPreset,
  classifyClassifyPresetFromJSON,
  classifyClassifyPresetToJSON,
  ProcessSmartActionsRequest,
  ProcessSmartActionsResponse,
} from "./actionprocessing";
import { ElementLocator, LowLevelActionType, lowLevelActionTypeFromJSON, lowLevelActionTypeToJSON } from "./element";
import { Field } from "./field";
import { SecretValue } from "./secret_manager";
import { UiEvent } from "./ui_event";

export const protobufPackage = "pb.v1alpha1";

export enum ActionBlockKind {
  ACTION_KIND_UNSPECIFIED = 0,
  PRESET = 1,
  USER_CREATED = 2,
  UNRECOGNIZED = -1,
}

export function actionBlockKindFromJSON(object: any): ActionBlockKind {
  switch (object) {
    case 0:
    case "ACTION_KIND_UNSPECIFIED":
      return ActionBlockKind.ACTION_KIND_UNSPECIFIED;
    case 1:
    case "PRESET":
      return ActionBlockKind.PRESET;
    case 2:
    case "USER_CREATED":
      return ActionBlockKind.USER_CREATED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionBlockKind.UNRECOGNIZED;
  }
}

export function actionBlockKindToJSON(object: ActionBlockKind): string {
  switch (object) {
    case ActionBlockKind.ACTION_KIND_UNSPECIFIED:
      return "ACTION_KIND_UNSPECIFIED";
    case ActionBlockKind.PRESET:
      return "PRESET";
    case ActionBlockKind.USER_CREATED:
      return "USER_CREATED";
    case ActionBlockKind.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ContextValue {
  UNSPECIFIED = 0,
  LOOP_INDEX = 1,
  UNRECOGNIZED = -1,
}

export function contextValueFromJSON(object: any): ContextValue {
  switch (object) {
    case 0:
    case "CONTEXT_VALUE_UNSPECIFIED":
      return ContextValue.UNSPECIFIED;
    case 1:
    case "LOOP_INDEX":
      return ContextValue.LOOP_INDEX;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ContextValue.UNRECOGNIZED;
  }
}

export function contextValueToJSON(object: ContextValue): string {
  switch (object) {
    case ContextValue.UNSPECIFIED:
      return "CONTEXT_VALUE_UNSPECIFIED";
    case ContextValue.LOOP_INDEX:
      return "LOOP_INDEX";
    case ContextValue.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ClickType {
  /** UNSPECIFIED - For single click on the left mouse button, use the default UNSPECIFIED type. */
  UNSPECIFIED = 0,
  DOUBLE_CLICK = 1,
  RIGHT_CLICK = 2,
  UNRECOGNIZED = -1,
}

export function clickTypeFromJSON(object: any): ClickType {
  switch (object) {
    case 0:
    case "CLICK_TYPE_UNSPECIFIED":
      return ClickType.UNSPECIFIED;
    case 1:
    case "DOUBLE_CLICK":
      return ClickType.DOUBLE_CLICK;
    case 2:
    case "RIGHT_CLICK":
      return ClickType.RIGHT_CLICK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClickType.UNRECOGNIZED;
  }
}

export function clickTypeToJSON(object: ClickType): string {
  switch (object) {
    case ClickType.UNSPECIFIED:
      return "CLICK_TYPE_UNSPECIFIED";
    case ClickType.DOUBLE_CLICK:
      return "DOUBLE_CLICK";
    case ClickType.RIGHT_CLICK:
      return "RIGHT_CLICK";
    case ClickType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum MacroActionExecutionError {
  ORBOT_ACTION_ERROR_TYPE_UNSPECIFIED = 0,
  /** OTHER - Not sure of the best way to define these errors. */
  OTHER = 1,
  ELEMENT_NOT_FOUND = 2,
  UNRECOGNIZED = -1,
}

export function macroActionExecutionErrorFromJSON(object: any): MacroActionExecutionError {
  switch (object) {
    case 0:
    case "ORBOT_ACTION_ERROR_TYPE_UNSPECIFIED":
      return MacroActionExecutionError.ORBOT_ACTION_ERROR_TYPE_UNSPECIFIED;
    case 1:
    case "OTHER":
      return MacroActionExecutionError.OTHER;
    case 2:
    case "ELEMENT_NOT_FOUND":
      return MacroActionExecutionError.ELEMENT_NOT_FOUND;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MacroActionExecutionError.UNRECOGNIZED;
  }
}

export function macroActionExecutionErrorToJSON(object: MacroActionExecutionError): string {
  switch (object) {
    case MacroActionExecutionError.ORBOT_ACTION_ERROR_TYPE_UNSPECIFIED:
      return "ORBOT_ACTION_ERROR_TYPE_UNSPECIFIED";
    case MacroActionExecutionError.OTHER:
      return "OTHER";
    case MacroActionExecutionError.ELEMENT_NOT_FOUND:
      return "ELEMENT_NOT_FOUND";
    case MacroActionExecutionError.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Simplified representation of a DOM / web page.
 * For example, <p>Hello <a>world</a></p> will be represented as
 * elements {
 *   tag {
 *     name: "p"
 *     children { text: "Hello " }
 *     children { tag { name:"a" children { text:"world" } } }
 *   }
 * }
 */
export interface PageContent {
  $type?: "pb.v1alpha1.PageContent";
  elements?: PageContentElement[] | undefined;
}

export interface PageContentElement {
  $type?: "pb.v1alpha1.PageContent.Element";
  /** Element with a tag. */
  tag?:
    | PageContentElementTag
    | undefined;
  /** Content of a text element. */
  text?: string | undefined;
}

export interface PageContentElementTag {
  $type?: "pb.v1alpha1.PageContent.Element.Tag";
  /** Id assigned by Orbot for identifying elements. */
  orbyId?:
    | string
    | undefined;
  /** Type of the element. For example, a, button, etc. */
  name?: string | undefined;
  children?:
    | PageContentElement[]
    | undefined;
  /** HTML attributes selected by the FE. For example, "aria-label" and "placeholder". */
  attributes?: { [key: string]: string } | undefined;
}

export interface PageContentElementTagAttributesEntry {
  $type?: "pb.v1alpha1.PageContent.Element.Tag.AttributesEntry";
  key: string;
  value: string;
}

/**
 * A snapshot of the UI.
 * Next ID: 6
 */
export interface UiState {
  $type?: "pb.v1alpha1.UiState";
  /** Screenshot image of the viewport. */
  viewportScreenshot?:
    | RecordedFile
    | undefined;
  /**
   * Pixel width of the viewport. Both viewport_width and viewport_height
   * should correspond to the bounding box in element. However, they
   * might not be consistent with the screenshot due to device pixel ratio.
   */
  viewportWidth?:
    | number
    | undefined;
  /** Pixel height of the viewport. See comment above for more info. */
  viewportHeight?:
    | number
    | undefined;
  /** Binary proto of the root element of the UI. */
  rootElement?:
    | RecordedFile
    | undefined;
  /** URL of the page. */
  url?:
    | string
    | undefined;
  /** Time when the snapshot was captured. */
  capturedAt?: Date | undefined;
}

/** A group of actions that perform some task collectively. */
export interface ActionBlock {
  $type?: "pb.v1alpha1.ActionBlock";
  actions?: Action[] | undefined;
  kind?: ActionBlockKind | undefined;
}

export interface PrerequisiteAction {
  $type?: "pb.v1alpha1.PrerequisiteAction";
  action?: Action | undefined;
  type?: PrerequisiteActionPrerequisiteType | undefined;
}

export enum PrerequisiteActionPrerequisiteType {
  UNSPECIFIED = 0,
  /** SMART_TEXT - A JsFunctionAction for generating text from user's NL instructions. */
  SMART_TEXT = 1,
  /**
   * SMART_BOOLEAN - An action for generating boolean-like output from user's NL instructions,
   * which is mostly used for ConditionAction. It can be a JsFunctionAction
   * that generate a boolean value, or a GetElementAction which can be used
   * directly by the ConditionAction.
   */
  SMART_BOOLEAN = 3,
  /** DYNAMIC_LOCATOR - A JsFunctionAction for generating text from user's NL instructions. */
  DYNAMIC_LOCATOR = 2,
  UNRECOGNIZED = -1,
}

export function prerequisiteActionPrerequisiteTypeFromJSON(object: any): PrerequisiteActionPrerequisiteType {
  switch (object) {
    case 0:
    case "PREREQUISITE_TYPE_UNSPECIFIED":
      return PrerequisiteActionPrerequisiteType.UNSPECIFIED;
    case 1:
    case "SMART_TEXT":
      return PrerequisiteActionPrerequisiteType.SMART_TEXT;
    case 3:
    case "SMART_BOOLEAN":
      return PrerequisiteActionPrerequisiteType.SMART_BOOLEAN;
    case 2:
    case "DYNAMIC_LOCATOR":
      return PrerequisiteActionPrerequisiteType.DYNAMIC_LOCATOR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PrerequisiteActionPrerequisiteType.UNRECOGNIZED;
  }
}

export function prerequisiteActionPrerequisiteTypeToJSON(object: PrerequisiteActionPrerequisiteType): string {
  switch (object) {
    case PrerequisiteActionPrerequisiteType.UNSPECIFIED:
      return "PREREQUISITE_TYPE_UNSPECIFIED";
    case PrerequisiteActionPrerequisiteType.SMART_TEXT:
      return "SMART_TEXT";
    case PrerequisiteActionPrerequisiteType.SMART_BOOLEAN:
      return "SMART_BOOLEAN";
    case PrerequisiteActionPrerequisiteType.DYNAMIC_LOCATOR:
      return "DYNAMIC_LOCATOR";
    case PrerequisiteActionPrerequisiteType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Basic action in Orbot workflow. Each action can be:
 * 1. a leaf action that can be executed as the smallest unit, such as click.
 * 2. a control flow action such as loop/condition that can contain children action.
 * 3. a group of actions, either prepackaged by Orby or user configured.
 * Next ID: 52
 */
export interface Action {
  $type?: "pb.v1alpha1.Action";
  /** action id used to reference between steps for parameter passing. */
  id?:
    | string
    | undefined;
  /** Generated description that is shown to the user. */
  description?:
    | string
    | undefined;
  /**
   * Prerequisite actions that need to be performed before the current action.
   * This is usually for JsFunctionAction that generate locators or perform data
   * manipulation. Prerequisite actions are hidden from the user for better
   * readability.
   */
  prerequisites?: PrerequisiteAction[] | undefined;
  block?: ActionBlock | undefined;
  goto?:
    | GotoAction
    | undefined;
  /** (FM) synonymous with CLICK */
  click?: ClickAction | undefined;
  getForm?: GetFormAction | undefined;
  fillForm?: FillFormAction | undefined;
  extractFields?: ExtractFieldsAction | undefined;
  jsFunction?: JsFunctionAction | undefined;
  validate?: ValidateAction | undefined;
  condition?: ConditionAction | undefined;
  foreach?: ForeachAction | undefined;
  getList?: GetListAction | undefined;
  updateList?: UpdateListAction | undefined;
  getElement?: GetElementAction | undefined;
  flagKeywords?: FlagKeywordsAction | undefined;
  detectDuplicateLineItems?: DetectDuplicateLineItemsAction | undefined;
  createTask?: CreateTaskAction | undefined;
  reconcileItems?:
    | ReconcileItemsAction
    | undefined;
  /** (FM) synonymous with HOVER */
  hover?: HoverAction | undefined;
  exit?:
    | ExitAction
    | undefined;
  /** (FM) synonymous with TYPE and SELECT */
  setValue?: SetValueAction | undefined;
  customSmartAction?: CustomSmartAction | undefined;
  getDocument?:
    | GetDocumentAction
    | undefined;
  /** (FM) synonymous with SCROLL */
  scrollAction?: ScrollAction | undefined;
  generateText?: GenerateTextAction | undefined;
  classify?: ClassifyAction | undefined;
  sendEmail?: SendEmailAction | undefined;
  getPasscode?: GetPasscodeAction | undefined;
  macro?: MacroAction | undefined;
  launch?: LaunchAction | undefined;
  focus?:
    | FocusAction
    | undefined;
  /**
   * For all actions that involves review, we would create a task on the server
   * side. When the task is finished, we would create the following execution on
   * the server side. If the review is not needed, i.e. the confidence score is
   * above user threshold, we would create a task that has COMPLETED status, and
   * a new execution would be immediately created on the server side after task
   * creation.
   *
   * With this field defined, the action would complete right after the task is
   * created, i.e. human review is not a blocking operation. For actions that
   * don't have this field but require review, the action execution would block
   * until the review is completed.
   *
   * Proceeding execution would receive the following variables in the order of
   * preference:
   * 1. smart action request and response (smartAction and smartActionResult);
   * 2. additional variables specified in ProceedingTask;
   * 3. all variables from the current process.
   */
  proceedingExecution?:
    | ProceedingExecution
    | undefined;
  /**
   * which tab shall we perform the action for browser automation. tabIndex
   * is generated and assigned during recording and we map them to the dynamic
   * tabId during execution.
   */
  tabIndex?:
    | number
    | undefined;
  /**
   * which application window shall we perform the action. When we first launch
   * an application, we assign a non-zero value for the newly opened window and
   * then we can refer to the same windowIndex in following actions.
   * Browser automation actions should always leave this field unset (with
   * windowIndex=0), so we can use this field to distinguish between browser vs
   * desktop automation.
   */
  windowIndex?:
    | number
    | undefined;
  /**
   * The page snapshot/screenshot that are picked during the inference.
   * Deprecated: use before_state.root_element instead.
   *
   * @deprecated
   */
  snapshot?:
    | RecordedFile
    | undefined;
  /**
   * Screenshot captured before this action takes place.
   * Deprecated: use before_state.viewport_screenshot instead.
   *
   * @deprecated
   */
  screenshot?:
    | RecordedFile
    | undefined;
  /** Snapshot of the UI taken before the action. */
  beforeState?:
    | UiState
    | undefined;
  /**
   * Verify that the execution of the action is successful.
   * Currently this is only used in tests in the Replay format.
   */
  verification?:
    | ActionVerification
    | undefined;
  /**
   * Configuration to wait until the page load is complete after performing the
   * action.
   */
  completionCheck?:
    | ActionCompletionCheck
    | undefined;
  /** (FM) low-level action type; to be compatible with the FM crawler definition */
  lowLevelActionType?:
    | LowLevelActionType
    | undefined;
  /**
   * These are the IDs for the elements this action operates on.
   * Each ID is unique and corresponds to one dom element found in snapshot.
   */
  elementIds?:
    | string[]
    | undefined;
  /** Raw UI events before potential processing like merging. */
  rawEvents?:
    | UiEvent[]
    | undefined;
  /** Time when the action was first observed during recording. */
  observedAt?:
    | Date
    | undefined;
  /**
   * Time when the action was completed during recording. For most actions,
   * completed_at would be the same as observed_at. However, for actions
   * corresponding to multiple raw events, such as SetValue, completed_at
   * might be significant later than observed_at.
   */
  completedAt?:
    | Date
    | undefined;
  /**
   * This is only valid if the action is a smart action.
   * It corresponds to the hyperparameter object which needs to be sent along with the smart action request to the ML workflow.
   */
  hyperparameterId?: string | undefined;
}

export interface ProceedingExecution {
  $type?: "pb.v1alpha1.ProceedingExecution";
  processId?:
    | string
    | undefined;
  /**
   * all variables from the current process would be inherited. use this field
   * to specify additional variables for the child task.
   */
  additionalVariables?: ActionParamValue[] | undefined;
}

/**
 * After the action is performed, we wait until the page is fully loaded before
 * performing the next action. Right now the main method is to wait until all
 * pending network requests have been finished, and we may also consider other
 * methods in the future.
 */
export interface ActionCompletionCheck {
  $type?: "pb.v1alpha1.ActionCompletionCheck";
  networkIdle?: ActionCompletionCheckNetworkIdle | undefined;
}

export interface ActionCompletionCheckNetworkIdle {
  $type?: "pb.v1alpha1.ActionCompletionCheck.NetworkIdle";
  /** If for {networkCheckTime}ms, there is no pending request, we consider as network is idle */
  networkCheckTime?:
    | number
    | undefined;
  /** The maximum time to wait for no pending network requests */
  timeout?:
    | number
    | undefined;
  /**
   * The time to skip checking network requests, this is used for most of no-request actions.
   * If in {skipTime}ms, there is no request out, then we return without waiting for the full {networkCheckTime}
   */
  skipTime?: number | undefined;
}

export interface ActionVerification {
  $type?: "pb.v1alpha1.ActionVerification";
  outgoingRequests?: ActionVerificationOutgoingRequest[] | undefined;
  elementAssertions?: ActionVerificationElementAssertion[] | undefined;
  listAssertion?:
    | ActionVerificationListAssertion
    | undefined;
  /**
   * JavaScript code to be evaluated in any one of the EvaluateScriptContext(s) to check if the execution
   * is successful. Only the return value true would be treated as success.
   *
   * @deprecated
   */
  evaluateScript?:
    | ActionVerificationEvaluateScript
    | undefined;
  /**
   * JavaScript code to be evaluated in any one of the EvaluateScriptContext(s) to check if the execution
   * is successful. Only the return value true would be treated as success.
   * globalThis.actionContext is a global variable that contains the context of the action.
   * It contains the following fields:
   * - output: the output of the action
   */
  evaluateScripts?: ActionVerificationEvaluateScript[] | undefined;
}

export enum ActionVerificationOutgoingRequestMethod {
  GET = 0,
  POST = 1,
  PUT = 2,
  DELETE = 3,
  UNRECOGNIZED = -1,
}

export function actionVerificationOutgoingRequestMethodFromJSON(object: any): ActionVerificationOutgoingRequestMethod {
  switch (object) {
    case 0:
    case "GET":
      return ActionVerificationOutgoingRequestMethod.GET;
    case 1:
    case "POST":
      return ActionVerificationOutgoingRequestMethod.POST;
    case 2:
    case "PUT":
      return ActionVerificationOutgoingRequestMethod.PUT;
    case 3:
    case "DELETE":
      return ActionVerificationOutgoingRequestMethod.DELETE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionVerificationOutgoingRequestMethod.UNRECOGNIZED;
  }
}

export function actionVerificationOutgoingRequestMethodToJSON(object: ActionVerificationOutgoingRequestMethod): string {
  switch (object) {
    case ActionVerificationOutgoingRequestMethod.GET:
      return "GET";
    case ActionVerificationOutgoingRequestMethod.POST:
      return "POST";
    case ActionVerificationOutgoingRequestMethod.PUT:
      return "PUT";
    case ActionVerificationOutgoingRequestMethod.DELETE:
      return "DELETE";
    case ActionVerificationOutgoingRequestMethod.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ActionVerificationEvaluateScriptContext {
  UNSPECIFIED = 0,
  MAIN_WORLD = 1,
  CONTENT_SCRIPT = 2,
  SERVICE_WORKER = 3,
  UNRECOGNIZED = -1,
}

export function actionVerificationEvaluateScriptContextFromJSON(object: any): ActionVerificationEvaluateScriptContext {
  switch (object) {
    case 0:
    case "EVALUATE_SCRIPT_CONTEXT_UNSPECIFIED":
      return ActionVerificationEvaluateScriptContext.UNSPECIFIED;
    case 1:
    case "MAIN_WORLD":
      return ActionVerificationEvaluateScriptContext.MAIN_WORLD;
    case 2:
    case "CONTENT_SCRIPT":
      return ActionVerificationEvaluateScriptContext.CONTENT_SCRIPT;
    case 3:
    case "SERVICE_WORKER":
      return ActionVerificationEvaluateScriptContext.SERVICE_WORKER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionVerificationEvaluateScriptContext.UNRECOGNIZED;
  }
}

export function actionVerificationEvaluateScriptContextToJSON(object: ActionVerificationEvaluateScriptContext): string {
  switch (object) {
    case ActionVerificationEvaluateScriptContext.UNSPECIFIED:
      return "EVALUATE_SCRIPT_CONTEXT_UNSPECIFIED";
    case ActionVerificationEvaluateScriptContext.MAIN_WORLD:
      return "MAIN_WORLD";
    case ActionVerificationEvaluateScriptContext.CONTENT_SCRIPT:
      return "CONTENT_SCRIPT";
    case ActionVerificationEvaluateScriptContext.SERVICE_WORKER:
      return "SERVICE_WORKER";
    case ActionVerificationEvaluateScriptContext.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ActionVerificationOutgoingRequestBody {
  $type?: "pb.v1alpha1.ActionVerification.OutgoingRequestBody";
  json?: string | undefined;
  raw?: Uint8Array | undefined;
}

export interface ActionVerificationOutgoingRequest {
  $type?: "pb.v1alpha1.ActionVerification.OutgoingRequest";
  url?: string | undefined;
  method?: ActionVerificationOutgoingRequestMethod | undefined;
  body?: ActionVerificationOutgoingRequestBody | undefined;
}

export interface ActionVerificationElementAssertion {
  $type?: "pb.v1alpha1.ActionVerification.ElementAssertion";
  locator?: ElementLocator | undefined;
  exists?: boolean | undefined;
  visible?: boolean | undefined;
}

export interface ActionVerificationListAssertion {
  $type?: "pb.v1alpha1.ActionVerification.ListAssertion";
  length?: ActionVerificationListAssertionListLength | undefined;
  columns?: ActionVerificationListAssertionListLength | undefined;
  values?: ActionVerificationListAssertionListValue[] | undefined;
}

export interface ActionVerificationListAssertionListLength {
  $type?: "pb.v1alpha1.ActionVerification.ListAssertion.ListLength";
  equal?: number | undefined;
}

export interface ActionVerificationListAssertionTextAssertion {
  $type?: "pb.v1alpha1.ActionVerification.ListAssertion.TextAssertion";
  equal?: string | undefined;
  contains?: string | undefined;
}

export interface ActionVerificationListAssertionFieldValueAssertion {
  $type?: "pb.v1alpha1.ActionVerification.ListAssertion.FieldValueAssertion";
  key?: string | undefined;
  text?: ActionVerificationListAssertionTextAssertion | undefined;
}

export interface ActionVerificationListAssertionListValue {
  $type?: "pb.v1alpha1.ActionVerification.ListAssertion.ListValue";
  index?: number | undefined;
  fields?: ActionVerificationListAssertionFieldValueAssertion[] | undefined;
}

export interface ActionVerificationEvaluateScript {
  $type?: "pb.v1alpha1.ActionVerification.EvaluateScript";
  script?:
    | string
    | undefined;
  /** If no context is specified, the script would be run in the MAIN_WORLD */
  context?: ActionVerificationEvaluateScriptContext | undefined;
}

/**
 * ActionGroup is a group of actions that are executed together.
 * In Dashboard, we also visualize the action group as a single step.
 * One ActionGroup can have multiple PreparedActions, but 2 control flow actions (foreach, condition) cannot be in the same level and same group.
 * The reason is that it's hard to visualize foreach and condition in the same step.
 * But they can be nested. e.g foreach -> condition, or condition -> foreach, or foreach -> foreach (our executor doesn't support yet), or condition -> condition, etc.
 * Deprecated: use Action instead
 */
export interface ActionGroup {
  $type?: "pb.v1alpha1.ActionGroup";
  /** Generated description that is shown to the user. */
  description?: string | undefined;
  preparedActions?:
    | PreparedAction[]
    | undefined;
  /** The page snapshot/screenshot that are picked during the inference. */
  snapshot?: RecordedFile | undefined;
  screenshot?:
    | RecordedFile
    | undefined;
  /** uuid for the action group, used to reference between high-level steps. */
  uuid?: string | undefined;
}

export interface PartialReferenceValue {
  $type?: "pb.v1alpha1.PartialReferenceValue";
  referenceValue?: string | undefined;
  referenceValueKey?: string | undefined;
}

/**
 * An action parameter value can be defined in two ways:
 * 1. static param that is defined during workflow definition, such as ExtractField
 *    with firstName and lastName.
 * 2. dynamic param from prior actions. For example, a FillFormAction relies
 *    on data from a prior ExtractFieldAction execution.
 */
export interface ActionParamValue {
  $type?: "pb.v1alpha1.ActionParamValue";
  /**
   * json formatted parameter value that will be passed into high-level-actions.
   * the value is fixed when we define the workflow.
   */
  jsonValue?:
    | string
    | undefined;
  /**
   * parameter value that refers to the output from another action.
   * it should always be an ID of a prior action in the same workflow.
   */
  referenceValue?:
    | string
    | undefined;
  /**
   * refers to the environment variable set by the task discovery system.
   * the value is available when we start the workflow.
   */
  envValue?:
    | string
    | undefined;
  /** refers to runtime variable, such as the loop index */
  contextValue?:
    | ContextValue
    | undefined;
  /**
   * refers to a secret ID with value stored in go/secret-manager.
   * TODO: remove legacy_secret_value after migration
   *
   * @deprecated
   */
  legacySecretValue?: string | undefined;
  secretValue?:
    | SecretValue
    | undefined;
  /** reference value with a key path, used to extract a specific field */
  partialReferenceValue?: PartialReferenceValue | undefined;
}

/**
 * PreparedActions are generated after recording.
 *
 * The naming is similar to SQL prepared statement, which is a feature used to
 * execute the same (or similar) SQL statements repeatedly with high efficiency.
 * Here we preprocess the recorded actions into high-level actions in order for
 * it to be executed more efficiently and reliably.
 * (FM) this is a superset of the FM atomic action
 * Deprecated: use Action instead
 */
export interface PreparedAction {
  $type?: "pb.v1alpha1.PreparedAction";
  /** uuid for the action, used to reference between steps for parameter passing. */
  uuid?:
    | string
    | undefined;
  /**
   * The parameters that is used to perform the action.
   * Deprecated: set parameter in each action instead
   *
   * @deprecated
   */
  params?:
    | ActionParamValue[]
    | undefined;
  /**
   * User might want to stop and review certain actions before proceeding, e.g.
   * clicking the Submit button for a form. This usually happens for operations
   * that has side effects such as create/update/delete.
   */
  requiresReview?:
    | boolean
    | undefined;
  /**
   * which tab shall we perform the action. tabIndex is generated and assigned
   * during recording and we map them to the dynamic tabId during execution.
   */
  tabIndex?: number | undefined;
  gotoAction?: GotoAction | undefined;
  clickAction?: ClickAction | undefined;
  getFormAction?: GetFormAction | undefined;
  fillFormAction?: FillFormAction | undefined;
  extractFieldsAction?: ExtractFieldsAction | undefined;
  jsFunctionAction?: JsFunctionAction | undefined;
  validateAction?: ValidateAction | undefined;
  conditionAction?: ConditionAction | undefined;
  foreachAction?: ForeachAction | undefined;
  getListAction?: GetListAction | undefined;
  getElementAction?: GetElementAction | undefined;
  flagKeywordsAction?: FlagKeywordsAction | undefined;
  detectDuplicateLineItemsAction?: DetectDuplicateLineItemsAction | undefined;
  createTaskAction?: CreateTaskAction | undefined;
  reconcileItemsAction?: ReconcileItemsAction | undefined;
  hoverAction?: HoverAction | undefined;
  exitAction?: ExitAction | undefined;
  setValueAction?: SetValueAction | undefined;
  customSmartAction?: CustomSmartAction | undefined;
  getDocumentAction?: GetDocumentAction | undefined;
  generateTextAction?: GenerateTextAction | undefined;
  classifyAction?: ClassifyAction | undefined;
}

/** File generated during action recording */
export interface RecordedFile {
  $type?: "pb.v1alpha1.RecordedFile";
  id?:
    | string
    | undefined;
  /** short-lived URL (~15 minute) to access the file */
  url?: string | undefined;
}

/**
 * Actions generated when we execute the workflow.
 * Compared to RecordedAction, this would be initiated by Orbot with a PreparedAction.
 * which might be mapped to multiple DOM action, and has execution context like input/output.
 */
export interface ExecutedAction {
  $type?: "pb.v1alpha1.ExecutedAction";
  /** the PreparedAction that was executed. */
  preparedActionUuid?:
    | string
    | undefined;
  /** input/output of the action, where each value is serialized in JSON format. */
  paramValues?:
    | string[]
    | undefined;
  /**
   * the actual output of an action, there is no necessary bond between output_value and predicted_output_value.
   * e.g reconcile action, output_value is a boolean indicating whether there is fallout or not.
   */
  outputValue?:
    | string
    | undefined;
  /**
   * the original predicted value for SmartAction requests in serialized JSON format.
   * duplicated from smart_action_response
   *
   * @deprecated
   */
  predictedOutputValue?:
    | string
    | undefined;
  /** Whether we have triggered human review for this action during execution. */
  humanReviewTriggered?:
    | boolean
    | undefined;
  /** human review time in milliseconds computed as the total time that the task tab is active for human review. */
  humanReviewTimeInMs?:
    | number
    | undefined;
  /** for billing purpose */
  numProcessedPages?:
    | number
    | undefined;
  /** Screenshot of the page before the action is executed. */
  screenshot?:
    | RecordedFile
    | undefined;
  /** HTML representation of the page before the action takes place. */
  snapshot?:
    | RecordedFile
    | undefined;
  /** Persist the request for auditing and debugging. */
  smartActionRequest?: ProcessSmartActionsRequest | undefined;
  smartActionResponse?:
    | ProcessSmartActionsResponse
    | undefined;
  /**
   * if human overrides a value during review, corrected_smart_action_response would store the
   * overridden value. If the value is not overridden, corrected_smart_action_response would be empty.
   */
  correctedSmartActionResponse?: ProcessSmartActionsResponse | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  macroActionExecution?:
    | MacroActionExecution
    | undefined;
  /** Corresponding Id for the HITL task trigger by the action. */
  reviewTaskId?: string | undefined;
}

export interface GotoAction {
  $type?: "pb.v1alpha1.GotoAction";
  url?: ActionParamValue | undefined;
}

/**
 * For launching desktop application with optional parameters, including
 * navigating to URLs in the browser.
 *
 * Example 1: open the given URL in the default browser. Which would open the
 * browser if it it not open, create a new empty tab, and navigate to the URL.
 * {
 *   params: '"https://google.com"'
 * }
 * NOTE: on the server side, we can send this action directly to the browser
 * agent if it is online, otherwise send it to the desktop agent to have it
 * start the browser together with the browser agent.
 *
 * Example 2: open Notepad on Windows. Note we don't need to specify the full
 * path for applications that is in the system path.
 * {
 *   application: 'notepad.exe'
 * }
 *
 * Example 3: open the given Excel file
 * {
 *   application: 'excel.exe'
 *   params: '"D:\\Data\test.xls"'
 * }
 *
 * Example 4: use a generic internal application with full path
 * {
 *   application: 'C:\\Program Files\SomeCorp\MyTool.exe'
 * }
 */
export interface LaunchAction {
  $type?: "pb.v1alpha1.LaunchAction";
  application?: string | undefined;
  params?: ActionParamValue[] | undefined;
}

export interface ClickAction {
  $type?: "pb.v1alpha1.ClickAction";
  /**
   * Deprecated: use locator instead.
   *
   * @deprecated
   */
  elementLocator?:
    | ElementLocator
    | undefined;
  /** deprecated: use ClickType.RIGHT_CLICK instead. */
  isDoubleClick?: boolean | undefined;
  type?: ClickType | undefined;
  locator?: ActionParamValue | undefined;
}

export interface HoverAction {
  $type?: "pb.v1alpha1.HoverAction";
  /**
   * Deprecated: use locator instead.
   *
   * @deprecated
   */
  elementLocator?: ElementLocator | undefined;
  locator?: ActionParamValue | undefined;
}

/**
 * Get an element on the HTML page, which can be used:
 * 1. check if an element (such as a button) exists;
 * 2. get the content of the element, such as page/modal titles.
 *
 * The output can be used to perform different branches of actions. For example,
 * * perform receipt validation only if the Receipt Image tab is present in Concur
 * * route receipt to additional approvals, if the modal title is "Approval Workflow for Report"
 *
 * There are a few read/extract actions, each with its own focs:
 * * ExtractEntity extract semantic entities from the page, which usually requires LLM understanding.
 * * GetForm reads structured field usually from HTML forms.
 * * GetElement reads a single HTML elements that are relatively stable, such as buttons.
 * * GetList reads list of similar elements.
 */
export interface GetElementAction {
  $type?: "pb.v1alpha1.GetElementAction";
  /**
   * Deprecated: use element_locator instead.
   *
   * @deprecated
   */
  locator?: ElementLocator | undefined;
  elementLocator?: ActionParamValue | undefined;
}

/**
 * Get form schema as well as current form value.
 *
 * Form schema is based on JSON schema, such as:
 * {
 *   "type": "object"
 *   "properties": {
 *     "givenName": {
 *       "type": "string"
 *     }
 *   }
 * }
 *
 * From value is a JSON object, such as:
 * {
 *   "givenName": "John"
 * }
 */
export interface GetFormAction {
  $type?: "pb.v1alpha1.GetFormAction";
  formLocator?: ElementLocator | undefined;
}

/**
 * Fill form with the given values.
 * Deprecated: use SetValueAction instead
 */
export interface FillFormAction {
  $type?: "pb.v1alpha1.FillFormAction";
  formLocator?:
    | ElementLocator
    | undefined;
  /** Default to false. If true, press Enter key after filling the form. */
  pressEnter?: boolean | undefined;
}

/**
 * Compared to FillFormAction that can handle multiple form fields, SetValueAction
 * only set value for a single form field
 * (FM) synonmous with TYPE and SELECT
 */
export interface SetValueAction {
  $type?: "pb.v1alpha1.SetValueAction";
  fieldLocator?: ActionParamValue | undefined;
  fieldValue?:
    | ActionParamValue
    | undefined;
  /** Default to false. If true, press Enter key after filling the form. */
  pressEnter?: boolean | undefined;
}

/**
 * Extracts fields from one or more documents (HTML, PDF, images etc) with the given schema.
 * This action usually requires API call to the Orby server for the document extraction.
 */
export interface ExtractFieldsAction {
  $type?: "pb.v1alpha1.ExtractFieldsAction";
  document?:
    | ActionParamValue
    | undefined;
  /**
   * list of fields to be extracted
   * Deprecated: use entities instead
   *
   * @deprecated
   */
  fields?:
    | string[]
    | undefined;
  /** List of entities to be extracted, supports nested entities */
  entities?: Field[] | undefined;
}

/** Each validate rule can output an string message if validation fails. */
export interface ValidateAction {
  $type?: "pb.v1alpha1.ValidateAction";
  /** Source representing the ground truth, it can be a form or a document. */
  source?:
    | ActionParamValue
    | undefined;
  /** Target representing the data to be validated, it's usually document but can also be a form. */
  target?:
    | ActionParamValue
    | undefined;
  /** NL description of the validation rule, which is sent to validation API. */
  rule?:
    | string
    | undefined;
  /** list of fields to be validated */
  fields?:
    | string[]
    | undefined;
  /** Additional metadata for the validate action, e.g. report header */
  metadata?: { [key: string]: ActionParamValue } | undefined;
}

export interface ValidateActionMetadataEntry {
  $type?: "pb.v1alpha1.ValidateAction.MetadataEntry";
  key: string;
  value?: ActionParamValue | undefined;
}

/**
 * Javascript function can be used to generate output in any format from
 * 1. zero or more output from prior actions.
 * 2. global context, such as current date etc.
 */
export interface JsFunctionAction {
  $type?: "pb.v1alpha1.JsFunctionAction";
  /** NL description of what the function does. */
  description?:
    | string
    | undefined;
  /** function parameter names, which are referred to in the function body */
  paramNames?: string[] | undefined;
  params?:
    | ActionParamValue[]
    | undefined;
  /** generated function body */
  body?: string | undefined;
}

/**
 * Condition actions take a single boolean/string param, and execute different branches.
 * For string param, the empty string evaluates to false and non-empty to true.
 */
export interface ConditionAction {
  $type?: "pb.v1alpha1.ConditionAction";
  condition?:
    | ActionParamValue
    | undefined;
  /**
   * Next action if condition value is true.
   *
   * @deprecated
   */
  trueActions?:
    | ActionGroup[]
    | undefined;
  /**
   * Next action if condition value is false.
   *
   * @deprecated
   */
  falseActions?: ActionGroup[] | undefined;
  thenActions?: Action[] | undefined;
  elseActions?: Action[] | undefined;
}

export interface GetListAction {
  $type?: "pb.v1alpha1.GetListAction";
  listLocator?: ElementLocator | undefined;
}

export interface UpdateListAction {
  $type?: "pb.v1alpha1.UpdateListAction";
  listLocator?: ActionParamValue | undefined;
  updates?: ActionParamValue | undefined;
}

export interface FieldUpdate {
  $type?: "pb.v1alpha1.FieldUpdate";
  fieldGroupIndex?: number | undefined;
  fields?: Field[] | undefined;
}

export interface ForeachAction {
  $type?: "pb.v1alpha1.ForeachAction";
  /** items to be iterated through */
  items?:
    | ActionParamValue
    | undefined;
  /** @deprecated */
  actions?: ActionGroup[] | undefined;
  loopActions?: Action[] | undefined;
}

export interface FlagKeywordsAction {
  $type?: "pb.v1alpha1.FlagKeywordsAction";
  keywords?:
    | string[]
    | undefined;
  /** list of fields to include in flagging keywords */
  fields?: string[] | undefined;
  source?: ActionParamValue | undefined;
}

export interface DetectDuplicateLineItemsAction {
  $type?: "pb.v1alpha1.DetectDuplicateLineItemsAction";
  duplicates?: string[] | undefined;
  source?: ActionParamValue | undefined;
}

/** Variables that are passed for execution as global env_value */
export interface WorkflowVariable {
  $type?: "pb.v1alpha1.WorkflowVariable";
  key?:
    | string
    | undefined;
  /** Only allow string values for simplicity, similar to OS environment variables. */
  value?: string | undefined;
}

/** Create a workflow task */
export interface CreateTaskAction {
  $type?: "pb.v1alpha1.CreateTaskAction";
  workflowId?:
    | string
    | undefined;
  /** the process within a workflow to start the task */
  processId?:
    | string
    | undefined;
  /**
   * deprecated, use task_variables instead
   *
   * @deprecated
   */
  workflowVariables?: ActionParamValue[] | undefined;
  variables?: CreateTaskActionVariable[] | undefined;
}

/**
 * pass given variables to the following execution. Both key and value can be
 * dynamic.
 */
export interface CreateTaskActionVariable {
  $type?: "pb.v1alpha1.CreateTaskAction.Variable";
  key?: ActionParamValue | undefined;
  value?: ActionParamValue | undefined;
}

export interface ReconcileItemsAction {
  $type?: "pb.v1alpha1.ReconcileItemsAction";
  items?: ReconcileItemsActionItemLocator[] | undefined;
}

export interface ReconcileItemsActionItemLocator {
  $type?: "pb.v1alpha1.ReconcileItemsAction.ItemLocator";
  tabIndex?: number | undefined;
  fieldGroups?: ElementLocator | undefined;
  documents?: ElementLocator[] | undefined;
}

/** Update the data table on the HTML page. */
export interface UpdateDataTableAction {
  $type?: "pb.v1alpha1.UpdateDataTableAction";
  tableLocator?: ElementLocator | undefined;
}

export interface ExitAction {
  $type?: "pb.v1alpha1.ExitAction";
  status?: ExitActionExitStatus | undefined;
  message?: string | undefined;
}

export enum ExitActionExitStatus {
  EXIST_STATUS_UNSPECIFIED = 0,
  SUCCESS = 1,
  ERROR = 2,
  UNRECOGNIZED = -1,
}

export function exitActionExitStatusFromJSON(object: any): ExitActionExitStatus {
  switch (object) {
    case 0:
    case "EXIST_STATUS_UNSPECIFIED":
      return ExitActionExitStatus.EXIST_STATUS_UNSPECIFIED;
    case 1:
    case "SUCCESS":
      return ExitActionExitStatus.SUCCESS;
    case 2:
    case "ERROR":
      return ExitActionExitStatus.ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ExitActionExitStatus.UNRECOGNIZED;
  }
}

export function exitActionExitStatusToJSON(object: ExitActionExitStatus): string {
  switch (object) {
    case ExitActionExitStatus.EXIST_STATUS_UNSPECIFIED:
      return "EXIST_STATUS_UNSPECIFIED";
    case ExitActionExitStatus.SUCCESS:
      return "SUCCESS";
    case ExitActionExitStatus.ERROR:
      return "ERROR";
    case ExitActionExitStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Allow user to define custom actions that are not supported by default. */
export interface CustomSmartAction {
  $type?: "pb.v1alpha1.CustomSmartAction";
  /** key value pairs as input to the action */
  inputs?:
    | { [key: string]: ActionParamValue }
    | undefined;
  /** NL description of what the action does */
  rule?: string | undefined;
}

export interface CustomSmartActionInputsEntry {
  $type?: "pb.v1alpha1.CustomSmartAction.InputsEntry";
  key: string;
  value?: ActionParamValue | undefined;
}

export interface GetDocumentAction {
  $type?: "pb.v1alpha1.GetDocumentAction";
  documentLocator?: ElementLocator | undefined;
}

/**
 * A generic action to generate text based on user prompted rule.
 * Example: Generate a summary based on the extracted fields from a document
 */
export interface GenerateTextAction {
  $type?: "pb.v1alpha1.GenerateTextAction";
  /** Expected to be reference value of any previous action output */
  inputs?:
    | ActionParamValue[]
    | undefined;
  /** User defined prompt for text generation */
  prompt?: string | undefined;
}

/**
 * A generic action to classify any input into predefined categories with a
 * confidence score and explanation. A few example use cases:
 * - Receipt validation (check a document is a valid receipt according to the policy)
 * - Risk analysis (use the confidence score as a measure of risk)
 * - Ranking (use the confidence score as measure of relevance)
 * - Sentiment analysis, such as is this review positive or negative
 */
export interface ClassifyAction {
  $type?: "pb.v1alpha1.ClassifyAction";
  /** Expected to be reference value of any previous action output */
  inputs?:
    | ActionParamValue[]
    | undefined;
  /** Either user defined prompt or preset should be provided for classification */
  prompt?: string | undefined;
  preset?: ClassifyClassifyPreset | undefined;
}

/** Action to send an email with optional attachment. */
export interface SendEmailAction {
  $type?: "pb.v1alpha1.SendEmailAction";
  recipients?: ActionParamValue[] | undefined;
  subject?: ActionParamValue | undefined;
  body?: SendEmailActionBody | undefined;
  attachments?: SendEmailActionAttachment[] | undefined;
}

export interface SendEmailActionAttachment {
  $type?: "pb.v1alpha1.SendEmailAction.Attachment";
  filename?: ActionParamValue | undefined;
  content?: ActionParamValue | undefined;
}

export interface SendEmailActionBody {
  $type?: "pb.v1alpha1.SendEmailAction.Body";
  /** plaintext content with MIME type of `text/plain` */
  plain?:
    | ActionParamValue
    | undefined;
  /** rich content with MIME type of `text/html` */
  html?: ActionParamValue | undefined;
}

/**
 * Get the one-time passcode, which is usually for MFA. Expect to support:
 * 1. One-time password: TOTP (RFC 6238) and HOTP (RFC 4226). The secret param is
 *    stored in secret manager, while the other parameters are stored inside
 *    the action for simplicity. The code is generated locally after fetching
 *    the secret value.
 * 2. SMS-based code. The phone number is stored locally. During execution, we
 *    need to call the Orbot.GetSmsAuthCode API  to get the auth code, and
 *
 * NOTE: This action only generates auth code, which is expected to be used by a
 * following setValue action. For example in a SMS-based MFA workflow, we would
 * have the following actions:
 * (1) click send code button on the page
 * (2) call this action to retrieve the SMS code
 * (3) fill in the code on the page
 */
export interface GetPasscodeAction {
  $type?: "pb.v1alpha1.GetPasscodeAction";
  totp?: GetPasscodeActionTotp | undefined;
  hotp?: GetPasscodeActionHotp | undefined;
  sms?: GetPasscodeActionSms | undefined;
}

/** See https://github.com/hectorm/otpauth?tab=readme-ov-file#supported-hashing-algorithms */
export enum GetPasscodeActionOtpAlgorithm {
  UNSPECIFIED = 0,
  SHA1 = 1,
  SHA224 = 2,
  SHA256 = 3,
  SHA384 = 4,
  SHA512 = 5,
  SHA3_224 = 6,
  SHA3_256 = 7,
  SHA3_384 = 8,
  SHA3_512 = 9,
  UNRECOGNIZED = -1,
}

export function getPasscodeActionOtpAlgorithmFromJSON(object: any): GetPasscodeActionOtpAlgorithm {
  switch (object) {
    case 0:
    case "OTP_ALGORITHM_UNSPECIFIED":
      return GetPasscodeActionOtpAlgorithm.UNSPECIFIED;
    case 1:
    case "SHA1":
      return GetPasscodeActionOtpAlgorithm.SHA1;
    case 2:
    case "SHA224":
      return GetPasscodeActionOtpAlgorithm.SHA224;
    case 3:
    case "SHA256":
      return GetPasscodeActionOtpAlgorithm.SHA256;
    case 4:
    case "SHA384":
      return GetPasscodeActionOtpAlgorithm.SHA384;
    case 5:
    case "SHA512":
      return GetPasscodeActionOtpAlgorithm.SHA512;
    case 6:
    case "SHA3_224":
      return GetPasscodeActionOtpAlgorithm.SHA3_224;
    case 7:
    case "SHA3_256":
      return GetPasscodeActionOtpAlgorithm.SHA3_256;
    case 8:
    case "SHA3_384":
      return GetPasscodeActionOtpAlgorithm.SHA3_384;
    case 9:
    case "SHA3_512":
      return GetPasscodeActionOtpAlgorithm.SHA3_512;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetPasscodeActionOtpAlgorithm.UNRECOGNIZED;
  }
}

export function getPasscodeActionOtpAlgorithmToJSON(object: GetPasscodeActionOtpAlgorithm): string {
  switch (object) {
    case GetPasscodeActionOtpAlgorithm.UNSPECIFIED:
      return "OTP_ALGORITHM_UNSPECIFIED";
    case GetPasscodeActionOtpAlgorithm.SHA1:
      return "SHA1";
    case GetPasscodeActionOtpAlgorithm.SHA224:
      return "SHA224";
    case GetPasscodeActionOtpAlgorithm.SHA256:
      return "SHA256";
    case GetPasscodeActionOtpAlgorithm.SHA384:
      return "SHA384";
    case GetPasscodeActionOtpAlgorithm.SHA512:
      return "SHA512";
    case GetPasscodeActionOtpAlgorithm.SHA3_224:
      return "SHA3_224";
    case GetPasscodeActionOtpAlgorithm.SHA3_256:
      return "SHA3_256";
    case GetPasscodeActionOtpAlgorithm.SHA3_384:
      return "SHA3_384";
    case GetPasscodeActionOtpAlgorithm.SHA3_512:
      return "SHA3_512";
    case GetPasscodeActionOtpAlgorithm.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** See RFC 6238: https://datatracker.ietf.org/doc/html/rfc6238 */
export interface GetPasscodeActionTotp {
  $type?: "pb.v1alpha1.GetPasscodeAction.Totp";
  secret?: ActionParamValue | undefined;
  algorithm?: GetPasscodeActionOtpAlgorithm | undefined;
  digits?: number | undefined;
}

/** See RFC 4226: https://datatracker.ietf.org/doc/html/rfc4226 */
export interface GetPasscodeActionHotp {
  $type?: "pb.v1alpha1.GetPasscodeAction.Hotp";
  secret?: ActionParamValue | undefined;
  algorithm?: GetPasscodeActionOtpAlgorithm | undefined;
  digits?: number | undefined;
  counter?: number | undefined;
}

/** SMS-based code with a phone number that is registered during workflow setup */
export interface GetPasscodeActionSms {
  $type?: "pb.v1alpha1.GetPasscodeAction.Sms";
  /** Phone number should be in the E.164 format: https://www.twilio.com/docs/glossary/what-e164 */
  phoneNumber?: string | undefined;
}

export interface ScrollAction {
  $type?: "pb.v1alpha1.ScrollAction";
  scrollBy?: ScrollActionScrollBy | undefined;
  scrollTo?:
    | ScrollActionScrollTo
    | undefined;
  /** The scrollable container where the scroll action is observed. */
  container?: ActionParamValue | undefined;
}

/**
 * Scroll the document by given pixels.
 * Similar to https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy
 */
export interface ScrollActionScrollBy {
  $type?: "pb.v1alpha1.ScrollAction.ScrollBy";
  x?: number | undefined;
  y?: number | undefined;
}

/**
 * Scroll the window to a particular place in the document.
 * Similar to https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll
 */
export interface ScrollActionScrollTo {
  $type?: "pb.v1alpha1.ScrollAction.ScrollTo";
  position?: ScrollActionScrollToPosition | undefined;
  preset?: ScrollActionScrollToPresetPosition | undefined;
}

export enum ScrollActionScrollToPresetPosition {
  UNSPECIFIED = 0,
  TOP = 1,
  BOTTOM = 2,
  LEFTMOST = 3,
  RIGHTMOST = 4,
  UNRECOGNIZED = -1,
}

export function scrollActionScrollToPresetPositionFromJSON(object: any): ScrollActionScrollToPresetPosition {
  switch (object) {
    case 0:
    case "PRESET_POSITION_UNSPECIFIED":
      return ScrollActionScrollToPresetPosition.UNSPECIFIED;
    case 1:
    case "TOP":
      return ScrollActionScrollToPresetPosition.TOP;
    case 2:
    case "BOTTOM":
      return ScrollActionScrollToPresetPosition.BOTTOM;
    case 3:
    case "LEFTMOST":
      return ScrollActionScrollToPresetPosition.LEFTMOST;
    case 4:
    case "RIGHTMOST":
      return ScrollActionScrollToPresetPosition.RIGHTMOST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ScrollActionScrollToPresetPosition.UNRECOGNIZED;
  }
}

export function scrollActionScrollToPresetPositionToJSON(object: ScrollActionScrollToPresetPosition): string {
  switch (object) {
    case ScrollActionScrollToPresetPosition.UNSPECIFIED:
      return "PRESET_POSITION_UNSPECIFIED";
    case ScrollActionScrollToPresetPosition.TOP:
      return "TOP";
    case ScrollActionScrollToPresetPosition.BOTTOM:
      return "BOTTOM";
    case ScrollActionScrollToPresetPosition.LEFTMOST:
      return "LEFTMOST";
    case ScrollActionScrollToPresetPosition.RIGHTMOST:
      return "RIGHTMOST";
    case ScrollActionScrollToPresetPosition.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ScrollActionScrollToPosition {
  $type?: "pb.v1alpha1.ScrollAction.ScrollTo.Position";
  x?: number | undefined;
  y?: number | undefined;
}

/**
 * Track when the focus changes between different applications, browser tabs or
 * UI elements. Right now this is mainly to allow us to capture those actions
 * for Process Discovery observation mode and isn't leveraged by the automation
 * execution since the focus change is implicit for the actual action.
 *
 * Example 1: focus change between different browser tabs
 * action {
 *   focus {
 *   }
 *   tabIndex: 1
 * }
 *
 * Example 2: focus change between different applications
 * action {
 *   focus {
 *   }
 *   windowIndex: 1
 * }
 *
 * Example 3: focus change between different UI elements for Windows application.
 * action {
 *   focus {
 *     element {
 *       json_value: '{"label": "Save"}'
 *     }
 *   }
 *   windowIndex: 1
 * }
 */
export interface FocusAction {
  $type?: "pb.v1alpha1.FocusAction";
  element?: ActionParamValue | undefined;
}

export interface MacroAction {
  $type?: "pb.v1alpha1.MacroAction";
  login?: MacroActionLogin | undefined;
  generic?: MacroActionGeneric | undefined;
}

export interface MacroActionLogin {
  $type?: "pb.v1alpha1.MacroActionLogin";
  /**
   * Use the origin (host URL) when the workflow is a template.
   * This is because secret block IDs are different across orgs, so
   * this way, orgs can share templates.
   */
  origin?:
    | string
    | undefined;
  /** Secret block ID must be used when workflow is executing */
  secretBlockId?:
    | string
    | undefined;
  /**
   * When MFA is involved for login, we can persist relevant information in
   * GetPasscodeAction.
   *
   * For workflow execution:
   * 1. the server calls ML action inference with the GetPasscodeAction field,
   *    along with all the secret fields (such as username/password).
   *    NOTE: we don't need to resolve any ActionParamValue such as Totp.secret
   *    since that is not needed for action inference.
   * 2. if ML decides it's time to do MFA, it would return an ActionBlock with
   *    two actions: GetPasscodeAction to generate the passcode and SetValue to
   *    paste the value (with ActionParamValue.reference_value) on a UI element.
   *
   * There might be multiple MFA available so this field is marked as repeated.
   */
  passcodeActions?: GetPasscodeAction[] | undefined;
}

export interface MacroActionGeneric {
  $type?: "pb.v1alpha1.MacroActionGeneric";
  /**
   * The instruction that we'll pass to the LLM to generate the action.
   * Environment variables (ActionParamValue.env_value) can be passed in via
   * jinja syntax, e.g. "{{invoice_id}}" if there is an environment variable called
   * invoice_id.
   * Note that to make things explicit, any variables that the instruction
   * is using needs to be declared in template_variables field below.
   */
  instruction?:
    | string
    | undefined;
  /** The variables that we want the instruction to have access to. */
  instructionVariables?: ActionParamValue[] | undefined;
}

export interface MacroActionExecution {
  $type?: "pb.v1alpha1.MacroActionExecution";
  /**
   * The action that was executed.
   * It has to be separate because the element from the response will be using
   * the elementID, not the elementLocator or locator that our executor will use.
   * This object shall store that.
   * Will be empty if macro_action_response.success
   * or macro_action_response.error is set
   */
  action?:
    | Action
    | undefined;
  /** Error message from the macro action execution */
  errorType?: MacroActionExecutionError | undefined;
  errorMessage?: string | undefined;
  macroActionContext?: MacroActionInferContext | undefined;
  macroActionStep?: MacroActionStep | undefined;
}

/** the context would be populated on the extension side */
export interface MacroActionInferContext {
  $type?: "pb.v1alpha1.MacroActionInferContext";
  uiState?: UiState | undefined;
}

/**
 * result for a MacroAction inference, which can either be an action to execute,
 * or terminate the execution either successfully or not.
 */
export interface MacroActionStep {
  $type?: "pb.v1alpha1.MacroActionStep";
  /** user Action.block if multiple actions can be executed in a step. */
  action?: Action | undefined;
  success?: MacroActionStepSuccess | undefined;
  error?: MacroActionStepError | undefined;
  debugInfo?: MacroActionStepDebugInfo | undefined;
}

export enum MacroActionStepTerminateActionErrorType {
  UNSPECIFIED = 0,
  TRAJECTORY_LENGTH_EXCEEDED = 1,
  LOOP_DETECTED = 2,
  UNRECOGNIZED = -1,
}

export function macroActionStepTerminateActionErrorTypeFromJSON(object: any): MacroActionStepTerminateActionErrorType {
  switch (object) {
    case 0:
    case "TERMINATE_ACTION_ERROR_TYPE_UNSPECIFIED":
      return MacroActionStepTerminateActionErrorType.UNSPECIFIED;
    case 1:
    case "TRAJECTORY_LENGTH_EXCEEDED":
      return MacroActionStepTerminateActionErrorType.TRAJECTORY_LENGTH_EXCEEDED;
    case 2:
    case "LOOP_DETECTED":
      return MacroActionStepTerminateActionErrorType.LOOP_DETECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MacroActionStepTerminateActionErrorType.UNRECOGNIZED;
  }
}

export function macroActionStepTerminateActionErrorTypeToJSON(object: MacroActionStepTerminateActionErrorType): string {
  switch (object) {
    case MacroActionStepTerminateActionErrorType.UNSPECIFIED:
      return "TERMINATE_ACTION_ERROR_TYPE_UNSPECIFIED";
    case MacroActionStepTerminateActionErrorType.TRAJECTORY_LENGTH_EXCEEDED:
      return "TRAJECTORY_LENGTH_EXCEEDED";
    case MacroActionStepTerminateActionErrorType.LOOP_DETECTED:
      return "LOOP_DETECTED";
    case MacroActionStepTerminateActionErrorType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface MacroActionStepSuccess {
  $type?: "pb.v1alpha1.MacroActionStep.Success";
}

export interface MacroActionStepError {
  $type?: "pb.v1alpha1.MacroActionStep.Error";
  type?: MacroActionStepTerminateActionErrorType | undefined;
  message?: string | undefined;
}

/** TODO: Add more detailed response regarding model name, family, llm prompt, etc. */
export interface MacroActionStepDebugInfo {
  $type?: "pb.v1alpha1.MacroActionStep.DebugInfo";
  llmResponse?: string | undefined;
}

export interface UserEvent {
  $type?: "pb.v1alpha1.UserEvent";
  userId?: string | undefined;
  userAgent?: string | undefined;
  url?: string | undefined;
  windowId?: number | undefined;
  sessionId?: string | undefined;
  tabId?: number | undefined;
  timestamp?: Date | undefined;
  action?: Action | undefined;
}

function createBasePageContent(): PageContent {
  return { $type: "pb.v1alpha1.PageContent", elements: [] };
}

export const PageContent = {
  $type: "pb.v1alpha1.PageContent" as const,

  encode(message: PageContent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.elements !== undefined && message.elements.length !== 0) {
      for (const v of message.elements) {
        PageContentElement.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PageContent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePageContent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.elements!.push(PageContentElement.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PageContent {
    return {
      $type: PageContent.$type,
      elements: globalThis.Array.isArray(object?.elements)
        ? object.elements.map((e: any) => PageContentElement.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PageContent): unknown {
    const obj: any = {};
    if (message.elements?.length) {
      obj.elements = message.elements.map((e) => PageContentElement.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PageContent>, I>>(base?: I): PageContent {
    return PageContent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PageContent>, I>>(object: I): PageContent {
    const message = createBasePageContent();
    message.elements = object.elements?.map((e) => PageContentElement.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(PageContent.$type, PageContent);

function createBasePageContentElement(): PageContentElement {
  return { $type: "pb.v1alpha1.PageContent.Element", tag: undefined, text: undefined };
}

export const PageContentElement = {
  $type: "pb.v1alpha1.PageContent.Element" as const,

  encode(message: PageContentElement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tag !== undefined) {
      PageContentElementTag.encode(message.tag, writer.uint32(18).fork()).ldelim();
    }
    if (message.text !== undefined) {
      writer.uint32(26).string(message.text);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PageContentElement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePageContentElement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tag = PageContentElementTag.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.text = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PageContentElement {
    return {
      $type: PageContentElement.$type,
      tag: isSet(object.tag) ? PageContentElementTag.fromJSON(object.tag) : undefined,
      text: isSet(object.text) ? globalThis.String(object.text) : undefined,
    };
  },

  toJSON(message: PageContentElement): unknown {
    const obj: any = {};
    if (message.tag !== undefined) {
      obj.tag = PageContentElementTag.toJSON(message.tag);
    }
    if (message.text !== undefined) {
      obj.text = message.text;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PageContentElement>, I>>(base?: I): PageContentElement {
    return PageContentElement.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PageContentElement>, I>>(object: I): PageContentElement {
    const message = createBasePageContentElement();
    message.tag = (object.tag !== undefined && object.tag !== null)
      ? PageContentElementTag.fromPartial(object.tag)
      : undefined;
    message.text = object.text ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(PageContentElement.$type, PageContentElement);

function createBasePageContentElementTag(): PageContentElementTag {
  return { $type: "pb.v1alpha1.PageContent.Element.Tag", orbyId: "", name: "", children: [], attributes: {} };
}

export const PageContentElementTag = {
  $type: "pb.v1alpha1.PageContent.Element.Tag" as const,

  encode(message: PageContentElementTag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orbyId !== undefined && message.orbyId !== "") {
      writer.uint32(34).string(message.orbyId);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.children !== undefined && message.children.length !== 0) {
      for (const v of message.children) {
        PageContentElement.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    Object.entries(message.attributes || {}).forEach(([key, value]) => {
      PageContentElementTagAttributesEntry.encode({
        $type: "pb.v1alpha1.PageContent.Element.Tag.AttributesEntry",
        key: key as any,
        value,
      }, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PageContentElementTag {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePageContentElementTag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.orbyId = reader.string();
          continue;
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

          message.children!.push(PageContentElement.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = PageContentElementTagAttributesEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.attributes![entry3.key] = entry3.value;
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

  fromJSON(object: any): PageContentElementTag {
    return {
      $type: PageContentElementTag.$type,
      orbyId: isSet(object.orbyId) ? globalThis.String(object.orbyId) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      children: globalThis.Array.isArray(object?.children)
        ? object.children.map((e: any) => PageContentElement.fromJSON(e))
        : [],
      attributes: isObject(object.attributes)
        ? Object.entries(object.attributes).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: PageContentElementTag): unknown {
    const obj: any = {};
    if (message.orbyId !== undefined && message.orbyId !== "") {
      obj.orbyId = message.orbyId;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.children?.length) {
      obj.children = message.children.map((e) => PageContentElement.toJSON(e));
    }
    if (message.attributes) {
      const entries = Object.entries(message.attributes);
      if (entries.length > 0) {
        obj.attributes = {};
        entries.forEach(([k, v]) => {
          obj.attributes[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PageContentElementTag>, I>>(base?: I): PageContentElementTag {
    return PageContentElementTag.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PageContentElementTag>, I>>(object: I): PageContentElementTag {
    const message = createBasePageContentElementTag();
    message.orbyId = object.orbyId ?? "";
    message.name = object.name ?? "";
    message.children = object.children?.map((e) => PageContentElement.fromPartial(e)) || [];
    message.attributes = Object.entries(object.attributes ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = globalThis.String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

messageTypeRegistry.set(PageContentElementTag.$type, PageContentElementTag);

function createBasePageContentElementTagAttributesEntry(): PageContentElementTagAttributesEntry {
  return { $type: "pb.v1alpha1.PageContent.Element.Tag.AttributesEntry", key: "", value: "" };
}

export const PageContentElementTagAttributesEntry = {
  $type: "pb.v1alpha1.PageContent.Element.Tag.AttributesEntry" as const,

  encode(message: PageContentElementTagAttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PageContentElementTagAttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePageContentElementTagAttributesEntry();
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

  fromJSON(object: any): PageContentElementTagAttributesEntry {
    return {
      $type: PageContentElementTagAttributesEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: PageContentElementTagAttributesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PageContentElementTagAttributesEntry>, I>>(
    base?: I,
  ): PageContentElementTagAttributesEntry {
    return PageContentElementTagAttributesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PageContentElementTagAttributesEntry>, I>>(
    object: I,
  ): PageContentElementTagAttributesEntry {
    const message = createBasePageContentElementTagAttributesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

messageTypeRegistry.set(PageContentElementTagAttributesEntry.$type, PageContentElementTagAttributesEntry);

function createBaseUiState(): UiState {
  return {
    $type: "pb.v1alpha1.UiState",
    viewportScreenshot: undefined,
    viewportWidth: 0,
    viewportHeight: 0,
    rootElement: undefined,
    url: "",
    capturedAt: undefined,
  };
}

export const UiState = {
  $type: "pb.v1alpha1.UiState" as const,

  encode(message: UiState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.viewportScreenshot !== undefined) {
      RecordedFile.encode(message.viewportScreenshot, writer.uint32(10).fork()).ldelim();
    }
    if (message.viewportWidth !== undefined && message.viewportWidth !== 0) {
      writer.uint32(16).int32(message.viewportWidth);
    }
    if (message.viewportHeight !== undefined && message.viewportHeight !== 0) {
      writer.uint32(24).int32(message.viewportHeight);
    }
    if (message.rootElement !== undefined) {
      RecordedFile.encode(message.rootElement, writer.uint32(34).fork()).ldelim();
    }
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(42).string(message.url);
    }
    if (message.capturedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.capturedAt), writer.uint32(378).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UiState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUiState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.viewportScreenshot = RecordedFile.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.viewportWidth = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.viewportHeight = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.rootElement = RecordedFile.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.url = reader.string();
          continue;
        case 47:
          if (tag !== 378) {
            break;
          }

          message.capturedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UiState {
    return {
      $type: UiState.$type,
      viewportScreenshot: isSet(object.viewportScreenshot)
        ? RecordedFile.fromJSON(object.viewportScreenshot)
        : undefined,
      viewportWidth: isSet(object.viewportWidth) ? globalThis.Number(object.viewportWidth) : 0,
      viewportHeight: isSet(object.viewportHeight) ? globalThis.Number(object.viewportHeight) : 0,
      rootElement: isSet(object.rootElement) ? RecordedFile.fromJSON(object.rootElement) : undefined,
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      capturedAt: isSet(object.capturedAt) ? fromJsonTimestamp(object.capturedAt) : undefined,
    };
  },

  toJSON(message: UiState): unknown {
    const obj: any = {};
    if (message.viewportScreenshot !== undefined) {
      obj.viewportScreenshot = RecordedFile.toJSON(message.viewportScreenshot);
    }
    if (message.viewportWidth !== undefined && message.viewportWidth !== 0) {
      obj.viewportWidth = Math.round(message.viewportWidth);
    }
    if (message.viewportHeight !== undefined && message.viewportHeight !== 0) {
      obj.viewportHeight = Math.round(message.viewportHeight);
    }
    if (message.rootElement !== undefined) {
      obj.rootElement = RecordedFile.toJSON(message.rootElement);
    }
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    if (message.capturedAt !== undefined) {
      obj.capturedAt = message.capturedAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UiState>, I>>(base?: I): UiState {
    return UiState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UiState>, I>>(object: I): UiState {
    const message = createBaseUiState();
    message.viewportScreenshot = (object.viewportScreenshot !== undefined && object.viewportScreenshot !== null)
      ? RecordedFile.fromPartial(object.viewportScreenshot)
      : undefined;
    message.viewportWidth = object.viewportWidth ?? 0;
    message.viewportHeight = object.viewportHeight ?? 0;
    message.rootElement = (object.rootElement !== undefined && object.rootElement !== null)
      ? RecordedFile.fromPartial(object.rootElement)
      : undefined;
    message.url = object.url ?? "";
    message.capturedAt = object.capturedAt ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UiState.$type, UiState);

function createBaseActionBlock(): ActionBlock {
  return { $type: "pb.v1alpha1.ActionBlock", actions: [], kind: 0 };
}

export const ActionBlock = {
  $type: "pb.v1alpha1.ActionBlock" as const,

  encode(message: ActionBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.actions !== undefined && message.actions.length !== 0) {
      for (const v of message.actions) {
        Action.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.kind !== undefined && message.kind !== 0) {
      writer.uint32(16).int32(message.kind);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.actions!.push(Action.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.kind = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionBlock {
    return {
      $type: ActionBlock.$type,
      actions: globalThis.Array.isArray(object?.actions) ? object.actions.map((e: any) => Action.fromJSON(e)) : [],
      kind: isSet(object.kind) ? actionBlockKindFromJSON(object.kind) : 0,
    };
  },

  toJSON(message: ActionBlock): unknown {
    const obj: any = {};
    if (message.actions?.length) {
      obj.actions = message.actions.map((e) => Action.toJSON(e));
    }
    if (message.kind !== undefined && message.kind !== 0) {
      obj.kind = actionBlockKindToJSON(message.kind);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionBlock>, I>>(base?: I): ActionBlock {
    return ActionBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionBlock>, I>>(object: I): ActionBlock {
    const message = createBaseActionBlock();
    message.actions = object.actions?.map((e) => Action.fromPartial(e)) || [];
    message.kind = object.kind ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ActionBlock.$type, ActionBlock);

function createBasePrerequisiteAction(): PrerequisiteAction {
  return { $type: "pb.v1alpha1.PrerequisiteAction", action: undefined, type: 0 };
}

export const PrerequisiteAction = {
  $type: "pb.v1alpha1.PrerequisiteAction" as const,

  encode(message: PrerequisiteAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PrerequisiteAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrerequisiteAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.action = Action.decode(reader, reader.uint32());
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

  fromJSON(object: any): PrerequisiteAction {
    return {
      $type: PrerequisiteAction.$type,
      action: isSet(object.action) ? Action.fromJSON(object.action) : undefined,
      type: isSet(object.type) ? prerequisiteActionPrerequisiteTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: PrerequisiteAction): unknown {
    const obj: any = {};
    if (message.action !== undefined) {
      obj.action = Action.toJSON(message.action);
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = prerequisiteActionPrerequisiteTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PrerequisiteAction>, I>>(base?: I): PrerequisiteAction {
    return PrerequisiteAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PrerequisiteAction>, I>>(object: I): PrerequisiteAction {
    const message = createBasePrerequisiteAction();
    message.action = (object.action !== undefined && object.action !== null)
      ? Action.fromPartial(object.action)
      : undefined;
    message.type = object.type ?? 0;
    return message;
  },
};

messageTypeRegistry.set(PrerequisiteAction.$type, PrerequisiteAction);

function createBaseAction(): Action {
  return {
    $type: "pb.v1alpha1.Action",
    id: "",
    description: "",
    prerequisites: [],
    block: undefined,
    goto: undefined,
    click: undefined,
    getForm: undefined,
    fillForm: undefined,
    extractFields: undefined,
    jsFunction: undefined,
    validate: undefined,
    condition: undefined,
    foreach: undefined,
    getList: undefined,
    updateList: undefined,
    getElement: undefined,
    flagKeywords: undefined,
    detectDuplicateLineItems: undefined,
    createTask: undefined,
    reconcileItems: undefined,
    hover: undefined,
    exit: undefined,
    setValue: undefined,
    customSmartAction: undefined,
    getDocument: undefined,
    scrollAction: undefined,
    generateText: undefined,
    classify: undefined,
    sendEmail: undefined,
    getPasscode: undefined,
    macro: undefined,
    launch: undefined,
    focus: undefined,
    proceedingExecution: undefined,
    tabIndex: 0,
    windowIndex: 0,
    snapshot: undefined,
    screenshot: undefined,
    beforeState: undefined,
    verification: undefined,
    completionCheck: undefined,
    lowLevelActionType: 0,
    elementIds: [],
    rawEvents: [],
    observedAt: undefined,
    completedAt: undefined,
    hyperparameterId: "",
  };
}

export const Action = {
  $type: "pb.v1alpha1.Action" as const,

  encode(message: Action, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.prerequisites !== undefined && message.prerequisites.length !== 0) {
      for (const v of message.prerequisites) {
        PrerequisiteAction.encode(v!, writer.uint32(258).fork()).ldelim();
      }
    }
    if (message.block !== undefined) {
      ActionBlock.encode(message.block, writer.uint32(26).fork()).ldelim();
    }
    if (message.goto !== undefined) {
      GotoAction.encode(message.goto, writer.uint32(34).fork()).ldelim();
    }
    if (message.click !== undefined) {
      ClickAction.encode(message.click, writer.uint32(42).fork()).ldelim();
    }
    if (message.getForm !== undefined) {
      GetFormAction.encode(message.getForm, writer.uint32(50).fork()).ldelim();
    }
    if (message.fillForm !== undefined) {
      FillFormAction.encode(message.fillForm, writer.uint32(58).fork()).ldelim();
    }
    if (message.extractFields !== undefined) {
      ExtractFieldsAction.encode(message.extractFields, writer.uint32(66).fork()).ldelim();
    }
    if (message.jsFunction !== undefined) {
      JsFunctionAction.encode(message.jsFunction, writer.uint32(74).fork()).ldelim();
    }
    if (message.validate !== undefined) {
      ValidateAction.encode(message.validate, writer.uint32(82).fork()).ldelim();
    }
    if (message.condition !== undefined) {
      ConditionAction.encode(message.condition, writer.uint32(90).fork()).ldelim();
    }
    if (message.foreach !== undefined) {
      ForeachAction.encode(message.foreach, writer.uint32(98).fork()).ldelim();
    }
    if (message.getList !== undefined) {
      GetListAction.encode(message.getList, writer.uint32(106).fork()).ldelim();
    }
    if (message.updateList !== undefined) {
      UpdateListAction.encode(message.updateList, writer.uint32(354).fork()).ldelim();
    }
    if (message.getElement !== undefined) {
      GetElementAction.encode(message.getElement, writer.uint32(130).fork()).ldelim();
    }
    if (message.flagKeywords !== undefined) {
      FlagKeywordsAction.encode(message.flagKeywords, writer.uint32(138).fork()).ldelim();
    }
    if (message.detectDuplicateLineItems !== undefined) {
      DetectDuplicateLineItemsAction.encode(message.detectDuplicateLineItems, writer.uint32(146).fork()).ldelim();
    }
    if (message.createTask !== undefined) {
      CreateTaskAction.encode(message.createTask, writer.uint32(154).fork()).ldelim();
    }
    if (message.reconcileItems !== undefined) {
      ReconcileItemsAction.encode(message.reconcileItems, writer.uint32(162).fork()).ldelim();
    }
    if (message.hover !== undefined) {
      HoverAction.encode(message.hover, writer.uint32(178).fork()).ldelim();
    }
    if (message.exit !== undefined) {
      ExitAction.encode(message.exit, writer.uint32(186).fork()).ldelim();
    }
    if (message.setValue !== undefined) {
      SetValueAction.encode(message.setValue, writer.uint32(194).fork()).ldelim();
    }
    if (message.customSmartAction !== undefined) {
      CustomSmartAction.encode(message.customSmartAction, writer.uint32(202).fork()).ldelim();
    }
    if (message.getDocument !== undefined) {
      GetDocumentAction.encode(message.getDocument, writer.uint32(210).fork()).ldelim();
    }
    if (message.scrollAction !== undefined) {
      ScrollAction.encode(message.scrollAction, writer.uint32(250).fork()).ldelim();
    }
    if (message.generateText !== undefined) {
      GenerateTextAction.encode(message.generateText, writer.uint32(274).fork()).ldelim();
    }
    if (message.classify !== undefined) {
      ClassifyAction.encode(message.classify, writer.uint32(282).fork()).ldelim();
    }
    if (message.sendEmail !== undefined) {
      SendEmailAction.encode(message.sendEmail, writer.uint32(322).fork()).ldelim();
    }
    if (message.getPasscode !== undefined) {
      GetPasscodeAction.encode(message.getPasscode, writer.uint32(338).fork()).ldelim();
    }
    if (message.macro !== undefined) {
      MacroAction.encode(message.macro, writer.uint32(370).fork()).ldelim();
    }
    if (message.launch !== undefined) {
      LaunchAction.encode(message.launch, writer.uint32(386).fork()).ldelim();
    }
    if (message.focus !== undefined) {
      FocusAction.encode(message.focus, writer.uint32(402).fork()).ldelim();
    }
    if (message.proceedingExecution !== undefined) {
      ProceedingExecution.encode(message.proceedingExecution, writer.uint32(362).fork()).ldelim();
    }
    if (message.tabIndex !== undefined && message.tabIndex !== 0) {
      writer.uint32(168).int32(message.tabIndex);
    }
    if (message.windowIndex !== undefined && message.windowIndex !== 0) {
      writer.uint32(392).int32(message.windowIndex);
    }
    if (message.snapshot !== undefined) {
      RecordedFile.encode(message.snapshot, writer.uint32(218).fork()).ldelim();
    }
    if (message.screenshot !== undefined) {
      RecordedFile.encode(message.screenshot, writer.uint32(226).fork()).ldelim();
    }
    if (message.beforeState !== undefined) {
      UiState.encode(message.beforeState, writer.uint32(306).fork()).ldelim();
    }
    if (message.verification !== undefined) {
      ActionVerification.encode(message.verification, writer.uint32(234).fork()).ldelim();
    }
    if (message.completionCheck !== undefined) {
      ActionCompletionCheck.encode(message.completionCheck, writer.uint32(330).fork()).ldelim();
    }
    if (message.lowLevelActionType !== undefined && message.lowLevelActionType !== 0) {
      writer.uint32(240).int32(message.lowLevelActionType);
    }
    if (message.elementIds !== undefined && message.elementIds.length !== 0) {
      for (const v of message.elementIds) {
        writer.uint32(266).string(v!);
      }
    }
    if (message.rawEvents !== undefined && message.rawEvents.length !== 0) {
      for (const v of message.rawEvents) {
        UiEvent.encode(v!, writer.uint32(314).fork()).ldelim();
      }
    }
    if (message.observedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.observedAt), writer.uint32(346).fork()).ldelim();
    }
    if (message.completedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.completedAt), writer.uint32(378).fork()).ldelim();
    }
    if (message.hyperparameterId !== undefined && message.hyperparameterId !== "") {
      writer.uint32(410).string(message.hyperparameterId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Action {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction();
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

          message.description = reader.string();
          continue;
        case 32:
          if (tag !== 258) {
            break;
          }

          message.prerequisites!.push(PrerequisiteAction.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.block = ActionBlock.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.goto = GotoAction.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.click = ClickAction.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.getForm = GetFormAction.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.fillForm = FillFormAction.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.extractFields = ExtractFieldsAction.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.jsFunction = JsFunctionAction.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.validate = ValidateAction.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.condition = ConditionAction.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.foreach = ForeachAction.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.getList = GetListAction.decode(reader, reader.uint32());
          continue;
        case 44:
          if (tag !== 354) {
            break;
          }

          message.updateList = UpdateListAction.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.getElement = GetElementAction.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.flagKeywords = FlagKeywordsAction.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.detectDuplicateLineItems = DetectDuplicateLineItemsAction.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.createTask = CreateTaskAction.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.reconcileItems = ReconcileItemsAction.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.hover = HoverAction.decode(reader, reader.uint32());
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.exit = ExitAction.decode(reader, reader.uint32());
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.setValue = SetValueAction.decode(reader, reader.uint32());
          continue;
        case 25:
          if (tag !== 202) {
            break;
          }

          message.customSmartAction = CustomSmartAction.decode(reader, reader.uint32());
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.getDocument = GetDocumentAction.decode(reader, reader.uint32());
          continue;
        case 31:
          if (tag !== 250) {
            break;
          }

          message.scrollAction = ScrollAction.decode(reader, reader.uint32());
          continue;
        case 34:
          if (tag !== 274) {
            break;
          }

          message.generateText = GenerateTextAction.decode(reader, reader.uint32());
          continue;
        case 35:
          if (tag !== 282) {
            break;
          }

          message.classify = ClassifyAction.decode(reader, reader.uint32());
          continue;
        case 40:
          if (tag !== 322) {
            break;
          }

          message.sendEmail = SendEmailAction.decode(reader, reader.uint32());
          continue;
        case 42:
          if (tag !== 338) {
            break;
          }

          message.getPasscode = GetPasscodeAction.decode(reader, reader.uint32());
          continue;
        case 46:
          if (tag !== 370) {
            break;
          }

          message.macro = MacroAction.decode(reader, reader.uint32());
          continue;
        case 48:
          if (tag !== 386) {
            break;
          }

          message.launch = LaunchAction.decode(reader, reader.uint32());
          continue;
        case 50:
          if (tag !== 402) {
            break;
          }

          message.focus = FocusAction.decode(reader, reader.uint32());
          continue;
        case 45:
          if (tag !== 362) {
            break;
          }

          message.proceedingExecution = ProceedingExecution.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.tabIndex = reader.int32();
          continue;
        case 49:
          if (tag !== 392) {
            break;
          }

          message.windowIndex = reader.int32();
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.snapshot = RecordedFile.decode(reader, reader.uint32());
          continue;
        case 28:
          if (tag !== 226) {
            break;
          }

          message.screenshot = RecordedFile.decode(reader, reader.uint32());
          continue;
        case 38:
          if (tag !== 306) {
            break;
          }

          message.beforeState = UiState.decode(reader, reader.uint32());
          continue;
        case 29:
          if (tag !== 234) {
            break;
          }

          message.verification = ActionVerification.decode(reader, reader.uint32());
          continue;
        case 41:
          if (tag !== 330) {
            break;
          }

          message.completionCheck = ActionCompletionCheck.decode(reader, reader.uint32());
          continue;
        case 30:
          if (tag !== 240) {
            break;
          }

          message.lowLevelActionType = reader.int32() as any;
          continue;
        case 33:
          if (tag !== 266) {
            break;
          }

          message.elementIds!.push(reader.string());
          continue;
        case 39:
          if (tag !== 314) {
            break;
          }

          message.rawEvents!.push(UiEvent.decode(reader, reader.uint32()));
          continue;
        case 43:
          if (tag !== 346) {
            break;
          }

          message.observedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 47:
          if (tag !== 378) {
            break;
          }

          message.completedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 51:
          if (tag !== 410) {
            break;
          }

          message.hyperparameterId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Action {
    return {
      $type: Action.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      prerequisites: globalThis.Array.isArray(object?.prerequisites)
        ? object.prerequisites.map((e: any) => PrerequisiteAction.fromJSON(e))
        : [],
      block: isSet(object.block) ? ActionBlock.fromJSON(object.block) : undefined,
      goto: isSet(object.goto) ? GotoAction.fromJSON(object.goto) : undefined,
      click: isSet(object.click) ? ClickAction.fromJSON(object.click) : undefined,
      getForm: isSet(object.getForm) ? GetFormAction.fromJSON(object.getForm) : undefined,
      fillForm: isSet(object.fillForm) ? FillFormAction.fromJSON(object.fillForm) : undefined,
      extractFields: isSet(object.extractFields) ? ExtractFieldsAction.fromJSON(object.extractFields) : undefined,
      jsFunction: isSet(object.jsFunction) ? JsFunctionAction.fromJSON(object.jsFunction) : undefined,
      validate: isSet(object.validate) ? ValidateAction.fromJSON(object.validate) : undefined,
      condition: isSet(object.condition) ? ConditionAction.fromJSON(object.condition) : undefined,
      foreach: isSet(object.foreach) ? ForeachAction.fromJSON(object.foreach) : undefined,
      getList: isSet(object.getList) ? GetListAction.fromJSON(object.getList) : undefined,
      updateList: isSet(object.updateList) ? UpdateListAction.fromJSON(object.updateList) : undefined,
      getElement: isSet(object.getElement) ? GetElementAction.fromJSON(object.getElement) : undefined,
      flagKeywords: isSet(object.flagKeywords) ? FlagKeywordsAction.fromJSON(object.flagKeywords) : undefined,
      detectDuplicateLineItems: isSet(object.detectDuplicateLineItems)
        ? DetectDuplicateLineItemsAction.fromJSON(object.detectDuplicateLineItems)
        : undefined,
      createTask: isSet(object.createTask) ? CreateTaskAction.fromJSON(object.createTask) : undefined,
      reconcileItems: isSet(object.reconcileItems) ? ReconcileItemsAction.fromJSON(object.reconcileItems) : undefined,
      hover: isSet(object.hover) ? HoverAction.fromJSON(object.hover) : undefined,
      exit: isSet(object.exit) ? ExitAction.fromJSON(object.exit) : undefined,
      setValue: isSet(object.setValue) ? SetValueAction.fromJSON(object.setValue) : undefined,
      customSmartAction: isSet(object.customSmartAction)
        ? CustomSmartAction.fromJSON(object.customSmartAction)
        : undefined,
      getDocument: isSet(object.getDocument) ? GetDocumentAction.fromJSON(object.getDocument) : undefined,
      scrollAction: isSet(object.scrollAction) ? ScrollAction.fromJSON(object.scrollAction) : undefined,
      generateText: isSet(object.generateText) ? GenerateTextAction.fromJSON(object.generateText) : undefined,
      classify: isSet(object.classify) ? ClassifyAction.fromJSON(object.classify) : undefined,
      sendEmail: isSet(object.sendEmail) ? SendEmailAction.fromJSON(object.sendEmail) : undefined,
      getPasscode: isSet(object.getPasscode) ? GetPasscodeAction.fromJSON(object.getPasscode) : undefined,
      macro: isSet(object.macro) ? MacroAction.fromJSON(object.macro) : undefined,
      launch: isSet(object.launch) ? LaunchAction.fromJSON(object.launch) : undefined,
      focus: isSet(object.focus) ? FocusAction.fromJSON(object.focus) : undefined,
      proceedingExecution: isSet(object.proceedingExecution)
        ? ProceedingExecution.fromJSON(object.proceedingExecution)
        : undefined,
      tabIndex: isSet(object.tabIndex) ? globalThis.Number(object.tabIndex) : 0,
      windowIndex: isSet(object.windowIndex) ? globalThis.Number(object.windowIndex) : 0,
      snapshot: isSet(object.snapshot) ? RecordedFile.fromJSON(object.snapshot) : undefined,
      screenshot: isSet(object.screenshot) ? RecordedFile.fromJSON(object.screenshot) : undefined,
      beforeState: isSet(object.beforeState) ? UiState.fromJSON(object.beforeState) : undefined,
      verification: isSet(object.verification) ? ActionVerification.fromJSON(object.verification) : undefined,
      completionCheck: isSet(object.completionCheck)
        ? ActionCompletionCheck.fromJSON(object.completionCheck)
        : undefined,
      lowLevelActionType: isSet(object.lowLevelActionType) ? lowLevelActionTypeFromJSON(object.lowLevelActionType) : 0,
      elementIds: globalThis.Array.isArray(object?.elementIds)
        ? object.elementIds.map((e: any) => globalThis.String(e))
        : [],
      rawEvents: globalThis.Array.isArray(object?.rawEvents)
        ? object.rawEvents.map((e: any) => UiEvent.fromJSON(e))
        : [],
      observedAt: isSet(object.observedAt) ? fromJsonTimestamp(object.observedAt) : undefined,
      completedAt: isSet(object.completedAt) ? fromJsonTimestamp(object.completedAt) : undefined,
      hyperparameterId: isSet(object.hyperparameterId) ? globalThis.String(object.hyperparameterId) : "",
    };
  },

  toJSON(message: Action): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.prerequisites?.length) {
      obj.prerequisites = message.prerequisites.map((e) => PrerequisiteAction.toJSON(e));
    }
    if (message.block !== undefined) {
      obj.block = ActionBlock.toJSON(message.block);
    }
    if (message.goto !== undefined) {
      obj.goto = GotoAction.toJSON(message.goto);
    }
    if (message.click !== undefined) {
      obj.click = ClickAction.toJSON(message.click);
    }
    if (message.getForm !== undefined) {
      obj.getForm = GetFormAction.toJSON(message.getForm);
    }
    if (message.fillForm !== undefined) {
      obj.fillForm = FillFormAction.toJSON(message.fillForm);
    }
    if (message.extractFields !== undefined) {
      obj.extractFields = ExtractFieldsAction.toJSON(message.extractFields);
    }
    if (message.jsFunction !== undefined) {
      obj.jsFunction = JsFunctionAction.toJSON(message.jsFunction);
    }
    if (message.validate !== undefined) {
      obj.validate = ValidateAction.toJSON(message.validate);
    }
    if (message.condition !== undefined) {
      obj.condition = ConditionAction.toJSON(message.condition);
    }
    if (message.foreach !== undefined) {
      obj.foreach = ForeachAction.toJSON(message.foreach);
    }
    if (message.getList !== undefined) {
      obj.getList = GetListAction.toJSON(message.getList);
    }
    if (message.updateList !== undefined) {
      obj.updateList = UpdateListAction.toJSON(message.updateList);
    }
    if (message.getElement !== undefined) {
      obj.getElement = GetElementAction.toJSON(message.getElement);
    }
    if (message.flagKeywords !== undefined) {
      obj.flagKeywords = FlagKeywordsAction.toJSON(message.flagKeywords);
    }
    if (message.detectDuplicateLineItems !== undefined) {
      obj.detectDuplicateLineItems = DetectDuplicateLineItemsAction.toJSON(message.detectDuplicateLineItems);
    }
    if (message.createTask !== undefined) {
      obj.createTask = CreateTaskAction.toJSON(message.createTask);
    }
    if (message.reconcileItems !== undefined) {
      obj.reconcileItems = ReconcileItemsAction.toJSON(message.reconcileItems);
    }
    if (message.hover !== undefined) {
      obj.hover = HoverAction.toJSON(message.hover);
    }
    if (message.exit !== undefined) {
      obj.exit = ExitAction.toJSON(message.exit);
    }
    if (message.setValue !== undefined) {
      obj.setValue = SetValueAction.toJSON(message.setValue);
    }
    if (message.customSmartAction !== undefined) {
      obj.customSmartAction = CustomSmartAction.toJSON(message.customSmartAction);
    }
    if (message.getDocument !== undefined) {
      obj.getDocument = GetDocumentAction.toJSON(message.getDocument);
    }
    if (message.scrollAction !== undefined) {
      obj.scrollAction = ScrollAction.toJSON(message.scrollAction);
    }
    if (message.generateText !== undefined) {
      obj.generateText = GenerateTextAction.toJSON(message.generateText);
    }
    if (message.classify !== undefined) {
      obj.classify = ClassifyAction.toJSON(message.classify);
    }
    if (message.sendEmail !== undefined) {
      obj.sendEmail = SendEmailAction.toJSON(message.sendEmail);
    }
    if (message.getPasscode !== undefined) {
      obj.getPasscode = GetPasscodeAction.toJSON(message.getPasscode);
    }
    if (message.macro !== undefined) {
      obj.macro = MacroAction.toJSON(message.macro);
    }
    if (message.launch !== undefined) {
      obj.launch = LaunchAction.toJSON(message.launch);
    }
    if (message.focus !== undefined) {
      obj.focus = FocusAction.toJSON(message.focus);
    }
    if (message.proceedingExecution !== undefined) {
      obj.proceedingExecution = ProceedingExecution.toJSON(message.proceedingExecution);
    }
    if (message.tabIndex !== undefined && message.tabIndex !== 0) {
      obj.tabIndex = Math.round(message.tabIndex);
    }
    if (message.windowIndex !== undefined && message.windowIndex !== 0) {
      obj.windowIndex = Math.round(message.windowIndex);
    }
    if (message.snapshot !== undefined) {
      obj.snapshot = RecordedFile.toJSON(message.snapshot);
    }
    if (message.screenshot !== undefined) {
      obj.screenshot = RecordedFile.toJSON(message.screenshot);
    }
    if (message.beforeState !== undefined) {
      obj.beforeState = UiState.toJSON(message.beforeState);
    }
    if (message.verification !== undefined) {
      obj.verification = ActionVerification.toJSON(message.verification);
    }
    if (message.completionCheck !== undefined) {
      obj.completionCheck = ActionCompletionCheck.toJSON(message.completionCheck);
    }
    if (message.lowLevelActionType !== undefined && message.lowLevelActionType !== 0) {
      obj.lowLevelActionType = lowLevelActionTypeToJSON(message.lowLevelActionType);
    }
    if (message.elementIds?.length) {
      obj.elementIds = message.elementIds;
    }
    if (message.rawEvents?.length) {
      obj.rawEvents = message.rawEvents.map((e) => UiEvent.toJSON(e));
    }
    if (message.observedAt !== undefined) {
      obj.observedAt = message.observedAt.toISOString();
    }
    if (message.completedAt !== undefined) {
      obj.completedAt = message.completedAt.toISOString();
    }
    if (message.hyperparameterId !== undefined && message.hyperparameterId !== "") {
      obj.hyperparameterId = message.hyperparameterId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Action>, I>>(base?: I): Action {
    return Action.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Action>, I>>(object: I): Action {
    const message = createBaseAction();
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.prerequisites = object.prerequisites?.map((e) => PrerequisiteAction.fromPartial(e)) || [];
    message.block = (object.block !== undefined && object.block !== null)
      ? ActionBlock.fromPartial(object.block)
      : undefined;
    message.goto = (object.goto !== undefined && object.goto !== null)
      ? GotoAction.fromPartial(object.goto)
      : undefined;
    message.click = (object.click !== undefined && object.click !== null)
      ? ClickAction.fromPartial(object.click)
      : undefined;
    message.getForm = (object.getForm !== undefined && object.getForm !== null)
      ? GetFormAction.fromPartial(object.getForm)
      : undefined;
    message.fillForm = (object.fillForm !== undefined && object.fillForm !== null)
      ? FillFormAction.fromPartial(object.fillForm)
      : undefined;
    message.extractFields = (object.extractFields !== undefined && object.extractFields !== null)
      ? ExtractFieldsAction.fromPartial(object.extractFields)
      : undefined;
    message.jsFunction = (object.jsFunction !== undefined && object.jsFunction !== null)
      ? JsFunctionAction.fromPartial(object.jsFunction)
      : undefined;
    message.validate = (object.validate !== undefined && object.validate !== null)
      ? ValidateAction.fromPartial(object.validate)
      : undefined;
    message.condition = (object.condition !== undefined && object.condition !== null)
      ? ConditionAction.fromPartial(object.condition)
      : undefined;
    message.foreach = (object.foreach !== undefined && object.foreach !== null)
      ? ForeachAction.fromPartial(object.foreach)
      : undefined;
    message.getList = (object.getList !== undefined && object.getList !== null)
      ? GetListAction.fromPartial(object.getList)
      : undefined;
    message.updateList = (object.updateList !== undefined && object.updateList !== null)
      ? UpdateListAction.fromPartial(object.updateList)
      : undefined;
    message.getElement = (object.getElement !== undefined && object.getElement !== null)
      ? GetElementAction.fromPartial(object.getElement)
      : undefined;
    message.flagKeywords = (object.flagKeywords !== undefined && object.flagKeywords !== null)
      ? FlagKeywordsAction.fromPartial(object.flagKeywords)
      : undefined;
    message.detectDuplicateLineItems =
      (object.detectDuplicateLineItems !== undefined && object.detectDuplicateLineItems !== null)
        ? DetectDuplicateLineItemsAction.fromPartial(object.detectDuplicateLineItems)
        : undefined;
    message.createTask = (object.createTask !== undefined && object.createTask !== null)
      ? CreateTaskAction.fromPartial(object.createTask)
      : undefined;
    message.reconcileItems = (object.reconcileItems !== undefined && object.reconcileItems !== null)
      ? ReconcileItemsAction.fromPartial(object.reconcileItems)
      : undefined;
    message.hover = (object.hover !== undefined && object.hover !== null)
      ? HoverAction.fromPartial(object.hover)
      : undefined;
    message.exit = (object.exit !== undefined && object.exit !== null)
      ? ExitAction.fromPartial(object.exit)
      : undefined;
    message.setValue = (object.setValue !== undefined && object.setValue !== null)
      ? SetValueAction.fromPartial(object.setValue)
      : undefined;
    message.customSmartAction = (object.customSmartAction !== undefined && object.customSmartAction !== null)
      ? CustomSmartAction.fromPartial(object.customSmartAction)
      : undefined;
    message.getDocument = (object.getDocument !== undefined && object.getDocument !== null)
      ? GetDocumentAction.fromPartial(object.getDocument)
      : undefined;
    message.scrollAction = (object.scrollAction !== undefined && object.scrollAction !== null)
      ? ScrollAction.fromPartial(object.scrollAction)
      : undefined;
    message.generateText = (object.generateText !== undefined && object.generateText !== null)
      ? GenerateTextAction.fromPartial(object.generateText)
      : undefined;
    message.classify = (object.classify !== undefined && object.classify !== null)
      ? ClassifyAction.fromPartial(object.classify)
      : undefined;
    message.sendEmail = (object.sendEmail !== undefined && object.sendEmail !== null)
      ? SendEmailAction.fromPartial(object.sendEmail)
      : undefined;
    message.getPasscode = (object.getPasscode !== undefined && object.getPasscode !== null)
      ? GetPasscodeAction.fromPartial(object.getPasscode)
      : undefined;
    message.macro = (object.macro !== undefined && object.macro !== null)
      ? MacroAction.fromPartial(object.macro)
      : undefined;
    message.launch = (object.launch !== undefined && object.launch !== null)
      ? LaunchAction.fromPartial(object.launch)
      : undefined;
    message.focus = (object.focus !== undefined && object.focus !== null)
      ? FocusAction.fromPartial(object.focus)
      : undefined;
    message.proceedingExecution = (object.proceedingExecution !== undefined && object.proceedingExecution !== null)
      ? ProceedingExecution.fromPartial(object.proceedingExecution)
      : undefined;
    message.tabIndex = object.tabIndex ?? 0;
    message.windowIndex = object.windowIndex ?? 0;
    message.snapshot = (object.snapshot !== undefined && object.snapshot !== null)
      ? RecordedFile.fromPartial(object.snapshot)
      : undefined;
    message.screenshot = (object.screenshot !== undefined && object.screenshot !== null)
      ? RecordedFile.fromPartial(object.screenshot)
      : undefined;
    message.beforeState = (object.beforeState !== undefined && object.beforeState !== null)
      ? UiState.fromPartial(object.beforeState)
      : undefined;
    message.verification = (object.verification !== undefined && object.verification !== null)
      ? ActionVerification.fromPartial(object.verification)
      : undefined;
    message.completionCheck = (object.completionCheck !== undefined && object.completionCheck !== null)
      ? ActionCompletionCheck.fromPartial(object.completionCheck)
      : undefined;
    message.lowLevelActionType = object.lowLevelActionType ?? 0;
    message.elementIds = object.elementIds?.map((e) => e) || [];
    message.rawEvents = object.rawEvents?.map((e) => UiEvent.fromPartial(e)) || [];
    message.observedAt = object.observedAt ?? undefined;
    message.completedAt = object.completedAt ?? undefined;
    message.hyperparameterId = object.hyperparameterId ?? "";
    return message;
  },
};

messageTypeRegistry.set(Action.$type, Action);

function createBaseProceedingExecution(): ProceedingExecution {
  return { $type: "pb.v1alpha1.ProceedingExecution", processId: "", additionalVariables: [] };
}

export const ProceedingExecution = {
  $type: "pb.v1alpha1.ProceedingExecution" as const,

  encode(message: ProceedingExecution, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.processId !== undefined && message.processId !== "") {
      writer.uint32(10).string(message.processId);
    }
    if (message.additionalVariables !== undefined && message.additionalVariables.length !== 0) {
      for (const v of message.additionalVariables) {
        ActionParamValue.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProceedingExecution {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProceedingExecution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.processId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.additionalVariables!.push(ActionParamValue.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProceedingExecution {
    return {
      $type: ProceedingExecution.$type,
      processId: isSet(object.processId) ? globalThis.String(object.processId) : "",
      additionalVariables: globalThis.Array.isArray(object?.additionalVariables)
        ? object.additionalVariables.map((e: any) => ActionParamValue.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ProceedingExecution): unknown {
    const obj: any = {};
    if (message.processId !== undefined && message.processId !== "") {
      obj.processId = message.processId;
    }
    if (message.additionalVariables?.length) {
      obj.additionalVariables = message.additionalVariables.map((e) => ActionParamValue.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProceedingExecution>, I>>(base?: I): ProceedingExecution {
    return ProceedingExecution.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProceedingExecution>, I>>(object: I): ProceedingExecution {
    const message = createBaseProceedingExecution();
    message.processId = object.processId ?? "";
    message.additionalVariables = object.additionalVariables?.map((e) => ActionParamValue.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ProceedingExecution.$type, ProceedingExecution);

function createBaseActionCompletionCheck(): ActionCompletionCheck {
  return { $type: "pb.v1alpha1.ActionCompletionCheck", networkIdle: undefined };
}

export const ActionCompletionCheck = {
  $type: "pb.v1alpha1.ActionCompletionCheck" as const,

  encode(message: ActionCompletionCheck, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.networkIdle !== undefined) {
      ActionCompletionCheckNetworkIdle.encode(message.networkIdle, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionCompletionCheck {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionCompletionCheck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.networkIdle = ActionCompletionCheckNetworkIdle.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionCompletionCheck {
    return {
      $type: ActionCompletionCheck.$type,
      networkIdle: isSet(object.networkIdle)
        ? ActionCompletionCheckNetworkIdle.fromJSON(object.networkIdle)
        : undefined,
    };
  },

  toJSON(message: ActionCompletionCheck): unknown {
    const obj: any = {};
    if (message.networkIdle !== undefined) {
      obj.networkIdle = ActionCompletionCheckNetworkIdle.toJSON(message.networkIdle);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionCompletionCheck>, I>>(base?: I): ActionCompletionCheck {
    return ActionCompletionCheck.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionCompletionCheck>, I>>(object: I): ActionCompletionCheck {
    const message = createBaseActionCompletionCheck();
    message.networkIdle = (object.networkIdle !== undefined && object.networkIdle !== null)
      ? ActionCompletionCheckNetworkIdle.fromPartial(object.networkIdle)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ActionCompletionCheck.$type, ActionCompletionCheck);

function createBaseActionCompletionCheckNetworkIdle(): ActionCompletionCheckNetworkIdle {
  return { $type: "pb.v1alpha1.ActionCompletionCheck.NetworkIdle", networkCheckTime: 0, timeout: 0, skipTime: 0 };
}

export const ActionCompletionCheckNetworkIdle = {
  $type: "pb.v1alpha1.ActionCompletionCheck.NetworkIdle" as const,

  encode(message: ActionCompletionCheckNetworkIdle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.networkCheckTime !== undefined && message.networkCheckTime !== 0) {
      writer.uint32(8).int32(message.networkCheckTime);
    }
    if (message.timeout !== undefined && message.timeout !== 0) {
      writer.uint32(16).int32(message.timeout);
    }
    if (message.skipTime !== undefined && message.skipTime !== 0) {
      writer.uint32(24).int32(message.skipTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionCompletionCheckNetworkIdle {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionCompletionCheckNetworkIdle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.networkCheckTime = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.timeout = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.skipTime = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionCompletionCheckNetworkIdle {
    return {
      $type: ActionCompletionCheckNetworkIdle.$type,
      networkCheckTime: isSet(object.networkCheckTime) ? globalThis.Number(object.networkCheckTime) : 0,
      timeout: isSet(object.timeout) ? globalThis.Number(object.timeout) : 0,
      skipTime: isSet(object.skipTime) ? globalThis.Number(object.skipTime) : 0,
    };
  },

  toJSON(message: ActionCompletionCheckNetworkIdle): unknown {
    const obj: any = {};
    if (message.networkCheckTime !== undefined && message.networkCheckTime !== 0) {
      obj.networkCheckTime = Math.round(message.networkCheckTime);
    }
    if (message.timeout !== undefined && message.timeout !== 0) {
      obj.timeout = Math.round(message.timeout);
    }
    if (message.skipTime !== undefined && message.skipTime !== 0) {
      obj.skipTime = Math.round(message.skipTime);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionCompletionCheckNetworkIdle>, I>>(
    base?: I,
  ): ActionCompletionCheckNetworkIdle {
    return ActionCompletionCheckNetworkIdle.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionCompletionCheckNetworkIdle>, I>>(
    object: I,
  ): ActionCompletionCheckNetworkIdle {
    const message = createBaseActionCompletionCheckNetworkIdle();
    message.networkCheckTime = object.networkCheckTime ?? 0;
    message.timeout = object.timeout ?? 0;
    message.skipTime = object.skipTime ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ActionCompletionCheckNetworkIdle.$type, ActionCompletionCheckNetworkIdle);

function createBaseActionVerification(): ActionVerification {
  return {
    $type: "pb.v1alpha1.ActionVerification",
    outgoingRequests: [],
    elementAssertions: [],
    listAssertion: undefined,
    evaluateScript: undefined,
    evaluateScripts: [],
  };
}

export const ActionVerification = {
  $type: "pb.v1alpha1.ActionVerification" as const,

  encode(message: ActionVerification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.outgoingRequests !== undefined && message.outgoingRequests.length !== 0) {
      for (const v of message.outgoingRequests) {
        ActionVerificationOutgoingRequest.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.elementAssertions !== undefined && message.elementAssertions.length !== 0) {
      for (const v of message.elementAssertions) {
        ActionVerificationElementAssertion.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.listAssertion !== undefined) {
      ActionVerificationListAssertion.encode(message.listAssertion, writer.uint32(50).fork()).ldelim();
    }
    if (message.evaluateScript !== undefined) {
      ActionVerificationEvaluateScript.encode(message.evaluateScript, writer.uint32(34).fork()).ldelim();
    }
    if (message.evaluateScripts !== undefined && message.evaluateScripts.length !== 0) {
      for (const v of message.evaluateScripts) {
        ActionVerificationEvaluateScript.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionVerification {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionVerification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.outgoingRequests!.push(ActionVerificationOutgoingRequest.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.elementAssertions!.push(ActionVerificationElementAssertion.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.listAssertion = ActionVerificationListAssertion.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.evaluateScript = ActionVerificationEvaluateScript.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.evaluateScripts!.push(ActionVerificationEvaluateScript.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionVerification {
    return {
      $type: ActionVerification.$type,
      outgoingRequests: globalThis.Array.isArray(object?.outgoingRequests)
        ? object.outgoingRequests.map((e: any) => ActionVerificationOutgoingRequest.fromJSON(e))
        : [],
      elementAssertions: globalThis.Array.isArray(object?.elementAssertions)
        ? object.elementAssertions.map((e: any) => ActionVerificationElementAssertion.fromJSON(e))
        : [],
      listAssertion: isSet(object.listAssertion)
        ? ActionVerificationListAssertion.fromJSON(object.listAssertion)
        : undefined,
      evaluateScript: isSet(object.evaluateScript)
        ? ActionVerificationEvaluateScript.fromJSON(object.evaluateScript)
        : undefined,
      evaluateScripts: globalThis.Array.isArray(object?.evaluateScripts)
        ? object.evaluateScripts.map((e: any) => ActionVerificationEvaluateScript.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ActionVerification): unknown {
    const obj: any = {};
    if (message.outgoingRequests?.length) {
      obj.outgoingRequests = message.outgoingRequests.map((e) => ActionVerificationOutgoingRequest.toJSON(e));
    }
    if (message.elementAssertions?.length) {
      obj.elementAssertions = message.elementAssertions.map((e) => ActionVerificationElementAssertion.toJSON(e));
    }
    if (message.listAssertion !== undefined) {
      obj.listAssertion = ActionVerificationListAssertion.toJSON(message.listAssertion);
    }
    if (message.evaluateScript !== undefined) {
      obj.evaluateScript = ActionVerificationEvaluateScript.toJSON(message.evaluateScript);
    }
    if (message.evaluateScripts?.length) {
      obj.evaluateScripts = message.evaluateScripts.map((e) => ActionVerificationEvaluateScript.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionVerification>, I>>(base?: I): ActionVerification {
    return ActionVerification.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionVerification>, I>>(object: I): ActionVerification {
    const message = createBaseActionVerification();
    message.outgoingRequests = object.outgoingRequests?.map((e) => ActionVerificationOutgoingRequest.fromPartial(e)) ||
      [];
    message.elementAssertions =
      object.elementAssertions?.map((e) => ActionVerificationElementAssertion.fromPartial(e)) || [];
    message.listAssertion = (object.listAssertion !== undefined && object.listAssertion !== null)
      ? ActionVerificationListAssertion.fromPartial(object.listAssertion)
      : undefined;
    message.evaluateScript = (object.evaluateScript !== undefined && object.evaluateScript !== null)
      ? ActionVerificationEvaluateScript.fromPartial(object.evaluateScript)
      : undefined;
    message.evaluateScripts = object.evaluateScripts?.map((e) => ActionVerificationEvaluateScript.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ActionVerification.$type, ActionVerification);

function createBaseActionVerificationOutgoingRequestBody(): ActionVerificationOutgoingRequestBody {
  return { $type: "pb.v1alpha1.ActionVerification.OutgoingRequestBody", json: undefined, raw: undefined };
}

export const ActionVerificationOutgoingRequestBody = {
  $type: "pb.v1alpha1.ActionVerification.OutgoingRequestBody" as const,

  encode(message: ActionVerificationOutgoingRequestBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.json !== undefined) {
      writer.uint32(10).string(message.json);
    }
    if (message.raw !== undefined) {
      writer.uint32(18).bytes(message.raw);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionVerificationOutgoingRequestBody {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionVerificationOutgoingRequestBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.json = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.raw = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionVerificationOutgoingRequestBody {
    return {
      $type: ActionVerificationOutgoingRequestBody.$type,
      json: isSet(object.json) ? globalThis.String(object.json) : undefined,
      raw: isSet(object.raw) ? bytesFromBase64(object.raw) : undefined,
    };
  },

  toJSON(message: ActionVerificationOutgoingRequestBody): unknown {
    const obj: any = {};
    if (message.json !== undefined) {
      obj.json = message.json;
    }
    if (message.raw !== undefined) {
      obj.raw = base64FromBytes(message.raw);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionVerificationOutgoingRequestBody>, I>>(
    base?: I,
  ): ActionVerificationOutgoingRequestBody {
    return ActionVerificationOutgoingRequestBody.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionVerificationOutgoingRequestBody>, I>>(
    object: I,
  ): ActionVerificationOutgoingRequestBody {
    const message = createBaseActionVerificationOutgoingRequestBody();
    message.json = object.json ?? undefined;
    message.raw = object.raw ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(ActionVerificationOutgoingRequestBody.$type, ActionVerificationOutgoingRequestBody);

function createBaseActionVerificationOutgoingRequest(): ActionVerificationOutgoingRequest {
  return { $type: "pb.v1alpha1.ActionVerification.OutgoingRequest", url: "", method: 0, body: undefined };
}

export const ActionVerificationOutgoingRequest = {
  $type: "pb.v1alpha1.ActionVerification.OutgoingRequest" as const,

  encode(message: ActionVerificationOutgoingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.method !== undefined && message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    if (message.body !== undefined) {
      ActionVerificationOutgoingRequestBody.encode(message.body, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionVerificationOutgoingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionVerificationOutgoingRequest();
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
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.body = ActionVerificationOutgoingRequestBody.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionVerificationOutgoingRequest {
    return {
      $type: ActionVerificationOutgoingRequest.$type,
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      method: isSet(object.method) ? actionVerificationOutgoingRequestMethodFromJSON(object.method) : 0,
      body: isSet(object.body) ? ActionVerificationOutgoingRequestBody.fromJSON(object.body) : undefined,
    };
  },

  toJSON(message: ActionVerificationOutgoingRequest): unknown {
    const obj: any = {};
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    if (message.method !== undefined && message.method !== 0) {
      obj.method = actionVerificationOutgoingRequestMethodToJSON(message.method);
    }
    if (message.body !== undefined) {
      obj.body = ActionVerificationOutgoingRequestBody.toJSON(message.body);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionVerificationOutgoingRequest>, I>>(
    base?: I,
  ): ActionVerificationOutgoingRequest {
    return ActionVerificationOutgoingRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionVerificationOutgoingRequest>, I>>(
    object: I,
  ): ActionVerificationOutgoingRequest {
    const message = createBaseActionVerificationOutgoingRequest();
    message.url = object.url ?? "";
    message.method = object.method ?? 0;
    message.body = (object.body !== undefined && object.body !== null)
      ? ActionVerificationOutgoingRequestBody.fromPartial(object.body)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ActionVerificationOutgoingRequest.$type, ActionVerificationOutgoingRequest);

function createBaseActionVerificationElementAssertion(): ActionVerificationElementAssertion {
  return {
    $type: "pb.v1alpha1.ActionVerification.ElementAssertion",
    locator: undefined,
    exists: false,
    visible: false,
  };
}

export const ActionVerificationElementAssertion = {
  $type: "pb.v1alpha1.ActionVerification.ElementAssertion" as const,

  encode(message: ActionVerificationElementAssertion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.locator !== undefined) {
      ElementLocator.encode(message.locator, writer.uint32(10).fork()).ldelim();
    }
    if (message.exists !== undefined && message.exists !== false) {
      writer.uint32(16).bool(message.exists);
    }
    if (message.visible !== undefined && message.visible !== false) {
      writer.uint32(24).bool(message.visible);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionVerificationElementAssertion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionVerificationElementAssertion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.locator = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.exists = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.visible = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionVerificationElementAssertion {
    return {
      $type: ActionVerificationElementAssertion.$type,
      locator: isSet(object.locator) ? ElementLocator.fromJSON(object.locator) : undefined,
      exists: isSet(object.exists) ? globalThis.Boolean(object.exists) : false,
      visible: isSet(object.visible) ? globalThis.Boolean(object.visible) : false,
    };
  },

  toJSON(message: ActionVerificationElementAssertion): unknown {
    const obj: any = {};
    if (message.locator !== undefined) {
      obj.locator = ElementLocator.toJSON(message.locator);
    }
    if (message.exists !== undefined && message.exists !== false) {
      obj.exists = message.exists;
    }
    if (message.visible !== undefined && message.visible !== false) {
      obj.visible = message.visible;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionVerificationElementAssertion>, I>>(
    base?: I,
  ): ActionVerificationElementAssertion {
    return ActionVerificationElementAssertion.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionVerificationElementAssertion>, I>>(
    object: I,
  ): ActionVerificationElementAssertion {
    const message = createBaseActionVerificationElementAssertion();
    message.locator = (object.locator !== undefined && object.locator !== null)
      ? ElementLocator.fromPartial(object.locator)
      : undefined;
    message.exists = object.exists ?? false;
    message.visible = object.visible ?? false;
    return message;
  },
};

messageTypeRegistry.set(ActionVerificationElementAssertion.$type, ActionVerificationElementAssertion);

function createBaseActionVerificationListAssertion(): ActionVerificationListAssertion {
  return { $type: "pb.v1alpha1.ActionVerification.ListAssertion", length: undefined, columns: undefined, values: [] };
}

export const ActionVerificationListAssertion = {
  $type: "pb.v1alpha1.ActionVerification.ListAssertion" as const,

  encode(message: ActionVerificationListAssertion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.length !== undefined) {
      ActionVerificationListAssertionListLength.encode(message.length, writer.uint32(10).fork()).ldelim();
    }
    if (message.columns !== undefined) {
      ActionVerificationListAssertionListLength.encode(message.columns, writer.uint32(26).fork()).ldelim();
    }
    if (message.values !== undefined && message.values.length !== 0) {
      for (const v of message.values) {
        ActionVerificationListAssertionListValue.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionVerificationListAssertion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionVerificationListAssertion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.length = ActionVerificationListAssertionListLength.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.columns = ActionVerificationListAssertionListLength.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.values!.push(ActionVerificationListAssertionListValue.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionVerificationListAssertion {
    return {
      $type: ActionVerificationListAssertion.$type,
      length: isSet(object.length) ? ActionVerificationListAssertionListLength.fromJSON(object.length) : undefined,
      columns: isSet(object.columns) ? ActionVerificationListAssertionListLength.fromJSON(object.columns) : undefined,
      values: globalThis.Array.isArray(object?.values)
        ? object.values.map((e: any) => ActionVerificationListAssertionListValue.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ActionVerificationListAssertion): unknown {
    const obj: any = {};
    if (message.length !== undefined) {
      obj.length = ActionVerificationListAssertionListLength.toJSON(message.length);
    }
    if (message.columns !== undefined) {
      obj.columns = ActionVerificationListAssertionListLength.toJSON(message.columns);
    }
    if (message.values?.length) {
      obj.values = message.values.map((e) => ActionVerificationListAssertionListValue.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionVerificationListAssertion>, I>>(base?: I): ActionVerificationListAssertion {
    return ActionVerificationListAssertion.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionVerificationListAssertion>, I>>(
    object: I,
  ): ActionVerificationListAssertion {
    const message = createBaseActionVerificationListAssertion();
    message.length = (object.length !== undefined && object.length !== null)
      ? ActionVerificationListAssertionListLength.fromPartial(object.length)
      : undefined;
    message.columns = (object.columns !== undefined && object.columns !== null)
      ? ActionVerificationListAssertionListLength.fromPartial(object.columns)
      : undefined;
    message.values = object.values?.map((e) => ActionVerificationListAssertionListValue.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ActionVerificationListAssertion.$type, ActionVerificationListAssertion);

function createBaseActionVerificationListAssertionListLength(): ActionVerificationListAssertionListLength {
  return { $type: "pb.v1alpha1.ActionVerification.ListAssertion.ListLength", equal: 0 };
}

export const ActionVerificationListAssertionListLength = {
  $type: "pb.v1alpha1.ActionVerification.ListAssertion.ListLength" as const,

  encode(message: ActionVerificationListAssertionListLength, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.equal !== undefined && message.equal !== 0) {
      writer.uint32(8).int32(message.equal);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionVerificationListAssertionListLength {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionVerificationListAssertionListLength();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.equal = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionVerificationListAssertionListLength {
    return {
      $type: ActionVerificationListAssertionListLength.$type,
      equal: isSet(object.equal) ? globalThis.Number(object.equal) : 0,
    };
  },

  toJSON(message: ActionVerificationListAssertionListLength): unknown {
    const obj: any = {};
    if (message.equal !== undefined && message.equal !== 0) {
      obj.equal = Math.round(message.equal);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionVerificationListAssertionListLength>, I>>(
    base?: I,
  ): ActionVerificationListAssertionListLength {
    return ActionVerificationListAssertionListLength.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionVerificationListAssertionListLength>, I>>(
    object: I,
  ): ActionVerificationListAssertionListLength {
    const message = createBaseActionVerificationListAssertionListLength();
    message.equal = object.equal ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ActionVerificationListAssertionListLength.$type, ActionVerificationListAssertionListLength);

function createBaseActionVerificationListAssertionTextAssertion(): ActionVerificationListAssertionTextAssertion {
  return { $type: "pb.v1alpha1.ActionVerification.ListAssertion.TextAssertion", equal: "", contains: "" };
}

export const ActionVerificationListAssertionTextAssertion = {
  $type: "pb.v1alpha1.ActionVerification.ListAssertion.TextAssertion" as const,

  encode(message: ActionVerificationListAssertionTextAssertion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.equal !== undefined && message.equal !== "") {
      writer.uint32(10).string(message.equal);
    }
    if (message.contains !== undefined && message.contains !== "") {
      writer.uint32(18).string(message.contains);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionVerificationListAssertionTextAssertion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionVerificationListAssertionTextAssertion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.equal = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.contains = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionVerificationListAssertionTextAssertion {
    return {
      $type: ActionVerificationListAssertionTextAssertion.$type,
      equal: isSet(object.equal) ? globalThis.String(object.equal) : "",
      contains: isSet(object.contains) ? globalThis.String(object.contains) : "",
    };
  },

  toJSON(message: ActionVerificationListAssertionTextAssertion): unknown {
    const obj: any = {};
    if (message.equal !== undefined && message.equal !== "") {
      obj.equal = message.equal;
    }
    if (message.contains !== undefined && message.contains !== "") {
      obj.contains = message.contains;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionVerificationListAssertionTextAssertion>, I>>(
    base?: I,
  ): ActionVerificationListAssertionTextAssertion {
    return ActionVerificationListAssertionTextAssertion.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionVerificationListAssertionTextAssertion>, I>>(
    object: I,
  ): ActionVerificationListAssertionTextAssertion {
    const message = createBaseActionVerificationListAssertionTextAssertion();
    message.equal = object.equal ?? "";
    message.contains = object.contains ?? "";
    return message;
  },
};

messageTypeRegistry.set(
  ActionVerificationListAssertionTextAssertion.$type,
  ActionVerificationListAssertionTextAssertion,
);

function createBaseActionVerificationListAssertionFieldValueAssertion(): ActionVerificationListAssertionFieldValueAssertion {
  return { $type: "pb.v1alpha1.ActionVerification.ListAssertion.FieldValueAssertion", key: "", text: undefined };
}

export const ActionVerificationListAssertionFieldValueAssertion = {
  $type: "pb.v1alpha1.ActionVerification.ListAssertion.FieldValueAssertion" as const,

  encode(
    message: ActionVerificationListAssertionFieldValueAssertion,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== undefined && message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.text !== undefined) {
      ActionVerificationListAssertionTextAssertion.encode(message.text, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionVerificationListAssertionFieldValueAssertion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionVerificationListAssertionFieldValueAssertion();
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

          message.text = ActionVerificationListAssertionTextAssertion.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionVerificationListAssertionFieldValueAssertion {
    return {
      $type: ActionVerificationListAssertionFieldValueAssertion.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      text: isSet(object.text) ? ActionVerificationListAssertionTextAssertion.fromJSON(object.text) : undefined,
    };
  },

  toJSON(message: ActionVerificationListAssertionFieldValueAssertion): unknown {
    const obj: any = {};
    if (message.key !== undefined && message.key !== "") {
      obj.key = message.key;
    }
    if (message.text !== undefined) {
      obj.text = ActionVerificationListAssertionTextAssertion.toJSON(message.text);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionVerificationListAssertionFieldValueAssertion>, I>>(
    base?: I,
  ): ActionVerificationListAssertionFieldValueAssertion {
    return ActionVerificationListAssertionFieldValueAssertion.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionVerificationListAssertionFieldValueAssertion>, I>>(
    object: I,
  ): ActionVerificationListAssertionFieldValueAssertion {
    const message = createBaseActionVerificationListAssertionFieldValueAssertion();
    message.key = object.key ?? "";
    message.text = (object.text !== undefined && object.text !== null)
      ? ActionVerificationListAssertionTextAssertion.fromPartial(object.text)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(
  ActionVerificationListAssertionFieldValueAssertion.$type,
  ActionVerificationListAssertionFieldValueAssertion,
);

function createBaseActionVerificationListAssertionListValue(): ActionVerificationListAssertionListValue {
  return { $type: "pb.v1alpha1.ActionVerification.ListAssertion.ListValue", index: 0, fields: [] };
}

export const ActionVerificationListAssertionListValue = {
  $type: "pb.v1alpha1.ActionVerification.ListAssertion.ListValue" as const,

  encode(message: ActionVerificationListAssertionListValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== undefined && message.index !== 0) {
      writer.uint32(8).int32(message.index);
    }
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        ActionVerificationListAssertionFieldValueAssertion.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionVerificationListAssertionListValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionVerificationListAssertionListValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.index = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fields!.push(ActionVerificationListAssertionFieldValueAssertion.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionVerificationListAssertionListValue {
    return {
      $type: ActionVerificationListAssertionListValue.$type,
      index: isSet(object.index) ? globalThis.Number(object.index) : 0,
      fields: globalThis.Array.isArray(object?.fields)
        ? object.fields.map((e: any) => ActionVerificationListAssertionFieldValueAssertion.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ActionVerificationListAssertionListValue): unknown {
    const obj: any = {};
    if (message.index !== undefined && message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => ActionVerificationListAssertionFieldValueAssertion.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionVerificationListAssertionListValue>, I>>(
    base?: I,
  ): ActionVerificationListAssertionListValue {
    return ActionVerificationListAssertionListValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionVerificationListAssertionListValue>, I>>(
    object: I,
  ): ActionVerificationListAssertionListValue {
    const message = createBaseActionVerificationListAssertionListValue();
    message.index = object.index ?? 0;
    message.fields = object.fields?.map((e) => ActionVerificationListAssertionFieldValueAssertion.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ActionVerificationListAssertionListValue.$type, ActionVerificationListAssertionListValue);

function createBaseActionVerificationEvaluateScript(): ActionVerificationEvaluateScript {
  return { $type: "pb.v1alpha1.ActionVerification.EvaluateScript", script: "", context: 0 };
}

export const ActionVerificationEvaluateScript = {
  $type: "pb.v1alpha1.ActionVerification.EvaluateScript" as const,

  encode(message: ActionVerificationEvaluateScript, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.script !== undefined && message.script !== "") {
      writer.uint32(10).string(message.script);
    }
    if (message.context !== undefined && message.context !== 0) {
      writer.uint32(16).int32(message.context);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionVerificationEvaluateScript {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionVerificationEvaluateScript();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.script = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.context = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionVerificationEvaluateScript {
    return {
      $type: ActionVerificationEvaluateScript.$type,
      script: isSet(object.script) ? globalThis.String(object.script) : "",
      context: isSet(object.context) ? actionVerificationEvaluateScriptContextFromJSON(object.context) : 0,
    };
  },

  toJSON(message: ActionVerificationEvaluateScript): unknown {
    const obj: any = {};
    if (message.script !== undefined && message.script !== "") {
      obj.script = message.script;
    }
    if (message.context !== undefined && message.context !== 0) {
      obj.context = actionVerificationEvaluateScriptContextToJSON(message.context);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionVerificationEvaluateScript>, I>>(
    base?: I,
  ): ActionVerificationEvaluateScript {
    return ActionVerificationEvaluateScript.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionVerificationEvaluateScript>, I>>(
    object: I,
  ): ActionVerificationEvaluateScript {
    const message = createBaseActionVerificationEvaluateScript();
    message.script = object.script ?? "";
    message.context = object.context ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ActionVerificationEvaluateScript.$type, ActionVerificationEvaluateScript);

function createBaseActionGroup(): ActionGroup {
  return {
    $type: "pb.v1alpha1.ActionGroup",
    description: "",
    preparedActions: [],
    snapshot: undefined,
    screenshot: undefined,
    uuid: "",
  };
}

export const ActionGroup = {
  $type: "pb.v1alpha1.ActionGroup" as const,

  encode(message: ActionGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.preparedActions !== undefined && message.preparedActions.length !== 0) {
      for (const v of message.preparedActions) {
        PreparedAction.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.snapshot !== undefined) {
      RecordedFile.encode(message.snapshot, writer.uint32(26).fork()).ldelim();
    }
    if (message.screenshot !== undefined) {
      RecordedFile.encode(message.screenshot, writer.uint32(34).fork()).ldelim();
    }
    if (message.uuid !== undefined && message.uuid !== "") {
      writer.uint32(42).string(message.uuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.preparedActions!.push(PreparedAction.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.snapshot = RecordedFile.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.screenshot = RecordedFile.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.uuid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionGroup {
    return {
      $type: ActionGroup.$type,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      preparedActions: globalThis.Array.isArray(object?.preparedActions)
        ? object.preparedActions.map((e: any) => PreparedAction.fromJSON(e))
        : [],
      snapshot: isSet(object.snapshot) ? RecordedFile.fromJSON(object.snapshot) : undefined,
      screenshot: isSet(object.screenshot) ? RecordedFile.fromJSON(object.screenshot) : undefined,
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "",
    };
  },

  toJSON(message: ActionGroup): unknown {
    const obj: any = {};
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.preparedActions?.length) {
      obj.preparedActions = message.preparedActions.map((e) => PreparedAction.toJSON(e));
    }
    if (message.snapshot !== undefined) {
      obj.snapshot = RecordedFile.toJSON(message.snapshot);
    }
    if (message.screenshot !== undefined) {
      obj.screenshot = RecordedFile.toJSON(message.screenshot);
    }
    if (message.uuid !== undefined && message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionGroup>, I>>(base?: I): ActionGroup {
    return ActionGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionGroup>, I>>(object: I): ActionGroup {
    const message = createBaseActionGroup();
    message.description = object.description ?? "";
    message.preparedActions = object.preparedActions?.map((e) => PreparedAction.fromPartial(e)) || [];
    message.snapshot = (object.snapshot !== undefined && object.snapshot !== null)
      ? RecordedFile.fromPartial(object.snapshot)
      : undefined;
    message.screenshot = (object.screenshot !== undefined && object.screenshot !== null)
      ? RecordedFile.fromPartial(object.screenshot)
      : undefined;
    message.uuid = object.uuid ?? "";
    return message;
  },
};

messageTypeRegistry.set(ActionGroup.$type, ActionGroup);

function createBasePartialReferenceValue(): PartialReferenceValue {
  return { $type: "pb.v1alpha1.PartialReferenceValue", referenceValue: "", referenceValueKey: "" };
}

export const PartialReferenceValue = {
  $type: "pb.v1alpha1.PartialReferenceValue" as const,

  encode(message: PartialReferenceValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.referenceValue !== undefined && message.referenceValue !== "") {
      writer.uint32(10).string(message.referenceValue);
    }
    if (message.referenceValueKey !== undefined && message.referenceValueKey !== "") {
      writer.uint32(18).string(message.referenceValueKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartialReferenceValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartialReferenceValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.referenceValue = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.referenceValueKey = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PartialReferenceValue {
    return {
      $type: PartialReferenceValue.$type,
      referenceValue: isSet(object.referenceValue) ? globalThis.String(object.referenceValue) : "",
      referenceValueKey: isSet(object.referenceValueKey) ? globalThis.String(object.referenceValueKey) : "",
    };
  },

  toJSON(message: PartialReferenceValue): unknown {
    const obj: any = {};
    if (message.referenceValue !== undefined && message.referenceValue !== "") {
      obj.referenceValue = message.referenceValue;
    }
    if (message.referenceValueKey !== undefined && message.referenceValueKey !== "") {
      obj.referenceValueKey = message.referenceValueKey;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PartialReferenceValue>, I>>(base?: I): PartialReferenceValue {
    return PartialReferenceValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PartialReferenceValue>, I>>(object: I): PartialReferenceValue {
    const message = createBasePartialReferenceValue();
    message.referenceValue = object.referenceValue ?? "";
    message.referenceValueKey = object.referenceValueKey ?? "";
    return message;
  },
};

messageTypeRegistry.set(PartialReferenceValue.$type, PartialReferenceValue);

function createBaseActionParamValue(): ActionParamValue {
  return {
    $type: "pb.v1alpha1.ActionParamValue",
    jsonValue: undefined,
    referenceValue: undefined,
    envValue: undefined,
    contextValue: undefined,
    legacySecretValue: undefined,
    secretValue: undefined,
    partialReferenceValue: undefined,
  };
}

export const ActionParamValue = {
  $type: "pb.v1alpha1.ActionParamValue" as const,

  encode(message: ActionParamValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.jsonValue !== undefined) {
      writer.uint32(10).string(message.jsonValue);
    }
    if (message.referenceValue !== undefined) {
      writer.uint32(18).string(message.referenceValue);
    }
    if (message.envValue !== undefined) {
      writer.uint32(26).string(message.envValue);
    }
    if (message.contextValue !== undefined) {
      writer.uint32(32).int32(message.contextValue);
    }
    if (message.legacySecretValue !== undefined) {
      writer.uint32(42).string(message.legacySecretValue);
    }
    if (message.secretValue !== undefined) {
      SecretValue.encode(message.secretValue, writer.uint32(58).fork()).ldelim();
    }
    if (message.partialReferenceValue !== undefined) {
      PartialReferenceValue.encode(message.partialReferenceValue, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionParamValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionParamValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.jsonValue = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.referenceValue = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.envValue = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.contextValue = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.legacySecretValue = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.secretValue = SecretValue.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.partialReferenceValue = PartialReferenceValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActionParamValue {
    return {
      $type: ActionParamValue.$type,
      jsonValue: isSet(object.jsonValue) ? globalThis.String(object.jsonValue) : undefined,
      referenceValue: isSet(object.referenceValue) ? globalThis.String(object.referenceValue) : undefined,
      envValue: isSet(object.envValue) ? globalThis.String(object.envValue) : undefined,
      contextValue: isSet(object.contextValue) ? contextValueFromJSON(object.contextValue) : undefined,
      legacySecretValue: isSet(object.legacySecretValue) ? globalThis.String(object.legacySecretValue) : undefined,
      secretValue: isSet(object.secretValue) ? SecretValue.fromJSON(object.secretValue) : undefined,
      partialReferenceValue: isSet(object.partialReferenceValue)
        ? PartialReferenceValue.fromJSON(object.partialReferenceValue)
        : undefined,
    };
  },

  toJSON(message: ActionParamValue): unknown {
    const obj: any = {};
    if (message.jsonValue !== undefined) {
      obj.jsonValue = message.jsonValue;
    }
    if (message.referenceValue !== undefined) {
      obj.referenceValue = message.referenceValue;
    }
    if (message.envValue !== undefined) {
      obj.envValue = message.envValue;
    }
    if (message.contextValue !== undefined) {
      obj.contextValue = contextValueToJSON(message.contextValue);
    }
    if (message.legacySecretValue !== undefined) {
      obj.legacySecretValue = message.legacySecretValue;
    }
    if (message.secretValue !== undefined) {
      obj.secretValue = SecretValue.toJSON(message.secretValue);
    }
    if (message.partialReferenceValue !== undefined) {
      obj.partialReferenceValue = PartialReferenceValue.toJSON(message.partialReferenceValue);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionParamValue>, I>>(base?: I): ActionParamValue {
    return ActionParamValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionParamValue>, I>>(object: I): ActionParamValue {
    const message = createBaseActionParamValue();
    message.jsonValue = object.jsonValue ?? undefined;
    message.referenceValue = object.referenceValue ?? undefined;
    message.envValue = object.envValue ?? undefined;
    message.contextValue = object.contextValue ?? undefined;
    message.legacySecretValue = object.legacySecretValue ?? undefined;
    message.secretValue = (object.secretValue !== undefined && object.secretValue !== null)
      ? SecretValue.fromPartial(object.secretValue)
      : undefined;
    message.partialReferenceValue =
      (object.partialReferenceValue !== undefined && object.partialReferenceValue !== null)
        ? PartialReferenceValue.fromPartial(object.partialReferenceValue)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(ActionParamValue.$type, ActionParamValue);

function createBasePreparedAction(): PreparedAction {
  return {
    $type: "pb.v1alpha1.PreparedAction",
    uuid: "",
    params: [],
    requiresReview: false,
    tabIndex: 0,
    gotoAction: undefined,
    clickAction: undefined,
    getFormAction: undefined,
    fillFormAction: undefined,
    extractFieldsAction: undefined,
    jsFunctionAction: undefined,
    validateAction: undefined,
    conditionAction: undefined,
    foreachAction: undefined,
    getListAction: undefined,
    getElementAction: undefined,
    flagKeywordsAction: undefined,
    detectDuplicateLineItemsAction: undefined,
    createTaskAction: undefined,
    reconcileItemsAction: undefined,
    hoverAction: undefined,
    exitAction: undefined,
    setValueAction: undefined,
    customSmartAction: undefined,
    getDocumentAction: undefined,
    generateTextAction: undefined,
    classifyAction: undefined,
  };
}

export const PreparedAction = {
  $type: "pb.v1alpha1.PreparedAction" as const,

  encode(message: PreparedAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uuid !== undefined && message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    if (message.params !== undefined && message.params.length !== 0) {
      for (const v of message.params) {
        ActionParamValue.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.requiresReview !== undefined && message.requiresReview !== false) {
      writer.uint32(120).bool(message.requiresReview);
    }
    if (message.tabIndex !== undefined && message.tabIndex !== 0) {
      writer.uint32(168).int32(message.tabIndex);
    }
    if (message.gotoAction !== undefined) {
      GotoAction.encode(message.gotoAction, writer.uint32(34).fork()).ldelim();
    }
    if (message.clickAction !== undefined) {
      ClickAction.encode(message.clickAction, writer.uint32(42).fork()).ldelim();
    }
    if (message.getFormAction !== undefined) {
      GetFormAction.encode(message.getFormAction, writer.uint32(50).fork()).ldelim();
    }
    if (message.fillFormAction !== undefined) {
      FillFormAction.encode(message.fillFormAction, writer.uint32(58).fork()).ldelim();
    }
    if (message.extractFieldsAction !== undefined) {
      ExtractFieldsAction.encode(message.extractFieldsAction, writer.uint32(66).fork()).ldelim();
    }
    if (message.jsFunctionAction !== undefined) {
      JsFunctionAction.encode(message.jsFunctionAction, writer.uint32(74).fork()).ldelim();
    }
    if (message.validateAction !== undefined) {
      ValidateAction.encode(message.validateAction, writer.uint32(82).fork()).ldelim();
    }
    if (message.conditionAction !== undefined) {
      ConditionAction.encode(message.conditionAction, writer.uint32(90).fork()).ldelim();
    }
    if (message.foreachAction !== undefined) {
      ForeachAction.encode(message.foreachAction, writer.uint32(98).fork()).ldelim();
    }
    if (message.getListAction !== undefined) {
      GetListAction.encode(message.getListAction, writer.uint32(106).fork()).ldelim();
    }
    if (message.getElementAction !== undefined) {
      GetElementAction.encode(message.getElementAction, writer.uint32(130).fork()).ldelim();
    }
    if (message.flagKeywordsAction !== undefined) {
      FlagKeywordsAction.encode(message.flagKeywordsAction, writer.uint32(138).fork()).ldelim();
    }
    if (message.detectDuplicateLineItemsAction !== undefined) {
      DetectDuplicateLineItemsAction.encode(message.detectDuplicateLineItemsAction, writer.uint32(146).fork()).ldelim();
    }
    if (message.createTaskAction !== undefined) {
      CreateTaskAction.encode(message.createTaskAction, writer.uint32(154).fork()).ldelim();
    }
    if (message.reconcileItemsAction !== undefined) {
      ReconcileItemsAction.encode(message.reconcileItemsAction, writer.uint32(162).fork()).ldelim();
    }
    if (message.hoverAction !== undefined) {
      HoverAction.encode(message.hoverAction, writer.uint32(178).fork()).ldelim();
    }
    if (message.exitAction !== undefined) {
      ExitAction.encode(message.exitAction, writer.uint32(186).fork()).ldelim();
    }
    if (message.setValueAction !== undefined) {
      SetValueAction.encode(message.setValueAction, writer.uint32(194).fork()).ldelim();
    }
    if (message.customSmartAction !== undefined) {
      CustomSmartAction.encode(message.customSmartAction, writer.uint32(202).fork()).ldelim();
    }
    if (message.getDocumentAction !== undefined) {
      GetDocumentAction.encode(message.getDocumentAction, writer.uint32(210).fork()).ldelim();
    }
    if (message.generateTextAction !== undefined) {
      GenerateTextAction.encode(message.generateTextAction, writer.uint32(218).fork()).ldelim();
    }
    if (message.classifyAction !== undefined) {
      ClassifyAction.encode(message.classifyAction, writer.uint32(226).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PreparedAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreparedAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.uuid = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.params!.push(ActionParamValue.decode(reader, reader.uint32()));
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.requiresReview = reader.bool();
          continue;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.tabIndex = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.gotoAction = GotoAction.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.clickAction = ClickAction.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.getFormAction = GetFormAction.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.fillFormAction = FillFormAction.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.extractFieldsAction = ExtractFieldsAction.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.jsFunctionAction = JsFunctionAction.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.validateAction = ValidateAction.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.conditionAction = ConditionAction.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.foreachAction = ForeachAction.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.getListAction = GetListAction.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.getElementAction = GetElementAction.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.flagKeywordsAction = FlagKeywordsAction.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.detectDuplicateLineItemsAction = DetectDuplicateLineItemsAction.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.createTaskAction = CreateTaskAction.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.reconcileItemsAction = ReconcileItemsAction.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.hoverAction = HoverAction.decode(reader, reader.uint32());
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.exitAction = ExitAction.decode(reader, reader.uint32());
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.setValueAction = SetValueAction.decode(reader, reader.uint32());
          continue;
        case 25:
          if (tag !== 202) {
            break;
          }

          message.customSmartAction = CustomSmartAction.decode(reader, reader.uint32());
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.getDocumentAction = GetDocumentAction.decode(reader, reader.uint32());
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.generateTextAction = GenerateTextAction.decode(reader, reader.uint32());
          continue;
        case 28:
          if (tag !== 226) {
            break;
          }

          message.classifyAction = ClassifyAction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PreparedAction {
    return {
      $type: PreparedAction.$type,
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "",
      params: globalThis.Array.isArray(object?.params)
        ? object.params.map((e: any) => ActionParamValue.fromJSON(e))
        : [],
      requiresReview: isSet(object.requiresReview) ? globalThis.Boolean(object.requiresReview) : false,
      tabIndex: isSet(object.tabIndex) ? globalThis.Number(object.tabIndex) : 0,
      gotoAction: isSet(object.gotoAction) ? GotoAction.fromJSON(object.gotoAction) : undefined,
      clickAction: isSet(object.clickAction) ? ClickAction.fromJSON(object.clickAction) : undefined,
      getFormAction: isSet(object.getFormAction) ? GetFormAction.fromJSON(object.getFormAction) : undefined,
      fillFormAction: isSet(object.fillFormAction) ? FillFormAction.fromJSON(object.fillFormAction) : undefined,
      extractFieldsAction: isSet(object.extractFieldsAction)
        ? ExtractFieldsAction.fromJSON(object.extractFieldsAction)
        : undefined,
      jsFunctionAction: isSet(object.jsFunctionAction) ? JsFunctionAction.fromJSON(object.jsFunctionAction) : undefined,
      validateAction: isSet(object.validateAction) ? ValidateAction.fromJSON(object.validateAction) : undefined,
      conditionAction: isSet(object.conditionAction) ? ConditionAction.fromJSON(object.conditionAction) : undefined,
      foreachAction: isSet(object.foreachAction) ? ForeachAction.fromJSON(object.foreachAction) : undefined,
      getListAction: isSet(object.getListAction) ? GetListAction.fromJSON(object.getListAction) : undefined,
      getElementAction: isSet(object.getElementAction) ? GetElementAction.fromJSON(object.getElementAction) : undefined,
      flagKeywordsAction: isSet(object.flagKeywordsAction)
        ? FlagKeywordsAction.fromJSON(object.flagKeywordsAction)
        : undefined,
      detectDuplicateLineItemsAction: isSet(object.detectDuplicateLineItemsAction)
        ? DetectDuplicateLineItemsAction.fromJSON(object.detectDuplicateLineItemsAction)
        : undefined,
      createTaskAction: isSet(object.createTaskAction) ? CreateTaskAction.fromJSON(object.createTaskAction) : undefined,
      reconcileItemsAction: isSet(object.reconcileItemsAction)
        ? ReconcileItemsAction.fromJSON(object.reconcileItemsAction)
        : undefined,
      hoverAction: isSet(object.hoverAction) ? HoverAction.fromJSON(object.hoverAction) : undefined,
      exitAction: isSet(object.exitAction) ? ExitAction.fromJSON(object.exitAction) : undefined,
      setValueAction: isSet(object.setValueAction) ? SetValueAction.fromJSON(object.setValueAction) : undefined,
      customSmartAction: isSet(object.customSmartAction)
        ? CustomSmartAction.fromJSON(object.customSmartAction)
        : undefined,
      getDocumentAction: isSet(object.getDocumentAction)
        ? GetDocumentAction.fromJSON(object.getDocumentAction)
        : undefined,
      generateTextAction: isSet(object.generateTextAction)
        ? GenerateTextAction.fromJSON(object.generateTextAction)
        : undefined,
      classifyAction: isSet(object.classifyAction) ? ClassifyAction.fromJSON(object.classifyAction) : undefined,
    };
  },

  toJSON(message: PreparedAction): unknown {
    const obj: any = {};
    if (message.uuid !== undefined && message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    if (message.params?.length) {
      obj.params = message.params.map((e) => ActionParamValue.toJSON(e));
    }
    if (message.requiresReview !== undefined && message.requiresReview !== false) {
      obj.requiresReview = message.requiresReview;
    }
    if (message.tabIndex !== undefined && message.tabIndex !== 0) {
      obj.tabIndex = Math.round(message.tabIndex);
    }
    if (message.gotoAction !== undefined) {
      obj.gotoAction = GotoAction.toJSON(message.gotoAction);
    }
    if (message.clickAction !== undefined) {
      obj.clickAction = ClickAction.toJSON(message.clickAction);
    }
    if (message.getFormAction !== undefined) {
      obj.getFormAction = GetFormAction.toJSON(message.getFormAction);
    }
    if (message.fillFormAction !== undefined) {
      obj.fillFormAction = FillFormAction.toJSON(message.fillFormAction);
    }
    if (message.extractFieldsAction !== undefined) {
      obj.extractFieldsAction = ExtractFieldsAction.toJSON(message.extractFieldsAction);
    }
    if (message.jsFunctionAction !== undefined) {
      obj.jsFunctionAction = JsFunctionAction.toJSON(message.jsFunctionAction);
    }
    if (message.validateAction !== undefined) {
      obj.validateAction = ValidateAction.toJSON(message.validateAction);
    }
    if (message.conditionAction !== undefined) {
      obj.conditionAction = ConditionAction.toJSON(message.conditionAction);
    }
    if (message.foreachAction !== undefined) {
      obj.foreachAction = ForeachAction.toJSON(message.foreachAction);
    }
    if (message.getListAction !== undefined) {
      obj.getListAction = GetListAction.toJSON(message.getListAction);
    }
    if (message.getElementAction !== undefined) {
      obj.getElementAction = GetElementAction.toJSON(message.getElementAction);
    }
    if (message.flagKeywordsAction !== undefined) {
      obj.flagKeywordsAction = FlagKeywordsAction.toJSON(message.flagKeywordsAction);
    }
    if (message.detectDuplicateLineItemsAction !== undefined) {
      obj.detectDuplicateLineItemsAction = DetectDuplicateLineItemsAction.toJSON(
        message.detectDuplicateLineItemsAction,
      );
    }
    if (message.createTaskAction !== undefined) {
      obj.createTaskAction = CreateTaskAction.toJSON(message.createTaskAction);
    }
    if (message.reconcileItemsAction !== undefined) {
      obj.reconcileItemsAction = ReconcileItemsAction.toJSON(message.reconcileItemsAction);
    }
    if (message.hoverAction !== undefined) {
      obj.hoverAction = HoverAction.toJSON(message.hoverAction);
    }
    if (message.exitAction !== undefined) {
      obj.exitAction = ExitAction.toJSON(message.exitAction);
    }
    if (message.setValueAction !== undefined) {
      obj.setValueAction = SetValueAction.toJSON(message.setValueAction);
    }
    if (message.customSmartAction !== undefined) {
      obj.customSmartAction = CustomSmartAction.toJSON(message.customSmartAction);
    }
    if (message.getDocumentAction !== undefined) {
      obj.getDocumentAction = GetDocumentAction.toJSON(message.getDocumentAction);
    }
    if (message.generateTextAction !== undefined) {
      obj.generateTextAction = GenerateTextAction.toJSON(message.generateTextAction);
    }
    if (message.classifyAction !== undefined) {
      obj.classifyAction = ClassifyAction.toJSON(message.classifyAction);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PreparedAction>, I>>(base?: I): PreparedAction {
    return PreparedAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PreparedAction>, I>>(object: I): PreparedAction {
    const message = createBasePreparedAction();
    message.uuid = object.uuid ?? "";
    message.params = object.params?.map((e) => ActionParamValue.fromPartial(e)) || [];
    message.requiresReview = object.requiresReview ?? false;
    message.tabIndex = object.tabIndex ?? 0;
    message.gotoAction = (object.gotoAction !== undefined && object.gotoAction !== null)
      ? GotoAction.fromPartial(object.gotoAction)
      : undefined;
    message.clickAction = (object.clickAction !== undefined && object.clickAction !== null)
      ? ClickAction.fromPartial(object.clickAction)
      : undefined;
    message.getFormAction = (object.getFormAction !== undefined && object.getFormAction !== null)
      ? GetFormAction.fromPartial(object.getFormAction)
      : undefined;
    message.fillFormAction = (object.fillFormAction !== undefined && object.fillFormAction !== null)
      ? FillFormAction.fromPartial(object.fillFormAction)
      : undefined;
    message.extractFieldsAction = (object.extractFieldsAction !== undefined && object.extractFieldsAction !== null)
      ? ExtractFieldsAction.fromPartial(object.extractFieldsAction)
      : undefined;
    message.jsFunctionAction = (object.jsFunctionAction !== undefined && object.jsFunctionAction !== null)
      ? JsFunctionAction.fromPartial(object.jsFunctionAction)
      : undefined;
    message.validateAction = (object.validateAction !== undefined && object.validateAction !== null)
      ? ValidateAction.fromPartial(object.validateAction)
      : undefined;
    message.conditionAction = (object.conditionAction !== undefined && object.conditionAction !== null)
      ? ConditionAction.fromPartial(object.conditionAction)
      : undefined;
    message.foreachAction = (object.foreachAction !== undefined && object.foreachAction !== null)
      ? ForeachAction.fromPartial(object.foreachAction)
      : undefined;
    message.getListAction = (object.getListAction !== undefined && object.getListAction !== null)
      ? GetListAction.fromPartial(object.getListAction)
      : undefined;
    message.getElementAction = (object.getElementAction !== undefined && object.getElementAction !== null)
      ? GetElementAction.fromPartial(object.getElementAction)
      : undefined;
    message.flagKeywordsAction = (object.flagKeywordsAction !== undefined && object.flagKeywordsAction !== null)
      ? FlagKeywordsAction.fromPartial(object.flagKeywordsAction)
      : undefined;
    message.detectDuplicateLineItemsAction =
      (object.detectDuplicateLineItemsAction !== undefined && object.detectDuplicateLineItemsAction !== null)
        ? DetectDuplicateLineItemsAction.fromPartial(object.detectDuplicateLineItemsAction)
        : undefined;
    message.createTaskAction = (object.createTaskAction !== undefined && object.createTaskAction !== null)
      ? CreateTaskAction.fromPartial(object.createTaskAction)
      : undefined;
    message.reconcileItemsAction = (object.reconcileItemsAction !== undefined && object.reconcileItemsAction !== null)
      ? ReconcileItemsAction.fromPartial(object.reconcileItemsAction)
      : undefined;
    message.hoverAction = (object.hoverAction !== undefined && object.hoverAction !== null)
      ? HoverAction.fromPartial(object.hoverAction)
      : undefined;
    message.exitAction = (object.exitAction !== undefined && object.exitAction !== null)
      ? ExitAction.fromPartial(object.exitAction)
      : undefined;
    message.setValueAction = (object.setValueAction !== undefined && object.setValueAction !== null)
      ? SetValueAction.fromPartial(object.setValueAction)
      : undefined;
    message.customSmartAction = (object.customSmartAction !== undefined && object.customSmartAction !== null)
      ? CustomSmartAction.fromPartial(object.customSmartAction)
      : undefined;
    message.getDocumentAction = (object.getDocumentAction !== undefined && object.getDocumentAction !== null)
      ? GetDocumentAction.fromPartial(object.getDocumentAction)
      : undefined;
    message.generateTextAction = (object.generateTextAction !== undefined && object.generateTextAction !== null)
      ? GenerateTextAction.fromPartial(object.generateTextAction)
      : undefined;
    message.classifyAction = (object.classifyAction !== undefined && object.classifyAction !== null)
      ? ClassifyAction.fromPartial(object.classifyAction)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(PreparedAction.$type, PreparedAction);

function createBaseRecordedFile(): RecordedFile {
  return { $type: "pb.v1alpha1.RecordedFile", id: "", url: "" };
}

export const RecordedFile = {
  $type: "pb.v1alpha1.RecordedFile" as const,

  encode(message: RecordedFile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordedFile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordedFile();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecordedFile {
    return {
      $type: RecordedFile.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
    };
  },

  toJSON(message: RecordedFile): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecordedFile>, I>>(base?: I): RecordedFile {
    return RecordedFile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RecordedFile>, I>>(object: I): RecordedFile {
    const message = createBaseRecordedFile();
    message.id = object.id ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

messageTypeRegistry.set(RecordedFile.$type, RecordedFile);

function createBaseExecutedAction(): ExecutedAction {
  return {
    $type: "pb.v1alpha1.ExecutedAction",
    preparedActionUuid: "",
    paramValues: [],
    outputValue: "",
    predictedOutputValue: "",
    humanReviewTriggered: false,
    humanReviewTimeInMs: 0,
    numProcessedPages: 0,
    screenshot: undefined,
    snapshot: undefined,
    smartActionRequest: undefined,
    smartActionResponse: undefined,
    correctedSmartActionResponse: undefined,
    startTime: undefined,
    endTime: undefined,
    macroActionExecution: undefined,
    reviewTaskId: "",
  };
}

export const ExecutedAction = {
  $type: "pb.v1alpha1.ExecutedAction" as const,

  encode(message: ExecutedAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.preparedActionUuid !== undefined && message.preparedActionUuid !== "") {
      writer.uint32(10).string(message.preparedActionUuid);
    }
    if (message.paramValues !== undefined && message.paramValues.length !== 0) {
      for (const v of message.paramValues) {
        writer.uint32(26).string(v!);
      }
    }
    if (message.outputValue !== undefined && message.outputValue !== "") {
      writer.uint32(34).string(message.outputValue);
    }
    if (message.predictedOutputValue !== undefined && message.predictedOutputValue !== "") {
      writer.uint32(58).string(message.predictedOutputValue);
    }
    if (message.humanReviewTriggered !== undefined && message.humanReviewTriggered !== false) {
      writer.uint32(64).bool(message.humanReviewTriggered);
    }
    if (message.humanReviewTimeInMs !== undefined && message.humanReviewTimeInMs !== 0) {
      writer.uint32(72).int32(message.humanReviewTimeInMs);
    }
    if (message.numProcessedPages !== undefined && message.numProcessedPages !== 0) {
      writer.uint32(80).int32(message.numProcessedPages);
    }
    if (message.screenshot !== undefined) {
      RecordedFile.encode(message.screenshot, writer.uint32(42).fork()).ldelim();
    }
    if (message.snapshot !== undefined) {
      RecordedFile.encode(message.snapshot, writer.uint32(50).fork()).ldelim();
    }
    if (message.smartActionRequest !== undefined) {
      ProcessSmartActionsRequest.encode(message.smartActionRequest, writer.uint32(90).fork()).ldelim();
    }
    if (message.smartActionResponse !== undefined) {
      ProcessSmartActionsResponse.encode(message.smartActionResponse, writer.uint32(114).fork()).ldelim();
    }
    if (message.correctedSmartActionResponse !== undefined) {
      ProcessSmartActionsResponse.encode(message.correctedSmartActionResponse, writer.uint32(122).fork()).ldelim();
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(98).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(106).fork()).ldelim();
    }
    if (message.macroActionExecution !== undefined) {
      MacroActionExecution.encode(message.macroActionExecution, writer.uint32(130).fork()).ldelim();
    }
    if (message.reviewTaskId !== undefined && message.reviewTaskId !== "") {
      writer.uint32(138).string(message.reviewTaskId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecutedAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutedAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.preparedActionUuid = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.paramValues!.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.outputValue = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.predictedOutputValue = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.humanReviewTriggered = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.humanReviewTimeInMs = reader.int32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.numProcessedPages = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.screenshot = RecordedFile.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.snapshot = RecordedFile.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.smartActionRequest = ProcessSmartActionsRequest.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.smartActionResponse = ProcessSmartActionsResponse.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.correctedSmartActionResponse = ProcessSmartActionsResponse.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.macroActionExecution = MacroActionExecution.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.reviewTaskId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecutedAction {
    return {
      $type: ExecutedAction.$type,
      preparedActionUuid: isSet(object.preparedActionUuid) ? globalThis.String(object.preparedActionUuid) : "",
      paramValues: globalThis.Array.isArray(object?.paramValues)
        ? object.paramValues.map((e: any) => globalThis.String(e))
        : [],
      outputValue: isSet(object.outputValue) ? globalThis.String(object.outputValue) : "",
      predictedOutputValue: isSet(object.predictedOutputValue) ? globalThis.String(object.predictedOutputValue) : "",
      humanReviewTriggered: isSet(object.humanReviewTriggered)
        ? globalThis.Boolean(object.humanReviewTriggered)
        : false,
      humanReviewTimeInMs: isSet(object.humanReviewTimeInMs) ? globalThis.Number(object.humanReviewTimeInMs) : 0,
      numProcessedPages: isSet(object.numProcessedPages) ? globalThis.Number(object.numProcessedPages) : 0,
      screenshot: isSet(object.screenshot) ? RecordedFile.fromJSON(object.screenshot) : undefined,
      snapshot: isSet(object.snapshot) ? RecordedFile.fromJSON(object.snapshot) : undefined,
      smartActionRequest: isSet(object.smartActionRequest)
        ? ProcessSmartActionsRequest.fromJSON(object.smartActionRequest)
        : undefined,
      smartActionResponse: isSet(object.smartActionResponse)
        ? ProcessSmartActionsResponse.fromJSON(object.smartActionResponse)
        : undefined,
      correctedSmartActionResponse: isSet(object.correctedSmartActionResponse)
        ? ProcessSmartActionsResponse.fromJSON(object.correctedSmartActionResponse)
        : undefined,
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
      macroActionExecution: isSet(object.macroActionExecution)
        ? MacroActionExecution.fromJSON(object.macroActionExecution)
        : undefined,
      reviewTaskId: isSet(object.reviewTaskId) ? globalThis.String(object.reviewTaskId) : "",
    };
  },

  toJSON(message: ExecutedAction): unknown {
    const obj: any = {};
    if (message.preparedActionUuid !== undefined && message.preparedActionUuid !== "") {
      obj.preparedActionUuid = message.preparedActionUuid;
    }
    if (message.paramValues?.length) {
      obj.paramValues = message.paramValues;
    }
    if (message.outputValue !== undefined && message.outputValue !== "") {
      obj.outputValue = message.outputValue;
    }
    if (message.predictedOutputValue !== undefined && message.predictedOutputValue !== "") {
      obj.predictedOutputValue = message.predictedOutputValue;
    }
    if (message.humanReviewTriggered !== undefined && message.humanReviewTriggered !== false) {
      obj.humanReviewTriggered = message.humanReviewTriggered;
    }
    if (message.humanReviewTimeInMs !== undefined && message.humanReviewTimeInMs !== 0) {
      obj.humanReviewTimeInMs = Math.round(message.humanReviewTimeInMs);
    }
    if (message.numProcessedPages !== undefined && message.numProcessedPages !== 0) {
      obj.numProcessedPages = Math.round(message.numProcessedPages);
    }
    if (message.screenshot !== undefined) {
      obj.screenshot = RecordedFile.toJSON(message.screenshot);
    }
    if (message.snapshot !== undefined) {
      obj.snapshot = RecordedFile.toJSON(message.snapshot);
    }
    if (message.smartActionRequest !== undefined) {
      obj.smartActionRequest = ProcessSmartActionsRequest.toJSON(message.smartActionRequest);
    }
    if (message.smartActionResponse !== undefined) {
      obj.smartActionResponse = ProcessSmartActionsResponse.toJSON(message.smartActionResponse);
    }
    if (message.correctedSmartActionResponse !== undefined) {
      obj.correctedSmartActionResponse = ProcessSmartActionsResponse.toJSON(message.correctedSmartActionResponse);
    }
    if (message.startTime !== undefined) {
      obj.startTime = message.startTime.toISOString();
    }
    if (message.endTime !== undefined) {
      obj.endTime = message.endTime.toISOString();
    }
    if (message.macroActionExecution !== undefined) {
      obj.macroActionExecution = MacroActionExecution.toJSON(message.macroActionExecution);
    }
    if (message.reviewTaskId !== undefined && message.reviewTaskId !== "") {
      obj.reviewTaskId = message.reviewTaskId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecutedAction>, I>>(base?: I): ExecutedAction {
    return ExecutedAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExecutedAction>, I>>(object: I): ExecutedAction {
    const message = createBaseExecutedAction();
    message.preparedActionUuid = object.preparedActionUuid ?? "";
    message.paramValues = object.paramValues?.map((e) => e) || [];
    message.outputValue = object.outputValue ?? "";
    message.predictedOutputValue = object.predictedOutputValue ?? "";
    message.humanReviewTriggered = object.humanReviewTriggered ?? false;
    message.humanReviewTimeInMs = object.humanReviewTimeInMs ?? 0;
    message.numProcessedPages = object.numProcessedPages ?? 0;
    message.screenshot = (object.screenshot !== undefined && object.screenshot !== null)
      ? RecordedFile.fromPartial(object.screenshot)
      : undefined;
    message.snapshot = (object.snapshot !== undefined && object.snapshot !== null)
      ? RecordedFile.fromPartial(object.snapshot)
      : undefined;
    message.smartActionRequest = (object.smartActionRequest !== undefined && object.smartActionRequest !== null)
      ? ProcessSmartActionsRequest.fromPartial(object.smartActionRequest)
      : undefined;
    message.smartActionResponse = (object.smartActionResponse !== undefined && object.smartActionResponse !== null)
      ? ProcessSmartActionsResponse.fromPartial(object.smartActionResponse)
      : undefined;
    message.correctedSmartActionResponse =
      (object.correctedSmartActionResponse !== undefined && object.correctedSmartActionResponse !== null)
        ? ProcessSmartActionsResponse.fromPartial(object.correctedSmartActionResponse)
        : undefined;
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    message.macroActionExecution = (object.macroActionExecution !== undefined && object.macroActionExecution !== null)
      ? MacroActionExecution.fromPartial(object.macroActionExecution)
      : undefined;
    message.reviewTaskId = object.reviewTaskId ?? "";
    return message;
  },
};

messageTypeRegistry.set(ExecutedAction.$type, ExecutedAction);

function createBaseGotoAction(): GotoAction {
  return { $type: "pb.v1alpha1.GotoAction", url: undefined };
}

export const GotoAction = {
  $type: "pb.v1alpha1.GotoAction" as const,

  encode(message: GotoAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== undefined) {
      ActionParamValue.encode(message.url, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GotoAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGotoAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 26) {
            break;
          }

          message.url = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GotoAction {
    return { $type: GotoAction.$type, url: isSet(object.url) ? ActionParamValue.fromJSON(object.url) : undefined };
  },

  toJSON(message: GotoAction): unknown {
    const obj: any = {};
    if (message.url !== undefined) {
      obj.url = ActionParamValue.toJSON(message.url);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GotoAction>, I>>(base?: I): GotoAction {
    return GotoAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GotoAction>, I>>(object: I): GotoAction {
    const message = createBaseGotoAction();
    message.url = (object.url !== undefined && object.url !== null)
      ? ActionParamValue.fromPartial(object.url)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GotoAction.$type, GotoAction);

function createBaseLaunchAction(): LaunchAction {
  return { $type: "pb.v1alpha1.LaunchAction", application: "", params: [] };
}

export const LaunchAction = {
  $type: "pb.v1alpha1.LaunchAction" as const,

  encode(message: LaunchAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.application !== undefined && message.application !== "") {
      writer.uint32(10).string(message.application);
    }
    if (message.params !== undefined && message.params.length !== 0) {
      for (const v of message.params) {
        ActionParamValue.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LaunchAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLaunchAction();
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

          message.params!.push(ActionParamValue.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LaunchAction {
    return {
      $type: LaunchAction.$type,
      application: isSet(object.application) ? globalThis.String(object.application) : "",
      params: globalThis.Array.isArray(object?.params)
        ? object.params.map((e: any) => ActionParamValue.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LaunchAction): unknown {
    const obj: any = {};
    if (message.application !== undefined && message.application !== "") {
      obj.application = message.application;
    }
    if (message.params?.length) {
      obj.params = message.params.map((e) => ActionParamValue.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LaunchAction>, I>>(base?: I): LaunchAction {
    return LaunchAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LaunchAction>, I>>(object: I): LaunchAction {
    const message = createBaseLaunchAction();
    message.application = object.application ?? "";
    message.params = object.params?.map((e) => ActionParamValue.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(LaunchAction.$type, LaunchAction);

function createBaseClickAction(): ClickAction {
  return {
    $type: "pb.v1alpha1.ClickAction",
    elementLocator: undefined,
    isDoubleClick: false,
    type: 0,
    locator: undefined,
  };
}

export const ClickAction = {
  $type: "pb.v1alpha1.ClickAction" as const,

  encode(message: ClickAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.elementLocator !== undefined) {
      ElementLocator.encode(message.elementLocator, writer.uint32(10).fork()).ldelim();
    }
    if (message.isDoubleClick !== undefined && message.isDoubleClick !== false) {
      writer.uint32(16).bool(message.isDoubleClick);
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.locator !== undefined) {
      ActionParamValue.encode(message.locator, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClickAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClickAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.elementLocator = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.isDoubleClick = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.locator = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClickAction {
    return {
      $type: ClickAction.$type,
      elementLocator: isSet(object.elementLocator) ? ElementLocator.fromJSON(object.elementLocator) : undefined,
      isDoubleClick: isSet(object.isDoubleClick) ? globalThis.Boolean(object.isDoubleClick) : false,
      type: isSet(object.type) ? clickTypeFromJSON(object.type) : 0,
      locator: isSet(object.locator) ? ActionParamValue.fromJSON(object.locator) : undefined,
    };
  },

  toJSON(message: ClickAction): unknown {
    const obj: any = {};
    if (message.elementLocator !== undefined) {
      obj.elementLocator = ElementLocator.toJSON(message.elementLocator);
    }
    if (message.isDoubleClick !== undefined && message.isDoubleClick !== false) {
      obj.isDoubleClick = message.isDoubleClick;
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = clickTypeToJSON(message.type);
    }
    if (message.locator !== undefined) {
      obj.locator = ActionParamValue.toJSON(message.locator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClickAction>, I>>(base?: I): ClickAction {
    return ClickAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClickAction>, I>>(object: I): ClickAction {
    const message = createBaseClickAction();
    message.elementLocator = (object.elementLocator !== undefined && object.elementLocator !== null)
      ? ElementLocator.fromPartial(object.elementLocator)
      : undefined;
    message.isDoubleClick = object.isDoubleClick ?? false;
    message.type = object.type ?? 0;
    message.locator = (object.locator !== undefined && object.locator !== null)
      ? ActionParamValue.fromPartial(object.locator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ClickAction.$type, ClickAction);

function createBaseHoverAction(): HoverAction {
  return { $type: "pb.v1alpha1.HoverAction", elementLocator: undefined, locator: undefined };
}

export const HoverAction = {
  $type: "pb.v1alpha1.HoverAction" as const,

  encode(message: HoverAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.elementLocator !== undefined) {
      ElementLocator.encode(message.elementLocator, writer.uint32(10).fork()).ldelim();
    }
    if (message.locator !== undefined) {
      ActionParamValue.encode(message.locator, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HoverAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHoverAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.elementLocator = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.locator = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HoverAction {
    return {
      $type: HoverAction.$type,
      elementLocator: isSet(object.elementLocator) ? ElementLocator.fromJSON(object.elementLocator) : undefined,
      locator: isSet(object.locator) ? ActionParamValue.fromJSON(object.locator) : undefined,
    };
  },

  toJSON(message: HoverAction): unknown {
    const obj: any = {};
    if (message.elementLocator !== undefined) {
      obj.elementLocator = ElementLocator.toJSON(message.elementLocator);
    }
    if (message.locator !== undefined) {
      obj.locator = ActionParamValue.toJSON(message.locator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HoverAction>, I>>(base?: I): HoverAction {
    return HoverAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HoverAction>, I>>(object: I): HoverAction {
    const message = createBaseHoverAction();
    message.elementLocator = (object.elementLocator !== undefined && object.elementLocator !== null)
      ? ElementLocator.fromPartial(object.elementLocator)
      : undefined;
    message.locator = (object.locator !== undefined && object.locator !== null)
      ? ActionParamValue.fromPartial(object.locator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(HoverAction.$type, HoverAction);

function createBaseGetElementAction(): GetElementAction {
  return { $type: "pb.v1alpha1.GetElementAction", locator: undefined, elementLocator: undefined };
}

export const GetElementAction = {
  $type: "pb.v1alpha1.GetElementAction" as const,

  encode(message: GetElementAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.locator !== undefined) {
      ElementLocator.encode(message.locator, writer.uint32(10).fork()).ldelim();
    }
    if (message.elementLocator !== undefined) {
      ActionParamValue.encode(message.elementLocator, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetElementAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetElementAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.locator = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.elementLocator = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetElementAction {
    return {
      $type: GetElementAction.$type,
      locator: isSet(object.locator) ? ElementLocator.fromJSON(object.locator) : undefined,
      elementLocator: isSet(object.elementLocator) ? ActionParamValue.fromJSON(object.elementLocator) : undefined,
    };
  },

  toJSON(message: GetElementAction): unknown {
    const obj: any = {};
    if (message.locator !== undefined) {
      obj.locator = ElementLocator.toJSON(message.locator);
    }
    if (message.elementLocator !== undefined) {
      obj.elementLocator = ActionParamValue.toJSON(message.elementLocator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetElementAction>, I>>(base?: I): GetElementAction {
    return GetElementAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetElementAction>, I>>(object: I): GetElementAction {
    const message = createBaseGetElementAction();
    message.locator = (object.locator !== undefined && object.locator !== null)
      ? ElementLocator.fromPartial(object.locator)
      : undefined;
    message.elementLocator = (object.elementLocator !== undefined && object.elementLocator !== null)
      ? ActionParamValue.fromPartial(object.elementLocator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetElementAction.$type, GetElementAction);

function createBaseGetFormAction(): GetFormAction {
  return { $type: "pb.v1alpha1.GetFormAction", formLocator: undefined };
}

export const GetFormAction = {
  $type: "pb.v1alpha1.GetFormAction" as const,

  encode(message: GetFormAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.formLocator !== undefined) {
      ElementLocator.encode(message.formLocator, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFormAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFormAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.formLocator = ElementLocator.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFormAction {
    return {
      $type: GetFormAction.$type,
      formLocator: isSet(object.formLocator) ? ElementLocator.fromJSON(object.formLocator) : undefined,
    };
  },

  toJSON(message: GetFormAction): unknown {
    const obj: any = {};
    if (message.formLocator !== undefined) {
      obj.formLocator = ElementLocator.toJSON(message.formLocator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFormAction>, I>>(base?: I): GetFormAction {
    return GetFormAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFormAction>, I>>(object: I): GetFormAction {
    const message = createBaseGetFormAction();
    message.formLocator = (object.formLocator !== undefined && object.formLocator !== null)
      ? ElementLocator.fromPartial(object.formLocator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetFormAction.$type, GetFormAction);

function createBaseFillFormAction(): FillFormAction {
  return { $type: "pb.v1alpha1.FillFormAction", formLocator: undefined, pressEnter: false };
}

export const FillFormAction = {
  $type: "pb.v1alpha1.FillFormAction" as const,

  encode(message: FillFormAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.formLocator !== undefined) {
      ElementLocator.encode(message.formLocator, writer.uint32(10).fork()).ldelim();
    }
    if (message.pressEnter !== undefined && message.pressEnter !== false) {
      writer.uint32(16).bool(message.pressEnter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FillFormAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFillFormAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.formLocator = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pressEnter = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FillFormAction {
    return {
      $type: FillFormAction.$type,
      formLocator: isSet(object.formLocator) ? ElementLocator.fromJSON(object.formLocator) : undefined,
      pressEnter: isSet(object.pressEnter) ? globalThis.Boolean(object.pressEnter) : false,
    };
  },

  toJSON(message: FillFormAction): unknown {
    const obj: any = {};
    if (message.formLocator !== undefined) {
      obj.formLocator = ElementLocator.toJSON(message.formLocator);
    }
    if (message.pressEnter !== undefined && message.pressEnter !== false) {
      obj.pressEnter = message.pressEnter;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FillFormAction>, I>>(base?: I): FillFormAction {
    return FillFormAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FillFormAction>, I>>(object: I): FillFormAction {
    const message = createBaseFillFormAction();
    message.formLocator = (object.formLocator !== undefined && object.formLocator !== null)
      ? ElementLocator.fromPartial(object.formLocator)
      : undefined;
    message.pressEnter = object.pressEnter ?? false;
    return message;
  },
};

messageTypeRegistry.set(FillFormAction.$type, FillFormAction);

function createBaseSetValueAction(): SetValueAction {
  return { $type: "pb.v1alpha1.SetValueAction", fieldLocator: undefined, fieldValue: undefined, pressEnter: false };
}

export const SetValueAction = {
  $type: "pb.v1alpha1.SetValueAction" as const,

  encode(message: SetValueAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldLocator !== undefined) {
      ActionParamValue.encode(message.fieldLocator, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldValue !== undefined) {
      ActionParamValue.encode(message.fieldValue, writer.uint32(18).fork()).ldelim();
    }
    if (message.pressEnter !== undefined && message.pressEnter !== false) {
      writer.uint32(24).bool(message.pressEnter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetValueAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetValueAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fieldLocator = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fieldValue = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pressEnter = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetValueAction {
    return {
      $type: SetValueAction.$type,
      fieldLocator: isSet(object.fieldLocator) ? ActionParamValue.fromJSON(object.fieldLocator) : undefined,
      fieldValue: isSet(object.fieldValue) ? ActionParamValue.fromJSON(object.fieldValue) : undefined,
      pressEnter: isSet(object.pressEnter) ? globalThis.Boolean(object.pressEnter) : false,
    };
  },

  toJSON(message: SetValueAction): unknown {
    const obj: any = {};
    if (message.fieldLocator !== undefined) {
      obj.fieldLocator = ActionParamValue.toJSON(message.fieldLocator);
    }
    if (message.fieldValue !== undefined) {
      obj.fieldValue = ActionParamValue.toJSON(message.fieldValue);
    }
    if (message.pressEnter !== undefined && message.pressEnter !== false) {
      obj.pressEnter = message.pressEnter;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetValueAction>, I>>(base?: I): SetValueAction {
    return SetValueAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetValueAction>, I>>(object: I): SetValueAction {
    const message = createBaseSetValueAction();
    message.fieldLocator = (object.fieldLocator !== undefined && object.fieldLocator !== null)
      ? ActionParamValue.fromPartial(object.fieldLocator)
      : undefined;
    message.fieldValue = (object.fieldValue !== undefined && object.fieldValue !== null)
      ? ActionParamValue.fromPartial(object.fieldValue)
      : undefined;
    message.pressEnter = object.pressEnter ?? false;
    return message;
  },
};

messageTypeRegistry.set(SetValueAction.$type, SetValueAction);

function createBaseExtractFieldsAction(): ExtractFieldsAction {
  return { $type: "pb.v1alpha1.ExtractFieldsAction", document: undefined, fields: [], entities: [] };
}

export const ExtractFieldsAction = {
  $type: "pb.v1alpha1.ExtractFieldsAction" as const,

  encode(message: ExtractFieldsAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.document !== undefined) {
      ActionParamValue.encode(message.document, writer.uint32(26).fork()).ldelim();
    }
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        writer.uint32(34).string(v!);
      }
    }
    if (message.entities !== undefined && message.entities.length !== 0) {
      for (const v of message.entities) {
        Field.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtractFieldsAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtractFieldsAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 26) {
            break;
          }

          message.document = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fields!.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.entities!.push(Field.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtractFieldsAction {
    return {
      $type: ExtractFieldsAction.$type,
      document: isSet(object.document) ? ActionParamValue.fromJSON(object.document) : undefined,
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => globalThis.String(e)) : [],
      entities: globalThis.Array.isArray(object?.entities) ? object.entities.map((e: any) => Field.fromJSON(e)) : [],
    };
  },

  toJSON(message: ExtractFieldsAction): unknown {
    const obj: any = {};
    if (message.document !== undefined) {
      obj.document = ActionParamValue.toJSON(message.document);
    }
    if (message.fields?.length) {
      obj.fields = message.fields;
    }
    if (message.entities?.length) {
      obj.entities = message.entities.map((e) => Field.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtractFieldsAction>, I>>(base?: I): ExtractFieldsAction {
    return ExtractFieldsAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtractFieldsAction>, I>>(object: I): ExtractFieldsAction {
    const message = createBaseExtractFieldsAction();
    message.document = (object.document !== undefined && object.document !== null)
      ? ActionParamValue.fromPartial(object.document)
      : undefined;
    message.fields = object.fields?.map((e) => e) || [];
    message.entities = object.entities?.map((e) => Field.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ExtractFieldsAction.$type, ExtractFieldsAction);

function createBaseValidateAction(): ValidateAction {
  return {
    $type: "pb.v1alpha1.ValidateAction",
    source: undefined,
    target: undefined,
    rule: "",
    fields: [],
    metadata: {},
  };
}

export const ValidateAction = {
  $type: "pb.v1alpha1.ValidateAction" as const,

  encode(message: ValidateAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== undefined) {
      ActionParamValue.encode(message.source, writer.uint32(50).fork()).ldelim();
    }
    if (message.target !== undefined) {
      ActionParamValue.encode(message.target, writer.uint32(58).fork()).ldelim();
    }
    if (message.rule !== undefined && message.rule !== "") {
      writer.uint32(34).string(message.rule);
    }
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        writer.uint32(42).string(v!);
      }
    }
    Object.entries(message.metadata || {}).forEach(([key, value]) => {
      ValidateActionMetadataEntry.encode(
        { $type: "pb.v1alpha1.ValidateAction.MetadataEntry", key: key as any, value },
        writer.uint32(66).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 6:
          if (tag !== 50) {
            break;
          }

          message.source = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.target = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.rule = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fields!.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          const entry8 = ValidateActionMetadataEntry.decode(reader, reader.uint32());
          if (entry8.value !== undefined) {
            message.metadata![entry8.key] = entry8.value;
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

  fromJSON(object: any): ValidateAction {
    return {
      $type: ValidateAction.$type,
      source: isSet(object.source) ? ActionParamValue.fromJSON(object.source) : undefined,
      target: isSet(object.target) ? ActionParamValue.fromJSON(object.target) : undefined,
      rule: isSet(object.rule) ? globalThis.String(object.rule) : "",
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => globalThis.String(e)) : [],
      metadata: isObject(object.metadata)
        ? Object.entries(object.metadata).reduce<{ [key: string]: ActionParamValue }>((acc, [key, value]) => {
          acc[key] = ActionParamValue.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ValidateAction): unknown {
    const obj: any = {};
    if (message.source !== undefined) {
      obj.source = ActionParamValue.toJSON(message.source);
    }
    if (message.target !== undefined) {
      obj.target = ActionParamValue.toJSON(message.target);
    }
    if (message.rule !== undefined && message.rule !== "") {
      obj.rule = message.rule;
    }
    if (message.fields?.length) {
      obj.fields = message.fields;
    }
    if (message.metadata) {
      const entries = Object.entries(message.metadata);
      if (entries.length > 0) {
        obj.metadata = {};
        entries.forEach(([k, v]) => {
          obj.metadata[k] = ActionParamValue.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateAction>, I>>(base?: I): ValidateAction {
    return ValidateAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidateAction>, I>>(object: I): ValidateAction {
    const message = createBaseValidateAction();
    message.source = (object.source !== undefined && object.source !== null)
      ? ActionParamValue.fromPartial(object.source)
      : undefined;
    message.target = (object.target !== undefined && object.target !== null)
      ? ActionParamValue.fromPartial(object.target)
      : undefined;
    message.rule = object.rule ?? "";
    message.fields = object.fields?.map((e) => e) || [];
    message.metadata = Object.entries(object.metadata ?? {}).reduce<{ [key: string]: ActionParamValue }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = ActionParamValue.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

messageTypeRegistry.set(ValidateAction.$type, ValidateAction);

function createBaseValidateActionMetadataEntry(): ValidateActionMetadataEntry {
  return { $type: "pb.v1alpha1.ValidateAction.MetadataEntry", key: "", value: undefined };
}

export const ValidateActionMetadataEntry = {
  $type: "pb.v1alpha1.ValidateAction.MetadataEntry" as const,

  encode(message: ValidateActionMetadataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      ActionParamValue.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateActionMetadataEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateActionMetadataEntry();
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

          message.value = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidateActionMetadataEntry {
    return {
      $type: ValidateActionMetadataEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? ActionParamValue.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ValidateActionMetadataEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = ActionParamValue.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateActionMetadataEntry>, I>>(base?: I): ValidateActionMetadataEntry {
    return ValidateActionMetadataEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidateActionMetadataEntry>, I>>(object: I): ValidateActionMetadataEntry {
    const message = createBaseValidateActionMetadataEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? ActionParamValue.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ValidateActionMetadataEntry.$type, ValidateActionMetadataEntry);

function createBaseJsFunctionAction(): JsFunctionAction {
  return { $type: "pb.v1alpha1.JsFunctionAction", description: "", paramNames: [], params: [], body: "" };
}

export const JsFunctionAction = {
  $type: "pb.v1alpha1.JsFunctionAction" as const,

  encode(message: JsFunctionAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.paramNames !== undefined && message.paramNames.length !== 0) {
      for (const v of message.paramNames) {
        writer.uint32(26).string(v!);
      }
    }
    if (message.params !== undefined && message.params.length !== 0) {
      for (const v of message.params) {
        ActionParamValue.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.body !== undefined && message.body !== "") {
      writer.uint32(18).string(message.body);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JsFunctionAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJsFunctionAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.paramNames!.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.params!.push(ActionParamValue.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.body = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JsFunctionAction {
    return {
      $type: JsFunctionAction.$type,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      paramNames: globalThis.Array.isArray(object?.paramNames)
        ? object.paramNames.map((e: any) => globalThis.String(e))
        : [],
      params: globalThis.Array.isArray(object?.params)
        ? object.params.map((e: any) => ActionParamValue.fromJSON(e))
        : [],
      body: isSet(object.body) ? globalThis.String(object.body) : "",
    };
  },

  toJSON(message: JsFunctionAction): unknown {
    const obj: any = {};
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.paramNames?.length) {
      obj.paramNames = message.paramNames;
    }
    if (message.params?.length) {
      obj.params = message.params.map((e) => ActionParamValue.toJSON(e));
    }
    if (message.body !== undefined && message.body !== "") {
      obj.body = message.body;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JsFunctionAction>, I>>(base?: I): JsFunctionAction {
    return JsFunctionAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JsFunctionAction>, I>>(object: I): JsFunctionAction {
    const message = createBaseJsFunctionAction();
    message.description = object.description ?? "";
    message.paramNames = object.paramNames?.map((e) => e) || [];
    message.params = object.params?.map((e) => ActionParamValue.fromPartial(e)) || [];
    message.body = object.body ?? "";
    return message;
  },
};

messageTypeRegistry.set(JsFunctionAction.$type, JsFunctionAction);

function createBaseConditionAction(): ConditionAction {
  return {
    $type: "pb.v1alpha1.ConditionAction",
    condition: undefined,
    trueActions: [],
    falseActions: [],
    thenActions: [],
    elseActions: [],
  };
}

export const ConditionAction = {
  $type: "pb.v1alpha1.ConditionAction" as const,

  encode(message: ConditionAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.condition !== undefined) {
      ActionParamValue.encode(message.condition, writer.uint32(34).fork()).ldelim();
    }
    if (message.trueActions !== undefined && message.trueActions.length !== 0) {
      for (const v of message.trueActions) {
        ActionGroup.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.falseActions !== undefined && message.falseActions.length !== 0) {
      for (const v of message.falseActions) {
        ActionGroup.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.thenActions !== undefined && message.thenActions.length !== 0) {
      for (const v of message.thenActions) {
        Action.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.elseActions !== undefined && message.elseActions.length !== 0) {
      for (const v of message.elseActions) {
        Action.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConditionAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConditionAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.condition = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.trueActions!.push(ActionGroup.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.falseActions!.push(ActionGroup.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.thenActions!.push(Action.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.elseActions!.push(Action.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConditionAction {
    return {
      $type: ConditionAction.$type,
      condition: isSet(object.condition) ? ActionParamValue.fromJSON(object.condition) : undefined,
      trueActions: globalThis.Array.isArray(object?.trueActions)
        ? object.trueActions.map((e: any) => ActionGroup.fromJSON(e))
        : [],
      falseActions: globalThis.Array.isArray(object?.falseActions)
        ? object.falseActions.map((e: any) => ActionGroup.fromJSON(e))
        : [],
      thenActions: globalThis.Array.isArray(object?.thenActions)
        ? object.thenActions.map((e: any) => Action.fromJSON(e))
        : [],
      elseActions: globalThis.Array.isArray(object?.elseActions)
        ? object.elseActions.map((e: any) => Action.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ConditionAction): unknown {
    const obj: any = {};
    if (message.condition !== undefined) {
      obj.condition = ActionParamValue.toJSON(message.condition);
    }
    if (message.trueActions?.length) {
      obj.trueActions = message.trueActions.map((e) => ActionGroup.toJSON(e));
    }
    if (message.falseActions?.length) {
      obj.falseActions = message.falseActions.map((e) => ActionGroup.toJSON(e));
    }
    if (message.thenActions?.length) {
      obj.thenActions = message.thenActions.map((e) => Action.toJSON(e));
    }
    if (message.elseActions?.length) {
      obj.elseActions = message.elseActions.map((e) => Action.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConditionAction>, I>>(base?: I): ConditionAction {
    return ConditionAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConditionAction>, I>>(object: I): ConditionAction {
    const message = createBaseConditionAction();
    message.condition = (object.condition !== undefined && object.condition !== null)
      ? ActionParamValue.fromPartial(object.condition)
      : undefined;
    message.trueActions = object.trueActions?.map((e) => ActionGroup.fromPartial(e)) || [];
    message.falseActions = object.falseActions?.map((e) => ActionGroup.fromPartial(e)) || [];
    message.thenActions = object.thenActions?.map((e) => Action.fromPartial(e)) || [];
    message.elseActions = object.elseActions?.map((e) => Action.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ConditionAction.$type, ConditionAction);

function createBaseGetListAction(): GetListAction {
  return { $type: "pb.v1alpha1.GetListAction", listLocator: undefined };
}

export const GetListAction = {
  $type: "pb.v1alpha1.GetListAction" as const,

  encode(message: GetListAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.listLocator !== undefined) {
      ElementLocator.encode(message.listLocator, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.listLocator = ElementLocator.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListAction {
    return {
      $type: GetListAction.$type,
      listLocator: isSet(object.listLocator) ? ElementLocator.fromJSON(object.listLocator) : undefined,
    };
  },

  toJSON(message: GetListAction): unknown {
    const obj: any = {};
    if (message.listLocator !== undefined) {
      obj.listLocator = ElementLocator.toJSON(message.listLocator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListAction>, I>>(base?: I): GetListAction {
    return GetListAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListAction>, I>>(object: I): GetListAction {
    const message = createBaseGetListAction();
    message.listLocator = (object.listLocator !== undefined && object.listLocator !== null)
      ? ElementLocator.fromPartial(object.listLocator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetListAction.$type, GetListAction);

function createBaseUpdateListAction(): UpdateListAction {
  return { $type: "pb.v1alpha1.UpdateListAction", listLocator: undefined, updates: undefined };
}

export const UpdateListAction = {
  $type: "pb.v1alpha1.UpdateListAction" as const,

  encode(message: UpdateListAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.listLocator !== undefined) {
      ActionParamValue.encode(message.listLocator, writer.uint32(10).fork()).ldelim();
    }
    if (message.updates !== undefined) {
      ActionParamValue.encode(message.updates, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateListAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateListAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.listLocator = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.updates = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateListAction {
    return {
      $type: UpdateListAction.$type,
      listLocator: isSet(object.listLocator) ? ActionParamValue.fromJSON(object.listLocator) : undefined,
      updates: isSet(object.updates) ? ActionParamValue.fromJSON(object.updates) : undefined,
    };
  },

  toJSON(message: UpdateListAction): unknown {
    const obj: any = {};
    if (message.listLocator !== undefined) {
      obj.listLocator = ActionParamValue.toJSON(message.listLocator);
    }
    if (message.updates !== undefined) {
      obj.updates = ActionParamValue.toJSON(message.updates);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateListAction>, I>>(base?: I): UpdateListAction {
    return UpdateListAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateListAction>, I>>(object: I): UpdateListAction {
    const message = createBaseUpdateListAction();
    message.listLocator = (object.listLocator !== undefined && object.listLocator !== null)
      ? ActionParamValue.fromPartial(object.listLocator)
      : undefined;
    message.updates = (object.updates !== undefined && object.updates !== null)
      ? ActionParamValue.fromPartial(object.updates)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateListAction.$type, UpdateListAction);

function createBaseFieldUpdate(): FieldUpdate {
  return { $type: "pb.v1alpha1.FieldUpdate", fieldGroupIndex: 0, fields: [] };
}

export const FieldUpdate = {
  $type: "pb.v1alpha1.FieldUpdate" as const,

  encode(message: FieldUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldGroupIndex !== undefined && message.fieldGroupIndex !== 0) {
      writer.uint32(8).int32(message.fieldGroupIndex);
    }
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        Field.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldUpdate();
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

  fromJSON(object: any): FieldUpdate {
    return {
      $type: FieldUpdate.$type,
      fieldGroupIndex: isSet(object.fieldGroupIndex) ? globalThis.Number(object.fieldGroupIndex) : 0,
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => Field.fromJSON(e)) : [],
    };
  },

  toJSON(message: FieldUpdate): unknown {
    const obj: any = {};
    if (message.fieldGroupIndex !== undefined && message.fieldGroupIndex !== 0) {
      obj.fieldGroupIndex = Math.round(message.fieldGroupIndex);
    }
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => Field.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldUpdate>, I>>(base?: I): FieldUpdate {
    return FieldUpdate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldUpdate>, I>>(object: I): FieldUpdate {
    const message = createBaseFieldUpdate();
    message.fieldGroupIndex = object.fieldGroupIndex ?? 0;
    message.fields = object.fields?.map((e) => Field.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(FieldUpdate.$type, FieldUpdate);

function createBaseForeachAction(): ForeachAction {
  return { $type: "pb.v1alpha1.ForeachAction", items: undefined, actions: [], loopActions: [] };
}

export const ForeachAction = {
  $type: "pb.v1alpha1.ForeachAction" as const,

  encode(message: ForeachAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.items !== undefined) {
      ActionParamValue.encode(message.items, writer.uint32(34).fork()).ldelim();
    }
    if (message.actions !== undefined && message.actions.length !== 0) {
      for (const v of message.actions) {
        ActionGroup.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.loopActions !== undefined && message.loopActions.length !== 0) {
      for (const v of message.loopActions) {
        Action.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ForeachAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseForeachAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.items = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.actions!.push(ActionGroup.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.loopActions!.push(Action.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ForeachAction {
    return {
      $type: ForeachAction.$type,
      items: isSet(object.items) ? ActionParamValue.fromJSON(object.items) : undefined,
      actions: globalThis.Array.isArray(object?.actions) ? object.actions.map((e: any) => ActionGroup.fromJSON(e)) : [],
      loopActions: globalThis.Array.isArray(object?.loopActions)
        ? object.loopActions.map((e: any) => Action.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ForeachAction): unknown {
    const obj: any = {};
    if (message.items !== undefined) {
      obj.items = ActionParamValue.toJSON(message.items);
    }
    if (message.actions?.length) {
      obj.actions = message.actions.map((e) => ActionGroup.toJSON(e));
    }
    if (message.loopActions?.length) {
      obj.loopActions = message.loopActions.map((e) => Action.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ForeachAction>, I>>(base?: I): ForeachAction {
    return ForeachAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ForeachAction>, I>>(object: I): ForeachAction {
    const message = createBaseForeachAction();
    message.items = (object.items !== undefined && object.items !== null)
      ? ActionParamValue.fromPartial(object.items)
      : undefined;
    message.actions = object.actions?.map((e) => ActionGroup.fromPartial(e)) || [];
    message.loopActions = object.loopActions?.map((e) => Action.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ForeachAction.$type, ForeachAction);

function createBaseFlagKeywordsAction(): FlagKeywordsAction {
  return { $type: "pb.v1alpha1.FlagKeywordsAction", keywords: [], fields: [], source: undefined };
}

export const FlagKeywordsAction = {
  $type: "pb.v1alpha1.FlagKeywordsAction" as const,

  encode(message: FlagKeywordsAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keywords !== undefined && message.keywords.length !== 0) {
      for (const v of message.keywords) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        writer.uint32(18).string(v!);
      }
    }
    if (message.source !== undefined) {
      ActionParamValue.encode(message.source, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FlagKeywordsAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFlagKeywordsAction();
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

          message.fields!.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.source = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FlagKeywordsAction {
    return {
      $type: FlagKeywordsAction.$type,
      keywords: globalThis.Array.isArray(object?.keywords) ? object.keywords.map((e: any) => globalThis.String(e)) : [],
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => globalThis.String(e)) : [],
      source: isSet(object.source) ? ActionParamValue.fromJSON(object.source) : undefined,
    };
  },

  toJSON(message: FlagKeywordsAction): unknown {
    const obj: any = {};
    if (message.keywords?.length) {
      obj.keywords = message.keywords;
    }
    if (message.fields?.length) {
      obj.fields = message.fields;
    }
    if (message.source !== undefined) {
      obj.source = ActionParamValue.toJSON(message.source);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FlagKeywordsAction>, I>>(base?: I): FlagKeywordsAction {
    return FlagKeywordsAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FlagKeywordsAction>, I>>(object: I): FlagKeywordsAction {
    const message = createBaseFlagKeywordsAction();
    message.keywords = object.keywords?.map((e) => e) || [];
    message.fields = object.fields?.map((e) => e) || [];
    message.source = (object.source !== undefined && object.source !== null)
      ? ActionParamValue.fromPartial(object.source)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(FlagKeywordsAction.$type, FlagKeywordsAction);

function createBaseDetectDuplicateLineItemsAction(): DetectDuplicateLineItemsAction {
  return { $type: "pb.v1alpha1.DetectDuplicateLineItemsAction", duplicates: [], source: undefined };
}

export const DetectDuplicateLineItemsAction = {
  $type: "pb.v1alpha1.DetectDuplicateLineItemsAction" as const,

  encode(message: DetectDuplicateLineItemsAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.duplicates !== undefined && message.duplicates.length !== 0) {
      for (const v of message.duplicates) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.source !== undefined) {
      ActionParamValue.encode(message.source, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DetectDuplicateLineItemsAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetectDuplicateLineItemsAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.duplicates!.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.source = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DetectDuplicateLineItemsAction {
    return {
      $type: DetectDuplicateLineItemsAction.$type,
      duplicates: globalThis.Array.isArray(object?.duplicates)
        ? object.duplicates.map((e: any) => globalThis.String(e))
        : [],
      source: isSet(object.source) ? ActionParamValue.fromJSON(object.source) : undefined,
    };
  },

  toJSON(message: DetectDuplicateLineItemsAction): unknown {
    const obj: any = {};
    if (message.duplicates?.length) {
      obj.duplicates = message.duplicates;
    }
    if (message.source !== undefined) {
      obj.source = ActionParamValue.toJSON(message.source);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DetectDuplicateLineItemsAction>, I>>(base?: I): DetectDuplicateLineItemsAction {
    return DetectDuplicateLineItemsAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DetectDuplicateLineItemsAction>, I>>(
    object: I,
  ): DetectDuplicateLineItemsAction {
    const message = createBaseDetectDuplicateLineItemsAction();
    message.duplicates = object.duplicates?.map((e) => e) || [];
    message.source = (object.source !== undefined && object.source !== null)
      ? ActionParamValue.fromPartial(object.source)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DetectDuplicateLineItemsAction.$type, DetectDuplicateLineItemsAction);

function createBaseWorkflowVariable(): WorkflowVariable {
  return { $type: "pb.v1alpha1.WorkflowVariable", key: "", value: "" };
}

export const WorkflowVariable = {
  $type: "pb.v1alpha1.WorkflowVariable" as const,

  encode(message: WorkflowVariable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== undefined && message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined && message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowVariable {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowVariable();
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

  fromJSON(object: any): WorkflowVariable {
    return {
      $type: WorkflowVariable.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: WorkflowVariable): unknown {
    const obj: any = {};
    if (message.key !== undefined && message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined && message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowVariable>, I>>(base?: I): WorkflowVariable {
    return WorkflowVariable.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowVariable>, I>>(object: I): WorkflowVariable {
    const message = createBaseWorkflowVariable();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

messageTypeRegistry.set(WorkflowVariable.$type, WorkflowVariable);

function createBaseCreateTaskAction(): CreateTaskAction {
  return { $type: "pb.v1alpha1.CreateTaskAction", workflowId: "", processId: "", workflowVariables: [], variables: [] };
}

export const CreateTaskAction = {
  $type: "pb.v1alpha1.CreateTaskAction" as const,

  encode(message: CreateTaskAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(10).string(message.workflowId);
    }
    if (message.processId !== undefined && message.processId !== "") {
      writer.uint32(26).string(message.processId);
    }
    if (message.workflowVariables !== undefined && message.workflowVariables.length !== 0) {
      for (const v of message.workflowVariables) {
        ActionParamValue.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.variables !== undefined && message.variables.length !== 0) {
      for (const v of message.variables) {
        CreateTaskActionVariable.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTaskAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTaskAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflowId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.processId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.workflowVariables!.push(ActionParamValue.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.variables!.push(CreateTaskActionVariable.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateTaskAction {
    return {
      $type: CreateTaskAction.$type,
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      processId: isSet(object.processId) ? globalThis.String(object.processId) : "",
      workflowVariables: globalThis.Array.isArray(object?.workflowVariables)
        ? object.workflowVariables.map((e: any) => ActionParamValue.fromJSON(e))
        : [],
      variables: globalThis.Array.isArray(object?.variables)
        ? object.variables.map((e: any) => CreateTaskActionVariable.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateTaskAction): unknown {
    const obj: any = {};
    if (message.workflowId !== undefined && message.workflowId !== "") {
      obj.workflowId = message.workflowId;
    }
    if (message.processId !== undefined && message.processId !== "") {
      obj.processId = message.processId;
    }
    if (message.workflowVariables?.length) {
      obj.workflowVariables = message.workflowVariables.map((e) => ActionParamValue.toJSON(e));
    }
    if (message.variables?.length) {
      obj.variables = message.variables.map((e) => CreateTaskActionVariable.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTaskAction>, I>>(base?: I): CreateTaskAction {
    return CreateTaskAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateTaskAction>, I>>(object: I): CreateTaskAction {
    const message = createBaseCreateTaskAction();
    message.workflowId = object.workflowId ?? "";
    message.processId = object.processId ?? "";
    message.workflowVariables = object.workflowVariables?.map((e) => ActionParamValue.fromPartial(e)) || [];
    message.variables = object.variables?.map((e) => CreateTaskActionVariable.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(CreateTaskAction.$type, CreateTaskAction);

function createBaseCreateTaskActionVariable(): CreateTaskActionVariable {
  return { $type: "pb.v1alpha1.CreateTaskAction.Variable", key: undefined, value: undefined };
}

export const CreateTaskActionVariable = {
  $type: "pb.v1alpha1.CreateTaskAction.Variable" as const,

  encode(message: CreateTaskActionVariable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== undefined) {
      ActionParamValue.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    if (message.value !== undefined) {
      ActionParamValue.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTaskActionVariable {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTaskActionVariable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateTaskActionVariable {
    return {
      $type: CreateTaskActionVariable.$type,
      key: isSet(object.key) ? ActionParamValue.fromJSON(object.key) : undefined,
      value: isSet(object.value) ? ActionParamValue.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: CreateTaskActionVariable): unknown {
    const obj: any = {};
    if (message.key !== undefined) {
      obj.key = ActionParamValue.toJSON(message.key);
    }
    if (message.value !== undefined) {
      obj.value = ActionParamValue.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTaskActionVariable>, I>>(base?: I): CreateTaskActionVariable {
    return CreateTaskActionVariable.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateTaskActionVariable>, I>>(object: I): CreateTaskActionVariable {
    const message = createBaseCreateTaskActionVariable();
    message.key = (object.key !== undefined && object.key !== null)
      ? ActionParamValue.fromPartial(object.key)
      : undefined;
    message.value = (object.value !== undefined && object.value !== null)
      ? ActionParamValue.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateTaskActionVariable.$type, CreateTaskActionVariable);

function createBaseReconcileItemsAction(): ReconcileItemsAction {
  return { $type: "pb.v1alpha1.ReconcileItemsAction", items: [] };
}

export const ReconcileItemsAction = {
  $type: "pb.v1alpha1.ReconcileItemsAction" as const,

  encode(message: ReconcileItemsAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.items !== undefined && message.items.length !== 0) {
      for (const v of message.items) {
        ReconcileItemsActionItemLocator.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReconcileItemsAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReconcileItemsAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.items!.push(ReconcileItemsActionItemLocator.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReconcileItemsAction {
    return {
      $type: ReconcileItemsAction.$type,
      items: globalThis.Array.isArray(object?.items)
        ? object.items.map((e: any) => ReconcileItemsActionItemLocator.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ReconcileItemsAction): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => ReconcileItemsActionItemLocator.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReconcileItemsAction>, I>>(base?: I): ReconcileItemsAction {
    return ReconcileItemsAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReconcileItemsAction>, I>>(object: I): ReconcileItemsAction {
    const message = createBaseReconcileItemsAction();
    message.items = object.items?.map((e) => ReconcileItemsActionItemLocator.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ReconcileItemsAction.$type, ReconcileItemsAction);

function createBaseReconcileItemsActionItemLocator(): ReconcileItemsActionItemLocator {
  return { $type: "pb.v1alpha1.ReconcileItemsAction.ItemLocator", tabIndex: 0, fieldGroups: undefined, documents: [] };
}

export const ReconcileItemsActionItemLocator = {
  $type: "pb.v1alpha1.ReconcileItemsAction.ItemLocator" as const,

  encode(message: ReconcileItemsActionItemLocator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tabIndex !== undefined && message.tabIndex !== 0) {
      writer.uint32(8).int32(message.tabIndex);
    }
    if (message.fieldGroups !== undefined) {
      ElementLocator.encode(message.fieldGroups, writer.uint32(18).fork()).ldelim();
    }
    if (message.documents !== undefined && message.documents.length !== 0) {
      for (const v of message.documents) {
        ElementLocator.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReconcileItemsActionItemLocator {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReconcileItemsActionItemLocator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.tabIndex = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fieldGroups = ElementLocator.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.documents!.push(ElementLocator.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReconcileItemsActionItemLocator {
    return {
      $type: ReconcileItemsActionItemLocator.$type,
      tabIndex: isSet(object.tabIndex) ? globalThis.Number(object.tabIndex) : 0,
      fieldGroups: isSet(object.fieldGroups) ? ElementLocator.fromJSON(object.fieldGroups) : undefined,
      documents: globalThis.Array.isArray(object?.documents)
        ? object.documents.map((e: any) => ElementLocator.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ReconcileItemsActionItemLocator): unknown {
    const obj: any = {};
    if (message.tabIndex !== undefined && message.tabIndex !== 0) {
      obj.tabIndex = Math.round(message.tabIndex);
    }
    if (message.fieldGroups !== undefined) {
      obj.fieldGroups = ElementLocator.toJSON(message.fieldGroups);
    }
    if (message.documents?.length) {
      obj.documents = message.documents.map((e) => ElementLocator.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReconcileItemsActionItemLocator>, I>>(base?: I): ReconcileItemsActionItemLocator {
    return ReconcileItemsActionItemLocator.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReconcileItemsActionItemLocator>, I>>(
    object: I,
  ): ReconcileItemsActionItemLocator {
    const message = createBaseReconcileItemsActionItemLocator();
    message.tabIndex = object.tabIndex ?? 0;
    message.fieldGroups = (object.fieldGroups !== undefined && object.fieldGroups !== null)
      ? ElementLocator.fromPartial(object.fieldGroups)
      : undefined;
    message.documents = object.documents?.map((e) => ElementLocator.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ReconcileItemsActionItemLocator.$type, ReconcileItemsActionItemLocator);

function createBaseUpdateDataTableAction(): UpdateDataTableAction {
  return { $type: "pb.v1alpha1.UpdateDataTableAction", tableLocator: undefined };
}

export const UpdateDataTableAction = {
  $type: "pb.v1alpha1.UpdateDataTableAction" as const,

  encode(message: UpdateDataTableAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tableLocator !== undefined) {
      ElementLocator.encode(message.tableLocator, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateDataTableAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateDataTableAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tableLocator = ElementLocator.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateDataTableAction {
    return {
      $type: UpdateDataTableAction.$type,
      tableLocator: isSet(object.tableLocator) ? ElementLocator.fromJSON(object.tableLocator) : undefined,
    };
  },

  toJSON(message: UpdateDataTableAction): unknown {
    const obj: any = {};
    if (message.tableLocator !== undefined) {
      obj.tableLocator = ElementLocator.toJSON(message.tableLocator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateDataTableAction>, I>>(base?: I): UpdateDataTableAction {
    return UpdateDataTableAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateDataTableAction>, I>>(object: I): UpdateDataTableAction {
    const message = createBaseUpdateDataTableAction();
    message.tableLocator = (object.tableLocator !== undefined && object.tableLocator !== null)
      ? ElementLocator.fromPartial(object.tableLocator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateDataTableAction.$type, UpdateDataTableAction);

function createBaseExitAction(): ExitAction {
  return { $type: "pb.v1alpha1.ExitAction", status: 0, message: "" };
}

export const ExitAction = {
  $type: "pb.v1alpha1.ExitAction" as const,

  encode(message: ExitAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExitAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExitAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): ExitAction {
    return {
      $type: ExitAction.$type,
      status: isSet(object.status) ? exitActionExitStatusFromJSON(object.status) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: ExitAction): unknown {
    const obj: any = {};
    if (message.status !== undefined && message.status !== 0) {
      obj.status = exitActionExitStatusToJSON(message.status);
    }
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExitAction>, I>>(base?: I): ExitAction {
    return ExitAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExitAction>, I>>(object: I): ExitAction {
    const message = createBaseExitAction();
    message.status = object.status ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

messageTypeRegistry.set(ExitAction.$type, ExitAction);

function createBaseCustomSmartAction(): CustomSmartAction {
  return { $type: "pb.v1alpha1.CustomSmartAction", inputs: {}, rule: "" };
}

export const CustomSmartAction = {
  $type: "pb.v1alpha1.CustomSmartAction" as const,

  encode(message: CustomSmartAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.inputs || {}).forEach(([key, value]) => {
      CustomSmartActionInputsEntry.encode({
        $type: "pb.v1alpha1.CustomSmartAction.InputsEntry",
        key: key as any,
        value,
      }, writer.uint32(10).fork()).ldelim();
    });
    if (message.rule !== undefined && message.rule !== "") {
      writer.uint32(18).string(message.rule);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomSmartAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomSmartAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = CustomSmartActionInputsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.inputs![entry1.key] = entry1.value;
          }
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

  fromJSON(object: any): CustomSmartAction {
    return {
      $type: CustomSmartAction.$type,
      inputs: isObject(object.inputs)
        ? Object.entries(object.inputs).reduce<{ [key: string]: ActionParamValue }>((acc, [key, value]) => {
          acc[key] = ActionParamValue.fromJSON(value);
          return acc;
        }, {})
        : {},
      rule: isSet(object.rule) ? globalThis.String(object.rule) : "",
    };
  },

  toJSON(message: CustomSmartAction): unknown {
    const obj: any = {};
    if (message.inputs) {
      const entries = Object.entries(message.inputs);
      if (entries.length > 0) {
        obj.inputs = {};
        entries.forEach(([k, v]) => {
          obj.inputs[k] = ActionParamValue.toJSON(v);
        });
      }
    }
    if (message.rule !== undefined && message.rule !== "") {
      obj.rule = message.rule;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomSmartAction>, I>>(base?: I): CustomSmartAction {
    return CustomSmartAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomSmartAction>, I>>(object: I): CustomSmartAction {
    const message = createBaseCustomSmartAction();
    message.inputs = Object.entries(object.inputs ?? {}).reduce<{ [key: string]: ActionParamValue }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = ActionParamValue.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.rule = object.rule ?? "";
    return message;
  },
};

messageTypeRegistry.set(CustomSmartAction.$type, CustomSmartAction);

function createBaseCustomSmartActionInputsEntry(): CustomSmartActionInputsEntry {
  return { $type: "pb.v1alpha1.CustomSmartAction.InputsEntry", key: "", value: undefined };
}

export const CustomSmartActionInputsEntry = {
  $type: "pb.v1alpha1.CustomSmartAction.InputsEntry" as const,

  encode(message: CustomSmartActionInputsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      ActionParamValue.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomSmartActionInputsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomSmartActionInputsEntry();
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

          message.value = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomSmartActionInputsEntry {
    return {
      $type: CustomSmartActionInputsEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? ActionParamValue.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: CustomSmartActionInputsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = ActionParamValue.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomSmartActionInputsEntry>, I>>(base?: I): CustomSmartActionInputsEntry {
    return CustomSmartActionInputsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomSmartActionInputsEntry>, I>>(object: I): CustomSmartActionInputsEntry {
    const message = createBaseCustomSmartActionInputsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? ActionParamValue.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CustomSmartActionInputsEntry.$type, CustomSmartActionInputsEntry);

function createBaseGetDocumentAction(): GetDocumentAction {
  return { $type: "pb.v1alpha1.GetDocumentAction", documentLocator: undefined };
}

export const GetDocumentAction = {
  $type: "pb.v1alpha1.GetDocumentAction" as const,

  encode(message: GetDocumentAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.documentLocator !== undefined) {
      ElementLocator.encode(message.documentLocator, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDocumentAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDocumentAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.documentLocator = ElementLocator.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDocumentAction {
    return {
      $type: GetDocumentAction.$type,
      documentLocator: isSet(object.documentLocator) ? ElementLocator.fromJSON(object.documentLocator) : undefined,
    };
  },

  toJSON(message: GetDocumentAction): unknown {
    const obj: any = {};
    if (message.documentLocator !== undefined) {
      obj.documentLocator = ElementLocator.toJSON(message.documentLocator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDocumentAction>, I>>(base?: I): GetDocumentAction {
    return GetDocumentAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetDocumentAction>, I>>(object: I): GetDocumentAction {
    const message = createBaseGetDocumentAction();
    message.documentLocator = (object.documentLocator !== undefined && object.documentLocator !== null)
      ? ElementLocator.fromPartial(object.documentLocator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetDocumentAction.$type, GetDocumentAction);

function createBaseGenerateTextAction(): GenerateTextAction {
  return { $type: "pb.v1alpha1.GenerateTextAction", inputs: [], prompt: "" };
}

export const GenerateTextAction = {
  $type: "pb.v1alpha1.GenerateTextAction" as const,

  encode(message: GenerateTextAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.inputs !== undefined && message.inputs.length !== 0) {
      for (const v of message.inputs) {
        ActionParamValue.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.prompt !== undefined && message.prompt !== "") {
      writer.uint32(18).string(message.prompt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateTextAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateTextAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.inputs!.push(ActionParamValue.decode(reader, reader.uint32()));
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

  fromJSON(object: any): GenerateTextAction {
    return {
      $type: GenerateTextAction.$type,
      inputs: globalThis.Array.isArray(object?.inputs)
        ? object.inputs.map((e: any) => ActionParamValue.fromJSON(e))
        : [],
      prompt: isSet(object.prompt) ? globalThis.String(object.prompt) : "",
    };
  },

  toJSON(message: GenerateTextAction): unknown {
    const obj: any = {};
    if (message.inputs?.length) {
      obj.inputs = message.inputs.map((e) => ActionParamValue.toJSON(e));
    }
    if (message.prompt !== undefined && message.prompt !== "") {
      obj.prompt = message.prompt;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateTextAction>, I>>(base?: I): GenerateTextAction {
    return GenerateTextAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateTextAction>, I>>(object: I): GenerateTextAction {
    const message = createBaseGenerateTextAction();
    message.inputs = object.inputs?.map((e) => ActionParamValue.fromPartial(e)) || [];
    message.prompt = object.prompt ?? "";
    return message;
  },
};

messageTypeRegistry.set(GenerateTextAction.$type, GenerateTextAction);

function createBaseClassifyAction(): ClassifyAction {
  return { $type: "pb.v1alpha1.ClassifyAction", inputs: [], prompt: "", preset: 0 };
}

export const ClassifyAction = {
  $type: "pb.v1alpha1.ClassifyAction" as const,

  encode(message: ClassifyAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.inputs !== undefined && message.inputs.length !== 0) {
      for (const v of message.inputs) {
        ActionParamValue.encode(v!, writer.uint32(10).fork()).ldelim();
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ClassifyAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassifyAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.inputs!.push(ActionParamValue.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ClassifyAction {
    return {
      $type: ClassifyAction.$type,
      inputs: globalThis.Array.isArray(object?.inputs)
        ? object.inputs.map((e: any) => ActionParamValue.fromJSON(e))
        : [],
      prompt: isSet(object.prompt) ? globalThis.String(object.prompt) : "",
      preset: isSet(object.preset) ? classifyClassifyPresetFromJSON(object.preset) : 0,
    };
  },

  toJSON(message: ClassifyAction): unknown {
    const obj: any = {};
    if (message.inputs?.length) {
      obj.inputs = message.inputs.map((e) => ActionParamValue.toJSON(e));
    }
    if (message.prompt !== undefined && message.prompt !== "") {
      obj.prompt = message.prompt;
    }
    if (message.preset !== undefined && message.preset !== 0) {
      obj.preset = classifyClassifyPresetToJSON(message.preset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClassifyAction>, I>>(base?: I): ClassifyAction {
    return ClassifyAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClassifyAction>, I>>(object: I): ClassifyAction {
    const message = createBaseClassifyAction();
    message.inputs = object.inputs?.map((e) => ActionParamValue.fromPartial(e)) || [];
    message.prompt = object.prompt ?? "";
    message.preset = object.preset ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ClassifyAction.$type, ClassifyAction);

function createBaseSendEmailAction(): SendEmailAction {
  return { $type: "pb.v1alpha1.SendEmailAction", recipients: [], subject: undefined, body: undefined, attachments: [] };
}

export const SendEmailAction = {
  $type: "pb.v1alpha1.SendEmailAction" as const,

  encode(message: SendEmailAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipients !== undefined && message.recipients.length !== 0) {
      for (const v of message.recipients) {
        ActionParamValue.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.subject !== undefined) {
      ActionParamValue.encode(message.subject, writer.uint32(18).fork()).ldelim();
    }
    if (message.body !== undefined) {
      SendEmailActionBody.encode(message.body, writer.uint32(26).fork()).ldelim();
    }
    if (message.attachments !== undefined && message.attachments.length !== 0) {
      for (const v of message.attachments) {
        SendEmailActionAttachment.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendEmailAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendEmailAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.recipients!.push(ActionParamValue.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.subject = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.body = SendEmailActionBody.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.attachments!.push(SendEmailActionAttachment.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendEmailAction {
    return {
      $type: SendEmailAction.$type,
      recipients: globalThis.Array.isArray(object?.recipients)
        ? object.recipients.map((e: any) => ActionParamValue.fromJSON(e))
        : [],
      subject: isSet(object.subject) ? ActionParamValue.fromJSON(object.subject) : undefined,
      body: isSet(object.body) ? SendEmailActionBody.fromJSON(object.body) : undefined,
      attachments: globalThis.Array.isArray(object?.attachments)
        ? object.attachments.map((e: any) => SendEmailActionAttachment.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SendEmailAction): unknown {
    const obj: any = {};
    if (message.recipients?.length) {
      obj.recipients = message.recipients.map((e) => ActionParamValue.toJSON(e));
    }
    if (message.subject !== undefined) {
      obj.subject = ActionParamValue.toJSON(message.subject);
    }
    if (message.body !== undefined) {
      obj.body = SendEmailActionBody.toJSON(message.body);
    }
    if (message.attachments?.length) {
      obj.attachments = message.attachments.map((e) => SendEmailActionAttachment.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendEmailAction>, I>>(base?: I): SendEmailAction {
    return SendEmailAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendEmailAction>, I>>(object: I): SendEmailAction {
    const message = createBaseSendEmailAction();
    message.recipients = object.recipients?.map((e) => ActionParamValue.fromPartial(e)) || [];
    message.subject = (object.subject !== undefined && object.subject !== null)
      ? ActionParamValue.fromPartial(object.subject)
      : undefined;
    message.body = (object.body !== undefined && object.body !== null)
      ? SendEmailActionBody.fromPartial(object.body)
      : undefined;
    message.attachments = object.attachments?.map((e) => SendEmailActionAttachment.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(SendEmailAction.$type, SendEmailAction);

function createBaseSendEmailActionAttachment(): SendEmailActionAttachment {
  return { $type: "pb.v1alpha1.SendEmailAction.Attachment", filename: undefined, content: undefined };
}

export const SendEmailActionAttachment = {
  $type: "pb.v1alpha1.SendEmailAction.Attachment" as const,

  encode(message: SendEmailActionAttachment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filename !== undefined) {
      ActionParamValue.encode(message.filename, writer.uint32(10).fork()).ldelim();
    }
    if (message.content !== undefined) {
      ActionParamValue.encode(message.content, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendEmailActionAttachment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendEmailActionAttachment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filename = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.content = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendEmailActionAttachment {
    return {
      $type: SendEmailActionAttachment.$type,
      filename: isSet(object.filename) ? ActionParamValue.fromJSON(object.filename) : undefined,
      content: isSet(object.content) ? ActionParamValue.fromJSON(object.content) : undefined,
    };
  },

  toJSON(message: SendEmailActionAttachment): unknown {
    const obj: any = {};
    if (message.filename !== undefined) {
      obj.filename = ActionParamValue.toJSON(message.filename);
    }
    if (message.content !== undefined) {
      obj.content = ActionParamValue.toJSON(message.content);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendEmailActionAttachment>, I>>(base?: I): SendEmailActionAttachment {
    return SendEmailActionAttachment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendEmailActionAttachment>, I>>(object: I): SendEmailActionAttachment {
    const message = createBaseSendEmailActionAttachment();
    message.filename = (object.filename !== undefined && object.filename !== null)
      ? ActionParamValue.fromPartial(object.filename)
      : undefined;
    message.content = (object.content !== undefined && object.content !== null)
      ? ActionParamValue.fromPartial(object.content)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SendEmailActionAttachment.$type, SendEmailActionAttachment);

function createBaseSendEmailActionBody(): SendEmailActionBody {
  return { $type: "pb.v1alpha1.SendEmailAction.Body", plain: undefined, html: undefined };
}

export const SendEmailActionBody = {
  $type: "pb.v1alpha1.SendEmailAction.Body" as const,

  encode(message: SendEmailActionBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.plain !== undefined) {
      ActionParamValue.encode(message.plain, writer.uint32(10).fork()).ldelim();
    }
    if (message.html !== undefined) {
      ActionParamValue.encode(message.html, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendEmailActionBody {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendEmailActionBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.plain = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.html = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendEmailActionBody {
    return {
      $type: SendEmailActionBody.$type,
      plain: isSet(object.plain) ? ActionParamValue.fromJSON(object.plain) : undefined,
      html: isSet(object.html) ? ActionParamValue.fromJSON(object.html) : undefined,
    };
  },

  toJSON(message: SendEmailActionBody): unknown {
    const obj: any = {};
    if (message.plain !== undefined) {
      obj.plain = ActionParamValue.toJSON(message.plain);
    }
    if (message.html !== undefined) {
      obj.html = ActionParamValue.toJSON(message.html);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendEmailActionBody>, I>>(base?: I): SendEmailActionBody {
    return SendEmailActionBody.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendEmailActionBody>, I>>(object: I): SendEmailActionBody {
    const message = createBaseSendEmailActionBody();
    message.plain = (object.plain !== undefined && object.plain !== null)
      ? ActionParamValue.fromPartial(object.plain)
      : undefined;
    message.html = (object.html !== undefined && object.html !== null)
      ? ActionParamValue.fromPartial(object.html)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SendEmailActionBody.$type, SendEmailActionBody);

function createBaseGetPasscodeAction(): GetPasscodeAction {
  return { $type: "pb.v1alpha1.GetPasscodeAction", totp: undefined, hotp: undefined, sms: undefined };
}

export const GetPasscodeAction = {
  $type: "pb.v1alpha1.GetPasscodeAction" as const,

  encode(message: GetPasscodeAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totp !== undefined) {
      GetPasscodeActionTotp.encode(message.totp, writer.uint32(10).fork()).ldelim();
    }
    if (message.hotp !== undefined) {
      GetPasscodeActionHotp.encode(message.hotp, writer.uint32(18).fork()).ldelim();
    }
    if (message.sms !== undefined) {
      GetPasscodeActionSms.encode(message.sms, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPasscodeAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPasscodeAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.totp = GetPasscodeActionTotp.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.hotp = GetPasscodeActionHotp.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sms = GetPasscodeActionSms.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetPasscodeAction {
    return {
      $type: GetPasscodeAction.$type,
      totp: isSet(object.totp) ? GetPasscodeActionTotp.fromJSON(object.totp) : undefined,
      hotp: isSet(object.hotp) ? GetPasscodeActionHotp.fromJSON(object.hotp) : undefined,
      sms: isSet(object.sms) ? GetPasscodeActionSms.fromJSON(object.sms) : undefined,
    };
  },

  toJSON(message: GetPasscodeAction): unknown {
    const obj: any = {};
    if (message.totp !== undefined) {
      obj.totp = GetPasscodeActionTotp.toJSON(message.totp);
    }
    if (message.hotp !== undefined) {
      obj.hotp = GetPasscodeActionHotp.toJSON(message.hotp);
    }
    if (message.sms !== undefined) {
      obj.sms = GetPasscodeActionSms.toJSON(message.sms);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPasscodeAction>, I>>(base?: I): GetPasscodeAction {
    return GetPasscodeAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPasscodeAction>, I>>(object: I): GetPasscodeAction {
    const message = createBaseGetPasscodeAction();
    message.totp = (object.totp !== undefined && object.totp !== null)
      ? GetPasscodeActionTotp.fromPartial(object.totp)
      : undefined;
    message.hotp = (object.hotp !== undefined && object.hotp !== null)
      ? GetPasscodeActionHotp.fromPartial(object.hotp)
      : undefined;
    message.sms = (object.sms !== undefined && object.sms !== null)
      ? GetPasscodeActionSms.fromPartial(object.sms)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetPasscodeAction.$type, GetPasscodeAction);

function createBaseGetPasscodeActionTotp(): GetPasscodeActionTotp {
  return { $type: "pb.v1alpha1.GetPasscodeAction.Totp", secret: undefined, algorithm: 0, digits: 0 };
}

export const GetPasscodeActionTotp = {
  $type: "pb.v1alpha1.GetPasscodeAction.Totp" as const,

  encode(message: GetPasscodeActionTotp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.secret !== undefined) {
      ActionParamValue.encode(message.secret, writer.uint32(10).fork()).ldelim();
    }
    if (message.algorithm !== undefined && message.algorithm !== 0) {
      writer.uint32(16).int32(message.algorithm);
    }
    if (message.digits !== undefined && message.digits !== 0) {
      writer.uint32(24).int32(message.digits);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPasscodeActionTotp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPasscodeActionTotp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.secret = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.algorithm = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.digits = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetPasscodeActionTotp {
    return {
      $type: GetPasscodeActionTotp.$type,
      secret: isSet(object.secret) ? ActionParamValue.fromJSON(object.secret) : undefined,
      algorithm: isSet(object.algorithm) ? getPasscodeActionOtpAlgorithmFromJSON(object.algorithm) : 0,
      digits: isSet(object.digits) ? globalThis.Number(object.digits) : 0,
    };
  },

  toJSON(message: GetPasscodeActionTotp): unknown {
    const obj: any = {};
    if (message.secret !== undefined) {
      obj.secret = ActionParamValue.toJSON(message.secret);
    }
    if (message.algorithm !== undefined && message.algorithm !== 0) {
      obj.algorithm = getPasscodeActionOtpAlgorithmToJSON(message.algorithm);
    }
    if (message.digits !== undefined && message.digits !== 0) {
      obj.digits = Math.round(message.digits);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPasscodeActionTotp>, I>>(base?: I): GetPasscodeActionTotp {
    return GetPasscodeActionTotp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPasscodeActionTotp>, I>>(object: I): GetPasscodeActionTotp {
    const message = createBaseGetPasscodeActionTotp();
    message.secret = (object.secret !== undefined && object.secret !== null)
      ? ActionParamValue.fromPartial(object.secret)
      : undefined;
    message.algorithm = object.algorithm ?? 0;
    message.digits = object.digits ?? 0;
    return message;
  },
};

messageTypeRegistry.set(GetPasscodeActionTotp.$type, GetPasscodeActionTotp);

function createBaseGetPasscodeActionHotp(): GetPasscodeActionHotp {
  return { $type: "pb.v1alpha1.GetPasscodeAction.Hotp", secret: undefined, algorithm: 0, digits: 0, counter: 0 };
}

export const GetPasscodeActionHotp = {
  $type: "pb.v1alpha1.GetPasscodeAction.Hotp" as const,

  encode(message: GetPasscodeActionHotp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.secret !== undefined) {
      ActionParamValue.encode(message.secret, writer.uint32(10).fork()).ldelim();
    }
    if (message.algorithm !== undefined && message.algorithm !== 0) {
      writer.uint32(16).int32(message.algorithm);
    }
    if (message.digits !== undefined && message.digits !== 0) {
      writer.uint32(24).int32(message.digits);
    }
    if (message.counter !== undefined && message.counter !== 0) {
      writer.uint32(32).int32(message.counter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPasscodeActionHotp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPasscodeActionHotp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.secret = ActionParamValue.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.algorithm = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.digits = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.counter = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetPasscodeActionHotp {
    return {
      $type: GetPasscodeActionHotp.$type,
      secret: isSet(object.secret) ? ActionParamValue.fromJSON(object.secret) : undefined,
      algorithm: isSet(object.algorithm) ? getPasscodeActionOtpAlgorithmFromJSON(object.algorithm) : 0,
      digits: isSet(object.digits) ? globalThis.Number(object.digits) : 0,
      counter: isSet(object.counter) ? globalThis.Number(object.counter) : 0,
    };
  },

  toJSON(message: GetPasscodeActionHotp): unknown {
    const obj: any = {};
    if (message.secret !== undefined) {
      obj.secret = ActionParamValue.toJSON(message.secret);
    }
    if (message.algorithm !== undefined && message.algorithm !== 0) {
      obj.algorithm = getPasscodeActionOtpAlgorithmToJSON(message.algorithm);
    }
    if (message.digits !== undefined && message.digits !== 0) {
      obj.digits = Math.round(message.digits);
    }
    if (message.counter !== undefined && message.counter !== 0) {
      obj.counter = Math.round(message.counter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPasscodeActionHotp>, I>>(base?: I): GetPasscodeActionHotp {
    return GetPasscodeActionHotp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPasscodeActionHotp>, I>>(object: I): GetPasscodeActionHotp {
    const message = createBaseGetPasscodeActionHotp();
    message.secret = (object.secret !== undefined && object.secret !== null)
      ? ActionParamValue.fromPartial(object.secret)
      : undefined;
    message.algorithm = object.algorithm ?? 0;
    message.digits = object.digits ?? 0;
    message.counter = object.counter ?? 0;
    return message;
  },
};

messageTypeRegistry.set(GetPasscodeActionHotp.$type, GetPasscodeActionHotp);

function createBaseGetPasscodeActionSms(): GetPasscodeActionSms {
  return { $type: "pb.v1alpha1.GetPasscodeAction.Sms", phoneNumber: "" };
}

export const GetPasscodeActionSms = {
  $type: "pb.v1alpha1.GetPasscodeAction.Sms" as const,

  encode(message: GetPasscodeActionSms, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phoneNumber !== undefined && message.phoneNumber !== "") {
      writer.uint32(10).string(message.phoneNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPasscodeActionSms {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPasscodeActionSms();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.phoneNumber = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetPasscodeActionSms {
    return {
      $type: GetPasscodeActionSms.$type,
      phoneNumber: isSet(object.phoneNumber) ? globalThis.String(object.phoneNumber) : "",
    };
  },

  toJSON(message: GetPasscodeActionSms): unknown {
    const obj: any = {};
    if (message.phoneNumber !== undefined && message.phoneNumber !== "") {
      obj.phoneNumber = message.phoneNumber;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPasscodeActionSms>, I>>(base?: I): GetPasscodeActionSms {
    return GetPasscodeActionSms.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPasscodeActionSms>, I>>(object: I): GetPasscodeActionSms {
    const message = createBaseGetPasscodeActionSms();
    message.phoneNumber = object.phoneNumber ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetPasscodeActionSms.$type, GetPasscodeActionSms);

function createBaseScrollAction(): ScrollAction {
  return { $type: "pb.v1alpha1.ScrollAction", scrollBy: undefined, scrollTo: undefined, container: undefined };
}

export const ScrollAction = {
  $type: "pb.v1alpha1.ScrollAction" as const,

  encode(message: ScrollAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scrollBy !== undefined) {
      ScrollActionScrollBy.encode(message.scrollBy, writer.uint32(10).fork()).ldelim();
    }
    if (message.scrollTo !== undefined) {
      ScrollActionScrollTo.encode(message.scrollTo, writer.uint32(18).fork()).ldelim();
    }
    if (message.container !== undefined) {
      ActionParamValue.encode(message.container, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScrollAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScrollAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scrollBy = ScrollActionScrollBy.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.scrollTo = ScrollActionScrollTo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.container = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScrollAction {
    return {
      $type: ScrollAction.$type,
      scrollBy: isSet(object.scrollBy) ? ScrollActionScrollBy.fromJSON(object.scrollBy) : undefined,
      scrollTo: isSet(object.scrollTo) ? ScrollActionScrollTo.fromJSON(object.scrollTo) : undefined,
      container: isSet(object.container) ? ActionParamValue.fromJSON(object.container) : undefined,
    };
  },

  toJSON(message: ScrollAction): unknown {
    const obj: any = {};
    if (message.scrollBy !== undefined) {
      obj.scrollBy = ScrollActionScrollBy.toJSON(message.scrollBy);
    }
    if (message.scrollTo !== undefined) {
      obj.scrollTo = ScrollActionScrollTo.toJSON(message.scrollTo);
    }
    if (message.container !== undefined) {
      obj.container = ActionParamValue.toJSON(message.container);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ScrollAction>, I>>(base?: I): ScrollAction {
    return ScrollAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScrollAction>, I>>(object: I): ScrollAction {
    const message = createBaseScrollAction();
    message.scrollBy = (object.scrollBy !== undefined && object.scrollBy !== null)
      ? ScrollActionScrollBy.fromPartial(object.scrollBy)
      : undefined;
    message.scrollTo = (object.scrollTo !== undefined && object.scrollTo !== null)
      ? ScrollActionScrollTo.fromPartial(object.scrollTo)
      : undefined;
    message.container = (object.container !== undefined && object.container !== null)
      ? ActionParamValue.fromPartial(object.container)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ScrollAction.$type, ScrollAction);

function createBaseScrollActionScrollBy(): ScrollActionScrollBy {
  return { $type: "pb.v1alpha1.ScrollAction.ScrollBy", x: 0, y: 0 };
}

export const ScrollActionScrollBy = {
  $type: "pb.v1alpha1.ScrollAction.ScrollBy" as const,

  encode(message: ScrollActionScrollBy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== undefined && message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== undefined && message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScrollActionScrollBy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScrollActionScrollBy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.x = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.y = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScrollActionScrollBy {
    return {
      $type: ScrollActionScrollBy.$type,
      x: isSet(object.x) ? globalThis.Number(object.x) : 0,
      y: isSet(object.y) ? globalThis.Number(object.y) : 0,
    };
  },

  toJSON(message: ScrollActionScrollBy): unknown {
    const obj: any = {};
    if (message.x !== undefined && message.x !== 0) {
      obj.x = message.x;
    }
    if (message.y !== undefined && message.y !== 0) {
      obj.y = message.y;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ScrollActionScrollBy>, I>>(base?: I): ScrollActionScrollBy {
    return ScrollActionScrollBy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScrollActionScrollBy>, I>>(object: I): ScrollActionScrollBy {
    const message = createBaseScrollActionScrollBy();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ScrollActionScrollBy.$type, ScrollActionScrollBy);

function createBaseScrollActionScrollTo(): ScrollActionScrollTo {
  return { $type: "pb.v1alpha1.ScrollAction.ScrollTo", position: undefined, preset: undefined };
}

export const ScrollActionScrollTo = {
  $type: "pb.v1alpha1.ScrollAction.ScrollTo" as const,

  encode(message: ScrollActionScrollTo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.position !== undefined) {
      ScrollActionScrollToPosition.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (message.preset !== undefined) {
      writer.uint32(16).int32(message.preset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScrollActionScrollTo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScrollActionScrollTo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.position = ScrollActionScrollToPosition.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
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

  fromJSON(object: any): ScrollActionScrollTo {
    return {
      $type: ScrollActionScrollTo.$type,
      position: isSet(object.position) ? ScrollActionScrollToPosition.fromJSON(object.position) : undefined,
      preset: isSet(object.preset) ? scrollActionScrollToPresetPositionFromJSON(object.preset) : undefined,
    };
  },

  toJSON(message: ScrollActionScrollTo): unknown {
    const obj: any = {};
    if (message.position !== undefined) {
      obj.position = ScrollActionScrollToPosition.toJSON(message.position);
    }
    if (message.preset !== undefined) {
      obj.preset = scrollActionScrollToPresetPositionToJSON(message.preset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ScrollActionScrollTo>, I>>(base?: I): ScrollActionScrollTo {
    return ScrollActionScrollTo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScrollActionScrollTo>, I>>(object: I): ScrollActionScrollTo {
    const message = createBaseScrollActionScrollTo();
    message.position = (object.position !== undefined && object.position !== null)
      ? ScrollActionScrollToPosition.fromPartial(object.position)
      : undefined;
    message.preset = object.preset ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(ScrollActionScrollTo.$type, ScrollActionScrollTo);

function createBaseScrollActionScrollToPosition(): ScrollActionScrollToPosition {
  return { $type: "pb.v1alpha1.ScrollAction.ScrollTo.Position", x: 0, y: 0 };
}

export const ScrollActionScrollToPosition = {
  $type: "pb.v1alpha1.ScrollAction.ScrollTo.Position" as const,

  encode(message: ScrollActionScrollToPosition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== undefined && message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== undefined && message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScrollActionScrollToPosition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScrollActionScrollToPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.x = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.y = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScrollActionScrollToPosition {
    return {
      $type: ScrollActionScrollToPosition.$type,
      x: isSet(object.x) ? globalThis.Number(object.x) : 0,
      y: isSet(object.y) ? globalThis.Number(object.y) : 0,
    };
  },

  toJSON(message: ScrollActionScrollToPosition): unknown {
    const obj: any = {};
    if (message.x !== undefined && message.x !== 0) {
      obj.x = message.x;
    }
    if (message.y !== undefined && message.y !== 0) {
      obj.y = message.y;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ScrollActionScrollToPosition>, I>>(base?: I): ScrollActionScrollToPosition {
    return ScrollActionScrollToPosition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScrollActionScrollToPosition>, I>>(object: I): ScrollActionScrollToPosition {
    const message = createBaseScrollActionScrollToPosition();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ScrollActionScrollToPosition.$type, ScrollActionScrollToPosition);

function createBaseFocusAction(): FocusAction {
  return { $type: "pb.v1alpha1.FocusAction", element: undefined };
}

export const FocusAction = {
  $type: "pb.v1alpha1.FocusAction" as const,

  encode(message: FocusAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.element !== undefined) {
      ActionParamValue.encode(message.element, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FocusAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFocusAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 26) {
            break;
          }

          message.element = ActionParamValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FocusAction {
    return {
      $type: FocusAction.$type,
      element: isSet(object.element) ? ActionParamValue.fromJSON(object.element) : undefined,
    };
  },

  toJSON(message: FocusAction): unknown {
    const obj: any = {};
    if (message.element !== undefined) {
      obj.element = ActionParamValue.toJSON(message.element);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FocusAction>, I>>(base?: I): FocusAction {
    return FocusAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FocusAction>, I>>(object: I): FocusAction {
    const message = createBaseFocusAction();
    message.element = (object.element !== undefined && object.element !== null)
      ? ActionParamValue.fromPartial(object.element)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(FocusAction.$type, FocusAction);

function createBaseMacroAction(): MacroAction {
  return { $type: "pb.v1alpha1.MacroAction", login: undefined, generic: undefined };
}

export const MacroAction = {
  $type: "pb.v1alpha1.MacroAction" as const,

  encode(message: MacroAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== undefined) {
      MacroActionLogin.encode(message.login, writer.uint32(10).fork()).ldelim();
    }
    if (message.generic !== undefined) {
      MacroActionGeneric.encode(message.generic, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MacroAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMacroAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.login = MacroActionLogin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.generic = MacroActionGeneric.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MacroAction {
    return {
      $type: MacroAction.$type,
      login: isSet(object.login) ? MacroActionLogin.fromJSON(object.login) : undefined,
      generic: isSet(object.generic) ? MacroActionGeneric.fromJSON(object.generic) : undefined,
    };
  },

  toJSON(message: MacroAction): unknown {
    const obj: any = {};
    if (message.login !== undefined) {
      obj.login = MacroActionLogin.toJSON(message.login);
    }
    if (message.generic !== undefined) {
      obj.generic = MacroActionGeneric.toJSON(message.generic);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MacroAction>, I>>(base?: I): MacroAction {
    return MacroAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MacroAction>, I>>(object: I): MacroAction {
    const message = createBaseMacroAction();
    message.login = (object.login !== undefined && object.login !== null)
      ? MacroActionLogin.fromPartial(object.login)
      : undefined;
    message.generic = (object.generic !== undefined && object.generic !== null)
      ? MacroActionGeneric.fromPartial(object.generic)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(MacroAction.$type, MacroAction);

function createBaseMacroActionLogin(): MacroActionLogin {
  return { $type: "pb.v1alpha1.MacroActionLogin", origin: undefined, secretBlockId: undefined, passcodeActions: [] };
}

export const MacroActionLogin = {
  $type: "pb.v1alpha1.MacroActionLogin" as const,

  encode(message: MacroActionLogin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.origin !== undefined) {
      writer.uint32(10).string(message.origin);
    }
    if (message.secretBlockId !== undefined) {
      writer.uint32(18).string(message.secretBlockId);
    }
    if (message.passcodeActions !== undefined && message.passcodeActions.length !== 0) {
      for (const v of message.passcodeActions) {
        GetPasscodeAction.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MacroActionLogin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMacroActionLogin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.origin = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.secretBlockId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.passcodeActions!.push(GetPasscodeAction.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MacroActionLogin {
    return {
      $type: MacroActionLogin.$type,
      origin: isSet(object.origin) ? globalThis.String(object.origin) : undefined,
      secretBlockId: isSet(object.secretBlockId) ? globalThis.String(object.secretBlockId) : undefined,
      passcodeActions: globalThis.Array.isArray(object?.passcodeActions)
        ? object.passcodeActions.map((e: any) => GetPasscodeAction.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MacroActionLogin): unknown {
    const obj: any = {};
    if (message.origin !== undefined) {
      obj.origin = message.origin;
    }
    if (message.secretBlockId !== undefined) {
      obj.secretBlockId = message.secretBlockId;
    }
    if (message.passcodeActions?.length) {
      obj.passcodeActions = message.passcodeActions.map((e) => GetPasscodeAction.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MacroActionLogin>, I>>(base?: I): MacroActionLogin {
    return MacroActionLogin.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MacroActionLogin>, I>>(object: I): MacroActionLogin {
    const message = createBaseMacroActionLogin();
    message.origin = object.origin ?? undefined;
    message.secretBlockId = object.secretBlockId ?? undefined;
    message.passcodeActions = object.passcodeActions?.map((e) => GetPasscodeAction.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(MacroActionLogin.$type, MacroActionLogin);

function createBaseMacroActionGeneric(): MacroActionGeneric {
  return { $type: "pb.v1alpha1.MacroActionGeneric", instruction: "", instructionVariables: [] };
}

export const MacroActionGeneric = {
  $type: "pb.v1alpha1.MacroActionGeneric" as const,

  encode(message: MacroActionGeneric, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instruction !== undefined && message.instruction !== "") {
      writer.uint32(10).string(message.instruction);
    }
    if (message.instructionVariables !== undefined && message.instructionVariables.length !== 0) {
      for (const v of message.instructionVariables) {
        ActionParamValue.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MacroActionGeneric {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMacroActionGeneric();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instruction = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.instructionVariables!.push(ActionParamValue.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MacroActionGeneric {
    return {
      $type: MacroActionGeneric.$type,
      instruction: isSet(object.instruction) ? globalThis.String(object.instruction) : "",
      instructionVariables: globalThis.Array.isArray(object?.instructionVariables)
        ? object.instructionVariables.map((e: any) => ActionParamValue.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MacroActionGeneric): unknown {
    const obj: any = {};
    if (message.instruction !== undefined && message.instruction !== "") {
      obj.instruction = message.instruction;
    }
    if (message.instructionVariables?.length) {
      obj.instructionVariables = message.instructionVariables.map((e) => ActionParamValue.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MacroActionGeneric>, I>>(base?: I): MacroActionGeneric {
    return MacroActionGeneric.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MacroActionGeneric>, I>>(object: I): MacroActionGeneric {
    const message = createBaseMacroActionGeneric();
    message.instruction = object.instruction ?? "";
    message.instructionVariables = object.instructionVariables?.map((e) => ActionParamValue.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(MacroActionGeneric.$type, MacroActionGeneric);

function createBaseMacroActionExecution(): MacroActionExecution {
  return {
    $type: "pb.v1alpha1.MacroActionExecution",
    action: undefined,
    errorType: 0,
    errorMessage: "",
    macroActionContext: undefined,
    macroActionStep: undefined,
  };
}

export const MacroActionExecution = {
  $type: "pb.v1alpha1.MacroActionExecution" as const,

  encode(message: MacroActionExecution, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    if (message.errorType !== undefined && message.errorType !== 0) {
      writer.uint32(16).int32(message.errorType);
    }
    if (message.errorMessage !== undefined && message.errorMessage !== "") {
      writer.uint32(26).string(message.errorMessage);
    }
    if (message.macroActionContext !== undefined) {
      MacroActionInferContext.encode(message.macroActionContext, writer.uint32(42).fork()).ldelim();
    }
    if (message.macroActionStep !== undefined) {
      MacroActionStep.encode(message.macroActionStep, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MacroActionExecution {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMacroActionExecution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.action = Action.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.errorType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.errorMessage = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.macroActionContext = MacroActionInferContext.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.macroActionStep = MacroActionStep.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MacroActionExecution {
    return {
      $type: MacroActionExecution.$type,
      action: isSet(object.action) ? Action.fromJSON(object.action) : undefined,
      errorType: isSet(object.errorType) ? macroActionExecutionErrorFromJSON(object.errorType) : 0,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : "",
      macroActionContext: isSet(object.macroActionContext)
        ? MacroActionInferContext.fromJSON(object.macroActionContext)
        : undefined,
      macroActionStep: isSet(object.macroActionStep) ? MacroActionStep.fromJSON(object.macroActionStep) : undefined,
    };
  },

  toJSON(message: MacroActionExecution): unknown {
    const obj: any = {};
    if (message.action !== undefined) {
      obj.action = Action.toJSON(message.action);
    }
    if (message.errorType !== undefined && message.errorType !== 0) {
      obj.errorType = macroActionExecutionErrorToJSON(message.errorType);
    }
    if (message.errorMessage !== undefined && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    if (message.macroActionContext !== undefined) {
      obj.macroActionContext = MacroActionInferContext.toJSON(message.macroActionContext);
    }
    if (message.macroActionStep !== undefined) {
      obj.macroActionStep = MacroActionStep.toJSON(message.macroActionStep);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MacroActionExecution>, I>>(base?: I): MacroActionExecution {
    return MacroActionExecution.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MacroActionExecution>, I>>(object: I): MacroActionExecution {
    const message = createBaseMacroActionExecution();
    message.action = (object.action !== undefined && object.action !== null)
      ? Action.fromPartial(object.action)
      : undefined;
    message.errorType = object.errorType ?? 0;
    message.errorMessage = object.errorMessage ?? "";
    message.macroActionContext = (object.macroActionContext !== undefined && object.macroActionContext !== null)
      ? MacroActionInferContext.fromPartial(object.macroActionContext)
      : undefined;
    message.macroActionStep = (object.macroActionStep !== undefined && object.macroActionStep !== null)
      ? MacroActionStep.fromPartial(object.macroActionStep)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(MacroActionExecution.$type, MacroActionExecution);

function createBaseMacroActionInferContext(): MacroActionInferContext {
  return { $type: "pb.v1alpha1.MacroActionInferContext", uiState: undefined };
}

export const MacroActionInferContext = {
  $type: "pb.v1alpha1.MacroActionInferContext" as const,

  encode(message: MacroActionInferContext, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uiState !== undefined) {
      UiState.encode(message.uiState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MacroActionInferContext {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMacroActionInferContext();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uiState = UiState.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MacroActionInferContext {
    return {
      $type: MacroActionInferContext.$type,
      uiState: isSet(object.uiState) ? UiState.fromJSON(object.uiState) : undefined,
    };
  },

  toJSON(message: MacroActionInferContext): unknown {
    const obj: any = {};
    if (message.uiState !== undefined) {
      obj.uiState = UiState.toJSON(message.uiState);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MacroActionInferContext>, I>>(base?: I): MacroActionInferContext {
    return MacroActionInferContext.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MacroActionInferContext>, I>>(object: I): MacroActionInferContext {
    const message = createBaseMacroActionInferContext();
    message.uiState = (object.uiState !== undefined && object.uiState !== null)
      ? UiState.fromPartial(object.uiState)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(MacroActionInferContext.$type, MacroActionInferContext);

function createBaseMacroActionStep(): MacroActionStep {
  return {
    $type: "pb.v1alpha1.MacroActionStep",
    action: undefined,
    success: undefined,
    error: undefined,
    debugInfo: undefined,
  };
}

export const MacroActionStep = {
  $type: "pb.v1alpha1.MacroActionStep" as const,

  encode(message: MacroActionStep, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    if (message.success !== undefined) {
      MacroActionStepSuccess.encode(message.success, writer.uint32(18).fork()).ldelim();
    }
    if (message.error !== undefined) {
      MacroActionStepError.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    if (message.debugInfo !== undefined) {
      MacroActionStepDebugInfo.encode(message.debugInfo, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MacroActionStep {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMacroActionStep();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.action = Action.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.success = MacroActionStepSuccess.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.error = MacroActionStepError.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.debugInfo = MacroActionStepDebugInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MacroActionStep {
    return {
      $type: MacroActionStep.$type,
      action: isSet(object.action) ? Action.fromJSON(object.action) : undefined,
      success: isSet(object.success) ? MacroActionStepSuccess.fromJSON(object.success) : undefined,
      error: isSet(object.error) ? MacroActionStepError.fromJSON(object.error) : undefined,
      debugInfo: isSet(object.debugInfo) ? MacroActionStepDebugInfo.fromJSON(object.debugInfo) : undefined,
    };
  },

  toJSON(message: MacroActionStep): unknown {
    const obj: any = {};
    if (message.action !== undefined) {
      obj.action = Action.toJSON(message.action);
    }
    if (message.success !== undefined) {
      obj.success = MacroActionStepSuccess.toJSON(message.success);
    }
    if (message.error !== undefined) {
      obj.error = MacroActionStepError.toJSON(message.error);
    }
    if (message.debugInfo !== undefined) {
      obj.debugInfo = MacroActionStepDebugInfo.toJSON(message.debugInfo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MacroActionStep>, I>>(base?: I): MacroActionStep {
    return MacroActionStep.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MacroActionStep>, I>>(object: I): MacroActionStep {
    const message = createBaseMacroActionStep();
    message.action = (object.action !== undefined && object.action !== null)
      ? Action.fromPartial(object.action)
      : undefined;
    message.success = (object.success !== undefined && object.success !== null)
      ? MacroActionStepSuccess.fromPartial(object.success)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? MacroActionStepError.fromPartial(object.error)
      : undefined;
    message.debugInfo = (object.debugInfo !== undefined && object.debugInfo !== null)
      ? MacroActionStepDebugInfo.fromPartial(object.debugInfo)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(MacroActionStep.$type, MacroActionStep);

function createBaseMacroActionStepSuccess(): MacroActionStepSuccess {
  return { $type: "pb.v1alpha1.MacroActionStep.Success" };
}

export const MacroActionStepSuccess = {
  $type: "pb.v1alpha1.MacroActionStep.Success" as const,

  encode(_: MacroActionStepSuccess, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MacroActionStepSuccess {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMacroActionStepSuccess();
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

  fromJSON(_: any): MacroActionStepSuccess {
    return { $type: MacroActionStepSuccess.$type };
  },

  toJSON(_: MacroActionStepSuccess): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MacroActionStepSuccess>, I>>(base?: I): MacroActionStepSuccess {
    return MacroActionStepSuccess.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MacroActionStepSuccess>, I>>(_: I): MacroActionStepSuccess {
    const message = createBaseMacroActionStepSuccess();
    return message;
  },
};

messageTypeRegistry.set(MacroActionStepSuccess.$type, MacroActionStepSuccess);

function createBaseMacroActionStepError(): MacroActionStepError {
  return { $type: "pb.v1alpha1.MacroActionStep.Error", type: 0, message: "" };
}

export const MacroActionStepError = {
  $type: "pb.v1alpha1.MacroActionStep.Error" as const,

  encode(message: MacroActionStepError, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MacroActionStepError {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMacroActionStepError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): MacroActionStepError {
    return {
      $type: MacroActionStepError.$type,
      type: isSet(object.type) ? macroActionStepTerminateActionErrorTypeFromJSON(object.type) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: MacroActionStepError): unknown {
    const obj: any = {};
    if (message.type !== undefined && message.type !== 0) {
      obj.type = macroActionStepTerminateActionErrorTypeToJSON(message.type);
    }
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MacroActionStepError>, I>>(base?: I): MacroActionStepError {
    return MacroActionStepError.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MacroActionStepError>, I>>(object: I): MacroActionStepError {
    const message = createBaseMacroActionStepError();
    message.type = object.type ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

messageTypeRegistry.set(MacroActionStepError.$type, MacroActionStepError);

function createBaseMacroActionStepDebugInfo(): MacroActionStepDebugInfo {
  return { $type: "pb.v1alpha1.MacroActionStep.DebugInfo", llmResponse: "" };
}

export const MacroActionStepDebugInfo = {
  $type: "pb.v1alpha1.MacroActionStep.DebugInfo" as const,

  encode(message: MacroActionStepDebugInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.llmResponse !== undefined && message.llmResponse !== "") {
      writer.uint32(10).string(message.llmResponse);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MacroActionStepDebugInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMacroActionStepDebugInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.llmResponse = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MacroActionStepDebugInfo {
    return {
      $type: MacroActionStepDebugInfo.$type,
      llmResponse: isSet(object.llmResponse) ? globalThis.String(object.llmResponse) : "",
    };
  },

  toJSON(message: MacroActionStepDebugInfo): unknown {
    const obj: any = {};
    if (message.llmResponse !== undefined && message.llmResponse !== "") {
      obj.llmResponse = message.llmResponse;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MacroActionStepDebugInfo>, I>>(base?: I): MacroActionStepDebugInfo {
    return MacroActionStepDebugInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MacroActionStepDebugInfo>, I>>(object: I): MacroActionStepDebugInfo {
    const message = createBaseMacroActionStepDebugInfo();
    message.llmResponse = object.llmResponse ?? "";
    return message;
  },
};

messageTypeRegistry.set(MacroActionStepDebugInfo.$type, MacroActionStepDebugInfo);

function createBaseUserEvent(): UserEvent {
  return {
    $type: "pb.v1alpha1.UserEvent",
    userId: "",
    userAgent: "",
    url: "",
    windowId: 0,
    sessionId: "",
    tabId: 0,
    timestamp: undefined,
    action: undefined,
  };
}

export const UserEvent = {
  $type: "pb.v1alpha1.UserEvent" as const,

  encode(message: UserEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== undefined && message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.userAgent !== undefined && message.userAgent !== "") {
      writer.uint32(18).string(message.userAgent);
    }
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    if (message.windowId !== undefined && message.windowId !== 0) {
      writer.uint32(32).int32(message.windowId);
    }
    if (message.sessionId !== undefined && message.sessionId !== "") {
      writer.uint32(42).string(message.sessionId);
    }
    if (message.tabId !== undefined && message.tabId !== 0) {
      writer.uint32(48).int32(message.tabId);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(58).fork()).ldelim();
    }
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserEvent();
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

          message.userAgent = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.url = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.windowId = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.tabId = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.action = Action.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserEvent {
    return {
      $type: UserEvent.$type,
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      userAgent: isSet(object.userAgent) ? globalThis.String(object.userAgent) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      windowId: isSet(object.windowId) ? globalThis.Number(object.windowId) : 0,
      sessionId: isSet(object.sessionId) ? globalThis.String(object.sessionId) : "",
      tabId: isSet(object.tabId) ? globalThis.Number(object.tabId) : 0,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      action: isSet(object.action) ? Action.fromJSON(object.action) : undefined,
    };
  },

  toJSON(message: UserEvent): unknown {
    const obj: any = {};
    if (message.userId !== undefined && message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.userAgent !== undefined && message.userAgent !== "") {
      obj.userAgent = message.userAgent;
    }
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    if (message.windowId !== undefined && message.windowId !== 0) {
      obj.windowId = Math.round(message.windowId);
    }
    if (message.sessionId !== undefined && message.sessionId !== "") {
      obj.sessionId = message.sessionId;
    }
    if (message.tabId !== undefined && message.tabId !== 0) {
      obj.tabId = Math.round(message.tabId);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.action !== undefined) {
      obj.action = Action.toJSON(message.action);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserEvent>, I>>(base?: I): UserEvent {
    return UserEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserEvent>, I>>(object: I): UserEvent {
    const message = createBaseUserEvent();
    message.userId = object.userId ?? "";
    message.userAgent = object.userAgent ?? "";
    message.url = object.url ?? "";
    message.windowId = object.windowId ?? 0;
    message.sessionId = object.sessionId ?? "";
    message.tabId = object.tabId ?? 0;
    message.timestamp = object.timestamp ?? undefined;
    message.action = (object.action !== undefined && object.action !== null)
      ? Action.fromPartial(object.action)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UserEvent.$type, UserEvent);

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
