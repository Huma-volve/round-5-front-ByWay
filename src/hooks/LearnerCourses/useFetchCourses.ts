import { fetchAllCourses } from "@/api/learner-courses-api";
import type { CoursesHome } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCourses() {
  const { data, error, isLoading } = useQuery<CoursesHome[]>({
    queryKey: ["courses"],
    queryFn: fetchAllCourses,
  });

  return {
    data,
    error,
    isLoading,
  };
}
