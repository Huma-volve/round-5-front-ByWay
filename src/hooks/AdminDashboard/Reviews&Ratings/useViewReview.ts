import { fetchReviewById } from "@/api/ReviewsAndRatings";
import type { ReviewsAndRatings } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useViewReview(id: string | null) {
  return useQuery<ReviewsAndRatings>({
    queryKey: ["review", id],
    queryFn: () => fetchReviewById(id !== null ? Number(id) : null),
    enabled: !!id,
  });
}
