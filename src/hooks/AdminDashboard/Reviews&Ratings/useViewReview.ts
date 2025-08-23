import { useQueryClient } from "@tanstack/react-query";
import type { ReviewsAndRatings } from "@/lib/types";

export default function useViewReview(id: string | null) {
  const queryClient = useQueryClient();
  const allReviews = queryClient.getQueryData<ReviewsAndRatings[]>(["reviews"]);

  const data = id ? allReviews?.find((r) => r.id.toString() === id) : undefined;

  return { data };
}
