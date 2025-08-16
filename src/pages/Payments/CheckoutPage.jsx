// stripe listen --forward-to localhost:4242/webhook

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Payment from "@/components/payment/Payment";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
export default function CheckoutPage() {
  const breadcrumbItems = [
    { label: "Browse Courses", path: "/" },
    { label: "details Courses", path: "/" },
    { label: "payment", isActive: true },
  ];
      const { getAutoBreadcrumb } = useBreadcrumb();

  return (
    <div className="container p-4 my-8 mx-auto">
      {/* <Breadcrumb items={breadcrumbItems} /> */}
              <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />

      <div className="border-2 border-border rounded-[8px] p-4   my-8 mx-auto">
        <Payment />
        <div className="w-100 bg-[#F8FAFC] p-8 rounded-[8px]">
          <Elements stripe={stripePromise}  options={{ locale: "en" }}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
}
