import { useQuery } from "@tanstack/react-query";
import { getInstructorRevenueGraphData } from "@/api/instructor-revenue-api";

const useFetchInstructorRevenueGraphData = () => {
  return useQuery({
    queryKey: ["instructorRevenueGraphData"],
    queryFn: getInstructorRevenueGraphData,
  });
};

export default useFetchInstructorRevenueGraphData;
