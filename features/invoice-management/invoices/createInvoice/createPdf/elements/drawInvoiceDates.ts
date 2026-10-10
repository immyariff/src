import type { PDFPage } from "pdf-lib";

import type { InvoiceNumber } from "../../../types/invoiceNumber";
import type { InvoiceDates } from "../../../types/invoiceDate";
import type { PdfPosition } from "../types/pdfTypes";

const drawInvoiceDates = (
  page: PDFPage,
  invoiceNumber: InvoiceNumber,
  dates: InvoiceDates,
  position: PdfPosition,
): void => {
  page.drawText(`Invoice Number: ${invoiceNumber}`, {
    x: position.x,
    y: position.y,
    size: 10,
  });

  page.drawText(`Issue Date: ${dates.issueDate}`, {
    x: position.x,
    y: position.y - 18,
    size: 10,
  });

  page.drawText(
    `Service Period: ${dates.serviceStartDate} - ${dates.serviceEndDate}`,
    {
      x: position.x,
      y: position.y - 36,
      size: 10,
    },
  );

  page.drawText(`Payment Due: ${dates.dueDate}`, {
    x: position.x,
    y: position.y - 54,
    size: 10,
  });
};

export default drawInvoiceDates;