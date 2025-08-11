import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import InstructorReviews from '../pages/instructor/InstructorReviews'
import Revenue from '../pages/instructor/Revenue'
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home
          <Link to="/instructor/reviews">Instructor Reviews</Link>
        </div>} />
        <Route path='/instructor' >
          <Route path='reviews' element={<InstructorReviews />} />
          <Route path='revenue' element={<Revenue />} />
        </Route>
      </Routes>
    </Router>
  )
}
