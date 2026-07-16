import { useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar.jsx";
import MobileNav from "../components/layout/MobileNav.jsx";
import Footer from "../components/layout/Footer.jsx";
import { ROUTES } from "../constants/routes.js";

export default function MainLayout({ children }) {
	const location = useLocation();
	const isAuthRoute =
		location.pathname === ROUTES.LOGIN ||
		location.pathname === ROUTES.REGISTER ||
		location.pathname === "/registar";

	return (
		<div className="relative min-h-screen overflow-hidden text-slate-900">
			<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
				<div className="absolute right-[-4rem] top-24 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
				<div className="absolute bottom-0 left-1/2 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-lime-100/50 blur-3xl" />
			</div>

			{!isAuthRoute && <Navbar />}
			<main
				className={
					isAuthRoute
						? "relative"
						: "relative mx-auto w-full max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:px-8"
				}
			>
				{children}
			</main>
			{!isAuthRoute && <MobileNav />}
			{!isAuthRoute && <Footer />}
		</div>
	);
}
