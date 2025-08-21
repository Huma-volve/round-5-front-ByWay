import { deleteReviewById } from "@/api/ReviewsAndRatings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function useDeleteReview(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteReviewById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
