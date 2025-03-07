/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../../../typeRegistry";

export const protobufPackage = "google.cloud.documentai.v1";

/**
 * A vertex represents a 2D point in the image.
 * NOTE: the vertex coordinates are in the same scale as the original image.
 */
export interface Vertex {
  $type?: "google.cloud.documentai.v1.Vertex";
  /** X coordinate. */
  x?:
    | number
    | undefined;
  /** Y coordinate (starts from the top of the image). */
  y?: number | undefined;
}

/**
 * A vertex represents a 2D point in the image.
 * NOTE: the normalized vertex coordinates are relative to the original image
 * and range from 0 to 1.
 */
export interface NormalizedVertex {
  $type?: "google.cloud.documentai.v1.NormalizedVertex";
  /** X coordinate. */
  x?:
    | number
    | undefined;
  /** Y coordinate (starts from the top of the image). */
  y?: number | undefined;
}

/** A bounding polygon for the detected image annotation. */
export interface BoundingPoly {
  $type?: "google.cloud.documentai.v1.BoundingPoly";
  /** The bounding polygon vertices. */
  vertices?:
    | Vertex[]
    | undefined;
  /** The bounding polygon normalized vertices. */
  normalizedVertices?: NormalizedVertex[] | undefined;
}

function createBaseVertex(): Vertex {
  return { $type: "google.cloud.documentai.v1.Vertex", x: 0, y: 0 };
}

export const Vertex = {
  $type: "google.cloud.documentai.v1.Vertex" as const,

  encode(message: Vertex, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== undefined && message.x !== 0) {
      writer.uint32(8).int32(message.x);
    }
    if (message.y !== undefined && message.y !== 0) {
      writer.uint32(16).int32(message.y);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vertex {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVertex();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.x = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.y = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Vertex {
    return {
      $type: Vertex.$type,
      x: isSet(object.x) ? globalThis.Number(object.x) : 0,
      y: isSet(object.y) ? globalThis.Number(object.y) : 0,
    };
  },

  toJSON(message: Vertex): unknown {
    const obj: any = {};
    if (message.x !== undefined && message.x !== 0) {
      obj.x = Math.round(message.x);
    }
    if (message.y !== undefined && message.y !== 0) {
      obj.y = Math.round(message.y);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Vertex>, I>>(base?: I): Vertex {
    return Vertex.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Vertex>, I>>(object: I): Vertex {
    const message = createBaseVertex();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Vertex.$type, Vertex);

function createBaseNormalizedVertex(): NormalizedVertex {
  return { $type: "google.cloud.documentai.v1.NormalizedVertex", x: 0, y: 0 };
}

export const NormalizedVertex = {
  $type: "google.cloud.documentai.v1.NormalizedVertex" as const,

  encode(message: NormalizedVertex, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== undefined && message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== undefined && message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NormalizedVertex {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNormalizedVertex();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.x = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.y = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NormalizedVertex {
    return {
      $type: NormalizedVertex.$type,
      x: isSet(object.x) ? globalThis.Number(object.x) : 0,
      y: isSet(object.y) ? globalThis.Number(object.y) : 0,
    };
  },

  toJSON(message: NormalizedVertex): unknown {
    const obj: any = {};
    if (message.x !== undefined && message.x !== 0) {
      obj.x = message.x;
    }
    if (message.y !== undefined && message.y !== 0) {
      obj.y = message.y;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NormalizedVertex>, I>>(base?: I): NormalizedVertex {
    return NormalizedVertex.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NormalizedVertex>, I>>(object: I): NormalizedVertex {
    const message = createBaseNormalizedVertex();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    return message;
  },
};

messageTypeRegistry.set(NormalizedVertex.$type, NormalizedVertex);

function createBaseBoundingPoly(): BoundingPoly {
  return { $type: "google.cloud.documentai.v1.BoundingPoly", vertices: [], normalizedVertices: [] };
}

export const BoundingPoly = {
  $type: "google.cloud.documentai.v1.BoundingPoly" as const,

  encode(message: BoundingPoly, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vertices !== undefined && message.vertices.length !== 0) {
      for (const v of message.vertices) {
        Vertex.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.normalizedVertices !== undefined && message.normalizedVertices.length !== 0) {
      for (const v of message.normalizedVertices) {
        NormalizedVertex.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BoundingPoly {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBoundingPoly();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.vertices!.push(Vertex.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.normalizedVertices!.push(NormalizedVertex.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BoundingPoly {
    return {
      $type: BoundingPoly.$type,
      vertices: globalThis.Array.isArray(object?.vertices) ? object.vertices.map((e: any) => Vertex.fromJSON(e)) : [],
      normalizedVertices: globalThis.Array.isArray(object?.normalizedVertices)
        ? object.normalizedVertices.map((e: any) => NormalizedVertex.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BoundingPoly): unknown {
    const obj: any = {};
    if (message.vertices?.length) {
      obj.vertices = message.vertices.map((e) => Vertex.toJSON(e));
    }
    if (message.normalizedVertices?.length) {
      obj.normalizedVertices = message.normalizedVertices.map((e) => NormalizedVertex.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BoundingPoly>, I>>(base?: I): BoundingPoly {
    return BoundingPoly.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BoundingPoly>, I>>(object: I): BoundingPoly {
    const message = createBaseBoundingPoly();
    message.vertices = object.vertices?.map((e) => Vertex.fromPartial(e)) || [];
    message.normalizedVertices = object.normalizedVertices?.map((e) => NormalizedVertex.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(BoundingPoly.$type, BoundingPoly);

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
