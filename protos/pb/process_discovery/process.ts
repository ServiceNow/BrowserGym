/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { UserProfileInfo } from "../../common/user_profile";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";
import { AttributeValue, Observation, StepType } from "./dataset";

export const protobufPackage = "pb.process_discovery";

/** A process is a collection of step types, step nodes, and observations. */
export interface Process {
  $type?: "pb.process_discovery.Process";
  /** The id of the process */
  id?:
    | string
    | undefined;
  /** The name of the process */
  name?:
    | string
    | undefined;
  /** The description of the process */
  description?:
    | string
    | undefined;
  /**
   * A global list of step types used by this process
   * (could be system-defined or user-defined).
   */
  stepTypes?:
    | StepType[]
    | undefined;
  /**
   * A global list of StepNodes. Each StepNode references exactly one StepType.
   * The structure of step nodes can be a tree (no merges) or a graph (with merges).
   * The first node in the list is a special "Start" node.
   */
  stepNodes?:
    | StepNode[]
    | undefined;
  /** A list of instances of this process */
  processInstances?:
    | ProcessInstance[]
    | undefined;
  /** The creation time of the process */
  createTime?:
    | Date
    | undefined;
  /** The last updated timestamp of the process */
  lastUpdatedTime?: Date | undefined;
}

/** A step node is a node in the tree/graph structure of the process. */
export interface StepNode {
  $type?: "pb.process_discovery.StepNode";
  /** Unique ID for this node, useful for recursive reference */
  id?:
    | string
    | undefined;
  /**
   * The StepType that this node references.
   * Must match one of the StepType.id in the same Process.
   */
  stepTypeId?:
    | string
    | undefined;
  /**
   * For a tree approach, each node can have multiple child transitions
   * leading to different branches. This can also form a graph
   * if a step_node_id references an existing node.
   */
  transitions?: Transition[] | undefined;
}

/** A transition from this node to a child node, plus optional branching condition or metrics. */
export interface Transition {
  $type?: "pb.process_discovery.Transition";
  /** The id of the child node */
  stepNodeId?: string | undefined;
  branchCondition?: TransitionBranchCondition | undefined;
}

/** A branching condition for a child transition (e.g., “priority == HIGH”) */
export interface TransitionBranchCondition {
  $type?: "pb.process_discovery.Transition.BranchCondition";
  /** The expression for the branching condition */
  expression?: string | undefined;
}

/** A single instance of a process. */
export interface ProcessInstance {
  $type?: "pb.process_discovery.ProcessInstance";
  /** The id of the execution */
  id?:
    | string
    | undefined;
  /** The user that executed this path */
  user?:
    | UserProfileInfo
    | undefined;
  /** The actual observations of each step node in the path */
  stepNodeInstances?:
    | StepNodeInstance[]
    | undefined;
  /** The attributes of the execution */
  attributes?: { [key: string]: AttributeValue } | undefined;
}

export interface ProcessInstanceAttributesEntry {
  $type?: "pb.process_discovery.ProcessInstance.AttributesEntry";
  key: string;
  value?: AttributeValue | undefined;
}

/** A single instance of a step node in a process instance. */
export interface StepNodeInstance {
  $type?: "pb.process_discovery.StepNodeInstance";
  /** The id of the step node */
  stepNodeId?:
    | string
    | undefined;
  /** The attributes of the step node observation */
  attributes?:
    | { [key: string]: AttributeValue }
    | undefined;
  /**
   * The observations of the step node execution, including actions descriptions, screenshots, etc.
   * for the "Documentation" feature, also helpful for viewing
   * the actions inside a step node execution.
   */
  observations?: Observation[] | undefined;
}

export interface StepNodeInstanceAttributesEntry {
  $type?: "pb.process_discovery.StepNodeInstance.AttributesEntry";
  key: string;
  value?: AttributeValue | undefined;
}

function createBaseProcess(): Process {
  return {
    $type: "pb.process_discovery.Process",
    id: "",
    name: "",
    description: "",
    stepTypes: [],
    stepNodes: [],
    processInstances: [],
    createTime: undefined,
    lastUpdatedTime: undefined,
  };
}

export const Process = {
  $type: "pb.process_discovery.Process" as const,

  encode(message: Process, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.stepTypes !== undefined && message.stepTypes.length !== 0) {
      for (const v of message.stepTypes) {
        StepType.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.stepNodes !== undefined && message.stepNodes.length !== 0) {
      for (const v of message.stepNodes) {
        StepNode.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.processInstances !== undefined && message.processInstances.length !== 0) {
      for (const v of message.processInstances) {
        ProcessInstance.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(58).fork()).ldelim();
    }
    if (message.lastUpdatedTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastUpdatedTime), writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Process {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcess();
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

          message.name = reader.string();
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

          message.stepTypes!.push(StepType.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.stepNodes!.push(StepNode.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.processInstances!.push(ProcessInstance.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.createTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.lastUpdatedTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Process {
    return {
      $type: Process.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      stepTypes: globalThis.Array.isArray(object?.stepTypes)
        ? object.stepTypes.map((e: any) => StepType.fromJSON(e))
        : [],
      stepNodes: globalThis.Array.isArray(object?.stepNodes)
        ? object.stepNodes.map((e: any) => StepNode.fromJSON(e))
        : [],
      processInstances: globalThis.Array.isArray(object?.processInstances)
        ? object.processInstances.map((e: any) => ProcessInstance.fromJSON(e))
        : [],
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      lastUpdatedTime: isSet(object.lastUpdatedTime) ? fromJsonTimestamp(object.lastUpdatedTime) : undefined,
    };
  },

  toJSON(message: Process): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.stepTypes?.length) {
      obj.stepTypes = message.stepTypes.map((e) => StepType.toJSON(e));
    }
    if (message.stepNodes?.length) {
      obj.stepNodes = message.stepNodes.map((e) => StepNode.toJSON(e));
    }
    if (message.processInstances?.length) {
      obj.processInstances = message.processInstances.map((e) => ProcessInstance.toJSON(e));
    }
    if (message.createTime !== undefined) {
      obj.createTime = message.createTime.toISOString();
    }
    if (message.lastUpdatedTime !== undefined) {
      obj.lastUpdatedTime = message.lastUpdatedTime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Process>, I>>(base?: I): Process {
    return Process.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Process>, I>>(object: I): Process {
    const message = createBaseProcess();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.stepTypes = object.stepTypes?.map((e) => StepType.fromPartial(e)) || [];
    message.stepNodes = object.stepNodes?.map((e) => StepNode.fromPartial(e)) || [];
    message.processInstances = object.processInstances?.map((e) => ProcessInstance.fromPartial(e)) || [];
    message.createTime = object.createTime ?? undefined;
    message.lastUpdatedTime = object.lastUpdatedTime ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Process.$type, Process);

function createBaseStepNode(): StepNode {
  return { $type: "pb.process_discovery.StepNode", id: "", stepTypeId: "", transitions: [] };
}

export const StepNode = {
  $type: "pb.process_discovery.StepNode" as const,

  encode(message: StepNode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.stepTypeId !== undefined && message.stepTypeId !== "") {
      writer.uint32(18).string(message.stepTypeId);
    }
    if (message.transitions !== undefined && message.transitions.length !== 0) {
      for (const v of message.transitions) {
        Transition.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StepNode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStepNode();
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

          message.stepTypeId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.transitions!.push(Transition.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StepNode {
    return {
      $type: StepNode.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      stepTypeId: isSet(object.stepTypeId) ? globalThis.String(object.stepTypeId) : "",
      transitions: globalThis.Array.isArray(object?.transitions)
        ? object.transitions.map((e: any) => Transition.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StepNode): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.stepTypeId !== undefined && message.stepTypeId !== "") {
      obj.stepTypeId = message.stepTypeId;
    }
    if (message.transitions?.length) {
      obj.transitions = message.transitions.map((e) => Transition.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StepNode>, I>>(base?: I): StepNode {
    return StepNode.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StepNode>, I>>(object: I): StepNode {
    const message = createBaseStepNode();
    message.id = object.id ?? "";
    message.stepTypeId = object.stepTypeId ?? "";
    message.transitions = object.transitions?.map((e) => Transition.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(StepNode.$type, StepNode);

function createBaseTransition(): Transition {
  return { $type: "pb.process_discovery.Transition", stepNodeId: "", branchCondition: undefined };
}

export const Transition = {
  $type: "pb.process_discovery.Transition" as const,

  encode(message: Transition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stepNodeId !== undefined && message.stepNodeId !== "") {
      writer.uint32(10).string(message.stepNodeId);
    }
    if (message.branchCondition !== undefined) {
      TransitionBranchCondition.encode(message.branchCondition, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Transition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stepNodeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.branchCondition = TransitionBranchCondition.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Transition {
    return {
      $type: Transition.$type,
      stepNodeId: isSet(object.stepNodeId) ? globalThis.String(object.stepNodeId) : "",
      branchCondition: isSet(object.branchCondition)
        ? TransitionBranchCondition.fromJSON(object.branchCondition)
        : undefined,
    };
  },

  toJSON(message: Transition): unknown {
    const obj: any = {};
    if (message.stepNodeId !== undefined && message.stepNodeId !== "") {
      obj.stepNodeId = message.stepNodeId;
    }
    if (message.branchCondition !== undefined) {
      obj.branchCondition = TransitionBranchCondition.toJSON(message.branchCondition);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Transition>, I>>(base?: I): Transition {
    return Transition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Transition>, I>>(object: I): Transition {
    const message = createBaseTransition();
    message.stepNodeId = object.stepNodeId ?? "";
    message.branchCondition = (object.branchCondition !== undefined && object.branchCondition !== null)
      ? TransitionBranchCondition.fromPartial(object.branchCondition)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(Transition.$type, Transition);

function createBaseTransitionBranchCondition(): TransitionBranchCondition {
  return { $type: "pb.process_discovery.Transition.BranchCondition", expression: "" };
}

export const TransitionBranchCondition = {
  $type: "pb.process_discovery.Transition.BranchCondition" as const,

  encode(message: TransitionBranchCondition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.expression !== undefined && message.expression !== "") {
      writer.uint32(10).string(message.expression);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransitionBranchCondition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransitionBranchCondition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.expression = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TransitionBranchCondition {
    return {
      $type: TransitionBranchCondition.$type,
      expression: isSet(object.expression) ? globalThis.String(object.expression) : "",
    };
  },

  toJSON(message: TransitionBranchCondition): unknown {
    const obj: any = {};
    if (message.expression !== undefined && message.expression !== "") {
      obj.expression = message.expression;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TransitionBranchCondition>, I>>(base?: I): TransitionBranchCondition {
    return TransitionBranchCondition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TransitionBranchCondition>, I>>(object: I): TransitionBranchCondition {
    const message = createBaseTransitionBranchCondition();
    message.expression = object.expression ?? "";
    return message;
  },
};

messageTypeRegistry.set(TransitionBranchCondition.$type, TransitionBranchCondition);

function createBaseProcessInstance(): ProcessInstance {
  return {
    $type: "pb.process_discovery.ProcessInstance",
    id: "",
    user: undefined,
    stepNodeInstances: [],
    attributes: {},
  };
}

export const ProcessInstance = {
  $type: "pb.process_discovery.ProcessInstance" as const,

  encode(message: ProcessInstance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.user !== undefined) {
      UserProfileInfo.encode(message.user, writer.uint32(18).fork()).ldelim();
    }
    if (message.stepNodeInstances !== undefined && message.stepNodeInstances.length !== 0) {
      for (const v of message.stepNodeInstances) {
        StepNodeInstance.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    Object.entries(message.attributes || {}).forEach(([key, value]) => {
      ProcessInstanceAttributesEntry.encode({
        $type: "pb.process_discovery.ProcessInstance.AttributesEntry",
        key: key as any,
        value,
      }, writer.uint32(34).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProcessInstance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessInstance();
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

          message.user = UserProfileInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.stepNodeInstances!.push(StepNodeInstance.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = ProcessInstanceAttributesEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.attributes![entry4.key] = entry4.value;
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

  fromJSON(object: any): ProcessInstance {
    return {
      $type: ProcessInstance.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      user: isSet(object.user) ? UserProfileInfo.fromJSON(object.user) : undefined,
      stepNodeInstances: globalThis.Array.isArray(object?.stepNodeInstances)
        ? object.stepNodeInstances.map((e: any) => StepNodeInstance.fromJSON(e))
        : [],
      attributes: isObject(object.attributes)
        ? Object.entries(object.attributes).reduce<{ [key: string]: AttributeValue }>((acc, [key, value]) => {
          acc[key] = AttributeValue.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ProcessInstance): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.user !== undefined) {
      obj.user = UserProfileInfo.toJSON(message.user);
    }
    if (message.stepNodeInstances?.length) {
      obj.stepNodeInstances = message.stepNodeInstances.map((e) => StepNodeInstance.toJSON(e));
    }
    if (message.attributes) {
      const entries = Object.entries(message.attributes);
      if (entries.length > 0) {
        obj.attributes = {};
        entries.forEach(([k, v]) => {
          obj.attributes[k] = AttributeValue.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProcessInstance>, I>>(base?: I): ProcessInstance {
    return ProcessInstance.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProcessInstance>, I>>(object: I): ProcessInstance {
    const message = createBaseProcessInstance();
    message.id = object.id ?? "";
    message.user = (object.user !== undefined && object.user !== null)
      ? UserProfileInfo.fromPartial(object.user)
      : undefined;
    message.stepNodeInstances = object.stepNodeInstances?.map((e) => StepNodeInstance.fromPartial(e)) || [];
    message.attributes = Object.entries(object.attributes ?? {}).reduce<{ [key: string]: AttributeValue }>(
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

messageTypeRegistry.set(ProcessInstance.$type, ProcessInstance);

function createBaseProcessInstanceAttributesEntry(): ProcessInstanceAttributesEntry {
  return { $type: "pb.process_discovery.ProcessInstance.AttributesEntry", key: "", value: undefined };
}

export const ProcessInstanceAttributesEntry = {
  $type: "pb.process_discovery.ProcessInstance.AttributesEntry" as const,

  encode(message: ProcessInstanceAttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      AttributeValue.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProcessInstanceAttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessInstanceAttributesEntry();
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

  fromJSON(object: any): ProcessInstanceAttributesEntry {
    return {
      $type: ProcessInstanceAttributesEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? AttributeValue.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ProcessInstanceAttributesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = AttributeValue.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProcessInstanceAttributesEntry>, I>>(base?: I): ProcessInstanceAttributesEntry {
    return ProcessInstanceAttributesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProcessInstanceAttributesEntry>, I>>(
    object: I,
  ): ProcessInstanceAttributesEntry {
    const message = createBaseProcessInstanceAttributesEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? AttributeValue.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ProcessInstanceAttributesEntry.$type, ProcessInstanceAttributesEntry);

function createBaseStepNodeInstance(): StepNodeInstance {
  return { $type: "pb.process_discovery.StepNodeInstance", stepNodeId: "", attributes: {}, observations: [] };
}

export const StepNodeInstance = {
  $type: "pb.process_discovery.StepNodeInstance" as const,

  encode(message: StepNodeInstance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stepNodeId !== undefined && message.stepNodeId !== "") {
      writer.uint32(10).string(message.stepNodeId);
    }
    Object.entries(message.attributes || {}).forEach(([key, value]) => {
      StepNodeInstanceAttributesEntry.encode({
        $type: "pb.process_discovery.StepNodeInstance.AttributesEntry",
        key: key as any,
        value,
      }, writer.uint32(18).fork()).ldelim();
    });
    if (message.observations !== undefined && message.observations.length !== 0) {
      for (const v of message.observations) {
        Observation.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StepNodeInstance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStepNodeInstance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stepNodeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = StepNodeInstanceAttributesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.attributes![entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): StepNodeInstance {
    return {
      $type: StepNodeInstance.$type,
      stepNodeId: isSet(object.stepNodeId) ? globalThis.String(object.stepNodeId) : "",
      attributes: isObject(object.attributes)
        ? Object.entries(object.attributes).reduce<{ [key: string]: AttributeValue }>((acc, [key, value]) => {
          acc[key] = AttributeValue.fromJSON(value);
          return acc;
        }, {})
        : {},
      observations: globalThis.Array.isArray(object?.observations)
        ? object.observations.map((e: any) => Observation.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StepNodeInstance): unknown {
    const obj: any = {};
    if (message.stepNodeId !== undefined && message.stepNodeId !== "") {
      obj.stepNodeId = message.stepNodeId;
    }
    if (message.attributes) {
      const entries = Object.entries(message.attributes);
      if (entries.length > 0) {
        obj.attributes = {};
        entries.forEach(([k, v]) => {
          obj.attributes[k] = AttributeValue.toJSON(v);
        });
      }
    }
    if (message.observations?.length) {
      obj.observations = message.observations.map((e) => Observation.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StepNodeInstance>, I>>(base?: I): StepNodeInstance {
    return StepNodeInstance.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StepNodeInstance>, I>>(object: I): StepNodeInstance {
    const message = createBaseStepNodeInstance();
    message.stepNodeId = object.stepNodeId ?? "";
    message.attributes = Object.entries(object.attributes ?? {}).reduce<{ [key: string]: AttributeValue }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = AttributeValue.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.observations = object.observations?.map((e) => Observation.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(StepNodeInstance.$type, StepNodeInstance);

function createBaseStepNodeInstanceAttributesEntry(): StepNodeInstanceAttributesEntry {
  return { $type: "pb.process_discovery.StepNodeInstance.AttributesEntry", key: "", value: undefined };
}

export const StepNodeInstanceAttributesEntry = {
  $type: "pb.process_discovery.StepNodeInstance.AttributesEntry" as const,

  encode(message: StepNodeInstanceAttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      AttributeValue.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StepNodeInstanceAttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStepNodeInstanceAttributesEntry();
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

  fromJSON(object: any): StepNodeInstanceAttributesEntry {
    return {
      $type: StepNodeInstanceAttributesEntry.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? AttributeValue.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: StepNodeInstanceAttributesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = AttributeValue.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StepNodeInstanceAttributesEntry>, I>>(base?: I): StepNodeInstanceAttributesEntry {
    return StepNodeInstanceAttributesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StepNodeInstanceAttributesEntry>, I>>(
    object: I,
  ): StepNodeInstanceAttributesEntry {
    const message = createBaseStepNodeInstanceAttributesEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? AttributeValue.fromPartial(object.value)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(StepNodeInstanceAttributesEntry.$type, StepNodeInstanceAttributesEntry);

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
