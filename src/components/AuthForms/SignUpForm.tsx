import * as yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/AuthForms/FormError";
import { useSignUp } from "@/hooks/useSignUp";

function SignUpForm() {
  const { mutate, data, isPending, error,  } = useSignUp();
  //data from useSignUp returns the response from the server

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
    confirm_password: yup
      .string()
      .required("This filed is required")
      .oneOf([yup.ref("password")], "password doesn't match"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: scheme,
    onSubmit: (formData) => {
      mutate(formData);
    },
  });

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
            value={formik.values.confirm_password}
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirm_password && formik.errors.confirm_password ? (
            <FormError error={formik.errors.confirm_password} />
          ) : null}
        </div>
      </div>

      <Button className="auth-button" type="submit">
        Sign Up
      </Button>
    </form>
  );
}
export default SignUpForm;
