export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
    </div>
  );
}