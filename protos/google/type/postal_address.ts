/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "google.type";

/**
 * Represents a postal address, e.g. for postal delivery or payments addresses.
 * Given a postal address, a postal service can deliver items to a premise, P.O.
 * Box or similar.
 * It is not intended to model geographical locations (roads, towns,
 * mountains).
 *
 * In typical usage an address would be created via user input or from importing
 * existing data, depending on the type of process.
 *
 * Advice on address input / editing:
 *  - Use an i18n-ready address widget such as
 *    https://github.com/google/libaddressinput)
 * - Users should not be presented with UI elements for input or editing of
 *   fields outside countries where that field is used.
 *
 * For more guidance on how to use this schema, please see:
 * https://support.google.com/business/answer/6397478
 */
export interface PostalAddress {
  $type?: "google.type.PostalAddress";
  /**
   * The schema revision of the `PostalAddress`. This must be set to 0, which is
   * the latest revision.
   *
   * All new revisions **must** be backward compatible with old revisions.
   */
  revision?:
    | number
    | undefined;
  /**
   * Required. CLDR region code of the country/region of the address. This
   * is never inferred and it is up to the user to ensure the value is
   * correct. See http://cldr.unicode.org/ and
   * http://www.unicode.org/cldr/charts/30/supplemental/territory_information.html
   * for details. Example: "CH" for Switzerland.
   */
  regionCode?:
    | string
    | undefined;
  /**
   * Optional. BCP-47 language code of the contents of this address (if
   * known). This is often the UI language of the input form or is expected
   * to match one of the languages used in the address' country/region, or their
   * transliterated equivalents.
   * This can affect formatting in certain countries, but is not critical
   * to the correctness of the data and will never affect any validation or
   * other non-formatting related operations.
   *
   * If this value is not known, it should be omitted (rather than specifying a
   * possibly incorrect default).
   *
   * Examples: "zh-Hant", "ja", "ja-Latn", "en".
   */
  languageCode?:
    | string
    | undefined;
  /**
   * Optional. Postal code of the address. Not all countries use or require
   * postal codes to be present, but where they are used, they may trigger
   * additional validation with other parts of the address (e.g. state/zip
   * validation in the U.S.A.).
   */
  postalCode?:
    | string
    | undefined;
  /**
   * Optional. Additional, country-specific, sorting code. This is not used
   * in most regions. Where it is used, the value is either a string like
   * "CEDEX", optionally followed by a number (e.g. "CEDEX 7"), or just a number
   * alone, representing the "sector code" (Jamaica), "delivery area indicator"
   * (Malawi) or "post office indicator" (e.g. Côte d'Ivoire).
   */
  sortingCode?:
    | string
    | undefined;
  /**
   * Optional. Highest administrative subdivision which is used for postal
   * addresses of a country or region.
   * For example, this can be a state, a province, an oblast, or a prefecture.
   * Specifically, for Spain this is the province and not the autonomous
   * community (e.g. "Barcelona" and not "Catalonia").
   * Many countries don't use an administrative area in postal addresses. E.g.
   * in Switzerland this should be left unpopulated.
   */
  administrativeArea?:
    | string
    | undefined;
  /**
   * Optional. Generally refers to the city/town portion of the address.
   * Examples: US city, IT comune, UK post town.
   * In regions of the world where localities are not well defined or do not fit
   * into this structure well, leave locality empty and use address_lines.
   */
  locality?:
    | string
    | undefined;
  /**
   * Optional. Sublocality of the address.
   * For example, this can be neighborhoods, boroughs, districts.
   */
  sublocality?:
    | string
    | undefined;
  /**
   * Unstructured address lines describing the lower levels of an address.
   *
   * Because values in address_lines do not have type information and may
   * sometimes contain multiple values in a single field (e.g.
   * "Austin, TX"), it is important that the line order is clear. The order of
   * address lines should be "envelope order" for the country/region of the
   * address. In places where this can vary (e.g. Japan), address_language is
   * used to make it explicit (e.g. "ja" for large-to-small ordering and
   * "ja-Latn" or "en" for small-to-large). This way, the most specific line of
   * an address can be selected based on the language.
   *
   * The minimum permitted structural representation of an address consists
   * of a region_code with all remaining information placed in the
   * address_lines. It would be possible to format such an address very
   * approximately without geocoding, but no semantic reasoning could be
   * made about any of the address components until it was at least
   * partially resolved.
   *
   * Creating an address only containing a region_code and address_lines, and
   * then geocoding is the recommended way to handle completely unstructured
   * addresses (as opposed to guessing which parts of the address should be
   * localities or administrative areas).
   */
  addressLines?:
    | string[]
    | undefined;
  /**
   * Optional. The recipient at the address.
   * This field may, under certain circumstances, contain multiline information.
   * For example, it might contain "care of" information.
   */
  recipients?:
    | string[]
    | undefined;
  /** Optional. The name of the organization at the address. */
  organization?: string | undefined;
}

function createBasePostalAddress(): PostalAddress {
  return {
    $type: "google.type.PostalAddress",
    revision: 0,
    regionCode: "",
    languageCode: "",
    postalCode: "",
    sortingCode: "",
    administrativeArea: "",
    locality: "",
    sublocality: "",
    addressLines: [],
    recipients: [],
    organization: "",
  };
}

export const PostalAddress = {
  $type: "google.type.PostalAddress" as const,

  encode(message: PostalAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.revision !== undefined && message.revision !== 0) {
      writer.uint32(8).int32(message.revision);
    }
    if (message.regionCode !== undefined && message.regionCode !== "") {
      writer.uint32(18).string(message.regionCode);
    }
    if (message.languageCode !== undefined && message.languageCode !== "") {
      writer.uint32(26).string(message.languageCode);
    }
    if (message.postalCode !== undefined && message.postalCode !== "") {
      writer.uint32(34).string(message.postalCode);
    }
    if (message.sortingCode !== undefined && message.sortingCode !== "") {
      writer.uint32(42).string(message.sortingCode);
    }
    if (message.administrativeArea !== undefined && message.administrativeArea !== "") {
      writer.uint32(50).string(message.administrativeArea);
    }
    if (message.locality !== undefined && message.locality !== "") {
      writer.uint32(58).string(message.locality);
    }
    if (message.sublocality !== undefined && message.sublocality !== "") {
      writer.uint32(66).string(message.sublocality);
    }
    if (message.addressLines !== undefined && message.addressLines.length !== 0) {
      for (const v of message.addressLines) {
        writer.uint32(74).string(v!);
      }
    }
    if (message.recipients !== undefined && message.recipients.length !== 0) {
      for (const v of message.recipients) {
        writer.uint32(82).string(v!);
      }
    }
    if (message.organization !== undefined && message.organization !== "") {
      writer.uint32(90).string(message.organization);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PostalAddress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePostalAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.revision = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.regionCode = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.languageCode = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.postalCode = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sortingCode = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.administrativeArea = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.locality = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.sublocality = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.addressLines!.push(reader.string());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.recipients!.push(reader.string());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.organization = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PostalAddress {
    return {
      $type: PostalAddress.$type,
      revision: isSet(object.revision) ? globalThis.Number(object.revision) : 0,
      regionCode: isSet(object.regionCode) ? globalThis.String(object.regionCode) : "",
      languageCode: isSet(object.languageCode) ? globalThis.String(object.languageCode) : "",
      postalCode: isSet(object.postalCode) ? globalThis.String(object.postalCode) : "",
      sortingCode: isSet(object.sortingCode) ? globalThis.String(object.sortingCode) : "",
      administrativeArea: isSet(object.administrativeArea) ? globalThis.String(object.administrativeArea) : "",
      locality: isSet(object.locality) ? globalThis.String(object.locality) : "",
      sublocality: isSet(object.sublocality) ? globalThis.String(object.sublocality) : "",
      addressLines: globalThis.Array.isArray(object?.addressLines)
        ? object.addressLines.map((e: any) => globalThis.String(e))
        : [],
      recipients: globalThis.Array.isArray(object?.recipients)
        ? object.recipients.map((e: any) => globalThis.String(e))
        : [],
      organization: isSet(object.organization) ? globalThis.String(object.organization) : "",
    };
  },

  toJSON(message: PostalAddress): unknown {
    const obj: any = {};
    if (message.revision !== undefined && message.revision !== 0) {
      obj.revision = Math.round(message.revision);
    }
    if (message.regionCode !== undefined && message.regionCode !== "") {
      obj.regionCode = message.regionCode;
    }
    if (message.languageCode !== undefined && message.languageCode !== "") {
      obj.languageCode = message.languageCode;
    }
    if (message.postalCode !== undefined && message.postalCode !== "") {
      obj.postalCode = message.postalCode;
    }
    if (message.sortingCode !== undefined && message.sortingCode !== "") {
      obj.sortingCode = message.sortingCode;
    }
    if (message.administrativeArea !== undefined && message.administrativeArea !== "") {
      obj.administrativeArea = message.administrativeArea;
    }
    if (message.locality !== undefined && message.locality !== "") {
      obj.locality = message.locality;
    }
    if (message.sublocality !== undefined && message.sublocality !== "") {
      obj.sublocality = message.sublocality;
    }
    if (message.addressLines?.length) {
      obj.addressLines = message.addressLines;
    }
    if (message.recipients?.length) {
      obj.recipients = message.recipients;
    }
    if (message.organization !== undefined && message.organization !== "") {
      obj.organization = message.organization;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PostalAddress>, I>>(base?: I): PostalAddress {
    return PostalAddress.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PostalAddress>, I>>(object: I): PostalAddress {
    const message = createBasePostalAddress();
    message.revision = object.revision ?? 0;
    message.regionCode = object.regionCode ?? "";
    message.languageCode = object.languageCode ?? "";
    message.postalCode = object.postalCode ?? "";
    message.sortingCode = object.sortingCode ?? "";
    message.administrativeArea = object.administrativeArea ?? "";
    message.locality = object.locality ?? "";
    message.sublocality = object.sublocality ?? "";
    message.addressLines = object.addressLines?.map((e) => e) || [];
    message.recipients = object.recipients?.map((e) => e) || [];
    message.organization = object.organization ?? "";
    return message;
  },
};

messageTypeRegistry.set(PostalAddress.$type, PostalAddress);

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
