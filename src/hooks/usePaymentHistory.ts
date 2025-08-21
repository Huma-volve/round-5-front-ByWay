import { useEffect, useState } from "react";
import { fetchPaymentHistory } from "@/api/payment-history-api";
import {type PaymentItem } from "@/lib/types";

export function usePaymentHistory() {
  const [history, setHistory] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchPaymentHistory();
        setHistory(data);
      } catch (err) {
        console.error("Error fetching payment history:", err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { history, loading };
}
