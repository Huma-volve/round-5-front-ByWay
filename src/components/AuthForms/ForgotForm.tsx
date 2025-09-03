import * as yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/AuthForms/FormError";
import { useGenerateOTP } from "@/hooks/useGenerateOTP";
import { Spinner } from "../common/Spinner";

function ForgotForm() {
  const { mutate, /*data ,*/ isPending /*,error */ } = useGenerateOTP();

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

  if (isPending) return <Spinner label="Sending you a otp"/>
  

  return (
    <div className="w-[100%]">
      <div>
        <h2 className="auth-header">Forgot Password</h2>
        <p className="text-placeholder mt-2">Recover your account password</p>
      </div>
      <form
        className="auth-form lg:w-[50%]"
        onReset={formik.handleReset}
        onSubmit={formik.handleSubmit}
      >
        {/* Email || username*/}
        <div className="">
          <label className="form-label" htmlFor="email">
            E-mail
          </label>
          <Input
            value={formik.values.email}
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=""
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
