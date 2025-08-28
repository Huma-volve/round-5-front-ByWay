import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadLessonMaterial } from "@/api/instructor-lessons-manage-api";
import { toast } from "react-toastify";

export default function useUploadLessonMaterial(
  courseId: string,
  lessonId: string | number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { material: File; name: string }) =>
      uploadLessonMaterial(courseId, lessonId, params),

    onSuccess: (data) => {
      toast.success(data.message || "Material uploaded successfully");
      queryClient.invalidateQueries({
        queryKey: ["lesson", courseId, lessonId],
      });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to upload material");
    },
  });
}
