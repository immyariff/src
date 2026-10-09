import type { PDFPage } from "pdf-lib";

import type { Invoice } from "../../types/invoice";
import drawInvoiceDates from "./drawInvoiceDates";
import drawInvoiceTitle from "./drawInvoiceTitle";
import drawProviderDetails from "./drawProviderDetails";

const drawInvoiceHeader = (page: PDFPage, invoice: Invoice): void => {
  drawProviderDetails(page, invoice.provider, {
    x: 50,
    y: 750,
  });

  drawInvoiceTitle(page, {
    x: 400,
    y: 750,
  });

  drawInvoiceDates(page, invoice.invoiceNumber, invoice.dates, {
    x: 350,
    y: 710,
  });
};

export default drawInvoiceHeader;
