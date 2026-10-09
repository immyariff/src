import type { Calculation } from "./types/calculationTypes";

const chainCalculations =
  <Input, Middle, Output>(first: Calculation<Input, Middle>) =>
  (second: Calculation<Middle, Output>): Calculation<Input, Output> =>
  (value) =>
    second(first(value));

export default chainCalculations;
