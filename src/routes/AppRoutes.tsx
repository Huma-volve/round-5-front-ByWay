import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import InstructorReviews from '../pages/instructor/InstructorReviews'
import Revenue from '../pages/instructor/Revenue'

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
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}
