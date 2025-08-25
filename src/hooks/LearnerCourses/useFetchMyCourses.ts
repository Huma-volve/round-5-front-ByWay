import { fetchMyCourses } from "@/api/learner-courses-api";
import type { CoursesHome } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFetchMyCourses() {
  const { data, error, isLoading } = useQuery<CoursesHome[]>({
    queryKey: ["my-courses"],
    queryFn: fetchMyCourses,
  });
  return { data, error, isLoading };
}
