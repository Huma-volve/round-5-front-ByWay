import { useQuery } from "@tanstack/react-query";
import { fetchInstructorRecentPayouts } from "@/api/instructor-revenue-api";

export default function useFetchInstructorRecentPayOuts() {
  return useQuery({
    queryKey: ["instructorRecentPayouts"],
    queryFn: fetchInstructorRecentPayouts,
  });
}
