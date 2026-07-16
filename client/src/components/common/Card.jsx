import { useTheme } from "../../context/ThemeContext.jsx";

export default function Card({ children, className = "" }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-[28px] border shadow-[0_24px_80px_-36px_rgba(15,23,42,0.4)] backdrop-blur ${
        isDark
          ? "border-white/10 bg-slate-900/80 text-slate-100"
          : "border-white/70 bg-white/85 text-slate-900"
      } ${className}`}
    >
      {children}
    </div>
  );
}
