/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "fm";

export interface LLMContent {
  $type?: "fm.LLMContent";
  /** the text of the message */
  text?:
    | string
    | undefined;
  /** the URL or base64 string of the image */
  imageUrl?: string | undefined;
}

export interface LLMMessage {
  $type?: "fm.LLMMessage";
  /** the role of the entity sending the message */
  role?:
    | string
    | undefined;
  /** the content of the message */
  llmContents?: LLMContent[] | undefined;
}

/** One interaction with the LLM model. */
export interface LLMInteraction {
  $type?: "fm.LLMInteraction";
  /** the family of the model that we called */
  modelFamily?:
    | string
    | undefined;
  /** the name of the model used to make the decision */
  modelName?:
    | string
    | undefined;
  /** the prompt used to make the decision */
  llmMessages?:
    | LLMMessage[]
    | undefined;
  /** the response from the model */
  response?: string | undefined;
}

function createBaseLLMContent(): LLMContent {
  return { $type: "fm.LLMContent", text: undefined, imageUrl: undefined };
}

export const LLMContent = {
  $type: "fm.LLMContent" as const,

  encode(message: LLMContent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== undefined) {
      writer.uint32(10).string(message.text);
    }
    if (message.imageUrl !== undefined) {
      writer.uint32(18).string(message.imageUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LLMContent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLLMContent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.text = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): LLMContent {
    return {
      $type: LLMContent.$type,
      text: isSet(object.text) ? globalThis.String(object.text) : undefined,
      imageUrl: isSet(object.imageUrl) ? globalThis.String(object.imageUrl) : undefined,
    };
  },

  toJSON(message: LLMContent): unknown {
    const obj: any = {};
    if (message.text !== undefined) {
      obj.text = message.text;
    }
    if (message.imageUrl !== undefined) {
      obj.imageUrl = message.imageUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LLMContent>, I>>(base?: I): LLMContent {
    return LLMContent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LLMContent>, I>>(object: I): LLMContent {
    const message = createBaseLLMContent();
    message.text = object.text ?? undefined;
    message.imageUrl = object.imageUrl ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(LLMContent.$type, LLMContent);

function createBaseLLMMessage(): LLMMessage {
  return { $type: "fm.LLMMessage", role: "", llmContents: [] };
}

export const LLMMessage = {
  $type: "fm.LLMMessage" as const,

  encode(message: LLMMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.role !== undefined && message.role !== "") {
      writer.uint32(10).string(message.role);
    }
    if (message.llmContents !== undefined && message.llmContents.length !== 0) {
      for (const v of message.llmContents) {
        LLMContent.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LLMMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLLMMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.role = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.llmContents!.push(LLMContent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LLMMessage {
    return {
      $type: LLMMessage.$type,
      role: isSet(object.role) ? globalThis.String(object.role) : "",
      llmContents: globalThis.Array.isArray(object?.llmContents)
        ? object.llmContents.map((e: any) => LLMContent.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LLMMessage): unknown {
    const obj: any = {};
    if (message.role !== undefined && message.role !== "") {
      obj.role = message.role;
    }
    if (message.llmContents?.length) {
      obj.llmContents = message.llmContents.map((e) => LLMContent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LLMMessage>, I>>(base?: I): LLMMessage {
    return LLMMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LLMMessage>, I>>(object: I): LLMMessage {
    const message = createBaseLLMMessage();
    message.role = object.role ?? "";
    message.llmContents = object.llmContents?.map((e) => LLMContent.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(LLMMessage.$type, LLMMessage);

function createBaseLLMInteraction(): LLMInteraction {
  return { $type: "fm.LLMInteraction", modelFamily: "", modelName: "", llmMessages: [], response: "" };
}

export const LLMInteraction = {
  $type: "fm.LLMInteraction" as const,

  encode(message: LLMInteraction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.modelFamily !== undefined && message.modelFamily !== "") {
      writer.uint32(10).string(message.modelFamily);
    }
    if (message.modelName !== undefined && message.modelName !== "") {
      writer.uint32(18).string(message.modelName);
    }
    if (message.llmMessages !== undefined && message.llmMessages.length !== 0) {
      for (const v of message.llmMessages) {
        LLMMessage.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.response !== undefined && message.response !== "") {
      writer.uint32(34).string(message.response);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LLMInteraction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLLMInteraction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.modelFamily = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.modelName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.llmMessages!.push(LLMMessage.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.response = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LLMInteraction {
    return {
      $type: LLMInteraction.$type,
      modelFamily: isSet(object.modelFamily) ? globalThis.String(object.modelFamily) : "",
      modelName: isSet(object.modelName) ? globalThis.String(object.modelName) : "",
      llmMessages: globalThis.Array.isArray(object?.llmMessages)
        ? object.llmMessages.map((e: any) => LLMMessage.fromJSON(e))
        : [],
      response: isSet(object.response) ? globalThis.String(object.response) : "",
    };
  },

  toJSON(message: LLMInteraction): unknown {
    const obj: any = {};
    if (message.modelFamily !== undefined && message.modelFamily !== "") {
      obj.modelFamily = message.modelFamily;
    }
    if (message.modelName !== undefined && message.modelName !== "") {
      obj.modelName = message.modelName;
    }
    if (message.llmMessages?.length) {
      obj.llmMessages = message.llmMessages.map((e) => LLMMessage.toJSON(e));
    }
    if (message.response !== undefined && message.response !== "") {
      obj.response = message.response;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LLMInteraction>, I>>(base?: I): LLMInteraction {
    return LLMInteraction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LLMInteraction>, I>>(object: I): LLMInteraction {
    const message = createBaseLLMInteraction();
    message.modelFamily = object.modelFamily ?? "";
    message.modelName = object.modelName ?? "";
    message.llmMessages = object.llmMessages?.map((e) => LLMMessage.fromPartial(e)) || [];
    message.response = object.response ?? "";
    return message;
  },
};

messageTypeRegistry.set(LLMInteraction.$type, LLMInteraction);

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
