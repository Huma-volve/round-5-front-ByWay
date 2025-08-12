
import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import InstructorReviews from "../pages/instructor/InstructorReviews";
import CloseAccount from "../pages/close account/CloseAccount";
import Success from "../pages/success/Success";

import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import Revenue from '../pages/instructor/Revenue'
import USER_PROFILE from "@/data/userProfile";
import UserProfilePage from "@/pages/profile/UserProfilePage";
import EditUserProfile from "@/pages/profile/EditUserProfile";


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
        <Route path="/close-account" element={<CloseAccount/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/profile" element={<UserProfilePage user ={USER_PROFILE[0]} />}/>
        <Route path="/edit-user-profile" element={<EditUserProfile user ={USER_PROFILE[0]} />}/>
    
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path='/instructor' >
            <Route path='reviews' element={<InstructorReviews />} />
            <Route path='revenue' element={<Revenue />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );



}
