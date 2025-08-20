// hooks/AdminDashboard/useFetchUserDashborad.ts
import { fetchUsersDashboardProfile } from "@/api/user-manage-api";
import type { UserProfileDashboard } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useFetchUserProfileDashboard(id: number) {
<<<<<<< HEAD
  return useQuery<UserProfileDashboard, AxiosError>({
=======
  const { data, error, isLoading, isError } = useQuery<
    UserProfileDashboard,
    AxiosError
  >({
>>>>>>> 25ed4a96662e52d7b59a8d0f25d388dbef40d9bb
    queryKey: ["userProfileDashboard", id],
    queryFn: () => fetchUsersDashboardProfile(id),
    enabled: !!id,
  });
}
