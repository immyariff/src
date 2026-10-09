
import type { TotalAmountCalculator } from "./types/calculationTypes";

const calculateTotalAmount: TotalAmountCalculator = (items) =>
items.reduce((totalAmount, item) => totalAmount + item.amount, 0);
export default calculateTotalAmount;
