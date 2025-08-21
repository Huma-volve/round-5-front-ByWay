import { useQuery } from "@tanstack/react-query";
import { INSTRUCTOR_REVENUE_DATA } from "@/data/revenueData";
// TODO: Import the actual instructor revenue API function when ready
// import { fetchInstructorRevenueGraphData } from "@/api/instructor-revenue-api";

const useFetchInstructorRevenueGraphData = () => {
  return useQuery({
    queryKey: ["instructorRevenueGraphData"],
    queryFn: async () => {
      // TODO: Replace with actual API call when instructor endpoint is ready
      // For now, return dummy data in the same format as the API
      return {
        status: 200,
        message: "Instructor revenue data loaded successfully (dummy data)",
        data: INSTRUCTOR_REVENUE_DATA
      };
    },
    enabled: true, // Enable to use dummy data
  });
};

export default useFetchInstructorRevenueGraphData;
