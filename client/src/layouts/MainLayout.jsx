import { useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import { ROUTES } from "../constants/routes.js";

export default function MainLayout({ children }) {
	const location = useLocation();
	const isAuthRoute =
		location.pathname === ROUTES.LOGIN ||
		location.pathname === ROUTES.REGISTER ||
		location.pathname === "/registar";

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			{!isAuthRoute && <Navbar />}
			<main className={!isAuthRoute ? "pb-20 md:pb-0" : ""}>{children}</main>
			{!isAuthRoute && <Footer />}
		</div>
	);
}