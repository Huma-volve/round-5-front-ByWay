"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const validationSchema = Yup.object({
  otp: Yup.string()
    .matches(/^\d{4}$/, "OTP must be exactly 4 digits")
    .required("OTP is required"),
});

interface OTPFormValues {
  otp: string;
}

export function OTPForm() {
  const initialValues: OTPFormValues = {
    otp: "",
  };

  const handleSubmit = async (values: OTPFormValues) => {
    // Ready for API call
    console.log("OTP submitted:", values.otp);
    // Call your API here
    // await verifyOTP(values.otp)
  };

  const handleResendCode = () => {
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
        your email <span className="font-medium">example@gmail.com</span>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
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

            <Button
              type="submit"
              className="auth-button"
            >
              Continue
            </Button>

            <div className="">
              <button
                type="button"
                onClick={handleResendCode}
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
