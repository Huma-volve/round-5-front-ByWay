import axiosInstance from "@/lib/axios-instance";

export async function fetchFavouriteLearner(): Promise<void> {
  const { data } = await axiosInstance.get("learner/favorites");
  return data.data;
}