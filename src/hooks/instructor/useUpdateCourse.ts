import { useNavigate } from "react-router-dom";
import { updateCourse } from "@/api/instructor-course-manage-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { updateCourseData } from "@/lib/types";

interface CourseApiResponse {
  data: updateCourseData;
  message?: string;
  status?: number;
}

export default function useUpdateCourse(courseId: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseData: Parameters<typeof updateCourse>[1]) =>
      updateCourse(courseId, courseData),

    onMutate: async (newCourseData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["course", "for-update", courseId],
      });

      // Snapshot the previous value
      const previousCourseData = queryClient.getQueryData([
        "course",
        "for-update",
        courseId,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["course", "for-update", courseId],
        (old: unknown) => {
          if (!old) return old;

          const typedOld = old as CourseApiResponse;
          // Update the course data within the expected API response structure
          return {
            ...typedOld,
            data: {
              ...typedOld.data,
              ...newCourseData,
            },
          };
        }
      );

      // Return a context object with the snapshotted value
      return { previousCourseData };
    },

    onSuccess: (data) => {
      toast.success(data.message || "Course updated successfully");
      navigate(`/instructor/my-courses/${courseId}/manage`);
    },

    onError: (error: Error, _newCourseData, context) => {
      toast.error(error.message || "Failed to update course");

      // If we have previous data, roll back
      if (context?.previousCourseData) {
        queryClient.setQueryData(
          ["course", "for-update", courseId],
          context.previousCourseData
        );
      }
    },

    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: ["course", "for-update", courseId],
      });
    },
  });
}
