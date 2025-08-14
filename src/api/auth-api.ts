import axiosInstance from "@/lib/axios-instance";
import type {
  ForgotFormType,
  OTPFormType,
  SignInFormType,
  SignUpFormType,
} from "@/lib/types";

export async function signUp(formData: SignUpFormType) {
  //   make an api call
  const { data } = await axiosInstance.post("register", formData);
  return data;

  // const authToken = 'seifToken4454'
  // return  authToken
}

export async function signIn(formData: SignInFormType) {
  //   make an api call
  const { data } = await axiosInstance.post("login", formData);
  return data;

  // const authToken = 'seifToken4454'
  // return  authToken
}

export async function generateOTP(formData: ForgotFormType) {
//   const navigate = useNavigate();
//   const { data, status } = await axiosInstance.post("forgot-password", formData);

//   return data;

  const status = 'success'
  return  status
}

export async function verifyOTP(formData: OTPFormType) {
  const { data } = await axiosInstance.post("verify-code", formData);
  return data;

  // const authToken = 'seifToken4454'
  // return  authToken
}
