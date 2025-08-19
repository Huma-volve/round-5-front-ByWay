import axiosInstance from "@/lib/axios-instance";
import type {
  ForgotFormType,
  OTPFormType,
  SignInFormType,
  SignUpFormType,
  UserDashboard,
  UserProfileDashboard,
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

export async function signOut(navigate:NavigateFunction) {
  const { data } = await axiosInstance.post("logout");
  toast.success(data.message);

  localStorage.removeItem("auth_token");
  localStorage.removeItem("email");
  localStorage.removeItem("user_id");
  localStorage.removeItem("role");
  navigate("/signin");
}

export async function generateOTP(formData: ForgotFormType) {
  const { data, /*status */ } = await axiosInstance.post("forgot-password", formData);
  return data;
}

export async function verifyOTP(formData: OTPFormType) {
  console.log(formData);
  const { data } = await axiosInstance.post("verify-code", formData);
  return data;

}
// User Management 
export async function fetchUsersDashboard(): Promise<UserDashboard[]> {
  const { data } = await axiosInstance.get<UserDashboard[]>("users", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer 3|db1qQYFReI61WXDsStLp33heCephyyO9z4oPcR499f3133b5`,
    },
  });
  return data;
}

export async function fetchUsersDashboardProfile(id:number): Promise<UserProfileDashboard> {
  const { data } = await axiosInstance.get<UserProfileDashboard>(`users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer 3|db1qQYFReI61WXDsStLp33heCephyyO9z4oPcR499f3133b5`,
    },
  });
  return data;
}

export async function deleteUserById(id: number): Promise<void> {
  await axiosInstance.delete(`users/${id}` , {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer 3|db1qQYFReI61WXDsStLp33heCephyyO9z4oPcR499f3133b5`,
    },
  });
}
// End of User Management
