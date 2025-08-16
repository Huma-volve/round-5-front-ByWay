import * as yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/AuthForms/FormError";
import { Link } from "react-router-dom";
import { useSignIn } from "@/hooks/useSignIn";

function SignInForm() {
  const { mutate, data, isPending, error,  } = useSignIn();

  //Regex
  const regexes = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  //Scheme
  const scheme = yup.object({
    email: yup
      .string()
      .required("This filed is required")
      .matches(regexes.email, "Please enter a valid email"),
    password: yup
      .string()
      .required("This filed is required")
      .matches(regexes.password, "Please enter a valid password"),
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
          placeholder="Email"
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

      <div className="responsive-action-row">
        <Button className="auth-button" type="submit">
          Sign in
        </Button>
        <Link className="auth-link" to="/forgot">Forgot your password?</Link>
      </div>
    </form>
  );
}
export default SignInForm;
