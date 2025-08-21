import { CoursesApi } from "@/api/learner-courses-api";
import type { CoursesHome } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCourses() {
  const { data, error, isLoading } = useQuery<CoursesHome[]>({
    queryKey: ["courses"],
    queryFn: CoursesApi,
  });

  return {
    data,
    error,
    isLoading,
  };
}
