import { approveWithdrawal, fetchPaymentRecordDetails, fetchPaymentRecords, fetchPaymentStistics } from "@/api/payment-revenue-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchPaymentStatistics = () => {
  return useQuery({
    queryKey: ["PaymentStatistics"],
    queryFn: fetchPaymentStistics,
  });
}

export const useFetchPaymentRecords = () => {
    return useQuery({
        queryKey: ["PaymentRecords"],
        queryFn: fetchPaymentRecords,
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