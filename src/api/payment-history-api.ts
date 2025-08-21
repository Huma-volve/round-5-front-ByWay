import axiosInstance from "@/lib/axios-instance";

export async function fetchPaymentHistory() {
  const res = await axiosInstance.get("payment-history"); 
  return res.data.data; 
}
