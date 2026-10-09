import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import createTestInvoiceData from "./testInvoiceData";
import type { Invoice } from "../../../types/invoice";

const validateInvoice = (invoice: Invoice): E.Either<Error, Invoice> =>
  pipe(
    invoice,
    E.fromPredicate(
      (value) =>
        value.totals.total ===
        value.items.reduce((sum, item) => sum + item.amount, 0),
      () => new Error("Invoice total does not match its line items."),
    ),
  );

const testInvoice = validateInvoice(createTestInvoiceData());
export default testInvoice;
