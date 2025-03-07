/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export interface Payload {
  $type?: "pb.v1alpha1.Payload";
  id?: string | undefined;
  url?: string | undefined;
  method?: string | undefined;
  requestType?: string | undefined;
  requestBody?: string | undefined;
  response?: string | undefined;
  responseText?: string | undefined;
  responseStatus?: number | undefined;
  responseStatusText?: string | undefined;
  responseType?: string | undefined;
  happenedAt?: number | undefined;
  payloadId?: string | undefined;
}

export interface Event {
  $type?: "pb.v1alpha1.Event";
  payload?: string | undefined;
  happenedAt?: Date | undefined;
  eventId?: string | undefined;
  payloadId?: string | undefined;
}

export interface MissedPayload {
  $type?: "pb.v1alpha1.MissedPayload";
  index?: number | undefined;
  errorMsg?: string | undefined;
  eventId?: string | undefined;
  payloadId?: string | undefined;
}

export interface BestEffortUploadRequest {
  $type?: "pb.v1alpha1.BestEffortUploadRequest";
  events?: Event[] | undefined;
}

export interface BestEffortUploadResponse {
  $type?: "pb.v1alpha1.BestEffortUploadResponse";
  missedPayloads?: MissedPayload[] | undefined;
}

function createBasePayload(): Payload {
  return {
    $type: "pb.v1alpha1.Payload",
    id: "",
    url: "",
    method: "",
    requestType: "",
    requestBody: "",
    response: "",
    responseText: "",
    responseStatus: 0,
    responseStatusText: "",
    responseType: "",
    happenedAt: 0,
    payloadId: "",
  };
}

export const Payload = {
  $type: "pb.v1alpha1.Payload" as const,

  encode(message: Payload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.method !== undefined && message.method !== "") {
      writer.uint32(26).string(message.method);
    }
    if (message.requestType !== undefined && message.requestType !== "") {
      writer.uint32(34).string(message.requestType);
    }
    if (message.requestBody !== undefined && message.requestBody !== "") {
      writer.uint32(42).string(message.requestBody);
    }
    if (message.response !== undefined && message.response !== "") {
      writer.uint32(50).string(message.response);
    }
    if (message.responseText !== undefined && message.responseText !== "") {
      writer.uint32(58).string(message.responseText);
    }
    if (message.responseStatus !== undefined && message.responseStatus !== 0) {
      writer.uint32(64).int32(message.responseStatus);
    }
    if (message.responseStatusText !== undefined && message.responseStatusText !== "") {
      writer.uint32(74).string(message.responseStatusText);
    }
    if (message.responseType !== undefined && message.responseType !== "") {
      writer.uint32(82).string(message.responseType);
    }
    if (message.happenedAt !== undefined && message.happenedAt !== 0) {
      writer.uint32(88).int64(message.happenedAt);
    }
    if (message.payloadId !== undefined && message.payloadId !== "") {
      writer.uint32(98).string(message.payloadId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Payload {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayload();
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

          message.method = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.requestType = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.requestBody = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.response = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.responseText = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.responseStatus = reader.int32();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.responseStatusText = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.responseType = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.happenedAt = longToNumber(reader.int64() as Long);
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.payloadId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Payload {
    return {
      $type: Payload.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      method: isSet(object.method) ? globalThis.String(object.method) : "",
      requestType: isSet(object.requestType) ? globalThis.String(object.requestType) : "",
      requestBody: isSet(object.requestBody) ? globalThis.String(object.requestBody) : "",
      response: isSet(object.response) ? globalThis.String(object.response) : "",
      responseText: isSet(object.responseText) ? globalThis.String(object.responseText) : "",
      responseStatus: isSet(object.responseStatus) ? globalThis.Number(object.responseStatus) : 0,
      responseStatusText: isSet(object.responseStatusText) ? globalThis.String(object.responseStatusText) : "",
      responseType: isSet(object.responseType) ? globalThis.String(object.responseType) : "",
      happenedAt: isSet(object.happenedAt) ? globalThis.Number(object.happenedAt) : 0,
      payloadId: isSet(object.payloadId) ? globalThis.String(object.payloadId) : "",
    };
  },

  toJSON(message: Payload): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    if (message.method !== undefined && message.method !== "") {
      obj.method = message.method;
    }
    if (message.requestType !== undefined && message.requestType !== "") {
      obj.requestType = message.requestType;
    }
    if (message.requestBody !== undefined && message.requestBody !== "") {
      obj.requestBody = message.requestBody;
    }
    if (message.response !== undefined && message.response !== "") {
      obj.response = message.response;
    }
    if (message.responseText !== undefined && message.responseText !== "") {
      obj.responseText = message.responseText;
    }
    if (message.responseStatus !== undefined && message.responseStatus !== 0) {
      obj.responseStatus = Math.round(message.responseStatus);
    }
    if (message.responseStatusText !== undefined && message.responseStatusText !== "") {
      obj.responseStatusText = message.responseStatusText;
    }
    if (message.responseType !== undefined && message.responseType !== "") {
      obj.responseType = message.responseType;
    }
    if (message.happenedAt !== undefined && message.happenedAt !== 0) {
      obj.happenedAt = Math.round(message.happenedAt);
    }
    if (message.payloadId !== undefined && message.payloadId !== "") {
      obj.payloadId = message.payloadId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Payload>, I>>(base?: I): Payload {
    return Payload.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Payload>, I>>(object: I): Payload {
    const message = createBasePayload();
    message.id = object.id ?? "";
    message.url = object.url ?? "";
    message.method = object.method ?? "";
    message.requestType = object.requestType ?? "";
    message.requestBody = object.requestBody ?? "";
    message.response = object.response ?? "";
    message.responseText = object.responseText ?? "";
    message.responseStatus = object.responseStatus ?? 0;
    message.responseStatusText = object.responseStatusText ?? "";
    message.responseType = object.responseType ?? "";
    message.happenedAt = object.happenedAt ?? 0;
    message.payloadId = object.payloadId ?? "";
    return message;
  },
};

messageTypeRegistry.set(Payload.$type, Payload);

function createBaseEvent(): Event {
  return { $type: "pb.v1alpha1.Event", payload: "", happenedAt: undefined, eventId: "", payloadId: "" };
}

export const Event = {
  $type: "pb.v1alpha1.Event" as const,

  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.payload !== undefined && message.payload !== "") {
      writer.uint32(10).string(message.payload);
    }
    if (message.happenedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.happenedAt), writer.uint32(18).fork()).ldelim();
    }
    if (message.eventId !== undefined && message.eventId !== "") {
      writer.uint32(26).string(message.eventId);
    }
    if (message.payloadId !== undefined && message.payloadId !== "") {
      writer.uint32(34).string(message.payloadId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.payload = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.happenedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.eventId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.payloadId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      $type: Event.$type,
      payload: isSet(object.payload) ? globalThis.String(object.payload) : "",
      happenedAt: isSet(object.happenedAt) ? fromJsonTimestamp(object.happenedAt) : undefined,
      eventId: isSet(object.eventId) ? globalThis.String(object.eventId) : "",
      payloadId: isSet(object.payloadId) ? globalThis.String(object.payloadId) : "",
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    if (message.payload !== undefined && message.payload !== "") {
      obj.payload = message.payload;
    }
    if (message.happenedAt !== undefined) {
      obj.happenedAt = message.happenedAt.toISOString();
    }
    if (message.eventId !== undefined && message.eventId !== "") {
      obj.eventId = message.eventId;
    }
    if (message.payloadId !== undefined && message.payloadId !== "") {
      obj.payloadId = message.payloadId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Event>, I>>(base?: I): Event {
    return Event.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.payload = object.payload ?? "";
    message.happenedAt = object.happenedAt ?? undefined;
    message.eventId = object.eventId ?? "";
    message.payloadId = object.payloadId ?? "";
    return message;
  },
};

messageTypeRegistry.set(Event.$type, Event);

function createBaseMissedPayload(): MissedPayload {
  return { $type: "pb.v1alpha1.MissedPayload", index: 0, errorMsg: "", eventId: "", payloadId: "" };
}

export const MissedPayload = {
  $type: "pb.v1alpha1.MissedPayload" as const,

  encode(message: MissedPayload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== undefined && message.index !== 0) {
      writer.uint32(8).int32(message.index);
    }
    if (message.errorMsg !== undefined && message.errorMsg !== "") {
      writer.uint32(18).string(message.errorMsg);
    }
    if (message.eventId !== undefined && message.eventId !== "") {
      writer.uint32(26).string(message.eventId);
    }
    if (message.payloadId !== undefined && message.payloadId !== "") {
      writer.uint32(34).string(message.payloadId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MissedPayload {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMissedPayload();
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

          message.errorMsg = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.eventId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.payloadId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MissedPayload {
    return {
      $type: MissedPayload.$type,
      index: isSet(object.index) ? globalThis.Number(object.index) : 0,
      errorMsg: isSet(object.errorMsg) ? globalThis.String(object.errorMsg) : "",
      eventId: isSet(object.eventId) ? globalThis.String(object.eventId) : "",
      payloadId: isSet(object.payloadId) ? globalThis.String(object.payloadId) : "",
    };
  },

  toJSON(message: MissedPayload): unknown {
    const obj: any = {};
    if (message.index !== undefined && message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    if (message.errorMsg !== undefined && message.errorMsg !== "") {
      obj.errorMsg = message.errorMsg;
    }
    if (message.eventId !== undefined && message.eventId !== "") {
      obj.eventId = message.eventId;
    }
    if (message.payloadId !== undefined && message.payloadId !== "") {
      obj.payloadId = message.payloadId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MissedPayload>, I>>(base?: I): MissedPayload {
    return MissedPayload.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MissedPayload>, I>>(object: I): MissedPayload {
    const message = createBaseMissedPayload();
    message.index = object.index ?? 0;
    message.errorMsg = object.errorMsg ?? "";
    message.eventId = object.eventId ?? "";
    message.payloadId = object.payloadId ?? "";
    return message;
  },
};

messageTypeRegistry.set(MissedPayload.$type, MissedPayload);

function createBaseBestEffortUploadRequest(): BestEffortUploadRequest {
  return { $type: "pb.v1alpha1.BestEffortUploadRequest", events: [] };
}

export const BestEffortUploadRequest = {
  $type: "pb.v1alpha1.BestEffortUploadRequest" as const,

  encode(message: BestEffortUploadRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.events !== undefined && message.events.length !== 0) {
      for (const v of message.events) {
        Event.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BestEffortUploadRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBestEffortUploadRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.events!.push(Event.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BestEffortUploadRequest {
    return {
      $type: BestEffortUploadRequest.$type,
      events: globalThis.Array.isArray(object?.events) ? object.events.map((e: any) => Event.fromJSON(e)) : [],
    };
  },

  toJSON(message: BestEffortUploadRequest): unknown {
    const obj: any = {};
    if (message.events?.length) {
      obj.events = message.events.map((e) => Event.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BestEffortUploadRequest>, I>>(base?: I): BestEffortUploadRequest {
    return BestEffortUploadRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BestEffortUploadRequest>, I>>(object: I): BestEffortUploadRequest {
    const message = createBaseBestEffortUploadRequest();
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(BestEffortUploadRequest.$type, BestEffortUploadRequest);

function createBaseBestEffortUploadResponse(): BestEffortUploadResponse {
  return { $type: "pb.v1alpha1.BestEffortUploadResponse", missedPayloads: [] };
}

export const BestEffortUploadResponse = {
  $type: "pb.v1alpha1.BestEffortUploadResponse" as const,

  encode(message: BestEffortUploadResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.missedPayloads !== undefined && message.missedPayloads.length !== 0) {
      for (const v of message.missedPayloads) {
        MissedPayload.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BestEffortUploadResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBestEffortUploadResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.missedPayloads!.push(MissedPayload.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BestEffortUploadResponse {
    return {
      $type: BestEffortUploadResponse.$type,
      missedPayloads: globalThis.Array.isArray(object?.missedPayloads)
        ? object.missedPayloads.map((e: any) => MissedPayload.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BestEffortUploadResponse): unknown {
    const obj: any = {};
    if (message.missedPayloads?.length) {
      obj.missedPayloads = message.missedPayloads.map((e) => MissedPayload.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BestEffortUploadResponse>, I>>(base?: I): BestEffortUploadResponse {
    return BestEffortUploadResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BestEffortUploadResponse>, I>>(object: I): BestEffortUploadResponse {
    const message = createBaseBestEffortUploadResponse();
    message.missedPayloads = object.missedPayloads?.map((e) => MissedPayload.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(BestEffortUploadResponse.$type, BestEffortUploadResponse);

export interface Events {
  BestEffortUpload(
    request: DeepPartial<BestEffortUploadRequest>,
    metadata?: grpc.Metadata,
  ): Promise<BestEffortUploadResponse>;
}

export class EventsClientImpl implements Events {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.BestEffortUpload = this.BestEffortUpload.bind(this);
  }

  BestEffortUpload(
    request: DeepPartial<BestEffortUploadRequest>,
    metadata?: grpc.Metadata,
  ): Promise<BestEffortUploadResponse> {
    return this.rpc.unary(EventsBestEffortUploadDesc, BestEffortUploadRequest.fromPartial(request), metadata);
  }
}

export const EventsDesc = { serviceName: "pb.v1alpha1.Events" };

export const EventsBestEffortUploadDesc: UnaryMethodDefinitionish = {
  methodName: "BestEffortUpload",
  service: EventsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return BestEffortUploadRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = BestEffortUploadResponse.decode(data);
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

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
