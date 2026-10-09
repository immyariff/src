import { format } from "date-fns";

export type InvoiceDate = (date: Date) => string;

const invoiceDateFormat: InvoiceDate = (date: Date): string => {
  const today = format(date, "dd MMMM yyyy");
  // const month = (date.getMonth() + 1).toString().padStart(2, "0");
  // const year = date.getFullYear().toString();
  return `${today}`;
};

export const invoiceDates = (
  issueDate: InvoiceDate,
  serviceStartDate: InvoiceDate = invoiceDateFormat,
  serviceEndDate: InvoiceDate = invoiceDateFormat,
  dueDate: InvoiceDate = invoiceDateFormat,
): InvoiceDates => ({
  issueDate,
  serviceStartDate,
  serviceEndDate,
  dueDate,
});

export type InvoiceDates = {
  readonly issueDate: InvoiceDate;
  readonly serviceStartDate: InvoiceDate;
  readonly serviceEndDate: InvoiceDate;
  readonly dueDate: InvoiceDate;
};
