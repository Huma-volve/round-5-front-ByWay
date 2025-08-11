import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import InstructorReviews from "../pages/instructor/InstructorReviews";
import CoursesPage from "../pages/courses/CoursesPage";
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
        <Route path="/courses">
          <Route index element={<CoursesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
