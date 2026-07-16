import { NavLink, Link, useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const authenticatedLinks = [
  { to: ROUTES.HOME, label: "Home" },
  { to: ROUTES.DASHBOARD, label: "Dashboard" },
  { to: ROUTES.SCAN, label: "Scan" },
  { to: ROUTES.HISTORY, label: "History" },
  { to: ROUTES.SETTINGS, label: "Settings" },
];

const publicLinks = [
  { to: ROUTES.HOME, label: "Home" },
  { to: ROUTES.LOGIN, label: "Login" },
  { to: ROUTES.REGISTER, label: "Register" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const navItems = isAuthenticated ? authenticatedLinks : publicLinks;

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header
      className={`sticky top-0 z-30 border-b backdrop-blur-xl ${
        isDark ? "border-white/10 bg-slate-950/80" : "border-white/70 bg-white/75"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-500 text-sm font-bold text-white shadow-[0_18px_40px_-18px_rgba(22,163,74,0.9)]">
            FS
          </span>

          <span className="flex flex-col leading-tight">
            <span className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              FoodScan AI
            </span>
            <span className={`text-xs ${isDark ? "text-slate-300" : "text-slate-500"}`}>
              OCR-powered product intelligence
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-emerald-900 text-white shadow-[0_16px_32px_-18px_rgba(15,118,110,0.85)]"
                    : isDark
                      ? "text-slate-300 hover:bg-white/10 hover:text-white"
                      : "text-slate-600 hover:bg-white/80 hover:text-slate-900",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to={ROUTES.SCAN}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 px-4 py-2 text-sm font-medium text-white shadow-[0_18px_40px_-20px_rgba(22,163,74,0.85)] transition hover:-translate-y-0.5"
              >
                Start scan
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isDark
                    ? "border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition ${
                  isDark
                    ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                    : "border-slate-200/80 bg-white/90 text-slate-800 hover:border-slate-300 hover:bg-white"
                }`}
              >
                Login
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 px-4 py-2 text-sm font-medium text-white shadow-[0_18px_40px_-20px_rgba(22,163,74,0.85)] transition hover:-translate-y-0.5"
              >
                Create account
              </Link>
            </>
          )}
        </div>

        <Link
          to={isAuthenticated ? ROUTES.SCAN : ROUTES.LOGIN}
          className="inline-flex md:hidden items-center rounded-full bg-gradient-to-r from-emerald-700 to-lime-500 px-4 py-2 text-sm font-medium text-white shadow-[0_18px_40px_-20px_rgba(22,163,74,0.9)]"
        >
          Scan
        </Link>
      </div>
    </header>
  );
}
