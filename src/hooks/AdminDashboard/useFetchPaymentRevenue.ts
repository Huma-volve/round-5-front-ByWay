import { approveWithdrawal, fetchPaymentRecordDetails, fetchPaymentRecords, fetchPaymentStistics, rejectWithdrawal } from "@/api/payment-revenue-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchPaymentStatistics = () => {
  return useQuery({
    queryKey: ["PaymentStatistics"],
    queryFn: fetchPaymentStistics,
  });
}

export const useFetchPaymentRecords = (page:number) => {
    return useQuery({
        queryKey: ["PaymentRecords",page],
        queryFn: ()=>fetchPaymentRecords(page),
        placeholderData: undefined,
    });
}

export const useFetchPaymentRecordDetails = (id:number) => {
    return useQuery({
        queryKey: ["PaymentRecordDetails", id],
        queryFn: () => fetchPaymentRecordDetails(id),
        enabled: !!id,
    });
}

export const useFetchApproveWithdrawal = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id}: {id:number}) => approveWithdrawal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PaymentRecords"] });
    }
    });
} 

export const useFetchRejectWithdrawal=() => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({id}: {id:number}) => rejectWithdrawal(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["PaymentRecords"] });
      }
      });
}

