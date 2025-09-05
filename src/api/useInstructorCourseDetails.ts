import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";

export function useInstructorCourseDetails(courseId: string | number) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `instructor/course-management/courses/${courseId}`,
        {
          headers: { Accept: "application/json" },
        }
      );

      console.log("Course data:", data);
      return data;
    },
    enabled: !!courseId, 
  });
}
