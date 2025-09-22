import axiosInstance from "@/lib/axios-instance";
import type { WithdrawalRequest } from "@/lib/types";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export async function getInstructorRevenueAnalytics() {
  try {
    const response = await axiosInstance.get("instructor/revenue-analytics");
    // if (response.data?.status === 200) {
    //   console.log(response.data);
    //   toast.success(
    //     response.data.message ||
    //       "Instructor revenue analytics loaded successfully"
    //   );
    // }
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

export async function getInstructorRevenueGraphData() {
  try {
    const response = await axiosInstance.get("instructor/revenue-report");
    // if (response.data?.status === 200) {
    //   console.log(response.data);
    //   toast.success(
    //     response.data.message ||
    //       "Instructor revenue graph data loaded successfully"
    //   );
    // }
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message ||
      "Failed to fetch instructor revenue graph data";
    toast.error(errorMessage);
    throw error;
  }
}
export const fetchInstructorRecentPayouts = async () => {
  try {
    const response = await axiosInstance.get("instructor/payments");
    // عرض رسالة نجاح
    // if (response.data?.status === 200) {
    //   toast.success(
    //     response.data.message || "Instructor recent payouts loaded successfully"
    //   );
    // }
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message ||
      "Failed to fetch instructor recent payouts";
    toast.error(errorMessage);
    throw error;
  }
};

export const withdraw = async (values: WithdrawalRequest) => {
  console.log(values)
  try {
    const response = await axiosInstance.post("instructor/withdrawals/request",values);
    // عرض رسالة نجاح
    if (response.data?.status === 200) {
      toast.success(
        response.data.message || "Instructor recent payouts loaded successfully"
      );
    }
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message ||
      "Failed to fetch instructor recent payouts";
    toast.error(errorMessage);
    throw error;
  }
};

