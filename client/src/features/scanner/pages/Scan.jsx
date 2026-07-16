import { useEffect, useState } from "react";

import EmptyState from "../../../components/common/EmptyState.jsx";
import Card from "../../../components/common/Card.jsx";
import ImageUploader from "../../../components/ImageUploader.jsx";
import { useTheme } from "../../../context/ThemeContext.jsx";

import ScanPreview from "../components/ScanPreview.jsx";
import { useScanMutation } from "../hooks/useScanMutation.js";

const nutritionFields = [
  { key: "calories", label: "Calories" },
  { key: "protein", label: "Protein" },
  { key: "fat", label: "Fat" },
  { key: "carbohydrates", label: "Carbs" },
  { key: "sugar", label: "Sugar" },
  { key: "fiber", label: "Fiber" },
  { key: "sodium", label: "Sodium" },
];

function formatValue(value) {
  if (value === 0) {
    return "0";
  }

  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  return value;
}

function scoreTone(score) {
  if (score >= 80) {
    return "emerald";
  }

  if (score >= 60) {
    return "amber";
  }

  return "rose";
}

function SectionCard({ title, children, darkSurface = false }) {
  const { isDark } = useTheme();
  const useDarkSurface = darkSurface || isDark;

  return (
    <Card
      className={`p-6 sm:p-7 ${
        useDarkSurface
          ? "border-white/10 bg-slate-950/90 text-white"
          : "border-slate-200/80 bg-white/85 text-slate-900"
      }`}
    >
      <h3 className={`text-lg font-bold ${useDarkSurface ? "text-white" : "text-slate-950"}`}>
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </Card>
  );
}

function InfoPill({ label, value, tone = "neutral" }) {
  const { isDark } = useTheme();
  const toneClass = isDark
    ? {
        neutral: "border border-white/10 bg-white/5 text-slate-100",
        emerald: "border border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
        amber: "border border-amber-400/20 bg-amber-500/10 text-amber-100",
        rose: "border border-rose-400/20 bg-rose-500/10 text-rose-100",
      }[tone]
    : {
        neutral: "bg-slate-100 text-slate-700",
        emerald: "bg-emerald-100 text-emerald-900",
        amber: "bg-amber-100 text-amber-900",
        rose: "bg-rose-100 text-rose-900",
      }[tone];

  return (
    <div className={`rounded-2xl px-4 py-3 text-sm font-medium ${toneClass}`}>
      <span className="block text-[11px] uppercase tracking-[0.22em] opacity-70">
        {label}
      </span>
      <span className="mt-1 block text-base font-semibold">{value}</span>
    </div>
  );
}

function Badge({ children, tone = "neutral" }) {
  const { isDark } = useTheme();
  const toneClass = isDark
    ? {
        neutral: "border border-white/10 bg-white/5 text-slate-100",
        emerald: "border border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
        amber: "border border-amber-400/20 bg-amber-500/10 text-amber-100",
        rose: "border border-rose-400/20 bg-rose-500/10 text-rose-100",
      }[tone]
    : {
        neutral: "bg-slate-100 text-slate-700",
        emerald: "bg-emerald-100 text-emerald-900",
        amber: "bg-amber-100 text-amber-900",
        rose: "bg-rose-100 text-rose-900",
      }[tone];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneClass}`}
    >
      {children}
    </span>
  );
}

export default function Scan() {
  const { isDark } = useTheme();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);

  const { mutate, isPending } = useScanMutation();

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageSelect = (file) => {
    if (!file) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleAnalyze = () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    mutate(formData, {
      onSuccess: (response) => {
        setResult(response?.data?.data || null);
      },
    });
  };

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview("");
    setResult(null);
  };

  const score = result?.healthScore ?? 0;
  const ingredients = result?.ingredients ?? [];
  const allergens = result?.allergens ?? [];
  const restrictedIngredients = result?.restrictedIngredients ?? [];
  const tips = result?.tips ?? [];

  return (
    <div className="space-y-8 py-8 sm:py-12">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-7 sm:p-8">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">
            Scan workspace
          </span>

          <h1
            className={`mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Camera-first OCR for packaged food labels.
          </h1>

          <p
            className={`mt-4 max-w-2xl text-base leading-7 ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Upload a package photo, let the backend clean the OCR text, and
            review ingredients, allergens, and nutrition in one structured view.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="emerald">OCR extraction</Badge>
            <Badge tone="amber">Health score</Badge>
            <Badge tone="neutral">Nutrition facts</Badge>
            <Badge tone="rose">Allergen checks</Badge>
          </div>
        </Card>

        <SectionCard title="How it works">
          <div className="space-y-3">
            {[
              "Capture or upload the ingredient panel.",
              "Run OCR and cleanup in the backend.",
              "Review parsed ingredients, nutrition, and warnings.",
            ].map((step, index) => (
              <div
                key={step}
                className={`flex items-start gap-4 rounded-3xl border px-4 py-4 ${
                  isDark ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${
                    isDark ? "bg-white/10 text-lime-200" : "bg-emerald-100 text-emerald-900"
                  }`}
                >
                  0{index + 1}
                </span>
                <p className={`text-sm leading-6 ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-6">
          <ImageUploader
            onSelect={handleImageSelect}
            accept="image/*"
            capture="environment"
          />

          <ScanPreview
            preview={preview}
            loading={isPending}
            onAnalyze={handleAnalyze}
            onRemove={handleRemove}
          />
        </div>

        <div className="space-y-6">
          {result ? (
            <>
              <SectionCard title="Scan result">
                <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
                  <div
                    className={`flex h-32 w-32 flex-col items-center justify-center rounded-[32px] bg-gradient-to-br ${
                      scoreTone(score) === "emerald"
                        ? "from-emerald-500 to-lime-400"
                        : scoreTone(score) === "amber"
                          ? "from-amber-500 to-orange-400"
                          : "from-rose-500 to-pink-400"
                    } text-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.6)]`}
                  >
                    <span className="text-4xl font-bold">{score}</span>
                    <span className="mt-1 text-xs uppercase tracking-[0.24em] text-white/80">
                      /100
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge
                        tone={
                          score >= 80 ? "emerald" : score >= 60 ? "amber" : "rose"
                        }
                      >
                        {score >= 80 ? "Excellent" : score >= 60 ? "Moderate" : "Needs attention"}
                      </Badge>
                      <span
                        className={`text-sm font-medium ${
                          isDark ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        Health score
                      </span>
                    </div>

                    <div>
                      <h2
                        className={`text-2xl font-bold ${
                          isDark ? "text-white" : "text-slate-950"
                        }`}
                      >
                        {result.verdict || "Analysis complete"}
                      </h2>
                      <p
                        className={`mt-2 max-w-2xl text-sm leading-6 ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {result.productName || "Unknown product"}{" "}
                        {result.brand ? `• ${result.brand}` : ""}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <InfoPill
                        label="Ingredients"
                        value={
                          ingredients.length ? `${ingredients.length} detected` : "None"
                        }
                      />
                      <InfoPill
                        label="Allergens"
                        value={
                          allergens.length ? `${allergens.length} flagged` : "None detected"
                        }
                        tone={allergens.length ? "amber" : "emerald"}
                      />
                      <InfoPill
                        label="Restricted"
                        value={
                          restrictedIngredients.length
                            ? `${restrictedIngredients.length} flagged`
                            : "None detected"
                        }
                        tone={restrictedIngredients.length ? "rose" : "emerald"}
                      />
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Nutrition">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {nutritionFields.map((item) => (
                    <InfoPill
                      key={item.key}
                      label={item.label}
                      value={formatValue(result.nutrition?.[item.key])}
                    />
                  ))}
                </div>
              </SectionCard>

              <div className="grid gap-6 lg:grid-cols-2">
                <SectionCard title="Ingredients">
                  {ingredients.length ? (
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map((item) => (
                        <Badge key={item} tone="neutral">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      No ingredients were detected from the current image.
                    </p>
                  )}
                </SectionCard>

                <SectionCard title="Alerts">
                  <div className="space-y-4">
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                          isDark ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        Allergens
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {allergens.length ? (
                          allergens.map((item) => (
                            <Badge key={item} tone="amber">
                              {item}
                            </Badge>
                          ))
                        ) : (
                          <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                            No allergens detected.
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                          isDark ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        Restricted ingredients
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {restrictedIngredients.length ? (
                          restrictedIngredients.map((item) => (
                            <Badge key={item} tone="rose">
                              {item}
                            </Badge>
                          ))
                        ) : (
                          <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                            No restricted ingredients detected.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </div>

              <SectionCard title="Health tips">
                {tips.length ? (
                  <ul className="space-y-3">
                    {tips.map((item) => (
                      <li
                        key={item}
                        className={`flex gap-3 rounded-2xl border px-4 py-3 text-sm leading-6 ${
                          isDark
                            ? "border-white/10 bg-white/5 text-slate-200"
                            : "border-slate-200/80 bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={`text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    No tips were generated for this scan yet.
                  </p>
                )}
              </SectionCard>
            </>
          ) : (
            <Card className="p-6 sm:p-8">
              <EmptyState
                title="Your analysis will appear here"
                description="Choose a clear food label image, run the scan, and the OCR results, ingredient parsing, and nutrition summary will populate this panel."
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
