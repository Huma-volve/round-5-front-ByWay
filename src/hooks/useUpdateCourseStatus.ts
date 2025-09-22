// src/hooks/useUpdateCourseStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";
import { toast } from "sonner";
import type { UpdateCourseResponse } from "@/data/AdminDashboard/UpdateCourseResponse";
import type { UpdateCourseStatusProps } from "@/data/AdminDashboard/UpdateCourseStatusProps";

export const useUpdateCourseStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateCourseResponse, Error, UpdateCourseStatusProps>({
    mutationFn: async ({ courseId, status }) => {
      const response = await axiosInstance.patch<UpdateCourseResponse>(
        `/courses/approve/${courseId}`,
        { status }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["course", variables.courseId] });
      toast.success("Course status updated successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to update course status: " + error.message);
    },
  });
}
