export type ServiceItemForm = {
  readonly date: string;
  readonly description: string;
  readonly hours: string;
  readonly rate: string;
};

export type InvoiceFormState = {
  readonly invoiceNumber: string;
  readonly issueDate: string;
  readonly dueDate: string;
  readonly providerName: string;
  readonly providerEmail: string;
  readonly providerAbn: string;
  readonly participantName: string;
  readonly participantEmail: string;
  readonly participantNumber: string;
  readonly items: ReadonlyArray<ServiceItemForm>;
};

export type InvoicePdfPayload = {
  readonly invoiceNumber: string;
  readonly invoiceDate: string;
  readonly dueDate: string;
  readonly provider: {
    readonly fullName: string;
    readonly email: string;
    readonly abn: string;
  };
  readonly participant: {
    readonly fullName: string;
    readonly email: string;
    readonly number: string;
  };
  readonly items: ReadonlyArray<{
    readonly date: string;
    readonly description: string;
    readonly hours: number;
    readonly rate: number;
  }>;
};

export type PdfResponse = {
  readonly success?: boolean;
  readonly canceled?: boolean;
  readonly filePath?: string;
  readonly error?: string;
};

export type InvoiceField =
  | "invoiceNumber"
  | "issueDate"
  | "dueDate"
  | "providerName"
  | "providerEmail"
  | "providerAbn"
  | "participantName"
  | "participantEmail"
  | "participantNumber";

export type ServiceItemField = keyof ServiceItemForm;

export type ValidationError = {
  readonly message: string;
};

export type ValidateInvoice = (
  state: InvoiceFormState,
) => import("fp-ts/Either").Either<ValidationError, InvoicePdfPayload>;

export type UpdateInvoiceField = (
  state: InvoiceFormState,
  field: InvoiceField,
  value: string,
) => InvoiceFormState;

export type UpdateServiceItem = (
  items: ReadonlyArray<ServiceItemForm>,
  index: number,
  field: ServiceItemField,
  value: string,
) => ReadonlyArray<ServiceItemForm>;
