/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Empty } from "../../google/protobuf/empty";
import { Timestamp } from "../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.v1alpha1";

export interface CreateMachineRequest {
  $type?: "pb.v1alpha1.CreateMachineRequest";
  machineName?: string | undefined;
}

export interface CreateMachineResponse {
  $type?: "pb.v1alpha1.CreateMachineResponse";
  machineIdentity?:
    | MachineIdentity
    | undefined;
  /**
   * Link to register the machine:
   * ex: https://web-app.orby.ai/auth?identity=<key>
   * deprecated - Use auth_code and agent_id instead
   *
   * @deprecated
   */
  registrationLink?:
    | string
    | undefined;
  /** auth_code is the auth code for the first agent for this machine to use for generating access token */
  authCode?:
    | string
    | undefined;
  /** agent_id is the id of the first agent for this machine */
  agentId?: string | undefined;
}

export interface DeleteAgentRequest {
  $type?: "pb.v1alpha1.DeleteAgentRequest";
  /** agent id of the agent to disconnect. This agent will also be removed from the machine it belongs to */
  agentId?: string | undefined;
}

export interface RegisterMachineRequest {
  $type?: "pb.v1alpha1.RegisterMachineRequest";
  /** registration token contains machine id in payload.UserId */
  registrationToken?: string | undefined;
}

export interface RegisterMachineResponse {
  $type?: "pb.v1alpha1.RegisterMachineResponse";
  /** access token payload to use for authentication */
  token?: string | undefined;
}

export interface DeregisterMachineRequest {
  $type?: "pb.v1alpha1.DeregisterMachineRequest";
  /** machine id of the machine to deregister */
  machineId?: string | undefined;
}

export interface ListMachinesRequest {
  $type?: "pb.v1alpha1.ListMachinesRequest";
  pageNumber?: number | undefined;
  pageSize?: number | undefined;
}

export interface ListMachinesResponse {
  $type?: "pb.v1alpha1.ListMachinesResponse";
  /** list of machines */
  machines?:
    | MachineIdentity[]
    | undefined;
  /** total number of machines for FE to render page numbers */
  totalMachines?: number | undefined;
}

export interface RegenerateRegistrationLinkRequest {
  $type?: "pb.v1alpha1.RegenerateRegistrationLinkRequest";
  /** machine id of the machine to regenerate registration link */
  machineId?: string | undefined;
}

export interface RegenerateRegistrationLinkResponse {
  $type?: "pb.v1alpha1.RegenerateRegistrationLinkResponse";
  /** registration link to register the machine */
  registrationLink?: string | undefined;
}

export interface DeleteMachineRequest {
  $type?: "pb.v1alpha1.DeleteMachineRequest";
  /** machine id of the machine to delete */
  machineId?: string | undefined;
}

export interface GetMachineRequest {
  $type?: "pb.v1alpha1.GetMachineRequest";
  /** machine id of the machine to get */
  machineId?: string | undefined;
}

export interface GetMachineResponse {
  $type?: "pb.v1alpha1.GetMachineResponse";
  machineIdentity?: MachineIdentity | undefined;
}

export interface MachineIdentity {
  $type?: "pb.v1alpha1.MachineIdentity";
  /** Unique id for machine */
  machineId?:
    | string
    | undefined;
  /** Machine name is unique per org */
  machineName?:
    | string
    | undefined;
  /** Stores the user that created the machine */
  userId?:
    | string
    | undefined;
  /** The org that the machine belongs to */
  orgId?:
    | string
    | undefined;
  /** Registration status of the machine */
  registrationStatus?: MachineIdentityRegistrationStatus | undefined;
  associatedWorkflows?:
    | MachineIdentityAssociatedWorkflow[]
    | undefined;
  /** @deprecated */
  websocketConnections?: MachineIdentityWebsocketConnection[] | undefined;
  agents?: MachineIdentityAgent[] | undefined;
}

export enum MachineIdentityRegistrationStatus {
  UNSPECIFIED = 0,
  REGISTERED = 1,
  UNREGISTERED = 2,
  PENDING = 3,
  UNRECOGNIZED = -1,
}

export function machineIdentityRegistrationStatusFromJSON(object: any): MachineIdentityRegistrationStatus {
  switch (object) {
    case 0:
    case "REGISTRATION_STATUS_UNSPECIFIED":
      return MachineIdentityRegistrationStatus.UNSPECIFIED;
    case 1:
    case "REGISTERED":
      return MachineIdentityRegistrationStatus.REGISTERED;
    case 2:
    case "UNREGISTERED":
      return MachineIdentityRegistrationStatus.UNREGISTERED;
    case 3:
    case "PENDING":
      return MachineIdentityRegistrationStatus.PENDING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MachineIdentityRegistrationStatus.UNRECOGNIZED;
  }
}

export function machineIdentityRegistrationStatusToJSON(object: MachineIdentityRegistrationStatus): string {
  switch (object) {
    case MachineIdentityRegistrationStatus.UNSPECIFIED:
      return "REGISTRATION_STATUS_UNSPECIFIED";
    case MachineIdentityRegistrationStatus.REGISTERED:
      return "REGISTERED";
    case MachineIdentityRegistrationStatus.UNREGISTERED:
      return "UNREGISTERED";
    case MachineIdentityRegistrationStatus.PENDING:
      return "PENDING";
    case MachineIdentityRegistrationStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Workflows that the machine can execute */
export interface MachineIdentityAssociatedWorkflow {
  $type?: "pb.v1alpha1.MachineIdentity.AssociatedWorkflow";
  id?: string | undefined;
  name?: string | undefined;
}

/**
 * Websocket connections for this machine
 * a machine can have multiple websocket connections (browser, windows app, etc)
 */
export interface MachineIdentityWebsocketConnection {
  $type?: "pb.v1alpha1.MachineIdentity.WebsocketConnection";
  connectionId?: string | undefined;
  status?: MachineIdentityWebsocketConnectionWebsocketConnectionStatus | undefined;
  connectionType?: MachineIdentityWebsocketConnectionWebsocketConnectionType | undefined;
}

/** Status of the websocket connection */
export enum MachineIdentityWebsocketConnectionWebsocketConnectionStatus {
  UNSPECIFIED = 0,
  CONNECTED = 1,
  DISCONNECTED = 2,
  UNRECOGNIZED = -1,
}

export function machineIdentityWebsocketConnectionWebsocketConnectionStatusFromJSON(
  object: any,
): MachineIdentityWebsocketConnectionWebsocketConnectionStatus {
  switch (object) {
    case 0:
    case "WEBSOCKET_CONNECTION_STATUS_UNSPECIFIED":
      return MachineIdentityWebsocketConnectionWebsocketConnectionStatus.UNSPECIFIED;
    case 1:
    case "WEBSOCKET_CONNECTION_STATUS_CONNECTED":
      return MachineIdentityWebsocketConnectionWebsocketConnectionStatus.CONNECTED;
    case 2:
    case "WEBSOCKET_CONNECTION_STATUS_DISCONNECTED":
      return MachineIdentityWebsocketConnectionWebsocketConnectionStatus.DISCONNECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MachineIdentityWebsocketConnectionWebsocketConnectionStatus.UNRECOGNIZED;
  }
}

export function machineIdentityWebsocketConnectionWebsocketConnectionStatusToJSON(
  object: MachineIdentityWebsocketConnectionWebsocketConnectionStatus,
): string {
  switch (object) {
    case MachineIdentityWebsocketConnectionWebsocketConnectionStatus.UNSPECIFIED:
      return "WEBSOCKET_CONNECTION_STATUS_UNSPECIFIED";
    case MachineIdentityWebsocketConnectionWebsocketConnectionStatus.CONNECTED:
      return "WEBSOCKET_CONNECTION_STATUS_CONNECTED";
    case MachineIdentityWebsocketConnectionWebsocketConnectionStatus.DISCONNECTED:
      return "WEBSOCKET_CONNECTION_STATUS_DISCONNECTED";
    case MachineIdentityWebsocketConnectionWebsocketConnectionStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** web socket connection type (browser, windows app, etc) */
export enum MachineIdentityWebsocketConnectionWebsocketConnectionType {
  UNSPECIFIED = 0,
  BROWSER = 1,
  WINDOWS_APP = 2,
  UNRECOGNIZED = -1,
}

export function machineIdentityWebsocketConnectionWebsocketConnectionTypeFromJSON(
  object: any,
): MachineIdentityWebsocketConnectionWebsocketConnectionType {
  switch (object) {
    case 0:
    case "WEBSOCKET_CONNECTION_TYPE_UNSPECIFIED":
      return MachineIdentityWebsocketConnectionWebsocketConnectionType.UNSPECIFIED;
    case 1:
    case "WEBSOCKET_CONNECTION_TYPE_BROWSER":
      return MachineIdentityWebsocketConnectionWebsocketConnectionType.BROWSER;
    case 2:
    case "WEBSOCKET_CONNECTION_TYPE_WINDOWS_APP":
      return MachineIdentityWebsocketConnectionWebsocketConnectionType.WINDOWS_APP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MachineIdentityWebsocketConnectionWebsocketConnectionType.UNRECOGNIZED;
  }
}

export function machineIdentityWebsocketConnectionWebsocketConnectionTypeToJSON(
  object: MachineIdentityWebsocketConnectionWebsocketConnectionType,
): string {
  switch (object) {
    case MachineIdentityWebsocketConnectionWebsocketConnectionType.UNSPECIFIED:
      return "WEBSOCKET_CONNECTION_TYPE_UNSPECIFIED";
    case MachineIdentityWebsocketConnectionWebsocketConnectionType.BROWSER:
      return "WEBSOCKET_CONNECTION_TYPE_BROWSER";
    case MachineIdentityWebsocketConnectionWebsocketConnectionType.WINDOWS_APP:
      return "WEBSOCKET_CONNECTION_TYPE_WINDOWS_APP";
    case MachineIdentityWebsocketConnectionWebsocketConnectionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Agents for this machine
 * a machine can have multiple agents (browser, windows app, etc)
 */
export interface MachineIdentityAgent {
  $type?: "pb.v1alpha1.MachineIdentity.Agent";
  agentId?: string | undefined;
  status?: MachineIdentityAgentStatus | undefined;
  type?: MachineIdentityAgentType | undefined;
}

/** Status of the agent */
export enum MachineIdentityAgentStatus {
  UNSPECIFIED = 0,
  CONNECTED = 1,
  DISCONNECTED = 2,
  RECONNECTING = 3,
  PENDING = 4,
  UNRECOGNIZED = -1,
}

export function machineIdentityAgentStatusFromJSON(object: any): MachineIdentityAgentStatus {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return MachineIdentityAgentStatus.UNSPECIFIED;
    case 1:
    case "CONNECTED":
      return MachineIdentityAgentStatus.CONNECTED;
    case 2:
    case "DISCONNECTED":
      return MachineIdentityAgentStatus.DISCONNECTED;
    case 3:
    case "RECONNECTING":
      return MachineIdentityAgentStatus.RECONNECTING;
    case 4:
    case "PENDING":
      return MachineIdentityAgentStatus.PENDING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MachineIdentityAgentStatus.UNRECOGNIZED;
  }
}

export function machineIdentityAgentStatusToJSON(object: MachineIdentityAgentStatus): string {
  switch (object) {
    case MachineIdentityAgentStatus.UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case MachineIdentityAgentStatus.CONNECTED:
      return "CONNECTED";
    case MachineIdentityAgentStatus.DISCONNECTED:
      return "DISCONNECTED";
    case MachineIdentityAgentStatus.RECONNECTING:
      return "RECONNECTING";
    case MachineIdentityAgentStatus.PENDING:
      return "PENDING";
    case MachineIdentityAgentStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** agent type (browser, windows app, etc) */
export enum MachineIdentityAgentType {
  UNSPECIFIED = 0,
  BROWSER = 1,
  WINDOWS_APP = 2,
  UNRECOGNIZED = -1,
}

export function machineIdentityAgentTypeFromJSON(object: any): MachineIdentityAgentType {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return MachineIdentityAgentType.UNSPECIFIED;
    case 1:
    case "BROWSER":
      return MachineIdentityAgentType.BROWSER;
    case 2:
    case "WINDOWS_APP":
      return MachineIdentityAgentType.WINDOWS_APP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MachineIdentityAgentType.UNRECOGNIZED;
  }
}

export function machineIdentityAgentTypeToJSON(object: MachineIdentityAgentType): string {
  switch (object) {
    case MachineIdentityAgentType.UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case MachineIdentityAgentType.BROWSER:
      return "BROWSER";
    case MachineIdentityAgentType.WINDOWS_APP:
      return "WINDOWS_APP";
    case MachineIdentityAgentType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GenerateAuthCodeRequest {
  $type?: "pb.v1alpha1.GenerateAuthCodeRequest";
  /**
   * if agent_id is not provided, we will read the machine id from the access token and generate an auth code for the machine
   * If the agent_id is provided, the auth code will be generated for the existing agent.
   */
  agentId?:
    | string
    | undefined;
  /**
   * if machine_id is provided, a new agent will be created for the machine and an auth code will be generated for the new agent
   * web app will call this method with machine_id to generate an auth code for a new agent
   */
  machineId?: string | undefined;
}

export interface GenerateAuthCodeResponse {
  $type?: "pb.v1alpha1.GenerateAuthCodeResponse";
  /** auth code to use for generating access token */
  authCode?:
    | string
    | undefined;
  /** agent_id of the agent that the auth code is generated for */
  agentId?: string | undefined;
}

export interface AuthenticateAgentRequest {
  $type?: "pb.v1alpha1.AuthenticateAgentRequest";
  /** id of the agent to authenticate */
  id?:
    | string
    | undefined;
  /** auth code to use for authenticating the agent */
  authCode?:
    | string
    | undefined;
  /** agent type of the agent that is being authenticated (browser, windows app, etc) */
  agentType?: MachineIdentityAgentType | undefined;
}

export interface AuthenticateAgentResponse {
  $type?: "pb.v1alpha1.AuthenticateAgentResponse";
  /** access token to use for making authenticated requests */
  accessToken?:
    | string
    | undefined;
  /** expiration time of the access token */
  expiration?: Date | undefined;
  agentInfo?: AuthenticateAgentResponseAgentInfo | undefined;
}

/** contains info about the agent that is being authenticated for the agent to store */
export interface AuthenticateAgentResponseAgentInfo {
  $type?: "pb.v1alpha1.AuthenticateAgentResponse.AgentInfo";
  id?: string | undefined;
  machineId?: string | undefined;
  machineName?: string | undefined;
}

function createBaseCreateMachineRequest(): CreateMachineRequest {
  return { $type: "pb.v1alpha1.CreateMachineRequest", machineName: "" };
}

export const CreateMachineRequest = {
  $type: "pb.v1alpha1.CreateMachineRequest" as const,

  encode(message: CreateMachineRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.machineName !== undefined && message.machineName !== "") {
      writer.uint32(10).string(message.machineName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateMachineRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateMachineRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.machineName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateMachineRequest {
    return {
      $type: CreateMachineRequest.$type,
      machineName: isSet(object.machineName) ? globalThis.String(object.machineName) : "",
    };
  },

  toJSON(message: CreateMachineRequest): unknown {
    const obj: any = {};
    if (message.machineName !== undefined && message.machineName !== "") {
      obj.machineName = message.machineName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateMachineRequest>, I>>(base?: I): CreateMachineRequest {
    return CreateMachineRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateMachineRequest>, I>>(object: I): CreateMachineRequest {
    const message = createBaseCreateMachineRequest();
    message.machineName = object.machineName ?? "";
    return message;
  },
};

messageTypeRegistry.set(CreateMachineRequest.$type, CreateMachineRequest);

function createBaseCreateMachineResponse(): CreateMachineResponse {
  return {
    $type: "pb.v1alpha1.CreateMachineResponse",
    machineIdentity: undefined,
    registrationLink: "",
    authCode: "",
    agentId: "",
  };
}

export const CreateMachineResponse = {
  $type: "pb.v1alpha1.CreateMachineResponse" as const,

  encode(message: CreateMachineResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.machineIdentity !== undefined) {
      MachineIdentity.encode(message.machineIdentity, writer.uint32(10).fork()).ldelim();
    }
    if (message.registrationLink !== undefined && message.registrationLink !== "") {
      writer.uint32(18).string(message.registrationLink);
    }
    if (message.authCode !== undefined && message.authCode !== "") {
      writer.uint32(26).string(message.authCode);
    }
    if (message.agentId !== undefined && message.agentId !== "") {
      writer.uint32(34).string(message.agentId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateMachineResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateMachineResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.machineIdentity = MachineIdentity.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.registrationLink = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.authCode = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.agentId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateMachineResponse {
    return {
      $type: CreateMachineResponse.$type,
      machineIdentity: isSet(object.machineIdentity) ? MachineIdentity.fromJSON(object.machineIdentity) : undefined,
      registrationLink: isSet(object.registrationLink) ? globalThis.String(object.registrationLink) : "",
      authCode: isSet(object.authCode) ? globalThis.String(object.authCode) : "",
      agentId: isSet(object.agentId) ? globalThis.String(object.agentId) : "",
    };
  },

  toJSON(message: CreateMachineResponse): unknown {
    const obj: any = {};
    if (message.machineIdentity !== undefined) {
      obj.machineIdentity = MachineIdentity.toJSON(message.machineIdentity);
    }
    if (message.registrationLink !== undefined && message.registrationLink !== "") {
      obj.registrationLink = message.registrationLink;
    }
    if (message.authCode !== undefined && message.authCode !== "") {
      obj.authCode = message.authCode;
    }
    if (message.agentId !== undefined && message.agentId !== "") {
      obj.agentId = message.agentId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateMachineResponse>, I>>(base?: I): CreateMachineResponse {
    return CreateMachineResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateMachineResponse>, I>>(object: I): CreateMachineResponse {
    const message = createBaseCreateMachineResponse();
    message.machineIdentity = (object.machineIdentity !== undefined && object.machineIdentity !== null)
      ? MachineIdentity.fromPartial(object.machineIdentity)
      : undefined;
    message.registrationLink = object.registrationLink ?? "";
    message.authCode = object.authCode ?? "";
    message.agentId = object.agentId ?? "";
    return message;
  },
};

messageTypeRegistry.set(CreateMachineResponse.$type, CreateMachineResponse);

function createBaseDeleteAgentRequest(): DeleteAgentRequest {
  return { $type: "pb.v1alpha1.DeleteAgentRequest", agentId: "" };
}

export const DeleteAgentRequest = {
  $type: "pb.v1alpha1.DeleteAgentRequest" as const,

  encode(message: DeleteAgentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.agentId !== undefined && message.agentId !== "") {
      writer.uint32(10).string(message.agentId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteAgentRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteAgentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.agentId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteAgentRequest {
    return { $type: DeleteAgentRequest.$type, agentId: isSet(object.agentId) ? globalThis.String(object.agentId) : "" };
  },

  toJSON(message: DeleteAgentRequest): unknown {
    const obj: any = {};
    if (message.agentId !== undefined && message.agentId !== "") {
      obj.agentId = message.agentId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteAgentRequest>, I>>(base?: I): DeleteAgentRequest {
    return DeleteAgentRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteAgentRequest>, I>>(object: I): DeleteAgentRequest {
    const message = createBaseDeleteAgentRequest();
    message.agentId = object.agentId ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteAgentRequest.$type, DeleteAgentRequest);

function createBaseRegisterMachineRequest(): RegisterMachineRequest {
  return { $type: "pb.v1alpha1.RegisterMachineRequest", registrationToken: "" };
}

export const RegisterMachineRequest = {
  $type: "pb.v1alpha1.RegisterMachineRequest" as const,

  encode(message: RegisterMachineRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.registrationToken !== undefined && message.registrationToken !== "") {
      writer.uint32(10).string(message.registrationToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterMachineRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterMachineRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.registrationToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterMachineRequest {
    return {
      $type: RegisterMachineRequest.$type,
      registrationToken: isSet(object.registrationToken) ? globalThis.String(object.registrationToken) : "",
    };
  },

  toJSON(message: RegisterMachineRequest): unknown {
    const obj: any = {};
    if (message.registrationToken !== undefined && message.registrationToken !== "") {
      obj.registrationToken = message.registrationToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterMachineRequest>, I>>(base?: I): RegisterMachineRequest {
    return RegisterMachineRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterMachineRequest>, I>>(object: I): RegisterMachineRequest {
    const message = createBaseRegisterMachineRequest();
    message.registrationToken = object.registrationToken ?? "";
    return message;
  },
};

messageTypeRegistry.set(RegisterMachineRequest.$type, RegisterMachineRequest);

function createBaseRegisterMachineResponse(): RegisterMachineResponse {
  return { $type: "pb.v1alpha1.RegisterMachineResponse", token: "" };
}

export const RegisterMachineResponse = {
  $type: "pb.v1alpha1.RegisterMachineResponse" as const,

  encode(message: RegisterMachineResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== undefined && message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterMachineResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterMachineResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterMachineResponse {
    return { $type: RegisterMachineResponse.$type, token: isSet(object.token) ? globalThis.String(object.token) : "" };
  },

  toJSON(message: RegisterMachineResponse): unknown {
    const obj: any = {};
    if (message.token !== undefined && message.token !== "") {
      obj.token = message.token;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterMachineResponse>, I>>(base?: I): RegisterMachineResponse {
    return RegisterMachineResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterMachineResponse>, I>>(object: I): RegisterMachineResponse {
    const message = createBaseRegisterMachineResponse();
    message.token = object.token ?? "";
    return message;
  },
};

messageTypeRegistry.set(RegisterMachineResponse.$type, RegisterMachineResponse);

function createBaseDeregisterMachineRequest(): DeregisterMachineRequest {
  return { $type: "pb.v1alpha1.DeregisterMachineRequest", machineId: "" };
}

export const DeregisterMachineRequest = {
  $type: "pb.v1alpha1.DeregisterMachineRequest" as const,

  encode(message: DeregisterMachineRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.machineId !== undefined && message.machineId !== "") {
      writer.uint32(10).string(message.machineId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeregisterMachineRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeregisterMachineRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.machineId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeregisterMachineRequest {
    return {
      $type: DeregisterMachineRequest.$type,
      machineId: isSet(object.machineId) ? globalThis.String(object.machineId) : "",
    };
  },

  toJSON(message: DeregisterMachineRequest): unknown {
    const obj: any = {};
    if (message.machineId !== undefined && message.machineId !== "") {
      obj.machineId = message.machineId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeregisterMachineRequest>, I>>(base?: I): DeregisterMachineRequest {
    return DeregisterMachineRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeregisterMachineRequest>, I>>(object: I): DeregisterMachineRequest {
    const message = createBaseDeregisterMachineRequest();
    message.machineId = object.machineId ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeregisterMachineRequest.$type, DeregisterMachineRequest);

function createBaseListMachinesRequest(): ListMachinesRequest {
  return { $type: "pb.v1alpha1.ListMachinesRequest", pageNumber: 0, pageSize: 0 };
}

export const ListMachinesRequest = {
  $type: "pb.v1alpha1.ListMachinesRequest" as const,

  encode(message: ListMachinesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(8).int32(message.pageNumber);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMachinesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMachinesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.pageNumber = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMachinesRequest {
    return {
      $type: ListMachinesRequest.$type,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
    };
  },

  toJSON(message: ListMachinesRequest): unknown {
    const obj: any = {};
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMachinesRequest>, I>>(base?: I): ListMachinesRequest {
    return ListMachinesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMachinesRequest>, I>>(object: I): ListMachinesRequest {
    const message = createBaseListMachinesRequest();
    message.pageNumber = object.pageNumber ?? 0;
    message.pageSize = object.pageSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListMachinesRequest.$type, ListMachinesRequest);

function createBaseListMachinesResponse(): ListMachinesResponse {
  return { $type: "pb.v1alpha1.ListMachinesResponse", machines: [], totalMachines: 0 };
}

export const ListMachinesResponse = {
  $type: "pb.v1alpha1.ListMachinesResponse" as const,

  encode(message: ListMachinesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.machines !== undefined && message.machines.length !== 0) {
      for (const v of message.machines) {
        MachineIdentity.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.totalMachines !== undefined && message.totalMachines !== 0) {
      writer.uint32(16).int32(message.totalMachines);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMachinesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMachinesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.machines!.push(MachineIdentity.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalMachines = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMachinesResponse {
    return {
      $type: ListMachinesResponse.$type,
      machines: globalThis.Array.isArray(object?.machines)
        ? object.machines.map((e: any) => MachineIdentity.fromJSON(e))
        : [],
      totalMachines: isSet(object.totalMachines) ? globalThis.Number(object.totalMachines) : 0,
    };
  },

  toJSON(message: ListMachinesResponse): unknown {
    const obj: any = {};
    if (message.machines?.length) {
      obj.machines = message.machines.map((e) => MachineIdentity.toJSON(e));
    }
    if (message.totalMachines !== undefined && message.totalMachines !== 0) {
      obj.totalMachines = Math.round(message.totalMachines);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMachinesResponse>, I>>(base?: I): ListMachinesResponse {
    return ListMachinesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMachinesResponse>, I>>(object: I): ListMachinesResponse {
    const message = createBaseListMachinesResponse();
    message.machines = object.machines?.map((e) => MachineIdentity.fromPartial(e)) || [];
    message.totalMachines = object.totalMachines ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListMachinesResponse.$type, ListMachinesResponse);

function createBaseRegenerateRegistrationLinkRequest(): RegenerateRegistrationLinkRequest {
  return { $type: "pb.v1alpha1.RegenerateRegistrationLinkRequest", machineId: "" };
}

export const RegenerateRegistrationLinkRequest = {
  $type: "pb.v1alpha1.RegenerateRegistrationLinkRequest" as const,

  encode(message: RegenerateRegistrationLinkRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.machineId !== undefined && message.machineId !== "") {
      writer.uint32(10).string(message.machineId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegenerateRegistrationLinkRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegenerateRegistrationLinkRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.machineId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegenerateRegistrationLinkRequest {
    return {
      $type: RegenerateRegistrationLinkRequest.$type,
      machineId: isSet(object.machineId) ? globalThis.String(object.machineId) : "",
    };
  },

  toJSON(message: RegenerateRegistrationLinkRequest): unknown {
    const obj: any = {};
    if (message.machineId !== undefined && message.machineId !== "") {
      obj.machineId = message.machineId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegenerateRegistrationLinkRequest>, I>>(
    base?: I,
  ): RegenerateRegistrationLinkRequest {
    return RegenerateRegistrationLinkRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegenerateRegistrationLinkRequest>, I>>(
    object: I,
  ): RegenerateRegistrationLinkRequest {
    const message = createBaseRegenerateRegistrationLinkRequest();
    message.machineId = object.machineId ?? "";
    return message;
  },
};

messageTypeRegistry.set(RegenerateRegistrationLinkRequest.$type, RegenerateRegistrationLinkRequest);

function createBaseRegenerateRegistrationLinkResponse(): RegenerateRegistrationLinkResponse {
  return { $type: "pb.v1alpha1.RegenerateRegistrationLinkResponse", registrationLink: "" };
}

export const RegenerateRegistrationLinkResponse = {
  $type: "pb.v1alpha1.RegenerateRegistrationLinkResponse" as const,

  encode(message: RegenerateRegistrationLinkResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.registrationLink !== undefined && message.registrationLink !== "") {
      writer.uint32(10).string(message.registrationLink);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegenerateRegistrationLinkResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegenerateRegistrationLinkResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.registrationLink = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegenerateRegistrationLinkResponse {
    return {
      $type: RegenerateRegistrationLinkResponse.$type,
      registrationLink: isSet(object.registrationLink) ? globalThis.String(object.registrationLink) : "",
    };
  },

  toJSON(message: RegenerateRegistrationLinkResponse): unknown {
    const obj: any = {};
    if (message.registrationLink !== undefined && message.registrationLink !== "") {
      obj.registrationLink = message.registrationLink;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegenerateRegistrationLinkResponse>, I>>(
    base?: I,
  ): RegenerateRegistrationLinkResponse {
    return RegenerateRegistrationLinkResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegenerateRegistrationLinkResponse>, I>>(
    object: I,
  ): RegenerateRegistrationLinkResponse {
    const message = createBaseRegenerateRegistrationLinkResponse();
    message.registrationLink = object.registrationLink ?? "";
    return message;
  },
};

messageTypeRegistry.set(RegenerateRegistrationLinkResponse.$type, RegenerateRegistrationLinkResponse);

function createBaseDeleteMachineRequest(): DeleteMachineRequest {
  return { $type: "pb.v1alpha1.DeleteMachineRequest", machineId: "" };
}

export const DeleteMachineRequest = {
  $type: "pb.v1alpha1.DeleteMachineRequest" as const,

  encode(message: DeleteMachineRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.machineId !== undefined && message.machineId !== "") {
      writer.uint32(10).string(message.machineId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteMachineRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteMachineRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.machineId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteMachineRequest {
    return {
      $type: DeleteMachineRequest.$type,
      machineId: isSet(object.machineId) ? globalThis.String(object.machineId) : "",
    };
  },

  toJSON(message: DeleteMachineRequest): unknown {
    const obj: any = {};
    if (message.machineId !== undefined && message.machineId !== "") {
      obj.machineId = message.machineId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteMachineRequest>, I>>(base?: I): DeleteMachineRequest {
    return DeleteMachineRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteMachineRequest>, I>>(object: I): DeleteMachineRequest {
    const message = createBaseDeleteMachineRequest();
    message.machineId = object.machineId ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteMachineRequest.$type, DeleteMachineRequest);

function createBaseGetMachineRequest(): GetMachineRequest {
  return { $type: "pb.v1alpha1.GetMachineRequest", machineId: "" };
}

export const GetMachineRequest = {
  $type: "pb.v1alpha1.GetMachineRequest" as const,

  encode(message: GetMachineRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.machineId !== undefined && message.machineId !== "") {
      writer.uint32(10).string(message.machineId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMachineRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMachineRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.machineId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMachineRequest {
    return {
      $type: GetMachineRequest.$type,
      machineId: isSet(object.machineId) ? globalThis.String(object.machineId) : "",
    };
  },

  toJSON(message: GetMachineRequest): unknown {
    const obj: any = {};
    if (message.machineId !== undefined && message.machineId !== "") {
      obj.machineId = message.machineId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMachineRequest>, I>>(base?: I): GetMachineRequest {
    return GetMachineRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMachineRequest>, I>>(object: I): GetMachineRequest {
    const message = createBaseGetMachineRequest();
    message.machineId = object.machineId ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetMachineRequest.$type, GetMachineRequest);

function createBaseGetMachineResponse(): GetMachineResponse {
  return { $type: "pb.v1alpha1.GetMachineResponse", machineIdentity: undefined };
}

export const GetMachineResponse = {
  $type: "pb.v1alpha1.GetMachineResponse" as const,

  encode(message: GetMachineResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.machineIdentity !== undefined) {
      MachineIdentity.encode(message.machineIdentity, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMachineResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMachineResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.machineIdentity = MachineIdentity.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetMachineResponse {
    return {
      $type: GetMachineResponse.$type,
      machineIdentity: isSet(object.machineIdentity) ? MachineIdentity.fromJSON(object.machineIdentity) : undefined,
    };
  },

  toJSON(message: GetMachineResponse): unknown {
    const obj: any = {};
    if (message.machineIdentity !== undefined) {
      obj.machineIdentity = MachineIdentity.toJSON(message.machineIdentity);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetMachineResponse>, I>>(base?: I): GetMachineResponse {
    return GetMachineResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetMachineResponse>, I>>(object: I): GetMachineResponse {
    const message = createBaseGetMachineResponse();
    message.machineIdentity = (object.machineIdentity !== undefined && object.machineIdentity !== null)
      ? MachineIdentity.fromPartial(object.machineIdentity)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetMachineResponse.$type, GetMachineResponse);

function createBaseMachineIdentity(): MachineIdentity {
  return {
    $type: "pb.v1alpha1.MachineIdentity",
    machineId: "",
    machineName: "",
    userId: "",
    orgId: "",
    registrationStatus: 0,
    associatedWorkflows: [],
    websocketConnections: [],
    agents: [],
  };
}

export const MachineIdentity = {
  $type: "pb.v1alpha1.MachineIdentity" as const,

  encode(message: MachineIdentity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.machineId !== undefined && message.machineId !== "") {
      writer.uint32(10).string(message.machineId);
    }
    if (message.machineName !== undefined && message.machineName !== "") {
      writer.uint32(18).string(message.machineName);
    }
    if (message.userId !== undefined && message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      writer.uint32(34).string(message.orgId);
    }
    if (message.registrationStatus !== undefined && message.registrationStatus !== 0) {
      writer.uint32(40).int32(message.registrationStatus);
    }
    if (message.associatedWorkflows !== undefined && message.associatedWorkflows.length !== 0) {
      for (const v of message.associatedWorkflows) {
        MachineIdentityAssociatedWorkflow.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    if (message.websocketConnections !== undefined && message.websocketConnections.length !== 0) {
      for (const v of message.websocketConnections) {
        MachineIdentityWebsocketConnection.encode(v!, writer.uint32(58).fork()).ldelim();
      }
    }
    if (message.agents !== undefined && message.agents.length !== 0) {
      for (const v of message.agents) {
        MachineIdentityAgent.encode(v!, writer.uint32(66).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MachineIdentity {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMachineIdentity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.machineId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.machineName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.registrationStatus = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.associatedWorkflows!.push(MachineIdentityAssociatedWorkflow.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.websocketConnections!.push(MachineIdentityWebsocketConnection.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.agents!.push(MachineIdentityAgent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MachineIdentity {
    return {
      $type: MachineIdentity.$type,
      machineId: isSet(object.machineId) ? globalThis.String(object.machineId) : "",
      machineName: isSet(object.machineName) ? globalThis.String(object.machineName) : "",
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      orgId: isSet(object.orgId) ? globalThis.String(object.orgId) : "",
      registrationStatus: isSet(object.registrationStatus)
        ? machineIdentityRegistrationStatusFromJSON(object.registrationStatus)
        : 0,
      associatedWorkflows: globalThis.Array.isArray(object?.associatedWorkflows)
        ? object.associatedWorkflows.map((e: any) => MachineIdentityAssociatedWorkflow.fromJSON(e))
        : [],
      websocketConnections: globalThis.Array.isArray(object?.websocketConnections)
        ? object.websocketConnections.map((e: any) => MachineIdentityWebsocketConnection.fromJSON(e))
        : [],
      agents: globalThis.Array.isArray(object?.agents)
        ? object.agents.map((e: any) => MachineIdentityAgent.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MachineIdentity): unknown {
    const obj: any = {};
    if (message.machineId !== undefined && message.machineId !== "") {
      obj.machineId = message.machineId;
    }
    if (message.machineName !== undefined && message.machineName !== "") {
      obj.machineName = message.machineName;
    }
    if (message.userId !== undefined && message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.orgId !== undefined && message.orgId !== "") {
      obj.orgId = message.orgId;
    }
    if (message.registrationStatus !== undefined && message.registrationStatus !== 0) {
      obj.registrationStatus = machineIdentityRegistrationStatusToJSON(message.registrationStatus);
    }
    if (message.associatedWorkflows?.length) {
      obj.associatedWorkflows = message.associatedWorkflows.map((e) => MachineIdentityAssociatedWorkflow.toJSON(e));
    }
    if (message.websocketConnections?.length) {
      obj.websocketConnections = message.websocketConnections.map((e) => MachineIdentityWebsocketConnection.toJSON(e));
    }
    if (message.agents?.length) {
      obj.agents = message.agents.map((e) => MachineIdentityAgent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MachineIdentity>, I>>(base?: I): MachineIdentity {
    return MachineIdentity.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MachineIdentity>, I>>(object: I): MachineIdentity {
    const message = createBaseMachineIdentity();
    message.machineId = object.machineId ?? "";
    message.machineName = object.machineName ?? "";
    message.userId = object.userId ?? "";
    message.orgId = object.orgId ?? "";
    message.registrationStatus = object.registrationStatus ?? 0;
    message.associatedWorkflows =
      object.associatedWorkflows?.map((e) => MachineIdentityAssociatedWorkflow.fromPartial(e)) || [];
    message.websocketConnections =
      object.websocketConnections?.map((e) => MachineIdentityWebsocketConnection.fromPartial(e)) || [];
    message.agents = object.agents?.map((e) => MachineIdentityAgent.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(MachineIdentity.$type, MachineIdentity);

function createBaseMachineIdentityAssociatedWorkflow(): MachineIdentityAssociatedWorkflow {
  return { $type: "pb.v1alpha1.MachineIdentity.AssociatedWorkflow", id: "", name: "" };
}

export const MachineIdentityAssociatedWorkflow = {
  $type: "pb.v1alpha1.MachineIdentity.AssociatedWorkflow" as const,

  encode(message: MachineIdentityAssociatedWorkflow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MachineIdentityAssociatedWorkflow {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMachineIdentityAssociatedWorkflow();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MachineIdentityAssociatedWorkflow {
    return {
      $type: MachineIdentityAssociatedWorkflow.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: MachineIdentityAssociatedWorkflow): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MachineIdentityAssociatedWorkflow>, I>>(
    base?: I,
  ): MachineIdentityAssociatedWorkflow {
    return MachineIdentityAssociatedWorkflow.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MachineIdentityAssociatedWorkflow>, I>>(
    object: I,
  ): MachineIdentityAssociatedWorkflow {
    const message = createBaseMachineIdentityAssociatedWorkflow();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

messageTypeRegistry.set(MachineIdentityAssociatedWorkflow.$type, MachineIdentityAssociatedWorkflow);

function createBaseMachineIdentityWebsocketConnection(): MachineIdentityWebsocketConnection {
  return { $type: "pb.v1alpha1.MachineIdentity.WebsocketConnection", connectionId: "", status: 0, connectionType: 0 };
}

export const MachineIdentityWebsocketConnection = {
  $type: "pb.v1alpha1.MachineIdentity.WebsocketConnection" as const,

  encode(message: MachineIdentityWebsocketConnection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connectionId !== undefined && message.connectionId !== "") {
      writer.uint32(10).string(message.connectionId);
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.connectionType !== undefined && message.connectionType !== 0) {
      writer.uint32(24).int32(message.connectionType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MachineIdentityWebsocketConnection {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMachineIdentityWebsocketConnection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connectionId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.connectionType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MachineIdentityWebsocketConnection {
    return {
      $type: MachineIdentityWebsocketConnection.$type,
      connectionId: isSet(object.connectionId) ? globalThis.String(object.connectionId) : "",
      status: isSet(object.status)
        ? machineIdentityWebsocketConnectionWebsocketConnectionStatusFromJSON(object.status)
        : 0,
      connectionType: isSet(object.connectionType)
        ? machineIdentityWebsocketConnectionWebsocketConnectionTypeFromJSON(object.connectionType)
        : 0,
    };
  },

  toJSON(message: MachineIdentityWebsocketConnection): unknown {
    const obj: any = {};
    if (message.connectionId !== undefined && message.connectionId !== "") {
      obj.connectionId = message.connectionId;
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = machineIdentityWebsocketConnectionWebsocketConnectionStatusToJSON(message.status);
    }
    if (message.connectionType !== undefined && message.connectionType !== 0) {
      obj.connectionType = machineIdentityWebsocketConnectionWebsocketConnectionTypeToJSON(message.connectionType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MachineIdentityWebsocketConnection>, I>>(
    base?: I,
  ): MachineIdentityWebsocketConnection {
    return MachineIdentityWebsocketConnection.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MachineIdentityWebsocketConnection>, I>>(
    object: I,
  ): MachineIdentityWebsocketConnection {
    const message = createBaseMachineIdentityWebsocketConnection();
    message.connectionId = object.connectionId ?? "";
    message.status = object.status ?? 0;
    message.connectionType = object.connectionType ?? 0;
    return message;
  },
};

messageTypeRegistry.set(MachineIdentityWebsocketConnection.$type, MachineIdentityWebsocketConnection);

function createBaseMachineIdentityAgent(): MachineIdentityAgent {
  return { $type: "pb.v1alpha1.MachineIdentity.Agent", agentId: "", status: 0, type: 0 };
}

export const MachineIdentityAgent = {
  $type: "pb.v1alpha1.MachineIdentity.Agent" as const,

  encode(message: MachineIdentityAgent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.agentId !== undefined && message.agentId !== "") {
      writer.uint32(10).string(message.agentId);
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MachineIdentityAgent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMachineIdentityAgent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.agentId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MachineIdentityAgent {
    return {
      $type: MachineIdentityAgent.$type,
      agentId: isSet(object.agentId) ? globalThis.String(object.agentId) : "",
      status: isSet(object.status) ? machineIdentityAgentStatusFromJSON(object.status) : 0,
      type: isSet(object.type) ? machineIdentityAgentTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: MachineIdentityAgent): unknown {
    const obj: any = {};
    if (message.agentId !== undefined && message.agentId !== "") {
      obj.agentId = message.agentId;
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = machineIdentityAgentStatusToJSON(message.status);
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = machineIdentityAgentTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MachineIdentityAgent>, I>>(base?: I): MachineIdentityAgent {
    return MachineIdentityAgent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MachineIdentityAgent>, I>>(object: I): MachineIdentityAgent {
    const message = createBaseMachineIdentityAgent();
    message.agentId = object.agentId ?? "";
    message.status = object.status ?? 0;
    message.type = object.type ?? 0;
    return message;
  },
};

messageTypeRegistry.set(MachineIdentityAgent.$type, MachineIdentityAgent);

function createBaseGenerateAuthCodeRequest(): GenerateAuthCodeRequest {
  return { $type: "pb.v1alpha1.GenerateAuthCodeRequest", agentId: "", machineId: "" };
}

export const GenerateAuthCodeRequest = {
  $type: "pb.v1alpha1.GenerateAuthCodeRequest" as const,

  encode(message: GenerateAuthCodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.agentId !== undefined && message.agentId !== "") {
      writer.uint32(10).string(message.agentId);
    }
    if (message.machineId !== undefined && message.machineId !== "") {
      writer.uint32(18).string(message.machineId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateAuthCodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateAuthCodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.agentId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.machineId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateAuthCodeRequest {
    return {
      $type: GenerateAuthCodeRequest.$type,
      agentId: isSet(object.agentId) ? globalThis.String(object.agentId) : "",
      machineId: isSet(object.machineId) ? globalThis.String(object.machineId) : "",
    };
  },

  toJSON(message: GenerateAuthCodeRequest): unknown {
    const obj: any = {};
    if (message.agentId !== undefined && message.agentId !== "") {
      obj.agentId = message.agentId;
    }
    if (message.machineId !== undefined && message.machineId !== "") {
      obj.machineId = message.machineId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateAuthCodeRequest>, I>>(base?: I): GenerateAuthCodeRequest {
    return GenerateAuthCodeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateAuthCodeRequest>, I>>(object: I): GenerateAuthCodeRequest {
    const message = createBaseGenerateAuthCodeRequest();
    message.agentId = object.agentId ?? "";
    message.machineId = object.machineId ?? "";
    return message;
  },
};

messageTypeRegistry.set(GenerateAuthCodeRequest.$type, GenerateAuthCodeRequest);

function createBaseGenerateAuthCodeResponse(): GenerateAuthCodeResponse {
  return { $type: "pb.v1alpha1.GenerateAuthCodeResponse", authCode: "", agentId: "" };
}

export const GenerateAuthCodeResponse = {
  $type: "pb.v1alpha1.GenerateAuthCodeResponse" as const,

  encode(message: GenerateAuthCodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authCode !== undefined && message.authCode !== "") {
      writer.uint32(10).string(message.authCode);
    }
    if (message.agentId !== undefined && message.agentId !== "") {
      writer.uint32(18).string(message.agentId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateAuthCodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateAuthCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authCode = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.agentId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateAuthCodeResponse {
    return {
      $type: GenerateAuthCodeResponse.$type,
      authCode: isSet(object.authCode) ? globalThis.String(object.authCode) : "",
      agentId: isSet(object.agentId) ? globalThis.String(object.agentId) : "",
    };
  },

  toJSON(message: GenerateAuthCodeResponse): unknown {
    const obj: any = {};
    if (message.authCode !== undefined && message.authCode !== "") {
      obj.authCode = message.authCode;
    }
    if (message.agentId !== undefined && message.agentId !== "") {
      obj.agentId = message.agentId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenerateAuthCodeResponse>, I>>(base?: I): GenerateAuthCodeResponse {
    return GenerateAuthCodeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenerateAuthCodeResponse>, I>>(object: I): GenerateAuthCodeResponse {
    const message = createBaseGenerateAuthCodeResponse();
    message.authCode = object.authCode ?? "";
    message.agentId = object.agentId ?? "";
    return message;
  },
};

messageTypeRegistry.set(GenerateAuthCodeResponse.$type, GenerateAuthCodeResponse);

function createBaseAuthenticateAgentRequest(): AuthenticateAgentRequest {
  return { $type: "pb.v1alpha1.AuthenticateAgentRequest", id: "", authCode: "", agentType: 0 };
}

export const AuthenticateAgentRequest = {
  $type: "pb.v1alpha1.AuthenticateAgentRequest" as const,

  encode(message: AuthenticateAgentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.authCode !== undefined && message.authCode !== "") {
      writer.uint32(18).string(message.authCode);
    }
    if (message.agentType !== undefined && message.agentType !== 0) {
      writer.uint32(24).int32(message.agentType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateAgentRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateAgentRequest();
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

          message.authCode = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.agentType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateAgentRequest {
    return {
      $type: AuthenticateAgentRequest.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      authCode: isSet(object.authCode) ? globalThis.String(object.authCode) : "",
      agentType: isSet(object.agentType) ? machineIdentityAgentTypeFromJSON(object.agentType) : 0,
    };
  },

  toJSON(message: AuthenticateAgentRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.authCode !== undefined && message.authCode !== "") {
      obj.authCode = message.authCode;
    }
    if (message.agentType !== undefined && message.agentType !== 0) {
      obj.agentType = machineIdentityAgentTypeToJSON(message.agentType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateAgentRequest>, I>>(base?: I): AuthenticateAgentRequest {
    return AuthenticateAgentRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateAgentRequest>, I>>(object: I): AuthenticateAgentRequest {
    const message = createBaseAuthenticateAgentRequest();
    message.id = object.id ?? "";
    message.authCode = object.authCode ?? "";
    message.agentType = object.agentType ?? 0;
    return message;
  },
};

messageTypeRegistry.set(AuthenticateAgentRequest.$type, AuthenticateAgentRequest);

function createBaseAuthenticateAgentResponse(): AuthenticateAgentResponse {
  return {
    $type: "pb.v1alpha1.AuthenticateAgentResponse",
    accessToken: "",
    expiration: undefined,
    agentInfo: undefined,
  };
}

export const AuthenticateAgentResponse = {
  $type: "pb.v1alpha1.AuthenticateAgentResponse" as const,

  encode(message: AuthenticateAgentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== undefined && message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(18).fork()).ldelim();
    }
    if (message.agentInfo !== undefined) {
      AuthenticateAgentResponseAgentInfo.encode(message.agentInfo, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateAgentResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateAgentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.agentInfo = AuthenticateAgentResponseAgentInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateAgentResponse {
    return {
      $type: AuthenticateAgentResponse.$type,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      expiration: isSet(object.expiration) ? fromJsonTimestamp(object.expiration) : undefined,
      agentInfo: isSet(object.agentInfo) ? AuthenticateAgentResponseAgentInfo.fromJSON(object.agentInfo) : undefined,
    };
  },

  toJSON(message: AuthenticateAgentResponse): unknown {
    const obj: any = {};
    if (message.accessToken !== undefined && message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.expiration !== undefined) {
      obj.expiration = message.expiration.toISOString();
    }
    if (message.agentInfo !== undefined) {
      obj.agentInfo = AuthenticateAgentResponseAgentInfo.toJSON(message.agentInfo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateAgentResponse>, I>>(base?: I): AuthenticateAgentResponse {
    return AuthenticateAgentResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateAgentResponse>, I>>(object: I): AuthenticateAgentResponse {
    const message = createBaseAuthenticateAgentResponse();
    message.accessToken = object.accessToken ?? "";
    message.expiration = object.expiration ?? undefined;
    message.agentInfo = (object.agentInfo !== undefined && object.agentInfo !== null)
      ? AuthenticateAgentResponseAgentInfo.fromPartial(object.agentInfo)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(AuthenticateAgentResponse.$type, AuthenticateAgentResponse);

function createBaseAuthenticateAgentResponseAgentInfo(): AuthenticateAgentResponseAgentInfo {
  return { $type: "pb.v1alpha1.AuthenticateAgentResponse.AgentInfo", id: "", machineId: "", machineName: "" };
}

export const AuthenticateAgentResponseAgentInfo = {
  $type: "pb.v1alpha1.AuthenticateAgentResponse.AgentInfo" as const,

  encode(message: AuthenticateAgentResponseAgentInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.machineId !== undefined && message.machineId !== "") {
      writer.uint32(18).string(message.machineId);
    }
    if (message.machineName !== undefined && message.machineName !== "") {
      writer.uint32(26).string(message.machineName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateAgentResponseAgentInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateAgentResponseAgentInfo();
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

          message.machineId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.machineName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateAgentResponseAgentInfo {
    return {
      $type: AuthenticateAgentResponseAgentInfo.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      machineId: isSet(object.machineId) ? globalThis.String(object.machineId) : "",
      machineName: isSet(object.machineName) ? globalThis.String(object.machineName) : "",
    };
  },

  toJSON(message: AuthenticateAgentResponseAgentInfo): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.machineId !== undefined && message.machineId !== "") {
      obj.machineId = message.machineId;
    }
    if (message.machineName !== undefined && message.machineName !== "") {
      obj.machineName = message.machineName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateAgentResponseAgentInfo>, I>>(
    base?: I,
  ): AuthenticateAgentResponseAgentInfo {
    return AuthenticateAgentResponseAgentInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateAgentResponseAgentInfo>, I>>(
    object: I,
  ): AuthenticateAgentResponseAgentInfo {
    const message = createBaseAuthenticateAgentResponseAgentInfo();
    message.id = object.id ?? "";
    message.machineId = object.machineId ?? "";
    message.machineName = object.machineName ?? "";
    return message;
  },
};

messageTypeRegistry.set(AuthenticateAgentResponseAgentInfo.$type, AuthenticateAgentResponseAgentInfo);

export interface MachineIdentityService {
  /**
   * WEB APP
   * Create a new machine identity and generates an auth code for the first agent in the machine
   */
  CreateMachine(request: DeepPartial<CreateMachineRequest>, metadata?: grpc.Metadata): Promise<CreateMachineResponse>;
  /** Disconnect an agent from the server and delete the agent from the machine it belongs to */
  DeleteAgent(request: DeepPartial<DeleteAgentRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  /** Get a machine from the server */
  GetMachine(request: DeepPartial<GetMachineRequest>, metadata?: grpc.Metadata): Promise<GetMachineResponse>;
  /** List all machines */
  ListMachines(request: DeepPartial<ListMachinesRequest>, metadata?: grpc.Metadata): Promise<ListMachinesResponse>;
  /** Delete a machine from db and disconnects all associated agents and deletes them */
  DeleteMachine(request: DeepPartial<DeleteMachineRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  /** TODO: Deprecate Register, RegenerateRegistrationLink, and Deregister */
  RegisterMachine(
    request: DeepPartial<RegisterMachineRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RegisterMachineResponse>;
  DeregisterMachine(request: DeepPartial<DeregisterMachineRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  RegenerateRegistrationLink(
    request: DeepPartial<RegenerateRegistrationLinkRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RegenerateRegistrationLinkResponse>;
  /**
   * AGENTS
   * This can be used to either generate an auth code for an existing agent or for a new agent
   * This can either be an authenticated request by an existing agent to start the process to create a new agent on the same machine or an authenticated request from the web app to re authenticate an existing agent
   */
  GenerateAuthCode(
    request: DeepPartial<GenerateAuthCodeRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GenerateAuthCodeResponse>;
  /**
   * Authenticates an agent and returns an access token for the agent
   * This will be called by either a new agent to authenticate with the server for the first time or an existing agent to re authenticate with the server
   */
  AuthenticateAgent(
    request: DeepPartial<AuthenticateAgentRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AuthenticateAgentResponse>;
}

export class MachineIdentityServiceClientImpl implements MachineIdentityService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateMachine = this.CreateMachine.bind(this);
    this.DeleteAgent = this.DeleteAgent.bind(this);
    this.GetMachine = this.GetMachine.bind(this);
    this.ListMachines = this.ListMachines.bind(this);
    this.DeleteMachine = this.DeleteMachine.bind(this);
    this.RegisterMachine = this.RegisterMachine.bind(this);
    this.DeregisterMachine = this.DeregisterMachine.bind(this);
    this.RegenerateRegistrationLink = this.RegenerateRegistrationLink.bind(this);
    this.GenerateAuthCode = this.GenerateAuthCode.bind(this);
    this.AuthenticateAgent = this.AuthenticateAgent.bind(this);
  }

  CreateMachine(request: DeepPartial<CreateMachineRequest>, metadata?: grpc.Metadata): Promise<CreateMachineResponse> {
    return this.rpc.unary(MachineIdentityServiceCreateMachineDesc, CreateMachineRequest.fromPartial(request), metadata);
  }

  DeleteAgent(request: DeepPartial<DeleteAgentRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(MachineIdentityServiceDeleteAgentDesc, DeleteAgentRequest.fromPartial(request), metadata);
  }

  GetMachine(request: DeepPartial<GetMachineRequest>, metadata?: grpc.Metadata): Promise<GetMachineResponse> {
    return this.rpc.unary(MachineIdentityServiceGetMachineDesc, GetMachineRequest.fromPartial(request), metadata);
  }

  ListMachines(request: DeepPartial<ListMachinesRequest>, metadata?: grpc.Metadata): Promise<ListMachinesResponse> {
    return this.rpc.unary(MachineIdentityServiceListMachinesDesc, ListMachinesRequest.fromPartial(request), metadata);
  }

  DeleteMachine(request: DeepPartial<DeleteMachineRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(MachineIdentityServiceDeleteMachineDesc, DeleteMachineRequest.fromPartial(request), metadata);
  }

  RegisterMachine(
    request: DeepPartial<RegisterMachineRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RegisterMachineResponse> {
    return this.rpc.unary(
      MachineIdentityServiceRegisterMachineDesc,
      RegisterMachineRequest.fromPartial(request),
      metadata,
    );
  }

  DeregisterMachine(request: DeepPartial<DeregisterMachineRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(
      MachineIdentityServiceDeregisterMachineDesc,
      DeregisterMachineRequest.fromPartial(request),
      metadata,
    );
  }

  RegenerateRegistrationLink(
    request: DeepPartial<RegenerateRegistrationLinkRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RegenerateRegistrationLinkResponse> {
    return this.rpc.unary(
      MachineIdentityServiceRegenerateRegistrationLinkDesc,
      RegenerateRegistrationLinkRequest.fromPartial(request),
      metadata,
    );
  }

  GenerateAuthCode(
    request: DeepPartial<GenerateAuthCodeRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GenerateAuthCodeResponse> {
    return this.rpc.unary(
      MachineIdentityServiceGenerateAuthCodeDesc,
      GenerateAuthCodeRequest.fromPartial(request),
      metadata,
    );
  }

  AuthenticateAgent(
    request: DeepPartial<AuthenticateAgentRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AuthenticateAgentResponse> {
    return this.rpc.unary(
      MachineIdentityServiceAuthenticateAgentDesc,
      AuthenticateAgentRequest.fromPartial(request),
      metadata,
    );
  }
}

export const MachineIdentityServiceDesc = { serviceName: "pb.v1alpha1.MachineIdentityService" };

export const MachineIdentityServiceCreateMachineDesc: UnaryMethodDefinitionish = {
  methodName: "CreateMachine",
  service: MachineIdentityServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateMachineRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateMachineResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MachineIdentityServiceDeleteAgentDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteAgent",
  service: MachineIdentityServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteAgentRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MachineIdentityServiceGetMachineDesc: UnaryMethodDefinitionish = {
  methodName: "GetMachine",
  service: MachineIdentityServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetMachineRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetMachineResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MachineIdentityServiceListMachinesDesc: UnaryMethodDefinitionish = {
  methodName: "ListMachines",
  service: MachineIdentityServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListMachinesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListMachinesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MachineIdentityServiceDeleteMachineDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteMachine",
  service: MachineIdentityServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteMachineRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MachineIdentityServiceRegisterMachineDesc: UnaryMethodDefinitionish = {
  methodName: "RegisterMachine",
  service: MachineIdentityServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RegisterMachineRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RegisterMachineResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MachineIdentityServiceDeregisterMachineDesc: UnaryMethodDefinitionish = {
  methodName: "DeregisterMachine",
  service: MachineIdentityServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeregisterMachineRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MachineIdentityServiceRegenerateRegistrationLinkDesc: UnaryMethodDefinitionish = {
  methodName: "RegenerateRegistrationLink",
  service: MachineIdentityServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RegenerateRegistrationLinkRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RegenerateRegistrationLinkResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MachineIdentityServiceGenerateAuthCodeDesc: UnaryMethodDefinitionish = {
  methodName: "GenerateAuthCode",
  service: MachineIdentityServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GenerateAuthCodeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GenerateAuthCodeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MachineIdentityServiceAuthenticateAgentDesc: UnaryMethodDefinitionish = {
  methodName: "AuthenticateAgent",
  service: MachineIdentityServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AuthenticateAgentRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AuthenticateAgentResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata ?? {},
        ...(this.options.transport !== undefined ? { transport: this.options.transport } : {}),
        debug: this.options.debug ?? false,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
