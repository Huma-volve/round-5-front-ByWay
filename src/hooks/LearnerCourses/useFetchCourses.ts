import { fetchAllCourses } from "@/api/learner-courses-api";
import type { CoursesHomeResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCourses(page: number) {
  const { data, error, isLoading,isError } = useQuery<CoursesHomeResponse>({
    queryKey: ["courses", page],
    queryFn: () => fetchAllCourses(page),
  });

  return {
    data,
    error,
    isLoading,
    isError
  };
}
