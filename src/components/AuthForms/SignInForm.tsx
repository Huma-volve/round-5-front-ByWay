import * as yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/AuthForms/FormError";
import { Link } from "react-router-dom";
import { useSignIn } from "@/hooks/useSignIn";
import { Spinner } from "../common/Spinner";
import { useTranslation } from "react-i18next";

function SignInForm() {
  const { t } = useTranslation();
  const { mutate, isPending } = useSignIn();

  //Regex
  const regexes = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  //Scheme
  const scheme = yup.object({
    email: yup
      .string()
      .required(t("auth.thisFieldRequired"))
      .matches(regexes.email, t("auth.enterValidEmail")),
    password: yup
      .string()
      .required(t("auth.thisFieldRequired"))
      // .matches(regexes.password, t("auth.enterValidPassword")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: scheme,
    onSubmit: (formData) => {
      mutate(formData);
    },
  });

  if (isPending) return <Spinner label={t("auth.signingIn")} />;

  return (
    <form
      className="auth-form"
      onReset={formik.handleReset}
      onSubmit={formik.handleSubmit}
    >
      {/* Email || username*/}
      <div>
        <Input
          value={formik.values.email}
          name="email"
          placeholder={t("auth.email")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <FormError error={formik.errors.email} />
        ) : null}
      </div>

      {/* Passwords */}
      <div>
        <Input
          type="password"
          value={formik.values.password}
          name="password"
          placeholder={t("auth.password")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <FormError error={formik.errors.password} />
        ) : null}
      </div>

      <div className="responsive-action-row">
        <Button className="auth-button" type="submit">
          {t("common.signIn")}
        </Button>
        <Link className="auth-link" to="/forgot">
          {t("auth.forgotPassword")}
        </Link>
      </div>
    </form>
  );
}
export default SignInForm;
