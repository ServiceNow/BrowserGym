/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export interface DocumentBlob {
  $type?: "pb.v1alpha1.DocumentBlob";
  /** Mime type of the document, e.g. "application/pdf", "image/jpeg". */
  mimeType?:
    | string
    | undefined;
  /** Document bytes. */
  content?:
    | Uint8Array
    | undefined;
  /**
   * Document bytes in base64 encoding.
   * NOTE: This field is only intended to be used in textproto files for
   * offline evaluation. In our production systems, we should only use the
   * bytes content field.
   */
  base64Content?: Uint8Array | undefined;
}

export interface Document {
  $type?: "pb.v1alpha1.Document";
  /**
   * Document with content bytes, which needs to provide the MIME type.
   * NOTE: We prefer to send documents using gcs_uri rather than document_blob
   * because using gcs_uri allows for better auditing and debugging capabilities.
   */
  documentBlob?:
    | DocumentBlob
    | undefined;
  /** GCS URI to the document, where the MIME type can be stored in GCS file property. */
  gcsUri?:
    | string
    | undefined;
  /**
   * Refers to the documents uploaded to the UserFile service, where users
   * only have access to the uploaded file ID, and how the uploaded files are
   * stored internally is not visible to the user.
   */
  fileId?: string | undefined;
  filename?: string | undefined;
}

function createBaseDocumentBlob(): DocumentBlob {
  return {
    $type: "pb.v1alpha1.DocumentBlob",
    mimeType: "",
    content: new Uint8Array(0),
    base64Content: new Uint8Array(0),
  };
}

export const DocumentBlob = {
  $type: "pb.v1alpha1.DocumentBlob" as const,

  encode(message: DocumentBlob, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mimeType !== undefined && message.mimeType !== "") {
      writer.uint32(10).string(message.mimeType);
    }
    if (message.content !== undefined && message.content.length !== 0) {
      writer.uint32(18).bytes(message.content);
    }
    if (message.base64Content !== undefined && message.base64Content.length !== 0) {
      writer.uint32(26).bytes(message.base64Content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentBlob {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentBlob();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.mimeType = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.content = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.base64Content = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentBlob {
    return {
      $type: DocumentBlob.$type,
      mimeType: isSet(object.mimeType) ? globalThis.String(object.mimeType) : "",
      content: isSet(object.content) ? bytesFromBase64(object.content) : new Uint8Array(0),
      base64Content: isSet(object.base64Content) ? bytesFromBase64(object.base64Content) : new Uint8Array(0),
    };
  },

  toJSON(message: DocumentBlob): unknown {
    const obj: any = {};
    if (message.mimeType !== undefined && message.mimeType !== "") {
      obj.mimeType = message.mimeType;
    }
    if (message.content !== undefined && message.content.length !== 0) {
      obj.content = base64FromBytes(message.content);
    }
    if (message.base64Content !== undefined && message.base64Content.length !== 0) {
      obj.base64Content = base64FromBytes(message.base64Content);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentBlob>, I>>(base?: I): DocumentBlob {
    return DocumentBlob.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentBlob>, I>>(object: I): DocumentBlob {
    const message = createBaseDocumentBlob();
    message.mimeType = object.mimeType ?? "";
    message.content = object.content ?? new Uint8Array(0);
    message.base64Content = object.base64Content ?? new Uint8Array(0);
    return message;
  },
};

messageTypeRegistry.set(DocumentBlob.$type, DocumentBlob);

function createBaseDocument(): Document {
  return { $type: "pb.v1alpha1.Document", documentBlob: undefined, gcsUri: undefined, fileId: undefined, filename: "" };
}

export const Document = {
  $type: "pb.v1alpha1.Document" as const,

  encode(message: Document, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.documentBlob !== undefined) {
      DocumentBlob.encode(message.documentBlob, writer.uint32(10).fork()).ldelim();
    }
    if (message.gcsUri !== undefined) {
      writer.uint32(18).string(message.gcsUri);
    }
    if (message.fileId !== undefined) {
      writer.uint32(26).string(message.fileId);
    }
    if (message.filename !== undefined && message.filename !== "") {
      writer.uint32(34).string(message.filename);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Document {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.documentBlob = DocumentBlob.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.gcsUri = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.fileId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.filename = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Document {
    return {
      $type: Document.$type,
      documentBlob: isSet(object.documentBlob) ? DocumentBlob.fromJSON(object.documentBlob) : undefined,
      gcsUri: isSet(object.gcsUri) ? globalThis.String(object.gcsUri) : undefined,
      fileId: isSet(object.fileId) ? globalThis.String(object.fileId) : undefined,
      filename: isSet(object.filename) ? globalThis.String(object.filename) : "",
    };
  },

  toJSON(message: Document): unknown {
    const obj: any = {};
    if (message.documentBlob !== undefined) {
      obj.documentBlob = DocumentBlob.toJSON(message.documentBlob);
    }
    if (message.gcsUri !== undefined) {
      obj.gcsUri = message.gcsUri;
    }
    if (message.fileId !== undefined) {
      obj.fileId = message.fileId;
    }
    if (message.filename !== undefined && message.filename !== "") {
      obj.filename = message.filename;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Document>, I>>(base?: I): Document {
    return Document.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Document>, I>>(object: I): Document {
    const message = createBaseDocument();
    message.documentBlob = (object.documentBlob !== undefined && object.documentBlob !== null)
      ? DocumentBlob.fromPartial(object.documentBlob)
      : undefined;
    message.gcsUri = object.gcsUri ?? undefined;
    message.fileId = object.fileId ?? undefined;
    message.filename = object.filename ?? "";
    return message;
  },
};

messageTypeRegistry.set(Document.$type, Document);

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
