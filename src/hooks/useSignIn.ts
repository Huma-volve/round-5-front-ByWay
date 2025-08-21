import { AxiosError } from "axios";
import { signIn } from "@/api/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * When user signup app should set the auth + user's info in session or local storage || (cash) user's mail, redirect to otp.
 */
export function useSignIn() {
  const navigate = useNavigate();
  const { mutate, error, isPending, data } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log(data);

      localStorage.setItem("auth_token", data.data.access_token);
      localStorage.setItem("user_id", data.data.user.id);
      localStorage.setItem("email", data.data.user.email);
      localStorage.setItem("role", data.data.user.role);

      // Dispatch custom event to notify other components of localStorage change
      window.dispatchEvent(new Event("localStorageUpdate"));

      toast.success(data.message);
      if (data.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { mutate, error, isPending, data };
}
