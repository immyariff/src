import { type GoogleDriveLink } from "../../services/google/googledrive/googleDriveLink";

export type InvoiceId = (invoiceId: string) => string;
export type InvoiceNumber = (invoiceNumber: number) => number;
export type InvoiceCreatedAt = (createdAt: Date) => Date;
export type InvoiceStatus = (status: "Pending" | "Sent" | "Error") => string;
export type InvoiceHeader = {
  invoiceId: InvoiceId;
  invoiceNumber: InvoiceNumber;
};

export const invoiceId: InvoiceId = (invoiceId) => invoiceId;
export const invoiceNumber: InvoiceHeader["invoiceNumber"] = (invoiceNumber) =>
  invoiceNumber;
export const invoiceCreatedAt: InvoiceCreatedAt = (createdAt) => createdAt;
export const invoiceGoogleDriveLink: GoogleDriveLink = (googleDriveLink) =>
  googleDriveLink;
export const invoiceStatus: InvoiceStatus = (status) => status;

export const invoiceData: {
  id: InvoiceId;
  invoiceNumber: InvoiceNumber;
  createdAt: InvoiceCreatedAt;
  googleDriveLink: GoogleDriveLink;
  status: InvoiceStatus;
} = {
  id: invoiceId,
  invoiceNumber: invoiceNumber,
  createdAt: invoiceCreatedAt,
  googleDriveLink: invoiceGoogleDriveLink,
  status: invoiceStatus,
};
