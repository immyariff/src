/// <reference types="vite/client" />

import type { InvoiceFormData } from "./features/invoice-management/invoices/components/InvoiceForm/types/invoiceFormTypes";
import type { PdfResponse } from "./features/invoice-management/invoices/components/InvoiceForm/types/pdfResponse";

declare global {
  interface Window {
    invoiceApi: {
      generateInvoicePdf: (form: InvoiceFormData) => Promise<PdfResponse>;
    };
  }
}

export {};
