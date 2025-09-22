import { useFetchDeletePaymentMethod, useFetchPaymentMethods } from "@/hooks/payment/payment";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import PaymentMethod from "./PaymentMethod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import PaymentMethodLoading from "@/components/payment/PaymentMethodLoading";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function PaymethodPage() {
  const { getAutoBreadcrumb } = useBreadcrumb();
  const { data, isLoading, isError } = useFetchPaymentMethods();
  const methods = data?.dataMethods?.data || [];
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const dataMutation = useFetchDeletePaymentMethod()
  const queryClient = useQueryClient();

  const { t, i18n } = useTranslation();
  const locale = i18n.language === "ar" ? "ar" : "en";


  const [localMethods, setLocalMethods] = useState<any[]>(methods);
  useEffect(() => {
    setLocalMethods(methods);
  }, [methods]);

  const handleDelete = (id: string) => {
 
    const prev = localMethods;
    setLocalMethods((prev) => prev.filter((m) => m.id !== id));
    dataMutation.mutate({ id }, {
      onError: () => {
       toast.error(t("cart.Failed to remove item"));
        setLocalMethods(prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      },
    });
  }

  if (isLoading) return <PaymentMethodLoading />;
  if (isError) return <p className="text-danger">Failed to load payment methods</p>;
  return (
    <div className="bg-background min-h-screen ">
      <div className="m-4 mt-8">
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
      </div>

      <div className="lg:flex gap-4 w-100 mt-8">
        <Elements stripe={stripePromise} options={{ locale: locale }}>
          <PaymentMethod />
        </Elements>
        <div className="w-100 lg:w-[30%]  h-[75vh] overflow-y-auto pr-2">
          {localMethods.length !== 0 &&
            <>
              <div className="text-categoryIcon font-medium mt-8 mb-4 ">{t("cart.Payment Methods")} : </div>
              <div className="flex flex-wrap  w-full ">
                {localMethods.map((method: any) => (
                  <div key={method.id} className="flex items-center  justify-between gap-2 bg-revenue2Bg p-4 my-4 rounded-[8px] w-80">
                    <p className="text-primary capitalize">{method.brand}</p>
                    <Trash2 className="hover:text-danger w-5 cursor-pointer" onClick={() => handleDelete(method.id)} />
                  </div>
                ))}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
}
