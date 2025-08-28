import { fetchCategoriesCourses } from "@/api/learner-courses-api";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCategoriesCourses() {
  return useQuery({
    queryKey: ["categoriesCourses"],
    queryFn: fetchCategoriesCourses,
  });
}
