import axiosInstance from "@/lib/axios-instance";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export const checkoutPayment = async () => {
  try {
    const response = await axiosInstance.post("checkout");
    if (response.status === 201) {
      return {
        success: true,
        message: response.data?.message || "Checkout payment processed successfully",
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
      "Failed to process checkout payment";
    toast.error(errorMessage);
    throw error;
  }
};
export const checkoutConfirm=async(payment_method_id:string,order_id:number)=>{
    try {
        const response = await axiosInstance.post("checkout/confirm",{
        payment_method_id,
        order_id
        });
        if (response.status === 200) {
        return {
            success: true,
            message: response.data?.message || "Checkout payment confirmed successfully",
            dataConfirm: response.data,
        };
        }
        return {
        success: false,
        message: "Unexpected response status",
        dataConfirm: response.data,
        };
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        const errorMessage =
        axiosError.response?.data?.message ||
        "Failed to confirm checkout payment";
        toast.error(errorMessage);
        throw error;
    }

}

export const fetchPaymentMethods = async () => {
    try {
        const response = await axiosInstance.get("payment-methods");
        if (response.status === 200) {
        return {
            success: true,
            message: response.data?.message || "Payment methods fetched successfully",
            dataMethods: response.data,
        };
        }
        return {
        success: false,
        message: "Unexpected response status",
        dataMethods: response.data,
        };
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        const errorMessage =
        axiosError.response?.data?.message ||
        "Failed to fetch payment methods";
        toast.error(errorMessage);
        throw error;
    }
}