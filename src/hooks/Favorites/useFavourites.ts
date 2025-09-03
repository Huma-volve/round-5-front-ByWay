// src/hooks/useFavourites.ts
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { fetchFavouriteLearner } from "@/api/favourites-api";
import type { FavouriteResponse } from "@/lib/types";
import { useLocalStorage } from "../useLocalStorage";

export function useFavourites() {
  const [token] = useLocalStorage<string>('auth_token','');
  const { data, error, isLoading, isError, refetch } = useQuery<FavouriteResponse[], AxiosError>({
    queryKey: ["favourites"],
    queryFn: fetchFavouriteLearner,
    enabled: !!token
  });

  return { 
    favourites: data ?? [], 
    error, 
    isLoading, 
    isError, 
    refetch 
  };
}
