import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useMemo } from "react";

export default function AuthProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const authStatus = useMemo(() => {
    const userId = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");

    if (!userId) {
      return { isAuthenticated: false, isAdmin: false };
    }

    return {
      isAuthenticated: true,
      isAdmin: role === "admin",
    };
  }, []);

  // If user is authenticated and is admin, redirect to admin dashboard
  if (authStatus.isAuthenticated && authStatus.isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // If user is authenticated but not admin, redirect to home
  if (authStatus.isAuthenticated && !authStatus.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, show auth pages
  return children;
}
