import axiosInstance from "@/lib/axios-instance";
import type { TopRatedCoursesResponse } from "@/lib/types";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export const fetchTopRatedCourses =
  async (): Promise<TopRatedCoursesResponse> => {
    try {
      const response = await axiosInstance.get("dashboard/top-rated-courses");

      // عرض رسالة نجاح
      if (response.data?.status === 200) {
        toast.success(
          response.data.message || "Top-rated courses loaded successfully"
        );
      }

      return response.data;
    } catch (error) {
      // تنظيم الـ error message
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "Failed to fetch top-rated courses";
      toast.error(errorMessage);
      throw error;
    }
  };

export const fetchDshboardStatistics = async () => {
    try {
      const response = await axiosInstance.get("dashboard/statistics");
      // عرض رسالة نجاح
      if (response.data?.status === 200) {
        toast.success(
          response.data.message || "Dashboard statistics loaded successfully"
        );
      }
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "Failed to fetch dashboard statistics";
      toast.error(errorMessage);
      throw error;
    }
  };
