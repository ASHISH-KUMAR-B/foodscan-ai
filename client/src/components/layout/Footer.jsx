import { useTheme } from "../../context/ThemeContext.jsx";

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`border-t py-4 text-center text-sm backdrop-blur ${
        isDark
          ? "border-white/10 bg-slate-950/75 text-slate-300"
          : "border-white/70 bg-white/70 text-slate-500"
      }`}
    >
      FoodScan AI • Scan smarter, eat better
    </footer>
  );
}
