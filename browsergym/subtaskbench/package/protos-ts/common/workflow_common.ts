/* eslint-disable */

export const protobufPackage = "common";

/** Enum to represent workflow template type */
export enum WorkflowTemplateType {
  UNSPECIFIED = 0,
  DRIVE_EXTRACTION = 1,
  DRIVE_EXTRACTION_SHEET = 2,
  DRIVE_CLASSIFICATION = 3,
  DRIVE_CLASSIFICATION_SHEET = 4,
  GMAIL_EXTRACTION_SHEET = 5,
  SFTP_CLASSIFICATION = 6,
  SFTP_CLASSIFICATION_SHEET = 7,
  SFTP_EXTRACTION = 8,
  SFTP_EXTRACTION_SHEET = 9,
  OUTLOOK_EXTRACTION_EXCEL = 10,
  SFTP_EXTRACTION_EXCEL = 11,
  SFTP_CLASSIFICATION_EXCEL = 12,
  FILE_EXTRACTION = 13,
  FILE_CLASSIFICATION = 14,
  UNRECOGNIZED = -1,
}

export function workflowTemplateTypeFromJSON(object: any): WorkflowTemplateType {
  switch (object) {
    case 0:
    case "WORKFLOW_TEMPLATE_TYPE_UNSPECIFIED":
      return WorkflowTemplateType.UNSPECIFIED;
    case 1:
    case "DRIVE_EXTRACTION":
      return WorkflowTemplateType.DRIVE_EXTRACTION;
    case 2:
    case "DRIVE_EXTRACTION_SHEET":
      return WorkflowTemplateType.DRIVE_EXTRACTION_SHEET;
    case 3:
    case "DRIVE_CLASSIFICATION":
      return WorkflowTemplateType.DRIVE_CLASSIFICATION;
    case 4:
    case "DRIVE_CLASSIFICATION_SHEET":
      return WorkflowTemplateType.DRIVE_CLASSIFICATION_SHEET;
    case 5:
    case "GMAIL_EXTRACTION_SHEET":
      return WorkflowTemplateType.GMAIL_EXTRACTION_SHEET;
    case 6:
    case "SFTP_CLASSIFICATION":
      return WorkflowTemplateType.SFTP_CLASSIFICATION;
    case 7:
    case "SFTP_CLASSIFICATION_SHEET":
      return WorkflowTemplateType.SFTP_CLASSIFICATION_SHEET;
    case 8:
    case "SFTP_EXTRACTION":
      return WorkflowTemplateType.SFTP_EXTRACTION;
    case 9:
    case "SFTP_EXTRACTION_SHEET":
      return WorkflowTemplateType.SFTP_EXTRACTION_SHEET;
    case 10:
    case "OUTLOOK_EXTRACTION_EXCEL":
      return WorkflowTemplateType.OUTLOOK_EXTRACTION_EXCEL;
    case 11:
    case "SFTP_EXTRACTION_EXCEL":
      return WorkflowTemplateType.SFTP_EXTRACTION_EXCEL;
    case 12:
    case "SFTP_CLASSIFICATION_EXCEL":
      return WorkflowTemplateType.SFTP_CLASSIFICATION_EXCEL;
    case 13:
    case "FILE_EXTRACTION":
      return WorkflowTemplateType.FILE_EXTRACTION;
    case 14:
    case "FILE_CLASSIFICATION":
      return WorkflowTemplateType.FILE_CLASSIFICATION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WorkflowTemplateType.UNRECOGNIZED;
  }
}

export function workflowTemplateTypeToJSON(object: WorkflowTemplateType): string {
  switch (object) {
    case WorkflowTemplateType.UNSPECIFIED:
      return "WORKFLOW_TEMPLATE_TYPE_UNSPECIFIED";
    case WorkflowTemplateType.DRIVE_EXTRACTION:
      return "DRIVE_EXTRACTION";
    case WorkflowTemplateType.DRIVE_EXTRACTION_SHEET:
      return "DRIVE_EXTRACTION_SHEET";
    case WorkflowTemplateType.DRIVE_CLASSIFICATION:
      return "DRIVE_CLASSIFICATION";
    case WorkflowTemplateType.DRIVE_CLASSIFICATION_SHEET:
      return "DRIVE_CLASSIFICATION_SHEET";
    case WorkflowTemplateType.GMAIL_EXTRACTION_SHEET:
      return "GMAIL_EXTRACTION_SHEET";
    case WorkflowTemplateType.SFTP_CLASSIFICATION:
      return "SFTP_CLASSIFICATION";
    case WorkflowTemplateType.SFTP_CLASSIFICATION_SHEET:
      return "SFTP_CLASSIFICATION_SHEET";
    case WorkflowTemplateType.SFTP_EXTRACTION:
      return "SFTP_EXTRACTION";
    case WorkflowTemplateType.SFTP_EXTRACTION_SHEET:
      return "SFTP_EXTRACTION_SHEET";
    case WorkflowTemplateType.OUTLOOK_EXTRACTION_EXCEL:
      return "OUTLOOK_EXTRACTION_EXCEL";
    case WorkflowTemplateType.SFTP_EXTRACTION_EXCEL:
      return "SFTP_EXTRACTION_EXCEL";
    case WorkflowTemplateType.SFTP_CLASSIFICATION_EXCEL:
      return "SFTP_CLASSIFICATION_EXCEL";
    case WorkflowTemplateType.FILE_EXTRACTION:
      return "FILE_EXTRACTION";
    case WorkflowTemplateType.FILE_CLASSIFICATION:
      return "FILE_CLASSIFICATION";
    case WorkflowTemplateType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
