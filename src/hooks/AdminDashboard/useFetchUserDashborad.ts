import { fetchUsersDashboard } from "@/api/auth-api";
import { useQuery } from "@tanstack/react-query";
import type { UserDashboard } from "@/lib/types";
import type { AxiosError } from "axios";

export function useFetchUserDashboard() {
  const { data, error, isLoading, isError } = useQuery<UserDashboard[], AxiosError>({
    queryKey: ["userDashboard"],
    queryFn: fetchUsersDashboard,
  });

  return { data, error, isLoading, isError };
}
