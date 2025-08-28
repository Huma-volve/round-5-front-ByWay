import { useQuery } from "@tanstack/react-query";
import { getLessonById } from "@/api/instructor-lessons-manage-api";
import type { LessonResponse } from "@/lib/types";

export default function useFetchLessonById(
  courseId: string | undefined,
  lessonId: string | number | undefined
) {
  return useQuery<LessonResponse>({
    queryKey: ["lesson", courseId, lessonId],
    queryFn: () => getLessonById(courseId as string, lessonId as string),
    enabled: !!courseId && !!lessonId,
  });
}
