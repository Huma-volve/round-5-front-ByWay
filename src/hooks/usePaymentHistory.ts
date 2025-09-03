// src/hooks/usePaymentHistory.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPaymentHistory } from "@/api/payment-history-api";
import type { PaymentItem } from "@/lib/types";
import type { AxiosError } from "axios";

export function usePaymentHistory() {
  const {
    data: history = [],
    isLoading,
    isError,
    error,
  } = useQuery<PaymentItem[], AxiosError>({
    queryKey: ["paymentHistory"],
    queryFn: fetchPaymentHistory,
  });

  return { history, isLoading, isError, error };
}
