// import { pipe } from "fp-ts/function";

// import type {
//   CalculateInvoiceItems,
//   CalculatedInvoiceItem,
//   InvoiceItem,
// } from "./types/calculateInvoiceType";
// import calculateItemAmount from "./calculateItemAmount";

// type CalculateInvoiceItemsAmount = CalculateInvoiceItems;

// const calculateInvoiceItemsAmount: CalculateInvoiceItemsAmount = (
//   items: ReadonlyArray<InvoiceItem>,
// ): ReadonlyArray<CalculatedInvoiceItem> =>
//   pipe(
//     items,
//     calculateInvoiceItems,
//     // (invoiceItems: ReadonlyArray<InvoiceItem>): ReadonlyArray<CalculatedInvoiceItem> =>
//     //      invoiceItems.map(calculateItemAmount)
//   );

// /* Calculates the amounts for all invoice items.
//  */
// const calculateInvoiceItems: CalculateInvoiceItems = (
//   invoiceItems: ReadonlyArray<InvoiceItem>,
// ): ReadonlyArray<CalculatedInvoiceItem> =>
//   invoiceItems.map(calculateItemAmount);

// export default calculateInvoiceItemsAmount;
