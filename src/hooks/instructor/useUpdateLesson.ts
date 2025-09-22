import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLesson } from "@/api/instructor-lessons-manage-api";
import { toast } from "sonner";
import type {
  UpdateLessonInput,
  LessonResponse,
  CourseDataForInstructor,
} from "@/lib/types";

export default function useUpdateLesson(
  courseId: string,
  lessonId: string | number
) {
  const queryClient = useQueryClient();

  return useMutation<
    LessonResponse,
    Error,
    UpdateLessonInput,
    { previousLessonData: unknown }
  >({
    mutationFn: (input) => updateLesson(courseId, lessonId, input),
    onMutate: async (newLessonData) => {
      await queryClient.cancelQueries({
        queryKey: ["course", "for-update", courseId],
      });

      const previousLessonData = queryClient.getQueryData([
        "course",
        "for-update",
        courseId,
      ]);

      queryClient.setQueryData(
        ["course", "for-update", courseId],
        (oldData: unknown) => {
          if (!oldData) return oldData;
          const typedOldData = oldData as CourseDataForInstructor;

          const updatedLessons = typedOldData.data.lessons.map((lesson) => {
            const isMatch = Number(lesson.id) === Number(lessonId);

            if (isMatch) {
              return { ...lesson, ...newLessonData };
            }
            return lesson;
          });

          return {
            ...typedOldData,
            data: {
              ...typedOldData.data,
              lessons: updatedLessons,
            },
          };
        }
      );

      return { previousLessonData };
    },
    onSuccess: (data) => {
      toast.success(data.message || "Lesson updated successfully");
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
      queryClient.invalidateQueries({
        queryKey: ["lesson", courseId, lessonId],
      });
    },

    onError: (error: Error, _newLessonData, context) => {
      toast.error(error.message || "Failed to update lesson");

      if (context?.previousLessonData) {
        queryClient.setQueryData(
          ["course", "for-update", courseId],
          context.previousLessonData
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["course", "for-update", courseId],
      });
    },
  });
}
