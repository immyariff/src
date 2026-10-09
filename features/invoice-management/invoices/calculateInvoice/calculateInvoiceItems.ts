import type { InvoiceItemsCalculator } from "./types/calculationTypes";

import calculateInvoiceItem from "./calculateInvoiceItem";

const calculateInvoiceItems: InvoiceItemsCalculator = (items) =>
  items.map(calculateInvoiceItem);

export default calculateInvoiceItems;
