import type { PDFPage } from "pdf-lib";

import type { InvoiceItems } from "../../types/invoiceItem";
import type { PdfPosition } from "../types/pdfTypes";

const rowHeight = 20;

const dateColumnX = 50;
const descriptionColumnX = 120;

const hoursColumnRightX = 390;
const rateColumnRightX = 455;
const amountColumnRightX = 535;

const drawRightAlignedText = (
  page: PDFPage,
  text: string,
  rightX: number,
  y: number,
  size: number,
): void => {
  page.drawText(text, {
    x: rightX,
    y,
    size,
  });
};

const drawInvoiceItemsTable = (
  page: PDFPage,
  items: InvoiceItems,
  position: PdfPosition,
): void => {
  const headerY = position.y;

  page.drawText("Date", {
    x: dateColumnX,
    y: headerY,
    size: 10,
  });

  page.drawText("Description", {
    x: descriptionColumnX,
    y: headerY,
    size: 10,
  });

  drawRightAlignedText(page, "Hours", hoursColumnRightX, headerY, 10);

  drawRightAlignedText(page, "Rate", rateColumnRightX, headerY, 10);

  drawRightAlignedText(page, "Amount", amountColumnRightX, headerY, 10);

  items.forEach((item, index) => {
    const y = headerY - rowHeight * (index + 1);

    page.drawText(item.date, {
      x: dateColumnX,
      y,
      size: 9,
    });

    page.drawText(item.description, {
      x: descriptionColumnX,
      y,
      size: 9,
    });

    drawRightAlignedText(page, item.hours.toFixed(2), hoursColumnRightX, y, 9);

    drawRightAlignedText(page, item.rate.toFixed(2), rateColumnRightX, y, 9);

    drawRightAlignedText(
      page,
      `$${item.amount.toFixed(2)}`,
      amountColumnRightX,
      y,
      9,
    );
  });
};

export default drawInvoiceItemsTable;
