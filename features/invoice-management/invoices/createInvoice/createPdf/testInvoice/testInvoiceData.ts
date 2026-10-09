import createTestProvider from "./testProvider";
import createTestParticipant from "./testParticipant";
import createTestItems from "./testItems";
import createTestTotals from "./testTotals";
import type { Invoice } from "../../../types/invoice";

const createTestInvoiceData = (): Invoice => {
  const items = createTestItems();
  return {
    invoiceNumber: "INV-0001",
    dates: "2026-10-03" as unknown as Invoice["dates"],
    provider: createTestProvider(),
    participant: createTestParticipant(),
    items,
    totals: createTestTotals(items),
  };
};

export default createTestInvoiceData;
