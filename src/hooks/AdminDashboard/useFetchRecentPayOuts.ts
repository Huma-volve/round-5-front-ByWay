import { useQuery } from "@tanstack/react-query";
import { fetchAdminRecentPayouts } from "@/api/home-dashboard-api";

export default function useFetchRecentPayouts() {
  return useQuery({
    queryKey: ["adminRecentPayouts"],
    queryFn: fetchAdminRecentPayouts,
  });
}