 export interface SignUpFormType {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;

//   role: string
}

 export interface SignInFormType {
    email: string;
    password: string;
//   role: string
}

 export interface ForgotFormType {
    email: string;
}

export interface OTPFormType {
  otp: string;
  email: string;
}

