/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export interface UiEvent {
  $type?: "pb.v1alpha1.UiEvent";
  mouse?: UiEventMouse | undefined;
}

export interface UiEventMouse {
  $type?: "pb.v1alpha1.UiEvent.Mouse";
  button?: UiEventMouseMouseButton | undefined;
  eventType?:
    | UiEventMouseMouseEventType
    | undefined;
  /**
   * "viewport" (or "client") coordinate
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/CSSOM_view/Coordinate_systems#viewport
   */
  viewportX?: number | undefined;
  viewportY?: number | undefined;
}

export enum UiEventMouseMouseButton {
  UNDEFINED = 0,
  LEFT = 1,
  MIDDLE = 2,
  RIGHT = 3,
  UNRECOGNIZED = -1,
}

export function uiEventMouseMouseButtonFromJSON(object: any): UiEventMouseMouseButton {
  switch (object) {
    case 0:
    case "MOUSE_BUTTON_UNDEFINED":
      return UiEventMouseMouseButton.UNDEFINED;
    case 1:
    case "LEFT":
      return UiEventMouseMouseButton.LEFT;
    case 2:
    case "MIDDLE":
      return UiEventMouseMouseButton.MIDDLE;
    case 3:
    case "RIGHT":
      return UiEventMouseMouseButton.RIGHT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UiEventMouseMouseButton.UNRECOGNIZED;
  }
}

export function uiEventMouseMouseButtonToJSON(object: UiEventMouseMouseButton): string {
  switch (object) {
    case UiEventMouseMouseButton.UNDEFINED:
      return "MOUSE_BUTTON_UNDEFINED";
    case UiEventMouseMouseButton.LEFT:
      return "LEFT";
    case UiEventMouseMouseButton.MIDDLE:
      return "MIDDLE";
    case UiEventMouseMouseButton.RIGHT:
      return "RIGHT";
    case UiEventMouseMouseButton.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum UiEventMouseMouseEventType {
  UNDEFINED = 0,
  CLICK = 1,
  DOUBLE_CLICK = 2,
  MOUSE_UP = 3,
  MOUSE_DOWN = 4,
  UNRECOGNIZED = -1,
}

export function uiEventMouseMouseEventTypeFromJSON(object: any): UiEventMouseMouseEventType {
  switch (object) {
    case 0:
    case "MOUSE_EVENT_TYPE_UNDEFINED":
      return UiEventMouseMouseEventType.UNDEFINED;
    case 1:
    case "CLICK":
      return UiEventMouseMouseEventType.CLICK;
    case 2:
    case "DOUBLE_CLICK":
      return UiEventMouseMouseEventType.DOUBLE_CLICK;
    case 3:
    case "MOUSE_UP":
      return UiEventMouseMouseEventType.MOUSE_UP;
    case 4:
    case "MOUSE_DOWN":
      return UiEventMouseMouseEventType.MOUSE_DOWN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UiEventMouseMouseEventType.UNRECOGNIZED;
  }
}

export function uiEventMouseMouseEventTypeToJSON(object: UiEventMouseMouseEventType): string {
  switch (object) {
    case UiEventMouseMouseEventType.UNDEFINED:
      return "MOUSE_EVENT_TYPE_UNDEFINED";
    case UiEventMouseMouseEventType.CLICK:
      return "CLICK";
    case UiEventMouseMouseEventType.DOUBLE_CLICK:
      return "DOUBLE_CLICK";
    case UiEventMouseMouseEventType.MOUSE_UP:
      return "MOUSE_UP";
    case UiEventMouseMouseEventType.MOUSE_DOWN:
      return "MOUSE_DOWN";
    case UiEventMouseMouseEventType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseUiEvent(): UiEvent {
  return { $type: "pb.v1alpha1.UiEvent", mouse: undefined };
}

export const UiEvent = {
  $type: "pb.v1alpha1.UiEvent" as const,

  encode(message: UiEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mouse !== undefined) {
      UiEventMouse.encode(message.mouse, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UiEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUiEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.mouse = UiEventMouse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UiEvent {
    return { $type: UiEvent.$type, mouse: isSet(object.mouse) ? UiEventMouse.fromJSON(object.mouse) : undefined };
  },

  toJSON(message: UiEvent): unknown {
    const obj: any = {};
    if (message.mouse !== undefined) {
      obj.mouse = UiEventMouse.toJSON(message.mouse);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UiEvent>, I>>(base?: I): UiEvent {
    return UiEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UiEvent>, I>>(object: I): UiEvent {
    const message = createBaseUiEvent();
    message.mouse = (object.mouse !== undefined && object.mouse !== null)
      ? UiEventMouse.fromPartial(object.mouse)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UiEvent.$type, UiEvent);

function createBaseUiEventMouse(): UiEventMouse {
  return { $type: "pb.v1alpha1.UiEvent.Mouse", button: 0, eventType: 0, viewportX: 0, viewportY: 0 };
}

export const UiEventMouse = {
  $type: "pb.v1alpha1.UiEvent.Mouse" as const,

  encode(message: UiEventMouse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.button !== undefined && message.button !== 0) {
      writer.uint32(8).int32(message.button);
    }
    if (message.eventType !== undefined && message.eventType !== 0) {
      writer.uint32(16).int32(message.eventType);
    }
    if (message.viewportX !== undefined && message.viewportX !== 0) {
      writer.uint32(24).int32(message.viewportX);
    }
    if (message.viewportY !== undefined && message.viewportY !== 0) {
      writer.uint32(32).int32(message.viewportY);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UiEventMouse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUiEventMouse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.button = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.eventType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.viewportX = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.viewportY = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UiEventMouse {
    return {
      $type: UiEventMouse.$type,
      button: isSet(object.button) ? uiEventMouseMouseButtonFromJSON(object.button) : 0,
      eventType: isSet(object.eventType) ? uiEventMouseMouseEventTypeFromJSON(object.eventType) : 0,
      viewportX: isSet(object.viewportX) ? globalThis.Number(object.viewportX) : 0,
      viewportY: isSet(object.viewportY) ? globalThis.Number(object.viewportY) : 0,
    };
  },

  toJSON(message: UiEventMouse): unknown {
    const obj: any = {};
    if (message.button !== undefined && message.button !== 0) {
      obj.button = uiEventMouseMouseButtonToJSON(message.button);
    }
    if (message.eventType !== undefined && message.eventType !== 0) {
      obj.eventType = uiEventMouseMouseEventTypeToJSON(message.eventType);
    }
    if (message.viewportX !== undefined && message.viewportX !== 0) {
      obj.viewportX = Math.round(message.viewportX);
    }
    if (message.viewportY !== undefined && message.viewportY !== 0) {
      obj.viewportY = Math.round(message.viewportY);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UiEventMouse>, I>>(base?: I): UiEventMouse {
    return UiEventMouse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UiEventMouse>, I>>(object: I): UiEventMouse {
    const message = createBaseUiEventMouse();
    message.button = object.button ?? 0;
    message.eventType = object.eventType ?? 0;
    message.viewportX = object.viewportX ?? 0;
    message.viewportY = object.viewportY ?? 0;
    return message;
  },
};

messageTypeRegistry.set(UiEventMouse.$type, UiEventMouse);

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
