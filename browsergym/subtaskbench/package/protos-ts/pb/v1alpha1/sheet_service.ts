/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export interface GetSheetColumnNamesRequest {
  $type?: "pb.v1alpha1.GetSheetColumnNamesRequest";
  sheetId?: string | undefined;
  sheetTabName?: string | undefined;
}

export interface GetSheetColumnNamesResponse {
  $type?: "pb.v1alpha1.GetSheetColumnNamesResponse";
  sheetColumns?: string[] | undefined;
}

function createBaseGetSheetColumnNamesRequest(): GetSheetColumnNamesRequest {
  return { $type: "pb.v1alpha1.GetSheetColumnNamesRequest", sheetId: "", sheetTabName: "" };
}

export const GetSheetColumnNamesRequest = {
  $type: "pb.v1alpha1.GetSheetColumnNamesRequest" as const,

  encode(message: GetSheetColumnNamesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sheetId !== undefined && message.sheetId !== "") {
      writer.uint32(10).string(message.sheetId);
    }
    if (message.sheetTabName !== undefined && message.sheetTabName !== "") {
      writer.uint32(18).string(message.sheetTabName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSheetColumnNamesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSheetColumnNamesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sheetId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sheetTabName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSheetColumnNamesRequest {
    return {
      $type: GetSheetColumnNamesRequest.$type,
      sheetId: isSet(object.sheetId) ? globalThis.String(object.sheetId) : "",
      sheetTabName: isSet(object.sheetTabName) ? globalThis.String(object.sheetTabName) : "",
    };
  },

  toJSON(message: GetSheetColumnNamesRequest): unknown {
    const obj: any = {};
    if (message.sheetId !== undefined && message.sheetId !== "") {
      obj.sheetId = message.sheetId;
    }
    if (message.sheetTabName !== undefined && message.sheetTabName !== "") {
      obj.sheetTabName = message.sheetTabName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSheetColumnNamesRequest>, I>>(base?: I): GetSheetColumnNamesRequest {
    return GetSheetColumnNamesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSheetColumnNamesRequest>, I>>(object: I): GetSheetColumnNamesRequest {
    const message = createBaseGetSheetColumnNamesRequest();
    message.sheetId = object.sheetId ?? "";
    message.sheetTabName = object.sheetTabName ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetSheetColumnNamesRequest.$type, GetSheetColumnNamesRequest);

function createBaseGetSheetColumnNamesResponse(): GetSheetColumnNamesResponse {
  return { $type: "pb.v1alpha1.GetSheetColumnNamesResponse", sheetColumns: [] };
}

export const GetSheetColumnNamesResponse = {
  $type: "pb.v1alpha1.GetSheetColumnNamesResponse" as const,

  encode(message: GetSheetColumnNamesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sheetColumns !== undefined && message.sheetColumns.length !== 0) {
      for (const v of message.sheetColumns) {
        writer.uint32(10).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSheetColumnNamesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSheetColumnNamesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sheetColumns!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSheetColumnNamesResponse {
    return {
      $type: GetSheetColumnNamesResponse.$type,
      sheetColumns: globalThis.Array.isArray(object?.sheetColumns)
        ? object.sheetColumns.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: GetSheetColumnNamesResponse): unknown {
    const obj: any = {};
    if (message.sheetColumns?.length) {
      obj.sheetColumns = message.sheetColumns;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSheetColumnNamesResponse>, I>>(base?: I): GetSheetColumnNamesResponse {
    return GetSheetColumnNamesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSheetColumnNamesResponse>, I>>(object: I): GetSheetColumnNamesResponse {
    const message = createBaseGetSheetColumnNamesResponse();
    message.sheetColumns = object.sheetColumns?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(GetSheetColumnNamesResponse.$type, GetSheetColumnNamesResponse);

export interface Sheet {
  GetSheetColumnNames(
    request: DeepPartial<GetSheetColumnNamesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetSheetColumnNamesResponse>;
}

export class SheetClientImpl implements Sheet {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetSheetColumnNames = this.GetSheetColumnNames.bind(this);
  }

  GetSheetColumnNames(
    request: DeepPartial<GetSheetColumnNamesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetSheetColumnNamesResponse> {
    return this.rpc.unary(SheetGetSheetColumnNamesDesc, GetSheetColumnNamesRequest.fromPartial(request), metadata);
  }
}

export const SheetDesc = { serviceName: "pb.v1alpha1.Sheet" };

export const SheetGetSheetColumnNamesDesc: UnaryMethodDefinitionish = {
  methodName: "GetSheetColumnNames",
  service: SheetDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetSheetColumnNamesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetSheetColumnNamesResponse.decode(data);
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
