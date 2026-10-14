import type {
  InvoiceField,
  InvoiceFormState,
  UpdateInvoiceField,
} from "../../types/invoiceForm";
import { createEmptyServiceItem } from "./serviceItems";
import { getToday } from "./date";

export type CreateInitialInvoiceState = () => InvoiceFormState;

export const createInitialInvoiceState: CreateInitialInvoiceState = () => {
  const today = getToday();

  return {
    invoiceNumber: "INV-0001",
    issueDate: today,
    dueDate: today,
    providerName: "",
    providerEmail: "",
    providerAbn: "",
    participantName: "",
    participantEmail: "",
    participantNumber: "",
    items: [createEmptyServiceItem()],
  };
};

export const updateInvoiceField: UpdateInvoiceField = (
  state,
  field: InvoiceField,
  value,
) => ({ ...state, [field]: value });
