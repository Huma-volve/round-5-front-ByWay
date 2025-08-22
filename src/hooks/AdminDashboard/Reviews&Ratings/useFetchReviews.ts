import { fetchReviewsAndRatings } from "@/api/ReviewsAndRatings";
import type { ReviewsAndRatings } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFetchReviews() {
  const { data, error, isLoading } = useQuery<ReviewsAndRatings[]>({
    queryKey: ["reviews"],
    queryFn: async () => await fetchReviewsAndRatings() || [],
  });

  return { data, error, isLoading };
}
