import { fetchMyCoursesDetails } from "@/api/learner-courses-api";
import { useQuery } from "@tanstack/react-query";

export default function useFetchMyCoursesDetails(courseId: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["my-courses", courseId],
    queryFn: () => fetchMyCoursesDetails(courseId),
  });
  return { data, error, isLoading };
}
