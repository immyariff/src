import { pipe } from "fp-ts/function";
import type { CreateInvoice } from "../createInvoice/types/createInvoiceType";
import invoiceData from "./invoiceData";


type PopulateInvoiceData = (data: typeof invoiceData) => CreateInvoice;
export const populateDataIntoInvoice: PopulateInvoiceData = (
  data: typeof invoiceData,
): CreateInvoice => ({
  createInvoiceId: data.createInvoiceId,
  createInvoiceNumber: data.createInvoiceNumber,
  //  createInvoiceCreatedAt: data.createInvoiceCreatedAt,
  createInvoiceGoogleDriveLink: data.createInvoiceGoogleDriveLink,
});

export const populateInvoiceData = pipe(invoiceData, (d) =>
  populateDataIntoInvoice(d),
);
