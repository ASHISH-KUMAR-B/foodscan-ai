import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white md:hidden">
      <div className="grid grid-cols-4 text-center text-xs text-slate-600">
        <Link className="px-2 py-3" to={ROUTES.DASHBOARD}>Dashboard</Link>
        <Link className="px-2 py-3" to={ROUTES.SCAN}>Scan</Link>
        <Link className="px-2 py-3" to={ROUTES.HISTORY}>History</Link>
        <Link className="px-2 py-3" to={ROUTES.PROFILE}>Profile</Link>
      </div>
    </nav>
  );
}