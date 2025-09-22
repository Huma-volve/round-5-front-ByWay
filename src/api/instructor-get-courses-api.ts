import axiosInstance from "@/lib/axios-instance";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export function fetchInstructorCourses(pageNumber?: number) {
  try {
    const response = axiosInstance.get(
      `instructor/course-management/courses?page=${pageNumber}`
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    toast.error(axiosError.response?.data.message || "Failed to fetch courses");
    throw error;
  }
}
