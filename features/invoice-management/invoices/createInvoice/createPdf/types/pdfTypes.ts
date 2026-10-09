import type { PDFPage } from "pdf-lib";

export type PdfPosition = {
  readonly x: number;
  readonly y: number;
};

export type PdfLayout = {
  readonly page: PDFPage;
  readonly position: PdfPosition;
};
