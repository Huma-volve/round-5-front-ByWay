// src/hooks/useCourse.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";
import type { UpdateCourseResponse } from "@/data/AdminDashboard/UpdateCourseResponse";

export const useCourse = (courseId?: string) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      if (!courseId) throw new Error("Course ID is required");
      const { data } = await axiosInstance.get<UpdateCourseResponse>(
        `/courses/${courseId}`
      );
      return data.data;
    },
    enabled: !!courseId,
  });
};
