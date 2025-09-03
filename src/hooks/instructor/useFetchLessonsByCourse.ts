import { useQuery } from "@tanstack/react-query";
import { getLessonsByCourseId } from "@/api/instructor-lessons-manage-api";
import type { LessonsListResponse } from "@/lib/types";

export default function useFetchLessonsByCourse(courseId: string | undefined) {
  return useQuery<LessonsListResponse>({
    queryKey: ["lessons", courseId],
    queryFn: () => getLessonsByCourseId(courseId as string),
    enabled: !!courseId,
  });
}
