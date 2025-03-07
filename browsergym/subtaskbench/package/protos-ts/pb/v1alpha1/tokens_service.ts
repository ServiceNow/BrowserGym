/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export interface RefreshRequest {
  $type?: "pb.v1alpha1.RefreshRequest";
  refreshToken?: string | undefined;
}

export interface RefreshResponse {
  $type?: "pb.v1alpha1.RefreshResponse";
  accessToken?: string | undefined;
  accessTokenExpiresAt?: Date | undefined;
}

export interface GetNewGoogleTokenRequest {
  $type?: "pb.v1alpha1.GetNewGoogleTokenRequest";
  email?: string | undefined;
}

export interface GetNewGoogleTokenResponse {
  $type?: "pb.v1alpha1.GetNewGoogleTokenResponse";
  accessToken?: string | undefined;
  accessTokenExpiresAt?: Date | undefined;
}

function createBaseRefreshRequest(): RefreshRequest {
  return { $type: "pb.v1alpha1.RefreshRequest", refreshToken: "" };
}

export const RefreshRequest = {
  $type: "pb.v1alpha1.RefreshRequest" as const,

  encode(message: RefreshRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.refreshToken !== undefined && message.refreshToken !== "") {
      writer.uint32(10).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RefreshRequest {
    return {
      $type: RefreshRequest.$type,
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "",
    };
  },

  toJSON(message: RefreshRequest): unknown {
    const obj: any = {};
    if (message.refreshToken !== undefined && message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RefreshRequest>, I>>(base?: I): RefreshRequest {
    return RefreshRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RefreshRequest>, I>>(object: I): RefreshRequest {
    const message = createBaseRefreshRequest();
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

messageTypeRegistry.set(RefreshRequest.$type, RefreshRequest);

function createBaseRefreshResponse(): RefreshResponse {
  return { $type: "pb.v1alpha1.RefreshResponse", accessToken: "", accessTokenExpiresAt: undefined };
}

export const RefreshResponse = {
  $type: "pb.v1alpha1.RefreshResponse" as const,

  encode(message: RefreshResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== undefined && message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.accessTokenExpiresAt !== undefined) {
      Timestamp.encode(toTimestamp(message.accessTokenExpiresAt), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accessTokenExpiresAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RefreshResponse {
    return {
      $type: RefreshResponse.$type,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      accessTokenExpiresAt: isSet(object.accessTokenExpiresAt)
        ? fromJsonTimestamp(object.accessTokenExpiresAt)
        : undefined,
    };
  },

  toJSON(message: RefreshResponse): unknown {
    const obj: any = {};
    if (message.accessToken !== undefined && message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.accessTokenExpiresAt !== undefined) {
      obj.accessTokenExpiresAt = message.accessTokenExpiresAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RefreshResponse>, I>>(base?: I): RefreshResponse {
    return RefreshResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RefreshResponse>, I>>(object: I): RefreshResponse {
    const message = createBaseRefreshResponse();
    message.accessToken = object.accessToken ?? "";
    message.accessTokenExpiresAt = object.accessTokenExpiresAt ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(RefreshResponse.$type, RefreshResponse);

function createBaseGetNewGoogleTokenRequest(): GetNewGoogleTokenRequest {
  return { $type: "pb.v1alpha1.GetNewGoogleTokenRequest", email: "" };
}

export const GetNewGoogleTokenRequest = {
  $type: "pb.v1alpha1.GetNewGoogleTokenRequest" as const,

  encode(message: GetNewGoogleTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== undefined && message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNewGoogleTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNewGoogleTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetNewGoogleTokenRequest {
    return { $type: GetNewGoogleTokenRequest.$type, email: isSet(object.email) ? globalThis.String(object.email) : "" };
  },

  toJSON(message: GetNewGoogleTokenRequest): unknown {
    const obj: any = {};
    if (message.email !== undefined && message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetNewGoogleTokenRequest>, I>>(base?: I): GetNewGoogleTokenRequest {
    return GetNewGoogleTokenRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetNewGoogleTokenRequest>, I>>(object: I): GetNewGoogleTokenRequest {
    const message = createBaseGetNewGoogleTokenRequest();
    message.email = object.email ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetNewGoogleTokenRequest.$type, GetNewGoogleTokenRequest);

function createBaseGetNewGoogleTokenResponse(): GetNewGoogleTokenResponse {
  return { $type: "pb.v1alpha1.GetNewGoogleTokenResponse", accessToken: "", accessTokenExpiresAt: undefined };
}

export const GetNewGoogleTokenResponse = {
  $type: "pb.v1alpha1.GetNewGoogleTokenResponse" as const,

  encode(message: GetNewGoogleTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== undefined && message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.accessTokenExpiresAt !== undefined) {
      Timestamp.encode(toTimestamp(message.accessTokenExpiresAt), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNewGoogleTokenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNewGoogleTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accessTokenExpiresAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetNewGoogleTokenResponse {
    return {
      $type: GetNewGoogleTokenResponse.$type,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      accessTokenExpiresAt: isSet(object.accessTokenExpiresAt)
        ? fromJsonTimestamp(object.accessTokenExpiresAt)
        : undefined,
    };
  },

  toJSON(message: GetNewGoogleTokenResponse): unknown {
    const obj: any = {};
    if (message.accessToken !== undefined && message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.accessTokenExpiresAt !== undefined) {
      obj.accessTokenExpiresAt = message.accessTokenExpiresAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetNewGoogleTokenResponse>, I>>(base?: I): GetNewGoogleTokenResponse {
    return GetNewGoogleTokenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetNewGoogleTokenResponse>, I>>(object: I): GetNewGoogleTokenResponse {
    const message = createBaseGetNewGoogleTokenResponse();
    message.accessToken = object.accessToken ?? "";
    message.accessTokenExpiresAt = object.accessTokenExpiresAt ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(GetNewGoogleTokenResponse.$type, GetNewGoogleTokenResponse);

export interface Tokens {
  /** Refresh Orby AI token */
  Refresh(request: DeepPartial<RefreshRequest>, metadata?: grpc.Metadata): Promise<RefreshResponse>;
  /** Get new Google oauth2 access token */
  GetNewGoogleToken(
    request: DeepPartial<GetNewGoogleTokenRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetNewGoogleTokenResponse>;
}

export class TokensClientImpl implements Tokens {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Refresh = this.Refresh.bind(this);
    this.GetNewGoogleToken = this.GetNewGoogleToken.bind(this);
  }

  Refresh(request: DeepPartial<RefreshRequest>, metadata?: grpc.Metadata): Promise<RefreshResponse> {
    return this.rpc.unary(TokensRefreshDesc, RefreshRequest.fromPartial(request), metadata);
  }

  GetNewGoogleToken(
    request: DeepPartial<GetNewGoogleTokenRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetNewGoogleTokenResponse> {
    return this.rpc.unary(TokensGetNewGoogleTokenDesc, GetNewGoogleTokenRequest.fromPartial(request), metadata);
  }
}

export const TokensDesc = { serviceName: "pb.v1alpha1.Tokens" };

export const TokensRefreshDesc: UnaryMethodDefinitionish = {
  methodName: "Refresh",
  service: TokensDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RefreshRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RefreshResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const TokensGetNewGoogleTokenDesc: UnaryMethodDefinitionish = {
  methodName: "GetNewGoogleToken",
  service: TokensDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetNewGoogleTokenRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetNewGoogleTokenResponse.decode(data);
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
