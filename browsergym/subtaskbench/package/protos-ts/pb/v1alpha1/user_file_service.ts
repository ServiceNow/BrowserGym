/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

/** File created from a Webpage, such as screenshot and snapshot. */
export interface WebpageFile {
  $type?: "pb.v1alpha1.WebpageFile";
  /** the time that the page screenshot/snapshot is taken. */
  createdTime?:
    | Date
    | undefined;
  /** the Webpage URL. */
  pageUrl?: string | undefined;
}

/** User uploaded files when using ProcessSmartActions API */
export interface DocumentFile {
  $type?: "pb.v1alpha1.DocumentFile";
  createdTime?: Date | undefined;
  workflowId?: string | undefined;
  taskId?:
    | string
    | undefined;
  /** the URL where the document is downloaded. */
  url?: string | undefined;
}

export interface CreateFileUploadRequest {
  $type?: "pb.v1alpha1.CreateFileUploadRequest";
  /** Webpage screenshot in image format */
  screenshot?:
    | WebpageFile
    | undefined;
  /** Webpage snapshot in HTML format */
  snapshot?:
    | WebpageFile
    | undefined;
  /** Image/PDF files used for ML actions */
  document?:
    | DocumentFile
    | undefined;
  /** Organization which the file belongs, required for access control. */
  orgId?:
    | string
    | undefined;
  /** Optional workflow to which the file belongs to */
  workflowId?:
    | string
    | undefined;
  /** Optional execution to which the file belongs to */
  executionId?: string | undefined;
}

export interface CreateFileUploadResponse {
  $type?: "pb.v1alpha1.CreateFileUploadResponse";
  /** file ID that can be used to refer to the file, such as in RecordedAction. */
  id?:
    | string
    | undefined;
  /** GCS signed URL for file uploading. */
  uploadUrl?: string | undefined;
}

export interface GetFileUrlRequest {
  $type?: "pb.v1alpha1.GetFileUrlRequest";
  id?:
    | string
    | undefined;
  /** User's active organization */
  orgId?: string | undefined;
}

export interface GetFileUrlResponse {
  $type?: "pb.v1alpha1.GetFileUrlResponse";
  /** GCS signed URL to read the file. valid for 15 minutes. */
  url?: string | undefined;
}

function createBaseWebpageFile(): WebpageFile {
  return { $type: "pb.v1alpha1.WebpageFile", createdTime: undefined, pageUrl: "" };
}

export const WebpageFile = {
  $type: "pb.v1alpha1.WebpageFile" as const,

  encode(message: WebpageFile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.createdTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createdTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.pageUrl !== undefined && message.pageUrl !== "") {
      writer.uint32(18).string(message.pageUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WebpageFile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWebpageFile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.createdTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pageUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WebpageFile {
    return {
      $type: WebpageFile.$type,
      createdTime: isSet(object.createdTime) ? fromJsonTimestamp(object.createdTime) : undefined,
      pageUrl: isSet(object.pageUrl) ? globalThis.String(object.pageUrl) : "",
    };
  },

  toJSON(message: WebpageFile): unknown {
    const obj: any = {};
    if (message.createdTime !== undefined) {
      obj.createdTime = message.createdTime.toISOString();
    }
    if (message.pageUrl !== undefined && message.pageUrl !== "") {
      obj.pageUrl = message.pageUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WebpageFile>, I>>(base?: I): WebpageFile {
    return WebpageFile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WebpageFile>, I>>(object: I): WebpageFile {
    const message = createBaseWebpageFile();
    message.createdTime = object.createdTime ?? undefined;
    message.pageUrl = object.pageUrl ?? "";
    return message;
  },
};

messageTypeRegistry.set(WebpageFile.$type, WebpageFile);

function createBaseDocumentFile(): DocumentFile {
  return { $type: "pb.v1alpha1.DocumentFile", createdTime: undefined, workflowId: "", taskId: "", url: "" };
}

export const DocumentFile = {
  $type: "pb.v1alpha1.DocumentFile" as const,

  encode(message: DocumentFile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.createdTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createdTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(18).string(message.workflowId);
    }
    if (message.taskId !== undefined && message.taskId !== "") {
      writer.uint32(26).string(message.taskId);
    }
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(34).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentFile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentFile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.createdTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.workflowId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.taskId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): DocumentFile {
    return {
      $type: DocumentFile.$type,
      createdTime: isSet(object.createdTime) ? fromJsonTimestamp(object.createdTime) : undefined,
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      taskId: isSet(object.taskId) ? globalThis.String(object.taskId) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
    };
  },

  toJSON(message: DocumentFile): unknown {
    const obj: any = {};
    if (message.createdTime !== undefined) {
      obj.createdTime = message.createdTime.toISOString();
    }
    if (message.workflowId !== undefined && message.workflowId !== "") {
      obj.workflowId = message.workflowId;
    }
    if (message.taskId !== undefined && message.taskId !== "") {
      obj.taskId = message.taskId;
    }
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentFile>, I>>(base?: I): DocumentFile {
    return DocumentFile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentFile>, I>>(object: I): DocumentFile {
    const message = createBaseDocumentFile();
    message.createdTime = object.createdTime ?? undefined;
    message.workflowId = object.workflowId ?? "";
    message.taskId = object.taskId ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

messageTypeRegistry.set(DocumentFile.$type, DocumentFile);

function createBaseCreateFileUploadRequest(): CreateFileUploadRequest {
  return {
    $type: "pb.v1alpha1.CreateFileUploadRequest",
    screenshot: undefined,
    snapshot: undefined,
    document: undefined,
    orgId: "",
    workflowId: "",
    executionId: "",
  };
}

export const CreateFileUploadRequest = {
  $type: "pb.v1alpha1.CreateFileUploadRequest" as const,

  encode(message: CreateFileUploadRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.screenshot !== undefined) {
      WebpageFile.encode(message.screenshot, writer.uint32(10).fork()).ldelim();
    }
    if (message.snapshot !== undefined) {
      WebpageFile.encode(message.snapshot, writer.uint32(18).fork()).ldelim();
    }
    if (message.document !== undefined) {
      DocumentFile.encode(message.document, writer.uint32(34).fork()).ldelim();
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(26).string(message.orgId);
    }
    if (message.workflowId !== undefined && message.workflowId !== "") {
      writer.uint32(42).string(message.workflowId);
    }
    if (message.executionId !== undefined && message.executionId !== "") {
      writer.uint32(50).string(message.executionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateFileUploadRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateFileUploadRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.screenshot = WebpageFile.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.snapshot = WebpageFile.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.document = DocumentFile.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.workflowId = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
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

  fromJSON(object: any): CreateFileUploadRequest {
    return {
      $type: CreateFileUploadRequest.$type,
      screenshot: isSet(object.screenshot) ? WebpageFile.fromJSON(object.screenshot) : undefined,
      snapshot: isSet(object.snapshot) ? WebpageFile.fromJSON(object.snapshot) : undefined,
      document: isSet(object.document) ? DocumentFile.fromJSON(object.document) : undefined,
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      workflowId: isSet(object.workflowId) ? globalThis.String(object.workflowId) : "",
      executionId: isSet(object.executionId) ? globalThis.String(object.executionId) : "",
    };
  },

  toJSON(message: CreateFileUploadRequest): unknown {
    const obj: any = {};
    if (message.screenshot !== undefined) {
      obj.screenshot = WebpageFile.toJSON(message.screenshot);
    }
    if (message.snapshot !== undefined) {
      obj.snapshot = WebpageFile.toJSON(message.snapshot);
    }
    if (message.document !== undefined) {
      obj.document = DocumentFile.toJSON(message.document);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.workflowId !== undefined && message.workflowId !== "") {
      obj.workflowId = message.workflowId;
    }
    if (message.executionId !== undefined && message.executionId !== "") {
      obj.executionId = message.executionId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateFileUploadRequest>, I>>(base?: I): CreateFileUploadRequest {
    return CreateFileUploadRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateFileUploadRequest>, I>>(object: I): CreateFileUploadRequest {
    const message = createBaseCreateFileUploadRequest();
    message.screenshot = (object.screenshot !== undefined && object.screenshot !== null)
      ? WebpageFile.fromPartial(object.screenshot)
      : undefined;
    message.snapshot = (object.snapshot !== undefined && object.snapshot !== null)
      ? WebpageFile.fromPartial(object.snapshot)
      : undefined;
    message.document = (object.document !== undefined && object.document !== null)
      ? DocumentFile.fromPartial(object.document)
      : undefined;
    message.orgId = object.orgId ?? "";
    message.workflowId = object.workflowId ?? "";
    message.executionId = object.executionId ?? "";
    return message;
  },
};

messageTypeRegistry.set(CreateFileUploadRequest.$type, CreateFileUploadRequest);

function createBaseCreateFileUploadResponse(): CreateFileUploadResponse {
  return { $type: "pb.v1alpha1.CreateFileUploadResponse", id: "", uploadUrl: "" };
}

export const CreateFileUploadResponse = {
  $type: "pb.v1alpha1.CreateFileUploadResponse" as const,

  encode(message: CreateFileUploadResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.uploadUrl !== undefined && message.uploadUrl !== "") {
      writer.uint32(18).string(message.uploadUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateFileUploadResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateFileUploadResponse();
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

          message.uploadUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateFileUploadResponse {
    return {
      $type: CreateFileUploadResponse.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      uploadUrl: isSet(object.uploadUrl) ? globalThis.String(object.uploadUrl) : "",
    };
  },

  toJSON(message: CreateFileUploadResponse): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.uploadUrl !== undefined && message.uploadUrl !== "") {
      obj.uploadUrl = message.uploadUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateFileUploadResponse>, I>>(base?: I): CreateFileUploadResponse {
    return CreateFileUploadResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateFileUploadResponse>, I>>(object: I): CreateFileUploadResponse {
    const message = createBaseCreateFileUploadResponse();
    message.id = object.id ?? "";
    message.uploadUrl = object.uploadUrl ?? "";
    return message;
  },
};

messageTypeRegistry.set(CreateFileUploadResponse.$type, CreateFileUploadResponse);

function createBaseGetFileUrlRequest(): GetFileUrlRequest {
  return { $type: "pb.v1alpha1.GetFileUrlRequest", id: "", orgId: "" };
}

export const GetFileUrlRequest = {
  $type: "pb.v1alpha1.GetFileUrlRequest" as const,

  encode(message: GetFileUrlRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFileUrlRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFileUrlRequest();
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

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFileUrlRequest {
    return {
      $type: GetFileUrlRequest.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
    };
  },

  toJSON(message: GetFileUrlRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFileUrlRequest>, I>>(base?: I): GetFileUrlRequest {
    return GetFileUrlRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFileUrlRequest>, I>>(object: I): GetFileUrlRequest {
    const message = createBaseGetFileUrlRequest();
    message.id = object.id ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetFileUrlRequest.$type, GetFileUrlRequest);

function createBaseGetFileUrlResponse(): GetFileUrlResponse {
  return { $type: "pb.v1alpha1.GetFileUrlResponse", url: "" };
}

export const GetFileUrlResponse = {
  $type: "pb.v1alpha1.GetFileUrlResponse" as const,

  encode(message: GetFileUrlResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFileUrlResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFileUrlResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): GetFileUrlResponse {
    return { $type: GetFileUrlResponse.$type, url: isSet(object.url) ? globalThis.String(object.url) : "" };
  },

  toJSON(message: GetFileUrlResponse): unknown {
    const obj: any = {};
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFileUrlResponse>, I>>(base?: I): GetFileUrlResponse {
    return GetFileUrlResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFileUrlResponse>, I>>(object: I): GetFileUrlResponse {
    const message = createBaseGetFileUrlResponse();
    message.url = object.url ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetFileUrlResponse.$type, GetFileUrlResponse);

/**
 * File service provides endpoints to upload and read files with GCS signed
 * URLs (https://cloud.google.com/storage/docs/access-control/signed-urls).
 */
export interface UserFile {
  /** Creates a file and returns the signed url for uploading. */
  CreateFileUpload(
    request: DeepPartial<CreateFileUploadRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateFileUploadResponse>;
  /**
   * Returns the signed url for existing GCS file, after verifying that the user
   * has access to the file.
   */
  GetFileUrl(request: DeepPartial<GetFileUrlRequest>, metadata?: grpc.Metadata): Promise<GetFileUrlResponse>;
}

export class UserFileClientImpl implements UserFile {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateFileUpload = this.CreateFileUpload.bind(this);
    this.GetFileUrl = this.GetFileUrl.bind(this);
  }

  CreateFileUpload(
    request: DeepPartial<CreateFileUploadRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateFileUploadResponse> {
    return this.rpc.unary(UserFileCreateFileUploadDesc, CreateFileUploadRequest.fromPartial(request), metadata);
  }

  GetFileUrl(request: DeepPartial<GetFileUrlRequest>, metadata?: grpc.Metadata): Promise<GetFileUrlResponse> {
    return this.rpc.unary(UserFileGetFileUrlDesc, GetFileUrlRequest.fromPartial(request), metadata);
  }
}

export const UserFileDesc = { serviceName: "pb.v1alpha1.UserFile" };

export const UserFileCreateFileUploadDesc: UnaryMethodDefinitionish = {
  methodName: "CreateFileUpload",
  service: UserFileDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateFileUploadRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateFileUploadResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const UserFileGetFileUrlDesc: UnaryMethodDefinitionish = {
  methodName: "GetFileUrl",
  service: UserFileDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetFileUrlRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetFileUrlResponse.decode(data);
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
