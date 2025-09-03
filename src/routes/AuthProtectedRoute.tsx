import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function AuthProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const [role] = useLocalStorage("role", "");
  const [userId] = useLocalStorage("user_id", "");

  const isAuthenticated = !!userId;
  const isAdmin = role === "admin";

  // If user is authenticated and is admin, redirect to admin dashboard
  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // If user is authenticated but not admin, redirect to home
  if (isAuthenticated && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, show auth pages
  return children;
}
