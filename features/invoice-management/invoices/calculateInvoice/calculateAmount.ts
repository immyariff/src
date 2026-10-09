import type { AmountCalculator } from "./types/calculationTypes";

const calculateAmount: AmountCalculator = (quantity) => (rate) =>
  quantity * rate;

export default calculateAmount;
