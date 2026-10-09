import chainCalculations from "./chainCalculations";

import calculateInvoiceItems from "./calculateInvoiceItems";
import calculateTotalAmount from "./calculateTotalAmount";

const calculateInvoiceTotalAmount = chainCalculations(calculateInvoiceItems)(
  calculateTotalAmount,
);

export default calculateInvoiceTotalAmount;
