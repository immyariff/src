import { PDFDocument, PDFPage, PDFFont, rgb, StandardFonts } from "pdf-lib";

import type { Invoice } from "../../../invoices/types/invoice";

const PAGE_MARGIN = 50;
const FONT_SIZE = 10;
const SMALL_FONT_SIZE = 9;
const TITLE_FONT_SIZE = 24;
const SECTION_FONT_SIZE = 11;

const createPdf = async (invoice: Invoice): Promise<Uint8Array> => {
  const document = await PDFDocument.create();

  const regularFont = await document.embedFont(StandardFonts.Helvetica);
  const boldFont = await document.embedFont(StandardFonts.HelveticaBold);

  const page = document.addPage();

  drawInvoiceHeader(page, invoice, regularFont, boldFont);
  drawParticipantDetails(page, invoice, regularFont, boldFont);
  drawInvoiceItems(page, invoice, regularFont, boldFont);
  drawInvoiceTotals(page, invoice, regularFont, boldFont);

  return document.save();
};

const drawInvoiceHeader = (
  page: PDFPage,
  invoice: Invoice,
  regularFont: PDFFont,
  boldFont: PDFFont,
): void => {
  const { height } = page.getSize();

  const providerX = PAGE_MARGIN;
  const titleX = 420;

  page.drawText(`Provider Name: ${invoice.provider.name.fullName}`, {
    x: providerX,
    y: height - 60,
    size: 16,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(`ABN: ${invoice.provider.abn}`, {
    x: providerX,
    y: height - 78,
    size: SMALL_FONT_SIZE,
    font: regularFont,
  });

  page.drawText(`Email: ${invoice.provider.email.email}`, {
    x: providerX,
    y: height - 94,
    size: SMALL_FONT_SIZE,
    font: regularFont,
  });

  page.drawText("INVOICE", {
    x: titleX,
    y: height - 65,
    size: TITLE_FONT_SIZE,
    font: boldFont,
  });

  page.drawText(`Invoice No: ${invoice.invoiceNumber}`, {
    x: titleX,
    y: height - 90,
    size: SMALL_FONT_SIZE,
    font: regularFont,
  });

  page.drawText(`Issued Date: ${invoice.dates.issueDate(new Date())}`, {
    x: titleX,
    y: height - 106,
    size: SMALL_FONT_SIZE,
    font: regularFont,
  });

  page.drawText(`Due Date: ${invoice.dates.dueDate(new Date())}`, {
    x: titleX,
    y: height - 122,
    size: SMALL_FONT_SIZE,
    font: regularFont,
  });
};

const drawParticipantDetails = (
  page: PDFPage,
  invoice: Invoice,
  regularFont: PDFFont,
  boldFont: PDFFont,
): void => {
  const { height } = page.getSize();
  const top = height - 145;

  page.drawText("NDIS PARTICIPANT", {
    x: PAGE_MARGIN,
    y: top,
    size: SECTION_FONT_SIZE,
    font: boldFont,
  });

  page.drawText(`Participant Name: ${invoice.participant.name.fullName}`, {
    x: PAGE_MARGIN,
    y: top - 18,
    size: FONT_SIZE,
    font: regularFont,
  });

  page.drawText(`NDIS Number: ${invoice.participant.participantNdisNumber}`, {
    x: PAGE_MARGIN,
    y: top - 34,
    size: SMALL_FONT_SIZE,
    font: regularFont,
  });

  page.drawText(`Participant Email: ${invoice.participant.email.email}`, {
    x: PAGE_MARGIN,
    y: top - 50,
    size: SMALL_FONT_SIZE,
    font: regularFont,
  });
};

const drawInvoiceItems = (
  page: PDFPage,
  invoice: Invoice,
  regularFont: PDFFont,
  boldFont: PDFFont,
): void => {
  const tableTop = page.getSize().height - 245;

  const dateX = 55;
  const descriptionX = 145;
  const hoursX = 405;
  const rateX = 455;
  const amountX = 515;
  const rowHeight = 24;

  page.drawRectangle({
    x: PAGE_MARGIN,
    y: tableTop,
    width: 495,
    height: rowHeight,
    color: rgb(0.92, 0.92, 0.92),
  });

  page.drawText("Date", {
    x: dateX,
    y: tableTop + 7,
    size: FONT_SIZE,
    font: boldFont,
  });

  page.drawText("Description", {
    x: descriptionX,
    y: tableTop + 7,
    size: FONT_SIZE,
    font: boldFont,
  });

  drawRightAlignedText(
    page,
    "Hours",
    hoursX,
    tableTop + 7,
    boldFont,
    FONT_SIZE,
  );

  drawRightAlignedText(page, "Rate", rateX, tableTop + 7, boldFont, FONT_SIZE);

  drawRightAlignedText(
    page,
    "Amount",
    amountX,
    tableTop + 7,
    boldFont,
    FONT_SIZE,
  );

  invoice.items.forEach((item, index) => {
    const rowY = tableTop - rowHeight * (index + 1);

    page.drawLine({
      start: { x: PAGE_MARGIN, y: rowY },
      end: { x: PAGE_MARGIN + 495, y: rowY },
      thickness: 0.5,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText(item.date, {
      x: dateX,
      y: rowY + 7,
      size: SMALL_FONT_SIZE,
      font: regularFont,
    });

    page.drawText(item.description, {
      x: descriptionX,
      y: rowY + 7,
      size: SMALL_FONT_SIZE,
      font: regularFont,
      maxWidth: 240,
    });

    drawRightAlignedText(
      page,
      item.hours.toFixed(2),
      hoursX,
      rowY + 7,
      regularFont,
      SMALL_FONT_SIZE,
    );

    drawRightAlignedText(
      page,
      item.rate.toFixed(2),
      rateX,
      rowY + 7,
      regularFont,
      SMALL_FONT_SIZE,
    );

    drawRightAlignedText(
      page,
      formatCurrency(item.amount),
      amountX,
      rowY + 7,
      regularFont,
      SMALL_FONT_SIZE,
    );
  });
};

const drawInvoiceTotals = (
  page: PDFPage,
  invoice: Invoice,
  regularFont: PDFFont,
  boldFont: PDFFont,
): void => {
  const { height } = page.getSize();

  const labelX = 400;
  const valueX = 545;
  const y = height - 530;

  page.drawText("Subtotal", {
    x: labelX,
    y,
    size: FONT_SIZE,
    font: regularFont,
  });

  drawRightAlignedText(
    page,
    formatCurrency(invoice.totals.subtotal),
    valueX,
    y,
    regularFont,
    FONT_SIZE,
  );

  page.drawText("Super Contribution", {
    x: labelX,
    y: y - 20,
    size: FONT_SIZE,
    font: regularFont,
  });

  drawRightAlignedText(
    page,
    formatCurrency(invoice.totals.superContribution),
    valueX,
    y - 20,
    regularFont,
    FONT_SIZE,
  );

  page.drawLine({
    start: { x: labelX, y: y - 32 },
    end: { x: valueX, y: y - 32 },
    thickness: 1,
  });

  page.drawText("TOTAL", {
    x: labelX,
    y: y - 52,
    size: 12,
    font: boldFont,
  });

  drawRightAlignedText(
    page,
    formatCurrency(invoice.totals.total),
    valueX,
    y - 52,
    boldFont,
    12,
  );
};

const drawRightAlignedText = (
  page: PDFPage,
  text: string,
  rightX: number,
  y: number,
  font: PDFFont,
  size: number,
): void => {
  const textWidth = font.widthOfTextAtSize(text, size);

  page.drawText(text, {
    x: rightX - textWidth,
    y,
    size,
    font,
  });
};

const formatCurrency = (amount: number): string => `$${amount.toFixed(2)}`;

export default createPdf;
