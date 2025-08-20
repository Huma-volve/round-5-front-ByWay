import { useQuery } from "@tanstack/react-query";
import { getReportsData, type ReportsData } from "@/api/reports-api";

export function useReports() {
  return useQuery<ReportsData>({
    queryKey: ["reports"],
    queryFn: getReportsData,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
