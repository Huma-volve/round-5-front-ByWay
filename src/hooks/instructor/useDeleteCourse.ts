import { deleteCourse } from "@/api/instructor-course-manage-api";
import { queryClient } from "@/lib/query-keys";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useDeleteCourse(courseId: string|undefined) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deleteCourse(courseId),
    onMutate: async () => {
      queryClient.cancelQueries({ queryKey: ["my-courses"] });
      await queryClient.removeQueries({ queryKey: ["my-courses"] });
    },
    onSuccess: (data) => {
      toast.success(data.message || "Course deleted successfully");
      navigate(`/instructor/home`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete course");
    },
  });
}
