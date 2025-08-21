import axiosInstance from "@/lib/axios-instance";

export async function fetchNotificationInstructor(): Promise<void> {
  const { data } = await axiosInstance.get("teacher/notifications");
  return data.data;
}
export async function fetchNotificationLearner(): Promise<void> {
  const { data } = await axiosInstance.get("learner/notifications");
  return data.data;
}