export type PdfResponse = {
  readonly success: boolean;
  readonly canceled?: boolean;
  readonly filePath?: string;
  readonly error?: string;
};
