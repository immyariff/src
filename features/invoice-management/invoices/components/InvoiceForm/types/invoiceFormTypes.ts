export type InvoiceProviderForm = {
  readonly fullName: string;
  readonly email: string;
  readonly abn: string;
};

export type InvoiceParticipantForm = {
  readonly fullName: string;
  readonly email: string;
  readonly number: string;
};

export type InvoiceServiceItemForm = {
  readonly date: string;
  readonly description: string;
  readonly hours: number;
  readonly rate: number;
};

export type InvoiceFormData = {
  readonly invoiceNumber: string;
  readonly invoiceDate: string;
  readonly dueDate: string;
  readonly provider: InvoiceProviderForm;
  readonly participant: InvoiceParticipantForm;
  readonly items: ReadonlyArray<InvoiceServiceItemForm>;
};

export type InvoicePdfResponse = {
  readonly success: boolean;
  readonly canceled?: boolean;
  readonly filePath?: string;
};
