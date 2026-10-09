export type InvoiceItem = {
  readonly date: string;
  readonly description: string;
  readonly hours: number;
  readonly rate: number;
  readonly amount: number;
};

export type InvoiceItems = ReadonlyArray<InvoiceItem>;
