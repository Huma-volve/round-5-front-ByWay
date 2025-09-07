import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFavoriteLearner } from "@/api/favourites-api";

export default function useRemoveFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavoriteLearner,

    onMutate: async (courseId: number) => {
      await queryClient.cancelQueries({ queryKey: ["favourites"] });

      const previousFavourites = queryClient.getQueryData<
        { course_id: number }[]
      >(["favourites"]);

      queryClient.setQueryData<{ course_id: number }[]>(
        ["favourites"],
        (old = []) => old.filter((f) => f.course_id !== courseId)
      );

      return { previousFavourites };
    },

    onError: (_err, courseId, context) => {
      if (context?.previousFavourites) {
        queryClient.setQueryData(["favourites"], context.previousFavourites);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
}
