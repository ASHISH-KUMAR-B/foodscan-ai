import { Link } from "react-router-dom";

import { useState } from "react";
import { useHistoryDetailQuery } from "../hooks/useHistoryDetailQuery.js";
import { useDeleteHistoryMutation } from "../hooks/useDeleteHistoryMutation.js";
import Button from "../../../components/common/Button.jsx";
import Card from "../../../components/common/Card.jsx";
import EmptyState from "../../../components/common/EmptyState.jsx";
import { ROUTES } from "../../../constants/routes.js";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { useHistoryQuery } from "../hooks/useHistoryQuery.js";

const historyTips = [
  "Scanned products will appear here in chronological order.",
  "You will be able to compare repeated products over time.",
  "The history page is ready for API-backed scan records later.",
];

function scoreTone(score) {
  if (score >= 80) return "emerald";
  if (score >= 60) return "amber";
  return "rose";
}

export default function History() {
  const { isDark } = useTheme();
  const { data, isLoading, isError } = useHistoryQuery();

  const scans = data?.data ?? [];

  const [selectedId, setSelectedId] = useState(null);
  const { data: detailData, isLoading: isDetailLoading } = useHistoryDetailQuery(selectedId);
  const { mutate: deleteScan, isPending: isDeleting } = useDeleteHistoryMutation();

  const selectedScan = detailData?.data;

  const handleDelete = (id) => {
    if (window.confirm("Delete this scan? This cannot be undone.")) {
      deleteScan(id, {
        onSuccess: () => {
          if (selectedId === id) setSelectedId(null);
        },
      });
    }
  };

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
            Every product you scan is saved here automatically, with its
            health score and safety status for quick reference later.
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
            What history shows
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

      {isLoading && (
        <Card className="p-6 sm:p-8">
          <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Loading your scan history...
          </p>
        </Card>
      )}

      {isError && (
        <Card className="p-6 sm:p-8">
          <p className="text-sm text-rose-500">
            Could not load your history. Please try again.
          </p>
        </Card>
      )}

      {!isLoading && !isError && scans.length === 0 && (
        <Card className="p-6 sm:p-8">
          <EmptyState
            title="No scans yet"
            description="Once you start scanning products, your results will appear here with the product name, health score, and quick access to the full analysis."
          />
        </Card>
      )}

      {!isLoading && !isError && scans.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {scans.map((scan) => (
            <Card
              key={scan._id}
              className="cursor-pointer p-5 transition hover:-translate-y-0.5"
              onClick={() => setSelectedId(scan._id)}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                    scoreTone(scan.healthScore) === "emerald"
                      ? "bg-emerald-500"
                      : scoreTone(scan.healthScore) === "amber"
                        ? "bg-amber-500"
                        : "bg-rose-500"
                  }`}
                >
                  {scan.healthScore ?? "-"}
                </span>
                <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  {new Date(scan.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className={`mt-3 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                {scan.verdict || "Scan result"}
              </p>

              {scan.safetyStatus && (
                <p className={`mt-1 text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  {scan.safetyStatus}
                </p>
              )}

              {scan.allergens?.length > 0 && (
                <p className="mt-2 text-xs text-amber-600">
                  Allergens: {scan.allergens.join(", ")}
                </p>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(scan._id);
                }}
                disabled={isDeleting}
                className="mt-3 text-xs font-medium text-rose-500 hover:text-rose-400"
              >
                Delete
              </button>
            </Card>
          ))}
        </div>
      )}
      {selectedId && (
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
              Scan detail
            </h2>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              Close
            </button>
          </div>

          {isDetailLoading && (
            <p className={`mt-4 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Loading scan...
            </p>
          )}

          {selectedScan && (
            <div className="mt-4 space-y-4">
              <p className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                {selectedScan.verdict} — {selectedScan.healthScore}/100
              </p>

              {selectedScan.safetyStatus && (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    isDark ? "border-white/10 bg-white/5 text-slate-100" : "border-slate-200 bg-slate-50 text-slate-800"
                  }`}
                >
                  <p className="font-semibold">{selectedScan.safetyStatus}</p>
                  {selectedScan.safetyReasons?.length > 0 && (
                    <ul className="mt-1 list-disc pl-5 text-xs opacity-80">
                      {selectedScan.safetyReasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Ingredients
                </p>
                <div className="mt-2 space-y-2">
                  {selectedScan.ingredientAnalysis?.map((item) => (
                    <div
                      key={item.name}
                      className={`rounded-xl border px-3 py-2 text-sm ${
                        isDark ? "border-white/10 bg-white/5 text-slate-100" : "border-slate-200/60 bg-slate-50 text-slate-800"
                      }`}
                    >
                      <p className="font-semibold">{item.name}</p>
                      {item.description && (
                        <p className="mt-0.5 text-xs opacity-70">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}