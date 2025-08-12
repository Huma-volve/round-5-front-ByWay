import { Routes , Route, BrowserRouter as Router, Link} from 'react-router-dom'
import InstructorReviews from '../pages/instructor/InstructorReviews'
import Favourites from '../pages/Favourites/Favourites'
import NotificationPage from "../pages/Notifications/NotificationPage"; 
import SettingsPage from '../pages/Settings/SettingsPage';
import PaymethodPage from '../pages/Payments/PaymethodPage';
import PayHistoryPage from '../pages/Payments/PayHistoryPage';
export default function AppRoutes() {
    return (
      <Router>
        <Routes>
                <Route path="/" element={
                  <div className='flex gap-8'>Home
                    <Link to="/instructor/reviews">Instructor Reviews</Link>
                    <Link to="/favourites">Favourites</Link>
                    <Link to="/notifications">Notifications</Link>
                    <Link to="/settings">Settings</Link>
                  </div>
        } />
                <Route path='/instructor' >
                    <Route path='reviews' element={<InstructorReviews />} />
                </Route>
                {/* it must add as a child for BrowserCourses */}
                <Route path='/favourites' element={<Favourites />} />
                <Route path='/notifications' element={<NotificationPage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/settings/paymethod' element={<PaymethodPage />} />
                <Route path='/settings/payhistory' element={<PayHistoryPage />} />
                {/*End of children for BrowserCourse */}
        </Routes>
      </Router>
  )
}
