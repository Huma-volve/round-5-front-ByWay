import { useNavigate } from "react-router-dom";
import { addNewCourse } from "@/api/instructor-course-manage-api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useAddNewCourse() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addNewCourse,

    onSuccess: (data) => {
      toast.success(data.message || "Course created successfully");
      navigate(`/instructor/my-courses/${data.data.id}/manage`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create course");
    },
  });
}
