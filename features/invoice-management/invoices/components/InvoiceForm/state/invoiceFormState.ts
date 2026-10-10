import type { Dispatch, SetStateAction } from "react";

import type {
  InvoiceFormData,
  InvoiceProviderForm,
  InvoiceParticipantForm,
  InvoiceServiceItemForm,
} from "../types/invoiceFormTypes";

export type SetInvoiceForm = Dispatch<SetStateAction<InvoiceFormData>>;

export const updateInvoiceNumber = (
  setForm: SetInvoiceForm,
  value: string,
): void =>
  setForm((current) => ({
    ...current,
    invoiceNumber: value,
  }));

export const updateInvoiceDate = (
  setForm: SetInvoiceForm,
  value: string,
): void =>
  setForm((current) => ({
    ...current,
    invoiceDate: value,
  }));

export const updateDueDate = (setForm: SetInvoiceForm, value: string): void =>
  setForm((current) => ({
    ...current,
    dueDate: value,
  }));

export const updateProvider = (
  setForm: SetInvoiceForm,
  update: (provider: InvoiceProviderForm) => InvoiceProviderForm,
): void =>
  setForm((current) => ({
    ...current,
    provider: update(current.provider),
  }));

export const updateParticipant = (
  setForm: SetInvoiceForm,
  update: (participant: InvoiceParticipantForm) => InvoiceParticipantForm,
): void =>
  setForm((current) => ({
    ...current,
    participant: update(current.participant),
  }));

export const updateServiceItem = (
  setForm: SetInvoiceForm,
  index: number,
  update: (item: InvoiceServiceItemForm) => InvoiceServiceItemForm,
): void =>
  setForm((current) => ({
    ...current,
    items: current.items.map((item, itemIndex) =>
      itemIndex === index ? update(item) : item,
    ),
  }));

export const addServiceItem = (setForm: SetInvoiceForm): void =>
  setForm((current) => ({
    ...current,
    items: [
      ...current.items,
      {
        date: "",
        description: "",
        hours: 0,
        rate: 0,
      },
    ],
  }));

export const removeServiceItem = (
  setForm: SetInvoiceForm,
  index: number,
): void =>
  setForm((current) => ({
    ...current,
    items: current.items.filter((_, itemIndex) => itemIndex !== index),
  }));
