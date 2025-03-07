/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";
import { DailyPerformance } from "./performance";
import { Schema } from "./schema";

export const protobufPackage = "pb.v1alpha1";

/** Stores common info or settings for generated suggestions. */
export interface Task {
  $type?: "pb.v1alpha1.Task";
  /** Resource name for task, in the format of users\/\* /tasks/\* */
  name?:
    | string
    | undefined;
  /** Task name description, e.g. "Process Invoice". Can't be empty. */
  taskName?: string | undefined;
  mode?:
    | TaskMode
    | undefined;
  /** Only useful for ASSISTED mode, value range [0,1] */
  confidenceThreshold?:
    | number
    | undefined;
  /**
   * Performance for each date that this task has accepted suggestions
   * in chronological order. Days without accepted task will not be included.
   */
  dailyPerformances?: DailyPerformance[] | undefined;
  schema?: Schema | undefined;
}

export enum TaskMode {
  UNSPECIFIED = 0,
  DEFAULT = 1,
  AUTOPILOT = 2,
  ASSISTED = 3,
  UNRECOGNIZED = -1,
}

export function taskModeFromJSON(object: any): TaskMode {
  switch (object) {
    case 0:
    case "UNSPECIFIED":
      return TaskMode.UNSPECIFIED;
    case 1:
    case "DEFAULT":
      return TaskMode.DEFAULT;
    case 2:
    case "AUTOPILOT":
      return TaskMode.AUTOPILOT;
    case 3:
    case "ASSISTED":
      return TaskMode.ASSISTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TaskMode.UNRECOGNIZED;
  }
}

export function taskModeToJSON(object: TaskMode): string {
  switch (object) {
    case TaskMode.UNSPECIFIED:
      return "UNSPECIFIED";
    case TaskMode.DEFAULT:
      return "DEFAULT";
    case TaskMode.AUTOPILOT:
      return "AUTOPILOT";
    case TaskMode.ASSISTED:
      return "ASSISTED";
    case TaskMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseTask(): Task {
  return {
    $type: "pb.v1alpha1.Task",
    name: "",
    taskName: "",
    mode: 0,
    confidenceThreshold: 0,
    dailyPerformances: [],
    schema: undefined,
  };
}

export const Task = {
  $type: "pb.v1alpha1.Task" as const,

  encode(message: Task, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.taskName !== undefined && message.taskName !== "") {
      writer.uint32(18).string(message.taskName);
    }
    if (message.mode !== undefined && message.mode !== 0) {
      writer.uint32(24).int32(message.mode);
    }
    if (message.confidenceThreshold !== undefined && message.confidenceThreshold !== 0) {
      writer.uint32(33).double(message.confidenceThreshold);
    }
    if (message.dailyPerformances !== undefined && message.dailyPerformances.length !== 0) {
      for (const v of message.dailyPerformances) {
        DailyPerformance.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Task {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTask();
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

          message.taskName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.confidenceThreshold = reader.double();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.dailyPerformances!.push(DailyPerformance.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.schema = Schema.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Task {
    return {
      $type: Task.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      taskName: isSet(object.taskName) ? globalThis.String(object.taskName) : "",
      mode: isSet(object.mode) ? taskModeFromJSON(object.mode) : 0,
      confidenceThreshold: isSet(object.confidenceThreshold) ? globalThis.Number(object.confidenceThreshold) : 0,
      dailyPerformances: globalThis.Array.isArray(object?.dailyPerformances)
        ? object.dailyPerformances.map((e: any) => DailyPerformance.fromJSON(e))
        : [],
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
    };
  },

  toJSON(message: Task): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.taskName !== undefined && message.taskName !== "") {
      obj.taskName = message.taskName;
    }
    if (message.mode !== undefined && message.mode !== 0) {
      obj.mode = taskModeToJSON(message.mode);
    }
    if (message.confidenceThreshold !== undefined && message.confidenceThreshold !== 0) {
      obj.confidenceThreshold = message.confidenceThreshold;
    }
    if (message.dailyPerformances?.length) {
      obj.dailyPerformances = message.dailyPerformances.map((e) => DailyPerformance.toJSON(e));
    }
    if (message.schema !== undefined) {
      obj.schema = Schema.toJSON(message.schema);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Task>, I>>(base?: I): Task {
    return Task.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Task>, I>>(object: I): Task {
    const message = createBaseTask();
    message.name = object.name ?? "";
    message.taskName = object.taskName ?? "";
    message.mode = object.mode ?? 0;
    message.confidenceThreshold = object.confidenceThreshold ?? 0;
    message.dailyPerformances = object.dailyPerformances?.map((e) => DailyPerformance.fromPartial(e)) || [];
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? Schema.fromPartial(object.schema)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(Task.$type, Task);

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
