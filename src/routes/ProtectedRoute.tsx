import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function ProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const [role] = useLocalStorage("role", "");
  const [userId] = useLocalStorage("user_id", "");

  if (!!userId && role) {
    return children;
  }
  return <Navigate to="/signin" replace />; 
}
