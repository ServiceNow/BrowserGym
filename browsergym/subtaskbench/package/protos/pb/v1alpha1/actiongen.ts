/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";
import {
  Action,
  GetPasscodeAction,
  MacroActionExecutionError,
  macroActionExecutionErrorFromJSON,
  macroActionExecutionErrorToJSON,
  MacroActionInferContext,
  MacroActionStep,
} from "./orbot_action";

export const protobufPackage = "pb.v1alpha1";

export interface GenerateJsActionRequest {
  $type?: "pb.v1alpha1.GenerateJsActionRequest";
  orgId?:
    | string
    | undefined;
  /** Context of the current workflow */
  workflowContext?: string | undefined;
  userInstruction?: string | undefined;
  expectedReturnType?: GenerateJsActionRequestReturnType | undefined;
  attempts?: GenerateJsActionRequestFailedAttempt[] | undefined;
}

export enum GenerateJsActionRequestReturnType {
  UNSPECIFIED = 0,
  STRING = 1,
  BOOL = 2,
  UNRECOGNIZED = -1,
}

export function generateJsActionRequestReturnTypeFromJSON(object: any): GenerateJsActionRequestReturnType {
  switch (object) {
    case 0:
    case "RETURN_TYPE_UNSPECIFIED":
      return GenerateJsActionRequestReturnType.UNSPECIFIED;
    case 1:
    case "STRING":
      return GenerateJsActionRequestReturnType.STRING;
    case 2:
    case "BOOL":
      return GenerateJsActionRequestReturnType.BOOL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GenerateJsActionRequestReturnType.UNRECOGNIZED;
  }
}

export function generateJsActionRequestReturnTypeToJSON(object: GenerateJsActionRequestReturnType): string {
  switch (object) {
    case GenerateJsActionRequestReturnType.UNSPECIFIED:
      return "RETURN_TYPE_UNSPECIFIED";
    case GenerateJsActionRequestReturnType.STRING:
      return "STRING";
    case GenerateJsActionRequestReturnType.BOOL:
      return "BOOL";
    case GenerateJsActionRequestReturnType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GenerateJsActionRequestFailedAttempt {
  $type?: "pb.v1alpha1.GenerateJsActionRequest.FailedAttempt";
  result?: GenerateJsActionResponse | undefined;
  userInstruction?: string | undefined;
  failureType?: GenerateJsActionRequestFailedAttemptFailureType | undefined;
  failureExplanation?: string | undefined;
}

export enum GenerateJsActionRequestFailedAttemptFailureType {
  UNSPECIFIED = 0,
  SYNTAX_ERROR = 1,
  INCORRECT_BEHAVIOR = 2,
  UNRECOGNIZED = -1,
}

export function generateJsActionRequestFailedAttemptFailureTypeFromJSON(
  object: any,
): GenerateJsActionRequestFailedAttemptFailureType {
  switch (object) {
    case 0:
    case "FAILURE_TYPE_UNSPECIFIED":
      return GenerateJsActionRequestFailedAttemptFailureType.UNSPECIFIED;
    case 1:
    case "SYNTAX_ERROR":
      return GenerateJsActionRequestFailedAttemptFailureType.SYNTAX_ERROR;
    case 2:
    case "INCORRECT_BEHAVIOR":
      return GenerateJsActionRequestFailedAttemptFailureType.INCORRECT_BEHAVIOR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GenerateJsActionRequestFailedAttemptFailureType.UNRECOGNIZED;
  }
}

export function generateJsActionRequestFailedAttemptFailureTypeToJSON(
  object: GenerateJsActionRequestFailedAttemptFailureType,
): string {
  switch (object) {
    case GenerateJsActionRequestFailedAttemptFailureType.UNSPECIFIED:
      return "FAILURE_TYPE_UNSPECIFIED";
    case GenerateJsActionRequestFailedAttemptFailureType.SYNTAX_ERROR:
      return "SYNTAX_ERROR";
    case GenerateJsActionRequestFailedAttemptFailureType.INCORRECT_BEHAVIOR:
      return "INCORRECT_BEHAVIOR";
    case GenerateJsActionRequestFailedAttemptFailureType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GenerateJsActionResponse {
  $type?: "pb.v1alpha1.GenerateJsActionResponse";
  generatedFunction?: string | undefined;
  queryParameters?: GenerateJsActionResponseQueryParameters | undefined;
  error?: GenerateJsActionResponseGenerateJSFunctionError | undefined;
}

export enum GenerateJsActionResponseGenerateJSFunctionError {
  ERROR_TYPE_UNSPECIFIED = 0,
  INTERNAL_ERROR = 1,
  RATE_LIMIT_ERROR = 2,
  UNRECOGNIZED = -1,
}

export function generateJsActionResponseGenerateJSFunctionErrorFromJSON(
  object: any,
): GenerateJsActionResponseGenerateJSFunctionError {
  switch (object) {
    case 0:
    case "ERROR_TYPE_UNSPECIFIED":
      return GenerateJsActionResponseGenerateJSFunctionError.ERROR_TYPE_UNSPECIFIED;
    case 1:
    case "INTERNAL_ERROR":
      return GenerateJsActionResponseGenerateJSFunctionError.INTERNAL_ERROR;
    case 2:
    case "RATE_LIMIT_ERROR":
      return GenerateJsActionResponseGenerateJSFunctionError.RATE_LIMIT_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GenerateJsActionResponseGenerateJSFunctionError.UNRECOGNIZED;
  }
}

export function generateJsActionResponseGenerateJSFunctionErrorToJSON(
  object: GenerateJsActionResponseGenerateJSFunctionError,
): string {
  switch (object) {
    case GenerateJsActionResponseGenerateJSFunctionError.ERROR_TYPE_UNSPECIFIED:
      return "ERROR_TYPE_UNSPECIFIED";
    case GenerateJsActionResponseGenerateJSFunctionError.INTERNAL_ERROR:
      return "INTERNAL_ERROR";
    case GenerateJsActionResponseGenerateJSFunctionError.RATE_LIMIT_ERROR:
      return "RATE_LIMIT_ERROR";
    case GenerateJsActionResponseGenerateJSFunctionError.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GenerateJsActionResponseQueryParameters {
  $type?: "pb.v1alpha1.GenerateJsActionResponse.QueryParameters";
  temperature?: number | undefined;
  examplesUsed?: string[] | undefined;
}

/** These are only used in internal evaluation */
export interface GenerateJsActionExample {
  $type?: "pb.v1alpha1.GenerateJsActionExample";
  request?: GenerateJsActionRequest | undefined;
  response?: GenerateJsActionResponse | undefined;
}

export interface GenerateJsActionExamples {
  $type?: "pb.v1alpha1.GenerateJsActionExamples";
  /** Name for the set of examples. */
  name?: string | undefined;
  examples?: GenerateJsActionExample[] | undefined;
}

export interface GenerateActionDescriptionRequest {
  $type?: "pb.v1alpha1.GenerateActionDescriptionRequest";
  action?: Action | undefined;
  actionJsCode?: string | undefined;
}

export interface GenerateActionDescriptionResponse {
  $type?: "pb.v1alpha1.GenerateActionDescriptionResponse";
  /** description for the action */
  description?: string | undefined;
  error?:
    | GenerateActionDescriptionResponseGenerateDescriptionError
    | undefined;
  /** Descriptions for each element that is operated on */
  elementDescriptions?: string[] | undefined;
}

export enum GenerateActionDescriptionResponseGenerateDescriptionError {
  ERROR_TYPE_UNSPECIFIED = 0,
  INTERNAL_ERROR = 1,
  RATE_LIMIT_ERROR = 2,
  UNRECOGNIZED = -1,
}

export function generateActionDescriptionResponseGenerateDescriptionErrorFromJSON(
  object: any,
): GenerateActionDescriptionResponseGenerateDescriptionError {
  switch (object) {
    case 0:
    case "ERROR_TYPE_UNSPECIFIED":
      return GenerateActionDescriptionResponseGenerateDescriptionError.ERROR_TYPE_UNSPECIFIED;
    case 1:
    case "INTERNAL_ERROR":
      return GenerateActionDescriptionResponseGenerateDescriptionError.INTERNAL_ERROR;
    case 2:
    case "RATE_LIMIT_ERROR":
      return GenerateActionDescriptionResponseGenerateDescriptionError.RATE_LIMIT_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GenerateActionDescriptionResponseGenerateDescriptionError.UNRECOGNIZED;
  }
}

export function generateActionDescriptionResponseGenerateDescriptionErrorToJSON(
  object: GenerateActionDescriptionResponseGenerateDescriptionError,
): string {
  switch (object) {
    case GenerateActionDescriptionResponseGenerateDescriptionError.ERROR_TYPE_UNSPECIFIED:
      return "ERROR_TYPE_UNSPECIFIED";
    case GenerateActionDescriptionResponseGenerateDescriptionError.INTERNAL_ERROR:
      return "INTERNAL_ERROR";
    case GenerateActionDescriptionResponseGenerateDescriptionError.RATE_LIMIT_ERROR:
      return "RATE_LIMIT_ERROR";
    case GenerateActionDescriptionResponseGenerateDescriptionError.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * populated on the server side if the MacroAction.login filed is present for
 * InferMacroActionStepRequest.action
 */
export interface LoginMacroActionOptions {
  $type?: "pb.v1alpha1.LoginMacroActionOptions";
  /**
   * The fields that the account has on our secret manager
   * Populated by the server
   */
  fieldNames?:
    | string[]
    | undefined;
  /** GetPasscodeAction contains all available MFA methods. */
  passcodeActions?: GetPasscodeAction[] | undefined;
}

export interface InferMacroActionStepRequest {
  $type?: "pb.v1alpha1.InferMacroActionStepRequest";
  macroAction?: Action | undefined;
  context?: MacroActionInferContext | undefined;
  loginMacroActionOptions?: LoginMacroActionOptions | undefined;
  prevTrajectorySteps?:
    | InferMacroActionStepRequestTrajectoryStep[]
    | undefined;
  /** Explicitly pass in the org_id before it's passed in via the cookie */
  orgId?: string | undefined;
  executionId?: string | undefined;
}

/**
 * Store information about previous actions executed.
 * Add to this message as fields are needed for FM.
 * To be populated by the server
 */
export interface InferMacroActionStepRequestTrajectoryStep {
  $type?: "pb.v1alpha1.InferMacroActionStepRequest.TrajectoryStep";
  /** The action that was executed */
  action?:
    | Action
    | undefined;
  /** Other things to add: information if Orbot errored out, etc. */
  errorType?: MacroActionExecutionError | undefined;
  errorMessage?: string | undefined;
}

export interface InferMacroActionStepResponse {
  $type?: "pb.v1alpha1.InferMacroActionStepResponse";
  step?: MacroActionStep | undefined;
}

function createBaseGenerateJsActionRequest(): GenerateJsActionRequest {
  return {
    $type: "pb.v1alpha1.GenerateJsActionRequest",
    orgId: "",
    workflowContext: "",
    userInstruction: "",
    expectedReturnType: 0,
    attempts: [],
  };
}

export const GenerateJsActionRequest = {
  $type: "pb.v1alpha1.GenerateJsActionRequest" as const,

  encode(message: GenerateJsActionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.workflowContext !== undefined && message.workflowContext !== "") {
      writer.uint32(18).string(message.workflowContext);
    }
    if (message.userInstruction !== undefined && message.userInstruction !== "") {
      writer.uint32(26).string(message.userInstruction);
    }
    if (message.expectedReturnType !== undefined && message.expectedReturnType !== 0) {
      writer.uint32(32).int32(message.expectedReturnType);
    }
    if (message.attempts !== undefined && message.attempts.length !== 0) {
      for (const v of message.attempts) {
        GenerateJsActionRequestFailedAttempt.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateJsActionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateJsActionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.workflowContext = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.userInstruction = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.expectedReturnType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.attempts!.push(GenerateJsActionRequestFailedAttempt.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateJsActionRequest {
    return {
      $type: GenerateJsActionRequest.$type,
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      workflowContext: isSet(object.workflowContext) ? globalThis.String(object.workflowContext) : "",
      userInstruction: isSet(object.userInstruction) ? globalThis.String(object.userInstruction) : "",
      expectedReturnType: isSet(object.expectedReturnType)
        ? generateJsActionRequestReturnTypeFromJSON(object.expectedReturnType)
        : 0,
      attempts: globalThis.Array.isArray(object?.attempts)
        ? object.attempts.map((e: any) => GenerateJsActionRequestFailedAttempt.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenerateJsActionRequest): unknown {
    const obj: any = {};
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.workflowContext !== undefined && message.workflowContext !== "") {
      obj.workflowContext = message.workflowContext;
    }
    if (message.userInstruction !== undefined && message.userInstruction !== "") {
      obj.userInstruction = message.userInstruction;
    }
    if (message.expectedReturnType !== undefined && message.expectedReturnType !== 0) {
      obj.expectedReturnType = generateJsActionRequestReturnTypeToJSON(message.expectedReturnType);
    }
    if (message.attempts?.length) {
      obj.attempts = message.attempts.map((e) => GenerateJsActionRequestFailedAttempt.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateJsActionRequest>, I>>(base?: I): GenerateJsActionRequest {
    return GenerateJsActionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateJsActionRequest>, I>>(object: I): GenerateJsActionRequest {
    const message = createBaseGenerateJsActionRequest();
    message.orgId = object.orgId ?? "";
    message.workflowContext = object.workflowContext ?? "";
    message.userInstruction = object.userInstruction ?? "";
    message.expectedReturnType = object.expectedReturnType ?? 0;
    message.attempts = object.attempts?.map((e) => GenerateJsActionRequestFailedAttempt.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GenerateJsActionRequest.$type, GenerateJsActionRequest);

function createBaseGenerateJsActionRequestFailedAttempt(): GenerateJsActionRequestFailedAttempt {
  return {
    $type: "pb.v1alpha1.GenerateJsActionRequest.FailedAttempt",
    result: undefined,
    userInstruction: "",
    failureType: 0,
    failureExplanation: "",
  };
}

export const GenerateJsActionRequestFailedAttempt = {
  $type: "pb.v1alpha1.GenerateJsActionRequest.FailedAttempt" as const,

  encode(message: GenerateJsActionRequestFailedAttempt, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== undefined) {
      GenerateJsActionResponse.encode(message.result, writer.uint32(50).fork()).ldelim();
    }
    if (message.userInstruction !== undefined && message.userInstruction !== "") {
      writer.uint32(10).string(message.userInstruction);
    }
    if (message.failureType !== undefined && message.failureType !== 0) {
      writer.uint32(16).int32(message.failureType);
    }
    if (message.failureExplanation !== undefined && message.failureExplanation !== "") {
      writer.uint32(26).string(message.failureExplanation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateJsActionRequestFailedAttempt {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateJsActionRequestFailedAttempt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 6:
          if (tag !== 50) {
            break;
          }

          message.result = GenerateJsActionResponse.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userInstruction = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.failureType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.failureExplanation = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateJsActionRequestFailedAttempt {
    return {
      $type: GenerateJsActionRequestFailedAttempt.$type,
      result: isSet(object.result) ? GenerateJsActionResponse.fromJSON(object.result) : undefined,
      userInstruction: isSet(object.userInstruction) ? globalThis.String(object.userInstruction) : "",
      failureType: isSet(object.failureType)
        ? generateJsActionRequestFailedAttemptFailureTypeFromJSON(object.failureType)
        : 0,
      failureExplanation: isSet(object.failureExplanation) ? globalThis.String(object.failureExplanation) : "",
    };
  },

  toJSON(message: GenerateJsActionRequestFailedAttempt): unknown {
    const obj: any = {};
    if (message.result !== undefined) {
      obj.result = GenerateJsActionResponse.toJSON(message.result);
    }
    if (message.userInstruction !== undefined && message.userInstruction !== "") {
      obj.userInstruction = message.userInstruction;
    }
    if (message.failureType !== undefined && message.failureType !== 0) {
      obj.failureType = generateJsActionRequestFailedAttemptFailureTypeToJSON(message.failureType);
    }
    if (message.failureExplanation !== undefined && message.failureExplanation !== "") {
      obj.failureExplanation = message.failureExplanation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateJsActionRequestFailedAttempt>, I>>(
    base?: I,
  ): GenerateJsActionRequestFailedAttempt {
    return GenerateJsActionRequestFailedAttempt.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateJsActionRequestFailedAttempt>, I>>(
    object: I,
  ): GenerateJsActionRequestFailedAttempt {
    const message = createBaseGenerateJsActionRequestFailedAttempt();
    message.result = (object.result !== undefined && object.result !== null)
      ? GenerateJsActionResponse.fromPartial(object.result)
      : undefined;
    message.userInstruction = object.userInstruction ?? "";
    message.failureType = object.failureType ?? 0;
    message.failureExplanation = object.failureExplanation ?? "";
    return message;
  },
};

messageTypeRegistry.set(GenerateJsActionRequestFailedAttempt.$type, GenerateJsActionRequestFailedAttempt);

function createBaseGenerateJsActionResponse(): GenerateJsActionResponse {
  return { $type: "pb.v1alpha1.GenerateJsActionResponse", generatedFunction: "", queryParameters: undefined, error: 0 };
}

export const GenerateJsActionResponse = {
  $type: "pb.v1alpha1.GenerateJsActionResponse" as const,

  encode(message: GenerateJsActionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.generatedFunction !== undefined && message.generatedFunction !== "") {
      writer.uint32(10).string(message.generatedFunction);
    }
    if (message.queryParameters !== undefined) {
      GenerateJsActionResponseQueryParameters.encode(message.queryParameters, writer.uint32(18).fork()).ldelim();
    }
    if (message.error !== undefined && message.error !== 0) {
      writer.uint32(24).int32(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateJsActionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateJsActionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.generatedFunction = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.queryParameters = GenerateJsActionResponseQueryParameters.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateJsActionResponse {
    return {
      $type: GenerateJsActionResponse.$type,
      generatedFunction: isSet(object.generatedFunction) ? globalThis.String(object.generatedFunction) : "",
      queryParameters: isSet(object.queryParameters)
        ? GenerateJsActionResponseQueryParameters.fromJSON(object.queryParameters)
        : undefined,
      error: isSet(object.error) ? generateJsActionResponseGenerateJSFunctionErrorFromJSON(object.error) : 0,
    };
  },

  toJSON(message: GenerateJsActionResponse): unknown {
    const obj: any = {};
    if (message.generatedFunction !== undefined && message.generatedFunction !== "") {
      obj.generatedFunction = message.generatedFunction;
    }
    if (message.queryParameters !== undefined) {
      obj.queryParameters = GenerateJsActionResponseQueryParameters.toJSON(message.queryParameters);
    }
    if (message.error !== undefined && message.error !== 0) {
      obj.error = generateJsActionResponseGenerateJSFunctionErrorToJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateJsActionResponse>, I>>(base?: I): GenerateJsActionResponse {
    return GenerateJsActionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateJsActionResponse>, I>>(object: I): GenerateJsActionResponse {
    const message = createBaseGenerateJsActionResponse();
    message.generatedFunction = object.generatedFunction ?? "";
    message.queryParameters = (object.queryParameters !== undefined && object.queryParameters !== null)
      ? GenerateJsActionResponseQueryParameters.fromPartial(object.queryParameters)
      : undefined;
    message.error = object.error ?? 0;
    return message;
  },
};

messageTypeRegistry.set(GenerateJsActionResponse.$type, GenerateJsActionResponse);

function createBaseGenerateJsActionResponseQueryParameters(): GenerateJsActionResponseQueryParameters {
  return { $type: "pb.v1alpha1.GenerateJsActionResponse.QueryParameters", temperature: 0, examplesUsed: [] };
}

export const GenerateJsActionResponseQueryParameters = {
  $type: "pb.v1alpha1.GenerateJsActionResponse.QueryParameters" as const,

  encode(message: GenerateJsActionResponseQueryParameters, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.temperature !== undefined && message.temperature !== 0) {
      writer.uint32(21).float(message.temperature);
    }
    if (message.examplesUsed !== undefined && message.examplesUsed.length !== 0) {
      for (const v of message.examplesUsed) {
        writer.uint32(10).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateJsActionResponseQueryParameters {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateJsActionResponseQueryParameters();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 21) {
            break;
          }

          message.temperature = reader.float();
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.examplesUsed!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateJsActionResponseQueryParameters {
    return {
      $type: GenerateJsActionResponseQueryParameters.$type,
      temperature: isSet(object.temperature) ? globalThis.Number(object.temperature) : 0,
      examplesUsed: globalThis.Array.isArray(object?.examplesUsed)
        ? object.examplesUsed.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: GenerateJsActionResponseQueryParameters): unknown {
    const obj: any = {};
    if (message.temperature !== undefined && message.temperature !== 0) {
      obj.temperature = message.temperature;
    }
    if (message.examplesUsed?.length) {
      obj.examplesUsed = message.examplesUsed;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateJsActionResponseQueryParameters>, I>>(
    base?: I,
  ): GenerateJsActionResponseQueryParameters {
    return GenerateJsActionResponseQueryParameters.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateJsActionResponseQueryParameters>, I>>(
    object: I,
  ): GenerateJsActionResponseQueryParameters {
    const message = createBaseGenerateJsActionResponseQueryParameters();
    message.temperature = object.temperature ?? 0;
    message.examplesUsed = object.examplesUsed?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(GenerateJsActionResponseQueryParameters.$type, GenerateJsActionResponseQueryParameters);

function createBaseGenerateJsActionExample(): GenerateJsActionExample {
  return { $type: "pb.v1alpha1.GenerateJsActionExample", request: undefined, response: undefined };
}

export const GenerateJsActionExample = {
  $type: "pb.v1alpha1.GenerateJsActionExample" as const,

  encode(message: GenerateJsActionExample, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.request !== undefined) {
      GenerateJsActionRequest.encode(message.request, writer.uint32(10).fork()).ldelim();
    }
    if (message.response !== undefined) {
      GenerateJsActionResponse.encode(message.response, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateJsActionExample {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateJsActionExample();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.request = GenerateJsActionRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.response = GenerateJsActionResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateJsActionExample {
    return {
      $type: GenerateJsActionExample.$type,
      request: isSet(object.request) ? GenerateJsActionRequest.fromJSON(object.request) : undefined,
      response: isSet(object.response) ? GenerateJsActionResponse.fromJSON(object.response) : undefined,
    };
  },

  toJSON(message: GenerateJsActionExample): unknown {
    const obj: any = {};
    if (message.request !== undefined) {
      obj.request = GenerateJsActionRequest.toJSON(message.request);
    }
    if (message.response !== undefined) {
      obj.response = GenerateJsActionResponse.toJSON(message.response);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateJsActionExample>, I>>(base?: I): GenerateJsActionExample {
    return GenerateJsActionExample.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateJsActionExample>, I>>(object: I): GenerateJsActionExample {
    const message = createBaseGenerateJsActionExample();
    message.request = (object.request !== undefined && object.request !== null)
      ? GenerateJsActionRequest.fromPartial(object.request)
      : undefined;
    message.response = (object.response !== undefined && object.response !== null)
      ? GenerateJsActionResponse.fromPartial(object.response)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GenerateJsActionExample.$type, GenerateJsActionExample);

function createBaseGenerateJsActionExamples(): GenerateJsActionExamples {
  return { $type: "pb.v1alpha1.GenerateJsActionExamples", name: "", examples: [] };
}

export const GenerateJsActionExamples = {
  $type: "pb.v1alpha1.GenerateJsActionExamples" as const,

  encode(message: GenerateJsActionExamples, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.examples !== undefined && message.examples.length !== 0) {
      for (const v of message.examples) {
        GenerateJsActionExample.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateJsActionExamples {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateJsActionExamples();
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

          message.examples!.push(GenerateJsActionExample.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateJsActionExamples {
    return {
      $type: GenerateJsActionExamples.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      examples: globalThis.Array.isArray(object?.examples)
        ? object.examples.map((e: any) => GenerateJsActionExample.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenerateJsActionExamples): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.examples?.length) {
      obj.examples = message.examples.map((e) => GenerateJsActionExample.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateJsActionExamples>, I>>(base?: I): GenerateJsActionExamples {
    return GenerateJsActionExamples.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateJsActionExamples>, I>>(object: I): GenerateJsActionExamples {
    const message = createBaseGenerateJsActionExamples();
    message.name = object.name ?? "";
    message.examples = object.examples?.map((e) => GenerateJsActionExample.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GenerateJsActionExamples.$type, GenerateJsActionExamples);

function createBaseGenerateActionDescriptionRequest(): GenerateActionDescriptionRequest {
  return { $type: "pb.v1alpha1.GenerateActionDescriptionRequest", action: undefined, actionJsCode: "" };
}

export const GenerateActionDescriptionRequest = {
  $type: "pb.v1alpha1.GenerateActionDescriptionRequest" as const,

  encode(message: GenerateActionDescriptionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    if (message.actionJsCode !== undefined && message.actionJsCode !== "") {
      writer.uint32(18).string(message.actionJsCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateActionDescriptionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateActionDescriptionRequest();
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

          message.actionJsCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateActionDescriptionRequest {
    return {
      $type: GenerateActionDescriptionRequest.$type,
      action: isSet(object.action) ? Action.fromJSON(object.action) : undefined,
      actionJsCode: isSet(object.actionJsCode) ? globalThis.String(object.actionJsCode) : "",
    };
  },

  toJSON(message: GenerateActionDescriptionRequest): unknown {
    const obj: any = {};
    if (message.action !== undefined) {
      obj.action = Action.toJSON(message.action);
    }
    if (message.actionJsCode !== undefined && message.actionJsCode !== "") {
      obj.actionJsCode = message.actionJsCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateActionDescriptionRequest>, I>>(
    base?: I,
  ): GenerateActionDescriptionRequest {
    return GenerateActionDescriptionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateActionDescriptionRequest>, I>>(
    object: I,
  ): GenerateActionDescriptionRequest {
    const message = createBaseGenerateActionDescriptionRequest();
    message.action = (object.action !== undefined && object.action !== null)
      ? Action.fromPartial(object.action)
      : undefined;
    message.actionJsCode = object.actionJsCode ?? "";
    return message;
  },
};

messageTypeRegistry.set(GenerateActionDescriptionRequest.$type, GenerateActionDescriptionRequest);

function createBaseGenerateActionDescriptionResponse(): GenerateActionDescriptionResponse {
  return { $type: "pb.v1alpha1.GenerateActionDescriptionResponse", description: "", error: 0, elementDescriptions: [] };
}

export const GenerateActionDescriptionResponse = {
  $type: "pb.v1alpha1.GenerateActionDescriptionResponse" as const,

  encode(message: GenerateActionDescriptionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.error !== undefined && message.error !== 0) {
      writer.uint32(16).int32(message.error);
    }
    if (message.elementDescriptions !== undefined && message.elementDescriptions.length !== 0) {
      for (const v of message.elementDescriptions) {
        writer.uint32(26).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateActionDescriptionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateActionDescriptionResponse();
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
          if (tag !== 16) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.elementDescriptions!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateActionDescriptionResponse {
    return {
      $type: GenerateActionDescriptionResponse.$type,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      error: isSet(object.error) ? generateActionDescriptionResponseGenerateDescriptionErrorFromJSON(object.error) : 0,
      elementDescriptions: globalThis.Array.isArray(object?.elementDescriptions)
        ? object.elementDescriptions.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: GenerateActionDescriptionResponse): unknown {
    const obj: any = {};
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.error !== undefined && message.error !== 0) {
      obj.error = generateActionDescriptionResponseGenerateDescriptionErrorToJSON(message.error);
    }
    if (message.elementDescriptions?.length) {
      obj.elementDescriptions = message.elementDescriptions;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateActionDescriptionResponse>, I>>(
    base?: I,
  ): GenerateActionDescriptionResponse {
    return GenerateActionDescriptionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateActionDescriptionResponse>, I>>(
    object: I,
  ): GenerateActionDescriptionResponse {
    const message = createBaseGenerateActionDescriptionResponse();
    message.description = object.description ?? "";
    message.error = object.error ?? 0;
    message.elementDescriptions = object.elementDescriptions?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(GenerateActionDescriptionResponse.$type, GenerateActionDescriptionResponse);

function createBaseLoginMacroActionOptions(): LoginMacroActionOptions {
  return { $type: "pb.v1alpha1.LoginMacroActionOptions", fieldNames: [], passcodeActions: [] };
}

export const LoginMacroActionOptions = {
  $type: "pb.v1alpha1.LoginMacroActionOptions" as const,

  encode(message: LoginMacroActionOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldNames !== undefined && message.fieldNames.length !== 0) {
      for (const v of message.fieldNames) {
        writer.uint32(26).string(v!);
      }
    }
    if (message.passcodeActions !== undefined && message.passcodeActions.length !== 0) {
      for (const v of message.passcodeActions) {
        GetPasscodeAction.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginMacroActionOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginMacroActionOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 26) {
            break;
          }

          message.fieldNames!.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): LoginMacroActionOptions {
    return {
      $type: LoginMacroActionOptions.$type,
      fieldNames: globalThis.Array.isArray(object?.fieldNames)
        ? object.fieldNames.map((e: any) => globalThis.String(e))
        : [],
      passcodeActions: globalThis.Array.isArray(object?.passcodeActions)
        ? object.passcodeActions.map((e: any) => GetPasscodeAction.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LoginMacroActionOptions): unknown {
    const obj: any = {};
    if (message.fieldNames?.length) {
      obj.fieldNames = message.fieldNames;
    }
    if (message.passcodeActions?.length) {
      obj.passcodeActions = message.passcodeActions.map((e) => GetPasscodeAction.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LoginMacroActionOptions>, I>>(base?: I): LoginMacroActionOptions {
    return LoginMacroActionOptions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LoginMacroActionOptions>, I>>(object: I): LoginMacroActionOptions {
    const message = createBaseLoginMacroActionOptions();
    message.fieldNames = object.fieldNames?.map((e) => e) || [];
    message.passcodeActions = object.passcodeActions?.map((e) => GetPasscodeAction.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(LoginMacroActionOptions.$type, LoginMacroActionOptions);

function createBaseInferMacroActionStepRequest(): InferMacroActionStepRequest {
  return {
    $type: "pb.v1alpha1.InferMacroActionStepRequest",
    macroAction: undefined,
    context: undefined,
    loginMacroActionOptions: undefined,
    prevTrajectorySteps: [],
    orgId: "",
    executionId: "",
  };
}

export const InferMacroActionStepRequest = {
  $type: "pb.v1alpha1.InferMacroActionStepRequest" as const,

  encode(message: InferMacroActionStepRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.macroAction !== undefined) {
      Action.encode(message.macroAction, writer.uint32(42).fork()).ldelim();
    }
    if (message.context !== undefined) {
      MacroActionInferContext.encode(message.context, writer.uint32(50).fork()).ldelim();
    }
    if (message.loginMacroActionOptions !== undefined) {
      LoginMacroActionOptions.encode(message.loginMacroActionOptions, writer.uint32(26).fork()).ldelim();
    }
    if (message.prevTrajectorySteps !== undefined && message.prevTrajectorySteps.length !== 0) {
      for (const v of message.prevTrajectorySteps) {
        InferMacroActionStepRequestTrajectoryStep.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(34).string(message.orgId);
    }
    if (message.executionId !== undefined && message.executionId !== "") {
      writer.uint32(58).string(message.executionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InferMacroActionStepRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInferMacroActionStepRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 5:
          if (tag !== 42) {
            break;
          }

          message.macroAction = Action.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.context = MacroActionInferContext.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.loginMacroActionOptions = LoginMacroActionOptions.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.prevTrajectorySteps!.push(InferMacroActionStepRequestTrajectoryStep.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.executionId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InferMacroActionStepRequest {
    return {
      $type: InferMacroActionStepRequest.$type,
      macroAction: isSet(object.macroAction) ? Action.fromJSON(object.macroAction) : undefined,
      context: isSet(object.context) ? MacroActionInferContext.fromJSON(object.context) : undefined,
      loginMacroActionOptions: isSet(object.loginMacroActionOptions)
        ? LoginMacroActionOptions.fromJSON(object.loginMacroActionOptions)
        : undefined,
      prevTrajectorySteps: globalThis.Array.isArray(object?.prevTrajectorySteps)
        ? object.prevTrajectorySteps.map((e: any) => InferMacroActionStepRequestTrajectoryStep.fromJSON(e))
        : [],
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      executionId: isSet(object.executionId) ? globalThis.String(object.executionId) : "",
    };
  },

  toJSON(message: InferMacroActionStepRequest): unknown {
    const obj: any = {};
    if (message.macroAction !== undefined) {
      obj.macroAction = Action.toJSON(message.macroAction);
    }
    if (message.context !== undefined) {
      obj.context = MacroActionInferContext.toJSON(message.context);
    }
    if (message.loginMacroActionOptions !== undefined) {
      obj.loginMacroActionOptions = LoginMacroActionOptions.toJSON(message.loginMacroActionOptions);
    }
    if (message.prevTrajectorySteps?.length) {
      obj.prevTrajectorySteps = message.prevTrajectorySteps.map((e) =>
        InferMacroActionStepRequestTrajectoryStep.toJSON(e)
      );
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.executionId !== undefined && message.executionId !== "") {
      obj.executionId = message.executionId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InferMacroActionStepRequest>, I>>(base?: I): InferMacroActionStepRequest {
    return InferMacroActionStepRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InferMacroActionStepRequest>, I>>(object: I): InferMacroActionStepRequest {
    const message = createBaseInferMacroActionStepRequest();
    message.macroAction = (object.macroAction !== undefined && object.macroAction !== null)
      ? Action.fromPartial(object.macroAction)
      : undefined;
    message.context = (object.context !== undefined && object.context !== null)
      ? MacroActionInferContext.fromPartial(object.context)
      : undefined;
    message.loginMacroActionOptions =
      (object.loginMacroActionOptions !== undefined && object.loginMacroActionOptions !== null)
        ? LoginMacroActionOptions.fromPartial(object.loginMacroActionOptions)
        : undefined;
    message.prevTrajectorySteps =
      object.prevTrajectorySteps?.map((e) => InferMacroActionStepRequestTrajectoryStep.fromPartial(e)) || [];
    message.orgId = object.orgId ?? "";
    message.executionId = object.executionId ?? "";
    return message;
  },
};

messageTypeRegistry.set(InferMacroActionStepRequest.$type, InferMacroActionStepRequest);

function createBaseInferMacroActionStepRequestTrajectoryStep(): InferMacroActionStepRequestTrajectoryStep {
  return {
    $type: "pb.v1alpha1.InferMacroActionStepRequest.TrajectoryStep",
    action: undefined,
    errorType: 0,
    errorMessage: "",
  };
}

export const InferMacroActionStepRequestTrajectoryStep = {
  $type: "pb.v1alpha1.InferMacroActionStepRequest.TrajectoryStep" as const,

  encode(message: InferMacroActionStepRequestTrajectoryStep, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    if (message.errorType !== undefined && message.errorType !== 0) {
      writer.uint32(16).int32(message.errorType);
    }
    if (message.errorMessage !== undefined && message.errorMessage !== "") {
      writer.uint32(26).string(message.errorMessage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InferMacroActionStepRequestTrajectoryStep {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInferMacroActionStepRequestTrajectoryStep();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InferMacroActionStepRequestTrajectoryStep {
    return {
      $type: InferMacroActionStepRequestTrajectoryStep.$type,
      action: isSet(object.action) ? Action.fromJSON(object.action) : undefined,
      errorType: isSet(object.errorType) ? macroActionExecutionErrorFromJSON(object.errorType) : 0,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : "",
    };
  },

  toJSON(message: InferMacroActionStepRequestTrajectoryStep): unknown {
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
    return obj;
  },

  create<I extends Exact<DeepPartial<InferMacroActionStepRequestTrajectoryStep>, I>>(
    base?: I,
  ): InferMacroActionStepRequestTrajectoryStep {
    return InferMacroActionStepRequestTrajectoryStep.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InferMacroActionStepRequestTrajectoryStep>, I>>(
    object: I,
  ): InferMacroActionStepRequestTrajectoryStep {
    const message = createBaseInferMacroActionStepRequestTrajectoryStep();
    message.action = (object.action !== undefined && object.action !== null)
      ? Action.fromPartial(object.action)
      : undefined;
    message.errorType = object.errorType ?? 0;
    message.errorMessage = object.errorMessage ?? "";
    return message;
  },
};

messageTypeRegistry.set(InferMacroActionStepRequestTrajectoryStep.$type, InferMacroActionStepRequestTrajectoryStep);

function createBaseInferMacroActionStepResponse(): InferMacroActionStepResponse {
  return { $type: "pb.v1alpha1.InferMacroActionStepResponse", step: undefined };
}

export const InferMacroActionStepResponse = {
  $type: "pb.v1alpha1.InferMacroActionStepResponse" as const,

  encode(message: InferMacroActionStepResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.step !== undefined) {
      MacroActionStep.encode(message.step, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InferMacroActionStepResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInferMacroActionStepResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.step = MacroActionStep.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InferMacroActionStepResponse {
    return {
      $type: InferMacroActionStepResponse.$type,
      step: isSet(object.step) ? MacroActionStep.fromJSON(object.step) : undefined,
    };
  },

  toJSON(message: InferMacroActionStepResponse): unknown {
    const obj: any = {};
    if (message.step !== undefined) {
      obj.step = MacroActionStep.toJSON(message.step);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InferMacroActionStepResponse>, I>>(base?: I): InferMacroActionStepResponse {
    return InferMacroActionStepResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InferMacroActionStepResponse>, I>>(object: I): InferMacroActionStepResponse {
    const message = createBaseInferMacroActionStepResponse();
    message.step = (object.step !== undefined && object.step !== null)
      ? MacroActionStep.fromPartial(object.step)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(InferMacroActionStepResponse.$type, InferMacroActionStepResponse);

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
