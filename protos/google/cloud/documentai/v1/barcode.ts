/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../../../typeRegistry";

export const protobufPackage = "google.cloud.documentai.v1";

/** Encodes the detailed information of a barcode. */
export interface Barcode {
  $type?: "google.cloud.documentai.v1.Barcode";
  /**
   * Format of a barcode.
   * The supported formats are:
   *   CODE_128: Code 128 type.
   *   CODE_39: Code 39 type.
   *   CODE_93: Code 93 type.
   *   CODABAR: Codabar type.
   *   DATA_MATRIX: 2D Data Matrix type.
   *   ITF: ITF type.
   *   EAN_13: EAN-13 type.
   *   EAN_8: EAN-8 type.
   *   QR_CODE: 2D QR code type.
   *   UPC_A: UPC-A type.
   *   UPC_E: UPC-E type.
   *   PDF417: PDF417 type.
   *   AZTEC: 2D Aztec code type.
   *   DATABAR: GS1 DataBar code type.
   */
  format?:
    | string
    | undefined;
  /**
   * Value format describes the format of the value that a barcode
   * encodes.
   * The supported formats are:
   *   CONTACT_INFO: Contact information.
   *   EMAIL: Email address.
   *   ISBN: ISBN identifier.
   *   PHONE: Phone number.
   *   PRODUCT: Product.
   *   SMS: SMS message.
   *   TEXT: Text string.
   *   URL: URL address.
   *   WIFI: Wifi information.
   *   GEO: Geo-localization.
   *   CALENDAR_EVENT: Calendar event.
   *   DRIVER_LICENSE: Driver's license.
   */
  valueFormat?:
    | string
    | undefined;
  /**
   * Raw value encoded in the barcode.
   * For example, 'MEBKM:TITLE:Google;URL:https://www.google.com;;'.
   */
  rawValue?: string | undefined;
}

function createBaseBarcode(): Barcode {
  return { $type: "google.cloud.documentai.v1.Barcode", format: "", valueFormat: "", rawValue: "" };
}

export const Barcode = {
  $type: "google.cloud.documentai.v1.Barcode" as const,

  encode(message: Barcode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.format !== undefined && message.format !== "") {
      writer.uint32(10).string(message.format);
    }
    if (message.valueFormat !== undefined && message.valueFormat !== "") {
      writer.uint32(18).string(message.valueFormat);
    }
    if (message.rawValue !== undefined && message.rawValue !== "") {
      writer.uint32(26).string(message.rawValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Barcode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBarcode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.format = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.valueFormat = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rawValue = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Barcode {
    return {
      $type: Barcode.$type,
      format: isSet(object.format) ? globalThis.String(object.format) : "",
      valueFormat: isSet(object.valueFormat) ? globalThis.String(object.valueFormat) : "",
      rawValue: isSet(object.rawValue) ? globalThis.String(object.rawValue) : "",
    };
  },

  toJSON(message: Barcode): unknown {
    const obj: any = {};
    if (message.format !== undefined && message.format !== "") {
      obj.format = message.format;
    }
    if (message.valueFormat !== undefined && message.valueFormat !== "") {
      obj.valueFormat = message.valueFormat;
    }
    if (message.rawValue !== undefined && message.rawValue !== "") {
      obj.rawValue = message.rawValue;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Barcode>, I>>(base?: I): Barcode {
    return Barcode.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Barcode>, I>>(object: I): Barcode {
    const message = createBaseBarcode();
    message.format = object.format ?? "";
    message.valueFormat = object.valueFormat ?? "";
    message.rawValue = object.rawValue ?? "";
    return message;
  },
};

messageTypeRegistry.set(Barcode.$type, Barcode);

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
