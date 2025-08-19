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

export interface TopRatedCourse {
  id: number;
  title: string;
  average_rating: number;
  reviews_count: number;
  instructor_name: string | null;
}

export interface TopRatedCoursesResponse {
  status: number;
  message: string;
  data: TopRatedCourse[];
}
export interface UserDashboard {
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
  created_at: string;
}
 }
export interface UserProfileDashboard{
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  nationality: string;
  created_at: string;
  course_count? : number;
  bio? : string;
  total_earnings? : string;
  average_rating? : number;
}              
