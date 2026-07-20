import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import EmptyState from "../../../components/common/EmptyState.jsx";
import Card from "../../../components/common/Card.jsx";
import ImageUploader from "../../../components/ImageUploader.jsx";
import { useTheme } from "../../../context/ThemeContext.jsx";

import ScanPreview from "../components/ScanPreview.jsx";
import { useScanMutation } from "../hooks/useScanMutation.js";
import { useAIInsightsMutation } from "../hooks/useAIInsightsMutation.js";


function formatValue(value) {
  if (value === 0) return "0";
  if (value === null || value === undefined || value === "") return "N/A";
  return value;
}

function scoreTone(score) {
  if (score >= 80) return "emerald";
  if (score >= 60) return "amber";
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
      <span className="block text-[11px] uppercase tracking-[0.22em] opacity-70">{label}</span>
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
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneClass}`}>
      {children}
    </span>
  );
}

export default function Scan() {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const { mutate, isPending } = useScanMutation();

  const nutritionFields = [
    { key: "calories", label: t("scan.nutritionFields.calories") },
    { key: "protein", label: t("scan.nutritionFields.protein") },
    { key: "fat", label: t("scan.nutritionFields.fat") },
    { key: "carbohydrates", label: t("scan.nutritionFields.carbohydrates") },
    { key: "sugar", label: t("scan.nutritionFields.sugar") },
    { key: "fiber", label: t("scan.nutritionFields.fiber") },
    { key: "sodium", label: t("scan.nutritionFields.sodium") },
  ];

  const howItWorksSteps = t("scan.howItWorksSteps", { returnObjects: true });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageSelect = (file) => {
    if (!file) return;
    if (preview) URL.revokeObjectURL(preview);
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setScanId(null);
    setInsights(null);
  };

  const handleAnalyze = () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("country", selectedCountry); // "IN" | "US" | "EU"
    mutate(formData, {
      onSuccess: (response) => {
        setResult(response?.data || null);
        setScanId(response?.scanId || null);
      },
    });
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview("");
    setResult(null);
    setScanId(null);
    setInsights(null);
  };

  const score = result?.healthScore ?? 0;
  const allergens = result?.allergens ?? [];
  const restrictedIngredients = result?.restrictedIngredients ?? [];
  const tips = result?.tips ?? [];

  const [scanId, setScanId] = useState(null);
const [insights, setInsights] = useState(null);

const { mutate: fetchInsights, isPending: isInsightsLoading } = useAIInsightsMutation();

const handleGetInsights = () => {
  if (!scanId) return;

  fetchInsights(scanId, {
    onSuccess: (response) => {
      setInsights(response?.data || null);
    },
  });
};
  return (
    <div className="space-y-8 py-8 sm:py-12">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-7 sm:p-8">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">
            {t("scan.eyebrow")}
          </span>

          <h1
            className={`mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            {t("scan.heroTitle")}
          </h1>

          <p className={`mt-4 max-w-2xl text-base leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {t("scan.heroDescription")}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="emerald">{t("scan.badges.ocr")}</Badge>
            <Badge tone="amber">{t("scan.badges.healthScore")}</Badge>
            <Badge tone="neutral">{t("scan.badges.nutritionFacts")}</Badge>
            <Badge tone="rose">{t("scan.badges.allergenChecks")}</Badge>
          </div>
        </Card>

        <SectionCard title={t("scan.howItWorksTitle")}>
          <div className="space-y-3">
            {howItWorksSteps.map((step, index) => (
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
                <p className={`text-sm leading-6 ${isDark ? "text-slate-200" : "text-slate-700"}`}>{step}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
<div className="space-y-6">
  <div className="mb-4">
    <label className={`text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? "text-slate-300" : "text-slate-500"}`}>
      Region / Regulations
    </label>
    <select
      value={selectedCountry}
      onChange={(e) => setSelectedCountry(e.target.value)}
      className={`mt-1 block w-full rounded-xl border px-3 py-2 text-sm font-medium ${
        isDark ? "border-white/10 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-800"
      }`}
    >
      <option value="IN">India (FSSAI)</option>
      <option value="US">United States (FDA)</option>
      <option value="EU">European Union (EFSA)</option>
    </select>
  </div>

  <ImageUploader onSelect={handleImageSelect} accept="image/*" capture="environment" />

  <ScanPreview preview={preview} loading={isPending} onAnalyze={handleAnalyze} onRemove={handleRemove} />
</div>

        <div className="space-y-6">
          {result ? (
            <>
              <SectionCard title={t("scan.result.title")}>
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
                    <span className="mt-1 text-xs uppercase tracking-[0.24em] text-white/80">/100</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge tone={score >= 80 ? "emerald" : score >= 60 ? "amber" : "rose"}>
                        {score >= 80
                          ? t("scan.result.scoreExcellent")
                          : score >= 60
                            ? t("scan.result.scoreModerate")
                            : t("scan.result.scoreNeedsAttention")}
                      </Badge>
                      <span className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                        {t("scan.result.healthScoreLabel")}
                      </span>
                    </div>

                    <div>
                      <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                        {result.verdict || t("scan.result.title")}
                      </h2>
                      <p className={`mt-2 max-w-2xl text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                        {result.productName || t("scan.result.unknownProduct")}{" "}
                        {result.brand ? `• ${result.brand}` : ""}
                      </p>
                    </div>

                    {result.safetyStatus && (
                      <div
                        className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                          result.safetyStatus.includes("Unsafe")
                            ? "border-rose-400/30 bg-rose-500/10 text-rose-700 dark:text-rose-100"
                            : result.safetyStatus.includes("Caution")
                              ? "border-amber-400/30 bg-amber-500/10 text-amber-700 dark:text-amber-100"
                              : "border-emerald-400/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-100"
                        }`}
                      >
                        <p className="font-semibold">{result.safetyStatus}</p>
                        {result.safetyReasons?.length > 0 && (
                          <ul className="mt-1 list-disc pl-5 text-xs opacity-90">
                            {result.safetyReasons.map((reason) => (
                              <li key={reason}>{reason}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <InfoPill
                        label={t("scan.result.ingredientsLabel")}
                        value={
                          result.ingredientAnalysis?.length
                            ? t("scan.result.ingredientsDetected", { count: result.ingredientAnalysis.length })
                            : t("scan.result.none")
                        }
                      />
                      <InfoPill
                        label={t("scan.result.allergensLabel")}
                        value={
                          allergens.length
                            ? t("scan.result.flaggedCount", { count: allergens.length })
                            : t("scan.result.noneDetected")
                        }
                        tone={allergens.length ? "amber" : "emerald"}
                      />
                      <InfoPill
                        label={t("scan.result.restrictedLabel")}
                        value={
                          restrictedIngredients.length
                            ? t("scan.result.flaggedCount", { count: restrictedIngredients.length })
                            : t("scan.result.noneDetected")
                        }
                        tone={restrictedIngredients.length ? "rose" : "emerald"}
                      />
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title={t("scan.nutritionTitle")}>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {nutritionFields.map((item) => (
                    <InfoPill key={item.key} label={item.label} value={formatValue(result.nutrition?.[item.key])} />
                  ))}
                </div>
              </SectionCard>

              <div className="grid gap-6 lg:grid-cols-2">
                <SectionCard title={t("scan.ingredientsSection.title")}>
                  {result.ingredientAnalysis?.length ? (
                    <div className="space-y-2">
                      {result.ingredientAnalysis.map((item) => (
                        <div
                          key={item.name}
                          className={`rounded-xl border px-3 py-2 text-sm ${
                            item.risk === "High"
                              ? "border-rose-400/30 bg-rose-500/5"
                              : item.risk === "Medium" || item.risk === "Mixed"
                                ? "border-amber-400/30 bg-amber-500/5"
                                : isDark
                                  ? "border-white/10 bg-white/5"
                                  : "border-slate-200/60 bg-slate-50"
                          } ${isDark ? "text-slate-100" : "text-slate-800"}`}
                        >
                          <p className="font-semibold">{item.name}</p>
                          {item.description && <p className="mt-0.5 text-xs opacity-70">{item.description}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      {t("scan.ingredientsSection.empty")}
                    </p>
                  )}
                </SectionCard>

                <SectionCard title={t("scan.alerts.title")}>
                  <div className="space-y-4">
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                        {t("scan.alerts.allergens")}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {allergens.length ? (
                          allergens.map((item) => (
                            <Badge key={item} tone="amber">{item}</Badge>
                          ))
                        ) : (
                          <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                            {t("scan.alerts.noAllergens")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                        {t("scan.alerts.restricted")}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {restrictedIngredients.length ? (
                          restrictedIngredients.map((item) => (
                            <Badge key={item} tone="rose">{item}</Badge>
                          ))
                        ) : (
                          <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                            {t("scan.alerts.noRestricted")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </div>

              <SectionCard title={t("scan.tipsSection.title")}>
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
                    {t("scan.tipsSection.empty")}
                  </p>
                )}
              </SectionCard>
              <SectionCard title="AI Insights">
                {!insights && (
                  <div className="space-y-3">
                    <p className={`text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      Get AI-generated notes on each ingredient and extra tips. This is supplementary and not a substitute for the analysis above.
                    </p>
                    <button
                      type="button"
                      onClick={handleGetInsights}
                      disabled={isInsightsLoading || !scanId}
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_18px_40px_-20px_rgba(22,163,74,0.85)] transition hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      {isInsightsLoading ? "Generating..." : "Get AI Insights"}
                    </button>
                  </div>
                )}

                {insights && (
                  <div className="space-y-4">
                    <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                      AI-generated · supplementary
                    </span>

                    {insights.ingredientNotes?.length > 0 && (
                      <div className="space-y-2">
                        {insights.ingredientNotes.map((item) => (
                          <div
                            key={item.name}
                            className={`rounded-xl border px-3 py-2 text-sm ${
                              isDark ? "border-white/10 bg-white/5 text-slate-100" : "border-slate-200/60 bg-slate-50 text-slate-800"
                            }`}
                          >
                            <p className="font-semibold">{item.name}</p>
                            <p className="mt-0.5 text-xs opacity-70">{item.note}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {insights.tips?.length > 0 && (
                      <ul className="space-y-2">
                        {insights.tips.map((tip) => (
                          <li
                            key={tip}
                            className={`flex gap-3 rounded-2xl border px-4 py-3 text-sm leading-6 ${
                              isDark ? "border-white/10 bg-white/5 text-slate-200" : "border-slate-200/80 bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </SectionCard>
            </>
          ) : (
            <Card className="p-6 sm:p-8">
              <EmptyState title={t("scan.emptyResult.title")} description={t("scan.emptyResult.description")} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}