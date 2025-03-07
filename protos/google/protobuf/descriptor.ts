/* eslint-disable */
import { messageTypeRegistry } from '../../typeRegistry';
import _m0 from 'protobufjs/minimal';
import Long from 'long';

export const protobufPackage = 'google.protobuf';

/** The full set of known editions. */
export enum Edition {
/** UNKNOWN - A placeholder for an unknown edition value. */
UNKNOWN = 0,
/**
 * LEGACY - A placeholder edition for specifying default behaviors *before* a feature
 * was first introduced.  This is effectively an "infinite past".
 */
LEGACY = 900,
/**
 * PROTO2 - Legacy syntax "editions".  These pre-date editions, but behave much like
 * distinct editions.  These can't be used to specify the edition of proto
 * files, but feature definitions must supply proto2/proto3 defaults for
 * backwards compatibility.
 */
PROTO2 = 998,
PROTO3 = 999,
/**
 * 2023 - Editions that have been released.  The specific values are arbitrary and
 * should not be depended on, but they will always be time-ordered for easy
 * comparison.
 */
2023 = 1000,
2024 = 1001,
/**
 * 1_TEST_ONLY - Placeholder editions for testing feature resolution.  These should not be
 * used or relyed on outside of tests.
 */
1_TEST_ONLY = 1,
2_TEST_ONLY = 2,
99997_TEST_ONLY = 99997,
99998_TEST_ONLY = 99998,
99999_TEST_ONLY = 99999,
/**
 * MAX - Placeholder for specifying unbounded edition support.  This should only
 * ever be used by plugins that can expect to never require any changes to
 * support a new edition.
 */
MAX = 2147483647,
UNRECOGNIZED = -1,
}

export function editionFromJSON(object: any): Edition {
switch (object) {
case 0:
      case "EDITION_UNKNOWN":
        return Edition.UNKNOWN;
case 900:
      case "EDITION_LEGACY":
        return Edition.LEGACY;
case 998:
      case "EDITION_PROTO2":
        return Edition.PROTO2;
case 999:
      case "EDITION_PROTO3":
        return Edition.PROTO3;
case 1000:
      case "EDITION_2023":
        return Edition.2023;
case 1001:
      case "EDITION_2024":
        return Edition.2024;
case 1:
      case "EDITION_1_TEST_ONLY":
        return Edition.1_TEST_ONLY;
case 2:
      case "EDITION_2_TEST_ONLY":
        return Edition.2_TEST_ONLY;
case 99997:
      case "EDITION_99997_TEST_ONLY":
        return Edition.99997_TEST_ONLY;
case 99998:
      case "EDITION_99998_TEST_ONLY":
        return Edition.99998_TEST_ONLY;
case 99999:
      case "EDITION_99999_TEST_ONLY":
        return Edition.99999_TEST_ONLY;
case 2147483647:
      case "EDITION_MAX":
        return Edition.MAX;
case -1:
        case "UNRECOGNIZED":
        default:
          return Edition.UNRECOGNIZED;
}
}

export function editionToJSON(object: Edition): string {
switch (object) {
case Edition.UNKNOWN: return "EDITION_UNKNOWN";
case Edition.LEGACY: return "EDITION_LEGACY";
case Edition.PROTO2: return "EDITION_PROTO2";
case Edition.PROTO3: return "EDITION_PROTO3";
case Edition.2023: return "EDITION_2023";
case Edition.2024: return "EDITION_2024";
case Edition.1_TEST_ONLY: return "EDITION_1_TEST_ONLY";
case Edition.2_TEST_ONLY: return "EDITION_2_TEST_ONLY";
case Edition.99997_TEST_ONLY: return "EDITION_99997_TEST_ONLY";
case Edition.99998_TEST_ONLY: return "EDITION_99998_TEST_ONLY";
case Edition.99999_TEST_ONLY: return "EDITION_99999_TEST_ONLY";
case Edition.MAX: return "EDITION_MAX";
case Edition.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

/**
 * The protocol compiler can output a FileDescriptorSet containing the .proto
 * files it parses.
 */
export interface FileDescriptorSet {
$type?: 'google.protobuf.FileDescriptorSet',
file?: FileDescriptorProto[] | undefined,
}

/** Describes a complete .proto file. */
export interface FileDescriptorProto {
$type?: 'google.protobuf.FileDescriptorProto',
/** file name, relative to root of source tree */
name?: string | undefined,
/** e.g. "foo", "foo.bar", etc. */
package?: string | undefined,
/** Names of files imported by this file. */
dependency?: string[] | undefined,
/** Indexes of the public imported files in the dependency list above. */
publicDependency?: number[] | undefined,
/**
 * Indexes of the weak imported files in the dependency list.
 * For Google-internal migration only. Do not use.
 */
weakDependency?: number[] | undefined,
/** All top-level definitions in this file. */
messageType?: DescriptorProto[] | undefined,
enumType?: EnumDescriptorProto[] | undefined,
service?: ServiceDescriptorProto[] | undefined,
extension?: FieldDescriptorProto[] | undefined,
options?: FileOptions | undefined,
/**
 * This field contains optional information about the original source code.
 * You may safely remove this entire field without harming runtime
 * functionality of the descriptors -- the information is needed only by
 * development tools.
 */
sourceCodeInfo?: SourceCodeInfo | undefined,
/**
 * The syntax of the proto file.
 * The supported values are "proto2", "proto3", and "editions".
 * 
 * If `edition` is present, this value must be "editions".
 */
syntax?: string | undefined,
/** The edition of the proto file. */
edition?: Edition | undefined,
}

/** Describes a message type. */
export interface DescriptorProto {
$type?: 'google.protobuf.DescriptorProto',
name?: string | undefined,
field?: FieldDescriptorProto[] | undefined,
extension?: FieldDescriptorProto[] | undefined,
nestedType?: DescriptorProto[] | undefined,
enumType?: EnumDescriptorProto[] | undefined,
extensionRange?: DescriptorProtoExtensionRange[] | undefined,
oneofDecl?: OneofDescriptorProto[] | undefined,
options?: MessageOptions | undefined,
reservedRange?: DescriptorProtoReservedRange[] | undefined,
/**
 * Reserved field names, which may not be used by fields in the same message.
 * A given name may only be reserved once.
 */
reservedName?: string[] | undefined,
}

export interface DescriptorProtoExtensionRange {
$type?: 'google.protobuf.DescriptorProto.ExtensionRange',
/** Inclusive. */
start?: number | undefined,
/** Exclusive. */
end?: number | undefined,
options?: ExtensionRangeOptions | undefined,
}

/**
 * Range of reserved tag numbers. Reserved tag numbers may not be used by
 * fields or extension ranges in the same message. Reserved ranges may
 * not overlap.
 */
export interface DescriptorProtoReservedRange {
$type?: 'google.protobuf.DescriptorProto.ReservedRange',
/** Inclusive. */
start?: number | undefined,
/** Exclusive. */
end?: number | undefined,
}

export interface ExtensionRangeOptions {
$type?: 'google.protobuf.ExtensionRangeOptions',
/** The parser stores options it doesn't recognize here. See above. */
uninterpretedOption?: UninterpretedOption[] | undefined,
/**
 * For external users: DO NOT USE. We are in the process of open sourcing
 * extension declaration and executing internal cleanups before it can be
 * used externally.
 */
declaration?: ExtensionRangeOptionsDeclaration[] | undefined,
/** Any features defined in the specific edition. */
features?: FeatureSet | undefined,
/**
 * The verification state of the range.
 * TODO: flip the default to DECLARATION once all empty ranges
 * are marked as UNVERIFIED.
 */
verification?: ExtensionRangeOptionsVerificationState | undefined,
}

/** The verification state of the extension range. */
export enum ExtensionRangeOptionsVerificationState {
/** DECLARATION - All the extensions of the range must be declared. */
DECLARATION = 0,
UNVERIFIED = 1,
UNRECOGNIZED = -1,
}

export function extensionRangeOptionsVerificationStateFromJSON(object: any): ExtensionRangeOptionsVerificationState {
switch (object) {
case 0:
      case "DECLARATION":
        return ExtensionRangeOptionsVerificationState.DECLARATION;
case 1:
      case "UNVERIFIED":
        return ExtensionRangeOptionsVerificationState.UNVERIFIED;
case -1:
        case "UNRECOGNIZED":
        default:
          return ExtensionRangeOptionsVerificationState.UNRECOGNIZED;
}
}

export function extensionRangeOptionsVerificationStateToJSON(object: ExtensionRangeOptionsVerificationState): string {
switch (object) {
case ExtensionRangeOptionsVerificationState.DECLARATION: return "DECLARATION";
case ExtensionRangeOptionsVerificationState.UNVERIFIED: return "UNVERIFIED";
case ExtensionRangeOptionsVerificationState.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

export interface ExtensionRangeOptionsDeclaration {
$type?: 'google.protobuf.ExtensionRangeOptions.Declaration',
/** The extension number declared within the extension range. */
number?: number | undefined,
/**
 * The fully-qualified name of the extension field. There must be a leading
 * dot in front of the full name.
 */
fullName?: string | undefined,
/**
 * The fully-qualified type name of the extension field. Unlike
 * Metadata.type, Declaration.type must have a leading dot for messages
 * and enums.
 */
type?: string | undefined,
/**
 * If true, indicates that the number is reserved in the extension range,
 * and any extension field with the number will fail to compile. Set this
 * when a declared extension field is deleted.
 */
reserved?: boolean | undefined,
/**
 * If true, indicates that the extension must be defined as repeated.
 * Otherwise the extension must be defined as optional.
 */
repeated?: boolean | undefined,
}

/** Describes a field within a message. */
export interface FieldDescriptorProto {
$type?: 'google.protobuf.FieldDescriptorProto',
name?: string | undefined,
number?: number | undefined,
label?: FieldDescriptorProtoLabel | undefined,
/**
 * If type_name is set, this need not be set.  If both this and type_name
 * are set, this must be one of TYPE_ENUM, TYPE_MESSAGE or TYPE_GROUP.
 */
type?: FieldDescriptorProtoType | undefined,
/**
 * For message and enum types, this is the name of the type.  If the name
 * starts with a '.', it is fully-qualified.  Otherwise, C++-like scoping
 * rules are used to find the type (i.e. first the nested types within this
 * message are searched, then within the parent, on up to the root
 * namespace).
 */
typeName?: string | undefined,
/**
 * For extensions, this is the name of the type being extended.  It is
 * resolved in the same manner as type_name.
 */
extendee?: string | undefined,
/**
 * For numeric types, contains the original text representation of the value.
 * For booleans, "true" or "false".
 * For strings, contains the default text contents (not escaped in any way).
 * For bytes, contains the C escaped value.  All bytes >= 128 are escaped.
 */
defaultValue?: string | undefined,
/**
 * If set, gives the index of a oneof in the containing type's oneof_decl
 * list.  This field is a member of that oneof.
 */
oneofIndex?: number | undefined,
/**
 * JSON name of this field. The value is set by protocol compiler. If the
 * user has set a "json_name" option on this field, that option's value
 * will be used. Otherwise, it's deduced from the field's name by converting
 * it to camelCase.
 */
jsonName?: string | undefined,
options?: FieldOptions | undefined,
/**
 * If true, this is a proto3 "optional". When a proto3 field is optional, it
 * tracks presence regardless of field type.
 * 
 * When proto3_optional is true, this field must belong to a oneof to signal
 * to old proto3 clients that presence is tracked for this field. This oneof
 * is known as a "synthetic" oneof, and this field must be its sole member
 * (each proto3 optional field gets its own synthetic oneof). Synthetic oneofs
 * exist in the descriptor only, and do not generate any API. Synthetic oneofs
 * must be ordered after all "real" oneofs.
 * 
 * For message fields, proto3_optional doesn't create any semantic change,
 * since non-repeated message fields always track presence. However it still
 * indicates the semantic detail of whether the user wrote "optional" or not.
 * This can be useful for round-tripping the .proto file. For consistency we
 * give message fields a synthetic oneof also, even though it is not required
 * to track presence. This is especially important because the parser can't
 * tell if a field is a message or an enum, so it must always create a
 * synthetic oneof.
 * 
 * Proto2 optional fields do not set this flag, because they already indicate
 * optional with `LABEL_OPTIONAL`.
 */
proto3Optional?: boolean | undefined,
}

export enum FieldDescriptorProtoType {
/**
 * DOUBLE - 0 is reserved for errors.
 * Order is weird for historical reasons.
 */
DOUBLE = 1,
FLOAT = 2,
/**
 * INT64 - Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
 * negative values are likely.
 */
INT64 = 3,
UINT64 = 4,
/**
 * INT32 - Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
 * negative values are likely.
 */
INT32 = 5,
FIXED64 = 6,
FIXED32 = 7,
BOOL = 8,
STRING = 9,
/**
 * GROUP - Tag-delimited aggregate.
 * Group type is deprecated and not supported after google.protobuf. However, Proto3
 * implementations should still be able to parse the group wire format and
 * treat group fields as unknown fields.  In Editions, the group wire format
 * can be enabled via the `message_encoding` feature.
 */
GROUP = 10,
/** MESSAGE - Length-delimited aggregate. */
MESSAGE = 11,
/** BYTES - New in version 2. */
BYTES = 12,
UINT32 = 13,
ENUM = 14,
SFIXED32 = 15,
SFIXED64 = 16,
/** SINT32 - Uses ZigZag encoding. */
SINT32 = 17,
/** SINT64 - Uses ZigZag encoding. */
SINT64 = 18,
UNRECOGNIZED = -1,
}

export function fieldDescriptorProtoTypeFromJSON(object: any): FieldDescriptorProtoType {
switch (object) {
case 1:
      case "TYPE_DOUBLE":
        return FieldDescriptorProtoType.DOUBLE;
case 2:
      case "TYPE_FLOAT":
        return FieldDescriptorProtoType.FLOAT;
case 3:
      case "TYPE_INT64":
        return FieldDescriptorProtoType.INT64;
case 4:
      case "TYPE_UINT64":
        return FieldDescriptorProtoType.UINT64;
case 5:
      case "TYPE_INT32":
        return FieldDescriptorProtoType.INT32;
case 6:
      case "TYPE_FIXED64":
        return FieldDescriptorProtoType.FIXED64;
case 7:
      case "TYPE_FIXED32":
        return FieldDescriptorProtoType.FIXED32;
case 8:
      case "TYPE_BOOL":
        return FieldDescriptorProtoType.BOOL;
case 9:
      case "TYPE_STRING":
        return FieldDescriptorProtoType.STRING;
case 10:
      case "TYPE_GROUP":
        return FieldDescriptorProtoType.GROUP;
case 11:
      case "TYPE_MESSAGE":
        return FieldDescriptorProtoType.MESSAGE;
case 12:
      case "TYPE_BYTES":
        return FieldDescriptorProtoType.BYTES;
case 13:
      case "TYPE_UINT32":
        return FieldDescriptorProtoType.UINT32;
case 14:
      case "TYPE_ENUM":
        return FieldDescriptorProtoType.ENUM;
case 15:
      case "TYPE_SFIXED32":
        return FieldDescriptorProtoType.SFIXED32;
case 16:
      case "TYPE_SFIXED64":
        return FieldDescriptorProtoType.SFIXED64;
case 17:
      case "TYPE_SINT32":
        return FieldDescriptorProtoType.SINT32;
case 18:
      case "TYPE_SINT64":
        return FieldDescriptorProtoType.SINT64;
case -1:
        case "UNRECOGNIZED":
        default:
          return FieldDescriptorProtoType.UNRECOGNIZED;
}
}

export function fieldDescriptorProtoTypeToJSON(object: FieldDescriptorProtoType): string {
switch (object) {
case FieldDescriptorProtoType.DOUBLE: return "TYPE_DOUBLE";
case FieldDescriptorProtoType.FLOAT: return "TYPE_FLOAT";
case FieldDescriptorProtoType.INT64: return "TYPE_INT64";
case FieldDescriptorProtoType.UINT64: return "TYPE_UINT64";
case FieldDescriptorProtoType.INT32: return "TYPE_INT32";
case FieldDescriptorProtoType.FIXED64: return "TYPE_FIXED64";
case FieldDescriptorProtoType.FIXED32: return "TYPE_FIXED32";
case FieldDescriptorProtoType.BOOL: return "TYPE_BOOL";
case FieldDescriptorProtoType.STRING: return "TYPE_STRING";
case FieldDescriptorProtoType.GROUP: return "TYPE_GROUP";
case FieldDescriptorProtoType.MESSAGE: return "TYPE_MESSAGE";
case FieldDescriptorProtoType.BYTES: return "TYPE_BYTES";
case FieldDescriptorProtoType.UINT32: return "TYPE_UINT32";
case FieldDescriptorProtoType.ENUM: return "TYPE_ENUM";
case FieldDescriptorProtoType.SFIXED32: return "TYPE_SFIXED32";
case FieldDescriptorProtoType.SFIXED64: return "TYPE_SFIXED64";
case FieldDescriptorProtoType.SINT32: return "TYPE_SINT32";
case FieldDescriptorProtoType.SINT64: return "TYPE_SINT64";
case FieldDescriptorProtoType.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

export enum FieldDescriptorProtoLabel {
/** OPTIONAL - 0 is reserved for errors */
OPTIONAL = 1,
REPEATED = 3,
/**
 * REQUIRED - The required label is only allowed in google.protobuf.  In proto3 and Editions
 * it's explicitly prohibited.  In Editions, the `field_presence` feature
 * can be used to get this behavior.
 */
REQUIRED = 2,
UNRECOGNIZED = -1,
}

export function fieldDescriptorProtoLabelFromJSON(object: any): FieldDescriptorProtoLabel {
switch (object) {
case 1:
      case "LABEL_OPTIONAL":
        return FieldDescriptorProtoLabel.OPTIONAL;
case 3:
      case "LABEL_REPEATED":
        return FieldDescriptorProtoLabel.REPEATED;
case 2:
      case "LABEL_REQUIRED":
        return FieldDescriptorProtoLabel.REQUIRED;
case -1:
        case "UNRECOGNIZED":
        default:
          return FieldDescriptorProtoLabel.UNRECOGNIZED;
}
}

export function fieldDescriptorProtoLabelToJSON(object: FieldDescriptorProtoLabel): string {
switch (object) {
case FieldDescriptorProtoLabel.OPTIONAL: return "LABEL_OPTIONAL";
case FieldDescriptorProtoLabel.REPEATED: return "LABEL_REPEATED";
case FieldDescriptorProtoLabel.REQUIRED: return "LABEL_REQUIRED";
case FieldDescriptorProtoLabel.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

/** Describes a oneof. */
export interface OneofDescriptorProto {
$type?: 'google.protobuf.OneofDescriptorProto',
name?: string | undefined,
options?: OneofOptions | undefined,
}

/** Describes an enum type. */
export interface EnumDescriptorProto {
$type?: 'google.protobuf.EnumDescriptorProto',
name?: string | undefined,
value?: EnumValueDescriptorProto[] | undefined,
options?: EnumOptions | undefined,
/**
 * Range of reserved numeric values. Reserved numeric values may not be used
 * by enum values in the same enum declaration. Reserved ranges may not
 * overlap.
 */
reservedRange?: EnumDescriptorProtoEnumReservedRange[] | undefined,
/**
 * Reserved enum value names, which may not be reused. A given name may only
 * be reserved once.
 */
reservedName?: string[] | undefined,
}

/**
 * Range of reserved numeric values. Reserved values may not be used by
 * entries in the same enum. Reserved ranges may not overlap.
 * 
 * Note that this is distinct from DescriptorProto.ReservedRange in that it
 * is inclusive such that it can appropriately represent the entire int32
 * domain.
 */
export interface EnumDescriptorProtoEnumReservedRange {
$type?: 'google.protobuf.EnumDescriptorProto.EnumReservedRange',
/** Inclusive. */
start?: number | undefined,
/** Inclusive. */
end?: number | undefined,
}

/** Describes a value within an enum. */
export interface EnumValueDescriptorProto {
$type?: 'google.protobuf.EnumValueDescriptorProto',
name?: string | undefined,
number?: number | undefined,
options?: EnumValueOptions | undefined,
}

/** Describes a service. */
export interface ServiceDescriptorProto {
$type?: 'google.protobuf.ServiceDescriptorProto',
name?: string | undefined,
method?: MethodDescriptorProto[] | undefined,
options?: ServiceOptions | undefined,
}

/** Describes a method of a service. */
export interface MethodDescriptorProto {
$type?: 'google.protobuf.MethodDescriptorProto',
name?: string | undefined,
/**
 * Input and output type names.  These are resolved in the same way as
 * FieldDescriptorProto.type_name, but must refer to a message type.
 */
inputType?: string | undefined,
outputType?: string | undefined,
options?: MethodOptions | undefined,
/** Identifies if client streams multiple client messages */
clientStreaming?: boolean | undefined,
/** Identifies if server streams multiple server messages */
serverStreaming?: boolean | undefined,
}

export interface FileOptions {
$type?: 'google.protobuf.FileOptions',
/**
 * Sets the Java package where classes generated from this .proto will be
 * placed.  By default, the proto package is used, but this is often
 * inappropriate because proto packages do not normally start with backwards
 * domain names.
 */
javaPackage?: string | undefined,
/**
 * Controls the name of the wrapper Java class generated for the .proto file.
 * That class will always contain the .proto file's getDescriptor() method as
 * well as any top-level extensions defined in the .proto file.
 * If java_multiple_files is disabled, then all the other classes from the
 * .proto file will be nested inside the single wrapper outer class.
 */
javaOuterClassname?: string | undefined,
/**
 * If enabled, then the Java code generator will generate a separate .java
 * file for each top-level message, enum, and service defined in the .proto
 * file.  Thus, these types will *not* be nested inside the wrapper class
 * named by java_outer_classname.  However, the wrapper class will still be
 * generated to contain the file's getDescriptor() method as well as any
 * top-level extensions defined in the file.
 */
javaMultipleFiles?: boolean | undefined,
/**
 * This option does nothing.
 * 
 * @deprecated
 */
javaGenerateEqualsAndHash?: boolean | undefined,
/**
 * A proto2 file can set this to true to opt in to UTF-8 checking for Java,
 * which will throw an exception if invalid UTF-8 is parsed from the wire or
 * assigned to a string field.
 * 
 * TODO: clarify exactly what kinds of field types this option
 * applies to, and update these docs accordingly.
 * 
 * Proto3 files already perform these checks. Setting the option explicitly to
 * false has no effect: it cannot be used to opt proto3 files out of UTF-8
 * checks.
 */
javaStringCheckUtf8?: boolean | undefined,
optimizeFor?: FileOptionsOptimizeMode | undefined,
/**
 * Sets the Go package where structs generated from this .proto will be
 * placed. If omitted, the Go package will be derived from the following:
 *   - The basename of the package import path, if provided.
 *   - Otherwise, the package statement in the .proto file, if present.
 *   - Otherwise, the basename of the .proto file, without extension.
 */
goPackage?: string | undefined,
/**
 * Should generic services be generated in each language?  "Generic" services
 * are not specific to any particular RPC system.  They are generated by the
 * main code generators in each language (without additional plugins).
 * Generic services were the only kind of service generation supported by
 * early versions of google.protobuf.
 * 
 * Generic services are now considered deprecated in favor of using plugins
 * that generate code specific to your particular RPC system.  Therefore,
 * these default to false.  Old code which depends on generic services should
 * explicitly set them to true.
 */
ccGenericServices?: boolean | undefined,
javaGenericServices?: boolean | undefined,
pyGenericServices?: boolean | undefined,
/**
 * Is this file deprecated?
 * Depending on the target platform, this can emit Deprecated annotations
 * for everything in the file, or it will be completely ignored; in the very
 * least, this is a formalization for deprecating files.
 */
deprecated?: boolean | undefined,
/**
 * Enables the use of arenas for the proto messages in this file. This applies
 * only to generated classes for C++.
 */
ccEnableArenas?: boolean | undefined,
/**
 * Sets the objective c class prefix which is prepended to all objective c
 * generated classes from this .proto. There is no default.
 */
objcClassPrefix?: string | undefined,
/** Namespace for generated classes; defaults to the package. */
csharpNamespace?: string | undefined,
/**
 * By default Swift generators will take the proto package and CamelCase it
 * replacing '.' with underscore and use that to prefix the types/symbols
 * defined. When this options is provided, they will use this value instead
 * to prefix the types/symbols defined.
 */
swiftPrefix?: string | undefined,
/**
 * Sets the php class prefix which is prepended to all php generated classes
 * from this .proto. Default is empty.
 */
phpClassPrefix?: string | undefined,
/**
 * Use this option to change the namespace of php generated classes. Default
 * is empty. When this option is empty, the package name will be used for
 * determining the namespace.
 */
phpNamespace?: string | undefined,
/**
 * Use this option to change the namespace of php generated metadata classes.
 * Default is empty. When this option is empty, the proto file name will be
 * used for determining the namespace.
 */
phpMetadataNamespace?: string | undefined,
/**
 * Use this option to change the package of ruby generated classes. Default
 * is empty. When this option is not set, the package name will be used for
 * determining the ruby package.
 */
rubyPackage?: string | undefined,
/** Any features defined in the specific edition. */
features?: FeatureSet | undefined,
/**
 * The parser stores options it doesn't recognize here.
 * See the documentation for the "Options" section above.
 */
uninterpretedOption?: UninterpretedOption[] | undefined,
}

/** Generated classes can be optimized for speed or code size. */
export enum FileOptionsOptimizeMode {
/** SPEED - Generate complete code for parsing, serialization, */
SPEED = 1,
/** CODE_SIZE - etc. */
CODE_SIZE = 2,
/** LITE_RUNTIME - Generate code using MessageLite and the lite runtime. */
LITE_RUNTIME = 3,
UNRECOGNIZED = -1,
}

export function fileOptionsOptimizeModeFromJSON(object: any): FileOptionsOptimizeMode {
switch (object) {
case 1:
      case "SPEED":
        return FileOptionsOptimizeMode.SPEED;
case 2:
      case "CODE_SIZE":
        return FileOptionsOptimizeMode.CODE_SIZE;
case 3:
      case "LITE_RUNTIME":
        return FileOptionsOptimizeMode.LITE_RUNTIME;
case -1:
        case "UNRECOGNIZED":
        default:
          return FileOptionsOptimizeMode.UNRECOGNIZED;
}
}

export function fileOptionsOptimizeModeToJSON(object: FileOptionsOptimizeMode): string {
switch (object) {
case FileOptionsOptimizeMode.SPEED: return "SPEED";
case FileOptionsOptimizeMode.CODE_SIZE: return "CODE_SIZE";
case FileOptionsOptimizeMode.LITE_RUNTIME: return "LITE_RUNTIME";
case FileOptionsOptimizeMode.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

export interface MessageOptions {
$type?: 'google.protobuf.MessageOptions',
/**
 * Set true to use the old proto1 MessageSet wire format for extensions.
 * This is provided for backwards-compatibility with the MessageSet wire
 * format.  You should not use this for any other reason:  It's less
 * efficient, has fewer features, and is more complicated.
 * 
 * The message must be defined exactly as follows:
 *   message Foo {
 *     option message_set_wire_format = true;
 *     extensions 4 to max;
 *   }
 * Note that the message cannot have any defined fields; MessageSets only
 * have extensions.
 * 
 * All extensions of your type must be singular messages; e.g. they cannot
 * be int32s, enums, or repeated messages.
 * 
 * Because this is an option, the above two restrictions are not enforced by
 * the protocol compiler.
 */
messageSetWireFormat?: boolean | undefined,
/**
 * Disables the generation of the standard "descriptor()" accessor, which can
 * conflict with a field of the same name.  This is meant to make migration
 * from proto1 easier; new code should avoid fields named "descriptor".
 */
noStandardDescriptorAccessor?: boolean | undefined,
/**
 * Is this message deprecated?
 * Depending on the target platform, this can emit Deprecated annotations
 * for the message, or it will be completely ignored; in the very least,
 * this is a formalization for deprecating messages.
 */
deprecated?: boolean | undefined,
/**
 * Whether the message is an automatically generated map entry type for the
 * maps field.
 * 
 * For maps fields:
 *     map<KeyType, ValueType> map_field = 1;
 * The parsed descriptor looks like:
 *     message MapFieldEntry {
 *         option map_entry = true;
 *         optional KeyType key = 1;
 *         optional ValueType value = 2;
 *     }
 *     repeated MapFieldEntry map_field = 1;
 * 
 * Implementations may choose not to generate the map_entry=true message, but
 * use a native map in the target language to hold the keys and values.
 * The reflection APIs in such implementations still need to work as
 * if the field is a repeated message field.
 * 
 * NOTE: Do not set the option in .proto files. Always use the maps syntax
 * instead. The option should only be implicitly set by the proto compiler
 * parser.
 */
mapEntry?: boolean | undefined,
/**
 * Enable the legacy handling of JSON field name conflicts.  This lowercases
 * and strips underscored from the fields before comparison in proto3 only.
 * The new behavior takes `json_name` into account and applies to proto2 as
 * well.
 * 
 * This should only be used as a temporary measure against broken builds due
 * to the change in behavior for JSON field name conflicts.
 * 
 * TODO This is legacy behavior we plan to remove once downstream
 * teams have had time to migrate.
 * 
 * @deprecated
 */
deprecatedLegacyJsonFieldConflicts?: boolean | undefined,
/** Any features defined in the specific edition. */
features?: FeatureSet | undefined,
/** The parser stores options it doesn't recognize here. See above. */
uninterpretedOption?: UninterpretedOption[] | undefined,
}

export interface FieldOptions {
$type?: 'google.protobuf.FieldOptions',
/**
 * The ctype option instructs the C++ code generator to use a different
 * representation of the field than it normally would.  See the specific
 * options below.  This option is only implemented to support use of
 * [ctype=CORD] and [ctype=STRING] (the default) on non-repeated fields of
 * type "bytes" in the open source release -- sorry, we'll try to include
 * other types in a future version!
 */
ctype?: FieldOptionsCType | undefined,
/**
 * The packed option can be enabled for repeated primitive fields to enable
 * a more efficient representation on the wire. Rather than repeatedly
 * writing the tag and type for each element, the entire array is encoded as
 * a single length-delimited blob. In proto3, only explicit setting it to
 * false will avoid using packed encoding.  This option is prohibited in
 * Editions, but the `repeated_field_encoding` feature can be used to control
 * the behavior.
 */
packed?: boolean | undefined,
/**
 * The jstype option determines the JavaScript type used for values of the
 * field.  The option is permitted only for 64 bit integral and fixed types
 * (int64, uint64, sint64, fixed64, sfixed64).  A field with jstype JS_STRING
 * is represented as JavaScript string, which avoids loss of precision that
 * can happen when a large value is converted to a floating point JavaScript.
 * Specifying JS_NUMBER for the jstype causes the generated JavaScript code to
 * use the JavaScript "number" type.  The behavior of the default option
 * JS_NORMAL is implementation dependent.
 * 
 * This option is an enum to permit additional types to be added, e.g.
 * goog.math.Integer.
 */
jstype?: FieldOptionsJSType | undefined,
/**
 * Should this field be parsed lazily?  Lazy applies only to message-type
 * fields.  It means that when the outer message is initially parsed, the
 * inner message's contents will not be parsed but instead stored in encoded
 * form.  The inner message will actually be parsed when it is first accessed.
 * 
 * This is only a hint.  Implementations are free to choose whether to use
 * eager or lazy parsing regardless of the value of this option.  However,
 * setting this option true suggests that the protocol author believes that
 * using lazy parsing on this field is worth the additional bookkeeping
 * overhead typically needed to implement it.
 * 
 * This option does not affect the public interface of any generated code;
 * all method signatures remain the same.  Furthermore, thread-safety of the
 * interface is not affected by this option; const methods remain safe to
 * call from multiple threads concurrently, while non-const methods continue
 * to require exclusive access.
 * 
 * Note that lazy message fields are still eagerly verified to check
 * ill-formed wireformat or missing required fields. Calling IsInitialized()
 * on the outer message would fail if the inner message has missing required
 * fields. Failed verification would result in parsing failure (except when
 * uninitialized messages are acceptable).
 */
lazy?: boolean | undefined,
/**
 * unverified_lazy does no correctness checks on the byte stream. This should
 * only be used where lazy with verification is prohibitive for performance
 * reasons.
 */
unverifiedLazy?: boolean | undefined,
/**
 * Is this field deprecated?
 * Depending on the target platform, this can emit Deprecated annotations
 * for accessors, or it will be completely ignored; in the very least, this
 * is a formalization for deprecating fields.
 */
deprecated?: boolean | undefined,
/** For Google-internal migration only. Do not use. */
weak?: boolean | undefined,
/**
 * Indicate that the field value should not be printed out when using debug
 * formats, e.g. when the field contains sensitive credentials.
 */
debugRedact?: boolean | undefined,
retention?: FieldOptionsOptionRetention | undefined,
targets?: FieldOptionsOptionTargetType[] | undefined,
editionDefaults?: FieldOptionsEditionDefault[] | undefined,
/** Any features defined in the specific edition. */
features?: FeatureSet | undefined,
featureSupport?: FieldOptionsFeatureSupport | undefined,
/** The parser stores options it doesn't recognize here. See above. */
uninterpretedOption?: UninterpretedOption[] | undefined,
}

export enum FieldOptionsCType {
/** STRING - Default mode. */
STRING = 0,
/**
 * CORD - The option [ctype=CORD] may be applied to a non-repeated field of type
 * "bytes". It indicates that in C++, the data should be stored in a Cord
 * instead of a string.  For very large strings, this may reduce memory
 * fragmentation. It may also allow better performance when parsing from a
 * Cord, or when parsing with aliasing enabled, as the parsed Cord may then
 * alias the original buffer.
 */
CORD = 1,
STRING_PIECE = 2,
UNRECOGNIZED = -1,
}

export function fieldOptionsCTypeFromJSON(object: any): FieldOptionsCType {
switch (object) {
case 0:
      case "STRING":
        return FieldOptionsCType.STRING;
case 1:
      case "CORD":
        return FieldOptionsCType.CORD;
case 2:
      case "STRING_PIECE":
        return FieldOptionsCType.STRING_PIECE;
case -1:
        case "UNRECOGNIZED":
        default:
          return FieldOptionsCType.UNRECOGNIZED;
}
}

export function fieldOptionsCTypeToJSON(object: FieldOptionsCType): string {
switch (object) {
case FieldOptionsCType.STRING: return "STRING";
case FieldOptionsCType.CORD: return "CORD";
case FieldOptionsCType.STRING_PIECE: return "STRING_PIECE";
case FieldOptionsCType.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

export enum FieldOptionsJSType {
/** JS_NORMAL - Use the default type. */
JS_NORMAL = 0,
/** JS_STRING - Use JavaScript strings. */
JS_STRING = 1,
/** JS_NUMBER - Use JavaScript numbers. */
JS_NUMBER = 2,
UNRECOGNIZED = -1,
}

export function fieldOptionsJSTypeFromJSON(object: any): FieldOptionsJSType {
switch (object) {
case 0:
      case "JS_NORMAL":
        return FieldOptionsJSType.JS_NORMAL;
case 1:
      case "JS_STRING":
        return FieldOptionsJSType.JS_STRING;
case 2:
      case "JS_NUMBER":
        return FieldOptionsJSType.JS_NUMBER;
case -1:
        case "UNRECOGNIZED":
        default:
          return FieldOptionsJSType.UNRECOGNIZED;
}
}

export function fieldOptionsJSTypeToJSON(object: FieldOptionsJSType): string {
switch (object) {
case FieldOptionsJSType.JS_NORMAL: return "JS_NORMAL";
case FieldOptionsJSType.JS_STRING: return "JS_STRING";
case FieldOptionsJSType.JS_NUMBER: return "JS_NUMBER";
case FieldOptionsJSType.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

/**
 * If set to RETENTION_SOURCE, the option will be omitted from the binary.
 * Note: as of January 2023, support for this is in progress and does not yet
 * have an effect (b/264593489).
 */
export enum FieldOptionsOptionRetention {
RETENTION_UNKNOWN = 0,
RETENTION_RUNTIME = 1,
RETENTION_SOURCE = 2,
UNRECOGNIZED = -1,
}

export function fieldOptionsOptionRetentionFromJSON(object: any): FieldOptionsOptionRetention {
switch (object) {
case 0:
      case "RETENTION_UNKNOWN":
        return FieldOptionsOptionRetention.RETENTION_UNKNOWN;
case 1:
      case "RETENTION_RUNTIME":
        return FieldOptionsOptionRetention.RETENTION_RUNTIME;
case 2:
      case "RETENTION_SOURCE":
        return FieldOptionsOptionRetention.RETENTION_SOURCE;
case -1:
        case "UNRECOGNIZED":
        default:
          return FieldOptionsOptionRetention.UNRECOGNIZED;
}
}

export function fieldOptionsOptionRetentionToJSON(object: FieldOptionsOptionRetention): string {
switch (object) {
case FieldOptionsOptionRetention.RETENTION_UNKNOWN: return "RETENTION_UNKNOWN";
case FieldOptionsOptionRetention.RETENTION_RUNTIME: return "RETENTION_RUNTIME";
case FieldOptionsOptionRetention.RETENTION_SOURCE: return "RETENTION_SOURCE";
case FieldOptionsOptionRetention.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

/**
 * This indicates the types of entities that the field may apply to when used
 * as an option. If it is unset, then the field may be freely used as an
 * option on any kind of entity. Note: as of January 2023, support for this is
 * in progress and does not yet have an effect (b/264593489).
 */
export enum FieldOptionsOptionTargetType {
TARGET_TYPE_UNKNOWN = 0,
TARGET_TYPE_FILE = 1,
TARGET_TYPE_EXTENSION_RANGE = 2,
TARGET_TYPE_MESSAGE = 3,
TARGET_TYPE_FIELD = 4,
TARGET_TYPE_ONEOF = 5,
TARGET_TYPE_ENUM = 6,
TARGET_TYPE_ENUM_ENTRY = 7,
TARGET_TYPE_SERVICE = 8,
TARGET_TYPE_METHOD = 9,
UNRECOGNIZED = -1,
}

export function fieldOptionsOptionTargetTypeFromJSON(object: any): FieldOptionsOptionTargetType {
switch (object) {
case 0:
      case "TARGET_TYPE_UNKNOWN":
        return FieldOptionsOptionTargetType.TARGET_TYPE_UNKNOWN;
case 1:
      case "TARGET_TYPE_FILE":
        return FieldOptionsOptionTargetType.TARGET_TYPE_FILE;
case 2:
      case "TARGET_TYPE_EXTENSION_RANGE":
        return FieldOptionsOptionTargetType.TARGET_TYPE_EXTENSION_RANGE;
case 3:
      case "TARGET_TYPE_MESSAGE":
        return FieldOptionsOptionTargetType.TARGET_TYPE_MESSAGE;
case 4:
      case "TARGET_TYPE_FIELD":
        return FieldOptionsOptionTargetType.TARGET_TYPE_FIELD;
case 5:
      case "TARGET_TYPE_ONEOF":
        return FieldOptionsOptionTargetType.TARGET_TYPE_ONEOF;
case 6:
      case "TARGET_TYPE_ENUM":
        return FieldOptionsOptionTargetType.TARGET_TYPE_ENUM;
case 7:
      case "TARGET_TYPE_ENUM_ENTRY":
        return FieldOptionsOptionTargetType.TARGET_TYPE_ENUM_ENTRY;
case 8:
      case "TARGET_TYPE_SERVICE":
        return FieldOptionsOptionTargetType.TARGET_TYPE_SERVICE;
case 9:
      case "TARGET_TYPE_METHOD":
        return FieldOptionsOptionTargetType.TARGET_TYPE_METHOD;
case -1:
        case "UNRECOGNIZED":
        default:
          return FieldOptionsOptionTargetType.UNRECOGNIZED;
}
}

export function fieldOptionsOptionTargetTypeToJSON(object: FieldOptionsOptionTargetType): string {
switch (object) {
case FieldOptionsOptionTargetType.TARGET_TYPE_UNKNOWN: return "TARGET_TYPE_UNKNOWN";
case FieldOptionsOptionTargetType.TARGET_TYPE_FILE: return "TARGET_TYPE_FILE";
case FieldOptionsOptionTargetType.TARGET_TYPE_EXTENSION_RANGE: return "TARGET_TYPE_EXTENSION_RANGE";
case FieldOptionsOptionTargetType.TARGET_TYPE_MESSAGE: return "TARGET_TYPE_MESSAGE";
case FieldOptionsOptionTargetType.TARGET_TYPE_FIELD: return "TARGET_TYPE_FIELD";
case FieldOptionsOptionTargetType.TARGET_TYPE_ONEOF: return "TARGET_TYPE_ONEOF";
case FieldOptionsOptionTargetType.TARGET_TYPE_ENUM: return "TARGET_TYPE_ENUM";
case FieldOptionsOptionTargetType.TARGET_TYPE_ENUM_ENTRY: return "TARGET_TYPE_ENUM_ENTRY";
case FieldOptionsOptionTargetType.TARGET_TYPE_SERVICE: return "TARGET_TYPE_SERVICE";
case FieldOptionsOptionTargetType.TARGET_TYPE_METHOD: return "TARGET_TYPE_METHOD";
case FieldOptionsOptionTargetType.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

export interface FieldOptionsEditionDefault {
$type?: 'google.protobuf.FieldOptions.EditionDefault',
edition?: Edition | undefined,
/** Textproto value. */
value?: string | undefined,
}

/** Information about the support window of a feature. */
export interface FieldOptionsFeatureSupport {
$type?: 'google.protobuf.FieldOptions.FeatureSupport',
/**
 * The edition that this feature was first available in.  In editions
 * earlier than this one, the default assigned to EDITION_LEGACY will be
 * used, and proto files will not be able to override it.
 */
editionIntroduced?: Edition | undefined,
/**
 * The edition this feature becomes deprecated in.  Using this after this
 * edition may trigger warnings.
 */
editionDeprecated?: Edition | undefined,
/**
 * The deprecation warning text if this feature is used after the edition it
 * was marked deprecated in.
 */
deprecationWarning?: string | undefined,
/**
 * The edition this feature is no longer available in.  In editions after
 * this one, the last default assigned will be used, and proto files will
 * not be able to override it.
 */
editionRemoved?: Edition | undefined,
}

export interface OneofOptions {
$type?: 'google.protobuf.OneofOptions',
/** Any features defined in the specific edition. */
features?: FeatureSet | undefined,
/** The parser stores options it doesn't recognize here. See above. */
uninterpretedOption?: UninterpretedOption[] | undefined,
}

export interface EnumOptions {
$type?: 'google.protobuf.EnumOptions',
/**
 * Set this option to true to allow mapping different tag names to the same
 * value.
 */
allowAlias?: boolean | undefined,
/**
 * Is this enum deprecated?
 * Depending on the target platform, this can emit Deprecated annotations
 * for the enum, or it will be completely ignored; in the very least, this
 * is a formalization for deprecating enums.
 */
deprecated?: boolean | undefined,
/**
 * Enable the legacy handling of JSON field name conflicts.  This lowercases
 * and strips underscored from the fields before comparison in proto3 only.
 * The new behavior takes `json_name` into account and applies to proto2 as
 * well.
 * TODO Remove this legacy behavior once downstream teams have
 * had time to migrate.
 * 
 * @deprecated
 */
deprecatedLegacyJsonFieldConflicts?: boolean | undefined,
/** Any features defined in the specific edition. */
features?: FeatureSet | undefined,
/** The parser stores options it doesn't recognize here. See above. */
uninterpretedOption?: UninterpretedOption[] | undefined,
}

export interface EnumValueOptions {
$type?: 'google.protobuf.EnumValueOptions',
/**
 * Is this enum value deprecated?
 * Depending on the target platform, this can emit Deprecated annotations
 * for the enum value, or it will be completely ignored; in the very least,
 * this is a formalization for deprecating enum values.
 */
deprecated?: boolean | undefined,
/** Any features defined in the specific edition. */
features?: FeatureSet | undefined,
/**
 * Indicate that fields annotated with this enum value should not be printed
 * out when using debug formats, e.g. when the field contains sensitive
 * credentials.
 */
debugRedact?: boolean | undefined,
/** Information about the support window of a feature value. */
featureSupport?: FieldOptionsFeatureSupport | undefined,
/** The parser stores options it doesn't recognize here. See above. */
uninterpretedOption?: UninterpretedOption[] | undefined,
}

export interface ServiceOptions {
$type?: 'google.protobuf.ServiceOptions',
/** Any features defined in the specific edition. */
features?: FeatureSet | undefined,
/**
 * Is this service deprecated?
 * Depending on the target platform, this can emit Deprecated annotations
 * for the service, or it will be completely ignored; in the very least,
 * this is a formalization for deprecating services.
 */
deprecated?: boolean | undefined,
/** The parser stores options it doesn't recognize here. See above. */
uninterpretedOption?: UninterpretedOption[] | undefined,
}

export interface MethodOptions {
$type?: 'google.protobuf.MethodOptions',
/**
 * Is this method deprecated?
 * Depending on the target platform, this can emit Deprecated annotations
 * for the method, or it will be completely ignored; in the very least,
 * this is a formalization for deprecating methods.
 */
deprecated?: boolean | undefined,
idempotencyLevel?: MethodOptionsIdempotencyLevel | undefined,
/** Any features defined in the specific edition. */
features?: FeatureSet | undefined,
/** The parser stores options it doesn't recognize here. See above. */
uninterpretedOption?: UninterpretedOption[] | undefined,
}

/**
 * Is this method side-effect-free (or safe in HTTP parlance), or idempotent,
 * or neither? HTTP based RPC implementation may choose GET verb for safe
 * methods, and PUT verb for idempotent methods instead of the default POST.
 */
export enum MethodOptionsIdempotencyLevel {
IDEMPOTENCY_UNKNOWN = 0,
/** NO_SIDE_EFFECTS - implies idempotent */
NO_SIDE_EFFECTS = 1,
/** IDEMPOTENT - idempotent, but may have side effects */
IDEMPOTENT = 2,
UNRECOGNIZED = -1,
}

export function methodOptionsIdempotencyLevelFromJSON(object: any): MethodOptionsIdempotencyLevel {
switch (object) {
case 0:
      case "IDEMPOTENCY_UNKNOWN":
        return MethodOptionsIdempotencyLevel.IDEMPOTENCY_UNKNOWN;
case 1:
      case "NO_SIDE_EFFECTS":
        return MethodOptionsIdempotencyLevel.NO_SIDE_EFFECTS;
case 2:
      case "IDEMPOTENT":
        return MethodOptionsIdempotencyLevel.IDEMPOTENT;
case -1:
        case "UNRECOGNIZED":
        default:
          return MethodOptionsIdempotencyLevel.UNRECOGNIZED;
}
}

export function methodOptionsIdempotencyLevelToJSON(object: MethodOptionsIdempotencyLevel): string {
switch (object) {
case MethodOptionsIdempotencyLevel.IDEMPOTENCY_UNKNOWN: return "IDEMPOTENCY_UNKNOWN";
case MethodOptionsIdempotencyLevel.NO_SIDE_EFFECTS: return "NO_SIDE_EFFECTS";
case MethodOptionsIdempotencyLevel.IDEMPOTENT: return "IDEMPOTENT";
case MethodOptionsIdempotencyLevel.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

/**
 * A message representing a option the parser does not recognize. This only
 * appears in options protos created by the compiler::Parser class.
 * DescriptorPool resolves these when building Descriptor objects. Therefore,
 * options protos in descriptor objects (e.g. returned by Descriptor::options(),
 * or produced by Descriptor::CopyTo()) will never have UninterpretedOptions
 * in them.
 */
export interface UninterpretedOption {
$type?: 'google.protobuf.UninterpretedOption',
name?: UninterpretedOptionNamePart[] | undefined,
/**
 * The value of the uninterpreted option, in whatever type the tokenizer
 * identified it as during parsing. Exactly one of these should be set.
 */
identifierValue?: string | undefined,
positiveIntValue?: number | undefined,
negativeIntValue?: number | undefined,
doubleValue?: number | undefined,
stringValue?: Uint8Array | undefined,
aggregateValue?: string | undefined,
}

/**
 * The name of the uninterpreted option.  Each string represents a segment in
 * a dot-separated name.  is_extension is true iff a segment represents an
 * extension (denoted with parentheses in options specs in .proto files).
 * E.g.,{ ["foo", false], ["bar.baz", true], ["moo", false] } represents
 * "foo.(bar.baz).moo".
 */
export interface UninterpretedOptionNamePart {
$type?: 'google.protobuf.UninterpretedOption.NamePart',
namePart?: string | undefined,
isExtension?: boolean | undefined,
}

/**
 * TODO Enums in C++ gencode (and potentially other languages) are
 * not well scoped.  This means that each of the feature enums below can clash
 * with each other.  The short names we've chosen maximize call-site
 * readability, but leave us very open to this scenario.  A future feature will
 * be designed and implemented to handle this, hopefully before we ever hit a
 * conflict here.
 */
export interface FeatureSet {
$type?: 'google.protobuf.FeatureSet',
fieldPresence?: FeatureSetFieldPresence | undefined,
enumType?: FeatureSetEnumType | undefined,
repeatedFieldEncoding?: FeatureSetRepeatedFieldEncoding | undefined,
utf8Validation?: FeatureSetUtf8Validation | undefined,
messageEncoding?: FeatureSetMessageEncoding | undefined,
jsonFormat?: FeatureSetJsonFormat | undefined,
}

export enum FeatureSetFieldPresence {
UNKNOWN = 0,
EXPLICIT = 1,
IMPLICIT = 2,
LEGACY_REQUIRED = 3,
UNRECOGNIZED = -1,
}

export function featureSetFieldPresenceFromJSON(object: any): FeatureSetFieldPresence {
switch (object) {
case 0:
      case "FIELD_PRESENCE_UNKNOWN":
        return FeatureSetFieldPresence.UNKNOWN;
case 1:
      case "EXPLICIT":
        return FeatureSetFieldPresence.EXPLICIT;
case 2:
      case "IMPLICIT":
        return FeatureSetFieldPresence.IMPLICIT;
case 3:
      case "LEGACY_REQUIRED":
        return FeatureSetFieldPresence.LEGACY_REQUIRED;
case -1:
        case "UNRECOGNIZED":
        default:
          return FeatureSetFieldPresence.UNRECOGNIZED;
}
}

export function featureSetFieldPresenceToJSON(object: FeatureSetFieldPresence): string {
switch (object) {
case FeatureSetFieldPresence.UNKNOWN: return "FIELD_PRESENCE_UNKNOWN";
case FeatureSetFieldPresence.EXPLICIT: return "EXPLICIT";
case FeatureSetFieldPresence.IMPLICIT: return "IMPLICIT";
case FeatureSetFieldPresence.LEGACY_REQUIRED: return "LEGACY_REQUIRED";
case FeatureSetFieldPresence.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

export enum FeatureSetEnumType {
UNKNOWN = 0,
OPEN = 1,
CLOSED = 2,
UNRECOGNIZED = -1,
}

export function featureSetEnumTypeFromJSON(object: any): FeatureSetEnumType {
switch (object) {
case 0:
      case "ENUM_TYPE_UNKNOWN":
        return FeatureSetEnumType.UNKNOWN;
case 1:
      case "OPEN":
        return FeatureSetEnumType.OPEN;
case 2:
      case "CLOSED":
        return FeatureSetEnumType.CLOSED;
case -1:
        case "UNRECOGNIZED":
        default:
          return FeatureSetEnumType.UNRECOGNIZED;
}
}

export function featureSetEnumTypeToJSON(object: FeatureSetEnumType): string {
switch (object) {
case FeatureSetEnumType.UNKNOWN: return "ENUM_TYPE_UNKNOWN";
case FeatureSetEnumType.OPEN: return "OPEN";
case FeatureSetEnumType.CLOSED: return "CLOSED";
case FeatureSetEnumType.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

export enum FeatureSetRepeatedFieldEncoding {
UNKNOWN = 0,
PACKED = 1,
EXPANDED = 2,
UNRECOGNIZED = -1,
}

export function featureSetRepeatedFieldEncodingFromJSON(object: any): FeatureSetRepeatedFieldEncoding {
switch (object) {
case 0:
      case "REPEATED_FIELD_ENCODING_UNKNOWN":
        return FeatureSetRepeatedFieldEncoding.UNKNOWN;
case 1:
      case "PACKED":
        return FeatureSetRepeatedFieldEncoding.PACKED;
case 2:
      case "EXPANDED":
        return FeatureSetRepeatedFieldEncoding.EXPANDED;
case -1:
        case "UNRECOGNIZED":
        default:
          return FeatureSetRepeatedFieldEncoding.UNRECOGNIZED;
}
}

export function featureSetRepeatedFieldEncodingToJSON(object: FeatureSetRepeatedFieldEncoding): string {
switch (object) {
case FeatureSetRepeatedFieldEncoding.UNKNOWN: return "REPEATED_FIELD_ENCODING_UNKNOWN";
case FeatureSetRepeatedFieldEncoding.PACKED: return "PACKED";
case FeatureSetRepeatedFieldEncoding.EXPANDED: return "EXPANDED";
case FeatureSetRepeatedFieldEncoding.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

export enum FeatureSetUtf8Validation {
UNKNOWN = 0,
VERIFY = 2,
NONE = 3,
UNRECOGNIZED = -1,
}

export function featureSetUtf8ValidationFromJSON(object: any): FeatureSetUtf8Validation {
switch (object) {
case 0:
      case "UTF8_VALIDATION_UNKNOWN":
        return FeatureSetUtf8Validation.UNKNOWN;
case 2:
      case "VERIFY":
        return FeatureSetUtf8Validation.VERIFY;
case 3:
      case "NONE":
        return FeatureSetUtf8Validation.NONE;
case -1:
        case "UNRECOGNIZED":
        default:
          return FeatureSetUtf8Validation.UNRECOGNIZED;
}
}

export function featureSetUtf8ValidationToJSON(object: FeatureSetUtf8Validation): string {
switch (object) {
case FeatureSetUtf8Validation.UNKNOWN: return "UTF8_VALIDATION_UNKNOWN";
case FeatureSetUtf8Validation.VERIFY: return "VERIFY";
case FeatureSetUtf8Validation.NONE: return "NONE";
case FeatureSetUtf8Validation.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

export enum FeatureSetMessageEncoding {
UNKNOWN = 0,
LENGTH_PREFIXED = 1,
DELIMITED = 2,
UNRECOGNIZED = -1,
}

export function featureSetMessageEncodingFromJSON(object: any): FeatureSetMessageEncoding {
switch (object) {
case 0:
      case "MESSAGE_ENCODING_UNKNOWN":
        return FeatureSetMessageEncoding.UNKNOWN;
case 1:
      case "LENGTH_PREFIXED":
        return FeatureSetMessageEncoding.LENGTH_PREFIXED;
case 2:
      case "DELIMITED":
        return FeatureSetMessageEncoding.DELIMITED;
case -1:
        case "UNRECOGNIZED":
        default:
          return FeatureSetMessageEncoding.UNRECOGNIZED;
}
}

export function featureSetMessageEncodingToJSON(object: FeatureSetMessageEncoding): string {
switch (object) {
case FeatureSetMessageEncoding.UNKNOWN: return "MESSAGE_ENCODING_UNKNOWN";
case FeatureSetMessageEncoding.LENGTH_PREFIXED: return "LENGTH_PREFIXED";
case FeatureSetMessageEncoding.DELIMITED: return "DELIMITED";
case FeatureSetMessageEncoding.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

export enum FeatureSetJsonFormat {
UNKNOWN = 0,
ALLOW = 1,
LEGACY_BEST_EFFORT = 2,
UNRECOGNIZED = -1,
}

export function featureSetJsonFormatFromJSON(object: any): FeatureSetJsonFormat {
switch (object) {
case 0:
      case "JSON_FORMAT_UNKNOWN":
        return FeatureSetJsonFormat.UNKNOWN;
case 1:
      case "ALLOW":
        return FeatureSetJsonFormat.ALLOW;
case 2:
      case "LEGACY_BEST_EFFORT":
        return FeatureSetJsonFormat.LEGACY_BEST_EFFORT;
case -1:
        case "UNRECOGNIZED":
        default:
          return FeatureSetJsonFormat.UNRECOGNIZED;
}
}

export function featureSetJsonFormatToJSON(object: FeatureSetJsonFormat): string {
switch (object) {
case FeatureSetJsonFormat.UNKNOWN: return "JSON_FORMAT_UNKNOWN";
case FeatureSetJsonFormat.ALLOW: return "ALLOW";
case FeatureSetJsonFormat.LEGACY_BEST_EFFORT: return "LEGACY_BEST_EFFORT";
case FeatureSetJsonFormat.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

/**
 * A compiled specification for the defaults of a set of features.  These
 * messages are generated from FeatureSet extensions and can be used to seed
 * feature resolution. The resolution with this object becomes a simple search
 * for the closest matching edition, followed by proto merges.
 */
export interface FeatureSetDefaults {
$type?: 'google.protobuf.FeatureSetDefaults',
defaults?: FeatureSetDefaultsFeatureSetEditionDefault[] | undefined,
/**
 * The minimum supported edition (inclusive) when this was constructed.
 * Editions before this will not have defaults.
 */
minimumEdition?: Edition | undefined,
/**
 * The maximum known edition (inclusive) when this was constructed. Editions
 * after this will not have reliable defaults.
 */
maximumEdition?: Edition | undefined,
}

/**
 * A map from every known edition with a unique set of defaults to its
 * defaults. Not all editions may be contained here.  For a given edition,
 * the defaults at the closest matching edition ordered at or before it should
 * be used.  This field must be in strict ascending order by edition.
 */
export interface FeatureSetDefaultsFeatureSetEditionDefault {
$type?: 'google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault',
edition?: Edition | undefined,
/** Defaults of features that can be overridden in this edition. */
overridableFeatures?: FeatureSet | undefined,
/** Defaults of features that can't be overridden in this edition. */
fixedFeatures?: FeatureSet | undefined,
}

/**
 * Encapsulates information about the original source file from which a
 * FileDescriptorProto was generated.
 */
export interface SourceCodeInfo {
$type?: 'google.protobuf.SourceCodeInfo',
/**
 * A Location identifies a piece of source code in a .proto file which
 * corresponds to a particular definition.  This information is intended
 * to be useful to IDEs, code indexers, documentation generators, and similar
 * tools.
 * 
 * For example, say we have a file like:
 *   message Foo {
 *     optional string foo = 1;
 *   }
 * Let's look at just the field definition:
 *   optional string foo = 1;
 *   ^       ^^     ^^  ^  ^^^
 *   a       bc     de  f  ghi
 * We have the following locations:
 *   span   path               represents
 *   [a,i)  [ 4, 0, 2, 0 ]     The whole field definition.
 *   [a,b)  [ 4, 0, 2, 0, 4 ]  The label (optional).
 *   [c,d)  [ 4, 0, 2, 0, 5 ]  The type (string).
 *   [e,f)  [ 4, 0, 2, 0, 1 ]  The name (foo).
 *   [g,h)  [ 4, 0, 2, 0, 3 ]  The number (1).
 * 
 * Notes:
 * - A location may refer to a repeated field itself (i.e. not to any
 *   particular index within it).  This is used whenever a set of elements are
 *   logically enclosed in a single code segment.  For example, an entire
 *   extend block (possibly containing multiple extension definitions) will
 *   have an outer location whose path refers to the "extensions" repeated
 *   field without an index.
 * - Multiple locations may have the same path.  This happens when a single
 *   logical declaration is spread out across multiple places.  The most
 *   obvious example is the "extend" block again -- there may be multiple
 *   extend blocks in the same scope, each of which will have the same path.
 * - A location's span is not always a subset of its parent's span.  For
 *   example, the "extendee" of an extension declaration appears at the
 *   beginning of the "extend" block and is shared by all extensions within
 *   the block.
 * - Just because a location's span is a subset of some other location's span
 *   does not mean that it is a descendant.  For example, a "group" defines
 *   both a type and a field in a single declaration.  Thus, the locations
 *   corresponding to the type and field and their components will overlap.
 * - Code which tries to interpret locations should probably be designed to
 *   ignore those that it doesn't understand, as more types of locations could
 *   be recorded in the future.
 */
location?: SourceCodeInfoLocation[] | undefined,
}

export interface SourceCodeInfoLocation {
$type?: 'google.protobuf.SourceCodeInfo.Location',
/**
 * Identifies which part of the FileDescriptorProto was defined at this
 * location.
 * 
 * Each element is a field number or an index.  They form a path from
 * the root FileDescriptorProto to the place where the definition appears.
 * For example, this path:
 *   [ 4, 3, 2, 7, 1 ]
 * refers to:
 *   file.message_type(3)  // 4, 3
 *       .field(7)         // 2, 7
 *       .name()           // 1
 * This is because FileDescriptorProto.message_type has field number 4:
 *   repeated DescriptorProto message_type = 4;
 * and DescriptorProto.field has field number 2:
 *   repeated FieldDescriptorProto field = 2;
 * and FieldDescriptorProto.name has field number 1:
 *   optional string name = 1;
 * 
 * Thus, the above path gives the location of a field name.  If we removed
 * the last element:
 *   [ 4, 3, 2, 7 ]
 * this path refers to the whole field declaration (from the beginning
 * of the label to the terminating semicolon).
 */
path?: number[] | undefined,
/**
 * Always has exactly three or four elements: start line, start column,
 * end line (optional, otherwise assumed same as start line), end column.
 * These are packed into a single field for efficiency.  Note that line
 * and column numbers are zero-based -- typically you will want to add
 * 1 to each before displaying to a user.
 */
span?: number[] | undefined,
/**
 * If this SourceCodeInfo represents a complete declaration, these are any
 * comments appearing before and after the declaration which appear to be
 * attached to the declaration.
 * 
 * A series of line comments appearing on consecutive lines, with no other
 * tokens appearing on those lines, will be treated as a single comment.
 * 
 * leading_detached_comments will keep paragraphs of comments that appear
 * before (but not connected to) the current element. Each paragraph,
 * separated by empty lines, will be one comment element in the repeated
 * field.
 * 
 * Only the comment content is provided; comment markers (e.g. //) are
 * stripped out.  For block comments, leading whitespace and an asterisk
 * will be stripped from the beginning of each line other than the first.
 * Newlines are included in the output.
 * 
 * Examples:
 * 
 *   optional int32 foo = 1;  // Comment attached to foo.
 *   // Comment attached to bar.
 *   optional int32 bar = 2;
 * 
 *   optional string baz = 3;
 *   // Comment attached to baz.
 *   // Another line attached to baz.
 * 
 *   // Comment attached to moo.
 *   //
 *   // Another line attached to moo.
 *   optional double moo = 4;
 * 
 *   // Detached comment for corge. This is not leading or trailing comments
 *   // to moo or corge because there are blank lines separating it from
 *   // both.
 * 
 *   // Detached comment for corge paragraph 2.
 * 
 *   optional string corge = 5;
 *   /* Block comment attached
 *    * to corge.  Leading asterisks
 *    * will be removed. * /
 *   /* Block comment attached to
 *    * grault. * /
 *   optional int32 grault = 6;
 * 
 *   // ignored detached comments.
 */
leadingComments?: string | undefined,
trailingComments?: string | undefined,
leadingDetachedComments?: string[] | undefined,
}

/**
 * Describes the relationship between generated code and its original source
 * file. A GeneratedCodeInfo message is associated with only one generated
 * source file, but may contain references to different source .proto files.
 */
export interface GeneratedCodeInfo {
$type?: 'google.protobuf.GeneratedCodeInfo',
/**
 * An Annotation connects some span of text in generated code to an element
 * of its generating .proto file.
 */
annotation?: GeneratedCodeInfoAnnotation[] | undefined,
}

export interface GeneratedCodeInfoAnnotation {
$type?: 'google.protobuf.GeneratedCodeInfo.Annotation',
/**
 * Identifies the element in the original source .proto file. This field
 * is formatted the same as SourceCodeInfo.Location.path.
 */
path?: number[] | undefined,
/** Identifies the filesystem path to the original source .proto. */
sourceFile?: string | undefined,
/**
 * Identifies the starting offset in bytes in the generated code
 * that relates to the identified object.
 */
begin?: number | undefined,
/**
 * Identifies the ending offset in bytes in the generated code that
 * relates to the identified object. The end offset should be one past
 * the last relevant byte (so the length of the text = end - begin).
 */
end?: number | undefined,
semantic?: GeneratedCodeInfoAnnotationSemantic | undefined,
}

/**
 * Represents the identified object's effect on the element in the original
 * .proto file.
 */
export enum GeneratedCodeInfoAnnotationSemantic {
/** NONE - There is no effect or the effect is indescribable. */
NONE = 0,
/** SET - The element is set or otherwise mutated. */
SET = 1,
/** ALIAS - An alias to the element is returned. */
ALIAS = 2,
UNRECOGNIZED = -1,
}

export function generatedCodeInfoAnnotationSemanticFromJSON(object: any): GeneratedCodeInfoAnnotationSemantic {
switch (object) {
case 0:
      case "NONE":
        return GeneratedCodeInfoAnnotationSemantic.NONE;
case 1:
      case "SET":
        return GeneratedCodeInfoAnnotationSemantic.SET;
case 2:
      case "ALIAS":
        return GeneratedCodeInfoAnnotationSemantic.ALIAS;
case -1:
        case "UNRECOGNIZED":
        default:
          return GeneratedCodeInfoAnnotationSemantic.UNRECOGNIZED;
}
}

export function generatedCodeInfoAnnotationSemanticToJSON(object: GeneratedCodeInfoAnnotationSemantic): string {
switch (object) {
case GeneratedCodeInfoAnnotationSemantic.NONE: return "NONE";
case GeneratedCodeInfoAnnotationSemantic.SET: return "SET";
case GeneratedCodeInfoAnnotationSemantic.ALIAS: return "ALIAS";
case GeneratedCodeInfoAnnotationSemantic.UNRECOGNIZED:
default:
          return "UNRECOGNIZED";
}
}

function createBaseFileDescriptorSet(): FileDescriptorSet {
      return { $type: 'google.protobuf.FileDescriptorSet',file: [] };
    }

export const FileDescriptorSet = {
              $type: 'google.protobuf.FileDescriptorSet' as const,

encode(
      message: FileDescriptorSet,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.file !== undefined && message.file.length !== 0) {
              
          for (const v of message.file) {
            FileDescriptorProto.encode(v!, writer.uint32(10).fork()).ldelim();
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): FileDescriptorSet {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseFileDescriptorSet();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 10) {
        break;
      }
    
            
            message.file!.push(FileDescriptorProto.decode(reader, reader.uint32()));
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): FileDescriptorSet {
      return {
$type: FileDescriptorSet.$type,
file: globalThis.Array.isArray(object?.file) ? object.file.map((e: any) => FileDescriptorProto.fromJSON(e)): [],
};
},

toJSON(message: FileDescriptorSet): unknown {
      const obj: any = {};
if (message.file?.length) {
          obj.file = message.file.map(e => FileDescriptorProto.toJSON(e));
        }
return obj;
},

create<I extends Exact<DeepPartial<FileDescriptorSet>, I>>(base?: I): FileDescriptorSet {
        return FileDescriptorSet.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<FileDescriptorSet>, I>>(object: I): FileDescriptorSet {
const message = createBaseFileDescriptorSet();
message.file = object.file?.map((e) => FileDescriptorProto.fromPartial(e)) || [];
return message;
}
            };

messageTypeRegistry.set(FileDescriptorSet.$type, FileDescriptorSet);

function createBaseFileDescriptorProto(): FileDescriptorProto {
      return { $type: 'google.protobuf.FileDescriptorProto',name: "",package: "",dependency: [],publicDependency: [],weakDependency: [],messageType: [],enumType: [],service: [],extension: [],options: undefined,sourceCodeInfo: undefined,syntax: "",edition: 0 };
    }

export const FileDescriptorProto = {
              $type: 'google.protobuf.FileDescriptorProto' as const,

encode(
      message: FileDescriptorProto,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.name !== undefined &&  message.name !== "") {
          writer.uint32(10).string(message.name);
        }
if (message.package !== undefined &&  message.package !== "") {
          writer.uint32(18).string(message.package);
        }
if (message.dependency !== undefined && message.dependency.length !== 0) {
              
          for (const v of message.dependency) {
            writer.uint32(26).string(v!);
          }
        
            }
if (message.publicDependency !== undefined && message.publicDependency.length !== 0) {
              
          writer.uint32(82).fork();
          for (const v of message.publicDependency) {
            writer.int32(v);
          }
          writer.ldelim();
        
            }
if (message.weakDependency !== undefined && message.weakDependency.length !== 0) {
              
          writer.uint32(90).fork();
          for (const v of message.weakDependency) {
            writer.int32(v);
          }
          writer.ldelim();
        
            }
if (message.messageType !== undefined && message.messageType.length !== 0) {
              
          for (const v of message.messageType) {
            DescriptorProto.encode(v!, writer.uint32(34).fork()).ldelim();
          }
        
            }
if (message.enumType !== undefined && message.enumType.length !== 0) {
              
          for (const v of message.enumType) {
            EnumDescriptorProto.encode(v!, writer.uint32(42).fork()).ldelim();
          }
        
            }
if (message.service !== undefined && message.service.length !== 0) {
              
          for (const v of message.service) {
            ServiceDescriptorProto.encode(v!, writer.uint32(50).fork()).ldelim();
          }
        
            }
if (message.extension !== undefined && message.extension.length !== 0) {
              
          for (const v of message.extension) {
            FieldDescriptorProto.encode(v!, writer.uint32(58).fork()).ldelim();
          }
        
            }
if (message.options !== undefined) {
          FileOptions.encode(message.options, writer.uint32(66).fork()).ldelim();
        }
if (message.sourceCodeInfo !== undefined) {
          SourceCodeInfo.encode(message.sourceCodeInfo, writer.uint32(74).fork()).ldelim();
        }
if (message.syntax !== undefined &&  message.syntax !== "") {
          writer.uint32(98).string(message.syntax);
        }
if (message.edition !== undefined &&  message.edition !== 0) {
          writer.uint32(112).int32(message.edition);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): FileDescriptorProto {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseFileDescriptorProto();
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
    
        message.package = reader.string();
continue;
case 3:
if (tag !== 26) {
        break;
      }
    
            
            message.dependency!.push(reader.string());
continue;
case 10:
if (tag === 80) {
              
              message.publicDependency!.push(reader.int32());

              continue;
            }

            if (tag === 82) {
              
              const end2 = reader.uint32() + reader.pos;
              while (reader.pos < end2) {
                message.publicDependency!.push(reader.int32());
              }

              continue;
            }

            break;
case 11:
if (tag === 88) {
              
              message.weakDependency!.push(reader.int32());

              continue;
            }

            if (tag === 90) {
              
              const end2 = reader.uint32() + reader.pos;
              while (reader.pos < end2) {
                message.weakDependency!.push(reader.int32());
              }

              continue;
            }

            break;
case 4:
if (tag !== 34) {
        break;
      }
    
            
            message.messageType!.push(DescriptorProto.decode(reader, reader.uint32()));
continue;
case 5:
if (tag !== 42) {
        break;
      }
    
            
            message.enumType!.push(EnumDescriptorProto.decode(reader, reader.uint32()));
continue;
case 6:
if (tag !== 50) {
        break;
      }
    
            
            message.service!.push(ServiceDescriptorProto.decode(reader, reader.uint32()));
continue;
case 7:
if (tag !== 58) {
        break;
      }
    
            
            message.extension!.push(FieldDescriptorProto.decode(reader, reader.uint32()));
continue;
case 8:
if (tag !== 66) {
        break;
      }
    
        message.options = FileOptions.decode(reader, reader.uint32());
continue;
case 9:
if (tag !== 74) {
        break;
      }
    
        message.sourceCodeInfo = SourceCodeInfo.decode(reader, reader.uint32());
continue;
case 12:
if (tag !== 98) {
        break;
      }
    
        message.syntax = reader.string();
continue;
case 14:
if (tag !== 112) {
        break;
      }
    
        message.edition = reader.int32() as any;
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): FileDescriptorProto {
      return {
$type: FileDescriptorProto.$type,
name: isSet(object.name)
          ? globalThis.String(object.name)
          : "",
package: isSet(object.package)
          ? globalThis.String(object.package)
          : "",
dependency: globalThis.Array.isArray(object?.dependency) ? object.dependency.map((e: any) => globalThis.String(e)): [],
publicDependency: globalThis.Array.isArray(object?.publicDependency) ? object.publicDependency.map((e: any) => globalThis.Number(e)): [],
weakDependency: globalThis.Array.isArray(object?.weakDependency) ? object.weakDependency.map((e: any) => globalThis.Number(e)): [],
messageType: globalThis.Array.isArray(object?.messageType) ? object.messageType.map((e: any) => DescriptorProto.fromJSON(e)): [],
enumType: globalThis.Array.isArray(object?.enumType) ? object.enumType.map((e: any) => EnumDescriptorProto.fromJSON(e)): [],
service: globalThis.Array.isArray(object?.service) ? object.service.map((e: any) => ServiceDescriptorProto.fromJSON(e)): [],
extension: globalThis.Array.isArray(object?.extension) ? object.extension.map((e: any) => FieldDescriptorProto.fromJSON(e)): [],
options: isSet(object.options)
          ? FileOptions.fromJSON(object.options)
          : undefined,
sourceCodeInfo: isSet(object.sourceCodeInfo)
          ? SourceCodeInfo.fromJSON(object.sourceCodeInfo)
          : undefined,
syntax: isSet(object.syntax)
          ? globalThis.String(object.syntax)
          : "",
edition: isSet(object.edition)
          ? editionFromJSON(object.edition)
          : 0,
};
},

toJSON(message: FileDescriptorProto): unknown {
      const obj: any = {};
if (message.name !== undefined &&  message.name !== "") {
          obj.name = message.name;
        }
if (message.package !== undefined &&  message.package !== "") {
          obj.package = message.package;
        }
if (message.dependency?.length) {
          obj.dependency = message.dependency;
        }
if (message.publicDependency?.length) {
          obj.publicDependency = message.publicDependency.map(e => Math.round(e));
        }
if (message.weakDependency?.length) {
          obj.weakDependency = message.weakDependency.map(e => Math.round(e));
        }
if (message.messageType?.length) {
          obj.messageType = message.messageType.map(e => DescriptorProto.toJSON(e));
        }
if (message.enumType?.length) {
          obj.enumType = message.enumType.map(e => EnumDescriptorProto.toJSON(e));
        }
if (message.service?.length) {
          obj.service = message.service.map(e => ServiceDescriptorProto.toJSON(e));
        }
if (message.extension?.length) {
          obj.extension = message.extension.map(e => FieldDescriptorProto.toJSON(e));
        }
if (message.options !== undefined) {
          obj.options = FileOptions.toJSON(message.options);
        }
if (message.sourceCodeInfo !== undefined) {
          obj.sourceCodeInfo = SourceCodeInfo.toJSON(message.sourceCodeInfo);
        }
if (message.syntax !== undefined &&  message.syntax !== "") {
          obj.syntax = message.syntax;
        }
if (message.edition !== undefined &&  message.edition !== 0) {
          obj.edition = editionToJSON(message.edition);
        }
return obj;
},

create<I extends Exact<DeepPartial<FileDescriptorProto>, I>>(base?: I): FileDescriptorProto {
        return FileDescriptorProto.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<FileDescriptorProto>, I>>(object: I): FileDescriptorProto {
const message = createBaseFileDescriptorProto();
message.name = object.name ?? "";
message.package = object.package ?? "";
message.dependency = object.dependency?.map((e) => e) || [];
message.publicDependency = object.publicDependency?.map((e) => e) || [];
message.weakDependency = object.weakDependency?.map((e) => e) || [];
message.messageType = object.messageType?.map((e) => DescriptorProto.fromPartial(e)) || [];
message.enumType = object.enumType?.map((e) => EnumDescriptorProto.fromPartial(e)) || [];
message.service = object.service?.map((e) => ServiceDescriptorProto.fromPartial(e)) || [];
message.extension = object.extension?.map((e) => FieldDescriptorProto.fromPartial(e)) || [];
message.options = (object.options !== undefined && object.options !== null)
          ? FileOptions.fromPartial(object.options)
          : undefined;
message.sourceCodeInfo = (object.sourceCodeInfo !== undefined && object.sourceCodeInfo !== null)
          ? SourceCodeInfo.fromPartial(object.sourceCodeInfo)
          : undefined;
message.syntax = object.syntax ?? "";
message.edition = object.edition ?? 0;
return message;
}
            };

messageTypeRegistry.set(FileDescriptorProto.$type, FileDescriptorProto);

function createBaseDescriptorProto(): DescriptorProto {
      return { $type: 'google.protobuf.DescriptorProto',name: "",field: [],extension: [],nestedType: [],enumType: [],extensionRange: [],oneofDecl: [],options: undefined,reservedRange: [],reservedName: [] };
    }

export const DescriptorProto = {
              $type: 'google.protobuf.DescriptorProto' as const,

encode(
      message: DescriptorProto,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.name !== undefined &&  message.name !== "") {
          writer.uint32(10).string(message.name);
        }
if (message.field !== undefined && message.field.length !== 0) {
              
          for (const v of message.field) {
            FieldDescriptorProto.encode(v!, writer.uint32(18).fork()).ldelim();
          }
        
            }
if (message.extension !== undefined && message.extension.length !== 0) {
              
          for (const v of message.extension) {
            FieldDescriptorProto.encode(v!, writer.uint32(50).fork()).ldelim();
          }
        
            }
if (message.nestedType !== undefined && message.nestedType.length !== 0) {
              
          for (const v of message.nestedType) {
            DescriptorProto.encode(v!, writer.uint32(26).fork()).ldelim();
          }
        
            }
if (message.enumType !== undefined && message.enumType.length !== 0) {
              
          for (const v of message.enumType) {
            EnumDescriptorProto.encode(v!, writer.uint32(34).fork()).ldelim();
          }
        
            }
if (message.extensionRange !== undefined && message.extensionRange.length !== 0) {
              
          for (const v of message.extensionRange) {
            DescriptorProtoExtensionRange.encode(v!, writer.uint32(42).fork()).ldelim();
          }
        
            }
if (message.oneofDecl !== undefined && message.oneofDecl.length !== 0) {
              
          for (const v of message.oneofDecl) {
            OneofDescriptorProto.encode(v!, writer.uint32(66).fork()).ldelim();
          }
        
            }
if (message.options !== undefined) {
          MessageOptions.encode(message.options, writer.uint32(58).fork()).ldelim();
        }
if (message.reservedRange !== undefined && message.reservedRange.length !== 0) {
              
          for (const v of message.reservedRange) {
            DescriptorProtoReservedRange.encode(v!, writer.uint32(74).fork()).ldelim();
          }
        
            }
if (message.reservedName !== undefined && message.reservedName.length !== 0) {
              
          for (const v of message.reservedName) {
            writer.uint32(82).string(v!);
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): DescriptorProto {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseDescriptorProto();
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
    
            
            message.field!.push(FieldDescriptorProto.decode(reader, reader.uint32()));
continue;
case 6:
if (tag !== 50) {
        break;
      }
    
            
            message.extension!.push(FieldDescriptorProto.decode(reader, reader.uint32()));
continue;
case 3:
if (tag !== 26) {
        break;
      }
    
            
            message.nestedType!.push(DescriptorProto.decode(reader, reader.uint32()));
continue;
case 4:
if (tag !== 34) {
        break;
      }
    
            
            message.enumType!.push(EnumDescriptorProto.decode(reader, reader.uint32()));
continue;
case 5:
if (tag !== 42) {
        break;
      }
    
            
            message.extensionRange!.push(DescriptorProtoExtensionRange.decode(reader, reader.uint32()));
continue;
case 8:
if (tag !== 66) {
        break;
      }
    
            
            message.oneofDecl!.push(OneofDescriptorProto.decode(reader, reader.uint32()));
continue;
case 7:
if (tag !== 58) {
        break;
      }
    
        message.options = MessageOptions.decode(reader, reader.uint32());
continue;
case 9:
if (tag !== 74) {
        break;
      }
    
            
            message.reservedRange!.push(DescriptorProtoReservedRange.decode(reader, reader.uint32()));
continue;
case 10:
if (tag !== 82) {
        break;
      }
    
            
            message.reservedName!.push(reader.string());
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): DescriptorProto {
      return {
$type: DescriptorProto.$type,
name: isSet(object.name)
          ? globalThis.String(object.name)
          : "",
field: globalThis.Array.isArray(object?.field) ? object.field.map((e: any) => FieldDescriptorProto.fromJSON(e)): [],
extension: globalThis.Array.isArray(object?.extension) ? object.extension.map((e: any) => FieldDescriptorProto.fromJSON(e)): [],
nestedType: globalThis.Array.isArray(object?.nestedType) ? object.nestedType.map((e: any) => DescriptorProto.fromJSON(e)): [],
enumType: globalThis.Array.isArray(object?.enumType) ? object.enumType.map((e: any) => EnumDescriptorProto.fromJSON(e)): [],
extensionRange: globalThis.Array.isArray(object?.extensionRange) ? object.extensionRange.map((e: any) => DescriptorProtoExtensionRange.fromJSON(e)): [],
oneofDecl: globalThis.Array.isArray(object?.oneofDecl) ? object.oneofDecl.map((e: any) => OneofDescriptorProto.fromJSON(e)): [],
options: isSet(object.options)
          ? MessageOptions.fromJSON(object.options)
          : undefined,
reservedRange: globalThis.Array.isArray(object?.reservedRange) ? object.reservedRange.map((e: any) => DescriptorProtoReservedRange.fromJSON(e)): [],
reservedName: globalThis.Array.isArray(object?.reservedName) ? object.reservedName.map((e: any) => globalThis.String(e)): [],
};
},

toJSON(message: DescriptorProto): unknown {
      const obj: any = {};
if (message.name !== undefined &&  message.name !== "") {
          obj.name = message.name;
        }
if (message.field?.length) {
          obj.field = message.field.map(e => FieldDescriptorProto.toJSON(e));
        }
if (message.extension?.length) {
          obj.extension = message.extension.map(e => FieldDescriptorProto.toJSON(e));
        }
if (message.nestedType?.length) {
          obj.nestedType = message.nestedType.map(e => DescriptorProto.toJSON(e));
        }
if (message.enumType?.length) {
          obj.enumType = message.enumType.map(e => EnumDescriptorProto.toJSON(e));
        }
if (message.extensionRange?.length) {
          obj.extensionRange = message.extensionRange.map(e => DescriptorProtoExtensionRange.toJSON(e));
        }
if (message.oneofDecl?.length) {
          obj.oneofDecl = message.oneofDecl.map(e => OneofDescriptorProto.toJSON(e));
        }
if (message.options !== undefined) {
          obj.options = MessageOptions.toJSON(message.options);
        }
if (message.reservedRange?.length) {
          obj.reservedRange = message.reservedRange.map(e => DescriptorProtoReservedRange.toJSON(e));
        }
if (message.reservedName?.length) {
          obj.reservedName = message.reservedName;
        }
return obj;
},

create<I extends Exact<DeepPartial<DescriptorProto>, I>>(base?: I): DescriptorProto {
        return DescriptorProto.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<DescriptorProto>, I>>(object: I): DescriptorProto {
const message = createBaseDescriptorProto();
message.name = object.name ?? "";
message.field = object.field?.map((e) => FieldDescriptorProto.fromPartial(e)) || [];
message.extension = object.extension?.map((e) => FieldDescriptorProto.fromPartial(e)) || [];
message.nestedType = object.nestedType?.map((e) => DescriptorProto.fromPartial(e)) || [];
message.enumType = object.enumType?.map((e) => EnumDescriptorProto.fromPartial(e)) || [];
message.extensionRange = object.extensionRange?.map((e) => DescriptorProtoExtensionRange.fromPartial(e)) || [];
message.oneofDecl = object.oneofDecl?.map((e) => OneofDescriptorProto.fromPartial(e)) || [];
message.options = (object.options !== undefined && object.options !== null)
          ? MessageOptions.fromPartial(object.options)
          : undefined;
message.reservedRange = object.reservedRange?.map((e) => DescriptorProtoReservedRange.fromPartial(e)) || [];
message.reservedName = object.reservedName?.map((e) => e) || [];
return message;
}
            };

messageTypeRegistry.set(DescriptorProto.$type, DescriptorProto);

function createBaseDescriptorProtoExtensionRange(): DescriptorProtoExtensionRange {
      return { $type: 'google.protobuf.DescriptorProto.ExtensionRange',start: 0,end: 0,options: undefined };
    }

export const DescriptorProtoExtensionRange = {
              $type: 'google.protobuf.DescriptorProto.ExtensionRange' as const,

encode(
      message: DescriptorProtoExtensionRange,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.start !== undefined &&  message.start !== 0) {
          writer.uint32(8).int32(message.start);
        }
if (message.end !== undefined &&  message.end !== 0) {
          writer.uint32(16).int32(message.end);
        }
if (message.options !== undefined) {
          ExtensionRangeOptions.encode(message.options, writer.uint32(26).fork()).ldelim();
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): DescriptorProtoExtensionRange {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseDescriptorProtoExtensionRange();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 8) {
        break;
      }
    
        message.start = reader.int32();
continue;
case 2:
if (tag !== 16) {
        break;
      }
    
        message.end = reader.int32();
continue;
case 3:
if (tag !== 26) {
        break;
      }
    
        message.options = ExtensionRangeOptions.decode(reader, reader.uint32());
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): DescriptorProtoExtensionRange {
      return {
$type: DescriptorProtoExtensionRange.$type,
start: isSet(object.start)
          ? globalThis.Number(object.start)
          : 0,
end: isSet(object.end)
          ? globalThis.Number(object.end)
          : 0,
options: isSet(object.options)
          ? ExtensionRangeOptions.fromJSON(object.options)
          : undefined,
};
},

toJSON(message: DescriptorProtoExtensionRange): unknown {
      const obj: any = {};
if (message.start !== undefined &&  message.start !== 0) {
          obj.start = Math.round(message.start);
        }
if (message.end !== undefined &&  message.end !== 0) {
          obj.end = Math.round(message.end);
        }
if (message.options !== undefined) {
          obj.options = ExtensionRangeOptions.toJSON(message.options);
        }
return obj;
},

create<I extends Exact<DeepPartial<DescriptorProtoExtensionRange>, I>>(base?: I): DescriptorProtoExtensionRange {
        return DescriptorProtoExtensionRange.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<DescriptorProtoExtensionRange>, I>>(object: I): DescriptorProtoExtensionRange {
const message = createBaseDescriptorProtoExtensionRange();
message.start = object.start ?? 0;
message.end = object.end ?? 0;
message.options = (object.options !== undefined && object.options !== null)
          ? ExtensionRangeOptions.fromPartial(object.options)
          : undefined;
return message;
}
            };

messageTypeRegistry.set(DescriptorProtoExtensionRange.$type, DescriptorProtoExtensionRange);

function createBaseDescriptorProtoReservedRange(): DescriptorProtoReservedRange {
      return { $type: 'google.protobuf.DescriptorProto.ReservedRange',start: 0,end: 0 };
    }

export const DescriptorProtoReservedRange = {
              $type: 'google.protobuf.DescriptorProto.ReservedRange' as const,

encode(
      message: DescriptorProtoReservedRange,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.start !== undefined &&  message.start !== 0) {
          writer.uint32(8).int32(message.start);
        }
if (message.end !== undefined &&  message.end !== 0) {
          writer.uint32(16).int32(message.end);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): DescriptorProtoReservedRange {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseDescriptorProtoReservedRange();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 8) {
        break;
      }
    
        message.start = reader.int32();
continue;
case 2:
if (tag !== 16) {
        break;
      }
    
        message.end = reader.int32();
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): DescriptorProtoReservedRange {
      return {
$type: DescriptorProtoReservedRange.$type,
start: isSet(object.start)
          ? globalThis.Number(object.start)
          : 0,
end: isSet(object.end)
          ? globalThis.Number(object.end)
          : 0,
};
},

toJSON(message: DescriptorProtoReservedRange): unknown {
      const obj: any = {};
if (message.start !== undefined &&  message.start !== 0) {
          obj.start = Math.round(message.start);
        }
if (message.end !== undefined &&  message.end !== 0) {
          obj.end = Math.round(message.end);
        }
return obj;
},

create<I extends Exact<DeepPartial<DescriptorProtoReservedRange>, I>>(base?: I): DescriptorProtoReservedRange {
        return DescriptorProtoReservedRange.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<DescriptorProtoReservedRange>, I>>(object: I): DescriptorProtoReservedRange {
const message = createBaseDescriptorProtoReservedRange();
message.start = object.start ?? 0;
message.end = object.end ?? 0;
return message;
}
            };

messageTypeRegistry.set(DescriptorProtoReservedRange.$type, DescriptorProtoReservedRange);

function createBaseExtensionRangeOptions(): ExtensionRangeOptions {
      return { $type: 'google.protobuf.ExtensionRangeOptions',uninterpretedOption: [],declaration: [],features: undefined,verification: 1 };
    }

export const ExtensionRangeOptions = {
              $type: 'google.protobuf.ExtensionRangeOptions' as const,

encode(
      message: ExtensionRangeOptions,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.uninterpretedOption !== undefined && message.uninterpretedOption.length !== 0) {
              
          for (const v of message.uninterpretedOption) {
            UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
          }
        
            }
if (message.declaration !== undefined && message.declaration.length !== 0) {
              
          for (const v of message.declaration) {
            ExtensionRangeOptionsDeclaration.encode(v!, writer.uint32(18).fork()).ldelim();
          }
        
            }
if (message.features !== undefined) {
          FeatureSet.encode(message.features, writer.uint32(402).fork()).ldelim();
        }
if (message.verification !== undefined &&  message.verification !== 1) {
          writer.uint32(24).int32(message.verification);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): ExtensionRangeOptions {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseExtensionRangeOptions();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 999:
if (tag !== 7994) {
        break;
      }
    
            
            message.uninterpretedOption!.push(UninterpretedOption.decode(reader, reader.uint32()));
continue;
case 2:
if (tag !== 18) {
        break;
      }
    
            
            message.declaration!.push(ExtensionRangeOptionsDeclaration.decode(reader, reader.uint32()));
continue;
case 50:
if (tag !== 402) {
        break;
      }
    
        message.features = FeatureSet.decode(reader, reader.uint32());
continue;
case 3:
if (tag !== 24) {
        break;
      }
    
        message.verification = reader.int32() as any;
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): ExtensionRangeOptions {
      return {
$type: ExtensionRangeOptions.$type,
uninterpretedOption: globalThis.Array.isArray(object?.uninterpretedOption) ? object.uninterpretedOption.map((e: any) => UninterpretedOption.fromJSON(e)): [],
declaration: globalThis.Array.isArray(object?.declaration) ? object.declaration.map((e: any) => ExtensionRangeOptionsDeclaration.fromJSON(e)): [],
features: isSet(object.features)
          ? FeatureSet.fromJSON(object.features)
          : undefined,
verification: isSet(object.verification)
          ? extensionRangeOptionsVerificationStateFromJSON(object.verification)
          : 1,
};
},

toJSON(message: ExtensionRangeOptions): unknown {
      const obj: any = {};
if (message.uninterpretedOption?.length) {
          obj.uninterpretedOption = message.uninterpretedOption.map(e => UninterpretedOption.toJSON(e));
        }
if (message.declaration?.length) {
          obj.declaration = message.declaration.map(e => ExtensionRangeOptionsDeclaration.toJSON(e));
        }
if (message.features !== undefined) {
          obj.features = FeatureSet.toJSON(message.features);
        }
if (message.verification !== undefined &&  message.verification !== 1) {
          obj.verification = extensionRangeOptionsVerificationStateToJSON(message.verification);
        }
return obj;
},

create<I extends Exact<DeepPartial<ExtensionRangeOptions>, I>>(base?: I): ExtensionRangeOptions {
        return ExtensionRangeOptions.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<ExtensionRangeOptions>, I>>(object: I): ExtensionRangeOptions {
const message = createBaseExtensionRangeOptions();
message.uninterpretedOption = object.uninterpretedOption?.map((e) => UninterpretedOption.fromPartial(e)) || [];
message.declaration = object.declaration?.map((e) => ExtensionRangeOptionsDeclaration.fromPartial(e)) || [];
message.features = (object.features !== undefined && object.features !== null)
          ? FeatureSet.fromPartial(object.features)
          : undefined;
message.verification = object.verification ?? 1;
return message;
}
            };

messageTypeRegistry.set(ExtensionRangeOptions.$type, ExtensionRangeOptions);

function createBaseExtensionRangeOptionsDeclaration(): ExtensionRangeOptionsDeclaration {
      return { $type: 'google.protobuf.ExtensionRangeOptions.Declaration',number: 0,fullName: "",type: "",reserved: false,repeated: false };
    }

export const ExtensionRangeOptionsDeclaration = {
              $type: 'google.protobuf.ExtensionRangeOptions.Declaration' as const,

encode(
      message: ExtensionRangeOptionsDeclaration,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.number !== undefined &&  message.number !== 0) {
          writer.uint32(8).int32(message.number);
        }
if (message.fullName !== undefined &&  message.fullName !== "") {
          writer.uint32(18).string(message.fullName);
        }
if (message.type !== undefined &&  message.type !== "") {
          writer.uint32(26).string(message.type);
        }
if (message.reserved !== undefined &&  message.reserved !== false) {
          writer.uint32(40).bool(message.reserved);
        }
if (message.repeated !== undefined &&  message.repeated !== false) {
          writer.uint32(48).bool(message.repeated);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): ExtensionRangeOptionsDeclaration {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseExtensionRangeOptionsDeclaration();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 8) {
        break;
      }
    
        message.number = reader.int32();
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
    
        message.type = reader.string();
continue;
case 5:
if (tag !== 40) {
        break;
      }
    
        message.reserved = reader.bool();
continue;
case 6:
if (tag !== 48) {
        break;
      }
    
        message.repeated = reader.bool();
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): ExtensionRangeOptionsDeclaration {
      return {
$type: ExtensionRangeOptionsDeclaration.$type,
number: isSet(object.number)
          ? globalThis.Number(object.number)
          : 0,
fullName: isSet(object.fullName)
          ? globalThis.String(object.fullName)
          : "",
type: isSet(object.type)
          ? globalThis.String(object.type)
          : "",
reserved: isSet(object.reserved)
          ? globalThis.Boolean(object.reserved)
          : false,
repeated: isSet(object.repeated)
          ? globalThis.Boolean(object.repeated)
          : false,
};
},

toJSON(message: ExtensionRangeOptionsDeclaration): unknown {
      const obj: any = {};
if (message.number !== undefined &&  message.number !== 0) {
          obj.number = Math.round(message.number);
        }
if (message.fullName !== undefined &&  message.fullName !== "") {
          obj.fullName = message.fullName;
        }
if (message.type !== undefined &&  message.type !== "") {
          obj.type = message.type;
        }
if (message.reserved !== undefined &&  message.reserved !== false) {
          obj.reserved = message.reserved;
        }
if (message.repeated !== undefined &&  message.repeated !== false) {
          obj.repeated = message.repeated;
        }
return obj;
},

create<I extends Exact<DeepPartial<ExtensionRangeOptionsDeclaration>, I>>(base?: I): ExtensionRangeOptionsDeclaration {
        return ExtensionRangeOptionsDeclaration.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<ExtensionRangeOptionsDeclaration>, I>>(object: I): ExtensionRangeOptionsDeclaration {
const message = createBaseExtensionRangeOptionsDeclaration();
message.number = object.number ?? 0;
message.fullName = object.fullName ?? "";
message.type = object.type ?? "";
message.reserved = object.reserved ?? false;
message.repeated = object.repeated ?? false;
return message;
}
            };

messageTypeRegistry.set(ExtensionRangeOptionsDeclaration.$type, ExtensionRangeOptionsDeclaration);

function createBaseFieldDescriptorProto(): FieldDescriptorProto {
      return { $type: 'google.protobuf.FieldDescriptorProto',name: "",number: 0,label: 1,type: 1,typeName: "",extendee: "",defaultValue: "",oneofIndex: 0,jsonName: "",options: undefined,proto3Optional: false };
    }

export const FieldDescriptorProto = {
              $type: 'google.protobuf.FieldDescriptorProto' as const,

encode(
      message: FieldDescriptorProto,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.name !== undefined &&  message.name !== "") {
          writer.uint32(10).string(message.name);
        }
if (message.number !== undefined &&  message.number !== 0) {
          writer.uint32(24).int32(message.number);
        }
if (message.label !== undefined &&  message.label !== 1) {
          writer.uint32(32).int32(message.label);
        }
if (message.type !== undefined &&  message.type !== 1) {
          writer.uint32(40).int32(message.type);
        }
if (message.typeName !== undefined &&  message.typeName !== "") {
          writer.uint32(50).string(message.typeName);
        }
if (message.extendee !== undefined &&  message.extendee !== "") {
          writer.uint32(18).string(message.extendee);
        }
if (message.defaultValue !== undefined &&  message.defaultValue !== "") {
          writer.uint32(58).string(message.defaultValue);
        }
if (message.oneofIndex !== undefined &&  message.oneofIndex !== 0) {
          writer.uint32(72).int32(message.oneofIndex);
        }
if (message.jsonName !== undefined &&  message.jsonName !== "") {
          writer.uint32(82).string(message.jsonName);
        }
if (message.options !== undefined) {
          FieldOptions.encode(message.options, writer.uint32(66).fork()).ldelim();
        }
if (message.proto3Optional !== undefined &&  message.proto3Optional !== false) {
          writer.uint32(136).bool(message.proto3Optional);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): FieldDescriptorProto {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseFieldDescriptorProto();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 10) {
        break;
      }
    
        message.name = reader.string();
continue;
case 3:
if (tag !== 24) {
        break;
      }
    
        message.number = reader.int32();
continue;
case 4:
if (tag !== 32) {
        break;
      }
    
        message.label = reader.int32() as any;
continue;
case 5:
if (tag !== 40) {
        break;
      }
    
        message.type = reader.int32() as any;
continue;
case 6:
if (tag !== 50) {
        break;
      }
    
        message.typeName = reader.string();
continue;
case 2:
if (tag !== 18) {
        break;
      }
    
        message.extendee = reader.string();
continue;
case 7:
if (tag !== 58) {
        break;
      }
    
        message.defaultValue = reader.string();
continue;
case 9:
if (tag !== 72) {
        break;
      }
    
        message.oneofIndex = reader.int32();
continue;
case 10:
if (tag !== 82) {
        break;
      }
    
        message.jsonName = reader.string();
continue;
case 8:
if (tag !== 66) {
        break;
      }
    
        message.options = FieldOptions.decode(reader, reader.uint32());
continue;
case 17:
if (tag !== 136) {
        break;
      }
    
        message.proto3Optional = reader.bool();
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): FieldDescriptorProto {
      return {
$type: FieldDescriptorProto.$type,
name: isSet(object.name)
          ? globalThis.String(object.name)
          : "",
number: isSet(object.number)
          ? globalThis.Number(object.number)
          : 0,
label: isSet(object.label)
          ? fieldDescriptorProtoLabelFromJSON(object.label)
          : 1,
type: isSet(object.type)
          ? fieldDescriptorProtoTypeFromJSON(object.type)
          : 1,
typeName: isSet(object.typeName)
          ? globalThis.String(object.typeName)
          : "",
extendee: isSet(object.extendee)
          ? globalThis.String(object.extendee)
          : "",
defaultValue: isSet(object.defaultValue)
          ? globalThis.String(object.defaultValue)
          : "",
oneofIndex: isSet(object.oneofIndex)
          ? globalThis.Number(object.oneofIndex)
          : 0,
jsonName: isSet(object.jsonName)
          ? globalThis.String(object.jsonName)
          : "",
options: isSet(object.options)
          ? FieldOptions.fromJSON(object.options)
          : undefined,
proto3Optional: isSet(object.proto3Optional)
          ? globalThis.Boolean(object.proto3Optional)
          : false,
};
},

toJSON(message: FieldDescriptorProto): unknown {
      const obj: any = {};
if (message.name !== undefined &&  message.name !== "") {
          obj.name = message.name;
        }
if (message.number !== undefined &&  message.number !== 0) {
          obj.number = Math.round(message.number);
        }
if (message.label !== undefined &&  message.label !== 1) {
          obj.label = fieldDescriptorProtoLabelToJSON(message.label);
        }
if (message.type !== undefined &&  message.type !== 1) {
          obj.type = fieldDescriptorProtoTypeToJSON(message.type);
        }
if (message.typeName !== undefined &&  message.typeName !== "") {
          obj.typeName = message.typeName;
        }
if (message.extendee !== undefined &&  message.extendee !== "") {
          obj.extendee = message.extendee;
        }
if (message.defaultValue !== undefined &&  message.defaultValue !== "") {
          obj.defaultValue = message.defaultValue;
        }
if (message.oneofIndex !== undefined &&  message.oneofIndex !== 0) {
          obj.oneofIndex = Math.round(message.oneofIndex);
        }
if (message.jsonName !== undefined &&  message.jsonName !== "") {
          obj.jsonName = message.jsonName;
        }
if (message.options !== undefined) {
          obj.options = FieldOptions.toJSON(message.options);
        }
if (message.proto3Optional !== undefined &&  message.proto3Optional !== false) {
          obj.proto3Optional = message.proto3Optional;
        }
return obj;
},

create<I extends Exact<DeepPartial<FieldDescriptorProto>, I>>(base?: I): FieldDescriptorProto {
        return FieldDescriptorProto.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<FieldDescriptorProto>, I>>(object: I): FieldDescriptorProto {
const message = createBaseFieldDescriptorProto();
message.name = object.name ?? "";
message.number = object.number ?? 0;
message.label = object.label ?? 1;
message.type = object.type ?? 1;
message.typeName = object.typeName ?? "";
message.extendee = object.extendee ?? "";
message.defaultValue = object.defaultValue ?? "";
message.oneofIndex = object.oneofIndex ?? 0;
message.jsonName = object.jsonName ?? "";
message.options = (object.options !== undefined && object.options !== null)
          ? FieldOptions.fromPartial(object.options)
          : undefined;
message.proto3Optional = object.proto3Optional ?? false;
return message;
}
            };

messageTypeRegistry.set(FieldDescriptorProto.$type, FieldDescriptorProto);

function createBaseOneofDescriptorProto(): OneofDescriptorProto {
      return { $type: 'google.protobuf.OneofDescriptorProto',name: "",options: undefined };
    }

export const OneofDescriptorProto = {
              $type: 'google.protobuf.OneofDescriptorProto' as const,

encode(
      message: OneofDescriptorProto,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.name !== undefined &&  message.name !== "") {
          writer.uint32(10).string(message.name);
        }
if (message.options !== undefined) {
          OneofOptions.encode(message.options, writer.uint32(18).fork()).ldelim();
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): OneofDescriptorProto {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseOneofDescriptorProto();
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
    
        message.options = OneofOptions.decode(reader, reader.uint32());
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): OneofDescriptorProto {
      return {
$type: OneofDescriptorProto.$type,
name: isSet(object.name)
          ? globalThis.String(object.name)
          : "",
options: isSet(object.options)
          ? OneofOptions.fromJSON(object.options)
          : undefined,
};
},

toJSON(message: OneofDescriptorProto): unknown {
      const obj: any = {};
if (message.name !== undefined &&  message.name !== "") {
          obj.name = message.name;
        }
if (message.options !== undefined) {
          obj.options = OneofOptions.toJSON(message.options);
        }
return obj;
},

create<I extends Exact<DeepPartial<OneofDescriptorProto>, I>>(base?: I): OneofDescriptorProto {
        return OneofDescriptorProto.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<OneofDescriptorProto>, I>>(object: I): OneofDescriptorProto {
const message = createBaseOneofDescriptorProto();
message.name = object.name ?? "";
message.options = (object.options !== undefined && object.options !== null)
          ? OneofOptions.fromPartial(object.options)
          : undefined;
return message;
}
            };

messageTypeRegistry.set(OneofDescriptorProto.$type, OneofDescriptorProto);

function createBaseEnumDescriptorProto(): EnumDescriptorProto {
      return { $type: 'google.protobuf.EnumDescriptorProto',name: "",value: [],options: undefined,reservedRange: [],reservedName: [] };
    }

export const EnumDescriptorProto = {
              $type: 'google.protobuf.EnumDescriptorProto' as const,

encode(
      message: EnumDescriptorProto,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.name !== undefined &&  message.name !== "") {
          writer.uint32(10).string(message.name);
        }
if (message.value !== undefined && message.value.length !== 0) {
              
          for (const v of message.value) {
            EnumValueDescriptorProto.encode(v!, writer.uint32(18).fork()).ldelim();
          }
        
            }
if (message.options !== undefined) {
          EnumOptions.encode(message.options, writer.uint32(26).fork()).ldelim();
        }
if (message.reservedRange !== undefined && message.reservedRange.length !== 0) {
              
          for (const v of message.reservedRange) {
            EnumDescriptorProtoEnumReservedRange.encode(v!, writer.uint32(34).fork()).ldelim();
          }
        
            }
if (message.reservedName !== undefined && message.reservedName.length !== 0) {
              
          for (const v of message.reservedName) {
            writer.uint32(42).string(v!);
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): EnumDescriptorProto {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseEnumDescriptorProto();
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
    
            
            message.value!.push(EnumValueDescriptorProto.decode(reader, reader.uint32()));
continue;
case 3:
if (tag !== 26) {
        break;
      }
    
        message.options = EnumOptions.decode(reader, reader.uint32());
continue;
case 4:
if (tag !== 34) {
        break;
      }
    
            
            message.reservedRange!.push(EnumDescriptorProtoEnumReservedRange.decode(reader, reader.uint32()));
continue;
case 5:
if (tag !== 42) {
        break;
      }
    
            
            message.reservedName!.push(reader.string());
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): EnumDescriptorProto {
      return {
$type: EnumDescriptorProto.$type,
name: isSet(object.name)
          ? globalThis.String(object.name)
          : "",
value: globalThis.Array.isArray(object?.value) ? object.value.map((e: any) => EnumValueDescriptorProto.fromJSON(e)): [],
options: isSet(object.options)
          ? EnumOptions.fromJSON(object.options)
          : undefined,
reservedRange: globalThis.Array.isArray(object?.reservedRange) ? object.reservedRange.map((e: any) => EnumDescriptorProtoEnumReservedRange.fromJSON(e)): [],
reservedName: globalThis.Array.isArray(object?.reservedName) ? object.reservedName.map((e: any) => globalThis.String(e)): [],
};
},

toJSON(message: EnumDescriptorProto): unknown {
      const obj: any = {};
if (message.name !== undefined &&  message.name !== "") {
          obj.name = message.name;
        }
if (message.value?.length) {
          obj.value = message.value.map(e => EnumValueDescriptorProto.toJSON(e));
        }
if (message.options !== undefined) {
          obj.options = EnumOptions.toJSON(message.options);
        }
if (message.reservedRange?.length) {
          obj.reservedRange = message.reservedRange.map(e => EnumDescriptorProtoEnumReservedRange.toJSON(e));
        }
if (message.reservedName?.length) {
          obj.reservedName = message.reservedName;
        }
return obj;
},

create<I extends Exact<DeepPartial<EnumDescriptorProto>, I>>(base?: I): EnumDescriptorProto {
        return EnumDescriptorProto.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<EnumDescriptorProto>, I>>(object: I): EnumDescriptorProto {
const message = createBaseEnumDescriptorProto();
message.name = object.name ?? "";
message.value = object.value?.map((e) => EnumValueDescriptorProto.fromPartial(e)) || [];
message.options = (object.options !== undefined && object.options !== null)
          ? EnumOptions.fromPartial(object.options)
          : undefined;
message.reservedRange = object.reservedRange?.map((e) => EnumDescriptorProtoEnumReservedRange.fromPartial(e)) || [];
message.reservedName = object.reservedName?.map((e) => e) || [];
return message;
}
            };

messageTypeRegistry.set(EnumDescriptorProto.$type, EnumDescriptorProto);

function createBaseEnumDescriptorProtoEnumReservedRange(): EnumDescriptorProtoEnumReservedRange {
      return { $type: 'google.protobuf.EnumDescriptorProto.EnumReservedRange',start: 0,end: 0 };
    }

export const EnumDescriptorProtoEnumReservedRange = {
              $type: 'google.protobuf.EnumDescriptorProto.EnumReservedRange' as const,

encode(
      message: EnumDescriptorProtoEnumReservedRange,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.start !== undefined &&  message.start !== 0) {
          writer.uint32(8).int32(message.start);
        }
if (message.end !== undefined &&  message.end !== 0) {
          writer.uint32(16).int32(message.end);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): EnumDescriptorProtoEnumReservedRange {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseEnumDescriptorProtoEnumReservedRange();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 8) {
        break;
      }
    
        message.start = reader.int32();
continue;
case 2:
if (tag !== 16) {
        break;
      }
    
        message.end = reader.int32();
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): EnumDescriptorProtoEnumReservedRange {
      return {
$type: EnumDescriptorProtoEnumReservedRange.$type,
start: isSet(object.start)
          ? globalThis.Number(object.start)
          : 0,
end: isSet(object.end)
          ? globalThis.Number(object.end)
          : 0,
};
},

toJSON(message: EnumDescriptorProtoEnumReservedRange): unknown {
      const obj: any = {};
if (message.start !== undefined &&  message.start !== 0) {
          obj.start = Math.round(message.start);
        }
if (message.end !== undefined &&  message.end !== 0) {
          obj.end = Math.round(message.end);
        }
return obj;
},

create<I extends Exact<DeepPartial<EnumDescriptorProtoEnumReservedRange>, I>>(base?: I): EnumDescriptorProtoEnumReservedRange {
        return EnumDescriptorProtoEnumReservedRange.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<EnumDescriptorProtoEnumReservedRange>, I>>(object: I): EnumDescriptorProtoEnumReservedRange {
const message = createBaseEnumDescriptorProtoEnumReservedRange();
message.start = object.start ?? 0;
message.end = object.end ?? 0;
return message;
}
            };

messageTypeRegistry.set(EnumDescriptorProtoEnumReservedRange.$type, EnumDescriptorProtoEnumReservedRange);

function createBaseEnumValueDescriptorProto(): EnumValueDescriptorProto {
      return { $type: 'google.protobuf.EnumValueDescriptorProto',name: "",number: 0,options: undefined };
    }

export const EnumValueDescriptorProto = {
              $type: 'google.protobuf.EnumValueDescriptorProto' as const,

encode(
      message: EnumValueDescriptorProto,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.name !== undefined &&  message.name !== "") {
          writer.uint32(10).string(message.name);
        }
if (message.number !== undefined &&  message.number !== 0) {
          writer.uint32(16).int32(message.number);
        }
if (message.options !== undefined) {
          EnumValueOptions.encode(message.options, writer.uint32(26).fork()).ldelim();
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): EnumValueDescriptorProto {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseEnumValueDescriptorProto();
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
if (tag !== 16) {
        break;
      }
    
        message.number = reader.int32();
continue;
case 3:
if (tag !== 26) {
        break;
      }
    
        message.options = EnumValueOptions.decode(reader, reader.uint32());
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): EnumValueDescriptorProto {
      return {
$type: EnumValueDescriptorProto.$type,
name: isSet(object.name)
          ? globalThis.String(object.name)
          : "",
number: isSet(object.number)
          ? globalThis.Number(object.number)
          : 0,
options: isSet(object.options)
          ? EnumValueOptions.fromJSON(object.options)
          : undefined,
};
},

toJSON(message: EnumValueDescriptorProto): unknown {
      const obj: any = {};
if (message.name !== undefined &&  message.name !== "") {
          obj.name = message.name;
        }
if (message.number !== undefined &&  message.number !== 0) {
          obj.number = Math.round(message.number);
        }
if (message.options !== undefined) {
          obj.options = EnumValueOptions.toJSON(message.options);
        }
return obj;
},

create<I extends Exact<DeepPartial<EnumValueDescriptorProto>, I>>(base?: I): EnumValueDescriptorProto {
        return EnumValueDescriptorProto.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<EnumValueDescriptorProto>, I>>(object: I): EnumValueDescriptorProto {
const message = createBaseEnumValueDescriptorProto();
message.name = object.name ?? "";
message.number = object.number ?? 0;
message.options = (object.options !== undefined && object.options !== null)
          ? EnumValueOptions.fromPartial(object.options)
          : undefined;
return message;
}
            };

messageTypeRegistry.set(EnumValueDescriptorProto.$type, EnumValueDescriptorProto);

function createBaseServiceDescriptorProto(): ServiceDescriptorProto {
      return { $type: 'google.protobuf.ServiceDescriptorProto',name: "",method: [],options: undefined };
    }

export const ServiceDescriptorProto = {
              $type: 'google.protobuf.ServiceDescriptorProto' as const,

encode(
      message: ServiceDescriptorProto,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.name !== undefined &&  message.name !== "") {
          writer.uint32(10).string(message.name);
        }
if (message.method !== undefined && message.method.length !== 0) {
              
          for (const v of message.method) {
            MethodDescriptorProto.encode(v!, writer.uint32(18).fork()).ldelim();
          }
        
            }
if (message.options !== undefined) {
          ServiceOptions.encode(message.options, writer.uint32(26).fork()).ldelim();
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): ServiceDescriptorProto {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseServiceDescriptorProto();
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
    
            
            message.method!.push(MethodDescriptorProto.decode(reader, reader.uint32()));
continue;
case 3:
if (tag !== 26) {
        break;
      }
    
        message.options = ServiceOptions.decode(reader, reader.uint32());
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): ServiceDescriptorProto {
      return {
$type: ServiceDescriptorProto.$type,
name: isSet(object.name)
          ? globalThis.String(object.name)
          : "",
method: globalThis.Array.isArray(object?.method) ? object.method.map((e: any) => MethodDescriptorProto.fromJSON(e)): [],
options: isSet(object.options)
          ? ServiceOptions.fromJSON(object.options)
          : undefined,
};
},

toJSON(message: ServiceDescriptorProto): unknown {
      const obj: any = {};
if (message.name !== undefined &&  message.name !== "") {
          obj.name = message.name;
        }
if (message.method?.length) {
          obj.method = message.method.map(e => MethodDescriptorProto.toJSON(e));
        }
if (message.options !== undefined) {
          obj.options = ServiceOptions.toJSON(message.options);
        }
return obj;
},

create<I extends Exact<DeepPartial<ServiceDescriptorProto>, I>>(base?: I): ServiceDescriptorProto {
        return ServiceDescriptorProto.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<ServiceDescriptorProto>, I>>(object: I): ServiceDescriptorProto {
const message = createBaseServiceDescriptorProto();
message.name = object.name ?? "";
message.method = object.method?.map((e) => MethodDescriptorProto.fromPartial(e)) || [];
message.options = (object.options !== undefined && object.options !== null)
          ? ServiceOptions.fromPartial(object.options)
          : undefined;
return message;
}
            };

messageTypeRegistry.set(ServiceDescriptorProto.$type, ServiceDescriptorProto);

function createBaseMethodDescriptorProto(): MethodDescriptorProto {
      return { $type: 'google.protobuf.MethodDescriptorProto',name: "",inputType: "",outputType: "",options: undefined,clientStreaming: false,serverStreaming: false };
    }

export const MethodDescriptorProto = {
              $type: 'google.protobuf.MethodDescriptorProto' as const,

encode(
      message: MethodDescriptorProto,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.name !== undefined &&  message.name !== "") {
          writer.uint32(10).string(message.name);
        }
if (message.inputType !== undefined &&  message.inputType !== "") {
          writer.uint32(18).string(message.inputType);
        }
if (message.outputType !== undefined &&  message.outputType !== "") {
          writer.uint32(26).string(message.outputType);
        }
if (message.options !== undefined) {
          MethodOptions.encode(message.options, writer.uint32(34).fork()).ldelim();
        }
if (message.clientStreaming !== undefined &&  message.clientStreaming !== false) {
          writer.uint32(40).bool(message.clientStreaming);
        }
if (message.serverStreaming !== undefined &&  message.serverStreaming !== false) {
          writer.uint32(48).bool(message.serverStreaming);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): MethodDescriptorProto {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseMethodDescriptorProto();
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
    
        message.inputType = reader.string();
continue;
case 3:
if (tag !== 26) {
        break;
      }
    
        message.outputType = reader.string();
continue;
case 4:
if (tag !== 34) {
        break;
      }
    
        message.options = MethodOptions.decode(reader, reader.uint32());
continue;
case 5:
if (tag !== 40) {
        break;
      }
    
        message.clientStreaming = reader.bool();
continue;
case 6:
if (tag !== 48) {
        break;
      }
    
        message.serverStreaming = reader.bool();
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): MethodDescriptorProto {
      return {
$type: MethodDescriptorProto.$type,
name: isSet(object.name)
          ? globalThis.String(object.name)
          : "",
inputType: isSet(object.inputType)
          ? globalThis.String(object.inputType)
          : "",
outputType: isSet(object.outputType)
          ? globalThis.String(object.outputType)
          : "",
options: isSet(object.options)
          ? MethodOptions.fromJSON(object.options)
          : undefined,
clientStreaming: isSet(object.clientStreaming)
          ? globalThis.Boolean(object.clientStreaming)
          : false,
serverStreaming: isSet(object.serverStreaming)
          ? globalThis.Boolean(object.serverStreaming)
          : false,
};
},

toJSON(message: MethodDescriptorProto): unknown {
      const obj: any = {};
if (message.name !== undefined &&  message.name !== "") {
          obj.name = message.name;
        }
if (message.inputType !== undefined &&  message.inputType !== "") {
          obj.inputType = message.inputType;
        }
if (message.outputType !== undefined &&  message.outputType !== "") {
          obj.outputType = message.outputType;
        }
if (message.options !== undefined) {
          obj.options = MethodOptions.toJSON(message.options);
        }
if (message.clientStreaming !== undefined &&  message.clientStreaming !== false) {
          obj.clientStreaming = message.clientStreaming;
        }
if (message.serverStreaming !== undefined &&  message.serverStreaming !== false) {
          obj.serverStreaming = message.serverStreaming;
        }
return obj;
},

create<I extends Exact<DeepPartial<MethodDescriptorProto>, I>>(base?: I): MethodDescriptorProto {
        return MethodDescriptorProto.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<MethodDescriptorProto>, I>>(object: I): MethodDescriptorProto {
const message = createBaseMethodDescriptorProto();
message.name = object.name ?? "";
message.inputType = object.inputType ?? "";
message.outputType = object.outputType ?? "";
message.options = (object.options !== undefined && object.options !== null)
          ? MethodOptions.fromPartial(object.options)
          : undefined;
message.clientStreaming = object.clientStreaming ?? false;
message.serverStreaming = object.serverStreaming ?? false;
return message;
}
            };

messageTypeRegistry.set(MethodDescriptorProto.$type, MethodDescriptorProto);

function createBaseFileOptions(): FileOptions {
      return { $type: 'google.protobuf.FileOptions',javaPackage: "",javaOuterClassname: "",javaMultipleFiles: false,javaGenerateEqualsAndHash: false,javaStringCheckUtf8: false,optimizeFor: 1,goPackage: "",ccGenericServices: false,javaGenericServices: false,pyGenericServices: false,deprecated: false,ccEnableArenas: true,objcClassPrefix: "",csharpNamespace: "",swiftPrefix: "",phpClassPrefix: "",phpNamespace: "",phpMetadataNamespace: "",rubyPackage: "",features: undefined,uninterpretedOption: [] };
    }

export const FileOptions = {
              $type: 'google.protobuf.FileOptions' as const,

encode(
      message: FileOptions,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.javaPackage !== undefined &&  message.javaPackage !== "") {
          writer.uint32(10).string(message.javaPackage);
        }
if (message.javaOuterClassname !== undefined &&  message.javaOuterClassname !== "") {
          writer.uint32(66).string(message.javaOuterClassname);
        }
if (message.javaMultipleFiles !== undefined &&  message.javaMultipleFiles !== false) {
          writer.uint32(80).bool(message.javaMultipleFiles);
        }
if (message.javaGenerateEqualsAndHash !== undefined &&  message.javaGenerateEqualsAndHash !== false) {
          writer.uint32(160).bool(message.javaGenerateEqualsAndHash);
        }
if (message.javaStringCheckUtf8 !== undefined &&  message.javaStringCheckUtf8 !== false) {
          writer.uint32(216).bool(message.javaStringCheckUtf8);
        }
if (message.optimizeFor !== undefined &&  message.optimizeFor !== 1) {
          writer.uint32(72).int32(message.optimizeFor);
        }
if (message.goPackage !== undefined &&  message.goPackage !== "") {
          writer.uint32(90).string(message.goPackage);
        }
if (message.ccGenericServices !== undefined &&  message.ccGenericServices !== false) {
          writer.uint32(128).bool(message.ccGenericServices);
        }
if (message.javaGenericServices !== undefined &&  message.javaGenericServices !== false) {
          writer.uint32(136).bool(message.javaGenericServices);
        }
if (message.pyGenericServices !== undefined &&  message.pyGenericServices !== false) {
          writer.uint32(144).bool(message.pyGenericServices);
        }
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          writer.uint32(184).bool(message.deprecated);
        }
if (message.ccEnableArenas !== undefined &&  message.ccEnableArenas !== true) {
          writer.uint32(248).bool(message.ccEnableArenas);
        }
if (message.objcClassPrefix !== undefined &&  message.objcClassPrefix !== "") {
          writer.uint32(290).string(message.objcClassPrefix);
        }
if (message.csharpNamespace !== undefined &&  message.csharpNamespace !== "") {
          writer.uint32(298).string(message.csharpNamespace);
        }
if (message.swiftPrefix !== undefined &&  message.swiftPrefix !== "") {
          writer.uint32(314).string(message.swiftPrefix);
        }
if (message.phpClassPrefix !== undefined &&  message.phpClassPrefix !== "") {
          writer.uint32(322).string(message.phpClassPrefix);
        }
if (message.phpNamespace !== undefined &&  message.phpNamespace !== "") {
          writer.uint32(330).string(message.phpNamespace);
        }
if (message.phpMetadataNamespace !== undefined &&  message.phpMetadataNamespace !== "") {
          writer.uint32(354).string(message.phpMetadataNamespace);
        }
if (message.rubyPackage !== undefined &&  message.rubyPackage !== "") {
          writer.uint32(362).string(message.rubyPackage);
        }
if (message.features !== undefined) {
          FeatureSet.encode(message.features, writer.uint32(402).fork()).ldelim();
        }
if (message.uninterpretedOption !== undefined && message.uninterpretedOption.length !== 0) {
              
          for (const v of message.uninterpretedOption) {
            UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): FileOptions {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseFileOptions();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 10) {
        break;
      }
    
        message.javaPackage = reader.string();
continue;
case 8:
if (tag !== 66) {
        break;
      }
    
        message.javaOuterClassname = reader.string();
continue;
case 10:
if (tag !== 80) {
        break;
      }
    
        message.javaMultipleFiles = reader.bool();
continue;
case 20:
if (tag !== 160) {
        break;
      }
    
        message.javaGenerateEqualsAndHash = reader.bool();
continue;
case 27:
if (tag !== 216) {
        break;
      }
    
        message.javaStringCheckUtf8 = reader.bool();
continue;
case 9:
if (tag !== 72) {
        break;
      }
    
        message.optimizeFor = reader.int32() as any;
continue;
case 11:
if (tag !== 90) {
        break;
      }
    
        message.goPackage = reader.string();
continue;
case 16:
if (tag !== 128) {
        break;
      }
    
        message.ccGenericServices = reader.bool();
continue;
case 17:
if (tag !== 136) {
        break;
      }
    
        message.javaGenericServices = reader.bool();
continue;
case 18:
if (tag !== 144) {
        break;
      }
    
        message.pyGenericServices = reader.bool();
continue;
case 23:
if (tag !== 184) {
        break;
      }
    
        message.deprecated = reader.bool();
continue;
case 31:
if (tag !== 248) {
        break;
      }
    
        message.ccEnableArenas = reader.bool();
continue;
case 36:
if (tag !== 290) {
        break;
      }
    
        message.objcClassPrefix = reader.string();
continue;
case 37:
if (tag !== 298) {
        break;
      }
    
        message.csharpNamespace = reader.string();
continue;
case 39:
if (tag !== 314) {
        break;
      }
    
        message.swiftPrefix = reader.string();
continue;
case 40:
if (tag !== 322) {
        break;
      }
    
        message.phpClassPrefix = reader.string();
continue;
case 41:
if (tag !== 330) {
        break;
      }
    
        message.phpNamespace = reader.string();
continue;
case 44:
if (tag !== 354) {
        break;
      }
    
        message.phpMetadataNamespace = reader.string();
continue;
case 45:
if (tag !== 362) {
        break;
      }
    
        message.rubyPackage = reader.string();
continue;
case 50:
if (tag !== 402) {
        break;
      }
    
        message.features = FeatureSet.decode(reader, reader.uint32());
continue;
case 999:
if (tag !== 7994) {
        break;
      }
    
            
            message.uninterpretedOption!.push(UninterpretedOption.decode(reader, reader.uint32()));
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): FileOptions {
      return {
$type: FileOptions.$type,
javaPackage: isSet(object.javaPackage)
          ? globalThis.String(object.javaPackage)
          : "",
javaOuterClassname: isSet(object.javaOuterClassname)
          ? globalThis.String(object.javaOuterClassname)
          : "",
javaMultipleFiles: isSet(object.javaMultipleFiles)
          ? globalThis.Boolean(object.javaMultipleFiles)
          : false,
javaGenerateEqualsAndHash: isSet(object.javaGenerateEqualsAndHash)
          ? globalThis.Boolean(object.javaGenerateEqualsAndHash)
          : false,
javaStringCheckUtf8: isSet(object.javaStringCheckUtf8)
          ? globalThis.Boolean(object.javaStringCheckUtf8)
          : false,
optimizeFor: isSet(object.optimizeFor)
          ? fileOptionsOptimizeModeFromJSON(object.optimizeFor)
          : 1,
goPackage: isSet(object.goPackage)
          ? globalThis.String(object.goPackage)
          : "",
ccGenericServices: isSet(object.ccGenericServices)
          ? globalThis.Boolean(object.ccGenericServices)
          : false,
javaGenericServices: isSet(object.javaGenericServices)
          ? globalThis.Boolean(object.javaGenericServices)
          : false,
pyGenericServices: isSet(object.pyGenericServices)
          ? globalThis.Boolean(object.pyGenericServices)
          : false,
deprecated: isSet(object.deprecated)
          ? globalThis.Boolean(object.deprecated)
          : false,
ccEnableArenas: isSet(object.ccEnableArenas)
          ? globalThis.Boolean(object.ccEnableArenas)
          : true,
objcClassPrefix: isSet(object.objcClassPrefix)
          ? globalThis.String(object.objcClassPrefix)
          : "",
csharpNamespace: isSet(object.csharpNamespace)
          ? globalThis.String(object.csharpNamespace)
          : "",
swiftPrefix: isSet(object.swiftPrefix)
          ? globalThis.String(object.swiftPrefix)
          : "",
phpClassPrefix: isSet(object.phpClassPrefix)
          ? globalThis.String(object.phpClassPrefix)
          : "",
phpNamespace: isSet(object.phpNamespace)
          ? globalThis.String(object.phpNamespace)
          : "",
phpMetadataNamespace: isSet(object.phpMetadataNamespace)
          ? globalThis.String(object.phpMetadataNamespace)
          : "",
rubyPackage: isSet(object.rubyPackage)
          ? globalThis.String(object.rubyPackage)
          : "",
features: isSet(object.features)
          ? FeatureSet.fromJSON(object.features)
          : undefined,
uninterpretedOption: globalThis.Array.isArray(object?.uninterpretedOption) ? object.uninterpretedOption.map((e: any) => UninterpretedOption.fromJSON(e)): [],
};
},

toJSON(message: FileOptions): unknown {
      const obj: any = {};
if (message.javaPackage !== undefined &&  message.javaPackage !== "") {
          obj.javaPackage = message.javaPackage;
        }
if (message.javaOuterClassname !== undefined &&  message.javaOuterClassname !== "") {
          obj.javaOuterClassname = message.javaOuterClassname;
        }
if (message.javaMultipleFiles !== undefined &&  message.javaMultipleFiles !== false) {
          obj.javaMultipleFiles = message.javaMultipleFiles;
        }
if (message.javaGenerateEqualsAndHash !== undefined &&  message.javaGenerateEqualsAndHash !== false) {
          obj.javaGenerateEqualsAndHash = message.javaGenerateEqualsAndHash;
        }
if (message.javaStringCheckUtf8 !== undefined &&  message.javaStringCheckUtf8 !== false) {
          obj.javaStringCheckUtf8 = message.javaStringCheckUtf8;
        }
if (message.optimizeFor !== undefined &&  message.optimizeFor !== 1) {
          obj.optimizeFor = fileOptionsOptimizeModeToJSON(message.optimizeFor);
        }
if (message.goPackage !== undefined &&  message.goPackage !== "") {
          obj.goPackage = message.goPackage;
        }
if (message.ccGenericServices !== undefined &&  message.ccGenericServices !== false) {
          obj.ccGenericServices = message.ccGenericServices;
        }
if (message.javaGenericServices !== undefined &&  message.javaGenericServices !== false) {
          obj.javaGenericServices = message.javaGenericServices;
        }
if (message.pyGenericServices !== undefined &&  message.pyGenericServices !== false) {
          obj.pyGenericServices = message.pyGenericServices;
        }
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          obj.deprecated = message.deprecated;
        }
if (message.ccEnableArenas !== undefined &&  message.ccEnableArenas !== true) {
          obj.ccEnableArenas = message.ccEnableArenas;
        }
if (message.objcClassPrefix !== undefined &&  message.objcClassPrefix !== "") {
          obj.objcClassPrefix = message.objcClassPrefix;
        }
if (message.csharpNamespace !== undefined &&  message.csharpNamespace !== "") {
          obj.csharpNamespace = message.csharpNamespace;
        }
if (message.swiftPrefix !== undefined &&  message.swiftPrefix !== "") {
          obj.swiftPrefix = message.swiftPrefix;
        }
if (message.phpClassPrefix !== undefined &&  message.phpClassPrefix !== "") {
          obj.phpClassPrefix = message.phpClassPrefix;
        }
if (message.phpNamespace !== undefined &&  message.phpNamespace !== "") {
          obj.phpNamespace = message.phpNamespace;
        }
if (message.phpMetadataNamespace !== undefined &&  message.phpMetadataNamespace !== "") {
          obj.phpMetadataNamespace = message.phpMetadataNamespace;
        }
if (message.rubyPackage !== undefined &&  message.rubyPackage !== "") {
          obj.rubyPackage = message.rubyPackage;
        }
if (message.features !== undefined) {
          obj.features = FeatureSet.toJSON(message.features);
        }
if (message.uninterpretedOption?.length) {
          obj.uninterpretedOption = message.uninterpretedOption.map(e => UninterpretedOption.toJSON(e));
        }
return obj;
},

create<I extends Exact<DeepPartial<FileOptions>, I>>(base?: I): FileOptions {
        return FileOptions.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<FileOptions>, I>>(object: I): FileOptions {
const message = createBaseFileOptions();
message.javaPackage = object.javaPackage ?? "";
message.javaOuterClassname = object.javaOuterClassname ?? "";
message.javaMultipleFiles = object.javaMultipleFiles ?? false;
message.javaGenerateEqualsAndHash = object.javaGenerateEqualsAndHash ?? false;
message.javaStringCheckUtf8 = object.javaStringCheckUtf8 ?? false;
message.optimizeFor = object.optimizeFor ?? 1;
message.goPackage = object.goPackage ?? "";
message.ccGenericServices = object.ccGenericServices ?? false;
message.javaGenericServices = object.javaGenericServices ?? false;
message.pyGenericServices = object.pyGenericServices ?? false;
message.deprecated = object.deprecated ?? false;
message.ccEnableArenas = object.ccEnableArenas ?? true;
message.objcClassPrefix = object.objcClassPrefix ?? "";
message.csharpNamespace = object.csharpNamespace ?? "";
message.swiftPrefix = object.swiftPrefix ?? "";
message.phpClassPrefix = object.phpClassPrefix ?? "";
message.phpNamespace = object.phpNamespace ?? "";
message.phpMetadataNamespace = object.phpMetadataNamespace ?? "";
message.rubyPackage = object.rubyPackage ?? "";
message.features = (object.features !== undefined && object.features !== null)
          ? FeatureSet.fromPartial(object.features)
          : undefined;
message.uninterpretedOption = object.uninterpretedOption?.map((e) => UninterpretedOption.fromPartial(e)) || [];
return message;
}
            };

messageTypeRegistry.set(FileOptions.$type, FileOptions);

function createBaseMessageOptions(): MessageOptions {
      return { $type: 'google.protobuf.MessageOptions',messageSetWireFormat: false,noStandardDescriptorAccessor: false,deprecated: false,mapEntry: false,deprecatedLegacyJsonFieldConflicts: false,features: undefined,uninterpretedOption: [] };
    }

export const MessageOptions = {
              $type: 'google.protobuf.MessageOptions' as const,

encode(
      message: MessageOptions,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.messageSetWireFormat !== undefined &&  message.messageSetWireFormat !== false) {
          writer.uint32(8).bool(message.messageSetWireFormat);
        }
if (message.noStandardDescriptorAccessor !== undefined &&  message.noStandardDescriptorAccessor !== false) {
          writer.uint32(16).bool(message.noStandardDescriptorAccessor);
        }
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          writer.uint32(24).bool(message.deprecated);
        }
if (message.mapEntry !== undefined &&  message.mapEntry !== false) {
          writer.uint32(56).bool(message.mapEntry);
        }
if (message.deprecatedLegacyJsonFieldConflicts !== undefined &&  message.deprecatedLegacyJsonFieldConflicts !== false) {
          writer.uint32(88).bool(message.deprecatedLegacyJsonFieldConflicts);
        }
if (message.features !== undefined) {
          FeatureSet.encode(message.features, writer.uint32(98).fork()).ldelim();
        }
if (message.uninterpretedOption !== undefined && message.uninterpretedOption.length !== 0) {
              
          for (const v of message.uninterpretedOption) {
            UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): MessageOptions {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseMessageOptions();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 8) {
        break;
      }
    
        message.messageSetWireFormat = reader.bool();
continue;
case 2:
if (tag !== 16) {
        break;
      }
    
        message.noStandardDescriptorAccessor = reader.bool();
continue;
case 3:
if (tag !== 24) {
        break;
      }
    
        message.deprecated = reader.bool();
continue;
case 7:
if (tag !== 56) {
        break;
      }
    
        message.mapEntry = reader.bool();
continue;
case 11:
if (tag !== 88) {
        break;
      }
    
        message.deprecatedLegacyJsonFieldConflicts = reader.bool();
continue;
case 12:
if (tag !== 98) {
        break;
      }
    
        message.features = FeatureSet.decode(reader, reader.uint32());
continue;
case 999:
if (tag !== 7994) {
        break;
      }
    
            
            message.uninterpretedOption!.push(UninterpretedOption.decode(reader, reader.uint32()));
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): MessageOptions {
      return {
$type: MessageOptions.$type,
messageSetWireFormat: isSet(object.messageSetWireFormat)
          ? globalThis.Boolean(object.messageSetWireFormat)
          : false,
noStandardDescriptorAccessor: isSet(object.noStandardDescriptorAccessor)
          ? globalThis.Boolean(object.noStandardDescriptorAccessor)
          : false,
deprecated: isSet(object.deprecated)
          ? globalThis.Boolean(object.deprecated)
          : false,
mapEntry: isSet(object.mapEntry)
          ? globalThis.Boolean(object.mapEntry)
          : false,
deprecatedLegacyJsonFieldConflicts: isSet(object.deprecatedLegacyJsonFieldConflicts)
          ? globalThis.Boolean(object.deprecatedLegacyJsonFieldConflicts)
          : false,
features: isSet(object.features)
          ? FeatureSet.fromJSON(object.features)
          : undefined,
uninterpretedOption: globalThis.Array.isArray(object?.uninterpretedOption) ? object.uninterpretedOption.map((e: any) => UninterpretedOption.fromJSON(e)): [],
};
},

toJSON(message: MessageOptions): unknown {
      const obj: any = {};
if (message.messageSetWireFormat !== undefined &&  message.messageSetWireFormat !== false) {
          obj.messageSetWireFormat = message.messageSetWireFormat;
        }
if (message.noStandardDescriptorAccessor !== undefined &&  message.noStandardDescriptorAccessor !== false) {
          obj.noStandardDescriptorAccessor = message.noStandardDescriptorAccessor;
        }
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          obj.deprecated = message.deprecated;
        }
if (message.mapEntry !== undefined &&  message.mapEntry !== false) {
          obj.mapEntry = message.mapEntry;
        }
if (message.deprecatedLegacyJsonFieldConflicts !== undefined &&  message.deprecatedLegacyJsonFieldConflicts !== false) {
          obj.deprecatedLegacyJsonFieldConflicts = message.deprecatedLegacyJsonFieldConflicts;
        }
if (message.features !== undefined) {
          obj.features = FeatureSet.toJSON(message.features);
        }
if (message.uninterpretedOption?.length) {
          obj.uninterpretedOption = message.uninterpretedOption.map(e => UninterpretedOption.toJSON(e));
        }
return obj;
},

create<I extends Exact<DeepPartial<MessageOptions>, I>>(base?: I): MessageOptions {
        return MessageOptions.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<MessageOptions>, I>>(object: I): MessageOptions {
const message = createBaseMessageOptions();
message.messageSetWireFormat = object.messageSetWireFormat ?? false;
message.noStandardDescriptorAccessor = object.noStandardDescriptorAccessor ?? false;
message.deprecated = object.deprecated ?? false;
message.mapEntry = object.mapEntry ?? false;
message.deprecatedLegacyJsonFieldConflicts = object.deprecatedLegacyJsonFieldConflicts ?? false;
message.features = (object.features !== undefined && object.features !== null)
          ? FeatureSet.fromPartial(object.features)
          : undefined;
message.uninterpretedOption = object.uninterpretedOption?.map((e) => UninterpretedOption.fromPartial(e)) || [];
return message;
}
            };

messageTypeRegistry.set(MessageOptions.$type, MessageOptions);

function createBaseFieldOptions(): FieldOptions {
      return { $type: 'google.protobuf.FieldOptions',ctype: 0,packed: false,jstype: 0,lazy: false,unverifiedLazy: false,deprecated: false,weak: false,debugRedact: false,retention: 0,targets: [],editionDefaults: [],features: undefined,featureSupport: undefined,uninterpretedOption: [] };
    }

export const FieldOptions = {
              $type: 'google.protobuf.FieldOptions' as const,

encode(
      message: FieldOptions,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.ctype !== undefined &&  message.ctype !== 0) {
          writer.uint32(8).int32(message.ctype);
        }
if (message.packed !== undefined &&  message.packed !== false) {
          writer.uint32(16).bool(message.packed);
        }
if (message.jstype !== undefined &&  message.jstype !== 0) {
          writer.uint32(48).int32(message.jstype);
        }
if (message.lazy !== undefined &&  message.lazy !== false) {
          writer.uint32(40).bool(message.lazy);
        }
if (message.unverifiedLazy !== undefined &&  message.unverifiedLazy !== false) {
          writer.uint32(120).bool(message.unverifiedLazy);
        }
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          writer.uint32(24).bool(message.deprecated);
        }
if (message.weak !== undefined &&  message.weak !== false) {
          writer.uint32(80).bool(message.weak);
        }
if (message.debugRedact !== undefined &&  message.debugRedact !== false) {
          writer.uint32(128).bool(message.debugRedact);
        }
if (message.retention !== undefined &&  message.retention !== 0) {
          writer.uint32(136).int32(message.retention);
        }
if (message.targets !== undefined && message.targets.length !== 0) {
              
          writer.uint32(154).fork();
          for (const v of message.targets) {
            writer.int32(v);
          }
          writer.ldelim();
        
            }
if (message.editionDefaults !== undefined && message.editionDefaults.length !== 0) {
              
          for (const v of message.editionDefaults) {
            FieldOptionsEditionDefault.encode(v!, writer.uint32(162).fork()).ldelim();
          }
        
            }
if (message.features !== undefined) {
          FeatureSet.encode(message.features, writer.uint32(170).fork()).ldelim();
        }
if (message.featureSupport !== undefined) {
          FieldOptionsFeatureSupport.encode(message.featureSupport, writer.uint32(178).fork()).ldelim();
        }
if (message.uninterpretedOption !== undefined && message.uninterpretedOption.length !== 0) {
              
          for (const v of message.uninterpretedOption) {
            UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): FieldOptions {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseFieldOptions();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 8) {
        break;
      }
    
        message.ctype = reader.int32() as any;
continue;
case 2:
if (tag !== 16) {
        break;
      }
    
        message.packed = reader.bool();
continue;
case 6:
if (tag !== 48) {
        break;
      }
    
        message.jstype = reader.int32() as any;
continue;
case 5:
if (tag !== 40) {
        break;
      }
    
        message.lazy = reader.bool();
continue;
case 15:
if (tag !== 120) {
        break;
      }
    
        message.unverifiedLazy = reader.bool();
continue;
case 3:
if (tag !== 24) {
        break;
      }
    
        message.deprecated = reader.bool();
continue;
case 10:
if (tag !== 80) {
        break;
      }
    
        message.weak = reader.bool();
continue;
case 16:
if (tag !== 128) {
        break;
      }
    
        message.debugRedact = reader.bool();
continue;
case 17:
if (tag !== 136) {
        break;
      }
    
        message.retention = reader.int32() as any;
continue;
case 19:
if (tag === 152) {
              
              message.targets!.push(reader.int32() as any);

              continue;
            }

            if (tag === 154) {
              
              const end2 = reader.uint32() + reader.pos;
              while (reader.pos < end2) {
                message.targets!.push(reader.int32() as any);
              }

              continue;
            }

            break;
case 20:
if (tag !== 162) {
        break;
      }
    
            
            message.editionDefaults!.push(FieldOptionsEditionDefault.decode(reader, reader.uint32()));
continue;
case 21:
if (tag !== 170) {
        break;
      }
    
        message.features = FeatureSet.decode(reader, reader.uint32());
continue;
case 22:
if (tag !== 178) {
        break;
      }
    
        message.featureSupport = FieldOptionsFeatureSupport.decode(reader, reader.uint32());
continue;
case 999:
if (tag !== 7994) {
        break;
      }
    
            
            message.uninterpretedOption!.push(UninterpretedOption.decode(reader, reader.uint32()));
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): FieldOptions {
      return {
$type: FieldOptions.$type,
ctype: isSet(object.ctype)
          ? fieldOptionsCTypeFromJSON(object.ctype)
          : 0,
packed: isSet(object.packed)
          ? globalThis.Boolean(object.packed)
          : false,
jstype: isSet(object.jstype)
          ? fieldOptionsJSTypeFromJSON(object.jstype)
          : 0,
lazy: isSet(object.lazy)
          ? globalThis.Boolean(object.lazy)
          : false,
unverifiedLazy: isSet(object.unverifiedLazy)
          ? globalThis.Boolean(object.unverifiedLazy)
          : false,
deprecated: isSet(object.deprecated)
          ? globalThis.Boolean(object.deprecated)
          : false,
weak: isSet(object.weak)
          ? globalThis.Boolean(object.weak)
          : false,
debugRedact: isSet(object.debugRedact)
          ? globalThis.Boolean(object.debugRedact)
          : false,
retention: isSet(object.retention)
          ? fieldOptionsOptionRetentionFromJSON(object.retention)
          : 0,
targets: globalThis.Array.isArray(object?.targets) ? object.targets.map((e: any) => fieldOptionsOptionTargetTypeFromJSON(e)): [],
editionDefaults: globalThis.Array.isArray(object?.editionDefaults) ? object.editionDefaults.map((e: any) => FieldOptionsEditionDefault.fromJSON(e)): [],
features: isSet(object.features)
          ? FeatureSet.fromJSON(object.features)
          : undefined,
featureSupport: isSet(object.featureSupport)
          ? FieldOptionsFeatureSupport.fromJSON(object.featureSupport)
          : undefined,
uninterpretedOption: globalThis.Array.isArray(object?.uninterpretedOption) ? object.uninterpretedOption.map((e: any) => UninterpretedOption.fromJSON(e)): [],
};
},

toJSON(message: FieldOptions): unknown {
      const obj: any = {};
if (message.ctype !== undefined &&  message.ctype !== 0) {
          obj.ctype = fieldOptionsCTypeToJSON(message.ctype);
        }
if (message.packed !== undefined &&  message.packed !== false) {
          obj.packed = message.packed;
        }
if (message.jstype !== undefined &&  message.jstype !== 0) {
          obj.jstype = fieldOptionsJSTypeToJSON(message.jstype);
        }
if (message.lazy !== undefined &&  message.lazy !== false) {
          obj.lazy = message.lazy;
        }
if (message.unverifiedLazy !== undefined &&  message.unverifiedLazy !== false) {
          obj.unverifiedLazy = message.unverifiedLazy;
        }
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          obj.deprecated = message.deprecated;
        }
if (message.weak !== undefined &&  message.weak !== false) {
          obj.weak = message.weak;
        }
if (message.debugRedact !== undefined &&  message.debugRedact !== false) {
          obj.debugRedact = message.debugRedact;
        }
if (message.retention !== undefined &&  message.retention !== 0) {
          obj.retention = fieldOptionsOptionRetentionToJSON(message.retention);
        }
if (message.targets?.length) {
          obj.targets = message.targets.map(e => fieldOptionsOptionTargetTypeToJSON(e));
        }
if (message.editionDefaults?.length) {
          obj.editionDefaults = message.editionDefaults.map(e => FieldOptionsEditionDefault.toJSON(e));
        }
if (message.features !== undefined) {
          obj.features = FeatureSet.toJSON(message.features);
        }
if (message.featureSupport !== undefined) {
          obj.featureSupport = FieldOptionsFeatureSupport.toJSON(message.featureSupport);
        }
if (message.uninterpretedOption?.length) {
          obj.uninterpretedOption = message.uninterpretedOption.map(e => UninterpretedOption.toJSON(e));
        }
return obj;
},

create<I extends Exact<DeepPartial<FieldOptions>, I>>(base?: I): FieldOptions {
        return FieldOptions.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<FieldOptions>, I>>(object: I): FieldOptions {
const message = createBaseFieldOptions();
message.ctype = object.ctype ?? 0;
message.packed = object.packed ?? false;
message.jstype = object.jstype ?? 0;
message.lazy = object.lazy ?? false;
message.unverifiedLazy = object.unverifiedLazy ?? false;
message.deprecated = object.deprecated ?? false;
message.weak = object.weak ?? false;
message.debugRedact = object.debugRedact ?? false;
message.retention = object.retention ?? 0;
message.targets = object.targets?.map((e) => e) || [];
message.editionDefaults = object.editionDefaults?.map((e) => FieldOptionsEditionDefault.fromPartial(e)) || [];
message.features = (object.features !== undefined && object.features !== null)
          ? FeatureSet.fromPartial(object.features)
          : undefined;
message.featureSupport = (object.featureSupport !== undefined && object.featureSupport !== null)
          ? FieldOptionsFeatureSupport.fromPartial(object.featureSupport)
          : undefined;
message.uninterpretedOption = object.uninterpretedOption?.map((e) => UninterpretedOption.fromPartial(e)) || [];
return message;
}
            };

messageTypeRegistry.set(FieldOptions.$type, FieldOptions);

function createBaseFieldOptionsEditionDefault(): FieldOptionsEditionDefault {
      return { $type: 'google.protobuf.FieldOptions.EditionDefault',edition: 0,value: "" };
    }

export const FieldOptionsEditionDefault = {
              $type: 'google.protobuf.FieldOptions.EditionDefault' as const,

encode(
      message: FieldOptionsEditionDefault,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.edition !== undefined &&  message.edition !== 0) {
          writer.uint32(24).int32(message.edition);
        }
if (message.value !== undefined &&  message.value !== "") {
          writer.uint32(18).string(message.value);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): FieldOptionsEditionDefault {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseFieldOptionsEditionDefault();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 3:
if (tag !== 24) {
        break;
      }
    
        message.edition = reader.int32() as any;
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

fromJSON(object: any): FieldOptionsEditionDefault {
      return {
$type: FieldOptionsEditionDefault.$type,
edition: isSet(object.edition)
          ? editionFromJSON(object.edition)
          : 0,
value: isSet(object.value)
          ? globalThis.String(object.value)
          : "",
};
},

toJSON(message: FieldOptionsEditionDefault): unknown {
      const obj: any = {};
if (message.edition !== undefined &&  message.edition !== 0) {
          obj.edition = editionToJSON(message.edition);
        }
if (message.value !== undefined &&  message.value !== "") {
          obj.value = message.value;
        }
return obj;
},

create<I extends Exact<DeepPartial<FieldOptionsEditionDefault>, I>>(base?: I): FieldOptionsEditionDefault {
        return FieldOptionsEditionDefault.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<FieldOptionsEditionDefault>, I>>(object: I): FieldOptionsEditionDefault {
const message = createBaseFieldOptionsEditionDefault();
message.edition = object.edition ?? 0;
message.value = object.value ?? "";
return message;
}
            };

messageTypeRegistry.set(FieldOptionsEditionDefault.$type, FieldOptionsEditionDefault);

function createBaseFieldOptionsFeatureSupport(): FieldOptionsFeatureSupport {
      return { $type: 'google.protobuf.FieldOptions.FeatureSupport',editionIntroduced: 0,editionDeprecated: 0,deprecationWarning: "",editionRemoved: 0 };
    }

export const FieldOptionsFeatureSupport = {
              $type: 'google.protobuf.FieldOptions.FeatureSupport' as const,

encode(
      message: FieldOptionsFeatureSupport,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.editionIntroduced !== undefined &&  message.editionIntroduced !== 0) {
          writer.uint32(8).int32(message.editionIntroduced);
        }
if (message.editionDeprecated !== undefined &&  message.editionDeprecated !== 0) {
          writer.uint32(16).int32(message.editionDeprecated);
        }
if (message.deprecationWarning !== undefined &&  message.deprecationWarning !== "") {
          writer.uint32(26).string(message.deprecationWarning);
        }
if (message.editionRemoved !== undefined &&  message.editionRemoved !== 0) {
          writer.uint32(32).int32(message.editionRemoved);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): FieldOptionsFeatureSupport {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseFieldOptionsFeatureSupport();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 8) {
        break;
      }
    
        message.editionIntroduced = reader.int32() as any;
continue;
case 2:
if (tag !== 16) {
        break;
      }
    
        message.editionDeprecated = reader.int32() as any;
continue;
case 3:
if (tag !== 26) {
        break;
      }
    
        message.deprecationWarning = reader.string();
continue;
case 4:
if (tag !== 32) {
        break;
      }
    
        message.editionRemoved = reader.int32() as any;
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): FieldOptionsFeatureSupport {
      return {
$type: FieldOptionsFeatureSupport.$type,
editionIntroduced: isSet(object.editionIntroduced)
          ? editionFromJSON(object.editionIntroduced)
          : 0,
editionDeprecated: isSet(object.editionDeprecated)
          ? editionFromJSON(object.editionDeprecated)
          : 0,
deprecationWarning: isSet(object.deprecationWarning)
          ? globalThis.String(object.deprecationWarning)
          : "",
editionRemoved: isSet(object.editionRemoved)
          ? editionFromJSON(object.editionRemoved)
          : 0,
};
},

toJSON(message: FieldOptionsFeatureSupport): unknown {
      const obj: any = {};
if (message.editionIntroduced !== undefined &&  message.editionIntroduced !== 0) {
          obj.editionIntroduced = editionToJSON(message.editionIntroduced);
        }
if (message.editionDeprecated !== undefined &&  message.editionDeprecated !== 0) {
          obj.editionDeprecated = editionToJSON(message.editionDeprecated);
        }
if (message.deprecationWarning !== undefined &&  message.deprecationWarning !== "") {
          obj.deprecationWarning = message.deprecationWarning;
        }
if (message.editionRemoved !== undefined &&  message.editionRemoved !== 0) {
          obj.editionRemoved = editionToJSON(message.editionRemoved);
        }
return obj;
},

create<I extends Exact<DeepPartial<FieldOptionsFeatureSupport>, I>>(base?: I): FieldOptionsFeatureSupport {
        return FieldOptionsFeatureSupport.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<FieldOptionsFeatureSupport>, I>>(object: I): FieldOptionsFeatureSupport {
const message = createBaseFieldOptionsFeatureSupport();
message.editionIntroduced = object.editionIntroduced ?? 0;
message.editionDeprecated = object.editionDeprecated ?? 0;
message.deprecationWarning = object.deprecationWarning ?? "";
message.editionRemoved = object.editionRemoved ?? 0;
return message;
}
            };

messageTypeRegistry.set(FieldOptionsFeatureSupport.$type, FieldOptionsFeatureSupport);

function createBaseOneofOptions(): OneofOptions {
      return { $type: 'google.protobuf.OneofOptions',features: undefined,uninterpretedOption: [] };
    }

export const OneofOptions = {
              $type: 'google.protobuf.OneofOptions' as const,

encode(
      message: OneofOptions,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.features !== undefined) {
          FeatureSet.encode(message.features, writer.uint32(10).fork()).ldelim();
        }
if (message.uninterpretedOption !== undefined && message.uninterpretedOption.length !== 0) {
              
          for (const v of message.uninterpretedOption) {
            UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): OneofOptions {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseOneofOptions();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 10) {
        break;
      }
    
        message.features = FeatureSet.decode(reader, reader.uint32());
continue;
case 999:
if (tag !== 7994) {
        break;
      }
    
            
            message.uninterpretedOption!.push(UninterpretedOption.decode(reader, reader.uint32()));
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): OneofOptions {
      return {
$type: OneofOptions.$type,
features: isSet(object.features)
          ? FeatureSet.fromJSON(object.features)
          : undefined,
uninterpretedOption: globalThis.Array.isArray(object?.uninterpretedOption) ? object.uninterpretedOption.map((e: any) => UninterpretedOption.fromJSON(e)): [],
};
},

toJSON(message: OneofOptions): unknown {
      const obj: any = {};
if (message.features !== undefined) {
          obj.features = FeatureSet.toJSON(message.features);
        }
if (message.uninterpretedOption?.length) {
          obj.uninterpretedOption = message.uninterpretedOption.map(e => UninterpretedOption.toJSON(e));
        }
return obj;
},

create<I extends Exact<DeepPartial<OneofOptions>, I>>(base?: I): OneofOptions {
        return OneofOptions.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<OneofOptions>, I>>(object: I): OneofOptions {
const message = createBaseOneofOptions();
message.features = (object.features !== undefined && object.features !== null)
          ? FeatureSet.fromPartial(object.features)
          : undefined;
message.uninterpretedOption = object.uninterpretedOption?.map((e) => UninterpretedOption.fromPartial(e)) || [];
return message;
}
            };

messageTypeRegistry.set(OneofOptions.$type, OneofOptions);

function createBaseEnumOptions(): EnumOptions {
      return { $type: 'google.protobuf.EnumOptions',allowAlias: false,deprecated: false,deprecatedLegacyJsonFieldConflicts: false,features: undefined,uninterpretedOption: [] };
    }

export const EnumOptions = {
              $type: 'google.protobuf.EnumOptions' as const,

encode(
      message: EnumOptions,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.allowAlias !== undefined &&  message.allowAlias !== false) {
          writer.uint32(16).bool(message.allowAlias);
        }
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          writer.uint32(24).bool(message.deprecated);
        }
if (message.deprecatedLegacyJsonFieldConflicts !== undefined &&  message.deprecatedLegacyJsonFieldConflicts !== false) {
          writer.uint32(48).bool(message.deprecatedLegacyJsonFieldConflicts);
        }
if (message.features !== undefined) {
          FeatureSet.encode(message.features, writer.uint32(58).fork()).ldelim();
        }
if (message.uninterpretedOption !== undefined && message.uninterpretedOption.length !== 0) {
              
          for (const v of message.uninterpretedOption) {
            UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): EnumOptions {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseEnumOptions();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 2:
if (tag !== 16) {
        break;
      }
    
        message.allowAlias = reader.bool();
continue;
case 3:
if (tag !== 24) {
        break;
      }
    
        message.deprecated = reader.bool();
continue;
case 6:
if (tag !== 48) {
        break;
      }
    
        message.deprecatedLegacyJsonFieldConflicts = reader.bool();
continue;
case 7:
if (tag !== 58) {
        break;
      }
    
        message.features = FeatureSet.decode(reader, reader.uint32());
continue;
case 999:
if (tag !== 7994) {
        break;
      }
    
            
            message.uninterpretedOption!.push(UninterpretedOption.decode(reader, reader.uint32()));
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): EnumOptions {
      return {
$type: EnumOptions.$type,
allowAlias: isSet(object.allowAlias)
          ? globalThis.Boolean(object.allowAlias)
          : false,
deprecated: isSet(object.deprecated)
          ? globalThis.Boolean(object.deprecated)
          : false,
deprecatedLegacyJsonFieldConflicts: isSet(object.deprecatedLegacyJsonFieldConflicts)
          ? globalThis.Boolean(object.deprecatedLegacyJsonFieldConflicts)
          : false,
features: isSet(object.features)
          ? FeatureSet.fromJSON(object.features)
          : undefined,
uninterpretedOption: globalThis.Array.isArray(object?.uninterpretedOption) ? object.uninterpretedOption.map((e: any) => UninterpretedOption.fromJSON(e)): [],
};
},

toJSON(message: EnumOptions): unknown {
      const obj: any = {};
if (message.allowAlias !== undefined &&  message.allowAlias !== false) {
          obj.allowAlias = message.allowAlias;
        }
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          obj.deprecated = message.deprecated;
        }
if (message.deprecatedLegacyJsonFieldConflicts !== undefined &&  message.deprecatedLegacyJsonFieldConflicts !== false) {
          obj.deprecatedLegacyJsonFieldConflicts = message.deprecatedLegacyJsonFieldConflicts;
        }
if (message.features !== undefined) {
          obj.features = FeatureSet.toJSON(message.features);
        }
if (message.uninterpretedOption?.length) {
          obj.uninterpretedOption = message.uninterpretedOption.map(e => UninterpretedOption.toJSON(e));
        }
return obj;
},

create<I extends Exact<DeepPartial<EnumOptions>, I>>(base?: I): EnumOptions {
        return EnumOptions.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<EnumOptions>, I>>(object: I): EnumOptions {
const message = createBaseEnumOptions();
message.allowAlias = object.allowAlias ?? false;
message.deprecated = object.deprecated ?? false;
message.deprecatedLegacyJsonFieldConflicts = object.deprecatedLegacyJsonFieldConflicts ?? false;
message.features = (object.features !== undefined && object.features !== null)
          ? FeatureSet.fromPartial(object.features)
          : undefined;
message.uninterpretedOption = object.uninterpretedOption?.map((e) => UninterpretedOption.fromPartial(e)) || [];
return message;
}
            };

messageTypeRegistry.set(EnumOptions.$type, EnumOptions);

function createBaseEnumValueOptions(): EnumValueOptions {
      return { $type: 'google.protobuf.EnumValueOptions',deprecated: false,features: undefined,debugRedact: false,featureSupport: undefined,uninterpretedOption: [] };
    }

export const EnumValueOptions = {
              $type: 'google.protobuf.EnumValueOptions' as const,

encode(
      message: EnumValueOptions,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          writer.uint32(8).bool(message.deprecated);
        }
if (message.features !== undefined) {
          FeatureSet.encode(message.features, writer.uint32(18).fork()).ldelim();
        }
if (message.debugRedact !== undefined &&  message.debugRedact !== false) {
          writer.uint32(24).bool(message.debugRedact);
        }
if (message.featureSupport !== undefined) {
          FieldOptionsFeatureSupport.encode(message.featureSupport, writer.uint32(34).fork()).ldelim();
        }
if (message.uninterpretedOption !== undefined && message.uninterpretedOption.length !== 0) {
              
          for (const v of message.uninterpretedOption) {
            UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): EnumValueOptions {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseEnumValueOptions();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 8) {
        break;
      }
    
        message.deprecated = reader.bool();
continue;
case 2:
if (tag !== 18) {
        break;
      }
    
        message.features = FeatureSet.decode(reader, reader.uint32());
continue;
case 3:
if (tag !== 24) {
        break;
      }
    
        message.debugRedact = reader.bool();
continue;
case 4:
if (tag !== 34) {
        break;
      }
    
        message.featureSupport = FieldOptionsFeatureSupport.decode(reader, reader.uint32());
continue;
case 999:
if (tag !== 7994) {
        break;
      }
    
            
            message.uninterpretedOption!.push(UninterpretedOption.decode(reader, reader.uint32()));
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): EnumValueOptions {
      return {
$type: EnumValueOptions.$type,
deprecated: isSet(object.deprecated)
          ? globalThis.Boolean(object.deprecated)
          : false,
features: isSet(object.features)
          ? FeatureSet.fromJSON(object.features)
          : undefined,
debugRedact: isSet(object.debugRedact)
          ? globalThis.Boolean(object.debugRedact)
          : false,
featureSupport: isSet(object.featureSupport)
          ? FieldOptionsFeatureSupport.fromJSON(object.featureSupport)
          : undefined,
uninterpretedOption: globalThis.Array.isArray(object?.uninterpretedOption) ? object.uninterpretedOption.map((e: any) => UninterpretedOption.fromJSON(e)): [],
};
},

toJSON(message: EnumValueOptions): unknown {
      const obj: any = {};
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          obj.deprecated = message.deprecated;
        }
if (message.features !== undefined) {
          obj.features = FeatureSet.toJSON(message.features);
        }
if (message.debugRedact !== undefined &&  message.debugRedact !== false) {
          obj.debugRedact = message.debugRedact;
        }
if (message.featureSupport !== undefined) {
          obj.featureSupport = FieldOptionsFeatureSupport.toJSON(message.featureSupport);
        }
if (message.uninterpretedOption?.length) {
          obj.uninterpretedOption = message.uninterpretedOption.map(e => UninterpretedOption.toJSON(e));
        }
return obj;
},

create<I extends Exact<DeepPartial<EnumValueOptions>, I>>(base?: I): EnumValueOptions {
        return EnumValueOptions.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<EnumValueOptions>, I>>(object: I): EnumValueOptions {
const message = createBaseEnumValueOptions();
message.deprecated = object.deprecated ?? false;
message.features = (object.features !== undefined && object.features !== null)
          ? FeatureSet.fromPartial(object.features)
          : undefined;
message.debugRedact = object.debugRedact ?? false;
message.featureSupport = (object.featureSupport !== undefined && object.featureSupport !== null)
          ? FieldOptionsFeatureSupport.fromPartial(object.featureSupport)
          : undefined;
message.uninterpretedOption = object.uninterpretedOption?.map((e) => UninterpretedOption.fromPartial(e)) || [];
return message;
}
            };

messageTypeRegistry.set(EnumValueOptions.$type, EnumValueOptions);

function createBaseServiceOptions(): ServiceOptions {
      return { $type: 'google.protobuf.ServiceOptions',features: undefined,deprecated: false,uninterpretedOption: [] };
    }

export const ServiceOptions = {
              $type: 'google.protobuf.ServiceOptions' as const,

encode(
      message: ServiceOptions,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.features !== undefined) {
          FeatureSet.encode(message.features, writer.uint32(274).fork()).ldelim();
        }
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          writer.uint32(264).bool(message.deprecated);
        }
if (message.uninterpretedOption !== undefined && message.uninterpretedOption.length !== 0) {
              
          for (const v of message.uninterpretedOption) {
            UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): ServiceOptions {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseServiceOptions();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 34:
if (tag !== 274) {
        break;
      }
    
        message.features = FeatureSet.decode(reader, reader.uint32());
continue;
case 33:
if (tag !== 264) {
        break;
      }
    
        message.deprecated = reader.bool();
continue;
case 999:
if (tag !== 7994) {
        break;
      }
    
            
            message.uninterpretedOption!.push(UninterpretedOption.decode(reader, reader.uint32()));
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): ServiceOptions {
      return {
$type: ServiceOptions.$type,
features: isSet(object.features)
          ? FeatureSet.fromJSON(object.features)
          : undefined,
deprecated: isSet(object.deprecated)
          ? globalThis.Boolean(object.deprecated)
          : false,
uninterpretedOption: globalThis.Array.isArray(object?.uninterpretedOption) ? object.uninterpretedOption.map((e: any) => UninterpretedOption.fromJSON(e)): [],
};
},

toJSON(message: ServiceOptions): unknown {
      const obj: any = {};
if (message.features !== undefined) {
          obj.features = FeatureSet.toJSON(message.features);
        }
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          obj.deprecated = message.deprecated;
        }
if (message.uninterpretedOption?.length) {
          obj.uninterpretedOption = message.uninterpretedOption.map(e => UninterpretedOption.toJSON(e));
        }
return obj;
},

create<I extends Exact<DeepPartial<ServiceOptions>, I>>(base?: I): ServiceOptions {
        return ServiceOptions.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<ServiceOptions>, I>>(object: I): ServiceOptions {
const message = createBaseServiceOptions();
message.features = (object.features !== undefined && object.features !== null)
          ? FeatureSet.fromPartial(object.features)
          : undefined;
message.deprecated = object.deprecated ?? false;
message.uninterpretedOption = object.uninterpretedOption?.map((e) => UninterpretedOption.fromPartial(e)) || [];
return message;
}
            };

messageTypeRegistry.set(ServiceOptions.$type, ServiceOptions);

function createBaseMethodOptions(): MethodOptions {
      return { $type: 'google.protobuf.MethodOptions',deprecated: false,idempotencyLevel: 0,features: undefined,uninterpretedOption: [] };
    }

export const MethodOptions = {
              $type: 'google.protobuf.MethodOptions' as const,

encode(
      message: MethodOptions,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          writer.uint32(264).bool(message.deprecated);
        }
if (message.idempotencyLevel !== undefined &&  message.idempotencyLevel !== 0) {
          writer.uint32(272).int32(message.idempotencyLevel);
        }
if (message.features !== undefined) {
          FeatureSet.encode(message.features, writer.uint32(282).fork()).ldelim();
        }
if (message.uninterpretedOption !== undefined && message.uninterpretedOption.length !== 0) {
              
          for (const v of message.uninterpretedOption) {
            UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): MethodOptions {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseMethodOptions();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 33:
if (tag !== 264) {
        break;
      }
    
        message.deprecated = reader.bool();
continue;
case 34:
if (tag !== 272) {
        break;
      }
    
        message.idempotencyLevel = reader.int32() as any;
continue;
case 35:
if (tag !== 282) {
        break;
      }
    
        message.features = FeatureSet.decode(reader, reader.uint32());
continue;
case 999:
if (tag !== 7994) {
        break;
      }
    
            
            message.uninterpretedOption!.push(UninterpretedOption.decode(reader, reader.uint32()));
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): MethodOptions {
      return {
$type: MethodOptions.$type,
deprecated: isSet(object.deprecated)
          ? globalThis.Boolean(object.deprecated)
          : false,
idempotencyLevel: isSet(object.idempotencyLevel)
          ? methodOptionsIdempotencyLevelFromJSON(object.idempotencyLevel)
          : 0,
features: isSet(object.features)
          ? FeatureSet.fromJSON(object.features)
          : undefined,
uninterpretedOption: globalThis.Array.isArray(object?.uninterpretedOption) ? object.uninterpretedOption.map((e: any) => UninterpretedOption.fromJSON(e)): [],
};
},

toJSON(message: MethodOptions): unknown {
      const obj: any = {};
if (message.deprecated !== undefined &&  message.deprecated !== false) {
          obj.deprecated = message.deprecated;
        }
if (message.idempotencyLevel !== undefined &&  message.idempotencyLevel !== 0) {
          obj.idempotencyLevel = methodOptionsIdempotencyLevelToJSON(message.idempotencyLevel);
        }
if (message.features !== undefined) {
          obj.features = FeatureSet.toJSON(message.features);
        }
if (message.uninterpretedOption?.length) {
          obj.uninterpretedOption = message.uninterpretedOption.map(e => UninterpretedOption.toJSON(e));
        }
return obj;
},

create<I extends Exact<DeepPartial<MethodOptions>, I>>(base?: I): MethodOptions {
        return MethodOptions.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<MethodOptions>, I>>(object: I): MethodOptions {
const message = createBaseMethodOptions();
message.deprecated = object.deprecated ?? false;
message.idempotencyLevel = object.idempotencyLevel ?? 0;
message.features = (object.features !== undefined && object.features !== null)
          ? FeatureSet.fromPartial(object.features)
          : undefined;
message.uninterpretedOption = object.uninterpretedOption?.map((e) => UninterpretedOption.fromPartial(e)) || [];
return message;
}
            };

messageTypeRegistry.set(MethodOptions.$type, MethodOptions);

function createBaseUninterpretedOption(): UninterpretedOption {
      return { $type: 'google.protobuf.UninterpretedOption',name: [],identifierValue: "",positiveIntValue: 0,negativeIntValue: 0,doubleValue: 0,stringValue: new Uint8Array(0),aggregateValue: "" };
    }

export const UninterpretedOption = {
              $type: 'google.protobuf.UninterpretedOption' as const,

encode(
      message: UninterpretedOption,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.name !== undefined && message.name.length !== 0) {
              
          for (const v of message.name) {
            UninterpretedOptionNamePart.encode(v!, writer.uint32(18).fork()).ldelim();
          }
        
            }
if (message.identifierValue !== undefined &&  message.identifierValue !== "") {
          writer.uint32(26).string(message.identifierValue);
        }
if (message.positiveIntValue !== undefined &&  message.positiveIntValue !== 0) {
          writer.uint32(32).uint64(message.positiveIntValue);
        }
if (message.negativeIntValue !== undefined &&  message.negativeIntValue !== 0) {
          writer.uint32(40).int64(message.negativeIntValue);
        }
if (message.doubleValue !== undefined &&  message.doubleValue !== 0) {
          writer.uint32(49).double(message.doubleValue);
        }
if (message.stringValue !== undefined &&  message.stringValue.length !== 0) {
          writer.uint32(58).bytes(message.stringValue);
        }
if (message.aggregateValue !== undefined &&  message.aggregateValue !== "") {
          writer.uint32(66).string(message.aggregateValue);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): UninterpretedOption {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseUninterpretedOption();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 2:
if (tag !== 18) {
        break;
      }
    
            
            message.name!.push(UninterpretedOptionNamePart.decode(reader, reader.uint32()));
continue;
case 3:
if (tag !== 26) {
        break;
      }
    
        message.identifierValue = reader.string();
continue;
case 4:
if (tag !== 32) {
        break;
      }
    
        message.positiveIntValue = longToNumber(reader.uint64() as Long);
continue;
case 5:
if (tag !== 40) {
        break;
      }
    
        message.negativeIntValue = longToNumber(reader.int64() as Long);
continue;
case 6:
if (tag !== 49) {
        break;
      }
    
        message.doubleValue = reader.double();
continue;
case 7:
if (tag !== 58) {
        break;
      }
    
        message.stringValue = reader.bytes();
continue;
case 8:
if (tag !== 66) {
        break;
      }
    
        message.aggregateValue = reader.string();
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): UninterpretedOption {
      return {
$type: UninterpretedOption.$type,
name: globalThis.Array.isArray(object?.name) ? object.name.map((e: any) => UninterpretedOptionNamePart.fromJSON(e)): [],
identifierValue: isSet(object.identifierValue)
          ? globalThis.String(object.identifierValue)
          : "",
positiveIntValue: isSet(object.positiveIntValue)
          ? globalThis.Number(object.positiveIntValue)
          : 0,
negativeIntValue: isSet(object.negativeIntValue)
          ? globalThis.Number(object.negativeIntValue)
          : 0,
doubleValue: isSet(object.doubleValue)
          ? globalThis.Number(object.doubleValue)
          : 0,
stringValue: isSet(object.stringValue)
          ? bytesFromBase64(object.stringValue)
          : new Uint8Array(0),
aggregateValue: isSet(object.aggregateValue)
          ? globalThis.String(object.aggregateValue)
          : "",
};
},

toJSON(message: UninterpretedOption): unknown {
      const obj: any = {};
if (message.name?.length) {
          obj.name = message.name.map(e => UninterpretedOptionNamePart.toJSON(e));
        }
if (message.identifierValue !== undefined &&  message.identifierValue !== "") {
          obj.identifierValue = message.identifierValue;
        }
if (message.positiveIntValue !== undefined &&  message.positiveIntValue !== 0) {
          obj.positiveIntValue = Math.round(message.positiveIntValue);
        }
if (message.negativeIntValue !== undefined &&  message.negativeIntValue !== 0) {
          obj.negativeIntValue = Math.round(message.negativeIntValue);
        }
if (message.doubleValue !== undefined &&  message.doubleValue !== 0) {
          obj.doubleValue = message.doubleValue;
        }
if (message.stringValue !== undefined &&  message.stringValue.length !== 0) {
          obj.stringValue = base64FromBytes(message.stringValue);
        }
if (message.aggregateValue !== undefined &&  message.aggregateValue !== "") {
          obj.aggregateValue = message.aggregateValue;
        }
return obj;
},

create<I extends Exact<DeepPartial<UninterpretedOption>, I>>(base?: I): UninterpretedOption {
        return UninterpretedOption.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<UninterpretedOption>, I>>(object: I): UninterpretedOption {
const message = createBaseUninterpretedOption();
message.name = object.name?.map((e) => UninterpretedOptionNamePart.fromPartial(e)) || [];
message.identifierValue = object.identifierValue ?? "";
message.positiveIntValue = object.positiveIntValue ?? 0;
message.negativeIntValue = object.negativeIntValue ?? 0;
message.doubleValue = object.doubleValue ?? 0;
message.stringValue = object.stringValue ?? new Uint8Array(0);
message.aggregateValue = object.aggregateValue ?? "";
return message;
}
            };

messageTypeRegistry.set(UninterpretedOption.$type, UninterpretedOption);

function createBaseUninterpretedOptionNamePart(): UninterpretedOptionNamePart {
      return { $type: 'google.protobuf.UninterpretedOption.NamePart',namePart: "",isExtension: false };
    }

export const UninterpretedOptionNamePart = {
              $type: 'google.protobuf.UninterpretedOption.NamePart' as const,

encode(
      message: UninterpretedOptionNamePart,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.namePart !== undefined &&  message.namePart !== "") {
          writer.uint32(10).string(message.namePart);
        }
if (message.isExtension !== undefined &&  message.isExtension !== false) {
          writer.uint32(16).bool(message.isExtension);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): UninterpretedOptionNamePart {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseUninterpretedOptionNamePart();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 10) {
        break;
      }
    
        message.namePart = reader.string();
continue;
case 2:
if (tag !== 16) {
        break;
      }
    
        message.isExtension = reader.bool();
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): UninterpretedOptionNamePart {
      return {
$type: UninterpretedOptionNamePart.$type,
namePart: isSet(object.namePart)
          ? globalThis.String(object.namePart)
          : "",
isExtension: isSet(object.isExtension)
          ? globalThis.Boolean(object.isExtension)
          : false,
};
},

toJSON(message: UninterpretedOptionNamePart): unknown {
      const obj: any = {};
if (message.namePart !== undefined &&  message.namePart !== "") {
          obj.namePart = message.namePart;
        }
if (message.isExtension !== undefined &&  message.isExtension !== false) {
          obj.isExtension = message.isExtension;
        }
return obj;
},

create<I extends Exact<DeepPartial<UninterpretedOptionNamePart>, I>>(base?: I): UninterpretedOptionNamePart {
        return UninterpretedOptionNamePart.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<UninterpretedOptionNamePart>, I>>(object: I): UninterpretedOptionNamePart {
const message = createBaseUninterpretedOptionNamePart();
message.namePart = object.namePart ?? "";
message.isExtension = object.isExtension ?? false;
return message;
}
            };

messageTypeRegistry.set(UninterpretedOptionNamePart.$type, UninterpretedOptionNamePart);

function createBaseFeatureSet(): FeatureSet {
      return { $type: 'google.protobuf.FeatureSet',fieldPresence: 0,enumType: 0,repeatedFieldEncoding: 0,utf8Validation: 0,messageEncoding: 0,jsonFormat: 0 };
    }

export const FeatureSet = {
              $type: 'google.protobuf.FeatureSet' as const,

encode(
      message: FeatureSet,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.fieldPresence !== undefined &&  message.fieldPresence !== 0) {
          writer.uint32(8).int32(message.fieldPresence);
        }
if (message.enumType !== undefined &&  message.enumType !== 0) {
          writer.uint32(16).int32(message.enumType);
        }
if (message.repeatedFieldEncoding !== undefined &&  message.repeatedFieldEncoding !== 0) {
          writer.uint32(24).int32(message.repeatedFieldEncoding);
        }
if (message.utf8Validation !== undefined &&  message.utf8Validation !== 0) {
          writer.uint32(32).int32(message.utf8Validation);
        }
if (message.messageEncoding !== undefined &&  message.messageEncoding !== 0) {
          writer.uint32(40).int32(message.messageEncoding);
        }
if (message.jsonFormat !== undefined &&  message.jsonFormat !== 0) {
          writer.uint32(48).int32(message.jsonFormat);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): FeatureSet {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseFeatureSet();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 8) {
        break;
      }
    
        message.fieldPresence = reader.int32() as any;
continue;
case 2:
if (tag !== 16) {
        break;
      }
    
        message.enumType = reader.int32() as any;
continue;
case 3:
if (tag !== 24) {
        break;
      }
    
        message.repeatedFieldEncoding = reader.int32() as any;
continue;
case 4:
if (tag !== 32) {
        break;
      }
    
        message.utf8Validation = reader.int32() as any;
continue;
case 5:
if (tag !== 40) {
        break;
      }
    
        message.messageEncoding = reader.int32() as any;
continue;
case 6:
if (tag !== 48) {
        break;
      }
    
        message.jsonFormat = reader.int32() as any;
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): FeatureSet {
      return {
$type: FeatureSet.$type,
fieldPresence: isSet(object.fieldPresence)
          ? featureSetFieldPresenceFromJSON(object.fieldPresence)
          : 0,
enumType: isSet(object.enumType)
          ? featureSetEnumTypeFromJSON(object.enumType)
          : 0,
repeatedFieldEncoding: isSet(object.repeatedFieldEncoding)
          ? featureSetRepeatedFieldEncodingFromJSON(object.repeatedFieldEncoding)
          : 0,
utf8Validation: isSet(object.utf8Validation)
          ? featureSetUtf8ValidationFromJSON(object.utf8Validation)
          : 0,
messageEncoding: isSet(object.messageEncoding)
          ? featureSetMessageEncodingFromJSON(object.messageEncoding)
          : 0,
jsonFormat: isSet(object.jsonFormat)
          ? featureSetJsonFormatFromJSON(object.jsonFormat)
          : 0,
};
},

toJSON(message: FeatureSet): unknown {
      const obj: any = {};
if (message.fieldPresence !== undefined &&  message.fieldPresence !== 0) {
          obj.fieldPresence = featureSetFieldPresenceToJSON(message.fieldPresence);
        }
if (message.enumType !== undefined &&  message.enumType !== 0) {
          obj.enumType = featureSetEnumTypeToJSON(message.enumType);
        }
if (message.repeatedFieldEncoding !== undefined &&  message.repeatedFieldEncoding !== 0) {
          obj.repeatedFieldEncoding = featureSetRepeatedFieldEncodingToJSON(message.repeatedFieldEncoding);
        }
if (message.utf8Validation !== undefined &&  message.utf8Validation !== 0) {
          obj.utf8Validation = featureSetUtf8ValidationToJSON(message.utf8Validation);
        }
if (message.messageEncoding !== undefined &&  message.messageEncoding !== 0) {
          obj.messageEncoding = featureSetMessageEncodingToJSON(message.messageEncoding);
        }
if (message.jsonFormat !== undefined &&  message.jsonFormat !== 0) {
          obj.jsonFormat = featureSetJsonFormatToJSON(message.jsonFormat);
        }
return obj;
},

create<I extends Exact<DeepPartial<FeatureSet>, I>>(base?: I): FeatureSet {
        return FeatureSet.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<FeatureSet>, I>>(object: I): FeatureSet {
const message = createBaseFeatureSet();
message.fieldPresence = object.fieldPresence ?? 0;
message.enumType = object.enumType ?? 0;
message.repeatedFieldEncoding = object.repeatedFieldEncoding ?? 0;
message.utf8Validation = object.utf8Validation ?? 0;
message.messageEncoding = object.messageEncoding ?? 0;
message.jsonFormat = object.jsonFormat ?? 0;
return message;
}
            };

messageTypeRegistry.set(FeatureSet.$type, FeatureSet);

function createBaseFeatureSetDefaults(): FeatureSetDefaults {
      return { $type: 'google.protobuf.FeatureSetDefaults',defaults: [],minimumEdition: 0,maximumEdition: 0 };
    }

export const FeatureSetDefaults = {
              $type: 'google.protobuf.FeatureSetDefaults' as const,

encode(
      message: FeatureSetDefaults,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.defaults !== undefined && message.defaults.length !== 0) {
              
          for (const v of message.defaults) {
            FeatureSetDefaultsFeatureSetEditionDefault.encode(v!, writer.uint32(10).fork()).ldelim();
          }
        
            }
if (message.minimumEdition !== undefined &&  message.minimumEdition !== 0) {
          writer.uint32(32).int32(message.minimumEdition);
        }
if (message.maximumEdition !== undefined &&  message.maximumEdition !== 0) {
          writer.uint32(40).int32(message.maximumEdition);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): FeatureSetDefaults {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseFeatureSetDefaults();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 10) {
        break;
      }
    
            
            message.defaults!.push(FeatureSetDefaultsFeatureSetEditionDefault.decode(reader, reader.uint32()));
continue;
case 4:
if (tag !== 32) {
        break;
      }
    
        message.minimumEdition = reader.int32() as any;
continue;
case 5:
if (tag !== 40) {
        break;
      }
    
        message.maximumEdition = reader.int32() as any;
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): FeatureSetDefaults {
      return {
$type: FeatureSetDefaults.$type,
defaults: globalThis.Array.isArray(object?.defaults) ? object.defaults.map((e: any) => FeatureSetDefaultsFeatureSetEditionDefault.fromJSON(e)): [],
minimumEdition: isSet(object.minimumEdition)
          ? editionFromJSON(object.minimumEdition)
          : 0,
maximumEdition: isSet(object.maximumEdition)
          ? editionFromJSON(object.maximumEdition)
          : 0,
};
},

toJSON(message: FeatureSetDefaults): unknown {
      const obj: any = {};
if (message.defaults?.length) {
          obj.defaults = message.defaults.map(e => FeatureSetDefaultsFeatureSetEditionDefault.toJSON(e));
        }
if (message.minimumEdition !== undefined &&  message.minimumEdition !== 0) {
          obj.minimumEdition = editionToJSON(message.minimumEdition);
        }
if (message.maximumEdition !== undefined &&  message.maximumEdition !== 0) {
          obj.maximumEdition = editionToJSON(message.maximumEdition);
        }
return obj;
},

create<I extends Exact<DeepPartial<FeatureSetDefaults>, I>>(base?: I): FeatureSetDefaults {
        return FeatureSetDefaults.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<FeatureSetDefaults>, I>>(object: I): FeatureSetDefaults {
const message = createBaseFeatureSetDefaults();
message.defaults = object.defaults?.map((e) => FeatureSetDefaultsFeatureSetEditionDefault.fromPartial(e)) || [];
message.minimumEdition = object.minimumEdition ?? 0;
message.maximumEdition = object.maximumEdition ?? 0;
return message;
}
            };

messageTypeRegistry.set(FeatureSetDefaults.$type, FeatureSetDefaults);

function createBaseFeatureSetDefaultsFeatureSetEditionDefault(): FeatureSetDefaultsFeatureSetEditionDefault {
      return { $type: 'google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault',edition: 0,overridableFeatures: undefined,fixedFeatures: undefined };
    }

export const FeatureSetDefaultsFeatureSetEditionDefault = {
              $type: 'google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault' as const,

encode(
      message: FeatureSetDefaultsFeatureSetEditionDefault,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.edition !== undefined &&  message.edition !== 0) {
          writer.uint32(24).int32(message.edition);
        }
if (message.overridableFeatures !== undefined) {
          FeatureSet.encode(message.overridableFeatures, writer.uint32(34).fork()).ldelim();
        }
if (message.fixedFeatures !== undefined) {
          FeatureSet.encode(message.fixedFeatures, writer.uint32(42).fork()).ldelim();
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): FeatureSetDefaultsFeatureSetEditionDefault {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseFeatureSetDefaultsFeatureSetEditionDefault();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 3:
if (tag !== 24) {
        break;
      }
    
        message.edition = reader.int32() as any;
continue;
case 4:
if (tag !== 34) {
        break;
      }
    
        message.overridableFeatures = FeatureSet.decode(reader, reader.uint32());
continue;
case 5:
if (tag !== 42) {
        break;
      }
    
        message.fixedFeatures = FeatureSet.decode(reader, reader.uint32());
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): FeatureSetDefaultsFeatureSetEditionDefault {
      return {
$type: FeatureSetDefaultsFeatureSetEditionDefault.$type,
edition: isSet(object.edition)
          ? editionFromJSON(object.edition)
          : 0,
overridableFeatures: isSet(object.overridableFeatures)
          ? FeatureSet.fromJSON(object.overridableFeatures)
          : undefined,
fixedFeatures: isSet(object.fixedFeatures)
          ? FeatureSet.fromJSON(object.fixedFeatures)
          : undefined,
};
},

toJSON(message: FeatureSetDefaultsFeatureSetEditionDefault): unknown {
      const obj: any = {};
if (message.edition !== undefined &&  message.edition !== 0) {
          obj.edition = editionToJSON(message.edition);
        }
if (message.overridableFeatures !== undefined) {
          obj.overridableFeatures = FeatureSet.toJSON(message.overridableFeatures);
        }
if (message.fixedFeatures !== undefined) {
          obj.fixedFeatures = FeatureSet.toJSON(message.fixedFeatures);
        }
return obj;
},

create<I extends Exact<DeepPartial<FeatureSetDefaultsFeatureSetEditionDefault>, I>>(base?: I): FeatureSetDefaultsFeatureSetEditionDefault {
        return FeatureSetDefaultsFeatureSetEditionDefault.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<FeatureSetDefaultsFeatureSetEditionDefault>, I>>(object: I): FeatureSetDefaultsFeatureSetEditionDefault {
const message = createBaseFeatureSetDefaultsFeatureSetEditionDefault();
message.edition = object.edition ?? 0;
message.overridableFeatures = (object.overridableFeatures !== undefined && object.overridableFeatures !== null)
          ? FeatureSet.fromPartial(object.overridableFeatures)
          : undefined;
message.fixedFeatures = (object.fixedFeatures !== undefined && object.fixedFeatures !== null)
          ? FeatureSet.fromPartial(object.fixedFeatures)
          : undefined;
return message;
}
            };

messageTypeRegistry.set(FeatureSetDefaultsFeatureSetEditionDefault.$type, FeatureSetDefaultsFeatureSetEditionDefault);

function createBaseSourceCodeInfo(): SourceCodeInfo {
      return { $type: 'google.protobuf.SourceCodeInfo',location: [] };
    }

export const SourceCodeInfo = {
              $type: 'google.protobuf.SourceCodeInfo' as const,

encode(
      message: SourceCodeInfo,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.location !== undefined && message.location.length !== 0) {
              
          for (const v of message.location) {
            SourceCodeInfoLocation.encode(v!, writer.uint32(10).fork()).ldelim();
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): SourceCodeInfo {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseSourceCodeInfo();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 10) {
        break;
      }
    
            
            message.location!.push(SourceCodeInfoLocation.decode(reader, reader.uint32()));
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): SourceCodeInfo {
      return {
$type: SourceCodeInfo.$type,
location: globalThis.Array.isArray(object?.location) ? object.location.map((e: any) => SourceCodeInfoLocation.fromJSON(e)): [],
};
},

toJSON(message: SourceCodeInfo): unknown {
      const obj: any = {};
if (message.location?.length) {
          obj.location = message.location.map(e => SourceCodeInfoLocation.toJSON(e));
        }
return obj;
},

create<I extends Exact<DeepPartial<SourceCodeInfo>, I>>(base?: I): SourceCodeInfo {
        return SourceCodeInfo.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<SourceCodeInfo>, I>>(object: I): SourceCodeInfo {
const message = createBaseSourceCodeInfo();
message.location = object.location?.map((e) => SourceCodeInfoLocation.fromPartial(e)) || [];
return message;
}
            };

messageTypeRegistry.set(SourceCodeInfo.$type, SourceCodeInfo);

function createBaseSourceCodeInfoLocation(): SourceCodeInfoLocation {
      return { $type: 'google.protobuf.SourceCodeInfo.Location',path: [],span: [],leadingComments: "",trailingComments: "",leadingDetachedComments: [] };
    }

export const SourceCodeInfoLocation = {
              $type: 'google.protobuf.SourceCodeInfo.Location' as const,

encode(
      message: SourceCodeInfoLocation,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.path !== undefined && message.path.length !== 0) {
              
          writer.uint32(10).fork();
          for (const v of message.path) {
            writer.int32(v);
          }
          writer.ldelim();
        
            }
if (message.span !== undefined && message.span.length !== 0) {
              
          writer.uint32(18).fork();
          for (const v of message.span) {
            writer.int32(v);
          }
          writer.ldelim();
        
            }
if (message.leadingComments !== undefined &&  message.leadingComments !== "") {
          writer.uint32(26).string(message.leadingComments);
        }
if (message.trailingComments !== undefined &&  message.trailingComments !== "") {
          writer.uint32(34).string(message.trailingComments);
        }
if (message.leadingDetachedComments !== undefined && message.leadingDetachedComments.length !== 0) {
              
          for (const v of message.leadingDetachedComments) {
            writer.uint32(50).string(v!);
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): SourceCodeInfoLocation {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseSourceCodeInfoLocation();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag === 8) {
              
              message.path!.push(reader.int32());

              continue;
            }

            if (tag === 10) {
              
              const end2 = reader.uint32() + reader.pos;
              while (reader.pos < end2) {
                message.path!.push(reader.int32());
              }

              continue;
            }

            break;
case 2:
if (tag === 16) {
              
              message.span!.push(reader.int32());

              continue;
            }

            if (tag === 18) {
              
              const end2 = reader.uint32() + reader.pos;
              while (reader.pos < end2) {
                message.span!.push(reader.int32());
              }

              continue;
            }

            break;
case 3:
if (tag !== 26) {
        break;
      }
    
        message.leadingComments = reader.string();
continue;
case 4:
if (tag !== 34) {
        break;
      }
    
        message.trailingComments = reader.string();
continue;
case 6:
if (tag !== 50) {
        break;
      }
    
            
            message.leadingDetachedComments!.push(reader.string());
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): SourceCodeInfoLocation {
      return {
$type: SourceCodeInfoLocation.$type,
path: globalThis.Array.isArray(object?.path) ? object.path.map((e: any) => globalThis.Number(e)): [],
span: globalThis.Array.isArray(object?.span) ? object.span.map((e: any) => globalThis.Number(e)): [],
leadingComments: isSet(object.leadingComments)
          ? globalThis.String(object.leadingComments)
          : "",
trailingComments: isSet(object.trailingComments)
          ? globalThis.String(object.trailingComments)
          : "",
leadingDetachedComments: globalThis.Array.isArray(object?.leadingDetachedComments) ? object.leadingDetachedComments.map((e: any) => globalThis.String(e)): [],
};
},

toJSON(message: SourceCodeInfoLocation): unknown {
      const obj: any = {};
if (message.path?.length) {
          obj.path = message.path.map(e => Math.round(e));
        }
if (message.span?.length) {
          obj.span = message.span.map(e => Math.round(e));
        }
if (message.leadingComments !== undefined &&  message.leadingComments !== "") {
          obj.leadingComments = message.leadingComments;
        }
if (message.trailingComments !== undefined &&  message.trailingComments !== "") {
          obj.trailingComments = message.trailingComments;
        }
if (message.leadingDetachedComments?.length) {
          obj.leadingDetachedComments = message.leadingDetachedComments;
        }
return obj;
},

create<I extends Exact<DeepPartial<SourceCodeInfoLocation>, I>>(base?: I): SourceCodeInfoLocation {
        return SourceCodeInfoLocation.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<SourceCodeInfoLocation>, I>>(object: I): SourceCodeInfoLocation {
const message = createBaseSourceCodeInfoLocation();
message.path = object.path?.map((e) => e) || [];
message.span = object.span?.map((e) => e) || [];
message.leadingComments = object.leadingComments ?? "";
message.trailingComments = object.trailingComments ?? "";
message.leadingDetachedComments = object.leadingDetachedComments?.map((e) => e) || [];
return message;
}
            };

messageTypeRegistry.set(SourceCodeInfoLocation.$type, SourceCodeInfoLocation);

function createBaseGeneratedCodeInfo(): GeneratedCodeInfo {
      return { $type: 'google.protobuf.GeneratedCodeInfo',annotation: [] };
    }

export const GeneratedCodeInfo = {
              $type: 'google.protobuf.GeneratedCodeInfo' as const,

encode(
      message: GeneratedCodeInfo,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.annotation !== undefined && message.annotation.length !== 0) {
              
          for (const v of message.annotation) {
            GeneratedCodeInfoAnnotation.encode(v!, writer.uint32(10).fork()).ldelim();
          }
        
            }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): GeneratedCodeInfo {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseGeneratedCodeInfo();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag !== 10) {
        break;
      }
    
            
            message.annotation!.push(GeneratedCodeInfoAnnotation.decode(reader, reader.uint32()));
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): GeneratedCodeInfo {
      return {
$type: GeneratedCodeInfo.$type,
annotation: globalThis.Array.isArray(object?.annotation) ? object.annotation.map((e: any) => GeneratedCodeInfoAnnotation.fromJSON(e)): [],
};
},

toJSON(message: GeneratedCodeInfo): unknown {
      const obj: any = {};
if (message.annotation?.length) {
          obj.annotation = message.annotation.map(e => GeneratedCodeInfoAnnotation.toJSON(e));
        }
return obj;
},

create<I extends Exact<DeepPartial<GeneratedCodeInfo>, I>>(base?: I): GeneratedCodeInfo {
        return GeneratedCodeInfo.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<GeneratedCodeInfo>, I>>(object: I): GeneratedCodeInfo {
const message = createBaseGeneratedCodeInfo();
message.annotation = object.annotation?.map((e) => GeneratedCodeInfoAnnotation.fromPartial(e)) || [];
return message;
}
            };

messageTypeRegistry.set(GeneratedCodeInfo.$type, GeneratedCodeInfo);

function createBaseGeneratedCodeInfoAnnotation(): GeneratedCodeInfoAnnotation {
      return { $type: 'google.protobuf.GeneratedCodeInfo.Annotation',path: [],sourceFile: "",begin: 0,end: 0,semantic: 0 };
    }

export const GeneratedCodeInfoAnnotation = {
              $type: 'google.protobuf.GeneratedCodeInfo.Annotation' as const,

encode(
      message: GeneratedCodeInfoAnnotation,
      writer: _m0.Writer = _m0.Writer.create(),
    ): _m0.Writer {
if (message.path !== undefined && message.path.length !== 0) {
              
          writer.uint32(10).fork();
          for (const v of message.path) {
            writer.int32(v);
          }
          writer.ldelim();
        
            }
if (message.sourceFile !== undefined &&  message.sourceFile !== "") {
          writer.uint32(18).string(message.sourceFile);
        }
if (message.begin !== undefined &&  message.begin !== 0) {
          writer.uint32(24).int32(message.begin);
        }
if (message.end !== undefined &&  message.end !== 0) {
          writer.uint32(32).int32(message.end);
        }
if (message.semantic !== undefined &&  message.semantic !== 0) {
          writer.uint32(40).int32(message.semantic);
        }
return writer;
},

decode(
      input: _m0.Reader | Uint8Array,
      length?: number,
    ): GeneratedCodeInfoAnnotation {
      const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
const message = createBaseGeneratedCodeInfoAnnotation();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
if (tag === 8) {
              
              message.path!.push(reader.int32());

              continue;
            }

            if (tag === 10) {
              
              const end2 = reader.uint32() + reader.pos;
              while (reader.pos < end2) {
                message.path!.push(reader.int32());
              }

              continue;
            }

            break;
case 2:
if (tag !== 18) {
        break;
      }
    
        message.sourceFile = reader.string();
continue;
case 3:
if (tag !== 24) {
        break;
      }
    
        message.begin = reader.int32();
continue;
case 4:
if (tag !== 32) {
        break;
      }
    
        message.end = reader.int32();
continue;
case 5:
if (tag !== 40) {
        break;
      }
    
        message.semantic = reader.int32() as any;
continue;
}
if ((tag & 7) === 4 || tag === 0) {
        break;
      }
reader.skipType(tag & 7);
}
return message;
},

fromJSON(object: any): GeneratedCodeInfoAnnotation {
      return {
$type: GeneratedCodeInfoAnnotation.$type,
path: globalThis.Array.isArray(object?.path) ? object.path.map((e: any) => globalThis.Number(e)): [],
sourceFile: isSet(object.sourceFile)
          ? globalThis.String(object.sourceFile)
          : "",
begin: isSet(object.begin)
          ? globalThis.Number(object.begin)
          : 0,
end: isSet(object.end)
          ? globalThis.Number(object.end)
          : 0,
semantic: isSet(object.semantic)
          ? generatedCodeInfoAnnotationSemanticFromJSON(object.semantic)
          : 0,
};
},

toJSON(message: GeneratedCodeInfoAnnotation): unknown {
      const obj: any = {};
if (message.path?.length) {
          obj.path = message.path.map(e => Math.round(e));
        }
if (message.sourceFile !== undefined &&  message.sourceFile !== "") {
          obj.sourceFile = message.sourceFile;
        }
if (message.begin !== undefined &&  message.begin !== 0) {
          obj.begin = Math.round(message.begin);
        }
if (message.end !== undefined &&  message.end !== 0) {
          obj.end = Math.round(message.end);
        }
if (message.semantic !== undefined &&  message.semantic !== 0) {
          obj.semantic = generatedCodeInfoAnnotationSemanticToJSON(message.semantic);
        }
return obj;
},

create<I extends Exact<DeepPartial<GeneratedCodeInfoAnnotation>, I>>(base?: I): GeneratedCodeInfoAnnotation {
        return GeneratedCodeInfoAnnotation.fromPartial(base ?? ({} as any));
      },
fromPartial<I extends Exact<DeepPartial<GeneratedCodeInfoAnnotation>, I>>(object: I): GeneratedCodeInfoAnnotation {
const message = createBaseGeneratedCodeInfoAnnotation();
message.path = object.path?.map((e) => e) || [];
message.sourceFile = object.sourceFile ?? "";
message.begin = object.begin ?? 0;
message.end = object.end ?? 0;
message.semantic = object.semantic ?? 0;
return message;
}
            };

messageTypeRegistry.set(GeneratedCodeInfoAnnotation.$type, GeneratedCodeInfoAnnotation);



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
      return globalThis.btoa(bin.join(''));
    
      }

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> =  T extends Builtin
        ? T
        
        : T extends globalThis.Array<infer U>
        ? globalThis.Array<DeepPartial<U>>
        : T extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : T extends {}
        ? { [K in Exclude<keyof T, '$type'>]?: DeepPartial<T[K]> }
        : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
      export type Exact<P, I extends P> = P extends Builtin
        ? P
        : P &
        { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | '$type'>]: never };















function longToNumber(long: Long): number {
        if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
          throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER")
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







