import { pipe } from "fp-ts/function";
import type { Invoice } from "../../../types/invoice";

const createTestTotals = (items: Invoice["items"]): Invoice["totals"] =>
  pipe(
    items,
    (values) => values.reduce((total, item) => total + item.amount, 0),
    (subtotal) => ({ subtotal, superContribution: 0, total: subtotal }),
  );

export default createTestTotals;
