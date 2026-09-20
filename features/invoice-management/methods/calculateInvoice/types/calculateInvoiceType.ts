export type InvoiceItem =  {
  readonly date: string;
  readonly description: string;
  readonly hours: number;
  readonly rate: number;
  readonly amount: number
};

export type CalculatedInvoiceItem = InvoiceItem & {
  readonly amount: number;
};

export type InvoiceCalculation = {
  readonly items: ReadonlyArray<CalculatedInvoiceItem>;
  readonly subtotal: number;
  readonly superContribution: number;
  readonly amount: ReadonlyArray<CalculateAmount>;
  readonly total: number;
};


export type CalculateInvoiceItem = (
  item: InvoiceItem
) => CalculatedInvoiceItem;

export type CalculateInvoiceItems = (
  items: ReadonlyArray<InvoiceItem>
) => ReadonlyArray<CalculatedInvoiceItem>;

export type CalculateAmount = (hour: number, rate: number) => number
export type CalculateSubtotal = (
  items: ReadonlyArray<CalculatedInvoiceItem>
) => number;

export type CalculateSuperContribution = (
  grossAmount: number,
  superRate: number
) => number;

export type CalculateTotal = (
  subtotal: number,
  superContribution: number
) => number;

export type CalculateInvoice = (
  items: ReadonlyArray<InvoiceItem>,
  superRate: number
) => InvoiceCalculation;

