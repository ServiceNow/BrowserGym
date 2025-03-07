/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export interface ExecutionWarning {
  $type?: "pb.v1alpha1.ExecutionWarning";
  warning?:
    | ExecutionWarningWarning
    | undefined;
  /** The message to display to the user. */
  message?: string | undefined;
}

export enum ExecutionWarningWarning {
  UNSPECIFIED = 0,
  /** LLM_OUTPUT_TOKEN_LIMIT_EXCEEDED - Indicates that the extracted content was limited by the LLM's output token limits. */
  LLM_OUTPUT_TOKEN_LIMIT_EXCEEDED = 1,
  /** PIPELINE_FALLBACK - Indicates that a pipeline version fallback occurred during processing (e.g., Hybrid V3 to Hybrid V1). */
  PIPELINE_FALLBACK = 2,
  UNRECOGNIZED = -1,
}

export function executionWarningWarningFromJSON(object: any): ExecutionWarningWarning {
  switch (object) {
    case 0:
    case "WARNING_UNSPECIFIED":
      return ExecutionWarningWarning.UNSPECIFIED;
    case 1:
    case "WARNING_LLM_OUTPUT_TOKEN_LIMIT_EXCEEDED":
      return ExecutionWarningWarning.LLM_OUTPUT_TOKEN_LIMIT_EXCEEDED;
    case 2:
    case "WARNING_PIPELINE_FALLBACK":
      return ExecutionWarningWarning.PIPELINE_FALLBACK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ExecutionWarningWarning.UNRECOGNIZED;
  }
}

export function executionWarningWarningToJSON(object: ExecutionWarningWarning): string {
  switch (object) {
    case ExecutionWarningWarning.UNSPECIFIED:
      return "WARNING_UNSPECIFIED";
    case ExecutionWarningWarning.LLM_OUTPUT_TOKEN_LIMIT_EXCEEDED:
      return "WARNING_LLM_OUTPUT_TOKEN_LIMIT_EXCEEDED";
    case ExecutionWarningWarning.PIPELINE_FALLBACK:
      return "WARNING_PIPELINE_FALLBACK";
    case ExecutionWarningWarning.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseExecutionWarning(): ExecutionWarning {
  return { $type: "pb.v1alpha1.ExecutionWarning", warning: 0, message: "" };
}

export const ExecutionWarning = {
  $type: "pb.v1alpha1.ExecutionWarning" as const,

  encode(message: ExecutionWarning, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.warning !== undefined && message.warning !== 0) {
      writer.uint32(8).int32(message.warning);
    }
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecutionWarning {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutionWarning();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.warning = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecutionWarning {
    return {
      $type: ExecutionWarning.$type,
      warning: isSet(object.warning) ? executionWarningWarningFromJSON(object.warning) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: ExecutionWarning): unknown {
    const obj: any = {};
    if (message.warning !== undefined && message.warning !== 0) {
      obj.warning = executionWarningWarningToJSON(message.warning);
    }
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecutionWarning>, I>>(base?: I): ExecutionWarning {
    return ExecutionWarning.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExecutionWarning>, I>>(object: I): ExecutionWarning {
    const message = createBaseExecutionWarning();
    message.warning = object.warning ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

messageTypeRegistry.set(ExecutionWarning.$type, ExecutionWarning);

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
