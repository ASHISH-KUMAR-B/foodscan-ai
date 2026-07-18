import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Card from "../components/common/Card.jsx";
import { ROUTES } from "../constants/routes.js";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Dashboard() {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const stats = [
    { label: t("dashboard.stats.totalScans"), value: "0" },
    { label: t("dashboard.stats.healthyPicks"), value: "0" },
    { label: t("dashboard.stats.warnings"), value: "0" },
  ];

  const quickWins = t("dashboard.quickWins.items", { returnObjects: true });

  return (
    <div className="space-y-8 py-8 sm:py-12">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-7 sm:p-8">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">
            {t("dashboard.eyebrow")}
          </span>

          <h1
            className={`mt-4 text-4xl font-bold tracking-tight sm:text-5xl ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            {t("dashboard.title")}
          </h1>

          <p
            className={`mt-4 max-w-2xl text-base leading-7 ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {t("dashboard.description")}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={ROUTES.SCAN}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 px-6 py-3.5 text-base font-medium text-white shadow-[0_18px_40px_-20px_rgba(22,163,74,0.85)] transition hover:-translate-y-0.5"
            >
              {t("dashboard.scanNewProduct")}
            </Link>
            <Link
              to={ROUTES.HISTORY}
              className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white/90 px-6 py-3.5 text-base font-medium text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-white"
            >
              {t("dashboard.viewHistory")}
            </Link>
          </div>
        </Card>

        <Card className="p-7 sm:p-8">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.24em] ${
              isDark ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {t("dashboard.scanSummary")}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className={`rounded-3xl border p-4 ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200/80 bg-slate-50"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                    isDark ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {item.label}
                </p>
                <p
                  className={`mt-4 text-3xl font-bold ${
                    isDark ? "text-white" : "text-slate-950"
                  }`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-emerald-700 p-5 text-white">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-200">
              {t("dashboard.quickWins.label")}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/90">
              {quickWins.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </div>
  );
}
