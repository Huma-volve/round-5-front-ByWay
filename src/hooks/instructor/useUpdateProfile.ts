import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";
import { toast } from "react-hot-toast";

export interface EditProfileForm {
  name?: string;
  email?: string;
  password?: string
}

const updateProfile = async (updatedData: EditProfileForm) => {
  const res = await axiosInstance.patch(
    "instructor/profile/update",
    updatedData,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return res.data;
};

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
