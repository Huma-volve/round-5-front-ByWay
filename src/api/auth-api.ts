import axiosInstance from "@/lib/axios-instance";
import type {
  ForgotFormType,
  OTPFormType,
  SignInFormType,
  SignUpFormType,
} from "@/lib/types";
import type { AxiosError } from "axios";
import { type NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

export async function signUp(formData: SignUpFormType) {
  const { data } = await axiosInstance.post("register", formData);
  if (data?.user) {
    localStorage.setItem("user_id", data.user.id);
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("auth_token", JSON.stringify(data.token));
  }
  return data;
}

export async function signIn(formData: SignInFormType) {
  const { data } = await axiosInstance.post("login", formData);
  return data;
}

//you should be authenticated to be able to signout
export async function signOut(navigate: NavigateFunction) {
  try {
    toast.loading("Signing out...", { toastId: "signOut" });
    const { data } = await axiosInstance.post("logout");
    toast.dismiss("signOut");
    toast.success(data.message);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("email");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/signin");
  } catch (error) {
    toast.dismiss("signOut");
    const axiosError = error as AxiosError<{ message?: string }>;
    toast.error(axiosError?.response?.data?.message || "Failed to sign out");
    throw error;
  }
}

export async function generateOTP(formData: ForgotFormType) {
  const { data /*status */ } = await axiosInstance.post(
    "forgot-password",
    formData
  );
  return data;
}

export async function verifyOTP(formData: OTPFormType) {
  console.log(formData);
  const { data } = await axiosInstance.post("verify-code", formData);
  return data;
}