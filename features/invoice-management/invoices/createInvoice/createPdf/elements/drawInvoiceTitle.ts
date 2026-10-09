import type { PDFPage } from "pdf-lib";

import type { PdfPosition } from "../types/pdfTypes";

const drawInvoiceTitle = (
  page: PDFPage,
  position: PdfPosition,
): void => {
  page.drawText("INVOICE", {
    x: position.x,
    y: position.y,
    size: 24,
  });
};

export default drawInvoiceTitle;