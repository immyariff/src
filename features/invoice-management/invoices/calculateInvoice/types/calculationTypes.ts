import type { InvoiceItem, InvoiceItems } from "../../types/invoiceItem";

export type AmountCalculator = (quantity: number) => (rate: number) => number;

export type TotalAmountCalculator = (
  items: ReadonlyArray<InvoiceItem>,
) => number;

export type InvoiceItemAmountCalculator = (item: InvoiceItem) => InvoiceItem;

export type InvoiceItemsCalculator = (items: InvoiceItems) => InvoiceItems;

export type Calculation<Input, Output> = (value: Input) => Output;
