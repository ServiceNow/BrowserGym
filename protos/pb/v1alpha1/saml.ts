/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export interface SAMLConfig {
  $type?: "pb.v1alpha1.SAMLConfig";
  /** @deprecated */
  domain?: string | undefined;
  domains?: string[] | undefined;
  idpMetadata?: IdpMetadata | undefined;
  idpMetadataXml?: IdpMetadataXML | undefined;
  signRequest?:
    | boolean
    | undefined;
  /**
   * If the SAMLConfig is activated, the SAMLConfig will be used.
   * Initially, the SAMLConfig is not activated and will only be activated
   * when the user has successfully tested the SAML connection.
   */
  isActivated?:
    | boolean
    | undefined;
  /** List of email addresses to be excluded from SAML authentication, they will always be required to input password */
  excludedEmails?: string[] | undefined;
}

export interface IdpMetadata {
  $type?: "pb.v1alpha1.IdpMetadata";
  ssoUrl?:
    | string
    | undefined;
  /**
   * There can be multiple signing certificates
   * which are provided by the IdP
   */
  signingCertificates?: IdpMetadataNamedFile[] | undefined;
  entityId?: string | undefined;
  logoutUrl?: string | undefined;
}

export interface IdpMetadataXML {
  $type?: "pb.v1alpha1.IdpMetadataXML";
  uri?: string | undefined;
  xml?: IdpMetadataNamedFile | undefined;
}

export interface IdpMetadataNamedFile {
  $type?: "pb.v1alpha1.IdpMetadataNamedFile";
  name?: string | undefined;
  content?: Uint8Array | undefined;
}

function createBaseSAMLConfig(): SAMLConfig {
  return {
    $type: "pb.v1alpha1.SAMLConfig",
    domain: "",
    domains: [],
    idpMetadata: undefined,
    idpMetadataXml: undefined,
    signRequest: false,
    isActivated: false,
    excludedEmails: [],
  };
}

export const SAMLConfig = {
  $type: "pb.v1alpha1.SAMLConfig" as const,

  encode(message: SAMLConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.domain !== undefined && message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    if (message.domains !== undefined && message.domains.length !== 0) {
      for (const v of message.domains) {
        writer.uint32(50).string(v!);
      }
    }
    if (message.idpMetadata !== undefined) {
      IdpMetadata.encode(message.idpMetadata, writer.uint32(18).fork()).ldelim();
    }
    if (message.idpMetadataXml !== undefined) {
      IdpMetadataXML.encode(message.idpMetadataXml, writer.uint32(26).fork()).ldelim();
    }
    if (message.signRequest !== undefined && message.signRequest !== false) {
      writer.uint32(32).bool(message.signRequest);
    }
    if (message.isActivated !== undefined && message.isActivated !== false) {
      writer.uint32(40).bool(message.isActivated);
    }
    if (message.excludedEmails !== undefined && message.excludedEmails.length !== 0) {
      for (const v of message.excludedEmails) {
        writer.uint32(58).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SAMLConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSAMLConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.domain = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.domains!.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.idpMetadata = IdpMetadata.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.idpMetadataXml = IdpMetadataXML.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.signRequest = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isActivated = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.excludedEmails!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SAMLConfig {
    return {
      $type: SAMLConfig.$type,
      domain: isSet(object.domain) ? globalThis.String(object.domain) : "",
      domains: globalThis.Array.isArray(object?.domains) ? object.domains.map((e: any) => globalThis.String(e)) : [],
      idpMetadata: isSet(object.idpMetadata) ? IdpMetadata.fromJSON(object.idpMetadata) : undefined,
      idpMetadataXml: isSet(object.idpMetadataXml) ? IdpMetadataXML.fromJSON(object.idpMetadataXml) : undefined,
      signRequest: isSet(object.signRequest) ? globalThis.Boolean(object.signRequest) : false,
      isActivated: isSet(object.isActivated) ? globalThis.Boolean(object.isActivated) : false,
      excludedEmails: globalThis.Array.isArray(object?.excludedEmails)
        ? object.excludedEmails.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: SAMLConfig): unknown {
    const obj: any = {};
    if (message.domain !== undefined && message.domain !== "") {
      obj.domain = message.domain;
    }
    if (message.domains?.length) {
      obj.domains = message.domains;
    }
    if (message.idpMetadata !== undefined) {
      obj.idpMetadata = IdpMetadata.toJSON(message.idpMetadata);
    }
    if (message.idpMetadataXml !== undefined) {
      obj.idpMetadataXml = IdpMetadataXML.toJSON(message.idpMetadataXml);
    }
    if (message.signRequest !== undefined && message.signRequest !== false) {
      obj.signRequest = message.signRequest;
    }
    if (message.isActivated !== undefined && message.isActivated !== false) {
      obj.isActivated = message.isActivated;
    }
    if (message.excludedEmails?.length) {
      obj.excludedEmails = message.excludedEmails;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SAMLConfig>, I>>(base?: I): SAMLConfig {
    return SAMLConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SAMLConfig>, I>>(object: I): SAMLConfig {
    const message = createBaseSAMLConfig();
    message.domain = object.domain ?? "";
    message.domains = object.domains?.map((e) => e) || [];
    message.idpMetadata = (object.idpMetadata !== undefined && object.idpMetadata !== null)
      ? IdpMetadata.fromPartial(object.idpMetadata)
      : undefined;
    message.idpMetadataXml = (object.idpMetadataXml !== undefined && object.idpMetadataXml !== null)
      ? IdpMetadataXML.fromPartial(object.idpMetadataXml)
      : undefined;
    message.signRequest = object.signRequest ?? false;
    message.isActivated = object.isActivated ?? false;
    message.excludedEmails = object.excludedEmails?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(SAMLConfig.$type, SAMLConfig);

function createBaseIdpMetadata(): IdpMetadata {
  return { $type: "pb.v1alpha1.IdpMetadata", ssoUrl: "", signingCertificates: [], entityId: "", logoutUrl: "" };
}

export const IdpMetadata = {
  $type: "pb.v1alpha1.IdpMetadata" as const,

  encode(message: IdpMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ssoUrl !== undefined && message.ssoUrl !== "") {
      writer.uint32(10).string(message.ssoUrl);
    }
    if (message.signingCertificates !== undefined && message.signingCertificates.length !== 0) {
      for (const v of message.signingCertificates) {
        IdpMetadataNamedFile.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.entityId !== undefined && message.entityId !== "") {
      writer.uint32(26).string(message.entityId);
    }
    if (message.logoutUrl !== undefined && message.logoutUrl !== "") {
      writer.uint32(34).string(message.logoutUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IdpMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdpMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ssoUrl = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.signingCertificates!.push(IdpMetadataNamedFile.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.entityId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.logoutUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IdpMetadata {
    return {
      $type: IdpMetadata.$type,
      ssoUrl: isSet(object.ssoUrl) ? globalThis.String(object.ssoUrl) : "",
      signingCertificates: globalThis.Array.isArray(object?.signingCertificates)
        ? object.signingCertificates.map((e: any) => IdpMetadataNamedFile.fromJSON(e))
        : [],
      entityId: isSet(object.entityId) ? globalThis.String(object.entityId) : "",
      logoutUrl: isSet(object.logoutUrl) ? globalThis.String(object.logoutUrl) : "",
    };
  },

  toJSON(message: IdpMetadata): unknown {
    const obj: any = {};
    if (message.ssoUrl !== undefined && message.ssoUrl !== "") {
      obj.ssoUrl = message.ssoUrl;
    }
    if (message.signingCertificates?.length) {
      obj.signingCertificates = message.signingCertificates.map((e) => IdpMetadataNamedFile.toJSON(e));
    }
    if (message.entityId !== undefined && message.entityId !== "") {
      obj.entityId = message.entityId;
    }
    if (message.logoutUrl !== undefined && message.logoutUrl !== "") {
      obj.logoutUrl = message.logoutUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IdpMetadata>, I>>(base?: I): IdpMetadata {
    return IdpMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IdpMetadata>, I>>(object: I): IdpMetadata {
    const message = createBaseIdpMetadata();
    message.ssoUrl = object.ssoUrl ?? "";
    message.signingCertificates = object.signingCertificates?.map((e) => IdpMetadataNamedFile.fromPartial(e)) || [];
    message.entityId = object.entityId ?? "";
    message.logoutUrl = object.logoutUrl ?? "";
    return message;
  },
};

messageTypeRegistry.set(IdpMetadata.$type, IdpMetadata);

function createBaseIdpMetadataXML(): IdpMetadataXML {
  return { $type: "pb.v1alpha1.IdpMetadataXML", uri: undefined, xml: undefined };
}

export const IdpMetadataXML = {
  $type: "pb.v1alpha1.IdpMetadataXML" as const,

  encode(message: IdpMetadataXML, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uri !== undefined) {
      writer.uint32(10).string(message.uri);
    }
    if (message.xml !== undefined) {
      IdpMetadataNamedFile.encode(message.xml, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IdpMetadataXML {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdpMetadataXML();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.xml = IdpMetadataNamedFile.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IdpMetadataXML {
    return {
      $type: IdpMetadataXML.$type,
      uri: isSet(object.uri) ? globalThis.String(object.uri) : undefined,
      xml: isSet(object.xml) ? IdpMetadataNamedFile.fromJSON(object.xml) : undefined,
    };
  },

  toJSON(message: IdpMetadataXML): unknown {
    const obj: any = {};
    if (message.uri !== undefined) {
      obj.uri = message.uri;
    }
    if (message.xml !== undefined) {
      obj.xml = IdpMetadataNamedFile.toJSON(message.xml);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IdpMetadataXML>, I>>(base?: I): IdpMetadataXML {
    return IdpMetadataXML.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IdpMetadataXML>, I>>(object: I): IdpMetadataXML {
    const message = createBaseIdpMetadataXML();
    message.uri = object.uri ?? undefined;
    message.xml = (object.xml !== undefined && object.xml !== null)
      ? IdpMetadataNamedFile.fromPartial(object.xml)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(IdpMetadataXML.$type, IdpMetadataXML);

function createBaseIdpMetadataNamedFile(): IdpMetadataNamedFile {
  return { $type: "pb.v1alpha1.IdpMetadataNamedFile", name: "", content: new Uint8Array(0) };
}

export const IdpMetadataNamedFile = {
  $type: "pb.v1alpha1.IdpMetadataNamedFile" as const,

  encode(message: IdpMetadataNamedFile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.content !== undefined && message.content.length !== 0) {
      writer.uint32(18).bytes(message.content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IdpMetadataNamedFile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdpMetadataNamedFile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.content = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IdpMetadataNamedFile {
    return {
      $type: IdpMetadataNamedFile.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      content: isSet(object.content) ? bytesFromBase64(object.content) : new Uint8Array(0),
    };
  },

  toJSON(message: IdpMetadataNamedFile): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.content !== undefined && message.content.length !== 0) {
      obj.content = base64FromBytes(message.content);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IdpMetadataNamedFile>, I>>(base?: I): IdpMetadataNamedFile {
    return IdpMetadataNamedFile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IdpMetadataNamedFile>, I>>(object: I): IdpMetadataNamedFile {
    const message = createBaseIdpMetadataNamedFile();
    message.name = object.name ?? "";
    message.content = object.content ?? new Uint8Array(0);
    return message;
  },
};

messageTypeRegistry.set(IdpMetadataNamedFile.$type, IdpMetadataNamedFile);

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
