import { formatCurrency } from "../../logic/invoiceForm/currency";

type Props = {
  readonly subtotal: number;
  readonly superContribution: number;
};

const InvoiceTotalsSection = ({ subtotal, superContribution }: Props) => (
  <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-6">
    <h2 className="text-xl font-semibold text-slate-900">Invoice Totals</h2>
    <div className="space-y-2">
      <div className="flex justify-between gap-4 text-slate-700"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
      <div className="flex justify-between gap-4 text-slate-700"><span>Superannuation Contribution</span><span>{formatCurrency(superContribution)}</span></div>
      <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 text-lg font-bold text-slate-900"><span>Total Due</span><span>{formatCurrency(subtotal + superContribution)}</span></div>
    </div>
  </section>
);

export default InvoiceTotalsSection;
