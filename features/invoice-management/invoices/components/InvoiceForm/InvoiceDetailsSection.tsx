import type { InvoiceFormState } from "../../types/invoiceForm";

type Props = {
  readonly values: Pick<InvoiceFormState, "invoiceNumber" | "issueDate" | "dueDate">;
  readonly onChange: (field: "invoiceNumber" | "issueDate" | "dueDate", value: string) => void;
};

const fieldClass = "w-full rounded-lg border border-slate-300 px-3 py-2";

const InvoiceDetailsSection = ({ values, onChange }: Props) => (
  <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
    <h2 className="text-xl font-semibold text-slate-900">Invoice Details</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">Invoice Number</span>
        <input className={fieldClass} value={values.invoiceNumber} onChange={(event) => onChange("invoiceNumber", event.target.value)} required />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">Issue Date</span>
        <input className={fieldClass} type="date" value={values.issueDate} onChange={(event) => onChange("issueDate", event.target.value)} required />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">Due Date</span>
        <input className={fieldClass} type="date" value={values.dueDate} onChange={(event) => onChange("dueDate", event.target.value)} required />
      </label>
    </div>
  </section>
);

export default InvoiceDetailsSection;
