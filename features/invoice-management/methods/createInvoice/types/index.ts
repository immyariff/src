import {
  invoiceId,
  invoiceNumber,
  invoiceCreatedAt,
  invoiceGoogleDriveLink,
} from "../../../types/invoice";

type CreateInvoiceId = ReturnType<typeof invoiceId>;
type CreateInvoiceNumber = ReturnType<typeof invoiceNumber>;
type CreateInvoiceCreatedAt = ReturnType<typeof invoiceCreatedAt>;
type CreateInvoiceGoogleDriveLink = ReturnType<typeof invoiceGoogleDriveLink>;

export type CreateInvoice = {
  createInvoiceId: CreateInvoiceId;
  createInvoiceNumber: CreateInvoiceNumber;
  createInvoiceCreatedAt: CreateInvoiceCreatedAt;
  createInvoiceGoogleDriveLink: CreateInvoiceGoogleDriveLink;
};
