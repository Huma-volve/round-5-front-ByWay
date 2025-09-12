// stripe listen --forward-to localhost:4242/webhook
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import Breadcrumb from "@/components/common/Breadcrumb";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useTranslation } from "react-i18next";
import Checkout from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
export default function AddPaymentMethodPage() {
  const { i18n } = useTranslation();
  const locale = i18n.language === "ar" ? "ar" : "en";
  const { getAutoBreadcrumb } = useBreadcrumb();

  return (
    <div className=" p-4 lg:w-[600px]">
      <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />

      <div className="m-auto border-2 border-border rounded-[8px] p-4   my-8 mx-auto">
        <div className="w-100 bg-[#F8FAFC] p-8 rounded-[8px]">
          <Elements stripe={stripePromise} options={{ locale: locale }}>
            <Checkout/>
          </Elements>
        </div>
      </div>
    </div>
  );
}
