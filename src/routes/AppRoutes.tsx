import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Route>
      </Routes>
    </Router>
  );
}
