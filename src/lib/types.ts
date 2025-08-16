export interface SignUpFormType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
}

export interface SignInFormType {
  email: string;
  password: string;
}

export interface ForgotFormType {
  email: string;
}

// export interface OTPFormType {
//   code: string;
//   email: string;
// }
export interface OTPFormType {
  code: string;
  user_id: string;
}
