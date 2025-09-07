import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavoriteLearner } from "@/api/favourites-api";

export default function useAddFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavoriteLearner,
    onMutate: async (courseId: number) => {
      await queryClient.cancelQueries({ queryKey: ["favourites"] });
      const previousFavourites = queryClient.getQueryData<any[]>([
        "favourites",
      ]);
      queryClient.setQueryData<any[]>(["favourites"], (old = []) => [
        ...old,
        { course_id: courseId },
      ]);

      return { previousFavourites };
    },
    onError: (_err, _courseId, context) => {
      if (context?.previousFavourites) {
        queryClient.setQueryData(["favourites"], context.previousFavourites);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
}
