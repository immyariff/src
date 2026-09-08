import { pipe } from "fp-ts/lib/function";

import type {
  CalculateInvoice,
  CalculateInvoiceItems,
  CalculateInvoiceItem,
  CalculatedInvoiceItem,
  CalculateSubtotal,
  CalculateSuperContribution,
  CalculateTotal,
  InvoiceItem,
  InvoiceCalculation,
} from "./types/calculateInvoiceType";

/**
 * Calculates the amount for one invoice item.
 *
 * Amount = Hours × Rate
 */
export const calculateItemAmount: CalculateInvoiceItem = (
  item: InvoiceItem,
): CalculatedInvoiceItem =>
  pipe(
    item,
    (invoiceItem: InvoiceItem): CalculatedInvoiceItem => ({
      ...invoiceItem,
      amount: invoiceItem.hours * invoiceItem.rate,
    }),
  );

/**
 * Calculates the amounts for all invoice items.
 */
export const calculateInvoiceItems: CalculateInvoiceItems = (
  items: ReadonlyArray<InvoiceItem>,
): ReadonlyArray<CalculatedInvoiceItem> =>
  pipe(
    items,
    (
      invoiceItems: ReadonlyArray<InvoiceItem>,
    ): ReadonlyArray<CalculatedInvoiceItem> =>
      invoiceItems.map(calculateItemAmount),
  );

/**
 * Calculates the subtotal of all invoice items.
 */
export const calculateSubtotal: CalculateSubtotal = (
  items: ReadonlyArray<CalculatedInvoiceItem>,
): number =>
  pipe(items, (invoiceItems: ReadonlyArray<CalculatedInvoiceItem>): number =>
    invoiceItems.reduce(
      (subtotal: number, item: CalculatedInvoiceItem): number =>
        subtotal + item.amount,
      0,
    ),
  );

/**
 * Calculates the employer superannuation contribution.
 *
 * Example:
 * grossAmount = 700
 * superRate = 0.12
 *
 * result = 84
 */
export const calculateSuperContribution: CalculateSuperContribution = (
  grossAmount: number,
  superRate: number,
): number =>
  pipe(grossAmount * superRate, (superContribution: number): number =>
    Number(superContribution.toFixed(2)),
  );

/**
 * Calculates the final invoice total.
 *
 * The superannuation contribution is included in the gross payment.
 */
export const calculateTotal: CalculateTotal = (
  subtotal: number,
  superContribution: number,
): number =>
  pipe(subtotal + superContribution, (total: number): number =>
    Number(total.toFixed(2)),
  );

/**
 * Performs all invoice calculations.
 *
 * Calculation flow:
 *
 * Invoice Items
 *      ↓
 * Item Amounts
 *      ↓
 * Subtotal
 *      ↓
 * Super Contribution
 *      ↓
 * Total
 */
export const calculateInvoice: CalculateInvoice = (
  items: ReadonlyArray<InvoiceItem>,
  superRate: number,
): InvoiceCalculation =>
  pipe(
    calculateInvoiceItems(items),
    (
      calculatedItems: ReadonlyArray<CalculatedInvoiceItem>,
    ): InvoiceCalculation => {
      const subtotal: number = calculateSubtotal(calculatedItems);

      const superContribution: number = calculateSuperContribution(
        subtotal,
        superRate,
      );

      const total: number = calculateTotal(subtotal, superContribution);

      return {
        items: calculatedItems,
        subtotal,
        superContribution,
        total,
      };
    },
  );
