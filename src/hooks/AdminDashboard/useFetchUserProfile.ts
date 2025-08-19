// hooks/AdminDashboard/useFetchUserDashborad.ts
import { fetchUsersDashboardProfile } from "@/api/auth-api";
import type { UserProfileDashboard } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useFetchUserProfileDashboard(id: number) {
  const { data, error, isLoading, isError } = useQuery<
    UserProfileDashboard,
    AxiosError
  >({
    queryKey: ["userProfileDashboard", id],
    queryFn: () => fetchUsersDashboardProfile(id),
    enabled: !!id,
  });

  return { data, error, isLoading, isError };
}
