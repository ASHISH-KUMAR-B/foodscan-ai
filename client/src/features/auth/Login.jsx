import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { loginSchema } from "./validation/loginSchema.js";
import { loginUser } from "./services/authService.js";
import { handleApiError } from "../../utils/errorHandler.js";
import { ROUTES } from "../../constants/routes.js";
import AuthShell from "./components/AuthShell.jsx";

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
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <AuthShell
      formEyebrow="Secure sign in"
      formTitle="Login"
      formDescription="Use your account to scan food labels, review nutrition, and track the products you check most."
      footerText="No account yet?"
      footerLinkLabel="Register"
      footerLinkTo={ROUTES.REGISTER}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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

        <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AuthShell>
  );
}
