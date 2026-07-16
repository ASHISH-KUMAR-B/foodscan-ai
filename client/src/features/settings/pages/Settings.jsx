import { useEffect, useState } from "react";

import Button from "../../../components/common/Button.jsx";
import Card from "../../../components/common/Card.jsx";
import { useTheme } from "../../../context/ThemeContext.jsx";

const LANGUAGE_KEY = "foodscan-language";
const REMINDERS_KEY = "foodscan-reminders";
const CAMERA_KEY = "foodscan-camera-mode";

const preferenceCards = [
  {
    title: "Language",
    description: "Choose the language that feels easiest while scanning and reviewing.",
  },
  {
    title: "Reminders",
    description: "Keep lightweight reminders on so you remember to scan new products.",
  },
  {
    title: "Camera mode",
    description: "Prefer the rear camera for packaging or switch to manual upload flow.",
  },
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [language, setLanguage] = useState(
    () => localStorage.getItem(LANGUAGE_KEY) || "English"
  );
  const [reminders, setReminders] = useState(
    () => localStorage.getItem(REMINDERS_KEY) ?? "on"
  );
  const [cameraMode, setCameraMode] = useState(
    () => localStorage.getItem(CAMERA_KEY) || "environment"
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    localStorage.setItem(REMINDERS_KEY, reminders);
    localStorage.setItem(CAMERA_KEY, cameraMode);
  }, [language, reminders, cameraMode]);

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-8 py-8 sm:py-12">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="p-7 sm:p-8">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">
            Settings
          </span>

          <h1
            className={`mt-4 text-4xl font-bold tracking-tight sm:text-5xl ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Tune the scan experience to your routine.
          </h1>

          <p
            className={`mt-4 max-w-2xl text-base leading-7 ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            These preferences are stored locally for now so the interface feels
            responsive while the backend profile settings are still in progress.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={handleSave} size="lg">
              {saved ? "Saved" : "Save preferences"}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                setLanguage("English");
                setReminders("on");
                setCameraMode("environment");
                setTheme("light");
              }}
            >
              Reset defaults
            </Button>
          </div>
        </Card>

        <Card className="p-7 sm:p-8">
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
            Saved locally
          </h2>
          <p className={`mt-2 text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            These controls update the current browser session and local storage.
          </p>

          <div className="mt-5 grid gap-3">
            {preferenceCards.map((item) => (
              <div
                key={item.title}
                className={`rounded-3xl border p-4 ${
                  isDark ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50"
                }`}
              >
                <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>
                  {item.title}
                </p>
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
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
            General
          </h2>

          <div className="mt-5 space-y-4">
            <label className="block">
                <span className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                  Language
                </span>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
                    isDark
                      ? "border-white/10 bg-white/5 text-white"
                      : "border-slate-200 bg-white/90 text-slate-900"
                  }`}
                >
                <option>English</option>
                <option>Hindi</option>
              </select>
            </label>

            <label className="block">
                <span className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                  Theme
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
                    <span className="block text-sm font-semibold">Light</span>
                    <span className={`mt-1 block text-xs ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                      Bright, clean, and readable
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
                    <span className="block text-sm font-semibold">Dark</span>
                    <span className={`mt-1 block text-xs ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                      Better for low-light scanning
                    </span>
                  </button>
              </div>
            </label>
          </div>
        </Card>

        <Card className="p-7 sm:p-8">
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-950"}`}>
            Scanning
          </h2>

          <div className="mt-5 space-y-4">
            <label className="block">
                <span className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                  Reminder preference
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
                  <span className="block text-sm font-semibold">On</span>
                  <span className={`mt-1 block text-xs ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                    Keep a nudge for repeat scans
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
                  <span className="block text-sm font-semibold">Off</span>
                  <span className={`mt-1 block text-xs ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                    Keep the UI minimal
                  </span>
                </button>
              </div>
            </label>

            <label className="block">
                <span className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                  Default camera mode
                </span>
                <select
                  value={cameraMode}
                  onChange={(event) => setCameraMode(event.target.value)}
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
                    isDark
                      ? "border-white/10 bg-white/5 text-white"
                      : "border-slate-200 bg-white/90 text-slate-900"
                  }`}
                >
                <option value="environment">Rear camera</option>
                <option value="user">Front camera</option>
                <option value="upload">Manual upload</option>
              </select>
            </label>
          </div>
        </Card>
      </section>
    </div>
  );
}
