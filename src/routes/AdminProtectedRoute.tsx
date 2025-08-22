import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function AdminProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const isAdmin = useMemo(() => {

    const [role] = useLocalStorage("role", "");
    const [userId] = useLocalStorage("user_id", "");

    return !!userId && role === "admin";
  }, []);

  return isAdmin ? children : <Navigate to="/signin" replace />;
}
