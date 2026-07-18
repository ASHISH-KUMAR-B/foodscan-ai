import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import Button from "../../../components/common/Button.jsx";
import Card from "../../../components/common/Card.jsx";
import { ROUTES } from "../../../constants/routes.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { useScanStatsQuery } from "../../history/hooks/useScanStatsQuery.js";
import { getUserProfile } from "../../auth/services/authService.js";

export default function Profile() {
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
    enabled: isAuthenticated,
  });

  const { data: statsData } = useScanStatsQuery();

  const user = profileData?.data;
  const stats = statsData?.data;

  const profileStats = [
    { label: t("profile.stats.scansSaved"), value: stats?.totalScans ?? "0" },
    { label: t("profile.stats.healthyPicks"), value: stats?.healthyPicks ?? "0" },
    { label: t("profile.stats.warnings"), value: stats?.warnings ?? "0" },
  ];

  const securityNotes = t("profile.securityNotes", { returnObjects: true });

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : t("profile.notAvailable");

  return (
    <div className="space-y-8 py-8 sm:py-12">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="p-7 sm:p-8">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">
            {t("profile.eyebrow")}
          </span>

          <h1
            className={`mt-4 text-4xl font-bold tracking-tight sm:text-5xl ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            {t("profile.title")}
          </h1>

          <p className={`mt-4 max-w-2xl text-base leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {t("profile.description")}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={ROUTES.SCAN}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 px-6 py-3.5 text-base font-medium text-white shadow-[0_18px_40px_-20px_rgba(22,163,74,0.85)] transition hover:-translate-y-0.5"
            >
              {t("profile.startScan")}
            </Link>
            <Link
              to={ROUTES.SETTINGS}
              className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white/90 px-6 py-3.5 text-base font-medium text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-white"
            >
              {t("profile.openSettings")}
            </Link>
          </div>
        </Card>

        <Card className="p-7 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-[28px] bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-500 text-2xl font-bold text-white shadow-[0_18px_40px_-18px_rgba(22,163,74,0.9)]">
              {user?.name ? user.name.charAt(0).toUpperCase() : "FS"}
            </div>

            <div>
              <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                {t("profile.accountStatus")}
              </h2>
              <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {isAuthenticated ? t("profile.signedIn") : t("profile.sessionUnavailable")}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {profileStats.map((item) => (
              <div
                key={item.label}
                className={`rounded-3xl border p-4 ${
                  isDark ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                  {item.label}
                </p>
                <p className={`mt-4 text-3xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-7 sm:p-8">
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
            {t("profile.detailsTitle")}
          </h2>
          <div className={`mt-5 space-y-4 text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            <div className={`rounded-2xl px-4 py-3 ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
              <span className={`block text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                {t("profile.name")}
              </span>
              <span className={`mt-1 block text-base ${isDark ? "text-white" : "text-slate-900"}`}>
                {user?.name || t("profile.notAvailable")}
              </span>
            </div>

            <div className={`rounded-2xl px-4 py-3 ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
              <span className={`block text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                {t("profile.email")}
              </span>
              <span className={`mt-1 block text-base ${isDark ? "text-white" : "text-slate-900"}`}>
                {user?.email || t("profile.notAvailable")}
              </span>
            </div>

            <div className={`rounded-2xl px-4 py-3 ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
              <span className={`block text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                {t("profile.memberSince")}
              </span>
              <span className={`mt-1 block text-base ${isDark ? "text-white" : "text-slate-900"}`}>
                {memberSince}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-7 sm:p-8">
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
            {t("profile.securityTitle")}
          </h2>
          <ul className={`mt-5 space-y-3 text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {securityNotes.map((note) => (
              <li
                key={note}
                className={`flex gap-3 rounded-2xl px-4 py-3 ${isDark ? "bg-white/5" : "bg-slate-50"}`}
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span>{note}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Button variant="secondary" size="lg" className="w-full" disabled>
              {t("profile.manageAccountSoon")}
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}