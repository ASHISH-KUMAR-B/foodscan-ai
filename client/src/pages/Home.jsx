import { Link } from "react-router-dom";

import Card from "../components/common/Card.jsx";
import { ROUTES } from "../constants/routes.js";

const highlights = [
  {
    title: "OCR that reads labels",
    description:
      "Capture the ingredient panel or nutrition table and let the backend clean the text for analysis.",
  },
  {
    title: "Health-first insights",
    description:
      "See allergens, restricted ingredients, nutrition values, and a single health score in one view.",
  },
  {
    title: "Fast mobile workflow",
    description:
      "The scan flow is built for camera use first, so it feels natural on a phone and still works on desktop.",
  },
];

export default function Home() {
  return (
    <div className="space-y-10 py-8 sm:py-12">
      <section className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-900">
            FoodScan AI
          </span>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Turn a food label into clear health insights in seconds.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Scan packaged food labels, extract ingredients and nutrition
              details, detect allergens, and get a cleaner view of what is
              actually inside the product.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={ROUTES.SCAN}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 px-6 py-3.5 text-base font-medium text-white shadow-[0_18px_40px_-20px_rgba(22,163,74,0.85)] transition hover:-translate-y-0.5"
            >
              Start scanning
            </Link>

            <Link
              to={ROUTES.DASHBOARD}
              className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white/90 px-6 py-3.5 text-base font-medium text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-white"
            >
              View dashboard
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["OCR", "Read labels from camera images"],
              ["Score", "Quick health summary"],
              ["Alerts", "Allergens and restricted ingredients"],
            ].map(([title, text]) => (
              <Card key={title} className="p-4">
                <p className="text-sm font-semibold text-emerald-800">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="overflow-hidden p-4">
          <div className="rounded-[24px] bg-gradient-to-br from-slate-950 via-emerald-950 to-emerald-700 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-emerald-200">
                  Scan preview
                </p>
                <h2 className="mt-2 text-2xl font-bold">A better label workflow</h2>
              </div>
              <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                AI powered
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {[
                "Upload or capture an image",
                "Run OCR and ingredient parsing",
                "Review nutrition, allergens, and tips",
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-sm text-white/90">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.title} className="p-6">
            <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
