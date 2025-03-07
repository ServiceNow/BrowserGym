/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { DeletedObjectInfo } from "../../common/common";
import { CompositeGroupCondition } from "../../common/review";
import { UserProfileInfo } from "../../common/user_profile";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha2";

export interface Connector {
  $type?: "pb.v1alpha2.Connector";
  /** Resource name. Format: connectors/{ID} */
  name?: string | undefined;
  displayName?: string | undefined;
  description?: string | undefined;
  sourceWorkflow?: WorkflowInfo | undefined;
  destinationWorkflow?: WorkflowInfo | undefined;
  groupCondition?:
    | CompositeGroupCondition
    | undefined;
  /** Organization resource name. Format: organizations/{ID} */
  orgResourceName?: string | undefined;
  assignmentConfig?:
    | AssignmentConfig
    | undefined;
  /**
   * This field allows soft deletion over time by
   * marking workflow for deletion without immediately deleting it.
   */
  deletedObjectInfo?:
    | DeletedObjectInfo
    | undefined;
  /** Do not use, use creator instead. */
  creatorEmail?: string | undefined;
  createTime?: Date | undefined;
  lastModifiedTime?:
    | Date
    | undefined;
  /** Creator info of the connector */
  creator?: UserProfileInfo | undefined;
}

/**
 * Used to store the configurations to do preferential assignments
 * across source and destination tasks
 */
export interface AssignmentConfig {
  $type?: "pb.v1alpha2.AssignmentConfig";
  /**
   * Bool indicating preference for same user in source workflow and destination workflow
   * Currently only source R1 user is being considered
   */
  preserveAssignee?: boolean | undefined;
}

export interface WorkflowInfo {
  $type?: "pb.v1alpha2.WorkflowInfo";
  /** Wokflow resource name. Format: workflows/{ID} */
  workflowResourceName?: string | undefined;
  workflowName?: string | undefined;
}

function createBaseConnector(): Connector {
  return {
    $type: "pb.v1alpha2.Connector",
    name: "",
    displayName: "",
    description: "",
    sourceWorkflow: undefined,
    destinationWorkflow: undefined,
    groupCondition: undefined,
    orgResourceName: "",
    assignmentConfig: undefined,
    deletedObjectInfo: undefined,
    creatorEmail: "",
    createTime: undefined,
    lastModifiedTime: undefined,
    creator: undefined,
  };
}

export const Connector = {
  $type: "pb.v1alpha2.Connector" as const,

  encode(message: Connector, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.sourceWorkflow !== undefined) {
      WorkflowInfo.encode(message.sourceWorkflow, writer.uint32(34).fork()).ldelim();
    }
    if (message.destinationWorkflow !== undefined) {
      WorkflowInfo.encode(message.destinationWorkflow, writer.uint32(42).fork()).ldelim();
    }
    if (message.groupCondition !== undefined) {
      CompositeGroupCondition.encode(message.groupCondition, writer.uint32(50).fork()).ldelim();
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(58).string(message.orgResourceName);
    }
    if (message.assignmentConfig !== undefined) {
      AssignmentConfig.encode(message.assignmentConfig, writer.uint32(66).fork()).ldelim();
    }
    if (message.deletedObjectInfo !== undefined) {
      DeletedObjectInfo.encode(message.deletedObjectInfo, writer.uint32(74).fork()).ldelim();
    }
    if (message.creatorEmail !== undefined && message.creatorEmail !== "") {
      writer.uint32(82).string(message.creatorEmail);
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(90).fork()).ldelim();
    }
    if (message.lastModifiedTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastModifiedTime), writer.uint32(98).fork()).ldelim();
    }
    if (message.creator !== undefined) {
      UserProfileInfo.encode(message.creator, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Connector {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnector();
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

          message.sourceWorkflow = WorkflowInfo.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.destinationWorkflow = WorkflowInfo.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.groupCondition = CompositeGroupCondition.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.orgResourceName = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.assignmentConfig = AssignmentConfig.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.deletedObjectInfo = DeletedObjectInfo.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.creatorEmail = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.createTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.lastModifiedTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.creator = UserProfileInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Connector {
    return {
      $type: Connector.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      sourceWorkflow: isSet(object.sourceWorkflow) ? WorkflowInfo.fromJSON(object.sourceWorkflow) : undefined,
      destinationWorkflow: isSet(object.destinationWorkflow)
        ? WorkflowInfo.fromJSON(object.destinationWorkflow)
        : undefined,
      groupCondition: isSet(object.groupCondition)
        ? CompositeGroupCondition.fromJSON(object.groupCondition)
        : undefined,
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      assignmentConfig: isSet(object.assignmentConfig) ? AssignmentConfig.fromJSON(object.assignmentConfig) : undefined,
      deletedObjectInfo: isSet(object.deletedObjectInfo)
        ? DeletedObjectInfo.fromJSON(object.deletedObjectInfo)
        : undefined,
      creatorEmail: isSet(object.creatorEmail) ? globalThis.String(object.creatorEmail) : "",
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      lastModifiedTime: isSet(object.lastModifiedTime) ? fromJsonTimestamp(object.lastModifiedTime) : undefined,
      creator: isSet(object.creator) ? UserProfileInfo.fromJSON(object.creator) : undefined,
    };
  },

  toJSON(message: Connector): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.sourceWorkflow !== undefined) {
      obj.sourceWorkflow = WorkflowInfo.toJSON(message.sourceWorkflow);
    }
    if (message.destinationWorkflow !== undefined) {
      obj.destinationWorkflow = WorkflowInfo.toJSON(message.destinationWorkflow);
    }
    if (message.groupCondition !== undefined) {
      obj.groupCondition = CompositeGroupCondition.toJSON(message.groupCondition);
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.assignmentConfig !== undefined) {
      obj.assignmentConfig = AssignmentConfig.toJSON(message.assignmentConfig);
    }
    if (message.deletedObjectInfo !== undefined) {
      obj.deletedObjectInfo = DeletedObjectInfo.toJSON(message.deletedObjectInfo);
    }
    if (message.creatorEmail !== undefined && message.creatorEmail !== "") {
      obj.creatorEmail = message.creatorEmail;
    }
    if (message.createTime !== undefined) {
      obj.createTime = message.createTime.toISOString();
    }
    if (message.lastModifiedTime !== undefined) {
      obj.lastModifiedTime = message.lastModifiedTime.toISOString();
    }
    if (message.creator !== undefined) {
      obj.creator = UserProfileInfo.toJSON(message.creator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Connector>, I>>(base?: I): Connector {
    return Connector.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Connector>, I>>(object: I): Connector {
    const message = createBaseConnector();
    message.name = object.name ?? "";
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.sourceWorkflow = (object.sourceWorkflow !== undefined && object.sourceWorkflow !== null)
      ? WorkflowInfo.fromPartial(object.sourceWorkflow)
      : undefined;
    message.destinationWorkflow = (object.destinationWorkflow !== undefined && object.destinationWorkflow !== null)
      ? WorkflowInfo.fromPartial(object.destinationWorkflow)
      : undefined;
    message.groupCondition = (object.groupCondition !== undefined && object.groupCondition !== null)
      ? CompositeGroupCondition.fromPartial(object.groupCondition)
      : undefined;
    message.orgResourceName = object.orgResourceName ?? "";
    message.assignmentConfig = (object.assignmentConfig !== undefined && object.assignmentConfig !== null)
      ? AssignmentConfig.fromPartial(object.assignmentConfig)
      : undefined;
    message.deletedObjectInfo = (object.deletedObjectInfo !== undefined && object.deletedObjectInfo !== null)
      ? DeletedObjectInfo.fromPartial(object.deletedObjectInfo)
      : undefined;
    message.creatorEmail = object.creatorEmail ?? "";
    message.createTime = object.createTime ?? undefined;
    message.lastModifiedTime = object.lastModifiedTime ?? undefined;
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? UserProfileInfo.fromPartial(object.creator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(Connector.$type, Connector);

function createBaseAssignmentConfig(): AssignmentConfig {
  return { $type: "pb.v1alpha2.AssignmentConfig", preserveAssignee: false };
}

export const AssignmentConfig = {
  $type: "pb.v1alpha2.AssignmentConfig" as const,

  encode(message: AssignmentConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.preserveAssignee !== undefined && message.preserveAssignee !== false) {
      writer.uint32(8).bool(message.preserveAssignee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AssignmentConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssignmentConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.preserveAssignee = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AssignmentConfig {
    return {
      $type: AssignmentConfig.$type,
      preserveAssignee: isSet(object.preserveAssignee) ? globalThis.Boolean(object.preserveAssignee) : false,
    };
  },

  toJSON(message: AssignmentConfig): unknown {
    const obj: any = {};
    if (message.preserveAssignee !== undefined && message.preserveAssignee !== false) {
      obj.preserveAssignee = message.preserveAssignee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AssignmentConfig>, I>>(base?: I): AssignmentConfig {
    return AssignmentConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AssignmentConfig>, I>>(object: I): AssignmentConfig {
    const message = createBaseAssignmentConfig();
    message.preserveAssignee = object.preserveAssignee ?? false;
    return message;
  },
};

messageTypeRegistry.set(AssignmentConfig.$type, AssignmentConfig);

function createBaseWorkflowInfo(): WorkflowInfo {
  return { $type: "pb.v1alpha2.WorkflowInfo", workflowResourceName: "", workflowName: "" };
}

export const WorkflowInfo = {
  $type: "pb.v1alpha2.WorkflowInfo" as const,

  encode(message: WorkflowInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowResourceName !== undefined && message.workflowResourceName !== "") {
      writer.uint32(10).string(message.workflowResourceName);
    }
    if (message.workflowName !== undefined && message.workflowName !== "") {
      writer.uint32(18).string(message.workflowName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflowResourceName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.workflowName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WorkflowInfo {
    return {
      $type: WorkflowInfo.$type,
      workflowResourceName: isSet(object.workflowResourceName) ? globalThis.String(object.workflowResourceName) : "",
      workflowName: isSet(object.workflowName) ? globalThis.String(object.workflowName) : "",
    };
  },

  toJSON(message: WorkflowInfo): unknown {
    const obj: any = {};
    if (message.workflowResourceName !== undefined && message.workflowResourceName !== "") {
      obj.workflowResourceName = message.workflowResourceName;
    }
    if (message.workflowName !== undefined && message.workflowName !== "") {
      obj.workflowName = message.workflowName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WorkflowInfo>, I>>(base?: I): WorkflowInfo {
    return WorkflowInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WorkflowInfo>, I>>(object: I): WorkflowInfo {
    const message = createBaseWorkflowInfo();
    message.workflowResourceName = object.workflowResourceName ?? "";
    message.workflowName = object.workflowName ?? "";
    return message;
  },
};

messageTypeRegistry.set(WorkflowInfo.$type, WorkflowInfo);

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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
