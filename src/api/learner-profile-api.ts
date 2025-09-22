import axiosInstance from "@/lib/axios-instance";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const closeAccount = async (password:string) => {
    try {
        const response = await axiosInstance.post("profile/close-account",{
            password
        });
        if (response.data?.status === 200) {
            return {
            success: true,
            message: response.data?.message || "Account closed successfully",
            data: response.data,
            };
        }
        return {
            success: false,
            message: "Unexpected response status",
            data: response.data,
        };
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        const errorMessage =
            axiosError.response?.data?.message ||
            "Failed to close account";
        toast.error(errorMessage);
        throw error;
    }
}

export const closeAccountStatus  = () => {
    try{
        const response = axiosInstance.get("profile/status");
        return response;
    }catch(error){
        const axiosError = error as AxiosError<{ message?: string }>;
        const errorMessage =
            axiosError.response?.data?.message ||
            "Failed to fetch account status";
        toast.error(errorMessage);
        throw error;
    }
}
