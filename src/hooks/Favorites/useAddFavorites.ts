import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavoriteLearner } from "@/api/favourites-api";

export default function useAddFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavoriteLearner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
}
