import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import CloseAccount from "../pages/close account/CloseAccount";
import Success from "../pages/success/Success";
import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import Revenue from '../pages/instructor/Revenue'
import GetPaid from '@/pages/instructor/GetPaid';
import Favourites from '../pages/Favourites/Favourites'
import NotificationPage from "../pages/Notifications/NotificationPage"; 
import SettingsPage from '../pages/Settings/SettingsPage';
import PaymethodPage from '../pages/Payments/PaymethodPage';
import PayHistoryPage from '../pages/Payments/PayHistoryPage';
import Withdraw from '@/pages/instructor/Withdraw';
import USER_PROFILE from "@/data/userProfile";
import UserProfilePage from "@/pages/profile/UserProfilePage";
import EditUserProfile from "@/pages/profile/EditUserProfile";
import InstructorReviews from "@/pages/instructor/InstructorReviews";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path='/instructor' >
            <Route path='reviews' element={<InstructorReviews />} />
            <Route path='revenue' element={<Revenue />} />
            <Route path='get-paid' element={<GetPaid />} />
            <Route path='withdraw' element={<Withdraw />} />
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

        <Route path="/instructor">
          <Route path="reviews" element={<InstructorReviews />} />
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
