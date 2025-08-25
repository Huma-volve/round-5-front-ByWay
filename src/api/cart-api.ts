import axiosInstance from "@/lib/axios-instance";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export async function apiAddToCart(courseId: number) {
  const response = await axiosInstance.post("learner/cart/add", {
    course_id: courseId,
  });
  return {
    success: response.status === 201,
    message: response.data.message,
  };
}
export async function apiRemoveFromCart(courseId: number) {
  const response = await axiosInstance.post("learner/cart/remove", {
    course_id: courseId,
  });
  return {
    success: response.status === 200,
    message: response.data.message,
  };
}

export const apiGetCart = async ()=>{
  try{
    const response = await axiosInstance.get("cart");
    if(response.data?.status===200){
      response.data.message|| "cart loaded successfully"
    }
    return response.data;
  }catch(error){
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message ||
      "Failed to fetch cart";
    toast.error(errorMessage);
    throw error;
  }
}