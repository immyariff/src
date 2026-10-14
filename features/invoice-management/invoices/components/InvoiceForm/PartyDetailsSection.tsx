type Props = {
  readonly title: string;
  readonly fields: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
    readonly type?: "text" | "email";
    readonly field: string;
    readonly disabled?: boolean;
  }>;
  readonly onChange: (field: string, value: string) => void;
};

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 " +
  "focus:outline-none focus:ring-2 focus:ring-slate-400";

const PartyDetailsSection = ({ title, fields, onChange }: Props) => (
  <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
    <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {fields.map((field) => (
        <div className="block" key={field.field}>
          <label
            className="mb-1 block text-sm font-medium text-slate-700"
            htmlFor={field.field}
          >
            {field.label}
          </label>

          {field.disabled ? (
            <p
              id={field.field}
              className="min-h-10 w-full rounded-lg bg-slate-50 px-3 py-2 text-slate-700"
            >
              {field.value || "Not provided"}
            </p>
          ) : (
            <input
              id={field.field}
              className={inputClass}
              type={field.type ?? "text"}
              value={field.value}
              onChange={(event) => onChange(field.field, event.target.value)}
              required
            />
          )}
        </div>
      ))}
    </div>
  </section>
);

export default PartyDetailsSection;
