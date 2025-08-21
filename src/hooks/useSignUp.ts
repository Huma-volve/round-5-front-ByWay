import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth-api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

/**
 * When user signup app should set the auth + user's info in session or local storage || (cash) user's mail, redirect to otp.
 */
export function useSignUp() {
  const navigate = useNavigate();
  const { mutate, error, isPending, data } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      /**
       * If data is success insert in local/session storage && Redirect to otp route
       */

      console.log(data);
      localStorage.setItem("auth_token", data.data.token);
      localStorage.setItem("user_id", data.data.user_id);
      localStorage.setItem("email", data.data.email);
      localStorage.setItem("role", data.data.role);

      toast.success(data.data.message);

      //When user sign up, backend already has the email it should send an otp to the new registered user automatically
      //  navigate("/otp");

        navigate("/");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
        /**
         * This error is a type of an axiosError since we use axios to fetch the data, it contains information like the request, response
         * and config options, you can access errors set from server via the response object
         */
      toast.error(error.response?.data?.message);
    },
    
  });

  return { mutate, error, isPending, data };
}
