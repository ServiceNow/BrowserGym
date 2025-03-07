/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { UserProfileInfo } from "../../common/user_profile";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "pb.v1alpha2";

/** Contains the deleted information about the object */
export interface DeletedObjectInfo {
  deletedTime?: Date | undefined;
  deletedBy?:
    | string
    | undefined;
  /** Contains the reason of deletion specified */
  deletedReason?:
    | string
    | undefined;
  /**
   * Reason for not being able to restore
   * Empty string means resource can be restored
   */
  unrestorableReason?: string | undefined;
  deleter?: UserProfileInfo | undefined;
}

function createBaseDeletedObjectInfo(): DeletedObjectInfo {
  return { deletedTime: undefined, deletedBy: "", deletedReason: "", unrestorableReason: "", deleter: undefined };
}

export const DeletedObjectInfo = {
  encode(message: DeletedObjectInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.deletedTime !== undefined) {
      Timestamp.encode(toTimestamp(message.deletedTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.deletedBy !== undefined && message.deletedBy !== "") {
      writer.uint32(18).string(message.deletedBy);
    }
    if (message.deletedReason !== undefined && message.deletedReason !== "") {
      writer.uint32(26).string(message.deletedReason);
    }
    if (message.unrestorableReason !== undefined && message.unrestorableReason !== "") {
      writer.uint32(42).string(message.unrestorableReason);
    }
    if (message.deleter !== undefined) {
      UserProfileInfo.encode(message.deleter, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeletedObjectInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeletedObjectInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.deletedTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deletedBy = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.deletedReason = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.unrestorableReason = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.deleter = UserProfileInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeletedObjectInfo {
    return {
      deletedTime: isSet(object.deletedTime) ? fromJsonTimestamp(object.deletedTime) : undefined,
      deletedBy: isSet(object.deletedBy) ? globalThis.String(object.deletedBy) : "",
      deletedReason: isSet(object.deletedReason) ? globalThis.String(object.deletedReason) : "",
      unrestorableReason: isSet(object.unrestorableReason) ? globalThis.String(object.unrestorableReason) : "",
      deleter: isSet(object.deleter) ? UserProfileInfo.fromJSON(object.deleter) : undefined,
    };
  },

  toJSON(message: DeletedObjectInfo): unknown {
    const obj: any = {};
    if (message.deletedTime !== undefined) {
      obj.deletedTime = message.deletedTime.toISOString();
    }
    if (message.deletedBy !== undefined && message.deletedBy !== "") {
      obj.deletedBy = message.deletedBy;
    }
    if (message.deletedReason !== undefined && message.deletedReason !== "") {
      obj.deletedReason = message.deletedReason;
    }
    if (message.unrestorableReason !== undefined && message.unrestorableReason !== "") {
      obj.unrestorableReason = message.unrestorableReason;
    }
    if (message.deleter !== undefined) {
      obj.deleter = UserProfileInfo.toJSON(message.deleter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeletedObjectInfo>, I>>(base?: I): DeletedObjectInfo {
    return DeletedObjectInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeletedObjectInfo>, I>>(object: I): DeletedObjectInfo {
    const message = createBaseDeletedObjectInfo();
    message.deletedTime = object.deletedTime ?? undefined;
    message.deletedBy = object.deletedBy ?? "";
    message.deletedReason = object.deletedReason ?? "";
    message.unrestorableReason = object.unrestorableReason ?? "";
    message.deleter = (object.deleter !== undefined && object.deleter !== null)
      ? UserProfileInfo.fromPartial(object.deleter)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
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
