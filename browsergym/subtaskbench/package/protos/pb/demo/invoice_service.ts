/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Empty } from "../../google/protobuf/empty";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "pb.demo";

export interface Invoice {
  $type?: "pb.demo.Invoice";
  /** Resource name for invoice, in the format of users\/\* /invoices/\* */
  name?: string | undefined;
  vendorName?: string | undefined;
  vendorContact?: string | undefined;
  billingAddress?: string | undefined;
  number?: string | undefined;
  invoiceDate?: string | undefined;
  invoiceDueDate?: string | undefined;
  purchaseOrderNumber?: string | undefined;
  lineItems?:
    | LineItem[]
    | undefined;
  /** This field is currently declared as string for sandbox testing purpose. */
  total?: string | undefined;
  status?: InvoiceSTATUS | undefined;
}

export enum InvoiceSTATUS {
  STATUS_UNSPECIFIED = 0,
  /** SUBMITTED - submited indicates the invoice is submitted, but we can't edit. */
  SUBMITTED = 1,
  /** DRAFT - draft indicates the invoice is submitted but user can edit. */
  DRAFT = 2,
  UNRECOGNIZED = -1,
}

export function invoiceSTATUSFromJSON(object: any): InvoiceSTATUS {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return InvoiceSTATUS.STATUS_UNSPECIFIED;
    case 1:
    case "SUBMITTED":
      return InvoiceSTATUS.SUBMITTED;
    case 2:
    case "DRAFT":
      return InvoiceSTATUS.DRAFT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InvoiceSTATUS.UNRECOGNIZED;
  }
}

export function invoiceSTATUSToJSON(object: InvoiceSTATUS): string {
  switch (object) {
    case InvoiceSTATUS.STATUS_UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case InvoiceSTATUS.SUBMITTED:
      return "SUBMITTED";
    case InvoiceSTATUS.DRAFT:
      return "DRAFT";
    case InvoiceSTATUS.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface LineItem {
  $type?: "pb.demo.LineItem";
  id?: string | undefined;
  description?:
    | string
    | undefined;
  /** This field is currently declared as string for sandbox testing purpose. */
  quantity?:
    | string
    | undefined;
  /** This field is currently declared as string for sandbox testing purpose. */
  price?: string | undefined;
}

export interface CreateInvoiceRequest {
  $type?: "pb.demo.CreateInvoiceRequest";
  /**
   * The parent resource name where the invoice is to be created.
   * E.g., "users/abc@orby.ai"
   */
  parent?: string | undefined;
  invoice?: Invoice | undefined;
}

export interface ListInvoicesRequest {
  $type?: "pb.demo.ListInvoicesRequest";
  /**
   * The parent resource name where the invoice was created.
   * E.g., users/abc@orby.ai
   */
  parent?:
    | string
    | undefined;
  /**
   * Default is 10 (when page_size is missing or set to 0). Max value is 20.
   * Ordered by ascending based on invoice date.
   */
  pageSize?:
    | number
    | undefined;
  /**
   * Use this to continue the previous list requests.
   * Its value should be same with previous response's next_page_token.
   */
  pageToken?:
    | string
    | undefined;
  /**
   * Supported filters: "due_date>=", "due_date<=", "number=", "status"=, "vendor_name=",
   * Valid values for due_date filter are in the format YYYY-MM-DD (2023-01-11)
   * Valid values for number filter is any string
   * Valid values for vendor_name filter is any string
   * Valid values for status filter are DRAFT, SUBMITTED, STATUS_UNSPECIFIED
   * Use comma to combine multiple filters: "due_date>=2023-01-11,number=1".
   */
  filter?: string | undefined;
}

export interface ListInvoicesResponse {
  $type?: "pb.demo.ListInvoicesResponse";
  /** Ordered by ascending invoice date. */
  invoices?:
    | Invoice[]
    | undefined;
  /** If the value is "", it means no more results for the request. */
  nextPageToken?:
    | string
    | undefined;
  /**
   * Total available invoice size.
   * Note it is NOT the remaining available invoice size
   * after the current response.
   */
  totalSize?: number | undefined;
}

export interface UpdateInvoiceRequest {
  $type?: "pb.demo.UpdateInvoiceRequest";
  invoice?: Invoice | undefined;
}

export interface GetInvoiceRequest {
  $type?: "pb.demo.GetInvoiceRequest";
  /** Name of the Invoice */
  name?: string | undefined;
}

export interface DeleteInvoiceRequest {
  $type?: "pb.demo.DeleteInvoiceRequest";
  /** Name of the Invoice */
  name?: string | undefined;
}

function createBaseInvoice(): Invoice {
  return {
    $type: "pb.demo.Invoice",
    name: "",
    vendorName: "",
    vendorContact: "",
    billingAddress: "",
    number: "",
    invoiceDate: "",
    invoiceDueDate: "",
    purchaseOrderNumber: "",
    lineItems: [],
    total: "",
    status: 0,
  };
}

export const Invoice = {
  $type: "pb.demo.Invoice" as const,

  encode(message: Invoice, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.vendorName !== undefined && message.vendorName !== "") {
      writer.uint32(18).string(message.vendorName);
    }
    if (message.vendorContact !== undefined && message.vendorContact !== "") {
      writer.uint32(26).string(message.vendorContact);
    }
    if (message.billingAddress !== undefined && message.billingAddress !== "") {
      writer.uint32(34).string(message.billingAddress);
    }
    if (message.number !== undefined && message.number !== "") {
      writer.uint32(42).string(message.number);
    }
    if (message.invoiceDate !== undefined && message.invoiceDate !== "") {
      writer.uint32(50).string(message.invoiceDate);
    }
    if (message.invoiceDueDate !== undefined && message.invoiceDueDate !== "") {
      writer.uint32(58).string(message.invoiceDueDate);
    }
    if (message.purchaseOrderNumber !== undefined && message.purchaseOrderNumber !== "") {
      writer.uint32(66).string(message.purchaseOrderNumber);
    }
    if (message.lineItems !== undefined && message.lineItems.length !== 0) {
      for (const v of message.lineItems) {
        LineItem.encode(v!, writer.uint32(74).fork()).ldelim();
      }
    }
    if (message.total !== undefined && message.total !== "") {
      writer.uint32(82).string(message.total);
    }
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(88).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Invoice {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvoice();
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

          message.vendorName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.vendorContact = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.billingAddress = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.number = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.invoiceDate = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.invoiceDueDate = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.purchaseOrderNumber = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.lineItems!.push(LineItem.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.total = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Invoice {
    return {
      $type: Invoice.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      vendorName: isSet(object.vendorName) ? globalThis.String(object.vendorName) : "",
      vendorContact: isSet(object.vendorContact) ? globalThis.String(object.vendorContact) : "",
      billingAddress: isSet(object.billingAddress) ? globalThis.String(object.billingAddress) : "",
      number: isSet(object.number) ? globalThis.String(object.number) : "",
      invoiceDate: isSet(object.invoiceDate) ? globalThis.String(object.invoiceDate) : "",
      invoiceDueDate: isSet(object.invoiceDueDate) ? globalThis.String(object.invoiceDueDate) : "",
      purchaseOrderNumber: isSet(object.purchaseOrderNumber) ? globalThis.String(object.purchaseOrderNumber) : "",
      lineItems: globalThis.Array.isArray(object?.lineItems)
        ? object.lineItems.map((e: any) => LineItem.fromJSON(e))
        : [],
      total: isSet(object.total) ? globalThis.String(object.total) : "",
      status: isSet(object.status) ? invoiceSTATUSFromJSON(object.status) : 0,
    };
  },

  toJSON(message: Invoice): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.vendorName !== undefined && message.vendorName !== "") {
      obj.vendorName = message.vendorName;
    }
    if (message.vendorContact !== undefined && message.vendorContact !== "") {
      obj.vendorContact = message.vendorContact;
    }
    if (message.billingAddress !== undefined && message.billingAddress !== "") {
      obj.billingAddress = message.billingAddress;
    }
    if (message.number !== undefined && message.number !== "") {
      obj.number = message.number;
    }
    if (message.invoiceDate !== undefined && message.invoiceDate !== "") {
      obj.invoiceDate = message.invoiceDate;
    }
    if (message.invoiceDueDate !== undefined && message.invoiceDueDate !== "") {
      obj.invoiceDueDate = message.invoiceDueDate;
    }
    if (message.purchaseOrderNumber !== undefined && message.purchaseOrderNumber !== "") {
      obj.purchaseOrderNumber = message.purchaseOrderNumber;
    }
    if (message.lineItems?.length) {
      obj.lineItems = message.lineItems.map((e) => LineItem.toJSON(e));
    }
    if (message.total !== undefined && message.total !== "") {
      obj.total = message.total;
    }
    if (message.status !== undefined && message.status !== 0) {
      obj.status = invoiceSTATUSToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Invoice>, I>>(base?: I): Invoice {
    return Invoice.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Invoice>, I>>(object: I): Invoice {
    const message = createBaseInvoice();
    message.name = object.name ?? "";
    message.vendorName = object.vendorName ?? "";
    message.vendorContact = object.vendorContact ?? "";
    message.billingAddress = object.billingAddress ?? "";
    message.number = object.number ?? "";
    message.invoiceDate = object.invoiceDate ?? "";
    message.invoiceDueDate = object.invoiceDueDate ?? "";
    message.purchaseOrderNumber = object.purchaseOrderNumber ?? "";
    message.lineItems = object.lineItems?.map((e) => LineItem.fromPartial(e)) || [];
    message.total = object.total ?? "";
    message.status = object.status ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Invoice.$type, Invoice);

function createBaseLineItem(): LineItem {
  return { $type: "pb.demo.LineItem", id: "", description: "", quantity: "", price: "" };
}

export const LineItem = {
  $type: "pb.demo.LineItem" as const,

  encode(message: LineItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.quantity !== undefined && message.quantity !== "") {
      writer.uint32(26).string(message.quantity);
    }
    if (message.price !== undefined && message.price !== "") {
      writer.uint32(34).string(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LineItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLineItem();
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

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.quantity = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.price = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LineItem {
    return {
      $type: LineItem.$type,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      quantity: isSet(object.quantity) ? globalThis.String(object.quantity) : "",
      price: isSet(object.price) ? globalThis.String(object.price) : "",
    };
  },

  toJSON(message: LineItem): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.quantity !== undefined && message.quantity !== "") {
      obj.quantity = message.quantity;
    }
    if (message.price !== undefined && message.price !== "") {
      obj.price = message.price;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LineItem>, I>>(base?: I): LineItem {
    return LineItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LineItem>, I>>(object: I): LineItem {
    const message = createBaseLineItem();
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    message.quantity = object.quantity ?? "";
    message.price = object.price ?? "";
    return message;
  },
};

messageTypeRegistry.set(LineItem.$type, LineItem);

function createBaseCreateInvoiceRequest(): CreateInvoiceRequest {
  return { $type: "pb.demo.CreateInvoiceRequest", parent: "", invoice: undefined };
}

export const CreateInvoiceRequest = {
  $type: "pb.demo.CreateInvoiceRequest" as const,

  encode(message: CreateInvoiceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.invoice !== undefined) {
      Invoice.encode(message.invoice, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInvoiceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInvoiceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.invoice = Invoice.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateInvoiceRequest {
    return {
      $type: CreateInvoiceRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      invoice: isSet(object.invoice) ? Invoice.fromJSON(object.invoice) : undefined,
    };
  },

  toJSON(message: CreateInvoiceRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    if (message.invoice !== undefined) {
      obj.invoice = Invoice.toJSON(message.invoice);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateInvoiceRequest>, I>>(base?: I): CreateInvoiceRequest {
    return CreateInvoiceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInvoiceRequest>, I>>(object: I): CreateInvoiceRequest {
    const message = createBaseCreateInvoiceRequest();
    message.parent = object.parent ?? "";
    message.invoice = (object.invoice !== undefined && object.invoice !== null)
      ? Invoice.fromPartial(object.invoice)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateInvoiceRequest.$type, CreateInvoiceRequest);

function createBaseListInvoicesRequest(): ListInvoicesRequest {
  return { $type: "pb.demo.ListInvoicesRequest", parent: "", pageSize: 0, pageToken: "", filter: "" };
}

export const ListInvoicesRequest = {
  $type: "pb.demo.ListInvoicesRequest" as const,

  encode(message: ListInvoicesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined && message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      writer.uint32(26).string(message.pageToken);
    }
    if (message.filter !== undefined && message.filter !== "") {
      writer.uint32(34).string(message.filter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListInvoicesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListInvoicesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pageSize = reader.int32();
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

          message.filter = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListInvoicesRequest {
    return {
      $type: ListInvoicesRequest.$type,
      parent: isSet(object.parent) ? globalThis.String(object.parent) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
    };
  },

  toJSON(message: ListInvoicesRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined && message.parent !== "") {
      obj.parent = message.parent;
    }
    if (message.pageSize !== undefined && message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageToken !== undefined && message.pageToken !== "") {
      obj.pageToken = message.pageToken;
    }
    if (message.filter !== undefined && message.filter !== "") {
      obj.filter = message.filter;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListInvoicesRequest>, I>>(base?: I): ListInvoicesRequest {
    return ListInvoicesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListInvoicesRequest>, I>>(object: I): ListInvoicesRequest {
    const message = createBaseListInvoicesRequest();
    message.parent = object.parent ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    message.filter = object.filter ?? "";
    return message;
  },
};

messageTypeRegistry.set(ListInvoicesRequest.$type, ListInvoicesRequest);

function createBaseListInvoicesResponse(): ListInvoicesResponse {
  return { $type: "pb.demo.ListInvoicesResponse", invoices: [], nextPageToken: "", totalSize: 0 };
}

export const ListInvoicesResponse = {
  $type: "pb.demo.ListInvoicesResponse" as const,

  encode(message: ListInvoicesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.invoices !== undefined && message.invoices.length !== 0) {
      for (const v of message.invoices) {
        Invoice.encode(v!, writer.uint32(10).fork()).ldelim();
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListInvoicesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListInvoicesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.invoices!.push(Invoice.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListInvoicesResponse {
    return {
      $type: ListInvoicesResponse.$type,
      invoices: globalThis.Array.isArray(object?.invoices) ? object.invoices.map((e: any) => Invoice.fromJSON(e)) : [],
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
      totalSize: isSet(object.totalSize) ? globalThis.Number(object.totalSize) : 0,
    };
  },

  toJSON(message: ListInvoicesResponse): unknown {
    const obj: any = {};
    if (message.invoices?.length) {
      obj.invoices = message.invoices.map((e) => Invoice.toJSON(e));
    }
    if (message.nextPageToken !== undefined && message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    if (message.totalSize !== undefined && message.totalSize !== 0) {
      obj.totalSize = Math.round(message.totalSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListInvoicesResponse>, I>>(base?: I): ListInvoicesResponse {
    return ListInvoicesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListInvoicesResponse>, I>>(object: I): ListInvoicesResponse {
    const message = createBaseListInvoicesResponse();
    message.invoices = object.invoices?.map((e) => Invoice.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListInvoicesResponse.$type, ListInvoicesResponse);

function createBaseUpdateInvoiceRequest(): UpdateInvoiceRequest {
  return { $type: "pb.demo.UpdateInvoiceRequest", invoice: undefined };
}

export const UpdateInvoiceRequest = {
  $type: "pb.demo.UpdateInvoiceRequest" as const,

  encode(message: UpdateInvoiceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.invoice !== undefined) {
      Invoice.encode(message.invoice, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateInvoiceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateInvoiceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.invoice = Invoice.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateInvoiceRequest {
    return {
      $type: UpdateInvoiceRequest.$type,
      invoice: isSet(object.invoice) ? Invoice.fromJSON(object.invoice) : undefined,
    };
  },

  toJSON(message: UpdateInvoiceRequest): unknown {
    const obj: any = {};
    if (message.invoice !== undefined) {
      obj.invoice = Invoice.toJSON(message.invoice);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateInvoiceRequest>, I>>(base?: I): UpdateInvoiceRequest {
    return UpdateInvoiceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateInvoiceRequest>, I>>(object: I): UpdateInvoiceRequest {
    const message = createBaseUpdateInvoiceRequest();
    message.invoice = (object.invoice !== undefined && object.invoice !== null)
      ? Invoice.fromPartial(object.invoice)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(UpdateInvoiceRequest.$type, UpdateInvoiceRequest);

function createBaseGetInvoiceRequest(): GetInvoiceRequest {
  return { $type: "pb.demo.GetInvoiceRequest", name: "" };
}

export const GetInvoiceRequest = {
  $type: "pb.demo.GetInvoiceRequest" as const,

  encode(message: GetInvoiceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetInvoiceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetInvoiceRequest();
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

  fromJSON(object: any): GetInvoiceRequest {
    return { $type: GetInvoiceRequest.$type, name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: GetInvoiceRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetInvoiceRequest>, I>>(base?: I): GetInvoiceRequest {
    return GetInvoiceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetInvoiceRequest>, I>>(object: I): GetInvoiceRequest {
    const message = createBaseGetInvoiceRequest();
    message.name = object.name ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetInvoiceRequest.$type, GetInvoiceRequest);

function createBaseDeleteInvoiceRequest(): DeleteInvoiceRequest {
  return { $type: "pb.demo.DeleteInvoiceRequest", name: "" };
}

export const DeleteInvoiceRequest = {
  $type: "pb.demo.DeleteInvoiceRequest" as const,

  encode(message: DeleteInvoiceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteInvoiceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteInvoiceRequest();
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

  fromJSON(object: any): DeleteInvoiceRequest {
    return { $type: DeleteInvoiceRequest.$type, name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: DeleteInvoiceRequest): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteInvoiceRequest>, I>>(base?: I): DeleteInvoiceRequest {
    return DeleteInvoiceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteInvoiceRequest>, I>>(object: I): DeleteInvoiceRequest {
    const message = createBaseDeleteInvoiceRequest();
    message.name = object.name ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeleteInvoiceRequest.$type, DeleteInvoiceRequest);

export interface Invoices {
  /** Create a invoice for the current users. */
  CreateInvoice(request: DeepPartial<CreateInvoiceRequest>, metadata?: grpc.Metadata): Promise<Invoice>;
  /** Invoice details for a perticular invoice */
  GetInvoice(request: DeepPartial<GetInvoiceRequest>, metadata?: grpc.Metadata): Promise<Invoice>;
  /** List invoices */
  ListInvoices(request: DeepPartial<ListInvoicesRequest>, metadata?: grpc.Metadata): Promise<ListInvoicesResponse>;
  /** Update invoice if status is draft */
  UpdateInvoice(request: DeepPartial<UpdateInvoiceRequest>, metadata?: grpc.Metadata): Promise<Invoice>;
  /** Delete invoice */
  DeleteInvoice(request: DeepPartial<DeleteInvoiceRequest>, metadata?: grpc.Metadata): Promise<Empty>;
}

export class InvoicesClientImpl implements Invoices {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateInvoice = this.CreateInvoice.bind(this);
    this.GetInvoice = this.GetInvoice.bind(this);
    this.ListInvoices = this.ListInvoices.bind(this);
    this.UpdateInvoice = this.UpdateInvoice.bind(this);
    this.DeleteInvoice = this.DeleteInvoice.bind(this);
  }

  CreateInvoice(request: DeepPartial<CreateInvoiceRequest>, metadata?: grpc.Metadata): Promise<Invoice> {
    return this.rpc.unary(InvoicesCreateInvoiceDesc, CreateInvoiceRequest.fromPartial(request), metadata);
  }

  GetInvoice(request: DeepPartial<GetInvoiceRequest>, metadata?: grpc.Metadata): Promise<Invoice> {
    return this.rpc.unary(InvoicesGetInvoiceDesc, GetInvoiceRequest.fromPartial(request), metadata);
  }

  ListInvoices(request: DeepPartial<ListInvoicesRequest>, metadata?: grpc.Metadata): Promise<ListInvoicesResponse> {
    return this.rpc.unary(InvoicesListInvoicesDesc, ListInvoicesRequest.fromPartial(request), metadata);
  }

  UpdateInvoice(request: DeepPartial<UpdateInvoiceRequest>, metadata?: grpc.Metadata): Promise<Invoice> {
    return this.rpc.unary(InvoicesUpdateInvoiceDesc, UpdateInvoiceRequest.fromPartial(request), metadata);
  }

  DeleteInvoice(request: DeepPartial<DeleteInvoiceRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(InvoicesDeleteInvoiceDesc, DeleteInvoiceRequest.fromPartial(request), metadata);
  }
}

export const InvoicesDesc = { serviceName: "pb.demo.Invoices" };

export const InvoicesCreateInvoiceDesc: UnaryMethodDefinitionish = {
  methodName: "CreateInvoice",
  service: InvoicesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateInvoiceRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Invoice.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const InvoicesGetInvoiceDesc: UnaryMethodDefinitionish = {
  methodName: "GetInvoice",
  service: InvoicesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetInvoiceRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Invoice.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const InvoicesListInvoicesDesc: UnaryMethodDefinitionish = {
  methodName: "ListInvoices",
  service: InvoicesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListInvoicesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListInvoicesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const InvoicesUpdateInvoiceDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateInvoice",
  service: InvoicesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateInvoiceRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Invoice.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const InvoicesDeleteInvoiceDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteInvoice",
  service: InvoicesDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteInvoiceRequest.encode(this).finish();
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
