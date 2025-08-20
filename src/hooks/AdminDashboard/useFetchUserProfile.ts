// hooks/AdminDashboard/useFetchUserDashborad.ts
import { fetchUsersDashboardProfile } from "@/api/user-manage-api";
import type { UserProfileDashboard } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useFetchUserProfileDashboard(id: number) {
  return useQuery<UserProfileDashboard, AxiosError>({
    queryKey: ["userProfileDashboard", id],
    queryFn: () => fetchUsersDashboardProfile(id),
    enabled: !!id,
  });
}
