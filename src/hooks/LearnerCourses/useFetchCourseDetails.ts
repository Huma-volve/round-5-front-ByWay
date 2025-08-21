import { fetchCourseDetails } from "@/api/learner-courses-api";
import type { CoursesHome } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCourseDetails(courseId: string) {
  const { data, error, isLoading } = useQuery<CoursesHome>({
    queryKey: ["courseDetails", courseId],
    queryFn: () => fetchCourseDetails(courseId),
  });

  return {
    data,
    error,
    isLoading,
  };
}
