import axiosInstance from "@/lib/axios-instance";
import type { ReviewsAndRatings } from "@/lib/types";

export async function fetchReviewsAndRatings(): Promise<
  ReviewsAndRatings[] | null
> {
  const response = await axiosInstance.get<{ data: ReviewsAndRatings[] }>(
    "reviews"
  );
  return response.data.data;
}
export async function fetchReviewById(
  id: number | null
): Promise<ReviewsAndRatings> {
  const response = await axiosInstance.get<{ data: ReviewsAndRatings }>(
    `reviews/${id}`
  );
  return response.data.data;
}

export async function deleteReviewById(id: number): Promise<void> {
  await axiosInstance.delete(`reviews/${id}`);
}
