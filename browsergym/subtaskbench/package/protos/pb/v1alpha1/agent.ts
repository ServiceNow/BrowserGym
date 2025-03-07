/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

/**
 * Communication between the browser extension and desktop app, which uses the
 * Chrome's native messaging through stdin/stdout. The message would be serialized
 * using JSON.
 *
 * see: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging
 */
export interface InterAgentMessage {
  $type?: "pb.v1alpha1.InterAgentMessage";
  authCodeRequest?: InterAgentMessageAuthCodeRequest | undefined;
  authCodeResponse?: InterAgentMessageAuthCodeResponse | undefined;
  authCodeError?: InterAgentMessageAuthCodeError | undefined;
}

/**
 * if the receiving agent doesn't have machine identity set up, or the process
 * yields some error, it would return an AuthCodeError message.
 */
export enum InterAgentMessageAuthCodeError {
  UNSPECIFIED = 0,
  AGENT_NOT_REGISTERED = 1,
  API_ERROR = 2,
  UNRECOGNIZED = -1,
}

export function interAgentMessageAuthCodeErrorFromJSON(object: any): InterAgentMessageAuthCodeError {
  switch (object) {
    case 0:
    case "AUTH_CODE_ERROR_UNSPECIFIED":
      return InterAgentMessageAuthCodeError.UNSPECIFIED;
    case 1:
    case "AGENT_NOT_REGISTERED":
      return InterAgentMessageAuthCodeError.AGENT_NOT_REGISTERED;
    case 2:
    case "API_ERROR":
      return InterAgentMessageAuthCodeError.API_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InterAgentMessageAuthCodeError.UNRECOGNIZED;
  }
}

export function interAgentMessageAuthCodeErrorToJSON(object: InterAgentMessageAuthCodeError): string {
  switch (object) {
    case InterAgentMessageAuthCodeError.UNSPECIFIED:
      return "AUTH_CODE_ERROR_UNSPECIFIED";
    case InterAgentMessageAuthCodeError.AGENT_NOT_REGISTERED:
      return "AGENT_NOT_REGISTERED";
    case InterAgentMessageAuthCodeError.API_ERROR:
      return "API_ERROR";
    case InterAgentMessageAuthCodeError.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** message sent from one agent to the other asking for a registration auth code */
export interface InterAgentMessageAuthCodeRequest {
  $type?: "pb.v1alpha1.InterAgentMessage.AuthCodeRequest";
}

/**
 * if the receiving agent has machine identity set up, it would call the
 * MachineIdentityService.GenerateAuthCode API and forward the
 * information in GenerateAuthResponse using the following message.
 */
export interface InterAgentMessageAuthCodeResponse {
  $type?: "pb.v1alpha1.InterAgentMessage.AuthCodeResponse";
  authCode?: string | undefined;
  agentId?: string | undefined;
}

function createBaseInterAgentMessage(): InterAgentMessage {
  return {
    $type: "pb.v1alpha1.InterAgentMessage",
    authCodeRequest: undefined,
    authCodeResponse: undefined,
    authCodeError: undefined,
  };
}

export const InterAgentMessage = {
  $type: "pb.v1alpha1.InterAgentMessage" as const,

  encode(message: InterAgentMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authCodeRequest !== undefined) {
      InterAgentMessageAuthCodeRequest.encode(message.authCodeRequest, writer.uint32(10).fork()).ldelim();
    }
    if (message.authCodeResponse !== undefined) {
      InterAgentMessageAuthCodeResponse.encode(message.authCodeResponse, writer.uint32(18).fork()).ldelim();
    }
    if (message.authCodeError !== undefined) {
      writer.uint32(24).int32(message.authCodeError);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InterAgentMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterAgentMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authCodeRequest = InterAgentMessageAuthCodeRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authCodeResponse = InterAgentMessageAuthCodeResponse.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.authCodeError = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InterAgentMessage {
    return {
      $type: InterAgentMessage.$type,
      authCodeRequest: isSet(object.authCodeRequest)
        ? InterAgentMessageAuthCodeRequest.fromJSON(object.authCodeRequest)
        : undefined,
      authCodeResponse: isSet(object.authCodeResponse)
        ? InterAgentMessageAuthCodeResponse.fromJSON(object.authCodeResponse)
        : undefined,
      authCodeError: isSet(object.authCodeError)
        ? interAgentMessageAuthCodeErrorFromJSON(object.authCodeError)
        : undefined,
    };
  },

  toJSON(message: InterAgentMessage): unknown {
    const obj: any = {};
    if (message.authCodeRequest !== undefined) {
      obj.authCodeRequest = InterAgentMessageAuthCodeRequest.toJSON(message.authCodeRequest);
    }
    if (message.authCodeResponse !== undefined) {
      obj.authCodeResponse = InterAgentMessageAuthCodeResponse.toJSON(message.authCodeResponse);
    }
    if (message.authCodeError !== undefined) {
      obj.authCodeError = interAgentMessageAuthCodeErrorToJSON(message.authCodeError);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InterAgentMessage>, I>>(base?: I): InterAgentMessage {
    return InterAgentMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InterAgentMessage>, I>>(object: I): InterAgentMessage {
    const message = createBaseInterAgentMessage();
    message.authCodeRequest = (object.authCodeRequest !== undefined && object.authCodeRequest !== null)
      ? InterAgentMessageAuthCodeRequest.fromPartial(object.authCodeRequest)
      : undefined;
    message.authCodeResponse = (object.authCodeResponse !== undefined && object.authCodeResponse !== null)
      ? InterAgentMessageAuthCodeResponse.fromPartial(object.authCodeResponse)
      : undefined;
    message.authCodeError = object.authCodeError ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(InterAgentMessage.$type, InterAgentMessage);

function createBaseInterAgentMessageAuthCodeRequest(): InterAgentMessageAuthCodeRequest {
  return { $type: "pb.v1alpha1.InterAgentMessage.AuthCodeRequest" };
}

export const InterAgentMessageAuthCodeRequest = {
  $type: "pb.v1alpha1.InterAgentMessage.AuthCodeRequest" as const,

  encode(_: InterAgentMessageAuthCodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InterAgentMessageAuthCodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterAgentMessageAuthCodeRequest();
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

  fromJSON(_: any): InterAgentMessageAuthCodeRequest {
    return { $type: InterAgentMessageAuthCodeRequest.$type };
  },

  toJSON(_: InterAgentMessageAuthCodeRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<InterAgentMessageAuthCodeRequest>, I>>(
    base?: I,
  ): InterAgentMessageAuthCodeRequest {
    return InterAgentMessageAuthCodeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InterAgentMessageAuthCodeRequest>, I>>(
    _: I,
  ): InterAgentMessageAuthCodeRequest {
    const message = createBaseInterAgentMessageAuthCodeRequest();
    return message;
  },
};

messageTypeRegistry.set(InterAgentMessageAuthCodeRequest.$type, InterAgentMessageAuthCodeRequest);

function createBaseInterAgentMessageAuthCodeResponse(): InterAgentMessageAuthCodeResponse {
  return { $type: "pb.v1alpha1.InterAgentMessage.AuthCodeResponse", authCode: "", agentId: "" };
}

export const InterAgentMessageAuthCodeResponse = {
  $type: "pb.v1alpha1.InterAgentMessage.AuthCodeResponse" as const,

  encode(message: InterAgentMessageAuthCodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authCode !== undefined && message.authCode !== "") {
      writer.uint32(10).string(message.authCode);
    }
    if (message.agentId !== undefined && message.agentId !== "") {
      writer.uint32(18).string(message.agentId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InterAgentMessageAuthCodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterAgentMessageAuthCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authCode = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.agentId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InterAgentMessageAuthCodeResponse {
    return {
      $type: InterAgentMessageAuthCodeResponse.$type,
      authCode: isSet(object.authCode) ? globalThis.String(object.authCode) : "",
      agentId: isSet(object.agentId) ? globalThis.String(object.agentId) : "",
    };
  },

  toJSON(message: InterAgentMessageAuthCodeResponse): unknown {
    const obj: any = {};
    if (message.authCode !== undefined && message.authCode !== "") {
      obj.authCode = message.authCode;
    }
    if (message.agentId !== undefined && message.agentId !== "") {
      obj.agentId = message.agentId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InterAgentMessageAuthCodeResponse>, I>>(
    base?: I,
  ): InterAgentMessageAuthCodeResponse {
    return InterAgentMessageAuthCodeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InterAgentMessageAuthCodeResponse>, I>>(
    object: I,
  ): InterAgentMessageAuthCodeResponse {
    const message = createBaseInterAgentMessageAuthCodeResponse();
    message.authCode = object.authCode ?? "";
    message.agentId = object.agentId ?? "";
    return message;
  },
};

messageTypeRegistry.set(InterAgentMessageAuthCodeResponse.$type, InterAgentMessageAuthCodeResponse);

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
