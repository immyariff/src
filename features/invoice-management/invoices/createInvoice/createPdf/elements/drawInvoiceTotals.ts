import type { PDFPage } from "pdf-lib";

import type { InvoiceTotals } from "../../types/invoiceTotals";
import type { PdfPosition } from "../types/pdfTypes";

const drawInvoiceTotals = (
  page: PDFPage,
  totals: InvoiceTotals,
  position: PdfPosition,
): void => {
  page.drawText(`Subtotal: $${totals.subtotal.toFixed(2)}`, {
    x: position.x,
    y: position.y,
    size: 10,
  });

  page.drawText(`Super Contribution: $${totals.superContribution.toFixed(2)}`, {
    x: position.x,
    y: position.y - 18,
    size: 10,
  });

  page.drawText(`Total: $${totals.total.toFixed(2)}`, {
    x: position.x,
    y: position.y - 40,
    size: 12,
  });
};

export default drawInvoiceTotals;
