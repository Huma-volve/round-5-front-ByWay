import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFavoriteLearner } from "@/api/favourites-api";
import type { FavouriteResponse } from "@/lib/types";

export default function useRemoveFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavoriteLearner,
    onMutate: async (courseId: number) => {
      await queryClient.cancelQueries({ queryKey: ["favourites"] });

      const prevFavourites = queryClient.getQueryData<FavouriteResponse[]>(["favourites"]);

      queryClient.setQueryData<FavouriteResponse[]>(["favourites"], (old = []) =>
        old.filter((fav) => fav.course_id !== courseId)
      );

      return { prevFavourites };
    },
    onError: (_err, _courseId, context) => {
      if (context?.prevFavourites) {
        queryClient.setQueryData(["favourites"], context.prevFavourites);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
}
