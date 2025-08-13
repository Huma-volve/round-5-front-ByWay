import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import InstructorReviews from "../pages/instructor/InstructorReviews";
import CloseAccount from "../pages/close account/CloseAccount";
import Success from "../pages/success/Success";

import AppLayout from "@/components/AppLayout";
import Revenue from "../pages/instructor/Revenue";
import USER_PROFILE from "@/data/userProfile";
import UserProfilePage from "@/pages/profile/UserProfilePage";
import EditUserProfile from "@/pages/profile/EditUserProfile";
import GetPaid from "@/pages/instructor/GetPaid";
import Favourites from "../pages/Favourites/Favourites";
import NotificationPage from "../pages/Notifications/NotificationPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import PaymethodPage from "../pages/Payments/PaymethodPage";
import PayHistoryPage from "../pages/Payments/PayHistoryPage";
import CoursesPage from "@/pages/courses/CoursesPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              Home
              <Link to="/instructor/reviews">Instructor Reviews</Link>
            </div>
          }
        />
        <Route path="/instructor">
          <Route path="reviews" element={<InstructorReviews />} />
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

        <Route path="/instructor">
          <Route path="reviews" element={<InstructorReviews />} />
        </Route>
        <Route path="/courses">
          <Route index element={<CoursesPage />} />
        </Route>
        {/* it must add as a child for BrowserCourses */}
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/paymethod" element={<PaymethodPage />} />
        <Route path="/settings/payhistory" element={<PayHistoryPage />} />
        {/*End of children for BrowserCourse */}

        <Route element={<AppLayout />}>
          <Route path="/instructor">
            <Route path="reviews" element={<InstructorReviews />} />
            <Route path="revenue" element={<Revenue />} />
            <Route path="get-paid" element={<GetPaid />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}