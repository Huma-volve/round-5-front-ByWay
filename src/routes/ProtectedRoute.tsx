import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }:any ) {
  const isAuthenticated = !!localStorage.getItem("user"); // example auth check
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}