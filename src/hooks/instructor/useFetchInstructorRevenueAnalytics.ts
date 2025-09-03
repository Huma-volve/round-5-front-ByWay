import { useQuery } from "@tanstack/react-query";
import { getInstructorRevenueAnalytics } from "@/api/instructor-revenue-api";

export default function useFetchInstructorRevenueAnalytics() {
  return useQuery({
    queryKey: ["instructorRevenueAnalytics"],
    queryFn: getInstructorRevenueAnalytics,
  });
}
