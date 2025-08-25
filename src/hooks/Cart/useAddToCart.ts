import { apiAddToCart } from "@/api/cart-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiAddToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
