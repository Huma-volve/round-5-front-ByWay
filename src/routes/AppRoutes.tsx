<<<<<<<<< Temporary merge branch 1
import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import InstructorReviews from "../pages/instructor/InstructorReviews";
=========
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import InstructorReviews from '../pages/instructor/InstructorReviews'
import Revenue from '../pages/instructor/Revenue'

>>>>>>>>> Temporary merge branch 2
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
<<<<<<<<< Temporary merge branch 1
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
      </Routes>
    </Router>
  );
=========
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path='/instructor' >
            <Route path='reviews' element={<InstructorReviews />} />
            <Route path='revenue' element={<Revenue />} />
          </Route>
        </Route>
          <Route path="/courses">
            <Route index element={<CoursesPage />} />
          </Route>
      </Routes>
    </Router>
  );
}
