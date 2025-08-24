import axiosInstance from "@/lib/axios-instance";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export const fetchPaymentStistics = async () => {
  try{
    const response =await axiosInstance.get("payments/statistics")
    if(response.data?.status===200){
      response.data.message|| "payment statistics loaded successfully"
    }
    return response.data;
  }
  catch(error){
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message ||
      "Failed to fetch payment statistics";
    toast.error(errorMessage);
    throw error;
}
}

export const fetchPaymentRecords = async () => {
    try{
        const response=await axiosInstance.get("payments/all")
        if(response.data?.status===200){
            response.data.message|| "payment records loaded successfully"
        }
        return response.data;
    }catch(error){
        const axiosError = error as AxiosError<{ message?: string }>;
        const errorMessage =
          axiosError.response?.data?.message ||
          "Failed to fetch payment records";
        toast.error(errorMessage);
        throw error;
    }
}

export const fetchPaymentRecordDetails = async (id:number) => {
    try{
        const response=await axiosInstance.get(`payments/${id}`)
        if(response.data?.status===200){
            response.data.message|| "payment record details loaded successfully"
        }
        return response.data;
    }catch(error){
        const axiosError = error as AxiosError<{ message?: string }>;
        const errorMessage =
          axiosError.response?.data?.message ||
          "Failed to fetch payment record details";
        toast.error(errorMessage);
        throw error;
    }
}

export const approveWithdrawal=async(id:number)=>{
  try{
      const response=await axiosInstance.patch(`payments/withdrawals/approve/${id}`)
      if(response.data?.status===200){
          response.data.message|| "withdrawal request approved successfully"
      }
      return response.data;
  }catch(error){
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "Failed to approve withdrawal request";
      toast.error(errorMessage);
      throw error;
  }
}