import * as yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/AuthForms/FormError";
import { useSignUp } from "@/hooks/useSignUp";
import { AuthRoleSelect } from "./AuthRoleSelect";
import { Spinner } from "../common/Spinner";

function SignUpForm() {
  //data from useSignUp returns the response from the server
  const { mutate, isPending, error } = useSignUp();

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
      .required("This filed is required")
      .matches(regexes.name, "Please enter a valid name"),
    last_name: yup
      .string()
      .required("This filed is required")
      .matches(regexes.name, "Please enter a valid name"),
    email: yup
      .string()
      .required("This filed is required")
      .matches(regexes.email, "Please enter a valid email"),
    password: yup
      .string()
      .required("This filed is required")
      .matches(regexes.password, "Please enter a valid password"),
    password_confirmation: yup
      .string()
      .required("This filed is required")
      .oneOf([yup.ref("password")], "password doesn't match"),
    role: yup
      .string()
      .required("you should specify your role")
      .oneOf(["learner", "instructor"], "Invalid role Type"),
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
        name : values.first_name.concat(" ", values.last_name),
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        role: values.role
      }
      mutate(formData);
    },
  });

  if (isPending) return <Spinner label="Signing you up"/>

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
            placeholder="First Name"
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
            placeholder="Last Name"
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
          placeholder="Email"
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
            placeholder="Password"
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
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
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
        Sign Up
      </Button>
    </form>
  );
}
export default SignUpForm;
