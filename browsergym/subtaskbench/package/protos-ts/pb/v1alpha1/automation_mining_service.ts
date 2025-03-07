/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export interface GenerateActivityGraphRequest {
  $type?: "pb.v1alpha1.GenerateActivityGraphRequest";
  start?: Date | undefined;
  end?: Date | undefined;
}

export interface GenerateActivityGraphResponse {
  $type?: "pb.v1alpha1.GenerateActivityGraphResponse";
  activityGraph?:
    | Uint8Array
    | undefined;
  /**
   * An IANA published MIME type (also referred to as media type). For more
   * information, see
   * https://www.iana.org/assignments/media-types/media-types.xhtml.
   */
  mimeType?:
    | string
    | undefined;
  /** DOT: https://graphviz.org/doc/info/lang.html */
  dotSource?: string | undefined;
}

function createBaseGenerateActivityGraphRequest(): GenerateActivityGraphRequest {
  return { $type: "pb.v1alpha1.GenerateActivityGraphRequest", start: undefined, end: undefined };
}

export const GenerateActivityGraphRequest = {
  $type: "pb.v1alpha1.GenerateActivityGraphRequest" as const,

  encode(message: GenerateActivityGraphRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== undefined) {
      Timestamp.encode(toTimestamp(message.start), writer.uint32(10).fork()).ldelim();
    }
    if (message.end !== undefined) {
      Timestamp.encode(toTimestamp(message.end), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateActivityGraphRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateActivityGraphRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.start = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.end = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateActivityGraphRequest {
    return {
      $type: GenerateActivityGraphRequest.$type,
      start: isSet(object.start) ? fromJsonTimestamp(object.start) : undefined,
      end: isSet(object.end) ? fromJsonTimestamp(object.end) : undefined,
    };
  },

  toJSON(message: GenerateActivityGraphRequest): unknown {
    const obj: any = {};
    if (message.start !== undefined) {
      obj.start = message.start.toISOString();
    }
    if (message.end !== undefined) {
      obj.end = message.end.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateActivityGraphRequest>, I>>(base?: I): GenerateActivityGraphRequest {
    return GenerateActivityGraphRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateActivityGraphRequest>, I>>(object: I): GenerateActivityGraphRequest {
    const message = createBaseGenerateActivityGraphRequest();
    message.start = object.start ?? undefined;
    message.end = object.end ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(GenerateActivityGraphRequest.$type, GenerateActivityGraphRequest);

function createBaseGenerateActivityGraphResponse(): GenerateActivityGraphResponse {
  return {
    $type: "pb.v1alpha1.GenerateActivityGraphResponse",
    activityGraph: new Uint8Array(0),
    mimeType: "",
    dotSource: "",
  };
}

export const GenerateActivityGraphResponse = {
  $type: "pb.v1alpha1.GenerateActivityGraphResponse" as const,

  encode(message: GenerateActivityGraphResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.activityGraph !== undefined && message.activityGraph.length !== 0) {
      writer.uint32(10).bytes(message.activityGraph);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      writer.uint32(18).string(message.mimeType);
    }
    if (message.dotSource !== undefined && message.dotSource !== "") {
      writer.uint32(26).string(message.dotSource);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateActivityGraphResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateActivityGraphResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.activityGraph = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.mimeType = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.dotSource = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateActivityGraphResponse {
    return {
      $type: GenerateActivityGraphResponse.$type,
      activityGraph: isSet(object.activityGraph) ? bytesFromBase64(object.activityGraph) : new Uint8Array(0),
      mimeType: isSet(object.mimeType) ? globalThis.String(object.mimeType) : "",
      dotSource: isSet(object.dotSource) ? globalThis.String(object.dotSource) : "",
    };
  },

  toJSON(message: GenerateActivityGraphResponse): unknown {
    const obj: any = {};
    if (message.activityGraph !== undefined && message.activityGraph.length !== 0) {
      obj.activityGraph = base64FromBytes(message.activityGraph);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      obj.mimeType = message.mimeType;
    }
    if (message.dotSource !== undefined && message.dotSource !== "") {
      obj.dotSource = message.dotSource;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateActivityGraphResponse>, I>>(base?: I): GenerateActivityGraphResponse {
    return GenerateActivityGraphResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateActivityGraphResponse>, I>>(
    object: I,
  ): GenerateActivityGraphResponse {
    const message = createBaseGenerateActivityGraphResponse();
    message.activityGraph = object.activityGraph ?? new Uint8Array(0);
    message.mimeType = object.mimeType ?? "";
    message.dotSource = object.dotSource ?? "";
    return message;
  },
};

messageTypeRegistry.set(GenerateActivityGraphResponse.$type, GenerateActivityGraphResponse);

export interface AutomationMining {
  GenerateActivityGraph(
    request: DeepPartial<GenerateActivityGraphRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GenerateActivityGraphResponse>;
}

export class AutomationMiningClientImpl implements AutomationMining {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GenerateActivityGraph = this.GenerateActivityGraph.bind(this);
  }

  GenerateActivityGraph(
    request: DeepPartial<GenerateActivityGraphRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GenerateActivityGraphResponse> {
    return this.rpc.unary(
      AutomationMiningGenerateActivityGraphDesc,
      GenerateActivityGraphRequest.fromPartial(request),
      metadata,
    );
  }
}

export const AutomationMiningDesc = { serviceName: "pb.v1alpha1.AutomationMining" };

export const AutomationMiningGenerateActivityGraphDesc: UnaryMethodDefinitionish = {
  methodName: "GenerateActivityGraph",
  service: AutomationMiningDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GenerateActivityGraphRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GenerateActivityGraphResponse.decode(data);
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
