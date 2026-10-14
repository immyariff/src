import type { ServiceItemField, ServiceItemForm } from "../../types/invoiceForm";
import { formatCurrency } from "../../logic/invoiceForm/currency";
import { calculateServiceItemAmount } from "../../logic/invoiceForm/serviceItems";

type Props = {
  readonly items: ReadonlyArray<ServiceItemForm>;
  readonly onUpdate: (index: number, field: ServiceItemField, value: string) => void;
  readonly onAdd: () => void;
  readonly onRemove: (index: number) => void;
};

const fieldClass = "w-full rounded-lg border border-slate-300 px-3 py-2";

const ServiceItemsSection = ({ items, onUpdate, onAdd, onRemove }: Props) => (
  <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-semibold text-slate-900">Support Services</h2>
      <button type="button" onClick={onAdd} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Add Service</button>
    </div>
    <div className="space-y-5">
      {items.map((item, index) => (
        <div key={index} className="space-y-4 rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-slate-800">Service {index + 1}</h3>
            <button type="button" onClick={() => onRemove(index)} disabled={items.length === 1} className="text-sm font-medium text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-40">Remove</button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Service Date</span>
              <input className={fieldClass} type="date" value={item.date} onChange={(event) => onUpdate(index, "date", event.target.value)} required />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Description</span>
              <input className={fieldClass} value={item.description} placeholder="Support worker assistance" onChange={(event) => onUpdate(index, "description", event.target.value)} required />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Hours</span>
              <input className={fieldClass} type="number" min="0.01" step="0.25" value={item.hours} onChange={(event) => onUpdate(index, "hours", event.target.value)} required />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Rate (AUD per hour)</span>
              <input className={fieldClass} type="number" min="0" step="0.01" value={item.rate} onChange={(event) => onUpdate(index, "rate", event.target.value)} required />
            </label>
          </div>
          <div className="flex justify-end border-t border-slate-100 pt-3">
            <p className="text-sm text-slate-600">Amount: <span className="font-semibold text-slate-900">{formatCurrency(calculateServiceItemAmount(item) || 0)}</span></p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ServiceItemsSection;
