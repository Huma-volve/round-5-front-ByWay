// src/hooks/useFavourites.ts
import { useEffect, useState } from "react";
import { fetchFavouriteLearner } from "@/api/favourites-api";
import { type FavouriteResponse } from "@/lib/types";

export function useFavourites() {
  const [favourites, setFavourites] = useState<FavouriteResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchFavouriteLearner();
        setFavourites(data);
      } catch (err) {
        console.error("Error fetching favourites:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { favourites, loading };
}
