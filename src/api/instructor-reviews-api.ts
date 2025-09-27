import axiosInstance from "@/lib/axios-instance";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export async function getInstructorReviews(page: number) {
  try {
    const response = await axiosInstance.get(
      `instructor/reviews?page=${page}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to fetch reviews";
    toast.error(errorMessage);
    throw error;
  }
}
