import axiosInstance from "@/lib/axios-instance";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export async function getInstructorRevenueAnalytics() {
  try {
    const response = await axiosInstance.get("instructor/revenue-analytics");
    if (response.data?.status === 200) {
      console.log(response.data);
      toast.success(
        response.data.message ||
          "Instructor revenue analytics loaded successfully"
      );
    }
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message ||
      "Failed to fetch instructor revenue analytics";
    toast.error(errorMessage);
    throw error;
  }
}
