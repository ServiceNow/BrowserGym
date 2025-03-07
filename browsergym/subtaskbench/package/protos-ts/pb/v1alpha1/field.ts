/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export interface TextField {
  $type?: "pb.v1alpha1.TextField";
  type?: TextFieldType | undefined;
}

export enum TextFieldType {
  UNSPECIFIED = 0,
  /** TEXT - corresponds to <input type="text"> */
  TEXT = 1,
  /** NUMBER - corresponds to <input type="number"> */
  NUMBER = 2,
  /** DATE - corresponds to <input type="date"> or equivalent elements */
  DATE = 3,
  /** MONEY - the field contains a monetary value, which may include currency information. */
  MONEY = 4,
  UNRECOGNIZED = -1,
}

export function textFieldTypeFromJSON(object: any): TextFieldType {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return TextFieldType.UNSPECIFIED;
    case 1:
    case "TEXT":
      return TextFieldType.TEXT;
    case 2:
    case "NUMBER":
      return TextFieldType.NUMBER;
    case 3:
    case "DATE":
      return TextFieldType.DATE;
    case 4:
    case "MONEY":
      return TextFieldType.MONEY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TextFieldType.UNRECOGNIZED;
  }
}

export function textFieldTypeToJSON(object: TextFieldType): string {
  switch (object) {
    case TextFieldType.UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case TextFieldType.TEXT:
      return "TEXT";
    case TextFieldType.NUMBER:
      return "NUMBER";
    case TextFieldType.DATE:
      return "DATE";
    case TextFieldType.MONEY:
      return "MONEY";
    case TextFieldType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface BoolField {
  $type?: "pb.v1alpha1.BoolField";
}

export interface SelectField {
  $type?: "pb.v1alpha1.SelectField";
  options?:
    | SelectFieldOption[]
    | undefined;
  /** whether the field accepts multiple values */
  multi?: boolean | undefined;
}

export interface SelectFieldOption {
  $type?: "pb.v1alpha1.SelectField.Option";
  name?: string | undefined;
  value?: string | undefined;
}

/**
 * Similar to google.cloud.documentai.v1.Document.Entity.NormalizedValue. However,
 * we'd like to move away from DocumentAI protos in general to have more flexibility.
 */
export interface NormalizedValue {
  $type?: "pb.v1alpha1.NormalizedValue";
  dateValue?: NormalizedValueDateMessage | undefined;
  moneyValue?:
    | NormalizedValueMoney
    | undefined;
  /**
   * Optional. An optional field to store a normalized string.
   * For some entity types, one of respective `structured_value` fields may
   * also be populated. Also not all the types of `structured_value` will be
   * normalized. For example, some processors may not generate float
   * or int normalized text by default.
   *
   * Below are sample formats mapped to structured values.
   * - Money/Currency type (`money_value`) is in the ISO 4217 text format.
   * - Date type (`date_value`) is in the ISO 8601 text format.
   * - Datetime type (`datetime_value`) is in the ISO 8601 text format.
   */
  text?: string | undefined;
}

/**
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following:
 *
 * * A full date, with non-zero year, month, and day values
 * * A month and day value, with a zero year, such as an anniversary
 * * A year on its own, with zero month and day values
 * * A year and month value, with a zero day, such as a credit card expiration
 *   date
 *
 * NOTE: this is copied from google.type.Date
 */
export interface NormalizedValueDateMessage {
  $type?: "pb.v1alpha1.NormalizedValue.Date";
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without
   * a year.
   */
  year?:
    | number
    | undefined;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  month?:
    | number
    | undefined;
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or 0
   * to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  day?: number | undefined;
}

/**
 * Represents an amount of money with its currency type.
 * NOTE: this is copied from google.type.Money
 */
export interface NormalizedValueMoney {
  $type?: "pb.v1alpha1.NormalizedValue.Money";
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?:
    | string
    | undefined;
  /**
   * The whole units of the amount.
   * For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.
   */
  units?:
    | number
    | undefined;
  /**
   * Number of nano (10^-9) units of the amount.
   * The value must be between -999,999,999 and +999,999,999 inclusive.
   * If `units` is positive, `nanos` must be positive or zero.
   * If `units` is zero, `nanos` can be positive, zero, or negative.
   * If `units` is negative, `nanos` must be negative or zero.
   * For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.
   */
  nanos?: number | undefined;
}

/**
 * Defines a form field, which can include both the field schema and value.
 * For fields with multiple values, each of them corresponds to a separate FormField.
 */
export interface Field {
  $type?: "pb.v1alpha1.Field";
  name?:
    | string
    | undefined;
  /** Leave it empty if `unique_id` is not relevant to your use case. */
  uniqueId?:
    | string
    | undefined;
  /** for text field, we'd try to normalize the extracted value if type is specified */
  text?: TextField | undefined;
  bool?: BoolField | undefined;
  select?: SelectField | undefined;
  value?:
    | FieldValue
    | undefined;
  /** Parsed and normalized entity value. */
  normalizedValue?:
    | NormalizedValue
    | undefined;
  /** Optional. Confidence of field value. */
  confidence?:
    | number
    | undefined;
  /** Optional. Allows defining nested fields. */
  children?: Field[] | undefined;
}

export interface FieldValue {
  $type?: "pb.v1alpha1.Field.Value";
  text?:
    | string
    | undefined;
  /** if the field type is enum, the value is set to the option value. */
  optionValue?: string | undefined;
}

/**
 * FieldGroup represents structured data in a key-value representation.
 * It can be from either a HTML form, or a single row from a data table.
 * For the rows in a table, we can represent row values using keys from header
 * rows (and use integer column index if header row is not present).
 */
export interface FieldGroup {
  $type?: "pb.v1alpha1.FieldGroup";
  fields?: Field[] | undefined;
}

function createBaseTextField(): TextField {
  return { $type: "pb.v1alpha1.TextField", type: 0 };
}

export const TextField = {
  $type: "pb.v1alpha1.TextField" as const,

  encode(message: TextField, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TextField {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTextField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TextField {
    return { $type: TextField.$type, type: isSet(object.type) ? textFieldTypeFromJSON(object.type) : 0 };
  },

  toJSON(message: TextField): unknown {
    const obj: any = {};
    if (message.type !== undefined && message.type !== 0) {
      obj.type = textFieldTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TextField>, I>>(base?: I): TextField {
    return TextField.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TextField>, I>>(object: I): TextField {
    const message = createBaseTextField();
    message.type = object.type ?? 0;
    return message;
  },
};

messageTypeRegistry.set(TextField.$type, TextField);

function createBaseBoolField(): BoolField {
  return { $type: "pb.v1alpha1.BoolField" };
}

export const BoolField = {
  $type: "pb.v1alpha1.BoolField" as const,

  encode(_: BoolField, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BoolField {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBoolField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): BoolField {
    return { $type: BoolField.$type };
  },

  toJSON(_: BoolField): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<BoolField>, I>>(base?: I): BoolField {
    return BoolField.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BoolField>, I>>(_: I): BoolField {
    const message = createBaseBoolField();
    return message;
  },
};

messageTypeRegistry.set(BoolField.$type, BoolField);

function createBaseSelectField(): SelectField {
  return { $type: "pb.v1alpha1.SelectField", options: [], multi: false };
}

export const SelectField = {
  $type: "pb.v1alpha1.SelectField" as const,

  encode(message: SelectField, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.options !== undefined && message.options.length !== 0) {
      for (const v of message.options) {
        SelectFieldOption.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.multi !== undefined && message.multi !== false) {
      writer.uint32(16).bool(message.multi);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelectField {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelectField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.options!.push(SelectFieldOption.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.multi = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SelectField {
    return {
      $type: SelectField.$type,
      options: globalThis.Array.isArray(object?.options)
        ? object.options.map((e: any) => SelectFieldOption.fromJSON(e))
        : [],
      multi: isSet(object.multi) ? globalThis.Boolean(object.multi) : false,
    };
  },

  toJSON(message: SelectField): unknown {
    const obj: any = {};
    if (message.options?.length) {
      obj.options = message.options.map((e) => SelectFieldOption.toJSON(e));
    }
    if (message.multi !== undefined && message.multi !== false) {
      obj.multi = message.multi;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SelectField>, I>>(base?: I): SelectField {
    return SelectField.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SelectField>, I>>(object: I): SelectField {
    const message = createBaseSelectField();
    message.options = object.options?.map((e) => SelectFieldOption.fromPartial(e)) || [];
    message.multi = object.multi ?? false;
    return message;
  },
};

messageTypeRegistry.set(SelectField.$type, SelectField);

function createBaseSelectFieldOption(): SelectFieldOption {
  return { $type: "pb.v1alpha1.SelectField.Option", name: "", value: "" };
}

export const SelectFieldOption = {
  $type: "pb.v1alpha1.SelectField.Option" as const,

  encode(message: SelectFieldOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.value !== undefined && message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelectFieldOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelectFieldOption();
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

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SelectFieldOption {
    return {
      $type: SelectFieldOption.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: SelectFieldOption): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.value !== undefined && message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SelectFieldOption>, I>>(base?: I): SelectFieldOption {
    return SelectFieldOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SelectFieldOption>, I>>(object: I): SelectFieldOption {
    const message = createBaseSelectFieldOption();
    message.name = object.name ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

messageTypeRegistry.set(SelectFieldOption.$type, SelectFieldOption);

function createBaseNormalizedValue(): NormalizedValue {
  return { $type: "pb.v1alpha1.NormalizedValue", dateValue: undefined, moneyValue: undefined, text: "" };
}

export const NormalizedValue = {
  $type: "pb.v1alpha1.NormalizedValue" as const,

  encode(message: NormalizedValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dateValue !== undefined) {
      NormalizedValueDateMessage.encode(message.dateValue, writer.uint32(18).fork()).ldelim();
    }
    if (message.moneyValue !== undefined) {
      NormalizedValueMoney.encode(message.moneyValue, writer.uint32(26).fork()).ldelim();
    }
    if (message.text !== undefined && message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NormalizedValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNormalizedValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.dateValue = NormalizedValueDateMessage.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.moneyValue = NormalizedValueMoney.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.text = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NormalizedValue {
    return {
      $type: NormalizedValue.$type,
      dateValue: isSet(object.dateValue) ? NormalizedValueDateMessage.fromJSON(object.dateValue) : undefined,
      moneyValue: isSet(object.moneyValue) ? NormalizedValueMoney.fromJSON(object.moneyValue) : undefined,
      text: isSet(object.text) ? globalThis.String(object.text) : "",
    };
  },

  toJSON(message: NormalizedValue): unknown {
    const obj: any = {};
    if (message.dateValue !== undefined) {
      obj.dateValue = NormalizedValueDateMessage.toJSON(message.dateValue);
    }
    if (message.moneyValue !== undefined) {
      obj.moneyValue = NormalizedValueMoney.toJSON(message.moneyValue);
    }
    if (message.text !== undefined && message.text !== "") {
      obj.text = message.text;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NormalizedValue>, I>>(base?: I): NormalizedValue {
    return NormalizedValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NormalizedValue>, I>>(object: I): NormalizedValue {
    const message = createBaseNormalizedValue();
    message.dateValue = (object.dateValue !== undefined && object.dateValue !== null)
      ? NormalizedValueDateMessage.fromPartial(object.dateValue)
      : undefined;
    message.moneyValue = (object.moneyValue !== undefined && object.moneyValue !== null)
      ? NormalizedValueMoney.fromPartial(object.moneyValue)
      : undefined;
    message.text = object.text ?? "";
    return message;
  },
};

messageTypeRegistry.set(NormalizedValue.$type, NormalizedValue);

function createBaseNormalizedValueDateMessage(): NormalizedValueDateMessage {
  return { $type: "pb.v1alpha1.NormalizedValue.Date", year: 0, month: 0, day: 0 };
}

export const NormalizedValueDateMessage = {
  $type: "pb.v1alpha1.NormalizedValue.Date" as const,

  encode(message: NormalizedValueDateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.year !== undefined && message.year !== 0) {
      writer.uint32(8).int32(message.year);
    }
    if (message.month !== undefined && message.month !== 0) {
      writer.uint32(16).int32(message.month);
    }
    if (message.day !== undefined && message.day !== 0) {
      writer.uint32(24).int32(message.day);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NormalizedValueDateMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNormalizedValueDateMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.year = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.month = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.day = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NormalizedValueDateMessage {
    return {
      $type: NormalizedValueDateMessage.$type,
      year: isSet(object.year) ? globalThis.Number(object.year) : 0,
      month: isSet(object.month) ? globalThis.Number(object.month) : 0,
      day: isSet(object.day) ? globalThis.Number(object.day) : 0,
    };
  },

  toJSON(message: NormalizedValueDateMessage): unknown {
    const obj: any = {};
    if (message.year !== undefined && message.year !== 0) {
      obj.year = Math.round(message.year);
    }
    if (message.month !== undefined && message.month !== 0) {
      obj.month = Math.round(message.month);
    }
    if (message.day !== undefined && message.day !== 0) {
      obj.day = Math.round(message.day);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NormalizedValueDateMessage>, I>>(base?: I): NormalizedValueDateMessage {
    return NormalizedValueDateMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NormalizedValueDateMessage>, I>>(object: I): NormalizedValueDateMessage {
    const message = createBaseNormalizedValueDateMessage();
    message.year = object.year ?? 0;
    message.month = object.month ?? 0;
    message.day = object.day ?? 0;
    return message;
  },
};

messageTypeRegistry.set(NormalizedValueDateMessage.$type, NormalizedValueDateMessage);

function createBaseNormalizedValueMoney(): NormalizedValueMoney {
  return { $type: "pb.v1alpha1.NormalizedValue.Money", currencyCode: "", units: 0, nanos: 0 };
}

export const NormalizedValueMoney = {
  $type: "pb.v1alpha1.NormalizedValue.Money" as const,

  encode(message: NormalizedValueMoney, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.currencyCode !== undefined && message.currencyCode !== "") {
      writer.uint32(10).string(message.currencyCode);
    }
    if (message.units !== undefined && message.units !== 0) {
      writer.uint32(16).int64(message.units);
    }
    if (message.nanos !== undefined && message.nanos !== 0) {
      writer.uint32(24).int32(message.nanos);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NormalizedValueMoney {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNormalizedValueMoney();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.currencyCode = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.units = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.nanos = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NormalizedValueMoney {
    return {
      $type: NormalizedValueMoney.$type,
      currencyCode: isSet(object.currencyCode) ? globalThis.String(object.currencyCode) : "",
      units: isSet(object.units) ? globalThis.Number(object.units) : 0,
      nanos: isSet(object.nanos) ? globalThis.Number(object.nanos) : 0,
    };
  },

  toJSON(message: NormalizedValueMoney): unknown {
    const obj: any = {};
    if (message.currencyCode !== undefined && message.currencyCode !== "") {
      obj.currencyCode = message.currencyCode;
    }
    if (message.units !== undefined && message.units !== 0) {
      obj.units = Math.round(message.units);
    }
    if (message.nanos !== undefined && message.nanos !== 0) {
      obj.nanos = Math.round(message.nanos);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NormalizedValueMoney>, I>>(base?: I): NormalizedValueMoney {
    return NormalizedValueMoney.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NormalizedValueMoney>, I>>(object: I): NormalizedValueMoney {
    const message = createBaseNormalizedValueMoney();
    message.currencyCode = object.currencyCode ?? "";
    message.units = object.units ?? 0;
    message.nanos = object.nanos ?? 0;
    return message;
  },
};

messageTypeRegistry.set(NormalizedValueMoney.$type, NormalizedValueMoney);

function createBaseField(): Field {
  return {
    $type: "pb.v1alpha1.Field",
    name: "",
    uniqueId: "",
    text: undefined,
    bool: undefined,
    select: undefined,
    value: undefined,
    normalizedValue: undefined,
    confidence: 0,
    children: [],
  };
}

export const Field = {
  $type: "pb.v1alpha1.Field" as const,

  encode(message: Field, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.uniqueId !== undefined && message.uniqueId !== "") {
      writer.uint32(74).string(message.uniqueId);
    }
    if (message.text !== undefined) {
      TextField.encode(message.text, writer.uint32(18).fork()).ldelim();
    }
    if (message.bool !== undefined) {
      BoolField.encode(message.bool, writer.uint32(26).fork()).ldelim();
    }
    if (message.select !== undefined) {
      SelectField.encode(message.select, writer.uint32(34).fork()).ldelim();
    }
    if (message.value !== undefined) {
      FieldValue.encode(message.value, writer.uint32(42).fork()).ldelim();
    }
    if (message.normalizedValue !== undefined) {
      NormalizedValue.encode(message.normalizedValue, writer.uint32(50).fork()).ldelim();
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(61).float(message.confidence);
    }
    if (message.children !== undefined && message.children.length !== 0) {
      for (const v of message.children) {
        Field.encode(v!, writer.uint32(66).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Field {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.uniqueId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.text = TextField.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bool = BoolField.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.select = SelectField.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.value = FieldValue.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.normalizedValue = NormalizedValue.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 61) {
            break;
          }

          message.confidence = reader.float();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.children!.push(Field.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Field {
    return {
      $type: Field.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      uniqueId: isSet(object.uniqueId) ? globalThis.String(object.uniqueId) : "",
      text: isSet(object.text) ? TextField.fromJSON(object.text) : undefined,
      bool: isSet(object.bool) ? BoolField.fromJSON(object.bool) : undefined,
      select: isSet(object.select) ? SelectField.fromJSON(object.select) : undefined,
      value: isSet(object.value) ? FieldValue.fromJSON(object.value) : undefined,
      normalizedValue: isSet(object.normalizedValue) ? NormalizedValue.fromJSON(object.normalizedValue) : undefined,
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
      children: globalThis.Array.isArray(object?.children) ? object.children.map((e: any) => Field.fromJSON(e)) : [],
    };
  },

  toJSON(message: Field): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.uniqueId !== undefined && message.uniqueId !== "") {
      obj.uniqueId = message.uniqueId;
    }
    if (message.text !== undefined) {
      obj.text = TextField.toJSON(message.text);
    }
    if (message.bool !== undefined) {
      obj.bool = BoolField.toJSON(message.bool);
    }
    if (message.select !== undefined) {
      obj.select = SelectField.toJSON(message.select);
    }
    if (message.value !== undefined) {
      obj.value = FieldValue.toJSON(message.value);
    }
    if (message.normalizedValue !== undefined) {
      obj.normalizedValue = NormalizedValue.toJSON(message.normalizedValue);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    if (message.children?.length) {
      obj.children = message.children.map((e) => Field.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Field>, I>>(base?: I): Field {
    return Field.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Field>, I>>(object: I): Field {
    const message = createBaseField();
    message.name = object.name ?? "";
    message.uniqueId = object.uniqueId ?? "";
    message.text = (object.text !== undefined && object.text !== null) ? TextField.fromPartial(object.text) : undefined;
    message.bool = (object.bool !== undefined && object.bool !== null) ? BoolField.fromPartial(object.bool) : undefined;
    message.select = (object.select !== undefined && object.select !== null)
      ? SelectField.fromPartial(object.select)
      : undefined;
    message.value = (object.value !== undefined && object.value !== null)
      ? FieldValue.fromPartial(object.value)
      : undefined;
    message.normalizedValue = (object.normalizedValue !== undefined && object.normalizedValue !== null)
      ? NormalizedValue.fromPartial(object.normalizedValue)
      : undefined;
    message.confidence = object.confidence ?? 0;
    message.children = object.children?.map((e) => Field.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(Field.$type, Field);

function createBaseFieldValue(): FieldValue {
  return { $type: "pb.v1alpha1.Field.Value", text: undefined, optionValue: undefined };
}

export const FieldValue = {
  $type: "pb.v1alpha1.Field.Value" as const,

  encode(message: FieldValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== undefined) {
      writer.uint32(10).string(message.text);
    }
    if (message.optionValue !== undefined) {
      writer.uint32(18).string(message.optionValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldValue();
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

          message.optionValue = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FieldValue {
    return {
      $type: FieldValue.$type,
      text: isSet(object.text) ? globalThis.String(object.text) : undefined,
      optionValue: isSet(object.optionValue) ? globalThis.String(object.optionValue) : undefined,
    };
  },

  toJSON(message: FieldValue): unknown {
    const obj: any = {};
    if (message.text !== undefined) {
      obj.text = message.text;
    }
    if (message.optionValue !== undefined) {
      obj.optionValue = message.optionValue;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldValue>, I>>(base?: I): FieldValue {
    return FieldValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldValue>, I>>(object: I): FieldValue {
    const message = createBaseFieldValue();
    message.text = object.text ?? undefined;
    message.optionValue = object.optionValue ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(FieldValue.$type, FieldValue);

function createBaseFieldGroup(): FieldGroup {
  return { $type: "pb.v1alpha1.FieldGroup", fields: [] };
}

export const FieldGroup = {
  $type: "pb.v1alpha1.FieldGroup" as const,

  encode(message: FieldGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        Field.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fields!.push(Field.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FieldGroup {
    return {
      $type: FieldGroup.$type,
      fields: globalThis.Array.isArray(object?.fields) ? object.fields.map((e: any) => Field.fromJSON(e)) : [],
    };
  },

  toJSON(message: FieldGroup): unknown {
    const obj: any = {};
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => Field.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldGroup>, I>>(base?: I): FieldGroup {
    return FieldGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldGroup>, I>>(object: I): FieldGroup {
    const message = createBaseFieldGroup();
    message.fields = object.fields?.map((e) => Field.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(FieldGroup.$type, FieldGroup);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
