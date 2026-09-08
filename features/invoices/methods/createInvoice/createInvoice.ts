import { pipe } from "fp-ts/function";
import { type CreateInvoice } from "./types/createInvoiceType";
import { InvoiceHeader } from "../populateInvoice/invoiceHeader";
import { printInvoiceHeaders } from "./printInvoice";
import {
  invoiceId,
  invoiceNumber,
  invoiceGoogleDriveLink,
} from "../../types/invoice";
import { populateDataIntoInvoice } from "../populateInvoice/populateInvoiceData";
import invoiceData from "../populateInvoice/invoiceData";

export const createInvoice = (params: CreateInvoice) => ({
  id: invoiceId(params.createInvoiceId),
  invoiceNumber: invoiceNumber(params.createInvoiceNumber),
  //createdAt: invoiceCreatedAt(params.createInvoiceCreatedAt),
  //googleDriveLink: invoiceGoogleDriveLink(params.createInvoiceGoogleDriveLink),
 // populateInvoiceData: populateDataIntoInvoice(invoiceData),
});

pipe(invoiceData, createInvoice, printInvoiceHeaders);
