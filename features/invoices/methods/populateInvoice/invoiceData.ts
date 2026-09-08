import type { CreateInvoice } from "../createInvoice/types/createInvoiceType";

type InvoiceData = CreateInvoice;

const invoiceData: InvoiceData = {
  createInvoiceId: "INV-001",
  createInvoiceNumber: 1,
  createInvoiceCreatedAt: new Date(),
  createInvoiceGoogleDriveLink:
    "https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing",
};

export default invoiceData;
