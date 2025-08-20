import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// Main Pages
import CloseAccount from "../pages/close account/CloseAccount";
import Success from "../pages/success/Success";

// Profile Pages
import USER_PROFILE from "@/data/userProfile";
// import UserProfilePage from "@/pages/profile/UserProfilePage";
// import EditUserProfile from "@/pages/profile/EditUserProfile";

// Course Pages
import CoursesPage from "@/pages/Courses/CoursesPage";
import CourseDetails from "@/components/courses/CourseDetails";
import LearnerMyCourses from "@/pages/Courses/MyCourses/LearnerMyCourses";
import LearnerCourseDetails from "@/pages/Courses/CourseDetails/LearnerCourseDetailes";
import MyCourses from "@/pages/Courses/MyCourses/MyCourses";
import InstructorCourseDetails from "@/pages/Courses/CourseDetails/InstructorCourseDetails";


// Instructor Pages
import Instructor from "@/pages/instructor/Instructor";
import InstructorProfile from "@/pages/instructor/profile/InstructorProfile";
import InstructorDetails from "@/components/instructor/InstractorDetails/InstructorDetails";
import InstructorReviews from "@/pages/instructor/InstructorReviews";
import Revenue from "../pages/instructor/Revenue";
import GetPaid from "@/pages/instructor/GetPaid";
import Withdraw from "@/pages/instructor/Withdraw";
import AddCourse from "@/pages/instructor/AddCourse";
import CourseSelection from "@/pages/instructor/CourseSelection";
import AddLessons from "@/pages/instructor/AddLessons";
import ViewLessons from "@/pages/instructor/ViewLessons";
import EditLesson from "@/pages/instructor/EditLesson";

// Auth Components
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ForgotForm from "@/components/AuthForms/ForgotForm";
import { OTPForm } from "@/components/AuthForms/OTPForm";
import ResetForm from "@/components/AuthForms/ResetForm";

// Layouts
import AppLayout from "@/components/Layouts/AppLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

import PaymentRevenue from "@/pages/AdminDashboard/payment & revenue/PaymentRevenue";

import DashboardLayout from "@/components/Layouts/DashboardLayout";

// Admin
import UserManagementPage from "@/pages/AdminDashboard/UserManagement/UserManagementPage";
import UserManagementDetailes from "@/pages/AdminDashboard/UserManagement/UserManagementDetailes";
import AdminDashboard from "@/pages/AdminDashboard/AdminDashboard";

// General Feature Pages
import Favourites from "../pages/Favourites/Favourites";
import NotificationPage from "../pages/Notifications/NotificationPage";
import SettingsPage from "../pages/Settings/SettingsPage";

// Payment Pages
import PaymethodPage from "../pages/Payments/PaymethodPage";
import PayHistoryPage from "../pages/Payments/PayHistoryPage";
import CheckoutPage from "@/pages/Payments/CheckoutPage";
import ShoppingCartPage from "../pages/cart/ShoppingCartPage";
import AdminSettings from "@/pages/AdminDashboard/Settings/AdminSettings";

import AdminCoursesPage from "@/components/AdminDashboard/AdminCoursesPage/AdminCoursesPage";
import EditCourse from "@/components/AdminDashboard/EditCourse/EditCourse";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AuthProtectedRoute from "./AuthProtectedRoute";
import ReviewsAndRatings from "@/pages/AdminDashboard/Reviews&Ratings/ReviewsAndRatings";
import EditUserProfile from "@/pages/profile/EditUserProfile";
import UserProfilePage from "@/pages/profile/UserProfilePage";

export default function AppRoutes() {
  const role = localStorage.getItem("role");
  const HomeRoute =
    role === "learner" ? (
      <Route path="/" element={<CoursesPage/>} />
    ) : (
      <Route path="/" element={<Instructor />} />
    );

  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Home */}
          {/* <Route path="/" element={<Home />} /> */}
          {HomeRoute}

          {/* User Profile Section */}
          {/* <Route
            path="/profile"
            element={<UserProfilePage user={USER_PROFILE[0]} />}
          /> */}
          {/* <Route
            path="/edit-user-profile"
            element={<EditUserProfile user={USER_PROFILE[0]} />}
          /> */}

          {/* Course Discovery & Learning */}
          <Route path="/courses">
            <Route index element={<CoursesPage />} />
            <Route path=":courseId" element={<CourseDetails />} />
          </Route>

          {/* Learner Course Management */}
          <Route path="/learner-myCourses" element={<LearnerMyCourses/>}>
            <Route path=":learnerCourseId" element={<LearnerCourseDetails />} />
          </Route>

          {/* Instructor Section */}
          <Route
            path="/:instructorId/instructor-details"
            element={<InstructorDetails />}
          />

          <Route path="/instructor">
            <Route index element={<Instructor />} />
            <Route index path="home" element={<Instructor />} />
            {/* Public Instructor Profile */}

            {/* Instructor Dashboard & Reviews */}
            <Route path="reviews" element={<InstructorReviews />} />
            <Route path="home/reviews" element={<InstructorReviews />} />
            <Route path="profile" element={<InstructorProfile />} />

            {/* Financial Management */}
            <Route path="revenue" element={<Revenue />} />
            <Route path="get-paid" element={<GetPaid />} />
            <Route path="withdraw" element={<Withdraw />} />

            {/* Course Management */}
            <Route path="add-course" element={<AddCourse />} />
            <Route path="add-lessons" element={<AddLessons />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route
              path="course-details/:courseId"
              element={<InstructorCourseDetails />}
            />

            {/* Course Selection & Management */}
            {/* <Route path="courses/select" element={<CourseSelection />} /> //placeholder */}
            <Route
              path="courses/:courseId/manage"
              element={<CourseSelection />}
            />

            {/* Lesson Management */}
            <Route path="courses/:courseId/lessons" element={<ViewLessons />} />
            <Route
              path="courses/:courseId/lessons/add"
              element={<AddLessons />}
            />
            <Route
              path="courses/:courseId/lessons/edit/:lessonId"
              element={<EditLesson />}
            />
          </Route>

          {/* Shopping & Payments */}
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* User Preferences & Settings */}
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/notifications" element={<NotificationPage />} />

          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/paymethod" element={<PaymethodPage />} />
          <Route path="/settings/payhistory" element={<PayHistoryPage />} />

          {/* Account Management */}
          <Route path="/close-account" element={<CloseAccount />} />
          <Route path="/success" element={<Success />} />
        </Route>

        {/* Public Authentication Routes */}
        <Route
          element={
            <AuthProtectedRoute>
              <AuthLayout />
            </AuthProtectedRoute>
          }
        >
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<ForgotForm />} />
          <Route path="/reset/:id" element={<ResetForm />} />
          <Route path="/otp" element={<OTPForm />} />
        </Route>

        {/* admin dashboard Routes */}

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <DashboardLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="payment-revenue" element={<PaymentRevenue />} />
          <Route path="analytics" element={<div>Analytics</div>} />
          <Route path="user-manage" element={<UserManagementPage />} />
          <Route
            path="user-manage/:userId"
            element={<UserManagementDetailes />}
          />

          <Route path="AdminCoursesPage" element={<AdminCoursesPage />} />
          <Route path="EditCourse" element={<EditCourse />} />
          <Route
            path="course-details/:courseId"
            element={<InstructorCourseDetails />}
          />
          <Route path="payment-revenue" element={<PaymentRevenue />} />
          <Route path="settings" element={<AdminSettings/>} />
          <Route path="analytics" element={<div>Analytics</div>} />
          <Route path="reviews-ratings" element={<ReviewsAndRatings />} />

        </Route>
            <Route
            path="/profile"
            element={<UserProfilePage  />}
          />
          <Route
            path="/edit-user-profile"
            element={<EditUserProfile  />}
          />
      </Routes>
    </Router>
  );
}