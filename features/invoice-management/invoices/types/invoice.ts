import type { InvoiceItem } from "./invoiceItem";
import type { InvoiceNumber } from "./invoiceNumber";
import type { InvoiceDates } from "./invoiceDate";
import type { InvoiceTotals } from "./invoiceTotals";
import type { InvoiceBillTo } from "./invoiceBillTo";
import type { ServiceProvider } from "./serviceprovider";

export type Invoice = {
  readonly invoiceNumber: InvoiceNumber;
  readonly dates: InvoiceDates;
  readonly provider: ServiceProvider;
  readonly participant: InvoiceBillTo;
  readonly items: ReadonlyArray<InvoiceItem>;
  readonly totals: InvoiceTotals;
};
