import * as yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/AuthForms/FormError";

function ResetForm() {
  const mutate = (values: {}) => {
    console.log(values);
  };

  //Regex
  const regexes = {
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  //Scheme
  const scheme = yup.object({
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
      password: "",
      confirm_password: "",
    },
    validationSchema: scheme,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="auth-container w-full max-w-md mx-auto p-6 sm:p-8">
      <div>
        <h2 className="auth-header">Create a New Password</h2>
        <p className="text-placeholder mt-2">Recover your account password</p>
      </div>

      <form
        className="auth-form"
        onReset={formik.handleReset}
        onSubmit={formik.handleSubmit}
      >
        {/* Password */}
        <div>
          <label className="form-label" htmlFor="password">
            New Password
          </label>
          <Input {...formik.getFieldProps("password")} placeholder="Password" />
          {formik.touched.password && formik.errors.password && (
            <FormError error={formik.errors.password} />
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="form-label" htmlFor="confirm_password">
            Confirm Password
          </label>
          <Input
            {...formik.getFieldProps("confirm_password")}
            placeholder="Confirm Password"
          />
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              <FormError error={formik.errors.confirm_password} />
            )}
        </div>

        <Button className="auth-button" type="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
}
export default ResetForm;
