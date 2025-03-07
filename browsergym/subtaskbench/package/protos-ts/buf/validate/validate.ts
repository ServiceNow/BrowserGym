/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../google/protobuf/duration";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import { Constraint } from "./expression";

export const protobufPackage = "buf.validate";

/**
 * Specifies how FieldConstraints.ignore behaves. See the documentation for
 * FieldConstraints.required for definitions of "populated" and "nullable".
 */
export enum Ignore {
  /**
   * UNSPECIFIED - Validation is only skipped if it's an unpopulated nullable fields.
   *
   * ```proto
   * syntax="proto3";
   *
   * message Request {
   *   // The uri rule applies to any value, including the empty string.
   *   string foo = 1 [
   *     (buf.validate.field).string.uri = true
   *   ];
   *
   *   // The uri rule only applies if the field is set, including if it's
   *   // set to the empty string.
   *   optional string bar = 2 [
   *     (buf.validate.field).string.uri = true
   *   ];
   *
   *   // The min_items rule always applies, even if the list is empty.
   *   repeated string baz = 3 [
   *     (buf.validate.field).repeated.min_items = 3
   *   ];
   *
   *   // The custom CEL rule applies only if the field is set, including if
   *   // it's the "zero" value of that message.
   *   SomeMessage quux = 4 [
   *     (buf.validate.field).cel = {/* ... * /}
   *   ];
   * }
   * ```
   */
  UNSPECIFIED = 0,
  /**
   * IF_UNPOPULATED - Validation is skipped if the field is unpopulated. This rule is redundant
   * if the field is already nullable. This value is equivalent behavior to the
   * deprecated ignore_empty rule.
   *
   * ```proto
   * syntax="proto3
   *
   * message Request {
   *   // The uri rule applies only if the value is not the empty string.
   *   string foo = 1 [
   *     (buf.validate.field).string.uri = true,
   *     (buf.validate.field).ignore = IGNORE_IF_UNPOPULATED
   *   ];
   *
   *   // IGNORE_IF_UNPOPULATED is equivalent to IGNORE_UNSPECIFIED in this
   *   // case: the uri rule only applies if the field is set, including if
   *   // it's set to the empty string.
   *   optional string bar = 2 [
   *     (buf.validate.field).string.uri = true,
   *     (buf.validate.field).ignore = IGNORE_IF_UNPOPULATED
   *   ];
   *
   *   // The min_items rule only applies if the list has at least one item.
   *   repeated string baz = 3 [
   *     (buf.validate.field).repeated.min_items = 3,
   *     (buf.validate.field).ignore = IGNORE_IF_UNPOPULATED
   *   ];
   *
   *   // IGNORE_IF_UNPOPULATED is equivalent to IGNORE_UNSPECIFIED in this
   *   // case: the custom CEL rule applies only if the field is set, including
   *   // if it's the "zero" value of that message.
   *   SomeMessage quux = 4 [
   *     (buf.validate.field).cel = {/* ... * /},
   *     (buf.validate.field).ignore = IGNORE_IF_UNPOPULATED
   *   ];
   * }
   * ```
   */
  IF_UNPOPULATED = 1,
  /**
   * IF_DEFAULT_VALUE - Validation is skipped if the field is unpopulated or if it is a nullable
   * field populated with its default value. This is typically the zero or
   * empty value, but proto2 scalars support custom defaults. For messages, the
   * default is a non-null message with all its fields unpopulated.
   *
   * ```proto
   * syntax="proto3
   *
   * message Request {
   *   // IGNORE_IF_DEFAULT_VALUE is equivalent to IGNORE_IF_UNPOPULATED in
   *   // this case; the uri rule applies only if the value is not the empty
   *   // string.
   *   string foo = 1 [
   *     (buf.validate.field).string.uri = true,
   *     (buf.validate.field).ignore = IGNORE_IF_DEFAULT_VALUE
   *   ];
   *
   *   // The uri rule only applies if the field is set to a value other than
   *   // the empty string.
   *   optional string bar = 2 [
   *     (buf.validate.field).string.uri = true,
   *     (buf.validate.field).ignore = IGNORE_IF_DEFAULT_VALUE
   *   ];
   *
   *   // IGNORE_IF_DEFAULT_VALUE is equivalent to IGNORE_IF_UNPOPULATED in
   *   // this case; the min_items rule only applies if the list has at least
   *   // one item.
   *   repeated string baz = 3 [
   *     (buf.validate.field).repeated.min_items = 3,
   *     (buf.validate.field).ignore = IGNORE_IF_DEFAULT_VALUE
   *   ];
   *
   *   // The custom CEL rule only applies if the field is set to a value other
   *   // than an empty message (i.e., fields are unpopulated).
   *   SomeMessage quux = 4 [
   *     (buf.validate.field).cel = {/* ... * /},
   *     (buf.validate.field).ignore = IGNORE_IF_DEFAULT_VALUE
   *   ];
   * }
   * ```
   *
   * This rule is affected by proto2 custom default values:
   *
   * ```proto
   * syntax="proto2";
   *
   * message Request {
   *   // The gt rule only applies if the field is set and it's value is not
   *   the default (i.e., not -42). The rule even applies if the field is set
   *   to zero since the default value differs.
   *   optional int32 value = 1 [
   *     default = -42,
   *     (buf.validate.field).int32.gt = 0,
   *     (buf.validate.field).ignore = IGNORE_IF_DEFAULT_VALUE
   *   ];
   * }
   */
  IF_DEFAULT_VALUE = 2,
  /**
   * ALWAYS - The validation rules of this field will be skipped and not evaluated. This
   * is useful for situations that necessitate turning off the rules of a field
   * containing a message that may not make sense in the current context, or to
   * temporarily disable constraints during development.
   *
   * ```proto
   * message MyMessage {
   *   // The field's rules will always be ignored, including any validation's
   *   // on value's fields.
   *   MyOtherMessage value = 1 [
   *     (buf.validate.field).ignore = IGNORE_ALWAYS];
   * }
   * ```
   */
  ALWAYS = 3,
  /**
   * EMPTY - Deprecated: Use IGNORE_IF_UNPOPULATED instead. TODO: Remove this value pre-v1.
   *
   * @deprecated
   */
  EMPTY = 1,
  /**
   * DEFAULT - Deprecated: Use IGNORE_IF_DEFAULT_VALUE. TODO: Remove this value pre-v1.
   *
   * @deprecated
   */
  DEFAULT = 2,
  UNRECOGNIZED = -1,
}

export function ignoreFromJSON(object: any): Ignore {
  switch (object) {
    case 0:
    case "IGNORE_UNSPECIFIED":
      return Ignore.UNSPECIFIED;
    case 1:
    case "IGNORE_IF_UNPOPULATED":
      return Ignore.IF_UNPOPULATED;
    case 2:
    case "IGNORE_IF_DEFAULT_VALUE":
      return Ignore.IF_DEFAULT_VALUE;
    case 3:
    case "IGNORE_ALWAYS":
      return Ignore.ALWAYS;
    case 1:
    case "IGNORE_EMPTY":
      return Ignore.EMPTY;
    case 2:
    case "IGNORE_DEFAULT":
      return Ignore.DEFAULT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Ignore.UNRECOGNIZED;
  }
}

export function ignoreToJSON(object: Ignore): string {
  switch (object) {
    case Ignore.UNSPECIFIED:
      return "IGNORE_UNSPECIFIED";
    case Ignore.IF_UNPOPULATED:
      return "IGNORE_IF_UNPOPULATED";
    case Ignore.IF_DEFAULT_VALUE:
      return "IGNORE_IF_DEFAULT_VALUE";
    case Ignore.ALWAYS:
      return "IGNORE_ALWAYS";
    case Ignore.EMPTY:
      return "IGNORE_EMPTY";
    case Ignore.DEFAULT:
      return "IGNORE_DEFAULT";
    case Ignore.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** WellKnownRegex contain some well-known patterns. */
export enum KnownRegex {
  UNSPECIFIED = 0,
  /** HTTP_HEADER_NAME - HTTP header name as defined by [RFC 7230](https://tools.ietf.org/html/rfc7230#section-3.2). */
  HTTP_HEADER_NAME = 1,
  /** HTTP_HEADER_VALUE - HTTP header value as defined by [RFC 7230](https://tools.ietf.org/html/rfc7230#section-3.2.4). */
  HTTP_HEADER_VALUE = 2,
  UNRECOGNIZED = -1,
}

export function knownRegexFromJSON(object: any): KnownRegex {
  switch (object) {
    case 0:
    case "KNOWN_REGEX_UNSPECIFIED":
      return KnownRegex.UNSPECIFIED;
    case 1:
    case "KNOWN_REGEX_HTTP_HEADER_NAME":
      return KnownRegex.HTTP_HEADER_NAME;
    case 2:
    case "KNOWN_REGEX_HTTP_HEADER_VALUE":
      return KnownRegex.HTTP_HEADER_VALUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KnownRegex.UNRECOGNIZED;
  }
}

export function knownRegexToJSON(object: KnownRegex): string {
  switch (object) {
    case KnownRegex.UNSPECIFIED:
      return "KNOWN_REGEX_UNSPECIFIED";
    case KnownRegex.HTTP_HEADER_NAME:
      return "KNOWN_REGEX_HTTP_HEADER_NAME";
    case KnownRegex.HTTP_HEADER_VALUE:
      return "KNOWN_REGEX_HTTP_HEADER_VALUE";
    case KnownRegex.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * MessageConstraints represents validation rules that are applied to the entire message.
 * It includes disabling options and a list of Constraint messages representing Common Expression Language (CEL) validation rules.
 */
export interface MessageConstraints {
  $type?: "buf.validate.MessageConstraints";
  /**
   * `disabled` is a boolean flag that, when set to true, nullifies any validation rules for this message.
   * This includes any fields within the message that would otherwise support validation.
   *
   * ```proto
   * message MyMessage {
   *   // validation will be bypassed for this message
   *   option (buf.validate.message).disabled = true;
   * }
   * ```
   */
  disabled?:
    | boolean
    | undefined;
  /**
   * `cel` is a repeated field of type Constraint. Each Constraint specifies a validation rule to be applied to this message.
   * These constraints are written in Common Expression Language (CEL) syntax. For more information on
   * CEL, [see our documentation](https://github.com/bufbuild/protovalidate/blob/main/docs/cel.md).
   *
   * ```proto
   * message MyMessage {
   *   // The field `foo` must be greater than 42.
   *   option (buf.validate.message).cel = {
   *     id: "my_message.value",
   *     message: "value must be greater than 42",
   *     expression: "this.foo > 42",
   *   };
   *   optional int32 foo = 1;
   * }
   * ```
   */
  cel?: Constraint[] | undefined;
}

/**
 * The `OneofConstraints` message type enables you to manage constraints for
 * oneof fields in your protobuf messages.
 */
export interface OneofConstraints {
  $type?: "buf.validate.OneofConstraints";
  /**
   * If `required` is true, exactly one field of the oneof must be present. A
   * validation error is returned if no fields in the oneof are present. The
   * field itself may still be a default value; further constraints
   * should be placed on the fields themselves to ensure they are valid values,
   * such as `min_len` or `gt`.
   *
   * ```proto
   * message MyMessage {
   *   oneof value {
   *     // Either `a` or `b` must be set. If `a` is set, it must also be
   *     // non-empty; whereas if `b` is set, it can still be an empty string.
   *     option (buf.validate.oneof).required = true;
   *     string a = 1 [(buf.validate.field).string.min_len = 1];
   *     string b = 2;
   *   }
   * }
   * ```
   */
  required?: boolean | undefined;
}

/**
 * FieldConstraints encapsulates the rules for each type of field. Depending on
 * the field, the correct set should be used to ensure proper validations.
 */
export interface FieldConstraints {
  $type?: "buf.validate.FieldConstraints";
  /**
   * `cel` is a repeated field used to represent a textual expression
   * in the Common Expression Language (CEL) syntax. For more information on
   * CEL, [see our documentation](https://github.com/bufbuild/protovalidate/blob/main/docs/cel.md).
   *
   * ```proto
   * message MyMessage {
   *   // The field `value` must be greater than 42.
   *   optional int32 value = 1 [(buf.validate.field).cel = {
   *     id: "my_message.value",
   *     message: "value must be greater than 42",
   *     expression: "this > 42",
   *   }];
   * }
   * ```
   */
  cel?:
    | Constraint[]
    | undefined;
  /**
   * If `required` is true, the field must be populated. A populated field can be
   * described as "serialized in the wire format," which includes:
   *
   * - the following "nullable" fields must be explicitly set to be considered populated:
   *   - singular message fields (whose fields may be unpopulated/default values)
   *   - member fields of a oneof (may be their default value)
   *   - proto3 optional fields (may be their default value)
   *   - proto2 scalar fields (both optional and required)
   * - proto3 scalar fields must be non-zero to be considered populated
   * - repeated and map fields must be non-empty to be considered populated
   *
   * ```proto
   * message MyMessage {
   *   // The field `value` must be set to a non-null value.
   *   optional MyOtherMessage value = 1 [(buf.validate.field).required = true];
   * }
   * ```
   */
  required?:
    | boolean
    | undefined;
  /**
   * Skip validation on the field if its value matches the specified criteria.
   * See Ignore enum for details.
   *
   * ```proto
   * message UpdateRequest {
   *   // The uri rule only applies if the field is populated and not an empty
   *   // string.
   *   optional string url = 1 [
   *     (buf.validate.field).ignore = IGNORE_IF_DEFAULT_VALUE,
   *     (buf.validate.field).string.uri = true,
   *   ];
   * }
   * ```
   */
  ignore?:
    | Ignore
    | undefined;
  /** Scalar Field Types */
  float?: FloatRules | undefined;
  double?: DoubleRules | undefined;
  int32?: Int32Rules | undefined;
  int64?: Int64Rules | undefined;
  uint32?: UInt32Rules | undefined;
  uint64?: UInt64Rules | undefined;
  sint32?: SInt32Rules | undefined;
  sint64?: SInt64Rules | undefined;
  fixed32?: Fixed32Rules | undefined;
  fixed64?: Fixed64Rules | undefined;
  sfixed32?: SFixed32Rules | undefined;
  sfixed64?: SFixed64Rules | undefined;
  bool?: BoolRules | undefined;
  string?: StringRules | undefined;
  bytes?:
    | BytesRules
    | undefined;
  /** Complex Field Types */
  enum?: EnumRules | undefined;
  repeated?: RepeatedRules | undefined;
  map?:
    | MapRules
    | undefined;
  /** Well-Known Field Types */
  any?: AnyRules | undefined;
  duration?: DurationRules | undefined;
  timestamp?:
    | TimestampRules
    | undefined;
  /**
   * DEPRECATED: use ignore=IGNORE_ALWAYS instead. TODO: remove this field pre-v1.
   *
   * @deprecated
   */
  skipped?:
    | boolean
    | undefined;
  /**
   * DEPRECATED: use ignore=IGNORE_IF_UNPOPULATED instead. TODO: remove this field pre-v1.
   *
   * @deprecated
   */
  ignoreEmpty?: boolean | undefined;
}

/**
 * FloatRules describes the constraints applied to `float` values. These
 * rules may also be applied to the `google.protobuf.FloatValue` Well-Known-Type.
 */
export interface FloatRules {
  $type?: "buf.validate.FloatRules";
  /**
   * `const` requires the field value to exactly match the specified value. If
   * the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MyFloat {
   *   // value must equal 42.0
   *   float value = 1 [(buf.validate.field).float.const = 42.0];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `lt` requires the field value to be less than the specified value (field <
   * value). If the field value is equal to or greater than the specified value,
   * an error message is generated.
   *
   * ```proto
   * message MyFloat {
   *   // value must be less than 10.0
   *   float value = 1 [(buf.validate.field).float.lt = 10.0];
   * }
   * ```
   */
  lt?:
    | number
    | undefined;
  /**
   * `lte` requires the field value to be less than or equal to the specified
   * value (field <= value). If the field value is greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MyFloat {
   *   // value must be less than or equal to 10.0
   *   float value = 1 [(buf.validate.field).float.lte = 10.0];
   * }
   * ```
   */
  lte?:
    | number
    | undefined;
  /**
   * `gt` requires the field value to be greater than the specified value
   * (exclusive). If the value of `gt` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyFloat {
   *   // value must be greater than 5.0 [float.gt]
   *   float value = 1 [(buf.validate.field).float.gt = 5.0];
   *
   *   // value must be greater than 5 and less than 10.0 [float.gt_lt]
   *   float other_value = 2 [(buf.validate.field).float = { gt: 5.0, lt: 10.0 }];
   *
   *   // value must be greater than 10 or less than 5.0 [float.gt_lt_exclusive]
   *   float another_value = 3 [(buf.validate.field).float = { gt: 10.0, lt: 5.0 }];
   * }
   * ```
   */
  gt?:
    | number
    | undefined;
  /**
   * `gte` requires the field value to be greater than or equal to the specified
   * value (exclusive). If the value of `gte` is larger than a specified `lt`
   * or `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyFloat {
   *   // value must be greater than or equal to 5.0 [float.gte]
   *   float value = 1 [(buf.validate.field).float.gte = 5.0];
   *
   *   // value must be greater than or equal to 5.0 and less than 10.0 [float.gte_lt]
   *   float other_value = 2 [(buf.validate.field).float = { gte: 5.0, lt: 10.0 }];
   *
   *   // value must be greater than or equal to 10.0 or less than 5.0 [float.gte_lt_exclusive]
   *   float another_value = 3 [(buf.validate.field).float = { gte: 10.0, lt: 5.0 }];
   * }
   * ```
   */
  gte?:
    | number
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified values.
   * If the field value isn't one of the specified values, an error message
   * is generated.
   *
   * ```proto
   * message MyFloat {
   *   // value must be in list [1.0, 2.0, 3.0]
   *   repeated float value = 1 (buf.validate.field).float = { in: [1.0, 2.0, 3.0] };
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `in` requires the field value to not be equal to any of the specified
   * values. If the field value is one of the specified values, an error
   * message is generated.
   *
   * ```proto
   * message MyFloat {
   *   // value must not be in list [1.0, 2.0, 3.0]
   *   repeated float value = 1 (buf.validate.field).float = { not_in: [1.0, 2.0, 3.0] };
   * }
   * ```
   */
  notIn?:
    | number[]
    | undefined;
  /**
   * `finite` requires the field value to be finite. If the field value is
   * infinite or NaN, an error message is generated.
   */
  finite?: boolean | undefined;
}

/**
 * DoubleRules describes the constraints applied to `double` values. These
 * rules may also be applied to the `google.protobuf.DoubleValue` Well-Known-Type.
 */
export interface DoubleRules {
  $type?: "buf.validate.DoubleRules";
  /**
   * `const` requires the field value to exactly match the specified value. If
   * the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MyDouble {
   *   // value must equal 42.0
   *   double value = 1 [(buf.validate.field).double.const = 42.0];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `lt` requires the field value to be less than the specified value (field <
   * value). If the field value is equal to or greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MyDouble {
   *   // value must be less than 10.0
   *   double value = 1 [(buf.validate.field).double.lt = 10.0];
   * }
   * ```
   */
  lt?:
    | number
    | undefined;
  /**
   * `lte` requires the field value to be less than or equal to the specified value
   * (field <= value). If the field value is greater than the specified value,
   * an error message is generated.
   *
   * ```proto
   * message MyDouble {
   *   // value must be less than or equal to 10.0
   *   double value = 1 [(buf.validate.field).double.lte = 10.0];
   * }
   * ```
   */
  lte?:
    | number
    | undefined;
  /**
   * `gt` requires the field value to be greater than the specified value
   * (exclusive). If the value of `gt` is larger than a specified `lt` or `lte`,
   * the range is reversed, and the field value must be outside the specified
   * range. If the field value doesn't meet the required conditions, an error
   * message is generated.
   *
   * ```proto
   * message MyDouble {
   *   // value must be greater than 5.0 [double.gt]
   *   double value = 1 [(buf.validate.field).double.gt = 5.0];
   *
   *   // value must be greater than 5 and less than 10.0 [double.gt_lt]
   *   double other_value = 2 [(buf.validate.field).double = { gt: 5.0, lt: 10.0 }];
   *
   *   // value must be greater than 10 or less than 5.0 [double.gt_lt_exclusive]
   *   double another_value = 3 [(buf.validate.field).double = { gt: 10.0, lt: 5.0 }];
   * }
   * ```
   */
  gt?:
    | number
    | undefined;
  /**
   * `gte` requires the field value to be greater than or equal to the specified
   * value (exclusive). If the value of `gte` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyDouble {
   *   // value must be greater than or equal to 5.0 [double.gte]
   *   double value = 1 [(buf.validate.field).double.gte = 5.0];
   *
   *   // value must be greater than or equal to 5.0 and less than 10.0 [double.gte_lt]
   *   double other_value = 2 [(buf.validate.field).double = { gte: 5.0, lt: 10.0 }];
   *
   *   // value must be greater than or equal to 10.0 or less than 5.0 [double.gte_lt_exclusive]
   *   double another_value = 3 [(buf.validate.field).double = { gte: 10.0, lt: 5.0 }];
   * }
   * ```
   */
  gte?:
    | number
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified values.
   * If the field value isn't one of the specified values, an error message is
   * generated.
   *
   * ```proto
   * message MyDouble {
   *   // value must be in list [1.0, 2.0, 3.0]
   *   repeated double value = 1 (buf.validate.field).double = { in: [1.0, 2.0, 3.0] };
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `not_in` requires the field value to not be equal to any of the specified
   * values. If the field value is one of the specified values, an error
   * message is generated.
   *
   * ```proto
   * message MyDouble {
   *   // value must not be in list [1.0, 2.0, 3.0]
   *   repeated double value = 1 (buf.validate.field).double = { not_in: [1.0, 2.0, 3.0] };
   * }
   * ```
   */
  notIn?:
    | number[]
    | undefined;
  /**
   * `finite` requires the field value to be finite. If the field value is
   * infinite or NaN, an error message is generated.
   */
  finite?: boolean | undefined;
}

/**
 * Int32Rules describes the constraints applied to `int32` values. These
 * rules may also be applied to the `google.protobuf.Int32Value` Well-Known-Type.
 */
export interface Int32Rules {
  $type?: "buf.validate.Int32Rules";
  /**
   * `const` requires the field value to exactly match the specified value. If
   * the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MyInt32 {
   *   // value must equal 42
   *   int32 value = 1 [(buf.validate.field).int32.const = 42];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `lt` requires the field value to be less than the specified value (field
   * < value). If the field value is equal to or greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MyInt32 {
   *   // value must be less than 10
   *   int32 value = 1 [(buf.validate.field).int32.lt = 10];
   * }
   * ```
   */
  lt?:
    | number
    | undefined;
  /**
   * `lte` requires the field value to be less than or equal to the specified
   * value (field <= value). If the field value is greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MyInt32 {
   *   // value must be less than or equal to 10
   *   int32 value = 1 [(buf.validate.field).int32.lte = 10];
   * }
   * ```
   */
  lte?:
    | number
    | undefined;
  /**
   * `gt` requires the field value to be greater than the specified value
   * (exclusive). If the value of `gt` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyInt32 {
   *   // value must be greater than 5 [int32.gt]
   *   int32 value = 1 [(buf.validate.field).int32.gt = 5];
   *
   *   // value must be greater than 5 and less than 10 [int32.gt_lt]
   *   int32 other_value = 2 [(buf.validate.field).int32 = { gt: 5, lt: 10 }];
   *
   *   // value must be greater than 10 or less than 5 [int32.gt_lt_exclusive]
   *   int32 another_value = 3 [(buf.validate.field).int32 = { gt: 10, lt: 5 }];
   * }
   * ```
   */
  gt?:
    | number
    | undefined;
  /**
   * `gte` requires the field value to be greater than or equal to the specified value
   * (exclusive). If the value of `gte` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyInt32 {
   *   // value must be greater than or equal to 5 [int32.gte]
   *   int32 value = 1 [(buf.validate.field).int32.gte = 5];
   *
   *   // value must be greater than or equal to 5 and less than 10 [int32.gte_lt]
   *   int32 other_value = 2 [(buf.validate.field).int32 = { gte: 5, lt: 10 }];
   *
   *   // value must be greater than or equal to 10 or less than 5 [int32.gte_lt_exclusive]
   *   int32 another_value = 3 [(buf.validate.field).int32 = { gte: 10, lt: 5 }];
   * }
   * ```
   */
  gte?:
    | number
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified values.
   * If the field value isn't one of the specified values, an error message is
   * generated.
   *
   * ```proto
   * message MyInt32 {
   *   // value must be in list [1, 2, 3]
   *   repeated int32 value = 1 (buf.validate.field).int32 = { in: [1, 2, 3] };
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `not_in` requires the field value to not be equal to any of the specified
   * values. If the field value is one of the specified values, an error message
   * is generated.
   *
   * ```proto
   * message MyInt32 {
   *   // value must not be in list [1, 2, 3]
   *   repeated int32 value = 1 (buf.validate.field).int32 = { not_in: [1, 2, 3] };
   * }
   * ```
   */
  notIn?: number[] | undefined;
}

/**
 * Int64Rules describes the constraints applied to `int64` values. These
 * rules may also be applied to the `google.protobuf.Int64Value` Well-Known-Type.
 */
export interface Int64Rules {
  $type?: "buf.validate.Int64Rules";
  /**
   * `const` requires the field value to exactly match the specified value. If
   * the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MyInt64 {
   *   // value must equal 42
   *   int64 value = 1 [(buf.validate.field).int64.const = 42];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `lt` requires the field value to be less than the specified value (field <
   * value). If the field value is equal to or greater than the specified value,
   * an error message is generated.
   *
   * ```proto
   * message MyInt64 {
   *   // value must be less than 10
   *   int64 value = 1 [(buf.validate.field).int64.lt = 10];
   * }
   * ```
   */
  lt?:
    | number
    | undefined;
  /**
   * `lte` requires the field value to be less than or equal to the specified
   * value (field <= value). If the field value is greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MyInt64 {
   *   // value must be less than or equal to 10
   *   int64 value = 1 [(buf.validate.field).int64.lte = 10];
   * }
   * ```
   */
  lte?:
    | number
    | undefined;
  /**
   * `gt` requires the field value to be greater than the specified value
   * (exclusive). If the value of `gt` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyInt64 {
   *   // value must be greater than 5 [int64.gt]
   *   int64 value = 1 [(buf.validate.field).int64.gt = 5];
   *
   *   // value must be greater than 5 and less than 10 [int64.gt_lt]
   *   int64 other_value = 2 [(buf.validate.field).int64 = { gt: 5, lt: 10 }];
   *
   *   // value must be greater than 10 or less than 5 [int64.gt_lt_exclusive]
   *   int64 another_value = 3 [(buf.validate.field).int64 = { gt: 10, lt: 5 }];
   * }
   * ```
   */
  gt?:
    | number
    | undefined;
  /**
   * `gte` requires the field value to be greater than or equal to the specified
   * value (exclusive). If the value of `gte` is larger than a specified `lt`
   * or `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyInt64 {
   *   // value must be greater than or equal to 5 [int64.gte]
   *   int64 value = 1 [(buf.validate.field).int64.gte = 5];
   *
   *   // value must be greater than or equal to 5 and less than 10 [int64.gte_lt]
   *   int64 other_value = 2 [(buf.validate.field).int64 = { gte: 5, lt: 10 }];
   *
   *   // value must be greater than or equal to 10 or less than 5 [int64.gte_lt_exclusive]
   *   int64 another_value = 3 [(buf.validate.field).int64 = { gte: 10, lt: 5 }];
   * }
   * ```
   */
  gte?:
    | number
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified values.
   * If the field value isn't one of the specified values, an error message is
   * generated.
   *
   * ```proto
   * message MyInt64 {
   *   // value must be in list [1, 2, 3]
   *   repeated int64 value = 1 (buf.validate.field).int64 = { in: [1, 2, 3] };
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `not_in` requires the field value to not be equal to any of the specified
   * values. If the field value is one of the specified values, an error
   * message is generated.
   *
   * ```proto
   * message MyInt64 {
   *   // value must not be in list [1, 2, 3]
   *   repeated int64 value = 1 (buf.validate.field).int64 = { not_in: [1, 2, 3] };
   * }
   * ```
   */
  notIn?: number[] | undefined;
}

/**
 * UInt32Rules describes the constraints applied to `uint32` values. These
 * rules may also be applied to the `google.protobuf.UInt32Value` Well-Known-Type.
 */
export interface UInt32Rules {
  $type?: "buf.validate.UInt32Rules";
  /**
   * `const` requires the field value to exactly match the specified value. If
   * the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MyUInt32 {
   *   // value must equal 42
   *   uint32 value = 1 [(buf.validate.field).uint32.const = 42];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `lt` requires the field value to be less than the specified value (field <
   * value). If the field value is equal to or greater than the specified value,
   * an error message is generated.
   *
   * ```proto
   * message MyUInt32 {
   *   // value must be less than 10
   *   uint32 value = 1 [(buf.validate.field).uint32.lt = 10];
   * }
   * ```
   */
  lt?:
    | number
    | undefined;
  /**
   * `lte` requires the field value to be less than or equal to the specified
   * value (field <= value). If the field value is greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MyUInt32 {
   *   // value must be less than or equal to 10
   *   uint32 value = 1 [(buf.validate.field).uint32.lte = 10];
   * }
   * ```
   */
  lte?:
    | number
    | undefined;
  /**
   * `gt` requires the field value to be greater than the specified value
   * (exclusive). If the value of `gt` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyUInt32 {
   *   // value must be greater than 5 [uint32.gt]
   *   uint32 value = 1 [(buf.validate.field).uint32.gt = 5];
   *
   *   // value must be greater than 5 and less than 10 [uint32.gt_lt]
   *   uint32 other_value = 2 [(buf.validate.field).uint32 = { gt: 5, lt: 10 }];
   *
   *   // value must be greater than 10 or less than 5 [uint32.gt_lt_exclusive]
   *   uint32 another_value = 3 [(buf.validate.field).uint32 = { gt: 10, lt: 5 }];
   * }
   * ```
   */
  gt?:
    | number
    | undefined;
  /**
   * `gte` requires the field value to be greater than or equal to the specified
   * value (exclusive). If the value of `gte` is larger than a specified `lt`
   * or `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyUInt32 {
   *   // value must be greater than or equal to 5 [uint32.gte]
   *   uint32 value = 1 [(buf.validate.field).uint32.gte = 5];
   *
   *   // value must be greater than or equal to 5 and less than 10 [uint32.gte_lt]
   *   uint32 other_value = 2 [(buf.validate.field).uint32 = { gte: 5, lt: 10 }];
   *
   *   // value must be greater than or equal to 10 or less than 5 [uint32.gte_lt_exclusive]
   *   uint32 another_value = 3 [(buf.validate.field).uint32 = { gte: 10, lt: 5 }];
   * }
   * ```
   */
  gte?:
    | number
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified values.
   * If the field value isn't one of the specified values, an error message is
   * generated.
   *
   * ```proto
   * message MyUInt32 {
   *   // value must be in list [1, 2, 3]
   *   repeated uint32 value = 1 (buf.validate.field).uint32 = { in: [1, 2, 3] };
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `not_in` requires the field value to not be equal to any of the specified
   * values. If the field value is one of the specified values, an error
   * message is generated.
   *
   * ```proto
   * message MyUInt32 {
   *   // value must not be in list [1, 2, 3]
   *   repeated uint32 value = 1 (buf.validate.field).uint32 = { not_in: [1, 2, 3] };
   * }
   * ```
   */
  notIn?: number[] | undefined;
}

/**
 * UInt64Rules describes the constraints applied to `uint64` values. These
 * rules may also be applied to the `google.protobuf.UInt64Value` Well-Known-Type.
 */
export interface UInt64Rules {
  $type?: "buf.validate.UInt64Rules";
  /**
   * `const` requires the field value to exactly match the specified value. If
   * the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MyUInt64 {
   *   // value must equal 42
   *   uint64 value = 1 [(buf.validate.field).uint64.const = 42];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `lt` requires the field value to be less than the specified value (field <
   * value). If the field value is equal to or greater than the specified value,
   * an error message is generated.
   *
   * ```proto
   * message MyUInt64 {
   *   // value must be less than 10
   *   uint64 value = 1 [(buf.validate.field).uint64.lt = 10];
   * }
   * ```
   */
  lt?:
    | number
    | undefined;
  /**
   * `lte` requires the field value to be less than or equal to the specified
   * value (field <= value). If the field value is greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MyUInt64 {
   *   // value must be less than or equal to 10
   *   uint64 value = 1 [(buf.validate.field).uint64.lte = 10];
   * }
   * ```
   */
  lte?:
    | number
    | undefined;
  /**
   * `gt` requires the field value to be greater than the specified value
   * (exclusive). If the value of `gt` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyUInt64 {
   *   // value must be greater than 5 [uint64.gt]
   *   uint64 value = 1 [(buf.validate.field).uint64.gt = 5];
   *
   *   // value must be greater than 5 and less than 10 [uint64.gt_lt]
   *   uint64 other_value = 2 [(buf.validate.field).uint64 = { gt: 5, lt: 10 }];
   *
   *   // value must be greater than 10 or less than 5 [uint64.gt_lt_exclusive]
   *   uint64 another_value = 3 [(buf.validate.field).uint64 = { gt: 10, lt: 5 }];
   * }
   * ```
   */
  gt?:
    | number
    | undefined;
  /**
   * `gte` requires the field value to be greater than or equal to the specified
   * value (exclusive). If the value of `gte` is larger than a specified `lt`
   * or `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyUInt64 {
   *   // value must be greater than or equal to 5 [uint64.gte]
   *   uint64 value = 1 [(buf.validate.field).uint64.gte = 5];
   *
   *   // value must be greater than or equal to 5 and less than 10 [uint64.gte_lt]
   *   uint64 other_value = 2 [(buf.validate.field).uint64 = { gte: 5, lt: 10 }];
   *
   *   // value must be greater than or equal to 10 or less than 5 [uint64.gte_lt_exclusive]
   *   uint64 another_value = 3 [(buf.validate.field).uint64 = { gte: 10, lt: 5 }];
   * }
   * ```
   */
  gte?:
    | number
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified values.
   * If the field value isn't one of the specified values, an error message is
   * generated.
   *
   * ```proto
   * message MyUInt64 {
   *   // value must be in list [1, 2, 3]
   *   repeated uint64 value = 1 (buf.validate.field).uint64 = { in: [1, 2, 3] };
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `not_in` requires the field value to not be equal to any of the specified
   * values. If the field value is one of the specified values, an error
   * message is generated.
   *
   * ```proto
   * message MyUInt64 {
   *   // value must not be in list [1, 2, 3]
   *   repeated uint64 value = 1 (buf.validate.field).uint64 = { not_in: [1, 2, 3] };
   * }
   * ```
   */
  notIn?: number[] | undefined;
}

/** SInt32Rules describes the constraints applied to `sint32` values. */
export interface SInt32Rules {
  $type?: "buf.validate.SInt32Rules";
  /**
   * `const` requires the field value to exactly match the specified value. If
   * the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MySInt32 {
   *   // value must equal 42
   *   sint32 value = 1 [(buf.validate.field).sint32.const = 42];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `lt` requires the field value to be less than the specified value (field
   * < value). If the field value is equal to or greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MySInt32 {
   *   // value must be less than 10
   *   sint32 value = 1 [(buf.validate.field).sint32.lt = 10];
   * }
   * ```
   */
  lt?:
    | number
    | undefined;
  /**
   * `lte` requires the field value to be less than or equal to the specified
   * value (field <= value). If the field value is greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MySInt32 {
   *   // value must be less than or equal to 10
   *   sint32 value = 1 [(buf.validate.field).sint32.lte = 10];
   * }
   * ```
   */
  lte?:
    | number
    | undefined;
  /**
   * `gt` requires the field value to be greater than the specified value
   * (exclusive). If the value of `gt` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MySInt32 {
   *   // value must be greater than 5 [sint32.gt]
   *   sint32 value = 1 [(buf.validate.field).sint32.gt = 5];
   *
   *   // value must be greater than 5 and less than 10 [sint32.gt_lt]
   *   sint32 other_value = 2 [(buf.validate.field).sint32 = { gt: 5, lt: 10 }];
   *
   *   // value must be greater than 10 or less than 5 [sint32.gt_lt_exclusive]
   *   sint32 another_value = 3 [(buf.validate.field).sint32 = { gt: 10, lt: 5 }];
   * }
   * ```
   */
  gt?:
    | number
    | undefined;
  /**
   * `gte` requires the field value to be greater than or equal to the specified
   * value (exclusive). If the value of `gte` is larger than a specified `lt`
   * or `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MySInt32 {
   *  // value must be greater than or equal to 5 [sint32.gte]
   *  sint32 value = 1 [(buf.validate.field).sint32.gte = 5];
   *
   *  // value must be greater than or equal to 5 and less than 10 [sint32.gte_lt]
   *  sint32 other_value = 2 [(buf.validate.field).sint32 = { gte: 5, lt: 10 }];
   *
   *  // value must be greater than or equal to 10 or less than 5 [sint32.gte_lt_exclusive]
   *  sint32 another_value = 3 [(buf.validate.field).sint32 = { gte: 10, lt: 5 }];
   * }
   * ```
   */
  gte?:
    | number
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified values.
   * If the field value isn't one of the specified values, an error message is
   * generated.
   *
   * ```proto
   * message MySInt32 {
   *   // value must be in list [1, 2, 3]
   *   repeated sint32 value = 1 (buf.validate.field).sint32 = { in: [1, 2, 3] };
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `not_in` requires the field value to not be equal to any of the specified
   * values. If the field value is one of the specified values, an error
   * message is generated.
   *
   * ```proto
   * message MySInt32 {
   *   // value must not be in list [1, 2, 3]
   *   repeated sint32 value = 1 (buf.validate.field).sint32 = { not_in: [1, 2, 3] };
   * }
   * ```
   */
  notIn?: number[] | undefined;
}

/** SInt64Rules describes the constraints applied to `sint64` values. */
export interface SInt64Rules {
  $type?: "buf.validate.SInt64Rules";
  /**
   * `const` requires the field value to exactly match the specified value. If
   * the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MySInt64 {
   *   // value must equal 42
   *   sint64 value = 1 [(buf.validate.field).sint64.const = 42];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `lt` requires the field value to be less than the specified value (field
   * < value). If the field value is equal to or greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MySInt64 {
   *   // value must be less than 10
   *   sint64 value = 1 [(buf.validate.field).sint64.lt = 10];
   * }
   * ```
   */
  lt?:
    | number
    | undefined;
  /**
   * `lte` requires the field value to be less than or equal to the specified
   * value (field <= value). If the field value is greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MySInt64 {
   *   // value must be less than or equal to 10
   *   sint64 value = 1 [(buf.validate.field).sint64.lte = 10];
   * }
   * ```
   */
  lte?:
    | number
    | undefined;
  /**
   * `gt` requires the field value to be greater than the specified value
   * (exclusive). If the value of `gt` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MySInt64 {
   *   // value must be greater than 5 [sint64.gt]
   *   sint64 value = 1 [(buf.validate.field).sint64.gt = 5];
   *
   *   // value must be greater than 5 and less than 10 [sint64.gt_lt]
   *   sint64 other_value = 2 [(buf.validate.field).sint64 = { gt: 5, lt: 10 }];
   *
   *   // value must be greater than 10 or less than 5 [sint64.gt_lt_exclusive]
   *   sint64 another_value = 3 [(buf.validate.field).sint64 = { gt: 10, lt: 5 }];
   * }
   * ```
   */
  gt?:
    | number
    | undefined;
  /**
   * `gte` requires the field value to be greater than or equal to the specified
   * value (exclusive). If the value of `gte` is larger than a specified `lt`
   * or `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MySInt64 {
   *   // value must be greater than or equal to 5 [sint64.gte]
   *   sint64 value = 1 [(buf.validate.field).sint64.gte = 5];
   *
   *   // value must be greater than or equal to 5 and less than 10 [sint64.gte_lt]
   *   sint64 other_value = 2 [(buf.validate.field).sint64 = { gte: 5, lt: 10 }];
   *
   *   // value must be greater than or equal to 10 or less than 5 [sint64.gte_lt_exclusive]
   *   sint64 another_value = 3 [(buf.validate.field).sint64 = { gte: 10, lt: 5 }];
   * }
   * ```
   */
  gte?:
    | number
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified values.
   * If the field value isn't one of the specified values, an error message
   * is generated.
   *
   * ```proto
   * message MySInt64 {
   *   // value must be in list [1, 2, 3]
   *   repeated sint64 value = 1 (buf.validate.field).sint64 = { in: [1, 2, 3] };
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `not_in` requires the field value to not be equal to any of the specified
   * values. If the field value is one of the specified values, an error
   * message is generated.
   *
   * ```proto
   * message MySInt64 {
   *   // value must not be in list [1, 2, 3]
   *   repeated sint64 value = 1 (buf.validate.field).sint64 = { not_in: [1, 2, 3] };
   * }
   * ```
   */
  notIn?: number[] | undefined;
}

/** Fixed32Rules describes the constraints applied to `fixed32` values. */
export interface Fixed32Rules {
  $type?: "buf.validate.Fixed32Rules";
  /**
   * `const` requires the field value to exactly match the specified value.
   * If the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MyFixed32 {
   *   // value must equal 42
   *   fixed32 value = 1 [(buf.validate.field).fixed32.const = 42];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `lt` requires the field value to be less than the specified value (field <
   * value). If the field value is equal to or greater than the specified value,
   * an error message is generated.
   *
   * ```proto
   * message MyFixed32 {
   *   // value must be less than 10
   *   fixed32 value = 1 [(buf.validate.field).fixed32.lt = 10];
   * }
   * ```
   */
  lt?:
    | number
    | undefined;
  /**
   * `lte` requires the field value to be less than or equal to the specified
   * value (field <= value). If the field value is greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MyFixed32 {
   *   // value must be less than or equal to 10
   *   fixed32 value = 1 [(buf.validate.field).fixed32.lte = 10];
   * }
   * ```
   */
  lte?:
    | number
    | undefined;
  /**
   * `gt` requires the field value to be greater than the specified value
   * (exclusive). If the value of `gt` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyFixed32 {
   *   // value must be greater than 5 [fixed32.gt]
   *   fixed32 value = 1 [(buf.validate.field).fixed32.gt = 5];
   *
   *   // value must be greater than 5 and less than 10 [fixed32.gt_lt]
   *   fixed32 other_value = 2 [(buf.validate.field).fixed32 = { gt: 5, lt: 10 }];
   *
   *   // value must be greater than 10 or less than 5 [fixed32.gt_lt_exclusive]
   *   fixed32 another_value = 3 [(buf.validate.field).fixed32 = { gt: 10, lt: 5 }];
   * }
   * ```
   */
  gt?:
    | number
    | undefined;
  /**
   * `gte` requires the field value to be greater than or equal to the specified
   * value (exclusive). If the value of `gte` is larger than a specified `lt`
   * or `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyFixed32 {
   *   // value must be greater than or equal to 5 [fixed32.gte]
   *   fixed32 value = 1 [(buf.validate.field).fixed32.gte = 5];
   *
   *   // value must be greater than or equal to 5 and less than 10 [fixed32.gte_lt]
   *   fixed32 other_value = 2 [(buf.validate.field).fixed32 = { gte: 5, lt: 10 }];
   *
   *   // value must be greater than or equal to 10 or less than 5 [fixed32.gte_lt_exclusive]
   *   fixed32 another_value = 3 [(buf.validate.field).fixed32 = { gte: 10, lt: 5 }];
   * }
   * ```
   */
  gte?:
    | number
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified values.
   * If the field value isn't one of the specified values, an error message
   * is generated.
   *
   * ```proto
   * message MyFixed32 {
   *   // value must be in list [1, 2, 3]
   *   repeated fixed32 value = 1 (buf.validate.field).fixed32 = { in: [1, 2, 3] };
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `not_in` requires the field value to not be equal to any of the specified
   * values. If the field value is one of the specified values, an error
   * message is generated.
   *
   * ```proto
   * message MyFixed32 {
   *   // value must not be in list [1, 2, 3]
   *   repeated fixed32 value = 1 (buf.validate.field).fixed32 = { not_in: [1, 2, 3] };
   * }
   * ```
   */
  notIn?: number[] | undefined;
}

/** Fixed64Rules describes the constraints applied to `fixed64` values. */
export interface Fixed64Rules {
  $type?: "buf.validate.Fixed64Rules";
  /**
   * `const` requires the field value to exactly match the specified value. If
   * the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MyFixed64 {
   *   // value must equal 42
   *   fixed64 value = 1 [(buf.validate.field).fixed64.const = 42];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `lt` requires the field value to be less than the specified value (field <
   * value). If the field value is equal to or greater than the specified value,
   * an error message is generated.
   *
   * ```proto
   * message MyFixed64 {
   *   // value must be less than 10
   *   fixed64 value = 1 [(buf.validate.field).fixed64.lt = 10];
   * }
   * ```
   */
  lt?:
    | number
    | undefined;
  /**
   * `lte` requires the field value to be less than or equal to the specified
   * value (field <= value). If the field value is greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MyFixed64 {
   *   // value must be less than or equal to 10
   *   fixed64 value = 1 [(buf.validate.field).fixed64.lte = 10];
   * }
   * ```
   */
  lte?:
    | number
    | undefined;
  /**
   * `gt` requires the field value to be greater than the specified value
   * (exclusive). If the value of `gt` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyFixed64 {
   *   // value must be greater than 5 [fixed64.gt]
   *   fixed64 value = 1 [(buf.validate.field).fixed64.gt = 5];
   *
   *   // value must be greater than 5 and less than 10 [fixed64.gt_lt]
   *   fixed64 other_value = 2 [(buf.validate.field).fixed64 = { gt: 5, lt: 10 }];
   *
   *   // value must be greater than 10 or less than 5 [fixed64.gt_lt_exclusive]
   *   fixed64 another_value = 3 [(buf.validate.field).fixed64 = { gt: 10, lt: 5 }];
   * }
   * ```
   */
  gt?:
    | number
    | undefined;
  /**
   * `gte` requires the field value to be greater than or equal to the specified
   * value (exclusive). If the value of `gte` is larger than a specified `lt`
   * or `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyFixed64 {
   *   // value must be greater than or equal to 5 [fixed64.gte]
   *   fixed64 value = 1 [(buf.validate.field).fixed64.gte = 5];
   *
   *   // value must be greater than or equal to 5 and less than 10 [fixed64.gte_lt]
   *   fixed64 other_value = 2 [(buf.validate.field).fixed64 = { gte: 5, lt: 10 }];
   *
   *   // value must be greater than or equal to 10 or less than 5 [fixed64.gte_lt_exclusive]
   *   fixed64 another_value = 3 [(buf.validate.field).fixed64 = { gte: 10, lt: 5 }];
   * }
   * ```
   */
  gte?:
    | number
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified values.
   * If the field value isn't one of the specified values, an error message is
   * generated.
   *
   * ```proto
   * message MyFixed64 {
   *   // value must be in list [1, 2, 3]
   *   repeated fixed64 value = 1 (buf.validate.field).fixed64 = { in: [1, 2, 3] };
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `not_in` requires the field value to not be equal to any of the specified
   * values. If the field value is one of the specified values, an error
   * message is generated.
   *
   * ```proto
   * message MyFixed64 {
   *   // value must not be in list [1, 2, 3]
   *   repeated fixed64 value = 1 (buf.validate.field).fixed64 = { not_in: [1, 2, 3] };
   * }
   * ```
   */
  notIn?: number[] | undefined;
}

/** SFixed32Rules describes the constraints applied to `fixed32` values. */
export interface SFixed32Rules {
  $type?: "buf.validate.SFixed32Rules";
  /**
   * `const` requires the field value to exactly match the specified value. If
   * the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MySFixed32 {
   *   // value must equal 42
   *   sfixed32 value = 1 [(buf.validate.field).sfixed32.const = 42];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `lt` requires the field value to be less than the specified value (field <
   * value). If the field value is equal to or greater than the specified value,
   * an error message is generated.
   *
   * ```proto
   * message MySFixed32 {
   *   // value must be less than 10
   *   sfixed32 value = 1 [(buf.validate.field).sfixed32.lt = 10];
   * }
   * ```
   */
  lt?:
    | number
    | undefined;
  /**
   * `lte` requires the field value to be less than or equal to the specified
   * value (field <= value). If the field value is greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MySFixed32 {
   *   // value must be less than or equal to 10
   *   sfixed32 value = 1 [(buf.validate.field).sfixed32.lte = 10];
   * }
   * ```
   */
  lte?:
    | number
    | undefined;
  /**
   * `gt` requires the field value to be greater than the specified value
   * (exclusive). If the value of `gt` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MySFixed32 {
   *   // value must be greater than 5 [sfixed32.gt]
   *   sfixed32 value = 1 [(buf.validate.field).sfixed32.gt = 5];
   *
   *   // value must be greater than 5 and less than 10 [sfixed32.gt_lt]
   *   sfixed32 other_value = 2 [(buf.validate.field).sfixed32 = { gt: 5, lt: 10 }];
   *
   *   // value must be greater than 10 or less than 5 [sfixed32.gt_lt_exclusive]
   *   sfixed32 another_value = 3 [(buf.validate.field).sfixed32 = { gt: 10, lt: 5 }];
   * }
   * ```
   */
  gt?:
    | number
    | undefined;
  /**
   * `gte` requires the field value to be greater than or equal to the specified
   * value (exclusive). If the value of `gte` is larger than a specified `lt`
   * or `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MySFixed32 {
   *   // value must be greater than or equal to 5 [sfixed32.gte]
   *   sfixed32 value = 1 [(buf.validate.field).sfixed32.gte = 5];
   *
   *   // value must be greater than or equal to 5 and less than 10 [sfixed32.gte_lt]
   *   sfixed32 other_value = 2 [(buf.validate.field).sfixed32 = { gte: 5, lt: 10 }];
   *
   *   // value must be greater than or equal to 10 or less than 5 [sfixed32.gte_lt_exclusive]
   *   sfixed32 another_value = 3 [(buf.validate.field).sfixed32 = { gte: 10, lt: 5 }];
   * }
   * ```
   */
  gte?:
    | number
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified values.
   * If the field value isn't one of the specified values, an error message is
   * generated.
   *
   * ```proto
   * message MySFixed32 {
   *   // value must be in list [1, 2, 3]
   *   repeated sfixed32 value = 1 (buf.validate.field).sfixed32 = { in: [1, 2, 3] };
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `not_in` requires the field value to not be equal to any of the specified
   * values. If the field value is one of the specified values, an error
   * message is generated.
   *
   * ```proto
   * message MySFixed32 {
   *   // value must not be in list [1, 2, 3]
   *   repeated sfixed32 value = 1 (buf.validate.field).sfixed32 = { not_in: [1, 2, 3] };
   * }
   * ```
   */
  notIn?: number[] | undefined;
}

/** SFixed64Rules describes the constraints applied to `fixed64` values. */
export interface SFixed64Rules {
  $type?: "buf.validate.SFixed64Rules";
  /**
   * `const` requires the field value to exactly match the specified value. If
   * the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MySFixed64 {
   *   // value must equal 42
   *   sfixed64 value = 1 [(buf.validate.field).sfixed64.const = 42];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `lt` requires the field value to be less than the specified value (field <
   * value). If the field value is equal to or greater than the specified value,
   * an error message is generated.
   *
   * ```proto
   * message MySFixed64 {
   *   // value must be less than 10
   *   sfixed64 value = 1 [(buf.validate.field).sfixed64.lt = 10];
   * }
   * ```
   */
  lt?:
    | number
    | undefined;
  /**
   * `lte` requires the field value to be less than or equal to the specified
   * value (field <= value). If the field value is greater than the specified
   * value, an error message is generated.
   *
   * ```proto
   * message MySFixed64 {
   *   // value must be less than or equal to 10
   *   sfixed64 value = 1 [(buf.validate.field).sfixed64.lte = 10];
   * }
   * ```
   */
  lte?:
    | number
    | undefined;
  /**
   * `gt` requires the field value to be greater than the specified value
   * (exclusive). If the value of `gt` is larger than a specified `lt` or
   * `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MySFixed64 {
   *   // value must be greater than 5 [sfixed64.gt]
   *   sfixed64 value = 1 [(buf.validate.field).sfixed64.gt = 5];
   *
   *   // value must be greater than 5 and less than 10 [sfixed64.gt_lt]
   *   sfixed64 other_value = 2 [(buf.validate.field).sfixed64 = { gt: 5, lt: 10 }];
   *
   *   // value must be greater than 10 or less than 5 [sfixed64.gt_lt_exclusive]
   *   sfixed64 another_value = 3 [(buf.validate.field).sfixed64 = { gt: 10, lt: 5 }];
   * }
   * ```
   */
  gt?:
    | number
    | undefined;
  /**
   * `gte` requires the field value to be greater than or equal to the specified
   * value (exclusive). If the value of `gte` is larger than a specified `lt`
   * or `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MySFixed64 {
   *   // value must be greater than or equal to 5 [sfixed64.gte]
   *   sfixed64 value = 1 [(buf.validate.field).sfixed64.gte = 5];
   *
   *   // value must be greater than or equal to 5 and less than 10 [sfixed64.gte_lt]
   *   sfixed64 other_value = 2 [(buf.validate.field).sfixed64 = { gte: 5, lt: 10 }];
   *
   *   // value must be greater than or equal to 10 or less than 5 [sfixed64.gte_lt_exclusive]
   *   sfixed64 another_value = 3 [(buf.validate.field).sfixed64 = { gte: 10, lt: 5 }];
   * }
   * ```
   */
  gte?:
    | number
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified values.
   * If the field value isn't one of the specified values, an error message is
   * generated.
   *
   * ```proto
   * message MySFixed64 {
   *   // value must be in list [1, 2, 3]
   *   repeated sfixed64 value = 1 (buf.validate.field).sfixed64 = { in: [1, 2, 3] };
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `not_in` requires the field value to not be equal to any of the specified
   * values. If the field value is one of the specified values, an error
   * message is generated.
   *
   * ```proto
   * message MySFixed64 {
   *   // value must not be in list [1, 2, 3]
   *   repeated sfixed64 value = 1 (buf.validate.field).sfixed64 = { not_in: [1, 2, 3] };
   * }
   * ```
   */
  notIn?: number[] | undefined;
}

/**
 * BoolRules describes the constraints applied to `bool` values. These rules
 * may also be applied to the `google.protobuf.BoolValue` Well-Known-Type.
 */
export interface BoolRules {
  $type?: "buf.validate.BoolRules";
  /**
   * `const` requires the field value to exactly match the specified boolean value.
   * If the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MyBool {
   *   // value must equal true
   *   bool value = 1 [(buf.validate.field).bool.const = true];
   * }
   * ```
   */
  const?: boolean | undefined;
}

/**
 * StringRules describes the constraints applied to `string` values These
 * rules may also be applied to the `google.protobuf.StringValue` Well-Known-Type.
 */
export interface StringRules {
  $type?: "buf.validate.StringRules";
  /**
   * `const` requires the field value to exactly match the specified value. If
   * the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MyString {
   *   // value must equal `hello`
   *   string value = 1 [(buf.validate.field).string.const = "hello"];
   * }
   * ```
   */
  const?:
    | string
    | undefined;
  /**
   * `len` dictates that the field value must have the specified
   * number of characters (Unicode code points), which may differ from the number
   * of bytes in the string. If the field value does not meet the specified
   * length, an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value length must be 5 characters
   *   string value = 1 [(buf.validate.field).string.len = 5];
   * }
   * ```
   */
  len?:
    | number
    | undefined;
  /**
   * `min_len` specifies that the field value must have at least the specified
   * number of characters (Unicode code points), which may differ from the number
   * of bytes in the string. If the field value contains fewer characters, an error
   * message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value length must be at least 3 characters
   *   string value = 1 [(buf.validate.field).string.min_len = 3];
   * }
   * ```
   */
  minLen?:
    | number
    | undefined;
  /**
   * `max_len` specifies that the field value must have no more than the specified
   * number of characters (Unicode code points), which may differ from the
   * number of bytes in the string. If the field value contains more characters,
   * an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value length must be at most 10 characters
   *   string value = 1 [(buf.validate.field).string.max_len = 10];
   * }
   * ```
   */
  maxLen?:
    | number
    | undefined;
  /**
   * `len_bytes` dictates that the field value must have the specified number of
   * bytes. If the field value does not match the specified length in bytes,
   * an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value length must be 6 bytes
   *   string value = 1 [(buf.validate.field).string.len_bytes = 6];
   * }
   * ```
   */
  lenBytes?:
    | number
    | undefined;
  /**
   * `min_bytes` specifies that the field value must have at least the specified
   * number of bytes. If the field value contains fewer bytes, an error message
   * will be generated.
   *
   * ```proto
   * message MyString {
   *   // value length must be at least 4 bytes
   *   string value = 1 [(buf.validate.field).string.min_bytes = 4];
   * }
   *
   * ```
   */
  minBytes?:
    | number
    | undefined;
  /**
   * `max_bytes` specifies that the field value must have no more than the
   * specified number of bytes. If the field value contains more bytes, an
   * error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value length must be at most 8 bytes
   *   string value = 1 [(buf.validate.field).string.max_bytes = 8];
   * }
   * ```
   */
  maxBytes?:
    | number
    | undefined;
  /**
   * `pattern` specifies that the field value must match the specified
   * regular expression (RE2 syntax), with the expression provided without any
   * delimiters. If the field value doesn't match the regular expression, an
   * error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value does not match regex pattern `^[a-zA-Z]//$`
   *   string value = 1 [(buf.validate.field).string.pattern = "^[a-zA-Z]//$"];
   * }
   * ```
   */
  pattern?:
    | string
    | undefined;
  /**
   * `prefix` specifies that the field value must have the
   * specified substring at the beginning of the string. If the field value
   * doesn't start with the specified prefix, an error message will be
   * generated.
   *
   * ```proto
   * message MyString {
   *   // value does not have prefix `pre`
   *   string value = 1 [(buf.validate.field).string.prefix = "pre"];
   * }
   * ```
   */
  prefix?:
    | string
    | undefined;
  /**
   * `suffix` specifies that the field value must have the
   * specified substring at the end of the string. If the field value doesn't
   * end with the specified suffix, an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value does not have suffix `post`
   *   string value = 1 [(buf.validate.field).string.suffix = "post"];
   * }
   * ```
   */
  suffix?:
    | string
    | undefined;
  /**
   * `contains` specifies that the field value must have the
   * specified substring anywhere in the string. If the field value doesn't
   * contain the specified substring, an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value does not contain substring `inside`.
   *   string value = 1 [(buf.validate.field).string.contains = "inside"];
   * }
   * ```
   */
  contains?:
    | string
    | undefined;
  /**
   * `not_contains` specifies that the field value must not have the
   * specified substring anywhere in the string. If the field value contains
   * the specified substring, an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value contains substring `inside`.
   *   string value = 1 [(buf.validate.field).string.not_contains = "inside"];
   * }
   * ```
   */
  notContains?:
    | string
    | undefined;
  /**
   * `in` specifies that the field value must be equal to one of the specified
   * values. If the field value isn't one of the specified values, an error
   * message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be in list ["apple", "banana"]
   *   repeated string value = 1 [(buf.validate.field).string.in = "apple", (buf.validate.field).string.in = "banana"];
   * }
   * ```
   */
  in?:
    | string[]
    | undefined;
  /**
   * `not_in` specifies that the field value cannot be equal to any
   * of the specified values. If the field value is one of the specified values,
   * an error message will be generated.
   * ```proto
   * message MyString {
   *   // value must not be in list ["orange", "grape"]
   *   repeated string value = 1 [(buf.validate.field).string.not_in = "orange", (buf.validate.field).string.not_in = "grape"];
   * }
   * ```
   */
  notIn?:
    | string[]
    | undefined;
  /**
   * `email` specifies that the field value must be a valid email address
   * (addr-spec only) as defined by [RFC 5322](https://tools.ietf.org/html/rfc5322#section-3.4.1).
   * If the field value isn't a valid email address, an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid email address
   *   string value = 1 [(buf.validate.field).string.email = true];
   * }
   * ```
   */
  email?:
    | boolean
    | undefined;
  /**
   * `hostname` specifies that the field value must be a valid
   * hostname as defined by [RFC 1034](https://tools.ietf.org/html/rfc1034#section-3.5). This constraint doesn't support
   * internationalized domain names (IDNs). If the field value isn't a
   * valid hostname, an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid hostname
   *   string value = 1 [(buf.validate.field).string.hostname = true];
   * }
   * ```
   */
  hostname?:
    | boolean
    | undefined;
  /**
   * `ip` specifies that the field value must be a valid IP
   * (v4 or v6) address, without surrounding square brackets for IPv6 addresses.
   * If the field value isn't a valid IP address, an error message will be
   * generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid IP address
   *   string value = 1 [(buf.validate.field).string.ip = true];
   * }
   * ```
   */
  ip?:
    | boolean
    | undefined;
  /**
   * `ipv4` specifies that the field value must be a valid IPv4
   * address. If the field value isn't a valid IPv4 address, an error message
   * will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid IPv4 address
   *   string value = 1 [(buf.validate.field).string.ipv4 = true];
   * }
   * ```
   */
  ipv4?:
    | boolean
    | undefined;
  /**
   * `ipv6` specifies that the field value must be a valid
   * IPv6 address, without surrounding square brackets. If the field value is
   * not a valid IPv6 address, an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid IPv6 address
   *   string value = 1 [(buf.validate.field).string.ipv6 = true];
   * }
   * ```
   */
  ipv6?:
    | boolean
    | undefined;
  /**
   * `uri` specifies that the field value must be a valid,
   * absolute URI as defined by [RFC 3986](https://tools.ietf.org/html/rfc3986#section-3). If the field value isn't a valid,
   * absolute URI, an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid URI
   *   string value = 1 [(buf.validate.field).string.uri = true];
   * }
   * ```
   */
  uri?:
    | boolean
    | undefined;
  /**
   * `uri_ref` specifies that the field value must be a valid URI
   * as defined by [RFC 3986](https://tools.ietf.org/html/rfc3986#section-3) and may be either relative or absolute. If the
   * field value isn't a valid URI, an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid URI
   *   string value = 1 [(buf.validate.field).string.uri_ref = true];
   * }
   * ```
   */
  uriRef?:
    | boolean
    | undefined;
  /**
   * `address` specifies that the field value must be either a valid hostname
   * as defined by [RFC 1034](https://tools.ietf.org/html/rfc1034#section-3.5)
   * (which doesn't support internationalized domain names or IDNs) or a valid
   * IP (v4 or v6). If the field value isn't a valid hostname or IP, an error
   * message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid hostname, or ip address
   *   string value = 1 [(buf.validate.field).string.address = true];
   * }
   * ```
   */
  address?:
    | boolean
    | undefined;
  /**
   * `uuid` specifies that the field value must be a valid UUID as defined by
   * [RFC 4122](https://tools.ietf.org/html/rfc4122#section-4.1.2). If the
   * field value isn't a valid UUID, an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid UUID
   *   string value = 1 [(buf.validate.field).string.uuid = true];
   * }
   * ```
   */
  uuid?:
    | boolean
    | undefined;
  /**
   * `tuuid` (trimmed UUID) specifies that the field value must be a valid UUID as
   * defined by [RFC 4122](https://tools.ietf.org/html/rfc4122#section-4.1.2) with all dashes
   * omitted. If the field value isn't a valid UUID without dashes, an error message
   * will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid trimmed UUID
   *   string value = 1 [(buf.validate.field).string.tuuid = true];
   * }
   * ```
   */
  tuuid?:
    | boolean
    | undefined;
  /**
   * `ip_with_prefixlen` specifies that the field value must be a valid IP (v4 or v6)
   * address with prefix length. If the field value isn't a valid IP with prefix
   * length, an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid IP with prefix length
   *    string value = 1 [(buf.validate.field).string.ip_with_prefixlen = true];
   * }
   * ```
   */
  ipWithPrefixlen?:
    | boolean
    | undefined;
  /**
   * `ipv4_with_prefixlen` specifies that the field value must be a valid
   * IPv4 address with prefix.
   * If the field value isn't a valid IPv4 address with prefix length,
   * an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid IPv4 address with prefix length
   *    string value = 1 [(buf.validate.field).string.ipv4_with_prefixlen = true];
   * }
   * ```
   */
  ipv4WithPrefixlen?:
    | boolean
    | undefined;
  /**
   * `ipv6_with_prefixlen` specifies that the field value must be a valid
   * IPv6 address with prefix length.
   * If the field value is not a valid IPv6 address with prefix length,
   * an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid IPv6 address prefix length
   *    string value = 1 [(buf.validate.field).string.ipv6_with_prefixlen = true];
   * }
   * ```
   */
  ipv6WithPrefixlen?:
    | boolean
    | undefined;
  /**
   * `ip_prefix` specifies that the field value must be a valid IP (v4 or v6) prefix.
   * If the field value isn't a valid IP prefix, an error message will be
   * generated. The prefix must have all zeros for the masked bits of the prefix (e.g.,
   * `127.0.0.0/16`, not `127.0.0.1/16`).
   *
   * ```proto
   * message MyString {
   *   // value must be a valid IP prefix
   *    string value = 1 [(buf.validate.field).string.ip_prefix = true];
   * }
   * ```
   */
  ipPrefix?:
    | boolean
    | undefined;
  /**
   * `ipv4_prefix` specifies that the field value must be a valid IPv4
   * prefix. If the field value isn't a valid IPv4 prefix, an error message
   * will be generated. The prefix must have all zeros for the masked bits of
   * the prefix (e.g., `127.0.0.0/16`, not `127.0.0.1/16`).
   *
   * ```proto
   * message MyString {
   *   // value must be a valid IPv4 prefix
   *    string value = 1 [(buf.validate.field).string.ipv4_prefix = true];
   * }
   * ```
   */
  ipv4Prefix?:
    | boolean
    | undefined;
  /**
   * `ipv6_prefix` specifies that the field value must be a valid IPv6 prefix.
   * If the field value is not a valid IPv6 prefix, an error message will be
   * generated. The prefix must have all zeros for the masked bits of the prefix
   * (e.g., `2001:db8::/48`, not `2001:db8::1/48`).
   *
   * ```proto
   * message MyString {
   *   // value must be a valid IPv6 prefix
   *    string value = 1 [(buf.validate.field).string.ipv6_prefix = true];
   * }
   * ```
   */
  ipv6Prefix?:
    | boolean
    | undefined;
  /**
   * `host_and_port` specifies the field value must be a valid host and port
   * pair. The host must be a valid hostname or IP address while the port
   * must be in the range of 0-65535, inclusive. IPv6 addresses must be delimited
   * with square brackets (e.g., `[::1]:1234`).
   */
  hostAndPort?:
    | boolean
    | undefined;
  /**
   * `well_known_regex` specifies a common well-known pattern
   * defined as a regex. If the field value doesn't match the well-known
   * regex, an error message will be generated.
   *
   * ```proto
   * message MyString {
   *   // value must be a valid HTTP header value
   *   string value = 1 [(buf.validate.field).string.well_known_regex = KNOWN_REGEX_HTTP_HEADER_VALUE];
   * }
   * ```
   *
   * #### KnownRegex
   *
   * `well_known_regex` contains some well-known patterns.
   *
   * | Name                          | Number | Description                               |
   * |-------------------------------|--------|-------------------------------------------|
   * | KNOWN_REGEX_UNSPECIFIED       | 0      |                                           |
   * | KNOWN_REGEX_HTTP_HEADER_NAME  | 1      | HTTP header name as defined by [RFC 7230](https://tools.ietf.org/html/rfc7230#section-3.2)  |
   * | KNOWN_REGEX_HTTP_HEADER_VALUE | 2      | HTTP header value as defined by [RFC 7230](https://tools.ietf.org/html/rfc7230#section-3.2.4) |
   */
  wellKnownRegex?:
    | KnownRegex
    | undefined;
  /**
   * This applies to regexes `HTTP_HEADER_NAME` and `HTTP_HEADER_VALUE` to
   * enable strict header validation. By default, this is true, and HTTP header
   * validations are [RFC-compliant](https://tools.ietf.org/html/rfc7230#section-3). Setting to false will enable looser
   * validations that only disallow `\r\n\0` characters, which can be used to
   * bypass header matching rules.
   *
   * ```proto
   * message MyString {
   *   // The field `value` must have be a valid HTTP headers, but not enforced with strict rules.
   *   string value = 1 [(buf.validate.field).string.strict = false];
   * }
   * ```
   */
  strict?: boolean | undefined;
}

/**
 * BytesRules describe the constraints applied to `bytes` values. These rules
 * may also be applied to the `google.protobuf.BytesValue` Well-Known-Type.
 */
export interface BytesRules {
  $type?: "buf.validate.BytesRules";
  /**
   * `const` requires the field value to exactly match the specified bytes
   * value. If the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MyBytes {
   *   // value must be "\x01\x02\x03\x04"
   *   bytes value = 1 [(buf.validate.field).bytes.const = "\x01\x02\x03\x04"];
   * }
   * ```
   */
  const?:
    | Uint8Array
    | undefined;
  /**
   * `len` requires the field value to have the specified length in bytes.
   * If the field value doesn't match, an error message is generated.
   *
   * ```proto
   * message MyBytes {
   *   // value length must be 4 bytes.
   *   optional bytes value = 1 [(buf.validate.field).bytes.len = 4];
   * }
   * ```
   */
  len?:
    | number
    | undefined;
  /**
   * `min_len` requires the field value to have at least the specified minimum
   * length in bytes.
   * If the field value doesn't meet the requirement, an error message is generated.
   *
   * ```proto
   * message MyBytes {
   *   // value length must be at least 2 bytes.
   *   optional bytes value = 1 [(buf.validate.field).bytes.min_len = 2];
   * }
   * ```
   */
  minLen?:
    | number
    | undefined;
  /**
   * `max_len` requires the field value to have at most the specified maximum
   * length in bytes.
   * If the field value exceeds the requirement, an error message is generated.
   *
   * ```proto
   * message MyBytes {
   *   // value must be at most 6 bytes.
   *   optional bytes value = 1 [(buf.validate.field).bytes.max_len = 6];
   * }
   * ```
   */
  maxLen?:
    | number
    | undefined;
  /**
   * `pattern` requires the field value to match the specified regular
   * expression ([RE2 syntax](https://github.com/google/re2/wiki/Syntax)).
   * The value of the field must be valid UTF-8 or validation will fail with a
   * runtime error.
   * If the field value doesn't match the pattern, an error message is generated.
   *
   * ```proto
   * message MyBytes {
   *   // value must match regex pattern "^[a-zA-Z0-9]+$".
   *   optional bytes value = 1 [(buf.validate.field).bytes.pattern = "^[a-zA-Z0-9]+$"];
   * }
   * ```
   */
  pattern?:
    | string
    | undefined;
  /**
   * `prefix` requires the field value to have the specified bytes at the
   * beginning of the string.
   * If the field value doesn't meet the requirement, an error message is generated.
   *
   * ```proto
   * message MyBytes {
   *   // value does not have prefix \x01\x02
   *   optional bytes value = 1 [(buf.validate.field).bytes.prefix = "\x01\x02"];
   * }
   * ```
   */
  prefix?:
    | Uint8Array
    | undefined;
  /**
   * `suffix` requires the field value to have the specified bytes at the end
   * of the string.
   * If the field value doesn't meet the requirement, an error message is generated.
   *
   * ```proto
   * message MyBytes {
   *   // value does not have suffix \x03\x04
   *   optional bytes value = 1 [(buf.validate.field).bytes.suffix = "\x03\x04"];
   * }
   * ```
   */
  suffix?:
    | Uint8Array
    | undefined;
  /**
   * `contains` requires the field value to have the specified bytes anywhere in
   * the string.
   * If the field value doesn't meet the requirement, an error message is generated.
   *
   * ```protobuf
   * message MyBytes {
   *   // value does not contain \x02\x03
   *   optional bytes value = 1 [(buf.validate.field).bytes.contains = "\x02\x03"];
   * }
   * ```
   */
  contains?:
    | Uint8Array
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the specified
   * values. If the field value doesn't match any of the specified values, an
   * error message is generated.
   *
   * ```protobuf
   * message MyBytes {
   *   // value must in ["\x01\x02", "\x02\x03", "\x03\x04"]
   *   optional bytes value = 1 [(buf.validate.field).bytes.in = {"\x01\x02", "\x02\x03", "\x03\x04"}];
   * }
   * ```
   */
  in?:
    | Uint8Array[]
    | undefined;
  /**
   * `not_in` requires the field value to be not equal to any of the specified
   * values.
   * If the field value matches any of the specified values, an error message is
   * generated.
   *
   * ```proto
   * message MyBytes {
   *   // value must not in ["\x01\x02", "\x02\x03", "\x03\x04"]
   *   optional bytes value = 1 [(buf.validate.field).bytes.not_in = {"\x01\x02", "\x02\x03", "\x03\x04"}];
   * }
   * ```
   */
  notIn?:
    | Uint8Array[]
    | undefined;
  /**
   * `ip` ensures that the field `value` is a valid IP address (v4 or v6) in byte format.
   * If the field value doesn't meet this constraint, an error message is generated.
   *
   * ```proto
   * message MyBytes {
   *   // value must be a valid IP address
   *   optional bytes value = 1 [(buf.validate.field).bytes.ip = true];
   * }
   * ```
   */
  ip?:
    | boolean
    | undefined;
  /**
   * `ipv4` ensures that the field `value` is a valid IPv4 address in byte format.
   * If the field value doesn't meet this constraint, an error message is generated.
   *
   * ```proto
   * message MyBytes {
   *   // value must be a valid IPv4 address
   *   optional bytes value = 1 [(buf.validate.field).bytes.ipv4 = true];
   * }
   * ```
   */
  ipv4?:
    | boolean
    | undefined;
  /**
   * `ipv6` ensures that the field `value` is a valid IPv6 address in byte format.
   * If the field value doesn't meet this constraint, an error message is generated.
   * ```proto
   * message MyBytes {
   *   // value must be a valid IPv6 address
   *   optional bytes value = 1 [(buf.validate.field).bytes.ipv6 = true];
   * }
   * ```
   */
  ipv6?: boolean | undefined;
}

/** EnumRules describe the constraints applied to `enum` values. */
export interface EnumRules {
  $type?: "buf.validate.EnumRules";
  /**
   * `const` requires the field value to exactly match the specified enum value.
   * If the field value doesn't match, an error message is generated.
   *
   * ```proto
   * enum MyEnum {
   *   MY_ENUM_UNSPECIFIED = 0;
   *   MY_ENUM_VALUE1 = 1;
   *   MY_ENUM_VALUE2 = 2;
   * }
   *
   * message MyMessage {
   *   // The field `value` must be exactly MY_ENUM_VALUE1.
   *   MyEnum value = 1 [(buf.validate.field).enum.const = 1];
   * }
   * ```
   */
  const?:
    | number
    | undefined;
  /**
   * `defined_only` requires the field value to be one of the defined values for
   * this enum, failing on any undefined value.
   *
   * ```proto
   * enum MyEnum {
   *   MY_ENUM_UNSPECIFIED = 0;
   *   MY_ENUM_VALUE1 = 1;
   *   MY_ENUM_VALUE2 = 2;
   * }
   *
   * message MyMessage {
   *   // The field `value` must be a defined value of MyEnum.
   *   MyEnum value = 1 [(buf.validate.field).enum.defined_only = true];
   * }
   * ```
   */
  definedOnly?:
    | boolean
    | undefined;
  /**
   * `in` requires the field value to be equal to one of the
   * specified enum values. If the field value doesn't match any of the
   * specified values, an error message is generated.
   *
   * ```proto
   * enum MyEnum {
   *   MY_ENUM_UNSPECIFIED = 0;
   *   MY_ENUM_VALUE1 = 1;
   *   MY_ENUM_VALUE2 = 2;
   * }
   *
   * message MyMessage {
   *   // The field `value` must be equal to one of the specified values.
   *   MyEnum value = 1 [(buf.validate.field).enum = { in: [1, 2]}];
   * }
   * ```
   */
  in?:
    | number[]
    | undefined;
  /**
   * `not_in` requires the field value to be not equal to any of the
   * specified enum values. If the field value matches one of the specified
   * values, an error message is generated.
   *
   * ```proto
   * enum MyEnum {
   *   MY_ENUM_UNSPECIFIED = 0;
   *   MY_ENUM_VALUE1 = 1;
   *   MY_ENUM_VALUE2 = 2;
   * }
   *
   * message MyMessage {
   *   // The field `value` must not be equal to any of the specified values.
   *   MyEnum value = 1 [(buf.validate.field).enum = { not_in: [1, 2]}];
   * }
   * ```
   */
  notIn?: number[] | undefined;
}

/** RepeatedRules describe the constraints applied to `repeated` values. */
export interface RepeatedRules {
  $type?: "buf.validate.RepeatedRules";
  /**
   * `min_items` requires that this field must contain at least the specified
   * minimum number of items.
   *
   * Note that `min_items = 1` is equivalent to setting a field as `required`.
   *
   * ```proto
   * message MyRepeated {
   *   // value must contain at least  2 items
   *   repeated string value = 1 [(buf.validate.field).repeated.min_items = 2];
   * }
   * ```
   */
  minItems?:
    | number
    | undefined;
  /**
   * `max_items` denotes that this field must not exceed a
   * certain number of items as the upper limit. If the field contains more
   * items than specified, an error message will be generated, requiring the
   * field to maintain no more than the specified number of items.
   *
   * ```proto
   * message MyRepeated {
   *   // value must contain no more than 3 item(s)
   *   repeated string value = 1 [(buf.validate.field).repeated.max_items = 3];
   * }
   * ```
   */
  maxItems?:
    | number
    | undefined;
  /**
   * `unique` indicates that all elements in this field must
   * be unique. This constraint is strictly applicable to scalar and enum
   * types, with message types not being supported.
   *
   * ```proto
   * message MyRepeated {
   *   // repeated value must contain unique items
   *   repeated string value = 1 [(buf.validate.field).repeated.unique = true];
   * }
   * ```
   */
  unique?:
    | boolean
    | undefined;
  /**
   * `items` details the constraints to be applied to each item
   * in the field. Even for repeated message fields, validation is executed
   * against each item unless skip is explicitly specified.
   *
   * ```proto
   * message MyRepeated {
   *   // The items in the field `value` must follow the specified constraints.
   *   repeated string value = 1 [(buf.validate.field).repeated.items = {
   *     string: {
   *       min_len: 3
   *       max_len: 10
   *     }
   *   }];
   * }
   * ```
   */
  items?: FieldConstraints | undefined;
}

/** MapRules describe the constraints applied to `map` values. */
export interface MapRules {
  $type?: "buf.validate.MapRules";
  /**
   * Specifies the minimum number of key-value pairs allowed. If the field has
   * fewer key-value pairs than specified, an error message is generated.
   *
   * ```proto
   * message MyMap {
   *   // The field `value` must have at least 2 key-value pairs.
   *   map<string, string> value = 1 [(buf.validate.field).map.min_pairs = 2];
   * }
   * ```
   */
  minPairs?:
    | number
    | undefined;
  /**
   * Specifies the maximum number of key-value pairs allowed. If the field has
   * more key-value pairs than specified, an error message is generated.
   *
   * ```proto
   * message MyMap {
   *   // The field `value` must have at most 3 key-value pairs.
   *   map<string, string> value = 1 [(buf.validate.field).map.max_pairs = 3];
   * }
   * ```
   */
  maxPairs?:
    | number
    | undefined;
  /**
   * Specifies the constraints to be applied to each key in the field.
   *
   * ```proto
   * message MyMap {
   *   // The keys in the field `value` must follow the specified constraints.
   *   map<string, string> value = 1 [(buf.validate.field).map.keys = {
   *     string: {
   *       min_len: 3
   *       max_len: 10
   *     }
   *   }];
   * }
   * ```
   */
  keys?:
    | FieldConstraints
    | undefined;
  /**
   * Specifies the constraints to be applied to the value of each key in the
   * field. Message values will still have their validations evaluated unless
   * skip is specified here.
   *
   * ```proto
   * message MyMap {
   *   // The values in the field `value` must follow the specified constraints.
   *   map<string, string> value = 1 [(buf.validate.field).map.values = {
   *     string: {
   *       min_len: 5
   *       max_len: 20
   *     }
   *   }];
   * }
   * ```
   */
  values?: FieldConstraints | undefined;
}

/** AnyRules describe constraints applied exclusively to the `google.protobuf.Any` well-known type. */
export interface AnyRules {
  $type?: "buf.validate.AnyRules";
  /**
   * `in` requires the field's `type_url` to be equal to one of the
   * specified values. If it doesn't match any of the specified values, an error
   * message is generated.
   *
   * ```proto
   * message MyAny {
   *   //  The `value` field must have a `type_url` equal to one of the specified values.
   *   google.protobuf.Any value = 1 [(buf.validate.field).any.in = ["type.googleapis.com/MyType1", "type.googleapis.com/MyType2"]];
   * }
   * ```
   */
  in?:
    | string[]
    | undefined;
  /**
   * requires the field's type_url to be not equal to any of the specified values. If it matches any of the specified values, an error message is generated.
   *
   * ```proto
   * message MyAny {
   *   // The field `value` must not have a `type_url` equal to any of the specified values.
   *   google.protobuf.Any value = 1 [(buf.validate.field).any.not_in = ["type.googleapis.com/ForbiddenType1", "type.googleapis.com/ForbiddenType2"]];
   * }
   * ```
   */
  notIn?: string[] | undefined;
}

/** DurationRules describe the constraints applied exclusively to the `google.protobuf.Duration` well-known type. */
export interface DurationRules {
  $type?: "buf.validate.DurationRules";
  /**
   * `const` dictates that the field must match the specified value of the `google.protobuf.Duration` type exactly.
   * If the field's value deviates from the specified value, an error message
   * will be generated.
   *
   * ```proto
   * message MyDuration {
   *   // value must equal 5s
   *   google.protobuf.Duration value = 1 [(buf.validate.field).duration.const = "5s"];
   * }
   * ```
   */
  const?:
    | Duration
    | undefined;
  /**
   * `lt` stipulates that the field must be less than the specified value of the `google.protobuf.Duration` type,
   * exclusive. If the field's value is greater than or equal to the specified
   * value, an error message will be generated.
   *
   * ```proto
   * message MyDuration {
   *   // value must be less than 5s
   *   google.protobuf.Duration value = 1 [(buf.validate.field).duration.lt = "5s"];
   * }
   * ```
   */
  lt?:
    | Duration
    | undefined;
  /**
   * `lte` indicates that the field must be less than or equal to the specified
   * value of the `google.protobuf.Duration` type, inclusive. If the field's value is greater than the specified value,
   * an error message will be generated.
   *
   * ```proto
   * message MyDuration {
   *   // value must be less than or equal to 10s
   *   google.protobuf.Duration value = 1 [(buf.validate.field).duration.lte = "10s"];
   * }
   * ```
   */
  lte?:
    | Duration
    | undefined;
  /**
   * `gt` requires the duration field value to be greater than the specified
   * value (exclusive). If the value of `gt` is larger than a specified `lt`
   * or `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyDuration {
   *   // duration must be greater than 5s [duration.gt]
   *   google.protobuf.Duration value = 1 [(buf.validate.field).duration.gt = { seconds: 5 }];
   *
   *   // duration must be greater than 5s and less than 10s [duration.gt_lt]
   *   google.protobuf.Duration another_value = 2 [(buf.validate.field).duration = { gt: { seconds: 5 }, lt: { seconds: 10 } }];
   *
   *   // duration must be greater than 10s or less than 5s [duration.gt_lt_exclusive]
   *   google.protobuf.Duration other_value = 3 [(buf.validate.field).duration = { gt: { seconds: 10 }, lt: { seconds: 5 } }];
   * }
   * ```
   */
  gt?:
    | Duration
    | undefined;
  /**
   * `gte` requires the duration field value to be greater than or equal to the
   * specified value (exclusive). If the value of `gte` is larger than a
   * specified `lt` or `lte`, the range is reversed, and the field value must
   * be outside the specified range. If the field value doesn't meet the
   * required conditions, an error message is generated.
   *
   * ```proto
   * message MyDuration {
   *  // duration must be greater than or equal to 5s [duration.gte]
   *  google.protobuf.Duration value = 1 [(buf.validate.field).duration.gte = { seconds: 5 }];
   *
   *  // duration must be greater than or equal to 5s and less than 10s [duration.gte_lt]
   *  google.protobuf.Duration another_value = 2 [(buf.validate.field).duration = { gte: { seconds: 5 }, lt: { seconds: 10 } }];
   *
   *  // duration must be greater than or equal to 10s or less than 5s [duration.gte_lt_exclusive]
   *  google.protobuf.Duration other_value = 3 [(buf.validate.field).duration = { gte: { seconds: 10 }, lt: { seconds: 5 } }];
   * }
   * ```
   */
  gte?:
    | Duration
    | undefined;
  /**
   * `in` asserts that the field must be equal to one of the specified values of the `google.protobuf.Duration` type.
   * If the field's value doesn't correspond to any of the specified values,
   * an error message will be generated.
   *
   * ```proto
   * message MyDuration {
   *   // value must be in list [1s, 2s, 3s]
   *   google.protobuf.Duration value = 1 [(buf.validate.field).duration.in = ["1s", "2s", "3s"]];
   * }
   * ```
   */
  in?:
    | Duration[]
    | undefined;
  /**
   * `not_in` denotes that the field must not be equal to
   * any of the specified values of the `google.protobuf.Duration` type.
   * If the field's value matches any of these values, an error message will be
   * generated.
   *
   * ```proto
   * message MyDuration {
   *   // value must not be in list [1s, 2s, 3s]
   *   google.protobuf.Duration value = 1 [(buf.validate.field).duration.not_in = ["1s", "2s", "3s"]];
   * }
   * ```
   */
  notIn?: Duration[] | undefined;
}

/** TimestampRules describe the constraints applied exclusively to the `google.protobuf.Timestamp` well-known type. */
export interface TimestampRules {
  $type?: "buf.validate.TimestampRules";
  /**
   * `const` dictates that this field, of the `google.protobuf.Timestamp` type, must exactly match the specified value. If the field value doesn't correspond to the specified timestamp, an error message will be generated.
   *
   * ```proto
   * message MyTimestamp {
   *   // value must equal 2023-05-03T10:00:00Z
   *   google.protobuf.Timestamp created_at = 1 [(buf.validate.field).timestamp.const = {seconds: 1727998800}];
   * }
   * ```
   */
  const?:
    | Date
    | undefined;
  /**
   * requires the duration field value to be less than the specified value (field < value). If the field value doesn't meet the required conditions, an error message is generated.
   *
   * ```proto
   * message MyDuration {
   *   // duration must be less than 'P3D' [duration.lt]
   *   google.protobuf.Duration value = 1 [(buf.validate.field).duration.lt = { seconds: 259200 }];
   * }
   * ```
   */
  lt?:
    | Date
    | undefined;
  /**
   * requires the timestamp field value to be less than or equal to the specified value (field <= value). If the field value doesn't meet the required conditions, an error message is generated.
   *
   * ```proto
   * message MyTimestamp {
   *   // timestamp must be less than or equal to '2023-05-14T00:00:00Z' [timestamp.lte]
   *   google.protobuf.Timestamp value = 1 [(buf.validate.field).timestamp.lte = { seconds: 1678867200 }];
   * }
   * ```
   */
  lte?:
    | Date
    | undefined;
  /**
   * `lt_now` specifies that this field, of the `google.protobuf.Timestamp` type, must be less than the current time. `lt_now` can only be used with the `within` rule.
   *
   * ```proto
   * message MyTimestamp {
   *  // value must be less than now
   *   google.protobuf.Timestamp created_at = 1 [(buf.validate.field).timestamp.lt_now = true];
   * }
   * ```
   */
  ltNow?:
    | boolean
    | undefined;
  /**
   * `gt` requires the timestamp field value to be greater than the specified
   * value (exclusive). If the value of `gt` is larger than a specified `lt`
   * or `lte`, the range is reversed, and the field value must be outside the
   * specified range. If the field value doesn't meet the required conditions,
   * an error message is generated.
   *
   * ```proto
   * message MyTimestamp {
   *   // timestamp must be greater than '2023-01-01T00:00:00Z' [timestamp.gt]
   *   google.protobuf.Timestamp value = 1 [(buf.validate.field).timestamp.gt = { seconds: 1672444800 }];
   *
   *   // timestamp must be greater than '2023-01-01T00:00:00Z' and less than '2023-01-02T00:00:00Z' [timestamp.gt_lt]
   *   google.protobuf.Timestamp another_value = 2 [(buf.validate.field).timestamp = { gt: { seconds: 1672444800 }, lt: { seconds: 1672531200 } }];
   *
   *   // timestamp must be greater than '2023-01-02T00:00:00Z' or less than '2023-01-01T00:00:00Z' [timestamp.gt_lt_exclusive]
   *   google.protobuf.Timestamp other_value = 3 [(buf.validate.field).timestamp = { gt: { seconds: 1672531200 }, lt: { seconds: 1672444800 } }];
   * }
   * ```
   */
  gt?:
    | Date
    | undefined;
  /**
   * `gte` requires the timestamp field value to be greater than or equal to the
   * specified value (exclusive). If the value of `gte` is larger than a
   * specified `lt` or `lte`, the range is reversed, and the field value
   * must be outside the specified range. If the field value doesn't meet
   * the required conditions, an error message is generated.
   *
   * ```proto
   * message MyTimestamp {
   *   // timestamp must be greater than or equal to '2023-01-01T00:00:00Z' [timestamp.gte]
   *   google.protobuf.Timestamp value = 1 [(buf.validate.field).timestamp.gte = { seconds: 1672444800 }];
   *
   *   // timestamp must be greater than or equal to '2023-01-01T00:00:00Z' and less than '2023-01-02T00:00:00Z' [timestamp.gte_lt]
   *   google.protobuf.Timestamp another_value = 2 [(buf.validate.field).timestamp = { gte: { seconds: 1672444800 }, lt: { seconds: 1672531200 } }];
   *
   *   // timestamp must be greater than or equal to '2023-01-02T00:00:00Z' or less than '2023-01-01T00:00:00Z' [timestamp.gte_lt_exclusive]
   *   google.protobuf.Timestamp other_value = 3 [(buf.validate.field).timestamp = { gte: { seconds: 1672531200 }, lt: { seconds: 1672444800 } }];
   * }
   * ```
   */
  gte?:
    | Date
    | undefined;
  /**
   * `gt_now` specifies that this field, of the `google.protobuf.Timestamp` type, must be greater than the current time. `gt_now` can only be used with the `within` rule.
   *
   * ```proto
   * message MyTimestamp {
   *   // value must be greater than now
   *   google.protobuf.Timestamp created_at = 1 [(buf.validate.field).timestamp.gt_now = true];
   * }
   * ```
   */
  gtNow?:
    | boolean
    | undefined;
  /**
   * `within` specifies that this field, of the `google.protobuf.Timestamp` type, must be within the specified duration of the current time. If the field value isn't within the duration, an error message is generated.
   *
   * ```proto
   * message MyTimestamp {
   *   // value must be within 1 hour of now
   *   google.protobuf.Timestamp created_at = 1 [(buf.validate.field).timestamp.within = {seconds: 3600}];
   * }
   * ```
   */
  within?: Duration | undefined;
}

function createBaseMessageConstraints(): MessageConstraints {
  return { $type: "buf.validate.MessageConstraints", disabled: undefined, cel: [] };
}

export const MessageConstraints = {
  $type: "buf.validate.MessageConstraints" as const,

  encode(message: MessageConstraints, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.disabled !== undefined) {
      writer.uint32(8).bool(message.disabled);
    }
    if (message.cel !== undefined && message.cel.length !== 0) {
      for (const v of message.cel) {
        Constraint.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageConstraints {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageConstraints();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.disabled = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cel!.push(Constraint.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageConstraints {
    return {
      $type: MessageConstraints.$type,
      disabled: isSet(object.disabled) ? globalThis.Boolean(object.disabled) : undefined,
      cel: globalThis.Array.isArray(object?.cel) ? object.cel.map((e: any) => Constraint.fromJSON(e)) : [],
    };
  },

  toJSON(message: MessageConstraints): unknown {
    const obj: any = {};
    if (message.disabled !== undefined) {
      obj.disabled = message.disabled;
    }
    if (message.cel?.length) {
      obj.cel = message.cel.map((e) => Constraint.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageConstraints>, I>>(base?: I): MessageConstraints {
    return MessageConstraints.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageConstraints>, I>>(object: I): MessageConstraints {
    const message = createBaseMessageConstraints();
    message.disabled = object.disabled ?? undefined;
    message.cel = object.cel?.map((e) => Constraint.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(MessageConstraints.$type, MessageConstraints);

function createBaseOneofConstraints(): OneofConstraints {
  return { $type: "buf.validate.OneofConstraints", required: undefined };
}

export const OneofConstraints = {
  $type: "buf.validate.OneofConstraints" as const,

  encode(message: OneofConstraints, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.required !== undefined) {
      writer.uint32(8).bool(message.required);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OneofConstraints {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOneofConstraints();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.required = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OneofConstraints {
    return {
      $type: OneofConstraints.$type,
      required: isSet(object.required) ? globalThis.Boolean(object.required) : undefined,
    };
  },

  toJSON(message: OneofConstraints): unknown {
    const obj: any = {};
    if (message.required !== undefined) {
      obj.required = message.required;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OneofConstraints>, I>>(base?: I): OneofConstraints {
    return OneofConstraints.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OneofConstraints>, I>>(object: I): OneofConstraints {
    const message = createBaseOneofConstraints();
    message.required = object.required ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(OneofConstraints.$type, OneofConstraints);

function createBaseFieldConstraints(): FieldConstraints {
  return {
    $type: "buf.validate.FieldConstraints",
    cel: [],
    required: false,
    ignore: 0,
    float: undefined,
    double: undefined,
    int32: undefined,
    int64: undefined,
    uint32: undefined,
    uint64: undefined,
    sint32: undefined,
    sint64: undefined,
    fixed32: undefined,
    fixed64: undefined,
    sfixed32: undefined,
    sfixed64: undefined,
    bool: undefined,
    string: undefined,
    bytes: undefined,
    enum: undefined,
    repeated: undefined,
    map: undefined,
    any: undefined,
    duration: undefined,
    timestamp: undefined,
    skipped: false,
    ignoreEmpty: false,
  };
}

export const FieldConstraints = {
  $type: "buf.validate.FieldConstraints" as const,

  encode(message: FieldConstraints, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cel !== undefined && message.cel.length !== 0) {
      for (const v of message.cel) {
        Constraint.encode(v!, writer.uint32(186).fork()).ldelim();
      }
    }
    if (message.required !== undefined && message.required !== false) {
      writer.uint32(200).bool(message.required);
    }
    if (message.ignore !== undefined && message.ignore !== 0) {
      writer.uint32(216).int32(message.ignore);
    }
    if (message.float !== undefined) {
      FloatRules.encode(message.float, writer.uint32(10).fork()).ldelim();
    }
    if (message.double !== undefined) {
      DoubleRules.encode(message.double, writer.uint32(18).fork()).ldelim();
    }
    if (message.int32 !== undefined) {
      Int32Rules.encode(message.int32, writer.uint32(26).fork()).ldelim();
    }
    if (message.int64 !== undefined) {
      Int64Rules.encode(message.int64, writer.uint32(34).fork()).ldelim();
    }
    if (message.uint32 !== undefined) {
      UInt32Rules.encode(message.uint32, writer.uint32(42).fork()).ldelim();
    }
    if (message.uint64 !== undefined) {
      UInt64Rules.encode(message.uint64, writer.uint32(50).fork()).ldelim();
    }
    if (message.sint32 !== undefined) {
      SInt32Rules.encode(message.sint32, writer.uint32(58).fork()).ldelim();
    }
    if (message.sint64 !== undefined) {
      SInt64Rules.encode(message.sint64, writer.uint32(66).fork()).ldelim();
    }
    if (message.fixed32 !== undefined) {
      Fixed32Rules.encode(message.fixed32, writer.uint32(74).fork()).ldelim();
    }
    if (message.fixed64 !== undefined) {
      Fixed64Rules.encode(message.fixed64, writer.uint32(82).fork()).ldelim();
    }
    if (message.sfixed32 !== undefined) {
      SFixed32Rules.encode(message.sfixed32, writer.uint32(90).fork()).ldelim();
    }
    if (message.sfixed64 !== undefined) {
      SFixed64Rules.encode(message.sfixed64, writer.uint32(98).fork()).ldelim();
    }
    if (message.bool !== undefined) {
      BoolRules.encode(message.bool, writer.uint32(106).fork()).ldelim();
    }
    if (message.string !== undefined) {
      StringRules.encode(message.string, writer.uint32(114).fork()).ldelim();
    }
    if (message.bytes !== undefined) {
      BytesRules.encode(message.bytes, writer.uint32(122).fork()).ldelim();
    }
    if (message.enum !== undefined) {
      EnumRules.encode(message.enum, writer.uint32(130).fork()).ldelim();
    }
    if (message.repeated !== undefined) {
      RepeatedRules.encode(message.repeated, writer.uint32(146).fork()).ldelim();
    }
    if (message.map !== undefined) {
      MapRules.encode(message.map, writer.uint32(154).fork()).ldelim();
    }
    if (message.any !== undefined) {
      AnyRules.encode(message.any, writer.uint32(162).fork()).ldelim();
    }
    if (message.duration !== undefined) {
      DurationRules.encode(message.duration, writer.uint32(170).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      TimestampRules.encode(message.timestamp, writer.uint32(178).fork()).ldelim();
    }
    if (message.skipped !== undefined && message.skipped !== false) {
      writer.uint32(192).bool(message.skipped);
    }
    if (message.ignoreEmpty !== undefined && message.ignoreEmpty !== false) {
      writer.uint32(208).bool(message.ignoreEmpty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldConstraints {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldConstraints();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 23:
          if (tag !== 186) {
            break;
          }

          message.cel!.push(Constraint.decode(reader, reader.uint32()));
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.required = reader.bool();
          continue;
        case 27:
          if (tag !== 216) {
            break;
          }

          message.ignore = reader.int32() as any;
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.float = FloatRules.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.double = DoubleRules.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.int32 = Int32Rules.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.int64 = Int64Rules.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.uint32 = UInt32Rules.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.uint64 = UInt64Rules.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.sint32 = SInt32Rules.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.sint64 = SInt64Rules.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.fixed32 = Fixed32Rules.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.fixed64 = Fixed64Rules.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.sfixed32 = SFixed32Rules.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.sfixed64 = SFixed64Rules.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.bool = BoolRules.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.string = StringRules.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.bytes = BytesRules.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.enum = EnumRules.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.repeated = RepeatedRules.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.map = MapRules.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.any = AnyRules.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.duration = DurationRules.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.timestamp = TimestampRules.decode(reader, reader.uint32());
          continue;
        case 24:
          if (tag !== 192) {
            break;
          }

          message.skipped = reader.bool();
          continue;
        case 26:
          if (tag !== 208) {
            break;
          }

          message.ignoreEmpty = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FieldConstraints {
    return {
      $type: FieldConstraints.$type,
      cel: globalThis.Array.isArray(object?.cel) ? object.cel.map((e: any) => Constraint.fromJSON(e)) : [],
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
      ignore: isSet(object.ignore) ? ignoreFromJSON(object.ignore) : 0,
      float: isSet(object.float) ? FloatRules.fromJSON(object.float) : undefined,
      double: isSet(object.double) ? DoubleRules.fromJSON(object.double) : undefined,
      int32: isSet(object.int32) ? Int32Rules.fromJSON(object.int32) : undefined,
      int64: isSet(object.int64) ? Int64Rules.fromJSON(object.int64) : undefined,
      uint32: isSet(object.uint32) ? UInt32Rules.fromJSON(object.uint32) : undefined,
      uint64: isSet(object.uint64) ? UInt64Rules.fromJSON(object.uint64) : undefined,
      sint32: isSet(object.sint32) ? SInt32Rules.fromJSON(object.sint32) : undefined,
      sint64: isSet(object.sint64) ? SInt64Rules.fromJSON(object.sint64) : undefined,
      fixed32: isSet(object.fixed32) ? Fixed32Rules.fromJSON(object.fixed32) : undefined,
      fixed64: isSet(object.fixed64) ? Fixed64Rules.fromJSON(object.fixed64) : undefined,
      sfixed32: isSet(object.sfixed32) ? SFixed32Rules.fromJSON(object.sfixed32) : undefined,
      sfixed64: isSet(object.sfixed64) ? SFixed64Rules.fromJSON(object.sfixed64) : undefined,
      bool: isSet(object.bool) ? BoolRules.fromJSON(object.bool) : undefined,
      string: isSet(object.string) ? StringRules.fromJSON(object.string) : undefined,
      bytes: isSet(object.bytes) ? BytesRules.fromJSON(object.bytes) : undefined,
      enum: isSet(object.enum) ? EnumRules.fromJSON(object.enum) : undefined,
      repeated: isSet(object.repeated) ? RepeatedRules.fromJSON(object.repeated) : undefined,
      map: isSet(object.map) ? MapRules.fromJSON(object.map) : undefined,
      any: isSet(object.any) ? AnyRules.fromJSON(object.any) : undefined,
      duration: isSet(object.duration) ? DurationRules.fromJSON(object.duration) : undefined,
      timestamp: isSet(object.timestamp) ? TimestampRules.fromJSON(object.timestamp) : undefined,
      skipped: isSet(object.skipped) ? globalThis.Boolean(object.skipped) : false,
      ignoreEmpty: isSet(object.ignoreEmpty) ? globalThis.Boolean(object.ignoreEmpty) : false,
    };
  },

  toJSON(message: FieldConstraints): unknown {
    const obj: any = {};
    if (message.cel?.length) {
      obj.cel = message.cel.map((e) => Constraint.toJSON(e));
    }
    if (message.required !== undefined && message.required !== false) {
      obj.required = message.required;
    }
    if (message.ignore !== undefined && message.ignore !== 0) {
      obj.ignore = ignoreToJSON(message.ignore);
    }
    if (message.float !== undefined) {
      obj.float = FloatRules.toJSON(message.float);
    }
    if (message.double !== undefined) {
      obj.double = DoubleRules.toJSON(message.double);
    }
    if (message.int32 !== undefined) {
      obj.int32 = Int32Rules.toJSON(message.int32);
    }
    if (message.int64 !== undefined) {
      obj.int64 = Int64Rules.toJSON(message.int64);
    }
    if (message.uint32 !== undefined) {
      obj.uint32 = UInt32Rules.toJSON(message.uint32);
    }
    if (message.uint64 !== undefined) {
      obj.uint64 = UInt64Rules.toJSON(message.uint64);
    }
    if (message.sint32 !== undefined) {
      obj.sint32 = SInt32Rules.toJSON(message.sint32);
    }
    if (message.sint64 !== undefined) {
      obj.sint64 = SInt64Rules.toJSON(message.sint64);
    }
    if (message.fixed32 !== undefined) {
      obj.fixed32 = Fixed32Rules.toJSON(message.fixed32);
    }
    if (message.fixed64 !== undefined) {
      obj.fixed64 = Fixed64Rules.toJSON(message.fixed64);
    }
    if (message.sfixed32 !== undefined) {
      obj.sfixed32 = SFixed32Rules.toJSON(message.sfixed32);
    }
    if (message.sfixed64 !== undefined) {
      obj.sfixed64 = SFixed64Rules.toJSON(message.sfixed64);
    }
    if (message.bool !== undefined) {
      obj.bool = BoolRules.toJSON(message.bool);
    }
    if (message.string !== undefined) {
      obj.string = StringRules.toJSON(message.string);
    }
    if (message.bytes !== undefined) {
      obj.bytes = BytesRules.toJSON(message.bytes);
    }
    if (message.enum !== undefined) {
      obj.enum = EnumRules.toJSON(message.enum);
    }
    if (message.repeated !== undefined) {
      obj.repeated = RepeatedRules.toJSON(message.repeated);
    }
    if (message.map !== undefined) {
      obj.map = MapRules.toJSON(message.map);
    }
    if (message.any !== undefined) {
      obj.any = AnyRules.toJSON(message.any);
    }
    if (message.duration !== undefined) {
      obj.duration = DurationRules.toJSON(message.duration);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = TimestampRules.toJSON(message.timestamp);
    }
    if (message.skipped !== undefined && message.skipped !== false) {
      obj.skipped = message.skipped;
    }
    if (message.ignoreEmpty !== undefined && message.ignoreEmpty !== false) {
      obj.ignoreEmpty = message.ignoreEmpty;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldConstraints>, I>>(base?: I): FieldConstraints {
    return FieldConstraints.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldConstraints>, I>>(object: I): FieldConstraints {
    const message = createBaseFieldConstraints();
    message.cel = object.cel?.map((e) => Constraint.fromPartial(e)) || [];
    message.required = object.required ?? false;
    message.ignore = object.ignore ?? 0;
    message.float = (object.float !== undefined && object.float !== null)
      ? FloatRules.fromPartial(object.float)
      : undefined;
    message.double = (object.double !== undefined && object.double !== null)
      ? DoubleRules.fromPartial(object.double)
      : undefined;
    message.int32 = (object.int32 !== undefined && object.int32 !== null)
      ? Int32Rules.fromPartial(object.int32)
      : undefined;
    message.int64 = (object.int64 !== undefined && object.int64 !== null)
      ? Int64Rules.fromPartial(object.int64)
      : undefined;
    message.uint32 = (object.uint32 !== undefined && object.uint32 !== null)
      ? UInt32Rules.fromPartial(object.uint32)
      : undefined;
    message.uint64 = (object.uint64 !== undefined && object.uint64 !== null)
      ? UInt64Rules.fromPartial(object.uint64)
      : undefined;
    message.sint32 = (object.sint32 !== undefined && object.sint32 !== null)
      ? SInt32Rules.fromPartial(object.sint32)
      : undefined;
    message.sint64 = (object.sint64 !== undefined && object.sint64 !== null)
      ? SInt64Rules.fromPartial(object.sint64)
      : undefined;
    message.fixed32 = (object.fixed32 !== undefined && object.fixed32 !== null)
      ? Fixed32Rules.fromPartial(object.fixed32)
      : undefined;
    message.fixed64 = (object.fixed64 !== undefined && object.fixed64 !== null)
      ? Fixed64Rules.fromPartial(object.fixed64)
      : undefined;
    message.sfixed32 = (object.sfixed32 !== undefined && object.sfixed32 !== null)
      ? SFixed32Rules.fromPartial(object.sfixed32)
      : undefined;
    message.sfixed64 = (object.sfixed64 !== undefined && object.sfixed64 !== null)
      ? SFixed64Rules.fromPartial(object.sfixed64)
      : undefined;
    message.bool = (object.bool !== undefined && object.bool !== null) ? BoolRules.fromPartial(object.bool) : undefined;
    message.string = (object.string !== undefined && object.string !== null)
      ? StringRules.fromPartial(object.string)
      : undefined;
    message.bytes = (object.bytes !== undefined && object.bytes !== null)
      ? BytesRules.fromPartial(object.bytes)
      : undefined;
    message.enum = (object.enum !== undefined && object.enum !== null) ? EnumRules.fromPartial(object.enum) : undefined;
    message.repeated = (object.repeated !== undefined && object.repeated !== null)
      ? RepeatedRules.fromPartial(object.repeated)
      : undefined;
    message.map = (object.map !== undefined && object.map !== null) ? MapRules.fromPartial(object.map) : undefined;
    message.any = (object.any !== undefined && object.any !== null) ? AnyRules.fromPartial(object.any) : undefined;
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? DurationRules.fromPartial(object.duration)
      : undefined;
    message.timestamp = (object.timestamp !== undefined && object.timestamp !== null)
      ? TimestampRules.fromPartial(object.timestamp)
      : undefined;
    message.skipped = object.skipped ?? false;
    message.ignoreEmpty = object.ignoreEmpty ?? false;
    return message;
  },
};

messageTypeRegistry.set(FieldConstraints.$type, FieldConstraints);

function createBaseFloatRules(): FloatRules {
  return {
    $type: "buf.validate.FloatRules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    finite: false,
  };
}

export const FloatRules = {
  $type: "buf.validate.FloatRules" as const,

  encode(message: FloatRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(13).float(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(21).float(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(29).float(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(37).float(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(45).float(message.gte);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.in) {
        writer.float(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.notIn) {
        writer.float(v);
      }
      writer.ldelim();
    }
    if (message.finite !== undefined && message.finite !== false) {
      writer.uint32(64).bool(message.finite);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FloatRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFloatRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.const = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.lt = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.lte = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.gt = reader.float();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.gte = reader.float();
          continue;
        case 6:
          if (tag === 53) {
            message.in!.push(reader.float());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(reader.float());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 61) {
            message.notIn!.push(reader.float());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(reader.float());
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.finite = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FloatRules {
    return {
      $type: FloatRules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
      finite: isSet(object.finite) ? globalThis.Boolean(object.finite) : false,
    };
  },

  toJSON(message: FloatRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    if (message.lt !== undefined) {
      obj.lt = message.lt;
    }
    if (message.lte !== undefined) {
      obj.lte = message.lte;
    }
    if (message.gt !== undefined) {
      obj.gt = message.gt;
    }
    if (message.gte !== undefined) {
      obj.gte = message.gte;
    }
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    if (message.finite !== undefined && message.finite !== false) {
      obj.finite = message.finite;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FloatRules>, I>>(base?: I): FloatRules {
    return FloatRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FloatRules>, I>>(object: I): FloatRules {
    const message = createBaseFloatRules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.finite = object.finite ?? false;
    return message;
  },
};

messageTypeRegistry.set(FloatRules.$type, FloatRules);

function createBaseDoubleRules(): DoubleRules {
  return {
    $type: "buf.validate.DoubleRules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
    finite: false,
  };
}

export const DoubleRules = {
  $type: "buf.validate.DoubleRules" as const,

  encode(message: DoubleRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(9).double(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(17).double(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(25).double(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(33).double(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(41).double(message.gte);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.in) {
        writer.double(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.notIn) {
        writer.double(v);
      }
      writer.ldelim();
    }
    if (message.finite !== undefined && message.finite !== false) {
      writer.uint32(64).bool(message.finite);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DoubleRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDoubleRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.const = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.lt = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.lte = reader.double();
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.gt = reader.double();
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.gte = reader.double();
          continue;
        case 6:
          if (tag === 49) {
            message.in!.push(reader.double());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(reader.double());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 57) {
            message.notIn!.push(reader.double());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(reader.double());
            }

            continue;
          }

          break;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.finite = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DoubleRules {
    return {
      $type: DoubleRules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
      finite: isSet(object.finite) ? globalThis.Boolean(object.finite) : false,
    };
  },

  toJSON(message: DoubleRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    if (message.lt !== undefined) {
      obj.lt = message.lt;
    }
    if (message.lte !== undefined) {
      obj.lte = message.lte;
    }
    if (message.gt !== undefined) {
      obj.gt = message.gt;
    }
    if (message.gte !== undefined) {
      obj.gte = message.gte;
    }
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    if (message.finite !== undefined && message.finite !== false) {
      obj.finite = message.finite;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DoubleRules>, I>>(base?: I): DoubleRules {
    return DoubleRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DoubleRules>, I>>(object: I): DoubleRules {
    const message = createBaseDoubleRules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.finite = object.finite ?? false;
    return message;
  },
};

messageTypeRegistry.set(DoubleRules.$type, DoubleRules);

function createBaseInt32Rules(): Int32Rules {
  return {
    $type: "buf.validate.Int32Rules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
  };
}

export const Int32Rules = {
  $type: "buf.validate.Int32Rules" as const,

  encode(message: Int32Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).int32(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(16).int32(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(24).int32(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(32).int32(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(40).int32(message.gte);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.in) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.notIn) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Int32Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInt32Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lte = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gt = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gte = reader.int32();
          continue;
        case 6:
          if (tag === 48) {
            message.in!.push(reader.int32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(reader.int32());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 56) {
            message.notIn!.push(reader.int32());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(reader.int32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Int32Rules {
    return {
      $type: Int32Rules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: Int32Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Int32Rules>, I>>(base?: I): Int32Rules {
    return Int32Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Int32Rules>, I>>(object: I): Int32Rules {
    const message = createBaseInt32Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(Int32Rules.$type, Int32Rules);

function createBaseInt64Rules(): Int64Rules {
  return {
    $type: "buf.validate.Int64Rules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
  };
}

export const Int64Rules = {
  $type: "buf.validate.Int64Rules" as const,

  encode(message: Int64Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).int64(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(16).int64(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(24).int64(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(32).int64(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(40).int64(message.gte);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.in) {
        writer.int64(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.notIn) {
        writer.int64(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Int64Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInt64Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lte = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gt = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gte = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag === 48) {
            message.in!.push(longToNumber(reader.int64() as Long));

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(longToNumber(reader.int64() as Long));
            }

            continue;
          }

          break;
        case 7:
          if (tag === 56) {
            message.notIn!.push(longToNumber(reader.int64() as Long));

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(longToNumber(reader.int64() as Long));
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Int64Rules {
    return {
      $type: Int64Rules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: Int64Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Int64Rules>, I>>(base?: I): Int64Rules {
    return Int64Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Int64Rules>, I>>(object: I): Int64Rules {
    const message = createBaseInt64Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(Int64Rules.$type, Int64Rules);

function createBaseUInt32Rules(): UInt32Rules {
  return {
    $type: "buf.validate.UInt32Rules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
  };
}

export const UInt32Rules = {
  $type: "buf.validate.UInt32Rules" as const,

  encode(message: UInt32Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).uint32(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(16).uint32(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(24).uint32(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(32).uint32(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(40).uint32(message.gte);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.in) {
        writer.uint32(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.notIn) {
        writer.uint32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UInt32Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUInt32Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lte = reader.uint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gt = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gte = reader.uint32();
          continue;
        case 6:
          if (tag === 48) {
            message.in!.push(reader.uint32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(reader.uint32());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 56) {
            message.notIn!.push(reader.uint32());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(reader.uint32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UInt32Rules {
    return {
      $type: UInt32Rules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: UInt32Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UInt32Rules>, I>>(base?: I): UInt32Rules {
    return UInt32Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UInt32Rules>, I>>(object: I): UInt32Rules {
    const message = createBaseUInt32Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(UInt32Rules.$type, UInt32Rules);

function createBaseUInt64Rules(): UInt64Rules {
  return {
    $type: "buf.validate.UInt64Rules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
  };
}

export const UInt64Rules = {
  $type: "buf.validate.UInt64Rules" as const,

  encode(message: UInt64Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).uint64(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(16).uint64(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(24).uint64(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(32).uint64(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(40).uint64(message.gte);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.in) {
        writer.uint64(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.notIn) {
        writer.uint64(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UInt64Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUInt64Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lte = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gt = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gte = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag === 48) {
            message.in!.push(longToNumber(reader.uint64() as Long));

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(longToNumber(reader.uint64() as Long));
            }

            continue;
          }

          break;
        case 7:
          if (tag === 56) {
            message.notIn!.push(longToNumber(reader.uint64() as Long));

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(longToNumber(reader.uint64() as Long));
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UInt64Rules {
    return {
      $type: UInt64Rules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: UInt64Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UInt64Rules>, I>>(base?: I): UInt64Rules {
    return UInt64Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UInt64Rules>, I>>(object: I): UInt64Rules {
    const message = createBaseUInt64Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(UInt64Rules.$type, UInt64Rules);

function createBaseSInt32Rules(): SInt32Rules {
  return {
    $type: "buf.validate.SInt32Rules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
  };
}

export const SInt32Rules = {
  $type: "buf.validate.SInt32Rules" as const,

  encode(message: SInt32Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).sint32(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(16).sint32(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(24).sint32(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(32).sint32(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(40).sint32(message.gte);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.in) {
        writer.sint32(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.notIn) {
        writer.sint32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SInt32Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSInt32Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = reader.sint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = reader.sint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lte = reader.sint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gt = reader.sint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gte = reader.sint32();
          continue;
        case 6:
          if (tag === 48) {
            message.in!.push(reader.sint32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(reader.sint32());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 56) {
            message.notIn!.push(reader.sint32());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(reader.sint32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SInt32Rules {
    return {
      $type: SInt32Rules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: SInt32Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SInt32Rules>, I>>(base?: I): SInt32Rules {
    return SInt32Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SInt32Rules>, I>>(object: I): SInt32Rules {
    const message = createBaseSInt32Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(SInt32Rules.$type, SInt32Rules);

function createBaseSInt64Rules(): SInt64Rules {
  return {
    $type: "buf.validate.SInt64Rules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
  };
}

export const SInt64Rules = {
  $type: "buf.validate.SInt64Rules" as const,

  encode(message: SInt64Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).sint64(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(16).sint64(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(24).sint64(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(32).sint64(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(40).sint64(message.gte);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.in) {
        writer.sint64(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.notIn) {
        writer.sint64(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SInt64Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSInt64Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = longToNumber(reader.sint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = longToNumber(reader.sint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lte = longToNumber(reader.sint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gt = longToNumber(reader.sint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gte = longToNumber(reader.sint64() as Long);
          continue;
        case 6:
          if (tag === 48) {
            message.in!.push(longToNumber(reader.sint64() as Long));

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(longToNumber(reader.sint64() as Long));
            }

            continue;
          }

          break;
        case 7:
          if (tag === 56) {
            message.notIn!.push(longToNumber(reader.sint64() as Long));

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(longToNumber(reader.sint64() as Long));
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SInt64Rules {
    return {
      $type: SInt64Rules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: SInt64Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SInt64Rules>, I>>(base?: I): SInt64Rules {
    return SInt64Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SInt64Rules>, I>>(object: I): SInt64Rules {
    const message = createBaseSInt64Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(SInt64Rules.$type, SInt64Rules);

function createBaseFixed32Rules(): Fixed32Rules {
  return {
    $type: "buf.validate.Fixed32Rules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
  };
}

export const Fixed32Rules = {
  $type: "buf.validate.Fixed32Rules" as const,

  encode(message: Fixed32Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(13).fixed32(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(21).fixed32(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(29).fixed32(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(37).fixed32(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(45).fixed32(message.gte);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.in) {
        writer.fixed32(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.notIn) {
        writer.fixed32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fixed32Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFixed32Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.const = reader.fixed32();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.lt = reader.fixed32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.lte = reader.fixed32();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.gt = reader.fixed32();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.gte = reader.fixed32();
          continue;
        case 6:
          if (tag === 53) {
            message.in!.push(reader.fixed32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(reader.fixed32());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 61) {
            message.notIn!.push(reader.fixed32());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(reader.fixed32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Fixed32Rules {
    return {
      $type: Fixed32Rules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: Fixed32Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Fixed32Rules>, I>>(base?: I): Fixed32Rules {
    return Fixed32Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Fixed32Rules>, I>>(object: I): Fixed32Rules {
    const message = createBaseFixed32Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(Fixed32Rules.$type, Fixed32Rules);

function createBaseFixed64Rules(): Fixed64Rules {
  return {
    $type: "buf.validate.Fixed64Rules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
  };
}

export const Fixed64Rules = {
  $type: "buf.validate.Fixed64Rules" as const,

  encode(message: Fixed64Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(9).fixed64(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(17).fixed64(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(25).fixed64(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(33).fixed64(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(41).fixed64(message.gte);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.in) {
        writer.fixed64(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.notIn) {
        writer.fixed64(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fixed64Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFixed64Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.const = longToNumber(reader.fixed64() as Long);
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.lt = longToNumber(reader.fixed64() as Long);
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.lte = longToNumber(reader.fixed64() as Long);
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.gt = longToNumber(reader.fixed64() as Long);
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.gte = longToNumber(reader.fixed64() as Long);
          continue;
        case 6:
          if (tag === 49) {
            message.in!.push(longToNumber(reader.fixed64() as Long));

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(longToNumber(reader.fixed64() as Long));
            }

            continue;
          }

          break;
        case 7:
          if (tag === 57) {
            message.notIn!.push(longToNumber(reader.fixed64() as Long));

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(longToNumber(reader.fixed64() as Long));
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Fixed64Rules {
    return {
      $type: Fixed64Rules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: Fixed64Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Fixed64Rules>, I>>(base?: I): Fixed64Rules {
    return Fixed64Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Fixed64Rules>, I>>(object: I): Fixed64Rules {
    const message = createBaseFixed64Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(Fixed64Rules.$type, Fixed64Rules);

function createBaseSFixed32Rules(): SFixed32Rules {
  return {
    $type: "buf.validate.SFixed32Rules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
  };
}

export const SFixed32Rules = {
  $type: "buf.validate.SFixed32Rules" as const,

  encode(message: SFixed32Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(13).sfixed32(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(21).sfixed32(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(29).sfixed32(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(37).sfixed32(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(45).sfixed32(message.gte);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.in) {
        writer.sfixed32(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.notIn) {
        writer.sfixed32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SFixed32Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSFixed32Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.const = reader.sfixed32();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.lt = reader.sfixed32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.lte = reader.sfixed32();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.gt = reader.sfixed32();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.gte = reader.sfixed32();
          continue;
        case 6:
          if (tag === 53) {
            message.in!.push(reader.sfixed32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(reader.sfixed32());
            }

            continue;
          }

          break;
        case 7:
          if (tag === 61) {
            message.notIn!.push(reader.sfixed32());

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(reader.sfixed32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SFixed32Rules {
    return {
      $type: SFixed32Rules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: SFixed32Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SFixed32Rules>, I>>(base?: I): SFixed32Rules {
    return SFixed32Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SFixed32Rules>, I>>(object: I): SFixed32Rules {
    const message = createBaseSFixed32Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(SFixed32Rules.$type, SFixed32Rules);

function createBaseSFixed64Rules(): SFixed64Rules {
  return {
    $type: "buf.validate.SFixed64Rules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
  };
}

export const SFixed64Rules = {
  $type: "buf.validate.SFixed64Rules" as const,

  encode(message: SFixed64Rules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(9).sfixed64(message.const);
    }
    if (message.lt !== undefined) {
      writer.uint32(17).sfixed64(message.lt);
    }
    if (message.lte !== undefined) {
      writer.uint32(25).sfixed64(message.lte);
    }
    if (message.gt !== undefined) {
      writer.uint32(33).sfixed64(message.gt);
    }
    if (message.gte !== undefined) {
      writer.uint32(41).sfixed64(message.gte);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(50).fork();
      for (const v of message.in) {
        writer.sfixed64(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.notIn) {
        writer.sfixed64(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SFixed64Rules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSFixed64Rules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.const = longToNumber(reader.sfixed64() as Long);
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.lt = longToNumber(reader.sfixed64() as Long);
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.lte = longToNumber(reader.sfixed64() as Long);
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.gt = longToNumber(reader.sfixed64() as Long);
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.gte = longToNumber(reader.sfixed64() as Long);
          continue;
        case 6:
          if (tag === 49) {
            message.in!.push(longToNumber(reader.sfixed64() as Long));

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(longToNumber(reader.sfixed64() as Long));
            }

            continue;
          }

          break;
        case 7:
          if (tag === 57) {
            message.notIn!.push(longToNumber(reader.sfixed64() as Long));

            continue;
          }

          if (tag === 58) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(longToNumber(reader.sfixed64() as Long));
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SFixed64Rules {
    return {
      $type: SFixed64Rules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      lt: isSet(object.lt) ? globalThis.Number(object.lt) : undefined,
      lte: isSet(object.lte) ? globalThis.Number(object.lte) : undefined,
      gt: isSet(object.gt) ? globalThis.Number(object.gt) : undefined,
      gte: isSet(object.gte) ? globalThis.Number(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: SFixed64Rules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Math.round(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Math.round(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Math.round(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Math.round(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SFixed64Rules>, I>>(base?: I): SFixed64Rules {
    return SFixed64Rules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SFixed64Rules>, I>>(object: I): SFixed64Rules {
    const message = createBaseSFixed64Rules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(SFixed64Rules.$type, SFixed64Rules);

function createBaseBoolRules(): BoolRules {
  return { $type: "buf.validate.BoolRules", const: undefined };
}

export const BoolRules = {
  $type: "buf.validate.BoolRules" as const,

  encode(message: BoolRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).bool(message.const);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BoolRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBoolRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BoolRules {
    return { $type: BoolRules.$type, const: isSet(object.const) ? globalThis.Boolean(object.const) : undefined };
  },

  toJSON(message: BoolRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BoolRules>, I>>(base?: I): BoolRules {
    return BoolRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BoolRules>, I>>(object: I): BoolRules {
    const message = createBaseBoolRules();
    message.const = object.const ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(BoolRules.$type, BoolRules);

function createBaseStringRules(): StringRules {
  return {
    $type: "buf.validate.StringRules",
    const: undefined,
    len: undefined,
    minLen: undefined,
    maxLen: undefined,
    lenBytes: undefined,
    minBytes: undefined,
    maxBytes: undefined,
    pattern: undefined,
    prefix: undefined,
    suffix: undefined,
    contains: undefined,
    notContains: undefined,
    in: [],
    notIn: [],
    email: undefined,
    hostname: undefined,
    ip: undefined,
    ipv4: undefined,
    ipv6: undefined,
    uri: undefined,
    uriRef: undefined,
    address: undefined,
    uuid: undefined,
    tuuid: undefined,
    ipWithPrefixlen: undefined,
    ipv4WithPrefixlen: undefined,
    ipv6WithPrefixlen: undefined,
    ipPrefix: undefined,
    ipv4Prefix: undefined,
    ipv6Prefix: undefined,
    hostAndPort: undefined,
    wellKnownRegex: undefined,
    strict: undefined,
  };
}

export const StringRules = {
  $type: "buf.validate.StringRules" as const,

  encode(message: StringRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(10).string(message.const);
    }
    if (message.len !== undefined) {
      writer.uint32(152).uint64(message.len);
    }
    if (message.minLen !== undefined) {
      writer.uint32(16).uint64(message.minLen);
    }
    if (message.maxLen !== undefined) {
      writer.uint32(24).uint64(message.maxLen);
    }
    if (message.lenBytes !== undefined) {
      writer.uint32(160).uint64(message.lenBytes);
    }
    if (message.minBytes !== undefined) {
      writer.uint32(32).uint64(message.minBytes);
    }
    if (message.maxBytes !== undefined) {
      writer.uint32(40).uint64(message.maxBytes);
    }
    if (message.pattern !== undefined) {
      writer.uint32(50).string(message.pattern);
    }
    if (message.prefix !== undefined) {
      writer.uint32(58).string(message.prefix);
    }
    if (message.suffix !== undefined) {
      writer.uint32(66).string(message.suffix);
    }
    if (message.contains !== undefined) {
      writer.uint32(74).string(message.contains);
    }
    if (message.notContains !== undefined) {
      writer.uint32(186).string(message.notContains);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      for (const v of message.in) {
        writer.uint32(82).string(v!);
      }
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      for (const v of message.notIn) {
        writer.uint32(90).string(v!);
      }
    }
    if (message.email !== undefined) {
      writer.uint32(96).bool(message.email);
    }
    if (message.hostname !== undefined) {
      writer.uint32(104).bool(message.hostname);
    }
    if (message.ip !== undefined) {
      writer.uint32(112).bool(message.ip);
    }
    if (message.ipv4 !== undefined) {
      writer.uint32(120).bool(message.ipv4);
    }
    if (message.ipv6 !== undefined) {
      writer.uint32(128).bool(message.ipv6);
    }
    if (message.uri !== undefined) {
      writer.uint32(136).bool(message.uri);
    }
    if (message.uriRef !== undefined) {
      writer.uint32(144).bool(message.uriRef);
    }
    if (message.address !== undefined) {
      writer.uint32(168).bool(message.address);
    }
    if (message.uuid !== undefined) {
      writer.uint32(176).bool(message.uuid);
    }
    if (message.tuuid !== undefined) {
      writer.uint32(264).bool(message.tuuid);
    }
    if (message.ipWithPrefixlen !== undefined) {
      writer.uint32(208).bool(message.ipWithPrefixlen);
    }
    if (message.ipv4WithPrefixlen !== undefined) {
      writer.uint32(216).bool(message.ipv4WithPrefixlen);
    }
    if (message.ipv6WithPrefixlen !== undefined) {
      writer.uint32(224).bool(message.ipv6WithPrefixlen);
    }
    if (message.ipPrefix !== undefined) {
      writer.uint32(232).bool(message.ipPrefix);
    }
    if (message.ipv4Prefix !== undefined) {
      writer.uint32(240).bool(message.ipv4Prefix);
    }
    if (message.ipv6Prefix !== undefined) {
      writer.uint32(248).bool(message.ipv6Prefix);
    }
    if (message.hostAndPort !== undefined) {
      writer.uint32(256).bool(message.hostAndPort);
    }
    if (message.wellKnownRegex !== undefined) {
      writer.uint32(192).int32(message.wellKnownRegex);
    }
    if (message.strict !== undefined) {
      writer.uint32(200).bool(message.strict);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.const = reader.string();
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.len = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.minLen = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxLen = longToNumber(reader.uint64() as Long);
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }

          message.lenBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.minBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.maxBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.pattern = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.prefix = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.suffix = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.contains = reader.string();
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.notContains = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.in!.push(reader.string());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.notIn!.push(reader.string());
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.email = reader.bool();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.hostname = reader.bool();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.ip = reader.bool();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.ipv4 = reader.bool();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.ipv6 = reader.bool();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.uri = reader.bool();
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.uriRef = reader.bool();
          continue;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.address = reader.bool();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.uuid = reader.bool();
          continue;
        case 33:
          if (tag !== 264) {
            break;
          }

          message.tuuid = reader.bool();
          continue;
        case 26:
          if (tag !== 208) {
            break;
          }

          message.ipWithPrefixlen = reader.bool();
          continue;
        case 27:
          if (tag !== 216) {
            break;
          }

          message.ipv4WithPrefixlen = reader.bool();
          continue;
        case 28:
          if (tag !== 224) {
            break;
          }

          message.ipv6WithPrefixlen = reader.bool();
          continue;
        case 29:
          if (tag !== 232) {
            break;
          }

          message.ipPrefix = reader.bool();
          continue;
        case 30:
          if (tag !== 240) {
            break;
          }

          message.ipv4Prefix = reader.bool();
          continue;
        case 31:
          if (tag !== 248) {
            break;
          }

          message.ipv6Prefix = reader.bool();
          continue;
        case 32:
          if (tag !== 256) {
            break;
          }

          message.hostAndPort = reader.bool();
          continue;
        case 24:
          if (tag !== 192) {
            break;
          }

          message.wellKnownRegex = reader.int32() as any;
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.strict = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StringRules {
    return {
      $type: StringRules.$type,
      const: isSet(object.const) ? globalThis.String(object.const) : undefined,
      len: isSet(object.len) ? globalThis.Number(object.len) : undefined,
      minLen: isSet(object.minLen) ? globalThis.Number(object.minLen) : undefined,
      maxLen: isSet(object.maxLen) ? globalThis.Number(object.maxLen) : undefined,
      lenBytes: isSet(object.lenBytes) ? globalThis.Number(object.lenBytes) : undefined,
      minBytes: isSet(object.minBytes) ? globalThis.Number(object.minBytes) : undefined,
      maxBytes: isSet(object.maxBytes) ? globalThis.Number(object.maxBytes) : undefined,
      pattern: isSet(object.pattern) ? globalThis.String(object.pattern) : undefined,
      prefix: isSet(object.prefix) ? globalThis.String(object.prefix) : undefined,
      suffix: isSet(object.suffix) ? globalThis.String(object.suffix) : undefined,
      contains: isSet(object.contains) ? globalThis.String(object.contains) : undefined,
      notContains: isSet(object.notContains) ? globalThis.String(object.notContains) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.String(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.String(e)) : [],
      email: isSet(object.email) ? globalThis.Boolean(object.email) : undefined,
      hostname: isSet(object.hostname) ? globalThis.Boolean(object.hostname) : undefined,
      ip: isSet(object.ip) ? globalThis.Boolean(object.ip) : undefined,
      ipv4: isSet(object.ipv4) ? globalThis.Boolean(object.ipv4) : undefined,
      ipv6: isSet(object.ipv6) ? globalThis.Boolean(object.ipv6) : undefined,
      uri: isSet(object.uri) ? globalThis.Boolean(object.uri) : undefined,
      uriRef: isSet(object.uriRef) ? globalThis.Boolean(object.uriRef) : undefined,
      address: isSet(object.address) ? globalThis.Boolean(object.address) : undefined,
      uuid: isSet(object.uuid) ? globalThis.Boolean(object.uuid) : undefined,
      tuuid: isSet(object.tuuid) ? globalThis.Boolean(object.tuuid) : undefined,
      ipWithPrefixlen: isSet(object.ipWithPrefixlen) ? globalThis.Boolean(object.ipWithPrefixlen) : undefined,
      ipv4WithPrefixlen: isSet(object.ipv4WithPrefixlen) ? globalThis.Boolean(object.ipv4WithPrefixlen) : undefined,
      ipv6WithPrefixlen: isSet(object.ipv6WithPrefixlen) ? globalThis.Boolean(object.ipv6WithPrefixlen) : undefined,
      ipPrefix: isSet(object.ipPrefix) ? globalThis.Boolean(object.ipPrefix) : undefined,
      ipv4Prefix: isSet(object.ipv4Prefix) ? globalThis.Boolean(object.ipv4Prefix) : undefined,
      ipv6Prefix: isSet(object.ipv6Prefix) ? globalThis.Boolean(object.ipv6Prefix) : undefined,
      hostAndPort: isSet(object.hostAndPort) ? globalThis.Boolean(object.hostAndPort) : undefined,
      wellKnownRegex: isSet(object.wellKnownRegex) ? knownRegexFromJSON(object.wellKnownRegex) : undefined,
      strict: isSet(object.strict) ? globalThis.Boolean(object.strict) : undefined,
    };
  },

  toJSON(message: StringRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const;
    }
    if (message.len !== undefined) {
      obj.len = Math.round(message.len);
    }
    if (message.minLen !== undefined) {
      obj.minLen = Math.round(message.minLen);
    }
    if (message.maxLen !== undefined) {
      obj.maxLen = Math.round(message.maxLen);
    }
    if (message.lenBytes !== undefined) {
      obj.lenBytes = Math.round(message.lenBytes);
    }
    if (message.minBytes !== undefined) {
      obj.minBytes = Math.round(message.minBytes);
    }
    if (message.maxBytes !== undefined) {
      obj.maxBytes = Math.round(message.maxBytes);
    }
    if (message.pattern !== undefined) {
      obj.pattern = message.pattern;
    }
    if (message.prefix !== undefined) {
      obj.prefix = message.prefix;
    }
    if (message.suffix !== undefined) {
      obj.suffix = message.suffix;
    }
    if (message.contains !== undefined) {
      obj.contains = message.contains;
    }
    if (message.notContains !== undefined) {
      obj.notContains = message.notContains;
    }
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    if (message.email !== undefined) {
      obj.email = message.email;
    }
    if (message.hostname !== undefined) {
      obj.hostname = message.hostname;
    }
    if (message.ip !== undefined) {
      obj.ip = message.ip;
    }
    if (message.ipv4 !== undefined) {
      obj.ipv4 = message.ipv4;
    }
    if (message.ipv6 !== undefined) {
      obj.ipv6 = message.ipv6;
    }
    if (message.uri !== undefined) {
      obj.uri = message.uri;
    }
    if (message.uriRef !== undefined) {
      obj.uriRef = message.uriRef;
    }
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.uuid !== undefined) {
      obj.uuid = message.uuid;
    }
    if (message.tuuid !== undefined) {
      obj.tuuid = message.tuuid;
    }
    if (message.ipWithPrefixlen !== undefined) {
      obj.ipWithPrefixlen = message.ipWithPrefixlen;
    }
    if (message.ipv4WithPrefixlen !== undefined) {
      obj.ipv4WithPrefixlen = message.ipv4WithPrefixlen;
    }
    if (message.ipv6WithPrefixlen !== undefined) {
      obj.ipv6WithPrefixlen = message.ipv6WithPrefixlen;
    }
    if (message.ipPrefix !== undefined) {
      obj.ipPrefix = message.ipPrefix;
    }
    if (message.ipv4Prefix !== undefined) {
      obj.ipv4Prefix = message.ipv4Prefix;
    }
    if (message.ipv6Prefix !== undefined) {
      obj.ipv6Prefix = message.ipv6Prefix;
    }
    if (message.hostAndPort !== undefined) {
      obj.hostAndPort = message.hostAndPort;
    }
    if (message.wellKnownRegex !== undefined) {
      obj.wellKnownRegex = knownRegexToJSON(message.wellKnownRegex);
    }
    if (message.strict !== undefined) {
      obj.strict = message.strict;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StringRules>, I>>(base?: I): StringRules {
    return StringRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StringRules>, I>>(object: I): StringRules {
    const message = createBaseStringRules();
    message.const = object.const ?? undefined;
    message.len = object.len ?? undefined;
    message.minLen = object.minLen ?? undefined;
    message.maxLen = object.maxLen ?? undefined;
    message.lenBytes = object.lenBytes ?? undefined;
    message.minBytes = object.minBytes ?? undefined;
    message.maxBytes = object.maxBytes ?? undefined;
    message.pattern = object.pattern ?? undefined;
    message.prefix = object.prefix ?? undefined;
    message.suffix = object.suffix ?? undefined;
    message.contains = object.contains ?? undefined;
    message.notContains = object.notContains ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.email = object.email ?? undefined;
    message.hostname = object.hostname ?? undefined;
    message.ip = object.ip ?? undefined;
    message.ipv4 = object.ipv4 ?? undefined;
    message.ipv6 = object.ipv6 ?? undefined;
    message.uri = object.uri ?? undefined;
    message.uriRef = object.uriRef ?? undefined;
    message.address = object.address ?? undefined;
    message.uuid = object.uuid ?? undefined;
    message.tuuid = object.tuuid ?? undefined;
    message.ipWithPrefixlen = object.ipWithPrefixlen ?? undefined;
    message.ipv4WithPrefixlen = object.ipv4WithPrefixlen ?? undefined;
    message.ipv6WithPrefixlen = object.ipv6WithPrefixlen ?? undefined;
    message.ipPrefix = object.ipPrefix ?? undefined;
    message.ipv4Prefix = object.ipv4Prefix ?? undefined;
    message.ipv6Prefix = object.ipv6Prefix ?? undefined;
    message.hostAndPort = object.hostAndPort ?? undefined;
    message.wellKnownRegex = object.wellKnownRegex ?? undefined;
    message.strict = object.strict ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(StringRules.$type, StringRules);

function createBaseBytesRules(): BytesRules {
  return {
    $type: "buf.validate.BytesRules",
    const: undefined,
    len: undefined,
    minLen: undefined,
    maxLen: undefined,
    pattern: undefined,
    prefix: undefined,
    suffix: undefined,
    contains: undefined,
    in: [],
    notIn: [],
    ip: undefined,
    ipv4: undefined,
    ipv6: undefined,
  };
}

export const BytesRules = {
  $type: "buf.validate.BytesRules" as const,

  encode(message: BytesRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(10).bytes(message.const);
    }
    if (message.len !== undefined) {
      writer.uint32(104).uint64(message.len);
    }
    if (message.minLen !== undefined) {
      writer.uint32(16).uint64(message.minLen);
    }
    if (message.maxLen !== undefined) {
      writer.uint32(24).uint64(message.maxLen);
    }
    if (message.pattern !== undefined) {
      writer.uint32(34).string(message.pattern);
    }
    if (message.prefix !== undefined) {
      writer.uint32(42).bytes(message.prefix);
    }
    if (message.suffix !== undefined) {
      writer.uint32(50).bytes(message.suffix);
    }
    if (message.contains !== undefined) {
      writer.uint32(58).bytes(message.contains);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      for (const v of message.in) {
        writer.uint32(66).bytes(v!);
      }
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      for (const v of message.notIn) {
        writer.uint32(74).bytes(v!);
      }
    }
    if (message.ip !== undefined) {
      writer.uint32(80).bool(message.ip);
    }
    if (message.ipv4 !== undefined) {
      writer.uint32(88).bool(message.ipv4);
    }
    if (message.ipv6 !== undefined) {
      writer.uint32(96).bool(message.ipv6);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BytesRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBytesRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.const = reader.bytes();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.len = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.minLen = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxLen = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.pattern = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.prefix = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.suffix = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.contains = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.in!.push(reader.bytes());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.notIn!.push(reader.bytes());
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.ip = reader.bool();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.ipv4 = reader.bool();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.ipv6 = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BytesRules {
    return {
      $type: BytesRules.$type,
      const: isSet(object.const) ? bytesFromBase64(object.const) : undefined,
      len: isSet(object.len) ? globalThis.Number(object.len) : undefined,
      minLen: isSet(object.minLen) ? globalThis.Number(object.minLen) : undefined,
      maxLen: isSet(object.maxLen) ? globalThis.Number(object.maxLen) : undefined,
      pattern: isSet(object.pattern) ? globalThis.String(object.pattern) : undefined,
      prefix: isSet(object.prefix) ? bytesFromBase64(object.prefix) : undefined,
      suffix: isSet(object.suffix) ? bytesFromBase64(object.suffix) : undefined,
      contains: isSet(object.contains) ? bytesFromBase64(object.contains) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => bytesFromBase64(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => bytesFromBase64(e)) : [],
      ip: isSet(object.ip) ? globalThis.Boolean(object.ip) : undefined,
      ipv4: isSet(object.ipv4) ? globalThis.Boolean(object.ipv4) : undefined,
      ipv6: isSet(object.ipv6) ? globalThis.Boolean(object.ipv6) : undefined,
    };
  },

  toJSON(message: BytesRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = base64FromBytes(message.const);
    }
    if (message.len !== undefined) {
      obj.len = Math.round(message.len);
    }
    if (message.minLen !== undefined) {
      obj.minLen = Math.round(message.minLen);
    }
    if (message.maxLen !== undefined) {
      obj.maxLen = Math.round(message.maxLen);
    }
    if (message.pattern !== undefined) {
      obj.pattern = message.pattern;
    }
    if (message.prefix !== undefined) {
      obj.prefix = base64FromBytes(message.prefix);
    }
    if (message.suffix !== undefined) {
      obj.suffix = base64FromBytes(message.suffix);
    }
    if (message.contains !== undefined) {
      obj.contains = base64FromBytes(message.contains);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => base64FromBytes(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => base64FromBytes(e));
    }
    if (message.ip !== undefined) {
      obj.ip = message.ip;
    }
    if (message.ipv4 !== undefined) {
      obj.ipv4 = message.ipv4;
    }
    if (message.ipv6 !== undefined) {
      obj.ipv6 = message.ipv6;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BytesRules>, I>>(base?: I): BytesRules {
    return BytesRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BytesRules>, I>>(object: I): BytesRules {
    const message = createBaseBytesRules();
    message.const = object.const ?? undefined;
    message.len = object.len ?? undefined;
    message.minLen = object.minLen ?? undefined;
    message.maxLen = object.maxLen ?? undefined;
    message.pattern = object.pattern ?? undefined;
    message.prefix = object.prefix ?? undefined;
    message.suffix = object.suffix ?? undefined;
    message.contains = object.contains ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    message.ip = object.ip ?? undefined;
    message.ipv4 = object.ipv4 ?? undefined;
    message.ipv6 = object.ipv6 ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(BytesRules.$type, BytesRules);

function createBaseEnumRules(): EnumRules {
  return { $type: "buf.validate.EnumRules", const: undefined, definedOnly: undefined, in: [], notIn: [] };
}

export const EnumRules = {
  $type: "buf.validate.EnumRules" as const,

  encode(message: EnumRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      writer.uint32(8).int32(message.const);
    }
    if (message.definedOnly !== undefined) {
      writer.uint32(16).bool(message.definedOnly);
    }
    if (message.in !== undefined && message.in.length !== 0) {
      writer.uint32(26).fork();
      for (const v of message.in) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      writer.uint32(34).fork();
      for (const v of message.notIn) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnumRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnumRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.const = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.definedOnly = reader.bool();
          continue;
        case 3:
          if (tag === 24) {
            message.in!.push(reader.int32());

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.in!.push(reader.int32());
            }

            continue;
          }

          break;
        case 4:
          if (tag === 32) {
            message.notIn!.push(reader.int32());

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.notIn!.push(reader.int32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EnumRules {
    return {
      $type: EnumRules.$type,
      const: isSet(object.const) ? globalThis.Number(object.const) : undefined,
      definedOnly: isSet(object.definedOnly) ? globalThis.Boolean(object.definedOnly) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.Number(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: EnumRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Math.round(message.const);
    }
    if (message.definedOnly !== undefined) {
      obj.definedOnly = message.definedOnly;
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Math.round(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EnumRules>, I>>(base?: I): EnumRules {
    return EnumRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EnumRules>, I>>(object: I): EnumRules {
    const message = createBaseEnumRules();
    message.const = object.const ?? undefined;
    message.definedOnly = object.definedOnly ?? undefined;
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(EnumRules.$type, EnumRules);

function createBaseRepeatedRules(): RepeatedRules {
  return {
    $type: "buf.validate.RepeatedRules",
    minItems: undefined,
    maxItems: undefined,
    unique: undefined,
    items: undefined,
  };
}

export const RepeatedRules = {
  $type: "buf.validate.RepeatedRules" as const,

  encode(message: RepeatedRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.minItems !== undefined) {
      writer.uint32(8).uint64(message.minItems);
    }
    if (message.maxItems !== undefined) {
      writer.uint32(16).uint64(message.maxItems);
    }
    if (message.unique !== undefined) {
      writer.uint32(24).bool(message.unique);
    }
    if (message.items !== undefined) {
      FieldConstraints.encode(message.items, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RepeatedRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepeatedRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.minItems = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxItems = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.unique = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.items = FieldConstraints.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RepeatedRules {
    return {
      $type: RepeatedRules.$type,
      minItems: isSet(object.minItems) ? globalThis.Number(object.minItems) : undefined,
      maxItems: isSet(object.maxItems) ? globalThis.Number(object.maxItems) : undefined,
      unique: isSet(object.unique) ? globalThis.Boolean(object.unique) : undefined,
      items: isSet(object.items) ? FieldConstraints.fromJSON(object.items) : undefined,
    };
  },

  toJSON(message: RepeatedRules): unknown {
    const obj: any = {};
    if (message.minItems !== undefined) {
      obj.minItems = Math.round(message.minItems);
    }
    if (message.maxItems !== undefined) {
      obj.maxItems = Math.round(message.maxItems);
    }
    if (message.unique !== undefined) {
      obj.unique = message.unique;
    }
    if (message.items !== undefined) {
      obj.items = FieldConstraints.toJSON(message.items);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RepeatedRules>, I>>(base?: I): RepeatedRules {
    return RepeatedRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RepeatedRules>, I>>(object: I): RepeatedRules {
    const message = createBaseRepeatedRules();
    message.minItems = object.minItems ?? undefined;
    message.maxItems = object.maxItems ?? undefined;
    message.unique = object.unique ?? undefined;
    message.items = (object.items !== undefined && object.items !== null)
      ? FieldConstraints.fromPartial(object.items)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(RepeatedRules.$type, RepeatedRules);

function createBaseMapRules(): MapRules {
  return {
    $type: "buf.validate.MapRules",
    minPairs: undefined,
    maxPairs: undefined,
    keys: undefined,
    values: undefined,
  };
}

export const MapRules = {
  $type: "buf.validate.MapRules" as const,

  encode(message: MapRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.minPairs !== undefined) {
      writer.uint32(8).uint64(message.minPairs);
    }
    if (message.maxPairs !== undefined) {
      writer.uint32(16).uint64(message.maxPairs);
    }
    if (message.keys !== undefined) {
      FieldConstraints.encode(message.keys, writer.uint32(34).fork()).ldelim();
    }
    if (message.values !== undefined) {
      FieldConstraints.encode(message.values, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MapRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMapRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.minPairs = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxPairs = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.keys = FieldConstraints.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.values = FieldConstraints.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MapRules {
    return {
      $type: MapRules.$type,
      minPairs: isSet(object.minPairs) ? globalThis.Number(object.minPairs) : undefined,
      maxPairs: isSet(object.maxPairs) ? globalThis.Number(object.maxPairs) : undefined,
      keys: isSet(object.keys) ? FieldConstraints.fromJSON(object.keys) : undefined,
      values: isSet(object.values) ? FieldConstraints.fromJSON(object.values) : undefined,
    };
  },

  toJSON(message: MapRules): unknown {
    const obj: any = {};
    if (message.minPairs !== undefined) {
      obj.minPairs = Math.round(message.minPairs);
    }
    if (message.maxPairs !== undefined) {
      obj.maxPairs = Math.round(message.maxPairs);
    }
    if (message.keys !== undefined) {
      obj.keys = FieldConstraints.toJSON(message.keys);
    }
    if (message.values !== undefined) {
      obj.values = FieldConstraints.toJSON(message.values);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MapRules>, I>>(base?: I): MapRules {
    return MapRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MapRules>, I>>(object: I): MapRules {
    const message = createBaseMapRules();
    message.minPairs = object.minPairs ?? undefined;
    message.maxPairs = object.maxPairs ?? undefined;
    message.keys = (object.keys !== undefined && object.keys !== null)
      ? FieldConstraints.fromPartial(object.keys)
      : undefined;
    message.values = (object.values !== undefined && object.values !== null)
      ? FieldConstraints.fromPartial(object.values)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(MapRules.$type, MapRules);

function createBaseAnyRules(): AnyRules {
  return { $type: "buf.validate.AnyRules", in: [], notIn: [] };
}

export const AnyRules = {
  $type: "buf.validate.AnyRules" as const,

  encode(message: AnyRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.in !== undefined && message.in.length !== 0) {
      for (const v of message.in) {
        writer.uint32(18).string(v!);
      }
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      for (const v of message.notIn) {
        writer.uint32(26).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnyRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnyRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.in!.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.notIn!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AnyRules {
    return {
      $type: AnyRules.$type,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => globalThis.String(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: AnyRules): unknown {
    const obj: any = {};
    if (message.in?.length) {
      obj.in = message.in;
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AnyRules>, I>>(base?: I): AnyRules {
    return AnyRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AnyRules>, I>>(object: I): AnyRules {
    const message = createBaseAnyRules();
    message.in = object.in?.map((e) => e) || [];
    message.notIn = object.notIn?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(AnyRules.$type, AnyRules);

function createBaseDurationRules(): DurationRules {
  return {
    $type: "buf.validate.DurationRules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    gt: undefined,
    gte: undefined,
    in: [],
    notIn: [],
  };
}

export const DurationRules = {
  $type: "buf.validate.DurationRules" as const,

  encode(message: DurationRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      Duration.encode(message.const, writer.uint32(18).fork()).ldelim();
    }
    if (message.lt !== undefined) {
      Duration.encode(message.lt, writer.uint32(26).fork()).ldelim();
    }
    if (message.lte !== undefined) {
      Duration.encode(message.lte, writer.uint32(34).fork()).ldelim();
    }
    if (message.gt !== undefined) {
      Duration.encode(message.gt, writer.uint32(42).fork()).ldelim();
    }
    if (message.gte !== undefined) {
      Duration.encode(message.gte, writer.uint32(50).fork()).ldelim();
    }
    if (message.in !== undefined && message.in.length !== 0) {
      for (const v of message.in) {
        Duration.encode(v!, writer.uint32(58).fork()).ldelim();
      }
    }
    if (message.notIn !== undefined && message.notIn.length !== 0) {
      for (const v of message.notIn) {
        Duration.encode(v!, writer.uint32(66).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DurationRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDurationRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.const = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lt = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lte = Duration.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.gt = Duration.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.gte = Duration.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.in!.push(Duration.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.notIn!.push(Duration.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DurationRules {
    return {
      $type: DurationRules.$type,
      const: isSet(object.const) ? Duration.fromJSON(object.const) : undefined,
      lt: isSet(object.lt) ? Duration.fromJSON(object.lt) : undefined,
      lte: isSet(object.lte) ? Duration.fromJSON(object.lte) : undefined,
      gt: isSet(object.gt) ? Duration.fromJSON(object.gt) : undefined,
      gte: isSet(object.gte) ? Duration.fromJSON(object.gte) : undefined,
      in: globalThis.Array.isArray(object?.in) ? object.in.map((e: any) => Duration.fromJSON(e)) : [],
      notIn: globalThis.Array.isArray(object?.notIn) ? object.notIn.map((e: any) => Duration.fromJSON(e)) : [],
    };
  },

  toJSON(message: DurationRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = Duration.toJSON(message.const);
    }
    if (message.lt !== undefined) {
      obj.lt = Duration.toJSON(message.lt);
    }
    if (message.lte !== undefined) {
      obj.lte = Duration.toJSON(message.lte);
    }
    if (message.gt !== undefined) {
      obj.gt = Duration.toJSON(message.gt);
    }
    if (message.gte !== undefined) {
      obj.gte = Duration.toJSON(message.gte);
    }
    if (message.in?.length) {
      obj.in = message.in.map((e) => Duration.toJSON(e));
    }
    if (message.notIn?.length) {
      obj.notIn = message.notIn.map((e) => Duration.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DurationRules>, I>>(base?: I): DurationRules {
    return DurationRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DurationRules>, I>>(object: I): DurationRules {
    const message = createBaseDurationRules();
    message.const = (object.const !== undefined && object.const !== null)
      ? Duration.fromPartial(object.const)
      : undefined;
    message.lt = (object.lt !== undefined && object.lt !== null) ? Duration.fromPartial(object.lt) : undefined;
    message.lte = (object.lte !== undefined && object.lte !== null) ? Duration.fromPartial(object.lte) : undefined;
    message.gt = (object.gt !== undefined && object.gt !== null) ? Duration.fromPartial(object.gt) : undefined;
    message.gte = (object.gte !== undefined && object.gte !== null) ? Duration.fromPartial(object.gte) : undefined;
    message.in = object.in?.map((e) => Duration.fromPartial(e)) || [];
    message.notIn = object.notIn?.map((e) => Duration.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(DurationRules.$type, DurationRules);

function createBaseTimestampRules(): TimestampRules {
  return {
    $type: "buf.validate.TimestampRules",
    const: undefined,
    lt: undefined,
    lte: undefined,
    ltNow: undefined,
    gt: undefined,
    gte: undefined,
    gtNow: undefined,
    within: undefined,
  };
}

export const TimestampRules = {
  $type: "buf.validate.TimestampRules" as const,

  encode(message: TimestampRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.const !== undefined) {
      Timestamp.encode(toTimestamp(message.const), writer.uint32(18).fork()).ldelim();
    }
    if (message.lt !== undefined) {
      Timestamp.encode(toTimestamp(message.lt), writer.uint32(26).fork()).ldelim();
    }
    if (message.lte !== undefined) {
      Timestamp.encode(toTimestamp(message.lte), writer.uint32(34).fork()).ldelim();
    }
    if (message.ltNow !== undefined) {
      writer.uint32(56).bool(message.ltNow);
    }
    if (message.gt !== undefined) {
      Timestamp.encode(toTimestamp(message.gt), writer.uint32(42).fork()).ldelim();
    }
    if (message.gte !== undefined) {
      Timestamp.encode(toTimestamp(message.gte), writer.uint32(50).fork()).ldelim();
    }
    if (message.gtNow !== undefined) {
      writer.uint32(64).bool(message.gtNow);
    }
    if (message.within !== undefined) {
      Duration.encode(message.within, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimestampRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimestampRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.const = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lte = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.ltNow = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.gt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.gte = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.gtNow = reader.bool();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.within = Duration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TimestampRules {
    return {
      $type: TimestampRules.$type,
      const: isSet(object.const) ? fromJsonTimestamp(object.const) : undefined,
      lt: isSet(object.lt) ? fromJsonTimestamp(object.lt) : undefined,
      lte: isSet(object.lte) ? fromJsonTimestamp(object.lte) : undefined,
      ltNow: isSet(object.ltNow) ? globalThis.Boolean(object.ltNow) : undefined,
      gt: isSet(object.gt) ? fromJsonTimestamp(object.gt) : undefined,
      gte: isSet(object.gte) ? fromJsonTimestamp(object.gte) : undefined,
      gtNow: isSet(object.gtNow) ? globalThis.Boolean(object.gtNow) : undefined,
      within: isSet(object.within) ? Duration.fromJSON(object.within) : undefined,
    };
  },

  toJSON(message: TimestampRules): unknown {
    const obj: any = {};
    if (message.const !== undefined) {
      obj.const = message.const.toISOString();
    }
    if (message.lt !== undefined) {
      obj.lt = message.lt.toISOString();
    }
    if (message.lte !== undefined) {
      obj.lte = message.lte.toISOString();
    }
    if (message.ltNow !== undefined) {
      obj.ltNow = message.ltNow;
    }
    if (message.gt !== undefined) {
      obj.gt = message.gt.toISOString();
    }
    if (message.gte !== undefined) {
      obj.gte = message.gte.toISOString();
    }
    if (message.gtNow !== undefined) {
      obj.gtNow = message.gtNow;
    }
    if (message.within !== undefined) {
      obj.within = Duration.toJSON(message.within);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TimestampRules>, I>>(base?: I): TimestampRules {
    return TimestampRules.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TimestampRules>, I>>(object: I): TimestampRules {
    const message = createBaseTimestampRules();
    message.const = object.const ?? undefined;
    message.lt = object.lt ?? undefined;
    message.lte = object.lte ?? undefined;
    message.ltNow = object.ltNow ?? undefined;
    message.gt = object.gt ?? undefined;
    message.gte = object.gte ?? undefined;
    message.gtNow = object.gtNow ?? undefined;
    message.within = (object.within !== undefined && object.within !== null)
      ? Duration.fromPartial(object.within)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(TimestampRules.$type, TimestampRules);

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
