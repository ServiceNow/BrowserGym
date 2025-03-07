/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import { UserEvent } from "../v1alpha1/orbot_action";

export const protobufPackage = "pb.process_discovery";

/** Enum for different attribute types */
export enum AttributeType {
  UNSPECIFIED = 0,
  STRING = 1,
  INT = 2,
  FLOAT = 3,
  BOOL = 4,
  TIMESTAMP = 5,
  UNRECOGNIZED = -1,
}

export function attributeTypeFromJSON(object: any): AttributeType {
  switch (object) {
    case 0:
    case "ATTRIBUTE_TYPE_UNSPECIFIED":
      return AttributeType.UNSPECIFIED;
    case 1:
    case "ATTRIBUTE_TYPE_STRING":
      return AttributeType.STRING;
    case 2:
    case "ATTRIBUTE_TYPE_INT":
      return AttributeType.INT;
    case 3:
    case "ATTRIBUTE_TYPE_FLOAT":
      return AttributeType.FLOAT;
    case 4:
    case "ATTRIBUTE_TYPE_BOOL":
      return AttributeType.BOOL;
    case 5:
    case "ATTRIBUTE_TYPE_TIMESTAMP":
      return AttributeType.TIMESTAMP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AttributeType.UNRECOGNIZED;
  }
}

export function attributeTypeToJSON(object: AttributeType): string {
  switch (object) {
    case AttributeType.UNSPECIFIED:
      return "ATTRIBUTE_TYPE_UNSPECIFIED";
    case AttributeType.STRING:
      return "ATTRIBUTE_TYPE_STRING";
    case AttributeType.INT:
      return "ATTRIBUTE_TYPE_INT";
    case AttributeType.FLOAT:
      return "ATTRIBUTE_TYPE_FLOAT";
    case AttributeType.BOOL:
      return "ATTRIBUTE_TYPE_BOOL";
    case AttributeType.TIMESTAMP:
      return "ATTRIBUTE_TYPE_TIMESTAMP";
    case AttributeType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Typed attribute value */
export interface AttributeValue {
  $type?: "pb.process_discovery.AttributeValue";
  stringValue?: string | undefined;
  intValue?: number | undefined;
  floatValue?: number | undefined;
  boolValue?: boolean | undefined;
  timestampValue?: Date | undefined;
}

/** Schema for attributes that a step or a process can have */
export interface Attribute {
  $type?: "pb.process_discovery.Attribute";
  /** The key of the attribute. */
  key?:
    | string
    | undefined;
  /** The description of the attribute. */
  description?:
    | string
    | undefined;
  /** The expected data type of the attribute. */
  attributeType?: AttributeType | undefined;
}

/** Reusable schema for steps */
export interface StepType {
  $type?: "pb.process_discovery.StepType";
  /** Unique ID for the step type (e.g., JIRA::create_ticket). */
  id?:
    | string
    | undefined;
  /** Display name for the step type (e.g., "Create Ticket"). */
  displayName?:
    | string
    | undefined;
  /** Description for the step type. */
  description?:
    | string
    | undefined;
  /**
   * The application that the step type is associated with.
   * e.g. "JIRA", "GMAIL", "SALESFORCE"
   */
  application?:
    | string
    | undefined;
  /** Attributes associated with the step type. */
  attributes?:
    | Attribute[]
    | undefined;
  /** Nested sub-steps if applicable. */
  subSteps?: StepType[] | undefined;
  stepIndex?: StepTypeStepIndex | undefined;
}

export enum StepTypeStepIndex {
  UNSPECIFIED = 0,
  START = 1,
  END = 2,
  UNRECOGNIZED = -1,
}

export function stepTypeStepIndexFromJSON(object: any): StepTypeStepIndex {
  switch (object) {
    case 0:
    case "STEP_INDEX_UNSPECIFIED":
      return StepTypeStepIndex.UNSPECIFIED;
    case 1:
    case "STEP_INDEX_START":
      return StepTypeStepIndex.START;
    case 2:
    case "STEP_INDEX_END":
      return StepTypeStepIndex.END;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StepTypeStepIndex.UNRECOGNIZED;
  }
}

export function stepTypeStepIndexToJSON(object: StepTypeStepIndex): string {
  switch (object) {
    case StepTypeStepIndex.UNSPECIFIED:
      return "STEP_INDEX_UNSPECIFIED";
    case StepTypeStepIndex.START:
      return "STEP_INDEX_START";
    case StepTypeStepIndex.END:
      return "STEP_INDEX_END";
    case StepTypeStepIndex.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Instance of a step annotation for a single observation. */
export interface StepAnnotation {
  $type?: "pb.process_discovery.StepAnnotation";
  /** References the StepType by ID. */
  stepTypeId?:
    | string
    | undefined;
  /** Maps attribute keys to values. */
  attributeValues?: { [key: string]: AttributeValue } | undefined;
}

export interface StepAnnotationAttributeValuesEntry {
  $type?: "pb.process_discovery.StepAnnotation.AttributeValuesEntry";
  key: string;
  value?: AttributeValue | undefined;
}

/** Reusable schema for processes. */
export interface ProcessType {
  $type?: "pb.process_discovery.ProcessType";
  /** Unique ID for the process type. */
  id?:
    | string
    | undefined;
  /** Display name for the process type. */
  displayName?:
    | string
    | undefined;
  /** Description for the process type. */
  description?:
    | string
    | undefined;
  /** Attributes associated with the process type. */
  attributes?:
    | Attribute[]
    | undefined;
  /**
   * Applications associated with the process type.
   * e.g. "JIRA", "GMAIL", "SALESFORCE"
   */
  applications?: string[] | undefined;
}

/** Instance of a process annotation for a workflow */
export interface ProcessAnnotation {
  $type?: "pb.process_discovery.ProcessAnnotation";
  /** References the ProcessType by ID */
  processTypeId?:
    | string
    | undefined;
  /** Maps attribute keys to values. */
  attributeValues?: { [key: string]: AttributeValue } | undefined;
}

export interface ProcessAnnotationAttributeValuesEntry {
  $type?: "pb.process_discovery.ProcessAnnotation.AttributeValuesEntry";
  key: string;
  value?: AttributeValue | undefined;
}

/** Annotation regarding a meaningful workflow from a trace. */
export interface WorkflowAnnotation {
  $type?: "pb.process_discovery.WorkflowAnnotation";
  /**
   * Observations that form a workflow. Normally consecutive, but in cases where the user
   * multi-tasking with different workflows in a trace, they can be non-consecutive.
   */
  observationIds?:
    | string[]
    | undefined;
  /** Process annotation of the workflow. */
  processAnnotation?:
    | ProcessAnnotation
    | undefined;
  /** Step annotations for the workflow. */
  stepAnnotations?: StepAnnotation[] | undefined;
}

/** Auxiliary information extracted from an observation. */
export interface AuxiliaryObservationInfo {
  $type?: "pb.process_discovery.AuxiliaryObservationInfo";
  /** Binary data for the screenshot, encoded as a PNG file. */
  beforeStateScreenshotData?: Uint8Array | undefined;
}

/** Observations, currently from Orbot. */
export interface Observation {
  $type?: "pb.process_discovery.Observation";
  /** The unique ID of the observation. */
  id?:
    | string
    | undefined;
  /** The observed user event from Orbot. */
  userEvent?:
    | UserEvent
    | undefined;
  /**
   * Optional auxiliary information accompanying the observation.
   * Useful for constructing a standalone dataset with full information without accessing to databases.
   */
  auxiliaryObservationInfo?: AuxiliaryObservationInfo | undefined;
}

/** A trace is a sequential collection of observations. */
export interface Trace {
  $type?: "pb.process_discovery.Trace";
  /** The unique ID of the trace. Could be a session ID, a trace ID, etc. */
  id?:
    | string
    | undefined;
  /** All observations in the trace. */
  observations?: Observation[] | undefined;
}

/** Annotation of a trace. */
export interface TraceAnnotation {
  $type?: "pb.process_discovery.TraceAnnotation";
  /** The unique ID of the trace being annotated. */
  traceId?:
    | string
    | undefined;
  /** Workflow annotations for the trace. */
  workflowAnnotations?: WorkflowAnnotation[] | undefined;
}

/** A process discovery dataset without annotation. */
export interface Dataset {
  $type?: "pb.process_discovery.Dataset";
  /** The name of the dataset. */
  name?:
    | string
    | undefined;
  /** The description of the dataset. */
  description?:
    | string
    | undefined;
  /** All traces in the dataset. */
  traces?: Trace[] | undefined;
}

/**
 * An annotation of the process discovery dataset.
 * Could be annotated by human or algorithms.
 */
export interface DatasetAnnotation {
  $type?: "pb.process_discovery.DatasetAnnotation";
  /** The name of the annotation */
  name?:
    | string
    | undefined;
  /** The name of the dataset being annotated */
  datasetName?:
    | string
    | undefined;
  /** The description of the annotation */
  description?:
    | string
    | undefined;
  /** Process types to discover, provided by the user or mined (in the future). */
  processTypes?:
    | ProcessType[]
    | undefined;
  /** Step types to discover, provided by the user or mined (in the future). */
  stepTypes?:
    | StepType[]
    | undefined;
  /** Annotations for the traces. Only populated for annotated traces or traces that have been mined by the algorithms. */
  traceAnnotations?: TraceAnnotation[] | undefined;
}

/**
 * A file containing a dataset and its annotation.
 * Could be used for storing a dataset and its annotation in a file in a cloud storage.
 */
export interface DatasetFile {
  $type?: "pb.process_discovery.DatasetFile";
  /** The name of the dataset file */
  name?:
    | string
    | undefined;
  /** The description of the dataset file */
  description?:
    | string
    | undefined;
  /** The dataset annotation file content */
  datasetAnnotation?:
    | DatasetAnnotation
    | undefined;
  /** The dataset file content */
  dataset?: Dataset | undefined;
}

function createBaseAttributeValue(): AttributeValue {
  return {
    $type: "pb.process_discovery.AttributeValue",
    stringValue: undefined,
    intValue: undefined,
    floatValue: undefined,
    boolValue: undefined,
    timestampValue: undefined,
  };
}

export const AttributeValue = {
  $type: "pb.process_discovery.AttributeValue" as const,

  encode(message: AttributeValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stringValue !== undefined) {
      writer.uint32(10).string(message.stringValue);
    }
    if (message.intValue !== undefined) {
      writer.uint32(16).int32(message.intValue);
    }
    if (message.floatValue !== undefined) {
      writer.uint32(29).float(message.floatValue);
    }
    if (message.boolValue !== undefined) {
      writer.uint32(32).bool(message.boolValue);
    }
    if (message.timestampValue !== undefined) {
      Timestamp.encode(toTimestamp(message.timestampValue), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AttributeValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttributeValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stringValue = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.intValue = reader.int32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.floatValue = reader.float();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.boolValue = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.timestampValue = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AttributeValue {
    return {
      $type: AttributeValue.$type,
      stringValue: isSet(object.stringValue) ? globalThis.String(object.stringValue) : undefined,
      intValue: isSet(object.intValue) ? globalThis.Number(object.intValue) : undefined,
      floatValue: isSet(object.floatValue) ? globalThis.Number(object.floatValue) : undefined,
      boolValue: isSet(object.boolValue) ? globalThis.Boolean(object.boolValue) : undefined,
      timestampValue: isSet(object.timestampValue) ? fromJsonTimestamp(object.timestampValue) : undefined,
    };
  },

  toJSON(message: AttributeValue): unknown {
    const obj: any = {};
    if (message.stringValue !== undefined) {
      obj.stringValue = message.stringValue;
    }
    if (message.intValue !== undefined) {
      obj.intValue = Math.round(message.intValue);
    }
    if (message.floatValue !== undefined) {
      obj.floatValue = message.floatValue;
    }
    if (message.boolValue !== undefined) {
      obj.boolValue = message.boolValue;
    }
    if (message.timestampValue !== undefined) {
      obj.timestampValue = message.timestampValue.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AttributeValue>, I>>(base?: I): AttributeValue {
    return AttributeValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AttributeValue>, I>>(object: I): AttributeValue {
    const message = createBaseAttributeValue();
    message.stringValue = object.stringValue ?? undefined;
    message.intValue = object.intValue ?? undefined;
    message.floatValue = object.floatValue ?? undefined;
    message.boolValue = object.boolValue ?? undefined;
    message.timestampValue = object.timestampValue ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(AttributeValue.$type, AttributeValue);

function createBaseAttribute(): Attribute {
  return { $type: "pb.process_discovery.Attribute", key: "", description: "", attributeType: 0 };
}

export const Attribute = {
  $type: "pb.process_discovery.Attribute" as const,

  encode(message: Attribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== undefined && message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.attributeType !== undefined && message.attributeType !== 0) {
      writer.uint32(24).int32(message.attributeType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Attribute {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttribute();
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

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.attributeType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Attribute {
    return {
      $type: Attribute.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      attributeType: isSet(object.attributeType) ? attributeTypeFromJSON(object.attributeType) : 0,
    };
  },

  toJSON(message: Attribute): unknown {
    const obj: any = {};
    if (message.key !== undefined && message.key !== "") {
      obj.key = message.key;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.attributeType !== undefined && message.attributeType !== 0) {
      obj.attributeType = attributeTypeToJSON(message.attributeType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Attribute>, I>>(base?: I): Attribute {
    return Attribute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Attribute>, I>>(object: I): Attribute {
    const message = createBaseAttribute();
    message.key = object.key ?? "";
    message.description = object.description ?? "";
    message.attributeType = object.attributeType ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Attribute.$type, Attribute);

function createBaseStepType(): StepType {
  return {
    $type: "pb.process_discovery.StepType",
    id: "",
    displayName: "",
    description: "",
    application: "",
    attributes: [],
    subSteps: [],
    stepIndex: 0,
  };
}

export const StepType = {
  $type: "pb.process_discovery.StepType" as const,

  encode(message: StepType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.application !== undefined && message.application !== "") {
      writer.uint32(34).string(message.application);
    }
    if (message.attributes !== undefined && message.attributes.length !== 0) {
      for (const v of message.attributes) {
        Attribute.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.subSteps !== undefined && message.subSteps.length !== 0) {
      for (const v of message.subSteps) {
        StepType.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    if (message.stepIndex !== undefined && message.stepIndex !== 0) {
      writer.uint32(56).int32(message.stepIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StepType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStepType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.displayName = reader.string();
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

          message.application = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.attributes!.push(Attribute.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.subSteps!.push(StepType.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.stepIndex = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StepType {
    return {
      $type: StepType.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      application: isSet(object.application) ? globalThis.String(object.application) : "",
      attributes: globalThis.Array.isArray(object?.attributes)
        ? object.attributes.map((e: any) => Attribute.fromJSON(e))
        : [],
      subSteps: globalThis.Array.isArray(object?.subSteps) ? object.subSteps.map((e: any) => StepType.fromJSON(e)) : [],
      stepIndex: isSet(object.stepIndex) ? stepTypeStepIndexFromJSON(object.stepIndex) : 0,
    };
  },

  toJSON(message: StepType): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.application !== undefined && message.application !== "") {
      obj.application = message.application;
    }
    if (message.attributes?.length) {
      obj.attributes = message.attributes.map((e) => Attribute.toJSON(e));
    }
    if (message.subSteps?.length) {
      obj.subSteps = message.subSteps.map((e) => StepType.toJSON(e));
    }
    if (message.stepIndex !== undefined && message.stepIndex !== 0) {
      obj.stepIndex = stepTypeStepIndexToJSON(message.stepIndex);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StepType>, I>>(base?: I): StepType {
    return StepType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StepType>, I>>(object: I): StepType {
    const message = createBaseStepType();
    message.id = object.id ?? "";
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.application = object.application ?? "";
    message.attributes = object.attributes?.map((e) => Attribute.fromPartial(e)) || [];
    message.subSteps = object.subSteps?.map((e) => StepType.fromPartial(e)) || [];
    message.stepIndex = object.stepIndex ?? 0;
    return message;
  },
};

messageTypeRegistry.set(StepType.$type, StepType);

function createBaseStepAnnotation(): StepAnnotation {
  return { $type: "pb.process_discovery.StepAnnotation", stepTypeId: "", attributeValues: {} };
}

export const StepAnnotation = {
  $type: "pb.process_discovery.StepAnnotation" as const,

  encode(message: StepAnnotation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stepTypeId !== undefined && message.stepTypeId !== "") {
      writer.uint32(10).string(message.stepTypeId);
    }
    Object.entries(message.attributeValues || {}).forEach(([key, value]) => {
      StepAnnotationAttributeValuesEntry.encode({
        $type: "pb.process_discovery.StepAnnotation.AttributeValuesEntry",
        key: key as any,
        value,
      }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StepAnnotation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStepAnnotation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stepTypeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = StepAnnotationAttributeValuesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.attributeValues![entry2.key] = entry2.value;
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

  fromJSON(object: any): StepAnnotation {
    return {
      $type: StepAnnotation.$type,
      stepTypeId: isSet(object.stepTypeId) ? globalThis.String(object.stepTypeId) : "",
      attributeValues: isObject(object.attributeValues)
        ? Object.entries(object.attributeValues).reduce<{ [key: string]: AttributeValue }>((acc, [key, value]) => {
          acc[key] = AttributeValue.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: StepAnnotation): unknown {
    const obj: any = {};
    if (message.stepTypeId !== undefined && message.stepTypeId !== "") {
      obj.stepTypeId = message.stepTypeId;
    }
    if (message.attributeValues) {
      const entries = Object.entries(message.attributeValues);
      if (entries.length > 0) {
        obj.attributeValues = {};
        entries.forEach(([k, v]) => {
          obj.attributeValues[k] = AttributeValue.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StepAnnotation>, I>>(base?: I): StepAnnotation {
    return StepAnnotation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StepAnnotation>, I>>(object: I): StepAnnotation {
    const message = createBaseStepAnnotation();
    message.stepTypeId = object.stepTypeId ?? "";
    message.attributeValues = Object.entries(object.attributeValues ?? {}).reduce<{ [key: string]: AttributeValue }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = AttributeValue.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

messageTypeRegistry.set(StepAnnotation.$type, StepAnnotation);

function createBaseStepAnnotationAttributeValuesEntry(): StepAnnotationAttributeValuesEntry {
  return { $type: "pb.process_discovery.StepAnnotation.AttributeValuesEntry", key: "", value: undefined };
}

export const StepAnnotationAttributeValuesEntry = {
  $type: "pb.process_discovery.StepAnnotation.AttributeValuesEntry" as const,

  encode(message: StepAnnotationAttributeValuesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      AttributeValue.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StepAnnotationAttributeValuesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStepAnnotationAttributeValuesEntry();
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

          message.value = AttributeValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StepAnnotationAttributeValuesEntry {
    return {
      $type: StepAnnotationAttributeValuesEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? AttributeValue.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: StepAnnotationAttributeValuesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = AttributeValue.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StepAnnotationAttributeValuesEntry>, I>>(
    base?: I,
  ): StepAnnotationAttributeValuesEntry {
    return StepAnnotationAttributeValuesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StepAnnotationAttributeValuesEntry>, I>>(
    object: I,
  ): StepAnnotationAttributeValuesEntry {
    const message = createBaseStepAnnotationAttributeValuesEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? AttributeValue.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(StepAnnotationAttributeValuesEntry.$type, StepAnnotationAttributeValuesEntry);

function createBaseProcessType(): ProcessType {
  return {
    $type: "pb.process_discovery.ProcessType",
    id: "",
    displayName: "",
    description: "",
    attributes: [],
    applications: [],
  };
}

export const ProcessType = {
  $type: "pb.process_discovery.ProcessType" as const,

  encode(message: ProcessType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.attributes !== undefined && message.attributes.length !== 0) {
      for (const v of message.attributes) {
        Attribute.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.applications !== undefined && message.applications.length !== 0) {
      for (const v of message.applications) {
        writer.uint32(42).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProcessType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.displayName = reader.string();
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

          message.attributes!.push(Attribute.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.applications!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProcessType {
    return {
      $type: ProcessType.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      attributes: globalThis.Array.isArray(object?.attributes)
        ? object.attributes.map((e: any) => Attribute.fromJSON(e))
        : [],
      applications: globalThis.Array.isArray(object?.applications)
        ? object.applications.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: ProcessType): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.attributes?.length) {
      obj.attributes = message.attributes.map((e) => Attribute.toJSON(e));
    }
    if (message.applications?.length) {
      obj.applications = message.applications;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProcessType>, I>>(base?: I): ProcessType {
    return ProcessType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProcessType>, I>>(object: I): ProcessType {
    const message = createBaseProcessType();
    message.id = object.id ?? "";
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.attributes = object.attributes?.map((e) => Attribute.fromPartial(e)) || [];
    message.applications = object.applications?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(ProcessType.$type, ProcessType);

function createBaseProcessAnnotation(): ProcessAnnotation {
  return { $type: "pb.process_discovery.ProcessAnnotation", processTypeId: "", attributeValues: {} };
}

export const ProcessAnnotation = {
  $type: "pb.process_discovery.ProcessAnnotation" as const,

  encode(message: ProcessAnnotation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.processTypeId !== undefined && message.processTypeId !== "") {
      writer.uint32(10).string(message.processTypeId);
    }
    Object.entries(message.attributeValues || {}).forEach(([key, value]) => {
      ProcessAnnotationAttributeValuesEntry.encode({
        $type: "pb.process_discovery.ProcessAnnotation.AttributeValuesEntry",
        key: key as any,
        value,
      }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProcessAnnotation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessAnnotation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.processTypeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = ProcessAnnotationAttributeValuesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.attributeValues![entry2.key] = entry2.value;
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

  fromJSON(object: any): ProcessAnnotation {
    return {
      $type: ProcessAnnotation.$type,
      processTypeId: isSet(object.processTypeId) ? globalThis.String(object.processTypeId) : "",
      attributeValues: isObject(object.attributeValues)
        ? Object.entries(object.attributeValues).reduce<{ [key: string]: AttributeValue }>((acc, [key, value]) => {
          acc[key] = AttributeValue.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ProcessAnnotation): unknown {
    const obj: any = {};
    if (message.processTypeId !== undefined && message.processTypeId !== "") {
      obj.processTypeId = message.processTypeId;
    }
    if (message.attributeValues) {
      const entries = Object.entries(message.attributeValues);
      if (entries.length > 0) {
        obj.attributeValues = {};
        entries.forEach(([k, v]) => {
          obj.attributeValues[k] = AttributeValue.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProcessAnnotation>, I>>(base?: I): ProcessAnnotation {
    return ProcessAnnotation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProcessAnnotation>, I>>(object: I): ProcessAnnotation {
    const message = createBaseProcessAnnotation();
    message.processTypeId = object.processTypeId ?? "";
    message.attributeValues = Object.entries(object.attributeValues ?? {}).reduce<{ [key: string]: AttributeValue }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = AttributeValue.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

messageTypeRegistry.set(ProcessAnnotation.$type, ProcessAnnotation);

function createBaseProcessAnnotationAttributeValuesEntry(): ProcessAnnotationAttributeValuesEntry {
  return { $type: "pb.process_discovery.ProcessAnnotation.AttributeValuesEntry", key: "", value: undefined };
}

export const ProcessAnnotationAttributeValuesEntry = {
  $type: "pb.process_discovery.ProcessAnnotation.AttributeValuesEntry" as const,

  encode(message: ProcessAnnotationAttributeValuesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      AttributeValue.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProcessAnnotationAttributeValuesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessAnnotationAttributeValuesEntry();
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

          message.value = AttributeValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProcessAnnotationAttributeValuesEntry {
    return {
      $type: ProcessAnnotationAttributeValuesEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? AttributeValue.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ProcessAnnotationAttributeValuesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = AttributeValue.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProcessAnnotationAttributeValuesEntry>, I>>(
    base?: I,
  ): ProcessAnnotationAttributeValuesEntry {
    return ProcessAnnotationAttributeValuesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProcessAnnotationAttributeValuesEntry>, I>>(
    object: I,
  ): ProcessAnnotationAttributeValuesEntry {
    const message = createBaseProcessAnnotationAttributeValuesEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? AttributeValue.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ProcessAnnotationAttributeValuesEntry.$type, ProcessAnnotationAttributeValuesEntry);

function createBaseWorkflowAnnotation(): WorkflowAnnotation {
  return {
    $type: "pb.process_discovery.WorkflowAnnotation",
    observationIds: [],
    processAnnotation: undefined,
    stepAnnotations: [],
  };
}

export const WorkflowAnnotation = {
  $type: "pb.process_discovery.WorkflowAnnotation" as const,

  encode(message: WorkflowAnnotation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.observationIds !== undefined && message.observationIds.length !== 0) {
      for (const v of message.observationIds) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.processAnnotation !== undefined) {
      ProcessAnnotation.encode(message.processAnnotation, writer.uint32(18).fork()).ldelim();
    }
    if (message.stepAnnotations !== undefined && message.stepAnnotations.length !== 0) {
      for (const v of message.stepAnnotations) {
        StepAnnotation.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowAnnotation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowAnnotation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.observationIds!.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.processAnnotation = ProcessAnnotation.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.stepAnnotations!.push(StepAnnotation.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowAnnotation {
    return {
      $type: WorkflowAnnotation.$type,
      observationIds: globalThis.Array.isArray(object?.observationIds)
        ? object.observationIds.map((e: any) => globalThis.String(e))
        : [],
      processAnnotation: isSet(object.processAnnotation)
        ? ProcessAnnotation.fromJSON(object.processAnnotation)
        : undefined,
      stepAnnotations: globalThis.Array.isArray(object?.stepAnnotations)
        ? object.stepAnnotations.map((e: any) => StepAnnotation.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WorkflowAnnotation): unknown {
    const obj: any = {};
    if (message.observationIds?.length) {
      obj.observationIds = message.observationIds;
    }
    if (message.processAnnotation !== undefined) {
      obj.processAnnotation = ProcessAnnotation.toJSON(message.processAnnotation);
    }
    if (message.stepAnnotations?.length) {
      obj.stepAnnotations = message.stepAnnotations.map((e) => StepAnnotation.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowAnnotation>, I>>(base?: I): WorkflowAnnotation {
    return WorkflowAnnotation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowAnnotation>, I>>(object: I): WorkflowAnnotation {
    const message = createBaseWorkflowAnnotation();
    message.observationIds = object.observationIds?.map((e) => e) || [];
    message.processAnnotation = (object.processAnnotation !== undefined && object.processAnnotation !== null)
      ? ProcessAnnotation.fromPartial(object.processAnnotation)
      : undefined;
    message.stepAnnotations = object.stepAnnotations?.map((e) => StepAnnotation.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(WorkflowAnnotation.$type, WorkflowAnnotation);

function createBaseAuxiliaryObservationInfo(): AuxiliaryObservationInfo {
  return { $type: "pb.process_discovery.AuxiliaryObservationInfo", beforeStateScreenshotData: new Uint8Array(0) };
}

export const AuxiliaryObservationInfo = {
  $type: "pb.process_discovery.AuxiliaryObservationInfo" as const,

  encode(message: AuxiliaryObservationInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.beforeStateScreenshotData !== undefined && message.beforeStateScreenshotData.length !== 0) {
      writer.uint32(10).bytes(message.beforeStateScreenshotData);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuxiliaryObservationInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuxiliaryObservationInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.beforeStateScreenshotData = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuxiliaryObservationInfo {
    return {
      $type: AuxiliaryObservationInfo.$type,
      beforeStateScreenshotData: isSet(object.beforeStateScreenshotData)
        ? bytesFromBase64(object.beforeStateScreenshotData)
        : new Uint8Array(0),
    };
  },

  toJSON(message: AuxiliaryObservationInfo): unknown {
    const obj: any = {};
    if (message.beforeStateScreenshotData !== undefined && message.beforeStateScreenshotData.length !== 0) {
      obj.beforeStateScreenshotData = base64FromBytes(message.beforeStateScreenshotData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuxiliaryObservationInfo>, I>>(base?: I): AuxiliaryObservationInfo {
    return AuxiliaryObservationInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuxiliaryObservationInfo>, I>>(object: I): AuxiliaryObservationInfo {
    const message = createBaseAuxiliaryObservationInfo();
    message.beforeStateScreenshotData = object.beforeStateScreenshotData ?? new Uint8Array(0);
    return message;
  },
};

messageTypeRegistry.set(AuxiliaryObservationInfo.$type, AuxiliaryObservationInfo);

function createBaseObservation(): Observation {
  return {
    $type: "pb.process_discovery.Observation",
    id: "",
    userEvent: undefined,
    auxiliaryObservationInfo: undefined,
  };
}

export const Observation = {
  $type: "pb.process_discovery.Observation" as const,

  encode(message: Observation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userEvent !== undefined) {
      UserEvent.encode(message.userEvent, writer.uint32(18).fork()).ldelim();
    }
    if (message.auxiliaryObservationInfo !== undefined) {
      AuxiliaryObservationInfo.encode(message.auxiliaryObservationInfo, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Observation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObservation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.userEvent = UserEvent.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.auxiliaryObservationInfo = AuxiliaryObservationInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Observation {
    return {
      $type: Observation.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      userEvent: isSet(object.userEvent) ? UserEvent.fromJSON(object.userEvent) : undefined,
      auxiliaryObservationInfo: isSet(object.auxiliaryObservationInfo)
        ? AuxiliaryObservationInfo.fromJSON(object.auxiliaryObservationInfo)
        : undefined,
    };
  },

  toJSON(message: Observation): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.userEvent !== undefined) {
      obj.userEvent = UserEvent.toJSON(message.userEvent);
    }
    if (message.auxiliaryObservationInfo !== undefined) {
      obj.auxiliaryObservationInfo = AuxiliaryObservationInfo.toJSON(message.auxiliaryObservationInfo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Observation>, I>>(base?: I): Observation {
    return Observation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Observation>, I>>(object: I): Observation {
    const message = createBaseObservation();
    message.id = object.id ?? "";
    message.userEvent = (object.userEvent !== undefined && object.userEvent !== null)
      ? UserEvent.fromPartial(object.userEvent)
      : undefined;
    message.auxiliaryObservationInfo =
      (object.auxiliaryObservationInfo !== undefined && object.auxiliaryObservationInfo !== null)
        ? AuxiliaryObservationInfo.fromPartial(object.auxiliaryObservationInfo)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(Observation.$type, Observation);

function createBaseTrace(): Trace {
  return { $type: "pb.process_discovery.Trace", id: "", observations: [] };
}

export const Trace = {
  $type: "pb.process_discovery.Trace" as const,

  encode(message: Trace, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.observations !== undefined && message.observations.length !== 0) {
      for (const v of message.observations) {
        Observation.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Trace {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.observations!.push(Observation.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Trace {
    return {
      $type: Trace.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      observations: globalThis.Array.isArray(object?.observations)
        ? object.observations.map((e: any) => Observation.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Trace): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.observations?.length) {
      obj.observations = message.observations.map((e) => Observation.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Trace>, I>>(base?: I): Trace {
    return Trace.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Trace>, I>>(object: I): Trace {
    const message = createBaseTrace();
    message.id = object.id ?? "";
    message.observations = object.observations?.map((e) => Observation.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(Trace.$type, Trace);

function createBaseTraceAnnotation(): TraceAnnotation {
  return { $type: "pb.process_discovery.TraceAnnotation", traceId: "", workflowAnnotations: [] };
}

export const TraceAnnotation = {
  $type: "pb.process_discovery.TraceAnnotation" as const,

  encode(message: TraceAnnotation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.traceId !== undefined && message.traceId !== "") {
      writer.uint32(10).string(message.traceId);
    }
    if (message.workflowAnnotations !== undefined && message.workflowAnnotations.length !== 0) {
      for (const v of message.workflowAnnotations) {
        WorkflowAnnotation.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TraceAnnotation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTraceAnnotation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.traceId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.workflowAnnotations!.push(WorkflowAnnotation.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TraceAnnotation {
    return {
      $type: TraceAnnotation.$type,
      traceId: isSet(object.traceId) ? globalThis.String(object.traceId) : "",
      workflowAnnotations: globalThis.Array.isArray(object?.workflowAnnotations)
        ? object.workflowAnnotations.map((e: any) => WorkflowAnnotation.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TraceAnnotation): unknown {
    const obj: any = {};
    if (message.traceId !== undefined && message.traceId !== "") {
      obj.traceId = message.traceId;
    }
    if (message.workflowAnnotations?.length) {
      obj.workflowAnnotations = message.workflowAnnotations.map((e) => WorkflowAnnotation.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TraceAnnotation>, I>>(base?: I): TraceAnnotation {
    return TraceAnnotation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TraceAnnotation>, I>>(object: I): TraceAnnotation {
    const message = createBaseTraceAnnotation();
    message.traceId = object.traceId ?? "";
    message.workflowAnnotations = object.workflowAnnotations?.map((e) => WorkflowAnnotation.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(TraceAnnotation.$type, TraceAnnotation);

function createBaseDataset(): Dataset {
  return { $type: "pb.process_discovery.Dataset", name: "", description: "", traces: [] };
}

export const Dataset = {
  $type: "pb.process_discovery.Dataset" as const,

  encode(message: Dataset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.traces !== undefined && message.traces.length !== 0) {
      for (const v of message.traces) {
        Trace.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Dataset {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataset();
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

          message.traces!.push(Trace.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Dataset {
    return {
      $type: Dataset.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      traces: globalThis.Array.isArray(object?.traces) ? object.traces.map((e: any) => Trace.fromJSON(e)) : [],
    };
  },

  toJSON(message: Dataset): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.traces?.length) {
      obj.traces = message.traces.map((e) => Trace.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Dataset>, I>>(base?: I): Dataset {
    return Dataset.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Dataset>, I>>(object: I): Dataset {
    const message = createBaseDataset();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.traces = object.traces?.map((e) => Trace.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(Dataset.$type, Dataset);

function createBaseDatasetAnnotation(): DatasetAnnotation {
  return {
    $type: "pb.process_discovery.DatasetAnnotation",
    name: "",
    datasetName: "",
    description: "",
    processTypes: [],
    stepTypes: [],
    traceAnnotations: [],
  };
}

export const DatasetAnnotation = {
  $type: "pb.process_discovery.DatasetAnnotation" as const,

  encode(message: DatasetAnnotation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.datasetName !== undefined && message.datasetName !== "") {
      writer.uint32(18).string(message.datasetName);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.processTypes !== undefined && message.processTypes.length !== 0) {
      for (const v of message.processTypes) {
        ProcessType.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.stepTypes !== undefined && message.stepTypes.length !== 0) {
      for (const v of message.stepTypes) {
        StepType.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.traceAnnotations !== undefined && message.traceAnnotations.length !== 0) {
      for (const v of message.traceAnnotations) {
        TraceAnnotation.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DatasetAnnotation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatasetAnnotation();
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

          message.datasetName = reader.string();
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

          message.processTypes!.push(ProcessType.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.stepTypes!.push(StepType.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.traceAnnotations!.push(TraceAnnotation.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DatasetAnnotation {
    return {
      $type: DatasetAnnotation.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      datasetName: isSet(object.datasetName) ? globalThis.String(object.datasetName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      processTypes: globalThis.Array.isArray(object?.processTypes)
        ? object.processTypes.map((e: any) => ProcessType.fromJSON(e))
        : [],
      stepTypes: globalThis.Array.isArray(object?.stepTypes)
        ? object.stepTypes.map((e: any) => StepType.fromJSON(e))
        : [],
      traceAnnotations: globalThis.Array.isArray(object?.traceAnnotations)
        ? object.traceAnnotations.map((e: any) => TraceAnnotation.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DatasetAnnotation): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.datasetName !== undefined && message.datasetName !== "") {
      obj.datasetName = message.datasetName;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.processTypes?.length) {
      obj.processTypes = message.processTypes.map((e) => ProcessType.toJSON(e));
    }
    if (message.stepTypes?.length) {
      obj.stepTypes = message.stepTypes.map((e) => StepType.toJSON(e));
    }
    if (message.traceAnnotations?.length) {
      obj.traceAnnotations = message.traceAnnotations.map((e) => TraceAnnotation.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DatasetAnnotation>, I>>(base?: I): DatasetAnnotation {
    return DatasetAnnotation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DatasetAnnotation>, I>>(object: I): DatasetAnnotation {
    const message = createBaseDatasetAnnotation();
    message.name = object.name ?? "";
    message.datasetName = object.datasetName ?? "";
    message.description = object.description ?? "";
    message.processTypes = object.processTypes?.map((e) => ProcessType.fromPartial(e)) || [];
    message.stepTypes = object.stepTypes?.map((e) => StepType.fromPartial(e)) || [];
    message.traceAnnotations = object.traceAnnotations?.map((e) => TraceAnnotation.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(DatasetAnnotation.$type, DatasetAnnotation);

function createBaseDatasetFile(): DatasetFile {
  return {
    $type: "pb.process_discovery.DatasetFile",
    name: "",
    description: "",
    datasetAnnotation: undefined,
    dataset: undefined,
  };
}

export const DatasetFile = {
  $type: "pb.process_discovery.DatasetFile" as const,

  encode(message: DatasetFile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.datasetAnnotation !== undefined) {
      DatasetAnnotation.encode(message.datasetAnnotation, writer.uint32(26).fork()).ldelim();
    }
    if (message.dataset !== undefined) {
      Dataset.encode(message.dataset, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DatasetFile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatasetFile();
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

          message.datasetAnnotation = DatasetAnnotation.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.dataset = Dataset.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DatasetFile {
    return {
      $type: DatasetFile.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      datasetAnnotation: isSet(object.datasetAnnotation)
        ? DatasetAnnotation.fromJSON(object.datasetAnnotation)
        : undefined,
      dataset: isSet(object.dataset) ? Dataset.fromJSON(object.dataset) : undefined,
    };
  },

  toJSON(message: DatasetFile): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.datasetAnnotation !== undefined) {
      obj.datasetAnnotation = DatasetAnnotation.toJSON(message.datasetAnnotation);
    }
    if (message.dataset !== undefined) {
      obj.dataset = Dataset.toJSON(message.dataset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DatasetFile>, I>>(base?: I): DatasetFile {
    return DatasetFile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DatasetFile>, I>>(object: I): DatasetFile {
    const message = createBaseDatasetFile();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.datasetAnnotation = (object.datasetAnnotation !== undefined && object.datasetAnnotation !== null)
      ? DatasetAnnotation.fromPartial(object.datasetAnnotation)
      : undefined;
    message.dataset = (object.dataset !== undefined && object.dataset !== null)
      ? Dataset.fromPartial(object.dataset)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DatasetFile.$type, DatasetFile);

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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
