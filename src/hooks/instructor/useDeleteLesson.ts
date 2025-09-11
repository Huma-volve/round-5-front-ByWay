import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLesson } from "@/api/instructor-lessons-manage-api";
import { toast } from "react-toastify";
import type { CourseDataForInstructor, LessonResponse } from "@/lib/types";

export default function useDeleteLesson(courseId: string) {
  const queryClient = useQueryClient();

  return useMutation<
    LessonResponse, 
    Error, 
    string | number, 
    { previousLessonData: unknown }
  >({
    mutationFn: (lessonId) => deleteLesson(courseId, lessonId),
    onMutate: async (lessonId) => {
      queryClient.cancelQueries({ queryKey: ["course", "for-update", courseId] });
      const previousLessonData = queryClient.getQueryData(["course", "for-update", courseId]);
      queryClient.setQueryData(["course", "for-update", courseId],
        (old:unknown)=>{
          if(!old) return old;
          const typedOldData = old as CourseDataForInstructor;
          const updatedLessons = typedOldData.data.lessons.filter((lesson)=>{
            const isMatch = Number(lesson.id) === Number(lessonId);
            
            if(isMatch){
              return false;
            }
            return lesson;
          });
          
          return {
            ...typedOldData,
            data:{
              ...typedOldData.data,
              lessons: updatedLessons,
            }
          };
        }
      )
      return { previousLessonData };
    },
    onSuccess: (data) => {
      toast.success(data.message || "Lesson deleted successfully");
    },

    onError: (error: Error, _lessonId, context) => {
      toast.error(error.message || "Failed to delete lesson");

      if(context?.previousLessonData){
        queryClient.setQueryData(["course", "for-update", courseId], context.previousLessonData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey:["course", "for-update", courseId]});
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
    }
  });
}
