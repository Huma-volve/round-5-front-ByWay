import AppLayout from "@/components/Layouts/AppLayout";
import ForgotForm from "@/components/AuthForms/ForgotForm";
import { OTPForm } from "@/components/AuthForms/OTPForm";
import ResetForm from "@/components/AuthForms/ResetForm";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AuthLayout from "@/components/Layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        //Protect those routes
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Route>

        {/* Auth pages */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<ForgotForm />} />
          <Route path="/reset/:id" element={<ResetForm />} />
          <Route path="/otp" element={<OTPForm />} />
        </Route>

      </Routes>
    </Router>
  );
}
