import { apiAddToCart, apiGetCart } from "@/api/cart-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiAddToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export const useFetchAllCart=()=>{
  return useQuery({
    queryKey: ["cart"],
    queryFn: apiGetCart,
  });
}