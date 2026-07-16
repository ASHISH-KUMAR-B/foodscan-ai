import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import { registerSchema } from "./validation/registerSchema.js";
import { registerUser } from "./services/authService.js";
import { handleApiError } from "../../utils/errorHandler.js";
import { ROUTES } from "../../constants/routes.js";
import AuthShell from "./components/AuthShell.jsx";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const data = await registerUser(values);
      toast.success(data?.message || "Registration successful");
      navigate(ROUTES.LOGIN);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <AuthShell
      formEyebrow="Create account"
      formTitle="Register"
      formDescription="Make an account to save scans, compare products later, and keep your food insights in one place."
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkTo={ROUTES.LOGIN}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          type="text"
          placeholder="Your name"
          error={errors.name?.message}
          {...register("name")}
        />

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
          {isSubmitting ? "Creating account..." : "Register"}
        </Button>
      </form>
    </AuthShell>
  );
}
