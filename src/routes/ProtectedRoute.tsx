import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }:{children : ReactElement} ) {
  const isAuthenticated = !!localStorage.getItem("user_id"); //check if there is a user id (should be is validated for otp)
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}