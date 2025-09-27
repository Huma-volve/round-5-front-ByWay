import { useQuery } from "@tanstack/react-query";
import { getInstructorReviews } from "@/api/instructor-reviews-api";

export default function useInstructorReviews(page: number) {
  return useQuery({
    queryKey: ["instructorReviews", page],
    queryFn: () => getInstructorReviews(page),
    // queryFn: () => {
    //   return { data: { reviews: [] } };
    // },
  });
}
