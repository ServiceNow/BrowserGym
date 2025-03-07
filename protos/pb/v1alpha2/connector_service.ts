/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { SortField } from "../../common/data_query_params";
import { Empty } from "../../google/protobuf/empty";
import { FieldMask } from "../../google/protobuf/field_mask";
import { messageTypeRegistry } from "../../typeRegistry";
import { Connector } from "./connector";

export const protobufPackage = "pb.v1alpha2";

export interface CreateConnectorRequest {
  $type?: "pb.v1alpha2.CreateConnectorRequest";
  connector?: Connector | undefined;
}

export interface ListConnectorRequest {
  $type?: "pb.v1alpha2.ListConnectorRequest";
  /**
   * Default is 10 (when page_size is missing or set to 0). Max value is 20.
   * Ordered by display name.
   */
  pageSize?:
    | number
    | undefined;
  /** @deprecated */
  filter?:
    | string
    | undefined;
  /**
   * Use this to continue the previous list requests.
   * Its value should be same with previous response's next_page_token.
   * Please reuse the same filter and page size.
   */
  pageToken?:
    | string
    | undefined;
  /**
   * Use this to send only relevant data in response
   * - If Field Mask is not send or is sent with empty paths then the result will contain
   *    the complete object
   * - Valid values for field mask are: display_name, description, source_workflow_resource_name, destination_workflow_resource_name and group_condition.
   */
  fieldMask?:
    | string[]
    | undefined;
  /** Organization resource name. Format: organizations/{ID} */
  orgResourceName?: string | undefined;
  pageNumber?: number | undefined;
  listFilter?:
    | ListConnectorRequestFilter
    | undefined;
  /**
   * The order of fields will effect the sorting order.
   * Supported fields: display_name, creator_email, last_modified_time
   */
  sort?: SortField[] | undefined;
}

export interface ListConnectorRequestFilter {
  $type?: "pb.v1alpha2.ListConnectorRequestFilter";
  /** Format: workflows/Id */
  workflowResourceNames?:
    | string[]
    | undefined;
  /** Format: workflows/Id */
  sourceWorkflowResourceNames?:
    | string[]
    | undefined;
  /** Format: workflows/Id */
  destinationWorkflowResourceNames?: string[] | undefined;
  creatorUsername?: string[] | undefined;
  namePrefix?:
    | string
    | undefined;
  /**
   * To return only connectors created before this time
   * Needs to be UNIX_TIME_SEC
   */
  createTimeLt?:
    | number
    | undefined;
  /**
   * To return only connectors created after this time
   * Needs to be UNIX_TIME_SEC
   */
  createTimeGt?: number | undefined;
  lastUpdateTimeLt?: number | undefined;
  lastUpdateTimeGt?: number | undefined;
}

export interface ListConnectorResponse {
  $type?: "pb.v1alpha2.ListConnectorResponse";
  connectors?:
    | Connector[]
    | undefined;
  /** If the value is "", it means no further results for the request. */
  nextPageToken?:
    | string
    | undefined;
  /**
   * Total available suggestion size.
   * Note it is NOT the remaining available suggestion size after the current response.
   */
  totalSize?: number | undefined;
}

export interface GetConnectorRequest {
  $type?: "pb.v1alpha2.GetConnectorRequest";
  /** The resource name of the connector to be retrived, format connectors/{ID} */
  name?: string | undefined;
}

export interface DeleteConnectorRequest {
  $type?: "pb.v1alpha2.DeleteConnectorRequest";
  /** The resource name of the connector to be deleted, format connectors/{ID} */
  name?: string | undefined;
  deletedReason?: string | undefined;
}

export interface UpdateConnectorRequest {
  $type?: "pb.v1alpha2.UpdateConnectorRequest";
  connector?:
    | Connector
    | undefined;
  /**
   * Support display_name, description, source_workflow_resource_name, destination_workflow_resource_name,
   * group_condition, assignment_config
   * If field_mask is empty, all updatable fields will be updated based on
   * the provided connector.
   * Note: If source_workflow_resource_name is present, group_condition must be present
   */
  fieldMask?: string[] | undefined;
}

function createBaseCreateConnectorRequest(): CreateConnectorRequest {
  return { $type: "pb.v1alpha2.CreateConnectorRequest", connector: undefined };
}

export const CreateConnectorRequest = {
  $type: "pb.v1alpha2.CreateConnectorRequest" as const,

  encode(message: CreateConnectorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connector !== undefined) {
      Connector.encode(message.connector, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateConnectorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateConnectorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connector = Connector.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateConnectorRequest {
    return {
      $type: CreateConnectorRequest.$type,
      connector: isSet(object.connector) ? Connector.fromJSON(object.connector) : undefined,
    };
  },

  toJSON(message: CreateConnectorRequest): unknown {
    const obj: any = {};
    if (message.connector !== undefined) {
      obj.connector = Connector.toJSON(message.connector);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateConnectorRequest>, I>>(base?: I): CreateConnectorRequest {
    return CreateConnectorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateConnectorRequest>, I>>(object: I): CreateConnectorRequest {
    const message = createBaseCreateConnectorRequest();
    message.connector = (object.connector !== undefined && object.connector !== null)
      ? Connector.fromPartial(object.connector)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateConnectorRequest.$type, CreateConnectorRequest);

function createBaseListConnectorRequest(): ListConnectorRequest {
  return {
    $type: "pb.v1alpha2.ListConnectorRequest",
    pageSize: 0,
    filter: "",
    pageToken: "",
    fieldMask: undefined,
    orgResourceName: "",
    pageNumber: 0,
    listFilter: undefined,
    sort: [],
  };
}

export const ListConnectorRequest = {
  $type: "pb.v1alpha2.ListConnectorRequest" as const,

  encode(message: ListConnectorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(8).int32(message.pageSize);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(18).string(message.filter);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      writer.uint32(26).string(message.pageToken);
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(34).fork()).ldelim();
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      writer.uint32(42).string(message.orgResourceName);
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(48).int32(message.pageNumber);
    }
    if (message.listFilter !== undefined) {
      ListConnectorRequestFilter.encode(message.listFilter, writer.uint32(58).fork()).ldelim();
    }
    if (message.sort !== undefined && message.sort.length !== 0) {
      for (const v of message.sort) {
        SortField.encode(v!, writer.uint32(66).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListConnectorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListConnectorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.filter = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pageToken = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.orgResourceName = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.pageNumber = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.listFilter = ListConnectorRequestFilter.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.sort!.push(SortField.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListConnectorRequest {
    return {
      $type: ListConnectorRequest.$type,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
      orgResourceName: isSet(object.orgResourceName) ? globalThis.String(object.orgResourceName) : "",
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      listFilter: isSet(object.listFilter) ? ListConnectorRequestFilter.fromJSON(object.listFilter) : undefined,
      sort: globalThis.Array.isArray(object?.sort) ? object.sort.map((e: any) => SortField.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListConnectorRequest): unknown {
    const obj: any = {};
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      obj.pageToken = message.pageToken;
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    if (message.orgResourceName !== undefined && message.orgResourceName !== "") {
      obj.orgResourceName = message.orgResourceName;
    }
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.listFilter !== undefined) {
      obj.listFilter = ListConnectorRequestFilter.toJSON(message.listFilter);
    }
    if (message.sort?.length) {
      obj.sort = message.sort.map((e) => SortField.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListConnectorRequest>, I>>(base?: I): ListConnectorRequest {
    return ListConnectorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListConnectorRequest>, I>>(object: I): ListConnectorRequest {
    const message = createBaseListConnectorRequest();
    message.pageSize = object.pageSize ?? 0;
    message.filter = object.filter ?? "";
    message.pageToken = object.pageToken ?? "";
    message.fieldMask = object.fieldMask ?? undefined;
    message.orgResourceName = object.orgResourceName ?? "";
    message.pageNumber = object.pageNumber ?? 0;
    message.listFilter = (object.listFilter !== undefined && object.listFilter !== null)
      ? ListConnectorRequestFilter.fromPartial(object.listFilter)
      : undefined;
    message.sort = object.sort?.map((e) => SortField.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ListConnectorRequest.$type, ListConnectorRequest);

function createBaseListConnectorRequestFilter(): ListConnectorRequestFilter {
  return {
    $type: "pb.v1alpha2.ListConnectorRequestFilter",
    workflowResourceNames: [],
    sourceWorkflowResourceNames: [],
    destinationWorkflowResourceNames: [],
    creatorUsername: [],
    namePrefix: "",
    createTimeLt: 0,
    createTimeGt: 0,
    lastUpdateTimeLt: 0,
    lastUpdateTimeGt: 0,
  };
}

export const ListConnectorRequestFilter = {
  $type: "pb.v1alpha2.ListConnectorRequestFilter" as const,

  encode(message: ListConnectorRequestFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workflowResourceNames !== undefined && message.workflowResourceNames.length !== 0) {
      for (const v of message.workflowResourceNames) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.sourceWorkflowResourceNames !== undefined && message.sourceWorkflowResourceNames.length !== 0) {
      for (const v of message.sourceWorkflowResourceNames) {
        writer.uint32(18).string(v!);
      }
    }
    if (
      message.destinationWorkflowResourceNames !== undefined && message.destinationWorkflowResourceNames.length !== 0
    ) {
      for (const v of message.destinationWorkflowResourceNames) {
        writer.uint32(26).string(v!);
      }
    }
    if (message.creatorUsername !== undefined && message.creatorUsername.length !== 0) {
      for (const v of message.creatorUsername) {
        writer.uint32(34).string(v!);
      }
    }
    if (message.namePrefix !== undefined && message.namePrefix !== "") {
      writer.uint32(42).string(message.namePrefix);
    }
    if (message.createTimeLt !== undefined && message.createTimeLt !== 0) {
      writer.uint32(48).int64(message.createTimeLt);
    }
    if (message.createTimeGt !== undefined && message.createTimeGt !== 0) {
      writer.uint32(56).int64(message.createTimeGt);
    }
    if (message.lastUpdateTimeLt !== undefined && message.lastUpdateTimeLt !== 0) {
      writer.uint32(64).int64(message.lastUpdateTimeLt);
    }
    if (message.lastUpdateTimeGt !== undefined && message.lastUpdateTimeGt !== 0) {
      writer.uint32(72).int64(message.lastUpdateTimeGt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListConnectorRequestFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListConnectorRequestFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workflowResourceNames!.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sourceWorkflowResourceNames!.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.destinationWorkflowResourceNames!.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.creatorUsername!.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.namePrefix = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.createTimeLt = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.createTimeGt = longToNumber(reader.int64() as Long);
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.lastUpdateTimeLt = longToNumber(reader.int64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.lastUpdateTimeGt = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListConnectorRequestFilter {
    return {
      $type: ListConnectorRequestFilter.$type,
      workflowResourceNames: globalThis.Array.isArray(object?.workflowResourceNames)
        ? object.workflowResourceNames.map((e: any) => globalThis.String(e))
        : [],
      sourceWorkflowResourceNames: globalThis.Array.isArray(object?.sourceWorkflowResourceNames)
        ? object.sourceWorkflowResourceNames.map((e: any) => globalThis.String(e))
        : [],
      destinationWorkflowResourceNames: globalThis.Array.isArray(object?.destinationWorkflowResourceNames)
        ? object.destinationWorkflowResourceNames.map((e: any) => globalThis.String(e))
        : [],
      creatorUsername: globalThis.Array.isArray(object?.creatorUsername)
        ? object.creatorUsername.map((e: any) => globalThis.String(e))
        : [],
      namePrefix: isSet(object.namePrefix) ? globalThis.String(object.namePrefix) : "",
      createTimeLt: isSet(object.createTimeLt) ? globalThis.Number(object.createTimeLt) : 0,
      createTimeGt: isSet(object.createTimeGt) ? globalThis.Number(object.createTimeGt) : 0,
      lastUpdateTimeLt: isSet(object.lastUpdateTimeLt) ? globalThis.Number(object.lastUpdateTimeLt) : 0,
      lastUpdateTimeGt: isSet(object.lastUpdateTimeGt) ? globalThis.Number(object.lastUpdateTimeGt) : 0,
    };
  },

  toJSON(message: ListConnectorRequestFilter): unknown {
    const obj: any = {};
    if (message.workflowResourceNames?.length) {
      obj.workflowResourceNames = message.workflowResourceNames;
    }
    if (message.sourceWorkflowResourceNames?.length) {
      obj.sourceWorkflowResourceNames = message.sourceWorkflowResourceNames;
    }
    if (message.destinationWorkflowResourceNames?.length) {
      obj.destinationWorkflowResourceNames = message.destinationWorkflowResourceNames;
    }
    if (message.creatorUsername?.length) {
      obj.creatorUsername = message.creatorUsername;
    }
    if (message.namePrefix !== undefined && message.namePrefix !== "") {
      obj.namePrefix = message.namePrefix;
    }
    if (message.createTimeLt !== undefined && message.createTimeLt !== 0) {
      obj.createTimeLt = Math.round(message.createTimeLt);
    }
    if (message.createTimeGt !== undefined && message.createTimeGt !== 0) {
      obj.createTimeGt = Math.round(message.createTimeGt);
    }
    if (message.lastUpdateTimeLt !== undefined && message.lastUpdateTimeLt !== 0) {
      obj.lastUpdateTimeLt = Math.round(message.lastUpdateTimeLt);
    }
    if (message.lastUpdateTimeGt !== undefined && message.lastUpdateTimeGt !== 0) {
      obj.lastUpdateTimeGt = Math.round(message.lastUpdateTimeGt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListConnectorRequestFilter>, I>>(base?: I): ListConnectorRequestFilter {
    return ListConnectorRequestFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListConnectorRequestFilter>, I>>(object: I): ListConnectorRequestFilter {
    const message = createBaseListConnectorRequestFilter();
    message.workflowResourceNames = object.workflowResourceNames?.map((e) => e) || [];
    message.sourceWorkflowResourceNames = object.sourceWorkflowResourceNames?.map((e) => e) || [];
    message.destinationWorkflowResourceNames = object.destinationWorkflowResourceNames?.map((e) => e) || [];
    message.creatorUsername = object.creatorUsername?.map((e) => e) || [];
    message.namePrefix = object.namePrefix ?? "";
    message.createTimeLt = object.createTimeLt ?? 0;
    message.createTimeGt = object.createTimeGt ?? 0;
    message.lastUpdateTimeLt = object.lastUpdateTimeLt ?? 0;
    message.lastUpdateTimeGt = object.lastUpdateTimeGt ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListConnectorRequestFilter.$type, ListConnectorRequestFilter);

function createBaseListConnectorResponse(): ListConnectorResponse {
  return { $type: "pb.v1alpha2.ListConnectorResponse", connectors: [], nextPageToken: "", totalSize: 0 };
}

export const ListConnectorResponse = {
  $type: "pb.v1alpha2.ListConnectorResponse" as const,

  encode(message: ListConnectorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connectors !== undefined && message.connectors.length !== 0) {
      for (const v of message.connectors) {
        Connector.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      writer.uint32(18).string(message.nextPageToken);
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      writer.uint32(24).int32(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListConnectorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListConnectorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connectors!.push(Connector.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nextPageToken = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.totalSize = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListConnectorResponse {
    return {
      $type: ListConnectorResponse.$type,
      connectors: globalThis.Array.isArray(object?.connectors)
        ? object.connectors.map((e: any) => Connector.fromJSON(e))
        : [],
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListConnectorResponse): unknown {
    const obj: any = {};
    if (message.connectors?.length) {
      obj.connectors = message.connectors.map((e) => Connector.toJSON(e));
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListConnectorResponse>, I>>(base?: I): ListConnectorResponse {
    return ListConnectorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListConnectorResponse>, I>>(object: I): ListConnectorResponse {
    const message = createBaseListConnectorResponse();
    message.connectors = object.connectors?.map((e) => Connector.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListConnectorResponse.$type, ListConnectorResponse);

function createBaseGetConnectorRequest(): GetConnectorRequest {
  return { $type: "pb.v1alpha2.GetConnectorRequest", name: "" };
}

export const GetConnectorRequest = {
  $type: "pb.v1alpha2.GetConnectorRequest" as const,

  encode(message: GetConnectorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetConnectorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetConnectorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): GetConnectorRequest {
    return { $type: GetConnectorRequest.$type, name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: GetConnectorRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetConnectorRequest>, I>>(base?: I): GetConnectorRequest {
    return GetConnectorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetConnectorRequest>, I>>(object: I): GetConnectorRequest {
    const message = createBaseGetConnectorRequest();
    message.name = object.name ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetConnectorRequest.$type, GetConnectorRequest);

function createBaseDeleteConnectorRequest(): DeleteConnectorRequest {
  return { $type: "pb.v1alpha2.DeleteConnectorRequest", name: "", deletedReason: "" };
}

export const DeleteConnectorRequest = {
  $type: "pb.v1alpha2.DeleteConnectorRequest" as const,

  encode(message: DeleteConnectorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.deletedReason !== undefined && message.deletedReason !== "") {
      writer.uint32(18).string(message.deletedReason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteConnectorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteConnectorRequest();
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

          message.deletedReason = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteConnectorRequest {
    return {
      $type: DeleteConnectorRequest.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      deletedReason: isSet(object.deletedReason) ? globalThis.String(object.deletedReason) : "",
    };
  },

  toJSON(message: DeleteConnectorRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.deletedReason !== undefined && message.deletedReason !== "") {
      obj.deletedReason = message.deletedReason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteConnectorRequest>, I>>(base?: I): DeleteConnectorRequest {
    return DeleteConnectorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteConnectorRequest>, I>>(object: I): DeleteConnectorRequest {
    const message = createBaseDeleteConnectorRequest();
    message.name = object.name ?? "";
    message.deletedReason = object.deletedReason ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteConnectorRequest.$type, DeleteConnectorRequest);

function createBaseUpdateConnectorRequest(): UpdateConnectorRequest {
  return { $type: "pb.v1alpha2.UpdateConnectorRequest", connector: undefined, fieldMask: undefined };
}

export const UpdateConnectorRequest = {
  $type: "pb.v1alpha2.UpdateConnectorRequest" as const,

  encode(message: UpdateConnectorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connector !== undefined) {
      Connector.encode(message.connector, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateConnectorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateConnectorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connector = Connector.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateConnectorRequest {
    return {
      $type: UpdateConnectorRequest.$type,
      connector: isSet(object.connector) ? Connector.fromJSON(object.connector) : undefined,
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: UpdateConnectorRequest): unknown {
    const obj: any = {};
    if (message.connector !== undefined) {
      obj.connector = Connector.toJSON(message.connector);
    }
    if (message.fieldMask !== undefined) {
      obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateConnectorRequest>, I>>(base?: I): UpdateConnectorRequest {
    return UpdateConnectorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateConnectorRequest>, I>>(object: I): UpdateConnectorRequest {
    const message = createBaseUpdateConnectorRequest();
    message.connector = (object.connector !== undefined && object.connector !== null)
      ? Connector.fromPartial(object.connector)
      : undefined;
    message.fieldMask = object.fieldMask ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateConnectorRequest.$type, UpdateConnectorRequest);

export interface Connectors {
  CreateConnector(request: DeepPartial<CreateConnectorRequest>, metadata?: grpc.Metadata): Promise<Connector>;
  ListConnectors(request: DeepPartial<ListConnectorRequest>, metadata?: grpc.Metadata): Promise<ListConnectorResponse>;
  DeleteConnector(request: DeepPartial<DeleteConnectorRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  GetConnector(request: DeepPartial<GetConnectorRequest>, metadata?: grpc.Metadata): Promise<Connector>;
  UpdateConnector(request: DeepPartial<UpdateConnectorRequest>, metadata?: grpc.Metadata): Promise<Connector>;
}

export class ConnectorsClientImpl implements Connectors {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateConnector = this.CreateConnector.bind(this);
    this.ListConnectors = this.ListConnectors.bind(this);
    this.DeleteConnector = this.DeleteConnector.bind(this);
    this.GetConnector = this.GetConnector.bind(this);
    this.UpdateConnector = this.UpdateConnector.bind(this);
  }

  CreateConnector(request: DeepPartial<CreateConnectorRequest>, metadata?: grpc.Metadata): Promise<Connector> {
    return this.rpc.unary(ConnectorsCreateConnectorDesc, CreateConnectorRequest.fromPartial(request), metadata);
  }

  ListConnectors(request: DeepPartial<ListConnectorRequest>, metadata?: grpc.Metadata): Promise<ListConnectorResponse> {
    return this.rpc.unary(ConnectorsListConnectorsDesc, ListConnectorRequest.fromPartial(request), metadata);
  }

  DeleteConnector(request: DeepPartial<DeleteConnectorRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(ConnectorsDeleteConnectorDesc, DeleteConnectorRequest.fromPartial(request), metadata);
  }

  GetConnector(request: DeepPartial<GetConnectorRequest>, metadata?: grpc.Metadata): Promise<Connector> {
    return this.rpc.unary(ConnectorsGetConnectorDesc, GetConnectorRequest.fromPartial(request), metadata);
  }

  UpdateConnector(request: DeepPartial<UpdateConnectorRequest>, metadata?: grpc.Metadata): Promise<Connector> {
    return this.rpc.unary(ConnectorsUpdateConnectorDesc, UpdateConnectorRequest.fromPartial(request), metadata);
  }
}

export const ConnectorsDesc = { serviceName: "pb.v1alpha2.Connectors" };

export const ConnectorsCreateConnectorDesc: UnaryMethodDefinitionish = {
  methodName: "CreateConnector",
  service: ConnectorsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateConnectorRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Connector.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ConnectorsListConnectorsDesc: UnaryMethodDefinitionish = {
  methodName: "ListConnectors",
  service: ConnectorsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListConnectorRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListConnectorResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ConnectorsDeleteConnectorDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteConnector",
  service: ConnectorsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteConnectorRequest.encode(this).finish();
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

export const ConnectorsGetConnectorDesc: UnaryMethodDefinitionish = {
  methodName: "GetConnector",
  service: ConnectorsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetConnectorRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Connector.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ConnectorsUpdateConnectorDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateConnector",
  service: ConnectorsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateConnectorRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Connector.decode(data);
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
