import axiosInstance from "@/lib/axios-instance";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export interface UpdateInstructorProfileRequest {
  first_name: string;
  last_name: string;
  image?: File | string;
  bio?: string;
  about?: string;
  twitter_link?: string;
  linkedin_link?: string;
  youtube_link?: string;
  facebook_link?: string;
  nationality?: string;
}

export interface UpdateInstructorProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      image?: string;
      bio?: string;
      about?: string;
      twitter_link?: string;
      linkedin_link?: string;
      youtube_link?: string;
      facebook_link?: string;
      nationality?: string;
      role: string;
      status: string;
      total_students?: number;
      total_reviews?: number;
      average_rating?: number;
    };
  };
}

export const updateInstructorProfile = async (
  data: UpdateInstructorProfileRequest
): Promise<UpdateInstructorProfileResponse> => {
  const formData = new FormData();

  // Append all the fields to FormData
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);

  if (data.bio) formData.append("bio", data.bio);
  if (data.about) formData.append("about", data.about);
  if (data.twitter_link) formData.append("twitter_link", data.twitter_link);
  if (data.linkedin_link) formData.append("linkedin_link", data.linkedin_link);
  if (data.youtube_link) formData.append("youtube_link", data.youtube_link);
  if (data.facebook_link) formData.append("facebook_link", data.facebook_link);
  if (data.nationality) formData.append("nationality", data.nationality);

  // Handle image upload
  if (data.image instanceof File) {
    formData.append("image", data.image);
  }
  try {
    const response = await axiosInstance.post<UpdateInstructorProfileResponse>(
      "profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to update profile";
    toast.error(errorMessage);
    throw error;
  }
};
