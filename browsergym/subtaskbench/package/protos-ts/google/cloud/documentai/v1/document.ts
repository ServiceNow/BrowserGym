/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../../../typeRegistry";
import { Timestamp } from "../../../protobuf/timestamp";
import { Status } from "../../../rpc/status";
import { Color } from "../../../type/color";
import { DateMessage } from "../../../type/date";
import { DateTime } from "../../../type/datetime";
import { Money } from "../../../type/money";
import { PostalAddress } from "../../../type/postal_address";
import { Barcode } from "./barcode";
import { BoundingPoly } from "./geometry";

export const protobufPackage = "google.cloud.documentai.v1";

/**
 * Document represents the canonical document resource in Document AI. It is an
 * interchange format that provides insights into documents and allows for
 * collaboration between users and Document AI to iterate and optimize for
 * quality.
 */
export interface Document {
  $type?: "google.cloud.documentai.v1.Document";
  /**
   * Optional. Currently supports Google Cloud Storage URI of the form
   *    `gs://bucket_name/object_name`. Object versioning is not supported.
   *    See [Google Cloud Storage Request
   *    URIs](https://cloud.google.com/storage/docs/reference-uris) for more
   *    info.
   */
  uri?:
    | string
    | undefined;
  /**
   * Optional. Inline document content, represented as a stream of bytes.
   * Note: As with all `bytes` fields, protobuffers use a pure binary
   * representation, whereas JSON representations use base64.
   */
  content?:
    | Uint8Array
    | undefined;
  /**
   * An IANA published MIME type (also referred to as media type). For more
   * information, see
   * https://www.iana.org/assignments/media-types/media-types.xhtml.
   */
  mimeType?:
    | string
    | undefined;
  /** Optional. UTF-8 encoded text in reading order from the document. */
  text?:
    | string
    | undefined;
  /** Placeholder.  Styles for the [Document.text][google.cloud.documentai.v1.Document.text]. */
  textStyles?:
    | DocumentStyle[]
    | undefined;
  /** Visual page layout for the [Document][google.cloud.documentai.v1.Document]. */
  pages?:
    | DocumentPage[]
    | undefined;
  /**
   * A list of entities detected on [Document.text][google.cloud.documentai.v1.Document.text]. For document shards,
   * entities in this list may cross shard boundaries.
   */
  entities?:
    | DocumentEntity[]
    | undefined;
  /** Placeholder.  Relationship among [Document.entities][google.cloud.documentai.v1.Document.entities]. */
  entityRelations?:
    | DocumentEntityRelation[]
    | undefined;
  /**
   * Placeholder.  A list of text corrections made to [Document.text].  This is
   * usually used for annotating corrections to OCR mistakes.  Text changes for
   * a given revision may not overlap with each other.
   */
  textChanges?:
    | DocumentTextChange[]
    | undefined;
  /**
   * Information about the sharding if this document is sharded part of a larger
   * document. If the document is not sharded, this message is not specified.
   */
  shardInfo?:
    | DocumentShardInfo
    | undefined;
  /** Any error that occurred while processing this document. */
  error?:
    | Status
    | undefined;
  /** Placeholder. Revision history of this document. */
  revisions?: DocumentRevision[] | undefined;
}

/**
 * For a large document, sharding may be performed to produce several
 * document shards. Each document shard contains this field to detail which
 * shard it is.
 */
export interface DocumentShardInfo {
  $type?: "google.cloud.documentai.v1.Document.ShardInfo";
  /** The 0-based index of this shard. */
  shardIndex?:
    | number
    | undefined;
  /** Total number of shards. */
  shardCount?:
    | number
    | undefined;
  /**
   * The index of the first character in [Document.text][google.cloud.documentai.v1.Document.text] in the overall
   * document global text.
   */
  textOffset?: number | undefined;
}

/**
 * Annotation for common text style attributes. This adheres to CSS
 * conventions as much as possible.
 */
export interface DocumentStyle {
  $type?: "google.cloud.documentai.v1.Document.Style";
  /** Text anchor indexing into the [Document.text][google.cloud.documentai.v1.Document.text]. */
  textAnchor?:
    | DocumentTextAnchor
    | undefined;
  /** Text color. */
  color?:
    | Color
    | undefined;
  /** Text background color. */
  backgroundColor?:
    | Color
    | undefined;
  /**
   * Font weight. Possible values are normal, bold, bolder, and lighter.
   * https://www.w3schools.com/cssref/pr_font_weight.asp
   */
  fontWeight?:
    | string
    | undefined;
  /**
   * Text style. Possible values are normal, italic, and oblique.
   * https://www.w3schools.com/cssref/pr_font_font-style.asp
   */
  textStyle?:
    | string
    | undefined;
  /**
   * Text decoration. Follows CSS standard.
   * <text-decoration-line> <text-decoration-color> <text-decoration-style>
   * https://www.w3schools.com/cssref/pr_text_text-decoration.asp
   */
  textDecoration?:
    | string
    | undefined;
  /** Font size. */
  fontSize?: DocumentStyleFontSize | undefined;
}

/** Font size with unit. */
export interface DocumentStyleFontSize {
  $type?: "google.cloud.documentai.v1.Document.Style.FontSize";
  /** Font size for the text. */
  size?:
    | number
    | undefined;
  /** Unit for the font size. Follows CSS naming (in, px, pt, etc.). */
  unit?: string | undefined;
}

/** A page in a [Document][google.cloud.documentai.v1.Document]. */
export interface DocumentPage {
  $type?: "google.cloud.documentai.v1.Document.Page";
  /**
   * 1-based index for current [Page][google.cloud.documentai.v1.Document.Page] in a parent [Document][google.cloud.documentai.v1.Document].
   * Useful when a page is taken out of a [Document][google.cloud.documentai.v1.Document] for individual
   * processing.
   */
  pageNumber?:
    | number
    | undefined;
  /**
   * Rendered image for this page. This image is preprocessed to remove any
   * skew, rotation, and distortions such that the annotation bounding boxes
   * can be upright and axis-aligned.
   */
  image?:
    | DocumentPageImage
    | undefined;
  /**
   * Transformation matrices that were applied to the original document image
   * to produce [Page.image][google.cloud.documentai.v1.Document.Page.image].
   */
  transforms?:
    | DocumentPageMatrix[]
    | undefined;
  /** Physical dimension of the page. */
  dimension?:
    | DocumentPageDimension
    | undefined;
  /** [Layout][google.cloud.documentai.v1.Document.Page.Layout] for the page. */
  layout?:
    | DocumentPageLayout
    | undefined;
  /** A list of detected languages together with confidence. */
  detectedLanguages?:
    | DocumentPageDetectedLanguage[]
    | undefined;
  /**
   * A list of visually detected text blocks on the page.
   * A block has a set of lines (collected into paragraphs) that have a common
   * line-spacing and orientation.
   */
  blocks?:
    | DocumentPageBlock[]
    | undefined;
  /**
   * A list of visually detected text paragraphs on the page.
   * A collection of lines that a human would perceive as a paragraph.
   */
  paragraphs?:
    | DocumentPageParagraph[]
    | undefined;
  /**
   * A list of visually detected text lines on the page.
   * A collection of tokens that a human would perceive as a line.
   */
  lines?:
    | DocumentPageLine[]
    | undefined;
  /** A list of visually detected tokens on the page. */
  tokens?:
    | DocumentPageToken[]
    | undefined;
  /**
   * A list of detected non-text visual elements e.g. checkbox,
   * signature etc. on the page.
   */
  visualElements?:
    | DocumentPageVisualElement[]
    | undefined;
  /** A list of visually detected tables on the page. */
  tables?:
    | DocumentPageTable[]
    | undefined;
  /** A list of visually detected form fields on the page. */
  formFields?:
    | DocumentPageFormField[]
    | undefined;
  /** A list of visually detected symbols on the page. */
  symbols?:
    | DocumentPageSymbol[]
    | undefined;
  /** A list of detected barcodes. */
  detectedBarcodes?:
    | DocumentPageDetectedBarcode[]
    | undefined;
  /** The history of this page. */
  provenance?: DocumentProvenance | undefined;
}

/** Dimension for the page. */
export interface DocumentPageDimension {
  $type?: "google.cloud.documentai.v1.Document.Page.Dimension";
  /** Page width. */
  width?:
    | number
    | undefined;
  /** Page height. */
  height?:
    | number
    | undefined;
  /** Dimension unit. */
  unit?: string | undefined;
}

/** Rendered image contents for this page. */
export interface DocumentPageImage {
  $type?: "google.cloud.documentai.v1.Document.Page.Image";
  /** Raw byte content of the image. */
  content?:
    | Uint8Array
    | undefined;
  /** Encoding mime type for the image. */
  mimeType?:
    | string
    | undefined;
  /** Width of the image in pixels. */
  width?:
    | number
    | undefined;
  /** Height of the image in pixels. */
  height?: number | undefined;
}

/**
 * Representation for transformation matrix, intended to be compatible and
 * used with OpenCV format for image manipulation.
 */
export interface DocumentPageMatrix {
  $type?: "google.cloud.documentai.v1.Document.Page.Matrix";
  /** Number of rows in the matrix. */
  rows?:
    | number
    | undefined;
  /** Number of columns in the matrix. */
  cols?:
    | number
    | undefined;
  /**
   * This encodes information about what data type the matrix uses.
   * For example, 0 (CV_8U) is an unsigned 8-bit image. For the full list
   * of OpenCV primitive data types, please refer to
   * https://docs.opencv.org/4.3.0/d1/d1b/group__core__hal__interface.html
   */
  type?:
    | number
    | undefined;
  /** The matrix data. */
  data?: Uint8Array | undefined;
}

/** Visual element describing a layout unit on a page. */
export interface DocumentPageLayout {
  $type?: "google.cloud.documentai.v1.Document.Page.Layout";
  /** Text anchor indexing into the [Document.text][google.cloud.documentai.v1.Document.text]. */
  textAnchor?:
    | DocumentTextAnchor
    | undefined;
  /**
   * Confidence of the current [Layout][google.cloud.documentai.v1.Document.Page.Layout] within context of the object this
   * layout is for. e.g. confidence can be for a single token, a table,
   * a visual element, etc. depending on context. Range [0, 1].
   */
  confidence?:
    | number
    | undefined;
  /** The bounding polygon for the [Layout][google.cloud.documentai.v1.Document.Page.Layout]. */
  boundingPoly?:
    | BoundingPoly
    | undefined;
  /** Detected orientation for the [Layout][google.cloud.documentai.v1.Document.Page.Layout]. */
  orientation?: DocumentPageLayoutOrientation | undefined;
}

/** Detected human reading orientation. */
export enum DocumentPageLayoutOrientation {
  /** UNSPECIFIED - Unspecified orientation. */
  UNSPECIFIED = 0,
  /** PAGE_UP - Orientation is aligned with page up. */
  PAGE_UP = 1,
  /**
   * PAGE_RIGHT - Orientation is aligned with page right.
   * Turn the head 90 degrees clockwise from upright to read.
   */
  PAGE_RIGHT = 2,
  /**
   * PAGE_DOWN - Orientation is aligned with page down.
   * Turn the head 180 degrees from upright to read.
   */
  PAGE_DOWN = 3,
  /**
   * PAGE_LEFT - Orientation is aligned with page left.
   * Turn the head 90 degrees counterclockwise from upright to read.
   */
  PAGE_LEFT = 4,
  UNRECOGNIZED = -1,
}

export function documentPageLayoutOrientationFromJSON(object: any): DocumentPageLayoutOrientation {
  switch (object) {
    case 0:
    case "ORIENTATION_UNSPECIFIED":
      return DocumentPageLayoutOrientation.UNSPECIFIED;
    case 1:
    case "PAGE_UP":
      return DocumentPageLayoutOrientation.PAGE_UP;
    case 2:
    case "PAGE_RIGHT":
      return DocumentPageLayoutOrientation.PAGE_RIGHT;
    case 3:
    case "PAGE_DOWN":
      return DocumentPageLayoutOrientation.PAGE_DOWN;
    case 4:
    case "PAGE_LEFT":
      return DocumentPageLayoutOrientation.PAGE_LEFT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DocumentPageLayoutOrientation.UNRECOGNIZED;
  }
}

export function documentPageLayoutOrientationToJSON(object: DocumentPageLayoutOrientation): string {
  switch (object) {
    case DocumentPageLayoutOrientation.UNSPECIFIED:
      return "ORIENTATION_UNSPECIFIED";
    case DocumentPageLayoutOrientation.PAGE_UP:
      return "PAGE_UP";
    case DocumentPageLayoutOrientation.PAGE_RIGHT:
      return "PAGE_RIGHT";
    case DocumentPageLayoutOrientation.PAGE_DOWN:
      return "PAGE_DOWN";
    case DocumentPageLayoutOrientation.PAGE_LEFT:
      return "PAGE_LEFT";
    case DocumentPageLayoutOrientation.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * A block has a set of lines (collected into paragraphs) that have a
 * common line-spacing and orientation.
 */
export interface DocumentPageBlock {
  $type?: "google.cloud.documentai.v1.Document.Page.Block";
  /** [Layout][google.cloud.documentai.v1.Document.Page.Layout] for [Block][google.cloud.documentai.v1.Document.Page.Block]. */
  layout?:
    | DocumentPageLayout
    | undefined;
  /** A list of detected languages together with confidence. */
  detectedLanguages?:
    | DocumentPageDetectedLanguage[]
    | undefined;
  /** The history of this annotation. */
  provenance?: DocumentProvenance | undefined;
}

/** A collection of lines that a human would perceive as a paragraph. */
export interface DocumentPageParagraph {
  $type?: "google.cloud.documentai.v1.Document.Page.Paragraph";
  /** [Layout][google.cloud.documentai.v1.Document.Page.Layout] for [Paragraph][google.cloud.documentai.v1.Document.Page.Paragraph]. */
  layout?:
    | DocumentPageLayout
    | undefined;
  /** A list of detected languages together with confidence. */
  detectedLanguages?:
    | DocumentPageDetectedLanguage[]
    | undefined;
  /** The  history of this annotation. */
  provenance?: DocumentProvenance | undefined;
}

/**
 * A collection of tokens that a human would perceive as a line.
 * Does not cross column boundaries, can be horizontal, vertical, etc.
 */
export interface DocumentPageLine {
  $type?: "google.cloud.documentai.v1.Document.Page.Line";
  /** [Layout][google.cloud.documentai.v1.Document.Page.Layout] for [Line][google.cloud.documentai.v1.Document.Page.Line]. */
  layout?:
    | DocumentPageLayout
    | undefined;
  /** A list of detected languages together with confidence. */
  detectedLanguages?:
    | DocumentPageDetectedLanguage[]
    | undefined;
  /** The  history of this annotation. */
  provenance?: DocumentProvenance | undefined;
}

/** A detected token. */
export interface DocumentPageToken {
  $type?: "google.cloud.documentai.v1.Document.Page.Token";
  /** [Layout][google.cloud.documentai.v1.Document.Page.Layout] for [Token][google.cloud.documentai.v1.Document.Page.Token]. */
  layout?:
    | DocumentPageLayout
    | undefined;
  /** Detected break at the end of a [Token][google.cloud.documentai.v1.Document.Page.Token]. */
  detectedBreak?:
    | DocumentPageTokenDetectedBreak
    | undefined;
  /** A list of detected languages together with confidence. */
  detectedLanguages?:
    | DocumentPageDetectedLanguage[]
    | undefined;
  /** The  history of this annotation. */
  provenance?: DocumentProvenance | undefined;
}

/** Detected break at the end of a [Token][google.cloud.documentai.v1.Document.Page.Token]. */
export interface DocumentPageTokenDetectedBreak {
  $type?: "google.cloud.documentai.v1.Document.Page.Token.DetectedBreak";
  /** Detected break type. */
  type?: DocumentPageTokenDetectedBreakType | undefined;
}

/** Enum to denote the type of break found. */
export enum DocumentPageTokenDetectedBreakType {
  /** UNSPECIFIED - Unspecified break type. */
  UNSPECIFIED = 0,
  /** SPACE - A single whitespace. */
  SPACE = 1,
  /** WIDE_SPACE - A wider whitespace. */
  WIDE_SPACE = 2,
  /** HYPHEN - A hyphen that indicates that a token has been split across lines. */
  HYPHEN = 3,
  UNRECOGNIZED = -1,
}

export function documentPageTokenDetectedBreakTypeFromJSON(object: any): DocumentPageTokenDetectedBreakType {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return DocumentPageTokenDetectedBreakType.UNSPECIFIED;
    case 1:
    case "SPACE":
      return DocumentPageTokenDetectedBreakType.SPACE;
    case 2:
    case "WIDE_SPACE":
      return DocumentPageTokenDetectedBreakType.WIDE_SPACE;
    case 3:
    case "HYPHEN":
      return DocumentPageTokenDetectedBreakType.HYPHEN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DocumentPageTokenDetectedBreakType.UNRECOGNIZED;
  }
}

export function documentPageTokenDetectedBreakTypeToJSON(object: DocumentPageTokenDetectedBreakType): string {
  switch (object) {
    case DocumentPageTokenDetectedBreakType.UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case DocumentPageTokenDetectedBreakType.SPACE:
      return "SPACE";
    case DocumentPageTokenDetectedBreakType.WIDE_SPACE:
      return "WIDE_SPACE";
    case DocumentPageTokenDetectedBreakType.HYPHEN:
      return "HYPHEN";
    case DocumentPageTokenDetectedBreakType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A detected symbol. */
export interface DocumentPageSymbol {
  $type?: "google.cloud.documentai.v1.Document.Page.Symbol";
  /** [Layout][google.cloud.documentai.v1.Document.Page.Layout] for [Symbol][google.cloud.documentai.v1.Document.Page.Symbol]. */
  layout?:
    | DocumentPageLayout
    | undefined;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: DocumentPageDetectedLanguage[] | undefined;
}

/**
 * Detected non-text visual elements e.g. checkbox, signature etc. on the
 * page.
 */
export interface DocumentPageVisualElement {
  $type?: "google.cloud.documentai.v1.Document.Page.VisualElement";
  /** [Layout][google.cloud.documentai.v1.Document.Page.Layout] for [VisualElement][google.cloud.documentai.v1.Document.Page.VisualElement]. */
  layout?:
    | DocumentPageLayout
    | undefined;
  /** Type of the [VisualElement][google.cloud.documentai.v1.Document.Page.VisualElement]. */
  type?:
    | string
    | undefined;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: DocumentPageDetectedLanguage[] | undefined;
}

/** A table representation similar to HTML table structure. */
export interface DocumentPageTable {
  $type?: "google.cloud.documentai.v1.Document.Page.Table";
  /** [Layout][google.cloud.documentai.v1.Document.Page.Layout] for [Table][google.cloud.documentai.v1.Document.Page.Table]. */
  layout?:
    | DocumentPageLayout
    | undefined;
  /** Header rows of the table. */
  headerRows?:
    | DocumentPageTableTableRow[]
    | undefined;
  /** Body rows of the table. */
  bodyRows?:
    | DocumentPageTableTableRow[]
    | undefined;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: DocumentPageDetectedLanguage[] | undefined;
}

/** A row of table cells. */
export interface DocumentPageTableTableRow {
  $type?: "google.cloud.documentai.v1.Document.Page.Table.TableRow";
  /** Cells that make up this row. */
  cells?: DocumentPageTableTableCell[] | undefined;
}

/** A cell representation inside the table. */
export interface DocumentPageTableTableCell {
  $type?: "google.cloud.documentai.v1.Document.Page.Table.TableCell";
  /** [Layout][google.cloud.documentai.v1.Document.Page.Layout] for [TableCell][google.cloud.documentai.v1.Document.Page.Table.TableCell]. */
  layout?:
    | DocumentPageLayout
    | undefined;
  /** How many rows this cell spans. */
  rowSpan?:
    | number
    | undefined;
  /** How many columns this cell spans. */
  colSpan?:
    | number
    | undefined;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: DocumentPageDetectedLanguage[] | undefined;
}

/** A form field detected on the page. */
export interface DocumentPageFormField {
  $type?: "google.cloud.documentai.v1.Document.Page.FormField";
  /**
   * [Layout][google.cloud.documentai.v1.Document.Page.Layout] for the [FormField][google.cloud.documentai.v1.Document.Page.FormField] name. e.g. `Address`, `Email`,
   * `Grand total`, `Phone number`, etc.
   */
  fieldName?:
    | DocumentPageLayout
    | undefined;
  /** [Layout][google.cloud.documentai.v1.Document.Page.Layout] for the [FormField][google.cloud.documentai.v1.Document.Page.FormField] value. */
  fieldValue?:
    | DocumentPageLayout
    | undefined;
  /** A list of detected languages for name together with confidence. */
  nameDetectedLanguages?:
    | DocumentPageDetectedLanguage[]
    | undefined;
  /** A list of detected languages for value together with confidence. */
  valueDetectedLanguages?:
    | DocumentPageDetectedLanguage[]
    | undefined;
  /**
   * If the value is non-textual, this field represents the type. Current
   * valid values are:
   * - blank (this indicates the field_value is normal text)
   * - "unfilled_checkbox"
   * - "filled_checkbox"
   */
  valueType?:
    | string
    | undefined;
  /**
   * Created for Labeling UI to export key text.
   * If corrections were made to the text identified by the
   * `field_name.text_anchor`, this field will contain the correction.
   */
  correctedKeyText?:
    | string
    | undefined;
  /**
   * Created for Labeling UI to export value text.
   * If corrections were made to the text identified by the
   * `field_value.text_anchor`, this field will contain the correction.
   */
  correctedValueText?:
    | string
    | undefined;
  /** The history of this annotation. */
  provenance?: DocumentProvenance | undefined;
}

/** A detected barcode. */
export interface DocumentPageDetectedBarcode {
  $type?: "google.cloud.documentai.v1.Document.Page.DetectedBarcode";
  /** [Layout][google.cloud.documentai.v1.Document.Page.Layout] for [DetectedBarcode][google.cloud.documentai.v1.Document.Page.DetectedBarcode]. */
  layout?:
    | DocumentPageLayout
    | undefined;
  /** Detailed barcode information of the [DetectedBarcode][google.cloud.documentai.v1.Document.Page.DetectedBarcode]. */
  barcode?: Barcode | undefined;
}

/** Detected language for a structural component. */
export interface DocumentPageDetectedLanguage {
  $type?: "google.cloud.documentai.v1.Document.Page.DetectedLanguage";
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * https://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?:
    | string
    | undefined;
  /** Confidence of detected language. Range [0, 1]. */
  confidence?: number | undefined;
}

/**
 * An entity that could be a phrase in the text or a property that belongs to
 * the document. It is a known entity type, such as a person, an organization,
 * or location.
 */
export interface DocumentEntity {
  $type?: "google.cloud.documentai.v1.Document.Entity";
  /**
   * Optional. Provenance of the entity.
   * Text anchor indexing into the [Document.text][google.cloud.documentai.v1.Document.text].
   */
  textAnchor?:
    | DocumentTextAnchor
    | undefined;
  /** Required. Entity type from a schema e.g. `Address`. */
  type?:
    | string
    | undefined;
  /**
   * Optional. Text value in the document e.g. `1600 Amphitheatre Pkwy`. If the entity
   * is not present in the document, this field will be empty.
   */
  mentionText?:
    | string
    | undefined;
  /** Optional. Deprecated.  Use `id` field instead. */
  mentionId?:
    | string
    | undefined;
  /** Optional. Confidence of detected Schema entity. Range [0, 1]. */
  confidence?:
    | number
    | undefined;
  /**
   * Optional. Represents the provenance of this entity wrt. the location on the
   * page where it was found.
   */
  pageAnchor?:
    | DocumentPageAnchor
    | undefined;
  /**
   * Optional. Canonical id. This will be a unique value in the entity list
   * for this document.
   */
  id?:
    | string
    | undefined;
  /**
   * Optional. Normalized entity value. Absent if the extracted value could not be
   * converted or the type (e.g. address) is not supported for certain
   * parsers. This field is also only populated for certain supported document
   * types.
   */
  normalizedValue?:
    | DocumentEntityNormalizedValue
    | undefined;
  /**
   * Optional. Entities can be nested to form a hierarchical data structure representing
   * the content in the document.
   */
  properties?:
    | DocumentEntity[]
    | undefined;
  /** Optional. The history of this annotation. */
  provenance?:
    | DocumentProvenance
    | undefined;
  /** Optional. Whether the entity will be redacted for de-identification purposes. */
  redacted?: boolean | undefined;
}

/** Parsed and normalized entity value. */
export interface DocumentEntityNormalizedValue {
  $type?: "google.cloud.documentai.v1.Document.Entity.NormalizedValue";
  /**
   * Money value. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/money.proto
   */
  moneyValue?:
    | Money
    | undefined;
  /**
   * Date value. Includes year, month, day. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/date.proto
   */
  dateValue?:
    | DateMessage
    | undefined;
  /**
   * DateTime value. Includes date, time, and timezone. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/datetime.proto
   */
  datetimeValue?:
    | DateTime
    | undefined;
  /**
   * Postal address. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/postal_address.proto
   */
  addressValue?:
    | PostalAddress
    | undefined;
  /**
   * Boolean value. Can be used for entities with binary values, or for
   * checkboxes.
   */
  booleanValue?:
    | boolean
    | undefined;
  /** Integer value. */
  integerValue?:
    | number
    | undefined;
  /** Float value. */
  floatValue?:
    | number
    | undefined;
  /**
   * Optional. An optional field to store a normalized string.
   * For some entity types, one of respective `structured_value` fields may
   * also be populated. Also not all the types of `structured_value` will be
   * normalized. For example, some processors may not generate float
   * or int normalized text by default.
   *
   * Below are sample formats mapped to structured values.
   * - Money/Currency type (`money_value`) is in the ISO 4217 text format.
   * - Date type (`date_value`) is in the ISO 8601 text format.
   * - Datetime type (`datetime_value`) is in the ISO 8601 text format.
   */
  text?: string | undefined;
}

/** Relationship between [Entities][google.cloud.documentai.v1.Document.Entity]. */
export interface DocumentEntityRelation {
  $type?: "google.cloud.documentai.v1.Document.EntityRelation";
  /** Subject entity id. */
  subjectId?:
    | string
    | undefined;
  /** Object entity id. */
  objectId?:
    | string
    | undefined;
  /** Relationship description. */
  relation?: string | undefined;
}

/** Text reference indexing into the [Document.text][google.cloud.documentai.v1.Document.text]. */
export interface DocumentTextAnchor {
  $type?: "google.cloud.documentai.v1.Document.TextAnchor";
  /** The text segments from the [Document.text][google.cloud.documentai.v1.Document.text]. */
  textSegments?:
    | DocumentTextAnchorTextSegment[]
    | undefined;
  /**
   * Contains the content of the text span so that users do
   * not have to look it up in the text_segments.  It is always
   * populated for formFields.
   */
  content?: string | undefined;
}

/**
 * A text segment in the [Document.text][google.cloud.documentai.v1.Document.text]. The indices may be out of bounds
 * which indicate that the text extends into another document shard for
 * large sharded documents. See [ShardInfo.text_offset][google.cloud.documentai.v1.Document.ShardInfo.text_offset]
 */
export interface DocumentTextAnchorTextSegment {
  $type?: "google.cloud.documentai.v1.Document.TextAnchor.TextSegment";
  /** [TextSegment][google.cloud.documentai.v1.Document.TextAnchor.TextSegment] start UTF-8 char index in the [Document.text][google.cloud.documentai.v1.Document.text]. */
  startIndex?:
    | number
    | undefined;
  /**
   * [TextSegment][google.cloud.documentai.v1.Document.TextAnchor.TextSegment] half open end UTF-8 char index in the
   * [Document.text][google.cloud.documentai.v1.Document.text].
   */
  endIndex?: number | undefined;
}

/**
 * Referencing the visual context of the entity in the [Document.pages][google.cloud.documentai.v1.Document.pages].
 * Page anchors can be cross-page, consist of multiple bounding polygons and
 * optionally reference specific layout element types.
 */
export interface DocumentPageAnchor {
  $type?: "google.cloud.documentai.v1.Document.PageAnchor";
  /** One or more references to visual page elements */
  pageRefs?: DocumentPageAnchorPageRef[] | undefined;
}

/** Represents a weak reference to a page element within a document. */
export interface DocumentPageAnchorPageRef {
  $type?: "google.cloud.documentai.v1.Document.PageAnchor.PageRef";
  /**
   * Required. Index into the [Document.pages][google.cloud.documentai.v1.Document.pages] element, for example using
   * [Document.pages][page_refs.page] to locate the related page element.
   * This field is skipped when its value is the default 0. See
   * https://developers.google.com/protocol-buffers/docs/proto3#json.
   */
  page?:
    | number
    | undefined;
  /** Optional. The type of the layout element that is being referenced if any. */
  layoutType?:
    | DocumentPageAnchorPageRefLayoutType
    | undefined;
  /**
   * Optional. Deprecated.  Use [PageRef.bounding_poly][google.cloud.documentai.v1.Document.PageAnchor.PageRef.bounding_poly] instead.
   *
   * @deprecated
   */
  layoutId?:
    | string
    | undefined;
  /** Optional. Identifies the bounding polygon of a layout element on the page. */
  boundingPoly?:
    | BoundingPoly
    | undefined;
  /** Optional. Confidence of detected page element, if applicable. Range [0, 1]. */
  confidence?: number | undefined;
}

/** The type of layout that is being referenced. */
export enum DocumentPageAnchorPageRefLayoutType {
  /** UNSPECIFIED - Layout Unspecified. */
  UNSPECIFIED = 0,
  /** BLOCK - References a [Page.blocks][google.cloud.documentai.v1.Document.Page.blocks] element. */
  BLOCK = 1,
  /** PARAGRAPH - References a [Page.paragraphs][google.cloud.documentai.v1.Document.Page.paragraphs] element. */
  PARAGRAPH = 2,
  /** LINE - References a [Page.lines][google.cloud.documentai.v1.Document.Page.lines] element. */
  LINE = 3,
  /** TOKEN - References a [Page.tokens][google.cloud.documentai.v1.Document.Page.tokens] element. */
  TOKEN = 4,
  /** VISUAL_ELEMENT - References a [Page.visual_elements][google.cloud.documentai.v1.Document.Page.visual_elements] element. */
  VISUAL_ELEMENT = 5,
  /** TABLE - Refrrences a [Page.tables][google.cloud.documentai.v1.Document.Page.tables] element. */
  TABLE = 6,
  /** FORM_FIELD - References a [Page.form_fields][google.cloud.documentai.v1.Document.Page.form_fields] element. */
  FORM_FIELD = 7,
  UNRECOGNIZED = -1,
}

export function documentPageAnchorPageRefLayoutTypeFromJSON(object: any): DocumentPageAnchorPageRefLayoutType {
  switch (object) {
    case 0:
    case "LAYOUT_TYPE_UNSPECIFIED":
      return DocumentPageAnchorPageRefLayoutType.UNSPECIFIED;
    case 1:
    case "BLOCK":
      return DocumentPageAnchorPageRefLayoutType.BLOCK;
    case 2:
    case "PARAGRAPH":
      return DocumentPageAnchorPageRefLayoutType.PARAGRAPH;
    case 3:
    case "LINE":
      return DocumentPageAnchorPageRefLayoutType.LINE;
    case 4:
    case "TOKEN":
      return DocumentPageAnchorPageRefLayoutType.TOKEN;
    case 5:
    case "VISUAL_ELEMENT":
      return DocumentPageAnchorPageRefLayoutType.VISUAL_ELEMENT;
    case 6:
    case "TABLE":
      return DocumentPageAnchorPageRefLayoutType.TABLE;
    case 7:
    case "FORM_FIELD":
      return DocumentPageAnchorPageRefLayoutType.FORM_FIELD;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DocumentPageAnchorPageRefLayoutType.UNRECOGNIZED;
  }
}

export function documentPageAnchorPageRefLayoutTypeToJSON(object: DocumentPageAnchorPageRefLayoutType): string {
  switch (object) {
    case DocumentPageAnchorPageRefLayoutType.UNSPECIFIED:
      return "LAYOUT_TYPE_UNSPECIFIED";
    case DocumentPageAnchorPageRefLayoutType.BLOCK:
      return "BLOCK";
    case DocumentPageAnchorPageRefLayoutType.PARAGRAPH:
      return "PARAGRAPH";
    case DocumentPageAnchorPageRefLayoutType.LINE:
      return "LINE";
    case DocumentPageAnchorPageRefLayoutType.TOKEN:
      return "TOKEN";
    case DocumentPageAnchorPageRefLayoutType.VISUAL_ELEMENT:
      return "VISUAL_ELEMENT";
    case DocumentPageAnchorPageRefLayoutType.TABLE:
      return "TABLE";
    case DocumentPageAnchorPageRefLayoutType.FORM_FIELD:
      return "FORM_FIELD";
    case DocumentPageAnchorPageRefLayoutType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Structure to identify provenance relationships between annotations in
 * different revisions.
 */
export interface DocumentProvenance {
  $type?: "google.cloud.documentai.v1.Document.Provenance";
  /** The index of the revision that produced this element. */
  revision?:
    | number
    | undefined;
  /**
   * The Id of this operation.  Needs to be unique within the scope of the
   * revision.
   *
   * @deprecated
   */
  id?:
    | number
    | undefined;
  /** References to the original elements that are replaced. */
  parents?:
    | DocumentProvenanceParent[]
    | undefined;
  /** The type of provenance operation. */
  type?: DocumentProvenanceOperationType | undefined;
}

/** If a processor or agent does an explicit operation on existing elements. */
export enum DocumentProvenanceOperationType {
  /**
   * UNSPECIFIED - Operation type unspecified. If no operation is specified a provenance
   * entry is simply used to match against a `parent`.
   */
  UNSPECIFIED = 0,
  /** ADD - Add an element. */
  ADD = 1,
  /** REMOVE - Remove an element identified by `parent`. */
  REMOVE = 2,
  /** REPLACE - Replace an element identified by `parent`. */
  REPLACE = 3,
  /** EVAL_REQUESTED - Request human review for the element identified by `parent`. */
  EVAL_REQUESTED = 4,
  /**
   * EVAL_APPROVED - Element is reviewed and approved at human review, confidence will be
   * set to 1.0.
   */
  EVAL_APPROVED = 5,
  /** EVAL_SKIPPED - Element is skipped in the validation process. */
  EVAL_SKIPPED = 6,
  UNRECOGNIZED = -1,
}

export function documentProvenanceOperationTypeFromJSON(object: any): DocumentProvenanceOperationType {
  switch (object) {
    case 0:
    case "OPERATION_TYPE_UNSPECIFIED":
      return DocumentProvenanceOperationType.UNSPECIFIED;
    case 1:
    case "ADD":
      return DocumentProvenanceOperationType.ADD;
    case 2:
    case "REMOVE":
      return DocumentProvenanceOperationType.REMOVE;
    case 3:
    case "REPLACE":
      return DocumentProvenanceOperationType.REPLACE;
    case 4:
    case "EVAL_REQUESTED":
      return DocumentProvenanceOperationType.EVAL_REQUESTED;
    case 5:
    case "EVAL_APPROVED":
      return DocumentProvenanceOperationType.EVAL_APPROVED;
    case 6:
    case "EVAL_SKIPPED":
      return DocumentProvenanceOperationType.EVAL_SKIPPED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DocumentProvenanceOperationType.UNRECOGNIZED;
  }
}

export function documentProvenanceOperationTypeToJSON(object: DocumentProvenanceOperationType): string {
  switch (object) {
    case DocumentProvenanceOperationType.UNSPECIFIED:
      return "OPERATION_TYPE_UNSPECIFIED";
    case DocumentProvenanceOperationType.ADD:
      return "ADD";
    case DocumentProvenanceOperationType.REMOVE:
      return "REMOVE";
    case DocumentProvenanceOperationType.REPLACE:
      return "REPLACE";
    case DocumentProvenanceOperationType.EVAL_REQUESTED:
      return "EVAL_REQUESTED";
    case DocumentProvenanceOperationType.EVAL_APPROVED:
      return "EVAL_APPROVED";
    case DocumentProvenanceOperationType.EVAL_SKIPPED:
      return "EVAL_SKIPPED";
    case DocumentProvenanceOperationType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The parent element the current element is based on. Used for
 * referencing/aligning, removal and replacement operations.
 */
export interface DocumentProvenanceParent {
  $type?: "google.cloud.documentai.v1.Document.Provenance.Parent";
  /** The index of the index into current revision's parent_ids list. */
  revision?:
    | number
    | undefined;
  /**
   * The index of the parent item in the corresponding item list (eg. list
   * of entities, properties within entities, etc.) in the parent revision.
   */
  index?:
    | number
    | undefined;
  /**
   * The id of the parent provenance.
   *
   * @deprecated
   */
  id?: number | undefined;
}

/** Contains past or forward revisions of this document. */
export interface DocumentRevision {
  $type?: "google.cloud.documentai.v1.Document.Revision";
  /**
   * If the change was made by a person specify the name or id of that
   * person.
   */
  agent?:
    | string
    | undefined;
  /**
   * If the annotation was made by processor identify the processor by its
   * resource name.
   */
  processor?:
    | string
    | undefined;
  /** Id of the revision.  Unique within the context of the document. */
  id?:
    | string
    | undefined;
  /**
   * The revisions that this revision is based on.  This can include one or
   * more parent (when documents are merged.)  This field represents the
   * index into the `revisions` field.
   *
   * @deprecated
   */
  parent?:
    | number[]
    | undefined;
  /**
   * The revisions that this revision is based on. Must include all the ids
   * that have anything to do with this revision - eg. there are
   * `provenance.parent.revision` fields that index into this field.
   */
  parentIds?:
    | string[]
    | undefined;
  /** The time that the revision was created. */
  createTime?:
    | Date
    | undefined;
  /** Human Review information of this revision. */
  humanReview?: DocumentRevisionHumanReview | undefined;
}

/** Human Review information of the document. */
export interface DocumentRevisionHumanReview {
  $type?: "google.cloud.documentai.v1.Document.Revision.HumanReview";
  /** Human review state. e.g. `requested`, `succeeded`, `rejected`. */
  state?:
    | string
    | undefined;
  /**
   * A message providing more details about the current state of processing.
   * For example, the rejection reason when the state is `rejected`.
   */
  stateMessage?: string | undefined;
}

/** This message is used for text changes aka. OCR corrections. */
export interface DocumentTextChange {
  $type?: "google.cloud.documentai.v1.Document.TextChange";
  /**
   * Provenance of the correction.
   * Text anchor indexing into the [Document.text][google.cloud.documentai.v1.Document.text].  There can only be a
   * single `TextAnchor.text_segments` element.  If the start and
   * end index of the text segment are the same, the text change is inserted
   * before that index.
   */
  textAnchor?:
    | DocumentTextAnchor
    | undefined;
  /** The text that replaces the text identified in the `text_anchor`. */
  changedText?:
    | string
    | undefined;
  /** The history of this annotation. */
  provenance?: DocumentProvenance[] | undefined;
}

function createBaseDocument(): Document {
  return {
    $type: "google.cloud.documentai.v1.Document",
    uri: undefined,
    content: undefined,
    mimeType: "",
    text: "",
    textStyles: [],
    pages: [],
    entities: [],
    entityRelations: [],
    textChanges: [],
    shardInfo: undefined,
    error: undefined,
    revisions: [],
  };
}

export const Document = {
  $type: "google.cloud.documentai.v1.Document" as const,

  encode(message: Document, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uri !== undefined) {
      writer.uint32(10).string(message.uri);
    }
    if (message.content !== undefined) {
      writer.uint32(18).bytes(message.content);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      writer.uint32(26).string(message.mimeType);
    }
    if (message.text !== undefined && message.text !== "") {
      writer.uint32(34).string(message.text);
    }
    if (message.textStyles !== undefined && message.textStyles.length !== 0) {
      for (const v of message.textStyles) {
        DocumentStyle.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.pages !== undefined && message.pages.length !== 0) {
      for (const v of message.pages) {
        DocumentPage.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    if (message.entities !== undefined && message.entities.length !== 0) {
      for (const v of message.entities) {
        DocumentEntity.encode(v!, writer.uint32(58).fork()).ldelim();
      }
    }
    if (message.entityRelations !== undefined && message.entityRelations.length !== 0) {
      for (const v of message.entityRelations) {
        DocumentEntityRelation.encode(v!, writer.uint32(66).fork()).ldelim();
      }
    }
    if (message.textChanges !== undefined && message.textChanges.length !== 0) {
      for (const v of message.textChanges) {
        DocumentTextChange.encode(v!, writer.uint32(114).fork()).ldelim();
      }
    }
    if (message.shardInfo !== undefined) {
      DocumentShardInfo.encode(message.shardInfo, writer.uint32(74).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Status.encode(message.error, writer.uint32(82).fork()).ldelim();
    }
    if (message.revisions !== undefined && message.revisions.length !== 0) {
      for (const v of message.revisions) {
        DocumentRevision.encode(v!, writer.uint32(106).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Document {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.content = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.mimeType = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.text = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.textStyles!.push(DocumentStyle.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.pages!.push(DocumentPage.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.entities!.push(DocumentEntity.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.entityRelations!.push(DocumentEntityRelation.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.textChanges!.push(DocumentTextChange.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.shardInfo = DocumentShardInfo.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.error = Status.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.revisions!.push(DocumentRevision.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Document {
    return {
      $type: Document.$type,
      uri: isSet(object.uri) ? globalThis.String(object.uri) : undefined,
      content: isSet(object.content) ? bytesFromBase64(object.content) : undefined,
      mimeType: isSet(object.mimeType) ? globalThis.String(object.mimeType) : "",
      text: isSet(object.text) ? globalThis.String(object.text) : "",
      textStyles: globalThis.Array.isArray(object?.textStyles)
        ? object.textStyles.map((e: any) => DocumentStyle.fromJSON(e))
        : [],
      pages: globalThis.Array.isArray(object?.pages) ? object.pages.map((e: any) => DocumentPage.fromJSON(e)) : [],
      entities: globalThis.Array.isArray(object?.entities)
        ? object.entities.map((e: any) => DocumentEntity.fromJSON(e))
        : [],
      entityRelations: globalThis.Array.isArray(object?.entityRelations)
        ? object.entityRelations.map((e: any) => DocumentEntityRelation.fromJSON(e))
        : [],
      textChanges: globalThis.Array.isArray(object?.textChanges)
        ? object.textChanges.map((e: any) => DocumentTextChange.fromJSON(e))
        : [],
      shardInfo: isSet(object.shardInfo) ? DocumentShardInfo.fromJSON(object.shardInfo) : undefined,
      error: isSet(object.error) ? Status.fromJSON(object.error) : undefined,
      revisions: globalThis.Array.isArray(object?.revisions)
        ? object.revisions.map((e: any) => DocumentRevision.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Document): unknown {
    const obj: any = {};
    if (message.uri !== undefined) {
      obj.uri = message.uri;
    }
    if (message.content !== undefined) {
      obj.content = base64FromBytes(message.content);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      obj.mimeType = message.mimeType;
    }
    if (message.text !== undefined && message.text !== "") {
      obj.text = message.text;
    }
    if (message.textStyles?.length) {
      obj.textStyles = message.textStyles.map((e) => DocumentStyle.toJSON(e));
    }
    if (message.pages?.length) {
      obj.pages = message.pages.map((e) => DocumentPage.toJSON(e));
    }
    if (message.entities?.length) {
      obj.entities = message.entities.map((e) => DocumentEntity.toJSON(e));
    }
    if (message.entityRelations?.length) {
      obj.entityRelations = message.entityRelations.map((e) => DocumentEntityRelation.toJSON(e));
    }
    if (message.textChanges?.length) {
      obj.textChanges = message.textChanges.map((e) => DocumentTextChange.toJSON(e));
    }
    if (message.shardInfo !== undefined) {
      obj.shardInfo = DocumentShardInfo.toJSON(message.shardInfo);
    }
    if (message.error !== undefined) {
      obj.error = Status.toJSON(message.error);
    }
    if (message.revisions?.length) {
      obj.revisions = message.revisions.map((e) => DocumentRevision.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Document>, I>>(base?: I): Document {
    return Document.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Document>, I>>(object: I): Document {
    const message = createBaseDocument();
    message.uri = object.uri ?? undefined;
    message.content = object.content ?? undefined;
    message.mimeType = object.mimeType ?? "";
    message.text = object.text ?? "";
    message.textStyles = object.textStyles?.map((e) => DocumentStyle.fromPartial(e)) || [];
    message.pages = object.pages?.map((e) => DocumentPage.fromPartial(e)) || [];
    message.entities = object.entities?.map((e) => DocumentEntity.fromPartial(e)) || [];
    message.entityRelations = object.entityRelations?.map((e) => DocumentEntityRelation.fromPartial(e)) || [];
    message.textChanges = object.textChanges?.map((e) => DocumentTextChange.fromPartial(e)) || [];
    message.shardInfo = (object.shardInfo !== undefined && object.shardInfo !== null)
      ? DocumentShardInfo.fromPartial(object.shardInfo)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? Status.fromPartial(object.error)
      : undefined;
    message.revisions = object.revisions?.map((e) => DocumentRevision.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(Document.$type, Document);

function createBaseDocumentShardInfo(): DocumentShardInfo {
  return { $type: "google.cloud.documentai.v1.Document.ShardInfo", shardIndex: 0, shardCount: 0, textOffset: 0 };
}

export const DocumentShardInfo = {
  $type: "google.cloud.documentai.v1.Document.ShardInfo" as const,

  encode(message: DocumentShardInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.shardIndex !== undefined && message.shardIndex !== 0) {
      writer.uint32(8).int64(message.shardIndex);
    }
    if (message.shardCount !== undefined && message.shardCount !== 0) {
      writer.uint32(16).int64(message.shardCount);
    }
    if (message.textOffset !== undefined && message.textOffset !== 0) {
      writer.uint32(24).int64(message.textOffset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentShardInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentShardInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.shardIndex = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.shardCount = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.textOffset = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentShardInfo {
    return {
      $type: DocumentShardInfo.$type,
      shardIndex: isSet(object.shardIndex) ? globalThis.Number(object.shardIndex) : 0,
      shardCount: isSet(object.shardCount) ? globalThis.Number(object.shardCount) : 0,
      textOffset: isSet(object.textOffset) ? globalThis.Number(object.textOffset) : 0,
    };
  },

  toJSON(message: DocumentShardInfo): unknown {
    const obj: any = {};
    if (message.shardIndex !== undefined && message.shardIndex !== 0) {
      obj.shardIndex = Math.round(message.shardIndex);
    }
    if (message.shardCount !== undefined && message.shardCount !== 0) {
      obj.shardCount = Math.round(message.shardCount);
    }
    if (message.textOffset !== undefined && message.textOffset !== 0) {
      obj.textOffset = Math.round(message.textOffset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentShardInfo>, I>>(base?: I): DocumentShardInfo {
    return DocumentShardInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentShardInfo>, I>>(object: I): DocumentShardInfo {
    const message = createBaseDocumentShardInfo();
    message.shardIndex = object.shardIndex ?? 0;
    message.shardCount = object.shardCount ?? 0;
    message.textOffset = object.textOffset ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DocumentShardInfo.$type, DocumentShardInfo);

function createBaseDocumentStyle(): DocumentStyle {
  return {
    $type: "google.cloud.documentai.v1.Document.Style",
    textAnchor: undefined,
    color: undefined,
    backgroundColor: undefined,
    fontWeight: "",
    textStyle: "",
    textDecoration: "",
    fontSize: undefined,
  };
}

export const DocumentStyle = {
  $type: "google.cloud.documentai.v1.Document.Style" as const,

  encode(message: DocumentStyle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.textAnchor !== undefined) {
      DocumentTextAnchor.encode(message.textAnchor, writer.uint32(10).fork()).ldelim();
    }
    if (message.color !== undefined) {
      Color.encode(message.color, writer.uint32(18).fork()).ldelim();
    }
    if (message.backgroundColor !== undefined) {
      Color.encode(message.backgroundColor, writer.uint32(26).fork()).ldelim();
    }
    if (message.fontWeight !== undefined && message.fontWeight !== "") {
      writer.uint32(34).string(message.fontWeight);
    }
    if (message.textStyle !== undefined && message.textStyle !== "") {
      writer.uint32(42).string(message.textStyle);
    }
    if (message.textDecoration !== undefined && message.textDecoration !== "") {
      writer.uint32(50).string(message.textDecoration);
    }
    if (message.fontSize !== undefined) {
      DocumentStyleFontSize.encode(message.fontSize, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentStyle {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentStyle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.textAnchor = DocumentTextAnchor.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.color = Color.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.backgroundColor = Color.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fontWeight = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.textStyle = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.textDecoration = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.fontSize = DocumentStyleFontSize.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentStyle {
    return {
      $type: DocumentStyle.$type,
      textAnchor: isSet(object.textAnchor) ? DocumentTextAnchor.fromJSON(object.textAnchor) : undefined,
      color: isSet(object.color) ? Color.fromJSON(object.color) : undefined,
      backgroundColor: isSet(object.backgroundColor) ? Color.fromJSON(object.backgroundColor) : undefined,
      fontWeight: isSet(object.fontWeight) ? globalThis.String(object.fontWeight) : "",
      textStyle: isSet(object.textStyle) ? globalThis.String(object.textStyle) : "",
      textDecoration: isSet(object.textDecoration) ? globalThis.String(object.textDecoration) : "",
      fontSize: isSet(object.fontSize) ? DocumentStyleFontSize.fromJSON(object.fontSize) : undefined,
    };
  },

  toJSON(message: DocumentStyle): unknown {
    const obj: any = {};
    if (message.textAnchor !== undefined) {
      obj.textAnchor = DocumentTextAnchor.toJSON(message.textAnchor);
    }
    if (message.color !== undefined) {
      obj.color = Color.toJSON(message.color);
    }
    if (message.backgroundColor !== undefined) {
      obj.backgroundColor = Color.toJSON(message.backgroundColor);
    }
    if (message.fontWeight !== undefined && message.fontWeight !== "") {
      obj.fontWeight = message.fontWeight;
    }
    if (message.textStyle !== undefined && message.textStyle !== "") {
      obj.textStyle = message.textStyle;
    }
    if (message.textDecoration !== undefined && message.textDecoration !== "") {
      obj.textDecoration = message.textDecoration;
    }
    if (message.fontSize !== undefined) {
      obj.fontSize = DocumentStyleFontSize.toJSON(message.fontSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentStyle>, I>>(base?: I): DocumentStyle {
    return DocumentStyle.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentStyle>, I>>(object: I): DocumentStyle {
    const message = createBaseDocumentStyle();
    message.textAnchor = (object.textAnchor !== undefined && object.textAnchor !== null)
      ? DocumentTextAnchor.fromPartial(object.textAnchor)
      : undefined;
    message.color = (object.color !== undefined && object.color !== null) ? Color.fromPartial(object.color) : undefined;
    message.backgroundColor = (object.backgroundColor !== undefined && object.backgroundColor !== null)
      ? Color.fromPartial(object.backgroundColor)
      : undefined;
    message.fontWeight = object.fontWeight ?? "";
    message.textStyle = object.textStyle ?? "";
    message.textDecoration = object.textDecoration ?? "";
    message.fontSize = (object.fontSize !== undefined && object.fontSize !== null)
      ? DocumentStyleFontSize.fromPartial(object.fontSize)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DocumentStyle.$type, DocumentStyle);

function createBaseDocumentStyleFontSize(): DocumentStyleFontSize {
  return { $type: "google.cloud.documentai.v1.Document.Style.FontSize", size: 0, unit: "" };
}

export const DocumentStyleFontSize = {
  $type: "google.cloud.documentai.v1.Document.Style.FontSize" as const,

  encode(message: DocumentStyleFontSize, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.size !== undefined && message.size !== 0) {
      writer.uint32(13).float(message.size);
    }
    if (message.unit !== undefined && message.unit !== "") {
      writer.uint32(18).string(message.unit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentStyleFontSize {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentStyleFontSize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.size = reader.float();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.unit = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentStyleFontSize {
    return {
      $type: DocumentStyleFontSize.$type,
      size: isSet(object.size) ? globalThis.Number(object.size) : 0,
      unit: isSet(object.unit) ? globalThis.String(object.unit) : "",
    };
  },

  toJSON(message: DocumentStyleFontSize): unknown {
    const obj: any = {};
    if (message.size !== undefined && message.size !== 0) {
      obj.size = message.size;
    }
    if (message.unit !== undefined && message.unit !== "") {
      obj.unit = message.unit;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentStyleFontSize>, I>>(base?: I): DocumentStyleFontSize {
    return DocumentStyleFontSize.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentStyleFontSize>, I>>(object: I): DocumentStyleFontSize {
    const message = createBaseDocumentStyleFontSize();
    message.size = object.size ?? 0;
    message.unit = object.unit ?? "";
    return message;
  },
};

messageTypeRegistry.set(DocumentStyleFontSize.$type, DocumentStyleFontSize);

function createBaseDocumentPage(): DocumentPage {
  return {
    $type: "google.cloud.documentai.v1.Document.Page",
    pageNumber: 0,
    image: undefined,
    transforms: [],
    dimension: undefined,
    layout: undefined,
    detectedLanguages: [],
    blocks: [],
    paragraphs: [],
    lines: [],
    tokens: [],
    visualElements: [],
    tables: [],
    formFields: [],
    symbols: [],
    detectedBarcodes: [],
    provenance: undefined,
  };
}

export const DocumentPage = {
  $type: "google.cloud.documentai.v1.Document.Page" as const,

  encode(message: DocumentPage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      writer.uint32(8).int32(message.pageNumber);
    }
    if (message.image !== undefined) {
      DocumentPageImage.encode(message.image, writer.uint32(106).fork()).ldelim();
    }
    if (message.transforms !== undefined && message.transforms.length !== 0) {
      for (const v of message.transforms) {
        DocumentPageMatrix.encode(v!, writer.uint32(114).fork()).ldelim();
      }
    }
    if (message.dimension !== undefined) {
      DocumentPageDimension.encode(message.dimension, writer.uint32(18).fork()).ldelim();
    }
    if (message.layout !== undefined) {
      DocumentPageLayout.encode(message.layout, writer.uint32(26).fork()).ldelim();
    }
    if (message.detectedLanguages !== undefined && message.detectedLanguages.length !== 0) {
      for (const v of message.detectedLanguages) {
        DocumentPageDetectedLanguage.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.blocks !== undefined && message.blocks.length !== 0) {
      for (const v of message.blocks) {
        DocumentPageBlock.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.paragraphs !== undefined && message.paragraphs.length !== 0) {
      for (const v of message.paragraphs) {
        DocumentPageParagraph.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    if (message.lines !== undefined && message.lines.length !== 0) {
      for (const v of message.lines) {
        DocumentPageLine.encode(v!, writer.uint32(58).fork()).ldelim();
      }
    }
    if (message.tokens !== undefined && message.tokens.length !== 0) {
      for (const v of message.tokens) {
        DocumentPageToken.encode(v!, writer.uint32(66).fork()).ldelim();
      }
    }
    if (message.visualElements !== undefined && message.visualElements.length !== 0) {
      for (const v of message.visualElements) {
        DocumentPageVisualElement.encode(v!, writer.uint32(74).fork()).ldelim();
      }
    }
    if (message.tables !== undefined && message.tables.length !== 0) {
      for (const v of message.tables) {
        DocumentPageTable.encode(v!, writer.uint32(82).fork()).ldelim();
      }
    }
    if (message.formFields !== undefined && message.formFields.length !== 0) {
      for (const v of message.formFields) {
        DocumentPageFormField.encode(v!, writer.uint32(90).fork()).ldelim();
      }
    }
    if (message.symbols !== undefined && message.symbols.length !== 0) {
      for (const v of message.symbols) {
        DocumentPageSymbol.encode(v!, writer.uint32(98).fork()).ldelim();
      }
    }
    if (message.detectedBarcodes !== undefined && message.detectedBarcodes.length !== 0) {
      for (const v of message.detectedBarcodes) {
        DocumentPageDetectedBarcode.encode(v!, writer.uint32(122).fork()).ldelim();
      }
    }
    if (message.provenance !== undefined) {
      DocumentProvenance.encode(message.provenance, writer.uint32(130).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.pageNumber = reader.int32();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.image = DocumentPageImage.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.transforms!.push(DocumentPageMatrix.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.dimension = DocumentPageDimension.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.layout = DocumentPageLayout.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.detectedLanguages!.push(DocumentPageDetectedLanguage.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.blocks!.push(DocumentPageBlock.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.paragraphs!.push(DocumentPageParagraph.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.lines!.push(DocumentPageLine.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.tokens!.push(DocumentPageToken.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.visualElements!.push(DocumentPageVisualElement.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.tables!.push(DocumentPageTable.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.formFields!.push(DocumentPageFormField.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.symbols!.push(DocumentPageSymbol.decode(reader, reader.uint32()));
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.detectedBarcodes!.push(DocumentPageDetectedBarcode.decode(reader, reader.uint32()));
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.provenance = DocumentProvenance.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPage {
    return {
      $type: DocumentPage.$type,
      pageNumber: isSet(object.pageNumber) ? globalThis.Number(object.pageNumber) : 0,
      image: isSet(object.image) ? DocumentPageImage.fromJSON(object.image) : undefined,
      transforms: globalThis.Array.isArray(object?.transforms)
        ? object.transforms.map((e: any) => DocumentPageMatrix.fromJSON(e))
        : [],
      dimension: isSet(object.dimension) ? DocumentPageDimension.fromJSON(object.dimension) : undefined,
      layout: isSet(object.layout) ? DocumentPageLayout.fromJSON(object.layout) : undefined,
      detectedLanguages: globalThis.Array.isArray(object?.detectedLanguages)
        ? object.detectedLanguages.map((e: any) => DocumentPageDetectedLanguage.fromJSON(e))
        : [],
      blocks: globalThis.Array.isArray(object?.blocks)
        ? object.blocks.map((e: any) => DocumentPageBlock.fromJSON(e))
        : [],
      paragraphs: globalThis.Array.isArray(object?.paragraphs)
        ? object.paragraphs.map((e: any) => DocumentPageParagraph.fromJSON(e))
        : [],
      lines: globalThis.Array.isArray(object?.lines) ? object.lines.map((e: any) => DocumentPageLine.fromJSON(e)) : [],
      tokens: globalThis.Array.isArray(object?.tokens)
        ? object.tokens.map((e: any) => DocumentPageToken.fromJSON(e))
        : [],
      visualElements: globalThis.Array.isArray(object?.visualElements)
        ? object.visualElements.map((e: any) => DocumentPageVisualElement.fromJSON(e))
        : [],
      tables: globalThis.Array.isArray(object?.tables)
        ? object.tables.map((e: any) => DocumentPageTable.fromJSON(e))
        : [],
      formFields: globalThis.Array.isArray(object?.formFields)
        ? object.formFields.map((e: any) => DocumentPageFormField.fromJSON(e))
        : [],
      symbols: globalThis.Array.isArray(object?.symbols)
        ? object.symbols.map((e: any) => DocumentPageSymbol.fromJSON(e))
        : [],
      detectedBarcodes: globalThis.Array.isArray(object?.detectedBarcodes)
        ? object.detectedBarcodes.map((e: any) => DocumentPageDetectedBarcode.fromJSON(e))
        : [],
      provenance: isSet(object.provenance) ? DocumentProvenance.fromJSON(object.provenance) : undefined,
    };
  },

  toJSON(message: DocumentPage): unknown {
    const obj: any = {};
    if (message.pageNumber !== undefined && message.pageNumber !== 0) {
      obj.pageNumber = Math.round(message.pageNumber);
    }
    if (message.image !== undefined) {
      obj.image = DocumentPageImage.toJSON(message.image);
    }
    if (message.transforms?.length) {
      obj.transforms = message.transforms.map((e) => DocumentPageMatrix.toJSON(e));
    }
    if (message.dimension !== undefined) {
      obj.dimension = DocumentPageDimension.toJSON(message.dimension);
    }
    if (message.layout !== undefined) {
      obj.layout = DocumentPageLayout.toJSON(message.layout);
    }
    if (message.detectedLanguages?.length) {
      obj.detectedLanguages = message.detectedLanguages.map((e) => DocumentPageDetectedLanguage.toJSON(e));
    }
    if (message.blocks?.length) {
      obj.blocks = message.blocks.map((e) => DocumentPageBlock.toJSON(e));
    }
    if (message.paragraphs?.length) {
      obj.paragraphs = message.paragraphs.map((e) => DocumentPageParagraph.toJSON(e));
    }
    if (message.lines?.length) {
      obj.lines = message.lines.map((e) => DocumentPageLine.toJSON(e));
    }
    if (message.tokens?.length) {
      obj.tokens = message.tokens.map((e) => DocumentPageToken.toJSON(e));
    }
    if (message.visualElements?.length) {
      obj.visualElements = message.visualElements.map((e) => DocumentPageVisualElement.toJSON(e));
    }
    if (message.tables?.length) {
      obj.tables = message.tables.map((e) => DocumentPageTable.toJSON(e));
    }
    if (message.formFields?.length) {
      obj.formFields = message.formFields.map((e) => DocumentPageFormField.toJSON(e));
    }
    if (message.symbols?.length) {
      obj.symbols = message.symbols.map((e) => DocumentPageSymbol.toJSON(e));
    }
    if (message.detectedBarcodes?.length) {
      obj.detectedBarcodes = message.detectedBarcodes.map((e) => DocumentPageDetectedBarcode.toJSON(e));
    }
    if (message.provenance !== undefined) {
      obj.provenance = DocumentProvenance.toJSON(message.provenance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPage>, I>>(base?: I): DocumentPage {
    return DocumentPage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPage>, I>>(object: I): DocumentPage {
    const message = createBaseDocumentPage();
    message.pageNumber = object.pageNumber ?? 0;
    message.image = (object.image !== undefined && object.image !== null)
      ? DocumentPageImage.fromPartial(object.image)
      : undefined;
    message.transforms = object.transforms?.map((e) => DocumentPageMatrix.fromPartial(e)) || [];
    message.dimension = (object.dimension !== undefined && object.dimension !== null)
      ? DocumentPageDimension.fromPartial(object.dimension)
      : undefined;
    message.layout = (object.layout !== undefined && object.layout !== null)
      ? DocumentPageLayout.fromPartial(object.layout)
      : undefined;
    message.detectedLanguages = object.detectedLanguages?.map((e) => DocumentPageDetectedLanguage.fromPartial(e)) || [];
    message.blocks = object.blocks?.map((e) => DocumentPageBlock.fromPartial(e)) || [];
    message.paragraphs = object.paragraphs?.map((e) => DocumentPageParagraph.fromPartial(e)) || [];
    message.lines = object.lines?.map((e) => DocumentPageLine.fromPartial(e)) || [];
    message.tokens = object.tokens?.map((e) => DocumentPageToken.fromPartial(e)) || [];
    message.visualElements = object.visualElements?.map((e) => DocumentPageVisualElement.fromPartial(e)) || [];
    message.tables = object.tables?.map((e) => DocumentPageTable.fromPartial(e)) || [];
    message.formFields = object.formFields?.map((e) => DocumentPageFormField.fromPartial(e)) || [];
    message.symbols = object.symbols?.map((e) => DocumentPageSymbol.fromPartial(e)) || [];
    message.detectedBarcodes = object.detectedBarcodes?.map((e) => DocumentPageDetectedBarcode.fromPartial(e)) || [];
    message.provenance = (object.provenance !== undefined && object.provenance !== null)
      ? DocumentProvenance.fromPartial(object.provenance)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DocumentPage.$type, DocumentPage);

function createBaseDocumentPageDimension(): DocumentPageDimension {
  return { $type: "google.cloud.documentai.v1.Document.Page.Dimension", width: 0, height: 0, unit: "" };
}

export const DocumentPageDimension = {
  $type: "google.cloud.documentai.v1.Document.Page.Dimension" as const,

  encode(message: DocumentPageDimension, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.width !== undefined && message.width !== 0) {
      writer.uint32(13).float(message.width);
    }
    if (message.height !== undefined && message.height !== 0) {
      writer.uint32(21).float(message.height);
    }
    if (message.unit !== undefined && message.unit !== "") {
      writer.uint32(26).string(message.unit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageDimension {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageDimension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.width = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.height = reader.float();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.unit = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageDimension {
    return {
      $type: DocumentPageDimension.$type,
      width: isSet(object.width) ? globalThis.Number(object.width) : 0,
      height: isSet(object.height) ? globalThis.Number(object.height) : 0,
      unit: isSet(object.unit) ? globalThis.String(object.unit) : "",
    };
  },

  toJSON(message: DocumentPageDimension): unknown {
    const obj: any = {};
    if (message.width !== undefined && message.width !== 0) {
      obj.width = message.width;
    }
    if (message.height !== undefined && message.height !== 0) {
      obj.height = message.height;
    }
    if (message.unit !== undefined && message.unit !== "") {
      obj.unit = message.unit;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageDimension>, I>>(base?: I): DocumentPageDimension {
    return DocumentPageDimension.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageDimension>, I>>(object: I): DocumentPageDimension {
    const message = createBaseDocumentPageDimension();
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    message.unit = object.unit ?? "";
    return message;
  },
};

messageTypeRegistry.set(DocumentPageDimension.$type, DocumentPageDimension);

function createBaseDocumentPageImage(): DocumentPageImage {
  return {
    $type: "google.cloud.documentai.v1.Document.Page.Image",
    content: new Uint8Array(0),
    mimeType: "",
    width: 0,
    height: 0,
  };
}

export const DocumentPageImage = {
  $type: "google.cloud.documentai.v1.Document.Page.Image" as const,

  encode(message: DocumentPageImage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.content !== undefined && message.content.length !== 0) {
      writer.uint32(10).bytes(message.content);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      writer.uint32(18).string(message.mimeType);
    }
    if (message.width !== undefined && message.width !== 0) {
      writer.uint32(24).int32(message.width);
    }
    if (message.height !== undefined && message.height !== 0) {
      writer.uint32(32).int32(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageImage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageImage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.content = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.mimeType = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.width = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.height = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageImage {
    return {
      $type: DocumentPageImage.$type,
      content: isSet(object.content) ? bytesFromBase64(object.content) : new Uint8Array(0),
      mimeType: isSet(object.mimeType) ? globalThis.String(object.mimeType) : "",
      width: isSet(object.width) ? globalThis.Number(object.width) : 0,
      height: isSet(object.height) ? globalThis.Number(object.height) : 0,
    };
  },

  toJSON(message: DocumentPageImage): unknown {
    const obj: any = {};
    if (message.content !== undefined && message.content.length !== 0) {
      obj.content = base64FromBytes(message.content);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      obj.mimeType = message.mimeType;
    }
    if (message.width !== undefined && message.width !== 0) {
      obj.width = Math.round(message.width);
    }
    if (message.height !== undefined && message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageImage>, I>>(base?: I): DocumentPageImage {
    return DocumentPageImage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageImage>, I>>(object: I): DocumentPageImage {
    const message = createBaseDocumentPageImage();
    message.content = object.content ?? new Uint8Array(0);
    message.mimeType = object.mimeType ?? "";
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DocumentPageImage.$type, DocumentPageImage);

function createBaseDocumentPageMatrix(): DocumentPageMatrix {
  return {
    $type: "google.cloud.documentai.v1.Document.Page.Matrix",
    rows: 0,
    cols: 0,
    type: 0,
    data: new Uint8Array(0),
  };
}

export const DocumentPageMatrix = {
  $type: "google.cloud.documentai.v1.Document.Page.Matrix" as const,

  encode(message: DocumentPageMatrix, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rows !== undefined && message.rows !== 0) {
      writer.uint32(8).int32(message.rows);
    }
    if (message.cols !== undefined && message.cols !== 0) {
      writer.uint32(16).int32(message.cols);
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.data !== undefined && message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageMatrix {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageMatrix();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.rows = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.cols = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageMatrix {
    return {
      $type: DocumentPageMatrix.$type,
      rows: isSet(object.rows) ? globalThis.Number(object.rows) : 0,
      cols: isSet(object.cols) ? globalThis.Number(object.cols) : 0,
      type: isSet(object.type) ? globalThis.Number(object.type) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
    };
  },

  toJSON(message: DocumentPageMatrix): unknown {
    const obj: any = {};
    if (message.rows !== undefined && message.rows !== 0) {
      obj.rows = Math.round(message.rows);
    }
    if (message.cols !== undefined && message.cols !== 0) {
      obj.cols = Math.round(message.cols);
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = Math.round(message.type);
    }
    if (message.data !== undefined && message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageMatrix>, I>>(base?: I): DocumentPageMatrix {
    return DocumentPageMatrix.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageMatrix>, I>>(object: I): DocumentPageMatrix {
    const message = createBaseDocumentPageMatrix();
    message.rows = object.rows ?? 0;
    message.cols = object.cols ?? 0;
    message.type = object.type ?? 0;
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

messageTypeRegistry.set(DocumentPageMatrix.$type, DocumentPageMatrix);

function createBaseDocumentPageLayout(): DocumentPageLayout {
  return {
    $type: "google.cloud.documentai.v1.Document.Page.Layout",
    textAnchor: undefined,
    confidence: 0,
    boundingPoly: undefined,
    orientation: 0,
  };
}

export const DocumentPageLayout = {
  $type: "google.cloud.documentai.v1.Document.Page.Layout" as const,

  encode(message: DocumentPageLayout, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.textAnchor !== undefined) {
      DocumentTextAnchor.encode(message.textAnchor, writer.uint32(10).fork()).ldelim();
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(21).float(message.confidence);
    }
    if (message.boundingPoly !== undefined) {
      BoundingPoly.encode(message.boundingPoly, writer.uint32(26).fork()).ldelim();
    }
    if (message.orientation !== undefined && message.orientation !== 0) {
      writer.uint32(32).int32(message.orientation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageLayout {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageLayout();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.textAnchor = DocumentTextAnchor.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.confidence = reader.float();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.boundingPoly = BoundingPoly.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.orientation = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageLayout {
    return {
      $type: DocumentPageLayout.$type,
      textAnchor: isSet(object.textAnchor) ? DocumentTextAnchor.fromJSON(object.textAnchor) : undefined,
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
      boundingPoly: isSet(object.boundingPoly) ? BoundingPoly.fromJSON(object.boundingPoly) : undefined,
      orientation: isSet(object.orientation) ? documentPageLayoutOrientationFromJSON(object.orientation) : 0,
    };
  },

  toJSON(message: DocumentPageLayout): unknown {
    const obj: any = {};
    if (message.textAnchor !== undefined) {
      obj.textAnchor = DocumentTextAnchor.toJSON(message.textAnchor);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    if (message.boundingPoly !== undefined) {
      obj.boundingPoly = BoundingPoly.toJSON(message.boundingPoly);
    }
    if (message.orientation !== undefined && message.orientation !== 0) {
      obj.orientation = documentPageLayoutOrientationToJSON(message.orientation);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageLayout>, I>>(base?: I): DocumentPageLayout {
    return DocumentPageLayout.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageLayout>, I>>(object: I): DocumentPageLayout {
    const message = createBaseDocumentPageLayout();
    message.textAnchor = (object.textAnchor !== undefined && object.textAnchor !== null)
      ? DocumentTextAnchor.fromPartial(object.textAnchor)
      : undefined;
    message.confidence = object.confidence ?? 0;
    message.boundingPoly = (object.boundingPoly !== undefined && object.boundingPoly !== null)
      ? BoundingPoly.fromPartial(object.boundingPoly)
      : undefined;
    message.orientation = object.orientation ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DocumentPageLayout.$type, DocumentPageLayout);

function createBaseDocumentPageBlock(): DocumentPageBlock {
  return {
    $type: "google.cloud.documentai.v1.Document.Page.Block",
    layout: undefined,
    detectedLanguages: [],
    provenance: undefined,
  };
}

export const DocumentPageBlock = {
  $type: "google.cloud.documentai.v1.Document.Page.Block" as const,

  encode(message: DocumentPageBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.layout !== undefined) {
      DocumentPageLayout.encode(message.layout, writer.uint32(10).fork()).ldelim();
    }
    if (message.detectedLanguages !== undefined && message.detectedLanguages.length !== 0) {
      for (const v of message.detectedLanguages) {
        DocumentPageDetectedLanguage.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.provenance !== undefined) {
      DocumentProvenance.encode(message.provenance, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.layout = DocumentPageLayout.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.detectedLanguages!.push(DocumentPageDetectedLanguage.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.provenance = DocumentProvenance.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageBlock {
    return {
      $type: DocumentPageBlock.$type,
      layout: isSet(object.layout) ? DocumentPageLayout.fromJSON(object.layout) : undefined,
      detectedLanguages: globalThis.Array.isArray(object?.detectedLanguages)
        ? object.detectedLanguages.map((e: any) => DocumentPageDetectedLanguage.fromJSON(e))
        : [],
      provenance: isSet(object.provenance) ? DocumentProvenance.fromJSON(object.provenance) : undefined,
    };
  },

  toJSON(message: DocumentPageBlock): unknown {
    const obj: any = {};
    if (message.layout !== undefined) {
      obj.layout = DocumentPageLayout.toJSON(message.layout);
    }
    if (message.detectedLanguages?.length) {
      obj.detectedLanguages = message.detectedLanguages.map((e) => DocumentPageDetectedLanguage.toJSON(e));
    }
    if (message.provenance !== undefined) {
      obj.provenance = DocumentProvenance.toJSON(message.provenance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageBlock>, I>>(base?: I): DocumentPageBlock {
    return DocumentPageBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageBlock>, I>>(object: I): DocumentPageBlock {
    const message = createBaseDocumentPageBlock();
    message.layout = (object.layout !== undefined && object.layout !== null)
      ? DocumentPageLayout.fromPartial(object.layout)
      : undefined;
    message.detectedLanguages = object.detectedLanguages?.map((e) => DocumentPageDetectedLanguage.fromPartial(e)) || [];
    message.provenance = (object.provenance !== undefined && object.provenance !== null)
      ? DocumentProvenance.fromPartial(object.provenance)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DocumentPageBlock.$type, DocumentPageBlock);

function createBaseDocumentPageParagraph(): DocumentPageParagraph {
  return {
    $type: "google.cloud.documentai.v1.Document.Page.Paragraph",
    layout: undefined,
    detectedLanguages: [],
    provenance: undefined,
  };
}

export const DocumentPageParagraph = {
  $type: "google.cloud.documentai.v1.Document.Page.Paragraph" as const,

  encode(message: DocumentPageParagraph, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.layout !== undefined) {
      DocumentPageLayout.encode(message.layout, writer.uint32(10).fork()).ldelim();
    }
    if (message.detectedLanguages !== undefined && message.detectedLanguages.length !== 0) {
      for (const v of message.detectedLanguages) {
        DocumentPageDetectedLanguage.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.provenance !== undefined) {
      DocumentProvenance.encode(message.provenance, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageParagraph {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageParagraph();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.layout = DocumentPageLayout.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.detectedLanguages!.push(DocumentPageDetectedLanguage.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.provenance = DocumentProvenance.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageParagraph {
    return {
      $type: DocumentPageParagraph.$type,
      layout: isSet(object.layout) ? DocumentPageLayout.fromJSON(object.layout) : undefined,
      detectedLanguages: globalThis.Array.isArray(object?.detectedLanguages)
        ? object.detectedLanguages.map((e: any) => DocumentPageDetectedLanguage.fromJSON(e))
        : [],
      provenance: isSet(object.provenance) ? DocumentProvenance.fromJSON(object.provenance) : undefined,
    };
  },

  toJSON(message: DocumentPageParagraph): unknown {
    const obj: any = {};
    if (message.layout !== undefined) {
      obj.layout = DocumentPageLayout.toJSON(message.layout);
    }
    if (message.detectedLanguages?.length) {
      obj.detectedLanguages = message.detectedLanguages.map((e) => DocumentPageDetectedLanguage.toJSON(e));
    }
    if (message.provenance !== undefined) {
      obj.provenance = DocumentProvenance.toJSON(message.provenance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageParagraph>, I>>(base?: I): DocumentPageParagraph {
    return DocumentPageParagraph.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageParagraph>, I>>(object: I): DocumentPageParagraph {
    const message = createBaseDocumentPageParagraph();
    message.layout = (object.layout !== undefined && object.layout !== null)
      ? DocumentPageLayout.fromPartial(object.layout)
      : undefined;
    message.detectedLanguages = object.detectedLanguages?.map((e) => DocumentPageDetectedLanguage.fromPartial(e)) || [];
    message.provenance = (object.provenance !== undefined && object.provenance !== null)
      ? DocumentProvenance.fromPartial(object.provenance)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DocumentPageParagraph.$type, DocumentPageParagraph);

function createBaseDocumentPageLine(): DocumentPageLine {
  return {
    $type: "google.cloud.documentai.v1.Document.Page.Line",
    layout: undefined,
    detectedLanguages: [],
    provenance: undefined,
  };
}

export const DocumentPageLine = {
  $type: "google.cloud.documentai.v1.Document.Page.Line" as const,

  encode(message: DocumentPageLine, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.layout !== undefined) {
      DocumentPageLayout.encode(message.layout, writer.uint32(10).fork()).ldelim();
    }
    if (message.detectedLanguages !== undefined && message.detectedLanguages.length !== 0) {
      for (const v of message.detectedLanguages) {
        DocumentPageDetectedLanguage.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.provenance !== undefined) {
      DocumentProvenance.encode(message.provenance, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageLine {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageLine();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.layout = DocumentPageLayout.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.detectedLanguages!.push(DocumentPageDetectedLanguage.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.provenance = DocumentProvenance.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageLine {
    return {
      $type: DocumentPageLine.$type,
      layout: isSet(object.layout) ? DocumentPageLayout.fromJSON(object.layout) : undefined,
      detectedLanguages: globalThis.Array.isArray(object?.detectedLanguages)
        ? object.detectedLanguages.map((e: any) => DocumentPageDetectedLanguage.fromJSON(e))
        : [],
      provenance: isSet(object.provenance) ? DocumentProvenance.fromJSON(object.provenance) : undefined,
    };
  },

  toJSON(message: DocumentPageLine): unknown {
    const obj: any = {};
    if (message.layout !== undefined) {
      obj.layout = DocumentPageLayout.toJSON(message.layout);
    }
    if (message.detectedLanguages?.length) {
      obj.detectedLanguages = message.detectedLanguages.map((e) => DocumentPageDetectedLanguage.toJSON(e));
    }
    if (message.provenance !== undefined) {
      obj.provenance = DocumentProvenance.toJSON(message.provenance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageLine>, I>>(base?: I): DocumentPageLine {
    return DocumentPageLine.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageLine>, I>>(object: I): DocumentPageLine {
    const message = createBaseDocumentPageLine();
    message.layout = (object.layout !== undefined && object.layout !== null)
      ? DocumentPageLayout.fromPartial(object.layout)
      : undefined;
    message.detectedLanguages = object.detectedLanguages?.map((e) => DocumentPageDetectedLanguage.fromPartial(e)) || [];
    message.provenance = (object.provenance !== undefined && object.provenance !== null)
      ? DocumentProvenance.fromPartial(object.provenance)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DocumentPageLine.$type, DocumentPageLine);

function createBaseDocumentPageToken(): DocumentPageToken {
  return {
    $type: "google.cloud.documentai.v1.Document.Page.Token",
    layout: undefined,
    detectedBreak: undefined,
    detectedLanguages: [],
    provenance: undefined,
  };
}

export const DocumentPageToken = {
  $type: "google.cloud.documentai.v1.Document.Page.Token" as const,

  encode(message: DocumentPageToken, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.layout !== undefined) {
      DocumentPageLayout.encode(message.layout, writer.uint32(10).fork()).ldelim();
    }
    if (message.detectedBreak !== undefined) {
      DocumentPageTokenDetectedBreak.encode(message.detectedBreak, writer.uint32(18).fork()).ldelim();
    }
    if (message.detectedLanguages !== undefined && message.detectedLanguages.length !== 0) {
      for (const v of message.detectedLanguages) {
        DocumentPageDetectedLanguage.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.provenance !== undefined) {
      DocumentProvenance.encode(message.provenance, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageToken {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.layout = DocumentPageLayout.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.detectedBreak = DocumentPageTokenDetectedBreak.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.detectedLanguages!.push(DocumentPageDetectedLanguage.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.provenance = DocumentProvenance.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageToken {
    return {
      $type: DocumentPageToken.$type,
      layout: isSet(object.layout) ? DocumentPageLayout.fromJSON(object.layout) : undefined,
      detectedBreak: isSet(object.detectedBreak)
        ? DocumentPageTokenDetectedBreak.fromJSON(object.detectedBreak)
        : undefined,
      detectedLanguages: globalThis.Array.isArray(object?.detectedLanguages)
        ? object.detectedLanguages.map((e: any) => DocumentPageDetectedLanguage.fromJSON(e))
        : [],
      provenance: isSet(object.provenance) ? DocumentProvenance.fromJSON(object.provenance) : undefined,
    };
  },

  toJSON(message: DocumentPageToken): unknown {
    const obj: any = {};
    if (message.layout !== undefined) {
      obj.layout = DocumentPageLayout.toJSON(message.layout);
    }
    if (message.detectedBreak !== undefined) {
      obj.detectedBreak = DocumentPageTokenDetectedBreak.toJSON(message.detectedBreak);
    }
    if (message.detectedLanguages?.length) {
      obj.detectedLanguages = message.detectedLanguages.map((e) => DocumentPageDetectedLanguage.toJSON(e));
    }
    if (message.provenance !== undefined) {
      obj.provenance = DocumentProvenance.toJSON(message.provenance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageToken>, I>>(base?: I): DocumentPageToken {
    return DocumentPageToken.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageToken>, I>>(object: I): DocumentPageToken {
    const message = createBaseDocumentPageToken();
    message.layout = (object.layout !== undefined && object.layout !== null)
      ? DocumentPageLayout.fromPartial(object.layout)
      : undefined;
    message.detectedBreak = (object.detectedBreak !== undefined && object.detectedBreak !== null)
      ? DocumentPageTokenDetectedBreak.fromPartial(object.detectedBreak)
      : undefined;
    message.detectedLanguages = object.detectedLanguages?.map((e) => DocumentPageDetectedLanguage.fromPartial(e)) || [];
    message.provenance = (object.provenance !== undefined && object.provenance !== null)
      ? DocumentProvenance.fromPartial(object.provenance)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DocumentPageToken.$type, DocumentPageToken);

function createBaseDocumentPageTokenDetectedBreak(): DocumentPageTokenDetectedBreak {
  return { $type: "google.cloud.documentai.v1.Document.Page.Token.DetectedBreak", type: 0 };
}

export const DocumentPageTokenDetectedBreak = {
  $type: "google.cloud.documentai.v1.Document.Page.Token.DetectedBreak" as const,

  encode(message: DocumentPageTokenDetectedBreak, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageTokenDetectedBreak {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageTokenDetectedBreak();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
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

  fromJSON(object: any): DocumentPageTokenDetectedBreak {
    return {
      $type: DocumentPageTokenDetectedBreak.$type,
      type: isSet(object.type) ? documentPageTokenDetectedBreakTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: DocumentPageTokenDetectedBreak): unknown {
    const obj: any = {};
    if (message.type !== undefined && message.type !== 0) {
      obj.type = documentPageTokenDetectedBreakTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageTokenDetectedBreak>, I>>(base?: I): DocumentPageTokenDetectedBreak {
    return DocumentPageTokenDetectedBreak.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageTokenDetectedBreak>, I>>(
    object: I,
  ): DocumentPageTokenDetectedBreak {
    const message = createBaseDocumentPageTokenDetectedBreak();
    message.type = object.type ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DocumentPageTokenDetectedBreak.$type, DocumentPageTokenDetectedBreak);

function createBaseDocumentPageSymbol(): DocumentPageSymbol {
  return { $type: "google.cloud.documentai.v1.Document.Page.Symbol", layout: undefined, detectedLanguages: [] };
}

export const DocumentPageSymbol = {
  $type: "google.cloud.documentai.v1.Document.Page.Symbol" as const,

  encode(message: DocumentPageSymbol, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.layout !== undefined) {
      DocumentPageLayout.encode(message.layout, writer.uint32(10).fork()).ldelim();
    }
    if (message.detectedLanguages !== undefined && message.detectedLanguages.length !== 0) {
      for (const v of message.detectedLanguages) {
        DocumentPageDetectedLanguage.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageSymbol {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageSymbol();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.layout = DocumentPageLayout.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.detectedLanguages!.push(DocumentPageDetectedLanguage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageSymbol {
    return {
      $type: DocumentPageSymbol.$type,
      layout: isSet(object.layout) ? DocumentPageLayout.fromJSON(object.layout) : undefined,
      detectedLanguages: globalThis.Array.isArray(object?.detectedLanguages)
        ? object.detectedLanguages.map((e: any) => DocumentPageDetectedLanguage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DocumentPageSymbol): unknown {
    const obj: any = {};
    if (message.layout !== undefined) {
      obj.layout = DocumentPageLayout.toJSON(message.layout);
    }
    if (message.detectedLanguages?.length) {
      obj.detectedLanguages = message.detectedLanguages.map((e) => DocumentPageDetectedLanguage.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageSymbol>, I>>(base?: I): DocumentPageSymbol {
    return DocumentPageSymbol.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageSymbol>, I>>(object: I): DocumentPageSymbol {
    const message = createBaseDocumentPageSymbol();
    message.layout = (object.layout !== undefined && object.layout !== null)
      ? DocumentPageLayout.fromPartial(object.layout)
      : undefined;
    message.detectedLanguages = object.detectedLanguages?.map((e) => DocumentPageDetectedLanguage.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(DocumentPageSymbol.$type, DocumentPageSymbol);

function createBaseDocumentPageVisualElement(): DocumentPageVisualElement {
  return {
    $type: "google.cloud.documentai.v1.Document.Page.VisualElement",
    layout: undefined,
    type: "",
    detectedLanguages: [],
  };
}

export const DocumentPageVisualElement = {
  $type: "google.cloud.documentai.v1.Document.Page.VisualElement" as const,

  encode(message: DocumentPageVisualElement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.layout !== undefined) {
      DocumentPageLayout.encode(message.layout, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== undefined && message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.detectedLanguages !== undefined && message.detectedLanguages.length !== 0) {
      for (const v of message.detectedLanguages) {
        DocumentPageDetectedLanguage.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageVisualElement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageVisualElement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.layout = DocumentPageLayout.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.detectedLanguages!.push(DocumentPageDetectedLanguage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageVisualElement {
    return {
      $type: DocumentPageVisualElement.$type,
      layout: isSet(object.layout) ? DocumentPageLayout.fromJSON(object.layout) : undefined,
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      detectedLanguages: globalThis.Array.isArray(object?.detectedLanguages)
        ? object.detectedLanguages.map((e: any) => DocumentPageDetectedLanguage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DocumentPageVisualElement): unknown {
    const obj: any = {};
    if (message.layout !== undefined) {
      obj.layout = DocumentPageLayout.toJSON(message.layout);
    }
    if (message.type !== undefined && message.type !== "") {
      obj.type = message.type;
    }
    if (message.detectedLanguages?.length) {
      obj.detectedLanguages = message.detectedLanguages.map((e) => DocumentPageDetectedLanguage.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageVisualElement>, I>>(base?: I): DocumentPageVisualElement {
    return DocumentPageVisualElement.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageVisualElement>, I>>(object: I): DocumentPageVisualElement {
    const message = createBaseDocumentPageVisualElement();
    message.layout = (object.layout !== undefined && object.layout !== null)
      ? DocumentPageLayout.fromPartial(object.layout)
      : undefined;
    message.type = object.type ?? "";
    message.detectedLanguages = object.detectedLanguages?.map((e) => DocumentPageDetectedLanguage.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(DocumentPageVisualElement.$type, DocumentPageVisualElement);

function createBaseDocumentPageTable(): DocumentPageTable {
  return {
    $type: "google.cloud.documentai.v1.Document.Page.Table",
    layout: undefined,
    headerRows: [],
    bodyRows: [],
    detectedLanguages: [],
  };
}

export const DocumentPageTable = {
  $type: "google.cloud.documentai.v1.Document.Page.Table" as const,

  encode(message: DocumentPageTable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.layout !== undefined) {
      DocumentPageLayout.encode(message.layout, writer.uint32(10).fork()).ldelim();
    }
    if (message.headerRows !== undefined && message.headerRows.length !== 0) {
      for (const v of message.headerRows) {
        DocumentPageTableTableRow.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.bodyRows !== undefined && message.bodyRows.length !== 0) {
      for (const v of message.bodyRows) {
        DocumentPageTableTableRow.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.detectedLanguages !== undefined && message.detectedLanguages.length !== 0) {
      for (const v of message.detectedLanguages) {
        DocumentPageDetectedLanguage.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageTable {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageTable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.layout = DocumentPageLayout.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.headerRows!.push(DocumentPageTableTableRow.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bodyRows!.push(DocumentPageTableTableRow.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.detectedLanguages!.push(DocumentPageDetectedLanguage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageTable {
    return {
      $type: DocumentPageTable.$type,
      layout: isSet(object.layout) ? DocumentPageLayout.fromJSON(object.layout) : undefined,
      headerRows: globalThis.Array.isArray(object?.headerRows)
        ? object.headerRows.map((e: any) => DocumentPageTableTableRow.fromJSON(e))
        : [],
      bodyRows: globalThis.Array.isArray(object?.bodyRows)
        ? object.bodyRows.map((e: any) => DocumentPageTableTableRow.fromJSON(e))
        : [],
      detectedLanguages: globalThis.Array.isArray(object?.detectedLanguages)
        ? object.detectedLanguages.map((e: any) => DocumentPageDetectedLanguage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DocumentPageTable): unknown {
    const obj: any = {};
    if (message.layout !== undefined) {
      obj.layout = DocumentPageLayout.toJSON(message.layout);
    }
    if (message.headerRows?.length) {
      obj.headerRows = message.headerRows.map((e) => DocumentPageTableTableRow.toJSON(e));
    }
    if (message.bodyRows?.length) {
      obj.bodyRows = message.bodyRows.map((e) => DocumentPageTableTableRow.toJSON(e));
    }
    if (message.detectedLanguages?.length) {
      obj.detectedLanguages = message.detectedLanguages.map((e) => DocumentPageDetectedLanguage.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageTable>, I>>(base?: I): DocumentPageTable {
    return DocumentPageTable.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageTable>, I>>(object: I): DocumentPageTable {
    const message = createBaseDocumentPageTable();
    message.layout = (object.layout !== undefined && object.layout !== null)
      ? DocumentPageLayout.fromPartial(object.layout)
      : undefined;
    message.headerRows = object.headerRows?.map((e) => DocumentPageTableTableRow.fromPartial(e)) || [];
    message.bodyRows = object.bodyRows?.map((e) => DocumentPageTableTableRow.fromPartial(e)) || [];
    message.detectedLanguages = object.detectedLanguages?.map((e) => DocumentPageDetectedLanguage.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(DocumentPageTable.$type, DocumentPageTable);

function createBaseDocumentPageTableTableRow(): DocumentPageTableTableRow {
  return { $type: "google.cloud.documentai.v1.Document.Page.Table.TableRow", cells: [] };
}

export const DocumentPageTableTableRow = {
  $type: "google.cloud.documentai.v1.Document.Page.Table.TableRow" as const,

  encode(message: DocumentPageTableTableRow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cells !== undefined && message.cells.length !== 0) {
      for (const v of message.cells) {
        DocumentPageTableTableCell.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageTableTableRow {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageTableTableRow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cells!.push(DocumentPageTableTableCell.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageTableTableRow {
    return {
      $type: DocumentPageTableTableRow.$type,
      cells: globalThis.Array.isArray(object?.cells)
        ? object.cells.map((e: any) => DocumentPageTableTableCell.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DocumentPageTableTableRow): unknown {
    const obj: any = {};
    if (message.cells?.length) {
      obj.cells = message.cells.map((e) => DocumentPageTableTableCell.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageTableTableRow>, I>>(base?: I): DocumentPageTableTableRow {
    return DocumentPageTableTableRow.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageTableTableRow>, I>>(object: I): DocumentPageTableTableRow {
    const message = createBaseDocumentPageTableTableRow();
    message.cells = object.cells?.map((e) => DocumentPageTableTableCell.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(DocumentPageTableTableRow.$type, DocumentPageTableTableRow);

function createBaseDocumentPageTableTableCell(): DocumentPageTableTableCell {
  return {
    $type: "google.cloud.documentai.v1.Document.Page.Table.TableCell",
    layout: undefined,
    rowSpan: 0,
    colSpan: 0,
    detectedLanguages: [],
  };
}

export const DocumentPageTableTableCell = {
  $type: "google.cloud.documentai.v1.Document.Page.Table.TableCell" as const,

  encode(message: DocumentPageTableTableCell, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.layout !== undefined) {
      DocumentPageLayout.encode(message.layout, writer.uint32(10).fork()).ldelim();
    }
    if (message.rowSpan !== undefined && message.rowSpan !== 0) {
      writer.uint32(16).int32(message.rowSpan);
    }
    if (message.colSpan !== undefined && message.colSpan !== 0) {
      writer.uint32(24).int32(message.colSpan);
    }
    if (message.detectedLanguages !== undefined && message.detectedLanguages.length !== 0) {
      for (const v of message.detectedLanguages) {
        DocumentPageDetectedLanguage.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageTableTableCell {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageTableTableCell();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.layout = DocumentPageLayout.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.rowSpan = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.colSpan = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.detectedLanguages!.push(DocumentPageDetectedLanguage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageTableTableCell {
    return {
      $type: DocumentPageTableTableCell.$type,
      layout: isSet(object.layout) ? DocumentPageLayout.fromJSON(object.layout) : undefined,
      rowSpan: isSet(object.rowSpan) ? globalThis.Number(object.rowSpan) : 0,
      colSpan: isSet(object.colSpan) ? globalThis.Number(object.colSpan) : 0,
      detectedLanguages: globalThis.Array.isArray(object?.detectedLanguages)
        ? object.detectedLanguages.map((e: any) => DocumentPageDetectedLanguage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DocumentPageTableTableCell): unknown {
    const obj: any = {};
    if (message.layout !== undefined) {
      obj.layout = DocumentPageLayout.toJSON(message.layout);
    }
    if (message.rowSpan !== undefined && message.rowSpan !== 0) {
      obj.rowSpan = Math.round(message.rowSpan);
    }
    if (message.colSpan !== undefined && message.colSpan !== 0) {
      obj.colSpan = Math.round(message.colSpan);
    }
    if (message.detectedLanguages?.length) {
      obj.detectedLanguages = message.detectedLanguages.map((e) => DocumentPageDetectedLanguage.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageTableTableCell>, I>>(base?: I): DocumentPageTableTableCell {
    return DocumentPageTableTableCell.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageTableTableCell>, I>>(object: I): DocumentPageTableTableCell {
    const message = createBaseDocumentPageTableTableCell();
    message.layout = (object.layout !== undefined && object.layout !== null)
      ? DocumentPageLayout.fromPartial(object.layout)
      : undefined;
    message.rowSpan = object.rowSpan ?? 0;
    message.colSpan = object.colSpan ?? 0;
    message.detectedLanguages = object.detectedLanguages?.map((e) => DocumentPageDetectedLanguage.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(DocumentPageTableTableCell.$type, DocumentPageTableTableCell);

function createBaseDocumentPageFormField(): DocumentPageFormField {
  return {
    $type: "google.cloud.documentai.v1.Document.Page.FormField",
    fieldName: undefined,
    fieldValue: undefined,
    nameDetectedLanguages: [],
    valueDetectedLanguages: [],
    valueType: "",
    correctedKeyText: "",
    correctedValueText: "",
    provenance: undefined,
  };
}

export const DocumentPageFormField = {
  $type: "google.cloud.documentai.v1.Document.Page.FormField" as const,

  encode(message: DocumentPageFormField, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldName !== undefined) {
      DocumentPageLayout.encode(message.fieldName, writer.uint32(10).fork()).ldelim();
    }
    if (message.fieldValue !== undefined) {
      DocumentPageLayout.encode(message.fieldValue, writer.uint32(18).fork()).ldelim();
    }
    if (message.nameDetectedLanguages !== undefined && message.nameDetectedLanguages.length !== 0) {
      for (const v of message.nameDetectedLanguages) {
        DocumentPageDetectedLanguage.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.valueDetectedLanguages !== undefined && message.valueDetectedLanguages.length !== 0) {
      for (const v of message.valueDetectedLanguages) {
        DocumentPageDetectedLanguage.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.valueType !== undefined && message.valueType !== "") {
      writer.uint32(42).string(message.valueType);
    }
    if (message.correctedKeyText !== undefined && message.correctedKeyText !== "") {
      writer.uint32(50).string(message.correctedKeyText);
    }
    if (message.correctedValueText !== undefined && message.correctedValueText !== "") {
      writer.uint32(58).string(message.correctedValueText);
    }
    if (message.provenance !== undefined) {
      DocumentProvenance.encode(message.provenance, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageFormField {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageFormField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fieldName = DocumentPageLayout.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fieldValue = DocumentPageLayout.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nameDetectedLanguages!.push(DocumentPageDetectedLanguage.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.valueDetectedLanguages!.push(DocumentPageDetectedLanguage.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.valueType = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.correctedKeyText = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.correctedValueText = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.provenance = DocumentProvenance.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageFormField {
    return {
      $type: DocumentPageFormField.$type,
      fieldName: isSet(object.fieldName) ? DocumentPageLayout.fromJSON(object.fieldName) : undefined,
      fieldValue: isSet(object.fieldValue) ? DocumentPageLayout.fromJSON(object.fieldValue) : undefined,
      nameDetectedLanguages: globalThis.Array.isArray(object?.nameDetectedLanguages)
        ? object.nameDetectedLanguages.map((e: any) => DocumentPageDetectedLanguage.fromJSON(e))
        : [],
      valueDetectedLanguages: globalThis.Array.isArray(object?.valueDetectedLanguages)
        ? object.valueDetectedLanguages.map((e: any) => DocumentPageDetectedLanguage.fromJSON(e))
        : [],
      valueType: isSet(object.valueType) ? globalThis.String(object.valueType) : "",
      correctedKeyText: isSet(object.correctedKeyText) ? globalThis.String(object.correctedKeyText) : "",
      correctedValueText: isSet(object.correctedValueText) ? globalThis.String(object.correctedValueText) : "",
      provenance: isSet(object.provenance) ? DocumentProvenance.fromJSON(object.provenance) : undefined,
    };
  },

  toJSON(message: DocumentPageFormField): unknown {
    const obj: any = {};
    if (message.fieldName !== undefined) {
      obj.fieldName = DocumentPageLayout.toJSON(message.fieldName);
    }
    if (message.fieldValue !== undefined) {
      obj.fieldValue = DocumentPageLayout.toJSON(message.fieldValue);
    }
    if (message.nameDetectedLanguages?.length) {
      obj.nameDetectedLanguages = message.nameDetectedLanguages.map((e) => DocumentPageDetectedLanguage.toJSON(e));
    }
    if (message.valueDetectedLanguages?.length) {
      obj.valueDetectedLanguages = message.valueDetectedLanguages.map((e) => DocumentPageDetectedLanguage.toJSON(e));
    }
    if (message.valueType !== undefined && message.valueType !== "") {
      obj.valueType = message.valueType;
    }
    if (message.correctedKeyText !== undefined && message.correctedKeyText !== "") {
      obj.correctedKeyText = message.correctedKeyText;
    }
    if (message.correctedValueText !== undefined && message.correctedValueText !== "") {
      obj.correctedValueText = message.correctedValueText;
    }
    if (message.provenance !== undefined) {
      obj.provenance = DocumentProvenance.toJSON(message.provenance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageFormField>, I>>(base?: I): DocumentPageFormField {
    return DocumentPageFormField.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageFormField>, I>>(object: I): DocumentPageFormField {
    const message = createBaseDocumentPageFormField();
    message.fieldName = (object.fieldName !== undefined && object.fieldName !== null)
      ? DocumentPageLayout.fromPartial(object.fieldName)
      : undefined;
    message.fieldValue = (object.fieldValue !== undefined && object.fieldValue !== null)
      ? DocumentPageLayout.fromPartial(object.fieldValue)
      : undefined;
    message.nameDetectedLanguages =
      object.nameDetectedLanguages?.map((e) => DocumentPageDetectedLanguage.fromPartial(e)) || [];
    message.valueDetectedLanguages =
      object.valueDetectedLanguages?.map((e) => DocumentPageDetectedLanguage.fromPartial(e)) || [];
    message.valueType = object.valueType ?? "";
    message.correctedKeyText = object.correctedKeyText ?? "";
    message.correctedValueText = object.correctedValueText ?? "";
    message.provenance = (object.provenance !== undefined && object.provenance !== null)
      ? DocumentProvenance.fromPartial(object.provenance)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DocumentPageFormField.$type, DocumentPageFormField);

function createBaseDocumentPageDetectedBarcode(): DocumentPageDetectedBarcode {
  return { $type: "google.cloud.documentai.v1.Document.Page.DetectedBarcode", layout: undefined, barcode: undefined };
}

export const DocumentPageDetectedBarcode = {
  $type: "google.cloud.documentai.v1.Document.Page.DetectedBarcode" as const,

  encode(message: DocumentPageDetectedBarcode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.layout !== undefined) {
      DocumentPageLayout.encode(message.layout, writer.uint32(10).fork()).ldelim();
    }
    if (message.barcode !== undefined) {
      Barcode.encode(message.barcode, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageDetectedBarcode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageDetectedBarcode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.layout = DocumentPageLayout.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.barcode = Barcode.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageDetectedBarcode {
    return {
      $type: DocumentPageDetectedBarcode.$type,
      layout: isSet(object.layout) ? DocumentPageLayout.fromJSON(object.layout) : undefined,
      barcode: isSet(object.barcode) ? Barcode.fromJSON(object.barcode) : undefined,
    };
  },

  toJSON(message: DocumentPageDetectedBarcode): unknown {
    const obj: any = {};
    if (message.layout !== undefined) {
      obj.layout = DocumentPageLayout.toJSON(message.layout);
    }
    if (message.barcode !== undefined) {
      obj.barcode = Barcode.toJSON(message.barcode);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageDetectedBarcode>, I>>(base?: I): DocumentPageDetectedBarcode {
    return DocumentPageDetectedBarcode.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageDetectedBarcode>, I>>(object: I): DocumentPageDetectedBarcode {
    const message = createBaseDocumentPageDetectedBarcode();
    message.layout = (object.layout !== undefined && object.layout !== null)
      ? DocumentPageLayout.fromPartial(object.layout)
      : undefined;
    message.barcode = (object.barcode !== undefined && object.barcode !== null)
      ? Barcode.fromPartial(object.barcode)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DocumentPageDetectedBarcode.$type, DocumentPageDetectedBarcode);

function createBaseDocumentPageDetectedLanguage(): DocumentPageDetectedLanguage {
  return { $type: "google.cloud.documentai.v1.Document.Page.DetectedLanguage", languageCode: "", confidence: 0 };
}

export const DocumentPageDetectedLanguage = {
  $type: "google.cloud.documentai.v1.Document.Page.DetectedLanguage" as const,

  encode(message: DocumentPageDetectedLanguage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.languageCode !== undefined && message.languageCode !== "") {
      writer.uint32(10).string(message.languageCode);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(21).float(message.confidence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageDetectedLanguage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageDetectedLanguage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.languageCode = reader.string();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.confidence = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageDetectedLanguage {
    return {
      $type: DocumentPageDetectedLanguage.$type,
      languageCode: isSet(object.languageCode) ? globalThis.String(object.languageCode) : "",
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
    };
  },

  toJSON(message: DocumentPageDetectedLanguage): unknown {
    const obj: any = {};
    if (message.languageCode !== undefined && message.languageCode !== "") {
      obj.languageCode = message.languageCode;
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageDetectedLanguage>, I>>(base?: I): DocumentPageDetectedLanguage {
    return DocumentPageDetectedLanguage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageDetectedLanguage>, I>>(object: I): DocumentPageDetectedLanguage {
    const message = createBaseDocumentPageDetectedLanguage();
    message.languageCode = object.languageCode ?? "";
    message.confidence = object.confidence ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DocumentPageDetectedLanguage.$type, DocumentPageDetectedLanguage);

function createBaseDocumentEntity(): DocumentEntity {
  return {
    $type: "google.cloud.documentai.v1.Document.Entity",
    textAnchor: undefined,
    type: "",
    mentionText: "",
    mentionId: "",
    confidence: 0,
    pageAnchor: undefined,
    id: "",
    normalizedValue: undefined,
    properties: [],
    provenance: undefined,
    redacted: false,
  };
}

export const DocumentEntity = {
  $type: "google.cloud.documentai.v1.Document.Entity" as const,

  encode(message: DocumentEntity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.textAnchor !== undefined) {
      DocumentTextAnchor.encode(message.textAnchor, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== undefined && message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.mentionText !== undefined && message.mentionText !== "") {
      writer.uint32(26).string(message.mentionText);
    }
    if (message.mentionId !== undefined && message.mentionId !== "") {
      writer.uint32(34).string(message.mentionId);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(45).float(message.confidence);
    }
    if (message.pageAnchor !== undefined) {
      DocumentPageAnchor.encode(message.pageAnchor, writer.uint32(50).fork()).ldelim();
    }
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(58).string(message.id);
    }
    if (message.normalizedValue !== undefined) {
      DocumentEntityNormalizedValue.encode(message.normalizedValue, writer.uint32(74).fork()).ldelim();
    }
    if (message.properties !== undefined && message.properties.length !== 0) {
      for (const v of message.properties) {
        DocumentEntity.encode(v!, writer.uint32(82).fork()).ldelim();
      }
    }
    if (message.provenance !== undefined) {
      DocumentProvenance.encode(message.provenance, writer.uint32(90).fork()).ldelim();
    }
    if (message.redacted !== undefined && message.redacted !== false) {
      writer.uint32(96).bool(message.redacted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentEntity {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.textAnchor = DocumentTextAnchor.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.mentionText = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.mentionId = reader.string();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.confidence = reader.float();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.pageAnchor = DocumentPageAnchor.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.id = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.normalizedValue = DocumentEntityNormalizedValue.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.properties!.push(DocumentEntity.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.provenance = DocumentProvenance.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.redacted = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentEntity {
    return {
      $type: DocumentEntity.$type,
      textAnchor: isSet(object.textAnchor) ? DocumentTextAnchor.fromJSON(object.textAnchor) : undefined,
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      mentionText: isSet(object.mentionText) ? globalThis.String(object.mentionText) : "",
      mentionId: isSet(object.mentionId) ? globalThis.String(object.mentionId) : "",
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
      pageAnchor: isSet(object.pageAnchor) ? DocumentPageAnchor.fromJSON(object.pageAnchor) : undefined,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      normalizedValue: isSet(object.normalizedValue)
        ? DocumentEntityNormalizedValue.fromJSON(object.normalizedValue)
        : undefined,
      properties: globalThis.Array.isArray(object?.properties)
        ? object.properties.map((e: any) => DocumentEntity.fromJSON(e))
        : [],
      provenance: isSet(object.provenance) ? DocumentProvenance.fromJSON(object.provenance) : undefined,
      redacted: isSet(object.redacted) ? globalThis.Boolean(object.redacted) : false,
    };
  },

  toJSON(message: DocumentEntity): unknown {
    const obj: any = {};
    if (message.textAnchor !== undefined) {
      obj.textAnchor = DocumentTextAnchor.toJSON(message.textAnchor);
    }
    if (message.type !== undefined && message.type !== "") {
      obj.type = message.type;
    }
    if (message.mentionText !== undefined && message.mentionText !== "") {
      obj.mentionText = message.mentionText;
    }
    if (message.mentionId !== undefined && message.mentionId !== "") {
      obj.mentionId = message.mentionId;
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    if (message.pageAnchor !== undefined) {
      obj.pageAnchor = DocumentPageAnchor.toJSON(message.pageAnchor);
    }
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.normalizedValue !== undefined) {
      obj.normalizedValue = DocumentEntityNormalizedValue.toJSON(message.normalizedValue);
    }
    if (message.properties?.length) {
      obj.properties = message.properties.map((e) => DocumentEntity.toJSON(e));
    }
    if (message.provenance !== undefined) {
      obj.provenance = DocumentProvenance.toJSON(message.provenance);
    }
    if (message.redacted !== undefined && message.redacted !== false) {
      obj.redacted = message.redacted;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentEntity>, I>>(base?: I): DocumentEntity {
    return DocumentEntity.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentEntity>, I>>(object: I): DocumentEntity {
    const message = createBaseDocumentEntity();
    message.textAnchor = (object.textAnchor !== undefined && object.textAnchor !== null)
      ? DocumentTextAnchor.fromPartial(object.textAnchor)
      : undefined;
    message.type = object.type ?? "";
    message.mentionText = object.mentionText ?? "";
    message.mentionId = object.mentionId ?? "";
    message.confidence = object.confidence ?? 0;
    message.pageAnchor = (object.pageAnchor !== undefined && object.pageAnchor !== null)
      ? DocumentPageAnchor.fromPartial(object.pageAnchor)
      : undefined;
    message.id = object.id ?? "";
    message.normalizedValue = (object.normalizedValue !== undefined && object.normalizedValue !== null)
      ? DocumentEntityNormalizedValue.fromPartial(object.normalizedValue)
      : undefined;
    message.properties = object.properties?.map((e) => DocumentEntity.fromPartial(e)) || [];
    message.provenance = (object.provenance !== undefined && object.provenance !== null)
      ? DocumentProvenance.fromPartial(object.provenance)
      : undefined;
    message.redacted = object.redacted ?? false;
    return message;
  },
};

messageTypeRegistry.set(DocumentEntity.$type, DocumentEntity);

function createBaseDocumentEntityNormalizedValue(): DocumentEntityNormalizedValue {
  return {
    $type: "google.cloud.documentai.v1.Document.Entity.NormalizedValue",
    moneyValue: undefined,
    dateValue: undefined,
    datetimeValue: undefined,
    addressValue: undefined,
    booleanValue: undefined,
    integerValue: undefined,
    floatValue: undefined,
    text: "",
  };
}

export const DocumentEntityNormalizedValue = {
  $type: "google.cloud.documentai.v1.Document.Entity.NormalizedValue" as const,

  encode(message: DocumentEntityNormalizedValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.moneyValue !== undefined) {
      Money.encode(message.moneyValue, writer.uint32(18).fork()).ldelim();
    }
    if (message.dateValue !== undefined) {
      DateMessage.encode(message.dateValue, writer.uint32(26).fork()).ldelim();
    }
    if (message.datetimeValue !== undefined) {
      DateTime.encode(message.datetimeValue, writer.uint32(34).fork()).ldelim();
    }
    if (message.addressValue !== undefined) {
      PostalAddress.encode(message.addressValue, writer.uint32(42).fork()).ldelim();
    }
    if (message.booleanValue !== undefined) {
      writer.uint32(48).bool(message.booleanValue);
    }
    if (message.integerValue !== undefined) {
      writer.uint32(56).int32(message.integerValue);
    }
    if (message.floatValue !== undefined) {
      writer.uint32(69).float(message.floatValue);
    }
    if (message.text !== undefined && message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentEntityNormalizedValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentEntityNormalizedValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.moneyValue = Money.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.dateValue = DateMessage.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.datetimeValue = DateTime.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.addressValue = PostalAddress.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.booleanValue = reader.bool();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.integerValue = reader.int32();
          continue;
        case 8:
          if (tag !== 69) {
            break;
          }

          message.floatValue = reader.float();
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.text = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentEntityNormalizedValue {
    return {
      $type: DocumentEntityNormalizedValue.$type,
      moneyValue: isSet(object.moneyValue) ? Money.fromJSON(object.moneyValue) : undefined,
      dateValue: isSet(object.dateValue) ? DateMessage.fromJSON(object.dateValue) : undefined,
      datetimeValue: isSet(object.datetimeValue) ? DateTime.fromJSON(object.datetimeValue) : undefined,
      addressValue: isSet(object.addressValue) ? PostalAddress.fromJSON(object.addressValue) : undefined,
      booleanValue: isSet(object.booleanValue) ? globalThis.Boolean(object.booleanValue) : undefined,
      integerValue: isSet(object.integerValue) ? globalThis.Number(object.integerValue) : undefined,
      floatValue: isSet(object.floatValue) ? globalThis.Number(object.floatValue) : undefined,
      text: isSet(object.text) ? globalThis.String(object.text) : "",
    };
  },

  toJSON(message: DocumentEntityNormalizedValue): unknown {
    const obj: any = {};
    if (message.moneyValue !== undefined) {
      obj.moneyValue = Money.toJSON(message.moneyValue);
    }
    if (message.dateValue !== undefined) {
      obj.dateValue = DateMessage.toJSON(message.dateValue);
    }
    if (message.datetimeValue !== undefined) {
      obj.datetimeValue = DateTime.toJSON(message.datetimeValue);
    }
    if (message.addressValue !== undefined) {
      obj.addressValue = PostalAddress.toJSON(message.addressValue);
    }
    if (message.booleanValue !== undefined) {
      obj.booleanValue = message.booleanValue;
    }
    if (message.integerValue !== undefined) {
      obj.integerValue = Math.round(message.integerValue);
    }
    if (message.floatValue !== undefined) {
      obj.floatValue = message.floatValue;
    }
    if (message.text !== undefined && message.text !== "") {
      obj.text = message.text;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentEntityNormalizedValue>, I>>(base?: I): DocumentEntityNormalizedValue {
    return DocumentEntityNormalizedValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentEntityNormalizedValue>, I>>(
    object: I,
  ): DocumentEntityNormalizedValue {
    const message = createBaseDocumentEntityNormalizedValue();
    message.moneyValue = (object.moneyValue !== undefined && object.moneyValue !== null)
      ? Money.fromPartial(object.moneyValue)
      : undefined;
    message.dateValue = (object.dateValue !== undefined && object.dateValue !== null)
      ? DateMessage.fromPartial(object.dateValue)
      : undefined;
    message.datetimeValue = (object.datetimeValue !== undefined && object.datetimeValue !== null)
      ? DateTime.fromPartial(object.datetimeValue)
      : undefined;
    message.addressValue = (object.addressValue !== undefined && object.addressValue !== null)
      ? PostalAddress.fromPartial(object.addressValue)
      : undefined;
    message.booleanValue = object.booleanValue ?? undefined;
    message.integerValue = object.integerValue ?? undefined;
    message.floatValue = object.floatValue ?? undefined;
    message.text = object.text ?? "";
    return message;
  },
};

messageTypeRegistry.set(DocumentEntityNormalizedValue.$type, DocumentEntityNormalizedValue);

function createBaseDocumentEntityRelation(): DocumentEntityRelation {
  return { $type: "google.cloud.documentai.v1.Document.EntityRelation", subjectId: "", objectId: "", relation: "" };
}

export const DocumentEntityRelation = {
  $type: "google.cloud.documentai.v1.Document.EntityRelation" as const,

  encode(message: DocumentEntityRelation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subjectId !== undefined && message.subjectId !== "") {
      writer.uint32(10).string(message.subjectId);
    }
    if (message.objectId !== undefined && message.objectId !== "") {
      writer.uint32(18).string(message.objectId);
    }
    if (message.relation !== undefined && message.relation !== "") {
      writer.uint32(26).string(message.relation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentEntityRelation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentEntityRelation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.subjectId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.objectId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.relation = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentEntityRelation {
    return {
      $type: DocumentEntityRelation.$type,
      subjectId: isSet(object.subjectId) ? globalThis.String(object.subjectId) : "",
      objectId: isSet(object.objectId) ? globalThis.String(object.objectId) : "",
      relation: isSet(object.relation) ? globalThis.String(object.relation) : "",
    };
  },

  toJSON(message: DocumentEntityRelation): unknown {
    const obj: any = {};
    if (message.subjectId !== undefined && message.subjectId !== "") {
      obj.subjectId = message.subjectId;
    }
    if (message.objectId !== undefined && message.objectId !== "") {
      obj.objectId = message.objectId;
    }
    if (message.relation !== undefined && message.relation !== "") {
      obj.relation = message.relation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentEntityRelation>, I>>(base?: I): DocumentEntityRelation {
    return DocumentEntityRelation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentEntityRelation>, I>>(object: I): DocumentEntityRelation {
    const message = createBaseDocumentEntityRelation();
    message.subjectId = object.subjectId ?? "";
    message.objectId = object.objectId ?? "";
    message.relation = object.relation ?? "";
    return message;
  },
};

messageTypeRegistry.set(DocumentEntityRelation.$type, DocumentEntityRelation);

function createBaseDocumentTextAnchor(): DocumentTextAnchor {
  return { $type: "google.cloud.documentai.v1.Document.TextAnchor", textSegments: [], content: "" };
}

export const DocumentTextAnchor = {
  $type: "google.cloud.documentai.v1.Document.TextAnchor" as const,

  encode(message: DocumentTextAnchor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.textSegments !== undefined && message.textSegments.length !== 0) {
      for (const v of message.textSegments) {
        DocumentTextAnchorTextSegment.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    if (message.content !== undefined && message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentTextAnchor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentTextAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.textSegments!.push(DocumentTextAnchorTextSegment.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.content = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentTextAnchor {
    return {
      $type: DocumentTextAnchor.$type,
      textSegments: globalThis.Array.isArray(object?.textSegments)
        ? object.textSegments.map((e: any) => DocumentTextAnchorTextSegment.fromJSON(e))
        : [],
      content: isSet(object.content) ? globalThis.String(object.content) : "",
    };
  },

  toJSON(message: DocumentTextAnchor): unknown {
    const obj: any = {};
    if (message.textSegments?.length) {
      obj.textSegments = message.textSegments.map((e) => DocumentTextAnchorTextSegment.toJSON(e));
    }
    if (message.content !== undefined && message.content !== "") {
      obj.content = message.content;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentTextAnchor>, I>>(base?: I): DocumentTextAnchor {
    return DocumentTextAnchor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentTextAnchor>, I>>(object: I): DocumentTextAnchor {
    const message = createBaseDocumentTextAnchor();
    message.textSegments = object.textSegments?.map((e) => DocumentTextAnchorTextSegment.fromPartial(e)) || [];
    message.content = object.content ?? "";
    return message;
  },
};

messageTypeRegistry.set(DocumentTextAnchor.$type, DocumentTextAnchor);

function createBaseDocumentTextAnchorTextSegment(): DocumentTextAnchorTextSegment {
  return { $type: "google.cloud.documentai.v1.Document.TextAnchor.TextSegment", startIndex: 0, endIndex: 0 };
}

export const DocumentTextAnchorTextSegment = {
  $type: "google.cloud.documentai.v1.Document.TextAnchor.TextSegment" as const,

  encode(message: DocumentTextAnchorTextSegment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.startIndex !== undefined && message.startIndex !== 0) {
      writer.uint32(8).int64(message.startIndex);
    }
    if (message.endIndex !== undefined && message.endIndex !== 0) {
      writer.uint32(16).int64(message.endIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentTextAnchorTextSegment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentTextAnchorTextSegment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.startIndex = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.endIndex = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentTextAnchorTextSegment {
    return {
      $type: DocumentTextAnchorTextSegment.$type,
      startIndex: isSet(object.startIndex) ? globalThis.Number(object.startIndex) : 0,
      endIndex: isSet(object.endIndex) ? globalThis.Number(object.endIndex) : 0,
    };
  },

  toJSON(message: DocumentTextAnchorTextSegment): unknown {
    const obj: any = {};
    if (message.startIndex !== undefined && message.startIndex !== 0) {
      obj.startIndex = Math.round(message.startIndex);
    }
    if (message.endIndex !== undefined && message.endIndex !== 0) {
      obj.endIndex = Math.round(message.endIndex);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentTextAnchorTextSegment>, I>>(base?: I): DocumentTextAnchorTextSegment {
    return DocumentTextAnchorTextSegment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentTextAnchorTextSegment>, I>>(
    object: I,
  ): DocumentTextAnchorTextSegment {
    const message = createBaseDocumentTextAnchorTextSegment();
    message.startIndex = object.startIndex ?? 0;
    message.endIndex = object.endIndex ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DocumentTextAnchorTextSegment.$type, DocumentTextAnchorTextSegment);

function createBaseDocumentPageAnchor(): DocumentPageAnchor {
  return { $type: "google.cloud.documentai.v1.Document.PageAnchor", pageRefs: [] };
}

export const DocumentPageAnchor = {
  $type: "google.cloud.documentai.v1.Document.PageAnchor" as const,

  encode(message: DocumentPageAnchor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageRefs !== undefined && message.pageRefs.length !== 0) {
      for (const v of message.pageRefs) {
        DocumentPageAnchorPageRef.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageAnchor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pageRefs!.push(DocumentPageAnchorPageRef.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageAnchor {
    return {
      $type: DocumentPageAnchor.$type,
      pageRefs: globalThis.Array.isArray(object?.pageRefs)
        ? object.pageRefs.map((e: any) => DocumentPageAnchorPageRef.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DocumentPageAnchor): unknown {
    const obj: any = {};
    if (message.pageRefs?.length) {
      obj.pageRefs = message.pageRefs.map((e) => DocumentPageAnchorPageRef.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageAnchor>, I>>(base?: I): DocumentPageAnchor {
    return DocumentPageAnchor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageAnchor>, I>>(object: I): DocumentPageAnchor {
    const message = createBaseDocumentPageAnchor();
    message.pageRefs = object.pageRefs?.map((e) => DocumentPageAnchorPageRef.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(DocumentPageAnchor.$type, DocumentPageAnchor);

function createBaseDocumentPageAnchorPageRef(): DocumentPageAnchorPageRef {
  return {
    $type: "google.cloud.documentai.v1.Document.PageAnchor.PageRef",
    page: 0,
    layoutType: 0,
    layoutId: "",
    boundingPoly: undefined,
    confidence: 0,
  };
}

export const DocumentPageAnchorPageRef = {
  $type: "google.cloud.documentai.v1.Document.PageAnchor.PageRef" as const,

  encode(message: DocumentPageAnchorPageRef, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.page !== undefined && message.page !== 0) {
      writer.uint32(8).int64(message.page);
    }
    if (message.layoutType !== undefined && message.layoutType !== 0) {
      writer.uint32(16).int32(message.layoutType);
    }
    if (message.layoutId !== undefined && message.layoutId !== "") {
      writer.uint32(26).string(message.layoutId);
    }
    if (message.boundingPoly !== undefined) {
      BoundingPoly.encode(message.boundingPoly, writer.uint32(34).fork()).ldelim();
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      writer.uint32(45).float(message.confidence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentPageAnchorPageRef {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentPageAnchorPageRef();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.page = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.layoutType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.layoutId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.boundingPoly = BoundingPoly.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.confidence = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentPageAnchorPageRef {
    return {
      $type: DocumentPageAnchorPageRef.$type,
      page: isSet(object.page) ? globalThis.Number(object.page) : 0,
      layoutType: isSet(object.layoutType) ? documentPageAnchorPageRefLayoutTypeFromJSON(object.layoutType) : 0,
      layoutId: isSet(object.layoutId) ? globalThis.String(object.layoutId) : "",
      boundingPoly: isSet(object.boundingPoly) ? BoundingPoly.fromJSON(object.boundingPoly) : undefined,
      confidence: isSet(object.confidence) ? globalThis.Number(object.confidence) : 0,
    };
  },

  toJSON(message: DocumentPageAnchorPageRef): unknown {
    const obj: any = {};
    if (message.page !== undefined && message.page !== 0) {
      obj.page = Math.round(message.page);
    }
    if (message.layoutType !== undefined && message.layoutType !== 0) {
      obj.layoutType = documentPageAnchorPageRefLayoutTypeToJSON(message.layoutType);
    }
    if (message.layoutId !== undefined && message.layoutId !== "") {
      obj.layoutId = message.layoutId;
    }
    if (message.boundingPoly !== undefined) {
      obj.boundingPoly = BoundingPoly.toJSON(message.boundingPoly);
    }
    if (message.confidence !== undefined && message.confidence !== 0) {
      obj.confidence = message.confidence;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentPageAnchorPageRef>, I>>(base?: I): DocumentPageAnchorPageRef {
    return DocumentPageAnchorPageRef.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentPageAnchorPageRef>, I>>(object: I): DocumentPageAnchorPageRef {
    const message = createBaseDocumentPageAnchorPageRef();
    message.page = object.page ?? 0;
    message.layoutType = object.layoutType ?? 0;
    message.layoutId = object.layoutId ?? "";
    message.boundingPoly = (object.boundingPoly !== undefined && object.boundingPoly !== null)
      ? BoundingPoly.fromPartial(object.boundingPoly)
      : undefined;
    message.confidence = object.confidence ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DocumentPageAnchorPageRef.$type, DocumentPageAnchorPageRef);

function createBaseDocumentProvenance(): DocumentProvenance {
  return { $type: "google.cloud.documentai.v1.Document.Provenance", revision: 0, id: 0, parents: [], type: 0 };
}

export const DocumentProvenance = {
  $type: "google.cloud.documentai.v1.Document.Provenance" as const,

  encode(message: DocumentProvenance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.revision !== undefined && message.revision !== 0) {
      writer.uint32(8).int32(message.revision);
    }
    if (message.id !== undefined && message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    if (message.parents !== undefined && message.parents.length !== 0) {
      for (const v of message.parents) {
        DocumentProvenanceParent.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentProvenance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentProvenance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.revision = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.parents!.push(DocumentProvenanceParent.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
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

  fromJSON(object: any): DocumentProvenance {
    return {
      $type: DocumentProvenance.$type,
      revision: isSet(object.revision) ? globalThis.Number(object.revision) : 0,
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      parents: globalThis.Array.isArray(object?.parents)
        ? object.parents.map((e: any) => DocumentProvenanceParent.fromJSON(e))
        : [],
      type: isSet(object.type) ? documentProvenanceOperationTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: DocumentProvenance): unknown {
    const obj: any = {};
    if (message.revision !== undefined && message.revision !== 0) {
      obj.revision = Math.round(message.revision);
    }
    if (message.id !== undefined && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.parents?.length) {
      obj.parents = message.parents.map((e) => DocumentProvenanceParent.toJSON(e));
    }
    if (message.type !== undefined && message.type !== 0) {
      obj.type = documentProvenanceOperationTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentProvenance>, I>>(base?: I): DocumentProvenance {
    return DocumentProvenance.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentProvenance>, I>>(object: I): DocumentProvenance {
    const message = createBaseDocumentProvenance();
    message.revision = object.revision ?? 0;
    message.id = object.id ?? 0;
    message.parents = object.parents?.map((e) => DocumentProvenanceParent.fromPartial(e)) || [];
    message.type = object.type ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DocumentProvenance.$type, DocumentProvenance);

function createBaseDocumentProvenanceParent(): DocumentProvenanceParent {
  return { $type: "google.cloud.documentai.v1.Document.Provenance.Parent", revision: 0, index: 0, id: 0 };
}

export const DocumentProvenanceParent = {
  $type: "google.cloud.documentai.v1.Document.Provenance.Parent" as const,

  encode(message: DocumentProvenanceParent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.revision !== undefined && message.revision !== 0) {
      writer.uint32(8).int32(message.revision);
    }
    if (message.index !== undefined && message.index !== 0) {
      writer.uint32(24).int32(message.index);
    }
    if (message.id !== undefined && message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentProvenanceParent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentProvenanceParent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.revision = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.index = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentProvenanceParent {
    return {
      $type: DocumentProvenanceParent.$type,
      revision: isSet(object.revision) ? globalThis.Number(object.revision) : 0,
      index: isSet(object.index) ? globalThis.Number(object.index) : 0,
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
    };
  },

  toJSON(message: DocumentProvenanceParent): unknown {
    const obj: any = {};
    if (message.revision !== undefined && message.revision !== 0) {
      obj.revision = Math.round(message.revision);
    }
    if (message.index !== undefined && message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    if (message.id !== undefined && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentProvenanceParent>, I>>(base?: I): DocumentProvenanceParent {
    return DocumentProvenanceParent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentProvenanceParent>, I>>(object: I): DocumentProvenanceParent {
    const message = createBaseDocumentProvenanceParent();
    message.revision = object.revision ?? 0;
    message.index = object.index ?? 0;
    message.id = object.id ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DocumentProvenanceParent.$type, DocumentProvenanceParent);

function createBaseDocumentRevision(): DocumentRevision {
  return {
    $type: "google.cloud.documentai.v1.Document.Revision",
    agent: undefined,
    processor: undefined,
    id: "",
    parent: [],
    parentIds: [],
    createTime: undefined,
    humanReview: undefined,
  };
}

export const DocumentRevision = {
  $type: "google.cloud.documentai.v1.Document.Revision" as const,

  encode(message: DocumentRevision, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.agent !== undefined) {
      writer.uint32(34).string(message.agent);
    }
    if (message.processor !== undefined) {
      writer.uint32(42).string(message.processor);
    }
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.parent !== undefined && message.parent.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.parent) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.parentIds !== undefined && message.parentIds.length !== 0) {
      for (const v of message.parentIds) {
        writer.uint32(58).string(v!);
      }
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.humanReview !== undefined) {
      DocumentRevisionHumanReview.encode(message.humanReview, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentRevision {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentRevision();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.agent = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.processor = reader.string();
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag === 16) {
            message.parent!.push(reader.int32());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.parent!.push(reader.int32());
            }

            continue;
          }

          break;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.parentIds!.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.createTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.humanReview = DocumentRevisionHumanReview.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentRevision {
    return {
      $type: DocumentRevision.$type,
      agent: isSet(object.agent) ? globalThis.String(object.agent) : undefined,
      processor: isSet(object.processor) ? globalThis.String(object.processor) : undefined,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      parent: globalThis.Array.isArray(object?.parent) ? object.parent.map((e: any) => globalThis.Number(e)) : [],
      parentIds: globalThis.Array.isArray(object?.parentIds)
        ? object.parentIds.map((e: any) => globalThis.String(e))
        : [],
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      humanReview: isSet(object.humanReview) ? DocumentRevisionHumanReview.fromJSON(object.humanReview) : undefined,
    };
  },

  toJSON(message: DocumentRevision): unknown {
    const obj: any = {};
    if (message.agent !== undefined) {
      obj.agent = message.agent;
    }
    if (message.processor !== undefined) {
      obj.processor = message.processor;
    }
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.parent?.length) {
      obj.parent = message.parent.map((e) => Math.round(e));
    }
    if (message.parentIds?.length) {
      obj.parentIds = message.parentIds;
    }
    if (message.createTime !== undefined) {
      obj.createTime = message.createTime.toISOString();
    }
    if (message.humanReview !== undefined) {
      obj.humanReview = DocumentRevisionHumanReview.toJSON(message.humanReview);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentRevision>, I>>(base?: I): DocumentRevision {
    return DocumentRevision.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentRevision>, I>>(object: I): DocumentRevision {
    const message = createBaseDocumentRevision();
    message.agent = object.agent ?? undefined;
    message.processor = object.processor ?? undefined;
    message.id = object.id ?? "";
    message.parent = object.parent?.map((e) => e) || [];
    message.parentIds = object.parentIds?.map((e) => e) || [];
    message.createTime = object.createTime ?? undefined;
    message.humanReview = (object.humanReview !== undefined && object.humanReview !== null)
      ? DocumentRevisionHumanReview.fromPartial(object.humanReview)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(DocumentRevision.$type, DocumentRevision);

function createBaseDocumentRevisionHumanReview(): DocumentRevisionHumanReview {
  return { $type: "google.cloud.documentai.v1.Document.Revision.HumanReview", state: "", stateMessage: "" };
}

export const DocumentRevisionHumanReview = {
  $type: "google.cloud.documentai.v1.Document.Revision.HumanReview" as const,

  encode(message: DocumentRevisionHumanReview, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== undefined && message.state !== "") {
      writer.uint32(10).string(message.state);
    }
    if (message.stateMessage !== undefined && message.stateMessage !== "") {
      writer.uint32(18).string(message.stateMessage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentRevisionHumanReview {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentRevisionHumanReview();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.state = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stateMessage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentRevisionHumanReview {
    return {
      $type: DocumentRevisionHumanReview.$type,
      state: isSet(object.state) ? globalThis.String(object.state) : "",
      stateMessage: isSet(object.stateMessage) ? globalThis.String(object.stateMessage) : "",
    };
  },

  toJSON(message: DocumentRevisionHumanReview): unknown {
    const obj: any = {};
    if (message.state !== undefined && message.state !== "") {
      obj.state = message.state;
    }
    if (message.stateMessage !== undefined && message.stateMessage !== "") {
      obj.stateMessage = message.stateMessage;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentRevisionHumanReview>, I>>(base?: I): DocumentRevisionHumanReview {
    return DocumentRevisionHumanReview.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentRevisionHumanReview>, I>>(object: I): DocumentRevisionHumanReview {
    const message = createBaseDocumentRevisionHumanReview();
    message.state = object.state ?? "";
    message.stateMessage = object.stateMessage ?? "";
    return message;
  },
};

messageTypeRegistry.set(DocumentRevisionHumanReview.$type, DocumentRevisionHumanReview);

function createBaseDocumentTextChange(): DocumentTextChange {
  return {
    $type: "google.cloud.documentai.v1.Document.TextChange",
    textAnchor: undefined,
    changedText: "",
    provenance: [],
  };
}

export const DocumentTextChange = {
  $type: "google.cloud.documentai.v1.Document.TextChange" as const,

  encode(message: DocumentTextChange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.textAnchor !== undefined) {
      DocumentTextAnchor.encode(message.textAnchor, writer.uint32(10).fork()).ldelim();
    }
    if (message.changedText !== undefined && message.changedText !== "") {
      writer.uint32(18).string(message.changedText);
    }
    if (message.provenance !== undefined && message.provenance.length !== 0) {
      for (const v of message.provenance) {
        DocumentProvenance.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DocumentTextChange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDocumentTextChange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.textAnchor = DocumentTextAnchor.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.changedText = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.provenance!.push(DocumentProvenance.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DocumentTextChange {
    return {
      $type: DocumentTextChange.$type,
      textAnchor: isSet(object.textAnchor) ? DocumentTextAnchor.fromJSON(object.textAnchor) : undefined,
      changedText: isSet(object.changedText) ? globalThis.String(object.changedText) : "",
      provenance: globalThis.Array.isArray(object?.provenance)
        ? object.provenance.map((e: any) => DocumentProvenance.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DocumentTextChange): unknown {
    const obj: any = {};
    if (message.textAnchor !== undefined) {
      obj.textAnchor = DocumentTextAnchor.toJSON(message.textAnchor);
    }
    if (message.changedText !== undefined && message.changedText !== "") {
      obj.changedText = message.changedText;
    }
    if (message.provenance?.length) {
      obj.provenance = message.provenance.map((e) => DocumentProvenance.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DocumentTextChange>, I>>(base?: I): DocumentTextChange {
    return DocumentTextChange.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DocumentTextChange>, I>>(object: I): DocumentTextChange {
    const message = createBaseDocumentTextChange();
    message.textAnchor = (object.textAnchor !== undefined && object.textAnchor !== null)
      ? DocumentTextAnchor.fromPartial(object.textAnchor)
      : undefined;
    message.changedText = object.changedText ?? "";
    message.provenance = object.provenance?.map((e) => DocumentProvenance.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(DocumentTextChange.$type, DocumentTextChange);

function bytesFromBase64(b64: string): Uint8Array {
  const bin = globalThis.atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(globalThis.String.fromCharCode(byte));
  });
  return globalThis.btoa(bin.join(""));
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
