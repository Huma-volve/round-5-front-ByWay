import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function ProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const authStatus = useMemo(() => {
    const [role] = useLocalStorage("role", "");
    const [userId] = useLocalStorage("user_id", "");



    // User must be authenticated and not an admin (Admin not granted access to those routes)
    return !!userId && role !== "admin";
  }, []);

  return authStatus ? children : <Navigate to="/signin" replace />;
}
