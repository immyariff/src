import type { PDFPage } from "pdf-lib";

import type { PdfPosition } from "../types/pdfTypes";

const drawSectionDivider = (
  page: PDFPage,
  position: PdfPosition,
  width: number,
): void => {
  page.drawLine({
    start: {
      x: position.x,
      y: position.y,
    },
    end: {
      x: position.x + width,
      y: position.y,
    },
    thickness: 0.8,
  });
};

export default drawSectionDivider;
