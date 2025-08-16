import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import CloseAccount from "../pages/close account/CloseAccount";
import Success from "../pages/success/Success";
import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import Revenue from "../pages/instructor/Revenue";
import GetPaid from "@/pages/instructor/GetPaid";
import Favourites from "../pages/Favourites/Favourites";
import NotificationPage from "../pages/Notifications/NotificationPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import PaymethodPage from "../pages/Payments/PaymethodPage";
import PayHistoryPage from "../pages/Payments/PayHistoryPage";
import Withdraw from "@/pages/instructor/Withdraw";
import USER_PROFILE from "@/data/userProfile";
import UserProfilePage from "@/pages/profile/UserProfilePage";
import EditUserProfile from "@/pages/profile/EditUserProfile";
import CheckoutPage from "@/pages/Payments/CheckoutPage";
import ShoppingCartPage from "../pages/cart/ShoppingCartPage";
import InstructorReviews from "@/pages/instructor/InstructorReviews";
import CourseDetails from "@/components/courses/CourseDetails";
import InstructorDetails from "@/components/instructor/InstractorDetails/InstructorDetails";
import AddCourse from "@/pages/instructor/AddCourse";
import CourseSelection from "@/pages/instructor/CourseSelection";
import AddLessons from "@/pages/instructor/AddLessons";
import ViewLessons from "@/pages/instructor/ViewLessons";
import EditLesson from "@/pages/instructor/EditLesson";



import MyCourses from '@/pages/courses/MyCourses/MyCourses';
import InstructorCourseDetails from '@/pages/courses/CourseDetails/InstructorCourseDetails'

import InstructorProfile from "@/pages/instructor/profile/InstructorProfile";

import CoursesPage from "@/pages/courses/CoursesPage";
import Instructor from "@/pages/instructor/Instructor";
import LearnerMyCourses from "@/pages/courses/MyCourses/LearnerMyCourses";
import LearnerCourseDetails from "@/pages/courses/CourseDetails/LearnerCourseDetailes";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="Instructor" element={<Instructor />} />
          <Route path="/instructor">
            <Route path=":instructorId" element={<InstructorDetails />} />
            <Route path="reviews" element={<InstructorReviews />} />

            <Route path="revenue" element={<Revenue />} />
            <Route path="get-paid" element={<GetPaid />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="add-lessons" element={<AddLessons />} />
            <Route path="courses/select" element={<CourseSelection />} />
            <Route
              path="courses/:courseId/manage"
              element={<CourseSelection />}
            />
            <Route path="courses/:courseId/lessons" element={<ViewLessons />} />
            <Route
              path="courses/:courseId/lessons/add"
              element={<AddLessons />}
            />
            <Route
              path="courses/:courseId/lessons/edit/:lessonId"
              element={<EditLesson />}
            />
            <Route path="my-courses" element={<MyCourses />} />
            <Route
              path="course-details"
              element={<InstructorCourseDetails />}
            />
            <Route path="profile" element={<InstructorProfile />} />
          </Route>
        </Route>
        <Route path="/close-account" element={<CloseAccount />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/profile"
          element={<UserProfilePage user={USER_PROFILE[0]} />}
        />
        <Route
          path="/edit-user-profile"
          element={<EditUserProfile user={USER_PROFILE[0]} />}
        />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />

        {/* Learner courses */}
        <Route path="/learner-myCourses" element={<LearnerMyCourses />}>
          <Route path=":learnerCourseId" element={<LearnerCourseDetails />} />
        </Route>
        {/* End Leaner Courses */}


        <Route path="/courses">
          <Route index element={<CoursesPage />} />
          <Route path=":courseId" element={<CourseDetails />} />
        </Route>
        {/* it must add as a child for BrowserCourses */}
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/paymethod" element={<PaymethodPage />} />
        <Route path="/settings/payhistory" element={<PayHistoryPage />} />
        {/*End of children for BrowserCourse */}
      </Routes>
    </Router>
  );
}
