import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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

      toast.success(data?.message || t("auth.login.successToast"));
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <AuthShell
      formEyebrow={t("auth.login.eyebrow")}
      formTitle={t("auth.login.title")}
      formDescription={t("auth.login.description")}
      footerText={t("auth.login.footerText")}
      footerLinkLabel={t("auth.login.footerLink")}
      footerLinkTo={ROUTES.REGISTER}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t("auth.login.emailLabel")}
          type="email"
          placeholder={t("auth.login.emailPlaceholder")}
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label={t("auth.login.passwordLabel")}
          type="password"
          placeholder={t("auth.login.passwordPlaceholder")}
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
          {isSubmitting ? t("auth.login.submitting") : t("auth.login.submit")}
        </Button>
      </form>
    </AuthShell>
  );
}