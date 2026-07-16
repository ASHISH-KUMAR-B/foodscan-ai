import { forwardRef } from "react";

import { useTheme } from "../../context/ThemeContext.jsx";

const Input = forwardRef(function Input(
  { label, error, className = "", ...props },
  ref
) {
  const { isDark } = useTheme();

  return (
    <label className="block">
      {label && (
        <span className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
          {label}
        </span>
      )}
      <input
        ref={ref}
        className={`w-full rounded-2xl border px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
          isDark
            ? "border-white/10 bg-white/5 text-white placeholder:text-slate-500"
            : "border-slate-200 bg-white/90 text-slate-900"
        } ${className}`}
        {...props}
      />
      {error && <span className="mt-2 block text-xs text-rose-500">{error}</span>}
    </label>
  );
});

export default Input;
