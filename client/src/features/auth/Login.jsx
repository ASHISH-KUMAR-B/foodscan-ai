import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Button from "../../components/common/Button.jsx";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { loginSchema } from "./validation/loginSchema.js";
import { loginUser } from "./services/authService.js";
import { handleApiError } from "../../utils/errorHandler.js";
import { ROUTES } from "../../constants/routes.js";

export default function Login() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values) => {
		try {
			const data = await loginUser(values);
			if (data?.token) {
				login(data.token);
			}
			toast.success(data?.message || "Login successful");
			navigate("/dashboard");
		} catch (error) {
			handleApiError(error);
		}
	};

	return (
		<div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-10">
			<Card className="w-full p-8 sm:p-10">
				<span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">
					Welcome back
				</span>

				<h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
					Login
				</h1>
				<p className="mt-2 text-sm leading-6 text-slate-600">
					Sign in to continue scanning food labels and reviewing insights.
				</p>

				<form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<Input
						label="Email"
						type="email"
						placeholder="you@example.com"
						error={errors.email?.message}
						{...register("email")}
					/>

					<Input
						label="Password"
						type="password"
						placeholder="Password"
						error={errors.password?.message}
						{...register("password")}
					/>

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Logging in..." : "Login"}
					</Button>
				</form>

				<p className="mt-5 text-sm text-slate-600">
					Don&apos;t have an account?{" "}
					<Link to={ROUTES.REGISTER} className="font-medium text-emerald-700 hover:underline">
						Register
					</Link>
				</p>
			</Card>
		</div>
	);
}
