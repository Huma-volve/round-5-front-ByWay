import { apiAddToCart, apiDeleteElementCart, apiGetCart } from "@/api/cart-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "../useLocalStorage";

export default function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiAddToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export const useFetchAllCart = () => {
  const [token] = useLocalStorage("token", "")
  return useQuery({
    queryKey: ["cart"],
    queryFn: apiGetCart,
    enabled: !!token,
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiDeleteElementCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
