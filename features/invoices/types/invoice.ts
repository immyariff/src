import { type GoogleDriveLink } from "../../services/google/googledrive/googleDriveLink";

export type InvoiceId = (invoiceId: string ) => string;
export type InvoiceNumber = (invoiceNumber: number) => number;
export type InvoiceCreatedAt = (createdAt: Date) => Date;
export type InvoiceStatus = "Pending" | "Sent" | "Error";


export const invoiceId: InvoiceId = (invoiceId) => invoiceId;
export const invoiceNumber: InvoiceNumber = (invoiceNumber) => invoiceNumber;
export const invoiceCreatedAt: InvoiceCreatedAt = (createdAt) => createdAt;
export const invoiceGoogleDriveLink: GoogleDriveLink = (googleDriveLink) => googleDriveLink;
export const invoiceStatus: InvoiceStatus = "Pending";


export type Invoice = Readonly<{
  readonly id: InvoiceId;
  readonly invoiceNumber: InvoiceNumber;
  readonly createdAt: InvoiceCreatedAt;
  readonly googleDriveLink: GoogleDriveLink;
  readonly status: InvoiceStatus;
}>;

