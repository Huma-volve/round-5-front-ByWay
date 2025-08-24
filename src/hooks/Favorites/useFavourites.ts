// src/hooks/useFavourites.ts
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { fetchFavouriteLearner } from "@/api/favourites-api";
import type { FavouriteResponse } from "@/lib/types";

export function useFavourites() {
  const { data, error, isLoading, isError, refetch } = useQuery<FavouriteResponse[], AxiosError>({
    queryKey: ["favourites"],
    queryFn: fetchFavouriteLearner,
  });

  return { 
    favourites: data ?? [], 
    error, 
    isLoading, 
    isError, 
    refetch 
  };
}
