import { generateOTP } from "@/api/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

/**
 * When user signup app should set the auth + user's info in session or local storage || (cash) user's mail, redirect to otp.
 */
export function useGenerateOTP() {
  const navigate = useNavigate();
  const { mutate, error, isPending, data } = useMutation({
    mutationFn: generateOTP,
    onSuccess: (data, formData) => {
      console.log(data);
      navigate("/otp", {
        state: formData.email,
      });

      /**
       * If data is success keep || cash user's mail for next step (otp)
       */
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { mutate, error, isPending, data };
}
