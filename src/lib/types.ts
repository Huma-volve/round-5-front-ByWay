export interface SignUpFormType {
  name: string;
  first_name: string;
  last_name: string;
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
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
}
export interface UserProfileDashboard {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  nationality: string;
  created_at: string;
  course_count?: number;
  bio?: string;
  total_earnings?: string;
  average_rating?: number;
}

export interface UserProfile {
  id: number;
  fname: string;
  lname: string;
  email: string;
  headline: string;
  about: string;
  x: string;
  facebook: string;
  youtube: number;
  linkedin: number;
}

export interface ReviewsAndRatings {
  id: number;
  course_name: string;
  course: string;
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
  status: string;
}
export interface CoursesHome {
  id: number;
  image: string;
  title: string;
  rating: number;
  description: string;
  price: number;
  average_rating: number;
  user: {
    id: number;
    name: string;
  };
  instructor: {
    id: number;
    name: string;
  };
  reviews: {
    learner_name: string;
    review: string;
    rating: number;
    created_at: string;
    learner_image: string;
  }[];
  content: {
    id: number;
    title: string;
  }[];
}
export interface instructorDetails {
  id: number;
  instructor: {
    name: string;
  };
  profile: {
    bio: string;
  };
  statistics: {
    total_students: number;
    average_rating: number;
  };
  courses: {
    data: CoursesHome[];
  };
}

// الشكل الموحد اللي هتستخدمه جوة الواجهة
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface LearnerNotificationResponse {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface InstructorNotificationResponse {
  id: string;
  data: {
    title: string;
    message: string;
    meta?: Record<string, unknown>;
  };
  read_at: string | null;
  created_at: string;
}

export interface FavouriteResponse {
  id: number;
  user_id: number;
  course_id: number;
  created_at: string;
  updated_at: string;
  course: {
    id: number;
    user_id: number;
    title: string;
    description: string;
    video_url: string;
    status: string;
    price: string;
    category_id: number;
    created_at: string;
    updated_at: string;
  };
}

export interface PaymentItem {
  total_amount: string;
  status: string;
  created_at: string;
  items: {
    course_id: number;
    course_name: string;
    price: string;
  }[];
  payment_method: {
    id: number;
    masked: string;
    brand: string;
  }[];
}
