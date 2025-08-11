import { Routes , Route, BrowserRouter as Router} from 'react-router-dom'
import InstructorReviews from '../pages/instructor/InstructorReviews'

import CourseCard from '../components/course/CourseCard/CourseCard'
export default function AppRoutes() {
    return (
      <Router>
        <Routes>
                <Route path="/" element={<CourseCard/>} />
                <Route path='/instructor' >
                    <Route path='reviews' element={<InstructorReviews />} />
                </Route>
        </Routes>
      </Router>
  )
}
