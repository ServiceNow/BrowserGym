/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "common";

export interface UserProfileInfo {
  $type?: "common.UserProfileInfo";
  username?: string | undefined;
  fullName?: string | undefined;
  imageUrl?: string | undefined;
}

function createBaseUserProfileInfo(): UserProfileInfo {
  return { $type: "common.UserProfileInfo", username: "", fullName: "", imageUrl: "" };
}

export const UserProfileInfo = {
  $type: "common.UserProfileInfo" as const,

  encode(message: UserProfileInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== undefined && message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.fullName !== undefined && message.fullName !== "") {
      writer.uint32(18).string(message.fullName);
    }
    if (message.imageUrl !== undefined && message.imageUrl !== "") {
      writer.uint32(26).string(message.imageUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserProfileInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserProfileInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fullName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.imageUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserProfileInfo {
    return {
      $type: UserProfileInfo.$type,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      fullName: isSet(object.fullName) ? globalThis.String(object.fullName) : "",
      imageUrl: isSet(object.imageUrl) ? globalThis.String(object.imageUrl) : "",
    };
  },

  toJSON(message: UserProfileInfo): unknown {
    const obj: any = {};
    if (message.username !== undefined && message.username !== "") {
      obj.username = message.username;
    }
    if (message.fullName !== undefined && message.fullName !== "") {
      obj.fullName = message.fullName;
    }
    if (message.imageUrl !== undefined && message.imageUrl !== "") {
      obj.imageUrl = message.imageUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserProfileInfo>, I>>(base?: I): UserProfileInfo {
    return UserProfileInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserProfileInfo>, I>>(object: I): UserProfileInfo {
    const message = createBaseUserProfileInfo();
    message.username = object.username ?? "";
    message.fullName = object.fullName ?? "";
    message.imageUrl = object.imageUrl ?? "";
    return message;
  },
};

messageTypeRegistry.set(UserProfileInfo.$type, UserProfileInfo);

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
