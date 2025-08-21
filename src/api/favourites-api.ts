// src/api/favourite-api.ts
import axiosInstance from "@/lib/axios-instance";
import { type FavouriteResponse } from "@/lib/types";

export async function fetchFavouriteLearner(): Promise<FavouriteResponse[]> {
  const { data } = await axiosInstance.get("learner/favorites");
  return data.data as FavouriteResponse[];
}
