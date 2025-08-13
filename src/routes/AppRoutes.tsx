import AppLayout from "@/components/AppLayout";
import ForgotForm from "@/components/AuthForms/ForgotForm";
import { OTPForm } from "@/components/AuthForms/OTPForm";
import ResetForm from "@/components/AuthForms/ResetForm";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        //Protect those routes
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/forgot" element={<ForgotForm/>} />
          <Route path="/reset/:id" element={<ResetForm/>} />
          <Route path="/otp/:id" element={<OTPForm/>} />
        </Route>
      </Routes>
    </Router>
  );
}
