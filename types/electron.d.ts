export {};

declare global {
  interface Window {
    invoiceApi: {
      generateInvoicePdf: (invoice: unknown) => Promise<{
        success: boolean;
        canceled?: boolean;
        filePath?: string;
      }>;
    };
  }
}
