import axiosInstance from "@/lib/axios-instance";
import type { LearnerNotificationResponse, InstructorNotificationResponse } from "@/lib/types";

export async function fetchNotificationInstructor(): Promise<InstructorNotificationResponse[]> {
  const { data } = await axiosInstance.get("teacher/notifications");
  return data.data;
}

export async function fetchNotificationLearner(): Promise<LearnerNotificationResponse[]> {
  const { data } = await axiosInstance.get("learner/notifications");
  return data.data;
}

export async function markNotificationAsReadInstructor(id: string): Promise<void> {
  await axiosInstance.post(`teacher/notifications/${id}/read`);
}

export async function markNotificationAsReadLearner(id: string): Promise<void> {
  await axiosInstance.post(`learner/notifications/${id}/read`);
}

export async function deleteNotificationInstructor(id: string): Promise<void> {
  await axiosInstance.delete(`teacher/notifications/${id}`);
}

export async function deleteNotificationLearner(id: string): Promise<void> {
  await axiosInstance.delete(`learner/notifications/${id}`);
}
