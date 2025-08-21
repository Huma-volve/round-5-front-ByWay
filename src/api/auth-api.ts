import axiosInstance from "@/lib/axios-instance";
import type {
  ForgotFormType,
  OTPFormType,
  SignInFormType,
  SignUpFormType,
} from "@/lib/types";
import { type NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

export async function signUp(formData: SignUpFormType) {
  const { data } = await axiosInstance.post("register", formData);
  return data;
}

export async function signIn(formData: SignInFormType) {
  const { data } = await axiosInstance.post("login", formData);
  return data;
}

//you should be authenticated to be able to signout
export async function signOut(navigate: NavigateFunction) {

   //blocks code blow it if returns an error
  const { data } = await axiosInstance.post("logout");
  toast.success(data.message);
  localStorage.removeItem("auth_token");
  localStorage.removeItem("email");
  localStorage.removeItem("user_id");
  localStorage.removeItem("role");
  navigate("/signin");

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