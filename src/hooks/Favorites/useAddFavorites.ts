import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavoriteLearner } from "@/api/favourites-api";
import type {FavouriteResponse} from "@/lib/types"; 

export default function useAddFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavoriteLearner,
    // Optimistic Update
    onMutate: async (courseId: number) => {
      await queryClient.cancelQueries({ queryKey: ["favourites"] });

      const prevFavourites = queryClient.getQueryData<FavouriteResponse[]>(["favourites"]);

      queryClient.setQueryData<FavouriteResponse[]>(["favourites"], (old = []) => [
        ...old,
        { course_id: courseId } as FavouriteResponse,
      ]);

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
