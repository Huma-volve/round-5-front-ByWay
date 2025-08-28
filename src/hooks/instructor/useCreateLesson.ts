import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLesson } from "@/api/instructor-lessons-manage-api";
import { toast } from "react-toastify";
import type { CreateLessonInput, LessonResponse } from "@/lib/types";

export default function useCreateLesson(courseId: string) {
  const queryClient = useQueryClient();

  return useMutation<LessonResponse, Error, CreateLessonInput>({
    mutationFn: (input) => createLesson(courseId, input),

    onSuccess: (data) => {
      toast.success(data.message || "Lesson created successfully");
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create lesson");
    },
  });
}
