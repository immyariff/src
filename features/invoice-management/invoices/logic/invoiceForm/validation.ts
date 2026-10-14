import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

import type {
  InvoiceFormState,
  InvoicePdfPayload,
  ValidateInvoice,
  ValidationError,
} from "../../types/invoiceForm";

type ValidateState = (
  state: InvoiceFormState,
) => E.Either<ValidationError, InvoicePdfPayload>;

type IsDateString = (value: string) => boolean;
type IsEmail = (value: string) => boolean;
type IsNonEmpty = (value: string) => boolean;
type Invalid = (message: string) => E.Either<ValidationError, never>;

const invalid: Invalid = (message) => E.left({ message });

export const isDateString: IsDateString = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const timestamp = Date.parse(`${value}T00:00:00`);

  if (Number.isNaN(timestamp)) {
    return false;
  }

  const parsed = new Date(timestamp);
  const [year, month, day] = value.split("-").map(Number);

  return (
    parsed.getFullYear() === year &&
    parsed.getMonth() + 1 === month &&
    parsed.getDate() === day
  );
};

export const isEmail: IsEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isNonEmpty: IsNonEmpty = (value) => value.trim().length > 0;

const validateRequiredFields: ValidateState = (state) => {
  const requiredFields: ReadonlyArray<string> = [
    state.invoiceNumber,
    state.issueDate,
    state.dueDate,
    state.providerName,
    state.providerEmail,
    state.providerAbn,
    state.participantName,
    state.participantEmail,
    state.participantNumber,
  ];

  if (!requiredFields.every(isNonEmpty)) {
    return invalid(
      "Please complete all invoice, provider, and participant details.",
    );
  }

  const payload: InvoicePdfPayload = {
    invoiceNumber: state.invoiceNumber.trim(),
    invoiceDate: state.issueDate,
    dueDate: state.dueDate,
    provider: {
      fullName: state.providerName.trim(),
      email: state.providerEmail.trim(),
      abn: state.providerAbn.trim(),
    },
    participant: {
      fullName: state.participantName.trim(),
      email: state.participantEmail.trim(),
      number: state.participantNumber.trim(),
    },
    items: state.items.map((item) => ({
      date: item.date,
      description: item.description.trim(),
      hours: Number(item.hours),
      rate: Number(item.rate),
    })),
  };

  return E.right(payload);
};

export const validateInvoice: ValidateInvoice = (state) =>
  pipe(
    validateRequiredFields(state),
    E.chain((payload) =>
      isDateString(state.issueDate) && isDateString(state.dueDate)
        ? E.right(payload)
        : invalid("Please enter valid invoice and due dates."),
    ),
    E.chain((payload) =>
      isEmail(state.providerEmail) && isEmail(state.participantEmail)
        ? E.right(payload)
        : invalid(
            "Please enter valid provider and participant email addresses.",
          ),
    ),
    E.chain((payload) =>
      state.items.every((item) => isNonEmpty(item.description))
        ? E.right(payload)
        : invalid("Please enter a description for every service item."),
    ),
    E.chain((payload) =>
      state.items.every(
        (item) =>
          isDateString(item.date) &&
          isNonEmpty(item.hours) &&
          isNonEmpty(item.rate) &&
          Number.isFinite(Number(item.hours)) &&
          Number.isFinite(Number(item.rate)) &&
          Number(item.hours) > 0 &&
          Number(item.rate) >= 0,
      )
        ? E.right(payload)
        : invalid(
            "Please enter a valid service date, positive hours, and a non-negative rate for every service item.",
          ),
    ),
    E.chain((payload) => {
      const issueTimestamp = Date.parse(`${state.issueDate}T00:00:00`);
      const dueTimestamp = Date.parse(`${state.dueDate}T00:00:00`);

      return dueTimestamp >= issueTimestamp
        ? E.right(payload)
        : invalid(
            "Please check the invoice dates. The due date cannot be earlier than the issue date.",
          );
    }),
  );
