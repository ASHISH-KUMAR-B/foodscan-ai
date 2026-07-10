import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.body.style.backgroundColor = isDark ? "#020617" : "#f8fafc";
    document.body.style.color = isDark ? "#e2e8f0" : "#0f172a";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className={`sticky top-0 z-20 border-b backdrop-blur transition-colors ${isDark ? "border-slate-700 bg-slate-900/95 text-slate-100" : "border-slate-200 bg-white/95 text-slate-900"}`}>
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>

          <Link to={ROUTES.HOME} className={`text-lg font-bold ${isDark ? "text-emerald-400" : "text-green-700"}`}>
            FoodScan AI
          </Link>
        </div>

        <div
          className={`fixed inset-0 z-30 bg-black/30 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        <aside
          className={`fixed left-0 top-0 z-40 h-screen w-72 border-r p-5 shadow-2xl transition-transform duration-300 ease-out ${isDark ? "border-slate-700 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900"} ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Menu</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border ${isDark ? "border-slate-700 text-slate-200 hover:bg-slate-800" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              aria-label="Close navigation menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12" />
                <path d="M18 6l-12 12" />
              </svg>
            </button>
          </div>

          <nav className="mt-8 space-y-2">
            <Link
              to={ROUTES.HOME}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm transition hover:bg-green-600 hover:text-white ${isDark ? "text-slate-200" : "text-slate-700"}`}
            >
              Home
            </Link>
            <Link
              to={ROUTES.SCAN}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm transition hover:bg-green-600 hover:text-white ${isDark ? "text-slate-200" : "text-slate-700"}`}
            >
              Scan
            </Link>
            <Link
              to={ROUTES.HISTORY}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm transition hover:bg-green-600 hover:text-white ${isDark ? "text-slate-200" : "text-slate-700"}`}
            >
              History
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 block w-full rounded-xl px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </nav>
        </aside>

        <button
          type="button"
          onClick={() => setIsDark((value) => !value)}
          className={`ml-auto mr-3 inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium shadow-sm transition hover:bg-slate-50 ${isDark ? "border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700" : "border-slate-200 bg-white text-slate-700"}`}
          aria-label="Toggle theme"
        >
          <span>{isDark ? "Bright Theme" : "Dark Theme"}</span>
        </button>

        <Link
          to={ROUTES.PROFILE}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition hover:bg-slate-50 ${isDark ? "border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700" : "border-slate-200 bg-white text-slate-700"}`}
          aria-label="Profile"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21a8 8 0 0 0-16 0" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>
      </div>
    </header>
  );
}