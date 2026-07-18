import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../../components/common/Button.jsx";
import Card from "../../../components/common/Card.jsx";
import { useTheme } from "../../../context/ThemeContext.jsx";

const REMINDERS_KEY = "foodscan-reminders";
const CAMERA_KEY = "foodscan-camera-mode";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const isDark = theme === "dark";

  const [reminders, setReminders] = useState(() => localStorage.getItem(REMINDERS_KEY) ?? "on");
  const [cameraMode, setCameraMode] = useState(() => localStorage.getItem(CAMERA_KEY) || "environment");
  const [saved, setSaved] = useState(false);

  const preferenceCards = [
    { title: t("settings.cards.language.title"), description: t("settings.cards.language.description") },
    { title: t("settings.cards.reminders.title"), description: t("settings.cards.reminders.description") },
    { title: t("settings.cards.camera.title"), description: t("settings.cards.camera.description") },
  ];

  useEffect(() => {
    localStorage.setItem(REMINDERS_KEY, reminders);
    localStorage.setItem(CAMERA_KEY, cameraMode);
  }, [reminders, cameraMode]);

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-8 py-8 sm:py-12">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="p-7 sm:p-8">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">
            {t("settings.eyebrow")}
          </span>

          <h1 className={`mt-4 text-4xl font-bold tracking-tight sm:text-5xl ${isDark ? "text-white" : "text-slate-950"}`}>
            {t("settings.title")}
          </h1>

          <p className={`mt-4 max-w-2xl text-base leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {t("settings.description")}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={handleSave} size="lg">
              {saved ? t("settings.saved") : t("settings.save")}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                i18n.changeLanguage("en");
                setReminders("on");
                setCameraMode("environment");
                setTheme("light");
              }}
            >
              {t("settings.resetDefaults")}
            </Button>
          </div>
        </Card>

        <Card className="p-7 sm:p-8">
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
            {t("settings.savedLocallyTitle")}
          </h2>
          <p className={`mt-2 text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {t("settings.savedLocallyDescription")}
          </p>

          <div className="mt-5 grid gap-3">
            {preferenceCards.map((item) => (
              <div
                key={item.title}
                className={`rounded-3xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50"}`}
              >
                <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{item.title}</p>
                <p className={`mt-2 text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-7 sm:p-8">
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>{t("settings.general")}</h2>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                {t("settings.language")}
              </span>
              <select
                value={i18n.language}
                onChange={(event) => i18n.changeLanguage(event.target.value)}
                className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
                  isDark ? "border-white/10 bg-white/5 text-white" : "border-slate-200 bg-white/90 text-slate-900"
                }`}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
                <option value="ml">മലയാളം</option>
              </select>
            </label>

            <label className="block">
              <span className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                {t("settings.theme")}
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    theme !== "dark"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : "border-slate-200 bg-white/90 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className="block text-sm font-semibold">{t("settings.light")}</span>
                  <span className={`mt-1 block text-xs ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                    {t("settings.lightDesc")}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    theme === "dark"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : "border-slate-200 bg-white/90 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className="block text-sm font-semibold">{t("settings.dark")}</span>
                  <span className={`mt-1 block text-xs ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                    {t("settings.darkDesc")}
                  </span>
                </button>
              </div>
            </label>
          </div>
        </Card>

        <Card className="p-7 sm:p-8">
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>{t("settings.scanningTitle")}</h2>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                {t("settings.reminderPref")}
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setReminders("on")}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    reminders === "on"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isDark
                        ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                        : "border-slate-200 bg-white/90 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className="block text-sm font-semibold">{t("settings.on")}</span>
                  <span className={`mt-1 block text-xs ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                    {t("settings.onDesc")}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setReminders("off")}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    reminders === "off"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isDark
                        ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                        : "border-slate-200 bg-white/90 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className="block text-sm font-semibold">{t("settings.off")}</span>
                  <span className={`mt-1 block text-xs ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                    {t("settings.offDesc")}
                  </span>
                </button>
              </div>
            </label>

            <label className="block">
              <span className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                {t("settings.defaultCamera")}
              </span>
              <select
                value={cameraMode}
                onChange={(event) => setCameraMode(event.target.value)}
                className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
                  isDark ? "border-white/10 bg-white/5 text-white" : "border-slate-200 bg-white/90 text-slate-900"
                }`}
              >
                <option value="environment">{t("settings.rearCamera")}</option>
                <option value="user">{t("settings.frontCamera")}</option>
                <option value="upload">{t("settings.manualUpload")}</option>
              </select>
            </label>
          </div>
        </Card>
      </section>
    </div>
  );
}