import type { InvoiceFormData } from "../types/invoiceFormTypes";

const initialInvoiceForm: InvoiceFormData = {
  invoiceNumber: "INV-0001",
  invoiceDate: new Date().toISOString().slice(0, 10),
  dueDate: "",
  provider: {
    fullName: "",
    email: "",
    abn: "",
  },
  participant: {
    fullName: "",
    email: "",
    number: "",
  },
  items: [
    {
      date: "",
      description: "",
      hours: 0,
      rate: 0,
    },
  ],
};

export default initialInvoiceForm;
