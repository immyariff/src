import type { Invoice } from "../../../types/invoice";

const createTestItems = (): Invoice["items"] => [
  {
    date: "01/10/2026",
    description: "Support Worker Services",
    hours: 4,
    rate: 65,
    amount: 260,
  },
  {
    date: "02/10/2026",
    description: "Support Worker Services",
    hours: 3,
    rate: 65,
    amount: 195,
  },
];

export default createTestItems;
