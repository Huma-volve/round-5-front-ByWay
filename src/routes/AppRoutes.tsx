import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import InstructorReviews from '../pages/instructor/InstructorReviews'
import Revenue from '../pages/instructor/Revenue'
import GetPaid from '@/pages/instructor/GetPaid';
import Favourites from '../pages/Favourites/Favourites'
import NotificationPage from "../pages/Notifications/NotificationPage"; 
import SettingsPage from '../pages/Settings/SettingsPage';
import PaymethodPage from '../pages/Payments/PaymethodPage';
import PayHistoryPage from '../pages/Payments/PayHistoryPage';
export default function AppRoutes() {
    return (
      <Router>
        <Routes>
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
                
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path='/instructor' >
            <Route path='reviews' element={<InstructorReviews />} />
            <Route path='revenue' element={<Revenue />} />
            <Route path='get-paid' element={<GetPaid />} />
          </Route>
        </Route>
        </Routes>
      </Router>
    )}