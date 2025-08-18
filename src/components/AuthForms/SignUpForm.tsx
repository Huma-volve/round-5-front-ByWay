import * as yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/AuthForms/FormError";
import { useSignUp } from "@/hooks/useSignUp";
import { AuthRoleSelect } from "./AuthRoleSelect";
import { Spinner } from "../common/Spinner";
import { useTranslation } from "react-i18next";

function SignUpForm() {
  const { t } = useTranslation();
  //data from useSignUp returns the response from the server
  const { mutate, isPending } = useSignUp();

  //Regex
  const regexes = {
    name: /^[A-Za-z\s]{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^(\+2)?01[0125][0-9]{8}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  //Scheme
  const scheme = yup.object({
    first_name: yup
      .string()
      .required(t("auth.thisFieldRequired"))
      .matches(regexes.name, t("auth.enterValidName")),
    last_name: yup
      .string()
      .required(t("auth.thisFieldRequired"))
      .matches(regexes.name, t("auth.enterValidName")),
    email: yup
      .string()
      .required(t("auth.thisFieldRequired"))
      .matches(regexes.email, t("auth.enterValidEmail")),
    password: yup
      .string()
      .required(t("auth.thisFieldRequired"))
      .matches(regexes.password, t("auth.enterValidPassword")),
    password_confirmation: yup
      .string()
      .required(t("auth.thisFieldRequired"))
      .oneOf([yup.ref("password")], t("auth.passwordDoesntMatch")),
    role: yup
      .string()
      .required(t("auth.specifyRole"))
      .oneOf(["learner", "instructor"], t("auth.invalidRoleType")),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "",
    },
    validationSchema: scheme,
    onSubmit: (values) => {
      const formData = {
        name: values.first_name.concat(" ", values.last_name),
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        role: values.role,
      };
      mutate(formData);
    },
  });

  if (isPending) return <Spinner label={t("auth.signingUp")} />;

  return (
    <form
      className="auth-form"
      onReset={formik.handleReset}
      onSubmit={formik.handleSubmit}
    >
      {/* First and last name */}
      <div className="auth-input-group">
        <div>
          <Input
            value={formik.values.first_name}
            name="first_name"
            placeholder={t("auth.firstName")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.first_name && formik.errors.first_name ? (
            <FormError error={formik.errors.first_name} />
          ) : null}
        </div>
        <div>
          <Input
            value={formik.values.last_name}
            name="last_name"
            placeholder={t("auth.lastName")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <FormError error={formik.errors.email} />
          ) : null}
        </div>
      </div>

      {/* Email */}
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
      <div className="auth-input-group">
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
        <div>
          <Input
            type="password"
            value={formik.values.password_confirmation}
            name="password_confirmation"
            placeholder={t("auth.confirmPassword")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password_confirmation &&
          formik.errors.password_confirmation ? (
            <FormError error={formik.errors.password_confirmation} />
          ) : null}
        </div>
      </div>

      {/* Role */}
      <div>
        <AuthRoleSelect
          value={formik.values.role}
          onChange={formik.handleChange}
        />
        {formik.touched.role && formik.errors.role ? (
          <FormError error={formik.errors.role} />
        ) : null}
      </div>

      <Button className="auth-button" type="submit">
        {t("common.signUp")}
      </Button>
    </form>
  );
}
export default SignUpForm;
