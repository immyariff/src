import { useState } from "react";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";

import type {
  InvoiceField,
  InvoiceFormState,
  ServiceItemField,
} from "../../types/invoiceForm";

import {
  createInitialInvoiceState,
  updateInvoiceField,
} from "../../logic/invoiceForm/state";

import {
  addServiceItem,
  calculateSubtotal,
  removeServiceItem,
  updateServiceItem,
} from "../../logic/invoiceForm/serviceItems";

import { validateInvoice } from "../../logic/invoiceForm/validation";

import loadBillerDetails from "../../preload/billerDetails";

import InvoiceDetailsSection from "./InvoiceDetailsSection";
import PartyDetailsSection from "./PartyDetailsSection";
import ServiceItemsSection from "./ServiceItemsSection";
import InvoiceTotalsSection from "./InvoiceTotalsSection";

type SetStatus = (message: string) => void;

type HandleInvoiceFieldChange = (field: InvoiceField, value: string) => void;

type HandleServiceItemChange = (
  index: number,
  field: ServiceItemField,
  value: string,
) => void;

type GeneratePdf = () => Promise<void>;

const createPreloadedInvoiceState = (): InvoiceFormState => {
  const initialState = createInitialInvoiceState();
  const biller = loadBillerDetails();

  return {
    ...initialState,
    providerName: biller.name.fullName,
    providerEmail: biller.email.email,
    providerAbn: biller.abn,
  };
};

const InvoiceForm = () => {
  const [form, setForm] = useState<InvoiceFormState>(
    createPreloadedInvoiceState,
  );

  const [status, setStatus] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const subtotal = calculateSubtotal(form.items);
  const superContribution = 0;

  const clearStatus: SetStatus = (message) => setStatus(message);

  const handleInvoiceFieldChange: HandleInvoiceFieldChange = (field, value) => {
    setForm((current) => updateInvoiceField(current, field, value));
    clearStatus("");
  };

  const handleServiceItemChange: HandleServiceItemChange = (
    index,
    field,
    value,
  ) => {
    setForm((current) => ({
      ...current,
      items: updateServiceItem(current.items, index, field, value),
    }));

    clearStatus("");
  };

  const handleAddItem = (): void => {
    setForm((current) => ({
      ...current,
      items: addServiceItem(current.items),
    }));

    clearStatus("");
  };

  const handleRemoveItem = (index: number): void => {
    setForm((current) => ({
      ...current,
      items: removeServiceItem(current.items, index),
    }));

    clearStatus("");
  };

  const generatePdf: GeneratePdf = async () => {
    setStatus("");

    const validation = validateInvoice(form);

    if (E.isLeft(validation)) {
      setStatus(validation.left.message);
      return;
    }

    setIsGenerating(true);

    try {
      const response = await window.invoiceApi.generateInvoicePdf(
        validation.right,
      );

      if (response.canceled === true) {
        setStatus("PDF generation was canceled.");
      } else if (response.success === true && response.filePath) {
        setStatus(`PDF saved successfully: ${response.filePath}`);
      } else {
        setStatus(response.error ?? "The PDF could not be generated.");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while generating the PDF.";

      console.error("Generate PDF failed:", error);
      setStatus(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const providerFields = [
    {
      field: "providerName",
      label: "Provider Name",
      value: form.providerName,
      disabled: true,
    },
    {
      field: "providerEmail",
      label: "Provider Email",
      value: form.providerEmail,
      type: "email" as const,
      disabled: true,
    },
    {
      field: "providerAbn",
      label: "ABN",
      value: form.providerAbn,
      disabled: true,
    },
  ];

  const participantFields = [
    {
      field: "participantName",
      label: "Participant Name",
      value: form.participantName,
    },
    {
      field: "participantEmail",
      label: "Participant Email",
      value: form.participantEmail,
      type: "email" as const,
    },
    {
      field: "participantNumber",
      label: "NDIS Participant Number",
      value: form.participantNumber,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 p-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Create Invoice</h1>

        <p className="mt-2 text-sm text-slate-600">
          Enter the invoice details, participant information, and support
          services. Provider information is preloaded.
        </p>
      </header>

      <InvoiceDetailsSection
        values={{
          invoiceNumber: form.invoiceNumber,
          issueDate: form.issueDate,
          dueDate: form.dueDate,
        }}
        onChange={(field, value) => handleInvoiceFieldChange(field, value)}
      />

      <PartyDetailsSection
        title="Service Provider"
        fields={providerFields}
        onChange={(field, value) =>
          handleInvoiceFieldChange(field as InvoiceField, value)
        }
      />

      <PartyDetailsSection
        title="Participant Details"
        fields={participantFields}
        onChange={(field, value) =>
          handleInvoiceFieldChange(field as InvoiceField, value)
        }
      />

      <ServiceItemsSection
        items={form.items}
        onUpdate={handleServiceItemChange}
        onAdd={handleAddItem}
        onRemove={handleRemoveItem}
      />

      <InvoiceTotalsSection
        subtotal={subtotal}
        superContribution={superContribution}
      />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => void generatePdf()}
          disabled={isGenerating}
          className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60"
        >
          {isGenerating ? "Generating PDF..." : "Generate PDF"}
        </button>

        {pipe(
          O.fromNullable(status),
          O.filter((message) => message.length > 0),
          O.fold(
            () => null,
            (message) => (
              <p
                role="status"
                aria-live="polite"
                className="wrap-break-word text-sm text-slate-700"
              >
                {message}
              </p>
            ),
          ),
        )}
      </div>
    </main>
  );
};

export default InvoiceForm;
