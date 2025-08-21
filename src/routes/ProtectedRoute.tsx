import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useMemo } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const authStatus = useMemo(() => {
    const userId = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");

    // User must be authenticated and not an admin (Admin not granted access to those routes)
    return !!userId && role !== "admin";
  }, []);

  return authStatus ? children : <Navigate to="/signin" replace />;
}
