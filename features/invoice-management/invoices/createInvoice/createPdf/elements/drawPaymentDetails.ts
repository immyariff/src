import type { PDFPage } from "pdf-lib";

import type { PdfPosition } from "../types/pdfTypes";

const drawPaymentDetails = (page: PDFPage, position: PdfPosition): void => {
  page.drawText("PAYMENT DETAILS", {
    x: position.x,
    y: position.y,
    size: 10,
  });

  page.drawText("Payment details to be provided.", {
    x: position.x,
    y: position.y - 18,
    size: 9,
  });
};

export default drawPaymentDetails;
