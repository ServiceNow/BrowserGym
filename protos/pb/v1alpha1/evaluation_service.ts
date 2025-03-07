/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";
import { Performance } from "./performance";

export const protobufPackage = "pb.v1alpha1";

export interface EvaluateQualityRequest {
  $type?: "pb.v1alpha1.EvaluateQualityRequest";
  /**
   * We evaluate all file objects starting with the specified prefix path returned by gcs client.
   * Prefix has to be in the format:- gs://<bucket_name>/<path>
   */
  predictionFilePathPrefix?: string | undefined;
  groundTruthFilePathPrefix?:
    | string
    | undefined;
  /**
   * This is an optional parameter which if provided will store the
   * performance proto conbined over all the document.
   * The path needs to be a valid GCS URI path i.e for example:- gs://<bucket_name>/<folder_path>
   */
  outputPath?: string | undefined;
}

export interface EvaluateQualityResponse {
  $type?: "pb.v1alpha1.EvaluateQualityResponse";
  quality?:
    | Performance
    | undefined;
  /** This field returns number of matched documents which are downloaded succesfully from GCS and evaluated. */
  evaluatedMatchedFiles?:
    | number
    | undefined;
  /** This field returns number of matched documents which are not downloaded succesfully. */
  failedMatchedFiles?:
    | number
    | undefined;
  /** This field returns number of unmatched ground truth document files */
  totalGroundTruthUnmatchedFiles?:
    | number
    | undefined;
  /** This field returns number of unmatched predicted document files */
  totalPredictionUnmatchedFiles?: number | undefined;
}

function createBaseEvaluateQualityRequest(): EvaluateQualityRequest {
  return {
    $type: "pb.v1alpha1.EvaluateQualityRequest",
    predictionFilePathPrefix: "",
    groundTruthFilePathPrefix: "",
    outputPath: "",
  };
}

export const EvaluateQualityRequest = {
  $type: "pb.v1alpha1.EvaluateQualityRequest" as const,

  encode(message: EvaluateQualityRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.predictionFilePathPrefix !== undefined && message.predictionFilePathPrefix !== "") {
      writer.uint32(10).string(message.predictionFilePathPrefix);
    }
    if (message.groundTruthFilePathPrefix !== undefined && message.groundTruthFilePathPrefix !== "") {
      writer.uint32(18).string(message.groundTruthFilePathPrefix);
    }
    if (message.outputPath !== undefined && message.outputPath !== "") {
      writer.uint32(26).string(message.outputPath);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EvaluateQualityRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvaluateQualityRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.predictionFilePathPrefix = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.groundTruthFilePathPrefix = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.outputPath = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EvaluateQualityRequest {
    return {
      $type: EvaluateQualityRequest.$type,
      predictionFilePathPrefix: isSet(object.predictionFilePathPrefix)
        ? globalThis.String(object.predictionFilePathPrefix)
        : "",
      groundTruthFilePathPrefix: isSet(object.groundTruthFilePathPrefix)
        ? globalThis.String(object.groundTruthFilePathPrefix)
        : "",
      outputPath: isSet(object.outputPath) ? globalThis.String(object.outputPath) : "",
    };
  },

  toJSON(message: EvaluateQualityRequest): unknown {
    const obj: any = {};
    if (message.predictionFilePathPrefix !== undefined && message.predictionFilePathPrefix !== "") {
      obj.predictionFilePathPrefix = message.predictionFilePathPrefix;
    }
    if (message.groundTruthFilePathPrefix !== undefined && message.groundTruthFilePathPrefix !== "") {
      obj.groundTruthFilePathPrefix = message.groundTruthFilePathPrefix;
    }
    if (message.outputPath !== undefined && message.outputPath !== "") {
      obj.outputPath = message.outputPath;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EvaluateQualityRequest>, I>>(base?: I): EvaluateQualityRequest {
    return EvaluateQualityRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EvaluateQualityRequest>, I>>(object: I): EvaluateQualityRequest {
    const message = createBaseEvaluateQualityRequest();
    message.predictionFilePathPrefix = object.predictionFilePathPrefix ?? "";
    message.groundTruthFilePathPrefix = object.groundTruthFilePathPrefix ?? "";
    message.outputPath = object.outputPath ?? "";
    return message;
  },
};

messageTypeRegistry.set(EvaluateQualityRequest.$type, EvaluateQualityRequest);

function createBaseEvaluateQualityResponse(): EvaluateQualityResponse {
  return {
    $type: "pb.v1alpha1.EvaluateQualityResponse",
    quality: undefined,
    evaluatedMatchedFiles: 0,
    failedMatchedFiles: 0,
    totalGroundTruthUnmatchedFiles: 0,
    totalPredictionUnmatchedFiles: 0,
  };
}

export const EvaluateQualityResponse = {
  $type: "pb.v1alpha1.EvaluateQualityResponse" as const,

  encode(message: EvaluateQualityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.quality !== undefined) {
      Performance.encode(message.quality, writer.uint32(10).fork()).ldelim();
    }
    if (message.evaluatedMatchedFiles !== undefined && message.evaluatedMatchedFiles !== 0) {
      writer.uint32(16).int32(message.evaluatedMatchedFiles);
    }
    if (message.failedMatchedFiles !== undefined && message.failedMatchedFiles !== 0) {
      writer.uint32(24).int32(message.failedMatchedFiles);
    }
    if (message.totalGroundTruthUnmatchedFiles !== undefined && message.totalGroundTruthUnmatchedFiles !== 0) {
      writer.uint32(32).int32(message.totalGroundTruthUnmatchedFiles);
    }
    if (message.totalPredictionUnmatchedFiles !== undefined && message.totalPredictionUnmatchedFiles !== 0) {
      writer.uint32(40).int32(message.totalPredictionUnmatchedFiles);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EvaluateQualityResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvaluateQualityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.quality = Performance.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.evaluatedMatchedFiles = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.failedMatchedFiles = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.totalGroundTruthUnmatchedFiles = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.totalPredictionUnmatchedFiles = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EvaluateQualityResponse {
    return {
      $type: EvaluateQualityResponse.$type,
      quality: isSet(object.quality) ? Performance.fromJSON(object.quality) : undefined,
      evaluatedMatchedFiles: isSet(object.evaluatedMatchedFiles) ? globalThis.Number(object.evaluatedMatchedFiles) : 0,
      failedMatchedFiles: isSet(object.failedMatchedFiles) ? globalThis.Number(object.failedMatchedFiles) : 0,
      totalGroundTruthUnmatchedFiles: isSet(object.totalGroundTruthUnmatchedFiles)
        ? globalThis.Number(object.totalGroundTruthUnmatchedFiles)
        : 0,
      totalPredictionUnmatchedFiles: isSet(object.totalPredictionUnmatchedFiles)
        ? globalThis.Number(object.totalPredictionUnmatchedFiles)
        : 0,
    };
  },

  toJSON(message: EvaluateQualityResponse): unknown {
    const obj: any = {};
    if (message.quality !== undefined) {
      obj.quality = Performance.toJSON(message.quality);
    }
    if (message.evaluatedMatchedFiles !== undefined && message.evaluatedMatchedFiles !== 0) {
      obj.evaluatedMatchedFiles = Math.round(message.evaluatedMatchedFiles);
    }
    if (message.failedMatchedFiles !== undefined && message.failedMatchedFiles !== 0) {
      obj.failedMatchedFiles = Math.round(message.failedMatchedFiles);
    }
    if (message.totalGroundTruthUnmatchedFiles !== undefined && message.totalGroundTruthUnmatchedFiles !== 0) {
      obj.totalGroundTruthUnmatchedFiles = Math.round(message.totalGroundTruthUnmatchedFiles);
    }
    if (message.totalPredictionUnmatchedFiles !== undefined && message.totalPredictionUnmatchedFiles !== 0) {
      obj.totalPredictionUnmatchedFiles = Math.round(message.totalPredictionUnmatchedFiles);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EvaluateQualityResponse>, I>>(base?: I): EvaluateQualityResponse {
    return EvaluateQualityResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EvaluateQualityResponse>, I>>(object: I): EvaluateQualityResponse {
    const message = createBaseEvaluateQualityResponse();
    message.quality = (object.quality !== undefined && object.quality !== null)
      ? Performance.fromPartial(object.quality)
      : undefined;
    message.evaluatedMatchedFiles = object.evaluatedMatchedFiles ?? 0;
    message.failedMatchedFiles = object.failedMatchedFiles ?? 0;
    message.totalGroundTruthUnmatchedFiles = object.totalGroundTruthUnmatchedFiles ?? 0;
    message.totalPredictionUnmatchedFiles = object.totalPredictionUnmatchedFiles ?? 0;
    return message;
  },
};

messageTypeRegistry.set(EvaluateQualityResponse.$type, EvaluateQualityResponse);

export interface Evaluation {
  EvaluateQuality(
    request: DeepPartial<EvaluateQualityRequest>,
    metadata?: grpc.Metadata,
  ): Promise<EvaluateQualityResponse>;
}

export class EvaluationClientImpl implements Evaluation {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.EvaluateQuality = this.EvaluateQuality.bind(this);
  }

  EvaluateQuality(
    request: DeepPartial<EvaluateQualityRequest>,
    metadata?: grpc.Metadata,
  ): Promise<EvaluateQualityResponse> {
    return this.rpc.unary(EvaluationEvaluateQualityDesc, EvaluateQualityRequest.fromPartial(request), metadata);
  }
}

export const EvaluationDesc = { serviceName: "pb.v1alpha1.Evaluation" };

export const EvaluationEvaluateQualityDesc: UnaryMethodDefinitionish = {
  methodName: "EvaluateQuality",
  service: EvaluationDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return EvaluateQualityRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = EvaluateQualityResponse.decode(data);
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
