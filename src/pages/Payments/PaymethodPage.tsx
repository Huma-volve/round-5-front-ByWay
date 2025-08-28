
import { useFetchDeletePaymentMethod, useFetchPaymentMethods } from "@/hooks/payment/payment";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import PaymentMethod from "./PaymentMethod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
export default function PaymethodPage() {
  const { getAutoBreadcrumb } = useBreadcrumb();
  const { data, isLoading, isError } = useFetchPaymentMethods();
  const methods = data?.dataMethods?.data || [];
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const dataMutation = useFetchDeletePaymentMethod()
  const queryClient = useQueryClient();

  const { i18n } = useTranslation();
  const locale = i18n.language === "ar" ? "ar" : "en";

  const handleDelete = (id: string) => {
    dataMutation.mutate({ id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
        },
      }
    )
  }

  if (isLoading) return <p>Loading payment methods...</p>;
  if (isError) return <p>Failed to load payment methods</p>;
  return (
    <div className="bg-background min-h-screen">
      <div className="m-4 mt-8">
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
      </div>
      <Elements stripe={stripePromise} options={{ locale: locale }}>
        <PaymentMethod />
      </Elements>
      {methods.length !== 0 &&
        <>
          <div className="text-categoryIcon font-medium mt-8 mb-4 ">Payment Methods : </div>
          <div className="flex flex-wrap gap-4 w-full"> 
          {methods.map((method: any) => (
            <div key={method.id} className="flex items-center  justify-between gap-3 bg-revenue2Bg p-4 my-4 rounded-[8px] w-80">
              <p className="text-primary capitalize">{method.brand}</p>
              <Trash2 className="hover:text-danger w-5 cursor-pointer" onClick={() => handleDelete(method.id)} />
            </div>
          ))}
        </div>
        </>
      }
    </div>
  );
}