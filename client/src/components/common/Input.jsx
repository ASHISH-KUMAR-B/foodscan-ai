import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, error, className = "", ...props },
  ref
) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>}
      <input
        ref={ref}
        className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 ${className}`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
});

export default Input;