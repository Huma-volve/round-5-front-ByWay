"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLocation } from "react-router-dom";
import { useOTP } from "@/hooks/useOTP";
import { useGenerateOTP } from "@/hooks/useGenerateOTP";

const validationSchema = Yup.object({
  otp: Yup.string()
    .matches(/^\d{4}$/, "OTP must be exactly 4 digits")
    .required("OTP is required"),
});

export function OTPForm() {
  const { mutate: sendOTP } = useOTP();
  const { mutate: getOTP } = useGenerateOTP();

  const email = useLocation().state;

  const initialValues = {
    otp: "",
  };

  const handleSubmit = (values: { otp: string }) => {
    const formData = { ...values, email };
    sendOTP(formData);
    console.log("OTP submitted:", values.otp);
  };

  const handleResendCode = (resetForm) => {
    getOTP({ email });
    resetForm();
    // Ready for resend API call
    console.log("Resend code requested");
    // await resendOTP()
  };

  return (
    <div className="auth-container">
      <div>
        <h2 className="auth-header">Enter OTP</h2>
        <p className="text-placeholder mt-2"></p> We have just sent you a 4
        digit code via
        <br />
        your email <span className="auth-link">{email}</span>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched, resetForm }) => (
          <Form className="auth-form">
            <div className="flex justify-between">
              <InputOTP
                maxLength={4}
                value={values.otp}
                onChange={(value) => setFieldValue("otp", value)}
                className="w-full"
              >
                <InputOTPGroup className="gap-4 *:rounded-md">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {errors.otp && touched.otp && (
              <p className="text-red-500 text-sm text-center">{errors.otp}</p>
            )}

            <Button type="submit" className="auth-button">
              Continue
            </Button>

            <div className="">
              <button
                type="button"
                onClick={() => handleResendCode(resetForm)}
                className="auth-link"
              >
                Didn't receive code? Resend Code
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
