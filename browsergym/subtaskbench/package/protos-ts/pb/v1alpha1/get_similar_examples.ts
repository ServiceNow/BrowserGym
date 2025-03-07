/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";
import { ProcessSmartActionsRequest, ProcessSmartActionsResponse } from "./actionprocessing";

export const protobufPackage = "pb.v1alpha1";

export interface GetSimilarExamplesRequest {
  $type?: "pb.v1alpha1.GetSimilarExamplesRequest";
  /** Required. The task_id for which similar examples are requested */
  taskId?:
    | string
    | undefined;
  /** Optional. This is required for UI Automation tasks */
  actionId?:
    | string
    | undefined;
  /** Optional. Number of similar examples to return. Default is 100. */
  numExamples?:
    | number
    | undefined;
  /**
   * Optional: ML can pick more examples that are more challenging. If this is
   * not set, then we don't apply any filter for the confidence score.
   */
  confidenceScoreThreshold?:
    | number
    | undefined;
  /**
   * Optional. If true, match schema details in examples
   * with the schema details in the task
   */
  matchSchemaDetailsInExamples?:
    | boolean
    | undefined;
  /**
   * Optional. Filter examples based on the type of examples.
   * Default is EXAMPLE_TYPE_ALL.
   */
  exampleType?: GetSimilarExamplesRequestExampleType | undefined;
}

export enum GetSimilarExamplesRequestExampleType {
  UNSPECIFIED = 0,
  /** ALL - examples regardless of whether human review is involved */
  ALL = 1,
  /**
   * HUMAN_REVIEWED - examples that triggers the human review, regardless of
   * whether user confirms or rejects the prediction
   */
  HUMAN_REVIEWED = 2,
  /** HUMAN_MODIFIED - examples that triggers human review and the prediction was modified. */
  HUMAN_MODIFIED = 3,
  UNRECOGNIZED = -1,
}

export function getSimilarExamplesRequestExampleTypeFromJSON(object: any): GetSimilarExamplesRequestExampleType {
  switch (object) {
    case 0:
    case "EXAMPLE_TYPE_UNSPECIFIED":
      return GetSimilarExamplesRequestExampleType.UNSPECIFIED;
    case 1:
    case "EXAMPLE_TYPE_ALL":
      return GetSimilarExamplesRequestExampleType.ALL;
    case 2:
    case "EXAMPLE_TYPE_HUMAN_REVIEWED":
      return GetSimilarExamplesRequestExampleType.HUMAN_REVIEWED;
    case 3:
    case "EXAMPLE_TYPE_HUMAN_MODIFIED":
      return GetSimilarExamplesRequestExampleType.HUMAN_MODIFIED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetSimilarExamplesRequestExampleType.UNRECOGNIZED;
  }
}

export function getSimilarExamplesRequestExampleTypeToJSON(object: GetSimilarExamplesRequestExampleType): string {
  switch (object) {
    case GetSimilarExamplesRequestExampleType.UNSPECIFIED:
      return "EXAMPLE_TYPE_UNSPECIFIED";
    case GetSimilarExamplesRequestExampleType.ALL:
      return "EXAMPLE_TYPE_ALL";
    case GetSimilarExamplesRequestExampleType.HUMAN_REVIEWED:
      return "EXAMPLE_TYPE_HUMAN_REVIEWED";
    case GetSimilarExamplesRequestExampleType.HUMAN_MODIFIED:
      return "EXAMPLE_TYPE_HUMAN_MODIFIED";
    case GetSimilarExamplesRequestExampleType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GetSimilarExamplesResponse {
  $type?: "pb.v1alpha1.GetSimilarExamplesResponse";
  examples?: SimilarExample[] | undefined;
}

export interface SimilarExample {
  $type?: "pb.v1alpha1.SimilarExample";
  uiAutomationExample?: UiAutomationExample | undefined;
  apiAutomationExample?: ApiAutomationExample | undefined;
}

export interface UiAutomationExample {
  $type?: "pb.v1alpha1.UiAutomationExample";
  /** task_id for the example action */
  taskId?:
    | string
    | undefined;
  /** action_id for the example action */
  actionId?: string | undefined;
  request?: ProcessSmartActionsRequest | undefined;
  response?: ProcessSmartActionsResponse | undefined;
}

export interface ApiAutomationExample {
  $type?: "pb.v1alpha1.ApiAutomationExample";
  documentGcsUri?: string | undefined;
}

function createBaseGetSimilarExamplesRequest(): GetSimilarExamplesRequest {
  return {
    $type: "pb.v1alpha1.GetSimilarExamplesRequest",
    taskId: "",
    actionId: "",
    numExamples: 0,
    confidenceScoreThreshold: 0,
    matchSchemaDetailsInExamples: false,
    exampleType: 0,
  };
}

export const GetSimilarExamplesRequest = {
  $type: "pb.v1alpha1.GetSimilarExamplesRequest" as const,

  encode(message: GetSimilarExamplesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.taskId !== undefined && message.taskId !== "") {
      writer.uint32(10).string(message.taskId);
    }
    if (message.actionId !== undefined && message.actionId !== "") {
      writer.uint32(18).string(message.actionId);
    }
    if (message.numExamples !== undefined && message.numExamples !== 0) {
      writer.uint32(24).int32(message.numExamples);
    }
    if (message.confidenceScoreThreshold !== undefined && message.confidenceScoreThreshold !== 0) {
      writer.uint32(37).float(message.confidenceScoreThreshold);
    }
    if (message.matchSchemaDetailsInExamples !== undefined && message.matchSchemaDetailsInExamples !== false) {
      writer.uint32(40).bool(message.matchSchemaDetailsInExamples);
    }
    if (message.exampleType !== undefined && message.exampleType !== 0) {
      writer.uint32(48).int32(message.exampleType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSimilarExamplesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSimilarExamplesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.taskId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.actionId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.numExamples = reader.int32();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.confidenceScoreThreshold = reader.float();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.matchSchemaDetailsInExamples = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.exampleType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSimilarExamplesRequest {
    return {
      $type: GetSimilarExamplesRequest.$type,
      taskId: isSet(object.taskId) ? globalThis.String(object.taskId) : "",
      actionId: isSet(object.actionId) ? globalThis.String(object.actionId) : "",
      numExamples: isSet(object.numExamples) ? globalThis.Number(object.numExamples) : 0,
      confidenceScoreThreshold: isSet(object.confidenceScoreThreshold)
        ? globalThis.Number(object.confidenceScoreThreshold)
        : 0,
      matchSchemaDetailsInExamples: isSet(object.matchSchemaDetailsInExamples)
        ? globalThis.Boolean(object.matchSchemaDetailsInExamples)
        : false,
      exampleType: isSet(object.exampleType) ? getSimilarExamplesRequestExampleTypeFromJSON(object.exampleType) : 0,
    };
  },

  toJSON(message: GetSimilarExamplesRequest): unknown {
    const obj: any = {};
    if (message.taskId !== undefined && message.taskId !== "") {
      obj.taskId = message.taskId;
    }
    if (message.actionId !== undefined && message.actionId !== "") {
      obj.actionId = message.actionId;
    }
    if (message.numExamples !== undefined && message.numExamples !== 0) {
      obj.numExamples = Math.round(message.numExamples);
    }
    if (message.confidenceScoreThreshold !== undefined && message.confidenceScoreThreshold !== 0) {
      obj.confidenceScoreThreshold = message.confidenceScoreThreshold;
    }
    if (message.matchSchemaDetailsInExamples !== undefined && message.matchSchemaDetailsInExamples !== false) {
      obj.matchSchemaDetailsInExamples = message.matchSchemaDetailsInExamples;
    }
    if (message.exampleType !== undefined && message.exampleType !== 0) {
      obj.exampleType = getSimilarExamplesRequestExampleTypeToJSON(message.exampleType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSimilarExamplesRequest>, I>>(base?: I): GetSimilarExamplesRequest {
    return GetSimilarExamplesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSimilarExamplesRequest>, I>>(object: I): GetSimilarExamplesRequest {
    const message = createBaseGetSimilarExamplesRequest();
    message.taskId = object.taskId ?? "";
    message.actionId = object.actionId ?? "";
    message.numExamples = object.numExamples ?? 0;
    message.confidenceScoreThreshold = object.confidenceScoreThreshold ?? 0;
    message.matchSchemaDetailsInExamples = object.matchSchemaDetailsInExamples ?? false;
    message.exampleType = object.exampleType ?? 0;
    return message;
  },
};

messageTypeRegistry.set(GetSimilarExamplesRequest.$type, GetSimilarExamplesRequest);

function createBaseGetSimilarExamplesResponse(): GetSimilarExamplesResponse {
  return { $type: "pb.v1alpha1.GetSimilarExamplesResponse", examples: [] };
}

export const GetSimilarExamplesResponse = {
  $type: "pb.v1alpha1.GetSimilarExamplesResponse" as const,

  encode(message: GetSimilarExamplesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.examples !== undefined && message.examples.length !== 0) {
      for (const v of message.examples) {
        SimilarExample.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSimilarExamplesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSimilarExamplesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.examples!.push(SimilarExample.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSimilarExamplesResponse {
    return {
      $type: GetSimilarExamplesResponse.$type,
      examples: globalThis.Array.isArray(object?.examples)
        ? object.examples.map((e: any) => SimilarExample.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetSimilarExamplesResponse): unknown {
    const obj: any = {};
    if (message.examples?.length) {
      obj.examples = message.examples.map((e) => SimilarExample.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSimilarExamplesResponse>, I>>(base?: I): GetSimilarExamplesResponse {
    return GetSimilarExamplesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSimilarExamplesResponse>, I>>(object: I): GetSimilarExamplesResponse {
    const message = createBaseGetSimilarExamplesResponse();
    message.examples = object.examples?.map((e) => SimilarExample.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetSimilarExamplesResponse.$type, GetSimilarExamplesResponse);

function createBaseSimilarExample(): SimilarExample {
  return { $type: "pb.v1alpha1.SimilarExample", uiAutomationExample: undefined, apiAutomationExample: undefined };
}

export const SimilarExample = {
  $type: "pb.v1alpha1.SimilarExample" as const,

  encode(message: SimilarExample, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uiAutomationExample !== undefined) {
      UiAutomationExample.encode(message.uiAutomationExample, writer.uint32(10).fork()).ldelim();
    }
    if (message.apiAutomationExample !== undefined) {
      ApiAutomationExample.encode(message.apiAutomationExample, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimilarExample {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimilarExample();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uiAutomationExample = UiAutomationExample.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.apiAutomationExample = ApiAutomationExample.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimilarExample {
    return {
      $type: SimilarExample.$type,
      uiAutomationExample: isSet(object.uiAutomationExample)
        ? UiAutomationExample.fromJSON(object.uiAutomationExample)
        : undefined,
      apiAutomationExample: isSet(object.apiAutomationExample)
        ? ApiAutomationExample.fromJSON(object.apiAutomationExample)
        : undefined,
    };
  },

  toJSON(message: SimilarExample): unknown {
    const obj: any = {};
    if (message.uiAutomationExample !== undefined) {
      obj.uiAutomationExample = UiAutomationExample.toJSON(message.uiAutomationExample);
    }
    if (message.apiAutomationExample !== undefined) {
      obj.apiAutomationExample = ApiAutomationExample.toJSON(message.apiAutomationExample);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimilarExample>, I>>(base?: I): SimilarExample {
    return SimilarExample.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimilarExample>, I>>(object: I): SimilarExample {
    const message = createBaseSimilarExample();
    message.uiAutomationExample = (object.uiAutomationExample !== undefined && object.uiAutomationExample !== null)
      ? UiAutomationExample.fromPartial(object.uiAutomationExample)
      : undefined;
    message.apiAutomationExample = (object.apiAutomationExample !== undefined && object.apiAutomationExample !== null)
      ? ApiAutomationExample.fromPartial(object.apiAutomationExample)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SimilarExample.$type, SimilarExample);

function createBaseUiAutomationExample(): UiAutomationExample {
  return {
    $type: "pb.v1alpha1.UiAutomationExample",
    taskId: "",
    actionId: "",
    request: undefined,
    response: undefined,
  };
}

export const UiAutomationExample = {
  $type: "pb.v1alpha1.UiAutomationExample" as const,

  encode(message: UiAutomationExample, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.taskId !== undefined && message.taskId !== "") {
      writer.uint32(10).string(message.taskId);
    }
    if (message.actionId !== undefined && message.actionId !== "") {
      writer.uint32(18).string(message.actionId);
    }
    if (message.request !== undefined) {
      ProcessSmartActionsRequest.encode(message.request, writer.uint32(26).fork()).ldelim();
    }
    if (message.response !== undefined) {
      ProcessSmartActionsResponse.encode(message.response, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UiAutomationExample {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUiAutomationExample();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.taskId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.actionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.request = ProcessSmartActionsRequest.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.response = ProcessSmartActionsResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UiAutomationExample {
    return {
      $type: UiAutomationExample.$type,
      taskId: isSet(object.taskId) ? globalThis.String(object.taskId) : "",
      actionId: isSet(object.actionId) ? globalThis.String(object.actionId) : "",
      request: isSet(object.request) ? ProcessSmartActionsRequest.fromJSON(object.request) : undefined,
      response: isSet(object.response) ? ProcessSmartActionsResponse.fromJSON(object.response) : undefined,
    };
  },

  toJSON(message: UiAutomationExample): unknown {
    const obj: any = {};
    if (message.taskId !== undefined && message.taskId !== "") {
      obj.taskId = message.taskId;
    }
    if (message.actionId !== undefined && message.actionId !== "") {
      obj.actionId = message.actionId;
    }
    if (message.request !== undefined) {
      obj.request = ProcessSmartActionsRequest.toJSON(message.request);
    }
    if (message.response !== undefined) {
      obj.response = ProcessSmartActionsResponse.toJSON(message.response);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UiAutomationExample>, I>>(base?: I): UiAutomationExample {
    return UiAutomationExample.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UiAutomationExample>, I>>(object: I): UiAutomationExample {
    const message = createBaseUiAutomationExample();
    message.taskId = object.taskId ?? "";
    message.actionId = object.actionId ?? "";
    message.request = (object.request !== undefined && object.request !== null)
      ? ProcessSmartActionsRequest.fromPartial(object.request)
      : undefined;
    message.response = (object.response !== undefined && object.response !== null)
      ? ProcessSmartActionsResponse.fromPartial(object.response)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UiAutomationExample.$type, UiAutomationExample);

function createBaseApiAutomationExample(): ApiAutomationExample {
  return { $type: "pb.v1alpha1.ApiAutomationExample", documentGcsUri: "" };
}

export const ApiAutomationExample = {
  $type: "pb.v1alpha1.ApiAutomationExample" as const,

  encode(message: ApiAutomationExample, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.documentGcsUri !== undefined && message.documentGcsUri !== "") {
      writer.uint32(10).string(message.documentGcsUri);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiAutomationExample {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiAutomationExample();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.documentGcsUri = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ApiAutomationExample {
    return {
      $type: ApiAutomationExample.$type,
      documentGcsUri: isSet(object.documentGcsUri) ? globalThis.String(object.documentGcsUri) : "",
    };
  },

  toJSON(message: ApiAutomationExample): unknown {
    const obj: any = {};
    if (message.documentGcsUri !== undefined && message.documentGcsUri !== "") {
      obj.documentGcsUri = message.documentGcsUri;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApiAutomationExample>, I>>(base?: I): ApiAutomationExample {
    return ApiAutomationExample.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApiAutomationExample>, I>>(object: I): ApiAutomationExample {
    const message = createBaseApiAutomationExample();
    message.documentGcsUri = object.documentGcsUri ?? "";
    return message;
  },
};

messageTypeRegistry.set(ApiAutomationExample.$type, ApiAutomationExample);

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
