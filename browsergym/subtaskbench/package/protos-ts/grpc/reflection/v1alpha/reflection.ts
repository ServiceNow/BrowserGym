/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";
import { messageTypeRegistry } from "../../../typeRegistry";

export const protobufPackage = "grpc.reflection.v1alpha";

/** The message sent by the client when calling ServerReflectionInfo method. */
export interface ServerReflectionRequest {
  $type?: "grpc.reflection.v1alpha.ServerReflectionRequest";
  host?:
    | string
    | undefined;
  /** Find a proto file by the file name. */
  fileByFilename?:
    | string
    | undefined;
  /**
   * Find the proto file that declares the given fully-qualified symbol name.
   * This field should be a fully-qualified symbol name
   * (e.g. <package>.<service>[.<method>] or <package>.<type>).
   */
  fileContainingSymbol?:
    | string
    | undefined;
  /**
   * Find the proto file which defines an extension extending the given
   * message type with the given field number.
   */
  fileContainingExtension?:
    | ExtensionRequest
    | undefined;
  /**
   * Finds the tag numbers used by all known extensions of the given message
   * type, and appends them to ExtensionNumberResponse in an undefined order.
   * Its corresponding method is best-effort: it's not guaranteed that the
   * reflection service will implement this method, and it's not guaranteed
   * that this method will provide all extensions. Returns
   * StatusCode::UNIMPLEMENTED if it's not implemented.
   * This field should be a fully-qualified type name. The format is
   * <package>.<type>
   */
  allExtensionNumbersOfType?:
    | string
    | undefined;
  /**
   * List the full names of registered services. The content will not be
   * checked.
   */
  listServices?: string | undefined;
}

/**
 * The type name and extension number sent by the client when requesting
 * file_containing_extension.
 */
export interface ExtensionRequest {
  $type?: "grpc.reflection.v1alpha.ExtensionRequest";
  /** Fully-qualified type name. The format should be <package>.<type> */
  containingType?: string | undefined;
  extensionNumber?: number | undefined;
}

/** The message sent by the server to answer ServerReflectionInfo method. */
export interface ServerReflectionResponse {
  $type?: "grpc.reflection.v1alpha.ServerReflectionResponse";
  validHost?: string | undefined;
  originalRequest?:
    | ServerReflectionRequest
    | undefined;
  /**
   * This message is used to answer file_by_filename, file_containing_symbol,
   * file_containing_extension requests with transitive dependencies. As
   * the repeated label is not allowed in oneof fields, we use a
   * FileDescriptorResponse message to encapsulate the repeated fields.
   * The reflection service is allowed to avoid sending FileDescriptorProtos
   * that were previously sent in response to earlier requests in the stream.
   */
  fileDescriptorResponse?:
    | FileDescriptorResponse
    | undefined;
  /** This message is used to answer all_extension_numbers_of_type requst. */
  allExtensionNumbersResponse?:
    | ExtensionNumberResponse
    | undefined;
  /** This message is used to answer list_services request. */
  listServicesResponse?:
    | ListServiceResponse
    | undefined;
  /** This message is used when an error occurs. */
  errorResponse?: ErrorResponse | undefined;
}

/**
 * Serialized FileDescriptorProto messages sent by the server answering
 * a file_by_filename, file_containing_symbol, or file_containing_extension
 * request.
 */
export interface FileDescriptorResponse {
  $type?: "grpc.reflection.v1alpha.FileDescriptorResponse";
  /**
   * Serialized FileDescriptorProto messages. We avoid taking a dependency on
   * descriptor.proto, which uses proto2 only features, by making them opaque
   * bytes instead.
   */
  fileDescriptorProto?: Uint8Array[] | undefined;
}

/**
 * A list of extension numbers sent by the server answering
 * all_extension_numbers_of_type request.
 */
export interface ExtensionNumberResponse {
  $type?: "grpc.reflection.v1alpha.ExtensionNumberResponse";
  /**
   * Full name of the base type, including the package name. The format
   * is <package>.<type>
   */
  baseTypeName?: string | undefined;
  extensionNumber?: number[] | undefined;
}

/** A list of ServiceResponse sent by the server answering list_services request. */
export interface ListServiceResponse {
  $type?: "grpc.reflection.v1alpha.ListServiceResponse";
  /**
   * The information of each service may be expanded in the future, so we use
   * ServiceResponse message to encapsulate it.
   */
  service?: ServiceResponse[] | undefined;
}

/**
 * The information of a single service used by ListServiceResponse to answer
 * list_services request.
 */
export interface ServiceResponse {
  $type?: "grpc.reflection.v1alpha.ServiceResponse";
  /**
   * Full name of a registered service, including its package name. The format
   * is <package>.<service>
   */
  name?: string | undefined;
}

/** The error code and error message sent by the server when an error occurs. */
export interface ErrorResponse {
  $type?: "grpc.reflection.v1alpha.ErrorResponse";
  /** This field uses the error codes defined in grpc::StatusCode. */
  errorCode?: number | undefined;
  errorMessage?: string | undefined;
}

function createBaseServerReflectionRequest(): ServerReflectionRequest {
  return {
    $type: "grpc.reflection.v1alpha.ServerReflectionRequest",
    host: "",
    fileByFilename: undefined,
    fileContainingSymbol: undefined,
    fileContainingExtension: undefined,
    allExtensionNumbersOfType: undefined,
    listServices: undefined,
  };
}

export const ServerReflectionRequest = {
  $type: "grpc.reflection.v1alpha.ServerReflectionRequest" as const,

  encode(message: ServerReflectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.host !== undefined && message.host !== "") {
      writer.uint32(10).string(message.host);
    }
    if (message.fileByFilename !== undefined) {
      writer.uint32(26).string(message.fileByFilename);
    }
    if (message.fileContainingSymbol !== undefined) {
      writer.uint32(34).string(message.fileContainingSymbol);
    }
    if (message.fileContainingExtension !== undefined) {
      ExtensionRequest.encode(message.fileContainingExtension, writer.uint32(42).fork()).ldelim();
    }
    if (message.allExtensionNumbersOfType !== undefined) {
      writer.uint32(50).string(message.allExtensionNumbersOfType);
    }
    if (message.listServices !== undefined) {
      writer.uint32(58).string(message.listServices);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServerReflectionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServerReflectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.host = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.fileByFilename = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fileContainingSymbol = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fileContainingExtension = ExtensionRequest.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.allExtensionNumbersOfType = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.listServices = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ServerReflectionRequest {
    return {
      $type: ServerReflectionRequest.$type,
      host: isSet(object.host) ? globalThis.String(object.host) : "",
      fileByFilename: isSet(object.fileByFilename) ? globalThis.String(object.fileByFilename) : undefined,
      fileContainingSymbol: isSet(object.fileContainingSymbol)
        ? globalThis.String(object.fileContainingSymbol)
        : undefined,
      fileContainingExtension: isSet(object.fileContainingExtension)
        ? ExtensionRequest.fromJSON(object.fileContainingExtension)
        : undefined,
      allExtensionNumbersOfType: isSet(object.allExtensionNumbersOfType)
        ? globalThis.String(object.allExtensionNumbersOfType)
        : undefined,
      listServices: isSet(object.listServices) ? globalThis.String(object.listServices) : undefined,
    };
  },

  toJSON(message: ServerReflectionRequest): unknown {
    const obj: any = {};
    if (message.host !== undefined && message.host !== "") {
      obj.host = message.host;
    }
    if (message.fileByFilename !== undefined) {
      obj.fileByFilename = message.fileByFilename;
    }
    if (message.fileContainingSymbol !== undefined) {
      obj.fileContainingSymbol = message.fileContainingSymbol;
    }
    if (message.fileContainingExtension !== undefined) {
      obj.fileContainingExtension = ExtensionRequest.toJSON(message.fileContainingExtension);
    }
    if (message.allExtensionNumbersOfType !== undefined) {
      obj.allExtensionNumbersOfType = message.allExtensionNumbersOfType;
    }
    if (message.listServices !== undefined) {
      obj.listServices = message.listServices;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ServerReflectionRequest>, I>>(base?: I): ServerReflectionRequest {
    return ServerReflectionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ServerReflectionRequest>, I>>(object: I): ServerReflectionRequest {
    const message = createBaseServerReflectionRequest();
    message.host = object.host ?? "";
    message.fileByFilename = object.fileByFilename ?? undefined;
    message.fileContainingSymbol = object.fileContainingSymbol ?? undefined;
    message.fileContainingExtension =
      (object.fileContainingExtension !== undefined && object.fileContainingExtension !== null)
        ? ExtensionRequest.fromPartial(object.fileContainingExtension)
        : undefined;
    message.allExtensionNumbersOfType = object.allExtensionNumbersOfType ?? undefined;
    message.listServices = object.listServices ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(ServerReflectionRequest.$type, ServerReflectionRequest);

function createBaseExtensionRequest(): ExtensionRequest {
  return { $type: "grpc.reflection.v1alpha.ExtensionRequest", containingType: "", extensionNumber: 0 };
}

export const ExtensionRequest = {
  $type: "grpc.reflection.v1alpha.ExtensionRequest" as const,

  encode(message: ExtensionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.containingType !== undefined && message.containingType !== "") {
      writer.uint32(10).string(message.containingType);
    }
    if (message.extensionNumber !== undefined && message.extensionNumber !== 0) {
      writer.uint32(16).int32(message.extensionNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtensionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtensionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.containingType = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.extensionNumber = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtensionRequest {
    return {
      $type: ExtensionRequest.$type,
      containingType: isSet(object.containingType) ? globalThis.String(object.containingType) : "",
      extensionNumber: isSet(object.extensionNumber) ? globalThis.Number(object.extensionNumber) : 0,
    };
  },

  toJSON(message: ExtensionRequest): unknown {
    const obj: any = {};
    if (message.containingType !== undefined && message.containingType !== "") {
      obj.containingType = message.containingType;
    }
    if (message.extensionNumber !== undefined && message.extensionNumber !== 0) {
      obj.extensionNumber = Math.round(message.extensionNumber);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtensionRequest>, I>>(base?: I): ExtensionRequest {
    return ExtensionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtensionRequest>, I>>(object: I): ExtensionRequest {
    const message = createBaseExtensionRequest();
    message.containingType = object.containingType ?? "";
    message.extensionNumber = object.extensionNumber ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ExtensionRequest.$type, ExtensionRequest);

function createBaseServerReflectionResponse(): ServerReflectionResponse {
  return {
    $type: "grpc.reflection.v1alpha.ServerReflectionResponse",
    validHost: "",
    originalRequest: undefined,
    fileDescriptorResponse: undefined,
    allExtensionNumbersResponse: undefined,
    listServicesResponse: undefined,
    errorResponse: undefined,
  };
}

export const ServerReflectionResponse = {
  $type: "grpc.reflection.v1alpha.ServerReflectionResponse" as const,

  encode(message: ServerReflectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validHost !== undefined && message.validHost !== "") {
      writer.uint32(10).string(message.validHost);
    }
    if (message.originalRequest !== undefined) {
      ServerReflectionRequest.encode(message.originalRequest, writer.uint32(18).fork()).ldelim();
    }
    if (message.fileDescriptorResponse !== undefined) {
      FileDescriptorResponse.encode(message.fileDescriptorResponse, writer.uint32(34).fork()).ldelim();
    }
    if (message.allExtensionNumbersResponse !== undefined) {
      ExtensionNumberResponse.encode(message.allExtensionNumbersResponse, writer.uint32(42).fork()).ldelim();
    }
    if (message.listServicesResponse !== undefined) {
      ListServiceResponse.encode(message.listServicesResponse, writer.uint32(50).fork()).ldelim();
    }
    if (message.errorResponse !== undefined) {
      ErrorResponse.encode(message.errorResponse, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServerReflectionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServerReflectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validHost = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.originalRequest = ServerReflectionRequest.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fileDescriptorResponse = FileDescriptorResponse.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.allExtensionNumbersResponse = ExtensionNumberResponse.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.listServicesResponse = ListServiceResponse.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.errorResponse = ErrorResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ServerReflectionResponse {
    return {
      $type: ServerReflectionResponse.$type,
      validHost: isSet(object.validHost) ? globalThis.String(object.validHost) : "",
      originalRequest: isSet(object.originalRequest)
        ? ServerReflectionRequest.fromJSON(object.originalRequest)
        : undefined,
      fileDescriptorResponse: isSet(object.fileDescriptorResponse)
        ? FileDescriptorResponse.fromJSON(object.fileDescriptorResponse)
        : undefined,
      allExtensionNumbersResponse: isSet(object.allExtensionNumbersResponse)
        ? ExtensionNumberResponse.fromJSON(object.allExtensionNumbersResponse)
        : undefined,
      listServicesResponse: isSet(object.listServicesResponse)
        ? ListServiceResponse.fromJSON(object.listServicesResponse)
        : undefined,
      errorResponse: isSet(object.errorResponse) ? ErrorResponse.fromJSON(object.errorResponse) : undefined,
    };
  },

  toJSON(message: ServerReflectionResponse): unknown {
    const obj: any = {};
    if (message.validHost !== undefined && message.validHost !== "") {
      obj.validHost = message.validHost;
    }
    if (message.originalRequest !== undefined) {
      obj.originalRequest = ServerReflectionRequest.toJSON(message.originalRequest);
    }
    if (message.fileDescriptorResponse !== undefined) {
      obj.fileDescriptorResponse = FileDescriptorResponse.toJSON(message.fileDescriptorResponse);
    }
    if (message.allExtensionNumbersResponse !== undefined) {
      obj.allExtensionNumbersResponse = ExtensionNumberResponse.toJSON(message.allExtensionNumbersResponse);
    }
    if (message.listServicesResponse !== undefined) {
      obj.listServicesResponse = ListServiceResponse.toJSON(message.listServicesResponse);
    }
    if (message.errorResponse !== undefined) {
      obj.errorResponse = ErrorResponse.toJSON(message.errorResponse);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ServerReflectionResponse>, I>>(base?: I): ServerReflectionResponse {
    return ServerReflectionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ServerReflectionResponse>, I>>(object: I): ServerReflectionResponse {
    const message = createBaseServerReflectionResponse();
    message.validHost = object.validHost ?? "";
    message.originalRequest = (object.originalRequest !== undefined && object.originalRequest !== null)
      ? ServerReflectionRequest.fromPartial(object.originalRequest)
      : undefined;
    message.fileDescriptorResponse =
      (object.fileDescriptorResponse !== undefined && object.fileDescriptorResponse !== null)
        ? FileDescriptorResponse.fromPartial(object.fileDescriptorResponse)
        : undefined;
    message.allExtensionNumbersResponse =
      (object.allExtensionNumbersResponse !== undefined && object.allExtensionNumbersResponse !== null)
        ? ExtensionNumberResponse.fromPartial(object.allExtensionNumbersResponse)
        : undefined;
    message.listServicesResponse = (object.listServicesResponse !== undefined && object.listServicesResponse !== null)
      ? ListServiceResponse.fromPartial(object.listServicesResponse)
      : undefined;
    message.errorResponse = (object.errorResponse !== undefined && object.errorResponse !== null)
      ? ErrorResponse.fromPartial(object.errorResponse)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ServerReflectionResponse.$type, ServerReflectionResponse);

function createBaseFileDescriptorResponse(): FileDescriptorResponse {
  return { $type: "grpc.reflection.v1alpha.FileDescriptorResponse", fileDescriptorProto: [] };
}

export const FileDescriptorResponse = {
  $type: "grpc.reflection.v1alpha.FileDescriptorResponse" as const,

  encode(message: FileDescriptorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fileDescriptorProto !== undefined && message.fileDescriptorProto.length !== 0) {
      for (const v of message.fileDescriptorProto) {
        writer.uint32(10).bytes(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileDescriptorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fileDescriptorProto!.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FileDescriptorResponse {
    return {
      $type: FileDescriptorResponse.$type,
      fileDescriptorProto: globalThis.Array.isArray(object?.fileDescriptorProto)
        ? object.fileDescriptorProto.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: FileDescriptorResponse): unknown {
    const obj: any = {};
    if (message.fileDescriptorProto?.length) {
      obj.fileDescriptorProto = message.fileDescriptorProto.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FileDescriptorResponse>, I>>(base?: I): FileDescriptorResponse {
    return FileDescriptorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FileDescriptorResponse>, I>>(object: I): FileDescriptorResponse {
    const message = createBaseFileDescriptorResponse();
    message.fileDescriptorProto = object.fileDescriptorProto?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(FileDescriptorResponse.$type, FileDescriptorResponse);

function createBaseExtensionNumberResponse(): ExtensionNumberResponse {
  return { $type: "grpc.reflection.v1alpha.ExtensionNumberResponse", baseTypeName: "", extensionNumber: [] };
}

export const ExtensionNumberResponse = {
  $type: "grpc.reflection.v1alpha.ExtensionNumberResponse" as const,

  encode(message: ExtensionNumberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseTypeName !== undefined && message.baseTypeName !== "") {
      writer.uint32(10).string(message.baseTypeName);
    }
    if (message.extensionNumber !== undefined && message.extensionNumber.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.extensionNumber) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtensionNumberResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtensionNumberResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.baseTypeName = reader.string();
          continue;
        case 2:
          if (tag === 16) {
            message.extensionNumber!.push(reader.int32());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.extensionNumber!.push(reader.int32());
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

  fromJSON(object: any): ExtensionNumberResponse {
    return {
      $type: ExtensionNumberResponse.$type,
      baseTypeName: isSet(object.baseTypeName) ? globalThis.String(object.baseTypeName) : "",
      extensionNumber: globalThis.Array.isArray(object?.extensionNumber)
        ? object.extensionNumber.map((e: any) => globalThis.Number(e))
        : [],
    };
  },

  toJSON(message: ExtensionNumberResponse): unknown {
    const obj: any = {};
    if (message.baseTypeName !== undefined && message.baseTypeName !== "") {
      obj.baseTypeName = message.baseTypeName;
    }
    if (message.extensionNumber?.length) {
      obj.extensionNumber = message.extensionNumber.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExtensionNumberResponse>, I>>(base?: I): ExtensionNumberResponse {
    return ExtensionNumberResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExtensionNumberResponse>, I>>(object: I): ExtensionNumberResponse {
    const message = createBaseExtensionNumberResponse();
    message.baseTypeName = object.baseTypeName ?? "";
    message.extensionNumber = object.extensionNumber?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(ExtensionNumberResponse.$type, ExtensionNumberResponse);

function createBaseListServiceResponse(): ListServiceResponse {
  return { $type: "grpc.reflection.v1alpha.ListServiceResponse", service: [] };
}

export const ListServiceResponse = {
  $type: "grpc.reflection.v1alpha.ListServiceResponse" as const,

  encode(message: ListServiceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.service !== undefined && message.service.length !== 0) {
      for (const v of message.service) {
        ServiceResponse.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListServiceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListServiceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.service!.push(ServiceResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListServiceResponse {
    return {
      $type: ListServiceResponse.$type,
      service: globalThis.Array.isArray(object?.service)
        ? object.service.map((e: any) => ServiceResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListServiceResponse): unknown {
    const obj: any = {};
    if (message.service?.length) {
      obj.service = message.service.map((e) => ServiceResponse.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListServiceResponse>, I>>(base?: I): ListServiceResponse {
    return ListServiceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListServiceResponse>, I>>(object: I): ListServiceResponse {
    const message = createBaseListServiceResponse();
    message.service = object.service?.map((e) => ServiceResponse.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ListServiceResponse.$type, ListServiceResponse);

function createBaseServiceResponse(): ServiceResponse {
  return { $type: "grpc.reflection.v1alpha.ServiceResponse", name: "" };
}

export const ServiceResponse = {
  $type: "grpc.reflection.v1alpha.ServiceResponse" as const,

  encode(message: ServiceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServiceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ServiceResponse {
    return { $type: ServiceResponse.$type, name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: ServiceResponse): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ServiceResponse>, I>>(base?: I): ServiceResponse {
    return ServiceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ServiceResponse>, I>>(object: I): ServiceResponse {
    const message = createBaseServiceResponse();
    message.name = object.name ?? "";
    return message;
  },
};

messageTypeRegistry.set(ServiceResponse.$type, ServiceResponse);

function createBaseErrorResponse(): ErrorResponse {
  return { $type: "grpc.reflection.v1alpha.ErrorResponse", errorCode: 0, errorMessage: "" };
}

export const ErrorResponse = {
  $type: "grpc.reflection.v1alpha.ErrorResponse" as const,

  encode(message: ErrorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.errorCode !== undefined && message.errorCode !== 0) {
      writer.uint32(8).int32(message.errorCode);
    }
    if (message.errorMessage !== undefined && message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ErrorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseErrorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.errorCode = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): ErrorResponse {
    return {
      $type: ErrorResponse.$type,
      errorCode: isSet(object.errorCode) ? globalThis.Number(object.errorCode) : 0,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : "",
    };
  },

  toJSON(message: ErrorResponse): unknown {
    const obj: any = {};
    if (message.errorCode !== undefined && message.errorCode !== 0) {
      obj.errorCode = Math.round(message.errorCode);
    }
    if (message.errorMessage !== undefined && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ErrorResponse>, I>>(base?: I): ErrorResponse {
    return ErrorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ErrorResponse>, I>>(object: I): ErrorResponse {
    const message = createBaseErrorResponse();
    message.errorCode = object.errorCode ?? 0;
    message.errorMessage = object.errorMessage ?? "";
    return message;
  },
};

messageTypeRegistry.set(ErrorResponse.$type, ErrorResponse);

export interface ServerReflection {
  /**
   * The reflection service is structured as a bidirectional stream, ensuring
   * all related requests go to a single server.
   */
  ServerReflectionInfo(
    request: Observable<DeepPartial<ServerReflectionRequest>>,
    metadata?: grpc.Metadata,
  ): Observable<ServerReflectionResponse>;
}

export class ServerReflectionClientImpl implements ServerReflection {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ServerReflectionInfo = this.ServerReflectionInfo.bind(this);
  }

  ServerReflectionInfo(
    request: Observable<DeepPartial<ServerReflectionRequest>>,
    metadata?: grpc.Metadata,
  ): Observable<ServerReflectionResponse> {
    throw new Error("ts-proto does not yet support client streaming!");
  }
}

export const ServerReflectionDesc = { serviceName: "grpc.reflection.v1alpha.ServerReflection" };

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
  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Observable<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;
    streamingTransport?: grpc.TransportFactory;
    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;
      streamingTransport?: grpc.TransportFactory;
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

  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Observable<any> {
    const upStreamCodes = this.options.upStreamRetryCodes ?? [];
    const DEFAULT_TIMEOUT_TIME: number = 3_000;
    const request = { ..._request, ...methodDesc.requestType };
    const transport = this.options.streamingTransport ?? this.options.transport;
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Observable((observer) => {
      const upStream = () => {
        const client = grpc.invoke(methodDesc, {
          host: this.host,
          request,
          ...(transport !== undefined ? { transport } : {}),
          metadata: maybeCombinedMetadata ?? {},
          debug: this.options.debug ?? false,
          onMessage: (next) => observer.next(next),
          onEnd: (code: grpc.Code, message: string, trailers: grpc.Metadata) => {
            if (code === 0) {
              observer.complete();
            } else if (upStreamCodes.includes(code)) {
              setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
            } else {
              const err = new Error(message) as any;
              err.code = code;
              err.metadata = trailers;
              observer.error(err);
            }
          },
        });
        observer.add(() => client.close());
      };
      upStream();
    }).pipe(share());
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
