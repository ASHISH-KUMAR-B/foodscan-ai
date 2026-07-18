import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
      toast.success(data?.message || t("auth.register.successToast"));
      navigate(ROUTES.LOGIN);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <AuthShell
      formEyebrow={t("auth.register.eyebrow")}
      formTitle={t("auth.register.title")}
      formDescription={t("auth.register.description")}
      footerText={t("auth.register.footerText")}
      footerLinkLabel={t("auth.register.footerLink")}
      footerLinkTo={ROUTES.LOGIN}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t("auth.register.nameLabel")}
          type="text"
          placeholder={t("auth.register.namePlaceholder")}
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label={t("auth.register.emailLabel")}
          type="email"
          placeholder={t("auth.register.emailPlaceholder")}
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label={t("auth.register.passwordLabel")}
          type="password"
          placeholder={t("auth.register.passwordPlaceholder")}
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
          {isSubmitting ? t("auth.register.submitting") : t("auth.register.submit")}
        </Button>
      </form>
    </AuthShell>
  );
}