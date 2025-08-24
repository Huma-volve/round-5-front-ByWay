import { useQuery } from "@tanstack/react-query";
import { fetchAdminRevenueGraphData } from "@/api/home-dashboard-api";

const useFetchRevenueGraphData = () => {
  return useQuery({
    queryKey: ["adminRevenueGraphData"],
    queryFn: fetchAdminRevenueGraphData,
  });
};

export default useFetchRevenueGraphData;
