/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Value } from "../../../../google/protobuf/struct";
import { messageTypeRegistry } from "../../../../typeRegistry";

export const protobufPackage = "grpc.gateway.protoc_gen_openapiv2.options";

/**
 * Scheme describes the schemes supported by the OpenAPI Swagger
 * and Operation objects.
 */
export enum Scheme {
  UNKNOWN = 0,
  HTTP = 1,
  HTTPS = 2,
  WS = 3,
  WSS = 4,
  UNRECOGNIZED = -1,
}

export function schemeFromJSON(object: any): Scheme {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return Scheme.UNKNOWN;
    case 1:
    case "HTTP":
      return Scheme.HTTP;
    case 2:
    case "HTTPS":
      return Scheme.HTTPS;
    case 3:
    case "WS":
      return Scheme.WS;
    case 4:
    case "WSS":
      return Scheme.WSS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Scheme.UNRECOGNIZED;
  }
}

export function schemeToJSON(object: Scheme): string {
  switch (object) {
    case Scheme.UNKNOWN:
      return "UNKNOWN";
    case Scheme.HTTP:
      return "HTTP";
    case Scheme.HTTPS:
      return "HTTPS";
    case Scheme.WS:
      return "WS";
    case Scheme.WSS:
      return "WSS";
    case Scheme.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * `Swagger` is a representation of OpenAPI v2 specification's Swagger object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#swaggerObject
 *
 * Example:
 *
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      title: "Echo API";
 *      version: "1.0";
 *      description: "";
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/main/LICENSE";
 *      };
 *    };
 *    schemes: HTTPS;
 *    consumes: "application/json";
 *    produces: "application/json";
 *  };
 */
export interface Swagger {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Swagger";
  /**
   * Specifies the OpenAPI Specification version being used. It can be
   * used by the OpenAPI UI and other clients to interpret the API listing. The
   * value MUST be "2.0".
   */
  swagger?:
    | string
    | undefined;
  /**
   * Provides metadata about the API. The metadata can be used by the
   * clients if needed.
   */
  info?:
    | Info
    | undefined;
  /**
   * The host (name or ip) serving the API. This MUST be the host only and does
   * not include the scheme nor sub-paths. It MAY include a port. If the host is
   * not included, the host serving the documentation is to be used (including
   * the port). The host does not support path templating.
   */
  host?:
    | string
    | undefined;
  /**
   * The base path on which the API is served, which is relative to the host. If
   * it is not included, the API is served directly under the host. The value
   * MUST start with a leading slash (/). The basePath does not support path
   * templating.
   * Note that using `base_path` does not change the endpoint paths that are
   * generated in the resulting OpenAPI file. If you wish to use `base_path`
   * with relatively generated OpenAPI paths, the `base_path` prefix must be
   * manually removed from your `google.api.http` paths and your code changed to
   * serve the API from the `base_path`.
   */
  basePath?:
    | string
    | undefined;
  /**
   * The transfer protocol of the API. Values MUST be from the list: "http",
   * "https", "ws", "wss". If the schemes is not included, the default scheme to
   * be used is the one used to access the OpenAPI definition itself.
   */
  schemes?:
    | Scheme[]
    | undefined;
  /**
   * A list of MIME types the APIs can consume. This is global to all APIs but
   * can be overridden on specific API calls. Value MUST be as described under
   * Mime Types.
   */
  consumes?:
    | string[]
    | undefined;
  /**
   * A list of MIME types the APIs can produce. This is global to all APIs but
   * can be overridden on specific API calls. Value MUST be as described under
   * Mime Types.
   */
  produces?:
    | string[]
    | undefined;
  /**
   * An object to hold responses that can be used across operations. This
   * property does not define global responses for all operations.
   */
  responses?:
    | { [key: string]: Response }
    | undefined;
  /** Security scheme definitions that can be used across the specification. */
  securityDefinitions?:
    | SecurityDefinitions
    | undefined;
  /**
   * A declaration of which security schemes are applied for the API as a whole.
   * The list of values describes alternative security schemes that can be used
   * (that is, there is a logical OR between the security requirements).
   * Individual operations can override this definition.
   */
  security?:
    | SecurityRequirement[]
    | undefined;
  /**
   * A list of tags for API documentation control. Tags can be used for logical
   * grouping of operations by resources or any other qualifier.
   */
  tags?:
    | Tag[]
    | undefined;
  /** Additional external documentation. */
  externalDocs?:
    | ExternalDocumentation
    | undefined;
  /**
   * Custom properties that start with "x-" such as "x-foo" used to describe
   * extra functionality that is not covered by the standard OpenAPI Specification.
   * See: https://swagger.io/docs/specification/2-0/swagger-extensions/
   */
  extensions?: { [key: string]: any | undefined } | undefined;
}

export interface SwaggerResponsesEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Swagger.ResponsesEntry";
  key: string;
  value?: Response | undefined;
}

export interface SwaggerExtensionsEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Swagger.ExtensionsEntry";
  key: string;
  value?: any | undefined;
}

/**
 * `Operation` is a representation of OpenAPI v2 specification's Operation object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#operationObject
 *
 * Example:
 *
 *  service EchoService {
 *    rpc Echo(SimpleMessage) returns (SimpleMessage) {
 *      option (google.api.http) = {
 *        get: "/v1/example/echo/{id}"
 *      };
 *
 *      option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation) = {
 *        summary: "Get a message.";
 *        operation_id: "getMessage";
 *        tags: "echo";
 *        responses: {
 *          key: "200"
 *            value: {
 *            description: "OK";
 *          }
 *        }
 *      };
 *    }
 *  }
 */
export interface Operation {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Operation";
  /**
   * A list of tags for API documentation control. Tags can be used for logical
   * grouping of operations by resources or any other qualifier.
   */
  tags?:
    | string[]
    | undefined;
  /**
   * A short summary of what the operation does. For maximum readability in the
   * swagger-ui, this field SHOULD be less than 120 characters.
   */
  summary?:
    | string
    | undefined;
  /**
   * A verbose explanation of the operation behavior. GFM syntax can be used for
   * rich text representation.
   */
  description?:
    | string
    | undefined;
  /** Additional external documentation for this operation. */
  externalDocs?:
    | ExternalDocumentation
    | undefined;
  /**
   * Unique string used to identify the operation. The id MUST be unique among
   * all operations described in the API. Tools and libraries MAY use the
   * operationId to uniquely identify an operation, therefore, it is recommended
   * to follow common programming naming conventions.
   */
  operationId?:
    | string
    | undefined;
  /**
   * A list of MIME types the operation can consume. This overrides the consumes
   * definition at the OpenAPI Object. An empty value MAY be used to clear the
   * global definition. Value MUST be as described under Mime Types.
   */
  consumes?:
    | string[]
    | undefined;
  /**
   * A list of MIME types the operation can produce. This overrides the produces
   * definition at the OpenAPI Object. An empty value MAY be used to clear the
   * global definition. Value MUST be as described under Mime Types.
   */
  produces?:
    | string[]
    | undefined;
  /**
   * The list of possible responses as they are returned from executing this
   * operation.
   */
  responses?:
    | { [key: string]: Response }
    | undefined;
  /**
   * The transfer protocol for the operation. Values MUST be from the list:
   * "http", "https", "ws", "wss". The value overrides the OpenAPI Object
   * schemes definition.
   */
  schemes?:
    | Scheme[]
    | undefined;
  /**
   * Declares this operation to be deprecated. Usage of the declared operation
   * should be refrained. Default value is false.
   */
  deprecated?:
    | boolean
    | undefined;
  /**
   * A declaration of which security schemes are applied for this operation. The
   * list of values describes alternative security schemes that can be used
   * (that is, there is a logical OR between the security requirements). This
   * definition overrides any declared top-level security. To remove a top-level
   * security declaration, an empty array can be used.
   */
  security?:
    | SecurityRequirement[]
    | undefined;
  /**
   * Custom properties that start with "x-" such as "x-foo" used to describe
   * extra functionality that is not covered by the standard OpenAPI Specification.
   * See: https://swagger.io/docs/specification/2-0/swagger-extensions/
   */
  extensions?:
    | { [key: string]: any | undefined }
    | undefined;
  /**
   * Custom parameters such as HTTP request headers.
   * See: https://swagger.io/docs/specification/2-0/describing-parameters/
   * and https://swagger.io/specification/v2/#parameter-object.
   */
  parameters?: Parameters | undefined;
}

export interface OperationResponsesEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Operation.ResponsesEntry";
  key: string;
  value?: Response | undefined;
}

export interface OperationExtensionsEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Operation.ExtensionsEntry";
  key: string;
  value?: any | undefined;
}

/**
 * `Parameters` is a representation of OpenAPI v2 specification's parameters object.
 * Note: This technically breaks compatibility with the OpenAPI 2 definition structure as we only
 * allow header parameters to be set here since we do not want users specifying custom non-header
 * parameters beyond those inferred from the Protobuf schema.
 * See: https://swagger.io/specification/v2/#parameter-object
 */
export interface Parameters {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Parameters";
  /**
   * `Headers` is one or more HTTP header parameter.
   * See: https://swagger.io/docs/specification/2-0/describing-parameters/#header-parameters
   */
  headers?: HeaderParameter[] | undefined;
}

/**
 * `HeaderParameter` a HTTP header parameter.
 * See: https://swagger.io/specification/v2/#parameter-object
 */
export interface HeaderParameter {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.HeaderParameter";
  /** `Name` is the header name. */
  name?:
    | string
    | undefined;
  /** `Description` is a short description of the header. */
  description?:
    | string
    | undefined;
  /**
   * `Type` is the type of the object. The value MUST be one of "string", "number", "integer", or "boolean". The "array" type is not supported.
   * See: https://swagger.io/specification/v2/#parameterType.
   */
  type?:
    | HeaderParameterType
    | undefined;
  /** `Format` The extending format for the previously mentioned type. */
  format?:
    | string
    | undefined;
  /** `Required` indicates if the header is optional */
  required?: boolean | undefined;
}

/**
 * `Type` is a supported HTTP header type.
 * See https://swagger.io/specification/v2/#parameterType.
 */
export enum HeaderParameterType {
  UNKNOWN = 0,
  STRING = 1,
  NUMBER = 2,
  INTEGER = 3,
  BOOLEAN = 4,
  UNRECOGNIZED = -1,
}

export function headerParameterTypeFromJSON(object: any): HeaderParameterType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return HeaderParameterType.UNKNOWN;
    case 1:
    case "STRING":
      return HeaderParameterType.STRING;
    case 2:
    case "NUMBER":
      return HeaderParameterType.NUMBER;
    case 3:
    case "INTEGER":
      return HeaderParameterType.INTEGER;
    case 4:
    case "BOOLEAN":
      return HeaderParameterType.BOOLEAN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return HeaderParameterType.UNRECOGNIZED;
  }
}

export function headerParameterTypeToJSON(object: HeaderParameterType): string {
  switch (object) {
    case HeaderParameterType.UNKNOWN:
      return "UNKNOWN";
    case HeaderParameterType.STRING:
      return "STRING";
    case HeaderParameterType.NUMBER:
      return "NUMBER";
    case HeaderParameterType.INTEGER:
      return "INTEGER";
    case HeaderParameterType.BOOLEAN:
      return "BOOLEAN";
    case HeaderParameterType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * `Header` is a representation of OpenAPI v2 specification's Header object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#headerObject
 */
export interface Header {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Header";
  /** `Description` is a short description of the header. */
  description?:
    | string
    | undefined;
  /** The type of the object. The value MUST be one of "string", "number", "integer", or "boolean". The "array" type is not supported. */
  type?:
    | string
    | undefined;
  /** `Format` The extending format for the previously mentioned type. */
  format?:
    | string
    | undefined;
  /**
   * `Default` Declares the value of the header that the server will use if none is provided.
   * See: https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2.
   * Unlike JSON Schema this value MUST conform to the defined type for the header.
   */
  default?:
    | string
    | undefined;
  /** 'Pattern' See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3. */
  pattern?: string | undefined;
}

/**
 * `Response` is a representation of OpenAPI v2 specification's Response object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#responseObject
 */
export interface Response {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Response";
  /**
   * `Description` is a short description of the response.
   * GFM syntax can be used for rich text representation.
   */
  description?:
    | string
    | undefined;
  /**
   * `Schema` optionally defines the structure of the response.
   * If `Schema` is not provided, it means there is no content to the response.
   */
  schema?:
    | Schema
    | undefined;
  /**
   * `Headers` A list of headers that are sent with the response.
   * `Header` name is expected to be a string in the canonical format of the MIME header key
   * See: https://golang.org/pkg/net/textproto/#CanonicalMIMEHeaderKey
   */
  headers?:
    | { [key: string]: Header }
    | undefined;
  /**
   * `Examples` gives per-mimetype response examples.
   * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#example-object
   */
  examples?:
    | { [key: string]: string }
    | undefined;
  /**
   * Custom properties that start with "x-" such as "x-foo" used to describe
   * extra functionality that is not covered by the standard OpenAPI Specification.
   * See: https://swagger.io/docs/specification/2-0/swagger-extensions/
   */
  extensions?: { [key: string]: any | undefined } | undefined;
}

export interface ResponseHeadersEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Response.HeadersEntry";
  key: string;
  value?: Header | undefined;
}

export interface ResponseExamplesEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Response.ExamplesEntry";
  key: string;
  value: string;
}

export interface ResponseExtensionsEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Response.ExtensionsEntry";
  key: string;
  value?: any | undefined;
}

/**
 * `Info` is a representation of OpenAPI v2 specification's Info object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#infoObject
 *
 * Example:
 *
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      title: "Echo API";
 *      version: "1.0";
 *      description: "";
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/main/LICENSE";
 *      };
 *    };
 *    ...
 *  };
 */
export interface Info {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Info";
  /** The title of the application. */
  title?:
    | string
    | undefined;
  /**
   * A short description of the application. GFM syntax can be used for rich
   * text representation.
   */
  description?:
    | string
    | undefined;
  /** The Terms of Service for the API. */
  termsOfService?:
    | string
    | undefined;
  /** The contact information for the exposed API. */
  contact?:
    | Contact
    | undefined;
  /** The license information for the exposed API. */
  license?:
    | License
    | undefined;
  /**
   * Provides the version of the application API (not to be confused
   * with the specification version).
   */
  version?:
    | string
    | undefined;
  /**
   * Custom properties that start with "x-" such as "x-foo" used to describe
   * extra functionality that is not covered by the standard OpenAPI Specification.
   * See: https://swagger.io/docs/specification/2-0/swagger-extensions/
   */
  extensions?: { [key: string]: any | undefined } | undefined;
}

export interface InfoExtensionsEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Info.ExtensionsEntry";
  key: string;
  value?: any | undefined;
}

/**
 * `Contact` is a representation of OpenAPI v2 specification's Contact object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#contactObject
 *
 * Example:
 *
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      ...
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      ...
 *    };
 *    ...
 *  };
 */
export interface Contact {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Contact";
  /** The identifying name of the contact person/organization. */
  name?:
    | string
    | undefined;
  /**
   * The URL pointing to the contact information. MUST be in the format of a
   * URL.
   */
  url?:
    | string
    | undefined;
  /**
   * The email address of the contact person/organization. MUST be in the format
   * of an email address.
   */
  email?: string | undefined;
}

/**
 * `License` is a representation of OpenAPI v2 specification's License object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#licenseObject
 *
 * Example:
 *
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      ...
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/main/LICENSE";
 *      };
 *      ...
 *    };
 *    ...
 *  };
 */
export interface License {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.License";
  /** The license name used for the API. */
  name?:
    | string
    | undefined;
  /** A URL to the license used for the API. MUST be in the format of a URL. */
  url?: string | undefined;
}

/**
 * `ExternalDocumentation` is a representation of OpenAPI v2 specification's
 * ExternalDocumentation object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#externalDocumentationObject
 *
 * Example:
 *
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    ...
 *    external_docs: {
 *      description: "More about gRPC-Gateway";
 *      url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *    }
 *    ...
 *  };
 */
export interface ExternalDocumentation {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.ExternalDocumentation";
  /**
   * A short description of the target documentation. GFM syntax can be used for
   * rich text representation.
   */
  description?:
    | string
    | undefined;
  /**
   * The URL for the target documentation. Value MUST be in the format
   * of a URL.
   */
  url?: string | undefined;
}

/**
 * `Schema` is a representation of OpenAPI v2 specification's Schema object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 */
export interface Schema {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Schema";
  jsonSchema?:
    | JSONSchema
    | undefined;
  /**
   * Adds support for polymorphism. The discriminator is the schema property
   * name that is used to differentiate between other schema that inherit this
   * schema. The property name used MUST be defined at this schema and it MUST
   * be in the required property list. When used, the value MUST be the name of
   * this schema or any schema that inherits it.
   */
  discriminator?:
    | string
    | undefined;
  /**
   * Relevant only for Schema "properties" definitions. Declares the property as
   * "read only". This means that it MAY be sent as part of a response but MUST
   * NOT be sent as part of the request. Properties marked as readOnly being
   * true SHOULD NOT be in the required list of the defined schema. Default
   * value is false.
   */
  readOnly?:
    | boolean
    | undefined;
  /** Additional external documentation for this schema. */
  externalDocs?:
    | ExternalDocumentation
    | undefined;
  /**
   * A free-form property to include an example of an instance for this schema in JSON.
   * This is copied verbatim to the output.
   */
  example?: string | undefined;
}

/**
 * `JSONSchema` represents properties from JSON Schema taken, and as used, in
 * the OpenAPI v2 spec.
 *
 * This includes changes made by OpenAPI v2.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 *
 * See also: https://cswr.github.io/JsonSchema/spec/basic_types/,
 * https://github.com/json-schema-org/json-schema-spec/blob/master/schema.json
 *
 * Example:
 *
 *  message SimpleMessage {
 *    option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_schema) = {
 *      json_schema: {
 *        title: "SimpleMessage"
 *        description: "A simple message."
 *        required: ["id"]
 *      }
 *    };
 *
 *    // Id represents the message identifier.
 *    string id = 1; [
 *        (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_field) = {
 *          description: "The unique identifier of the simple message."
 *        }];
 *  }
 */
export interface JSONSchema {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.JSONSchema";
  /**
   * Ref is used to define an external reference to include in the message.
   * This could be a fully qualified proto message reference, and that type must
   * be imported into the protofile. If no message is identified, the Ref will
   * be used verbatim in the output.
   * For example:
   *  `ref: ".google.protobuf.Timestamp"`.
   */
  ref?:
    | string
    | undefined;
  /** The title of the schema. */
  title?:
    | string
    | undefined;
  /** A short description of the schema. */
  description?: string | undefined;
  default?: string | undefined;
  readOnly?:
    | boolean
    | undefined;
  /**
   * A free-form property to include a JSON example of this field. This is copied
   * verbatim to the output swagger.json. Quotes must be escaped.
   * This property is the same for 2.0 and 3.0.0 https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/3.0.0.md#schemaObject  https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
   */
  example?: string | undefined;
  multipleOf?:
    | number
    | undefined;
  /**
   * Maximum represents an inclusive upper limit for a numeric instance. The
   * value of MUST be a number,
   */
  maximum?: number | undefined;
  exclusiveMaximum?:
    | boolean
    | undefined;
  /**
   * minimum represents an inclusive lower limit for a numeric instance. The
   * value of MUST be a number,
   */
  minimum?: number | undefined;
  exclusiveMinimum?: boolean | undefined;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  pattern?: string | undefined;
  maxItems?: number | undefined;
  minItems?: number | undefined;
  uniqueItems?: boolean | undefined;
  maxProperties?: number | undefined;
  minProperties?: number | undefined;
  required?:
    | string[]
    | undefined;
  /** Items in 'array' must be unique. */
  array?: string[] | undefined;
  type?:
    | JSONSchemaJSONSchemaSimpleTypes[]
    | undefined;
  /** `Format` */
  format?:
    | string
    | undefined;
  /** Items in `enum` must be unique https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1 */
  enum?:
    | string[]
    | undefined;
  /** Additional field level properties used when generating the OpenAPI v2 file. */
  fieldConfiguration?:
    | JSONSchemaFieldConfiguration
    | undefined;
  /**
   * Custom properties that start with "x-" such as "x-foo" used to describe
   * extra functionality that is not covered by the standard OpenAPI Specification.
   * See: https://swagger.io/docs/specification/2-0/swagger-extensions/
   */
  extensions?: { [key: string]: any | undefined } | undefined;
}

export enum JSONSchemaJSONSchemaSimpleTypes {
  UNKNOWN = 0,
  ARRAY = 1,
  BOOLEAN = 2,
  INTEGER = 3,
  NULL = 4,
  NUMBER = 5,
  OBJECT = 6,
  STRING = 7,
  UNRECOGNIZED = -1,
}

export function jSONSchemaJSONSchemaSimpleTypesFromJSON(object: any): JSONSchemaJSONSchemaSimpleTypes {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return JSONSchemaJSONSchemaSimpleTypes.UNKNOWN;
    case 1:
    case "ARRAY":
      return JSONSchemaJSONSchemaSimpleTypes.ARRAY;
    case 2:
    case "BOOLEAN":
      return JSONSchemaJSONSchemaSimpleTypes.BOOLEAN;
    case 3:
    case "INTEGER":
      return JSONSchemaJSONSchemaSimpleTypes.INTEGER;
    case 4:
    case "NULL":
      return JSONSchemaJSONSchemaSimpleTypes.NULL;
    case 5:
    case "NUMBER":
      return JSONSchemaJSONSchemaSimpleTypes.NUMBER;
    case 6:
    case "OBJECT":
      return JSONSchemaJSONSchemaSimpleTypes.OBJECT;
    case 7:
    case "STRING":
      return JSONSchemaJSONSchemaSimpleTypes.STRING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return JSONSchemaJSONSchemaSimpleTypes.UNRECOGNIZED;
  }
}

export function jSONSchemaJSONSchemaSimpleTypesToJSON(object: JSONSchemaJSONSchemaSimpleTypes): string {
  switch (object) {
    case JSONSchemaJSONSchemaSimpleTypes.UNKNOWN:
      return "UNKNOWN";
    case JSONSchemaJSONSchemaSimpleTypes.ARRAY:
      return "ARRAY";
    case JSONSchemaJSONSchemaSimpleTypes.BOOLEAN:
      return "BOOLEAN";
    case JSONSchemaJSONSchemaSimpleTypes.INTEGER:
      return "INTEGER";
    case JSONSchemaJSONSchemaSimpleTypes.NULL:
      return "NULL";
    case JSONSchemaJSONSchemaSimpleTypes.NUMBER:
      return "NUMBER";
    case JSONSchemaJSONSchemaSimpleTypes.OBJECT:
      return "OBJECT";
    case JSONSchemaJSONSchemaSimpleTypes.STRING:
      return "STRING";
    case JSONSchemaJSONSchemaSimpleTypes.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * 'FieldConfiguration' provides additional field level properties used when generating the OpenAPI v2 file.
 * These properties are not defined by OpenAPIv2, but they are used to control the generation.
 */
export interface JSONSchemaFieldConfiguration {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.JSONSchema.FieldConfiguration";
  /**
   * Alternative parameter name when used as path parameter. If set, this will
   * be used as the complete parameter name when this field is used as a path
   * parameter. Use this to avoid having auto generated path parameter names
   * for overlapping paths.
   */
  pathParamName?: string | undefined;
}

export interface JSONSchemaExtensionsEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.JSONSchema.ExtensionsEntry";
  key: string;
  value?: any | undefined;
}

/**
 * `Tag` is a representation of OpenAPI v2 specification's Tag object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#tagObject
 */
export interface Tag {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Tag";
  /**
   * The name of the tag. Use it to allow override of the name of a
   * global Tag object, then use that name to reference the tag throughout the
   * OpenAPI file.
   */
  name?:
    | string
    | undefined;
  /**
   * A short description for the tag. GFM syntax can be used for rich text
   * representation.
   */
  description?:
    | string
    | undefined;
  /** Additional external documentation for this tag. */
  externalDocs?:
    | ExternalDocumentation
    | undefined;
  /**
   * Custom properties that start with "x-" such as "x-foo" used to describe
   * extra functionality that is not covered by the standard OpenAPI Specification.
   * See: https://swagger.io/docs/specification/2-0/swagger-extensions/
   */
  extensions?: { [key: string]: any | undefined } | undefined;
}

export interface TagExtensionsEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Tag.ExtensionsEntry";
  key: string;
  value?: any | undefined;
}

/**
 * `SecurityDefinitions` is a representation of OpenAPI v2 specification's
 * Security Definitions object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityDefinitionsObject
 *
 * A declaration of the security schemes available to be used in the
 * specification. This does not enforce the security schemes on the operations
 * and only serves to provide the relevant details for each scheme.
 */
export interface SecurityDefinitions {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.SecurityDefinitions";
  /**
   * A single security scheme definition, mapping a "name" to the scheme it
   * defines.
   */
  security?: { [key: string]: SecurityScheme } | undefined;
}

export interface SecurityDefinitionsSecurityEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.SecurityDefinitions.SecurityEntry";
  key: string;
  value?: SecurityScheme | undefined;
}

/**
 * `SecurityScheme` is a representation of OpenAPI v2 specification's
 * Security Scheme object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securitySchemeObject
 *
 * Allows the definition of a security scheme that can be used by the
 * operations. Supported schemes are basic authentication, an API key (either as
 * a header or as a query parameter) and OAuth2's common flows (implicit,
 * password, application and access code).
 */
export interface SecurityScheme {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.SecurityScheme";
  /**
   * The type of the security scheme. Valid values are "basic",
   * "apiKey" or "oauth2".
   */
  type?:
    | SecuritySchemeType
    | undefined;
  /** A short description for security scheme. */
  description?:
    | string
    | undefined;
  /**
   * The name of the header or query parameter to be used.
   * Valid for apiKey.
   */
  name?:
    | string
    | undefined;
  /**
   * The location of the API key. Valid values are "query" or
   * "header".
   * Valid for apiKey.
   */
  in?:
    | SecuritySchemeIn
    | undefined;
  /**
   * The flow used by the OAuth2 security scheme. Valid values are
   * "implicit", "password", "application" or "accessCode".
   * Valid for oauth2.
   */
  flow?:
    | SecuritySchemeFlow
    | undefined;
  /**
   * The authorization URL to be used for this flow. This SHOULD be in
   * the form of a URL.
   * Valid for oauth2/implicit and oauth2/accessCode.
   */
  authorizationUrl?:
    | string
    | undefined;
  /**
   * The token URL to be used for this flow. This SHOULD be in the
   * form of a URL.
   * Valid for oauth2/password, oauth2/application and oauth2/accessCode.
   */
  tokenUrl?:
    | string
    | undefined;
  /**
   * The available scopes for the OAuth2 security scheme.
   * Valid for oauth2.
   */
  scopes?:
    | Scopes
    | undefined;
  /**
   * Custom properties that start with "x-" such as "x-foo" used to describe
   * extra functionality that is not covered by the standard OpenAPI Specification.
   * See: https://swagger.io/docs/specification/2-0/swagger-extensions/
   */
  extensions?: { [key: string]: any | undefined } | undefined;
}

/**
 * The type of the security scheme. Valid values are "basic",
 * "apiKey" or "oauth2".
 */
export enum SecuritySchemeType {
  INVALID = 0,
  BASIC = 1,
  API_KEY = 2,
  OAUTH2 = 3,
  UNRECOGNIZED = -1,
}

export function securitySchemeTypeFromJSON(object: any): SecuritySchemeType {
  switch (object) {
    case 0:
    case "TYPE_INVALID":
      return SecuritySchemeType.INVALID;
    case 1:
    case "TYPE_BASIC":
      return SecuritySchemeType.BASIC;
    case 2:
    case "TYPE_API_KEY":
      return SecuritySchemeType.API_KEY;
    case 3:
    case "TYPE_OAUTH2":
      return SecuritySchemeType.OAUTH2;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SecuritySchemeType.UNRECOGNIZED;
  }
}

export function securitySchemeTypeToJSON(object: SecuritySchemeType): string {
  switch (object) {
    case SecuritySchemeType.INVALID:
      return "TYPE_INVALID";
    case SecuritySchemeType.BASIC:
      return "TYPE_BASIC";
    case SecuritySchemeType.API_KEY:
      return "TYPE_API_KEY";
    case SecuritySchemeType.OAUTH2:
      return "TYPE_OAUTH2";
    case SecuritySchemeType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The location of the API key. Valid values are "query" or "header". */
export enum SecuritySchemeIn {
  INVALID = 0,
  QUERY = 1,
  HEADER = 2,
  UNRECOGNIZED = -1,
}

export function securitySchemeInFromJSON(object: any): SecuritySchemeIn {
  switch (object) {
    case 0:
    case "IN_INVALID":
      return SecuritySchemeIn.INVALID;
    case 1:
    case "IN_QUERY":
      return SecuritySchemeIn.QUERY;
    case 2:
    case "IN_HEADER":
      return SecuritySchemeIn.HEADER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SecuritySchemeIn.UNRECOGNIZED;
  }
}

export function securitySchemeInToJSON(object: SecuritySchemeIn): string {
  switch (object) {
    case SecuritySchemeIn.INVALID:
      return "IN_INVALID";
    case SecuritySchemeIn.QUERY:
      return "IN_QUERY";
    case SecuritySchemeIn.HEADER:
      return "IN_HEADER";
    case SecuritySchemeIn.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The flow used by the OAuth2 security scheme. Valid values are
 * "implicit", "password", "application" or "accessCode".
 */
export enum SecuritySchemeFlow {
  INVALID = 0,
  IMPLICIT = 1,
  PASSWORD = 2,
  APPLICATION = 3,
  ACCESS_CODE = 4,
  UNRECOGNIZED = -1,
}

export function securitySchemeFlowFromJSON(object: any): SecuritySchemeFlow {
  switch (object) {
    case 0:
    case "FLOW_INVALID":
      return SecuritySchemeFlow.INVALID;
    case 1:
    case "FLOW_IMPLICIT":
      return SecuritySchemeFlow.IMPLICIT;
    case 2:
    case "FLOW_PASSWORD":
      return SecuritySchemeFlow.PASSWORD;
    case 3:
    case "FLOW_APPLICATION":
      return SecuritySchemeFlow.APPLICATION;
    case 4:
    case "FLOW_ACCESS_CODE":
      return SecuritySchemeFlow.ACCESS_CODE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SecuritySchemeFlow.UNRECOGNIZED;
  }
}

export function securitySchemeFlowToJSON(object: SecuritySchemeFlow): string {
  switch (object) {
    case SecuritySchemeFlow.INVALID:
      return "FLOW_INVALID";
    case SecuritySchemeFlow.IMPLICIT:
      return "FLOW_IMPLICIT";
    case SecuritySchemeFlow.PASSWORD:
      return "FLOW_PASSWORD";
    case SecuritySchemeFlow.APPLICATION:
      return "FLOW_APPLICATION";
    case SecuritySchemeFlow.ACCESS_CODE:
      return "FLOW_ACCESS_CODE";
    case SecuritySchemeFlow.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface SecuritySchemeExtensionsEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.SecurityScheme.ExtensionsEntry";
  key: string;
  value?: any | undefined;
}

/**
 * `SecurityRequirement` is a representation of OpenAPI v2 specification's
 * Security Requirement object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityRequirementObject
 *
 * Lists the required security schemes to execute this operation. The object can
 * have multiple security schemes declared in it which are all required (that
 * is, there is a logical AND between the schemes).
 *
 * The name used for each property MUST correspond to a security scheme
 * declared in the Security Definitions.
 */
export interface SecurityRequirement {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirement";
  /**
   * Each name must correspond to a security scheme which is declared in
   * the Security Definitions. If the security scheme is of type "oauth2",
   * then the value is a list of scope names required for the execution.
   * For other security scheme types, the array MUST be empty.
   */
  securityRequirement?: { [key: string]: SecurityRequirementSecurityRequirementValue } | undefined;
}

/**
 * If the security scheme is of type "oauth2", then the value is a list of
 * scope names required for the execution. For other security scheme types,
 * the array MUST be empty.
 */
export interface SecurityRequirementSecurityRequirementValue {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirement.SecurityRequirementValue";
  scope?: string[] | undefined;
}

export interface SecurityRequirementSecurityRequirementEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirement.SecurityRequirementEntry";
  key: string;
  value?: SecurityRequirementSecurityRequirementValue | undefined;
}

/**
 * `Scopes` is a representation of OpenAPI v2 specification's Scopes object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#scopesObject
 *
 * Lists the available scopes for an OAuth2 security scheme.
 */
export interface Scopes {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Scopes";
  /**
   * Maps between a name of a scope to a short description of it (as the value
   * of the property).
   */
  scope?: { [key: string]: string } | undefined;
}

export interface ScopesScopeEntry {
  $type?: "grpc.gateway.protoc_gen_openapiv2.options.Scopes.ScopeEntry";
  key: string;
  value: string;
}

function createBaseSwagger(): Swagger {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.Swagger",
    swagger: "",
    info: undefined,
    host: "",
    basePath: "",
    schemes: [],
    consumes: [],
    produces: [],
    responses: {},
    securityDefinitions: undefined,
    security: [],
    tags: [],
    externalDocs: undefined,
    extensions: {},
  };
}

export const Swagger = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Swagger" as const,

  encode(message: Swagger, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.swagger !== undefined && message.swagger !== "") {
      writer.uint32(10).string(message.swagger);
    }
    if (message.info !== undefined) {
      Info.encode(message.info, writer.uint32(18).fork()).ldelim();
    }
    if (message.host !== undefined && message.host !== "") {
      writer.uint32(26).string(message.host);
    }
    if (message.basePath !== undefined && message.basePath !== "") {
      writer.uint32(34).string(message.basePath);
    }
    if (message.schemes !== undefined && message.schemes.length !== 0) {
      writer.uint32(42).fork();
      for (const v of message.schemes) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.consumes !== undefined && message.consumes.length !== 0) {
      for (const v of message.consumes) {
        writer.uint32(50).string(v!);
      }
    }
    if (message.produces !== undefined && message.produces.length !== 0) {
      for (const v of message.produces) {
        writer.uint32(58).string(v!);
      }
    }
    Object.entries(message.responses || {}).forEach(([key, value]) => {
      SwaggerResponsesEntry.encode({
        $type: "grpc.gateway.protoc_gen_openapiv2.options.Swagger.ResponsesEntry",
        key: key as any,
        value,
      }, writer.uint32(82).fork()).ldelim();
    });
    if (message.securityDefinitions !== undefined) {
      SecurityDefinitions.encode(message.securityDefinitions, writer.uint32(90).fork()).ldelim();
    }
    if (message.security !== undefined && message.security.length !== 0) {
      for (const v of message.security) {
        SecurityRequirement.encode(v!, writer.uint32(98).fork()).ldelim();
      }
    }
    if (message.tags !== undefined && message.tags.length !== 0) {
      for (const v of message.tags) {
        Tag.encode(v!, writer.uint32(106).fork()).ldelim();
      }
    }
    if (message.externalDocs !== undefined) {
      ExternalDocumentation.encode(message.externalDocs, writer.uint32(114).fork()).ldelim();
    }
    Object.entries(message.extensions || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        SwaggerExtensionsEntry.encode({
          $type: "grpc.gateway.protoc_gen_openapiv2.options.Swagger.ExtensionsEntry",
          key: key as any,
          value,
        }, writer.uint32(122).fork()).ldelim();
      }
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Swagger {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwagger();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.swagger = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.info = Info.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.host = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.basePath = reader.string();
          continue;
        case 5:
          if (tag === 40) {
            message.schemes!.push(reader.int32() as any);

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.schemes!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.consumes!.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.produces!.push(reader.string());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          const entry10 = SwaggerResponsesEntry.decode(reader, reader.uint32());
          if (entry10.value !== undefined) {
            message.responses![entry10.key] = entry10.value;
          }
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.securityDefinitions = SecurityDefinitions.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.security!.push(SecurityRequirement.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.tags!.push(Tag.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.externalDocs = ExternalDocumentation.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          const entry15 = SwaggerExtensionsEntry.decode(reader, reader.uint32());
          if (entry15.value !== undefined) {
            message.extensions![entry15.key] = entry15.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Swagger {
    return {
      $type: Swagger.$type,
      swagger: isSet(object.swagger) ? globalThis.String(object.swagger) : "",
      info: isSet(object.info) ? Info.fromJSON(object.info) : undefined,
      host: isSet(object.host) ? globalThis.String(object.host) : "",
      basePath: isSet(object.basePath) ? globalThis.String(object.basePath) : "",
      schemes: globalThis.Array.isArray(object?.schemes) ? object.schemes.map((e: any) => schemeFromJSON(e)) : [],
      consumes: globalThis.Array.isArray(object?.consumes) ? object.consumes.map((e: any) => globalThis.String(e)) : [],
      produces: globalThis.Array.isArray(object?.produces) ? object.produces.map((e: any) => globalThis.String(e)) : [],
      responses: isObject(object.responses)
        ? Object.entries(object.responses).reduce<{ [key: string]: Response }>((acc, [key, value]) => {
          acc[key] = Response.fromJSON(value);
          return acc;
        }, {})
        : {},
      securityDefinitions: isSet(object.securityDefinitions)
        ? SecurityDefinitions.fromJSON(object.securityDefinitions)
        : undefined,
      security: globalThis.Array.isArray(object?.security)
        ? object.security.map((e: any) => SecurityRequirement.fromJSON(e))
        : [],
      tags: globalThis.Array.isArray(object?.tags) ? object.tags.map((e: any) => Tag.fromJSON(e)) : [],
      externalDocs: isSet(object.externalDocs) ? ExternalDocumentation.fromJSON(object.externalDocs) : undefined,
      extensions: isObject(object.extensions)
        ? Object.entries(object.extensions).reduce<{ [key: string]: any | undefined }>((acc, [key, value]) => {
          acc[key] = value as any | undefined;
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Swagger): unknown {
    const obj: any = {};
    if (message.swagger !== undefined && message.swagger !== "") {
      obj.swagger = message.swagger;
    }
    if (message.info !== undefined) {
      obj.info = Info.toJSON(message.info);
    }
    if (message.host !== undefined && message.host !== "") {
      obj.host = message.host;
    }
    if (message.basePath !== undefined && message.basePath !== "") {
      obj.basePath = message.basePath;
    }
    if (message.schemes?.length) {
      obj.schemes = message.schemes.map((e) => schemeToJSON(e));
    }
    if (message.consumes?.length) {
      obj.consumes = message.consumes;
    }
    if (message.produces?.length) {
      obj.produces = message.produces;
    }
    if (message.responses) {
      const entries = Object.entries(message.responses);
      if (entries.length > 0) {
        obj.responses = {};
        entries.forEach(([k, v]) => {
          obj.responses[k] = Response.toJSON(v);
        });
      }
    }
    if (message.securityDefinitions !== undefined) {
      obj.securityDefinitions = SecurityDefinitions.toJSON(message.securityDefinitions);
    }
    if (message.security?.length) {
      obj.security = message.security.map((e) => SecurityRequirement.toJSON(e));
    }
    if (message.tags?.length) {
      obj.tags = message.tags.map((e) => Tag.toJSON(e));
    }
    if (message.externalDocs !== undefined) {
      obj.externalDocs = ExternalDocumentation.toJSON(message.externalDocs);
    }
    if (message.extensions) {
      const entries = Object.entries(message.extensions);
      if (entries.length > 0) {
        obj.extensions = {};
        entries.forEach(([k, v]) => {
          obj.extensions[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Swagger>, I>>(base?: I): Swagger {
    return Swagger.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Swagger>, I>>(object: I): Swagger {
    const message = createBaseSwagger();
    message.swagger = object.swagger ?? "";
    message.info = (object.info !== undefined && object.info !== null) ? Info.fromPartial(object.info) : undefined;
    message.host = object.host ?? "";
    message.basePath = object.basePath ?? "";
    message.schemes = object.schemes?.map((e) => e) || [];
    message.consumes = object.consumes?.map((e) => e) || [];
    message.produces = object.produces?.map((e) => e) || [];
    message.responses = Object.entries(object.responses ?? {}).reduce<{ [key: string]: Response }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = Response.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.securityDefinitions = (object.securityDefinitions !== undefined && object.securityDefinitions !== null)
      ? SecurityDefinitions.fromPartial(object.securityDefinitions)
      : undefined;
    message.security = object.security?.map((e) => SecurityRequirement.fromPartial(e)) || [];
    message.tags = object.tags?.map((e) => Tag.fromPartial(e)) || [];
    message.externalDocs = (object.externalDocs !== undefined && object.externalDocs !== null)
      ? ExternalDocumentation.fromPartial(object.externalDocs)
      : undefined;
    message.extensions = Object.entries(object.extensions ?? {}).reduce<{ [key: string]: any | undefined }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

messageTypeRegistry.set(Swagger.$type, Swagger);

function createBaseSwaggerResponsesEntry(): SwaggerResponsesEntry {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Swagger.ResponsesEntry", key: "", value: undefined };
}

export const SwaggerResponsesEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Swagger.ResponsesEntry" as const,

  encode(message: SwaggerResponsesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Response.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwaggerResponsesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwaggerResponsesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Response.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SwaggerResponsesEntry {
    return {
      $type: SwaggerResponsesEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? Response.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: SwaggerResponsesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = Response.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SwaggerResponsesEntry>, I>>(base?: I): SwaggerResponsesEntry {
    return SwaggerResponsesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SwaggerResponsesEntry>, I>>(object: I): SwaggerResponsesEntry {
    const message = createBaseSwaggerResponsesEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? Response.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SwaggerResponsesEntry.$type, SwaggerResponsesEntry);

function createBaseSwaggerExtensionsEntry(): SwaggerExtensionsEntry {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Swagger.ExtensionsEntry", key: "", value: undefined };
}

export const SwaggerExtensionsEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Swagger.ExtensionsEntry" as const,

  encode(message: SwaggerExtensionsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(Value.wrap(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwaggerExtensionsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwaggerExtensionsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Value.unwrap(Value.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SwaggerExtensionsEntry {
    return {
      $type: SwaggerExtensionsEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object?.value) ? object.value : undefined,
    };
  },

  toJSON(message: SwaggerExtensionsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SwaggerExtensionsEntry>, I>>(base?: I): SwaggerExtensionsEntry {
    return SwaggerExtensionsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SwaggerExtensionsEntry>, I>>(object: I): SwaggerExtensionsEntry {
    const message = createBaseSwaggerExtensionsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(SwaggerExtensionsEntry.$type, SwaggerExtensionsEntry);

function createBaseOperation(): Operation {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.Operation",
    tags: [],
    summary: "",
    description: "",
    externalDocs: undefined,
    operationId: "",
    consumes: [],
    produces: [],
    responses: {},
    schemes: [],
    deprecated: false,
    security: [],
    extensions: {},
    parameters: undefined,
  };
}

export const Operation = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Operation" as const,

  encode(message: Operation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tags !== undefined && message.tags.length !== 0) {
      for (const v of message.tags) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.summary !== undefined && message.summary !== "") {
      writer.uint32(18).string(message.summary);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.externalDocs !== undefined) {
      ExternalDocumentation.encode(message.externalDocs, writer.uint32(34).fork()).ldelim();
    }
    if (message.operationId !== undefined && message.operationId !== "") {
      writer.uint32(42).string(message.operationId);
    }
    if (message.consumes !== undefined && message.consumes.length !== 0) {
      for (const v of message.consumes) {
        writer.uint32(50).string(v!);
      }
    }
    if (message.produces !== undefined && message.produces.length !== 0) {
      for (const v of message.produces) {
        writer.uint32(58).string(v!);
      }
    }
    Object.entries(message.responses || {}).forEach(([key, value]) => {
      OperationResponsesEntry.encode({
        $type: "grpc.gateway.protoc_gen_openapiv2.options.Operation.ResponsesEntry",
        key: key as any,
        value,
      }, writer.uint32(74).fork()).ldelim();
    });
    if (message.schemes !== undefined && message.schemes.length !== 0) {
      writer.uint32(82).fork();
      for (const v of message.schemes) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.deprecated !== undefined && message.deprecated !== false) {
      writer.uint32(88).bool(message.deprecated);
    }
    if (message.security !== undefined && message.security.length !== 0) {
      for (const v of message.security) {
        SecurityRequirement.encode(v!, writer.uint32(98).fork()).ldelim();
      }
    }
    Object.entries(message.extensions || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        OperationExtensionsEntry.encode({
          $type: "grpc.gateway.protoc_gen_openapiv2.options.Operation.ExtensionsEntry",
          key: key as any,
          value,
        }, writer.uint32(106).fork()).ldelim();
      }
    });
    if (message.parameters !== undefined) {
      Parameters.encode(message.parameters, writer.uint32(114).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Operation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tags!.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.summary = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.externalDocs = ExternalDocumentation.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.operationId = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.consumes!.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.produces!.push(reader.string());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          const entry9 = OperationResponsesEntry.decode(reader, reader.uint32());
          if (entry9.value !== undefined) {
            message.responses![entry9.key] = entry9.value;
          }
          continue;
        case 10:
          if (tag === 80) {
            message.schemes!.push(reader.int32() as any);

            continue;
          }

          if (tag === 82) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.schemes!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.deprecated = reader.bool();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.security!.push(SecurityRequirement.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          const entry13 = OperationExtensionsEntry.decode(reader, reader.uint32());
          if (entry13.value !== undefined) {
            message.extensions![entry13.key] = entry13.value;
          }
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.parameters = Parameters.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Operation {
    return {
      $type: Operation.$type,
      tags: globalThis.Array.isArray(object?.tags) ? object.tags.map((e: any) => globalThis.String(e)) : [],
      summary: isSet(object.summary) ? globalThis.String(object.summary) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      externalDocs: isSet(object.externalDocs) ? ExternalDocumentation.fromJSON(object.externalDocs) : undefined,
      operationId: isSet(object.operationId) ? globalThis.String(object.operationId) : "",
      consumes: globalThis.Array.isArray(object?.consumes) ? object.consumes.map((e: any) => globalThis.String(e)) : [],
      produces: globalThis.Array.isArray(object?.produces) ? object.produces.map((e: any) => globalThis.String(e)) : [],
      responses: isObject(object.responses)
        ? Object.entries(object.responses).reduce<{ [key: string]: Response }>((acc, [key, value]) => {
          acc[key] = Response.fromJSON(value);
          return acc;
        }, {})
        : {},
      schemes: globalThis.Array.isArray(object?.schemes) ? object.schemes.map((e: any) => schemeFromJSON(e)) : [],
      deprecated: isSet(object.deprecated) ? globalThis.Boolean(object.deprecated) : false,
      security: globalThis.Array.isArray(object?.security)
        ? object.security.map((e: any) => SecurityRequirement.fromJSON(e))
        : [],
      extensions: isObject(object.extensions)
        ? Object.entries(object.extensions).reduce<{ [key: string]: any | undefined }>((acc, [key, value]) => {
          acc[key] = value as any | undefined;
          return acc;
        }, {})
        : {},
      parameters: isSet(object.parameters) ? Parameters.fromJSON(object.parameters) : undefined,
    };
  },

  toJSON(message: Operation): unknown {
    const obj: any = {};
    if (message.tags?.length) {
      obj.tags = message.tags;
    }
    if (message.summary !== undefined && message.summary !== "") {
      obj.summary = message.summary;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.externalDocs !== undefined) {
      obj.externalDocs = ExternalDocumentation.toJSON(message.externalDocs);
    }
    if (message.operationId !== undefined && message.operationId !== "") {
      obj.operationId = message.operationId;
    }
    if (message.consumes?.length) {
      obj.consumes = message.consumes;
    }
    if (message.produces?.length) {
      obj.produces = message.produces;
    }
    if (message.responses) {
      const entries = Object.entries(message.responses);
      if (entries.length > 0) {
        obj.responses = {};
        entries.forEach(([k, v]) => {
          obj.responses[k] = Response.toJSON(v);
        });
      }
    }
    if (message.schemes?.length) {
      obj.schemes = message.schemes.map((e) => schemeToJSON(e));
    }
    if (message.deprecated !== undefined && message.deprecated !== false) {
      obj.deprecated = message.deprecated;
    }
    if (message.security?.length) {
      obj.security = message.security.map((e) => SecurityRequirement.toJSON(e));
    }
    if (message.extensions) {
      const entries = Object.entries(message.extensions);
      if (entries.length > 0) {
        obj.extensions = {};
        entries.forEach(([k, v]) => {
          obj.extensions[k] = v;
        });
      }
    }
    if (message.parameters !== undefined) {
      obj.parameters = Parameters.toJSON(message.parameters);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Operation>, I>>(base?: I): Operation {
    return Operation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Operation>, I>>(object: I): Operation {
    const message = createBaseOperation();
    message.tags = object.tags?.map((e) => e) || [];
    message.summary = object.summary ?? "";
    message.description = object.description ?? "";
    message.externalDocs = (object.externalDocs !== undefined && object.externalDocs !== null)
      ? ExternalDocumentation.fromPartial(object.externalDocs)
      : undefined;
    message.operationId = object.operationId ?? "";
    message.consumes = object.consumes?.map((e) => e) || [];
    message.produces = object.produces?.map((e) => e) || [];
    message.responses = Object.entries(object.responses ?? {}).reduce<{ [key: string]: Response }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = Response.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.schemes = object.schemes?.map((e) => e) || [];
    message.deprecated = object.deprecated ?? false;
    message.security = object.security?.map((e) => SecurityRequirement.fromPartial(e)) || [];
    message.extensions = Object.entries(object.extensions ?? {}).reduce<{ [key: string]: any | undefined }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    message.parameters = (object.parameters !== undefined && object.parameters !== null)
      ? Parameters.fromPartial(object.parameters)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(Operation.$type, Operation);

function createBaseOperationResponsesEntry(): OperationResponsesEntry {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Operation.ResponsesEntry", key: "", value: undefined };
}

export const OperationResponsesEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Operation.ResponsesEntry" as const,

  encode(message: OperationResponsesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Response.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OperationResponsesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperationResponsesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Response.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OperationResponsesEntry {
    return {
      $type: OperationResponsesEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? Response.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: OperationResponsesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = Response.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OperationResponsesEntry>, I>>(base?: I): OperationResponsesEntry {
    return OperationResponsesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OperationResponsesEntry>, I>>(object: I): OperationResponsesEntry {
    const message = createBaseOperationResponsesEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? Response.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(OperationResponsesEntry.$type, OperationResponsesEntry);

function createBaseOperationExtensionsEntry(): OperationExtensionsEntry {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Operation.ExtensionsEntry", key: "", value: undefined };
}

export const OperationExtensionsEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Operation.ExtensionsEntry" as const,

  encode(message: OperationExtensionsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(Value.wrap(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OperationExtensionsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperationExtensionsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Value.unwrap(Value.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OperationExtensionsEntry {
    return {
      $type: OperationExtensionsEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object?.value) ? object.value : undefined,
    };
  },

  toJSON(message: OperationExtensionsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OperationExtensionsEntry>, I>>(base?: I): OperationExtensionsEntry {
    return OperationExtensionsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OperationExtensionsEntry>, I>>(object: I): OperationExtensionsEntry {
    const message = createBaseOperationExtensionsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(OperationExtensionsEntry.$type, OperationExtensionsEntry);

function createBaseParameters(): Parameters {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Parameters", headers: [] };
}

export const Parameters = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Parameters" as const,

  encode(message: Parameters, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.headers !== undefined && message.headers.length !== 0) {
      for (const v of message.headers) {
        HeaderParameter.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Parameters {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParameters();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.headers!.push(HeaderParameter.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Parameters {
    return {
      $type: Parameters.$type,
      headers: globalThis.Array.isArray(object?.headers)
        ? object.headers.map((e: any) => HeaderParameter.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Parameters): unknown {
    const obj: any = {};
    if (message.headers?.length) {
      obj.headers = message.headers.map((e) => HeaderParameter.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Parameters>, I>>(base?: I): Parameters {
    return Parameters.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Parameters>, I>>(object: I): Parameters {
    const message = createBaseParameters();
    message.headers = object.headers?.map((e) => HeaderParameter.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(Parameters.$type, Parameters);

function createBaseHeaderParameter(): HeaderParameter {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.HeaderParameter",
    name: "",
    description: "",
    type: 0,
    format: "",
    required: false,
  };
}

export const HeaderParameter = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.HeaderParameter" as const,

  encode(message: HeaderParameter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.format !== undefined && message.format !== "") {
      writer.uint32(34).string(message.format);
    }
    if (message.required !== undefined && message.required !== false) {
      writer.uint32(40).bool(message.required);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HeaderParameter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeaderParameter();
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

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.format = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
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

  fromJSON(object: any): HeaderParameter {
    return {
      $type: HeaderParameter.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      type: isSet(object.type) ? headerParameterTypeFromJSON(object.type) : 0,
      format: isSet(object.format) ? globalThis.String(object.format) : "",
      required: isSet(object.required) ? globalThis.Boolean(object.required) : false,
    };
  },

  toJSON(message: HeaderParameter): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = headerParameterTypeToJSON(message.type);
    }
    if (message.format !== undefined && message.format !== "") {
      obj.format = message.format;
    }
    if (message.required !== undefined && message.required !== false) {
      obj.required = message.required;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HeaderParameter>, I>>(base?: I): HeaderParameter {
    return HeaderParameter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HeaderParameter>, I>>(object: I): HeaderParameter {
    const message = createBaseHeaderParameter();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.type = object.type ?? 0;
    message.format = object.format ?? "";
    message.required = object.required ?? false;
    return message;
  },
};

messageTypeRegistry.set(HeaderParameter.$type, HeaderParameter);

function createBaseHeader(): Header {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.Header",
    description: "",
    type: "",
    format: "",
    default: "",
    pattern: "",
  };
}

export const Header = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Header" as const,

  encode(message: Header, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.type !== undefined && message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.format !== undefined && message.format !== "") {
      writer.uint32(26).string(message.format);
    }
    if (message.default !== undefined && message.default !== "") {
      writer.uint32(50).string(message.default);
    }
    if (message.pattern !== undefined && message.pattern !== "") {
      writer.uint32(106).string(message.pattern);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Header {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.format = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.default = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.pattern = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Header {
    return {
      $type: Header.$type,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      format: isSet(object.format) ? globalThis.String(object.format) : "",
      default: isSet(object.default) ? globalThis.String(object.default) : "",
      pattern: isSet(object.pattern) ? globalThis.String(object.pattern) : "",
    };
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.type !== undefined && message.type !== "") {
      obj.type = message.type;
    }
    if (message.format !== undefined && message.format !== "") {
      obj.format = message.format;
    }
    if (message.default !== undefined && message.default !== "") {
      obj.default = message.default;
    }
    if (message.pattern !== undefined && message.pattern !== "") {
      obj.pattern = message.pattern;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Header>, I>>(base?: I): Header {
    return Header.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Header>, I>>(object: I): Header {
    const message = createBaseHeader();
    message.description = object.description ?? "";
    message.type = object.type ?? "";
    message.format = object.format ?? "";
    message.default = object.default ?? "";
    message.pattern = object.pattern ?? "";
    return message;
  },
};

messageTypeRegistry.set(Header.$type, Header);

function createBaseResponse(): Response {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.Response",
    description: "",
    schema: undefined,
    headers: {},
    examples: {},
    extensions: {},
  };
}

export const Response = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Response" as const,

  encode(message: Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(18).fork()).ldelim();
    }
    Object.entries(message.headers || {}).forEach(([key, value]) => {
      ResponseHeadersEntry.encode({
        $type: "grpc.gateway.protoc_gen_openapiv2.options.Response.HeadersEntry",
        key: key as any,
        value,
      }, writer.uint32(26).fork()).ldelim();
    });
    Object.entries(message.examples || {}).forEach(([key, value]) => {
      ResponseExamplesEntry.encode({
        $type: "grpc.gateway.protoc_gen_openapiv2.options.Response.ExamplesEntry",
        key: key as any,
        value,
      }, writer.uint32(34).fork()).ldelim();
    });
    Object.entries(message.extensions || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        ResponseExtensionsEntry.encode({
          $type: "grpc.gateway.protoc_gen_openapiv2.options.Response.ExtensionsEntry",
          key: key as any,
          value,
        }, writer.uint32(42).fork()).ldelim();
      }
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.schema = Schema.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = ResponseHeadersEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.headers![entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = ResponseExamplesEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.examples![entry4.key] = entry4.value;
          }
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = ResponseExtensionsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.extensions![entry5.key] = entry5.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Response {
    return {
      $type: Response.$type,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
      headers: isObject(object.headers)
        ? Object.entries(object.headers).reduce<{ [key: string]: Header }>((acc, [key, value]) => {
          acc[key] = Header.fromJSON(value);
          return acc;
        }, {})
        : {},
      examples: isObject(object.examples)
        ? Object.entries(object.examples).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      extensions: isObject(object.extensions)
        ? Object.entries(object.extensions).reduce<{ [key: string]: any | undefined }>((acc, [key, value]) => {
          acc[key] = value as any | undefined;
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.schema !== undefined) {
      obj.schema = Schema.toJSON(message.schema);
    }
    if (message.headers) {
      const entries = Object.entries(message.headers);
      if (entries.length > 0) {
        obj.headers = {};
        entries.forEach(([k, v]) => {
          obj.headers[k] = Header.toJSON(v);
        });
      }
    }
    if (message.examples) {
      const entries = Object.entries(message.examples);
      if (entries.length > 0) {
        obj.examples = {};
        entries.forEach(([k, v]) => {
          obj.examples[k] = v;
        });
      }
    }
    if (message.extensions) {
      const entries = Object.entries(message.extensions);
      if (entries.length > 0) {
        obj.extensions = {};
        entries.forEach(([k, v]) => {
          obj.extensions[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Response>, I>>(base?: I): Response {
    return Response.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Response>, I>>(object: I): Response {
    const message = createBaseResponse();
    message.description = object.description ?? "";
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? Schema.fromPartial(object.schema)
      : undefined;
    message.headers = Object.entries(object.headers ?? {}).reduce<{ [key: string]: Header }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Header.fromPartial(value);
      }
      return acc;
    }, {});
    message.examples = Object.entries(object.examples ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    message.extensions = Object.entries(object.extensions ?? {}).reduce<{ [key: string]: any | undefined }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

messageTypeRegistry.set(Response.$type, Response);

function createBaseResponseHeadersEntry(): ResponseHeadersEntry {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Response.HeadersEntry", key: "", value: undefined };
}

export const ResponseHeadersEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Response.HeadersEntry" as const,

  encode(message: ResponseHeadersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Header.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseHeadersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseHeadersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Header.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseHeadersEntry {
    return {
      $type: ResponseHeadersEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? Header.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ResponseHeadersEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = Header.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseHeadersEntry>, I>>(base?: I): ResponseHeadersEntry {
    return ResponseHeadersEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseHeadersEntry>, I>>(object: I): ResponseHeadersEntry {
    const message = createBaseResponseHeadersEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? Header.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ResponseHeadersEntry.$type, ResponseHeadersEntry);

function createBaseResponseExamplesEntry(): ResponseExamplesEntry {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Response.ExamplesEntry", key: "", value: "" };
}

export const ResponseExamplesEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Response.ExamplesEntry" as const,

  encode(message: ResponseExamplesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseExamplesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseExamplesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
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

  fromJSON(object: any): ResponseExamplesEntry {
    return {
      $type: ResponseExamplesEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: ResponseExamplesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseExamplesEntry>, I>>(base?: I): ResponseExamplesEntry {
    return ResponseExamplesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseExamplesEntry>, I>>(object: I): ResponseExamplesEntry {
    const message = createBaseResponseExamplesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

messageTypeRegistry.set(ResponseExamplesEntry.$type, ResponseExamplesEntry);

function createBaseResponseExtensionsEntry(): ResponseExtensionsEntry {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Response.ExtensionsEntry", key: "", value: undefined };
}

export const ResponseExtensionsEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Response.ExtensionsEntry" as const,

  encode(message: ResponseExtensionsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(Value.wrap(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseExtensionsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseExtensionsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Value.unwrap(Value.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseExtensionsEntry {
    return {
      $type: ResponseExtensionsEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object?.value) ? object.value : undefined,
    };
  },

  toJSON(message: ResponseExtensionsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseExtensionsEntry>, I>>(base?: I): ResponseExtensionsEntry {
    return ResponseExtensionsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseExtensionsEntry>, I>>(object: I): ResponseExtensionsEntry {
    const message = createBaseResponseExtensionsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(ResponseExtensionsEntry.$type, ResponseExtensionsEntry);

function createBaseInfo(): Info {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.Info",
    title: "",
    description: "",
    termsOfService: "",
    contact: undefined,
    license: undefined,
    version: "",
    extensions: {},
  };
}

export const Info = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Info" as const,

  encode(message: Info, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== undefined && message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.termsOfService !== undefined && message.termsOfService !== "") {
      writer.uint32(26).string(message.termsOfService);
    }
    if (message.contact !== undefined) {
      Contact.encode(message.contact, writer.uint32(34).fork()).ldelim();
    }
    if (message.license !== undefined) {
      License.encode(message.license, writer.uint32(42).fork()).ldelim();
    }
    if (message.version !== undefined && message.version !== "") {
      writer.uint32(50).string(message.version);
    }
    Object.entries(message.extensions || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        InfoExtensionsEntry.encode({
          $type: "grpc.gateway.protoc_gen_openapiv2.options.Info.ExtensionsEntry",
          key: key as any,
          value,
        }, writer.uint32(58).fork()).ldelim();
      }
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Info {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.termsOfService = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.contact = Contact.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.license = License.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.version = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          const entry7 = InfoExtensionsEntry.decode(reader, reader.uint32());
          if (entry7.value !== undefined) {
            message.extensions![entry7.key] = entry7.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Info {
    return {
      $type: Info.$type,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      termsOfService: isSet(object.termsOfService) ? globalThis.String(object.termsOfService) : "",
      contact: isSet(object.contact) ? Contact.fromJSON(object.contact) : undefined,
      license: isSet(object.license) ? License.fromJSON(object.license) : undefined,
      version: isSet(object.version) ? globalThis.String(object.version) : "",
      extensions: isObject(object.extensions)
        ? Object.entries(object.extensions).reduce<{ [key: string]: any | undefined }>((acc, [key, value]) => {
          acc[key] = value as any | undefined;
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Info): unknown {
    const obj: any = {};
    if (message.title !== undefined && message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.termsOfService !== undefined && message.termsOfService !== "") {
      obj.termsOfService = message.termsOfService;
    }
    if (message.contact !== undefined) {
      obj.contact = Contact.toJSON(message.contact);
    }
    if (message.license !== undefined) {
      obj.license = License.toJSON(message.license);
    }
    if (message.version !== undefined && message.version !== "") {
      obj.version = message.version;
    }
    if (message.extensions) {
      const entries = Object.entries(message.extensions);
      if (entries.length > 0) {
        obj.extensions = {};
        entries.forEach(([k, v]) => {
          obj.extensions[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Info>, I>>(base?: I): Info {
    return Info.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Info>, I>>(object: I): Info {
    const message = createBaseInfo();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.termsOfService = object.termsOfService ?? "";
    message.contact = (object.contact !== undefined && object.contact !== null)
      ? Contact.fromPartial(object.contact)
      : undefined;
    message.license = (object.license !== undefined && object.license !== null)
      ? License.fromPartial(object.license)
      : undefined;
    message.version = object.version ?? "";
    message.extensions = Object.entries(object.extensions ?? {}).reduce<{ [key: string]: any | undefined }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

messageTypeRegistry.set(Info.$type, Info);

function createBaseInfoExtensionsEntry(): InfoExtensionsEntry {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Info.ExtensionsEntry", key: "", value: undefined };
}

export const InfoExtensionsEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Info.ExtensionsEntry" as const,

  encode(message: InfoExtensionsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(Value.wrap(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InfoExtensionsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfoExtensionsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Value.unwrap(Value.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InfoExtensionsEntry {
    return {
      $type: InfoExtensionsEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object?.value) ? object.value : undefined,
    };
  },

  toJSON(message: InfoExtensionsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InfoExtensionsEntry>, I>>(base?: I): InfoExtensionsEntry {
    return InfoExtensionsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InfoExtensionsEntry>, I>>(object: I): InfoExtensionsEntry {
    const message = createBaseInfoExtensionsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(InfoExtensionsEntry.$type, InfoExtensionsEntry);

function createBaseContact(): Contact {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Contact", name: "", url: "", email: "" };
}

export const Contact = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Contact" as const,

  encode(message: Contact, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.email !== undefined && message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Contact {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContact();
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

          message.url = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Contact {
    return {
      $type: Contact.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
    };
  },

  toJSON(message: Contact): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    if (message.email !== undefined && message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Contact>, I>>(base?: I): Contact {
    return Contact.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Contact>, I>>(object: I): Contact {
    const message = createBaseContact();
    message.name = object.name ?? "";
    message.url = object.url ?? "";
    message.email = object.email ?? "";
    return message;
  },
};

messageTypeRegistry.set(Contact.$type, Contact);

function createBaseLicense(): License {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.License", name: "", url: "" };
}

export const License = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.License" as const,

  encode(message: License, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): License {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLicense();
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

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): License {
    return {
      $type: License.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
    };
  },

  toJSON(message: License): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<License>, I>>(base?: I): License {
    return License.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<License>, I>>(object: I): License {
    const message = createBaseLicense();
    message.name = object.name ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

messageTypeRegistry.set(License.$type, License);

function createBaseExternalDocumentation(): ExternalDocumentation {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.ExternalDocumentation", description: "", url: "" };
}

export const ExternalDocumentation = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.ExternalDocumentation" as const,

  encode(message: ExternalDocumentation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExternalDocumentation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExternalDocumentation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExternalDocumentation {
    return {
      $type: ExternalDocumentation.$type,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
    };
  },

  toJSON(message: ExternalDocumentation): unknown {
    const obj: any = {};
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.url !== undefined && message.url !== "") {
      obj.url = message.url;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExternalDocumentation>, I>>(base?: I): ExternalDocumentation {
    return ExternalDocumentation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExternalDocumentation>, I>>(object: I): ExternalDocumentation {
    const message = createBaseExternalDocumentation();
    message.description = object.description ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

messageTypeRegistry.set(ExternalDocumentation.$type, ExternalDocumentation);

function createBaseSchema(): Schema {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.Schema",
    jsonSchema: undefined,
    discriminator: "",
    readOnly: false,
    externalDocs: undefined,
    example: "",
  };
}

export const Schema = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Schema" as const,

  encode(message: Schema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.jsonSchema !== undefined) {
      JSONSchema.encode(message.jsonSchema, writer.uint32(10).fork()).ldelim();
    }
    if (message.discriminator !== undefined && message.discriminator !== "") {
      writer.uint32(18).string(message.discriminator);
    }
    if (message.readOnly !== undefined && message.readOnly !== false) {
      writer.uint32(24).bool(message.readOnly);
    }
    if (message.externalDocs !== undefined) {
      ExternalDocumentation.encode(message.externalDocs, writer.uint32(42).fork()).ldelim();
    }
    if (message.example !== undefined && message.example !== "") {
      writer.uint32(50).string(message.example);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Schema {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.jsonSchema = JSONSchema.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.discriminator = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.readOnly = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.externalDocs = ExternalDocumentation.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.example = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Schema {
    return {
      $type: Schema.$type,
      jsonSchema: isSet(object.jsonSchema) ? JSONSchema.fromJSON(object.jsonSchema) : undefined,
      discriminator: isSet(object.discriminator) ? globalThis.String(object.discriminator) : "",
      readOnly: isSet(object.readOnly) ? globalThis.Boolean(object.readOnly) : false,
      externalDocs: isSet(object.externalDocs) ? ExternalDocumentation.fromJSON(object.externalDocs) : undefined,
      example: isSet(object.example) ? globalThis.String(object.example) : "",
    };
  },

  toJSON(message: Schema): unknown {
    const obj: any = {};
    if (message.jsonSchema !== undefined) {
      obj.jsonSchema = JSONSchema.toJSON(message.jsonSchema);
    }
    if (message.discriminator !== undefined && message.discriminator !== "") {
      obj.discriminator = message.discriminator;
    }
    if (message.readOnly !== undefined && message.readOnly !== false) {
      obj.readOnly = message.readOnly;
    }
    if (message.externalDocs !== undefined) {
      obj.externalDocs = ExternalDocumentation.toJSON(message.externalDocs);
    }
    if (message.example !== undefined && message.example !== "") {
      obj.example = message.example;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Schema>, I>>(base?: I): Schema {
    return Schema.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Schema>, I>>(object: I): Schema {
    const message = createBaseSchema();
    message.jsonSchema = (object.jsonSchema !== undefined && object.jsonSchema !== null)
      ? JSONSchema.fromPartial(object.jsonSchema)
      : undefined;
    message.discriminator = object.discriminator ?? "";
    message.readOnly = object.readOnly ?? false;
    message.externalDocs = (object.externalDocs !== undefined && object.externalDocs !== null)
      ? ExternalDocumentation.fromPartial(object.externalDocs)
      : undefined;
    message.example = object.example ?? "";
    return message;
  },
};

messageTypeRegistry.set(Schema.$type, Schema);

function createBaseJSONSchema(): JSONSchema {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.JSONSchema",
    ref: "",
    title: "",
    description: "",
    default: "",
    readOnly: false,
    example: "",
    multipleOf: 0,
    maximum: 0,
    exclusiveMaximum: false,
    minimum: 0,
    exclusiveMinimum: false,
    maxLength: 0,
    minLength: 0,
    pattern: "",
    maxItems: 0,
    minItems: 0,
    uniqueItems: false,
    maxProperties: 0,
    minProperties: 0,
    required: [],
    array: [],
    type: [],
    format: "",
    enum: [],
    fieldConfiguration: undefined,
    extensions: {},
  };
}

export const JSONSchema = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.JSONSchema" as const,

  encode(message: JSONSchema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ref !== undefined && message.ref !== "") {
      writer.uint32(26).string(message.ref);
    }
    if (message.title !== undefined && message.title !== "") {
      writer.uint32(42).string(message.title);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.default !== undefined && message.default !== "") {
      writer.uint32(58).string(message.default);
    }
    if (message.readOnly !== undefined && message.readOnly !== false) {
      writer.uint32(64).bool(message.readOnly);
    }
    if (message.example !== undefined && message.example !== "") {
      writer.uint32(74).string(message.example);
    }
    if (message.multipleOf !== undefined && message.multipleOf !== 0) {
      writer.uint32(81).double(message.multipleOf);
    }
    if (message.maximum !== undefined && message.maximum !== 0) {
      writer.uint32(89).double(message.maximum);
    }
    if (message.exclusiveMaximum !== undefined && message.exclusiveMaximum !== false) {
      writer.uint32(96).bool(message.exclusiveMaximum);
    }
    if (message.minimum !== undefined && message.minimum !== 0) {
      writer.uint32(105).double(message.minimum);
    }
    if (message.exclusiveMinimum !== undefined && message.exclusiveMinimum !== false) {
      writer.uint32(112).bool(message.exclusiveMinimum);
    }
    if (message.maxLength !== undefined && message.maxLength !== 0) {
      writer.uint32(120).uint64(message.maxLength);
    }
    if (message.minLength !== undefined && message.minLength !== 0) {
      writer.uint32(128).uint64(message.minLength);
    }
    if (message.pattern !== undefined && message.pattern !== "") {
      writer.uint32(138).string(message.pattern);
    }
    if (message.maxItems !== undefined && message.maxItems !== 0) {
      writer.uint32(160).uint64(message.maxItems);
    }
    if (message.minItems !== undefined && message.minItems !== 0) {
      writer.uint32(168).uint64(message.minItems);
    }
    if (message.uniqueItems !== undefined && message.uniqueItems !== false) {
      writer.uint32(176).bool(message.uniqueItems);
    }
    if (message.maxProperties !== undefined && message.maxProperties !== 0) {
      writer.uint32(192).uint64(message.maxProperties);
    }
    if (message.minProperties !== undefined && message.minProperties !== 0) {
      writer.uint32(200).uint64(message.minProperties);
    }
    if (message.required !== undefined && message.required.length !== 0) {
      for (const v of message.required) {
        writer.uint32(210).string(v!);
      }
    }
    if (message.array !== undefined && message.array.length !== 0) {
      for (const v of message.array) {
        writer.uint32(274).string(v!);
      }
    }
    if (message.type !== undefined && message.type.length !== 0) {
      writer.uint32(282).fork();
      for (const v of message.type) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.format !== undefined && message.format !== "") {
      writer.uint32(290).string(message.format);
    }
    if (message.enum !== undefined && message.enum.length !== 0) {
      for (const v of message.enum) {
        writer.uint32(370).string(v!);
      }
    }
    if (message.fieldConfiguration !== undefined) {
      JSONSchemaFieldConfiguration.encode(message.fieldConfiguration, writer.uint32(8010).fork()).ldelim();
    }
    Object.entries(message.extensions || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        JSONSchemaExtensionsEntry.encode({
          $type: "grpc.gateway.protoc_gen_openapiv2.options.JSONSchema.ExtensionsEntry",
          key: key as any,
          value,
        }, writer.uint32(386).fork()).ldelim();
      }
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JSONSchema {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJSONSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 26) {
            break;
          }

          message.ref = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.title = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.description = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.default = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.readOnly = reader.bool();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.example = reader.string();
          continue;
        case 10:
          if (tag !== 81) {
            break;
          }

          message.multipleOf = reader.double();
          continue;
        case 11:
          if (tag !== 89) {
            break;
          }

          message.maximum = reader.double();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.exclusiveMaximum = reader.bool();
          continue;
        case 13:
          if (tag !== 105) {
            break;
          }

          message.minimum = reader.double();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.exclusiveMinimum = reader.bool();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.maxLength = longToNumber(reader.uint64() as Long);
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.minLength = longToNumber(reader.uint64() as Long);
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.pattern = reader.string();
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }

          message.maxItems = longToNumber(reader.uint64() as Long);
          continue;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.minItems = longToNumber(reader.uint64() as Long);
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.uniqueItems = reader.bool();
          continue;
        case 24:
          if (tag !== 192) {
            break;
          }

          message.maxProperties = longToNumber(reader.uint64() as Long);
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.minProperties = longToNumber(reader.uint64() as Long);
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.required!.push(reader.string());
          continue;
        case 34:
          if (tag !== 274) {
            break;
          }

          message.array!.push(reader.string());
          continue;
        case 35:
          if (tag === 280) {
            message.type!.push(reader.int32() as any);

            continue;
          }

          if (tag === 282) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.type!.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 36:
          if (tag !== 290) {
            break;
          }

          message.format = reader.string();
          continue;
        case 46:
          if (tag !== 370) {
            break;
          }

          message.enum!.push(reader.string());
          continue;
        case 1001:
          if (tag !== 8010) {
            break;
          }

          message.fieldConfiguration = JSONSchemaFieldConfiguration.decode(reader, reader.uint32());
          continue;
        case 48:
          if (tag !== 386) {
            break;
          }

          const entry48 = JSONSchemaExtensionsEntry.decode(reader, reader.uint32());
          if (entry48.value !== undefined) {
            message.extensions![entry48.key] = entry48.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JSONSchema {
    return {
      $type: JSONSchema.$type,
      ref: isSet(object.ref) ? globalThis.String(object.ref) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      default: isSet(object.default) ? globalThis.String(object.default) : "",
      readOnly: isSet(object.readOnly) ? globalThis.Boolean(object.readOnly) : false,
      example: isSet(object.example) ? globalThis.String(object.example) : "",
      multipleOf: isSet(object.multipleOf) ? globalThis.Number(object.multipleOf) : 0,
      maximum: isSet(object.maximum) ? globalThis.Number(object.maximum) : 0,
      exclusiveMaximum: isSet(object.exclusiveMaximum) ? globalThis.Boolean(object.exclusiveMaximum) : false,
      minimum: isSet(object.minimum) ? globalThis.Number(object.minimum) : 0,
      exclusiveMinimum: isSet(object.exclusiveMinimum) ? globalThis.Boolean(object.exclusiveMinimum) : false,
      maxLength: isSet(object.maxLength) ? globalThis.Number(object.maxLength) : 0,
      minLength: isSet(object.minLength) ? globalThis.Number(object.minLength) : 0,
      pattern: isSet(object.pattern) ? globalThis.String(object.pattern) : "",
      maxItems: isSet(object.maxItems) ? globalThis.Number(object.maxItems) : 0,
      minItems: isSet(object.minItems) ? globalThis.Number(object.minItems) : 0,
      uniqueItems: isSet(object.uniqueItems) ? globalThis.Boolean(object.uniqueItems) : false,
      maxProperties: isSet(object.maxProperties) ? globalThis.Number(object.maxProperties) : 0,
      minProperties: isSet(object.minProperties) ? globalThis.Number(object.minProperties) : 0,
      required: globalThis.Array.isArray(object?.required) ? object.required.map((e: any) => globalThis.String(e)) : [],
      array: globalThis.Array.isArray(object?.array) ? object.array.map((e: any) => globalThis.String(e)) : [],
      type: globalThis.Array.isArray(object?.type)
        ? object.type.map((e: any) => jSONSchemaJSONSchemaSimpleTypesFromJSON(e))
        : [],
      format: isSet(object.format) ? globalThis.String(object.format) : "",
      enum: globalThis.Array.isArray(object?.enum) ? object.enum.map((e: any) => globalThis.String(e)) : [],
      fieldConfiguration: isSet(object.fieldConfiguration)
        ? JSONSchemaFieldConfiguration.fromJSON(object.fieldConfiguration)
        : undefined,
      extensions: isObject(object.extensions)
        ? Object.entries(object.extensions).reduce<{ [key: string]: any | undefined }>((acc, [key, value]) => {
          acc[key] = value as any | undefined;
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: JSONSchema): unknown {
    const obj: any = {};
    if (message.ref !== undefined && message.ref !== "") {
      obj.ref = message.ref;
    }
    if (message.title !== undefined && message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.default !== undefined && message.default !== "") {
      obj.default = message.default;
    }
    if (message.readOnly !== undefined && message.readOnly !== false) {
      obj.readOnly = message.readOnly;
    }
    if (message.example !== undefined && message.example !== "") {
      obj.example = message.example;
    }
    if (message.multipleOf !== undefined && message.multipleOf !== 0) {
      obj.multipleOf = message.multipleOf;
    }
    if (message.maximum !== undefined && message.maximum !== 0) {
      obj.maximum = message.maximum;
    }
    if (message.exclusiveMaximum !== undefined && message.exclusiveMaximum !== false) {
      obj.exclusiveMaximum = message.exclusiveMaximum;
    }
    if (message.minimum !== undefined && message.minimum !== 0) {
      obj.minimum = message.minimum;
    }
    if (message.exclusiveMinimum !== undefined && message.exclusiveMinimum !== false) {
      obj.exclusiveMinimum = message.exclusiveMinimum;
    }
    if (message.maxLength !== undefined && message.maxLength !== 0) {
      obj.maxLength = Math.round(message.maxLength);
    }
    if (message.minLength !== undefined && message.minLength !== 0) {
      obj.minLength = Math.round(message.minLength);
    }
    if (message.pattern !== undefined && message.pattern !== "") {
      obj.pattern = message.pattern;
    }
    if (message.maxItems !== undefined && message.maxItems !== 0) {
      obj.maxItems = Math.round(message.maxItems);
    }
    if (message.minItems !== undefined && message.minItems !== 0) {
      obj.minItems = Math.round(message.minItems);
    }
    if (message.uniqueItems !== undefined && message.uniqueItems !== false) {
      obj.uniqueItems = message.uniqueItems;
    }
    if (message.maxProperties !== undefined && message.maxProperties !== 0) {
      obj.maxProperties = Math.round(message.maxProperties);
    }
    if (message.minProperties !== undefined && message.minProperties !== 0) {
      obj.minProperties = Math.round(message.minProperties);
    }
    if (message.required?.length) {
      obj.required = message.required;
    }
    if (message.array?.length) {
      obj.array = message.array;
    }
    if (message.type?.length) {
      obj.type = message.type.map((e) => jSONSchemaJSONSchemaSimpleTypesToJSON(e));
    }
    if (message.format !== undefined && message.format !== "") {
      obj.format = message.format;
    }
    if (message.enum?.length) {
      obj.enum = message.enum;
    }
    if (message.fieldConfiguration !== undefined) {
      obj.fieldConfiguration = JSONSchemaFieldConfiguration.toJSON(message.fieldConfiguration);
    }
    if (message.extensions) {
      const entries = Object.entries(message.extensions);
      if (entries.length > 0) {
        obj.extensions = {};
        entries.forEach(([k, v]) => {
          obj.extensions[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JSONSchema>, I>>(base?: I): JSONSchema {
    return JSONSchema.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JSONSchema>, I>>(object: I): JSONSchema {
    const message = createBaseJSONSchema();
    message.ref = object.ref ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.default = object.default ?? "";
    message.readOnly = object.readOnly ?? false;
    message.example = object.example ?? "";
    message.multipleOf = object.multipleOf ?? 0;
    message.maximum = object.maximum ?? 0;
    message.exclusiveMaximum = object.exclusiveMaximum ?? false;
    message.minimum = object.minimum ?? 0;
    message.exclusiveMinimum = object.exclusiveMinimum ?? false;
    message.maxLength = object.maxLength ?? 0;
    message.minLength = object.minLength ?? 0;
    message.pattern = object.pattern ?? "";
    message.maxItems = object.maxItems ?? 0;
    message.minItems = object.minItems ?? 0;
    message.uniqueItems = object.uniqueItems ?? false;
    message.maxProperties = object.maxProperties ?? 0;
    message.minProperties = object.minProperties ?? 0;
    message.required = object.required?.map((e) => e) || [];
    message.array = object.array?.map((e) => e) || [];
    message.type = object.type?.map((e) => e) || [];
    message.format = object.format ?? "";
    message.enum = object.enum?.map((e) => e) || [];
    message.fieldConfiguration = (object.fieldConfiguration !== undefined && object.fieldConfiguration !== null)
      ? JSONSchemaFieldConfiguration.fromPartial(object.fieldConfiguration)
      : undefined;
    message.extensions = Object.entries(object.extensions ?? {}).reduce<{ [key: string]: any | undefined }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

messageTypeRegistry.set(JSONSchema.$type, JSONSchema);

function createBaseJSONSchemaFieldConfiguration(): JSONSchemaFieldConfiguration {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.JSONSchema.FieldConfiguration", pathParamName: "" };
}

export const JSONSchemaFieldConfiguration = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.JSONSchema.FieldConfiguration" as const,

  encode(message: JSONSchemaFieldConfiguration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pathParamName !== undefined && message.pathParamName !== "") {
      writer.uint32(378).string(message.pathParamName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JSONSchemaFieldConfiguration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJSONSchemaFieldConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 47:
          if (tag !== 378) {
            break;
          }

          message.pathParamName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JSONSchemaFieldConfiguration {
    return {
      $type: JSONSchemaFieldConfiguration.$type,
      pathParamName: isSet(object.pathParamName) ? globalThis.String(object.pathParamName) : "",
    };
  },

  toJSON(message: JSONSchemaFieldConfiguration): unknown {
    const obj: any = {};
    if (message.pathParamName !== undefined && message.pathParamName !== "") {
      obj.pathParamName = message.pathParamName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JSONSchemaFieldConfiguration>, I>>(base?: I): JSONSchemaFieldConfiguration {
    return JSONSchemaFieldConfiguration.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JSONSchemaFieldConfiguration>, I>>(object: I): JSONSchemaFieldConfiguration {
    const message = createBaseJSONSchemaFieldConfiguration();
    message.pathParamName = object.pathParamName ?? "";
    return message;
  },
};

messageTypeRegistry.set(JSONSchemaFieldConfiguration.$type, JSONSchemaFieldConfiguration);

function createBaseJSONSchemaExtensionsEntry(): JSONSchemaExtensionsEntry {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.JSONSchema.ExtensionsEntry", key: "", value: undefined };
}

export const JSONSchemaExtensionsEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.JSONSchema.ExtensionsEntry" as const,

  encode(message: JSONSchemaExtensionsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(Value.wrap(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JSONSchemaExtensionsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJSONSchemaExtensionsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Value.unwrap(Value.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JSONSchemaExtensionsEntry {
    return {
      $type: JSONSchemaExtensionsEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object?.value) ? object.value : undefined,
    };
  },

  toJSON(message: JSONSchemaExtensionsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JSONSchemaExtensionsEntry>, I>>(base?: I): JSONSchemaExtensionsEntry {
    return JSONSchemaExtensionsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JSONSchemaExtensionsEntry>, I>>(object: I): JSONSchemaExtensionsEntry {
    const message = createBaseJSONSchemaExtensionsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(JSONSchemaExtensionsEntry.$type, JSONSchemaExtensionsEntry);

function createBaseTag(): Tag {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.Tag",
    name: "",
    description: "",
    externalDocs: undefined,
    extensions: {},
  };
}

export const Tag = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Tag" as const,

  encode(message: Tag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.externalDocs !== undefined) {
      ExternalDocumentation.encode(message.externalDocs, writer.uint32(26).fork()).ldelim();
    }
    Object.entries(message.extensions || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        TagExtensionsEntry.encode({
          $type: "grpc.gateway.protoc_gen_openapiv2.options.Tag.ExtensionsEntry",
          key: key as any,
          value,
        }, writer.uint32(34).fork()).ldelim();
      }
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tag {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTag();
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

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.externalDocs = ExternalDocumentation.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = TagExtensionsEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.extensions![entry4.key] = entry4.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Tag {
    return {
      $type: Tag.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      externalDocs: isSet(object.externalDocs) ? ExternalDocumentation.fromJSON(object.externalDocs) : undefined,
      extensions: isObject(object.extensions)
        ? Object.entries(object.extensions).reduce<{ [key: string]: any | undefined }>((acc, [key, value]) => {
          acc[key] = value as any | undefined;
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Tag): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.externalDocs !== undefined) {
      obj.externalDocs = ExternalDocumentation.toJSON(message.externalDocs);
    }
    if (message.extensions) {
      const entries = Object.entries(message.extensions);
      if (entries.length > 0) {
        obj.extensions = {};
        entries.forEach(([k, v]) => {
          obj.extensions[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Tag>, I>>(base?: I): Tag {
    return Tag.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Tag>, I>>(object: I): Tag {
    const message = createBaseTag();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.externalDocs = (object.externalDocs !== undefined && object.externalDocs !== null)
      ? ExternalDocumentation.fromPartial(object.externalDocs)
      : undefined;
    message.extensions = Object.entries(object.extensions ?? {}).reduce<{ [key: string]: any | undefined }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

messageTypeRegistry.set(Tag.$type, Tag);

function createBaseTagExtensionsEntry(): TagExtensionsEntry {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Tag.ExtensionsEntry", key: "", value: undefined };
}

export const TagExtensionsEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Tag.ExtensionsEntry" as const,

  encode(message: TagExtensionsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(Value.wrap(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TagExtensionsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTagExtensionsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Value.unwrap(Value.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TagExtensionsEntry {
    return {
      $type: TagExtensionsEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object?.value) ? object.value : undefined,
    };
  },

  toJSON(message: TagExtensionsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TagExtensionsEntry>, I>>(base?: I): TagExtensionsEntry {
    return TagExtensionsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TagExtensionsEntry>, I>>(object: I): TagExtensionsEntry {
    const message = createBaseTagExtensionsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(TagExtensionsEntry.$type, TagExtensionsEntry);

function createBaseSecurityDefinitions(): SecurityDefinitions {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityDefinitions", security: {} };
}

export const SecurityDefinitions = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityDefinitions" as const,

  encode(message: SecurityDefinitions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.security || {}).forEach(([key, value]) => {
      SecurityDefinitionsSecurityEntry.encode({
        $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityDefinitions.SecurityEntry",
        key: key as any,
        value,
      }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SecurityDefinitions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSecurityDefinitions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = SecurityDefinitionsSecurityEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.security![entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SecurityDefinitions {
    return {
      $type: SecurityDefinitions.$type,
      security: isObject(object.security)
        ? Object.entries(object.security).reduce<{ [key: string]: SecurityScheme }>((acc, [key, value]) => {
          acc[key] = SecurityScheme.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: SecurityDefinitions): unknown {
    const obj: any = {};
    if (message.security) {
      const entries = Object.entries(message.security);
      if (entries.length > 0) {
        obj.security = {};
        entries.forEach(([k, v]) => {
          obj.security[k] = SecurityScheme.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SecurityDefinitions>, I>>(base?: I): SecurityDefinitions {
    return SecurityDefinitions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SecurityDefinitions>, I>>(object: I): SecurityDefinitions {
    const message = createBaseSecurityDefinitions();
    message.security = Object.entries(object.security ?? {}).reduce<{ [key: string]: SecurityScheme }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = SecurityScheme.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

messageTypeRegistry.set(SecurityDefinitions.$type, SecurityDefinitions);

function createBaseSecurityDefinitionsSecurityEntry(): SecurityDefinitionsSecurityEntry {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityDefinitions.SecurityEntry",
    key: "",
    value: undefined,
  };
}

export const SecurityDefinitionsSecurityEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityDefinitions.SecurityEntry" as const,

  encode(message: SecurityDefinitionsSecurityEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SecurityScheme.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SecurityDefinitionsSecurityEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSecurityDefinitionsSecurityEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = SecurityScheme.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SecurityDefinitionsSecurityEntry {
    return {
      $type: SecurityDefinitionsSecurityEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? SecurityScheme.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: SecurityDefinitionsSecurityEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = SecurityScheme.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SecurityDefinitionsSecurityEntry>, I>>(
    base?: I,
  ): SecurityDefinitionsSecurityEntry {
    return SecurityDefinitionsSecurityEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SecurityDefinitionsSecurityEntry>, I>>(
    object: I,
  ): SecurityDefinitionsSecurityEntry {
    const message = createBaseSecurityDefinitionsSecurityEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? SecurityScheme.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SecurityDefinitionsSecurityEntry.$type, SecurityDefinitionsSecurityEntry);

function createBaseSecurityScheme(): SecurityScheme {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityScheme",
    type: 0,
    description: "",
    name: "",
    in: 0,
    flow: 0,
    authorizationUrl: "",
    tokenUrl: "",
    scopes: undefined,
    extensions: {},
  };
}

export const SecurityScheme = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityScheme" as const,

  encode(message: SecurityScheme, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.in !== undefined && message.in !== 0) {
      writer.uint32(32).int32(message.in);
    }
    if (message.flow !== undefined && message.flow !== 0) {
      writer.uint32(40).int32(message.flow);
    }
    if (message.authorizationUrl !== undefined && message.authorizationUrl !== "") {
      writer.uint32(50).string(message.authorizationUrl);
    }
    if (message.tokenUrl !== undefined && message.tokenUrl !== "") {
      writer.uint32(58).string(message.tokenUrl);
    }
    if (message.scopes !== undefined) {
      Scopes.encode(message.scopes, writer.uint32(66).fork()).ldelim();
    }
    Object.entries(message.extensions || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        SecuritySchemeExtensionsEntry.encode({
          $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityScheme.ExtensionsEntry",
          key: key as any,
          value,
        }, writer.uint32(74).fork()).ldelim();
      }
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SecurityScheme {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSecurityScheme();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.in = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.flow = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.authorizationUrl = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.tokenUrl = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.scopes = Scopes.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          const entry9 = SecuritySchemeExtensionsEntry.decode(reader, reader.uint32());
          if (entry9.value !== undefined) {
            message.extensions![entry9.key] = entry9.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SecurityScheme {
    return {
      $type: SecurityScheme.$type,
      type: isSet(object.type) ? securitySchemeTypeFromJSON(object.type) : 0,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      in: isSet(object.in) ? securitySchemeInFromJSON(object.in) : 0,
      flow: isSet(object.flow) ? securitySchemeFlowFromJSON(object.flow) : 0,
      authorizationUrl: isSet(object.authorizationUrl) ? globalThis.String(object.authorizationUrl) : "",
      tokenUrl: isSet(object.tokenUrl) ? globalThis.String(object.tokenUrl) : "",
      scopes: isSet(object.scopes) ? Scopes.fromJSON(object.scopes) : undefined,
      extensions: isObject(object.extensions)
        ? Object.entries(object.extensions).reduce<{ [key: string]: any | undefined }>((acc, [key, value]) => {
          acc[key] = value as any | undefined;
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: SecurityScheme): unknown {
    const obj: any = {};
    if (message.type !== undefined && message.type !== 0) {
      obj.type = securitySchemeTypeToJSON(message.type);
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.in !== undefined && message.in !== 0) {
      obj.in = securitySchemeInToJSON(message.in);
    }
    if (message.flow !== undefined && message.flow !== 0) {
      obj.flow = securitySchemeFlowToJSON(message.flow);
    }
    if (message.authorizationUrl !== undefined && message.authorizationUrl !== "") {
      obj.authorizationUrl = message.authorizationUrl;
    }
    if (message.tokenUrl !== undefined && message.tokenUrl !== "") {
      obj.tokenUrl = message.tokenUrl;
    }
    if (message.scopes !== undefined) {
      obj.scopes = Scopes.toJSON(message.scopes);
    }
    if (message.extensions) {
      const entries = Object.entries(message.extensions);
      if (entries.length > 0) {
        obj.extensions = {};
        entries.forEach(([k, v]) => {
          obj.extensions[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SecurityScheme>, I>>(base?: I): SecurityScheme {
    return SecurityScheme.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SecurityScheme>, I>>(object: I): SecurityScheme {
    const message = createBaseSecurityScheme();
    message.type = object.type ?? 0;
    message.description = object.description ?? "";
    message.name = object.name ?? "";
    message.in = object.in ?? 0;
    message.flow = object.flow ?? 0;
    message.authorizationUrl = object.authorizationUrl ?? "";
    message.tokenUrl = object.tokenUrl ?? "";
    message.scopes = (object.scopes !== undefined && object.scopes !== null)
      ? Scopes.fromPartial(object.scopes)
      : undefined;
    message.extensions = Object.entries(object.extensions ?? {}).reduce<{ [key: string]: any | undefined }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

messageTypeRegistry.set(SecurityScheme.$type, SecurityScheme);

function createBaseSecuritySchemeExtensionsEntry(): SecuritySchemeExtensionsEntry {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityScheme.ExtensionsEntry",
    key: "",
    value: undefined,
  };
}

export const SecuritySchemeExtensionsEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityScheme.ExtensionsEntry" as const,

  encode(message: SecuritySchemeExtensionsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(Value.wrap(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SecuritySchemeExtensionsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSecuritySchemeExtensionsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Value.unwrap(Value.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SecuritySchemeExtensionsEntry {
    return {
      $type: SecuritySchemeExtensionsEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object?.value) ? object.value : undefined,
    };
  },

  toJSON(message: SecuritySchemeExtensionsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SecuritySchemeExtensionsEntry>, I>>(base?: I): SecuritySchemeExtensionsEntry {
    return SecuritySchemeExtensionsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SecuritySchemeExtensionsEntry>, I>>(
    object: I,
  ): SecuritySchemeExtensionsEntry {
    const message = createBaseSecuritySchemeExtensionsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(SecuritySchemeExtensionsEntry.$type, SecuritySchemeExtensionsEntry);

function createBaseSecurityRequirement(): SecurityRequirement {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirement", securityRequirement: {} };
}

export const SecurityRequirement = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirement" as const,

  encode(message: SecurityRequirement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.securityRequirement || {}).forEach(([key, value]) => {
      SecurityRequirementSecurityRequirementEntry.encode({
        $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirement.SecurityRequirementEntry",
        key: key as any,
        value,
      }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SecurityRequirement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSecurityRequirement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = SecurityRequirementSecurityRequirementEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.securityRequirement![entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SecurityRequirement {
    return {
      $type: SecurityRequirement.$type,
      securityRequirement: isObject(object.securityRequirement)
        ? Object.entries(object.securityRequirement).reduce<
          { [key: string]: SecurityRequirementSecurityRequirementValue }
        >((acc, [key, value]) => {
          acc[key] = SecurityRequirementSecurityRequirementValue.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: SecurityRequirement): unknown {
    const obj: any = {};
    if (message.securityRequirement) {
      const entries = Object.entries(message.securityRequirement);
      if (entries.length > 0) {
        obj.securityRequirement = {};
        entries.forEach(([k, v]) => {
          obj.securityRequirement[k] = SecurityRequirementSecurityRequirementValue.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SecurityRequirement>, I>>(base?: I): SecurityRequirement {
    return SecurityRequirement.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SecurityRequirement>, I>>(object: I): SecurityRequirement {
    const message = createBaseSecurityRequirement();
    message.securityRequirement = Object.entries(object.securityRequirement ?? {}).reduce<
      { [key: string]: SecurityRequirementSecurityRequirementValue }
    >((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = SecurityRequirementSecurityRequirementValue.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

messageTypeRegistry.set(SecurityRequirement.$type, SecurityRequirement);

function createBaseSecurityRequirementSecurityRequirementValue(): SecurityRequirementSecurityRequirementValue {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirement.SecurityRequirementValue", scope: [] };
}

export const SecurityRequirementSecurityRequirementValue = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirement.SecurityRequirementValue" as const,

  encode(message: SecurityRequirementSecurityRequirementValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scope !== undefined && message.scope.length !== 0) {
      for (const v of message.scope) {
        writer.uint32(10).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SecurityRequirementSecurityRequirementValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSecurityRequirementSecurityRequirementValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scope!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SecurityRequirementSecurityRequirementValue {
    return {
      $type: SecurityRequirementSecurityRequirementValue.$type,
      scope: globalThis.Array.isArray(object?.scope) ? object.scope.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: SecurityRequirementSecurityRequirementValue): unknown {
    const obj: any = {};
    if (message.scope?.length) {
      obj.scope = message.scope;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SecurityRequirementSecurityRequirementValue>, I>>(
    base?: I,
  ): SecurityRequirementSecurityRequirementValue {
    return SecurityRequirementSecurityRequirementValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SecurityRequirementSecurityRequirementValue>, I>>(
    object: I,
  ): SecurityRequirementSecurityRequirementValue {
    const message = createBaseSecurityRequirementSecurityRequirementValue();
    message.scope = object.scope?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(SecurityRequirementSecurityRequirementValue.$type, SecurityRequirementSecurityRequirementValue);

function createBaseSecurityRequirementSecurityRequirementEntry(): SecurityRequirementSecurityRequirementEntry {
  return {
    $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirement.SecurityRequirementEntry",
    key: "",
    value: undefined,
  };
}

export const SecurityRequirementSecurityRequirementEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.SecurityRequirement.SecurityRequirementEntry" as const,

  encode(message: SecurityRequirementSecurityRequirementEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SecurityRequirementSecurityRequirementValue.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SecurityRequirementSecurityRequirementEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSecurityRequirementSecurityRequirementEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = SecurityRequirementSecurityRequirementValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SecurityRequirementSecurityRequirementEntry {
    return {
      $type: SecurityRequirementSecurityRequirementEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? SecurityRequirementSecurityRequirementValue.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: SecurityRequirementSecurityRequirementEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = SecurityRequirementSecurityRequirementValue.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SecurityRequirementSecurityRequirementEntry>, I>>(
    base?: I,
  ): SecurityRequirementSecurityRequirementEntry {
    return SecurityRequirementSecurityRequirementEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SecurityRequirementSecurityRequirementEntry>, I>>(
    object: I,
  ): SecurityRequirementSecurityRequirementEntry {
    const message = createBaseSecurityRequirementSecurityRequirementEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? SecurityRequirementSecurityRequirementValue.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(SecurityRequirementSecurityRequirementEntry.$type, SecurityRequirementSecurityRequirementEntry);

function createBaseScopes(): Scopes {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Scopes", scope: {} };
}

export const Scopes = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Scopes" as const,

  encode(message: Scopes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.scope || {}).forEach(([key, value]) => {
      ScopesScopeEntry.encode({
        $type: "grpc.gateway.protoc_gen_openapiv2.options.Scopes.ScopeEntry",
        key: key as any,
        value,
      }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Scopes {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScopes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = ScopesScopeEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.scope![entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Scopes {
    return {
      $type: Scopes.$type,
      scope: isObject(object.scope)
        ? Object.entries(object.scope).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Scopes): unknown {
    const obj: any = {};
    if (message.scope) {
      const entries = Object.entries(message.scope);
      if (entries.length > 0) {
        obj.scope = {};
        entries.forEach(([k, v]) => {
          obj.scope[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Scopes>, I>>(base?: I): Scopes {
    return Scopes.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Scopes>, I>>(object: I): Scopes {
    const message = createBaseScopes();
    message.scope = Object.entries(object.scope ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

messageTypeRegistry.set(Scopes.$type, Scopes);

function createBaseScopesScopeEntry(): ScopesScopeEntry {
  return { $type: "grpc.gateway.protoc_gen_openapiv2.options.Scopes.ScopeEntry", key: "", value: "" };
}

export const ScopesScopeEntry = {
  $type: "grpc.gateway.protoc_gen_openapiv2.options.Scopes.ScopeEntry" as const,

  encode(message: ScopesScopeEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScopesScopeEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScopesScopeEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
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

  fromJSON(object: any): ScopesScopeEntry {
    return {
      $type: ScopesScopeEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: ScopesScopeEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ScopesScopeEntry>, I>>(base?: I): ScopesScopeEntry {
    return ScopesScopeEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ScopesScopeEntry>, I>>(object: I): ScopesScopeEntry {
    const message = createBaseScopesScopeEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

messageTypeRegistry.set(ScopesScopeEntry.$type, ScopesScopeEntry);

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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
