/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { FieldMask } from "../../google/protobuf/field_mask";
import { messageTypeRegistry } from "../../typeRegistry";
import { Suggestion } from "./suggestion";
import { Task } from "./task";

export const protobufPackage = "pb.v1alpha1";

export interface ListSuggestionsRequest {
  $type?: "pb.v1alpha1.ListSuggestionsRequest";
  /** Username, which is user's email. */
  parent?:
    | string
    | undefined;
  /**
   * Default is 10 (when page_size is missing or set to 0). Max value is 20.
   * Ordered by descending confidence score.
   */
  pageSize?:
    | number
    | undefined;
  /**
   * Use this to continue the previous list requests.
   * Its value should be same with previous response's next_page_token.
   * Please reuse the same filter, while page_size can be different.
   */
  pageToken?:
    | string
    | undefined;
  /**
   * Supported filters: "confidence>=", "status=", "create_time=",
   * "ready_time=", "complete_time=".
   *
   * Valid values for confidence filter are within (0, 1]: "confidence>=0.2"
   *
   * Valid values for status filter are: created, ready, accepted,
   * rejected_incorrect, rejected_already_completed, status_unspecified. Set
   * multiple status values with a dash (-) separator: "status=created",
   * "status=accepted-rejected_incorrect"
   *
   * Valid values for all time filters are %d[dwm]: "create_time=2m" means
   * createtime within past two months.
   *
   * Use comma to combine multiple filters: "confidence>0.4,status=created".
   */
  filter?:
    | string
    | undefined;
  /**
   * Use this to send only relevant data in response
   * - If Field Mask is not send or is sent with empty paths then the result will contain
   *    the complete object
   * - Valid values for field mask are: task_name, confidence, status, create_time, complete_time,
   *    time_saved, tags, task_resource_name, steps, performance, ready_time
   * - Field mask will always contain `name` field. Please donot send it in Paths to avoid errors.
   */
  fieldMask?: string[] | undefined;
}

export interface ListSuggestionsResponse {
  $type?: "pb.v1alpha1.ListSuggestionsResponse";
  /** Ordered by descending confidence score. */
  suggestions?:
    | Suggestion[]
    | undefined;
  /** If the value is "", it means no further results for the request. */
  nextPageToken?:
    | string
    | undefined;
  /**
   * Total available suggestion size.
   * Note it is NOT the remaining available suggestion size after the current response.
   */
  totalSize?: number | undefined;
}

export interface UpdateSuggestionRequest {
  $type?: "pb.v1alpha1.UpdateSuggestionRequest";
  suggestion?:
    | Suggestion
    | undefined;
  /**
   * Support steps, status, complete_time, ready_time, create_time, and tags;
   * for example "status,tags" means only the status and tags fields will be
   * updated to the input value.
   *   - Although tags is a repeated field, it will be overriden by the input
   *     instead of combined.
   *   - If status is changed to CREATED/ACCEPTED/READY but the corresponding
   *     time is not provided, will update the corresponding time with current
   *     time.
   * If field_mask is empty, all updatble fields will be updated in the request
   */
  fieldMask?: string[] | undefined;
}

export interface UpdateSuggestionResponse {
  $type?: "pb.v1alpha1.UpdateSuggestionResponse";
  /** The updated suggestions. */
  suggestion?: Suggestion | undefined;
}

export interface BatchUpdateSuggestionsRequest {
  $type?: "pb.v1alpha1.BatchUpdateSuggestionsRequest";
  /** Username, which is user's email. */
  parent?:
    | string
    | undefined;
  /**
   * Can only update suggestion status, completeTime, and tags now.
   * Below default field_mask  is used if field_mask is not set inside individual request
   * A maximum of 100 suggestions can be modified in a batch.
   */
  requests?:
    | UpdateSuggestionRequest[]
    | undefined;
  /** Default field mask for all suggestions. Can be overriden by individual request. */
  fieldMask?: string[] | undefined;
}

export interface BatchUpdateSuggestionsResponse {
  $type?: "pb.v1alpha1.BatchUpdateSuggestionsResponse";
  /** Suggestions updated. */
  suggestions?:
    | Suggestion[]
    | undefined;
  /** Suggestions failed to be updated */
  missedSuggestions?: MissedSuggestion[] | undefined;
}

export interface MissedSuggestion {
  $type?: "pb.v1alpha1.MissedSuggestion";
  suggestion?: Suggestion | undefined;
  errorMsg?: string | undefined;
}

export interface SummarizeSuggestionsRequest {
  $type?: "pb.v1alpha1.SummarizeSuggestionsRequest";
  /** Parent resource ID, format: users/{username}. */
  parent?:
    | string
    | undefined;
  /**
   * Supports time filter now: format regex is \d+[dwm], which means XX
   * days/weeks/months. For example, "2w" means past two weeks.
   * Default value is two weeks if this field is not provided.
   */
  filter?:
    | string
    | undefined;
  /**
   * if no time zone provided in the request then we will consider
   * the PST time zone, America/Los_Angeles
   */
  location?: string | undefined;
}

export interface SummarizeSuggestionsResponse {
  $type?: "pb.v1alpha1.SummarizeSuggestionsResponse";
  /**
   * Accumulated number of effective tasks in chronological order.
   * If day1 has completed 5 suggestions from 2 tasks (A, B), and day2
   * completed 10 suggestions from 3 tasks (A, C, D) including 2 new tasks C &
   * D, the value will be [2,4].
   */
  accumulatedEffectiveTaskSizes?:
    | number[]
    | undefined;
  /**
   * Accumulated number of hours saved in chronological order.
   * If day1 saves 5.6 hours and day2 saves 3.8 hours, the value will be
   * [5.6, 9.4].
   */
  accumulatedTimeSavedHours?:
    | number[]
    | undefined;
  /** Effective tasks ordered by most recent accuracy. */
  effectiveTasks?:
    | Task[]
    | undefined;
  /**
   * Accumulated number of suggestion in chronological order.
   * If day1 has completed 5 suggestions  and day2
   * completed 10 suggestions , the value will be [5,10].
   */
  accumulatedCountOfSuggestions?: number[] | undefined;
}

export interface GetSuggestionRequest {
  $type?: "pb.v1alpha1.GetSuggestionRequest";
  /** Name of the Suggestion */
  name?:
    | string
    | undefined;
  /**
   * Use this to send only relevant data in response
   * - If Field Mask is not send or is sent with empty paths then the result will contain
   *    the complete object
   * - Valid values for field mask are: task_name, confidence, status, create_time, complete_time,
   *    time_saved, tags, task_resource_name, steps, performance, ready_time
   * - Field mask will always contain `name` field. Please donot send it in Paths to avoid errors.
   */
  fieldMask?: string[] | undefined;
}

export interface GetSuggestionNextStepsRequest {
  $type?: "pb.v1alpha1.GetSuggestionNextStepsRequest";
  suggestion?: Suggestion | undefined;
}

export interface GetSuggestionNextStepsResponse {
  $type?: "pb.v1alpha1.GetSuggestionNextStepsResponse";
  suggestion?: Suggestion | undefined;
}

function createBaseListSuggestionsRequest(): ListSuggestionsRequest {
  return {
    $type: "pb.v1alpha1.ListSuggestionsRequest",
    parent: "",
    pageSize: 0,
    pageToken: "",
    filter: "",
    fieldMask: undefined,
  };
}

export const ListSuggestionsRequest = {
  $type: "pb.v1alpha1.ListSuggestionsRequest" as const,

  encode(message: ListSuggestionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      writer.uint32(26).string(message.pageToken);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(34).string(message.filter);
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSuggestionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSuggestionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pageToken = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.filter = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListSuggestionsRequest {
    return {
      $type: ListSuggestionsRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: ListSuggestionsRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      obj.pageToken = message.pageToken;
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSuggestionsRequest>, I>>(base?: I): ListSuggestionsRequest {
    return ListSuggestionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListSuggestionsRequest>, I>>(object: I): ListSuggestionsRequest {
    const message = createBaseListSuggestionsRequest();
    message.parent = object.parent ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    message.filter = object.filter ?? "";
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(ListSuggestionsRequest.$type, ListSuggestionsRequest);

function createBaseListSuggestionsResponse(): ListSuggestionsResponse {
  return { $type: "pb.v1alpha1.ListSuggestionsResponse", suggestions: [], nextPageToken: "", totalSize: 0 };
}

export const ListSuggestionsResponse = {
  $type: "pb.v1alpha1.ListSuggestionsResponse" as const,

  encode(message: ListSuggestionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.suggestions !== undefined && message.suggestions.length !== 0) {
      for (const v of message.suggestions) {
        Suggestion.encode(v!, writer.uint32(10).fork()).ldelim();
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSuggestionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSuggestionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.suggestions!.push(Suggestion.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListSuggestionsResponse {
    return {
      $type: ListSuggestionsResponse.$type,
      suggestions: globalThis.Array.isArray(object?.suggestions)
        ? object.suggestions.map((e: any) => Suggestion.fromJSON(e))
        : [],
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListSuggestionsResponse): unknown {
    const obj: any = {};
    if (message.suggestions?.length) {
      obj.suggestions = message.suggestions.map((e) => Suggestion.toJSON(e));
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSuggestionsResponse>, I>>(base?: I): ListSuggestionsResponse {
    return ListSuggestionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListSuggestionsResponse>, I>>(object: I): ListSuggestionsResponse {
    const message = createBaseListSuggestionsResponse();
    message.suggestions = object.suggestions?.map((e) => Suggestion.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListSuggestionsResponse.$type, ListSuggestionsResponse);

function createBaseUpdateSuggestionRequest(): UpdateSuggestionRequest {
  return { $type: "pb.v1alpha1.UpdateSuggestionRequest", suggestion: undefined, fieldMask: undefined };
}

export const UpdateSuggestionRequest = {
  $type: "pb.v1alpha1.UpdateSuggestionRequest" as const,

  encode(message: UpdateSuggestionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.suggestion !== undefined) {
      Suggestion.encode(message.suggestion, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateSuggestionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateSuggestionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.suggestion = Suggestion.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateSuggestionRequest {
    return {
      $type: UpdateSuggestionRequest.$type,
      suggestion: isSet(object.suggestion) ? Suggestion.fromJSON(object.suggestion) : undefined,
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: UpdateSuggestionRequest): unknown {
    const obj: any = {};
    if (message.suggestion !== undefined) {
      obj.suggestion = Suggestion.toJSON(message.suggestion);
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateSuggestionRequest>, I>>(base?: I): UpdateSuggestionRequest {
    return UpdateSuggestionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateSuggestionRequest>, I>>(object: I): UpdateSuggestionRequest {
    const message = createBaseUpdateSuggestionRequest();
    message.suggestion = (object.suggestion !== undefined && object.suggestion !== null)
      ? Suggestion.fromPartial(object.suggestion)
      : undefined;
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateSuggestionRequest.$type, UpdateSuggestionRequest);

function createBaseUpdateSuggestionResponse(): UpdateSuggestionResponse {
  return { $type: "pb.v1alpha1.UpdateSuggestionResponse", suggestion: undefined };
}

export const UpdateSuggestionResponse = {
  $type: "pb.v1alpha1.UpdateSuggestionResponse" as const,

  encode(message: UpdateSuggestionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.suggestion !== undefined) {
      Suggestion.encode(message.suggestion, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateSuggestionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateSuggestionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.suggestion = Suggestion.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateSuggestionResponse {
    return {
      $type: UpdateSuggestionResponse.$type,
      suggestion: isSet(object.suggestion) ? Suggestion.fromJSON(object.suggestion) : undefined,
    };
  },

  toJSON(message: UpdateSuggestionResponse): unknown {
    const obj: any = {};
    if (message.suggestion !== undefined) {
      obj.suggestion = Suggestion.toJSON(message.suggestion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateSuggestionResponse>, I>>(base?: I): UpdateSuggestionResponse {
    return UpdateSuggestionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateSuggestionResponse>, I>>(object: I): UpdateSuggestionResponse {
    const message = createBaseUpdateSuggestionResponse();
    message.suggestion = (object.suggestion !== undefined && object.suggestion !== null)
      ? Suggestion.fromPartial(object.suggestion)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateSuggestionResponse.$type, UpdateSuggestionResponse);

function createBaseBatchUpdateSuggestionsRequest(): BatchUpdateSuggestionsRequest {
  return { $type: "pb.v1alpha1.BatchUpdateSuggestionsRequest", parent: "", requests: [], fieldMask: undefined };
}

export const BatchUpdateSuggestionsRequest = {
  $type: "pb.v1alpha1.BatchUpdateSuggestionsRequest" as const,

  encode(message: BatchUpdateSuggestionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.requests !== undefined && message.requests.length !== 0) {
      for (const v of message.requests) {
        UpdateSuggestionRequest.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchUpdateSuggestionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchUpdateSuggestionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.requests!.push(UpdateSuggestionRequest.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchUpdateSuggestionsRequest {
    return {
      $type: BatchUpdateSuggestionsRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      requests: globalThis.Array.isArray(object?.requests)
        ? object.requests.map((e: any) => UpdateSuggestionRequest.fromJSON(e))
        : [],
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: BatchUpdateSuggestionsRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    if (message.requests?.length) {
      obj.requests = message.requests.map((e) => UpdateSuggestionRequest.toJSON(e));
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BatchUpdateSuggestionsRequest>, I>>(base?: I): BatchUpdateSuggestionsRequest {
    return BatchUpdateSuggestionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BatchUpdateSuggestionsRequest>, I>>(
    object: I,
  ): BatchUpdateSuggestionsRequest {
    const message = createBaseBatchUpdateSuggestionsRequest();
    message.parent = object.parent ?? "";
    message.requests = object.requests?.map((e) => UpdateSuggestionRequest.fromPartial(e)) || [];
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(BatchUpdateSuggestionsRequest.$type, BatchUpdateSuggestionsRequest);

function createBaseBatchUpdateSuggestionsResponse(): BatchUpdateSuggestionsResponse {
  return { $type: "pb.v1alpha1.BatchUpdateSuggestionsResponse", suggestions: [], missedSuggestions: [] };
}

export const BatchUpdateSuggestionsResponse = {
  $type: "pb.v1alpha1.BatchUpdateSuggestionsResponse" as const,

  encode(message: BatchUpdateSuggestionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.suggestions !== undefined && message.suggestions.length !== 0) {
      for (const v of message.suggestions) {
        Suggestion.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.missedSuggestions !== undefined && message.missedSuggestions.length !== 0) {
      for (const v of message.missedSuggestions) {
        MissedSuggestion.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchUpdateSuggestionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchUpdateSuggestionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.suggestions!.push(Suggestion.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.missedSuggestions!.push(MissedSuggestion.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchUpdateSuggestionsResponse {
    return {
      $type: BatchUpdateSuggestionsResponse.$type,
      suggestions: globalThis.Array.isArray(object?.suggestions)
        ? object.suggestions.map((e: any) => Suggestion.fromJSON(e))
        : [],
      missedSuggestions: globalThis.Array.isArray(object?.missedSuggestions)
        ? object.missedSuggestions.map((e: any) => MissedSuggestion.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BatchUpdateSuggestionsResponse): unknown {
    const obj: any = {};
    if (message.suggestions?.length) {
      obj.suggestions = message.suggestions.map((e) => Suggestion.toJSON(e));
    }
    if (message.missedSuggestions?.length) {
      obj.missedSuggestions = message.missedSuggestions.map((e) => MissedSuggestion.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BatchUpdateSuggestionsResponse>, I>>(base?: I): BatchUpdateSuggestionsResponse {
    return BatchUpdateSuggestionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BatchUpdateSuggestionsResponse>, I>>(
    object: I,
  ): BatchUpdateSuggestionsResponse {
    const message = createBaseBatchUpdateSuggestionsResponse();
    message.suggestions = object.suggestions?.map((e) => Suggestion.fromPartial(e)) || [];
    message.missedSuggestions = object.missedSuggestions?.map((e) => MissedSuggestion.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(BatchUpdateSuggestionsResponse.$type, BatchUpdateSuggestionsResponse);

function createBaseMissedSuggestion(): MissedSuggestion {
  return { $type: "pb.v1alpha1.MissedSuggestion", suggestion: undefined, errorMsg: "" };
}

export const MissedSuggestion = {
  $type: "pb.v1alpha1.MissedSuggestion" as const,

  encode(message: MissedSuggestion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.suggestion !== undefined) {
      Suggestion.encode(message.suggestion, writer.uint32(10).fork()).ldelim();
    }
    if (message.errorMsg !== undefined && message.errorMsg !== "") {
      writer.uint32(18).string(message.errorMsg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MissedSuggestion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMissedSuggestion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.suggestion = Suggestion.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.errorMsg = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MissedSuggestion {
    return {
      $type: MissedSuggestion.$type,
      suggestion: isSet(object.suggestion) ? Suggestion.fromJSON(object.suggestion) : undefined,
      errorMsg: isSet(object.errorMsg) ? globalThis.String(object.errorMsg) : "",
    };
  },

  toJSON(message: MissedSuggestion): unknown {
    const obj: any = {};
    if (message.suggestion !== undefined) {
      obj.suggestion = Suggestion.toJSON(message.suggestion);
    }
    if (message.errorMsg !== undefined && message.errorMsg !== "") {
      obj.errorMsg = message.errorMsg;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MissedSuggestion>, I>>(base?: I): MissedSuggestion {
    return MissedSuggestion.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MissedSuggestion>, I>>(object: I): MissedSuggestion {
    const message = createBaseMissedSuggestion();
    message.suggestion = (object.suggestion !== undefined && object.suggestion !== null)
      ? Suggestion.fromPartial(object.suggestion)
      : undefined;
    message.errorMsg = object.errorMsg ?? "";
    return message;
  },
};

messageTypeRegistry.set(MissedSuggestion.$type, MissedSuggestion);

function createBaseSummarizeSuggestionsRequest(): SummarizeSuggestionsRequest {
  return { $type: "pb.v1alpha1.SummarizeSuggestionsRequest", parent: "", filter: "", location: "" };
}

export const SummarizeSuggestionsRequest = {
  $type: "pb.v1alpha1.SummarizeSuggestionsRequest" as const,

  encode(message: SummarizeSuggestionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(18).string(message.filter);
    }
    if (message.location !== undefined && message.location !== "") {
      writer.uint32(26).string(message.location);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SummarizeSuggestionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSummarizeSuggestionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.filter = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.location = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SummarizeSuggestionsRequest {
    return {
      $type: SummarizeSuggestionsRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
      location: isSet(object.location) ? globalThis.String(object.location) : "",
    };
  },

  toJSON(message: SummarizeSuggestionsRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    if (message.location !== undefined && message.location !== "") {
      obj.location = message.location;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SummarizeSuggestionsRequest>, I>>(base?: I): SummarizeSuggestionsRequest {
    return SummarizeSuggestionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SummarizeSuggestionsRequest>, I>>(object: I): SummarizeSuggestionsRequest {
    const message = createBaseSummarizeSuggestionsRequest();
    message.parent = object.parent ?? "";
    message.filter = object.filter ?? "";
    message.location = object.location ?? "";
    return message;
  },
};

messageTypeRegistry.set(SummarizeSuggestionsRequest.$type, SummarizeSuggestionsRequest);

function createBaseSummarizeSuggestionsResponse(): SummarizeSuggestionsResponse {
  return {
    $type: "pb.v1alpha1.SummarizeSuggestionsResponse",
    accumulatedEffectiveTaskSizes: [],
    accumulatedTimeSavedHours: [],
    effectiveTasks: [],
    accumulatedCountOfSuggestions: [],
  };
}

export const SummarizeSuggestionsResponse = {
  $type: "pb.v1alpha1.SummarizeSuggestionsResponse" as const,

  encode(message: SummarizeSuggestionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accumulatedEffectiveTaskSizes !== undefined && message.accumulatedEffectiveTaskSizes.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.accumulatedEffectiveTaskSizes) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.accumulatedTimeSavedHours !== undefined && message.accumulatedTimeSavedHours.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.accumulatedTimeSavedHours) {
        writer.float(v);
      }
      writer.ldelim();
    }
    if (message.effectiveTasks !== undefined && message.effectiveTasks.length !== 0) {
      for (const v of message.effectiveTasks) {
        Task.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.accumulatedCountOfSuggestions !== undefined && message.accumulatedCountOfSuggestions.length !== 0) {
      writer.uint32(34).fork();
      for (const v of message.accumulatedCountOfSuggestions) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SummarizeSuggestionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSummarizeSuggestionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.accumulatedEffectiveTaskSizes!.push(reader.int32());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.accumulatedEffectiveTaskSizes!.push(reader.int32());
            }

            continue;
          }

          break;
        case 2:
          if (tag === 21) {
            message.accumulatedTimeSavedHours!.push(reader.float());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.accumulatedTimeSavedHours!.push(reader.float());
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.effectiveTasks!.push(Task.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag === 32) {
            message.accumulatedCountOfSuggestions!.push(reader.int32());

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.accumulatedCountOfSuggestions!.push(reader.int32());
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

  fromJSON(object: any): SummarizeSuggestionsResponse {
    return {
      $type: SummarizeSuggestionsResponse.$type,
      accumulatedEffectiveTaskSizes: globalThis.Array.isArray(object?.accumulatedEffectiveTaskSizes)
        ? object.accumulatedEffectiveTaskSizes.map((e: any) => globalThis.Number(e))
        : [],
      accumulatedTimeSavedHours: globalThis.Array.isArray(object?.accumulatedTimeSavedHours)
        ? object.accumulatedTimeSavedHours.map((e: any) => globalThis.Number(e))
        : [],
      effectiveTasks: globalThis.Array.isArray(object?.effectiveTasks)
        ? object.effectiveTasks.map((e: any) => Task.fromJSON(e))
        : [],
      accumulatedCountOfSuggestions: globalThis.Array.isArray(object?.accumulatedCountOfSuggestions)
        ? object.accumulatedCountOfSuggestions.map((e: any) => globalThis.Number(e))
        : [],
    };
  },

  toJSON(message: SummarizeSuggestionsResponse): unknown {
    const obj: any = {};
    if (message.accumulatedEffectiveTaskSizes?.length) {
      obj.accumulatedEffectiveTaskSizes = message.accumulatedEffectiveTaskSizes.map((e) => Math.round(e));
    }
    if (message.accumulatedTimeSavedHours?.length) {
      obj.accumulatedTimeSavedHours = message.accumulatedTimeSavedHours;
    }
    if (message.effectiveTasks?.length) {
      obj.effectiveTasks = message.effectiveTasks.map((e) => Task.toJSON(e));
    }
    if (message.accumulatedCountOfSuggestions?.length) {
      obj.accumulatedCountOfSuggestions = message.accumulatedCountOfSuggestions.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SummarizeSuggestionsResponse>, I>>(base?: I): SummarizeSuggestionsResponse {
    return SummarizeSuggestionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SummarizeSuggestionsResponse>, I>>(object: I): SummarizeSuggestionsResponse {
    const message = createBaseSummarizeSuggestionsResponse();
    message.accumulatedEffectiveTaskSizes = object.accumulatedEffectiveTaskSizes?.map((e) => e) || [];
    message.accumulatedTimeSavedHours = object.accumulatedTimeSavedHours?.map((e) => e) || [];
    message.effectiveTasks = object.effectiveTasks?.map((e) => Task.fromPartial(e)) || [];
    message.accumulatedCountOfSuggestions = object.accumulatedCountOfSuggestions?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(SummarizeSuggestionsResponse.$type, SummarizeSuggestionsResponse);

function createBaseGetSuggestionRequest(): GetSuggestionRequest {
  return { $type: "pb.v1alpha1.GetSuggestionRequest", name: "", fieldMask: undefined };
}

export const GetSuggestionRequest = {
  $type: "pb.v1alpha1.GetSuggestionRequest" as const,

  encode(message: GetSuggestionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSuggestionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSuggestionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSuggestionRequest {
    return {
      $type: GetSuggestionRequest.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: GetSuggestionRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSuggestionRequest>, I>>(base?: I): GetSuggestionRequest {
    return GetSuggestionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSuggestionRequest>, I>>(object: I): GetSuggestionRequest {
    const message = createBaseGetSuggestionRequest();
    message.name = object.name ?? "";
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(GetSuggestionRequest.$type, GetSuggestionRequest);

function createBaseGetSuggestionNextStepsRequest(): GetSuggestionNextStepsRequest {
  return { $type: "pb.v1alpha1.GetSuggestionNextStepsRequest", suggestion: undefined };
}

export const GetSuggestionNextStepsRequest = {
  $type: "pb.v1alpha1.GetSuggestionNextStepsRequest" as const,

  encode(message: GetSuggestionNextStepsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.suggestion !== undefined) {
      Suggestion.encode(message.suggestion, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSuggestionNextStepsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSuggestionNextStepsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.suggestion = Suggestion.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSuggestionNextStepsRequest {
    return {
      $type: GetSuggestionNextStepsRequest.$type,
      suggestion: isSet(object.suggestion) ? Suggestion.fromJSON(object.suggestion) : undefined,
    };
  },

  toJSON(message: GetSuggestionNextStepsRequest): unknown {
    const obj: any = {};
    if (message.suggestion !== undefined) {
      obj.suggestion = Suggestion.toJSON(message.suggestion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSuggestionNextStepsRequest>, I>>(base?: I): GetSuggestionNextStepsRequest {
    return GetSuggestionNextStepsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSuggestionNextStepsRequest>, I>>(
    object: I,
  ): GetSuggestionNextStepsRequest {
    const message = createBaseGetSuggestionNextStepsRequest();
    message.suggestion = (object.suggestion !== undefined && object.suggestion !== null)
      ? Suggestion.fromPartial(object.suggestion)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetSuggestionNextStepsRequest.$type, GetSuggestionNextStepsRequest);

function createBaseGetSuggestionNextStepsResponse(): GetSuggestionNextStepsResponse {
  return { $type: "pb.v1alpha1.GetSuggestionNextStepsResponse", suggestion: undefined };
}

export const GetSuggestionNextStepsResponse = {
  $type: "pb.v1alpha1.GetSuggestionNextStepsResponse" as const,

  encode(message: GetSuggestionNextStepsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.suggestion !== undefined) {
      Suggestion.encode(message.suggestion, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSuggestionNextStepsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSuggestionNextStepsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.suggestion = Suggestion.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSuggestionNextStepsResponse {
    return {
      $type: GetSuggestionNextStepsResponse.$type,
      suggestion: isSet(object.suggestion) ? Suggestion.fromJSON(object.suggestion) : undefined,
    };
  },

  toJSON(message: GetSuggestionNextStepsResponse): unknown {
    const obj: any = {};
    if (message.suggestion !== undefined) {
      obj.suggestion = Suggestion.toJSON(message.suggestion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSuggestionNextStepsResponse>, I>>(base?: I): GetSuggestionNextStepsResponse {
    return GetSuggestionNextStepsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSuggestionNextStepsResponse>, I>>(
    object: I,
  ): GetSuggestionNextStepsResponse {
    const message = createBaseGetSuggestionNextStepsResponse();
    message.suggestion = (object.suggestion !== undefined && object.suggestion !== null)
      ? Suggestion.fromPartial(object.suggestion)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetSuggestionNextStepsResponse.$type, GetSuggestionNextStepsResponse);

export interface Suggestions {
  /**
   * Lists open suggestions ordered by descending confidence. If valid_page token is provided, it
   * returns either suggestions whose confidence score is equal or small than the last suggestion
   * returned in previous request, or new suggetions whose confidence score is higher than last
   * suggestion and generated after previous request.
   */
  ListSuggestions(
    request: DeepPartial<ListSuggestionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListSuggestionsResponse>;
  /** Support updating steps, status, complete_time, ready_time, create_time, tags */
  UpdateSuggestion(
    request: DeepPartial<UpdateSuggestionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateSuggestionResponse>;
  BatchUpdateSuggestions(
    request: DeepPartial<BatchUpdateSuggestionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<BatchUpdateSuggestionsResponse>;
  /** Generates statistical summaries for completed suggestions. */
  SummarizeSuggestions(
    request: DeepPartial<SummarizeSuggestionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SummarizeSuggestionsResponse>;
  /** Suggesstion details for a perticular suggestion */
  GetSuggestion(request: DeepPartial<GetSuggestionRequest>, metadata?: grpc.Metadata): Promise<Suggestion>;
  /**
   * Retrieve next steps for a preliminary suggestion, for example when finishing processing a
   * preliminary execution suggestion step.
   *
   * The request contains a suggestion which often includes client side updates caused by
   * preliminary execution steps, e.g. email attachment content. Therefore the provided suggestion
   * is used to update its server version first, calculate its next steps and return next steps.
   *
   * The response is the updated suggestion with its resource name and new steps only. Client side
   * should merge these new steps into the client side suggestion copy, or call GetSuggestion()
   * instead if client side copy is missing.
   *
   * There are two special response cases:
   * 1. If an END STEP {"display_name": "End", "activity": "Activity_END" } is returned in the end of
   * the new step list, it means server won't generate new steps for this suggestion.
   * 2. If we are returning an error, it means the suggestion stays at its current step, either
   * because an END STEP is defined or its latest step is still incomplete.
   */
  GetSuggestionNextSteps(
    request: DeepPartial<GetSuggestionNextStepsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetSuggestionNextStepsResponse>;
}

export class SuggestionsClientImpl implements Suggestions {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListSuggestions = this.ListSuggestions.bind(this);
    this.UpdateSuggestion = this.UpdateSuggestion.bind(this);
    this.BatchUpdateSuggestions = this.BatchUpdateSuggestions.bind(this);
    this.SummarizeSuggestions = this.SummarizeSuggestions.bind(this);
    this.GetSuggestion = this.GetSuggestion.bind(this);
    this.GetSuggestionNextSteps = this.GetSuggestionNextSteps.bind(this);
  }

  ListSuggestions(
    request: DeepPartial<ListSuggestionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListSuggestionsResponse> {
    return this.rpc.unary(SuggestionsListSuggestionsDesc, ListSuggestionsRequest.fromPartial(request), metadata);
  }

  UpdateSuggestion(
    request: DeepPartial<UpdateSuggestionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateSuggestionResponse> {
    return this.rpc.unary(SuggestionsUpdateSuggestionDesc, UpdateSuggestionRequest.fromPartial(request), metadata);
  }

  BatchUpdateSuggestions(
    request: DeepPartial<BatchUpdateSuggestionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<BatchUpdateSuggestionsResponse> {
    return this.rpc.unary(
      SuggestionsBatchUpdateSuggestionsDesc,
      BatchUpdateSuggestionsRequest.fromPartial(request),
      metadata,
    );
  }

  SummarizeSuggestions(
    request: DeepPartial<SummarizeSuggestionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SummarizeSuggestionsResponse> {
    return this.rpc.unary(
      SuggestionsSummarizeSuggestionsDesc,
      SummarizeSuggestionsRequest.fromPartial(request),
      metadata,
    );
  }

  GetSuggestion(request: DeepPartial<GetSuggestionRequest>, metadata?: grpc.Metadata): Promise<Suggestion> {
    return this.rpc.unary(SuggestionsGetSuggestionDesc, GetSuggestionRequest.fromPartial(request), metadata);
  }

  GetSuggestionNextSteps(
    request: DeepPartial<GetSuggestionNextStepsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetSuggestionNextStepsResponse> {
    return this.rpc.unary(
      SuggestionsGetSuggestionNextStepsDesc,
      GetSuggestionNextStepsRequest.fromPartial(request),
      metadata,
    );
  }
}

export const SuggestionsDesc = { serviceName: "pb.v1alpha1.Suggestions" };

export const SuggestionsListSuggestionsDesc: UnaryMethodDefinitionish = {
  methodName: "ListSuggestions",
  service: SuggestionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListSuggestionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListSuggestionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SuggestionsUpdateSuggestionDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateSuggestion",
  service: SuggestionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateSuggestionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateSuggestionResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SuggestionsBatchUpdateSuggestionsDesc: UnaryMethodDefinitionish = {
  methodName: "BatchUpdateSuggestions",
  service: SuggestionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return BatchUpdateSuggestionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = BatchUpdateSuggestionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SuggestionsSummarizeSuggestionsDesc: UnaryMethodDefinitionish = {
  methodName: "SummarizeSuggestions",
  service: SuggestionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SummarizeSuggestionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SummarizeSuggestionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SuggestionsGetSuggestionDesc: UnaryMethodDefinitionish = {
  methodName: "GetSuggestion",
  service: SuggestionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetSuggestionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Suggestion.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const SuggestionsGetSuggestionNextStepsDesc: UnaryMethodDefinitionish = {
  methodName: "GetSuggestionNextSteps",
  service: SuggestionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetSuggestionNextStepsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetSuggestionNextStepsResponse.decode(data);
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
