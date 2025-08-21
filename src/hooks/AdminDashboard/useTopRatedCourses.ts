import { useQuery } from "@tanstack/react-query";
import { fetchTopRatedCourses } from "@/api/home-dashboard-api";


export const useTopRatedCourses = () => {
  return useQuery({
    queryKey: ["topRatedCourses"],
    queryFn: fetchTopRatedCourses,
  });
};
