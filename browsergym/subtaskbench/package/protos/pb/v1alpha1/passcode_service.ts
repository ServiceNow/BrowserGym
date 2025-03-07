/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";
import { GetPasscodeAction } from "./orbot_action";

export const protobufPackage = "pb.v1alpha1";

export interface ApplyPhoneNumberRequest {
  $type?: "pb.v1alpha1.ApplyPhoneNumberRequest";
}

export interface ApplyPhoneNumberResponse {
  $type?: "pb.v1alpha1.ApplyPhoneNumberResponse";
  phoneNumber?: string | undefined;
}

export interface ListPhoneNumbersRequest {
  $type?: "pb.v1alpha1.ListPhoneNumbersRequest";
}

export interface ListPhoneNumbersResponse {
  $type?: "pb.v1alpha1.ListPhoneNumbersResponse";
  phoneNumber?: string[] | undefined;
}

export interface RemovePhoneNumberRequest {
  $type?: "pb.v1alpha1.RemovePhoneNumberRequest";
  /** Phone number should be in the E.164 format: https://www.twilio.com/docs/glossary/what-e164 */
  phoneNumber?: string | undefined;
}

export interface RemovePhoneNumberResponse {
  $type?: "pb.v1alpha1.RemovePhoneNumberResponse";
}

export interface GetSmsAuthCodeRequest {
  $type?: "pb.v1alpha1.GetSmsAuthCodeRequest";
  /**
   * We'll check if the user/org owns the number on the server side.
   * Phone number should be in the E.164 format: https://www.twilio.com/docs/glossary/what-e164
   */
  phoneNumber?: string | undefined;
}

export interface GetSmsAuthCodeResponse {
  $type?: "pb.v1alpha1.GetSmsAuthCodeResponse";
  code?: string | undefined;
  error?: GetSmsAuthCodeResponseGetSmsAuthCodeError | undefined;
}

export enum GetSmsAuthCodeResponseGetSmsAuthCodeError {
  UNSPECIFIED = 0,
  /** PHONE_NUMBER_NOT_FOUND - the requested phone number isn't registered to the organization. */
  PHONE_NUMBER_NOT_FOUND = 1,
  /** TIMEOUT - the code isn't received within the time limit. */
  TIMEOUT = 2,
  UNRECOGNIZED = -1,
}

export function getSmsAuthCodeResponseGetSmsAuthCodeErrorFromJSON(
  object: any,
): GetSmsAuthCodeResponseGetSmsAuthCodeError {
  switch (object) {
    case 0:
    case "GET_SMS_AUTH_CODE_ERROR_UNSPECIFIED":
      return GetSmsAuthCodeResponseGetSmsAuthCodeError.UNSPECIFIED;
    case 1:
    case "PHONE_NUMBER_NOT_FOUND":
      return GetSmsAuthCodeResponseGetSmsAuthCodeError.PHONE_NUMBER_NOT_FOUND;
    case 2:
    case "TIMEOUT":
      return GetSmsAuthCodeResponseGetSmsAuthCodeError.TIMEOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetSmsAuthCodeResponseGetSmsAuthCodeError.UNRECOGNIZED;
  }
}

export function getSmsAuthCodeResponseGetSmsAuthCodeErrorToJSON(
  object: GetSmsAuthCodeResponseGetSmsAuthCodeError,
): string {
  switch (object) {
    case GetSmsAuthCodeResponseGetSmsAuthCodeError.UNSPECIFIED:
      return "GET_SMS_AUTH_CODE_ERROR_UNSPECIFIED";
    case GetSmsAuthCodeResponseGetSmsAuthCodeError.PHONE_NUMBER_NOT_FOUND:
      return "PHONE_NUMBER_NOT_FOUND";
    case GetSmsAuthCodeResponseGetSmsAuthCodeError.TIMEOUT:
      return "TIMEOUT";
    case GetSmsAuthCodeResponseGetSmsAuthCodeError.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GetMFACodeRequest {
  $type?: "pb.v1alpha1.GetMFACodeRequest";
  /** specifies the method to generate mfa code */
  mfaAuthMethod?: GetPasscodeAction | undefined;
}

export interface GetMFACodeResponse {
  $type?: "pb.v1alpha1.GetMFACodeResponse";
  code?: string | undefined;
  error?: GetMFACodeResponseGetMFACodeError | undefined;
}

export enum GetMFACodeResponseGetMFACodeError {
  GET_MFA_CODE_ERROR_UNSPECIFIED = 0,
  /** PHONE_NUMBER_NOT_FOUND - the requested phone number isn't registered to the organization. */
  PHONE_NUMBER_NOT_FOUND = 1,
  /** SECRET_VALUE_NOT_FOUND - the requested secret value isn't registered to the organization. */
  SECRET_VALUE_NOT_FOUND = 2,
  /** GENERATE_MFA_CODE_ERROR - error generating the MFA code. */
  GENERATE_MFA_CODE_ERROR = 3,
  /** TIMEOUT - the code isn't received within the time limit. */
  TIMEOUT = 4,
  UNRECOGNIZED = -1,
}

export function getMFACodeResponseGetMFACodeErrorFromJSON(object: any): GetMFACodeResponseGetMFACodeError {
  switch (object) {
    case 0:
    case "GET_MFA_CODE_ERROR_UNSPECIFIED":
      return GetMFACodeResponseGetMFACodeError.GET_MFA_CODE_ERROR_UNSPECIFIED;
    case 1:
    case "PHONE_NUMBER_NOT_FOUND":
      return GetMFACodeResponseGetMFACodeError.PHONE_NUMBER_NOT_FOUND;
    case 2:
    case "SECRET_VALUE_NOT_FOUND":
      return GetMFACodeResponseGetMFACodeError.SECRET_VALUE_NOT_FOUND;
    case 3:
    case "GENERATE_MFA_CODE_ERROR":
      return GetMFACodeResponseGetMFACodeError.GENERATE_MFA_CODE_ERROR;
    case 4:
    case "TIMEOUT":
      return GetMFACodeResponseGetMFACodeError.TIMEOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetMFACodeResponseGetMFACodeError.UNRECOGNIZED;
  }
}

export function getMFACodeResponseGetMFACodeErrorToJSON(object: GetMFACodeResponseGetMFACodeError): string {
  switch (object) {
    case GetMFACodeResponseGetMFACodeError.GET_MFA_CODE_ERROR_UNSPECIFIED:
      return "GET_MFA_CODE_ERROR_UNSPECIFIED";
    case GetMFACodeResponseGetMFACodeError.PHONE_NUMBER_NOT_FOUND:
      return "PHONE_NUMBER_NOT_FOUND";
    case GetMFACodeResponseGetMFACodeError.SECRET_VALUE_NOT_FOUND:
      return "SECRET_VALUE_NOT_FOUND";
    case GetMFACodeResponseGetMFACodeError.GENERATE_MFA_CODE_ERROR:
      return "GENERATE_MFA_CODE_ERROR";
    case GetMFACodeResponseGetMFACodeError.TIMEOUT:
      return "TIMEOUT";
    case GetMFACodeResponseGetMFACodeError.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseApplyPhoneNumberRequest(): ApplyPhoneNumberRequest {
  return { $type: "pb.v1alpha1.ApplyPhoneNumberRequest" };
}

export const ApplyPhoneNumberRequest = {
  $type: "pb.v1alpha1.ApplyPhoneNumberRequest" as const,

  encode(_: ApplyPhoneNumberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApplyPhoneNumberRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApplyPhoneNumberRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ApplyPhoneNumberRequest {
    return { $type: ApplyPhoneNumberRequest.$type };
  },

  toJSON(_: ApplyPhoneNumberRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ApplyPhoneNumberRequest>, I>>(base?: I): ApplyPhoneNumberRequest {
    return ApplyPhoneNumberRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApplyPhoneNumberRequest>, I>>(_: I): ApplyPhoneNumberRequest {
    const message = createBaseApplyPhoneNumberRequest();
    return message;
  },
};

messageTypeRegistry.set(ApplyPhoneNumberRequest.$type, ApplyPhoneNumberRequest);

function createBaseApplyPhoneNumberResponse(): ApplyPhoneNumberResponse {
  return { $type: "pb.v1alpha1.ApplyPhoneNumberResponse", phoneNumber: "" };
}

export const ApplyPhoneNumberResponse = {
  $type: "pb.v1alpha1.ApplyPhoneNumberResponse" as const,

  encode(message: ApplyPhoneNumberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phoneNumber !== undefined && message.phoneNumber !== "") {
      writer.uint32(10).string(message.phoneNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApplyPhoneNumberResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApplyPhoneNumberResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.phoneNumber = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ApplyPhoneNumberResponse {
    return {
      $type: ApplyPhoneNumberResponse.$type,
      phoneNumber: isSet(object.phoneNumber) ? globalThis.String(object.phoneNumber) : "",
    };
  },

  toJSON(message: ApplyPhoneNumberResponse): unknown {
    const obj: any = {};
    if (message.phoneNumber !== undefined && message.phoneNumber !== "") {
      obj.phoneNumber = message.phoneNumber;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApplyPhoneNumberResponse>, I>>(base?: I): ApplyPhoneNumberResponse {
    return ApplyPhoneNumberResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApplyPhoneNumberResponse>, I>>(object: I): ApplyPhoneNumberResponse {
    const message = createBaseApplyPhoneNumberResponse();
    message.phoneNumber = object.phoneNumber ?? "";
    return message;
  },
};

messageTypeRegistry.set(ApplyPhoneNumberResponse.$type, ApplyPhoneNumberResponse);

function createBaseListPhoneNumbersRequest(): ListPhoneNumbersRequest {
  return { $type: "pb.v1alpha1.ListPhoneNumbersRequest" };
}

export const ListPhoneNumbersRequest = {
  $type: "pb.v1alpha1.ListPhoneNumbersRequest" as const,

  encode(_: ListPhoneNumbersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListPhoneNumbersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPhoneNumbersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ListPhoneNumbersRequest {
    return { $type: ListPhoneNumbersRequest.$type };
  },

  toJSON(_: ListPhoneNumbersRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListPhoneNumbersRequest>, I>>(base?: I): ListPhoneNumbersRequest {
    return ListPhoneNumbersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListPhoneNumbersRequest>, I>>(_: I): ListPhoneNumbersRequest {
    const message = createBaseListPhoneNumbersRequest();
    return message;
  },
};

messageTypeRegistry.set(ListPhoneNumbersRequest.$type, ListPhoneNumbersRequest);

function createBaseListPhoneNumbersResponse(): ListPhoneNumbersResponse {
  return { $type: "pb.v1alpha1.ListPhoneNumbersResponse", phoneNumber: [] };
}

export const ListPhoneNumbersResponse = {
  $type: "pb.v1alpha1.ListPhoneNumbersResponse" as const,

  encode(message: ListPhoneNumbersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phoneNumber !== undefined && message.phoneNumber.length !== 0) {
      for (const v of message.phoneNumber) {
        writer.uint32(10).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListPhoneNumbersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPhoneNumbersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.phoneNumber!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListPhoneNumbersResponse {
    return {
      $type: ListPhoneNumbersResponse.$type,
      phoneNumber: globalThis.Array.isArray(object?.phoneNumber)
        ? object.phoneNumber.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: ListPhoneNumbersResponse): unknown {
    const obj: any = {};
    if (message.phoneNumber?.length) {
      obj.phoneNumber = message.phoneNumber;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListPhoneNumbersResponse>, I>>(base?: I): ListPhoneNumbersResponse {
    return ListPhoneNumbersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListPhoneNumbersResponse>, I>>(object: I): ListPhoneNumbersResponse {
    const message = createBaseListPhoneNumbersResponse();
    message.phoneNumber = object.phoneNumber?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(ListPhoneNumbersResponse.$type, ListPhoneNumbersResponse);

function createBaseRemovePhoneNumberRequest(): RemovePhoneNumberRequest {
  return { $type: "pb.v1alpha1.RemovePhoneNumberRequest", phoneNumber: "" };
}

export const RemovePhoneNumberRequest = {
  $type: "pb.v1alpha1.RemovePhoneNumberRequest" as const,

  encode(message: RemovePhoneNumberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phoneNumber !== undefined && message.phoneNumber !== "") {
      writer.uint32(10).string(message.phoneNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemovePhoneNumberRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemovePhoneNumberRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.phoneNumber = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemovePhoneNumberRequest {
    return {
      $type: RemovePhoneNumberRequest.$type,
      phoneNumber: isSet(object.phoneNumber) ? globalThis.String(object.phoneNumber) : "",
    };
  },

  toJSON(message: RemovePhoneNumberRequest): unknown {
    const obj: any = {};
    if (message.phoneNumber !== undefined && message.phoneNumber !== "") {
      obj.phoneNumber = message.phoneNumber;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemovePhoneNumberRequest>, I>>(base?: I): RemovePhoneNumberRequest {
    return RemovePhoneNumberRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemovePhoneNumberRequest>, I>>(object: I): RemovePhoneNumberRequest {
    const message = createBaseRemovePhoneNumberRequest();
    message.phoneNumber = object.phoneNumber ?? "";
    return message;
  },
};

messageTypeRegistry.set(RemovePhoneNumberRequest.$type, RemovePhoneNumberRequest);

function createBaseRemovePhoneNumberResponse(): RemovePhoneNumberResponse {
  return { $type: "pb.v1alpha1.RemovePhoneNumberResponse" };
}

export const RemovePhoneNumberResponse = {
  $type: "pb.v1alpha1.RemovePhoneNumberResponse" as const,

  encode(_: RemovePhoneNumberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemovePhoneNumberResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemovePhoneNumberResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): RemovePhoneNumberResponse {
    return { $type: RemovePhoneNumberResponse.$type };
  },

  toJSON(_: RemovePhoneNumberResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RemovePhoneNumberResponse>, I>>(base?: I): RemovePhoneNumberResponse {
    return RemovePhoneNumberResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemovePhoneNumberResponse>, I>>(_: I): RemovePhoneNumberResponse {
    const message = createBaseRemovePhoneNumberResponse();
    return message;
  },
};

messageTypeRegistry.set(RemovePhoneNumberResponse.$type, RemovePhoneNumberResponse);

function createBaseGetSmsAuthCodeRequest(): GetSmsAuthCodeRequest {
  return { $type: "pb.v1alpha1.GetSmsAuthCodeRequest", phoneNumber: "" };
}

export const GetSmsAuthCodeRequest = {
  $type: "pb.v1alpha1.GetSmsAuthCodeRequest" as const,

  encode(message: GetSmsAuthCodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phoneNumber !== undefined && message.phoneNumber !== "") {
      writer.uint32(10).string(message.phoneNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSmsAuthCodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSmsAuthCodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.phoneNumber = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSmsAuthCodeRequest {
    return {
      $type: GetSmsAuthCodeRequest.$type,
      phoneNumber: isSet(object.phoneNumber) ? globalThis.String(object.phoneNumber) : "",
    };
  },

  toJSON(message: GetSmsAuthCodeRequest): unknown {
    const obj: any = {};
    if (message.phoneNumber !== undefined && message.phoneNumber !== "") {
      obj.phoneNumber = message.phoneNumber;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSmsAuthCodeRequest>, I>>(base?: I): GetSmsAuthCodeRequest {
    return GetSmsAuthCodeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSmsAuthCodeRequest>, I>>(object: I): GetSmsAuthCodeRequest {
    const message = createBaseGetSmsAuthCodeRequest();
    message.phoneNumber = object.phoneNumber ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetSmsAuthCodeRequest.$type, GetSmsAuthCodeRequest);

function createBaseGetSmsAuthCodeResponse(): GetSmsAuthCodeResponse {
  return { $type: "pb.v1alpha1.GetSmsAuthCodeResponse", code: undefined, error: undefined };
}

export const GetSmsAuthCodeResponse = {
  $type: "pb.v1alpha1.GetSmsAuthCodeResponse" as const,

  encode(message: GetSmsAuthCodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== undefined) {
      writer.uint32(10).string(message.code);
    }
    if (message.error !== undefined) {
      writer.uint32(16).int32(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSmsAuthCodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSmsAuthCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
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

  fromJSON(object: any): GetSmsAuthCodeResponse {
    return {
      $type: GetSmsAuthCodeResponse.$type,
      code: isSet(object.code) ? globalThis.String(object.code) : undefined,
      error: isSet(object.error) ? getSmsAuthCodeResponseGetSmsAuthCodeErrorFromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetSmsAuthCodeResponse): unknown {
    const obj: any = {};
    if (message.code !== undefined) {
      obj.code = message.code;
    }
    if (message.error !== undefined) {
      obj.error = getSmsAuthCodeResponseGetSmsAuthCodeErrorToJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSmsAuthCodeResponse>, I>>(base?: I): GetSmsAuthCodeResponse {
    return GetSmsAuthCodeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSmsAuthCodeResponse>, I>>(object: I): GetSmsAuthCodeResponse {
    const message = createBaseGetSmsAuthCodeResponse();
    message.code = object.code ?? undefined;
    message.error = object.error ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(GetSmsAuthCodeResponse.$type, GetSmsAuthCodeResponse);

function createBaseGetMFACodeRequest(): GetMFACodeRequest {
  return { $type: "pb.v1alpha1.GetMFACodeRequest", mfaAuthMethod: undefined };
}

export const GetMFACodeRequest = {
  $type: "pb.v1alpha1.GetMFACodeRequest" as const,

  encode(message: GetMFACodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mfaAuthMethod !== undefined) {
      GetPasscodeAction.encode(message.mfaAuthMethod, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMFACodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMFACodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.mfaAuthMethod = GetPasscodeAction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMFACodeRequest {
    return {
      $type: GetMFACodeRequest.$type,
      mfaAuthMethod: isSet(object.mfaAuthMethod) ? GetPasscodeAction.fromJSON(object.mfaAuthMethod) : undefined,
    };
  },

  toJSON(message: GetMFACodeRequest): unknown {
    const obj: any = {};
    if (message.mfaAuthMethod !== undefined) {
      obj.mfaAuthMethod = GetPasscodeAction.toJSON(message.mfaAuthMethod);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMFACodeRequest>, I>>(base?: I): GetMFACodeRequest {
    return GetMFACodeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMFACodeRequest>, I>>(object: I): GetMFACodeRequest {
    const message = createBaseGetMFACodeRequest();
    message.mfaAuthMethod = (object.mfaAuthMethod !== undefined && object.mfaAuthMethod !== null)
      ? GetPasscodeAction.fromPartial(object.mfaAuthMethod)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetMFACodeRequest.$type, GetMFACodeRequest);

function createBaseGetMFACodeResponse(): GetMFACodeResponse {
  return { $type: "pb.v1alpha1.GetMFACodeResponse", code: undefined, error: undefined };
}

export const GetMFACodeResponse = {
  $type: "pb.v1alpha1.GetMFACodeResponse" as const,

  encode(message: GetMFACodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== undefined) {
      writer.uint32(10).string(message.code);
    }
    if (message.error !== undefined) {
      writer.uint32(16).int32(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMFACodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMFACodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
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

  fromJSON(object: any): GetMFACodeResponse {
    return {
      $type: GetMFACodeResponse.$type,
      code: isSet(object.code) ? globalThis.String(object.code) : undefined,
      error: isSet(object.error) ? getMFACodeResponseGetMFACodeErrorFromJSON(object.error) : undefined,
    };
  },

  toJSON(message: GetMFACodeResponse): unknown {
    const obj: any = {};
    if (message.code !== undefined) {
      obj.code = message.code;
    }
    if (message.error !== undefined) {
      obj.error = getMFACodeResponseGetMFACodeErrorToJSON(message.error);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMFACodeResponse>, I>>(base?: I): GetMFACodeResponse {
    return GetMFACodeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMFACodeResponse>, I>>(object: I): GetMFACodeResponse {
    const message = createBaseGetMFACodeResponse();
    message.code = object.code ?? undefined;
    message.error = object.error ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(GetMFACodeResponse.$type, GetMFACodeResponse);

export interface Passcode {
  /** The following methods are for SMS-based passcode */
  ApplyPhoneNumber(
    request: DeepPartial<ApplyPhoneNumberRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ApplyPhoneNumberResponse>;
  ListPhoneNumbers(
    request: DeepPartial<ListPhoneNumbersRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListPhoneNumbersResponse>;
  RemovePhoneNumber(
    request: DeepPartial<RemovePhoneNumberRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemovePhoneNumberResponse>;
  GetSmsAuthCode(
    request: DeepPartial<GetSmsAuthCodeRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetSmsAuthCodeResponse>;
  GetMFACode(request: DeepPartial<GetMFACodeRequest>, metadata?: grpc.Metadata): Promise<GetMFACodeResponse>;
}

export class PasscodeClientImpl implements Passcode {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ApplyPhoneNumber = this.ApplyPhoneNumber.bind(this);
    this.ListPhoneNumbers = this.ListPhoneNumbers.bind(this);
    this.RemovePhoneNumber = this.RemovePhoneNumber.bind(this);
    this.GetSmsAuthCode = this.GetSmsAuthCode.bind(this);
    this.GetMFACode = this.GetMFACode.bind(this);
  }

  ApplyPhoneNumber(
    request: DeepPartial<ApplyPhoneNumberRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ApplyPhoneNumberResponse> {
    return this.rpc.unary(PasscodeApplyPhoneNumberDesc, ApplyPhoneNumberRequest.fromPartial(request), metadata);
  }

  ListPhoneNumbers(
    request: DeepPartial<ListPhoneNumbersRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListPhoneNumbersResponse> {
    return this.rpc.unary(PasscodeListPhoneNumbersDesc, ListPhoneNumbersRequest.fromPartial(request), metadata);
  }

  RemovePhoneNumber(
    request: DeepPartial<RemovePhoneNumberRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemovePhoneNumberResponse> {
    return this.rpc.unary(PasscodeRemovePhoneNumberDesc, RemovePhoneNumberRequest.fromPartial(request), metadata);
  }

  GetSmsAuthCode(
    request: DeepPartial<GetSmsAuthCodeRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetSmsAuthCodeResponse> {
    return this.rpc.unary(PasscodeGetSmsAuthCodeDesc, GetSmsAuthCodeRequest.fromPartial(request), metadata);
  }

  GetMFACode(request: DeepPartial<GetMFACodeRequest>, metadata?: grpc.Metadata): Promise<GetMFACodeResponse> {
    return this.rpc.unary(PasscodeGetMFACodeDesc, GetMFACodeRequest.fromPartial(request), metadata);
  }
}

export const PasscodeDesc = { serviceName: "pb.v1alpha1.Passcode" };

export const PasscodeApplyPhoneNumberDesc: UnaryMethodDefinitionish = {
  methodName: "ApplyPhoneNumber",
  service: PasscodeDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ApplyPhoneNumberRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ApplyPhoneNumberResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PasscodeListPhoneNumbersDesc: UnaryMethodDefinitionish = {
  methodName: "ListPhoneNumbers",
  service: PasscodeDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListPhoneNumbersRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListPhoneNumbersResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PasscodeRemovePhoneNumberDesc: UnaryMethodDefinitionish = {
  methodName: "RemovePhoneNumber",
  service: PasscodeDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemovePhoneNumberRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemovePhoneNumberResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PasscodeGetSmsAuthCodeDesc: UnaryMethodDefinitionish = {
  methodName: "GetSmsAuthCode",
  service: PasscodeDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetSmsAuthCodeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetSmsAuthCodeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PasscodeGetMFACodeDesc: UnaryMethodDefinitionish = {
  methodName: "GetMFACode",
  service: PasscodeDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetMFACodeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetMFACodeResponse.decode(data);
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
