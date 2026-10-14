export type FormatCurrency = (value: number) => string;
export type ParseNonNegativeNumber = (value: string) => number;

export const formatCurrency: FormatCurrency = (value) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(value);

export const parseNonNegativeNumber: ParseNonNegativeNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
};
