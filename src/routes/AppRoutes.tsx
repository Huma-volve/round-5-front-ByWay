import { Routes , Route, BrowserRouter as Router} from 'react-router-dom'
import InstructorReviews from '../pages/instructor/InstructorReviews'

import MyCourses from '@/pages/Courses/MyCourses/MyCourses'
export default function AppRoutes() {
    return (
      <Router>
        <Routes>
                <Route path="/" element={<MyCourses/>} />
                <Route path='/instructor' >
                    <Route path='reviews' element={<InstructorReviews />} />
                </Route>
        </Routes>
      </Router>
    )}


 
