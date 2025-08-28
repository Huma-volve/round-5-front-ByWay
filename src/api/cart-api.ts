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
  const response = await axiosInstance.post(`cart/${courseId}`, {
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

export const apiDeleteElementCart = async (id:number) => {
  try{
    const response = await axiosInstance.delete(`cart/${id}`);
    if(response.data?.status===200){
      toast.success("cart element deleted successfully")
      response.data.message|| "cart element deleted successfully"
    }
    return response.data;
  }catch(error){
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message ||
      "Failed to delete cart element";
    toast.error(errorMessage);
    throw error;
  }
}