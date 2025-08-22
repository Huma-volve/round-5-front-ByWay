import { deleteReviewById } from "@/api/ReviewsAndRatings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function () {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteReviewById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
