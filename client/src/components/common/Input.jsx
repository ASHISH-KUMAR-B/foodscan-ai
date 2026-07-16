import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, error, className = "", ...props },
  ref
) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </span>
      )}
      <input
        ref={ref}
        className={`w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${className}`}
        {...props}
      />
      {error && <span className="mt-2 block text-xs text-rose-600">{error}</span>}
    </label>
  );
});

export default Input;
