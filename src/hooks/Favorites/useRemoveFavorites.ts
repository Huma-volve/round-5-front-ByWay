import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFavoriteLearner } from "@/api/favourites-api";

export default function useRemoveFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavoriteLearner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
}
