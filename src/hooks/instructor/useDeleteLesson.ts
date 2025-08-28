import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLesson } from "@/api/instructor-lessons-manage-api";
import { toast } from "react-toastify";
import type { LessonResponse } from "@/lib/types";

export default function useDeleteLesson(courseId: string) {
  const queryClient = useQueryClient();

  return useMutation<LessonResponse, Error, string | number>({
    mutationFn: (lessonId) => deleteLesson(courseId, lessonId),

    onSuccess: (data) => {
      toast.success(data.message || "Lesson deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
        queryClient.invalidateQueries({ queryKey: ["course", "for-update", courseId] });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to delete lesson");
    },
  });
}
