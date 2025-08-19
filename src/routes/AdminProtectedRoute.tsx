import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }:{children : ReactElement} ) {
  const isAdmin = localStorage.getItem("user_id") && (localStorage.getItem("role") === "admin");
  return isAdmin ? children : <Navigate to="/signin" replace />;
}
