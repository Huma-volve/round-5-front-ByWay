import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLesson } from "@/api/instructor-lessons-manage-api";
import { toast } from "react-toastify";
import type { UpdateLessonInput, LessonResponse } from "@/lib/types";

export default function useUpdateLesson(
  courseId: string,
  lessonId: string | number
) {
  const queryClient = useQueryClient();

  return useMutation<LessonResponse, Error, UpdateLessonInput>({
    mutationFn: (input) => updateLesson(courseId, lessonId, input),

    onSuccess: (data) => {
      toast.success(data.message || "Lesson updated successfully");
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
      queryClient.invalidateQueries({
        queryKey: ["lesson", courseId, lessonId],
      });
      queryClient.invalidateQueries({
        queryKey: ["course", "for-update", courseId],
      });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update lesson");
    },
  });
}
