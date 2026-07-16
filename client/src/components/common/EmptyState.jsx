import { useTheme } from "../../context/ThemeContext.jsx";

export default function EmptyState({ title, description }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-xl border border-dashed p-6 text-center ${
        isDark ? "border-white/10 bg-white/5" : "border-slate-300 bg-white"
      }`}
    >
      <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h3>
      {description && (
        <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
