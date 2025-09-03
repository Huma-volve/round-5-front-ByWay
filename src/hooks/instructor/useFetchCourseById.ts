import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "@/api/instructor-course-manage-api";

export default function useFetchCourseById(courseId: string | undefined) {
  return useQuery({
    queryKey: ["course", "for-update", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
  });
}
