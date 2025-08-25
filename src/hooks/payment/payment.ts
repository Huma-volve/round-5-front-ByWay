import { checkoutConfirm, checkoutPayment, fetchPaymentMethods } from "@/api/payment-api"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useFetchcheckout=()=>{
    return useQuery({
        queryKey:["checkout"],
        queryFn:checkoutPayment,
        enabled: false,
    })
}
export const useCheckoutConfirm = () => {
  return useMutation({
    mutationFn: ({ payment_method_id, order_id }: { payment_method_id: string; order_id: number }) =>
      checkoutConfirm(payment_method_id, order_id),
  });
};
export const useFetchPaymentMethods=()=>{
    return useQuery({
        queryKey:["payment-methods"],
        queryFn:fetchPaymentMethods,
    })
}