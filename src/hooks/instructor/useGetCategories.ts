import { useQuery } from "@tanstack/react-query";
import { getCategoriesForCourse } from "@/api/instructor-course-manage-api";

export default function useGetCategories() {
  return useQuery({
    queryKey: ["categoriesForCourse"],
    queryFn: getCategoriesForCourse,
  });
}
