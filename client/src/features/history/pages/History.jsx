import { Link } from "react-router-dom";

import Button from "../../../components/common/Button.jsx";
import Card from "../../../components/common/Card.jsx";
import EmptyState from "../../../components/common/EmptyState.jsx";
import { ROUTES } from "../../../constants/routes.js";
import { useTheme } from "../../../context/ThemeContext.jsx";

const historyTips = [
  "Scanned products will appear here in chronological order.",
  "You will be able to compare repeated products over time.",
  "The history page is ready for API-backed scan records later.",
];

export default function History() {
  const { isDark } = useTheme();

  return (
    <div className="space-y-8 py-8 sm:py-12">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="p-7 sm:p-8">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">
            History
          </span>

          <h1
            className={`mt-4 text-4xl font-bold tracking-tight sm:text-5xl ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Keep track of every food scan.
          </h1>

          <p
            className={`mt-4 max-w-2xl text-base leading-7 ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            This screen will become your scan archive. For now, it shows a
            clean empty state and a few quick pointers so the page still feels
            useful.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={ROUTES.SCAN}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 px-6 py-3.5 text-base font-medium text-white shadow-[0_18px_40px_-20px_rgba(22,163,74,0.85)] transition hover:-translate-y-0.5"
            >
              Scan new product
            </Link>
            <Button variant="secondary" size="lg" disabled>
              Export history soon
            </Button>
          </div>
        </Card>

        <Card className="p-7 sm:p-8">
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
            What history will show
          </h2>
          <ul className={`mt-5 space-y-3 text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {historyTips.map((tip) => (
              <li
                key={tip}
                className={`flex gap-3 rounded-2xl px-4 py-3 ${
                  isDark ? "bg-white/5" : "bg-slate-50"
                }`}
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Card className="p-6 sm:p-8">
        <EmptyState
          title="No scans yet"
          description="Once you start scanning products, your results will appear here with the product name, health score, and quick access to the full analysis."
        />
      </Card>
    </div>
  );
}
