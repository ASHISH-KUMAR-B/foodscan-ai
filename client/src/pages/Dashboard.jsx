import { Link } from "react-router-dom";

import Card from "../components/common/Card.jsx";
import { ROUTES } from "../constants/routes.js";

const stats = [
  { label: "Total scans", value: "0" },
  { label: "Healthy picks", value: "0" },
  { label: "Warnings", value: "0" },
];

const quickWins = [
  "Review your latest scans at a glance.",
  "Spot repeat ingredients and common allergens.",
  "Jump back into the scan flow in one tap.",
];

export default function Dashboard() {
  return (
    <div className="space-y-8 py-8 sm:py-12">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-7 sm:p-8">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">
            Dashboard
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Welcome back to your scan workspace.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Your dashboard will eventually track scans, health trends, and
            ingredient history. For now, this is the place to jump back into a
            fresh scan.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={ROUTES.SCAN}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 px-6 py-3.5 text-base font-medium text-white shadow-[0_18px_40px_-20px_rgba(22,163,74,0.85)] transition hover:-translate-y-0.5"
            >
              Scan new product
            </Link>
            <Link
              to={ROUTES.HISTORY}
              className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white/90 px-6 py-3.5 text-base font-medium text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-white"
            >
              View history
            </Link>
          </div>
        </Card>

        <Card className="p-7 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Scan summary
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-4 text-3xl font-bold text-slate-950">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-emerald-700 p-5 text-white">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-200">
              Quick wins
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
