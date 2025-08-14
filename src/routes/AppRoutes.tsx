import { Routes , Route, BrowserRouter as Router} from 'react-router-dom'

import Instructor from '@/pages/instructor/Instructor'
import MyCourses from '@/pages/Courses/MyCourses/MyCourses'
export default function AppRoutes() {
    return (
      <Router>
        <Routes>
                <Route path="/" element={<Instructor/>} />
                <Route path='/MyCourses' >
                    <Route path='/MyCourses' element={<MyCourses/>} />
                </Route>
        </Routes>
      </Router>
    )}


 
