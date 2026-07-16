import { NavLink } from "react-router-dom";

import { ROUTES } from "../../constants/routes.js";
import { useAuth } from "../../context/AuthContext.jsx";

const authenticatedItems = [
  { to: ROUTES.DASHBOARD, label: "Dashboard" },
  { to: ROUTES.SCAN, label: "Scan" },
  { to: ROUTES.HISTORY, label: "History" },
  { to: ROUTES.PROFILE, label: "Profile" },
];

const publicItems = [
  { to: ROUTES.HOME, label: "Home" },
  { to: ROUTES.SCAN, label: "Scan" },
  { to: ROUTES.LOGIN, label: "Login" },
  { to: ROUTES.REGISTER, label: "Join" },
];

const linkClass = ({ isActive }) =>
  [
    "flex flex-col items-center justify-center rounded-2xl px-2 py-2 transition",
    isActive
      ? "bg-emerald-900 text-white shadow-[0_16px_32px_-18px_rgba(15,118,110,0.9)]"
      : "text-slate-500 hover:bg-white/80 hover:text-slate-900",
  ].join(" ");

export default function MobileNav() {
  const { isAuthenticated } = useAuth();
  const items = isAuthenticated ? authenticatedItems : publicItems;

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-30 rounded-[28px] border border-white/70 bg-white/85 p-2 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-medium">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
