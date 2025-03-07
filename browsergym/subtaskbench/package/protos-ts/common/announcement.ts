/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "common";

export enum AnnouncementType {
  UNSPECIFIED = 0,
  RELEASE_NOTES = 1,
  UNRECOGNIZED = -1,
}

export function announcementTypeFromJSON(object: any): AnnouncementType {
  switch (object) {
    case 0:
    case "UNSPECIFIED":
      return AnnouncementType.UNSPECIFIED;
    case 1:
    case "RELEASE_NOTES":
      return AnnouncementType.RELEASE_NOTES;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AnnouncementType.UNRECOGNIZED;
  }
}

export function announcementTypeToJSON(object: AnnouncementType): string {
  switch (object) {
    case AnnouncementType.UNSPECIFIED:
      return "UNSPECIFIED";
    case AnnouncementType.RELEASE_NOTES:
      return "RELEASE_NOTES";
    case AnnouncementType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface AnnouncementContentBlock {
  $type?: "common.AnnouncementContentBlock";
  body?: AnnouncementContentMarkdown | undefined;
}

export interface AnnouncementContentMarkdown {
  $type?: "common.AnnouncementContentMarkdown";
  data?: string | undefined;
}

function createBaseAnnouncementContentBlock(): AnnouncementContentBlock {
  return { $type: "common.AnnouncementContentBlock", body: undefined };
}

export const AnnouncementContentBlock = {
  $type: "common.AnnouncementContentBlock" as const,

  encode(message: AnnouncementContentBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.body !== undefined) {
      AnnouncementContentMarkdown.encode(message.body, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnnouncementContentBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnnouncementContentBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.body = AnnouncementContentMarkdown.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AnnouncementContentBlock {
    return {
      $type: AnnouncementContentBlock.$type,
      body: isSet(object.body) ? AnnouncementContentMarkdown.fromJSON(object.body) : undefined,
    };
  },

  toJSON(message: AnnouncementContentBlock): unknown {
    const obj: any = {};
    if (message.body !== undefined) {
      obj.body = AnnouncementContentMarkdown.toJSON(message.body);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AnnouncementContentBlock>, I>>(base?: I): AnnouncementContentBlock {
    return AnnouncementContentBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AnnouncementContentBlock>, I>>(object: I): AnnouncementContentBlock {
    const message = createBaseAnnouncementContentBlock();
    message.body = (object.body !== undefined && object.body !== null)
      ? AnnouncementContentMarkdown.fromPartial(object.body)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(AnnouncementContentBlock.$type, AnnouncementContentBlock);

function createBaseAnnouncementContentMarkdown(): AnnouncementContentMarkdown {
  return { $type: "common.AnnouncementContentMarkdown", data: "" };
}

export const AnnouncementContentMarkdown = {
  $type: "common.AnnouncementContentMarkdown" as const,

  encode(message: AnnouncementContentMarkdown, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data !== undefined && message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnnouncementContentMarkdown {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnnouncementContentMarkdown();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AnnouncementContentMarkdown {
    return { $type: AnnouncementContentMarkdown.$type, data: isSet(object.data) ? globalThis.String(object.data) : "" };
  },

  toJSON(message: AnnouncementContentMarkdown): unknown {
    const obj: any = {};
    if (message.data !== undefined && message.data !== "") {
      obj.data = message.data;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AnnouncementContentMarkdown>, I>>(base?: I): AnnouncementContentMarkdown {
    return AnnouncementContentMarkdown.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AnnouncementContentMarkdown>, I>>(object: I): AnnouncementContentMarkdown {
    const message = createBaseAnnouncementContentMarkdown();
    message.data = object.data ?? "";
    return message;
  },
};

messageTypeRegistry.set(AnnouncementContentMarkdown.$type, AnnouncementContentMarkdown);

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
