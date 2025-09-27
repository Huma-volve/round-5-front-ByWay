import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  updateInstructorProfile,
  type UpdateInstructorProfileRequest,
} from "@/api/instructor-profile-api";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import { useLocalStorage } from "../useLocalStorage";

export function useUpdateInstructorProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  //   const [,setInstructorImage] = useLocalStorage("instructor_image","");

  return useMutation({
    mutationFn: (data: UpdateInstructorProfileRequest) =>
      updateInstructorProfile(data),
    onSuccess: (response) => {
      // if (response.data.user.image) {
      //   setInstructorImage(response.data.user.image);
      // }
      navigate("/instructor");
      toast.success(
        response.message || t("profile.profileUpdatedSuccessfully")
      );
      // Invalidate related queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["instructor"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (
      error: AxiosError<{ message: string; errors?: Record<string, string[]> }>
    ) => {
      const errorMessage =
        error.response?.data?.message || t("common.somethingWentWrong");
      toast.error(errorMessage);

      // Handle validation errors
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((field) => {
          errors[field].forEach((message) => {
            toast.error(`${field}: ${message}`);
          });
        });
      }
    },
  });
}
