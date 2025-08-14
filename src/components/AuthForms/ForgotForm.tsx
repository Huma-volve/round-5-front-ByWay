import * as yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/AuthForms/FormError";
import { useGenerateOTP } from "@/hooks/useGenerateOTP";

function ForgotForm() {
  const { mutate, data, isPending, error } = useGenerateOTP();

  //Regex
  const regexes = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };

  //Scheme
  const scheme = yup.object({
    email: yup
      .string()
      .required("This filed is required")
      .matches(regexes.email, "Please enter a valid email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: scheme,
    onSubmit: (formData) => {
      mutate(formData);
    },
  });

  return (
    <div className="auth-container">
      <div>
        <h2 className="auth-header">Forgot Password</h2>
        <p className="text-placeholder mt-2">Recover your account password</p>
      </div>
      <form
        className="auth-form"
        onReset={formik.handleReset}
        onSubmit={formik.handleSubmit}
      >
        {/* Email || username*/}
        <div>
          <label className="form-label" htmlFor="email">
            E-mail
          </label>
          <Input
            value={formik.values.email}
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-1/2 mt-2"
          />
          {formik.touched.email && formik.errors.email ? (
            <FormError error={formik.errors.email} />
          ) : null}
        </div>

        <Button className="auth-button" type="submit">
          Continue
        </Button>
      </form>
    </div>
  );
}
export default ForgotForm;
