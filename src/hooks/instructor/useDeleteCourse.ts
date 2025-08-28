import { deleteCourse } from "@/api/instructor-course-manage-api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useDeleteCourse() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (courseId: string|undefined) => deleteCourse(courseId),
    onSuccess: (data) => {
      toast.success(data.message || "Course deleted successfully");
      navigate(`/instructor/home`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete course");
    },
  });
}
