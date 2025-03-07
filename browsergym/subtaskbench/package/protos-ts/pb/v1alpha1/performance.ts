/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { DateMessage } from "../../google/type/date";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

/** To capture performance for various needs. */
export interface Performance {
  $type?: "pb.v1alpha1.Performance";
  truePositive?: number | undefined;
  trueNegative?: number | undefined;
  falsePositive?: number | undefined;
  falseNegative?: number | undefined;
  precision?: number | undefined;
  recall?: number | undefined;
  microF1?: number | undefined;
  macroF1?: number | undefined;
  accuracy?: number | undefined;
  taskEntityMetrics?: TaskEntityMetrics[] | undefined;
}

export interface DailyPerformance {
  $type?: "pb.v1alpha1.DailyPerformance";
  date?: DateMessage | undefined;
  performance?: Performance | undefined;
}

export interface TaskEntityMetrics {
  $type?: "pb.v1alpha1.TaskEntityMetrics";
  parentEntityType?: string | undefined;
  childEntityType?: string | undefined;
  truePositive?: number | undefined;
  trueNegative?: number | undefined;
  falseNegative?: number | undefined;
  falsePositive?: number | undefined;
  preAnnotationConfidenceScore?: number | undefined;
}

function createBasePerformance(): Performance {
  return {
    $type: "pb.v1alpha1.Performance",
    truePositive: 0,
    trueNegative: 0,
    falsePositive: 0,
    falseNegative: 0,
    precision: 0,
    recall: 0,
    microF1: 0,
    macroF1: 0,
    accuracy: 0,
    taskEntityMetrics: [],
  };
}

export const Performance = {
  $type: "pb.v1alpha1.Performance" as const,

  encode(message: Performance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.truePositive !== undefined && message.truePositive !== 0) {
      writer.uint32(8).int32(message.truePositive);
    }
    if (message.trueNegative !== undefined && message.trueNegative !== 0) {
      writer.uint32(16).int32(message.trueNegative);
    }
    if (message.falsePositive !== undefined && message.falsePositive !== 0) {
      writer.uint32(24).int32(message.falsePositive);
    }
    if (message.falseNegative !== undefined && message.falseNegative !== 0) {
      writer.uint32(32).int32(message.falseNegative);
    }
    if (message.precision !== undefined && message.precision !== 0) {
      writer.uint32(41).double(message.precision);
    }
    if (message.recall !== undefined && message.recall !== 0) {
      writer.uint32(49).double(message.recall);
    }
    if (message.microF1 !== undefined && message.microF1 !== 0) {
      writer.uint32(57).double(message.microF1);
    }
    if (message.macroF1 !== undefined && message.macroF1 !== 0) {
      writer.uint32(65).double(message.macroF1);
    }
    if (message.accuracy !== undefined && message.accuracy !== 0) {
      writer.uint32(73).double(message.accuracy);
    }
    if (message.taskEntityMetrics !== undefined && message.taskEntityMetrics.length !== 0) {
      for (const v of message.taskEntityMetrics) {
        TaskEntityMetrics.encode(v!, writer.uint32(82).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Performance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePerformance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.truePositive = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.trueNegative = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.falsePositive = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.falseNegative = reader.int32();
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.precision = reader.double();
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.recall = reader.double();
          continue;
        case 7:
          if (tag !== 57) {
            break;
          }

          message.microF1 = reader.double();
          continue;
        case 8:
          if (tag !== 65) {
            break;
          }

          message.macroF1 = reader.double();
          continue;
        case 9:
          if (tag !== 73) {
            break;
          }

          message.accuracy = reader.double();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.taskEntityMetrics!.push(TaskEntityMetrics.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Performance {
    return {
      $type: Performance.$type,
      truePositive: isSet(object.truePositive) ? globalThis.Number(object.truePositive) : 0,
      trueNegative: isSet(object.trueNegative) ? globalThis.Number(object.trueNegative) : 0,
      falsePositive: isSet(object.falsePositive) ? globalThis.Number(object.falsePositive) : 0,
      falseNegative: isSet(object.falseNegative) ? globalThis.Number(object.falseNegative) : 0,
      precision: isSet(object.precision) ? globalThis.Number(object.precision) : 0,
      recall: isSet(object.recall) ? globalThis.Number(object.recall) : 0,
      microF1: isSet(object.microF1) ? globalThis.Number(object.microF1) : 0,
      macroF1: isSet(object.macroF1) ? globalThis.Number(object.macroF1) : 0,
      accuracy: isSet(object.accuracy) ? globalThis.Number(object.accuracy) : 0,
      taskEntityMetrics: globalThis.Array.isArray(object?.taskEntityMetrics)
        ? object.taskEntityMetrics.map((e: any) => TaskEntityMetrics.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Performance): unknown {
    const obj: any = {};
    if (message.truePositive !== undefined && message.truePositive !== 0) {
      obj.truePositive = Math.round(message.truePositive);
    }
    if (message.trueNegative !== undefined && message.trueNegative !== 0) {
      obj.trueNegative = Math.round(message.trueNegative);
    }
    if (message.falsePositive !== undefined && message.falsePositive !== 0) {
      obj.falsePositive = Math.round(message.falsePositive);
    }
    if (message.falseNegative !== undefined && message.falseNegative !== 0) {
      obj.falseNegative = Math.round(message.falseNegative);
    }
    if (message.precision !== undefined && message.precision !== 0) {
      obj.precision = message.precision;
    }
    if (message.recall !== undefined && message.recall !== 0) {
      obj.recall = message.recall;
    }
    if (message.microF1 !== undefined && message.microF1 !== 0) {
      obj.microF1 = message.microF1;
    }
    if (message.macroF1 !== undefined && message.macroF1 !== 0) {
      obj.macroF1 = message.macroF1;
    }
    if (message.accuracy !== undefined && message.accuracy !== 0) {
      obj.accuracy = message.accuracy;
    }
    if (message.taskEntityMetrics?.length) {
      obj.taskEntityMetrics = message.taskEntityMetrics.map((e) => TaskEntityMetrics.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Performance>, I>>(base?: I): Performance {
    return Performance.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Performance>, I>>(object: I): Performance {
    const message = createBasePerformance();
    message.truePositive = object.truePositive ?? 0;
    message.trueNegative = object.trueNegative ?? 0;
    message.falsePositive = object.falsePositive ?? 0;
    message.falseNegative = object.falseNegative ?? 0;
    message.precision = object.precision ?? 0;
    message.recall = object.recall ?? 0;
    message.microF1 = object.microF1 ?? 0;
    message.macroF1 = object.macroF1 ?? 0;
    message.accuracy = object.accuracy ?? 0;
    message.taskEntityMetrics = object.taskEntityMetrics?.map((e) => TaskEntityMetrics.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(Performance.$type, Performance);

function createBaseDailyPerformance(): DailyPerformance {
  return { $type: "pb.v1alpha1.DailyPerformance", date: undefined, performance: undefined };
}

export const DailyPerformance = {
  $type: "pb.v1alpha1.DailyPerformance" as const,

  encode(message: DailyPerformance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.date !== undefined) {
      DateMessage.encode(message.date, writer.uint32(10).fork()).ldelim();
    }
    if (message.performance !== undefined) {
      Performance.encode(message.performance, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DailyPerformance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDailyPerformance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.date = DateMessage.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.performance = Performance.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DailyPerformance {
    return {
      $type: DailyPerformance.$type,
      date: isSet(object.date) ? DateMessage.fromJSON(object.date) : undefined,
      performance: isSet(object.performance) ? Performance.fromJSON(object.performance) : undefined,
    };
  },

  toJSON(message: DailyPerformance): unknown {
    const obj: any = {};
    if (message.date !== undefined) {
      obj.date = DateMessage.toJSON(message.date);
    }
    if (message.performance !== undefined) {
      obj.performance = Performance.toJSON(message.performance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DailyPerformance>, I>>(base?: I): DailyPerformance {
    return DailyPerformance.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DailyPerformance>, I>>(object: I): DailyPerformance {
    const message = createBaseDailyPerformance();
    message.date = (object.date !== undefined && object.date !== null)
      ? DateMessage.fromPartial(object.date)
      : undefined;
    message.performance = (object.performance !== undefined && object.performance !== null)
      ? Performance.fromPartial(object.performance)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DailyPerformance.$type, DailyPerformance);

function createBaseTaskEntityMetrics(): TaskEntityMetrics {
  return {
    $type: "pb.v1alpha1.TaskEntityMetrics",
    parentEntityType: "",
    childEntityType: "",
    truePositive: 0,
    trueNegative: 0,
    falseNegative: 0,
    falsePositive: 0,
    preAnnotationConfidenceScore: 0,
  };
}

export const TaskEntityMetrics = {
  $type: "pb.v1alpha1.TaskEntityMetrics" as const,

  encode(message: TaskEntityMetrics, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parentEntityType !== undefined && message.parentEntityType !== "") {
      writer.uint32(10).string(message.parentEntityType);
    }
    if (message.childEntityType !== undefined && message.childEntityType !== "") {
      writer.uint32(18).string(message.childEntityType);
    }
    if (message.truePositive !== undefined && message.truePositive !== 0) {
      writer.uint32(24).int32(message.truePositive);
    }
    if (message.trueNegative !== undefined && message.trueNegative !== 0) {
      writer.uint32(32).int32(message.trueNegative);
    }
    if (message.falseNegative !== undefined && message.falseNegative !== 0) {
      writer.uint32(40).int32(message.falseNegative);
    }
    if (message.falsePositive !== undefined && message.falsePositive !== 0) {
      writer.uint32(48).int32(message.falsePositive);
    }
    if (message.preAnnotationConfidenceScore !== undefined && message.preAnnotationConfidenceScore !== 0) {
      writer.uint32(61).float(message.preAnnotationConfidenceScore);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TaskEntityMetrics {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTaskEntityMetrics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parentEntityType = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.childEntityType = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.truePositive = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.trueNegative = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.falseNegative = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.falsePositive = reader.int32();
          continue;
        case 7:
          if (tag !== 61) {
            break;
          }

          message.preAnnotationConfidenceScore = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TaskEntityMetrics {
    return {
      $type: TaskEntityMetrics.$type,
      parentEntityType: isSet(object.parentEntityType) ? globalThis.String(object.parentEntityType) : "",
      childEntityType: isSet(object.childEntityType) ? globalThis.String(object.childEntityType) : "",
      truePositive: isSet(object.truePositive) ? globalThis.Number(object.truePositive) : 0,
      trueNegative: isSet(object.trueNegative) ? globalThis.Number(object.trueNegative) : 0,
      falseNegative: isSet(object.falseNegative) ? globalThis.Number(object.falseNegative) : 0,
      falsePositive: isSet(object.falsePositive) ? globalThis.Number(object.falsePositive) : 0,
      preAnnotationConfidenceScore: isSet(object.preAnnotationConfidenceScore)
        ? globalThis.Number(object.preAnnotationConfidenceScore)
        : 0,
    };
  },

  toJSON(message: TaskEntityMetrics): unknown {
    const obj: any = {};
    if (message.parentEntityType !== undefined && message.parentEntityType !== "") {
      obj.parentEntityType = message.parentEntityType;
    }
    if (message.childEntityType !== undefined && message.childEntityType !== "") {
      obj.childEntityType = message.childEntityType;
    }
    if (message.truePositive !== undefined && message.truePositive !== 0) {
      obj.truePositive = Math.round(message.truePositive);
    }
    if (message.trueNegative !== undefined && message.trueNegative !== 0) {
      obj.trueNegative = Math.round(message.trueNegative);
    }
    if (message.falseNegative !== undefined && message.falseNegative !== 0) {
      obj.falseNegative = Math.round(message.falseNegative);
    }
    if (message.falsePositive !== undefined && message.falsePositive !== 0) {
      obj.falsePositive = Math.round(message.falsePositive);
    }
    if (message.preAnnotationConfidenceScore !== undefined && message.preAnnotationConfidenceScore !== 0) {
      obj.preAnnotationConfidenceScore = message.preAnnotationConfidenceScore;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TaskEntityMetrics>, I>>(base?: I): TaskEntityMetrics {
    return TaskEntityMetrics.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TaskEntityMetrics>, I>>(object: I): TaskEntityMetrics {
    const message = createBaseTaskEntityMetrics();
    message.parentEntityType = object.parentEntityType ?? "";
    message.childEntityType = object.childEntityType ?? "";
    message.truePositive = object.truePositive ?? 0;
    message.trueNegative = object.trueNegative ?? 0;
    message.falseNegative = object.falseNegative ?? 0;
    message.falsePositive = object.falsePositive ?? 0;
    message.preAnnotationConfidenceScore = object.preAnnotationConfidenceScore ?? 0;
    return message;
  },
};

messageTypeRegistry.set(TaskEntityMetrics.$type, TaskEntityMetrics);

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
