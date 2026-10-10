import * as O from "fp-ts/Option";
import * as TO from "fp-ts/TaskOption";
import { pipe } from "fp-ts/function";

import type { InvoiceFormData } from "../types/invoiceFormTypes";

const generateInvoicePdf = async (
  form: InvoiceFormData,
  setStatus: (status: string) => void,
): Promise<void> => {
  const payload: InvoiceFormData = {
    invoiceNumber: form.invoiceNumber,
    invoiceDate: form.invoiceDate,
    dueDate: form.dueDate,
    provider: {
      fullName: form.provider.fullName,
      email: form.provider.email,
      abn: form.provider.abn,
    },
    participant: {
      fullName: form.participant.fullName,
      email: form.participant.email,
      number: form.participant.number,
    },
    items: form.items.map((item) => ({
      date: item.date,
      description: item.description,
      hours: item.hours,
      rate: item.rate,
    })),
  };

  const result = await TO.tryCatch(async () => {
    try {
      return await window.invoiceApi.generateInvoicePdf(payload);
    } catch (error: unknown) {
      console.error("Generate PDF IPC error:", error);
      throw error;
    }
  })();

  const message = pipe(
    result,
    O.fold(
      () =>
        "Unable to communicate with the PDF generator. Check the developer console for details.",
      (response) =>
        response.success === true && Boolean(response.filePath)
          ? `Invoice saved to: ${response.filePath}`
          : response.canceled === true
            ? "PDF saving was canceled."
            : (response.error ?? "The invoice PDF could not be saved."),
    ),
  );

  setStatus(message);
};

export default generateInvoicePdf;
