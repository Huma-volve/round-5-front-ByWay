import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import InstructorReviews from "../pages/instructor/InstructorReviews";
import CloseAccount from "../pages/close account/CloseAccount";
import Success from "../pages/success/Success";
import Profile from "../pages/profile/StudentProfile";
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
        <Route path="/profile" element={<Profile />}/>
    
      </Routes>
    </Router>
  );
}
