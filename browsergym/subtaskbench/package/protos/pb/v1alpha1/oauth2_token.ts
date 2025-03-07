/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

/**
 * Designed based on https://pkg.go.dev/golang.org/x/oauth2#Token
 * Excluding the "raw" field which is not used in our codebase now.
 */
export interface Oauth2Token {
  $type?: "pb.v1alpha1.Oauth2Token";
  accessToken?: string | undefined;
  tokenType?: string | undefined;
  refreshToken?: string | undefined;
  expiry?: Date | undefined;
}

function createBaseOauth2Token(): Oauth2Token {
  return { $type: "pb.v1alpha1.Oauth2Token", accessToken: "", tokenType: "", refreshToken: "", expiry: undefined };
}

export const Oauth2Token = {
  $type: "pb.v1alpha1.Oauth2Token" as const,

  encode(message: Oauth2Token, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== undefined && message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.tokenType !== undefined && message.tokenType !== "") {
      writer.uint32(18).string(message.tokenType);
    }
    if (message.refreshToken !== undefined && message.refreshToken !== "") {
      writer.uint32(26).string(message.refreshToken);
    }
    if (message.expiry !== undefined) {
      Timestamp.encode(toTimestamp(message.expiry), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Oauth2Token {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOauth2Token();
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

          message.tokenType = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.expiry = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Oauth2Token {
    return {
      $type: Oauth2Token.$type,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      tokenType: isSet(object.tokenType) ? globalThis.String(object.tokenType) : "",
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "",
      expiry: isSet(object.expiry) ? fromJsonTimestamp(object.expiry) : undefined,
    };
  },

  toJSON(message: Oauth2Token): unknown {
    const obj: any = {};
    if (message.accessToken !== undefined && message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.tokenType !== undefined && message.tokenType !== "") {
      obj.tokenType = message.tokenType;
    }
    if (message.refreshToken !== undefined && message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    if (message.expiry !== undefined) {
      obj.expiry = message.expiry.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Oauth2Token>, I>>(base?: I): Oauth2Token {
    return Oauth2Token.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Oauth2Token>, I>>(object: I): Oauth2Token {
    const message = createBaseOauth2Token();
    message.accessToken = object.accessToken ?? "";
    message.tokenType = object.tokenType ?? "";
    message.refreshToken = object.refreshToken ?? "";
    message.expiry = object.expiry ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Oauth2Token.$type, Oauth2Token);

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
