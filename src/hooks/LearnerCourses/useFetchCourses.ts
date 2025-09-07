import { fetchAllCourses } from "@/api/learner-courses-api";
import type { CoursesHome } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCourses(page: number) {
  const { data, error, isLoading } = useQuery<CoursesHome[]>({
    queryKey: ["courses", page],
    queryFn: () => fetchAllCourses(page),
  });

  return {
    data,
    error,
    isLoading,
  };
}
