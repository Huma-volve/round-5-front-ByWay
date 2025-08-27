import { fetchMyCoursesDetails } from "@/api/learner-courses-api";
import type { CoursesDetails } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFetchMyCoursesDetails(courseId: string) {
  const { data, error, isLoading } = useQuery<CoursesDetails>({
    queryKey: ["my-courses", courseId],
    queryFn: () => fetchMyCoursesDetails(courseId),
  });
  return { data, error, isLoading };
}
