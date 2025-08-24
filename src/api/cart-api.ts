import axiosInstance from "@/lib/axios-instance";

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
