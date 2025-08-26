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
  title: string;
  description: string;
  price: string;
  status: string;
  image_url: string | null;
  video_url: string;
  lessons_count: number;
  reviews_count: number;
  average_rating: number;
  is_favorite: boolean;
  progress: string;
  course_image_url: string;
  course_id: number;
  instructor: {
    id: number;
    name: string;
  };
  reviews: {
    rating: number;
    review: string;
    user_image: string;
    learner_name: string;
    created_at: string;
  }[];
  content: {
    id: number;
    name: string;
    video_url: string 
  };
  created_at: string;
  updated_at: string;
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
export interface StatsHome {
  courses: number;
  instructors: number;
  learners: number;
  reviews: number;
}
export interface CoursesDetails {
  title: string;
  description: string;
  video_url: string;
  content: {
    id: number;
    title: string;
    video_url: string;
  }[];
  instructor: {
    id: number;
    name: string;
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
    image_url: string | null;
    video_url: string;
    status: string;
    price: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    user: {
      id: number;
      name: string;
    };
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
