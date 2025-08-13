import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import InstructorReviews from '../pages/instructor/InstructorReviews'
import Revenue from '../pages/instructor/Revenue'
import GetPaid from '@/pages/instructor/GetPaid';
import AddCourse from '@/pages/instructor/AddCourse';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path='/instructor' >
            <Route path='reviews' element={<InstructorReviews />} />
            <Route path='revenue' element={<Revenue />} />
            <Route path='get-paid' element={<GetPaid />} />
            <Route path='add-course' element={<AddCourse />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}
