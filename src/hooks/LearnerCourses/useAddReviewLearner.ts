import { postReviewLearner } from "@/api/learner-courses-api";
import { useMutation } from "@tanstack/react-query";

export default function useAddReviewLearner(courseId: string) {
  const {
    mutate: addReview,
    isPending,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: (reviewData: { rating: number; review: string }) =>
      postReviewLearner(courseId, reviewData),
  });

  return { addReview, isPending, isError, isSuccess, data, error };
}
