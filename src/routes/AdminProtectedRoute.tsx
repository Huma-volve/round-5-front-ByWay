import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function AdminProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const [role] = useLocalStorage("role", "");
  const [userId] = useLocalStorage("user_id", "");

  return !!userId && role === "admin" ? (
    children
  ) : (
    <Navigate to="/signin" replace />
  );
}
