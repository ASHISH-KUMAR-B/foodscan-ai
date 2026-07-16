const variantStyles = {
  primary:
    "bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 text-white shadow-[0_18px_40px_-20px_rgba(22,163,74,0.85)] hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-20px_rgba(22,163,74,0.95)]",
  secondary:
    "border border-slate-200/80 bg-white/90 text-slate-800 shadow-sm hover:border-slate-300 hover:bg-white",
  ghost:
    "text-slate-700 hover:bg-slate-100/80",
  danger:
    "bg-rose-600 text-white shadow-[0_18px_40px_-20px_rgba(225,29,72,0.7)] hover:bg-rose-500",
};

const sizeStyles = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none ${variantStyles[variant] ?? variantStyles.primary} ${sizeStyles[size] ?? sizeStyles.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
