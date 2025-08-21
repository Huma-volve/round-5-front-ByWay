import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useMemo } from "react";

export default function AdminProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const isAdmin = useMemo(() => {
    const userId = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");

    return !!userId && role === "admin";
  }, []);

  return isAdmin ? children : <Navigate to="/signin" replace />;
}
