// src/api/favourite-api.ts
import axiosInstance from "@/lib/axios-instance";
import { type FavouriteResponse } from "@/lib/types";

export async function fetchFavouriteLearner(): Promise<FavouriteResponse[]> {
  const { data } = await axiosInstance.get("learner/favorites");
  return data.data as FavouriteResponse[];
}

export async function addFavoriteLearner(courseId: number) {
  const { data } = await axiosInstance.post("learner/favorites/add", {
    course_id: courseId,
  });
  return {
    success: data.status === 201,
    message: data.message,
  };
}
export async function removeFavoriteLearner(courseId: number) {
  const { data } = await axiosInstance.post("learner/favorites/remove", {
    course_id: courseId,
  });
  return {
    success: data.status === 200,
    message: data.message,
  };
}
