import type { InvoicePdfPayload, PdfResponse } from "./invoiceForm";

export type GenerateInvoicePdf = (
  invoice: InvoicePdfPayload,
) => Promise<PdfResponse>;
