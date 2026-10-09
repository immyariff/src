import { pipe } from "fp-ts/function";
import type { InvoiceItemAmountCalculator } from "./types/calculationTypes";
import calculateAmount from "./calculateAmount";

const calculateInvoiceItem: InvoiceItemAmountCalculator = (item) =>
  pipe(item, (item) => ({
    ...item,
    amount: calculateAmount(item.hours)(item.rate),
  }));

export default calculateInvoiceItem;
