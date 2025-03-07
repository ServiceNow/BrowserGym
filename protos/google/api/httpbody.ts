/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";
import { Any } from "../protobuf/any";

export const protobufPackage = "google.api";

/**
 * Message that represents an arbitrary HTTP body. It should only be used for
 * payload formats that can't be represented as JSON, such as raw binary or
 * an HTML page.
 *
 * This message can be used both in streaming and non-streaming API methods in
 * the request as well as the response.
 *
 * It can be used as a top-level request field, which is convenient if one
 * wants to extract parameters from either the URL or HTTP template into the
 * request fields and also want access to the raw HTTP body.
 *
 * Example:
 *
 *     message GetResourceRequest {
 *       // A unique request id.
 *       string request_id = 1;
 *
 *       // The raw HTTP body is bound to this field.
 *       google.api.HttpBody http_body = 2;
 *
 *     }
 *
 *     service ResourceService {
 *       rpc GetResource(GetResourceRequest)
 *         returns (google.api.HttpBody);
 *       rpc UpdateResource(google.api.HttpBody)
 *         returns (google.protobuf.Empty);
 *
 *     }
 *
 * Example with streaming methods:
 *
 *     service CaldavService {
 *       rpc GetCalendar(stream google.api.HttpBody)
 *         returns (stream google.api.HttpBody);
 *       rpc UpdateCalendar(stream google.api.HttpBody)
 *         returns (stream google.api.HttpBody);
 *
 *     }
 *
 * Use of this type only changes how the request and response bodies are
 * handled, all other features will continue to work unchanged.
 */
export interface HttpBody {
  $type?: "google.api.HttpBody";
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?:
    | string
    | undefined;
  /** The HTTP request/response body as raw binary. */
  data?:
    | Uint8Array
    | undefined;
  /**
   * Application specific response metadata. Must be set in the first response
   * for streaming APIs.
   */
  extensions?: Any[] | undefined;
}

function createBaseHttpBody(): HttpBody {
  return { $type: "google.api.HttpBody", contentType: "", data: new Uint8Array(0), extensions: [] };
}

export const HttpBody = {
  $type: "google.api.HttpBody" as const,

  encode(message: HttpBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contentType !== undefined && message.contentType !== "") {
      writer.uint32(10).string(message.contentType);
    }
    if (message.data !== undefined && message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.extensions !== undefined && message.extensions.length !== 0) {
      for (const v of message.extensions) {
        Any.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HttpBody {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHttpBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.contentType = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.extensions!.push(Any.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HttpBody {
    return {
      $type: HttpBody.$type,
      contentType: isSet(object.contentType) ? globalThis.String(object.contentType) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      extensions: globalThis.Array.isArray(object?.extensions)
        ? object.extensions.map((e: any) => Any.fromJSON(e))
        : [],
    };
  },

  toJSON(message: HttpBody): unknown {
    const obj: any = {};
    if (message.contentType !== undefined && message.contentType !== "") {
      obj.contentType = message.contentType;
    }
    if (message.data !== undefined && message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.extensions?.length) {
      obj.extensions = message.extensions.map((e) => Any.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HttpBody>, I>>(base?: I): HttpBody {
    return HttpBody.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HttpBody>, I>>(object: I): HttpBody {
    const message = createBaseHttpBody();
    message.contentType = object.contentType ?? "";
    message.data = object.data ?? new Uint8Array(0);
    message.extensions = object.extensions?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(HttpBody.$type, HttpBody);

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
