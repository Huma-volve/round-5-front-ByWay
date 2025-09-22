import { generateOTP } from "@/api/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { AxiosError } from "axios";

/**
 * When user signup app should set the auth + user's info in session or local storage || (cash) user's mail, redirect to otp.
 */
export function useGenerateOTP() {
  const navigate = useNavigate();
  const { mutate, error, isPending, data } = useMutation({
    mutationFn: generateOTP,
    onSuccess: (data, formData) => {
      console.log(data);
      /**
       * If data is success keep || cash user's mail for next step (otp)
       * Redirect user to /otp route with the email user entered.
       * If user already in otp and need to regenerate this hook will be called also but wn't navigate since it's the same router.
       * In case of otp upon signup otp will be autamtaicly generated and sent to user. We should redirect to otp route after signup.
       * In OTPForm component we can either retrieve user's email from this navigate state or email set in localStorage after signup.
       */

      toast.success("OTP has been sent to your mail");

      navigate("/otp", {
        state: formData.email,
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to generate OTP");
      console.log(error);
    },
  });

  return { mutate, error, isPending, data };
}
