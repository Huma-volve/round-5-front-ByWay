import { useQuery } from "@tanstack/react-query";
import { fetchDshboardStatistics } from "@/api/home-dashboard-api";


export const useFetchDashboardStatistics = () => {
  return useQuery({
    queryKey: ["DashboardStatistics"],
    queryFn: fetchDshboardStatistics,
  });
};

