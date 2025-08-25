import { useFetchcheckout, useFetchPaymentMethods, useCheckoutConfirm } from "@/hooks/payment/payment";
import { currencyFormatter } from "@/utils/CurrencyFormatter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const { data, isLoading, isError } = useFetchPaymentMethods();
  const { data: checkoutData, refetch: checkoutRefetch, isLoading: loading } = useFetchcheckout();
  const [payment_method_id, setPaymentMethodId] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const checkoutMutation = useCheckoutConfirm();
  console.log("checkoutMutation", checkoutMutation);
  const handlePayment = () => {
    if (!payment_method_id) {
      console.log("No payment method selected");
      return;
    }
    checkoutMutation.mutate(
      { payment_method_id, order_id: checkoutData?.data?.data?.order_id },
      {
        onSuccess: async (res) => {
          console.log("Checkout confirmed:", res);
          toast.success("Payment successfully!");
          // await checkoutRefetch();
          
          navigate("/success");
        
        },
        onError: (err) => {
          console.error("Checkout failed:", err);
          toast.error("Checkout failed!");
        },
      }
    );
  };

  useEffect(() => {
    checkoutRefetch();
  }, []);

  if (isLoading) return <p>Loading payment methods...</p>;
  if (isError) return <p>Failed to load payment methods</p>;

  const methods = data?.dataMethods?.data || [];
  if (checkoutData === undefined || checkoutData?.data?.data?.total === 0 || checkoutMutation.status === "success") {
    return <p className="text-primary text-center font-medium h-[40vh] flex items-center justify-center">Cart is Empty,check your Cart </p>;
  }
  if (loading) {
    return <p className="text-primary text-center font-medium h-[40vh] flex">Loading...</p>;
  }
  return (
    <div className="space-y-4">
      <h1 className="text-primary text-center font-bold text-[20px]">Checkout Information</h1>
      <p className="text-secondaryDark font-medium ">Order Id : <span className="text-primary font-normal">{checkoutData?.data?.data?.order_id}</span></p>
      <p className="text-secondaryDark font-medium">Total : <span className="text-primary font-normal">{currencyFormatter.format(checkoutData?.data?.data?.total)}</span></p>
      <h2 className="text-primary font-medium pt-4 text-[20px]">Select Payment Method</h2>
      {methods.map((method: any) => (
        <label key={method.id} className="flex items-center gap-3">
          <input
            type="radio"
            name="paymentMethod"
            value={method.stripe_pm_id}
            checked={payment_method_id === method.stripe_pm_id}
            onChange={() => setPaymentMethodId(method.stripe_pm_id)}
            className="w-5 h-5 accent-primary cursor-pointer"
          />
          <span className="text-secondaryDark ">{method.brand}</span>
        </label>
      ))}

      <button
        onClick={handlePayment}
        className="bg-primary text-white px-4 py-2 rounded hover:opacity-[.9] disabled:bg-gray-400"
        disabled={!payment_method_id || checkoutMutation.status === "pending"}
      >
        {checkoutMutation.status === "pending" ? "Processing..." : "Payment"}
      </button>
    </div>
  );
}

export default Checkout;
