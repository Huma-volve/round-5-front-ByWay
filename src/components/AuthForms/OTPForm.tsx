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
import { useState } from "react";
import { Loader2 } from "lucide-react";

const validationSchema = Yup.object({
  code: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 4 digits")
    .required("OTP is required"),
});

export function OTPForm() {
  const { mutate: sendOTP, isPending: isSendingOTP } = useOTP();
  const { mutate: getOTP, isPending: isResendingOTP } = useGenerateOTP();
  const [isDelaySend, setIsDelaySend] = useState(false);
  const [isDelayResend, setIsDelayResend] = useState(false);

  //retrieve email from (state set in navigation in case of "forgot password") otherwise from local storage in case of signup
  const email = useLocation().state || localStorage.getItem("email");

  const initialValues = {
    code: "",
  };

  const handleSubmit = (values: { code: string }) => {
    setIsDelaySend(true);
    const formData = { ...values, user_id: "15" };
    setTimeout(() => {
      sendOTP(formData);
      setIsDelaySend(false);
    }, 5000);
  };

  const handleResendCode = (resetForm: any) => {
    setIsDelayResend(true);
    setTimeout(() => {
      getOTP({ email });
      setIsDelayResend(false);
    }, 5000);

    resetForm();
  };

  // if (isSendingOTP || isDebounced) return <Spinner label="Verifying"/>

  return (
    <div className="">
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
                maxLength={6}
                value={values.code}
                onChange={(value) => setFieldValue("code", value)}
                className="w-full"
              >
                <InputOTPGroup className="gap-4 *:rounded-md">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {errors.code && touched.code && (
              <p className="text-red-500 text-sm text-center">{errors.code}</p>
            )}

            <Button
              disabled={isSendingOTP || isDelaySend || isResendingOTP}
              type="submit"
              className="auth-button"
            >
              {isDelaySend || isSendingOTP? <><Loader2 className="animate-spin" size={25} /> {" "} Verifying </>  :  "Continue" }
            </Button>

            <div className="">
              <button
              disabled={isSendingOTP || isDelayResend || isResendingOTP}
                type="button"
                onClick={() => handleResendCode(resetForm)}
                className="auth-link"
              >
              {isDelayResend || isResendingOTP? <p className="flex gap-2"><Loader2 className="animate-spin" size={20} /> <span>Resending OTP</span> </p>  :  "Didn't receive code? Resend Code" }

                {/* Didn't receive code? Resend Code */}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
