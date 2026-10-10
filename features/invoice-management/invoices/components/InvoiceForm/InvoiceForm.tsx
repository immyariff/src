import { useState } from "react";
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";

type ServiceItemForm = {
  readonly date: string;
  readonly description: string;
  readonly hours: string;
  readonly rate: string;
};

type PdfResponse = {
  readonly success?: boolean;
  readonly canceled?: boolean;
  readonly filePath?: string;
  readonly error?: string;
};

type InvoicePdfPayload = {
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

declare global {
  interface Window {
    invoiceApi: {
      generateInvoicePdf: (invoice: InvoicePdfPayload) => Promise<PdfResponse>;
    };
  }
}

const today = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(value);

const toNumber = (value: string): number => {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
};

const createEmptyItem = (): ServiceItemForm => ({
  date: today(),
  description: "",
  hours: "",
  rate: "",
});

const InvoiceForm = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("INV-0001");
  const [issueDate, setIssueDate] = useState(today());
  const [dueDate, setDueDate] = useState(today());

  const [providerName, setProviderName] = useState("");
  const [providerEmail, setProviderEmail] = useState("");
  const [providerAbn, setProviderAbn] = useState("");

  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participantNumber, setParticipantNumber] = useState("");

  const [items, setItems] = useState<ReadonlyArray<ServiceItemForm>>([
    createEmptyItem(),
  ]);

  const [status, setStatus] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + toNumber(item.hours) * toNumber(item.rate),
    0,
  );

  const superContribution = 0;
  const total = subtotal + superContribution;

  const updateItem = (
    index: number,
    field: keyof ServiceItemForm,
    value: string,
  ): void => {
    setItems((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );

    setStatus("");
  };

  const addItem = (): void => {
    setItems((currentItems) => [...currentItems, createEmptyItem()]);
    setStatus("");
  };

  const removeItem = (index: number): void => {
    setItems((currentItems) => {
      if (currentItems.length <= 1) {
        return currentItems;
      }

      return currentItems.filter((_item, itemIndex) => itemIndex !== index);
    });

    setStatus("");
  };

  const generatePdf = async (): Promise<void> => {
    setStatus("");

    if (
      invoiceNumber.trim().length === 0 ||
      issueDate.length === 0 ||
      dueDate.length === 0 ||
      providerName.trim().length === 0 ||
      providerEmail.trim().length === 0 ||
      providerAbn.trim().length === 0 ||
      participantName.trim().length === 0 ||
      participantEmail.trim().length === 0 ||
      participantNumber.trim().length === 0
    ) {
      setStatus(
        "Please complete all invoice, provider, and participant details.",
      );
      return;
    }

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(issueDate) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)
    ) {
      setStatus("Please enter valid invoice and due dates.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(providerEmail.trim()) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participantEmail.trim())
    ) {
      setStatus("Please enter valid provider and participant email addresses.");
      return;
    }

    if (items.some((item) => item.description.trim().length === 0)) {
      setStatus("Please enter a description for every service item.");
      return;
    }

    if (
      items.some(
        (item) =>
          !/^\d{4}-\d{2}-\d{2}$/.test(item.date) ||
          item.hours.trim().length === 0 ||
          item.rate.trim().length === 0 ||
          !Number.isFinite(Number(item.hours)) ||
          !Number.isFinite(Number(item.rate)) ||
          Number(item.hours) <= 0 ||
          Number(item.rate) < 0,
      )
    ) {
      setStatus(
        "Please enter a valid service date, positive hours, and a non-negative rate for every service item.",
      );
      return;
    }

    const issueTimestamp = Date.parse(`${issueDate}T00:00:00`);
    const dueTimestamp = Date.parse(`${dueDate}T00:00:00`);

    if (
      Number.isNaN(issueTimestamp) ||
      Number.isNaN(dueTimestamp) ||
      dueTimestamp < issueTimestamp
    ) {
      setStatus(
        "Please check the invoice dates. The due date cannot be earlier than the issue date.",
      );
      return;
    }

    const payload: InvoicePdfPayload = {
      invoiceNumber: invoiceNumber.trim(),
      invoiceDate: issueDate,
      dueDate,
      provider: {
        fullName: providerName.trim(),
        email: providerEmail.trim(),
        abn: providerAbn.trim(),
      },
      participant: {
        fullName: participantName.trim(),
        email: participantEmail.trim(),
        number: participantNumber.trim(),
      },
      items: items.map((item) => ({
        date: item.date,
        description: item.description.trim(),
        hours: Number(item.hours),
        rate: Number(item.rate),
      })),
    };

    setIsGenerating(true);

    try {
      const response = await window.invoiceApi.generateInvoicePdf(payload);

      if (response.canceled === true) {
        setStatus("PDF generation was canceled.");
        return;
      }

      if (response.success === true && response.filePath) {
        setStatus(`PDF saved successfully: ${response.filePath}`);
        return;
      }

      setStatus(response.error ?? "The PDF could not be generated.");
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

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 p-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Create Invoice</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter the invoice details, provider information, participant details,
          and support services.
        </p>
      </header>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Invoice Details
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Invoice Number
            </span>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Issue Date
            </span>
            <input
              type="date"
              value={issueDate}
              onChange={(event) => setIssueDate(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Due Date
            </span>
            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Service Provider
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Provider Name
            </span>
            <input
              type="text"
              value={providerName}
              onChange={(event) => setProviderName(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Provider Email
            </span>
            <input
              type="email"
              value={providerEmail}
              onChange={(event) => setProviderEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              ABN
            </span>
            <input
              type="text"
              value={providerAbn}
              onChange={(event) => setProviderAbn(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Participant Details
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Participant Name
            </span>
            <input
              type="text"
              value={participantName}
              onChange={(event) => setParticipantName(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Participant Email
            </span>
            <input
              type="email"
              value={participantEmail}
              onChange={(event) => setParticipantEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              NDIS Participant Number
            </span>
            <input
              type="text"
              value={participantNumber}
              onChange={(event) => setParticipantNumber(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Support Services
          </h2>

          <button
            type="button"
            onClick={addItem}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Add Service
          </button>
        </div>

        <div className="space-y-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg border border-slate-200 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-slate-800">
                  Service {index + 1}
                </h3>

                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                  className="text-sm font-medium text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">
                    Service Date
                  </span>
                  <input
                    type="date"
                    value={item.date}
                    onChange={(event) =>
                      updateItem(index, "date", event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">
                    Description
                  </span>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(event) =>
                      updateItem(index, "description", event.target.value)
                    }
                    placeholder="Support worker assistance"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">
                    Hours
                  </span>
                  <input
                    type="number"
                    min="0.01"
                    step="0.25"
                    value={item.hours}
                    onChange={(event) =>
                      updateItem(index, "hours", event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">
                    Rate (AUD per hour)
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onChange={(event) =>
                      updateItem(index, "rate", event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    required
                  />
                </label>
              </div>

              <div className="flex justify-end border-t border-slate-100 pt-3">
                <p className="text-sm text-slate-600">
                  Amount:{" "}
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(toNumber(item.hours) * toNumber(item.rate))}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Invoice Totals</h2>

        <div className="space-y-2">
          <div className="flex justify-between gap-4 text-slate-700">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between gap-4 text-slate-700">
            <span>Superannuation Contribution</span>
            <span>{formatCurrency(superContribution)}</span>
          </div>

          <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 text-lg font-bold text-slate-900">
            <span>Total Due</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </section>

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
                className="break-words text-sm text-slate-700"
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
