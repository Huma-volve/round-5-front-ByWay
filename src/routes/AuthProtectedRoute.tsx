import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
export default function AuthProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const isAuthenticatedAsAdmin =
    localStorage.getItem("user_id") && localStorage.getItem("role") === "admin"; //check if there is a user id (should be is validated for otp)
  const isAuthenticatedAsUser =
    localStorage.getItem("user_id") && localStorage.getItem("role") !== "admin"; //check if there is a user id (should be is validated for otp)
  return isAuthenticatedAsAdmin ? (
    <Navigate to="/admin" replace />
  ) : isAuthenticatedAsUser ? (
    <Navigate to="/" replace />
  ) : (
    children
  );
}
