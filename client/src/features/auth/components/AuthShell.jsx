import { Link } from "react-router-dom";

import Card from "../../../components/common/Card.jsx";
import { ROUTES } from "../../../constants/routes.js";
import { useTheme } from "../../../context/ThemeContext.jsx";

const featureCards = [
  {
    title: "OCR cleanup",
    description:
      "Turn a package photo into readable text that your app can analyze.",
  },
  {
    title: "Ingredient parser",
    description:
      "Detect ingredients, allergens, and restricted items in plain language.",
  },
  {
    title: "Health score",
    description:
      "See a simple score that helps you understand the product at a glance.",
  },
];

const steps = [
  "Capture the label or nutrition panel.",
  "Run OCR and text cleanup in the backend.",
  "Review ingredients, warnings, and nutrition together.",
];

const trustPills = [
  "Mobile-friendly scanning",
  "Fast analysis flow",
  "Built for packaged foods",
];

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#security", label: "Security" },
];

const linkButton =
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition";

export default function AuthShell({
  formEyebrow,
  formTitle,
  formDescription,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}) {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative overflow-hidden rounded-[36px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 ${
        isDark
          ? "bg-slate-950 text-white"
          : "bg-[linear-gradient(180deg,#fcfcfa_0%,#f3efe6_100%)] text-slate-900"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {isDark ? (
          <>
            <div className="absolute left-[-8rem] top-[-4rem] h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="absolute right-[-6rem] top-16 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />
            <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-emerald-700/15 blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute left-[-8rem] top-[-4rem] h-80 w-80 rounded-full bg-emerald-300/35 blur-3xl" />
            <div className="absolute right-[-6rem] top-16 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
            <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-lime-200/30 blur-3xl" />
          </>
        )}
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 pb-6">
        <Link to={ROUTES.HOME} className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-500 text-sm font-bold text-white shadow-[0_18px_40px_-18px_rgba(22,163,74,0.9)]">
            FS
          </span>
          <span className="flex flex-col leading-tight">
            <span className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              FoodScan AI
            </span>
            <span className={`text-xs ${isDark ? "text-emerald-100/70" : "text-slate-500"}`}>
              OCR for packaged food labels
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                isDark
                  ? "text-emerald-100/75 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to={ROUTES.LOGIN}
            className={`${linkButton} ${
              isDark
                ? "border border-white/10 bg-white/5 text-white/90 hover:bg-white/10"
                : "border border-slate-200/80 bg-white/90 text-slate-800 shadow-sm hover:border-slate-300 hover:bg-white"
            }`}
          >
            Sign in
          </Link>
          <Link
            to={ROUTES.REGISTER}
            className={`${linkButton} bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 text-white shadow-[0_18px_40px_-20px_rgba(22,163,74,0.95)] hover:-translate-y-0.5`}
          >
            Start free
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:pt-4">
        <section className="space-y-6 py-4 lg:py-10">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] ${
              isDark
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                : "border-emerald-200 bg-emerald-100 text-emerald-900"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-lime-500" />
            New product scanner
          </span>

          <div className="space-y-4">
            <h1
              className={`max-w-3xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Know what is inside every packaged food before you trust it.
            </h1>
            <p
              className={`max-w-2xl text-lg leading-8 ${
                isDark ? "text-emerald-50/80" : "text-slate-600"
              }`}
            >
              FoodScan AI turns a label photo into cleaned OCR text, ingredient
              parsing, allergen detection, and a simple health score in one
              workflow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={ROUTES.REGISTER}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-base font-semibold text-emerald-950 transition hover:-translate-y-0.5"
            >
              Start free
            </Link>
            <a
              href="#how-it-works"
              className={`inline-flex items-center justify-center rounded-full border px-6 py-3.5 text-base font-semibold transition ${
                isDark
                  ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  : "border-emerald-200 bg-white/80 text-emerald-900 hover:bg-white"
              }`}
            >
              How it works
            </a>
          </div>

          <div id="features" className="grid gap-3 sm:grid-cols-3">
            {featureCards.map((item) => (
              <div
                key={item.title}
                className={`rounded-[28px] border p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.65)] backdrop-blur ${
                  isDark
                    ? "border-white/10 bg-white/6"
                    : "border-white/70 bg-white/85"
                }`}
              >
                <h2 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                  {item.title}
                </h2>
                <p className={`mt-2 text-sm leading-6 ${isDark ? "text-emerald-50/70" : "text-slate-600"}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div
            id="how-it-works"
            className={`rounded-[32px] border p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.7)] backdrop-blur ${
              isDark ? "border-white/10 bg-white/5" : "border-white/70 bg-white/85"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.26em] ${
                    isDark ? "text-emerald-200" : "text-emerald-700"
                  }`}
                >
                  How it works
                </p>
                <h2 className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                  A simple flow that turns labels into insights.
                </h2>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
                  isDark ? "bg-white/10 text-emerald-100" : "bg-emerald-100 text-emerald-900"
                }`}
              >
                In seconds
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`rounded-3xl border p-4 ${
                    isDark ? "border-white/10 bg-[#0a1b12]" : "border-slate-200/80 bg-slate-50"
                  }`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-200">
                    0{index + 1}
                  </span>
                  <p className={`mt-4 text-sm leading-6 ${isDark ? "text-emerald-50/80" : "text-slate-600"}`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            id="security"
            className={`rounded-[32px] border p-6 ${
              isDark ? "border-emerald-400/15 bg-emerald-400/10" : "border-emerald-200 bg-emerald-50"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.26em] ${
                isDark ? "text-emerald-200" : "text-emerald-800"
              }`}
            >
              Trust and security
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {trustPills.map((item) => (
                <span
                  key={item}
                  className={`rounded-full border px-4 py-2 text-sm ${
                    isDark
                      ? "border-white/10 bg-white/10 text-emerald-50/85"
                      : "border-emerald-200 bg-white text-slate-700"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <aside className="lg:sticky lg:top-6">
          <Card className="border-white/10 p-7 shadow-[0_40px_120px_-56px_rgba(0,0,0,0.8)] sm:p-10">
            <p className={`text-xs font-semibold uppercase tracking-[0.26em] ${isDark ? "text-emerald-200" : "text-emerald-700"}`}>
              {formEyebrow}
            </p>

            <h2 className={`mt-3 text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              {formTitle}
            </h2>
            <p className={`mt-2 text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {formDescription}
            </p>

            <div className="mt-8">{children}</div>

            <p className={`mt-6 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {footerText}{" "}
              <Link to={footerLinkTo} className="font-medium text-emerald-700 hover:underline">
                {footerLinkLabel}
              </Link>
            </p>
          </Card>
        </aside>
      </main>
    </div>
  );
}
