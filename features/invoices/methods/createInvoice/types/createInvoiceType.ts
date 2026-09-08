import {type InvoiceHeader  } from "../../populateInvoice/invoiceHeader";
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
  createInvoiceCreatedAt?: CreateInvoiceCreatedAt;
  createInvoiceGoogleDriveLink?: CreateInvoiceGoogleDriveLink;
};
export const createInvoice = (params: CreateInvoice) => ({
  id: invoiceId(params.createInvoiceId),
  invoiceNumber: invoiceNumber(params.createInvoiceNumber),
  //createdAt: invoiceCreatedAt(params.createInvoiceCreatedAt),
//  googleDriveLink: invoiceGoogleDriveLink(params.createInvoiceGoogleDriveLink),
});

export const invoice = (params: CreateInvoice) => createInvoice({
  createInvoiceId: params.createInvoiceId,
  createInvoiceNumber: params.createInvoiceNumber,
  createInvoiceGoogleDriveLink: params.createInvoiceGoogleDriveLink,
});


export const invoiceData = {
  createInvoiceId: "INV-001",
  createInvoiceNumber: 1,
  createInvoiceCreatedAt: new Date(),
  createInvoiceGoogleDriveLink:
    "https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing",
};